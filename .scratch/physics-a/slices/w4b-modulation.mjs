// W4b: aphys.communication.modulation (ZIMSEC only) — carrier waves, AM and FM, sidebands, bandwidth, FM deviation,
// AM versus FM, wavebands.
import { concept, P, t, chk, sfStr, dpStr, table, pctUnc, DATA, linFit } from "../lib.mjs";

const { c } = DATA;

concept("aphys.communication.modulation", { file: "communication/modulation", keyPrefix: "communication.modulation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In amplitude modulation, which property of the carrier wave varies in step with the information signal?",
    options: [
      ["Its amplitude", "Correct: the envelope follows the signal while the frequency stays constant."],
      ["Its frequency", "That is frequency modulation."],
      ["Its speed", "All radio waves travel at the speed of light."],
      ["Its wavelength", "The carrier wavelength is fixed in AM because its frequency is fixed."],
    ],
    answer: "A",
    explanation: "AM: amplitude varies with the signal displacement; carrier frequency constant.",
  });
  {
    const fc = 648, fm = 5.0;
    b.mcq({
      d: 2, skill: "APPLICATION",
      stem: t`A $648\ \text{kHz}$ carrier is amplitude-modulated by a pure $5.0\ \text{kHz}$ tone. Which frequencies are present in the transmitted signal?`,
      options: [
        [`${fc - fm} kHz, ${fc} kHz and ${fc + fm} kHz`, "Correct: the carrier and two side frequencies at f_c ± f_m."],
        [`${fc} kHz and ${fm} kHz`, "The audio frequency itself is not transmitted; it appears as side frequencies."],
        [`${fc} kHz only`, "Modulation adds side frequencies to the carrier."],
        [`${fc - 2 * fm} kHz, ${fc} kHz and ${fc + 2 * fm} kHz`, "The side frequencies are f_m, not 2f_m, from the carrier; 2f_m is the bandwidth."],
      ],
      answer: "A",
      explanation: t`Side frequencies at $${fc} \pm ${fm}\ \text{kHz}$: $${fc - fm}$ and $${fc + fm}\ \text{kHz}$.`,
    });
  }
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Speech with frequencies up to 6.0 kHz is transmitted by amplitude modulation. What is the bandwidth of the transmitted signal?",
    options: [
      ["12 kHz", "Correct: bandwidth = 2f_m."],
      ["6.0 kHz", "This counts only one sideband."],
      ["3.0 kHz", "The bandwidth is twice, not half, the highest audio frequency."],
      ["24 kHz", "This doubles twice."],
    ],
    answer: "A",
    explanation: "Upper and lower sidebands each 6.0 kHz wide: bandwidth 2 × 6.0 = 12 kHz.",
  });
  {
    const f = 2.0e3;
    const lam = c / f;
    chk(lam, 1.5e5);
    b.mcq({
      d: 2, skill: "APPLICATION",
      stem: "Why is a 2.0 kHz audio signal not transmitted directly as an electromagnetic wave?",
      options: [
        ["Its wavelength is 150 km, so an efficient aerial would be impossibly long.", "Correct: λ = 3.0 × 10⁸ / 2.0 × 10³ = 1.5 × 10⁵ m."],
        ["Electromagnetic waves cannot have frequencies as low as 2.0 kHz.", "They can; such waves just need enormous aerials."],
        ["Its wavelength is 150 m, which is absorbed by the ionosphere.", "This divides by 10⁶ instead of 10³; the wavelength is 150 km."],
        ["It would travel more slowly than a high-frequency wave.", "All electromagnetic waves travel at the same speed in a vacuum."],
      ],
      answer: "A",
      explanation: t`$\lambda = \dfrac{c}{f} = \dfrac{3.00 \times 10^{8}}{2.0 \times 10^{3}} = 1.5 \times 10^{5}\ \text{m}$. Aerials need to be comparable to the wavelength; all stations would also overlap at audio frequencies.`,
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "The amplitude of the audio signal fed to an FM transmitter is doubled, with its frequency unchanged. What happens to the transmitted wave?",
    options: [
      ["The frequency deviation doubles; the rate of frequency variation is unchanged.", "Correct: deviation ∝ signal amplitude; rate = signal frequency."],
      ["The carrier amplitude doubles, while the frequency deviation stays the same.", "In FM the carrier amplitude is always constant."],
      ["The rate at which the carrier frequency varies doubles; the deviation is unchanged.", "The rate equals the signal frequency, which has not changed."],
      ["The carrier frequency doubles.", "The centre (carrier) frequency is fixed; only the deviation either side of it changes."],
    ],
    answer: "A",
    explanation: "Loudness → size of deviation; pitch → rate of deviation.",
    hints: ["Which property of the signal sets the size of the deviation?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is FM reception usually much less noisy than AM reception?",
    options: [
      ["Noise mainly changes the amplitude of the wave, which an FM receiver ignores.", "Correct: FM information is in the frequency, so amplitude noise can be removed."],
      ["FM waves travel faster than AM waves, so they pick up less noise.", "Both travel at the speed of light."],
      ["FM uses a smaller bandwidth, so less noise is received.", "FM uses a much larger bandwidth than AM."],
      ["FM signals are reflected by the ionosphere, which filters out noise.", "VHF FM signals pass through the ionosphere; they travel by line of sight."],
    ],
    answer: "A",
    explanation: "Electrical noise adds to the amplitude; an AM receiver reproduces it, an FM receiver limits the amplitude and detects only frequency changes.",
    hints: ["Where is the information in each type?"],
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In which waveband is FM radio broadcast?",
    options: [
      ["VHF", "Correct: about 87.5 to 108 MHz."],
      ["MW", "Medium wave is used for AM broadcasting."],
      ["LW", "Long wave is used for AM broadcasting."],
      ["Microwave", "Microwaves are used for satellite and point-to-point links."],
    ],
    answer: "A",
    explanation: "FM needs a wide bandwidth per station, available only at VHF.",
  });
  {
    const fc = 101.4, k = 15, V = 3.0;
    const dev = (k * V) / 1000;
    b.mcq({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`An FM transmitter has a carrier frequency of $101.4\ \text{MHz}$ and a frequency deviation of $15\ \text{kHz}$ per volt. It is modulated by a sine wave of peak $3.0\ \text{V}$ and frequency $2.0\ \text{kHz}$. Which statement describes the transmitted wave?`,
      options: [
        [`Its frequency varies between ${dpStr(fc - dev, 3)} MHz and ${dpStr(fc + dev, 3)} MHz, 2000 times per second.`, "Correct: deviation = 15 × 3.0 = 45 kHz; rate = signal frequency."],
        [`Its frequency varies between ${dpStr(fc - 0.002, 3)} MHz and ${dpStr(fc + 0.002, 3)} MHz, 45 000 times per second.`, "This swaps the deviation and the signal frequency."],
        [`Its frequency varies between ${dpStr(fc - dev / 2, 4)} MHz and ${dpStr(fc + dev / 2, 4)} MHz, 2000 times per second.`, "The deviation is 45 kHz either side of the carrier, not 45 kHz in total."],
        [`Its amplitude varies by 45 kHz, 2000 times per second.`, "In FM the amplitude is constant; and amplitude is not measured in kHz."],
      ],
      answer: "A",
      explanation: t`$\Delta f = 15 \times 3.0 = 45\ \text{kHz} = 0.045\ \text{MHz}$, so the frequency swings from $${dpStr(fc - dev, 3)}$ to $${dpStr(fc + dev, 3)}\ \text{MHz}$ at the signal frequency, 2000 times per second.`,
      hints: ["Deviation = sensitivity × signal amplitude."],
    });
  }
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`A $1.20\ \text{MHz}$ carrier is amplitude-modulated by an $8.0\ \text{kHz}$ signal. Calculate the frequency of the upper side frequency, in kHz.`,
    value: 1200 + 8, unit: "kHz", wrong: [1200 + 16, 1200 - 8],
    explanation: t`$f_c + f_m = 1200 + 8.0 = 1208\ \text{kHz}$ (the lower one is $1192\ \text{kHz}$).`,
  });
  {
    const lo = 150, hi = 285, bw = 2 * 4.5;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A long-wave band runs from $150\ \text{kHz}$ to $285\ \text{kHz}$. AM stations limit their audio to $4.5\ \text{kHz}$. Calculate the maximum number of stations that can broadcast in this band without overlapping.`,
      value: (hi - lo) / bw, wrong: [(hi - lo) / 4.5],
      explanation: t`Each station needs $2 \times 4.5 = 9.0\ \text{kHz}$. Number $= \dfrac{285 - 150}{9.0} = ${(hi - lo) / bw}$. Using 4.5 kHz per station counts only one sideband.`,
      hints: ["Find the bandwidth of one station first."],
    });
  }
  {
    const fc = 88.6, k = 12, V = 4.0;
    const fmax = fc + (k * V) / 1000;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`An FM carrier of $88.600\ \text{MHz}$ is modulated by a signal of peak value $4.0\ \text{V}$. The transmitter's frequency deviation is $12\ \text{kHz V}^{-1}$. Calculate the highest frequency of the transmitted wave, in MHz, to three decimal places.`,
      value: fmax, dp: 3, unit: "MHz", wrong: [fc + (k * V) / 1e6, fc + (2 * k * V) / 1000],
      explanation: t`1. Deviation $= 12 \times 4.0 = 48\ \text{kHz} = 0.048\ \text{MHz}$.
2. Highest frequency $= 88.600 + 0.048 = ${dpStr(fmax, 3)}\ \text{MHz}$.`,
      hints: ["Convert the deviation from kHz to MHz."],
    });
  }
  {
    const f = 102e6;
    const half = c / f / 2;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A dipole aerial for an FM radio is made half a wavelength long. Calculate its length, in m, for a station broadcasting at $102\ \text{MHz}$, to three significant figures.`,
      value: half, unit: "m", wrong: [c / f, c / f / 4],
      explanation: t`1. $\lambda = \dfrac{c}{f} = \dfrac{3.00 \times 10^{8}}{1.02 \times 10^{8}} = ${sfStr(c / f, 3)}\ \text{m}$.
2. Length $= \dfrac{\lambda}{2} = ${sfStr(half, 3)}\ \text{m}$, a practical size; a 3 kHz audio wave would need 50 km.`,
      hints: ["Use c = fλ."],
    });
  }
  {
    const band = 108.0 - 87.5, dev = 75, fm = 15;
    const bw = 2 * (dev + fm);
    const n = Math.floor((band * 1000) / bw);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`FM broadcast stations use a maximum frequency deviation of $75\ \text{kHz}$ and audio up to $15\ \text{kHz}$; the bandwidth of each is estimated as $2(\Delta f + f_m)$. Calculate the largest whole number of such stations that could fit, without overlapping, in the band from $87.5\ \text{MHz}$ to $108.0\ \text{MHz}$.`,
      value: n, wrong: [Math.floor((band * 1000) / (2 * fm)), Math.floor((band * 1000) / (dev + fm))],
      explanation: t`1. Bandwidth per station $= 2(75 + 15) = ${bw}\ \text{kHz}$.
2. Band width $= 108.0 - 87.5 = 20.5\ \text{MHz} = 20\,500\ \text{kHz}$.
3. $\dfrac{20\,500}{${bw}} = ${sfStr((band * 1000) / bw, 4)}$, so ${n} stations. (In practice stations in one area are spaced further apart.) Using the AM formula $2f_m$ would give far too many.`,
      hints: ["Find one station's bandwidth, then divide."],
    });
  }
  {
    const div = 8.0, ddiv = 0.2, base = 1.0e-6, cycles = 10;
    const f = cycles / (div * base);
    b.num({
      d: 3, skill: "EVALUATION", calculator: true,
      stem: t`On an oscilloscope set to $1.0\ \mu\text{s}$ per division, ten cycles of a carrier wave span $8.0 \pm 0.2$ divisions. The carrier frequency is calculated as $${sfStr(f / 1e6, 3)}\ \text{MHz}$. Calculate the percentage uncertainty in this frequency (ignore any uncertainty in the time-base), in %, to two significant figures.`,
      value: pctUnc(ddiv, div), sf: 2, unit: "%", wrong: [pctUnc(ddiv / cycles, div), pctUnc(ddiv, div) * 2],
      explanation: t`$f = \dfrac{10}{8.0 \times 1.0 \times 10^{-6}} = ${sfStr(f / 1e6, 3)}\ \text{MHz}$. The percentage uncertainty in $f$ equals that in the length measured: $\dfrac{0.2}{8.0} \times 100 = ${sfStr(pctUnc(ddiv, div), 2)}\%$. Measuring over many cycles keeps it small.`,
      hints: ["f ∝ 1/(length on screen): same percentage uncertainty."],
    });
  }
  b.tf({
    d: 2, skill: "RECALL",
    stem: "In frequency modulation, the amplitude of the carrier wave stays constant.",
    answer: true,
    explanation: "True. Only the frequency changes; this is why amplitude noise can be rejected.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each waveband with a typical use.",
    pairs: [
      ["LW (30-300 kHz)", "AM broadcasting over long distances by surface wave"],
      ["MW (300 kHz-3 MHz)", "National AM radio broadcasting"],
      ["VHF (30-300 MHz)", "FM radio broadcasting"],
      ["UHF (300 MHz-3 GHz)", "Television and mobile phones"],
    ],
    explanation: "Lower frequencies travel further around the Earth; higher frequencies offer more bandwidth.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the comparison of AM and FM.",
    template: "Compared with FM, an AM station needs a {{blank:a}} bandwidth, so {{blank:b}} stations fit in a waveband, but AM reception is {{blank:c}} affected by electrical noise.",
    blanks: [
      { id: "a", accepted: ["smaller"], choices: ["smaller", "larger"] },
      { id: "b", accepted: ["more"], choices: ["more", "fewer"] },
      { id: "c", accepted: ["more"], choices: ["more", "less"] },
    ],
    explanation: "AM: 2f_m bandwidth, many stations, but noise appears as amplitude changes.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why audio signals are transmitted by modulating a high-frequency carrier wave rather than transmitted directly.",
    points: [
      "Audio frequencies have very long wavelengths (tens to hundreds of km), so aerials would be impossibly long; a high-frequency carrier needs a short aerial.",
      "All stations would occupy the same audio frequencies and interfere.",
      "Each station uses a different carrier frequency, so a receiver can be tuned to select one.",
      "Carrier frequency can be chosen for suitable propagation (ground wave, sky wave, line of sight) / low frequencies are radiated inefficiently.",
    ],
    modelAnswer: "Audio signals have wavelengths of tens to hundreds of kilometres, so an efficient aerial would be impossibly long, whereas a high-frequency carrier can use an aerial a metre or so long. If every station transmitted raw audio, all would use the same frequencies and interfere; giving each station its own carrier frequency allows the receiver to tune to one. The carrier frequency can also be chosen to travel in a suitable way, by ground wave, sky wave or line of sight.",
    explanation: "Aerial size, sharing the spectrum, tuning, propagation.",
    hints: ["Calculate the wavelength of a 3 kHz wave."],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Compare AM and FM broadcasting, giving four differences.",
    points: [
      "Bandwidth: AM small (2f_m, about 9 kHz), FM large (about 200 kHz), so AM fits more stations into a waveband.",
      "Noise: FM much less affected by noise (receiver ignores amplitude changes).",
      "Quality: FM carries a wider audio range (to about 15 kHz), so better quality.",
      "Range: AM (LW/MW) travels further, by surface and sky waves; FM at VHF is line of sight / AM equipment simpler and cheaper.",
    ],
    modelAnswer: "AM needs only a narrow bandwidth, 2f_m or about 9 kHz, so many more stations fit in a waveband than for FM, which needs about 200 kHz each. FM suffers much less from noise, because the receiver ignores amplitude changes, and it carries audio up to about 15 kHz, so its quality is higher. AM on long and medium waves travels much further by surface and sky waves, while VHF FM is limited to line of sight; AM transmitters and receivers are also simpler and cheaper.",
    explanation: "Bandwidth, noise, quality, range/cost.",
    hints: ["Think about bandwidth, noise, quality and range."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "A carrier wave is amplitude-modulated by a sinusoidal signal of much lower frequency. Describe the graph of the modulated wave's voltage against time that you would sketch.",
    points: [
      "Rapid oscillations of the carrier, evenly spaced (constant carrier frequency).",
      "The peaks of the oscillations lie on an envelope that has the shape of the sinusoidal signal (top and bottom envelopes mirror each other).",
      "The envelope repeats at the signal frequency; its variation in height shows the signal amplitude.",
    ],
    modelAnswer: "Voltage on the vertical axis and time on the horizontal. The carrier oscillates rapidly with evenly spaced cycles because its frequency is constant, but the heights of the cycles rise and fall: the peaks trace out a sine-shaped envelope, mirrored above and below the axis, that repeats once per signal period and whose variation in height represents the signal amplitude.",
    explanation: "Constant spacing, varying height following the signal.",
    hints: ["What stays constant and what changes?"],
  });

  // Practice structured: the spectrum of a medium-wave station (12 marks)
  {
    const fc = 811.0;
    const tones = [8.0, 5.0, 2.0];
    const freqs = [...tones.map((x) => fc - x), fc, ...[...tones].reverse().map((x) => fc + x)];
    const amps = [0.15, 0.30, 0.4, 2.0, 0.4, 0.30, 0.15];
    const fmax = fc - freqs[0];
    const bw = 2 * fmax;
    const n = Math.floor((1600 - 540) / bw);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A spectrum analyser shows the frequency components of an AM medium-wave broadcast at one instant, when the audio contains three tones:

${table([t`$f\,/\,\text{kHz}$`, ...freqs.map((x) => dpStr(x, 1))], [["relative amplitude", ...amps.map((a) => dpStr(a, 2))]])}`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "State the carrier frequency, in kHz.", value: fc, dp: 1, unit: "kHz", wrong: [freqs[0]], explanation: "The carrier is the largest component, in the middle: 811.0 kHz." }),
        P.num({ label: "(b)", marks: 2, stem: "Determine the highest audio frequency present, in kHz.", value: fmax, dp: 1, unit: "kHz", wrong: [bw], explanation: t`The outermost side frequencies are $${dpStr(fc - fmax, 1)}$ and $${dpStr(fc + fmax, 1)}\ \text{kHz}$, each $${dpStr(fmax, 1)}\ \text{kHz}$ from the carrier.` }),
        P.num({ label: "(c)", marks: 1, stem: "State the bandwidth of the signal, in kHz.", value: bw, dp: 1, unit: "kHz", wrong: [fmax], explanation: t`$${dpStr(freqs[6], 1)} - ${dpStr(freqs[0], 1)} = ${dpStr(bw, 1)}\ \text{kHz} = 2f_m$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why each audio tone produces two components, one each side of the carrier.", points: [
          "Varying the carrier amplitude at the tone frequency f_m is equivalent to adding two steady waves at f_c − f_m and f_c + f_m to the carrier (sum and difference frequencies).",
          "So each tone gives a lower and an upper side frequency, symmetric about f_c (forming the lower and upper sidebands).",
        ], modelAnswer: "Multiplying the carrier by a factor that varies at the tone frequency produces sum and difference frequencies: the modulated wave is the carrier plus two steady waves at f_c − f_m and f_c + f_m. Each tone therefore appears twice, symmetrically either side of the carrier, building up the lower and upper sidebands." }),
        P.num({ label: "(e)", marks: 2, stem: "If every station in a medium-wave allocation from 540 kHz to 1600 kHz used this bandwidth, calculate how many could fit without overlapping.", value: n, wrong: [Math.floor((1600 - 540) / fmax)], explanation: t`$\dfrac{1600 - 540}{${dpStr(bw, 1)}} = ${sfStr((1600 - 540) / bw, 3)}$, so ${n} stations.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain why AM broadcasters limit the audio bandwidth, and one effect on what listeners hear.", points: [
          "A smaller audio range gives a smaller bandwidth (2f_m), so more stations fit in the band without overlapping/interfering.",
          "High-frequency sounds above the limit are lost, so music sounds less clear/lower fidelity.",
        ], modelAnswer: "Limiting the audio range keeps each station's bandwidth, 2f_m, small, so more stations fit into the band without interfering. The cost is that sounds above the limit are cut off, so music and speech sound duller than on FM." }),
        P.manual({ label: "(g)", marks: 2, stem: "Suggest why this station can be received at night hundreds of kilometres away, although an FM station cannot.", points: [
          "Medium waves are reflected by the ionosphere (sky wave), especially at night, so they reach beyond the horizon.",
          "VHF FM waves pass through the ionosphere and travel only in straight lines (line of sight), so their range is limited.",
        ], modelAnswer: "Medium waves are reflected back to Earth by the ionosphere, strongly at night, so they reach far beyond the horizon. The VHF waves used for FM pass through the ionosphere and travel only in straight lines, so they cannot be received beyond line of sight." }),
      ],
      explanation: "Carrier in the centre; side frequencies at f_c ± f_m; bandwidth 2f_m.",
      hints: ["The carrier is the largest component.", "Bandwidth = highest − lowest frequency."],
    });
  }
  // Practice structured: an FM transmitter's characteristic (8 marks)
  {
    const vs = [-2.4, -1.6, -0.8, 0, 0.8, 1.6, 2.4];
    const fs = [99.849, 99.866, 99.883, 99.9, 99.918, 99.934, 99.951];
    const fit = linFit(vs, fs);
    const k = fit.m * 1000; // kHz per V
    const Vpk = 1.8;
    const dev = k * Vpk;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Tatenda tests a small FM transmitter by applying steady voltages $V$ to its input and measuring the carrier frequency $f$:

${table([t`$V\,/\,\text{V}$`, t`$f\,/\,\text{MHz}$`], vs.map((v, i) => [dpStr(v, 1), dpStr(fs[i], 3)]))}`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "State the unmodulated carrier frequency, in MHz.", value: 99.9, dp: 3, unit: "MHz", wrong: [99.836], explanation: "At V = 0 the frequency is the carrier frequency, 99.900 MHz." }),
        P.num({ label: "(b)", marks: 2, stem: "Determine the frequency deviation per volt, in kHz per volt, from the gradient of a graph of f against V.", value: k, tol: 1.5, wrong: [fit.m], explanation: t`Gradient $\approx \dfrac{99.951 - 99.849}{4.8} = ${sfStr(k / 1000, 3)}\ \text{MHz V}^{-1} = ${sfStr(k, 3)}\ \text{kHz V}^{-1}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`A sinusoidal signal of peak $1.8\ \text{V}$ and frequency $3.5\ \text{kHz}$ is applied. Calculate the frequency deviation, in kHz.`, value: dev, tol: 4, unit: "kHz", wrong: [4.0], explanation: t`$\Delta f = ${sfStr(k, 3)} \times 1.8 \approx ${sfStr(dev, 2)}\ \text{kHz}$.` }),
        P.num({ label: "(d)", marks: 1, stem: "State how many times per second the carrier frequency swings from its lowest to its highest value and back.", value: 3500, wrong: [Math.round(dev * 1000)], explanation: "Once per cycle of the signal: 3500 times per second (the signal frequency)." }),
        P.num({ label: "(e)", marks: 2, stem: t`Estimate the bandwidth using $2(\Delta f + f_m)$, in kHz.`, value: 2 * (dev + 3.5), tol: 7, unit: "kHz", wrong: [2 * 3.5], explanation: t`$2(${sfStr(dev, 2)} + 3.5) \approx ${sfStr(2 * (dev + 3.5), 2)}\ \text{kHz}$, far wider than the 7 kHz an AM signal would need.` }),
      ],
      explanation: "FM: f varies linearly with V; deviation = sensitivity × peak voltage; rate = signal frequency.",
      hints: ["The gradient of f against V is the deviation per volt."],
    });
  }

  b.card("DEFINITION", "**Carrier wave**", "A high-frequency wave of constant amplitude and frequency that is modulated to carry a signal.");
  b.card("DEFINITION", "**Amplitude modulation**", "The carrier's amplitude varies in step with the signal's displacement; its frequency stays constant.");
  b.card("DEFINITION", "**Frequency modulation**", "The carrier's frequency varies in step with the signal's displacement; its amplitude stays constant.");
  b.card("FORMULA", "AM side frequencies and bandwidth", t`$f_c \pm f_m$; bandwidth $= 2f_m$`);
  b.card("CONCEPT", "FM deviation", "Size of the frequency deviation ∝ signal amplitude (loudness); rate of deviation = signal frequency (pitch).");
  b.card("CONCEPT", "Why a carrier?", "Short aerials (λ comparable to aerial), each station its own frequency for tuning, suitable propagation.");
  b.card("CONCEPT", "AM versus FM", "AM: narrow bandwidth, more stations, long range, cheap, noisy. FM: wide bandwidth, better quality, less noise, VHF line of sight.");
  b.card("FACT", "Wavebands", "LW 30-300 kHz; MW 300 kHz-3 MHz (AM); VHF 30-300 MHz (FM 87.5-108 MHz); UHF 300 MHz-3 GHz (TV, phones).");
  b.card("FACT", "Typical broadcast bandwidths", "MW AM: 9 kHz channels (audio to 4.5 kHz). FM: about 200 kHz per station (75 kHz deviation, audio to 15 kHz).");
});
