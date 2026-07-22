export enum MatchStatus {
  SCHEDULED = "SCHEDULED",
  LIVE = "LIVE",
  FINISHED = "FINISHED",
}

export enum MatchStage {
  FINAL = "FINAL",
  THIRD_PLACE = "THIRD_PLACE",
  SEMI_FINALS = "SEMI_FINALS",
  QUARTER_FINALS = "QUARTER_FINALS",  
  LAST_16 = "LAST_16",
  LAST_32 = "LAST_32",
  LAST_64 = "LAST_64",
  LEAGUE_STAGE = "LEAGUE_STAGE",
  GROUP_STAGE = "GROUP_STAGE",
  KNOCKOUT_ROUND_PLAY_OFFS = "KNOCKOUT_ROUND_PLAY_OFFS",
  REGULAR_SEASON = "REGULAR_SEASON",
  PLAYOFFS = "PLAYOFFS",
  PRELIMINARY_ROUND = "PRELIMINARY_ROUND",
  QUALIFICATION_ROUND_1 = "QUALIFICATION_ROUND_1",
  QUALIFICATION_ROUND_2 = "QUALIFICATION_ROUND_2",
  QUALIFICATION_ROUND_3 = "QUALIFICATION_ROUND_3",
  PLAYOFF_ROUND = "PLAYOFF_ROUND",
}

export type Bet = {
  id: string;
  awayScore: number | null;
  homeScore: number | null;
  pointsEarned: number;
  advancingPointsEarned?: number;
  predictedAdvancingTeamId?: string | null;
  matchId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  match: Match;
};

export type Match = {
  id: string;
  apiMatchId: string;
  tournamentId: string;
  homeTeam: {
    id: number;
    code: string;
    logo: string;
    name: string;
  };
  awayTeam: {
    id: number;
    code: string;
    logo: string;
    name: string;
  };
  homeScore: number | null;
  awayScore: number | null;
  homeScorePen?: number | null;
  awayScorePen?: number | null;
  duration?: string | null;
  advancingTeamId?: string | null;
  stage: string;
  group: string | null;
  matchday: number;
  matchWeek: number;
  startTime: string;
  utcDate: string;
  status: MatchStatus;
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