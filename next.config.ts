import type { NextConfig } from "next";

/*
 * Loaded by Node's native TypeScript support (type stripping), so this file must stay self-contained and use only
 * erasable syntax: no enums, namespaces or parameter properties, and no imports of project modules.
 */

type HeaderEntry = { key: string; value: string };

/**
 * Content-Security-Policy WITHOUT nonces (ARCHITECTURE §5.7).
 *
 * Trade-off: Next.js App Router emits inline bootstrap scripts (`self.__next_f.push(...)`) on every page. Allowing
 * them with nonces would force every route to render dynamically (a nonce must be unique per response), which would
 * defeat static prerendering and CDN caching of the public SEO pages (§44) and slow pages on poor connections (§29).
 * So for now:
 * - `script-src 'self' 'unsafe-inline'`: inline scripts are allowed; XSS defence relies on React escaping, the
 *   sanitised content pipeline (rehype-sanitize before KaTeX, `trust: false`) and the single audited
 *   `dangerouslySetInnerHTML` site (`RenderedContent`). `'unsafe-eval'` is added ONLY in development (React uses
 *   eval to rebuild server error stacks).
 * - `style-src 'self' 'unsafe-inline'`: KaTeX output carries inline `style` attributes.
 * - No third-party origins at all; anything new (analytics, payment widgets, Google Identity) must be added here
 *   explicitly and reviewed.
 *
 * Hardening path (Phase 17): nonce-based `script-src 'nonce-…' 'strict-dynamic'` set by `src/proxy.ts` for the
 * dynamic, authenticated areas (/app, /admin, …) where every response is dynamic anyway, plus hashes / Subresource
 * Integrity (`experimental.sri`) for statically rendered public pages; then drop `'unsafe-inline'` for scripts.
 *
 * Gotcha: `form-action 'self'` also applies, in Chromium, to redirects that FOLLOW a form submission. Start Google
 * OAuth and payment-provider checkouts with a GET navigation (a link, or a Server Action returning a URL that the
 * client assigns to `location`), or add the provider origin to `form-action`.
 */
function contentSecurityPolicy(nodeEnv: string | undefined): string {
  const isDev = nodeEnv === "development";
  const isProd = nodeEnv === "production";
  const directives = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ];
  if (isProd) directives.push("upgrade-insecure-requests");
  return directives.join("; ");
}

/** Security headers applied to every route. HSTS only in production (browsers would pin http://localhost). */
function securityHeaders(nodeEnv: string | undefined): HeaderEntry[] {
  const headers: HeaderEntry[] = [
    { key: "Content-Security-Policy", value: contentSecurityPolicy(nodeEnv) },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "X-Frame-Options", value: "DENY" },
    // camera=(self): students photograph questions for the AI solver (§15). Nothing else is needed.
    { key: "Permissions-Policy", value: "camera=(self), microphone=(), geolocation=()" },
    // same-origin COOP isolates the browsing context; OAuth uses full-page redirects, not popups, so it is safe.
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  ];
  if (nodeEnv === "production") {
    // Two years. Add `preload` only once the production domain is final and submitted to the preload list.
    headers.push({ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" });
  }
  return headers;
}

const nextConfig: NextConfig = {
  // Parallel dev servers (one per verifier / workflow) each get their own build directory: NEXT_DIST_DIR=.next-<label>.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Self-contained server bundle for the container image (ARCHITECTURE §10): `<distDir>/standalone/server.js` plus
  // only the node_modules files it traces. The Dockerfile copies `public/` and `<distDir>/static/` next to it.
  output: "standalone",
  // The local storage driver resolves `<cwd>/storage` at runtime, which the file tracer cannot see through: without
  // these excludes it copies the whole dev `storage/` directory (uploads, generated reports) and the source of
  // src/server/lib (tests included) into the standalone output. Neither is read at runtime; production storage is an
  // S3-compatible driver and code is bundled. Note: Next also COPIES the `.env*` files present at build time into the
  // standalone folder, so image builds must exclude them from the build context (.dockerignore).
  outputFileTracingExcludes: {
    "*": ["storage/**/*", "src/**/*"],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  // Next 16.3 otherwise appends an auto-generated block to CLAUDE.md on every `next dev`; our CLAUDE.md is curated.
  agentRules: false,
  // A stray lockfile in the user's home directory makes Turbopack guess the wrong workspace root.
  turbopack: { root: process.cwd() },
  // Off for now: typed routes slow type-checking across many parallel route groups; revisit once routes settle.
  typedRoutes: false,

  // Native addon: must be required at runtime, not bundled.
  serverExternalPackages: ["@node-rs/argon2"],

  images: {
    formats: ["image/avif", "image/webp"],
    // No remote images: uploads and content media are served from our own origin (ARCHITECTURE §3.11).
    remotePatterns: [],
    // Only these local paths may be optimised. `search: ""` forbids query strings, so the optimiser cannot be made
    // to cache unlimited variants of one image (`?v=1`, `?v=2`, …): put cache-busting versions in the PATH.
    // Next adds `/_next/static/media/**` (static imports) automatically.
    localPatterns: [
      { pathname: "/api/media/**", search: "" },
      { pathname: "/icons/**", search: "" },
    ],
  },

  experimental: {
    serverActions: {
      // AI question-solver photo uploads are capped at 5 MB (ARCHITECTURE §3.11); the extra 1 MB covers multipart
      // overhead. Larger uploads go through the streamed `POST /api/v1/uploads` route handler instead.
      bodySizeLimit: "6mb",
    },
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders(process.env.NODE_ENV) }];
  },
};

export default nextConfig;
