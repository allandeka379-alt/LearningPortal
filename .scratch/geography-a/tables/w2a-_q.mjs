// Shared shortcuts for the W2a slices: an MCQ whose first option is the key (the build rebalances key positions) and a pipe-table builder.
export const mc = (b, d, skill, stem, opts, explanation, o = {}) => b.mcq({ d, skill, stem, options: opts, answer: "A", explanation, ...o });
export const tbl = (headers, rows) =>
  [`| ${headers.join(" | ")} |`, `|${headers.map(() => "---").join("|")}|`, ...rows.map((r) => `| ${r.join(" | ")} |`)].join("\n");
export const sgn = (v) => (v > 0 ? `+${v}` : v < 0 ? `−${Math.abs(v)}` : "0");
