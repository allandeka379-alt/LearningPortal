import { describe, expect, it } from "vitest";
import { registerSharingJobs, SHARING_PURGE_JOB } from "@/server/sharing/jobs";
import { getJobHandler, recurringJobs } from "@/server/lib/jobs";
import { registerReferralJobs } from "./jobs";
import { REFERRAL_QUALIFY_JOB, REFERRAL_SWEEP_JOB } from "./service";

describe("referral and sharing jobs", () => {
  it("registers qualification, the 6-hourly sweep and the daily share purge", () => {
    registerReferralJobs();
    registerSharingJobs();
    expect(getJobHandler(REFERRAL_QUALIFY_JOB)).toMatchObject({ queue: "default", maxAttempts: 5 });
    expect(getJobHandler(REFERRAL_QUALIFY_JOB)!.schema.safeParse({ referredUserId: "not-a-uuid" }).success).toBe(false);
    expect(getJobHandler(REFERRAL_QUALIFY_JOB)!.schema.safeParse({ referredUserId: "01a10f6a-cfb9-7669-82d1-bfe138934df6" }).success).toBe(true);
    expect(getJobHandler(REFERRAL_SWEEP_JOB)).toMatchObject({ queue: "default" });
    expect(getJobHandler(SHARING_PURGE_JOB)).toMatchObject({ queue: "default" });
    const schedules = Object.fromEntries(recurringJobs().map((job) => [job.name, job]));
    expect(schedules[REFERRAL_SWEEP_JOB]).toMatchObject({ everyMinutes: 360, offsetMinutes: 45 });
    expect(schedules[SHARING_PURGE_JOB]).toMatchObject({ everyMinutes: 1440, offsetMinutes: 90 });
  });
});
