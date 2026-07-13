import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "USER";
  avatarUrl?: string;
};

type AuthState = {
  accessToken: string | null;
  user: User | null;
  tournamentId: string | null;

  setAuth: (token: string, user: User) => void;
  setTournamentId: (id: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      tournamentId: null,
      setAuth: (token, user) =>
        set({
          accessToken: token,
          user,
        }),
      setTournamentId: (id) =>
        set({
          tournamentId: id,
        }),
      logout: () =>
        set({
          accessToken: null,
          user: null,
        }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        tournamentId: state.tournamentId,
      }),
    },
  ),
);
