import { describe, expect, it } from "vitest";
import { LATE_SYNC_GRACE_SECONDS } from "@/server/exams/timer";
import { attemptDueReason } from "./submit";

describe("auto-submit due decision (exams.autoSubmit)", () => {
  const startedAt = new Date("2026-10-05T08:00:00Z");
  const deadlineAt = new Date("2026-10-05T09:00:00Z");

  it("closes a timed attempt only after deadline + late-sync grace", () => {
    const open = { status: "IN_PROGRESS", startedAt, deadlineAt, lastSavedAt: startedAt };
    expect(attemptDueReason(open, new Date(deadlineAt.getTime() + 1_000))).toBeNull();
    expect(attemptDueReason(open, new Date(deadlineAt.getTime() + LATE_SYNC_GRACE_SECONDS * 1000))).toBeNull();
    expect(attemptDueReason(open, new Date(deadlineAt.getTime() + LATE_SYNC_GRACE_SECONDS * 1000 + 1_000))).toBe("TIME_EXPIRED");
    expect(attemptDueReason({ ...open, status: "MARKED" }, new Date("2026-10-06T00:00:00Z"))).toBeNull();
  });

  it("closes an untimed attempt after the idle window, measured from the last save", () => {
    const untimed = { status: "IN_PROGRESS", startedAt, deadlineAt: null, lastSavedAt: new Date("2026-10-05T09:30:00Z") };
    expect(attemptDueReason(untimed, new Date("2026-10-05T12:00:00Z"), 360)).toBeNull();
    expect(attemptDueReason(untimed, new Date("2026-10-05T15:31:00Z"), 360)).toBe("IDLE_TIMEOUT");
    expect(attemptDueReason(untimed, new Date("2026-10-05T10:31:00Z"), 60)).toBe("IDLE_TIMEOUT");
  });
});
