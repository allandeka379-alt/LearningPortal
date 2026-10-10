// W2a: aphys.waves.progressive-waves — wave terms, phase difference, CRO, v = fλ, intensity ∝ amplitude², inverse square.
import { concept, P, t, chk, sfStr, dpStr, sciTex, sciPlain, pctUnc, table } from "../lib.mjs";

concept("aphys.waves.progressive-waves", { file: "waves/progressive-waves", keyPrefix: "waves.progressive-waves" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement describes what a progressive wave transfers?",
    options: [
      ["Energy, without any net movement of the medium", "Correct: particles oscillate about fixed positions while energy moves on."],
      ["Matter, from the source to the receiver", "The particles of the medium return to where they started; no matter is carried along."],
      ["Both energy and matter, in equal amounts", "Only energy is transferred; the medium has no net displacement."],
      ["Neither energy nor matter, only a change of shape", "The wave does carry energy: a sound wave can make a distant eardrum vibrate."],
    ],
    answer: "A",
    explanation: "A progressive wave transfers energy (and information) through a medium; each particle only oscillates about its equilibrium position.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which is the best definition of the wavelength of a progressive wave?",
    options: [
      ["The distance between two adjacent points oscillating in phase", "Correct: adjacent in-phase points are one wavelength apart."],
      ["The distance between a crest and the next trough", "Crest to adjacent trough is half a wavelength."],
      ["The distance moved by the wave in one second", "That is the wave speed, in metres per second."],
      ["The distance from a crest down to the equilibrium line", "That is the amplitude, a displacement, not a wavelength."],
    ],
    answer: "A",
    explanation: "Wavelength is the shortest distance between two points that are in phase, for example crest to crest.",
  });
  {
    const lam = 1.20, dx = 0.45;
    const phi = (dx / lam) * 360;
    chk(phi, 135);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A progressive wave has wavelength $1.20\ \text{m}$. What is the phase difference between two points on the wave $0.45\ \text{m}$ apart along the direction of travel?`,
      options: [
        [t`$\dfrac{3\pi}{4}\ \text{rad}$`, "Correct: 0.45/1.20 = 0.375 of a cycle, and 0.375 × 2π = 3π/4."],
        [t`$\dfrac{3\pi}{8}\ \text{rad}$`, "This uses π rather than 2π for one whole cycle."],
        [t`$\dfrac{8\pi}{3}\ \text{rad}$`, "This inverts the fraction, using λ/Δx instead of Δx/λ."],
        [t`$\dfrac{\pi}{4}\ \text{rad}$`, "0.45 m is more than a third of a wavelength, so the phase difference is larger than π/4."],
      ],
      answer: "A",
      explanation: t`$\phi = \dfrac{\Delta x}{\lambda} \times 2\pi = \dfrac{0.45}{1.20} \times 2\pi = 0.375 \times 2\pi = \dfrac{3\pi}{4}\ \text{rad}$ ($${phi}^\circ$).`,
      hints: ["What fraction of a wavelength separates the points?"],
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "The amplitude of a wave is doubled while its frequency stays the same. By what factor does its intensity change?",
    options: [
      ["4", "Correct: intensity is proportional to amplitude squared, and 2² = 4."],
      ["2", "This assumes intensity is proportional to amplitude, not amplitude squared."],
      [t`$\sqrt{2}$`, "This is the factor for the amplitude when the intensity doubles, the reverse relationship."],
      ["8", "Intensity depends on the square, not the cube, of the amplitude."],
    ],
    answer: "A",
    explanation: t`$I \propto A^2$, so $I_2/I_1 = (2A/A)^2 = 4$.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which pair gives the SI base units of intensity?",
    options: [
      [t`$\text{kg s}^{-3}$`, "Correct: W m⁻² = (kg m² s⁻³) ÷ m² = kg s⁻³."],
      [t`$\text{kg m}^2\,\text{s}^{-3}$`, "This is the watt; intensity is power per unit area."],
      [t`$\text{kg m}^{-1}\,\text{s}^{-2}$`, "This is the pascal, the unit of pressure."],
      [t`$\text{kg m}^{4}\,\text{s}^{-3}$`, "This multiplies the watt by area instead of dividing."],
    ],
    answer: "A",
    explanation: t`$1\ \text{W} = 1\ \text{J s}^{-1} = 1\ \text{kg m}^2\,\text{s}^{-3}$; dividing by $\text{m}^2$ gives $\text{kg s}^{-3}$.`,
  });
  {
    const tb = 2.0e-3, div = 2.5;
    const f = 1 / (tb * div);
    chk(f, 200);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A CRO displays a sine wave. One complete cycle occupies $2.5$ horizontal divisions and the time-base is set at $2.0\ \text{ms div}^{-1}$. What is the frequency of the signal?`,
      options: [
        ["200 Hz", "Correct: T = 2.5 × 2.0 ms = 5.0 ms, so f = 1/0.0050 s = 200 Hz."],
        ["400 Hz", "This uses half a cycle as the period (or halves the time-base)."],
        ["0.20 Hz", "This forgets that the time-base is in milliseconds."],
        ["800 Hz", "This divides 2.0 ms by 2.5 instead of multiplying to find the period."],
      ],
      answer: "A",
      explanation: t`$T = 2.5 \times 2.0\ \text{ms} = 5.0 \times 10^{-3}\ \text{s}$; $f = 1/T = ${f}\ \text{Hz}$.`,
      hints: ["Find the period first: divisions × time per division."],
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A graph has displacement on the y-axis and time on the x-axis. It shows a sine curve that repeats every 0.40 units on the x-axis. Which quantity can be read directly from the repeat length?",
    options: [
      ["the period of the oscillation", "Correct: on a displacement-time graph the repeat interval is the period."],
      ["the wavelength of the wave", "Wavelength is the repeat length on a displacement-distance graph."],
      ["the speed of the wave", "Speed needs both the wavelength and the frequency; one graph against time gives only the period."],
      ["the phase difference between two particles", "Phase difference compares two oscillations; one curve against time gives the period."],
    ],
    answer: "A",
    explanation: "Displacement-time follows one particle: repeat time = period T. Displacement-distance is a snapshot: repeat distance = wavelength.",
    hints: ["Check the label on the x-axis."],
  });
  {
    const I1 = 1.0, r1 = 2.0, r2 = 6.0;
    const I2 = I1 * (r1 / r2) ** 2;
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`The intensity of sound from a small source is $I$ at a distance of $2.0\ \text{m}$. Assuming the sound spreads equally in all directions with no absorption, what is the intensity at $6.0\ \text{m}$?`,
      options: [
        [t`$I/9$`, "Correct: intensity ∝ 1/r², and (2.0/6.0)² = 1/9."],
        [t`$I/3$`, "This assumes intensity ∝ 1/r rather than 1/r²."],
        [t`$I/4$`, "This uses the 4 m increase in distance rather than the ratio of the distances."],
        [t`$I/36$`, "This squares 6.0 but forgets to divide by the square of 2.0."],
      ],
      answer: "A",
      explanation: t`$I = P/4\pi r^2$, so $I_2 = I \times (2.0/6.0)^2 = I/${1 / I2}$.`,
      hints: ["The power spreads over a sphere of area 4πr²."],
    });
  }
  {
    const f = 256, lam = 1.34;
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: t`A tuning fork of frequency $${f}\ \text{Hz}$ produces sound of wavelength $${lam}\ \text{m}$ in air. Calculate the speed of sound, in $\text{m s}^{-1}$, to three significant figures.`,
      value: f * lam, unit: "m/s", wrong: [f / lam],
      explanation: t`$v = f\lambda = ${f} \times ${lam} = ${sfStr(f * lam, 3)}\ \text{m s}^{-1}$. Dividing f by λ gives the wrong unit (Hz m⁻¹).`,
    });
  }
  {
    const v = 1.5e3, f = 4.0e4;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`A fishing boat on Lake Kariba uses a sonar pulse of frequency $40\ \text{kHz}$. The speed of sound in the water is $1.5 \times 10^{3}\ \text{m s}^{-1}$. Calculate the wavelength of the sound in the water, in mm.`,
      value: (v / f) * 1000, unit: "mm", wrong: [(v / 40) * 1000, (v / f)],
      explanation: t`$\lambda = v/f = \dfrac{1.5 \times 10^{3}}{4.0 \times 10^{4}} = 0.0375\ \text{m} = ${(v / f) * 1000}\ \text{mm}$. Forgetting to convert kHz to Hz gives 37.5 m.`,
    });
  }
  {
    const tb = 50e-6, cycles = 3, divs = 7.2;
    const f = cycles / (divs * tb);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Three complete cycles of a signal occupy $7.2$ horizontal divisions on a CRO screen. The time-base is set at $50\ \mu\text{s div}^{-1}$. Calculate the frequency of the signal, in Hz, to three significant figures.`,
      value: f, unit: "Hz", wrong: [1 / (divs * tb), 1 / ((divs / cycles) * 50e-3)],
      explanation: t`1. Time for three cycles $= 7.2 \times 50\ \mu\text{s} = 360\ \mu\text{s}$.
2. Period $T = 360/3 = 120\ \mu\text{s} = 1.20 \times 10^{-4}\ \text{s}$.
3. $f = 1/T = ${sfStr(f, 3)}\ \text{Hz}$. Using all 7.2 divisions as one period gives a frequency three times too small.`,
      hints: ["How long do three cycles take?", "Divide by three to get one period."],
    });
  }
  {
    const P0 = 60, r = 3.5;
    const I = P0 / (4 * Math.PI * r * r);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A lamp radiates light of total power $${P0}\ \text{W}$ uniformly in all directions. Calculate the intensity at a distance of $${r}\ \text{m}$ from the lamp, in $\text{W m}^{-2}$, to three significant figures.`,
      value: I, unit: "W/m²", wrong: [P0 / (Math.PI * r * r), P0 / (4 * Math.PI * r)],
      explanation: t`1. The power spreads over a sphere of area $4\pi r^2 = 4\pi \times ${r}^2 = ${sfStr(4 * Math.PI * r * r, 3)}\ \text{m}^2$.
2. $I = P/A = ${P0}/${sfStr(4 * Math.PI * r * r, 4)} = ${sfStr(I, 3)}\ \text{W m}^{-2}$.
3. Using $\pi r^2$ (the area of a circle) gives four times this value.`,
      hints: ["Area of a sphere = 4πr²."],
    });
  }
  // Uncertainty: CRO measurement
  {
    const divs = 8.4, unc = 0.2;
    b.num({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: t`A student measures the length of four complete cycles on a CRO screen as $${divs}$ divisions, with an uncertainty of $\pm ${unc}$ division in the length. Calculate the percentage uncertainty in the frequency found from this measurement, to two significant figures.`,
      value: pctUnc(unc, divs), sf: 2, unit: "%", wrong: [pctUnc(unc, divs / 4)],
      explanation: t`$f = n/(\text{length} \times \text{time-base})$, so the percentage uncertainty in $f$ equals that in the length: $\dfrac{${unc}}{${divs}} \times 100 = ${sfStr(pctUnc(unc, divs), 2)}\%$. Measuring over four cycles makes this four times smaller than for one cycle of the same reading uncertainty.`,
      hints: ["A reciprocal has the same percentage uncertainty as the quantity itself."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "When a sound wave passes from air into water, its frequency stays the same but its wavelength increases.",
    answer: true,
    explanation: "True. The source fixes the frequency. Sound travels faster in water, so λ = v/f increases.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each wave quantity with its SI unit.",
    pairs: [
      ["frequency", "Hz"],
      ["wavelength", "m"],
      ["intensity", "W m⁻²"],
      ["phase difference", "rad"],
      ["period", "s"],
    ],
    explanation: "Frequency in hertz (s⁻¹), wavelength in metres, intensity in watts per square metre, phase difference in radians (or degrees), period in seconds.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct terms.",
    template: "On a CRO, the time per horizontal division is set by the {{blank:a}} and the voltage per vertical division by the {{blank:b}}. The amplitude of a trace is {{blank:c}} the peak-to-peak height.",
    blanks: [
      { id: "a", accepted: ["time-base"], choices: ["time-base", "y-gain", "focus"] },
      { id: "b", accepted: ["y-gain"], choices: ["y-gain", "time-base", "brightness"] },
      { id: "c", accepted: ["half"], choices: ["half", "equal to", "twice"] },
    ],
    explanation: "Time-base → period → frequency; y-gain → voltage; amplitude = ½ × peak-to-peak.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "What name is given to the power per unit area carried by a wave, measured perpendicular to its direction of travel?",
    accepted: ["intensity", "the intensity", "wave intensity"],
    wrong: ["amplitude"],
    explanation: "**Intensity** = power ÷ area, in W m⁻².",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "Define frequency and phase difference for a wave.",
    points: ["Frequency: the number of complete oscillations (of a point on the wave) per unit time.", "Phase difference: the fraction of a cycle by which one oscillation leads or lags another, expressed as an angle (in degrees or radians)."],
    modelAnswer: "Frequency is the number of complete oscillations per unit time. Phase difference is the fraction of a cycle between two oscillations, expressed as an angle in degrees or radians.",
    explanation: "Use 'per unit time' and name phase difference as an angle.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: t`Derive the equation $v = f\lambda$ for a progressive wave.`,
    points: ["In one period T the wave (source) completes one oscillation, so the disturbance travels one wavelength λ.", t`Speed = distance ÷ time $= \lambda / T$.`, t`Frequency $f = 1/T$, so $v = f\lambda$.`],
    modelAnswer: "In a time of one period T, the source completes one oscillation and the wave advances by one wavelength λ. So v = distance/time = λ/T. Since f = 1/T, v = fλ.",
    explanation: "Each step must be stated: the distance in one period, the speed equation and f = 1/T.",
    hints: ["How far does the wave travel in one period?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the intensity of sound from a small source falls as you move away from it, and why the intensity of a narrow laser beam falls much less over the same distance.",
    points: [
      "The power from the small source spreads over a spherical surface of area 4πr², which increases with distance.",
      "So the power per unit area falls (as 1/r², the inverse-square law, if there is no absorption).",
      "A laser beam hardly spreads: the power stays in nearly the same cross-sectional area, so the intensity falls only by absorption/scattering.",
    ],
    modelAnswer: "Sound from a small source spreads out in all directions, so the same power passes through a sphere of area 4πr² that grows with distance; the intensity falls as 1/r². A laser beam is nearly parallel, so its power stays within almost the same area and its intensity changes only because of absorption and scattering.",
    explanation: "Intensity = power ÷ area: what matters is how the area changes.",
    hints: ["Think about the area the power passes through."],
  });
  // Practice structured: CRO and sound
  {
    const tb = 0.20e-3, divCyc = 5.0, cycles = 2, yg = 0.50, pp = 6.4, v = 330;
    const T = (divCyc / cycles) * tb, f = 1 / T, A = (pp / 2) * yg, lam = v / f;
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Nyasha connects a microphone to a CRO and holds it in front of a loudspeaker. Two complete cycles of the trace occupy $5.0$ horizontal divisions; the time-base is $0.20\ \text{ms div}^{-1}$. The peak-to-peak height is $6.4$ divisions with the y-gain at $0.50\ \text{V div}^{-1}$. The speed of sound is $${v}\ \text{m s}^{-1}$.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the period of the sound, in ms.", value: T * 1000, unit: "ms", wrong: [divCyc * 0.2], explanation: t`$T = \dfrac{5.0}{2} \times 0.20\ \text{ms} = ${T * 1000}\ \text{ms}$.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the frequency, in Hz.", value: f, unit: "Hz", wrong: [1 / (divCyc * tb)], explanation: t`$f = 1/(${T * 1000} \times 10^{-3}) = ${f}\ \text{Hz}$.` }),
        P.num({ label: "(c)", marks: 1, stem: "Calculate the amplitude of the voltage signal, in V.", value: A, unit: "V", wrong: [pp * yg], explanation: t`Peak-to-peak $= 6.4 \times 0.50 = 3.2\ \text{V}$; the amplitude is half of this, $${A}\ \text{V}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the wavelength of the sound, in m, to three significant figures.", value: lam, unit: "m", wrong: [v * f], explanation: t`$\lambda = v/f = ${v}/${f} = ${sfStr(lam, 3)}\ \text{m}$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "The loudspeaker's volume is turned up so that the amplitude of the trace doubles at the same frequency. State what happens to the trace's horizontal spacing and to the intensity of the sound.", points: ["The horizontal spacing (period) is unchanged because the frequency is unchanged.", "The intensity increases by a factor of four (intensity ∝ amplitude²)."], modelAnswer: "The cycles stay the same width because the frequency has not changed, but the intensity of the sound becomes four times larger because intensity is proportional to amplitude squared." }),
      ],
      explanation: "Period from divisions × time-base, f = 1/T, amplitude = half peak-to-peak × y-gain, λ = v/f.",
      hints: ["Two cycles span 5.0 divisions.", "Amplitude is half the peak-to-peak height."],
    });
  }
  // Practice structured: intensity from a siren (12 marks)
  {
    const Pw = 2.4, r1 = 8.0, r2 = 24.0, Ithr = 1.0e-5;
    const I1 = Pw / (4 * Math.PI * r1 * r1), I2 = Pw / (4 * Math.PI * r2 * r2);
    const rmax = Math.sqrt(Pw / (4 * Math.PI * Ithr));
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A school fire siren emits sound of power $${Pw}\ \text{W}$. Treat it as a point source radiating equally in all directions, with no absorption by the air or reflection from the ground.`,
      parts: [
        P.manual({ label: "(a)", marks: 1, stem: "Define intensity.", points: ["Power per unit area, the area being perpendicular to the direction of travel of the wave."], modelAnswer: "Intensity is the power transmitted per unit area perpendicular to the direction of propagation." }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate the intensity at $${r1}\ \text{m}$ from the siren, in $\text{W m}^{-2}$, to three significant figures.`, value: I1, unit: "W/m²", wrong: [Pw / (Math.PI * r1 * r1)], explanation: t`$I = \dfrac{${Pw}}{4\pi \times ${r1}^2} = ${sciTex(I1)}\ \text{W m}^{-2}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Calculate the intensity at $${r2}\ \text{m}$, in $\text{W m}^{-2}$, to three significant figures.`, value: I2, unit: "W/m²", wrong: [I1 / 3], explanation: t`Three times further away, so one ninth: $${sciTex(I2)}\ \text{W m}^{-2}$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`Calculate the ratio of the amplitude of the sound at $${r1}\ \text{m}$ to the amplitude at $${r2}\ \text{m}$.`, value: r2 / r1, wrong: [(r2 / r1) ** 2], explanation: t`$A \propto \sqrt{I}$ and $I \propto 1/r^2$, so $A \propto 1/r$: ratio $= ${r2}/${r1} = ${r2 / r1}$.` }),
        P.num({ label: "(e)", marks: 3, stem: t`The siren can just be heard where its intensity is $1.0 \times 10^{-5}\ \text{W m}^{-2}$ above the background noise. Calculate the greatest distance at which it can be heard, in m, to three significant figures.`, value: rmax, unit: "m", wrong: [Pw / (4 * Math.PI * Ithr)], explanation: t`$r = \sqrt{\dfrac{P}{4\pi I}} = \sqrt{\dfrac{${Pw}}{4\pi \times 1.0 \times 10^{-5}}} = ${sfStr(rmax, 3)}\ \text{m}$.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Suggest two reasons why the real range of the siren differs from your answer to (e).", points: ["The air absorbs some of the sound energy (especially at high frequency), so the range is less.", "Sound reflects from the ground and buildings (or the siren is directional / not a point source), so the intensity is not spread uniformly over a sphere."], modelAnswer: "Air absorbs some sound energy, reducing the range; and reflections from the ground and buildings, or a siren that is directional rather than a point source, mean the power is not spread evenly over a sphere." }),
      ],
      explanation: "I = P/4πr²; amplitude ∝ √I ∝ 1/r for a point source.",
      hints: ["The power spreads over a sphere.", "Rearrange I = P/4πr² for r."],
    });
  }

  b.card("DEFINITION", "**Progressive wave**", "A wave that transfers energy from a source through a medium (or space) without net transfer of the medium.");
  b.card("DEFINITION", "**Wavelength**", "Distance between two adjacent points on a wave that oscillate in phase.");
  b.card("DEFINITION", "**Amplitude**", "Maximum displacement of a point on the wave from its equilibrium position.");
  b.card("DEFINITION", "**Phase difference**", "The fraction of a cycle between two oscillations, as an angle: 360° or 2π rad per cycle.");
  b.card("FORMULA", "Wave equation", t`$v = f\lambda$ (one wavelength travelled in one period, $f = 1/T$)`);
  b.card("FORMULA", "Intensity", t`$I = P/A$ in $\text{W m}^{-2}$; point source $I = P/4\pi r^2$`);
  b.card("FACT", "Intensity and amplitude", t`$I \propto A^2$: double the amplitude, four times the intensity.`);
  b.card("CONCEPT", "Displacement-distance vs displacement-time graph", "Distance graph (snapshot): repeat length = wavelength. Time graph (one particle): repeat time = period.");
  b.card("FORMULA", "Phase difference from path separation", t`$\phi = \dfrac{\Delta x}{\lambda} \times 2\pi\ \text{rad}$`);
});
