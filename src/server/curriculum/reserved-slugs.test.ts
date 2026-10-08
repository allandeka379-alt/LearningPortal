import { readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { RESERVED_TOP_LEVEL_SLUGS } from "./core";

/**
 * Guards the SEO catch-all `/[board]/...` (§44): every static top-level route segment in src/app must be reserved,
 * otherwise a board slug could shadow (or be shadowed by) an app route. Route groups `(x)` are transparent, so their
 * children count as top level; dynamic `[x]` and private `_x` folders are not literal segments.
 */
function topLevelSegments(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const name = entry.name;
    if (entry.isDirectory()) {
      if (name.startsWith("(") && name.endsWith(")")) out.push(...topLevelSegments(path.join(dir, name)));
      else if (!name.startsWith("[") && !name.startsWith("_") && !name.startsWith("@")) out.push(name);
    } else {
      // Metadata/file routes at the root (icon.svg, manifest.ts, opengraph-image.tsx, robots.ts, sitemap.ts...).
      const base = name.replace(/\.(tsx?|svg|png|ico|jpg|jpeg|webmanifest)$/, "");
      if (["icon", "apple-icon", "manifest", "opengraph-image", "twitter-image", "robots", "sitemap"].includes(base)) out.push(base);
    }
  }
  return out;
}

describe("RESERVED_TOP_LEVEL_SLUGS", () => {
  it("reserves every literal top-level route segment under src/app", () => {
    const appDir = path.resolve(process.cwd(), "src", "app");
    const literal = [...new Set(topLevelSegments(appDir))].filter((s) => /^[a-z0-9-]+$/.test(s));
    const unreserved = literal.filter((s) => !RESERVED_TOP_LEVEL_SLUGS.has(s) && s !== "robots");
    expect(unreserved).toEqual([]);
  });
});
