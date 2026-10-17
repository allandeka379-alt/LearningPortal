---
{
  "key": "data.compression",
  "title": "Data compression: lossy and lossless",
  "summary": "Why files are compressed (less storage, less bandwidth, faster transmission); how lossy compression permanently removes data by reducing resolution, colour depth, sample rate or sample resolution; how lossless compression, including run-length encoding (RLE), lets the original be rebuilt exactly; and choosing a method for a given file.",
  "concepts": ["comp.data.compression"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

Farai wants to send a short video of his school's sports day to his grandmother in Masvingo over mobile data. The original file is huge: it would take a long time to send and use up most of his data bundle. His phone offers to "compress" it first. A few seconds later the file is a fraction of the size, and his grandmother can watch it almost immediately.

**Compression** reduces the size of a file. It is used every time you stream music, watch online video, send photos in a chat app or download software. Cambridge 0478 asks you to explain why compression is needed, how **lossy** and **lossless** compression work (including **run-length encoding**), and which type suits a given file.

## Key definitions

:::definition{term="Compression"}
Reducing the size of a file so that it takes up less storage space and less bandwidth when it is sent.
:::

:::definition{term="Lossy compression"}
Compression that permanently removes some data from the file. The original file cannot be rebuilt exactly, but the loss is chosen so that people notice it as little as possible.
:::

:::definition{term="Lossless compression"}
Compression that reduces file size without losing any data. When the file is decompressed, the original is rebuilt exactly, bit for bit.
:::

:::definition{term="Run-length encoding (RLE)"}
A lossless method that replaces a run of identical, consecutive data values with one copy of the value and a count of how many times it repeats.
:::

## Why compress files?

- **Less storage space** is needed, so more files fit on a device or server.
- **Less bandwidth** is used when files are sent, which matters on mobile networks and data bundles.
- Files **transfer faster**: uploads, downloads and email attachments take less time.
- **Streaming** of music and video becomes possible, with less buffering.
- Some email systems and websites have **file size limits** that a compressed file can meet.

## Lossy compression

Lossy compression throws away data that is judged least important. Once removed, it is gone for good. Typical methods:

- **Images:** reduce the **resolution** (fewer pixels) or the **colour depth** (fewer bits per pixel, so fewer colours). Similar colours can be merged, because the eye is less sensitive to small colour changes.
- **Sound:** reduce the **sample rate** or the **sample resolution**, or remove sounds that people cannot hear well, such as very high or very low frequencies, or quiet sounds hidden by louder ones at the same moment (perceptual coding).
- **Video:** combine the image methods with removing detail that changes little from one frame to the next.

:::worked-solution{title="Reducing colour depth from 24 bits to 8 bits"}
1. Image file size is proportional to the colour depth (width × height × colour depth).
2. The new depth is $8 \div 24 = \frac{1}{3}$ of the old depth.
3. So the file becomes one third of its original size.
4. The cost: each pixel can now be one of $2^8 = 256$ colours instead of $2^{24}$ (over 16 million), so smooth shading may look patchy. The lost colour data cannot be restored.
:::

Lossy compression usually gives **much smaller** files than lossless. It is ideal when a small loss of quality is acceptable: photos on websites, music and video streaming, voice calls.

## Lossless compression

Lossless compression finds **patterns and repetition** in the data and stores them more efficiently, so nothing is lost. It is essential when every bit matters:

- **text documents** and spreadsheets, where a changed character would change the meaning or a value,
- **program files** (executables), where a single wrong bit could stop the program working,
- **medical images** and legal documents, where detail must not be lost.

### Run-length encoding (RLE)

RLE looks for **runs**: the same value repeated one after another. Each run is stored as a pair: (count, value).

:::worked-solution{title="Encode a row of pixel colours with RLE"}
1. A row of 21 pixels has the colours W W W W W W B B B W W W W R R R R R R R R (W = white, B = blue, R = red).
2. Find the runs: 6 W, then 3 B, then 4 W, then 8 R.
3. The encoded row is 6W 3B 4W 8R.
4. If each colour or count is stored in one byte, the original needs 21 bytes and the encoded row needs $4 \times 2 = 8$ bytes.
5. To decompress, write out each value the number of times shown: the original row is rebuilt exactly, so RLE is lossless.
:::

RLE works well when data has **long runs**, such as images with large areas of one colour (logos, cartoons, scanned documents with white space). It works badly when values change often.

:::worked-solution{title="When RLE makes a file bigger"}
1. A row of 12 black-and-white pixels alternates: 0 1 0 1 0 1 0 1 0 1 0 1.
2. Every run has length 1, so RLE gives 12 pairs: (1, 0) (1, 1) (1, 0) … (1, 1).
3. That is 24 values to store instead of 12: the "compressed" data is twice as big.
4. RLE only helps when there are runs of repeated values.
:::

## Choosing a method

| File | Best choice | Reason |
|:-:|:-:|:-:|
| Photo for a website | Lossy | Much smaller; a small loss of detail is not noticed |
| Music for streaming | Lossy | Small files stream without buffering; sounds people cannot hear are removed |
| Text document or spreadsheet | Lossless | Every character and number must be exactly the same |
| Program (executable) file | Lossless | A single changed bit could stop it working |
| Simple logo with large blocks of colour | Lossless (RLE) | Long runs compress well and the logo stays sharp |

:::example{title="An advert for a Gweru bakery"}
Thandeka designs an advert with a large photo of fresh bread and a short block of text with the bakery's prices and phone number. For the web version she uses **lossy** compression on the bread photo, so the page loads quickly on phones. The text and prices must stay exact, so the document itself is stored with **lossless** compression. Choosing per item, rather than for the whole job, gets the best of both.
:::

:::keyfact{title="Cambridge only"}
Compression is a Cambridge 0478 objective (1.3.3 and 1.3.4), including run-length encoding. ZIMSEC O-Level does not list it. Cambridge questions often give a short sequence of data to encode with RLE, or ask you to justify lossy or lossless for a scenario.
:::

## Common mistakes

:::mistake{title="Saying lossy compression removes 'unnecessary' data with no effect"}
Lossy compression removes real data, and quality is reduced, even if only slightly. The data cannot be recovered.
:::

:::mistake{title="Saying lossless compression makes files the same size"}
Lossless files are smaller than the original; they just are not as small as lossy files usually are. The point is that decompression rebuilds the original exactly.
:::

:::mistake{title="Using RLE on data with no repetition"}
RLE can make a file larger if there are few runs. Check that the data has long runs before choosing RLE.
:::

:::mistake{title="Choosing lossy for text or programs"}
Text, numbers and program code must be exact. Only lossless compression is suitable for them.
:::

## Exam tips

:::exam-tip{title="Explain 'how', not just 'what'"}
For lossy compression, name a method (reduce colour depth, reduce resolution, reduce sample rate, remove sounds outside human hearing). For lossless, describe RLE: runs of repeated values stored as a count and a value.
:::

:::exam-tip{title="Justify the choice"}
When choosing a method, link it to the file: "lossless, because the spreadsheet's values must be identical after decompression" scores better than "lossless, because it is better".
:::

:::exam-tip{title="RLE answers"}
Write RLE output as clear pairs, for example (6, W) (3, B), or 6W 3B. Count carefully: one miscounted run loses the mark.
:::

## Summary

:::summary
- Compression reduces file size: less storage, less bandwidth, faster transfer and streaming.
- Lossy compression permanently removes data (reducing resolution, colour depth, sample rate or resolution, or sounds people cannot hear); files are much smaller but cannot be restored exactly.
- Lossless compression removes no data; the original is rebuilt exactly.
- RLE is lossless: runs of identical values are stored as (count, value); it only helps when there are long runs.
- Use lossy for photos, music and video; lossless for text, spreadsheets, programs and simple graphics.
:::
