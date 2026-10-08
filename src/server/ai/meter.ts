import type { AiFeature } from "@/generated/prisma/client";
import type { LocalDate } from "@/lib/dates";
import { addUsage, ZERO_USAGE, type TokenUsage } from "./pricing";

/**
 * Usage metering and quota ledger contract (§40; ARCHITECTURE §6.3 steps 3 and 10).
 *
 * - `AiUsageDaily` (per user, per local day, per feature): `reservedRequests` is incremented atomically against the
 *   caller's plan limit BEFORE the model call, then settled into `requests` + tokens + cost after it (or released when
 *   the call fails before anything is billed).
 * - `AiSpendDaily` (platform day in Africa/Harare, 16 shards): global spend counter for the daily budget guard.
 *
 * Production: `DbUsageMeter` (meter-db.ts). Tests: {@link InMemoryUsageMeter}.
 */

export interface QuotaReservation {
  userId: string;
  /** The user's local calendar day at reservation time (settlement reuses it, even across midnight). */
  date: LocalDate;
  feature: AiFeature;
  /** Quota units (1 per message; "Think harder" counts 2). */
  cost: number;
}

export interface UsageRecord {
  userId: string;
  date: LocalDate;
  /** Platform day (Africa/Harare) for the global spend counter. */
  platformDate: LocalDate;
  feature: AiFeature;
  /** Reservation being settled; 0 when the call was not reserved (sub-calls such as intent classification). */
  reservedCost: number;
  /** Requests counted against the quota (the reservation cost, or 0 for un-reserved sub-calls). */
  requests: number;
  cacheHit: boolean;
  /** DEEP-tier units (separate daily DEEP cap). */
  deepRequests: number;
  images: number;
  usage: TokenUsage;
  costMicros: number;
}

/**
 * Features that draw on ONE daily allowance (PAY-5): `aiMessagesPerDay` covers the web/app tutor AND WhatsApp
 * explanations (src/server/billing/usage.ts sums both rows for the same limit), so a reservation for either is checked
 * against the SUM of both rows; per-row checks alone gave a cross-channel burst the allowance once per channel.
 */
export const AI_MESSAGE_QUOTA_FEATURES = ["TUTOR", "WHATSAPP"] as const satisfies readonly AiFeature[];

/** The features whose usage counts against the same daily limit as `feature` (itself included). */
export function quotaFeatures(feature: AiFeature): readonly AiFeature[] {
  return (AI_MESSAGE_QUOTA_FEATURES as readonly AiFeature[]).includes(feature) ? AI_MESSAGE_QUOTA_FEATURES : [feature];
}

export interface UsageMeter {
  /** Sum of today's spend shards (may be cached for a few seconds). */
  getDailySpendMicros(platformDate: LocalDate): Promise<number>;
  /**
   * Atomically reserves `cost` units if `requests + reservedRequests + cost <= dailyLimit` (`null` = unlimited), summed
   * over every feature sharing the allowance ({@link quotaFeatures}). Returns false (and changes nothing) when the
   * quota would be exceeded.
   */
  reserve(reservation: QuotaReservation, dailyLimit: number | null): Promise<boolean>;
  /** Gives back a reservation whose call failed before anything was billed. */
  release(reservation: QuotaReservation): Promise<void>;
  /** Settles a reservation (if any) and adds usage + cost to the user ledger and the global spend shard. */
  record(entry: UsageRecord): Promise<void>;
}

export const SPEND_SHARDS = 16;

/** Stable shard 0..15 for a user (FNV-1a 32-bit), spreading concurrent spend increments over 16 rows. */
export function spendShard(userId: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < userId.length; i += 1) {
    hash ^= userId.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash % SPEND_SHARDS;
}

function assertUnits(name: string, value: number): void {
  if (!Number.isInteger(value) || value < 0) throw new RangeError(`${name} must be a non-negative integer`);
}

/** Validates a reservation/record so both meter implementations reject the same bad input. */
export function assertValidReservation(reservation: QuotaReservation): void {
  assertUnits("cost", reservation.cost);
  if (reservation.cost === 0) throw new RangeError("cost must be at least 1");
}

export function assertValidRecord(entry: UsageRecord): void {
  assertUnits("reservedCost", entry.reservedCost);
  assertUnits("requests", entry.requests);
  assertUnits("deepRequests", entry.deepRequests);
  assertUnits("images", entry.images);
  assertUnits("costMicros", entry.costMicros);
}

export interface InMemoryUsageRow {
  requests: number;
  reservedRequests: number;
  cacheHits: number;
  deepRequests: number;
  images: number;
  usage: TokenUsage;
  costMicros: number;
}

/** Test double with the same semantics as the DB meter. */
export class InMemoryUsageMeter implements UsageMeter {
  readonly rows = new Map<string, InMemoryUsageRow>();
  readonly spend = new Map<string, { costMicros: number; requests: number }>();

  private key(userId: string, date: LocalDate, feature: AiFeature): string {
    return `${userId}|${date}|${feature}`;
  }

  row(userId: string, date: LocalDate, feature: AiFeature): InMemoryUsageRow | undefined {
    return this.rows.get(this.key(userId, date, feature));
  }

  private ensure(userId: string, date: LocalDate, feature: AiFeature): InMemoryUsageRow {
    const key = this.key(userId, date, feature);
    let row = this.rows.get(key);
    if (!row) {
      row = { requests: 0, reservedRequests: 0, cacheHits: 0, deepRequests: 0, images: 0, usage: { ...ZERO_USAGE }, costMicros: 0 };
      this.rows.set(key, row);
    }
    return row;
  }

  /** Test helper: preset today's platform spend. */
  setSpend(platformDate: LocalDate, costMicros: number): void {
    this.spend.set(platformDate, { costMicros, requests: 0 });
  }

  async getDailySpendMicros(platformDate: LocalDate): Promise<number> {
    return this.spend.get(platformDate)?.costMicros ?? 0;
  }

  async reserve(reservation: QuotaReservation, dailyLimit: number | null): Promise<boolean> {
    assertValidReservation(reservation);
    let used = 0;
    for (const feature of quotaFeatures(reservation.feature)) {
      const existing = this.row(reservation.userId, reservation.date, feature);
      used += existing ? existing.requests + existing.reservedRequests : 0;
    }
    if (dailyLimit !== null && used + reservation.cost > dailyLimit) return false;
    this.ensure(reservation.userId, reservation.date, reservation.feature).reservedRequests += reservation.cost;
    return true;
  }

  async release(reservation: QuotaReservation): Promise<void> {
    const row = this.row(reservation.userId, reservation.date, reservation.feature);
    if (row) row.reservedRequests = Math.max(0, row.reservedRequests - reservation.cost);
  }

  async record(entry: UsageRecord): Promise<void> {
    assertValidRecord(entry);
    const row = this.ensure(entry.userId, entry.date, entry.feature);
    row.reservedRequests = Math.max(0, row.reservedRequests - entry.reservedCost);
    row.requests += entry.requests;
    row.cacheHits += entry.cacheHit ? 1 : 0;
    row.deepRequests += entry.deepRequests;
    row.images += entry.images;
    row.usage = addUsage(row.usage, entry.usage);
    row.costMicros += entry.costMicros;
    const spend = this.spend.get(entry.platformDate) ?? { costMicros: 0, requests: 0 };
    this.spend.set(entry.platformDate, {
      costMicros: spend.costMicros + entry.costMicros,
      requests: spend.requests + 1,
    });
  }
}
