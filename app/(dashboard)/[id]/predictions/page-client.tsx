"use client";

import { useGetPredictions } from "@/lib/api";
import { useParams } from "next/navigation";
import { UserStatsCards } from "./_components/user-stats-cards";
import { BonusPredictions } from "./_components/bonus";
import { RankCard } from "./_components/rank";
import { useAuthStore } from "@/lib/auth.store";
import { MatchPredictions } from "./_components/predictions";
import { useSearchParams } from "next/navigation";
import { PredictionsSkeletonLoading } from "./_components/skeleton-loading";

export const Predictions = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();

  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const { data, isLoading } = useGetPredictions(
    {
      userId: userId || user?.id.toString() || "",
      tournamentId: id,
    },
    { enabled: !!(user?.id && id) },
  );

  if (isLoading) return <PredictionsSkeletonLoading />;

  const username = `${data?.data.stats.firstName} ${data?.data.stats.lastName}`;

  return (
    <div className="flex flex-col gap-y-10">
      <RankCard username={username} rank={data?.data.stats.rank} />
      <UserStatsCards statistic={data?.data.stats} />
      <BonusPredictions
        predictions={{
          champion: data?.data?.bonusPrediction?.champion,
          runnerUp: data?.data?.bonusPrediction?.runnerUp,
          topScorer: data?.data?.bonusPrediction?.topScorer
            ? {
                ...data?.data.bonusPrediction.topScorer,
                logo: data?.data.bonusPrediction.topScorer.teamLogo,
              }
            : undefined,
        }}
      />
      <MatchPredictions bets={data?.data.bets || []} />
    </div>
  );
};
