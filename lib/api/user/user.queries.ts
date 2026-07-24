import { useQuery } from "@tanstack/react-query";
import { userApi } from "./user.api";
import { GetActiveUsersParams } from "./user.types";

export const useGetActiveUsers = (params: GetActiveUsersParams) =>
  useQuery({
    queryKey: ["get-active-users", params],
    queryFn: () => userApi.getActiveUsers(params),
  });
