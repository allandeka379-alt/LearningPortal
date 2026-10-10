// W2b lesson numbers: amaths.matrices.transformations
import { mat, same, chk } from "../lib.mjs";
const R90 = [[0, -1], [1, 0]], Mx = [[1, 0], [0, -1]];
same(mat.mul(R90, Mx), [[0, 1], [1, 0]]);
console.log("RM", mat.mul(R90, Mx), "MR", mat.mul(Mx, R90));
const S = [[1, 2], [0, 1]]; console.log("shear", mat.mul(S, [[1, 3, 1], [0, 0, 2]]));
const A = [[3, 1], [2, 4]]; console.log("det", mat.det(A));
const r60 = (t) => [[Math.cos(t), -Math.sin(t)], [Math.sin(t), Math.cos(t)]];
const R = r60(Math.PI / 3); const R6 = mat.pow(R, 6); console.log("R^6", R6.map((r) => r.map((v) => Math.round(v * 1e9) / 1e9)));
// reflection in y = x tan 30°
const Ref = (a) => [[Math.cos(2 * a), Math.sin(2 * a)], [Math.sin(2 * a), -Math.cos(2 * a)]];
console.log("ref30", Ref(Math.PI / 6));
// image of line y = x + 1 under [[2,0],[0,3]]: X = 2x, Y = 3y → Y = 3(X/2 + 1) = 1.5X + 3
chk(3 * (2 / 2 + 1), 1.5 * 2 + 3);
