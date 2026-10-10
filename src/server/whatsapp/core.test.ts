import { describe, expect, it } from "vitest";
import type { StudentQuestionView } from "@/lib/questions";
import type { AnswerFeedback } from "@/server/attempts";
import { answerButtonId, isDailyQuestionRequest, isStorableCommandForUnlinked, parseCommand, subjectHintOf } from "./commands";
import { latexToUnicode } from "./latex";
import { fromStoredMessage, outboundPayloadSchema, requestAsText, toSendRequest, toStoredMessage } from "./messages";
import { parseWebhookPayload } from "./payload";
import { decideDelivery, guardianConsentAllows, isOptedIn, isOptedOut, isWithinServiceWindow, nextOutboundStatus } from "./policy";
import { DEFAULT_FOLLOW_UP, formatExplanation, helpMessage, MAX_EXPLANATION_CHARS, renderFeedback, renderQuestion, renderStreak } from "./render";
import { toEngineResponse } from "./router";
import { checkSubscription, computeSignature, verifySignature } from "./signature";
import { markdownToWhatsApp, toWhatsAppText, truncateText } from "./text";

const ATTEMPT = "0199b0a2-1111-7000-8000-000000000001";

describe("webhook signature (X-Hub-Signature-256)", () => {
  const secret = "app-secret-for-tests";
  const body = '{"object":"whatsapp_business_account","entry":[]}';

  it("accepts the HMAC-SHA256 of the exact raw bytes and nothing else", () => {
    const header = computeSignature(Buffer.from(body), secret);
    expect(header).toMatch(/^sha256=[0-9a-f]{64}$/);
    expect(verifySignature(Buffer.from(body), header, secret)).toBe(true);
    expect(verifySignature(Buffer.from(body), header.toUpperCase().replace("SHA256=", "sha256="), secret)).toBe(true);
    // Same JSON, different bytes (re-serialised) -> rejected: the check is over the raw body.
    expect(verifySignature(Buffer.from(JSON.stringify(JSON.parse(body), null, 2)), header, secret)).toBe(false);
    expect(verifySignature(Buffer.from(body), computeSignature(Buffer.from(body), "other-secret"), secret)).toBe(false);
    expect(verifySignature(Buffer.from(body), null, secret)).toBe(false);
    expect(verifySignature(Buffer.from(body), "sha1=abc", secret)).toBe(false);
    expect(verifySignature(Buffer.from(body), header, "")).toBe(false);
  });

  it("checks the subscription handshake in constant time and only echoes a safe challenge", () => {
    const params = (extra: Record<string, string>) => new URLSearchParams({ "hub.mode": "subscribe", "hub.verify_token": "verify-me", "hub.challenge": "1158201444", ...extra });
    expect(checkSubscription(params({}), "verify-me")).toEqual({ ok: true, challenge: "1158201444" });
    expect(checkSubscription(params({ "hub.verify_token": "wrong" }), "verify-me")).toEqual({ ok: false });
    expect(checkSubscription(params({ "hub.mode": "unsubscribe" }), "verify-me")).toEqual({ ok: false });
    expect(checkSubscription(params({ "hub.challenge": "<script>" }), "verify-me")).toEqual({ ok: false });
    expect(checkSubscription(params({}), "")).toEqual({ ok: false });
  });
});

describe("parseWebhookPayload", () => {
  const value = (fields: Record<string, unknown>) => ({
    object: "whatsapp_business_account",
    entry: [{ id: "WABA", changes: [{ field: "messages", value: { messaging_product: "whatsapp", metadata: { phone_number_id: "123" }, ...fields } }] }],
  });

  it("reads text, button and list replies, never the contact profile", () => {
    const parsed = parseWebhookPayload(
      value({
        contacts: [{ profile: { name: "Private Name" }, wa_id: "263771234567" }],
        messages: [
          { from: "263771234567", id: "wamid.1", timestamp: "1790000000", type: "text", text: { body: "Give me today's study question" } },
          { from: "263771234567", id: "wamid.2", timestamp: "1790000001", type: "interactive", interactive: { type: "button_reply", button_reply: { id: "cmd:question", title: "Today's question" } } },
          { from: "263771234567", id: "wamid.3", timestamp: "1790000002", type: "interactive", interactive: { type: "list_reply", list_reply: { id: "a:x:1:B", title: "B" } } },
          { from: "263771234567", id: "wamid.4", timestamp: "1790000003", type: "image", image: { id: "media-1" } },
          { from: "not-a-number", id: "wamid.5", timestamp: "1", type: "text", text: { body: "x" } },
        ],
      }),
    );
    expect(parsed.relevant).toBe(true);
    expect(parsed.invalid).toBe(1);
    expect(parsed.messages.map((m) => [m.externalMessageId, m.from, m.type, m.text, m.reply?.id ?? null])).toEqual([
      ["wamid.1", "+263771234567", "text", "Give me today's study question", null],
      ["wamid.2", "+263771234567", "interactive", "Today's question", "cmd:question"],
      ["wamid.3", "+263771234567", "interactive", "B", "a:x:1:B"],
      ["wamid.4", "+263771234567", "image", null, null],
    ]);
    expect(parsed.messages[0]?.sentAt.toISOString()).toBe(new Date(1_790_000_000_000).toISOString());
    expect(JSON.stringify(parsed)).not.toContain("Private Name");
  });

  it("reads delivery receipts and ignores other objects", () => {
    const parsed = parseWebhookPayload(
      value({
        statuses: [
          { id: "wamid.out", status: "delivered", timestamp: "1790000100", recipient_id: "263771234567", pricing: { category: "service" } },
          { id: "wamid.bad", status: "failed", timestamp: "1790000101", errors: [{ code: 131047, title: "Re-engagement message" }] },
        ],
      }),
    );
    expect(parsed.statuses).toEqual([
      expect.objectContaining({ externalMessageId: "wamid.out", status: "delivered", pricingCategory: "service", errorCode: null }),
      expect.objectContaining({ externalMessageId: "wamid.bad", status: "failed", errorCode: 131047, errorTitle: "Re-engagement message" }),
    ]);
    expect(parseWebhookPayload({ object: "page", entry: [] }).relevant).toBe(false);
    expect(parseWebhookPayload("garbage").relevant).toBe(false);
  });
});

describe("parseCommand", () => {
  const choice4 = { kind: "choice" as const, optionCount: 4, multiple: false };

  it("recognises daily-question requests, with or without a subject", () => {
    for (const text of ["Give me today's study question", "QUESTION", "daily", "quiz", "Today's question please", "send me a question", "another question", "Can I have today's question?"]) {
      expect(parseCommand({ text }), text).toEqual({ kind: "dailyQuestion", subjectHint: null });
    }
    expect(parseCommand({ text: "question biology" })).toEqual({ kind: "dailyQuestion", subjectHint: "biology" });
    expect(parseCommand({ text: "give me a maths question" })).toEqual({ kind: "dailyQuestion", subjectHint: "maths" });
    expect(isDailyQuestionRequest("what is a question")).toBe(false);
    expect(subjectHintOf("today's question")).toBeNull();
  });

  it("parses explanations, streak, help, stop / start, link", () => {
    expect(parseCommand({ text: "Explain photosynthesis" })).toEqual({ kind: "explain", topic: "photosynthesis" });
    expect(parseCommand({ text: "please explain the water cycle to me?" })).toEqual({ kind: "explain", topic: "the water cycle" });
    expect(parseCommand({ text: "What is osmosis?" })).toEqual({ kind: "explain", topic: "osmosis" });
    expect(parseCommand({ text: "what does photosynthesis mean" })).toEqual({ kind: "explain", topic: "photosynthesis" });
    expect(parseCommand({ text: "explain" })).toEqual({ kind: "explain", topic: "" });
    expect(parseCommand({ text: "STREAK" })).toEqual({ kind: "streak" });
    expect(parseCommand({ text: "Hi" })).toEqual({ kind: "help" });
    expect(parseCommand({ text: "STOP" })).toEqual({ kind: "stop" });
    expect(parseCommand({ text: "start" })).toEqual({ kind: "start" });
    expect(parseCommand({ text: "link" })).toEqual({ kind: "link" });
    expect(parseCommand({ text: "   " })).toEqual({ kind: "empty" });
    expect(parseCommand({ text: "my sister ate my homework lol" })).toEqual({ kind: "unknown", text: "my sister ate my homework lol" });
  });

  it("parses answers only while a question is waiting", () => {
    expect(parseCommand({ text: "b" }, choice4)).toEqual({ kind: "answer", answer: { kind: "choice", letters: ["B"] } });
    expect(parseCommand({ text: "(C)" }, choice4)).toEqual({ kind: "answer", answer: { kind: "choice", letters: ["C"] } });
    expect(parseCommand({ text: "2" }, choice4)).toEqual({ kind: "answer", answer: { kind: "choice", letters: ["B"] } });
    expect(parseCommand({ text: "E" }, choice4)).toEqual({ kind: "unparsedAnswer" });
    expect(parseCommand({ text: "a, c" }, { ...choice4, multiple: true })).toEqual({ kind: "answer", answer: { kind: "choice", letters: ["A", "C"] } });
    expect(parseCommand({ text: "Yes" }, { kind: "boolean", optionCount: 2, multiple: false })).toEqual({ kind: "answer", answer: { kind: "boolean", value: true } });
    expect(parseCommand({ text: "false" }, { kind: "boolean", optionCount: 2, multiple: false })).toEqual({ kind: "answer", answer: { kind: "boolean", value: false } });
    expect(parseCommand({ text: "Oxygen" }, { kind: "text", optionCount: 0, multiple: false })).toEqual({ kind: "answer", answer: { kind: "text", text: "Oxygen" } });
    expect(parseCommand({ text: "skip" }, choice4)).toEqual({ kind: "skip" });
    // Commands still win while waiting.
    expect(parseCommand({ text: "help" }, choice4)).toEqual({ kind: "help" });
    expect(parseCommand({ text: "B" })).toEqual({ kind: "strayAnswer" });
  });

  it("reads tapped buttons before the text", () => {
    expect(parseCommand({ text: "Today's question", replyId: "cmd:question" })).toEqual({ kind: "dailyQuestion", subjectHint: null });
    expect(parseCommand({ text: "B", replyId: answerButtonId(ATTEMPT, 1, "B") })).toEqual({ kind: "buttonAnswer", attemptId: ATTEMPT, position: 1, choice: "B" });
    expect(parseCommand({ text: "True", replyId: answerButtonId(ATTEMPT, 1, "T") })).toMatchObject({ kind: "buttonAnswer", choice: "T" });
  });

  it("stores only short commands for unlinked numbers", () => {
    expect(isStorableCommandForUnlinked("HELP")).toBe(true);
    expect(isStorableCommandForUnlinked("stop")).toBe(true);
    expect(isStorableCommandForUnlinked("My name is Rudo and I live in Mbare")).toBe(false);
    expect(isStorableCommandForUnlinked(null)).toBe(false);
  });
});

describe("LaTeX and Markdown to WhatsApp text", () => {
  it("converts simple maths to Unicode and refuses what text cannot show", () => {
    expect(latexToUnicode("x^2 - 5x + 6 = 0")).toBe("x² - 5x + 6 = 0");
    expect(latexToUnicode("\\frac{1}{2} mv^2")).toBe("½ mv²");
    expect(latexToUnicode("\\frac{a+b}{c}")).toBe("(a+b)/c");
    expect(latexToUnicode("\\sqrt{x+1} \\times \\pi r^2")).toBe("√(x+1) × π r²");
    expect(latexToUnicode("H_2O \\rightarrow 2H^+")).toBe("H₂O → 2H⁺");
    expect(latexToUnicode("90^\\circ \\leq \\theta")).toBe("90° ≤ θ");
    expect(latexToUnicode("\\text{speed} = \\dfrac{d}{t}")).toBe("speed = d/t");
    expect(latexToUnicode("\\left( x \\right)^{-1}")).toBe("( x )⁻¹");
    expect(latexToUnicode("10^{23}")).toBe("10²³");
    expect(latexToUnicode("x^{y+z}")).toBe("x^(y+z)");
    expect(latexToUnicode("\\begin{pmatrix} 1 & 0 \\end{pmatrix}")).toBeNull();
    expect(latexToUnicode("\\unknowncommand{x}")).toBeNull();
    expect(latexToUnicode("{unbalanced")).toBeNull();
  });

  it("projects authored markdown and flags what needs the app", () => {
    expect(toWhatsAppText("Which value of $x$ satisfies $x^2 - 5x + 6 = 0$ and is **even**?")).toEqual({
      text: "Which value of x satisfies x² - 5x + 6 = 0 and is even?",
      complex: false,
    });
    expect(toWhatsAppText("Find $\\begin{vmatrix} a & b \\end{vmatrix}$.").complex).toBe(true);
    expect(toWhatsAppText("Label the diagram ![Cell](asset:0199b0a2-1111-7000-8000-000000000009)").complex).toBe(true);
    expect(toWhatsAppText(null)).toEqual({ text: "", complex: false });
  });

  it("formats model output and truncates at sentence boundaries", () => {
    expect(markdownToWhatsApp("## Key idea\n**Photosynthesis** makes glucose: $6CO_2 + 6H_2O$\n\n\n- light\n- water")).toBe(
      "*Key idea*\n*Photosynthesis* makes glucose: 6CO₂ + 6H₂O\n\n• light\n• water",
    );
    const long = `${"Plants make food. ".repeat(20)}End.`;
    const cut = truncateText(long, 100);
    expect([...cut].length).toBeLessThanOrEqual(100);
    expect(cut.endsWith("…")).toBe(true);
    expect(truncateText("short", 10)).toBe("short");
  });

  it("keeps explanations under 1,000 characters and ends with a follow-up question", () => {
    const link = "http://localhost:3000/app/tutor";
    const withQuestion = formatExplanation("Plants use light to make glucose.\n\nWhat gas do plants take in?", link);
    expect(withQuestion).toContain("What gas do plants take in?");
    expect(withQuestion.endsWith(`More in the app: ${link}`)).toBe(true);
    const noQuestion = formatExplanation("Plants use light to make glucose.", link);
    expect(noQuestion).toContain(DEFAULT_FOLLOW_UP);
    const huge = formatExplanation(`${"Chlorophyll absorbs light energy in the leaf. ".repeat(60)}\n\nWhich pigment absorbs light?`, link);
    expect([...huge].length).toBeLessThanOrEqual(MAX_EXPLANATION_CHARS);
    expect(huge).toContain("Which pigment absorbs light?");
  });
});

describe("channel policy", () => {
  const now = new Date("2026-10-06T10:00:00Z");
  const hoursAgo = (h: number) => new Date(now.getTime() - h * 3_600_000);

  it("applies the 24-hour window, opt-in / opt-out and consent", () => {
    expect(isWithinServiceWindow(hoursAgo(23.9), now)).toBe(true);
    expect(isWithinServiceWindow(hoursAgo(24), now)).toBe(false);
    expect(isWithinServiceWindow(null, now)).toBe(false);
    expect(isOptedOut({ optedInAt: hoursAgo(5), optedOutAt: hoursAgo(1) })).toBe(true);
    expect(isOptedOut({ optedInAt: hoursAgo(1), optedOutAt: hoursAgo(5) })).toBe(false);
    expect(isOptedIn({ optedInAt: hoursAgo(1), optedOutAt: hoursAgo(5) })).toBe(true);
    expect(isOptedIn({ optedInAt: null, optedOutAt: null })).toBe(false);
    expect(guardianConsentAllows({ isMinor: false, guardianConsentStatus: "NOT_REQUIRED" })).toBe(true);
    expect(guardianConsentAllows({ isMinor: true, guardianConsentStatus: "PENDING" })).toBe(false);
    expect(guardianConsentAllows({ isMinor: true, guardianConsentStatus: "GRANTED" })).toBe(true);
    expect(guardianConsentAllows(null)).toBe(false);
  });

  it("decides free-form vs template vs skip", () => {
    const base = { isTemplate: false, hasTemplateFallback: false, windowOpen: true, optedIn: false, optedOut: false, consentOk: true };
    expect(decideDelivery({ ...base, purpose: "reply" })).toEqual({ action: "send" });
    expect(decideDelivery({ ...base, purpose: "reply", windowOpen: false })).toEqual({ action: "skip", reason: "outside_service_window" });
    expect(decideDelivery({ ...base, purpose: "reply", windowOpen: false, hasTemplateFallback: true, optedIn: true })).toEqual({ action: "template" });
    expect(decideDelivery({ ...base, purpose: "proactive" })).toEqual({ action: "skip", reason: "not_opted_in" });
    expect(decideDelivery({ ...base, purpose: "proactive", optedIn: true, optedOut: true })).toEqual({ action: "skip", reason: "opted_out" });
    expect(decideDelivery({ ...base, purpose: "proactive", optedIn: true, windowOpen: false, hasTemplateFallback: true })).toEqual({ action: "template" });
    expect(decideDelivery({ ...base, purpose: "proactive", optedIn: true, consentOk: false })).toEqual({ action: "skip", reason: "consent_required" });
    expect(decideDelivery({ ...base, purpose: "otp", windowOpen: false, isTemplate: true })).toEqual({ action: "send" });
  });

  it("moves delivery receipts forward only", () => {
    expect(nextOutboundStatus("SENT", "delivered")).toBe("DELIVERED");
    expect(nextOutboundStatus("DELIVERED", "read")).toBe("READ");
    expect(nextOutboundStatus("READ", "delivered")).toBeNull();
    expect(nextOutboundStatus("SENT", "failed")).toBe("FAILED");
    expect(nextOutboundStatus("DELIVERED", "failed")).toBeNull();
    expect(nextOutboundStatus("FAILED", "delivered")).toBeNull();
  });
});

function mcq(options: number, selectMode: "single" | "multiple" = "single"): StudentQuestionView {
  return {
    id: "0199b0a2-1111-7000-8000-00000000000a",
    type: "MULTIPLE_CHOICE",
    markingMode: "AUTO",
    marks: 1,
    partLabel: null,
    stem: "Which value of $x$ satisfies $x^2 - 5x + 6 = 0$ and is even?",
    stemHtml: null,
    payloadHtml: null,
    interaction: {
      type: "MULTIPLE_CHOICE",
      selectMode,
      options: ["C", "A", "D", "B", "E"].slice(0, options).map((key, index) => ({ key, content: `$x = ${index + 2}$`, mediaAssetId: null, html: null })),
    },
    hintCount: 0,
    calculatorAllowed: null,
    estimatedSeconds: null,
    parts: [],
  };
}

describe("question rendering and answers", () => {
  it("renders an MCQ with reply buttons (≤ 3 options) or a list (4-10)", () => {
    const three = renderQuestion({ question: mcq(3), attemptId: ATTEMPT, position: 1, subjectName: "Mathematics", appLink: "http://x/app/daily" });
    expect(three.awaiting).toEqual({ kind: "choice", optionCount: 3, multiple: false });
    expect(three.optionKeys).toEqual(["C", "A", "D"]);
    expect(three.message.kind).toBe("buttons");
    if (three.message.kind !== "buttons") return;
    expect(three.message.text).toContain("x² - 5x + 6 = 0");
    expect(three.message.text).toContain("*A)* x = 2");
    expect(three.message.buttons.map((b) => b.id)).toEqual([answerButtonId(ATTEMPT, 1, "A"), answerButtonId(ATTEMPT, 1, "B"), answerButtonId(ATTEMPT, 1, "C")]);

    const four = renderQuestion({ question: mcq(4), attemptId: ATTEMPT, position: 1, subjectName: "Mathematics", appLink: "http://x/app/daily" });
    expect(four.message.kind).toBe("list");

    const multi = renderQuestion({ question: mcq(4, "multiple"), attemptId: ATTEMPT, position: 1, subjectName: "Mathematics", appLink: "http://x/app/daily" });
    expect(multi.message.kind).toBe("text");
    expect(multi.awaiting?.multiple).toBe(true);
  });

  it("sends app-only question types with a link and no pending answer", () => {
    const essay: StudentQuestionView = { ...mcq(2), type: "ESSAY", interaction: { type: "ESSAY", wordLimit: null } };
    const rendered = renderQuestion({ question: essay, attemptId: ATTEMPT, position: 1, subjectName: "English", appLink: "http://x/app/daily" });
    expect(rendered.awaiting).toBeNull();
    expect(rendered.message.kind === "text" && rendered.message.text).toContain("http://x/app/daily");
  });

  it("maps letters back to the option keys the student saw", () => {
    expect(toEngineResponse(mcq(4), { kind: "choice", letters: ["B"] })).toEqual({ type: "MULTIPLE_CHOICE", optionKeys: ["A"] });
    expect(toEngineResponse(mcq(4), { kind: "choice", letters: ["A", "B"] })).toBeNull();
    expect(toEngineResponse(mcq(4, "multiple"), { kind: "choice", letters: ["A", "D"] })).toEqual({ type: "MULTIPLE_CHOICE", optionKeys: ["C", "B"] });
    const numerical: StudentQuestionView = { ...mcq(2), type: "NUMERICAL", interaction: { type: "NUMERICAL", unitHint: null, answerPrefix: "x =", expectsWorking: false } };
    expect(toEngineResponse(numerical, { kind: "text", text: "x = 5" })).toEqual({ type: "NUMERICAL", value: "5" });
    expect(toEngineResponse(numerical, { kind: "boolean", value: true })).toBeNull();
  });

  it("renders feedback in the letters shown, with the explanation excerpt and links", () => {
    const feedback = {
      attemptId: ATTEMPT,
      position: 1,
      status: "AUTO_MARKED",
      marksAwarded: 0,
      marksAvailable: 1,
      isCorrect: false,
      alreadyAnswered: false,
      feedback: null,
      notes: [],
      correctAnswerDisplay: "A",
      explanationHtml: null,
      workedSolutionHtml: null,
      conceptHtml: null,
      reveal: {
        questionId: "q",
        partLabel: null,
        correctAnswerDisplay: "A",
        explanation: "Factorise: $(x-2)(x-3) = 0$.",
        workedSolution: null,
        conceptSummary: null,
        relatedLessonId: null,
        html: { explanation: null, workedSolution: null, conceptSummary: null },
        options: [
          { key: "A", isCorrect: true, rationale: null },
          { key: "B", isCorrect: false, rationale: null },
          { key: "C", isCorrect: false, rationale: null },
          { key: "D", isCorrect: false, rationale: null },
        ],
        markScheme: null,
        modelAnswer: null,
        methodMarks: [],
        parts: [],
      },
      topic: { id: "t", name: "Quadratic equations" },
      studyLesson: null,
      mastery: null,
      attemptCompleted: true,
      nextPosition: null,
      result: null,
      selfAssessable: false,
    } as unknown as AnswerFeedback;
    const message = renderFeedback({ feedback, question: mcq(4), appLink: "http://x/app/daily", lessonLink: "http://x/app/lessons/1" });
    expect(message.kind).toBe("text");
    if (message.kind !== "text") return;
    expect(message.text).toContain("*Not quite.*");
    // Key "A" was shown as letter B (options C, A, D, B).
    expect(message.text).toContain("The answer is B) x = 3.");
    expect(message.text).toContain("(x-2)(x-3) = 0");
    expect(message.text).toContain("Study this topic: http://x/app/lessons/1");
  });

  it("renders the help menu and the streak", () => {
    const help = helpMessage("BvunzoHub");
    expect(help.kind === "buttons" && help.buttons.map((b) => b.id)).toEqual(["cmd:question", "cmd:streak"]);
    const streak = renderStreak({ current: 5, longest: 12, status: "AT_RISK", targetMinutes: 30, minutesToday: 12, goalMet: false, appLink: "http://x/app" });
    expect(streak.kind === "text" && streak.text).toContain("*Streak:* 5 days (best 12 days).");
    expect(streak.kind === "text" && streak.text).toContain("30 min, 12 min done so far");
  });
});

describe("stored message model", () => {
  it("round-trips specs through body + payload", () => {
    const spec = { kind: "buttons" as const, text: "Pick", buttons: [{ id: "a", title: "A" }] };
    const stored = toStoredMessage(spec, { purpose: "reply" });
    expect(stored.messageType).toBe("interactive");
    const payload = outboundPayloadSchema.parse(JSON.parse(JSON.stringify(stored.payload)));
    expect(fromStoredMessage(stored.body, payload)).toEqual(spec);
    const template = toStoredMessage({ kind: "template", template: "streakReminder", params: ["5"] }, { purpose: "proactive" });
    expect(template).toMatchObject({ body: null, messageType: "template", templateName: "streak_reminder" });
    expect(toSendRequest({ kind: "template", template: "streakReminder", params: ["5"] })).toEqual({ kind: "template", name: "streak_reminder", language: "en", bodyParams: ["5"] });
    expect(requestAsText({ kind: "buttons", text: "Pick", buttons: [{ id: "a", title: "A" }] })).toBe("Pick\n\n[A]");
  });
});
