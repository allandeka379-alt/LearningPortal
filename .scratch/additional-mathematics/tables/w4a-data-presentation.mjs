// Checks for lessons/statistics/data-presentation.md
import { same, sum, grouped } from "../lib.mjs";
// pie chart: 72 learners
const pie = [20, 16, 24, 12]; same(sum(pie), 72); console.log("angles", pie.map((f) => (f / 72) * 360));
// histogram
const cls = [[0, 10, 8], [10, 15, 15], [15, 20, 22], [20, 30, 18], [30, 50, 12]];
const G = grouped(cls); console.log("fd", G.fd, "cf", G.cf, "n", G.n);
// stem and leaf
const marks = [34, 41, 45, 47, 52, 53, 53, 58, 61, 64, 66, 70, 72, 79, 85];
console.log(marks.length);
// boundaries: 40-44 etc
console.log([40, 45, 50, 55].map((l) => [l - 0.5, l + 4.5, (l + l + 4) / 2]));
