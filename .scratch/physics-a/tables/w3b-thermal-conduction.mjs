const P1 = 0.60 * 7.5 * 14 / 0.22; console.log("wall", P1);
const kc = 385, ks = 50; const th = (kc * 100) / (kc + ks); console.log("interface", th, "rate per area per (L=0.10)", kc * (100 - th) / 0.10, "A=2e-4 rate", kc * 2e-4 * (100 - th) / 0.10);
// composite window: single 4 mm glass k=0.80 vs double
