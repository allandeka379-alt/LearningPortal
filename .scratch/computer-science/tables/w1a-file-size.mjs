// Checks for lessons/data/file-size.md
const K = 1024;
const img = (w, h, cd) => ({ bits: w * h * cd, bytes: w * h * cd / 8, KiB: w * h * cd / 8 / K, MiB: w * h * cd / 8 / K / K });
const snd = (rate, res, s) => ({ bits: rate * res * s, bytes: rate * res * s / 8, KiB: rate * res * s / 8 / K, MiB: rate * res * s / 8 / K / K });
console.log("1024x768x8", img(1024, 768, 8));
console.log("2048x1024x24", img(2048, 1024, 24));
console.log("8000Hz x16 x64s", snd(8000, 16, 64));
console.log("reverse: 1.5 MiB at 16384 Hz 8 bit", 1.5 * K * K * 8 / (16384 * 8), "s");
console.log("reverse 2", 3 * K * K * 8 / (32768 * 16));
