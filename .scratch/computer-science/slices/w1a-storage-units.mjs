// W1a: units of data storage (bit to exbibyte, 1024 between units; ZIMSEC KB/MB/GB/TB names).
import { concept, P, ZIM, CAM } from "../lib.mjs";

const K = 1024;

concept("comp.data.storage-units", { file: "data/storage-units", keyPrefix: "data.storage-units" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How many bits are there in a **nibble**?",
    options: [
      ["4", "Correct: a nibble is half a byte."],
      ["8", "8 bits make a byte."],
      ["2", "Two bits have no special name in the syllabus."],
      ["16", "16 bits are two bytes."],
    ],
    answer: "A",
    explanation: "1 nibble = 4 bits; 1 byte = 8 bits = 2 nibbles.",
  });
  b.mcq({
    d: 1, skill: "RECALL", applies: CAM,
    stem: "How many bytes are in **1 KiB**?",
    options: [
      ["1024", "Correct: 1 KiB = $2^{10}$ bytes."],
      ["1000", "1000 is used by some manufacturers, but a kibibyte is 1024 bytes."],
      ["8", "There are 8 bits in a byte."],
      ["1048576", "That is the number of bytes in 1 MiB."],
    ],
    answer: "A",
    explanation: "Kibi means $2^{10} = 1024$. 1 KiB = 1024 bytes.",
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: CAM,
    stem: "Which list shows the units in order from **smallest** to **largest**?",
    options: [
      ["MiB, GiB, TiB, PiB", "Correct: mebi, gibi, tebi, pebi."],
      ["MiB, TiB, GiB, PiB", "Tebibyte is larger than gibibyte."],
      ["GiB, MiB, TiB, PiB", "Mebibyte is smaller than gibibyte."],
      ["MiB, GiB, PiB, TiB", "Pebibyte is larger than tebibyte."],
    ],
    answer: "A",
    explanation: "Order: KiB, MiB, GiB, TiB, PiB, EiB, each 1024 times the one before.",
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "Which list shows the units in order from **smallest** to **largest**?",
    options: [
      ["byte, KB, MB, GB, TB", "Correct: kilo, mega, giga, tera."],
      ["byte, MB, KB, GB, TB", "A kilobyte is smaller than a megabyte."],
      ["byte, KB, GB, MB, TB", "A megabyte is smaller than a gigabyte."],
      ["KB, byte, MB, GB, TB", "A byte is smaller than a kilobyte."],
    ],
    answer: "A",
    explanation: "byte < kilobyte < megabyte < gigabyte < terabyte, with 1024 between each.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is **1024**, rather than 1000, used between storage units such as KiB and MiB?",
    options: [
      ["Computers work in binary and 1024 is $2^{10}$", "Correct: 1024 is the power of 2 closest to 1000."],
      ["1024 bytes is the size of one page of text", "No such rule exists."],
      ["It was chosen to make storage devices look bigger", "Using 1024 actually makes a device's capacity look smaller."],
      ["Each byte has 1024 bits", "A byte has 8 bits."],
    ],
    answer: "A",
    explanation: "Memory sizes come in powers of 2. $2^{10} = 1024$ is close to a thousand, so it became the step between units.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", applies: CAM, calculator: false,
    stem: "Which of these is the **largest** amount of storage?",
    options: [
      ["3 GiB", "Correct: 3 GiB = 3072 MiB."],
      ["3000 MiB", "3000 MiB is less than 3072 MiB."],
      ["2 900 000 KiB", "This is about 2832 MiB."],
      ["0.002 TiB", "This is about 2.05 GiB, about 2097 MiB."],
    ],
    answer: "A",
    hints: ["Convert every option to MiB.", "1 GiB = 1024 MiB."],
    explanation: "In MiB: 3 GiB = 3072; 3000; 2 900 000 KiB ÷ 1024 ≈ 2832; 0.002 TiB × 1024 × 1024 ≈ 2097. So 3 GiB is largest.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false, unit: "bytes",
    stem: "How many bytes are there in **56 bits**?",
    value: 56 / 8, wrong: [56 * 8, 14],
    explanation: "$56 \\div 8 = 7$ bytes.",
    workedSolution: "1. 8 bits = 1 byte.\n2. $56 \\div 8 = 7$ bytes.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false, unit: "MiB", applies: CAM,
    stem: "Convert **5 GiB** to MiB.",
    value: 5 * K, wrong: [5000, 5],
    explanation: `$5 \\times 1024 = ${5 * K}$ MiB.`,
    workedSolution: `1. GiB → MiB is one step down: multiply by 1024.\n2. $5 \\times 1024 = ${5 * K}$ MiB.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: false, unit: "MiB", applies: CAM,
    stem: "Convert **20 480 KiB** to MiB.",
    value: 20480 / K, wrong: [20480 * K, 20.48],
    hints: ["KiB → MiB is one step up.", "Going to a larger unit, divide by 1024."],
    explanation: `$20\\,480 \\div 1024 = ${20480 / K}$ MiB.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: false, unit: "KiB", applies: CAM,
    stem: "A photo is **7 MiB**. Give its size in **KiB**.",
    value: 7 * K, wrong: [7000, 7 * K * K],
    hints: ["MiB → KiB is one step down: multiply by 1024."],
    explanation: `$7 \\times 1024 = ${7 * K}$ KiB.`,
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: false, unit: "bytes", applies: CAM,
    stem: "How many bytes are in **2 MiB**?",
    value: 2 * K * K, wrong: [2 * K, 2000000],
    hints: ["MiB → KiB → bytes: two steps down.", "Multiply by 1024 twice."],
    explanation: `$2 \\times 1024 \\times 1024 = ${2 * K * K}$ bytes.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false, unit: "MB", applies: ZIM,
    stem: "Using 1 GB = 1024 MB, convert **8 GB** to MB.",
    value: 8 * K, wrong: [8000, 8],
    hints: ["GB → MB is one step down."],
    explanation: `$8 \\times 1024 = ${8 * K}$ MB.`,
    workedSolution: `1. 1 GB = 1024 MB.\n2. $8 \\times 1024 = ${8 * K}$ MB.`,
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: false, applies: ZIM,
    stem: "A flash drive holds **2 GB**. Each song is **4 MB**. Using 1 GB = 1024 MB, how many songs can the flash drive hold?",
    value: (2 * K) / 4, wrong: [500, 8],
    hints: ["Put both sizes in MB first.", "Then divide the capacity by the size of one song."],
    explanation: `2 GB = $2 \\times 1024 = ${2 * K}$ MB; $${2 * K} \\div 4 = ${(2 * K) / 4}$ songs.`,
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "There are 8 bits in one byte.",
    answer: true,
    explanation: "True. 1 byte = 8 bits = 2 nibbles.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", applies: CAM,
    stem: "To convert a size from MiB to GiB, you multiply by 1024.",
    answer: false,
    explanation: "False. GiB is the larger unit, so you **divide** by 1024.",
  });
  b.match({
    d: 2, skill: "RECALL", applies: CAM,
    stem: "Match each unit with its size.",
    pairs: [["1 byte", "8 bits"], ["1 KiB", "1024 bytes"], ["1 MiB", "1024 KiB"], ["1 TiB", "1024 GiB"]],
    extraRight: ["1000 bytes"],
    explanation: "Each unit from KiB upwards is 1024 times the one before; 1 byte is 8 bits.",
  });
  b.fib({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "Complete the units of storage used in the ZIMSEC syllabus, from smallest to largest.",
    template: "bit, {{blank:a}}, byte, kilobyte, {{blank:b}}, gigabyte, {{blank:c}}",
    blanks: [
      { id: "a", accepted: ["nibble"], wrong: "word" },
      { id: "b", accepted: ["megabyte", "MB"], wrong: "terabyte" },
      { id: "c", accepted: ["terabyte", "TB"], wrong: "petabyte" },
    ],
    explanation: "bit → nibble (4 bits) → byte (8 bits) → kilobyte → megabyte → gigabyte → terabyte.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2, applies: CAM,
    stem: "Explain how to convert a file size given in **bytes** into **MiB**.",
    points: [
      "Divide the number of bytes by 1024 to get KiB.",
      "Divide the result by 1024 again to get MiB (i.e. divide by 1024 × 1024 = 1 048 576).",
    ],
    modelAnswer: "Divide the number of bytes by 1024 to get KiB, then divide by 1024 again to get MiB. This is the same as dividing by 1 048 576.",
    hints: ["Bytes → KiB → MiB: how many steps?"],
    explanation: "Two steps up, so divide by 1024 twice.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 6, calculator: false, applies: CAM, secs: 540,
    stem: "A school in Gweru backs up its files to an external drive with a capacity of **2 TiB**.",
    parts: [
      P.num({ type: "CALCULATION", label: "(a)", marks: 1, unit: "GiB", stem: "Convert 2 TiB to GiB.", value: 2 * K, wrong: [2000], explanation: `$2 \\times 1024 = ${2 * K}$ GiB.` }),
      P.num({ type: "CALCULATION", label: "(b)", marks: 2, stem: `Each class's files take up 16 GiB. How many classes' files can the drive hold?`, value: (2 * K) / 16, wrong: [125], explanation: `$${2 * K} \\div 16 = ${(2 * K) / 16}$ classes.` }),
      P.mcq({ label: "(c)", stem: "Which unit is 1024 times larger than a tebibyte?", options: [["Pebibyte (PiB)", "Correct: TiB → PiB → EiB."], ["Gibibyte (GiB)", "A gibibyte is 1024 times smaller than a tebibyte."], ["Exbibyte (EiB)", "An exbibyte is 1024 × 1024 times larger."], ["Mebibyte (MiB)", "A mebibyte is much smaller."]], answer: "A", explanation: "TiB × 1024 = PiB." }),
      P.manual({ label: "(d)", marks: 2, stem: "The drive's box says \"2.2 TB\" but the school's computer shows about 2 TiB. Explain the difference.", points: ["The manufacturer uses 1000 between units (decimal TB) while the computer uses 1024 (TiB).", "So the same number of bytes gives a smaller number in TiB; no space is missing."], modelAnswer: "The manufacturer counts 1 TB as 1000⁴ bytes, but the computer counts 1 TiB as 1024⁴ bytes. The drive holds the same number of bytes, but because a TiB is larger, the computer shows a smaller number." }),
    ],
    hints: ["TiB → GiB is one step down.", "Then divide the capacity by the size of one class's files."],
    explanation: `(a) ${2 * K} GiB. (b) ${(2 * K) / 16} classes. (c) PiB.`,
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 5, calculator: false, applies: ZIM, secs: 450,
    stem: "Tendai's phone has **32 GB** of storage. Use 1 GB = 1024 MB and 1 MB = 1024 KB.",
    parts: [
      P.num({ type: "CALCULATION", label: "(a)", marks: 1, unit: "MB", stem: "Convert 32 GB to MB.", value: 32 * K, wrong: [32000], explanation: `$32 \\times 1024 = ${32 * K}$ MB.` }),
      P.num({ type: "CALCULATION", label: "(b)", marks: 2, stem: "Each video he records is 512 MB. How many videos can the phone store if the whole 32 GB is free?", value: (32 * K) / 512, wrong: [62], explanation: `$${32 * K} \\div 512 = ${(32 * K) / 512}$ videos.` }),
      P.num({ type: "CALCULATION", label: "(c)", marks: 2, unit: "KB", stem: "A document is 3 MB. Give its size in KB.", value: 3 * K, wrong: [3000], explanation: `$3 \\times 1024 = ${3 * K}$ KB.` }),
    ],
    hints: ["Moving to a smaller unit: multiply by 1024.", "Put sizes in the same unit before dividing."],
    explanation: `(a) ${32 * K} MB. (b) ${(32 * K) / 512} videos. (c) ${3 * K} KB.`,
  });

  b.card("FACT", "Bits, nibbles and bytes", "1 nibble = 4 bits; 1 byte = 8 bits.");
  b.card("FACT", "Cambridge units (1024 between each)", "byte → KiB → MiB → GiB → TiB → PiB → EiB.");
  b.card("FACT", "ZIMSEC unit names", "bit, nibble, byte, kilobyte (KB), megabyte (MB), gigabyte (GB), terabyte (TB); use 1024 between units.");
  b.card("CONCEPT", "Why 1024?", "Computers count in binary; $2^{10} = 1024$ is the power of 2 nearest to 1000.");
  b.card("CONCEPT", "Converting to a smaller unit", "Multiply by 1024 for each step down (e.g. GiB → MiB: × 1024).");
  b.card("CONCEPT", "Converting to a larger unit", "Divide by 1024 for each step up (e.g. bytes → MiB: ÷ 1024 ÷ 1024).");
  b.card("FACT", "Bytes in 1 MiB", "1024 × 1024 = 1 048 576 bytes.");
  b.card("CONCEPT", "\"How many files fit?\"", "Convert capacity and file size to the **same unit**, then divide.");
  b.card("FACT", "Memory aid for unit order", "K, M, G, T, P, E: \"Kind Men Give Their People Everything\".");
});
