import { getAuthServerSession } from "@/lib/auth-server";
import { tournamentApi } from "@/lib/api/tournament/tournaments.api";
import { redirect } from "next/navigation";

export default async function DashboardRootPage() {
  const session = await getAuthServerSession();

  if (!session?.accessToken) redirect("/login");

  const isAdmin = session.user?.role === "ADMIN";

  try {
    const headers = { Authorization: `Bearer ${session.accessToken}` };
    const res = isAdmin
      ? await tournamentApi.getAll({ headers })
      : await tournamentApi.getMy({ headers });

    const available = res?.data || [];
    if (available.length === 0) redirect("/no-tournaments");

    const savedId = isAdmin
      ? session.adminTournamentId
      : session.userTournamentId;
    const targetId = available.some((t) => String(t.id) === String(savedId))
      ? savedId
      : available[0].id;

    const targetPath = isAdmin ? "admin/dashboard" : "dashboard";
    redirect(`/${targetId}/${targetPath}`);
  } catch (error: any) {
    if (error?.response?.status === 401) {
      redirect("/login");
    }

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-brand-page text-center text-white px-4">
        <h2 className="text-xl font-bold mb-2">
          Service Temporarily Unavailable 🚧
        </h2>
        <p className="text-gray-400 text-sm">
          We are unable to connect to the server. Please try again in a few
          minutes.
        </p>
      </div>
    );
  }
}
