// W2b lesson numbers: amaths.matrices.operations-inverses
import { mat, same, chk } from "../lib.mjs";
const A = [[2, -1, 3], [0, 4, 1]], B = [[1, 2], [3, 0], [-1, 5]];
console.log("AB", mat.mul(A, B), "BA", mat.mul(B, A));
const C = [[2, 1, 3], [0, -1, 4], [1, 2, 1]]; console.log("detC", mat.det(C));
const M = [[1, 1, 1], [1, 2, 3], [1, 3, 6]]; console.log("detM", mat.det(M), "adj", mat.adj(M), "inv", mat.inv(M));
const cof = M.map((row, i) => row.map((_, j) => ((i + j) % 2 ? -1 : 1) * mat.det(mat.minor(M, i, j)))); console.log("cof", cof);
same(mat.mul(M, mat.inv(M)).map((r) => r.map((v) => Math.round(v))), [[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
console.log("X", mat.mul(mat.inv(M), [[6], [14], [25]]));
const P2 = [[3, 5], [1, 2]]; console.log("detP2", mat.det(P2), mat.inv(P2));
const Q2 = [[2, 1], [4, 3]]; console.log("PQ", mat.mul(P2, Q2), "inv PQ", mat.inv(mat.mul(P2, Q2)), "QinvPinv", mat.mul(mat.inv(Q2), mat.inv(P2)));
