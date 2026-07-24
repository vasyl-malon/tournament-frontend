import { useMutation } from "@tanstack/react-query";
import { authApi } from "./auth.api";

export const useLogin = () =>
  useMutation({
    mutationKey: ["login"],
    mutationFn: authApi.login,
  });

export const useRegister = () =>
  useMutation({
    mutationKey: ["register"],
    mutationFn: authApi.register,
  });

