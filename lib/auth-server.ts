import { cookies } from "next/headers";

export async function getAuthServerSession() {
  const cookieStore = await cookies();
  const rawData = cookieStore.get("auth-storage")?.value;

  if (!rawData) return null;

  try {
    const parsed = JSON.parse(rawData);
    return parsed.state as {
      accessToken: string | null;
      user: any | null;
      tournamentId: string | null;
    };
  } catch {
    return null;
  }
}
