import { describe, expect, it } from "vitest";
import { getJobHandler, recurringJobs, recurringPeriodStart } from "@/server/lib/jobs";
import { registerAllJobs } from "@/worker/handlers";
import { DAILY_QUESTION_FILL_JOB, DAILY_QUESTION_FILL_OFFSET_MINUTES } from "./jobs";

describe("dailyQuestion.fill registration", () => {
  it("is registered by the worker and scheduled nightly at 22:30 CAT", () => {
    registerAllJobs();
    expect(getJobHandler(DAILY_QUESTION_FILL_JOB)).toMatchObject({ queue: "default", maxAttempts: 3 });
    const schedule = recurringJobs().find((job) => job.name === DAILY_QUESTION_FILL_JOB);
    expect(schedule).toMatchObject({ type: DAILY_QUESTION_FILL_JOB, everyMinutes: 1440, offsetMinutes: DAILY_QUESTION_FILL_OFFSET_MINUTES });
    // 22:30 in Harare (UTC+2, no DST) is 20:30 UTC: a run at 22:45 CAT belongs to the period that started at 22:30 CAT.
    const start = recurringPeriodStart(new Date("2026-10-07T20:45:00Z"), 1440, DAILY_QUESTION_FILL_OFFSET_MINUTES);
    expect(start.toISOString()).toBe("2026-10-07T20:30:00.000Z");
  });
});
