import { z } from "zod";

/**
 * Setting `flashcards.scheduler` (§18): admin-tunable spaced-repetition parameters. Anything missing uses the code
 * defaults (`DEFAULT_SRS_CONFIG` in ./srs, `DEFAULT_NEW_CARDS_PER_DAY` in ./decks). Pure (zod only), so the settings
 * registry (src/server/lib/settings.ts) can import it without an import cycle through the flashcards service.
 */

export const SCHEDULER_SETTING_KEY = "flashcards.scheduler";

/** Highest daily new-card allowance an admin may set (mirrors `MAX_NEW_CARDS_PER_DAY` in ./decks). */
export const SCHEDULER_MAX_NEW_CARDS_PER_DAY = 500;

const steps = z.array(z.number().positive().max(1440)).min(1).max(10);

export const schedulerSettingSchema = z.looseObject({
  newCardsPerDay: z.number().int().min(0).max(SCHEDULER_MAX_NEW_CARDS_PER_DAY).optional(),
  learningStepsMinutes: steps.optional(),
  relearningStepsMinutes: steps.optional(),
  graduatingIntervalDays: z.number().int().min(1).max(30).optional(),
  easyIntervalDays: z.number().int().min(1).max(60).optional(),
  startingEase: z.number().min(1.3).max(5).optional(),
  maxIntervalDays: z.number().int().min(1).max(3650).optional(),
  leechThreshold: z.number().int().min(2).max(100).optional(),
});

export type SchedulerSetting = z.output<typeof schedulerSettingSchema>;
