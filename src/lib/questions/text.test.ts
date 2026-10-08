import { describe, expect, it } from "vitest";
import { canonicalText, containsKeyword, isBlankText, mapSuperscripts, normaliseAnswerText, prepareKeyword, tokenize, wordCount } from "./text";

describe("canonicalText / normaliseAnswerText", () => {
  it.each<[string, string]>([
    ["  Oxygen  ", "oxygen"],
    ["OXYGEN", "oxygen"],
    ["oxy​gen", "oxygen"],
    ["﻿oxygen", "oxygen"],
    ["ｏｘｙｇｅｎ", "oxygen"],
    ["O₂", "o2"],
    ["x²", "x^2"],
    ["carbon   dioxide", "carbon dioxide"],
    ["carbon\t\ndioxide", "carbon dioxide"],
    ["it’s", "it's"],
    ["“quoted”", '"quoted"'],
    ["x − 2", "x - 2"],
  ])("%j → %j", (input, expected) => {
    expect(normaliseAnswerText(input)).toBe(expected);
  });

  it("is case-sensitive on request", () => {
    expect(normaliseAnswerText("NaCl", { caseSensitive: true })).toBe("NaCl");
  });

  it("applies the optional flags", () => {
    expect(normaliseAnswerText("x^2 + 3x", { flags: ["remove_whitespace"] })).toBe("x^2+3x");
    expect(normaliseAnswerText("D.N.A.", { flags: ["strip_punctuation"] })).toBe("dna");
    expect(normaliseAnswerText("co-operation", { flags: ["strip_punctuation"] })).toBe("cooperation");
    expect(normaliseAnswerText("sodium,chloride!", { flags: ["strip_punctuation"] })).toBe("sodium chloride");
    expect(normaliseAnswerText("Café", { flags: ["strip_diacritics"] })).toBe("cafe");
    expect(normaliseAnswerText("The mitochondria", { flags: ["strip_articles"] })).toBe("mitochondria");
    expect(normaliseAnswerText("an apple a day", { flags: ["strip_articles"] })).toBe("apple day");
    expect(normaliseAnswerText("theory", { flags: ["strip_articles"] })).toBe("theory");
  });

  it("is idempotent", () => {
    for (const input of ["  Ｈｅｌｌｏ  Wörld ", "x² − 1", "D.N.A"]) {
      const once = normaliseAnswerText(input, { flags: ["strip_punctuation", "strip_diacritics"] });
      expect(normaliseAnswerText(once, { flags: ["strip_punctuation", "strip_diacritics"] })).toBe(once);
    }
  });

  it("does not fold look-alike letters from other scripts", () => {
    // Cyrillic о (U+043E) is not Latin o: no false positive.
    expect(normaliseAnswerText("оxygen")).not.toBe("oxygen");
  });

  it("maps superscript runs before NFKC", () => {
    expect(mapSuperscripts("10⁴")).toBe("10^4");
    expect(mapSuperscripts("s⁻¹")).toBe("s^-1");
    expect(canonicalText("10⁴")).toBe("10^4");
  });
});

describe("isBlankText / wordCount", () => {
  it("treats invisible input as blank", () => {
    expect(isBlankText(undefined)).toBe(true);
    expect(isBlankText(null)).toBe(true);
    expect(isBlankText(" ​‍ ")).toBe(true);
    expect(isBlankText(" a ")).toBe(false);
  });

  it("counts words containing letters or digits", () => {
    expect(wordCount("")).toBe(0);
    expect(wordCount("The cell — the unit of life.")).toBe(6);
    expect(wordCount("one  two\nthree")).toBe(3);
  });
});

describe("keywords", () => {
  const tokens = tokenize(normaliseAnswerText("Water evaporates, (using light energy)."));

  it("tokenizes with edge punctuation trimmed", () => {
    expect(tokens).toEqual(["water", "evaporates", "using", "light", "energy"]);
  });

  it("matches whole words and phrases", () => {
    expect(containsKeyword(tokens, prepareKeyword("light energy")!)).toBe(true);
    expect(containsKeyword(tokens, prepareKeyword("energy light")!)).toBe(false);
    expect(containsKeyword(tokens, prepareKeyword("ate")!)).toBe(false);
  });

  it("supports a trailing * as a prefix on the last word", () => {
    expect(containsKeyword(tokens, prepareKeyword("evaporat*")!)).toBe(true);
    expect(containsKeyword(tokens, prepareKeyword("condens*")!)).toBe(false);
  });

  it("ignores blank keywords", () => {
    expect(prepareKeyword("   ")).toBeNull();
    expect(prepareKeyword("*")).toBeNull();
  });
});
