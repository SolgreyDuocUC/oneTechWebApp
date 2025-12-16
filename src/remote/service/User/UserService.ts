import { api } from "../api";
import type { UserDTO, UserCreateDTO, UserUpdateDTO, UserRole } from "../../DTO/UserDTO";

const URL = "/api/v1/users";

export const UserService = {
  // Crear usuario
  register: async (data: UserCreateDTO): Promise<UserDTO> => {
    const res = await api.post<UserDTO>(URL, data);
    return res.data;
  },

  // Listar usuarios
  getUsers: async (): Promise<UserDTO[]> => {
    const res = await api.get<UserDTO[]>(URL);
    return res.data;
  },

  // Buscar por ID
  getUserById: async (id: number): Promise<UserDTO> => {
    const res = await api.get<UserDTO>(`${URL}/${id}`);
    return res.data;
  },

  // Buscar por email
  getByEmail: async (email: string): Promise<UserDTO> => {
    const res = await api.get<UserDTO>(`${URL}/email/${email}`);
    return res.data;
  },

  // Buscar por RUN
  getByRun: async (run: string): Promise<UserDTO> => {
    const res = await api.get<UserDTO>(`${URL}/run/${run}`);
    return res.data;
  },

  // Actualizar usuario
  updateUser: async (id: number, data: UserUpdateDTO): Promise<UserDTO> => {
    const res = await api.put<UserDTO>(`${URL}/${id}`, data);
    return res.data;
  },

  // Eliminar usuario
  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`${URL}/${id}`);
  },
};
