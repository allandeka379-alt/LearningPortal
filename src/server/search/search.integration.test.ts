import { createHash, randomInt, randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { Prisma } from "@/generated/prisma/client";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { clearSearchCatalogueCache } from "./catalogue";
import {
  documentFor,
  handleReindexEntityJob,
  reindexAll,
  reindexEntity,
  removeSearchDocument,
  upsertSearchDocuments,
} from "./indexer";
import { search, type SearchResponse } from "./query";
import { suggest } from "./suggest";
import type { SearchableEntityType, SearchDocumentInput } from "./types";

/**
 * Integration tests against the test database (app_rw role, CHECKs/triggers/RLS active). Fixtures are created inline
 * with unique values and go through the real content-workflow rules: rows are inserted PUBLISHED with approvedAt,
 * cleared copyright, a source and a ContentRevision snapshot in the same transaction (deferred snapshot trigger), and
 * topics are created while their syllabus is still DRAFT. Every assertion is scoped to this file's own subjects, codes
 * or unique words, because the shared test database is never truncated and other files run in parallel.
 */

const sfx = randomUUID().replace(/-/g, "").slice(0, 10);
const now = new Date();
const boardToken = `zb${sfx}`;
const mathCode = String(randomInt(10_000_000, 99_999_999));
const chemCode = String(randomInt(10_000_000, 99_999_999));
const relaxWord = `rx${sfx}`;

interface Fixture {
  boardSlug: string;
  mathId: string;
  chemId: string;
  algebraId: string;
  quadraticsId: string;
  stoichiometryId: string;
  lessons: {
    quadratic: string;
    algebraBasics: string;
    premium: string;
    chem: string;
    draft: string;
    guide: string;
    archived: string;
  };
  questions: { free: string; premium: string };
  flashcards: { platform: string; personal: string };
  assessmentId: string;
  studyPackId: string;
}

let fx: Fixture;
const probeSubjectId = randomUUID();

type Workflow = "LESSON" | "QUESTION" | "FLASHCARD" | "ASSESSMENT" | "STUDY_PACK";

async function snapshot(tx: Prisma.TransactionClient, entityType: Workflow, entityId: string): Promise<void> {
  const data = { fixture: "search-test", entityId };
  await tx.contentRevision.create({
    data: {
      entityType,
      entityId,
      revision: 1,
      snapshot: data,
      contentHash: createHash("sha256").update(JSON.stringify(data)).digest("hex"),
    },
  });
}

async function createFixture(): Promise<Fixture> {
  const source = await db.contentSource.create({
    data: { name: `Search test source ${sfx}`, slug: `search-src-${sfx}`, type: "ORIGINAL" },
  });
  const board = await db.examBoard.create({
    data: {
      slug: `zb-${sfx}`,
      code: `ZB${sfx}`.toUpperCase(),
      name: `Zed Board ${sfx}`,
      shortName: boardToken,
      catalogueStatus: "AVAILABLE",
    },
  });
  const level = await db.qualificationLevel.create({ data: { slug: `o-level-${sfx}`, name: "O-Level" } });
  const qualification = await db.qualification.create({
    data: {
      examBoardId: board.id,
      levelId: level.id,
      slug: "o-level",
      name: `Zed Ordinary Level ${sfx}`,
      shortName: "O-Level",
      catalogueStatus: "AVAILABLE",
    },
  });
  const category = await db.subjectCategory.create({ data: { slug: `search-cat-${sfx}`, name: "Search test" } });
  const subject = (slug: string, name: string, shortName: string | null, officialCode: string) =>
    db.subject.create({
      data: {
        qualificationId: qualification.id,
        categoryId: category.id,
        slug,
        name,
        shortName,
        officialCode,
        catalogueStatus: "AVAILABLE",
      },
    });
  const math = await subject("mathematics", "Mathematics", "Maths", mathCode);
  const chem = await subject("chemistry", "Chemistry", null, chemCode);

  // Topics are inserted while the version is DRAFT (published versions are structurally frozen), then it is published.
  async function syllabusWithTree(subjectId: string, code: string, root: string, child: string) {
    const syllabus = await db.syllabus.create({
      data: {
        subjectId,
        code,
        title: `Test syllabus ${code}`,
        versionLabel: "2026-2028",
        effectiveFrom: new Date("2026-01-01"),
        copyrightStatus: "OWNED",
        sourceId: source.id,
      },
    });
    const rootId = randomUUID();
    const childId = randomUUID();
    await db.topic.create({
      data: { id: rootId, syllabusId: syllabus.id, kind: "TOPIC", depth: 0, path: rootId, name: root, slug: root.toLowerCase().replace(/\W+/g, "-") },
    });
    await db.topic.create({
      data: {
        id: childId,
        syllabusId: syllabus.id,
        parentId: rootId,
        kind: "SUBTOPIC",
        depth: 1,
        path: `${rootId}/${childId}`,
        name: child,
        slug: child.toLowerCase().replace(/\W+/g, "-"),
      },
    });
    await db.syllabus.update({ where: { id: syllabus.id }, data: { status: "CURRENT", publishedAt: now } });
    return { syllabusId: syllabus.id, rootId, childId };
  }
  const mathTree = await syllabusWithTree(math.id, mathCode, "Algebra", "Quadratic equations");
  const chemTree = await syllabusWithTree(chem.id, chemCode, "Stoichiometry", "The mole");

  const publishedColumns = {
    status: "PUBLISHED",
    publishedAt: now,
    approvedAt: now,
    copyrightStatus: "OWNED",
    sourceId: source.id,
  } as const;

  const lesson = (data: {
    subjectId: string;
    title: string;
    body: string;
    accessTier: "PUBLIC" | "FREE" | "PREMIUM";
    topicId: string;
    kind?: "LESSON" | "STUDY_GUIDE";
    draft?: boolean;
  }) =>
    db.$transaction(async (tx) => {
      const row = await tx.lesson.create({
        data: {
          subjectId: data.subjectId,
          kind: data.kind ?? "LESSON",
          title: data.title,
          slug: `${data.title.toLowerCase().replace(/\W+/g, "-")}-${sfx}`,
          body: data.body,
          accessTier: data.accessTier,
          ...(data.draft ? { status: "DRAFT" as const } : publishedColumns),
          topics: { create: [{ topicId: data.topicId, isPrimary: true }] },
        },
      });
      if (!data.draft) await snapshot(tx, "LESSON", row.id);
      return row.id;
    });

  const lessons = {
    quadratic: await lesson({
      subjectId: math.id,
      title: "Quadratic equations explained",
      body: "Use factorisation to solve equations of the second degree.",
      accessTier: "FREE",
      topicId: mathTree.childId,
    }),
    algebraBasics: await lesson({
      subjectId: math.id,
      title: "Algebra basics",
      body: `Variables and expressions. Quadratic expressions come later; they also appear in chemistry ${relaxWord}.`,
      accessTier: "FREE",
      topicId: mathTree.rootId,
    }),
    premium: await lesson({
      subjectId: math.id,
      title: "Completing the square",
      body: "The hidden method uses a balancing trick to rewrite every quadratic.",
      accessTier: "PREMIUM",
      topicId: mathTree.childId,
    }),
    chem: await lesson({
      subjectId: chem.id,
      title: "The mole concept",
      body: "One mole contains Avogadro's number of particles.",
      accessTier: "FREE",
      topicId: chemTree.childId,
    }),
    draft: await lesson({
      subjectId: math.id,
      title: "Quadratic draft notes",
      body: "Not reviewed yet.",
      accessTier: "FREE",
      topicId: mathTree.childId,
      draft: true,
    }),
    guide: await lesson({
      subjectId: math.id,
      kind: "STUDY_GUIDE",
      title: "Quadratic revision guide",
      body: "A public guide to revising quadratics.",
      accessTier: "PUBLIC",
      topicId: mathTree.childId,
    }),
    archived: await lesson({
      subjectId: math.id,
      title: "Quadratic graphs archived soon",
      body: "Parabolas.",
      accessTier: "FREE",
      topicId: mathTree.childId,
    }),
  };

  const question = (stem: string, accessTier: "FREE" | "PREMIUM") =>
    db.$transaction(async (tx) => {
      const row = await tx.question.create({
        data: {
          subjectId: math.id,
          type: "SHORT_ANSWER",
          stem,
          difficulty: 2,
          marks: 3,
          accessTier,
          answerSpec: { accepted: [{ value: `ANSWER-SECRET-${sfx}` }] },
          explanation: `EXPLANATION-SECRET-${sfx}`,
          workedSolution: `WORKING-SECRET-${sfx}`,
          ...publishedColumns,
        },
      });
      await tx.questionTopic.create({
        data: {
          questionId: row.id,
          topicId: mathTree.childId,
          syllabusId: mathTree.syllabusId,
          subjectId: math.id,
          isPrimary: true,
        },
      });
      await snapshot(tx, "QUESTION", row.id);
      return row.id;
    });
  const questions = {
    free: await question("Solve the quadratic equation $x^2 - 5x + 6 = 0$.", "FREE"),
    premium: await question(`Find the roots of the quadratic $2x^2 + 3x - 2 = 0$ (premiumstem${sfx}).`, "PREMIUM"),
  };

  const user = await db.user.create({ data: { emailNormalized: `search-${sfx}@test.invalid` } });
  const platformCard = await db.$transaction(async (tx) => {
    const row = await tx.flashcard.create({
      data: {
        subjectId: math.id,
        cardType: "FORMULA",
        front: "The quadratic formula",
        back: `BACK-SECRET-${sfx}`,
        accessTier: "PREMIUM",
        ...publishedColumns,
        topics: { create: [{ topicId: mathTree.childId, isPrimary: true }] },
      },
    });
    await snapshot(tx, "FLASHCARD", row.id);
    return row.id;
  });
  const personalCard = await db.flashcard.create({
    data: {
      subjectId: math.id,
      ownerUserId: user.id,
      cardType: "CONCEPT",
      front: `My private quadratic card ${sfx}`,
      back: "Private",
      status: "PUBLISHED",
      publishedAt: now,
    },
  });

  const assessmentId = await db.$transaction(async (tx) => {
    const row = await tx.assessment.create({
      data: {
        kind: "TOPIC_TEST",
        subjectId: math.id,
        title: "Quadratics topic test",
        description: "Ten questions on quadratic equations.",
        totalMarks: 30,
        accessTier: "PREMIUM",
        ...publishedColumns,
        topics: { create: [{ topicId: mathTree.childId }] },
      },
    });
    await snapshot(tx, "ASSESSMENT", row.id);
    return row.id;
  });

  // Study-pack scopes are children of the pack: add them while APPROVED, then publish with the snapshot.
  const pack = await db.studyPack.create({
    data: {
      slug: `quadratics-pack-${sfx}`,
      title: "Quadratics mastery pack",
      description: "Every quadratic lesson and test.",
      entitlements: { version: 1, features: {}, limits: {} },
      status: "APPROVED",
      approvedAt: now,
      scopes: { create: [{ subjectId: math.id }] },
    },
  });
  await db.$transaction(async (tx) => {
    await tx.studyPack.update({ where: { id: pack.id }, data: { status: "PUBLISHED", publishedAt: now } });
    await snapshot(tx, "STUDY_PACK", pack.id);
  });

  return {
    boardSlug: board.slug,
    mathId: math.id,
    chemId: chem.id,
    algebraId: mathTree.rootId,
    quadraticsId: mathTree.childId,
    stoichiometryId: chemTree.rootId,
    lessons,
    questions,
    flashcards: { platform: platformCard, personal: personalCard.id },
    assessmentId,
    studyPackId: pack.id,
  };
}

async function indexFixture(): Promise<void> {
  const jobs: Array<[SearchableEntityType, string]> = [
    ["SUBJECT", fx.mathId],
    ["SUBJECT", fx.chemId],
    ["TOPIC", fx.algebraId],
    ["TOPIC", fx.quadraticsId],
    ["TOPIC", fx.stoichiometryId],
    ...Object.values(fx.lessons).map((id): [SearchableEntityType, string] => ["LESSON", id]),
    ["QUESTION", fx.questions.free],
    ["QUESTION", fx.questions.premium],
    ["FLASHCARD", fx.flashcards.platform],
    ["FLASHCARD", fx.flashcards.personal],
    ["ASSESSMENT", fx.assessmentId],
    ["STUDY_PACK", fx.studyPackId],
  ];
  for (const [type, id] of jobs) await reindexEntity(type, id);
}

const ids = (response: SearchResponse): string[] => response.items.map((item) => item.entityId);
const storedDoc = (entityType: SearchableEntityType, entityId: string) =>
  db.searchDocument.findUnique({
    where: { entityType_entityId: { entityType, entityId } },
    select: { title: true, body: true, keywords: true, path: true, status: true, subjectIds: true, topicIds: true },
  });

beforeAll(async () => {
  fx = await createFixture();
  await indexFixture();
  clearSearchCatalogueCache();
});

afterAll(async () => {
  // Remove only this file's index rows; content rows stay (published content and revisions are append-only by design).
  if (fx) {
    await db.searchDocument.deleteMany({
      where: { OR: [{ subjectIds: { hasSome: [fx.mathId, fx.chemId, probeSubjectId] } }, { entityId: fx.studyPackId }] },
    });
  }
});

describe("indexer", () => {
  it("indexes a published lesson with denormalised curriculum filters", async () => {
    const doc = await storedDoc("LESSON", fx.lessons.quadratic);
    expect(doc).toMatchObject({ status: "PUBLISHED", path: `/app/lessons/${fx.lessons.quadratic}`, subjectIds: [fx.mathId] });
    expect([...(doc?.topicIds ?? [])].sort()).toEqual([fx.algebraId, fx.quadraticsId].sort());
    expect(doc?.keywords).toContain(mathCode);
    expect(doc?.keywords).toContain("Maths");
    expect(doc?.keywords).toContain(boardToken);
  });

  it("uses the SEO path scheme for public guides, topics and subjects", async () => {
    const lesson = await storedDoc("LESSON", fx.lessons.guide);
    expect(lesson?.path).toMatch(new RegExp(`^/${fx.boardSlug}/o-level/mathematics/guides/quadratic-revision-guide-${sfx}$`));
    expect((await storedDoc("TOPIC", fx.quadraticsId))?.path).toBe(`/${fx.boardSlug}/o-level/mathematics/quadratic-equations`);
    expect((await storedDoc("SUBJECT", fx.mathId))?.path).toBe(`/${fx.boardSlug}/o-level/mathematics`);
    expect((await storedDoc("STUDY_PACK", fx.studyPackId))?.path).toBe(`/app/study-packs/quadratics-pack-${sfx}`);
  });

  it("indexes question stems and flashcard fronts only — never answers", async () => {
    const question = await storedDoc("QUESTION", fx.questions.free);
    expect(question?.body).toBe("Solve the quadratic equation x^2 - 5x + 6 = 0.");
    const card = await storedDoc("FLASHCARD", fx.flashcards.platform);
    expect(card?.body).toBe("The quadratic formula");
    // PREMIUM card: the title (shown to everyone) names the context, never the front.
    expect(card?.title).toMatch(/ flashcard$/);
    expect(card?.title).not.toMatch(/formula/i);
    const allRows = await db.searchDocument.findMany({
      where: { subjectIds: { has: fx.mathId } },
      select: { title: true, body: true, keywords: true, subtitle: true },
    });
    expect(JSON.stringify(allRows)).not.toMatch(/SECRET/);
  });

  it("never indexes drafts or personal flashcards", async () => {
    expect(await documentFor("LESSON", fx.lessons.draft)).toBeNull();
    expect(await storedDoc("LESSON", fx.lessons.draft)).toBeNull();
    expect(await documentFor("FLASHCARD", fx.flashcards.personal)).toBeNull();
    expect(await storedDoc("FLASHCARD", fx.flashcards.personal)).toBeNull();
  });

  it("removes the document when content is archived", async () => {
    expect(await storedDoc("LESSON", fx.lessons.archived)).not.toBeNull();
    await db.lesson.update({ where: { id: fx.lessons.archived }, data: { status: "ARCHIVED", archivedAt: new Date() } });
    expect(await reindexEntity("LESSON", fx.lessons.archived)).toEqual({ action: "removed", existed: true });
    expect(await storedDoc("LESSON", fx.lessons.archived)).toBeNull();
  });

  it("is refused by the database when anything but PUBLISHED is written (CHECK)", async () => {
    await expect(
      db.$executeRaw`
        INSERT INTO "SearchDocument" ("id", "entityType", "entityId", "title", "path", "accessTier", "status",
          "sourceUpdatedAt", "updatedAt")
        VALUES (uuidv7(), 'LESSON', ${randomUUID()}::uuid, 'Draft leak', '/x', 'FREE', 'DRAFT', now(), now())`,
    ).rejects.toThrow(/SearchDocument_status_chk/);
  });

  it("does not rewrite unchanged documents", async () => {
    const doc = await documentFor("LESSON", fx.lessons.quadratic);
    expect(doc).not.toBeNull();
    expect(await upsertSearchDocuments([doc as SearchDocumentInput])).toBe(0);
    expect(await upsertSearchDocuments([{ ...(doc as SearchDocumentInput), rankBoost: 5 }])).toBe(1);
    await reindexEntity("LESSON", fx.lessons.quadratic);
  });

  it("job handler validates its payload", async () => {
    await expect(handleReindexEntityJob({ entityType: "LESSON", entityId: "nope" })).rejects.toSatisfy(
      (error: unknown) => isAppError(error) && error.code === "VALIDATION",
    );
    await expect(handleReindexEntityJob({ entityType: "SYLLABUS", entityId: randomUUID() })).rejects.toThrow();
    await expect(documentFor("LESSON", "not-a-uuid")).rejects.toSatisfy(
      (error: unknown) => isAppError(error) && error.code === "VALIDATION",
    );
    await expect(handleReindexEntityJob({ entityType: "TOPIC", entityId: fx.quadraticsId })).resolves.toMatchObject({
      action: "upserted",
    });
  });
});

describe("search", () => {
  it("ranks a title match above a body-only match", async () => {
    const response = await search({ q: "quadratic", filters: { subjectId: fx.mathId } });
    const found = ids(response);
    expect(found).toContain(fx.lessons.quadratic);
    expect(found).toContain(fx.lessons.algebraBasics);
    expect(found.indexOf(fx.lessons.quadratic)).toBeLessThan(found.indexOf(fx.lessons.algebraBasics));
    expect(found).not.toContain(fx.lessons.draft);
    expect(found).not.toContain(fx.flashcards.personal);
    expect(response.facets.find((facet) => facet.type === "LESSON")?.count).toBeGreaterThanOrEqual(4);
    expect(response.total).toBe(response.facets.reduce((n, facet) => n + facet.count, 0));
  });

  it("tolerates typos", async () => {
    const response = await search({ q: "quadradic", filters: { subjectId: fx.mathId } });
    expect(ids(response)).toContain(fx.lessons.quadratic);
  });

  it("matches a word prefix", async () => {
    const response = await search({ q: "quadr", filters: { subjectId: fx.mathId, types: ["LESSON"] } });
    expect(ids(response)).toContain(fx.lessons.quadratic);
  });

  it("applies subject, type and topic-subtree filters", async () => {
    const chem = await search({ q: "mole", filters: { subjectId: fx.chemId } });
    expect(ids(chem)).toContain(fx.lessons.chem);
    expect(ids(chem)).not.toContain(fx.lessons.quadratic);

    const lessonsOnly = await search({ q: "quadratic", filters: { subjectId: fx.mathId, types: ["LESSON"] } });
    expect(lessonsOnly.items.length).toBeGreaterThan(0);
    expect(lessonsOnly.items.every((item) => item.entityType === "LESSON")).toBe(true);
    expect(lessonsOnly.facets.find((facet) => facet.type === "QUESTION")?.count).toBeGreaterThan(0);

    // A filter on the parent topic (Algebra) finds content tagged to its subtopic (Quadratic equations).
    const subtree = await search({ q: "quadratic", filters: { topicId: fx.algebraId } });
    expect(ids(subtree)).toContain(fx.lessons.quadratic);
    expect(ids(subtree)).not.toContain(fx.lessons.chem);
    expect(subtree.appliedFilters).toEqual([{ source: "explicit", kind: "topic", ids: [fx.algebraId] }]);
  });

  it("detects a syllabus code and returns it as a removable chip", async () => {
    const response = await search({ q: `${mathCode} quadratic` });
    expect(response.text).toBe("quadratic");
    expect(response.relaxed).toBe(false);
    expect(response.appliedFilters).toEqual([
      expect.objectContaining({ source: "detected", kind: "subject", ids: [fx.mathId], byCode: true, removeQuery: "quadratic" }),
    ]);
    expect(ids(response)).toContain(fx.lessons.quadratic);
    expect(ids(response)).not.toContain(fx.lessons.chem);
  });

  it('understands "<board> o level maths quadratic" against the catalogue', async () => {
    const response = await search({ q: `${boardToken} o level maths quadratic` });
    expect(response.text).toBe("quadratic");
    const detected = response.appliedFilters.filter((filter) => filter.source === "detected");
    expect(detected.map((filter) => filter.kind)).toEqual(["board", "level", "subject"]);
    expect(detected.find((filter) => filter.kind === "subject")?.ids).toEqual([fx.mathId]);
    expect(ids(response)).toContain(fx.lessons.quadratic);
  });

  it("relaxes detected filters that hide every result", async () => {
    // "chemistry" is detected as a subject filter, but the only match is a Mathematics lesson mentioning chemistry.
    const response = await search({ q: `chemistry ${relaxWord}` });
    expect(response.relaxed).toBe(true);
    expect(response.appliedFilters).toEqual([]);
    expect(ids(response)).toEqual([fx.lessons.algebraBasics]);
  });

  it("returns locked teasers without body text for premium content", async () => {
    const anonymous = await search({ q: "balancing trick", filters: { subjectId: fx.mathId } });
    const premium = anonymous.items.find((item) => item.entityId === fx.lessons.premium);
    expect(premium).toMatchObject({ title: "Completing the square", locked: true, lockReason: "PREMIUM", snippet: null });
    expect(JSON.stringify(anonymous.items)).not.toContain("hidden method");

    const signedInNoPlan = await search({ q: "balancing trick", filters: { subjectId: fx.mathId } }, { signedIn: true });
    expect(signedInNoPlan.items.find((item) => item.entityId === fx.lessons.premium)?.snippet).toBeNull();

    const entitled = await search(
      { q: "balancing trick", filters: { subjectId: fx.mathId } },
      { signedIn: true, canViewPremium: (scope) => scope.subjectIds.includes(fx.mathId) },
    );
    const unlocked = entitled.items.find((item) => item.entityId === fx.lessons.premium);
    expect(unlocked?.locked).toBe(false);
    expect(unlocked?.snippet?.map((segment) => segment.text).join("")).toContain("hidden method");
    expect(unlocked?.snippet?.some((segment) => segment.match)).toBe(true);
  });

  it("shows premium questions by context only, and FREE content to signed-in users", async () => {
    const response = await search({ q: `premiumstem${sfx}`, filters: { subjectId: fx.mathId } });
    const item = response.items.find((candidate) => candidate.entityId === fx.questions.premium);
    expect(item).toMatchObject({ title: "Quadratic equations question (3 marks)", locked: true, snippet: null });
    expect(JSON.stringify(response.items)).not.toContain("Find the roots");

    const anonymous = await search({ q: "factorisation", filters: { subjectId: fx.mathId, types: ["LESSON"] } });
    expect(anonymous.items.find((i) => i.entityId === fx.lessons.quadratic)).toMatchObject({
      locked: true,
      lockReason: "SIGN_IN",
      snippet: null,
    });
    const signedIn = await search(
      { q: "factorisation", filters: { subjectId: fx.mathId, types: ["LESSON"] } },
      { signedIn: true },
    );
    expect(signedIn.items.find((i) => i.entityId === fx.lessons.quadratic)?.snippet).not.toBeNull();
  });

  it("browses filters without text, subject first", async () => {
    const response = await search({ q: "", filters: { subjectId: fx.mathId } });
    expect(response.items[0]).toMatchObject({ entityType: "SUBJECT", entityId: fx.mathId, locked: false });
    expect(await search({ q: "" })).toMatchObject({ items: [], total: 0, nextCursor: null });
  });

  it("paginates with a stable keyset cursor (no duplicates, no gaps, even with inserts between pages)", async () => {
    const probe = (n: number): SearchDocumentInput => ({
      entityType: "LESSON",
      entityId: randomUUID(),
      title: `Pagination probe ${sfx}`,
      subtitle: null,
      body: "identical body",
      keywords: "",
      path: `/app/lessons/probe-${n}`,
      languageCode: "en",
      accessTier: "PUBLIC",
      examBoardIds: [],
      qualificationIds: [],
      levelIds: [],
      subjectIds: [probeSubjectId],
      syllabusIds: [],
      topicIds: [],
      rankBoost: 0,
      sourceUpdatedAt: now,
    });
    await upsertSearchDocuments(Array.from({ length: 7 }, (_, n) => probe(n)));
    const input = { q: `pagination probe ${sfx}`, filters: { subjectId: probeSubjectId }, limit: 3 };

    const first = await search(input);
    expect(first.items).toHaveLength(3);
    expect(first.total).toBe(7);
    expect(first.nextCursor).not.toBeNull();
    await upsertSearchDocuments([probe(99)]); // a new tie arrives between page requests

    const seen = first.items.map((item) => item.id);
    let cursor = first.nextCursor;
    while (cursor) {
      const page = await search({ ...input, cursor });
      seen.push(...page.items.map((item) => item.id));
      cursor = page.nextCursor;
    }
    expect(new Set(seen).size).toBe(seen.length);
    expect(seen).toHaveLength(8);

    await expect(search({ ...input, q: "something else", cursor: first.nextCursor ?? "" })).rejects.toSatisfy(
      (error: unknown) => isAppError(error) && error.code === "VALIDATION",
    );
  });

  it("validates input", async () => {
    await expect(search({ q: "x".repeat(500) })).rejects.toSatisfy((error: unknown) => isAppError(error));
    await expect(search({ q: "quadratic", filters: { subjectId: "not-a-uuid" } })).rejects.toSatisfy((error: unknown) =>
      isAppError(error),
    );
  });
});

describe("suggest", () => {
  it("completes title prefixes (max 8, deduplicated, no questions)", async () => {
    const suggestions = await suggest("quadr", { subjectId: fx.mathId });
    expect(suggestions.map((s) => s.title)).toContain("Quadratic equations");
    expect(suggestions.length).toBeLessThanOrEqual(8);
    expect(new Set(suggestions.map((s) => s.title.toLowerCase())).size).toBe(suggestions.length);
    expect(suggestions.every((s) => s.entityType !== "QUESTION")).toBe(true);
    expect(suggestions[0]?.title.toLowerCase().startsWith("quadr")).toBe(true);
  });

  it("tolerates typos and ignores one-letter input", async () => {
    expect((await suggest("quadratik", { subjectId: fx.mathId })).map((s) => s.title)).toContain("Quadratic equations");
    expect(await suggest("q", { subjectId: fx.mathId })).toEqual([]);
  });

  it("never suggests the front of a PREMIUM flashcard (autocomplete has no entitlement check)", async () => {
    const suggestions = await suggest("the quadratic formula", { subjectId: fx.mathId, types: ["FLASHCARD"] });
    expect(suggestions.map((s) => s.title).join(" | ")).not.toMatch(/formula/i);
  });
});

describe("reindexAll", () => {
  it("streams batches and sweeps stale documents", async () => {
    const orphan = randomUUID();
    await upsertSearchDocuments([
      {
        entityType: "LESSON",
        entityId: orphan,
        title: `Orphan ${sfx}`,
        subtitle: null,
        body: "",
        keywords: "",
        path: "/app/lessons/orphan",
        languageCode: "en",
        accessTier: "FREE",
        examBoardIds: [],
        qualificationIds: [],
        levelIds: [],
        subjectIds: [probeSubjectId],
        syllabusIds: [],
        topicIds: [],
        rankBoost: 0,
        sourceUpdatedAt: now,
      },
    ]);
    await removeSearchDocument("LESSON", fx.lessons.chem); // simulate a missed index job

    // Scoped to this file's fixtures (+ the orphan): the shared test database keeps growing as other files add rows, and
    // a whole-index rebuild would get slower with every one of them. Unscoped runs use the same code path.
    const scope = [...Object.values(fx.lessons), orphan];
    const report = await reindexAll({ types: ["LESSON"], batchSize: 3, entityIds: scope });
    expect(report.aborted).toBe(false);
    // Forward pass: the 5 indexable fixture lessons (not the draft or the archived one), in batches of 3.
    expect(report.types.LESSON?.scanned).toBe(5);
    expect(report.types.LESSON?.written).toBeGreaterThanOrEqual(1); // the chemistry lesson whose document was missing
    // Sweep: exactly the orphan document (source gone) is removed; nothing outside the scope is touched.
    expect(report.types.LESSON?.removed).toBe(1);
    expect(await storedDoc("LESSON", orphan)).toBeNull();
    expect(await storedDoc("LESSON", fx.lessons.chem)).not.toBeNull();
    expect(await storedDoc("LESSON", fx.lessons.quadratic)).not.toBeNull();
    expect(await storedDoc("LESSON", fx.lessons.draft)).toBeNull();
    expect(await storedDoc("LESSON", fx.lessons.archived)).toBeNull();
  });

  it("stops between batches when aborted", async () => {
    const controller = new AbortController();
    controller.abort();
    expect(await reindexAll({ types: ["SUBJECT"], signal: controller.signal })).toMatchObject({ aborted: true });
  });
});
