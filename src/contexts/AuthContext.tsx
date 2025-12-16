import type { AuthUser } from "@/remote/DTO/AuthDTO";
import { AuthService } from "@/remote/service/User/AuthService";
import type { UserRole } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";


interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    hasRole: (role: UserRole) => boolean;
    }

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    // Restaurar sesión
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const email = localStorage.getItem("email");
        const roles = localStorage.getItem("roles");

        if (accessToken && email && roles) {
        setUser({
            email,
            roles: JSON.parse(roles),
        });
        }

        setLoading(false);
}, []);

    // LOGIN
    const login = async (email: string, password: string): Promise<boolean> => {
        try {
        const data = await AuthService.login(email, password);

        localStorage.setItem("email", data.email);
        localStorage.setItem("roles", JSON.stringify(data.roles));

        setUser({
            email: data.email,
            roles: data.roles,
        });

        return true;
        } catch (error) {
        console.error("Login error:", error);
        return false;
        }
    };

    // LOGOUT
    const logout = () => {
        AuthService.logout();
        localStorage.removeItem("email");
        localStorage.removeItem("roles");
        setUser(null);
    };

    // Helper de roles
    const hasRole = (role: UserRole): boolean => {
        return user?.roles.includes(role) ?? false;
    };

    return (
        <AuthContext.Provider
        value={{
            user,
            loading,
            isAuthenticated: !!user,
            login,
            logout,
            hasRole,
        }}
        >
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
