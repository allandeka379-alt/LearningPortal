import { handleWebhook } from "@/server/billing/webhooks";
import { logger } from "@/server/lib/logger";
import { requestIdFromHeaders } from "@/server/lib/request";
import { limitWebhookReceipt } from "@/server/lib/webhook-guard";

/**
 * POST /api/webhooks/payments/[provider] — provider callbacks (`paynow`, `stripe`, `sandbox`; ARCHITECTURE §3.3, §7).
 *
 * Thin by design: the raw body is read ONCE as text inside `handleWebhook` (signatures/hashes cover the exact bytes),
 * verified, stored as an idempotent PaymentEvent and applied. `src/proxy.ts` never runs here (no cookies, no auth
 * redirects). Answers: 200 `{ received: true }` (processed, duplicate or irrelevant), 400 bad signature, 404 unknown
 * or disabled provider, 413 oversized, 429 above the per-IP receipt limit (checked first, before the body is read or
 * any signature verified: `limitWebhookReceipt`), 500 processing failure (providers retry). Bodies never carry
 * internals.
 */

export const runtime = "nodejs";

export async function POST(request: Request, context: { params: Promise<{ provider: string }> }): Promise<Response> {
  const requestId = requestIdFromHeaders(request.headers);
  const headers = { "cache-control": "no-store", "x-request-id": requestId };
  const limited = await limitWebhookReceipt("payments", request, requestId);
  if (limited) return limited;
  try {
    const { provider } = await context.params;
    const result = await handleWebhook(provider, request);
    return Response.json(result.body, { status: result.status, headers });
  } catch (error) {
    logger.error("billing: payment webhook route failed", { requestId, err: error });
    return Response.json({ received: false, error: "processing_failed" }, { status: 500, headers });
  }
}
