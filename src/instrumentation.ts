/**
 * Next.js instrumentation hook: runs once per server instance at boot.
 * Validating the environment here makes a misconfigured deployment fail fast at startup instead of on the first
 * request that happens to call `getEnv()` (ARCHITECTURE §5.11). The Node.js-only work (environment validation and, in
 * production, the database boot assertions) lives in ./instrumentation-node.ts; the inline `NEXT_RUNTIME` check lets
 * the bundler drop that import from the Edge build.
 */
export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { registerNode } = await import("./instrumentation-node");
    await registerNode();
  }
}
