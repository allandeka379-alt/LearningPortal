// W1a: measurement.instruments — instruments, zero errors, light gates, data loggers and the CRO.
import { concept, P, t as raw, chk, sfStr, dpStr, pctUnc } from "../lib.mjs";

// String.raw keeps "\n" literally: turn \n (not followed by a lower-case letter, so \nu and \neq survive) into a newline.
const t = (s, ...v) => raw(s, ...v).replace(/\\n(?![a-z])/g, "\n");

const K = "aphys.measurement.instruments";

concept(K, { file: "measurement/instruments", keyPrefix: "measurement.instruments" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: t`Which instrument is most suitable for measuring the diameter of a copper wire, about $0.3\ \text{mm}$ across?`,
    options: [
      ["a micrometer screw gauge", "Correct: its resolution of 0.01 mm gives an uncertainty of about 3 % on 0.3 mm."],
      ["vernier calipers", "A resolution of 0.1 mm is a third of the reading: far too coarse."],
      ["a metre rule", "A resolution of 1 mm is more than three times the diameter itself."],
      ["a steel rule marked in half-millimetres", "A resolution of 0.5 mm is larger than the diameter being measured."],
    ],
    answer: "A",
    explanation: "Choose the instrument whose resolution is small compared with the quantity: a micrometer (0.01 mm) for wires and thin sheets, vernier calipers (0.1 mm) for rods and tubes, a metre rule (1 mm) for lengths of tens of centimetres.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: t`On a pair of vernier calipers the zero of the vertical scale lies just past the $41\ \text{mm}$ mark of the main scale, and the 6th vernier line lines up exactly with a main-scale line. What is the reading?`,
    options: [
      [t`$41.6\ \text{mm}$`, "Correct: 41 mm from the main scale plus 6 × 0.1 mm from the vernier."],
      [t`$41.06\ \text{mm}$`, "Each vernier division adds 0.1 mm, not 0.01 mm (that is a micrometer's thimble)."],
      [t`$46.1\ \text{mm}$`, "The vernier gives tenths of a millimetre, not whole millimetres."],
      [t`$42.6\ \text{mm}$`, "The main-scale reading is the mark just before the vernier zero, 41 mm."],
    ],
    answer: "A",
    explanation: t`Main scale (before the vernier zero) $41\ \text{mm}$; coinciding vernier line 6 adds $0.6\ \text{mm}$; reading $41.6\ \text{mm}$.`,
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`A sinusoidal trace on an oscilloscope is $3.0$ divisions from the bottom of a trough to the top of a crest. The y-gain is $5.0\ \text{V div}^{-1}$. What is the amplitude (peak value) of the p.d.?`,
    options: [
      [t`$7.5\ \text{V}$`, "Correct: peak-to-peak 15 V, so the amplitude is half: 7.5 V."],
      [t`$15\ \text{V}$`, "This is the peak-to-peak value; the amplitude is half of it."],
      [t`$3.0\ \text{V}$`, "This is the number of divisions, not volts: multiply by the y-gain."],
      [t`$1.7\ \text{V}$`, "This divides by the y-gain instead of multiplying (and halves)."],
    ],
    answer: "A",
    explanation: t`Peak-to-peak $= 3.0 \times 5.0 = 15\ \text{V}$; amplitude $= 15/2 = 7.5\ \text{V}$.`,
  });
  {
    const T = 4.0 * 2e-3;
    const f = 1 / T;
    chk(f, 125, 1e-9);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`One complete cycle of a wave on an oscilloscope screen spans $4.0$ divisions. The time-base is set to $2.0\ \text{ms div}^{-1}$. What is the frequency of the signal?`,
      options: [
        [t`$125\ \text{Hz}$`, "Correct: T = 8.0 ms, so f = 1/(8.0 × 10⁻³ s) = 125 Hz."],
        [t`$0.125\ \text{Hz}$`, "This uses T = 8.0 s: the milliseconds were not converted."],
        [t`$8.0 \times 10^{-3}\ \text{Hz}$`, "8.0 × 10⁻³ s is the period, not the frequency."],
        [t`$250\ \text{Hz}$`, "This takes 4.0 divisions as two cycles; the 4.0 divisions are one whole cycle."],
      ],
      answer: "A",
      explanation: t`$T = 4.0 \times 2.0\ \text{ms} = 8.0\ \text{ms}$; $f = \dfrac{1}{8.0 \times 10^{-3}\ \text{s}} = 125\ \text{Hz}$.`,
      hints: ["Period = divisions × time-base.", "Convert ms to s before taking 1/T."],
    });
  }
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: t`A micrometer reads $+0.03\ \text{mm}$ with its jaws closed. With a steel sheet between the jaws it reads $3.48\ \text{mm}$. What is the thickness of the sheet?`,
    options: [
      [t`$3.45\ \text{mm}$`, "Correct: subtract the positive zero error."],
      [t`$3.51\ \text{mm}$`, "Adding a positive zero error makes the result even larger; it must be subtracted."],
      [t`$3.48\ \text{mm}$`, "The zero error has been ignored."],
      [t`$3.18\ \text{mm}$`, "The zero error is 0.03 mm, not 0.3 mm."],
    ],
    answer: "A",
    explanation: t`True value $=$ reading $-$ zero error $= 3.48 - 0.03 = 3.45\ \text{mm}$.`,
    hints: ["A positive zero error makes every reading too big."],
  });
  {
    const v = 0.05 / 0.025;
    chk(v, 2);
    b.mcq({
      d: 2, skill: "APPLICATION",
      stem: t`A card of length $5.0\ \text{cm}$ on a trolley blocks a light gate for $0.025\ \text{s}$. What is the speed of the trolley?`,
      options: [
        [t`$2.0\ \text{m s}^{-1}$`, "Correct: 0.050 m ÷ 0.025 s."],
        [t`$200\ \text{m s}^{-1}$`, "The length was left in centimetres."],
        [t`$0.50\ \text{m s}^{-1}$`, "This divides the time by the length."],
        [t`$1.3 \times 10^{-3}\ \text{m s}^{-1}$`, "This multiplies the length by the time."],
      ],
      answer: "A",
      explanation: t`$v = \dfrac{l}{t} = \dfrac{0.050\ \text{m}}{0.025\ \text{s}} = 2.0\ \text{m s}^{-1}$.`,
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is the main advantage of using a data logger with a motion sensor, rather than a stop-watch and metre rule, to study a trolley rolling down a ramp?",
    options: [
      ["It records many readings each second without reaction time, so fast changes are captured.", "Correct: automatic, frequent readings remove human timing errors."],
      ["It removes every systematic error, such as a wrongly placed sensor or zero error.", "A data logger can still have systematic errors, such as an offset or poor calibration."],
      ["It makes the trolley's motion more uniform by reducing friction on the ramp.", "The measuring method does not change the physics of the motion."],
      ["It needs no calibration or checking because it is an electronic instrument.", "Electronic sensors still need checking against known values."],
    ],
    answer: "A",
    explanation: "Data loggers take readings automatically at high rates, so there is no reaction time and rapid changes (an acceleration over a fraction of a second) can be recorded and plotted directly. They do not remove systematic errors.",
    hints: ["What limits a person with a stop-watch?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A light gate measures the speed of an accelerating trolley using a 10.0 cm card. The calculated value is the average speed while the card passes through the beam. How could the measurement better represent the speed at one point?",
    options: [
      ["Use a narrower card, so the speed changes less while it passes.", "Correct: a shorter interval gives a speed closer to the instantaneous value (the timer's resolution must still be small compared with the time)."],
      ["Use a wider card, so the beam is blocked for longer.", "A longer interval averages over a larger change in speed, which is worse."],
      ["Repeat the run several times and use the mean time.", "Repeats reduce random error but the result is still an average over 10 cm."],
      ["Move the light gate closer to the start of the ramp.", "This changes where the speed is measured, not how instantaneous it is."],
    ],
    answer: "A",
    explanation: "Speed = card length ÷ time gives the average speed over the card. A narrower card shortens the interval, so for an accelerating trolley the result is closer to the speed at the gate, as long as the time is still measured precisely.",
    hints: ["Over a shorter distance, how much does the speed change?"],
  });

  // Numerical and calculation items
  b.num({
    d: 2, skill: "APPLICATION",
    stem: t`On a micrometer the sleeve shows $7.0\ \text{mm}$ (the half-millimetre line is not visible) and the thimble line is at 36. There is no zero error. What is the reading, in mm?`,
    value: 7.36, dp: 2, unit: "mm", wrong: [7.036, 7.86],
    explanation: t`Sleeve $7.0\ \text{mm}$ + thimble $36 \times 0.01\ \text{mm} = 0.36\ \text{mm}$, so $7.36\ \text{mm}$. (If the half-millimetre line had been visible, the reading would be $7.86\ \text{mm}$.)`,
  });
  {
    const tt = 5.6 * 10e-6;
    const d = (1500 * tt) / 2;
    chk(d, 0.042, 1e-12);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`An ultrasound pulse and its echo from a boundary inside the body are displayed on an oscilloscope. They are $5.6$ divisions apart with the time-base at $10\ \mu\text{s div}^{-1}$. The speed of ultrasound in the tissue is $1500\ \text{m s}^{-1}$. Calculate the depth of the boundary, in cm.`,
      value: d * 100, sf: 2, unit: "cm", wrong: [1500 * tt * 100],
      explanation: t`1. Time between pulse and echo: $5.6 \times 10\ \mu\text{s} = 56\ \mu\text{s} = 5.6 \times 10^{-5}\ \text{s}$.\n2. The pulse travels to the boundary and back: distance $= 1500 \times 5.6 \times 10^{-5} = 0.084\ \text{m}$.\n3. Depth $= 0.084/2 = 0.042\ \text{m} = 4.2\ \text{cm}$.\n\nForgetting to halve gives 8.4 cm.`,
      hints: ["Time = divisions × time-base.", "The echo has travelled there and back."],
    });
  }
  {
    const T = (10 * 5e-3) / 2.5;
    const f = 1 / T;
    chk(f, 50, 1e-9);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Exactly $2.5$ cycles of a signal fill the $10$ horizontal divisions of an oscilloscope screen. The time-base is $5.0\ \text{ms div}^{-1}$. Calculate the frequency of the signal, in Hz.`,
      value: f, unit: "Hz", wrong: [1 / (10 * 5e-3), 2.5 / (10 * 5)],
      explanation: t`1. Total time across the screen: $10 \times 5.0 = 50\ \text{ms}$.\n2. Period: $T = 50/2.5 = 20\ \text{ms}$.\n3. $f = 1/(20 \times 10^{-3}) = 50\ \text{Hz}$.\n\nTaking the whole screen as one cycle gives 20 Hz.`,
      hints: ["Find the time for the whole screen, then divide by the number of cycles."],
    });
  }
  {
    const p = pctUnc(0.1, 2.4);
    b.num({
      d: 3, skill: "EVALUATION", calculator: true,
      stem: t`The height of a trace on an oscilloscope is read as $2.4$ divisions, with an uncertainty of $\pm 0.1$ division. Calculate the percentage uncertainty in the reading, to two significant figures.`,
      value: p, sf: 2, unit: "%", wrong: [pctUnc(0.1, 4.8)],
      explanation: t`$\dfrac{0.1}{2.4} \times 100 = ${sfStr(p, 2)}\,\%$. Increasing the y-gain sensitivity so the trace is about 5 divisions high would halve this.`,
      hints: ["Percentage uncertainty = (uncertainty ÷ reading) × 100."],
    });
  }
  {
    const dm = 18.4 - 0.2;
    const V = (Math.PI / 6) * (dm / 10) ** 3;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`Vernier calipers read $+0.2\ \text{mm}$ with the jaws closed. Closed on a marble they read $18.4\ \text{mm}$. Calculate the volume of the marble, in $\text{cm}^3$, to three significant figures. (Volume of a sphere $= \tfrac{1}{6}\pi d^3$.)`,
      value: V, sf: 3, unit: "cm³", wrong: [(Math.PI / 6) * 1.84 ** 3, (4 / 3) * Math.PI * (dm / 10) ** 3],
      explanation: t`1. Correct the zero error: $d = 18.4 - 0.2 = ${dpStr(dm, 1)}\ \text{mm} = ${dpStr(dm / 10, 2)}\ \text{cm}$.\n2. $V = \tfrac{1}{6}\pi (${dpStr(dm / 10, 2)})^3 = ${sfStr(V, 3)}\ \text{cm}^3$.\n\nIgnoring the zero error gives ${sfStr((Math.PI / 6) * 1.84 ** 3, 3)}; using the diameter in $\tfrac{4}{3}\pi r^3$ gives ${sfStr((4 / 3) * Math.PI * (dm / 10) ** 3, 3)}, eight times too big.`,
      hints: ["Subtract the zero error first.", "Convert mm to cm before cubing."],
    });
  }

  b.tf({
    d: 2, skill: "RECALL", daily: true,
    stem: "On an oscilloscope, the y-gain setting gives the number of volts represented by each vertical division.",
    answer: true,
    explanation: "True. The y-gain (in V div⁻¹) converts vertical divisions to p.d.; the time-base (in s div⁻¹ or ms div⁻¹) converts horizontal divisions to time.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A stop-watch that displays hundredths of a second gives hand-timed intervals with an uncertainty of about 0.01 s.",
    answer: false,
    explanation: "False. The display resolution is 0.01 s, but starting and stopping by hand adds a reaction-time uncertainty of about 0.1–0.3 s, which dominates.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each measurement with the most suitable instrument.",
    pairs: [
      ["length of a pendulum, about 80 cm", "metre rule"],
      ["internal diameter of a test tube", "vernier calipers"],
      ["diameter of a thin wire", "micrometer screw gauge"],
      ["time for 20 oscillations", "stop-watch"],
    ],
    explanation: "Match the resolution to the size of the quantity: 1 mm for tens of centimetres, 0.1 mm (with internal jaws) for a tube, 0.01 mm for a wire; a stop-watch for many seconds of oscillations.",
  });
  b.fib({
    d: 1, skill: "RECALL",
    stem: "Complete the sentence about the oscilloscope controls.",
    template: "The {{blank:a}} control sets the time represented by each horizontal division, and the {{blank:b}} control sets the p.d. represented by each vertical division.",
    blanks: [
      { id: "a", accepted: ["time-base"], choices: ["time-base", "y-gain", "focus"] },
      { id: "b", accepted: ["y-gain"], choices: ["time-base", "y-gain", "focus"] },
    ],
    explanation: "Time-base: horizontal, time per division. Y-gain: vertical, volts per division.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "A thermistor's resistance is measured at several known temperatures and plotted against temperature, so that later resistance readings can be converted into temperatures. What is this graph called?",
    accepted: ["calibration curve", "a calibration curve", "calibration graph", "calibration line"],
    wrong: ["best-fit line"],
    explanation: "A **calibration curve** links a sensor's output to known values of the quantity, so later readings can be converted.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Describe how you would use an oscilloscope to measure the frequency of an alternating p.d. as precisely as possible.",
    points: [
      "Adjust the time-base so that several complete cycles fill most of the screen (and the y-gain so the trace is large)",
      "Count the divisions for a whole number of cycles (e.g. 3 cycles) and multiply by the time-base setting to find the time; divide by the number of cycles to get T",
      "Calculate f = 1/T (converting the time-base unit to seconds)",
    ],
    modelAnswer: "Connect the p.d. to the Y-input and adjust the time-base until two or three complete cycles fill most of the screen width. Measure the number of horizontal divisions for, say, three cycles, multiply by the time-base setting (converted to seconds) and divide by three to get the period T. The frequency is f = 1/T. Measuring over several cycles reduces the percentage uncertainty in T.",
    explanation: "Use as many divisions as possible, convert units, then f = 1/T.",
    hints: ["Use several cycles to reduce the uncertainty."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "When measuring the diameter of a wire with a micrometer, explain why (i) the ratchet is used to close the jaws and (ii) the diameter is measured at several places along the wire.",
    points: [
      "(i) The ratchet slips at a fixed force, so the jaws grip the wire with the same small force each time (no squashing, consistent readings)",
      "(ii) The wire may not be uniform or perfectly circular, so a mean of readings at different places and orientations is more representative",
    ],
    modelAnswer: "(i) The ratchet slips once a set force is reached, so the jaws close with the same gentle pressure every time and do not squash the wire. (ii) The wire may vary in thickness along its length or be slightly oval, so averaging readings taken at several places and in different directions gives a more representative diameter.",
    explanation: "Consistent force and averaging over the wire's variations.",
    hints: ["Think about how hard the jaws press, and whether the wire is the same everywhere."],
  });

  // Practice structured 1: oscilloscope measurements.
  {
    const ygain = 0.5;
    const pp = 5.2;
    const peak = (pp * ygain) / 2;
    const T = (7.5 * 0.2e-3) / 3;
    const f = 1 / T;
    const pT = pctUnc(0.1, 7.5);
    chk(f, 2000, 1e-6);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true, examStyle: true,
      stem: t`A signal generator is connected to an oscilloscope with the y-gain at $0.50\ \text{V div}^{-1}$ and the time-base at $0.20\ \text{ms div}^{-1}$. The sinusoidal trace is $5.2$ divisions from trough to crest, and exactly $3$ complete cycles span $7.5$ horizontal divisions.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the peak p.d. of the signal, in V.", value: peak, unit: "V", wrong: [pp * ygain], explanation: t`Peak-to-peak $= 5.2 \times 0.50 = 2.6\ \text{V}$; peak $= 1.3\ \text{V}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the period of the signal, in ms.", value: T * 1000, unit: "ms", wrong: [7.5 * 0.2], explanation: t`Time for 3 cycles $= 7.5 \times 0.20 = 1.5\ \text{ms}$, so $T = 1.5/3 = 0.50\ \text{ms}$.` }),
        P.num({ label: "(c)", marks: 1, stem: "Calculate the frequency, in Hz.", value: f, unit: "Hz", wrong: [1 / (T * 1000)], explanation: t`$f = \dfrac{1}{0.50 \times 10^{-3}\ \text{s}} = 2000\ \text{Hz}$.` }),
        P.mcq({ label: "(d)", stem: t`The time-base is changed to $0.10\ \text{ms div}^{-1}$. How many horizontal divisions does one cycle now span?`, options: [["5.0", "Correct: 0.50 ms ÷ 0.10 ms per division."], ["2.5", "This uses the old setting: 0.50 ÷ 0.20."], ["1.25", "This halves instead of doubling the length of one cycle."], ["7.5", "This is the length of three cycles at the old setting."]], answer: "A", explanation: "One cycle lasts 0.50 ms; at 0.10 ms per division that is 5.0 divisions: halving the time per division doubles the length on the screen." }),
        P.num({ label: "(e)", marks: 1, stem: "The 7.5 divisions are read to ±0.1 division. Calculate the percentage uncertainty in the period, to two significant figures.", value: pT, sf: 2, unit: "%", explanation: t`$\dfrac{0.1}{7.5} \times 100 = ${sfStr(pT, 2)}\,\%$ (the same for the period as for the time of 3 cycles).` }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain why the time for three cycles was measured rather than the time for one cycle.", points: ["The reading uncertainty (±0.1 division) is the same however many divisions are measured", "Over three cycles (7.5 divisions instead of 2.5) the percentage uncertainty in T is three times smaller"], modelAnswer: "Reading the screen has an uncertainty of about ±0.1 division whatever the length measured. Measuring over three cycles (7.5 divisions) rather than one (2.5 divisions) makes this a smaller fraction of the reading, so the percentage uncertainty in the period is a third as large." }),
        P.manual({ label: "(g)", marks: 2, stem: "The time-base is switched off. Describe the trace that would be seen.", points: ["A vertical line (the spot moves up and down only, with no horizontal sweep)", "Its length equals the peak-to-peak p.d.: 5.2 divisions at the same y-gain"], modelAnswer: "With no horizontal sweep the spot only moves up and down, so the screen shows a vertical straight line. Its length is the peak-to-peak height, 5.2 divisions (2.6 V) at a y-gain of 0.50 V div⁻¹." }),
        P.num({ label: "(h)", marks: 2, stem: t`The y-gain is then changed to $0.20\ \text{V div}^{-1}$ with the time-base still off. Calculate the length of the line, in divisions.`, value: (pp * ygain) / 0.2, unit: "", wrong: [pp], explanation: t`Peak-to-peak p.d. $= 2.6\ \text{V}$; at $0.20\ \text{V div}^{-1}$ the line is $2.6/0.20 = 13$ divisions long (it would run off a 10-division screen, so the original setting was better).` }),
      ],
      explanation: t`Peak $1.3\ \text{V}$; $T = 0.50\ \text{ms}$, $f = 2000\ \text{Hz}$; measuring several cycles reduces the percentage uncertainty; with the time-base off the trace is a vertical line equal to the peak-to-peak value.`,
      hints: ["Divisions × y-gain gives volts; divisions × time-base gives time.", "f = 1/T, with T in seconds."],
    });
  }

  // Practice structured 2: light gates on a ramp.
  {
    const card = 0.04;
    const t1 = 0.08;
    const t2 = 0.032;
    const dt = 0.6;
    const v1 = card / t1;
    const v2 = card / t2;
    const a = (v2 - v1) / dt;
    chk(a, 1.25, 1e-9);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true, examStyle: true,
      stem: t`A trolley carrying a card of length $4.0\ \text{cm}$ rolls down a ramp through two light gates connected to a timer. The card blocks the first gate for $0.080\ \text{s}$ and the second for $0.032\ \text{s}$. The front of the card takes $0.60\ \text{s}$ to travel from the first gate to the second.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`Calculate the speed at the first gate, in $\text{m s}^{-1}$.`, value: v1, unit: "m/s", wrong: [4.0 / t1], explanation: t`$v_1 = 0.040/0.080 = 0.50\ \text{m s}^{-1}$.` }),
        P.num({ label: "(b)", marks: 1, stem: t`Calculate the speed at the second gate, in $\text{m s}^{-1}$.`, value: v2, unit: "m/s", explanation: t`$v_2 = 0.040/0.032 = 1.25\ \text{m s}^{-1}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Calculate the acceleration of the trolley, in $\text{m s}^{-2}$.`, value: a, unit: "m/s²", wrong: [v2 / dt, (v2 - v1) * dt], explanation: t`$a = \dfrac{v_2 - v_1}{\Delta t} = \dfrac{1.25 - 0.50}{0.60} = 1.25\ \text{m s}^{-2}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why light gates give a more reliable value than timing the trolley with a stop-watch.", points: ["The times (0.032 s to 0.6 s) are far shorter than or comparable with human reaction time (about 0.2 s)", "Light gates start and stop the timer automatically with a much smaller uncertainty (e.g. 0.001 s), so no reaction-time error"], modelAnswer: "The intervals are tiny (0.032 s) or comparable to reaction time (0.6 s compared with about 0.2 s), so hand timing would give very large percentage uncertainties. The light gates start and stop the timer electronically, to about a millisecond, with no reaction time." }),
        P.manual({ label: "(e)", marks: 2, stem: "The speeds calculated are average speeds while the card passes each gate. Explain whether this makes the calculated acceleration too large or too small, if the time between gates is measured between the moments the front of the card reaches each gate.", points: ["Each average speed is the speed at the middle of the card's passage, i.e. a short time after the front reaches the gate", "The time between these mid-points differs from 0.60 s by the difference of half the blocking times (0.040 − 0.016 = 0.024 s shorter), so using 0.60 s makes a slightly too small (about 4 %)"], modelAnswer: "For uniform acceleration each average speed equals the speed half-way through the blocking time: 0.040 s after the front arrives at gate 1 and 0.016 s after at gate 2. The true interval between these instants is 0.60 − 0.040 + 0.016 = 0.576 s, shorter than 0.60 s, so dividing by 0.60 s gives an acceleration about 4 % too small." }),
      ],
      explanation: t`$v_1 = 0.50\ \text{m s}^{-1}$, $v_2 = 1.25\ \text{m s}^{-1}$, $a = 1.25\ \text{m s}^{-2}$. Light gates remove reaction time; the average-speed effect makes this value slightly low.`,
      hints: ["v = card length ÷ blocking time.", "a = Δv ÷ Δt."],
    });
  }

  // Flashcards
  b.card("FACT", "Resolutions of common length instruments", "Metre rule 1 mm; vernier calipers 0.1 mm (digital 0.01 mm); micrometer screw gauge 0.01 mm.");
  b.card("CONCEPT", "Correcting a zero error", "True value = reading − zero error (a negative zero error is therefore added).");
  b.card("FORMULA", "Speed from a light gate", t`$v = \dfrac{\text{card length}}{\text{time the beam is blocked}}$`);
  b.card("FORMULA", "Acceleration from two light gates", t`$a = \dfrac{v_2 - v_1}{\Delta t}$, with $\Delta t$ the time between the gates.`);
  b.card("FORMULA", "CRO: p.d. and time", "p.d. = vertical divisions × y-gain; time = horizontal divisions × time-base.");
  b.card("CONCEPT", "Peak and peak-to-peak on a CRO", "The full trough-to-crest height is peak-to-peak; the amplitude (peak) is half of it.");
  b.card("CONCEPT", "CRO trace with the time-base off", "A vertical line whose length is the peak-to-peak p.d.");
  b.card("DEFINITION", "Calibration curve", "A graph of a sensor's reading against known values of a quantity, used to convert later readings.");
  b.card("CONCEPT", "Why use a data logger?", "Many readings per second, no reaction time, so rapid changes are recorded and plotted automatically.");
});
