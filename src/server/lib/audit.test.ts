import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { createUser, uniqueSuffix } from "../../../tests/factories/index";
import { AUDIT_ACTIONS, audit, auditActorFields, auditInTx, buildAuditRow } from "./audit";
import { REDACTED } from "./logger";

describe("buildAuditRow", () => {
  it("redacts metadata, hashes the IP and truncates long values", () => {
    const row = buildAuditRow({
      actorUserId: randomUUID(),
      actorRoles: ["ADMIN", "ADMIN"],
      action: AUDIT_ACTIONS.SETTING_UPDATE,
      entityType: "Setting",
      entityId: "ai.enabled",
      metadata: { email: "a@b.co", note: "contact me at kid@example.com or +263771234567", version: 2 },
      before: { password: "hunter2", value: true },
      request: { requestId: "req-12345678", ip: "196.4.1.2", userAgent: "x".repeat(600) },
    });
    expect(row.actorKind).toBe("USER");
    expect(row.actorRoles).toEqual(["ADMIN"]);
    expect(row.metadata).toEqual({ email: REDACTED, note: "contact me at [EMAIL] or [PHONE]", version: 2 });
    expect(row.before).toEqual({ password: REDACTED, value: true });
    expect(row.ipHash).toMatch(/^[0-9a-f]{64}$/);
    expect(row.ipHash).not.toContain("196");
    expect(row.userAgent).toHaveLength(512);
  });

  it("records system actors and refuses malformed or reason-less entries", () => {
    const system = buildAuditRow({ ...auditActorFields({ kind: "system", job: "x" }), action: "job.retry", entityType: "Job" });
    expect(system.actorKind).toBe("SYSTEM");
    expect(system.actorUserId).toBeNull();
    expect(() => buildAuditRow({ actorUserId: null, action: "Bad Action" as never, entityType: "X" })).toThrow(/malformed/);
    expect(() =>
      buildAuditRow({ actorUserId: randomUUID(), action: AUDIT_ACTIONS.STUDENT_VIEW, entityType: "User", reason: "  " }),
    ).toThrow(/requires a reason/);
  });
});

describe("audit (database)", () => {
  it("appends an entry that the app role can never rewrite", async () => {
    const { user } = await createUser({ roles: ["SUPER_ADMIN"] });
    const entityId = `test.${uniqueSuffix()}`;
    expect(
      await audit({
        actorUserId: user.id,
        actorRoles: user.roles,
        action: AUDIT_ACTIONS.SETTING_UPDATE,
        entityType: "Setting",
        entityId,
        metadata: { phone: "+263771234567" },
        request: { ip: "10.0.0.1", requestId: "req-abcdefgh" },
      }),
    ).toBe(true);

    const row = await db.auditLog.findFirstOrThrow({ where: { entityType: "Setting", entityId } });
    expect(row.metadata).toEqual({ phone: REDACTED });
    expect(row.requestId).toBe("req-abcdefgh");
    await expect(db.auditLog.update({ where: { id: row.id }, data: { reason: "tamper" } })).rejects.toThrow();
    await expect(db.auditLog.delete({ where: { id: row.id } })).rejects.toThrow();
  });

  it("audit() swallows failures; auditInTx() propagates them", async () => {
    const missingUser = randomUUID();
    const entry = {
      actorUserId: missingUser,
      action: AUDIT_ACTIONS.ROLE_GRANT,
      entityType: "User",
      entityId: missingUser,
    } as const;
    await expect(audit(entry)).resolves.toBe(false);
    await expect(db.$transaction((tx) => auditInTx(tx, entry))).rejects.toThrow();
  });

  it("stores break-glass entries with their reason", async () => {
    const { user } = await createUser({ roles: ["SUPER_ADMIN"] });
    const id = await db.$transaction((tx) =>
      auditInTx(tx, {
        actorUserId: user.id,
        action: AUDIT_ACTIONS.AI_CONVERSATION_BREAK_GLASS,
        entityType: "AiConversation",
        entityId: randomUUID(),
        reason: "Safeguarding case 42",
      }),
    );
    const row = await db.auditLog.findUniqueOrThrow({ where: { id } });
    expect(row.reason).toBe("Safeguarding case 42");
  });
});
