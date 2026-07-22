import { MatchStage } from "@/lib/api/common.types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number,
) {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export const MATCH_STAGE_LABELS: Record<MatchStage, string> = {
  [MatchStage.FINAL]: "Final",
  [MatchStage.THIRD_PLACE]: "3rd Place Play-off",
  [MatchStage.SEMI_FINALS]: "Semi-finals",
  [MatchStage.QUARTER_FINALS]: "Quarter-finals",
  [MatchStage.LAST_16]: "Round of 16",
  [MatchStage.LAST_32]: "Round of 32",
  [MatchStage.LAST_64]: "Round of 64",
  [MatchStage.LEAGUE_STAGE]: "League Phase",
  [MatchStage.GROUP_STAGE]: "Group Stage",
  [MatchStage.KNOCKOUT_ROUND_PLAY_OFFS]: "Knockout Round Play-offs",
  [MatchStage.REGULAR_SEASON]: "League Stage",
  [MatchStage.PLAYOFFS]: "Play-offs",
  [MatchStage.PRELIMINARY_ROUND]: "Preliminary Round",
  [MatchStage.QUALIFICATION_ROUND_1]: "1st Qualifying Round",
  [MatchStage.QUALIFICATION_ROUND_2]: "2nd Qualifying Round",
  [MatchStage.QUALIFICATION_ROUND_3]: "3rd Qualifying Round",
  [MatchStage.PLAYOFF_ROUND]: "Play-off Round",
};

export enum BonusPredictionType {
  CHAMPION = "CHAMPION",
  RUNNER_UP = "RUNNER_UP",
  TOP_SCORER = "TOP_SCORER",
}

export const BONUS_PREDICTION_LABELS: Record<BonusPredictionType, string> = {
  [BonusPredictionType.CHAMPION]: "Champion",
  [BonusPredictionType.RUNNER_UP]: "Runner-up",
  [BonusPredictionType.TOP_SCORER]: "Top Scorer",
};
