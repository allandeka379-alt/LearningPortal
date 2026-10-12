// Mini compiler front end used for the compilation-stages lesson and slice: tokeniser, expression parser (tree), three-address code, constant folding.
import { mdTable, codeBlock } from "../lib.mjs";
const KEYWORDS = new Set(["IF", "THEN", "ELSE", "ENDIF", "WHILE", "DO", "ENDWHILE", "FOR", "TO", "NEXT", "OUTPUT", "INPUT", "DECLARE", "AND", "OR", "NOT", "MOD", "DIV"]);
export function tokenise(line) {
  const src = line.replace(/\/\/.*$/, "");
  const re = /\s*(?:(\d+\.?\d*)|([A-Za-z_]\w*)|(←|<=|>=|<>|[-+*\/^=<>()]|:|,)|"([^"]*)")/gy;
  const out = [];
  let m;
  while (re.lastIndex < src.trimEnd().length && (m = re.exec(src))) {
    if (m[1] !== undefined) out.push({ type: "number", text: m[1] });
    else if (m[2] !== undefined) out.push({ type: KEYWORDS.has(m[2]) ? "keyword" : "identifier", text: m[2] });
    else if (m[3] !== undefined) out.push({ type: m[3] === "←" ? "assignment" : "operator", text: m[3] });
    else out.push({ type: "string", text: `"${m[4]}"` });
  }
  return out;
}
export const tokenTable = (toks) => mdTable(["Token", "Type"], toks.map((t) => [`\`${t.text}\``, t.type]));
// recursive descent for + - * / with brackets; returns tree { op, left, right } | { leaf }
export function parseExpr(tokens) {
  let i = 0;
  const peek = () => tokens[i];
  const factor = () => { const t = tokens[i++]; if (t === "(") { const e = expr(); i++; return e; } return { leaf: t }; };
  const term = () => { let l = factor(); while (peek() === "*" || peek() === "/") { const op = tokens[i++]; l = { op, left: l, right: factor() }; } return l; };
  const expr = () => { let l = term(); while (peek() === "+" || peek() === "-") { const op = tokens[i++]; l = { op, left: l, right: term() }; } return l; };
  return expr();
}
export function treeLines(n, indent = "") {
  if (n.leaf !== undefined) return [`${indent}${n.leaf}`];
  return [`${indent}${n.op}`, ...treeLines(n.left, indent + "    "), ...treeLines(n.right, indent + "    ")];
}
export function threeAddress(n, target) {
  const code = []; let k = 0;
  const gen = (x) => { if (x.leaf !== undefined) return x.leaf; const l = gen(x.left), r = gen(x.right); const t = `T${++k}`; code.push(`${t} ← ${l} ${x.op} ${r}`); return t; };
  const res = gen(n); code.push(`${target} ← ${res}`); return code;
}
export function fold(n) {
  if (n.leaf !== undefined) return n;
  const l = fold(n.left), r = fold(n.right);
  if (l.leaf !== undefined && r.leaf !== undefined && !isNaN(+l.leaf) && !isNaN(+r.leaf)) {
    const a = +l.leaf, b = +r.leaf; return { leaf: String(n.op === "+" ? a + b : n.op === "-" ? a - b : n.op === "*" ? a * b : a / b) };
  }
  return { op: n.op, left: l, right: r };
}
export const show = (n) => (n.leaf !== undefined ? n.leaf : `(${show(n.left)} ${n.op} ${show(n.right)})`);
