import { describe, expect, it } from "vitest";
import {
  checkSafePattern,
  compileSafePattern,
  MAX_PATTERN_PROGRAM_SIZE,
  MAX_QUESTION_PATTERN_PROGRAM_SIZE,
  PATTERN_SUBJECT_LIMIT,
  patternsProgramSize,
  questionPatternsProgramSize,
  testSafePattern,
} from "./safe-pattern";

describe("checkSafePattern: accepted", () => {
  it.each([
    "^oxygen$",
    "^o(?:xygen|2)$",
    "^(oxygen|o2)$",
    "^\\d+(?:\\.\\d+)?$",
    "^\\d+\\.?\\d*$",
    "^[a-z]+ [a-z]+$",
    "^x\\^2 ?\\+ ?3x$",
    "^.{3,10}$",
    "^(?:the )?nucleus$",
    "^[^0-9]+$",
    "^\\bcell\\b$",
    "^a??b$",
    "^\\(x\\+1\\)$",
  ])("%s", (pattern) => {
    expect(checkSafePattern(pattern)).toMatchObject({ ok: true });
  });
});

describe("checkSafePattern: rejected (ReDoS and unsafe constructs)", () => {
  it.each<[string, RegExp]>([
    ["oxygen", /start with \^/],
    ["^oxygen", /end with \$/],
    ["^(a+)+$", /only be made optional/],
    ["^(a|a)+$", /only be made optional/],
    ["^(a|aa)*$", /only be made optional/],
    ["^(?:a*)*$", /only be made optional/],
    ["^(?:\\d*\\d*\\d*\\d*)$", /too complex/],
    ["^(a)\\1$", /Backreferences/],
    ["^(?=a)a$", /Lookarounds/],
    ["^(?<name>a)$", /Lookarounds and named groups/],
    ["^((a))$", /Nested groups/],
    ["^a|b$", /Top-level alternation/],
    ["^a$|^b$", /Anchors|Top-level alternation/],
    ["^a**$", /Stacked quantifiers/],
    ["^a{2,1}$", /n ≤ m/],
    ["^a{1,1000}$", /above 100/],
    ["^a{1$", /Malformed/],
    ["^*a$", /without anything to repeat/],
    ["^[a-z$", /Unterminated character class/],
    ["^[]$", /Empty character class/],
    ["^\\p{L}+$", /not allowed/],
    ["^\\k<a>$", /not allowed/],
    ["^.*.*.*.*$", /too complex/],
    ["^\\d*\\d*\\d*\\d*x$", /too complex/],
    ["^\\$", /end with an unescaped \$/],
    ["^" + "a?".repeat(30) + "$", /too complex/],
    ["^" + "a".repeat(250) + "$", /limited to 200/],
    ["", /empty/],
    ["^[z-a]$", /not a valid regular expression/],
  ])("%s", (pattern, reason) => {
    const check = checkSafePattern(pattern);
    expect(check.ok).toBe(false);
    if (!check.ok) expect(check.reason).toMatch(reason);
  });
});

describe("compiled patterns", () => {
  it("are case-insensitive unless requested", () => {
    expect(testSafePattern("OXYGEN", "^oxygen$", false)).toBe(true);
    expect(testSafePattern("OXYGEN", "^oxygen$", true)).toBe(false);
  });

  it("refuse unsafe patterns instead of compiling them", () => {
    expect(compileSafePattern("^(a+)+$", false)).toBeNull();
    expect(testSafePattern("aaaa", "^(a+)+$", false)).toBe("invalid");
  });

  it("skip over-long subjects", () => {
    expect(testSafePattern("a".repeat(PATTERN_SUBJECT_LIMIT + 1), "^a+$", false)).toBe("skipped");
  });

  it("run the worst accepted pattern on a hostile subject in milliseconds", () => {
    const pattern = "^\\d*\\d*\\d*x$";
    expect(checkSafePattern(pattern).ok).toBe(true);
    const started = performance.now();
    expect(testSafePattern("1".repeat(PATTERN_SUBJECT_LIMIT), pattern, false)).toBe(false);
    expect(performance.now() - started).toBeLessThan(2_000);
  });
});

// INJ-1 regression: patterns inside the backtracking budget used to take over a second each in V8's backtracking
// engine (a self-registered teacher could stall marking for every user of the process).
describe("linear-time matching (ReDoS regression)", () => {
  it("refuses the reported patterns: their expanded program exceeds the size budget", () => {
    for (const pattern of ["^.{0,99}.{0,99}.{0,99}.{0,19}x$", "^.{0,100}.{0,100}.{0,100}.{0,18}x$", "^[^x]{0,100}[^x]{0,100}[^x]{0,100}[^x]{0,18}x$"]) {
      const check = checkSafePattern(pattern);
      expect(check.ok, pattern).toBe(false);
      if (!check.ok) expect(check.reason).toMatch(/too long once its repetitions are expanded/);
      expect(compileSafePattern(pattern, false)).toBeNull();
    }
  });

  it("matches accepted heavy-backtracking patterns without backtracking", () => {
    // Each was ~1 s in a backtracking engine on this subject (about 13.8 million backtracking steps).
    const patterns = Array.from({ length: 5 }, (_, i) => `^.{0,60}.{0,60}.{0,60}.{0,60}${String.fromCharCode(118 + i)}$`);
    for (const pattern of patterns) expect(checkSafePattern(pattern).ok).toBe(true);
    const subject = "a".repeat(PATTERN_SUBJECT_LIMIT);
    const started = performance.now();
    for (const pattern of patterns) {
      expect(testSafePattern(subject, pattern, false)).toBe(false);
      expect(testSafePattern(subject, pattern, true)).toBe(false);
    }
    expect(performance.now() - started).toBeLessThan(500);
    expect(testSafePattern(`${"a".repeat(PATTERN_SUBJECT_LIMIT - 1)}V`, patterns[0] as string, false)).toBe(true);
    expect(testSafePattern(`${"a".repeat(PATTERN_SUBJECT_LIMIT - 1)}V`, patterns[0] as string, true)).toBe(false);
  });

  it("reports the expanded program size", () => {
    expect(checkSafePattern("^oxygen$")).toMatchObject({ ok: true, size: 7 });
    expect(checkSafePattern("^.{0,100}$")).toMatchObject({ ok: true, size: 201 });
    expect(checkSafePattern("^a+$")).toMatchObject({ ok: true, size: 5 });
    expect(checkSafePattern("^(?:the )?nucleus$")).toMatchObject({ ok: true, size: 13 });
    expect(checkSafePattern("^(a|bc|)d$")).toMatchObject({ ok: true, size: 9 });
    expect(checkSafePattern("^.{0,60}.{0,60}.{0,60}.{0,60}x$")).toMatchObject({ ok: true, size: 482 });
    expect(checkSafePattern(`^.{0,100}.{0,100}.{0,55}$`)).toMatchObject({ ok: true, size: MAX_PATTERN_PROGRAM_SIZE - 1 });
    expect(checkSafePattern(`^.{0,100}.{0,100}.{0,56}$`).ok).toBe(false);
  });

  it("adds up program sizes per spec and per question tree", () => {
    expect(patternsProgramSize(["^oxygen$", "^a+$", "^(a+)+$"])).toBe(12);
    const leaf = { type: "SHORT_ANSWER", answerSpec: { patterns: ["^.{0,100}$", 42, "^a+$"] } };
    expect(questionPatternsProgramSize({ type: "STRUCTURED", answerSpec: null, parts: [leaf, { type: "STRUCTURED", parts: [leaf, { type: "NUMERICAL", answerSpec: { value: 1 } }] }] })).toBe(412);
    expect(questionPatternsProgramSize({ type: "SHORT_ANSWER", answerSpec: "not an object" })).toBe(0);
    expect(MAX_QUESTION_PATTERN_PROGRAM_SIZE).toBeGreaterThan(MAX_PATTERN_PROGRAM_SIZE);
  });

  it("accepts exactly the answers the native RegExp accepts", () => {
    const patterns = [
      "^oxygen$",
      "^o(?:xygen|2)$",
      "^(oxygen|o2)$",
      "^\\d+(?:\\.\\d+)?$",
      "^\\d+\\.?\\d*$",
      "^[a-z]+ [a-z]+$",
      "^x\\^2 ?\\+ ?3x$",
      "^.{3,10}$",
      "^(?:the )?nucleus$",
      "^[^0-9]+$",
      "^\\bcell\\b$",
      "^a??b$",
      "^\\(x\\+1\\)$",
      "^(?:the )?\\bnucleus\\b$",
      "^a\\b \\bb$",
      "^x\\B\\w$",
      "^\\w\\b\\W\\w$",
      "^\\w+$",
      "^[k]$",
      "^s$",
      "^[^a-c]{2,4}$",
      "^.{0,3}x?$",
      "^(a|)b$",
      "^()$",
      "^(?:\\.|,)\\d{0,2}$",
      "^\\d{2}$",
      "^a{0}b$",
      "^a{2,}$",
      "^a{1,3}?$",
      "^a+?b$",
      "^a*?$",
      "^[\\d.]+$",
      "^\\s*x\\s*$",
      "^[\\-+]?\\d+$",
      "^😀+$",
      "^.$",
      "^[^\\s]{1,5}$",
      "^(?:ab|a)(?:bc|c)?$",
      "^[A-Z][a-z]*$",
      "^\\D\\S\\W$",
      "^.*a.*b.*$",
      "^é+$",
    ];
    const subjects = [
      "",
      "a",
      "b",
      "ab",
      "abc",
      "abbc",
      "aab",
      "aaa",
      "aaaa",
      "oxygen",
      "OXYGEN",
      "Oxygen",
      "o2",
      "O2",
      "nucleus",
      "the nucleus",
      "thenucleus",
      "12",
      "12.5",
      "1.",
      ".5",
      ",55",
      "x^2 + 3x",
      "x^2+3x",
      "cell",
      " cell",
      "a b",
      "a  b",
      "a\nb",
      "ſ", // long s: folds to "s" under `iu` and is then a word character
      "K", // Kelvin sign: folds to "k"
      "k",
      "K",
      "s",
      "S",
      "😀",
      "😀😀",
      "-12",
      "+7",
      "(x+1)",
      "1234",
      "x",
      " x ",
      "xy",
      "x ",
      "a-b",
      "a b c",
      "É",
      "éé",
      "Éé",
      "Hello",
      "hello",
      "a.b",
      "ba",
      "a_b",
    ];
    for (const pattern of patterns) {
      expect(checkSafePattern(pattern).ok, pattern).toBe(true);
      for (const caseSensitive of [false, true]) {
        const native = new RegExp(pattern, caseSensitive ? "u" : "iu");
        for (const subject of subjects) {
          expect(testSafePattern(subject, pattern, caseSensitive), `${pattern} ${caseSensitive ? "u" : "iu"} ${JSON.stringify(subject)}`).toBe(native.test(subject));
        }
      }
    }
  });
});
