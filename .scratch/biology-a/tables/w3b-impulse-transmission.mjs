// Lesson numbers for coordination/impulse-transmission.
import { chk } from "../lib.mjs";
chk(0.060 / 0.0012, 50);
chk(60 / 1.2, 50);
chk(0.9 / 90, 0.01);
chk(0.9 / 1, 0.9);
chk(25 / 1, 25);
chk(500 / 10, 50);
console.log("speed", 0.060 / 0.0012, "time ms", (0.9 / 90) * 1000, "ratio", 0.9 / (0.9 / 90));
