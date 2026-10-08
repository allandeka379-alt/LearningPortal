import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { randomIp } from "@/server/auth/testing";
import { upsertSearchDocuments } from "@/server/search/indexer";
import type { SearchDocumentInput } from "@/server/search/types";
import { GET } from "./route";

/**
 * GET /api/v1/search/suggest against the test database. Fixtures are synthetic SearchDocument rows scoped to a random
 * subject id, so assertions never depend on other files' data.
 */

const sfx = randomUUID().replace(/-/g, "").slice(0, 8);
const word = `zq${sfx}`;

function doc(overrides: Partial<SearchDocumentInput>): SearchDocumentInput {
  return {
    entityType: "TOPIC",
    entityId: randomUUID(),
    title: `${word} equations`,
    subtitle: "Test board · Mathematics",
    body: "Never returned by autocomplete.",
    keywords: "",
    path: "/test/topic",
    languageCode: "en",
    accessTier: "PUBLIC",
    examBoardIds: [],
    qualificationIds: [],
    levelIds: [],
    subjectIds: [],
    syllabusIds: [],
    topicIds: [],
    rankBoost: 0,
    sourceUpdatedAt: new Date(),
    ...overrides,
  };
}

function get(query: string): Request {
  return new Request(`http://localhost:3000/api/v1/search/suggest${query}`, { headers: { "x-forwarded-for": randomIp() } });
}

describe("GET /api/v1/search/suggest", () => {
  it("returns title suggestions in a { data } envelope, never bodies, and is not cacheable by shared caches", async () => {
    const subjectId = randomUUID();
    await upsertSearchDocuments([
      doc({ subjectIds: [subjectId] }),
      doc({ entityType: "LESSON", title: `${word} by factorising`, accessTier: "PREMIUM", path: `/app/lessons/${randomUUID()}`, subjectIds: [subjectId] }),
    ]);
    const response = await GET(get(`?q=${word}&subjectId=${subjectId}`));
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("private, no-store");
    const body = (await response.json()) as { data: Array<Record<string, unknown>> };
    expect(body.data.map((item) => item.title).sort()).toEqual([`${word} by factorising`, `${word} equations`]);
    for (const item of body.data) {
      expect(Object.keys(item).sort()).toEqual(["accessTier", "entityId", "entityType", "path", "subtitle", "title"]);
    }
  });

  it("answers [] below two characters and honours the limit", async () => {
    const subjectId = randomUUID();
    await upsertSearchDocuments([1, 2, 3].map((n) => doc({ title: `${word} part ${n}`, subjectIds: [subjectId] })));
    expect(((await (await GET(get(`?q=z&subjectId=${subjectId}`))).json()) as { data: unknown[] }).data).toEqual([]);
    const limited = (await (await GET(get(`?q=${word}&subjectId=${subjectId}&limit=2`))).json()) as { data: unknown[] };
    expect(limited.data).toHaveLength(2);
  });

  it("rejects malformed parameters with a validation envelope", async () => {
    const response = await GET(get("?q=quad&subjectId=not-a-uuid"));
    expect(response.status).toBe(422);
    const body = (await response.json()) as { error: { code: string; fieldErrors?: Record<string, string[]> } };
    expect(body.error.code).toBe("VALIDATION");
    expect(body.error.fieldErrors?.subjectId).toBeDefined();
    expect((await GET(get("?q=quad&limit=99"))).status).toBe(422);
  });
});
