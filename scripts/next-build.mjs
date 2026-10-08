// `npm run build`: runs `next build` with a 4 GB heap. The TypeScript step exceeds Node's ~2 GB default heap on this
// codebase (large generated Prisma client). NODE_OPTIONS is used (not a node flag) so Next's worker processes inherit
// it; extra arguments are passed through (e.g. `npm run build -- --debug`).
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");
const heap = "--max-old-space-size=4096";
const nodeOptions = [process.env.NODE_OPTIONS, heap].filter(Boolean).join(" ");

const result = spawnSync(process.execPath, [nextBin, "build", ...process.argv.slice(2)], {
  stdio: "inherit",
  env: { ...process.env, NODE_OPTIONS: nodeOptions },
});
process.exit(result.status ?? 1);
