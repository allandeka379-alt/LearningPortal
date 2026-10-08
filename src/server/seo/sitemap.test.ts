import { beforeAll, describe, expect, it } from "vitest";
import {
  listCatalogueSitemapEntries,
  listSitemapEntries,
  MARKETING_SITEMAP_ENTRIES,
  publicTopicRows,
  SITEMAP_CHUNK_SIZE,
  sitemapChunk,
  sitemapChunkCount,
  toSitemap,
  type SitemapEntry,
} from "./sitemap";
import { createSeoFixture, type SeoFixture } from "./testing";

describe("sitemap chunking (pure)", () => {
  it("needs one file per 45,000 URLs, never zero", () => {
    expect(sitemapChunkCount(0)).toBe(1);
    expect(sitemapChunkCount(SITEMAP_CHUNK_SIZE)).toBe(1);
    expect(sitemapChunkCount(SITEMAP_CHUNK_SIZE + 1)).toBe(2);
    expect(sitemapChunkCount(10, 4)).toBe(3);
  });

  it("slices chunks by id and returns nothing for bad ids", () => {
    const entries = Array.from({ length: 10 }, (_, i) => i);
    expect(sitemapChunk(entries, 0, 4)).toEqual([0, 1, 2, 3]);
    expect(sitemapChunk(entries, 2, 4)).toEqual([8, 9]);
    expect(sitemapChunk(entries, 3, 4)).toEqual([]);
    expect(sitemapChunk(entries, -1, 4)).toEqual([]);
    expect(sitemapChunk(entries, Number.NaN, 4)).toEqual([]);
  });

  it("drops non-public topics and everything below them", () => {
    const rows = [
      { id: "a", path: "a", isPublic: true },
      { id: "b", path: "a/b", isPublic: false },
      { id: "c", path: "a/b/c", isPublic: true },
      { id: "d", path: "a/d", isPublic: true },
    ];
    expect(publicTopicRows(rows).map((row) => row.id)).toEqual(["a", "d"]);
  });

  it("does not submit the noindex draft legal pages", () => {
    expect(MARKETING_SITEMAP_ENTRIES.filter((entry) => entry.path.startsWith("/legal"))).toEqual([]);
  });

  it("makes absolute URLs and keeps only known fields", () => {
    const lastModified = new Date("2026-10-01T00:00:00Z");
    const entries: SitemapEntry[] = [{ path: "/zimsec", lastModified, changeFrequency: "monthly", priority: 0.8 }, { path: "/" }];
    expect(toSitemap(entries, "https://dzidza.example")).toEqual([
      { url: "https://dzidza.example/zimsec", lastModified, changeFrequency: "monthly", priority: 0.8 },
      { url: "https://dzidza.example/" },
    ]);
  });
});

describe("sitemap contents (database)", () => {
  let fx: SeoFixture;
  let byPath: Map<string, SitemapEntry>;

  beforeAll(async () => {
    fx = await createSeoFixture();
    byPath = new Map((await listCatalogueSitemapEntries()).map((entry) => [entry.path, entry]));
  });

  const subjectBase = () => `/${fx.slugs.board}/${fx.slugs.qualification}/${fx.slugs.subject}`;

  it("lists the board, qualification and subject with lastModified from the database", () => {
    expect(byPath.get(`/${fx.slugs.board}`)?.lastModified).toEqual(fx.chain.examBoard.updatedAt);
    expect(byPath.get(`/${fx.slugs.board}/${fx.slugs.qualification}`)?.lastModified).toEqual(fx.chain.qualification.updatedAt);
    const subject = byPath.get(subjectBase());
    expect(subject?.lastModified).toBeInstanceOf(Date);
    expect(subject?.lastModified?.getTime()).toBeGreaterThanOrEqual(fx.chain.subject.updatedAt.getTime());
  });

  it("lists every public topic of the current version", () => {
    for (const topic of [...fx.chain.topics, ...fx.chain.subtopics]) {
      expect(byPath.has(`${subjectBase()}/${topic.slug}`), topic.slug).toBe(true);
    }
  });

  it("lists PUBLIC guides under their home scope, never FREE or PREMIUM lessons", () => {
    expect(byPath.has(`${subjectBase()}/guides/${fx.lessons.public.slug}`)).toBe(true);
    expect(byPath.has(`/${fx.slugs.board}/guides/${fx.boardGuide.slug}`)).toBe(true);
    expect(byPath.has(`/${fx.slugs.board}/${fx.slugs.qualification}/guides/${fx.qualificationGuide.slug}`)).toBe(true);
    const paths = [...byPath.keys()];
    expect(paths.some((path) => path.endsWith(`/${fx.lessons.free.slug}`))).toBe(false);
    expect(paths.some((path) => path.endsWith(`/${fx.lessons.premium.slug}`))).toBe(false);
  });

  it("leaves out hidden, non-public and syllabus-less subjects and non-public topic subtrees", () => {
    const qualificationBase = `/${fx.slugs.board}/${fx.slugs.qualification}`;
    expect(byPath.has(`${qualificationBase}/${fx.hiddenSubject.slug}`)).toBe(false);
    expect(byPath.has(`${qualificationBase}/${fx.nonPublicSubject.slug}`)).toBe(false);
    expect(byPath.has(`${qualificationBase}/${fx.draftOnlySubject.slug}`)).toBe(false);
    const hiddenBase = `${qualificationBase}/${fx.hiddenTopics.subject.slug}`;
    expect(byPath.has(hiddenBase)).toBe(true);
    expect(byPath.has(`${hiddenBase}/${fx.hiddenTopics.publicSlug}`)).toBe(true);
    expect(byPath.has(`${hiddenBase}/${fx.hiddenTopics.hiddenSlug}`)).toBe(false);
    expect(byPath.has(`${hiddenBase}/${fx.hiddenTopics.hiddenChildSlug}`)).toBe(false);
  });

  it("puts the marketing pages first and never lists private areas", async () => {
    const entries = await listSitemapEntries();
    expect(entries.slice(0, MARKETING_SITEMAP_ENTRIES.length)).toEqual(MARKETING_SITEMAP_ENTRIES);
    expect(entries.some((entry) => /^\/(app|admin|api|parent|teacher|school|onboarding|s)(\/|$)/.test(entry.path))).toBe(false);
    expect(new Set(entries.map((entry) => entry.path)).size).toBe(entries.length);
  });
});
