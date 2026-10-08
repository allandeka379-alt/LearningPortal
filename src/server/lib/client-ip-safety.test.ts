import { afterEach, describe, expect, it, vi } from "vitest";
import { clientIpBootReport, describeClientIpPolicy } from "./client-ip-safety";
import { logger } from "./logger";
import { clientIpFromHeaders, resetClientIpAnomalyReports } from "./request";

describe("clientIpBootReport (production boot check)", () => {
  it("warns when neither setting is set, naming the Cloudflare + ALB values", () => {
    const report = clientIpBootReport({ NODE_ENV: "production" });
    expect(report.policy).toBe("X-Forwarded-For entry 1 from the right");
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toMatch(/Neither TRUSTED_PROXY_HOPS nor CLIENT_IP_HEADER/);
    expect(report.warnings[0]).toContain("TRUSTED_PROXY_HOPS=2");
    expect(report.warnings[0]).toContain("CLIENT_IP_HEADER=cf-connecting-ip");
    // Blank values count as unset (as in env.ts).
    expect(clientIpBootReport({ TRUSTED_PROXY_HOPS: " ", CLIENT_IP_HEADER: "" }).warnings[0]).toMatch(/Neither/);
  });

  it("is quiet for the documented Cloudflare + ALB configurations and reports the policy in force", () => {
    expect(clientIpBootReport({ TRUSTED_PROXY_HOPS: "2" })).toEqual({ policy: "X-Forwarded-For entry 2 from the right", warnings: [] });
    expect(clientIpBootReport({ CLIENT_IP_HEADER: "CF-Connecting-IP" })).toEqual({ policy: "header cf-connecting-ip", warnings: [] });
    expect(clientIpBootReport({ TRUSTED_PROXY_HOPS: "1" }).warnings).toEqual([]);
  });

  it("flags both set, client-controlled or overwrite-dependent headers, and implausible hop counts", () => {
    expect(clientIpBootReport({ TRUSTED_PROXY_HOPS: "2", CLIENT_IP_HEADER: "cf-connecting-ip" }).warnings).toEqual([expect.stringMatching(/Both .* TRUSTED_PROXY_HOPS is ignored/)]);
    expect(clientIpBootReport({ CLIENT_IP_HEADER: "X-Forwarded-For" }).warnings).toEqual([expect.stringMatching(/clients can write/)]);
    expect(clientIpBootReport({ CLIENT_IP_HEADER: "x-real-ip" }).warnings).toEqual([expect.stringMatching(/overwrites it on every request/)]);
    expect(clientIpBootReport({ TRUSTED_PROXY_HOPS: "5" }).warnings).toEqual([expect.stringMatching(/more appending proxies than usual/)]);
  });

  it("describes both kinds of policy", () => {
    expect(describeClientIpPolicy({ trustedProxyHops: 2, clientIpHeader: null })).toBe("X-Forwarded-For entry 2 from the right");
    expect(describeClientIpPolicy({ trustedProxyHops: 1, clientIpHeader: "cf-connecting-ip" })).toBe("header cf-connecting-ip");
  });
});

describe("runtime client IP anomalies (one warning per process)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    resetClientIpAnomalyReports();
  });

  it("warns once when X-Forwarded-For is shorter than TRUSTED_PROXY_HOPS (clients could forge their address)", () => {
    const warn = vi.spyOn(logger, "warn").mockImplementation(() => undefined);
    const policy = { trustedProxyHops: 2, clientIpHeader: null };
    expect(clientIpFromHeaders(new Headers({ "x-forwarded-for": "196.27.10.5" }), policy)).toBeNull();
    expect(clientIpFromHeaders(new Headers({ "x-forwarded-for": "41.57.1.2" }), policy)).toBeNull();
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("fewer entries than TRUSTED_PROXY_HOPS"), { entries: 1, trustedProxyHops: 2, anomaly: "chain_shorter_than_hops" });
    // The address is never logged.
    expect(JSON.stringify(warn.mock.calls)).not.toContain("196.27.10.5");
    // A chain as long as the setting is normal.
    warn.mockClear();
    resetClientIpAnomalyReports();
    expect(clientIpFromHeaders(new Headers({ "x-forwarded-for": "196.27.10.5, 172.70.1.1" }), policy)).toBe("196.27.10.5");
    expect(warn).not.toHaveBeenCalled();
  });

  it("warns once when the configured client IP header is missing", () => {
    const warn = vi.spyOn(logger, "warn").mockImplementation(() => undefined);
    const policy = { trustedProxyHops: 1, clientIpHeader: "cf-connecting-ip" };
    expect(clientIpFromHeaders(new Headers({ "x-forwarded-for": "196.27.10.5" }), policy)).toBeNull();
    expect(clientIpFromHeaders(new Headers({}), policy)).toBeNull();
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("missing on a request"), { header: "cf-connecting-ip", anomaly: "header_missing" });
    expect(clientIpFromHeaders(new Headers({ "cf-connecting-ip": "41.57.1.2" }), policy)).toBe("41.57.1.2");
  });
});
