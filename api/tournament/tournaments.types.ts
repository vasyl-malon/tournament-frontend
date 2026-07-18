export type GetMyTournamentsResponse = {
  data: {
    apiCode: string;
    createdAt: string;
    id: string;
    name: string;
    status: string;
  }[];
};

export type GetTeamsParams = {
  tournamentId: string;
  search?: string;
};

export type GetTeamsResponse = {
  data: Array<{
    id: number;
    name: string;
    logo: string;
  }>;
};

export type GetPlayersParams = {
  tournamentId: string;
  search?: string;
};

export type GetPlayersResponse = {
  data: Array<{
    id: number;
    name: string;
    position: string;
    team: {
      name: string;
      logo: string;
    };
  }>;
};
