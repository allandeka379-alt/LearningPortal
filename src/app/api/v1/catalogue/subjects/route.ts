import { listCatalogueSubjects } from "@/server/api/catalogue";
import { operations } from "@/server/api/contract";
import { pageParams, paginateList } from "@/server/api/pagination";
import { v1Route } from "@/server/api/route";
import { paginated } from "@/server/lib/api";

/** GET /api/v1/catalogue/subjects?qualificationId=&cursor=&limit= — a qualification's listed subjects, by category. */

export const runtime = "nodejs";

export const GET = v1Route(operations.listSubjects, async ({ query }) => {
  const page = paginateList(await listCatalogueSubjects(query.qualificationId), (item) => item.id, pageParams(query));
  return paginated(page.items, page.nextCursor);
});
