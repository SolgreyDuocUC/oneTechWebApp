import type { UserRole } from "@/types";

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    email: string;
    roles: UserRole[];
}

export interface AuthUser {
    email: string;
    roles: UserRole[];
}
