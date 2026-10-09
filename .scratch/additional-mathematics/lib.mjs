// Authoring helpers for additional-mathematics-o questions and flashcards (adapted from .scratch/economics/lib.mjs,
// itself from .scratch/english/lib.mjs, with the numeric builders of .scratch/combined-science/lib.mjs and the maths
// checks of the mathematics-o generators in .scratch/content-math-slice6/lib.mjs). Concept modules call concept(...)
// with a builder; build-content.mjs writes the JSON files.
//
// LaTeX: write it with t`...` (String.raw), so backslashes are single in the source (t`$\frac{1}{2}$`) and
// JSON.stringify doubles them in the files. In a normal "..." string you would have to write "\\frac". Money is US\$
// (a bare $ starts maths): use money(n).
//
// EVERY answer value is computed in code with the helpers below (or plain JS maths) and passed EXACT to the builders;
// the builders round for display and set a tolerance that accepts every correctly rounded answer. Never type a computed
// answer by hand. Use chk(...) / same(...) to assert values you also write in prose or LaTeX.
export const t = String.raw;

// Selectors for `applies` (an item is tagged only to the syllabi it names). Omit applies for content valid for both.
export const ZIM = ["zimsec"];
export const CAM = ["cambridge/igcse/additional-mathematics"];

const OPTION_KEYS = ["A", "B", "C", "D", "E", "F"];
const DEFAULT_NORMALISE = ["trim", "lowercase", "collapse_whitespace", "strip_punctuation"];
const EXPR_NORMALISE = ["trim", "lowercase", "remove_whitespace"];
const PART_LABEL = /^\((?:[a-z]{1,2}|[ivx]{1,6}|\d{1,2})\)$/;

/**
 * Mark values reserved for the exam-format STRUCTURED items of the mock papers (see BRIEF.md): ZIMSEC Paper 1 Section A
 * 13, ZIMSEC Paper 1 Section B and Paper 2 Sections B and C 12, ZIMSEC Paper 2 Section A 10, Cambridge Paper 1 8,
 * Cambridge Paper 2 10. No other question may be worth these marks.
 */
export const RESERVED_MARKS = [8, 10, 12, 13];

// ---------------------------------------------------------------------------------------------------------------------
// Rounding and verification (from the mathematics-o generators)

/** Asserts |actual − expected| ≤ tol (default: float noise) and returns expected. */
export function chk(actual, expected, tol = 1e-9, label = "") {
  if (typeof actual !== "number" || !Number.isFinite(actual) || Math.abs(actual - expected) > tol + 1e-9 * Math.max(1, Math.abs(expected))) {
    throw new Error(`CHECK FAILED ${label}: computed ${actual}, written ${expected} (tol ${tol})`);
  }
  return expected;
}
/** Asserts deep equality of two JSON-able values and returns expected. */
export function same(actual, expected, label = "") {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error(`CHECK FAILED ${label}: computed ${JSON.stringify(actual)}, written ${JSON.stringify(expected)}`);
  return expected;
}
/** Rounds to dp decimal places (half away from zero, robust to float noise). */
export function round(x, dp = 0) {
  const f = 10 ** dp;
  return (Math.sign(x) * Math.round(Math.abs(x) * f + 1e-9)) / f;
}
/** Number of decimal places that gives n significant figures for x. */
export function dpFor(x, n) {
  if (x === 0) return n - 1;
  return n - 1 - Math.floor(Math.log10(Math.abs(x)));
}
function guardBoundary(x, dp, margin, label) {
  const scaled = Math.abs(x) * 10 ** dp;
  const frac = scaled - Math.floor(scaled);
  if (Math.abs(frac - 0.5) < margin) throw new Error(`BOUNDARY ${label}: ${x} is too close to a rounding boundary at ${dp} d.p.; change the data`);
}
/** Rounds x to dp d.p. (throws near a rounding boundary); asserts `written` when given. */
export function rnd(x, dp, written, label = "") {
  guardBoundary(x, dp, 0.08, label);
  const v = round(x, dp);
  if (written !== undefined) chk(v, written, 1e-9, label);
  return v;
}
/** Rounds x to n significant figures (throws near a rounding boundary); asserts `written` when given. */
export function sf(x, n = 3, written, label = "") {
  const dp = dpFor(x, n);
  guardBoundary(x, dp, 0.08, label);
  const v = Number(x.toPrecision(n));
  if (written !== undefined) chk(v, written, 1e-9, label);
  return v;
}
export const s3 = (x, written, label = "") => sf(x, 3, written, label);
export const halfUnit = (dp) => 0.5 * 10 ** -dp;
/** Display string of x to n s.f. (no exponent notation; trailing zeros kept, e.g. 2.50). */
export function sfStr(x, n = 3) {
  const dp = dpFor(x, n);
  return dp > 0 ? round(x, dp).toFixed(dp) : String(round(x, dp));
}
/** Display string of x to dp decimal places. */
export const dpStr = (x, dp) => round(x, dp).toFixed(dp);

// ---------------------------------------------------------------------------------------------------------------------
// Numbers: fractions, surds, integers
export const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));
export const lcm = (a, b) => Math.abs(a * b) / gcd(a, b);

/** Simplified fraction n/d: { n, d, v, s: "n/d", tex: "\frac{n}{d}" (sign in front), dtex: with \dfrac }. */
export function F(n, d = 1) {
  if (!Number.isInteger(n) || !Number.isInteger(d) || d === 0) throw new Error(`bad fraction ${n}/${d}`);
  if (d < 0) {
    n = -n;
    d = -d;
  }
  const g = gcd(n, d) || 1;
  const N = n / g;
  const D = d / g;
  const sign = N < 0 ? "-" : "";
  const a = Math.abs(N);
  return {
    n: N,
    d: D,
    v: N / D,
    s: D === 1 ? `${N}` : `${N}/${D}`,
    tex: D === 1 ? `${N}` : `${sign}\\frac{${a}}{${D}}`,
    dtex: D === 1 ? `${N}` : `${sign}\\dfrac{${a}}{${D}}`,
  };
}
/** Fraction arithmetic on F objects (or integers). */
export const Fr = {
  add: (a, b) => F(fn(a).n * fn(b).d + fn(b).n * fn(a).d, fn(a).d * fn(b).d),
  sub: (a, b) => F(fn(a).n * fn(b).d - fn(b).n * fn(a).d, fn(a).d * fn(b).d),
  mul: (a, b) => F(fn(a).n * fn(b).n, fn(a).d * fn(b).d),
  div: (a, b) => F(fn(a).n * fn(b).d, fn(a).d * fn(b).n),
};
function fn(x) {
  return typeof x === "number" ? F(x, 1) : x;
}
/** True when n/d has a terminating decimal. */
export function terminates(n, d) {
  let D = F(n, d).d;
  while (D % 2 === 0) D /= 2;
  while (D % 5 === 0) D /= 5;
  return D === 1;
}
/** √n = k√r with r square-free: simplifySurd(50) → { k: 5, r: 2, tex: "5\sqrt{2}", s: "5√2" }. */
export function simplifySurd(n) {
  if (!Number.isInteger(n) || n < 0) throw new Error(`simplifySurd: ${n}`);
  let k = 1;
  let r = n;
  for (let p = 2; p * p <= r; p++) {
    while (r % (p * p) === 0) {
      r /= p * p;
      k *= p;
    }
  }
  const tex = r === 1 ? `${k}` : `${k === 1 ? "" : k}\\sqrt{${r}}`;
  const s = r === 1 ? `${k}` : `${k === 1 ? "" : k}√${r}`;
  return { k, r, v: k * Math.sqrt(r), tex, s };
}

// ---------------------------------------------------------------------------------------------------------------------
// Polynomials: coefficient arrays, HIGHEST power first ([2, -3, 0, 5] = 2x³ − 3x² + 5).
export const poly = {
  eval: (c, x) => c.reduce((acc, a) => acc * x + a, 0),
  add(a, b) {
    const n = Math.max(a.length, b.length);
    const A = [...Array(n - a.length).fill(0), ...a];
    const B = [...Array(n - b.length).fill(0), ...b];
    return trim(A.map((v, i) => v + B[i]));
  },
  sub: (a, b) => poly.add(a, b.map((v) => -v)),
  mul(a, b) {
    const out = Array(a.length + b.length - 1).fill(0);
    a.forEach((x, i) => b.forEach((y, j) => (out[i + j] += x * y)));
    return trim(out);
  },
  /** Long division: { q, r } with num = den × q + r (exact for integer data when the leading coefficient divides). */
  div(num, den) {
    const r = [...num];
    const q = [];
    const dn = den.length;
    for (let i = 0; i <= num.length - dn; i++) {
      const c = r[i] / den[0];
      q.push(c);
      for (let j = 0; j < dn; j++) r[i + j] -= c * den[j];
    }
    const rem = trim(r.slice(num.length - dn + 1));
    return { q: trim(q.length ? q : [0]), r: rem.length ? rem : [0] };
  },
  deriv: (c) => trim(c.slice(0, -1).map((a, i) => a * (c.length - 1 - i))),
  /** Rational roots of an integer polynomial (p/q search), sorted. */
  rationalRoots(c) {
    const lead = Math.abs(c[0]);
    let k = c.length - 1;
    while (k > 0 && c[k] === 0) k--;
    const roots = new Set();
    if (k < c.length - 1) roots.add(0);
    const cst = Math.abs(c[k]);
    const divs = (n) => {
      const out = [];
      for (let i = 1; i <= n; i++) if (n % i === 0) out.push(i);
      return out;
    };
    for (const p of divs(cst || 1)) for (const q of divs(lead)) for (const s of [1, -1]) if (Math.abs(poly.eval(c, (s * p) / q)) < 1e-9) roots.add((s * p) / q);
    return [...roots].sort((a, b) => a - b);
  },
  /** Plain-text form for SHORT_ANSWER accepted lists: poly.str([2, -3, 0, 5]) → "2x^3-3x^2+5". */
  str(c, v = "x") {
    return termsOf(c, v, (p) => (p === 1 ? v : `${v}^${p}`)).replace(/^\+/, "") || "0";
  },
  /** LaTeX: poly.tex([2, -3, 0, 5]) → "2x^{3} - 3x^{2} + 5". */
  tex(c, v = "x") {
    const s = termsOf(c, v, (p) => (p === 1 ? v : `${v}^{${p}}`), true);
    return s.replace(/^\+ /, "").replace(/^- /, "-") || "0";
  },
};
function trim(c) {
  let i = 0;
  while (i < c.length - 1 && Math.abs(c[i]) < 1e-12) i++;
  return c.slice(i).map((v) => (Math.abs(v - Math.round(v)) < 1e-9 ? Math.round(v) : v));
}
function termsOf(c, v, pow, spaced = false) {
  const n = c.length - 1;
  let out = "";
  c.forEach((a, i) => {
    if (a === 0) return;
    const p = n - i;
    const abs = Math.abs(a);
    const coef = p === 0 ? String(abs) : abs === 1 ? "" : String(abs);
    const body = coef + (p === 0 ? "" : pow(p));
    out += spaced ? `${a < 0 ? " - " : " + "}${body}` : `${a < 0 ? "-" : "+"}${body}`;
  });
  return spaced ? out.trim() : out;
}

/** Quadratics. */
export const quad = {
  disc: (a, b, c) => b * b - 4 * a * c,
  /** Real roots, ascending ([] when none). */
  roots(a, b, c) {
    const D = b * b - 4 * a * c;
    if (D < -1e-12) return [];
    if (Math.abs(D) < 1e-12) return [-b / (2 * a)];
    const r = [(-b - Math.sqrt(D)) / (2 * a), (-b + Math.sqrt(D)) / (2 * a)];
    return r.sort((x, y) => x - y);
  },
  /** ax² + bx + c = a(x + p)² + q → { a, p, q, vertex: [−p, q] }. */
  completeSquare(a, b, c) {
    const p = b / (2 * a);
    const q = c - (b * b) / (4 * a);
    return { a, p, q, vertex: [-p, q] };
  },
};

/** Root of f in [lo, hi] by bisection (f(lo), f(hi) must differ in sign). */
export function root(f, lo, hi, tol = 1e-12) {
  let flo = f(lo);
  if (flo * f(hi) > 0) throw new Error(`root(): no sign change on [${lo}, ${hi}]`);
  for (let i = 0; i < 200 && hi - lo > tol; i++) {
    const mid = (lo + hi) / 2;
    const fm = f(mid);
    if (flo * fm <= 0) hi = mid;
    else {
      lo = mid;
      flo = fm;
    }
  }
  return (lo + hi) / 2;
}

// ---------------------------------------------------------------------------------------------------------------------
// Logarithms, trigonometry, counting, series, vectors
export const lg = Math.log10;
export const ln = Math.log;
export const logb = (base, x) => Math.log(x) / Math.log(base);

export const rad = (deg) => (deg * Math.PI) / 180;
export const deg = (r) => (r * 180) / Math.PI;
export const sec = (x) => 1 / Math.cos(x);
export const cosec = (x) => 1 / Math.sin(x);
export const cot = (x) => 1 / Math.tan(x);

/**
 * All solutions of fn(a·x + b) = k with x in [lo, hi] (inclusive), ascending. fn: "sin" | "cos" | "tan" | "sec" |
 * "cosec" | "cot"; unit "deg" (x, b, lo, hi in degrees) or "rad". Found numerically from the general solution, so it
 * checks your hand working: solveTrig({ fn: "sin", k: 0.5, lo: 0, hi: 360 }) → [30, 150].
 */
export function solveTrig({ fn, k, a = 1, b = 0, lo, hi, unit = "deg" }) {
  const toR = unit === "deg" ? rad : (x) => x;
  const fromR = unit === "deg" ? deg : (x) => x;
  const base = { sin: "sin", cosec: "sin", cos: "cos", sec: "cos", tan: "tan", cot: "tan" }[fn];
  const kk = ["sec", "cosec", "cot"].includes(fn) ? 1 / k : k;
  if (base !== "tan" && Math.abs(kk) > 1 + 1e-12) return [];
  const p = base === "sin" ? Math.asin(Math.max(-1, Math.min(1, kk))) : base === "cos" ? Math.acos(Math.max(-1, Math.min(1, kk))) : Math.atan(kk);
  const principal = base === "sin" ? [p, Math.PI - p] : base === "cos" ? [p, -p] : [p];
  const period = base === "tan" ? Math.PI : 2 * Math.PI;
  const out = [];
  const A = a; // a pure number: u = a·x + b in the same unit
  const B = toR(b);
  const L = toR(lo);
  const H = toR(hi);
  // u = A x + B ranges over [A L + B, A H + B] (A may be negative)
  const u1 = Math.min(A * L + B, A * H + B);
  const u2 = Math.max(A * L + B, A * H + B);
  for (const p0 of principal) {
    const nStart = Math.ceil((u1 - p0) / period - 1e-9);
    for (let n = nStart; p0 + n * period <= u2 + 1e-9; n++) {
      const x = (p0 + n * period - B) / A;
      if (x >= L - 1e-9 && x <= H + 1e-9) out.push(fromR(x));
    }
  }
  const uniq = [];
  for (const x of out.sort((m, n) => m - n)) if (!uniq.some((y) => Math.abs(y - x) < 1e-7)) uniq.push(Number(x.toFixed(10)) || 0);
  return uniq;
}

export function fact(n) {
  if (!Number.isInteger(n) || n < 0) throw new Error(`fact(${n})`);
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}
export const nPr = (n, r) => fact(n) / fact(n - r);
export function nCr(n, r) {
  if (r < 0 || r > n) return 0;
  let out = 1;
  for (let i = 1; i <= r; i++) out = (out * (n - r + i)) / i;
  return Math.round(out);
}
/** Coefficients of (p + q·x)ⁿ in ascending powers of x: binomialCoeffs(2, -3, 5)[k] = coefficient of x^k. */
export const binomialCoeffs = (p, q, n) => Array.from({ length: n + 1 }, (_, k) => nCr(n, k) * p ** (n - k) * q ** k);

export const ap = {
  nth: (a, d, n) => a + (n - 1) * d,
  sum: (a, d, n) => (n / 2) * (2 * a + (n - 1) * d),
};
export const gp = {
  nth: (a, r, n) => a * r ** (n - 1),
  sum: (a, r, n) => (r === 1 ? a * n : (a * (1 - r ** n)) / (1 - r)),
  sumInf(a, r) {
    if (Math.abs(r) >= 1) throw new Error(`gp.sumInf: |r| = ${Math.abs(r)} ≥ 1, no sum to infinity`);
    return a / (1 - r);
  },
};

/** 2-D vectors as [x, y]. */
export const vec = {
  add: (u, v) => [u[0] + v[0], u[1] + v[1]],
  sub: (u, v) => [u[0] - v[0], u[1] - v[1]],
  scale: (k, u) => [k * u[0], k * u[1]],
  mag: (u) => Math.hypot(u[0], u[1]),
  unit: (u) => [u[0] / Math.hypot(u[0], u[1]), u[1] / Math.hypot(u[0], u[1])],
  dot: (u, v) => u[0] * v[0] + u[1] * v[1],
  /** Angle of u above the positive x-direction, degrees in (−180, 180]. */
  angle: (u) => deg(Math.atan2(u[1], u[0])),
  /** Vector of magnitude m at angle θ° above the positive x-direction. */
  polar: (m, thetaDeg) => [m * Math.cos(rad(thetaDeg)), m * Math.sin(rad(thetaDeg))],
  tex: ([x, y]) => `\\begin{pmatrix} ${x} \\\\ ${y} \\end{pmatrix}`,
  /** LaTeX in i, j form: vec.ij([3, -4]) → "3\mathbf{i} - 4\mathbf{j}". */
  ij([x, y]) {
    const term = (c, u) => `${Math.abs(c) === 1 ? "" : Math.abs(c)}\\mathbf{${u}}`;
    if (x === 0 && y === 0) return "\\mathbf{0}";
    if (x === 0) return `${y < 0 ? "-" : ""}${term(y, "j")}`;
    if (y === 0) return `${x < 0 ? "-" : ""}${term(x, "i")}`;
    return `${x < 0 ? "-" : ""}${term(x, "i")} ${y < 0 ? "-" : "+"} ${term(y, "j")}`;
  },
};

// ---------------------------------------------------------------------------------------------------------------------
// Calculus checks (numerical): use them to confirm a derivative or integral you derived by hand.
/** Central-difference derivative. */
export const deriv = (f, x, h = 1e-5) => (f(x + h) - f(x - h)) / (2 * h);
/** Composite Simpson's rule on [a, b] with n (even) strips. */
export function integrate(f, a, b, n = 2000) {
  const h = (b - a) / n;
  let s = f(a) + f(b);
  for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2);
  return (s * h) / 3;
}
/** Asserts that fPrime is the derivative of f at the sample points. */
export function checkDeriv(f, fPrime, xs, label = "derivative") {
  for (const x of xs) chk(deriv(f, x), fPrime(x), 1e-5 * Math.max(1, Math.abs(fPrime(x))), `${label} at x=${x}`);
  return true;
}
/** Asserts that F is an antiderivative of f on [a, b] (F(b) − F(a) equals the numerical integral). */
export function checkAntideriv(F, f, a, b, label = "antiderivative") {
  chk(integrate(f, a, b), F(b) - F(a), 1e-6 * Math.max(1, Math.abs(F(b) - F(a))), label);
  return true;
}

// ---------------------------------------------------------------------------------------------------------------------
// Statistics (ZIMSEC). Population variance divides by n; the unbiased estimate s² divides by n − 1.
export const sum = (xs) => xs.reduce((s, x) => s + x, 0);
export const mean = (xs) => sum(xs) / xs.length;
export const sorted = (xs) => [...xs].sort((a, b) => a - b);
export function median(xs) {
  const s = sorted(xs);
  const n = s.length;
  return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
}
/** Quartiles by the median-of-halves method (state the method in the item when it matters). */
export function quartiles(xs) {
  const s = sorted(xs);
  const n = s.length;
  const q1 = median(s.slice(0, Math.floor(n / 2)));
  const q3 = median(s.slice(Math.ceil(n / 2)));
  return { q1, q2: median(s), q3, iqr: q3 - q1 };
}
export function modes(xs) {
  const c = new Map();
  for (const x of xs) c.set(x, (c.get(x) ?? 0) + 1);
  const max = Math.max(...c.values());
  return [...c.entries()].filter(([, v]) => v === max).map(([k]) => k).sort((a, b) => a - b);
}
export const variance = (xs) => mean(xs.map((x) => x * x)) - mean(xs) ** 2;
export const sd = (xs) => Math.sqrt(variance(xs));
/** Unbiased estimate of the population variance (divisor n − 1). */
export const s2 = (xs) => (variance(xs) * xs.length) / (xs.length - 1);
/** Frequency table [[x, f], ...] → { n, mean, variance, sd } (divisor n). Grouped data: pass class midpoints as x. */
export function freqStats(table) {
  const n = sum(table.map(([, f]) => f));
  const m = sum(table.map(([x, f]) => x * f)) / n;
  const v = sum(table.map(([x, f]) => x * x * f)) / n - m * m;
  return { n, mean: m, variance: v, sd: Math.sqrt(v), sumfx: sum(table.map(([x, f]) => x * f)), sumfx2: sum(table.map(([x, f]) => x * x * f)) };
}
/**
 * Grouped data [[lower boundary, upper boundary, f], ...] (boundaries, not limits): estimated mean and sd from midpoints,
 * median by linear interpolation, frequency densities and cumulative frequencies.
 */
export function grouped(classes) {
  const mids = classes.map(([a, b, f]) => [(a + b) / 2, f]);
  const st = freqStats(mids);
  const n = st.n;
  let cum = 0;
  const cf = classes.map(([, , f]) => (cum += f));
  const interp = (pos) => {
    const i = cf.findIndex((c) => c >= pos);
    const [a, b, f] = classes[i];
    const before = i ? cf[i - 1] : 0;
    return a + ((pos - before) / f) * (b - a);
  };
  return { ...st, cf, fd: classes.map(([a, b, f]) => f / (b - a)), median: interp(n / 2), q1: interp(n / 4), q3: interp((3 * n) / 4), interp };
}
export const cv = (sdv, m) => (sdv / m) * 100;
export const expand = (table) => table.flatMap(([x, f]) => Array(f).fill(x));

/** Binomial B(n, p). */
export const binom = {
  pmf: (n, p, r) => nCr(n, r) * p ** r * (1 - p) ** (n - r),
  cdf: (n, p, r) => {
    let s = 0;
    for (let k = 0; k <= r; k++) s += binom.pmf(n, p, k);
    return s;
  },
  mean: (n, p) => n * p,
  variance: (n, p) => n * p * (1 - p),
};

/** Standard normal Φ(z) = ½ erfc(−z/√2); absolute error below 1e-7 (ample for 4-figure tables and 3 s.f.). */
export function Phi(z) {
  return 0.5 * erfc(-z / Math.SQRT2);
}
function erfc(x) {
  const z = Math.abs(x);
  const t1 = 1 / (1 + 0.5 * z);
  const r = t1 * Math.exp(-z * z - 1.26551223 + t1 * (1.00002368 + t1 * (0.37409196 + t1 * (0.09678418 + t1 * (-0.18628806 + t1 * (0.27886807 + t1 * (-1.13520398 + t1 * (1.48851587 + t1 * (-0.82215223 + t1 * 0.17087277)))))))));
  // Chebyshev-fitted erfc (Numerical Recipes "erfcc"): fractional error below 1.2e-7 everywhere.
  return x >= 0 ? r : 2 - r;
}
/** Inverse standard normal: z with Φ(z) = p (Acklam's algorithm, refined by Newton steps). */
export function invPhi(p) {
  if (!(p > 0 && p < 1)) throw new Error(`invPhi(${p})`);
  const a = [-3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2, 1.38357751867269e2, -3.066479806614716e1, 2.506628277459239];
  const b = [-5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2, 6.680131188771972e1, -1.328068155288572e1];
  const c = [-7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996, 3.754408661907416];
  const pl = 0.02425;
  let x;
  if (p < pl) {
    const q = Math.sqrt(-2 * Math.log(p));
    x = (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  } else if (p <= 1 - pl) {
    const q = p - 0.5;
    const r = q * q;
    x = ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  } else {
    const q = Math.sqrt(-2 * Math.log(1 - p));
    x = -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  for (let i = 0; i < 2; i++) x -= (Phi(x) - p) / (Math.exp((-x * x) / 2) / Math.sqrt(2 * Math.PI));
  return x;
}
/**
 * Table conventions (ZIMSEC candidates use 4-figure standard normal tables): z is rounded to 2 d.p. before looking up
 * Φ, and Φ is read to 4 d.p. phiTable(1.234) = Φ(1.23) to 4 d.p. Use it to compute the answer a student following the
 * tables gets, and give a tolerance that also accepts the calculator value (normalProb does both).
 */
export const phiTable = (z) => round(Phi(round(z, 2)), 4);
/** Critical z for a two-sided confidence level: 95 → 1.96, 99 → 2.576 (the values students use). */
export const zCrit = (levelPct) => ({ 90: 1.645, 95: 1.96, 98: 2.326, 99: 2.576 })[levelPct] ?? invPhi(0.5 + levelPct / 200);
/**
 * P(lo < X < hi) for X ~ N(mu, sigma²) (use -Infinity / Infinity for one-sided). Returns { exact, table, tol }: exact
 * from Φ, table from the 4-figure table method, tol covering both plus 3-s.f. rounding — pass value: exact and tol.
 */
export function normalProb(mu, sigma, lo = -Infinity, hi = Infinity) {
  const zl = (lo - mu) / sigma;
  const zh = (hi - mu) / sigma;
  const exact = (Number.isFinite(zh) ? Phi(zh) : 1) - (Number.isFinite(zl) ? Phi(zl) : 0);
  const table = (Number.isFinite(zh) ? phiTable(zh) : 1) - (Number.isFinite(zl) ? phiTable(zl) : 0);
  const tol = Math.abs(exact - table) + halfUnit(dpFor(exact, 3));
  return { exact, table, tol: Number(tol.toPrecision(2)) };
}
/** Confidence interval for a mean: x̄ ± z·σ/√n → { lo, hi, se, z }. */
export function ciMean(xbar, sigma, n, levelPct = 95) {
  const z = zCrit(levelPct);
  const se = sigma / Math.sqrt(n);
  return { lo: xbar - z * se, hi: xbar + z * se, se, z };
}

// ---------------------------------------------------------------------------------------------------------------------
// Mechanics (ZIMSEC). ALWAYS state g in the stem ("Take g = 9.8 m s⁻²" or "Take g = 10 m s⁻²") and pass the same g.
/**
 * Constant-acceleration equations: pass any three of { u, v, a, s, t } and get all five (throws if inconsistent or if
 * the data give two answers for t; then pass `pickT` = "smaller" | "larger").
 */
export function suvat(known, { pickT } = {}) {
  let { u, v, a, s, t: tt } = known;
  const has = (x) => x !== undefined;
  const n = [u, v, a, s, tt].filter(has).length;
  if (n < 3) throw new Error("suvat: need three of u, v, a, s, t");
  for (let pass = 0; pass < 3; pass++) {
    if (has(u) && has(a) && has(tt) && !has(v)) v = u + a * tt;
    if (has(v) && has(a) && has(tt) && !has(u)) u = v - a * tt;
    if (has(u) && has(v) && has(tt) && !has(a)) a = (v - u) / tt;
    if (has(u) && has(v) && has(a) && !has(tt) && a !== 0) tt = (v - u) / a;
    if (has(u) && has(v) && has(tt) && !has(s)) s = ((u + v) / 2) * tt;
    if (has(u) && has(a) && has(s) && !has(v)) {
      const v2 = u * u + 2 * a * s;
      if (v2 < -1e-9) throw new Error("suvat: v² negative");
      v = Math.sqrt(Math.max(0, v2)) * (known.vSign ?? 1);
    }
    if (has(u) && has(v) && has(s) && !has(a) && s !== 0) a = (v * v - u * u) / (2 * s);
    if (has(u) && has(v) && has(s) && !has(tt) && u + v !== 0) tt = (2 * s) / (u + v);
    if (has(u) && has(a) && has(s) && !has(tt) && !has(v)) {
      const r = quad.roots(a / 2, u, -s).filter((x) => x >= 0);
      if (!r.length) throw new Error("suvat: no non-negative time");
      if (r.length > 1 && !pickT) throw new Error(`suvat: two times ${r}; pass pickT`);
      tt = pickT === "larger" ? r[r.length - 1] : r[0];
    }
    if (has(v) && has(a) && has(s) && !has(u)) u = Math.sqrt(Math.max(0, v * v - 2 * a * s)) * (known.uSign ?? 1);
    if (has(s) && has(tt) && has(a) && !has(u)) u = s / tt - (a * tt) / 2;
    if (has(s) && has(tt) && has(u) && !has(a)) a = (2 * (s - u * tt)) / (tt * tt);
    if (has(s) && has(tt) && has(v) && !has(u)) u = (2 * s) / tt - v;
  }
  if (![u, v, a, s, tt].every(has)) throw new Error("suvat: could not solve");
  chk(u + a * tt, v, 1e-9, "suvat v = u + at");
  chk(u * tt + 0.5 * a * tt * tt, s, 1e-9, "suvat s = ut + ½at²");
  return { u, v, a, s, t: tt };
}
/** Resultant of forces given as [magnitude, angle° above the positive x-direction] → { x, y, mag, angle }. */
export function resultant(forces) {
  const x = sum(forces.map(([m, th]) => m * Math.cos(rad(th))));
  const y = sum(forces.map(([m, th]) => m * Math.sin(rad(th))));
  return { x, y, mag: Math.hypot(x, y), angle: deg(Math.atan2(y, x)) };
}

// ---------------------------------------------------------------------------------------------------------------------
// Text helpers
/** Markdown table: head = ["x", "f"], rows = [[1, 3], ...]. Numbers print as given (round them first). */
export function table(head, rows) {
  for (const r of rows) if (r.length !== head.length) throw new Error(`table(): row has ${r.length} cells, header ${head.length}`);
  const line = (cells) => `| ${cells.join(" | ")} |`;
  return [line(head), line(head.map(() => "---")), ...rows.map((r) => line(r.map(String)))].join("\n");
}
/** Numbered worked-solution steps: steps("a", "b") → "1. a\n2. b". */
export const steps = (...list) => list.flat().map((s, i) => `${i + 1}. ${s}`).join("\n");
export const paras = (...list) => list.flat().join("\n\n");
/** Money in running text: money(12.5) → "US\$12.50". */
export function money(n, dp) {
  const places = dp ?? (Number.isInteger(n) ? 0 : 2);
  return `${n < 0 ? "−" : ""}US\\$${Math.abs(n).toLocaleString("en-GB", { minimumFractionDigits: places, maximumFractionDigits: places })}`;
}

/**
 * Equivalent typed forms of an algebraic answer for SHORT_ANSWER accepted lists (whitespace and case are already
 * ignored by the expression normaliser). forms("3√2") → ["3√2", "3sqrt2", "3sqrt(2)", "3√(2)", "3*sqrt(2)"].
 * Handles √, π/pi, ²/³ superscripts, unicode minus, "*" between a number and a letter, and ln(x)/lnx. It does NOT
 * reorder terms or factors: list genuinely different equivalent answers yourself ((x-1)(x+2) and (x+2)(x-1)).
 */
export function forms(...answers) {
  const out = new Set();
  const add = (s) => out.add(s.replace(/\s+/g, ""));
  for (const a0 of answers.flat()) {
    const a = a0.replace(/−/g, "-").replace(/²/g, "^2").replace(/³/g, "^3").replace(/×/g, "*");
    add(a0);
    add(a);
    const variants = [a];
    const sq = a.replace(/√\(([^)]+)\)/g, "sqrt($1)").replace(/√([0-9a-z]+)/g, "sqrt($1)");
    variants.push(sq, sq.replace(/sqrt\(([0-9a-z]+)\)/g, "sqrt$1"), a.replace(/√([0-9a-z]+)/g, "√($1)"), sq.replace(/(\d)sqrt/g, "$1*sqrt"));
    for (const v of [...variants]) {
      variants.push(v.replace(/π/g, "pi"));
      variants.push(v.replace(/(\d)\*([a-z(√])/g, "$1$2"));
      variants.push(v.replace(/\b(ln|lg|log|sin|cos|tan)\(([0-9a-z]+)\)/g, "$1$2"));
    }
    variants.forEach(add);
  }
  return [...out];
}

// ---------------------------------------------------------------------------------------------------------------------
// Units: display hint + accepted spellings. A missing unit is fine; the unit is never required.
const UNITS = {
  m: ["m", "metres", "metre", "meters"],
  cm: ["cm", "centimetres"],
  mm: ["mm", "millimetres"],
  km: ["km", "kilometres"],
  s: ["s", "seconds", "second", "sec", "secs"],
  min: ["min", "minutes", "mins"],
  h: ["h", "hours", "hour", "hrs", "hr"],
  "m/s": ["m/s", "m s^-1", "ms^-1", "m s-1", "metres per second"],
  "km/h": ["km/h", "km h^-1", "kmh^-1", "kilometres per hour"],
  "m/s²": ["m/s²", "m/s^2", "m s^-2", "ms^-2", "m s-2"],
  "cm/s": ["cm/s", "cm s^-1", "cms^-1"],
  "cm²/s": ["cm²/s", "cm^2/s", "cm^2 s^-1"],
  "cm³/s": ["cm³/s", "cm^3/s", "cm^3 s^-1"],
  "m³/s": ["m³/s", "m^3/s", "m^3 s^-1"],
  N: ["N", "newtons", "newton"],
  kN: ["kN", "kilonewtons"],
  kg: ["kg", "kilograms", "kilogram"],
  g: ["g", "grams", "gram"],
  J: ["J", "joules", "joule"],
  kJ: ["kJ", "kilojoules"],
  W: ["W", "watts", "watt"],
  kW: ["kW", "kilowatts"],
  "°": ["°", "degrees", "degree", "deg"],
  rad: ["rad", "radians", "radian"],
  "cm²": ["cm²", "cm^2", "square centimetres"],
  "m²": ["m²", "m^2", "square metres"],
  "cm³": ["cm³", "cm^3", "cubic centimetres"],
  "m³": ["m³", "m^3", "cubic metres"],
  "units²": ["units²", "units^2", "square units", "unit^2"],
  "units³": ["units³", "units^3", "cubic units"],
  "%": ["%", "percent", "per cent"],
};

/**
 * Numeric spec. Default rule (Cambridge convention, also used for ZIMSEC): integers exact; other values to 3
 * significant figures — the tolerance is half a unit in the 3rd significant figure, so 3 s.f. and anything more accurate
 * scores, and an exact fraction typed as a fraction (2/3) scores too. `dp` fixes decimal places instead (angles in
 * degrees default to 1 d.p.); `sf` another number of significant figures; `tol` overrides everything (absolute).
 * Throws when the value sits too close to a rounding boundary (change the data).
 */
function numericSpec({ value, unit, dp, sf: nsf, tol }) {
  if (typeof value !== "number" || !Number.isFinite(value)) throw new Error(`numeric value must be a finite number (got ${value})`);
  if (unit && !UNITS[unit]) throw new Error(`Unknown unit ${unit} (add it to UNITS in lib.mjs via the coordinator)`);
  if (dp === undefined && nsf === undefined && unit === "°" && !Number.isInteger(value)) dp = 1;
  let model;
  const isInt = Math.abs(value - Math.round(value)) < 1e-12;
  if (tol === undefined) {
    if (dp !== undefined) {
      if (!isInt) guardBoundary(value, dp, 0.05, `value ${value}`);
      tol = isInt && dp === 0 ? 0 : halfUnit(dp);
      model = dpStr(value, dp);
    } else if (nsf !== undefined || !isInt) {
      const n = nsf ?? 3;
      const places = dpFor(value, n);
      guardBoundary(value, places, 0.05, `value ${value}`);
      tol = halfUnit(places);
      model = sfStr(value, n);
    } else {
      tol = 0;
      model = String(Math.round(value));
    }
  }
  if (model === undefined) model = isInt ? String(Math.round(value)) : sfStr(value, 3);
  const spec = { value: isInt ? Math.round(value) : value };
  if (tol) spec.tolerance = { kind: "absolute", amount: Number(tol.toPrecision(3)) };
  const payload = {};
  if (unit) {
    payload.unitHint = unit;
    spec.units = { required: false, accepted: UNITS[unit] };
  }
  return { spec, payload, model };
}

// ---------------------------------------------------------------------------------------------------------------------
/** Part builders (used inside struct parts and to build top-level questions). Each returns { part, model, wrong[] }. */
export const P = {
  /**
   * Numerical answer (NUMERICAL) or, with type "CALCULATION", a multi-step calculation (workedSolution defaults to the
   * explanation). { value (exact), dp?, sf?, tol?, unit?, prefix? ("x ="), answer? (model text), wrong: [values] }.
   */
  num({ label, marks = 1, stem, value, dp, sf: nsf, tol, unit, prefix, answer, wrong = [], explanation, workedSolution, hints, type = "NUMERICAL" }) {
    const { spec, payload, model } = numericSpec({ value, unit, dp, sf: nsf, tol });
    const part = { label, type, marks, stem };
    if (prefix) payload.answerPrefix = prefix;
    if (Object.keys(payload).length) part.payload = payload;
    part.answerSpec = spec;
    if (explanation) part.explanation = explanation;
    const ws = workedSolution ?? (explanation ? `1. ${explanation}` : undefined);
    if (ws) part.workedSolution = ws;
    if (hints) part.hints = hints;
    return { part, model: { type, value: answer ?? model }, wrong: wrong.map((w) => ({ type, value: String(w) })) };
  },
  /** options: [[content, rationale], ...]; answer: "A" or ["A","C"] (multiple). */
  mcq({ label, marks, stem, options, answer, multiple = false, explanation, hints, scoring }) {
    const answers = Array.isArray(answer) ? answer : [answer];
    marks ??= multiple ? 2 : 1;
    const opts = options.map(([content, rationale], i) => {
      const o = { key: OPTION_KEYS[i], content };
      if (answers.includes(OPTION_KEYS[i])) o.correct = true;
      if (rationale) o.rationale = rationale;
      return o;
    });
    const wrongKey = OPTION_KEYS.slice(0, options.length).find((k) => !answers.includes(k));
    const part = { label, type: "MULTIPLE_CHOICE", marks, stem };
    if (multiple) part.payload = { selectMode: "multiple" };
    part.options = opts;
    if (scoring) part.answerSpec = { scoring };
    if (explanation) part.explanation = explanation;
    if (hints) part.hints = hints;
    return { part, model: { type: "MULTIPLE_CHOICE", optionKeys: answers }, wrong: [{ type: "MULTIPLE_CHOICE", optionKeys: [wrongKey] }] };
  },
  tf({ label, marks = 1, stem, answer, feedbackTrue, feedbackFalse, explanation, hints, yesNo = false }) {
    const part = { label, type: "TRUE_FALSE", marks, stem };
    if (yesNo) part.payload = { statementStyle: "yes_no" };
    part.answerSpec = { correct: answer };
    if (feedbackTrue) part.answerSpec.feedbackTrue = feedbackTrue;
    if (feedbackFalse) part.answerSpec.feedbackFalse = feedbackFalse;
    if (explanation) part.explanation = explanation;
    if (hints) part.hints = hints;
    return { part, model: { type: "TRUE_FALSE", value: answer }, wrong: [{ type: "TRUE_FALSE", value: !answer }] };
  },
  /**
   * Short answer, auto-marked (words). accepted: exact answers (strings or {value, marks, feedback}); keywords; patterns
   * (anchored regexes); rejected. model defaults to the first accepted answer.
   */
  short({ label, marks = 1, stem, accepted, patterns, keywords, rubric, rejected, normalise, model, wrong = [], explanation, hints, maxLength }) {
    const spec = {};
    if (accepted) spec.accepted = accepted.map((a) => (typeof a === "string" ? { value: a } : a));
    if (patterns) spec.patterns = patterns;
    if (keywords) spec.keywords = keywords;
    if (rubric) spec.rubric = rubric;
    if (rejected) spec.rejected = rejected.map((r) => (typeof r === "string" ? { value: r } : r));
    spec.normalise = normalise ?? DEFAULT_NORMALISE;
    const part = { label, type: "SHORT_ANSWER", marks, stem };
    if (maxLength) part.payload = { maxLength };
    part.answerSpec = spec;
    if (explanation) part.explanation = explanation;
    if (hints) part.hints = hints;
    const first = model ?? (accepted ? (typeof accepted[0] === "string" ? accepted[0] : accepted[0].value) : null);
    if (!first) throw new Error(`short ${label ?? stem.slice(0, 40)}: model response needed`);
    return { part, model: { type: "SHORT_ANSWER", text: first }, wrong: wrong.map((w) => ({ type: "SHORT_ANSWER", text: w })) };
  },
  /**
   * Algebraic / exact answer typed by the student (an expression, a surd, a set of values): SHORT_ANSWER with
   * whitespace and case ignored and punctuation KEPT (brackets, /, ^ and - matter). accepted strings are expanded with
   * forms(); list every genuinely different equivalent form yourself. Tell the student the expected format in the stem
   * ("Give your answer in the form a√b", "Write the factors as (x − a)(x − b)").
   */
  expr({ label, marks = 1, stem, accepted, rejected, model, wrong = [], explanation, hints, maxLength = 60 }) {
    const list = forms(...accepted);
    return P.short({ label, marks, stem, accepted: list, rejected, normalise: EXPR_NORMALISE, model: model ?? accepted[0], wrong, explanation, hints, maxLength });
  },
  /**
   * Fill in the blank. template uses {{blank:id}} (never inside $…$); blanks: [{ id, accepted: [...], input? "number",
   * choices?, tolerance? (number blanks), marks?, wrong? }]. Text blanks ignore case and whitespace.
   */
  fib({ label, marks, stem, template, blanks, wrong, explanation, hints }) {
    const part = { label, type: "FILL_IN_THE_BLANK", marks: marks ?? blanks.length, stem };
    part.payload = {
      template,
      blanks: blanks.map((b) => {
        const o = { id: b.id };
        if (b.choices) {
          o.input = "select";
          o.choices = b.choices;
        } else if (b.input === "number") o.input = "number";
        return o;
      }),
    };
    part.answerSpec = {
      blanks: blanks.map((b) => {
        const o = { id: b.id, accepted: b.accepted.map(String) };
        if (b.marks !== undefined) o.marks = b.marks;
        if (b.tolerance !== undefined) o.tolerance = b.tolerance;
        if (b.normalise) o.normalise = b.normalise;
        else if (!b.choices && b.input !== "number") o.normalise = ["trim", "remove_whitespace"];
        return o;
      }),
    };
    if (explanation) part.explanation = explanation;
    if (hints) part.hints = hints;
    const model = { type: "FILL_IN_THE_BLANK", blanks: blanks.map((b) => ({ blankId: b.id, text: String(b.accepted[0]) })) };
    const wrongRows = wrong ?? [blanks.map((b) => b.wrong ?? (b.choices ? b.choices.find((c) => !b.accepted.includes(c)) : b.input === "number" ? "999" : "xyz"))];
    const wrongResponses = wrongRows.map((w) => ({ type: "FILL_IN_THE_BLANK", blanks: blanks.map((b, i) => ({ blankId: b.id, text: String(w[i]) })) }));
    return { part, model, wrong: wrongResponses };
  },
  /** Matching: pairs [[left, right], ...] matched by position (see the economics kit for the multiple-matching form). */
  match({ label, marks, stem, pairs, right, rightIndex, extraRight = [], explanation, hints, marksPerPair = 1, shuffle }) {
    let left;
    let rights;
    let answerPairs;
    if (right) {
      left = pairs.map((l, i) => ({ id: `L${i + 1}`, content: l }));
      rights = right.map((r, i) => ({ id: `R${i + 1}`, content: r }));
      answerPairs = rightIndex.map((ri, i) => ({ leftId: `L${i + 1}`, rightId: `R${ri + 1}` }));
    } else {
      left = pairs.map(([l], i) => ({ id: `L${i + 1}`, content: l }));
      const base = pairs.map(([, r], i) => ({ id: `R${i + 1}`, content: r }));
      extraRight.forEach((r, i) => base.push({ id: `X${i + 1}`, content: r }));
      rights = base.map((_, i) => base[(i + 2) % base.length]);
      answerPairs = pairs.map((_, i) => ({ leftId: `L${i + 1}`, rightId: `R${i + 1}` }));
    }
    const part = { label, type: "MATCHING", marks: marks ?? left.length * marksPerPair, stem };
    part.payload = { left, right: rights };
    if (shuffle !== undefined) part.payload.shuffle = shuffle;
    part.answerSpec = { pairs: answerPairs, marksPerPair };
    if (explanation) part.explanation = explanation;
    if (hints) part.hints = hints;
    const model = { type: "MATCHING", pairs: answerPairs };
    const wrongPairs = answerPairs.map((p, i) => ({ leftId: p.leftId, rightId: answerPairs[(i + 1) % answerPairs.length].rightId }));
    const wrongModel = { type: "MATCHING", pairs: wrongPairs.every((p, i) => p.rightId === answerPairs[i].rightId) ? answerPairs.map((p) => ({ leftId: p.leftId, rightId: rights.find((r) => r.id !== p.rightId).id })) : wrongPairs };
    return { part, model, wrong: [wrongModel] };
  },
  /**
   * Self-marked part ("explain", "describe", "sketch" described in words): points are "description" (1 mark) or
   * [description, marks, indicators?]; they must add up to the part's marks. modelAnswer goes into markingNotes.
   */
  manual({ label, marks, stem, points, modelAnswer, explanation, hints, type = "SHORT_ANSWER", wordLimit }) {
    const list = points.map((p, i) => {
      if (!Array.isArray(p)) return { id: `p${i + 1}`, description: p, marks: 1 };
      const o = { id: `p${i + 1}`, description: p[0], marks: p[1] };
      if (p[2]) o.indicators = p[2];
      return o;
    });
    const total = list.reduce((s, p) => s + p.marks, 0);
    if (total !== marks) throw new Error(`manual part ${label ?? stem.slice(0, 50)}: points total ${total} != marks ${marks}`);
    const part = { label, type, marks, markingMode: "MANUAL", stem };
    if (wordLimit && type !== "SHORT_ANSWER") part.payload = { wordLimit };
    part.answerSpec = { markScheme: { points: list } };
    if (modelAnswer && type !== "SHORT_ANSWER") part.answerSpec.modelAnswer = modelAnswer;
    if (modelAnswer && type === "SHORT_ANSWER") part.answerSpec.markingNotes = `Example answer: ${modelAnswer}`;
    if (explanation) part.explanation = explanation;
    if (hints) part.hints = hints;
    return { part, model: null, wrong: [] };
  },
  /**
   * "Show that" / proof part, self-marked: EXTENDED_RESPONSE with method points (M1 … A1 as in a mark scheme, each one
   * line a student can tick) and the full model proof (Markdown + LaTeX, one step per line) shown after marking.
   */
  proof({ label, marks, stem, points, modelAnswer, explanation, hints }) {
    if (!modelAnswer) throw new Error(`proof ${label ?? stem.slice(0, 40)}: modelAnswer (the full proof) required`);
    return P.manual({ label, marks, stem, points, modelAnswer, explanation, hints, type: "EXTENDED_RESPONSE" });
  },
  /**
   * A part with sub-parts: P.group({ label: "(b)", stem, parts: [P.num({ label: "(i)", ... }), ...] }). One level only;
   * its marks are the sum of the sub-parts. Responses are keyed "(b)(i)". (Exam items may instead use "(1)" … with
   * sub-parts "(a)" …; never labels like "1(a)".)
   */
  group({ label, stem, parts, explanation, hints }) {
    for (const p of parts) if (p.subs) throw new Error(`group ${label}: sub-parts cannot have sub-parts`);
    const part = { label, type: "STRUCTURED", marks: parts.reduce((s, p) => s + p.part.marks, 0), stem, parts: parts.map((p) => p.part) };
    if (explanation) part.explanation = explanation;
    if (hints) part.hints = hints;
    return { part, model: null, wrong: [], subs: parts.map((p) => ({ label: p.part.label, model: p.model, wrong: p.wrong })) };
  },
};

// ---------------------------------------------------------------------------------------------------------------------
const MODULES = [];

/**
 * Declares one concept's items in one file. opts: { file, keyPrefix, applies? (default for every item), extraConcepts? }.
 */
export function concept(conceptKey, { file, keyPrefix, applies: defaultApplies, extraConcepts = [] }, body) {
  const questions = [];
  const cards = [];
  let qn = 0;
  let cn = 0;

  function finish(built, opts) {
    const { d, marks, secs, skill, daily, examStyle, access, concepts, hints, explanation, conceptSummary, paper, workedSolution, calculator } = opts;
    const applies = opts.applies === null ? undefined : (opts.applies ?? defaultApplies);
    const m = marks ?? built.part.marks;
    const q = {
      key: `${keyPrefix}.q${String(++qn).padStart(2, "0")}`,
      type: built.part.type,
      concepts: concepts ?? [conceptKey, ...extraConcepts],
      difficulty: d,
      marks: m,
      estimatedSeconds: secs ?? Math.max(60, m * 90),
      stem: built.part.stem,
    };
    for (const k of ["payload", "answerSpec", "options", "markingMode"]) if (built.part[k] !== undefined) q[k] = built.part[k];
    q.explanation = explanation ?? built.part.explanation;
    if (workedSolution ?? built.part.workedSolution) q.workedSolution = workedSolution ?? built.part.workedSolution;
    if (conceptSummary) q.conceptSummary = conceptSummary;
    if (hints ?? built.part.hints) q.hints = hints ?? built.part.hints;
    if (built.model) q.modelResponse = built.model;
    if (built.wrong?.length) q.wrongResponses = built.wrong;
    q.skill = skill ?? "APPLICATION";
    if (daily) q.dailyEligible = true;
    if (examStyle) q.examStyle = true;
    if (applies) q.applies = applies;
    if (calculator !== undefined) q.calculator = calculator;
    if (paper) q.paper = paper;
    if (access) q.access = access;
    if (!q.explanation) throw new Error(`${q.key}: explanation required`);
    if (![1, 2, 3, 4, 5].includes(d)) throw new Error(`${q.key}: difficulty 1-5 required (d)`);
    if (d >= 3 && !q.hints) throw new Error(`${q.key}: difficulty ${d} needs hints`);
    if (daily && (d < 2 || d > 3)) throw new Error(`${q.key}: daily questions need difficulty 2-3`);
    if (RESERVED_MARKS.includes(m) && !(q.type === "STRUCTURED" && examStyle && applies)) {
      throw new Error(`${q.key}: ${m} marks are reserved for exam-format STRUCTURED items (examStyle + applies); use another mark total`);
    }
    questions.push(q);
    return q;
  }

  const b = {
    mcq: (o) => finish(P.mcq(o), o),
    /** Numerical answer: { value (exact), dp?, sf?, tol?, unit?, prefix?, wrong: [...] }. */
    num: (o) => finish(P.num(o), o),
    /** Calculation (working shown in workedSolution, defaults to the explanation): same fields as num. */
    calc: (o) => finish(P.num({ ...o, type: "CALCULATION" }), o),
    tf: (o) => finish(P.tf(o), o),
    short: (o) => finish(P.short(o), o),
    /** Algebraic / exact typed answer (see P.expr). */
    expr: (o) => finish(P.expr(o), o),
    fib: (o) => finish(P.fib(o), o),
    match: (o) => finish(P.match(o), o),
    /** Short self-marked answer (explain / describe): { stem, marks, points, modelAnswer }. */
    manualShort: (o) => finish(P.manual({ ...o, label: undefined, type: "SHORT_ANSWER" }), o),
    /** Self-marked proof or "show that": { stem, marks, points, modelAnswer }. */
    proof: (o) => finish(P.proof({ ...o, label: undefined }), o),
    /** Structured: parts = [P.xxx({ label, ... }), P.group(...), ...]; marks = sum of parts. */
    struct(o) {
      const parts = o.parts;
      const labels = new Set();
      for (const p of parts) {
        if (!PART_LABEL.test(p.part.label ?? "")) throw new Error(`struct "${o.stem.slice(0, 40)}": bad part label ${p.part.label} (use (a), (b) … or (1), (2) …)`);
        if (labels.has(p.part.label)) throw new Error(`struct: duplicate part label ${p.part.label}`);
        labels.add(p.part.label);
        for (const s of p.subs ?? []) if (!PART_LABEL.test(s.label ?? "")) throw new Error(`struct: bad sub-part label ${s.label} in ${p.part.label}`);
      }
      const part = { type: "STRUCTURED", stem: o.stem, marks: parts.reduce((s, p) => s + p.part.marks, 0) };
      const q = finish({ part, model: null, wrong: [] }, { ...o, marks: part.marks });
      const modelParts = {};
      const wrongParts = {};
      for (const p of parts) {
        if (p.subs) {
          for (const s of p.subs) {
            if (s.model) modelParts[`${p.part.label}${s.label}`] = s.model;
            if (s.wrong[0]) wrongParts[`${p.part.label}${s.label}`] = s.wrong[0];
          }
        } else {
          if (p.model) modelParts[p.part.label] = p.model;
          if (p.wrong[0]) wrongParts[p.part.label] = p.wrong[0];
        }
      }
      const ordered = {};
      for (const [k, v] of Object.entries(q)) {
        if (k === "explanation") ordered.parts = parts.map((p) => p.part);
        ordered[k] = v;
      }
      if (Object.keys(modelParts).length) ordered.modelResponse = { type: "STRUCTURED", parts: modelParts };
      if (Object.keys(wrongParts).length) ordered.wrongResponses = [{ type: "STRUCTURED", parts: wrongParts }];
      for (const k of ["skill", "dailyEligible", "examStyle", "applies", "calculator", "paper", "access"]) {
        if (k in ordered) {
          const v = ordered[k];
          delete ordered[k];
          ordered[k] = v;
        }
      }
      questions[questions.length - 1] = ordered;
      return ordered;
    },
    card(cardType, front, back, notes, extra = {}) {
      const c = { key: `${keyPrefix}.c${String(++cn).padStart(2, "0")}`, cardType, front, back };
      if (notes) c.notes = notes;
      c.concepts = extra.concepts ?? [conceptKey];
      const applies = extra.applies ?? defaultApplies;
      if (applies) c.applies = applies;
      cards.push(c);
    },
  };
  body(b);
  MODULES.push({ conceptKey, file, questions, cards });
  return { conceptKey, file, questions, cards };
}

export function allModules() {
  return MODULES;
}
