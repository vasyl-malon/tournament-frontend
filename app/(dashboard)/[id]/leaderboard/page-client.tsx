"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { LayoutGrid, Table as TableIcon } from "lucide-react";
import { useGetLeaderboard } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { MobileCard } from "./mobile-card";
import { TableView } from "./table-view";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/auth.store";
import { Statistic } from "@/lib/api/common.types";

export const LeaderboardTable = () => {
  const { id: tournamentId } = useParams<{ id: string }>();
  const { user } = useAuthStore();

  const [viewMode, setViewMode] = useState<"table" | "cards">("cards");

  const { data, isLoading } = useGetLeaderboard({
    tournamentId,
  });

  const leaderboardData: Statistic[] = data?.data || [];

  const tabs = [
    {
      title: "Table",
      value: "table",
      icon: TableIcon,
    },
    {
      title: "Cards",
      value: "cards",
      icon: LayoutGrid,
    },
  ];

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex max-md:flex-col md:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-white">Leaderboard</h1>
        <Tabs
          value={viewMode}
          onValueChange={setViewMode}
          className="w-full md:w-auto"
        >
          <TabsList className="bg-brand-container border !border-brand-border flex flex-wrap h-auto p-1 w-full gap-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="w-full text-gray-400 uppercase text-xs px-3 py-1.5"
                >
                  <Icon className="size-3.5" />
                  <span>{tab.title}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>
      {isLoading ? (
        <Skeleton className="h-[24rem] md:h-[30rem] w-full rounded-md" />
      ) : leaderboardData.length === 0 ? (
        <div className="text-center py-20 px-8 text-text-muted border border-brand-border rounded-md bg-brand-container">
          No participants found.
        </div>
      ) : (
        <>
          {viewMode === "table" && (
            <TableView
              data={leaderboardData}
              tournamentId={tournamentId}
              currentUser={user?.id.toString()}
            />
          )}
          {viewMode === "cards" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {leaderboardData.map((item, index) => (
                <MobileCard
                  key={item.userId || index}
                  item={item}
                  tournamentId={tournamentId}
                  isCurrentUser={user?.id.toString() === item.userId}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
