import { FC } from "react";
import { Clock, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Bet } from "@/api/match/match.types";
import Image from "next/image";

interface BetCardProps {
  bet: Bet;
}

export const BetCard: FC<BetCardProps> = ({ bet }) => {
  const isFinished = bet.match.status === "FINISHED";
  const isPending = !isFinished;
  const points = bet.pointsEarned ?? 0;

  const isExact = isFinished && points === 3;
  const isDiff = isFinished && points === 2;
  const isOutcome = isFinished && points === 1;
  const isLoss = isFinished && points === 0;

  console.log(points);

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row items-stretch md:items-center justify-between p-4 md:py-3.5 rounded-md border gap-4",
        isPending &&
          "bg-brand-container/80 border-brand-border/80 border-s-4 border-s-gray-500",
        isExact &&
          "bg-emerald-500/10 border-emerald-500/30 border-s-4 border-s-emerald-500",
        (isDiff || isOutcome) &&
          "bg-amber-500/10 border-amber-500/30 border-s-4 border-s-amber-500",
        isLoss && "bg-red-500/10 border-red-500/30 border-s-4 border-s-red-500",
      )}
    >
      <div className="flex flex-col justify-center gap-2.5 flex-1 min-w-0">
        <div className="flex items-center gap-2 sm:gap-3 font-semibold text-base sm:text-lg">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            {bet.match.homeTeam?.logo && (
              <Image
                src={bet.match.homeTeam.logo}
                alt={`Team logo - ${bet.match.homeTeam.name}`}
                width={20}
                height={20}
                className="object-contain size-5 sm:size-6"
              />
            )}
            <span className="sm:hidden tracking-wide text-white">
              {bet.match.homeTeam?.code || "HOM"}
            </span>
            <span className="hidden sm:inline truncate tracking-wide text-white">
              {bet.match.homeTeam?.name || "Home"}
            </span>
          </div>
          <span className="text-gray-500/80 text-[0.625rem] md:text-xs uppercase shrink-0">
            VS
          </span>
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            {bet.match.awayTeam?.logo && (
              <Image
                src={bet.match.awayTeam.logo}
                alt={`Team logo - ${bet.match.awayTeam.name}`}
                width={20}
                height={20}
                className="object-contain size-5 sm:size-6"
              />
            )}
            <span className="sm:hidden tracking-wide text-white">
              {bet.match.awayTeam?.code || "AWA"}
            </span>
            <span className="hidden sm:inline truncate tracking-wide text-white">
              {bet.match.awayTeam?.name || "Away"}
            </span>
          </div>
        </div>
        {isFinished && (
          <div className="flex items-center gap-1.5 text-xs">
            {isExact && (
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                Exact score (+3)
              </span>
            )}
            {isDiff && (
              <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-amber-400" />
                Correct diff (+2)
              </span>
            )}
            {isOutcome && (
              <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-amber-400" /> Correct
                winner (+1)
              </span>
            )}
            {isLoss && (
              <span className="text-red-400 font-medium flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-red-400" />
                Wrong outcome (0)
              </span>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-brand-border/50 shrink-0">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex flex-col items-center">
            <span className="text-gray-400 text-[0.625rem] uppercase font-bold tracking-wider mb-1">
              Pick
            </span>
            <div className="w-15 md:w-18 text-center font-semibold bg-brand-page px-2 py-1.5 rounded-sm border border-brand-border/60 text-white text-xs sm:text-sm shadow-inner">
              {bet.homeScore} - {bet.awayScore}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-400 text-[0.625rem] uppercase font-bold tracking-wider mb-1">
              Result
            </span>
            <div className="w-15 md:w-18 text-center font-semibold bg-brand-page px-2 py-1.5 rounded-sm border border-brand-border/60 text-white text-xs sm:text-sm shadow-inner">
              {isPending ? (
                <span> - : - </span>
              ) : (
                <span>
                  {bet.match.homeScore} - {bet.match.awayScore}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="w-16 md:w-19 flex justify-end text-sm ms-8">
          {isPending ? (
            <div className="flex items-center justify-center w-full py-1.5 rounded-sm bg-brand-page border border-brand-border/60 text-gray-500 shadow-sm">
              <Clock className="size-4" />
            </div>
          ) : isExact ? (
            <div className="flex items-center justify-center gap-1 w-full py-1.5 rounded-sm bg-emerald-500/20 text-emerald-400 border border-emerald-500/60 shadow-sm">
              <CheckCircle2 className="size-4" />
              <span>+3</span>
            </div>
          ) : isDiff || isOutcome ? (
            <div className="flex items-center justify-center gap-1 w-full py-1.5 rounded-sm bg-amber-500/20 text-amber-400 border border-amber-500/60 shadow-sm">
              <CheckCircle2 className="size-4" />
              <span>+{points}</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-1 w-full py-1.5 rounded-sm bg-red-500/20 text-red-400 border border-red-500/60 shadow-sm">
              <XCircle className="size-4" />
              <span>0</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
