"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useSyncMatches, useSyncTeams } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { FinalizeTournament } from "./finalize-tournament";

export const AdminSettings = () => {
  const { id: tournamentId } = useParams<{ id: string }>();

  const syncTeams = useSyncTeams();
  const syncMatches = useSyncMatches();

  return (
    <div className="flex flex-col gap-y-12 mx-auto">
      <div className="flex flex-col gap-y-2 border-b border-brand-border/40 pb-4">
        <h1 className="text-2xl font-semibold text-white">Actions</h1>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Button
          variant="primary"
          disabled={syncTeams.isPending}
          onClick={() => syncTeams.mutate({ tournamentId })}
        >
          <Spinner
            data-icon="inline-start"
            className={cn("hidden", syncTeams.isPending && "inline")}
          />
          Sync teams
        </Button>
        <Button
          variant="primary"
          disabled={syncMatches.isPending}
          onClick={() => syncMatches.mutate({ tournamentId })}
        >
          <Spinner
            data-icon="inline-start"
            className={cn("hidden", syncMatches.isPending && "inline")}
          />
          Sync matches
        </Button>
      </div>
      <FinalizeTournament />
    </div>
  );
};
