import { toRpn, evalRpn, mdTable, chk, same, codeBlock } from "../lib.mjs";
const prec = { "+": 1, "-": 1, "*": 2, "/": 2, "^": 3 };
/** shunting-yard with a trace: rows of { token, output, stack } after each token; final equals toRpn */
export function shunt(tokens) {
  const out = [], ops = [], rows = [];
  for (const tk of tokens) {
    if (tk in prec) {
      while (ops.length && ops.at(-1) in prec && (prec[ops.at(-1)] > prec[tk] || (prec[ops.at(-1)] === prec[tk] && tk !== "^"))) out.push(ops.pop());
      ops.push(tk);
    } else if (tk === "(") ops.push(tk);
    else if (tk === ")") { while (ops.at(-1) !== "(") out.push(ops.pop()); ops.pop(); }
    else out.push(tk);
    rows.push({ token: tk, output: out.join(" "), stack: ops.join(" ") });
  }
  while (ops.length) out.push(ops.pop());
  rows.push({ token: "(end)", output: out.join(" "), stack: "" });
  same(out, toRpn(tokens), "shunt vs toRpn");
  return { out, rows };
}
export const shuntMd = (tokens) => { const { rows } = shunt(tokens); return mdTable(["Token read", "Output so far", "Operator stack"], rows.map((r) => [`\`${r.token}\``, r.output ? `\`${r.output}\`` : "", r.stack ? `\`${r.stack}\`` : "(empty)"])); };
export const evalMd = (rpn) => { const e = evalRpn(rpn); return { value: e.value, md: mdTable(["Token", "Stack after (top on the right)"], e.steps.map((s) => [`\`${s.token}\``, s.stack.join(", ")])) }; };
const A = "( 8 + 4 ) * 3 - 10 / 5".split(" ");
const sa = shunt(A); same(sa.out.join(" "), "8 4 + 3 * 10 5 / -");
const ev = evalMd(sa.out); chk(ev.value, 34);
const B = "12 - 3 * 2 + 18 / 6".split(" ");
const sb = shunt(B); same(sb.out.join(" "), "12 3 2 * - 18 6 / +");
const evb = evalRpn(sb.out); chk(evb.value, 9);
// postfix to infix
const toInfix = (rpn) => { const st = []; for (const tk of rpn) { if (["+", "-", "*", "/", "^"].includes(tk)) { const r = st.pop(), l = st.pop(); st.push(`(${l} ${tk} ${r})`); } else st.push(tk); } return st[0]; };
const P3 = "6 2 + 5 * 4 3 - /".split(" ");
same(toInfix(P3), "(((6 + 2) * 5) / (4 - 3))"); chk(evalRpn(P3).value, 40);
const pw = shunt("2 ^ 3 ^ 2".split(" ")); same(pw.out.join(" "), "2 3 2 ^ ^"); chk(evalRpn(pw.out).value, 512);
export const snips = {
  shuntA: shuntMd(A), rpnA: codeBlock(sa.out.join(" ")), evA: ev.md, valA: String(ev.value),
  rpnB: codeBlock(sb.out.join(" ")), valB: String(evb.value), shuntB: shuntMd(B),
  p3: codeBlock(P3.join(" ")), infixP3: codeBlock(toInfix(P3).replace(/^\(|\)$/g, "")), valP3: String(evalRpn(P3).value),
  evP3: evalMd(P3).md,
  pow: pw.out.join(" "),
};
if (process.argv[1].endsWith("w2a-rpn.mjs")) for (const [k, v] of Object.entries(snips)) console.log(`--- ${k}\n${v}`);
