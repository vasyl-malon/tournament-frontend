"use client";

import { FC } from "react";
import { Trophy, Calendar, ChevronRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/lib/auth.store";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useGetMyTournaments } from "@/lib/api";

interface TournamentParticipation {
  id: string;
  name: string;
  logo?: string;
  myPoints: number;
  myRank: number;
  totalParticipants: number;
  status: "ACTIVE" | "COMPLETED" | "UPCOMING";
}

interface UserProfileData {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  stats: {
    totalPredictions: number;
    exactScores: number;
    totalPoints: number;
    globalRank: number;
  };
  activeTournaments: TournamentParticipation[];
}

interface ProfileViewProps {
  data?: UserProfileData;
  isLoading?: boolean;
}

export const Profile: FC<ProfileViewProps> = ({ data, isLoading }) => {
  const { user } = useAuthStore();
  const router = useRouter();

  const { data: tournaments } = useGetMyTournaments();

  const firstName = data?.firstName ?? user?.firstName ?? "User";
  const lastName = data?.lastName ?? user?.lastName ?? "";
  const email = data?.email ?? user?.email ?? "";

  if (isLoading) {
    return (
      <div className="flex flex-col gap-y-6 max-w-5xl mx-auto w-full p-4">
        <Skeleton className="h-36 w-full rounded-md" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-md" />
          ))}
        </div>
        <Skeleton className="h-64 w-full rounded-md" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-8 max-w-5xl mx-auto w-full text-white">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 md:p-8 bg-brand-container border border-brand-border rounded-md relative overflow-hidden shadow-sm">
        <div className="absolute -right-12 -bottom-12 size-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 sm:gap-6 z-10">
          <div className="relative size-16 sm:size-20 rounded-full bg-[#161b22] border-2 border-brand-border flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
            <span className="text-xl sm:text-2xl font-bold text-emerald-400">
              {firstName?.[0]}
              {lastName?.[0]}
            </span>
          </div>
          <div className="flex flex-col gap-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold w-fit">
              <ShieldCheck className="size-3" />
              <span>Verified Predictor</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {firstName} {lastName}
            </h1>
            <p className="text-xs sm:text-sm text-gray-400">{email}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="size-5 text-amber-400" />
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Active Tournaments
            </h2>
          </div>
          <span className="text-xs text-gray-400 font-medium">
            {tournaments?.data.length} active
          </span>
        </div>

        {tournaments?.data.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 bg-brand-container border border-brand-border rounded-md text-center space-y-3">
            <Calendar className="size-8 text-gray-500" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-white">
                No active tournaments
              </p>
              <p className="text-xs text-gray-400">
                You haven&apos;t joined any ongoing tournaments yet.
              </p>
            </div>
            <Button size="sm" onClick={() => router.push("/tournaments")}>
              Explore Tournaments
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tournaments?.data.map((tournament) => (
              <div
                key={tournament.id}
                onClick={() => router.push(`/${tournament.id}/dashboard`)}
                className="group flex items-center justify-between p-4 bg-brand-container border border-brand-border rounded-md hover:border-emerald-500/50 transition-all cursor-pointer shadow-sm"
              >
                <div className="flex items-center gap-3.5">
                  <div className=" bg-white/90 relative size-12 rounded-md bg-[#161b22] border border-brand-border/60 flex items-center justify-center overflow-hidden shrink-0">
                    {tournament.emblem ? (
                      <Image
                        fill
                        src={tournament.emblem}
                        alt={tournament.name}
                        className="object-contain p-1"
                      />
                    ) : (
                      <Trophy className="size-5 text-amber-400" />
                    )}
                  </div>
                  <div className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    {tournament.name}
                  </div>
                </div>

                <div className="p-2 rounded-md bg-[#161b22] border border-brand-border/50 text-gray-400 group-hover:text-white group-hover:border-emerald-500/40 transition-all">
                  <ChevronRight className="size-4" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
