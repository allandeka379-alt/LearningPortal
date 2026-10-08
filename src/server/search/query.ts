import "server-only";
import { z } from "zod";
import { Prisma, type PrismaClient } from "@/generated/prisma/client";
import { db } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { getCatalogueIndex } from "./catalogue";
import { decodeCursor, encodeCursor, queryFingerprint, type SearchMode } from "./cursor";
import {
  ANONYMOUS_VIEWER,
  HEADLINE_OPTIONS,
  lockStateFor,
  parseHeadline,
  type LockReason,
  type SearchViewer,
  type SnippetSegment,
} from "./presentation";
import { parseSearchQuery, type CatalogueIndex, type DetectedFilter } from "./query-understanding";
import { buildPrefixTsQuery, collapseWhitespace, hasWebsearchOperators, normalizeForMatch } from "./text";
import { SEARCHABLE_ENTITY_TYPES, type SearchableEntityType } from "./types";

/**
 * Global search (§28; ARCHITECTURE §3.9) over SearchDocument.
 *
 * Matching (all parameterised `$queryRaw`, CLAUDE.md "Prisma 7 rules"):
 * - full text: `websearch_to_tsquery` (quotes, `-word`, `or`) in both the `english` and `simple` configs, which are
 *   the configs `search_ts_config(languageCode)` can produce (constant queries so the GIN index on searchVector is
 *   used); ranking re-parses the query with the per-row `search_ts_config("languageCode")`;
 * - prefix: the last word also matches as a prefix of title/keyword words ("quadr" -> "quadratic");
 * - typos: pg_trgm word similarity of the residual text against the title (`<%`, GIN trigram index on title), with
 *   `pg_trgm.word_similarity_threshold` lowered to {@link TRIGRAM_THRESHOLD} for the transaction only.
 * These are OR-ed and BLENDED into one score:
 *   ts_rank_cd(weights D,C,B,A = 0.1,0.2,0.4,1.0; normalisation 32 -> [0,1))   title A beats keywords B beats body C
 *   + 0.5 x word_similarity(text, title)                                       typo tolerance / short queries
 *   + 0.3 exact title | + 0.1 title starts with the text                        exact title boost
 *   + 0.05 prefix-only match                                                   ranks below whole-word matches
 *   + 0.02 x rankBoost (clamped to ±10)                                        editorial defaults (documents.ts)
 *   + 0.1 when the result is in one of the viewer's enrolled subjects
 * rounded to 6 decimals; ties broken by id, which makes keyset pagination exact (cursor.ts).
 *
 * Query understanding (query-understanding.ts) turns board / level / qualification / subject words and syllabus codes
 * into filters and returns them as removable chips. When detected filters produce zero results, the search is re-run
 * without them on the full query text ("relaxed": true), so a mis-detection never hides results.
 *
 * Visibility: the index holds PUBLISHED platform content only. Locked results (FREE for signed-out viewers, PREMIUM
 * without entitlement) are returned as teasers: title, subtitle, type, path. Their body text is never selected out of
 * the database (snippets are produced in a second query for unlocked ids only).
 *
 * Callers (routes/API) must authenticate the viewer server-side and rate-limit the endpoint (§39).
 */

export const MAX_QUERY_LENGTH = 200;
export const DEFAULT_SEARCH_LIMIT = 20;
export const MAX_SEARCH_LIMIT = 50;
/** Facet counting stops after this many matches (the UI shows "1000+"). */
export const FACET_COUNT_CAP = 1_000;
/** pg_trgm word similarity needed for a typo match ("quadradic" vs "Quadratic equations" = 0.6). */
export const TRIGRAM_THRESHOLD = 0.5;
const TRIGRAM_MIN_LENGTH = 3;
const TRIGRAM_MAX_LENGTH = 64;
const STATEMENT_TIMEOUT_MS = 5_000;
const TRANSACTION_OPTIONS = { maxWait: 5_000, timeout: 15_000 } as const;
/** Text-search configs `search_ts_config()` can return (raw SQL R0). Add one here when that function gains a config. */
const QUERY_CONFIGS = ["english", "simple"] as const;

const uuid = z.uuid();
const entityTypesSchema = z.array(z.enum(SEARCHABLE_ENTITY_TYPES)).min(1).max(SEARCHABLE_ENTITY_TYPES.length);

export const searchFiltersSchema = z.object({
  boardId: uuid.optional(),
  levelId: uuid.optional(),
  qualificationId: uuid.optional(),
  subjectId: uuid.optional(),
  /** Includes the topic's whole subtree (documents store their topics' ancestors). */
  topicId: uuid.optional(),
  types: entityTypesSchema.optional(),
});

export const searchInputSchema = z.object({
  q: z.string().max(MAX_QUERY_LENGTH).default(""),
  filters: searchFiltersSchema.default({}),
  limit: z.number().int().min(1).max(MAX_SEARCH_LIMIT).default(DEFAULT_SEARCH_LIMIT),
  cursor: z.string().max(512).optional(),
  /** Turn query understanding off (e.g. after the user removed every detected chip). */
  detect: z.boolean().default(true),
});

export type SearchInput = z.input<typeof searchInputSchema>;
export type SearchFilters = z.output<typeof searchFiltersSchema>;

/** A filter in effect, for chips: explicit ones came from the UI, detected ones from the query text. */
export type AppliedFilter =
  | ({ source: "detected" } & DetectedFilter)
  | {
      source: "explicit";
      kind: "board" | "level" | "qualification" | "subject" | "topic" | "type";
      ids: string[];
    };

export interface SearchResultItem {
  /** SearchDocument id (stable key for lists). */
  id: string;
  entityType: SearchableEntityType;
  entityId: string;
  title: string;
  subtitle: string | null;
  path: string;
  accessTier: "PUBLIC" | "FREE" | "PREMIUM";
  locked: boolean;
  lockReason: LockReason | null;
  /** Highlighted excerpt of the body; always null for locked results. */
  snippet: SnippetSegment[] | null;
  score: number;
}

export interface SearchFacet {
  type: SearchableEntityType;
  count: number;
}

export interface SearchResponse {
  /** The query as received (whitespace collapsed). */
  query: string;
  /** Text actually matched after detected filters were removed ("" = browsing the filters). */
  text: string;
  appliedFilters: AppliedFilter[];
  /** Detected filters were dropped because they produced no results. */
  relaxed: boolean;
  items: SearchResultItem[];
  /** Matches per type for the text + curriculum filters, ignoring the type filter (for tabs). */
  facets: SearchFacet[];
  /** Matches for the current type selection. */
  total: number;
  /** Counting stopped at {@link FACET_COUNT_CAP}: show `total` as "N+". */
  totalIsLowerBound: boolean;
  nextCursor: string | null;
}

export interface SearchDeps {
  client?: PrismaClient;
  /** Catalogue for query understanding (default: cached DB snapshot). */
  catalogue?: () => Promise<CatalogueIndex>;
}

interface Plan {
  mode: SearchMode;
  /** Residual text (websearch syntax). */
  text: string;
  /** Normalised words for typo matching, or null when typo matching does not apply. */
  trigramText: string | null;
  prefixQuery: string | null;
  lowerText: string;
  boardIds: string[] | null;
  levelIds: string[] | null;
  qualificationIds: string[] | null;
  subjectIds: string[] | null;
  topicIds: string[] | null;
  types: SearchableEntityType[] | null;
  boostSubjectIds: string[];
  detected: DetectedFilter[];
}

interface PageRow {
  id: string;
  entityType: SearchableEntityType;
  entityId: string;
  title: string;
  subtitle: string | null;
  path: string;
  accessTier: "PUBLIC" | "FREE" | "PREMIUM";
  subjectIds: string[];
  qualificationIds: string[];
  examBoardIds: string[];
  scoreText: string;
}

function explicitFilters(filters: SearchFilters): AppliedFilter[] {
  const out: AppliedFilter[] = [];
  if (filters.boardId) out.push({ source: "explicit", kind: "board", ids: [filters.boardId] });
  if (filters.levelId) out.push({ source: "explicit", kind: "level", ids: [filters.levelId] });
  if (filters.qualificationId) out.push({ source: "explicit", kind: "qualification", ids: [filters.qualificationId] });
  if (filters.subjectId) out.push({ source: "explicit", kind: "subject", ids: [filters.subjectId] });
  if (filters.topicId) out.push({ source: "explicit", kind: "topic", ids: [filters.topicId] });
  if (filters.types) out.push({ source: "explicit", kind: "type", ids: [...filters.types] });
  return out;
}

function and(a: string[] | null, b: string | undefined): string[] | null {
  if (b === undefined) return a;
  return a === null ? [b] : a.includes(b) ? [b] : [];
}

function buildPlan(
  mode: SearchMode,
  query: string,
  filters: SearchFilters,
  index: CatalogueIndex | null,
  viewer: SearchViewer,
): Plan {
  const parsed =
    mode === "detected" && index !== null
      ? parseSearchQuery(query, index, filters)
      : { residual: query, filters: { boardIds: null, qualificationIds: null, subjectIds: null }, detected: [] };
  const text = parsed.residual;
  const operators = hasWebsearchOperators(text);
  const words = normalizeForMatch(text);
  return {
    mode,
    text,
    trigramText:
      !operators && words.length >= TRIGRAM_MIN_LENGTH && words.length <= TRIGRAM_MAX_LENGTH ? words : null,
    prefixQuery: operators ? null : buildPrefixTsQuery(text, "AB"),
    lowerText: collapseWhitespace(text).toLowerCase(),
    boardIds: and(parsed.filters.boardIds, filters.boardId),
    levelIds: filters.levelId ? [filters.levelId] : null,
    qualificationIds: and(parsed.filters.qualificationIds, filters.qualificationId),
    subjectIds: and(parsed.filters.subjectIds, filters.subjectId),
    topicIds: filters.topicId ? [filters.topicId] : null,
    types: filters.types ? [...filters.types] : null,
    boostSubjectIds: [...(viewer.boostSubjectIds ?? [])].filter((id) => uuid.safeParse(id).success),
    detected: parsed.detected,
  };
}

const hasCurriculumFilter = (plan: Plan): boolean =>
  [plan.boardIds, plan.levelIds, plan.qualificationIds, plan.subjectIds, plan.topicIds].some((ids) => ids !== null);

// ---------------------------------------------------------------------------------------------------------------------
// SQL fragments (every value is a bound parameter)
// ---------------------------------------------------------------------------------------------------------------------

/** Whole-word full-text match in every config search_ts_config() can produce (constant tsqueries: GIN-indexable). */
function fullTextSql(plan: Plan): Prisma.Sql {
  return Prisma.join(
    QUERY_CONFIGS.map((config) => Prisma.sql`d."searchVector" @@ websearch_to_tsquery(${config}::regconfig, ${plan.text})`),
    " OR ",
  );
}

function matchSql(plan: Plan): Prisma.Sql {
  if (plan.text === "") return Prisma.sql`TRUE`;
  const branches: Prisma.Sql[] = [fullTextSql(plan)];
  if (plan.prefixQuery) branches.push(Prisma.sql`d."searchVector" @@ to_tsquery('simple', ${plan.prefixQuery})`);
  if (plan.trigramText) branches.push(Prisma.sql`${plan.trigramText} <% d."title"`);
  return Prisma.sql`(${Prisma.join(branches, " OR ")})`;
}

function filterSql(plan: Plan, includeTypes: boolean): Prisma.Sql {
  const conditions: Prisma.Sql[] = [];
  if (plan.boardIds) conditions.push(Prisma.sql`d."examBoardIds" && ${plan.boardIds}::uuid[]`);
  if (plan.levelIds) conditions.push(Prisma.sql`d."levelIds" && ${plan.levelIds}::uuid[]`);
  if (plan.qualificationIds) conditions.push(Prisma.sql`d."qualificationIds" && ${plan.qualificationIds}::uuid[]`);
  if (plan.subjectIds) conditions.push(Prisma.sql`d."subjectIds" && ${plan.subjectIds}::uuid[]`);
  if (plan.topicIds) conditions.push(Prisma.sql`d."topicIds" && ${plan.topicIds}::uuid[]`);
  if (includeTypes && plan.types) {
    conditions.push(Prisma.sql`d."entityType" = ANY(${plan.types}::"ContentEntityType"[])`);
  }
  return conditions.length === 0 ? Prisma.empty : Prisma.sql` AND ${Prisma.join(conditions, " AND ")}`;
}

function scoreSql(plan: Plan): Prisma.Sql {
  const parts: Prisma.Sql[] = [];
  if (plan.text !== "") {
    parts.push(Prisma.sql`ts_rank_cd('{0.1,0.2,0.4,1.0}'::float4[], d."searchVector",
      websearch_to_tsquery(search_ts_config(d."languageCode"::text), ${plan.text})
        || websearch_to_tsquery('simple'::regconfig, ${plan.text}), 32)::float8`);
    if (plan.trigramText) parts.push(Prisma.sql`0.5 * word_similarity(${plan.trigramText}, d."title")::float8`);
    parts.push(Prisma.sql`CASE WHEN lower(d."title") = ${plan.lowerText} THEN 0.3
      WHEN starts_with(lower(d."title"), ${plan.lowerText}) THEN 0.1 ELSE 0 END`);
    if (plan.prefixQuery) {
      parts.push(Prisma.sql`CASE WHEN d."searchVector" @@ to_tsquery('simple', ${plan.prefixQuery})
        AND NOT (${fullTextSql(plan)}) THEN 0.05 ELSE 0 END`);
    }
  }
  parts.push(Prisma.sql`0.02 * LEAST(GREATEST(d."rankBoost", -10), 10)`);
  if (plan.boostSubjectIds.length > 0) {
    parts.push(Prisma.sql`CASE WHEN d."subjectIds" && ${plan.boostSubjectIds}::uuid[] THEN 0.1 ELSE 0 END`);
  }
  return Prisma.sql`round((${Prisma.join(parts, " + ")})::numeric, 6)`;
}

async function countFacets(tx: Prisma.TransactionClient, plan: Plan): Promise<SearchFacet[]> {
  const rows = await tx.$queryRaw<Array<{ entityType: SearchableEntityType; count: number }>>`
    SELECT s."entityType"::text AS "entityType", count(*)::int AS "count"
    FROM (
      SELECT d."entityType" FROM "SearchDocument" d
      WHERE ${matchSql(plan)}${filterSql(plan, false)}
      LIMIT ${FACET_COUNT_CAP + 1}
    ) s
    GROUP BY s."entityType"`;
  return SEARCHABLE_ENTITY_TYPES.map((type) => ({ type, count: rows.find((row) => row.entityType === type)?.count ?? 0 }));
}

async function fetchPage(
  tx: Prisma.TransactionClient,
  plan: Plan,
  limit: number,
  after: { score: string; id: string } | null,
): Promise<PageRow[]> {
  const cursorSql = after
    ? Prisma.sql`WHERE r."score" < ${after.score}::numeric OR (r."score" = ${after.score}::numeric AND r."id" > ${after.id}::uuid)`
    : Prisma.empty;
  return tx.$queryRaw<PageRow[]>`
    SELECT r."id", r."entityType", r."entityId", r."title", r."subtitle", r."path", r."accessTier", r."subjectIds",
           r."qualificationIds", r."examBoardIds", r."score"::text AS "scoreText"
    FROM (
      SELECT d."id", d."entityType"::text AS "entityType", d."entityId", d."title", d."subtitle", d."path",
             d."accessTier"::text AS "accessTier", d."subjectIds", d."qualificationIds", d."examBoardIds",
             ${scoreSql(plan)} AS "score"
      FROM "SearchDocument" d
      WHERE ${matchSql(plan)}${filterSql(plan, true)}
    ) r
    ${cursorSql}
    ORDER BY r."score" DESC, r."id" ASC
    LIMIT ${limit + 1}`;
}

/** Snippets for UNLOCKED rows only: locked rows' bodies are never read out of the database. */
async function fetchSnippets(
  tx: Prisma.TransactionClient,
  plan: Plan,
  ids: readonly string[],
): Promise<Map<string, SnippetSegment[] | null>> {
  const out = new Map<string, SnippetSegment[] | null>();
  if (ids.length === 0) return out;
  const rows =
    plan.text === ""
      ? await tx.$queryRaw<Array<{ id: string; headline: string | null }>>`
          SELECT d."id", left(d."body", 240) AS "headline" FROM "SearchDocument" d WHERE d."id" = ANY(${[...ids]}::uuid[])`
      : await tx.$queryRaw<Array<{ id: string; headline: string | null }>>`
          SELECT d."id",
                 CASE WHEN d."body" = '' THEN NULL
                      ELSE ts_headline(search_ts_config(d."languageCode"::text), d."body",
                             websearch_to_tsquery(search_ts_config(d."languageCode"::text), ${plan.text}), ${HEADLINE_OPTIONS})
                 END AS "headline"
          FROM "SearchDocument" d WHERE d."id" = ANY(${[...ids]}::uuid[])`;
  for (const row of rows) out.set(row.id, parseHeadline(row.headline));
  return out;
}

function sumFacets(facets: readonly SearchFacet[], types: readonly SearchableEntityType[] | null): number {
  return facets.filter((facet) => types === null || types.includes(facet.type)).reduce((n, f) => n + f.count, 0);
}

const EMPTY_FACETS: SearchFacet[] = SEARCHABLE_ENTITY_TYPES.map((type) => ({ type, count: 0 }));

/**
 * Searches the index. Throws AppError VALIDATION for invalid input or a cursor that does not belong to this query.
 *
 * @param viewer server-resolved viewer (default: anonymous; locked results for FREE and PREMIUM content)
 */
export async function search(
  input: SearchInput,
  viewer: SearchViewer = ANONYMOUS_VIEWER,
  deps: SearchDeps = {},
): Promise<SearchResponse> {
  const parsedInput = searchInputSchema.safeParse(input);
  if (!parsedInput.success) throw AppError.fromZod(parsedInput.error);
  const { filters, limit, detect } = parsedInput.data;
  const query = collapseWhitespace(parsedInput.data.q);
  const explicit = explicitFilters(filters);

  const fingerprint = queryFingerprint({ q: query, filters, detect, boost: [...(viewer.boostSubjectIds ?? [])].sort() });
  let cursor: { score: string; id: string } | null = null;
  let mode: SearchMode = detect ? "detected" : "relaxed";
  if (parsedInput.data.cursor !== undefined) {
    const decoded = decodeCursor(parsedInput.data.cursor);
    if (decoded === null || decoded.fingerprint !== fingerprint) {
      throw AppError.validation({ cursor: ["This page of results has expired. Please search again."] });
    }
    cursor = { score: decoded.score, id: decoded.id };
    mode = decoded.mode;
  }

  const emptyResponse = (plan: Plan | null): SearchResponse => ({
    query,
    text: plan?.text ?? query,
    appliedFilters: explicit,
    relaxed: false,
    items: [],
    facets: EMPTY_FACETS,
    total: 0,
    totalIsLowerBound: false,
    nextCursor: null,
  });
  if (query.length === 1 && explicit.length === 0) return emptyResponse(null);

  const index = mode === "detected" && query !== "" ? await (deps.catalogue ?? getCatalogueIndex)() : null;
  let plan = buildPlan(mode, query, filters, index, viewer);
  if (plan.text === "" && !hasCurriculumFilter(plan)) return emptyResponse(plan);

  const client = deps.client ?? db;
  return client.$transaction(async (tx) => {
    // enable_seqscan (transaction-local, text queries only): every text branch of matchSql is GIN-indexed (searchVector,
    // trigram title), but the planner costs pg_trgm's `<%` at one operator per row, so it prefers a sequential scan that
    // runs word_similarity() on every document (scripts/perf, 3.3k documents: 62-101 ms per statement; 33k documents
    // with a multi-word query: 835 ms). The bitmap plans take 4-38 ms. Filter-only searches keep the default.
    await tx.$queryRaw`SELECT set_config('pg_trgm.word_similarity_threshold', ${String(TRIGRAM_THRESHOLD)}, true),
                              set_config('statement_timeout', ${String(STATEMENT_TIMEOUT_MS)}, true),
                              set_config('enable_seqscan', ${plan.text === "" ? "on" : "off"}, true)`;

    let facets = await countFacets(tx, plan);
    if (cursor === null && plan.mode === "detected" && plan.detected.length > 0 && sumFacets(facets, null) === 0) {
      // Detected filters hid everything: search the full text without them rather than show nothing.
      plan = buildPlan("relaxed", query, filters, null, viewer);
      facets = await countFacets(tx, plan);
    }

    const rows = await fetchPage(tx, plan, limit, cursor);
    const pageRows = rows.slice(0, limit);
    const locks = new Map(
      pageRows.map((row) => [
        row.id,
        lockStateFor(
          row.accessTier,
          {
            entityType: row.entityType,
            subjectIds: row.subjectIds,
            qualificationIds: row.qualificationIds,
            examBoardIds: row.examBoardIds,
          },
          viewer,
        ),
      ]),
    );
    const snippets = await fetchSnippets(
      tx,
      plan,
      pageRows.filter((row) => locks.get(row.id)?.locked === false).map((row) => row.id),
    );

    const items: SearchResultItem[] = pageRows.map((row) => {
      const lock = locks.get(row.id) ?? { locked: true, lockReason: "PREMIUM" as const };
      return {
        id: row.id,
        entityType: row.entityType,
        entityId: row.entityId,
        title: row.title,
        subtitle: row.subtitle,
        path: row.path,
        accessTier: row.accessTier,
        locked: lock.locked,
        lockReason: lock.lockReason,
        snippet: lock.locked ? null : (snippets.get(row.id) ?? null),
        score: Number(row.scoreText),
      };
    });

    const last = pageRows.at(-1);
    const total = sumFacets(facets, plan.types);
    return {
      query,
      text: plan.text,
      appliedFilters: [...explicit, ...plan.detected.map((filter) => ({ source: "detected" as const, ...filter }))],
      // "relaxed" mode with detection enabled only arises from the zero-result fallback (also on later pages).
      relaxed: detect && plan.mode === "relaxed",
      items,
      facets,
      total,
      totalIsLowerBound: sumFacets(facets, null) > FACET_COUNT_CAP,
      nextCursor:
        rows.length > limit && last
          ? encodeCursor({ score: last.scoreText, id: last.id, mode: plan.mode, fingerprint })
          : null,
    };
  }, TRANSACTION_OPTIONS);
}
