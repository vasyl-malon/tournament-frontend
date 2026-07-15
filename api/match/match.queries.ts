import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  GetAllMatchesResponse,
  GetAllMatchesParams,
  AddBetParams,
  GetLeaderboardParams,
  GetLeaderboardResponse,
  GetMyBetsResponse,
  GetMyBetsParams,
  GetUserBetsParams,
  GetUserBetsResponse,
} from "./match.types";
import { AxiosError } from "axios";
import { matchApi } from "./match.api";

export const useGetAllMatches = (
  params: GetAllMatchesParams,
  queryParams?: Partial<UseQueryOptions<GetAllMatchesResponse>>,
) =>
  useQuery({
    queryKey: ["get-matches", params],
    queryFn: () => matchApi.getAll(params),
    ...queryParams,
  });

export const useGetMyBets = (params: GetMyBetsParams) =>
  useQuery<GetMyBetsResponse, AxiosError>({
    queryKey: ["get-bets", params],
    queryFn: () => matchApi.getMyBets(params),
  });

export const useAddBet = () =>
  useMutation<object, AxiosError, AddBetParams>({
    mutationKey: ["add-bet"],
    mutationFn: matchApi.addBet,
  });

export const useGetLeaderboard = (
  params: GetLeaderboardParams,
  queryParams?: Partial<UseQueryOptions<GetLeaderboardResponse>>,
) =>
  useQuery({
    queryKey: ["get-leaderboard", params],
    queryFn: () => matchApi.getAllLeaderboard(params),
    ...queryParams,
  });

export const useGetUserBets = (
  params: GetUserBetsParams,
  queryParams?: Partial<UseQueryOptions<GetUserBetsResponse>>,
) =>
  useQuery({
    queryKey: ["get-user-bets", params],
    queryFn: () => matchApi.getUserBets(params),
    ...queryParams,
  });
