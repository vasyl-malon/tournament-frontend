"use client";

import dayjs from "dayjs";
import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, Lock, Shield, Trophy } from "lucide-react";
import { Match, MatchStage, MatchStatus } from "@/api/match/match.types";
import { useAddBet } from "@/api";
import { cn } from "@/lib/utils";

type MatchCardProps = {
  item: Match;
};

export const MatchCard: FC<MatchCardProps> = ({ item }) => {
  const { isPending, mutate } = useAddBet();
  const bet = item.bets?.length ? item.bets[0] : null;

  const [homeScore, setHomeScore] = useState<string>(
    bet?.homeScore?.toString() || "",
  );
  const [awayScore, setAwayScore] = useState<string>(
    bet?.awayScore?.toString() || "",
  );
  const [advancingTeamId, setAdvancingTeamId] = useState<number | undefined>(
    bet?.predictedAdvancingTeamId
      ? Number(bet.predictedAdvancingTeamId)
      : undefined,
  );

  const date = dayjs(item?.startTime).format("MMM DD, YYYY - HH:mm");
  const isStarted =
    dayjs().diff(item?.startTime) >= 0 || item.status !== MatchStatus.SCHEDULED;

  const isKnockout =
    item.stage &&
    ![
      MatchStage.GROUP_STAGE,
      MatchStage.LEAGUE_PHASE,
      MatchStage.REGULAR_SEASON,
    ].includes(item.stage as MatchStage);

  const totalPoints =
    (bet?.pointsEarned || 0) + (bet?.advancingPointsEarned || 0);

  useEffect(() => {
    if (!isKnockout || isStarted) return;

    const hScore = parseInt(homeScore);
    const aScore = parseInt(awayScore);

    if (!isNaN(hScore) && !isNaN(aScore)) {
      if (hScore > aScore && item.homeTeam?.id)
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAdvancingTeamId(item.homeTeam.id);
      if (aScore > hScore && item.awayTeam?.id)
        setAdvancingTeamId(item.awayTeam.id);
    }
  }, [
    homeScore,
    awayScore,
    isKnockout,
    isStarted,
    item.homeTeam?.id,
    item.awayTeam?.id,
  ]);

  return (
    <div className="flex flex-col gap-y-4 bg-brand-container border border-brand-border rounded-md p-4 pt-8 w-full">
      <div className="flex grid grid-cols-3 grid-cols-[1fr_auto_1fr] gap-x-2">
        <div className="flex flex-col items-center gap-2 flex-1 pt-2">
          {item.homeTeam ? (
            <>
              <Image
                src={item.homeTeam.logo}
                alt={`Team logo - ${item.homeTeam.name}`}
                width={48}
                height={48}
                className="object-contain size-12"
              />
              <span className="font-semibold text-center text-sm sm:text-base break-all">
                {item.homeTeam.name}
              </span>
            </>
          ) : (
            <Shield className="size-12 text-text-muted" />
          )}
        </div>

        <div className="flex flex-col items-center justify-center">
          {item.homeScore !== null &&
          item.awayScore !== null &&
          item.status !== MatchStatus.SCHEDULED ? (
            <div className="flex flex-col justify-center items-center w-full px-2">
              <span className="text-text-muted text-[11px] uppercase tracking-wider font-medium mb-1">
                Your bet
              </span>
              <div className="text-text-primary text-3xl font-bold px-4 text-center tracking-tight">
                <span>{bet?.homeScore ?? "-"}</span> :{" "}
                <span>{bet?.awayScore ?? "-"}</span>
              </div>

              {isKnockout && bet?.predictedAdvancingTeamId && (
                <span className="text-xs text-nomination-champion font-medium mt-1.5 flex items-center gap-1">
                  To advance:{" "}
                  <span className="text-text-secondary">
                    {Number(bet.predictedAdvancingTeamId) === item.homeTeam?.id
                      ? item.homeTeam.name
                      : item.awayTeam?.name}
                  </span>
                </span>
              )}

              <div className="flex flex-col items-center mt-4 pt-3 border-t border-brand-border-muted w-full">
                <span className="text-text-muted text-xs">
                  Final score:
                  <span className="font-bold text-text-primary ms-1 text-red-500">
                    {item.homeScore} : {item.awayScore}
                  </span>
                </span>

                {item.homeScorePen !== null && item.awayScorePen !== null && (
                  <span className="text-xs font-semibold text-nomination-scorer mt-0.5">
                    ({item.homeScorePen} : {item.awayScorePen} pen)
                  </span>
                )}

                {item.advancingTeamId && (
                  <span className="text-xs mt-2 flex items-center gap-1 px-2 py-1 rounded border border-white/40">
                    <div>
                      <Trophy className="size-3" />
                    </div>
                    <span className="font-semibold">
                      {Number(item.advancingTeamId) === item.homeTeam?.id
                        ? item.homeTeam.name
                        : item.awayTeam?.name}
                    </span>
                    qualified
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
                  onChange={(e) => setHomeScore(e.target.value)}
                  className="size-14 border border-brand-border rounded-lg text-center !text-2xl font-bold text-text-primary bg-brand-card focus-visible:ring-1 focus-visible:ring-red-500 focus-visible:border-red-500 outline-none transition-all"
                  placeholder="0"
                />
                <span className="text-text-muted font-bold text-xl">:</span>
                <Input
                  value={awayScore}
                  disabled={isStarted}
                  onChange={(e) => setAwayScore(e.target.value)}
                  className="size-14 border border-brand-border rounded-lg text-center !text-2xl font-bold text-text-primary bg-brand-card focus-visible:ring-1 focus-visible:ring-red-500 focus-visible:border-red-500 outline-none transition-all"
                  placeholder="0"
                />
              </div>

              {isKnockout && item.homeTeam && item.awayTeam && (
                <div className="mt-4 flex flex-col items-center gap-1.5 w-full">
                  <span className="text-xs uppercase tracking-wider text-text-muted font-bold">
                    Who qualifies?
                  </span>
                  <div className="flex bg-brand-card rounded p-1 border border-brand-border w-full">
                    <button
                      type="button"
                      disabled={isStarted || !homeScore || !awayScore}
                      className={cn(
                        "flex-1 px-2 py-1.5 text-xs rounded font-medium transition-all duration-150 truncate cursor-pointer active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed",
                        advancingTeamId === item.homeTeam.id
                          ? "bg-red-600 text-white shadow-sm font-semibold"
                          : "text-text-muted hover:text-text-secondary",
                      )}
                      onClick={() => setAdvancingTeamId(item.homeTeam.id)}
                    >
                      {item.homeTeam.name}
                    </button>
                    <button
                      type="button"
                      disabled={isStarted || !homeScore || !awayScore}
                      className={cn(
                        "flex-1 px-2 py-1.5 text-xs rounded font-medium transition-all duration-150 truncate cursor-pointer active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed",
                        advancingTeamId === item.awayTeam.id
                          ? "bg-red-600 text-white shadow-sm font-semibold"
                          : "text-text-muted hover:text-text-secondary",
                      )}
                      onClick={() => setAdvancingTeamId(item.awayTeam.id)}
                    >
                      {item.awayTeam.name}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-2 flex-1 pt-2">
          {item.awayTeam ? (
            <>
              <Image
                src={item.awayTeam.logo}
                alt={`Team logo - ${item.awayTeam.name}`}
                width={48}
                height={48}
                className="object-contain size-12"
              />
              <span className="font-semibold text-center text-sm sm:text-base break-all">
                {item.awayTeam.name}
              </span>
            </>
          ) : (
            <Shield className="size-12 text-text-muted" />
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-y-1 text-xs text-gray-400 my-2">
        <span>{date}</span>
        {item?.matchday ? (
          <span>
            Matchday {item?.matchday}
            {item.group ? ` • Group ${item.group.split("_")[1]}` : null}
          </span>
        ) : null}
      </div>

      {item.status === MatchStatus.FINISHED && bet ? (
        <div
          className={cn(
            "px-4 py-2.5 rounded-sm text-sm font-bold text-center border transition-colors",
            totalPoints
              ? "bg-green-950/20 text-success border-green-500/20"
              : "bg-red-950/20 text-error border-red-500/20",
          )}
        >
          {totalPoints === 0 ? "0 points" : `+${totalPoints} points`}
        </div>
      ) : (
        <Button
          variant="outline"
          size="lg"
          disabled={
            !homeScore ||
            !awayScore ||
            isStarted ||
            isPending ||
            !!(isKnockout && !advancingTeamId)
          }
          onClick={() =>
            mutate({
              matchId: item.apiMatchId,
              homeScore: parseInt(homeScore),
              awayScore: parseInt(awayScore),
              predictedAdvancingTeamId: isKnockout
                ? advancingTeamId
                : undefined,
            })
          }
          className="mt-auto border-none bg-red-600 hover:bg-red-700 disabled:bg-brand-card disabled:text-text-muted text-white font-semibold text-sm py-2.5 transition-all active:scale-[0.99] cursor-pointer"
        >
          {isStarted ? <Lock className="size-4 me-2" /> : null}
          {isPending ? <Loader className="size-4 me-2 animate-spin" /> : null}
          {bet ? "Update Prediction" : "Submit Prediction"}
        </Button>
      )}
    </div>
  );
};
