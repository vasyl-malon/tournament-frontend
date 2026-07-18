"use client";

import { Crown, Award, Star } from "lucide-react";
import Image from "next/image";

interface BonusPredictionsProps {
  predictions?: {
    champion: {
      id: number;
      logo: string;
      name: string;
      pointsEarned: number | null;
    };
    runnerUp: {
      id: number;
      logo: string;
      name: string;
      pointsEarned: number | null;
    };
    topScorer: {
      id: number;
      name: string;
      pointsEarned: number | null;
      teamLogo: string;
    };
  };
}

export function BonusPredictions({ predictions }: BonusPredictionsProps) {
  // 1. Чітко типізуємо мапу іконок
  const iconMap = {
    CHAMPION: Crown,
    RUNNER_UP: Award,
    TOP_SCORER: Star,
  };

  // 2. Додаємо кольори для кожної номінації, щоб оживити інтерфейс
  const iconColors = {
    CHAMPION: "text-orange-500",
    RUNNER_UP: "text-purple-500",
    TOP_SCORER: "text-yellow-500",
  };

  // 3. Явно типізуємо об'єкти в масиві, щоб прибрати помилку ts(7053)
  const predictionsArray: {
    type: keyof typeof iconMap;
    title: string | undefined;
    value: number | undefined;
    logo: string | undefined;
    points: number | null | undefined;
    pointsWorth: number;
  }[] = [
    {
      type: "CHAMPION",
      title: predictions?.champion?.name,
      value: predictions?.champion?.id,
      logo: predictions?.champion?.logo,
      points: predictions?.champion?.pointsEarned,
      pointsWorth: 15,
    },
    {
      type: "RUNNER_UP",
      title: predictions?.runnerUp?.name,
      value: predictions?.runnerUp?.id,
      logo: predictions?.runnerUp?.logo,
      points: predictions?.runnerUp?.pointsEarned,
      pointsWorth: 10,
    },
    {
      type: "TOP_SCORER",
      title: predictions?.topScorer?.name,
      value: predictions?.topScorer?.id,
      logo: predictions?.topScorer?.teamLogo,
      points: predictions?.topScorer?.pointsEarned,
      pointsWorth: 10,
    },
  ];

  return (
    <div className="flex flex-col gap-y-6 p-6 bg-[#151b23] rounded-md border border-[#3d444d] text-white w-full">
      <div className="flex pb-3 border-b border-[#3d444d]/50">
        <h2 className="text-xl font-bold tracking-wide">Your Bonus Predictions</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {predictionsArray.map((pred, index) => {
          const Icon = iconMap[pred.type];
          const iconColor = iconColors[pred.type];

          // Логіка визначення статусу на основі балів з бекенду:
          // Якщо прогнозу немає взагалі — залишаємо порожнім або null
          const hasPredicted = pred.title !== undefined;
          const isPending = hasPredicted && pred.points === null;
          const isCorrect = hasPredicted && pred.points && pred.points > 0;
          const isIncorrect = hasPredicted && pred.points && pred.points === 0;

          return (
            <div
              key={index}
              className="flex flex-col justify-between p-4 rounded-md border border-[#3d444d]/60 bg-[#1c2128]/40 min-h-[120px] transition-all duration-200 hover:border-[#3d444d]"
            >
              {/* Верхня плашка: Іконка + Назва номінації */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 stroke-[2] ${iconColor}`} />
                  <span className="font-semibold text-sm text-gray-300">
                    {pred.type.replace("_", "-").toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
                  </span>
                </div>
                <span className="text-xs text-gray-400 font-medium">
                  worth {pred.pointsWorth} pts
                </span>
              </div>

              {/* Нижня плашка: Логотип + Значення + Статус очок */}
              <div className="flex items-end justify-between mt-5">
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
                    // Плейсхолдер, якщо користувач ще не зробив вибір
                    !hasPredicted && (
                      <div className="size-5 border border-dashed border-[#3d444d] rounded-full shrink-0" />
                    )
                  )}
                  <span className={`text-sm font-medium tracking-wide truncate ${hasPredicted ? "text-white" : "text-gray-500 italic"}`}>
                    {pred.title || "Not predicted yet"}
                  </span>
                </div>

                {/* Відображення балів/статусу */}
                <div className="text-xs font-bold tracking-wide pb-0.5">
                  {isPending && (
                    <span className="text-gray-400 bg-[#30363d]/50 px-2 py-0.5 rounded text-[11px] border border-[#3d444d]/30">
                      Pending
                    </span>
                  )}
                  {isCorrect && (
                    <span className="text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded text-[11px] border border-emerald-500/20">
                      +{pred.points} pts
                    </span>
                  )}
                  {isIncorrect && (
                    <span className="text-rose-400 bg-rose-950/30 px-2 py-0.5 rounded text-[11px] border border-rose-500/20">
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