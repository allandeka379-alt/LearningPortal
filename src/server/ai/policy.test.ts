import { describe, expect, it } from "vitest";
import { buildStudentContext } from "./context";
import {
  buildPolicyPrompt,
  buildTurnGuidance,
  buildTutorSystem,
  decideTurnPolicy,
  POLICY_PROMPT_VERSION,
  type TurnPolicyInput,
} from "./policy";

const turn = (patch: Partial<TurnPolicyInput> = {}): TurnPolicyInput => ({
  intent: "TEACH",
  previousHintLevel: null,
  attempted: false,
  activeExam: false,
  ...patch,
});

describe("policy prompt", () => {
  it("is byte-identical for the same mode (cache-stable) and differs between modes", () => {
    expect(buildPolicyPrompt("TUTOR")).toBe(buildPolicyPrompt("TUTOR"));
    expect(buildPolicyPrompt("SOLVER")).toBe(buildPolicyPrompt("SOLVER"));
    expect(buildPolicyPrompt("TUTOR")).not.toBe(buildPolicyPrompt("SOLVER"));
    expect(POLICY_PROMPT_VERSION).toMatch(/^[\w.-]{1,32}$/);
  });

  it("contains no volatile content (dates, ids) and covers the required rules", () => {
    const prompt = buildPolicyPrompt("TUTOR");
    expect(prompt).not.toMatch(/\d{4}-\d{2}-\d{2}/);
    expect(prompt).not.toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-/i);
    // §14 seven steps
    for (const step of ["1. Understand", "2. Explain", "3. Break", "4. Give a hint", "5. Encourage", "6. Reveal", "7. When the student makes a mistake"]) {
      expect(prompt).toContain(step);
    }
    // Integrity, identity, notation, context awareness, injection resistance.
    expect(prompt).toMatch(/not a teacher, an examiner or an exam board/);
    expect(prompt).toMatch(/grade boundaries/);
    expect(prompt).toMatch(/exam or mock exam is in progress/);
    expect(prompt).toContain("$x^2 - 5x + 6 = 0$");
    expect(prompt).toMatch(/ZIMSEC and Cambridge/);
    expect(prompt).toMatch(/<platform_guidance>/);
    expect(prompt).toMatch(/Do not ask for or repeat the student's name, school, phone number, email/);
  });

  it("buildTutorSystem is deterministic and keeps the policy block identical across students and turns", () => {
    const contextA = buildStudentContext({ board: "ZIMSEC", qualification: "O-Level", subject: "Mathematics" });
    const contextB = buildStudentContext({ board: "Cambridge", qualification: "A-Level", subject: "Physics" });
    const a1 = buildTutorSystem({ mode: "TUTOR", studentContext: contextA, turn: decideTurnPolicy(turn()) });
    const a2 = buildTutorSystem({ mode: "TUTOR", studentContext: contextA, turn: decideTurnPolicy(turn()) });
    const b = buildTutorSystem({
      mode: "TUTOR",
      studentContext: contextB,
      turn: decideTurnPolicy(turn({ intent: "ANSWER" })),
    });
    expect(JSON.stringify(a1)).toBe(JSON.stringify(a2));
    expect(a1.stable[0]).toBe(b.stable[0]);
    expect(a1.stable[1]).toBe(contextA);
    expect(a1.stable[1]).not.toBe(b.stable[1]);
    // Per-turn decisions never touch the stable prefix.
    expect(a1.volatile).not.toBe(b.volatile);
    expect(a1.stable.join("\n")).not.toContain("Mode:");
  });

  it("omits an empty student context block", () => {
    expect(buildTutorSystem({ mode: "SOLVER", studentContext: "  ", turn: decideTurnPolicy(turn()) }).stable).toHaveLength(1);
  });
});

describe("decideTurnPolicy", () => {
  it("teaches by default, one hint level per turn, never revealing without an attempt or request", () => {
    expect(decideTurnPolicy(turn())).toEqual({ mode: "TEACH", hintLevel: 0, revealAnswer: false });
    expect(decideTurnPolicy(turn({ previousHintLevel: 1 }))).toEqual({ mode: "TEACH", hintLevel: 2, revealAnswer: false });
    // Ladder capped at 3 until a reveal is permitted.
    expect(decideTurnPolicy(turn({ intent: "HINT", previousHintLevel: 3 }))).toEqual({
      mode: "HINT",
      hintLevel: 3,
      revealAnswer: false,
    });
  });

  it("reveals the full answer on an explicit request outside an exam", () => {
    expect(decideTurnPolicy(turn({ intent: "ANSWER" }))).toEqual({ mode: "ANSWER", hintLevel: 4, revealAnswer: true });
  });

  it("reaches level 4 after an attempt", () => {
    expect(decideTurnPolicy(turn({ intent: "HINT", previousHintLevel: 3, attempted: true }))).toEqual({
      mode: "HINT",
      hintLevel: 4,
      revealAnswer: true,
    });
  });

  it("locks all help during an active timed exam, even for explicit answer requests", () => {
    for (const intent of ["TEACH", "HINT", "ANSWER", "CHECK_WORK", "OFF_TOPIC"] as const) {
      expect(decideTurnPolicy(turn({ intent, activeExam: true, attempted: true }))).toEqual({
        mode: "EXAM_LOCKED",
        hintLevel: null,
        revealAnswer: false,
      });
    }
    expect(buildTurnGuidance(decideTurnPolicy(turn({ activeExam: true })))).toMatch(/Do not solve, hint at, explain or check/);
  });

  it("always answers a safeguarding concern supportively, even during an exam", () => {
    expect(decideTurnPolicy(turn({ intent: "UNSAFE", activeExam: true })).mode).toBe("SAFEGUARD");
  });

  it("respects assignment AI-help settings", () => {
    expect(decideTurnPolicy(turn({ aiHelp: "NONE", intent: "ANSWER" })).mode).toBe("NO_HELP");
    expect(decideTurnPolicy(turn({ aiHelp: "HINTS_ONLY", intent: "ANSWER", previousHintLevel: 3 }))).toEqual({
      mode: "HINT",
      hintLevel: 3,
      revealAnswer: false,
    });
    expect(decideTurnPolicy(turn({ aiHelp: "FULL", intent: "ANSWER" })).revealAnswer).toBe(true);
  });

  it("handles check-work and off-topic turns without the ladder", () => {
    expect(decideTurnPolicy(turn({ intent: "CHECK_WORK" }))).toEqual({ mode: "CHECK_WORK", hintLevel: null, revealAnswer: false });
    expect(decideTurnPolicy(turn({ intent: "OFF_TOPIC" })).mode).toBe("REDIRECT");
  });

  it("only ever yields hint levels allowed by the AiMessage CHECK (0..4)", () => {
    for (const intent of ["TEACH", "HINT", "ANSWER"] as const) {
      for (const previousHintLevel of [null, 0, 1, 2, 3, 4] as const) {
        for (const attempted of [true, false]) {
          const { hintLevel } = decideTurnPolicy(turn({ intent, previousHintLevel, attempted }));
          expect(hintLevel === null || (hintLevel >= 0 && hintLevel <= 4)).toBe(true);
        }
      }
    }
  });
});

describe("buildTurnGuidance", () => {
  it("states the level and forbids revealing the answer below level 4", () => {
    const text = buildTurnGuidance({ mode: "HINT", hintLevel: 2, revealAnswer: false });
    expect(text).toContain("Hint level 2 of 4");
    expect(text).toMatch(/Do not reveal the final answer/);
  });

  it("requires a worked solution (never a bare answer) when revealing", () => {
    const text = buildTurnGuidance({ mode: "ANSWER", hintLevel: 4, revealAnswer: true });
    expect(text).toMatch(/full worked solution/);
    expect(text).toMatch(/Never give only the final answer/);
  });
});
