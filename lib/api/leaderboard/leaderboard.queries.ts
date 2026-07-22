import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { leaderboardApi } from "./leaderboard.api";
import {
  GetLeaderboardParams,
  GetLeaderboardResponse,
} from "./leaderboard.types";

export const useGetLeaderboard = (
  params: GetLeaderboardParams,
  queryParams?: Partial<UseQueryOptions<GetLeaderboardResponse>>,
) =>
  useQuery({
    queryKey: ["get-leaderboard", params],
    queryFn: () => leaderboardApi.getLeaderboard(params),
    ...queryParams,
  });
