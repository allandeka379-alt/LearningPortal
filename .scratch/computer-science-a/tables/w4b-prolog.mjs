// A small Prolog-style interpreter used to CHECK every answer and trace in the declarative-programming lesson and
// slice (facts, rules with "and", variables, backtracking, recursion). Supports: atoms (lower case or numbers),
// variables (Upper case), compound terms f(a, b), clauses "head." and "head :- g1, g2.", the test X \= Y, and the
// comparisons X > Y, X < Y, X >= Y, X =< Y on numbers. Clauses are tried in the order written (depth first).
// Not a slice: lives in tables/.

const tokenize = (src) => {
  const out = [];
  const re = /\s*(:-|\\=|>=|=<|[(),.<>]|[A-Za-z_][A-Za-z0-9_]*|-?\d+(?:\.\d+)?)/y;
  let m;
  re.lastIndex = 0;
  const clean = src.replace(/%[^\n]*/g, "");
  while (re.lastIndex < clean.length) {
    if (/^\s*$/.test(clean.slice(re.lastIndex))) break;
    m = re.exec(clean);
    if (!m) throw new Error(`prolog: cannot read near "${clean.slice(re.lastIndex, re.lastIndex + 20)}"`);
    out.push(m[1]);
  }
  return out;
};

function parseTerms(tokens) {
  let i = 0;
  const peek = () => tokens[i];
  const next = () => tokens[i++];
  function term() {
    const tok = next();
    if (tok === undefined) throw new Error("prolog: unexpected end");
    if (/^[A-Z_]/.test(tok)) return { t: "var", name: tok };
    if (/^-?\d/.test(tok)) return { t: "atom", name: tok };
    if (/^[a-z]/.test(tok)) {
      if (peek() === "(") {
        next();
        const args = [term()];
        while (peek() === ",") { next(); args.push(term()); }
        if (next() !== ")") throw new Error("prolog: expected )");
        return { t: "cmp", name: tok, args };
      }
      return { t: "atom", name: tok };
    }
    throw new Error(`prolog: unexpected ${tok}`);
  }
  function goal() {
    const left = term();
    if (["\\=", ">", "<", ">=", "=<"].includes(peek())) {
      const op = next();
      const right = term();
      return { t: "cmp", name: op, args: [left, right] };
    }
    return left;
  }
  function clause() {
    const head = term();
    const body = [];
    if (peek() === ":-") {
      next();
      body.push(goal());
      while (peek() === ",") { next(); body.push(goal()); }
    }
    if (next() !== ".") throw new Error("prolog: clause must end with a full stop");
    return { head, body };
  }
  return { clause, goal, done: () => i >= tokens.length, peek, next };
}

export function parseProgram(src) {
  const p = parseTerms(tokenize(src));
  const clauses = [];
  while (!p.done()) clauses.push(p.clause());
  return clauses;
}
export function parseGoals(src) {
  const text = src.trim().replace(/\.$/, "");
  const p = parseTerms(tokenize(text));
  const goals = [p.goal()];
  while (!p.done() && p.peek() === ",") { p.next(); goals.push(p.goal()); }
  return goals;
}

export const show = (t, b = null) => {
  if (b) t = walk(t, b);
  if (t.t === "var") return t.name;
  if (t.t === "atom") return t.name;
  return `${t.name}(${t.args.map((a) => show(a, b)).join(", ")})`;
};
function walk(t, b) {
  while (t.t === "var" && b.has(t.name)) t = b.get(t.name);
  return t;
}
function resolve(t, b) {
  t = walk(t, b);
  if (t.t === "cmp") return { t: "cmp", name: t.name, args: t.args.map((a) => resolve(a, b)) };
  return t;
}
function unify(a, c, b) {
  a = walk(a, b);
  c = walk(c, b);
  if (a.t === "var" && c.t === "var" && a.name === c.name) return b;
  if (a.t === "var") { const n = new Map(b); n.set(a.name, c); return n; }
  if (c.t === "var") { const n = new Map(b); n.set(c.name, a); return n; }
  if (a.t === "atom" && c.t === "atom") return a.name === c.name ? b : null;
  if (a.t === "cmp" && c.t === "cmp" && a.name === c.name && a.args.length === c.args.length) {
    let cur = b;
    for (let i = 0; i < a.args.length; i++) { cur = unify(a.args[i], c.args[i], cur); if (!cur) return null; }
    return cur;
  }
  return null;
}
let counter = 0;
const rename = (t, id) => (t.t === "var" ? { t: "var", name: `${t.name}_${id}` } : t.t === "cmp" ? { t: "cmp", name: t.name, args: t.args.map((a) => rename(a, id)) } : t);

/**
 * Solves the goals (array of terms) against the clauses. Returns { solutions: [{X: "rudo", ...}], events }.
 * events (when trace is true) list, in order, every attempt: { depth, goal, clause (text or null), result }.
 */
export function solve(clauses, goals, { trace = false, limit = 200 } = {}) {
  const queryVars = [];
  const collect = (t) => { if (t.t === "var") { if (!queryVars.includes(t.name) && t.name !== "_") queryVars.push(t.name); } else if (t.t === "cmp") t.args.forEach(collect); };
  goals.forEach(collect);
  const events = [];
  const solutions = [];
  const clauseText = (c) => `${show(c.head)}${c.body.length ? " :- " + c.body.map((g) => show(g)).join(", ") : ""}.`;
  function* run(gs, b, depth) {
    if (gs.length === 0) { yield b; return; }
    const [g, ...rest] = gs;
    const gr = resolve(g, b);
    if (g.t === "cmp" && ["\\=", ">", "<", ">=", "=<"].includes(g.name)) {
      const [l, r] = g.args.map((a) => resolve(a, b));
      let ok;
      if (g.name === "\\=") ok = unify(l, r, new Map()) === null;
      else { const x = Number(l.name); const y = Number(r.name); ok = g.name === ">" ? x > y : g.name === "<" ? x < y : g.name === ">=" ? x >= y : x <= y; }
      if (trace) events.push({ depth, goal: show(gr), clause: null, result: ok ? "true" : "false" });
      if (ok) yield* run(rest, b, depth);
      return;
    }
    for (const c of clauses) {
      const id = ++counter;
      const head = rename(c.head, id);
      const nb = unify(gr, head, b);
      if (!nb) {
        if (trace && c.head.name === gr.name && c.head.args.length === (gr.args?.length ?? 0)) events.push({ depth, goal: show(gr), clause: clauseText(c), result: "no match" });
        continue;
      }
      if (trace) events.push({ depth, goal: show(gr), clause: clauseText(c), result: "match" });
      const body = c.body.map((x) => rename(x, id));
      yield* run([...body, ...rest], nb, body.length ? depth + 1 : depth);
    }
  }
  for (const b of run(goals, new Map(), 0)) {
    const sol = {};
    for (const v of queryVars) sol[v] = show(resolve({ t: "var", name: v }, b));
    solutions.push(sol);
    if (solutions.length >= limit) break;
  }
  return { solutions, events, vars: queryVars };
}

/** Convenience: solve a query string against a program string; returns the list of solutions ([{}] means "true" with no variables). */
export function ask(program, query, opts) {
  return solve(parseProgram(program), parseGoals(query), opts);
}
