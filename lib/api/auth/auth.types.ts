export type LoginParams = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  lastTournamentId: string | null;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: "ADMIN" | "USER";
  };
};

export type RegisterParams = {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  token: string;
};

export type RegisterResponse = LoginResponse;
