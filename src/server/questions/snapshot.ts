/**
 * Pure helpers for ContentRevision snapshots of questions (§26 "what a student saw at revision N never changes",
 * ARCHITECTURE §4.4). No DB access: `revisions.ts` loads the aggregate and stores the snapshot.
 *
 * Snapshot shape (ContentRevision.snapshot doc comment, entityType QUESTION, schemaVersion 1):
 *   { question: { …root columns }, options: [ …QuestionOption rows ], parts: [ { …part columns, options: […],
 *     parts: [ …sub-parts ] } ], topics: [ { topicId, syllabusId, isPrimary } ], objectives: [ objectiveId ] }
 * Render caches (`renderedHtml`, `renderVersion`) are excluded: they are regenerable from the source columns and stay
 * editable on published rows. Dates are ISO strings. Arrays are in a deterministic order (options by sortOrder/key,
 * parts by partOrder/id, topics by syllabusId/topicId, objectives by id).
 *
 * `contentHash` is the hex SHA-256 of {@link canonicalJson} (object keys sorted recursively, no whitespace), so equal
 * aggregates always hash equally regardless of property order.
 */

export const QUESTION_SNAPSHOT_SCHEMA_VERSION = 1;

export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

/**
 * Converts a value to plain JSON data: Dates → ISO strings, bigints → decimal strings, `undefined` object members
 * dropped (as JSON.stringify would), non-finite numbers → null. Throws on functions/symbols (programming errors).
 */
export function toJsonValue(value: unknown): JsonValue {
  if (value === null || value === undefined) return null;
  if (value instanceof Date) return value.toISOString();
  switch (typeof value) {
    case "string":
    case "boolean":
      return value;
    case "number":
      return Number.isFinite(value) ? value : null;
    case "bigint":
      return value.toString();
    case "object": {
      if (Array.isArray(value)) return value.map((v) => toJsonValue(v));
      const out: { [key: string]: JsonValue } = {};
      for (const [key, v] of Object.entries(value as Record<string, unknown>)) {
        if (v !== undefined) out[key] = toJsonValue(v);
      }
      return out;
    }
    default:
      throw new TypeError(`Cannot snapshot a value of type ${typeof value}`);
  }
}

/** Deterministic JSON: object keys sorted (code-point order) at every level, arrays in order, no whitespace. */
export function canonicalJson(value: JsonValue): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  const keys = Object.keys(value).sort();
  return `{${keys.map((k) => `${JSON.stringify(k)}:${canonicalJson(value[k] as JsonValue)}`).join(",")}}`;
}

/** Columns never stored in snapshots (render caches). */
export const SNAPSHOT_EXCLUDED_COLUMNS = ["renderedHtml", "renderVersion"] as const;

export interface SnapshotOptionRow {
  key: string;
  sortOrder: number;
  [column: string]: unknown;
}

export interface SnapshotQuestionRow {
  id: string;
  partOrder: number;
  options: readonly SnapshotOptionRow[];
  parts?: readonly SnapshotQuestionRow[];
  [column: string]: unknown;
}

export interface SnapshotAggregate {
  question: SnapshotQuestionRow;
  topics: readonly { topicId: string; syllabusId: string; isPrimary: boolean }[];
  objectives: readonly string[];
}

function compareStrings(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

function columns(row: Record<string, unknown>): { [key: string]: JsonValue } {
  const out: { [key: string]: JsonValue } = {};
  for (const [key, value] of Object.entries(row)) {
    if (key === "options" || key === "parts" || (SNAPSHOT_EXCLUDED_COLUMNS as readonly string[]).includes(key)) continue;
    if (value !== undefined) out[key] = toJsonValue(value);
  }
  return out;
}

function optionsOf(row: SnapshotQuestionRow): JsonValue[] {
  return [...row.options]
    .sort((a, b) => a.sortOrder - b.sortOrder || compareStrings(a.key, b.key))
    .map((o) => columns(o));
}

function partsOf(row: SnapshotQuestionRow): JsonValue[] {
  return [...(row.parts ?? [])]
    .sort((a, b) => a.partOrder - b.partOrder || compareStrings(a.id, b.id))
    .map((part) => ({ ...columns(part), options: optionsOf(part), parts: partsOf(part) }));
}

/** Builds the snapshot document of a question aggregate (shape in the module header). */
export function buildQuestionSnapshot(aggregate: SnapshotAggregate): { [key: string]: JsonValue } {
  return {
    question: columns(aggregate.question),
    options: optionsOf(aggregate.question),
    parts: partsOf(aggregate.question),
    topics: [...aggregate.topics]
      .sort((a, b) => compareStrings(a.syllabusId, b.syllabusId) || compareStrings(a.topicId, b.topicId))
      .map((t) => ({ topicId: t.topicId, syllabusId: t.syllabusId, isPrimary: t.isPrimary })),
    objectives: [...aggregate.objectives].sort(compareStrings),
  };
}
