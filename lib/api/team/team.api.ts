import { api } from "../http";
import {
  GetPlayersParams,
  GetPlayersResponse,
  GetTeamsParams,
  GetTeamsResponse,
} from "./team.types";

export const teamApi = {
  getTeams: async (params: GetTeamsParams) => {
    const res = await api.get<GetTeamsResponse>("/teams", { params });
    return res.data;
  },

  getPlayers: async (params: GetPlayersParams) => {
    const res = await api.get<GetPlayersResponse>("/players", {
      params,
    });
    return res.data;
  },
};
