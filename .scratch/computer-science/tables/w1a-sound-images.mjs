// Tables for lessons/data/sound-images.md
import { toBase } from "../lib.mjs";
// Sound: a wave A(t) = 3.5 + 3.4 sin(2*pi*t/8) sampled at t = 0..8, quantised to 3 bits (0-7)
console.log("| Sample | Time (ms) | Level (0-7) | Stored (3 bits) |\n|:-:|:-:|:-:|:-:|");
for (let i = 0; i <= 8; i++) { const v = Math.round(3.5 + 3.4 * Math.sin(2 * Math.PI * i / 8) - 0.0001); console.log(`| ${i + 1} | ${i} | ${v} | ${toBase(v, 2, 3)} |`); }
// colour depth table
console.log("| Colour depth (bits per pixel) | Number of colours |\n|:-:|:-:|");
for (const b of [1, 2, 4, 8, 16, 24]) console.log(`| ${b} | ${(2 ** b).toLocaleString("en-GB")} |`);
// 1-bit 6x6 image of a letter T: 1 = black
const img = ["111111", "111111", "001100", "001100", "001100", "001100"];
console.log(img.map(r => r.split("").map(c => c === "1" ? "■" : "□").join(" ")).join("\n"));
// 2-bit colour palette
for (let i = 0; i < 4; i++) console.log(toBase(i, 2, 2));
console.log(2**16, 2**3, 2**4, 44100);
