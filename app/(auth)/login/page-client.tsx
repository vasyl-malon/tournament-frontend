"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, Form, useForm } from "react-hook-form";
// import { toast } from "sonner"
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Mail, Lock, Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  password: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   title: "",
    //   description: "",
    // },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  // 3. Обробник відправки
  const onSubmit = async (data: any) => {
    // Імітація запиту на сервер (наприклад, 1 секунда)
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Відправляємо на бекенд:", data);
  };

  return (
    <Card className="w-full sm:max-w-md mt-40">
      <Form {...form}>
        <CardHeader>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-50">Welcome Back</h2>
            <p className="text-slate-400 mt-2 text-sm">
              Sign in to predict football matches
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <form
            // onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* Поле Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <Input
                  // id="email"
                  // type="email"
                  autoComplete="email"
                  placeholder="player@example.com"
                  className={`pl-10 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  {...register("email")} // Підключаємо інпут до react-hook-form
                />
              </div>
              {/* Вивід помилки */}
              {/* {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )} */}
            </div>

            {/* Поле Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-300"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <Input
                  // id="password"
                  // type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={`pl-10 ${errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  {...register("password")}
                />
              </div>
              {/* {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )} */}
            </div>
            {/* 
            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-red-600 transition-colors mt-6"
            >
              Sign In
            </button> */}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-6"
              disabled={!form.formState.isValid}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
      </Form>
    </Card>
  );
}
