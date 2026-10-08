/**
 * FormData → plain object for the curriculum Server Actions (validated with ./schemas afterwards).
 *
 * - Repeated keys become arrays (`componentIds=a&componentIds=b` → `{ componentIds: ["a", "b"] }`).
 * - Dotted keys with numeric segments nest (`bands.0.label` → `{ bands: [{ label }] }`), so list editors (grade bands,
 *   route papers) post ordinary inputs and still validate per row with `bands.0.label`-style field errors.
 * - Files and Next.js internal fields (`$ACTION_…`) are ignored.
 */

type Json = string | Json[] | { [key: string]: Json };

const MAX_KEYS = 2000;
const UNSAFE_KEYS = new Set(["__proto__", "prototype", "constructor"]);

function assign(target: Record<string, Json> | Json[], path: string[], value: string): void {
  const [head, ...rest] = path;
  if (head === undefined || UNSAFE_KEYS.has(head)) return;
  const container = target as Record<string, Json>;
  if (rest.length === 0) {
    const existing = container[head];
    if (existing === undefined) container[head] = value;
    else if (Array.isArray(existing)) existing.push(value);
    else if (typeof existing === "string") container[head] = [existing, value];
    return;
  }
  const nextIsIndex = /^\d+$/.test(rest[0] as string);
  let child = container[head];
  if (child === undefined || typeof child === "string") {
    child = nextIsIndex ? [] : {};
    container[head] = child;
  }
  assign(child as Record<string, Json>, rest, value);
}

/** Plain object of a submitted form (see module docs). */
export function formDataToObject(formData: FormData): Record<string, unknown> {
  const result: Record<string, Json> = {};
  let count = 0;
  for (const [key, value] of formData.entries()) {
    if (typeof value !== "string" || key.startsWith("$ACTION") || key.startsWith("$")) continue;
    count += 1;
    if (count > MAX_KEYS) break;
    const path = key.split(".").filter((segment) => segment !== "");
    if (path.length === 0 || path.length > 6) continue;
    assign(result, path, value);
  }
  return compactArrays(result) as Record<string, unknown>;
}

/** Sparse arrays from `bands.0`, `bands.3` become dense (removed rows leave no holes). */
function compactArrays(value: Json): Json {
  if (Array.isArray(value)) return value.filter((item) => item !== undefined).map(compactArrays);
  if (typeof value === "object") {
    const out: Record<string, Json> = {};
    for (const [key, item] of Object.entries(value)) out[key] = compactArrays(item);
    return out;
  }
  return value;
}
