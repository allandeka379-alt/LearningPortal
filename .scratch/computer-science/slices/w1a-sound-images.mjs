// W1a: representing sound (sampling) and bitmap images (Cambridge only).
import { concept, P } from "../lib.mjs";

const bitsFor = (n) => Math.ceil(Math.log2(n));

concept("comp.data.sound-images", { file: "data/sound-images", keyPrefix: "data.sound-images" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by the **sample rate** of a sound recording?",
    options: [
      ["The number of samples taken each second", "Correct: it is measured in hertz (samples per second)."],
      ["The number of bits used to store each sample", "That is the sample resolution."],
      ["The loudest sound that can be recorded", "Loudness is the amplitude, not the sample rate."],
      ["The length of the recording in seconds", "That is the duration."],
    ],
    answer: "A",
    explanation: "Sample rate = how often the amplitude is measured, in samples per second (Hz).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by the **sample resolution** of a sound recording?",
    options: [
      ["The number of bits used to store each sample", "Correct: it decides how many amplitude levels are possible."],
      ["The number of samples taken each second", "That is the sample rate."],
      ["The number of pixels in the sound file", "Pixels belong to images, not sound."],
      ["The time between the start and end of a recording", "That is the duration."],
    ],
    answer: "A",
    explanation: "Sample resolution (bit depth) = bits per sample; $n$ bits give $2^n$ levels.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **pixel**?",
    options: [
      ["The smallest single-coloured element of a bitmap image", "Correct: an image is a grid of pixels."],
      ["The number of bits used for each colour", "That is the colour depth."],
      ["The total number of dots across the width of a screen", "That is part of the resolution."],
      ["A sample of a sound wave at one moment", "A sample belongs to sound, not images."],
    ],
    answer: "A",
    explanation: "Picture element: one dot of one colour, stored as a binary value.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the effect of **increasing the colour depth** of a bitmap image?",
    options: [
      ["More colours can be shown, but the file size increases", "Correct: more bits per pixel give more colours and a larger file."],
      ["More pixels are stored, so the image is sharper", "More pixels means a higher resolution, not a greater colour depth."],
      ["The image is smaller on screen and the file is smaller", "Colour depth does not change screen size and it makes the file larger."],
      ["Fewer colours can be shown, so the file is smaller", "Increasing the depth increases the number of colours."],
    ],
    answer: "A",
    explanation: "Colour depth = bits per pixel. More bits: $2^n$ colours, more realistic shading, larger file.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A recording is made with a **higher sample rate**. Which statement is true?",
    options: [
      ["It is more accurate and has a larger file", "Correct: more samples per second follow the wave more closely but take more storage."],
      ["It is more accurate and has a smaller file", "More samples always mean more data."],
      ["It is less accurate and has a larger file", "More samples make the recording closer to the original."],
      ["Its accuracy is unchanged but it plays faster", "Playback speed does not change; accuracy improves."],
    ],
    answer: "A",
    explanation: "Higher sample rate → more samples per second → closer to the original wave → more data stored.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: "A sound is sampled with a sample resolution of **5 bits**. How many different amplitude levels can be recorded?",
    options: [
      ["32", "Correct: $2^5 = 32$."],
      ["5", "This is the number of bits, not the number of levels."],
      ["10", "This is 5 × 2; the rule is $2^n$."],
      ["31", "31 is the highest level number (0 to 31); there are 32 levels."],
    ],
    answer: "A",
    hints: ["Each extra bit doubles the number of levels."],
    explanation: "$n$ bits give $2^n$ levels: $2^5 = 32$ (numbered 0 to 31).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A photo looks blocky when Farai enlarges it on a large screen. What is the most likely reason?",
    options: [
      ["Its resolution is too low", "Correct: too few pixels, so each one is stretched into a visible block (pixelation)."],
      ["Its colour depth is too high", "A high colour depth gives smooth colours, not blocks."],
      ["Its sample rate is too low", "Sample rate applies to sound, not images."],
      ["It was saved with too many pixels", "More pixels would make it sharper when enlarged."],
    ],
    answer: "A",
    hints: ["Which property gives the number of pixels?"],
    explanation: "Low resolution → large visible pixels when enlarged (pixelation).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Increasing the sample resolution of a recording increases the number of amplitude levels each sample can have.",
    answer: true,
    explanation: "True. More bits per sample → $2^n$ levels → each sample is stored closer to its true value.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Reducing the resolution of an image increases its file size.",
    answer: false,
    explanation: "False. Fewer pixels means fewer values to store, so the file gets smaller (and the quality drops).",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: "An image has a colour depth of **6 bits**. How many different colours can each pixel be?",
    value: 2 ** 6, wrong: [6, 12, 36],
    explanation: "$2^6 = 64$ colours.",
    workedSolution: "1. Colours $= 2^{\\text{colour depth}}$.\n2. $2^6 = 64$.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: false, unit: "bits",
    stem: "A designer needs every pixel of a poster to be able to show any one of **200** different colours. What is the smallest colour depth that can be used?",
    value: bitsFor(200), wrong: [7, 200],
    hints: ["Find the smallest power of 2 that is at least 200."],
    explanation: `$2^7 = 128$ is too few; $2^8 = 256 \\geq 200$, so ${bitsFor(200)} bits per pixel.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "An image is **640** pixels wide and **480** pixels high. How many pixels does it contain?",
    value: 640 * 480, wrong: [1120, 640 * 480 * 8],
    hints: ["Resolution = width × height."],
    explanation: `$640 \\times 480 = ${640 * 480}$ pixels.`,
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: "A sound is sampled **8000** times a second for **3** seconds. How many samples are stored?",
    value: 8000 * 3, wrong: [8003, 8000],
    hints: ["Sample rate is samples per second."],
    explanation: `$8000 \\times 3 = ${8000 * 3}$ samples.`,
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Sample rate", "Samples taken per second"],
      ["Sample resolution", "Bits used per sample"],
      ["Image resolution", "Number of pixels (width × height)"],
      ["Colour depth", "Bits used per pixel"],
    ],
    explanation: "Sound: rate (how often) and resolution (how precisely). Images: resolution (how many pixels) and colour depth (how many colours).",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "A sound is stored by measuring the {{blank:a}} of the wave at regular time intervals. Increasing the number of bits per sample gives more possible {{blank:b}}, so the recording is more {{blank:c}} but the file is {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["amplitude"], choices: ["amplitude", "frequency", "colour", "resolution"] },
      { id: "b", accepted: ["levels"], choices: ["levels", "pixels", "seconds", "colours"] },
      { id: "c", accepted: ["accurate"], choices: ["accurate", "compressed", "secure", "lossy"] },
      { id: "d", accepted: ["larger"], choices: ["larger", "smaller", "the same size"] },
    ],
    hints: ["Sampling measures the height of the wave.", "More bits → more possible values."],
    explanation: "Amplitude is sampled; more bits per sample → more levels → more accurate → larger file.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how a bitmap image is represented in a computer.",
    points: [
      "The image is made of a grid of pixels.",
      "The colour of each pixel is stored as a binary value / number of bits set by the colour depth.",
      "Metadata (e.g. width, height/resolution, colour depth) is stored so the image can be rebuilt; or pixel values are stored in order, row by row.",
    ],
    modelAnswer: "A bitmap image is divided into a grid of pixels. Each pixel's colour is stored as a binary number, using the number of bits given by the colour depth. The file also stores metadata, such as the width, height and colour depth, so the computer can rebuild the image.",
    hints: ["Pixels, binary values, metadata."],
    explanation: "Grid of pixels → each pixel a binary colour code → metadata to rebuild it.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Thandeka is recording an interview for a podcast that listeners in rural areas will download on mobile data. Explain how her choice of **sample rate** and **sample resolution** affects the recording, and suggest suitable settings.",
    points: [
      "A higher sample rate / resolution gives a more accurate recording (closer to the original sound).",
      "But a higher sample rate / resolution gives a larger file.",
      "Large files take longer / cost more data to download on mobile networks.",
      "Suggestion with reason: moderate settings (enough for clear speech, lower than for music) to balance clarity and file size.",
    ],
    modelAnswer: "Increasing the sample rate takes more samples each second, and increasing the sample resolution stores each sample with more bits, so both make the recording sound closer to the real interview. However, both also make the file larger, which means slower and more expensive downloads on mobile data. Because the podcast is mostly speech, she should choose moderate settings: clear enough for voices, but lower than a music recording would need, to keep the file small.",
    hints: ["Give the effect on accuracy and on size.", "Link file size to the listeners' situation."],
    explanation: "Accuracy vs file size trade-off, applied to the listeners' bandwidth.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 8, calculator: false, secs: 720,
    stem: "A music teacher at a Bulawayo school records pupils singing. The recording software lets her choose the sample rate and the sample resolution.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe how the sound is sampled.", points: ["The amplitude/height of the sound wave is measured…", "…at regular time intervals, and each measurement is stored as a binary number."], modelAnswer: "The amplitude of the sound wave is measured at set, regular time intervals, and each measurement is rounded to the nearest level and stored in binary." }),
      P.num({ type: "CALCULATION", label: "(b)", marks: 1, stem: "She sets a sample resolution of 4 bits. How many different amplitude levels can each sample have?", value: 16, wrong: [4, 8], explanation: "$2^4 = 16$." }),
      P.mcq({ label: "(c)", stem: "She changes the sample resolution from 4 bits to 8 bits. By what factor does the number of levels increase?", options: [["16", "Correct: from 16 to 256 levels."], ["2", "The number of bits doubles, but the levels go from $2^4$ to $2^8$."], ["4", "That is the number of extra bits."], ["8", "8 is the new number of bits."]], answer: "A", explanation: "$256 \\div 16 = 16$." }),
      P.manual({ label: "(d)", marks: 4, stem: "Explain the effect on the recording of increasing (i) the sample rate and (ii) the sample resolution.", points: ["(i) More samples per second, so the stored sound follows the original wave more closely / more accurate.", "(i) More samples to store, so the file is larger.", "(ii) More bits per sample give more amplitude levels, so each sample is closer to its true value / more accurate.", "(ii) More bits per sample, so the file is larger."], modelAnswer: "(i) A higher sample rate takes more samples each second, so the recording is closer to the original sound, but there are more samples to store, so the file is larger. (ii) A higher sample resolution uses more bits per sample, giving more possible levels, so each sample is recorded more precisely, but each sample takes more bits, so the file is larger." }),
    ],
    hints: ["Number of levels = $2^n$.", "Give an effect on accuracy and on file size for each."],
    explanation: "Sampling = measuring amplitude at regular intervals; 4 bits → 16 levels, 8 bits → 256 levels; rate and resolution both raise accuracy and file size.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, marks: 6, calculator: false, secs: 540,
    stem: "A firm in Mutare designs a logo that uses exactly **20** colours. The logo will appear on its website and on large banners.",
    parts: [
      P.num({ type: "CALCULATION", label: "(a)", marks: 2, unit: "bits", stem: "Calculate the smallest colour depth that can show all 20 colours.", value: bitsFor(20), wrong: [4, 20], explanation: `$2^4 = 16 < 20$; $2^5 = 32 \\geq 20$, so ${bitsFor(20)} bits.` }),
      P.num({ type: "CALCULATION", label: "(b)", marks: 1, stem: "How many colours would be unused with that colour depth?", value: 2 ** bitsFor(20) - 20, wrong: [2 ** bitsFor(20)], explanation: "$32 - 20 = 12$." }),
      P.manual({ label: "(c)", marks: 3, stem: "The banner version must be printed very large. Explain why the designer should use a higher resolution for the banner than for the website, and one drawback.", points: ["A higher resolution has more pixels, so more detail is kept.", "When printed large, a low-resolution image would be pixelated / blocky; more pixels keep it sharp.", "Drawback: the file is larger (more storage / slower to send)."], modelAnswer: "A higher resolution means more pixels, so the logo keeps its detail and stays sharp when printed at a large size, whereas a low-resolution version would look blocky. The drawback is that the file is much larger to store and send." }),
    ],
    hints: ["Find the smallest $n$ with $2^n \\geq 20$.", "Think about what happens when a small image is enlarged."],
    explanation: `5 bits (32 colours, 12 unused). Higher resolution for large prints, at the cost of file size.`,
  });

  b.card("DEFINITION", "Sampling", "Measuring the amplitude of a sound wave at regular time intervals and storing each value in binary.");
  b.card("DEFINITION", "Sample rate", "Number of samples per second (Hz). Higher → more accurate sound, larger file.");
  b.card("DEFINITION", "Sample resolution", "Bits per sample. Higher → more amplitude levels ($2^n$), more accurate, larger file.");
  b.card("DEFINITION", "Pixel", "The smallest single-coloured element of a bitmap image.");
  b.card("DEFINITION", "Image resolution", "Number of pixels (width × height). Higher → more detail, larger file.");
  b.card("DEFINITION", "Colour depth", "Bits per pixel. $n$ bits → $2^n$ colours; higher → more realistic, larger file.");
  b.card("FORMULA", "Colours or levels from $n$ bits", "$2^n$ (e.g. 8 bits → 256 colours).");
  b.card("DEFINITION", "Metadata (image)", "Data about the image, such as width, height and colour depth, stored so it can be rebuilt.");
  b.card("CONCEPT", "Pixelation", "Visible blocks when a low-resolution image is enlarged: too few pixels for the size.");
});
