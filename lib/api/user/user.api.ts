import { api } from "../http";
import {
  GetActiveUsersParams,
  GetActiveUsersResponse,
} from "./user.types";

export const userApi = {
  getActiveUsers: async (params: GetActiveUsersParams) => {
    const res = await api.get<GetActiveUsersResponse>("/users", { params });
    return res.data;
  },
};
