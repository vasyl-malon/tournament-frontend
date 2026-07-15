"use client";

import { Crown, Medal, Award, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BonusPrediction {
  id: string;
  type: "CHAMPION" | "RUNNER_UP" | "THIRD_PLACE" | "TOP_SCORER";
  title: string;
  predictionValue: string;
  predictionLogo?: string | null;
  pointsWorth: number;
  pointsEarned?: number | null;
  status: "PENDING" | "CORRECT" | "INCORRECT";
}

interface BonusPredictionsProps {
  predictions: BonusPrediction[];
}

export function BonusPredictions({ predictions }: BonusPredictionsProps) {
  const iconMap = {
    CHAMPION: Crown,
    RUNNER_UP: Medal,
    THIRD_PLACE: Award,
    TOP_SCORER: Star,
  };

  return (
    <div className="flex flex-col gap-y-6 p-6 bg-[#151b23] rounded-md border border-[#3d444d] text-white w-full">
      <div className="flex pb-2 border-b border-[#3d444d]/50">
        <h2 className="text-lg font-bold tracking-wide">Bonus Predictions</h2>
      </div>

      {/* Сітка з 4-ма картками */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {predictions.map((pred) => {
          const Icon = iconMap[pred.type] || Award;

          // Визначення кольорів статусу
          const isPending = pred.status === "PENDING";
          const isCorrect = pred.status === "CORRECT";
          const isIncorrect = pred.status === "INCORRECT";

          return (
            <div
              key={pred.id}
              className="bg-gray-800 flex flex-col justify-between p-4 rounded-md border border-[#3d444d]/60 min-h-[100px]"
            >
              {/* Верхній рядок: Назва прогнозу та потенційні бали */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 stroke-[2]" />
                  <span className="font-bold text-sm text-gray-200">
                    {pred.title}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  worth {pred.pointsWorth} pts
                </span>
              </div>

              {/* Нижній рядок: Сама ставка та поточний статус */}
              <div className="flex items-end justify-between mt-4">
                {/* Що вибрав юзер */}
                <div className="flex items-center gap-2">
                  {pred.predictionLogo && (
                    <img
                      src={pred.predictionLogo}
                      alt={pred.predictionValue}
                      className="w-5 h-3.5 object-cover rounded-[2px]"
                    />
                  )}
                  <span className="font-semibold text-sm">
                    {pred.predictionValue}
                  </span>
                </div>

                {/* Статус прогнозу */}
                <div className="text-xs font-semibold tracking-wider">
                  {isPending && <span className="text-gray-500">Pending</span>}
                  {isCorrect && (
                    <span className="text-emerald-500 flex items-center gap-1">
                      +{pred.pointsWorth} pts
                    </span>
                  )}
                  {isIncorrect && <span className="text-red-500">0 pts</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
