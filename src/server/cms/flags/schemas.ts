import { z } from "zod";
import { FLAG_REASONS, MAX_FLAG_DETAILS } from "@/lib/content-flags";

// Reasons, labels and limits live in an isomorphic, dependency-free module (the learner form uses them on the client).
export { FLAG_REASONS, FLAG_REASON_LABELS, LEARNER_FLAG_REASON_LABELS, LEARNER_REPORT_REASONS, MAX_FLAG_DETAILS, type FlagReason } from "@/lib/content-flags";

/**
 * Validation for content quality flags (§42 "editors can flag: incorrect answer, ambiguous question, incorrect marking,
 * wrong topic, wrong difficulty", plus typo / copyright reports). Isomorphic: the student "Report a problem" form can
 * reuse the reasons and limits.
 */

export const FLAGGABLE_TYPES = ["LESSON", "QUESTION", "FLASHCARD", "ASSESSMENT"] as const;
export type FlaggableType = (typeof FLAGGABLE_TYPES)[number];

export const FLAG_STATUSES = ["OPEN", "IN_PROGRESS", "RESOLVED", "REJECTED"] as const;
export const FLAG_SOURCES = ["EDITOR", "STUDENT", "TEACHER", "SYSTEM"] as const;

export const FLAG_SOURCE_LABELS: Readonly<Record<(typeof FLAG_SOURCES)[number], string>> = {
  EDITOR: "Editor",
  STUDENT: "Student",
  TEACHER: "Teacher",
  SYSTEM: "Automatic check",
};

export const createFlagSchema = z.object({
  entityType: z.enum(FLAGGABLE_TYPES, { message: "This kind of content can't be reported." }),
  entityId: z.uuid("Choose the item to report."),
  reason: z.enum(FLAG_REASONS, { message: "Choose what is wrong." }),
  details: z.preprocess(
    (value) => (typeof value === "string" ? (value.trim() === "" ? null : value.trim()) : value ?? null),
    z.string().max(MAX_FLAG_DETAILS, `Keep the details under ${MAX_FLAG_DETAILS.toLocaleString("en")} characters.`).nullable(),
  ),
  /** The revision the reporter saw (defaults to the item's current revision). */
  revision: z.coerce.number().int().min(1).optional(),
  /** Where it was reported from. No answer text or personal data. */
  context: z
    .object({
      assessmentAttemptId: z.uuid().optional(),
      position: z.number().int().min(0).max(10_000).optional(),
      channel: z.enum(["web", "whatsapp", "api"]).optional(),
      partId: z.uuid().optional(),
    })
    .strict()
    .optional(),
});

export type CreateFlagInput = z.input<typeof createFlagSchema>;

export const flagFilterSchema = z.object({
  /** "open" = OPEN + IN_PROGRESS (the triage queue, oldest first). */
  status: z.enum(["open", ...FLAG_STATUSES, "all"]).default("open"),
  reason: z.enum(FLAG_REASONS).optional(),
  entityType: z.enum(FLAGGABLE_TYPES).optional(),
  /** Flags of one item (with `entityType`), e.g. from the editor's "open flags" link. */
  entityId: z.uuid().optional(),
  source: z.enum(FLAG_SOURCES).optional(),
  assigned: z.enum(["me", "unassigned"]).optional(),
  cursor: z.string().max(500).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(25),
});

const resolutionNote = z.preprocess(
  (value) => (typeof value === "string" ? value.trim() : value ?? ""),
  z.string().min(3, "Explain what was done (or why the report is rejected).").max(2_000, "Keep the note under 2,000 characters."),
);

export const triageFlagSchema = z.object({ flagId: z.uuid("Choose a flag.") });
export const resolveFlagSchema = z.object({ flagId: z.uuid("Choose a flag."), resolution: resolutionNote });
export const rejectFlagSchema = z.object({ flagId: z.uuid("Choose a flag."), resolution: resolutionNote });
