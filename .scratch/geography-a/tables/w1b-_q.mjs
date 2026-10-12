// Tiny shortcut shared by the W1b slices: an MCQ whose first option is the key (the build rebalances key positions).
export const mc = (b, d, skill, stem, opts, explanation, o = {}) => b.mcq({ d, skill, stem, options: opts, answer: "A", explanation, ...o });

// Pipe-table builder for stems: rows are arrays of cells.
export const tbl = (headers, rows) =>
  [`| ${headers.join(" | ")} |`, `|${headers.map(() => "---").join("|")}|`, ...rows.map((r) => `| ${r.join(" | ")} |`)].join("\n");
