import { Trophy, Award, Target, CheckCircle2, GitCompare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Statistic } from "@/lib/api/common.types";

interface UserStatsProps {
  statistic?: Statistic;
}

export function UserStatsCards({ statistic }: UserStatsProps) {
  const stats = [
    {
      title: "Total Points",
      value: statistic?.totalPoints,
      icon: Trophy,
      iconColor: "text-yellow-500",
    },
    {
      title: "Bonus Points",
      value: 0,
      icon: Award,
      iconColor: "text-purple-500",
    },
    {
      title: "Exact Scores",
      value: statistic?.exactCount,
      icon: Target,
      iconColor: "text-emerald-500",
    },
    {
      title: "Correct Difference",
      value: statistic?.differenceCount,
      icon: GitCompare,
      iconColor: "text-teal-500",
    },
    {
      title: "Correct Outcomes",
      value: statistic?.outcomeCount,
      icon: CheckCircle2,
      iconColor: "text-blue-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.title}
            className="bg-brand-container border-brand-border text-white rounded-md"
          >
            <CardContent className="py-4 px-6 flex flex-col items-center justify-center text-center gap-3">
              <Icon className={cn("size-8 stroke-[1.5]", stat.iconColor)} />
              <div className="space-y-1">
                <h3 className="text-3xl font-bold tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-sm font-medium text-gray-400">
                  {stat.title}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
