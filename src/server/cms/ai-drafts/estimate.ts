import type { AiDraftKind } from "./schemas";

/**
 * Cost estimate shown before an editor queues a generation job (ARCHITECTURE §6.6 "cost estimate shown", §6.7 cost
 * model). Pure: token assumptions per kind × the configured price of the routed model. It is labelled an ESTIMATE in
 * the UI; the job records the real metered tokens and cost when it runs.
 */

/** Prompt (system + scope + objectives) input tokens, before per-item output. */
const BASE_INPUT_TOKENS = 2_500;

/** Expected output tokens per item, including the model's reasoning (medium effort on the DEEP tier). */
const OUTPUT_TOKENS_PER_ITEM: Readonly<Record<AiDraftKind, number>> = {
  QUESTIONS: 1_100,
  MCQ: 800,
  FLASHCARDS: 220,
  LESSON: 6_000,
  EXPLANATION: 1_800,
  HINTS: 300,
  STUDY_PLAN: 700,
};

export interface ModelPricePerMTok {
  inputPerMTok: number;
  outputPerMTok: number;
}

export interface CostEstimate {
  inputTokens: number;
  outputTokens: number;
  /** USD micro-dollars, rounded up. */
  costMicros: number;
}

/** Estimated tokens and cost of one job; output is capped at the route's `maxTokens`. */
export function estimateGenerationCost(kind: AiDraftKind, count: number, price: ModelPricePerMTok, maxOutputTokens: number): CostEstimate {
  const outputTokens = Math.min(maxOutputTokens, Math.max(1, count) * OUTPUT_TOKENS_PER_ITEM[kind] + 400);
  const inputTokens = BASE_INPUT_TOKENS + (kind === "STUDY_PLAN" ? 1_500 : 0);
  // USD per MTok = micro-dollars per token.
  const costMicros = Math.ceil(inputTokens * price.inputPerMTok + outputTokens * price.outputPerMTok);
  return { inputTokens, outputTokens, costMicros };
}
