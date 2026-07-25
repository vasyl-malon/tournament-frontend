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
  userTournamentId: string | null;
  adminTournamentId: string | null;

  setAuth: (
    token: string,
    user: User,
    initialTournamentId?: string | null,
  ) => void;
  setTournamentId: (id: string | null) => void;
  getActiveTournamentId: () => string | null;

  logout: () => void;
};

const cookieStorage: StateStorage = {
  getItem: (name: string) => Cookies.get(name) ?? null,
  setItem: (name: string, value: string) => {
    Cookies.set(name, value, { expires: 7, path: "/" });
  },
  removeItem: (name: string) => {
    Cookies.remove(name, { path: "/" });
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      userTournamentId: null,
      adminTournamentId: null,

      setAuth: (token, user, initialTournamentId = null) =>
        set(() => {
          const isAdmin = user.role === "ADMIN";
          return {
            accessToken: token,
            user,
            ...(initialTournamentId
              ? isAdmin
                ? { adminTournamentId: initialTournamentId }
                : { userTournamentId: initialTournamentId }
              : {}),
          };
        }),

      setTournamentId: (id) =>
        set((state) => {
          const isAdmin = state.user?.role === "ADMIN";
          return isAdmin ? { adminTournamentId: id } : { userTournamentId: id };
        }),

      getActiveTournamentId: () => {
        const state = get();
        return state.user?.role === "ADMIN"
          ? state.adminTournamentId
          : state.userTournamentId;
      },

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
        userTournamentId: state.userTournamentId,
        adminTournamentId: state.adminTournamentId,
      }),
    },
  ),
);
