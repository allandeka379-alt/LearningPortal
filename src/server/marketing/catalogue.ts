import "server-only";
import type { CatalogueStatus } from "@/generated/prisma/client";
import { LISTED_CATALOGUE_STATUSES } from "@/server/curriculum/core";
import { db, type DbClient } from "@/server/db";
import {
  groupBoards,
  groupLevels,
  groupSubjectsByCategory,
  groupSubjectsByQualification,
  type MarketingBoard,
  type MarketingLevel,
  type QualificationRow,
  type QualificationSubjects,
  type SubjectCategoryEntry,
  type SubjectRow,
} from "./catalogue-core";

/**
 * Catalogue reads for the public marketing site (§45 boards, levels and subjects sections; /subjects). Public pages are
 * statically rendered and revalidated (ISR), so these run once per regeneration, not per visitor.
 *
 * Visibility: only LISTED boards and qualifications (AVAILABLE, COMING_SOON), and only AVAILABLE subjects ("only
 * catalogue-available subjects"); HIDDEN catalogue entries (unverified seeds) and RETIRED rows never appear.
 */

const LISTED: { in: CatalogueStatus[] } = { in: [...LISTED_CATALOGUE_STATUSES] };

const QUALIFICATION_SELECT = {
  id: true,
  slug: true,
  name: true,
  shortName: true,
  description: true,
  publicSummary: true,
  catalogueStatus: true,
  sortOrder: true,
  examBoard: { select: { id: true, slug: true, name: true, shortName: true, description: true, publicSummary: true, sortOrder: true } },
  level: { select: { id: true, slug: true, name: true, shortName: true, sortOrder: true } },
} as const;

/** Generous safety cap: a real catalogue has tens of qualifications; the page must never grow without bound. */
const MAX_QUALIFICATIONS = 500;

/**
 * Restricts catalogue reads to some examination boards (e.g. a country's boards, or one board's own page). Omitted =
 * every listed board.
 */
export interface CatalogueScope {
  examBoardIds?: readonly string[];
}

/** Listed qualifications of listed boards (active levels only), as pure-core rows, in board and admin order. */
export async function loadListedQualifications(scope: CatalogueScope = {}, client: DbClient = db): Promise<QualificationRow[]> {
  const rows = await client.qualification.findMany({
    where: {
      catalogueStatus: LISTED,
      examBoard: { catalogueStatus: LISTED },
      level: { isActive: true },
      ...(scope.examBoardIds ? { examBoardId: { in: [...scope.examBoardIds] } } : {}),
    },
    select: QUALIFICATION_SELECT,
    orderBy: [{ examBoard: { sortOrder: "asc" } }, { sortOrder: "asc" }, { name: "asc" }],
    take: MAX_QUALIFICATIONS,
  });
  return rows.map(({ examBoard, ...row }) => ({ ...row, board: examBoard }));
}

/** AVAILABLE subjects (active categories) of the given qualifications. */
export async function loadAvailableSubjects(qualificationIds: readonly string[], client: DbClient = db): Promise<SubjectRow[]> {
  if (qualificationIds.length === 0) return [];
  return client.subject.findMany({
    where: { qualificationId: { in: [...qualificationIds] }, catalogueStatus: "AVAILABLE", category: { isActive: true } },
    select: {
      id: true,
      slug: true,
      name: true,
      isPublic: true,
      sortOrder: true,
      qualificationId: true,
      category: { select: { id: true, slug: true, name: true, sortOrder: true } },
    },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    take: 2_000,
  });
}

export interface MarketingCatalogue {
  boards: MarketingBoard[];
  levels: MarketingLevel[];
  /** The subject directory by category (cross-board), for the home page. */
  subjectsByCategory: SubjectCategoryEntry[];
  /** Subjects per qualification, for /subjects. */
  subjectsByQualification: QualificationSubjects[];
}

/** Everything the public catalogue sections need, in two queries. */
export async function getMarketingCatalogue(scope: CatalogueScope = {}, client: DbClient = db): Promise<MarketingCatalogue> {
  const qualifications = await loadListedQualifications(scope, client);
  const subjects = await loadAvailableSubjects(
    qualifications.map((q) => q.id),
    client,
  );
  return {
    boards: groupBoards(qualifications),
    levels: groupLevels(qualifications),
    subjectsByCategory: groupSubjectsByCategory(qualifications, subjects),
    subjectsByQualification: groupSubjectsByQualification(qualifications, subjects),
  };
}
