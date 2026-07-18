import { z } from "zod";

export const BonusPredictionSchema = z
  .object({
    championTeamId: z.number().optional(),
    runnerUpTeamId: z.number().optional(),
    topScorerId: z.number().optional(),
  })
  .refine(
    ({ championTeamId, runnerUpTeamId }) =>
      !championTeamId || !runnerUpTeamId || championTeamId !== runnerUpTeamId,
    {
      message: "Champion and runner-up must be different teams.",
      path: ["runnerUpTeamId"],
    },
  );
