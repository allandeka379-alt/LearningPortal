import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { createParent, createStudent, createTeacher, createUser, linkParent, uniqueEmail, uniquePhone, uniqueUsername } from "../../../tests/factories/index";
import { hashLinkCode, normalizeLinkCode } from "./codes";
import {
  createParentLinkCode,
  createStudentLinkCode,
  LINK_REQUEST_SENT_MESSAGE,
  redeemParentCode,
  redeemStudentCode,
  requestLinkByContact,
  respondToLinkRequest,
  revokeLink,
  setAiConversationAccess,
  updateLinkPermissions,
} from "./links";
import { requireLinkedChild } from "./queries";
import { actorOf, errorCodeOf, randomTestIp, switchOff, switchOn } from "./testing";

/**
 * Parent-student linking (§21, ARCHITECTURE §5.3 / §5.12) against Postgres, including the database CHECKs and the
 * terminal-state trigger. Every test creates its own users; assertions only look at rows they created.
 */

async function studentAndParent() {
  const student = (await createStudent({ firstName: "Tariro" })).user;
  const parent = (await createParent({ firstName: "Grace" })).user;
  return { student, parent, studentActor: await actorOf(student.id), parentActor: await actorOf(parent.id) };
}

async function linkRow(id: string) {
  return db.parentStudentLink.findUniqueOrThrow({ where: { id } });
}

describe("flow (a): the student's code, redeemed by a parent", () => {
  it("activates at once with basis STUDENT_CODE, audits the consent and tells the student", async () => {
    const { student, parent, studentActor, parentActor } = await studentAndParent();
    const issued = await createStudentLinkCode(studentActor);
    expect(issued.displayCode).toMatch(/^[A-Z2-9]{4}-[A-Z2-9]{4}$/);

    const pending = await linkRow(issued.linkId);
    expect(pending).toMatchObject({ status: "PENDING", studentUserId: student.id, parentUserId: null, initiatedBy: "STUDENT" });
    expect(pending.inviteCodeHash).toBe(hashLinkCode(issued.code)); // only the HMAC is stored
    expect(pending.inviteCodeHash).not.toContain(issued.code);

    const result = await redeemStudentCode(parentActor, { code: issued.displayCode.toLowerCase(), relationship: "GUARDIAN" }, { ip: randomTestIp() });
    expect(result).toEqual({ linkId: issued.linkId, studentUserId: student.id });

    const active = await linkRow(issued.linkId);
    expect(active).toMatchObject({
      status: "ACTIVE",
      parentUserId: parent.id,
      consentBasis: "STUDENT_CODE",
      relationship: "GUARDIAN",
      inviteCodeHash: null,
      canViewProgress: true,
      canViewStudyActivity: true,
      canViewTestResults: true,
      canViewAiConversations: false,
    });
    expect(active.studentConsentAt).not.toBeNull();
    expect(active.activatedAt).not.toBeNull();

    const auditRow = await db.auditLog.findFirst({ where: { entityId: issued.linkId, action: "parent_link.activate" } });
    expect(auditRow).toMatchObject({ actorUserId: parent.id, targetUserId: student.id, entityType: "ParentStudentLink", metadata: expect.objectContaining({ basis: "STUDENT_CODE" }) });
    const note = await db.notification.findFirst({ where: { userId: student.id, type: "parent.linked" } });
    expect(note?.title).toBe("A parent is now linked to your account");
    expect((await db.parent.findUniqueOrThrow({ where: { userId: parent.id } })).onboardingCompletedAt).not.toBeNull();
    // The parent can now resolve the child through the shared RBAC check.
    expect((await requireLinkedChild(parentActor, student.id)).studentUserId).toBe(student.id);
  });

  it("works exactly once: a second parent gets the same 'not valid' answer", async () => {
    const { studentActor, parentActor } = await studentAndParent();
    const other = await actorOf((await createParent()).user.id);
    const issued = await createStudentLinkCode(studentActor);
    await redeemStudentCode(parentActor, { code: issued.code });
    expect(await errorCodeOf(redeemStudentCode(other, { code: issued.code }))).toBe("VALIDATION");
  });

  it("a new code replaces the previous one; expired and malformed codes are refused", async () => {
    const { studentActor, parentActor } = await studentAndParent();
    const first = await createStudentLinkCode(studentActor);
    const second = await createStudentLinkCode(studentActor);
    expect((await linkRow(first.linkId)).status).toBe("REVOKED");
    expect((await linkRow(first.linkId)).inviteCodeHash).toBeNull();
    expect(await errorCodeOf(redeemStudentCode(parentActor, { code: first.code }))).toBe("VALIDATION");
    expect(await errorCodeOf(redeemStudentCode(parentActor, { code: "not a code" }))).toBe("VALIDATION");

    await db.parentStudentLink.update({ where: { id: second.linkId }, data: { inviteExpiresAt: new Date(Date.now() - 1000) } });
    expect(await errorCodeOf(redeemStudentCode(parentActor, { code: second.code }))).toBe("VALIDATION");
  });

  it("refuses a parent who is already linked, and keeps the code usable", async () => {
    const { student, parent, studentActor, parentActor } = await studentAndParent();
    await linkParent({ parentUserId: parent.id, studentUserId: student.id });
    const issued = await createStudentLinkCode(studentActor);
    expect(await errorCodeOf(redeemStudentCode(parentActor, { code: issued.code }))).toBe("CONFLICT");
    expect((await linkRow(issued.linkId)).status).toBe("PENDING");
  });

  it("supersedes the parent's own pending request between the same pair", async () => {
    const { student, parent, studentActor, parentActor } = await studentAndParent();
    const email = uniqueEmail("kid");
    await db.user.update({ where: { id: student.id }, data: { emailNormalized: email } });
    await requestLinkByContact(parentActor, { identifier: email });
    const request = await db.parentStudentLink.findFirstOrThrow({ where: { parentUserId: parent.id, studentUserId: student.id, status: "PENDING" } });
    const issued = await createStudentLinkCode(studentActor);
    await redeemStudentCode(parentActor, { code: issued.code });
    expect((await linkRow(request.id)).status).toBe("REVOKED");
    expect((await linkRow(issued.linkId)).status).toBe("ACTIVE");
  });

  it("only students create student codes; only parents redeem them", async () => {
    const { studentActor, parentActor } = await studentAndParent();
    const teacher = await actorOf((await createTeacher()).user.id);
    expect(await errorCodeOf(createStudentLinkCode(parentActor))).toBe("FORBIDDEN");
    const issued = await createStudentLinkCode(studentActor);
    expect(await errorCodeOf(redeemStudentCode(studentActor, { code: issued.code }))).toBe("FORBIDDEN");
    expect(await errorCodeOf(redeemStudentCode(teacher, { code: issued.code }))).toBe("FORBIDDEN");
  });

  it("refuses the code of a suspended student", async () => {
    const { student, studentActor, parentActor } = await studentAndParent();
    const issued = await createStudentLinkCode(studentActor);
    await db.user.update({ where: { id: student.id }, data: { status: "SUSPENDED", statusChangedAt: new Date() } });
    expect(await errorCodeOf(redeemStudentCode(parentActor, { code: issued.code }))).toBe("VALIDATION");
  });

  it("rate-limits code attempts per parent", async () => {
    const { parentActor } = await studentAndParent();
    const codes: (string | null)[] = [];
    for (let i = 0; i < 11; i += 1) codes.push(await errorCodeOf(redeemStudentCode(parentActor, { code: "ABCD-EFGH" })));
    expect(codes.slice(0, 10).every((code) => code === "VALIDATION")).toBe(true);
    expect(codes[10]).toBe("RATE_LIMITED");
  });
});

describe("flow (b): the parent's code, entered by the student", () => {
  it("activates with basis STUDENT_APPROVAL and the permissions the student chose", async () => {
    const { student, parent, studentActor, parentActor } = await studentAndParent();
    const issued = await createParentLinkCode(parentActor, { relationship: "GRANDPARENT" });
    expect(normalizeLinkCode(issued.displayCode)).toBe(issued.code);
    const result = await redeemParentCode(studentActor, {
      code: issued.code,
      permissions: { progress: true, activity: false, results: false },
    });
    expect(result).toEqual({ linkId: issued.linkId, parentUserId: parent.id });
    expect(await linkRow(issued.linkId)).toMatchObject({
      status: "ACTIVE",
      studentUserId: student.id,
      consentBasis: "STUDENT_APPROVAL",
      relationship: "GRANDPARENT",
      canViewProgress: true,
      canViewStudyActivity: false,
      canViewTestResults: false,
    });
    expect(await db.notification.count({ where: { userId: parent.id, type: "parent.link_accepted" } })).toBe(1);
  });

  it("refuses a parent code entered by another parent, and the student's own code", async () => {
    const { studentActor, parentActor } = await studentAndParent();
    const otherParent = await actorOf((await createParent()).user.id);
    const parentCode = await createParentLinkCode(parentActor);
    expect(await errorCodeOf(redeemStudentCode(otherParent, { code: parentCode.code }))).toBe("VALIDATION");
    const studentCode = await createStudentLinkCode(studentActor);
    expect(await errorCodeOf(redeemParentCode(studentActor, { code: studentCode.code }))).toBe("VALIDATION");
  });
});

describe("flow (c): a parent's request by email / phone / username", () => {
  it("never reveals whether an account exists", async () => {
    const { parentActor } = await studentAndParent();
    const parentOnly = (await createParent({ email: uniqueEmail("adult") })).user;
    for (const identifier of [uniqueEmail("nobody"), uniquePhone(), uniqueUsername("ghost"), parentOnly.emailNormalized as string]) {
      expect(await requestLinkByContact(parentActor, { identifier })).toEqual({ message: LINK_REQUEST_SENT_MESSAGE });
    }
    expect(await db.parentStudentLink.count({ where: { parentUserId: parentActor.userId } })).toBe(0);
    expect(await errorCodeOf(requestLinkByContact(parentActor, { identifier: "@@" }))).toBe("VALIDATION");
  });

  it("creates one pending request per pair, found by email, phone or school username", async () => {
    const { parentActor } = await studentAndParent();
    const byPhone = (await createStudent({ email: null, phone: uniquePhone() })).user;
    const byUsername = (await createStudent()).user;
    const username = uniqueUsername("hhs");
    await db.user.update({ where: { id: byUsername.id }, data: { loginUsername: username } });

    await requestLinkByContact(parentActor, { identifier: (byPhone.phoneE164 as string).replace("+263", "0") });
    await requestLinkByContact(parentActor, { identifier: (byPhone.phoneE164 as string) }); // duplicate: ignored
    await requestLinkByContact(parentActor, { identifier: username.toUpperCase(), relationship: "SPONSOR" });

    const rows = await db.parentStudentLink.findMany({ where: { parentUserId: parentActor.userId }, orderBy: { createdAt: "asc" } });
    expect(rows.map((row) => [row.studentUserId, row.status, row.initiatedBy])).toEqual([
      [byPhone.id, "PENDING", "PARENT"],
      [byUsername.id, "PENDING", "PARENT"],
    ]);
    expect(rows[1]?.relationship).toBe("SPONSOR");
    expect(rows.every((row) => row.inviteCodeHash === null && row.inviteExpiresAt !== null)).toBe(true);
    expect(await db.notification.count({ where: { userId: byPhone.id, type: "parent.link_request" } })).toBe(1);
  });

  it("the student accepts (ACTIVE, STUDENT_APPROVAL) and the parent is told", async () => {
    const { student, parent, studentActor, parentActor } = await studentAndParent();
    const email = uniqueEmail("kid");
    await db.user.update({ where: { id: student.id }, data: { emailNormalized: email } });
    await requestLinkByContact(parentActor, { identifier: email });
    const request = await db.parentStudentLink.findFirstOrThrow({ where: { parentUserId: parent.id, studentUserId: student.id } });

    const result = await respondToLinkRequest(studentActor, {
      linkId: request.id,
      decision: "accept",
      permissions: { progress: false, activity: true, results: true },
    });
    expect(result).toEqual({ linkId: request.id, status: "ACTIVE" });
    expect(await linkRow(request.id)).toMatchObject({ status: "ACTIVE", consentBasis: "STUDENT_APPROVAL", canViewProgress: false });
    expect(await db.notification.count({ where: { userId: parent.id, type: "parent.link_accepted" } })).toBe(1);
    expect(await errorCodeOf(respondToLinkRequest(studentActor, { linkId: request.id, decision: "decline" }))).toBe("NOT_FOUND");
  });

  it("a declined request is terminal and silent; a new request starts a new episode", async () => {
    const { student, parent, studentActor, parentActor } = await studentAndParent();
    const email = uniqueEmail("kid");
    await db.user.update({ where: { id: student.id }, data: { emailNormalized: email } });
    await requestLinkByContact(parentActor, { identifier: email });
    const request = await db.parentStudentLink.findFirstOrThrow({ where: { parentUserId: parent.id } });
    await respondToLinkRequest(studentActor, { linkId: request.id, decision: "decline" });
    expect((await linkRow(request.id)).status).toBe("DECLINED");
    expect(await db.notification.count({ where: { userId: parent.id } })).toBe(0);
    // The DB trigger keeps DECLINED terminal.
    await expect(db.parentStudentLink.update({ where: { id: request.id }, data: { status: "PENDING" } })).rejects.toThrow();

    await requestLinkByContact(parentActor, { identifier: email });
    expect(await db.parentStudentLink.count({ where: { parentUserId: parent.id, status: "PENDING" } })).toBe(1);
  });

  it("only the addressed student can answer, and not after expiry", async () => {
    const { student, parent, parentActor } = await studentAndParent();
    const otherStudent = await actorOf((await createStudent()).user.id);
    const email = uniqueEmail("kid");
    await db.user.update({ where: { id: student.id }, data: { emailNormalized: email } });
    await requestLinkByContact(parentActor, { identifier: email });
    const request = await db.parentStudentLink.findFirstOrThrow({ where: { parentUserId: parent.id } });
    expect(await errorCodeOf(respondToLinkRequest(otherStudent, { linkId: request.id, decision: "accept" }))).toBe("NOT_FOUND");
    expect(await errorCodeOf(respondToLinkRequest(parentActor, { linkId: request.id, decision: "accept" }))).toBe("FORBIDDEN");

    await db.parentStudentLink.update({ where: { id: request.id }, data: { inviteExpiresAt: new Date(Date.now() - 1000) } });
    expect(await errorCodeOf(respondToLinkRequest(await actorOf(student.id), { linkId: request.id, decision: "accept" }))).toBe("CONFLICT");
  });
});

describe("revoking (either side, audited)", () => {
  it("the student removes a parent: REVOKED, audited, and the parent loses access at once", async () => {
    const { student, parent, studentActor, parentActor } = await studentAndParent();
    const { link } = await linkParent({ parentUserId: parent.id, studentUserId: student.id, canViewAiConversations: true });
    await revokeLink(studentActor, { linkId: link.id, reason: "No longer needed" }, { ip: randomTestIp(), requestId: "test-req" });

    expect(await linkRow(link.id)).toMatchObject({
      status: "REVOKED",
      revokedById: student.id,
      revokeReason: "No longer needed",
      canViewAiConversations: false,
    });
    const auditRow = await db.auditLog.findFirst({ where: { entityId: link.id, action: "parent_link.revoke" } });
    expect(auditRow).toMatchObject({ actorUserId: student.id, targetUserId: student.id });
    expect(auditRow?.ipHash).toMatch(/^[0-9a-f]{64}$/);
    expect(await errorCodeOf(requireLinkedChild(parentActor, student.id))).toBe("NOT_FOUND");
    expect(await errorCodeOf(revokeLink(studentActor, { linkId: link.id }))).toBe("CONFLICT");
    // Terminal: the old episode can never be re-activated.
    await expect(db.parentStudentLink.update({ where: { id: link.id }, data: { status: "ACTIVE" } })).rejects.toThrow();
  });

  it("the parent can end the link or cancel their own code; strangers cannot touch it", async () => {
    const { student, parent, parentActor } = await studentAndParent();
    const stranger = await actorOf((await createUser({ roles: ["PARENT"] })).user.id);
    const { link } = await linkParent({ parentUserId: parent.id, studentUserId: student.id });
    expect(await errorCodeOf(revokeLink(stranger, { linkId: link.id }))).toBe("NOT_FOUND");
    expect(await errorCodeOf(revokeLink(stranger, { linkId: "not-a-uuid" }))).toBe("NOT_FOUND");
    await revokeLink(parentActor, { linkId: link.id });
    expect((await linkRow(link.id)).revokedById).toBe(parent.id);

    const code = await createParentLinkCode(parentActor);
    await revokeLink(parentActor, { linkId: code.linkId });
    expect(await linkRow(code.linkId)).toMatchObject({ status: "REVOKED", inviteCodeHash: null });
  });
});

describe("what the parent may see (student only)", () => {
  it("updates the flags and audits each change with what was granted and withdrawn", async () => {
    const { student, parent, studentActor, parentActor } = await studentAndParent();
    const { link } = await linkParent({ parentUserId: parent.id, studentUserId: student.id });
    const next = await updateLinkPermissions(studentActor, { linkId: link.id, permissions: { progress: false, activity: true, results: false } });
    expect(next).toEqual({ progress: false, activity: true, results: false });
    expect(await linkRow(link.id)).toMatchObject({ canViewProgress: false, canViewStudyActivity: true, canViewTestResults: false });
    const permissionAudits = () =>
      db.auditLog.findMany({ where: { entityId: link.id, action: "parent_link.permissions_update" }, orderBy: { createdAt: "asc" }, select: { metadata: true } });
    expect((await permissionAudits()).map((row) => row.metadata)).toEqual([expect.objectContaining({ granted: "", withdrawn: "progress,results" })]);

    await updateLinkPermissions(studentActor, { linkId: link.id, permissions: { progress: true, activity: true, results: false } });
    expect((await permissionAudits()).map((row) => row.metadata)).toEqual([
      expect.objectContaining({ granted: "", withdrawn: "progress,results" }),
      expect.objectContaining({ granted: "progress", withdrawn: "" }),
    ]);
    // Saving the same choices again records nothing.
    await updateLinkPermissions(studentActor, { linkId: link.id, permissions: { progress: true, activity: true, results: false } });
    expect(await permissionAudits()).toHaveLength(2);

    expect(await errorCodeOf(updateLinkPermissions(parentActor, { linkId: link.id, permissions: { progress: true, activity: true, results: true } }))).toBe("FORBIDDEN");
    const otherStudent = await actorOf((await createStudent()).user.id);
    expect(await errorCodeOf(updateLinkPermissions(otherStudent, { linkId: link.id, permissions: { progress: true, activity: true, results: true } }))).toBe("NOT_FOUND");
    expect(await errorCodeOf(updateLinkPermissions(studentActor, { linkId: link.id, permissions: { progress: "yes" } }))).toBe("VALIDATION");
  });
});

describe("AI conversations: separate, explicit consent behind the platform switch", () => {
  it("is refused while the platform switch is off", async () => {
    const { student, parent, studentActor } = await studentAndParent();
    const { link } = await linkParent({ parentUserId: parent.id, studentUserId: student.id });
    const code = await errorCodeOf(setAiConversationAccess(studentActor, { linkId: link.id, allow: true, confirmed: true }, null, { isParentAiAccessEnabled: switchOff }));
    expect(code).toBe("FORBIDDEN");
    expect((await linkRow(link.id)).canViewAiConversations).toBe(false);
  });

  it("needs the explicit confirmation, then records the consent time; withdrawal clears it", async () => {
    const { student, parent, studentActor } = await studentAndParent();
    const { link } = await linkParent({ parentUserId: parent.id, studentUserId: student.id });
    expect(await errorCodeOf(setAiConversationAccess(studentActor, { linkId: link.id, allow: true }, null, { isParentAiAccessEnabled: switchOn }))).toBe("VALIDATION");

    expect(await setAiConversationAccess(studentActor, { linkId: link.id, allow: true, confirmed: true }, null, { isParentAiAccessEnabled: switchOn })).toEqual({ allowed: true });
    const shared = await linkRow(link.id);
    expect(shared.canViewAiConversations).toBe(true);
    expect(shared.aiConversationsConsentAt).not.toBeNull();

    // Withdrawal works even when the switch has since been turned off.
    expect(await setAiConversationAccess(studentActor, { linkId: link.id, allow: false }, null, { isParentAiAccessEnabled: switchOff })).toEqual({ allowed: false });
    expect(await linkRow(link.id)).toMatchObject({ canViewAiConversations: false, aiConversationsConsentAt: null });
    const consents = await db.auditLog.findMany({ where: { entityId: link.id, action: "parent_link.ai_consent" }, orderBy: { createdAt: "asc" }, select: { metadata: true } });
    expect(consents.map((row) => row.metadata)).toEqual([expect.objectContaining({ allowed: true }), expect.objectContaining({ allowed: false })]);
  });

  it("is never offered on a school-record link (no student consent basis)", async () => {
    const { student, parent, studentActor } = await studentAndParent();
    const { link } = await linkParent({ parentUserId: parent.id, studentUserId: student.id, consentBasis: "SCHOOL_RECORD" });
    const code = await errorCodeOf(setAiConversationAccess(studentActor, { linkId: link.id, allow: true, confirmed: true }, null, { isParentAiAccessEnabled: switchOn }));
    expect(code).toBe("FORBIDDEN");
  });

  it("only the student on the link can grant it", async () => {
    const { student, parent, parentActor } = await studentAndParent();
    const { link } = await linkParent({ parentUserId: parent.id, studentUserId: student.id });
    expect(await errorCodeOf(setAiConversationAccess(parentActor, { linkId: link.id, allow: true, confirmed: true }, null, { isParentAiAccessEnabled: switchOn }))).toBe("FORBIDDEN");
  });
});
