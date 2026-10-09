---
{
  "key": "data.sound-images",
  "title": "Representing sound and images in binary",
  "summary": "How a sound wave is sampled and stored as binary, and how sample rate and sample resolution affect accuracy and file size; how a bitmap image is stored as pixels, and how resolution and colour depth affect quality and file size.",
  "concepts": ["comp.data.sound-images"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Chipo records her choir singing at a church in Gweru on her phone, then takes a photo of the choir. A sound is a smooth, continuously changing wave, and a photo is a scene with endless shades of colour. A computer, however, can only store binary numbers. To store sound and pictures, the computer must turn them into a long list of numbers, and the choices made when doing that decide both the **quality** and the **file size**.

Cambridge 0478 asks you to explain how sound and images are represented and the effect of sample rate, sample resolution, image resolution and colour depth. File size calculations come in the next lesson, but you must understand the ideas here first.

## Key definitions

:::definition{term="Sampling"}
Measuring the amplitude (height) of a sound wave at regular time intervals and storing each measurement as a binary number.
:::

:::definition{term="Sample rate"}
The number of samples taken each second, measured in hertz (Hz). For example 44 100 Hz means 44 100 samples every second.
:::

:::definition{term="Sample resolution"}
The number of bits used to store each sample (also called bit depth). It sets how many different amplitude levels can be recorded.
:::

:::definition{term="Pixel"}
Short for picture element: the smallest single-coloured dot in a bitmap image.
:::

:::definition{term="Image resolution"}
The number of pixels in an image, usually given as width × height, for example 1920 × 1080.
:::

:::definition{term="Colour depth"}
The number of bits used to store the colour of each pixel. It sets how many different colours each pixel can be.
:::

## Representing sound

A microphone turns sound into a smoothly changing electrical signal (an **analogue** signal). A component called an analogue-to-digital converter **samples** the signal: at fixed time intervals it measures the height of the wave and rounds it to the nearest level that the sample resolution allows. Each level is stored as a binary number.

The table shows a short sound wave sampled every millisecond with a sample resolution of **3 bits**, so there are $2^3 = 8$ possible levels (0 to 7).

| Sample | Time (ms) | Level (0-7) | Stored (3 bits) |
|:-:|:-:|:-:|:-:|
| 1 | 0 | 3 | 011 |
| 2 | 1 | 6 | 110 |
| 3 | 2 | 7 | 111 |
| 4 | 3 | 6 | 110 |
| 5 | 4 | 3 | 011 |
| 6 | 5 | 1 | 001 |
| 7 | 6 | 0 | 000 |
| 8 | 7 | 1 | 001 |
| 9 | 8 | 3 | 011 |

The sound file is just these binary values one after another. When it is played back, the computer rebuilds the wave from the stored levels. Anything that happened **between** samples, or between two levels, is lost.

### Effect of the sample rate

- A **higher sample rate** takes more samples per second, so the stored sound follows the original wave more closely: **better accuracy** (more faithful sound).
- But more samples means more numbers to store: a **larger file**.

### Effect of the sample resolution

- A **higher sample resolution** gives more possible levels. With 3 bits there are 8 levels; with 16 bits there are $2^{16} = 65\,536$. Each sample can be stored closer to its true height: **better accuracy**, more detail between quiet and loud.
- But each sample uses more bits: a **larger file**.

:::worked-solution{title="How many levels can a sample have?"}
1. Number of levels $= 2^{\text{sample resolution}}$.
2. With a 4-bit sample resolution: $2^4 = 16$ levels.
3. With an 8-bit sample resolution: $2^8 = 256$ levels.
4. Doubling the bits from 4 to 8 does not double the levels: it multiplies them by 16, which is why each extra bit improves accuracy so much.
:::

## Representing images

A **bitmap** image is a grid of pixels. Each pixel's colour is stored as a binary number, and the numbers are stored row by row. The file also stores extra data such as the width, height and colour depth (this is called **metadata**) so the image can be rebuilt correctly.

With a colour depth of **1 bit**, each pixel is either 0 or 1, so only two colours are possible, for example white (0) and black (1). This 6 × 6 image shows the letter T:

| | 1 | 2 | 3 | 4 | 5 | 6 |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Row 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| Row 2 | 1 | 1 | 1 | 1 | 1 | 1 |
| Row 3 | 0 | 0 | 1 | 1 | 0 | 0 |
| Row 4 | 0 | 0 | 1 | 1 | 0 | 0 |
| Row 5 | 0 | 0 | 1 | 1 | 0 | 0 |
| Row 6 | 0 | 0 | 1 | 1 | 0 | 0 |

### Effect of colour depth

The number of colours is $2^{\text{colour depth}}$:

| Colour depth (bits per pixel) | Number of colours |
|:-:|:-:|
| 1 | 2 |
| 2 | 4 |
| 4 | 16 |
| 8 | 256 |
| 16 | 65,536 |
| 24 | 16,777,216 |

A **greater colour depth** gives more possible colours, so shading looks smoother and more realistic: **better quality**. But each pixel needs more bits: a **larger file**.

### Effect of resolution

A **higher resolution** means more pixels. Each pixel can be smaller, so more detail is shown and the image stays sharp when enlarged: **better quality**. But there are more pixels to store: a **larger file**. If a low-resolution image is stretched, each pixel becomes a visible block, called **pixelation**.

:::worked-solution{title="Choosing a colour depth for 50 colours"}
1. A logo uses 50 different colours, and every pixel must be able to show any of them.
2. 5 bits give $2^5 = 32$ colours, which is not enough.
3. 6 bits give $2^6 = 64$ colours, which is enough.
4. The smallest colour depth is 6 bits per pixel; using 24 bits would waste space.
:::

:::example{title="Trade-offs in a real product"}
A company in Harare makes a voice-recording app for journalists. Recordings must be clear, but phones have limited storage and the files are sent over mobile data. The developers choose a moderate sample rate and resolution: high enough that speech is clear, low enough that files stay small. A music studio would choose higher values, because accuracy matters more to them than file size. The same reasoning applies to images: a photo for a printed poster needs a high resolution, while a small icon on a web page does not.
:::

:::keyfact{title="Cambridge only"}
Sound and image representation is a Cambridge 0478 objective (1.2). The ZIMSEC O-Level syllabus does not require it. For every factor, Cambridge expects you to give **both** effects: on quality (or accuracy) and on file size.
:::

## Common mistakes

:::mistake{title="Mixing up sample rate and sample resolution"}
Sample **rate** is how many samples are taken per second (hertz). Sample **resolution** is how many bits each sample uses. Learn them as a pair: how often, and how precisely.
:::

:::mistake{title="Only giving one effect"}
"A higher sample rate gives better quality" earns at most half the marks. Always add "but the file size increases".
:::

:::mistake{title="Saying resolution is the size of the image in centimetres"}
Image resolution is the number of pixels (width × height). The physical size depends on the screen or printer.
:::

:::mistake{title="Thinking 8 bits give 8 colours"}
The number of colours is $2^8 = 256$, not 8. Each extra bit doubles the number of colours.
:::

## Exam tips

:::exam-tip{title="Use the key words"}
For sound, use "amplitude", "sampled at regular intervals", "sample rate" and "sample resolution". For images, use "pixels", "resolution", "colour depth" and "binary value for each pixel".
:::

:::exam-tip{title="Effect questions"}
Structure each answer as: change → what happens to the data → effect on quality → effect on file size. For example: "Increasing the colour depth gives each pixel more bits, so more colours can be shown and the image is more realistic, but the file size increases."
:::

:::exam-tip{title="Powers of 2"}
Many questions ask how many colours or levels a number of bits allows, or how many bits are needed. Use $2^n$ and pick the smallest $n$ that is big enough.
:::

## Summary

:::summary
- Sound is sampled: its amplitude is measured at regular intervals and each measurement is stored in binary.
- Higher sample rate (samples per second) and higher sample resolution (bits per sample) give a more accurate recording but a larger file.
- A bitmap image is a grid of pixels; each pixel's colour is a binary value, stored with metadata such as width, height and colour depth.
- Higher resolution (more pixels) and greater colour depth (bits per pixel, $2^n$ colours) give better quality but a larger file.
- Always state both effects: on quality and on file size.
:::
