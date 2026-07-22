import { api } from "../http";
import {
  GetMyTournamentsResponse,
} from "./tournaments.types";

export const tournamentApi = {
  getMy: async () => {
    const res = await api.get<GetMyTournamentsResponse>("/tournaments/my");
    return res.data;
  },
};
