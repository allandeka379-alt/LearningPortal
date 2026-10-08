import { z } from "zod";
import { MASTERY_BAND_LABELS, MASTERY_BANDS } from "@/lib/mastery-band";
import { scrubString } from "@/server/lib/logger";

/**
 * Compact, PII-free student context for the tutor prompt (§14 "knows the student's board, qualification, subject,
 * current topic, performance, weak areas"; §39/§40 data minimisation; ARCHITECTURE §6.3 step 5, §5.12).
 *
 * Only whitelisted curriculum fields are accepted (unknown keys such as names, emails, phone numbers or schools are
 * dropped by the schema and never reach the model). Free-text fields are flattened to one line, stripped of markup,
 * and scrubbed of email addresses, phone numbers and long digit runs. The output has a hard length cap, contains no
 * timestamps or ids, and is deterministic for the same input, so it can be frozen per conversation
 * (`AiConversation.contextSnapshot`) and cached as its own prompt block.
 *
 * `recentMistakes` must be SYSTEM-derived (topic + misconception label from marking), never the student's own words.
 */

export const STUDENT_CONTEXT_MAX_CHARS = 1_000;
export const MAX_RECENT_MISTAKES = 3;

const LIMITS = {
  board: 40,
  qualification: 40,
  subject: 80,
  topic: 120,
  targetGrade: 12,
  mistakeTopic: 80,
  mistakeSummary: 160,
} as const;

// Generous bound (work limit only); fields are truncated, never rejected, for normal lengths.
const text = z.string().max(100_000);

export const studentContextInputSchema = z.object({
  board: text,
  qualification: text,
  subject: text.optional(),
  topic: text.optional(),
  masteryBand: z.enum(MASTERY_BANDS).optional(),
  recentMistakes: z.array(z.object({ topic: text, summary: text })).optional(),
  targetGrade: text.optional(),
  /** Whole days until the student's next exam in this subject (negative or absent = not shown). */
  examDaysLeft: z.number().int().optional(),
});

export type StudentContextInput = z.input<typeof studentContextInputSchema>;

/** Collapses whitespace, removes markup characters, masks contact details and caps the length. */
export function sanitizeContextText(value: string, max: number): string {
  const flattened = scrubString(value)
    .replace(/[<>{}`|\\]/g, " ")
    // Phone numbers without "+" and other runs of 7+ digits (ids, account numbers); "2 - 3 - 4" style maths survives.
    .replace(/(?:\d[\s-]?){6,}\d/g, "[number]")
    .replace(/\s+/g, " ")
    .trim();
  if (flattened.length <= max) return flattened;
  return `${flattened.slice(0, Math.max(0, max - 1)).trimEnd()}…`;
}

/**
 * Builds the `<student_context>` prompt block. Returns "" when nothing usable remains.
 *
 * @example buildStudentContext({ board: "ZIMSEC", qualification: "O-Level", subject: "Mathematics" })
 */
export function buildStudentContext(input: StudentContextInput): string {
  const parsed = studentContextInputSchema.parse(input);
  const lines: string[] = [];
  const add = (label: string, value: string | undefined, max: number): void => {
    if (value === undefined) return;
    const clean = sanitizeContextText(value, max);
    if (clean) lines.push(`${label}: ${clean}`);
  };
  add("Exam board", parsed.board, LIMITS.board);
  add("Qualification", parsed.qualification, LIMITS.qualification);
  add("Subject", parsed.subject, LIMITS.subject);
  add("Current topic", parsed.topic, LIMITS.topic);
  if (parsed.masteryBand) lines.push(`Mastery of current topic: ${MASTERY_BAND_LABELS[parsed.masteryBand]}`);
  add("Target grade", parsed.targetGrade, LIMITS.targetGrade);
  if (parsed.examDaysLeft !== undefined && parsed.examDaysLeft >= 0) {
    lines.push(`Days until exam: ${Math.min(parsed.examDaysLeft, 9_999)}`);
  }
  const mistakes = (parsed.recentMistakes ?? [])
    .slice(0, MAX_RECENT_MISTAKES)
    .map((mistake) => ({
      topic: sanitizeContextText(mistake.topic, LIMITS.mistakeTopic),
      summary: sanitizeContextText(mistake.summary, LIMITS.mistakeSummary),
    }))
    .filter((mistake) => mistake.summary.length > 0);
  if (mistakes.length > 0) {
    lines.push("Recent mistakes (most recent first):");
    for (const mistake of mistakes) lines.push(`- ${mistake.topic ? `${mistake.topic}: ` : ""}${mistake.summary}`);
  }
  if (lines.length === 0) return "";

  const open = "<student_context>";
  const close = "</student_context>";
  const budget = STUDENT_CONTEXT_MAX_CHARS - open.length - close.length - 2;
  let body = "";
  for (const line of lines) {
    const next = body ? `${body}\n${line}` : line;
    if (next.length > budget) break;
    body = next;
  }
  return `${open}\n${body}\n${close}`;
}

/**
 * The `AiConversation.contextSnapshot` JSON (schema doc: version 1) for the same input, so a conversation can rebuild
 * a byte-identical context block on every turn. `builtAt` is metadata only and never enters the prompt.
 */
export type ContextSnapshotV1 = {
  version: 1;
  board: string;
  qualification: string;
  subject?: string;
  topic?: string;
  masteryBand?: (typeof MASTERY_BANDS)[number];
  recentMistakes?: { topic: string; summary: string }[];
  targetGrade?: string;
  daysToExam?: number;
  builtAt: string;
};

export function toContextSnapshot(input: StudentContextInput, builtAt: Date): ContextSnapshotV1 {
  const parsed = studentContextInputSchema.parse(input);
  return {
    version: 1,
    board: sanitizeContextText(parsed.board, LIMITS.board),
    qualification: sanitizeContextText(parsed.qualification, LIMITS.qualification),
    ...(parsed.subject ? { subject: sanitizeContextText(parsed.subject, LIMITS.subject) } : {}),
    ...(parsed.topic ? { topic: sanitizeContextText(parsed.topic, LIMITS.topic) } : {}),
    ...(parsed.masteryBand ? { masteryBand: parsed.masteryBand } : {}),
    ...(parsed.recentMistakes?.length
      ? {
          recentMistakes: parsed.recentMistakes.slice(0, MAX_RECENT_MISTAKES).map((mistake) => ({
            topic: sanitizeContextText(mistake.topic, LIMITS.mistakeTopic),
            summary: sanitizeContextText(mistake.summary, LIMITS.mistakeSummary),
          })),
        }
      : {}),
    ...(parsed.targetGrade ? { targetGrade: sanitizeContextText(parsed.targetGrade, LIMITS.targetGrade) } : {}),
    ...(parsed.examDaysLeft !== undefined && parsed.examDaysLeft >= 0 ? { daysToExam: parsed.examDaysLeft } : {}),
    builtAt: builtAt.toISOString(),
  };
}

/** Reads a stored `contextSnapshot` back into builder input (unknown / invalid snapshots yield null). */
export function contextInputFromSnapshot(snapshot: unknown): StudentContextInput | null {
  const parsed = z
    .object({
      version: z.literal(1),
      board: z.string(),
      qualification: z.string(),
      subject: z.string().optional(),
      topic: z.string().optional(),
      masteryBand: z.enum(MASTERY_BANDS).optional(),
      recentMistakes: z.array(z.object({ topic: z.string(), summary: z.string() })).optional(),
      targetGrade: z.string().optional(),
      daysToExam: z.number().int().optional(),
    })
    .safeParse(snapshot);
  if (!parsed.success) return null;
  const { board, qualification, subject, topic, masteryBand, recentMistakes, targetGrade, daysToExam } = parsed.data;
  return {
    board,
    qualification,
    ...(subject === undefined ? {} : { subject }),
    ...(topic === undefined ? {} : { topic }),
    ...(masteryBand === undefined ? {} : { masteryBand }),
    ...(recentMistakes === undefined ? {} : { recentMistakes }),
    ...(targetGrade === undefined ? {} : { targetGrade }),
    ...(daysToExam === undefined ? {} : { examDaysLeft: daysToExam }),
  };
}
