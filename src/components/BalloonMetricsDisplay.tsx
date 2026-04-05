import { useQuery } from "@tanstack/preact-query"
import { queryClient } from "../stores"
import type { BalloonMetrics } from "../types/types"
import { type ReactNode } from "preact/compat";

export default function BalloonMetricsDisplay() {

    const getData = async () => {
        console.log("GETTING DATA");
        const res = await fetch('http://balloon.local/');
        return res.json();
    }

    const { data, isLoading, isError } = useQuery<BalloonMetrics>({
        queryKey: ['metrics'],
        queryFn: getData,
        refetchInterval: 3000
    }, queryClient)

    return (
        <div className="relative border border-black p-4">
            <h3 className="absolute -top-3 left-3 bg-white px-1 text-lg font-bold">
                Metrics
            </h3>
            {isError && (<div>Error.</div>)}
            {isLoading && (<div>Loading...</div>)}
            {!isLoading && data && (
                <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    <LabelBox label="Current Altitude (ASL)">
                        <span className="text-2xl font-black"> {data.alt_baro}m </span>
                    </LabelBox>
                    <LabelBox label="Current Altitude (AGL)">
                        <span className="text-2xl font-black"> {data.alt_radar}m </span>
                    </LabelBox>
                    <LabelBox label="Target Altitude">
                        <span className="text-2xl font-black"> {data.target_asl === -1 ? "Not Defined" : `${data.target_asl}m`} </span>
                    </LabelBox>
                    <LabelBox label="Burner Valve Degrees">
                        <span className="text-2xl font-black"> {data.servo_deg}° </span>
                    </LabelBox>
                    <LabelBox label="Current Pressure">
                        <span className="text-2xl font-black"> {data.pressure_hpa} hPa </span>
                    </LabelBox>
                    <LabelBox label="Current Temperature">
                        <span className="text-2xl font-black"> {data.temp_c} °C </span>
                    </LabelBox>
                    <LabelBox label="Status">
                        <span className="text-2xl font-black"> {data.status} </span>
                    </LabelBox>
                    <LabelBox label="Is Landing">
                        <span className="text-2xl font-black"> {String(data.is_landing)} </span>
                    </LabelBox>
                </div>
            )}
        </div>
    )
}

function LabelBox({ label, children }: { label: string, children: ReactNode }) {
    return (
        <div className="relative flex flex-col gap-2 p-4 border border-black mt-4">
            <h3 className="absolute -top-3 left-3 bg-white px-1 text-sm font-medium">
                {label}
            </h3>
            {children}
        </div>

    );
}
