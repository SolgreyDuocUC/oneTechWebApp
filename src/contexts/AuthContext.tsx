import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types';
import { AuthService } from '../service/AuthService';
import { api } from '../service/api';
import { jwtDecode } from 'jwt-decode';

type RegisterPayload = Omit<User, 'id' | 'puntosLevelUp' | 'codigoReferido'>;

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  register: (userData: RegisterPayload) => Promise<boolean>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getCurrentUser = async (): Promise<User | null> => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const decodedToken: any = jwtDecode(token);
        
        // CAMBIO CLAVE: Probar 'email' y luego 'sub'
        const userEmail = decodedToken.email || decodedToken.sub; // <-- Usamos || (o)
        if (!userEmail) throw new Error("Email no encontrado en el token.");

        const res = await api.get(`/api/v1/users/email/${userEmail}`);
        return res.data as User;
    } catch (error) {
        console.error('Failed to fetch current user or token invalid', error);
        AuthService.logout();
        return null;
    }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };
    checkAuthStatus();
  }, []);

const login = async (email: string, password: string): Promise<User | null> => {
    try {
        await AuthService.login(email, password);
        
        const token = localStorage.getItem('token');
        if (!token) throw new Error("Token no encontrado después del login.");

        const decodedToken: any = jwtDecode(token);
        
        const userEmail = decodedToken.email || decodedToken.sub; // <-- Usamos || (o)
        if (!userEmail) throw new Error("Email no encontrado en el token.");

        const res = await api.get(`/api/v1/users/email/${userEmail}`);
        const loggedInUser: User = res.data;
        
        setUser(loggedInUser);
        return loggedInUser;
    } catch (error) {
        console.error("Login failed", error);
        AuthService.logout();
        return null;
    }
};

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  const register = async (userData: RegisterPayload): Promise<boolean> => {
    try {
      
      const res = await api.post("/api/v1/auth/register", userData);

      if (res.status === 200) {
        const createdUser: User = res.data;
        setUser(createdUser);
        return true;
      }
      
      return false;

    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return false;
    }
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};