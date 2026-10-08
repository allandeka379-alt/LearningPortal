import { readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { resultHref } from "@/components/search/links";
import { isGuideSlug, isPublicBoardSlug, isPublicSegmentSlug } from "@/server/seo/routing";
import {
  buildAssessmentDocument,
  buildFlashcardDocument,
  buildLessonDocument,
  buildQuestionDocument,
  buildStudyPackDocument,
  buildSubjectDocument,
  buildTopicDocument,
} from "./documents";
import {
  SEARCHABLE_ENTITY_TYPES,
  type BoardRef,
  type BuildContext,
  type LessonSource,
  type QualificationRef,
  type SearchableEntityType,
  type SearchDocumentInput,
  type SubjectRef,
  type SyllabusRef,
  type TopicRef,
} from "./types";

/**
 * Every SearchDocument URL pattern (src/server/search/documents.ts "URL path scheme") and every href the search page
 * builds from it (`resultHref`) must resolve to a route that exists under `src/app` and would not 404 on its slug
 * guards (§28). Regression test for search results that linked to `/study-packs/{slug}` and `/guides/{slug}` when
 * neither route existed: under Next's matching those paths fell through to the public `[board]` tree, whose pages
 * refuse reserved board slugs ("study-packs", "guides") with a 404.
 */

// ---------------------------------------------------------------------------------------------------------------------
// The app's route table, read from the file system (pages and route handlers), matched like the App Router
// ---------------------------------------------------------------------------------------------------------------------

const APP_DIR = path.join(process.cwd(), "src", "app");

type RouteSegment = { kind: "static"; value: string } | { kind: "dynamic"; name: string } | { kind: "catchAll"; name: string; optional: boolean };

interface RouteNode {
  children: Map<string, RouteNode>;
  segment: RouteSegment | null;
  /** A page.tsx or route.ts lives here. */
  leaf: boolean;
}

function parseSegment(name: string): RouteSegment {
  const optional = /^\[\[\.\.\.(.+)\]\]$/.exec(name);
  if (optional?.[1]) return { kind: "catchAll", name: optional[1], optional: true };
  const catchAll = /^\[\.\.\.(.+)\]$/.exec(name);
  if (catchAll?.[1]) return { kind: "catchAll", name: catchAll[1], optional: false };
  const dynamic = /^\[(.+)\]$/.exec(name);
  if (dynamic?.[1]) return { kind: "dynamic", name: dynamic[1] };
  return { kind: "static", value: name };
}

function newNode(segment: RouteSegment | null): RouteNode {
  return { children: new Map(), segment, leaf: false };
}

/** Builds the route trie: route groups `(x)` add no segment; private `_x` and slot `@x` folders are not routes. */
function buildRouteTree(): RouteNode {
  const root = newNode(null);
  const walk = (dir: string, node: RouteNode) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isFile() && /^(page|route)\.(tsx?|jsx?)$/.test(entry.name)) node.leaf = true;
      if (!entry.isDirectory() || entry.name.startsWith("_") || entry.name.startsWith("@")) continue;
      const full = path.join(dir, entry.name);
      if (/^\(.+\)$/.test(entry.name)) {
        walk(full, node);
        continue;
      }
      let child = node.children.get(entry.name);
      if (!child) {
        child = newNode(parseSegment(entry.name));
        node.children.set(entry.name, child);
      }
      walk(full, child);
    }
  };
  walk(APP_DIR, root);
  return root;
}

const ROUTES = buildRouteTree();

/** Matches path segments, static before dynamic before catch-all, backtracking when a branch has no route. */
function matchRoute(node: RouteNode, segments: readonly string[], trail: string[] = []): string[] | null {
  if (segments.length === 0) {
    if (node.leaf) return trail;
    for (const [name, child] of node.children) {
      if (child.segment?.kind === "catchAll" && child.segment.optional && child.leaf) return [...trail, name];
    }
    return null;
  }
  const [head, ...rest] = segments as [string, ...string[]];
  const children = [...node.children.entries()];
  const rank = (segment: RouteSegment | null) => (segment?.kind === "static" ? 0 : segment?.kind === "dynamic" ? 1 : 2);
  children.sort(([, a], [, b]) => rank(a.segment) - rank(b.segment));
  for (const [name, child] of children) {
    const segment = child.segment;
    if (!segment) continue;
    if (segment.kind === "static" && segment.value !== head) continue;
    if (segment.kind === "catchAll") {
      if (child.leaf) return [...trail, name];
      continue;
    }
    const found = matchRoute(child, rest, [...trail, name]);
    if (found) return found;
  }
  return null;
}

/**
 * The route a path renders, or null when it 404s: no route matches, or it lands in the public curriculum tree with a
 * segment its page refuses (reserved board slugs such as "study-packs" or "guides", malformed slugs).
 */
function resolvePath(href: string): string | null {
  const pathname = new URL(href, "http://app.test").pathname;
  const segments = pathname.split("/").filter((s) => s !== "").map(decodeURIComponent);
  const route = matchRoute(ROUTES, segments);
  if (!route) return null;
  if (route[0] === "[board]") {
    for (const [index, name] of route.entries()) {
      const value = segments[index] ?? "";
      if (name === "[board]" && !isPublicBoardSlug(value)) return null;
      if ((name === "[qualification]" || name === "[subject]" || name === "[topic]") && !isPublicSegmentSlug(value)) return null;
      if (name === "[slug]" && !isGuideSlug(value)) return null;
    }
  }
  return `/${route.join("/")}`;
}

// ---------------------------------------------------------------------------------------------------------------------
// One document per branch of the URL path scheme, built by the real (pure) builders
// ---------------------------------------------------------------------------------------------------------------------

const updatedAt = new Date("2026-10-01T08:00:00Z");
const ID = {
  subject: "0190d000-0000-7000-8000-000000000001",
  syllabus: "0190d000-0000-7000-8000-000000000002",
  root: "0190d000-0000-7000-8000-000000000003",
  topic: "0190d000-0000-7000-8000-000000000004",
  lesson: "0190d000-0000-7000-8000-000000000005",
  question: "0190d000-0000-7000-8000-000000000006",
  flashcard: "0190d000-0000-7000-8000-000000000007",
  assessment: "0190d000-0000-7000-8000-000000000008",
  pack: "0190d000-0000-7000-8000-000000000009",
};
const board: BoardRef = { id: "b1", slug: "zimsec", code: "ZIMSEC", name: "Zimbabwe School Examinations Council", shortName: "ZIMSEC", catalogueStatus: "AVAILABLE" };
const qualification: QualificationRef = {
  id: "q1",
  slug: "o-level",
  code: null,
  name: "ZIMSEC Ordinary Level",
  shortName: "O-Level",
  catalogueStatus: "AVAILABLE",
  level: { id: "l1", slug: "o-level", name: "O-Level", shortName: "O Level" },
  examBoard: board,
};
const subject: SubjectRef = {
  id: ID.subject,
  slug: "mathematics",
  name: "Mathematics",
  shortName: "Maths",
  officialCode: "4004",
  languageCode: "en",
  isPublic: true,
  catalogueStatus: "AVAILABLE",
  qualification,
};
const privateSubject: SubjectRef = { ...subject, isPublic: false };
const syllabus: SyllabusRef = { id: ID.syllabus, code: "4004", status: "CURRENT", subject };
const topic: TopicRef = { id: ID.topic, name: "Quadratic equations", slug: "quadratic-equations", code: "2.3", path: `${ID.root}/${ID.topic}`, kind: "SUBTOPIC", isPublic: true, syllabus };
const ctx: BuildContext = { ancestors: new Map([[ID.root, { id: ID.root, name: "Algebra" }]]) };
const content = { status: "PUBLISHED" as const, draftOfId: null, updatedAt };

const lesson = (over: Partial<LessonSource>): LessonSource => ({
  id: ID.lesson,
  kind: "STUDY_GUIDE",
  title: "How to revise",
  slug: "how-to-revise",
  summary: null,
  body: "Plan your week.",
  languageCode: "en",
  accessTier: "PUBLIC",
  ...content,
  subject: null,
  qualification: null,
  examBoard: null,
  topics: [],
  ...over,
});

const subjectSource = { ...subject, description: null, publicSummary: null, updatedAt, currentSyllabus: { id: ID.syllabus, code: "4004" } };
const topicSource = { ...topic, description: null, publicSummary: null, updatedAt };

/** Every branch of the path scheme, labelled. */
const CASES: { label: string; type: SearchableEntityType; doc: SearchDocumentInput | null }[] = [
  { label: "public subject (SEO page)", type: "SUBJECT", doc: buildSubjectDocument(subjectSource) },
  { label: "non-public subject (app)", type: "SUBJECT", doc: buildSubjectDocument({ ...subjectSource, isPublic: false }) },
  { label: "public topic (SEO page)", type: "TOPIC", doc: buildTopicDocument(topicSource, ctx) },
  { label: "non-public topic (app)", type: "TOPIC", doc: buildTopicDocument({ ...topicSource, isPublic: false }, ctx) },
  { label: "subject guide", type: "LESSON", doc: buildLessonDocument(lesson({ subject, topics: [{ topic, isPrimary: true }] }), ctx) },
  { label: "PUBLIC lesson of a non-public subject (app reader)", type: "LESSON", doc: buildLessonDocument(lesson({ subject: privateSubject }), ctx) },
  { label: "qualification guide", type: "LESSON", doc: buildLessonDocument(lesson({ qualification }), ctx) },
  { label: "board guide", type: "LESSON", doc: buildLessonDocument(lesson({ examBoard: board }), ctx) },
  { label: "general guide (no board)", type: "LESSON", doc: buildLessonDocument(lesson({}), ctx) },
  { label: "FREE lesson (app reader)", type: "LESSON", doc: buildLessonDocument(lesson({ kind: "LESSON", accessTier: "FREE", subject, topics: [{ topic, isPrimary: true }] }), ctx) },
  {
    label: "question",
    type: "QUESTION",
    doc: buildQuestionDocument(
      {
        id: ID.question,
        parentId: null,
        schoolId: null,
        ownerUserId: null,
        type: "SHORT_ANSWER",
        stem: "Solve x^2 = 4.",
        marks: 2,
        paperLabel: null,
        year: null,
        isExamStyle: false,
        languageCode: "en",
        accessTier: "FREE",
        ...content,
        subject,
        topics: [{ topic, isPrimary: true }],
      },
      ctx,
    ),
  },
  {
    label: "flashcard",
    type: "FLASHCARD",
    doc: buildFlashcardDocument(
      { id: ID.flashcard, ownerUserId: null, cardType: "FORMULA", front: "Quadratic formula", languageCode: "en", accessTier: "FREE", ...content, subject, topics: [{ topic, isPrimary: true }] },
      ctx,
    ),
  },
  {
    label: "assessment",
    type: "ASSESSMENT",
    doc: buildAssessmentDocument(
      {
        id: ID.assessment,
        kind: "MOCK_EXAM",
        title: "Mock Paper 2",
        description: null,
        schoolId: null,
        ownerUserId: null,
        accessTier: "PREMIUM",
        ...content,
        subject,
        syllabus: { id: ID.syllabus, code: "4004", status: "CURRENT" },
        topics: [],
      },
      ctx,
    ),
  },
  {
    label: "study pack",
    type: "STUDY_PACK",
    doc: buildStudyPackDocument({
      id: ID.pack,
      slug: "o-level-maths-pack",
      title: "O-Level Mathematics Complete Study Pack",
      subtitle: null,
      description: null,
      isFeatured: false,
      ...content,
      scopes: [{ qualification: null, subject, syllabus: null }],
    }),
  },
];

describe("search URLs resolve to existing routes (§28)", () => {
  it("the route matcher sees the app's routes and refuses what would 404", () => {
    expect(resolvePath("/app/study-packs/o-level-maths-pack")).toBe("/app/study-packs/[slug]");
    expect(resolvePath("/guides/how-to-revise")).toBe("/guides/[slug]");
    expect(resolvePath("/zimsec/o-level/mathematics")).toBe("/[board]/[qualification]/[subject]");
    expect(resolvePath("/app/search/open?type=TOPIC")).toBe("/app/search/open");
    // The pre-fix study-pack URL fell through to the public [board] tree with a reserved board slug: a 404.
    expect(resolvePath("/study-packs/o-level-maths-pack")).toBeNull();
    expect(resolvePath("/app/no-such-page/at-all/really")).toBeNull();
  });

  it("covers every searchable entity type", () => {
    expect([...new Set(CASES.map((c) => c.type))].sort()).toEqual([...SEARCHABLE_ENTITY_TYPES].sort());
  });

  it.each(CASES.map((c) => [c.label, c] as const))("%s: the indexed path and the result link resolve", (_label, c) => {
    expect(c.doc, "the builder indexes this fixture").not.toBeNull();
    const doc = c.doc as SearchDocumentInput;
    expect(doc.entityType).toBe(c.type);
    expect(resolvePath(doc.path), `indexed path ${doc.path}`).not.toBeNull();
    const href = resultHref({ entityType: doc.entityType, entityId: doc.entityId, path: doc.path });
    expect(resolvePath(href), `result href ${href}`).not.toBeNull();
    const fallback = new URL(href, "http://app.test").searchParams.get("fallback");
    if (fallback) expect(resolvePath(fallback), `open fallback ${fallback}`).not.toBeNull();
  });
});
