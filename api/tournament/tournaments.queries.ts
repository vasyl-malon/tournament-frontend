import { useMutation, useQuery } from "@tanstack/react-query";
import { GetMyTournamentsResponse } from "./tournaments.types";
import { AxiosError } from "axios";
import { tournamentApi } from "./tournaments.api";

export const useGetMyTournament = () =>
  useQuery<GetMyTournamentsResponse, AxiosError>({
    queryKey: ["get-branches"],
    queryFn: tournamentApi.getMy,
  });

// export const useGetBranch = (params: GetBranchParams) =>
//   useQuery<GetBranchResponse, AxiosError>({
//     queryKey: ["get-branch", params.id],
//     queryFn: () => branchApi.getOne(params),
//   });

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
