---
{
  "key": "media.graphics",
  "title": "Bitmap images and vector graphics",
  "summary": "Describe how bitmap and vector images are encoded, calculate bitmap file sizes, explain the effect of resolution and colour depth, and choose between bitmap and vector.",
  "concepts": [
    "acs.media.graphics"
  ],
  "estimatedMinutes": 45,
  "level": "core"
}
---
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

| Colour depth (bits) | Number of colours | Typical use |
|:-:|:-:|:-:|
| 1 | 2 | Black and white scanned text |
| 4 | 16 | Simple diagrams |
| 8 | 256 | Icons, simple pictures |
| 24 | 16777216 | Photographs (called true colour) |

The number of colours that a depth can give is 2^depth, and the depth needed for a number of colours is the smallest n for which 2^n is at least that number.

## Estimating the file size

File size (bits) = width × height × colour depth. Divide by 8 for bytes, by 1024 for KiB and by 1024 again for MiB. A header, if its size is given, is added.

:::worked-solution{title="File size of a 1024 × 768 image with a colour depth of 24 bits"}
1. Number of pixels = 1024 × 768 = 786432.
2. Size in bits = 786432 × 24 = 18874368 bits.
3. In bytes: 18874368 ÷ 8 = 2359296 bytes.
4. In KiB: 2359296 ÷ 1024 = 2304 KiB.
5. In MiB: 2304 ÷ 1024 = **2.25 MiB**.
:::

:::worked-solution{title="A 640 × 480 image has 256 colours. Find the file size in KiB"}
1. Colour depth: 2^n ≥ 256, so n = 8 bits (2^8 = 256).
2. Bits = 640 × 480 × 8 = 2457600.
3. Bytes = 2457600 ÷ 8 = 307200.
4. KiB = 307200 ÷ 1024 = **300 KiB**.
5. If the file header is 54 bytes, the file is 307254 bytes (300.05 KiB).
:::

## Effect of changing resolution and colour depth

- Doubling the width and the height multiplies the number of pixels by four, so the file is four times as large. The image has more detail.
- Halving both dimensions gives a quarter of the size: the 640 × 480 image above would take 75 KiB at 320 × 240. The image looks coarser.
- Adding 1 bit of colour depth doubles the number of colours but increases the file size by only 1/depth of the original.
- Reducing the colour depth makes the file smaller but photographs show banding because fewer shades are available.

A bitmap enlarged beyond its resolution shows square pixels. This is why bitmaps lose quality when scaled up.

:::example{title="Image resolution against screen resolution"}
A projector in a school hall in Masvingo has a screen resolution of 1280 × 720, which is 921600 pixels. A photograph of 4000 × 3000 pixels has 12000000 pixels, about 13 times as many. The projector cannot show every pixel of the photograph, so the image is scaled down for display. The extra detail is still stored in the file, and appears when the photograph is zoomed in or printed in a large size. This is why a high-resolution image gives a large file even when it is shown on a small screen.
:::

The size of a file depends on the **image resolution** and the colour depth, not on the screen it is shown on.

## Vector graphics

A vector file is a **drawing list**: each drawing object has a type and properties. The picture is drawn from the list whenever it is displayed, at whatever size is needed.

| Object | Properties stored |
|:-:|:-:|
| Rectangle | Top-left x and y, width, height, line colour, line thickness, fill colour |
| Ellipse | Centre x and y, horizontal and vertical radius, line colour, fill colour |
| Line | Start x and y, end x and y, colour, thickness |
| Text | Position, text, font, size, colour |

Because only the list is stored, a simple vector graphic is usually much smaller than the equivalent bitmap. Enlarging the picture just recalculates the shapes, so the edges stay sharp. A photograph, with millions of tiny changes of colour, cannot sensibly be described as shapes, so it is stored as a bitmap.

## Choosing between bitmap and vector

| Task | Better choice | Reason |
|:-:|:-:|:-:|
| A photograph of a classroom | Bitmap | Continuous changes of colour; no simple shapes |
| A school logo printed on a van and on a letterhead | Vector | Scales to any size without losing quality; small file |
| A diagram of a circuit | Vector | Made of lines and shapes; objects can be edited separately |
| A scanned certificate | Bitmap | The scanner records pixels |

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
