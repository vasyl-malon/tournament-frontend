import { BONUS_PREDICTION_LABELS, BonusPredictionType, cn } from "@/lib/utils";
import { Crown, Award, Star } from "lucide-react";
import Image from "next/image";

interface Prediction {
  id: number;
  logo?: string;
  name: string;
  pointsEarned: number | null;
}

interface BonusPredictionsProps {
  predictions?: {
    champion?: Prediction;
    runnerUp?: Prediction;
    topScorer?: Prediction;
  };
}

const iconMap = {
  [BonusPredictionType.CHAMPION]: Crown,
  [BonusPredictionType.RUNNER_UP]: Award,
  [BonusPredictionType.TOP_SCORER]: Star,
};

const iconColors = {
  [BonusPredictionType.CHAMPION]: "text-orange-500",
  [BonusPredictionType.RUNNER_UP]: "text-purple-500",
  [BonusPredictionType.TOP_SCORER]: "text-yellow-500",
};

export function BonusPredictions({ predictions }: BonusPredictionsProps) {
  const predictionsArray = [
    {
      type: BonusPredictionType.CHAMPION,
      title: predictions?.champion?.name,
      value: predictions?.champion?.id,
      logo: predictions?.champion?.logo,
      points: predictions?.champion?.pointsEarned,
      pointsWorth: 15,
    },
    {
      type: BonusPredictionType.RUNNER_UP,
      title: predictions?.runnerUp?.name,
      value: predictions?.runnerUp?.id,
      logo: predictions?.runnerUp?.logo,
      points: predictions?.runnerUp?.pointsEarned,
      pointsWorth: 10,
    },
    {
      type: BonusPredictionType.TOP_SCORER,
      title: predictions?.topScorer?.name,
      value: predictions?.topScorer?.id,
      logo: predictions?.topScorer?.logo,
      points: predictions?.topScorer?.pointsEarned,
      pointsWorth: 10,
    },
  ];

  return (
    <div className="flex flex-col gap-y-6 p-6 bg-brand-container rounded-md border border-brand-border text-white w-full">
      <div className="flex pb-3 border-b border-brand-border/50">
        <h2 className="text-lg font-bold tracking-wide">
          Your Bonus Predictions
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {predictionsArray.map((pred, index) => {
          const Icon = iconMap[pred.type as keyof typeof iconMap];
          const iconColor = iconColors[pred.type as keyof typeof iconMap];

          const hasPredicted = pred.title !== undefined;
          const isPending = hasPredicted && pred.points === null;
          const isCorrect = hasPredicted && pred.points && pred.points > 0;
          const isIncorrect = hasPredicted && pred.points && pred.points === 0;

          return (
            <div
              key={index}
              className="flex flex-col justify-between p-4 rounded-md border border-brand-border/60 bg-brand-card/40 min-h-30 transition-all duration-200 hover:border-brand-border"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={cn("size-4 stroke-[2]", iconColor)} />
                  <span className="font-semibold text-sm text-gray-300">
                    {BONUS_PREDICTION_LABELS[pred.type]}
                  </span>
                </div>
                <span className="text-xs text-gray-400 font-medium">
                  worth {pred.pointsWorth} pts
                </span>
              </div>

              <div className="flex items-end justify-between mt-2">
                <div className="flex items-center gap-2.5 max-w-[70%]">
                  {pred.logo ? (
                    <div className="relative size-5 shrink-0 rounded-sm overflow-hidden">
                      <Image
                        fill
                        src={pred.logo}
                        alt={pred.title || "logo"}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    !hasPredicted && (
                      <div className="size-5 border border-dashed border-brand-border rounded-full shrink-0" />
                    )
                  )}
                  <span
                    className={cn(
                      "text-sm font-medium tracking-wide truncate",
                      hasPredicted ? "text-white" : "text-gray-500",
                    )}
                  >
                    {pred.title || "Not predicted yet"}
                  </span>
                </div>
                <div className="text-xs font-medium tracking-wide pb-0.5">
                  {isPending && (
                    <span className="text-gray-400 bg-brand-border-muted/20 px-2 py-1 rounded text-xs border border-brand-border/60">
                      Pending
                    </span>
                  )}
                  {isCorrect && (
                    <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs border border-emerald-500/60">
                      +{12} pts
                    </span>
                  )}
                  {isIncorrect && (
                    <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs border border-red-500/60">
                      0 pts
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
