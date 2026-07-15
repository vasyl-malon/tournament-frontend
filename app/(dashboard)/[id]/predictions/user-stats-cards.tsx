import { Trophy, Award, Target, CheckCircle2, Scale } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface UserStatsProps {
  total: number;
  bonus: number;
  exact: number;
  diff: number;
  outcome: number;
}

export function UserStatsCards({
  total,
  bonus,
  exact,
  diff,
  outcome,
}: UserStatsProps) {
  const stats = [
    {
      title: "Total Points",
      value: total,
      icon: Trophy,
      iconColor: "text-yellow-500",
    },
    {
      title: "Bonus Points",
      value: bonus,
      icon: Award,
      iconColor: "text-purple-500",
    },
    {
      title: "Exact Scores",
      value: exact,
      icon: Target,
      iconColor: "text-emerald-500",
    },
    {
      title: "Correct Difference",
      value: diff,
      icon: Scale,
      iconColor: "text-teal-500",
    },
    {
      title: "Correct Outcomes",
      value: outcome,
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
            className="bg-[#151b23] border-[#3d444d] text-white rounded-md"
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
