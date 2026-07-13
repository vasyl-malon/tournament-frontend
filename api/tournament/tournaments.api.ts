import { api } from "../http";
import { GetMyTournamentsResponse } from "./tournaments.types";

export const tournamentApi = {
  getMy: async () => {
    const res = await api.get<GetMyTournamentsResponse>("/tournaments/my");
    return res.data;
  },
  // getOne: async ({ id }: GetBranchParams) => {
  //   const res = await api.get<GetBranchResponse>(`/branches/${id}`);
  //   return res.data;
  // },
  // create: async (params: CreateBranchParams) => {
  //   const res = await api.post<CreateBranchResponse>("/branches", params);
  //   return res.data;
  // },
  // updateStatus: async ({ id, status }: UpdateBranchStatusParams) => {
  //   const res = await api.put<UpdateBranchStatusResponse>(
  //     `/branches/${id}/status`,
  //     { status },
  //   );
  //   return res.data;
  // },
};
