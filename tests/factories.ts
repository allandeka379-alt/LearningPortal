/**
 * Compatibility entry point: module resolution prefers this file over the `tests/factories/` directory for a bare
 * `tests/factories` import, so it re-exports the whole factory barrel. New code may import either path.
 *
 * Rules (tests/README.md): test files run in parallel against one shared, never-truncated test database. Build fixture
 * values with the unique-value helpers and assert only on rows your test created.
 */
export * from "./factories/index";
