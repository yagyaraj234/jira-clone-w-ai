import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().min(1, "Minimum 1 chatacter required").max(100),
});

export const updateWorkspaceSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Minimum 1 chatacter required").max(100),
});

export const deleteWorkspaceSchema = z.object({
  id: z.string().uuid(),
});
