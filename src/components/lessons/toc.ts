import type { ContentHeading } from "@/lib/content/types";

/**
 * In-lesson table of contents ("On this page", §8). Pure and isomorphic: the server passes the headings the content
 * pipeline extracted; the client component only highlights the section being read.
 */

export interface TocItem {
  /** Element id of the heading in the rendered lesson. */
  id: string;
  label: string;
  /** 0 for the lesson's top-level sections, 1 for their sub-sections. */
  level: 0 | 1;
}

/** Headings deeper than this (relative to the shallowest) are left out of the table of contents. */
const MAX_LEVELS = 2;
const MAX_LABEL_LENGTH = 90;

/**
 * Readable TOC label from heading text. The pipeline keeps inline maths as LaTeX source (`Solving $x^2 = 9$`); the
 * `$` delimiters are dropped so the label reads "Solving x^2 = 9". Long labels are shortened with an ellipsis.
 */
export function tocLabel(text: string): string {
  const plain = text
    .replace(/\$\$?([^$]*)\$\$?/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  return plain.length > MAX_LABEL_LENGTH ? `${plain.slice(0, MAX_LABEL_LENGTH - 1).trimEnd()}…` : plain;
}

/**
 * TOC entries from rendered headings: the two shallowest heading levels present, in document order, without empty
 * labels or duplicate ids. Returns [] when there are fewer than two entries (a TOC with one link is noise).
 */
export function tocItems(headings: readonly ContentHeading[]): TocItem[] {
  if (headings.length === 0) return [];
  const top = Math.min(...headings.map((heading) => heading.depth));
  const seen = new Set<string>();
  const items: TocItem[] = [];
  for (const heading of headings) {
    const level = heading.depth - top;
    if (level < 0 || level >= MAX_LEVELS || !heading.id || seen.has(heading.id)) continue;
    const label = tocLabel(heading.text);
    if (!label) continue;
    seen.add(heading.id);
    items.push({ id: heading.id, label, level: level === 0 ? 0 : 1 });
  }
  return items.length >= 2 ? items : [];
}

/**
 * The section being read: the last heading whose top has scrolled above `offset` px from the viewport top (the
 * sticky header height plus a little), or the first heading before any has.
 */
export function activeTocId(positions: readonly { id: string; top: number }[], offset: number): string | null {
  let active: string | null = positions[0]?.id ?? null;
  for (const position of positions) {
    if (position.top - offset <= 0) active = position.id;
    else break;
  }
  return active;
}
