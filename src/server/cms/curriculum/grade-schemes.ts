import "server-only";
import type { Prisma } from "@/generated/prisma/client";
import type { DbClient } from "@/server/db";
import type { Tx } from "@/server/lib/db-context";
import { AppError } from "@/server/lib/errors";
import { assertCurriculumAdmin, assertCurriculumDraft, assertCurriculumRead, curriculumAccess, type CurriculumActor } from "./access";
import { gradeBandProblems, sameGradeBands, type GradeBandInput } from "./core";
import { gradeSchemeCreateSchema, gradeSchemeListFilterSchema, gradeSchemeUpdateSchema, type GradeSchemeCreateInput } from "./schemas";
import {
  ADMIN_PAGE_SIZE,
  auditCurriculum,
  CURRICULUM_AUDIT,
  cursorArgs,
  diffFields,
  fieldError,
  inTransaction,
  invalidateCurriculumCaches,
  mapDbError,
  parseInput,
  readAll,
  readClient,
  throwIfProblems,
  toPage,
  type Page,
  type ServiceContext,
} from "./shared";

/**
 * Grade schemes (§12): ordered bands that turn a percentage into a grade ESTIMATE, never an official grade (boards set
 * thresholds per series). Resolution: assessment → route → syllabus version → qualification default (isDefault).
 *
 * Versioning by immutability (§26, ARCHITECTURE §4.2): once any attempt's grade estimate used a scheme, the database
 * freezes its bands. Editing the bands of a used scheme therefore creates a NEW scheme row (version + 1) that takes
 * over the default flag and the syllabus/route links, while the old row is deactivated and keeps reproducing every
 * stored estimate. Published assessments keep the scheme they name (content is revisioned separately).
 *
 * Editors may draft inactive, non-default schemes; activating, making default or editing a live scheme needs ADMIN.
 */

const LIST_SELECT = {
  id: true,
  name: true,
  version: true,
  isDefault: true,
  isActive: true,
  isEstimate: true,
  isDemo: true,
  updatedAt: true,
  qualification: { select: { id: true, shortName: true, examBoard: { select: { shortName: true } } } },
  _count: { select: { bands: true, syllabi: true, routes: true, assessments: true } },
} as const satisfies Prisma.GradeSchemeSelect;
export type GradeSchemeRow = Prisma.GradeSchemeGetPayload<{ select: typeof LIST_SELECT }> & { used: boolean };

/** Which of `ids` have been used by at least one attempt (index-backed EXISTS, never a full count). */
async function usedSchemes(client: DbClient, ids: readonly string[]): Promise<Set<string>> {
  if (ids.length === 0) return new Set();
  const rows = await client.$queryRaw<{ id: string }[]>`
    SELECT s.id::text AS id FROM unnest(${[...ids]}::text[]) AS s(id)
     WHERE EXISTS (SELECT 1 FROM "AssessmentAttempt" a WHERE a."gradeSchemeId" = s.id::uuid)`;
  return new Set(rows.map((row) => row.id));
}

export async function listGradeSchemes(actor: CurriculumActor, filter: unknown = {}, context: ServiceContext = {}): Promise<Page<GradeSchemeRow>> {
  assertCurriculumRead(actor);
  const f = parseInput(gradeSchemeListFilterSchema, filter);
  const client = readClient(context);
  const rows = await client.gradeScheme.findMany({
    where: {
      ...(f.qualificationId ? { qualificationId: f.qualificationId } : {}),
      ...(f.active === "yes" ? { isActive: true } : f.active === "no" ? { isActive: false } : {}),
    },
    select: LIST_SELECT,
    orderBy: [{ qualificationId: "asc" }, { name: "asc" }, { version: "desc" }, { id: "asc" }],
    take: ADMIN_PAGE_SIZE + 1,
    ...cursorArgs(f.cursor),
  });
  const page = toPage(rows);
  const used = await usedSchemes(client, page.items.map((row) => row.id));
  return { ...page, items: page.items.map((row) => ({ ...row, used: used.has(row.id) })) };
}

const DETAIL_SELECT = {
  id: true,
  qualificationId: true,
  name: true,
  version: true,
  description: true,
  isDefault: true,
  isActive: true,
  isEstimate: true,
  disclaimer: true,
  sourceId: true,
  sourceNote: true,
  isDemo: true,
  createdAt: true,
  updatedAt: true,
  source: { select: { id: true, name: true } },
  qualification: { select: { id: true, name: true, shortName: true, examBoard: { select: { shortName: true } } } },
  bands: { select: { id: true, label: true, minPercent: true, sortOrder: true, isPass: true, description: true }, orderBy: { sortOrder: "asc" as const } },
  _count: { select: { syllabi: true, routes: true, assessments: true } },
} as const satisfies Prisma.GradeSchemeSelect;
type DetailPayload = Prisma.GradeSchemeGetPayload<{ select: typeof DETAIL_SELECT }>;

export interface GradeSchemeDetail extends Omit<DetailPayload, "bands"> {
  bands: { id: string; label: string; minPercent: number; sortOrder: number; isPass: boolean; description: string | null }[];
  /** Bands are frozen: any edit of them creates a new version. */
  used: boolean;
  /** Other versions (same qualification and name), newest first. */
  versions: { id: string; version: number; isActive: boolean; isDefault: boolean }[];
  canEdit: boolean;
  canEditLive: boolean;
}

export async function getGradeSchemeDetail(actor: CurriculumActor, id: string, context: ServiceContext = {}): Promise<GradeSchemeDetail> {
  assertCurriculumRead(actor);
  const client = readClient(context);
  const row = await client.gradeScheme.findUnique({ where: { id }, select: DETAIL_SELECT });
  if (!row) throw AppError.notFound("Grade scheme not found.");
  const [used, versions] = await readAll(context, [
    () => usedSchemes(client, [id]),
    () => client.gradeScheme.findMany({
      where: { qualificationId: row.qualificationId, name: row.name, id: { not: id } },
      select: { id: true, version: true, isActive: true, isDefault: true },
      orderBy: { version: "desc" },
      take: 50,
    }),
  ]);
  const access = curriculumAccess(actor);
  const live = row.isActive || row.isDefault;
  return {
    ...row,
    bands: row.bands.map((band) => ({ ...band, minPercent: Number(band.minPercent) })),
    used: used.has(id),
    versions,
    canEdit: live ? access.canAdmin : access.canDraft,
    canEditLive: access.canAdmin,
  };
}

function normalizedBands(bands: GradeSchemeCreateInput["bands"]): GradeBandInput[] {
  return bands.map((band) => ({ label: band.label.trim(), minPercent: band.minPercent, isPass: band.isPass, description: band.description }));
}

function assertLiveFlags(actor: CurriculumActor, input: { isActive: boolean; isDefault: boolean }, wasLive: boolean): void {
  if (input.isDefault && !input.isActive) throw fieldError("isActive", "The default scheme must be active.");
  if (wasLive || input.isActive || input.isDefault) {
    assertCurriculumAdmin(actor, "Only an admin can change a live grade scheme or make one live. Save it inactive for review.");
  } else {
    assertCurriculumDraft(actor);
  }
}

async function clearOtherDefaults(tx: Tx, qualificationId: string, exceptId: string | null): Promise<void> {
  await tx.gradeScheme.updateMany({ where: { qualificationId, isDefault: true, ...(exceptId ? { id: { not: exceptId } } : {}) }, data: { isDefault: false } });
}

async function nextVersion(tx: Tx, qualificationId: string, name: string): Promise<number> {
  const max = await tx.gradeScheme.aggregate({ where: { qualificationId, name }, _max: { version: true } });
  return (max._max.version ?? 0) + 1;
}

export async function createGradeScheme(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string; version: number }> {
  assertCurriculumRead(actor);
  const { bands: rawBands, ...input } = parseInput(gradeSchemeCreateSchema, raw);
  assertLiveFlags(actor, input, false);
  const bands = normalizedBands(rawBands);
  throwIfProblems(gradeBandProblems(bands));
  try {
    return await inTransaction(context, async (tx) => {
      const qualification = await tx.qualification.findUnique({ where: { id: input.qualificationId }, select: { id: true } });
      if (!qualification) throw fieldError("qualificationId", "Choose a qualification.");
      if (input.sourceId && !(await tx.contentSource.findUnique({ where: { id: input.sourceId }, select: { id: true } }))) {
        throw fieldError("sourceId", "Choose a source from the list.");
      }
      if (input.isDefault) await clearOtherDefaults(tx, input.qualificationId, null);
      const version = await nextVersion(tx, input.qualificationId, input.name);
      const row = await tx.gradeScheme.create({
        data: { ...input, version, bands: { create: bands.map((band, sortOrder) => ({ ...band, sortOrder })) } },
        select: { id: true },
      });
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: "curriculum.grade_scheme.create",
        entityType: "GradeScheme",
        entityId: row.id,
        after: { qualificationId: input.qualificationId, name: input.name, version, isDefault: input.isDefault, isActive: input.isActive, bands },
      });
      return { id: row.id, version };
    });
  } catch (error) {
    mapDbError(error);
  } finally {
    invalidateCurriculumCaches();
  }
}

export interface GradeSchemeUpdateResult {
  /** The scheme now holding the edits (a new row when `versioned`). */
  id: string;
  version: number;
  /** True when the bands were frozen and a new version was created. */
  versioned: boolean;
  previousId: string | null;
  /** Published assessments that still name the previous version (update them through their own editor). */
  assessmentsOnPrevious: number;
}

/**
 * Updates a scheme. Bands of an unused scheme are replaced in place; bands of a used scheme are never touched — a new
 * scheme row (version + 1) is created instead (see module docs).
 */
export async function updateGradeScheme(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<GradeSchemeUpdateResult> {
  assertCurriculumRead(actor);
  const { id, bands: rawBands, ...input } = parseInput(gradeSchemeUpdateSchema, raw);
  const bands = normalizedBands(rawBands);
  throwIfProblems(gradeBandProblems(bands));
  try {
    return await inTransaction(context, async (tx) => {
      const before = await tx.gradeScheme.findUnique({ where: { id }, include: { bands: { orderBy: { sortOrder: "asc" } } } });
      if (!before) throw AppError.notFound("Grade scheme not found.");
      assertLiveFlags(actor, input, before.isActive || before.isDefault);
      if (input.sourceId && !(await tx.contentSource.findUnique({ where: { id: input.sourceId }, select: { id: true } }))) {
        throw fieldError("sourceId", "Choose a source from the list.");
      }
      const previousBands = before.bands.map((band) => ({ label: band.label, minPercent: Number(band.minPercent), isPass: band.isPass, description: band.description }));
      const bandsChanged = !sameGradeBands(previousBands, bands);
      const used = bandsChanged && (await usedSchemes(tx, [id])).has(id);

      if (used) {
        // Frozen bands: retire this row and create version + 1 that takes over its role.
        await tx.gradeScheme.update({ where: { id }, data: { isActive: false, isDefault: false } });
        if (input.isDefault) await clearOtherDefaults(tx, before.qualificationId, null);
        const version = Math.max(before.version + 1, await nextVersion(tx, before.qualificationId, input.name));
        const created = await tx.gradeScheme.create({
          data: { ...input, qualificationId: before.qualificationId, version, bands: { create: bands.map((band, sortOrder) => ({ ...band, sortOrder })) } },
          select: { id: true },
        });
        await tx.syllabus.updateMany({ where: { gradeSchemeId: id }, data: { gradeSchemeId: created.id } });
        await tx.syllabusRoute.updateMany({ where: { gradeSchemeId: id }, data: { gradeSchemeId: created.id } });
        const assessmentsOnPrevious = await tx.assessment.count({ where: { gradeSchemeId: id } });
        await auditCurriculum(tx, actor, context, {
          action: CURRICULUM_AUDIT.GRADE_SCHEME_VERSION,
          operation: "curriculum.grade_scheme.new_version",
          entityType: "GradeScheme",
          entityId: created.id,
          before: { id, version: before.version, bands: previousBands },
          after: { id: created.id, version, bands, isDefault: input.isDefault, isActive: input.isActive },
          metadata: { previousId: id, assessmentsOnPrevious },
        });
        return { id: created.id, version, versioned: true, previousId: id, assessmentsOnPrevious };
      }

      if (input.isDefault) await clearOtherDefaults(tx, before.qualificationId, id);
      await tx.gradeScheme.update({ where: { id }, data: input });
      if (bandsChanged) {
        await tx.gradeBand.deleteMany({ where: { gradeSchemeId: id } });
        await tx.gradeBand.createMany({ data: bands.map((band, sortOrder) => ({ ...band, gradeSchemeId: id, sortOrder })) });
      }
      const diff = diffFields(before, input);
      await auditCurriculum(tx, actor, context, {
        action: input.isActive || !before.isActive ? CURRICULUM_AUDIT.UPDATE : CURRICULUM_AUDIT.RETIRE,
        operation: "curriculum.grade_scheme.update",
        entityType: "GradeScheme",
        entityId: id,
        before: bandsChanged ? { ...diff.before, bands: previousBands } : diff.before,
        after: bandsChanged ? { ...diff.after, bands } : diff.after,
      });
      return { id, version: before.version, versioned: false, previousId: null, assessmentsOnPrevious: 0 };
    });
  } catch (error) {
    mapDbError(error);
  } finally {
    invalidateCurriculumCaches();
  }
}
