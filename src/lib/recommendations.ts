/**
 * Student-facing copy for result recommendations (§11 "recommend a lesson, re-test later"). The engine stores reason
 * CODES (src/server/adaptive/core.ts `RecommendationReason`); this maps them to plain sentences. An unknown code
 * shows no sentence rather than a raw code. Pure and isomorphic: used by the practice summary, the exam results page
 * and anything else that lists recommendations.
 */
import { formatCount } from "@/lib/format";

export interface RecommendationLike {
  kind: "LESSON" | "PRACTICE" | "TOPIC_TEST" | "FLASHCARDS";
  topicName: string | null;
  lessonTitle: string | null;
  questionCount: number | null;
  reason: string;
}

const REASON_COPY: Readonly<Record<string, string>> = {
  NOT_STARTED: "You haven't started this topic yet.",
  CONCEPT_GAP: "Some answers showed a gap in the key idea. The lesson explains it step by step.",
  REPEATED_ERRORS: "Several answers here were wrong. Start with easier questions and the lesson.",
  WEAK_TOPIC: "This is one of your weaker topics.",
  BUILD_MASTERY: "A little more practice will make this topic stronger.",
  COMPLETE_LESSONS: "Finish the lessons for this topic.",
  RETEST_DUE: "It's time to check that this topic has stuck.",
  RETEST_SCHEDULED: "A short re-test later will check that it has stuck.",
  STRETCH: "You're doing well here. Try harder questions.",
  EXAM_LEVEL_READY: "You're ready for exam-level questions in this topic.",
};

export function recommendationReason(code: string): string | null {
  return REASON_COPY[code] ?? null;
}

export function recommendationLabel(rec: RecommendationLike): string {
  const topic = rec.topicName ?? "this topic";
  switch (rec.kind) {
    case "LESSON":
      return rec.lessonTitle ? `Read the lesson: ${rec.lessonTitle}` : `Study ${topic}`;
    case "PRACTICE":
      return rec.questionCount ? `Practise ${topic} (${formatCount(rec.questionCount, "question")})` : `Practise ${topic}`;
    case "TOPIC_TEST":
      return `Take a topic test: ${topic}`;
    case "FLASHCARDS":
      return `Review flashcards: ${topic}`;
  }
}
