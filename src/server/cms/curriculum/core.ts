/**
 * Pure rules of the curriculum CMS (§3, §4, §17, §26, §27; ARCHITECTURE §4.2, §4.3). No I/O: the services in this
 * folder load rows and delegate the decisions here, so the rules are unit tested in isolation (CLAUDE.md rule 2).
 *
 * - Slugs: SEO-safe slug generation and de-duplication.
 * - Topic trees: kind placement (SECTION → TOPIC → SUBTOPIC), sibling reordering, cycle checks, version cloning.
 * - Pasted outlines: indented text → nested topics + learning objectives (bulk entry of official structures).
 * - Syllabus versions: what blocks a publish (copyright, source, effective dates, empty tree).
 * - Subjects: the "verified" rule (an official list recorded as the subject's source) and catalogue status checks.
 * - Grade schemes: band validation (estimates, best grade first, every percentage covered).
 */
import type { CatalogueStatus, CopyrightStatus, SyllabusStatus, TopicKind } from "@/generated/prisma/enums";

/** Field path → messages (same shape as `FieldErrors` in src/server/lib/errors.ts; `_form` for form-level). */
export type Problems = Record<string, string[]>;

function addProblem(problems: Problems, key: string, message: string): void {
  (problems[key] ??= []).push(message);
}

// ---------------------------------------------------------------------------------------------------------------------
// Slugs (§44 public URLs)
// ---------------------------------------------------------------------------------------------------------------------

/** Maximum slug length accepted by the public URL resolver (`isValidCurriculumSlug`). */
export const MAX_SLUG_LENGTH = 120;

/**
 * Lower-case, hyphenated, ASCII slug for a name: diacritics are folded ("Ndebele – Isindebele" → "ndebele-isindebele"),
 * "&" becomes "and", anything else non-alphanumeric collapses to single hyphens. Truncated on a word boundary.
 * Returns "" when nothing usable is left (callers fall back to a default).
 */
export function slugify(input: string, maxLength = 80): string {
  const slug = input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (slug.length <= maxLength) return slug;
  const cut = slug.slice(0, maxLength);
  const lastHyphen = cut.lastIndexOf("-");
  return (lastHyphen > maxLength / 2 ? cut.slice(0, lastHyphen) : cut).replace(/-+$/g, "");
}

/** `base`, or `base-2`, `base-3`, … — the first candidate not in `taken`. */
export function dedupeSlug(base: string, taken: ReadonlySet<string>): string {
  const root = base === "" ? "topic" : base.slice(0, MAX_SLUG_LENGTH - 6).replace(/-+$/g, "");
  if (!taken.has(root)) return root;
  for (let n = 2; ; n += 1) {
    const candidate = `${root}-${n}`;
    if (!taken.has(candidate)) return candidate;
  }
}

/** Public URL of a curriculum node (ARCHITECTURE §3.3), for previews and slug-change warnings. */
export function publicCurriculumPath(...segments: (string | null | undefined)[]): string {
  return `/${segments.filter((segment): segment is string => typeof segment === "string" && segment !== "").join("/")}`;
}

// ---------------------------------------------------------------------------------------------------------------------
// Topic kinds and tree structure
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Where each kind may sit (Prisma `TopicKind` docs): SECTION groups topics (root or inside a SECTION); TOPIC nodes are
 * what dashboards list (root or inside a SECTION); SUBTOPIC nodes are any depth below a TOPIC. Returns an error
 * message, or null when the placement is valid.
 */
export function topicPlacementProblem(kind: TopicKind, parentKind: TopicKind | null): string | null {
  switch (kind) {
    case "SECTION":
      return parentKind === null || parentKind === "SECTION" ? null : "A section can only sit at the top level or inside another section.";
    case "TOPIC":
      return parentKind === null || parentKind === "SECTION" ? null : "A topic can only sit at the top level or inside a section. Use a subtopic here.";
    case "SUBTOPIC":
      return parentKind === "TOPIC" || parentKind === "SUBTOPIC" ? null : "A subtopic must sit inside a topic or another subtopic.";
  }
}

/** Placement problem for changing a node's kind, also checking its existing children. */
export function topicKindChangeProblem(kind: TopicKind, parentKind: TopicKind | null, childKinds: readonly TopicKind[]): string | null {
  const own = topicPlacementProblem(kind, parentKind);
  if (own) return own;
  for (const child of childKinds) {
    if (topicPlacementProblem(child, kind)) {
      return `This node has ${child.toLowerCase()} children that cannot sit inside a ${kind.toLowerCase()}. Move or change them first.`;
    }
  }
  return null;
}

/** Default kind for a new node under `parentKind` (top level: `topLevelKind`). */
export function defaultChildKind(parentKind: TopicKind | null, topLevelKind: "SECTION" | "TOPIC" = "TOPIC"): TopicKind {
  if (parentKind === null) return topLevelKind;
  return parentKind === "SECTION" ? "TOPIC" : "SUBTOPIC";
}

/**
 * New sibling order after moving `id` one step up or down. Returns null when the move is not possible (first/last
 * position, or `id` not among the siblings).
 */
export function reorderSiblings(orderedIds: readonly string[], id: string, direction: "up" | "down"): string[] | null {
  const index = orderedIds.indexOf(id);
  if (index < 0) return null;
  const target = direction === "up" ? index - 1 : index + 1;
  if (target < 0 || target >= orderedIds.length) return null;
  const next = [...orderedIds];
  next[index] = orderedIds[target] as string;
  next[target] = id;
  return next;
}

/** True when the node with `candidatePath` is `ancestorPath` itself or inside its subtree (materialised id paths). */
export function isSameOrDescendantPath(candidatePath: string, ancestorPath: string): boolean {
  return candidatePath === ancestorPath || candidatePath.startsWith(`${ancestorPath}/`);
}

/** Topic columns a version clone copies (the clone gets fresh ids, a rewritten path and lineage). */
export interface CloneSourceTopic {
  id: string;
  parentId: string | null;
  path: string;
  depth: number;
}

/** Ids of a cloned topic: its new id, new parent and rewritten materialised path. */
export interface ClonedTopicIds {
  sourceId: string;
  id: string;
  parentId: string | null;
  path: string;
  depth: number;
}

/**
 * Plans the ids of a version clone (§26: "create a new version" clones the tree with `originTopicId` lineage). Every
 * source node gets a fresh id from `newId`; parents and paths are rewritten through the same mapping, so the clone has
 * exactly the source's shape. Rows are returned parents-first (by depth), ready for ordered inserts.
 */
export function planTopicClone(topics: readonly CloneSourceTopic[], newId: () => string): ClonedTopicIds[] {
  const mapping = new Map<string, string>();
  for (const topic of topics) mapping.set(topic.id, newId());
  const mapId = (id: string): string => {
    const mapped = mapping.get(id);
    if (!mapped) throw new Error(`planTopicClone: ${id} is not part of the cloned tree`);
    return mapped;
  };
  return [...topics]
    .sort((a, b) => a.depth - b.depth)
    .map((topic) => ({
      sourceId: topic.id,
      id: mapId(topic.id),
      parentId: topic.parentId === null ? null : mapId(topic.parentId),
      path: topic.path.split("/").map(mapId).join("/"),
      depth: topic.depth,
    }));
}

// ---------------------------------------------------------------------------------------------------------------------
// Pasted outlines (bulk entry of official syllabus structures)
// ---------------------------------------------------------------------------------------------------------------------

export const MAX_OUTLINE_LINES = 1500;
export const MAX_OUTLINE_DEPTH = 6;
export const MAX_TOPIC_NAME_LENGTH = 200;
export const MAX_OBJECTIVE_LENGTH = 1000;
export const MAX_CODE_LENGTH = 32;

export interface OutlineObjective {
  line: number;
  code: string | null;
  statement: string;
}

export interface OutlineNode {
  line: number;
  code: string | null;
  name: string;
  kind: TopicKind;
  objectives: OutlineObjective[];
  children: OutlineNode[];
}

export interface OutlineParseOptions {
  /** Kind of the existing node the outline is inserted under (null = top level of the version). */
  parentKind?: TopicKind | null;
  /** Kind of top-level lines when inserting at the top level (default TOPIC). */
  topLevelKind?: "SECTION" | "TOPIC";
  /** Split a leading reference number ("1.2", "E1.1", "C3") off the name into `code` (default true). */
  detectCodes?: boolean;
}

export interface OutlineParseResult {
  roots: OutlineNode[];
  errors: { line: number; message: string }[];
  topicCount: number;
  objectiveCount: number;
  /** Deepest level in the outline (1 = flat list). */
  depth: number;
}

const BULLET = /^(?:[-*+•·▪◦–])\s+/;
const CODE_PREFIX = /^([A-Z]{0,3}\d{1,3}(?:\.\d{1,3}){0,4}[a-z]?)[.):]?\s+(\S.*)$/;

function indentWidth(line: string): number {
  let width = 0;
  for (const char of line) {
    if (char === " ") width += 1;
    else if (char === "\t") width += 4 - (width % 4);
    else break;
  }
  return width;
}

function splitCode(text: string, detect: boolean): { code: string | null; text: string } {
  if (!detect) return { code: null, text };
  const match = CODE_PREFIX.exec(text);
  if (!match || !match[1] || !match[2] || match[1].length > MAX_CODE_LENGTH) return { code: null, text };
  return { code: match[1], text: match[2].trim() };
}

function kindsFor(node: OutlineNode, parentKind: TopicKind | null, topLevelKind: "SECTION" | "TOPIC"): void {
  node.kind = defaultChildKind(parentKind, topLevelKind);
  for (const child of node.children) kindsFor(child, node.kind, topLevelKind);
}

/**
 * Parses an indented outline pasted from a (licensed) syllabus document into nested topics:
 *
 * ```
 * 1 Number                      ← top level (TOPIC, or SECTION when chosen; below a section: TOPIC)
 *   1.1 Integers                ← indented = child (SUBTOPIC)
 *     > Identify and use integers   ← "> " = learning objective of the topic it is indented under
 * ```
 *
 * Indentation is relative (spaces or tabs, any width), bullets ("-", "*", "•") are ignored, blank lines are skipped
 * and a leading reference number becomes the node's `code`. Lines that cannot be placed are reported with their line
 * number instead of being guessed.
 */
export function parseOutline(text: string, options: OutlineParseOptions = {}): OutlineParseResult {
  const parentKind = options.parentKind ?? null;
  const topLevelKind = options.topLevelKind ?? "TOPIC";
  const detectCodes = options.detectCodes ?? true;
  const errors: { line: number; message: string }[] = [];
  const roots: OutlineNode[] = [];
  const stack: { width: number; node: OutlineNode }[] = [];
  let topicCount = 0;
  let objectiveCount = 0;
  let depth = 0;

  const lines = text.replace(/\r\n?/g, "\n").split("\n");
  if (lines.length > MAX_OUTLINE_LINES) {
    return {
      roots: [],
      errors: [{ line: MAX_OUTLINE_LINES + 1, message: `Paste at most ${MAX_OUTLINE_LINES} lines at a time.` }],
      topicCount: 0,
      objectiveCount: 0,
      depth: 0,
    };
  }

  lines.forEach((raw, index) => {
    const lineNumber = index + 1;
    const line = raw.replace(/\s+$/, "");
    if (line.trim() === "") return;
    const width = indentWidth(line);
    const body = line.trimStart();

    if (body.startsWith(">")) {
      const { code, text: statement } = splitCode(body.slice(1).trim().replace(BULLET, ""), detectCodes);
      const owner = [...stack].reverse().find((entry) => entry.width < width) ?? [...stack].reverse().find((entry) => entry.width <= width);
      if (!owner) {
        errors.push({ line: lineNumber, message: "A learning objective (\"> …\") must be indented under a topic line." });
        return;
      }
      if (statement === "") {
        errors.push({ line: lineNumber, message: "The learning objective is empty." });
        return;
      }
      if (statement.length > MAX_OBJECTIVE_LENGTH) {
        errors.push({ line: lineNumber, message: `Learning objectives are limited to ${MAX_OBJECTIVE_LENGTH} characters.` });
        return;
      }
      owner.node.objectives.push({ line: lineNumber, code, statement });
      objectiveCount += 1;
      return;
    }

    while (stack.length > 0 && (stack[stack.length - 1] as { width: number }).width >= width) stack.pop();
    if (stack.length >= MAX_OUTLINE_DEPTH) {
      errors.push({ line: lineNumber, message: `Outlines can nest at most ${MAX_OUTLINE_DEPTH} levels deep.` });
      return;
    }
    const { code, text: name } = splitCode(body.replace(BULLET, "").trim(), detectCodes);
    if (name === "") {
      errors.push({ line: lineNumber, message: "The topic name is empty." });
      return;
    }
    if (name.length > MAX_TOPIC_NAME_LENGTH) {
      errors.push({ line: lineNumber, message: `Topic names are limited to ${MAX_TOPIC_NAME_LENGTH} characters.` });
      return;
    }
    const node: OutlineNode = { line: lineNumber, code, name, kind: "TOPIC", objectives: [], children: [] };
    const parent = stack[stack.length - 1];
    if (parent) parent.node.children.push(node);
    else roots.push(node);
    stack.push({ width, node });
    topicCount += 1;
    depth = Math.max(depth, stack.length);
  });

  for (const root of roots) kindsFor(root, parentKind, topLevelKind);
  if (topicCount === 0 && errors.length === 0) errors.push({ line: 1, message: "Paste at least one topic line." });
  return { roots, errors, topicCount, objectiveCount, depth };
}

/** Depth-first (pre-order) walk of an outline with each node's parent. */
export function walkOutline(roots: readonly OutlineNode[], visit: (node: OutlineNode, parent: OutlineNode | null) => void): void {
  const go = (node: OutlineNode, parent: OutlineNode | null): void => {
    visit(node, parent);
    for (const child of node.children) go(child, node);
  };
  for (const root of roots) go(root, null);
}

// ---------------------------------------------------------------------------------------------------------------------
// Syllabus versions (§26, §27)
// ---------------------------------------------------------------------------------------------------------------------

export type SyllabusPublishMode = "CURRENT" | "UPCOMING";

export interface SyllabusPublishCheck {
  status: SyllabusStatus;
  copyrightStatus: CopyrightStatus;
  sourceId: string | null;
  /** `YYYY-MM-DD`. */
  effectiveFrom: string;
  effectiveTo: string | null;
  topicCount: number;
  mode: SyllabusPublishMode;
  /** Today (`YYYY-MM-DD`, Africa/Harare). */
  today: string;
}

/**
 * What blocks publishing a syllabus version (mirrors the database CHECKs so editors see field-level reasons instead of
 * a constraint error): only DRAFTs publish; copyright must be cleared and a source named (§27, `Syllabus_copyright_chk`);
 * the effective window must be valid; the tree must not be empty; UPCOMING needs a future start date.
 */
export function syllabusPublishProblems(check: SyllabusPublishCheck): Problems {
  const problems: Problems = {};
  if (check.status !== "DRAFT") addProblem(problems, "_form", "Only draft versions can be published. Published versions are frozen.");
  if (check.copyrightStatus === "UNVERIFIED") {
    addProblem(problems, "copyrightStatus", "Clear the copyright status first: record why this structure may be used (§27).");
  }
  if (!check.sourceId) addProblem(problems, "sourceId", "Record the source of this structure (usually the board's official syllabus document).");
  if (check.effectiveTo !== null && check.effectiveTo <= check.effectiveFrom) {
    addProblem(problems, "effectiveTo", "The end date must be after the start date.");
  }
  if (check.topicCount === 0) addProblem(problems, "_form", "Add at least one topic before publishing.");
  if (check.mode === "UPCOMING" && check.effectiveFrom <= check.today) {
    addProblem(problems, "mode", "An upcoming version must start in the future. Publish it as the current version instead.");
  }
  return problems;
}

/** Statuses a version can be made CURRENT from (switching back to a superseded version is allowed). */
export const MAKE_CURRENT_FROM: readonly SyllabusStatus[] = ["UPCOMING", "SUPERSEDED"];

/** Statuses a version can be archived from. CURRENT must be replaced first (a subject keeps one current version). */
export const ARCHIVE_FROM: readonly SyllabusStatus[] = ["UPCOMING", "SUPERSEDED"];

/** Suggested label for a new version: the next free "<label> (revised)" style label. */
export function suggestVersionLabel(existing: readonly string[], base: string): string {
  const taken = new Set(existing.map((label) => label.toLowerCase()));
  const root = base.trim() === "" ? "New version" : `${base.trim()} (revision)`;
  if (!taken.has(root.toLowerCase())) return root.slice(0, 64);
  for (let n = 2; ; n += 1) {
    const candidate = `${root} ${n}`.slice(0, 64);
    if (!taken.has(candidate.toLowerCase())) return candidate;
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Catalogue status (§4, §50)
// ---------------------------------------------------------------------------------------------------------------------

/** A subject is "verified" once staff confirmed its name, code and availability against the board's official list and
 * recorded that list as the subject's ContentSource (docs/DEV_SEED.md: seeded subjects are HIDDEN with no source). */
export function isSubjectVerified(subject: { sourceId: string | null }): boolean {
  return subject.sourceId !== null;
}

export interface SubjectStatusCheck {
  target: CatalogueStatus;
  sourceId: string | null;
  /** The subject has a CURRENT syllabus version (students can only enrol into a published version). */
  hasCurrentSyllabus: boolean;
}

/**
 * What blocks a subject catalogue status: listing a subject (COMING_SOON / AVAILABLE) requires it to be verified
 * (an official source recorded); AVAILABLE (enrollable) also requires a CURRENT syllabus version.
 */
export function subjectStatusProblems(check: SubjectStatusCheck): Problems {
  const problems: Problems = {};
  if ((check.target === "COMING_SOON" || check.target === "AVAILABLE") && check.sourceId === null) {
    addProblem(
      problems,
      "catalogueStatus",
      "Verify the subject first: confirm its name and code against the board's official subject list and record that list as its source.",
    );
  }
  if (check.target === "AVAILABLE" && !check.hasCurrentSyllabus) {
    addProblem(problems, "catalogueStatus", "Publish a current syllabus version before making the subject available for enrolment.");
  }
  return problems;
}

// ---------------------------------------------------------------------------------------------------------------------
// Grade schemes (§12 grade ESTIMATES)
// ---------------------------------------------------------------------------------------------------------------------

export interface GradeBandInput {
  label: string;
  minPercent: number;
  isPass: boolean;
  description?: string | null;
}

export const MAX_GRADE_BANDS = 20;

/**
 * Band rules: 2–20 bands, best grade first; unique non-blank labels (≤ 8 chars); thresholds 0–100 with at most two
 * decimals, strictly decreasing, the last one 0 (every percentage maps to a band); at least one pass band, and pass
 * bands form an unbroken run from the top (no pass grade below a fail grade).
 */
export function gradeBandProblems(bands: readonly GradeBandInput[]): Problems {
  const problems: Problems = {};
  if (bands.length < 2) addProblem(problems, "bands", "Add at least two bands (for example a pass grade and U).");
  if (bands.length > MAX_GRADE_BANDS) addProblem(problems, "bands", `Use at most ${MAX_GRADE_BANDS} bands.`);
  const seen = new Set<string>();
  bands.forEach((band, index) => {
    const label = band.label.trim();
    if (label === "") addProblem(problems, `bands.${index}.label`, "Enter a grade label.");
    else if (label.length > 8) addProblem(problems, `bands.${index}.label`, "Grade labels are at most 8 characters.");
    else if (seen.has(label)) addProblem(problems, `bands.${index}.label`, `"${label}" is used twice.`);
    seen.add(label);
    if (!Number.isFinite(band.minPercent) || band.minPercent < 0 || band.minPercent > 100) {
      addProblem(problems, `bands.${index}.minPercent`, "Enter a percentage from 0 to 100.");
    } else if (Math.round(band.minPercent * 100) !== band.minPercent * 100) {
      addProblem(problems, `bands.${index}.minPercent`, "Use at most two decimal places.");
    }
    const previous = bands[index - 1];
    if (previous && Number.isFinite(previous.minPercent) && band.minPercent >= previous.minPercent) {
      addProblem(problems, `bands.${index}.minPercent`, "Each band must start below the band above it (best grade first).");
    }
  });
  const last = bands[bands.length - 1];
  if (last && last.minPercent !== 0) {
    addProblem(problems, `bands.${bands.length - 1}.minPercent`, "The lowest band must start at 0% so every score gets a grade.");
  }
  if (bands.length > 0 && !bands.some((band) => band.isPass)) addProblem(problems, "bands", "Mark at least one band as a pass.");
  const firstFail = bands.findIndex((band) => !band.isPass);
  if (firstFail >= 0 && bands.slice(firstFail).some((band) => band.isPass)) {
    addProblem(problems, "bands", "Pass bands must be the top bands: a pass grade cannot sit below a fail grade.");
  }
  return problems;
}

/** True when two band lists define the same boundaries (labels, thresholds, pass flags and order). */
export function sameGradeBands(a: readonly GradeBandInput[], b: readonly GradeBandInput[]): boolean {
  return (
    a.length === b.length &&
    a.every((band, index) => {
      const other = b[index];
      return (
        other !== undefined &&
        band.label.trim() === other.label.trim() &&
        band.minPercent === other.minPercent &&
        band.isPass === other.isPass &&
        (band.description ?? null) === (other.description ?? null)
      );
    })
  );
}

// ---------------------------------------------------------------------------------------------------------------------
// Exam sessions (§17)
// ---------------------------------------------------------------------------------------------------------------------

export type ExamSessionStatusValue = "DRAFT" | "PUBLISHED" | "CANCELLED" | "ARCHIVED";

/** Allowed exam-session status moves. Only PUBLISHED sessions feed onboarding and countdowns. */
export const EXAM_SESSION_TRANSITIONS: Readonly<Record<ExamSessionStatusValue, readonly ExamSessionStatusValue[]>> = {
  DRAFT: ["PUBLISHED", "ARCHIVED"],
  PUBLISHED: ["DRAFT", "CANCELLED", "ARCHIVED"],
  CANCELLED: ["PUBLISHED", "ARCHIVED"],
  ARCHIVED: [],
};

export function canMoveExamSession(from: ExamSessionStatusValue, to: ExamSessionStatusValue): boolean {
  return EXAM_SESSION_TRANSITIONS[from].includes(to);
}
