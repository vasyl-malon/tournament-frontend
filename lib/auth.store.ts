import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";
import Cookies from "js-cookie";

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

const cookieStorage: StateStorage = {
  getItem: (name: string) => {
    return Cookies.get(name) ?? null;
  },
  setItem: (name: string, value: string) => {
    Cookies.set(name, value, { expires: 7, path: "/" });
  },
  removeItem: (name: string) => {
    Cookies.remove(name, { path: "/" });
  },
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
      storage: createJSONStorage(() => cookieStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        tournamentId: state.tournamentId,
      }),
    },
  ),
);
