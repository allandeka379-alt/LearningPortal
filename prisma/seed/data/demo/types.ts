/**
 * Shapes of the DEV-ONLY demo content (§50: realistic seed/demo data only in development). Every item is ORIGINAL
 * text written for this project: never copied from past papers, mark schemes or textbooks (§27).
 *
 * Question payloads / answer specs follow `@/lib/questions` (validated by the seed with `validateQuestionDefinition`
 * before anything is written). A DIAGRAM_LABELLING payload names its diagram with `mediaAssetId: "$diagram:<key>"`;
 * the seed replaces it with the id of the generated MediaAsset.
 */
import type { CognitiveSkill, ContentAccessTier, FlashcardType, LessonKind, MarkingMode, QuestionType } from "@/generated/prisma/enums";

export interface DemoObjective {
  code?: string;
  statement: string;
  skill: CognitiveSkill;
}

export interface DemoSubtopic {
  slug: string;
  code: string;
  name: string;
  description?: string;
  estimatedStudyMinutes?: number;
  objectives: DemoObjective[];
}

export interface DemoTopic {
  slug: string;
  code: string;
  name: string;
  description: string;
  publicSummary?: string;
  estimatedStudyMinutes?: number;
  subtopics: DemoSubtopic[];
}

export interface DemoComponent {
  code: string;
  name: string;
  kind: "WRITTEN" | "MULTIPLE_CHOICE";
  durationMinutes: number;
  calculatorAllowed: boolean | null;
  description: string;
}

export interface DemoOption {
  key: string;
  content: string;
  isCorrect: boolean;
  rationale?: string;
}

export interface DemoQuestionCore {
  type: QuestionType;
  markingMode?: MarkingMode;
  marks: number;
  difficulty: number;
  stem: string;
  payload?: unknown;
  answerSpec?: unknown;
  options?: DemoOption[];
  explanation?: string;
  workedSolution?: string;
  hints?: string[];
  conceptSummary?: string;
  cognitiveSkill?: CognitiveSkill;
  estimatedSeconds?: number;
  calculatorAllowed?: boolean;
}

export interface DemoPart extends DemoQuestionCore {
  partLabel: string;
}

export interface DemoQuestion extends DemoQuestionCore {
  /** Unique within the subject; the seed prefixes it into `Question.externalRef`. */
  ref: string;
  /** Slug of the (sub)topic this question counts towards (primary tag). */
  topic: string;
  parts?: DemoPart[];
  isExamStyle?: boolean;
  /** Short, auto-marked: may be scheduled as the daily question. */
  daily?: boolean;
  accessTier?: ContentAccessTier;
  paperLabel?: string;
}

export interface DemoLesson {
  ref: string;
  slug: string;
  title: string;
  kind: LessonKind;
  /** Home topic (primary tag). */
  topic: string;
  /** Further topic tags. */
  extraTopics?: string[];
  accessTier: ContentAccessTier;
  summary: string;
  estimatedMinutes: number;
  body: string;
  /** Questions embedded as lesson practice (§8), by question ref. */
  practice?: string[];
}

export interface DemoFlashcard {
  ref: string;
  topic: string;
  cardType: FlashcardType;
  front: string;
  back: string;
  notes?: string;
  accessTier?: ContentAccessTier;
}

export interface DemoAssessmentSection {
  title: string;
  instructions?: string;
  /** SyllabusComponent.code of the demo syllabus this section simulates. */
  componentCode?: string;
  timeLimitSeconds?: number;
  questions: string[];
}

export interface DemoAssessment {
  ref: string;
  kind: "TOPIC_TEST" | "MOCK_EXAM";
  title: string;
  description: string;
  instructions: string;
  accessTier: ContentAccessTier;
  timeLimitSeconds?: number;
  /** Topic slugs the assessment covers (none = whole syllabus). */
  topics?: string[];
  sections: DemoAssessmentSection[];
}

export interface DemoDiagram {
  key: string;
  altText: string;
  caption: string;
  longDescription: string;
  width: number;
  height: number;
  /** Shapes only, no text (labels are what the student supplies). */
  svg: string;
}

export interface DemoSubjectContent {
  /** Prefix for externalRef values, e.g. "demo:zimsec-o-math". */
  refPrefix: string;
  boardSlug: string;
  qualificationSlug: string;
  subjectSlug: string;
  syllabus: {
    versionLabel: string;
    title: string;
    overview: string;
    assessmentOverview: string;
    effectiveFrom: string;
    components: DemoComponent[];
  };
  topics: DemoTopic[];
  diagrams: DemoDiagram[];
  questions: DemoQuestion[];
  lessons: DemoLesson[];
  flashcards: DemoFlashcard[];
  assessments: DemoAssessment[];
}

/** Title every demo syllabus version carries (task requirement: clearly not official). */
export const DEMO_SYLLABUS_TITLE = "Demo syllabus (development only — not official)";
export const DEMO_VERSION_LABEL = "demo-development";
/**
 * Demo versions take effect long before any real one, so a real version imported by the content pipeline always counts
 * as NEWER: it can be published as CURRENT over the demo version (no rollback refusal) and students pinned to the demo
 * version are offered the move to it (src/server/enrollment/version-move-core.ts).
 */
export const DEMO_EFFECTIVE_FROM = "2000-01-01";
export const DEMO_AUTHOR = "Demo content (development only)";
