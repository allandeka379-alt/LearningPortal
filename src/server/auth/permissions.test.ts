import { describe, expect, it } from "vitest";
import type { Role } from "@/generated/prisma/client";
import {
  effectivePermissions,
  grantableRoles,
  hasAnyRole,
  hasPermission,
  PERMISSION_RESTRICTIONS,
  PERMISSIONS,
  permissionScope,
  ROLE_PERMISSIONS,
  type Permission,
  type PermissionScope,
} from "./permissions";

const ROLES: Role[] = ["STUDENT", "PARENT", "TEACHER", "SCHOOL_ADMIN", "CONTENT_EDITOR", "ADMIN", "SUPER_ADMIN"];

/**
 * The full ARCHITECTURE §5.2 matrix, transcribed independently of the implementation:
 * all = ✓, own = "own …", restricted = partial cell ("class tests only", "draft", "rosters", ...), preview = "preview",
 * null = –.
 */
const MATRIX: Record<Permission, [PermissionScope | null, PermissionScope | null, PermissionScope | null, PermissionScope | null, PermissionScope | null, PermissionScope | null, PermissionScope | null]> = {
  //                     STUDENT   PARENT  TEACHER       SCHOOL_ADMIN  CONTENT_EDITOR ADMIN         SUPER_ADMIN
  "learn.study":         ["all",   null,   "preview",    null,         "preview",     "preview",    "preview"],
  "ai.use":              ["all",   null,   null,         null,         null,          null,         null],
  "progress.viewOwn":    ["own",   null,   null,         null,         null,          null,         null],
  "child.view":          [null,    "own",  null,         null,         null,          null,         null],
  "class.manage":        [null,    null,   "own",        "own",        null,          "all",        "all"],
  "class.viewPerformance": [null,  null,   "own",        "own",        null,          "all",        "all"],
  "school.manage":       [null,    null,   null,         "own",        null,          "all",        "all"],
  "content.flag":        ["all",   null,   "all",        null,         "all",         "all",        "all"],
  "content.draft":       [null,    null,   "restricted", null,         "all",         "all",        "all"],
  "content.review":      [null,    null,   null,         null,         "all",         "all",        "all"],
  "content.publish":     [null,    null,   null,         null,         "all",         "all",        "all"],
  "content.archive":     [null,    null,   null,         null,         "all",         "all",        "all"],
  "curriculum.manage":   [null,    null,   null,         null,         "restricted",  "all",        "all"],
  "imports.run":         [null,    null,   null,         "restricted", "restricted",  "all",        "all"],
  "ai.generate":         [null,    null,   null,         null,         "all",         "all",        "all"],
  "users.manage":        [null,    null,   null,         null,         null,          "all",        "all"],
  "roles.grant":         [null,    null,   null,         null,         null,          "restricted", "all"],
  "billing.manage":      [null,    null,   null,         null,         null,          "all",        "all"],
  "payments.view":       ["own",   "own",  null,         "own",        null,          "all",        "all"],
  "payments.refund":     [null,    null,   null,         null,         null,          "all",        "all"],
  "analytics.platform":  [null,    null,   null,         null,         "restricted",  "all",        "all"],
  "ai.admin":            [null,    null,   null,         null,         null,          "restricted", "all"],
  "settings.manage":     [null,    null,   null,         null,         null,          null,         "all"],
  "audit.view":          [null,    null,   null,         null,         null,          "all",        "all"],
};

describe("ROLE_PERMISSIONS matches the §5.2 matrix", () => {
  it("covers every permission in the catalogue", () => {
    expect(Object.keys(MATRIX).sort()).toEqual([...PERMISSIONS].sort());
  });

  for (const permission of PERMISSIONS) {
    ROLES.forEach((role, index) => {
      const expected = MATRIX[permission][index] ?? null;
      it(`${role} → ${permission} = ${expected ?? "none"}`, () => {
        expect(ROLE_PERMISSIONS[role][permission] ?? null).toBe(expected);
        expect(permissionScope([role], permission)).toBe(expected);
        expect(hasPermission([role], permission)).toBe(expected !== null);
      });
    });
  }

  it("documents every restricted grant", () => {
    for (const role of ROLES) {
      for (const [permission, scope] of Object.entries(ROLE_PERMISSIONS[role])) {
        if (scope === "restricted") expect(Object.keys(PERMISSION_RESTRICTIONS)).toContain(`${role}:${permission}`);
      }
    }
  });
});

describe("combining roles", () => {
  it("unions permissions and keeps the broadest scope", () => {
    const teacherParent = { roles: ["TEACHER", "PARENT"] as Role[] };
    expect(hasPermission(teacherParent, "child.view")).toBe(true);
    expect(hasPermission(teacherParent, "class.manage")).toBe(true);
    expect(permissionScope(["TEACHER", "CONTENT_EDITOR"], "content.draft")).toBe("all");
    expect(permissionScope(["TEACHER", "ADMIN"], "class.manage")).toBe("all");
    expect(permissionScope(["STUDENT", "TEACHER"], "learn.study")).toBe("all");
  });

  it("supports minimum scopes", () => {
    expect(hasPermission(["TEACHER"], "class.manage", "own")).toBe(true);
    expect(hasPermission(["TEACHER"], "class.manage", "all")).toBe(false);
    expect(hasPermission(["ADMIN"], "class.manage", "all")).toBe(true);
    expect(hasPermission(["TEACHER"], "learn.study", "restricted")).toBe(false);
  });

  it("no roles, no permissions", () => {
    expect(effectivePermissions([]).size).toBe(0);
    expect(hasPermission({ roles: [] }, "content.flag")).toBe(false);
  });

  it("lists effective permissions", () => {
    const perms = effectivePermissions(["PARENT"]);
    expect([...perms.entries()]).toEqual([
      ["child.view", "own"],
      ["payments.view", "own"],
    ]);
  });

  it("hasAnyRole", () => {
    expect(hasAnyRole({ roles: ["PARENT"] }, "TEACHER", "PARENT")).toBe(true);
    expect(hasAnyRole(["STUDENT"], "ADMIN")).toBe(false);
  });
});

describe("grantableRoles", () => {
  it("SUPER_ADMIN grants all staff roles; ADMIN up to CONTENT_EDITOR / SCHOOL_ADMIN; others none", () => {
    expect(grantableRoles(["SUPER_ADMIN"])).toEqual(["CONTENT_EDITOR", "ADMIN", "SUPER_ADMIN", "SCHOOL_ADMIN"]);
    expect(grantableRoles(["ADMIN"])).toEqual(["CONTENT_EDITOR", "SCHOOL_ADMIN"]);
    expect(grantableRoles(["CONTENT_EDITOR", "SCHOOL_ADMIN", "TEACHER"])).toEqual([]);
  });
});
