/**
 * Public, isomorphic app configuration. Safe to import from Client Components: it only reads `NEXT_PUBLIC_*`
 * variables, which Next.js inlines at build time (so each must be read as a literal `process.env.NEXT_PUBLIC_X`
 * expression, never through a dynamic key).
 *
 * Server-only settings (database, secrets, `APP_URL`, provider keys) live in `src/server/lib/env.ts` (`getEnv()`).
 * `APP_URL` is deliberately NOT exported here: it is validated server-side and passed down explicitly where a page
 * needs an absolute URL (metadata, share links, emails).
 */

function nonEmpty(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

/** Product name shown in UI copy. "Dzidza" is a placeholder brand; configure via `NEXT_PUBLIC_APP_NAME`. */
export const APP_NAME: string = nonEmpty(process.env.NEXT_PUBLIC_APP_NAME) ?? "Dzidza";

/**
 * Between a page title and the product name in the document title. The root layout's title template is
 * `%s${TITLE_SEPARATOR}${APP_NAME}`; pages that build an absolute title (SEO curriculum pages) use the same separator.
 */
export const TITLE_SEPARATOR = " · ";

/** Homepage headline (§45). */
export const APP_TAGLINE = "Master Your Exams.";

/**
 * Support contact address from `NEXT_PUBLIC_SUPPORT_EMAIL`. Falls back to an RFC 2606 `example.com` placeholder so UI
 * never renders "undefined"; check {@link SUPPORT_EMAIL_CONFIGURED} before advertising it prominently.
 */
export const SUPPORT_EMAIL: string = nonEmpty(process.env.NEXT_PUBLIC_SUPPORT_EMAIL) ?? "support@example.com";

/** True when a real support address was configured (not the placeholder). */
export const SUPPORT_EMAIL_CONFIGURED: boolean = nonEmpty(process.env.NEXT_PUBLIC_SUPPORT_EMAIL) !== undefined;

/** Default IANA time zone for day boundaries (streaks, daily question, metrics). CAT, UTC+2, no DST. */
export const DEFAULT_TIMEZONE = "Africa/Harare";

/** Default BCP 47 locale for number/date formatting. */
export const DEFAULT_LOCALE = "en-ZW";

/** Default ISO 3166-1 alpha-2 country code (phone number parsing defaults to +263). */
export const DEFAULT_COUNTRY_CODE = "ZW";
