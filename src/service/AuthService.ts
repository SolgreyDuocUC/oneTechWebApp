import { api } from "./api";

export const AuthService = {
    login: async (username: any, password: any) => {
        const { data } = await api.post("/auth/login", { username, password });

        // GUARDAR TOKEN
        localStorage.setItem("token", data.token);

        return data;
    },

    logout: () => {
        localStorage.removeItem("token");
    },
};
