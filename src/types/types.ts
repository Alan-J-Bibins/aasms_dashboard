export type BalloonMetrics = {
    temp_c: number;
    pressure_hpa: number;
    alt_m: number;
    alt_agl: number;
    target_m: number;
    burner_deg: number;
    status: "IDLE" | "LOCKED" | "LANDING" | "LANDED";
    is_landing: boolean;
}
