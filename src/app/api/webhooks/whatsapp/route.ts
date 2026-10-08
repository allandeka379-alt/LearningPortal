import { withFeature } from "@/server/features";
import { handleVerification, handleWebhookPost, type WebhookHttpResult } from "@/server/whatsapp";
import { logger } from "@/server/lib/logger";
import { requestIdFromHeaders } from "@/server/lib/request";
import { limitWebhookReceipt } from "@/server/lib/webhook-guard";

/**
 * GET / POST /api/webhooks/whatsapp — WhatsApp Cloud API webhook (§30, ARCHITECTURE §8). Thin: the service verifies
 * the `hub.verify_token` handshake (GET) and the `X-Hub-Signature-256` HMAC over the RAW body (POST), stores and
 * deduplicates messages, and queues the work for the worker. `src/proxy.ts` never runs here (no cookies, no redirects).
 *
 * Switched off by default (`features.whatsapp`, owner decision 2026-10-07; docs/ARCHITECTURE.md §3.14): while off,
 * both methods answer 404 before anything else (no rate-limit bucket, no body read, nothing stored).
 *
 * Answers: GET 200 challenge (text/plain) | 403 | 404 (switched off or not configured); POST 200 `{ received: true }` |
 * 400 invalid JSON | 401 bad / missing signature | 404 switched off or not configured | 413 oversized | 500 storage
 * failure (Meta retries). Both methods answer 429 (`Retry-After`) above the per-IP receipt limit, checked before
 * anything else once the channel is on (`limitWebhookReceipt`).
 *
 * Operations: the GET handshake carries `hub.verify_token` in the QUERY STRING. Keep query strings of this path out of
 * reverse-proxy / CDN access logs (docs/WHATSAPP.md "Go-live checklist").
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function toResponse(result: WebhookHttpResult, requestId: string): Response {
  const headers = { "cache-control": "no-store", "x-request-id": requestId };
  if (result.contentType === "text/plain") {
    return new Response(typeof result.body === "string" ? result.body : "", {
      status: result.status,
      headers: { ...headers, "content-type": "text/plain; charset=utf-8", "x-content-type-options": "nosniff" },
    });
  }
  return Response.json(result.body, { status: result.status, headers });
}

const handleGet = withFeature("whatsapp", async (request: Request): Promise<Response> => {
  const requestId = requestIdFromHeaders(request.headers);
  const limited = await limitWebhookReceipt("whatsapp", request, requestId);
  if (limited) return limited;
  return toResponse(handleVerification(new URL(request.url)), requestId);
});

const handlePost = withFeature("whatsapp", async (request: Request): Promise<Response> => {
  const requestId = requestIdFromHeaders(request.headers);
  const limited = await limitWebhookReceipt("whatsapp", request, requestId);
  if (limited) return limited;
  try {
    return toResponse(await handleWebhookPost(request), requestId);
  } catch (error) {
    logger.error("whatsapp: webhook route failed", { requestId, err: error });
    return Response.json({ received: false, error: "processing_failed" }, { status: 500, headers: { "cache-control": "no-store", "x-request-id": requestId } });
  }
});

export function GET(request: Request): Promise<Response> {
  return handleGet(request, undefined);
}

export function POST(request: Request): Promise<Response> {
  return handlePost(request, undefined);
}
