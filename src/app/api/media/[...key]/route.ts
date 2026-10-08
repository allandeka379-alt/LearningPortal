import { authenticateRequest } from "@/server/auth/request-auth";
import { toHttpResponse } from "@/server/lib/errors";
import { requestIdFromHeaders } from "@/server/lib/request";
import { findServableMedia, openMediaStream, type AccessibleMedia, type MediaViewer } from "@/server/lib/uploads";

/**
 * GET /api/media/<storageKey> — serves uploaded media files (ARCHITECTURE §3.11).
 *
 * - PUBLIC assets: immutable and CDN-cacheable (keys are random and content never changes under a key).
 * - AUTHENTICATED assets (premium content images, avatars): any signed-in user (session cookie or API bearer token);
 *   `private, no-cache`, so only the browser keeps a copy and it revalidates (cheap 304 via ETag) on every use, which
 *   also stops a signed-out browser from reusing it.
 * - PRIVATE / OWNER_ONLY assets: the uploader only, `private, no-store`. Other authorised readers (teachers, school
 *   admins, break-glass) are served by their owning service, not by this route.
 *
 * Every refusal (malformed or unknown key, no or invalid credentials, not the owner, soft-deleted, not READY) is the
 * same plain 404, so the route cannot be used to probe for private files.
 *
 * TODO(storage): short-lived signed URLs once the S3 driver lands.
 */

export const runtime = "nodejs";

const CACHE_CONTROL: Readonly<Record<AccessibleMedia["visibility"], string>> = {
  PUBLIC: "public, max-age=31536000, immutable",
  AUTHENTICATED: "private, no-cache",
  PRIVATE: "private, no-store",
  OWNER_ONLY: "private, no-store",
};

function notFound(): Response {
  return new Response("Not found", {
    status: 404,
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
  });
}

/** The signed-in caller, or `null` (anonymous, expired or invalid credentials all look the same to this route). */
async function viewerOf(request: Request): Promise<MediaViewer | null> {
  try {
    const auth = await authenticateRequest(request);
    return auth ? { userId: auth.actor.userId } : null;
  } catch {
    return null;
  }
}

export async function GET(request: Request, context: { params: Promise<{ key: string[] }> }): Promise<Response> {
  const requestId = requestIdFromHeaders(request.headers);
  try {
    const { key: segments } = await context.params;
    const asset = await findServableMedia(segments.join("/"), () => viewerOf(request));
    if (!asset) return notFound();

    const etag = `"${asset.checksumSha256}"`;
    const headers = new Headers({
      "content-type": asset.mimeType,
      "cache-control": CACHE_CONTROL[asset.visibility],
      etag,
      "x-content-type-options": "nosniff",
      // Defence in depth: even if a non-image ever became public, it could not run script in our origin.
      "content-security-policy": "default-src 'none'; img-src 'self'; media-src 'self'; sandbox",
      "content-disposition": asset.mimeType.startsWith("image/") || asset.mimeType.startsWith("audio/") ? "inline" : "attachment",
      "cross-origin-resource-policy": "same-site",
    });
    if (asset.visibility !== "PUBLIC") headers.set("vary", "Cookie, Authorization");
    const ifNoneMatch = request.headers.get("if-none-match");
    if (ifNoneMatch !== null && ifNoneMatch.split(",").some((tag) => tag.trim().replace(/^W\//, "") === etag)) {
      return new Response(null, { status: 304, headers });
    }

    const opened = await openMediaStream(asset);
    if (!opened) return notFound();
    headers.set("content-length", String(opened.size));
    if (request.method === "HEAD") {
      await opened.stream.cancel();
      return new Response(null, { status: 200, headers });
    }
    return new Response(opened.stream, { status: 200, headers });
  } catch (error) {
    return toHttpResponse(error, { operation: "media.get", requestId });
  }
}
