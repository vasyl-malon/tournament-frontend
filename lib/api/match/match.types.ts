import { Match, MatchStatus } from "../common.types";

export type GetMatchesParams = {
  tournamentId: string;
  matchWeek?: number;
  status?: MatchStatus;
  limit?: number;
};

export type GetMatchesResponse = {
  data: Array<Match>;
};
