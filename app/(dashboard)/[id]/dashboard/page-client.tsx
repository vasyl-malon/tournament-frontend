"use client";

import { useGetAllMatches } from "@/api";
import { useGetBonusPrediction } from "@/api/match/match.queries";
import { MatchStatus } from "@/api/match/match.types";
import { MatchCard } from "@/app/components/match-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/store/auth.store";
import {
  Clock,
  Trophy,
  ChevronRight,
  CalendarOff,
  Sparkles,
  HelpCircle,
  PlusCircle,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";

const MATCHES_LIMIT = 4;

export const Dashboard = () => {
  const { user } = useAuthStore();
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: matches, isLoading } = useGetAllMatches({
    tournamentId: id,
    status: MatchStatus.SCHEDULED,
    limit: MATCHES_LIMIT,
  });

  const { data: bonusData, isLoading: isBonusLoading } = useGetBonusPrediction(
    { tournamentId: id },
    { enabled: !!id },
  );

  const bonusSummary = [
    {
      label: "Winner",
      value: bonusData?.champion?.name,
      logo: bonusData?.champion?.logo,
    },
    {
      label: "Runner-up",
      value: bonusData?.runnerUp?.name,
      logo: bonusData?.runnerUp?.logo,
    },
    {
      label: "Top Scorer",
      value: bonusData?.topScorer?.name,
      logo: bonusData?.topScorer?.teamLogo,
    },
  ];

  const hasBonusPredictions = Boolean(
    bonusData?.champion || bonusData?.runnerUp || bonusData?.topScorer,
  );

  return (
    <div className="flex flex-col gap-y-8">
      <div className="relative overflow-hidden p-6 bg-brand-container rounded-md border border-brand-border flex flex-col gap-y-1">
        <div className="absolute -right-10 -bottom-10 size-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold w-fit mb-1">
          <Sparkles className="size-3" />
          <span>Dashboard Overview</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Welcome back, {user?.firstName ?? "Predictor"}!
        </h1>
        <p className="text-sm sm:text-base text-gray-400">
          Ready to submit your picks for the upcoming fixtures?
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="flex flex-col gap-y-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white tracking-tight">
              Upcoming Matches
            </h2>
            <Button size="sm" onClick={() => router.push(`/${id}/matches`)}>
              View all
              <ChevronRight className="size-4" />
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: MATCHES_LIMIT }).map((_, i) => (
                <Skeleton key={i} className="h-64 w-full rounded-md" />
              ))}
            </div>
          ) : !matches?.data || matches.data.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 bg-brand-container border border-brand-border rounded-md text-center space-y-4">
              <CalendarOff className="size-8 text-gray-400" />
              <p className="text-xs text-gray-400 font-medium">
                No scheduled matches found for this tournament.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {matches.data.map((item) => (
                <MatchCard item={item} key={item.id} />
              ))}
            </div>
          )}
        </div>

        {isBonusLoading ? (
          <Skeleton className="w-full h-80 rounded-md" />
        ) : (
          <div className="flex flex-col gap-y-4 bg-brand-container border border-brand-border rounded-md p-4 md:p-5 w-full">
            <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
              <div className="flex items-center gap-2">
                <Trophy className="size-4 text-amber-400" />
                <h2 className="text-base font-bold text-white">
                  Bonus Predictions
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Clock className="size-4 shrink-0" />
              <span>Locks automatically when tournament starts!</span>
            </div>

            {hasBonusPredictions ? (
              <div className="space-y-2 text-sm">
                {bonusSummary.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-2.5 rounded-md bg-[#161b22] border border-brand-border/40"
                  >
                    <span className="text-gray-400 font-medium">
                      {item.label}
                    </span>
                    <div className="flex items-center gap-2">
                      {item.logo ? (
                        <div className="relative size-5 shrink-0">
                          <Image
                            fill
                            src={item.logo}
                            alt={item.label}
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <HelpCircle className="size-4 text-gray-500" />
                      )}
                      <span
                        className={cn(
                          item.value
                            ? "text-white font-semibold"
                            : "text-gray-400 font-medium",
                        )}
                      >
                        {item.value ?? "Not selected"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-5 text-center bg-[#161b22]/60 border border-dashed border-brand-border/80 rounded-md gap-y-3">
                <div className="p-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <PlusCircle className="size-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-white">
                    No bonus picks yet!
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Predict the tournament champion, runner-up, and top scorer
                    to earn extra leaderboard points.
                  </p>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-brand-border/60">
              <Button
                onClick={() => router.push(`/${id}/bonus`)}
                className="w-full"
                variant={hasBonusPredictions ? "outline" : "default"}
              >
                {hasBonusPredictions
                  ? "View & Edit Predictions"
                  : "Make Your Predictions"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
