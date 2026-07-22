"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Image from "next/image";
import { AlertCircle, Loader2, Lock, Mail } from "lucide-react";

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
import { useAuthStore } from "@/store/auth.store";
import { LoginSchema } from "./login.schema";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const { mutate, isPending, error, data, isSuccess } = useLogin();
  const { setAuth, setTournamentId, tournamentId } = useAuthStore();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Авторизація та якісний редирект
  useEffect(() => {
    if (isSuccess && data) {
      setAuth(data.token, data.user);

      // Визначаємо актуальний турнір для редиректу
      const activeTournamentId = tournamentId || data.lastTournamentId;

      if (activeTournamentId) {
        setTournamentId(activeTournamentId);
        router.push(`/${activeTournamentId}/dashboard`);
      } else {
        router.push("/dashboard");
      }
    }
  }, [data, isSuccess, tournamentId, router, setAuth, setTournamentId]);

  const handleSubmit = (values: z.infer<typeof LoginSchema>) => {
    mutate({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <div className={cn("w-full max-w-sm mx-auto", className)} {...props}>
      <Card className="bg-[#161b22] border-brand-border/80 shadow-2xl rounded-md text-white">
        <CardHeader className="space-y-3 text-center pb-6">
          {/* Logo Badge */}
          <div className="mx-auto size-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center p-2">
            <Image
              src="/logo.svg"
              alt="Predict The Win"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>

          <div className="space-y-1">
            <CardTitle className="text-xl font-black tracking-tight text-white">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-xs text-gray-400">
              Enter your credentials to access your predictions
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* Server Error Alert */}
            {error && (
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium animate-in fade-in duration-200">
                <AlertCircle className="size-4 shrink-0 text-red-400" />
                <span>{error.message || "Invalid email or password"}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-semibold text-gray-300 block"
              >
                Email Address
              </label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  autoComplete="email"
                  disabled={isPending}
                  className="bg-brand-page rounded-lg text-sm"
                  {...form.register("email")}
                />
              </div>
              {form.formState.errors.email && (
                <p className="text-[11px] text-red-400 font-medium pl-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold text-gray-300"
                >
                  Password
                </label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                disabled={isPending}
                  className="bg-brand-page rounded-lg text-sm"
                {...form.register("password")}
              />
              {form.formState.errors.password && (
                <p className="text-[11px] text-red-400 font-medium pl-1">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              // size="lg"
              disabled={!form.formState.isValid || isPending}
              className="w-full mt-4"
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}