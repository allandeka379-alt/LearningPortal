/**
 * JSON projection of service read models for the REST API (`/api/v1`). Services return `Date` objects and occasionally
 * `undefined` fields; the wire format is plain JSON with ISO 8601 timestamps. Converting explicitly (instead of relying
 * on `JSON.stringify` inside `Response.json`) gives handlers a typed, test-checkable value and fails loudly on values
 * JSON cannot carry. Pure: no I/O.
 *
 * - `Date` → ISO 8601 string (`toISOString()`, always UTC with `Z`); an invalid date becomes `null`.
 * - `undefined` object properties are dropped; `undefined` array entries become `null` (what JSON does).
 * - `bigint` → decimal string (JSON has no 64-bit integers).
 * - `Map` → object (string keys), `Set` → array.
 * - Objects with their own `toJSON()` (e.g. Prisma `Decimal`) are converted through it.
 * - Non-finite numbers become `null` (as `JSON.stringify` would).
 * - Functions and symbols throw: they indicate a read model that was never meant for the wire.
 */

type JsonPrimitive = string | number | boolean | null;

/** The JSON shape of `T` after {@link toJson}. Branded strings (e.g. `SanitizedHtml`) stay assignable to `string`. */
export type Jsonify<T> = T extends JsonPrimitive
  ? T
  : T extends undefined
    ? never
    : T extends Date
      ? string
      : T extends bigint
        ? string
        : T extends ReadonlyMap<unknown, infer V>
          ? Record<string, Jsonify<V>>
          : T extends ReadonlySet<infer V>
            ? Jsonify<V>[]
            : T extends readonly (infer U)[]
              ? Jsonify<U>[]
              : T extends object
                ? { [K in keyof T as T[K] extends (...args: never[]) => unknown ? never : K]: Jsonify<T[K]> }
                : never;

function convert(value: unknown, path: string, seen: Set<object>): unknown {
  if (value === null) return null;
  switch (typeof value) {
    case "string":
    case "boolean":
      return value;
    case "number":
      return Number.isFinite(value) ? value : null;
    case "bigint":
      return value.toString();
    case "undefined":
      return undefined;
    case "function":
    case "symbol":
      throw new TypeError(`toJson: ${typeof value} at ${path || "<root>"} cannot be sent as JSON`);
    default:
      break;
  }
  const object = value as object;
  if (object instanceof Date) return Number.isFinite(object.getTime()) ? object.toISOString() : null;
  if (seen.has(object)) throw new TypeError(`toJson: circular reference at ${path || "<root>"}`);
  seen.add(object);
  try {
    if (Array.isArray(object)) {
      return object.map((item, index) => {
        const converted = convert(item, `${path}[${index}]`, seen);
        return converted === undefined ? null : converted;
      });
    }
    if (object instanceof Map) {
      const out: Record<string, unknown> = {};
      for (const [key, item] of object) {
        const converted = convert(item, `${path}.${String(key)}`, seen);
        if (converted !== undefined) out[String(key)] = converted;
      }
      return out;
    }
    if (object instanceof Set) return convert([...object], path, seen);
    const toJSON = (object as { toJSON?: unknown }).toJSON;
    if (typeof toJSON === "function") return convert((toJSON as () => unknown).call(object), path, seen);
    const out: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(object)) {
      const converted = convert(item, path ? `${path}.${key}` : key, seen);
      if (converted !== undefined) out[key] = converted;
    }
    return out;
  } finally {
    seen.delete(object);
  }
}

/**
 * Deep-converts a read model to plain JSON values (module doc).
 *
 * @throws TypeError for functions, symbols and circular references.
 */
export function toJson<T>(value: T): Jsonify<T> {
  return convert(value, "", new Set()) as Jsonify<T>;
}
