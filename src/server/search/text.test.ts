import { describe, expect, it } from "vitest";
import {
  buildPrefixTsQuery,
  cleanText,
  hasWebsearchOperators,
  joinKeywords,
  matchTokens,
  normalizeForMatch,
  tokenizeWithSpans,
  truncateAtWord,
} from "./text";

describe("normalizeForMatch", () => {
  it("folds case, accents and punctuation", () => {
    expect(normalizeForMatch("O-Level")).toBe("o level");
    expect(normalizeForMatch("  Cambridge   IGCSE® ")).toBe("cambridge igcse");
    expect(normalizeForMatch("Français")).toBe("francais");
    expect(normalizeForMatch("AS & A Level")).toBe("as a level");
  });

  it("keeps digits so codes survive", () => {
    expect(matchTokens("0580/22 quadratic")).toEqual(["0580", "22", "quadratic"]);
  });
});

describe("tokenizeWithSpans", () => {
  it("records raw offsets, quoted and negated words", () => {
    const raw = 'igcse "mole ratio" -chemistry';
    const spans = tokenizeWithSpans(raw);
    expect(spans.map((s) => s.token)).toEqual(["igcse", "mole", "ratio", "chemistry"]);
    expect(spans.map((s) => s.quoted)).toEqual([false, true, true, false]);
    expect(spans.map((s) => s.negated)).toEqual([false, false, false, true]);
    expect(raw.slice(spans[0]?.start, spans[0]?.end)).toBe("igcse");
  });

  it("does not treat an inner hyphen as negation", () => {
    expect(tokenizeWithSpans("o-level").map((s) => s.negated)).toEqual([false, false]);
  });
});

describe("hasWebsearchOperators", () => {
  it("detects quotes, exclusions and or", () => {
    expect(hasWebsearchOperators('"mole ratio"')).toBe(true);
    expect(hasWebsearchOperators("moles -chemistry")).toBe(true);
    expect(hasWebsearchOperators("acids or bases")).toBe(true);
    expect(hasWebsearchOperators("o-level organic chemistry")).toBe(false);
  });
});

describe("truncateAtWord", () => {
  it("cuts at a word boundary and optionally adds an ellipsis", () => {
    expect(truncateAtWord("short", 10)).toBe("short");
    expect(truncateAtWord("quadratic equations by factorisation", 20)).toBe("quadratic equations");
    expect(truncateAtWord("quadratic equations by factorisation", 21, true)).toBe("quadratic equations…");
  });

  it("rejects a non-positive limit", () => {
    expect(() => truncateAtWord("x", 0)).toThrow(RangeError);
  });
});

describe("cleanText", () => {
  it("removes control characters used as snippet delimiters", () => {
    expect(cleanText("a\u0002b\u0003 c\n\nd")).toBe("a b c d");
  });
});

describe("joinKeywords", () => {
  it("de-duplicates case- and accent-insensitively and drops blanks", () => {
    expect(joinKeywords(["Maths", "maths", null, "", undefined, "Mathématiques", "MATHEMATIQUES", "0580"])).toBe(
      "Maths Mathématiques 0580",
    );
  });

  it("is bounded", () => {
    expect(joinKeywords(["alpha beta gamma delta"], 11)).toBe("alpha beta");
  });
});

describe("buildPrefixTsQuery", () => {
  it("matches complete words and the last word as a prefix", () => {
    expect(buildPrefixTsQuery("quadr", "AB")).toBe("quadr:*AB");
    expect(buildPrefixTsQuery("Quadratic equ", "A")).toBe("quadratic:A & equ:*A");
  });

  it("strips anything that could be tsquery syntax", () => {
    expect(buildPrefixTsQuery("alg&eq | !co:* (der)", "A")).toBe("alg:A & eq:A & co:A & der:*A");
    expect(buildPrefixTsQuery("'); DROP TABLE xs; --", "A")).toBe("drop:A & table:A & xs:*A");
  });

  it("returns null when the last word is too short or there are no words", () => {
    expect(buildPrefixTsQuery("q", "A")).toBeNull();
    expect(buildPrefixTsQuery("  !!  ", "A")).toBeNull();
  });
});
