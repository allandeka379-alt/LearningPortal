/**
 * Form → value converters for the typed setting editors (/admin/settings, /admin/ai/settings). Pure and isomorphic:
 * they turn the submitted strings into the JSON value a setting stores and report conversion problems (not a number,
 * malformed line) under the SAME field names the editors use. Range and shape rules are then enforced by the setting's
 * Zod schema in the service, whose error paths are those same field names (`availability.mon`, `login.limit`...).
 */

export type SettingFormValues = Readonly<Record<string, string | undefined>>;
export type FieldErrorMap = Record<string, string[]>;
export type SettingFormResult = { ok: true; value: unknown } | { ok: false; fieldErrors: FieldErrorMap };

function addError(errors: FieldErrorMap, field: string, message: string): void {
  (errors[field] ??= []).push(message);
}

function text(values: SettingFormValues, name: string): string | undefined {
  const value = values[name]?.trim();
  return value === undefined || value === "" ? undefined : value;
}

/** A whole number field: `undefined` when blank; records an error (and returns undefined) when not a whole number. */
export function readInt(values: SettingFormValues, name: string, errors: FieldErrorMap, options: { required?: boolean } = {}): number | undefined {
  const raw = text(values, name);
  if (raw === undefined) {
    if (options.required) addError(errors, name, "Enter a value.");
    return undefined;
  }
  const cleaned = raw.replace(/[\s,_]/g, "");
  if (!/^-?\d{1,12}$/.test(cleaned)) {
    addError(errors, name, "Enter a whole number.");
    return undefined;
  }
  return Number(cleaned);
}

/** A decimal field ("0.5"): `undefined` when blank. */
export function readDecimal(values: SettingFormValues, name: string, errors: FieldErrorMap, options: { required?: boolean } = {}): number | undefined {
  const raw = text(values, name);
  if (raw === undefined) {
    if (options.required) addError(errors, name, "Enter a value.");
    return undefined;
  }
  const cleaned = raw.replace(/[\s,]/g, "");
  if (!/^-?\d{1,9}(\.\d{1,6})?$/.test(cleaned)) {
    addError(errors, name, "Enter a number such as 0.75.");
    return undefined;
  }
  return Number(cleaned);
}

/** A checkbox / switch: present with any value but "false"/"off" means on. */
export function readFlag(values: SettingFormValues, name: string): boolean {
  const value = values[name];
  return value !== undefined && value !== "" && value !== "false" && value !== "off";
}

function result(errors: FieldErrorMap, value: unknown): SettingFormResult {
  return Object.keys(errors).length > 0 ? { ok: false, fieldErrors: errors } : { ok: true, value };
}

// ---------------------------------------------------------------------------------------------------------------------
// Platform settings
// ---------------------------------------------------------------------------------------------------------------------

/** `features`: one checkbox per flag, named after it (src/lib/features.ts); an unticked box means off. */
export function parseFeaturesForm(values: SettingFormValues): SettingFormResult {
  return {
    ok: true,
    value: {
      ai: readFlag(values, "ai"),
      whatsapp: readFlag(values, "whatsapp"),
      email: readFlag(values, "email"),
      sms: readFlag(values, "sms"),
      stripe: readFlag(values, "stripe"),
    },
  };
}

export function parseBooleanSettingForm(values: SettingFormValues): SettingFormResult {
  return { ok: true, value: readFlag(values, "value") };
}

export function parseIntegerSettingForm(values: SettingFormValues): SettingFormResult {
  const errors: FieldErrorMap = {};
  const value = readInt(values, "value", errors, { required: true });
  return result(errors, value);
}

export function parseRetentionDaysForm(values: SettingFormValues): SettingFormResult {
  const errors: FieldErrorMap = {};
  const days = readInt(values, "days", errors, { required: true });
  return result(errors, { days });
}

export const WEEKDAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
export type Weekday = (typeof WEEKDAYS)[number];

/** `study.defaults`: `{ dailyGoalMinutes, availability: { mon … sun } }` (minutes). */
export function parseStudyDefaultsForm(values: SettingFormValues): SettingFormResult {
  const errors: FieldErrorMap = {};
  const dailyGoalMinutes = readInt(values, "dailyGoalMinutes", errors, { required: true });
  const availability: Partial<Record<Weekday, number>> = {};
  for (const day of WEEKDAYS) {
    const minutes = readInt(values, `availability.${day}`, errors, { required: true });
    if (minutes !== undefined) availability[day] = minutes;
  }
  return result(errors, { dailyGoalMinutes, availability });
}

/** Integer XP rule fields of `gamification.xp` (besides the per-difficulty map, the fraction and milestones). */
export const XP_INTEGER_FIELDS = [
  "questionAnswered",
  "lessonCompleted",
  "flashcardSession",
  "flashcardSessionMinCards",
  "mockExamCompleted",
  "dailyGoalMet",
  "weeklyGoalMet",
] as const;
export const XP_DIFFICULTIES = [1, 2, 3, 4, 5] as const;

/** "7: 25" / "7=25" lines → { "7": 25 }. */
export function parseMilestones(raw: string | undefined, errors: FieldErrorMap, field = "streakMilestones"): Record<string, number> | undefined {
  if (raw === undefined || raw.trim() === "") return undefined;
  const milestones: Record<string, number> = {};
  const lines = raw.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  for (const line of lines) {
    const match = /^(\d{1,4})\s*[:=]\s*(\d{1,6})$/.exec(line);
    if (!match || match[1] === undefined || match[2] === undefined || Number(match[1]) < 1) {
      addError(errors, field, `"${line.slice(0, 40)}" is not "days: XP" (for example 7: 25).`);
      continue;
    }
    milestones[String(Number(match[1]))] = Number(match[2]);
  }
  return milestones;
}

/** Milestones record → editor text, smallest streak first. */
export function formatMilestones(milestones: Readonly<Record<string, number>> | undefined | null): string {
  if (!milestones) return "";
  return Object.entries(milestones)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([days, xp]) => `${days}: ${xp}`)
    .join("\n");
}

/**
 * `gamification.xp`: a PARTIAL override (only filled fields; empty = built-in default), or `null` when nothing is
 * filled or "use built-in defaults" is ticked.
 */
export function parseXpForm(values: SettingFormValues): SettingFormResult {
  if (readFlag(values, "useDefaults")) return { ok: true, value: null };
  const errors: FieldErrorMap = {};
  const override: Record<string, unknown> = {};
  for (const field of XP_INTEGER_FIELDS) {
    const value = readInt(values, field, errors);
    if (value !== undefined) override[field] = value;
  }
  const byDifficulty: Record<string, number> = {};
  for (const level of XP_DIFFICULTIES) {
    const value = readInt(values, `correctAnswerByDifficulty.${level}`, errors);
    if (value !== undefined) byDifficulty[String(level)] = value;
  }
  if (Object.keys(byDifficulty).length > 0) override.correctAnswerByDifficulty = byDifficulty;
  const fraction = readDecimal(values, "partialCreditFraction", errors);
  if (fraction !== undefined) override.partialCreditFraction = fraction;
  const milestones = parseMilestones(values.streakMilestones, errors);
  if (milestones !== undefined) override.streakMilestones = milestones;
  return result(errors, Object.keys(override).length === 0 ? null : override);
}

/**
 * `rateLimits`: per preset `<name>.limit` and `<name>.windowSeconds`. A row left empty, or equal to the built-in
 * rule, is not stored (so code defaults keep applying); a half-filled row takes the other half from the default.
 */
export function parseRateLimitsForm(
  values: SettingFormValues,
  presets: Readonly<Record<string, { limit: number; windowSeconds: number }>>,
): SettingFormResult {
  const errors: FieldErrorMap = {};
  const overrides: Record<string, { limit: number; windowSeconds: number }> = {};
  for (const [name, rule] of Object.entries(presets)) {
    const limit = readInt(values, `${name}.limit`, errors);
    const windowSeconds = readInt(values, `${name}.windowSeconds`, errors);
    if (limit === undefined && windowSeconds === undefined) continue;
    const next = { limit: limit ?? rule.limit, windowSeconds: windowSeconds ?? rule.windowSeconds };
    if (next.limit === rule.limit && next.windowSeconds === rule.windowSeconds) continue;
    overrides[name] = next;
  }
  return result(errors, overrides);
}

// ---------------------------------------------------------------------------------------------------------------------
// SMS budget (`messaging.smsBudget`, src/server/messaging/sms-budget.ts)
// ---------------------------------------------------------------------------------------------------------------------

/**
 * `messaging.smsBudget`: `dailyMax` (a whole number, or no cap only when "noCap" is ticked: an empty field never
 * silently removes the cap) and `allowedCountryPrefixes` (prefixes separated by commas, spaces or new lines).
 */
export function parseSmsBudgetForm(values: SettingFormValues): SettingFormResult {
  const errors: FieldErrorMap = {};
  const noCap = readFlag(values, "noCap");
  const dailyMax = noCap ? null : readInt(values, "dailyMax", errors, { required: true });
  const allowedCountryPrefixes = (values.allowedCountryPrefixes ?? "")
    .split(/[\s,;]+/)
    .map((prefix) => prefix.trim())
    .filter(Boolean);
  return result(errors, { dailyMax: dailyMax ?? null, allowedCountryPrefixes });
}

/** Prefix list → editor text. */
export function formatSmsPrefixes(prefixes: readonly string[] | null | undefined): string {
  return (prefixes ?? []).join(", ");
}

// ---------------------------------------------------------------------------------------------------------------------
// Exchange rates (`fx.rates`, src/lib/billing/fx.ts)
// ---------------------------------------------------------------------------------------------------------------------

const FX_LINE = /^([A-Za-z]{3})\s*[:=]\s*(\d{1,7}(?:\.\d{1,10})?)\s*(?:USD)?\s*,\s*(\d{4}-\d{2}-\d{2})\s*(?:,\s*(.{1,120}))?$/;

/**
 * `fx.rates`: one currency per line, "ZWG: 0.0373, 2026-10-01, RBZ interbank mid-rate" (US dollars per ONE unit of
 * the currency, the date the rate applies to, an optional source). An empty field stores `{}` (no USD totals).
 */
export function parseFxRatesForm(values: SettingFormValues): SettingFormResult {
  const errors: FieldErrorMap = {};
  const rates: Record<string, { USD: number; asOf: string; source?: string }> = {};
  const lines = (values.rates ?? "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  for (const line of lines) {
    const match = FX_LINE.exec(line);
    if (!match || match[1] === undefined || match[2] === undefined || match[3] === undefined) {
      addError(errors, "rates", `"${line.slice(0, 60)}" is not "CUR: rate, YYYY-MM-DD, source" (for example ZWG: 0.0373, 2026-10-01, RBZ).`);
      continue;
    }
    const currency = match[1].toUpperCase();
    if (rates[currency]) {
      addError(errors, "rates", `${currency} is listed twice.`);
      continue;
    }
    const source = match[4]?.trim();
    rates[currency] = { USD: Number(match[2]), asOf: match[3], ...(source ? { source } : {}) };
  }
  return result(errors, rates);
}

/** `fx.rates` value → editor text, by currency. */
export function formatFxRates(rates: Readonly<Record<string, { USD: number; asOf: string; source?: string | undefined }>> | null | undefined): string {
  if (!rates) return "";
  return Object.entries(rates)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([currency, rate]) => `${currency}: ${rate.USD}, ${rate.asOf}${rate.source ? `, ${rate.source}` : ""}`)
    .join("\n");
}
