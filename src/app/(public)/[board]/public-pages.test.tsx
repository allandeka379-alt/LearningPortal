import type { Metadata } from "next";
import type { ReactElement, ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { APP_NAME } from "@/lib/config";
import { createSeoFixture, type SeoFixture } from "@/server/seo/testing";

/**
 * Route-level tests of the public SEO curriculum pages (§44): each page's Server Component loads real data from the
 * test database and renders to HTML. Checks 404s for unknown / reserved / hidden slugs, that FREE and PREMIUM content
 * never reaches the HTML (only titles of locked lessons), metadata shape and JSON-LD. `next/link` and `notFound()` are
 * mocked; nothing here reads cookies or headers (the routes must stay static).
 */

class NotFoundSignal extends Error {}

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));
vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  notFound: () => {
    throw new NotFoundSignal("not found");
  },
  // The topic page's practice sample is a client island (it reloads the page when its question changed).
  useRouter: () => ({ refresh: vi.fn(), push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
}));
// The routes must never touch request data: fail loudly if any of them does.
vi.mock("next/headers", () => ({
  cookies: () => {
    throw new Error("public SEO routes must not read cookies");
  },
  headers: () => {
    throw new Error("public SEO routes must not read headers");
  },
}));

type Params = Record<string, string>;
type PageModule = {
  default: (props: { params: Promise<Params> }) => Promise<ReactElement>;
  generateMetadata: (props: { params: Promise<Params> }) => Promise<Metadata>;
  generateStaticParams: () => Params[] | Promise<Params[]>;
  revalidate: number;
};

const boardPage = () => import("./page") as unknown as Promise<PageModule>;
const qualificationPage = () => import("./[qualification]/page") as unknown as Promise<PageModule>;
const subjectPage = () => import("./[qualification]/[subject]/page") as unknown as Promise<PageModule>;
const topicPage = () => import("./[qualification]/[subject]/[topic]/page") as unknown as Promise<PageModule>;
const boardGuidePage = () => import("./guides/[slug]/page") as unknown as Promise<PageModule>;
const qualificationGuidePage = () => import("./[qualification]/guides/[slug]/page") as unknown as Promise<PageModule>;
const subjectGuidePage = () => import("./[qualification]/[subject]/guides/[slug]/page") as unknown as Promise<PageModule>;

async function render(load: () => Promise<PageModule>, params: Params): Promise<string> {
  const page = (await load()).default;
  return renderToStaticMarkup(await page({ params: Promise.resolve(params) }));
}

async function metadata(load: () => Promise<PageModule>, params: Params): Promise<Metadata> {
  return (await load()).generateMetadata({ params: Promise.resolve(params) });
}

async function expectNotFound(load: () => Promise<PageModule>, params: Params): Promise<void> {
  await expect(render(load, params)).rejects.toBeInstanceOf(NotFoundSignal);
  const meta = await metadata(load, params);
  expect(meta.robots).toEqual({ index: false, follow: false });
}

/** JSON-LD blocks of a rendered page, parsed. */
function jsonLd(html: string): Record<string, unknown>[] {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1] ?? "null") as unknown);
  return blocks.flatMap((block) => (Array.isArray(block) ? (block as Record<string, unknown>[]) : [block as Record<string, unknown>]));
}

function expectNoSecrets(html: string, fx: SeoFixture): void {
  for (const secret of fx.secrets) expect(html, `leaked: ${secret}`).not.toContain(secret);
}

let fx: SeoFixture;

beforeAll(async () => {
  fx = await createSeoFixture();
});

describe("route configuration", () => {
  it("is ISR-cached hourly", async () => {
    for (const load of [boardPage, qualificationPage, subjectPage, topicPage, boardGuidePage, qualificationGuidePage, subjectGuidePage]) {
      expect((await load()).revalidate).toBe(3600);
    }
  });

  it("prebuilds listed catalogue pages and leaves topics to first request", async () => {
    const { board, qualification, subject } = fx.slugs;
    expect(await (await boardPage()).generateStaticParams()).toContainEqual({ board });
    expect(await (await qualificationPage()).generateStaticParams()).toContainEqual({ board, qualification });
    const subjects = await (await subjectPage()).generateStaticParams();
    expect(subjects).toContainEqual({ board, qualification, subject });
    expect(subjects).not.toContainEqual({ board, qualification, subject: fx.hiddenSubject.slug });
    expect(subjects).not.toContainEqual({ board, qualification, subject: fx.nonPublicSubject.slug });
    expect(await (await topicPage()).generateStaticParams()).toEqual([]);
  });
});

describe("/[board]", () => {
  it("lists the board's qualifications with board JSON-LD", async () => {
    const html = await render(boardPage, { board: fx.slugs.board });
    expect(html).toContain(fx.chain.qualification.name);
    expect(html).toContain(`href="/${fx.slugs.board}/${fx.slugs.qualification}"`);
    expect(html).toContain(`Board guide ${fx.marker}`);
    expect(html).toContain("not affiliated with or endorsed by");
    const types = jsonLd(html).map((block) => block["@type"]);
    expect(types).toEqual(["CollectionPage", "BreadcrumbList"]);
  });

  it.each(["app", "admin", "api", "login", "pricing", "schools", "legal", "daily", "s", "r", "onboarding", "exam-countdown", "subjects"])(
    "never captures the reserved first segment /%s",
    async (board) => {
      await expectNotFound(boardPage, { board });
      await expectNotFound(qualificationPage, { board, qualification: "anything" });
    },
  );

  it("404s unknown and malformed boards", async () => {
    await expectNotFound(boardPage, { board: `no-such-board-${fx.marker}` });
    await expectNotFound(boardPage, { board: "Not A Slug" });
  });
});

describe("/[board]/[qualification]", () => {
  it("lists listed public subjects by category, exam sessions and guides", async () => {
    const html = await render(qualificationPage, { board: fx.slugs.board, qualification: fx.slugs.qualification });
    expect(html).toContain(fx.chain.subject.name);
    expect(html).toContain(fx.draftOnlySubject.name);
    expect(html).toContain("Coming soon");
    expect(html).not.toContain(fx.hiddenSubject.name);
    expect(html).not.toContain(fx.nonPublicSubject.name);
    expect(html).toContain(fx.examSessionName);
    expect(html).toContain("Provisional dates");
    expect(html).toContain(`Qualification guide ${fx.marker}`);
  });

  it("404s an unknown qualification and the guides segment", async () => {
    await expectNotFound(qualificationPage, { board: fx.slugs.board, qualification: `nope-${fx.marker}` });
    await expectNotFound(qualificationPage, { board: fx.slugs.board, qualification: "guides" });
  });
});

describe("/[board]/[qualification]/[subject]", () => {
  const params = () => ({ board: fx.slugs.board, qualification: fx.slugs.qualification, subject: fx.slugs.subject });

  it("shows the syllabus, topic list, exam sessions, PUBLIC samples and real counts, but no locked content", async () => {
    const html = await render(subjectPage, params());
    expect(html).toContain(fx.chain.syllabus.versionLabel);
    expect(html).toContain(`Syllabus ${fx.chain.subject.officialCode}`);
    for (const topic of fx.chain.topics) expect(html).toContain(`href="/${fx.slugs.board}/${fx.slugs.qualification}/${fx.slugs.subject}/${topic.slug}"`);
    expect(html).toContain(`href="/${fx.slugs.board}/${fx.slugs.qualification}/${fx.slugs.subject}/${fx.slugs.subtopic}"`);
    expect(html).toContain(fx.examSessionName);
    expect(html).toContain(fx.publicTexts.questionStem);
    expect(html).toContain(fx.publicTexts.questionExplanation);
    expect(html).toContain("3 practice questions");
    expect(html).toContain("3 lessons");
    expect(html).toContain(`href="/${fx.slugs.board}/${fx.slugs.qualification}/${fx.slugs.subject}/guides/${fx.lessons.public.slug}"`);
    expectNoSecrets(html, fx);
  });

  it("emits Course + BreadcrumbList JSON-LD without invented ratings", async () => {
    const html = await render(subjectPage, params());
    const [course, breadcrumbs] = jsonLd(html);
    expect(course).toMatchObject({
      "@type": "Course",
      name: `${fx.chain.examBoard.shortName} ${fx.chain.qualification.shortName} ${fx.chain.subject.name}`,
      provider: { "@type": "EducationalOrganization", name: APP_NAME },
      teaches: fx.chain.topics.map((topic) => topic.name),
    });
    expect(JSON.stringify(course)).not.toMatch(/aggregateRating|review|ratingValue/);
    expect(breadcrumbs).toMatchObject({ "@type": "BreadcrumbList" });
    expect((breadcrumbs?.itemListElement as unknown[]).length).toBe(4);
  });

  it("has the §44 title, canonical URL and social cards", async () => {
    const meta = await metadata(subjectPage, params());
    const label = `${fx.chain.examBoard.shortName} ${fx.chain.qualification.shortName}`;
    expect(meta.title).toEqual({ absolute: `${label} ${fx.chain.subject.name} — topics, lessons and practice · ${APP_NAME}` });
    expect(meta.alternates).toEqual({ canonical: `/${fx.slugs.board}/${fx.slugs.qualification}/${fx.slugs.subject}` });
    expect(meta.openGraph).toMatchObject({ type: "website", siteName: APP_NAME, url: `/${fx.slugs.board}/${fx.slugs.qualification}/${fx.slugs.subject}` });
    expect(typeof meta.description).toBe("string");
    expect((meta.description ?? "").length).toBeGreaterThan(20);
    expect((meta.description ?? "").length).toBeLessThanOrEqual(160);
    expect(meta.robots).toBeUndefined();
  });

  it("hides non-public topics and their subtrees from the outline", async () => {
    const html = await render(subjectPage, { ...params(), subject: fx.hiddenTopics.subject.slug });
    expect(html).toContain(`/${fx.hiddenTopics.publicSlug}"`);
    expect(html).not.toContain(fx.hiddenTopics.hiddenSlug);
    expect(html).not.toContain(fx.hiddenTopics.hiddenChildSlug);
  });

  it("renders an honest, noindex page for a subject without a published syllabus", async () => {
    const subject = fx.draftOnlySubject.slug;
    const html = await render(subjectPage, { ...params(), subject });
    expect(html).toContain("The syllabus for this subject is being prepared");
    expect(html).toContain("Coming soon");
    expect((await metadata(subjectPage, { ...params(), subject })).robots).toEqual({ index: false, follow: true });
  });

  it("404s hidden, non-public and unknown subjects", async () => {
    await expectNotFound(subjectPage, { ...params(), subject: fx.hiddenSubject.slug });
    await expectNotFound(subjectPage, { ...params(), subject: fx.nonPublicSubject.slug });
    await expectNotFound(subjectPage, { ...params(), subject: `nope-${fx.marker}` });
    await expectNotFound(subjectPage, { ...params(), board: "admin" });
  });
});

describe("/[board]/[qualification]/[subject]/[topic]", () => {
  const params = (topic: string) => ({ board: fx.slugs.board, qualification: fx.slugs.qualification, subject: fx.slugs.subject, topic });

  it("shows objectives, subtopics, the PUBLIC preview and sample, and only titles of locked lessons", async () => {
    const html = await render(topicPage, params(fx.slugs.topic));
    expect(html).toContain(fx.topic.name);
    expect(html).toContain(`href="/${fx.slugs.board}/${fx.slugs.qualification}/${fx.slugs.subject}/${fx.slugs.subtopic}"`);
    expect(html).toContain("3 practice questions");
    // Open sample: the PUBLIC lesson's summary excerpt and its guide link.
    expect(html).toContain("Open to read");
    expect(html).toContain(`Summary of Free guide ${fx.marker}`);
    expect(html).toContain(`/guides/${fx.lessons.public.slug}"`);
    // Locked lessons: title only, behind Full access (no free tier since 2026-10-12).
    expect(html).toContain(`Account lesson ${fx.marker}`);
    expect(html).toContain(`Premium lesson ${fx.marker}`);
    expect(html).toContain("Full access");
    expect(html).not.toContain("Free with an account");
    // The PUBLIC sample (tagged to a subtopic) is answerable on the page; its explanation only comes back from marking.
    expect(html).toContain(fx.publicTexts.questionStem);
    expect(html).not.toContain(fx.publicTexts.questionExplanation);
    expect(html).toContain(">Check answer<");
    expect(html).toMatch(/<input[^>]*type="radio"/);
    expectNoSecrets(html, fx);
    const types = jsonLd(html).map((block) => block["@type"]);
    expect(types).toEqual(["LearningResource", "BreadcrumbList"]);
  });

  it("shows a subtopic's learning objectives with its ancestors in the breadcrumb", async () => {
    const html = await render(topicPage, params(fx.slugs.subtopic));
    expect(html).toContain("Learning objectives");
    expect(html).toContain(`Objective 1 of ${fx.subtopic.name}`);
    expect(html).toContain(`href="/${fx.slugs.board}/${fx.slugs.qualification}/${fx.slugs.subject}/${fx.slugs.topic}"`);
    const breadcrumbs = jsonLd(html).find((block) => block["@type"] === "BreadcrumbList");
    expect((breadcrumbs?.itemListElement as unknown[]).length).toBe(6);
    // The PUBLIC sample is tagged to this subtopic.
    expect(html).toContain(fx.publicTexts.questionStem);
    expectNoSecrets(html, fx);
  });

  it("titles the topic after its subject", async () => {
    const meta = await metadata(topicPage, params(fx.slugs.topic));
    expect(meta.title).toEqual({
      absolute: `${fx.topic.name} — ${fx.chain.examBoard.shortName} ${fx.chain.qualification.shortName} ${fx.chain.subject.name} · ${APP_NAME}`,
    });
    expect(meta.alternates).toEqual({ canonical: `/${fx.slugs.board}/${fx.slugs.qualification}/${fx.slugs.subject}/${fx.slugs.topic}` });
  });

  it("does not show a sample on a topic without PUBLIC questions", async () => {
    const other = fx.chain.topics[1];
    if (!other) throw new Error("fixture needs two topics");
    const html = await render(topicPage, params(other.slug));
    expect(html).not.toContain(fx.publicTexts.questionStem);
    expect(html).toContain("Lessons for this topic are being prepared.");
    expectNoSecrets(html, fx);
  });

  it("404s unknown, non-public and guarded topics", async () => {
    await expectNotFound(topicPage, params(`nope-${fx.marker}`));
    await expectNotFound(topicPage, params("guides"));
    const hidden = { board: fx.slugs.board, qualification: fx.slugs.qualification, subject: fx.hiddenTopics.subject.slug };
    await expectNotFound(topicPage, { ...hidden, topic: fx.hiddenTopics.hiddenSlug });
    // A public child under a non-public topic is not reachable either.
    await expectNotFound(topicPage, { ...hidden, topic: fx.hiddenTopics.hiddenChildSlug });
    // No topic pages for a subject without a published version.
    await expectNotFound(topicPage, { ...hidden, subject: fx.draftOnlySubject.slug, topic: fx.slugs.topic });
  });
});

describe("guides", () => {
  it("renders a subject guide (PUBLIC lesson) in full with Article JSON-LD", async () => {
    const params = { board: fx.slugs.board, qualification: fx.slugs.qualification, subject: fx.slugs.subject, slug: fx.lessons.public.slug };
    const html = await render(subjectGuidePage, params);
    expect(html).toContain(fx.publicTexts.lessonBody);
    expect(html).toContain("Source and licence");
    expect(jsonLd(html).map((block) => block["@type"])).toEqual(["Article", "BreadcrumbList"]);
    const meta = await metadata(subjectGuidePage, params);
    expect(meta.openGraph).toMatchObject({ type: "article" });
  });

  it("never serves FREE or PREMIUM lessons as guides", async () => {
    const base = { board: fx.slugs.board, qualification: fx.slugs.qualification, subject: fx.slugs.subject };
    await expectNotFound(subjectGuidePage, { ...base, slug: fx.lessons.free.slug });
    await expectNotFound(subjectGuidePage, { ...base, slug: fx.lessons.premium.slug });
  });

  it("serves board and qualification guides only under their own scope", async () => {
    const boardHtml = await render(boardGuidePage, { board: fx.slugs.board, slug: fx.boardGuide.slug });
    expect(boardHtml).toContain(`BOARD-GUIDE-BODY-${fx.marker}`);
    const qualificationHtml = await render(qualificationGuidePage, { board: fx.slugs.board, qualification: fx.slugs.qualification, slug: fx.qualificationGuide.slug });
    expect(qualificationHtml).toContain(`QUALIFICATION-GUIDE-BODY-${fx.marker}`);
    await expectNotFound(boardGuidePage, { board: fx.slugs.board, slug: fx.qualificationGuide.slug });
    await expectNotFound(qualificationGuidePage, { board: fx.slugs.board, qualification: fx.slugs.qualification, slug: fx.boardGuide.slug });
    await expectNotFound(boardGuidePage, { board: "app", slug: fx.boardGuide.slug });
  });
});

describe("topic page practice sample (FREE content)", () => {
  it("shows a FREE question as an answerable sample without its answer, and never a PREMIUM one", async () => {
    const { createCurriculumChain } = await import("../../../../tests/factories/curriculum");
    const { createQuestion } = await import("../../../../tests/factories/questions");
    const chain = await createCurriculumChain({ topicCount: 2, subtopicsPerTopic: 0, lessonsPerTopic: 0 });
    const [freeTopic, premiumTopic] = chain.topics;
    if (!freeTopic || !premiumTopic) throw new Error("fixture needs two topics");
    const marker = `${chain.subject.slug}`;
    const context = { subjectId: chain.subject.id, syllabusId: chain.syllabus.id, topicIds: chain.topics.map((topic) => topic.id) };
    await createQuestion("TRUE_FALSE", { context, topicId: freeTopic.id, accessTier: "FREE", stem: `FREE-SAMPLE-STEM-${marker}`, explanation: `FREE-SAMPLE-EXPLANATION-${marker}` });
    await createQuestion("MULTIPLE_CHOICE", { context, topicId: premiumTopic.id, accessTier: "PREMIUM", stem: `PREMIUM-STEM-${marker}`, explanation: `PREMIUM-EXPLANATION-${marker}` });
    const base = { board: chain.examBoard.slug, qualification: chain.qualification.slug, subject: chain.subject.slug };

    const html = await render(topicPage, { ...base, topic: freeTopic.slug });
    expect(html).toContain(`FREE-SAMPLE-STEM-${marker}`);
    expect(html).not.toContain(`FREE-SAMPLE-EXPLANATION-${marker}`);
    expect(html).toContain(">Check answer<");
    expect(html).not.toMatch(/isCorrect|answerSpec/);

    const premiumHtml = await render(topicPage, { ...base, topic: premiumTopic.slug });
    expect(premiumHtml).not.toContain(`PREMIUM-STEM-${marker}`);
    expect(premiumHtml).not.toContain(`PREMIUM-EXPLANATION-${marker}`);
    expect(premiumHtml).not.toContain(">Check answer<");

    // The subject page's static samples (answers in the HTML) stay PUBLIC-only.
    const subjectHtml = await render(subjectPage, base);
    expect(subjectHtml).not.toContain(`FREE-SAMPLE-STEM-${marker}`);
    expect(subjectHtml).not.toContain(`FREE-SAMPLE-EXPLANATION-${marker}`);
  });
});
