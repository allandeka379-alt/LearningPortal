import "server-only";
import { z } from "zod";
import type { ContentStatus } from "@/generated/prisma/client";
import { addDays, isLocalDate, localDateString, type LocalDate } from "@/lib/dates";
import { DEFAULT_TIMEZONE } from "@/lib/config";
import { db } from "@/server/db";
import { auditActorFields, auditInTx, type AuditRequestInfo } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import { enqueue } from "@/server/lib/jobs";
import { assertCmsPermission, infraActor, type CmsActor } from "./access";
import { CMS_AUDIT, CMS_AUDIT_OPERATIONS } from "./audit-actions";

/**
 * Data for the admin dashboard (§36) that is not analytics: the content workload a CONTENT_EDITOR sees instead of
 * the platform funnel (ARCHITECTURE §3.3: "CONTENT_EDITOR sees a content dashboard"), and the "fill the gaps" action
 * that enqueues `analytics.backfillMetrics` when nightly rollups are missing. Lives with the people services because
 * this workstream's service area is users / schools / announcements.
 */

type WorkloadStatus = Extract<ContentStatus, "DRAFT" | "IN_REVIEW" | "APPROVED">;

export interface ContentWorkloadRow {
  key: "lessons" | "questions" | "flashcards" | "assessments" | "studyPacks" | "studyPlanTemplates";
  label: string;
  href: string;
  /** Items authored by the viewer still in DRAFT. */
  myDrafts: number;
  inReview: number;
  approved: number;
}

export interface ContentWorkload {
  rows: ContentWorkloadRow[];
  totals: { myDrafts: number; inReview: number; approved: number };
  openFlags: number;
  flagsAssignedToMe: number;
}

/**
 * Counts for the editor dashboard: my drafts, the review queue and approved-but-unpublished items per content type,
 * plus open quality flags (§42). Platform content only (school / tutor-private items have their own owners).
 * Indexed: `(status, updatedAt)`, `(createdById, createdAt)` and ContentFlag `(status, createdAt)` /
 * `(assignedToId, status)`.
 */
export async function getContentWorkload(actor: CmsActor): Promise<ContentWorkload> {
  assertCmsPermission(actor, "content.draft", "all");
  const me = actor.userId;
  const platform = { schoolId: null, ownerUserId: null } as const;
  const count = async (
    model: "lesson" | "question" | "flashcard" | "assessment" | "studyPack" | "studyPlanTemplate",
    status: WorkloadStatus,
    mine: boolean,
  ): Promise<number> => {
    const where: Record<string, unknown> = { status, ...(mine ? { createdById: me } : {}) };
    switch (model) {
      case "lesson":
        return db.lesson.count({ where });
      case "question":
        return db.question.count({ where: { ...where, ...platform, parentId: null } });
      case "flashcard":
        return db.flashcard.count({ where: { ...where, ownerUserId: null } });
      case "assessment":
        return db.assessment.count({ where: { ...where, ...platform } });
      case "studyPack":
        return db.studyPack.count({ where });
      case "studyPlanTemplate":
        return db.studyPlanTemplate.count({ where });
    }
  };

  const types = [
    { key: "lessons", model: "lesson", label: "Lessons", href: "/admin/lessons" },
    { key: "questions", model: "question", label: "Questions", href: "/admin/questions" },
    { key: "flashcards", model: "flashcard", label: "Flashcards", href: "/admin/flashcards" },
    { key: "assessments", model: "assessment", label: "Exams & tests", href: "/admin/exams" },
    { key: "studyPacks", model: "studyPack", label: "Study packs", href: "/admin/study-packs" },
    { key: "studyPlanTemplates", model: "studyPlanTemplate", label: "Study plan templates", href: "/admin/study-packs" },
  ] as const;

  const [rows, openFlags, flagsAssignedToMe] = await Promise.all([
    Promise.all(
      types.map(async (type) => {
        const [myDrafts, inReview, approved] = await Promise.all([
          count(type.model, "DRAFT", true),
          count(type.model, "IN_REVIEW", false),
          count(type.model, "APPROVED", false),
        ]);
        return { key: type.key, label: type.label, href: type.href, myDrafts, inReview, approved } satisfies ContentWorkloadRow;
      }),
    ),
    db.contentFlag.count({ where: { status: { in: ["OPEN", "IN_PROGRESS"] } } }),
    db.contentFlag.count({ where: { assignedToId: me, status: { in: ["OPEN", "IN_PROGRESS"] } } }),
  ]);
  const totals = rows.reduce(
    (sum, row) => ({ myDrafts: sum.myDrafts + row.myDrafts, inReview: sum.inReview + row.inReview, approved: sum.approved + row.approved }),
    { myDrafts: 0, inReview: 0, approved: 0 },
  );
  return { rows, totals, openFlags, flagsAssignedToMe };
}

const backfillSchema = z
  .object({
    from: z.string().refine(isLocalDate, { message: "Use a date like 2026-10-01." }),
    to: z.string().refine(isLocalDate, { message: "Use a date like 2026-10-04." }),
  })
  .refine((range) => range.from <= range.to, { message: "`From` must be on or before `To`.", path: ["to"] });

export const BACKFILL_JOB_TYPE = "analytics.backfillMetrics";

/**
 * Enqueues `analytics.backfillMetrics` for missing rollup days (§35 coverage notice). Only days that have ENDED in
 * Africa/Harare can be computed, so `to` is clamped to yesterday; the range is at most 366 days. Deduplicated while
 * an identical job is pending; audited (the job itself is idempotent).
 */
export async function enqueueAnalyticsBackfill(
  actor: CmsActor,
  input: unknown,
  request?: AuditRequestInfo,
  options: { now?: Date } = {},
): Promise<{ jobId: string | null; created: boolean; from: LocalDate; to: LocalDate }> {
  assertCmsPermission(actor, "analytics.platform", "all");
  const parsed = backfillSchema.safeParse(input);
  if (!parsed.success) throw AppError.fromZod(parsed.error);
  const yesterday = addDays(localDateString(options.now ?? new Date(), DEFAULT_TIMEZONE), -1);
  const from = parsed.data.from;
  const to = parsed.data.to > yesterday ? yesterday : parsed.data.to;
  if (from > to) throw AppError.validation({ to: ["Only days that have already ended can be computed."] });
  const span = (Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86_400_000 + 1;
  if (span > 366) throw AppError.validation({ from: ["Backfill at most 366 days at a time."] });

  return db.$transaction(async (tx) => {
    const job = await enqueue(BACKFILL_JOB_TYPE, { from, to }, { client: tx, queue: "rollups", dedupeKey: `backfill:${from}:${to}`, maxAttempts: 2 });
    await auditInTx(tx, {
      ...auditActorFields(infraActor(actor)),
      action: CMS_AUDIT.JOB_ENQUEUE,
      entityType: "Job",
      entityId: job.id,
      metadata: { operation: CMS_AUDIT_OPERATIONS.analyticsBackfill, from, to, deduplicated: !job.created },
      request: request ?? null,
    });
    return { jobId: job.id, created: job.created, from, to };
  });
}
