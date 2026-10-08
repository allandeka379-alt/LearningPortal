import { z } from "zod";

/**
 * Setting `ai.contentGeneration` (SUPER_ADMIN-editable): per-editor daily caps for CMS AI generation jobs (§41).
 *
 * A leaf module (zod only) so the shared settings registry (src/server/lib/settings.ts `SETTING_DEFINITIONS`) can
 * register the schema and default without importing the AI-drafts service. Re-exported by ./service.ts.
 */
export const CONTENT_GENERATION_SETTING = "ai.contentGeneration";

export const contentGenerationLimitsSchema = z.object({
  /** Jobs per editor per Africa/Harare day (also the gateway's CONTENT_GEN quota). */
  editorDailyJobs: z.int().min(0).max(1_000),
  /** Metered spend per editor per day in USD micro-dollars; null = no cap. */
  editorDailyCostMicros: z.int().min(0).nullable(),
});

export type ContentGenerationLimits = z.output<typeof contentGenerationLimitsSchema>;

export const DEFAULT_CONTENT_GENERATION_LIMITS: ContentGenerationLimits = { editorDailyJobs: 20, editorDailyCostMicros: 5_000_000 };
