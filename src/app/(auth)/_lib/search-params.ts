/** `searchParams` shape Next passes to pages (a Promise in Next 16). */
export type PageSearchParams = Promise<Record<string, string | string[] | undefined>>;

/** First value of a search param (repeated keys are reduced to the first), or `undefined`. */
export function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}
