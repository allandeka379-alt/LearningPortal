import { describe, expect, it } from "vitest";
import { buildSitemapIndexXml, buildUrlsetXml, escapeXml, parseSitemapFileName, sitemapFilePath } from "./sitemap-xml";

describe("sitemap XML (pure)", () => {
  it("maps file ids to paths and back", () => {
    expect(sitemapFilePath(0)).toBe("/sitemap/0.xml");
    expect(parseSitemapFileName("0.xml")).toBe(0);
    expect(parseSitemapFileName("12.xml")).toBe(12);
    for (const bad of ["", "x.xml", "01.xml", "-1.xml", "1", "1.xml.gz", "1.XML", "1234567.xml", "0.xml/"]) expect(parseSitemapFileName(bad)).toBeNull();
  });

  it("escapes XML special characters", () => {
    expect(escapeXml(`a&b<c>"d'`)).toBe("a&amp;b&lt;c&gt;&quot;d&apos;");
  });

  it("writes a urlset with only the fields that are set", () => {
    const xml = buildUrlsetXml([
      { url: "https://dzidza.example/zimsec?a=1&b=2", lastModified: new Date("2026-10-01T08:00:00Z"), changeFrequency: "monthly", priority: 0.8 },
      { url: "https://dzidza.example/" },
    ]);
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')).toBe(true);
    expect(xml).toContain(
      "<url><loc>https://dzidza.example/zimsec?a=1&amp;b=2</loc><lastmod>2026-10-01T08:00:00.000Z</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>",
    );
    expect(xml).toContain("<url><loc>https://dzidza.example/</loc></url>");
    expect(xml.trimEnd().endsWith("</urlset>")).toBe(true);
  });

  it("drops an invalid lastModified and clamps priority", () => {
    const xml = buildUrlsetXml([{ url: "https://x.example/", lastModified: "not a date", priority: 3 }]);
    expect(xml).not.toContain("<lastmod>");
    expect(xml).toContain("<priority>1</priority>");
  });

  it("indexes every sitemap file, at least one", () => {
    const xml = buildSitemapIndexXml("https://dzidza.example/", 2);
    expect(xml).toContain('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml.match(/<sitemap>/g)).toHaveLength(2);
    expect(xml).toContain("<sitemap><loc>https://dzidza.example/sitemap/0.xml</loc></sitemap>");
    expect(xml).toContain("<sitemap><loc>https://dzidza.example/sitemap/1.xml</loc></sitemap>");
    for (const files of [0, -2, Number.NaN]) expect(buildSitemapIndexXml("https://x.example", files).match(/<sitemap>/g)).toHaveLength(1);
  });
});
