import { z } from "zod";

export const mailSchema = z.object({
  email: z.string().email(),
  subject: z.string(),
});

export const mailBatchSchema = z.object({
  emails: z.array(z.string().email()),
  subject: z.string(),
});


export const workspaceSchema = z.object({
  name: z.string(),
});

export const projectSchema = z.object({
  name: z.string(),
  workspaceId: z.string(),
});