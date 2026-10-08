import { afterEach, describe, expect, it, vi } from "vitest";
import { resetReadinessCache } from "@/server/ops/readiness";
import * as readiness from "@/server/ops/readiness";
import { dynamic, GET } from "./route";

afterEach(() => {
  vi.restoreAllMocks();
  resetReadinessCache();
});

describe("GET /api/ready (readiness)", () => {
  it("answers 200 against the migrated test database", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    const body = (await response.json()) as { status: string; checks: Record<string, { ok: boolean }> };
    expect(body.status).toBe("ready");
    expect(Object.keys(body.checks).sort()).toEqual(["database", "dbSafety", "migrations"]);
    expect(dynamic).toBe("force-dynamic");
  });

  it("answers 503 with the report when the instance is not ready", async () => {
    vi.spyOn(readiness, "getReadiness").mockResolvedValue({
      status: "not_ready",
      checkedAt: "2026-10-06T12:00:00.000Z",
      checks: {
        database: { ok: true, latencyMs: 1 },
        migrations: { ok: false, expected: 8, applied: 7, pending: 1, failed: 0, ahead: 0 },
        dbSafety: { ok: true, enforced: true, failures: 0, warnings: 0 },
      },
    });
    const response = await GET();
    expect(response.status).toBe(503);
    expect(((await response.json()) as { checks: { migrations: { pending: number } } }).checks.migrations.pending).toBe(1);
  });
});
