import { api } from "../api";
import type { User } from "../../../types";
import type { UserCreateDTO, UserUpdateDTO } from "../../DTO/UserDTO";

const URL = "/api/v1/users";

export const UserService = {
  // Crear usuario
  register: async (data: UserCreateDTO): Promise<User> => {
    const res = await api.post<User>(URL, data);
    return res.data;
  },

  // Login (auth)
  login: async (email: string, password: string): Promise<{
    token: string;
    email: string;
    roles: string[];
  }> => {
    const res = await api.post("/api/v1/auth/login", { email, password });
    return res.data;
  },

  // Listar usuarios
  getUsers: async (): Promise<User[]> => {
    const res = await api.get<User[]>(URL);
    return res.data;
  },

  // Buscar por ID
  getUserById: async (id: number): Promise<User> => {
    const res = await api.get<User>(`${URL}/${id}`);
    return res.data;
  },

  // Buscar por email
  getByEmail: async (email: string): Promise<User> => {
    const res = await api.get<User>(`${URL}/email/${email}`);
    return res.data;
  },

  // Buscar por RUN
  getByRun: async (run: string): Promise<User> => {
    const res = await api.get<User>(`${URL}/run/${run}`);
    return res.data;
  },

  // Actualizar usuario
  updateUser: async (id: number, data: UserUpdateDTO): Promise<User> => {
    const res = await api.put<User>(`${URL}/${id}`, data);
    return res.data;
  },

  // Eliminar usuario
  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`${URL}/${id}`);
  },
};