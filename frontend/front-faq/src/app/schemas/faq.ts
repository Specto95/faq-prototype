import { z } from "zod";

export const createFaqSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters"),
  answer: z.string().min(5, "Answer must be at least 5 characters"),
});

export const searchSchema = z.object({
  query: z.string().min(3, "Minimum 3 characters"),
});

export type InputCreateFAQ = z.infer<typeof createFaqSchema>;
export type InputSearch = z.infer<typeof searchSchema>;
