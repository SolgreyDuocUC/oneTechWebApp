import type { UserRole } from "@/types";

export const hasRole = (
    roles: UserRole[] | undefined,
    role: UserRole
): boolean => {
    return roles?.includes(role) ?? false;
};
