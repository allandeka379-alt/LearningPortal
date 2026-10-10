// Model yields for A2 + 3B2 <=> 2AB3 (1:3 feed), Kp from dH, dS (ideal gases, standard pressure 1 atm).
export function yieldAB3(T, P, dH = -92000, dS = -199) {
  const Kp = Math.exp(-dH / (8.31 * T) + dS / 8.31);
  const f = (x) => { const tot = 4 - 2 * x; return ((2 * x / tot) ** 2) / (((1 - x) / tot) * ((3 - 3 * x) / tot) ** 3 * P * P) - Kp; };
  let lo = 1e-9, hi = 1 - 1e-12;
  for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (f(m) > 0) hi = m; else lo = m; }
  const x = (lo + hi) / 2;
  return (2 * x / (4 - 2 * x)) * 100;
}
if (process.argv[1].endsWith("w2a-dynamic-le-chatelier.mjs")) {
  for (const T of [600, 700, 800]) console.log(T, [50, 100, 200].map((P) => yieldAB3(T, P).toFixed(2)).join(" "));
}
