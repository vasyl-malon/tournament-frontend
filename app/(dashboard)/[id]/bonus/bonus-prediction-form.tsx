import { FC, useEffect, useState } from "react";
import { Crown, Award, Star, Save, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useDebounceValue } from "@/lib/hooks/use-debounce";
import { useGetPlayers, useGetTeams } from "@/api";
import { useAddBonusBet } from "@/api/match/match.queries";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { BonusPredictionSchema } from "./bonus-prediction.schema";
import { toast } from "sonner";
import { GetBonusPredictionResponse } from "@/api/match/match.types";

interface BonusPredictionForm {
  data?: GetBonusPredictionResponse;
}

export const BonusPredictionForm: FC<BonusPredictionForm> = ({ data }) => {
  const { id } = useParams<{ id: string }>();

  const [championInput, setChampionInput] = useState("");
  const [runnerUpInput, setRunnerUpInput] = useState("");
  const [topScorerInput, setTopScorerInput] = useState("");

  const debouncedChampionInput = useDebounceValue(championInput, 600);
  const debouncedRunnerUpInput = useDebounceValue(runnerUpInput, 600);
  const debouncedTopScorerInput = useDebounceValue(topScorerInput, 600);

  const form = useForm<z.infer<typeof BonusPredictionSchema>>({
    resolver: zodResolver(BonusPredictionSchema),
    mode: "onChange",
    defaultValues: {
      championTeamId: data?.champion?.id,
      runnerUpTeamId: data?.runnerUp?.id,
      topScorerId: data?.topScorer?.id,
    },
  });

  useEffect(() => {
    if (!data) return;

    form.reset({
      championTeamId: data.champion?.id,
      runnerUpTeamId: data.runnerUp?.id,
      topScorerId: data.topScorer?.id,
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChampionInput(data.champion?.name ?? "");
    setRunnerUpInput(data.runnerUp?.name ?? "");
    setTopScorerInput(data.topScorer?.name ?? "");
  }, [data, form]);

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

  const { isPending, mutate } = useAddBonusBet();

  const { data: playersData } = useGetPlayers({
    tournamentId: id || "",
    search: debouncedTopScorerInput,
  });

  const { data: championTeamsData } = useGetTeams({
    tournamentId: id || "",
    search: debouncedChampionInput,
  });

  const { data: runnerUpTeamsData } = useGetTeams({
    tournamentId: id || "",
    search: debouncedRunnerUpInput,
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
      logo: item?.team.logo,
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
    form.setValue("runnerUpTeamId", selectedId ?? undefined, {
      shouldDirty: true,
      shouldValidate: true,
    });

    const team = runnerUpTeams.find((t) => t.id === selectedId);
    setRunnerUpInput(team?.name ?? "");
  };

  const handleTopScorerInput = (selectedId: number | null) => {
    form.setValue("topScorerId", selectedId ?? undefined, {
      shouldDirty: true,
      shouldValidate: true,
    });

    const player = players.find((t) => t.id === selectedId);
    setTopScorerInput(player?.name ?? "");
  };

  const handleSubmit = (values: z.infer<typeof BonusPredictionSchema>) =>
    mutate(
      {
        tournamentId: id,
        ...values,
      },
      {
        onSuccess: () => toast.success("Your predictions are saved!"),
        onError: (e) => toast.error(`Something went wrong ${e.message}`),
      },
    );

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="w-full space-y-6 text-white"
    >
      <div className="p-6 bg-color-background rounded-md border border-brand-border space-y-6">
        <div className="pb-3 border-b border-brand-border/50">
          <h2 className="text-xl font-bold tracking-wide">
            Make Your Bonus Predictions
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Predict tournament outcomes to earn massive extra points.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col gap-y-6 p-4 rounded-md border border-brand-border/60 bg-[#1c2128]/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="size-4" />
                <span className="font-semibold text-md text-gray-200">
                  Champion
                </span>
              </div>
              <span className="text-xs text-gray-400">worth 15 pts</span>
            </div>
            <Combobox
              value={championId ? Number(championId) : null}
              onValueChange={handleChampionInput}
              inputValue={championInput}
              error={form.formState.errors.championTeamId?.message}
              disabled={data?.tournamentStatus !== "UPCOMING"}
              onInputValueChange={(val) => {
                const matchedTeam = championTeams.find(
                  (t) => t.id.toString() === val,
                );
                if (matchedTeam) {
                  setChampionInput(matchedTeam.name);
                } else {
                  setChampionInput(val);
                  form.setValue("championTeamId", undefined, {
                    shouldValidate: true,
                  });
                }
              }}
            >
              <ComboboxInput
                placeholder="Search team..."
                onBlur={() => {
                  if (!championId) setChampionInput("");
                }}
              />
              <ComboboxContent>
                <ComboboxList>
                  {championTeams.map((team) => (
                    <ComboboxItem key={team.id} value={team.id}>
                      <div className="relative size-5">
                        <Image
                          fill
                          src={team.logo}
                          alt={team.name}
                          className="object-contain"
                        />
                      </div>
                      <span>{team.name}</span>
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
          <div className="flex flex-col gap-y-6 p-4 rounded-md border border-brand-border/60 bg-[#1c2128]/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="size-4" />
                <span className="font-semibold text-md text-gray-200">
                  Runner-up
                </span>
              </div>
              <span className="text-xs text-gray-400">worth 10 pts</span>
            </div>
            <Combobox
              value={runnerUpId ? Number(runnerUpId) : null}
              onValueChange={handleRunnerUpInput}
              inputValue={runnerUpInput}
              error={form.formState.errors.runnerUpTeamId?.message}
              disabled={data?.tournamentStatus !== "UPCOMING"}
              onInputValueChange={(val) => {
                const matchedTeam = runnerUpTeams.find(
                  (t) => t.id.toString() === val,
                );
                if (matchedTeam) {
                  setRunnerUpInput(matchedTeam.name);
                } else {
                  setRunnerUpInput(val);
                  form.setValue("runnerUpTeamId", undefined, {
                    shouldValidate: true,
                  });
                }
              }}
            >
              <ComboboxInput
                placeholder="Search team..."
                onBlur={() => {
                  if (!runnerUpId) setRunnerUpInput("");
                }}
              />
              <ComboboxContent>
                <ComboboxList>
                  {runnerUpTeams.map((team) => (
                    <ComboboxItem key={team.id} value={team.id}>
                      <div className="relative size-5">
                        <Image
                          fill
                          src={team.logo}
                          alt={team.name}
                          className="object-contain"
                        />
                      </div>
                      <span>{team.name}</span>
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
          <div className="flex flex-col gap-y-6 p-4 rounded-md border border-brand-border/60 bg-[#1c2128]/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="size-4" />
                <span className="font-semibold text-md text-gray-200">
                  Top Scorer
                </span>
              </div>
              <span className="text-xs text-gray-400">worth 10 pts</span>
            </div>
            <Combobox
              value={topScorerId ? Number(topScorerId) : null}
              onValueChange={handleTopScorerInput}
              inputValue={topScorerInput}
              disabled={data?.tournamentStatus !== "UPCOMING"}
              error={form.formState.errors.topScorerId?.message}
              onInputValueChange={(val) => {
                const matchedPlayer = players.find(
                  (t) => t.id.toString() === val,
                );
                if (matchedPlayer) {
                  setTopScorerInput(matchedPlayer.name);
                } else {
                  setTopScorerInput(val);
                  form.setValue("topScorerId", undefined, {
                    shouldValidate: true,
                  });
                }
              }}
            >
              <ComboboxInput
                placeholder="Search player..."
                onBlur={() => {
                  if (!topScorerId) setTopScorerInput("");
                }}
              />
              <ComboboxContent>
                <ComboboxList>
                  {players.map((team) => (
                    <ComboboxItem key={team.id} value={team.id}>
                      <div className="relative size-5">
                        <Image
                          fill
                          src={team.logo}
                          alt={team.name}
                          className="object-contain"
                        />
                      </div>
                      <span>{team.name}</span>
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
        </div>
        {data?.tournamentStatus === "UPCOMING" ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-brand-border/50 gap-4">
            <button
              type="submit"
              disabled={isPending}
              className={cn(
                "flex items-center justify-center gap-2 px-5 py-2.5 rounded text-sm font-bold tracking-wide transition-colors",
                "bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer",
                "disabled:bg-emerald-800 disabled:text-gray-400 disabled:cursor-not-allowed",
              )}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Predictions
                </>
              )}
            </button>
          </div>
        ) : null}
      </div>
    </form>
  );
};
