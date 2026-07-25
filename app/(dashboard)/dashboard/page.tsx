import { getAuthServerSession } from "@/lib/auth-server";
import { tournamentApi } from "@/lib/api/tournament/tournaments.api";
import { redirect } from "next/navigation";

export default async function DashboardRootPage() {
  const session = await getAuthServerSession();

  if (!session?.accessToken) {
    redirect("/login");
  }

  const isAdmin = session.user?.role === "ADMIN";

  let tournaments;
  try {
    const headers = {
      Authorization: `Bearer ${session.accessToken}`,
      "Content-Type": "application/json",
    };

    tournaments = isAdmin
      ? await tournamentApi.getAll({ headers })
      : await tournamentApi.getMy({ headers });
  } catch {
    redirect("/login");
  }

  if (!tournaments?.data || tournaments.data.length === 0) {
    redirect("/no-tournaments");
  }

  const savedTournamentId = isAdmin
    ? session.adminTournamentId || session.tournamentId
    : session.userTournamentId || session.tournamentId;

  const hasSavedTournament = tournaments.data.some(
    (t) => String(t.id) === String(savedTournamentId),
  );

  const targetId = hasSavedTournament
    ? savedTournamentId
    : tournaments.data[0].id;

  redirect(isAdmin ? `/${targetId}/dashboard` : `/${targetId}/admin/dashboard`);
}
