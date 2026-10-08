import { describe, expect, it } from "vitest";
import {
  BODY_LIMITS,
  RANK_BOOST,
  buildAssessmentDocument,
  buildFlashcardDocument,
  buildLessonDocument,
  buildQuestionDocument,
  buildStudyPackDocument,
  buildSubjectDocument,
  buildTopicDocument,
  qualificationLabel,
} from "./documents";
import type {
  AssessmentSource,
  BoardRef,
  BuildContext,
  FlashcardSource,
  LessonSource,
  QualificationRef,
  QuestionSource,
  StudyPackSource,
  SubjectRef,
  SubjectSource,
  SyllabusRef,
  TopicRef,
  TopicSource,
} from "./types";

const updatedAt = new Date("2026-10-01T08:00:00Z");

const board: BoardRef = {
  id: "b1",
  slug: "zimsec",
  code: "ZIMSEC",
  name: "Zimbabwe School Examinations Council",
  shortName: "ZIMSEC",
  catalogueStatus: "AVAILABLE",
};
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
  id: "s1",
  slug: "mathematics",
  name: "Mathematics",
  shortName: "Maths",
  officialCode: "4004",
  languageCode: "en",
  isPublic: true,
  catalogueStatus: "AVAILABLE",
  qualification,
};
const syllabus: SyllabusRef = { id: "sy1", code: "4004", status: "CURRENT", subject };
const quadratics: TopicRef = {
  id: "t2",
  name: "Quadratic equations",
  slug: "quadratic-equations",
  code: "2.3",
  path: "t1/t2",
  kind: "SUBTOPIC",
  isPublic: true,
  syllabus,
};
// Tree: Algebra (t1, root) > Quadratic equations (t2). Ancestor names come from the build context.
const ctx: BuildContext = { ancestors: new Map([["t1", { id: "t1", name: "Algebra" }]]) };

const hiddenSubject: SubjectRef = { ...subject, id: "s-hidden", catalogueStatus: "HIDDEN" };
const draftSyllabusTopic: TopicRef = {
  ...quadratics,
  id: "t-draft",
  path: "t-draft",
  name: "Draft topic",
  syllabus: { ...syllabus, id: "sy-draft", status: "DRAFT" },
};

const lesson = (over: Partial<LessonSource> = {}): LessonSource => ({
  id: "les1",
  kind: "LESSON",
  title: "Solving quadratic equations",
  slug: "solving-quadratics",
  summary: "Factorise, complete the square or use the formula.",
  body: "## Method\n\nSolve $x^2 + 5x + 6 = 0$ by **factorising**.\n\n:::exam-tip\nCheck both roots.\n:::",
  languageCode: "en",
  accessTier: "FREE",
  status: "PUBLISHED",
  draftOfId: null,
  updatedAt,
  subject,
  qualification: null,
  examBoard: null,
  topics: [{ topic: quadratics, isPrimary: true }],
  ...over,
});

const question = (over: Partial<QuestionSource> = {}): QuestionSource => ({
  id: "qn1",
  parentId: null,
  schoolId: null,
  ownerUserId: null,
  type: "SHORT_ANSWER",
  stem: "Solve the quadratic equation $x^2 - 5x + 6 = 0$.",
  marks: 3,
  paperLabel: "Paper 2",
  year: 2025,
  isExamStyle: true,
  languageCode: "en",
  accessTier: "FREE",
  status: "PUBLISHED",
  draftOfId: null,
  updatedAt,
  subject,
  topics: [{ topic: quadratics, isPrimary: true }],
  ...over,
});

const flashcard = (over: Partial<FlashcardSource> = {}): FlashcardSource => ({
  id: "fc1",
  ownerUserId: null,
  cardType: "FORMULA",
  front: "The quadratic formula",
  languageCode: "en",
  accessTier: "PREMIUM",
  status: "PUBLISHED",
  draftOfId: null,
  updatedAt,
  subject,
  topics: [{ topic: quadratics, isPrimary: true }],
  ...over,
});

describe("qualificationLabel", () => {
  it("prefixes the board unless the short name already contains it", () => {
    expect(qualificationLabel(qualification)).toBe("ZIMSEC O-Level");
    expect(qualificationLabel({ ...qualification, shortName: "ZIMSEC O-Level" })).toBe("ZIMSEC O-Level");
  });
});

describe("buildLessonDocument", () => {
  it("denormalises the curriculum, including topic ancestors", () => {
    const doc = buildLessonDocument(lesson(), ctx);
    expect(doc).toMatchObject({
      entityType: "LESSON",
      entityId: "les1",
      title: "Solving quadratic equations",
      subtitle: "ZIMSEC O-Level · Mathematics · Quadratic equations",
      path: "/app/lessons/les1",
      accessTier: "FREE",
      languageCode: "en",
      examBoardIds: ["b1"],
      qualificationIds: ["q1"],
      levelIds: ["l1"],
      subjectIds: ["s1"],
      syllabusIds: ["sy1"],
      rankBoost: RANK_BOOST.lesson.LESSON,
      sourceUpdatedAt: updatedAt,
    });
    expect([...(doc?.topicIds ?? [])].sort()).toEqual(["t1", "t2"]);
    for (const keyword of ["Lesson", "ZIMSEC", "O-Level", "Mathematics", "Maths", "4004", "Algebra", "Quadratic equations"]) {
      expect(doc?.keywords).toContain(keyword);
    }
  });

  it("indexes plain text (markdown and math delimiters stripped)", () => {
    const body = buildLessonDocument(lesson(), ctx)?.body ?? "";
    expect(body).toContain("Factorise, complete the square");
    expect(body).toContain("x^2 + 5x + 6 = 0");
    expect(body).toContain("Exam tip");
    expect(body).not.toMatch(/[#*$]|:::/);
  });

  it("bounds the body", () => {
    const doc = buildLessonDocument(lesson({ body: "word ".repeat(10_000) }), ctx);
    expect(doc?.body.length).toBeLessThanOrEqual(BODY_LIMITS.default);
  });

  it("never indexes drafts, draft copies or archived lessons", () => {
    expect(buildLessonDocument(lesson({ status: "DRAFT" }), ctx)).toBeNull();
    expect(buildLessonDocument(lesson({ status: "APPROVED" }), ctx)).toBeNull();
    expect(buildLessonDocument(lesson({ status: "ARCHIVED" }), ctx)).toBeNull();
    expect(buildLessonDocument(lesson({ draftOfId: "live-id" }), ctx)).toBeNull();
  });

  it("skips hidden subjects and topics of DRAFT syllabus versions", () => {
    expect(buildLessonDocument(lesson({ subject: hiddenSubject, topics: [] }), ctx)).toBeNull();
    const hiddenBoard: SubjectRef = {
      ...subject,
      qualification: { ...qualification, examBoard: { ...board, catalogueStatus: "HIDDEN" } },
    };
    expect(buildLessonDocument(lesson({ subject: hiddenBoard, topics: [] }), ctx)).toBeNull();

    const reused = buildLessonDocument(
      lesson({ subject: hiddenSubject, topics: [{ topic: quadratics, isPrimary: true }, { topic: draftSyllabusTopic, isPrimary: false }] }),
      ctx,
    );
    expect(reused?.subjectIds).toEqual(["s1"]);
    expect(reused?.topicIds).not.toContain("t-draft");
    expect(reused?.keywords).not.toContain("Draft topic");
  });

  it("gives PUBLIC lessons an SEO guide path in their home scope", () => {
    expect(buildLessonDocument(lesson({ accessTier: "PUBLIC" }), ctx)?.path).toBe(
      "/zimsec/o-level/mathematics/guides/solving-quadratics",
    );
    expect(buildLessonDocument(lesson({ accessTier: "PUBLIC", subject: { ...subject, isPublic: false } }), ctx)?.path).toBe(
      "/app/lessons/les1",
    );
    expect(buildLessonDocument(lesson({ accessTier: "PREMIUM" }), ctx)?.path).toBe("/app/lessons/les1");
  });

  it("handles subject-less articles scoped to a qualification, a board or nothing", () => {
    const article = (over: Partial<LessonSource>) =>
      buildLessonDocument(lesson({ kind: "ARTICLE", accessTier: "PUBLIC", subject: null, topics: [], slug: "how-to-revise", ...over }), ctx);
    expect(article({ qualification })).toMatchObject({
      path: "/zimsec/o-level/guides/how-to-revise",
      subtitle: "ZIMSEC O-Level",
      qualificationIds: ["q1"],
      examBoardIds: ["b1"],
      subjectIds: [],
    });
    expect(article({ examBoard: board })?.path).toBe("/zimsec/guides/how-to-revise");
    expect(article({})).toMatchObject({ path: "/guides/how-to-revise", subtitle: null });
    expect(article({ qualification: { ...qualification, catalogueStatus: "HIDDEN" } })).toBeNull();
  });
});

describe("buildQuestionDocument", () => {
  it("indexes the stem only — never answers, explanations or options", () => {
    const withAnswers = {
      ...question(),
      answerSpec: { accepted: [{ value: "SECRET-ANSWER" }] },
      explanation: "SECRET-EXPLANATION",
      workedSolution: "SECRET-WORKING",
      hints: ["SECRET-HINT"],
      options: [{ key: "A", content: "SECRET-OPTION", isCorrect: true }],
    } as QuestionSource;
    const doc = buildQuestionDocument(withAnswers, ctx);
    expect(doc?.body).toBe("Solve the quadratic equation x^2 - 5x + 6 = 0.");
    expect(JSON.stringify(doc)).not.toContain("SECRET");
    expect(doc).toMatchObject({ path: "/app/practice?questionId=qn1", title: "Solve the quadratic equation x^2 - 5x + 6 = 0." });
    expect(doc?.keywords).toContain("Paper 2");
  });

  it("uses a teaser title for PREMIUM questions (the stem is never shown)", () => {
    const doc = buildQuestionDocument(question({ accessTier: "PREMIUM" }), ctx);
    expect(doc?.title).toBe("Quadratic equations question (3 marks)");
    expect(doc?.title).not.toContain("Solve");
  });

  it("bounds the stem excerpt", () => {
    const doc = buildQuestionDocument(question({ stem: "long ".repeat(1_000) }), ctx);
    expect(doc?.body.length).toBeLessThanOrEqual(BODY_LIMITS.questionStem);
    expect(doc?.title.length).toBeLessThanOrEqual(120);
  });

  it("never indexes private, part, or unpublished questions", () => {
    expect(buildQuestionDocument(question({ schoolId: "school" }), ctx)).toBeNull();
    expect(buildQuestionDocument(question({ ownerUserId: "tutor" }), ctx)).toBeNull();
    expect(buildQuestionDocument(question({ parentId: "root" }), ctx)).toBeNull();
    expect(buildQuestionDocument(question({ status: "IN_REVIEW" }), ctx)).toBeNull();
  });
});

describe("buildFlashcardDocument", () => {
  it("indexes the front of platform cards only", () => {
    const doc = buildFlashcardDocument({ ...flashcard(), back: "SECRET-BACK", notes: "SECRET-NOTES" } as FlashcardSource, ctx);
    expect(doc).toMatchObject({ body: "The quadratic formula", path: "/app/flashcards?cardId=fc1" });
    expect(JSON.stringify(doc)).not.toContain("SECRET");
  });

  it("titles PREMIUM cards by context only, never by their front (titles are shown to everyone)", () => {
    const premium = buildFlashcardDocument(flashcard({ accessTier: "PREMIUM" }), ctx);
    expect(premium?.title).toBe("Quadratic equations flashcard");
    expect(premium?.title).not.toContain("formula");
    const free = buildFlashcardDocument(flashcard({ accessTier: "FREE" }), ctx);
    expect(free?.title).toBe("The quadratic formula");
  });

  it("never indexes personal cards", () => {
    expect(buildFlashcardDocument(flashcard({ ownerUserId: "student" }), ctx)).toBeNull();
  });
});

describe("buildAssessmentDocument", () => {
  const assessment = (over: Partial<AssessmentSource> = {}): AssessmentSource => ({
    id: "as1",
    kind: "MOCK_EXAM",
    title: "O-Level Mathematics Mock Paper 2",
    description: "A full **timed** paper.",
    schoolId: null,
    ownerUserId: null,
    accessTier: "PREMIUM",
    status: "PUBLISHED",
    draftOfId: null,
    updatedAt,
    subject,
    syllabus: { id: "sy1", code: "4004", status: "CURRENT" },
    topics: [],
    ...over,
  });

  it("indexes platform assessments with title + description", () => {
    expect(buildAssessmentDocument(assessment(), ctx)).toMatchObject({
      title: "O-Level Mathematics Mock Paper 2",
      subtitle: "Mock exam · ZIMSEC O-Level · Mathematics",
      body: "A full timed paper.",
      path: "/app/exams/as1",
      syllabusIds: ["sy1"],
      rankBoost: RANK_BOOST.mockExam,
    });
  });

  it("never indexes school or tutor tests", () => {
    expect(buildAssessmentDocument(assessment({ schoolId: "school" }), ctx)).toBeNull();
    expect(buildAssessmentDocument(assessment({ ownerUserId: "tutor" }), ctx)).toBeNull();
  });
});

describe("buildStudyPackDocument", () => {
  const pack = (over: Partial<StudyPackSource> = {}): StudyPackSource => ({
    id: "sp1",
    slug: "o-level-maths-pack",
    title: "O-Level Mathematics Complete Study Pack",
    subtitle: null,
    description: "Everything for **Paper 1** and **Paper 2**.",
    isFeatured: true,
    status: "PUBLISHED",
    draftOfId: null,
    updatedAt,
    scopes: [{ qualification: null, subject, syllabus: null }],
    ...over,
  });

  it("indexes the public landing page with its scope", () => {
    expect(buildStudyPackDocument(pack())).toMatchObject({
      path: "/app/study-packs/o-level-maths-pack",
      accessTier: "PUBLIC",
      subjectIds: ["s1"],
      subtitle: "ZIMSEC O-Level Mathematics",
      rankBoost: RANK_BOOST.featuredStudyPack,
    });
  });

  it("drops packs whose scopes are all hidden", () => {
    expect(buildStudyPackDocument(pack({ scopes: [{ qualification: null, subject: hiddenSubject, syllabus: null }] }))).toBeNull();
    expect(buildStudyPackDocument(pack({ scopes: [] }))?.subjectIds).toEqual([]);
  });
});

describe("buildTopicDocument", () => {
  const topic = (over: Partial<TopicSource> = {}): TopicSource => ({
    ...quadratics,
    description: "Solving by factorisation, completing the square and the formula.",
    publicSummary: null,
    updatedAt,
    ...over,
  });

  it("indexes topics of the CURRENT version with their SEO path and ancestors", () => {
    expect(buildTopicDocument(topic(), ctx)).toMatchObject({
      title: "Quadratic equations",
      subtitle: "ZIMSEC O-Level · Mathematics · Algebra",
      path: "/zimsec/o-level/mathematics/quadratic-equations",
      accessTier: "PUBLIC",
      topicIds: ["t1", "t2"],
      rankBoost: RANK_BOOST.topic.SUBTOPIC,
    });
  });

  it("links non-public topics into the app and skips other versions", () => {
    expect(buildTopicDocument(topic({ isPublic: false }), ctx)?.path).toBe("/app/subjects/s1/topics/t2");
    expect(buildTopicDocument(topic({ syllabus: { ...syllabus, status: "SUPERSEDED" } }), ctx)).toBeNull();
    expect(buildTopicDocument(topic({ syllabus: { ...syllabus, subject: hiddenSubject } }), ctx)).toBeNull();
  });
});

describe("buildSubjectDocument", () => {
  const source = (over: Partial<SubjectSource> = {}): SubjectSource => ({
    ...subject,
    description: null,
    publicSummary: "Original summary of **O-Level Mathematics**.",
    updatedAt,
    currentSyllabus: { id: "sy1", code: "4004" },
    ...over,
  });

  it("indexes listed subjects", () => {
    expect(buildSubjectDocument(source())).toMatchObject({
      title: "Mathematics",
      subtitle: "ZIMSEC O-Level · 4004",
      body: "Original summary of O-Level Mathematics.",
      path: "/zimsec/o-level/mathematics",
      accessTier: "PUBLIC",
      syllabusIds: ["sy1"],
      rankBoost: RANK_BOOST.subject,
    });
    expect(buildSubjectDocument(source({ isPublic: false }))?.path).toBe("/app/subjects/s1");
  });

  it("skips hidden subjects", () => {
    expect(buildSubjectDocument(source({ catalogueStatus: "HIDDEN" }))).toBeNull();
    expect(buildSubjectDocument(source({ catalogueStatus: "COMING_SOON" }))).not.toBeNull();
  });
});
