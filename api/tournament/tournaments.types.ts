export enum BranchStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  ARCHIVED = "ARCHIVED",
}

export type GetBranchesParams = {
  status?: string;
  limit?: number;
  page: number;
  search?: string;
};

export type Branch = {
  id: number;
  name: string;
  status: BranchStatus;
  createdAt: string;
  activatedAt: string | null;
  deactivatedAt: string | null;
  archivedAt: string | null;
  users: {
    id: number;
  };
};

export type GetMyTournamentsResponse = {
  data: {
    apiCode: string;
    createdAt: string;
    id: string;
    name: string;
    status: string;
  }[];
};

export type CreateBranchParams = {
  name: string;
};

export type CreateBranchResponse = Branch;

export type GetBranchParams = {
  id: string;
};

export type GetBranchResponse = Branch;

export type UpdateBranchStatusParams = {
  id: number;
  status: BranchStatus;
};

export type UpdateBranchStatusResponse = Branch;
