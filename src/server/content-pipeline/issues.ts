/**
 * A problem found in the content source (validator) or while importing it. Errors block import; warnings are
 * reported but do not fail validation unless `--strict` is used. Pure data.
 */
export interface Issue {
  /** Path relative to the repository root (forward slashes). */
  file: string;
  /** Item key (lesson / question / flashcard / assessment / topic node), when the problem belongs to one item. */
  key?: string;
  /** Field path inside the item, e.g. `answerSpec.blanks.0.accepted` or `parts.(b).marks`. */
  field?: string;
  /** 1-based line in the file (lesson bodies). */
  line?: number;
  severity: "error" | "warning";
  /** Machine-readable rule id, e.g. `render`, `marking`, `concept-unknown`. */
  code: string;
  message: string;
}

export function issueSort(a: Issue, b: Issue): number {
  if (a.file !== b.file) return a.file < b.file ? -1 : 1;
  const ka = a.key ?? "";
  const kb = b.key ?? "";
  if (ka !== kb) return ka < kb ? -1 : 1;
  if ((a.line ?? 0) !== (b.line ?? 0)) return (a.line ?? 0) - (b.line ?? 0);
  return (a.field ?? "") < (b.field ?? "") ? -1 : (a.field ?? "") > (b.field ?? "") ? 1 : 0;
}

export function countErrors(issues: readonly Issue[]): number {
  return issues.filter((issue) => issue.severity === "error").length;
}

/** One-line description of an error for CLI reports: AppError message plus its field errors. */
export function describeError(error: unknown): string {
  if (error instanceof Error) {
    const fieldErrors = (error as { fieldErrors?: Record<string, string[]> }).fieldErrors;
    const fields = fieldErrors
      ? Object.entries(fieldErrors)
          .map(([field, messages]) => `${field}: ${messages.join(" ")}`)
          .join("; ")
      : "";
    return fields ? `${error.message} (${fields})` : error.message;
  }
  return String(error);
}
