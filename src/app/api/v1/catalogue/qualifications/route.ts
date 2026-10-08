import { listCatalogueQualifications } from "@/server/api/catalogue";
import { operations } from "@/server/api/contract";
import { pageParams, paginateList } from "@/server/api/pagination";
import { v1Route } from "@/server/api/route";
import { paginated } from "@/server/lib/api";

/** GET /api/v1/catalogue/qualifications?boardId=&cursor=&limit= — listed qualifications, by level then board. */

export const runtime = "nodejs";

export const GET = v1Route(operations.listQualifications, async ({ query }) => {
  const page = paginateList(await listCatalogueQualifications(query.boardId ?? null), (item) => item.id, pageParams(query));
  return paginated(page.items, page.nextCursor);
});
