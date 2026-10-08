import { describe, expect, it } from "vitest";
import { recurringJobs, registeredJobTypes } from "@/server/lib/jobs";
import { registerAllJobs } from "./handlers";

/** The worker registers every domain's handlers and schedules in one place (src/worker/handlers.ts). */
describe("registerAllJobs", () => {
  it("registers the WhatsApp channel's jobs alongside the others, and is idempotent", () => {
    registerAllJobs();
    registerAllJobs();
    const types = registeredJobTypes();
    for (const type of ["whatsapp.process", "whatsapp.send", "whatsapp.purge", "maintenance.purgeRateLimitBuckets", "notifications.send"]) {
      expect(types, type).toContain(type);
    }
    expect(new Set(types).size).toBe(types.length);
    expect(recurringJobs().map((job) => job.type)).toContain("whatsapp.purge");
    // PRIV-02: data exports, deletions after the grace period, and the solver-photo / AI-text retention purge.
    for (const type of ["accounts.exportData", "accounts.privacySweep", "accounts.retentionPurge"]) expect(types, type).toContain(type);
    expect(recurringJobs().map((job) => job.type)).toEqual(expect.arrayContaining(["accounts.privacySweep", "accounts.retentionPurge"]));
  });

  it("registers the AI budget alert and the 90-day import-file purge", () => {
    registerAllJobs();
    expect(registeredJobTypes()).toEqual(expect.arrayContaining(["ai.budgetAlert", "imports.purgeFiles"]));
    expect(recurringJobs().find((job) => job.name === "imports.purgeFiles")).toMatchObject({ everyMinutes: 1440, offsetMinutes: 145 });
    // The alert is event-driven (the gateway hook), never scheduled.
    expect(recurringJobs().some((job) => job.type === "ai.budgetAlert")).toBe(false);
  });

  it("registers the event-driven SMS budget alert (AUTH-05)", () => {
    registerAllJobs();
    expect(registeredJobTypes()).toContain("messaging.smsBudgetAlert");
    expect(recurringJobs().some((job) => job.type === "messaging.smsBudgetAlert")).toBe(false);
  });
});
