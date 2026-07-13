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
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogin, useSendOtp } from "@/api";
import { Spinner } from "@/components/ui/spinner";
import z from "zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "./login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
// import { OTPForm } from "@/components/otp-form";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { mutate, isPending, error, data, isSuccess } = useLogin();

  const searchParams = useSearchParams();
  const isActivated = searchParams.get("activated") === "true";

  const router = useRouter();

  const { setAuth } = useAuthStore();

  useEffect(() => {
    if (isSuccess) {
      setAuth(data.token, data.user);
      router.push("/dashboard");
    }
  }, [data, isSuccess, router, setAuth]);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
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
    <div
      className={cn("flex flex-col gap-6 text-slate-400", className)}
      {...props}
    >
      {false ? (
        <div>1</div>
      ) : (
        <Card className="!text-white">
          <CardHeader>
            <CardTitle className="text-xl text-center">Welcome back</CardTitle>
            {/* <CardDescription>
              Login with your Apple or Google account
            </CardDescription> */}
            {isActivated && (
              <Alert
                variant="default"
                className="border-green-500 bg-green-50 dark:bg-green-950/20"
              >
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800 dark:text-green-400">
                  Account Activated
                </AlertTitle>
                <AlertDescription className="text-green-700 dark:text-green-500">
                  Your password has been set successfully. Please log in to
                  continue.
                </AlertDescription>
              </Alert>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    error={form.formState.errors.email}
                    {...form.register("email")}
                  />
                </Field>
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    error={form.formState.errors.password}
                    {...form.register("password")}
                  />
                </Field>
                {error && (
                  <span className="text-negative">{error.message}</span>
                )}
                <Field>
                  <Button type="submit" disabled={isPending}>
                    <Spinner
                      data-icon="inline-start"
                      className={cn("hidden", isPending && "inline")}
                    />
                    Login
                  </Button>
                  <FieldDescription className="text-center">
                    Don&apos;t have an account? <a href="#">Sign up</a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      )}
      {/* <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription> */}
    </div>
  );
}
