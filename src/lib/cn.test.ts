import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("joins plain class names with single spaces", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("drops falsy values", () => {
    const disabled = false;
    expect(cn("a", disabled && "b", null, undefined, 0, "", "c")).toBe("a c");
  });

  it("supports object and array syntax", () => {
    expect(cn({ a: true, b: false }, ["c", ["d", { e: true }]])).toBe("a c d e");
  });

  it("returns an empty string when nothing is truthy", () => {
    expect(cn(false, null, undefined)).toBe("");
  });

  it("does not de-duplicate or resolve Tailwind conflicts (documented behaviour)", () => {
    expect(cn("px-2", "px-4")).toBe("px-2 px-4");
  });
});
