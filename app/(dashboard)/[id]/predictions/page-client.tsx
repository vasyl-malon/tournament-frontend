"use client";

import { useGetMyBets } from "@/api";
import { useGetMyTournament } from "@/api/tournament/tournaments.queries";
import { useParams } from "next/navigation";

export const Predictions = () => {
  // const { data } = useGetMyTournament();
  const { id } = useParams<{ id: string }>();

  // console.log(data);

  const { data } = useGetMyBets({ tournamentId: id });

  console.log(data);

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-2 p-6 bg-[#151b23] rounded-md border !border-[#3d444d]">
        <span className="text-xl font-semibold">My Predictions</span>
        <span className="text-lg text-gray-400">
          Prediction history and how every point was earned
        </span>
      </div>
      <div></div>
    </div>
  );
};
