"use client";

import { Clock, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Bet } from "@/api/match/match.types";
import { FC } from "react";

const formatStageName = (stage: string) => {
  return stage.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

interface MatchPredictionsProps {
  bets: Array<Bet>;
}

export const MatchPredictions: FC<MatchPredictionsProps> = ({ bets }) => {
  const groupedBets = bets?.reduce(
    (acc, bet) => {
      const stage = bet.match.stage;
      if (!acc[stage]) acc[stage] = [];
      acc[stage].push(bet);
      return acc;
    },
    {} as Record<string, Bet[]>,
  );

  return (
    <div className="w-full mx-auto space-y-6 text-white">
      {Object.entries(groupedBets).map(([stage, stageBets]) => (
        <div
          key={stage}
          className="flex flex-col gap-y-4 p-6 bg-brand-container rounded-md border border-brand-border"
        >
          <div className="flex pb-2 border-b border-brand-border/50">
            <h2 className="text-md font-bold tracking-wide uppercase text-gray-300">
              {formatStageName(stage)}
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {stageBets?.map((bet) => {
              const isFinished = bet.match.status === "FINISHED";
              const isPending = !isFinished;
              const isLoss = isFinished && bet.pointsEarned === 0;

              const isExact = isFinished && bet.pointsEarned === 3;

              const isDiff = isFinished && bet.pointsEarned === 2;

              const isOutcome = isFinished && bet.pointsEarned === 1;

              const isGreen = isFinished && bet.pointsEarned > 0 && isExact;
              const isYellow =
                isFinished && bet.pointsEarned > 0 && (isDiff || isOutcome);

              return (
                <div
                  key={bet.id}
                  className={cn(
                    "flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-md border",
                    "transition-all duration-200",
                    isPending &&
                      "bg-[#1c2128] border-brand-border/80 border-l-4 border-l-gray-500",
                    isGreen &&
                      "bg-emerald-500/10 border-emerald-500/20 border-l-4 border-l-emerald-500",
                    isYellow &&
                      "bg-yellow-500/10 border-yellow-500/20 border-l-4 border-l-yellow-500",
                    isLoss &&
                      "bg-red-500/10 border-red-500/20 border-l-4 border-l-red-500",
                  )}
                >
                  {/* Ліва частина: Команди та детальний опис успіху */}
                  <div className="flex flex-col gap-2 w-full sm:w-auto">
                    <div className="flex items-center gap-3 font-semibold text-lg">
                      <div className="flex items-center gap-2">
                        <img
                          src={bet.match.homeTeam.logo}
                          alt={bet.match.homeTeam.name}
                          className="w-6 h-6 object-contain"
                        />
                        <span className="tracking-wider">
                          {bet.match.homeTeam.name
                            .substring(0, 3)
                            .toUpperCase()}
                        </span>
                      </div>
                      <span className="text-gray-500 text-sm font-normal">
                        vs
                      </span>
                      <div className="flex items-center gap-2">
                        <img
                          src={bet.match.awayTeam.logo}
                          alt={bet.match.awayTeam.name}
                          className="w-6 h-6 object-contain"
                        />
                        <span className="tracking-wider">
                          {bet.match.awayTeam.name
                            .substring(0, 3)
                            .toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {isFinished && (
                      <div className="flex items-center gap-1 text-xs">
                        {isGreen && (
                          <span className="text-emerald-400 font-medium">
                            Exact score
                          </span>
                        )}
                        {isYellow && isDiff && (
                          <span className="text-yellow-400 font-medium">
                            Correct difference
                          </span>
                        )}
                        {isYellow && isOutcome && (
                          <span className="text-yellow-400 font-medium">
                            Correct outcome
                          </span>
                        )}
                        {isLoss && (
                          <span className="text-red-400 font-medium">
                            Wrong result
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-6 mt-4 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex gap-4 text-sm">
                      <div className="flex flex-col items-center">
                        <span className="text-gray-400 text-xs mb-1">You</span>
                        <span className="font-mono font-bold bg-[#0d1117]/60 px-2.5 py-1 rounded border border-brand-border/40">
                          {bet.homeScore} - {bet.awayScore}
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-gray-400 text-xs mb-1">
                          Actual
                        </span>
                        {isPending ? (
                          <span className="text-gray-500 text-xs mt-1.5 whitespace-nowrap italic">
                            Not played
                          </span>
                        ) : (
                          <span className="font-mono font-bold bg-[#0d1117]/60 px-2.5 py-1 rounded border border-brand-border/40">
                            {bet.match.homeScore} - {bet.match.awayScore}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-end min-w-[65px]">
                      {isPending ? (
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock className="w-5 h-5 stroke-[1.5]" />
                        </div>
                      ) : isGreen ? (
                        <div className="flex items-center gap-1 text-emerald-500 font-bold">
                          <CheckCircle2 className="w-5 h-5" />
                          <span>+{bet.pointsEarned}</span>
                        </div>
                      ) : isYellow ? (
                        <div className="flex items-center gap-1 text-yellow-500 font-bold">
                          <CheckCircle2 className="w-5 h-5" />
                          <span>+{bet.pointsEarned}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-red-500 font-bold">
                          <XCircle className="w-5 h-5" />
                          <span>0</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
