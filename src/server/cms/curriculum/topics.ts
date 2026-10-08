import "server-only";
import { randomUUID } from "node:crypto";
import type { CognitiveSkill, Prisma, SyllabusStatus, TopicKind } from "@/generated/prisma/client";
import type { DbClient } from "@/server/db";
import type { Tx } from "@/server/lib/db-context";
import { AppError } from "@/server/lib/errors";
import { assertCurriculumAdmin, assertCurriculumDraft, assertCurriculumRead, curriculumAccess, type CurriculumActor } from "./access";
import {
  dedupeSlug,
  defaultChildKind,
  isSameOrDescendantPath,
  parseOutline,
  publicCurriculumPath,
  reorderSiblings,
  slugify,
  topicKindChangeProblem,
  topicPlacementProblem,
  walkOutline,
  type OutlineNode,
  type OutlineParseResult,
} from "./core";
import {
  objectiveAddSchema,
  objectiveMoveSchema,
  objectiveUpdateSchema,
  outlineImportSchema,
  topicAddSchema,
  topicEditorialSchema,
  topicIdSchema,
  topicMoveSchema,
  topicReparentSchema,
  topicSearchFilterSchema,
  topicShiftSchema,
  topicUpdateSchema,
} from "./schemas";
import {
  ADMIN_PAGE_SIZE,
  auditCurriculum,
  CURRICULUM_AUDIT,
  cursorArgs,
  diffFields,
  enqueueCurriculumReindex,
  fieldError,
  inTransaction,
  invalidateCurriculumCaches,
  mapDbError,
  parseInput,
  readAll,
  readClient,
  toPage,
  today,
  type Page,
  type ServiceContext,
} from "./shared";

/**
 * Topic tree editor (§3, ARCHITECTURE §4.2): one self-referential tree per syllabus version with a materialised id
 * `path` and `depth`. Every structural change (add, rename code/slug, reorder, indent/outdent/move, delete,
 * objectives, paper links, pasted outlines) is allowed only while the version is a DRAFT — the database refuses it
 * otherwise (`Topic_guard_published`), and these services check first so editors get a clear message.
 *
 * Reordering is button-based (up/down, indent/outdent) so it works on touch and with the keyboard. Moving a node
 * re-writes the paths of its whole subtree in one statement and adjusts kinds that would no longer be valid
 * (e.g. a TOPIC indented under another TOPIC becomes a SUBTOPIC).
 *
 * Published versions are read-only except editorial wording (name, descriptions, SEO fields, visibility, study-time
 * estimate), which admins may correct.
 */

// =====================================================================================================================
// Editor read model
// =====================================================================================================================

export interface TopicObjectiveView {
  id: string;
  code: string | null;
  statement: string;
  cognitiveSkill: CognitiveSkill | null;
  sortOrder: number;
}

export interface TopicEditorNode {
  id: string;
  parentId: string | null;
  kind: TopicKind;
  depth: number;
  path: string;
  sortOrder: number;
  code: string | null;
  name: string;
  slug: string;
  description: string | null;
  publicSummary: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  isPublic: boolean;
  isOptional: boolean;
  optionGroup: string | null;
  examYearFrom: number | null;
  examYearTo: number | null;
  estimatedStudyMinutes: number | null;
  /** Slug of the topic this node was cloned from (previous version), for URL-change hints. */
  originSlug: string | null;
  componentIds: string[];
  objectives: TopicObjectiveView[];
  /** Content tags on this node (this version). */
  tags: { questions: number; lessons: number; flashcards: number };
  children: TopicEditorNode[];
}

export interface TopicEditorData {
  syllabus: {
    id: string;
    title: string;
    versionLabel: string;
    status: SyllabusStatus;
    sourceId: string | null;
    supersedesId: string | null;
    subject: { id: string; name: string };
    publicPath: string;
  };
  /** Structural edits allowed (DRAFT + curriculum draft permission). */
  editable: boolean;
  /** Editorial corrections allowed on a published version (ADMIN). */
  canCorrect: boolean;
  roots: TopicEditorNode[];
  topicCount: number;
  components: { id: string; code: string; name: string }[];
}

const NODE_SELECT = {
  id: true,
  parentId: true,
  kind: true,
  depth: true,
  path: true,
  sortOrder: true,
  code: true,
  name: true,
  slug: true,
  description: true,
  publicSummary: true,
  metaTitle: true,
  metaDescription: true,
  isPublic: true,
  isOptional: true,
  optionGroup: true,
  examYearFrom: true,
  examYearTo: true,
  estimatedStudyMinutes: true,
  originTopic: { select: { slug: true } },
  componentLinks: { select: { componentId: true } },
  objectives: { select: { id: true, code: true, statement: true, cognitiveSkill: true, sortOrder: true }, orderBy: [{ sortOrder: "asc" as const }, { id: "asc" as const }] },
} as const satisfies Prisma.TopicSelect;

/** Sibling order used everywhere (matches the student-facing tree builder): sortOrder, numeric-aware code, name, id. */
function compareSiblings(a: { sortOrder: number; code: string | null; name: string; id: string }, b: { sortOrder: number; code: string | null; name: string; id: string }): number {
  return (
    a.sortOrder - b.sortOrder ||
    (a.code ?? "").localeCompare(b.code ?? "", "en", { numeric: true }) ||
    a.name.localeCompare(b.name, "en") ||
    (a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
  );
}

export async function getTopicEditor(actor: CurriculumActor, syllabusId: string, context: ServiceContext = {}): Promise<TopicEditorData> {
  assertCurriculumRead(actor);
  const client = readClient(context);
  const syllabus = await client.syllabus.findUnique({
    where: { id: syllabusId },
    select: {
      id: true,
      title: true,
      versionLabel: true,
      status: true,
      sourceId: true,
      supersedesId: true,
      subject: { select: { id: true, name: true, slug: true, qualification: { select: { slug: true, examBoard: { select: { slug: true } } } } } },
      components: { select: { id: true, code: true, name: true }, orderBy: [{ sortOrder: "asc" }, { code: "asc" }] },
    },
  });
  if (!syllabus) throw AppError.notFound("Syllabus version not found.");
  const [rows, questionTags, lessonTags, flashcardTags] = await readAll(context, [
    () => client.topic.findMany({ where: { syllabusId }, select: NODE_SELECT, orderBy: [{ depth: "asc" }, { sortOrder: "asc" }] }),
    () => client.questionTopic.groupBy({ by: ["topicId"], where: { syllabusId }, _count: { _all: true } }),
    () => client.lessonTopic.groupBy({ by: ["topicId"], where: { topic: { syllabusId } }, _count: { _all: true } }),
    () => client.flashcardTopic.groupBy({ by: ["topicId"], where: { topic: { syllabusId } }, _count: { _all: true } }),
  ]);
  const count = (list: readonly { topicId: string; _count?: unknown }[]) =>
    new Map(list.map((entry) => [entry.topicId, (entry._count as { _all?: number } | undefined)?._all ?? 0]));
  const q = count(questionTags);
  const l = count(lessonTags);
  const f = count(flashcardTags);

  const nodes = new Map<string, TopicEditorNode>();
  for (const row of rows) {
    const { originTopic, componentLinks, ...rest } = row;
    nodes.set(row.id, {
      ...rest,
      originSlug: originTopic?.slug ?? null,
      componentIds: componentLinks.map((link) => link.componentId),
      tags: { questions: q.get(row.id) ?? 0, lessons: l.get(row.id) ?? 0, flashcards: f.get(row.id) ?? 0 },
      children: [],
    });
  }
  const roots: TopicEditorNode[] = [];
  for (const node of nodes.values()) {
    const parent = node.parentId ? nodes.get(node.parentId) : undefined;
    if (parent) parent.children.push(node);
    else roots.push(node);
  }
  const sortTree = (list: TopicEditorNode[]): void => {
    list.sort(compareSiblings);
    for (const node of list) sortTree(node.children);
  };
  sortTree(roots);

  const access = curriculumAccess(actor);
  const { components, subject, ...version } = syllabus;
  return {
    syllabus: {
      ...version,
      subject: { id: subject.id, name: subject.name },
      publicPath: publicCurriculumPath(subject.qualification.examBoard.slug, subject.qualification.slug, subject.slug),
    },
    editable: syllabus.status === "DRAFT" && access.canDraft,
    canCorrect: syllabus.status !== "DRAFT" && access.canAdmin,
    roots,
    topicCount: rows.length,
    components,
  };
}

// =====================================================================================================================
// Helpers
// =====================================================================================================================

interface LockedTopic {
  id: string;
  syllabusId: string;
  parentId: string | null;
  kind: TopicKind;
  depth: number;
  path: string;
  sortOrder: number;
  code: string | null;
  name: string;
  slug: string;
}

const LOCKED_TOPIC_SELECT = { id: true, syllabusId: true, parentId: true, kind: true, depth: true, path: true, sortOrder: true, code: true, name: true, slug: true } as const;

/** Locks the version row (serialises tree edits against each other and against a publish) and checks it is a DRAFT. */
async function lockDraftVersion(tx: Tx, syllabusId: string): Promise<void> {
  const rows = await tx.$queryRaw<{ status: SyllabusStatus }[]>`SELECT "status" FROM "Syllabus" WHERE "id" = ${syllabusId}::uuid FOR UPDATE`;
  const status = rows[0]?.status;
  if (status === undefined) throw AppError.notFound("Syllabus version not found.");
  if (status !== "DRAFT") throw AppError.conflict("This version is published, so its topic tree is frozen. Create a new version to change it.");
}

async function topicForDraftEdit(tx: Tx, topicId: string): Promise<LockedTopic> {
  const found = await tx.topic.findUnique({ where: { id: topicId }, select: { syllabusId: true } });
  if (!found) throw AppError.notFound("Topic not found.");
  await lockDraftVersion(tx, found.syllabusId);
  return tx.topic.findUniqueOrThrow({ where: { id: topicId }, select: LOCKED_TOPIC_SELECT });
}

async function siblingsOf(tx: Tx, syllabusId: string, parentId: string | null): Promise<LockedTopic[]> {
  const rows = await tx.topic.findMany({ where: { syllabusId, parentId }, select: LOCKED_TOPIC_SELECT });
  return rows.sort(compareSiblings);
}

/** Rewrites `sortOrder` = position for `orderedIds` in one statement (only rows whose order changed are touched). */
async function setTopicOrder(tx: Tx, orderedIds: readonly string[]): Promise<void> {
  if (orderedIds.length === 0) return;
  await tx.$executeRaw`
    UPDATE "Topic" AS t SET "sortOrder" = (o.n - 1)::int, "updatedAt" = now()
    FROM unnest(${[...orderedIds]}::text[]) WITH ORDINALITY AS o(id, n)
    WHERE t."id" = o.id::uuid AND t."sortOrder" IS DISTINCT FROM (o.n - 1)::int`;
}

async function setObjectiveOrder(tx: Tx, orderedIds: readonly string[]): Promise<void> {
  if (orderedIds.length === 0) return;
  await tx.$executeRaw`
    UPDATE "LearningObjective" AS l SET "sortOrder" = (o.n - 1)::int, "updatedAt" = now()
    FROM unnest(${[...orderedIds]}::text[]) WITH ORDINALITY AS o(id, n)
    WHERE l."id" = o.id::uuid AND l."sortOrder" IS DISTINCT FROM (o.n - 1)::int`;
}

async function takenSlugs(tx: Tx, syllabusId: string): Promise<Set<string>> {
  const rows = await tx.topic.findMany({ where: { syllabusId }, select: { slug: true } });
  return new Set(rows.map((row) => row.slug));
}

const TOPIC_UNIQUE = { slug: "Another topic of this version already uses this slug." };

async function audit(tx: Tx, actor: CurriculumActor, context: ServiceContext, operation: string, entityId: string, extra: { before?: unknown; after?: unknown; metadata?: Record<string, unknown> } = {}): Promise<void> {
  await auditCurriculum(tx, actor, context, { action: CURRICULUM_AUDIT.UPDATE, operation, entityType: "Topic", entityId, ...extra });
}

// =====================================================================================================================
// Add / update / delete
// =====================================================================================================================

export async function addTopic(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string }> {
  assertCurriculumDraft(actor);
  const input = parseInput(topicAddSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      await lockDraftVersion(tx, input.syllabusId);
      const parent = input.parentId ? await tx.topic.findUnique({ where: { id: input.parentId }, select: LOCKED_TOPIC_SELECT }) : null;
      if (input.parentId && (!parent || parent.syllabusId !== input.syllabusId)) throw fieldError("parentId", "Choose a parent in this version.");
      const kind = input.kind ?? defaultChildKind(parent?.kind ?? null);
      const placement = topicPlacementProblem(kind, parent?.kind ?? null);
      if (placement) throw fieldError("kind", placement);
      const taken = await takenSlugs(tx, input.syllabusId);
      if (input.slug && taken.has(input.slug)) throw fieldError("slug", TOPIC_UNIQUE.slug);
      const slug = input.slug ?? dedupeSlug(slugify(input.name), taken);
      const siblings = await siblingsOf(tx, input.syllabusId, parent?.id ?? null);
      const id = randomUUID();
      await tx.topic.create({
        data: {
          id,
          syllabusId: input.syllabusId,
          parentId: parent?.id ?? null,
          kind,
          depth: parent ? parent.depth + 1 : 0,
          path: parent ? `${parent.path}/${id}` : id,
          sortOrder: siblings.reduce((max, sibling) => Math.max(max, sibling.sortOrder), -1) + 1,
          code: input.code,
          name: input.name,
          slug,
        },
      });
      await audit(tx, actor, context, "curriculum.topic.create", id, { after: { syllabusId: input.syllabusId, parentId: parent?.id ?? null, kind, name: input.name, code: input.code, slug } });
      return { id };
    });
  } catch (error) {
    mapDbError(error, TOPIC_UNIQUE);
  }
}

/** Full edit of a DRAFT node: kind (checked against parent and children), name, code, slug, texts, options, papers. */
export async function updateTopic(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string }> {
  assertCurriculumDraft(actor);
  const { id, componentIds, ...input } = parseInput(topicUpdateSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const topic = await topicForDraftEdit(tx, id);
      const before = await tx.topic.findUniqueOrThrow({ where: { id } });
      if (input.kind !== topic.kind) {
        const parent = topic.parentId ? await tx.topic.findUnique({ where: { id: topic.parentId }, select: { kind: true } }) : null;
        const children = await tx.topic.findMany({ where: { parentId: id, syllabusId: topic.syllabusId }, select: { kind: true } });
        const problem = topicKindChangeProblem(input.kind, parent?.kind ?? null, children.map((child) => child.kind));
        if (problem) throw fieldError("kind", problem);
      }
      let slug = input.slug;
      if (slug === null) {
        const taken = await takenSlugs(tx, topic.syllabusId);
        taken.delete(topic.slug);
        slug = dedupeSlug(slugify(input.name), taken);
      }
      const uniqueComponents = [...new Set(componentIds)];
      if (uniqueComponents.length > 0) {
        const valid = await tx.syllabusComponent.count({ where: { syllabusId: topic.syllabusId, id: { in: uniqueComponents } } });
        if (valid !== uniqueComponents.length) throw fieldError("componentIds", "Choose papers of this version.");
      }
      const data = { ...input, slug };
      await tx.topic.update({ where: { id }, data });
      const existingLinks = await tx.topicComponent.findMany({ where: { topicId: id }, select: { componentId: true } });
      const existing = new Set(existingLinks.map((link) => link.componentId));
      const wanted = new Set(uniqueComponents);
      const removed = [...existing].filter((componentId) => !wanted.has(componentId));
      const added = uniqueComponents.filter((componentId) => !existing.has(componentId));
      if (removed.length > 0) await tx.topicComponent.deleteMany({ where: { topicId: id, componentId: { in: removed } } });
      if (added.length > 0) await tx.topicComponent.createMany({ data: added.map((componentId) => ({ topicId: id, componentId })) });
      const diff = diffFields(before, data);
      await audit(tx, actor, context, "curriculum.topic.update", id, {
        ...diff,
        metadata: added.length + removed.length > 0 ? { papersAdded: added.length, papersRemoved: removed.length } : {},
      });
      return { id };
    });
  } catch (error) {
    mapDbError(error, TOPIC_UNIQUE);
  }
}

/**
 * Corrects editorial wording (name, descriptions, SEO fields, visibility, study-time estimate). On a PUBLISHED version
 * this needs ADMIN; the database allows exactly these columns to change after publication.
 */
export async function correctTopicText(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string }> {
  assertCurriculumRead(actor);
  const { id, ...input } = parseInput(topicEditorialSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const before = await tx.topic.findUnique({ where: { id }, include: { syllabus: { select: { status: true } } } });
      if (!before) throw AppError.notFound("Topic not found.");
      const published = before.syllabus.status !== "DRAFT";
      if (published) assertCurriculumAdmin(actor, "Only an admin can correct a published version.");
      else assertCurriculumDraft(actor);
      await tx.topic.update({ where: { id }, data: input });
      await audit(tx, actor, context, published ? "curriculum.topic.correct" : "curriculum.topic.update", id, diffFields(before, input));
      if (published) await enqueueCurriculumReindex(tx, ["TOPIC"]);
      return { id };
    });
  } catch (error) {
    mapDbError(error);
  } finally {
    invalidateCurriculumCaches();
  }
}

/** Deletes a DRAFT node with its subtree and objectives. Refused while content is tagged to any node of the subtree. */
export async function deleteTopic(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ deleted: number }> {
  assertCurriculumDraft(actor);
  const { id } = parseInput(topicIdSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const topic = await topicForDraftEdit(tx, id);
      const subtree = await tx.topic.findMany({
        where: { syllabusId: topic.syllabusId, OR: [{ id }, { path: { startsWith: `${topic.path}/` } }] },
        select: { id: true },
      });
      const ids = subtree.map((row) => row.id);
      const questionTags = await tx.questionTopic.count({ where: { topicId: { in: ids } } });
      const lessonTags = await tx.lessonTopic.count({ where: { topicId: { in: ids } } });
      const flashcardTags = await tx.flashcardTopic.count({ where: { topicId: { in: ids } } });
      const otherRefs = await tx.assessmentTopic.count({ where: { topicId: { in: ids } } });
      if (questionTags + lessonTags + flashcardTags + otherRefs > 0) {
        throw AppError.conflict("Content is tagged to this topic or one of its subtopics. Move or remove those tags before deleting it.");
      }
      await tx.topic.delete({ where: { id } });
      const siblings = await siblingsOf(tx, topic.syllabusId, topic.parentId);
      await setTopicOrder(tx, siblings.map((sibling) => sibling.id));
      await audit(tx, actor, context, "curriculum.topic.delete", id, {
        before: { syllabusId: topic.syllabusId, name: topic.name, code: topic.code, slug: topic.slug, kind: topic.kind },
        metadata: { subtreeSize: ids.length },
      });
      return { deleted: ids.length };
    });
  } catch (error) {
    mapDbError(error);
  }
}

// =====================================================================================================================
// Reordering and moving (button based: up/down, indent/outdent, move under)
// =====================================================================================================================

export async function moveTopic(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ moved: boolean }> {
  assertCurriculumDraft(actor);
  const { id, direction } = parseInput(topicMoveSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const topic = await topicForDraftEdit(tx, id);
      const siblings = await siblingsOf(tx, topic.syllabusId, topic.parentId);
      const next = reorderSiblings(siblings.map((sibling) => sibling.id), id, direction);
      if (!next) return { moved: false };
      await setTopicOrder(tx, next);
      await audit(tx, actor, context, "curriculum.topic.reorder", id, { metadata: { direction } });
      return { moved: true };
    });
  } catch (error) {
    mapDbError(error);
  }
}

/**
 * Re-parents `topic` (and its subtree) under `newParent` (null = top level), placed at `position` among the new
 * siblings (default: last). Rewrites paths and depths of the whole subtree in one statement and fixes kinds that would
 * become invalid. Returns how many kinds were adjusted.
 */
async function reparent(tx: Tx, topic: LockedTopic, newParent: LockedTopic | null, position: "last" | { after: string }): Promise<{ kindChanges: number }> {
  if (newParent && isSameOrDescendantPath(newParent.path, topic.path)) {
    throw fieldError("parentId", "A topic cannot be moved inside itself or one of its subtopics.");
  }
  const newPath = newParent ? `${newParent.path}/${topic.id}` : topic.id;
  const newDepth = newParent ? newParent.depth + 1 : 0;
  const delta = newDepth - topic.depth;
  const oldPrefix = `${topic.path}/`;

  // The moved node first (row CHECKs: parentId/depth/path agree), then the whole subtree in one statement.
  await tx.topic.update({ where: { id: topic.id }, data: { parentId: newParent?.id ?? null, path: newPath, depth: newDepth } });
  await tx.$executeRaw`
    UPDATE "Topic"
       SET "path" = ${`${newPath}/`} || substr("path", ${oldPrefix.length + 1}::int),
           "depth" = "depth" + ${delta}::int,
           "updatedAt" = now()
     WHERE "syllabusId" = ${topic.syllabusId}::uuid AND starts_with("path", ${oldPrefix})`;

  // Kinds: walk the moved subtree parents-first and convert nodes whose kind no longer fits their parent.
  const subtree = await tx.topic.findMany({
    where: { syllabusId: topic.syllabusId, OR: [{ id: topic.id }, { path: { startsWith: `${newPath}/` } }] },
    select: { id: true, parentId: true, kind: true, depth: true },
    orderBy: { depth: "asc" },
  });
  const kinds = new Map<string, TopicKind>();
  if (newParent) kinds.set(newParent.id, newParent.kind);
  const changes = new Map<TopicKind, string[]>();
  for (const node of subtree) {
    const parentKind = node.parentId ? (kinds.get(node.parentId) ?? null) : null;
    let kind = node.kind;
    if (topicPlacementProblem(kind, parentKind)) {
      kind = defaultChildKind(parentKind);
      const ids = changes.get(kind) ?? [];
      ids.push(node.id);
      changes.set(kind, ids);
    }
    kinds.set(node.id, kind);
  }
  for (const [kind, ids] of changes) await tx.topic.updateMany({ where: { id: { in: ids } }, data: { kind } });

  // Sibling order in the new place, and close the gap in the old one.
  const newSiblings = (await siblingsOf(tx, topic.syllabusId, newParent?.id ?? null)).map((sibling) => sibling.id).filter((siblingId) => siblingId !== topic.id);
  if (position === "last") newSiblings.push(topic.id);
  else {
    const index = newSiblings.indexOf(position.after);
    newSiblings.splice(index < 0 ? newSiblings.length : index + 1, 0, topic.id);
  }
  await setTopicOrder(tx, newSiblings);
  const oldSiblings = await siblingsOf(tx, topic.syllabusId, topic.parentId);
  await setTopicOrder(tx, oldSiblings.map((sibling) => sibling.id));
  return { kindChanges: [...changes.values()].reduce((sum, ids) => sum + ids.length, 0) };
}

/** Indent (become the last child of the previous sibling) or outdent (become the next sibling of the parent). */
export async function shiftTopic(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ moved: boolean; kindChanges: number }> {
  assertCurriculumDraft(actor);
  const { id, operation } = parseInput(topicShiftSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const topic = await topicForDraftEdit(tx, id);
      let result: { kindChanges: number };
      if (operation === "indent") {
        const siblings = await siblingsOf(tx, topic.syllabusId, topic.parentId);
        const index = siblings.findIndex((sibling) => sibling.id === id);
        const previous = index > 0 ? siblings[index - 1] : undefined;
        if (!previous) return { moved: false, kindChanges: 0 };
        result = await reparent(tx, topic, previous, "last");
      } else {
        if (!topic.parentId) return { moved: false, kindChanges: 0 };
        const parent = await tx.topic.findUniqueOrThrow({ where: { id: topic.parentId }, select: LOCKED_TOPIC_SELECT });
        const grandparent = parent.parentId ? await tx.topic.findUniqueOrThrow({ where: { id: parent.parentId }, select: LOCKED_TOPIC_SELECT }) : null;
        result = await reparent(tx, topic, grandparent, { after: parent.id });
      }
      await audit(tx, actor, context, `curriculum.topic.${operation}`, id, { metadata: { kindChanges: result.kindChanges } });
      return { moved: true, kindChanges: result.kindChanges };
    });
  } catch (error) {
    mapDbError(error);
  }
}

/** Moves a node (and its subtree) under another node of the same version, or to the top level. */
export async function reparentTopic(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ kindChanges: number }> {
  assertCurriculumDraft(actor);
  const { id, parentId } = parseInput(topicReparentSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const topic = await topicForDraftEdit(tx, id);
      if (parentId === topic.parentId) return { kindChanges: 0 };
      const parent = parentId ? await tx.topic.findUnique({ where: { id: parentId }, select: LOCKED_TOPIC_SELECT }) : null;
      if (parentId && (!parent || parent.syllabusId !== topic.syllabusId)) throw fieldError("parentId", "Choose a parent in this version.");
      const result = await reparent(tx, topic, parent, "last");
      await audit(tx, actor, context, "curriculum.topic.move", id, { before: { parentId: topic.parentId }, after: { parentId }, metadata: { kindChanges: result.kindChanges } });
      return result;
    });
  } catch (error) {
    mapDbError(error);
  }
}

// =====================================================================================================================
// Learning objectives
// =====================================================================================================================

async function objectiveTopic(tx: Tx, topicId: string): Promise<{ syllabusId: string; status: SyllabusStatus }> {
  const topic = await tx.topic.findUnique({ where: { id: topicId }, select: { syllabusId: true, syllabus: { select: { status: true } } } });
  if (!topic) throw AppError.notFound("Topic not found.");
  return { syllabusId: topic.syllabusId, status: topic.syllabus.status };
}

export async function addObjective(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string }> {
  assertCurriculumDraft(actor);
  const input = parseInput(objectiveAddSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const { syllabusId } = await objectiveTopic(tx, input.topicId);
      await lockDraftVersion(tx, syllabusId);
      const last = await tx.learningObjective.aggregate({ where: { topicId: input.topicId }, _max: { sortOrder: true } });
      const row = await tx.learningObjective.create({ data: { ...input, sortOrder: (last._max.sortOrder ?? -1) + 1 }, select: { id: true } });
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: "curriculum.objective.create",
        entityType: "LearningObjective",
        entityId: row.id,
        after: { topicId: input.topicId, code: input.code },
      });
      return row;
    });
  } catch (error) {
    mapDbError(error);
  }
}

/**
 * Edits an objective. DRAFT: everything. PUBLISHED: only the wording and cognitive skill may be corrected, by an
 * admin (the code and position are frozen with the version).
 */
export async function updateObjective(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string }> {
  assertCurriculumRead(actor);
  const { id, ...input } = parseInput(objectiveUpdateSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const before = await tx.learningObjective.findUnique({ where: { id } });
      if (!before) throw AppError.notFound("Learning objective not found.");
      const { syllabusId, status } = await objectiveTopic(tx, before.topicId);
      if (status === "DRAFT") {
        assertCurriculumDraft(actor);
        await lockDraftVersion(tx, syllabusId);
      } else {
        assertCurriculumAdmin(actor, "Only an admin can correct a published version.");
        if ((input.code ?? null) !== (before.code ?? null)) throw fieldError("code", "The code of a published objective is frozen. Create a new version to change it.");
      }
      await tx.learningObjective.update({ where: { id }, data: input });
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: status === "DRAFT" ? "curriculum.objective.update" : "curriculum.objective.correct",
        entityType: "LearningObjective",
        entityId: id,
        ...diffFields(before, input),
      });
      return { id };
    });
  } catch (error) {
    mapDbError(error);
  }
}

export async function moveObjective(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ moved: boolean }> {
  assertCurriculumDraft(actor);
  const { id, direction } = parseInput(objectiveMoveSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const objective = await tx.learningObjective.findUnique({ where: { id }, select: { topicId: true } });
      if (!objective) throw AppError.notFound("Learning objective not found.");
      const { syllabusId } = await objectiveTopic(tx, objective.topicId);
      await lockDraftVersion(tx, syllabusId);
      const siblings = await tx.learningObjective.findMany({ where: { topicId: objective.topicId }, select: { id: true }, orderBy: [{ sortOrder: "asc" }, { id: "asc" }] });
      const next = reorderSiblings(siblings.map((sibling) => sibling.id), id, direction);
      if (!next) return { moved: false };
      await setObjectiveOrder(tx, next);
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: "curriculum.objective.reorder",
        entityType: "LearningObjective",
        entityId: id,
        metadata: { direction },
      });
      return { moved: true };
    });
  } catch (error) {
    mapDbError(error);
  }
}

export async function deleteObjective(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ topicId: string }> {
  assertCurriculumDraft(actor);
  const { id } = parseInput(topicIdSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const objective = await tx.learningObjective.findUnique({ where: { id } });
      if (!objective) throw AppError.notFound("Learning objective not found.");
      const { syllabusId } = await objectiveTopic(tx, objective.topicId);
      await lockDraftVersion(tx, syllabusId);
      const lessonLinks = await tx.lessonObjective.count({ where: { objectiveId: id } });
      const questionLinks = await tx.questionObjective.count({ where: { objectiveId: id } });
      if (lessonLinks + questionLinks > 0) throw AppError.conflict("Lessons or questions are linked to this objective. Remove those links first.");
      await tx.learningObjective.delete({ where: { id } });
      const rest = await tx.learningObjective.findMany({ where: { topicId: objective.topicId }, select: { id: true }, orderBy: [{ sortOrder: "asc" }, { id: "asc" }] });
      await setObjectiveOrder(tx, rest.map((row) => row.id));
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: "curriculum.objective.delete",
        entityType: "LearningObjective",
        entityId: id,
        before: { topicId: objective.topicId, code: objective.code },
      });
      return { topicId: objective.topicId };
    });
  } catch (error) {
    mapDbError(error);
  }
}

// =====================================================================================================================
// Pasted outlines (bulk entry)
// =====================================================================================================================

export interface OutlinePreview {
  ok: boolean;
  topicCount: number;
  objectiveCount: number;
  depth: number;
  errors: { line: number; message: string }[];
  /** First nodes of the parsed tree, for a read-back preview (bounded). */
  preview: { depth: number; kind: TopicKind; code: string | null; name: string; objectives: number }[];
}

function previewOf(result: OutlineParseResult): OutlinePreview {
  const preview: OutlinePreview["preview"] = [];
  const depthOf = new Map<OutlineNode, number>();
  walkOutline(result.roots, (node, parent) => {
    const depth = parent ? (depthOf.get(parent) ?? 0) + 1 : 0;
    depthOf.set(node, depth);
    if (preview.length < 300) preview.push({ depth, kind: node.kind, code: node.code, name: node.name, objectives: node.objectives.length });
  });
  return { ok: result.errors.length === 0, topicCount: result.topicCount, objectiveCount: result.objectiveCount, depth: result.depth, errors: result.errors.slice(0, 50), preview };
}

async function outlineParent(tx: DbClient, syllabusId: string, parentId: string | null): Promise<LockedTopic | null> {
  if (!parentId) return null;
  const parent = await tx.topic.findUnique({ where: { id: parentId }, select: LOCKED_TOPIC_SELECT });
  if (!parent || parent.syllabusId !== syllabusId) throw fieldError("parentId", "Choose a parent in this version.");
  return parent;
}

/** Parses a pasted outline without writing anything (the editor shows the read-back before importing). */
export async function previewOutline(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<OutlinePreview> {
  assertCurriculumDraft(actor);
  const input = parseInput(outlineImportSchema, raw);
  const parent = await outlineParent(readClient(context), input.syllabusId, input.parentId);
  return previewOf(parseOutline(input.text, { parentKind: parent?.kind ?? null, topLevelKind: input.topLevelKind, detectCodes: input.detectCodes }));
}

/**
 * Creates the topics and objectives of a pasted outline under `parentId` (or at the top level), after the existing
 * children. Slugs are derived from names and de-duplicated within the version. The provenance of pasted official
 * structures is recorded on the version (§27): the chosen source becomes the version's source when it has none, and a
 * dated line is appended to its source notes.
 */
export async function importOutline(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ topics: number; objectives: number }> {
  assertCurriculumDraft(actor);
  const input = parseInput(outlineImportSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      await lockDraftVersion(tx, input.syllabusId);
      const parent = await outlineParent(tx, input.syllabusId, input.parentId);
      const parsed = parseOutline(input.text, { parentKind: parent?.kind ?? null, topLevelKind: input.topLevelKind, detectCodes: input.detectCodes });
      if (parsed.errors.length > 0) {
        throw AppError.validation(
          { text: parsed.errors.slice(0, 10).map((error) => `Line ${error.line}: ${error.message}`) },
          "Fix the outline and try again.",
        );
      }
      const source = input.sourceId ? await tx.contentSource.findUnique({ where: { id: input.sourceId }, select: { id: true, name: true } }) : null;
      if (input.sourceId && !source) throw fieldError("sourceId", "Choose a source from the list.");

      const taken = await takenSlugs(tx, input.syllabusId);
      const siblings = await siblingsOf(tx, input.syllabusId, parent?.id ?? null);
      const firstOrder = siblings.reduce((max, sibling) => Math.max(max, sibling.sortOrder), -1) + 1;
      const topics: Prisma.TopicCreateManyInput[] = [];
      const objectives: Prisma.LearningObjectiveCreateManyInput[] = [];
      const placed = new Map<OutlineNode, { id: string; path: string; depth: number }>();
      const childIndex = new Map<OutlineNode | null, number>();
      walkOutline(parsed.roots, (node, outlineParentNode) => {
        const id = randomUUID();
        const above = outlineParentNode ? placed.get(outlineParentNode) : parent ? { id: parent.id, path: parent.path, depth: parent.depth } : null;
        const position = childIndex.get(outlineParentNode) ?? 0;
        childIndex.set(outlineParentNode, position + 1);
        const path = above ? `${above.path}/${id}` : id;
        const depth = above ? above.depth + 1 : 0;
        placed.set(node, { id, path, depth });
        const slug = dedupeSlug(slugify(node.name), taken);
        taken.add(slug);
        topics.push({
          id,
          syllabusId: input.syllabusId,
          parentId: above?.id ?? null,
          kind: node.kind,
          depth,
          path,
          sortOrder: outlineParentNode ? position : firstOrder + position,
          code: node.code,
          name: node.name,
          slug,
        });
        node.objectives.forEach((objective, index) => {
          objectives.push({ id: randomUUID(), topicId: id, code: objective.code, statement: objective.statement, sortOrder: index });
        });
      });
      // walkOutline is pre-order, so every parent row precedes its children (and createMany keeps the order).
      await tx.topic.createMany({ data: topics });
      if (objectives.length > 0) await tx.learningObjective.createMany({ data: objectives });

      const version = await tx.syllabus.findUniqueOrThrow({ where: { id: input.syllabusId }, select: { sourceId: true, sourceNotes: true } });
      const note = `[${today()}] Outline pasted (${topics.length} topics, ${objectives.length} objectives)${source ? ` from ${source.name}` : ""}${input.sourceNote ? `: ${input.sourceNote}` : ""}.`;
      await tx.syllabus.update({
        where: { id: input.syllabusId },
        data: {
          sourceNotes: [version.sourceNotes, note].filter(Boolean).join("\n").slice(-5000),
          ...(version.sourceId === null && source ? { sourceId: source.id } : {}),
        },
      });
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.IMPORT,
        operation: "curriculum.topic.outline_import",
        entityType: "Syllabus",
        entityId: input.syllabusId,
        metadata: { parentId: parent?.id ?? null, topics: topics.length, objectives: objectives.length, sourceId: source?.id ?? null, sourceNote: input.sourceNote },
      });
      return { topics: topics.length, objectives: objectives.length };
    });
  } catch (error) {
    mapDbError(error, TOPIC_UNIQUE);
  }
}

// =====================================================================================================================
// Topic search (/admin/topics)
// =====================================================================================================================

const TOPIC_SEARCH_SELECT = {
  id: true,
  kind: true,
  code: true,
  name: true,
  slug: true,
  depth: true,
  isPublic: true,
  syllabus: {
    select: {
      id: true,
      versionLabel: true,
      status: true,
      subject: { select: { id: true, name: true, qualification: { select: { shortName: true, examBoard: { select: { shortName: true } } } } } },
    },
  },
  _count: { select: { questionTopics: true, lessonTopics: true, objectives: true } },
} as const satisfies Prisma.TopicSelect;
export type TopicSearchRow = Prisma.TopicGetPayload<{ select: typeof TOPIC_SEARCH_SELECT }>;

/** Topics across versions by name, code or slug, with filters. */
export async function searchTopics(actor: CurriculumActor, filter: unknown = {}, context: ServiceContext = {}): Promise<Page<TopicSearchRow>> {
  assertCurriculumRead(actor);
  const f = parseInput(topicSearchFilterSchema, filter);
  const rows = await readClient(context).topic.findMany({
    where: {
      ...(f.syllabusId ? { syllabusId: f.syllabusId } : {}),
      ...(f.subjectId ? { syllabus: { subjectId: f.subjectId } } : {}),
      ...(f.kind ? { kind: f.kind } : {}),
      ...(f.q
        ? {
            OR: [
              { name: { contains: f.q, mode: "insensitive" } },
              { code: { contains: f.q, mode: "insensitive" } },
              { slug: { contains: f.q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    select: TOPIC_SEARCH_SELECT,
    orderBy: [{ syllabusId: "asc" }, { path: "asc" }, { id: "asc" }],
    take: ADMIN_PAGE_SIZE + 1,
    ...cursorArgs(f.cursor),
  });
  return toPage(rows);
}
