import { z } from "zod";

export const createCommentSchema = z.object({
  taskId: z.string().uuid("Некорректный ID задачи"),
  content: z.string().min(1).max(5_000),
  parentId: z.string().uuid("Некорректный ID комментария").optional(),
});

export const updateCommentSchema = z.object({
  id: z.string().uuid("Некорректный ID комментария"),
  content: z.string().min(1).max(5_000),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type UpdateCommentInput = z.infer<typeof updateCommentSchema>;
