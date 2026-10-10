console.log("Ns", 1150 * 12 / 230, "Is", 24 / 12, "Ip", 24 / 230);
for (const V of [33e3, 11e3]) { const I = 5.0e6 / V; console.log(V, "I", I, "loss", I * I * 4.0, "pct", I * I * 4.0 / 5e6 * 100); }
console.log("eff example", 0.95 * 0.5 * 12 / 230);
