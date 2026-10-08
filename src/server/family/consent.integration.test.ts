import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { createParent, createStudent, linkParent } from "../../../tests/factories/index";
import { grantGuardianConsent, withdrawGuardianConsent } from "./consent";
import { revokeLink } from "./links";
import { actorOf, errorCodeOf } from "./testing";

/** Guardian consent for minors given by a linked parent account (ARCHITECTURE §5.12, method PARENT_ACCOUNT). */

async function minorWithParent(options: { relationship?: "PARENT" | "SPONSOR"; isMinor?: boolean } = {}) {
  const student = (await createStudent({ student: { isMinor: options.isMinor ?? true } })).user;
  const parent = (await createParent()).user;
  const { link } = await linkParent({ parentUserId: parent.id, studentUserId: student.id });
  if (options.relationship) await db.parentStudentLink.update({ where: { id: link.id }, data: { relationship: options.relationship } });
  return { student, parent, link, parentActor: await actorOf(parent.id) };
}

describe("grantGuardianConsent", () => {
  it("records GRANTED by PARENT_ACCOUNT with an audit-entry evidence reference", async () => {
    const { student, parent, parentActor } = await minorWithParent();
    expect(await errorCodeOf(grantGuardianConsent(parentActor, { studentUserId: student.id }))).toBe("VALIDATION"); // unconfirmed
    const result = await grantGuardianConsent(parentActor, { studentUserId: student.id, confirmed: true });
    expect(result.status).toBe("GRANTED");

    const row = await db.student.findUniqueOrThrow({ where: { userId: student.id } });
    expect(row).toMatchObject({ guardianConsentStatus: "GRANTED", guardianConsentMethod: "PARENT_ACCOUNT", guardianConsentByUserId: parent.id });
    const auditId = row.guardianConsentEvidenceRef?.replace("AuditLog:", "");
    const auditRow = await db.auditLog.findUniqueOrThrow({ where: { id: auditId as string } });
    expect(auditRow).toMatchObject({ action: "consent.grant", actorUserId: parent.id, targetUserId: student.id, entityType: "Student" });

    expect(await errorCodeOf(grantGuardianConsent(parentActor, { studentUserId: student.id, confirmed: true }))).toBe("CONFLICT");
  });

  it("is not for adults, sponsors, unlinked or revoked parents, or non-parents", async () => {
    const adult = await minorWithParent({ isMinor: false });
    expect(await errorCodeOf(grantGuardianConsent(adult.parentActor, { studentUserId: adult.student.id, confirmed: true }))).toBe("CONFLICT");

    const sponsor = await minorWithParent({ relationship: "SPONSOR" });
    expect(await errorCodeOf(grantGuardianConsent(sponsor.parentActor, { studentUserId: sponsor.student.id, confirmed: true }))).toBe("FORBIDDEN");

    const { student, link, parentActor } = await minorWithParent();
    const stranger = await actorOf((await createParent()).user.id);
    expect(await errorCodeOf(grantGuardianConsent(stranger, { studentUserId: student.id, confirmed: true }))).toBe("NOT_FOUND");
    expect(await errorCodeOf(grantGuardianConsent(await actorOf(student.id), { studentUserId: student.id, confirmed: true }))).toBe("FORBIDDEN");
    await revokeLink(parentActor, { linkId: link.id });
    expect(await errorCodeOf(grantGuardianConsent(parentActor, { studentUserId: student.id, confirmed: true }))).toBe("NOT_FOUND");
    expect((await db.student.findUniqueOrThrow({ where: { userId: student.id } })).guardianConsentStatus).toBe("PENDING");
  });
});

describe("withdrawGuardianConsent", () => {
  it("only the parent who gave it can withdraw (even after the link ended)", async () => {
    const { student, link, parentActor } = await minorWithParent();
    await grantGuardianConsent(parentActor, { studentUserId: student.id, confirmed: true });
    const otherParent = (await createParent()).user;
    await linkParent({ parentUserId: otherParent.id, studentUserId: student.id });
    expect(await errorCodeOf(withdrawGuardianConsent(await actorOf(otherParent.id), { studentUserId: student.id }))).toBe("NOT_FOUND");

    await revokeLink(parentActor, { linkId: link.id });
    expect(await withdrawGuardianConsent(parentActor, { studentUserId: student.id })).toEqual({ status: "WITHDRAWN" });
    expect((await db.student.findUniqueOrThrow({ where: { userId: student.id } })).guardianConsentStatus).toBe("WITHDRAWN");
    expect(await db.auditLog.count({ where: { targetUserId: student.id, action: "consent.withdraw" } })).toBe(1);
    expect(await errorCodeOf(withdrawGuardianConsent(parentActor, { studentUserId: student.id }))).toBe("NOT_FOUND");
  });
});
