import { api } from "../service/routes/api";

export const HealthService = {
    ping: async () => (await api.get("/health")).data,
};
