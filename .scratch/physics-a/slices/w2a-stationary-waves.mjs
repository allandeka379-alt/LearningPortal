// W2a: aphys.superposition.stationary-waves — superposition, formation, nodes/antinodes, strings, pipes, microwaves, harmonics.
import { concept, P, t, chk, DATA, sfStr, dpStr, sciTex, pctUnc, mean, halfRange } from "../lib.mjs";

concept("aphys.superposition.stationary-waves", { file: "superposition/stationary-waves", keyPrefix: "superposition.stationary-waves" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the distance between two adjacent nodes of a stationary wave of wavelength λ?",
    options: [
      [t`$\lambda/2$`, "Correct: adjacent nodes are half a wavelength apart."],
      [t`$\lambda$`, "A full wavelength spans two loops, from one node to the next-but-one."],
      [t`$\lambda/4$`, "This is the distance from a node to the next antinode."],
      [t`$2\lambda$`, "This is four node spacings."],
    ],
    answer: "A",
    explanation: "Node to node = λ/2; node to antinode = λ/4.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which condition is needed for a stationary wave to form?",
    options: [
      ["Two waves of the same frequency travel in opposite directions and superpose.", "Correct: typically an incident wave and its reflection."],
      ["Two waves of different frequencies travel in the same direction.", "Different frequencies give beats, not a fixed pattern of nodes."],
      ["One wave is absorbed completely at a boundary.", "Absorption removes the reflected wave needed to form the pattern."],
      ["Two waves of the same frequency travel in the same direction.", "Waves moving together simply add to a single progressive wave."],
    ],
    answer: "A",
    explanation: "Stationary waves need two progressive waves of equal frequency (and speed) moving in opposite directions.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Two points on a stationary wave on a string lie between the same pair of adjacent nodes. What is the phase difference between their oscillations?",
    options: [
      ["0", "Correct: all points between adjacent nodes move in phase."],
      [t`$\pi/2$ rad`, "Stationary-wave points are either in phase or in antiphase; there is no quarter-cycle lag."],
      [t`$\pi$ rad`, "Antiphase applies to points on opposite sides of a node."],
      ["It depends on their separation.", "That is true of a progressive wave, not a stationary one."],
    ],
    answer: "A",
    explanation: "Within one loop every point reaches its maximum displacement at the same instant: phase difference zero.",
  });
  {
    const L = 0.60, v = 330;
    const f1 = v / (4 * L);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A pipe of length $0.60\ \text{m}$ is closed at one end. The speed of sound is $330\ \text{m s}^{-1}$. Ignoring end corrections, what is the frequency of the lowest note it can produce?`,
      options: [
        [`${sfStr(f1, 3)} Hz`, "Correct: L = λ/4, so λ = 2.40 m and f = 330/2.40."],
        [`${sfStr(v / (2 * L), 3)} Hz`, "This treats the pipe as open at both ends (L = λ/2)."],
        [`${sfStr(v / L, 3)} Hz`, "This takes the wavelength as the pipe length."],
        [`${sfStr((3 * v) / (4 * L), 3)} Hz`, "This is the next resonance, the third harmonic."],
      ],
      answer: "A",
      explanation: t`Closed pipe fundamental: node at the closed end, antinode at the open end, $L = \lambda/4$. $f = \dfrac{v}{4L} = \dfrac{330}{2.40} = ${sfStr(f1, 3)}\ \text{Hz}$.`,
      hints: ["What fraction of a wavelength fits in a closed pipe at its fundamental?"],
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "A pipe closed at one end has a fundamental frequency of 180 Hz. Which frequency could NOT be produced by this pipe?",
    options: [
      ["360 Hz", "Correct: 360 Hz = 2f₁, an even harmonic, which a closed pipe cannot sustain."],
      ["540 Hz", "540 Hz = 3f₁, an allowed odd harmonic."],
      ["900 Hz", "900 Hz = 5f₁, an allowed odd harmonic."],
      ["1260 Hz", "1260 Hz = 7f₁, an allowed odd harmonic."],
    ],
    answer: "A",
    explanation: "A closed pipe needs a node at the closed end and an antinode at the open end, so L = λ/4, 3λ/4, 5λ/4…: only odd multiples of f₁.",
    hints: ["Which harmonics fit a node at one end and an antinode at the other?"],
  });
  {
    const v = 96, f = 240;
    const lam = v / f, L = 1.2;
    const loops = L / (lam / 2);
    chk(loops, 6, 1e-9);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A string of length $1.20\ \text{m}$ is fixed at both ends. Waves travel along it at $96\ \text{m s}^{-1}$. It is vibrated at $240\ \text{Hz}$ and forms a stationary wave. How many nodes are there, including the two ends?`,
      options: [
        ["7", "Correct: λ = 0.40 m, so there are 1.20/0.20 = 6 loops, and 6 loops have 7 nodes."],
        ["6", "Six is the number of loops; there is one more node than loops."],
        ["3", "This uses λ = 0.40 m as the node spacing (1.20/0.40)."],
        ["4", "This counts nodes as if the spacing were a whole wavelength (three wavelengths, plus one)."],
      ],
      answer: "A",
      explanation: t`$\lambda = v/f = ${lam}\ \text{m}$; node spacing $= ${lam / 2}\ \text{m}$; loops $= 1.20/${lam / 2} = 6$; nodes $= 6 + 1 = 7$.`,
      hints: ["Find the node spacing, then the number of loops."],
    });
  }
  {
    const span = 0.124, gaps = 4; // microwave probe
    const lam = (2 * span) / gaps;
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A probe is moved along a microwave stationary wave. It passes through five successive minima, the first and last being $12.4\ \text{cm}$ apart. What is the wavelength of the microwaves?`,
      options: [
        [`${dpStr(lam * 100, 1)} cm`, "Correct: five minima span four node gaps of 3.1 cm; λ = 2 × 3.1 cm."],
        [`${dpStr((span / 5) * 2 * 100, 2)} cm`, "This divides by five minima instead of four gaps."],
        [`${dpStr((span / gaps) * 100, 1)} cm`, "This is the node spacing, which is half a wavelength."],
        [`${dpStr((span / gaps) * 4 * 100, 1)} cm`, "This uses the node spacing as a quarter wavelength."],
      ],
      answer: "A",
      explanation: t`Gaps $= 5 - 1 = 4$; node spacing $= 12.4/4 = 3.1\ \text{cm}$; $\lambda = 6.2\ \text{cm}$.`,
      hints: ["How many gaps lie between five minima?"],
    });
  }
  {
    const L = 0.65, f1 = 196;
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`A guitar string $0.65\ \text{m}$ long vibrates at its fundamental frequency of $196\ \text{Hz}$. Calculate the speed of the waves on the string, in $\text{m s}^{-1}$, to three significant figures.`,
      value: 2 * L * f1, unit: "m/s", wrong: [L * f1],
      explanation: t`Fundamental: $\lambda = 2L = 1.30\ \text{m}$; $v = f\lambda = 196 \times 1.30 = ${sfStr(2 * L * f1, 3)}\ \text{m s}^{-1}$. Taking $\lambda = L$ halves the answer.`,
    });
  }
  {
    const L = 0.85, v = 340;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A pipe of length $0.85\ \text{m}$ is open at both ends. The speed of sound is $340\ \text{m s}^{-1}$. Calculate the frequency of its third harmonic, in Hz. Ignore end corrections.`,
      value: (3 * v) / (2 * L), unit: "Hz", wrong: [(3 * v) / (4 * L), v / (2 * L)],
      explanation: t`Open pipe: $f_n = \dfrac{nv}{2L}$; $f_3 = \dfrac{3 \times 340}{1.70} = ${(3 * v) / (2 * L)}\ \text{Hz}$.`,
      hints: ["An open pipe has antinodes at both ends."],
    });
  }
  {
    const f = 512, l1 = 0.162, v = 4 * l1 * f;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A tuning fork of frequency $512\ \text{Hz}$ is held over a tube closed at the bottom by water. The water level is lowered and the first loud resonance is heard when the air column is $16.2\ \text{cm}$ long. Ignoring end corrections, calculate the speed of sound, in $\text{m s}^{-1}$, to three significant figures.`,
      value: v, unit: "m/s", wrong: [2 * l1 * f, l1 * f],
      explanation: t`1. First resonance in a closed tube: $L = \lambda/4$, so $\lambda = 4 \times 0.162 = ${4 * l1}\ \text{m}$.
2. $v = f\lambda = 512 \times ${4 * l1} = ${sfStr(v, 3)}\ \text{m s}^{-1}$.`,
      hints: ["The water surface is a node; the open top is an antinode."],
    });
  }
  {
    const l1 = 0.155, l2 = 0.493, f = 512;
    const lam = 2 * (l2 - l1);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`In a resonance-tube experiment with a $512\ \text{Hz}$ fork, resonances occur at air-column lengths of $15.5\ \text{cm}$ and $49.3\ \text{cm}$. Use the difference between these lengths (which removes the end correction) to calculate the speed of sound, in $\text{m s}^{-1}$, to three significant figures.`,
      value: f * lam, unit: "m/s", wrong: [f * 4 * l1, f * (l2 - l1)],
      explanation: t`1. Successive resonances of a closed tube differ by $\lambda/2$: $\lambda = 2(0.493 - 0.155) = ${dpStr(lam, 3)}\ \text{m}$.
2. $v = f\lambda = 512 \times ${dpStr(lam, 3)} = ${sfStr(f * lam, 3)}\ \text{m s}^{-1}$.
3. Using $4 \times 0.155$ gives ${sfStr(f * 4 * l1, 3)} m s⁻¹, too small because it ignores the end correction (the antinode is slightly above the open end).`,
      hints: ["How much longer must the column be for the next resonance?"],
    });
  }
  {
    const span = 0.0855, gaps = 6;
    const lam = (2 * span) / gaps;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A microwave probe detects seven successive nodes; the first and seventh are $8.55\ \text{cm}$ apart. Calculate the frequency of the microwaves, in Hz, to three significant figures.`,
      value: DATA.c / lam, unit: "Hz", wrong: [DATA.c / (span / gaps), DATA.c / ((2 * span) / 7)],
      explanation: t`Six gaps: spacing $= 8.55/6 = ${dpStr((span / gaps) * 100, 3)}\ \text{cm}$; $\lambda = ${dpStr(lam * 100, 2)}\ \text{cm}$; $f = \dfrac{3.00 \times 10^{8}}{${dpStr(lam, 4)}} = ${sciTex(DATA.c / lam)}\ \text{Hz}$.`,
      hints: ["Seven nodes have six gaps."],
    });
  }
  // Uncertainty in node spacing
  {
    const span = 0.0855, gaps = 6, du = 0.002;
    b.num({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: t`In the experiment where seven nodes span $8.55\ \text{cm}$, each node position is judged to $\pm 0.1\ \text{cm}$. Calculate the percentage uncertainty in the wavelength, to two significant figures.`,
      value: pctUnc(du, span), sf: 2, unit: "%", wrong: [pctUnc(du / 2, span), pctUnc(du, span / gaps)],
      explanation: t`The span is a difference of two positions: $\pm 0.2\ \text{cm}$. $\lambda = 2 \times \text{span}/6$ has the same percentage uncertainty: $\dfrac{0.2}{8.55} \times 100 = ${sfStr(pctUnc(du, span), 2)}\%$. Measuring a single spacing of 1.43 cm would give six times this.`,
      hints: ["The absolute uncertainties of two position readings add."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Points on opposite sides of a node on a stationary wave oscillate in antiphase.",
    answer: true,
    explanation: "True. When one loop is up, the next is down: phase difference π rad across a node.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "At a node of a stationary wave the two travelling waves are always in phase.",
    answer: false,
    explanation: "False. At a node the two waves are always in antiphase, so their displacements cancel at every instant.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each system with the length L of its fundamental in terms of the wavelength λ.",
    pairs: [
      ["string fixed at both ends", "L = λ/2 (node at each end)"],
      ["pipe closed at one end", "L = λ/4 (node at the closed end, antinode at the open end)"],
      ["pipe closed at one end, second resonance", "L = 3λ/4"],
      ["string fixed at both ends, second harmonic", "L = λ (three nodes)"],
    ],
    explanation: "Fit nodes and antinodes to the boundary conditions at the ends.",
    hints: ["Sketch the loops in your head for each case."],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "A point of zero amplitude on a stationary wave is a {{blank:a}}. The distance from a node to the nearest antinode is {{blank:b}} of a wavelength. A pipe closed at one end produces only {{blank:c}} harmonics.",
    blanks: [
      { id: "a", accepted: ["node"], choices: ["node", "antinode", "crest"] },
      { id: "b", accepted: ["a quarter"], choices: ["a quarter", "a half", "one whole"] },
      { id: "c", accepted: ["odd"], choices: ["odd", "even", "all"] },
    ],
    explanation: "Node: zero amplitude; node to antinode = λ/4; closed pipe: odd harmonics.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how a stationary wave is formed on a string fixed at one end and vibrated at the other.",
    points: [
      "A wave travels along the string and is reflected at the fixed end.",
      "The incident and reflected waves have the same frequency (and speed, similar amplitude) and travel in opposite directions.",
      "They superpose: at nodes they always cancel (antiphase) and at antinodes they reinforce (in phase), giving a fixed pattern.",
    ],
    modelAnswer: "The wave sent along the string reflects at the fixed end. The incident and reflected waves have the same frequency and speed but travel in opposite directions, and they superpose. At some points they always cancel, forming nodes, and midway between they reinforce, forming antinodes; the pattern does not move.",
    explanation: "Reflection, two waves with the same frequency in opposite directions, and superposition.",
    hints: ["Where does the second wave come from?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "State four differences between a stationary wave and a progressive wave.",
    points: [
      "Energy: a progressive wave transfers energy; a stationary wave has no net energy transfer.",
      "Amplitude: constant along a progressive wave; varies from zero (nodes) to maximum (antinodes) along a stationary wave.",
      "Phase: changes continuously with position along a progressive wave; in a stationary wave all points between adjacent nodes are in phase (antiphase across a node).",
      "Pattern/wavelength: a progressive wave moves at the wave speed; a stationary wave's pattern does not move, and λ is twice the node spacing.",
    ],
    modelAnswer: "A progressive wave transfers energy, but a stationary wave does not. Every point on a progressive wave has the same amplitude, whereas a stationary wave has zero amplitude at nodes and maximum at antinodes. Phase changes continuously along a progressive wave, but in a stationary wave points between adjacent nodes are in phase. A progressive wave pattern moves along; a stationary wave pattern stays in place.",
    explanation: "Compare energy, amplitude, phase and motion of the pattern.",
    hints: ["Think about energy, amplitude, phase and whether the pattern moves."],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Describe how you would determine the wavelength of microwaves using a transmitter, a metal reflecting plate, a probe receiver and a metre rule.",
    points: [
      "Point the transmitter at the metal plate so that the reflected wave superposes on the incident wave to form a stationary wave.",
      "Move the probe along the line between transmitter and plate and locate successive minima (nodes) of the receiver reading.",
      "Measure the distance across several (e.g. 10) node spacings with the metre rule and divide by the number of spacings.",
      "λ = 2 × node spacing; repeat and average (measuring across many nodes reduces the percentage uncertainty).",
    ],
    modelAnswer: "Aim the transmitter at a metal plate so that reflected and incident waves form a stationary wave. Move the probe along the line between them and note the positions of successive minima. Measure the distance spanning ten node spacings with the metre rule, divide by ten and double the result to give λ. Repeat and average.",
    explanation: "Arrangement, detecting nodes, measuring over many spacings, and λ = 2 × spacing.",
    hints: ["Nodes are half a wavelength apart."],
  });
  // Practice structured: string experiment (16 marks)
  {
    const L = 0.900;
    const g = DATA.g, mu = 1.6e-3;
    const T = 0.40 * g; // tension in part (c)
    const vStr = Math.sqrt(T / mu);
    const f1 = vStr / (2 * L);
    const fObs = [f1, 2 * f1, 3 * f1].map((x) => Number(x.toFixed(1)));
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A string passes over a pulley and carries a $0.40\ \text{kg}$ mass, giving a tension of $0.40 \times 9.81\ \text{N}$. The vibrating length between a vibration generator and the pulley is $0.900\ \text{m}$. The signal-generator frequency is increased from zero; stationary waves are seen at ${fObs[0]} Hz, ${fObs[1]} Hz and ${fObs[2]} Hz, with one, two and three loops respectively.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "State the wavelength of the stationary wave with three loops, in m.", value: (2 * L) / 3, unit: "m", wrong: [L / 3], explanation: t`Three loops $= 3\lambda/2 = 0.900\ \text{m}$, so $\lambda = 0.600\ \text{m}$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate the speed of the waves on the string, in $\text{m s}^{-1}$, to three significant figures.`, value: 2 * L * fObs[0], unit: "m/s", wrong: [L * fObs[0]], explanation: t`$v = f\lambda = ${fObs[0]} \times 1.800 = ${sfStr(2 * L * fObs[0], 3)}\ \text{m s}^{-1}$ (or $${fObs[2]} \times 0.600$).` }),
        P.num({ label: "(c)", marks: 2, stem: t`The speed of waves on a string is $v = \sqrt{T/\mu}$, where $T$ is the tension and $\mu$ the mass per unit length. Use your answer to (b) to calculate $\mu$, in $\text{kg m}^{-1}$, to two significant figures.`, value: T / (2 * L * fObs[0]) ** 2, sf: 2, wrong: [T / (2 * L * fObs[0])], explanation: t`$\mu = T/v^2 = \dfrac{0.40 \times 9.81}{${sfStr(2 * L * fObs[0], 3)}^2} = ${sciTex(T / (2 * L * fObs[0]) ** 2, 2)}\ \text{kg m}^{-1}$.` }),
        P.manual({ label: "(d)", marks: 3, stem: "Describe the stationary wave at 3 loops in words: where the nodes and antinodes are, and how points in adjacent loops move.", points: ["Nodes at both ends and at 0.300 m and 0.600 m from the generator end (4 nodes).", "Antinodes midway between nodes: at 0.150 m, 0.450 m and 0.750 m.", "Points in the same loop move in phase; points in adjacent loops move in antiphase."], modelAnswer: "There are nodes at 0, 0.300, 0.600 and 0.900 m and antinodes at 0.150, 0.450 and 0.750 m. All points within one loop move up and down together, and each loop moves in antiphase with its neighbours." }),
        P.num({ label: "(e)", marks: 2, stem: "Predict the frequency, in Hz, at which four loops would form.", value: 4 * fObs[0], tol: 0.15, unit: "Hz", wrong: [fObs[2] + 1], explanation: t`$f_4 = 4f_1 = 4 \times ${fObs[0]} = ${dpStr(4 * fObs[0], 1)}\ \text{Hz}$.` }),
        P.num({ label: "(f)", marks: 2, stem: "The mass on the hanger is changed so that the tension is four times as large. Calculate the new fundamental frequency, in Hz, to three significant figures.", value: 2 * fObs[0], unit: "Hz", wrong: [4 * fObs[0]], explanation: t`$v \propto \sqrt{T}$, so $v$ and $f_1$ double: $2 \times ${fObs[0]} = ${dpStr(2 * fObs[0], 1)}\ \text{Hz}$.` }),
        P.manual({ label: "(g)", marks: 2, stem: "Suggest how the frequencies at which stationary waves form could be judged more precisely.", points: ["Adjust the frequency up and down through the resonance and record the frequency of maximum amplitude (average the two sides).", "Use a stroboscope / view against a scale / use a frequency meter with more resolution; repeat and average."], modelAnswer: "Approach each resonance from below and from above, note the frequencies where the antinode amplitude is greatest and average them; use a frequency meter to 0.1 Hz and repeat." }),
        P.manual({ label: "(h)", marks: 2, stem: "State two safety precautions in this experiment.", points: ["Keep feet clear of the hanging mass / place a sand tray or cushion below it in case the string breaks.", "Wear eye protection in case the string snaps under tension."], modelAnswer: "Place a sand tray below the hanging mass and keep feet clear; wear goggles in case the string snaps." }),
      ],
      explanation: "n loops fit n λ/2 into L; v = fλ; v = √(T/μ), so f ∝ √T.",
      hints: ["Each loop is half a wavelength.", "f₁ = v/2L."],
    });
  }
  // Practice structured: closed pipe resonance (8 marks)
  {
    const f = 384, v = 343;
    const lam = v / f;
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A $384\ \text{Hz}$ tuning fork is held above a long vertical tube that can be filled with water from the bottom. The speed of sound in the air is $343\ \text{m s}^{-1}$. End corrections may be ignored.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the wavelength of the sound, in m, to three significant figures.", value: lam, unit: "m", wrong: [f / v], explanation: t`$\lambda = v/f = 343/384 = ${sfStr(lam, 3)}\ \text{m}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the shortest air-column length that gives resonance, in m, to three significant figures.", value: lam / 4, unit: "m", wrong: [lam / 2], explanation: t`$L_1 = \lambda/4 = ${sfStr(lam / 4, 3)}\ \text{m}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the next length at which resonance occurs, in m, to three significant figures.", value: (3 * lam) / 4, unit: "m", wrong: [lam / 2], explanation: t`$L_2 = 3\lambda/4 = ${sfStr((3 * lam) / 4, 3)}\ \text{m}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "State where the displacement nodes and antinodes are for the resonance in (c).", points: ["Nodes at the water surface and at λ/2 (0.447 m) above it.", "Antinodes at the open top and at λ/4 above the water surface (0.223 m)."], modelAnswer: "There are displacement nodes at the water surface and 0.447 m above it, and antinodes 0.223 m above the water and at the open end." }),
      ],
      explanation: "Closed tube: node at the water, antinode at the open end; resonances at λ/4, 3λ/4, …",
      hints: ["The water surface cannot move: it is a node."],
    });
  }

  b.card("DEFINITION", "**Principle of superposition**", "Where waves meet, the resultant displacement is the sum of the individual displacements.");
  b.card("DEFINITION", "**Stationary wave**", "Formed by two waves of the same frequency travelling in opposite directions; nodes and antinodes stay in place; no net energy transfer.");
  b.card("FACT", "Node and antinode spacing", "Node–node = antinode–antinode = λ/2; node–antinode = λ/4.");
  b.card("FORMULA", "String fixed at both ends", t`$f_n = \dfrac{nv}{2L}$, all harmonics`);
  b.card("FORMULA", "Pipe closed at one end", t`$f_1 = \dfrac{v}{4L}$; only odd harmonics $3f_1, 5f_1, \ldots$`);
  b.card("FORMULA", "Pipe open at both ends", t`$f_1 = \dfrac{v}{2L}$; all harmonics`);
  b.card("CONCEPT", "Phase in a stationary wave", "In phase within a loop; antiphase across a node.");
  b.card("CONCEPT", "Microwave node method", "Transmitter facing a metal plate; probe finds nodes; λ = 2 × spacing, measured over many spacings.");
  b.card("CONCEPT", "Resonance tube without end correction", "Successive resonance lengths differ by λ/2.");
});
