import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // XSS guard (§39): sanitized HTML is rendered in exactly one audited place (RichContent).
      "react/no-danger": "error",
    },
  },
  {
    files: ["src/components/content/RichContent.tsx"],
    rules: { "react/no-danger": "off" },
  },
  {
    // Raw SQL with string interpolation bypasses parameterisation (§39 SQL injection prevention).
    rules: {
      "no-restricted-properties": [
        "error",
        { property: "$queryRawUnsafe", message: "Use the $queryRaw tagged template (parameterised)." },
        { property: "$executeRawUnsafe", message: "Use the $executeRaw tagged template (parameterised)." },
      ],
    },
  },
  {
    // AI cost control (§40): every model call goes through the gateway (quota, routing, metering, caching).
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/server/ai/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [{ name: "@anthropic-ai/sdk", message: "Call models through src/server/ai (gateway) only." }],
          patterns: [
            {
              group: ["@anthropic-ai/sdk/*", "@/server/ai/transport", "@/server/ai/client", "@/server/ai/request"],
              message: "Use the AI gateway (src/server/ai/index.ts), not its internals.",
            },
          ],
        },
      ],
    },
  },
  globalIgnores([".next/**", ".next-*/**", "out/**", "build/**", "next-env.d.ts", "src/generated/**", ".data/**", ".scratch/**", "coverage/**"]),
]);
