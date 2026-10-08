import { randomUUID } from "node:crypto";
import { describe, expect, it, vi } from "vitest";
import { NO_ENTITLEMENTS } from "@/lib/billing/entitlements";
import { addDays, localDateString } from "@/lib/dates";
import { invalidatePlanCache } from "@/server/billing/plans";
import { db } from "@/server/db";
import { createCurriculumChain, createExamSession, uniqueCode, uniqueSlug } from "../../../tests/factories/index";
import { getMarketingCatalogue } from "./catalogue";
import { getCountdownCatalogue } from "./countdown";
import { groupFaqs, listPublishedFaqs } from "./faq";
import { getPricingData } from "./pricing";
import { listPublishedTestimonials } from "./testimonials";

// The pricing comparison is tested with AI switched on (AI rows advertised): `features.ai` is on for this file (never written to the shared DB).
const featureFlags = vi.hoisted(() => ({ ai: true, whatsapp: false, email: false, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), featureFlags),
);

describe("getMarketingCatalogue (integration)", () => {
  it("lists listed boards and qualifications and only AVAILABLE subjects, with public links", async () => {
    const chain = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 0, lessonsPerTopic: 0 });
    const hidden = await db.subject.create({
      data: { qualificationId: chain.qualification.id, categoryId: chain.category.id, slug: uniqueSlug("hidden"), name: "Hidden Subject", catalogueStatus: "HIDDEN" },
    });
    const soon = await db.subject.create({
      data: { qualificationId: chain.qualification.id, categoryId: chain.category.id, slug: uniqueSlug("soon"), name: "Coming Subject", catalogueStatus: "COMING_SOON" },
    });

    const catalogue = await getMarketingCatalogue({ examBoardIds: [chain.examBoard.id] });
    const board = catalogue.boards.find((b) => b.id === chain.examBoard.id);
    expect(board).toMatchObject({ slug: chain.examBoard.slug, href: `/${chain.examBoard.slug}` });
    expect(board?.qualifications.map((q) => q.id)).toEqual([chain.qualification.id]);
    expect(catalogue.levels.find((l) => l.id === chain.level.id)?.qualifications.map((q) => q.id)).toEqual([chain.qualification.id]);

    const category = catalogue.subjectsByCategory.find((c) => c.category.id === chain.category.id);
    expect(category?.subjects).toEqual([
      {
        name: chain.subject.name,
        offerings: [{ subjectId: chain.subject.id, label: "TEB T-Level", href: `/${chain.examBoard.slug}/${chain.qualification.slug}/${chain.subject.slug}` }],
      },
    ]);
    const ids = catalogue.subjectsByCategory.flatMap((c) => c.subjects.flatMap((s) => s.offerings.map((o) => o.subjectId)));
    expect(ids).not.toContain(hidden.id);
    expect(ids).not.toContain(soon.id);
    expect(catalogue.subjectsByQualification.find((q) => q.qualification.id === chain.qualification.id)?.categories[0]?.subjects.map((s) => s.id)).toEqual([chain.subject.id]);
  });
});

describe("listPublishedFaqs (integration)", () => {
  it("returns published entries of the requested category in admin order, rendered", async () => {
    const category = `test-${randomUUID().slice(0, 8)}`;
    const now = new Date();
    await db.faqItem.createMany({
      data: [
        { question: "Second?", answer: "Answer **two**.", category, sortOrder: 2, isPublished: true, publishedAt: now },
        { question: "First?", answer: "Answer one.", category, sortOrder: 1, isPublished: true, publishedAt: now },
        { question: "Draft?", answer: "Not yet.", category, sortOrder: 0, isPublished: false },
        { question: "Mbudzi?", answer: "Shona entry.", category, sortOrder: 0, isPublished: true, publishedAt: now, locale: "sn" },
      ],
    });
    const items = await listPublishedFaqs({ categories: [category.toUpperCase()] });
    expect(items.map((item) => item.question)).toEqual(["First?", "Second?"]);
    expect(items[1]?.answerHtml).toContain("<strong>two</strong>");
    const groups = groupFaqs(items);
    expect(groups).toHaveLength(1);
    expect(groups[0]?.anchor).toBe(`faq-${category}`);
  });

  it("hides the AI tutor category while AI features are switched off (features.ai, owner decision 2026-10-07)", async () => {
    const question = `About the tutor ${randomUUID()}?`;
    const row = await db.faqItem.create({ data: { question, answer: "It explains step by step.", category: " AI ", sortOrder: 0, isPublished: true, publishedAt: new Date() } });
    try {
      const listed = async (options?: Parameters<typeof listPublishedFaqs>[0]) => (await listPublishedFaqs(options)).some((item) => item.id === row.id);
      expect(await listed({ limit: 200 })).toBe(true);
      expect(await listed({ categories: ["ai"] })).toBe(true);
      featureFlags.ai = false;
      expect(await listed({ limit: 200 })).toBe(false);
      expect(await listed({ categories: ["ai"] })).toBe(false);
    } finally {
      featureFlags.ai = true;
      await db.faqItem.delete({ where: { id: row.id } });
    }
  });
});

describe("listPublishedTestimonials (integration)", () => {
  it("shows published, consented testimonials only", async () => {
    const now = new Date();
    const marker = randomUUID().slice(0, 8);
    const published = await db.testimonial.create({
      data: {
        displayName: `Tariro ${marker}`,
        descriptor: "Form 4 student",
        quote: "It explained my mistakes.",
        consentRecordedAt: now,
        consentMethod: "signed_form",
        isPublished: true,
        publishedAt: now,
        sortOrder: -2_000_000_000,
      },
    });
    const unpublished = await db.testimonial.create({
      data: { displayName: `Draft ${marker}`, quote: "Not yet.", consentRecordedAt: now, consentMethod: "email", isPublished: false, sortOrder: -2_000_000_000 },
    });
    const list = await listPublishedTestimonials(24);
    const mine = list.filter((t) => t.id === published.id || t.id === unpublished.id);
    expect(mine).toEqual([{ id: published.id, displayName: `Tariro ${marker}`, descriptor: "Form 4 student", quote: "It explained my mistakes.", photo: null }]);
  });
});

describe("getCountdownCatalogue (integration)", () => {
  it("lists upcoming PUBLISHED sessions of listed qualifications, in date order", async () => {
    const chain = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 0, lessonsPerTopic: 0 });
    const today = localDateString(new Date(), "Africa/Harare");
    const later = await createExamSession(chain.qualification.id, { startsOn: addDays(today, 200), name: "Later session" });
    const sooner = await createExamSession(chain.qualification.id, { startsOn: addDays(today, 30), name: "Sooner session" });
    await db.examSession.update({ where: { id: sooner.id }, data: { isProvisional: false, confirmedAt: new Date() } });
    const ended = await createExamSession(chain.qualification.id, { startsOn: addDays(today, -10), name: "Ended session" });
    const draft = await createExamSession(chain.qualification.id, { startsOn: addDays(today, 40), name: "Draft session" });
    await db.examSession.update({ where: { id: draft.id }, data: { status: "DRAFT" } });

    const boards = await getCountdownCatalogue(new Date(), { examBoardIds: [chain.examBoard.id] });
    const qualification = boards.find((b) => b.slug === chain.examBoard.slug)?.qualifications.find((q) => q.id === chain.qualification.id);
    expect(qualification?.label).toBe("TEB T-Level");
    expect(qualification?.sessions.map((s) => s.id)).toEqual([sooner.id, later.id]);
    expect(qualification?.sessions[0]).toMatchObject({ startsOn: addDays(today, 30), isProvisional: false, isDemo: false });
    expect(qualification?.sessions.some((s) => s.id === ended.id)).toBe(false);
  });
});

describe("getPricingData (integration)", () => {
  it("returns a public plan with its USD prices (other currencies hidden for now) and builds its comparison column", async () => {
    const code = `T${uniqueCode("P").replace(/[^A-Z0-9]/gi, "").toUpperCase().slice(0, 20)}`;
    const plan = await db.plan.create({
      data: {
        code,
        name: `Test plan ${code}`,
        audience: "INDIVIDUAL",
        sortOrder: 9_999,
        highlights: ["All lessons"],
        entitlements: { ...NO_ENTITLEMENTS, lessonAccess: "ALL", mockExams: true, mockExamsPerMonth: 4 },
      },
    });
    await db.planPrice.createMany({
      data: [
        { planId: plan.id, currency: "USD", amountMinor: 500, interval: "MONTH" },
        { planId: plan.id, currency: "USD", amountMinor: 4800, interval: "YEAR" },
        { planId: plan.id, currency: "ZWG", amountMinor: 15000, interval: "MONTH" },
      ],
    });
    invalidatePlanCache();

    const pricing = await getPricingData();
    const mine = pricing.plans.find((p) => p.id === plan.id);
    expect(mine).toBeDefined();
    expect(mine?.highlights).toEqual(["All lessons"]);
    expect(mine?.prices.USD?.map((p) => [p.amountLabel, p.periodLabel])).toEqual([
      ["US$5", "per month"],
      ["US$48", "per year"],
    ]);
    // Owner decision 2026-10-07: USD only for now; the ZWG row stays in the database, hidden from buyers.
    expect(mine?.prices.ZWG).toBeUndefined();
    expect(pricing.currencies).toEqual(["USD"]);
    const column = pricing.plans.findIndex((p) => p.id === plan.id);
    const mockRow = pricing.comparison.flatMap((g) => g.rows).find((r) => r.key === "mockExamsPerMonth");
    expect(mockRow?.cells[column]).toEqual({ included: true, text: "4 a month" });
    expect(pricing.schoolPlans.some((p) => p.id === plan.id)).toBe(false);
  });
});
