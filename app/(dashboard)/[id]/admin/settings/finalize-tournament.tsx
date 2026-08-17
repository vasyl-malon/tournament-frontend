"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Crown, Award, Star } from "lucide-react";
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import Image from "next/image";
import { useDebounceValue } from "@/lib/hooks/use-debounce";
import {
  useFinalizeTournament,
  useGetAllTournaments,
  useGetPlayers,
  useGetTeams,
} from "@/lib/api";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const FinalizeTournamentSchema = z.object({
  championTeamId: z
    .number({ error: "Champion team is required" })
    .min(1, "Champion team is required"),
  runnerUpTeamId: z
    .number({ error: "Runner-up team is required" })
    .min(1, "Runner-up team is required"),
  topScorerId: z
    .number({ error: "Top scorer player is required" })
    .min(1, "Top scorer player is required"),
});

export const FinalizeTournament = () => {
  const { id: tournamentId } = useParams<{ id: string }>();
  const { data, refetch, isLoading, isFetching } = useGetAllTournaments();

  const actualTournament = data?.data.find((item) => item.id === tournamentId);

  const finalizeTournament = useFinalizeTournament();

  const [championInput, setChampionInput] = useState("");
  const [runnerUpInput, setRunnerUpInput] = useState("");
  const [topScorerInput, setTopScorerInput] = useState("");

  const debouncedChampionInput = useDebounceValue(championInput, 600);
  const debouncedRunnerUpInput = useDebounceValue(runnerUpInput, 600);
  const debouncedTopScorerInput = useDebounceValue(topScorerInput, 600);

  const form = useForm<z.infer<typeof FinalizeTournamentSchema>>({
    resolver: zodResolver(FinalizeTournamentSchema),
    mode: "onChange",
  });

  const championId = useWatch({
    control: form.control,
    name: "championTeamId",
  });

  const runnerUpId = useWatch({
    control: form.control,
    name: "runnerUpTeamId",
  });

  const topScorerId = useWatch({
    control: form.control,
    name: "topScorerId",
  });

  const { data: championTeamsData } = useGetTeams({
    tournamentId,
    search: debouncedChampionInput,
  });

  const { data: runnerUpTeamsData } = useGetTeams({
    tournamentId,
    search: debouncedRunnerUpInput,
  });

  const { data: playersData } = useGetPlayers({
    tournamentId,
    search: debouncedTopScorerInput,
  });

  const championTeams =
    championTeamsData?.data?.map((item) => ({
      id: item.id,
      name: item.name,
      logo: item?.logo,
    })) || [];

  const runnerUpTeams =
    runnerUpTeamsData?.data?.map((item) => ({
      id: item.id,
      name: item.name,
      logo: item?.logo,
    })) || [];

  const players =
    playersData?.data?.map((item) => ({
      id: item.id,
      name: item.name,
      logo: item?.team?.logo,
    })) || [];

  const handleChampionInput = (selectedId: number | null) => {
    form.setValue("championTeamId", selectedId ?? 0, {
      shouldDirty: true,
      shouldValidate: true,
    });

    const team = championTeams.find((t) => t.id === selectedId);
    setChampionInput(team?.name ?? "");
  };

  const handleRunnerUpInput = (selectedId: number | null) => {
    form.setValue("runnerUpTeamId", selectedId ?? 0, {
      shouldDirty: true,
      shouldValidate: true,
    });

    const team = runnerUpTeams.find((t) => t.id === selectedId);
    setRunnerUpInput(team?.name ?? "");
  };

  const handleTopScorerInput = (selectedId: number | null) => {
    form.setValue("topScorerId", selectedId ?? 0, {
      shouldDirty: true,
      shouldValidate: true,
    });

    const player = players.find((t) => t.id === selectedId);
    setTopScorerInput(player?.name ?? "");
  };

  const handleSubmit = (values: z.infer<typeof FinalizeTournamentSchema>) =>
    finalizeTournament.mutate(
      {
        tournamentId,
        championTeamId: values.championTeamId,
        runnerUpTeamId: values.runnerUpTeamId,
        topScorerId: values.topScorerId,
      },
      {
        onSuccess: () => {
          refetch();
          toast.success("Tournament has been successfully finalized!");
        },
        onError: (e) => toast.error(`Something went wrong: ${e.message}`),
      },
    );

  const isDisabled =
    finalizeTournament.isPending ||
    !topScorerId ||
    !runnerUpId ||
    !championId ||
    actualTournament?.status === "FINISHED" ||
    isLoading ||
    isFetching;

  return (
    <div className="space-y-6">
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-y-4 p-4 rounded-md border border-amber-500/60 bg-brand-container/60">
            <div className="flex items-center gap-2 text-amber-400">
              <Crown className="size-4" />
              <span className="font-semibold text-sm text-white">Champion</span>
            </div>
            <Combobox
              value={championId ? Number(championId) : null}
              onValueChange={handleChampionInput}
              inputValue={championInput}
              error={form.formState.errors.championTeamId?.message}
              onInputValueChange={(val) => {
                const matchedTeam = championTeams.find(
                  (t) => t.id.toString() === val,
                );
                if (matchedTeam) {
                  setChampionInput(matchedTeam.name);
                } else {
                  setChampionInput(val);
                  form.setValue("championTeamId", 0, {
                    shouldValidate: true,
                  });
                }
              }}
            >
              <ComboboxInput placeholder="Select champion team..." />
              <ComboboxContent>
                <ComboboxList>
                  {championTeams.map((team) => (
                    <ComboboxItem key={team.id} value={team.id}>
                      {team.logo && (
                        <div className="relative size-5 shrink-0">
                          <Image
                            fill
                            src={team.logo}
                            alt={team.name}
                            className="object-contain"
                          />
                        </div>
                      )}
                      <span>{team.name}</span>
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
          <div className="flex flex-col gap-y-4 p-4 rounded-md border border-sky-500/60 bg-brand-container/60">
            <div className="flex items-center gap-2 text-sky-400">
              <Award className="size-4" />
              <span className="font-semibold text-sm text-white">
                Runner-Up
              </span>
            </div>
            <Combobox
              value={runnerUpId ? Number(runnerUpId) : null}
              onValueChange={handleRunnerUpInput}
              inputValue={runnerUpInput}
              error={form.formState.errors.runnerUpTeamId?.message}
              onInputValueChange={(val) => {
                const matchedTeam = runnerUpTeams.find(
                  (t) => t.id.toString() === val,
                );
                if (matchedTeam) {
                  setRunnerUpInput(matchedTeam.name);
                } else {
                  setRunnerUpInput(val);
                  form.setValue("runnerUpTeamId", 0, {
                    shouldValidate: true,
                  });
                }
              }}
            >
              <ComboboxInput placeholder="Select runner-up team..." />
              <ComboboxContent>
                <ComboboxList>
                  {runnerUpTeams.map((team) => (
                    <ComboboxItem key={team.id} value={team.id}>
                      {team.logo && (
                        <div className="relative size-5 shrink-0">
                          <Image
                            fill
                            src={team.logo}
                            alt={team.name}
                            className="object-contain"
                          />
                        </div>
                      )}
                      <span>{team.name}</span>
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
          <div className="flex flex-col gap-y-4 p-4 rounded-md border border-emerald-500/60 bg-brand-container/60">
            <div className="flex items-center gap-2 text-emerald-400">
              <Star className="size-4" />
              <span className="font-semibold text-sm text-white">
                Top Scorer
              </span>
            </div>
            <Combobox
              value={topScorerId ? Number(topScorerId) : null}
              onValueChange={handleTopScorerInput}
              inputValue={topScorerInput}
              error={form.formState.errors.topScorerId?.message}
              onInputValueChange={(val) => {
                const matchedPlayer = players.find(
                  (t) => t.id.toString() === val,
                );
                if (matchedPlayer) {
                  setTopScorerInput(matchedPlayer.name);
                } else {
                  setTopScorerInput(val);
                  form.setValue("topScorerId", 0, {
                    shouldValidate: true,
                  });
                }
              }}
            >
              <ComboboxInput placeholder="Select top scorer..." />
              <ComboboxContent>
                <ComboboxList>
                  {players.map((player) => (
                    <ComboboxItem key={player.id} value={player.id}>
                      {player.logo && (
                        <div className="relative size-5 shrink-0">
                          <Image
                            fill
                            src={player.logo}
                            alt={player.name}
                            className="object-contain"
                          />
                        </div>
                      )}
                      <span>{player.name}</span>
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
        </div>

        <div className="flex max-md:flex-col items-center justify-between p-4 bg-brand-container rounded-md border border-brand-border gap-4">
          <p className="text-sm text-gray-400">
            ⚠️ <strong>Warning</strong>: Upon submission, the tournament status
            will change to finished, and points will be automatically calculated
            and awarded to all participants.
          </p>
          <Button
            type="submit"
            variant="primary"
            disabled={isDisabled}
            className="max-md:w-full"
          >
            <Spinner
              data-icon="inline-start"
              className={cn("hidden", finalizeTournament.isPending && "inline")}
            />
            Finalize tournament
          </Button>
        </div>
      </form>
    </div>
  );
};
