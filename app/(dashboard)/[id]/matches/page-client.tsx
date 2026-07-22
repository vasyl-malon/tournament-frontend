"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { CalendarX2 } from "lucide-react";
import { useGetAllMatches } from "@/api";
import { MatchCard } from "@/app/components/match-card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Match, MatchStatus } from "@/api/match/match.types";
import { MATCH_STAGE_LABELS, cn } from "@/lib/utils";

type GroupedMatches = Record<string, Record<string, Match[]> | Match[]>;

const formatMatchdayKey = (key: string) => {
  return key
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export function Matches() {
  const { id } = useParams<{ id: string }>();

  const [activeStage, setActiveStage] = useState<string>("");
  const [activeMatchday, setActiveMatchday] = useState<string>("");

  const { data, isLoading } = useGetAllMatches({ tournamentId: id });

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const groupedMatches = useMemo(() => {
    if (!data?.data) return {} as GroupedMatches;

    return data.data.reduce<GroupedMatches>((acc, match) => {
      const stage = match.stage || "UNKNOWN_STAGE";
      const currentMatchday = match.matchday ?? match.matchWeek;

      if (currentMatchday !== undefined && currentMatchday !== null) {
        if (!acc[stage] || Array.isArray(acc[stage])) {
          acc[stage] = {};
        }
        const matchdayKey = `MATCHDAY_${currentMatchday}`;
        const stageObj = acc[stage] as Record<string, Match[]>;

        if (!stageObj[matchdayKey]) stageObj[matchdayKey] = [];
        stageObj[matchdayKey].push(match);
      } else {
        if (!acc[stage] || !Array.isArray(acc[stage])) {
          acc[stage] = [];
        }
        (acc[stage] as Match[]).push(match);
      }
      return acc;
    }, {});
  }, [data?.data]);

  const stages = useMemo(() => Object.keys(groupedMatches), [groupedMatches]);

  const calculateBestMatchdayForStage = useCallback(
    // eslint-disable-next-line react-hooks/preserve-manual-memoization, @typescript-eslint/no-explicit-any
    (stage: string, stageValue: any): string => {
      if (!data?.data || Array.isArray(stageValue)) return "";

      const stageMatches = data.data.filter((m) => m.stage === stage);

      const liveMatch = stageMatches.find(
        (m) =>
          m.status === MatchStatus.LIVE ||
          (m.status as unknown as string) === "LIVE",
      );
      if (liveMatch) {
        const md = liveMatch.matchday ?? liveMatch.matchWeek;
        if (md) return `MATCHDAY_${md}`;
      }

      const upcoming = stageMatches
        .filter((m) => m.status === MatchStatus.SCHEDULED)
        .sort(
          (a, b) =>
            new Date(a.utcDate || a.startTime).getTime() -
            new Date(b.utcDate || b.startTime).getTime(),
        );

      if (upcoming.length > 0) {
        const md = upcoming[0].matchday ?? upcoming[0].matchWeek;
        if (md) return `MATCHDAY_${md}`;
      }

      const finished = stageMatches
        .filter((m) => m.status === MatchStatus.FINISHED)
        .sort(
          (a, b) =>
            new Date(b.utcDate || b.startTime).getTime() -
            new Date(a.utcDate || a.startTime).getTime(),
        );

      if (finished.length > 0) {
        const md = finished[0].matchday ?? finished[0].matchWeek;
        if (md) return `MATCHDAY_${md}`;
      }

      return Object.keys(stageValue)[0] || "";
    },
    [data?.data],
  );

  useEffect(() => {
    if (stages.length > 0 && !activeStage && data?.data) {
      let initialStage = stages[0];

      const liveMatch = data.data.find(
        (m) =>
          m.status === MatchStatus.LIVE ||
          (m.status as unknown as string) === "LIVE",
      );

      if (liveMatch?.stage && stages.includes(liveMatch.stage)) {
        initialStage = liveMatch.stage;
      } else {
        const upcoming = data.data
          .filter((m) => m.status === MatchStatus.SCHEDULED)
          .sort(
            (a, b) =>
              new Date(a.utcDate || a.startTime).getTime() -
              new Date(b.utcDate || b.startTime).getTime(),
          );

        if (
          upcoming.length > 0 &&
          upcoming[0].stage &&
          stages.includes(upcoming[0].stage)
        ) {
          initialStage = upcoming[0].stage;
        }
      }

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveStage(initialStage);
      const stageValue = groupedMatches[initialStage];
      setActiveMatchday(
        calculateBestMatchdayForStage(initialStage, stageValue),
      );
    }
  }, [
    stages,
    data?.data,
    activeStage,
    groupedMatches,
    calculateBestMatchdayForStage,
  ]);

  const handleStageChange = (stage: string) => {
    setActiveStage(stage);

    const stageValue = groupedMatches[stage];
    if (stageValue && !Array.isArray(stageValue)) {
      const bestMatchday = calculateBestMatchdayForStage(stage, stageValue);
      setActiveMatchday(bestMatchday);
    } else {
      setActiveMatchday("");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-brand-border/40 pb-4">
          <Skeleton className="h-8 w-36 rounded-md " />
          <Skeleton className="h-10 w-full md:w-64 rounded-md" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-md" />
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-brand-container border border-brand-border rounded-md text-center space-y-4">
        <CalendarX2 className="size-8 text-gray-500" />
        <p className="text-gray-400 text-sm font-medium">
          No matches found for this tournament.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex max-md:flex-col gap-4 justify-between items-start md:items-center border-b border-brand-border/40 pb-4">
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          Matches
        </h1>
        {stages.length > 1 && activeStage && (
          <Tabs
            value={activeStage}
            onValueChange={handleStageChange}
            className="w-full md:w-auto"
          >
            <TabsList className="bg-brand-container border !border-brand-border flex flex-wrap gap-y-1 h-auto p-1 w-full">
              {stages.map((stage) => (
                <TabsTrigger
                  key={stage}
                  value={stage}
                  className="w-full text-gray-400 uppercase text-xs px-3 py-1.5"
                >
                  {MATCH_STAGE_LABELS[stage as keyof typeof MATCH_STAGE_LABELS]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
      </div>

      {activeStage &&
        groupedMatches[activeStage] &&
        !Array.isArray(groupedMatches[activeStage]) && (
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {Object.keys(
              groupedMatches[activeStage] as Record<string, Match[]>,
            ).map((matchdayKey) => {
              const isActive = activeMatchday === matchdayKey;
              return (
                <button
                  key={matchdayKey}
                  onClick={() => setActiveMatchday(matchdayKey)}
                  className={cn(
                    "px-3.5 py-1.5 text-xs font-semibold rounded-xl border whitespace-nowrap transition-all cursor-pointer active:scale-95",
                    isActive
                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/40 shadow-sm"
                      : "bg-brand-container text-gray-400 border-brand-border hover:text-white hover:border-brand-border-muted",
                  )}
                >
                  {formatMatchdayKey(matchdayKey)}
                </button>
              );
            })}
          </div>
        )}

      <div className="pt-1">
        {activeStage &&
          groupedMatches[activeStage] &&
          (() => {
            const currentStageValue = groupedMatches[activeStage];

            if (Array.isArray(currentStageValue)) {
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {currentStageValue.map((match) => (
                    <MatchCard item={match} key={match.id} />
                  ))}
                </div>
              );
            }

            const matchesForSelectedMatchday =
              currentStageValue[activeMatchday] || [];

            if (matchesForSelectedMatchday.length === 0) {
              return (
                <div className="text-sm text-gray-400 p-8 text-center bg-brand-container/40 rounded-md border border-brand-border/40">
                  No matches found in this matchday.
                </div>
              );
            }

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {matchesForSelectedMatchday.map((match) => (
                  <MatchCard item={match} key={match.id} />
                ))}
              </div>
            );
          })()}
      </div>
    </div>
  );
}
