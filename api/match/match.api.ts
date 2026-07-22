import { api } from "../http";
import { GetMatchesParams, GetMatchesResponse } from "./match.types";

export const matchApi = {
  getAll: async (params: GetMatchesParams) => {
    const res = await api.get<GetMatchesResponse>("/matches", { params });
    return res.data;
  },
};
