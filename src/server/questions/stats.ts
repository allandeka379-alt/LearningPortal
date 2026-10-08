import "server-only";
import { z } from "zod";
import { Prisma } from "@/generated/prisma/client";
import type { DbClient } from "@/server/db";
import { AppError } from "@/server/lib/errors";

/**
 * Synchronous QuestionStats counters (§42 quality control; ARCHITECTURE §4.7). One atomic
 * `INSERT … ON CONFLICT ("questionId") DO UPDATE` per call, so concurrent answers never lose increments and the row is
 * created on first use. Call it in the same transaction as the QuestionAttempt write:
 *   - `presented`    when a QuestionAttempt slot is created;
 *   - `answered`     once the mark is FINAL (AUTO_MARKED, or the final AI / teacher mark) — never for provisional marks;
 *   - `needs_review` when an answer enters the review queue with a provisional mark;
 *   - `unanswered`   when an attempt closes with the slot unanswered.
 *
 * `answered` maintains answeredCount, correctCount (full marks), partialCount, first-exposure calibration counts
 * (`isRepeat = false`), marks / hints / time sums, lastAnsweredAt, the MCQ distractor counts (`optionCounts`, keyed by
 * QuestionOption.key) and the derived `facility` (Σ awarded / Σ available), `correctRate` and `avgTimeSeconds`.
 * `calibratedFacility`, `discrimination`, `empiricalDifficulty` and `suspectAnswerKey` need population statistics and
 * stay with the `questions.statsRollup` job (hourly window + weekly full recompute), which may also overwrite these
 * counters from the facts. Marks are clamped so the table's CHECKs (QuestionStats_counts_chk / _rates_chk) always hold.
 */

export type QuestionStatsOutcome =
  | { kind: "presented" }
  | { kind: "unanswered" }
  | { kind: "needs_review" }
  | {
      kind: "answered";
      marksAwarded: number;
      marksAvailable: number;
      /** The student had seen this question before (excluded from first-exposure calibration). */
      isRepeat: boolean;
      hintsUsed?: number;
      timeSpentSeconds?: number;
      /** MCQ option keys chosen (distractor analysis). */
      optionKeys?: readonly string[];
      answeredAt?: Date;
    };

export interface QuestionStatsCounters {
  presentedCount: number;
  answeredCount: number;
  correctCount: number;
  partialCount: number;
  unansweredCount: number;
  needsReviewCount: number;
  calibrationCount: number;
  calibrationCorrectCount: number;
  marksAwardedSum: number;
  marksAvailableSum: number;
  facility: number | null;
  correctRate: number | null;
  avgTimeSeconds: number | null;
  optionCounts: Record<string, number> | null;
}

const outcomeSchema = z.discriminatedUnion("kind", [
  z.strictObject({ kind: z.literal("presented") }),
  z.strictObject({ kind: z.literal("unanswered") }),
  z.strictObject({ kind: z.literal("needs_review") }),
  z.strictObject({
    kind: z.literal("answered"),
    marksAwarded: z.number().refine(Number.isFinite),
    marksAvailable: z.int().min(0).max(1_000),
    isRepeat: z.boolean(),
    hintsUsed: z.int().min(0).max(1_000).optional(),
    timeSpentSeconds: z.number().min(0).max(86_400).optional(),
    optionKeys: z.array(z.string().regex(/^[A-Za-z0-9]{1,8}$/)).max(26).optional(),
    answeredAt: z.date().optional(),
  }),
]);

interface CounterRow {
  presentedCount: number;
  answeredCount: number;
  correctCount: number;
  partialCount: number;
  unansweredCount: number;
  needsReviewCount: number;
  calibrationCount: number;
  calibrationCorrectCount: number;
  marksAwardedSum: bigint | number;
  marksAvailableSum: bigint | number;
  facility: number | null;
  correctRate: number | null;
  avgTimeSeconds: number | null;
  optionCounts: Record<string, number> | null;
}

const RETURNING = Prisma.sql`RETURNING "presentedCount", "answeredCount", "correctCount", "partialCount", "unansweredCount",
  "needsReviewCount", "calibrationCount", "calibrationCorrectCount", "marksAwardedSum", "marksAvailableSum", "facility",
  "correctRate", "avgTimeSeconds", "optionCounts"`;

function toCounters(row: CounterRow): QuestionStatsCounters {
  return { ...row, marksAwardedSum: Number(row.marksAwardedSum), marksAvailableSum: Number(row.marksAvailableSum) };
}

/** Upserts a single counter column (+1). `column` is one of a fixed set, never user input. */
function bump(column: "presentedCount" | "unansweredCount" | "needsReviewCount", questionId: string): Prisma.Sql {
  const col = Prisma.raw(`"${column}"`);
  return Prisma.sql`
    INSERT INTO "QuestionStats" ("questionId", "updatedAt", ${col})
    VALUES (${questionId}::uuid, now(), 1)
    ON CONFLICT ("questionId") DO UPDATE SET ${col} = "QuestionStats".${col} + 1, "updatedAt" = now()
    ${RETURNING}`;
}

/**
 * Applies one outcome to the question's stats row (see module header). Returns the counters after the update.
 * @throws AppError VALIDATION for an invalid outcome or question id.
 */
export async function updateQuestionStats(tx: DbClient, questionId: string, outcome: QuestionStatsOutcome): Promise<QuestionStatsCounters> {
  if (!z.uuid().safeParse(questionId).success) throw AppError.validation({ questionId: ["Invalid question id."] });
  const parsed = outcomeSchema.safeParse(outcome);
  if (!parsed.success) throw AppError.fromZod(parsed.error, "Invalid question stats outcome.");
  const o = parsed.data;

  if (o.kind !== "answered") {
    const column = o.kind === "presented" ? "presentedCount" : o.kind === "unanswered" ? "unansweredCount" : "needsReviewCount";
    const rows = await tx.$queryRaw<CounterRow[]>(bump(column, questionId));
    return toCounters(rows[0] as CounterRow);
  }

  const available = o.marksAvailable;
  const awarded = Math.min(available, Math.max(0, Math.round(o.marksAwarded)));
  const correct = available > 0 && awarded >= available ? 1 : 0;
  const partial = awarded > 0 && awarded < available ? 1 : 0;
  const calibration = o.isRepeat ? 0 : 1;
  const calibrationCorrect = o.isRepeat ? 0 : correct;
  const hints = o.hintsUsed ?? 0;
  const seconds = Math.round(o.timeSpentSeconds ?? 0);
  const answeredAt = o.answeredAt ?? new Date();
  const keys = [...new Set(o.optionKeys ?? [])];
  const optionCounts = keys.length > 0 ? JSON.stringify(Object.fromEntries(keys.map((k) => [k, 1]))) : null;

  const rows = await tx.$queryRaw<CounterRow[]>`
    INSERT INTO "QuestionStats" AS s (
      "questionId", "updatedAt", "lastAnsweredAt", "answeredCount", "correctCount", "partialCount",
      "calibrationCount", "calibrationCorrectCount", "hintsUsedSum", "marksAwardedSum", "marksAvailableSum",
      "timeSpentSecondsSum", "optionCounts", "facility", "correctRate", "avgTimeSeconds")
    VALUES (
      ${questionId}::uuid, now(), ${answeredAt}, 1, ${correct}, ${partial},
      ${calibration}, ${calibrationCorrect}, ${hints}, ${awarded}::bigint, ${available}::bigint,
      ${seconds}::bigint, ${optionCounts}::jsonb,
      CASE WHEN ${available}::bigint > 0 THEN ${awarded}::float8 / ${available}::float8 END,
      ${correct}::float8, ${seconds}::float8)
    ON CONFLICT ("questionId") DO UPDATE SET
      "updatedAt" = now(),
      "lastAnsweredAt" = GREATEST(s."lastAnsweredAt", EXCLUDED."lastAnsweredAt"),
      "answeredCount" = s."answeredCount" + 1,
      "correctCount" = s."correctCount" + EXCLUDED."correctCount",
      "partialCount" = s."partialCount" + EXCLUDED."partialCount",
      "calibrationCount" = s."calibrationCount" + EXCLUDED."calibrationCount",
      "calibrationCorrectCount" = s."calibrationCorrectCount" + EXCLUDED."calibrationCorrectCount",
      "hintsUsedSum" = s."hintsUsedSum" + EXCLUDED."hintsUsedSum",
      "marksAwardedSum" = s."marksAwardedSum" + EXCLUDED."marksAwardedSum",
      "marksAvailableSum" = s."marksAvailableSum" + EXCLUDED."marksAvailableSum",
      "timeSpentSecondsSum" = s."timeSpentSecondsSum" + EXCLUDED."timeSpentSecondsSum",
      "optionCounts" = CASE
        WHEN EXCLUDED."optionCounts" IS NULL THEN s."optionCounts"
        ELSE COALESCE(s."optionCounts", '{}'::jsonb) || (
          SELECT jsonb_object_agg(e.key, COALESCE((s."optionCounts" ->> e.key)::bigint, 0) + e.value::bigint)
          FROM jsonb_each_text(EXCLUDED."optionCounts") AS e)
      END,
      "facility" = CASE WHEN s."marksAvailableSum" + EXCLUDED."marksAvailableSum" > 0
        THEN (s."marksAwardedSum" + EXCLUDED."marksAwardedSum")::float8 / (s."marksAvailableSum" + EXCLUDED."marksAvailableSum")::float8
        ELSE s."facility" END,
      "correctRate" = (s."correctCount" + EXCLUDED."correctCount")::float8 / (s."answeredCount" + 1)::float8,
      "avgTimeSeconds" = (s."timeSpentSecondsSum" + EXCLUDED."timeSpentSecondsSum")::float8 / (s."answeredCount" + 1)::float8
    ${RETURNING}`;
  return toCounters(rows[0] as CounterRow);
}
