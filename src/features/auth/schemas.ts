import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export const SignUpFormSchema = z.object({
  name: z.string().min(8, "Name must contain at least 8 character(s)").max(256),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must contain at least 8 character(s)")
    .max(256),
});
