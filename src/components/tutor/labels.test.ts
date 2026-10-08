import { describe, expect, it } from "vitest";
import { askTutorHref } from "./AskTutorLink";
import { MODE_CHIPS, quotaText, startersFor, turnModeCaption } from "./labels";
import { groupBySection, type NewConversationTopic } from "./NewConversationForm";

describe("tutor labels", () => {
  it("lists the four modes with Teach me first (§14 default, §15 distinction)", () => {
    expect(MODE_CHIPS.map((chip) => chip.label)).toEqual(["Teach me", "Hint", "Check my working", "Give me the answer"]);
  });

  it("words the allowance", () => {
    expect(quotaText({ limit: 30, remaining: 3 })).toBe("3 of 30 messages left today");
    expect(quotaText({ limit: 1, remaining: 1 })).toBe("1 of 1 message left today");
    expect(quotaText(null)).toBeNull();
  });

  it("captions answers by mode and hint level", () => {
    expect(turnModeCaption("HINT", 2)).toBe("Hint 2 of 4");
    expect(turnModeCaption("TEACH", 0)).toBeNull();
    expect(turnModeCaption("ANSWER", 4)).toBe("Full worked solution");
    expect(turnModeCaption("SAFEGUARD", null)).toBeNull();
  });

  it("offers generic starters by context", () => {
    expect(startersFor({ hasQuestion: false, hasTopic: true, hasSubject: true })).toContain("Explain this topic from the beginning");
    expect(startersFor({ hasQuestion: true, hasTopic: true, hasSubject: true })).toContain("Why was my answer wrong?");
    expect(startersFor({ hasQuestion: false, hasTopic: false, hasSubject: false }).length).toBeGreaterThan(0);
  });
});

describe("entry points", () => {
  it("links to the prefilled new-conversation page (no state change on GET)", () => {
    expect(askTutorHref({})).toBe("/app/tutor/new");
    expect(askTutorHref({ topicId: "t1", questionId: "q1" })).toBe("/app/tutor/new?topicId=t1&questionId=q1");
  });

  it("groups topics under their sections for the picker", () => {
    const topics: NewConversationTopic[] = [
      { id: "a", name: "Loose", code: null, kind: "TOPIC" },
      { id: "s1", name: "Algebra", code: null, kind: "SECTION" },
      { id: "t1", name: "Equations", code: "1.1", kind: "TOPIC" },
      { id: "t2", name: "Linear", code: null, kind: "SUBTOPIC" },
      { id: "s2", name: "Empty", code: null, kind: "SECTION" },
    ];
    expect(groupBySection(topics).map((group) => [group.section?.id ?? null, group.items.map((item) => item.id)])).toEqual([
      [null, ["a"]],
      ["s1", ["t1", "t2"]],
    ]);
  });
});
