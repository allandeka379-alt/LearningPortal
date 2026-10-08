import "server-only";
import type { SanitizedHtml } from "@/lib/content/types";
import { collectAssetIds, renderContent, toExcerpt, type AssetResolver, type RenderOptions } from "@/server/content/render";
import { mediaSrc } from "@/server/content/service";
import { db } from "@/server/db";

/**
 * Rendering of CMS markdown on public pages (§44). Same sanitising pipeline as the app (`renderContent`), with one
 * difference: images resolve only to PUBLIC media. Signed-out visitors (and crawlers) cannot load AUTHENTICATED media,
 * so such an image renders as an honest "Image unavailable" note instead of a broken `<img>`.
 */

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Loads every PUBLIC content image referenced by `sources` in one query and returns a synchronous resolver. */
export async function loadPublicAssetResolver(sources: readonly (string | null | undefined)[]): Promise<AssetResolver> {
  const ids = [...new Set(sources.flatMap((source) => (source ? collectAssetIds(source) : [])))].filter((id) => UUID.test(id));
  if (ids.length === 0) return () => null;
  const rows = await db.mediaAsset.findMany({
    where: {
      id: { in: ids },
      status: "READY",
      deletedAt: null,
      visibility: "PUBLIC",
      purpose: { in: ["CONTENT_IMAGE", "DIAGRAM", "MARKETING_IMAGE"] },
    },
    select: { id: true, storageKey: true, width: true, height: true, altText: true },
  });
  const assets = new Map(rows.map((row) => [row.id, { src: mediaSrc(row.storageKey), width: row.width, height: row.height, alt: row.altText }]));
  return (id) => assets.get(id) ?? null;
}

/**
 * Renders markdown fields for one page with ONE asset query. Blank fields map to null. `idPrefix` per field keeps
 * generated heading ids unique on the page.
 */
export async function renderPublicMarkdown<K extends string>(
  fields: Readonly<Record<K, string | null | undefined>>,
  options: Pick<RenderOptions, "baseHeadingLevel"> = {},
): Promise<Record<K, SanitizedHtml | null>> {
  const entries = Object.entries(fields) as [K, string | null | undefined][];
  const resolveAsset = await loadPublicAssetResolver(entries.map(([, source]) => source));
  const out = {} as Record<K, SanitizedHtml | null>;
  for (const [key, source] of entries) {
    out[key] =
      source && source.trim() !== ""
        ? renderContent(source, { baseHeadingLevel: options.baseHeadingLevel ?? 3, idPrefix: `${key.toLowerCase().replace(/[^a-z0-9]/g, "")}-`, resolveAsset }).html
        : null;
  }
  return out;
}

/** Plain-text excerpt of a markdown field (no HTML), or null when blank. */
export function excerptOf(source: string | null | undefined, maxLength: number): string | null {
  if (!source || source.trim() === "") return null;
  const text = toExcerpt(source, maxLength);
  return text === "" ? null : text;
}
