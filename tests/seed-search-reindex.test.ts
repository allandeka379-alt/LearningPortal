import { describe, expect, it, vi } from "vitest";
import type { PrismaClient } from "@/generated/prisma/client";
import type { ReindexAllReport } from "@/server/search/indexer";

/**
 * `npm run db:seed:demo` ends with a full search reindex (the seed writes rows directly, bypassing the publish flows
 * that enqueue per-entity index jobs), so /app/search works in development. The seed steps are stubbed: this checks
 * the orchestration only (the reindex itself is covered by src/server/search/search.integration.test.ts).
 */

const steps = vi.hoisted(() => [] as string[]);

vi.mock("../prisma/seed/catalogue", () => ({ seedCatalogue: vi.fn(async () => (steps.push("catalogue"), {})) }));
vi.mock("../prisma/seed/platform", () => ({ seedPlatform: vi.fn(async () => (steps.push("platform"), {})) }));
vi.mock("../prisma/seed/demo", () => ({ seedDemo: vi.fn(async () => void steps.push("demo")) }));

import { describeReindex, runSeed } from "../prisma/seed/run";

/** Enough of a PrismaClient for runSeed's own queries: the demo guard and the row counts. */
function fakeDb(): PrismaClient {
  const model = { count: async () => 0 };
  const base: Record<string, unknown> = { $queryRaw: async () => [{ env: "development" }] };
  return new Proxy(base, { get: (target, key) => (typeof key === "string" && key in target ? target[key] : model) }) as unknown as PrismaClient;
}

function report(overrides: Partial<ReindexAllReport> = {}): ReindexAllReport {
  return {
    types: { SUBJECT: { scanned: 3, written: 3, removed: 0 }, LESSON: { scanned: 9, written: 8, removed: 1 } },
    durationMs: 1234,
    aborted: false,
    ...overrides,
  };
}

function silentLog() {
  const lines: { level: "info" | "warn"; message: string }[] = [];
  return { lines, info: (message: string) => void lines.push({ level: "info", message }), warn: (message: string) => void lines.push({ level: "warn", message }) };
}

describe("runSeed search reindex", () => {
  it("rebuilds the search index after the demo data, with the seed's client", async () => {
    steps.length = 0;
    const db = fakeDb();
    const log = silentLog();
    const reindexSearch = vi.fn(async (client: PrismaClient) => {
      expect(client).toBe(db);
      steps.push("reindex");
      return report();
    });
    await runSeed(db, { demo: true, nodeEnv: "development", log, reindexSearch });
    expect(steps).toEqual(["catalogue", "platform", "demo", "reindex"]);
    expect(reindexSearch).toHaveBeenCalledTimes(1);
    expect(log.lines).toContainEqual({ level: "info", message: "search index rebuilt in 1.2 s: 11 documents written, 1 removed" });
  });

  it("does not reindex without demo data", async () => {
    steps.length = 0;
    const reindexSearch = vi.fn(async () => report());
    await runSeed(fakeDb(), { demo: false, nodeEnv: "development", log: silentLog(), reindexSearch });
    expect(steps).toEqual(["catalogue", "platform"]);
    expect(reindexSearch).not.toHaveBeenCalled();
  });

  it("warns when the rebuild was aborted", async () => {
    const log = silentLog();
    await runSeed(fakeDb(), { demo: true, nodeEnv: "development", log, reindexSearch: async () => report({ aborted: true }) });
    expect(log.lines.find((line) => line.message.startsWith("search index"))).toEqual({
      level: "warn",
      message: "search index rebuild ABORTED in 1.2 s: 11 documents written, 1 removed",
    });
  });

  it("refuses demo data (and so never reindexes) for a production NODE_ENV", async () => {
    const reindexSearch = vi.fn(async () => report());
    await expect(runSeed(fakeDb(), { demo: true, nodeEnv: "production", log: silentLog(), reindexSearch })).rejects.toThrow(/NODE_ENV is production/);
    expect(reindexSearch).not.toHaveBeenCalled();
  });

  it("summarises an empty report", () => {
    expect(describeReindex({ types: {}, durationMs: 0, aborted: false })).toBe("search index rebuilt in 0.0 s: 0 documents written, 0 removed");
  });
});
