import "server-only";
import { hmacSha256 } from "@/server/lib/crypto";

/**
 * The viewer tag the service worker binds saved lessons to (docs/OFFLINE.md, PRIV-01): rendered by the student area as
 * `<meta name="dz-viewer">` and posted to the worker, which only shows a saved lesson to the user it was saved for and
 * deletes every saved lesson when the tag changes (another student signs in on a shared phone).
 *
 * A keyed hash (HMAC with SESSION_SECRET) of the user id, truncated to 128 bits: stable per user, different for every
 * user, and not reversible or linkable to the id by anyone without the server secret. Not a credential.
 */
export function offlineViewerTag(userId: string): string {
  return hmacSha256(`offline-viewer:v1:${userId}`).slice(0, 32);
}
