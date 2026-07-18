import { api } from "../http";
import {
  GetMyTournamentsResponse,
  GetPlayersParams,
  GetPlayersResponse,
  GetTeamsParams,
  GetTeamsResponse,
} from "./tournaments.types";

export const tournamentApi = {
  getMy: async () => {
    const res = await api.get<GetMyTournamentsResponse>("/tournaments/my");
    return res.data;
  },

  getTeams: async (params: GetTeamsParams) => {
    const res = await api.get<GetTeamsResponse>("/matches/teams", { params });
    return res.data;
  },

  getPlayers: async (params: GetPlayersParams) => {
    const res = await api.get<GetPlayersResponse>("/matches/players", {
      params,
    });
    return res.data;
  },
};
