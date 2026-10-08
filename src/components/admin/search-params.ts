/**
 * URL helpers for admin lists: filters, search and cursors live in the URL (`searchParams`), so every view is
 * linkable, back-button friendly and works without client JavaScript. Isomorphic and pure.
 */

/** Next.js `searchParams` after `await`. */
export type PageSearchParams = Record<string, string | string[] | undefined>;

/** The first value of `key`, trimmed; `undefined` when absent or blank. */
export function firstParam(params: PageSearchParams | undefined, key: string): string | undefined {
  const raw = params?.[key];
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed.slice(0, 500);
}

/** `value` when it is one of `allowed`, else `undefined` (allow-listing enum filters from the URL). */
export function enumParam<T extends string>(params: PageSearchParams | undefined, key: string, allowed: readonly T[]): T | undefined {
  const value = firstParam(params, key);
  return value !== undefined && (allowed as readonly string[]).includes(value) ? (value as T) : undefined;
}

/** `path?k=v…` from defined, non-empty values (keys sorted for stable URLs). */
export function buildHref(path: string, params: Readonly<Record<string, string | number | null | undefined>>): string {
  const search = new URLSearchParams();
  for (const key of Object.keys(params).sort()) {
    const value = params[key];
    if (value === null || value === undefined || value === "") continue;
    search.set(key, String(value));
  }
  const query = search.toString();
  return query ? `${path}?${query}` : path;
}

/** Current single-valued params as a plain record (for merging). */
export function currentParams(params: PageSearchParams | undefined, keys?: readonly string[]): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key of keys ?? Object.keys(params ?? {})) {
    const value = firstParam(params, key);
    if (value !== undefined) result[key] = value;
  }
  return result;
}

/** `path` with the current params, `overrides` applied (`null` removes a key). */
export function hrefWith(
  path: string,
  params: PageSearchParams | undefined,
  overrides: Readonly<Record<string, string | number | null | undefined>>,
  keys?: readonly string[],
): string {
  return buildHref(path, { ...currentParams(params, keys), ...overrides });
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** `value` of `key` when it is a uuid, else `undefined` (ids from the URL never reach a service unchecked). */
export function uuidParam(params: PageSearchParams | undefined, key: string): string | undefined {
  const value = firstParam(params, key);
  return value !== undefined && UUID_PATTERN.test(value) ? value.toLowerCase() : undefined;
}

/** A `YYYY-MM-DD` value of `key`, else `undefined`. */
export function dateParam(params: PageSearchParams | undefined, key: string): string | undefined {
  const value = firstParam(params, key);
  return value !== undefined && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : undefined;
}
