import { Bet, Statistic } from "../common.types";

export type AddPredictionParams = {
  matchId: string;
  homeScore: number;
  awayScore: number;
  predictedAdvancingTeamId?: number;
};

export type GetPredictionsParams = {
  userId: string;
  tournamentId: string;
};

export type GetPredictionsResponse = {
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

export type GetBonusPredictionsParams = {
  tournamentId: string;
};

export type GetBonusPredictionsResponse = {
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

export type AddBonusPredictionParams = {
  championTeamId?: number;
  runnerUpTeamId?: number;
  topScorerId?: number;
  tournamentId: string;
};
