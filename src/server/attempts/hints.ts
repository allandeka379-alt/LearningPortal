import "server-only";
import { z } from "zod";
import { renderContent } from "@/server/content/render";
import { db } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { getQuestionsForAttempt, type AttemptQuestion } from "@/server/questions";
import { assertLearner, lockAttempt, parseInput, positionSchema, requireOwnAttempt, TX_OPTIONS, uuidSchema } from "./context";
import type { LearnerActor } from "./types";
import { withAttemptThrottle } from "./throttle";

/**
 * Hints (§10, §14): the student view only carries the NUMBER of hints; texts are revealed one at a time here and each
 * reveal is recorded on the answer (`hintsUsed`), which lowers its mastery credit (§11, progress/core: −10 % per hint)
 * and the "correct" classification after more than one hint. Hints exist in immediate-feedback modes only (never in
 * exam mode) and only before the question is answered.
 */

export interface RevealedHint {
  attemptId: string;
  position: number;
  /** 1-based number of this hint. */
  hintNumber: number;
  totalHints: number;
  /** Sanitised HTML of the hint (write-time cache, else rendered now). */
  html: string;
}

function cachedHintHtml(renderedHtml: unknown, index: number): string | null {
  if (typeof renderedHtml !== "object" || renderedHtml === null) return null;
  const hints = (renderedHtml as { hints?: unknown }).hints;
  if (!Array.isArray(hints)) return null;
  const value: unknown = hints[index];
  return typeof value === "string" ? value : null;
}

/** Sanitised HTML of hint `index` (0-based): the write-time cache, else rendered now. Null when there is no such hint. */
export function hintHtml(question: Pick<AttemptQuestion, "id" | "hints" | "renderedHtml">, index: number): string | null {
  const source = question.hints[index];
  if (source === undefined) return null;
  return cachedHintHtml(question.renderedHtml, index) ?? renderContent(source, { idPrefix: `h-${question.id.slice(0, 8)}-${index}-`, baseHeadingLevel: 3 }).html;
}

/** The hints a student has already revealed on a slot (`hintsUsed`), as sanitised HTML in order. */
export function revealedHintHtml(question: Pick<AttemptQuestion, "id" | "hints" | "renderedHtml"> | undefined, hintsUsed: number): string[] {
  if (!question || hintsUsed <= 0) return [];
  const out: string[] = [];
  for (let index = 0; index < Math.min(hintsUsed, question.hints.length); index += 1) {
    const html = hintHtml(question, index);
    if (html !== null) out.push(html);
  }
  return out;
}

/**
 * Reveals the next hint of a question in the student's practice attempt.
 *
 * @throws AppError NOT_FOUND | BAD_REQUEST (exam mode) | CONFLICT (attempt closed, already answered, no hints left)
 */
export async function revealHint(actor: LearnerActor, attemptId: string, position: number): Promise<RevealedHint> {
  assertLearner(actor);
  // Concurrency throttle before any lock or transaction (./throttle.ts; PAY-3).
  return withAttemptThrottle(actor.userId, "other", () => revealHintNow(actor, attemptId, position));
}

async function revealHintNow(actor: LearnerActor, attemptId: string, position: number): Promise<RevealedHint> {
  parseInput(z.object({ attemptId: uuidSchema, position: positionSchema }), { attemptId, position });
  return db.$transaction(async (tx) => {
    await lockAttempt(tx, attemptId);
    const context = await requireOwnAttempt(tx, actor, attemptId);
    if (context.feedback !== "IMMEDIATE") throw new AppError("BAD_REQUEST", "Hints are not available in exam mode.");
    if (context.status !== "IN_PROGRESS") throw AppError.conflict("This attempt has been submitted.");
    const key = { attemptId_position: { attemptId, position } };
    const slot = await tx.questionAttempt.findUnique({ where: key, select: { questionId: true, hintsUsed: true, markingStatus: true, markedAt: true } });
    if (!slot) throw AppError.notFound("Question not found in this attempt.");
    if (slot.markingStatus !== "PENDING" || slot.markedAt !== null) throw AppError.conflict("This question has already been answered.");
    const [question] = await getQuestionsForAttempt([slot.questionId], {
      client: tx,
      ...(context.enrollment ? { syllabusId: context.enrollment.syllabusId } : {}),
      ...(context.tenancy ? { tenancy: context.tenancy } : {}),
    });
    const index = slot.hintsUsed;
    const html = question ? hintHtml(question, index) : null;
    if (!question || html === null) throw AppError.conflict("There are no more hints for this question.");
    await tx.questionAttempt.update({ where: key, data: { hintsUsed: index + 1 } });
    return { attemptId, position, hintNumber: index + 1, totalHints: question.hints.length, html };
  }, TX_OPTIONS);
}
