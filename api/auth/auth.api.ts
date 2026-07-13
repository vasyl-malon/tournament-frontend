import { api } from "../http";
import {
  AcceptInviteParams,
  InviteUserParams,
  InviteUserResponse,
  LoginParams,
  LoginResponse,
  SendOtpParams,
  SendOtpResponse,
} from "./auth.types";

export const authApi = {
  login: async (data: LoginParams): Promise<LoginResponse> => {
    const res = await api.post<LoginResponse>("/auth/login", data);
    return res.data;
  },

  sendOtp: async (data: SendOtpParams): Promise<SendOtpResponse> => {
    const res = await api.post<SendOtpResponse>("/auth/verify-otp", data);
    return res.data;
  },

  inviteUser: async (data: InviteUserParams): Promise<InviteUserResponse> => {
    const res = await api.post<InviteUserResponse>("/auth/invite-user", data);
    return res.data;
  },

  acceptInvite: async (data: AcceptInviteParams) => {
    const res = await api.post("/auth/accept-invite", data);
    return res.data;
  },
};
