/** Route parameters of the diagnostic pages. Pure; malformed values become a 404, never an error page. */

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** True for a canonical UUID (attempt ids). */
export function isUuid(value: string): boolean {
  return UUID.test(value);
}
