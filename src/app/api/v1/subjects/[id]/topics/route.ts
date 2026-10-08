import { operations } from "@/server/api/contract";
import { pageParams, paginateList } from "@/server/api/pagination";
import { v1Route } from "@/server/api/route";
import { getSubjectTopicTree } from "@/server/progress/student-overview";
import { paginated } from "@/server/lib/api";

/**
 * GET /api/v1/subjects/{id}/topics?cursor=&limit= — the topic tree of the student's PINNED syllabus version (§26) with
 * mastery on every node (§11). Pages over the top-level topics; each carries its subtree. 404 when not enrolled.
 */

export const runtime = "nodejs";

export const GET = v1Route(operations.listSubjectTopics, async ({ actor, params, query }) => {
  const tree = await getSubjectTopicTree(actor, params.id);
  const page = paginateList(tree, (node) => node.topicId, pageParams(query));
  return paginated(page.items, page.nextCursor);
});
