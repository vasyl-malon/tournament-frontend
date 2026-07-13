import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type User = {
  id: number
  email: string
  firstName: string
  lastName: string
  role: 'ADMIN' | 'USER'
  avatarUrl?: string
}

type AuthState = {
  accessToken: string | null
  user: User | null

  setAuth: (token: string, user: User) => void
  setUser: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,

      setAuth: (token, user) =>
        set({
          accessToken: token,
          user,
        }),

      setUser: (user) => set({ user }),

      logout: () =>
        set({
          accessToken: null,
          user: null,
        }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
      }),
    }
  )
)