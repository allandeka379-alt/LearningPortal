import { describe, expect, it } from "vitest";
import { cardsLeftLabel, deckCountsText, dueInText, newCardHref, reviewHref, reviewableCount, sessionTimeText, spokenInterval } from "./copy";

const NOW = new Date("2026-10-05T10:00:00.000Z");
const later = (ms: number) => new Date(NOW.getTime() + ms).toISOString();

describe("flashcard copy", () => {
  it("links to review sessions and the new-card form with their scope", () => {
    expect(reviewHref()).toBe("/app/flashcards/review");
    expect(reviewHref({ subjectId: "s1" })).toBe("/app/flashcards/review?subjectId=s1");
    expect(reviewHref({ subjectId: "s1", topicId: "t1" })).toBe("/app/flashcards/review?subjectId=s1&topicId=t1");
    expect(newCardHref({ subjectId: "s1", topicId: null })).toBe("/app/flashcards/new?subjectId=s1");
    expect(newCardHref()).toBe("/app/flashcards/new");
  });

  it("counts what a deck's Review starts with (new cards capped by today's allowance)", () => {
    expect(reviewableCount({ due: 3, newAvailable: 50 }, 20)).toBe(23);
    expect(reviewableCount({ due: 3, newAvailable: 50 }, 0)).toBe(3);
    expect(deckCountsText({ due: 3, newAvailable: 50 }, 20)).toBe("3 due · 20 new");
    expect(deckCountsText({ due: 0, newAvailable: 4 }, 20)).toBe("4 new");
    expect(deckCountsText({ due: 0, newAvailable: 4 }, 0)).toBe("Nothing to review");
    expect(cardsLeftLabel(12)).toBe("12 left");
    expect(cardsLeftLabel(-1)).toBe("0 left");
  });

  it("words due times and session time", () => {
    expect(dueInText(later(30_000), NOW)).toBe("in a minute");
    expect(dueInText(later(8 * 60_000), NOW)).toBe("in 8 minutes");
    expect(dueInText(later(3 * 3_600_000), NOW)).toBe("in 3 hours");
    expect(dueInText(later(50 * 3_600_000), NOW)).toBe("in 2 days");
    expect(sessionTimeText(45_000)).toBe("45 s");
    expect(sessionTimeText(4 * 60_000)).toBe("4 min");
    expect(sessionTimeText(65 * 60_000)).toBe("1 h 5 min");
  });

  it("reads scheduler labels aloud", () => {
    expect(spokenInterval("<1m")).toBe("under 1 minute");
    expect(spokenInterval("<10m")).toBe("under 10 minutes");
    expect(spokenInterval("<1.5h")).toBe("under 1.5 hours");
    expect(spokenInterval("1d")).toBe("1 day");
    expect(spokenInterval("4d")).toBe("4 days");
    expect(spokenInterval("1.2mo")).toBe("1.2 months");
    expect(spokenInterval("1y")).toBe("1 year");
    expect(spokenInterval("soon")).toBe("soon");
  });
});
