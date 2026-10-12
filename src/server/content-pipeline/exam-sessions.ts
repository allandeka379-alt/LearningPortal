import "server-only";
import { readFileSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import { createExamSession, setExamSessionStatus, updateExamSession } from "@/server/cms/curriculum/exam-sessions";
import { db } from "@/server/db";
import { resolveApprover, SYSTEM_APPROVER } from "./accounts";

/**
 * Exam sessions from `content/exam-sessions.json` (owner request 2026-10-12: countdowns in production). Each entry is
 * created through the CMS service (audited), kept in sync while it is still PROVISIONAL, and PUBLISHED so students can
 * target it. A session an admin has confirmed against the official timetable (`isProvisional = false`) is never
 * touched again: the CMS owns it from then on. Idempotent.
 */

const entrySchema = z.strictObject({
  board: z.string().min(1),
  qualification: z.string().min(1),
  seriesCode: z.string().min(2),
  name: z.string().min(1),
  year: z.number().int(),
  startsOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endsOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  sourceUrl: z.url().optional(),
  notes: z.string().max(2000).optional(),
});
const fileSchema = z.object({ $comment: z.string().optional(), sessions: z.array(entrySchema) });
export type ExamSessionEntry = z.infer<typeof entrySchema>;

export interface ExamSessionSyncOutcome {
  key: string;
  outcome: "created" | "updated" | "published" | "unchanged" | "confirmed (left alone)" | "error";
  message?: string;
}

export function loadExamSessionFile(repoRoot: string): ExamSessionEntry[] {
  const file = path.join(repoRoot, "content", "exam-sessions.json");
  return fileSchema.parse(JSON.parse(readFileSync(file, "utf8"))).sessions;
}

const isoDay = (date: Date) => date.toISOString().slice(0, 10);

/** Creates / updates / publishes the sessions as `approverEmail` ("system" = the system publisher). */
export async function syncExamSessions(entries: readonly ExamSessionEntry[], options: { approverEmail?: string; dryRun?: boolean } = {}): Promise<ExamSessionSyncOutcome[]> {
  const approver = await resolveApprover(db, options.approverEmail ?? SYSTEM_APPROVER, { needAdmin: true });
  const actor = { kind: "user" as const, userId: approver.actor.userId, roles: approver.actor.roles };
  const outcomes: ExamSessionSyncOutcome[] = [];
  for (const entry of entries) {
    const key = `${entry.board}/${entry.qualification}/${entry.seriesCode}`;
    try {
      const qualification = await db.qualification.findFirst({
        where: { slug: entry.qualification, examBoard: { slug: entry.board } },
        select: { id: true },
      });
      if (!qualification) {
        outcomes.push({ key, outcome: "error", message: "qualification not found" });
        continue;
      }
      const fields = {
        name: entry.name,
        seriesCode: entry.seriesCode,
        year: entry.year,
        startsOn: entry.startsOn,
        endsOn: entry.endsOn,
        sourceUrl: entry.sourceUrl ?? "",
        notes: entry.notes ?? "",
      };
      const existing = await db.examSession.findUnique({
        where: { qualificationId_seriesCode: { qualificationId: qualification.id, seriesCode: entry.seriesCode.toUpperCase() } },
        select: { id: true, status: true, isProvisional: true, name: true, startsOn: true, endsOn: true, sourceUrl: true, notes: true },
      });
      if (options.dryRun) {
        outcomes.push({ key, outcome: existing ? "unchanged" : "created", message: "dry run" });
        continue;
      }
      let id: string;
      let outcome: ExamSessionSyncOutcome["outcome"] = "unchanged";
      if (!existing) {
        id = (await createExamSession(actor, { qualificationId: qualification.id, ...fields })).id;
        outcome = "created";
      } else if (!existing.isProvisional) {
        outcomes.push({ key, outcome: "confirmed (left alone)" });
        continue;
      } else {
        id = existing.id;
        const differs =
          existing.name !== entry.name ||
          isoDay(existing.startsOn) !== entry.startsOn ||
          isoDay(existing.endsOn) !== entry.endsOn ||
          (existing.sourceUrl ?? "") !== (entry.sourceUrl ?? "") ||
          (existing.notes ?? "") !== (entry.notes ?? "");
        if (differs) {
          await updateExamSession(actor, { id, ...fields });
          outcome = "updated";
        }
      }
      const status = existing && outcome !== "created" ? existing.status : "DRAFT";
      if (status === "DRAFT") {
        await setExamSessionStatus(actor, { id, status: "PUBLISHED" });
        if (outcome === "unchanged") outcome = "published";
      }
      outcomes.push({ key, outcome });
    } catch (error) {
      outcomes.push({ key, outcome: "error", message: error instanceof Error ? error.message : String(error) });
    }
  }
  return outcomes;
}
