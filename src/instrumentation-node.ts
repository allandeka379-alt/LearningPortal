/**
 * Node.js-only boot checks, loaded by `register()` in ./instrumentation.ts. Kept in a separate module so the Edge
 * compilation of the instrumentation hook never sees Node APIs such as `process.exit` (Next warns otherwise).
 *
 * Validates the environment (fail fast at startup, ARCHITECTURE §5.11). In production it also runs the database boot
 * assertions (raw SQL section D, ARCHITECTURE §4.12): the app role must not be a superuser or BYPASSRLS, must not be
 * able to rewrite `AuditLog`, and `app.environment` must be 'production'. If any check fails the process exits with a
 * message naming the fix. It also reports the client-IP policy in force and warns about risky client-IP settings
 * (src/server/lib/client-ip-safety.ts; every IP rate limit depends on them).
 */
export async function registerNode(): Promise<void> {
  const { getEnv } = await import("@/server/lib/env");
  getEnv();

  if (process.env.NODE_ENV === "production") {
    const { logger } = await import("@/server/lib/logger");
    const { clientIpBootReport } = await import("@/server/lib/client-ip-safety");
    const clientIp = clientIpBootReport(process.env);
    logger.info("client IP policy", { policy: clientIp.policy });
    for (const warning of clientIp.warnings) logger.warn("client IP configuration warning", { warning });
    const { assertDatabaseSafety } = await import("@/server/lib/db-safety");
    try {
      const report = await assertDatabaseSafety();
      for (const warning of report.warnings) logger.warn("database configuration warning", { warning });
    } catch (error) {
      logger.error("database safety check failed; refusing to start", { err: error });
      process.exit(1);
    }
  }
}
