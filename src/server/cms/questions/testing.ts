/**
 * Helpers for the question / assessment / study-pack CMS integration tests (not used by application code). Every
 * helper creates its own uniquely named rows: tests run in parallel against one shared, never-truncated database.
 */
import type { AuditLog, Role } from "@/generated/prisma/client";
import { db } from "@/server/db";
import type { Tx } from "@/server/lib/db-context";
import { createCurriculumChain, createStudent, createTeacher, createUser, type CurriculumChain } from "../../../../tests/factories/index";
import type { CmsActor, CmsContext } from "./context";
import type { QuestionEditorInput } from "./schemas";

export function actorFor(userId: string, roles: readonly Role[]): CmsActor {
  return { kind: "user", userId, roles };
}

export async function staffActor(role: "CONTENT_EDITOR" | "ADMIN" | "SUPER_ADMIN"): Promise<CmsActor> {
  const { user } = await createUser({ roles: [role] });
  return actorFor(user.id, [role]);
}

export async function studentActor(): Promise<CmsActor> {
  const { user } = await createStudent({ student: { isMinor: false } });
  return actorFor(user.id, ["STUDENT"]);
}

/** A teacher holds `content.draft` with the restricted scope (class tests only): never enough for the CMS. */
export async function teacherActor(): Promise<CmsActor> {
  const { user } = await createTeacher();
  return actorFor(user.id, ["TEACHER"]);
}

/** Runs `fn` with `app.four_eyes = 'on'` (the production default the test database does not set). */
export function withFourEyes<T>(fn: (context: CmsContext) => Promise<T>): Promise<T> {
  return db.$transaction(async (tx: Tx) => {
    await tx.$queryRaw`SELECT set_config('app.four_eyes', 'on', true)`;
    return fn({ client: tx });
  });
}

export function auditRows(entityId: string): Promise<AuditLog[]> {
  return db.auditLog.findMany({ where: { entityId }, orderBy: { createdAt: "asc" } });
}

/** `action` / `metadata.operation` pairs of an entity's audit trail. */
export async function auditTrail(entityId: string): Promise<string[]> {
  return (await auditRows(entityId)).map((row) => `${row.action}:${String((row.metadata as { operation?: unknown } | null)?.operation ?? "")}`);
}

export function chain(): Promise<CurriculumChain> {
  return createCurriculumChain({ topicCount: 2, subtopicsPerTopic: 1, lessonsPerTopic: 0, objectivesPerSubtopic: 1 });
}

/** A complete, valid MCQ editor document tagged to the chain's first topic. */
export function mcqDocument(c: CurriculumChain, overrides: Partial<QuestionEditorInput> = {}): QuestionEditorInput {
  const topic = c.topics[0];
  if (!topic) throw new Error("chain has no topics");
  return {
    subjectId: c.subject.id,
    type: "MULTIPLE_CHOICE",
    markingMode: "AUTO",
    stem: "Which value of $x$ satisfies $2x = 6$?",
    payload: { selectMode: "single", shuffleOptions: true },
    answerSpec: { scoring: "all_or_nothing" },
    marks: 1,
    options: [
      { key: "A", content: "$x = 3$", isCorrect: true, rationale: "$2 \\times 3 = 6$." },
      { key: "B", content: "$x = 4$", isCorrect: false, rationale: "$2 \\times 4 = 8$." },
      { key: "C", content: "$x = 12$", isCorrect: false, rationale: "Multiplied instead of dividing." },
    ],
    explanation: "Divide both sides by 2.",
    hints: ["What undoes multiplying by 2?"],
    difficulty: 2,
    accessTier: "FREE",
    topics: [{ topicId: topic.id, isPrimary: true }],
    copyrightStatus: "OWNED",
    sourceId: c.source.id,
    author: "Editorial team",
    ...overrides,
  };
}

/** A STRUCTURED editor document with an (a) short answer and a (b) numerical part. */
export function structuredDocument(c: CurriculumChain, overrides: Partial<QuestionEditorInput> = {}): QuestionEditorInput {
  return mcqDocument(c, {
    type: "STRUCTURED",
    stem: "A rectangle has length $(x+3)$ cm and width $x$ cm.",
    payload: null,
    answerSpec: null,
    options: [],
    marks: 3,
    parts: [
      {
        partLabel: "(a)",
        type: "SHORT_ANSWER",
        markingMode: "AUTO",
        stem: "Write an expression for its area.",
        payload: null,
        answerSpec: { accepted: [{ value: "x^2+3x" }, { value: "x(x+3)" }], normalise: ["remove_whitespace"] },
        marks: 1,
      },
      { partLabel: "(b)", type: "NUMERICAL", markingMode: "AUTO", stem: "The area is 40 cm². Find $x$.", payload: null, answerSpec: { value: 5 }, marks: 2 },
    ],
    ...overrides,
  });
}
