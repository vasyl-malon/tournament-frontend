"use client";

import { BonusPredictionForm } from "./bonus-prediction-form";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetBonusPredictions } from "@/lib/api";

export const BonusBetsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetBonusPredictions(
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
