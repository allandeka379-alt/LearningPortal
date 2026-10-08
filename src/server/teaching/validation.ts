import type { z } from "zod";
import { AppError } from "@/server/lib/errors";

/** Parses service input with a Zod schema; failures become `AppError` VALIDATION with field errors (CLAUDE.md rule 4). */
export function parseWith<S extends z.ZodType>(schema: S, input: unknown): z.output<S> {
  const result = schema.safeParse(input);
  if (!result.success) throw AppError.fromZod(result.error);
  return result.data;
}
