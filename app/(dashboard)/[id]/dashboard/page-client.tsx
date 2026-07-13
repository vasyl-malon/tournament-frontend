"use client";

import { useGetAllMatches } from "@/api";
import { MatchStatus } from "@/api/match/match.types";
import { MatchCard } from "@/app/components/match-card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";
import { Clock } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const MATCHES_LIMIT = 4;

export const Dashboard = () => {
  const { user } = useAuthStore();
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: matches, isLoading } = useGetAllMatches({
    tournamentId: id,
    status: MatchStatus.SCHEDULED,
    limit: MATCHES_LIMIT,
  });

  const items = matches?.data.map((item) => (
    <MatchCard item={item} key={item.id} />
  ));

  const mockData = {
    firstPlace: "Arsenal",
    secondPlace: "Liverpool",
    thirdPlace: "Manchester United",
    topScorer: "Mohammed Salah",
  };

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-2 p-6 bg-[#151b23] rounded-md border !border-[#3d444d]">
        <span className="text-xl font-semibold">
          Welcome back, {user?.firstName} {user?.lastName}!
        </span>
        <span className="text-lg text-gray-400">Make your predictions</span>
      </div>
      <div className="grid grid-cols-3 gap-8">
        <div className="flex flex-col gap-y-6 col-span-2">
          <div className="flex gap-4 justify-between">
            <h1 className="text-xl font-semibold">Upcoming Matches</h1>
            <Button
              onClick={() => router.push(`/${id}/matches`)}
              className="cursor-pointer"
            >
              View all
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-6">{items}</div>
        </div>
        <div className="flex flex-col gap-y-4 bg-[#151b23] text-white border !border-[#3d444d] rounded-md p-4 w-full h-fit">
          <h2 className="text-md font-semibold">Bonus Predictions</h2>
          <div className="flex bg-red-100 text-red-700 text-sm p-2 rounded-md items-center">
            <Clock className="size-4 me-2" />
            Locked once tournament starts!
          </div>
          <div className="flex flex-col gap-y-4 text-sm font-normal w-full">
            <div className="flex gap-x-4 justify-between">
              <span>First Place</span>
              <span>{mockData.firstPlace}</span>
            </div>
            <div className="flex gap-x-4 justify-between">
              <span>Second Place</span>
              <span className="text-green-600">{mockData.secondPlace}</span>
            </div>
            <div className="flex gap-x-4 justify-between">
              <span>Third Place</span>
              <span>{mockData.thirdPlace}</span>
            </div>
            <div className="flex gap-x-4 justify-between">
              <span>Top Scorer</span>
              <span>{mockData.topScorer}</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push(`/${id}/bonus`)}
            className="border-none bg-red-600 hover:bg-red-700 text-white font-medium text-md py-2 transition-colors cursor-pointer"
          >
            View Predictions
          </Button>
        </div>
      </div>
    </div>
  );
};
