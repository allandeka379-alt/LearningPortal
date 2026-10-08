import "server-only";
import { randomUUID } from "node:crypto";
import type { CopyrightStatus, Prisma, SyllabusStatus } from "@/generated/prisma/client";
import { dateColumnFromLocalDate, localDateFromDateColumn, type LocalDate } from "@/lib/dates";
import type { Tx } from "@/server/lib/db-context";
import { AppError } from "@/server/lib/errors";
import { assertCurriculumAdmin, assertCurriculumDraft, assertCurriculumRead, curriculumAccess, type CurriculumActor } from "./access";
import { ARCHIVE_FROM, MAKE_CURRENT_FROM, planTopicClone, publicCurriculumPath, suggestVersionLabel, syllabusPublishProblems, type Problems } from "./core";
import {
  componentInputSchema,
  componentUpdateSchema,
  routeInputSchema,
  routeUpdateSchema,
  syllabusCreateSchema,
  syllabusEditorialSchema,
  syllabusIdSchema,
  syllabusListFilterSchema,
  syllabusMakeCurrentSchema,
  syllabusPublishSchema,
  syllabusUpdateSchema,
} from "./schemas";
import {
  ADMIN_PAGE_SIZE,
  auditCurriculum,
  CURRICULUM_AUDIT,
  cursorArgs,
  diffFields,
  enqueueCurriculumReindex,
  fieldError,
  fourEyesOn,
  inTransaction,
  invalidateCurriculumCaches,
  mapDbError,
  parseInput,
  readAll,
  readClient,
  STAFF_NAME_SELECT,
  staffName,
  throwIfProblems,
  toPage,
  today,
  type Page,
  type ServiceContext,
} from "./shared";

/**
 * Syllabus versions (§26, CLAUDE.md rule 8, ARCHITECTURE §4.3): one `Syllabus` row per version.
 *
 *   DRAFT ──publish──▶ CURRENT (or UPCOMING) ──newer version becomes current──▶ SUPERSEDED ──▶ ARCHIVED
 *
 * - "Create new version" clones a version's papers (components), award routes, topic tree and learning objectives into
 *   a DRAFT with lineage (`supersedesId`, `Topic.originTopicId`, `LearningObjective.originObjectiveId`), so content tags
 *   can be carried over (./retag). Copyright must be cleared again for the new version (§27).
 * - Only DRAFTs change structure (the database freezes published versions; the UI is read-only for them). Published
 *   versions accept editorial corrections (title, overviews, links, end date, grade scheme) from admins.
 * - Publishing needs ADMIN (`curriculum.manage` = all), cleared copyright, a source and a valid effective window; with
 *   `app.four_eyes = 'on'` the publisher must not be the version's creator. Becoming CURRENT moves the previous CURRENT
 *   version to SUPERSEDED (still examined, pinned students keep it) or, if asked, ARCHIVED, in one transaction.
 * - Students stay pinned to their version (`SubjectEnrollment.syllabusId`); nothing here moves enrolments.
 */

// =====================================================================================================================
// Reads
// =====================================================================================================================

const SUBJECT_CHAIN_SELECT = {
  select: {
    id: true,
    name: true,
    slug: true,
    qualificationId: true,
    qualification: { select: { id: true, slug: true, shortName: true, examBoard: { select: { slug: true, shortName: true } } } },
  },
} as const;

const VERSION_LIST_SELECT = {
  id: true,
  subjectId: true,
  code: true,
  title: true,
  versionLabel: true,
  status: true,
  effectiveFrom: true,
  effectiveTo: true,
  copyrightStatus: true,
  sourceId: true,
  publishedAt: true,
  isDemo: true,
  updatedAt: true,
  subject: SUBJECT_CHAIN_SELECT,
  _count: { select: { topics: true, enrollments: true } },
} as const satisfies Prisma.SyllabusSelect;

type VersionListPayload = Prisma.SyllabusGetPayload<{ select: typeof VERSION_LIST_SELECT }>;
export type SyllabusVersionRow = Omit<VersionListPayload, "effectiveFrom" | "effectiveTo"> & { effectiveFrom: LocalDate; effectiveTo: LocalDate | null };

function withDates<T extends { effectiveFrom: Date; effectiveTo: Date | null }>(row: T): Omit<T, "effectiveFrom" | "effectiveTo"> & { effectiveFrom: LocalDate; effectiveTo: LocalDate | null } {
  return { ...row, effectiveFrom: localDateFromDateColumn(row.effectiveFrom), effectiveTo: row.effectiveTo ? localDateFromDateColumn(row.effectiveTo) : null };
}

/** All versions (any status) with filters, for /admin/syllabuses. */
export async function listSyllabusVersions(actor: CurriculumActor, filter: unknown = {}, context: ServiceContext = {}): Promise<Page<SyllabusVersionRow>> {
  assertCurriculumRead(actor);
  const f = parseInput(syllabusListFilterSchema, filter);
  const rows = await readClient(context).syllabus.findMany({
    where: {
      ...(f.subjectId ? { subjectId: f.subjectId } : {}),
      ...(f.qualificationId ? { subject: { qualificationId: f.qualificationId } } : {}),
      ...(f.status ? { status: f.status } : {}),
      ...(f.q
        ? {
            OR: [
              { title: { contains: f.q, mode: "insensitive" } },
              { versionLabel: { contains: f.q, mode: "insensitive" } },
              { code: { contains: f.q, mode: "insensitive" } },
              { subject: { name: { contains: f.q, mode: "insensitive" } } },
            ],
          }
        : {}),
    },
    select: VERSION_LIST_SELECT,
    orderBy: [{ subjectId: "asc" }, { effectiveFrom: "desc" }, { id: "asc" }],
    take: ADMIN_PAGE_SIZE + 1,
    ...cursorArgs(f.cursor),
  });
  const page = toPage(rows);
  return { ...page, items: page.items.map(withDates) };
}

const VERSION_DETAIL_SELECT = {
  id: true,
  subjectId: true,
  code: true,
  title: true,
  versionLabel: true,
  status: true,
  effectiveFrom: true,
  effectiveTo: true,
  supersedesId: true,
  overview: true,
  assessmentOverview: true,
  officialDocumentUrl: true,
  gradeSchemeId: true,
  sourceId: true,
  copyrightStatus: true,
  sourceNotes: true,
  isDemo: true,
  createdById: true,
  publishedAt: true,
  archivedAt: true,
  createdAt: true,
  updatedAt: true,
  subject: SUBJECT_CHAIN_SELECT,
  source: { select: { id: true, name: true, type: true } },
  gradeScheme: { select: { id: true, name: true, version: true } },
  createdBy: STAFF_NAME_SELECT,
  publishedBy: STAFF_NAME_SELECT,
  supersedes: { select: { id: true, versionLabel: true, status: true } },
  supersededBy: { select: { id: true, versionLabel: true, status: true }, orderBy: { createdAt: "asc" as const }, take: 20 },
  components: {
    select: {
      id: true,
      code: true,
      name: true,
      kind: true,
      description: true,
      durationMinutes: true,
      maxMarks: true,
      weightingPercent: true,
      calculatorAllowed: true,
      sortOrder: true,
    },
    orderBy: [{ sortOrder: "asc" as const }, { code: "asc" as const }],
  },
  routes: {
    select: {
      id: true,
      code: true,
      name: true,
      description: true,
      gradeSchemeId: true,
      isDefault: true,
      sortOrder: true,
      componentLinks: { select: { componentId: true, isCompulsory: true, choiceGroup: true } },
    },
    orderBy: [{ sortOrder: "asc" as const }, { code: "asc" as const }],
  },
  _count: { select: { topics: true, enrollments: true, questionTopics: true } },
} as const satisfies Prisma.SyllabusSelect;

type VersionDetailPayload = Prisma.SyllabusGetPayload<{ select: typeof VERSION_DETAIL_SELECT }>;

export interface SyllabusVersionDetail
  extends Omit<VersionDetailPayload, "effectiveFrom" | "effectiveTo" | "createdBy" | "publishedBy" | "components"> {
  effectiveFrom: LocalDate;
  effectiveTo: LocalDate | null;
  createdByName: string | null;
  publishedByName: string | null;
  components: (Omit<VersionDetailPayload["components"][number], "weightingPercent"> & { weightingPercent: number | null })[];
  objectiveCount: number;
  publicPath: string;
  /** Other versions of the subject (clone sources, lineage navigation). */
  siblings: { id: string; versionLabel: string; status: SyllabusStatus }[];
  /** Grade schemes of the subject's qualification (for the version / route selects). */
  gradeSchemes: { id: string; name: string; version: number; isActive: boolean }[];
  /** What the current viewer may do. */
  permissions: {
    canEditStructure: boolean;
    canCorrect: boolean;
    canPublish: boolean;
    canMakeCurrent: boolean;
    canArchive: boolean;
    canDelete: boolean;
    canCreateVersion: boolean;
  };
  /** Four-eyes: this viewer created the draft and four-eyes is on, so someone else must publish it. */
  publishBlockedByFourEyes: boolean;
  /** Publish checklist for the CURRENT mode (field → problems); empty when publishable. */
  publishProblems: Problems;
}

export async function getSyllabusVersion(actor: CurriculumActor, id: string, context: ServiceContext = {}): Promise<SyllabusVersionDetail> {
  assertCurriculumRead(actor);
  const client = readClient(context);
  const row = await client.syllabus.findUnique({ where: { id }, select: VERSION_DETAIL_SELECT });
  if (!row) throw AppError.notFound("Syllabus version not found.");
  const [objectiveCount, siblings, gradeSchemes, fourEyes] = await readAll(context, [
    () => client.learningObjective.count({ where: { topic: { syllabusId: id } } }),
    () => client.syllabus.findMany({
      where: { subjectId: row.subjectId, id: { not: id } },
      select: { id: true, versionLabel: true, status: true },
      orderBy: [{ effectiveFrom: "desc" }, { createdAt: "desc" }],
      take: 50,
    }),
    () => client.gradeScheme.findMany({
      where: { qualificationId: row.subject.qualificationId },
      select: { id: true, name: true, version: true, isActive: true },
      orderBy: [{ isActive: "desc" }, { name: "asc" }, { version: "desc" }],
      take: 100,
    }),
    () => fourEyesOn(client),
  ]);
  const access = curriculumAccess(actor);
  const isDraft = row.status === "DRAFT";
  const { createdBy, publishedBy, components, ...rest } = row;
  const dated = withDates(rest);
  return {
    ...dated,
    createdByName: staffName(createdBy),
    publishedByName: staffName(publishedBy),
    components: components.map((component) => ({
      ...component,
      weightingPercent: component.weightingPercent === null ? null : Number(component.weightingPercent),
    })),
    objectiveCount,
    publicPath: publicCurriculumPath(row.subject.qualification.examBoard.slug, row.subject.qualification.slug, row.subject.slug),
    siblings,
    gradeSchemes,
    permissions: {
      canEditStructure: isDraft && access.canDraft,
      canCorrect: !isDraft && access.canAdmin,
      canPublish: isDraft && access.canAdmin,
      canMakeCurrent: MAKE_CURRENT_FROM.includes(row.status) && access.canAdmin,
      canArchive: ARCHIVE_FROM.includes(row.status) && access.canAdmin,
      canDelete: isDraft && access.canDraft,
      canCreateVersion: access.canDraft,
    },
    publishBlockedByFourEyes: isDraft && fourEyes && row.createdById === actor.userId,
    publishProblems: isDraft
      ? syllabusPublishProblems({
          status: row.status,
          copyrightStatus: row.copyrightStatus,
          sourceId: row.sourceId,
          effectiveFrom: dated.effectiveFrom,
          effectiveTo: dated.effectiveTo,
          topicCount: row._count.topics,
          mode: "CURRENT",
          today: today(),
        })
      : {},
  };
}

export interface NewVersionDefaults {
  subject: { id: string; name: string; qualificationShortName: string; boardShortName: string };
  versions: { id: string; versionLabel: string; title: string; status: SyllabusStatus; code: string | null; effectiveTo: LocalDate | null }[];
  /** The version to clone by default (CURRENT, else the newest). */
  defaultCloneFromId: string | null;
  suggestedLabel: string;
  suggestedTitle: string;
  suggestedCode: string | null;
}

/** Prefills the "Create new version" form for a subject. */
export async function getNewVersionDefaults(actor: CurriculumActor, subjectId: string, context: ServiceContext = {}): Promise<NewVersionDefaults> {
  assertCurriculumDraft(actor);
  const client = readClient(context);
  const subject = await client.subject.findUnique({
    where: { id: subjectId },
    select: { id: true, name: true, officialCode: true, qualification: { select: { shortName: true, examBoard: { select: { shortName: true } } } } },
  });
  if (!subject) throw AppError.notFound("Subject not found.");
  const versions = await client.syllabus.findMany({
    where: { subjectId },
    select: { id: true, versionLabel: true, title: true, status: true, code: true, effectiveTo: true },
    orderBy: [{ effectiveFrom: "desc" }, { createdAt: "desc" }],
    take: 50,
  });
  const base = versions.find((version) => version.status === "CURRENT") ?? versions[0] ?? null;
  return {
    subject: { id: subject.id, name: subject.name, qualificationShortName: subject.qualification.shortName, boardShortName: subject.qualification.examBoard.shortName },
    versions: versions.map((version) => ({ ...version, effectiveTo: version.effectiveTo ? localDateFromDateColumn(version.effectiveTo) : null })),
    defaultCloneFromId: base?.id ?? null,
    suggestedLabel: suggestVersionLabel(versions.map((version) => version.versionLabel), base?.versionLabel ?? ""),
    suggestedTitle: base?.title ?? `${subject.qualification.examBoard.shortName} ${subject.qualification.shortName} ${subject.name}`,
    suggestedCode: base?.code ?? subject.officialCode,
  };
}

// =====================================================================================================================
// Create (empty or cloned) and edit drafts
// =====================================================================================================================

const VERSION_UNIQUE = { versionLabel: "This subject already has a version with this label." };

/** Copies papers, routes, topic tree (with `originTopicId`) and objectives (with `originObjectiveId`) of `fromId`. */
async function cloneStructure(tx: Tx, fromId: string, toId: string): Promise<{ topics: number; objectives: number; components: number; routes: number }> {
  // One connection: sequential reads.
  const components = await tx.syllabusComponent.findMany({ where: { syllabusId: fromId } });
  const routes = await tx.syllabusRoute.findMany({ where: { syllabusId: fromId }, include: { componentLinks: true } });
  const topics = await tx.topic.findMany({
    where: { syllabusId: fromId },
    include: { componentLinks: { select: { componentId: true } } },
    orderBy: [{ depth: "asc" }, { sortOrder: "asc" }],
  });

  const componentIds = new Map<string, string>();
  if (components.length > 0) {
    await tx.syllabusComponent.createMany({
      data: components.map((component) => {
        const newId = randomUUID();
        componentIds.set(component.id, newId);
        return {
          id: newId,
          syllabusId: toId,
          code: component.code,
          name: component.name,
          kind: component.kind,
          description: component.description,
          durationMinutes: component.durationMinutes,
          maxMarks: component.maxMarks,
          weightingPercent: component.weightingPercent,
          calculatorAllowed: component.calculatorAllowed,
          sortOrder: component.sortOrder,
        };
      }),
    });
  }

  if (routes.length > 0) {
    const routeIds = new Map<string, string>();
    await tx.syllabusRoute.createMany({
      data: routes.map((route) => {
        const newId = randomUUID();
        routeIds.set(route.id, newId);
        return {
          id: newId,
          syllabusId: toId,
          code: route.code,
          name: route.name,
          description: route.description,
          gradeSchemeId: route.gradeSchemeId,
          isDefault: route.isDefault,
          sortOrder: route.sortOrder,
        };
      }),
    });
    const links = routes.flatMap((route) =>
      route.componentLinks.map((link) => ({
        routeId: routeIds.get(route.id) as string,
        componentId: componentIds.get(link.componentId) as string,
        isCompulsory: link.isCompulsory,
        choiceGroup: link.choiceGroup,
      })),
    );
    if (links.length > 0) await tx.syllabusRouteComponent.createMany({ data: links });
  }

  const planned = planTopicClone(topics, randomUUID);
  const bySource = new Map(topics.map((topic) => [topic.id, topic]));
  if (planned.length > 0) {
    await tx.topic.createMany({
      data: planned.map((ids) => {
        const source = bySource.get(ids.sourceId) as (typeof topics)[number];
        return {
          id: ids.id,
          syllabusId: toId,
          parentId: ids.parentId,
          originTopicId: source.id,
          kind: source.kind,
          depth: ids.depth,
          path: ids.path,
          sortOrder: source.sortOrder,
          code: source.code,
          name: source.name,
          slug: source.slug,
          description: source.description,
          publicSummary: source.publicSummary,
          metaTitle: source.metaTitle,
          metaDescription: source.metaDescription,
          isPublic: source.isPublic,
          isOptional: source.isOptional,
          optionGroup: source.optionGroup,
          examYearFrom: source.examYearFrom,
          examYearTo: source.examYearTo,
          estimatedStudyMinutes: source.estimatedStudyMinutes,
        };
      }),
    });
    const topicLinks = planned.flatMap((ids) =>
      (bySource.get(ids.sourceId)?.componentLinks ?? [])
        .map((link) => componentIds.get(link.componentId))
        .filter((componentId): componentId is string => componentId !== undefined)
        .map((componentId) => ({ topicId: ids.id, componentId })),
    );
    if (topicLinks.length > 0) await tx.topicComponent.createMany({ data: topicLinks });
  }

  const newTopicIds = new Map(planned.map((ids) => [ids.sourceId, ids.id]));
  const objectives = await tx.learningObjective.findMany({ where: { topic: { syllabusId: fromId } }, orderBy: [{ topicId: "asc" }, { sortOrder: "asc" }] });
  if (objectives.length > 0) {
    await tx.learningObjective.createMany({
      data: objectives.map((objective) => ({
        id: randomUUID(),
        topicId: newTopicIds.get(objective.topicId) as string,
        originObjectiveId: objective.id,
        code: objective.code,
        statement: objective.statement,
        cognitiveSkill: objective.cognitiveSkill,
        sortOrder: objective.sortOrder,
      })),
    });
  }
  return { topics: planned.length, objectives: objectives.length, components: components.length, routes: routes.length };
}

/**
 * Creates a DRAFT version. With `cloneFromId` (a version of the same subject, any status) its structure is cloned with
 * lineage and `supersedesId` points at it; copyright starts UNVERIFIED again (each version's source is cleared on its
 * own, §27) while the source link and notes are carried over for convenience.
 */
export async function createSyllabusVersion(
  actor: CurriculumActor,
  raw: unknown,
  context: ServiceContext = {},
): Promise<{ id: string; cloned: { topics: number; objectives: number; components: number; routes: number } | null }> {
  assertCurriculumDraft(actor);
  const input = parseInput(syllabusCreateSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const subject = await tx.subject.findUnique({ where: { id: input.subjectId }, select: { id: true } });
      if (!subject) throw fieldError("subjectId", "Choose a subject.");
      const from = input.cloneFromId
        ? await tx.syllabus.findUnique({
            where: { id: input.cloneFromId },
            select: { id: true, subjectId: true, overview: true, assessmentOverview: true, officialDocumentUrl: true, gradeSchemeId: true, sourceId: true, sourceNotes: true },
          })
        : null;
      if (input.cloneFromId && (!from || from.subjectId !== input.subjectId)) throw fieldError("cloneFromId", "Choose a version of this subject to copy.");
      const created = await tx.syllabus.create({
        data: {
          subjectId: input.subjectId,
          versionLabel: input.versionLabel,
          title: input.title,
          code: input.code,
          status: "DRAFT",
          effectiveFrom: dateColumnFromLocalDate(input.effectiveFrom),
          effectiveTo: input.effectiveTo ? dateColumnFromLocalDate(input.effectiveTo) : null,
          supersedesId: from?.id ?? null,
          overview: from?.overview ?? null,
          assessmentOverview: from?.assessmentOverview ?? null,
          officialDocumentUrl: from?.officialDocumentUrl ?? null,
          gradeSchemeId: from?.gradeSchemeId ?? null,
          sourceId: from?.sourceId ?? null,
          sourceNotes: from?.sourceNotes ?? null,
          copyrightStatus: "UNVERIFIED",
          createdById: actor.userId,
        },
        select: { id: true },
      });
      const cloned = from ? await cloneStructure(tx, from.id, created.id) : null;
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: from ? "curriculum.syllabus.clone" : "curriculum.syllabus.create",
        entityType: "Syllabus",
        entityId: created.id,
        after: { subjectId: input.subjectId, versionLabel: input.versionLabel, effectiveFrom: input.effectiveFrom, effectiveTo: input.effectiveTo },
        metadata: from ? { clonedFromId: from.id, ...cloned } : {},
      });
      return { id: created.id, cloned };
    });
  } catch (error) {
    mapDbError(error, VERSION_UNIQUE);
  }
}

async function loadVersionForChange(tx: Tx, id: string) {
  const rows = await tx.$queryRaw<{ id: string }[]>`SELECT "id" FROM "Syllabus" WHERE "id" = ${id}::uuid FOR UPDATE`;
  if (rows.length === 0) throw AppError.notFound("Syllabus version not found.");
  return tx.syllabus.findUniqueOrThrow({
    where: { id },
    include: { subject: { select: { qualificationId: true } } },
  });
}

async function assertGradeSchemeForQualification(tx: Tx, gradeSchemeId: string | null, qualificationId: string, field = "gradeSchemeId"): Promise<void> {
  if (gradeSchemeId === null) return;
  const scheme = await tx.gradeScheme.findUnique({ where: { id: gradeSchemeId }, select: { qualificationId: true } });
  if (!scheme || scheme.qualificationId !== qualificationId) throw fieldError(field, "Choose a grade scheme of this qualification.");
}

/** Edits a DRAFT version's metadata (identity, dates, overviews, provenance). */
export async function updateDraftSyllabusVersion(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string }> {
  assertCurriculumDraft(actor);
  const { id, ...input } = parseInput(syllabusUpdateSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const before = await loadVersionForChange(tx, id);
      if (before.status !== "DRAFT") throw AppError.conflict("This version is published: only its wording can be corrected. Create a new version to change it.");
      await assertGradeSchemeForQualification(tx, input.gradeSchemeId, before.subject.qualificationId);
      if (input.sourceId) {
        const source = await tx.contentSource.findUnique({ where: { id: input.sourceId }, select: { id: true } });
        if (!source) throw fieldError("sourceId", "Choose a source from the list.");
      }
      if (input.copyrightStatus === "LICENSED" && input.sourceId === null) {
        throw fieldError("sourceId", "Licensed structures must name the licence source.");
      }
      const data = {
        ...input,
        effectiveFrom: dateColumnFromLocalDate(input.effectiveFrom),
        effectiveTo: input.effectiveTo ? dateColumnFromLocalDate(input.effectiveTo) : null,
      };
      await tx.syllabus.update({ where: { id }, data });
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: "curriculum.syllabus.update",
        entityType: "Syllabus",
        entityId: id,
        ...diffFields(before, data),
      });
      return { id };
    });
  } catch (error) {
    mapDbError(error, VERSION_UNIQUE);
  }
}

/** Editorial corrections to a PUBLISHED version (ADMIN). Identity and structure stay frozen (database trigger). */
export async function correctPublishedSyllabusVersion(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string }> {
  assertCurriculumAdmin(actor, "Only an admin can correct a published version.");
  const { id, ...input } = parseInput(syllabusEditorialSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const before = await loadVersionForChange(tx, id);
      if (before.status === "DRAFT") throw AppError.conflict("This version is still a draft: edit it with the draft form.");
      await assertGradeSchemeForQualification(tx, input.gradeSchemeId, before.subject.qualificationId);
      const effectiveTo = input.effectiveTo ? dateColumnFromLocalDate(input.effectiveTo) : null;
      if (effectiveTo !== null && effectiveTo <= before.effectiveFrom) throw fieldError("effectiveTo", "The end date must be after the start date.");
      const data = { ...input, effectiveTo };
      await tx.syllabus.update({ where: { id }, data });
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: "curriculum.syllabus.correct",
        entityType: "Syllabus",
        entityId: id,
        ...diffFields(before, data),
      });
      return { id };
    });
  } catch (error) {
    mapDbError(error);
  } finally {
    invalidateCurriculumCaches();
  }
}

// =====================================================================================================================
// Publish, switch, archive, delete
// =====================================================================================================================

async function retirePreviousCurrent(tx: Tx, subjectId: string, exceptId: string, archive: boolean): Promise<{ id: string; status: SyllabusStatus } | null> {
  const previous = await tx.syllabus.findFirst({ where: { subjectId, status: "CURRENT", id: { not: exceptId } }, select: { id: true } });
  if (!previous) return null;
  const status: SyllabusStatus = archive ? "ARCHIVED" : "SUPERSEDED";
  await tx.syllabus.update({ where: { id: previous.id }, data: archive ? { status, archivedAt: new Date() } : { status } });
  return { id: previous.id, status };
}

/**
 * Publishes a DRAFT (ADMIN). `mode` CURRENT makes it the subject's default for new enrolments (previous CURRENT →
 * SUPERSEDED, or ARCHIVED with `archivePrevious`); UPCOMING publishes a version that starts in the future.
 *
 * @throws FORBIDDEN (not an admin; four-eyes), CONFLICT (not a draft), VALIDATION (publish checklist)
 */
export async function publishSyllabusVersion(
  actor: CurriculumActor,
  raw: unknown,
  context: ServiceContext = {},
): Promise<{ id: string; status: SyllabusStatus; previous: { id: string; status: SyllabusStatus } | null }> {
  assertCurriculumAdmin(actor, "Only an admin can publish a syllabus version.");
  const input = parseInput(syllabusPublishSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const version = await loadVersionForChange(tx, input.id);
      if (version.status !== "DRAFT") throw AppError.conflict("Only draft versions can be published.");
      if (version.createdById === actor.userId && (await fourEyesOn(tx))) {
        throw AppError.forbidden("Another admin must publish this version: you created it (four-eyes rule).");
      }
      const topicCount = await tx.topic.count({ where: { syllabusId: version.id } });
      throwIfProblems(
        syllabusPublishProblems({
          status: version.status,
          copyrightStatus: version.copyrightStatus,
          sourceId: version.sourceId,
          effectiveFrom: localDateFromDateColumn(version.effectiveFrom),
          effectiveTo: version.effectiveTo ? localDateFromDateColumn(version.effectiveTo) : null,
          topicCount,
          mode: input.mode,
          today: today(),
        }),
        "This version is not ready to publish yet.",
      );
      const previous = input.mode === "CURRENT" ? await retirePreviousCurrent(tx, version.subjectId, version.id, input.archivePrevious) : null;
      await tx.syllabus.update({
        where: { id: version.id },
        data: { status: input.mode, publishedAt: new Date(), publishedById: actor.userId },
      });
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.SYLLABUS_PUBLISH,
        operation: "curriculum.syllabus.publish",
        entityType: "Syllabus",
        entityId: version.id,
        before: { status: "DRAFT" },
        after: { status: input.mode },
        metadata: { subjectId: version.subjectId, versionLabel: version.versionLabel, topicCount, previousId: previous?.id ?? null, previousStatus: previous?.status ?? null },
      });
      if (input.mode === "CURRENT") await enqueueCurriculumReindex(tx, ["SUBJECT", "TOPIC", "LESSON", "QUESTION", "FLASHCARD"]);
      return { id: version.id, status: input.mode, previous };
    });
  } catch (error) {
    mapDbError(error, { subjectId: "Another version of this subject became current at the same time. Refresh and try again." });
  } finally {
    invalidateCurriculumCaches();
  }
}

/** Makes an UPCOMING (or SUPERSEDED) version CURRENT (ADMIN); the previous CURRENT becomes SUPERSEDED or ARCHIVED. */
export async function makeSyllabusVersionCurrent(
  actor: CurriculumActor,
  raw: unknown,
  context: ServiceContext = {},
): Promise<{ id: string; previous: { id: string; status: SyllabusStatus } | null }> {
  assertCurriculumAdmin(actor, "Only an admin can switch the current version.");
  const input = parseInput(syllabusMakeCurrentSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const version = await loadVersionForChange(tx, input.id);
      if (!MAKE_CURRENT_FROM.includes(version.status)) {
        throw AppError.conflict(version.status === "CURRENT" ? "This version is already current." : "Only upcoming or superseded versions can become current.");
      }
      const previous = await retirePreviousCurrent(tx, version.subjectId, version.id, input.archivePrevious);
      await tx.syllabus.update({ where: { id: version.id }, data: { status: "CURRENT" } });
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.SYLLABUS_PUBLISH,
        operation: "curriculum.syllabus.make_current",
        entityType: "Syllabus",
        entityId: version.id,
        before: { status: version.status },
        after: { status: "CURRENT" },
        metadata: { subjectId: version.subjectId, previousId: previous?.id ?? null, previousStatus: previous?.status ?? null },
      });
      await enqueueCurriculumReindex(tx, ["SUBJECT", "TOPIC", "LESSON", "QUESTION", "FLASHCARD"]);
      return { id: version.id, previous };
    });
  } catch (error) {
    mapDbError(error, { subjectId: "Another version of this subject became current at the same time. Refresh and try again." });
  } finally {
    invalidateCurriculumCaches();
  }
}

/** Archives an UPCOMING or SUPERSEDED version (ADMIN): no new enrolments; pinned students keep their content. */
export async function archiveSyllabusVersion(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string; pinnedEnrollments: number }> {
  assertCurriculumAdmin(actor, "Only an admin can archive a syllabus version.");
  const { id } = parseInput(syllabusIdSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const version = await loadVersionForChange(tx, id);
      if (version.status === "CURRENT") throw AppError.conflict("Make another version current before archiving this one.");
      if (!ARCHIVE_FROM.includes(version.status)) throw AppError.conflict("Only upcoming or superseded versions can be archived.");
      const pinnedEnrollments = await tx.subjectEnrollment.count({ where: { syllabusId: id } });
      await tx.syllabus.update({ where: { id }, data: { status: "ARCHIVED", archivedAt: new Date() } });
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.SYLLABUS_ARCHIVE,
        operation: "curriculum.syllabus.archive",
        entityType: "Syllabus",
        entityId: id,
        before: { status: version.status },
        after: { status: "ARCHIVED" },
        metadata: { subjectId: version.subjectId, pinnedEnrollments },
      });
      return { id, pinnedEnrollments };
    });
  } catch (error) {
    mapDbError(error);
  } finally {
    invalidateCurriculumCaches();
  }
}

/** Deletes a DRAFT version and its structure. Refused while content is tagged to it (re-tag or untag first). */
export async function deleteDraftSyllabusVersion(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ subjectId: string }> {
  assertCurriculumDraft(actor);
  const { id } = parseInput(syllabusIdSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const version = await loadVersionForChange(tx, id);
      if (version.status !== "DRAFT") throw AppError.conflict("Published versions are never deleted. Archive it instead.");
      const questionTags = await tx.questionTopic.count({ where: { syllabusId: id } });
      const lessonTags = await tx.lessonTopic.count({ where: { topic: { syllabusId: id } } });
      const flashcardTags = await tx.flashcardTopic.count({ where: { topic: { syllabusId: id } } });
      const derived = await tx.syllabus.count({ where: { supersedesId: id } });
      if (questionTags + lessonTags + flashcardTags > 0) {
        throw AppError.conflict(
          `Content is tagged to this draft (${questionTags} question, ${lessonTags} lesson and ${flashcardTags} flashcard tags). Remove those tags before deleting it.`,
        );
      }
      if (derived > 0) throw AppError.conflict("Another version was copied from this draft, so it is kept for lineage.");
      const topicCount = await tx.topic.count({ where: { syllabusId: id } });
      await tx.syllabus.delete({ where: { id } });
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.SYLLABUS_ARCHIVE,
        operation: "curriculum.syllabus.delete_draft",
        entityType: "Syllabus",
        entityId: id,
        before: { subjectId: version.subjectId, versionLabel: version.versionLabel, title: version.title, topicCount },
      });
      return { subjectId: version.subjectId };
    });
  } catch (error) {
    mapDbError(error);
  }
}

// =====================================================================================================================
// Papers (components) and award routes (DRAFT only)
// =====================================================================================================================

async function draftVersionOf(tx: Tx, syllabusId: string): Promise<{ id: string; qualificationId: string }> {
  const version = await loadVersionForChange(tx, syllabusId);
  if (version.status !== "DRAFT") throw AppError.conflict("This version is published, so its papers and routes are frozen. Create a new version instead.");
  return { id: version.id, qualificationId: version.subject.qualificationId };
}

const COMPONENT_UNIQUE = { code: "Another paper of this version already uses this code." };

export async function addComponent(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string }> {
  assertCurriculumDraft(actor);
  const input = parseInput(componentInputSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      await draftVersionOf(tx, input.syllabusId);
      const row = await tx.syllabusComponent.create({ data: input, select: { id: true } });
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: "curriculum.component.create",
        entityType: "SyllabusComponent",
        entityId: row.id,
        after: { syllabusId: input.syllabusId, code: input.code, name: input.name, kind: input.kind },
      });
      return row;
    });
  } catch (error) {
    mapDbError(error, COMPONENT_UNIQUE);
  }
}

export async function updateComponent(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string }> {
  assertCurriculumDraft(actor);
  const { id, ...input } = parseInput(componentUpdateSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const before = await tx.syllabusComponent.findUnique({ where: { id } });
      if (!before) throw AppError.notFound("Paper not found.");
      await draftVersionOf(tx, before.syllabusId);
      await tx.syllabusComponent.update({ where: { id }, data: input });
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: "curriculum.component.update",
        entityType: "SyllabusComponent",
        entityId: id,
        ...diffFields({ ...before, weightingPercent: before.weightingPercent === null ? null : Number(before.weightingPercent) }, input),
      });
      return { id };
    });
  } catch (error) {
    mapDbError(error, COMPONENT_UNIQUE);
  }
}

export async function deleteComponent(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ syllabusId: string }> {
  assertCurriculumDraft(actor);
  const { id } = parseInput(syllabusIdSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const before = await tx.syllabusComponent.findUnique({ where: { id } });
      if (!before) throw AppError.notFound("Paper not found.");
      await draftVersionOf(tx, before.syllabusId);
      await tx.syllabusComponent.delete({ where: { id } });
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: "curriculum.component.delete",
        entityType: "SyllabusComponent",
        entityId: id,
        before: { syllabusId: before.syllabusId, code: before.code, name: before.name },
      });
      return { syllabusId: before.syllabusId };
    });
  } catch (error) {
    mapDbError(error);
  }
}

const ROUTE_UNIQUE = { code: "Another route of this version already uses this code." };

async function writeRoute(
  tx: Tx,
  routeId: string,
  syllabusId: string,
  components: { componentId: string; included: boolean; isCompulsory: boolean; choiceGroup: string | null }[],
  isDefault: boolean,
): Promise<number> {
  const included = components.filter((component) => component.included);
  if (included.length > 0) {
    const valid = await tx.syllabusComponent.count({ where: { syllabusId, id: { in: included.map((component) => component.componentId) } } });
    if (valid !== new Set(included.map((component) => component.componentId)).size) throw fieldError("components", "Choose papers of this version.");
  }
  if (isDefault) await tx.syllabusRoute.updateMany({ where: { syllabusId, isDefault: true, id: { not: routeId } }, data: { isDefault: false } });
  await tx.syllabusRouteComponent.deleteMany({ where: { routeId } });
  if (included.length > 0) {
    await tx.syllabusRouteComponent.createMany({
      data: included.map((component) => ({ routeId, componentId: component.componentId, isCompulsory: component.isCompulsory, choiceGroup: component.choiceGroup })),
      skipDuplicates: true,
    });
  }
  return included.length;
}

export async function addRoute(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string }> {
  assertCurriculumDraft(actor);
  const { components, ...input } = parseInput(routeInputSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const version = await draftVersionOf(tx, input.syllabusId);
      await assertGradeSchemeForQualification(tx, input.gradeSchemeId, version.qualificationId);
      const id = randomUUID();
      if (input.isDefault) await tx.syllabusRoute.updateMany({ where: { syllabusId: input.syllabusId, isDefault: true }, data: { isDefault: false } });
      await tx.syllabusRoute.create({ data: { id, ...input } });
      const papers = await writeRoute(tx, id, input.syllabusId, components, input.isDefault);
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: "curriculum.route.create",
        entityType: "SyllabusRoute",
        entityId: id,
        after: { syllabusId: input.syllabusId, code: input.code, name: input.name, isDefault: input.isDefault, papers },
      });
      return { id };
    });
  } catch (error) {
    mapDbError(error, ROUTE_UNIQUE);
  }
}

export async function updateRoute(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string }> {
  assertCurriculumDraft(actor);
  const { id, components, ...input } = parseInput(routeUpdateSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const before = await tx.syllabusRoute.findUnique({ where: { id } });
      if (!before) throw AppError.notFound("Route not found.");
      const version = await draftVersionOf(tx, before.syllabusId);
      await assertGradeSchemeForQualification(tx, input.gradeSchemeId, version.qualificationId);
      if (input.isDefault) await tx.syllabusRoute.updateMany({ where: { syllabusId: before.syllabusId, isDefault: true, id: { not: id } }, data: { isDefault: false } });
      await tx.syllabusRoute.update({ where: { id }, data: input });
      const papers = await writeRoute(tx, id, before.syllabusId, components, input.isDefault);
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: "curriculum.route.update",
        entityType: "SyllabusRoute",
        entityId: id,
        ...diffFields(before, input),
        metadata: { papers },
      });
      return { id };
    });
  } catch (error) {
    mapDbError(error, ROUTE_UNIQUE);
  }
}

export async function deleteRoute(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ syllabusId: string }> {
  assertCurriculumDraft(actor);
  const { id } = parseInput(syllabusIdSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const before = await tx.syllabusRoute.findUnique({ where: { id } });
      if (!before) throw AppError.notFound("Route not found.");
      await draftVersionOf(tx, before.syllabusId);
      await tx.syllabusRoute.delete({ where: { id } });
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: "curriculum.route.delete",
        entityType: "SyllabusRoute",
        entityId: id,
        before: { syllabusId: before.syllabusId, code: before.code, name: before.name },
      });
      return { syllabusId: before.syllabusId };
    });
  } catch (error) {
    mapDbError(error);
  }
}

/** Copyright statuses that clear a version for publishing (§27). */
export const CLEARED_COPYRIGHT_STATUSES: readonly CopyrightStatus[] = ["OWNED", "LICENSED", "PUBLIC_DOMAIN", "OPEN_LICENSE"];
