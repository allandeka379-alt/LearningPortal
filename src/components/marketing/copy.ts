/**
 * Fixed marketing copy (§45). Owner brief 2026-10-12: BvunzoHub is a learning platform for Form 3 to Form 6 that
 * also prepares exam candidates; there is no free tier (US$1 a month unlocks everything, set in the database). Everything that varies by
 * curriculum, plan or price comes from the database: functions here take the price label as an argument.
 */

/**
 * Supporting line under the headline (no AI claim while AI features are switched off, which is the default; also the
 * Open Graph image text and the home page meta description).
 */
export const HERO_SUPPORTING_LINE =
  "Complete courses for Form 3 to Form 6, ZIMSEC and Cambridge, O-Level and A-Level: clear lessons in syllabus order, instantly marked practice, flashcards and timed mock exams.";

/** Supporting line while AI features are switched on (`features.ai`). */
export const HERO_SUPPORTING_LINE_WITH_AI =
  "Complete courses for Form 3 to Form 6, ZIMSEC and Cambridge, O-Level and A-Level: clear lessons in syllabus order, instantly marked practice, mock exams and AI-powered tutoring.";

/** The hero supporting line for the current AI switch. */
export function heroSupportingLine(aiEnabled: boolean): string {
  return aiEnabled ? HERO_SUPPORTING_LINE_WITH_AI : HERO_SUPPORTING_LINE;
}

/** Main call to action: the database price when one is on sale ("Get full access for US$1"), else a neutral label. */
export function joinLabel(priceLabel: string | null): string {
  return priceLabel ? `Get full access for ${priceLabel}` : "Create your account";
}

/** How the monthly price is paid (owner decisions: Paynow only, US$1 a month from 2026-10-12). */
export const PAYMENT_METHODS_LINE = "Pay through Paynow with EcoCash, OneMoney or a card. Renew each month; nothing is charged without you.";

export interface Step {
  title: string;
  body: string;
}

/** The student journey, from sign-up to exam (the "How it works" steps). No AI claim. */
export function howItWorksSteps(aiEnabled: boolean, priceLabel: string | null = null): readonly Step[] {
  return [
    { title: "Create your account", body: "Sign up with your email address. We confirm it with a code by email." },
    {
      title: "Tell us your form and subjects",
      body: "Choose your board, your form (Form 3 to Form 6), the subjects you take and when you write your exams.",
    },
    {
      title: priceLabel ? `Unlock everything for ${priceLabel}` : "Unlock everything",
      body: "Pay through Paynow by EcoCash, OneMoney or card and every subject at every level opens. Renew each month to keep going.",
    },
    {
      title: "Learn topic by topic",
      body: "Each subject is a course in syllabus order: a clear lesson with worked examples, then a quick check.",
    },
    {
      title: "Practise and remember",
      body: aiEnabled
        ? "Instantly marked questions with explanations, flashcards before you forget, and an AI tutor when you are stuck."
        : "Instantly marked questions with explanations and hints, and flashcards scheduled just before you forget.",
    },
    {
      title: "Get ready for the exam",
      body: "A study plan built around your exam date, topic tests and timed mock papers with a grade estimate.",
    },
  ];
}

/** The learning loop every topic follows (home page and /how-it-works). */
export const LEARNING_LOOP: readonly (Step & { key: "learn" | "check" | "practise" | "remember" | "test" })[] = [
  { key: "learn", title: "Learn", body: "A short, clear lesson with worked examples, written for your board's syllabus." },
  { key: "check", title: "Check", body: "A quick check at the end of the lesson shows straight away whether it went in." },
  { key: "practise", title: "Practise", body: "Questions marked the moment you answer, with hints and the full method." },
  { key: "remember", title: "Remember", body: "Flashcards for definitions, formulas and facts, timed for when you would forget." },
  { key: "test", title: "Test", body: "Topic tests and exam-style questions show what is secure and what needs another go." },
];

/** What exam candidates get (home band and /exam-candidates). */
export const EXAM_CANDIDATE_POINTS: readonly (Step & { key: "countdown" | "plan" | "questions" | "mocks" | "gaps" })[] = [
  { key: "countdown", title: "A countdown to your papers", body: "Pick your exam session and always know how many days are left." },
  { key: "plan", title: "A plan to your exam date", body: "A weekly plan that fits the time you have, your subjects and your weakest topics." },
  { key: "questions", title: "Exam-style questions", body: "Questions in the style of the real papers, with the marks shown and mark-scheme style answers." },
  { key: "mocks", title: "Timed mock papers", body: "Sit a full paper against the clock, then see your score, an estimated grade and what to fix." },
  { key: "gaps", title: "Close the gaps", body: "Every result points you to the lessons and practice for the topics you dropped marks on." },
];

/** §14 teach-first approach of the AI tutor, in the order the tutor follows it (home page, only while AI is on). */
export const TUTOR_STEPS: readonly string[] = [
  "Makes sure it understands your question",
  "Explains the concept behind it",
  "Breaks the problem into steps",
  "Gives hints before answers",
  "Encourages you to try it yourself",
  "Shows the full solution when you are ready",
  "Explains where a mistake came from",
];
