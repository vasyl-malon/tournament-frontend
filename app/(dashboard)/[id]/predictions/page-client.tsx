"use client";

import { useGetUserBets } from "@/api";
import { useParams } from "next/navigation";
import { UserStatsCards } from "./_components/user-stats-cards";
import { BonusPrediction, BonusPredictions } from "./_components/bonus";
import { RankCard } from "./_components/rank";
import { useAuthStore } from "@/store/auth.store";
import { MatchPredictions } from "./_components/match-predictions";

const bonusPredictionsMock: BonusPrediction[] = [
  {
    id: "b1",
    type: "CHAMPION",
    title: "Champion",
    predictionValue: "FRA",
    predictionLogo: "https://crests.football-data.org/773.svg",
    pointsWorth: 15,
    status: "INCORRECT",
  },
  {
    id: "b2",
    type: "RUNNER_UP",
    title: "Runner-up",
    predictionValue: "ENG",
    predictionLogo: "https://crests.football-data.org/770.svg",
    pointsWorth: 10,
    status: "CORRECT",
  },
  {
    id: "b3",
    type: "THIRD_PLACE",
    title: "Third Place",
    predictionValue: "ESP",
    predictionLogo: "https://crests.football-data.org/760.svg",
    pointsWorth: 8,
    status: "PENDING",
  },
  {
    id: "b4",
    type: "TOP_SCORER",
    title: "Top Scorer",
    predictionValue: "Kylian Mbappé",
    predictionLogo: null,
    pointsWorth: 10,
    status: "PENDING",
  },
];

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
      <BonusPredictions predictions={bonusPredictionsMock} />
      <MatchPredictions bets={data?.data.bets || []} />
    </div>
  );
};
