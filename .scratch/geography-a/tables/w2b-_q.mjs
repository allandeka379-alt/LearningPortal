// Shared by the W2b slices: an MCQ whose first option is the key (the build rebalances key positions) and a pipe-table builder.
export const mc = (b, d, skill, stem, opts, explanation, o = {}) => b.mcq({ d, skill, stem, options: opts, answer: "A", explanation, ...o });
export const tbl = (headers, rows) =>
  [`| ${headers.join(" | ")} |`, `|${headers.map(() => "---").join("|")}|`, ...rows.map((r) => `| ${r.join(" | ")} |`)].join("\n");
