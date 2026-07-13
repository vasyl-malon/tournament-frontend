export type LoginParams = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: "ADMIN" | "USER";
  };
};

export type SendOtpParams = {
  code: string;
  verificationId: string;
};

export type SendOtpResponse = {
  token: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: "ADMIN" | "USER";
    avatarUrl?: string;
  };
};

export type InviteUserParams = {
  email: string;
  role: "USER" | "ADMIN";

  phoneNumber: string;

  firstName: string;
  lastName: string;

  birthdate?: string; // ISO string

  avatarUrl?: string;

  country?: string;
  city?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  jobPosition?: string;

  startDate?: string; // ISO
  endDate?: string; // ISO

  branchId: number;
  departmentId?: number;
};

export type InviteUserResponse = {
  user: {
    id: number;
    email: string;
    role: "USER" | "ADMIN";
    status: "PENDING";
  };

  invitation: {
    id: string;
    expiresAt: string;
  };
};

export type AcceptInviteParams = {
  password: string;
  token: string;
};

export type AcceptInviteResponse = {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: "ADMIN" | "USER";
    avatarUrl?: string;
  };
};
