import { useLogin, useRegister } from "./auth/auth.queries";
import {
  useGetAllMatches,
  useAddBet,
  useGetMyBets,
  useGetLeaderboard,
  useGetUserBets,
} from "./match/match.queries";

import { useGetTeams, useGetPlayers } from "./tournament/tournaments.queries";

export {
  useLogin,
  useRegister,
  useGetAllMatches,
  useAddBet,
  useGetMyBets,
  useGetLeaderboard,
  useGetUserBets,
  useGetTeams,
  useGetPlayers,
};
