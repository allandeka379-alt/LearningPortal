// W4a lesson numbers: amaths.momentum.collisions
import { chk } from "../lib.mjs";
const vB = (0.4 * 5 - 0.4 * 1) / 0.6; console.log("Ex1", vB);
const vc = (8000 * 3 - 4000 * 1.5) / 12000; console.log("Ex2", vc, "KE before", 0.5 * 8000 * 9 + 0.5 * 4000 * 2.25, "after", 0.5 * 12000 * vc * vc);
const I = 0.15 * (8 - -12); console.log("Ex3", I, I / 0.05);
const vQ = (2 * 4 - 3 * 2 + 2 * 1) / 3; console.log("Ex4 vQ", vQ, "QR", 3 * vQ / 4); chk(2 * 4 - 3 * 2, 2 * -1 + 3 * vQ);
