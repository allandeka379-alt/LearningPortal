import "server-only";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, type Prisma } from "@/generated/prisma/client";

/**
 * Prisma singleton (Prisma 7 + `pg` driver adapter).
 *
 * - One pool per process. In dev, the instance is cached on `globalThis` so hot reloads don't leak pools.
 * - Pool size is per app instance; production should sit behind a pooler (PgBouncer / managed pooler) so
 *   horizontally-scaled web nodes + the worker don't exhaust Postgres connections (see docs/ARCHITECTURE.md §9).
 * - Tests point DATABASE_URL at the test database before this module is first imported (tests/setup.ts).
 */
function createClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set. Copy .env.example to .env and run `npm run db:start`.");
  }
  const adapter = new PrismaPg({
    connectionString,
    max: Number(process.env.DATABASE_POOL_MAX ?? 10),
    // The pg adapter sends Date parameters as offset-less UTC wall-clock text and parses timestamptz results as UTC,
    // so the session time zone MUST be UTC. Otherwise (e.g. a cluster defaulting to Africa/Johannesburg) ORM-written
    // instants land 2 h early relative to now() and DB-side timestamps read back 2 h late, breaking every comparison
    // with now() in CHECKs, triggers, defaults and raw SQL. Also set on the role (ALTER ROLE ... SET TimeZone = 'UTC')
    // where a pooler drops startup options.
    options: "-c TimeZone=UTC",
  });
  return new PrismaClient({
    adapter,
    log: process.env.PRISMA_LOG_QUERIES === "1" ? ["query", "warn", "error"] : ["warn", "error"],
  });
}

const globalForPrisma = globalThis as unknown as { __dzPrisma?: PrismaClient };

export const db: PrismaClient = globalForPrisma.__dzPrisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__dzPrisma = db;
}

/** Transaction client type for services that accept either the root client or a transaction. */
export type DbClient = PrismaClient | Prisma.TransactionClient;
