/**
 * Test fixture factories. Import from this barrel:
 *
 *   import { createStudent, createCurriculumChain } from "<relative path>/tests/factories/index";
 *
 * A bare `tests/factories` import resolves to `tests/factories.ts`, which re-exports this barrel, so both paths work.
 *
 * Rules (tests/README.md): test files run in parallel against one shared test database that is never truncated. Every
 * factory uses unique values and returns the rows it created; assert only on rows your test created.
 */
export * from "./util";
export * from "./identity";
export * from "./curriculum";
export * from "./questions";
export * from "./learning";
