import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  absoluteUrl,
  boardPath,
  GUIDES_SEGMENT,
  guidePath,
  isPublicBoardSlug,
  isPublicSegmentSlug,
  PUBLIC_RESERVED_SLUGS,
  qualificationPath,
  subjectPath,
  topicPath,
} from "./routing";

const APP_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../app");

/** First URL segments served by real routes: top-level folders of src/app and of its route groups `(x)`. */
function topLevelRouteSegments(): string[] {
  const segments = new Set<string>();
  const visit = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const name = entry.name;
      if (name.startsWith("(") && name.endsWith(")")) visit(path.join(dir, name));
      else if (!name.startsWith("[") && !name.startsWith("_") && !name.startsWith("@")) segments.add(name);
    }
  };
  visit(APP_DIR);
  return [...segments].sort();
}

describe("public board slug guard", () => {
  it("reserves every top-level route of the app, so /[board] never captures it", () => {
    const routes = topLevelRouteSegments();
    expect(routes.length).toBeGreaterThan(5);
    const unreserved = routes.filter((segment) => !PUBLIC_RESERVED_SLUGS.has(segment));
    // Adding a top-level route? Add its first segment to PUBLIC_RESERVED_SLUGS (src/server/seo/routing.ts).
    expect(unreserved).toEqual([]);
  });

  it.each(["app", "admin", "api", "login", "register", "onboarding", "parent", "teacher", "school", "schools", "legal", "pricing", "about", "faq", "daily", "s", "r", "invite", "billing", "dev", "offline", "guides", "verify"])(
    "rejects the reserved slug %s",
    (slug) => {
      expect(isPublicBoardSlug(slug)).toBe(false);
    },
  );

  it("accepts real board slugs and rejects malformed ones", () => {
    expect(isPublicBoardSlug("zimsec")).toBe(true);
    expect(isPublicBoardSlug("cambridge")).toBe(true);
    for (const bad of ["", "ZIMSEC", "zim sec", "zimsec-", "-zimsec", "favicon.ico", "sitemap.xml", "a/b", "%2e%2e"]) {
      expect(isPublicBoardSlug(bad)).toBe(false);
    }
  });

  it("keeps the guides segment out of qualification, subject and topic slugs", () => {
    expect(isPublicSegmentSlug("o-level")).toBe(true);
    expect(isPublicSegmentSlug(GUIDES_SEGMENT)).toBe(false);
    expect(isPublicSegmentSlug("Quadratic")).toBe(false);
  });
});

describe("public paths", () => {
  it("builds the §44 URL shapes", () => {
    expect(boardPath("zimsec")).toBe("/zimsec");
    expect(qualificationPath("cambridge", "igcse")).toBe("/cambridge/igcse");
    expect(subjectPath("zimsec", "o-level", "mathematics")).toBe("/zimsec/o-level/mathematics");
    expect(topicPath("zimsec", "o-level", "mathematics", "quadratic-equations")).toBe("/zimsec/o-level/mathematics/quadratic-equations");
  });

  it("builds guide paths under the guide's home scope", () => {
    expect(guidePath({ kind: "board", board: "zimsec" }, "how-grading-works")).toBe("/zimsec/guides/how-grading-works");
    expect(guidePath({ kind: "qualification", board: "zimsec", qualification: "o-level" }, "exam-tips")).toBe("/zimsec/o-level/guides/exam-tips");
    expect(guidePath({ kind: "subject", board: "cambridge", qualification: "igcse", subject: "biology" }, "cells")).toBe(
      "/cambridge/igcse/biology/guides/cells",
    );
  });

  it("makes absolute URLs without double slashes", () => {
    expect(absoluteUrl("https://dzidza.example", "/zimsec")).toBe("https://dzidza.example/zimsec");
    expect(absoluteUrl("https://dzidza.example/", "/zimsec")).toBe("https://dzidza.example/zimsec");
    expect(absoluteUrl("https://dzidza.example", "/")).toBe("https://dzidza.example/");
  });
});
