import { marketingEventInputSchema, recordMarketingEvent } from "@/server/analytics/growth";
import { apiRoute } from "@/server/lib/api";
import { rateLimitSubject } from "@/server/lib/rate-limit";

/**
 * POST /api/analytics/events — first-party, privacy-safe public growth event capture. The client sends only page paths,
 * click destinations and campaign parameters; the server stores hashed request identifiers and never raw IPs or form
 * values.
 */
export const POST = apiRoute(
  {
    auth: "optional",
    input: { body: marketingEventInputSchema },
    maxBodyBytes: 4096,
    rateLimit: ({ ip }) => ({ key: `marketingEvent:${rateLimitSubject(ip)}`, limit: 180, windowSeconds: 60 }),
    operation: "analytics.marketingEvent",
  },
  async ({ body, request, ip, userAgent, actor }) => {
    return recordMarketingEvent(body, {
      requestUrl: request.url,
      ip,
      userAgent,
      userId: actor?.userId ?? null,
    });
  },
);
