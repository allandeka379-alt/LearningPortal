import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { grantGuardianConsent } from "@/server/family/consent";
import { revokeLink } from "@/server/family/links";
import { withUserContext } from "@/server/lib/db-context";
import { isAppError } from "@/server/lib/errors";
import { LocalDriver } from "@/server/lib/storage";
import { createParent, createStudent, linkParent } from "../../../tests/factories/index";
import {
  cancelChildAccountDeletion,
  getChildPrivacyOverview,
  guardianPrivacyAuthority,
  openChildDataExport,
  requestChildAccountDeletion,
  requestChildDataExport,
  type GuardianActor,
} from "./guardian-privacy";
import {
  cancelAccountDeletion,
  DELETION_GRACE_DAYS,
  getPrivacyOverview,
  openDataExport,
  requestAccountDeletion,
  requestDataExport,
  runDataExport,
  type PrivacyActor,
} from "./privacy";

/**
 * PRIV-02 (guardian path): a minor's parent or legal guardian can ask for a copy of the child's data and for the
 * child's account to be deleted; the child is told every time, can still cancel a deletion, and a guardian's copy never
 * contains the child's AI conversations. Runs against the test database with a temporary local storage root.
 */

const DAY_MS = 86_400_000;
let storageRoot: string;
let storage: LocalDriver;

beforeAll(async () => {
  storageRoot = await mkdtemp(path.join(tmpdir(), "dz-guardian-privacy-"));
  storage = new LocalDriver(storageRoot);
});

afterAll(async () => {
  await rm(storageRoot, { recursive: true, force: true });
});

const asParent = (userId: string): GuardianActor => ({ userId, roles: ["PARENT"] });
const asStudent = (userId: string): PrivacyActor => ({ userId, roles: ["STUDENT"] });
/** The same parent as the family services' actor type (mutable roles). */
const familyParent = (userId: string) => ({ userId, roles: ["PARENT" as const] as ["PARENT"] });

async function codeOf(promise: Promise<unknown>): Promise<string | null> {
  try {
    await promise;
    return null;
  } catch (error) {
    return isAppError(error) ? error.code : `THREW:${String(error)}`;
  }
}

/** A minor (PENDING consent by default) with a parent linked as PARENT. */
async function family(options: { relationship?: "PARENT" | "GUARDIAN" | "SPONSOR"; adult?: boolean } = {}) {
  const { user: child } = await createStudent({ firstName: "Rudo", student: { isMinor: !options.adult } });
  const { user: parent } = await createParent();
  const { link } = await linkParent({ parentUserId: parent.id, studentUserId: child.id });
  if (options.relationship && options.relationship !== "PARENT") {
    await db.parentStudentLink.update({ where: { id: link.id }, data: { relationship: options.relationship } });
  }
  return { childId: child.id, parentId: parent.id, linkId: link.id };
}

async function notificationsOf(userId: string, type: string) {
  return db.notification.findMany({ where: { userId, type }, select: { title: true, body: true, data: true } });
}

describe("who may act for a child (guardianPrivacyAuthority)", () => {
  it("a linked parent or guardian of a minor; not a sponsor, a stranger, a student account, or for an adult", async () => {
    const minor = await family();
    expect(await guardianPrivacyAuthority(asParent(minor.parentId), minor.childId)).toEqual({ studentUserId: minor.childId, via: "link", linkId: minor.linkId });

    const sponsored = await family({ relationship: "SPONSOR" });
    expect(await codeOf(guardianPrivacyAuthority(asParent(sponsored.parentId), sponsored.childId))).toBe("FORBIDDEN");
    const { user: stranger } = await createParent();
    expect(await codeOf(guardianPrivacyAuthority(asParent(stranger.id), minor.childId))).toBe("NOT_FOUND");
    expect(await codeOf(guardianPrivacyAuthority({ userId: minor.parentId, roles: ["STUDENT"] }, minor.childId))).toBe("FORBIDDEN");
    expect(await codeOf(guardianPrivacyAuthority(asParent(minor.parentId), "not-a-uuid"))).toBe("NOT_FOUND");
    const adult = await family({ adult: true });
    expect(await codeOf(guardianPrivacyAuthority(asParent(adult.parentId), adult.childId))).toBe("FORBIDDEN");
    // The page explains instead of failing.
    expect(await getChildPrivacyOverview(asParent(sponsored.parentId), sponsored.childId)).toMatchObject({ canAct: false, blockedReason: expect.stringMatching(/parent or legal guardian/) });
  });

  it("the guardian of record keeps the right after the link ends; a parent who only had a link does not", async () => {
    const consented = await family();
    await grantGuardianConsent(familyParent(consented.parentId), { studentUserId: consented.childId, confirmed: true });
    await revokeLink(familyParent(consented.parentId), { linkId: consented.linkId });
    expect(await guardianPrivacyAuthority(asParent(consented.parentId), consented.childId)).toMatchObject({ via: "guardian_of_record", linkId: null });

    const linkedOnly = await family();
    await revokeLink(familyParent(linkedOnly.parentId), { linkId: linkedOnly.linkId });
    expect(await codeOf(guardianPrivacyAuthority(asParent(linkedOnly.parentId), linkedOnly.childId))).toBe("NOT_FOUND");
  });
});

describe("a copy of the child's data", () => {
  it("is prepared without AI conversations, downloadable by the requesting guardian only, and announced to both", async () => {
    const { childId, parentId, linkId } = await family();
    await withUserContext(childId, (tx) =>
      tx.aiConversation.create({
        data: { userId: childId, mode: "SOLVER", title: "Private chat", messages: { create: [{ role: "USER", content: "Something private I told the tutor" }] } },
      }),
    );
    const parent = asParent(parentId);
    const now = new Date();

    const { id } = await requestChildDataExport(parent, childId, { ip: "10.1.2.3", userAgent: "test", requestId: "req-guardian-export" }, now);
    expect(await db.privacyRequest.findUniqueOrThrow({ where: { id } })).toMatchObject({ userId: childId, requestedById: parentId, kind: "EXPORT", status: "REQUESTED" });
    expect(await db.job.count({ where: { dedupeKey: `export:${id}` } })).toBe(1);
    expect(await codeOf(requestChildDataExport(parent, childId, null, now))).toBe("CONFLICT");
    const audit = await db.auditLog.findFirst({ where: { action: "privacy.export", entityId: id }, select: { actorUserId: true, targetUserId: true, metadata: true } });
    expect(audit).toMatchObject({ actorUserId: parentId, targetUserId: childId, metadata: { operation: "request", requestedBy: "guardian", via: "link", linkId } });
    // The child is told, and their own requests are independent of the guardian's.
    expect(await notificationsOf(childId, "account.privacy_guardian_export")).toHaveLength(1);
    expect((await getPrivacyOverview(asStudent(childId), now)).export).toBeNull();

    expect(await runDataExport(id, { now, storage })).toEqual({ status: "completed" });
    expect(await getChildPrivacyOverview(parent, childId, now)).toMatchObject({ canAct: true, export: { id, status: "COMPLETED", downloadable: true } });
    expect(await notificationsOf(parentId, "parent.child_data_export_ready")).toEqual([
      expect.objectContaining({ data: expect.objectContaining({ href: `/parent/children/${childId}` }) }),
    ]);

    const file = await openChildDataExport(parent, childId, id, { now, storage });
    const text = await new Response(file.stream).text();
    const document = JSON.parse(text) as { requestedBy: string; profile: { firstName: string }; aiConversations: unknown[]; aiConversationsNote: string };
    expect(document).toMatchObject({ requestedBy: "guardian", profile: { firstName: "Rudo" }, aiConversations: [] });
    expect(document.aiConversationsNote).toMatch(/not included/);
    expect(text).not.toContain("Something private I told the tutor");
    expect(file.filename).toMatch(/^child-data-\d{4}-\d{2}-\d{2}\.json$/);
    expect(await db.auditLog.count({ where: { action: "privacy.export", entityId: id, metadata: { path: ["operation"], equals: "download" } } })).toBe(1);

    // Nobody else gets the guardian's copy: not the child (their own download route), not another parent.
    expect(await codeOf(openDataExport(asStudent(childId), id, { now, storage }))).toBe("NOT_FOUND");
    const { user: otherParent } = await createParent();
    await linkParent({ parentUserId: otherParent.id, studentUserId: childId });
    expect(await codeOf(openChildDataExport(asParent(otherParent.id), childId, id, { now, storage }))).toBe("NOT_FOUND");
    expect(await codeOf(openChildDataExport(parent, childId, id, { now: new Date(now.getTime() + 8 * DAY_MS), storage }))).toBe("NOT_FOUND");

    // A student's own export: they are told when it is ready.
    const own = await requestDataExport(asStudent(childId), null, now);
    await runDataExport(own.id, { now, storage });
    expect(await notificationsOf(childId, "account.data_export_ready")).toHaveLength(1);
  });
});

describe("deleting the child's account", () => {
  it("is scheduled after the grace period, the child is told and can see who asked; the guardian can cancel", async () => {
    const { childId, parentId } = await family();
    const parent = asParent(parentId);
    const now = new Date();

    expect(await codeOf(requestChildAccountDeletion(parent, childId, {}, null, now))).toBe("VALIDATION");
    const { id, scheduledFor } = await requestChildAccountDeletion(parent, childId, { confirmed: true }, null, now);
    expect(scheduledFor.getTime() - now.getTime()).toBe(DELETION_GRACE_DAYS * DAY_MS);
    expect(await db.privacyRequest.findUniqueOrThrow({ where: { id } })).toMatchObject({ userId: childId, requestedById: parentId, kind: "DELETION", status: "REQUESTED" });
    expect(await codeOf(requestChildAccountDeletion(parent, childId, { confirmed: true }, null, now))).toBe("CONFLICT");
    expect(await codeOf(requestAccountDeletion(asStudent(childId), { confirmed: true }, null, now))).toBe("CONFLICT");

    expect((await getPrivacyOverview(asStudent(childId), now)).deletion).toMatchObject({ id, requestedByGuardian: true });
    expect(await getChildPrivacyOverview(parent, childId, now)).toMatchObject({ deletion: { id, requestedByYou: true } });
    const told = await notificationsOf(childId, "account.privacy_guardian_deletion");
    expect(told).toHaveLength(1);
    expect(told[0]?.body).toMatch(new RegExp(`${DELETION_GRACE_DAYS} days`));
    expect(await db.auditLog.findFirst({ where: { action: "privacy.deletion.request", entityId: id }, select: { actorUserId: true, targetUserId: true, metadata: true } })).toMatchObject({
      actorUserId: parentId,
      targetUserId: childId,
      metadata: { operation: "request", requestedBy: "guardian" },
    });

    // Only the guardian who asked can cancel it from the parent area.
    const { user: otherParent } = await createParent();
    await linkParent({ parentUserId: otherParent.id, studentUserId: childId });
    expect(await codeOf(cancelChildAccountDeletion(asParent(otherParent.id), childId, null, now))).toBe("NOT_FOUND");
    await cancelChildAccountDeletion(parent, childId, null, now);
    expect(await db.privacyRequest.findUniqueOrThrow({ where: { id }, select: { status: true } })).toEqual({ status: "CANCELLED" });
    expect(await notificationsOf(childId, "account.privacy_guardian_deletion_cancelled")).toHaveLength(1);
  });

  it("the child can cancel a deletion their guardian asked for, and the guardian is told", async () => {
    const { childId, parentId } = await family({ relationship: "GUARDIAN" });
    const now = new Date();
    const { id } = await requestChildAccountDeletion(asParent(parentId), childId, { confirmed: true }, null, now);
    await cancelAccountDeletion(asStudent(childId), null, now);
    expect(await db.privacyRequest.findUniqueOrThrow({ where: { id }, select: { status: true } })).toEqual({ status: "CANCELLED" });
    expect(await notificationsOf(parentId, "parent.child_deletion_cancelled")).toEqual([
      expect.objectContaining({ data: expect.objectContaining({ href: `/parent/children/${childId}` }) }),
    ]);
    expect(await db.auditLog.findFirst({ where: { action: "privacy.deletion.request", entityId: id, actorUserId: childId }, select: { metadata: true } })).toMatchObject({
      metadata: { operation: "cancel", requestedBy: "guardian" },
    });
  });
});
