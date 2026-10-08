import "server-only";

const MAX_SLUG_LENGTH = 64;

/**
 * Lower-case ASCII slug: diacritics folded (`Ndebele ê` → `ndebele-e`), every other run of non-alphanumerics
 * collapsed to a single hyphen. Returns "" when nothing usable remains.
 */
export function slugify(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, MAX_SLUG_LENGTH)
    .replace(/-+$/, "");
}

/**
 * Returns a function producing document-unique slugs: `intro`, `intro-1`, `intro-2`, ... The loop (rather than a
 * per-base counter) also avoids collisions with headings whose own text slugifies to e.g. `intro-1`.
 */
export function createSlugger(fallback = "section"): (text: string) => string {
  const used = new Set<string>();
  return (text) => {
    const base = slugify(text) || fallback;
    let candidate = base;
    for (let n = 1; used.has(candidate); n += 1) candidate = `${base}-${n}`;
    used.add(candidate);
    return candidate;
  };
}
