import { describe, expect, it } from "vitest";
import { getActiveNavHref } from "./nav-active";

const studentNav = [
  { href: "/app" },
  { href: "/app/subjects" },
  { href: "/app/practice" },
  { href: "/app/exams" },
  { href: "/app/progress" },
];

describe("getActiveNavHref", () => {
  it("matches the exact page", () => {
    expect(getActiveNavHref("/app", studentNav)).toBe("/app");
    expect(getActiveNavHref("/app/practice", studentNav)).toBe("/app/practice");
  });

  it("prefers the longest matching prefix over the area root", () => {
    expect(getActiveNavHref("/app/practice/session/abc", studentNav)).toBe("/app/practice");
    expect(getActiveNavHref("/app/subjects/zimsec-o-level-maths/algebra", studentNav)).toBe("/app/subjects");
  });

  it("falls back to the area root for unlisted descendants", () => {
    expect(getActiveNavHref("/app/settings", studentNav)).toBe("/app");
  });

  it("matches whole path segments only", () => {
    expect(getActiveNavHref("/app/examsxyz", [{ href: "/app/exams" }])).toBeNull();
    expect(getActiveNavHref("/apple", [{ href: "/app" }])).toBeNull();
  });

  it("honours exact matching", () => {
    const items = [{ href: "/app", match: "exact" as const }, { href: "/app/practice" }];
    expect(getActiveNavHref("/app/settings", items)).toBeNull();
    expect(getActiveNavHref("/app", items)).toBe("/app");
  });

  it("treats the site root as exact", () => {
    const items = [{ href: "/" }, { href: "/pricing" }];
    expect(getActiveNavHref("/", items)).toBe("/");
    expect(getActiveNavHref("/about", items)).toBeNull();
  });

  it("ignores trailing slashes, query strings and hashes", () => {
    expect(getActiveNavHref("/app/practice/", studentNav)).toBe("/app/practice");
    expect(getActiveNavHref("/app/exams", [{ href: "/app/exams?tab=upcoming" }])).toBe("/app/exams?tab=upcoming");
    expect(getActiveNavHref("/app/exams", [{ href: "/app/exams#top" }])).toBe("/app/exams#top");
  });

  it("returns null when nothing matches", () => {
    expect(getActiveNavHref("/teacher", studentNav)).toBeNull();
  });
});
