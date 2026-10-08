import { z } from "zod";

/**
 * Setting `messaging.smsBudget` (shape and default): the platform-wide SMS budget against toll fraud (SECURITY.md
 * AUTH-05 residual), enforced on every paid SMS send by ./sms-budget.ts. A leaf module (zod only) so the shared
 * settings registry (src/server/lib/settings.ts `SETTING_DEFINITIONS`) can import it without import cycles.
 *
 * - `dailyMax`: most text messages the platform sends per platform day (Africa/Harare), every purpose together (codes,
 *   notifications). `null` = no cap (not recommended in production). When reached, further SMS that day are refused and
 *   every SUPER_ADMIN is alerted once.
 * - `allowedCountryPrefixes`: E.164 prefixes SMS may go to, e.g. `["+263"]` (Zimbabwe) or `["+263", "+27"]`. A longer
 *   prefix narrows to networks (`"+26377"`). Empty = no SMS at all. Sends to any other number are refused before the
 *   provider is called: SMS pumping usually targets premium or foreign ranges.
 */

const prefixSchema = z
  .string()
  .trim()
  .regex(/^\+[1-9]\d{0,6}$/, { error: "Use an international prefix such as +263." });

export const smsBudgetSchema = z.object({
  dailyMax: z.number().int().min(1).max(10_000_000).nullable(),
  allowedCountryPrefixes: z
    .array(prefixSchema)
    .max(50)
    .transform((prefixes) => [...new Set(prefixes)]),
});

export type SmsBudgetSetting = z.output<typeof smsBudgetSchema>;

/**
 * Launch default: Zimbabwean numbers only, at most 2,000 SMS a day (a few times the expected code volume at launch).
 * Review both before go-live and as the platform grows (docs/DEPLOYMENT.md go-live checklist).
 */
export const DEFAULT_SMS_BUDGET: SmsBudgetSetting = { dailyMax: 2_000, allowedCountryPrefixes: ["+263"] };
