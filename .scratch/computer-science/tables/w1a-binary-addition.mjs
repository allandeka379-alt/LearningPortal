// Tables for lessons/data/binary-addition.md: column addition with carries, computed.
import { toBase, fromBase, addBinary } from "../lib.mjs";
export function addTable(a, b, width = 8) {
  const carries = Array(width + 1).fill(0); const sum = Array(width).fill(0);
  for (let i = width - 1; i >= 0; i--) { const t = +a[i] + +b[i] + carries[i + 1]; sum[i] = t % 2; carries[i] = t >= 2 ? 1 : 0; }
  const r = addBinary(a, b, width);
  if (sum.join("") !== r.sum) throw new Error("mismatch");
  const carryRow = carries.slice(1).map(c => c ? "1" : " ");
  const head = `| | ${Array.from({length: width}, (_, i) => 2 ** (width - 1 - i)).join(" | ")} |`;
  return { md: [head, `|:-:|${Array(width).fill(":-:").join("|")}|`, `| | ${a.split("").join(" | ")} |`, `| + | ${b.split("").join(" | ")} |`, `| carry | ${carries.slice(0).slice(1).map((c, i) => carries[i + 1] && i < width ? "" : "").join(" | ")} |`].join("\n"), sum: r.sum, carries, overflow: r.overflow, value: r.value };
}
function show(a, b) {
  const width = 8; const carries = Array(width + 1).fill(0); const sum = [];
  for (let i = width - 1; i >= 0; i--) { const t = +a[i] + +b[i] + carries[i + 1]; sum[i] = t % 2; carries[i] = t >= 2 ? 1 : 0; }
  // carry row: carry INTO column i is carries[i+1]
  const into = Array.from({length: width}, (_, i) => carries[i + 1] ? "1" : "");
  const r = addBinary(a, b);
  console.log(`${a} (${fromBase(a,2)}) + ${b} (${fromBase(b,2)}) = ${r.sum} value ${r.value} overflow ${r.overflow} carry out ${carries[0]}`);
  console.log(`| Carry out | ${Array.from({length: width}, (_, i) => 2 ** (width - 1 - i)).join(" | ")} |`);
  console.log(`|:-:|${Array(width).fill(":-:").join("|")}|`);
  console.log(`|  | ${a.split("").join(" | ")} |`);
  console.log(`|  | ${b.split("").join(" | ")} |`);
  console.log(`| Carry in |${into.map(c => ` ${c} `).join("|")}|`);
  console.log(`| ${carries[0] ? "1" : ""} | ${sum.join(" | ")} |`);
}
show("00110101", "01001110");
show("11010010", "01110001");
console.log(toBase(fromBase("11010010",2)+fromBase("01110001",2),2));
// rule table
console.log("1+1+1", toBase(3,2));
// three numbers
console.log(toBase(5+6+7,2), toBase(5,2), toBase(6,2), toBase(7,2));
