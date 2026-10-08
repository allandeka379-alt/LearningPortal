import type { PrismaClient } from "@/generated/prisma/client";
import { PLANS } from "../data/platform";
import type { PlatformIds } from "../platform";
import type { SeedLog, SeedTally } from "../util";

/** Length of a school term for the dev sample TERM price (PlanPrice.periodDays is required for TERM). */
const SAMPLE_TERM_DAYS = 91;

/**
 * DEV ONLY: clearly labelled sample prices (`devSamplePrices` in data/platform.ts) so checkout can be exercised
 * locally. Rows are `isDemo` and labelled "Sample price (development only)"; production plans have no seeded prices
 * (§31). Prices are immutable, so an existing identical sample is reused, never edited.
 */
export async function seedDemoPrices(db: PrismaClient, platform: PlatformIds, tally: SeedTally, log: SeedLog): Promise<void> {
  let count = 0;
  for (const plan of PLANS) {
    const ids = platform.plans.get(plan.code);
    if (!ids) continue;
    for (const [index, sample] of plan.devSamplePrices.entries()) {
      const perSeat = ids.audience === "SCHOOL";
      const existing = await db.planPrice.findFirst({
        where: { planId: ids.id, currency: sample.currency, interval: sample.interval, amountMinor: sample.amountMinor, isDemo: true },
        select: { id: true },
      });
      if (!existing) {
        await db.planPrice.create({
          data: {
            planId: ids.id,
            currency: sample.currency,
            amountMinor: sample.amountMinor,
            interval: sample.interval,
            intervalCount: 1,
            periodDays: sample.interval === "TERM" ? SAMPLE_TERM_DAYS : null,
            perSeat,
            label: "Sample price (development only)",
            sortOrder: index + 1,
            isDemo: true,
          },
        });
      }
      tally.add("PlanPrice", !existing);
      count += 1;
    }
  }
  log.info(`demo: ${count} sample plan prices`);
}
