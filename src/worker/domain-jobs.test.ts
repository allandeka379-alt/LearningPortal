import { describe, expect, it, vi } from "vitest";

const handleReindexAllJob = vi.hoisted(() => vi.fn(async () => ({ types: {}, durationMs: 0, aborted: false })));
vi.mock("@/server/search/indexer", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/server/search/indexer")>()),
  handleReindexAllJob,
}));

import { getJobHandler, recurringJobs, recurringPeriodStart, type JobContext } from "@/server/lib/jobs";
import { logger } from "@/server/lib/logger";
import { registerSearchJobs, SEARCH_REINDEX_EVERY_MINUTES, SEARCH_REINDEX_OFFSET_MINUTES, SEARCH_REINDEX_WEEKLY } from "./domain-jobs";

registerSearchJobs();

function context(signal: AbortSignal): JobContext {
  return { jobId: "job-1", type: "search.reindexAll", queue: "search", attempt: 1, maxAttempts: 2, workerId: "w-1", signal, logger };
}

/** The weekly search safety net (a full, idempotent `search.reindexAll`) next to the on-demand handlers. */
describe("registerSearchJobs", () => {
  it("schedules a weekly full reindex on the search queue", () => {
    expect(recurringJobs().find((job) => job.name === SEARCH_REINDEX_WEEKLY)).toEqual({
      name: SEARCH_REINDEX_WEEKLY,
      everyMinutes: 7 * 24 * 60,
      type: "search.reindexAll",
      offsetMinutes: SEARCH_REINDEX_OFFSET_MINUTES,
      payload: {},
      queue: "search",
    });
    expect(getJobHandler("search.reindexAll")?.queue).toBe("search");
    expect(getJobHandler("search.reindexEntity")?.queue).toBe("search");
  });

  it.each(["2026-10-06T09:00:00Z", "2026-10-11T00:59:00Z", "2026-10-11T01:00:00Z", "2027-02-28T23:00:00Z"])(
    "runs on Sunday 01:00 UTC (03:00 CAT) for a clock at %s",
    (iso) => {
      const now = new Date(iso);
      const start = recurringPeriodStart(now, SEARCH_REINDEX_EVERY_MINUTES, SEARCH_REINDEX_OFFSET_MINUTES);
      expect(start.getUTCDay()).toBe(0);
      expect([start.getUTCHours(), start.getUTCMinutes()]).toEqual([1, 0]);
      expect(start.getTime()).toBeLessThanOrEqual(now.getTime());
      expect(now.getTime() - start.getTime()).toBeLessThan(SEARCH_REINDEX_EVERY_MINUTES * 60_000);
    },
  );

  it("hands the scheduler's payload to the full reindex without periodStart", async () => {
    const registered = getJobHandler("search.reindexAll");
    if (!registered) throw new Error("search.reindexAll is not registered");
    const controller = new AbortController();
    const payload = registered.schema.parse({ periodStart: "2026-10-11T01:00:00.000Z" });
    await registered.handler(payload, context(controller.signal));
    expect(handleReindexAllJob).toHaveBeenCalledWith({}, { signal: controller.signal });

    await registered.handler(registered.schema.parse({ types: ["LESSON"] }), context(controller.signal));
    expect(handleReindexAllJob).toHaveBeenLastCalledWith({ types: ["LESSON"] }, { signal: controller.signal });
  });
});
