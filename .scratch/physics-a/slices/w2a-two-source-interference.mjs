// W2a: aphys.superposition.two-source-interference — coherence, conditions, path/phase difference, demonstrations, λ = ax/D.
import { concept, P, t, chk, sfStr, dpStr, sciTex, pctUnc, fracUnc } from "../lib.mjs";

concept("aphys.superposition.two-source-interference", { file: "superposition/two-source-interference", keyPrefix: "superposition.two-source-interference" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by two sources being coherent?",
    options: [
      ["They emit waves with a constant phase difference.", "Correct: a fixed phase relationship (and hence the same frequency)."],
      ["They emit waves of the same amplitude.", "Equal amplitudes improve contrast but are not what coherence means."],
      ["They emit waves that are always in phase.", "Coherent sources may have any constant phase difference, not only zero."],
      ["They emit light of many wavelengths.", "Coherence needs a single frequency; white light from two lamps is not coherent."],
    ],
    answer: "A",
    explanation: "Coherent: constant phase difference between the waves from the two sources.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Two sources oscillate in phase and emit waves of wavelength λ. At which path difference is there destructive interference?",
    options: [
      [t`$2.5\lambda$`, "Correct: a half-odd number of wavelengths gives antiphase."],
      [t`$2\lambda$`, "A whole number of wavelengths gives constructive interference."],
      [t`$0$`, "Zero path difference means the waves arrive in phase: a maximum."],
      [t`$3\lambda$`, "A whole number of wavelengths: constructive."],
    ],
    answer: "A",
    explanation: "In-phase sources: destructive when the path difference is (n + ½)λ.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are two separate car headlamps unable to produce a visible interference pattern on a wall?",
    options: [
      ["Their phase difference changes randomly: they are not coherent.", "Correct: independent sources emit in random bursts."],
      ["Light from headlamps cannot diffract, so the beams never spread.", "Diffraction is not the issue; the sources lack a constant phase difference."],
      ["The headlamps are too far apart for the light to overlap.", "The beams do overlap on the wall; the pattern changes too fast to see."],
      ["Light waves cannot superpose unless they come from slits.", "Light superposes wherever it overlaps; a steady pattern needs coherence."],
    ],
    answer: "A",
    explanation: "Any fringes would shift millions of times a second as the phase difference changes randomly, so only uniform illumination is seen.",
  });
  {
    const a = 0.40e-3, D = 2.0, lam = 5.0e-7;
    const x = (lam * D) / a;
    chk(x, 2.5e-3, 1e-12);
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`In a double-slit experiment the slit separation is $0.40\ \text{mm}$, the screen is $2.0\ \text{m}$ away and the wavelength is $500\ \text{nm}$. What is the fringe separation?`,
      options: [
        ["2.5 mm", "Correct: x = λD/a = 5.0 × 10⁻⁷ × 2.0 / 4.0 × 10⁻⁴ m."],
        ["0.25 mm", "This converts 0.40 mm to 4.0 × 10⁻³ m, a factor of ten too large."],
        ["25 mm", "This converts 0.40 mm to 4.0 × 10⁻⁵ m, a factor of ten too small."],
        ["1.25 mm", "This halves the answer, as if D were 1.0 m."],
      ],
      answer: "A",
      explanation: t`$x = \dfrac{\lambda D}{a} = \dfrac{5.0 \times 10^{-7} \times 2.0}{4.0 \times 10^{-4}} = ${sciTex(x, 2)}\ \text{m} = 2.5\ \text{mm}$.`,
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In Young's experiment, which single change makes the bright fringes further apart?",
    options: [
      ["moving the screen further from the slits", "Correct: x = λD/a, so x increases with D."],
      ["moving the slits closer to the screen", "This decreases D and so decreases x."],
      ["using slits that are further apart", "x is inversely proportional to a."],
      ["changing from red light to blue light", "Blue light has a shorter wavelength, so the fringes get closer."],
    ],
    answer: "A",
    explanation: "x = λD/a: increase λ or D, or decrease a, to spread the fringes.",
    hints: ["Rearrange λ = ax/D for x."],
  });
  {
    const lam = 0.032, d1 = 0.540, d2 = 0.620;
    const n = (d2 - d1) / lam;
    chk(n, 2.5, 1e-9);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Two slits in a metal sheet act as in-phase sources of microwaves of wavelength $3.2\ \text{cm}$. A probe is $54.0\ \text{cm}$ from one slit and $62.0\ \text{cm}$ from the other. What does the probe detect?`,
      options: [
        ["a minimum, because the path difference is 2.5 wavelengths", "Correct: 8.0 cm ÷ 3.2 cm = 2.5, a half-integer."],
        ["a maximum, because the path difference is 2.5 wavelengths", "A half-integer number of wavelengths gives antiphase, so a minimum."],
        ["a maximum, because the path difference is 8.0 cm", "8.0 cm is not a whole number of wavelengths of 3.2 cm."],
        ["a minimum, because the path difference is a whole number of wavelengths", "8.0/3.2 = 2.5, which is not a whole number."],
      ],
      answer: "A",
      explanation: t`Path difference $= 62.0 - 54.0 = 8.0\ \text{cm} = ${n}\lambda$: the waves arrive in antiphase (phase difference $5\pi$), so destructive interference.`,
      hints: ["Divide the path difference by the wavelength."],
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Two loudspeakers are connected to the same signal generator but one is wired the opposite way round, so they oscillate in antiphase. What is heard at a point equidistant from both?",
    options: [
      ["a minimum", "Correct: zero path difference plus a π phase difference at the sources gives antiphase."],
      ["a maximum", "This would be true for in-phase sources."],
      ["a sound whose loudness rises and falls regularly", "The phase difference is constant, so the loudness at the point is steady."],
      ["a note at twice the frequency", "Superposition does not change the frequency."],
    ],
    answer: "A",
    explanation: "With antiphase sources the conditions swap: zero path difference gives destructive interference.",
    hints: ["Add the source phase difference to the phase difference from the paths."],
  });
  {
    const pd = 1.95e-6, lam = 6.5e-7;
    chk(pd / lam, 3, 1e-9);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`At a point on a double-slit screen the path difference is $1.95\ \mu\text{m}$ for light of wavelength $650\ \text{nm}$. What is the phase difference between the two waves there?`,
      options: [
        [t`$6\pi\ \text{rad}$`, "Correct: 1.95 µm = 3λ, and each wavelength is 2π."],
        [t`$3\pi\ \text{rad}$`, "This uses π per wavelength instead of 2π."],
        [t`$3\ \text{rad}$`, "This gives the number of wavelengths, not the phase in radians."],
        [t`$\pi\ \text{rad}$`, "A path difference of 3λ gives waves in phase, not in antiphase."],
      ],
      answer: "A",
      explanation: t`$\dfrac{1.95 \times 10^{-6}}{6.5 \times 10^{-7}} = 3$ wavelengths; phase difference $= 3 \times 2\pi = 6\pi\ \text{rad}$ (equivalent to 0): the third bright fringe from the centre.`,
      hints: ["How many wavelengths is the path difference?"],
    });
  }
  {
    const a = 0.25e-3, D = 1.50, span = 0.0352, n = 9;
    const lam = (a * (span / n)) / D;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Nyasha uses slits $0.25\ \text{mm}$ apart and a screen $1.50\ \text{m}$ away. She measures $35.2\ \text{mm}$ across ten bright fringes (from the first to the tenth). Calculate the wavelength, in nm, to three significant figures.`,
      value: lam * 1e9, unit: "nm", wrong: [((a * (span / 10)) / D) * 1e9, ((a * span) / D) * 1e9],
      explanation: t`Ten bright fringes have nine spacings: $x = 35.2/9 = ${sfStr((span / n) * 1000, 3)}\ \text{mm}$. $\lambda = \dfrac{ax}{D} = \dfrac{0.25 \times 10^{-3} \times ${sfStr(span / n, 4)}}{1.50} = ${sfStr(lam * 1e9, 3)}\ \text{nm}$. Dividing by 10 gives ${sfStr(((a * (span / 10)) / D) * 1e9, 3)} nm.`,
      hints: ["Ten bright fringes span nine fringe separations."],
    });
  }
  {
    const lam = 5.89e-7, a = 0.80e-3, D = 2.40;
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`Sodium light of wavelength $589\ \text{nm}$ passes through slits $0.80\ \text{mm}$ apart. The screen is $2.40\ \text{m}$ away. Calculate the fringe separation, in mm, to three significant figures.`,
      value: ((lam * D) / a) * 1000, unit: "mm", wrong: [((lam * a) / D) * 1000, ((lam * D) / 0.8) * 1000],
      explanation: t`$x = \dfrac{\lambda D}{a} = \dfrac{5.89 \times 10^{-7} \times 2.40}{0.80 \times 10^{-3}} = ${sciTex((lam * D) / a)}\ \text{m} = ${sfStr(((lam * D) / a) * 1000, 3)}\ \text{mm}$.`,
    });
  }
  {
    const f = 1.32e3, v = 330, a = 1.6, D = 6.4;
    const lam = v / f, x = (lam * D) / a;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Two loudspeakers $${a}\ \text{m}$ apart emit in phase at $${f / 1000}\ \text{kHz}$. Sound travels at $${v}\ \text{m s}^{-1}$. A line of listeners sits parallel to the loudspeakers, $${D}\ \text{m}$ away. Using $x = \lambda D/a$, calculate the distance between adjacent loud positions along the line, in m.`,
      value: x, unit: "m", wrong: [(lam * a) / D, x / 2],
      explanation: t`1. $\lambda = \dfrac{${v}}{${f}} = ${lam}\ \text{m}$.
2. $x = \dfrac{\lambda D}{a} = \dfrac{${lam} \times ${D}}{${a}} = ${x}\ \text{m}$.
3. The formula is approximate here because $D$ is only four times $a$, but it gives a good estimate.`,
      hints: ["Find λ from v = fλ first."],
    });
  }
  {
    const a = 0.50e-3, D = 1.20, x1 = 1.32e-3, x2 = 1.08e-3;
    const dl = (a * (x1 - x2)) / D;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Red and green lasers are used in turn with the same double slit ($a = 0.50\ \text{mm}$) and screen distance ($D = 1.20\ \text{m}$). The fringe separations are $1.32\ \text{mm}$ (red) and $1.08\ \text{mm}$ (green). Calculate the difference between the two wavelengths, in nm.`,
      value: dl * 1e9, unit: "nm", wrong: [((a * x1) / D) * 1e9],
      explanation: t`1. $\lambda_{\text{red}} = \dfrac{0.50 \times 10^{-3} \times 1.32 \times 10^{-3}}{1.20} = ${sfStr(((a * x1) / D) * 1e9, 3)}\ \text{nm}$.
2. $\lambda_{\text{green}} = \dfrac{0.50 \times 10^{-3} \times 1.08 \times 10^{-3}}{1.20} = ${sfStr(((a * x2) / D) * 1e9, 3)}\ \text{nm}$.
3. Difference $= ${sfStr(dl * 1e9, 3)}\ \text{nm}$ (or directly $a\Delta x/D$).`,
      hints: ["λ is proportional to x when a and D are fixed."],
    });
  }
  // Uncertainty
  {
    const a = 0.50, da = 0.02, x = 2.36, dx = 0.06, D = 1.500, dD = 0.005;
    const pct = 100 * fracUnc([[a, da], [x, dx], [D, dD]]);
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`In a double-slit experiment: $a = (0.50 \pm 0.02)\ \text{mm}$, $x = (2.36 \pm 0.06)\ \text{mm}$ and $D = (1.500 \pm 0.005)\ \text{m}$. Calculate the percentage uncertainty in $\lambda = ax/D$, to two significant figures.`,
      value: pct, sf: 2, unit: "%", wrong: [100 * fracUnc([[a, da], [x, dx]]), 100 * (da / a)],
      explanation: t`Percentage uncertainties add: $\dfrac{0.02}{0.50} + \dfrac{0.06}{2.36} + \dfrac{0.005}{1.500} = ${sfStr(100 * (da / a), 2)}\% + ${sfStr(100 * (dx / x), 2)}\% + ${sfStr(100 * (dD / D), 2)}\% = ${sfStr(pct, 2)}\%$. The slit separation dominates; measuring it with a travelling microscope would help most.`,
      hints: ["Add the three percentage uncertainties."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "At a dark fringe in Young's experiment, the energy of the light is destroyed.",
    answer: false,
    explanation: "False. Energy is redistributed: less arrives at dark fringes and more at bright fringes; the total is conserved.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Two light waves polarised in perpendicular planes cannot produce interference fringes with each other.",
    answer: true,
    explanation: "True. Perpendicular oscillations cannot cancel, so the waves must have the same polarisation (or both be unpolarised).",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Two in-phase sources emit waves of wavelength 4.0 cm. Match each path difference with the result.",
    pairs: [
      ["0 cm", "central maximum"],
      ["2.0 cm", "first minimum"],
      ["4.0 cm", "first maximum beside the centre"],
      ["6.0 cm", "second minimum"],
    ],
    explanation: "Whole wavelengths (0, 4.0, 8.0 cm) give maxima; half-odd wavelengths (2.0, 6.0 cm) give minima.",
    hints: ["Express each path difference in wavelengths."],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the equation for Young's double slit, λ = ax/D.",
    template: "In λ = ax/D, a is the {{blank:a}}, x is the {{blank:b}} and D is the distance from the {{blank:c}} to the screen.",
    blanks: [
      { id: "a", accepted: ["slit separation"], choices: ["slit separation", "slit width", "fringe separation"] },
      { id: "b", accepted: ["fringe separation"], choices: ["fringe separation", "slit separation", "screen width"] },
      { id: "c", accepted: ["slits"], choices: ["slits", "laser", "lens"] },
    ],
    explanation: "a: centre-to-centre slit separation; x: fringe separation; D: slits-to-screen distance.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State three conditions needed to observe a clear two-source interference pattern with light.",
    points: ["The sources must be coherent (constant phase difference / same frequency).", "The waves must have similar (equal) amplitudes.", "The waves must have the same polarisation (and must overlap, e.g. by diffraction)."],
    modelAnswer: "The two sources must be coherent, the waves must have similar amplitudes so that the minima are dark, and the waves must be polarised in the same plane.",
    explanation: "Coherence, similar amplitude, same polarisation (overlap).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how bright and dark fringes are formed on the screen in Young's double-slit experiment.",
    points: [
      "Light from one source passes through both slits, so the slits act as coherent sources.",
      "Light diffracts at each slit, so the two beams overlap on the screen.",
      "Where the path difference is a whole number of wavelengths the waves arrive in phase: constructive interference, a bright fringe.",
      "Where the path difference is a half-odd number of wavelengths they arrive in antiphase: destructive interference, a dark fringe.",
    ],
    modelAnswer: "Both slits are lit by the same wavefront, so they are coherent. Light diffracts at each slit and the two beams overlap on the screen and superpose. Where the path difference is nλ they arrive in phase and give a bright fringe; where it is (n + ½)λ they arrive in antiphase and give a dark fringe.",
    explanation: "Coherence, diffraction/overlap, then the two path-difference conditions.",
    hints: ["Why do the beams overlap? What decides bright or dark?"],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Describe how you would use a laser, a double slit and a metre rule to determine the wavelength of the laser light, including precautions for accuracy and safety.",
    points: [
      "Shine the laser through the double slit onto a screen about 2 m away; measure D with a metre rule (or tape).",
      "Measure the slit separation a with a travelling microscope (or use the value supplied).",
      "Measure across many (e.g. 10) fringe spacings with a ruler and divide to find x; λ = ax/D.",
      "Safety: never look into the beam or its reflections; keep it below eye level / use a low-power laser.",
    ],
    modelAnswer: "Place the double slit in the laser beam and a screen about 2 m away, measuring D with a tape. Find the slit separation a with a travelling microscope. Measure the distance across ten fringe spacings and divide by ten to find x, then λ = ax/D. Large D and many fringes reduce the percentage uncertainty. Never look into the beam and keep it below eye level.",
    explanation: "Arrangement, measuring a, x over many fringes, D, the formula, and laser safety.",
    hints: ["Which length is hardest to measure precisely?"],
  });
  // Practice structured: two loudspeakers (12 marks)
  {
    const f = 850, v = 340, S = 3.20, d1 = 4.00;
    const lam = v / f;
    const d2min = d1 + lam / 2;
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`Two loudspeakers A and B, connected to the same signal generator, emit sound of frequency $850\ \text{Hz}$ in phase. The speed of sound is $340\ \text{m s}^{-1}$. Thandeka walks along a line in front of them with a sound-level meter.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the wavelength of the sound, in m.", value: lam, unit: "m", wrong: [f / v], explanation: t`$\lambda = 340/850 = ${lam}\ \text{m}$.` }),
        P.manual({ label: "(b)", marks: 2, stem: "Explain why the two loudspeakers act as coherent sources.", points: ["They are driven by the same signal generator, so they emit the same frequency.", "So the phase difference between them is constant (zero here)."], modelAnswer: "Both are driven by the same signal generator, so they have the same frequency and a constant (zero) phase difference." }),
        P.num({ label: "(c)", marks: 2, stem: t`At point X she is $${d1.toFixed(2)}\ \text{m}$ from A. Calculate the smallest distance from B, greater than $${d1.toFixed(2)}\ \text{m}$, at which X would be a minimum, in m.`, value: d2min, unit: "m", wrong: [d1 + lam], explanation: t`Minimum: path difference $= \lambda/2 = ${lam / 2}\ \text{m}$, so $BX = ${d1.toFixed(2)} + ${lam / 2} = ${d2min}\ \text{m}$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`At point Y the distances from A and B are $${S.toFixed(2)}\ \text{m}$ and $${(S + 1.2).toFixed(2)}\ \text{m}$. Calculate the phase difference between the waves at Y, in units of π rad.`, value: ((1.2 / lam) * 2), wrong: [1.2 / lam], explanation: t`Path difference $= 1.20\ \text{m} = ${1.2 / lam}\lambda$; phase difference $= ${1.2 / lam} \times 2\pi = ${(1.2 / lam) * 2}\pi\ \text{rad}$, so Y is a maximum.` }),
        P.manual({ label: "(e)", marks: 2, stem: "The minima are not completely silent. Suggest two reasons.", points: ["The waves from the two loudspeakers have different amplitudes at the point (different distances), so they do not cancel completely.", "Sound reflects from walls, floor and ceiling and reaches the point by other paths (or background noise)."], modelAnswer: "The waves from A and B travel different distances so their amplitudes differ and cannot cancel exactly, and sound reflected from the walls and floor also reaches the point." }),
        P.manual({ label: "(f)", marks: 3, stem: "The frequency is increased. State and explain the effect on the pattern of loud and quiet positions.", points: ["The wavelength decreases (v unchanged).", "So the path difference changes by λ over a shorter distance along the line…", "…so the loud and quiet positions become closer together (x = λD/a decreases)."], modelAnswer: "A higher frequency gives a shorter wavelength at the same speed. The path difference changes by one wavelength over a shorter distance along the line, so the loud and quiet positions move closer together." }),
      ],
      explanation: "Maxima at path difference nλ, minima at (n + ½)λ for in-phase coherent sources.",
      hints: ["A minimum needs a path difference of λ/2 (the smallest one).", "Phase difference = (path difference/λ) × 2π."],
    });
  }
  // Practice structured: Young's slits data (8 marks)
  {
    const a = 0.30e-3, D = [1.00, 1.50, 2.00, 2.50];
    const lam = 6.33e-7;
    const xs = D.map((d) => Number(((lam * d) / a * 1000).toFixed(2)));
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Rudo shines a helium-neon laser through two slits $0.30\ \text{mm}$ apart and measures the fringe separation $x$ for several slit-screen distances $D$: ${D.map((d, i) => `D = ${d.toFixed(2)} m, x = ${xs[i].toFixed(2)} mm`).join("; ")}.`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Describe the graph you would plot to find λ, and what its gradient represents.", points: ["Plot x (y-axis) against D (x-axis): a straight line through the origin.", "Gradient = λ/a, so λ = gradient × a."], modelAnswer: "Plot x against D; the points lie on a straight line through the origin whose gradient is λ/a, so λ = a × gradient." }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate the gradient of $x$ against $D$ using the first and last readings, in $\text{mm m}^{-1}$, to three significant figures.`, value: (xs[3] - xs[0]) / (D[3] - D[0]), wrong: [xs[3] / D[0]], explanation: t`Gradient $= \dfrac{${xs[3].toFixed(2)} - ${xs[0].toFixed(2)}}{2.50 - 1.00} = ${sfStr((xs[3] - xs[0]) / (D[3] - D[0]), 3)}\ \text{mm m}^{-1}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate λ, in nm, to three significant figures.", value: ((xs[3] - xs[0]) / (D[3] - D[0])) * 1e-3 * a * 1e9, unit: "nm", wrong: [((xs[3] - xs[0]) / (D[3] - D[0])) * a * 1e9], explanation: t`$\lambda = a \times \text{gradient} = 0.30 \times 10^{-3} \times ${sfStr((xs[3] - xs[0]) / (D[3] - D[0]), 3)} \times 10^{-3} = ${sfStr(((xs[3] - xs[0]) / (D[3] - D[0])) * 1e-3 * a * 1e9, 3)}\ \text{nm}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why a graph is better than calculating λ from one reading.", points: ["It uses all the readings, so random errors are averaged out.", "A systematic error in D (e.g. a zero error) shows up as an intercept and does not affect the gradient."], modelAnswer: "A graph uses every reading so random errors average out, and a systematic error in D, such as measuring from the wrong point, appears as an intercept rather than changing the gradient." }),
      ],
      explanation: "x = (λ/a)D: gradient of x against D is λ/a.",
      hints: ["Rearrange λ = ax/D into the form y = mx."],
    });
  }

  b.card("DEFINITION", "**Coherent sources**", "Sources with a constant phase difference (same frequency).");
  b.card("DEFINITION", "**Interference**", "Superposition of waves from coherent sources, giving maxima and minima that depend on phase difference.");
  b.card("DEFINITION", "**Path difference**", "Difference in the distances travelled by two waves from their sources to a point.");
  b.card("FACT", "Conditions for maxima/minima (in-phase sources)", "Maximum: path difference nλ. Minimum: (n + ½)λ.");
  b.card("FORMULA", "Young's double slit", t`$\lambda = \dfrac{ax}{D}$; $a$ slit separation, $x$ fringe separation, $D$ slits to screen`);
  b.card("FACT", "Conditions for observable fringes", "Coherent, similar amplitudes, same polarisation, overlapping (diffraction).");
  b.card("CONCEPT", "Measuring x", "Measure across many fringe spacings and divide; n bright fringes span n − 1 spacings.");
  b.card("FORMULA", "Phase difference from path difference", t`$\phi = \dfrac{\Delta}{\lambda} \times 2\pi$`);
});
