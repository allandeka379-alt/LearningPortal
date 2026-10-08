import { beforeAll, describe, expect, it, vi } from "vitest";
import { REAUTH_REQUIRED_CODE, type AdminActionState } from "@/components/admin/form-state";
import { db } from "@/server/db";
import {
  createCurriculumChain,
  createSchool,
  createSchoolMember,
  createStudent,
  createTeacher,
  createUser,
  ensureTestCountry,
  uniqueSuffix,
  type CurriculumChain,
} from "../../../tests/factories/index";

// Auth and RBAC are checked on the AI routes too, so they are tested with AI switched on: `features.ai` is on for this file (never written to the shared DB).
const featureFlags = vi.hoisted(() => ({ ai: true, whatsapp: false, email: false, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), featureFlags),
);

/**
 * Cross-cutting authorization test for the admin console (ARCHITECTURE §5.2, CLAUDE.md rule 3).
 *
 * Unlike the per-area wiring tests, nothing in the auth stack is mocked: every persona signs in with a REAL database
 * session (hashed token in `Session`), the session cookie is served by a mocked `next/headers` cookie jar, and the
 * real `requireAdminPage` / `requireAdminAction` / `requireAdminStepUpAction` guards, Server Actions and services run
 * against the test database. Only Next's request plumbing (cookies, headers, redirect, revalidatePath) is stubbed.
 */

const jar = new Map<string, string>();

class RedirectSignal extends Error {
  constructor(readonly location: string) {
    super(`NEXT_REDIRECT ${location}`);
  }
}

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) => (jar.has(name) ? { name, value: jar.get(name) } : undefined),
    set: (name: string, value: string) => void jar.set(name, value),
    delete: (name: string) => void jar.delete(name),
  }),
  headers: async () => new Headers({ "user-agent": "vitest-admin-rbac", "x-forwarded-for": "10.77.0.1" }),
}));
vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  redirect: (location: string) => {
    throw new RedirectSignal(location);
  },
}));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn(), revalidateTag: vi.fn(), refresh: vi.fn(), updateTag: vi.fn() }));

const { createSession, currentSessionCookieName } = await import("@/server/auth/sessions");
const { testMeta } = await import("@/server/auth/testing");
const { requireAdminPage } = await import("@/components/admin/guards");
const { submitContent } = await import("@/server/cms/review/workflow");
const { readyLesson } = await import("@/server/cms/review/testing");
const { mcqDocument } = await import("@/server/cms/questions/testing");
const users = await import("./users/actions");
const schools = await import("./schools/actions");
const notifications = await import("./notifications/actions");
const lessons = await import("./lessons/actions");
const review = await import("./review/actions");
const boards = await import("./boards/actions");
const syllabuses = await import("./syllabuses/actions");
const plans = await import("./plans/actions");
const settings = await import("./settings/actions");
const aiSettings = await import("./ai/settings/actions");
const analytics = await import("./analytics/actions");
const imports = await import("./imports/actions");
const payments = await import("./payments/actions");
const questions = await import("./questions/actions");
const flags = await import("./flags/actions");
const audit = await import("./audit/page");

const PERSONAS = ["anonymous", "student", "teacher", "schoolAdmin", "editor", "admin", "superAdmin"] as const;
type Persona = (typeof PERSONAS)[number];
type Outcome = "ok" | "UNAUTHENTICATED" | "FORBIDDEN" | "VALIDATION" | "CONFLICT" | "NOT_FOUND" | typeof REAUTH_REQUIRED_CODE;

interface Signed {
  userId: string;
  token: string;
  sessionId: string;
}

const signed = new Map<Exclude<Persona, "anonymous">, Signed>();
let chain: CurriculumChain;
let countryId: string;
let schoolSlug: string;

function signInAs(persona: Persona): void {
  jar.clear();
  if (persona === "anonymous") return;
  const session = signed.get(persona);
  if (!session) throw new Error(`no session for ${persona}`);
  jar.set(currentSessionCookieName(), session.token);
}

async function sessionFor(userId: string): Promise<Signed> {
  const { token, session } = await createSession(userId, "WEB", testMeta(), { authMethod: "PASSWORD" });
  return { userId, token, sessionId: session.id };
}

function form(fields: Record<string, string | string[] | File>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    if (Array.isArray(value)) for (const item of value) data.append(key, item);
    else data.set(key, value);
  }
  return data;
}

function outcomeOf(state: AdminActionState<unknown>): Outcome {
  if (state === null) throw new Error("action returned no state");
  return state.ok ? "ok" : (state.error.code as Outcome);
}

beforeAll(async () => {
  const [student, teacher, schoolAdminUser, editor, admin, superAdmin, c, country, school] = await Promise.all([
    createStudent(),
    createTeacher(),
    createTeacher(),
    createUser({ roles: ["CONTENT_EDITOR"] }),
    createUser({ roles: ["ADMIN"] }),
    createUser({ roles: ["SUPER_ADMIN"] }),
    createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 1, objectivesPerSubtopic: 1, lessonsPerTopic: 0 }),
    ensureTestCountry(),
    createSchool(),
  ]);
  // SCHOOL_ADMIN is never a platform role: it comes from an ACTIVE membership (it holds imports.run "restricted").
  await createSchoolMember({ schoolId: school.school.id, userId: schoolAdminUser.user.id, role: "SCHOOL_ADMIN" });
  chain = c;
  countryId = country.id;
  schoolSlug = school.school.slug;
  const entries: [Exclude<Persona, "anonymous">, string][] = [
    ["student", student.user.id],
    ["teacher", teacher.user.id],
    ["schoolAdmin", schoolAdminUser.user.id],
    ["editor", editor.user.id],
    ["admin", admin.user.id],
    ["superAdmin", superAdmin.user.id],
  ];
  for (const [persona, userId] of entries) signed.set(persona, await sessionFor(userId));
});

// ---------------------------------------------------------------------------------------------------------------------
// Pages: the admin layout admits staff only; each page re-checks its own permission
// ---------------------------------------------------------------------------------------------------------------------

type PageOutcome = "allowed" | string;

async function pageOutcome(permission: Parameters<typeof requireAdminPage>[0], minScope?: "all" | "restricted"): Promise<PageOutcome> {
  try {
    await requireAdminPage(permission, { next: "/admin/x", ...(minScope ? { minScope } : {}) });
    return "allowed";
  } catch (error) {
    if (error instanceof RedirectSignal) return error.location;
    throw error;
  }
}

describe("admin page guards (real sessions)", () => {
  const PAGES: { name: string; permission?: Parameters<typeof requireAdminPage>[0]; minScope?: "all" | "restricted"; expect: Record<Persona, PageOutcome> }[] = [
    {
      name: "admin layout (staff only)",
      expect: { anonymous: "/login?next=%2Fadmin%2Fx", student: "/onboarding", teacher: "/teacher", schoolAdmin: "/school", editor: "allowed", admin: "allowed", superAdmin: "allowed" },
    },
    {
      name: "/admin/questions (content.draft, all)",
      permission: "content.draft",
      expect: { anonymous: "/login?next=%2Fadmin%2Fx", student: "/onboarding", teacher: "/teacher", schoolAdmin: "/school", editor: "allowed", admin: "allowed", superAdmin: "allowed" },
    },
    {
      name: "/admin/syllabuses (curriculum.manage, restricted)",
      permission: "curriculum.manage",
      minScope: "restricted",
      expect: { anonymous: "/login?next=%2Fadmin%2Fx", student: "/onboarding", teacher: "/teacher", schoolAdmin: "/school", editor: "allowed", admin: "allowed", superAdmin: "allowed" },
    },
    {
      name: "/admin/users (users.manage)",
      permission: "users.manage",
      expect: { anonymous: "/login?next=%2Fadmin%2Fx", student: "/onboarding", teacher: "/teacher", schoolAdmin: "/school", editor: "/admin", admin: "allowed", superAdmin: "allowed" },
    },
    {
      name: "/admin/analytics (analytics.platform, all: editors only have content stats)",
      permission: "analytics.platform",
      expect: { anonymous: "/login?next=%2Fadmin%2Fx", student: "/onboarding", teacher: "/teacher", schoolAdmin: "/school", editor: "/admin", admin: "allowed", superAdmin: "allowed" },
    },
    {
      name: "/admin/settings (settings.manage)",
      permission: "settings.manage",
      expect: { anonymous: "/login?next=%2Fadmin%2Fx", student: "/onboarding", teacher: "/teacher", schoolAdmin: "/school", editor: "/admin", admin: "/admin", superAdmin: "allowed" },
    },
  ];

  for (const page of PAGES) {
    it(page.name, async () => {
      const actual: Record<string, PageOutcome> = {};
      for (const persona of PERSONAS) {
        signInAs(persona);
        actual[persona] = await pageOutcome(page.permission, page.minScope);
      }
      expect(actual).toEqual(page.expect);
    });
  }

  it("/admin/audit renders nothing for an editor: the page itself redirects before reading the log", async () => {
    signInAs("editor");
    await expect(audit.default({ searchParams: Promise.resolve({}) })).rejects.toMatchObject({ location: "/admin" });
  });
});

// ---------------------------------------------------------------------------------------------------------------------
// Server Actions: each re-checks its permission (scope "all" unless documented) regardless of the page that shows it
// ---------------------------------------------------------------------------------------------------------------------

interface ActionCase {
  name: string;
  /** Builds and runs the action for one persona (fresh fixtures where an allowed call changes state). */
  run: (persona: Persona) => Promise<AdminActionState<unknown>>;
  expect: Partial<Record<Persona, Outcome>>;
}

/** Non-staff are refused by every admin action; anonymous callers must sign in. */
const NON_STAFF_DENIED: Partial<Record<Persona, Outcome>> = {
  anonymous: "UNAUTHENTICATED",
  student: "FORBIDDEN",
  teacher: "FORBIDDEN",
  schoolAdmin: "FORBIDDEN",
};

const ACTIONS: ActionCase[] = [
  {
    name: "users.suspend (users.manage)",
    run: async () => {
      const { user } = await createStudent();
      return users.suspendUserAction(null, form({ userId: user.id, reason: "RBAC verification: suspend" }));
    },
    expect: { ...NON_STAFF_DENIED, editor: "FORBIDDEN", admin: "ok", superAdmin: "ok" },
  },
  {
    name: "users.grantRole CONTENT_EDITOR (roles.grant restricted + step-up)",
    run: async () => {
      const { user } = await createUser({ roles: [] });
      return users.grantRoleAction(null, form({ userId: user.id, role: "CONTENT_EDITOR", reason: "RBAC verification: grant" }));
    },
    expect: { ...NON_STAFF_DENIED, editor: "FORBIDDEN", admin: "ok", superAdmin: "ok" },
  },
  {
    name: "users.grantRole ADMIN (SUPER_ADMIN only)",
    run: async () => {
      const { user } = await createUser({ roles: [] });
      return users.grantRoleAction(null, form({ userId: user.id, role: "ADMIN", reason: "RBAC verification: grant admin" }));
    },
    expect: { ...NON_STAFF_DENIED, editor: "FORBIDDEN", admin: "FORBIDDEN", superAdmin: "ok" },
  },
  {
    name: "schools.create (school.manage all; a school admin's 'own' scope is not enough)",
    run: () => schools.createSchoolAction(null, form({ name: `RBAC School ${uniqueSuffix()}`, countryId, type: "GOVERNMENT" })),
    expect: { ...NON_STAFF_DENIED, editor: "FORBIDDEN", admin: "ok", superAdmin: "ok" },
  },
  {
    name: "announcements.create (class.manage all; teachers' 'own' scope is not enough)",
    run: () =>
      notifications.createAnnouncementAction(
        null,
        form({ scope: "SCHOOL", schoolRef: schoolSlug, title: `RBAC notice ${uniqueSuffix()}`, body: "Draft only.", audienceRoles: ["STUDENT"], publish: "draft" }),
      ),
    expect: { ...NON_STAFF_DENIED, editor: "FORBIDDEN", admin: "ok", superAdmin: "ok" },
  },
  {
    name: "lessons.create (content.draft all; teachers' class-test scope is not enough)",
    run: () => lessons.createLessonAction(null, form({ title: `RBAC lesson ${uniqueSuffix()}`, kind: "LESSON", subjectId: chain.subject.id })),
    expect: { ...NON_STAFF_DENIED, editor: "ok", admin: "ok", superAdmin: "ok" },
  },
  {
    name: "questions.create (content.draft all)",
    run: () => questions.createQuestionAction(null, form({ document: JSON.stringify(mcqDocument(chain)) })),
    expect: { ...NON_STAFF_DENIED, editor: "ok", admin: "ok", superAdmin: "ok" },
  },
  {
    name: "review.approve (content.review) of another editor's lesson",
    run: async () => {
      const author = await createUser({ roles: ["CONTENT_EDITOR"] });
      const authorActor = { kind: "user" as const, userId: author.user.id, roles: ["CONTENT_EDITOR" as const] };
      const { id } = await readyLesson(authorActor, chain);
      await submitContent(authorActor, { entityType: "LESSON", id });
      return review.approveAction(null, form({ entityType: "LESSON", id, notes: "Checked." }));
    },
    expect: { ...NON_STAFF_DENIED, editor: "ok", admin: "ok", superAdmin: "ok" },
  },
  {
    name: "flags.triage (content.draft): staff pass the guard and reach validation",
    run: () => flags.triageFlagAction(null, form({ flagId: "not-a-uuid" })),
    expect: { ...NON_STAFF_DENIED, editor: "VALIDATION", admin: "VALIDATION", superAdmin: "VALIDATION" },
  },
  {
    name: "boards.create (curriculum.manage all: catalogue writes are ADMIN+)",
    run: () => boards.createBoardAction(null, form({ code: "!", name: "", shortName: "" })),
    expect: { ...NON_STAFF_DENIED, editor: "FORBIDDEN", admin: "VALIDATION", superAdmin: "VALIDATION" },
  },
  {
    name: "syllabuses.create (curriculum.manage draft: editors may draft versions)",
    run: () => syllabuses.createSyllabusVersionAction(null, form({})),
    expect: { ...NON_STAFF_DENIED, editor: "VALIDATION", admin: "VALIDATION", superAdmin: "VALIDATION" },
  },
  {
    name: "imports.upload (imports.run + platform content.draft; a school admin's roster scope is refused by the service)",
    run: () => imports.uploadImportAction(null, form({ file: new File(["stem,type\nx,MULTIPLE_CHOICE\n"], "rbac.csv", { type: "text/csv" }) })),
    expect: { ...NON_STAFF_DENIED, editor: "VALIDATION", admin: "VALIDATION", superAdmin: "VALIDATION" },
  },
  {
    name: "plans.createPrice (billing.manage)",
    run: () => plans.createPlanPriceAction(null, form({ planId: "not-a-uuid", currency: "USD", amount: "1.00", interval: "MONTH" })),
    expect: { ...NON_STAFF_DENIED, editor: "FORBIDDEN", admin: "VALIDATION", superAdmin: "VALIDATION" },
  },
  {
    name: "payments.refund (payments.refund + step-up)",
    run: () => payments.refundPaymentAction(null, form({ paymentId: "not-a-uuid", method: "MANUAL", reason: "RBAC" })),
    expect: { ...NON_STAFF_DENIED, editor: "FORBIDDEN", admin: "VALIDATION", superAdmin: "VALIDATION" },
  },
  {
    name: "analytics.backfill (analytics.platform all)",
    run: () => analytics.enqueueBackfillAction(null, form({ from: "not-a-date", to: "not-a-date" })),
    expect: { ...NON_STAFF_DENIED, editor: "FORBIDDEN", admin: "VALIDATION", superAdmin: "VALIDATION" },
  },
  {
    name: "settings.save (settings.manage: SUPER_ADMIN only; never stores a value here)",
    run: () => settings.savePlatformSettingAction(null, form({ key: "billing.graceDays", expectedVersion: "0", value: "not-a-number" })),
    expect: { ...NON_STAFF_DENIED, editor: "FORBIDDEN", admin: "FORBIDDEN", superAdmin: "VALIDATION" },
  },
  {
    name: "settings.save with an unknown key: permission is checked before the key",
    run: () => settings.savePlatformSettingAction(null, form({ key: "no.such.setting", expectedVersion: "0" })),
    expect: { ...NON_STAFF_DENIED, editor: "FORBIDDEN", admin: "FORBIDDEN" },
  },
  {
    name: "ai.settings.save (ai.admin all: ADMIN may only view)",
    run: () => aiSettings.saveAiSettingAction(null, form({ key: "ai.budget", expectedVersion: "0", dailyCostCeilingUsd: "lots" })),
    expect: { ...NON_STAFF_DENIED, editor: "FORBIDDEN", admin: "FORBIDDEN", superAdmin: "VALIDATION" },
  },
];

describe("admin Server Actions re-check permissions (real sessions, real guards)", () => {
  for (const action of ACTIONS) {
    it(action.name, async () => {
      const actual: Partial<Record<Persona, Outcome>> = {};
      // Denied personas first, so an allowed persona's state change never masks a refusal.
      const order = [...PERSONAS].sort((a, b) => Number(action.expect[a] !== "FORBIDDEN") - Number(action.expect[b] !== "FORBIDDEN"));
      for (const persona of order) {
        if (action.expect[persona] === undefined) continue;
        signInAs(persona);
        actual[persona] = outcomeOf(await action.run(persona));
      }
      expect(actual).toEqual(action.expect);
    });
  }

  it("refusals change nothing: a non-admin suspend leaves the target active and writes no audit row", async () => {
    const { user } = await createStudent();
    for (const persona of ["student", "teacher", "schoolAdmin", "editor"] as const) {
      signInAs(persona);
      expect(outcomeOf(await users.suspendUserAction(null, form({ userId: user.id, reason: "RBAC verification: refused" })))).toBe("FORBIDDEN");
    }
    expect((await db.user.findUniqueOrThrow({ where: { id: user.id }, select: { status: true } })).status).toBe("ACTIVE");
    expect(await db.auditLog.count({ where: { entityId: user.id } })).toBe(0);
  });

  it("allowed mutations are audited with the signed-in actor", async () => {
    const { user } = await createStudent();
    signInAs("admin");
    expect(outcomeOf(await users.suspendUserAction(null, form({ userId: user.id, reason: "RBAC verification: audited" })))).toBe("ok");
    const rows = await db.auditLog.findMany({ where: { entityId: user.id }, select: { actorUserId: true, action: true, reason: true } });
    expect(rows).toEqual([expect.objectContaining({ actorUserId: signed.get("admin")?.userId, reason: "RBAC verification: audited" })]);
  });

  it("step-up: an ADMIN whose last password check is older than 15 minutes is asked to re-authenticate", async () => {
    const { user: adminUser } = await createUser({ roles: ["ADMIN"] });
    const stale = await sessionFor(adminUser.id);
    // Signed in (and last confirmed the password) 20 minutes ago; still active, so the session itself is valid.
    const twentyMinutesAgo = new Date(Date.now() - 20 * 60_000);
    await db.session.update({ where: { id: stale.sessionId }, data: { createdAt: twentyMinutesAgo, reauthenticatedAt: twentyMinutesAgo } });
    jar.clear();
    jar.set(currentSessionCookieName(), stale.token);
    const { user: target } = await createUser({ roles: [] });
    expect(outcomeOf(await users.grantRoleAction(null, form({ userId: target.id, role: "CONTENT_EDITOR", reason: "RBAC verification: stale" })))).toBe(
      REAUTH_REQUIRED_CODE,
    );
    expect(outcomeOf(await payments.refundPaymentAction(null, form({ paymentId: "not-a-uuid", method: "MANUAL", reason: "RBAC" })))).toBe(REAUTH_REQUIRED_CODE);
    expect((await db.user.findUniqueOrThrow({ where: { id: target.id }, select: { roles: true } })).roles).toEqual([]);
  });

  it("a revoked session is treated as signed out", async () => {
    const { user } = await createUser({ roles: ["ADMIN"] });
    const session = await sessionFor(user.id);
    await db.session.update({ where: { id: session.sessionId }, data: { revokedAt: new Date(), revokedReason: "logout" } });
    jar.clear();
    jar.set(currentSessionCookieName(), session.token);
    const { user: target } = await createStudent();
    expect(outcomeOf(await users.suspendUserAction(null, form({ userId: target.id, reason: "RBAC verification: revoked" })))).toBe("UNAUTHENTICATED");
  });
});
