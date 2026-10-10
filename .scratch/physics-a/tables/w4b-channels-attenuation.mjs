const out = 5.0 * 10 ** (-(0.25 * 60) / 10); console.log("fibre out mW", out);
const Smin = 4.0e-6 * 10 ** 2.5; const L = 10 * Math.log10(0.2 / Smin); console.log("Smin", Smin, "loss", L, "dist", L / 8.0);
console.log("delay", 2 * 3.6e7 / 3e8);
// geostationary radius
const G = 6.67e-11, M = 5.98e24, T = 86400; const r = Math.cbrt(G * M * T * T / (4 * Math.PI ** 2)); console.log("r", r, "h", r - 6.4e6);
