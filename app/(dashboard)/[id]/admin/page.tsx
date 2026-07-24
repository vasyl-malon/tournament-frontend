import { getAuthServerSession } from "@/lib/auth-server";
import { tournamentApi } from "@/lib/api/tournament/tournaments.api";
import { redirect } from "next/navigation";

export default async function AdminDashboardRootPage() {
  const session = await getAuthServerSession();

  if (!session?.accessToken) {
    redirect("/login");
  }

  let tournaments;
  try {
    tournaments = await tournamentApi.getMy({
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
    });
  } catch {
    redirect("/login");
  }

  if (!tournaments?.data || tournaments.data.length === 0) {
    redirect("/no-tournaments");
  }

  const hasSavedTournament = tournaments.data.some(
    (t) => t.id === session.tournamentId,
  );

  const targetId = hasSavedTournament
    ? session.tournamentId
    : tournaments.data[0].id;

  redirect(`/${targetId}/admin/dashboard`);
}
