/**
 * Grants SUPER_ADMIN to the first administrator of a fresh production database (docs/DEPLOYMENT.md "Appendix: Railway").
 * The account must already exist (registered on the site, email verified). Refused once any active super admin exists.
 *
 *   npx tsx --conditions=react-server scripts/bootstrap-super-admin.ts --email <owner email>
 *
 * DATABASE_URL: the app role (app_rw) of the target database. Audited as a system `role.grant`.
 */
import path from "node:path";
import { config } from "dotenv";

config({ path: path.join(process.cwd(), ".env"), quiet: true });

async function main(): Promise<void> {
  const index = process.argv.indexOf("--email");
  const email = index >= 0 ? process.argv[index + 1] : undefined;
  if (!email) {
    console.error("Usage: npx tsx --conditions=react-server scripts/bootstrap-super-admin.ts --email <owner email>");
    process.exit(2);
  }
  const { bootstrapSuperAdmin } = await import("@/server/accounts/bootstrap-admin");
  const { db } = await import("@/server/db");
  try {
    const result = await bootstrapSuperAdmin(email);
    console.log(`Granted SUPER_ADMIN to user ${result.userId}; roles now ${result.roles.join(", ")}. Sign in again.`);
  } finally {
    await db.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
