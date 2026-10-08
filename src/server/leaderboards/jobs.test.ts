import { describe, expect, it } from "vitest";
import { getJobHandler, recurringJobs, recurringPeriodStart } from "@/server/lib/jobs";
import { LEADERBOARD_SNAPSHOT_JOB, LEADERBOARD_WEEKLY_CLOSE_JOB, WEEKLY_CLOSE_OFFSET_MINUTES, registerLeaderboardJobs, weekToClose } from "./jobs";

describe("leaderboard jobs", () => {
  it("finalises the week that just ended, or an explicit week", () => {
    // Monday 5 Oct 2026 02:00 UTC = 04:00 CAT: the week of 28 Sep - 4 Oct (2026-W40) has ended.
    expect(weekToClose({ periodStart: "2026-10-05T02:00:00.000Z" }, new Date())).toBe("2026-W40");
    expect(weekToClose({}, new Date("2026-10-06T10:00:00.000Z"))).toBe("2026-W40");
    expect(weekToClose({ weekKey: "2026-W30" }, new Date())).toBe("2026-W30");
  });

  it("registers the hourly snapshot and the Monday 04:00 CAT weekly close on the rollups queue", () => {
    registerLeaderboardJobs();
    expect(getJobHandler(LEADERBOARD_SNAPSHOT_JOB)).toMatchObject({ queue: "rollups", maxAttempts: 3 });
    expect(getJobHandler(LEADERBOARD_WEEKLY_CLOSE_JOB)).toMatchObject({ queue: "rollups" });
    const schedules = Object.fromEntries(recurringJobs().map((job) => [job.name, job]));
    expect(schedules[LEADERBOARD_SNAPSHOT_JOB]).toMatchObject({ everyMinutes: 60, offsetMinutes: 20 });
    const close = schedules[LEADERBOARD_WEEKLY_CLOSE_JOB]!;
    expect(close.everyMinutes).toBe(7 * 1440);
    expect(close.offsetMinutes).toBe(WEEKLY_CLOSE_OFFSET_MINUTES);
    expect(recurringPeriodStart(new Date("2026-10-07T12:00:00.000Z"), close.everyMinutes, close.offsetMinutes).toISOString()).toBe("2026-10-05T02:00:00.000Z");
    // Payloads are validated: a malformed week key is refused.
    expect(getJobHandler(LEADERBOARD_SNAPSHOT_JOB)!.schema.safeParse({ weekKey: "2026-41" }).success).toBe(false);
    expect(getJobHandler(LEADERBOARD_SNAPSHOT_JOB)!.schema.safeParse({ periodStart: "2026-10-05T02:20:00.000Z" }).success).toBe(true);
  });
});
