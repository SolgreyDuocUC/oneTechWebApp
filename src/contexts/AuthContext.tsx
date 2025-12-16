import React, { createContext, useContext, useEffect, useState } from "react";
import { loginAPI } from "../service/authApi"; 
import { UserService } from "../service/userService";


// TIPOS DEL USUARIO

export type UserRole = "ADMIN" | "CLIENTE" | "VENDEDOR";

    export interface Role {
    id: number;
    name: UserRole;
    }

    export type Genero = "FEMENINO" | "MASCULINO" | "SIN_ESPECIFICAR";

    export interface User {
    id: number;
    run: string;
    nombre: string;
    apellidos: string;
    email: string;
    fechaNacimiento: string;
    direccion: string;
    region: string;
    comuna: string;
    puntosLevelUp: number;
    codigoReferido?: string;
    genero: Genero;
    roles: Role[];
    }


    // TIPOS DEL CONTEXTO

    interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
}

    // CREAR CONTEXTO

    const AuthContext = createContext<AuthContextType>({} as AuthContextType);


    // PROVIDER

    export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );
    const [loading, setLoading] = useState<boolean>(true);

    // Cargar usuario al entrar
    const loadUser = async (token: string) => {
        try {
        const email = localStorage.getItem("email");
        if (!email) return;

        const userData = await UserService.getByEmail(email);
        setUser(userData);
        } catch (err) {
        console.log("Error cargando usuario:", err);
        }
    };

    // LOGIN
    const login = async (email: string, password: string) => {
        try {
        const data = await loginAPI(email, password);
        if (!data?.accessToken) return false;

        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("email", email);

        setToken(data.accessToken);
        await loadUser(data.accessToken);

        return true;
        } catch (error) {
        console.log(error);
        return false;
        }
    };

    // LOGOUT
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setToken(null);
        setUser(null);
    };

    useEffect(() => {
        if (token) loadUser(token);
        setLoading(false);
    }, []);

    const isAuthenticated = !!token;


    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout, isAuthenticated }}>
        {children}
        </AuthContext.Provider>
    );
    };

export const useAuth = () => useContext(AuthContext);
