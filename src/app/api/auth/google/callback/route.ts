import { handleGoogleCallback } from "@/server/auth/google-handlers";

/** GET /api/auth/google/callback?code=&state= — completes Google sign-in and redirects to the user's destination. */
export const runtime = "nodejs";

export function GET(request: Request): Promise<Response> {
  return handleGoogleCallback(request);
}
