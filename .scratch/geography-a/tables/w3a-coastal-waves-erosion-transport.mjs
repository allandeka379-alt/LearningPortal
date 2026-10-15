const L = (T) => 1.56 * T * T, C = (T) => 1.56 * T;
console.log("T=8 L", L(8), "c", C(8), "freq/min", 60 / 8);
console.log("energy ratio 3m vs 1m", (3 / 1) ** 2);
console.log("drift 150m/3d", 150 / 3);
const inp = 40000 + 15000 + 10000, out = 50000 + 5000;
console.log("budget", inp, out, inp - out);
console.log("constructive T range", 60 / 8, 60 / 6, "destructive", 60 / 14, 60 / 10);
console.log("break depth 1.3*H for 2 m:", 1.3 * 2);
