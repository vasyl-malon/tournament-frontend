import { AxiosRequestConfig } from "axios";
import { api } from "../http";
import {
  AddParticipantParams,
  GetMyTournamentsResponse,
  GetParticipantsOverviewParams,
  GetParticipantsOverviewResponse,
  InviteUserParams,
  InviteUserResponse,
} from "./tournaments.types";

export const tournamentApi = {
  getMy: async (headers: AxiosRequestConfig) => {
    const res = await api.get<GetMyTournamentsResponse>(
      "/tournaments/my",
      headers,
    );
    return res.data;
  },

  addParticipant: async (params: AddParticipantParams) => {
    const res = await api.post("/tournaments/participants", params);
    return res.data;
  },

  inviteUser: async ({ email, tournamentId }: InviteUserParams) => {
    const res = await api.post<InviteUserResponse>(
      `tournaments/${tournamentId}/invitations`,
      { email },
    );
    return res.data;
  },

  getParticipantsOverview: async ({
    tournamentId,
  }: GetParticipantsOverviewParams) => {
    const res = await api.get<GetParticipantsOverviewResponse>(
      `/tournaments/${tournamentId}/participants-overview`,
    );
    return res.data;
  },
};
