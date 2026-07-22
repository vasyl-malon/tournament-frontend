"use client";

import { FC, useMemo } from "react";
import { Bet, MatchStage } from "@/api/match/match.types";
import { StageSection } from "./stage-section";
import { groupBetsByStageAndMatchday } from "../utils";

interface MatchPredictionsProps {
  bets: Array<Bet>;
}

export const MatchPredictions: FC<MatchPredictionsProps> = ({ bets }) => {
  const groupedBets = useMemo(() => groupBetsByStageAndMatchday(bets), [bets]);

  if (!bets || bets.length === 0) {
    return (
      <div className="w-full text-center py-12 bg-brand-container border border-brand-border rounded-md text-gray-400">
        No predictions found for this tournament.
      </div>
    );
  }

  return (
    <div className="w-full mx-auto space-y-8 text-white">
      {Object.entries(groupedBets).map(([stage, matchdays]) => (
        <StageSection key={stage} stage={stage as MatchStage} matchdays={matchdays} />
      ))}
    </div>
  );
};
