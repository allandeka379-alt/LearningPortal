// Checks the worked examples of lessons/trig/radians-arcs-sectors.md.
import { chk, rnd, sf, quad, same, deg } from "../lib.mjs";

const { sin, cos, tan, PI, sqrt } = Math;
// Ex1: 135° = 3π/4; 2.5 rad = 143.2°
chk((135 * PI) / 180, (3 * PI) / 4); rnd(deg(2.5), 1, 143.2);
// Ex2: r = 12, θ = 0.9 → arc 10.8, area 64.8, perimeter 34.8
chk(12 * 0.9, 10.8); chk(0.5 * 144 * 0.9, 64.8); chk(24 + 10.8, 34.8);
// Ex3: segment r = 8, θ = 1.3 → 32(1.3 − sin 1.3) = 10.8
sf(32 * (1.3 - sin(1.3)), 3, 10.8); rnd(sin(1.3), 4, 0.9636); rnd(0.5 * 64 * 1.3, 1, 41.6); rnd(0.5 * 64 * sin(1.3), 2, 30.83);
// Ex4: r = 6, θ = 2π/3: arc 4π, chord 6√3, perimeter 4π + 6√3, segment area 12π − 9√3
chk(6 * (2 * PI) / 3, 4 * PI); chk(2 * 6 * sin(PI / 3), 6 * sqrt(3));
chk(0.5 * 36 * (2 * PI / 3 - sin(2 * PI / 3)), 12 * PI - 9 * sqrt(3));
rnd(4 * PI + 6 * sqrt(3), 2, 22.96); rnd(12 * PI - 9 * sqrt(3), 2, 22.11);
// Ex5: 2r + rθ = 20, ½r²θ = 16 → r² − 10r + 16 = 0 → r = 2 (θ = 8, rejected) or r = 8 (θ = 0.5)
same(quad.roots(1, -10, 16), [2, 8]); chk((20 - 16) / 8, 0.5); chk(0.5 * 64 * 0.5, 16); chk((20 - 4) / 2, 8);
// Ex6: small angles: sin 3x tan 2x / (1 − cos 4x) ≈ 6x² / 8x² = 3/4
for (const x of [0.01, 0.001]) chk((sin(3 * x) * tan(2 * x)) / (1 - cos(4 * x)), 0.75, 2e-4);
console.log("radians lesson OK");
