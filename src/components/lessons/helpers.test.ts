import { describe, expect, it } from "vitest";
import {
  IDLE_AFTER_MS,
  MAX_PENDING_MS,
  MAX_TICK_GAP_MS,
  TERMINAL_ERROR_CODES,
  TICK_INTERVAL_MS,
  interact,
  restoreSeconds,
  startClock,
  takeSeconds,
  tick,
} from "./activity";
import { accuracyPercent, checkScoreText, codedName, lessonHref, lessonKindLabel, lessonStateLabel, topicHref, topicKindLabel, topicTestHref } from "./labels";
import { activeTocId, tocItems, tocLabel } from "./toc";

const TOPIC = "0199a1b2-0000-7000-8000-aaaaaaaaaaaa";
const LESSON = "0199a1b2-0000-7000-8000-bbbbbbbbbbbb";

describe("table of contents", () => {
  it("keeps the two shallowest heading levels in order and drops duplicates and blanks", () => {
    const items = tocItems([
      { id: "c-intro", text: "Introduction", depth: 2 },
      { id: "c-method", text: "Method", depth: 3 },
      { id: "c-detail", text: "Detail", depth: 4 },
      { id: "c-method", text: "Method again", depth: 3 },
      { id: "c-empty", text: "   ", depth: 2 },
      { id: "c-summary", text: "Summary", depth: 2 },
    ]);
    expect(items).toEqual([
      { id: "c-intro", label: "Introduction", level: 0 },
      { id: "c-method", label: "Method", level: 1 },
      { id: "c-summary", label: "Summary", level: 0 },
    ]);
  });

  it("is relative to the shallowest level and empty below two entries", () => {
    expect(tocItems([{ id: "a", text: "A", depth: 3 }, { id: "b", text: "B", depth: 4 }]).map((i) => i.level)).toEqual([0, 1]);
    expect(tocItems([{ id: "a", text: "Only one", depth: 2 }])).toEqual([]);
    expect(tocItems([])).toEqual([]);
  });

  it("drops LaTeX delimiters and shortens very long labels", () => {
    expect(tocLabel("Solving $x^2 = 9$ by  factorising")).toBe("Solving x^2 = 9 by factorising");
    expect(tocLabel("$$E = mc^2$$")).toBe("E = mc^2");
    const long = tocLabel("word ".repeat(40));
    expect(long.length).toBeLessThanOrEqual(90);
    expect(long.endsWith("…")).toBe(true);
  });

  it("finds the section being read from heading positions", () => {
    const positions = [
      { id: "a", top: -400 },
      { id: "b", top: 80 },
      { id: "c", top: 600 },
    ];
    expect(activeTocId(positions, 120)).toBe("b");
    expect(activeTocId(positions, 50)).toBe("a");
    expect(activeTocId([{ id: "a", top: 500 }], 120)).toBe("a");
    expect(activeTocId([], 120)).toBeNull();
  });
});

describe("reading clock", () => {
  it("counts visible, active time between ticks", () => {
    let clock = startClock(0);
    clock = tick(clock, TICK_INTERVAL_MS, true);
    clock = tick(clock, 2 * TICK_INTERVAL_MS, true);
    expect(clock.pendingMs).toBe(2 * TICK_INTERVAL_MS);
  });

  it("pauses while hidden and resumes without counting the hidden time", () => {
    let clock = startClock(0);
    clock = tick(clock, 5_000, false);
    expect(clock).toMatchObject({ pendingMs: 0, lastTickAt: null });
    clock = tick(clock, 60_000, true);
    expect(clock.pendingMs).toBe(0);
    clock = tick(clock, 65_000, true);
    expect(clock.pendingMs).toBe(5_000);
  });

  it("stops counting when the student has been idle, and restarts on interaction", () => {
    let clock = startClock(0);
    clock = tick(clock, IDLE_AFTER_MS + 5_000, true);
    expect(clock.pendingMs).toBe(0);
    clock = interact(clock, IDLE_AFTER_MS + 6_000);
    clock = tick(clock, IDLE_AFTER_MS + 11_000, true);
    expect(clock.pendingMs).toBe(5_000);
  });

  it("caps long gaps between ticks (sleeping phone) and the pending total", () => {
    let clock = startClock(0);
    clock = interact(clock, 59_000);
    clock = tick(clock, 60_000, true);
    expect(clock.pendingMs).toBe(MAX_TICK_GAP_MS);
    clock = restoreSeconds(clock, 10_000);
    expect(clock.pendingMs).toBe(MAX_PENDING_MS);
  });

  it("hands out whole seconds and keeps the remainder", () => {
    const { seconds, clock } = takeSeconds({ pendingMs: 12_345, lastTickAt: 0, lastInteractionAt: 0 });
    expect(seconds).toBe(12);
    expect(clock.pendingMs).toBe(345);
    expect(restoreSeconds(clock, 12).pendingMs).toBe(12_345);
    expect(restoreSeconds(clock, -3).pendingMs).toBe(345);
  });

  it("treats access and auth failures as final", () => {
    expect(TERMINAL_ERROR_CODES.has("ENTITLEMENT_REQUIRED")).toBe(true);
    expect(TERMINAL_ERROR_CODES.has("RATE_LIMITED")).toBe(false);
    expect(TERMINAL_ERROR_CODES.has("INTERNAL")).toBe(false);
  });
});

describe("labels and links", () => {
  it("words kinds and states", () => {
    expect(lessonKindLabel("WORKED_EXAMPLES")).toBe("Worked examples");
    expect(lessonKindLabel("SOMETHING_NEW")).toBe("Lesson");
    expect(lessonStateLabel("IN_PROGRESS")).toBe("In progress");
    expect(topicKindLabel("SUBTOPIC")).toBe("Subtopic");
    expect(codedName("Quadratics", "2.1")).toBe("2.1 Quadratics");
    expect(codedName("Quadratics", null)).toBe("Quadratics");
  });

  it("builds lesson, topic and topic-test links", () => {
    expect(lessonHref(LESSON)).toBe(`/app/lessons/${LESSON}`);
    expect(lessonHref(LESSON, { topicId: TOPIC })).toBe(`/app/lessons/${LESSON}?topic=${TOPIC}`);
    expect(lessonHref(LESSON, { topicId: "not-a-uuid" })).toBe(`/app/lessons/${LESSON}`);
    expect(lessonHref(LESSON, { topicId: TOPIC, params: { practice: "done" }, hash: "lesson-practice" })).toBe(
      `/app/lessons/${LESSON}?topic=${TOPIC}&practice=done#lesson-practice`,
    );
    expect(topicHref("s", "t")).toBe("/app/subjects/s/topics/t");
    expect(topicTestHref("s", "t")).toBe("/app/exams?subjectId=s&topicId=t");
  });

  it("describes a lesson check score honestly", () => {
    expect(checkScoreText(75, 3, 4)).toBe("75% · 3 of 4 marks");
    expect(checkScoreText(100, 1, 1)).toBe("100% · 1 of 1 mark");
    expect(checkScoreText(null, null, null)).toBe("Not marked yet");
    expect(checkScoreText(null, 2, 4)).toBe("2 of 4 marks");
    expect(accuracyPercent(2, 3)).toBe(66.7);
    expect(accuracyPercent(0, 0)).toBeNull();
  });
});
