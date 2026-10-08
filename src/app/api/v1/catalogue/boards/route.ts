import { listCatalogueBoards } from "@/server/api/catalogue";
import { operations } from "@/server/api/contract";
import { pageParams, paginateList } from "@/server/api/pagination";
import { v1Route } from "@/server/api/route";
import { paginated } from "@/server/lib/api";

/** GET /api/v1/catalogue/boards?countryId=&cursor=&limit= — listed examination boards, in display order. */

export const runtime = "nodejs";

export const GET = v1Route(operations.listBoards, async ({ query }) => {
  const page = paginateList(await listCatalogueBoards(query.countryId ?? null), (board) => board.id, pageParams(query));
  return paginated(page.items, page.nextCursor);
});
