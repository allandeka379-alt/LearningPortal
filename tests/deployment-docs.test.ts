import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { ENV_KEYS } from "@/server/lib/env";

/**
 * Keeps the deployment artifacts honest: the environment reference in docs/DEPLOYMENT.md must list exactly the keys of
 * the env contract, and a few invariants other code relies on must hold in the Dockerfile, .dockerignore and the
 * compose example (they are not executed by the unit tests).
 */

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file: string): string => readFileSync(path.join(root, file), "utf8");

/** Rows of the markdown table that follows `heading`, as their first-column code spans. */
function tableKeys(markdown: string, heading: string): string[] {
  const start = markdown.indexOf(heading);
  expect(start, `heading "${heading}" not found`).toBeGreaterThanOrEqual(0);
  const lines = markdown.slice(start).split("\n").slice(1);
  const keys: string[] = [];
  let inTable = false;
  for (const line of lines) {
    if (line.startsWith("|")) {
      inTable = true;
      for (const match of (line.split("|")[1] ?? "").matchAll(/`([A-Z0-9_*]+)`/g)) keys.push(match[1]!);
    } else if (inTable) {
      break;
    }
  }
  return keys;
}

describe("docs/DEPLOYMENT.md environment reference", () => {
  const doc = read("docs/DEPLOYMENT.md");

  it("documents exactly the keys validated by src/server/lib/env.ts", () => {
    const documented = tableKeys(doc, "### Application (validated by `src/server/lib/env.ts`)");
    expect([...documented].sort()).toEqual([...ENV_KEYS].sort());
  });

  it("documents every variable in .env.example", () => {
    const exampleKeys = [...read(".env.example").matchAll(/^([A-Z0-9_]+)=/gm)].map((match) => match[1]!);
    const documented = new Set([
      ...tableKeys(doc, "### Application (validated by `src/server/lib/env.ts`)"),
      ...tableKeys(doc, "### Process, build and tooling variables"),
    ]);
    expect(exampleKeys.filter((key) => !documented.has(key))).toEqual([]);
  });
});

describe("container artifacts", () => {
  it("ships what /api/ready and the worker need, as a non-root user", () => {
    const dockerfile = read("Dockerfile");
    expect(dockerfile).toMatch(/^FROM \$\{NODE_IMAGE\} AS runtime$/m);
    expect(dockerfile).toContain("ARG NODE_IMAGE=node:24-bookworm-slim");
    expect(dockerfile).toContain("COPY --from=build /app/prisma/migrations ./prisma/migrations");
    expect(dockerfile).toContain("COPY --from=build /app/build/worker ./worker");
    expect(dockerfile).toContain("COPY --from=build /app/node_modules/@img ./node_modules/@img");
    expect(dockerfile).toMatch(/^USER node$/m);
    expect(dockerfile).toMatch(/^HEALTHCHECK .*\n.*\/api\/health/m);
    // The build database URL is a BuildKit secret, never a build argument.
    expect(dockerfile).toContain("--mount=type=secret,id=build_database_url");
    expect(dockerfile).not.toMatch(/ARG\s+\w*DATABASE_URL/);
  });

  it("keeps secrets and local state out of the build context", () => {
    const ignored = read(".dockerignore").split("\n").map((line) => line.trim());
    for (const entry of [".env", ".env.*", "node_modules", ".next*", ".data", "storage", ".scratch", ".git"]) {
      expect(ignored).toContain(entry);
    }
  });

  it("connects the worker directly (LISTEN/NOTIFY) and the web through the pooler", () => {
    const compose = read("docker-compose.prod.example.yml");
    const service = (name: string): string => {
      const match = new RegExp(`\\n  ${name}:\\n([\\s\\S]*?)(?=\\n  [a-z]+:\\n|\\nconfigs:|\\nvolumes:)`).exec(compose);
      expect(match, `service ${name}`).not.toBeNull();
      return match![1]!;
    };
    expect(service("web")).toMatch(/DATABASE_URL: postgresql:\/\/app_rw:\$\{APP_DB_PASSWORD\}@pgbouncer:/);
    expect(service("worker")).toMatch(/DATABASE_URL: postgresql:\/\/app_rw:\$\{APP_DB_PASSWORD\}@postgres:/);
    expect(service("worker")).toContain('command: ["node", "--enable-source-maps", "worker/index.mjs"]');
    expect(service("migrate")).toMatch(/MIGRATION_DATABASE_URL: postgresql:\/\/dzidza_owner:/);
    expect(service("pgbouncer")).toContain("POOL_MODE: transaction");
  });
});
