import { describe, expect, it } from "vitest";
import type { Role } from "@/generated/prisma/client";
import { addDays } from "@/lib/dates";
import { db } from "@/server/db";
import { cancelJob } from "@/server/lib/jobs";
import { createUser } from "../../../../tests/factories/index";
import type { CmsActor } from "./access";
import { enqueueAnalyticsBackfill, getContentWorkload } from "./dashboard";

function actorFor(userId: string, roles: Role[]): CmsActor {
  return { kind: "user", userId, roles };
}

describe("getContentWorkload", () => {
  it("is available to content staff and returns counts per content type", async () => {
    const { user } = await createUser({ roles: ["CONTENT_EDITOR"] });
    const workload = await getContentWorkload(actorFor(user.id, ["CONTENT_EDITOR"]));
    expect(workload.rows.map((row) => row.key)).toEqual(["lessons", "questions", "flashcards", "assessments", "studyPacks", "studyPlanTemplates"]);
    // A brand-new editor has no drafts of their own.
    expect(workload.totals.myDrafts).toBe(0);
    expect(workload.flagsAssignedToMe).toBe(0);
    for (const row of workload.rows) {
      expect(row.inReview).toBeGreaterThanOrEqual(0);
      expect(row.approved).toBeGreaterThanOrEqual(0);
    }
  });

  it("refuses non-staff", async () => {
    const { user } = await createUser({ roles: ["TEACHER"] });
    await expect(getContentWorkload(actorFor(user.id, ["TEACHER"]))).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});

describe("enqueueAnalyticsBackfill", () => {
  const now = new Date("2026-10-05T10:00:00Z");

  it("enqueues a deduplicated rollups job clamped to yesterday and audits it", async () => {
    const { user } = await createUser({ roles: ["ADMIN"] });
    const actor = actorFor(user.id, ["ADMIN"]);
    // A random start within the last year, so concurrent runs rarely share a dedupe key (handled below if they do).
    const from = addDays("2026-10-04", -Math.floor(Math.random() * 300));
    const result = await enqueueAnalyticsBackfill(actor, { from, to: "2026-12-31" }, undefined, { now });
    expect(result.to).toBe("2026-10-04");
    expect(result.from).toBe(from);
    if (result.created) {
      const job = await db.job.findUniqueOrThrow({ where: { id: result.jobId! } });
      expect(job).toMatchObject({ type: "analytics.backfillMetrics", queue: "rollups", status: "PENDING", dedupeKey: `backfill:${from}:2026-10-04` });
      expect(job.payload).toEqual({ from, to: "2026-10-04" });
    }
    const again = await enqueueAnalyticsBackfill(actor, { from, to: "2026-10-04" }, undefined, { now });
    expect(again.created).toBe(false);
    const entries = await db.auditLog.findMany({ where: { actorUserId: user.id, action: "job.enqueue" } });
    expect(entries).toHaveLength(2);
    expect(entries[0]?.metadata).toMatchObject({ operation: "job.enqueue.analytics_backfill" });

    // Clean up our own pending job so the worker never picks up a multi-year backfill from a test run.
    if (result.jobId && result.created) await cancelJob(result.jobId);
  });

  it("rejects future-only and over-long ranges, and non-admins", async () => {
    const { user } = await createUser({ roles: ["ADMIN"] });
    const { user: editor } = await createUser({ roles: ["CONTENT_EDITOR"] });
    const actor = actorFor(user.id, ["ADMIN"]);
    await expect(enqueueAnalyticsBackfill(actor, { from: "2026-10-05", to: "2026-10-09" }, undefined, { now })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(enqueueAnalyticsBackfill(actor, { from: "2024-01-01", to: "2026-01-01" }, undefined, { now })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(enqueueAnalyticsBackfill(actor, { from: "nope", to: "2026-01-01" }, undefined, { now })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(enqueueAnalyticsBackfill(actorFor(editor.id, ["CONTENT_EDITOR"]), { from: "2026-10-01", to: "2026-10-02" }, undefined, { now })).rejects.toMatchObject({
      code: "FORBIDDEN",
    });
  });
});
