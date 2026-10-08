import { describe, expect, it } from "vitest";
import type { Role } from "@/generated/prisma/client";
import { db } from "@/server/db";
import { audit } from "@/server/lib/audit";
import { createSchool, createUser, uniqueId } from "../../../../tests/factories/index";
import type { CmsActor } from "./access";
import { listAuditLog } from "./audit-log";

function actorFor(userId: string, roles: Role[]): CmsActor {
  return { kind: "user", userId, roles };
}

describe("listAuditLog", () => {
  it("is limited to audit.view holders (ADMIN, SUPER_ADMIN)", async () => {
    const { user: editor } = await createUser({ roles: ["CONTENT_EDITOR"] });
    const { user: teacher } = await createUser({ roles: ["TEACHER"] });
    await expect(listAuditLog(actorFor(editor.id, ["CONTENT_EDITOR"]))).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(listAuditLog(actorFor(teacher.id, ["TEACHER", "SCHOOL_ADMIN"]))).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("filters by actor (id or email), target, entity, action prefix and school, newest first with a cursor", async () => {
    const { user: admin } = await createUser({ roles: ["ADMIN"] });
    const { user: someone } = await createUser();
    const { user: target } = await createUser();
    const { school } = await createSchool();
    const entityId = uniqueId("setting");
    const viewer = actorFor(admin.id, ["ADMIN"]);

    await audit({ actorUserId: someone.id, actorRoles: ["ADMIN"], action: "setting.update", entityType: "Setting", entityId, metadata: { n: 1 } });
    await audit({ actorUserId: someone.id, actorRoles: ["ADMIN"], action: "setting.update", entityType: "Setting", entityId, metadata: { n: 2 } });
    await audit({ actorUserId: someone.id, actorRoles: ["ADMIN"], action: "user.suspend", entityType: "User", entityId: target.id, targetUserId: target.id, reason: "Spam" });
    await audit({ actorUserId: null, action: "school.verify", entityType: "School", entityId: school.id, schoolId: school.id });

    const byActor = await listAuditLog(viewer, { actor: someone.id });
    expect(byActor.items.map((item) => item.action)).toEqual(["user.suspend", "setting.update", "setting.update"]);

    const someoneEmail = (await db.user.findUniqueOrThrow({ where: { id: someone.id }, select: { emailNormalized: true } })).emailNormalized!;
    expect((await listAuditLog(viewer, { actor: someoneEmail.toUpperCase() })).items).toHaveLength(3);
    expect((await listAuditLog(viewer, { actor: "nobody.here@example.test" })).items).toHaveLength(0);

    const byTarget = await listAuditLog(viewer, { target: target.id });
    expect(byTarget.items).toHaveLength(1);
    expect(byTarget.items[0]).toMatchObject({ action: "user.suspend", reason: "Spam", target: { id: target.id } });

    const byEntity = await listAuditLog(viewer, { entityType: "Setting", entityId, limit: 1 });
    expect(byEntity.items).toHaveLength(1);
    expect(byEntity.items[0]?.metadata).toEqual({ n: 2 });
    const next = await listAuditLog(viewer, { entityType: "Setting", entityId, limit: 1, cursor: byEntity.nextCursor! });
    expect(next.items[0]?.metadata).toEqual({ n: 1 });
    expect(next.nextCursor).toBeNull();

    const prefix = await listAuditLog(viewer, { actor: someone.id, action: "setting." });
    expect(prefix.items).toHaveLength(2);

    const bySchool = await listAuditLog(viewer, { schoolId: school.id });
    expect(bySchool.items).toHaveLength(1);
    expect(bySchool.items[0]).toMatchObject({ actor: null, actorKind: "SYSTEM", school: { id: school.id } });
  });

  it("validates filters", async () => {
    const { user: admin } = await createUser({ roles: ["SUPER_ADMIN"] });
    const viewer = actorFor(admin.id, ["SUPER_ADMIN"]);
    await expect(listAuditLog(viewer, { action: "DROP TABLE" })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(listAuditLog(viewer, { from: "2026-10-05", to: "2026-10-01" })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(listAuditLog(viewer, { actor: "not an email" })).rejects.toMatchObject({ code: "VALIDATION" });
  });
});
