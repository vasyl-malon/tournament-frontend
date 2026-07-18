import { api } from "../http";
import {
  GetAllMatchesResponse,
  GetAllMatchesParams,
  AddBetParams,
  GetLeaderboardParams,
  GetLeaderboardResponse,
  GetMyBetsParams,
  GetMyBetsResponse,
  GetUserBetsParams,
  GetUserBetsResponse,
  AddBonusBetParams,
  GetBonusPredictionResponse,
  GetBonusPredictionParams,
} from "./match.types";

export const matchApi = {
  getAll: async (params: GetAllMatchesParams) => {
    const res = await api.get<GetAllMatchesResponse>("/matches", { params });
    return res.data;
  },

  getMyBets: async (params: GetMyBetsParams) => {
    const res = await api.get<GetMyBetsResponse>("/bets/my", { params });
    return res.data;
  },

  getAllLeaderboard: async (params: GetLeaderboardParams) => {
    const res = await api.get<GetLeaderboardResponse>("/matches/leaderboard", {
      params,
    });
    return res.data;
  },

  addBet: async (params: AddBetParams) => {
    const res = await api.post<object>(`/matches/bets/${params.matchId}`, {
      homeScore: params.homeScore,
      awayScore: params.awayScore,
    });
    return res.data;
  },

  getUserBets: async (params: GetUserBetsParams) => {
    const res = await api.get<GetUserBetsResponse>(`/matches/bets`, { params });
    return res.data;
  },


  getBonusPrediction: async (params: GetBonusPredictionParams) => {
    const res = await api.get<GetBonusPredictionResponse>(`/matches/bonus`, { params });
    return res.data;
  },

  addBonusBet: async (params: AddBonusBetParams) => {
    const res = await api.post<object>(`/matches/bonus`, params);
    return res.data;
  },
};
