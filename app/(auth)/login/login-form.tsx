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
import { useLogin } from "@/api";
import { Spinner } from "@/components/ui/spinner";
import z from "zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "./login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { mutate, isPending, error, data, isSuccess } = useLogin();

  const router = useRouter();

  const { setAuth, setTournamentId, tournamentId } = useAuthStore();

  useEffect(() => {
    if (isSuccess) {
      setAuth(data.token, data.user);
      if (!tournamentId && data.lastTournamentId)
        setTournamentId(data.lastTournamentId);
      router.push(tournamentId ? `${tournamentId}/dashboard` : "/dashboard");
    }
  }, [data, isSuccess, tournamentId, router, setAuth, setTournamentId]);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });

  console.log(error, "error", data);

  const handleSubmit = (values: z.infer<typeof LoginSchema>) => {
    console.log(values);

    mutate({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <Card className="!text-white border !border-brand-border rounded-md w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl text-center">Welcome back</CardTitle>
        <CardDescription className="text-center">
          Use your credentials to sign in
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                placeholder="mail@example.com"
                required
                error={form.formState.errors.email}
                {...form.register("email")}
              />
            </Field>
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                {/* <a
                  href="#"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a> */}
              </div>
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
              <span className="text-red-500">{error.message}</span>
            ) : null}
            <Field>
              <Button
                type="submit"
                disabled={!form.formState.isValid || isPending}
              >
                <Spinner
                  data-icon="inline-start"
                  className={cn("hidden", isPending && "inline")}
                />
                Login
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
