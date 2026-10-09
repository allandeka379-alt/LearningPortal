// Checks for lessons/mechanics/friction.md
import { chk, rad } from "../lib.mjs";
const { cos, sin, tan } = Math;
const g = 9.8;
// Ex1 20 kg, μ = 0.4, push 50 N
chk(20 * g, 196); chk(0.4 * 196, 78.4);
// Ex2 pull at 30°: P cos30 = 0.4(196 − P sin30)
const P = 78.4 / (cos(rad(30)) + 0.4 * sin(rad(30)));
chk(P * cos(rad(30)), 0.4 * (196 - P * sin(rad(30))), 1e-9);
console.log("ex2 P", P, "R", 196 - P * sin(rad(30)));
// Ex3 4 kg on 25°, μ = 0.6
console.log("ex3", 4 * g * sin(rad(25)), 4 * g * cos(rad(25)), 0.6 * 4 * g * cos(rad(25)), tan(rad(25)));
// Ex4 5 kg on 35°, μ = 0.25
const W = 5 * g, Ws = W * sin(rad(35)), R = W * cos(rad(35)), F = 0.25 * R;
console.log("ex4", Ws, R, F, Ws - F, Ws + F);
