/** Minimal shape needed to decide which navigation item is current. */
export interface MatchableNavItem {
  href: string;
  /**
   * `"prefix"` (default): active on the page itself and any descendant path (`/app/subjects/maths`).
   * `"exact"`: active only on the page itself. The site root `/` is always exact.
   */
  match?: "exact" | "prefix";
}

function normalisePath(path: string): string {
  const withoutQuery = path.split(/[?#]/u, 1)[0] ?? "";
  if (withoutQuery.length > 1 && withoutQuery.endsWith("/")) return withoutQuery.slice(0, -1);
  return withoutQuery || "/";
}

/**
 * Returns the href of the item to mark with `aria-current="page"`, or `null`.
 *
 * Uses the LONGEST matching href so that an area root such as `/app` is not highlighted together with
 * `/app/practice` when the student is on `/app/practice/session/1`. Matching is per path segment, so `/app/exam`
 * never matches `/app/exams`.
 */
export function getActiveNavHref(pathname: string, items: readonly MatchableNavItem[]): string | null {
  const current = normalisePath(pathname);
  let best: { href: string; length: number } | null = null;
  for (const item of items) {
    const target = normalisePath(item.href);
    const exactOnly = item.match === "exact" || target === "/";
    const matches = current === target || (!exactOnly && current.startsWith(`${target}/`));
    if (matches && (best === null || target.length > best.length)) {
      best = { href: item.href, length: target.length };
    }
  }
  return best?.href ?? null;
}
