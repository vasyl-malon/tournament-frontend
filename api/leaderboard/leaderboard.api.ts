import { api } from "../http";
import {
  GetLeaderboardParams,
  GetLeaderboardResponse,
} from "./leaderboard.types";

export const leaderboardApi = {
  getLeaderboard: async (params: GetLeaderboardParams) => {
    const res = await api.get<GetLeaderboardResponse>("/leaderboard", {
      params,
    });
    return res.data;
  },
};
