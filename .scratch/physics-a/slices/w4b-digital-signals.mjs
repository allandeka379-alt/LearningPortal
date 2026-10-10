// W4b: aphys.communication.digital-signals (ZIMSEC only) — analogue v digital, regeneration, sampling (≥ 2 f_max),
// quantisation, binary codes, ADC/DAC, bit depth, bit rate, parallel-to-serial conversion.
import { concept, P, t, chk, same, sfStr, dpStr, sciTex, table, pctUnc } from "../lib.mjs";

const bin = (n, bits) => n.toString(2).padStart(bits, "0");

concept("aphys.communication.digital-signals", { file: "communication/digital-signals", keyPrefix: "communication.digital-signals" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the main reason a digital signal can be sent over a long distance with almost no loss of quality?",
    options: [
      ["Regenerators along the route rebuild clean pulses, removing the noise.", "Correct: only two levels need to be recognised, so noise can be discarded."],
      ["Digital signals are not attenuated at all as they travel along cables.", "All signals are attenuated; digital ones can be regenerated."],
      ["Digital signals do not pick up any noise from the channel on the way.", "They pick up noise like analogue signals; the noise is removed at regenerators."],
      ["Digital signals travel faster than analogue signals.", "The speed depends on the channel, not on the type of signal."],
    ],
    answer: "A",
    explanation: "Regeneration: each bit is re-sent as a fresh high or low pulse, so accumulated noise is removed.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Music containing frequencies up to 15 kHz is to be digitised. What is the minimum sampling rate?",
    options: [
      ["30 kHz", "Correct: at least twice the highest frequency."],
      ["15 kHz", "Sampling at the highest frequency itself loses that frequency completely."],
      ["7.5 kHz", "The sampling rate must be larger, not smaller, than the highest frequency."],
      ["225 kHz", "This squares the frequency; the rule is twice the highest frequency."],
    ],
    answer: "A",
    explanation: "f_s ≥ 2 f_max = 2 × 15 = 30 kHz.",
  });
  {
    same(parseInt("1011", 2), 11);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true,
      stem: "What is the decimal value of the binary number 1011?",
      options: [
        ["11", "Correct: 8 + 0 + 2 + 1."],
        ["13", "This reads the bits in the wrong order (1101 = 13)."],
        ["1011", "Binary place values are 8, 4, 2, 1, not 1000, 100, 10, 1."],
        ["3", "This only counts the number of 1s."],
      ],
      answer: "A",
      explanation: "1011 = 1 × 8 + 0 × 4 + 1 × 2 + 1 × 1 = 11.",
    });
  }
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "How many quantisation levels does a 6-bit analogue-to-digital converter have?",
    options: [
      [String(2 ** 6), "Correct: 2⁶ = 64."],
      ["12", "This is 6 × 2; the number of levels is 2⁶."],
      ["36", "This is 6²; the number of levels is 2⁶."],
      [String(2 ** 6 - 1), "63 is the highest level number (111111); there are 64 levels counting zero."],
    ],
    answer: "A",
    explanation: "n bits give 2ⁿ levels: 2⁶ = 64 (numbered 0 to 63).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "The number of bits per sample used by an ADC is increased while the sampling rate is unchanged. Which statement is correct?",
    options: [
      ["The steps are smaller and the copy is closer to the original, but the bit rate rises.", "Correct: more levels, smaller quantisation error, more bits per second."],
      ["Higher signal frequencies can now be reproduced, as each sample is more precise.", "The highest frequency reproduced depends on the sampling rate, not the bit depth."],
      ["The bit rate falls, because fewer samples are needed when each is more accurate.", "Each sample now uses more bits, so the bit rate rises."],
      ["The signal becomes immune to noise in the channel.", "Noise immunity comes from regeneration, not from the bit depth."],
    ],
    answer: "A",
    explanation: "More bits → 2ⁿ more levels → smaller step and quantisation error; bit rate = f_s × n increases.",
    hints: ["What does each extra bit do to the number of levels?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "An audio signal is sampled at a rate lower than twice its highest frequency. What is the effect on the reproduced signal?",
    options: [
      ["High-frequency detail is lost and may appear as false lower frequencies.", "Correct: too few samples per cycle cannot record rapid changes (aliasing)."],
      ["The reproduced signal is louder than the original.", "The sampling rate does not change the amplitude."],
      ["The quantisation steps become larger.", "Step size depends on the number of bits and the voltage range."],
      ["The reproduced signal is identical to the original, but the bit rate needed is lower.", "The bit rate is lower, but the reproduction is not identical."],
    ],
    answer: "A",
    explanation: "With fewer than two samples per cycle, the highest frequencies cannot be reconstructed.",
    hints: ["How many samples are taken in one cycle of the highest frequency?"],
  });
  {
    const fs = 16e3, n = 12;
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "A signal is sampled 16 000 times per second and each sample is coded with 12 bits. What is the bit rate?",
      options: [
        [`${(fs * n) / 1000} kbit/s`, "Correct: 16 000 × 12 bits per second."],
        ["16 kbit/s", "This counts samples, not bits."],
        [`${sfStr(fs / n / 1000, 2)} kbit/s`, "The bit rate is samples per second multiplied, not divided, by bits per sample."],
        [`${(2 * fs * n) / 1000} kbit/s`, "The factor 2 belongs to the sampling rule, not to the bit rate."],
      ],
      answer: "A",
      explanation: t`Bit rate $= f_{\text{s}} \times n = 16\,000 \times 12 = ${fs * n}\ \text{bit s}^{-1}$.`,
      hints: ["Bit rate = samples per second × bits per sample."],
    });
  }
  {
    const level = Math.round(5.4 / 1.0);
    same(bin(level, 3), "101");
    b.mcq({
      d: 4, skill: "APPLICATION",
      stem: "A 3-bit ADC has levels 1.0 V apart, from 000 = 0 V to 111 = 7.0 V, and rounds each sample to the nearest level. Which code does it give for a sample of 5.4 V?",
      options: [
        ["101", "Correct: 5.4 V rounds to level 5 = 101."],
        ["110", "Level 6 = 110 is 6.0 V, further from 5.4 V than level 5."],
        ["011", "This reverses the bits of 110; and 011 = 3."],
        ["010", "This is level 2 (2.0 V)."],
      ],
      answer: "A",
      explanation: "5.4/1.0 = 5.4 → nearest level 5; 5 = 4 + 1 = 101.",
      hints: ["Find the nearest level number first, then convert to binary."],
    });
  }
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Convert the binary number 11010 to decimal.",
    value: parseInt("11010", 2), wrong: [parseInt("01011", 2)],
    explanation: "11010 = 16 + 8 + 0 + 2 + 0 = 26.",
  });
  {
    const fs = 11000, n = 10;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "A radio link digitises speech by sampling at 11 kHz with 10 bits per sample. Calculate the bit rate, in bits per second.",
      value: fs * n, unit: "bit/s", wrong: [fs, 2 * fs * n],
      explanation: t`$11\,000 \times 10 = ${fs * n}\ \text{bit s}^{-1}$.`,
      hints: ["Multiply the sampling rate by the bits per sample."],
    });
  }
  {
    const nb = Math.ceil(Math.log2(1000));
    chk(2 ** nb, 1024);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "A sensor signal must be quantised into at least 1000 levels. Calculate the smallest number of bits per sample needed.",
      value: nb, wrong: [nb - 1, 1000 / 2],
      explanation: t`1. $2^{9} = 512$, too few.
2. $2^{10} = 1024 \geq 1000$, so ${nb} bits are needed.`,
      hints: ["Find the smallest n with 2ⁿ ≥ 1000."],
    });
  }
  {
    const fs = 22050, n = 16, tsec = 60;
    const bits = fs * n * tsec;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "A mono voice recording is sampled at 22.05 kHz with 16 bits per sample. Calculate the number of bits needed to store one minute of recording, to three significant figures.",
      value: bits, wrong: [fs * n, fs * tsec],
      explanation: t`1. Bit rate $= 22\,050 \times 16 = ${fs * n}\ \text{bit s}^{-1}$.
2. In 60 s: $${fs * n} \times 60 = ${sciTex(bits, 3)}$ bits (about 2.6 megabytes).`,
      hints: ["Bits = bit rate × time in seconds."],
    });
  }
  {
    const range = 5.1, levels = 2 ** 8;
    const step = range / (levels - 1);
    chk(step, 0.02);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`An 8-bit ADC codes 0 V as 00000000 and $5.10\ \text{V}$ as 11111111, with equal steps between. Calculate the voltage step between adjacent levels, in mV.`,
      value: step * 1000, unit: "mV", wrong: [(range / levels) * 1000, (range / 8) * 1000],
      explanation: t`1. 8 bits give $2^{8} = 256$ levels, numbered 0 to 255, so there are 255 steps.
2. Step $= \dfrac{5.10}{255} = 0.0200\ \text{V} = ${step * 1000}\ \text{mV}$. Dividing by 256 gives a slightly wrong step.`,
      hints: ["256 levels have 255 gaps between them."],
    });
  }
  {
    const step = 0.04, v = 1.8;
    const err = step / 2;
    b.num({
      d: 3, skill: "EVALUATION", calculator: true,
      stem: t`An ADC has a step of $0.040\ \text{V}$ and rounds to the nearest level. Calculate the largest possible quantisation error as a percentage of a $1.80\ \text{V}$ sample, in %, to two significant figures.`,
      value: pctUnc(err, v), sf: 2, unit: "%", wrong: [pctUnc(step, v)],
      explanation: t`The largest error is half a step, $0.020\ \text{V}$: $\dfrac{0.020}{1.80} \times 100 = ${sfStr(pctUnc(err, v), 2)}\%$. Small samples have a larger percentage error, which is why more bits are used for quiet sounds.`,
      hints: ["Rounding to the nearest level gives an error of at most half a step."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A regenerator in a digital link amplifies the noise along with the signal.",
    answer: false,
    explanation: "False. A regenerator decides whether each pulse is a 1 or a 0 and sends out a new clean pulse, so the noise is removed (unless it is large enough to flip a bit).",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Sampling", "Measuring the analogue signal at regular time intervals"],
      ["Quantisation", "Rounding each sample to the nearest allowed level"],
      ["Most significant bit", "The left-hand bit of a binary number, with the largest place value"],
      ["Regeneration", "Rebuilding clean pulses from a noisy digital signal"],
      ["Bit rate", "Number of binary digits sent per second"],
    ],
    explanation: "Key vocabulary of digital communication.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the order of operations in an analogue-to-digital converter.",
    template: "The ADC first {{blank:a}} the signal at regular intervals, then {{blank:b}} each value to the nearest level, then {{blank:c}} each level as a binary number.",
    blanks: [
      { id: "a", accepted: ["samples"], choices: ["samples", "quantises", "codes"] },
      { id: "b", accepted: ["quantises"], choices: ["samples", "quantises", "codes"] },
      { id: "c", accepted: ["codes"], choices: ["samples", "quantises", "codes"] },
    ],
    explanation: "Sample → quantise → code.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain the advantages of transmitting information in digital rather than analogue form.",
    points: [
      "All signals are attenuated and pick up noise; analogue amplifiers amplify the noise too, so it accumulates.",
      "A digital signal has only two levels, so regenerators can rebuild clean pulses and remove the noise.",
      "Extra bits can be added for error detection and correction.",
      "Digital data from many sources can be multiplexed, processed, stored and encrypted easily by computers.",
    ],
    modelAnswer: "Any signal is attenuated and picks up noise along the way. Amplifying an analogue signal amplifies the noise too, so it builds up stage by stage. A digital signal has only two levels, so a regenerator can decide whether each pulse is a 1 or a 0 and send out a clean pulse, removing the noise. Check bits can be added so errors can be detected and corrected, and digital data from different sources can be combined, processed, stored and encrypted by computer circuits.",
    explanation: "Regeneration is the key point.",
    hints: ["What happens to noise at each amplifier or regenerator?"],
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Explain how increasing (i) the sampling rate and (ii) the number of bits per sample improves the reproduced signal, and state the disadvantage of both.",
    points: [
      "(i) More samples per second record faster changes, so higher frequencies are reproduced (need f_s ≥ 2f_max).",
      "(ii) More bits give more levels and smaller steps, so the quantisation error is smaller and the staircase is closer to the original.",
      "Both increase the bit rate (f_s × n), needing more bandwidth or storage.",
    ],
    modelAnswer: "A higher sampling rate records the signal more often, so faster changes, and so higher frequencies, are reproduced, provided the rate is at least twice the highest frequency. More bits per sample give more, smaller steps, so the quantisation error falls and the reconstructed staircase follows the original more closely. Both raise the bit rate, so a channel of greater bandwidth or more storage is needed.",
    explanation: "Rate → frequency; bits → resolution; cost → bit rate.",
    hints: ["Bit rate = f_s × n."],
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a parallel-to-serial converter is needed between an ADC and a single transmission cable.",
    points: [
      "The ADC outputs all the bits of each sample at the same time on separate lines (parallel).",
      "A single cable carries one bit at a time, so the bits must be sent one after another in order (serial) at the bit rate.",
    ],
    modelAnswer: "The ADC gives all n bits of a sample at once, each on its own line. A single cable can carry only one bit at a time, so the converter sends the bits of each sample one after another in a fixed order, at the bit rate.",
    explanation: "Parallel bits → one at a time.",
  });

  // Practice structured: a 3-bit ADC (12 marks)
  {
    const step = 0.8;
    const ts = [0, 0.1, 0.2, 0.3, 0.4, 0.5];
    const vs = [1.3, 3.5, 5.0, 5.9, 4.6, 2.2];
    const levels = vs.map((v) => Math.round(v / step));
    const codes = levels.map((l) => bin(l, 3));
    const dac = levels.map((l) => l * step);
    same(Math.max(...levels) <= 7 ? 1 : 0, 1);
    const errs = vs.map((v, i) => Math.abs(v - dac[i]));
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A 3-bit ADC has levels $0.80\ \text{V}$ apart (000 = 0 V, 111 = 5.6 V) and rounds each sample to the nearest level. It samples a signal every $0.10\ \text{ms}$:

${table([t`$t\,/\,\text{ms}$`, ...ts.map((x) => dpStr(x, 1))], [[t`$V\,/\,\text{V}$`, ...vs.map((v) => dpStr(v, 1))]])}`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "State the number of quantisation levels.", value: 8, wrong: [3, 7], explanation: "2³ = 8 levels (0 to 7)." }),
        P.short({ label: "(b)", marks: 2, stem: "Write the binary code produced for the sample at t = 0.20 ms.", accepted: [codes[2]], explanation: t`$5.0 / 0.80 = ${dpStr(5.0 / step, 2)}$ → level ${levels[2]} = ${codes[2]}.` }),
        P.short({ label: "(c)", marks: 2, stem: "Write the binary code produced for the sample at t = 0.50 ms.", accepted: [codes[5]], explanation: t`$2.2 / 0.80 = ${dpStr(2.2 / step, 2)}$ → level ${levels[5]} = ${codes[5]}.` }),
        P.num({ label: "(d)", marks: 2, stem: "A DAC converts the code for t = 0.30 ms back to a voltage. Calculate this voltage, in V, to two significant figures.", value: dac[3], sf: 2, unit: "V", wrong: [vs[3]], explanation: t`$5.9/0.80 = ${dpStr(5.9 / step, 2)}$ → level ${levels[3]} (${codes[3]}); output $= ${levels[3]} \times 0.80 = ${dpStr(dac[3], 1)}\ \text{V}$.` }),
        P.num({ label: "(e)", marks: 2, stem: "Calculate the largest quantisation error among the six samples, in V, to two significant figures.", value: Math.max(...errs), sf: 2, unit: "V", wrong: [step / 2], explanation: t`DAC outputs: ${dac.map((x) => dpStr(x, 1)).join(", ")} V; errors: ${errs.map((x) => dpStr(x, 1)).join(", ")} V. The largest is $${dpStr(Math.max(...errs), 1)}\ \text{V}$, close to the limit of half a step (0.40 V).` }),
        P.manual({ label: "(f)", marks: 3, stem: "Describe the DAC output you would sketch against time, and suggest two changes that would make it a better copy of the original signal.", points: [
          "A staircase: constant voltage for 0.10 ms after each sample, jumping to the next value (levels that are multiples of 0.80 V).",
          "More bits per sample: smaller steps, smaller quantisation error.",
          "Higher sampling rate (shorter interval) so the steps are shorter and faster changes are followed / smooth with a low-pass filter.",
        ], modelAnswer: "The output is a staircase: each voltage is held for 0.10 ms and then jumps to the next level, the levels being multiples of 0.80 V. Using more bits per sample would make the steps smaller and reduce the quantisation error, and sampling more often would make each step shorter so the staircase follows faster changes; a low-pass filter would smooth the steps." }),
      ],
      explanation: "Level = sample/step rounded; code in binary; DAC output = level × step.",
      hints: ["Divide each sample by 0.80 V and round."],
    });
  }
  // Practice structured: a digital telephone link (8 marks)
  {
    const fmax = 3.2e3, fs = 7.2e3, n = 8;
    const rate = fs * n;
    const tbit = 1 / rate;
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A rural telephone exchange near Masvingo digitises speech, filtered to frequencies below $3.2\ \text{kHz}$, by sampling at $7.2\ \text{kHz}$ with 8 bits per sample.`,
      parts: [
        P.manual({ label: "(a)", marks: 1, stem: "Show that the sampling rate is high enough.", points: ["Minimum = 2 × 3.2 = 6.4 kHz; 7.2 kHz is more than this."], modelAnswer: "The rate must be at least 2 × 3.2 kHz = 6.4 kHz, and 7.2 kHz exceeds this." }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the number of quantisation levels.", value: 2 ** n, wrong: [n * 2], explanation: "2⁸ = 256." }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the bit rate for one call, in bits per second.", value: rate, unit: "bit/s", wrong: [fs], explanation: t`$7200 \times 8 = ${rate}\ \text{bit s}^{-1}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the time available for each bit, in µs, to three significant figures.", value: tbit * 1e6, unit: "µs", wrong: [(1 / fs) * 1e6], explanation: t`$\dfrac{1}{${rate}} = ${sciTex(tbit, 3)}\ \text{s} = ${sfStr(tbit * 1e6, 3)}\ \mu\text{s}$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why the speech is filtered to below 3.2 kHz before it is sampled.", points: [
          "Frequencies above half the sampling rate (3.6 kHz) cannot be reproduced and would appear as false lower frequencies (aliasing).",
          "Speech remains understandable with frequencies up to about 3 kHz, so removing higher ones keeps the bit rate low.",
        ], modelAnswer: "Any frequency above half the sampling rate, 3.6 kHz, would be reproduced wrongly as a false lower frequency, so these are filtered out first. Speech is still clear with frequencies up to about 3 kHz, so this keeps the sampling rate and the bit rate low." }),
      ],
      explanation: "f_s ≥ 2f_max; levels 2ⁿ; bit rate f_s × n.",
      hints: ["Bit rate = f_s × n."],
    });
    chk(rate, 57600);
  }

  b.card("DEFINITION", "**Analogue signal**", "Varies continuously and can take any value within a range.");
  b.card("DEFINITION", "**Digital signal**", "Takes only discrete values; in binary, two levels (1 and 0).");
  b.card("CONCEPT", "Why digital?", "Regenerators rebuild clean pulses (noise removed); check bits for error correction; easy processing, multiplexing, encryption.");
  b.card("FORMULA", "Sampling rule", t`$f_{\text{s}} \geq 2f_{\max}$`);
  b.card("FORMULA", "Levels and bit rate", t`$N = 2^{n}$ levels; bit rate $= f_{\text{s}} \times n$`);
  b.card("CONCEPT", "ADC steps", "Sample at regular intervals → quantise to the nearest level → code as an n-bit binary number.");
  b.card("CONCEPT", "DAC output", "A staircase of voltages proportional to the codes, smoothed by a filter.");
  b.card("CONCEPT", "Quantisation error", "Up to half a step; reduced by using more bits.");
  b.card("CONCEPT", "Parallel-to-serial conversion", "The n bits of each sample, produced together, are sent one after another along a single channel.");
});
