import { useMutation } from "@tanstack/react-query";
import { authApi } from "./auth.api";
import {
  LoginParams,
  LoginResponse,
  RegisterParams,
  RegisterResponse,
} from "./auth.types";
import { AxiosError } from "axios";

export const useLogin = () =>
  useMutation<LoginResponse, AxiosError, LoginParams>({
    mutationKey: ["login"],
    mutationFn: authApi.login,
  });

export const useRegister = () =>
  useMutation<RegisterResponse, AxiosError, RegisterParams>({
    mutationKey: ["register"],
    mutationFn: authApi.register,
  });
