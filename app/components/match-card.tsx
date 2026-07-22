"use client";

import dayjs from "dayjs";
import { FC, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, Lock, Shield, Trophy } from "lucide-react";
import { Match, MatchStage, MatchStatus } from "@/api/match/match.types";
import { useAddBet } from "@/api";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type MatchCardProps = {
  item: Match;
};

export const MatchCard: FC<MatchCardProps> = ({ item }) => {
  const { isPending, mutate } = useAddBet();
  const bet = item.bets?.length ? item.bets[0] : null;

  const [homeScore, setHomeScore] = useState<string>(
    bet?.homeScore?.toString() ?? "",
  );
  const [awayScore, setAwayScore] = useState<string>(
    bet?.awayScore?.toString() ?? "",
  );
  const [advancingTeamId, setAdvancingTeamId] = useState<number | undefined>(
    bet?.predictedAdvancingTeamId
      ? Number(bet.predictedAdvancingTeamId)
      : undefined,
  );

  const date = dayjs(item?.startTime).format("MMM DD, YYYY - HH:mm");
  const isStarted =
    dayjs().diff(item?.startTime) >= 0 || item.status !== MatchStatus.SCHEDULED;

  const isFinished = item.status === MatchStatus.FINISHED;
  const isLive = item.status === MatchStatus.LIVE;

  const isKnockout =
    item.stage &&
    ![
      MatchStage.GROUP_STAGE,
      MatchStage.LEAGUE_STAGE,
      MatchStage.REGULAR_SEASON,
    ].includes(item.stage as MatchStage);

  const totalPoints =
    (bet?.pointsEarned || 0) + (bet?.advancingPointsEarned || 0);

  const handleScoreChange = (val: string, type: "home" | "away") => {
    const cleanVal = val.replace(/\D/g, "").slice(0, 2);
    const newHome = type === "home" ? cleanVal : homeScore;
    const newAway = type === "away" ? cleanVal : awayScore;

    if (type === "home") setHomeScore(cleanVal);
    if (type === "away") setAwayScore(cleanVal);

    if (isKnockout && !isStarted) {
      const h = parseInt(newHome);
      const a = parseInt(newAway);

      if (!isNaN(h) && !isNaN(a)) {
        if (h > a && item.homeTeam?.id) {
          setAdvancingTeamId(item.homeTeam.id);
        } else if (a > h && item.awayTeam?.id) {
          setAdvancingTeamId(item.awayTeam.id);
        } else if (h === a) {
          setAdvancingTeamId(undefined);
        }
      }
    }
  };

  const formattedGroup = item.group ? item.group.replace(/^GROUP_/i, "") : null;

  return (
    <div className="flex flex-col gap-y-4 bg-brand-container border border-brand-border rounded-md p-4 sm:p-5 w-full transition-all">
      <div className="flex items-center justify-between text-xs text-gray-400 border-b border-brand-border/60 pb-3">
        <span>{date}</span>
        {item?.matchday ? (
          <span className="font-medium text-gray-300">
            Matchday {item?.matchday}
            {formattedGroup ? ` • Group ${formattedGroup}` : null}
          </span>
        ) : null}
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-2 py-2">
        <div className="flex flex-col items-center gap-2 text-center">
          {item.homeTeam ? (
            <>
              <div className="relative size-12 sm:size-14 shrink-0">
                <Image
                  src={item.homeTeam.logo}
                  alt={item.homeTeam.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-semibold text-sm sm:text-base text-white line-clamp-2">
                {item.homeTeam.name}
              </span>
            </>
          ) : (
            <Shield className="size-12 text-text-muted" />
          )}
        </div>

        <div className="flex flex-col items-center justify-center min-w-[8.5rem]">
          {item.homeScore !== null && item.awayScore !== null && isStarted ? (
            <div className="flex flex-col justify-center items-center w-full px-2">
              <span className="text-text-muted text-[0.675rem] uppercase tracking-wider font-semibold mb-1">
                Your prediction
              </span>
              <div className="text-white text-2xl sm:text-3xl font-black px-3 text-center tracking-tight">
                <span>{bet?.homeScore ?? "-"}</span> :{" "}
                <span>{bet?.awayScore ?? "-"}</span>
              </div>

              {isKnockout && bet?.predictedAdvancingTeamId && (
                <span className="text-xs text-amber-400 font-medium mt-1.5 flex items-center gap-1 text-center">
                  To advance:{" "}
                  <span className="text-gray-200 font-semibold">
                    {Number(bet.predictedAdvancingTeamId) === item.homeTeam?.id
                      ? item.homeTeam?.name
                      : item.awayTeam?.name}
                  </span>
                </span>
              )}

              <div className="flex flex-col items-center mt-3 pt-3 border-t border-brand-border/60 w-full">
                <span className="text-text-muted text-xs font-medium">
                  {isLive ? "Live score:" : "Final score:"}
                  <span className="font-bold text-white ms-1">
                    {item.homeScore} : {item.awayScore}
                  </span>
                </span>

                {item.homeScorePen !== null && item.awayScorePen !== null && (
                  <span className="text-xs font-semibold mt-1">
                    ({item.homeScorePen} : {item.awayScorePen} pen)
                  </span>
                )}

                {item.advancingTeamId && (
                  <span className="text-xs mt-2 flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium">
                    <Trophy className="size-3 shrink-0" />
                    <span className="font-semibold">
                      {Number(item.advancingTeamId) === item.homeTeam?.id
                        ? item.homeTeam?.name
                        : item.awayTeam?.name}
                    </span>
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full">
              <div className="flex items-center gap-2">
                <Input
                  value={homeScore}
                  disabled={isStarted}
                  onChange={(e) => handleScoreChange(e.target.value, "home")}
                  className="size-12 sm:size-14 border border-brand-border rounded-md text-center !text-2xl font-black text-white bg-[#161b22] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500 outline-none transition-all p-0"
                  placeholder="0"
                />
                <span className="text-text-muted font-bold text-xl">:</span>
                <Input
                  value={awayScore}
                  disabled={isStarted}
                  onChange={(e) => handleScoreChange(e.target.value, "away")}
                  className="size-12 sm:size-14 border border-brand-border rounded-md text-center !text-2xl font-black text-white bg-[#161b22] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500 outline-none transition-all p-0"
                  placeholder="0"
                />
              </div>

              {isKnockout && item.homeTeam && item.awayTeam && (
                <div className="mt-4 flex flex-col items-center gap-1.5 w-full">
                  <span className="text-[0.675rem] uppercase tracking-wider text-text-muted font-semibold">
                    Who qualifies?
                  </span>
                  <Tabs
                    value={advancingTeamId}
                    onValueChange={setAdvancingTeamId}
                    className="w-full md:w-auto"
                  >
                    <TabsList className="bg-[#161b22] border !border-brand-border flex flex-wrap h-auto p-1 w-full gap-x-1">
                      <TabsTrigger
                        value={item.homeTeam?.id}
                        className="w-full data-active:bg-emerald-600 data-active:text-white text-gray-400 uppercase text-xs px-3 py-1.5"
                      >
                        {item.homeTeam.name}
                      </TabsTrigger>
                      <TabsTrigger
                        value={item.awayTeam?.id}
                        className="w-full data-active:bg-emerald-600 data-active:text-white text-gray-400 uppercase text-xs px-3 py-1.5"
                      >
                        {item.awayTeam.name}
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          {item.awayTeam ? (
            <>
              <div className="relative size-12 sm:size-14 shrink-0">
                <Image
                  src={item.awayTeam.logo}
                  alt={item.awayTeam.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-semibold text-sm sm:text-base text-white line-clamp-2">
                {item.awayTeam.name}
              </span>
            </>
          ) : (
            <Shield className="size-12 text-text-muted" />
          )}
        </div>
      </div>

      <div className="mt-auto">
        {isFinished ? (
          bet ? (
            <div
              className={cn(
                "px-4 py-2 rounded-md text-xs sm:text-sm font-semibold text-center border transition-colors",
                totalPoints > 0
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : "bg-red-500/10 text-red-400 border-red-500/30",
              )}
            >
              {totalPoints === 0
                ? "0 points earned"
                : `+${totalPoints} points earned`}
            </div>
          ) : (
            <div className="px-4 py-2 rounded-md text-xs sm:text-sm font-semibold text-center bg-gray-800/40 text-gray-500 border border-brand-border/40">
              No prediction placed
            </div>
          )
        ) : (
          <Button
            variant="primary"
            disabled={
              !homeScore ||
              !awayScore ||
              isStarted ||
              isPending ||
              !!(isKnockout && !advancingTeamId)
            }
            className="w-full"
            onClick={() =>
              mutate(
                {
                  matchId: item.apiMatchId,
                  homeScore: parseInt(homeScore),
                  awayScore: parseInt(awayScore),
                  predictedAdvancingTeamId: isKnockout
                    ? advancingTeamId
                    : undefined,
                },
                {
                  onSuccess: () =>
                    toast.success("Your prediction has been saved!"),
                  onError: (e) =>
                    toast.error(`Something went wrong: ${e.message}`),
                },
              )
            }
          >
            {isStarted ? <Lock className="size-4 mr-1.5" /> : null}
            {isPending ? (
              <Loader className="size-4 mr-1.5 animate-spin" />
            ) : null}
            {bet ? "Update Prediction" : "Submit Prediction"}
          </Button>
        )}
      </div>
    </div>
  );
};
