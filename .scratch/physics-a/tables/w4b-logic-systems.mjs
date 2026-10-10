import { table } from "../lib.mjs";
const rows = [];
for (let L = 0; L < 2; L++) for (let M = 0; M < 2; M++) for (let D = 0; D < 2; D++) rows.push([L, M, D, (L | M) & (1 - D)]);
console.log(table(["L", "M", "D", "P"], rows));
console.log(table(["A", "B", "S", "C"], [[0,0],[0,1],[1,0],[1,1]].map(([a,b]) => [a, b, a ^ b, a & b])));
// NOR latch: Q = NOR(R, Qbar), Qbar = NOR(S, Q)
function settle(S, R, Q) { let q = Q, qb = 1 - Q; for (let i = 0; i < 6; i++) { const nq = 1 - (R | qb); const nqb = 1 - (S | nq); q = nq; qb = nqb; } return [q, qb]; }
for (const [S, R] of [[1, 0], [0, 0], [0, 1], [0, 0]]) console.log(S, R, settle(S, R, 0), settle(S, R, 1));
