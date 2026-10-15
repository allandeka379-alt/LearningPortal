const mean = (a) => a.reduce((x, y) => x + y, 0) / a.length;
// Z1
const depths = [4, 7, 11, 9, 14, 6, 10]; console.log("Z1 mean depth", mean(depths), 6.2 - 4.2, 10 ** (1.5 * 2));
console.log("spread 30km", 6 * 5e6 / 1e6);
// Z2 slope
const ang = [3, 8, 14, 30, 10, 5];
const vs = ang.map((a) => 20 * Math.sin((a * Math.PI) / 180)); console.log(vs, vs.reduce((a, b) => a + b, 0), Math.tan(30 * Math.PI / 180) * 100);
// Z3
const R = [0, 4, 12, 28, 10, 2, 0, 0, 0, 0, 0, 0]; const Q = [6, 6, 7, 9, 14, 26, 41, 38, 29, 20, 14, 10];
const sf = Q.map((q) => q - 6); console.log("sum rain", R.reduce((a, b) => a + b, 0), "sf", sf.reduce((a, b) => a + b, 0), sf.reduce((a, b) => a + b, 0) * 3600);
console.log("rainvol", 0.056 * 120e6, (sf.reduce((a, b) => a + b, 0) * 3600) / (0.056 * 120e6) * 100, "rise", (41 - 14) / 2);
// Z4
const N = [52, 12, 3, 1]; console.log("rb", [52 / 12, 12 / 3, 3 / 1], mean([52 / 12, 12 / 3, 3]), "dd", 108.8 / 64, "wb", 780 - 640 - 110, 110 / 780 * 100);
// CS1
console.log("cs1", (62 - 40) / 40 * 100, (5.5-2.5)/5.5*100);
// CS2 subduction
console.log("dip", Math.atan((130 - 15) / (250 - 50)) * 180 / Math.PI, (130-15)/(250-50));
// CS3
console.log("cs3", 4.2+3.1+1.7, 6.0 + 3.8 + 2.2, ((6+3.8+2.2)-(4.2+3.1+1.7))/(4.2+3.1+1.7)*100);
