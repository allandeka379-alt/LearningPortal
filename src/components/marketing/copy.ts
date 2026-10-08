/**
 * Fixed marketing copy that the product spec prescribes word for word (§45). Everything else that varies by
 * curriculum, plan or price comes from the database.
 */

/**
 * Supporting line under "Master Your Exams." (owner decision 2026-10-07: no AI claim while AI features are switched
 * off, which is the default; also the Open Graph image text).
 */
export const HERO_SUPPORTING_LINE = "Complete ZIMSEC and Cambridge O-Level & A-Level study resources, practice questions and mock exams.";

/** §45 supporting line (verbatim), shown only while AI features are switched on (`features.ai`). */
export const HERO_SUPPORTING_LINE_WITH_AI =
  "Complete ZIMSEC and Cambridge O-Level & A-Level study resources, practice questions, mock exams and AI-powered tutoring.";

/** The hero supporting line for the current AI switch. */
export function heroSupportingLine(aiEnabled: boolean): string {
  return aiEnabled ? HERO_SUPPORTING_LINE_WITH_AI : HERO_SUPPORTING_LINE;
}

/** The §52 journey, as the "How it works" steps (no AI claim). UI copy describing product behaviour, no claims. */
export const HOW_IT_WORKS_STEPS: readonly { title: string; body: string }[] = [
  { title: "Create your free account", body: "Sign up with your email address. We confirm it with a code by email." },
  { title: "Choose your board and level", body: "Pick your examination board and whether you are studying O-Level or A-Level." },
  { title: "Add your subjects", body: "Choose the subjects you are writing and the exam session you are aiming for." },
  { title: "Take the diagnostic", body: "A short test shows what you already know and where the gaps are, topic by topic." },
  { title: "Unlock your study plan", body: "With full access: a weekly plan built around your exam date, your subjects and your weakest topics." },
  { title: "Practise and track progress", body: "Lessons, instantly marked practice and mock exams, with progress you can see." },
];

/** The last step while AI features are switched on (`features.ai`). */
const PRACTISE_STEP_WITH_AI = { title: "Practise and track progress", body: "Lessons, instantly marked practice, mock exams and an AI tutor, with progress you can see." };

/** "How it works" steps for the current AI switch. */
export function howItWorksSteps(aiEnabled: boolean): readonly { title: string; body: string }[] {
  return aiEnabled ? [...HOW_IT_WORKS_STEPS.slice(0, -1), PRACTISE_STEP_WITH_AI] : HOW_IT_WORKS_STEPS;
}

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
