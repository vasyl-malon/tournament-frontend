import { api } from "../http";
import { LoginParams, RegisterParams } from "./auth.types";

export const authApi = {
  login: async (data: LoginParams) => {
    const res = await api.post("/auth/login", data);
    return res.data;
  },

  register: async (data: RegisterParams) => {
    const res = await api.post("/auth/register", data);
    return res.data;
  },
};
