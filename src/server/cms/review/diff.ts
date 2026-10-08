/**
 * Readable, field-level diffs between two ContentRevision-style snapshots (the review queue compares the item under
 * review with the last PUBLISHED revision; the history page compares consecutive revisions). Pure: no I/O. Ids are
 * shown through a `labels` map the service loads in batch (topic names, question excerpts, source names…).
 *
 * Snapshot shapes come from `buildSnapshot` in src/server/content/publish.ts (LESSON `{ lesson, topics, objectives,
 * questions }`, FLASHCARD `{ flashcard, topics }`, QUESTION `{ question, options, parts, topics, objectives }`,
 * ASSESSMENT `{ assessment, sections, topics }`, STUDY_PACK `{ studyPack, scopes }`, STUDY_PLAN_TEMPLATE
 * `{ template, items }`).
 */

export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
export type JsonObject = { [key: string]: Json };

export type DiffEntityType = "LESSON" | "QUESTION" | "FLASHCARD" | "ASSESSMENT" | "STUDY_PACK" | "STUDY_PLAN_TEMPLATE";

export interface LineChange {
  kind: "same" | "add" | "del";
  text: string;
}

export type DisplayLine = LineChange | { kind: "skip"; count: number };

export interface DiffEntry {
  /** Stable path, e.g. "lesson.body", "options.A.content", "topics". */
  path: string;
  /** Human label, e.g. "Body", "Option A · Content", "Topics". */
  label: string;
  change: "added" | "removed" | "changed";
  before: string | null;
  after: string | null;
  /** Line-by-line comparison (with unchanged runs collapsed) for multi-line or long values. */
  lines?: DisplayLine[];
}

/** id → readable label (topics, objectives, questions, lessons, subjects, sources, syllabuses). */
export type SnapshotLabels = ReadonlyMap<string, string>;

/** Workflow bookkeeping and foreign keys to the parent row: never shown as content changes. */
const IGNORED_COLUMNS: ReadonlySet<string> = new Set([
  "id",
  "createdAt",
  "updatedAt",
  "status",
  "revision",
  "draftOfId",
  "createdById",
  "reviewedById",
  "reviewedAt",
  "reviewNotes",
  "approvedById",
  "approvedAt",
  "publishedAt",
  "archivedAt",
  "generationJobId",
  "importId",
  "externalRef",
  "questionId",
  "parentId",
  "lessonId",
  "flashcardId",
  "sectionId",
  "assessmentId",
  "studyPackId",
  "templateId",
  "schoolId",
  "ownerUserId",
]);

/** Columns holding ids that the labels map can name. */
const LABELLED_ID_COLUMNS: ReadonlySet<string> = new Set([
  "subjectId",
  "qualificationId",
  "examBoardId",
  "sourceId",
  "relatedLessonId",
  "syllabusId",
  "routeId",
  "gradeSchemeId",
  "coverImageId",
  "mediaAssetId",
  "topicId",
  "objectiveId",
  "componentId",
]);

const ROOT_KEYS: Readonly<Record<DiffEntityType, string>> = {
  LESSON: "lesson",
  QUESTION: "question",
  FLASHCARD: "flashcard",
  ASSESSMENT: "assessment",
  STUDY_PACK: "studyPack",
  STUDY_PLAN_TEMPLATE: "template",
};

const ROOT_NAMES: ReadonlySet<string> = new Set(Object.values(ROOT_KEYS));

const FIELD_LABELS: Readonly<Record<string, string>> = {
  body: "Body",
  summary: "Summary",
  title: "Title",
  slug: "Slug",
  kind: "Kind",
  metaTitle: "SEO title",
  metaDescription: "SEO description",
  accessTier: "Access",
  estimatedMinutes: "Estimated minutes",
  estimatedSeconds: "Estimated seconds",
  languageCode: "Language",
  copyrightStatus: "Copyright status",
  licenceCode: "Licence",
  sourceId: "Source",
  sourceUrl: "Source URL",
  publicationDate: "Publication date",
  attribution: "Attribution",
  author: "Author",
  subjectId: "Subject",
  qualificationId: "Qualification",
  examBoardId: "Exam board",
  cardType: "Card type",
  front: "Front",
  back: "Back",
  notes: "Notes",
  stem: "Question",
  payload: "Presentation data",
  answerSpec: "Answer / mark scheme",
  explanation: "Explanation",
  workedSolution: "Worked solution",
  hints: "Hints",
  conceptSummary: "Concept summary",
  relatedLessonId: "Related lesson",
  difficulty: "Difficulty",
  marks: "Marks",
  isCorrect: "Correct",
  rationale: "Rationale",
  content: "Content",
  aiGenerated: "AI-generated",
  isDemo: "Demo data",
  topics: "Topics",
  objectives: "Learning objectives",
  questions: "Practice questions",
  items: "Items",
  rules: "Blueprint rules",
  scopes: "Scope",
  instructions: "Instructions",
  description: "Description",
  totalMarks: "Total marks",
  timeLimitSeconds: "Time limit (seconds)",
};

function humanize(segment: string): string {
  if (FIELD_LABELS[segment]) return FIELD_LABELS[segment];
  const words = segment.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_.]+/g, " ").trim().toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/** "lesson.metaTitle" → "SEO title"; "options.A.content" → "Option A · Content"; "parts.(a).marks" → "Part (a) · Marks". */
export function labelForPath(path: string): string {
  const segments = path.split(".");
  if (segments.length > 1 && ROOT_NAMES.has(segments[0] ?? "")) segments.shift();
  const out: string[] = [];
  for (let i = 0; i < segments.length; i += 1) {
    const segment = segments[i] ?? "";
    const noun = segment === "options" ? "Option" : segment === "parts" ? "Part" : segment === "sections" ? "Section" : null;
    const next = segments[i + 1];
    if (noun !== null && next !== undefined) {
      out.push(`${noun} ${next}`);
      i += 1;
      continue;
    }
    out.push(humanize(segment));
  }
  return out.join(" · ");
}

function stableStringify(value: Json, indent = 0): string {
  const pad = "  ".repeat(indent);
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return `[\n${value.map((item) => `${pad}  ${stableStringify(item, indent + 1)}`).join(",\n")}\n${pad}]`;
  }
  const keys = Object.keys(value).sort();
  if (keys.length === 0) return "{}";
  return `{\n${keys.map((key) => `${pad}  ${JSON.stringify(key)}: ${stableStringify(value[key] as Json, indent + 1)}`).join(",\n")}\n${pad}}`;
}

/** A leaf value as display text (`null` for empty). Ids in labelled columns are replaced by their label. */
function display(key: string, value: Json, labels: SnapshotLabels): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return String(value);
  if (typeof value === "string") {
    if (value === "") return null;
    if (LABELLED_ID_COLUMNS.has(key)) return labels.get(value) ?? value;
    if (/^\d{4}-\d{2}-\d{2}T00:00:00(\.000)?Z$/.test(value)) return value.slice(0, 10);
    return value;
  }
  if (Array.isArray(value) && value.every((item) => typeof item === "string")) {
    return value.length === 0 ? null : (value as string[]).join("\n");
  }
  return stableStringify(value);
}

function isObject(value: Json | undefined): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asArray(value: Json | undefined): Json[] {
  return Array.isArray(value) ? value : [];
}

function flattenRow(prefix: string, row: Json | undefined, out: Map<string, string | null>, labels: SnapshotLabels, skip: ReadonlySet<string> = new Set()): void {
  if (!isObject(row)) return;
  for (const [key, value] of Object.entries(row)) {
    if (IGNORED_COLUMNS.has(key) || skip.has(key)) continue;
    out.set(`${prefix}${key}`, display(key, value, labels));
  }
}

function label(labels: SnapshotLabels, id: unknown): string {
  return typeof id === "string" ? (labels.get(id) ?? id) : String(id);
}

/** Tag rows (`{ topicId, isPrimary }`) as sorted display lines. */
function tagLines(tags: Json | undefined, labels: SnapshotLabels): string | null {
  const lines = asArray(tags)
    .filter(isObject)
    .map((tag) => `${label(labels, tag.topicId)}${tag.isPrimary === true ? " (primary)" : ""}`)
    .sort((a, b) => a.localeCompare(b));
  return lines.length === 0 ? null : lines.join("\n");
}

function idLines(ids: Json | undefined, labels: SnapshotLabels): string | null {
  const lines = asArray(ids)
    .map((id) => label(labels, id))
    .sort((a, b) => a.localeCompare(b));
  return lines.length === 0 ? null : lines.join("\n");
}

function orderedLines(rows: Json | undefined, render: (row: JsonObject, index: number) => string): string | null {
  const lines = asArray(rows).filter(isObject).map(render);
  return lines.length === 0 ? null : lines.join("\n");
}

function flattenQuestion(prefix: string, question: JsonObject, options: Json | undefined, parts: Json | undefined, out: Map<string, string | null>, labels: SnapshotLabels): void {
  flattenRow(prefix, question, out, labels, new Set(["options", "parts", "partOrder"]));
  for (const option of asArray(options).filter(isObject)) {
    flattenRow(`${prefix === "question." ? "" : prefix}options.${String(option.key)}.`, option, out, labels, new Set(["key"]));
  }
  asArray(parts)
    .filter(isObject)
    .forEach((part, index) => {
      const partLabel = typeof part.partLabel === "string" && part.partLabel !== "" ? part.partLabel.replace(/\./g, "-") : String(index + 1);
      const partPrefix = `${prefix === "question." ? "" : prefix}parts.${partLabel}.`;
      flattenQuestion(partPrefix, part, part.options, part.parts, out, labels);
    });
}

/**
 * Flattens a snapshot into ordered `path → display text` pairs (null = empty). Tag lists, attached questions, items
 * and scopes become one multi-line value each, so adding or removing a tag reads as an added / removed line.
 */
export function flattenSnapshot(entityType: DiffEntityType, snapshot: JsonObject, labels: SnapshotLabels = new Map()): Map<string, string | null> {
  const out = new Map<string, string | null>();
  const root = ROOT_KEYS[entityType];
  switch (entityType) {
    case "LESSON":
      flattenRow(`${root}.`, snapshot.lesson, out, labels);
      out.set("topics", tagLines(snapshot.topics, labels));
      out.set("objectives", idLines(snapshot.objectives, labels));
      out.set("questions", orderedLines(snapshot.questions, (row, i) => `${i + 1}. ${label(labels, row.questionId)}`));
      break;
    case "FLASHCARD":
      flattenRow(`${root}.`, snapshot.flashcard, out, labels);
      out.set("topics", tagLines(snapshot.topics, labels));
      break;
    case "QUESTION":
      if (isObject(snapshot.question)) flattenQuestion(`${root}.`, snapshot.question, snapshot.options, snapshot.parts, out, labels);
      out.set("topics", tagLines(snapshot.topics, labels));
      out.set("objectives", idLines(snapshot.objectives, labels));
      break;
    case "ASSESSMENT":
      flattenRow(`${root}.`, snapshot.assessment, out, labels);
      asArray(snapshot.sections)
        .filter(isObject)
        .forEach((section, index) => {
          const prefix = `sections.${index + 1}.`;
          flattenRow(prefix, section, out, labels, new Set(["items", "rules", "sortOrder"]));
          out.set(
            `${prefix}items`,
            orderedLines(section.items, (item, i) => `${String(item.label ?? i + 1)}. ${label(labels, item.questionId)}${item.marks !== null && item.marks !== undefined ? ` (${String(item.marks)} marks)` : ""}`),
          );
          out.set(
            `${prefix}rules`,
            orderedLines(section.rules, (rule) => {
              const rest = Object.fromEntries(Object.entries(rule).filter(([key]) => !IGNORED_COLUMNS.has(key)));
              const topic = rest.topicId ? `${label(labels, rest.topicId)}: ` : "";
              return `${topic}${JSON.stringify(rest)}`;
            }),
          );
        });
      out.set("topics", idLines(snapshot.topics, labels));
      break;
    case "STUDY_PACK":
      flattenRow(`${root}.`, snapshot.studyPack, out, labels);
      out.set(
        "scopes",
        orderedLines(snapshot.scopes, (scope) =>
          [scope.qualificationId, scope.subjectId, scope.syllabusId]
            .filter((id) => typeof id === "string")
            .map((id) => label(labels, id))
            .join(" · "),
        ),
      );
      break;
    case "STUDY_PLAN_TEMPLATE":
      flattenRow(`${root}.`, snapshot.template, out, labels);
      out.set(
        "items",
        orderedLines(snapshot.items, (item) => {
          const target = item.lessonId ?? item.assessmentId ?? item.topicId;
          return `Week ${String(item.weekNumber)}${item.dayOfWeek !== null && item.dayOfWeek !== undefined ? `, day ${String(item.dayOfWeek)}` : ""}: ${String(item.activityType)}${target ? ` · ${label(labels, target)}` : ""}`;
        }),
      );
      break;
  }
  return out;
}

// ---------------------------------------------------------------------------------------------------------------------
// Line diff (LCS after trimming the common prefix/suffix)
// ---------------------------------------------------------------------------------------------------------------------

/** Above this many DP cells the diff falls back to "all removed, all added" (bounded memory and time). */
const MAX_DIFF_CELLS = 4_000_000;

/** Line-by-line diff of two texts (pure). */
export function lineDiff(before: string, after: string): LineChange[] {
  const a = before === "" ? [] : before.split(/\r?\n/);
  const b = after === "" ? [] : after.split(/\r?\n/);
  let start = 0;
  while (start < a.length && start < b.length && a[start] === b[start]) start += 1;
  let endA = a.length;
  let endB = b.length;
  while (endA > start && endB > start && a[endA - 1] === b[endB - 1]) {
    endA -= 1;
    endB -= 1;
  }
  const head: LineChange[] = a.slice(0, start).map((text) => ({ kind: "same", text }));
  const tail: LineChange[] = a.slice(endA).map((text) => ({ kind: "same", text }));
  const midA = a.slice(start, endA);
  const midB = b.slice(start, endB);
  const n = midA.length;
  const m = midB.length;
  if (n === 0 || m === 0 || (n + 1) * (m + 1) > MAX_DIFF_CELLS) {
    return [...head, ...midA.map((text) => ({ kind: "del" as const, text })), ...midB.map((text) => ({ kind: "add" as const, text })), ...tail];
  }
  // lcs[i][j] = LCS length of midA[i..] and midB[j..]
  const width = m + 1;
  const lcs = new Uint32Array((n + 1) * width);
  for (let i = n - 1; i >= 0; i -= 1) {
    for (let j = m - 1; j >= 0; j -= 1) {
      lcs[i * width + j] = midA[i] === midB[j] ? (lcs[(i + 1) * width + j + 1] ?? 0) + 1 : Math.max(lcs[(i + 1) * width + j] ?? 0, lcs[i * width + j + 1] ?? 0);
    }
  }
  const middle: LineChange[] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (midA[i] === midB[j]) {
      middle.push({ kind: "same", text: midA[i] ?? "" });
      i += 1;
      j += 1;
    } else if ((lcs[(i + 1) * width + j] ?? 0) >= (lcs[i * width + j + 1] ?? 0)) {
      middle.push({ kind: "del", text: midA[i] ?? "" });
      i += 1;
    } else {
      middle.push({ kind: "add", text: midB[j] ?? "" });
      j += 1;
    }
  }
  while (i < n) middle.push({ kind: "del", text: midA[i++] ?? "" });
  while (j < m) middle.push({ kind: "add", text: midB[j++] ?? "" });
  return [...head, ...middle, ...tail];
}

/**
 * Replaces long runs of unchanged lines with a "skip" marker, keeping `context` lines around each change. Runs of
 * fewer than `minSkip` lines are shown rather than hidden (a marker for one line saves nothing).
 */
export function collapseUnchanged(lines: readonly LineChange[], context = 2, minSkip = 3): DisplayLine[] {
  const keep = new Array<boolean>(lines.length).fill(false);
  lines.forEach((line, index) => {
    if (line.kind === "same") return;
    for (let k = Math.max(0, index - context); k <= Math.min(lines.length - 1, index + context); k += 1) keep[k] = true;
  });
  const out: DisplayLine[] = [];
  let pending: LineChange[] = [];
  const flush = () => {
    if (pending.length >= minSkip) out.push({ kind: "skip", count: pending.length });
    else out.push(...pending);
    pending = [];
  };
  lines.forEach((line, index) => {
    if (keep[index]) {
      flush();
      out.push(line);
    } else {
      pending.push(line);
    }
  });
  flush();
  return out;
}

function needsLineDiff(before: string | null, after: string | null): boolean {
  const longest = Math.max(before?.length ?? 0, after?.length ?? 0);
  return (before ?? "").includes("\n") || (after ?? "").includes("\n") || longest > 160;
}

/**
 * Field-level diff of two snapshots of the same entity type: what changed between `before` (e.g. the last published
 * revision) and `after` (the version under review). Unchanged fields are omitted; order follows `after`.
 */
export function diffSnapshots(entityType: DiffEntityType, before: JsonObject, after: JsonObject, labels: SnapshotLabels = new Map()): DiffEntry[] {
  const left = flattenSnapshot(entityType, before, labels);
  const right = flattenSnapshot(entityType, after, labels);
  const keys = [...right.keys(), ...[...left.keys()].filter((key) => !right.has(key))];
  const entries: DiffEntry[] = [];
  for (const path of keys) {
    const b = left.get(path) ?? null;
    const a = right.get(path) ?? null;
    if (a === b) continue;
    const entry: DiffEntry = {
      path,
      label: labelForPath(path),
      change: b === null ? "added" : a === null ? "removed" : "changed",
      before: b,
      after: a,
    };
    if (needsLineDiff(b, a)) entry.lines = collapseUnchanged(lineDiff(b ?? "", a ?? ""));
    entries.push(entry);
  }
  return entries;
}

/** Every id a snapshot references in labelled positions (for the service to batch-load labels). */
export function referencedIds(snapshot: JsonObject | null | undefined): Set<string> {
  const ids = new Set<string>();
  const visit = (value: Json | undefined, key: string | null): void => {
    if (typeof value === "string") {
      if (key !== null && (LABELLED_ID_COLUMNS.has(key) || key === "questionId" || key === "lessonId" || key === "assessmentId")) ids.add(value);
      return;
    }
    if (Array.isArray(value)) {
      for (const item of value) visit(item, key === "objectives" || key === "topics" ? (key === "objectives" ? "objectiveId" : "topicId") : null);
      return;
    }
    if (isObject(value)) for (const [k, v] of Object.entries(value)) visit(v, k);
  };
  if (snapshot) visit(snapshot, null);
  return ids;
}
