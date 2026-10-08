import "server-only";
import type { MediaPurpose, SyllabusStatus, TopicKind } from "@/generated/prisma/client";
import { buildTopicTree, flattenTopicTree } from "@/server/curriculum/core";
import { mediaSrc } from "@/server/content/service";
import { db, type DbClient } from "@/server/db";
import { assertCanDraft, parseInput, uuidSchema, type CmsActor } from "./context";
import { z } from "zod";

/**
 * Option lists for the content editors' selects and pickers: the curriculum chain (board → qualification → subject →
 * syllabus version → topic tree → learning objectives), content sources (§27), lessons for "Study this topic" and
 * media assets. Read-only, platform-wide (`content.draft`), every list bounded.
 */

export interface Option {
  value: string;
  label: string;
}

export interface CurriculumOptions {
  boards: Option[];
  qualifications: (Option & { boardId: string })[];
  subjects: (Option & { qualificationId: string; boardId: string })[];
}

const subjectOptionSelect = {
  id: true,
  name: true,
  qualificationId: true,
  qualification: { select: { shortName: true, examBoardId: true, examBoard: { select: { shortName: true } } } },
} as const;

/**
 * Boards, qualifications and subjects (every catalogue status: editors author ahead of launch). The subject list is
 * bounded, so a page that resolves a subject chosen in its URL passes it as `selectedSubjectIds`: those subjects are
 * always in the result, even on a catalogue larger than the bound (otherwise a valid choice would look unknown).
 */
export async function getCurriculumOptions(
  actor: CmsActor,
  options: { selectedSubjectIds?: readonly (string | null | undefined)[]; client?: DbClient } = {},
): Promise<CurriculumOptions> {
  assertCanDraft(actor);
  const client = options.client ?? db;
  const [boards, qualifications, listed] = await Promise.all([
    client.examBoard.findMany({ select: { id: true, shortName: true }, orderBy: [{ sortOrder: "asc" }, { shortName: "asc" }], take: 200 }),
    client.qualification.findMany({
      select: { id: true, shortName: true, examBoardId: true, examBoard: { select: { shortName: true } } },
      orderBy: [{ sortOrder: "asc" }, { shortName: "asc" }],
      take: 500,
    }),
    client.subject.findMany({ select: subjectOptionSelect, orderBy: [{ sortOrder: "asc" }, { name: "asc" }], take: 2_000 }),
  ]);
  const listedIds = new Set(listed.map((s) => s.id));
  const missing = [...new Set(options.selectedSubjectIds ?? [])].filter(
    (id): id is string => typeof id === "string" && uuidSchema.safeParse(id).success && !listedIds.has(id),
  );
  const subjects = missing.length === 0 ? listed : [...listed, ...(await client.subject.findMany({ where: { id: { in: missing } }, select: subjectOptionSelect, orderBy: { name: "asc" } }))];
  return {
    boards: boards.map((b) => ({ value: b.id, label: b.shortName })),
    qualifications: qualifications.map((q) => ({ value: q.id, label: `${q.examBoard.shortName} ${q.shortName}`, boardId: q.examBoardId })),
    subjects: subjects.map((s) => ({
      value: s.id,
      label: `${s.name} (${s.qualification.examBoard.shortName} ${s.qualification.shortName})`,
      qualificationId: s.qualificationId,
      boardId: s.qualification.examBoardId,
    })),
  };
}

export interface SyllabusOption extends Option {
  subjectId: string;
  status: SyllabusStatus;
}

/** Syllabus versions of the given subjects (newest first). */
export async function getSyllabusOptions(subjectIds: readonly string[], client: DbClient = db): Promise<SyllabusOption[]> {
  if (subjectIds.length === 0) return [];
  const rows = await client.syllabus.findMany({
    where: { subjectId: { in: [...new Set(subjectIds)] } },
    select: { id: true, subjectId: true, title: true, versionLabel: true, status: true },
    orderBy: [{ effectiveFrom: "desc" }, { id: "desc" }],
    take: 200,
  });
  return rows.map((r) => ({ value: r.id, label: `${r.title} · ${r.versionLabel}${r.status === "DRAFT" ? " (draft)" : ""}`, subjectId: r.subjectId, status: r.status }));
}

/** Every syllabus version with its subject, for pickers that are not tied to one subject (study-pack scopes). */
export async function getSyllabusCatalogueOptions(client: DbClient = db): Promise<SyllabusOption[]> {
  const rows = await client.syllabus.findMany({
    select: {
      id: true,
      subjectId: true,
      versionLabel: true,
      status: true,
      subject: { select: { name: true, qualification: { select: { shortName: true, examBoard: { select: { shortName: true } } } } } },
    },
    orderBy: [{ subjectId: "asc" }, { effectiveFrom: "desc" }],
    take: 1_000,
  });
  return rows.map((r) => ({
    value: r.id,
    label: `${r.subject.name} (${r.subject.qualification.examBoard.shortName} ${r.subject.qualification.shortName}) · ${r.versionLabel}${r.status === "DRAFT" ? " (draft)" : ""}`,
    subjectId: r.subjectId,
    status: r.status,
  }));
}

export interface TopicOption extends Option {
  syllabusId: string;
  depth: number;
  kind: TopicKind;
  /** Materialised path (subtree filters). */
  path: string;
}

/** Topic trees of the given syllabus versions, depth-first in curriculum order, labels indented by depth. */
export async function getTopicOptions(syllabusIds: readonly string[], client: DbClient = db): Promise<TopicOption[]> {
  if (syllabusIds.length === 0) return [];
  const rows = await client.topic.findMany({
    where: { syllabusId: { in: [...new Set(syllabusIds)] } },
    select: { id: true, syllabusId: true, parentId: true, kind: true, depth: true, path: true, sortOrder: true, code: true, name: true },
    take: 5_000,
  });
  const out: TopicOption[] = [];
  for (const syllabusId of new Set(syllabusIds)) {
    const tree = buildTopicTree(rows.filter((r) => r.syllabusId === syllabusId));
    for (const node of flattenTopicTree(tree)) {
      const label = `${"— ".repeat(node.depth)}${node.code ? `${node.code} ` : ""}${node.name}`;
      out.push({ value: node.id, label, syllabusId, depth: node.depth, kind: node.kind, path: node.path });
    }
  }
  return out;
}

export interface ObjectiveOption extends Option {
  topicId: string;
  syllabusId: string;
}

/** Learning objectives of the given syllabus versions. */
export async function getObjectiveOptions(syllabusIds: readonly string[], client: DbClient = db): Promise<ObjectiveOption[]> {
  if (syllabusIds.length === 0) return [];
  const rows = await client.learningObjective.findMany({
    where: { topic: { syllabusId: { in: [...new Set(syllabusIds)] } } },
    select: { id: true, code: true, statement: true, topicId: true, topic: { select: { syllabusId: true } } },
    orderBy: [{ topicId: "asc" }, { sortOrder: "asc" }],
    take: 3_000,
  });
  return rows.map((r) => ({
    value: r.id,
    label: `${r.code ? `${r.code} ` : ""}${r.statement.length > 120 ? `${r.statement.slice(0, 119)}…` : r.statement}`,
    topicId: r.topicId,
    syllabusId: r.topic.syllabusId,
  }));
}

export interface SourceOption extends Option {
  type: string;
  permitsPdfExport: boolean;
}

/** Active content sources (§27). */
export async function getSourceOptions(client: DbClient = db): Promise<SourceOption[]> {
  const rows = await client.contentSource.findMany({
    where: { isActive: true },
    select: { id: true, name: true, type: true, licenceCode: true, permitsPdfExport: true },
    orderBy: { name: "asc" },
    take: 500,
  });
  return rows.map((r) => ({ value: r.id, label: `${r.name}${r.licenceCode ? ` (${r.licenceCode})` : ""}`, type: r.type, permitsPdfExport: r.permitsPdfExport }));
}

/** Platform lessons of a subject (live rows) for "Study this topic" (§10). */
export async function getLessonOptions(subjectId: string, client: DbClient = db): Promise<Option[]> {
  const rows = await client.lesson.findMany({
    where: { subjectId, draftOfId: null, status: { not: "ARCHIVED" } },
    select: { id: true, title: true, status: true },
    orderBy: { title: "asc" },
    take: 500,
  });
  return rows.map((r) => ({ value: r.id, label: r.status === "PUBLISHED" ? r.title : `${r.title} (${r.status.toLowerCase().replace("_", " ")})` }));
}

export interface MediaOption extends Option {
  src: string;
  width: number | null;
  height: number | null;
  altText: string | null;
}

/** Recent READY media of the given purposes (diagrams, content images, covers), newest first. */
export async function getMediaOptions(purposes: readonly MediaPurpose[], client: DbClient = db, take = 60): Promise<MediaOption[]> {
  const rows = await client.mediaAsset.findMany({
    where: { purpose: { in: [...purposes] }, status: "READY", deletedAt: null, visibility: { in: ["PUBLIC", "AUTHENTICATED"] } },
    select: { id: true, storageKey: true, originalFilename: true, altText: true, width: true, height: true },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take,
  });
  return rows.map((r) => ({
    value: r.id,
    label: r.altText?.trim() || r.originalFilename || r.id,
    src: mediaSrc(r.storageKey),
    width: r.width,
    height: r.height,
    altText: r.altText,
  }));
}

/** Resolves specific media ids (an asset chosen earlier may be older than the recent list). */
export async function getMediaByIds(ids: readonly string[], client: DbClient = db): Promise<MediaOption[]> {
  const valid = ids.filter((id) => uuidSchema.safeParse(id).success);
  if (valid.length === 0) return [];
  const rows = await client.mediaAsset.findMany({
    where: { id: { in: [...new Set(valid)] }, deletedAt: null },
    select: { id: true, storageKey: true, originalFilename: true, altText: true, width: true, height: true },
  });
  return rows.map((r) => ({
    value: r.id,
    label: r.altText?.trim() || r.originalFilename || r.id,
    src: mediaSrc(r.storageKey),
    width: r.width,
    height: r.height,
    altText: r.altText,
  }));
}

export interface SubjectContentOptions {
  syllabi: SyllabusOption[];
  topics: TopicOption[];
  objectives: ObjectiveOption[];
  lessons: Option[];
}

/**
 * Everything an editor needs once the home subject is known: its syllabus versions, their topic trees and objectives,
 * and its lessons. Extra syllabus ids (a question tagged in another subject's version) are included too.
 */
export async function getSubjectContentOptions(actor: CmsActor, raw: unknown, client: DbClient = db): Promise<SubjectContentOptions> {
  assertCanDraft(actor);
  const input = parseInput(z.object({ subjectId: uuidSchema, extraSyllabusIds: z.array(uuidSchema).max(50).default([]) }), raw);
  const own = await getSyllabusOptions([input.subjectId], client);
  const knownIds = new Set(own.map((s) => s.value));
  const extraIds = input.extraSyllabusIds.filter((id) => !knownIds.has(id));
  const extra = extraIds.length > 0 ? (await client.syllabus.findMany({ where: { id: { in: extraIds } }, select: { subjectId: true } })).map((s) => s.subjectId) : [];
  const syllabi = extra.length > 0 ? [...own, ...(await getSyllabusOptions(extra, client)).filter((s) => extraIds.includes(s.value))] : own;
  const syllabusIds = syllabi.map((s) => s.value);
  const [topics, objectives, lessons] = await Promise.all([
    getTopicOptions(syllabusIds, client),
    getObjectiveOptions(syllabusIds, client),
    getLessonOptions(input.subjectId, client),
  ]);
  return { syllabi, topics, objectives, lessons };
}
