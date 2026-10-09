// Tables for lessons/algorithms/validation-verification.md (w3b).

// WE1: mirror of the range-check REPEAT loop with inputs 105, -3, 72 (one row per input, output on the same row).
{
  const inputs = [105, -3, 72];
  const rows = [];
  let Mark;
  let k = 0;
  do {
    Mark = inputs[k++];
    const out = Mark < 0 || Mark > 100 ? "Invalid mark, try again" : "";
    rows.push([Mark, out]);
  } while (!(Mark >= 0 && Mark <= 100));
  rows.push(["", "Mark accepted"]);
  console.log("| Mark | OUTPUT |\n|:-:|:--|\n" + rows.map((r) => `| ${r[0]} | ${r[1]} |`).join("\n"));
}

// ISBN-13 check digit (fictional ISBN).
export function isbn13(d12) {
  const w = [...d12].map((c, i) => Number(c) * (i % 2 === 0 ? 1 : 3));
  const sum = w.reduce((a, b) => a + b, 0);
  return { w, sum, check: (10 - (sum % 10)) % 10 };
}
{
  const d12 = "978177906412";
  const r = isbn13(d12);
  console.log("| Digit | " + [...d12].join(" | ") + " |");
  console.log("|:--|" + [...d12].map(() => ":-:").join("|") + "|");
  console.log("| Weight | " + [...d12].map((_, i) => (i % 2 === 0 ? 1 : 3)).join(" | ") + " |");
  console.log("| Product | " + r.w.join(" | ") + " |");
  console.log("sum", r.sum, "mod10", r.sum % 10, "check", r.check);
  const typed = "978177960412";
  const rr = isbn13(typed);
  console.log("typed", typed + r.check, "recomputed check", rr.check, "sum", rr.sum);
}
