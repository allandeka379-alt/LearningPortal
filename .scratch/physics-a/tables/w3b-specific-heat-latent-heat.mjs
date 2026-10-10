const c = 4200, L = 2.26e6;
console.log("kettle t1", 1.2 * c * 78 / 2200, "t2", 0.10 * L / 2200);
console.log("mixtures", (0.15 * 385 * 100 + 0.2 * c * 20) / (0.15 * 385 + 0.2 * c));
console.log("two-power L", (60 - 40) * 300 / (7.17e-3 - 4.51e-3), "loss", (60 * 300 - 7.17e-3 * 2.2556e6) / 300);
