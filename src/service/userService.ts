import { api } from "./api";

const URL = "/api/v1/users";

export const UserService = {
  register: async (data: any) => {
    const res = await api.post(URL, data);
    return res.data;
  },

  login: async (email: string, password: string) => {
    const res = await api.post("/api/v1/auth/login", { email, password });
    return res.data;
  },

  getUsers: async () => {
    const res = await api.get(URL);
    return res.data;
  },

  getUserById: async (id: number) => {
    const res = await api.get(`${URL}/${id}`);
    return res.data;
  },

  getByEmail: async (email: string) => {
    const res = await api.get(`${URL}/email/${email}`);
    return res.data;
  },

  updateUser: async (id: number, data: any) => {
    const res = await api.put(`${URL}/${id}`, data);
    return res.data;
  },

  deleteUser: async (id: number) => {
    await api.delete(`${URL}/${id}`);
  },
};
