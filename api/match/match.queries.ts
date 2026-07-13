import { useMutation, useQuery } from "@tanstack/react-query";
import {
  GetAllMatchesResponse,
  GetAllMatchesParams,
  AddBetResponse,
  AddBetParams,
  GetLeaderboardParams,
  GetLeaderboardResponse,
  GetMyBetsResponse,
  GetMyBetsParams,
} from "./match.types";
import { AxiosError } from "axios";
import { matchApi } from "./match.api";

export const useGetAllMatches = (params: GetAllMatchesParams) =>
  useQuery<GetAllMatchesResponse, AxiosError>({
    queryKey: ["get-matches", params],
    queryFn: () => matchApi.getAll(params),
  });

export const useGetMyBets = (params: GetMyBetsParams) =>
  useQuery<GetMyBetsResponse, AxiosError>({
    queryKey: ["get-bets", params],
    queryFn: () => matchApi.getMyBets(params),
  });

export const useAddBet = () =>
  useMutation<AddBetResponse, AxiosError, AddBetParams>({
    mutationKey: ["add-bet"],
    mutationFn: matchApi.addBet,
  });

export const useGetLeaderboard = (params: GetLeaderboardParams) =>
  useQuery<GetLeaderboardResponse, AxiosError>({
    queryKey: ["get-leaderboard", params],
    queryFn: () => matchApi.getAllLeaderboard(params),
  });

// export const useCreateBranch = () =>
//   useMutation<CreateBranchParams, AxiosError, CreateBranchResponse>({
//     mutationKey: ["create-branch"],
//     mutationFn: branchApi.create,
//   });

// export const useUpdateBranchStatus = () =>
//   useMutation<UpdateBranchStatusParams, AxiosError, UpdateBranchStatusResponse>(
//     {
//       mutationKey: ["update-branch-status"],
//       mutationFn: branchApi.updateStatus,
//     },
//   );
