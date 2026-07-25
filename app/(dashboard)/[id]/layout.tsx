"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useGetMyTournaments, useGetAllTournaments } from "@/lib/api";
import { useAuthStore } from "@/lib/auth.store";
import { toast } from "sonner";

export default function TournamentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id: tournamentId } = useParams<{ id: string }>();
  const pathname = usePathname();
  const router = useRouter();

  const { user, setTournamentId } = useAuthStore();
  const isAdmin = user?.role === "ADMIN";

  const myTournamentsQuery = useGetMyTournaments({ enabled: !isAdmin });
  const allTournamentsQuery = useGetAllTournaments({ enabled: isAdmin });

  const { data, isLoading } = isAdmin
    ? allTournamentsQuery
    : myTournamentsQuery;

  useEffect(() => {
    if (isLoading || !data?.data) return;

    const availableTournaments = data.data;

    const hasAccess = availableTournaments.some(
      (t) => String(t.id) === String(tournamentId),
    );

    const isAdminRoute = pathname.includes("/admin");

    if (!hasAccess) {
      if (availableTournaments.length > 0) {
        toast.error("You don't have access to this tournament");
        const fallbackId = availableTournaments[0].id;
        const targetPath = isAdmin ? "admin/dashboard" : "dashboard";

        router.replace(`/${fallbackId}/${targetPath}`);
      } else {
        router.replace("/no-tournaments");
      }
      return;
    }

    setTournamentId(String(tournamentId));

    if (isAdmin && !isAdminRoute) {
      router.replace(`/${tournamentId}/admin/dashboard`);
      return;
    }

    if (!isAdmin && isAdminRoute) {
      router.replace(`/${tournamentId}/dashboard`);
      return;
    }
  }, [
    tournamentId,
    data,
    isLoading,
    router,
    isAdmin,
    pathname,
    setTournamentId,
  ]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-page flex flex-col items-center justify-center gap-3">
        <Loader2 className="size-8 text-emerald-400 animate-spin" />
        <span className="text-xs text-gray-400 font-medium">
          Loading tournament data...
        </span>
      </div>
    );
  }

  return <>{children}</>;
}
