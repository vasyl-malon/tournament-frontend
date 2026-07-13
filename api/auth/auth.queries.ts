import { useMutation } from "@tanstack/react-query";
import { authApi } from "./auth.api";
import {
  AcceptInviteParams,
  AcceptInviteResponse,
  InviteUserParams,
  InviteUserResponse,
  LoginParams,
  LoginResponse,
  SendOtpParams,
  SendOtpResponse,
} from "./auth.types";
import { AxiosError } from "axios";

export const useLogin = () =>
  useMutation<LoginResponse, AxiosError, LoginParams>({
    mutationKey: ["login"],
    mutationFn: (data) => authApi.login(data),
  });

export const useSendOtp = () =>
  useMutation<SendOtpResponse, AxiosError, SendOtpParams>({
    mutationKey: ["send-otp"],
    mutationFn: authApi.sendOtp,
  });

export const useInviteUser = () =>
  useMutation<InviteUserResponse, AxiosError, InviteUserParams>({
    mutationKey: ["invite-user"],
    mutationFn: authApi.inviteUser,
  });

export const useAcceptInvite = () =>
  useMutation<AcceptInviteResponse, AxiosError, AcceptInviteParams>({
    mutationKey: ["accept-invite"],
    mutationFn: authApi.acceptInvite,
  });
