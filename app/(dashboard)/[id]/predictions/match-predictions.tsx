"use client";

import { Clock, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Bet {
  id: string;
  homeScore: number;
  awayScore: number;
  pointsEarned: number;
  match: {
    id: string;
    stage: string;
    status: string;
    homeTeam: string;
    homeTeamLogo: string;
    awayTeam: string;
    awayTeamLogo: string;
    homeScore: number | null;
    awayScore: number | null;
    startTime: string;
  };
}

interface MatchPredictionsProps {
  groupedBets: Record<string, Bet[]>;
  formatStageName: (stage: string) => string;
}

export function MatchPredictions({ groupedBets, formatStageName }: MatchPredictionsProps) {
  return (
    <div className="w-full mx-auto space-y-6 text-white">
      {Object.entries(groupedBets).map(([stage, stageBets]) => (
        <div 
          key={stage} 
          className="flex flex-col gap-y-4 p-6 bg-[#151b23] rounded-md border border-[#3d444d]"
        >
          {/* Шапка картки стадії */}
          <div className="flex pb-2 border-b border-[#3d444d]/50">
            <h2 className="text-md font-bold tracking-wide uppercase text-gray-300">
              {formatStageName(stage)}
            </h2>
          </div>

          {/* Список ставок */}
          <div className="flex flex-col gap-3">
            {stageBets.map((bet) => {
              const isFinished = bet.match.status === "FINISHED";
              const isPending = !isFinished;
              const isLoss = isFinished && bet.pointsEarned === 0;

              // Розрахунок логіки прогнозів
              const isExact = isFinished && 
                bet.homeScore === bet.match.homeScore && 
                bet.awayScore === bet.match.awayScore;

              const predDiff = bet.homeScore - bet.awayScore;
              const actualDiff = isFinished && bet.match.homeScore !== null && bet.match.awayScore !== null
                ? bet.match.homeScore - bet.match.awayScore
                : 0;

              const isDiff = isFinished && 
                !isExact && 
                predDiff === actualDiff;

              const isOutcome = isFinished && 
                !isExact && 
                !isDiff && 
                Math.sign(predDiff) === Math.sign(actualDiff);

              // Кінцеві кольорові стани
              const isGreen = isFinished && bet.pointsEarned > 0 && isExact;
              const isYellow = isFinished && bet.pointsEarned > 0 && (isDiff || isOutcome);

              return (
                <div
                  key={bet.id}
                  className={cn(
                    "flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-md border",
                    "transition-all duration-200",
                    
                    // 1. Pending (Нейтральний сірий)
                    isPending && "bg-[#1c2128] border-[#3d444d]/80 border-l-4 border-l-gray-500",
                    
                    // 2. Green (Точний рахунок)
                    isGreen && "bg-emerald-500/10 border-emerald-500/20 border-l-4 border-l-emerald-500",
                    
                    // 3. Yellow (Різниця або Результат)
                    isYellow && "bg-yellow-500/10 border-yellow-500/20 border-l-4 border-l-yellow-500",
                    
                    // 4. Red (Програш)
                    isLoss && "bg-red-500/10 border-red-500/20 border-l-4 border-l-red-500"
                  )}
                >
                  {/* Ліва частина: Команди та детальний опис успіху */}
                  <div className="flex flex-col gap-2 w-full sm:w-auto">
                    <div className="flex items-center gap-3 font-semibold text-lg">
                      <div className="flex items-center gap-2">
                        <img
                          src={bet.match.homeTeamLogo}
                          alt={bet.match.homeTeam}
                          className="w-6 h-6 object-contain"
                        />
                        <span className="tracking-wider">
                          {bet.match.homeTeam.substring(0, 3).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-gray-500 text-sm font-normal">vs</span>
                      <div className="flex items-center gap-2">
                        <img
                          src={bet.match.awayTeamLogo}
                          alt={bet.match.awayTeam}
                          className="w-6 h-6 object-contain"
                        />
                        <span className="tracking-wider">
                          {bet.match.awayTeam.substring(0, 3).toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Текстова підказка для кожного стану */}
                    {isFinished && (
                      <div className="flex items-center gap-1 text-xs">
                        {isGreen && (
                          <span className="text-emerald-400 font-medium">Exact score</span>
                        )}
                        {isYellow && isDiff && (
                          <span className="text-yellow-400 font-medium">Correct difference</span>
                        )}
                        {isYellow && isOutcome && (
                          <span className="text-yellow-400 font-medium">Correct outcome</span>
                        )}
                        {isLoss && (
                          <span className="text-red-400 font-medium">Wrong result</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Права частина: Рахунки та бали */}
                  <div className="flex items-center gap-6 mt-4 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex gap-4 text-sm">
                      <div className="flex flex-col items-center">
                        <span className="text-gray-400 text-xs mb-1">You</span>
                        <span className="font-mono font-bold bg-[#0d1117]/60 px-2.5 py-1 rounded border border-[#3d444d]/40">
                          {bet.homeScore} - {bet.awayScore}
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-gray-400 text-xs mb-1">Actual</span>
                        {isPending ? (
                          <span className="text-gray-500 text-xs mt-1.5 whitespace-nowrap italic">
                            Not played
                          </span>
                        ) : (
                          <span className="font-mono font-bold bg-[#0d1117]/60 px-2.5 py-1 rounded border border-[#3d444d]/40">
                            {bet.match.homeScore} - {bet.match.awayScore}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Бейдж із балами та іконками відповідного кольору */}
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
}