/**
 * Curriculum + content fixtures (§3, §4, §26, §27). Every chain uses unique slugs/codes so parallel test files never
 * collide, and every row satisfies the NOT NULL columns, CHECK constraints and triggers of the init migration:
 *
 * - topics are inserted while the syllabus version is still DRAFT (published structure is frozen by trigger), then the
 *   version is published as CURRENT with `publishedAt`, cleared copyright and a named source (`Syllabus_copyright_chk`);
 * - PUBLISHED lessons carry `approvedAt` / `publishedAt` / cleared copyright and are inserted in ONE transaction with
 *   their `ContentRevision` snapshot (the deferred `Lesson_revision_snapshot` trigger checks it at COMMIT).
 *
 * Fixtures never set `isDemo` (the demo guard would refuse them under `app.environment = 'production'`).
 */
import { createHash, randomUUID } from "node:crypto";
import {
  Prisma,
  type ContentAccessTier,
  type ContentRevision,
  type ContentSource,
  type ContentStatus,
  type Country,
  type ExamBoard,
  type Lesson,
  type LessonTopic,
  type Qualification,
  type QualificationLevel,
  type Subject,
  type SubjectCategory,
  type Syllabus,
  type SyllabusStatus,
  type Topic,
} from "@/generated/prisma/client";
import { db } from "@/server/db";
import { uniqueCode, uniqueSlug } from "./util";

/** Shared test country. "XT" is in the ISO 3166 user-assigned range, so it can never clash with a real country. */
export const TEST_COUNTRY_ISO = "XT";

const TEST_COUNTRY_DATA = {
  isoCode: TEST_COUNTRY_ISO,
  name: "Testland",
  slug: "testland-xt",
  defaultCurrency: "USD",
  timezone: "Africa/Harare",
  defaultLocale: "en",
  dialCode: "+263",
  catalogueStatus: "AVAILABLE",
} as const satisfies Prisma.CountryCreateInput;

function isUniqueViolation(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

/**
 * Returns the shared test country, creating it on first use. ISO codes are a tiny space (676 values), so countries
 * cannot be unique per test; this get-or-create tolerates parallel test files racing to create it.
 */
export async function ensureTestCountry(): Promise<Country> {
  const existing = await db.country.findUnique({ where: { isoCode: TEST_COUNTRY_ISO } });
  if (existing) return existing;
  try {
    return await db.country.create({ data: TEST_COUNTRY_DATA });
  } catch (error) {
    if (isUniqueViolation(error)) return db.country.findUniqueOrThrow({ where: { isoCode: TEST_COUNTRY_ISO } });
    throw error;
  }
}

/** Stable JSON (object keys sorted recursively) used for revision content hashes. */
function canonicalJson(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value) ?? "null";
  if (value instanceof Date) return JSON.stringify(value.toISOString());
  if (Array.isArray(value)) return `[${value.map((item) => canonicalJson(item)).join(",")}]`;
  const entries = Object.entries(value as Record<string, unknown>)
    .filter(([, item]) => item !== undefined)
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
  return `{${entries.map(([key, item]) => `${JSON.stringify(key)}:${canonicalJson(item)}`).join(",")}}`;
}

function sha256Hex(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

/** Creates a content source (provenance record, §27) with a unique slug. */
export async function createContentSource(
  overrides: Partial<Prisma.ContentSourceUncheckedCreateInput> = {},
): Promise<ContentSource> {
  const slug = overrides.slug ?? uniqueSlug("source");
  return db.contentSource.create({
    data: {
      name: `Test source ${slug}`,
      type: "ORIGINAL",
      permitsCommercialUse: true,
      permitsDerivatives: true,
      ...overrides,
      slug,
    },
  });
}

export interface CreateCurriculumChainOptions {
  /** Defaults to the shared {@link ensureTestCountry}. */
  countryId?: string;
  /** TOPIC roots in the syllabus version (default 2). */
  topicCount?: number;
  /** SUBTOPIC children per TOPIC (default 2). */
  subtopicsPerTopic?: number;
  /** Learning objectives per SUBTOPIC (default 0). */
  objectivesPerSubtopic?: number;
  /** Lessons per TOPIC, tagged as the lesson's primary topic (default 1). */
  lessonsPerTopic?: number;
  /** Status of the created lessons (default PUBLISHED; only PUBLISHED lessons get a ContentRevision). */
  lessonStatus?: Extract<ContentStatus, "DRAFT" | "PUBLISHED">;
  /** Access tier of the created lessons (default FREE so students can read them without a plan). */
  lessonAccessTier?: ContentAccessTier;
  /** Status of the syllabus version (default CURRENT). DRAFT leaves the version editable. */
  syllabusStatus?: SyllabusStatus;
  /** Optional author/approver recorded on lessons and revisions. */
  createdById?: string | null;
  approvedById?: string | null;
}

/** Everything {@link createCurriculumChain} created, in hierarchy order. */
export interface CurriculumChain {
  country: Country;
  examBoard: ExamBoard;
  level: QualificationLevel;
  qualification: Qualification;
  category: SubjectCategory;
  subject: Subject;
  source: ContentSource;
  syllabus: Syllabus;
  /** TOPIC roots in sortOrder. */
  topics: Topic[];
  /** SUBTOPIC children, grouped per topic in order. */
  subtopics: Topic[];
  /** Learning objectives (empty unless `objectivesPerSubtopic` > 0). */
  objectiveIds: string[];
  lessons: Lesson[];
  lessonTopics: LessonTopic[];
  /** One snapshot per PUBLISHED lesson. */
  revisions: ContentRevision[];
}

/**
 * Builds a full curriculum chain with unique slugs:
 * country (shared) → exam board → qualification level → qualification → subject category → subject → content source →
 * syllabus version (CURRENT by default) → topic tree (TOPIC roots + SUBTOPIC children) → lessons (PUBLISHED by default,
 * each with its ContentRevision snapshot and primary LessonTopic).
 */
export async function createCurriculumChain(options: CreateCurriculumChainOptions = {}): Promise<CurriculumChain> {
  const topicCount = options.topicCount ?? 2;
  const subtopicsPerTopic = options.subtopicsPerTopic ?? 2;
  const objectivesPerSubtopic = options.objectivesPerSubtopic ?? 0;
  const lessonsPerTopic = options.lessonsPerTopic ?? 1;
  const lessonStatus = options.lessonStatus ?? "PUBLISHED";
  const syllabusStatus = options.syllabusStatus ?? "CURRENT";
  if (lessonsPerTopic > 0 && lessonStatus === "PUBLISHED" && syllabusStatus === "DRAFT") {
    // Allowed by the database, but almost always a test mistake: students only see published versions.
    throw new Error("createCurriculumChain: published lessons need a published syllabus version");
  }

  const country = options.countryId
    ? await db.country.findUniqueOrThrow({ where: { id: options.countryId } })
    : await ensureTestCountry();

  const boardSlug = uniqueSlug("board");
  const examBoard = await db.examBoard.create({
    data: {
      slug: boardSlug,
      code: uniqueCode("B"),
      name: `Test Examinations Board ${boardSlug}`,
      shortName: "TEB",
      homeCountryId: country.id,
      catalogueStatus: "AVAILABLE",
    },
  });
  await db.examBoardCountry.create({ data: { countryId: country.id, examBoardId: examBoard.id } });

  const level = await db.qualificationLevel.create({
    data: { slug: uniqueSlug("level"), name: "Test Level", shortName: "TL" },
  });
  const qualification = await db.qualification.create({
    data: {
      examBoardId: examBoard.id,
      levelId: level.id,
      slug: uniqueSlug("qualification"),
      code: uniqueCode("Q"),
      name: "Test Ordinary Level",
      shortName: "T-Level",
      catalogueStatus: "AVAILABLE",
    },
  });
  const category = await db.subjectCategory.create({ data: { slug: uniqueSlug("category"), name: "Test Sciences" } });
  const source = await createContentSource({ type: "OFFICIAL_SYLLABUS", name: "Test official syllabus" });
  const subject = await db.subject.create({
    data: {
      qualificationId: qualification.id,
      categoryId: category.id,
      slug: uniqueSlug("subject"),
      name: "Test Mathematics",
      officialCode: uniqueCode("S").slice(0, 16),
      catalogueStatus: "AVAILABLE",
      sourceId: source.id,
    },
  });

  // 1. Draft version: structure is only insertable while DRAFT (topic_guard_published).
  const draft = await db.syllabus.create({
    data: {
      subjectId: subject.id,
      title: `Test Mathematics syllabus ${subject.slug}`,
      versionLabel: "2026-2028",
      effectiveFrom: new Date("2026-01-01T00:00:00.000Z"),
      sourceId: source.id,
      copyrightStatus: "OWNED",
      createdById: options.createdById ?? null,
    },
  });

  const topicRows: Prisma.TopicCreateManyInput[] = [];
  const subtopicRows: Prisma.TopicCreateManyInput[] = [];
  for (let t = 0; t < topicCount; t += 1) {
    const topicId = randomUUID();
    topicRows.push({
      id: topicId,
      syllabusId: draft.id,
      kind: "TOPIC",
      depth: 0,
      path: topicId,
      sortOrder: t,
      code: String(t + 1),
      name: `Topic ${t + 1}`,
      slug: uniqueSlug(`topic-${t + 1}`),
    });
    for (let s = 0; s < subtopicsPerTopic; s += 1) {
      const subtopicId = randomUUID();
      subtopicRows.push({
        id: subtopicId,
        syllabusId: draft.id,
        parentId: topicId,
        kind: "SUBTOPIC",
        depth: 1,
        path: `${topicId}/${subtopicId}`,
        sortOrder: s,
        code: `${t + 1}.${s + 1}`,
        name: `Subtopic ${t + 1}.${s + 1}`,
        slug: uniqueSlug(`subtopic-${t + 1}-${s + 1}`),
      });
    }
  }
  if (topicRows.length > 0) await db.topic.createMany({ data: topicRows });
  if (subtopicRows.length > 0) await db.topic.createMany({ data: subtopicRows });

  const objectiveIds: string[] = [];
  if (objectivesPerSubtopic > 0) {
    const objectiveRows: Prisma.LearningObjectiveCreateManyInput[] = [];
    for (const subtopic of subtopicRows) {
      for (let o = 0; o < objectivesPerSubtopic; o += 1) {
        const id = randomUUID();
        objectiveIds.push(id);
        objectiveRows.push({
          id,
          topicId: subtopic.id as string,
          statement: `Objective ${o + 1} of ${String(subtopic.name)}`,
          sortOrder: o,
          cognitiveSkill: "APPLICATION",
        });
      }
    }
    await db.learningObjective.createMany({ data: objectiveRows });
  }

  // 2. Publish the version (structure freezes from here on).
  const syllabus =
    syllabusStatus === "DRAFT"
      ? draft
      : await db.syllabus.update({
          where: { id: draft.id },
          data: { status: syllabusStatus, publishedAt: new Date(), publishedById: options.approvedById ?? null },
        });

  const topicIds = topicRows.map((row) => row.id as string);
  const topics = await db.topic.findMany({ where: { id: { in: topicIds } }, orderBy: { sortOrder: "asc" } });
  const subtopicsUnordered = await db.topic.findMany({ where: { id: { in: subtopicRows.map((row) => row.id as string) } } });
  const subtopicOrder = new Map(subtopicRows.map((row, index) => [row.id as string, index]));
  const subtopics = subtopicsUnordered.sort((a, b) => (subtopicOrder.get(a.id) ?? 0) - (subtopicOrder.get(b.id) ?? 0));

  // 3. Lessons (+ ContentRevision snapshot for PUBLISHED ones, in the same transaction).
  const lessons: Lesson[] = [];
  const lessonTopics: LessonTopic[] = [];
  const revisions: ContentRevision[] = [];
  for (const topic of topics) {
    for (let l = 0; l < lessonsPerTopic; l += 1) {
      const created = await createLessonForTopic({
        subjectId: subject.id,
        topicId: topic.id,
        title: `${topic.name}: lesson ${l + 1}`,
        sortOrder: l,
        status: lessonStatus,
        accessTier: options.lessonAccessTier ?? "FREE",
        createdById: options.createdById ?? null,
        approvedById: options.approvedById ?? null,
      });
      lessons.push(created.lesson);
      lessonTopics.push(created.lessonTopic);
      if (created.revision) revisions.push(created.revision);
    }
  }

  return {
    country,
    examBoard,
    level,
    qualification,
    category,
    subject,
    source,
    syllabus,
    topics,
    subtopics,
    objectiveIds,
    lessons,
    lessonTopics,
    revisions,
  };
}

export interface CreateLessonOptions {
  subjectId: string;
  /** Primary topic tag. */
  topicId: string;
  title?: string;
  body?: string;
  sortOrder?: number;
  status?: Extract<ContentStatus, "DRAFT" | "PUBLISHED">;
  accessTier?: ContentAccessTier;
  createdById?: string | null;
  approvedById?: string | null;
}

/**
 * Creates one lesson tagged to `topicId` (primary). A PUBLISHED lesson is inserted with approval/publication times,
 * OWNED copyright and its revision-1 `ContentRevision` snapshot in one transaction, exactly like the publish helper.
 */
export async function createLessonForTopic(
  options: CreateLessonOptions,
): Promise<{ lesson: Lesson; lessonTopic: LessonTopic; revision: ContentRevision | null }> {
  const status = options.status ?? "PUBLISHED";
  const title = options.title ?? "Test lesson";
  const body = options.body ?? `# ${title}\n\nA short test lesson body with maths: $x^2 + 1$.`;
  const now = new Date();
  const published = status === "PUBLISHED";

  return db.$transaction(async (tx) => {
    const lesson = await tx.lesson.create({
      data: {
        subjectId: options.subjectId,
        kind: "LESSON",
        title,
        slug: uniqueSlug("lesson"),
        summary: `Summary of ${title}`,
        body,
        accessTier: options.accessTier ?? "FREE",
        status,
        revision: 1,
        createdById: options.createdById ?? null,
        copyrightStatus: "OWNED",
        author: "Test author",
        ...(published
          ? { approvedById: options.approvedById ?? null, approvedAt: now, publishedAt: now }
          : {}),
      },
    });
    const lessonTopic = await tx.lessonTopic.create({
      data: { lessonId: lesson.id, topicId: options.topicId, isPrimary: true, sortOrder: options.sortOrder ?? 0 },
    });
    if (!published) return { lesson, lessonTopic, revision: null };

    const snapshot = {
      lesson: {
        id: lesson.id,
        subjectId: lesson.subjectId,
        kind: lesson.kind,
        title: lesson.title,
        slug: lesson.slug,
        summary: lesson.summary,
        body: lesson.body,
        accessTier: lesson.accessTier,
        languageCode: lesson.languageCode,
        estimatedMinutes: lesson.estimatedMinutes,
        revision: lesson.revision,
      },
      topics: [{ topicId: lessonTopic.topicId, isPrimary: lessonTopic.isPrimary, sortOrder: lessonTopic.sortOrder }],
      objectives: [] as string[],
      questions: [] as string[],
    };
    const revision = await tx.contentRevision.create({
      data: {
        entityType: "LESSON",
        entityId: lesson.id,
        revision: 1,
        snapshot,
        contentHash: sha256Hex(canonicalJson(snapshot)),
        authorId: options.createdById ?? null,
        approvedById: options.approvedById ?? null,
        changeNote: "Test fixture",
      },
    });
    return { lesson, lessonTopic, revision };
  });
}
