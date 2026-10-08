/**
 * Pure curriculum rules (§3, §26, §44; ARCHITECTURE §4.2, §4.3). No I/O: the DB modules in this folder load rows and
 * delegate the decisions here, so the rules are unit tested in isolation.
 *
 * - Catalogue visibility: which `CatalogueStatus` values are listed to students, and which are enrollable.
 * - Syllabus versions: which statuses count as "published", and which version a new enrolment should pin for a
 *   target exam date.
 * - Topic trees: nesting flat Topic rows (materialised path + depth) into an ordered tree.
 * - Public URLs: slug format and the top-level route names a board slug may never take.
 */
import type { CatalogueStatus, SyllabusStatus, TopicKind } from "@/generated/prisma/enums";

// ---------------------------------------------------------------------------------------------------------------------
// Catalogue visibility
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Catalogue statuses shown to students (onboarding, public pages). COMING_SOON is listed honestly as "coming soon"
 * (§50); HIDDEN (e.g. an unverified catalogue entry) and RETIRED never are.
 */
export const LISTED_CATALOGUE_STATUSES = ["AVAILABLE", "COMING_SOON"] as const satisfies readonly CatalogueStatus[];

/** True when a catalogue row may be shown to students. */
export function isListedCatalogueStatus(status: CatalogueStatus): boolean {
  return (LISTED_CATALOGUE_STATUSES as readonly CatalogueStatus[]).includes(status);
}

/** True when students may enrol (only AVAILABLE; COMING_SOON is listed but not usable yet). */
export function isEnrollableCatalogueStatus(status: CatalogueStatus): boolean {
  return status === "AVAILABLE";
}

// ---------------------------------------------------------------------------------------------------------------------
// Syllabus versions (§26)
// ---------------------------------------------------------------------------------------------------------------------

/** Every status except DRAFT means "published": the version's structure is frozen and students may see it. */
export const PUBLISHED_SYLLABUS_STATUSES = ["UPCOMING", "CURRENT", "SUPERSEDED", "ARCHIVED"] as const satisfies readonly SyllabusStatus[];

/** Published versions that may take NEW enrolments (ARCHIVED versions keep their pinned students only). */
export const ENROLLABLE_SYLLABUS_STATUSES = ["UPCOMING", "CURRENT", "SUPERSEDED"] as const satisfies readonly SyllabusStatus[];

/** True for every non-DRAFT status. */
export function isPublishedSyllabusStatus(status: SyllabusStatus): boolean {
  return status !== "DRAFT";
}

/** The fields {@link selectSyllabusVersion} needs. Dates are `YYYY-MM-DD` calendar dates (DATE columns). */
export interface SyllabusVersionCandidate {
  id: string;
  status: SyllabusStatus;
  effectiveFrom: string;
  /** null = open-ended. */
  effectiveTo: string | null;
}

const STATUS_PREFERENCE: Readonly<Record<SyllabusStatus, number>> = {
  CURRENT: 0,
  UPCOMING: 1,
  SUPERSEDED: 2,
  ARCHIVED: 3,
  DRAFT: 4,
};

/**
 * Chooses the syllabus version a NEW enrolment should pin (ARCHITECTURE §4.3 "Enrolment picks the version whose range
 * contains the student's ExamSession.startsOn").
 *
 * - Only enrollable versions (UPCOMING, CURRENT, SUPERSEDED) are considered; DRAFT and ARCHIVED never are.
 * - Without a date: the CURRENT version (exactly one per subject, partial unique index).
 * - With a date: the version whose effective range contains it (`effectiveFrom <= at <= effectiveTo`, open-ended when
 *   `effectiveTo` is null). When several overlap, CURRENT wins, then UPCOMING, then SUPERSEDED, then the latest
 *   `effectiveFrom`. When none contains the date, falls back to the CURRENT version.
 *
 * Returns null when there is no suitable version (the subject has no published syllabus yet).
 */
export function selectSyllabusVersion<T extends SyllabusVersionCandidate>(versions: readonly T[], at?: string | null): T | null {
  const enrollable = versions.filter((v) => (ENROLLABLE_SYLLABUS_STATUSES as readonly SyllabusStatus[]).includes(v.status));
  const current = enrollable.find((v) => v.status === "CURRENT") ?? null;
  if (at === undefined || at === null) return current;
  const containing = enrollable.filter((v) => v.effectiveFrom <= at && (v.effectiveTo === null || at <= v.effectiveTo));
  if (containing.length === 0) return current;
  return [...containing].sort(
    (a, b) =>
      STATUS_PREFERENCE[a.status] - STATUS_PREFERENCE[b.status] ||
      (a.effectiveFrom < b.effectiveFrom ? 1 : a.effectiveFrom > b.effectiveFrom ? -1 : 0) ||
      (a.id < b.id ? -1 : a.id > b.id ? 1 : 0),
  )[0] as T;
}

// ---------------------------------------------------------------------------------------------------------------------
// Topic trees
// ---------------------------------------------------------------------------------------------------------------------

/** The Topic columns the tree builder needs (plus anything else the caller selected, carried through unchanged). */
export interface TopicRowLike {
  id: string;
  parentId: string | null;
  kind: TopicKind;
  depth: number;
  /** Materialised path: ancestor ids and the node's own id joined by "/". */
  path: string;
  sortOrder: number;
  code: string | null;
  name: string;
}

/** A tree node: the row plus its ordered children. */
export type TopicTreeNode<T extends TopicRowLike> = T & { children: TopicTreeNode<T>[] };

function compareSiblings(a: TopicRowLike, b: TopicRowLike): number {
  return (
    a.sortOrder - b.sortOrder ||
    (a.code ?? "").localeCompare(b.code ?? "", "en", { numeric: true }) ||
    a.name.localeCompare(b.name, "en") ||
    (a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
  );
}

/**
 * Nests flat topic rows of ONE syllabus version into an ordered tree. Rows are attached by the parent id taken from
 * the materialised path (which the database keeps consistent with `parentId` and `depth`); siblings are ordered by
 * `sortOrder`, then official code (numeric-aware: "2" before "10"), then name.
 *
 * A row whose parent is missing from the input (e.g. a filtered-out non-public parent) is dropped together with its
 * subtree, so a filter on the rows never promotes a child to the top level.
 */
export function buildTopicTree<T extends TopicRowLike>(rows: readonly T[]): TopicTreeNode<T>[] {
  const nodes = new Map<string, TopicTreeNode<T>>();
  for (const row of rows) nodes.set(row.id, { ...row, children: [] });

  const roots: TopicTreeNode<T>[] = [];
  // Parents before children: depth order guarantees the parent is attached (or dropped) first.
  const byDepth = [...nodes.values()].sort((a, b) => a.depth - b.depth);
  const attached = new Set<string>();
  for (const node of byDepth) {
    const segments = node.path.split("/");
    const parentId = segments.length >= 2 ? segments[segments.length - 2] : (node.parentId ?? undefined);
    if (parentId === undefined) {
      roots.push(node);
      attached.add(node.id);
      continue;
    }
    const parent = nodes.get(parentId);
    if (parent && attached.has(parent.id)) {
      parent.children.push(node);
      attached.add(node.id);
    }
  }

  const sortRecursive = (list: TopicTreeNode<T>[]): void => {
    list.sort(compareSiblings);
    for (const item of list) sortRecursive(item.children);
  };
  sortRecursive(roots);
  return roots;
}

/** Depth-first (pre-order) flattening of a tree, e.g. for a select box or a sitemap. */
export function flattenTopicTree<T extends TopicRowLike>(roots: readonly TopicTreeNode<T>[]): TopicTreeNode<T>[] {
  const out: TopicTreeNode<T>[] = [];
  const visit = (node: TopicTreeNode<T>): void => {
    out.push(node);
    for (const child of node.children) visit(child);
  };
  for (const root of roots) visit(root);
  return out;
}

/** Ancestor ids of a node from its materialised path, root first (excluding the node itself). */
export function ancestorIdsFromPath(path: string): string[] {
  const segments = path.split("/").filter((s) => s !== "");
  return segments.slice(0, -1);
}

// ---------------------------------------------------------------------------------------------------------------------
// Public URLs (§44, ARCHITECTURE §3.3)
// ---------------------------------------------------------------------------------------------------------------------

/** Board, qualification, subject and topic slugs: lower-case words joined by single hyphens. */
export const CURRICULUM_SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** First URL segments taken by app routes; a board slug may never collide with them (ARCHITECTURE §3.3). */
export const RESERVED_TOP_LEVEL_SLUGS: ReadonlySet<string> = new Set([
  "app",
  "admin",
  "api",
  "parent",
  "teacher",
  "school",
  "schools",
  "onboarding",
  "login",
  "register",
  "verify",
  "forgot-password",
  "reset-password",
  "pricing",
  "about",
  "faq",
  "legal",
  "share",
  "daily",
  "study-packs",
  "invite",
  "dev",
  "offline",
  "s",
  "r",
  "billing",
  "exam-countdown",
  "subjects",
  "guides",
  "search",
  "sitemap",
  "change-password",
  "change-email",
  "opengraph-image",
  "twitter-image",
  "icon",
  "apple-icon",
  "manifest",
]);

/** True when `slug` is well formed. */
export function isValidCurriculumSlug(slug: string): boolean {
  return slug.length > 0 && slug.length <= 120 && CURRICULUM_SLUG_PATTERN.test(slug);
}

/** True when `slug` can be used as a board slug (well formed and not a reserved top-level route). */
export function isAllowedBoardSlug(slug: string): boolean {
  return isValidCurriculumSlug(slug) && !RESERVED_TOP_LEVEL_SLUGS.has(slug);
}
