// BNF helper: grammar { "<name>": [[sym, sym...], ...] }, terminals are literal strings (any symbol not in <...>).
import { codeBlock, mdTable, same, chk } from "../lib.mjs";
const isNT = (s) => /^<.+>$/.test(s);
export const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
/** Earley recogniser over characters (terminals are literal substrings). */
export function accepts(grammar, start, str) {
  const n = str.length;
  const chart = Array.from({ length: n + 1 }, () => new Map());
  const add = (i, rule) => { const k = JSON.stringify(rule); if (chart[i].has(k)) return false; chart[i].set(k, rule); return true; };
  for (const prod of grammar[start]) add(0, { nt: start, prod, dot: 0, origin: 0 });
  for (let i = 0; i <= n; i++) {
    let changed = true;
    while (changed) {
      changed = false;
      for (const st of [...chart[i].values()]) {
        const sym = st.prod[st.dot];
        if (sym === undefined) { // complete
          for (const p of [...chart[st.origin].values()]) if (p.prod[p.dot] === st.nt) changed = add(i, { ...p, dot: p.dot + 1 }) || changed;
        } else if (isNT(sym)) { for (const prod of grammar[sym]) changed = add(i, { nt: sym, prod, dot: 0, origin: i }) || changed; }
        else if (str.startsWith(sym, i)) add(i + sym.length, { ...st, dot: st.dot + 1 });
      }
    }
  }
  return [...chart[n].values()].some((s) => s.nt === start && s.dot === s.prod.length && s.origin === 0);
}
/** Leftmost derivation (list of sentential forms as strings) by depth-limited search, or null. */
export function derive(grammar, start, target, maxSteps = 40) {
  const minLen = (form) => form.length; // each symbol yields at least one character (no empty productions)
  const prefixOk = (form) => { let t = ""; for (const s of form) { if (isNT(s)) break; t += s; } return target.startsWith(t); };
  const seen = new Set();
  const go = (form, path) => {
    if (path.length > maxSteps) return null;
    const idx = form.findIndex(isNT);
    if (idx < 0) return form.join("") === target ? path : null;
    for (const prod of grammar[form[idx]]) {
      const next = [...form.slice(0, idx), ...prod, ...form.slice(idx + 1)];
      const key = next.join("\u0001");
      if (minLen(next) > target.length * 1 + 0 && next.filter((s) => !isNT(s)).join("").length > target.length) continue;
      if (next.length > target.length) continue;
      if (!prefixOk(next) || seen.has(key + "|" + path.length)) continue;
      seen.add(key + "|" + path.length);
      const r = go(next, [...path, next]);
      if (r) return r;
    }
    return null;
  };
  const res = go([start], [[start]]);
  return res ? res.map((f) => f.join(" ")) : null;
}
export const bnfText = (grammar) => codeBlock(Object.entries(grammar).map(([nt, prods]) => `${nt} ::= ${prods.map((p) => p.join(" ")).join(" | ")}`).join("\n"));
