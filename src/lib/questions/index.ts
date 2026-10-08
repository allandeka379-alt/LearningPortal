/**
 * Question-bank contracts (§9, §10, §42): isomorphic Zod schemas and types for question payloads, answer specs and
 * student responses, plus the client-safe projection. Safe to import from Client Components EXCEPT that answer specs
 * must never be shipped to a student's browser before submission — use `toStudentView` for anything a student sees.
 *
 * Marking lives in `src/server/marking`; DB access in `src/server/questions`.
 */
export * from "./constants";
export * from "./types";
export * from "./payload";
export * from "./answer-spec";
export * from "./response";
export * from "./parse";
export * from "./student-view";
export * from "./answer-display";
export * from "./validate";
export * from "./number";
export * from "./units";
export * from "./text";
export * from "./tolerance";
export * from "./safe-pattern";
export * from "./primitives";
