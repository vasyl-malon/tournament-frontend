"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRegister } from "@/api";
import { Spinner } from "@/components/ui/spinner";
import z from "zod";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "./register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useRouter, useSearchParams } from "next/navigation";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setAuth, setTournamentId, tournamentId } = useAuthStore();

  const token = searchParams.get("token") || "";

  const { mutate, isPending, error, data, isSuccess } = useRegister();

  useEffect(() => {
    if (isSuccess) {
      setAuth(data.token, data.user);
      if (!tournamentId && data.lastTournamentId)
        setTournamentId(data.lastTournamentId);
      router.push(tournamentId ? `${tournamentId}/dashboard` : "/dashboard");
    }
  }, [data, isSuccess, tournamentId, router, setAuth, setTournamentId]);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });

  const handleSubmit = (values: z.infer<typeof RegisterSchema>) => {
    mutate({
      token,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      confirmPassword: values.confirmPassword,
    });
  };

  return (
    <Card
      className={cn(
        "!text-white border !border-brand-border rounded-md w-full max-w-md",
        className,
      )}
      {...props}
    >
      <CardHeader>
        <CardTitle className="text-xl text-center">
          Create your account
        </CardTitle>
        <CardDescription className="text-center">
          Fill in your details to join the tournament
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="firstName">First Name</FieldLabel>
              <Input
                id="firstName"
                placeholder="John"
                required
                error={form.formState.errors.firstName}
                {...form.register("firstName")}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
              <Input
                id="lastName"
                placeholder="Doe"
                required
                error={form.formState.errors.lastName}
                {...form.register("lastName")}
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
            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirmPassword"
                type="password"
                required
                placeholder="********"
                error={form.formState.errors.confirmPassword}
                {...form.register("confirmPassword")}
              />
            </Field>
            {error ? (
              <span className="text-red-500 text-sm text-center block">
                {error.message}
              </span>
            ) : null}
            <Field>
              <Button
                type="submit"
                disabled={!form.formState.isValid || isPending}
                className="w-full"
              >
                <Spinner
                  data-icon="inline-start"
                  className={cn("hidden", isPending && "inline")}
                />
                Complete Registration
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
