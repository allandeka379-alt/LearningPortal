import type { ReactElement, ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Actor } from "@/server/auth/actor";
import type { StudyPackCard, StudyPackDetail } from "@/server/study-packs/catalogue";

/**
 * The study-pack catalogue and landing pages (§24) rendered to HTML with the services mocked (the services themselves
 * are covered against Postgres in src/server/study-packs/catalogue.integration.test.ts): every value shown comes from
 * the read model, "Buy" goes to the existing checkout, owned packs have no buy button, unknown slugs are 404.
 */

class NotFoundSignal extends Error {}

const actor = { userId: "0190d000-0000-7000-8000-0000000000aa", roles: ["STUDENT"], timeZone: "Africa/Harare", studentOnboardingCompleted: true } as unknown as Actor;

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));
vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new NotFoundSignal("not found");
  },
}));
vi.mock("@/server/auth/guards", () => ({ requireOnboardedStudent: vi.fn(async () => actor) }));

const listStudyPacksForStudent = vi.fn();
const getStudyPackForStudent = vi.fn();
vi.mock("@/server/study-packs/catalogue", () => ({
  STUDY_PACKS_PATH: "/app/study-packs",
  studyPackPath: (slug: string) => `/app/study-packs/${slug}`,
  listStudyPacksForStudent: (...args: unknown[]) => listStudyPacksForStudent(...args),
  getStudyPackForStudent: (...args: unknown[]) => getStudyPackForStudent(...args),
}));

const card: StudyPackCard = {
  id: "0190d000-0000-7000-8000-0000000000p1",
  slug: "o-level-maths-complete",
  title: "O-Level Mathematics Complete",
  subtitle: "Every topic of Paper 1 and 2",
  isFeatured: true,
  isDemo: false,
  href: "/app/study-packs/o-level-maths-complete",
  scopes: [{ kind: "SUBJECT", label: "ZIMSEC O-Level Mathematics", qualificationId: "q", subjectId: "s" }],
  forYourSubjects: true,
  unlocks: [
    { key: "lessons", label: "Full lessons for every topic", included: true },
    { key: "flashcards", label: "Flashcards with spaced repetition", included: true },
  ],
  prices: [
    { planPriceId: "pp1", currency: "USD", amountMinor: 900, interval: "ONE_OFF", intervalCount: 1, periodDays: null, label: null },
    { planPriceId: "pp2", currency: "USD", amountMinor: 500, interval: "ONE_OFF", intervalCount: 1, periodDays: 90, label: "Exam season" },
  ],
  fromPrices: [{ planPriceId: "pp2", currency: "USD", amountMinor: 500, interval: "ONE_OFF", intervalCount: 1, periodDays: 90, label: "Exam season" }],
  ownership: { state: "none" },
  checkoutHref: "/app/billing/checkout?pack=0190d000-0000-7000-8000-0000000000p1",
};

const detail: StudyPackDetail = {
  ...card,
  descriptionHtml: "<p>Built from <strong>published</strong> lessons.</p>" as StudyPackDetail["descriptionHtml"],
  forYourQualification: true,
  contents: { lessons: 12, questions: 340, flashcards: 80, assessments: 4 },
};

type PageModule = { default: (props: { params?: Promise<Record<string, string>> }) => Promise<ReactElement> };

async function render(load: () => Promise<unknown>, params?: Record<string, string>): Promise<string> {
  const { default: page } = (await load()) as PageModule;
  return renderToStaticMarkup(await page(params ? { params: Promise.resolve(params) } : {}));
}

const catalogue = () => import("./page");
const landing = () => import("./[slug]/page");

beforeEach(() => {
  listStudyPacksForStudent.mockReset();
  getStudyPackForStudent.mockReset();
});

describe("/app/study-packs", () => {
  it("lists packs with scope, what they unlock, the from-price and a link to the landing page", async () => {
    listStudyPacksForStudent.mockResolvedValue({ qualificationLabels: ["ZIMSEC O-Level"], packs: [card] });
    const html = await render(catalogue);
    expect(html).toContain("Complete packs for ZIMSEC O-Level");
    expect(html).toContain("O-Level Mathematics Complete");
    expect(html).toContain("ZIMSEC O-Level Mathematics");
    expect(html).toContain("Flashcards with spaced repetition");
    expect(html).toContain("From US$5.00");
    expect(html).toContain('href="/app/study-packs/o-level-maths-complete"');
    expect(html).toContain("For your subjects");
  });

  it("says honestly when nothing is published for the student's qualification", async () => {
    listStudyPacksForStudent.mockResolvedValue({ qualificationLabels: ["ZIMSEC O-Level"], packs: [] });
    expect(await render(catalogue)).toContain("No study packs for ZIMSEC O-Level yet");
  });
});

describe("/app/study-packs/[slug]", () => {
  it("shows counts, unlocks, description and prices, and buys through the existing checkout", async () => {
    getStudyPackForStudent.mockResolvedValue(detail);
    const html = await render(landing, { slug: detail.slug });
    expect(getStudyPackForStudent).toHaveBeenCalledWith(actor, detail.slug);
    expect(html).toContain("What’s inside");
    expect(html).toContain(">340<");
    expect(html).toContain("<strong>published</strong>");
    expect(html).toContain("US$9.00 one-off");
    expect(html).toContain("US$5.00 for 90 days");
    expect(html).toContain("Exam season");
    expect(html.match(/href="\/app\/billing\/checkout\?pack=0190d000-0000-7000-8000-0000000000p1"/g)?.length).toBeGreaterThanOrEqual(1);
  });

  it("has no buy button once the pack is unlocked, notes a pack for another qualification, and 404s unknown slugs", async () => {
    getStudyPackForStudent.mockResolvedValue({ ...detail, ownership: { state: "active", endsAt: null }, checkoutHref: null, forYourQualification: false });
    const html = await render(landing, { slug: detail.slug });
    expect(html).toContain("Unlocked");
    expect(html).not.toContain("/app/billing/checkout");
    expect(html).toContain("a qualification you don’t study yet");

    getStudyPackForStudent.mockResolvedValue(null);
    await expect(render(landing, { slug: "nope" })).rejects.toBeInstanceOf(NotFoundSignal);
  });
});
