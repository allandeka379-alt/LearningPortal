import { Prisma, type PrismaClient } from "@/generated/prisma/client";
import { entitlementsSchema } from "@/lib/billing/entitlements";
import { SETTING_DEFINITIONS } from "@/server/lib/settings";
import { ORIGINAL_CONTENT_SOURCE } from "./data/catalogue-extra";
import { ACHIEVEMENTS, FULL_ACCESS_PLAN_CODE, PLANS, RETIRED_PLAN_CODES, SETTINGS, type SeedAchievement } from "./data/platform";
import { EXTRA_SETTINGS } from "./data/settings-extra";
import type { SeedLog, SeedTally } from "./util";

/**
 * ALWAYS-seeded platform configuration (all environments): plans with their default entitlements (§31: prices are set
 * by admins, except the owner-decided one-off Full access price, USD 1.00, seeded everywhere), achievement definitions,
 * settings and the "Original content" ContentSource. Create-only: existing rows are never modified (admin edits survive
 * re-seeding), apart from the one-time move to the one-off pricing model ({@link applyOneOffPricingModel}) and the
 * no-free-tier rule enforced on every run ({@link applyNoFreeTier}).
 */

export interface PlatformIds {
  plans: Map<string, { id: string; audience: "INDIVIDUAL" | "SCHOOL" }>;
  originalSourceId: string;
}

/**
 * Maps the seed data's achievement rule (`{ type: "streak_days", threshold }`) onto the documented
 * `Achievement.criteria` contract (schema doc: `{ type: "STREAK_DAYS", days }`, `{ type: "QUESTIONS_ANSWERED", count }`…).
 */
export function achievementCriteria(criteria: SeedAchievement["criteria"]): Prisma.InputJsonObject {
  switch (criteria.type) {
    case "streak_days":
      return { type: "STREAK_DAYS", days: criteria.threshold };
    case "questions_answered":
      return { type: "QUESTIONS_ANSWERED", count: criteria.threshold };
    case "mocks_completed":
      return { type: "MOCKS_COMPLETED", count: criteria.threshold };
    case "topics_mastered":
      return { type: "TOPICS_MASTERED", count: criteria.threshold };
    case "diagnostics_completed":
      return { type: "DIAGNOSTIC_COMPLETED" };
    default:
      throw new Error(`platform seed: unknown achievement criteria type "${criteria.type}"`);
  }
}

/**
 * `Achievement.code` must be UPPER_SNAKE (`Achievement_values_chk`); the seed data uses kebab-case codes
 * ("streak-3"), so they are converted ("STREAK_3").
 */
export function achievementCode(code: string): string {
  return code.trim().toUpperCase().replace(/[^A-Z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

/** Validates a setting value against its registered schema (unknown keys pass through). */
export function validateSettingValue(key: string, value: unknown): void {
  if (!Object.hasOwn(SETTING_DEFINITIONS, key)) return;
  const definition = SETTING_DEFINITIONS[key as keyof typeof SETTING_DEFINITIONS];
  const parsed = definition.schema.safeParse(value);
  if (!parsed.success) throw new Error(`platform seed: setting "${key}" does not match its schema: ${parsed.error.message}`);
}

/**
 * One-time move of an EXISTING database to the 2026-10-07 pricing model (one-off Full access). It runs
 * in the seed run that first creates the FULL_ACCESS plan, so it happens exactly once per database and later admin
 * edits survive re-seeding: the retired plans leave sale and /pricing (rows kept; running subscriptions keep their
 * access until they end) and the FREE plan takes its seeded copy and entitlements (since 2026-10-12: nothing, see
 * {@link applyNoFreeTier}, which also runs on every later seed). A fresh database gets the same result from PLANS directly (the updates are then no-ops).
 */
export async function applyOneOffPricingModel(db: PrismaClient, log: SeedLog): Promise<void> {
  const retired = await db.plan.updateMany({
    where: { code: { in: [...RETIRED_PLAN_CODES] }, isDefault: false, OR: [{ isActive: true }, { isPublic: true }] },
    data: { isActive: false, isPublic: false },
  });
  const free = PLANS.find((plan) => plan.code === "FREE");
  if (free) {
    await db.plan.updateMany({
      where: { code: "FREE" },
      data: {
        name: free.name,
        tagline: free.tagline ?? null,
        description: free.description,
        entitlements: entitlementsSchema.parse(free.entitlements) as unknown as Prisma.InputJsonObject,
      },
    });
  }
  // Referral rewards granted a week of the (now retired) STUDENT plan: they become a week of Full access.
  const referral = await db.setting.findUnique({ where: { key: "referrals.rules" }, select: { value: true } });
  const rules = referral?.value;
  if (rules && typeof rules === "object" && !Array.isArray(rules)) {
    const next: Record<string, unknown> = { ...(rules as Record<string, unknown>) };
    let changed = false;
    for (const key of ["reward", "refereeReward"]) {
      const reward = next[key];
      if (reward && typeof reward === "object" && !Array.isArray(reward)) {
        const planCode = (reward as Record<string, unknown>).planCode;
        if (typeof planCode === "string" && RETIRED_PLAN_CODES.includes(planCode)) {
          next[key] = { ...(reward as Record<string, unknown>), planCode: FULL_ACCESS_PLAN_CODE };
          changed = true;
        }
      }
    }
    if (changed) await db.setting.update({ where: { key: "referrals.rules" }, data: { value: next as Prisma.InputJsonObject } });
  }
  log.info(`platform: one-off pricing model applied (${retired.count} subscription plans retired, default plan updated)`);
}

/**
 * Monthly pricing (owner decision 2026-10-12: "a dollar a month"): the lifetime one-off Full access price is retired
 * (inactive, validTo now; price rows are immutable, so it is never edited) and a ONE_OFF price with a 30-day access
 * period takes its place: each Paynow payment adds a month (purchases.ts stacks it after a running pass). Runs on every
 * seed and is idempotent: nothing happens once an active monthly price exists. Lifetime purchases already made keep
 * their access (the grants are untouched).
 */
export async function applyMonthlyPricing(db: PrismaClient, log: SeedLog, now: Date = new Date()): Promise<boolean> {
  const seeded = PLANS.find((plan) => plan.code === FULL_ACCESS_PLAN_CODE)?.oneOffPrice;
  if (!seeded || seeded.periodDays === null) return false;
  const plan = await db.plan.findUnique({ where: { code: FULL_ACCESS_PLAN_CODE }, select: { id: true } });
  if (!plan) return false;
  const live = { planId: plan.id, currency: seeded.currency, interval: "ONE_OFF" as const, isActive: true, OR: [{ validTo: null }, { validTo: { gt: now } }] };
  const monthly = await db.planPrice.findFirst({ where: { ...live, periodDays: seeded.periodDays }, select: { id: true } });
  if (monthly) return false;
  const retired = await db.planPrice.updateMany({ where: { ...live, periodDays: null }, data: { isActive: false, validTo: now } });
  await db.planPrice.create({
    data: {
      planId: plan.id,
      currency: seeded.currency,
      amountMinor: seeded.amountMinor,
      interval: "ONE_OFF",
      intervalCount: 1,
      periodDays: seeded.periodDays,
      perSeat: false,
      label: seeded.label,
      sortOrder: 1,
    },
  });
  log.info(`platform: monthly pricing applied (${seeded.amountMinor / 100} ${seeded.currency} for ${seeded.periodDays} days; ${retired.count} lifetime price(s) retired)`);
  return true;
}

/**
 * No free tier (owner decision 2026-10-12): the FREE plan (the default for users without a paid source) grants nothing
 * and is not public. Enforced on EVERY seed run, unlike the create-only rows above, because existing databases
 * (production) still hold the 2026-10-07 free preview; idempotent: a database that already matches is not written.
 * Users with a school seat or any other grant keep their access (it never came from this plan).
 */
export async function applyNoFreeTier(db: PrismaClient, log: SeedLog): Promise<boolean> {
  const seeded = PLANS.find((plan) => plan.code === "FREE");
  if (!seeded) return false;
  const row = await db.plan.findUnique({
    where: { code: "FREE" },
    select: { id: true, name: true, tagline: true, description: true, isPublic: true, entitlements: true },
  });
  if (!row) return false;
  const entitlements = entitlementsSchema.parse(seeded.entitlements);
  const stored = entitlementsSchema.safeParse(row.entitlements);
  const matches =
    !row.isPublic &&
    row.name === seeded.name &&
    row.tagline === (seeded.tagline ?? null) &&
    row.description === seeded.description &&
    stored.success &&
    JSON.stringify(stored.data) === JSON.stringify(entitlements);
  if (matches) return false;
  await db.plan.update({
    where: { id: row.id },
    data: {
      name: seeded.name,
      tagline: seeded.tagline ?? null,
      description: seeded.description,
      highlights: [],
      isPublic: false,
      entitlements: entitlements as unknown as Prisma.InputJsonObject,
    },
  });
  log.info("platform: no free tier applied (the default FREE plan now grants nothing and is hidden from /pricing)");
  return true;
}

/**
 * A `features` row written before a flag existed (e.g. `sms`, owner decision 2026-10-07) gets that flag stored as
 * its seeded value (off); every flag already stored keeps its value. A missing key already reads as off
 * (`toFeatureFlags`), so this only makes the stored row complete for the admin editor and for readers of the raw row.
 */
async function addMissingFeatureFlags(db: PrismaClient, stored: Prisma.JsonValue, seeded: unknown): Promise<void> {
  if (typeof stored !== "object" || stored === null || Array.isArray(stored)) return;
  if (typeof seeded !== "object" || seeded === null) return;
  const missing = Object.entries(seeded as Record<string, unknown>).filter(([key]) => !(key in stored));
  if (missing.length === 0) return;
  await db.setting.update({ where: { key: "features" }, data: { value: { ...Object.fromEntries(missing), ...stored } as Prisma.InputJsonObject } });
}

export async function seedPlatform(db: PrismaClient, tally: SeedTally, log: SeedLog): Promise<PlatformIds> {
  const plans = new Map<string, { id: string; audience: "INDIVIDUAL" | "SCHOOL" }>();
  const hasDefault = await db.plan.findFirst({ where: { isDefault: true }, select: { id: true } });
  const pricingModelApplied = (await db.plan.findUnique({ where: { code: FULL_ACCESS_PLAN_CODE }, select: { id: true } })) !== null;
  for (const plan of PLANS) {
    const entitlements = entitlementsSchema.parse(plan.entitlements);
    const existing = await db.plan.findUnique({ where: { code: plan.code }, select: { id: true } });
    const row =
      existing ??
      (await db.plan.create({
        data: {
          code: plan.code,
          name: plan.name,
          tagline: plan.tagline ?? null,
          description: plan.description,
          highlights: plan.highlights ?? [],
          audience: plan.audience,
          sortOrder: plan.sortOrder,
          isPublic: plan.isPublic,
          isActive: plan.isActive ?? true,
          // The FREE plan is the fallback for users without a paid source (at most one default, partial unique).
          isDefault: plan.code === "FREE" && !hasDefault,
          entitlements: entitlements as unknown as Prisma.InputJsonObject,
        },
        select: { id: true },
      }));
    tally.add("Plan", !existing);
    plans.set(plan.code, { id: row.id, audience: plan.audience });

    // The owner-decided one-off price (every environment). Only when the plan has no price at all: prices are
    // immutable rows, so an admin's change (new row + old one deactivated) is never undone by re-seeding.
    if (plan.oneOffPrice) {
      const anyPrice = await db.planPrice.findFirst({ where: { planId: row.id }, select: { id: true } });
      if (!anyPrice) {
        await db.planPrice.create({
          data: {
            planId: row.id,
            currency: plan.oneOffPrice.currency,
            amountMinor: plan.oneOffPrice.amountMinor,
            interval: "ONE_OFF",
            intervalCount: 1,
            periodDays: plan.oneOffPrice.periodDays,
            perSeat: false,
            label: plan.oneOffPrice.label,
            sortOrder: 1,
          },
        });
      }
      tally.add("PlanPrice", !anyPrice);
    }
  }
  if (!pricingModelApplied) await applyOneOffPricingModel(db, log);
  await applyNoFreeTier(db, log);
  await applyMonthlyPricing(db, log);

  for (const [index, achievement] of ACHIEVEMENTS.entries()) {
    const code = achievementCode(achievement.code);
    const existing = await db.achievement.findUnique({ where: { code }, select: { id: true } });
    if (!existing) {
      await db.achievement.create({
        data: {
          code,
          name: achievement.name,
          description: achievement.description,
          category: achievement.category,
          criteria: achievementCriteria(achievement.criteria),
          xpReward: achievement.xpReward,
          iconKey: achievement.iconKey,
          sortOrder: index + 1,
        },
      });
    }
    tally.add("Achievement", !existing);
  }

  for (const setting of [...SETTINGS, ...EXTRA_SETTINGS]) {
    validateSettingValue(setting.key, setting.value);
    const existing = await db.setting.findUnique({ where: { key: setting.key }, select: { key: true, value: true } });
    if (existing && setting.key === "features") await addMissingFeatureFlags(db, existing.value, setting.value);
    if (!existing) {
      await db.setting.create({
        data: {
          key: setting.key,
          description: setting.description,
          value: setting.value === null ? Prisma.JsonNull : (setting.value as Prisma.InputJsonValue),
        },
      });
    }
    tally.add("Setting", !existing);
  }

  const existingSource = await db.contentSource.findUnique({ where: { slug: ORIGINAL_CONTENT_SOURCE.slug }, select: { id: true } });
  const source = existingSource ?? (await db.contentSource.create({ data: { ...ORIGINAL_CONTENT_SOURCE }, select: { id: true } }));
  tally.add("ContentSource", !existingSource);

  log.info(`platform: ${plans.size} plans (one-off Full access price included), ${ACHIEVEMENTS.length} achievements, ${SETTINGS.length + EXTRA_SETTINGS.length} settings`);
  return { plans, originalSourceId: source.id };
}
