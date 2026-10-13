import "server-only";
import { z } from "zod";
import { db } from "@/server/db";
import { hashIp, hmacSha256 } from "@/server/lib/crypto";
import type { LocalDate } from "@/lib/dates";
import { dateRangeSchema, instantWindow, type DateRange } from "./core";
import { PLATFORM_TIMEZONE } from "./rollups";

export const MARKETING_EVENT_TYPES = ["PAGE_VIEW", "CLICK", "SIGNUP_CLICK", "CHECKOUT_CLICK"] as const;
export type MarketingEventType = (typeof MARKETING_EVENT_TYPES)[number];

export const marketingEventInputSchema = z.object({
  type: z.enum(MARKETING_EVENT_TYPES),
  path: z.string().min(1).max(600),
  target: z.string().max(600).nullish(),
  referrer: z.string().max(2048).nullish(),
  sessionId: z.string().min(8).max(128).regex(/^[A-Za-z0-9_-]+$/).nullish(),
  utm: z
    .object({
      source: z.string().max(120).nullish(),
      medium: z.string().max(120).nullish(),
      campaign: z.string().max(180).nullish(),
      term: z.string().max(180).nullish(),
      content: z.string().max(180).nullish(),
    })
    .nullish(),
});

export type MarketingEventInput = z.output<typeof marketingEventInputSchema>;

export interface MarketingEventMeta {
  requestUrl: string;
  ip: string | null;
  userAgent: string | null;
  userId?: string | null;
}

export interface MarketingGrowthAnalytics {
  totals: {
    visits: number;
    clicks: number;
    signupClicks: number;
    checkoutClicks: number;
  };
  topPages: { path: string; visits: number }[];
  topClicks: { target: string; clicks: number }[];
  sources: { source: string; visits: number }[];
}

const PRIVATE_ANALYTICS_PREFIXES = ["/admin", "/app", "/teacher", "/parent", "/school", "/api", "/dev", "/invite"] as const;

function truncate(value: string, max: number): string {
  return value.length > max ? value.slice(0, max) : value;
}

function cleanText(value: string | null | undefined, max: number): string | null {
  const trimmed = value?.trim();
  return trimmed ? truncate(trimmed, max) : null;
}

export function normalizeMarketingPath(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) return null;
  try {
    const url = new URL(trimmed, "https://bvunzohub.invalid");
    const path = url.pathname || "/";
    return truncate(path, 300);
  } catch {
    return null;
  }
}

export function isPublicAnalyticsPath(path: string): boolean {
  return !PRIVATE_ANALYTICS_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

function normalizeTarget(value: string | null | undefined, requestUrl: string): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) return normalizeMarketingPath(trimmed);
  try {
    const request = new URL(requestUrl);
    const url = new URL(trimmed, request);
    if (url.origin === request.origin) return normalizeMarketingPath(`${url.pathname}${url.search}${url.hash}`);
    return truncate(url.hostname.toLowerCase(), 300);
  } catch {
    return cleanText(trimmed, 300);
  }
}

function referrerHost(value: string | null | undefined, requestUrl: string): string | null {
  const referrer = value?.trim();
  if (!referrer) return null;
  try {
    const request = new URL(requestUrl);
    const url = new URL(referrer);
    if (url.origin === request.origin) return null;
    return truncate(url.hostname.toLowerCase(), 160);
  } catch {
    return null;
  }
}

export async function recordMarketingEvent(input: MarketingEventInput, meta: MarketingEventMeta): Promise<{ recorded: boolean }> {
  const path = normalizeMarketingPath(input.path);
  if (path === null || !isPublicAnalyticsPath(path)) return { recorded: false };
  const target = normalizeTarget(input.target, meta.requestUrl);
  const anonymousId = cleanText(input.sessionId, 128);
  const userAgent = cleanText(meta.userAgent, 512);

  await db.marketingEvent.create({
    data: {
      type: input.type,
      path,
      target,
      referrerHost: referrerHost(input.referrer, meta.requestUrl),
      utmSource: cleanText(input.utm?.source, 80),
      utmMedium: cleanText(input.utm?.medium, 80),
      utmCampaign: cleanText(input.utm?.campaign, 120),
      utmTerm: cleanText(input.utm?.term, 120),
      utmContent: cleanText(input.utm?.content, 120),
      userId: meta.userId ?? null,
      anonymousIdHash: anonymousId ? hmacSha256(`marketing-session:${anonymousId}`) : null,
      ipHash: meta.ip ? hashIp(meta.ip) : null,
      userAgentHash: userAgent ? hmacSha256(`marketing-ua:${userAgent}`) : null,
    },
  });
  return { recorded: true };
}

export async function getMarketingGrowthAnalytics(
  input: { from: LocalDate; to: LocalDate },
  topN: number,
): Promise<MarketingGrowthAnalytics> {
  const parsed = dateRangeSchema.parse(input);
  const range: DateRange = parsed;
  const { start, end } = instantWindow(range, PLATFORM_TIMEZONE);
  const limit = Math.min(50, Math.max(1, Math.floor(topN)));

  const [totals, topPages, topClicks, sources] = await Promise.all([
    db.$queryRaw<{ visits: number; clicks: number; signupClicks: number; checkoutClicks: number }[]>`
      SELECT
        count(*) FILTER (WHERE "type" = 'PAGE_VIEW')::int AS "visits",
        count(*) FILTER (WHERE "type" IN ('CLICK', 'SIGNUP_CLICK', 'CHECKOUT_CLICK'))::int AS "clicks",
        count(*) FILTER (WHERE "type" = 'SIGNUP_CLICK')::int AS "signupClicks",
        count(*) FILTER (WHERE "type" = 'CHECKOUT_CLICK')::int AS "checkoutClicks"
      FROM "MarketingEvent"
      WHERE "createdAt" >= ${start} AND "createdAt" < ${end}`,
    db.$queryRaw<{ path: string; visits: number }[]>`
      SELECT "path", count(*)::int AS "visits"
      FROM "MarketingEvent"
      WHERE "type" = 'PAGE_VIEW' AND "createdAt" >= ${start} AND "createdAt" < ${end}
      GROUP BY "path"
      ORDER BY "visits" DESC, "path"
      LIMIT ${limit}`,
    db.$queryRaw<{ target: string; clicks: number }[]>`
      SELECT coalesce("target", "path") AS "target", count(*)::int AS "clicks"
      FROM "MarketingEvent"
      WHERE "type" IN ('CLICK', 'SIGNUP_CLICK', 'CHECKOUT_CLICK') AND "createdAt" >= ${start} AND "createdAt" < ${end}
      GROUP BY coalesce("target", "path")
      ORDER BY "clicks" DESC, "target"
      LIMIT ${limit}`,
    db.$queryRaw<{ source: string; visits: number }[]>`
      SELECT coalesce(nullif("utmSource", ''), "referrerHost", 'direct') AS "source", count(*)::int AS "visits"
      FROM "MarketingEvent"
      WHERE "type" = 'PAGE_VIEW' AND "createdAt" >= ${start} AND "createdAt" < ${end}
      GROUP BY coalesce(nullif("utmSource", ''), "referrerHost", 'direct')
      ORDER BY "visits" DESC, "source"
      LIMIT ${limit}`,
  ]);

  const total = totals[0] ?? { visits: 0, clicks: 0, signupClicks: 0, checkoutClicks: 0 };
  return { totals: total, topPages, topClicks, sources };
}
