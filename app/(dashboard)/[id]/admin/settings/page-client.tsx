"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useFinalizeTournament, useSyncMatches, useSyncTeams } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";

export const AdminSettings = () => {
  const { id: tournamentId } = useParams<{ id: string }>();

  const syncTeams = useSyncTeams();
  const syncMatches = useSyncMatches();
  const finalizeTournament = useFinalizeTournament();

  return (
    <div className="flex flex-col gap-y-8 mx-auto">
      <div className="flex flex-col gap-y-2 border-b border-brand-border/40 pb-4">
        <h1 className="text-2xl font-semibold text-white">Actions</h1>
      </div>
      <Button
        variant="primary"
        disabled={syncTeams.isPending}
        className="max-md:w-full"
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
        className="max-md:w-full"
        onClick={() => syncMatches.mutate({ tournamentId })}
      >
        <Spinner
          data-icon="inline-start"
          className={cn("hidden", syncMatches.isPending && "inline")}
        />
        Sync matches
      </Button>

      <Button
        variant="primary"
        disabled={finalizeTournament.isPending}
        className="max-md:w-full"
        onClick={() =>
          finalizeTournament.mutate({
            tournamentId,
            championTeamId: 524,
            runnerUpTeamId: 57,
            topScorerId: 19,
          })
        }
      >
        <Spinner
          data-icon="inline-start"
          className={cn("hidden", finalizeTournament.isPending && "inline")}
        />
        Finalize tournament
      </Button>
    </div>
  );
};
