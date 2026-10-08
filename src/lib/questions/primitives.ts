/**
 * Zod building blocks shared by the payload, answer-spec and response schemas.
 */
import { z } from "zod";
import { QUESTION_LIMITS } from "./constants";

/** Authoring id of a blank, matching item, hotspot, label or mark-scheme point: `b1`, `left-2`, `P1`, `M1`… */
export const authoringIdSchema = z
  .string()
  .regex(/^[A-Za-z0-9][A-Za-z0-9_.-]*$/, "Use letters, digits, '-', '_' or '.' (starting with a letter or digit).")
  .max(QUESTION_LIMITS.idLength);

/** QuestionOption.key ("A".."E"; VARCHAR(8), stable across revisions). */
export const optionKeySchema = z
  .string()
  .regex(/^[A-Za-z0-9]+$/, "Option keys are letters or digits, e.g. A, B, C.")
  .max(QUESTION_LIMITS.optionKeyLength);

/** Non-blank authored answer text (accepted answers, keywords, label texts). */
export const answerTextSchema = z
  .string()
  .max(QUESTION_LIMITS.answerTextLength)
  .refine((value) => value.trim() !== "", "Must not be blank.");

/** Short authored markdown (matching items, word-bank labels). */
export const fragmentSchema = z
  .string()
  .max(QUESTION_LIMITS.fragmentLength)
  .refine((value) => value.trim() !== "", "Must not be blank.");

/** Long authored markdown (marking notes, model answers). */
export const notesSchema = z.string().max(QUESTION_LIMITS.notesLength);

/** Whole marks for one item or point (QuestionAttempt marks are SMALLINT). */
export const positiveMarksSchema = z.int().min(1).max(QUESTION_LIMITS.maxMarks);
/** Whole marks that may be zero (penalties). */
export const nonNegativeMarksSchema = z.int().min(0).max(QUESTION_LIMITS.maxMarks);

/** A finite number (JSON cannot carry NaN/Infinity, but parsed objects from code can). */
export const finiteNumberSchema = z.number().refine(Number.isFinite, "Must be a finite number.");

/** True when every element of `values` (mapped by `key`) is distinct. */
export function allDistinct<T>(values: readonly T[], key: (value: T) => string): boolean {
  const seen = new Set<string>();
  for (const value of values) {
    const k = key(value);
    if (seen.has(k)) return false;
    seen.add(k);
  }
  return true;
}

/**
 * Wraps an object schema so that a stored JSON `null` (or a missing value) parses as `{}` — for types whose payload /
 * answer spec is optional and whose fields all have defaults or are optional.
 */
export function nullAsEmpty<T extends z.ZodType>(schema: T) {
  return z.preprocess((value) => (value === null || value === undefined ? {} : value), schema);
}
