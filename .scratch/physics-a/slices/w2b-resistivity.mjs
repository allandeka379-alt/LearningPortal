// W2b: aphys.electricity.resistivity — R = ρL/A, unit Ω m, wire calculations, R-L experiment, orders of magnitude, temperature.
import { concept, P, t, chk, sfStr, dpStr, sciTex, pctUnc, linFit, table, mean, halfRange } from "../lib.mjs";

const area = (d) => (Math.PI * d * d) / 4;

concept("aphys.electricity.resistivity", { file: "electricity/resistivity", keyPrefix: "electricity.resistivity" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the SI unit of resistivity?",
    options: [
      ["Ω m", "Correct: ρ = RA/L has units Ω × m² ÷ m = Ω m."],
      [t`$\Omega\ \text{m}^{-1}$`, "This is the unit of resistance per unit length (the gradient of R against L)."],
      [t`$\Omega\ \text{m}^{2}$`, "RA alone has this unit; dividing by L removes one metre."],
      [t`$\Omega^{-1}\ \text{m}^{-1}$`, "This is the unit of conductivity, the reciprocal of resistivity."],
    ],
    answer: "A",
    explanation: t`$\rho = \dfrac{RA}{L}$: $\dfrac{\Omega \times \text{m}^2}{\text{m}} = \Omega\ \text{m}$.`,
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Wire Y is made of the same metal as wire X. Y is twice as long as X and has twice the diameter. What is the ratio resistance of Y ÷ resistance of X?",
    options: [
      ["0.5", "Correct: R ∝ L/d² = 2/4."],
      ["1", "This treats the area as proportional to d, not d²."],
      ["2", "This doubles for length but ignores the larger area."],
      ["8", "This multiplies by the area factor instead of dividing."],
    ],
    answer: "A",
    explanation: t`$R = \dfrac{\rho L}{A}$ and $A \propto d^2$, so $\dfrac{R_Y}{R_X} = \dfrac{2}{2^2} = 0.5$.`,
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A uniform wire of resistance R is cut into four equal lengths, which are then connected side by side (in parallel). What is the resistance of the combination?",
    options: [
      [t`$R/16$`, "Correct: each piece is R/4, and four equal resistors in parallel give (R/4)/4."],
      [t`$R/4$`, "This is the resistance of one piece, not of four in parallel."],
      [t`$R$`, "Cutting and recombining in parallel changes the effective length and area."],
      [t`$4R$`, "Parallel combinations have a smaller resistance than any one branch."],
    ],
    answer: "A",
    explanation: "Each quarter has resistance R/4. Four equal resistances in parallel give (R/4) ÷ 4 = R/16. Equivalently, the length is ¼ and the area 4 times larger: R × ¼ ÷ 4.",
    hints: ["Find the resistance of one piece first."],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which material is most suitable for the element of an electric stove, and why?",
    options: [
      ["Nichrome, because its high resistivity gives a useful resistance in a short, robust wire", "Correct: an alloy with high resistivity that withstands high temperatures."],
      ["Copper, because its low resistivity lets a large current flow through the element", "Copper's resistance would be tiny; a short element would draw an enormous current."],
      ["Glass, because its very high resistivity produces the most heating in the element", "An insulator passes almost no current, so almost no heating occurs."],
      ["Pure silicon, because its resistivity falls as it is heated during cooking", "Its resistance would fall as it heated, so the current could run away."],
    ],
    answer: "A",
    explanation: "Heating elements use alloys such as nichrome: high resistivity gives the required resistance in a compact wire, and the alloy resists oxidation at high temperature.",
  });
  {
    const rho = 1.7e-8, L = 25, d = 2.5e-3;
    const R = (rho * L) / area(d);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`What is the resistance of a $25\ \text{m}$ length of copper wire of diameter $2.5\ \text{mm}$? (Resistivity of copper $= 1.7 \times 10^{-8}\ \Omega\ \text{m}$.)`,
      options: [
        [`${sfStr(R, 2)} Ω`, "Correct: R = ρL/A with A = πd²/4."],
        [`${sfStr((rho * L) / (Math.PI * d * d), 2)} Ω`, "This uses the diameter as the radius, making A four times too big."],
        [t`$${sciTex((rho * L) / (area(2.5) * 1e-3), 2)}\ \Omega$`, "This converts mm² to m² with 10⁻³ instead of 10⁻⁶."],
        [`${sfStr((rho * L) / area(d / 2), 2)} Ω`, "This halves the diameter twice (uses d/2 in πd²/4), making A four times too small."],
      ],
      answer: "A",
      explanation: t`$A = \pi(2.5 \times 10^{-3})^2/4 = ${sciTex(area(d))}\ \text{m}^2$; $R = \dfrac{1.7 \times 10^{-8} \times 25}{${sciTex(area(d))}} = ${sfStr(R, 2)}\ \Omega$.`,
      hints: ["A = πd²/4, with d in metres."],
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "In an experiment, the resistance R of different lengths L of a wire is measured using crocodile clips, and R is plotted against L. The best-fit straight line has a small positive intercept on the R-axis. What is the best explanation?",
    options: [
      ["The clips and connecting leads add a constant contact resistance to every reading.", "Correct: a systematic error that shifts every point up by the same amount."],
      ["The resistivity of the wire increases in proportion to its length.", "Resistivity is a property of the material, independent of length."],
      ["The longer lengths of wire heat up more than the short ones during the readings.", "Heating would curve the graph, not add a constant intercept."],
      ["The micrometer had a zero error when the diameter was measured.", "The diameter does not enter the graph of R against L at all."],
    ],
    answer: "A",
    explanation: "Contact resistance at the clips is the same for every length, so it shifts every reading by a constant: a positive intercept. Using the gradient (ρ/A) removes this systematic error.",
    hints: ["What is the same for every reading?"],
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which list places the materials in order of INCREASING resistivity at room temperature?",
    options: [
      ["copper, nichrome, silicon, glass", "Correct: about 10⁻⁸, 10⁻⁶, 10³ and 10¹⁰⁺ Ω m."],
      ["nichrome, copper, glass, silicon", "Copper (a pure metal) is lower than nichrome (an alloy); glass is highest."],
      ["copper, silicon, nichrome, glass", "Silicon (a semiconductor) has a far higher resistivity than nichrome."],
      ["glass, silicon, nichrome, copper", "This is decreasing order."],
    ],
    answer: "A",
    explanation: "Metals (~10⁻⁸ Ω m) < alloys (~10⁻⁶ Ω m) < semiconductors (~10⁻¹–10³ Ω m) < insulators (10¹⁰ Ω m and above).",
  });
  {
    const rho = 4.9e-7, d = 0.45e-3, R = 12;
    const L = (R * area(d)) / rho;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A $12\ \Omega$ resistor is to be made from constantan wire of diameter $0.45\ \text{mm}$ (resistivity $4.9 \times 10^{-7}\ \Omega\ \text{m}$). Calculate the length of wire needed, in m, to two significant figures.`,
      value: L, sf: 2, unit: "m", wrong: [(R * Math.PI * d * d) / rho],
      explanation: t`$A = \pi(0.45 \times 10^{-3})^2/4 = ${sciTex(area(d))}\ \text{m}^2$. $L = \dfrac{RA}{\rho} = \dfrac{12 \times ${sciTex(area(d))}}{4.9 \times 10^{-7}} = ${sfStr(L, 2)}\ \text{m}$.`,
      hints: ["Rearrange R = ρL/A for L."],
    });
  }
  {
    const L = 2.0, d = 0.50e-3, R = 0.174;
    const rho = (R * area(d)) / L;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A $2.0\ \text{m}$ length of wire of diameter $0.50\ \text{mm}$ has a resistance of $0.174\ \Omega$. Calculate the resistivity of the metal, in Ω m, to two significant figures.`,
      value: rho, sf: 2, unit: "Ω m", wrong: [(R * Math.PI * d * d) / L, (R * area(0.5)) / L],
      explanation: t`1. $A = \pi(0.50 \times 10^{-3})^2/4 = ${sciTex(area(d))}\ \text{m}^2$.
2. $\rho = \dfrac{RA}{L} = \dfrac{0.174 \times ${sciTex(area(d))}}{2.0} = ${sciTex(rho, 2)}\ \Omega\ \text{m}$ (close to copper).
3. Using the diameter as the radius gives a value four times too large.`,
      hints: ["ρ = RA/L."],
    });
  }
  {
    const rho = 2.8e-8, A = 4.0e-4, L = 15e3;
    const R = (rho * L) / A;
    const I = 320;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`An aluminium conductor of a transmission line has a cross-sectional area of $4.0 \times 10^{-4}\ \text{m}^2$ and a length of $15\ \text{km}$. The resistivity of aluminium is $2.8 \times 10^{-8}\ \Omega\ \text{m}$. It carries a current of $320\ \text{A}$. Calculate the power dissipated in the conductor, in kW, to two significant figures.`,
      value: (I * I * R) / 1000, sf: 2, unit: "kW", wrong: [(I * R) / 1000, (I * I * (rho * 15) / A) / 1000],
      explanation: t`1. $R = \dfrac{\rho L}{A} = \dfrac{2.8 \times 10^{-8} \times 1.5 \times 10^{4}}{4.0 \times 10^{-4}} = ${sfStr(R, 3)}\ \Omega$.
2. $P = I^2R = 320^2 \times ${sfStr(R, 3)} = ${sciTex(I * I * R, 2)}\ \text{W} = ${sfStr((I * I * R) / 1000, 2)}\ \text{kW}$.
3. Leaving the length in km gives a power 1000 times too small.`,
      hints: ["Convert km to m.", "Power lost = I²R."],
    });
  }
  {
    // stretched wire: length increased by 20% at constant volume
    const f = 1.2;
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A metal wire of resistance $8.0\ \Omega$ is drawn out uniformly until its length is 20% greater. Its volume and resistivity do not change. Calculate its new resistance, in Ω, to three significant figures.`,
      value: 8 * f * f, unit: "Ω", wrong: [8 * f, 8 * f * f * f],
      explanation: t`Constant volume: $A$ falls by the factor 1.2 as $L$ rises by 1.2. $R \propto L/A$, so $R$ rises by $1.2^2 = ${dpStr(f * f, 2)}$: $8.0 \times ${dpStr(f * f, 2)} = ${sfStr(8 * f * f, 3)}\ \Omega$. Forgetting the change in area gives only $9.60\ \Omega$.`,
      hints: ["What happens to A when L increases at constant volume?"],
    });
  }
  {
    // diameter from resistance of a nichrome wire
    const rho = 1.1e-6, L = 0.80, R = 12.5;
    const A = (rho * L) / R;
    const dmm = Math.sqrt((4 * A) / Math.PI) * 1000;
    b.num({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A $0.80\ \text{m}$ length of nichrome wire (resistivity $1.1 \times 10^{-6}\ \Omega\ \text{m}$) has a resistance of $12.5\ \Omega$. Calculate the diameter of the wire, in mm, to two significant figures.`,
      value: dmm, sf: 2, unit: "mm", wrong: [Math.sqrt(A / Math.PI) * 1000],
      explanation: t`$A = \dfrac{\rho L}{R} = \dfrac{1.1 \times 10^{-6} \times 0.80}{12.5} = ${sciTex(A)}\ \text{m}^2$. $d = \sqrt{4A/\pi} = ${sciTex(dmm / 1000, 2)}\ \text{m} = ${sfStr(dmm, 2)}\ \text{mm}$. Using $A = \pi r^2$ and stopping at $r$ gives the radius, $${sfStr(dmm / 2, 2)}\ \text{mm}$, half the diameter.`,
      hints: ["Find A from R = ρL/A, then d from A = πd²/4."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A long copper wire has a greater resistivity than a short copper wire of the same diameter.",
    answer: false,
    explanation: "False. The long wire has a greater resistance, but resistivity is a property of the material (copper) at a given temperature and does not depend on dimensions.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each material with the order of magnitude of its resistivity at room temperature.",
    pairs: [
      ["copper", t`$10^{-8}\ \Omega\ \text{m}$`],
      ["nichrome", t`$10^{-6}\ \Omega\ \text{m}$`],
      ["pure germanium", t`$10^{-1}\ \Omega\ \text{m}$`],
      ["PVC", t`$10^{13}\ \Omega\ \text{m}$`],
    ],
    explanation: "Metal ~10⁻⁸; alloy ~10⁻⁶; semiconductor (germanium ~0.5) ~10⁻¹; insulator (PVC) ~10¹³ Ω m.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statements about temperature and resistivity.",
    template: "When a metal is heated its resistivity {{blank:a}} because the lattice ions vibrate more. When a pure semiconductor is heated its resistivity {{blank:b}} because the number density of charge carriers {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["increases"], choices: ["increases", "decreases", "does not change"] },
      { id: "b", accepted: ["decreases"], choices: ["increases", "decreases", "does not change"] },
      { id: "c", accepted: ["increases"], choices: ["increases", "decreases", "does not change"] },
    ],
    explanation: "Metals: more collisions, ρ rises. Semiconductors: many more carriers, ρ falls.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the instrument normally used to measure the diameter of a resistance wire.",
    accepted: ["micrometer", "micrometer screw gauge", "a micrometer", "micrometer gauge", "digital micrometer"],
    explanation: "A **micrometer screw gauge** reads to 0.01 mm, which is needed because the diameter appears squared in A.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "Define resistivity, naming the symbols you use.",
    points: [
      "ρ = RA/L (or R = ρL/A)…",
      "…where R is the resistance of a uniform sample (conductor) of length L and cross-sectional area A.",
    ],
    modelAnswer: "Resistivity ρ = RA/L, where R is the resistance of a uniform conductor of the material with length L and cross-sectional area A.",
    explanation: "Give the equation and define each symbol.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "In a resistivity experiment, explain why the diameter of the wire is usually the largest source of uncertainty, and describe how its measurement should be made.",
    points: [
      "The diameter is small (well under 1 mm), so its percentage uncertainty is large for a given reading uncertainty.",
      "A depends on d², so the percentage uncertainty in d is doubled in A (and in ρ).",
      "Measure with a micrometer (checking zero error) at several points along the wire and in perpendicular directions, then average.",
    ],
    modelAnswer: "The wire's diameter is tiny, so even a 0.01 mm reading uncertainty is a large percentage, and because A ∝ d² that percentage is doubled in the area and hence in ρ. The diameter should be measured with a micrometer, after checking its zero error, at several points along the wire and in two perpendicular directions, and the mean taken.",
    explanation: "Small reading, squared in the formula.",
    hints: ["How does the uncertainty in d affect A?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why aluminium, rather than copper, is used for overhead transmission lines, although copper has the lower resistivity.",
    points: [
      "Aluminium has a much lower density than copper.",
      "For the same resistance per kilometre an aluminium conductor needs a larger cross-section, but it is still much lighter (lower mass per unit length).",
      "Lighter cables need fewer / less massive pylons and sag less, and aluminium is cheaper.",
    ],
    modelAnswer: "Aluminium's resistivity is only about 1.6 times copper's, but its density is less than a third of copper's. A thicker aluminium conductor with the same resistance is therefore much lighter, so it sags less and needs lighter pylons spaced further apart, and the metal is also cheaper.",
    explanation: "Compare resistance per unit mass, not resistivity alone.",
    hints: ["Think about mass as well as resistance."],
  });

  // Practice structured: resistivity of nichrome from an R-L graph (14 marks)
  {
    const d = [0.36, 0.37, 0.36, 0.35, 0.36];
    const dm = mean(d), dd = halfRange(d);
    const L = [0.25, 0.35, 0.45, 0.55, 0.65, 0.75];
    const rhoTrue = 1.1e-6;
    const k = rhoTrue / area(dm * 1e-3);
    const nz = [0.08, -0.1, 0.05, 0.11, -0.07, 0.04];
    const R = L.map((l, i) => Math.round((k * l + 0.2 + nz[i]) * 10) / 10);
    const fit = linFit(L, R);
    const A = area(dm * 1e-3);
    const rho = fit.m * A;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Chipo measures the resistance $R$ of different lengths $L$ of a nichrome wire using an ohmmeter and two crocodile clips. Her micrometer readings of the diameter are $${d.map((x) => x.toFixed(2)).join("$, $")}\ \text{mm}$.

${table([t`$L\,/\,\text{m}$`, t`$R\,/\,\Omega$`], L.map((l, i) => [dpStr(l, 2), dpStr(R[i], 1)]))}`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the mean diameter, in mm, to three significant figures.", value: dm, unit: "mm", wrong: [d[0]], explanation: t`Mean $= ${sfStr(dm, 3)}\ \text{mm}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the percentage uncertainty in the cross-sectional area, using half the range of the diameter readings, to two significant figures.", value: 2 * pctUnc(dd, dm), sf: 2, unit: "%", wrong: [pctUnc(dd, dm)], explanation: t`$\Delta d = (0.37 - 0.35)/2 = ${dpStr(dd, 2)}\ \text{mm}$: $${sfStr(pctUnc(dd, dm), 2)}\%$ in $d$, doubled for $A \propto d^2$: $${sfStr(2 * pctUnc(dd, dm), 2)}\%$.` }),
        P.num({ label: "(c)", marks: 3, stem: t`Plot $R$ against $L$, draw the best-fit line and determine its gradient, in $\Omega\ \text{m}^{-1}$.`, value: fit.m, tol: 0.4, wrong: [1 / fit.m], explanation: t`A best-fit line gives a gradient of about $${sfStr(fit.m, 3)}\ \Omega\ \text{m}^{-1}$ (a careful line gives within about 0.4 of this).` }),
        P.num({ label: "(d)", marks: 3, stem: "Use your gradient and the mean diameter to determine the resistivity of nichrome, in Ω m, to two significant figures.", value: rho, tol: 0.06e-6, unit: "Ω m", wrong: [fit.m * Math.PI * (dm * 1e-3) ** 2], explanation: t`$A = \pi(${sfStr(dm, 3)} \times 10^{-3})^2/4 = ${sciTex(A)}\ \text{m}^2$; $\rho = \text{gradient} \times A \approx ${sfStr(fit.m, 3)} \times ${sciTex(A)} = ${sciTex(rho, 2)}\ \Omega\ \text{m}$.` }),
        P.num({ label: "(e)", marks: 1, stem: "Determine the intercept of your line on the R-axis, in Ω.", value: fit.c, tol: 0.15, unit: "Ω", wrong: [0], explanation: t`About $${dpStr(fit.c, 2)}\ \Omega$.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain the intercept and why using the gradient gives a more reliable value of ρ than a single reading.", points: ["The intercept is the constant resistance of the clips, leads and contacts (a systematic error).", "The gradient ΔR/ΔL is unaffected by a constant added resistance, and it averages over all the readings."], modelAnswer: "The intercept is the contact resistance of the clips and leads, which is added to every reading. The gradient depends only on the change in R with L, so this constant error cancels, and it uses all the readings rather than one." }),
        P.manual({ label: "(g)", marks: 2, stem: "Suggest two further improvements to the experiment.", points: ["Use a small current / switch off between readings so the wire does not heat up (resistivity changes with temperature).", "Measure L from the inner edges of the clips with the wire straight and taut along the rule; use longer lengths (larger R) for smaller percentage uncertainty."], modelAnswer: "Keep the current small and switch off between readings so the wire stays at room temperature, and keep the wire taut along the rule, measuring L between the contact points of the clips; using longer lengths gives larger resistances and smaller percentage uncertainties." }),
      ],
      explanation: "Gradient of R against L = ρ/A; ρ = gradient × A; the intercept is contact resistance.",
      hints: ["A = πd²/4 with d in metres.", "Use a large triangle for the gradient."],
    });
    chk(R.length, 6);
  }
  // Practice structured: designing a heating element (8 marks)
  {
    const V = 230, Pw = 1000, rho = 1.1e-6, d = 0.40e-3;
    const R = (V * V) / Pw;
    const L = (R * area(d)) / rho;
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`Tendai designs a $1.0\ \text{kW}$ element for a $230\ \text{V}$ supply, using nichrome wire of diameter $0.40\ \text{mm}$ and resistivity $1.1 \times 10^{-6}\ \Omega\ \text{m}$ at its working temperature.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the resistance needed at the working temperature, in Ω, to three significant figures.", value: R, unit: "Ω", wrong: [V / Pw], explanation: t`$R = V^2/P = 230^2/1000 = ${sfStr(R, 3)}\ \Omega$.` }),
        P.num({ label: "(b)", marks: 3, stem: "Calculate the length of wire required, in m, to three significant figures.", value: L, unit: "m", wrong: [(R * Math.PI * d * d) / rho], explanation: t`$A = \pi(0.40 \times 10^{-3})^2/4 = ${sciTex(area(d))}\ \text{m}^2$; $L = RA/\rho = ${sfStr(R, 3)} \times ${sciTex(area(d))}/(1.1 \times 10^{-6}) = ${sfStr(L, 3)}\ \text{m}$.` }),
        P.manual({ label: "(c)", marks: 1, stem: "State how the length would change if a wire of twice the diameter were used.", points: ["Four times as long (A is four times larger, so L = RA/ρ is four times larger)."], modelAnswer: "The length would need to be four times greater, because the area is four times larger." }),
        P.manual({ label: "(d)", marks: 2, stem: "The element is coiled to fit inside the appliance. Suggest why it is not made of copper wire.", points: ["Copper's resistivity is about 60 times smaller, so the wire would need to be impractically long (or impossibly thin) for the same resistance.", "Copper oxidises at high temperatures (nichrome forms a protective oxide layer and has a high melting point)."], modelAnswer: "Copper's resistivity is far smaller, so a copper element would have to be very long or extremely thin to reach about 53 Ω, and copper oxidises rapidly when red hot, whereas nichrome withstands high temperatures." }),
      ],
      explanation: "R from the power rating; L = RA/ρ.",
      hints: ["R = V²/P.", "Rearrange R = ρL/A."],
    });
  }

  b.card("DEFINITION", "**Resistivity**", "ρ = RA/L, where R is the resistance of a uniform sample of length L and cross-sectional area A; unit Ω m.");
  b.card("FORMULA", "Resistance of a uniform wire", t`$R = \dfrac{\rho L}{A}$, with $A = \dfrac{\pi d^2}{4}$`);
  b.card("CONCEPT", "Resistance and wire dimensions", "R ∝ L and R ∝ 1/A ∝ 1/d²: doubling the diameter quarters the resistance.");
  b.card("CONCEPT", "Stretching a wire to n times its length (constant volume)", "Area falls by n, so the resistance rises by n².");
  b.card("FACT", "Typical resistivities", "Metals ~10⁻⁸ Ω m; alloys ~10⁻⁶ Ω m; semiconductors ~10⁻¹–10³ Ω m; insulators 10¹⁰ Ω m and above.");
  b.card("CONCEPT", "Temperature and resistivity", "Metals: ρ rises (more lattice collisions). Semiconductors: ρ falls (more charge carriers).");
  b.card("CONCEPT", "Resistivity experiment: graph", "Plot R against L: gradient = ρ/A, so ρ = gradient × A; a positive intercept is contact resistance.");
  b.card("CONCEPT", "Largest uncertainty in a resistivity experiment", "The diameter: small and squared in A, so its percentage uncertainty is doubled.");
});
