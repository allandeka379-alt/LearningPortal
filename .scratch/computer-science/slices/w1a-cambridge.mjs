// W1a: Cambridge 0478 Paper 1 exam-format items (STRUCTURED, 15 marks, ANALYSIS): number systems with two's complement
// and shifts; sound, images, file size and compression. Every value is computed below.
import { concept, P, CAM, toBase, fromBase, addBinary, twos, fromTwos, shift, rle } from "../lib.mjs";

const d = (s) => fromBase(s, 2);
const K = 1024;
const enc = (s) => rle(s).map(([n, c]) => `${n}${c}`).join(" ");

concept("comp.data.twos-complement", { file: "exam/w1a-cambridge", keyPrefix: "exam.w1a-cambridge", applies: CAM }, (b) => {
  // 1. Number systems, overflow, shifts and two's complement
  {
    const n16 = 2748;
    const hx = "9E";
    const [x, y] = ["01101011", "01010110"];
    const sum1 = addBinary(x, y);
    const [p, q] = ["11001010", "01100111"];
    const sum2 = addBinary(p, q);
    const sh = "11001100";
    const neg = -57;
    const tc = "10110101";
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: false, secs: 1350,
      concepts: ["comp.data.number-systems", "comp.data.binary-denary", "comp.data.hexadecimal", "comp.data.binary-addition", "comp.data.logical-shifts", "comp.data.twos-complement"],
      stem: "A microcontroller in an irrigation system at a farm near Chinhoyi stores data in 8-bit and 16-bit registers.",
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Explain why the microcontroller stores all data in binary.", points: ["It is made of switches/transistors/logic gates that have two states (on/off).", "The two states represent 1 and 0, so all data must be converted to binary to be processed and stored."], modelAnswer: "The microcontroller's circuits are made of transistors that act as switches with only two states. These states represent the binary digits 1 and 0, so data must be held in binary to be processed." }),
        P.bits({ label: "(b)", marks: 2, stem: `A 16-bit register holds the denary value ${n16}. Give this value in hexadecimal.`, value: n16, base: 16, width: 4, acceptUnpadded: true, wrong: ["CBA"], explanation: `${n16} = ${toBase(n16, 2, 16).match(/.{4}/g).join(" ")} → ${toBase(n16, 16, 4)} (0ABC or ABC).` }),
        P.bits({ label: "(c)", marks: 1, stem: `Convert the hexadecimal value ${hx} to 8-bit binary.`, value: fromBase(hx, 16), width: 8, explanation: `9 → 1001, E → 1110: ${toBase(fromBase(hx, 16), 2, 8)}.` }),
        P.bits({ label: "(d)", marks: 2, stem: `Add the 8-bit binary integers ${x} and ${y}. Give an 8-bit answer.`, value: sum1.value, width: 8, explanation: `${x} + ${y} = ${sum1.sum} ($${d(x)} + ${d(y)} = ${sum1.value}$).` }),
        P.bits({ label: "(e)", marks: 1, stem: `The 8-bit integers ${p} and ${q} are added. Give the 8 bits left in the register.`, value: d(sum2.sum), width: 8, wrong: [toBase(sum2.value, 2)], explanation: `The full sum is ${toBase(sum2.value, 2)} (${sum2.value}); the register keeps ${sum2.sum}.` }),
        P.manual({ label: "(f)", marks: 1, stem: "Explain why the result in (e) is incorrect.", points: [`The true sum (${sum2.value}) is greater than 255, so it needs 9 bits; the extra bit is lost (overflow).`], modelAnswer: `${d(p)} + ${d(q)} = ${sum2.value}, which is more than 255, the largest 8-bit value, so the ninth bit is lost: an overflow error.` }),
        P.bits({ label: "(g)", marks: 1, stem: `Carry out a logical right shift of 2 places on ${sh}. Give the 8-bit result.`, value: d(shift(sh, -2)), width: 8, wrong: [shift(sh, 2)], explanation: `${sh} → ${shift(sh, -2)}.` }),
        P.manual({ label: "(h)", marks: 1, stem: "Describe the effect of the shift in (g) on the value stored.", points: [`It divides the value by 4 (${d(sh)} → ${d(shift(sh, -2))}); here the result is exact because only 0s were shifted out.`], modelAnswer: `The value is divided by 4, from ${d(sh)} to ${d(shift(sh, -2))}; the two bits lost were 0s, so no remainder is lost.` }),
        P.bits({ label: "(i)", marks: 2, stem: `A temperature of ${neg} is stored in 8-bit two's complement. Give the binary value.`, value: neg, width: 8, twosComplement: true, wrong: [toBase(-neg, 2, 8)], explanation: `+57 = ${toBase(57, 2, 8)}; invert → ${toBase(57, 2, 8).replace(/[01]/g, (c) => (c === "0" ? "1" : "0"))}; add 1 → ${twos(neg)}.` }),
        P.num({ type: "CALCULATION", label: "(j)", marks: 1, stem: `Another register holds the two's complement value ${tc}. Give its denary value.`, value: fromTwos(tc), wrong: [d(tc)], explanation: `$-128 + 32 + 16 + 4 + 1 = ${fromTwos(tc)}$.` }),
        P.manual({ label: "(k)", marks: 1, stem: "Identify one place, other than memory dumps, where hexadecimal is used.", points: ["Any one: MAC addresses; HTML colour codes; error codes; assembly language / memory addresses."], modelAnswer: "MAC addresses of network cards." }),
      ],
      hints: ["Group 16 bits into nibbles for hexadecimal.", "Overflow: compare the sum with 255.", "Two's complement: positive in 8 bits, invert, add 1; the MSB is worth −128."],
      explanation: `(b) ${toBase(n16, 16, 4)}. (c) ${toBase(fromBase(hx, 16), 2, 8)}. (d) ${sum1.sum}. (e) ${sum2.sum}, overflow. (g) ${shift(sh, -2)}, ÷ 4. (i) ${twos(neg)}. (j) ${fromTwos(tc)}.`,
    });
  }
  // 2. Sound, images, file size and compression
  {
    const [rate, res, secs] = [16384, 8, 45];
    const sndKiB = (rate * res * secs) / 8 / K;
    const [w, h, cd] = [2560, 1200, 24];
    const imgKiB = (w * h * cd) / 8 / K;
    const row = "RRRRRRRRRRGGGGGRRRRRRBBB";
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: false, secs: 1350,
      concepts: ["comp.data.sound-images", "comp.data.file-size", "comp.data.compression"],
      stem: "A tourism company in Victoria Falls makes short promotional clips with recorded commentary and still photos for its website.",
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Describe how the commentary is stored as binary.", points: ["The amplitude/height of the sound wave is measured (sampled) at regular time intervals.", "Each sample is stored as a binary number using a fixed number of bits (the sample resolution)."], modelAnswer: "The sound wave's amplitude is sampled at set intervals, and each measurement is rounded and stored as a binary number using the sample resolution's number of bits." }),
        P.mcq({ label: "(b)", stem: "What is the effect of increasing the sample resolution?", options: [["More accurate sound and a larger file", "Correct: more levels per sample, more bits stored."], ["More accurate sound and a smaller file", "More bits per sample makes the file larger."], ["More samples taken each second", "That is the sample rate."], ["Less accurate sound and a larger file", "More bits per sample gives more accuracy."]], answer: "A", explanation: "Higher resolution → more possible levels → more accurate, but each sample uses more bits." }),
        P.num({ type: "CALCULATION", label: "(c)", marks: 3, unit: "KiB", stem: `The commentary is recorded for ${secs} seconds at ${rate} Hz with a sample resolution of ${res} bits. Calculate the file size in KiB. Show your working.`, value: sndKiB, wrong: [sndKiB * 8], explanation: `Bits $= ${rate} \\times ${res} \\times ${secs}$; bytes $= ${rate} \\times ${secs}$ (8-bit samples are 1 byte); KiB $= 16 \\times ${secs} = ${sndKiB}$ (since ${rate} = 16 × 1024).` }),
        P.num({ type: "CALCULATION", label: "(d)", marks: 1, unit: "bits", stem: "A logo uses 100 different colours. State the smallest colour depth that can be used.", value: Math.ceil(Math.log2(100)), wrong: [6, 100], explanation: "$2^6 = 64 < 100 \\leq 128 = 2^7$, so 7 bits." }),
        P.num({ type: "CALCULATION", label: "(e)", marks: 2, unit: "KiB", stem: `A photo is ${w} × ${h} pixels with a colour depth of ${cd} bits. Calculate its file size in KiB.`, value: imgKiB, wrong: [imgKiB * 8], explanation: `Bytes $= ${w} \\times ${h} \\times 3$; KiB $= \\frac{${w} \\times ${h} \\times 3}{1024} = 2.5 \\times ${h} \\times 3 = ${imgKiB}$.` }),
        P.manual({ label: "(f)", marks: 2, stem: "The photos load slowly on phones. Describe one lossy method that could reduce the photos' file size and its effect on the photos.", points: ["Method: reduce the resolution (fewer pixels) or reduce the colour depth (fewer bits per pixel).", "Effect: the data is permanently removed, so the photo has less detail / fewer colours (lower quality), but a smaller file."], modelAnswer: "Reduce the colour depth from 24 to 8 bits per pixel. The file becomes a third of the size, but each pixel can only be one of 256 colours, so shading looks less smooth and the lost data cannot be recovered." }),
        P.short({ label: "(g)", marks: 2, stem: `One row of the company logo has the pixel colours ${row.split("").join(" ")}. Write the row using run-length encoding as count then colour (for example 3B).`, accepted: [enc(row), enc(row).replace(/ /g, "")], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["10R 5G 5R 3B"], explanation: `${enc(row)}.` }),
        P.manual({ label: "(h)", marks: 2, stem: "The company's price list is a spreadsheet that is emailed to agents. Explain why it should be compressed with lossless rather than lossy compression.", points: ["Lossless compression lets the original be rebuilt exactly.", "Every price/value in the spreadsheet must be exactly right; lossy would permanently remove/change data."], modelAnswer: "With lossless compression the spreadsheet is rebuilt exactly when it is decompressed. Lossy compression would permanently remove data, which could change or lose prices, so it is unsuitable." }),
      ],
      hints: ["File sizes: work in bits, then ÷ 8 and ÷ 1024; cancel before multiplying.", "Number of colours = $2^{\\text{depth}}$.", "RLE: count each run of the same colour."],
      explanation: `(c) ${sndKiB} KiB. (d) 7 bits. (e) ${imgKiB} KiB. (g) ${enc(row)}.`,
    });
  }
});
