// Test stand-in for the `server-only` package (aliased in vitest.config.ts).
//
// The real package throws when it is imported outside a React Server environment, which is exactly what we want in
// the Next.js bundle and exactly what we do not want in Vitest, where server modules are imported directly.
export {};
