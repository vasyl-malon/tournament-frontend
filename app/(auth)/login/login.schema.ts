import z from "zod";

export const LoginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]+$/,
      "Password can only contain English letters, numbers, and special characters",
    ),
});
