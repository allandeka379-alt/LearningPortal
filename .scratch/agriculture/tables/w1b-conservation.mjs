// Lesson numbers for soil/conservation: contour ridge spacing.
import { check } from "../lib.mjs";
const slopePct = (rise, run) => (rise / run) * 100;
const s = slopePct(2, 50); console.log("slope %", s);
const VI = 1.0; const HI = (VI / s) * 100; console.log("HI m", HI);
const len = 200; const ridges = Math.floor(len / HI + 1e-9); console.log("ridges", ridges);
// Fall along a channel: 1 in 250 over 375 m (given as an assumption in the example)
const fall = 375 / 250; console.log("fall m", fall);
check(HI === 25 && ridges === 8, "x");
