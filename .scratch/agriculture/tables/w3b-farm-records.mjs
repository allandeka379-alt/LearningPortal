// Lesson numbers for business/farm-records.
const open = 120, rec = [85, 64], pay = [96, 12];
const r = rec.reduce((a, b) => a + b), p = pay.reduce((a, b) => a + b);
console.log({ r, p, close: open + r - p });
console.log("labour", 3 * 6 * 0.75, "US$ (3 workers x 6 h x 0.75/h)");
