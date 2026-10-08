/**
 * Helpers for the editorial CMS integration tests (not used by application code). Every helper creates its own
 * uniquely named rows: tests run in parallel against one shared, never-truncated database.
 */
import type { AuditLog, Role } from "@/generated/prisma/client";
import { db } from "@/server/db";
import type { Tx } from "@/server/lib/db-context";
import type { CmsActor } from "@/server/cms/users/access";
import { createCurriculumChain, createParent, createStudent, createTeacher, createUser, type CurriculumChain } from "../../../../tests/factories/index";
import { createLesson, saveLesson } from "../lessons/service";
import type { ContentServiceContext } from "./context";

export type StaffRole = Extract<Role, "CONTENT_EDITOR" | "ADMIN" | "SUPER_ADMIN">;

export function actorFor(userId: string, roles: readonly Role[]): CmsActor {
  return { kind: "user", userId, roles };
}

/** A staff user with `role` and their actor. */
export async function staffActor(role: StaffRole = "CONTENT_EDITOR"): Promise<CmsActor> {
  const { user } = await createUser({ roles: [role] });
  return actorFor(user.id, [role]);
}

export async function studentActor(): Promise<CmsActor> {
  const { user } = await createStudent({ student: { isMinor: false } });
  return actorFor(user.id, ["STUDENT"]);
}

export async function teacherActor(): Promise<CmsActor> {
  const { user } = await createTeacher();
  return actorFor(user.id, ["TEACHER"]);
}

export async function parentActor(): Promise<CmsActor> {
  const { user } = await createParent();
  return actorFor(user.id, ["PARENT"]);
}

/** Runs `fn` in a transaction with `app.four_eyes = 'on'` (the production default the test database does not set). */
export function withFourEyes<T>(fn: (context: ContentServiceContext) => Promise<T>): Promise<T> {
  return db.$transaction(
    async (tx: Tx) => {
      await tx.$queryRaw`SELECT set_config('app.four_eyes', 'on', true)`;
      return fn({ client: tx });
    },
    { timeout: 30_000, maxWait: 10_000 },
  );
}

/** A curriculum chain with a published syllabus, two topics, one subtopic each and one objective per subtopic. */
export function contentChain(): Promise<CurriculumChain> {
  return createCurriculumChain({ topicCount: 2, subtopicsPerTopic: 1, objectivesPerSubtopic: 1, lessonsPerTopic: 0 });
}

/** Audit rows of one entity, oldest first. */
export function auditRowsFor(entityId: string): Promise<AuditLog[]> {
  return db.auditLog.findMany({ where: { entityId }, orderBy: [{ createdAt: "asc" }, { id: "asc" }] });
}

/** `metadata.operation` (or the action key when absent) of the audit rows of one entity. */
export async function auditTrail(entityId: string): Promise<string[]> {
  const rows = await auditRowsFor(entityId);
  return rows.map((row) => String((row.metadata as { operation?: unknown } | null)?.operation ?? row.action));
}

/** Licensing that satisfies every lesson requirement (§27). */
export function clearedProvenance(chain: CurriculumChain) {
  return {
    sourceId: chain.source.id,
    author: "Test author",
    copyrightStatus: "OWNED",
    licenceCode: "PROPRIETARY",
    publicationDate: "2026-10-01",
  };
}

/** Creates a DRAFT lesson by `editor` that passes every review check (title, body, primary topic, licensing). */
export async function readyLesson(
  editor: CmsActor,
  chain: CurriculumChain,
  overrides: Record<string, unknown> = {},
): Promise<{ id: string }> {
  const topic = chain.topics[0];
  if (!topic) throw new Error("readyLesson: the chain has no topics");
  const { id } = await createLesson(editor, { title: `Solving equations ${Math.random().toString(36).slice(2, 8)}`, kind: "LESSON", subjectId: chain.subject.id });
  await saveLesson(editor, {
    id,
    title: "Solving linear equations",
    kind: "LESSON",
    subjectId: chain.subject.id,
    summary: "How to solve one-step and two-step equations.",
    body: "## Method\n\nSolve $2x + 3 = 7$: subtract 3, then divide by 2, so $x = 2$.\n\n:::exam-tip\nShow your working.\n:::",
    estimatedMinutes: 12,
    accessTier: "FREE",
    topicIds: [topic.id],
    primaryTopicId: topic.id,
    ...clearedProvenance(chain),
    ...overrides,
  });
  return { id };
}
