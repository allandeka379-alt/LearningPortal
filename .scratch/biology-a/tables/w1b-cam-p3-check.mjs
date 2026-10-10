import { pctChange, mean, dpStr, zeroCrossing, rnd } from "../lib.mjs";
const conc = [0.0, 0.2, 0.4, 0.6, 0.8, 1.0];
const init = [[1.52, 1.48, 1.55], [1.50, 1.47, 1.53], [1.49, 1.54, 1.51], [1.53, 1.50, 1.46], [1.48, 1.52, 1.50], [1.51, 1.49, 1.54]];
const fin = [[1.71, 1.66, 1.75], [1.58, 1.55, 1.62], [1.45, 1.50, 1.47], [1.37, 1.48, 1.31], [1.28, 1.31, 1.30], [1.25, 1.24, 1.28]];
conc.forEach((c, i) => {
  const p = init[i].map((x, j) => pctChange(x, fin[i][j]));
  console.log(c, p.map((x) => dpStr(x, 1)).join(" "), "mean", dpStr(mean(p), 2));
});
