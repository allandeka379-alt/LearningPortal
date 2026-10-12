import { randomUUID } from "node:crypto";
import type { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeAll, describe, expect, it, vi } from "vitest";

// Client islands read the router; outside the App Router they get inert stand-ins.
vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn(), push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => "/",
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

// The default since 2026-10-07: AI features switched off (never written to the shared DB).
const featureFlags = vi.hoisted(() => ({ ai: false, whatsapp: false, email: false, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), featureFlags),
);

import { localDateString, dateColumnFromLocalDate } from "@/lib/dates";
import { db } from "@/server/db";
import { createLearningSetup, type LearningSetup } from "../../../tests/factories/index";
import AboutPage from "./about/page";
import DailyQualificationPage from "./daily/[board]/[qualification]/page";
import DailyIndexPage from "./daily/page";
import ExamCountdownPage from "./exam-countdown/page";
import FaqPage from "./faq/page";
import CookiesPage from "./legal/cookies/page";
import PrivacyPage from "./legal/privacy/page";
import TermsPage from "./legal/terms/page";
import HomePage from "./page";
import PricingPage from "./pricing/page";
import SchoolsPage from "./schools/page";
import SubjectsPage from "./subjects/page";

/**
 * Smoke test of every public page against the (shared) test database: each page renders to HTML without throwing,
 * shows its fixed headings, and never needs a request (no cookies / headers: they would throw outside a request).
 */

async function html(page: ReactElement | Promise<ReactElement>): Promise<string> {
  return renderToStaticMarkup(await page);
}

describe("public pages render statically", () => {
  let setup: LearningSetup;

  beforeAll(async () => {
    setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1, lessonsPerTopic: 0 });
    const question = setup.questions[0];
    if (!question) throw new Error("fixture");
    await db.dailyQuestion.create({
      data: { date: dateColumnFromLocalDate(localDateString(new Date(), "Africa/Harare")), qualificationId: setup.qualificationId, subjectId: null, questionId: question.id },
    });
  });

  it("home: learning-first hero, public samples, school years and the closing call to action", async () => {
    const out = await html(HomePage());
    expect(out).toContain("Learn every topic. Be ready for every paper.");
    expect(out).toContain("Complete courses for Form 3 to Form 6");
    expect(out).not.toContain('id="ai-tutor"');
    expect(out).toContain('href="/register"');
    expect(out).not.toMatch(/start free|free account|free preview|free diagnostic/i);
    expect(out).toContain('id="learning"');
    expect(out).toContain('href="/daily"');
    expect(out).toContain('href="/exam-countdown"');
    expect(out).toContain('id="how-it-works"');
    expect(out).toContain('id="pricing"');
  }, 60_000);

  it("pricing, schools, subjects, faq, about and the countdown", async () => {
    expect(await html(PricingPage())).toContain("Pricing");
    const schools = await html(SchoolsPage());
    expect(schools).toContain('id="contact"');
    expect(schools).toContain('name="schoolName"');
    expect(await html(SubjectsPage())).toContain("Find your subjects");
    expect(await html(FaqPage())).toContain("Frequently asked questions");
    expect(await html(AboutPage())).toContain("What we believe");
    expect(await html(ExamCountdownPage())).toContain("Exam countdown");
  }, 60_000);

  it("legal drafts carry the review banner", async () => {
    for (const page of [PrivacyPage(), TermsPage(), CookiesPage()]) {
      expect(await html(page)).toContain("Draft — requires legal review before launch");
    }
  });

  it("daily: the selector and a qualification's question", async () => {
    expect(await html(DailyIndexPage())).toContain("Today&#x27;s question");
    const out = await html(
      DailyQualificationPage({ params: Promise.resolve({ board: setup.chain.examBoard.slug, qualification: setup.chain.qualification.slug }) }),
    );
    expect(out).toContain("Today&#x27;s TEB T-Level question");
    expect(out).toContain("Check answer");
    await expect(DailyQualificationPage({ params: Promise.resolve({ board: setup.chain.examBoard.slug, qualification: `missing-${randomUUID().slice(0, 8)}` }) })).rejects.toThrow(
      "NEXT_NOT_FOUND",
    );
  }, 60_000);
});
