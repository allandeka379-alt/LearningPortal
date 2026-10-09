// W1a: data compression, lossy and lossless, run-length encoding (Cambridge only).
import { concept, P, rle } from "../lib.mjs";

const enc = (s) => rle(s).map(([n, c]) => `${n}${c}`).join(" ");
const pairs = (s) => rle(s).length;

concept("comp.data.compression", { file: "data/compression", keyPrefix: "data.compression" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by **lossless** compression?",
    options: [
      ["Compression after which the original file can be rebuilt exactly", "Correct: no data is lost."],
      ["Compression that removes data people are unlikely to notice", "That describes lossy compression."],
      ["Compression that keeps the file the same size", "Lossless compression does make files smaller."],
      ["Compression that only works on sound files", "Lossless methods work on any kind of file."],
    ],
    answer: "A",
    explanation: "Lossless compression stores patterns more efficiently; decompression gives back every original bit.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a reason for compressing a file?",
    options: [
      ["It can be sent in less time over a network", "Correct: a smaller file uses less bandwidth and transfers faster."],
      ["It improves the quality of the image", "Compression never improves quality; lossy compression reduces it."],
      ["It makes the file impossible for hackers to read", "That is encryption, not compression."],
      ["It adds a check digit to detect errors", "Error detection is a different topic."],
    ],
    answer: "A",
    explanation: "Reasons: less storage, less bandwidth, faster upload/download, smoother streaming, meeting file size limits.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which method is an example of **lossy** compression for an image?",
    options: [
      ["Reducing the colour depth", "Correct: colour data is permanently removed."],
      ["Run-length encoding", "RLE is lossless."],
      ["Storing repeated patterns once", "Storing patterns more efficiently is a lossless idea."],
      ["Encrypting the pixel values", "Encryption hides data; it is not compression."],
    ],
    answer: "A",
    explanation: "Lossy image methods: reduce colour depth or resolution, merge similar colours. RLE and pattern storage are lossless.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which file should be compressed with **lossless** compression?",
    options: [
      ["A spreadsheet of a school's exam marks", "Correct: every number must be exactly right after decompression."],
      ["A song streamed to listeners' phones", "Music is usually compressed with lossy methods."],
      ["A photo on a news website", "Web photos are usually compressed with lossy methods."],
      ["A video of a football match", "Video is usually compressed with lossy methods."],
    ],
    answer: "A",
    explanation: "Text, numbers and programs must be exact, so lossless compression is used.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why is lossy compression unsuitable for a program (executable) file?",
    options: [
      ["Changing even one bit could stop the program working", "Correct: program instructions must be exactly the same after decompression."],
      ["Program files are too small to compress", "Program files can be large; size is not the issue."],
      ["Lossy compression only works on text", "Lossy compression is used mainly on images, sound and video."],
      ["Programs are stored in hexadecimal, not binary", "Programs are stored in binary like all data."],
    ],
    answer: "A",
    hints: ["What would happen if some instruction bits were removed?"],
    explanation: "Lossy compression permanently removes data. Missing or changed instructions would make the program fail or behave wrongly.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "For which data would run-length encoding give the **greatest** reduction in size?",
    options: [
      ["A row of 40 white pixels followed by 20 black pixels", "Correct: only two long runs, so just two pairs are stored."],
      ["A sentence of text with few repeated letters next to each other", "Text rarely has long runs; RLE would barely help or make it bigger."],
      ["A photo with constantly changing colours", "Changing colours give runs of length 1, which RLE stores badly."],
      ["A row of pixels that alternate black, white, black, white", "Every run is length 1, so RLE doubles the size."],
    ],
    answer: "A",
    hints: ["RLE replaces each run with a count and a value."],
    explanation: "RLE works best with long runs of identical values; 60 pixels become 2 pairs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which method can be used for **lossy** compression of a sound file?",
    options: [
      ["Removing frequencies that people cannot hear", "Correct: perceptual coding removes sounds people are unlikely to notice."],
      ["Run-length encoding the samples", "RLE is lossless."],
      ["Increasing the sample rate", "Increasing the sample rate makes the file larger."],
      ["Adding a parity bit to each sample before saving", "Parity bits are for error detection and add data."],
    ],
    answer: "A",
    explanation: "Lossy sound methods: reduce sample rate or resolution, remove sounds outside human hearing or masked by louder sounds.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "After lossy compression, the original file can be restored exactly by decompressing it.",
    answer: false,
    explanation: "False. Lossy compression permanently removes data; only lossless compression rebuilds the original exactly.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Run-length encoding can make a file larger if the data contains very few repeated values next to each other.",
    answer: true,
    explanation: "True. Each run of length 1 becomes two values (count and value), so the data can double in size.",
  });
  {
    const s = "GGGGGYYYYYYYGGBBBBBB";
    b.short({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `Use run-length encoding to compress this row of pixel colours. Write each run as the count followed by the colour, separated by spaces.\n\n**${s.split("").join(" ")}**`,
      accepted: [enc(s), enc(s).replace(/ /g, "")],
      normalise: ["trim", "lowercase", "collapse_whitespace"],
      wrong: ["5G 6Y 2G 6B", "5G 7Y 8B"],
      explanation: `Runs: ${rle(s).map(([n, c]) => `${n} × ${c}`).join(", ")} → ${enc(s)}.`,
    });
  }
  {
    const s = "AAAAAAAAABBBBCCCCCCCCCCCCDDD";
    b.num({
      d: 3, skill: "APPLICATION", calculator: false, unit: "bytes",
      stem: `The data **${s}** (one byte per character) is compressed with RLE, storing each run as a 1-byte count and a 1-byte character. How many bytes does the compressed data take?`,
      value: pairs(s) * 2, wrong: [pairs(s), s.length],
      hints: ["Count the runs.", "Each run takes 2 bytes."],
      explanation: `Runs: ${enc(s)} → ${pairs(s)} runs × 2 bytes = ${pairs(s) * 2} bytes (from ${s.length} bytes).`,
      workedSolution: `1. Runs: ${enc(s)}.\n2. ${pairs(s)} runs × 2 bytes = ${pairs(s) * 2} bytes.\n3. Original: ${s.length} bytes.`,
    });
  }
  {
    const code = [[3, "R"], [5, "W"], [2, "R"], [4, "B"]];
    const out = code.map(([n, c]) => c.repeat(n)).join("");
    b.fib({
      d: 3, skill: "APPLICATION",
      stem: "A row of an image was compressed with RLE as **3R 5W 2R 4B**. Decompress it.",
      template: "The original row has {{blank:a}} pixels and is: {{blank:b}}",
      blanks: [
        { id: "a", accepted: [String(out.length)], wrong: "8" },
        { id: "b", accepted: [out], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: "RRRWWWWWRRBBB" },
      ],
      hints: ["Write each colour the number of times shown.", "Add the counts to check the length."],
      explanation: `RRR + WWWWW + RR + BBBB = ${out} (${out.length} pixels). The original is rebuilt exactly, so RLE is lossless.`,
    });
  }
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each file with the most suitable type of compression.",
    pairs: ["Music for a streaming service", "A program installer", "A spreadsheet of sales figures", "Photos on a news website", "A video clip shared in a chat app"],
    right: ["Lossy", "Lossless"],
    rightIndex: [0, 1, 1, 0, 0],
    explanation: "Media that tolerates a small quality loss (music, photos, video) → lossy. Programs and data that must be exact (installer, spreadsheet) → lossless.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how run-length encoding compresses data.",
    points: [
      "It finds runs of identical consecutive values (e.g. pixels of the same colour).",
      "Each run is replaced by one copy of the value and a count of how many times it repeats.",
      "This stores fewer values when runs are long; no data is lost, so the original can be rebuilt (lossless).",
    ],
    modelAnswer: "RLE looks for runs of the same value repeated one after another, such as 12 white pixels in a row. Each run is stored as a pair: the number of repeats and the value, e.g. 12W. When runs are long this needs far fewer values, and because the counts are exact the original can be rebuilt with no loss.",
    hints: ["What is a 'run'?", "What is stored instead of the run?"],
    explanation: "RLE = runs → (count, value) pairs; lossless.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A tour company in Victoria Falls puts high-quality photos of its trips on its website. Many customers view the site on phones using mobile data. Discuss whether the company should use lossy or lossless compression for the photos.",
    points: [
      "Lossy compression gives much smaller files, so pages load faster and use less mobile data.",
      "Lossy permanently removes some detail / colours, so quality is slightly reduced.",
      "Lossless keeps full quality, but files are larger, so pages load slowly on phones.",
      "Justified conclusion, e.g. lossy, because the small loss of quality is hardly noticed on a phone screen and speed matters more to customers.",
    ],
    modelAnswer: "Lossy compression would make the photos much smaller, so the website loads quickly on phones and uses less of customers' data, although some detail is lost permanently. Lossless compression would keep every detail, but the files would stay large and slow to load. Lossy is the better choice, because on a small phone screen the slight loss of quality is hardly noticed, while slow pages would put customers off.",
    hints: ["Give a point for and against each method.", "Finish with a recommendation linked to the customers."],
    explanation: "Weigh file size and speed against quality, then conclude for this context.",
  });
  {
    const row = "BBBBBBBBWWWWWWWWWWWWBBBB";
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, marks: 8, secs: 720, calculator: false,
      stem: `A school logo in Mutare uses only black (B) and white (W). One row of the logo is:\n\n**${row}**\n\nEach colour code and each count is stored in 1 byte.`,
      parts: [
        P.short({ label: "(a)", marks: 2, stem: "Write the row using run-length encoding, as count then colour (for example 3W).", accepted: [enc(row), enc(row).replace(/ /g, "")], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["8B 12W 3B"], explanation: `${enc(row)}.` }),
        P.num({ type: "CALCULATION", label: "(b)", marks: 2, unit: "bytes", stem: "Calculate the number of bytes saved by the compression for this row.", value: row.length - pairs(row) * 2, wrong: [row.length - pairs(row)], explanation: `Original ${row.length} bytes; RLE ${pairs(row)} × 2 = ${pairs(row) * 2} bytes; saved ${row.length - pairs(row) * 2} bytes.` }),
        P.mcq({ label: "(c)", stem: "Which statement about the compressed logo is true?", options: [["It can be rebuilt exactly", "Correct: RLE is lossless."], ["Some pixels are lost permanently", "That would be lossy compression."], ["Its colours are reduced to grey", "RLE keeps every colour value."], ["It has a lower resolution", "The number of pixels is unchanged."]], answer: "A", explanation: "RLE stores counts exactly, so decompression gives back the original row." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why RLE suits this logo but would not suit a photograph of a sunset.", points: ["The logo has long runs of the same colour, so few (count, value) pairs are needed.", "A photograph has many gradual colour changes, so runs are very short (often length 1).", "Short runs mean RLE stores two values for almost every pixel, so the file would hardly shrink or could get larger."], modelAnswer: "The logo has large areas of one colour, giving long runs that RLE stores as just a few pairs. A sunset photo has gradually changing colours, so almost every pixel differs from the next; RLE would store a count and a value for nearly every pixel, so the file could even grow." }),
      ],
      hints: ["Count each run carefully.", "Each run costs 2 bytes."],
      explanation: `RLE: ${enc(row)}; ${row.length} → ${pairs(row) * 2} bytes.`,
    });
  }
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, marks: 6, secs: 540, calculator: false,
    stem: "Chipo records a 3-minute song for an online competition. The website accepts files of at most 4 MiB, but her recording is 30 MiB.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which type of compression is most likely to reduce the file below 4 MiB?", options: [["Lossy", "Correct: lossy compression gives much greater reductions for sound."], ["Lossless", "Lossless sound compression usually reduces size much less than needed here."], ["Run-length encoding", "Sound samples rarely repeat in long runs."], ["Encryption", "Encryption does not reduce file size."]], answer: "A", explanation: "Reducing 30 MiB to under 4 MiB needs lossy compression." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe two ways lossy compression could reduce the size of her recording.", points: ["Reduce the sample rate (fewer samples per second).", "Reduce the sample resolution (fewer bits per sample).", "Or: remove frequencies outside human hearing / sounds masked by louder sounds (perceptual coding). One mark for describing that data is permanently removed."], modelAnswer: "She could reduce the sample rate, so fewer samples are stored each second, or reduce the sample resolution so each sample uses fewer bits. Compression software can also remove sounds people cannot hear. These changes permanently remove data, making the file much smaller." }),
      P.manual({ label: "(c)", marks: 2, stem: "State one drawback of the compression for the competition, and why it may not matter.", points: ["Drawback: some quality is lost permanently / the song is slightly less faithful.", "May not matter: most listeners will not notice the difference, especially through phone speakers or headphones."], modelAnswer: "The song loses some quality that cannot be restored, but the removed data is chosen so most listeners will not notice it." }),
    ],
    hints: ["How much smaller does the file need to be?", "Think about the sound settings you met in the sound lesson."],
    explanation: "Lossy compression (lower sample rate or resolution, perceptual coding) is needed; quality loss is small and permanent.",
  });

  b.card("DEFINITION", "Compression", "Reducing the size of a file to save storage and bandwidth.");
  b.card("DEFINITION", "Lossy compression", "Permanently removes some data; much smaller files; original cannot be rebuilt exactly.");
  b.card("DEFINITION", "Lossless compression", "Reduces file size without losing data; the original is rebuilt exactly.");
  b.card("DEFINITION", "Run-length encoding (RLE)", "Lossless: each run of identical consecutive values is stored as a count and one value (e.g. 6W).");
  b.card("FACT", "Reasons to compress", "Less storage, less bandwidth, faster transfer, smoother streaming, meet file size limits.");
  b.card("FACT", "Lossy methods", "Reduce resolution or colour depth (images); reduce sample rate or resolution, remove inaudible sounds (sound).");
  b.card("CONCEPT", "When to use lossless", "Text, spreadsheets, program files, medical or legal images: data must be exact.");
  b.card("CONCEPT", "When RLE fails", "Data with few repeats: runs of length 1 double the data (two values per item).");
  b.card("CONCEPT", "When to use lossy", "Photos, music and video where a small quality loss is acceptable for much smaller files.");
});
