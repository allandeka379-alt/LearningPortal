// Bundles the background worker (src/worker/index.ts) into ONE self-contained ES module for the container image
// (docs/DEPLOYMENT.md "Worker entry"): `node scripts/build-worker.mjs [--outdir=build/worker]`.
//
// Why a bundle instead of `npm run worker` (tsx) in production:
// - the runtime image stays the slim Next standalone image: no TypeScript sources, no tsx/esbuild, no dev dependencies;
// - `node build/worker/index.mjs` is a single process, so SIGTERM reaches the worker's graceful-shutdown handler
//   directly (npm -> sh -> tsx -> node relays signals through three layers);
// - no transpilation at boot.
//
// The bundle resolves the `react-server` export condition exactly like `tsx --conditions=react-server` does (the
// `server-only` package is then an empty module) and the `@/*` path alias from tsconfig.json. Native addons stay
// external and are loaded from the image's node_modules at runtime (the Dockerfile copies them next to the bundle).
//
// esbuild is not a direct dependency: it is the exact version tsx ships with (package-lock), which is always installed
// because tsx runs the seed, the grants script and `npm run worker`.
import { build } from "esbuild";
import { mkdirSync, rmSync, statSync } from "node:fs";
import path from "node:path";

/** Native addons (and their optional fallbacks) that must be required from node_modules at runtime. */
export const WORKER_EXTERNALS = ["sharp", "@node-rs/argon2", "pg-native"];

function outdirFromArgs(argv) {
  const flag = argv.find((arg) => arg.startsWith("--outdir="));
  return path.resolve(flag ? flag.slice("--outdir=".length) : path.join("build", "worker"));
}

async function main() {
  const outdir = outdirFromArgs(process.argv.slice(2));
  rmSync(outdir, { recursive: true, force: true });
  mkdirSync(outdir, { recursive: true });

  const result = await build({
    entryPoints: { index: "src/worker/index.ts" },
    outdir,
    outExtension: { ".js": ".mjs" },
    bundle: true,
    platform: "node",
    target: "node24",
    format: "esm",
    // `server-only` resolves to its empty react-server entry, as under `tsx --conditions=react-server`.
    conditions: ["react-server"],
    mainFields: ["module", "main"],
    tsconfig: "tsconfig.json",
    external: WORKER_EXTERNALS,
    // CommonJS dependencies inside an ES module bundle still call require() for Node built-ins.
    banner: {
      js: "import { createRequire as __dzCreateRequire } from 'node:module'; const require = __dzCreateRequire(import.meta.url);",
    },
    // Production code paths only; process.env.NODE_ENV stays a runtime value (the worker reads it at boot).
    sourcemap: "linked",
    sourcesContent: false,
    legalComments: "linked",
    minifySyntax: true,
    logLevel: "warning",
    metafile: true,
  });

  const bytes = statSync(path.join(outdir, "index.mjs")).size;
  const inputs = Object.keys(result.metafile.inputs).length;
  console.log(`[build-worker] ${path.relative(process.cwd(), outdir)}/index.mjs: ${(bytes / 1024 / 1024).toFixed(1)} MB from ${inputs} modules`);
}

main().catch((error) => {
  console.error(`[build-worker] ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
