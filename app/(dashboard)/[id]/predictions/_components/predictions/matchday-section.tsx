import { FC } from "react";
import { CalendarDays } from "lucide-react";
import { Bet } from "@/api/match/match.types";
import { BetCard } from "./bet-card";
import { formatMatchdayName } from "../utils";

interface MatchdaySectionProps {
  matchday: string;
  bets: Bet[];
}

export const MatchdaySection: FC<MatchdaySectionProps> = ({
  matchday,
  bets,
}) => {
  const matchdayPoints = bets.reduce(
    (sum, b) => sum + (b.pointsEarned || 0),
    0,
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-xs font-semibold text-gray-400 px-1">
        <div className="flex items-center gap-1.5">
          <CalendarDays className="size-3.5 text-gray-400" />
          <span className="uppercase tracking-wider text-gray-300">
            {formatMatchdayName(matchday)}
          </span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-500 font-normal">
            {bets.length} {bets.length === 1 ? "match" : "matches"}
          </span>
        </div>

        <span className="text-gray-400 bg-brand-card/60 border border-brand-border/40 px-2.5 py-0.5 rounded-full">
          +{matchdayPoints} pts
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {bets.map((bet) => (
          <BetCard key={bet.id} bet={bet} />
        ))}
      </div>
    </div>
  );
};
