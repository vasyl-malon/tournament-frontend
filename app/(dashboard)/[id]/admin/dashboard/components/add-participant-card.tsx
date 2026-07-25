import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserCheck } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { Field, FieldLabel } from "@/components/ui/field";
import { useDebounceValue } from "@/lib/hooks/use-debounce";
import z from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetActiveUsers } from "@/lib/api";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { useAddParticipant } from "@/lib/api/tournament/tournaments.queries";
import { toast } from "sonner";

export const AddParticipantSchema = z.object({
  userId: z.string(),
});

interface AddParticipantCardProps {
  onSuccess?: () => void;
}

export const AddParticipantCard = ({ onSuccess }: AddParticipantCardProps) => {
  const { id: tournamentId } = useParams<{ id: string }>();

  const [input, setInput] = useState("");

  const debouncedInput = useDebounceValue(input, 600);

  const { isPending, mutate } = useAddParticipant();
  const { data } = useGetActiveUsers({
    tournamentId,
    query: debouncedInput,
  });

  const form = useForm<z.infer<typeof AddParticipantSchema>>({
    resolver: zodResolver(AddParticipantSchema),
    mode: "onChange",
  });

  const userId = useWatch({
    control: form.control,
    name: "userId",
  });

  const users =
    data?.data?.map((item) => ({
      id: item.id,
      name: `${item.firstName} ${item.lastName}`,
    })) || [];

  const handleInput = (selectedId: string | null) => {
    form.setValue("userId", selectedId?.toString() ?? "", {
      shouldDirty: true,
      shouldValidate: true,
    });

    const team = users.find((t) => t.id === selectedId);
    setInput(team?.name ?? "");
  };

  const handleSubmit = (values: z.infer<typeof AddParticipantSchema>) =>
    mutate(
      {
        userId: values.userId?.toString(),
        tournamentId: tournamentId || "",
      },
      {
        onSuccess: () => {
          onSuccess?.();
          setInput("");
          form.reset();
          toast.success("User was added to the tournament!");
        },
        onError: (e) => toast.error(`Something went wrong: ${e.message}`),
      },
    );

  return (
    <div className="flex flex-col gap-y-4 bg-brand-container border border-brand-border rounded-md p-4 md:p-5 w-full">
      <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
        <div className="flex items-center gap-2">
          <UserCheck className="size-4 text-emerald-400" />
          <h2 className="text-base font-semibold text-white">
            Add Existing User
          </h2>
        </div>
      </div>
      <p className="text-xs text-gray-400 leading-relaxed">
        Add an already registered platform user directly to this tournament by
        email or ID.
      </p>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-y-6"
      >
        <Combobox<string>
          value={userId}
          onValueChange={handleInput}
          inputValue={input}
          error={form.formState.errors.userId?.message}
          onInputValueChange={(val) => {
            const matchedUser = users.find((t) => t.id.toString() === val);
            if (matchedUser) {
              setInput(matchedUser.name);
            } else {
              setInput(val);
              form.resetField("userId");
            }
          }}
        >
          <Field>
            <FieldLabel htmlFor="user">User</FieldLabel>
            <ComboboxInput
              id="user"
              placeholder="Search champion team..."
              onBlur={() => {
                if (!userId) setInput("");
              }}
            />
          </Field>
          <ComboboxContent>
            {users.length ? (
              <ComboboxList>
                {users.map((user) => (
                  <ComboboxItem key={user.id} value={user.id}>
                    <span>{user.name}</span>
                  </ComboboxItem>
                ))}
              </ComboboxList>
            ) : (
              <ComboboxEmpty>No items found.</ComboboxEmpty>
            )}
          </ComboboxContent>
        </Combobox>
        <Button
          size="sm"
          type="submit"
          variant="primary"
          disabled={!form.formState.isValid || isPending}
          className="w-full"
        >
          <Spinner
            data-icon="inline-start"
            className={cn("hidden", isPending && "inline")}
          />
          Add participant
        </Button>
      </form>
    </div>
  );
};
