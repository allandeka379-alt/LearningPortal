import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { dateColumnFromLocalDate } from "@/lib/dates";
import { ANALYTICS_JOB_HANDLERS, handleBackfillMetricsJob, handleDailyMetricsJob, nightlyDailyMetricsJob } from "./jobs";
import { METRIC } from "./metrics";
import { isolatedDate } from "./testing/fixtures";

describe("analytics job adapters", () => {
  it("enqueues the nightly run for yesterday (Africa/Harare) with a period dedupe key", () => {
    // 2026-10-05 23:30 UTC is already 2026-10-06 in Harare, so "yesterday" is 2026-10-05.
    expect(nightlyDailyMetricsJob(new Date("2026-10-05T23:30:00Z"))).toEqual({
      name: "analytics.dailyMetrics",
      queue: "rollups",
      payload: { date: "2026-10-05" },
      dedupeKey: "metrics:2026-10-05",
    });
  });

  it("exposes every handler by job name", () => {
    expect(Object.keys(ANALYTICS_JOB_HANDLERS).sort()).toEqual(["analytics.backfillMetrics", "analytics.dailyMetrics"]);
  });

  it("rejects malformed payloads before touching the database", async () => {
    await expect(handleDailyMetricsJob({ date: "05/10/2026" })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(handleDailyMetricsJob({ date: "2026-10-01", extra: true })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(handleBackfillMetricsJob({ from: "2026-10-01" })).rejects.toMatchObject({ code: "VALIDATION" });
  });

  it("computes the requested day", async () => {
    const date = isolatedDate();
    await handleDailyMetricsJob({ date });
    const row = await db.dailyMetric.findUnique({
      where: { date_metric_dimension: { date: dateColumnFromLocalDate(date), metric: METRIC.USERS_DAU, dimension: "" } },
    });
    expect(row).not.toBeNull();
  });
});
