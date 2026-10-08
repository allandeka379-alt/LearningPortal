import "server-only";
import type { CatalogueStatus, ContentSourceType, Prisma } from "@/generated/prisma/client";
import { isAllowedBoardSlug, isListedCatalogueStatus, RESERVED_TOP_LEVEL_SLUGS } from "@/server/curriculum/core";
import { AppError } from "@/server/lib/errors";
import { assertCurriculumAdmin, assertCurriculumRead, type CurriculumActor } from "./access";
import { isSubjectVerified, publicCurriculumPath, slugify, subjectStatusProblems } from "./core";
import {
  boardCountriesSchema,
  boardInputSchema,
  boardUpdateSchema,
  catalogueListFilterSchema,
  categoryInputSchema,
  categoryUpdateSchema,
  countryInputSchema,
  countryUpdateSchema,
  levelInputSchema,
  levelUpdateSchema,
  qualificationInputSchema,
  qualificationListFilterSchema,
  qualificationUpdateSchema,
  simpleListFilterSchema,
  subjectInputSchema,
  subjectListFilterSchema,
  subjectUpdateSchema,
  yearGroupInputSchema,
  yearGroupListFilterSchema,
  yearGroupUpdateSchema,
} from "./schemas";
import { seedNoteFor, SEED_VERIFICATION_POLICY, type SeedSubjectNote } from "./seed-notes";
import {
  ADMIN_PAGE_SIZE,
  auditCurriculum,
  containsAny,
  CURRICULUM_AUDIT,
  cursorArgs,
  diffFields,
  enqueueCurriculumReindex,
  fieldError,
  inTransaction,
  invalidateCurriculumCaches,
  mapDbError,
  omit,
  parseInput,
  readAll,
  readClient,
  throwIfProblems,
  toPage,
  type Page,
  type ServiceContext,
} from "./shared";

/**
 * Catalogue management (§3, §4, §53; ARCHITECTURE §4.2): countries (read-mostly), exam boards and the countries they
 * are offered in, cross-board levels, qualifications, year groups, subject categories and subjects. Adding a country,
 * board or qualification is data entry, never a schema change.
 *
 * Reads: CONTENT_EDITOR+ (`curriculum.manage` any scope). Writes: ADMIN+ (`curriculum.manage` = all). Every write is
 * audited in its own transaction and drops the catalogue caches; changes that affect public URLs or listings queue a
 * search rebuild.
 *
 * Slugs are public URL segments (§44): unique per scope, validated, and a slug that is already LIVE (listed catalogue
 * row) only changes with an explicit `confirmSlugChange`, because renaming breaks links and search rankings.
 * Subjects follow the "verified" rule: a subject is listed only once staff checked it against the board's official
 * subject list and recorded that list as its source (seeded subjects start HIDDEN and unverified).
 */

const SLUG_TAKEN = "Another item already uses this slug here. Choose a different one.";

function liveSlugError(path: string): AppError {
  return AppError.validation({
    slug: [`This slug is live in public URLs (${path}). Renaming it breaks existing links and search rankings. Tick "Rename the live URL" to confirm.`],
    confirmSlugChange: ["Confirm the URL change."],
  });
}

function nonEmptySlug(slug: string | null, fallbackFrom: string, field = "slug"): string {
  const value = slug ?? slugify(fallbackFrom);
  if (value === "") throw fieldError(field, "Enter a slug (lower-case letters, digits and hyphens).");
  return value;
}

// =====================================================================================================================
// Select options
// =====================================================================================================================

export interface CatalogueOptions {
  countries: { id: string; name: string; isoCode: string }[];
  boards: { id: string; slug: string; shortName: string; name: string }[];
  levels: { id: string; slug: string; name: string }[];
  qualifications: { id: string; slug: string; name: string; shortName: string; boardId: string; boardSlug: string; boardShortName: string }[];
  categories: { id: string; name: string }[];
  /** Active content sources (provenance records, §27), newest list first by name. */
  sources: { id: string; name: string; type: ContentSourceType }[];
}

/** Everything the curriculum forms need for their selects (bounded lists; catalogue tables are small). */
export async function getCatalogueOptions(actor: CurriculumActor, context: ServiceContext = {}): Promise<CatalogueOptions> {
  assertCurriculumRead(actor);
  const client = readClient(context);
  const [countries, boards, levels, qualifications, categories, sources] = await readAll(context, [
    () => client.country.findMany({ select: { id: true, name: true, isoCode: true }, orderBy: [{ sortOrder: "asc" }, { name: "asc" }], take: 300 }),
    () => client.examBoard.findMany({ select: { id: true, slug: true, shortName: true, name: true }, orderBy: [{ sortOrder: "asc" }, { name: "asc" }], take: 300 }),
    () => client.qualificationLevel.findMany({ select: { id: true, slug: true, name: true }, orderBy: [{ sortOrder: "asc" }, { name: "asc" }], take: 300 }),
    () => client.qualification.findMany({
      select: { id: true, slug: true, name: true, shortName: true, examBoard: { select: { id: true, slug: true, shortName: true, sortOrder: true } }, sortOrder: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      take: 500,
    }),
    () => client.subjectCategory.findMany({ select: { id: true, name: true }, orderBy: [{ sortOrder: "asc" }, { name: "asc" }], take: 300 }),
    () => client.contentSource.findMany({ where: { isActive: true }, select: { id: true, name: true, type: true }, orderBy: [{ name: "asc" }], take: 500 }),
  ]);
  return {
    countries,
    boards,
    levels,
    qualifications: qualifications
      .sort((a, b) => a.examBoard.sortOrder - b.examBoard.sortOrder || a.sortOrder - b.sortOrder)
      .map((q) => ({ id: q.id, slug: q.slug, name: q.name, shortName: q.shortName, boardId: q.examBoard.id, boardSlug: q.examBoard.slug, boardShortName: q.examBoard.shortName })),
    categories,
    sources,
  };
}

// =====================================================================================================================
// Countries (read-mostly)
// =====================================================================================================================

const COUNTRY_SELECT = {
  id: true,
  isoCode: true,
  name: true,
  slug: true,
  defaultCurrency: true,
  timezone: true,
  defaultLocale: true,
  dialCode: true,
  catalogueStatus: true,
  sortOrder: true,
  updatedAt: true,
  _count: { select: { examBoardLinks: true, yearGroups: true } },
} as const satisfies Prisma.CountrySelect;
export type CountryRow = Prisma.CountryGetPayload<{ select: typeof COUNTRY_SELECT }>;

export async function listCountries(actor: CurriculumActor, filter: unknown = {}, context: ServiceContext = {}): Promise<Page<CountryRow>> {
  assertCurriculumRead(actor);
  const { q, status, cursor } = parseInput(catalogueListFilterSchema, filter);
  const rows = await readClient(context).country.findMany({
    where: { ...(status ? { catalogueStatus: status } : {}), ...containsAny(q, ["name", "isoCode", "slug"]) },
    select: COUNTRY_SELECT,
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }, { id: "asc" }],
    take: ADMIN_PAGE_SIZE + 1,
    ...cursorArgs(cursor),
  });
  return toPage(rows);
}

export async function getCountry(actor: CurriculumActor, id: string, context: ServiceContext = {}): Promise<CountryRow> {
  assertCurriculumRead(actor);
  const row = await readClient(context).country.findUnique({ where: { id }, select: COUNTRY_SELECT });
  if (!row) throw AppError.notFound("Country not found.");
  return row;
}

const COUNTRY_UNIQUE = { isoCode: "This ISO code is already used by another country.", slug: SLUG_TAKEN };

export async function createCountry(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string }> {
  assertCurriculumAdmin(actor);
  const input = parseInput(countryInputSchema, raw);
  const slug = nonEmptySlug(input.slug, input.name);
  try {
    return await inTransaction(context, async (tx) => {
      const row = await tx.country.create({ data: { ...input, slug }, select: { id: true } });
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: "curriculum.country.create",
        entityType: "Country",
        entityId: row.id,
        after: { ...input, slug },
      });
      return row;
    });
  } catch (error) {
    mapDbError(error, COUNTRY_UNIQUE);
  } finally {
    invalidateCurriculumCaches();
  }
}

export async function updateCountry(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string }> {
  assertCurriculumAdmin(actor);
  const { id, ...input } = parseInput(countryUpdateSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const before = await tx.country.findUnique({ where: { id } });
      if (!before) throw AppError.notFound("Country not found.");
      // Country slugs are not part of curriculum URLs (§44), so a rename needs no confirmation.
      const data = { ...input, slug: nonEmptySlug(input.slug, input.name) };
      await tx.country.update({ where: { id }, data });
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: "curriculum.country.update",
        entityType: "Country",
        entityId: id,
        ...diffFields(before, data),
      });
      return { id };
    });
  } catch (error) {
    mapDbError(error, COUNTRY_UNIQUE);
  } finally {
    invalidateCurriculumCaches();
  }
}

// =====================================================================================================================
// Exam boards (+ country availability)
// =====================================================================================================================

const BOARD_LIST_SELECT = {
  id: true,
  slug: true,
  code: true,
  name: true,
  shortName: true,
  catalogueStatus: true,
  sortOrder: true,
  updatedAt: true,
  homeCountry: { select: { id: true, name: true, isoCode: true } },
  _count: { select: { qualifications: true, countryLinks: true } },
} as const satisfies Prisma.ExamBoardSelect;
export type BoardRow = Prisma.ExamBoardGetPayload<{ select: typeof BOARD_LIST_SELECT }>;

export async function listBoards(actor: CurriculumActor, filter: unknown = {}, context: ServiceContext = {}): Promise<Page<BoardRow>> {
  assertCurriculumRead(actor);
  const { q, status, cursor } = parseInput(catalogueListFilterSchema, filter);
  const rows = await readClient(context).examBoard.findMany({
    where: { ...(status ? { catalogueStatus: status } : {}), ...containsAny(q, ["name", "shortName", "code", "slug"]) },
    select: BOARD_LIST_SELECT,
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }, { id: "asc" }],
    take: ADMIN_PAGE_SIZE + 1,
    ...cursorArgs(cursor),
  });
  return toPage(rows);
}

const BOARD_DETAIL_SELECT = {
  id: true,
  slug: true,
  code: true,
  name: true,
  shortName: true,
  description: true,
  publicSummary: true,
  websiteUrl: true,
  homeCountryId: true,
  catalogueStatus: true,
  sortOrder: true,
  metaTitle: true,
  metaDescription: true,
  createdAt: true,
  updatedAt: true,
  countryLinks: {
    select: { countryId: true, isActive: true, sortOrder: true, country: { select: { name: true, isoCode: true } } },
    orderBy: [{ sortOrder: "asc" as const }],
  },
  qualifications: {
    select: { id: true, name: true, slug: true, catalogueStatus: true },
    orderBy: [{ sortOrder: "asc" as const }, { name: "asc" as const }],
    take: 100,
  },
} as const satisfies Prisma.ExamBoardSelect;
export type BoardDetail = Prisma.ExamBoardGetPayload<{ select: typeof BOARD_DETAIL_SELECT }> & { publicPath: string };

export async function getBoard(actor: CurriculumActor, id: string, context: ServiceContext = {}): Promise<BoardDetail> {
  assertCurriculumRead(actor);
  const row = await readClient(context).examBoard.findUnique({ where: { id }, select: BOARD_DETAIL_SELECT });
  if (!row) throw AppError.notFound("Exam board not found.");
  return { ...row, publicPath: publicCurriculumPath(row.slug) };
}

const BOARD_UNIQUE = { slug: SLUG_TAKEN, code: "Another board already uses this code." };

function assertBoardSlug(slug: string): void {
  if (RESERVED_TOP_LEVEL_SLUGS.has(slug)) throw fieldError("slug", "This slug is reserved for a page of the app. Choose another.");
  if (!isAllowedBoardSlug(slug)) throw fieldError("slug", "Use lower-case letters, digits and single hyphens.");
}

export async function createBoard(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string }> {
  assertCurriculumAdmin(actor);
  const input = omit(parseInput(boardInputSchema, raw), "confirmSlugChange");
  const slug = nonEmptySlug(input.slug, input.shortName);
  assertBoardSlug(slug);
  try {
    return await inTransaction(context, async (tx) => {
      const row = await tx.examBoard.create({ data: { ...input, slug }, select: { id: true } });
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: "curriculum.board.create",
        entityType: "ExamBoard",
        entityId: row.id,
        after: { slug, code: input.code, name: input.name, catalogueStatus: input.catalogueStatus },
      });
      return row;
    });
  } catch (error) {
    mapDbError(error, BOARD_UNIQUE);
  } finally {
    invalidateCurriculumCaches();
  }
}

export async function updateBoard(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string }> {
  assertCurriculumAdmin(actor);
  const { id, confirmSlugChange, ...input } = parseInput(boardUpdateSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const before = await tx.examBoard.findUnique({ where: { id } });
      if (!before) throw AppError.notFound("Exam board not found.");
      const slug = nonEmptySlug(input.slug, input.shortName);
      assertBoardSlug(slug);
      if (slug !== before.slug && isListedCatalogueStatus(before.catalogueStatus) && !confirmSlugChange) {
        throw liveSlugError(publicCurriculumPath(before.slug));
      }
      const data = { ...input, slug };
      await tx.examBoard.update({ where: { id }, data });
      const diff = diffFields(before, data);
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: "curriculum.board.update",
        entityType: "ExamBoard",
        entityId: id,
        ...diff,
        metadata: slug !== before.slug ? { slugChanged: true } : {},
      });
      if (["slug", "name", "shortName", "code", "catalogueStatus"].some((key) => key in diff.after)) {
        await enqueueCurriculumReindex(tx, ["SUBJECT", "TOPIC", "LESSON", "QUESTION", "FLASHCARD"]);
      }
      return { id };
    });
  } catch (error) {
    mapDbError(error, BOARD_UNIQUE);
  } finally {
    invalidateCurriculumCaches();
  }
}

/**
 * Sets the countries a board is offered in (onboarding filters boards by country). Ticked countries are linked (or
 * re-activated) with their order; unticked existing links are deactivated, never deleted.
 */
export async function setBoardCountries(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ active: number }> {
  assertCurriculumAdmin(actor);
  const input = parseInput(boardCountriesSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const board = await tx.examBoard.findUnique({ where: { id: input.boardId }, select: { id: true } });
      if (!board) throw AppError.notFound("Exam board not found.");
      const existing = await tx.examBoardCountry.findMany({ where: { examBoardId: input.boardId }, select: { countryId: true, isActive: true, sortOrder: true } });
      const wanted = new Map(input.links.filter((link) => link.isActive).map((link) => [link.countryId, link.sortOrder]));
      const knownCountries = await tx.country.count({ where: { id: { in: [...wanted.keys()] } } });
      if (knownCountries !== wanted.size) throw fieldError("links", "Choose countries from the list.");
      for (const [countryId, order] of wanted) {
        await tx.examBoardCountry.upsert({
          where: { countryId_examBoardId: { countryId, examBoardId: input.boardId } },
          create: { countryId, examBoardId: input.boardId, isActive: true, sortOrder: order },
          update: { isActive: true, sortOrder: order },
        });
      }
      const toDeactivate = existing.filter((link) => link.isActive && !wanted.has(link.countryId)).map((link) => link.countryId);
      if (toDeactivate.length > 0) {
        await tx.examBoardCountry.updateMany({ where: { examBoardId: input.boardId, countryId: { in: toDeactivate } }, data: { isActive: false } });
      }
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: "curriculum.board.countries",
        entityType: "ExamBoard",
        entityId: input.boardId,
        before: { active: existing.filter((link) => link.isActive).map((link) => link.countryId) },
        after: { active: [...wanted.keys()] },
      });
      return { active: wanted.size };
    });
  } catch (error) {
    mapDbError(error);
  } finally {
    invalidateCurriculumCaches();
  }
}

// =====================================================================================================================
// Qualification levels (cross-board grouping)
// =====================================================================================================================

const LEVEL_SELECT = {
  id: true,
  slug: true,
  name: true,
  shortName: true,
  description: true,
  sortOrder: true,
  isActive: true,
  _count: { select: { qualifications: true, yearGroups: true } },
} as const satisfies Prisma.QualificationLevelSelect;
export type LevelRow = Prisma.QualificationLevelGetPayload<{ select: typeof LEVEL_SELECT }>;

export async function listLevels(actor: CurriculumActor, filter: unknown = {}, context: ServiceContext = {}): Promise<Page<LevelRow>> {
  assertCurriculumRead(actor);
  const { q, cursor } = parseInput(simpleListFilterSchema, filter);
  const rows = await readClient(context).qualificationLevel.findMany({
    where: containsAny(q, ["name", "slug", "shortName"]),
    select: LEVEL_SELECT,
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }, { id: "asc" }],
    take: ADMIN_PAGE_SIZE + 1,
    ...cursorArgs(cursor),
  });
  return toPage(rows);
}

const LEVEL_UNIQUE = { slug: SLUG_TAKEN };

export async function createLevel(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string }> {
  assertCurriculumAdmin(actor);
  const input = parseInput(levelInputSchema, raw);
  const slug = nonEmptySlug(input.slug, input.name);
  try {
    return await inTransaction(context, async (tx) => {
      const row = await tx.qualificationLevel.create({ data: { ...input, slug }, select: { id: true } });
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: "curriculum.level.create",
        entityType: "QualificationLevel",
        entityId: row.id,
        after: { ...input, slug },
      });
      return row;
    });
  } catch (error) {
    mapDbError(error, LEVEL_UNIQUE);
  } finally {
    invalidateCurriculumCaches();
  }
}

export async function updateLevel(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string }> {
  assertCurriculumAdmin(actor);
  const { id, ...input } = parseInput(levelUpdateSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const before = await tx.qualificationLevel.findUnique({ where: { id } });
      if (!before) throw AppError.notFound("Level not found.");
      const data = { ...input, slug: nonEmptySlug(input.slug, input.name) };
      await tx.qualificationLevel.update({ where: { id }, data });
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: "curriculum.level.update",
        entityType: "QualificationLevel",
        entityId: id,
        ...diffFields(before, data),
      });
      return { id };
    });
  } catch (error) {
    mapDbError(error, LEVEL_UNIQUE);
  } finally {
    invalidateCurriculumCaches();
  }
}

// =====================================================================================================================
// Qualifications
// =====================================================================================================================

const QUALIFICATION_LIST_SELECT = {
  id: true,
  slug: true,
  code: true,
  name: true,
  shortName: true,
  catalogueStatus: true,
  sortOrder: true,
  updatedAt: true,
  examBoard: { select: { id: true, slug: true, shortName: true } },
  level: { select: { id: true, name: true } },
  _count: { select: { subjects: true, examSessions: true, gradeSchemes: true } },
} as const satisfies Prisma.QualificationSelect;
export type QualificationRow = Prisma.QualificationGetPayload<{ select: typeof QUALIFICATION_LIST_SELECT }>;

export async function listQualifications(actor: CurriculumActor, filter: unknown = {}, context: ServiceContext = {}): Promise<Page<QualificationRow>> {
  assertCurriculumRead(actor);
  const { q, status, boardId, levelId, cursor } = parseInput(qualificationListFilterSchema, filter);
  const rows = await readClient(context).qualification.findMany({
    where: {
      ...(status ? { catalogueStatus: status } : {}),
      ...(boardId ? { examBoardId: boardId } : {}),
      ...(levelId ? { levelId } : {}),
      ...containsAny(q, ["name", "shortName", "code", "slug"]),
    },
    select: QUALIFICATION_LIST_SELECT,
    orderBy: [{ examBoardId: "asc" }, { sortOrder: "asc" }, { name: "asc" }, { id: "asc" }],
    take: ADMIN_PAGE_SIZE + 1,
    ...cursorArgs(cursor),
  });
  return toPage(rows);
}

const QUALIFICATION_DETAIL_SELECT = {
  id: true,
  examBoardId: true,
  levelId: true,
  slug: true,
  code: true,
  name: true,
  shortName: true,
  description: true,
  publicSummary: true,
  catalogueStatus: true,
  sortOrder: true,
  metaTitle: true,
  metaDescription: true,
  updatedAt: true,
  examBoard: { select: { id: true, slug: true, shortName: true, catalogueStatus: true } },
  level: { select: { id: true, name: true } },
  _count: { select: { subjects: true, examSessions: true, gradeSchemes: true, students: true } },
} as const satisfies Prisma.QualificationSelect;
export type QualificationDetail = Prisma.QualificationGetPayload<{ select: typeof QUALIFICATION_DETAIL_SELECT }> & { publicPath: string };

export async function getQualification(actor: CurriculumActor, id: string, context: ServiceContext = {}): Promise<QualificationDetail> {
  assertCurriculumRead(actor);
  const row = await readClient(context).qualification.findUnique({ where: { id }, select: QUALIFICATION_DETAIL_SELECT });
  if (!row) throw AppError.notFound("Qualification not found.");
  return { ...row, publicPath: publicCurriculumPath(row.examBoard.slug, row.slug) };
}

const QUALIFICATION_UNIQUE = { slug: "This board already has a qualification with this slug.", examBoardId: "This board already has a qualification with this slug." };

export async function createQualification(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string }> {
  assertCurriculumAdmin(actor);
  const input = omit(parseInput(qualificationInputSchema, raw), "confirmSlugChange");
  const slug = nonEmptySlug(input.slug, input.shortName);
  try {
    return await inTransaction(context, async (tx) => {
      const board = await tx.examBoard.findUnique({ where: { id: input.examBoardId }, select: { id: true } });
      const level = await tx.qualificationLevel.findUnique({ where: { id: input.levelId }, select: { id: true } });
      if (!board) throw fieldError("examBoardId", "Choose an exam board.");
      if (!level) throw fieldError("levelId", "Choose a level.");
      const row = await tx.qualification.create({ data: { ...input, slug }, select: { id: true } });
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: "curriculum.qualification.create",
        entityType: "Qualification",
        entityId: row.id,
        after: { examBoardId: input.examBoardId, slug, name: input.name, catalogueStatus: input.catalogueStatus },
      });
      return row;
    });
  } catch (error) {
    mapDbError(error, QUALIFICATION_UNIQUE);
  } finally {
    invalidateCurriculumCaches();
  }
}

export async function updateQualification(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string }> {
  assertCurriculumAdmin(actor);
  const { id, confirmSlugChange, ...input } = parseInput(qualificationUpdateSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const before = await tx.qualification.findUnique({ where: { id }, include: { examBoard: { select: { slug: true } } } });
      if (!before) throw AppError.notFound("Qualification not found.");
      const level = await tx.qualificationLevel.findUnique({ where: { id: input.levelId }, select: { id: true } });
      if (!level) throw fieldError("levelId", "Choose a level.");
      const slug = nonEmptySlug(input.slug, input.shortName);
      if (slug !== before.slug && isListedCatalogueStatus(before.catalogueStatus) && !confirmSlugChange) {
        throw liveSlugError(publicCurriculumPath(before.examBoard.slug, before.slug));
      }
      const data = { ...input, slug };
      await tx.qualification.update({ where: { id }, data });
      const diff = diffFields(before, data);
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: "curriculum.qualification.update",
        entityType: "Qualification",
        entityId: id,
        ...diff,
      });
      if (["slug", "name", "shortName", "code", "catalogueStatus", "levelId"].some((key) => key in diff.after)) {
        await enqueueCurriculumReindex(tx, ["SUBJECT", "TOPIC", "LESSON", "QUESTION", "FLASHCARD"]);
      }
      return { id };
    });
  } catch (error) {
    mapDbError(error, QUALIFICATION_UNIQUE);
  } finally {
    invalidateCurriculumCaches();
  }
}

// =====================================================================================================================
// Year groups (per country; "Year/form" in onboarding)
// =====================================================================================================================

const YEAR_GROUP_SELECT = {
  id: true,
  countryId: true,
  code: true,
  name: true,
  ordinal: true,
  typicalLevelId: true,
  isActive: true,
  country: { select: { name: true, isoCode: true } },
  typicalLevel: { select: { name: true } },
  _count: { select: { students: true } },
} as const satisfies Prisma.YearGroupSelect;
export type YearGroupRow = Prisma.YearGroupGetPayload<{ select: typeof YEAR_GROUP_SELECT }>;

/** Year groups, optionally of one country, in country then ordinal order. */
export async function listYearGroups(actor: CurriculumActor, filter: unknown = {}, context: ServiceContext = {}): Promise<Page<YearGroupRow>> {
  assertCurriculumRead(actor);
  const { q, countryId, cursor } = parseInput(yearGroupListFilterSchema, filter);
  const rows = await readClient(context).yearGroup.findMany({
    where: { ...(countryId ? { countryId } : {}), ...containsAny(q, ["name", "code"]) },
    select: YEAR_GROUP_SELECT,
    orderBy: [{ countryId: "asc" }, { ordinal: "asc" }, { id: "asc" }],
    take: ADMIN_PAGE_SIZE + 1,
    ...cursorArgs(cursor),
  });
  return toPage(rows);
}

const YEAR_GROUP_UNIQUE = { code: "This country already has a year group with this code.", countryId: "This country already has a year group with this code." };

export async function createYearGroup(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string }> {
  assertCurriculumAdmin(actor);
  const input = parseInput(yearGroupInputSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const country = await tx.country.findUnique({ where: { id: input.countryId }, select: { id: true } });
      if (!country) throw fieldError("countryId", "Choose a country.");
      const row = await tx.yearGroup.create({ data: input, select: { id: true } });
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: "curriculum.year_group.create",
        entityType: "YearGroup",
        entityId: row.id,
        after: input,
      });
      return row;
    });
  } catch (error) {
    mapDbError(error, YEAR_GROUP_UNIQUE);
  } finally {
    invalidateCurriculumCaches();
  }
}

export async function updateYearGroup(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string }> {
  assertCurriculumAdmin(actor);
  const { id, ...input } = parseInput(yearGroupUpdateSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const before = await tx.yearGroup.findUnique({ where: { id } });
      if (!before) throw AppError.notFound("Year group not found.");
      await tx.yearGroup.update({ where: { id }, data: input });
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: "curriculum.year_group.update",
        entityType: "YearGroup",
        entityId: id,
        ...diffFields(before, input),
      });
      return { id };
    });
  } catch (error) {
    mapDbError(error, YEAR_GROUP_UNIQUE);
  } finally {
    invalidateCurriculumCaches();
  }
}

// =====================================================================================================================
// Subject categories
// =====================================================================================================================

const CATEGORY_SELECT = {
  id: true,
  slug: true,
  name: true,
  description: true,
  iconKey: true,
  sortOrder: true,
  isActive: true,
  _count: { select: { subjects: true } },
} as const satisfies Prisma.SubjectCategorySelect;
export type CategoryRow = Prisma.SubjectCategoryGetPayload<{ select: typeof CATEGORY_SELECT }>;

export async function listCategories(actor: CurriculumActor, filter: unknown = {}, context: ServiceContext = {}): Promise<Page<CategoryRow>> {
  assertCurriculumRead(actor);
  const { q, cursor } = parseInput(simpleListFilterSchema, filter);
  const rows = await readClient(context).subjectCategory.findMany({
    where: containsAny(q, ["name", "slug"]),
    select: CATEGORY_SELECT,
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }, { id: "asc" }],
    take: ADMIN_PAGE_SIZE + 1,
    ...cursorArgs(cursor),
  });
  return toPage(rows);
}

const CATEGORY_UNIQUE = { slug: SLUG_TAKEN };

export async function createCategory(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string }> {
  assertCurriculumAdmin(actor);
  const input = parseInput(categoryInputSchema, raw);
  const slug = nonEmptySlug(input.slug, input.name);
  try {
    return await inTransaction(context, async (tx) => {
      const row = await tx.subjectCategory.create({ data: { ...input, slug }, select: { id: true } });
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: "curriculum.category.create",
        entityType: "SubjectCategory",
        entityId: row.id,
        after: { ...input, slug },
      });
      return row;
    });
  } catch (error) {
    mapDbError(error, CATEGORY_UNIQUE);
  } finally {
    invalidateCurriculumCaches();
  }
}

export async function updateCategory(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string }> {
  assertCurriculumAdmin(actor);
  const { id, ...input } = parseInput(categoryUpdateSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const before = await tx.subjectCategory.findUnique({ where: { id } });
      if (!before) throw AppError.notFound("Category not found.");
      const data = { ...input, slug: nonEmptySlug(input.slug, input.name) };
      await tx.subjectCategory.update({ where: { id }, data });
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: "curriculum.category.update",
        entityType: "SubjectCategory",
        entityId: id,
        ...diffFields(before, data),
      });
      return { id };
    });
  } catch (error) {
    mapDbError(error, CATEGORY_UNIQUE);
  } finally {
    invalidateCurriculumCaches();
  }
}

// =====================================================================================================================
// Subjects (catalogue status + the "verified" rule)
// =====================================================================================================================

const SUBJECT_LIST_SELECT = {
  id: true,
  slug: true,
  name: true,
  officialCode: true,
  catalogueStatus: true,
  isPublic: true,
  sourceId: true,
  sortOrder: true,
  isDemo: true,
  updatedAt: true,
  category: { select: { id: true, name: true } },
  qualification: { select: { id: true, slug: true, shortName: true, examBoard: { select: { id: true, slug: true, shortName: true } } } },
  _count: { select: { syllabi: true } },
} as const satisfies Prisma.SubjectSelect;
export type SubjectRow = Prisma.SubjectGetPayload<{ select: typeof SUBJECT_LIST_SELECT }> & { verified: boolean };

export async function listSubjects(actor: CurriculumActor, filter: unknown = {}, context: ServiceContext = {}): Promise<Page<SubjectRow>> {
  assertCurriculumRead(actor);
  const f = parseInput(subjectListFilterSchema, filter);
  const rows = await readClient(context).subject.findMany({
    where: {
      ...(f.status ? { catalogueStatus: f.status } : {}),
      ...(f.qualificationId ? { qualificationId: f.qualificationId } : {}),
      ...(f.boardId ? { qualification: { examBoardId: f.boardId } } : {}),
      ...(f.categoryId ? { categoryId: f.categoryId } : {}),
      ...(f.verified === "yes" ? { sourceId: { not: null } } : f.verified === "no" ? { sourceId: null } : {}),
      ...containsAny(f.q, ["name", "slug", "officialCode", "shortName"]),
    },
    select: SUBJECT_LIST_SELECT,
    orderBy: [{ qualificationId: "asc" }, { sortOrder: "asc" }, { name: "asc" }, { id: "asc" }],
    take: ADMIN_PAGE_SIZE + 1,
    ...cursorArgs(f.cursor),
  });
  const page = toPage(rows);
  return { ...page, items: page.items.map((row) => ({ ...row, verified: isSubjectVerified(row) })) };
}

const SUBJECT_DETAIL_SELECT = {
  id: true,
  qualificationId: true,
  categoryId: true,
  slug: true,
  name: true,
  shortName: true,
  officialCode: true,
  description: true,
  publicSummary: true,
  metaTitle: true,
  metaDescription: true,
  languageCode: true,
  iconKey: true,
  catalogueStatus: true,
  isPublic: true,
  sortOrder: true,
  sourceId: true,
  isDemo: true,
  createdAt: true,
  updatedAt: true,
  source: { select: { id: true, name: true, type: true, url: true } },
  category: { select: { id: true, name: true } },
  qualification: {
    select: { id: true, slug: true, name: true, shortName: true, catalogueStatus: true, examBoard: { select: { id: true, slug: true, shortName: true, catalogueStatus: true } } },
  },
  syllabi: {
    select: { id: true, versionLabel: true, title: true, status: true, effectiveFrom: true, effectiveTo: true, publishedAt: true, isDemo: true },
    orderBy: [{ effectiveFrom: "desc" as const }, { createdAt: "desc" as const }],
    take: 50,
  },
  _count: { select: { enrollments: true } },
} as const satisfies Prisma.SubjectSelect;

export type SubjectDetail = Prisma.SubjectGetPayload<{ select: typeof SUBJECT_DETAIL_SELECT }> & {
  verified: boolean;
  publicPath: string;
  seedNote: (SeedSubjectNote & { policy: string }) | null;
};

export async function getSubject(actor: CurriculumActor, id: string, context: ServiceContext = {}): Promise<SubjectDetail> {
  assertCurriculumRead(actor);
  const row = await readClient(context).subject.findUnique({ where: { id }, select: SUBJECT_DETAIL_SELECT });
  if (!row) throw AppError.notFound("Subject not found.");
  const seed = seedNoteFor(row.qualification.examBoard.slug, row.qualification.slug, row.slug);
  return {
    ...row,
    verified: isSubjectVerified(row),
    publicPath: publicCurriculumPath(row.qualification.examBoard.slug, row.qualification.slug, row.slug),
    seedNote: seed ? { ...seed, policy: SEED_VERIFICATION_POLICY } : null,
  };
}

const SUBJECT_UNIQUE = { slug: "This qualification already has a subject with this slug.", qualificationId: "This qualification already has a subject with this slug." };

async function assertSubjectStatus(
  tx: Prisma.TransactionClient,
  subjectId: string | null,
  target: CatalogueStatus,
  sourceId: string | null,
): Promise<void> {
  const hasCurrentSyllabus = subjectId === null ? false : (await tx.syllabus.count({ where: { subjectId, status: "CURRENT" } })) > 0;
  throwIfProblems(subjectStatusProblems({ target, sourceId, hasCurrentSyllabus }));
}

async function assertSourceExists(tx: Prisma.TransactionClient, sourceId: string | null, field = "sourceId"): Promise<void> {
  if (sourceId === null) return;
  const source = await tx.contentSource.findUnique({ where: { id: sourceId }, select: { id: true } });
  if (!source) throw fieldError(field, "Choose a source from the list.");
}

export async function createSubject(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string }> {
  assertCurriculumAdmin(actor);
  const input = omit(parseInput(subjectInputSchema, raw), "confirmSlugChange");
  const slug = nonEmptySlug(input.slug, input.name);
  try {
    return await inTransaction(context, async (tx) => {
      const qualification = await tx.qualification.findUnique({ where: { id: input.qualificationId }, select: { id: true } });
      const category = await tx.subjectCategory.findUnique({ where: { id: input.categoryId }, select: { id: true } });
      if (!qualification) throw fieldError("qualificationId", "Choose a qualification.");
      if (!category) throw fieldError("categoryId", "Choose a category.");
      await assertSourceExists(tx, input.sourceId);
      await assertSubjectStatus(tx, null, input.catalogueStatus, input.sourceId);
      const row = await tx.subject.create({ data: { ...input, slug }, select: { id: true } });
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: "curriculum.subject.create",
        entityType: "Subject",
        entityId: row.id,
        after: { qualificationId: input.qualificationId, slug, name: input.name, officialCode: input.officialCode, catalogueStatus: input.catalogueStatus, sourceId: input.sourceId },
      });
      return row;
    });
  } catch (error) {
    mapDbError(error, SUBJECT_UNIQUE);
  } finally {
    invalidateCurriculumCaches();
  }
}

export async function updateSubject(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string }> {
  assertCurriculumAdmin(actor);
  const { id, confirmSlugChange, ...input } = parseInput(subjectUpdateSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const before = await tx.subject.findUnique({
        where: { id },
        include: { qualification: { select: { slug: true, examBoard: { select: { slug: true } } } } },
      });
      if (!before) throw AppError.notFound("Subject not found.");
      const category = await tx.subjectCategory.findUnique({ where: { id: input.categoryId }, select: { id: true } });
      if (!category) throw fieldError("categoryId", "Choose a category.");
      await assertSourceExists(tx, input.sourceId);
      const slug = nonEmptySlug(input.slug, input.name);
      if (slug !== before.slug && isListedCatalogueStatus(before.catalogueStatus) && before.isPublic && !confirmSlugChange) {
        throw liveSlugError(publicCurriculumPath(before.qualification.examBoard.slug, before.qualification.slug, before.slug));
      }
      await assertSubjectStatus(tx, id, input.catalogueStatus, input.sourceId);
      const data = { ...input, slug };
      await tx.subject.update({ where: { id }, data });
      const diff = diffFields(before, data);
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: before.sourceId === null && input.sourceId !== null ? "curriculum.subject.verify" : "curriculum.subject.update",
        entityType: "Subject",
        entityId: id,
        ...diff,
      });
      if (["slug", "name", "shortName", "officialCode", "catalogueStatus", "isPublic", "languageCode"].some((key) => key in diff.after)) {
        await enqueueCurriculumReindex(tx, ["SUBJECT", "TOPIC", "LESSON", "QUESTION", "FLASHCARD"]);
      }
      return { id };
    });
  } catch (error) {
    mapDbError(error, SUBJECT_UNIQUE);
  } finally {
    invalidateCurriculumCaches();
  }
}
