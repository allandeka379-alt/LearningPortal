// W1a: bitmap images and vector graphics. Cambridge AS Level only.
import { concept, P, bitmapBits, depthFor, bytesTo, chk } from "../lib.mjs";

const bytesOf = (w, h, d, hdr = 0) => bitmapBits(w, h, d, hdr) / 8;

concept("acs.media.graphics", { file: "media/graphics", keyPrefix: "media.graphics" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a pixel?",
    options: [
      ["The smallest element of a bitmap, with a binary colour", "Correct: a bitmap is a grid of pixels, each with its own colour value."],
      ["A drawing object stored in the list of a vector graphic", "Drawing objects belong to vector graphics, not bitmaps."],
      ["The number of bits used for each colour", "That is the colour depth."],
      ["The total number of dots on a screen", "That is the screen resolution."],
    ],
    answer: "A",
    explanation: "A pixel is the smallest picture element. Each pixel is stored as a binary number that represents its colour.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does the colour depth of a bitmap image measure?",
    options: [
      ["The number of bits used for each pixel colour", "Correct: with n bits each pixel can have one of 2^n colours."],
      ["The number of pixels in the whole image, width by height", "That is the image resolution."],
      ["The number of colours that the screen can show at one time", "This depends on the screen, not the image file."],
      ["The size of the file header", "The header is a separate part of the file."],
    ],
    answer: "A",
    explanation: "Colour depth (bit depth) is the number of bits per pixel. More bits allow more colours.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: "A bitmap image has a colour depth of 6 bits. How many different colours can it contain?",
    value: 2 ** 6,
    workedSolution: "1. Each pixel has 6 bits.\n2. The number of colours is 2^6 = 64.",
    explanation: "With n bits there are 2^n values: 2^6 = 64.",
  });
  {
    const n = 200;
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: false, unit: "bits",
      stem: `What is the smallest colour depth, in bits, that can represent ${n} different colours?`,
      value: depthFor(n),
      workedSolution: `1. 2^7 = 128, which is fewer than ${n}.\n2. 2^8 = 256, which is at least ${n}.\n3. So ${depthFor(n)} bits are needed.`,
      explanation: `2^7 = 128 is too small and 2^8 = 256 is enough, so ${depthFor(n)} bits.`,
    });
  }
  {
    const [w, h, d] = [800, 600, 4];
    const v = bytesOf(w, h, d);
    b.calc({
      d: 3, skill: "APPLICATION", unit: "bytes", calculator: false,
      stem: `A bitmap image is ${w} pixels wide and ${h} pixels high, with a colour depth of ${d} bits. Calculate the file size in bytes, ignoring the file header.`,
      value: v,
      hints: ["Multiply width × height × colour depth to get the size in bits.", "Divide by 8 to change bits to bytes."],
      explanation: `${w} × ${h} = ${w * h} pixels; × ${d} bits = ${w * h * d} bits; ÷ 8 = ${v} bytes.`,
    });
  }
  {
    const [w, h, d] = [1152, 864, 16];
    const v = bytesTo(bytesOf(w, h, d), "KiB");
    b.calc({
      d: 3, skill: "APPLICATION", unit: "KiB", calculator: false,
      stem: `A photograph is ${w} × ${h} pixels with a colour depth of ${d} bits. Calculate the file size in KiB, ignoring the header. (1 KiB = 1024 bytes.)`,
      value: v,
      hints: ["16 bits is 2 bytes per pixel.", "Divide the bytes by 1024 to get KiB."],
      explanation: `${w} × ${h} = ${w * h} pixels × 2 bytes = ${w * h * 2} bytes; ÷ 1024 = ${v} KiB.`,
    });
  }
  {
    const [w, h, d, hdr] = [480, 360, 4, 128];
    const v = bytesOf(w, h, d, hdr);
    b.calc({
      d: 4, skill: "APPLICATION", unit: "bytes", calculator: false,
      stem: `An icon is ${w} × ${h} pixels with ${2 ** d} possible colours. The file also has a header of ${hdr} bytes. Calculate the total file size in bytes.`,
      value: v,
      hints: ["Work out the colour depth from the number of colours.", "Add the header to the pixel data."],
      explanation: `${2 ** d} colours need ${d} bits per pixel. ${w} × ${h} = ${w * h} pixels; × ${d} bits = ${w * h * d} bits = ${w * h * d / 8} bytes. Adding the header: ${w * h * d / 8} + ${hdr} = ${v} bytes.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "The width and the height of a bitmap image are both doubled and the colour depth is kept the same. What happens to the file size?",
    options: [
      ["Four times as large", "Correct: there are twice as many pixels across and twice as many down, so four times as many pixels."],
      ["It becomes exactly twice as large as before", "Doubling both dimensions doubles each, so the total pixels are multiplied by 2 × 2."],
      ["It stays the same", "More pixels need more data."],
      ["It becomes eight times as large as before", "Only the pixel count changes, by a factor of 4."],
    ],
    answer: "A",
    explanation: "Pixels = width × height. Doubling both multiplies the pixels by 2 × 2 = 4, and the file size is proportional to the number of pixels.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A photographer in Kariba reduces the colour depth of a photograph from 24 bits to 8 bits. What are the effects?",
    options: [
      ["Smaller file, but fewer shades so banding may show", "Correct: 8 bits give only 256 colours, so smooth changes of shade look stepped."],
      ["The file is larger, because the number of pixels has been increased", "Fewer bits per pixel make a smaller file."],
      ["The file is the same size but the image has fewer pixels in it", "The number of pixels is unchanged; the bits per pixel change."],
      ["The file is smaller and the picture is unchanged", "Fewer colours must reduce the quality of a photograph."],
    ],
    answer: "A",
    hints: ["Think about the number of colours that 8 bits can give."],
    explanation: "Reducing the depth from 24 to 8 bits cuts the file to a third, but there are only 256 colours, so gradual colour changes show visible steps.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A vector graphic is stored as a grid of pixels, each with its own colour value.",
    answer: false,
    feedbackTrue: "That describes a bitmap. A vector graphic is a list of drawing objects and their properties.",
    feedbackFalse: "Correct: a vector graphic is stored as a drawing list of objects and their properties.",
    explanation: "Pixels are used to display a vector graphic, but the file stores shapes and properties.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term to its meaning.",
    pairs: [
      ["Image resolution", "The number of pixels in the image, width × height"],
      ["Colour depth", "The number of bits used for each pixel"],
      ["File header", "The part of the file that stores information such as width, height and colour depth"],
      ["Drawing list", "The list of objects and properties that makes up a vector graphic"],
    ],
    explanation: "These terms describe how bitmap and vector images are stored.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which image is best stored as a vector graphic?",
    options: [
      ["A logo printed on a small card and a large banner", "Correct: a vector can be scaled to any size without losing quality."],
      ["A photograph of a crowd at a football match in Harare", "Photographs have continuous changes of colour and are stored as bitmaps."],
      ["A scanned page of a handwritten letter from a pupil", "A scanner produces a bitmap of pixels."],
      ["A screenshot of a website, saved as an image file", "A screenshot is a grid of screen pixels, so it is a bitmap."],
    ],
    answer: "A",
    explanation: "Vector graphics are made of shapes, so they scale without loss of quality. Photographs, scans and screenshots are bitmaps.",
  });
  b.num({
    d: 3, skill: "APPLICATION", unit: "×", calculator: false,
    stem: "The colour depth of an image is increased from 2 bits to 8 bits and its resolution is not changed. By what factor does the file size increase (ignoring the header)?",
    value: 4,
    hints: ["The file size is proportional to the colour depth when the pixels do not change."],
    workedSolution: "1. Size is proportional to colour depth when the number of pixels is fixed.\n2. 8 ÷ 2 = 4.",
    explanation: "The number of pixels is unchanged, so the size is multiplied by 8 ÷ 2 = 4.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the description of how a vector graphic is stored.",
    template: "A vector graphic is stored as a {{blank:a}} of drawing objects. Each object has a type, such as a rectangle or an ellipse, and a set of {{blank:b}}, such as its position, size and colour.",
    blanks: [
      { id: "a", choices: ["list", "grid", "table of pixels", "sound wave"], accepted: ["list"] },
      { id: "b", choices: ["properties", "pixels", "headers", "samples"], accepted: ["properties"] },
    ],
    hints: ["The picture is calculated from the objects each time it is displayed."],
    explanation: "A vector graphic is a drawing list: objects with properties. It is turned into pixels only when displayed.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "A school wants a crest for its website and for printing on banners. Justify the choice of a vector graphic rather than a bitmap.",
    points: [
      "A vector graphic can be enlarged to any size without losing quality, as the shapes are recalculated.",
      "The file is usually smaller than a bitmap because only the objects and properties are stored.",
      "A bitmap enlarged for a banner would show square pixels and look blurred.",
    ],
    modelAnswer: "A vector crest can be scaled to the size of a banner or a web page and stay sharp because the shapes are recalculated. Its file is small as it only stores objects and properties. A bitmap would become blocky when enlarged.",
    hints: ["Think about scaling and about file size."],
    explanation: "The scenario needs the picture at several sizes, which is the strength of a vector graphic.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Explain the effect on image quality and on file size of increasing the resolution of a bitmap image.",
    points: [
      "There are more pixels, so the image can show more detail and looks sharper.",
      "Each pixel needs the same number of bits, so the file size increases.",
      "The file size is proportional to the number of pixels (width × height).",
    ],
    modelAnswer: "A higher resolution means more pixels, so more detail can be shown and the image is sharper. Because every pixel needs colour data, the file size increases in proportion to the number of pixels.",
    hints: ["Give one effect on quality and one on size."],
    explanation: "Resolution raises both the quality and the file size.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a bitmap loses quality when it is enlarged but a vector graphic does not.",
    points: [
      "A bitmap has a fixed number of pixels, so enlarging stretches each pixel and makes it visible.",
      "A vector graphic stores objects and properties, which are recalculated at the new size.",
      "The recalculated shapes still have sharp edges because the number of pixels used to draw them increases.",
    ],
    modelAnswer: "A bitmap holds a fixed grid of pixels, so when it is enlarged the pixels are stretched and become visible as blocks. A vector graphic holds objects and their properties, so the shapes are recalculated for the new size and edges stay sharp.",
    hints: ["Compare what is stored in each type of file."],
    explanation: "Bitmaps store pixels; vectors store a recipe for drawing.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Describe what is stored in the file header of a bitmap image.",
    points: ["Information about the image such as its width and height in pixels.", "The colour depth (and the file type)."],
    modelAnswer: "The header stores information about the file: the width and height of the image in pixels, the colour depth, and the file type.",
    explanation: "The header tells the program how to interpret the pixel data that follows.",
  });
  {
    const [w, h, d] = [600, 400, 24];
    const bytes = bytesOf(w, h, d);
    b.struct({
      d: 3, skill: "APPLICATION", examStyle: true, secs: 480, calculator: false,
      stem: `A student at a Gweru school takes a photograph of ${w} × ${h} pixels with a colour depth of ${d} bits for the school magazine.`,
      parts: [
        P.num({ label: "(a)", marks: 1, type: "CALCULATION", stem: `Calculate the number of pixels in the photograph.`, value: w * h, explanation: `${w} × ${h} = ${w * h}.` }),
        P.num({ label: "(b)", marks: 2, type: "CALCULATION", unit: "bytes", stem: "Calculate the file size in bytes, ignoring the header.", value: bytes, explanation: `${w * h} × ${d} = ${w * h * d} bits; ÷ 8 = ${bytes} bytes (${d} bits is 3 bytes per pixel).` }),
        P.num({ label: "(c)", marks: 1, type: "CALCULATION", unit: "KiB", stem: "Convert your answer to part (b) to KiB.", value: bytes / 1024, tol: 0.5, explanation: `${bytes} ÷ 1024 = ${(bytes / 1024).toFixed(2)} KiB.` }),
        P.manual({ label: "(d)", marks: 2, stem: "The student halves the resolution to 300 × 200. State and explain the effect on the file size.", points: ["The file size becomes a quarter of the original.", "There are half as many pixels across and half as many down, so one quarter of the pixels."], modelAnswer: "The file size is divided by four, because the number of pixels across and down are both halved, so there are a quarter as many pixels." }),
      ],
      hints: ["Remember to divide by 8 to change bits to bytes.", "Halving both dimensions changes the pixel count by a factor of 4."],
      explanation: `${w * h} pixels × ${d} bits = ${w * h * d} bits = ${bytes} bytes = ${(bytes / 1024).toFixed(1)} KiB. Halving both dimensions gives a quarter of the size.`,
    });
  }
  {
    const A = { w: 1000, h: 800, d: 8 }, B = { w: 500, h: 400, d: 16 };
    const ba = bytesOf(A.w, A.h, A.d), bb = bytesOf(B.w, B.h, B.d);
    chk(ba / bb, 2);
    b.struct({
      d: 4, skill: "EVALUATION", examStyle: true, secs: 600, calculator: false,
      stem: `A Hwange tourist office compares two ways of storing a map picture. Image A is ${A.w} × ${A.h} pixels with a colour depth of ${A.d} bits. Image B is ${B.w} × ${B.h} pixels with a colour depth of ${B.d} bits.`,
      parts: [
        P.num({ label: "(a)", marks: 2, type: "CALCULATION", unit: "bytes", stem: "Calculate the file size of Image A in bytes (ignore headers).", value: ba, explanation: `${A.w} × ${A.h} × ${A.d} = ${A.w * A.h * A.d} bits; ÷ 8 = ${ba} bytes.` }),
        P.num({ label: "(b)", marks: 2, type: "CALCULATION", unit: "bytes", stem: "Calculate the file size of Image B in bytes (ignore headers).", value: bb, explanation: `${B.w} × ${B.h} × ${B.d} = ${B.w * B.h * B.d} bits; ÷ 8 = ${bb} bytes.` }),
        P.mcq({ label: "(c)", marks: 1, stem: "How many times larger is the file for Image A than the file for Image B?", options: [["4 times", "Image A has four times the pixels, but only half the bits per pixel."], ["2 times", "Correct: four times the pixels at half the depth gives twice the size."], ["8 times", "This is too large for the sizes calculated."], ["The same size", "The two sizes calculated are different."]], answer: "B", explanation: `${ba} ÷ ${bb} = ${ba / bb}.` }),
        P.manual({ label: "(d)", marks: 3, stem: "The map is made of straight roads, labels and coloured regions. Explain why a vector graphic may be better than either bitmap.", points: ["It is made of lines, shapes and text, which are drawing objects.", "It can be enlarged without loss of quality.", "The file is likely to be smaller than the bitmap."], modelAnswer: "The map consists of lines, shapes and text, which a vector graphic stores as objects with properties. It can be zoomed to any size without blurring and the file is likely to be smaller than a bitmap of the same map." }),
      ],
      hints: ["Compare the number of pixels in the two images and the bits per pixel.", "Think about what a vector graphic stores."],
      explanation: `Image A is ${ba} bytes and Image B is ${bb} bytes, a ratio of ${ba / bb}. A vector graphic suits a map of lines and shapes.`,
    });
  }

  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A bitmap is shown on screen at the same size. Which change makes its file smaller?",
    options: [
      ["Reducing the colour depth", "Correct: fewer bits per pixel mean less data to store."],
      ["Increasing the image resolution", "More pixels mean more data."],
      ["Adding more colours to the image", "More colours need a greater colour depth."],
      ["Converting the picture to a larger screen size", "Screen size does not change the stored data."],
    ],
    answer: "A",
    explanation: "File size = width × height × colour depth, so reducing the colour depth reduces the file size.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why is a vector graphic of a simple logo usually much smaller than a bitmap of the same logo?",
    options: [
      ["It stores a few objects, not a colour for every pixel", "Correct: the drawing list is short."],
      ["It always uses far fewer colours than the bitmap does", "The number of colours is not the main reason."],
      ["It is always compressed with a lossy method when saved", "Vector files are small because of how they are stored."],
      ["It has a lower pixel resolution than the bitmap has", "A vector graphic has no fixed resolution."],
    ],
    answer: "A",
    hints: ["Think about what is stored in each type of file."],
    explanation: "A bitmap stores every pixel. A simple vector logo is just a list of shapes with properties, which takes far less data.",
  });

  b.card("DEFINITION", "Pixel", "The smallest element of a bitmap image; each pixel is stored as a binary colour value.");
  b.card("DEFINITION", "Colour depth (bit depth)", "The number of bits used for the colour of each pixel; n bits give 2^n colours.");
  b.card("DEFINITION", "Image resolution", "The number of pixels in an image, width × height.");
  b.card("FORMULA", "Bitmap file size", "File size (bits) = width × height × colour depth. ÷ 8 for bytes, ÷ 1024 for KiB, ÷ 1024 again for MiB. Add the header if its size is given.");
  b.card("CONCEPT", "Effect of increasing resolution or colour depth", "Better quality (more detail, more colours) but a larger file.");
  b.card("DEFINITION", "Vector graphic", "An image stored as a drawing list of objects (lines, shapes, text) and their properties.");
  b.card("FACT", "Contents of a bitmap file header", "Information about the image such as the file type, width, height and colour depth.");
  b.card("CONCEPT", "Bitmap or vector?", "Bitmap for photographs and scans. Vector for logos, diagrams and maps that must scale without loss of quality.");
  b.card("CONCEPT", "Why do bitmaps lose quality when enlarged?", "They have a fixed number of pixels, which become visible as blocks. Vector shapes are recalculated at the new size.");
});
