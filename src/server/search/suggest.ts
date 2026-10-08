import "server-only";
import { z } from "zod";
import { Prisma, type PrismaClient } from "@/generated/prisma/client";
import { db } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { buildPrefixTsQuery, collapseWhitespace, normalizeForMatch } from "./text";
import { SEARCHABLE_ENTITY_TYPES, type SearchableEntityType } from "./types";

/**
 * Autocomplete (§28): up to {@link MAX_SUGGESTIONS} titles for what the user is typing.
 *
 * - Prefix match on TITLE words only (tsvector weight A, `simple` lexemes, so "quadr" -> "Quadratic equations"; the
 *   complete words before the last must match whole words of the title).
 * - Typo tolerance from pg_trgm word similarity on the title (`<%`, default threshold 0.6, GIN trigram index) once the
 *   prefix has 4+ characters.
 * - Ordered: title starts with the prefix, then similarity, editorial rankBoost, shorter title. Duplicate titles are
 *   collapsed (the best-ranked one wins).
 * - Titles only: no body text, so locked/premium items are safe to suggest. Questions are excluded by default (their
 *   titles are stem excerpts or teaser labels, not useful completions).
 * Single round trip, no transaction: autocomplete fires on every keystroke (callers should debounce + rate-limit).
 */

export const MAX_SUGGESTIONS = 8;
const MIN_PREFIX_LENGTH = 2;
const TYPO_MIN_LENGTH = 4;
const CANDIDATE_LIMIT = 40;

export const DEFAULT_SUGGEST_TYPES: readonly SearchableEntityType[] = [
  "SUBJECT",
  "TOPIC",
  "LESSON",
  "ASSESSMENT",
  "STUDY_PACK",
  "FLASHCARD",
];

export const suggestOptionsSchema = z.object({
  limit: z.number().int().min(1).max(MAX_SUGGESTIONS).default(MAX_SUGGESTIONS),
  types: z.array(z.enum(SEARCHABLE_ENTITY_TYPES)).min(1).optional(),
  /** Scope suggestions to a subject (e.g. inside a subject dashboard). */
  subjectId: z.uuid().optional(),
});

export type SuggestOptions = z.input<typeof suggestOptionsSchema>;

export interface Suggestion {
  title: string;
  entityType: SearchableEntityType;
  entityId: string;
  subtitle: string | null;
  path: string;
  accessTier: "PUBLIC" | "FREE" | "PREMIUM";
}

interface SuggestRow extends Suggestion {
  rankKey: number;
}

export async function suggest(
  prefix: string,
  options: SuggestOptions = {},
  client: PrismaClient = db,
): Promise<Suggestion[]> {
  const parsed = suggestOptionsSchema.safeParse(options);
  if (!parsed.success) throw AppError.fromZod(parsed.error);
  const { limit, types, subjectId } = parsed.data;

  const text = collapseWhitespace(prefix).slice(0, 100);
  const words = normalizeForMatch(text);
  if (words.length < MIN_PREFIX_LENGTH) return [];
  const prefixQuery = buildPrefixTsQuery(text, "A", MIN_PREFIX_LENGTH);
  const lower = text.toLowerCase();

  const branches: Prisma.Sql[] = [];
  if (prefixQuery) branches.push(Prisma.sql`d."searchVector" @@ to_tsquery('simple', ${prefixQuery})`);
  if (words.length >= TYPO_MIN_LENGTH) branches.push(Prisma.sql`${words} <% d."title"`);
  if (branches.length === 0) return [];

  const rows = await client.$queryRaw<SuggestRow[]>`
    SELECT d."title", d."entityType"::text AS "entityType", d."entityId", d."subtitle", d."path",
           d."accessTier"::text AS "accessTier",
           (CASE WHEN starts_with(lower(d."title"), ${lower}) THEN 1 ELSE 0 END
             + word_similarity(${words}, d."title") + 0.01 * LEAST(GREATEST(d."rankBoost", -10), 10))::float8 AS "rankKey"
    FROM "SearchDocument" d
    WHERE (${Prisma.join(branches, " OR ")})
      AND d."entityType" = ANY(${[...(types ?? DEFAULT_SUGGEST_TYPES)]}::"ContentEntityType"[])
      ${subjectId ? Prisma.sql`AND d."subjectIds" @> ARRAY[${subjectId}::uuid]` : Prisma.empty}
    ORDER BY "rankKey" DESC, length(d."title") ASC, d."title" ASC, d."id" ASC
    LIMIT ${CANDIDATE_LIMIT}`;

  const seen = new Set<string>();
  const out: Suggestion[] = [];
  for (const row of rows) {
    const key = normalizeForMatch(row.title);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({
      title: row.title,
      entityType: row.entityType,
      entityId: row.entityId,
      subtitle: row.subtitle,
      path: row.path,
      accessTier: row.accessTier,
    });
    if (out.length >= limit) break;
  }
  return out;
}
