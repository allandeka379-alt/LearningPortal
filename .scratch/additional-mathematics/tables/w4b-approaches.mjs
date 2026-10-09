// Checks for lessons/probability/approaches.md
import { chk, F, same } from "../lib.mjs";
// Ex1: bag 5 red, 7 blue, 8 green
same(F(7, 20).s, "7/20"); same(F(13, 20).s, "13/20"); chk(1 - 7 / 20, 13 / 20);
// Ex2: drawing pin, relative frequencies
const rows = [[20, 9], [50, 21], [100, 37], [250, 95]];
const rf = rows.map(([n, k]) => k / n);
same(rf, [0.45, 0.42, 0.37, 0.38]);
chk(0.38 * 1000, 380);
// Ex3: spinner 4 sectors, 200 spins: 62, 45, 48, 45
const counts = [62, 45, 48, 45];
same(counts.reduce((a, b) => a + b, 0), 200);
same(counts.map((c) => c / 200), [0.31, 0.225, 0.24, 0.225]);
chk(200 * 0.25, 50);
// Ex4: expected frequency, P(red) = 0.15, 360 spins
chk(0.15 * 360, 54);
// Ex5: classical die: expected number of sixes in 270 rolls
chk(270 / 6, 45);
console.log("approaches lesson checks OK");
