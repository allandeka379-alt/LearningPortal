/**
 * Pure shaping of catalogue rows for the public site (§2, §4, §44, §45): boards with their qualifications, cross-board
 * levels (O-Level / A-Level) and the subject directory grouped by category. Rows come from the DB (never hard-coded,
 * CLAUDE.md rule 5); this module only orders, groups and builds the public SEO URLs. Unit tested.
 */
import type { CatalogueStatus } from "@/generated/prisma/enums";
import { isAllowedBoardSlug, isValidCurriculumSlug } from "@/server/curriculum/core";

export interface BoardRow {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string | null;
  publicSummary: string | null;
  sortOrder: number;
}

export interface LevelRow {
  id: string;
  slug: string;
  name: string;
  shortName: string | null;
  sortOrder: number;
}

/** A listed qualification with its board and level (one DB row). */
export interface QualificationRow {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string | null;
  publicSummary: string | null;
  catalogueStatus: CatalogueStatus;
  sortOrder: number;
  board: BoardRow;
  level: LevelRow;
}

/** An AVAILABLE subject (one DB row). */
export interface SubjectRow {
  id: string;
  slug: string;
  name: string;
  isPublic: boolean;
  sortOrder: number;
  qualificationId: string;
  category: { id: string; slug: string; name: string; sortOrder: number };
}

export interface MarketingQualification {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  summary: string | null;
  /** COMING_SOON qualifications are listed with an honest "coming soon" (§50). */
  comingSoon: boolean;
  /** Public SEO page `/[board]/[qualification]`, or null when the slugs cannot form one. */
  href: string | null;
  board: { id: string; slug: string; shortName: string; name: string };
  level: { id: string; slug: string; name: string };
}

export interface MarketingBoard {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  summary: string | null;
  /** Public SEO page `/[board]`, or null for a slug that collides with a top-level route. */
  href: string | null;
  qualifications: MarketingQualification[];
}

export interface MarketingLevel {
  id: string;
  slug: string;
  name: string;
  qualifications: MarketingQualification[];
}

/** One subject as offered under one qualification ("Mathematics" under "ZIMSEC O-Level"). */
export interface SubjectOffering {
  subjectId: string;
  /** "ZIMSEC O-Level". */
  label: string;
  /** Public SEO page `/[board]/[qualification]/[subject]`; null when the subject has no public page. */
  href: string | null;
}

/** Subjects sharing a name across boards, e.g. Mathematics → ZIMSEC O-Level, Cambridge IGCSE. */
export interface SubjectEntry {
  name: string;
  offerings: SubjectOffering[];
}

export interface SubjectCategoryEntry {
  category: { id: string; slug: string; name: string };
  subjects: SubjectEntry[];
}

export interface QualificationSubjects {
  qualification: MarketingQualification;
  categories: { category: { id: string; slug: string; name: string }; subjects: { id: string; name: string; href: string | null }[] }[];
}

const byName = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name, "en");

export function boardHref(slug: string): string | null {
  return isAllowedBoardSlug(slug) ? `/${slug}` : null;
}

export function qualificationHref(boardSlug: string, qualificationSlug: string): string | null {
  return isAllowedBoardSlug(boardSlug) && isValidCurriculumSlug(qualificationSlug) ? `/${boardSlug}/${qualificationSlug}` : null;
}

export function subjectHref(boardSlug: string, qualificationSlug: string, subjectSlug: string): string | null {
  const base = qualificationHref(boardSlug, qualificationSlug);
  return base && isValidCurriculumSlug(subjectSlug) ? `${base}/${subjectSlug}` : null;
}

/** "ZIMSEC O-Level", "Cambridge IGCSE": the board's short name unless the qualification already starts with it. */
export function qualificationLabel(boardShortName: string, qualificationShortName: string): string {
  return qualificationShortName.toLowerCase().startsWith(boardShortName.toLowerCase())
    ? qualificationShortName
    : `${boardShortName} ${qualificationShortName}`;
}

function toQualification(row: QualificationRow): MarketingQualification {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    shortName: row.shortName,
    summary: row.publicSummary ?? row.description,
    comingSoon: row.catalogueStatus !== "AVAILABLE",
    href: qualificationHref(row.board.slug, row.slug),
    board: { id: row.board.id, slug: row.board.slug, shortName: row.board.shortName, name: row.board.name },
    level: { id: row.level.id, slug: row.level.slug, name: row.level.name },
  };
}

/** Qualification rows in board order, then qualification order. */
function sortQualifications(rows: readonly QualificationRow[]): QualificationRow[] {
  return [...rows].sort(
    (a, b) =>
      a.board.sortOrder - b.board.sortOrder ||
      a.board.name.localeCompare(b.board.name, "en") ||
      a.level.sortOrder - b.level.sortOrder ||
      a.sortOrder - b.sortOrder ||
      byName(a, b),
  );
}

/** Boards (admin order) with their listed qualifications. */
export function groupBoards(rows: readonly QualificationRow[]): MarketingBoard[] {
  const boards = new Map<string, MarketingBoard>();
  for (const row of sortQualifications(rows)) {
    let board = boards.get(row.board.id);
    if (!board) {
      board = {
        id: row.board.id,
        slug: row.board.slug,
        name: row.board.name,
        shortName: row.board.shortName,
        summary: row.board.publicSummary ?? row.board.description,
        href: boardHref(row.board.slug),
        qualifications: [],
      };
      boards.set(row.board.id, board);
    }
    board.qualifications.push(toQualification(row));
  }
  return [...boards.values()];
}

/** Cross-board levels (O-Level, A-Level, ...) in level order, each with its qualifications in board order. */
export function groupLevels(rows: readonly QualificationRow[]): MarketingLevel[] {
  const levels = new Map<string, { sortOrder: number; level: MarketingLevel }>();
  for (const row of sortQualifications(rows)) {
    let entry = levels.get(row.level.id);
    if (!entry) {
      entry = { sortOrder: row.level.sortOrder, level: { id: row.level.id, slug: row.level.slug, name: row.level.name, qualifications: [] } };
      levels.set(row.level.id, entry);
    }
    entry.level.qualifications.push(toQualification(row));
  }
  return [...levels.values()].sort((a, b) => a.sortOrder - b.sortOrder || byName(a.level, b.level)).map((entry) => entry.level);
}

function categoryOrder(a: SubjectRow["category"], b: SubjectRow["category"]): number {
  return a.sortOrder - b.sortOrder || byName(a, b);
}

/**
 * The subject directory (§4 groups): categories in admin order; within a category, subjects merged by name across
 * qualifications (A–Z), each listing where it is offered in board order. Subjects whose qualification is not in
 * `qualifications` are dropped (their board or qualification is not listed).
 */
export function groupSubjectsByCategory(qualifications: readonly QualificationRow[], subjects: readonly SubjectRow[]): SubjectCategoryEntry[] {
  const quals = new Map(sortQualifications(qualifications).map((row, index) => [row.id, { row, index }]));
  const categories = new Map<string, { category: SubjectRow["category"]; subjects: Map<string, { name: string; offerings: (SubjectOffering & { order: number })[] }> }>();

  for (const subject of subjects) {
    const qual = quals.get(subject.qualificationId);
    if (!qual) continue;
    let category = categories.get(subject.category.id);
    if (!category) {
      category = { category: subject.category, subjects: new Map() };
      categories.set(subject.category.id, category);
    }
    const key = subject.name.trim().toLowerCase();
    let entry = category.subjects.get(key);
    if (!entry) {
      entry = { name: subject.name.trim(), offerings: [] };
      category.subjects.set(key, entry);
    }
    entry.offerings.push({
      subjectId: subject.id,
      label: qualificationLabel(qual.row.board.shortName, qual.row.shortName),
      href: subject.isPublic ? subjectHref(qual.row.board.slug, qual.row.slug, subject.slug) : null,
      order: qual.index,
    });
  }

  return [...categories.values()]
    .sort((a, b) => categoryOrder(a.category, b.category))
    .map(({ category, subjects: entries }) => ({
      category: { id: category.id, slug: category.slug, name: category.name },
      subjects: [...entries.values()].sort(byName).map((entry) => ({
        name: entry.name,
        offerings: entry.offerings
          .sort((a, b) => a.order - b.order)
          .map((offering) => ({ subjectId: offering.subjectId, label: offering.label, href: offering.href })),
      })),
    }));
}

/** Subjects per qualification (board and qualification order), grouped by category, for the /subjects directory. */
export function groupSubjectsByQualification(qualifications: readonly QualificationRow[], subjects: readonly SubjectRow[]): QualificationSubjects[] {
  return sortQualifications(qualifications).map((row) => {
    const own = subjects.filter((s) => s.qualificationId === row.id);
    const categories = new Map<string, { category: SubjectRow["category"]; subjects: { id: string; name: string; sortOrder: number; href: string | null }[] }>();
    for (const subject of own) {
      let entry = categories.get(subject.category.id);
      if (!entry) {
        entry = { category: subject.category, subjects: [] };
        categories.set(subject.category.id, entry);
      }
      entry.subjects.push({
        id: subject.id,
        name: subject.name,
        sortOrder: subject.sortOrder,
        href: subject.isPublic ? subjectHref(row.board.slug, row.slug, subject.slug) : null,
      });
    }
    return {
      qualification: toQualification(row),
      categories: [...categories.values()]
        .sort((a, b) => categoryOrder(a.category, b.category))
        .map(({ category, subjects: list }) => ({
          category: { id: category.id, slug: category.slug, name: category.name },
          subjects: list
            .sort((a, b) => a.sortOrder - b.sortOrder || byName(a, b))
            .map((subject) => ({ id: subject.id, name: subject.name, href: subject.href })),
        })),
    };
  });
}
