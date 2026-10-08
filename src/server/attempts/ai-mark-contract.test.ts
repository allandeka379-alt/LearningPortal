import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { MARK_PENDING_AI_RESPONSES_JOB, markPendingAiResponsesPayloadSchema } from "@/server/ai/marking";
import { AI_MARK_JOB, aiMarkPayload } from "./effects";

/** Seam between the attempt engine (producer) and the AI marking job (consumer). */
describe("ai.mark job contract", () => {
  it("uses the job type and payload shape the AI marking handler parses", () => {
    expect(AI_MARK_JOB).toBe(MARK_PENDING_AI_RESPONSES_JOB);
    const attemptId = randomUUID();
    const parsed = markPendingAiResponsesPayloadSchema.parse(aiMarkPayload(attemptId, 3));
    expect(parsed).toEqual({ items: [{ attemptId, position: 3 }] });
  });
});
