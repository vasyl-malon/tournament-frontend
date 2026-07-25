import { cookies } from "next/headers";

export interface AuthSessionUser {
  id: string;
  firstName?: string;
  lastName?: string;
  role: "ADMIN" | "USER";
}

export interface AuthSessionState {
  accessToken: string | null;
  user: AuthSessionUser | null;
  tournamentId: string | null;
  adminTournamentId?: string | null;
  userTournamentId?: string | null;
}

export async function getAuthServerSession(): Promise<AuthSessionState | null> {
  const cookieStore = await cookies();
  const rawData = cookieStore.get("auth-storage")?.value;

  if (!rawData) return null;

  try {
    const parsed = JSON.parse(rawData);

    if (!parsed?.state) return null;

    return parsed.state as AuthSessionState;
  } catch {
    return null;
  }
}
