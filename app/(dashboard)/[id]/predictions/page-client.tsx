"use client";

import { useGetUserBets } from "@/api";
import { useParams } from "next/navigation";
import { UserStatsCards } from "./_components/user-stats-cards";
import { BonusPredictions } from "./_components/bonus";
import { RankCard } from "./_components/rank";
import { useAuthStore } from "@/store/auth.store";
import { MatchPredictions } from "./_components/match-predictions";

export const Predictions = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();

  const { data, isLoading } = useGetUserBets(
    {
      userId: user?.id.toString() || "",
      tournamentId: id,
    },
    { enabled: !!(user?.id && id) },
  );

  if (isLoading) return <div>Loading</div>;

  const username = `${data?.data.stats.firstName} ${data?.data.stats.lastName}`;

  return (
    <div className="flex flex-col gap-y-10">
      <RankCard username={username} rank={data?.data.stats.rank} />
      <UserStatsCards statistic={data?.data.stats} />
      <BonusPredictions predictions={data?.data.bonusPrediction} />
      <MatchPredictions bets={data?.data.bets || []} />
    </div>
  );
};
