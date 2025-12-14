import React, { createContext, useContext, useEffect, useState } from "react";
import { loginAPI } from "../service/authApi";
import { UserService } from "../service/userService";
import { usuarios } from "@/data/mockUsuarios";
import type { User } from "@/types";

export type UserRole = "ROLE_ADMIN" | "CLIENTE" | "VENDEDOR";

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginAdminMock: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const email = localStorage.getItem("email");
      if (!email) return;

      const userData = await UserService.getByEmail(email);
      setUser(userData);
    } catch (error) {
      console.log("Error cargando usuario:", error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const data = await loginAPI(email, password);
      if (!data?.accessToken) return false;

      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("email", email);

      setToken(data.accessToken);
      await loadUser();

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const loginAdminMock = async (email: string, password: string) => {
    const admin = usuarios.find(
      u =>
        u.email === email &&
        u.password === password &&
        u.roles.some(r => r.name === "ROLE_ADMIN")
    );

    if (!admin) return false;

    const fakeToken = "ADMIN_MOCK_TOKEN";

    localStorage.setItem("token", fakeToken);
    localStorage.setItem("email", admin.email);

    setToken(fakeToken);
    setUser(admin);

    return true;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    if (token) loadUser();
    setLoading(false);
  }, []);

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        loginAdminMock,
        logout,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
