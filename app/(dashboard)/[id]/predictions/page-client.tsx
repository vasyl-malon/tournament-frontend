"use client";

import { useGetMyBets } from "@/api";
import { useParams } from "next/navigation";
import { Bet } from "@/api/match/match.types";
import { UserStatsCards } from "./user-stats-cards";
import { BonusPrediction, BonusPredictions } from "./bonus";
import { MatchPredictions } from "./match-predictions";
import { RankCard } from "./rank";

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
  // const { data } = useGetMyTournament();
  const { id } = useParams<{ id: string }>();

  // console.log(data);

  const { data: bets, isLoading } = useGetMyBets({ tournamentId: id });

  if (isLoading) return <div>Loading</div>;

  // const groupedBets = bets?.reduce(
  //   (acc, bet) => {
  //     const stage = bet.match.stage;
  //     if (!acc[stage]) acc[stage] = [];
  //      acc[stage].push(bet);
  //     return acc;
  //   },
  //   {} as Record<string, Bet[]>,
  // );

  console.log(bets);

  const formatStageName = (stage: string) => {
    return stage.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="flex flex-col gap-y-10">
      <RankCard user={"Vasyl Malon"} rank={2} />
      <UserStatsCards total={4} bonus={5} exact={0} diff={0} outcome={0} />
      <BonusPredictions predictions={bonusPredictionsMock} />
      {/* <MatchPredictions
        groupedBets={groupedBets}
        formatStageName={formatStageName}
      /> */}
    </div>
  );
};
