import { createHash } from "node:crypto";

/**
 * Small helpers shared by the seed modules (no database access here).
 */

/** Seed progress output. The seed is a CLI, so it prints plain lines (never secrets or personal data). */
export interface SeedLog {
  info(message: string): void;
  warn(message: string): void;
}

export const consoleLog: SeedLog = {
  info: (message) => console.log(`[seed] ${message}`),
  warn: (message) => console.warn(`[seed] WARNING: ${message}`),
};

/** Counts rows created during a run, per label (e.g. "Subject", "Question"). */
export class SeedTally {
  readonly created = new Map<string, number>();
  readonly skipped = new Map<string, number>();

  add(label: string, created: boolean): void {
    const map = created ? this.created : this.skipped;
    map.set(label, (map.get(label) ?? 0) + 1);
  }

  summary(): string {
    const parts = [...this.created.entries()].map(([label, n]) => `${label} +${n}`);
    return parts.length > 0 ? parts.join(", ") : "nothing new";
  }
}

/**
 * A deterministic, well-formed UUID v4 derived from a key (version nibble 4, RFC 4122 variant). Used for storage keys
 * of generated demo files, so re-running the seed addresses the same object.
 */
export function stableUuidV4(key: string): string {
  const hex = createHash("sha256").update(key).digest("hex");
  const variant = ((parseInt(hex.charAt(16), 16) & 0x3) | 0x8).toString(16);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-4${hex.slice(13, 16)}-${variant}${hex.slice(17, 20)}-${hex.slice(20, 32)}`;
}

/** `YYYY-MM-DD` of the last day of a month (month 1-12). */
export function lastDayOfMonth(year: number, month: number): string {
  const day = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/** `YYYY-MM-DD` of the first day of a month (month 1-12). */
export function firstDayOfMonth(year: number, month: number): string {
  return `${year}-${String(month).padStart(2, "0")}-01`;
}
