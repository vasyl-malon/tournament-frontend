import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  GetMyTournamentsResponse,
  GetPlayersParams,
  GetPlayersResponse,
  GetTeamsParams,
  GetTeamsResponse,
} from "./tournaments.types";
import { AxiosError } from "axios";
import { tournamentApi } from "./tournaments.api";

export const useGetMyTournament = () =>
  useQuery<GetMyTournamentsResponse, AxiosError>({
    queryKey: ["get-branches"],
    queryFn: tournamentApi.getMy,
  });

export const useGetTeams = (
  params: GetTeamsParams,
  queryParams?: Partial<UseQueryOptions<GetTeamsResponse>>,
) =>
  useQuery({
    queryKey: ["get-teams", params],
    queryFn: () => tournamentApi.getTeams(params),
    ...queryParams,
  });

export const useGetPlayers = (
  params: GetPlayersParams,
  queryParams?: Partial<UseQueryOptions<GetPlayersResponse>>,
) =>
  useQuery({
    queryKey: ["get-players", params],
    queryFn: () => tournamentApi.getPlayers(params),
    ...queryParams,
  });
