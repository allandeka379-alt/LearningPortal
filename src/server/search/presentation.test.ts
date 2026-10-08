import { describe, expect, it } from "vitest";
import {
  ANONYMOUS_VIEWER,
  HEADLINE_FRAGMENT,
  HEADLINE_START,
  HEADLINE_STOP,
  SNIPPET_MAX_CHARS,
  lockStateFor,
  parseHeadline,
  type PremiumScope,
} from "./presentation";

const scope: PremiumScope = { entityType: "LESSON", subjectIds: ["s1"], qualificationIds: ["q1"], examBoardIds: ["b1"] };

describe("lockStateFor", () => {
  it("never locks PUBLIC results", () => {
    expect(lockStateFor("PUBLIC", scope, ANONYMOUS_VIEWER)).toEqual({ locked: false, lockReason: null });
  });

  it("locks FREE results for signed-out viewers only", () => {
    expect(lockStateFor("FREE", scope, ANONYMOUS_VIEWER)).toEqual({ locked: true, lockReason: "SIGN_IN" });
    expect(lockStateFor("FREE", scope, { signedIn: true })).toEqual({ locked: false, lockReason: null });
  });

  it("unlocks PREMIUM results only when the entitlement predicate allows this scope", () => {
    expect(lockStateFor("PREMIUM", scope, { signedIn: true })).toEqual({ locked: true, lockReason: "PREMIUM" });
    const subjectPack = { signedIn: true, canViewPremium: (s: PremiumScope) => s.subjectIds.includes("s1") };
    expect(lockStateFor("PREMIUM", scope, subjectPack)).toEqual({ locked: false, lockReason: null });
    expect(lockStateFor("PREMIUM", { ...scope, subjectIds: ["s2"] }, subjectPack).locked).toBe(true);
    // A predicate is never consulted for a signed-out viewer.
    expect(lockStateFor("PREMIUM", scope, { signedIn: false, canViewPremium: () => true }).locked).toBe(true);
  });
});

describe("parseHeadline", () => {
  it("splits ts_headline output into plain and highlighted segments", () => {
    const raw = `To solve a ${HEADLINE_START}quadratic${HEADLINE_STOP} equation,\nfactorise`;
    expect(parseHeadline(raw)).toEqual([
      { text: "To solve a ", match: false },
      { text: "quadratic", match: true },
      { text: " equation, factorise", match: false },
    ]);
  });

  it("joins fragments with an ellipsis", () => {
    const raw = `first ${HEADLINE_START}mole${HEADLINE_STOP}${HEADLINE_FRAGMENT}second`;
    expect(parseHeadline(raw)?.map((s) => s.text).join("")).toBe("first mole … second");
  });

  it("returns segments as text (markup stays inert) and bounds the length", () => {
    const parsed = parseHeadline(`<script>x</script> ${"a".repeat(1000)}`);
    expect(parsed?.[0]?.text.startsWith("<script>")).toBe(true);
    expect(parsed?.reduce((n, s) => n + s.text.length, 0)).toBeLessThanOrEqual(SNIPPET_MAX_CHARS);
  });

  it("returns null for empty input", () => {
    expect(parseHeadline(null)).toBeNull();
    expect(parseHeadline("   ")).toBeNull();
  });
});
