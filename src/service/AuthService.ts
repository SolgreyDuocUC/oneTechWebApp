import { api } from "./api";

export const AuthService = {

    login: async (email: string, password: string) => {

        const { data } = await api.post("/api/v1/auth/login", { email, password });


        localStorage.setItem("token", data.accessToken);
        

        return data;
    },

    logout: () => {
        localStorage.removeItem("token");
    },
};