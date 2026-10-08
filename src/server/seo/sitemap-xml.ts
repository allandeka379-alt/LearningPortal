import { absoluteUrl } from "./routing";

/**
 * XML for the sitemap routes (§44, ARCHITECTURE §3.3 `/sitemap.xml`), following the sitemaps.org protocol. Pure: no
 * I/O.
 *
 *   /sitemap.xml        sitemap INDEX listing every sitemap file (the conventional URL crawlers look for)
 *   /sitemap/<id>.xml   sitemap files of up to SITEMAP_CHUNK_SIZE URLs each (also listed in robots.txt)
 *
 * They are plain route handlers rather than Next's `sitemap.ts` + `generateSitemaps` convention: that convention
 * claims `/sitemap.xml` for itself, so a sitemap index could not be served next to it.
 */

/** One URL of a sitemap file (absolute URL). */
export interface SitemapUrl {
  url: string;
  lastModified?: Date | string;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

const XML_DECLARATION = '<?xml version="1.0" encoding="UTF-8"?>';
const SITEMAP_NS = "http://www.sitemaps.org/schemas/sitemap/0.9";
const FILE_NAME = /^(0|[1-9]\d{0,5})\.xml$/;

/** Published path of sitemap file `id`. */
export function sitemapFilePath(id: number): string {
  return `/sitemap/${id}.xml`;
}

/** Sitemap file id from the `[file]` route segment ("3.xml" → 3); null for anything else. */
export function parseSitemapFileName(file: string): number | null {
  const match = FILE_NAME.exec(file);
  return match?.[1] === undefined ? null : Number.parseInt(match[1], 10);
}

export function escapeXml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function isoDate(value: Date | string): string | null {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

/** A sitemap file (`<urlset>`). */
export function buildUrlsetXml(urls: readonly SitemapUrl[]): string {
  const items = urls.map((entry) => {
    const lastmod = entry.lastModified === undefined ? null : isoDate(entry.lastModified);
    const fields = [
      `<loc>${escapeXml(entry.url)}</loc>`,
      lastmod ? `<lastmod>${lastmod}</lastmod>` : "",
      entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : "",
      entry.priority !== undefined && Number.isFinite(entry.priority) ? `<priority>${Math.min(1, Math.max(0, entry.priority))}</priority>` : "",
    ];
    return `  <url>${fields.join("")}</url>`;
  });
  return [XML_DECLARATION, `<urlset xmlns="${SITEMAP_NS}">`, ...items, "</urlset>", ""].join("\n");
}

/** The sitemap index (`<sitemapindex>`) listing `files` sitemap files (at least one) on `appUrl`. */
export function buildSitemapIndexXml(appUrl: string, files: number): string {
  const count = Number.isFinite(files) ? Math.max(1, Math.floor(files)) : 1;
  const items = Array.from({ length: count }, (_, id) => `  <sitemap><loc>${escapeXml(absoluteUrl(appUrl, sitemapFilePath(id)))}</loc></sitemap>`);
  return [XML_DECLARATION, `<sitemapindex xmlns="${SITEMAP_NS}">`, ...items, "</sitemapindex>", ""].join("\n");
}

/** Response for either XML document. */
export function xmlResponse(xml: string): Response {
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
