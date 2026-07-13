import { api } from "../http";
import {
  GetAllMatchesResponse,
  GetAllMatchesParams,
  AddBetParams,
  AddBetResponse,
  GetLeaderboardParams,
  GetLeaderboardResponse,
  GetMyBetsParams,
  GetMyBetsResponse,
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
    const res = await api.get<GetLeaderboardResponse>("/matches/leaderboard", { params });
    return res.data;
  },


  addBet: async (params: AddBetParams) => {
    const res = await api.post<AddBetResponse>(`/bets/${params.matchId}`, {
      homeScore: params.homeScore,
      awayScore: params.awayScore,
    });
    return res.data;
  },

  // getOne: async ({ id }: GetBranchParams) => {
  //   const res = await api.get<GetBranchResponse>(`/branches/${id}`);
  //   return res.data;
  // },
  // create: async (params: CreateBranchParams) => {
  //   const res = await api.post<CreateBranchResponse>("/branches", params);
  //   return res.data;
  // },
  // updateStatus: async ({ id, status }: UpdateBranchStatusParams) => {
  //   const res = await api.put<UpdateBranchStatusResponse>(
  //     `/branches/${id}/status`,
  //     { status },
  //   );
  //   return res.data;
  // },
};
