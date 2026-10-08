import { describe, expect, it, vi } from "vitest";

const { incoming } = vi.hoisted(() => ({ incoming: new Headers() }));
vi.mock("next/headers", () => ({ headers: async () => incoming }));

const {
  clientIpFromHeaders,
  clientIpPolicyFromEnv,
  DEFAULT_CLIENT_IP_POLICY,
  getClientIp,
  getRequestContext,
  getRequestId,
  getUserAgent,
  requestContextFromHeaders,
  requestIdFromHeaders,
  userAgentFromHeaders,
} = await import("./request");
const { isValidRequestId, resolveRequestId } = await import("./request-id");

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

describe("clientIpFromHeaders", () => {
  const ONE_PROXY = DEFAULT_CLIENT_IP_POLICY;
  it.each([
    [{ "x-forwarded-for": "196.27.10.5" }, "196.27.10.5"],
    [{ "x-forwarded-for": " 10.0.0.1, 10.0.0.2 , 196.27.10.5 " }, "196.27.10.5"],
    [{ "x-forwarded-for": "196.27.10.5:51234" }, "196.27.10.5"],
    [{ "x-forwarded-for": "2001:DB8::1" }, "2001:db8::1"],
    [{ "x-forwarded-for": "[2001:db8::1]:443" }, "2001:db8::1"],
    [{ "x-forwarded-for": "::ffff:196.27.10.5" }, "196.27.10.5"],
    // X-Real-IP is client-controlled unless the edge sets it: only read when configured as CLIENT_IP_HEADER.
    [{ "x-forwarded-for": "10.0.0.1, unknown", "x-real-ip": "41.57.1.2" }, null],
    [{ "x-real-ip": "41.57.1.2" }, null],
    [{ "x-forwarded-for": "not-an-ip" }, null],
    [{ "x-forwarded-for": "999.1.1.1" }, null],
    [{}, null],
  ])("%j -> %s", (init, expected) => {
    expect(clientIpFromHeaders(new Headers(init), ONE_PROXY)).toBe(expected);
  });

  it("ignores addresses a client prepends to X-Forwarded-For (the edge appends the real one)", () => {
    // Client sent "X-Forwarded-For: 198.51.100.77"; Cloudflare appended the real client 41.57.1.2; the ALB appended
    // the Cloudflare edge 172.70.1.1.
    const headers = new Headers({ "x-forwarded-for": "198.51.100.77, 41.57.1.2, 172.70.1.1" });
    expect(clientIpFromHeaders(headers, { trustedProxyHops: 2, clientIpHeader: null })).toBe("41.57.1.2");
    expect(clientIpFromHeaders(headers, ONE_PROXY)).toBe("172.70.1.1");
    expect(clientIpFromHeaders(headers, ONE_PROXY)).not.toBe("198.51.100.77");
    // Rotating the forged prefix never changes the result.
    const rotated = new Headers({ "x-forwarded-for": "203.0.113.9, 41.57.1.2, 172.70.1.1" });
    expect(clientIpFromHeaders(rotated, { trustedProxyHops: 2, clientIpHeader: null })).toBe("41.57.1.2");
  });

  it("fails closed when the chain is shorter than the trusted proxies (request bypassed the edge)", () => {
    expect(clientIpFromHeaders(new Headers({ "x-forwarded-for": "198.51.100.77" }), { trustedProxyHops: 2, clientIpHeader: null })).toBeNull();
  });

  it("reads only the configured edge header when CLIENT_IP_HEADER is set", () => {
    const policy = { trustedProxyHops: 1, clientIpHeader: "cf-connecting-ip" };
    expect(clientIpFromHeaders(new Headers({ "cf-connecting-ip": "41.57.1.2", "x-forwarded-for": "198.51.100.77" }), policy)).toBe("41.57.1.2");
    expect(clientIpFromHeaders(new Headers({ "x-forwarded-for": "198.51.100.77" }), policy)).toBeNull();
  });

  it("parses the policy from the environment without throwing", () => {
    expect(clientIpPolicyFromEnv({})).toEqual({ trustedProxyHops: 1, clientIpHeader: null });
    expect(clientIpPolicyFromEnv({ TRUSTED_PROXY_HOPS: "2", CLIENT_IP_HEADER: "CF-Connecting-IP" })).toEqual({
      trustedProxyHops: 2,
      clientIpHeader: "cf-connecting-ip",
    });
    expect(clientIpPolicyFromEnv({ TRUSTED_PROXY_HOPS: "0", CLIENT_IP_HEADER: "bad header" })).toEqual({ trustedProxyHops: 1, clientIpHeader: null });
  });
});

describe("userAgentFromHeaders", () => {
  it("returns a trimmed, length-capped user agent or null", () => {
    expect(userAgentFromHeaders(new Headers({ "user-agent": " Mozilla/5.0 " }))).toBe("Mozilla/5.0");
    expect(userAgentFromHeaders(new Headers({ "user-agent": "x".repeat(2000) }))).toHaveLength(512);
    expect(userAgentFromHeaders(new Headers({ "user-agent": "   " }))).toBeNull();
    expect(userAgentFromHeaders(new Headers())).toBeNull();
  });
});

describe("request ids", () => {
  it("keeps well-formed upstream ids", () => {
    expect(isValidRequestId("3f2a9c1e-0b7d-4c1e-9a7b-1234567890ab")).toBe(true);
    expect(isValidRequestId("Root=1-67891233-abcdef012345678912345678")).toBe(false);
    expect(requestIdFromHeaders(new Headers({ "x-request-id": "edge.req:123456" }))).toBe("edge.req:123456");
  });

  it("replaces missing, short, long or unsafe ids with a UUID", () => {
    for (const value of [null, undefined, "", "short", "a".repeat(200), "id with spaces", 'id"quote\ninject']) {
      expect(resolveRequestId(value)).toMatch(UUID);
    }
    expect(requestIdFromHeaders(new Headers())).toMatch(UUID);
  });
});

describe("request context", () => {
  it("combines id, ip and user agent from headers", () => {
    const context = requestContextFromHeaders(
      new Headers({ "x-request-id": "req-12345678", "x-forwarded-for": "196.27.10.5", "user-agent": "UA" }),
    );
    expect(context).toEqual({ requestId: "req-12345678", ip: "196.27.10.5", userAgent: "UA" });
  });

  it("reads the current request through next/headers", async () => {
    incoming.set("x-request-id", "req-abcdefgh");
    // Default policy (one appending proxy): the right-most entry; the client-supplied left part is ignored.
    incoming.set("x-forwarded-for", "10.0.0.1, 41.57.1.2");
    incoming.set("user-agent", "Opera Mini");
    await expect(getRequestId()).resolves.toBe("req-abcdefgh");
    await expect(getClientIp()).resolves.toBe("41.57.1.2");
    await expect(getUserAgent()).resolves.toBe("Opera Mini");
    await expect(getRequestContext()).resolves.toEqual({
      requestId: "req-abcdefgh",
      ip: "41.57.1.2",
      userAgent: "Opera Mini",
    });
  });
});
