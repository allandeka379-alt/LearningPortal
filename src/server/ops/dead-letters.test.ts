import { randomUUID } from "node:crypto";
import { beforeAll, describe, expect, it } from "vitest";
import type { JobStatus } from "@/generated/prisma/client";
import { db } from "@/server/db";
import { createUser } from "../../../tests/factories/identity";
import { cancelDeadLetterJob, getDeadLetterSummary, listDeadLetterJobs, retryDeadLetterJob, type OpsActor } from "./dead-letters";

/** /admin/jobs service against Postgres. Every job uses a type unique to this run, and filters on it. */

const TYPE = `testdl${randomUUID().replace(/-/g, "").slice(0, 12)}.run`;
let admin: OpsActor;
let superAdmin: OpsActor;
let editor: OpsActor;

async function job(status: JobStatus, options: { minutesAgo?: number; dedupeKey?: string; type?: string } = {}): Promise<string> {
  const completedAt = status === "PENDING" ? null : new Date(Date.now() - (options.minutesAgo ?? 1) * 60_000);
  const row = await db.job.create({
    data: {
      // A queue no worker serves: other test files that process "default" never claim these rows.
      queue: "testdl",
      type: options.type ?? TYPE,
      payload: { userId: randomUUID() },
      status,
      attempts: status === "DEAD" ? 5 : 1,
      maxAttempts: 5,
      lastError: status === "PENDING" ? null : `Error: boom ${status}`,
      completedAt,
      dedupeKey: options.dedupeKey ?? null,
    },
    select: { id: true },
  });
  return row.id;
}

beforeAll(async () => {
  admin = { userId: (await createUser({ roles: ["ADMIN"] })).user.id, roles: ["ADMIN"] };
  superAdmin = { userId: (await createUser({ roles: ["SUPER_ADMIN"] })).user.id, roles: ["SUPER_ADMIN"] };
  editor = { userId: (await createUser({ roles: ["CONTENT_EDITOR"] })).user.id, roles: ["CONTENT_EDITOR"] };
});

describe("dead-letter jobs (/admin/jobs)", () => {
  it("lists DEAD and FAILED jobs newest failure first, with cursor pages and filters, never other statuses", async () => {
    const older = await job("DEAD", { minutesAgo: 30 });
    const newer = await job("FAILED", { minutesAgo: 5 });
    const newest = await job("DEAD", { minutesAgo: 1 });
    await job("PENDING");
    await job("SUCCEEDED");

    const first = await listDeadLetterJobs(admin, { type: TYPE, limit: 2 });
    expect(first.items.map((item) => item.id)).toEqual([newest, newer]);
    expect(first.items[0]).toMatchObject({ type: TYPE, queue: "testdl", status: "DEAD", attempts: 5, maxAttempts: 5, lastError: "Error: boom DEAD" });
    expect(first.nextCursor).not.toBeNull();
    const second = await listDeadLetterJobs(admin, { type: TYPE, limit: 2, cursor: first.nextCursor! });
    expect(second.items.map((item) => item.id)).toEqual([older]);
    expect(second.nextCursor).toBeNull();

    expect((await listDeadLetterJobs(admin, { type: TYPE, status: "FAILED" })).items.map((item) => item.id)).toEqual([newer]);
    expect((await listDeadLetterJobs(superAdmin, { type: `${TYPE.split(".")[0]}.` })).items).toHaveLength(3);
    await expect(listDeadLetterJobs(admin, { type: "bad type!" })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(listDeadLetterJobs(admin, { cursor: "garbage" })).rejects.toMatchObject({ code: "BAD_REQUEST" });

    const summary = await getDeadLetterSummary(admin);
    expect(summary.dead).toBeGreaterThanOrEqual(2);
    expect(summary.failed).toBeGreaterThanOrEqual(1);
  });

  it("retries with a fresh attempt budget and cancels, both audited", async () => {
    const dead = await job("DEAD");
    const retried = await retryDeadLetterJob(admin, dead, { request: { requestId: "req-retry", ip: "10.0.0.1", userAgent: "vitest" } });
    expect(retried).toEqual({ id: dead, type: TYPE });
    const row = await db.job.findUniqueOrThrow({ where: { id: dead } });
    expect(row).toMatchObject({ status: "PENDING", attempts: 0, completedAt: null, lockedAt: null, lockedBy: null });
    expect(row.runAt.getTime()).toBeLessThanOrEqual(Date.now() + 5_000);
    // Retrying again is refused: it is no longer a dead letter.
    await expect(retryDeadLetterJob(admin, dead)).rejects.toMatchObject({ code: "CONFLICT" });
    await db.job.update({ where: { id: dead }, data: { status: "CANCELLED", completedAt: new Date() } }); // keep the queue clean of our PENDING row

    const failed = await job("FAILED");
    await cancelDeadLetterJob(superAdmin, failed);
    expect((await db.job.findUniqueOrThrow({ where: { id: failed } })).status).toBe("CANCELLED");
    await expect(cancelDeadLetterJob(admin, failed)).rejects.toMatchObject({ code: "CONFLICT" });

    const audits = await db.auditLog.findMany({ where: { entityType: "Job", entityId: { in: [dead, failed] } }, orderBy: { createdAt: "asc" } });
    expect(audits.map((entry) => [entry.action, entry.entityId, entry.actorUserId])).toEqual([
      ["job.retry", dead, admin.userId],
      ["job.cancel", failed, superAdmin.userId],
    ]);
    expect(audits[0]!.metadata).toMatchObject({ type: TYPE, previousStatus: "DEAD", attempts: 5, maxAttempts: 5 });
    expect(audits[0]!.requestId).toBe("req-retry");
  });

  it("refuses a retry while an identical job is queued, and non-admins entirely", async () => {
    const key = `testdl:${randomUUID()}`;
    const dead = await job("DEAD", { dedupeKey: key });
    const pending = await job("PENDING", { dedupeKey: key });
    await expect(retryDeadLetterJob(admin, dead)).rejects.toMatchObject({ code: "CONFLICT" });
    expect((await db.job.findUniqueOrThrow({ where: { id: dead } })).status).toBe("DEAD");
    expect(await db.auditLog.count({ where: { entityType: "Job", entityId: dead } })).toBe(0);
    await db.job.update({ where: { id: pending }, data: { status: "CANCELLED", completedAt: new Date() } });

    await expect(listDeadLetterJobs(editor, { type: TYPE })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(retryDeadLetterJob(editor, dead)).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(cancelDeadLetterJob({ userId: editor.userId, roles: ["TEACHER"] }, dead)).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(retryDeadLetterJob(admin, "nope")).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(retryDeadLetterJob(admin, randomUUID())).rejects.toMatchObject({ code: "NOT_FOUND" });
  });
});
