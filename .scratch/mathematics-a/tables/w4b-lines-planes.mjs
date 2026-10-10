import { v3, deg } from "../lib.mjs";
const { asin, acos, abs } = Math;
{ const a = [1, 2, -1], b = [2, -1, 3], n = [1, 1, 2]; const t = (15 - v3.dot(n, a)) / v3.dot(n, b); console.log("Ex1 t", t, v3.add(a, v3.scale(t, b)), "angle", deg(asin(abs(v3.dot(b, n)) / (v3.mag(b) * v3.mag(n))))); }
{ const n1 = [2, -1, 2], n2 = [1, 2, -2]; console.log("Ex2 angle", deg(acos(abs(v3.dot(n1, n2)) / (v3.mag(n1) * v3.mag(n2)))), "dir", v3.cross(n1, n2), "pt check", v3.dot(n1, [2, 1, 0]), v3.dot(n2, [2, 1, 0])); }
{ const n = [2, -1, 2]; console.log("Ex3 dist", v3.planeDist([4, -1, 3], n, 3)); const t = (v3.dot(n, [4, -1, 3]) - 3) / v3.dot(n, n); console.log("foot", v3.sub([4, -1, 3], v3.scale(t, n)), t); }
