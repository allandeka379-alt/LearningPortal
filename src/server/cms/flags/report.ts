import "server-only";
import { z } from "zod";
import { db, type DbClient } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { FLAG_REASONS, MAX_FLAG_DETAILS, type LearnerReportableType } from "@/lib/content-flags";
import { createContentFlag, type FlagActor } from "./service";

/**
 * Student / teacher "Report a problem" (§42) from the learning UI: question feedback, answer review and lesson pages.
 * A thin wrapper over {@link createContentFlag} (permission `content.flag`, `rateLimits.contentFlag`, duplicate merge)
 * that records WHICH revision the reporter saw: for a question answered in an attempt, the revision is read from the
 * reporter's OWN QuestionAttempt (never trusted from the client), and the attempt / position go into the flag context
 * so editors can find the exact paper. Nothing about the reporter beyond their role reaches editors.
 */

/** Content a learner can report from the learning UI. */
export const REPORTABLE_TYPES = ["QUESTION", "LESSON", "FLASHCARD"] as const satisfies readonly LearnerReportableType[];

export const reportProblemSchema = z.object({
  entityType: z.enum(REPORTABLE_TYPES, { message: "This can't be reported." }),
  entityId: z.uuid("Choose the item to report."),
  reason: z.enum(FLAG_REASONS, { message: "Choose what is wrong." }),
  details: z.preprocess(
    (value) => (typeof value === "string" ? (value.trim() === "" ? null : value.trim()) : (value ?? null)),
    z.string().max(MAX_FLAG_DETAILS, `Keep the details under ${MAX_FLAG_DETAILS.toLocaleString("en")} characters.`).nullable(),
  ),
  /** The attempt the question was answered in (the reporter's own; ignored otherwise). */
  attemptId: z.uuid().optional(),
  /** 1-based position of the question in that attempt. */
  position: z.int().min(1).max(10_000).optional(),
});

/** What the learning UI sends (validated by {@link reportProblemSchema}). */
export interface ReportProblemInput {
  entityType: LearnerReportableType;
  entityId: string;
  reason: (typeof FLAG_REASONS)[number];
  details?: string | null;
  attemptId?: string;
  position?: number;
}

/**
 * Files the report. Resolves `{ received: true }` both for a new report and for a repeat of an open one (merged), so
 * the learner always sees the same calm confirmation.
 *
 * @throws AppError FORBIDDEN | VALIDATION | NOT_FOUND | RATE_LIMITED
 */
export async function reportContentProblem(actor: FlagActor, raw: unknown, options: { client?: DbClient } = {}): Promise<{ received: true }> {
  const parsed = reportProblemSchema.safeParse(raw);
  if (!parsed.success) throw AppError.fromZod(parsed.error, parsed.error.issues[0]?.message);
  const input = parsed.data;
  const client = options.client ?? db;

  let revision: number | undefined;
  let attemptContext: { assessmentAttemptId: string; position: number } | undefined;
  if (input.entityType === "QUESTION" && input.attemptId && input.position !== undefined) {
    // Own answers only: userId is part of the filter, so another learner's attempt id is silently ignored.
    const answered = await client.questionAttempt.findFirst({
      where: { attemptId: input.attemptId, position: input.position, userId: actor.userId },
      select: { questionId: true, questionRevision: true },
    });
    if (answered && answered.questionId === input.entityId) {
      revision = answered.questionRevision;
      attemptContext = { assessmentAttemptId: input.attemptId, position: input.position };
    }
  }

  await createContentFlag(
    actor,
    {
      entityType: input.entityType,
      entityId: input.entityId,
      reason: input.reason,
      details: input.details,
      ...(revision !== undefined ? { revision } : {}),
      context: { channel: "web", ...attemptContext },
    },
    { client },
  );
  return { received: true };
}
