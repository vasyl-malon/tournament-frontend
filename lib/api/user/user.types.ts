export type GetActiveUsersParams = {
  query?: string
  tournamentId?: string
};

export type GetActiveUsersResponse = {
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }[];
};
