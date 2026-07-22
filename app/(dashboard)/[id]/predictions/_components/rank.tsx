import { FC } from "react";

interface RankCardProps {
  username: string;
  rank?: number;
}

export const RankCard: FC<RankCardProps> = ({ username, rank = 0 }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-brand-container rounded-md border !border-brand-border">
    <div className="flex flex-col gap-y-1">
      <span className="text-xl font-semibold">Predictions</span>
      <span className="text-sm text-gray-400">
        <span className="text-emerald-400 font-semibold">{username}</span>
        `s prediction history and how every point was earned
      </span>
    </div>
    <div className="flex flex-col items-end justify-center">
      <span className="text-red-600 text-5xl font-bold tracking-tighter leading-none">
        # {rank}
      </span>
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1.5">
        Current Rank
      </span>
    </div>
  </div>
);
