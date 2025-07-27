import { z } from "zod";

const ToDoSchema = z.object({
  id: z.number(),
  text: z.string(),
  
});

export type ToDo = z.infer<typeof ToDoSchema>;

export const ToDosResponseSchema = z.array(ToDoSchema);

export type ToDosResponse = z.infer<typeof ToDosResponseSchema>;

export const ToDoResponseSchema = ToDoSchema;

export type ToDoResponse = z.infer<typeof ToDoResponseSchema>;

export const UpsertToDoSchema = z.object({
  text: z.string().min(1),
  
});

export type UpsertToDo = z.infer<typeof UpsertToDoSchema>;
