import "server-only";
import { z } from "zod";
import { buildTopicTree, flattenTopicTree } from "@/server/curriculum/core";
import { toExcerpt } from "@/server/content/render";
import { db } from "@/server/db";
import type { CmsActor } from "@/server/cms/users/access";
import { assertCanDraft, parseInput, PERSON_SELECT, staffName } from "./context";

/**
 * Curriculum pickers for the content editors (lessons, flashcards): subjects, syllabus versions, topic trees with
 * their learning objectives, content sources, staff authors and published practice questions. Read-only, bounded
 * lists (the catalogue is admin-curated and small); every function requires `content.draft`.
 */

export interface Option {
  value: string;
  label: string;
}

export interface SubjectOption extends Option {
  languageCode: string;
}

/** Every subject, labelled with its qualification and board ("Mathematics · O-Level · ZIMSEC"). */
export async function subjectOptions(actor: CmsActor): Promise<SubjectOption[]> {
  assertCanDraft(actor);
  const rows = await db.subject.findMany({
    orderBy: [{ name: "asc" }, { id: "asc" }],
    take: 2_000,
    select: {
      id: true,
      name: true,
      languageCode: true,
      catalogueStatus: true,
      qualification: { select: { shortName: true, name: true, examBoard: { select: { shortName: true, name: true } } } },
    },
  });
  return rows.map((row) => ({
    value: row.id,
    languageCode: row.languageCode,
    label: `${row.name} · ${row.qualification.shortName ?? row.qualification.name} · ${row.qualification.examBoard.shortName ?? row.qualification.examBoard.name}${row.catalogueStatus === "HIDDEN" ? " (hidden)" : ""}`,
  }));
}

/** Syllabus versions (every status), optionally of one subject, newest first per subject. */
export async function syllabusOptions(actor: CmsActor, subjectId?: string | null): Promise<Option[]> {
  assertCanDraft(actor);
  const rows = await db.syllabus.findMany({
    where: subjectId ? { subjectId } : {},
    orderBy: [{ subject: { name: "asc" } }, { effectiveFrom: "desc" }, { id: "asc" }],
    take: 1_000,
    select: {
      id: true,
      versionLabel: true,
      status: true,
      subject: { select: { name: true, qualification: { select: { shortName: true, name: true, examBoard: { select: { shortName: true, name: true } } } } } },
    },
  });
  return rows.map((row) => ({
    value: row.id,
    label: `${row.subject.name} · ${row.subject.qualification.shortName ?? row.subject.qualification.name} · ${row.subject.qualification.examBoard.shortName ?? row.subject.qualification.examBoard.name} · ${row.versionLabel}${row.status === "DRAFT" ? " (draft)" : row.status === "ARCHIVED" ? " (archived)" : ""}`,
  }));
}

export interface TopicOption {
  id: string;
  label: string;
  depth: number;
  kind: string;
  path: string;
}

export interface ObjectiveOption {
  id: string;
  topicId: string;
  topicPath: string;
  label: string;
}

export interface SyllabusTopics {
  syllabusId: string;
  topics: TopicOption[];
  objectives: ObjectiveOption[];
}

/** The ordered topic tree (flattened, with depth for indentation) and learning objectives of one syllabus version. */
export async function topicOptionsForSyllabus(actor: CmsActor, syllabusId: unknown): Promise<SyllabusTopics> {
  assertCanDraft(actor);
  const id = parseInput(z.uuid("Choose a syllabus version."), syllabusId);
  const rows = await db.topic.findMany({
    where: { syllabusId: id },
    take: 5_000,
    select: { id: true, parentId: true, kind: true, depth: true, path: true, sortOrder: true, code: true, name: true },
  });
  const flat = flattenTopicTree(buildTopicTree(rows));
  const objectives = await db.learningObjective.findMany({
    where: { topic: { syllabusId: id } },
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
    take: 5_000,
    select: { id: true, code: true, statement: true, topicId: true, topic: { select: { path: true } } },
  });
  return {
    syllabusId: id,
    topics: flat.map((t) => ({ id: t.id, label: `${t.code ? `${t.code} ` : ""}${t.name}`, depth: t.depth, kind: t.kind, path: t.path })),
    objectives: objectives.map((o) => ({ id: o.id, topicId: o.topicId, topicPath: o.topic.path, label: `${o.code ? `${o.code} ` : ""}${o.statement}` })),
  };
}

export interface TaggedTopic {
  id: string;
  label: string;
  syllabusId: string;
  syllabusLabel: string;
  path: string;
}

/** Labels of specific topics (the current tags of an item), with their syllabus version. */
export async function describeTopics(topicIds: readonly string[]): Promise<TaggedTopic[]> {
  if (topicIds.length === 0) return [];
  const rows = await db.topic.findMany({
    where: { id: { in: [...topicIds] } },
    select: {
      id: true,
      code: true,
      name: true,
      path: true,
      syllabusId: true,
      syllabus: { select: { versionLabel: true, subject: { select: { name: true } } } },
    },
  });
  const byId = new Map(rows.map((row) => [row.id, row]));
  return topicIds.flatMap((id) => {
    const row = byId.get(id);
    return row
      ? [{ id, label: `${row.code ? `${row.code} ` : ""}${row.name}`, syllabusId: row.syllabusId, syllabusLabel: `${row.syllabus.subject.name} · ${row.syllabus.versionLabel}`, path: row.path }]
      : [];
  });
}

/** Learning objectives under the given topics (the tagged topics or anywhere below them), for the objective picker. */
export async function objectivesUnderTopics(topicPaths: readonly string[]): Promise<ObjectiveOption[]> {
  if (topicPaths.length === 0) return [];
  const rows = await db.learningObjective.findMany({
    where: { OR: topicPaths.flatMap((path) => [{ topic: { path } }, { topic: { path: { startsWith: `${path}/` } } }]) },
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
    take: 1_000,
    select: { id: true, code: true, statement: true, topicId: true, topic: { select: { path: true } } },
  });
  return rows.map((o) => ({ id: o.id, topicId: o.topicId, topicPath: o.topic.path, label: `${o.code ? `${o.code} ` : ""}${o.statement}` }));
}

/** Active content sources for the licensing fields (§27), plus `include` (an item's current, possibly inactive source). */
export async function contentSourceOptions(actor: CmsActor, include: readonly (string | null | undefined)[] = []): Promise<Option[]> {
  assertCanDraft(actor);
  const ids = include.filter((id): id is string => typeof id === "string" && id !== "");
  const rows = await db.contentSource.findMany({
    where: ids.length > 0 ? { OR: [{ isActive: true }, { id: { in: ids } }] } : { isActive: true },
    orderBy: [{ name: "asc" }, { id: "asc" }],
    take: 500,
    select: { id: true, name: true, type: true, licenceCode: true },
  });
  return rows.map((row) => ({ value: row.id, label: `${row.name} (${row.type.toLowerCase().replace(/_/g, " ")}${row.licenceCode ? `, ${row.licenceCode}` : ""})` }));
}

/** Staff who can author content (for the "author" list filter). */
export async function staffAuthorOptions(actor: CmsActor): Promise<Option[]> {
  assertCanDraft(actor);
  const rows = await db.user.findMany({
    where: { roles: { hasSome: ["CONTENT_EDITOR", "ADMIN", "SUPER_ADMIN"] }, status: { not: "DELETED" } },
    orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    take: 300,
    select: { id: true, ...PERSON_SELECT },
  });
  return rows.map((row) => ({ value: row.id, label: staffName(row) ?? "Unnamed user" }));
}

export interface PracticeQuestionOption {
  id: string;
  excerpt: string;
  type: string;
  difficulty: number;
  marks: number;
  subject: string;
  status: string;
}

function questionExcerpt(stem: string): string {
  try {
    return toExcerpt(stem, 140) || "(no text)";
  } catch {
    return stem.slice(0, 140);
  }
}

const practiceSearchSchema = z.object({
  q: z.string().trim().max(200).optional(),
  subjectId: z.preprocess((v) => (v === "" ? undefined : v), z.uuid().optional()),
});

/**
 * PUBLISHED whole platform questions that can be attached to a lesson (LessonQuestion tenant guard: platform only),
 * searched by question text; the lesson's subject first when given.
 */
export async function searchPracticeQuestions(actor: CmsActor, raw: unknown): Promise<PracticeQuestionOption[]> {
  assertCanDraft(actor);
  const input = parseInput(practiceSearchSchema, raw);
  const rows = await db.question.findMany({
    where: {
      status: "PUBLISHED",
      parentId: null,
      draftOfId: null,
      schoolId: null,
      ownerUserId: null,
      ...(input.subjectId ? { subjectId: input.subjectId } : {}),
      ...(input.q ? { stem: { contains: input.q, mode: "insensitive" } } : {}),
    },
    orderBy: [{ updatedAt: "desc" }, { id: "desc" }],
    take: 20,
    select: { id: true, stem: true, type: true, difficulty: true, marks: true, status: true, subject: { select: { name: true } } },
  });
  return rows.map((row) => ({
    id: row.id,
    excerpt: questionExcerpt(row.stem),
    type: row.type,
    difficulty: row.difficulty,
    marks: row.marks,
    subject: row.subject.name,
    status: row.status,
  }));
}

/** Descriptions of specific questions (a lesson's attached practice questions), in the given order. */
export async function describeQuestions(questionIds: readonly string[]): Promise<PracticeQuestionOption[]> {
  if (questionIds.length === 0) return [];
  const rows = await db.question.findMany({
    where: { id: { in: [...questionIds] } },
    select: { id: true, stem: true, type: true, difficulty: true, marks: true, status: true, subject: { select: { name: true } } },
  });
  const byId = new Map(rows.map((row) => [row.id, row]));
  return questionIds.flatMap((id) => {
    const row = byId.get(id);
    return row
      ? [{ id, excerpt: questionExcerpt(row.stem), type: row.type, difficulty: row.difficulty, marks: row.marks, subject: row.subject.name, status: row.status }]
      : [];
  });
}
