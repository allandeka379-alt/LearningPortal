import "server-only";
import type { StudentQuestionView } from "@/lib/questions";
import type { AnswerFeedback } from "@/server/attempts";
import { WHATSAPP_LIMITS } from "@/server/messaging/whatsapp-driver";
import { answerButtonId, letterFor, MENU_BUTTON_IDS, type AwaitingAnswer } from "./commands";
import type { WhatsAppMessageSpec } from "./messages";
import { markdownToWhatsApp, toWhatsAppLine, toWhatsAppText, truncateText } from "./text";

/**
 * WhatsApp message composition (§30): help menu, link instructions, the daily question as text (+ reply buttons or a
 * list), marking feedback, streak, explanations. Deterministic; links are passed in (absolute URLs). Copy is plain,
 * calm and short; `*bold*` is WhatsApp formatting.
 */

const L = WHATSAPP_LIMITS;
/** Interactive bodies are capped at 1,024 characters; longer questions are sent as text with typed answers. */
const MAX_INTERACTIVE_BODY = L.interactiveBody;
export const MAX_EXPLANATION_CHARS = 1_000;
const EXPLANATION_EXCERPT_CHARS = 350;

export function helpMessage(appName: string): WhatsAppMessageSpec {
  return {
    kind: "buttons",
    text: [
      `*${appName} on WhatsApp*`,
      "",
      "Send one of these:",
      "• *QUESTION* for today's study question",
      "• *EXPLAIN photosynthesis* for a short explanation of any topic",
      "• *STREAK* for your streak and today's target",
      "• *STOP* to stop reminders (*START* turns them back on)",
    ].join("\n"),
    buttons: [
      { id: MENU_BUTTON_IDS.question, title: "Today's question" },
      { id: MENU_BUTTON_IDS.streak, title: "My streak" },
    ],
  };
}

export function linkInstructions(appName: string, settingsUrl: string): WhatsAppMessageSpec {
  return {
    kind: "text",
    text: [
      `Hi! This number isn't linked to a ${appName} account yet.`,
      "",
      "To link it:",
      `1. Sign in to ${appName} and open Settings → WhatsApp: ${settingsUrl}`,
      "2. Enter this WhatsApp number.",
      "3. Type in the 6-digit code we send you here.",
      "",
      "Then send QUESTION for today's study question. Send STOP if you don't want messages from us.",
    ].join("\n"),
  };
}

export function relinkMessage(appName: string, settingsUrl: string): WhatsAppMessageSpec {
  return {
    kind: "text",
    text: `For your security, this number was disconnected from your ${appName} account (you signed out everywhere, changed your password or unlinked it). Link it again in Settings → WhatsApp: ${settingsUrl}`,
  };
}

export function consentRequiredMessage(appName: string, familyUrl: string): WhatsAppMessageSpec {
  return {
    kind: "text",
    text: `Study help on WhatsApp starts once a parent or guardian has given consent for your ${appName} account. Ask them to approve it from their parent account: ${familyUrl}`,
  };
}

export function textMessage(text: string): WhatsAppMessageSpec {
  return { kind: "text", text: truncateText(text, L.textBody) };
}

// ---------------------------------------------------------------------------------------------------------------------
// Daily question
// ---------------------------------------------------------------------------------------------------------------------

export interface RenderedQuestion {
  message: WhatsAppMessageSpec;
  /** What a reply is parsed as; `null` when the question must be answered in the app. */
  awaiting: AwaitingAnswer | null;
  /** Option keys in the order shown ("A" = optionKeys[0]); stored in the conversation state. */
  optionKeys: string[];
}

function answerableKind(question: StudentQuestionView): AwaitingAnswer | null {
  const interaction = question.interaction;
  switch (interaction.type) {
    case "MULTIPLE_CHOICE":
      return interaction.options.length > 0 && interaction.options.length <= 10
        ? { kind: "choice", optionCount: interaction.options.length, multiple: interaction.selectMode === "multiple" }
        : null;
    case "TRUE_FALSE":
      return { kind: "boolean", optionCount: 2, multiple: false };
    case "SHORT_ANSWER":
    case "NUMERICAL":
      return { kind: "text", optionCount: 0, multiple: false };
    case "FILL_IN_THE_BLANK":
      return interaction.blanks.length === 1 && interaction.blanks[0]?.input !== "select" ? { kind: "text", optionCount: 0, multiple: false } : null;
    default:
      // Matching, labelling, essays, structured and calculation questions need the app (working, diagrams, parts).
      return null;
  }
}

/** The daily question as a WhatsApp message (pure apart from the plain-text projection). */
export function renderQuestion(input: {
  question: StudentQuestionView;
  attemptId: string;
  position: number;
  subjectName: string;
  appLink: string;
}): RenderedQuestion {
  const { question, attemptId, position } = input;
  const awaiting = answerableKind(question);
  const stem = toWhatsAppText(
    question.interaction.type === "FILL_IN_THE_BLANK"
      ? `${question.stem}\n\n${question.interaction.template.replace(/\{\{blank:[^}]+\}\}/g, "\\_\\_\\_\\_\\_")}`
      : question.stem,
  );
  let complex = stem.complex;
  const header = `*Today's ${input.subjectName} question*`;
  const lines: string[] = [header, "", stem.text];
  const optionKeys: string[] = [];
  const optionTexts: string[] = [];

  if (question.interaction.type === "MULTIPLE_CHOICE") {
    lines.push("");
    question.interaction.options.forEach((option, index) => {
      const label = toWhatsAppLine(option.content);
      complex ||= label.complex || option.mediaAssetId !== null;
      const text = label.text || "(picture)";
      optionKeys.push(option.key);
      optionTexts.push(text);
      lines.push(`*${letterFor(index)})* ${text}`);
    });
  }
  if (question.interaction.type === "NUMERICAL" && question.interaction.unitHint) lines.push("", `Give your answer in ${question.interaction.unitHint}.`);

  if (!awaiting) {
    lines.push("", `This question needs the app to answer. Open it here: ${input.appLink}`);
    return { message: textMessage(lines.join("\n")), awaiting: null, optionKeys };
  }
  if (complex) lines.push("", `See the equations and pictures in the app: ${input.appLink}`);

  const instruction =
    awaiting.kind === "choice"
      ? awaiting.multiple
        ? `Reply with every correct letter, e.g. "A C".`
        : optionKeys.length <= L.maxButtons
          ? "Tap your answer."
          : `Reply with ${optionKeys.slice(0, -1).map((_, i) => letterFor(i)).join(", ")} or ${letterFor(optionKeys.length - 1)}, or tap "Choose answer".`
      : awaiting.kind === "boolean"
        ? "Tap your answer."
        : "Reply with your answer.";
  lines.push("", instruction, "Send SKIP to leave it for now.");
  const body = lines.join("\n");

  if (awaiting.kind === "boolean" && question.interaction.type === "TRUE_FALSE" && body.length <= MAX_INTERACTIVE_BODY) {
    const yesNo = question.interaction.statementStyle === "yes_no";
    return {
      message: {
        kind: "buttons",
        text: body,
        buttons: [
          { id: answerButtonId(attemptId, position, "T"), title: yesNo ? "Yes" : "True" },
          { id: answerButtonId(attemptId, position, "F"), title: yesNo ? "No" : "False" },
        ],
      },
      awaiting,
      optionKeys,
    };
  }
  if (awaiting.kind === "choice" && !awaiting.multiple && body.length <= MAX_INTERACTIVE_BODY) {
    if (optionKeys.length <= L.maxButtons) {
      return {
        message: {
          kind: "buttons",
          text: body,
          buttons: optionKeys.map((_, index) => ({ id: answerButtonId(attemptId, position, letterFor(index)), title: letterFor(index) })),
        },
        awaiting,
        optionKeys,
      };
    }
    return {
      message: {
        kind: "list",
        text: body,
        buttonText: "Choose answer",
        rows: optionTexts.map((text, index) => ({
          id: answerButtonId(attemptId, position, letterFor(index)),
          title: letterFor(index),
          description: truncateText(text, L.listRowDescription),
        })),
      },
      awaiting,
      optionKeys,
    };
  }
  return { message: textMessage(body), awaiting, optionKeys };
}

// ---------------------------------------------------------------------------------------------------------------------
// Feedback
// ---------------------------------------------------------------------------------------------------------------------

/** "B) x = 2" for the correct option(s), in the letters the student saw. */
function correctOptionLabel(feedback: AnswerFeedback, question: StudentQuestionView): string | null {
  if (question.interaction.type !== "MULTIPLE_CHOICE" || !feedback.reveal) return null;
  const correctKeys = new Set(feedback.reveal.options.filter((option) => option.isCorrect).map((option) => option.key));
  const labels = question.interaction.options.flatMap((option, index) =>
    correctKeys.has(option.key) ? [`${letterFor(index)}) ${toWhatsAppLine(option.content).text}`] : [],
  );
  return labels.length > 0 ? labels.join("; ") : null;
}

export function renderFeedback(input: {
  feedback: AnswerFeedback;
  question: StudentQuestionView;
  appLink: string;
  lessonLink: string | null;
}): WhatsAppMessageSpec {
  const { feedback, question } = input;
  if (feedback.status === "PENDING" || (feedback.isCorrect === null && feedback.marksAwarded === null)) {
    return textMessage(`Thanks, your answer is saved and will be marked shortly. See the result in the app: ${input.appLink}`);
  }
  const lines: string[] = [];
  if (feedback.alreadyAnswered) lines.push("You've already answered this question.", "");
  const full = feedback.marksAwarded !== null && feedback.marksAwarded >= feedback.marksAvailable;
  const partial = !full && (feedback.marksAwarded ?? 0) > 0;
  lines.push(full || feedback.isCorrect === true ? "*Correct!* Well done." : partial ? `*Partly right:* ${feedback.marksAwarded}/${feedback.marksAvailable} marks.` : "*Not quite.*");

  const correct = correctOptionLabel(feedback, question) ?? (feedback.correctAnswerDisplay ? toWhatsAppLine(feedback.correctAnswerDisplay).text : null);
  if (correct && !(full || feedback.isCorrect === true)) lines.push(`The answer is ${correct}.`);
  for (const note of feedback.notes.slice(0, 2)) lines.push(toWhatsAppLine(note).text);

  const explanation = toWhatsAppText(feedback.reveal?.explanation ?? null);
  if (explanation.text) lines.push("", `*Why:* ${truncateText(explanation.text.replace(/\n{2,}/g, "\n"), EXPLANATION_EXCERPT_CHARS)}`);
  if (feedback.topic) lines.push("", `Topic: ${feedback.topic.name}`);
  if (input.lessonLink) lines.push(`Study this topic: ${input.lessonLink}`);
  lines.push(`Full solution: ${input.appLink}`, "", "Send QUESTION for another subject's question or STREAK to see your streak.");
  return textMessage(lines.join("\n"));
}

// ---------------------------------------------------------------------------------------------------------------------
// Streak, explanations
// ---------------------------------------------------------------------------------------------------------------------

export function renderStreak(input: {
  current: number;
  longest: number;
  status: "INACTIVE" | "AT_RISK" | "DONE_TODAY";
  targetMinutes: number;
  minutesToday: number;
  goalMet: boolean;
  appLink: string;
}): WhatsAppMessageSpec {
  const days = (n: number) => `${n} day${n === 1 ? "" : "s"}`;
  const streakLine =
    input.current > 0
      ? `*Streak:* ${days(input.current)} (best ${days(Math.max(input.longest, input.current))}).`
      : `*Streak:* none yet. Study today to start one.`;
  const statusLine =
    input.status === "DONE_TODAY"
      ? "You've studied today. Nice work."
      : input.current > 0
        ? "Study today to keep it going."
        : "";
  const targetLine = input.goalMet
    ? `*Today's target:* ${input.targetMinutes} min. Done!`
    : `*Today's target:* ${input.targetMinutes} min, ${input.minutesToday} min done so far.`;
  return textMessage([streakLine, statusLine, targetLine, "", `Send QUESTION for today's question. Dashboard: ${input.appLink}`].filter((line, i) => line !== "" || i === 3).join("\n"));
}

/** Default follow-up when the model's explanation does not end with a question. */
export const DEFAULT_FOLLOW_UP = "Can you explain it back in one sentence?";

/**
 * Formats an AI explanation for WhatsApp (pure): WhatsApp formatting, maths as Unicode, at most
 * {@link MAX_EXPLANATION_CHARS} characters INCLUDING the closing follow-up question and the app link.
 */
export function formatExplanation(text: string, link: string): string {
  const tail = `\n\nMore in the app: ${link}`;
  let body = markdownToWhatsApp(text);
  const budget = MAX_EXPLANATION_CHARS - [...tail].length;
  const endsWithQuestion = /\?\s*$/.test(body);
  if (!endsWithQuestion) {
    body = `${truncateText(body, budget - DEFAULT_FOLLOW_UP.length - 2)}\n\n${DEFAULT_FOLLOW_UP}`;
  } else if ([...body].length > budget) {
    // Keep the closing question: cut the middle, not the end.
    const lastBreak = Math.max(body.lastIndexOf("\n"), body.lastIndexOf(". "));
    const question = lastBreak > 0 ? body.slice(lastBreak + 1).trim() : DEFAULT_FOLLOW_UP;
    const kept = question.length < budget / 2 ? question : DEFAULT_FOLLOW_UP;
    body = `${truncateText(body.slice(0, lastBreak > 0 ? lastBreak : body.length), budget - kept.length - 2)}\n\n${kept}`;
  }
  return `${body}${tail}`;
}
