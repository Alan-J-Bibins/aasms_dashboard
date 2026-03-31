import { useMutation } from "@tanstack/preact-query"
import { useState } from "preact/compat";
import { queryClient } from "../stores";
import type { TargetedEvent } from "preact";

export default function BalloonTargetSetter() {

    const [requestStatus, setRequestStatus] = useState<{ success: boolean, message: string } | null>(null);

    const startTimer = () => {
        setTimeout(() => {
            setRequestStatus(null);
        }, 4000);
    };

    const setTargetAltitude = async (altitude: number) => {
        const res = await fetch('http://balloon.local/set', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                altitude: altitude
            })
        })

        return res.json();
    }

    const setTargetAltitudeMutation = useMutation({
        mutationFn: (altitude: number) => {
            return setTargetAltitude(altitude);
        },
        onSuccess: (data) => {
            console.log("SUCCESS");
            console.log("RECEIVED:", data);
            setRequestStatus({ success: data.success, message: data.message });
            startTimer();
            queryClient.invalidateQueries({ queryKey: ['metrics'] });
        },
        onError: (error) => {
            console.log("RECEIVED ERROR:", error);
            setRequestStatus({ success: false, message: error.message });
            startTimer();
        }
    }, queryClient)

    const handleSubmit = (e: TargetedEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const altitude = formData.get("altitude");
        console.log("Selected altitude: ", altitude);
        if (altitude) {
            setTargetAltitudeMutation.mutate(Number(altitude));
            e.currentTarget.reset();
        }
    }

    return (
        <div className="relative border border-black p-4 space-y-2">
            <h3 className="absolute -top-3 left-3 bg-white px-1 text-lg font-bold">
                Target Altitude
            </h3>

            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit}
            >
                <input
                    name="altitude"
                    type="number"
                    required
                    placeholder="Enter valid altitude"
                    className="w-full p-4 border border-gray-400 outline-none
                    focus:border-black transition-colors"
                />
                <button
                    type="submit"
                    disabled={setTargetAltitudeMutation.isPending}
                    className="w-full bg-black text-white p-2 font-bold
                    hover:cursor-pointer hover:bg-black/80 transition-colors disabled:opacity-40"
                >
                    Set Altitude
                </button>
            </form>

            {requestStatus?.message && (
                <div
                    className={`
                        p-4
                        ${requestStatus.success ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"} font-bold
                    `}
                >
                    {requestStatus.message}
                </div>
            )}
        </div>
    )
}

