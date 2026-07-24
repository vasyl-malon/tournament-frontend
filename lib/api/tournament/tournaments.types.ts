export type GetMyTournamentsResponse = {
  data: {
    apiCode: string;
    createdAt: string;
    id: string;
    name: string;
    status: string;
    emblem: string | null;
  }[];
};

export type AddParticipantParams = {
  userId: string;
  tournamentId: string;
};

export type InviteUserParams = {
  email: string;
  tournamentId: string;
};

export type InviteUserResponse = {
  data: {
    id: string;
    url: string;
  };
};

export type GetParticipantsOverviewParams = {
  tournamentId: string;
};

export type GetParticipantsOverviewResponse = {
  data: {
    participants: Array<{
      id: string;
      participantId: string;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
      joinedAt: string;
    }>;
    pendingInvitations: Array<{
      id: string;
      email: string;
      createdAt: string;
      expiresAt: string;
      status: string;
    }>;
  };
};
