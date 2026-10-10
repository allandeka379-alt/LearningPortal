import { rf, sfStr, dpStr } from "../lib.mjs";
console.log("ex1", dpStr(rf(3.6, 8.0), 2), dpStr(rf(5.6, 8.0), 2), dpStr(rf(2.0,8.0),2));
// food colouring example: front 7.5; standards
for (const [n, d] of [["E102", 1.8], ["E110", 4.2], ["E133", 6.0], ["sample1", 1.8], ["sample2", 6.0]]) console.log(n, dpStr(rf(d, 7.5), 2));
