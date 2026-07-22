import { useLogin, useRegister } from "./auth/auth.queries";
import { useGetMatches } from "./match/match.queries";
import {
  useGetPredictions,
  useGetBonusPredictions,
  useAddPrediction,
  useAddBonusPrediction,
} from "./prediction/prediction.queries";
import { useGetTeams, useGetPlayers } from "./team/team.queries";
import { useGetLeaderboard } from "./leaderboard/leaderboard.queries";
import { useGetMyTournaments } from "./tournament/tournaments.queries";

export {
  useLogin,
  useRegister,
  useGetMatches,
  useGetLeaderboard,
  useGetTeams,
  useGetPlayers,
  useGetPredictions,
  useGetBonusPredictions,
  useAddPrediction,
  useAddBonusPrediction,
  useGetMyTournaments,
};
