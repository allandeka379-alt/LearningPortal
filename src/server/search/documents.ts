import type {
  AssessmentKind,
  CatalogueStatus,
  FlashcardType,
  LessonKind,
  QuestionType,
  TopicKind,
} from "@/generated/prisma/client";
import { toPlainText } from "@/server/content/render";
import { cleanText, joinKeywords, truncateAtWord } from "./text";
import type {
  AssessmentSource,
  BoardRef,
  BuildContext,
  FlashcardSource,
  LessonSource,
  QualificationRef,
  QuestionSource,
  SearchDocumentInput,
  StudyPackSource,
  SubjectRef,
  SubjectSource,
  SyllabusRef,
  TopicRef,
  TopicSource,
  TopicTag,
} from "./types";

/**
 * Pure SearchDocument builders (§28, ARCHITECTURE §3.9): one function per entity type, from loaded row objects to the
 * index row, or `null` when the row must NOT be in the index (the indexer then deletes any existing document).
 *
 * Eligibility (what may be indexed):
 * - content (lesson, question, flashcard, assessment, study pack): PUBLISHED live rows only (never a draft copy);
 *   platform rows only (school/tutor questions and tests and personal flashcards are never indexed); question PARTS
 *   are not indexed (their root is);
 * - catalogue visibility: content is indexed only for subjects whose subject, qualification and board are not HIDDEN
 *   (topics of DRAFT syllabus versions are ignored); an item with no visible subject is not indexed;
 * - TOPIC documents exist for topics of the CURRENT syllabus version of a visible subject;
 * - SUBJECT documents exist for visible subjects (AVAILABLE, COMING_SOON or RETIRED chain).
 *
 * Body (never answers): lesson summary + body; question STEM excerpt only (no options, answer spec, explanation,
 * worked solution or hints); flashcard FRONT only; assessment / study pack description; topic / subject public
 * summary (or description). Bodies of PREMIUM items are indexed so they can be found, but query.ts never returns them
 * without entitlement. Titles are shown to everyone (locked teasers, autocomplete), so PREMIUM questions and flashcards
 * get a context-only title ("Quadratic equations question (3 marks)", "Quadratic equations flashcard"), never their
 * stem or front.
 *
 * URL path scheme (`SearchDocument.path`):
 *   SUBJECT     /{board}/{qualification}/{subject}                 (subject.isPublic)   else /app/subjects/{subjectId}
 *   TOPIC       /{board}/{qualification}/{subject}/{topic}         (subject + topic public)
 *                                                                  else /app/subjects/{subjectId}/topics/{topicId}
 *   LESSON      PUBLIC lessons (study guides, articles, public lessons) get an SEO guide page:
 *                 subject scope        /{board}/{qualification}/{subject}/guides/{slug}   (subject.isPublic)
 *                 qualification scope  /{board}/{qualification}/guides/{slug}
 *                 board scope          /{board}/guides/{slug}
 *                 general              /guides/{slug}                       (`src/app/(marketing)/guides/[slug]`)
 *               every other lesson     /app/lessons/{lessonId}
 *   QUESTION    /app/practice?questionId={questionId}     (practice builder seeded with that question)
 *   FLASHCARD   /app/flashcards?cardId={flashcardId}
 *   ASSESSMENT  /app/exams/{assessmentId}
 *   STUDY_PACK  /app/study-packs/{slug}                    (the student pack landing page: outline, price, §24)
 * Slugs are URL-encoded segments; app paths use ids because subject/topic slugs are only unique per parent.
 * `routes.test.ts` checks that every pattern above resolves to a route under `src/app`.
 */

/** Upper bounds on indexed text (SearchDocument.body is "~10k chars"). */
export const BODY_LIMITS = {
  default: 10_000,
  /** §28 question results: a stem excerpt, not the whole question. */
  questionStem: 1_000,
  flashcardFront: 500,
} as const;

export const TITLE_MAX = 300;
/** Length of the stem / front excerpt used as a question or flashcard title. */
export const EXCERPT_TITLE_MAX = 120;
/** Hard cap on markdown handed to the parser (render.ts refuses > 500k); plain text is cut afterwards anyway. */
const MAX_MARKDOWN_FOR_INDEX = 200_000;

/** Editorial defaults for SearchDocument.rankBoost (query.ts adds 0.02 per point, clamped to ±10). */
export const RANK_BOOST = {
  subject: 6,
  topic: { TOPIC: 4, SUBTOPIC: 3, SECTION: 2 } satisfies Record<TopicKind, number>,
  lesson: { LESSON: 2, REVISION_NOTES: 2, WORKED_EXAMPLES: 1, EXAM_TIPS: 1, STUDY_GUIDE: 1, ARTICLE: 1 } satisfies Record<
    LessonKind,
    number
  >,
  mockExam: 2,
  assessment: 1,
  studyPack: 1,
  featuredStudyPack: 3,
  question: 0,
  flashcard: 0,
} as const;

// UI copy (labels), not content: they make "mock exam chemistry" or "revision notes" findable.
const LESSON_KIND_LABELS: Record<LessonKind, string> = {
  LESSON: "Lesson",
  REVISION_NOTES: "Revision notes",
  WORKED_EXAMPLES: "Worked examples",
  EXAM_TIPS: "Exam tips",
  STUDY_GUIDE: "Study guide",
  ARTICLE: "Article",
};

export const ASSESSMENT_KIND_LABELS: Record<AssessmentKind, string> = {
  QUIZ: "Quiz",
  TOPIC_TEST: "Topic test",
  CHAPTER_TEST: "Chapter test",
  SUBJECT_TEST: "Subject test",
  MOCK_EXAM: "Mock exam",
  DIAGNOSTIC: "Diagnostic test",
  TIMED_EXAM: "Timed exam",
};

const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  MULTIPLE_CHOICE: "Multiple choice",
  TRUE_FALSE: "True or false",
  SHORT_ANSWER: "Short answer",
  NUMERICAL: "Numerical",
  STRUCTURED: "Structured",
  ESSAY: "Essay",
  CALCULATION: "Calculation",
  MATCHING: "Matching",
  FILL_IN_THE_BLANK: "Fill in the blank",
  DIAGRAM_LABELLING: "Diagram labelling",
  EXTENDED_RESPONSE: "Extended response",
};

const FLASHCARD_TYPE_LABELS: Record<FlashcardType, string> = {
  DEFINITION: "Definition",
  FORMULA: "Formula",
  VOCABULARY: "Vocabulary",
  CONCEPT: "Concept",
  DATE: "Date",
  FACT: "Fact",
};

// ---------------------------------------------------------------------------------------------------------------------
// Visibility helpers
// ---------------------------------------------------------------------------------------------------------------------

function isListed(status: CatalogueStatus): boolean {
  return status !== "HIDDEN";
}

export function isBoardListed(board: BoardRef): boolean {
  return isListed(board.catalogueStatus);
}

export function isQualificationListed(qualification: QualificationRef): boolean {
  return isListed(qualification.catalogueStatus) && isBoardListed(qualification.examBoard);
}

export function isSubjectListed(subject: SubjectRef): boolean {
  return isListed(subject.catalogueStatus) && isQualificationListed(subject.qualification);
}

/** Topics count only when their syllabus version is published (not DRAFT) and their subject is listed. */
function isTopicUsable(topic: TopicRef): boolean {
  return topic.syllabus.status !== "DRAFT" && isSubjectListed(topic.syllabus.subject);
}

function isPlatformLive(row: { status: string; draftOfId: string | null }): boolean {
  return row.status === "PUBLISHED" && row.draftOfId === null;
}

// ---------------------------------------------------------------------------------------------------------------------
// Text helpers
// ---------------------------------------------------------------------------------------------------------------------

/** Plain text of authored markdown (markdown/LaTeX delimiters stripped via the content pipeline), bounded. */
export function plainText(markdown: string | null | undefined, max: number = BODY_LIMITS.default): string {
  if (markdown === null || markdown === undefined || markdown.trim() === "") return "";
  return truncateAtWord(cleanText(toPlainText(markdown.slice(0, MAX_MARKDOWN_FOR_INDEX))), max);
}

function title(value: string): string {
  return truncateAtWord(cleanText(value), TITLE_MAX, true);
}

function excerptTitle(markdown: string): string {
  const text = plainText(markdown, EXCERPT_TITLE_MAX * 4);
  return truncateAtWord(text, EXCERPT_TITLE_MAX, true);
}

/** "ZIMSEC O-Level" — board short name + qualification short name (the qualification name may already contain it). */
export function qualificationLabel(qualification: QualificationRef): string {
  const board = cleanText(qualification.examBoard.shortName);
  const short = cleanText(qualification.shortName);
  return short.toLowerCase().startsWith(board.toLowerCase()) ? short : `${board} ${short}`;
}

function breadcrumb(parts: Array<string | null | undefined>): string | null {
  const kept = parts.map((part) => (part ? cleanText(part) : "")).filter((part) => part !== "");
  return kept.length === 0 ? null : truncateAtWord(kept.join(" · "), TITLE_MAX, true);
}

// ---------------------------------------------------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------------------------------------------------

const seg = (value: string): string => encodeURIComponent(value);

export function subjectSeoPath(subject: SubjectRef): string {
  const qualification = subject.qualification;
  return `/${seg(qualification.examBoard.slug)}/${seg(qualification.slug)}/${seg(subject.slug)}`;
}

export function subjectPath(subject: SubjectRef): string {
  return subject.isPublic ? subjectSeoPath(subject) : `/app/subjects/${seg(subject.id)}`;
}

export function topicPath(topic: TopicRef): string {
  const subject = topic.syllabus.subject;
  return subject.isPublic && topic.isPublic
    ? `${subjectSeoPath(subject)}/${seg(topic.slug)}`
    : `/app/subjects/${seg(subject.id)}/topics/${seg(topic.id)}`;
}

/** PUBLIC lessons resolve to the guide page of their HOME scope (slugs are unique per home subject / globally). */
function lessonPath(lesson: LessonSource): string {
  if (lesson.accessTier === "PUBLIC") {
    const slug = seg(lesson.slug);
    if (lesson.subject) {
      if (lesson.subject.isPublic && isSubjectListed(lesson.subject)) {
        return `${subjectSeoPath(lesson.subject)}/guides/${slug}`;
      }
    } else if (lesson.qualification) {
      const q = lesson.qualification;
      return `/${seg(q.examBoard.slug)}/${seg(q.slug)}/guides/${slug}`;
    } else if (lesson.examBoard) {
      return `/${seg(lesson.examBoard.slug)}/guides/${slug}`;
    } else {
      return `/guides/${slug}`;
    }
  }
  return `/app/lessons/${seg(lesson.id)}`;
}

// ---------------------------------------------------------------------------------------------------------------------
// Curriculum accumulation (denormalised filter ids + keyword names)
// ---------------------------------------------------------------------------------------------------------------------

class Curriculum {
  readonly boardIds = new Set<string>();
  readonly qualificationIds = new Set<string>();
  readonly levelIds = new Set<string>();
  readonly subjectIds = new Set<string>();
  readonly syllabusIds = new Set<string>();
  readonly topicIds = new Set<string>();
  readonly keywords: Array<string | null | undefined> = [];

  addBoard(board: BoardRef): void {
    if (this.boardIds.has(board.id)) return;
    this.boardIds.add(board.id);
    this.keywords.push(board.shortName, board.code, board.name);
  }

  addQualification(qualification: QualificationRef): void {
    this.addBoard(qualification.examBoard);
    if (this.qualificationIds.has(qualification.id)) return;
    this.qualificationIds.add(qualification.id);
    this.levelIds.add(qualification.level.id);
    this.keywords.push(
      qualification.shortName,
      qualification.code,
      qualification.name,
      qualification.level.name,
      qualification.level.shortName,
    );
  }

  addSubject(subject: SubjectRef): void {
    this.addQualification(subject.qualification);
    if (this.subjectIds.has(subject.id)) return;
    this.subjectIds.add(subject.id);
    this.keywords.push(subject.name, subject.shortName, subject.officialCode);
  }

  addSyllabus(syllabus: SyllabusRef): void {
    this.addSubject(syllabus.subject);
    if (this.syllabusIds.has(syllabus.id)) return;
    this.syllabusIds.add(syllabus.id);
    this.keywords.push(syllabus.code);
  }

  addTopic(topic: TopicRef, ctx: BuildContext): void {
    this.addSyllabus(topic.syllabus);
    for (const id of topic.path.split("/")) {
      if (id === "" || this.topicIds.has(id)) continue;
      this.topicIds.add(id);
      if (id === topic.id) this.keywords.push(topic.name);
      else this.keywords.push(ctx.ancestors.get(id)?.name);
    }
  }

  ids(): Pick<
    SearchDocumentInput,
    "examBoardIds" | "qualificationIds" | "levelIds" | "subjectIds" | "syllabusIds" | "topicIds"
  > {
    return {
      examBoardIds: [...this.boardIds],
      qualificationIds: [...this.qualificationIds],
      levelIds: [...this.levelIds],
      subjectIds: [...this.subjectIds],
      syllabusIds: [...this.syllabusIds],
      topicIds: [...this.topicIds],
    };
  }
}

interface ContentCurriculum {
  curriculum: Curriculum;
  primarySubject: SubjectRef;
  primaryTopic: TopicRef | null;
}

/**
 * Curriculum of a subject-homed content item: the home subject (when listed) plus every usable tagged topic. The
 * primary subject is the home subject, or the first listed tagged subject when the home subject is hidden; the
 * primary topic prefers a primary tag in that subject's CURRENT version. Null when no listed subject remains.
 */
function contentCurriculum(home: SubjectRef | null, tags: readonly TopicTag[], ctx: BuildContext): ContentCurriculum | null {
  const curriculum = new Curriculum();
  const usable = tags.filter((tag) => isTopicUsable(tag.topic));
  const homeListed = home !== null && isSubjectListed(home);
  if (homeListed) curriculum.addSubject(home);
  for (const tag of usable) curriculum.addTopic(tag.topic, ctx);

  const primarySubject = homeListed ? home : (usable[0]?.topic.syllabus.subject ?? null);
  if (primarySubject === null) return null;

  const inPrimary = usable.filter((tag) => tag.topic.syllabus.subject.id === primarySubject.id);
  const primaryTag =
    inPrimary.find((tag) => tag.isPrimary && tag.topic.syllabus.status === "CURRENT") ??
    inPrimary.find((tag) => tag.isPrimary) ??
    inPrimary[0] ??
    usable.find((tag) => tag.isPrimary) ??
    usable[0];
  return { curriculum, primarySubject, primaryTopic: primaryTag?.topic ?? null };
}

function contentBreadcrumb(primarySubject: SubjectRef, primaryTopic: TopicRef | null, ...prefix: string[]): string | null {
  return breadcrumb([...prefix, qualificationLabel(primarySubject.qualification), primarySubject.name, primaryTopic?.name]);
}

// ---------------------------------------------------------------------------------------------------------------------
// Builders
// ---------------------------------------------------------------------------------------------------------------------

export function buildLessonDocument(lesson: LessonSource, ctx: BuildContext): SearchDocumentInput | null {
  if (!isPlatformLive(lesson)) return null;

  let curriculum: Curriculum;
  let subtitle: string | null;

  if (lesson.subject !== null) {
    const resolved = contentCurriculum(lesson.subject, lesson.topics, ctx);
    if (resolved === null) return null;
    curriculum = resolved.curriculum;
    subtitle = contentBreadcrumb(resolved.primarySubject, resolved.primaryTopic);
  } else {
    // Subject-less public article / study guide: scoped to a qualification, a board, or general (§44). Topic tags,
    // if any, still feed the filters.
    curriculum = new Curriculum();
    if (lesson.qualification) {
      if (!isQualificationListed(lesson.qualification)) return null;
      curriculum.addQualification(lesson.qualification);
      subtitle = breadcrumb([qualificationLabel(lesson.qualification)]);
    } else if (lesson.examBoard) {
      if (!isBoardListed(lesson.examBoard)) return null;
      curriculum.addBoard(lesson.examBoard);
      subtitle = breadcrumb([lesson.examBoard.shortName]);
    } else {
      subtitle = null;
    }
    for (const tag of lesson.topics) if (isTopicUsable(tag.topic)) curriculum.addTopic(tag.topic, ctx);
  }

  const body = plainText([lesson.summary, lesson.body].filter(Boolean).join("\n\n"));
  return {
    entityType: "LESSON",
    entityId: lesson.id,
    title: title(lesson.title),
    subtitle,
    body,
    keywords: joinKeywords([LESSON_KIND_LABELS[lesson.kind], ...curriculum.keywords]),
    path: lessonPath(lesson),
    languageCode: lesson.languageCode,
    accessTier: lesson.accessTier,
    ...curriculum.ids(),
    rankBoost: RANK_BOOST.lesson[lesson.kind],
    sourceUpdatedAt: lesson.updatedAt,
  };
}

/** Title shown for a PREMIUM question: names its context, never its text (§44 "do not expose premium content"). */
export function premiumQuestionTitle(contextName: string, marks: number): string {
  return `${cleanText(contextName)} question (${marks} ${marks === 1 ? "mark" : "marks"})`;
}

export function buildQuestionDocument(question: QuestionSource, ctx: BuildContext): SearchDocumentInput | null {
  if (!isPlatformLive(question) || question.parentId !== null) return null;
  if (question.schoolId !== null || question.ownerUserId !== null) return null;
  const resolved = contentCurriculum(question.subject, question.topics, ctx);
  if (resolved === null) return null;
  const { curriculum, primarySubject, primaryTopic } = resolved;

  const questionTitle =
    question.accessTier === "PREMIUM"
      ? premiumQuestionTitle(primaryTopic?.name ?? primarySubject.name, question.marks)
      : excerptTitle(question.stem) || premiumQuestionTitle(primaryTopic?.name ?? primarySubject.name, question.marks);

  return {
    entityType: "QUESTION",
    entityId: question.id,
    title: questionTitle,
    subtitle: contentBreadcrumb(primarySubject, primaryTopic),
    body: plainText(question.stem, BODY_LIMITS.questionStem),
    keywords: joinKeywords([
      "Question",
      QUESTION_TYPE_LABELS[question.type],
      question.isExamStyle ? "Exam-style" : null,
      question.paperLabel,
      question.year === null ? null : String(question.year),
      ...curriculum.keywords,
    ]),
    path: `/app/practice?questionId=${seg(question.id)}`,
    languageCode: question.languageCode,
    accessTier: question.accessTier,
    ...curriculum.ids(),
    rankBoost: RANK_BOOST.question,
    sourceUpdatedAt: question.updatedAt,
  };
}

/**
 * Title shown for a PREMIUM flashcard: names its context, never its front. Titles are returned to every viewer (locked
 * teasers in search, and autocomplete, which has no entitlement check), so the front of a premium card must not be one
 * (§44 "do not expose premium content"), exactly like {@link premiumQuestionTitle}.
 */
export function premiumFlashcardTitle(contextName: string): string {
  return `${cleanText(contextName)} flashcard`;
}

export function buildFlashcardDocument(card: FlashcardSource, ctx: BuildContext): SearchDocumentInput | null {
  // Personal cards (ownerUserId) are private to their owner: never indexed.
  if (card.ownerUserId !== null || !isPlatformLive(card)) return null;
  const resolved = contentCurriculum(card.subject, card.topics, ctx);
  if (resolved === null) return null;
  const { curriculum, primarySubject, primaryTopic } = resolved;
  const front = plainText(card.front, BODY_LIMITS.flashcardFront);
  const contextTitle = premiumFlashcardTitle(primaryTopic?.name ?? primarySubject.name);

  return {
    entityType: "FLASHCARD",
    entityId: card.id,
    title: card.accessTier === "PREMIUM" ? contextTitle : truncateAtWord(front, EXCERPT_TITLE_MAX, true) || contextTitle,
    subtitle: contentBreadcrumb(primarySubject, primaryTopic),
    body: front,
    keywords: joinKeywords(["Flashcard", FLASHCARD_TYPE_LABELS[card.cardType], ...curriculum.keywords]),
    path: `/app/flashcards?cardId=${seg(card.id)}`,
    languageCode: card.languageCode,
    accessTier: card.accessTier,
    ...curriculum.ids(),
    rankBoost: RANK_BOOST.flashcard,
    sourceUpdatedAt: card.updatedAt,
  };
}

export function buildAssessmentDocument(assessment: AssessmentSource, ctx: BuildContext): SearchDocumentInput | null {
  if (!isPlatformLive(assessment)) return null;
  if (assessment.schoolId !== null || assessment.ownerUserId !== null) return null;
  const resolved = contentCurriculum(assessment.subject, assessment.topics, ctx);
  if (resolved === null) return null;
  const { curriculum, primarySubject, primaryTopic } = resolved;
  const syllabus = assessment.syllabus;
  if (syllabus !== null && syllabus.status !== "DRAFT" && isSubjectListed(assessment.subject)) {
    curriculum.syllabusIds.add(syllabus.id);
    curriculum.keywords.push(syllabus.code);
  }
  const kindLabel = ASSESSMENT_KIND_LABELS[assessment.kind];

  return {
    entityType: "ASSESSMENT",
    entityId: assessment.id,
    title: title(assessment.title),
    subtitle: contentBreadcrumb(primarySubject, primaryTopic, kindLabel),
    body: plainText(assessment.description),
    keywords: joinKeywords([kindLabel, ...curriculum.keywords]),
    path: `/app/exams/${seg(assessment.id)}`,
    // Assessment definitions have no language column; the subject's language drives the text-search config.
    languageCode: primarySubject.languageCode,
    accessTier: assessment.accessTier,
    ...curriculum.ids(),
    rankBoost: assessment.kind === "MOCK_EXAM" ? RANK_BOOST.mockExam : RANK_BOOST.assessment,
    sourceUpdatedAt: assessment.updatedAt,
  };
}

export function buildStudyPackDocument(pack: StudyPackSource): SearchDocumentInput | null {
  if (!isPlatformLive(pack)) return null;
  const curriculum = new Curriculum();
  const labels: string[] = [];
  let listedScopes = 0;
  for (const scope of pack.scopes) {
    if (scope.syllabus && isSubjectListed(scope.syllabus.subject)) {
      curriculum.addSyllabus(scope.syllabus);
      labels.push(`${qualificationLabel(scope.syllabus.subject.qualification)} ${scope.syllabus.subject.name}`);
      listedScopes++;
    } else if (scope.subject && isSubjectListed(scope.subject)) {
      curriculum.addSubject(scope.subject);
      labels.push(`${qualificationLabel(scope.subject.qualification)} ${scope.subject.name}`);
      listedScopes++;
    } else if (scope.qualification && isQualificationListed(scope.qualification)) {
      curriculum.addQualification(scope.qualification);
      labels.push(qualificationLabel(scope.qualification));
      listedScopes++;
    }
  }
  // A pack whose every scope is hidden is not on sale anywhere visible.
  if (pack.scopes.length > 0 && listedScopes === 0) return null;

  return {
    entityType: "STUDY_PACK",
    entityId: pack.id,
    title: title(pack.title),
    subtitle: pack.subtitle ? truncateAtWord(cleanText(pack.subtitle), TITLE_MAX, true) : breadcrumb(labels.slice(0, 3)),
    body: plainText(pack.description),
    keywords: joinKeywords(["Study pack", ...curriculum.keywords]),
    // The student landing page (/app/study-packs/[slug]); search is for signed-in students only.
    path: `/app/study-packs/${seg(pack.slug)}`,
    languageCode: "en",
    // The pack landing page is an outline, not content (§24); what it unlocks is gated at purchase.
    accessTier: "PUBLIC",
    ...curriculum.ids(),
    rankBoost: pack.isFeatured ? RANK_BOOST.featuredStudyPack : RANK_BOOST.studyPack,
    sourceUpdatedAt: pack.updatedAt,
  };
}

export function buildTopicDocument(topic: TopicSource, ctx: BuildContext): SearchDocumentInput | null {
  const subject = topic.syllabus.subject;
  if (topic.syllabus.status !== "CURRENT" || !isSubjectListed(subject)) return null;
  const curriculum = new Curriculum();
  curriculum.addTopic(topic, ctx);
  const ancestorNames = topic.path
    .split("/")
    .filter((id) => id !== "" && id !== topic.id)
    .map((id) => ctx.ancestors.get(id)?.name);

  return {
    entityType: "TOPIC",
    entityId: topic.id,
    title: title(topic.name),
    subtitle: breadcrumb([qualificationLabel(subject.qualification), subject.name, ...ancestorNames]),
    body: plainText(topic.publicSummary ?? topic.description),
    keywords: joinKeywords(["Topic", topic.code, ...curriculum.keywords]),
    path: topicPath(topic),
    languageCode: subject.languageCode,
    // Catalogue structure is public (SEO topic pages, §44).
    accessTier: "PUBLIC",
    ...curriculum.ids(),
    rankBoost: RANK_BOOST.topic[topic.kind],
    sourceUpdatedAt: topic.updatedAt,
  };
}

export function buildSubjectDocument(subject: SubjectSource): SearchDocumentInput | null {
  if (!isSubjectListed(subject)) return null;
  const curriculum = new Curriculum();
  curriculum.addSubject(subject);
  const current = subject.currentSyllabus;
  if (current) {
    curriculum.syllabusIds.add(current.id);
    curriculum.keywords.push(current.code);
  }
  const code = current?.code ?? subject.officialCode;

  return {
    entityType: "SUBJECT",
    entityId: subject.id,
    title: title(subject.name),
    subtitle: breadcrumb([qualificationLabel(subject.qualification), code]),
    body: plainText(subject.publicSummary ?? subject.description),
    keywords: joinKeywords(["Subject", subject.slug.replace(/-/g, " "), ...curriculum.keywords]),
    path: subjectPath(subject),
    languageCode: subject.languageCode,
    accessTier: "PUBLIC",
    ...curriculum.ids(),
    rankBoost: RANK_BOOST.subject,
    sourceUpdatedAt: subject.updatedAt,
  };
}
