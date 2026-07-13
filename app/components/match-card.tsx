"use client";

import dayjs from "dayjs";
import { FC, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, Lock } from "lucide-react";
import { Match, MatchStatus } from "@/api/match/match.types";
import { useAddBet } from "@/api";
import { cn } from "@/lib/utils";

type MatchCardProps = {
  item: Match;
};

export const MatchCard: FC<MatchCardProps> = ({ item }) => {
  const { isPending, mutate } = useAddBet();

  const bet = item.bets.length ? item.bets[0] : null;

  const [homeScore, setHomeScore] = useState<string | undefined>(
    bet?.homeScore.toString(),
  );
  const [awayScore, setAwayScore] = useState<string | undefined>(
    bet?.awayScore.toString(),
  );

  const date = dayjs(item?.startTime).format("MMM DD, YYYY - HH:mm");

  const isStarted =
    dayjs().diff(item?.startTime) >= 0 || item.status !== MatchStatus.SCHEDULED;

  return (
    <div className="flex flex-col gap-y-4 bg-[#151b23] text-[#9198a1] border !border-[#3d444d] rounded-md p-4 pt-8 w-full">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center gap-2 flex-1">
          <Image
            src={item.homeTeamLogo}
            alt={`Team logo - ${item.homeTeam}`}
            width={48}
            height={48}
            className="object-contain"
          />
          <span className="font-semibold text-slate-50 text-center">
            {item.homeTeam}
          </span>
        </div>
        {item.homeScore !== null &&
        item.awayScore !== null &&
        item.status !== MatchStatus.SCHEDULED ? (
          <div className="flex flex-col justify-center items-center">
            <span className="text-gray-400 text-xs ">Your bet</span>
            <div className="text-white text-4xl font-semibold px-8">
              <span>{bet?.homeScore}</span> - <span>{bet?.awayScore}</span>
            </div>
            <span className="text-gray-400 text-sm mt-1">
              Final:{" "}
              <span className="font-semibold text-red-500">
                {item.homeScore} - {item.awayScore}
              </span>
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-4">
            <Input
              value={homeScore}
              onChange={(e) => setHomeScore(e.target.value)}
              className="size-14 border border-slate-600 rounded-lg text-center !text-2xl font-bold text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all"
              placeholder="0"
            />
            <span className="text-slate-400 font-bold">:</span>
            <Input
              value={awayScore}
              onChange={(e) => setAwayScore(e.target.value)}
              className="size-14 border border-slate-600 rounded-lg text-center !text-2xl font-bold text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all"
              placeholder="0"
            />
          </div>
        )}

        <div className="flex flex-col items-center gap-2 flex-1">
          <Image
            src={item.awayTeamLogo}
            alt={`Team logo - ${item.awayTeam}`}
            width={48}
            height={48}
            className="object-contain"
          />
          <span className="font-semibold text-slate-50 text-center">
            {item.awayTeam}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-y-2 text-xs text-slate-400 mb-2">
        <span>{date}</span>
        {item?.matchday ? (
          <span>
            Matchday: {item?.matchday}{" "}
            {item.group ? ` | Group: ${item.group.split("_")[1]}` : null}
          </span>
        ) : null}
      </div>
      {item.status === MatchStatus.FINISHED && bet ? (
        <div
          className={cn(
            "text-white px-4 py-2 rounded-md text-base font-semibold text-center",
            bet.pointsEarned === 0 && "bg-red-700",
            bet.pointsEarned === 3 && "bg-green-800",
            (bet.pointsEarned === 1 || bet.pointsEarned === 2) &&
              "bg-yellow-600",
          )}
        >
          +{bet?.pointsEarned} points
        </div>
      ) : (
        <Button
          variant="outline"
          size="lg"
          disabled={!homeScore || !awayScore || isStarted || isPending}
          onClick={() =>
            mutate({
              matchId: item.apiMatchId,
              homeScore: parseInt(homeScore || ""),
              awayScore: parseInt(awayScore || ""),
            })
          }
          className="mt-auto border-none bg-red-600 hover:bg-red-700 text-white font-medium text-md py-2 transition-colors cursor-pointer"
        >
          {isStarted ? <Lock /> : null}
          {isPending ? <Loader /> : null}
          {bet ? "Update Prediction" : "Submit Prediction"}
        </Button>
      )}
    </div>
  );
};
