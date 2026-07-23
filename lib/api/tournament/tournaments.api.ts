import { api } from "../http";
import {
  GetMyTournamentsResponse,
} from "./tournaments.types";

export const tournamentApi = {
  getMy: async (headers: any) => {
    const res = await api.get<GetMyTournamentsResponse>("/tournaments/my", headers);
    return res.data;
  },
};
