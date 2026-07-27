import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { tournamentApi } from "./tournaments.api";
import {
  GetParticipantsOverviewParams,
  GetTournamentsResponse,
} from "./tournaments.types";

export const useGetMyTournaments = (
  queryParams?: Partial<UseQueryOptions<GetTournamentsResponse>>,
) =>
  useQuery({
    queryKey: ["get-my-tournaments"],
    queryFn: tournamentApi.getMy,
    ...queryParams,
  });

export const useAddParticipant = () =>
  useMutation({
    mutationKey: ["use-add-participant"],
    mutationFn: tournamentApi.addParticipant,
  });

export const useInviteUser = () =>
  useMutation({
    mutationKey: ["invite-user"],
    mutationFn: tournamentApi.inviteUser,
  });

export const useGetParticipantsOverview = (
  params: GetParticipantsOverviewParams,
) =>
  useQuery({
    queryKey: ["get-participants-overview"],
    queryFn: () => tournamentApi.getParticipantsOverview(params),
  });

export const useGetAllTournaments = (
  queryParams?: Partial<UseQueryOptions<GetTournamentsResponse>>,
) =>
  useQuery({
    queryKey: ["get-all-tournaments"],
    queryFn: tournamentApi.getAll,
    ...queryParams,
  });

export const useSyncTeams = () =>
  useMutation({
    mutationKey: ["sync-teams"],
    mutationFn: tournamentApi.syncTeams,
  });

export const useSyncMatches = () =>
  useMutation({
    mutationKey: ["sync-matches"],
    mutationFn: tournamentApi.syncMatches,
  });

export const useFinalizeTournament = () =>
  useMutation({
    mutationKey: ["finalize-tournament"],
    mutationFn: tournamentApi.finalizeTournament,
  });
