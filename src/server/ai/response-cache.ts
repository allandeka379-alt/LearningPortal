import { createHash } from "node:crypto";
import type { AiFeature } from "@/generated/prisma/client";
import type { TokenUsage } from "./pricing";

/**
 * Response cache for generic, student-independent answers (ARCHITECTURE §6.3 step 6; `AiResponseCache`).
 *
 * The gateway only consults it for routes marked `cacheable` when the call carries cache-key material and has NO
 * student-specific content: no volatile/per-turn guidance, no history, no images. The key is a sha256 over the model,
 * prompt version, route, the stable system prompt, the NORMALISED question, the level and the subject; the question
 * text itself is never stored, only the generic response.
 */

export interface CachedResponse {
  id: string;
  response: string;
  model: string;
}

export interface ResponseCacheEntry {
  cacheKey: string;
  feature: AiFeature;
  model: string;
  promptVersion: string;
  subjectId: string | null;
  response: string;
  usage: TokenUsage;
  costMicros: number;
  expiresAt: Date;
}

export interface ResponseCacheStore {
  /** A live (not expired, not invalidated) entry; counts the hit. */
  get(cacheKey: string, now: Date): Promise<CachedResponse | null>;
  /** Writes or refreshes an entry. Must never throw for a concurrent duplicate. */
  put(entry: ResponseCacheEntry): Promise<void>;
}

/** Normalises a question for cache matching: Unicode NFKC, case-folded, whitespace collapsed, trailing ?!. dropped. */
export function normalizeCachePrompt(text: string): string {
  return text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[\s?!.]+$/u, "");
}

export interface ResponseCacheKeyInput {
  model: string;
  promptVersion: string;
  route: string;
  /** Stable system blocks (a prompt change must never serve answers produced under the old prompt). */
  systemStable: readonly string[];
  prompt: string;
  /** Qualification level / board slice the answer was pitched at, e.g. "zimsec:o-level". */
  level: string;
  subjectId?: string | null | undefined;
}

/** sha256 hex (64 chars, matches the `AiResponseCache_key_chk` CHECK). */
export function responseCacheKey(input: ResponseCacheKeyInput): string {
  const systemHash = createHash("sha256").update(input.systemStable.join("\u0000")).digest("hex");
  const material = JSON.stringify([
    "v1",
    input.model,
    input.promptVersion,
    input.route,
    systemHash,
    input.level.trim().toLowerCase(),
    input.subjectId ?? null,
    normalizeCachePrompt(input.prompt),
  ]);
  return createHash("sha256").update(material).digest("hex");
}

/** Test double. */
export class InMemoryResponseCache implements ResponseCacheStore {
  readonly entries = new Map<string, ResponseCacheEntry & { id: string; hitCount: number; invalidated: boolean }>();
  private seq = 0;

  async get(cacheKey: string, now: Date): Promise<CachedResponse | null> {
    const entry = this.entries.get(cacheKey);
    if (!entry || entry.invalidated || entry.expiresAt.getTime() <= now.getTime()) return null;
    entry.hitCount += 1;
    return { id: entry.id, response: entry.response, model: entry.model };
  }

  async put(entry: ResponseCacheEntry): Promise<void> {
    this.seq += 1;
    this.entries.set(entry.cacheKey, {
      ...entry,
      id: `00000000-0000-7000-8000-${String(this.seq).padStart(12, "0")}`,
      hitCount: 0,
      invalidated: false,
    });
  }
}
