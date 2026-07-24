import { api } from "../http";
import {
  LoginParams,
  LoginResponse,
  RegisterParams,
  RegisterResponse,
} from "./auth.types";

export const authApi = {
  login: async (data: LoginParams) => {
    const res = await api.post<LoginResponse>("/auth/login", data);
    return res.data;
  },

  register: async (data: RegisterParams) => {
    const res = await api.post<RegisterResponse>("/auth/register", data);
    return res.data;
  },
};
