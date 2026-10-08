import { beforeAll, describe, expect, it, vi } from "vitest";
import type { AdminActionState } from "@/components/admin/form-state";
import { addDays, localDateString } from "@/lib/dates";
import { db } from "@/server/db";
import { createCurriculumChain, createQuestion, createStudent, createTeacher, createUser, uniqueSuffix, type CurriculumChain } from "../../../tests/factories/index";

/**
 * Wiring of the daily-question calendar, FAQ and testimonial Server Actions (§25, §45, §46) with REAL database
 * sessions: each action re-checks `content.publish` (scope "all") whatever page shows it, parses the form and calls
 * its service. Only Next's request plumbing (cookies, headers, revalidatePath) is stubbed, as in admin-rbac.test.ts.
 */

const jar = new Map<string, string>();

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) => (jar.has(name) ? { name, value: jar.get(name) } : undefined),
    set: (name: string, value: string) => void jar.set(name, value),
    delete: (name: string) => void jar.delete(name),
  }),
  headers: async () => new Headers({ "user-agent": "vitest-site-content", "x-forwarded-for": "10.78.0.1" }),
}));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn(), revalidateTag: vi.fn(), refresh: vi.fn(), updateTag: vi.fn() }));

const { createSession, currentSessionCookieName } = await import("@/server/auth/sessions");
const { testMeta } = await import("@/server/auth/testing");
const daily = await import("./daily-questions/actions");
const faq = await import("./faq/actions");
const testimonials = await import("./testimonials/actions");

type Persona = "anonymous" | "student" | "teacher" | "editor" | "admin";
const tokens = new Map<Persona, string>();
let chain: CurriculumChain;
let questionId: string;

function signInAs(persona: Persona): void {
  jar.clear();
  const token = tokens.get(persona);
  if (token) jar.set(currentSessionCookieName(), token);
}

function form(fields: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

function outcome(state: AdminActionState<unknown>): string {
  if (state === null) throw new Error("no state");
  return state.ok ? "ok" : state.error.code;
}

beforeAll(async () => {
  const [student, teacher, editor, admin, c] = await Promise.all([
    createStudent(),
    createTeacher(),
    createUser({ roles: ["CONTENT_EDITOR"] }),
    createUser({ roles: ["ADMIN"] }),
    createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 0, lessonsPerTopic: 0 }),
  ]);
  chain = c;
  const context = { subjectId: chain.subject.id, syllabusId: chain.syllabus.id, topicIds: chain.topics.map((t) => t.id) };
  questionId = (await createQuestion("MULTIPLE_CHOICE", { context, difficulty: 2, isDailyEligible: true })).id;
  // A second eligible question: the first is excluded from automatic picks once scheduled (60-day reuse window).
  await createQuestion("TRUE_FALSE", { context, difficulty: 3, isDailyEligible: true });
  for (const [persona, userId] of [
    ["student", student.user.id],
    ["teacher", teacher.user.id],
    ["editor", editor.user.id],
    ["admin", admin.user.id],
  ] as const) {
    const { token } = await createSession(userId, "WEB", testMeta(), { authMethod: "PASSWORD" });
    tokens.set(persona, token);
  }
});

describe("site content Server Actions (real sessions)", () => {
  it("refuse anonymous callers, students and teachers", async () => {
    const day = addDays(localDateString(new Date(), "Africa/Harare"), 3);
    const cases: [string, () => Promise<AdminActionState<unknown>>][] = [
      ["faq.create", () => faq.createFaqAction(null, form({ question: "Q?", answer: "A.", category: "general" }))],
      ["testimonials.create", () => testimonials.createTestimonialAction(null, form({ displayName: "A B", quote: "Quote.", consentRecordedAt: "2026-10-01T10:00", consentMethod: "email" }))],
      ["daily.schedule", () => daily.scheduleDailyQuestionAction(null, form({ date: day, qualificationId: chain.qualification.id, subjectId: chain.subject.id, questionId }))],
    ];
    for (const [name, run] of cases) {
      const actual: Record<string, string> = {};
      for (const persona of ["anonymous", "student", "teacher"] as const) {
        signInAs(persona);
        actual[persona] = outcome(await run());
      }
      expect(actual, name).toEqual({ anonymous: "UNAUTHENTICATED", student: "FORBIDDEN", teacher: "FORBIDDEN" });
    }
  });

  it("let an editor write, publish and reorder FAQ entries", async () => {
    signInAs("editor");
    const locale = `en-${uniqueSuffix().slice(0, 8)}`;
    const first = await faq.createFaqAction(null, form({ question: "First question?", answer: "First **answer**.", category: "General", locale }));
    expect(outcome(first)).toBe("ok");
    const second = await faq.createFaqAction(null, form({ question: "Second question?", answer: "Second answer.", category: "general", locale }));
    const firstId = first?.ok ? (first.data as { id: string }).id : "";
    const secondId = second?.ok ? (second.data as { id: string }).id : "";
    expect(first?.ok && first.redirectTo).toBe(`/admin/faq/${firstId}`);

    expect(outcome(await faq.publishFaqAction(null, form({ faqItemId: firstId })))).toBe("ok");
    expect(outcome(await faq.moveFaqAction(null, form({ faqItemId: secondId, direction: "up" })))).toBe("ok");
    const rows = await db.faqItem.findMany({ where: { locale }, orderBy: { sortOrder: "asc" }, select: { id: true, isPublished: true } });
    expect(rows.map((r) => r.id)).toEqual([secondId, firstId]);
    expect(rows.find((r) => r.id === firstId)?.isPublished).toBe(true);

    const invalid = await faq.createFaqAction(null, form({ question: "Bad?", answer: "![x](https://example.com/x.png)", category: "general", locale }));
    expect(invalid?.ok).toBe(false);
    if (invalid && !invalid.ok) {
      expect(invalid.error.fieldErrors?.answer?.length).toBeGreaterThan(0);
      expect(invalid.values?.question).toBe("Bad?");
    }
    expect(outcome(await faq.deleteFaqAction(null, form({ faqItemId: firstId })))).toBe("CONFLICT");
  });

  it("let an editor record, publish and erase a testimonial (checkbox and dates parsed from the form)", async () => {
    signInAs("admin");
    const created = await testimonials.createTestimonialAction(
      null,
      form({ displayName: "Rudo K.", descriptor: "Parent", quote: "Clear and calm.", consentRecordedAt: "2026-10-01T10:00", consentMethod: "email", authorIsMinor: "on" }),
    );
    expect(outcome(created)).toBe("ok");
    const id = created?.ok ? (created.data as { id: string }).id : "";
    expect(await db.testimonial.findUniqueOrThrow({ where: { id }, select: { authorIsMinor: true } })).toEqual({ authorIsMinor: true });
    expect(outcome(await testimonials.publishTestimonialAction(null, form({ testimonialId: id })))).toBe("CONFLICT");
    expect(outcome(await testimonials.withdrawTestimonialConsentAction(null, form({ testimonialId: id, reason: "Email" })))).toBe("ok");
    expect(await db.testimonial.findUniqueOrThrow({ where: { id }, select: { quote: true } })).toEqual({ quote: "" });
  });

  it("let an editor schedule, auto-pick and clear daily questions", async () => {
    signInAs("editor");
    const today = localDateString(new Date(), "Africa/Harare");
    const scheduled = await daily.scheduleDailyQuestionAction(null, form({ date: addDays(today, 2), qualificationId: chain.qualification.id, subjectId: chain.subject.id, questionId }));
    expect(outcome(scheduled)).toBe("ok");
    expect(scheduled?.ok && scheduled.redirectTo).toBe(`/admin/daily-questions?qualification=${chain.qualification.id}&subject=${chain.subject.id}`);
    const wide = await daily.autoPickDailyQuestionAction(null, form({ date: addDays(today, 4), qualificationId: chain.qualification.id, subjectId: "all" }));
    expect(outcome(wide)).toBe("ok");
    const wideId = wide?.ok ? (wide.data as { id: string }).id : "";
    expect(await db.dailyQuestion.findUniqueOrThrow({ where: { id: wideId }, select: { subjectId: true } })).toEqual({ subjectId: null });
    expect(outcome(await daily.clearDailyQuestionAction(null, form({ dailyQuestionId: wideId })))).toBe("ok");
    expect(outcome(await daily.scheduleDailyQuestionAction(null, form({ date: "not-a-day", qualificationId: chain.qualification.id, subjectId: chain.subject.id, questionId })))).toBe("VALIDATION");
  });
});
