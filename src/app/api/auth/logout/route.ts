import { authCookieOptions, isSecureOrigin, serializeCookie, sessionCookieName } from "@/server/auth/cookies";
import { logout } from "@/server/auth/flows";
import { apiRoute } from "@/server/lib/api";
import { absoluteUrl, getEnv } from "@/server/lib/env";

/**
 * POST /api/auth/logout — signs out the caller: a bearer token (native app / integrations) or the web cookie session
 * (same-origin only, enforced by `apiRoute`). Browsers posting a form get a 303 to `/`; API clients get 204. Web pages
 * normally use the `logoutAction` Server Action (`<LogoutButton />`) instead.
 */
export const runtime = "nodejs";

export const POST = apiRoute({ auth: "optional", rateLimit: false, allowPendingPasswordChange: true, operation: "auth.logout" }, async (context) => {
  const { auth, request } = context;
  if (auth !== null) {
    await logout(auth.session, { ip: context.ip, userAgent: context.userAgent, requestId: context.requestId }, auth.actor.roles);
  }
  const headers = new Headers();
  if (auth === null || auth.via === "cookie") {
    const secure = isSecureOrigin(getEnv().APP_URL);
    headers.append("set-cookie", serializeCookie(sessionCookieName(secure), "", authCookieOptions(secure, 0)));
  }
  if ((request.headers.get("accept") ?? "").includes("text/html")) {
    headers.set("location", absoluteUrl("/"));
    return new Response(null, { status: 303, headers });
  }
  return new Response(null, { status: 204, headers });
});
