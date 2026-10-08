import "server-only";
import type { CatalogueStatus } from "@/generated/prisma/client";
import { db } from "@/server/db";
import { memoizeAsync } from "@/server/lib/cache";
import { isEnrollableCatalogueStatus, LISTED_CATALOGUE_STATUSES } from "./core";

/**
 * Catalogue reads for onboarding and public pages (§2, §4, §5; ARCHITECTURE §4.2): countries → boards offered in a
 * country → qualifications grouped by cross-board level → subjects of a qualification grouped by category.
 *
 * Only LISTED rows are returned (AVAILABLE and COMING_SOON; never HIDDEN or RETIRED), so unverified catalogue entries
 * (seeded HIDDEN) are never shown to students. `isEnrollable` tells the UI whether to show an honest "coming soon".
 *
 * Results are cached per process for {@link CATALOGUE_CACHE_TTL_MS} (ARCHITECTURE §3.8). Admin writes must call
 * {@link invalidateCatalogueCache}; other instances pick changes up within the TTL.
 */

export const CATALOGUE_CACHE_TTL_MS = 60_000;

const LISTED: { in: CatalogueStatus[] } = { in: [...LISTED_CATALOGUE_STATUSES] };

export interface CatalogueCountry {
  id: string;
  isoCode: string;
  name: string;
  slug: string;
  defaultCurrency: string;
  timezone: string;
  defaultLocale: string;
  dialCode: string | null;
  catalogueStatus: CatalogueStatus;
}

export interface CatalogueBoard {
  id: string;
  slug: string;
  code: string;
  name: string;
  shortName: string;
  description: string | null;
  websiteUrl: string | null;
  catalogueStatus: CatalogueStatus;
}

export interface CatalogueQualification {
  id: string;
  slug: string;
  code: string | null;
  name: string;
  shortName: string;
  description: string | null;
  catalogueStatus: CatalogueStatus;
  isEnrollable: boolean;
  board: { id: string; slug: string; shortName: string };
}

/** Qualifications of one cross-board level, e.g. "O-Level": ZIMSEC O-Level + Cambridge IGCSE (§5 "Level"). */
export interface QualificationLevelGroup {
  level: { id: string; slug: string; name: string; shortName: string | null };
  qualifications: CatalogueQualification[];
}

export interface CatalogueSubject {
  id: string;
  slug: string;
  name: string;
  shortName: string | null;
  officialCode: string | null;
  iconKey: string | null;
  languageCode: string;
  catalogueStatus: CatalogueStatus;
  /** False for COMING_SOON subjects: list them, but do not let students enrol yet (§50). */
  isEnrollable: boolean;
}

/** Subjects of one category (§4 groups: Mathematics, Sciences, Commercials, ...). */
export interface SubjectCategoryGroup {
  category: { id: string; slug: string; name: string; iconKey: string | null };
  subjects: CatalogueSubject[];
}

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
} as const;

const BOARD_SELECT = {
  id: true,
  slug: true,
  code: true,
  name: true,
  shortName: true,
  description: true,
  websiteUrl: true,
  catalogueStatus: true,
} as const;

/** Countries the platform serves (onboarding step 1), in admin order. */
export const listCountries = memoizeAsync(
  async (): Promise<CatalogueCountry[]> =>
    db.country.findMany({
      where: { catalogueStatus: LISTED },
      select: COUNTRY_SELECT,
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    }),
  { ttlMs: CATALOGUE_CACHE_TTL_MS, maxEntries: 4 },
);

/** Looks up a listed country by ISO 3166-1 alpha-2 code (case-insensitive), e.g. "ZW". */
export const getCountryByIsoCode = memoizeAsync(
  async (isoCode: string): Promise<CatalogueCountry | null> =>
    db.country.findFirst({
      where: { isoCode: isoCode.trim().toUpperCase(), catalogueStatus: LISTED },
      select: COUNTRY_SELECT,
    }),
  { ttlMs: CATALOGUE_CACHE_TTL_MS, maxEntries: 64 },
);

/** Examination boards offered in a country (onboarding step "Examination board"), in that country's order. */
export const listBoardsForCountry = memoizeAsync(
  async (countryId: string): Promise<CatalogueBoard[]> => {
    const links = await db.examBoardCountry.findMany({
      where: { countryId, isActive: true, examBoard: { catalogueStatus: LISTED } },
      select: { sortOrder: true, examBoard: { select: { ...BOARD_SELECT, sortOrder: true } } },
    });
    return links
      .sort(
        (a, b) =>
          a.sortOrder - b.sortOrder ||
          a.examBoard.sortOrder - b.examBoard.sortOrder ||
          a.examBoard.name.localeCompare(b.examBoard.name, "en"),
      )
      .map(({ examBoard }) => ({
        id: examBoard.id,
        slug: examBoard.slug,
        code: examBoard.code,
        name: examBoard.name,
        shortName: examBoard.shortName,
        description: examBoard.description,
        websiteUrl: examBoard.websiteUrl,
        catalogueStatus: examBoard.catalogueStatus,
      }));
  },
  { ttlMs: CATALOGUE_CACHE_TTL_MS, maxEntries: 64 },
);

export interface ListQualificationsOptions {
  /** Only boards offered in this country (default: every listed board). */
  countryId?: string | null;
  /** Only these boards (e.g. the board chosen in onboarding). */
  examBoardIds?: readonly string[] | null;
}

async function loadQualificationsByLevel(countryId: string | null, examBoardIds: readonly string[] | null): Promise<QualificationLevelGroup[]> {
  const rows = await db.qualification.findMany({
    where: {
      catalogueStatus: LISTED,
      examBoard: {
        catalogueStatus: LISTED,
        ...(countryId ? { countryLinks: { some: { countryId, isActive: true } } } : {}),
      },
      ...(examBoardIds ? { examBoardId: { in: [...examBoardIds] } } : {}),
      level: { isActive: true },
    },
    select: {
      id: true,
      slug: true,
      code: true,
      name: true,
      shortName: true,
      description: true,
      catalogueStatus: true,
      sortOrder: true,
      examBoard: { select: { id: true, slug: true, shortName: true, sortOrder: true } },
      level: { select: { id: true, slug: true, name: true, shortName: true, sortOrder: true } },
    },
  });

  const groups = new Map<string, { sortOrder: number; group: QualificationLevelGroup }>();
  const sorted = [...rows].sort(
    (a, b) =>
      a.examBoard.sortOrder - b.examBoard.sortOrder ||
      a.examBoard.shortName.localeCompare(b.examBoard.shortName, "en") ||
      a.sortOrder - b.sortOrder ||
      a.name.localeCompare(b.name, "en"),
  );
  for (const row of sorted) {
    let entry = groups.get(row.level.id);
    if (!entry) {
      const { sortOrder, ...level } = row.level;
      entry = { sortOrder, group: { level, qualifications: [] } };
      groups.set(row.level.id, entry);
    }
    entry.group.qualifications.push({
      id: row.id,
      slug: row.slug,
      code: row.code,
      name: row.name,
      shortName: row.shortName,
      description: row.description,
      catalogueStatus: row.catalogueStatus,
      isEnrollable: isEnrollableCatalogueStatus(row.catalogueStatus),
      board: { id: row.examBoard.id, slug: row.examBoard.slug, shortName: row.examBoard.shortName },
    });
  }
  return [...groups.values()]
    .sort((a, b) => a.sortOrder - b.sortOrder || a.group.level.name.localeCompare(b.group.level.name, "en"))
    .map((entry) => entry.group);
}

const qualificationsByLevel = memoizeAsync(loadQualificationsByLevel, {
  ttlMs: CATALOGUE_CACHE_TTL_MS,
  maxEntries: 128,
  key: (countryId, examBoardIds) => JSON.stringify([countryId, examBoardIds ? [...examBoardIds].sort() : null]),
});

/**
 * Qualifications grouped by cross-board level (§5 "Level"): e.g. `O-Level → [ZIMSEC O-Level, Cambridge IGCSE]`,
 * `A-Level → [ZIMSEC A-Level, Cambridge AS & A Level]`. Levels follow `QualificationLevel.sortOrder`; within a level,
 * qualifications follow board order.
 */
export function listQualificationsByLevel(options: ListQualificationsOptions = {}): Promise<QualificationLevelGroup[]> {
  return qualificationsByLevel(options.countryId ?? null, options.examBoardIds ?? null);
}

/**
 * Subjects offered under a qualification, grouped by category (§4) in category order; subjects sorted by
 * `sortOrder`, then name. Inactive categories are skipped.
 */
export const listSubjectsForQualification = memoizeAsync(
  async (qualificationId: string): Promise<SubjectCategoryGroup[]> => {
    const rows = await db.subject.findMany({
      where: { qualificationId, catalogueStatus: LISTED, category: { isActive: true } },
      select: {
        id: true,
        slug: true,
        name: true,
        shortName: true,
        officialCode: true,
        iconKey: true,
        languageCode: true,
        catalogueStatus: true,
        sortOrder: true,
        category: { select: { id: true, slug: true, name: true, iconKey: true, sortOrder: true } },
      },
    });
    const groups = new Map<string, { sortOrder: number; group: SubjectCategoryGroup }>();
    const sorted = [...rows].sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name, "en"));
    for (const row of sorted) {
      const { category } = row;
      let entry = groups.get(category.id);
      if (!entry) {
        const { sortOrder, ...rest } = category;
        entry = { sortOrder, group: { category: rest, subjects: [] } };
        groups.set(category.id, entry);
      }
      entry.group.subjects.push({
        id: row.id,
        slug: row.slug,
        name: row.name,
        shortName: row.shortName,
        officialCode: row.officialCode,
        iconKey: row.iconKey,
        languageCode: row.languageCode,
        catalogueStatus: row.catalogueStatus,
        isEnrollable: isEnrollableCatalogueStatus(row.catalogueStatus),
      });
    }
    return [...groups.values()]
      .sort((a, b) => a.sortOrder - b.sortOrder || a.group.category.name.localeCompare(b.group.category.name, "en"))
      .map((entry) => entry.group);
  },
  { ttlMs: CATALOGUE_CACHE_TTL_MS, maxEntries: 256 },
);

/** Drops every cached catalogue read on this instance (call after admin catalogue edits). */
export function invalidateCatalogueCache(): void {
  listCountries.clear();
  getCountryByIsoCode.clear();
  listBoardsForCountry.clear();
  qualificationsByLevel.clear();
  listSubjectsForQualification.clear();
}
