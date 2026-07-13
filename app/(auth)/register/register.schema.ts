import z from "zod";

export const RegisterSchema = z
  .object({
    firstName: z.string().min(2, "First name is too short"),
    lastName: z.string().min(2, "Last name is too short"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]+$/,
        "Password can only contain English letters, numbers, and special characters",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
