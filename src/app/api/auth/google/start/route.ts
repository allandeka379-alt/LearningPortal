import { handleGoogleStart } from "@/server/auth/google-handlers";

/**
 * GET /api/auth/google/start?next=&role= — begins Google sign-in (OIDC code flow + PKCE). A GET navigation (link),
 * never a form POST: the CSP's `form-action 'self'` would block a POST that redirects to Google.
 */
export const runtime = "nodejs";

export function GET(request: Request): Promise<Response> {
  return handleGoogleStart(request);
}
