/**
 * NUMERICAL marking, and the numeric assessment reused by CALCULATION.
 *
 * Policies:
 * - What the box already shows: a leading copy of the payload's `answerPrefix` ("x =", "US$", "×") and, when no units
 *   are configured, a trailing copy of its `unitHint` (": 1") are removed before reading (`stripAnswerAffixes`), so a
 *   student who types "x = 5" or "12:1" is not marked wrong for repeating the box's own text.
 * - Reading the number: `parseNumberInput` (thousands separators "1,234.5" / "1 234.5", scientific notation
 *   "3.2e4" / "3.2×10^4", fractions "3/4"); a decimal comma ("1,5") is AMBIGUOUS → NEEDS_REVIEW (never guessed,
 *   never failed outright); anything else unreadable → 0 marks. A unit typed into the value ("60 km/h") is split off
 *   when the unit field is empty.
 * - Units (`answerSpec.units`): the unit is matched against accepted spellings, then conversions (the converted value
 *   is what is checked). A missing unit when `required`, or an unrecognised unit, costs `penaltyMarks` (default 1) but
 *   the value is still checked as written. Without `answerSpec.units` any unit is ignored.
 * - Value: `withinTolerance(value, expected, tolerance)` (exact up to float noise when no tolerance).
 * - Precision (`sigFigs`, `decimalPlaces`): full marks require the value within tolerance AND the precision met (as
 *   written: `60` is 1–2 s.f., `60.0` is 3). When the value is right but the precision is not, the student loses
 *   `precisionPenaltyMarks`, or ALL the marks when no penalty is configured. Fractions never meet a precision rule.
 * - Marks: value wrong → 0; value right → marks − unit penalty − precision penalty, floored at 0.
 */
import {
  formatCorrectAnswer,
  isBlankText,
  matchUnit,
  numberParseMessage,
  parseNumberInput,
  splitNumberAndUnit,
  stripAnswerAffixes,
  withinTolerance,
  type MarkingMode,
  type NumberParseResult,
  type NumericalSpec,
  type ResponseFor,
} from "@/lib/questions";
import { buildResult, unanswered } from "./result";
import type { MarkingFeedback, MarkingFlag, MarkingResult } from "./types";

export interface NumericAssessment {
  /** False when no number was given (blank value). */
  answered: boolean;
  parse: NumberParseResult;
  /** The value (after unit conversion) is within tolerance. */
  valueCorrect: boolean;
  /** Value correct and no penalty applied. */
  fullyCorrect: boolean;
  /** Whole marks earned out of `maxMarks`. */
  awarded: number;
  flags: MarkingFlag[];
  notes: string[];
}

type NumericResponse = Pick<ResponseFor<"NUMERICAL">, "value" | "unit">;

/** The text shown around a NUMERICAL / CALCULATION answer box (from the question payload). */
export interface NumericAffixes {
  answerPrefix?: string | null;
  unitHint?: string | null;
}

/** The affixes of a NUMERICAL / CALCULATION payload (null payloads show none). */
export function numericAffixes(payload: { answerPrefix?: string | undefined; unitHint?: string | undefined } | null | undefined): NumericAffixes {
  return { answerPrefix: payload?.answerPrefix ?? null, unitHint: payload?.unitHint ?? null };
}

/** Assesses the final answer of a NUMERICAL / CALCULATION response against `spec`, out of `maxMarks`. Pure. */
export function assessNumericAnswer(spec: NumericalSpec, response: NumericResponse, maxMarks: number, affixes: NumericAffixes = {}): NumericAssessment {
  const flags: MarkingFlag[] = [];
  const notes: string[] = [];
  // With units configured, a typed unit is split off and checked below, so only the prefix is stripped here.
  let valueText = stripAnswerAffixes(response.value, { prefix: affixes.answerPrefix, suffix: spec.units ? null : affixes.unitHint });
  let unitText = response.unit ?? "";
  const split = splitNumberAndUnit(valueText);
  valueText = split.number;
  if (isBlankText(unitText)) unitText = split.unit;

  const parse = parseNumberInput(valueText);
  const result = (valueCorrect: boolean, awarded: number, fullyCorrect = false): NumericAssessment => ({
    answered: !(parse.ok === false && parse.reason === "EMPTY"),
    parse,
    valueCorrect,
    fullyCorrect,
    awarded,
    flags,
    notes,
  });
  if (!parse.ok) {
    if (parse.reason !== "EMPTY") {
      flags.push(parse.reason === "AMBIGUOUS_DECIMAL_COMMA" ? "NUMBER_AMBIGUOUS" : "NUMBER_INVALID");
      notes.push(numberParseMessage(parse.reason));
    }
    return result(false, 0);
  }

  let value = parse.number.value;
  let unitPenalty = 0;
  if (spec.units) {
    const penalty = Math.min(spec.units.penaltyMarks ?? 1, maxMarks);
    if (isBlankText(unitText)) {
      if (spec.units.required) {
        unitPenalty = penalty;
        flags.push("UNIT_MISSING");
        notes.push(`Include the unit (${spec.units.accepted[0] ?? ""}).`);
      }
    } else {
      const match = matchUnit(unitText, spec.units.accepted, spec.units.conversions ?? []);
      if (!match) {
        unitPenalty = penalty;
        flags.push("UNIT_WRONG");
        notes.push(`The unit should be ${spec.units.accepted[0] ?? ""}.`);
      } else if (match.kind === "converted") {
        value = value * match.factor + match.offset;
        flags.push("UNIT_CONVERTED");
      }
    }
  }

  if (!withinTolerance(value, spec.value, spec.tolerance)) return result(false, 0);

  let precisionPenalty = 0;
  const { sigFigs, decimalPlaces } = spec;
  if (sigFigs) {
    const written = parse.number.sigFigs;
    const ok = written !== null && written.max >= (sigFigs.min ?? 1) && written.min <= (sigFigs.max ?? Number.POSITIVE_INFINITY);
    if (!ok) {
      flags.push("SIG_FIGS");
      const wanted = sigFigs.min === sigFigs.max || sigFigs.max === undefined ? `${sigFigs.min ?? sigFigs.max}` : `${sigFigs.min ?? 1}–${sigFigs.max}`;
      notes.push(`Give your answer to ${wanted} significant figures.`);
      precisionPenalty = spec.precisionPenaltyMarks ?? maxMarks;
    }
  }
  if (decimalPlaces !== undefined && parse.number.decimalPlaces !== decimalPlaces) {
    flags.push("DECIMAL_PLACES");
    notes.push(`Give your answer to ${decimalPlaces} decimal place${decimalPlaces === 1 ? "" : "s"}.`);
    precisionPenalty = Math.max(precisionPenalty, spec.precisionPenaltyMarks ?? maxMarks);
  }
  const awarded = Math.max(0, maxMarks - unitPenalty - precisionPenalty);
  return result(true, awarded, unitPenalty === 0 && precisionPenalty === 0);
}

export interface NumericalMarkingInput {
  marks: number;
  markingMode: MarkingMode;
  spec: NumericalSpec;
  response: ResponseFor<"NUMERICAL"> | null;
  /** Text shown around the answer box; see the module header. */
  affixes?: NumericAffixes;
}

/** Marks a NUMERICAL response (policies in the module header). */
export function markNumerical({ marks, spec, response, affixes }: NumericalMarkingInput): MarkingResult {
  const display = formatCorrectAnswer("NUMERICAL", null, spec);
  if (!response) return unanswered(marks, display);
  const assessment = assessNumericAnswer(spec, response, marks, affixes);
  if (!assessment.answered) return unanswered(marks, display);
  const feedback: MarkingFeedback = { correctAnswerDisplay: display, notes: assessment.notes, flags: assessment.flags };
  if (assessment.flags.includes("NUMBER_AMBIGUOUS")) return buildResult("NEEDS_REVIEW", 0, marks, feedback, marks);
  if (assessment.valueCorrect && !assessment.fullyCorrect && assessment.awarded > 0) feedback.flags.push("PARTIAL_ANSWER");
  return buildResult("MARKED", assessment.awarded, marks, feedback);
}
