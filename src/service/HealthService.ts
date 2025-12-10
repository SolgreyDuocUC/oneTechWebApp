import { api } from "./api";

export const HealthService = {
    ping: async () => (await api.get("/health")).data,
};
