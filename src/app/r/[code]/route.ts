import { NextResponse, type NextRequest } from "next/server";
import { getActor } from "@/server/auth/actor";
import { homePathFor } from "@/server/auth/redirects";
import { getAppUrl } from "@/server/lib/env";
import { logger } from "@/server/lib/logger";
import { rateLimit, rateLimits } from "@/server/lib/rate-limit";
import { clientIpFromHeaders } from "@/server/lib/request";
import { normalizeReferralCode } from "@/server/referrals/core";
import { referralCookieName, referralCookieOptions } from "@/server/referrals/cookie";
import { isActiveReferralCode } from "@/server/referrals/service";

function redirectTo(path: string): NextResponse {
  const response = NextResponse.redirect(new URL(path, getAppUrl()), 303);
  response.headers.set("cache-control", "no-store");
  response.headers.set("x-robots-tag", "noindex");
  return response;
}

/**
 * Referral landing `/r/[code]` (§46): remembers the invite code in a short-lived httpOnly cookie and sends the visitor to
 * /register, where sign-up attributes the new account to the code (`recordReferralSignup`). Signed-in users go to their
 * home instead (a code never attaches to an existing account). Unknown, inactive or malformed codes set nothing; the
 * landing is rate limited per network. A GET that only sets a cookie: no data changes here.
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ code: string }> }): Promise<NextResponse> {
  const { code } = await params;
  const actor = await getActor();
  if (actor) return redirectTo(homePathFor(actor));

  const response = redirectTo("/register");
  const normalized = normalizeReferralCode(code);
  if (!normalized) return response;
  try {
    const ip = clientIpFromHeaders(request.headers);
    const limit = await rateLimit(rateLimits.referralLanding(ip));
    if (!limit.allowed) return response;
    if (await isActiveReferralCode(normalized)) response.cookies.set(referralCookieName(), normalized, referralCookieOptions());
  } catch (error) {
    // The visitor still reaches sign-up; only the attribution is lost.
    logger.warn("referrals: landing failed", { err: error });
  }
  return response;
}
