import { getAuthServerSession } from "@/lib/auth-server";
import { tournamentApi } from "@/lib/api/tournament/tournaments.api";
import { notFound, redirect } from "next/navigation";

export default async function TournamentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id: tournamentId } = await params;
  const session = await getAuthServerSession();

  if (!session?.accessToken) redirect("/login");

  const isAdmin = session.user?.role === "ADMIN";

  try {
    const headers = { Authorization: `Bearer ${session.accessToken}` };
    const res = isAdmin
      ? await tournamentApi.getAll({ headers })
      : await tournamentApi.getMy({ headers });

    const hasAccess = res?.data?.some(
      (t) => String(t.id) === String(tournamentId),
    );

    if (!hasAccess) notFound();
  } catch (error: any) {
    if (error?.response?.status === 401) redirect("/login");

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-brand-page text-white">
        Server is down. Please wait.
      </div>
    );
  }

  return children;
}
