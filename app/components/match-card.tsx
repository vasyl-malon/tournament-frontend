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

  // 💡 UX Авто-вибір команди на прохід за її числовим ID залежно від рахунку
  useEffect(() => {
    if (!isKnockout || isStarted) return;

    const hScore = parseInt(homeScore);
    const aScore = parseInt(awayScore);

    if (!isNaN(hScore) && !isNaN(aScore)) {
      if (hScore > aScore && item.homeTeam?.id)
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
    <div className="flex flex-col gap-y-4 bg-brand-container text-text-muted border border-brand-border rounded-md p-4 pt-8 w-full transition-all duration-200 hover:border-brand-border-muted">
      <div className="flex items-start justify-between">
        {/* Home Team */}
        <div className="flex flex-col items-center gap-2 flex-1 pt-2">
          {item.homeTeam ? (
            <>
              <Image
                src={item.homeTeam.logo || "/placeholder.png"}
                alt={`Team logo - ${item.homeTeam.name}`}
                width={48}
                height={48}
                className="object-contain"
              />
              <span className="font-semibold text-text-primary text-center text-sm sm:text-base">
                {item.homeTeam.name}
              </span>
            </>
          ) : (
            <Shield className="size-12 text-text-muted" />
          )}
        </div>

        {/* Center: Scores & Predictions */}
        <div className="flex flex-col items-center flex-[1.5]">
          {item.homeScore !== null &&
          item.awayScore !== null &&
          item.status !== MatchStatus.SCHEDULED ? (
            // ================= РЕЖИМ ПЕРЕГЛЯДУ =================
            <div className="flex flex-col justify-center items-center w-full">
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
                  Final score:{" "}
                  <span className="font-bold text-text-primary ml-1">
                    {item.homeScore} : {item.awayScore}
                  </span>
                </span>

                {item.homeScorePen !== null && item.awayScorePen !== null && (
                  <span className="text-[11px] font-semibold text-nomination-scorer mt-0.5">
                    ({item.homeScorePen} : {item.awayScorePen} pen)
                  </span>
                )}

                {item.advancingTeamId && (
                  <span className="text-[11px] text-success font-semibold mt-2 flex items-center gap-1 bg-success/5 px-2 py-0.5 rounded border border-success/20">
                    <Trophy className="size-3" />{" "}
                    {Number(item.advancingTeamId) === item.homeTeam?.id
                      ? item.homeTeam.name
                      : item.awayTeam?.name}{" "}
                    qualified
                  </span>
                )}
              </div>
            </div>
          ) : (
            // ================= РЕЖИМ РЕДАГУВАННЯ =================
            <div className="flex flex-col items-center w-full">
              <div className="flex items-center gap-2 px-4">
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

              {/* Селектор проходу для плей-оф */}
              {isKnockout && item.homeTeam && item.awayTeam && (
                <div className="mt-4 flex flex-col items-center gap-1.5 w-full">
                  <span className="text-[10px] uppercase tracking-wider text-text-muted font-bold">
                    Who qualifies?
                  </span>
                  <div className="flex bg-brand-card rounded p-1 border border-brand-border w-full max-w-[180px]">
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

        {/* Away Team */}
        <div className="flex flex-col items-center gap-2 flex-1 pt-2">
          {item.awayTeam ? (
            <>
              <Image
                src={item.awayTeam.logo || "/placeholder.png"}
                alt={`Team logo - ${item.awayTeam.name}`}
                width={48}
                height={48}
                className="object-contain"
              />
              <span className="font-semibold text-text-primary text-center text-sm sm:text-base">
                {item.awayTeam.name}
              </span>
            </>
          ) : (
            <Shield className="size-12 text-text-muted" />
          )}
        </div>
      </div>

      {/* Дата та інформація про тур */}
      <div className="flex flex-col items-center gap-y-1 text-[11px] text-text-muted mb-2 mt-2 font-medium">
        <span>{date}</span>
        {item?.matchday ? (
          <span className="text-text-secondary">
            Matchday {item?.matchday}
            {item.group ? ` • Group ${item.group.split("_")[1]}` : null}
          </span>
        ) : null}
      </div>

      {/* Кнопка або результати набраних очок */}
      {item.status === MatchStatus.FINISHED && bet ? (
        <div
          className={cn(
            "text-text-primary px-4 py-2.5 rounded-md text-sm font-bold text-center border transition-colors",
            totalPoints === 0 && "bg-red-950/20 text-error border-red-500/20",
            totalPoints > 0 &&
              totalPoints < 3 &&
              "bg-yellow-950/20 text-nomination-scorer border-yellow-500/20",
            totalPoints >= 3 &&
              "bg-emerald-950/20 text-success border-success/20",
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
          onClick={() => {
            console.log(isKnockout, advancingTeamId)
            mutate({
              matchId: item.apiMatchId,
              homeScore: parseInt(homeScore),
              awayScore: parseInt(awayScore),
              predictedAdvancingTeamId: isKnockout
                ? advancingTeamId
                : undefined,
            })
          }

          }
          className="mt-auto border-none bg-red-600 hover:bg-red-700 disabled:bg-brand-card disabled:text-text-muted text-white font-semibold text-[14px] py-2.5 transition-all active:scale-[0.99] cursor-pointer"
        >
          {isStarted ? <Lock className="w-4 h-4 mr-2" /> : null}
          {isPending ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : null}
          {bet ? "Update Prediction" : "Submit Prediction"}
        </Button>
      )}
    </div>
  );
};
