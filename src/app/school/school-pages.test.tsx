import type { ReactElement, ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { ToastProvider } from "@/components/ui/Toast";
import type { Actor } from "@/server/auth/actor";
import { db } from "@/server/db";
import { latestDevMessage } from "@/server/messaging";
import type { SchoolContext } from "@/server/schools/access";
import { resolveSchoolAdmin } from "@/server/schools/access";
import { createSchoolClass } from "@/server/schools/classes";
import { inviteSchoolMember } from "@/server/schools/invitations";
import { requestSchoolReport } from "@/server/schools/reports";
import { setSchoolSubjects } from "@/server/schools/subjects";
import { actorOf, schoolWithAdmin, studentOf, teacherOf } from "@/server/schools/testing";
import { createCurriculumChain, createStudent, uniqueEmail, uniqueId } from "../../../tests/factories/index";

// Every optional channel is OFF here, as by default (owner decision 2026-10-07): invitations, reset instructions and
// reminders are account email and go out anyway; nothing is ever texted while SMS is off.
const featureFlags = vi.hoisted(() => ({ ai: false, whatsapp: false, email: false, sms: false, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), featureFlags),
);

/**
 * Smoke tests of every page of the school area and the invitation pages: each Server Component loads real data from
 * the test database and renders to HTML. The session guards (current school), `next/link`, `notFound()` / `redirect()`
 * and cache revalidation are mocked; the services are real (scoping, audit).
 */

class NotFoundSignal extends Error {}
class RedirectSignal extends Error {}

let current: { actor: Actor; school: SchoolContext } | null = null;
let signedIn: Actor | null = null;

vi.mock("@/app/school/_lib/context", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/app/school/_lib/context")>()),
  requireSchoolPage: async () => {
    if (!current) throw new Error("no school context");
    return current;
  },
  requireSchoolAction: async () => {
    if (!current) throw new Error("no school context");
    return { ...current, schoolId: current.school.schoolId };
  },
  auditRequest: async () => ({ requestId: "test", ip: "10.0.0.1", userAgent: "vitest" }),
}));
vi.mock("@/server/auth/actor", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/server/auth/actor")>()),
  getActor: async () => signedIn,
}));
vi.mock("@/server/auth/guards", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/server/auth/guards")>()),
  requireUser: async () => {
    if (!signedIn) throw new RedirectSignal("/login");
    return signedIn;
  },
}));
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));
vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  usePathname: () => "/school",
  notFound: () => {
    throw new NotFoundSignal("not found");
  },
  redirect: (to: string) => {
    throw new RedirectSignal(to);
  },
}));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn(), revalidateTag: vi.fn(), refresh: vi.fn(), updateTag: vi.fn() }));

type PageProps = { params: Promise<Record<string, string>>; searchParams: Promise<Record<string, string>> };
type PageComponent = (props: PageProps) => Promise<ReactElement> | ReactElement;

async function render(module: Promise<{ default: unknown }>, props: { params?: Record<string, string>; searchParams?: Record<string, string> } = {}): Promise<string> {
  const page = (await module).default as PageComponent;
  const element = await page({ params: Promise.resolve(props.params ?? {}), searchParams: Promise.resolve(props.searchParams ?? {}) });
  return renderToStaticMarkup(<ToastProvider>{element}</ToastProvider>);
}

let classId: string;
let studentId: string;
let provisionedId: string;
let token: string;
let subjectCode: string;

beforeAll(async () => {
  const chain = await createCurriculumChain({ lessonsPerTopic: 0, topicCount: 1, subtopicsPerTopic: 0 });
  subjectCode = chain.subject.officialCode!;
  const { school, adminActor } = await schoolWithAdmin();
  const actor = adminActor!;
  current = { actor, school: await resolveSchoolAdmin(actor, school.id) };
  const teacher = await teacherOf(school.id, { firstName: "Farai", lastName: "Teacher" });
  const student = await studentOf(school.id, { firstName: "Tendai", lastName: "Moyo" });
  studentId = student.user.id;
  const provisioned = await db.user.create({
    data: {
      loginUsername: `t.${uniqueId("p").replace(/-/g, "")}`.slice(0, 30),
      passwordHash: "$argon2id$v=19$m=19456,t=2,p=1$c29tZXNhbHQ$aGFzaGhhc2hoYXNoaGFzaGhhc2hoYXNoaGFzaGhhc2g",
      roles: ["STUDENT"],
      provisionedBySchoolId: school.id,
      profile: { create: { firstName: "Rudo", lastName: "Ncube" } },
      student: { create: {} },
    },
  });
  provisionedId = provisioned.id;
  await db.schoolMember.create({ data: { schoolId: school.id, userId: provisioned.id, role: "STUDENT", status: "ACTIVE", joinedAt: new Date() } });
  await setSchoolSubjects(actor, { schoolId: school.id, subjectIds: [chain.subject.id] });
  classId = (await createSchoolClass(actor, { schoolId: school.id, name: "4A Maths", subjectId: chain.subject.id, academicYear: "2026", teacherUserId: teacher.user.id })).id;
  await db.classMember.create({ data: { classId, userId: student.user.id, status: "ACTIVE", source: "ADDED_BY_STAFF" } });
  await db.classMember.create({ data: { classId, userId: provisioned.id, status: "ACTIVE", source: "ROSTER_IMPORT" } });
  await requestSchoolReport(actor, { schoolId: school.id, kind: "engagement", periodStart: "2026-01-01", periodEnd: "2026-01-31" });
  const email = uniqueEmail("invitee");
  await inviteSchoolMember(actor, { schoolId: school.id, contact: email, role: "TEACHER" });
  token = latestDevMessage(email)!.text.match(/\/invite\/([A-Za-z0-9_-]+)/)![1]!;
});

describe("school area pages", () => {
  it("renders the overview with setup gaps, seats and analytics sections", async () => {
    const html = await render(import("./page"));
    expect(html).toContain(current!.school.name);
    expect(html).toContain("Average score by subject");
    expect(html).toContain("Pass rate (estimate)");
    expect(html).toContain("Class outcomes by teacher");
    expect(html).toContain("Examination readiness");
    expect(html).toContain("Request a school plan");
  });

  it("renders teachers, students and join requests", async () => {
    const teachers = await render(import("./teachers/page"));
    expect(teachers).toContain("Farai Teacher");
    expect(teachers).toContain("4A Maths");
    expect(teachers).toContain("Teacher invitations");
    const students = await render(import("./students/page"));
    expect(students).toContain("Tendai Moyo");
    expect(students).toContain("Rudo Ncube");
    expect(students).toContain("Import students");
    const requests = await render(import("./students/page"), { searchParams: { status: "REQUESTED" } });
    expect(requests).toContain("No join requests");
  });

  it("renders a student's record (audited) and refuses students of other schools", async () => {
    const html = await render(import("./students/[userId]/page"), { params: { userId: provisionedId } });
    expect(html).toContain("Rudo Ncube");
    expect(html).toContain("Reset password and print slip");
    expect(html).toContain("Your school (roster import)");
    expect(await db.auditLog.count({ where: { action: "student.view", targetUserId: provisionedId } })).toBeGreaterThan(0);
    const outsider = (await createStudent()).user;
    await expect(render(import("./students/[userId]/page"), { params: { userId: outsider.id } })).rejects.toBeInstanceOf(NotFoundSignal);
    await expect(render(import("./students/[userId]/page"), { params: { userId: "nope" } })).rejects.toBeInstanceOf(NotFoundSignal);
  });

  it("renders the roster import, classes, a class and subjects", async () => {
    expect(await render(import("./students/import/page"))).toContain("Download the template (CSV)");
    const classes = await render(import("./classes/page"));
    expect(classes).toContain("4A Maths");
    expect(classes).toContain("Create a class");
    const cls = await render(import("./classes/[classId]/page"), { params: { classId } });
    expect(cls).toContain("Farai Teacher");
    expect(cls).toContain("Tendai Moyo");
    expect(cls).toContain("Reset 1 password");
    await expect(render(import("./classes/[classId]/page"), { params: { classId: "00000000-0000-4000-8000-000000000000" } })).rejects.toBeInstanceOf(NotFoundSignal);
    const subjects = await render(import("./subjects/page"), { searchParams: { q: subjectCode } });
    expect(subjects).toContain("Offered subjects (1)");
    expect(subjects).toContain("Offered");
  });

  it("renders reports and the subscription page", async () => {
    const reports = await render(import("./reports/page"));
    expect(reports).toContain("Student engagement");
    expect(reports).toContain("Queued");
    const billing = await render(import("./billing/page"));
    expect(billing).toContain("No school plan yet");
    expect(billing).toContain("Online payment for schools isn");
  });
});

describe("invitation pages", () => {
  it("shows what the invitation is for, signed out and signed in", async () => {
    signedIn = null;
    const signedOut = await render(import("../invite/[token]/page"), { params: { token } });
    expect(signedOut).toContain(`Join ${current!.school.name}`);
    expect(signedOut).toContain("Sign in to accept");
    expect(signedOut).toContain(`/register?role=TEACHER&amp;next=${encodeURIComponent(`/invite/${token}`)}`);
    signedIn = await actorOf(studentId);
    const signedInHtml = await render(import("../invite/[token]/page"), { params: { token } });
    expect(signedInHtml).toContain("Accept invitation");
    const invalid = await render(import("../invite/[token]/page"), { params: { token: "x".repeat(40) } });
    expect(invalid).toContain("isn&#x27;t valid");
    expect(await render(import("../invite/page"))).toContain("Your invitations");
    signedIn = null;
    await expect(render(import("../invite/page"))).rejects.toBeInstanceOf(RedirectSignal);
  });
});
