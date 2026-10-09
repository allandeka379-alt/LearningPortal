// W1a: image and sound file size calculations (Cambridge only), 1024-based units.
import { concept, P } from "../lib.mjs";

const K = 1024;
const imgBits = (w, h, cd) => w * h * cd;
const sndBits = (r, res, s) => r * res * s;
const toKiB = (bits) => bits / 8 / K;
const toMiB = (bits) => bits / 8 / K / K;
const exact = (v, m) => {
  if (!Number.isInteger(v * 1000)) throw new Error(`${m}: not neat ${v}`);
  return v;
};

concept("comp.data.file-size", { file: "data/file-size", keyPrefix: "data.file-size" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which calculation gives the file size of a bitmap image **in bits**?",
    options: [
      ["width × height × colour depth", "Correct: number of pixels × bits per pixel."],
      ["width × height × number of colours", "Use the colour depth (bits), not the number of colours."],
      ["width × height ÷ colour depth", "Each pixel uses colour-depth bits, so multiply."],
      ["width + height + colour depth", "The pixels form a grid, so the dimensions are multiplied."],
    ],
    answer: "A",
    explanation: "Pixels = width × height; each pixel needs colour-depth bits.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which calculation gives the file size of a sound recording **in bits**?",
    options: [
      ["sample rate × sample resolution × length in seconds", "Correct: samples per second × bits per sample × seconds."],
      ["sample rate × length in minutes", "This leaves out the bits per sample and uses the wrong time unit."],
      ["sample resolution × length in seconds", "This leaves out how many samples are taken each second."],
      ["sample rate ÷ sample resolution × length in seconds", "Each sample uses resolution bits, so multiply, not divide."],
    ],
    answer: "A",
    explanation: "Total samples = rate × seconds; each sample uses the sample resolution in bits.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A file size has been calculated in **bits**. What is the next step to give it in **KiB**?",
    options: [
      ["Divide by 8, then divide by 1024", "Correct: bits → bytes (÷ 8), bytes → KiB (÷ 1024)."],
      ["Divide by 1024 only", "That skips the bits → bytes step and is 8 times too big."],
      ["Multiply by 8, then divide by 1024", "Going from bits to bytes divides by 8."],
      ["Divide by 1000", "Cambridge uses 1024, and the ÷ 8 step is still needed."],
    ],
    answer: "A",
    explanation: "Always convert bits to bytes first (÷ 8), then each step up is ÷ 1024.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "An image's width and height are both **doubled** and its colour depth is unchanged. What happens to the file size?",
    options: [
      ["It becomes 4 times as large", "Correct: 2 × 2 = 4 times as many pixels."],
      ["It becomes 2 times as large", "Both dimensions double, so the number of pixels is multiplied by 4."],
      ["It stays the same", "More pixels always need more bits."],
      ["It becomes 8 times as large", "Only the pixel count changes (× 4); the bits per pixel are the same."],
    ],
    answer: "A",
    hints: ["Number of pixels = width × height."],
    explanation: "$(2w) \\times (2h) = 4wh$, so the size is 4 times as large.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A recording is changed from a sample resolution of 8 bits to 16 bits, and its sample rate is **halved**. What happens to the file size?",
    options: [
      ["It stays the same", "Correct: × 2 for the resolution and ÷ 2 for the rate cancel out."],
      ["It doubles", "The halved sample rate cancels the doubled resolution."],
      ["It halves", "The doubled resolution cancels the halved rate."],
      ["It becomes 4 times as large", "This ignores the halved sample rate."],
    ],
    answer: "A",
    hints: ["The size is proportional to rate × resolution."],
    explanation: "Size ∝ rate × resolution: $\\frac{1}{2} \\times 2 = 1$, so no change.",
  });
  {
    const [w, h, cd] = [512, 256, 8];
    const v = exact(toKiB(imgBits(w, h, cd)), "img1");
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: false, unit: "KiB",
      stem: `An image is ${w} × ${h} pixels with a colour depth of ${cd} bits. Calculate its file size in **KiB**.`,
      value: v, wrong: [v * 8, imgBits(w, h, cd) / 1000 / 8],
      explanation: `$${w} \\times ${h} \\times ${cd} \\div 8 \\div 1024 = ${v}$ KiB.`,
      workedSolution: `1. Bits $= ${w} \\times ${h} \\times ${cd}$.\n2. Bytes $= ${w} \\times ${h} = ${w * h}$ (÷ 8 cancels the 8).\n3. KiB $= ${w * h} \\div 1024 = ${v}$.`,
    });
  }
  {
    const [w, h, cd] = [1600, 2048, 16];
    const v = exact(toKiB(imgBits(w, h, cd)), "img2");
    b.calc({
      d: 3, skill: "APPLICATION", calculator: false, unit: "KiB",
      stem: `A photo is ${w} × ${h} pixels with a colour depth of ${cd} bits. Calculate its file size in **KiB**.`,
      value: v, wrong: [v * 8, v / 2],
      hints: ["Divide the colour depth by 8 first: 16 bits = 2 bytes per pixel.", "Then divide by 1024: 2048 ÷ 1024 = 2."],
      explanation: `Bytes $= ${w} \\times ${h} \\times 2$; KiB $= ${w} \\times 2 \\times 2 = ${v}$.`,
    });
  }
  {
    const [w, h, cd] = [3072, 2048, 8];
    const v = exact(toMiB(imgBits(w, h, cd)), "img3");
    b.calc({
      d: 4, skill: "APPLICATION", calculator: false, unit: "MiB",
      stem: `An image is ${w} × ${h} pixels with a colour depth of ${cd} bits. Calculate its file size in **MiB**.`,
      value: v, wrong: [v * 8, v * 1024],
      hints: ["8 bits = 1 byte per pixel.", "3072 = 3 × 1024 and 2048 = 2 × 1024."],
      explanation: `Bytes $= ${w} \\times ${h}$. MiB $= \\frac{3 \\times 1024 \\times 2 \\times 1024}{1024 \\times 1024} = ${v}$ MiB.`,
    });
  }
  {
    const [r, res, s] = [16000, 8, 32];
    const v = exact(toKiB(sndBits(r, res, s)), "snd1");
    b.calc({
      d: 3, skill: "APPLICATION", calculator: false, unit: "KiB",
      stem: `A sound is recorded for ${s} seconds at a sample rate of ${r} Hz with a sample resolution of ${res} bits. Calculate the file size in **KiB**.`,
      value: v, wrong: [v * 8, (r * s) / 1000],
      hints: ["8-bit samples are 1 byte each.", "Then divide by 1024: $32 \\div 1024 = \\frac{1}{32}$."],
      explanation: `Bytes $= ${r} \\times ${s}$; KiB $= ${r} \\times ${s} \\div 1024 = ${r} \\div 32 = ${v}$.`,
    });
  }
  {
    const [r, res, s] = [8192, 16, 60];
    const v = exact(toKiB(sndBits(r, res, s)), "snd2");
    b.calc({
      d: 4, skill: "APPLICATION", calculator: false, unit: "KiB",
      stem: `A voice note is recorded for 1 minute at a sample rate of ${r} Hz with a sample resolution of ${res} bits. Calculate the file size in **KiB**.`,
      value: v, wrong: [v / 60, v * 8],
      hints: ["Change 1 minute to seconds.", "8192 = 8 × 1024."],
      explanation: `Bits $= ${r} \\times ${res} \\times ${s}$; bytes $= ${r} \\times 2 \\times ${s}$; KiB $= 8 \\times 2 \\times ${s} = ${v}$.`,
    });
  }
  {
    const avail = 5; // MiB
    const [r, res] = [16384, 8];
    const secs = exact((avail * K * K * 8) / (r * res), "rev1");
    b.calc({
      d: 5, skill: "ANALYSIS", calculator: false, unit: "s",
      stem: `A recorder has ${avail} MiB of free memory. It records sound at ${r} Hz with a sample resolution of ${res} bits. For how many seconds can it record?`,
      value: secs, wrong: [secs * 8, secs / 60],
      hints: ["Find how many bytes are used per second.", "16384 = 16 × 1024."],
      explanation: `Bytes per second $= ${r} \\times 1 = ${r}$. Free bytes $= ${avail} \\times 1024 \\times 1024$. Time $= \\frac{${avail} \\times 1024 \\times 1024}{16 \\times 1024} = ${avail} \\times 64 = ${secs}$ s.`,
    });
  }
  b.num({
    d: 3, skill: "APPLICATION", calculator: false, unit: "bits",
    stem: "An image can show **256** different colours. What colour depth does it use?",
    value: 8, wrong: [256, 16],
    hints: ["Find $n$ so that $2^n = 256$."],
    explanation: "$2^8 = 256$, so the colour depth is 8 bits.",
    workedSolution: "1. Colours $= 2^{\\text{depth}}$.\n2. $2^8 = 256$, so depth = 8 bits.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Calculating width × height × colour depth gives an image's file size in bytes.",
    answer: false,
    explanation: "False. It gives the size in **bits**; divide by 8 for bytes.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Doubling the length of a recording, with the same sample rate and resolution, doubles its file size.",
    answer: true,
    explanation: "True. Twice as many seconds means twice as many samples.",
  });
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Rudo calculates the size of a 640 × 512 image with 24-bit colour. Complete her working.",
    template: `Bits = 640 × 512 × 24. Bytes = 640 × 512 × {{blank:a}}. KiB = 640 × 512 × 3 ÷ 1024 = {{blank:b}}.`,
    blanks: [
      { id: "a", accepted: ["3"], wrong: "24" },
      { id: "b", accepted: [String(toKiB(imgBits(640, 512, 24)))], wrong: String(toKiB(imgBits(640, 512, 24)) * 8) },
    ],
    hints: ["24 ÷ 8 = 3 bytes per pixel.", "512 ÷ 1024 = one half."],
    explanation: `$640 \\times 512 \\times 3 \\div 1024 = 640 \\times 3 \\div 2 = ${toKiB(imgBits(640, 512, 24))}$ KiB.`,
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each change with its effect on file size (everything else unchanged).",
    pairs: [
      ["Colour depth 8 bits → 24 bits", "× 3"],
      ["Sample rate halved", "÷ 2"],
      ["Width and height both doubled", "× 4"],
      ["Recording length doubled", "× 2"],
    ],
    extraRight: ["No change"],
    explanation: "Size is proportional to each factor in the formula: 24/8 = 3; half the rate halves it; 2 × 2 = 4; twice the length doubles it.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3, calculator: false,
    stem: "Show how to calculate the size in **MiB** of an image that is 2048 × 2048 pixels with a colour depth of 8 bits.",
    points: [
      "Uses width × height × colour depth: 2048 × 2048 × 8 bits.",
      "Divides by 8 to get bytes: 2048 × 2048 bytes.",
      "Divides by 1024 twice: 2 × 2 = 4 MiB.",
    ],
    modelAnswer: "2048 × 2048 × 8 bits; ÷ 8 = 2048 × 2048 bytes; ÷ 1024 = 4096 KiB; ÷ 1024 = 4 MiB.",
    hints: ["2048 = 2 × 1024."],
    explanation: `Answer ${toMiB(imgBits(2048, 2048, 8))} MiB.`,
  });
  {
    const [w, h, cd] = [1280, 720, 24];
    const kib = exact(toKiB(imgBits(w, h, cd)), "s1");
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, marks: 8, calculator: false, secs: 720,
      stem: `Nyasha takes product photos for an online shop in Harare. Each photo is ${w} × ${h} pixels with a colour depth of ${cd} bits.`,
      parts: [
        P.num({ type: "CALCULATION", label: "(a)", marks: 3, unit: "KiB", stem: "Calculate the file size of one photo in KiB. Show your working.", value: kib, wrong: [kib * 8], explanation: `$${w} \\times ${h} \\times ${cd} \\div 8 = ${w} \\times ${h} \\times 3$ bytes; $\\div 1024$: since $1280 \\div 1024 = 1.25$, this is $1.25 \\times ${h} \\times 3 = ${kib}$ KiB.` }),
        P.num({ type: "CALCULATION", label: "(b)", marks: 2, unit: "MiB", stem: "She uploads 256 photos. Calculate the total size in MiB.", value: (kib * 256) / K, wrong: [kib * 256], explanation: `$${kib} \\times 256 = ${kib * 256}$ KiB; $\\div 1024 = ${(kib * 256) / K}$ MiB (or $${kib} \\div 4$).` }),
        P.num({ type: "CALCULATION", label: "(c)", marks: 1, unit: "KiB", stem: "She reduces the colour depth to 8 bits. Give the new size of one photo in KiB.", value: kib / 3, wrong: [kib], explanation: `8 bits is a third of 24 bits: $${kib} \\div 3 = ${kib / 3}$ KiB.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Give one disadvantage of reducing the colour depth for her product photos.", points: ["Fewer colours can be shown (256 instead of over 16 million).", "So the photos look less realistic / colours of products shown inaccurately / banding in shading."], modelAnswer: "With 8 bits each pixel can only be one of 256 colours, so the products' colours and shading would look less realistic to customers." }),
      ],
      hints: ["24 bits = 3 bytes per pixel.", "1024 KiB = 1 MiB."],
      explanation: `(a) ${kib} KiB. (b) ${(kib * 256) / K} MiB. (c) ${kib / 3} KiB.`,
    });
  }
  {
    const [r, res, s] = [32000, 16, 40];
    const kib = exact(toKiB(sndBits(r, res, s)), "s2");
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, marks: 6, calculator: false, secs: 540,
      stem: `A radio station in Bulawayo records a ${s}-second advert at ${r} Hz with a sample resolution of ${res} bits.`,
      parts: [
        P.num({ type: "CALCULATION", label: "(a)", marks: 3, unit: "KiB", stem: "Calculate the file size in KiB.", value: kib, wrong: [kib * 8], explanation: `Bits $= ${r} \\times ${res} \\times ${s}$; bytes $= ${r} \\times 2 \\times ${s} = ${r} \\times 80$; KiB $= ${r} \\times 80 \\div 1024 = ${kib}$.` }),
        P.num({ type: "CALCULATION", label: "(b)", marks: 1, unit: "KiB", stem: "The station re-records the advert at half the sample rate. Give the new file size in KiB.", value: kib / 2, wrong: [kib * 2], explanation: `Half the samples: ${kib / 2} KiB.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain one advantage and one disadvantage of the lower sample rate.", points: ["Advantage: smaller file, so less storage / quicker to send.", "Disadvantage: fewer samples per second, so the sound is less accurate / lower quality."], modelAnswer: "The file is half the size, so it takes less storage and is quicker to send to other stations. But fewer samples are taken each second, so the advert sounds less like the original." }),
      ],
      hints: ["16 bits = 2 bytes per sample.", "Sound size is proportional to the sample rate."],
      explanation: `(a) ${kib} KiB. (b) ${kib / 2} KiB.`,
    });
  }

  b.card("FORMULA", "Image file size (bits)", "width × height × colour depth.");
  b.card("FORMULA", "Sound file size (bits)", "sample rate (Hz) × sample resolution (bits) × length (s).");
  b.card("CONCEPT", "From bits to KiB / MiB", "÷ 8 → bytes; ÷ 1024 → KiB; ÷ 1024 → MiB.");
  b.card("CONCEPT", "No-calculator tip", "Cancel the 8 and any 1024 (inside 2048, 4096, …) before multiplying.");
  b.card("CONCEPT", "Finding recording time", "Time (s) = available bits ÷ (sample rate × sample resolution).");
  b.card("FACT", "Colour depth from colours", "Depth = $n$ where $2^n$ = number of colours (256 colours → 8 bits).");
  b.card("CONCEPT", "Doubling width and height", "4 times as many pixels → 4 times the file size.");
  b.card("FACT", "Bytes per pixel at 24-bit colour", "24 ÷ 8 = 3 bytes per pixel.");
  b.card("CONCEPT", "Units in sound questions", "Sample rate is per **second**: convert minutes to seconds first.");
});
