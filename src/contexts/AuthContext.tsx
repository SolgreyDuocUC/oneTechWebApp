import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from '../types';

// Definir la URL base de tu API REST de Spring Boot
// NOTA: Ajusta el puerto si tu backend no usa el 8080
const API_BASE_URL = 'http://localhost:8080/api/v1';

// Tu payload de registro (lo que envías al backend)
type RegisterPayload = Omit<User, 'id' | 'puntosLevelUp' | 'codigoReferido'>;

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User | null>; // Login también debe ser asíncrono
  logout: () => void;
  register: (userData: RegisterPayload) => Promise<boolean>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (_email: string): Promise<User | null> => {
    console.warn("Login simulado. Implementar fetch al endpoint de autenticación.");

    return null;
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (userData: RegisterPayload): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.status === 201) {
        const createdUser: User = await response.json();
        setUser(createdUser);
        return true;
      }

      const errorResponse = await response.json();
      console.error('Error del Backend al registrar:', errorResponse);

      return false;

    } catch (error) {
      console.error('Error de red o el servidor no está corriendo:', error);
      return false;
    }
  };

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