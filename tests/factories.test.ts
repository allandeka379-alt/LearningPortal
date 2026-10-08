import { describe, expect, it } from "vitest";
import { uniqueEmail, uniqueId, uniquePhoneE164, uniqueSlug, uniqueSuffix } from "./factories";

describe("factories", () => {
  it("produces collision-free suffixes and ids", () => {
    const suffixes = new Set(Array.from({ length: 5000 }, () => uniqueSuffix()));
    expect(suffixes.size).toBe(5000);
    expect(uniqueId("school")).toMatch(/^school-[0-9a-f]{12}$/);
  });

  it("builds URL-safe slugs", () => {
    expect(uniqueSlug("O-Level Maths!")).toMatch(/^o-level-maths-[0-9a-f]{12}$/);
    expect(uniqueSlug("!!!")).toMatch(/^test-[0-9a-f]{12}$/);
  });

  it("uses a reserved email domain", () => {
    expect(uniqueEmail()).toMatch(/^user\.[0-9a-f]{12}@example\.test$/);
  });

  it("builds Zimbabwean mobile numbers in E.164", () => {
    for (let i = 0; i < 200; i += 1) expect(uniquePhoneE164()).toMatch(/^\+2637[1378]\d{7}$/);
  });
});
