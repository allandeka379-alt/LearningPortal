// W1a: data compression. Cambridge AS Level only.
import { concept, P, rle, rleText, mdTable, chk } from "../lib.mjs";

const enc = (s) => rleText(rle(s.split("")));
const dec = (pairs) => pairs.map(([n, c]) => c.repeat(n)).join("");
const forms = (s) => {
  const p = rle(s.split(""));
  return [p.map(([n, c]) => `${n}${c}`).join(""), p.map(([n, c]) => `${n}${c}`).join(" "), p.map(([n, c]) => `${n}${c}`).join(",")];
};

concept("acs.media.compression", { file: "media/compression", keyPrefix: "media.compression" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a reason for compressing a file before sending it by email?",
    options: [
      ["It reduces the time taken to send it", "Correct: a smaller file needs fewer bits to be transmitted."],
      ["It increases the quality of the file", "Compression does not improve quality; lossy compression reduces it."],
      ["It makes the file easier to read without a program", "A compressed file must usually be decompressed first."],
      ["It protects the file from being copied", "Compression is not a security method."],
    ],
    answer: "A",
    explanation: "A smaller file uses less storage space and less bandwidth, and takes less time to transmit.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "After lossy compression, the original file can be restored exactly.",
    answer: false,
    feedbackTrue: "Lossy compression permanently removes data, so the original cannot be restored exactly.",
    feedbackFalse: "Correct: that is the property of lossless compression. Lossy compression discards data permanently.",
    explanation: "Lossless compression can be reversed exactly; lossy compression cannot.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A software company in Harare sends a program installer to customers as a compressed file. Which type of compression must be used?",
    options: [
      ["Lossless, because any missing data would damage the program", "Correct: the decompressed file must be identical to the original."],
      ["Lossy, because it gives the smallest file", "Removing data would corrupt the program."],
      ["Either, because programs are only text", "Programs are sensitive to every bit; a changed instruction can crash them."],
      ["Neither, because programs cannot be compressed", "Program files can be compressed with lossless methods."],
    ],
    answer: "A",
    explanation: "Programs, documents and data files need an exact copy, so lossless compression is used.",
  });
  {
    const s = "KKKKKPPPKKKKKKKKR";
    b.short({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `Use run-length encoding to compress the string **${s}**. Write each run as the count followed by the character.`,
      accepted: forms(s),
      normalise: ["trim", "lowercase", "remove_whitespace"],
      wrong: [s],
      explanation: `The runs are ${rle(s.split("")).map(([n, c]) => c.repeat(n)).join(", ")}. Each is written as count then character: ${enc(s)}.`,
    });
  }
  {
    const s = "TTTTTTTTHHZZZZZZ";
    b.short({
      d: 3, skill: "APPLICATION",
      stem: `Compress the string **${s}** using run-length encoding, writing each run as the count followed by the character.`,
      accepted: forms(s),
      normalise: ["trim", "lowercase", "remove_whitespace"],
      hints: ["Count each run of identical characters separately.", "Write the count before the character."],
      wrong: ["8T2H6Z".replace("8T", "7T")],
      explanation: `The runs are ${rle(s.split("")).map(([n, c]) => `${n} ${c}`).join(", ")}, giving ${enc(s)}.`,
    });
  }
  {
    const pairs = [[5, "X"], [3, "Y"], [2, "X"]];
    const code = pairs.map(([n, c]) => `${n}${c}`).join("");
    const out = dec(pairs);
    b.short({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `The text **${code}** has been compressed using run-length encoding (count then character). Write the original text.`,
      accepted: [out],
      normalise: ["trim", "lowercase", "remove_whitespace"],
      wrong: [code],
      explanation: `${pairs.map(([n, c]) => `${n}${c} means ${c.repeat(n)}`).join(", ")}. The original text is ${out}.`,
    });
  }
  {
    const row = "00000000111100000000111111110000";
    const pairs = rle(row.split(""));
    b.num({
      d: 3, skill: "APPLICATION", unit: "bytes", calculator: false,
      stem: `A black-and-white bitmap row is stored as these ${row.length} bits: **${row}**. After run-length encoding, each run is stored as a pair: one byte for the count and one byte for the bit value. How many bytes does the encoded row use?`,
      value: pairs.length * 2,
      hints: ["Count the number of runs of identical bits."],
      workedSolution: `1. The runs are ${pairs.map(([n, c]) => `${n}×${c}`).join(", ")}: ${pairs.length} runs.\n2. Each run uses 2 bytes: ${pairs.length} × 2 = ${pairs.length * 2} bytes.`,
      explanation: `${pairs.length} runs × 2 bytes = ${pairs.length * 2} bytes (the original row needs ${row.length / 8} bytes when packed as bits, so RLE with whole-byte pairs is not always a saving).`,
    });
  }
  {
    const [o, c] = [12, 3];
    b.calc({
      d: 3, skill: "APPLICATION", unit: "×", calculator: false,
      stem: `A video clip of ${o} MiB is compressed to ${c} MiB. Calculate the compression ratio (original size ÷ compressed size).`,
      value: o / c,
      hints: ["Divide the original size by the compressed size."],
      explanation: `${o} ÷ ${c} = ${o / c}, a ratio of ${o / c} : 1.`,
    });
  }
  {
    const opts = ["AAAAAAAABBBBBBBB", "ABCDEFGHABCDEFGH", "WWWWWWWWWWWWWWWW", "AAAABBBBCCCCDDDD"];
    const ratios = opts.map((s) => s.length / (rle(s.split("")).length * 2));
    const worst = ratios.indexOf(Math.min(...ratios));
    chk(worst, 1);
    b.mcq({
      d: 3, skill: "ANALYSIS",
      stem: "A byte is used for each count and for each character in run-length encoding. Which of these 16-character strings would be **larger** after encoding than before?",
      options: [[opts[1], "Correct: there are no runs, so 16 pairs (32 bytes) replace 16 bytes."], [opts[0], "Two runs: 2 pairs (4 bytes), a big saving."], [opts[2], "One run of 16: a single pair (2 bytes)."], [opts[3], "Four runs of 4: 4 pairs (8 bytes), smaller than 16."]],
      answer: "A",
      hints: ["Count the runs in each string; each run needs two bytes."],
      explanation: "RLE makes data larger when there are no repeated neighbours, because every single character becomes a count and a character.",
    });
  }
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each method or type to its description.",
    pairs: [
      ["Lossless compression", "The original can be restored exactly"],
      ["Lossy compression", "Some data is permanently removed to give a smaller file"],
      ["Run-length encoding", "Runs of identical items are replaced by a count and the item"],
      ["Compression ratio", "Original size divided by compressed size"],
    ],
    explanation: "These are the basic terms for data compression.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is lossy compression often used for music streamed over a mobile network?",
    options: [
      ["Smaller files, and the lost sound is hard to hear", "Correct: the sounds removed are those the ear is unlikely to notice."],
      ["It keeps every sample of the original recording intact", "That is lossless compression."],
      ["It makes the recording louder than the original", "Compression does not change the loudness."],
      ["It increases the sampling rate of the recording", "Compression does not raise the sampling rate."],
    ],
    answer: "A",
    explanation: "Smaller files stream faster and use less data. Lossy methods remove sounds the listener is unlikely to notice.",
  });
  {
    const row = "1111000000111111";
    const pairs = rle(row.split(""));
    b.fib({
      d: 3, skill: "APPLICATION",
      stem: `The bitmap row **${row}** is compressed using run-length encoding, written as (count, bit) pairs. Complete the pairs.`,
      template: `First run: {{blank:n1}} of {{blank:b1}}\n\nSecond run: {{blank:n2}} of {{blank:b2}}\n\nThird run: {{blank:n3}} of {{blank:b3}}`,
      blanks: pairs.flatMap(([n, c], i) => [{ id: `n${i + 1}`, input: "number", accepted: [String(n)] }, { id: `b${i + 1}`, choices: ["0", "1"], accepted: [c] }]),
      hints: ["Write down each group of identical digits and count it."],
      explanation: `The row has ${pairs.length} runs: ${pairs.map(([n, c]) => `${n} of ${c}`).join(", ")}.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Run-length encoding is a lossless method of compression.",
    answer: true,
    feedbackTrue: "Correct: the runs can be expanded again to give exactly the original data.",
    feedbackFalse: "Run-length encoding stores every run, so the original can be rebuilt exactly. It is lossless.",
    explanation: "Decoding repeats each item by its count and restores the original.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the difference between lossless and lossy compression.",
    points: [
      "Lossless compression allows the original data to be restored exactly.",
      "Lossy compression permanently removes some data, so the original cannot be restored.",
      "Lossy compression usually gives a smaller file than lossless compression.",
    ],
    modelAnswer: "With lossless compression, no data is lost, so the original file can be rebuilt exactly. With lossy compression, data that is judged to be unimportant is removed for ever, so the original cannot be recovered, but the file is generally smaller.",
    hints: ["Say what happens to the original data in each type."],
    explanation: "The key difference is whether the original can be recovered.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "A news website in Bulawayo wants to display a large number of photographs on a page. Justify the use of lossy compression for the photographs.",
    points: [
      "Lossy compression reduces the file size a great deal, so pages load faster.",
      "Small losses of detail in photographs are usually not noticed by viewers.",
      "Smaller files save the site's storage and the visitors' data.",
    ],
    modelAnswer: "Lossy compression makes the photograph files much smaller, so the page loads quickly and uses less of the visitors' mobile data. The detail it removes is generally too small for viewers to notice, so the pictures still look good.",
    hints: ["Link the answer to the size of the files and to what viewers notice."],
    explanation: "A smaller file matters more than perfect accuracy for photographs on web pages.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Give two reasons why files are compressed.",
    points: ["To reduce the storage space needed.", "To reduce the time and bandwidth needed to transmit the file."],
    modelAnswer: "Compressed files take up less storage space, and they take less time and bandwidth to send over a network.",
    explanation: "The two main reasons are storage and transmission.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Explain how run-length encoding reduces the size of a bitmap image, and state one kind of image for which it would not reduce the size.",
    points: [
      "Each run of pixels of the same colour is stored once, with a count of how many there are.",
      "An image with large areas of one colour has long runs, so there are far fewer items to store.",
      "A photograph (many different neighbouring colours) has very short runs, so there may be no saving.",
    ],
    modelAnswer: "RLE stores each run of identical pixels as a count and one colour value instead of storing every pixel, so images with large blocks of one colour become much smaller. A photograph, where neighbouring pixels differ, has almost no runs and may even become larger.",
    hints: ["Think about what is stored for a long run of the same colour."],
    explanation: "RLE saves space only when there are long runs.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Describe how lossy compression of music (such as MP3) reduces the file size.",
    points: ["It removes sounds that the human ear is unlikely to notice (very high or quiet sounds hidden by louder ones).", "The remaining sound data needs fewer bits, so the file is smaller."],
    modelAnswer: "It removes parts of the sound that the human ear cannot easily hear, such as very high frequencies and quiet sounds masked by louder ones, so less data has to be stored.",
    explanation: "Lossy audio compression is based on the limits of human hearing.",
  });
  {
    const s = "NNNNNNNNNNNNBBBNNNNNNNNNNNN";
    const pairs = rle(s.split(""));
    b.struct({
      d: 3, skill: "APPLICATION", examStyle: true, secs: 480, calculator: false,
      stem: `A map file stores one row of a bitmap as the text **${s}** (N = no road, B = border). The row is compressed using run-length encoding. Each count and each character takes one byte.`,
      parts: [
        P.short({ label: "(a)", marks: 2, stem: "Write the compressed form of the row (count then character).", accepted: forms(s), normalise: ["trim", "lowercase", "remove_whitespace"], explanation: `The runs are ${pairs.map(([n, c]) => `${n} ${c}`).join(", ")}: ${enc(s)}.` }),
        P.num({ label: "(b)", marks: 1, type: "CALCULATION", unit: "bytes", stem: "How many bytes does the compressed row use?", value: pairs.length * 2, explanation: `${pairs.length} pairs × 2 bytes = ${pairs.length * 2} bytes.` }),
        P.num({ label: "(c)", marks: 1, type: "CALCULATION", unit: "bytes", stem: "How many bytes does the original row use?", value: s.length, explanation: `The row has ${s.length} characters at one byte each.` }),
        P.manual({ label: "(d)", marks: 2, stem: "State whether this compression is lossless or lossy and justify your answer.", points: ["Lossless.", "The original row can be rebuilt exactly by repeating each character by its count."], modelAnswer: "It is lossless, because decoding the counts gives back exactly the same row of characters." }),
      ],
      hints: ["Count each run separately, then count the pairs.", "Decide whether any data is discarded."],
      explanation: `${enc(s)} uses ${pairs.length * 2} bytes instead of ${s.length}. RLE is lossless.`,
    });
  }
  {
    const o = 36, c = 9;
    b.struct({
      d: 4, skill: "EVALUATION", examStyle: true, secs: 600, calculator: false,
      stem: `A health clinic in Mutare keeps scanned X-ray images and also records voice notes for patients. A technician is choosing a compression method for each. An X-ray image file of ${o} MiB can be compressed to ${c} MiB.`,
      parts: [
        P.num({ label: "(a)", marks: 2, type: "CALCULATION", unit: "×", stem: "Calculate the compression ratio for the X-ray image (original ÷ compressed).", value: o / c, explanation: `${o} ÷ ${c} = ${o / c}.` }),
        P.num({ label: "(b)", marks: 2, type: "CALCULATION", unit: "%", stem: "Calculate the percentage reduction in the size of the file.", value: ((o - c) / o) * 100, explanation: `(${o} − ${c}) ÷ ${o} × 100 = ${((o - c) / o) * 100}%.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Recommend a type of compression for the X-ray images and justify it.", points: ["Lossless compression.", "Nothing may be lost because a diagnosis depends on the detail."], modelAnswer: "Lossless compression, because the doctors need every detail of the original image and no data may be permanently removed." }),
        P.manual({ label: "(d)", marks: 2, stem: "The voice notes are only for the clinic's own reference. Suggest a type of compression for them and give a reason.", points: ["Lossy compression.", "Speech remains understandable and the files are much smaller."], modelAnswer: "Lossy compression, because the voice notes are still clear after small details are removed and the files take much less storage." }),
      ],
      hints: ["The ratio is original ÷ compressed.", "Ask whether any detail may be lost in each case."],
      explanation: `The ratio is ${o / c} : 1 and the reduction is ${((o - c) / o) * 100}%. X-rays need lossless compression; voice notes can use lossy compression.`,
    });
  }

  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A web designer saves a large photograph so that it loads quickly on a slow connection. Which type of compression is most appropriate?",
    options: [
      ["Lossy", "Correct: a much smaller file is possible, and small losses of detail are hardly noticed."],
      ["Lossless", "A lossless file is larger than a lossy one and loads more slowly."],
      ["Run-length encoding", "A photograph has few long runs of the same colour."],
      ["No compression", "An uncompressed photograph would be slow to load."],
    ],
    answer: "A",
    explanation: "For web photographs a small file is more important than perfect detail, so lossy compression is used.",
  });
  {
    const s = "PQPQPQPQ";
    b.mcq({
      d: 3, skill: "ANALYSIS",
      stem: "A student says that run-length encoding always makes data smaller. Which string shows that she is wrong?",
      options: [
        [s, "Correct: it has no runs, so it becomes 1P1Q1P1Q1P1Q1P1Q, which is twice as long."],
        ["WWWWWWWW", "This has one long run and becomes very short (8W)."],
        ["AAAABBBB", "This has two runs and becomes 4A4B."],
        ["XXXXYYYYZZZZ", "This has three runs and is shorter when encoded."],
      ],
      answer: "A",
      hints: ["Which string has no repeated neighbouring characters?"],
      explanation: "RLE stores a count and a character for every run. With no runs longer than one, every character gains a count and the data doubles in size.",
    });
  }

  b.card("DEFINITION", "Data compression", "Reducing the number of bits needed to store a file, saving storage space, bandwidth and time.");
  b.card("DEFINITION", "Lossless compression", "Compression after which the original file can be restored exactly.");
  b.card("DEFINITION", "Lossy compression", "Compression that permanently removes some data (the least noticeable), giving a smaller file that cannot be restored exactly.");
  b.card("CONCEPT", "When to use lossless or lossy", "Lossless where every bit matters (programs, text, medical images). Lossy where a smaller file matters more than exact detail (photographs, music, video for the web).");
  b.card("DEFINITION", "Run-length encoding (RLE)", "A lossless method that replaces each run of identical items with a count and the item, e.g. AAAB becomes 3A1B.");
  b.card("CONCEPT", "When does RLE not save space?", "When the data has few or no repeated neighbours (such as a photograph or ordinary text), because every item becomes a count-and-item pair.");
  b.card("FORMULA", "Compression ratio", "Original size ÷ compressed size. Percentage saving = (original − compressed) ÷ original × 100.");
  b.card("CONCEPT", "Outline of lossy sound compression (MP3-style)", "Removes sounds the human ear is unlikely to notice, such as very high frequencies or quiet sounds masked by louder ones.");
  b.card("CONCEPT", "Outline of text compression", "Dictionary methods replace repeated words with short references; Huffman coding gives common characters shorter codes. Both are lossless.");
});
