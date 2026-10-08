import { describe, expect, it } from "vitest";
import { buildRobots, robotsDisallowList } from "./robots";

/** Minimal robots.txt matcher (prefix match, `$` end anchor), enough to check our rules the way crawlers read them. */
function isDisallowed(path: string, rules: readonly string[]): boolean {
  return rules.some((rule) => (rule.endsWith("$") ? path === rule.slice(0, -1) : path.startsWith(rule)));
}

describe("robots.txt", () => {
  const rules = robotsDisallowList();

  it.each(["/app", "/app/practice", "/admin", "/admin/users", "/api/v1/me", "/parent", "/teacher/classes", "/school", "/school/reports", "/s/abc123", "/onboarding", "/onboarding/subjects", "/r/CODE1"])(
    "blocks the private path %s",
    (path) => {
      expect(isDisallowed(path, rules)).toBe(true);
    },
  );

  it.each(["/", "/schools", "/pricing", "/zimsec", "/zimsec/o-level/mathematics", "/cambridge/igcse/biology/cells", "/apple-icon.png", "/daily", "/sitemap/0.xml"])(
    "allows the public path %s",
    (path) => {
      expect(isDisallowed(path, rules)).toBe(false);
    },
  );

  it("lists every sitemap file on the public origin", () => {
    const robots = buildRobots("https://dzidza.example", 3);
    expect(robots.sitemap).toEqual([
      "https://dzidza.example/sitemap/0.xml",
      "https://dzidza.example/sitemap/1.xml",
      "https://dzidza.example/sitemap/2.xml",
    ]);
    expect(robots.rules).toEqual([{ userAgent: "*", allow: "/", disallow: rules }]);
  });

  it("always lists at least one sitemap", () => {
    expect(buildRobots("https://dzidza.example/", 0).sitemap).toEqual(["https://dzidza.example/sitemap/0.xml"]);
  });
});
