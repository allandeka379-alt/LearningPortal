import { describe, expect, it } from "vitest";
import {
  dimension,
  dimensionValue,
  isValidMetricKey,
  METRIC,
  NO_DIMENSION,
  OWNED_METRICS,
  parseDimension,
  RETENTION_DAYS,
  retentionMetrics,
} from "./metrics";

describe("metric registry", () => {
  it("only registers keys accepted by the DailyMetric_metric_chk constraint", () => {
    for (const key of OWNED_METRICS) expect(isValidMetricKey(key), key).toBe(true);
    expect(new Set(OWNED_METRICS).size).toBe(OWNED_METRICS.length);
    expect(isValidMetricKey("Users.dau")).toBe(false);
    expect(isValidMetricKey("users..dau")).toBe(false);
    expect(isValidMetricKey("users.dau-7")).toBe(false);
    expect(isValidMetricKey(`a.${"b".repeat(70)}`)).toBe(false);
  });

  it("owns every metric and every retention window", () => {
    for (const key of Object.values(METRIC)) expect(OWNED_METRICS).toContain(key);
    for (const days of RETENTION_DAYS) {
      const keys = retentionMetrics(days);
      expect(keys).toEqual({ rate: `retention.d${days}`, cohort: `retention.d${days}.cohort`, retained: `retention.d${days}.retained` });
      for (const key of Object.values(keys)) expect(OWNED_METRICS).toContain(key);
    }
  });
});

describe("dimensions", () => {
  const id = "0199a1b2-c3d4-7e5f-8a9b-0c1d2e3f4a5b";

  it("builds kind:value pairs and rejects unsafe values", () => {
    expect(NO_DIMENSION).toBe("");
    expect(dimension("subject", id)).toBe(`subject:${id}`);
    expect(dimension("currency", "USD")).toBe("currency:USD");
    expect(dimension("plan", "STUDENT_PLUS")).toBe("plan:STUDENT_PLUS");
    expect(() => dimension("topic", "a|b")).toThrow(RangeError);
    expect(() => dimension("topic", "")).toThrow(RangeError);
    expect(() => dimension("channel", "web:1")).toThrow(RangeError);
  });

  it("parses dimensions and extracts single-kind values", () => {
    expect(parseDimension("")).toEqual({});
    expect(parseDimension(`school:${id}|subject:abc`)).toEqual({ school: id, subject: "abc" });
    expect(() => parseDimension("subject")).toThrow(RangeError);
    expect(() => parseDimension("subject:")).toThrow(RangeError);
    expect(dimensionValue(`topic:${id}`, "topic")).toBe(id);
    expect(dimensionValue(`topic:${id}`, "subject")).toBeNull();
    expect(dimensionValue(`school:${id}|subject:x`, "school")).toBeNull();
    expect(dimensionValue("topic:", "topic")).toBeNull();
  });
});
