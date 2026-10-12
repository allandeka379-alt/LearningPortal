import { rle, rleText, mdTable, chk, same } from "../lib.mjs";
import { writeLesson } from "./w1a-lib.mjs";

// text RLE
const text1 = "WWWWWWBBBWWWWWWWWBBBBWW";
const pairs1 = rle(text1.split(""));
const enc1 = rleText(pairs1);
const decodeBack = pairs1.map(([n, c]) => c.repeat(n)).join("");
same(decodeBack, text1, "roundtrip");
// bitmap row RLE (colour letters)
const row = "GGGGGGGGRRRRGGGGGGGG";
const pairsRow = rle(row.split(""));
const encRow = rleText(pairsRow);
// where RLE fails
const text2 = "ABCDEF";
const enc2 = rleText(rle(text2.split("")));
// sizes: one byte for count and one byte for the value
const origBytes1 = text1.length;
const encBytes1 = pairs1.length * 2;
const ratio1 = origBytes1 / encBytes1;
const origBytesRow = row.length;
const encBytesRow = pairsRow.length * 2;
// compression ratio example
const orig = 4.5, comp = 1.5;
chk(orig / comp, 3);
const pct = ((orig - comp) / orig) * 100;
chk(pct, 66.66666666666667, 1e-6);

const body = `
## Introduction

A photograph taken on a phone can be several megabytes, and a school in Harare that emails a class set of photographs over a slow mobile connection would wait a long time and use up its data bundle. **Compression** reduces the number of bits needed to store or send a file. It saves storage space, reduces the time and bandwidth used to send files, and makes streaming possible on slow connections. This lesson covers lossless and lossy compression, run-length encoding (RLE), and outlines of how text, images and sound are compressed.

You should be able to calculate file sizes for images and sounds and know how data are stored in bytes.

## Key definitions

:::definition{term="Data compression"}
Reducing the size of a file by encoding its data using fewer bits.
:::

:::definition{term="Lossless compression"}
Compression after which the original file can be restored exactly, bit for bit.
:::

:::definition{term="Lossy compression"}
Compression that permanently removes some data that is least noticeable, so the original cannot be restored exactly. The file is smaller than with lossless compression.
:::

:::definition{term="Run-length encoding (RLE)"}
A lossless method that replaces a run of identical items by a count of how many there are and the item itself.
:::

## Lossless and lossy compression

${mdTable(["Feature", "Lossless", "Lossy"], [["Original restored exactly?", "Yes", "No; some data is lost for ever"], ["Size reduction", "Moderate", "Large"], ["Typical uses", "Text, program files, spreadsheets, medical images, bank records", "Photographs, music, video on the web"], ["Why", "Every bit matters: a changed character or number makes the file wrong", "People do not notice small changes in an image or sound"]])}

Choose lossless where an error would matter, such as a program or a bank statement; choose lossy where a smaller file is more valuable than the last bit of detail, such as a photograph on a web page. After lossy compression, the compressed file is not the original; applying it again and again reduces quality further.

## Run-length encoding

RLE is effective for data with long runs of the same value: a bitmap with large areas of one colour, or text with repeated characters. Each run is stored as a pair, the **number of items** and the **item**.

:::worked-solution{title="Encode the string ${text1} using RLE"}
1. Split into runs: ${pairs1.map(([n, c]) => c.repeat(n)).join(" | ")}.
2. Write each run as a count followed by the character: ${pairs1.map(([n, c]) => `${n}${c}`).join(" ")}.
3. The encoded text is **${enc1}**.
4. The original has ${origBytes1} characters. If every count and every character takes one byte, the encoded data has ${pairs1.length} pairs × 2 = ${encBytes1} bytes.
5. Saving: ${origBytes1} − ${encBytes1} = ${origBytes1 - encBytes1} bytes (a ratio of ${ratio1.toFixed(2)} : 1).
:::

:::worked-solution{title="Decode ${enc1}"}
1. Split into pairs: ${pairs1.map(([n, c]) => `${n}${c}`).join(", ")}.
2. Repeat each character by its count: ${pairs1.map(([n, c]) => c.repeat(n)).join(" ")}.
3. Joined, the original text is ${decodeBack}. Nothing is lost, so RLE is lossless.
:::

For a bitmap, the pixels are read row by row and each run of the same colour is stored once with its length.

:::example{title="RLE on a row of an image"}
A row of ${row.length} pixels is coloured ${row.split("").map((c) => c).join("")} (G = green, R = red). The runs are ${pairsRow.map(([n, c]) => `${n} ${c}`).join(", ")}, so the row is stored as ${encRow}. That is ${pairsRow.length} pairs, or ${encBytesRow} bytes if each count and colour takes one byte, instead of ${origBytesRow} bytes.
:::

RLE does not always save space. If the data has no runs, every item becomes a pair and the file gets larger: ${text2} would be encoded as ${enc2}, which is twice as long. RLE therefore suits images with large flat areas (diagrams and logos) but not photographs or ordinary text.

## Other methods (outline)

- **Text:** dictionary-based methods store repeated words or phrases once and replace later copies with a short reference. Huffman coding gives frequently used characters short bit patterns and rare characters long patterns. Both are lossless.
- **Bitmap images:** lossless methods include RLE. Lossy methods (JPEG-style) reduce the colour detail that the eye cannot easily see, for example by storing groups of pixels with similar colours as one value.
- **Vector graphics:** the drawing list is small already; the file can be compressed using lossless text methods.
- **Sound:** lossy methods (MP3-style) remove sounds that the human ear is unlikely to notice, such as very high frequencies, or quiet sounds hidden by louder ones, and may use fewer bits for them.

## Compression ratio

Compression ratio = original size ÷ compressed size. The percentage saving is (original − compressed) ÷ original × 100.

:::worked-solution{title="A ${orig} MiB photograph is compressed to ${comp} MiB"}
1. Ratio = ${orig} ÷ ${comp} = **${orig / comp} : 1**.
2. Saving = ${orig} − ${comp} = ${orig - comp} MiB.
3. Percentage saving = ${orig - comp} ÷ ${orig} × 100 = **${pct.toFixed(1)}%**.
:::

:::keyfact{title="Cambridge and ZIMSEC"}
Lossless and lossy compression, RLE and the outline methods are Cambridge AS Level (Paper 1). The ZIMSEC A Level syllabus does not name them, so these items are not tagged to ZIMSEC. Huffman and dictionary methods are outline only: you describe the idea, not the algorithm.
:::

## Common mistakes

:::mistake{title="Saying lossy compression removes random bits"}
Lossy compression removes the data that is least noticeable to a person, chosen by the method. It does not delete bits at random.
:::

:::mistake{title="Using lossy compression on a program or document"}
A program with a missing instruction or a document with a missing character is damaged. Use lossless compression for these.
:::

:::mistake{title="Forgetting to count the count"}
In RLE each run needs both the number and the item. Count the size of both when you compare the encoded and original sizes.
:::

:::mistake{title="Assuming RLE always saves space"}
Data without long runs becomes larger after RLE. State when RLE is suitable (large blocks of one colour).
:::

## Exam tips

:::exam-tip{title="Which papers test this"}
Cambridge Paper 1 asks you to describe lossless and lossy compression, to choose between them for a situation, to encode and decode RLE, and to explain why compression is needed. For **choose**, say which type and give the reason that fits the data (exact copy needed, or small file more important than exact detail). For **explain why compression is needed** give two reasons: less storage and faster transmission.
:::

:::exam-tip{title="Show every pair"}
List each run as a pair when encoding. An examiner can credit the pairs you got right.
:::

:::exam-tip{title="Test your decode"}
Decode your RLE and check that it matches the original string.
:::

## Summary

:::summary
- Compression reduces file size, saving storage, bandwidth and time.
- Lossless compression restores the original exactly; lossy compression permanently removes the least noticeable data.
- RLE stores each run as a count and an item; it suits long runs and can make other data bigger.
- Text can use dictionary or Huffman ideas; images and sound can use lossy methods that drop detail people do not notice.
- Compression ratio = original size ÷ compressed size.
:::
`;
writeLesson({ key: "media.compression", title: "Data compression: lossless, lossy and run-length encoding", summary: "Explain why files are compressed, compare lossless and lossy compression, encode and decode with run-length encoding, and describe how text, images and sound can be compressed.", concept: "acs.media.compression", minutes: 40 }, body);
