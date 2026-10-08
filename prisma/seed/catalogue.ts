import type { PrismaClient } from "@/generated/prisma/client";
import { BOARDS, COUNTRIES, GRADE_SCHEMES, QUALIFICATIONS, SUBJECT_CATEGORIES, SUBJECTS } from "./data/catalogue";
import { BOARD_CODES, COUNTRY_DETAILS, QUALIFICATION_CODES, QUALIFICATION_LEVELS, SUBJECT_LANGUAGES, YEAR_GROUPS } from "./data/catalogue-extra";
import type { SeedLog, SeedTally } from "./util";

/**
 * ALWAYS-seeded curriculum catalogue (all environments): countries, boards (+ availability per country), cross-board
 * levels, qualifications, year groups, subject categories, subjects and estimated grade schemes.
 *
 * Idempotent: every row is created when missing (natural keys: ISO code, slugs, (qualification, slug), ...) and an
 * existing row is NEVER modified, so admin edits made in the CMS survive re-seeding. Verification policy: see
 * `data/catalogue-extra.ts` (unverified subjects are HIDDEN with no source; grade schemes are flagged estimates).
 */

export interface CatalogueIds {
  countries: Map<string, string>;
  boards: Map<string, string>;
  levels: Map<string, string>;
  /** Key: `<board>/<qualification>` slugs. */
  qualifications: Map<string, string>;
  /** Key: `<country>/<code>`, e.g. "ZW/F4". */
  yearGroups: Map<string, string>;
  categories: Map<string, string>;
  /** Key: `<board>/<qualification>/<subject>` slugs. */
  subjects: Map<string, string>;
}

export async function seedCatalogue(db: PrismaClient, tally: SeedTally, log: SeedLog): Promise<CatalogueIds> {
  const ids: CatalogueIds = {
    countries: new Map(),
    boards: new Map(),
    levels: new Map(),
    qualifications: new Map(),
    yearGroups: new Map(),
    categories: new Map(),
    subjects: new Map(),
  };

  for (const [index, country] of COUNTRIES.entries()) {
    const details = COUNTRY_DETAILS[country.code];
    if (!details) throw new Error(`catalogue-extra: no details for country ${country.code}`);
    const existing = await db.country.findUnique({ where: { isoCode: country.code }, select: { id: true } });
    const row =
      existing ??
      (await db.country.create({
        data: {
          isoCode: country.code,
          name: country.name,
          slug: details.slug,
          defaultCurrency: country.defaultCurrency,
          timezone: country.defaultTimezone,
          defaultLocale: details.defaultLocale,
          dialCode: details.dialCode,
          catalogueStatus: "AVAILABLE",
          sortOrder: index + 1,
        },
        select: { id: true },
      }));
    tally.add("Country", !existing);
    ids.countries.set(country.code, row.id);
  }

  for (const [index, board] of BOARDS.entries()) {
    const code = BOARD_CODES[board.slug];
    if (!code) throw new Error(`catalogue-extra: no code for board ${board.slug}`);
    const existing = await db.examBoard.findUnique({ where: { slug: board.slug }, select: { id: true } });
    const row =
      existing ??
      (await db.examBoard.create({
        data: {
          slug: board.slug,
          code,
          name: board.name,
          shortName: board.shortName,
          description: board.description,
          websiteUrl: board.website,
          homeCountryId: board.countryCode ? (ids.countries.get(board.countryCode) ?? null) : null,
          catalogueStatus: "AVAILABLE",
          sortOrder: index + 1,
        },
        select: { id: true },
      }));
    tally.add("ExamBoard", !existing);
    ids.boards.set(board.slug, row.id);
    for (const [order, countryCode] of board.availableInCountryCodes.entries()) {
      const countryId = ids.countries.get(countryCode);
      if (!countryId) continue;
      const link = await db.examBoardCountry.findUnique({ where: { countryId_examBoardId: { countryId, examBoardId: row.id } } });
      if (!link) await db.examBoardCountry.create({ data: { countryId, examBoardId: row.id, sortOrder: index + 1 + order } });
      tally.add("ExamBoardCountry", !link);
    }
  }

  for (const level of QUALIFICATION_LEVELS) {
    const existing = await db.qualificationLevel.findUnique({ where: { slug: level.slug }, select: { id: true } });
    const row = existing ?? (await db.qualificationLevel.create({ data: level, select: { id: true } }));
    tally.add("QualificationLevel", !existing);
    ids.levels.set(level.slug, row.id);
  }

  for (const [index, qualification] of QUALIFICATIONS.entries()) {
    const examBoardId = ids.boards.get(qualification.boardSlug);
    const levelId = ids.levels.get(qualification.levelKey);
    if (!examBoardId || !levelId) throw new Error(`catalogue: unknown board/level for ${qualification.boardSlug}/${qualification.slug}`);
    const key = `${qualification.boardSlug}/${qualification.slug}`;
    const existing = await db.qualification.findUnique({ where: { examBoardId_slug: { examBoardId, slug: qualification.slug } }, select: { id: true } });
    const row =
      existing ??
      (await db.qualification.create({
        data: {
          examBoardId,
          levelId,
          slug: qualification.slug,
          code: QUALIFICATION_CODES[key] ?? null,
          name: qualification.name,
          shortName: qualification.shortName,
          description: qualification.description,
          // Listed honestly as "coming soon" until content exists (§50); admins make it AVAILABLE.
          catalogueStatus: "COMING_SOON",
          sortOrder: index + 1,
        },
        select: { id: true },
      }));
    tally.add("Qualification", !existing);
    ids.qualifications.set(key, row.id);
  }

  for (const group of YEAR_GROUPS) {
    const countryId = ids.countries.get(group.countryCode);
    if (!countryId) continue;
    const existing = await db.yearGroup.findUnique({ where: { countryId_code: { countryId, code: group.code } }, select: { id: true } });
    const row =
      existing ??
      (await db.yearGroup.create({
        data: { countryId, code: group.code, name: group.name, ordinal: group.ordinal, typicalLevelId: ids.levels.get(group.levelSlug) ?? null },
        select: { id: true },
      }));
    tally.add("YearGroup", !existing);
    ids.yearGroups.set(`${group.countryCode}/${group.code}`, row.id);
  }

  for (const category of SUBJECT_CATEGORIES) {
    const existing = await db.subjectCategory.findUnique({ where: { slug: category.slug }, select: { id: true } });
    const row = existing ?? (await db.subjectCategory.create({ data: category, select: { id: true } }));
    tally.add("SubjectCategory", !existing);
    ids.categories.set(category.slug, row.id);
  }

  const subjectOrder = new Map<string, number>();
  for (const subject of SUBJECTS) {
    const qualificationKey = `${subject.boardSlug}/${subject.qualificationSlug}`;
    const qualificationId = ids.qualifications.get(qualificationKey);
    const categoryId = ids.categories.get(subject.categorySlug);
    if (!qualificationId || !categoryId) throw new Error(`catalogue: unknown qualification/category for ${qualificationKey}/${subject.slug}`);
    const sortOrder = (subjectOrder.get(qualificationKey) ?? 0) + 1;
    subjectOrder.set(qualificationKey, sortOrder);
    const existing = await db.subject.findUnique({ where: { qualificationId_slug: { qualificationId, slug: subject.slug } }, select: { id: true } });
    const row =
      existing ??
      (await db.subject.create({
        data: {
          qualificationId,
          categoryId,
          slug: subject.slug,
          name: subject.name,
          officialCode: subject.code,
          languageCode: SUBJECT_LANGUAGES[subject.slug] ?? "en",
          // verified: false → never shown to students until the content team verifies it (no source recorded).
          catalogueStatus: "HIDDEN",
          isPublic: true,
          sortOrder,
          sourceId: null,
        },
        select: { id: true },
      }));
    tally.add("Subject", !existing);
    ids.subjects.set(`${qualificationKey}/${subject.slug}`, row.id);
  }

  for (const scheme of GRADE_SCHEMES) {
    const qualificationId = ids.qualifications.get(`${scheme.boardSlug}/${scheme.qualificationSlug}`);
    if (!qualificationId) continue;
    const existing = await db.gradeScheme.findFirst({ where: { qualificationId, name: scheme.name }, select: { id: true } });
    if (!existing) {
      const passIndex = scheme.bands.findIndex((band) => band.grade === scheme.passGrade);
      if (passIndex < 0) throw new Error(`catalogue: pass grade ${scheme.passGrade} missing from ${scheme.name}`);
      const hasDefault = await db.gradeScheme.findFirst({ where: { qualificationId, isDefault: true }, select: { id: true } });
      await db.gradeScheme.create({
        data: {
          qualificationId,
          name: scheme.name,
          version: 1,
          isDefault: !hasDefault,
          isEstimate: scheme.isEstimate,
          disclaimer: scheme.note,
          description: "Estimated grade bands for practice feedback only.",
          bands: {
            create: scheme.bands.map((band, sortOrder) => ({
              label: band.grade,
              minPercent: band.minPercent,
              sortOrder,
              isPass: sortOrder <= passIndex,
            })),
          },
        },
      });
    }
    tally.add("GradeScheme", !existing);
  }

  log.info(`catalogue: ${ids.countries.size} countries, ${ids.boards.size} boards, ${ids.qualifications.size} qualifications, ${ids.subjects.size} subjects`);
  return ids;
}
