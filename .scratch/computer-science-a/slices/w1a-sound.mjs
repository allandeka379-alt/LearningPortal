// W1a: sound sampling. Cambridge AS Level only.
import { concept, P, soundBits, bytesTo, chk } from "../lib.mjs";

const bytesOf = (rate, res, sec, ch = 1) => soundBits(rate, res, sec, ch) / 8;

concept("acs.media.sound", { file: "media/sound", keyPrefix: "media.sound" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by the sampling rate of a sound recording?",
    options: [
      ["The number of samples taken each second", "Correct: it is measured in hertz (Hz)."],
      ["The number of bits used for each sample", "That is the sampling resolution."],
      ["The length of the recording in seconds", "The duration is a separate quantity in the file-size formula."],
      ["The loudness of the recorded sound", "Loudness is the amplitude of the wave, not the rate."],
    ],
    answer: "A",
    explanation: "The sampling rate is how often the amplitude is measured per second, measured in hertz.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by the sampling resolution of a sound recording?",
    options: [
      ["The number of bits used to store each sample", "Correct: with n bits each sample has one of 2^n values."],
      ["The number of samples taken every second", "That is the sampling rate."],
      ["The number of speakers that can play the sound", "Speakers do not decide how the sound is sampled."],
      ["The highest frequency in the recording", "Frequency is a property of the original sound."],
    ],
    answer: "A",
    explanation: "Sampling resolution is the number of bits per sample; more bits give a more accurate measurement of the wave.",
  });
  {
    const [rate, res] = [4000, 8];
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: false, unit: "bits",
      stem: `A mono recording is sampled at ${rate} Hz with ${res} bits per sample. How many bits are needed to store one second of the sound?`,
      value: rate * res,
      workedSolution: `1. Samples in one second = ${rate}.\n2. Bits = ${rate} × ${res} = ${rate * res}.`,
      explanation: `${rate} samples per second × ${res} bits = ${rate * res} bits.`,
    });
  }
  {
    const [rate, res, sec] = [2000, 8, 5];
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: false, unit: "bytes",
      stem: `A mono sound is sampled at ${rate} Hz with ${res}-bit samples and lasts ${sec} seconds. What is the file size in bytes?`,
      value: bytesOf(rate, res, sec),
      workedSolution: `1. Bits = ${rate} × ${res} × ${sec} = ${soundBits(rate, res, sec)}.\n2. Bytes = ${soundBits(rate, res, sec)} ÷ 8 = ${bytesOf(rate, res, sec)}.`,
      explanation: `${rate} × ${res} × ${sec} = ${soundBits(rate, res, sec)} bits; ÷ 8 = ${bytesOf(rate, res, sec)} bytes.`,
    });
  }
  {
    const [rate, res, sec, ch] = [24000, 16, 30, 2];
    const v = bytesOf(rate, res, sec, ch);
    b.calc({
      d: 3, skill: "APPLICATION", unit: "bytes", calculator: false,
      stem: `A stereo recording lasts ${sec} seconds. It is sampled at ${rate} Hz with a sampling resolution of ${res} bits. Calculate the file size in bytes.`,
      value: v,
      hints: ["Stereo means two channels.", "Multiply rate × resolution × time × channels, then divide by 8."],
      explanation: `${rate} × ${res} × ${sec} × ${ch} = ${soundBits(rate, res, sec, ch)} bits; ÷ 8 = ${v} bytes.`,
    });
  }
  {
    const [rate, res, sec] = [8192, 8, 24];
    const v = bytesTo(bytesOf(rate, res, sec), "KiB");
    b.calc({
      d: 3, skill: "APPLICATION", unit: "KiB", calculator: false,
      stem: `A mono sound clip lasting ${sec} seconds is sampled at ${rate} Hz with ${res}-bit samples. Calculate the file size in KiB. (1 KiB = 1024 bytes.)`,
      value: v,
      hints: ["Work out the bytes first: 8 bits is one byte per sample.", "Then divide by 1024."],
      explanation: `${rate} samples × ${sec} s × 1 byte = ${bytesOf(rate, res, sec)} bytes; ÷ 1024 = ${v} KiB.`,
    });
  }
  b.num({
    d: 3, skill: "ANALYSIS", unit: "×", calculator: false,
    stem: "A recording is changed from mono to stereo and its sampling rate is doubled. The sampling resolution and the length are unchanged. By what factor does the file size increase?",
    value: 4,
    hints: ["Each change multiplies the size by a factor; combine them."],
    workedSolution: "1. Mono to stereo doubles the number of channels: × 2.\n2. Doubling the rate: × 2.\n3. Together: 2 × 2 = 4.",
    explanation: "File size is proportional to the number of channels and to the sampling rate, so the size is multiplied by 2 × 2 = 4.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A recording is re-made with a higher sampling resolution but the same sampling rate. What is the effect?",
    options: [
      ["It is a more accurate recording and the file is larger", "Correct: each sample is measured more precisely and uses more bits."],
      ["It is a less accurate recording and the file is larger", "More bits per sample cannot reduce accuracy."],
      ["It is a more accurate recording and the file is smaller", "More bits per sample increase the file size."],
      ["It has more samples per second and the file is unchanged", "The rate has not changed, so the number of samples per second is the same."],
    ],
    answer: "A",
    explanation: "More bits per sample means each measurement is closer to the real height of the wave, so accuracy rises, and the file size rises in proportion.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A radio station in Bulawayo records music at a very low sampling rate. What is the most likely effect on the sound?",
    options: [
      ["High-frequency sounds are lost or distorted", "Correct: a low rate cannot follow rapid changes in the wave."],
      ["The recording is louder than the original", "Loudness comes from amplitude, not rate."],
      ["The file is larger than at a high rate", "A lower rate means fewer samples and a smaller file."],
      ["Only the bass sounds are removed", "It is the high frequencies that are lost first."],
    ],
    answer: "A",
    hints: ["Which frequencies change fastest and need the most samples?"],
    explanation: "A low sampling rate misses fast changes in the wave, so high-pitched sounds are lost or heard at the wrong pitch.",
  });
  b.tf({
    d: 1, skill: "UNDERSTANDING",
    stem: "Increasing the sampling rate makes a recorded sound louder.",
    answer: false,
    feedbackTrue: "Loudness depends on the amplitude of the wave, not on how often it is sampled.",
    feedbackFalse: "Correct: a higher rate captures the wave shape more accurately, but it does not change the loudness.",
    explanation: "Sampling rate affects accuracy and file size, not volume.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term to its meaning.",
    pairs: [
      ["Sampling", "Measuring the amplitude of a sound wave at regular intervals"],
      ["Sampling rate", "The number of samples per second, in hertz"],
      ["Sampling resolution", "The number of bits used to store each sample"],
      ["Analogue signal", "A signal that varies continuously"],
    ],
    explanation: "Digital sound is made by sampling an analogue signal; rate and resolution control the accuracy.",
  });
  {
    const [rate, res, sec, ch] = [6000, 8, 10, 2];
    const bits = soundBits(rate, res, sec, ch);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: `A stereo recording lasts ${sec} seconds and is sampled at ${rate} Hz with ${res}-bit samples. Complete the calculation.`,
      template: `Size in bits = {{blank:bits}}\n\nSize in bytes = {{blank:bytes}}`,
      blanks: [
        { id: "bits", input: "number", accepted: [String(bits)] },
        { id: "bytes", input: "number", accepted: [String(bits / 8)] },
      ],
      hints: ["Multiply rate × resolution × time × channels.", "Divide the bits by 8 for bytes."],
      explanation: `${rate} × ${res} × ${sec} × ${ch} = ${bits} bits; ÷ 8 = ${bits / 8} bytes.`,
    });
  }
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A mono recording of 4 minutes is sampled at R Hz with S-bit samples. Which expression gives the file size in bits?",
    options: [
      ["R × S × 4 × 60", "Correct: the time must be in seconds, 4 × 60."],
      ["R × S × 4", "This uses 4 minutes as if it were 4 seconds."],
      ["R × S × 4 × 60 × 2", "This includes a second channel, but the recording is mono."],
      ["R × S × 4 × 60 ÷ 8", "Dividing by 8 would give the size in bytes."],
    ],
    answer: "A",
    explanation: "File size (bits) = rate × resolution × time in seconds × channels. Four minutes is 4 × 60 seconds and mono has one channel.",
  });
  {
    const [rate, res, bytes] = [6000, 8, 240000];
    const sec = (bytes * 8) / (rate * res);
    b.num({
      d: 3, skill: "ANALYSIS", unit: "s", calculator: false,
      stem: `A mono sound file is ${bytes} bytes. It was sampled at ${rate} Hz with ${res}-bit samples. How many seconds long is the recording?`,
      value: sec,
      hints: ["Work out the number of bytes recorded every second.", "Divide the file size by that number."],
      workedSolution: `1. Bytes per second = ${rate} × ${res} ÷ 8 = ${(rate * res) / 8}.\n2. Time = ${bytes} ÷ ${(rate * res) / 8} = ${sec} seconds.`,
      explanation: `One second needs ${(rate * res) / 8} bytes, so ${bytes} bytes last ${sec} seconds.`,
    });
  }
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain the effect on the quality and the file size of a sound recording of increasing the sampling rate.",
    points: [
      "More samples are taken each second, so the shape of the wave is followed more closely.",
      "The recording is a more accurate representation of the original sound.",
      "The file size increases because there are more samples to store.",
    ],
    modelAnswer: "A higher sampling rate takes more measurements every second, so the digital recording follows the original wave more closely and is more accurate. There are more samples to store, so the file is larger.",
    hints: ["Give an effect on accuracy and an effect on the file size."],
    explanation: "Both accuracy and file size increase with the rate.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "A school in Masvingo records lessons as speech so that absent pupils can listen later. Suggest suitable sampling settings and justify them.",
    points: [
      "A low or medium sampling rate and resolution are enough for speech.",
      "Mono is enough, which halves the file size compared with stereo.",
      "Smaller files save storage and are quicker to download on slow connections.",
    ],
    modelAnswer: "Speech does not need the high rate or resolution used for music, so a modest sampling rate and resolution in mono are suitable. The files stay small, which saves storage space and downloads quickly on slow connections.",
    hints: ["Compare the needs of speech with the needs of music."],
    explanation: "Choose the lowest settings that still give clear speech.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Describe how an analogue sound is converted into a digital sound file.",
    points: ["The amplitude of the sound wave is measured at regular time intervals (sampled).", "Each measurement is stored as a binary number using a fixed number of bits."],
    modelAnswer: "The height of the wave is measured at regular intervals. Each measurement is rounded to the nearest value available and stored as a binary number.",
    explanation: "This is sampling followed by storing each sample in binary.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a very low sampling rate loses the high-frequency sounds in a recording.",
    points: [
      "High-frequency sounds change very quickly, in a short time.",
      "A low rate does not take enough samples to follow these quick changes.",
      "So the high frequencies are lost or are reproduced wrongly.",
    ],
    modelAnswer: "High-pitched sounds are waves that rise and fall very quickly. If the samples are far apart in time, they miss these quick changes, so the high frequencies are lost or heard as a different pitch.",
    hints: ["Think about how often the wave changes direction for a high-pitched sound."],
    explanation: "This effect is called aliasing; for this course only the outline is needed.",
  });
  {
    const [rate, res, sec] = [12000, 8, 20];
    const v = bytesOf(rate, res, sec);
    b.struct({
      d: 3, skill: "APPLICATION", examStyle: true, secs: 480, calculator: false,
      stem: `A voice message from a customer in Kariba is recorded as a mono sound file lasting ${sec} seconds. It is sampled at ${rate} Hz with a sampling resolution of ${res} bits.`,
      parts: [
        P.num({ label: "(a)", marks: 1, type: "CALCULATION", unit: "bits", stem: "Calculate the number of bits used for one second of the recording.", value: rate * res, explanation: `${rate} × ${res} = ${rate * res} bits.` }),
        P.num({ label: "(b)", marks: 2, type: "CALCULATION", unit: "bytes", stem: "Calculate the size of the whole file in bytes.", value: v, explanation: `${rate * res} × ${sec} = ${rate * res * sec} bits; ÷ 8 = ${v} bytes.` }),
        P.manual({ label: "(c)", marks: 3, stem: "The company changes to stereo with a higher sampling rate. Describe two effects on the sound file.", points: ["The file size increases (two channels and more samples).", "The sound is a more accurate representation of the original.", "More storage space or transfer time is needed."], modelAnswer: "The recording follows the original more closely, so it is more accurate, but the file is larger and needs more storage and more time to send." }),
      ],
      hints: ["Remember to divide by 8 to get bytes.", "Think about accuracy as well as size."],
      explanation: `${rate} × ${res} × ${sec} = ${rate * res * sec} bits = ${v} bytes.`,
    });
  }
  {
    const A = { r: 8000, s: 8, t: 60, c: 1 }, B = { r: 16000, s: 16, t: 60, c: 2 };
    const ba = bytesOf(A.r, A.s, A.t, A.c), bb = bytesOf(B.r, B.s, B.t, B.c);
    chk(bb / ba, 8);
    b.struct({
      d: 4, skill: "EVALUATION", examStyle: true, secs: 600, calculator: false,
      stem: `A Harare call centre wants to store recorded calls of ${A.t} seconds. Setting A is mono, ${A.r} Hz, ${A.s}-bit samples. Setting B is stereo, ${B.r} Hz, ${B.s}-bit samples.`,
      parts: [
        P.num({ label: "(a)", marks: 2, type: "CALCULATION", unit: "bytes", stem: "Calculate the size of a one-minute call stored using Setting A.", value: ba, explanation: `${A.r} × ${A.s} × ${A.t} × ${A.c} ÷ 8 = ${ba} bytes.` }),
        P.num({ label: "(b)", marks: 2, type: "CALCULATION", unit: "bytes", stem: "Calculate the size of a one-minute call stored using Setting B.", value: bb, explanation: `${B.r} × ${B.s} × ${B.t} × ${B.c} ÷ 8 = ${bb} bytes.` }),
        P.num({ label: "(c)", marks: 1, type: "CALCULATION", unit: "×", stem: "How many times larger is the file from Setting B than from Setting A?", value: bb / ba, explanation: `${bb} ÷ ${ba} = ${bb / ba}.` }),
        P.manual({ label: "(d)", marks: 3, stem: "Recommend a setting for storing thousands of recorded calls and justify your answer.", points: ["Setting A is recommended.", "Speech is clear enough at the lower rate and resolution, in mono.", "Its files are eight times smaller, so much less storage is needed."], modelAnswer: "Setting A. Speech is clear at 8000 Hz and 8 bits in mono, and each file is one eighth of the size, so thousands of calls need far less storage." }),
      ],
      hints: ["Use the same formula for both settings.", "Compare sizes, then think about what the recordings are used for."],
      explanation: `A: ${ba} bytes. B: ${bb} bytes, ${bb / ba} times larger. Speech needs only Setting A.`,
    });
  }

  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which change makes a recorded sound file larger, if nothing else changes?",
    options: [
      ["Recording for a longer time", "Correct: more seconds mean more samples."],
      ["Reducing the sampling resolution", "Fewer bits per sample make the file smaller."],
      ["Lowering the sampling rate", "Fewer samples per second make the file smaller."],
      ["Changing from stereo to mono", "Mono has one channel, so the file is smaller."],
    ],
    answer: "A",
    explanation: "File size is proportional to the time, the rate, the resolution and the number of channels.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Two recordings of the same length have the same sampling rate and resolution. One is mono and the other is stereo. How do the file sizes compare?",
    options: [
      ["The stereo file is twice the size of the mono file", "Correct: stereo has two channels."],
      ["The two files are the same size", "Each channel has its own samples."],
      ["The mono file is twice the size of the stereo file", "Stereo has more data, not less."],
      ["The stereo file is four times the size of the mono file", "Two channels double the size; they do not quadruple it."],
    ],
    answer: "A",
    hints: ["How many channels does each recording have?"],
    explanation: "The number of channels is a multiplier in the file-size calculation, so stereo (2) is twice mono (1).",
  });

  b.card("DEFINITION", "Sampling", "Measuring the amplitude of an analogue sound wave at regular time intervals and storing each measurement in binary.");
  b.card("DEFINITION", "Sampling rate", "The number of samples taken per second, in hertz (Hz).");
  b.card("DEFINITION", "Sampling resolution", "The number of bits used to store each sample; n bits give 2^n possible values.");
  b.card("FORMULA", "Sound file size", "Size (bits) = sampling rate × sampling resolution × time (seconds) × number of channels. Divide by 8 for bytes.");
  b.card("CONCEPT", "Effect of a higher sampling rate or resolution", "A more accurate recording but a larger file.");
  b.card("CONCEPT", "Effect of a very low sampling rate", "High-frequency sounds are lost or reproduced at the wrong pitch.");
  b.card("FACT", "Mono and stereo", "Mono has one channel; stereo has two, so a stereo file is twice the size of the same mono recording.");
  b.card("DEFINITION", "Analogue signal", "A signal that varies continuously, such as a sound wave. A digital signal is a sequence of binary numbers.");
  b.card("CONCEPT", "Unit trap in sound size questions", "The rate is per second, so convert minutes to seconds before multiplying.");
});
