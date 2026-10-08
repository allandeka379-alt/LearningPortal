import "server-only";
import { randomUUID } from "node:crypto";
import type { CognitiveSkill, Prisma, SyllabusComponentKind, SyllabusStatus, TopicKind } from "@/generated/prisma/client";
import { localDateFromDateColumn } from "@/lib/dates";
import { lockDraftSyllabus } from "@/server/cms/imports/drafts";
import { auditCurriculum, CURRICULUM_AUDIT } from "@/server/cms/curriculum/shared";
import { correctPublishedSyllabusVersion, createSyllabusVersion, publishSyllabusVersion, updateDraftSyllabusVersion } from "@/server/cms/curriculum/syllabuses";
import type { CmsActor } from "@/server/cms/users/access";
import { db } from "@/server/db";
import type { Tx } from "@/server/lib/db-context";
import { AppError } from "@/server/lib/errors";
import { describeError } from "./issues";
import type { FlatNode, SyllabusModel } from "./resolve";
import { ensureOfficialSource } from "./sources";

/**
 * Syllabus versions from content/syllabi (docs/CONTENT_PIPELINE.md "Syllabus files") into the curriculum tables:
 *
 * - a missing version is created as DRAFT through the curriculum service (author = the pipeline account), with the
 *   official document as its OFFICIAL_SYLLABUS source and copyright OWNED (headings transcribed, objectives in our own
 *   words), then its topic tree, objectives, papers and routes are written from the file;
 * - a DRAFT version is brought in line with the file (nodes matched by `Topic.contentKey`, objectives by code, papers
 *   and routes by code): created, updated, moved or deleted;
 * - a PUBLISHED version is immutable (§26): structural differences are reported as conflicts ("create a new version
 *   file"); editorial wording can be corrected by an admin approver;
 * - with an ADMIN approver, DRAFT versions are published through the curriculum service (four-eyes: the approver is
 *   not the author).
 */

export interface SyllabusIndexEntry {
  model: SyllabusModel;
  syllabusId: string;
  subjectId: string;
  status: SyllabusStatus;
  /** node key → Topic id. */
  topicIds: Map<string, string>;
  /** objective code → LearningObjective id. */
  objectiveIds: Map<string, string>;
}

export type SyllabusOutcomeKind = "created" | "updated" | "unchanged" | "published" | "conflict" | "error";

export interface SyllabusOutcome {
  path: string;
  outcome: SyllabusOutcomeKind;
  message?: string;
  syllabusId?: string;
}

export interface SyllabusSyncContext {
  author: CmsActor;
  /** ADMIN approver: publishes DRAFT versions and corrects published wording. */
  approver: CmsActor | null;
}

const TOPIC_SELECT = {
  id: true,
  parentId: true,
  path: true,
  depth: true,
  sortOrder: true,
  kind: true,
  code: true,
  name: true,
  slug: true,
  description: true,
  isOptional: true,
  optionGroup: true,
  estimatedStudyMinutes: true,
  contentKey: true,
  componentLinks: { select: { component: { select: { code: true } } } },
} as const;

type TopicRow = Prisma.TopicGetPayload<{ select: typeof TOPIC_SELECT }>;

interface DesiredTopic {
  id: string;
  key: string;
  parentId: string | null;
  path: string;
  depth: number;
  sortOrder: number;
  kind: TopicKind;
  code: string | null;
  name: string;
  slug: string;
  description: string | null;
  isOptional: boolean;
  optionGroup: string | null;
  estimatedStudyMinutes: number | null;
  components: string[];
}

function desiredTree(model: SyllabusModel, idOf: (node: FlatNode) => string): DesiredTopic[] {
  const out: DesiredTopic[] = [];
  const placed = new Map<string, DesiredTopic>();
  for (const node of model.nodes) {
    const id = idOf(node);
    const parent = node.parentKey ? placed.get(node.parentKey) : undefined;
    const row: DesiredTopic = {
      id,
      key: node.key,
      parentId: parent?.id ?? null,
      path: parent ? `${parent.path}/${id}` : id,
      depth: node.depth,
      sortOrder: node.sortOrder,
      kind: node.kind,
      code: node.code,
      name: node.name,
      slug: node.slug,
      description: node.description,
      isOptional: node.optional,
      optionGroup: node.optionGroup,
      estimatedStudyMinutes: node.estimatedStudyMinutes,
      components: [...node.components].sort(),
    };
    placed.set(node.key, row);
    out.push(row);
  }
  return out;
}

function sameTopic(row: TopicRow, want: DesiredTopic): boolean {
  return (
    row.parentId === want.parentId &&
    row.path === want.path &&
    row.depth === want.depth &&
    row.sortOrder === want.sortOrder &&
    row.kind === want.kind &&
    row.code === want.code &&
    row.name === want.name &&
    row.slug === want.slug &&
    (row.description ?? null) === want.description &&
    row.isOptional === want.isOptional &&
    (row.optionGroup ?? null) === want.optionGroup &&
    (row.estimatedStudyMinutes ?? null) === want.estimatedStudyMinutes &&
    row.contentKey === want.key &&
    row.componentLinks.map((l) => l.component.code).sort().join() === want.components.join()
  );
}

function sourceNotesOf(model: SyllabusModel): string {
  return [model.data.sourceNote, ...model.data.notes.map((note) => `- ${note}`)].join("\n").slice(0, 5_000);
}

/** Version metadata as the curriculum service's update form takes it. */
function metadataInput(model: SyllabusModel, id: string, sourceId: string) {
  return {
    id,
    versionLabel: model.ref.versionLabel,
    title: model.data.title,
    code: model.data.code,
    effectiveFrom: model.data.effectiveFrom,
    effectiveTo: model.data.effectiveTo,
    overview: model.data.overview ?? null,
    assessmentOverview: model.data.assessmentOverview ?? null,
    officialDocumentUrl: model.data.officialDocument.url,
    gradeSchemeId: null,
    sourceId,
    copyrightStatus: "OWNED" as const,
    sourceNotes: sourceNotesOf(model),
  };
}

type VersionRow = Prisma.SyllabusGetPayload<{ select: typeof VERSION_SELECT }>;
const VERSION_SELECT = {
  id: true,
  status: true,
  title: true,
  code: true,
  effectiveFrom: true,
  effectiveTo: true,
  overview: true,
  assessmentOverview: true,
  officialDocumentUrl: true,
  sourceId: true,
  copyrightStatus: true,
  sourceNotes: true,
  gradeSchemeId: true,
  createdById: true,
} as const;

function metadataDiffers(row: VersionRow, want: ReturnType<typeof metadataInput>): string[] {
  const out: string[] = [];
  const check = (field: string, a: unknown, b: unknown) => {
    if ((a ?? null) !== (b ?? null)) out.push(field);
  };
  check("title", row.title, want.title);
  check("code", row.code, want.code);
  check("effectiveFrom", localDateFromDateColumn(row.effectiveFrom), want.effectiveFrom);
  check("effectiveTo", row.effectiveTo ? localDateFromDateColumn(row.effectiveTo) : null, want.effectiveTo);
  check("overview", row.overview, want.overview);
  check("assessmentOverview", row.assessmentOverview, want.assessmentOverview);
  check("officialDocumentUrl", row.officialDocumentUrl, want.officialDocumentUrl);
  check("sourceId", row.sourceId, want.sourceId);
  check("copyrightStatus", row.copyrightStatus, want.copyrightStatus);
  check("sourceNotes", row.sourceNotes, want.sourceNotes);
  return out;
}

async function loadIndex(client: Tx | typeof db, model: SyllabusModel, syllabusId: string, subjectId: string, status: SyllabusStatus): Promise<SyllabusIndexEntry> {
  const topics = await client.topic.findMany({ where: { syllabusId }, select: { id: true, contentKey: true } });
  const objectives = await client.learningObjective.findMany({ where: { topic: { syllabusId } }, select: { id: true, code: true } });
  return {
    model,
    syllabusId,
    subjectId,
    status,
    topicIds: new Map(topics.filter((t) => t.contentKey !== null).map((t) => [t.contentKey as string, t.id])),
    objectiveIds: new Map(objectives.filter((o) => o.code !== null).map((o) => [o.code as string, o.id])),
  };
}

/** Structural differences between a stored version and the file (published versions: reported, never applied). */
async function structureDifferences(syllabusId: string, model: SyllabusModel): Promise<string[]> {
  const rows = await db.topic.findMany({ where: { syllabusId }, select: TOPIC_SELECT });
  const byKey = new Map(rows.filter((r) => r.contentKey).map((r) => [r.contentKey as string, r]));
  const differences: string[] = [];
  if (rows.length > 0 && byKey.size === 0) return ["this version was not created by the content pipeline (its topics have no content keys)"];
  const desired = desiredTree(model, (node) => byKey.get(node.key)?.id ?? `missing:${node.key}`);
  for (const want of desired) {
    const row = byKey.get(want.key);
    if (!row) differences.push(`topic "${want.key}" is missing`);
    else if (!sameTopic(row, want)) differences.push(`topic "${want.key}" differs`);
  }
  for (const row of rows) if (!row.contentKey || !model.byKey.has(row.contentKey)) differences.push(`topic "${row.contentKey ?? row.slug}" is not in the file`);
  const objectives = await db.learningObjective.findMany({ where: { topic: { syllabusId } }, select: { code: true, statement: true, cognitiveSkill: true, topic: { select: { contentKey: true } } } });
  const wanted = new Map<string, { key: string; text: string; skill: CognitiveSkill | null }>();
  for (const node of model.nodes) for (const o of node.objectives) wanted.set(o.code, { key: node.key, text: o.text, skill: o.skill ?? null });
  for (const o of objectives) {
    const want = o.code ? wanted.get(o.code) : undefined;
    if (!want) differences.push(`objective "${o.code ?? o.statement.slice(0, 30)}" is not in the file`);
    else if (want.key !== o.topic.contentKey || want.text !== o.statement || want.skill !== o.cognitiveSkill) differences.push(`objective "${o.code}" differs`);
    if (o.code) wanted.delete(o.code);
  }
  for (const code of wanted.keys()) differences.push(`objective "${code}" is missing`);
  const components = await db.syllabusComponent.findMany({ where: { syllabusId }, select: { code: true } });
  const codes = new Set(components.map((c) => c.code));
  for (const component of model.data.components) if (!codes.has(component.code)) differences.push(`paper "${component.code}" is missing`);
  return differences;
}

/** Brings a DRAFT version's structure in line with the file (one transaction, one audit entry). */
async function syncDraftStructure(tx: Tx, syllabusId: string, model: SyllabusModel, author: CmsActor): Promise<{ changed: number }> {
  await lockDraftSyllabus(tx, syllabusId);
  let changed = 0;

  // Papers and routes (by code).
  const components = await tx.syllabusComponent.findMany({ where: { syllabusId } });
  const componentIds = new Map(components.map((c) => [c.code, c.id]));
  for (const [index, component] of model.data.components.entries()) {
    const data = {
      name: component.name,
      kind: component.kind as SyllabusComponentKind,
      description: component.description ?? null,
      durationMinutes: component.durationMinutes ?? null,
      maxMarks: component.maxMarks ?? null,
      weightingPercent: component.weightingPercent ?? null,
      calculatorAllowed: component.calculatorAllowed ?? null,
      sortOrder: index,
    };
    const existing = components.find((c) => c.code === component.code);
    if (!existing) {
      const created = await tx.syllabusComponent.create({ data: { syllabusId, code: component.code, ...data }, select: { id: true } });
      componentIds.set(component.code, created.id);
      changed += 1;
    } else if (
      existing.name !== data.name ||
      existing.kind !== data.kind ||
      (existing.description ?? null) !== data.description ||
      existing.durationMinutes !== data.durationMinutes ||
      existing.maxMarks !== data.maxMarks ||
      (existing.weightingPercent === null ? null : Number(existing.weightingPercent)) !== data.weightingPercent ||
      existing.calculatorAllowed !== data.calculatorAllowed ||
      existing.sortOrder !== data.sortOrder
    ) {
      await tx.syllabusComponent.update({ where: { id: existing.id }, data });
      changed += 1;
    }
  }
  const routes = await tx.syllabusRoute.findMany({ where: { syllabusId }, include: { componentLinks: { include: { component: { select: { code: true } } } } } });
  for (const [index, route] of model.data.routes.entries()) {
    const links = route.components.map((link) => (typeof link === "string" ? { code: link, compulsory: true, choiceGroup: null } : { code: link.code, compulsory: link.compulsory, choiceGroup: link.choiceGroup ?? null }));
    const existing = routes.find((r) => r.code === route.code);
    const data = { name: route.name, description: route.description ?? null, isDefault: route.isDefault, sortOrder: index };
    const linkKey = (list: { code: string; compulsory: boolean; choiceGroup: string | null }[]) => list.map((l) => `${l.code}:${l.compulsory}:${l.choiceGroup ?? ""}`).sort().join();
    const existingLinks = existing?.componentLinks.map((l) => ({ code: l.component.code, compulsory: l.isCompulsory, choiceGroup: l.choiceGroup })) ?? [];
    let routeId = existing?.id;
    if (!existing) {
      routeId = (await tx.syllabusRoute.create({ data: { syllabusId, code: route.code, ...data }, select: { id: true } })).id;
      changed += 1;
    } else if (existing.name !== data.name || (existing.description ?? null) !== data.description || existing.isDefault !== data.isDefault || existing.sortOrder !== data.sortOrder) {
      await tx.syllabusRoute.update({ where: { id: existing.id }, data });
      changed += 1;
    }
    if (!existing || linkKey(existingLinks) !== linkKey(links)) {
      await tx.syllabusRouteComponent.deleteMany({ where: { routeId: routeId as string } });
      await tx.syllabusRouteComponent.createMany({
        data: links.map((l) => ({ routeId: routeId as string, componentId: componentIds.get(l.code) as string, isCompulsory: l.compulsory, choiceGroup: l.choiceGroup })),
      });
      changed += 1;
    }
  }
  const staleRoutes = routes.filter((r) => !model.data.routes.some((route) => route.code === r.code)).map((r) => r.id);
  if (staleRoutes.length > 0) {
    await tx.syllabusRoute.deleteMany({ where: { id: { in: staleRoutes } } });
    changed += staleRoutes.length;
  }

  // Topic tree (by content key; nodes of an un-keyed draft are adopted by slug).
  const rows = await tx.topic.findMany({ where: { syllabusId }, select: TOPIC_SELECT });
  const byKey = new Map(rows.filter((r) => r.contentKey).map((r) => [r.contentKey as string, r]));
  const bySlug = new Map(rows.filter((r) => !r.contentKey).map((r) => [r.slug, r]));
  const used = new Set<string>();
  const desired = desiredTree(model, (node) => {
    const row = byKey.get(node.key) ?? bySlug.get(node.slug);
    if (row && !used.has(row.id)) {
      used.add(row.id);
      return row.id;
    }
    return randomUUID();
  });
  const rowById = new Map(rows.map((r) => [r.id, r]));
  const removed = rows.filter((r) => !used.has(r.id));
  const updates = desired.filter((want) => {
    const row = rowById.get(want.id);
    return row !== undefined && !sameTopic(row, want);
  });
  const creates = desired.filter((want) => !rowById.has(want.id));

  // 1. Free slugs and keys that change hands (unique per version) with temporary values.
  const moving = [...updates.map((u) => rowById.get(u.id) as TopicRow), ...removed].filter((row) => {
    const want = desired.find((d) => d.id === row.id);
    return !want || want.slug !== row.slug || want.key !== row.contentKey;
  });
  for (const row of moving) {
    await tx.topic.update({ where: { id: row.id }, data: { slug: `tmp-${row.id}`, contentKey: null } });
  }
  // 2. New nodes, parents first (pre-order).
  for (const want of creates) {
    await tx.topic.create({
      data: {
        id: want.id,
        syllabusId,
        parentId: want.parentId,
        kind: want.kind,
        depth: want.depth,
        path: want.path,
        sortOrder: want.sortOrder,
        code: want.code,
        name: want.name,
        slug: want.slug,
        description: want.description,
        isOptional: want.isOptional,
        optionGroup: want.optionGroup,
        estimatedStudyMinutes: want.estimatedStudyMinutes,
        contentKey: want.key,
      },
    });
  }
  // 3. Changed nodes, parents first (moves re-parent children before their old parents are deleted).
  for (const want of updates) {
    await tx.topic.update({
      where: { id: want.id },
      data: {
        parentId: want.parentId,
        kind: want.kind,
        depth: want.depth,
        path: want.path,
        sortOrder: want.sortOrder,
        code: want.code,
        name: want.name,
        slug: want.slug,
        description: want.description,
        isOptional: want.isOptional,
        optionGroup: want.optionGroup,
        estimatedStudyMinutes: want.estimatedStudyMinutes,
        contentKey: want.key,
      },
    });
  }
  // 4. Removed nodes, deepest first. Content tags keep a topic (Restrict): untag the content first.
  for (const row of [...removed].sort((a, b) => b.depth - a.depth)) {
    try {
      await tx.topic.delete({ where: { id: row.id } });
    } catch (error) {
      throw new AppError("CONFLICT", `Topic "${row.contentKey ?? row.slug}" was removed from the file but content is still tagged to it; retag or remove that content first.`, { cause: error });
    }
  }
  // 5. Paper links of every node.
  const linksChanged = [...creates, ...updates].filter((want) => want.components.length > 0 || (rowById.get(want.id)?.componentLinks.length ?? 0) > 0);
  for (const want of linksChanged) {
    await tx.topicComponent.deleteMany({ where: { topicId: want.id } });
    if (want.components.length > 0) {
      await tx.topicComponent.createMany({ data: want.components.map((code) => ({ topicId: want.id, componentId: componentIds.get(code) as string })) });
    }
  }
  changed += creates.length + updates.length + removed.length;

  // Objectives (by code within the version).
  const objectives = await tx.learningObjective.findMany({ where: { topic: { syllabusId } }, select: { id: true, code: true, statement: true, cognitiveSkill: true, sortOrder: true, topicId: true } });
  const byCode = new Map(objectives.filter((o) => o.code !== null).map((o) => [o.code as string, o]));
  const keepObjectives = new Set<string>();
  const topicIdOf = new Map(desired.map((d) => [d.key, d.id]));
  for (const node of model.nodes) {
    const topicId = topicIdOf.get(node.key) as string;
    for (const [index, objective] of node.objectives.entries()) {
      const existing = byCode.get(objective.code);
      const data = { topicId, statement: objective.text, cognitiveSkill: (objective.skill ?? null) as CognitiveSkill | null, sortOrder: index };
      if (!existing) {
        await tx.learningObjective.create({ data: { ...data, code: objective.code } });
        changed += 1;
      } else {
        keepObjectives.add(existing.id);
        if (existing.topicId !== data.topicId || existing.statement !== data.statement || existing.cognitiveSkill !== data.cognitiveSkill || existing.sortOrder !== data.sortOrder) {
          await tx.learningObjective.update({ where: { id: existing.id }, data });
          changed += 1;
        }
      }
    }
  }
  const staleObjectives = objectives.filter((o) => !keepObjectives.has(o.id));
  if (staleObjectives.length > 0) {
    try {
      await tx.learningObjective.deleteMany({ where: { id: { in: staleObjectives.map((o) => o.id) } } });
    } catch (error) {
      throw new AppError("CONFLICT", "An objective removed from the file is still linked to content; unlink it first.", { cause: error });
    }
    changed += staleObjectives.length;
  }

  // Papers removed from the file (after topic links were rewritten).
  const staleComponents = components.filter((c) => !model.data.components.some((component) => component.code === c.code)).map((c) => c.id);
  if (staleComponents.length > 0) {
    await tx.syllabusComponent.deleteMany({ where: { id: { in: staleComponents } } });
    changed += staleComponents.length;
  }

  if (changed > 0) {
    await auditCurriculum(tx, author, {}, {
      action: CURRICULUM_AUDIT.UPDATE,
      operation: "content.pipeline.syllabus_sync",
      entityType: "Syllabus",
      entityId: syllabusId,
      after: { topics: desired.length, created: creates.length, updated: updates.length, removed: removed.length },
      metadata: { file: model.file },
    });
  }
  return { changed };
}

/**
 * Why publishing `versionId` as CURRENT must not happen, or null. Refused when the subject already has a CURRENT
 * version that takes effect LATER: publishing would supersede that newer version (a rollback), and its students would
 * be stranded on a SUPERSEDED version, because the "newer syllabus available" move only ever goes forward
 * (src/server/enrollment/version-move-core.ts `newerCurrentVersion`). A genuine rollback is an admin decision for the CMS.
 */
export async function rollbackProblem(subjectId: string, versionId: string, mode: "CURRENT" | "UPCOMING"): Promise<string | null> {
  if (mode !== "CURRENT") return null;
  const self = await db.syllabus.findUnique({ where: { id: versionId }, select: { effectiveFrom: true } });
  if (!self) return null;
  const later = await db.syllabus.findFirst({
    where: { subjectId, id: { not: versionId }, status: "CURRENT", effectiveFrom: { gt: self.effectiveFrom } },
    orderBy: { effectiveFrom: "desc" },
    select: { versionLabel: true, effectiveFrom: true },
  });
  if (!later) return null;
  return (
    `Not published: the CURRENT version "${later.versionLabel}" takes effect later (${localDateFromDateColumn(later.effectiveFrom)}) than this one ` +
    `(${localDateFromDateColumn(self.effectiveFrom)}). Publishing this one as CURRENT would supersede it and strand the students pinned to it. ` +
    "Check effectiveFrom in the file, or retire the other version in the CMS first."
  );
}

/** Sets supersedesId of a new DRAFT version to the latest earlier version of the subject, with topic lineage by key. */
async function linkLineage(tx: Tx, syllabusId: string, subjectId: string, effectiveFrom: Date): Promise<void> {
  const previous = await tx.syllabus.findFirst({
    where: { subjectId, id: { not: syllabusId }, effectiveFrom: { lt: effectiveFrom } },
    orderBy: { effectiveFrom: "desc" },
    select: { id: true },
  });
  if (!previous) return;
  await tx.syllabus.update({ where: { id: syllabusId }, data: { supersedesId: previous.id } });
  // Sequential: a transaction is one connection.
  const mine = await tx.topic.findMany({ where: { syllabusId, contentKey: { not: null } }, select: { id: true, contentKey: true, originTopicId: true } });
  const theirs = await tx.topic.findMany({ where: { syllabusId: previous.id, contentKey: { not: null } }, select: { id: true, contentKey: true } });
  const origin = new Map(theirs.map((t) => [t.contentKey as string, t.id]));
  for (const topic of mine) {
    const from = origin.get(topic.contentKey as string) ?? null;
    if (from !== topic.originTopicId) await tx.topic.update({ where: { id: topic.id }, data: { originTopicId: from } });
  }
}

/**
 * Imports one syllabus file. Never throws for content problems: they come back as outcomes (the version is then left
 * as it was), so one bad file does not stop the others.
 */
export async function syncSyllabus(model: SyllabusModel, ctx: SyllabusSyncContext): Promise<{ entry: SyllabusIndexEntry | null; outcomes: SyllabusOutcome[] }> {
  const outcomes: SyllabusOutcome[] = [];
  const subject = await db.subject.findFirst({
    where: { slug: model.ref.subject, qualification: { slug: model.ref.qualification, examBoard: { slug: model.ref.board } } },
    select: { id: true },
  });
  if (!subject) {
    return { entry: null, outcomes: [{ path: model.path, outcome: "error", message: `No subject ${model.subjectPath} in the catalogue (create it in the CMS first).` }] };
  }
  try {
    const sourceId = await ensureOfficialSource(db, model);
    let version = await db.syllabus.findUnique({ where: { subjectId_versionLabel: { subjectId: subject.id, versionLabel: model.ref.versionLabel } }, select: VERSION_SELECT });
    let created = false;
    if (!version) {
      const result = await createSyllabusVersion(ctx.author, {
        subjectId: subject.id,
        versionLabel: model.ref.versionLabel,
        title: model.data.title,
        code: model.data.code,
        effectiveFrom: model.data.effectiveFrom,
        effectiveTo: model.data.effectiveTo,
        cloneFromId: null,
      });
      version = await db.syllabus.findUniqueOrThrow({ where: { id: result.id }, select: VERSION_SELECT });
      created = true;
    }
    const want = metadataInput(model, version.id, sourceId);

    if (version.status === "DRAFT") {
      const metaChanged = metadataDiffers(version, want);
      if (metaChanged.length > 0) await updateDraftSyllabusVersion(ctx.author, want);
      const versionId = version.id;
      const effectiveFrom = version.effectiveFrom;
      const { changed } = await db.$transaction(
        async (tx) => {
          const result = await syncDraftStructure(tx, versionId, model, ctx.author);
          if (created) await linkLineage(tx, versionId, subject.id, effectiveFrom);
          return result;
        },
        { timeout: 120_000, maxWait: 10_000 },
      );
      outcomes.push({
        path: model.path,
        outcome: created ? "created" : metaChanged.length > 0 || changed > 0 ? "updated" : "unchanged",
        syllabusId: version.id,
        ...(created ? { message: `${model.nodes.length} topics` } : changed > 0 || metaChanged.length > 0 ? { message: `${changed} structural change(s)${metaChanged.length > 0 ? `; ${metaChanged.join(", ")}` : ""}` } : {}),
      });
      const blocked = ctx.approver ? await rollbackProblem(subject.id, version.id, model.data.publishAs) : null;
      if (blocked) {
        outcomes.push({ path: model.path, outcome: "conflict", syllabusId: version.id, message: blocked });
      } else if (ctx.approver) {
        const published = await publishSyllabusVersion(ctx.approver, { id: version.id, mode: model.data.publishAs, archivePrevious: false });
        outcomes.push({ path: model.path, outcome: "published", syllabusId: version.id, message: `published as ${published.status}${published.previous ? ` (previous version ${published.previous.status})` : ""}` });
        version = await db.syllabus.findUniqueOrThrow({ where: { id: version.id }, select: VERSION_SELECT });
      }
    } else {
      const differences = await structureDifferences(version.id, model);
      const editorial = metadataDiffers(version, want).filter((field) => ["title", "effectiveTo", "overview", "assessmentOverview", "officialDocumentUrl", "sourceNotes"].includes(field));
      const frozen = metadataDiffers(version, want).filter((field) => !editorial.includes(field) && field !== "sourceId");
      if (editorial.length > 0 && ctx.approver) {
        await correctPublishedSyllabusVersion(ctx.approver, {
          id: version.id,
          title: want.title,
          effectiveTo: want.effectiveTo,
          overview: want.overview,
          assessmentOverview: want.assessmentOverview,
          officialDocumentUrl: want.officialDocumentUrl,
          gradeSchemeId: version.gradeSchemeId,
          sourceNotes: want.sourceNotes,
        });
      }
      if (differences.length > 0 || frozen.length > 0) {
        outcomes.push({
          path: model.path,
          outcome: "conflict",
          syllabusId: version.id,
          message: `The version is ${version.status} and its structure is frozen (§26): ${[...frozen.map((f) => `${f} differs`), ...differences].slice(0, 8).join("; ")}${differences.length > 8 ? "; …" : ""}. Create a new version file for the changed syllabus.`,
        });
      } else if (editorial.length > 0) {
        outcomes.push(
          ctx.approver
            ? { path: model.path, outcome: "updated", syllabusId: version.id, message: `wording corrected: ${editorial.join(", ")}` }
            : { path: model.path, outcome: "conflict", syllabusId: version.id, message: `Published wording differs (${editorial.join(", ")}): re-run with --approver <admin> to correct it.` },
        );
      } else {
        outcomes.push({ path: model.path, outcome: "unchanged", syllabusId: version.id });
      }
    }
    return { entry: await loadIndex(db, model, version.id, subject.id, version.status), outcomes };
  } catch (error) {
    outcomes.push({ path: model.path, outcome: "error", message: describeError(error) });
    const version = await db.syllabus.findUnique({ where: { subjectId_versionLabel: { subjectId: subject.id, versionLabel: model.ref.versionLabel } }, select: { id: true, status: true } });
    return { entry: version ? await loadIndex(db, model, version.id, subject.id, version.status) : null, outcomes };
  }
}

