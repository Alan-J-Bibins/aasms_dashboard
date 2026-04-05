export type BalloonMetrics = {
    temp_c: number;
    pressure_hpa: number;
    alt_baro: number;
    alt_radar: number;
    target_asl: number;
    servo_deg: number;
    status: "IDLE" | "LOCKED" | "LANDING" | "LANDED" | "OBSTACLE";
    is_landing: boolean;
}
