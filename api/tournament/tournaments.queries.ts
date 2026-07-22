import { useQuery } from "@tanstack/react-query";
import { GetMyTournamentsResponse } from "./tournaments.types";
import { AxiosError } from "axios";
import { tournamentApi } from "./tournaments.api";

export const useGetMyTournaments = () =>
  useQuery<GetMyTournamentsResponse, AxiosError>({
    queryKey: ["get-branches"],
    queryFn: tournamentApi.getMy,
  });
