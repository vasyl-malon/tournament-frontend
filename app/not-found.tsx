"use client";

import { useRouter } from "next/navigation";
import { Home, ArrowLeft, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/auth.store";

export default function NotFound() {
  const router = useRouter();
  const { user, getActiveTournamentId } = useAuthStore();

  const isAdmin = user?.role === "ADMIN";
  const activeTournamentId = getActiveTournamentId();

  const handleDashboardClick = () => {
    if (activeTournamentId) {
      router.push(
        `/${activeTournamentId}${isAdmin ? "/admin/dashboard" : "/dashboard"}`,
      );
    } else {
      router.push(isAdmin ? "/admin" : "/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-brand-page text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute size-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -top-20 -left-20" />
      <div className="absolute size-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -bottom-20 -right-20" />

      <div className="relative z-10 max-w-md w-full text-center space-y-6 bg-[#161b22]/80 border border-brand-border/60 p-8 rounded-2xl backdrop-blur-md shadow-2xl">
        <div className="mx-auto size-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner">
          <ShieldAlert className="size-8" />
        </div>

        <div className="space-y-2">
          <span className="inline-block text-[0.65rem] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20">
            404 — Offside
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight pt-1">
            Page Not Found
          </h1>
          <p className="text-xs text-gray-400 font-normal leading-relaxed">
            The page or tournament you are looking for doesn`t exist, has been
            moved, or you don`t have access to it.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="size-4" />
            <span>Go Back</span>
          </Button>

          <Button variant="primary" onClick={handleDashboardClick}>
            <Home className="size-4" />
            <span>Dashboard</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
