// Worked examples for lessons/sampling/methods.md
const sizes = [620, 380, 200], n = 60, N = 1200;
console.log("strata", sizes.map((x) => (x * n) / N));
console.log("k", 1200 / 60);
const rn = ["0917", "1342", "0588", "0917", "1105", "0021"];
const out = []; for (const r of rn) { const v = +r; if (v >= 1 && v <= 1200 && !out.includes(v)) out.push(v); }
console.log("picked", out.slice(0, 4));
