"use client";

import { BonusPredictionForm } from "./bonus-prediction-form";
import { useParams } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { useGetBonusPrediction } from "@/api/match/match.queries";
import { Skeleton } from "@/components/ui/skeleton";

export const BonusBetsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetBonusPrediction({ tournamentId: id });

  return (
    <div className="flex flex-col gap-y-6 max-w-[1400px]">
      {isLoading ? (
        <>
          <Skeleton className="h-20 w-full rounded-md" />
          <Skeleton className="h-80 w-full rounded-md" />
        </>
      ) : (
        <>
          <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/30 rounded-md text-amber-200 text-sm">
            <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500" />
            <div>
              <h4 className="font-bold">Predictions Lock Deadline</h4>
              <p className="text-amber-200/80 mt-0.5">
                These bonus predictions will lock automatically once the first
                match of the tournament starts. You can edit your choices
                anytime before the kickoff.
              </p>
            </div>
          </div>
          <BonusPredictionForm data={data} />
        </>
      )}
    </div>
  );
};
