import { createHash } from "node:crypto";
import { z } from "zod";

/**
 * Opaque keyset cursor for ranked search results (ARCHITECTURE §9.4: cursor pagination, no OFFSET).
 *
 * Results are ordered by (score DESC, id ASC) where `score` is rounded to 6 decimals in SQL and compared as `numeric`,
 * so the boundary is exact and pages never overlap or skip rows, even when rows are inserted between requests. The
 * cursor also pins the query mode (detected filters applied, or relaxed after a zero-result detection) and a
 * fingerprint of the query + filters: a cursor replayed against a different query is rejected instead of returning a
 * meaningless page.
 */

export type SearchMode = "detected" | "relaxed";

export interface SearchCursor {
  /** Rounded score of the last row of the previous page, as Postgres printed it (e.g. "1.104512"). */
  score: string;
  /** SearchDocument.id of that row (tie-breaker). */
  id: string;
  mode: SearchMode;
  fingerprint: string;
}

const SCORE_PATTERN = /^-?\d{1,6}(\.\d{1,6})?$/;

const wireSchema = z.object({
  v: z.literal(1),
  s: z.string().regex(SCORE_PATTERN),
  i: z.uuid(),
  m: z.enum(["d", "r"]),
  f: z.string().regex(/^[0-9a-f]{16}$/),
});

export function encodeCursor(cursor: SearchCursor): string {
  if (!SCORE_PATTERN.test(cursor.score)) throw new RangeError("encodeCursor: invalid score");
  const wire = { v: 1, s: cursor.score, i: cursor.id, m: cursor.mode === "detected" ? "d" : "r", f: cursor.fingerprint };
  return Buffer.from(JSON.stringify(wire), "utf8").toString("base64url");
}

/** Decodes a cursor; returns null for anything malformed or tampered with (never throws). */
export function decodeCursor(raw: string): SearchCursor | null {
  if (raw.length === 0 || raw.length > 512 || !/^[A-Za-z0-9_-]+$/.test(raw)) return null;
  try {
    const parsed = wireSchema.safeParse(JSON.parse(Buffer.from(raw, "base64url").toString("utf8")));
    if (!parsed.success) return null;
    const { s, i, m, f } = parsed.data;
    return { score: s, id: i, mode: m === "d" ? "detected" : "relaxed", fingerprint: f };
  } catch {
    return null;
  }
}

/** JSON with object keys sorted recursively (arrays keep their order), so equal inputs hash equally. */
function canonicalJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .filter(([, v]) => v !== undefined)
      .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
    return `{${entries.map(([k, v]) => `${JSON.stringify(k)}:${canonicalJson(v)}`).join(",")}}`;
  }
  return JSON.stringify(value) ?? "null";
}

/** 16-hex-char fingerprint of the query inputs that determine the result order. */
export function queryFingerprint(parts: unknown): string {
  return createHash("sha256").update(canonicalJson(parts)).digest("hex").slice(0, 16);
}
