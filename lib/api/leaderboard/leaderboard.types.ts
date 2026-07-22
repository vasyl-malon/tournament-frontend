import { Statistic } from "../common.types";

export type GetLeaderboardParams = {
  tournamentId: string;
};

export type GetLeaderboardResponse = {
  data: Array<Statistic>;
};
