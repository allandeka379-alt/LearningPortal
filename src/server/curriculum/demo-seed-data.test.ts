import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { formatExpectedNumber, validateQuestionDefinition, type QuestionRecord } from "@/lib/questions";
import { markQuestion } from "@/server/marking/mark";
import { CHEMISTRY_DEMO } from "../../../prisma/seed/data/demo/chemistry";
import { MATHS_DEMO } from "../../../prisma/seed/data/demo/maths";
import type { DemoPart, DemoQuestionCore, DemoSubjectContent } from "../../../prisma/seed/data/demo/types";
import { plannedSessions } from "../../../prisma/seed/demo/exam-sessions";
import { achievementCode, achievementCriteria } from "../../../prisma/seed/platform";
import { stableUuidV4 } from "../../../prisma/seed/util";

/**
 * Guards the DEV seed's demo curriculum content (prisma/seed/data/demo): §50 demo data must still be CORRECT. Every
 * question must be a valid definition, its intended answer must earn full marks with the real marking engine and a
 * wrong answer must not, and every reference (topics, practice questions, assessment items) must resolve. (Kept here
 * because Vitest only collects src/** and tests/**.)
 */

const SUBJECTS: DemoSubjectContent[] = [MATHS_DEMO, CHEMISTRY_DEMO];

function record(q: DemoQuestionCore & { parts?: DemoPart[]; partLabel?: string }, order = 0): QuestionRecord {
  const payload =
    q.payload && typeof q.payload === "object" && "mediaAssetId" in q.payload ? { ...(q.payload as object), mediaAssetId: randomUUID() } : (q.payload ?? null);
  return {
    id: randomUUID(),
    type: q.type,
    markingMode: q.markingMode ?? "AUTO",
    stem: q.stem,
    payload,
    answerSpec: q.answerSpec ?? null,
    marks: q.marks,
    partLabel: q.partLabel ?? null,
    partOrder: order,
    options: (q.options ?? []).map((o, i) => ({ id: randomUUID(), key: o.key, content: o.content, isCorrect: o.isCorrect, rationale: o.rationale ?? null, mediaAssetId: null, sortOrder: i })),
    parts: (q.parts ?? []).map((p, i) => record(p, i)),
  };
}

type Spec = Record<string, unknown> & {
  correct?: boolean;
  accepted?: { value: string }[];
  rubric?: { anyOf: string[] }[];
  value?: number;
  units?: { accepted: string[] };
  pairs?: { leftId: string; rightId: string }[];
  blanks?: { id: string; accepted: string[] }[];
  hotspots?: { hotspotId: string; labelId?: string }[];
};

/** The response a student who knows the answer would give. */
function intendedResponse(q: QuestionRecord): unknown {
  const spec = (q.answerSpec ?? {}) as Spec;
  switch (q.type) {
    case "MULTIPLE_CHOICE":
      return { type: q.type, optionKeys: (q.options ?? []).filter((o) => o.isCorrect).map((o) => o.key) };
    case "TRUE_FALSE":
      return { type: q.type, value: spec.correct };
    case "SHORT_ANSWER":
      return { type: q.type, text: spec.accepted?.[0]?.value ?? (spec.rubric ?? []).map((r) => `It ${r.anyOf[0]}.`).join(" ") };
    case "NUMERICAL":
    case "CALCULATION":
      return { type: q.type, value: formatExpectedNumber(spec.value ?? 0, spec as never), ...(spec.units ? { unit: spec.units.accepted[0] } : {}) };
    case "MATCHING":
      return { type: q.type, pairs: spec.pairs };
    case "FILL_IN_THE_BLANK":
      return { type: q.type, blanks: (spec.blanks ?? []).map((b) => ({ blankId: b.id, text: b.accepted[0] })) };
    case "DIAGRAM_LABELLING":
      return { type: q.type, labels: (spec.hotspots ?? []).map((h) => ({ targetId: h.hotspotId, labelId: h.labelId })) };
    case "STRUCTURED":
      return { type: q.type, parts: (q.parts ?? []).map((p) => ({ partId: p.id, response: intendedResponse(p) })) };
    default:
      return null;
  }
}

/** A plausible wrong response. */
function wrongResponse(q: QuestionRecord): unknown {
  const spec = (q.answerSpec ?? {}) as Spec;
  switch (q.type) {
    case "MULTIPLE_CHOICE":
      return { type: q.type, optionKeys: [(q.options ?? []).find((o) => !o.isCorrect)?.key ?? "Z"] };
    case "TRUE_FALSE":
      return { type: q.type, value: !spec.correct };
    case "SHORT_ANSWER":
      return { type: q.type, text: "I am not sure" };
    case "NUMERICAL":
    case "CALCULATION":
      return { type: q.type, value: String((spec.value ?? 0) * 3 + 7), ...(spec.units ? { unit: spec.units.accepted[0] } : {}) };
    case "MATCHING": {
      const pairs = spec.pairs ?? [];
      return { type: q.type, pairs: pairs.map((p, i) => ({ leftId: p.leftId, rightId: pairs[(i + 1) % pairs.length]?.rightId ?? p.rightId })) };
    }
    case "FILL_IN_THE_BLANK":
      return { type: q.type, blanks: (spec.blanks ?? []).map((b) => ({ blankId: b.id, text: b.accepted[0] === "999" ? "998" : "999" })) };
    case "DIAGRAM_LABELLING": {
      const spots = spec.hotspots ?? [];
      return { type: q.type, labels: spots.map((h, i) => ({ targetId: h.hotspotId, labelId: spots[(i + 1) % spots.length]?.labelId })) };
    }
    case "STRUCTURED":
      return { type: q.type, parts: (q.parts ?? []).map((p) => ({ partId: p.id, response: wrongResponse(p) })) };
    default:
      return null;
  }
}

describe.each(SUBJECTS.map((s) => [s.refPrefix, s] as const))("demo content %s", (_prefix, data) => {
  const topicSlugs = new Set(data.topics.flatMap((t) => [t.slug, ...t.subtopics.map((s) => s.slug)]));
  const questionRefs = new Set(data.questions.map((q) => q.ref));

  it("meets the volume requirements: 4-6 topics, 40+ questions of all 11 types and 5 difficulties, 15+ flashcards", () => {
    expect(data.topics.length).toBeGreaterThanOrEqual(4);
    expect(data.topics.length).toBeLessThanOrEqual(6);
    expect(data.questions.length).toBeGreaterThanOrEqual(40);
    expect(new Set(data.questions.map((q) => q.type)).size).toBe(11);
    expect(new Set(data.questions.map((q) => q.difficulty))).toEqual(new Set([1, 2, 3, 4, 5]));
    expect(data.flashcards.length).toBeGreaterThanOrEqual(15);
    expect(data.lessons.length).toBeGreaterThanOrEqual(2);
    expect(data.questions.filter((q) => q.daily).length).toBeGreaterThanOrEqual(14);
    expect(data.assessments.map((a) => a.kind).sort()).toEqual(["MOCK_EXAM", "TOPIC_TEST"]);
  });

  it("has unique refs and resolvable topic, practice and assessment references", () => {
    expect(questionRefs.size).toBe(data.questions.length);
    for (const q of data.questions) expect(topicSlugs, q.ref).toContain(q.topic);
    for (const card of data.flashcards) expect(topicSlugs, card.ref).toContain(card.topic);
    for (const lesson of data.lessons) {
      for (const slug of [lesson.topic, ...(lesson.extraTopics ?? [])]) expect(topicSlugs, lesson.ref).toContain(slug);
      for (const ref of lesson.practice ?? []) expect(questionRefs, lesson.ref).toContain(ref);
    }
    for (const assessment of data.assessments) {
      for (const ref of assessment.sections.flatMap((s) => s.questions)) expect(questionRefs, assessment.ref).toContain(ref);
    }
    const dailyTypes = new Set(data.questions.filter((q) => q.daily).map((q) => q.type));
    expect([...dailyTypes].every((t) => ["MULTIPLE_CHOICE", "TRUE_FALSE", "SHORT_ANSWER", "NUMERICAL"].includes(t))).toBe(true);
  });

  it.each(data.questions.map((q) => [q.ref, q] as const))("%s is valid, marks its intended answer in full and a wrong answer below full", (_ref, q) => {
    const rec = record(q);
    const validation = validateQuestionDefinition({
      type: rec.type,
      markingMode: rec.markingMode,
      marks: rec.marks,
      payload: rec.payload,
      answerSpec: rec.answerSpec,
      options: rec.options,
      parts: rec.parts?.map((p) => ({ ...p, options: p.options ?? [] })),
    });
    expect(validation.issues.filter((i) => i.severity === "error")).toEqual([]);
    if (q.type === "ESSAY" || q.type === "EXTENDED_RESPONSE") {
      expect(q.markingMode).not.toBe("AUTO");
      return;
    }
    const right = markQuestion(rec, intendedResponse(rec));
    expect({ status: right.status, marks: right.marksAwarded }).toEqual({ status: "MARKED", marks: rec.marks });
    expect(markQuestion(rec, wrongResponse(rec)).marksAwarded).toBeLessThan(rec.marks);
  });
});

describe("seed helpers", () => {
  it("plans the next two provisional sessions per series from today", () => {
    const november = { boardSlug: "zimsec", qualificationSlug: "o-level", seriesCode: "NOV", label: "November", typicalStartMonth: 10, typicalEndMonth: 12 };
    expect(plannedSessions(november, "2026-10-05")).toEqual([
      { seriesCode: "2026-NOV", year: 2026, name: "November 2026", startsOn: "2026-10-01", endsOn: "2026-12-31" },
      { seriesCode: "2027-NOV", year: 2027, name: "November 2027", startsOn: "2027-10-01", endsOn: "2027-12-31" },
    ]);
    const june = { ...november, seriesCode: "JUN", label: "June", typicalStartMonth: 6, typicalEndMonth: 6 };
    expect(plannedSessions(june, "2026-10-05").map((s) => s.seriesCode)).toEqual(["2027-JUN", "2028-JUN"]);
  });

  it("maps achievement codes and criteria onto the database contract", () => {
    expect(achievementCode("streak-3")).toBe("STREAK_3");
    expect(achievementCode("first-mock")).toBe("FIRST_MOCK");
    expect(achievementCriteria({ type: "streak_days", threshold: 7 })).toEqual({ type: "STREAK_DAYS", days: 7 });
    expect(achievementCriteria({ type: "diagnostics_completed", threshold: 1 })).toEqual({ type: "DIAGNOSTIC_COMPLETED" });
  });

  it("derives stable, well-formed v4 UUIDs for demo storage keys", () => {
    const id = stableUuidV4("demo:diagram:circle-parts");
    expect(id).toBe(stableUuidV4("demo:diagram:circle-parts"));
    expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });
});
