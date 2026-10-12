import { bitmapBits, depthFor, bytesTo, mdTable, chk, same } from "../lib.mjs";
import { writeLesson } from "./w1a-lib.mjs";

const kib = (bytes) => Number(bytesTo(bytes, "KiB").toFixed(2));
const mib = (bytes) => Number(bytesTo(bytes, "MiB").toFixed(2));
// 1: 1024 x 768 at 24 bits
const w1 = 1024, h1 = 768, d1 = 24;
const px1 = w1 * h1;
const bits1 = bitmapBits(w1, h1, d1);
const bytes1 = bits1 / 8;
chk(bytes1, 2359296);
chk(mib(bytes1), 2.25);
// 2: 640 x 480, 256 colours
const w2 = 640, h2 = 480, c2 = 256;
const dep2 = depthFor(c2);
chk(dep2, 8);
const bytes2 = bitmapBits(w2, h2, dep2) / 8;
chk(kib(bytes2), 300);
// 3: halve both dimensions
const bytes3 = bitmapBits(w2 / 2, h2 / 2, dep2) / 8;
chk(bytes3 * 4, bytes2);
// 4: colour depth for 1000 colours and a 4-colour image
const dep3 = depthFor(1000);
chk(dep3, 10);
// with header
const hdr = 54;
const withHdr = bytes2 + hdr;
// depth table
const depthTable = mdTable(["Colour depth (bits)", "Number of colours", "Typical use"], [[1, 2, "Black and white scanned text"], [4, 16, "Simple diagrams"], [8, 256, "Icons, simple pictures"], [24, 2 ** 24, "Photographs (called true colour)"]]);
const vecTable = mdTable(["Object", "Properties stored"], [["Rectangle", "Top-left x and y, width, height, line colour, line thickness, fill colour"], ["Ellipse", "Centre x and y, horizontal and vertical radius, line colour, fill colour"], ["Line", "Start x and y, end x and y, colour, thickness"], ["Text", "Position, text, font, size, colour"]]);

const body = `
## Introduction

Every photograph taken on a phone in Harare, every logo on a shop sign printed in Bulawayo, and every map on a screen must be turned into bits before a computer can store it. There are two basic ways. A **bitmap** image stores a colour for each tiny square (pixel) of the picture. A **vector graphic** stores a list of shapes and their properties. The choice affects the quality, the file size and what happens when the picture is made larger.

You should already be comfortable with powers of 2 and with converting bits to bytes and bytes to KiB and MiB.

## Key definitions

:::definition{term="Pixel"}
The smallest individual element of a bitmap image. Each pixel is stored as a binary number that represents its colour.
:::

:::definition{term="Colour depth (bit depth)"}
The number of bits used to store the colour of each pixel. A depth of n bits allows 2^n different colours.
:::

:::definition{term="Image resolution"}
The number of pixels in the image, usually given as width × height (for example 1024 × 768). A higher resolution gives a finer, more detailed image.
:::

:::definition{term="Screen resolution"}
The number of pixels a display can show horizontally and vertically.
:::

:::definition{term="Vector graphic"}
An image stored as a list of drawing objects (lines, rectangles, ellipses, text) with their properties; the picture is calculated when it is displayed.
:::

## How a bitmap is stored

A bitmap file begins with a **file header** holding information about the image: the file type, the width and height in pixels, and the colour depth. The rest of the file is the pixel data, row by row. Each pixel has a number that gives its colour.

${depthTable}

The number of colours that a depth can give is 2^depth, and the depth needed for a number of colours is the smallest n for which 2^n is at least that number.

## Estimating the file size

File size (bits) = width × height × colour depth. Divide by 8 for bytes, by 1024 for KiB and by 1024 again for MiB. A header, if its size is given, is added.

:::worked-solution{title="File size of a ${w1} × ${h1} image with a colour depth of ${d1} bits"}
1. Number of pixels = ${w1} × ${h1} = ${px1}.
2. Size in bits = ${px1} × ${d1} = ${bits1} bits.
3. In bytes: ${bits1} ÷ 8 = ${bytes1} bytes.
4. In KiB: ${bytes1} ÷ 1024 = ${kib(bytes1)} KiB.
5. In MiB: ${kib(bytes1)} ÷ 1024 = **${mib(bytes1)} MiB**.
:::

:::worked-solution{title="A ${w2} × ${h2} image has ${c2} colours. Find the file size in KiB"}
1. Colour depth: 2^n ≥ ${c2}, so n = ${dep2} bits (2^${dep2} = ${2 ** dep2}).
2. Bits = ${w2} × ${h2} × ${dep2} = ${bitmapBits(w2, h2, dep2)}.
3. Bytes = ${bitmapBits(w2, h2, dep2)} ÷ 8 = ${bytes2}.
4. KiB = ${bytes2} ÷ 1024 = **${kib(bytes2)} KiB**.
5. If the file header is ${hdr} bytes, the file is ${withHdr} bytes (${kib(withHdr)} KiB).
:::

## Effect of changing resolution and colour depth

- Doubling the width and the height multiplies the number of pixels by four, so the file is four times as large. The image has more detail.
- Halving both dimensions gives a quarter of the size: the ${w2} × ${h2} image above would take ${kib(bytes3)} KiB at ${w2 / 2} × ${h2 / 2}. The image looks coarser.
- Adding 1 bit of colour depth doubles the number of colours but increases the file size by only 1/depth of the original.
- Reducing the colour depth makes the file smaller but photographs show banding because fewer shades are available.

A bitmap enlarged beyond its resolution shows square pixels. This is why bitmaps lose quality when scaled up.

:::example{title="Image resolution against screen resolution"}
A projector in a school hall in Masvingo has a screen resolution of 1280 × 720, which is ${1280 * 720} pixels. A photograph of 4000 × 3000 pixels has ${4000 * 3000} pixels, about ${Math.round((4000 * 3000) / (1280 * 720))} times as many. The projector cannot show every pixel of the photograph, so the image is scaled down for display. The extra detail is still stored in the file, and appears when the photograph is zoomed in or printed in a large size. This is why a high-resolution image gives a large file even when it is shown on a small screen.
:::

The size of a file depends on the **image resolution** and the colour depth, not on the screen it is shown on.

## Vector graphics

A vector file is a **drawing list**: each drawing object has a type and properties. The picture is drawn from the list whenever it is displayed, at whatever size is needed.

${vecTable}

Because only the list is stored, a simple vector graphic is usually much smaller than the equivalent bitmap. Enlarging the picture just recalculates the shapes, so the edges stay sharp. A photograph, with millions of tiny changes of colour, cannot sensibly be described as shapes, so it is stored as a bitmap.

## Choosing between bitmap and vector

${mdTable(["Task", "Better choice", "Reason"], [["A photograph of a classroom", "Bitmap", "Continuous changes of colour; no simple shapes"], ["A school logo printed on a van and on a letterhead", "Vector", "Scales to any size without losing quality; small file"], ["A diagram of a circuit", "Vector", "Made of lines and shapes; objects can be edited separately"], ["A scanned certificate", "Bitmap", "The scanner records pixels"]])}

:::keyfact{title="Cambridge and ZIMSEC"}
Bitmap and vector graphics with file-size calculations are Cambridge AS Level (Paper 1). The ZIMSEC syllabus has no equivalent topic in the A Level specification, so these items are not tagged to ZIMSEC. Cambridge questions say whether a header is to be included; if nothing is said, ignore it.
:::

## Common mistakes

:::mistake{title="Using bytes instead of bits for colour depth"}
Colour depth is in bits per pixel. A 24-bit image uses 3 bytes per pixel. Convert to bytes only at the end.
:::

:::mistake{title="Forgetting to divide by 1024 twice for MiB"}
Bits to bytes: ÷ 8. Bytes to KiB: ÷ 1024. KiB to MiB: ÷ 1024. Write each step.
:::

:::mistake{title="Confusing resolution with colour depth"}
Resolution is the number of pixels; colour depth is the number of bits for each pixel. Changing one does not change the other.
:::

:::mistake{title="Saying vector graphics are made of pixels"}
A vector graphic is a list of objects and properties. It becomes pixels only when it is displayed.
:::

## Exam tips

:::exam-tip{title="Which papers test this"}
Cambridge Paper 1 asks you to calculate a bitmap file size, to explain the effect of changing resolution or colour depth on quality and file size, and to justify bitmap or vector for a task. For **calculate** show pixels, bits, bytes and the unit asked for. For **explain** state both effects (quality and size). For **justify** link the format to the picture (photographs: bitmap; logos and diagrams: vector).
:::

:::exam-tip{title="Name the unit asked for"}
Check whether the answer is wanted in bytes, KiB or MiB, and give the unit in your answer.
:::

:::exam-tip{title="Use full descriptions"}
For vector graphics write "drawing objects with properties stored in a drawing list". The word "list" and the word "properties" are expected.
:::

## Summary

:::summary
- A bitmap stores a colour value for each pixel; a header holds the width, height and colour depth.
- File size in bits = width × height × colour depth; divide by 8, then by 1024 for each larger unit.
- A greater resolution or colour depth gives better quality and a larger file.
- A vector graphic stores a drawing list of objects and their properties, scales without loss and is usually small.
- Use bitmaps for photographs and vector graphics for logos and diagrams.
:::
`;
writeLesson({ key: "media.graphics", title: "Bitmap images and vector graphics", summary: "Describe how bitmap and vector images are encoded, calculate bitmap file sizes, explain the effect of resolution and colour depth, and choose between bitmap and vector.", concept: "acs.media.graphics", minutes: 45 }, body);
