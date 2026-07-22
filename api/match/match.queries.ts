import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { GetMatchesResponse, GetMatchesParams } from "./match.types";
import { matchApi } from "./match.api";

export const useGetMatches = (
  params: GetMatchesParams,
  queryParams?: Partial<UseQueryOptions<GetMatchesResponse>>,
) =>
  useQuery({
    queryKey: ["get-matches", params],
    queryFn: () => matchApi.getAll(params),
    ...queryParams,
  });
