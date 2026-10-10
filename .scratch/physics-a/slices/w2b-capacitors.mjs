// W2b: aphys.capacitance.capacitors — C = Q/V, the farad, isolated sphere C = 4πε₀r, series/parallel, sharing, uses.
import { concept, P, t, chk, DATA, sfStr, dpStr, sciTex, pctUnc, seriesC, parallelC, linFit, table } from "../lib.mjs";

const u = 1e-6;

concept("aphys.capacitance.capacitors", { file: "capacitance/capacitors", keyPrefix: "capacitance.capacitors" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement defines the capacitance of a parallel-plate capacitor?",
    options: [
      ["The charge stored on one plate per unit potential difference between the plates", "Correct: C = Q/V."],
      ["The total charge on both plates per unit potential difference between the plates", "The plates carry +Q and −Q; the charge stored is Q on one plate."],
      ["The energy stored per unit potential difference between the plates", "Energy per unit p.d. is not capacitance (W = ½CV²)."],
      ["The potential difference between the plates per unit charge stored", "This is 1/C, the reciprocal of capacitance."],
    ],
    answer: "A",
    explanation: "Capacitance = charge stored (on one plate) ÷ p.d. between the plates, C = Q/V, in farads.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the farad expressed in SI base units?",
    options: [
      [t`$\text{A}^2\,\text{s}^4\,\text{kg}^{-1}\,\text{m}^{-2}$`, "Correct: C V⁻¹ = (A s) ÷ (kg m² s⁻³ A⁻¹)."],
      [t`$\text{A}\,\text{s}^3\,\text{kg}^{-1}\,\text{m}^{-2}$`, "This divides by the volt but omits one A from the coulomb."],
      [t`$\text{kg m}^2\,\text{s}^{-4}\,\text{A}^{-2}$`, "This is the reciprocal of the farad."],
      [t`$\text{A}^2\,\text{s}^3\,\text{kg}^{-1}\,\text{m}^{-2}$`, "This is the siemens (Ω⁻¹); the farad has s⁴."],
    ],
    answer: "A",
    explanation: t`$\text{F} = \dfrac{\text{C}}{\text{V}} = \dfrac{\text{A s}}{\text{kg m}^2\,\text{s}^{-3}\,\text{A}^{-1}} = \text{A}^2\,\text{s}^4\,\text{kg}^{-1}\,\text{m}^{-2}$.`,
  });
  {
    const C = seriesC(6 * u, 3 * u);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true,
      stem: t`Capacitors of $6.0\ \mu\text{F}$ and $3.0\ \mu\text{F}$ are connected in series. What is the combined capacitance?`,
      options: [
        [`${sfStr(C / u, 2)} µF`, "Correct: 1/C = 1/6 + 1/3 = 1/2."],
        ["9.0 µF", "This adds them, which is the rule for capacitors in parallel."],
        ["4.5 µF", "This is the mean, which has no physical meaning here."],
        ["0.50 µF", "This is 1/C in µF⁻¹; it must be inverted."],
      ],
      answer: "A",
      explanation: t`$\dfrac{1}{C} = \dfrac{1}{6.0} + \dfrac{1}{3.0} = 0.50\ \mu\text{F}^{-1}$, so $C = ${sfStr(C / u, 2)}\ \mu\text{F}$.`,
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Two capacitors of different capacitance are connected in series across a battery and fully charged. Which statement is correct?",
    options: [
      ["Both store the same charge, and the smaller capacitor has the larger p.d. across it.", "Correct: same Q in series, V = Q/C."],
      ["Both have the same p.d., and the larger capacitor stores the larger charge.", "That describes capacitors in parallel."],
      ["Both store the same charge, and the larger capacitor has the larger p.d. across it.", "With the same Q, V = Q/C is smaller for the larger C."],
      ["The larger capacitor stores more charge, so it has the larger p.d. across it.", "In series the charges are equal."],
    ],
    answer: "A",
    explanation: "The inner plates are isolated, so charge induced on them makes every capacitor in series carry the same Q. With V = Q/C, the smaller C has the larger V.",
    hints: ["Which quantity is the same for capacitors in series?"],
  });
  {
    const r = 6.4e6;
    const C = r / DATA.k_e;
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`Treating the Earth as an isolated conducting sphere of radius $6.4 \times 10^{6}\ \text{m}$, what is its capacitance? ($\dfrac{1}{4\pi\varepsilon_0} = 8.99 \times 10^{9}\ \text{m F}^{-1}$)`,
      options: [
        [t`$${sciTex(C, 2)}\ \text{F}$`, "Correct: C = 4πε₀r = r/(8.99 × 10⁹)."],
        [t`$${sciTex(r * DATA.k_e, 2)}\ \text{F}$`, "This multiplies r by 1/4πε₀ instead of dividing."],
        [t`$${sciTex(4 * Math.PI * DATA.eps0 * r * r, 2)}\ \text{F}$`, "This uses r² (as in a field formula) instead of r."],
        [t`$${sciTex(DATA.eps0 * r, 2)}\ \text{F}$`, "This omits the factor 4π."],
      ],
      answer: "A",
      explanation: t`$C = 4\pi\varepsilon_0 r = \dfrac{6.4 \times 10^{6}}{8.99 \times 10^{9}} = ${sciTex(C, 2)}\ \text{F}$, less than a millifarad.`,
      hints: ["C = 4πε₀r."],
    });
  }
  {
    // network: 2 µF parallel 4 µF, in series with 3 µF
    const Cp = parallelC(2 * u, 4 * u);
    const Ct = seriesC(Cp, 3 * u);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`A $2.0\ \mu\text{F}$ and a $4.0\ \mu\text{F}$ capacitor are connected in parallel, and the pair is connected in series with a $3.0\ \mu\text{F}$ capacitor. What is the combined capacitance?`,
      options: [
        [`${sfStr(Ct / u, 2)} µF`, "Correct: 6.0 µF in series with 3.0 µF."],
        ["9.0 µF", "This adds all three as if in parallel."],
        [`${sfStr(seriesC(2 * u, 4 * u, 3 * u) / u, 2)} µF`, "This puts all three in series."],
        [`${sfStr((seriesC(2 * u, 4 * u) + 3 * u) / u, 2)} µF`, "This swaps the rules: pair in series, then added to 3.0 µF."],
      ],
      answer: "A",
      explanation: t`Parallel pair $= 2.0 + 4.0 = 6.0\ \mu\text{F}$; in series with $3.0$: $\dfrac{6.0 \times 3.0}{9.0} = ${sfStr(Ct / u, 2)}\ \mu\text{F}$.`,
      hints: ["Parallel capacitances add."],
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A capacitor connected to a battery is fully charged. What is the total charge on the capacitor as a whole?",
    options: [
      ["Zero: one plate has +Q and the other −Q", "Correct: charge is moved from one plate to the other; the capacitor stays neutral."],
      ["2Q, the sum of the charges on the two plates", "The plates carry equal and opposite charges, which sum to zero."],
      ["Q, all of it supplied by the battery's chemicals", "The battery moves existing electrons; it does not create charge."],
      ["It depends on the e.m.f. of the battery only", "The net charge is zero whatever the e.m.f."],
    ],
    answer: "A",
    explanation: "Charging moves electrons from one plate round the circuit to the other. The plates carry +Q and −Q; 'charge stored' means Q, the charge on one plate.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`A $470\ \mu\text{F}$ capacitor is charged to $16\ \text{V}$. Calculate the charge stored, in C, to three significant figures.`,
    value: 470e-6 * 16, unit: "C", wrong: [470 * 16, 470e-6 / 16],
    explanation: t`$Q = CV = 470 \times 10^{-6} \times 16 = ${sciTex(470e-6 * 16)}\ \text{C} = ${sfStr(470e-6 * 16 * 1000, 3)}\ \text{mC}$.`,
  });
  {
    const C = 4 * Math.PI * DATA.eps0 * 0.25;
    const V = 2.0e-6 / C;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`An isolated metal sphere of radius $0.25\ \text{m}$ carries a charge of $2.0\ \mu\text{C}$. Calculate its potential, in V, to two significant figures. ($\varepsilon_0 = 8.85 \times 10^{-12}\ \text{F m}^{-1}$)`,
      value: V, sf: 2, unit: "V", wrong: [2.0e-6 * C, 2.0 / C],
      explanation: t`1. $C = 4\pi\varepsilon_0 r = 4\pi \times 8.85 \times 10^{-12} \times 0.25 = ${sciTex(C)}\ \text{F}$.
2. $V = Q/C = \dfrac{2.0 \times 10^{-6}}{${sciTex(C)}} = ${sciTex(V, 2)}\ \text{V}$.`,
      hints: ["Find C from the radius, then V = Q/C."],
    });
  }
  {
    const C1 = 2.2 * u, C2 = 4.7 * u, V = 12;
    const C = seriesC(C1, C2);
    const Q = C * V;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Capacitors of $2.2\ \mu\text{F}$ and $4.7\ \mu\text{F}$ are connected in series across a $12\ \text{V}$ supply. Calculate the p.d. across the $2.2\ \mu\text{F}$ capacitor, in V, to three significant figures.`,
      value: Q / C1, unit: "V", wrong: [Q / C2, V / 2],
      explanation: t`1. $C = \dfrac{2.2 \times 4.7}{2.2 + 4.7} = ${sfStr(C / u, 3)}\ \mu\text{F}$.
2. $Q = CV = ${sfStr(C / u, 3)} \times 12 = ${sfStr(Q / u, 3)}\ \mu\text{C}$ on each.
3. $V_{2.2} = \dfrac{${sfStr(Q / u, 3)}}{2.2} = ${sfStr(Q / C1, 3)}\ \text{V}$ (the smaller capacitor takes the larger share).`,
      hints: ["Same charge on each capacitor in series."],
    });
  }
  {
    const C1 = 22 * u, V1 = 9.0, C2 = 47 * u;
    const Vf = (C1 * V1) / (C1 + C2);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A $22\ \mu\text{F}$ capacitor is charged to $9.0\ \text{V}$, disconnected from the supply and connected across an uncharged $47\ \mu\text{F}$ capacitor. Calculate the final p.d. across the pair, in V, to two significant figures.`,
      value: Vf, sf: 2, unit: "V", wrong: [V1 / 2, (C2 * V1) / (C1 + C2)],
      explanation: t`Charge is conserved: $Q = 22 \times 9.0 = ${22 * 9}\ \mu\text{C}$, shared over $22 + 47 = 69\ \mu\text{F}$ in parallel, so $V = ${22 * 9}/69 = ${sfStr(Vf, 2)}\ \text{V}$.`,
      hints: ["Total charge is conserved; the capacitors end at the same p.d."],
    });
  }
  {
    // how many 100 µF capacitors (rated 25 V) to make 50 V working
    const C = seriesC(100 * u, 100 * u);
    b.num({
      d: 4, skill: "ANALYSIS",
      stem: t`A technician has many $100\ \mu\text{F}$ capacitors, each rated at a maximum of $25\ \text{V}$. She needs a combination that can safely be connected across $50\ \text{V}$. She connects two in series. Calculate the capacitance of this combination, in µF.`,
      value: C / u, unit: "µF", wrong: [200, 100],
      explanation: t`Two equal capacitors in series share the 50 V equally (25 V each, within the rating). $C = \dfrac{100 \times 100}{200} = ${sfStr(C / u, 2)}\ \mu\text{F}$. To get 100 µF at 50 V she could put two such series pairs in parallel.`,
      hints: ["Equal capacitors in series share the p.d. equally."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Capacitors connected in parallel have a combined capacitance equal to the sum of their capacitances.",
    answer: true,
    explanation: "True. They share the same p.d. and their charges add, so C = C₁ + C₂ + … (the opposite of resistors).",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each capacitance with an equivalent value.",
    pairs: [
      ["4.7 µF", t`$4.7 \times 10^{-6}\ \text{F}$`],
      ["220 nF", t`$2.2 \times 10^{-7}\ \text{F}$`],
      ["33 pF", t`$3.3 \times 10^{-11}\ \text{F}$`],
      ["0.10 mF", t`$1.0 \times 10^{-4}\ \text{F}$`],
    ],
    explanation: "µ = 10⁻⁶, n = 10⁻⁹, p = 10⁻¹², m = 10⁻³.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the comparison with resistors.",
    template: "For capacitors in {{blank:a}}, the capacitances simply add. For capacitors in {{blank:b}}, the reciprocals add. In series every capacitor carries the same {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["parallel"], choices: ["parallel", "series"] },
      { id: "b", accepted: ["series"], choices: ["parallel", "series"] },
      { id: "c", accepted: ["charge"], choices: ["charge", "p.d.", "energy"] },
    ],
    explanation: "Capacitors combine the opposite way to resistors; series capacitors share the same charge.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "What is the SI unit of capacitance?",
    accepted: ["farad", "farads", "F", "the farad"],
    explanation: "The **farad** (F): one coulomb per volt.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Derive the formula for the combined capacitance C of two capacitors C₁ and C₂ connected in series.",
    points: [
      "Each capacitor carries the same charge Q (charge induced on the isolated inner plates; conservation of charge).",
      "The p.d.s add: V = V₁ + V₂ (Kirchhoff's second law).",
      "Using V = Q/C: Q/C = Q/C₁ + Q/C₂.",
      "Dividing by Q: 1/C = 1/C₁ + 1/C₂.",
    ],
    modelAnswer: "The plates joined between the capacitors are isolated, so equal and opposite charges are induced: each capacitor carries the same charge Q. The supply p.d. is shared, V = V₁ + V₂. Writing V = Q/C for each gives Q/C = Q/C₁ + Q/C₂, and dividing by Q gives 1/C = 1/C₁ + 1/C₂.",
    explanation: "Same charge, p.d.s add, V = Q/C.",
    hints: ["What is the same for each capacitor in series?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe what happens, in terms of electrons, when an uncharged capacitor is connected to a battery, and explain why the current eventually stops.",
    points: [
      "Electrons flow from the plate connected to the positive terminal, through the battery, to the other plate (no charge crosses the insulator).",
      "One plate becomes positively charged and the other negatively charged with equal magnitude; a p.d. builds up between the plates.",
      "The current stops when the p.d. across the capacitor equals the e.m.f. of the battery.",
    ],
    modelAnswer: "Electrons are pulled off the plate joined to the positive terminal and pushed by the battery onto the other plate; none cross the dielectric. The plates gain equal and opposite charges, and the p.d. between them grows. When this p.d. equals the battery's e.m.f., there is no longer a net p.d. to drive charge, so the current stops.",
    explanation: "Charge separation until V_C = E.",
    hints: ["Does any charge cross the gap between the plates?"],
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State three uses of capacitors and the property each relies on.",
    points: [
      "Camera flash or defibrillator: storing energy and releasing it quickly.",
      "Smoothing a rectified supply / backup supply: storing charge to keep the p.d. steady when the input falls.",
      "Timing circuits (with a resistor) or blocking d.c. while passing a.c. signals.",
    ],
    modelAnswer: "A camera flash stores energy in a capacitor and releases it in a fraction of a millisecond; a smoothing capacitor in a power supply stores charge and keeps the output p.d. up between peaks; and a resistor-capacitor pair sets a time interval in a timing circuit.",
    explanation: "Energy store, charge reservoir, timing.",
  });

  // Practice structured: Q-V data for a capacitor (12 marks)
  {
    const V = [2.5, 5.0, 7.5, 10.0, 12.5, 15.0];
    const Cn = 220 * u;
    const nz = [0.012, -0.018, 0.01, 0.022, -0.015, 0.005];
    const Q = V.map((v, i) => Math.round((Cn * v * 1000 + nz[i] * 1) * 100) / 100); // mC
    const fit = linFit(V, Q);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Sipho charges a capacitor to different p.d.s and measures the charge stored each time with a coulombmeter:

${table([t`$V\,/\,\text{V}$`, t`$Q\,/\,\text{mC}$`], V.map((v, i) => [dpStr(v, 1), dpStr(Q[i], 2)]))}`,
      parts: [
        P.manual({ label: "(a)", marks: 1, stem: "State the graph that should be plotted to find the capacitance, and how C is obtained from it.", points: ["Plot Q against V: a straight line through the origin whose gradient is C."], modelAnswer: "Plot Q (y) against V (x); the gradient of the best-fit straight line through the origin is C." }),
        P.num({ label: "(b)", marks: 3, stem: "Plot the graph and determine the gradient, in µF.", value: fit.m * 1000, tol: 6, unit: "µF", wrong: [1 / fit.m], explanation: t`Gradient $\approx ${sfStr(fit.m, 3)}\ \text{mC V}^{-1} = ${sfStr(fit.m * 1000, 3)}\ \mu\text{F}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Use your value to predict the charge at 20 V, in C, to two significant figures.", unit: "C", value: fit.m * 20 / 1000, tol: 0.1e-3, wrong: [fit.m / 20], explanation: t`$Q = CV \approx ${sfStr(fit.m * 1000, 3)} \times 10^{-6} \times 15 = ${sfStr(fit.m * 15, 2)}\ \text{mC}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "The capacitor is marked 220 µF ± 20%. Comment on whether the result agrees with the marking.", points: [t`$${sfStr(fit.m * 1000, 3)}\ \mu\text{F}$ lies within the range 176 µF to 264 µF.`, "So the result agrees with the marked value (the tolerance of electrolytic capacitors is large)."], modelAnswer: t`The measured ${sfStr(fit.m * 1000, 3)} µF is inside 220 µF ± 20% (176-264 µF), so it agrees with the marking.` }),
        P.num({ label: "(e)", marks: 2, stem: "The capacitor is now connected in parallel with an identical one and charged to 12 V. Calculate the total charge, in C, using the nominal 220 µF.", value: 2 * Cn * 12, unit: "C", wrong: [Cn * 12], explanation: t`$C = 440\ \mu\text{F}$; $Q = 440 \times 10^{-6} \times 12 = ${sfStr(2 * Cn * 12 * 1000, 3)}\ \text{mC}$.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Suggest two sources of error in measuring the charge.", points: ["Charge leaks from the capacitor (through the dielectric or the air) before or during the measurement.", "The coulombmeter has a zero error / input capacitance, or the p.d. is read with a voltmeter that draws current."], modelAnswer: "Some charge leaks away through the dielectric before it is measured, and the coulombmeter may have a zero error or draw some charge itself; the voltmeter reading the charging p.d. also has its own uncertainty." }),
      ],
      explanation: "Q = CV: the gradient of Q against V is C.",
      hints: ["Convert mC V⁻¹ to µF: 1 mC V⁻¹ = 1000 µF."],
    });
  }
  // Practice structured: a capacitor network (8 marks)
  {
    const C1 = 3 * u, C2 = 6 * u, C3 = 4 * u, V = 24;
    const C12 = seriesC(C1, C2);
    const Ct = parallelC(C12, C3);
    const Q12 = C12 * V;
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A $3.0\ \mu\text{F}$ capacitor X and a $6.0\ \mu\text{F}$ capacitor Y are in series. This pair is connected in parallel with a $4.0\ \mu\text{F}$ capacitor Z, and the network is connected to a $24\ \text{V}$ supply.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the total capacitance, in µF.", value: Ct / u, unit: "µF", wrong: [seriesC(C1, C2, C3) / u, 13], explanation: t`X and Y: $\dfrac{3.0 \times 6.0}{9.0} = ${C12 / u}\ \mu\text{F}$; plus Z: $${Ct / u}\ \mu\text{F}$.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the charge on Z, in µC.", value: C3 * V / u, unit: "µC", wrong: [Ct * V / u], explanation: t`$Q_Z = 4.0 \times 24 = ${(C3 * V) / u}\ \mu\text{C}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the charge on X, in µC.", value: Q12 / u, unit: "µC", wrong: [(C1 * V) / u], explanation: t`The series pair has $${C12 / u}\ \mu\text{F}$ across 24 V: $Q = ${(Q12 / u)}\ \mu\text{C}$ on each of X and Y.` }),
        P.num({ label: "(d)", marks: 1, stem: "Calculate the p.d. across Y, in V.", value: Q12 / C2, unit: "V", wrong: [Q12 / C1], explanation: t`$V_Y = ${Q12 / u}/6.0 = ${Q12 / C2}\ \text{V}$ (X has $${Q12 / C1}\ \text{V}$).` }),
        P.manual({ label: "(e)", marks: 2, stem: "X is rated at 15 V. Explain whether it is safe in this circuit.", points: [t`The p.d. across X is $${Q12 / C1}\ \text{V}$.`, "This exceeds 15 V, so it is not safe: X could break down (the smaller capacitor in series takes the larger share)."], modelAnswer: t`X has ${Q12 / C1} V across it, more than its 15 V rating, so it is not safe: in series the smaller capacitor takes the larger p.d.` }),
      ],
      explanation: "Series pair first (same charge), then add Z in parallel.",
      hints: ["Combine X and Y in series first."],
    });
    chk(Q12 / C1, 16, 1e-9);
  }

  b.card("DEFINITION", "**Capacitance**", "Charge stored (on one plate) per unit p.d. between the plates: C = Q/V.");
  b.card("DEFINITION", "**The farad**", "One coulomb per volt (1 F = 1 C V⁻¹); practical sizes µF, nF, pF.");
  b.card("FORMULA", "Isolated sphere", t`$C = 4\pi\varepsilon_0 r$`);
  b.card("FORMULA", "Capacitors in parallel", t`$C = C_1 + C_2 + \dots$`);
  b.card("FORMULA", "Capacitors in series", t`$\dfrac{1}{C} = \dfrac{1}{C_1} + \dfrac{1}{C_2} + \dots$`);
  b.card("CONCEPT", "Capacitors in series", "Same charge on each; the smaller capacitor takes the larger p.d.");
  b.card("CONCEPT", "Charge sharing", "Total charge conserved; capacitors end at a common p.d. V = Q/(C₁ + C₂).");
  b.card("CONCEPT", "Net charge on a charged capacitor", "Zero: plates carry +Q and −Q; 'charge stored' means Q.");
  b.card("FACT", "Capacitance of the Earth", "About 7 × 10⁻⁴ F: the farad is a very large unit.");
});
