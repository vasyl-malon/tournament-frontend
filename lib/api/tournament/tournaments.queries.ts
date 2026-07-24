import { useMutation, useQuery } from "@tanstack/react-query";
import { tournamentApi } from "./tournaments.api";
import { GetParticipantsOverviewParams } from "./tournaments.types";

export const useGetMyTournaments = () =>
  useQuery({
    queryKey: ["get-branches"],
    queryFn: tournamentApi.getMy,
  });

export const useAddParticipant = () =>
  useMutation({
    mutationKey: ["use-add-participant"],
    mutationFn: tournamentApi.addParticipant,
  });

export const useInviteUser = () =>
  useMutation({
    mutationKey: ["invite-user"],
    mutationFn: tournamentApi.inviteUser,
  });

export const getParticipantsOverview = (
  params: GetParticipantsOverviewParams,
) =>
  useQuery({
    queryKey: ["get-participants-overview"],
    queryFn: () => tournamentApi.getParticipantsOverview(params),
  });
