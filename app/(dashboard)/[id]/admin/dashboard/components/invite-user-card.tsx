import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { Field, FieldLabel } from "@/components/ui/field";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useInviteUser } from "@/lib/api/tournament/tournaments.queries";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export const InviteUserSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

interface InviteUserProps {
  onSuccess?: () => void;
}

export const InviteUserCard = ({ onSuccess }: InviteUserProps) => {
  const { id: tournamentId } = useParams<{ id: string }>();

  const { isPending, mutate } = useInviteUser();

  const form = useForm<z.infer<typeof InviteUserSchema>>({
    resolver: zodResolver(InviteUserSchema),
    mode: "onChange",
  });

  const handleSubmit = (values: z.infer<typeof InviteUserSchema>) =>
    mutate(
      {
        email: values.email,
        tournamentId: tournamentId || "",
      },
      {
        onSuccess: () => {
          onSuccess?.();
          form.reset();
          toast.success("An email invitation was sent.");
        },
        onError: (e) => toast.error(`Something went wrong: ${e.message}`),
      },
    );

  return (
    <div className="flex flex-col gap-y-4 bg-brand-container border border-brand-border rounded-md p-4 md:p-5 w-full">
      <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
        <div className="flex items-center gap-2">
          <Mail className="size-4 text-sky-400" />
          <h2 className="text-base font-semibold text-white">
            Invite New User
          </h2>
        </div>
      </div>
      <p className="text-xs text-gray-400 leading-relaxed">
        Send an email invitation. The user will register and automatically join
        this tournament.
      </p>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-y-6"
      >
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            placeholder="example@gmail.com"
            required
            error={form.formState.errors.email}
            {...form.register("email")}
          />
        </Field>
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
          Send invitation
        </Button>
      </form>
    </div>
  );
};
