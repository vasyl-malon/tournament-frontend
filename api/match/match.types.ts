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
  ROUND_OF_16 = "ROUND_OF_16",
  ROUND_OF_32 = "ROUND_OF_32",
  ROUND_OF_64 = "ROUND_OF_64",
  ROUND_OF_128 = "ROUND_OF_128",

  LEAGUE_PHASE = "LEAGUE_PHASE",
  GROUP_STAGE = "GROUP_STAGE",
  KNOCKOUT_STAGE_PLAY_OFFS = "KNOCKOUT_STAGE_PLAY_OFFS",

  REGULAR_SEASON = "REGULAR_SEASON",
  PLAYOFFS = "PLAYOFFS",

  QUALIFYING_ROUND = "QUALIFYING_ROUND",
  PRELIMINARY_ROUND = "PRELIMINARY_ROUND",
}

export const MATCH_STAGE_LABELS: Record<MatchStage, string> = {
  [MatchStage.FINAL]: "Final",
  [MatchStage.THIRD_PLACE]: "Third Place Match",
  [MatchStage.SEMI_FINALS]: "Semi-finals",
  [MatchStage.QUARTER_FINALS]: "Quarter-finals",
  [MatchStage.ROUND_OF_16]: "Round of 16",
  [MatchStage.ROUND_OF_32]: "Round of 32",
  [MatchStage.ROUND_OF_64]: "Round of 64",
  [MatchStage.ROUND_OF_128]: "Round of 128",

  [MatchStage.LEAGUE_PHASE]: "League Phase",
  [MatchStage.GROUP_STAGE]: "Group Stage",
  [MatchStage.KNOCKOUT_STAGE_PLAY_OFFS]: "Knockout Play-offs",

  [MatchStage.REGULAR_SEASON]: "Regular Season",
  [MatchStage.PLAYOFFS]: "Play-offs",

  [MatchStage.QUALIFYING_ROUND]: "Qualifying Round",
  [MatchStage.PRELIMINARY_ROUND]: "Preliminary Round",
};

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
  predictedAdvancingTeamId?: number;
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
    bonusPrediction: {
      champion: {
        id: number;
        logo: string;
        name: string;
        pointsWorth: number | null;
        pointsEarned: number | null;
      };
      runnerUp: {
        id: number;
        logo: string;
        name: string;
        pointsWorth: number | null;
        pointsEarned: number | null;
      };
      topScorer: {
        id: number;
        name: string;
        pointsWorth: number | null;
        pointsEarned: number | null;
        teamLogo: string;
      };
    };
  };
};

export type AddBonusBetParams = {
  championTeamId?: number;
  runnerUpTeamId?: number;
  topScorerId?: number;
  tournamentId: string;
};

export type GetBonusPredictionParams = {
  tournamentId: string;
};

export type GetBonusPredictionResponse = {
  tournamentStatus: string;
  champion?: {
    id: number;
    logo: string;
    name: string;
    pointsWorth: number | null;
    pointsEarned: number | null;
  };
  runnerUp?: {
    id: number;
    logo: string;
    name: string;
    pointsWorth: number | null;
    pointsEarned: number | null;
  };
  topScorer?: {
    id: number;
    name: string;
    pointsWorth: number | null;
    pointsEarned: number | null;
    teamLogo: string;
  };
};
