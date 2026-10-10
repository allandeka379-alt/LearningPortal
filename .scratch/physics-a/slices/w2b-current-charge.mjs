// W2b: aphys.electricity.current-charge — current, Q = It, quantised charge, I = nAvq, drift velocity, carriers.
import { concept, P, t, chk, DATA, sfStr, dpStr, sciTex, sciPlain, pctUnc } from "../lib.mjs";

const e = DATA.e;
const area = (d) => (Math.PI * d * d) / 4;

concept("aphys.electricity.current-charge", { file: "electricity/current-charge", keyPrefix: "electricity.current-charge" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement defines electric current?",
    options: [
      ["The rate of flow of electric charge", "Correct: I = ΔQ/Δt."],
      ["The energy carried per unit charge", "That is potential difference (or e.m.f.)."],
      ["The charge carried per unit volume", "That is a charge density, related to nq, not the current."],
      ["The number of electrons passing a point", "A number is not a rate, and the carriers need not be electrons."],
    ],
    answer: "A",
    explanation: "Current is the rate of flow of charge, I = ΔQ/Δt, measured in amperes.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these charges could NOT be found on an oil drop?",
    options: [
      [t`$2.4 \times 10^{-19}\ \text{C}$`, "Correct: this is 1.5e, not a whole-number multiple of e."],
      [t`$3.2 \times 10^{-19}\ \text{C}$`, "This is 2e, which is possible."],
      [t`$4.8 \times 10^{-19}\ \text{C}$`, "This is 3e, which is possible."],
      [t`$8.0 \times 10^{-19}\ \text{C}$`, "This is 5e, which is possible."],
    ],
    answer: "A",
    explanation: t`Charge is quantised: any charge is $Ne$ with $N$ a whole number. $2.4 \times 10^{-19} / 1.60 \times 10^{-19} = ${2.4e-19 / e}$, not a whole number.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the coulomb expressed in SI base units?",
    options: [
      ["A s", "Correct: Q = It, so 1 C = 1 A × 1 s."],
      [t`$\text{A s}^{-1}$`, "This would be current divided by time, not current × time."],
      [t`$\text{J V}^{-1}\,\text{s}$`, "J V⁻¹ is already a coulomb; the extra second makes it wrong, and J and V are not base units."],
      ["kg A s", "Charge has no dimension of mass."],
    ],
    answer: "A",
    explanation: "From Q = It, the coulomb is the ampere second, A s. The ampere is the SI base unit.",
  });
  {
    const I1 = 2.0, d1 = 1.2, d2 = 0.6;
    const ratio = (d1 / d2) ** 2;
    b.mcq({
      d: 3, skill: "APPLICATION", daily: true,
      stem: t`A current of $2.0\ \text{A}$ passes through two copper wires joined in series. Wire X has diameter $1.2\ \text{mm}$ and wire Y has diameter $0.60\ \text{mm}$. What is the ratio $\dfrac{\text{drift velocity in Y}}{\text{drift velocity in X}}$?`,
      options: [
        [String(ratio), "Correct: v ∝ 1/A ∝ 1/d², and the diameter ratio is 2."],
        ["2", "This uses v ∝ 1/d instead of 1/d²."],
        ["0.25", "This is the inverse ratio: the thinner wire has the faster drift."],
        ["1", "The current is the same, but the drift velocity depends on the area."],
      ],
      answer: "A",
      explanation: t`In series the current is the same in both wires, and $n$ and $e$ are the same (both copper). $v = I/(nAe)$, so $v \propto 1/A \propto 1/d^2$: $\left(\dfrac{1.2}{0.60}\right)^2 = ${ratio}$.`,
      hints: ["What stays the same in two wires in series?", "Area depends on diameter squared."],
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does a lamp light almost immediately when the switch is closed, although the drift velocity of the electrons is very small?",
    options: [
      ["The electric field travels round the circuit very fast, so electrons everywhere start drifting together.", "Correct: no electron needs to travel from the switch to the lamp."],
      ["Electrons leave the cell at nearly the speed of light and quickly reach the lamp.", "Electrons in the wire drift slowly; they do not race from the cell."],
      ["The drift velocity becomes very large for an instant when the switch closes.", "The drift velocity stays small; it is the field that is set up quickly."],
      ["Electrons stored in the switch are released into the lamp filament.", "A switch does not store electrons; the filament already contains free electrons."],
    ],
    answer: "A",
    explanation: "Closing the switch sets up an electric field throughout the circuit at nearly the speed of light. The free electrons already in the filament begin to drift at once, so energy is transferred there immediately.",
    hints: ["Are there free electrons in the filament before the switch is closed?"],
  });
  {
    const nCu = 5.9e28, nSi = 1.0e16;
    b.mcq({
      d: 3, skill: "ANALYSIS",
      stem: t`A silver wire and a pure silicon rod have the same cross-sectional area and carry the same current. Silver has about $5.9 \times 10^{28}$ free electrons per cubic metre; silicon at room temperature has about $10^{16}$ carriers per cubic metre (take each carrier's charge as $e$). Which statement is correct?`,
      options: [
        [t`The drift velocity in silicon is about $${sciTex(nCu / nSi, 2)}$ times that in silver.`, "Correct: v ∝ 1/n for the same I, A and q."],
        [t`The drift velocity in silver is about $${sciTex(nCu / nSi, 2)}$ times that in silicon.`, "Inverted: the material with fewer carriers needs the faster drift."],
        ["The drift velocities are equal because the currents are equal.", "Equal currents with different n need different drift velocities."],
        [t`The drift velocity in silicon is about $${sciTex(Math.sqrt(nCu / nSi), 2)}$ times that in silver.`, "There is no square root: v is inversely proportional to n."],
      ],
      answer: "A",
      explanation: t`$v = \dfrac{I}{nAq}$; with $I$, $A$ and $q$ equal, $\dfrac{v_{\text{Si}}}{v_{\text{Ag}}} = \dfrac{n_{\text{Ag}}}{n_{\text{Si}}} = ${sciTex(nCu / nSi, 2)}$. (In practice a silicon rod could not carry the same current without heating strongly.)`,
      hints: ["Rearrange I = nAvq for v."],
    });
  }
  {
    // I-t graph area: current rises 0 to 6.0 mA in 4.0 s, then constant for 6.0 s
    const Q = 0.5 * 6e-3 * 4 + 6e-3 * 6;
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`The current in a component rises steadily from zero to $6.0\ \text{mA}$ in the first $4.0\ \text{s}$, then stays at $6.0\ \text{mA}$ for the next $6.0\ \text{s}$. How much charge passes through the component in the $10\ \text{s}$?`,
      options: [
        [`${sfStr(Q * 1000, 2)} mC`, "Correct: the area under the current-time graph (a triangle plus a rectangle)."],
        ["60 mC", "This treats the current as 6.0 mA for the whole 10 s."],
        ["30 mC", "This uses the average of 0 and 6.0 mA for the whole 10 s."],
        ["36 mC", "This includes only the constant part and misses the triangle."],
      ],
      answer: "A",
      explanation: t`Charge = area under the $I$-$t$ graph $= \tfrac{1}{2} \times 6.0 \times 4.0 + 6.0 \times 6.0 = 12 + 36 = ${sfStr(Q * 1000, 2)}\ \text{mC}$.`,
      hints: ["Charge is the area under a current-time graph."],
    });
  }
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: t`A steady current of $250\ \text{mA}$ passes through a torch bulb for $4.0$ minutes. Calculate the charge that passes, in C.`,
    value: 0.25 * 240, unit: "C", wrong: [250 * 240, 0.25 * 4],
    explanation: t`$Q = It = 0.250 \times (4.0 \times 60) = ${0.25 * 240}\ \text{C}$. Using 250 instead of 0.250 A, or 4 instead of 240 s, gives the wrong answers.`,
  });
  {
    const I = 0.80, tt = 60;
    const n = (I * tt) / e;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`A current of $0.80\ \text{A}$ passes through a resistor for one minute. Calculate the number of electrons that pass any point in the resistor, to three significant figures.`,
      value: n, wrong: [I / e, (I * tt) * e],
      explanation: t`$Q = It = 0.80 \times 60 = ${I * tt}\ \text{C}$. $N = Q/e = ${I * tt}/(1.60 \times 10^{-19}) = ${sciTex(n)}$. Multiplying by $e$ instead of dividing gives a tiny, meaningless number.`,
    });
  }
  {
    const d = 0.80e-3, I = 1.5, n = 8.5e28;
    const v = I / (n * area(d) * e);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A copper wire of diameter $0.80\ \text{mm}$ carries a current of $1.5\ \text{A}$. The number density of free electrons in copper is $8.5 \times 10^{28}\ \text{m}^{-3}$. Calculate the drift velocity of the electrons, in $\text{m s}^{-1}$, to three significant figures.`,
      value: v, unit: "m/s", wrong: [I / (n * Math.PI * d * d * e)],
      explanation: t`1. $A = \dfrac{\pi d^2}{4} = \dfrac{\pi (0.80 \times 10^{-3})^2}{4} = ${sciTex(area(d))}\ \text{m}^2$.
2. $v = \dfrac{I}{nAe} = \dfrac{1.5}{8.5 \times 10^{28} \times ${sciTex(area(d))} \times 1.60 \times 10^{-19}}$.
3. $v = ${sciTex(v)}\ \text{m s}^{-1}$.
4. Using the diameter as the radius gives an answer four times too small.`,
      hints: ["Find the cross-sectional area from the diameter.", "Rearrange I = nAve."],
    });
  }
  {
    const v = 1.0e-4, A = 2.5e-6, I = 3.4;
    const n = I / (A * v * e);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`An aluminium cable of cross-sectional area $2.5\ \text{mm}^2$ carries $3.4\ \text{A}$. The drift velocity of the electrons is $1.0 \times 10^{-4}\ \text{m s}^{-1}$. Calculate the number density of free electrons in aluminium, in $\text{m}^{-3}$, to two significant figures.`,
      value: n, sf: 2, wrong: [I / (2.5 * v * e)],
      explanation: t`1. $A = 2.5\ \text{mm}^2 = 2.5 \times 10^{-6}\ \text{m}^2$.
2. $n = \dfrac{I}{Ave} = \dfrac{3.4}{2.5 \times 10^{-6} \times 1.0 \times 10^{-4} \times 1.60 \times 10^{-19}}$.
3. $n = ${sciTex(n, 2)}\ \text{m}^{-3}$.
4. Forgetting that $1\ \text{mm}^2 = 10^{-6}\ \text{m}^2$ gives a value a million times too small.`,
      hints: ["Convert mm² to m² (multiply by 10⁻⁶)."],
    });
  }
  {
    const d = 1.8e-3, n = 8.5e28, I = 5.0, L = 3.0;
    const v = I / (n * area(d) * e);
    const tt = L / v;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A copper wire of diameter $1.8\ \text{mm}$ (free-electron density $8.5 \times 10^{28}\ \text{m}^{-3}$) carries $5.0\ \text{A}$ to a pump in a borehole. Calculate the average time an electron takes to drift $3.0\ \text{m}$ along the wire, in hours, to two significant figures.`,
      value: tt / 3600, sf: 2, unit: "h", wrong: [tt, tt / 60],
      explanation: t`1. $A = \pi (0.90 \times 10^{-3})^2 = ${sciTex(area(d))}\ \text{m}^2$.
2. $v = \dfrac{I}{nAe} = ${sciTex(v)}\ \text{m s}^{-1}$.
3. $t = \dfrac{L}{v} = \dfrac{3.0}{${sciTex(v)}} = ${sciTex(tt)}\ \text{s} = ${sfStr(tt / 3600, 2)}\ \text{h}$.
4. Stopping at seconds, or dividing by 60 only, gives the wrong unit.`,
      hints: ["Find the drift velocity first.", "Time = distance ÷ speed, then convert to hours."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a series circuit, the current is smaller after it has passed through a lamp because the lamp uses up some of the current.",
    answer: false,
    explanation: "False. Charge is conserved, so the current is the same at every point in a series circuit. The lamp transfers energy from the charges; it does not use up charge.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each material with its main charge carriers.",
    pairs: [
      ["copper wire", "free electrons"],
      ["copper(II) sulfate solution", "positive and negative ions"],
      ["pure silicon at room temperature", "electrons and holes"],
      ["neon gas in a glowing discharge tube", "electrons and positive gas ions"],
    ],
    explanation: "Metals conduct by free electrons; electrolytes by ions moving in opposite directions; semiconductors by electrons and holes; an ionised gas by electrons and positive ions.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statement about drift velocity.",
    template: "For a fixed current, the drift velocity of the carriers is inversely proportional to the {{blank:a}} of the conductor and to the {{blank:b}} of charge carriers. So it is {{blank:c}} in a thin wire than in a thick wire of the same metal.",
    blanks: [
      { id: "a", accepted: ["cross-sectional area"], choices: ["cross-sectional area", "length", "temperature"] },
      { id: "b", accepted: ["number density"], choices: ["number density", "mass", "speed"] },
      { id: "c", accepted: ["greater"], choices: ["greater", "smaller", "the same"] },
    ],
    explanation: "v = I/(nAq): smaller A or smaller n means a larger drift velocity for the same current.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "What name is given to the smallest unit of free charge, 1.60 × 10⁻¹⁹ C?",
    accepted: ["elementary charge", "the elementary charge", "e", "charge on an electron", "electronic charge"],
    explanation: "The **elementary charge** e = 1.60 × 10⁻¹⁹ C; all free charges are whole-number multiples of it.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: t`Show that the current $I$ in a conductor of cross-sectional area $A$ is given by $I = nAvq$, where $n$ is the number of charge carriers per unit volume, each of charge $q$, moving with drift velocity $v$.`,
    points: [
      t`Consider a length $L$: volume $AL$, so the number of carriers is $nAL$.`,
      t`Total charge in this length $Q = nALq$.`,
      t`This charge passes a cross-section in time $t = L/v$.`,
      t`$I = Q/t = nALq \div (L/v) = nAvq$.`,
    ],
    modelAnswer: t`Take a length $L$ of the conductor. Its volume is $AL$, so it contains $nAL$ carriers and a charge $Q = nALq$. At drift velocity $v$, all this charge passes through the end in time $t = L/v$. So $I = Q/t = nALq/(L/v) = nAvq$.`,
    explanation: "Count the charge in a length of conductor and the time it takes to pass a point.",
    hints: ["Start with a length L of the wire."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain, in terms of charge carriers, why the drift velocity of electrons in a metal is very small even when the current is several amperes.",
    points: [
      "A metal has a very large number density of free electrons (about 10²⁸–10²⁹ m⁻³).",
      "From I = nAve, a large n means only a small v is needed for a given current.",
      "The electrons collide frequently with the vibrating lattice ions, so their net drift is a small bias on fast random motion.",
    ],
    modelAnswer: "There are so many free electrons per cubic metre in a metal that, from I = nAve, only a tiny average drift is needed to carry several amperes. In addition the electrons keep colliding with the lattice ions, so the drift is only a small bias superimposed on their fast random motion.",
    explanation: "Link the large n to the small v through I = nAvq; mention collisions.",
    hints: ["Which quantity in I = nAvq is huge for a metal?"],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "When a pure silicon sample is warmed, the current through it at a fixed p.d. increases. Explain this using I = nAvq, and contrast it with a metal.",
    points: [
      "Heating frees more electrons (and holes) in silicon, so the number density n increases greatly.",
      "With n rising much faster than any fall in v, the current I = nAvq increases (resistance falls).",
      "In a metal n is effectively constant; heating increases lattice vibrations, reducing the drift velocity, so the current falls (resistance rises).",
    ],
    modelAnswer: "Warming the silicon gives more electrons enough energy to become free, creating electron-hole pairs, so n increases steeply and the current I = nAvq rises even though collisions increase. In a metal n does not change; the stronger lattice vibrations only make collisions more frequent, lowering the drift velocity, so the current falls.",
    explanation: "Semiconductors: n rises with temperature. Metals: n fixed, v falls.",
    hints: ["Which quantity changes most in a semiconductor when it is heated?"],
  });

  // Practice structured: a charging current and a current-time graph (8 marks)
  {
    const tt = [0, 5, 10, 15, 20];
    const Ima = [40, 24, 14, 8, 5];
    // area by trapezia
    let Q = 0;
    for (let i = 1; i < tt.length; i++) Q += ((Ima[i] + Ima[i - 1]) / 2) * (tt[i] - tt[i - 1]) * 1e-3;
    const N = Q / e;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`The current into a component is recorded every $5.0\ \text{s}$ while it charges:

| $t\,/\,\text{s}$ | ${tt.join(" | ")} |
|---|---|---|---|---|---|
| $I\,/\,\text{mA}$ | ${Ima.join(" | ")} |`,
      parts: [
        P.manual({ label: "(a)", marks: 1, stem: "State what the area under a graph of current against time represents.", points: ["The charge that has flowed (ΔQ = ∫I dt)."], modelAnswer: "The total charge that has passed." }),
        P.num({ label: "(b)", marks: 3, stem: "Estimate the charge that passes in the 20 s by treating each 5.0 s interval as a trapezium, in C, to two significant figures.", value: Q, sf: 2, unit: "C", wrong: [Ima[0] * 1e-3 * 20, Q * 1000], explanation: t`Trapezia: $5.0 \times \tfrac{1}{2}[(40+24) + (24+14) + (14+8) + (8+5)] \times 10^{-3} = ${sfStr(Q, 2)}\ \text{C}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the number of electrons this charge represents, to two significant figures.", value: N, sf: 2, wrong: [Q * e], explanation: t`$N = Q/e = ${sfStr(Q, 2)}/(1.60 \times 10^{-19}) = ${sciTex(N, 2)}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain whether the trapezium estimate is likely to be larger or smaller than the true charge.", points: ["The current falls along a curve that is concave upwards (decreasing more slowly as time goes on).", "Straight lines joining the points lie above the curve, so the trapezium estimate is slightly too large."], modelAnswer: "The current falls along a curve that bends upwards, so the straight-line tops of the trapezia lie above the curve: the estimate is a slight overestimate." }),
      ],
      explanation: "Charge = area under the current-time graph; number of electrons = Q/e.",
      hints: ["Area of a trapezium = ½(a + b)h.", "Convert mA to A."],
    });
  }
  // Practice structured: drift velocity and uncertainty (12 marks)
  {
    const dRead = [0.56, 0.58, 0.57, 0.54, 0.58];
    const dm = dRead.reduce((s, x) => s + x, 0) / dRead.length;
    const dd = (Math.max(...dRead) - Math.min(...dRead)) / 2;
    const I = 0.95, n = 8.5e28;
    const A = area(dm * 1e-3);
    const v = I / (n * A * e);
    const pctA = 2 * pctUnc(dd, dm);
    const pctI = pctUnc(0.01, I);
    const pctV = pctA + pctI;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Nyasha investigates a copper wire. She measures its diameter at five places with a micrometer screw gauge: $${dRead.map((x) => x.toFixed(2)).join("$, $")}\ \text{mm}$. An ammeter reads $(0.95 \pm 0.01)\ \text{A}$. Copper has $8.5 \times 10^{28}$ free electrons per cubic metre.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the mean diameter, in mm, to three significant figures.", value: dm, unit: "mm", wrong: [dRead[0]], explanation: t`Mean $= ${sfStr(dm, 3)}\ \text{mm}$.` }),
        P.num({ label: "(b)", marks: 1, stem: "State the absolute uncertainty in the diameter, taken as half the range, in mm.", value: dd, dp: 2, unit: "mm", wrong: [dd * 2], explanation: t`$(0.58 - 0.54)/2 = ${dpStr(dd, 3)}\ \text{mm}$, quoted as $\pm ${dpStr(dd, 2)}\ \text{mm}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Calculate the cross-sectional area, in $\text{m}^2$, to three significant figures.`, value: A, unit: "m²", wrong: [Math.PI * (dm * 1e-3) ** 2], explanation: t`$A = \pi d^2/4 = \pi(${sfStr(dm, 3)} \times 10^{-3})^2/4 = ${sciTex(A)}\ \text{m}^2$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`Calculate the drift velocity, in $\text{m s}^{-1}$, to two significant figures.`, value: v, sf: 2, unit: "m/s", wrong: [v / 4], explanation: t`$v = I/(nAe) = 0.95/(8.5 \times 10^{28} \times ${sciTex(A)} \times 1.60 \times 10^{-19}) = ${sciTex(v, 2)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(e)", marks: 3, stem: "Calculate the percentage uncertainty in the drift velocity, to two significant figures, using the half-range for the diameter and the stated ammeter uncertainty.", value: pctV, sf: 2, unit: "%", wrong: [pctUnc(dd, dm) + pctI], explanation: t`Diameter: $\dfrac{${dpStr(dd, 3)}}{${sfStr(dm, 3)}} \times 100 = ${sfStr(pctUnc(dd, dm), 2)}\%$, doubled because $A \propto d^2$: $${sfStr(pctA, 2)}\%$. Current: $${sfStr(pctI, 2)}\%$. Total $= ${sfStr(pctV, 2)}\%$ ($n$ and $e$ taken as exact).` }),
        P.manual({ label: "(f)", marks: 3, stem: "Identify the measurement that contributes most to the uncertainty, explain why its effect is enlarged, and suggest one way to reduce it.", points: ["The diameter (largest percentage uncertainty).", "The area depends on d², so its percentage uncertainty is doubled.", "Check the micrometer's zero error and measure at more places in two perpendicular directions (or use a micrometer with a finer scale / a thicker wire)."], modelAnswer: "The diameter dominates: its percentage uncertainty is doubled because A depends on d². Reduce it by checking the zero error, measuring at more points and in two perpendicular directions along the wire, and averaging." }),
      ],
      explanation: "Area from the mean diameter; v = I/(nAe); percentage uncertainties add, with the diameter's doubled.",
      hints: ["A = πd²/4 with d in metres.", "For d², double the percentage uncertainty."],
    });
  }

  b.card("DEFINITION", "**Electric current**", "The rate of flow of electric charge: I = ΔQ/Δt.");
  b.card("DEFINITION", "**The coulomb**", "The charge passing a point in 1 s when the current is 1 A (1 C = 1 A s).");
  b.card("FACT", "Elementary charge", t`$e = 1.60 \times 10^{-19}\ \text{C}$; every free charge is a whole-number multiple of $e$ (charge is quantised).`);
  b.card("FORMULA", "Current and drift velocity", t`$I = nAvq$ — $n$ carriers per m³, area $A$, drift velocity $v$, charge $q$ per carrier.`);
  b.card("CONCEPT", "Charge from a current-time graph", "The charge is the area under the graph of current against time.");
  b.card("CONCEPT", "Charge carriers", "Metals: free electrons. Electrolytes: ions. Semiconductors: electrons and holes. Ionised gases: electrons and ions.");
  b.card("FACT", "Typical drift velocity in a copper wire", "A fraction of a millimetre per second for currents of a few amperes.");
  b.card("CONCEPT", "Why a lamp lights at once", "The electric field is set up round the circuit at nearly the speed of light, so electrons already in the filament start drifting together.");
  b.card("CONCEPT", "Conductors, semiconductors, insulators", "Ranked by number density of carriers: metals ~10²⁹ m⁻³, pure semiconductors ~10¹⁶ m⁻³ (rising with temperature), insulators negligible.");
});
