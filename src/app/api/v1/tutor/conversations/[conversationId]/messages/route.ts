import { z } from "zod";
import { withFeature } from "@/server/features";
import { apiRoute } from "@/server/lib/api";
import { sendTutorMessage, sendTutorMessageSchema } from "@/server/tutor";
import { sseResponse } from "@/server/tutor/sse";

/**
 * POST /api/v1/tutor/conversations/[conversationId]/messages — one student turn, streamed (§14; ARCHITECTURE §6.3).
 *
 * Auth: session cookie (same-origin check for this unsafe method, ARCHITECTURE §5.4) or a bearer token; STUDENT role.
 * Body (JSON, ≤ 64 KB): `{ text, mode?: "TEACH" | "HINT" | "CHECK_WORK" | "ANSWER", clientMessageId? }`.
 *
 * Auth, CSRF and body validation failures are ordinary JSON error envelopes with their HTTP status. Once the turn
 * starts the response is `text/event-stream`: `start`, `delta`..., then `done` (with the answer rendered server-side as
 * sanitised KaTeX HTML) or one `error` event (`{ type: "error", code, message }`). Closing the connection stops the
 * model; the partial answer is stored as ABORTED. All quotas, rate limits and integrity rules live in the service.
 *
 * 404 while `features.ai` is off (owner decision 2026-10-07), before authentication or parsing: no model is called.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const POST = withFeature(
  "ai",
  apiRoute(
    {
      auth: "required",
      roles: ["STUDENT"],
      operation: "api.v1.tutor.messages",
      maxBodyBytes: 64 * 1024,
      input: {
        params: z.object({ conversationId: z.uuid({ message: "Unknown conversation." }) }),
        body: sendTutorMessageSchema,
      },
    },
    async ({ actor, params, body, request }) => {
      const abort = new AbortController();
      request.signal.addEventListener("abort", () => abort.abort(), { once: true });
      const events = sendTutorMessage(actor, params.conversationId, body, { signal: abort.signal });
      return sseResponse(events, { abort });
    },
  ),
);
