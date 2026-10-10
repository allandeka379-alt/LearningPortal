import { quad } from "../lib.mjs";
const g = 9.8;
console.log("Ex1 x", 0.5 * g * 0.8 / 24);
{ const y = 0.8 / 2.25, x = 1.25 * y; console.log("Ex2 x", x, "y", y, "T", 20 * x, 30 * y / 1.2, "AP", 1 + x); }
{ const m = 60, l = 20, lam = 1500; const r = quad.roots(lam / (2 * l), -m * g, -m * g * l); console.log("Ex3 roots", r, "dist", l + r[1]);
  const x0 = m * g * l / lam; const KE = m * g * (l + x0) - lam * x0 * x0 / (2 * l); console.log("x0", x0, "KE", KE, "v", Math.sqrt(2 * KE / m), "EPE at bottom", lam * r[1] ** 2 / (2 * l), "mg(l+x)", m * g * (l + r[1]));
  console.log("free fall speed at 20 m", Math.sqrt(2 * g * 20)); }
