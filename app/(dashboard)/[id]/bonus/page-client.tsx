"use client";

import { BonusPredictionForm } from "./bonus-prediction-form";
import { useParams } from "next/navigation";
import { useGetBonusPrediction } from "@/api/match/match.queries";
import { Skeleton } from "@/components/ui/skeleton";

export const BonusBetsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetBonusPrediction(
    { tournamentId: id },
    { enabled: !!id },
  );

  return (
    <div>
      {isLoading ? (
        <Skeleton className="h-100 w-full rounded-md" />
      ) : (
        <BonusPredictionForm data={data} />
      )}
    </div>
  );
};
