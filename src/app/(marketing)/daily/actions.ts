"use server";

import type { PresentedFeedback } from "@/components/questions/types";
import type { PublicDailyAnswer } from "@/components/marketing/PublicDailyQuestion";
import { safeAction, type ActionResult } from "@/server/lib/errors";
import { getClientIp } from "@/server/lib/request";
import { answerPublicDailyQuestion, publicAnswerFields } from "@/server/marketing/daily";

/**
 * Anonymous daily-question answers (§46). Marked server-side by the marking engine; nothing is stored apart from the
 * per-IP rate-limit counter. Reading the client IP here (not in the page) keeps /daily statically rendered.
 */
const answer = safeAction(
  async (input: unknown) => {
    const { id, response } = publicAnswerFields(input);
    return answerPublicDailyQuestion({ dailyQuestionId: id, response }, { ip: await getClientIp() });
  },
  { operation: "marketing.dailyAnswer" },
);

export async function answerPublicDailyAction(input: PublicDailyAnswer): Promise<ActionResult<PresentedFeedback>> {
  return answer(input);
}
