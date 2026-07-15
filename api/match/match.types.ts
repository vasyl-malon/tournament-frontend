export enum MatchStatus {
  SCHEDULED = "SCHEDULED",
  LIVE = "LIVE",
  FINISHED = "FINISHED",
}

export type Bet = {
  id: string;
  awayScore: number | null;
  createdAt: string;
  homeScore: number | null;
  matchId: string;
  pointsEarned: number;
  updatedAt: string;
  userId: string;
  match: Match;
};

export type Match = {
  matchWeek: number;
  utcDate: string;
  apiMatchId: string;
  awayScore: number | null;
  awayTeam: string;
  awayTeamLogo: string;
  group: string | null;
  awayScorehomeScore: null;
  homeScore: number | null;
  homeTeam: string;
  homeTeamLogo: string;
  id: string;
  matchday: number;
  stage: string;
  startTime: string;
  status: MatchStatus;
  tournamentId: string;
  bets: Array<Bet>;
};

export type Statistic = {
  differenceCount: number;
  email: string;
  exactCount: number;
  firstName: string;
  lastName: string;
  outcomeCount: number;
  rank: number;
  totalPoints: number;
  totalPredictions: number;
  userId: string;
};

export type GetAllMatchesParams = {
  tournamentId: string;
  matchWeek?: number;
  status?: MatchStatus;
  limit?: number;
};

export type GetAllMatchesResponse = {
  data: Array<Match>;
};

export type AddBetParams = {
  matchId: string;
  homeScore: number;
  awayScore: number;
};

export type GetMyBetsParams = {
  tournamentId: string;
};

export type GetMyBetsResponse = {
  awayScore: number;
  createdAt: string;
  homeScore: number;
  id: string;
  match: Match;
  pointsEarned: number;
  updatedAt: string;
  userId: string;
}[];

export type GetLeaderboardParams = {
  tournamentId: string;
};

export type GetLeaderboardResponse = {
  data: Array<Statistic>;
};

export type GetUserBetsParams = {
  userId: string;
  tournamentId: string;
};

export type GetUserBetsResponse = {
  data: {
    stats: Statistic;
    bets: Array<Bet>;
  };
};
