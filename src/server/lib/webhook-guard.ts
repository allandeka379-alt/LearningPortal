import "server-only";
import { logger } from "./logger";
import { rateLimit, rateLimits } from "./rate-limit";
import { clientIpFromHeaders } from "./request";

/**
 * First line of every webhook route (`/api/webhooks/whatsapp` GET + POST, `/api/webhooks/payments/[provider]`):
 * a generous per-(endpoint, client IP) receipt limit (`rateLimits.webhookReceipt`, 300/min by default, tunable through
 * the `rateLimits` setting) checked BEFORE the body is read and its signature verified, so a flood of unsigned or
 * forged deliveries cannot make the server read and HMAC large bodies, or reach the database, without bound.
 *
 * Providers deliver from a handful of addresses and retry on 429 (honouring `Retry-After`), so a real burst is
 * delayed, never lost. Fails open: if the limiter itself is unavailable the delivery proceeds to signature
 * verification (which then protects the endpoint as before).
 */

/** Endpoint names used in the limiter key (fixed strings: never derived from the URL). */
export type WebhookEndpoint = "whatsapp" | "payments";

/** `null` when the delivery may proceed; otherwise the 429 response to send. */
export async function limitWebhookReceipt(endpoint: WebhookEndpoint, request: Request, requestId: string): Promise<Response | null> {
  try {
    const result = await rateLimit(rateLimits.webhookReceipt(endpoint, clientIpFromHeaders(request.headers)));
    if (result.allowed) return null;
    logger.warn("webhook receipt rate limit exceeded", { endpoint, requestId, retryAfter: result.retryAfterSeconds });
    return Response.json(
      { received: false, error: "rate_limited" },
      {
        status: 429,
        headers: { "cache-control": "no-store", "x-request-id": requestId, "retry-after": String(result.retryAfterSeconds) },
      },
    );
  } catch (error) {
    logger.warn("webhook receipt limiter unavailable; continuing", { endpoint, requestId, err: error });
    return null;
  }
}
