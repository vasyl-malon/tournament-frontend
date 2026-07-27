import { AxiosRequestConfig } from "axios";
import { api } from "../http";
import {
  AddParticipantParams,
  GetTournamentsResponse,
  GetParticipantsOverviewParams,
  GetParticipantsOverviewResponse,
  InviteUserParams,
  InviteUserResponse,
  SyncTournamentParams,
  FinalizeTournamentParams,
} from "./tournaments.types";

export const tournamentApi = {
  getMy: async (headers: AxiosRequestConfig) => {
    const res = await api.get<GetTournamentsResponse>(
      "/tournaments/my",
      headers,
    );
    return res.data;
  },

  getAll: async (headers: AxiosRequestConfig) => {
    const res = await api.get<GetTournamentsResponse>(
      "/tournaments/all",
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

  syncTeams: async ({ tournamentId }: SyncTournamentParams) => {
    const res = await api.post(`/tournaments/${tournamentId}/teams/sync`);
    return res.data;
  },

  syncMatches: async ({ tournamentId }: SyncTournamentParams) => {
    const res = await api.post(`/tournaments/${tournamentId}/matches/sync`);
    return res.data;
  },

  finalizeTournament: async (params: FinalizeTournamentParams) => {
    const res = await api.post(
      `/tournaments/${params.tournamentId}/finalize`,
      params,
    );
    return res.data;
  },
};
