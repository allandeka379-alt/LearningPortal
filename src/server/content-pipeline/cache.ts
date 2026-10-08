import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { ItemIssue } from "./item-checks";

/**
 * On-disk cache of the expensive per-item checks (render + marking), keyed by a hash of the item's source, the media it
 * references and the validator / renderer versions. Unchanged items are not re-rendered on the next run, which keeps
 * `npm run content:validate` fast on tens of thousands of items. Lives under node_modules/.cache (never committed).
 * A corrupt or unreadable cache is ignored (rebuilt), never an error.
 */

/** Bump when a check changes so cached results are recomputed. */
export const CHECKS_VERSION = 3;

const MAX_ENTRIES = 250_000;

export class CheckCache {
  private readonly entries: Map<string, ItemIssue[]>;
  private readonly used = new Set<string>();
  private dirty = false;

  private constructor(
    private readonly file: string | null,
    entries: Map<string, ItemIssue[]>,
  ) {
    this.entries = entries;
  }

  /** A cache backed by `<dir>/validate.json` (null dir = in-memory only). */
  static open(dir: string | null, fingerprint: string): CheckCache {
    if (!dir) return new CheckCache(null, new Map());
    const file = path.join(dir, "validate.json");
    try {
      if (existsSync(file)) {
        const raw = JSON.parse(readFileSync(file, "utf8")) as { fingerprint?: string; entries?: Record<string, ItemIssue[]> };
        if (raw.fingerprint === fingerprint && raw.entries && typeof raw.entries === "object") {
          return new CheckCache(file, new Map(Object.entries(raw.entries)));
        }
      }
    } catch {
      // Rebuilt below.
    }
    return new CheckCache(file, new Map());
  }

  static hash(parts: readonly unknown[]): string {
    return createHash("sha256").update(JSON.stringify(parts)).digest("hex").slice(0, 40);
  }

  get(key: string): ItemIssue[] | undefined {
    const hit = this.entries.get(key);
    if (hit) this.used.add(key);
    return hit;
  }

  set(key: string, issues: ItemIssue[]): void {
    this.entries.set(key, issues);
    this.used.add(key);
    this.dirty = true;
  }

  /** Writes the cache (atomically). `prune` drops entries not used in this run (only after a full validation). */
  save(fingerprint: string, prune: boolean): void {
    if (!this.file || (!this.dirty && !prune)) return;
    let entries = [...this.entries.entries()];
    if (prune) entries = entries.filter(([key]) => this.used.has(key));
    if (entries.length > MAX_ENTRIES) entries = entries.slice(entries.length - MAX_ENTRIES);
    try {
      mkdirSync(path.dirname(this.file), { recursive: true });
      const tmp = `${this.file}.${process.pid}.tmp`;
      writeFileSync(tmp, JSON.stringify({ fingerprint, entries: Object.fromEntries(entries) }));
      renameSync(tmp, this.file);
    } catch {
      // A cache that cannot be written only costs time on the next run.
    }
  }
}
