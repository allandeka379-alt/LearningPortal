import type { Issue } from "./issues";
import type { ValidationResult } from "./validate";

/** Plain-text reports for the content CLIs (no colours: output is often piped to files and CI logs). Pure. */

export function table(headers: readonly string[], rows: readonly (readonly (string | number)[])[]): string {
  const cells = [headers, ...rows].map((row) => row.map((cell) => String(cell)));
  const widths = headers.map((_, column) => Math.max(...cells.map((row) => (row[column] ?? "").length)));
  // Numeric columns are right-aligned, text columns left-aligned.
  const numeric = headers.map((_, column) => rows.length > 0 && rows.every((row) => typeof row[column] === "number" || /^\d+(\/\d+)?$/.test(String(row[column] ?? ""))));
  const line = (row: readonly string[]) =>
    row.map((cell, column) => (numeric[column] ? cell.padStart(widths[column] ?? 0) : cell.padEnd(widths[column] ?? 0))).join("  ").trimEnd();
  return [line(cells[0] as string[]), widths.map((w) => "-".repeat(w)).join("  "), ...cells.slice(1).map(line)].join("\n");
}

/** Issues grouped by file: `  ERROR  key  field  [code] message`. */
export function formatIssues(issues: readonly Issue[], options: { limit?: number } = {}): string {
  const limit = options.limit ?? 2_000;
  const out: string[] = [];
  let currentFile = "";
  for (const issue of issues.slice(0, limit)) {
    if (issue.file !== currentFile) {
      currentFile = issue.file;
      out.push("", issue.file);
    }
    const where = [issue.key, issue.line !== undefined ? `line ${issue.line}` : null, issue.field].filter(Boolean).join(" · ");
    out.push(`  ${issue.severity === "error" ? "ERROR  " : "warning"}  ${where ? `${where}  ` : ""}[${issue.code}] ${issue.message}`);
  }
  if (issues.length > limit) out.push("", `… and ${issues.length - limit} more.`);
  return out.join("\n");
}

const TYPE_ABBREVIATIONS: Readonly<Record<string, string>> = {
  MULTIPLE_CHOICE: "MCQ",
  TRUE_FALSE: "T/F",
  SHORT_ANSWER: "short",
  NUMERICAL: "num",
  STRUCTURED: "struct",
  ESSAY: "essay",
  CALCULATION: "calc",
  MATCHING: "match",
  FILL_IN_THE_BLANK: "blanks",
  DIAGRAM_LABELLING: "diagram",
  EXTENDED_RESPONSE: "extended",
};

export function formatSummary(result: ValidationResult): string {
  const families = table(
    ["Family", "Lessons", "Questions", "Flashcards", "Assessments", "Concepts with content", "Concepts in syllabi"],
    result.families.map((f) => [
      f.family,
      f.lessons,
      f.questions,
      f.flashcards,
      f.assessments,
      `${f.conceptsWithContent}/${f.concepts}`,
      `${f.conceptsInSyllabi}/${f.concepts}`,
    ]),
  );
  const types = result.families
    .filter((f) => f.questions > 0)
    .map((f) => `  ${f.family}: ${Object.entries(f.questionsByType).sort(([a], [b]) => (a < b ? -1 : 1)).map(([type, n]) => `${TYPE_ABBREVIATIONS[type] ?? type} ${n}`).join(", ")}`);
  const syllabi = table(
    ["Syllabus version", "Family", "Topics", "Objectives", "Concepts", "With content"],
    result.syllabi.map((s) => [s.path, s.family, s.topics, s.objectives, s.concepts, `${s.conceptsWithContent}/${s.concepts}`]),
  );
  return [
    families,
    ...(types.length > 0 ? ["", "Questions by type:", ...types] : []),
    "",
    syllabi,
    "",
    `${result.tree.fileCount} files, ${result.checkedItems} items checked (${result.cachedItems} from cache) in ${(result.durationMs / 1000).toFixed(1)} s: ` +
      `${result.errorCount} error(s), ${result.warningCount} warning(s).`,
  ].join("\n");
}
