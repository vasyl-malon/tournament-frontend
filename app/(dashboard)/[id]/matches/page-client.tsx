"use client";

import { useGetAllMatches } from "@/api";
import { MatchCard } from "@/app/components/match-card";
import { useParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect, useMemo } from "react";
import { Match, MatchStatus } from "@/api/match/match.types";

type GroupedMatches = Record<string, Record<string, Match[]> | Match[]>;

export function Matches() {
  const { id } = useParams<{ id: string }>();

  const [activeStage, setActiveStage] = useState<string>("");
  const [activeMatchday, setActiveMatchday] = useState<string>("");

  const { data } = useGetAllMatches({ tournamentId: id });

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const newItems = useMemo(() => {
    if (!data?.data) return {} as GroupedMatches;

    return data.data.reduce((acc, match) => {
      const stage = match.stage || "UNKNOWN_STAGE";
      const currentMatchday = match.matchday ?? match.matchWeek;

      if (currentMatchday) {
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
    }, {} as GroupedMatches);
  }, [data?.data]);

  const stages = useMemo(() => Object.keys(newItems), [newItems]);

  const calculateBestMatchdayForStage = (
    stage: string,
    stageValue: any,
  ): string => {
    if (!data?.data || Array.isArray(stageValue)) return "";

    const stageMatches = data.data.filter((m) => m.stage === stage);
    const live = stageMatches.find((m) => m.status === MatchStatus.LIVE);

    if (live) {
      const md = live.matchday ?? live.matchWeek;
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
      .filter((m) => m.status === "FINISHED")
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
  };

  useEffect(() => {
    if (stages.length > 0 && !activeStage && data?.data) {
      let initialStage = stages[0];

      const liveMatch = data.data.find((m) => m.status === MatchStatus.LIVE);
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

      setActiveStage(initialStage);
      const stageValue = newItems[initialStage];
      setActiveMatchday(
        calculateBestMatchdayForStage(initialStage, stageValue),
      );
    }
  }, [stages, data?.data, activeStage, newItems]);

  const handleStageChange = (stage: string) => {
    setActiveStage(stage);

    const stageValue = newItems[stage];
    if (stageValue && !Array.isArray(stageValue)) {
      const bestMatchday = calculateBestMatchdayForStage(stage, stageValue);
      setActiveMatchday(bestMatchday);
    } else {
      setActiveMatchday("");
    }
  };

  if (!data) return <div className="text-[#9198a1]">Loading...</div>;
  if (data.data.length === 0)
    return <div className="text-[#9198a1]">No matches found</div>;

  return (
    <div className="space-y-6">
      <div className="flex max-md:flex-col gap-4 justify-between items-start md:items-center border-b border-[#3d444d]/40 pb-4">
        <h1 className="text-2xl font-semibold text-white">Matches</h1>

        {stages.length > 1 && activeStage && (
          <Tabs
            value={activeStage}
            onValueChange={handleStageChange}
            className="w-full md:w-auto"
            // orientation="vertical"
          >
            <TabsList className="bg-[#151b23] border !border-[#3d444d] flex flex-wrap gap-y-1 h-auto p-1 w-full">
              {stages.map((stage) => (
                <TabsTrigger
                  key={stage}
                  value={stage}
                  className="w-full data-[state=active]:bg-[#3d444d] data-[state=active]:text-white text-[#9198a1] uppercase text-xs px-3 py-1.5"
                >
                  {stage.replace("_", " ")}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
      </div>

      {activeStage &&
        newItems[activeStage] &&
        !Array.isArray(newItems[activeStage]) && (
          <div className="flex gap-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#3d444d] scrollbar-track-transparent">
            {Object.keys(newItems[activeStage] as Record<string, any[]>).map(
              (matchdayKey) => {
                const isActive = activeMatchday === matchdayKey;
                return (
                  <button
                    key={matchdayKey}
                    onClick={() => setActiveMatchday(matchdayKey)}
                    className={`px-4 py-1.5 text-xs font-medium rounded-full border whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#3d444d] text-white border-slate-400"
                        : "bg-[#151b23] text-[#9198a1] border-[#3d444d] hover:text-white hover:border-slate-500"
                    }`}
                  >
                    {matchdayKey.replace("_", " ")}
                  </button>
                );
              },
            )}
          </div>
        )}

      <div className="pt-2">
        {activeStage &&
          newItems[activeStage] &&
          (() => {
            const currentStageValue = newItems[activeStage];

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
                <div className="text-sm text-[#9198a1]">
                  No matches in this matchday
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
