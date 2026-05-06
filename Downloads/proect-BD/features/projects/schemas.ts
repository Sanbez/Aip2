import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const createProjectSchema = z.object({
  name: z.string().min(2, "Минимум 2 символа").max(64),
  slug: z
    .string()
    .min(2)
    .max(32)
    .regex(slugRegex, "Только строчные буквы, цифры и дефис"),
  description: z.string().max(512).optional(),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
});

export const updateProjectSchema = createProjectSchema.partial().omit({ slug: true });

export const addMemberSchema = z.object({
  projectId: z.string().uuid(),
  email: z.string().email(),
  role: z.enum(["ADMIN", "MANAGER", "USER"]).default("USER"),
});

export const generateInviteSchema = z.object({
  projectId: z.string().uuid(),
  role: z.enum(["ADMIN", "MANAGER", "USER"]).default("USER"),
});

export const removeMemberSchema = z.object({
  projectId: z.string().uuid(),
  userId: z.string().uuid(),
});

export const updateMemberRoleSchema = z.object({
  projectId: z.string().uuid(),
  userId: z.string().uuid(),
  role: z.enum(["ADMIN", "MANAGER", "USER"]),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type AddMemberInput = z.infer<typeof addMemberSchema>;
export type GenerateInviteInput = z.infer<typeof generateInviteSchema>;
export type RemoveMemberInput = z.infer<typeof removeMemberSchema>;
export type UpdateMemberRoleInput = z.infer<typeof updateMemberRoleSchema>;
