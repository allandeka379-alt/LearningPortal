import { withFeature } from "@/server/features";
import { apiRoute, paginated, parseCursorParams } from "@/server/lib/api";
import { createConversation, createConversationSchema, listConversations } from "@/server/tutor";

/**
 * GET  /api/v1/tutor/conversations?cursor=&limit=  the student's tutor conversations (cursor-paginated, newest first)
 * POST /api/v1/tutor/conversations                 start one: `{ subjectId?, topicId?, questionId? }` -> 201 `{ data: { id, title } }`
 *
 * Session cookie (same-origin for POST) or bearer token; STUDENT role. Conversations are private to the student
 * (database row-level security); enrolment, pinned-syllabus and question checks live in the service.
 *
 * 404 while `features.ai` is off (owner decision 2026-10-07), before authentication or parsing.
 */

export const runtime = "nodejs";

export const GET = withFeature(
  "ai",
  apiRoute({ auth: "required", roles: ["STUDENT"], operation: "api.v1.tutor.conversations.list" }, async ({ actor, request }) => {
    const { cursor, limit } = parseCursorParams(request);
    const page = await listConversations(actor, { cursor, limit });
    return paginated(
      page.items.map((item) => ({
        ...item,
        lastMessageAt: item.lastMessageAt?.toISOString() ?? null,
        createdAt: item.createdAt.toISOString(),
      })),
      page.nextCursor,
    );
  }),
);

export const POST = withFeature(
  "ai",
  apiRoute(
    {
      auth: "required",
      roles: ["STUDENT"],
      operation: "api.v1.tutor.conversations.create",
      maxBodyBytes: 4 * 1024,
      input: { body: createConversationSchema },
    },
    async ({ actor, body }) => Response.json({ data: await createConversation(actor, body) }, { status: 201 }),
  ),
);
