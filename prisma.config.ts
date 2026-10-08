import "dotenv/config";
import { defineConfig, env } from "prisma/config";

/**
 * Prisma CLI configuration (migrate, studio, generate).
 * The CLI runs as the database OWNER (MIGRATION_DATABASE_URL) because migrations create tables, functions and
 * triggers; the application connects separately as the restricted app role (DATABASE_URL, see src/server/db.ts).
 * Falls back to DATABASE_URL for single-role setups.
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx --conditions=react-server prisma/seed.ts",
  },
  datasource: {
    url: process.env.MIGRATION_DATABASE_URL || env("DATABASE_URL"),
  },
});
