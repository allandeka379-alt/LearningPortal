import type { ReactElement, ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeAll, describe, expect, it, vi } from "vitest";
import type { Role } from "@/generated/prisma/client";
import { ToastProvider } from "@/components/ui/Toast";
import { addDays, dateColumnFromLocalDate, localDateString } from "@/lib/dates";
import { createFaqItem } from "@/server/cms/faq/service";
import { createTestimonial, withdrawTestimonialConsent } from "@/server/cms/testimonials/service";
import { db } from "@/server/db";
import { createCurriculumChain, createQuestion, createUser, uniqueSuffix, type CurriculumChain } from "../../../tests/factories/index";

/**
 * Smoke tests of the daily-question calendar, FAQ and testimonial admin pages: each Server Component loads real data
 * from the test database and renders to HTML. The session guard, `next/link` and `notFound()` are mocked; nothing else.
 */

type TestActor = { kind: "user"; userId: string; roles: Role[]; displayName: string };
let currentActor: TestActor | null = null;

class NotFoundSignal extends Error {}

vi.mock("@/components/admin/guards", () => ({
  requireAdminPage: async () => {
    if (!currentActor) throw new Error("no actor");
    return currentActor;
  },
  requireAdminAction: async () => currentActor,
  requireAdminStepUpAction: async () => currentActor,
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
  usePathname: () => "/admin",
  notFound: () => {
    throw new NotFoundSignal("not found");
  },
  redirect: (to: string) => {
    throw new Error(`redirect ${to}`);
  },
}));
vi.mock("@/components/admin/step-up-actions", () => ({ confirmPasswordAction: vi.fn() }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn(), revalidateTag: vi.fn(), refresh: vi.fn(), updateTag: vi.fn() }));

type PageProps = { params: Promise<Record<string, string>>; searchParams: Promise<Record<string, string>> };
type PageComponent = (props: PageProps) => Promise<ReactElement> | ReactElement;
type PageModule = { default: unknown };

async function render(module: Promise<PageModule>, props: { params?: Record<string, string>; searchParams?: Record<string, string> } = {}): Promise<string> {
  const page = (await module).default as PageComponent;
  const element = await page({ params: Promise.resolve(props.params ?? {}), searchParams: Promise.resolve(props.searchParams ?? {}) });
  return renderToStaticMarkup(<ToastProvider>{element}</ToastProvider>);
}

const TODAY = localDateString(new Date(), "Africa/Harare");
let chain: CurriculumChain;
let faqId: string;
let faqLocale: string;
let testimonialId: string;
let withdrawnId: string;

beforeAll(async () => {
  const { user } = await createUser({ roles: ["CONTENT_EDITOR"] });
  currentActor = { kind: "user", userId: user.id, roles: ["CONTENT_EDITOR"], displayName: "Editor" };
  chain = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 0, lessonsPerTopic: 0 });
  const context = { subjectId: chain.subject.id, syllabusId: chain.syllabus.id, topicIds: chain.topics.map((t) => t.id) };
  const question = await createQuestion("MULTIPLE_CHOICE", { context, difficulty: 2, isDailyEligible: true, stem: "Which number is prime: 4, 6 or 7?" });
  await createQuestion("TRUE_FALSE", { context, difficulty: 3, isDailyEligible: true });
  await db.dailyQuestion.create({
    data: { date: dateColumnFromLocalDate(addDays(TODAY, 1)), qualificationId: chain.qualification.id, subjectId: chain.subject.id, questionId: question.id, isAutoSelected: false },
  });

  faqLocale = `en-${uniqueSuffix().slice(0, 8)}`;
  faqId = (await createFaqItem(currentActor, { question: "Can I study offline?", answer: "Yes, **lessons** you opened recently.", category: "general", locale: faqLocale })).id;
  const base = { quote: "Short and clear lessons.", consentRecordedAt: "2026-10-01T10:00", consentMethod: "signed_form" as const };
  testimonialId = (await createTestimonial(currentActor, { ...base, displayName: "Nyasha P.", descriptor: "Parent" })).id;
  withdrawnId = (await createTestimonial(currentActor, { ...base, displayName: "Gone Person" })).id;
  await withdrawTestimonialConsent(currentActor, { testimonialId: withdrawnId });
});

describe("daily-question calendar pages", () => {
  it("renders 14 days of a subject with the scheduled question and the scope summaries", async () => {
    const html = await render(import("./daily-questions/page"), { searchParams: { qualification: chain.qualification.id, subject: chain.subject.id } });
    expect(html).toContain("Daily questions");
    expect(html).toContain("Next 14 days: Test Mathematics");
    expect(html).toContain("Which number is prime");
    expect(html).toContain("Editor");
    expect(html).toContain("Whole qualification (mixed subjects)");
    expect(html).toContain("Pick now");
    expect(html.match(/<tr/g)?.length ?? 0).toBeGreaterThanOrEqual(14);
  });

  it("explains that the whole-qualification scope is editorial", async () => {
    const html = await render(import("./daily-questions/page"), { searchParams: { qualification: chain.qualification.id, subject: "all" } });
    expect(html).toContain("never fills it");
  });

  it("lists candidates for a day and 404s on a malformed link", async () => {
    const html = await render(import("./daily-questions/choose/page"), {
      searchParams: { qualification: chain.qualification.id, subject: chain.subject.id, date: addDays(TODAY, 2), pool: "all" },
    });
    expect(html).toContain("Choose the question for");
    expect(html).toContain("Use this");
    expect(html).toContain("Which number is prime");
    await expect(render(import("./daily-questions/choose/page"), { searchParams: { qualification: chain.qualification.id, subject: chain.subject.id } })).rejects.toBeInstanceOf(
      NotFoundSignal,
    );
  });
});

describe("FAQ pages", () => {
  it("lists entries by category, renders the new form and the editor with the public preview", async () => {
    const list = await render(import("./faq/page"), { searchParams: { locale: faqLocale } });
    expect(list).toContain("Can I study offline?");
    expect(list).toContain("Not published");
    expect(list).toContain("Move “Can I study offline?” up");
    expect(await render(import("./faq/new/page"))).toContain("Answer");
    const detail = await render(import("./faq/[id]/page"), { params: { id: faqId } });
    expect(detail).toContain("<strong>lessons</strong>");
    expect(detail).toContain("Publish");
    await expect(render(import("./faq/[id]/page"), { params: { id: "not-a-uuid" } })).rejects.toBeInstanceOf(NotFoundSignal);
  });
});

describe("testimonial pages", () => {
  it("renders the list, the new form, a testimonial and an erased one", async () => {
    expect(await render(import("./testimonials/page"), { searchParams: { state: "unpublished" } })).toContain("Testimonials");
    expect(await render(import("./testimonials/new/page"))).toContain("Consent given on");
    const detail = await render(import("./testimonials/[id]/page"), { params: { id: testimonialId } });
    expect(detail).toContain("Nyasha P.");
    expect(detail).toContain("Consent record");
    expect(detail).toContain("Signed consent form");
    expect(detail).toContain("Record withdrawal");
    const erased = await render(import("./testimonials/[id]/page"), { params: { id: withdrawnId } });
    expect(erased).toContain("Erased");
    expect(erased).not.toContain("Short and clear lessons.");
    expect(erased).not.toContain("Record withdrawal");
  });
});
