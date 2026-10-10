import { describe, expect, it } from "vitest";
import { cronWorkerOptions, isAuthorizedCronRequest } from "./cron-drain";

const secret = "s".repeat(40);

describe("isAuthorizedCronRequest", () => {
  it("accepts exactly Bearer <secret>", () => {
    expect(isAuthorizedCronRequest(`Bearer ${secret}`, secret)).toBe(true);
  });
  it("refuses a wrong, missing or differently formatted header", () => {
    expect(isAuthorizedCronRequest(`Bearer ${secret}x`, secret)).toBe(false);
    expect(isAuthorizedCronRequest(secret, secret)).toBe(false);
    expect(isAuthorizedCronRequest(null, secret)).toBe(false);
  });
  it("refuses everything when no secret is configured", () => {
    expect(isAuthorizedCronRequest("Bearer ", undefined)).toBe(false);
    expect(isAuthorizedCronRequest("Bearer undefined", undefined)).toBe(false);
  });
});

describe("cronWorkerOptions", () => {
  it("drains once with the scheduler on and LISTEN off", () => {
    const options = cronWorkerOptions("cron:1");
    expect(options).toMatchObject({ drain: true, scheduler: true, listen: false, workerId: "cron:1" });
    expect(options.shutdownTimeoutMs).toBeLessThanOrEqual(20_000);
  });
});
