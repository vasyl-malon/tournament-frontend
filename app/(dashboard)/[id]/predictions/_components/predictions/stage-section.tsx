import { FC } from "react";
import { Award } from "lucide-react";
import { MatchdaySection } from "./matchday-section";
import { MATCH_STAGE_LABELS } from "@/lib/utils";
import { Bet, MatchStage } from "@/api/common.types";

interface StageSectionProps {
  stage: MatchStage;
  matchdays: Record<string | number, Bet[]>;
}

export const StageSection: FC<StageSectionProps> = ({ stage, matchdays }) => {
  const stageTotalPoints = Object.values(matchdays)
    .flat()
    .reduce((sum, b) => sum + (b.pointsEarned || 0), 0);

  return (
    <div className="flex flex-col gap-y-6 p-4 md:p-6 bg-brand-container rounded-md border border-brand-border shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-brand-border/80">
        <div className="flex items-center gap-2.5">
          <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="text-lg font-bold tracking-wide text-white">
            {MATCH_STAGE_LABELS[stage]}
          </h2>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-brand-card border border-brand-border rounded-lg text-xs font-semibold text-emerald-400">
          <Award className="size-3.5" />
          <span>{stageTotalPoints} pts in stage</span>
        </div>
      </div>
      <div className="flex flex-col gap-y-6">
        {Object.entries(matchdays).map(([matchday, dayBets]) => (
          <MatchdaySection key={matchday} matchday={matchday} bets={dayBets} />
        ))}
      </div>
    </div>
  );
};
