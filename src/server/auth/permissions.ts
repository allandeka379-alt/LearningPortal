import type { Role } from "@/generated/prisma/client";

/**
 * Role → permission matrix (§33, §39, docs/ARCHITECTURE.md §5.2). Pure: no I/O, safe in any bundle.
 *
 * A user may hold several roles (e.g. TEACHER + PARENT): effective permissions are the union, and for each
 * permission the BROADEST grant wins. Each grant has a scope:
 *
 * - `all`        unrestricted (platform-wide).
 * - `own`        only the actor's own resources (own classes, own school, linked children, own payments). Services
 *                MUST apply the matching resource check from `./rbac` (ARCHITECTURE §5.3).
 * - `restricted` a documented subset (see {@link PERMISSION_RESTRICTIONS}), e.g. a teacher may draft class tests only.
 * - `preview`    read-only preview without entitlement gating or progress tracking (staff previewing lessons).
 *
 * SCHOOL_ADMIN is never stored in `User.roles`; the auth layer adds it to the effective roles when the user holds an
 * ACTIVE SchoolMember(SCHOOL_ADMIN) row (see ./actor).
 *
 * Reading another user's AI conversations is NOT a permission: it is never allowed except the audited SUPER_ADMIN
 * break-glass path in `src/server/ai` (ARCHITECTURE §4.9, §5.3).
 */

export const PERMISSIONS = [
  /** Lessons, practice, exams, flashcards, study plan (entitlement-gated). */
  "learn.study",
  /** AI tutor and solver (quota-gated). */
  "ai.use",
  "progress.viewOwn",
  /** A parent's linked children (§21). */
  "child.view",
  /** Classes, students, assignments, tests, announcements. */
  "class.manage",
  "class.viewPerformance",
  /** Teachers, students, subjects, seats of a school. */
  "school.manage",
  /** Report a problem with content (§42). */
  "content.flag",
  /** Create and edit draft lessons, questions, flashcards, assessments, packs. */
  "content.draft",
  /** Approve content (never one's own work: four-eyes is enforced by the database). */
  "content.review",
  /** Publish APPROVED content. */
  "content.publish",
  /** Archive published content. */
  "content.archive",
  /** Boards, qualifications, subjects, syllabus versions, exam sessions, grade schemes. */
  "curriculum.manage",
  "imports.run",
  /** AI content generation for staff (§41, budgeted). */
  "ai.generate",
  "users.manage",
  "roles.grant",
  /** Plans, prices, promo codes, manual grants. */
  "billing.manage",
  "payments.view",
  /** Refunds (step-up required). */
  "payments.refund",
  "analytics.platform",
  /** AI routing, quotas, pricing, kill switch. */
  "ai.admin",
  "settings.manage",
  "audit.view",
] as const;

export type Permission = (typeof PERMISSIONS)[number];

export type PermissionScope = "all" | "own" | "restricted" | "preview";

/** Broadest scope wins when roles are combined. */
const SCOPE_RANK: Readonly<Record<PermissionScope, number>> = { preview: 1, restricted: 2, own: 3, all: 4 };

type Grants = Partial<Record<Permission, PermissionScope>>;

/** The §5.2 matrix, one row per role. */
export const ROLE_PERMISSIONS: Readonly<Record<Role, Readonly<Grants>>> = {
  STUDENT: {
    "learn.study": "all",
    "ai.use": "all",
    "progress.viewOwn": "own",
    "content.flag": "all",
    "payments.view": "own",
  },
  PARENT: {
    "child.view": "own",
    "payments.view": "own",
  },
  TEACHER: {
    "learn.study": "preview",
    "class.manage": "own",
    "class.viewPerformance": "own",
    "content.flag": "all",
    "content.draft": "restricted",
  },
  SCHOOL_ADMIN: {
    "class.manage": "own",
    "class.viewPerformance": "own",
    "school.manage": "own",
    "imports.run": "restricted",
    "payments.view": "own",
  },
  CONTENT_EDITOR: {
    "learn.study": "preview",
    "content.flag": "all",
    "content.draft": "all",
    "content.review": "all",
    "content.publish": "all",
    "content.archive": "all",
    "curriculum.manage": "restricted",
    "imports.run": "restricted",
    "ai.generate": "all",
    "analytics.platform": "restricted",
  },
  ADMIN: {
    "learn.study": "preview",
    "class.manage": "all",
    "class.viewPerformance": "all",
    "school.manage": "all",
    "content.flag": "all",
    "content.draft": "all",
    "content.review": "all",
    "content.publish": "all",
    "content.archive": "all",
    "curriculum.manage": "all",
    "imports.run": "all",
    "ai.generate": "all",
    "users.manage": "all",
    "roles.grant": "restricted",
    "billing.manage": "all",
    "payments.view": "all",
    "payments.refund": "all",
    "analytics.platform": "all",
    "ai.admin": "restricted",
    "audit.view": "all",
  },
  SUPER_ADMIN: {
    "learn.study": "preview",
    "class.manage": "all",
    "class.viewPerformance": "all",
    "school.manage": "all",
    "content.flag": "all",
    "content.draft": "all",
    "content.review": "all",
    "content.publish": "all",
    "content.archive": "all",
    "curriculum.manage": "all",
    "imports.run": "all",
    "ai.generate": "all",
    "users.manage": "all",
    "roles.grant": "all",
    "billing.manage": "all",
    "payments.view": "all",
    "payments.refund": "all",
    "analytics.platform": "all",
    "ai.admin": "all",
    "settings.manage": "all",
    "audit.view": "all",
  },
};

/** What each `restricted` grant allows (ARCHITECTURE §5.2); services enforce the detail. */
export const PERMISSION_RESTRICTIONS = {
  "TEACHER:content.draft": "Class tests (school- or tutor-private questions and assessments) only.",
  "SCHOOL_ADMIN:imports.run": "School roster imports only.",
  "CONTENT_EDITOR:imports.run": "Content imports only.",
  "CONTENT_EDITOR:curriculum.manage": "Draft syllabus versions only; publishing a version needs ADMIN.",
  "CONTENT_EDITOR:analytics.platform": "Content statistics only.",
  "ADMIN:ai.admin": "View AI usage and operate the kill switch only.",
  "ADMIN:roles.grant": "Grant up to CONTENT_EDITOR / SCHOOL_ADMIN (see grantableRoles).",
} as const;

/** Anything carrying roles: an `Actor`, an `InfraActor` user or a plain role list. */
export type RoleHolder = { roles: readonly Role[] } | readonly Role[];

function rolesOf(holder: RoleHolder): readonly Role[] {
  return Array.isArray(holder) ? (holder as readonly Role[]) : (holder as { roles: readonly Role[] }).roles;
}

/** The broadest scope `roles` grant for `permission`, or `null` when none of them grants it. */
export function permissionScope(holder: RoleHolder, permission: Permission): PermissionScope | null {
  let best: PermissionScope | null = null;
  for (const role of rolesOf(holder)) {
    const scope = ROLE_PERMISSIONS[role]?.[permission];
    if (scope !== undefined && (best === null || SCOPE_RANK[scope] > SCOPE_RANK[best])) best = scope;
  }
  return best;
}

/**
 * True when `holder` has `permission` at `minScope` or broader (default: any scope). Coarse check only: "own" and
 * "restricted" grants still need the resource check in the service.
 *
 * @example hasPermission(actor, "content.publish")          // CONTENT_EDITOR, ADMIN, SUPER_ADMIN
 * @example hasPermission(actor, "class.manage", "all")      // platform staff only
 */
export function hasPermission(holder: RoleHolder, permission: Permission, minScope: PermissionScope = "preview"): boolean {
  const scope = permissionScope(holder, permission);
  return scope !== null && SCOPE_RANK[scope] >= SCOPE_RANK[minScope];
}

/** Every permission `holder` has, with its broadest scope. */
export function effectivePermissions(holder: RoleHolder): Map<Permission, PermissionScope> {
  const result = new Map<Permission, PermissionScope>();
  for (const permission of PERMISSIONS) {
    const scope = permissionScope(holder, permission);
    if (scope !== null) result.set(permission, scope);
  }
  return result;
}

/** True when `holder` has at least one of `roles`. */
export function hasAnyRole(holder: RoleHolder, ...roles: Role[]): boolean {
  const held = rolesOf(holder);
  return roles.some((role) => held.includes(role));
}

/**
 * Platform roles `holder` may grant to others (`roles.grant`, §5.2): SUPER_ADMIN grants every platform role; ADMIN
 * grants up to CONTENT_EDITOR (SCHOOL_ADMIN is granted through a school membership, which ADMIN may also manage).
 * STUDENT / PARENT / TEACHER are self-service roles and are never "granted".
 */
export function grantableRoles(holder: RoleHolder): Role[] {
  const scope = permissionScope(holder, "roles.grant");
  if (scope === "all") return ["CONTENT_EDITOR", "ADMIN", "SUPER_ADMIN", "SCHOOL_ADMIN"];
  if (scope === "restricted") return ["CONTENT_EDITOR", "SCHOOL_ADMIN"];
  return [];
}
