"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/lib/api";
import { useAuthStore } from "@/lib/auth.store";
import { LoginSchema } from "./login.schema";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";

export const LoginForm = () => {
  const router = useRouter();
  const { mutate, isPending, error } = useLogin();
  const { setAuth, getActiveTournamentId } = useAuthStore();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });

  const handleSubmit = (values: z.infer<typeof LoginSchema>) => {
    mutate(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: (data) => {
          const tournamentId = getActiveTournamentId();
          const activeTournamentId = tournamentId || data.lastTournamentId;

          setAuth(data.token, data.user, activeTournamentId);

          if (!activeTournamentId) {
            router.push("/no-tournaments");
            return;
          }

          const targetPath =
            data.user.role === "ADMIN" ? "admin/dashboard" : "dashboard";
          router.push(`/${activeTournamentId}/${targetPath}`);
        },
      },
    );
  };

  return (
    <Card className="text-white border !border-brand-border rounded-md w-full max-w-md">
      <CardHeader>
        <div className="mx-auto size-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center p-2">
          <Image
            src="/logo.svg"
            alt="Predict The Win"
            width={28}
            height={28}
            className="object-contain"
          />
        </div>
        <CardTitle className="text-xl text-center">Welcome Back</CardTitle>
        <CardDescription className="text-center text-gray-400">
          Enter your credentials to access your predictions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
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
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                required
                placeholder="********"
                error={form.formState.errors.password}
                {...form.register("password")}
              />
            </Field>
            {error ? (
              <span className="text-red-400 text-sm text-center block">
                {error.message}
              </span>
            ) : null}
            <Field>
              <Button
                type="submit"
                variant="primary"
                disabled={!form.formState.isValid || isPending}
                className="w-full"
              >
                <Spinner
                  data-icon="inline-start"
                  className={cn("hidden", isPending && "inline")}
                />
                Sign In
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};
