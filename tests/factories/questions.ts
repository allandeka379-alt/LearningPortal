/**
 * Question fixtures (§9). Two layers:
 *
 * - `sampleQuestion(type, overrides?)` — PURE: a valid definition (payload, answer spec, options, parts) for every
 *   question type, checked with the shared Zod schemas and `validateQuestionDefinition`. Safe for unit tests (no
 *   database import at module load).
 * - `createQuestion(type, overrides?)` — DB: inserts the question (PUBLISHED by default, with its ContentRevision
 *   snapshot, options and parts) tagged to a topic, inside one transaction exactly like the publish merge requires
 *   (`setContentPublishContext` unlocks children; the deferred snapshot check runs at COMMIT). Without a `context` a
 *   fresh curriculum (board → qualification → subject → DRAFT syllabus → topics) is created with unique values. A
 *   chain from `createCurriculumChain` (./curriculum) can be used instead:
 *   `{ subjectId: chain.subject.id, syllabusId: chain.syllabus.id, topicIds: chain.topics.map((t) => t.id) }`.
 *
 * All content below is ORIGINAL placeholder text written for tests (never past-paper material, §27).
 */
import { randomUUID } from "node:crypto";
import { validateQuestionDefinition, type MarkingMode, type QuestionType } from "@/lib/questions";
import type { ContentAccessTier } from "@/generated/prisma/enums";
import type { Tx } from "@/server/lib/db-context";
// `./util` (not the `./index` barrel, which re-exports this module) keeps the import graph acyclic.
import { uniqueId, uniqueSlug } from "./util";

// ---------------------------------------------------------------------------------------------------------------
// Pure samples
// ---------------------------------------------------------------------------------------------------------------

export interface SampleOption {
  key: string;
  content: string;
  isCorrect: boolean;
  rationale?: string | null;
  sortOrder: number;
}

export interface SampleQuestion {
  type: QuestionType;
  markingMode: MarkingMode;
  marks: number;
  difficulty: number;
  stem: string;
  payload: unknown;
  answerSpec: unknown;
  explanation: string | null;
  hints: string[];
  options: SampleOption[];
  parts: SamplePart[];
}

export interface SamplePart extends SampleQuestion {
  partLabel: string;
}

function base(type: QuestionType, fields: Partial<SampleQuestion>): SampleQuestion {
  return {
    type,
    markingMode: "AUTO",
    marks: 1,
    difficulty: 3,
    stem: `Test ${type.toLowerCase().replace(/_/g, " ")} question.`,
    payload: null,
    answerSpec: null,
    explanation: "Original explanation written for tests.",
    hints: ["Original hint written for tests."],
    options: [],
    parts: [],
    ...fields,
  };
}

const SAMPLES: Readonly<Record<QuestionType, () => SampleQuestion>> = {
  MULTIPLE_CHOICE: () =>
    base("MULTIPLE_CHOICE", {
      stem: "Which value of $x$ satisfies $x^2 - 5x + 6 = 0$ and is even?",
      payload: { selectMode: "single", shuffleOptions: true },
      answerSpec: { scoring: "all_or_nothing" },
      options: [
        { key: "A", content: "$x = 2$", isCorrect: true, rationale: "$(2-2)(2-3) = 0$ and 2 is even.", sortOrder: 0 },
        { key: "B", content: "$x = -2$", isCorrect: false, rationale: "Sign error when factorising.", sortOrder: 1 },
        { key: "C", content: "$x = 3$", isCorrect: false, rationale: "A root, but odd.", sortOrder: 2 },
        { key: "D", content: "$x = 6$", isCorrect: false, rationale: "Confuses the constant term with a root.", sortOrder: 3 },
      ],
    }),
  TRUE_FALSE: () =>
    base("TRUE_FALSE", {
      stem: "Every square is a rectangle.",
      payload: { statementStyle: "true_false" },
      answerSpec: { correct: true, feedbackFalse: "A square has four right angles, so it is a rectangle." },
    }),
  SHORT_ANSWER: () =>
    base("SHORT_ANSWER", {
      stem: "Name the gas released during photosynthesis.",
      answerSpec: { accepted: [{ value: "oxygen" }, { value: "O2" }], normalise: ["trim", "lowercase"] },
    }),
  NUMERICAL: () =>
    base("NUMERICAL", {
      stem: "Solve $2x + 3 = 13$.",
      payload: { answerPrefix: "x =" },
      answerSpec: { value: 5 },
    }),
  CALCULATION: () =>
    base("CALCULATION", {
      stem: "A car travels 150 km in 2.5 h. Find its average speed.",
      marks: 2,
      markingMode: "AI_ASSISTED",
      payload: { unitHint: "km/h" },
      answerSpec: {
        value: 60,
        tolerance: { kind: "absolute", amount: 0.5 },
        units: { required: true, accepted: ["km/h", "km h^-1"], conversions: [{ unit: "m/s", factor: 3.6 }], penaltyMarks: 1 },
        methodMarks: [{ id: "M1", description: "Divides distance by time", marks: 1 }],
      },
    }),
  STRUCTURED: () =>
    base("STRUCTURED", {
      stem: "A rectangle has length $(x+3)$ cm and width $x$ cm.",
      marks: 3,
      parts: [
        {
          ...base("SHORT_ANSWER", {
            stem: "Write an expression for its area.",
            answerSpec: { accepted: [{ value: "x^2+3x" }, { value: "x(x+3)" }], normalise: ["remove_whitespace"] },
          }),
          partLabel: "(a)",
        },
        {
          ...base("NUMERICAL", { stem: "The area is 40 cm². Find $x$.", marks: 2, answerSpec: { value: 5 } }),
          partLabel: "(b)",
        },
      ],
    }),
  ESSAY: () =>
    base("ESSAY", {
      stem: "Discuss the advantages and disadvantages of renewable energy for a rural community.",
      marks: 10,
      markingMode: "AI_ASSISTED",
      payload: { wordLimit: { max: 400 } },
      answerSpec: {
        markScheme: {
          points: [
            { id: "P1", description: "Defines renewable energy accurately", marks: 2 },
            { id: "P2", description: "Explains at least two advantages with local examples", marks: 4 },
            { id: "P3", description: "Weighs disadvantages and reaches a justified conclusion", marks: 4 },
          ],
          levels: [
            { level: 1, minMarks: 1, maxMarks: 3, descriptor: "Simple statements" },
            { level: 2, minMarks: 4, maxMarks: 6, descriptor: "Developed explanation" },
            { level: 3, minMarks: 7, maxMarks: 10, descriptor: "Sustained, balanced analysis" },
          ],
        },
        modelAnswer: "Original model answer written for tests.",
      },
    }),
  MATCHING: () =>
    base("MATCHING", {
      stem: "Match each organelle to its function.",
      marks: 3,
      payload: {
        left: [
          { id: "l1", content: "Mitochondrion" },
          { id: "l2", content: "Ribosome" },
          { id: "l3", content: "Nucleus" },
        ],
        right: [
          { id: "r1", content: "Respiration" },
          { id: "r2", content: "Protein synthesis" },
          { id: "r3", content: "Holds genetic material" },
          { id: "r4", content: "Photosynthesis" },
        ],
        shuffle: true,
      },
      answerSpec: {
        pairs: [
          { leftId: "l1", rightId: "r1" },
          { leftId: "l2", rightId: "r2" },
          { leftId: "l3", rightId: "r3" },
        ],
        marksPerPair: 1,
      },
    }),
  FILL_IN_THE_BLANK: () =>
    base("FILL_IN_THE_BLANK", {
      stem: "Complete the sentences.",
      marks: 2,
      payload: {
        template: "The capital of Zimbabwe is {{blank:b1}}. Pure water boils at {{blank:b2}} °C at sea level.",
        blanks: [
          { id: "b1", input: "text" },
          { id: "b2", input: "number" },
        ],
      },
      answerSpec: {
        blanks: [
          { id: "b1", accepted: ["Harare"] },
          { id: "b2", accepted: ["100"], tolerance: 0 },
        ],
      },
    }),
  DIAGRAM_LABELLING: () =>
    base("DIAGRAM_LABELLING", {
      stem: "Label the parts of the cell.",
      marks: 3,
      payload: {
        mediaAssetId: randomUUID(),
        labels: [
          { id: "L1", text: "Nucleus" },
          { id: "L2", text: "Cell membrane" },
          { id: "L3", text: "Cytoplasm" },
        ],
        hotspots: [
          { id: "h1", x: 42.5, y: 30 },
          { id: "h2", x: 10, y: 50 },
          { id: "h3", x: 70, y: 60 },
        ],
      },
      answerSpec: {
        hotspots: [
          { hotspotId: "h1", labelId: "L1" },
          { hotspotId: "h2", labelId: "L2" },
          { hotspotId: "h3", labelId: "L3" },
        ],
      },
    }),
  EXTENDED_RESPONSE: () =>
    base("EXTENDED_RESPONSE", {
      stem: "Explain how the water cycle moves water between the land and the atmosphere.",
      marks: 6,
      markingMode: "MANUAL",
      answerSpec: {
        markScheme: {
          points: [
            { id: "P1", description: "Evaporation from water bodies", marks: 2 },
            { id: "P2", description: "Condensation forming clouds", marks: 2 },
            { id: "P3", description: "Precipitation and run-off", marks: 2 },
          ],
        },
      },
    }),
};

export interface SampleOptions {
  /** Default true: throw when the definition is invalid (set false to build deliberately broken fixtures). */
  validate?: boolean;
}

/** A valid question definition of `type`, with overrides applied (shallow). */
export function sampleQuestion(type: QuestionType, overrides: Partial<SampleQuestion> = {}, options: SampleOptions = {}): SampleQuestion {
  const sample: SampleQuestion = { ...SAMPLES[type](), ...overrides };
  if (options.validate !== false) {
    const validation = validateQuestionDefinition(sample);
    if (!validation.valid) {
      const errors = validation.issues.filter((i) => i.severity === "error").map((i) => `${i.path.join(".")}: ${i.message}`);
      throw new Error(`Invalid ${type} sample: ${errors.join("; ")}`);
    }
  }
  return sample;
}

// ---------------------------------------------------------------------------------------------------------------
// Database fixtures
// ---------------------------------------------------------------------------------------------------------------

export interface QuestionContext {
  subjectId: string;
  syllabusId: string;
  /** Root TOPIC nodes of the syllabus, in sortOrder. */
  topicIds: string[];
}

/** Loaded lazily so importing this module never touches the database (unit tests use `sampleQuestion`). */
async function dbModules() {
  const [{ db }, { setContentPublishContext }, { recordRevisionSnapshot }] = await Promise.all([
    import("@/server/db"),
    import("@/server/lib/db-context"),
    import("@/server/questions/revisions"),
  ]);
  return { db, setContentPublishContext, recordRevisionSnapshot };
}

/** Creates a minimal curriculum: exam board, level, qualification, category, subject, DRAFT syllabus and topics. */
export async function createQuestionContext(options: { topics?: number } = {}): Promise<QuestionContext> {
  const { db } = await dbModules();
  const board = await db.examBoard.create({
    data: { slug: uniqueSlug("board"), code: uniqueId("b"), name: "Test board", shortName: "TB" },
    select: { id: true },
  });
  const level = await db.qualificationLevel.create({ data: { slug: uniqueSlug("level"), name: "Test level" }, select: { id: true } });
  const qualification = await db.qualification.create({
    data: { examBoardId: board.id, levelId: level.id, slug: uniqueSlug("qualification"), name: "Test qualification", shortName: "TQ" },
    select: { id: true },
  });
  const category = await db.subjectCategory.create({ data: { slug: uniqueSlug("category"), name: "Test category" }, select: { id: true } });
  const subject = await db.subject.create({
    data: { qualificationId: qualification.id, categoryId: category.id, slug: uniqueSlug("subject"), name: "Test subject" },
    select: { id: true },
  });
  const syllabus = await db.syllabus.create({
    data: { subjectId: subject.id, title: "Test syllabus", versionLabel: "v1", effectiveFrom: new Date("2026-01-01T00:00:00Z") },
    select: { id: true },
  });
  const topicIds: string[] = [];
  for (let i = 0; i < (options.topics ?? 2); i += 1) {
    const id = randomUUID();
    await db.topic.create({
      data: { id, syllabusId: syllabus.id, kind: "TOPIC", depth: 0, path: id, name: `Topic ${i + 1}`, slug: uniqueSlug(`topic-${i + 1}`), sortOrder: i },
    });
    topicIds.push(id);
  }
  return { subjectId: subject.id, syllabusId: syllabus.id, topicIds };
}

export interface CreateQuestionOverrides extends Partial<SampleQuestion> {
  /** Reuse a curriculum (recommended when a test creates several questions). */
  context?: QuestionContext;
  /** Topic to tag (default: the context's first topic). */
  topicId?: string;
  /** Default true. */
  isPrimary?: boolean;
  /** Default PUBLISHED (with approval, publication time and ContentRevision snapshot). */
  status?: "PUBLISHED" | "DRAFT";
  accessTier?: ContentAccessTier;
  isExamStyle?: boolean;
  isDailyEligible?: boolean;
  schoolId?: string | null;
  ownerUserId?: string | null;
  /** Skip definition validation (deliberately broken fixtures). */
  validate?: boolean;
}

export interface CreatedQuestion {
  id: string;
  revision: number;
  context: QuestionContext;
  topicId: string;
  definition: SampleQuestion;
  /** Part ids in part order (nested parts flattened depth-first). */
  partIds: string[];
}

interface Row {
  subjectId: string;
  status: "PUBLISHED" | "DRAFT";
  schoolId: string | null;
  ownerUserId: string | null;
  now: Date;
}

async function insertQuestion(tx: Tx, q: SampleQuestion, row: Row, parent: { id: string; partLabel: string; partOrder: number } | null, extra: Record<string, unknown>): Promise<string> {
  const published = row.status === "PUBLISHED";
  const created = await tx.question.create({
    data: {
      subjectId: row.subjectId,
      type: q.type,
      markingMode: q.markingMode,
      stem: q.stem,
      ...(q.payload !== null && q.payload !== undefined ? { payload: q.payload as object } : {}),
      ...(q.answerSpec !== null && q.answerSpec !== undefined ? { answerSpec: q.answerSpec as object } : {}),
      explanation: q.explanation,
      hints: q.hints,
      difficulty: q.difficulty,
      marks: q.marks,
      status: row.status,
      copyrightStatus: "OWNED",
      approvedAt: published ? row.now : null,
      publishedAt: published ? row.now : null,
      schoolId: row.schoolId,
      ownerUserId: row.ownerUserId,
      ...(parent ? { parentId: parent.id, partLabel: parent.partLabel, partOrder: parent.partOrder } : extra),
    },
    select: { id: true },
  });
  return created.id;
}

async function insertChildren(tx: Tx, questionId: string, q: SampleQuestion, row: Row, partIds: string[]): Promise<void> {
  if (q.options.length > 0) {
    await tx.questionOption.createMany({
      data: q.options.map((o) => ({ questionId, key: o.key, content: o.content, isCorrect: o.isCorrect, rationale: o.rationale ?? null, sortOrder: o.sortOrder })),
    });
  }
  for (const [index, part] of q.parts.entries()) {
    const partId = await insertQuestion(tx, part, row, { id: questionId, partLabel: part.partLabel, partOrder: index }, {});
    partIds.push(partId);
    await insertChildren(tx, partId, part, row, partIds);
  }
}

/**
 * Inserts a valid question of `type` (see module header). Returns its id, revision, tagging and part ids.
 */
export async function createQuestion(type: QuestionType, overrides: CreateQuestionOverrides = {}): Promise<CreatedQuestion> {
  const { context: givenContext, topicId: givenTopic, isPrimary, status, accessTier, isExamStyle, isDailyEligible, schoolId, ownerUserId, validate, ...definitionOverrides } =
    overrides;
  const definition = sampleQuestion(type, definitionOverrides, { validate: validate !== false });
  const context = givenContext ?? (await createQuestionContext());
  const topicId = givenTopic ?? context.topicIds[0];
  if (!topicId) throw new Error("createQuestion: the context has no topics");
  const { db, setContentPublishContext, recordRevisionSnapshot } = await dbModules();
  const row: Row = {
    subjectId: context.subjectId,
    status: status ?? "PUBLISHED",
    schoolId: schoolId ?? null,
    ownerUserId: ownerUserId ?? null,
    now: new Date(),
  };

  return db.$transaction(async (tx) => {
    const id = await insertQuestion(tx, definition, row, null, {
      accessTier: accessTier ?? (schoolId || ownerUserId ? "PREMIUM" : "FREE"),
      isExamStyle: isExamStyle ?? false,
      isDailyEligible: isDailyEligible ?? false,
    });
    if (row.status === "PUBLISHED") await setContentPublishContext(tx, id);
    const partIds: string[] = [];
    await insertChildren(tx, id, definition, row, partIds);
    await tx.questionTopic.create({
      data: { questionId: id, topicId, syllabusId: context.syllabusId, subjectId: context.subjectId, isPrimary: isPrimary ?? true },
    });
    if (row.status === "PUBLISHED") await recordRevisionSnapshot(tx, id, null, "Test fixture");
    return { id, revision: 1, context, topicId, definition, partIds };
  });
}
