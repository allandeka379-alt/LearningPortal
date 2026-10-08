"use server";

import type { PublicDailyAnswer } from "@/components/marketing/PublicDailyQuestion";
import type { PresentedFeedback } from "@/components/questions/types";
import { safeAction, type ActionResult } from "@/server/lib/errors";
import { getClientIp } from "@/server/lib/request";
import { publicAnswerFields } from "@/server/marketing/daily";
import { answerSampleQuestion } from "@/server/seo/samples";

/**
 * Anonymous answers to a topic page's practice sample (§44, §46): marked like the public daily question, sharing its
 * per-IP budget, and never stored. Reading the client IP here (not in the page) keeps the topic page ISR-cached.
 */
const answer = safeAction(
  async (input: unknown) => {
    const { id, response } = publicAnswerFields(input);
    return answerSampleQuestion({ questionId: id, response }, { ip: await getClientIp() });
  },
  { operation: "seo.sampleAnswer" },
);

export async function answerSampleQuestionAction(input: PublicDailyAnswer): Promise<ActionResult<PresentedFeedback>> {
  return answer(input);
}
