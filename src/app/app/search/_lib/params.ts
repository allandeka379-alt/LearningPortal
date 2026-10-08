import { z } from "zod";
import { isSearchTabKey, SEARCH_QUERY_MAX_LENGTH } from "@/components/search/config";
import type { SearchPageState } from "@/components/search/links";

/**
 * `/app/search` URL parameters (`?q=&type=&subjectId=&detect=0&cursor=`), parsed leniently: anything malformed is
 * dropped rather than failing the page (links get shared, edited and truncated). Pure.
 */

type RawParams = Record<string, string | string[] | undefined>;

const uuid = z.uuid();
const CURSOR_MAX_LENGTH = 512;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function parseSearchPageParams(raw: RawParams): SearchPageState {
  const q = (first(raw.q) ?? "").replace(/\s+/g, " ").trim().slice(0, SEARCH_QUERY_MAX_LENGTH);
  const type = first(raw.type);
  const subjectId = first(raw.subjectId);
  const cursor = first(raw.cursor);
  return {
    q,
    type: isSearchTabKey(type) ? type : "all",
    subjectId: subjectId !== undefined && uuid.safeParse(subjectId).success ? subjectId : null,
    detect: first(raw.detect) !== "0",
    cursor: cursor !== undefined && cursor !== "" && cursor.length <= CURSOR_MAX_LENGTH ? cursor : null,
  };
}
