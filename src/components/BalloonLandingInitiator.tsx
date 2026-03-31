import { useMutation } from "@tanstack/preact-query"
import { useState } from "preact/hooks";
import { queryClient } from "../stores";

export default function BalloonLandingInitiator() {
    const [requestStatus, setRequestStatus] = useState<{ success: boolean, message: string } | null>(null);

    const startTimer = () => {
        setTimeout(() => {
            setRequestStatus(null);
        }, 4000);
    };

    const initiateLanding = async () => {
        const res = await fetch('http://balloon.local/land', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) throw new Error("Failed to initiate landing");
        return res.json();
    };

    const landingInitiateMutation = useMutation({
        mutationFn: initiateLanding,
        onSuccess: (data) => {
            setRequestStatus(data);
            queryClient.invalidateQueries({ queryKey: ['metrics'] });
            startTimer();
        },
        onError: (error) => {
            setRequestStatus({ success: false, message: error.message });
            startTimer();
        }
    }, queryClient)

    const handleClick = () => {
        landingInitiateMutation.mutate();
    }

    return (
        <div className="relative border border-black p-4 space-y-2">
            <h3 className="absolute -top-3 left-3 bg-white px-1 text-lg font-bold">
                Landing Initiator
            </h3>

            <button
                type="button"
                onClick={handleClick}
                disabled={landingInitiateMutation.isPending}
                className="w-full bg-black text-white p-2 font-bold
                    hover:cursor-pointer hover:bg-black/80 transition-colors disabled:opacity-40"
            >
                {landingInitiateMutation.isPending ? "Communicating..." : "Begin Landing Sequence"}
            </button>

            {requestStatus?.message && (
                <div
                    className={`
                        p-4 transition-opacity duration-500
                        ${requestStatus.success ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"} font-bold
                    `}
                >
                    {requestStatus.message}
                </div>
            )}
        </div>
    )
}
