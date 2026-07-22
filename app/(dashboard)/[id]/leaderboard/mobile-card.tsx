import Link from "next/link";
import {
  Trophy,
  Target,
  GitCompare,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { Statistic } from "@/lib/api/common.types";

interface MobileCardProps {
  item: Statistic;
  tournamentId: string;
  isCurrentUser?: boolean;
}

export const MobileCard: FC<MobileCardProps> = ({
  item,
  tournamentId,
  isCurrentUser,
}) => {
  const fullName = `${item.firstName} ${item.lastName}`.trim();

  const subItems = [
    {
      title: "Exact",
      subtitle: "3 pts each",
      icon: Target,
      className: "text-emerald-400",
    },
    {
      title: "Diff",
      subtitle: "2 pts each",
      icon: GitCompare,
      className: "text-sky-400",
    },
    {
      title: "Outcome",
      subtitle: "1 pt each",
      icon: CheckCircle2,
      className: "text-amber-400",
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col justify-between p-4 bg-brand-container border border-brand-border rounded-md relative overflow-hidden transition-all hover:border-brand-border-muted shadow-sm group",
        item.rank <= 3 && "pt-5",
      )}
    >
      {item.rank === 1 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500" />
      )}
      {item.rank === 2 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-400 via-slate-100 to-slate-400" />
      )}
      {item.rank === 3 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700" />
      )}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={cn(
              "flex items-center justify-center size-11 rounded-xl font-bold text-base border shrink-0 shadow-inner",
              item.rank === 1 &&
                "bg-amber-500/15 text-amber-400 border-amber-500/40",
              item.rank === 2 &&
                "bg-slate-300/15 text-slate-200 border-slate-300/40",
              item.rank === 3 &&
                "bg-amber-700/15 text-amber-500 border-amber-600/40",
              item.rank > 3 &&
                "bg-brand-card text-text-muted border-brand-border",
            )}
          >
            {item.rank <= 3 ? <Trophy className="size-5" /> : `#${item.rank}`}
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-bold text-white text-base leading-tight group-hover:text-amber-400 transition-colors duration-300 truncate">
                {fullName}
              </span>
              {isCurrentUser && (
                <span className="text-[0.625rem] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 tracking-wider shrink-0">
                  You
                </span>
              )}
            </div>
            <span className="text-xs text-gray-400 font-medium mt-1">
              {item.totalPredictions} predictions total
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center bg-brand-card border border-brand-border px-3 py-1.5 rounded-xl gap-y-1">
          <span className="text-xl font-black text-emerald-400 leading-none mt-0.5">
            {item.totalPoints}
          </span>
          <span className="text-[0.625rem] uppercase tracking-wider text-text-muted font-semibold">
            Points
          </span>
        </div>
      </div>
      <div className="h-px w-full bg-brand-border/60" />
      <div className="grid grid-cols-3 gap-4 py-4">
        {subItems.map((subItem, subIndex) => {
          const Icon = subItem.icon;

          return (
            <div
              key={subIndex}
              className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-brand-card/60 border border-brand-border/40"
            >
              <div
                className={cn(
                  "flex items-center gap-1 text-xs font-semibold mb-1",
                  subItem.className,
                )}
              >
                <Icon className="size-3.5" />
                <span>{subItem.title}</span>
              </div>
              <span className="text-base font-bold text-white">
                {item.exactCount}
              </span>
              <span className="text-[0.625rem] text-gray-400">
                {subItem.subtitle}
              </span>
            </div>
          );
        })}
      </div>
      <Link
        href={`/${tournamentId}/predictions?userId=${item.userId}`}
        className="flex items-center justify-between w-full px-4 py-2.5 rounded-md bg-brand-card border border-brand-border text-xs font-semibold text-white hover:bg-brand-item-hover hover:border-brand-border-muted transition-all group/btn cursor-pointer"
      >
        <span>View Predictions</span>
        <ArrowRight className="size-4 text-text-muted group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
      </Link>
    </div>
  );
};
