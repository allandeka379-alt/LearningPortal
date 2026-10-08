import type {
  AssessmentKind,
  CatalogueStatus,
  ContentAccessTier,
  ContentStatus,
  FlashcardType,
  LessonKind,
  QuestionType,
  SyllabusStatus,
  TopicKind,
} from "@/generated/prisma/client";

/**
 * Shared types of the search domain (§28, ARCHITECTURE §3.9). Pure: no I/O, safe to import from tests and from the
 * pure document builders.
 */

/** The `ContentEntityType` values that have a SearchDocument. SYLLABUS / MEDIA_ASSET / STUDY_PLAN_TEMPLATE do not. */
export const SEARCHABLE_ENTITY_TYPES = [
  "SUBJECT",
  "TOPIC",
  "LESSON",
  "QUESTION",
  "FLASHCARD",
  "ASSESSMENT",
  "STUDY_PACK",
] as const;

export type SearchableEntityType = (typeof SEARCHABLE_ENTITY_TYPES)[number];

export function isSearchableEntityType(value: unknown): value is SearchableEntityType {
  return typeof value === "string" && (SEARCHABLE_ENTITY_TYPES as readonly string[]).includes(value);
}

/**
 * One row of the index, exactly as the indexer writes it (`status` is always PUBLISHED and `searchVector` is a
 * generated column, so neither appears here).
 */
export interface SearchDocumentInput {
  entityType: SearchableEntityType;
  entityId: string;
  title: string;
  /** Breadcrumb, e.g. "ZIMSEC O-Level · Mathematics · Algebra". */
  subtitle: string | null;
  /** Plain text, bounded (see BODY_LIMITS in documents.ts). Never answers, explanations, mark schemes or card backs. */
  body: string;
  /** Denormalised curriculum names, codes and labels (weight B in the tsvector). */
  keywords: string;
  /** Canonical URL path of the result (scheme documented in documents.ts). */
  path: string;
  languageCode: string;
  accessTier: ContentAccessTier;
  examBoardIds: string[];
  qualificationIds: string[];
  levelIds: string[];
  subjectIds: string[];
  syllabusIds: string[];
  /** Tagged topics PLUS all their ancestors, so a topic filter matches the whole subtree. */
  topicIds: string[];
  rankBoost: number;
  sourceUpdatedAt: Date;
}

// ---------------------------------------------------------------------------------------------------------------------
// Curriculum references used by the pure builders. Field names match the Prisma selects in indexer.ts, so loaded rows
// are passed through unchanged.
// ---------------------------------------------------------------------------------------------------------------------

export interface BoardRef {
  id: string;
  slug: string;
  code: string;
  name: string;
  shortName: string;
  catalogueStatus: CatalogueStatus;
}

export interface LevelRef {
  id: string;
  slug: string;
  name: string;
  shortName: string | null;
}

export interface QualificationRef {
  id: string;
  slug: string;
  code: string | null;
  name: string;
  shortName: string;
  catalogueStatus: CatalogueStatus;
  level: LevelRef;
  examBoard: BoardRef;
}

export interface SubjectRef {
  id: string;
  slug: string;
  name: string;
  shortName: string | null;
  officialCode: string | null;
  languageCode: string;
  isPublic: boolean;
  catalogueStatus: CatalogueStatus;
  qualification: QualificationRef;
}

export interface SyllabusRef {
  id: string;
  code: string | null;
  status: SyllabusStatus;
  subject: SubjectRef;
}

export interface TopicRef {
  id: string;
  name: string;
  slug: string;
  code: string | null;
  /** Materialised id path "<rootId>/<childId>/<id>". */
  path: string;
  kind: TopicKind;
  isPublic: boolean;
  syllabus: SyllabusRef;
}

export interface TopicTag {
  topic: TopicRef;
  isPrimary: boolean;
}

/** Name lookup for topic ancestors (ids taken from TopicRef.path), loaded in one query per batch. */
export interface TopicName {
  id: string;
  name: string;
}

export interface BuildContext {
  ancestors: ReadonlyMap<string, TopicName>;
}

// ---------------------------------------------------------------------------------------------------------------------
// Source rows (what the indexer loads per entity type). Deliberately WITHOUT answer-bearing columns (answerSpec,
// explanation, workedSolution, hints, options, flashcard back): the builders cannot index what they never receive.
// ---------------------------------------------------------------------------------------------------------------------

interface WorkflowColumns {
  status: ContentStatus;
  draftOfId: string | null;
  updatedAt: Date;
}

export interface LessonSource extends WorkflowColumns {
  id: string;
  kind: LessonKind;
  title: string;
  slug: string;
  summary: string | null;
  body: string;
  languageCode: string;
  accessTier: ContentAccessTier;
  subject: SubjectRef | null;
  qualification: QualificationRef | null;
  examBoard: BoardRef | null;
  topics: TopicTag[];
}

export interface QuestionSource extends WorkflowColumns {
  id: string;
  parentId: string | null;
  schoolId: string | null;
  ownerUserId: string | null;
  type: QuestionType;
  stem: string;
  marks: number;
  paperLabel: string | null;
  year: number | null;
  isExamStyle: boolean;
  languageCode: string;
  accessTier: ContentAccessTier;
  subject: SubjectRef;
  topics: TopicTag[];
}

export interface FlashcardSource extends WorkflowColumns {
  id: string;
  ownerUserId: string | null;
  cardType: FlashcardType;
  front: string;
  languageCode: string;
  accessTier: ContentAccessTier;
  subject: SubjectRef;
  topics: TopicTag[];
}

export interface AssessmentSource extends WorkflowColumns {
  id: string;
  kind: AssessmentKind;
  title: string;
  description: string | null;
  schoolId: string | null;
  ownerUserId: string | null;
  accessTier: ContentAccessTier;
  subject: SubjectRef;
  syllabus: { id: string; code: string | null; status: SyllabusStatus } | null;
  topics: TopicTag[];
}

export interface StudyPackScopeRef {
  qualification: QualificationRef | null;
  subject: SubjectRef | null;
  syllabus: SyllabusRef | null;
}

export interface StudyPackSource extends WorkflowColumns {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  isFeatured: boolean;
  scopes: StudyPackScopeRef[];
}

export interface TopicSource extends TopicRef {
  description: string | null;
  publicSummary: string | null;
  updatedAt: Date;
}

export interface SubjectSource extends SubjectRef {
  description: string | null;
  publicSummary: string | null;
  updatedAt: Date;
  /** The CURRENT syllabus version (at most one per subject), for its code and id. */
  currentSyllabus: { id: string; code: string | null } | null;
}
