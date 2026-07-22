import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { teamApi } from "./team.api";
import {
  GetPlayersParams,
  GetPlayersResponse,
  GetTeamsParams,
  GetTeamsResponse,
} from "./team.types";

export const useGetTeams = (
  params: GetTeamsParams,
  queryParams?: Partial<UseQueryOptions<GetTeamsResponse>>,
) =>
  useQuery({
    queryKey: ["get-teams", params],
    queryFn: () => teamApi.getTeams(params),
    ...queryParams,
  });

export const useGetPlayers = (
  params: GetPlayersParams,
  queryParams?: Partial<UseQueryOptions<GetPlayersResponse>>,
) =>
  useQuery({
    queryKey: ["get-players", params],
    queryFn: () => teamApi.getPlayers(params),
    ...queryParams,
  });
