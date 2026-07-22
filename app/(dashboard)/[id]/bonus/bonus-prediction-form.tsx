import { FC, useEffect, useState } from "react";
import {
  Crown,
  Award,
  Star,
  Save,
  Loader,
  Lock,
  Sparkles,
  HelpCircle,
} from "lucide-react";
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
import { Button } from "@/components/ui/button";

interface BonusPredictionFormProps {
  data?: GetBonusPredictionResponse;
}

export const BonusPredictionForm: FC<BonusPredictionFormProps> = ({ data }) => {
  const { id } = useParams<{ id: string }>();

  const [championInput, setChampionInput] = useState("");
  const [runnerUpInput, setRunnerUpInput] = useState("");
  const [topScorerInput, setTopScorerInput] = useState("");

  const debouncedChampionInput = useDebounceValue(championInput, 600);
  const debouncedRunnerUpInput = useDebounceValue(runnerUpInput, 600);
  const debouncedTopScorerInput = useDebounceValue(topScorerInput, 600);

  const isLocked = data?.tournamentStatus !== "UPCOMING";

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
        onSuccess: () =>
          toast.success("Your bonus predictions have been saved!"),
        onError: (e) => toast.error(`Something went wrong: ${e.message}`),
      },
    );

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="w-full space-y-6 text-white"
    >
      <div className="p-4 md:p-6 bg-brand-container rounded-md border border-brand-border space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-brand-border/80 gap-3">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              <Sparkles className="size-3.5" />
              <span>Outright Predictions</span>
            </div>
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Bonus Tournament Predictions
            </h2>
            <p className="text-xs text-gray-400">
              Pick the overall winner, runner-up, and top scorer before the
              tournament begins to score bonus points.
            </p>
          </div>
        </div>

        {isLocked && (
          <div className="flex items-center gap-3 p-4 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm">
            <Lock className="size-5 shrink-0 text-amber-400" />
            <span>
              <strong>Predictions Locked:</strong> The tournament has officially
              started. Bonus picks can no longer be edited.
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col gap-y-6 p-4 rounded-md border border-amber-500/60 bg-brand-card/60 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-amber-400">
                <div className="p-2 rounded-md bg-amber-500/15 border border-amber-500/60">
                  <Crown className="size-4" />
                </div>
                <span className="font-semibold text-sm text-white">
                  Tournament Champion
                </span>
              </div>
              <span className="px-2 py-1 rounded-md bg-amber-500/20 border border-amber-500/60 text-amber-400 text-xs font-semibold">
                +15 pts
              </span>
            </div>

            {isLocked ? (
              <div className="flex items-center justify-between p-3 rounded-md bg-[#161b22] border border-brand-border/40 min-h-11">
                <span className="text-xs text-gray-400 font-medium">
                  Your Pick
                </span>
                <div className="flex items-center gap-2">
                  {data?.champion?.logo ? (
                    <div className="relative size-5 shrink-0">
                      <Image
                        fill
                        src={data.champion.logo}
                        alt={data.champion.name}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <HelpCircle className="size-4 text-gray-500" />
                  )}
                  <span
                    className={
                      data?.champion?.name
                        ? "text-sm text-white font-semibold"
                        : "text-sm text-gray-400 font-medium"
                    }
                  >
                    {data?.champion?.name ?? "No prediction submitted"}
                  </span>
                </div>
              </div>
            ) : (
              <Combobox
                value={championId ? Number(championId) : null}
                onValueChange={handleChampionInput}
                inputValue={championInput}
                error={form.formState.errors.championTeamId?.message}
                disabled={isLocked}
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
                  placeholder="Search champion team..."
                  onBlur={() => {
                    if (!championId) setChampionInput("");
                  }}
                />
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
            )}
          </div>

          <div className="flex flex-col gap-y-6 p-4 rounded-md border border-sky-500/60 bg-brand-card/60 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-sky-400">
                <div className="p-2 rounded-md bg-sky-500/15 border border-sky-500/60">
                  <Award className="size-4" />
                </div>
                <span className="font-semibold text-sm text-white">
                  Runner-Up
                </span>
              </div>
              <span className="px-2 py-1 rounded-md bg-sky-500/20 border border-sky-500/60 text-sky-400 text-xs font-semibold">
                +10 pts
              </span>
            </div>

            {isLocked ? (
              <div className="flex items-center justify-between p-3 rounded-md bg-[#161b22] border border-brand-border/40 min-h-11">
                <span className="text-xs text-gray-400 font-medium">
                  Your Pick
                </span>
                <div className="flex items-center gap-2">
                  {data?.runnerUp?.logo ? (
                    <div className="relative size-5 shrink-0">
                      <Image
                        fill
                        src={data.runnerUp.logo}
                        alt={data.runnerUp.name}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <HelpCircle className="size-4 text-gray-500" />
                  )}
                  <span
                    className={
                      data?.runnerUp?.name
                        ? "text-sm text-white font-semibold"
                        : "text-sm text-gray-400 font-medium"
                    }
                  >
                    {data?.runnerUp?.name ?? "No prediction submitted"}
                  </span>
                </div>
              </div>
            ) : (
              <Combobox
                value={runnerUpId ? Number(runnerUpId) : null}
                onValueChange={handleRunnerUpInput}
                inputValue={runnerUpInput}
                error={form.formState.errors.runnerUpTeamId?.message}
                disabled={isLocked}
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
                  placeholder="Search runner-up team..."
                  onBlur={() => {
                    if (!runnerUpId) setRunnerUpInput("");
                  }}
                />
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
            )}
          </div>

          <div className="flex flex-col gap-y-6 p-4 rounded-md border border-emerald-500/60 bg-brand-card/60 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <div className="p-2 rounded-md bg-emerald-500/15 border border-emerald-500/60">
                  <Star className="size-4" />
                </div>
                <span className="font-semibold text-sm text-white">
                  Top Scorer
                </span>
              </div>
              <span className="px-2 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/60 text-emerald-400 text-xs font-semibold">
                +10 pts
              </span>
            </div>

            {isLocked ? (
              <div className="flex items-center justify-between p-3 rounded-md bg-[#161b22] border border-brand-border/40 min-h-11">
                <span className="text-xs text-gray-400 font-medium">
                  Your Pick
                </span>
                <div className="flex items-center gap-2">
                  {data?.topScorer?.teamLogo ? (
                    <div className="relative size-5 shrink-0">
                      <Image
                        fill
                        src={data.topScorer.teamLogo}
                        alt={data.topScorer.name}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <HelpCircle className="size-4 text-gray-500" />
                  )}
                  <span
                    className={
                      data?.topScorer?.name
                        ? "text-sm text-white font-semibold"
                        : "text-sm text-gray-400 font-medium"
                    }
                  >
                    {data?.topScorer?.name ?? "No prediction submitted"}
                  </span>
                </div>
              </div>
            ) : (
              <Combobox
                value={topScorerId ? Number(topScorerId) : null}
                onValueChange={handleTopScorerInput}
                inputValue={topScorerInput}
                disabled={isLocked}
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
                  placeholder="Search top scorer player..."
                  onBlur={() => {
                    if (!topScorerId) setTopScorerInput("");
                  }}
                />
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
            )}
          </div>
        </div>

        {!isLocked && (
          <div className="flex items-center justify-between pt-6 border-t border-brand-border/60">
            <span className="text-xs text-gray-400 hidden sm:inline-block">
              Make sure to save your predictions before the tournament kickoff.
            </span>
            <Button
              type="submit"
              variant="primary"
              disabled={isPending || !form.formState.isDirty}
              className="w-full sm:w-auto"
            >
              {isPending ? (
                <>
                  <Loader className="size-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  <span>Save Predictions</span>
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};
