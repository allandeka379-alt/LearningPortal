// Values for lessons/prog/maintainable-code.md: both versions of the commission algorithm run on the same data.
const sales = [60, 30, 120, 50, 40];
// Poor version mirror.
let a = 0;
for (const c of sales) if (c > 40) a = a + c * 0.1;
// Improved version mirror (constants).
const Threshold = 40;
const Rate = 0.1;
let commission = 0;
for (const s of sales) if (s > Threshold) commission += s * Rate;
console.log(Number(a.toFixed(2)), Number(commission.toFixed(2)), sales.filter((s) => s > Threshold));
