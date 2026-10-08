import type { TutorQuota, TutorRequestMode, TutorTurnModeWire } from "@/server/tutor/protocol";

/**
 * UI copy for the AI tutor (§14, §15). Labels and generic prompts only: no educational content (CLAUDE.md rule 5),
 * no model ids, prices or limits (those come from the server).
 */

export interface ModeChip {
  mode: TutorRequestMode;
  label: string;
  /** Short helper shown to screen readers and as a tooltip-free hint. */
  description: string;
}

/** The mode chips, "Teach me" first (the default pedagogy, §14). */
export const MODE_CHIPS: readonly ModeChip[] = [
  { mode: "TEACH", label: "Teach me", description: "Step by step, with questions to try" },
  { mode: "HINT", label: "Hint", description: "Just the next step" },
  { mode: "CHECK_WORK", label: "Check my working", description: "Paste your working to find the first mistake" },
  { mode: "ANSWER", label: "Give me the answer", description: "The full worked solution" },
];

/** Shown while "Give me the answer" is selected (§15: the answer mode still explains). */
export const ANSWER_MODE_NOTE =
  "You'll get the full worked solution. Understanding each step is what earns marks in the exam, so read it through and then try a similar question yourself.";

export const AI_DISCLAIMER = "AI tutor: can make mistakes. Check important answers against your lessons or with your teacher.";

/** A short caption above an answer, e.g. "Hint 2 of 4"; null when nothing useful to say. */
export function turnModeCaption(mode: TutorTurnModeWire | null, hintLevel: number | null): string | null {
  switch (mode) {
    case "ANSWER":
      return "Full worked solution";
    case "CHECK_WORK":
      return "Checking your working";
    case "HINT":
    case "TEACH":
      return hintLevel !== null && hintLevel > 0 ? `${mode === "HINT" ? "Hint" : "Step"} ${hintLevel} of 4` : null;
    default:
      return null;
  }
}

/** "3 of 30 messages left today"; null for unlimited plans. */
export function quotaText(quota: TutorQuota | null): string | null {
  if (quota === null) return null;
  const noun = quota.limit === 1 ? "message" : "messages";
  return `${quota.remaining} of ${quota.limit} ${noun} left today`;
}

/** Generic conversation starters for the empty chat (no subject matter is hard-coded). */
export function startersFor(context: { hasQuestion: boolean; hasTopic: boolean; hasSubject: boolean }): string[] {
  if (context.hasQuestion) {
    return ["Explain this question step by step", "Why was my answer wrong?", "Give me a hint to get started", "Give me a similar question to practise"];
  }
  if (context.hasTopic) {
    return [
      "Explain this topic from the beginning",
      "What are the key ideas I need to know?",
      "Give me a practice question to try",
      "What mistakes do students often make here?",
    ];
  }
  if (context.hasSubject) {
    return ["Explain a topic I'm stuck on", "Quiz me with a few short questions", "How should I revise for this subject?"];
  }
  return ["Explain a topic I'm stuck on", "Quiz me with a few short questions", "Help me plan my revision this week"];
}

/** Friendly replacement text for an answer the model declined to give (the stored text is empty). */
export const REFUSED_COPY =
  "I can't help with that one. Let's get back to your studies: ask me about a topic or a question you're working on.";

export const NETWORK_ERROR_COPY = "We couldn't reach the tutor. Check your connection and try again.";
