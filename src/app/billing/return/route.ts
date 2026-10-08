import { z } from "zod";
import { resultPathForPayment } from "@/app/app/billing/_lib/return-path";
import { sessionTokenFromRequest } from "@/server/auth/request-auth";
import { validateSessionToken } from "@/server/auth/sessions";
import { CHECKOUT_RESULT_PATH } from "@/server/billing/checkout";
import { pollPayment } from "@/server/billing/reconcile";
import { absoluteUrl } from "@/server/lib/env";
import { logger } from "@/server/lib/logger";
import { rateLimit, rateLimits } from "@/server/lib/rate-limit";
import { clientIpFromHeaders, requestIdFromHeaders } from "@/server/lib/request";

/**
 * GET /billing/return?paymentId=…&provider=…[&cancelled=1] — where Paynow / Stripe / the sandbox send the payer's
 * browser after checkout (ARCHITECTURE §7.3 "return URL abuse").
 *
 * The query string is NOT trusted: it only names a payment. This route asks the provider ONCE, server-side, about
 * that payment (the same verified transition path as webhooks; a poll can fulfil, the URL itself never does) and then
 * redirects (303) to the signed-in result page `/app/billing/result?paymentId=…`, which shows the stored status. The
 * provider is taken from the Payment row, never from the URL. Polls are rate-limited per client IP; when limited, the
 * redirect still happens (the webhook / reconciliation job will catch up).
 *
 * Parent checkouts (payer ≠ beneficiary, §21) go to the parent's result page `/parent/billing/result?paymentId=…`
 * (`PARENT_PAYMENT_RESULT_PATH`) instead: the student area would send a parent away. The parties come from the Payment
 * row, never from the URL; the browser's own session (when its cookie came along) is used only to send a signed-in
 * caller who is not the payer to the student page (`resultPathForPayment`).
 */

export const runtime = "nodejs";

const uuidSchema = z.uuid();

function seeOther(location: string, requestId: string): Response {
  return new Response(null, {
    status: 303,
    headers: { location, "cache-control": "no-store", "referrer-policy": "no-referrer", "x-request-id": requestId },
  });
}

/** The signed-in web user of this browser, or null (no / expired cookie). Never throws for a bad cookie. */
async function callerUserId(request: Request): Promise<string | null> {
  const validated = await validateSessionToken(sessionTokenFromRequest(request), { kind: "WEB" });
  return validated?.session.userId ?? null;
}

export async function GET(request: Request): Promise<Response> {
  const requestId = requestIdFromHeaders(request.headers);
  const url = new URL(request.url);
  const paymentId = url.searchParams.get("paymentId")?.trim() ?? "";
  if (!uuidSchema.safeParse(paymentId).success) return seeOther(absoluteUrl("/app/billing"), requestId);

  try {
    const ip = clientIpFromHeaders(request.headers);
    const limit = await rateLimit(rateLimits.billingReturnPoll(ip));
    if (limit.allowed) await pollPayment(paymentId);
  } catch (error) {
    // The payer still gets to the result page; webhooks and payments.reconcile confirm the payment later.
    logger.warn("billing: return-page poll failed", { requestId, paymentId, err: error });
  }

  let resultPath = CHECKOUT_RESULT_PATH;
  try {
    resultPath = await resultPathForPayment(paymentId, await callerUserId(request));
  } catch (error) {
    logger.warn("billing: could not look up the payer of a returning payment", { requestId, paymentId, err: error });
  }

  const target = new URL(absoluteUrl(resultPath));
  target.searchParams.set("paymentId", paymentId);
  if (url.searchParams.get("cancelled") === "1") target.searchParams.set("cancelled", "1");
  return seeOther(target.toString(), requestId);
}
