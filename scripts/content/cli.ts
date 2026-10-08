/**
 * Shared argument parsing for the content pipeline CLIs (scripts/content/*.ts). Flags: `--name value`, `--name=value`
 * and boolean `--flag`; everything else is a positional argument.
 */
export interface ParsedArgs {
  positionals: string[];
  flags: Map<string, string | true>;
}

export function parseArgs(argv: readonly string[], booleanFlags: readonly string[] = []): ParsedArgs {
  const positionals: string[] = [];
  const flags = new Map<string, string | true>();
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i] as string;
    if (!arg.startsWith("--")) {
      positionals.push(arg);
      continue;
    }
    const eq = arg.indexOf("=");
    if (eq !== -1) {
      flags.set(arg.slice(2, eq), arg.slice(eq + 1));
      continue;
    }
    const name = arg.slice(2);
    const next = argv[i + 1];
    if (!booleanFlags.includes(name) && next !== undefined && !next.startsWith("--")) {
      flags.set(name, next);
      i += 1;
    } else {
      flags.set(name, true);
    }
  }
  return { positionals, flags };
}

export function stringFlag(args: ParsedArgs, name: string): string | undefined {
  const value = args.flags.get(name);
  return typeof value === "string" ? value : undefined;
}

export function listFlag(args: ParsedArgs, name: string): string[] {
  const value = stringFlag(args, name);
  return value ? value.split(",").map((v) => v.trim()).filter(Boolean) : [];
}

export function boolFlag(args: ParsedArgs, name: string): boolean {
  return args.flags.has(name);
}

/** Refuses unknown flags (typos such as --familly must not silently widen a publish). */
export function assertKnownFlags(args: ParsedArgs, known: readonly string[]): void {
  const unknown = [...args.flags.keys()].filter((name) => !known.includes(name));
  if (unknown.length > 0) throw new Error(`Unknown option(s): ${unknown.map((n) => `--${n}`).join(", ")}. Known: ${known.map((n) => `--${n}`).join(", ")}.`);
}
