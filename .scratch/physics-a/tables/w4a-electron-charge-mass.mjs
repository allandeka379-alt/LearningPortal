import { DATA, sfStr, sciTex, table } from "../lib.mjs";
const { e, me, g } = DATA;
// WE1 fine beam
{ const V = 250, B = 0.80e-3, r = 6.7e-2; console.log("WE1 e/m", sciTex(2 * V / (B * B * r * r)), "v", sciTex(Math.sqrt(2*e*V/me))); }
// WE2 crossed
{ const V = 2000, d = 0.040, B = 1.6e-3, r = 0.11; const E = V / d, v = E / B; console.log("WE2 E", sciTex(E), "v", sciTex(v), "e/m", sciTex(v / (B * r))); }
// WE3 Millikan
{ const r = 1.2e-6, rho = 870, d = 8.0e-3; const m = (4 / 3) * Math.PI * r ** 3 * rho; const W = m * g; const V3 = W * d / (3 * e);
  console.log("WE3 m", sciTex(m), "W", sciTex(W), "V for 3e", V3); const V = 104; const q = W * d / V; console.log("q at", V, sciTex(q), q / e); }
// Millikan-like data
const n = [2, 5, 3, 7, 4, 1, 6];
const noise = [0.012, -0.008, 0.015, -0.005, -0.012, 0.02, 0.006];
console.log(table(["drop", "q / 10^-19 C", "q/e"], n.map((k, i) => [i + 1, (k * 1.6 * (1 + noise[i])).toFixed(2), (k * (1 + noise[i])).toFixed(2)])));
