import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { createSchoolMember, createUser } from "../../../tests/factories/index";
import { assertSchoolAdmin, listAdministeredSchools, resolveSchoolAdmin } from "./access";
import { actorOf, errorCodeOf, rawActor, schoolWithAdmin, teacherOf } from "./testing";

/**
 * School authority (ARCHITECTURE §5.2 / §5.3): only an ACTIVE SCHOOL_ADMIN membership of an OPERATING school counts.
 * Negative cases: another school's admin, a teacher of the school, a removed admin, a suspended / closed school.
 */

describe("resolveSchoolAdmin", () => {
  it("resolves the admin's school, explicitly or by default", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const byId = await resolveSchoolAdmin(adminActor!, school.id);
    expect(byId).toMatchObject({ schoolId: school.id, name: school.name, status: "ACTIVE" });
    const byDefault = await resolveSchoolAdmin(adminActor!);
    expect(byDefault.schoolId).toBe(school.id);
    expect((await listAdministeredSchools(adminActor!)).map((s) => s.id)).toEqual([school.id]);
  });

  it("allows a school awaiting verification (members can be managed before billing)", async () => {
    const { school, adminActor } = await schoolWithAdmin({ status: "PENDING_VERIFICATION" });
    expect((await assertSchoolAdmin(adminActor!, school.id)).status).toBe("PENDING_VERIFICATION");
  });

  it("refuses another school's admin and the school's teachers", async () => {
    const { school } = await schoolWithAdmin();
    const other = await schoolWithAdmin();
    expect(await errorCodeOf(assertSchoolAdmin(other.adminActor!, school.id))).toBe("FORBIDDEN");
    const teacher = await teacherOf(school.id);
    expect(await errorCodeOf(assertSchoolAdmin(await actorOf(teacher.user.id), school.id))).toBe("FORBIDDEN");
    // A malformed id is refused, never looked up.
    expect(await errorCodeOf(assertSchoolAdmin(other.adminActor!, "not-a-uuid"))).toBe("FORBIDDEN");
  });

  it("refuses a removed admin and admins of suspended or closed schools, even with a stale actor", async () => {
    const { school, admin, adminActor } = await schoolWithAdmin();
    await db.schoolMember.updateMany({ where: { schoolId: school.id, userId: admin.id }, data: { status: "REMOVED", removedAt: new Date() } });
    expect(await errorCodeOf(assertSchoolAdmin(adminActor!, school.id))).toBe("FORBIDDEN");

    for (const status of ["SUSPENDED", "CLOSED"] as const) {
      const suspended = await schoolWithAdmin({ status });
      expect(await errorCodeOf(assertSchoolAdmin(rawActor(suspended.admin.id), suspended.school.id))).toBe("FORBIDDEN");
      expect(await listAdministeredSchools(rawActor(suspended.admin.id))).toEqual([]);
    }
  });

  it("refuses a user with no school at all", async () => {
    const user = (await createUser()).user;
    expect(await errorCodeOf(resolveSchoolAdmin(rawActor(user.id)))).toBe("FORBIDDEN");
  });

  it("picks the first school alphabetically for an admin of several", async () => {
    const a = await schoolWithAdmin({ name: `Zeta Academy ${Date.now()}` });
    const b = await schoolWithAdmin({ name: `Alpha College ${Date.now()}` });
    await createSchoolMember({ schoolId: b.school.id, userId: a.admin.id, role: "SCHOOL_ADMIN" });
    const actor = await actorOf(a.admin.id);
    expect((await resolveSchoolAdmin(actor)).schoolId).toBe(b.school.id);
    expect((await resolveSchoolAdmin(actor, a.school.id)).schoolId).toBe(a.school.id);
  });
});
