/**
 * Pure helpers that build student responses for the question inputs. Every function returns a value that parses with
 * the matching schema in `@/lib/questions/response` (unit tested), or `null` for "no answer yet" — the inputs never
 * emit empty shells such as `{ optionKeys: [] }`, so "Check answer" can simply test for `null`.
 *
 * Isomorphic and dependency-free (type imports only), so it adds nothing to client bundles but the functions.
 */
import type { MarkingStatus } from "@/generated/prisma/enums";
import type { PartResponse, QuestionResponse, ResponseFor } from "@/lib/questions/response";
import type { FeedbackOutcome, PresentedQuestion } from "./types";

type Mcq = ResponseFor<"MULTIPLE_CHOICE">;
type Matching = ResponseFor<"MATCHING">;
type Blanks = ResponseFor<"FILL_IN_THE_BLANK">;
type Labels = ResponseFor<"DIAGRAM_LABELLING">;
type Structured = ResponseFor<"STRUCTURED">;
type TextType = "SHORT_ANSWER" | "ESSAY" | "EXTENDED_RESPONSE";
type NumericType = "NUMERICAL" | "CALCULATION";

/** The response when it has the given type, else null (a saved answer of another shape is ignored). */
export function responseOfType<T extends QuestionResponse["type"]>(
  response: QuestionResponse | PartResponse | null | undefined,
  type: T,
): ResponseFor<T> | null {
  return response && response.type === type ? (response as ResponseFor<T>) : null;
}

/** Orders `ids` by their index in `order` (unknown ids last, stable). */
function byOrder<T>(items: T[], id: (item: T) => string, order: readonly string[]): T[] {
  const rank = new Map(order.map((value, index) => [value, index]));
  return [...items].sort((a, b) => (rank.get(id(a)) ?? Number.MAX_SAFE_INTEGER) - (rank.get(id(b)) ?? Number.MAX_SAFE_INTEGER));
}

// ---------------------------------------------------------------------------------------------------------------------
// Selected response
// ---------------------------------------------------------------------------------------------------------------------

/** MULTIPLE_CHOICE (single): the chosen option. */
export function chooseOption(key: string): Mcq {
  return { type: "MULTIPLE_CHOICE", optionKeys: [key] };
}

/** MULTIPLE_CHOICE (multiple): toggles one option; keys stay in display order; nothing selected → null. */
export function toggleOption(current: Mcq | null, key: string, checked: boolean, displayOrder: readonly string[]): Mcq | null {
  const keys = new Set(current?.optionKeys ?? []);
  if (checked) keys.add(key);
  else keys.delete(key);
  if (keys.size === 0) return null;
  return { type: "MULTIPLE_CHOICE", optionKeys: byOrder([...keys], (k) => k, displayOrder) };
}

export function trueFalse(value: boolean): ResponseFor<"TRUE_FALSE"> {
  return { type: "TRUE_FALSE", value };
}

// ---------------------------------------------------------------------------------------------------------------------
// Text and numbers
// ---------------------------------------------------------------------------------------------------------------------

/** SHORT_ANSWER / ESSAY / EXTENDED_RESPONSE: the text as typed; an empty box → null. */
export function textResponse<T extends TextType>(type: T, text: string): ResponseFor<T> | null {
  if (text === "") return null;
  return { type, text } as ResponseFor<T>;
}

export interface NumericFields {
  value: string;
  unit?: string;
  working?: string;
}

/**
 * NUMERICAL / CALCULATION. When the question shows a unit next to the box (`unitHint`), the answer is in that unit
 * and it is recorded as the response unit; otherwise the optional unit field is used. Empty value and working → null.
 */
export function numericResponse<T extends NumericType>(type: T, fields: NumericFields, unitHint: string | null): ResponseFor<T> | null {
  const value = fields.value;
  const working = fields.working ?? "";
  if (value.trim() === "" && working.trim() === "") return null;
  const unit = unitHint ?? (fields.unit && fields.unit.trim() !== "" ? fields.unit : undefined);
  return {
    type,
    value,
    ...(unit !== undefined && value.trim() !== "" ? { unit } : {}),
    ...(working !== "" ? { working } : {}),
  } as ResponseFor<T>;
}

/** The fields of a saved numeric response (for controlled inputs). */
export function numericFields(response: ResponseFor<NumericType> | null): Required<NumericFields> {
  return { value: response?.value ?? "", unit: response?.unit ?? "", working: response?.working ?? "" };
}

// ---------------------------------------------------------------------------------------------------------------------
// Pairing and blanks
// ---------------------------------------------------------------------------------------------------------------------

/** MATCHING: sets (or with "" clears) the match of one left item; pairs follow the left column order. */
export function setMatchingPair(current: Matching | null, leftId: string, rightId: string, leftOrder: readonly string[]): Matching | null {
  const pairs = (current?.pairs ?? []).filter((pair) => pair.leftId !== leftId);
  if (rightId !== "") pairs.push({ leftId, rightId });
  if (pairs.length === 0) return null;
  return { type: "MATCHING", pairs: byOrder(pairs, (p) => p.leftId, leftOrder) };
}

export function matchedRight(current: Matching | null, leftId: string): string {
  return current?.pairs.find((pair) => pair.leftId === leftId)?.rightId ?? "";
}

/** FILL_IN_THE_BLANK: sets one blank's text; empty blanks are left out; all empty → null. */
export function setBlank(current: Blanks | null, blankId: string, text: string, blankOrder: readonly string[]): Blanks | null {
  const blanks = (current?.blanks ?? []).filter((blank) => blank.blankId !== blankId);
  if (text !== "") blanks.push({ blankId, text });
  if (blanks.length === 0) return null;
  return { type: "FILL_IN_THE_BLANK", blanks: byOrder(blanks, (b) => b.blankId, blankOrder) };
}

export function blankText(current: Blanks | null, blankId: string): string {
  return current?.blanks.find((blank) => blank.blankId === blankId)?.text ?? "";
}

/** DIAGRAM_LABELLING: word-bank choice (`labelId`) or free text (`text`) for one hotspot; empty → removed. */
export function setDiagramLabel(
  current: Labels | null,
  targetId: string,
  value: { labelId: string } | { text: string },
  hotspotOrder: readonly string[],
): Labels | null {
  const labels = (current?.labels ?? []).filter((label) => label.targetId !== targetId);
  if ("labelId" in value && value.labelId !== "") labels.push({ targetId, labelId: value.labelId });
  if ("text" in value && value.text !== "") labels.push({ targetId, text: value.text });
  if (labels.length === 0) return null;
  return { type: "DIAGRAM_LABELLING", labels: byOrder(labels, (l) => l.targetId, hotspotOrder) };
}

export function diagramLabelOf(current: Labels | null, targetId: string): { labelId: string; text: string } {
  const entry = current?.labels.find((label) => label.targetId === targetId);
  return { labelId: entry?.labelId ?? "", text: entry?.text ?? "" };
}

// ---------------------------------------------------------------------------------------------------------------------
// Structured questions
// ---------------------------------------------------------------------------------------------------------------------

/** Ids of the answerable (leaf) parts of a STRUCTURED question, in order ("(b)(i)" before "(c)"). */
export function leafPartIds(question: Pick<PresentedQuestion, "parts">): string[] {
  return question.parts.flatMap((part) => (part.parts.length > 0 ? leafPartIds(part) : [part.id]));
}

/** The typed response of one part inside a STRUCTURED response. */
export function partResponseOf(current: Structured | null, partId: string): PartResponse | null {
  return current?.parts.find((entry) => entry.partId === partId)?.response ?? null;
}

/**
 * STRUCTURED: sets one part's typed response (the `{ partId, response }` entry form, see `partEntryToResponse`);
 * a cleared part is removed; no parts answered → null.
 */
export function setPartResponse(current: Structured | null, partId: string, response: PartResponse | null, partOrder: readonly string[]): Structured | null {
  const parts = (current?.parts ?? []).filter((entry) => entry.partId !== partId);
  if (response !== null) parts.push({ partId, response });
  if (parts.length === 0) return null;
  return { type: "STRUCTURED", parts: byOrder(parts, (p) => p.partId, partOrder) };
}

// ---------------------------------------------------------------------------------------------------------------------
// Feedback classification
// ---------------------------------------------------------------------------------------------------------------------

/** Maps a marking state onto what the student is told (correct / partly correct / incorrect / waiting). */
export function feedbackOutcome(input: {
  status: MarkingStatus;
  marksAwarded: number | null;
  marksAvailable: number;
  isCorrect: boolean | null;
}): FeedbackOutcome {
  switch (input.status) {
    case "PENDING":
      return "pending";
    case "NEEDS_REVIEW":
      return "review";
    case "UNANSWERED":
      return "unanswered";
    default:
      break;
  }
  if (input.isCorrect === true) return "correct";
  if (input.marksAwarded !== null && input.marksAvailable > 0 && input.marksAwarded >= input.marksAvailable) return "correct";
  if (input.marksAwarded !== null && input.marksAwarded > 0) return "partial";
  return "incorrect";
}

/** "1 mark" / "3 marks". */
export function marksText(marks: number): string {
  return `${marks} ${marks === 1 ? "mark" : "marks"}`;
}
