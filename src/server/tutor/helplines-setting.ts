import { z } from "zod";

/**
 * Setting `safety.helplines` (ARCHITECTURE §6.4): the help contacts shown with a safeguarding reply by the tutor and
 * the question solver. Never hard-coded: platform staff maintain the list. Pure (zod only), so the settings registry
 * can import it without an import cycle through the tutor service.
 */

export const HELPLINES_SETTING_KEY = "safety.helplines";

export const helplinesSettingSchema = z
  .array(
    z.object({
      name: z.string().min(1).max(120),
      phone: z.string().max(40).optional(),
      url: z.url().max(300).optional(),
      description: z.string().max(300).optional(),
    }),
  )
  .max(10);

export type HelplinesSetting = z.output<typeof helplinesSettingSchema>;
