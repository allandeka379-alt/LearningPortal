// W1b: aphys.solids.stress-strain-young — stress, strain, Young modulus, stress-strain graphs, wire experiment.
import { concept, P, t, chk, sfStr, dpStr, sciTex, pctUnc, linFit, table } from "../lib.mjs";

const area = (d) => (Math.PI * d * d) / 4;
concept("aphys.solids.stress-strain-young", { file: "solids/stress-strain-young", keyPrefix: "solids.stress-strain-young" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is the definition of the Young modulus?",
    options: [
      ["tensile stress ÷ tensile strain", "Correct: E = σ/ε, within the limit of proportionality."],
      ["tensile strain ÷ tensile stress", "This is the reciprocal of the Young modulus."],
      ["force ÷ extension", "This is the spring constant of a particular sample, not a property of the material."],
      ["tensile stress × tensile strain", "Stress × strain has the unit of energy per unit volume (×2), not a modulus."],
    ],
    answer: "A",
    explanation: "E = stress / strain = (F/A)/(x/L), a property of the material, in Pa.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the unit of tensile strain?",
    options: [
      ["It has no unit.", "Correct: strain is extension ÷ original length, a ratio of two lengths."],
      ["Pa", "The pascal is the unit of stress and of the Young modulus."],
      ["m", "Extension has the unit m; strain divides it by another length."],
      [t`$\text{N m}^{-1}$`, "This is the unit of the spring constant."],
    ],
    answer: "A",
    explanation: "ε = x/L: metres ÷ metres, so strain is dimensionless (sometimes quoted as a percentage).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Two wires are made of the same steel. Wire P is longer and thicker than wire Q. Which quantity is the same for both?",
    options: [
      ["the Young modulus", "Correct: it is a property of the material, independent of the sample's dimensions."],
      ["the spring constant", "k = EA/L depends on the area and the length."],
      ["the extension under a 50 N load", "Extension depends on length and area as well as the material."],
      ["the load needed to break the wire", "The breaking load depends on the cross-sectional area (breaking stress × area)."],
    ],
    answer: "A",
    explanation: "Stress and strain remove the effects of area and length, so E depends only on the material.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Wire B is made of the same metal as wire A. It is twice as long and has twice the diameter. The same load is applied to both (within the limit of proportionality). What is the extension of B compared with A?",
    options: [
      ["half as large", "Correct: x = FL/(AE); L doubles (×2), A quadruples (÷4): overall ×½."],
      ["the same", "Doubling the length doubles x, but doubling the diameter quadruples the area."],
      ["twice as large", "This forgets that the area depends on the square of the diameter."],
      ["a quarter as large", "This forgets that doubling the length doubles the extension."],
    ],
    answer: "A",
    explanation: t`$x = \dfrac{FL}{AE}$ with $A = \pi d^2/4$, so $x \propto L/d^2$: $\dfrac{2}{2^2} = \tfrac{1}{2}$.`,
    hints: ["Write x in terms of F, L, A and E.", "How does area depend on diameter?"],
  });
  {
    const F = 50, d = 0.8e-3;
    const s = F / area(d);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`A load of $50\ \text{N}$ hangs from a wire of diameter $0.80\ \text{mm}$. What is the tensile stress in the wire?`,
      options: [
        [t`$${sciTex(s)}\ \text{Pa}$`, "Correct: A = π(0.40 × 10⁻³)²."],
        [t`$${sciTex(F / (Math.PI * d * d))}\ \text{Pa}$`, "This uses the diameter as the radius, so the area is four times too large."],
        [t`$${sciTex(F / (Math.PI * 0.4 * 0.4))}\ \text{Pa}$`, "The radius was left in mm; it must be converted to m."],
        [t`$${sciTex(F * area(d))}\ \text{Pa}$`, "This multiplies by the area instead of dividing."],
      ],
      answer: "A",
      explanation: t`$A = \pi r^2 = \pi (0.40 \times 10^{-3})^2 = ${sciTex(area(d))}\ \text{m}^2$; $\sigma = 50 / ${sciTex(area(d))} = ${sciTex(s)}\ \text{Pa}$.`,
      hints: ["Radius = diameter ÷ 2, in metres."],
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement correctly describes the stress-strain graph of a brittle material such as glass?",
    options: [
      ["It is a straight line up to the point where the material breaks.", "Correct: brittle materials have no plastic region and fracture suddenly."],
      ["It shows a large region where strain increases at almost constant stress before breaking.", "That plastic region is typical of ductile metals such as copper."],
      ["It is curved from the origin, becoming steeper as the strain increases.", "That shape is typical of rubber."],
      ["Its gradient is zero, because brittle materials have no Young modulus.", "Brittle materials can be very stiff, with a large Young modulus."],
    ],
    answer: "A",
    explanation: "Glass obeys Hooke's law until it fractures: the graph is straight to the breaking point, with no yield or plastic region.",
    hints: ["Brittle means it breaks without stretching plastically."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "In the Young modulus experiment, a second, identical reference wire hangs from the same support beside the test wire, and the extension is read from a vernier scale joining them. What is the main purpose of the reference wire?",
    options: [
      ["To cancel the effect of temperature changes and of the support sagging", "Correct: both wires expand or move together, so only the test wire's extension due to the load is measured."],
      ["To double the load on the test wire so that the extension is larger", "The reference wire carries a fixed load, not part of the test load."],
      ["To provide a second set of readings for averaging", "Its own extension is not measured; it acts as a fixed reference."],
      ["To measure the diameter of the test wire more accurately", "The diameter is measured with a micrometer."],
    ],
    answer: "A",
    explanation: "The vernier measures the extension of the test wire relative to the reference wire. Thermal expansion or sagging of the beam affects both equally and cancels.",
    hints: ["What could change the length of both wires equally?"],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`A wire of original length $1.60\ \text{m}$ extends by $2.4\ \text{mm}$. Calculate the tensile strain.`,
    value: 2.4e-3 / 1.6, wrong: [2.4 / 1.6],
    explanation: t`$\varepsilon = x/L = \dfrac{2.4 \times 10^{-3}}{1.60} = ${sciTex(2.4e-3 / 1.6, 2)}$ (no unit). Leaving the extension in mm gives 1.5, a strain of 150%, which is impossible for a metal wire.`,
  });
  {
    const L = 2.2, d = 0.6e-3, F = 60, x = 2.3e-3;
    const E = (F * L) / (area(d) * x);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A steel guitar-style wire of length $2.20\ \text{m}$ and diameter $0.60\ \text{mm}$ extends by $2.30\ \text{mm}$ when the tension is $60\ \text{N}$. Calculate the Young modulus of the steel, in Pa, to three significant figures.`,
      value: E, unit: "Pa", wrong: [(F * L) / (Math.PI * d * d * x), (F * L) / (area(d) * 2.3)],
      explanation: t`1. $A = \pi(0.30 \times 10^{-3})^2 = ${sciTex(area(d))}\ \text{m}^2$.
2. $\sigma = 60/${sciTex(area(d))} = ${sciTex(F / area(d))}\ \text{Pa}$.
3. $\varepsilon = 2.30 \times 10^{-3}/2.20 = ${sciTex(x / L)}$.
4. $E = \sigma/\varepsilon = ${sciTex(E)}\ \text{Pa}$. Using the diameter in $\pi r^2$ gives a value four times too small.`,
      hints: ["Find the stress and the strain separately.", "Convert mm to m."],
    });
  }
  {
    const E = 7.0e10, L = 250, F = 5000, A = 2.0e-4;
    const x = (F * L) / (A * E);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A span of aluminium overhead conductor is $250\ \text{m}$ long with a cross-sectional area of $2.0 \times 10^{-4}\ \text{m}^2$. The tension in it is $5000\ \text{N}$. Taking the Young modulus of aluminium as $7.0 \times 10^{10}\ \text{Pa}$, calculate the extension caused by the tension, in m, to three significant figures.`,
      value: x, unit: "m", wrong: [(F * L) / E, F / (A * E)],
      explanation: t`1. $\sigma = 5000/(2.0 \times 10^{-4}) = ${sciTex(F / A, 2)}\ \text{Pa}$.
2. $\varepsilon = \sigma/E = ${sciTex(F / A / E)}$.
3. $x = \varepsilon L = ${sciTex(F / A / E)} \times 250 = ${sfStr(x, 3)}\ \text{m}$.`,
      hints: ["Strain = stress ÷ E.", "Extension = strain × length."],
    });
  }
  {
    const uts = 4.0e8, d = 12e-3;
    const F = uts * area(d);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A steel hoist cable has a diameter of $12\ \text{mm}$. The ultimate tensile stress of the steel is $4.0 \times 10^{8}\ \text{Pa}$. Calculate the tension that would break the cable, in N, to three significant figures.`,
      value: F, unit: "N", wrong: [uts * Math.PI * d * d, uts / area(d)],
      explanation: t`1. $A = \pi(6.0 \times 10^{-3})^2 = ${sciTex(area(d))}\ \text{m}^2$.
2. $F = \sigma A = 4.0 \times 10^{8} \times ${sciTex(area(d))} = ${sciTex(F)}\ \text{N}$.
3. In practice a hoist is loaded to only a fraction of this (a safety factor).`,
      hints: ["Breaking force = ultimate tensile stress × area."],
    });
  }
  {
    const d = 0.38, dd = 0.01, x = 1.7, dx = 0.1;
    const pct = 2 * pctUnc(dd, d) + pctUnc(dx, x);
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`In a Young modulus experiment the diameter is $(0.38 \pm 0.01)\ \text{mm}$ and the extension is $(${x} \pm 0.1)\ \text{mm}$. The uncertainties in the load and the length are negligible. Calculate the percentage uncertainty in the Young modulus, to two significant figures.`,
      value: pct, sf: 2, unit: "%", wrong: [pctUnc(dd, d) + pctUnc(dx, x)],
      explanation: t`$E = \dfrac{4FL}{\pi d^2 x}$. Diameter: $2 \times \dfrac{0.01}{0.38} \times 100 = ${sfStr(2 * pctUnc(dd, d), 2)}\%$ (squared, so doubled). Extension: $\dfrac{0.1}{${x}} \times 100 = ${sfStr(pctUnc(dx, x), 2)}\%$. Total $= ${sfStr(pct, 2)}\%$.`,
      hints: ["The diameter is squared in the area.", "Add the percentage uncertainties."],
    });
  }
  {
    const grad = 8.4e4, L = 2.0, A = 8.0e-7;
    const E = (grad * L) / A;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A graph of load against extension for a wire of original length $2.00\ \text{m}$ and cross-sectional area $8.0 \times 10^{-7}\ \text{m}^2$ has gradient $8.4 \times 10^{4}\ \text{N m}^{-1}$. Calculate the Young modulus, in Pa, to three significant figures.`,
      value: E, unit: "Pa", wrong: [(grad * A) / L, grad / A],
      explanation: t`$E = \dfrac{F}{x} \times \dfrac{L}{A} = 8.4 \times 10^{4} \times \dfrac{2.00}{8.0 \times 10^{-7}} = ${sciTex(E)}\ \text{Pa}$.`,
      hints: ["The gradient is F/x; E = (F/x)(L/A)."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A longer wire of the same material has a smaller Young modulus because it stretches more.",
    answer: false,
    explanation: "False. A longer wire does stretch more, but its strain (x/L) is the same for the same stress, so E is unchanged. E is a property of the material.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each quantity with its definition.",
    pairs: [
      ["tensile stress", "force per unit cross-sectional area"],
      ["tensile strain", "extension per unit original length"],
      ["Young modulus", "stress ÷ strain in the proportional region"],
      ["ultimate tensile stress", "maximum stress before the material breaks"],
    ],
    explanation: "Stress and the Young modulus are in Pa; strain has no unit.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "On a stress-strain graph the gradient of the straight region equals the {{blank:a}}. A {{blank:b}} material, such as copper, shows a large plastic region before breaking, whereas a {{blank:c}} material, such as glass, breaks without plastic deformation.",
    blanks: [
      { id: "a", accepted: ["Young modulus"], choices: ["Young modulus", "spring constant", "breaking stress"] },
      { id: "b", accepted: ["ductile"], choices: ["ductile", "brittle", "elastic"] },
      { id: "c", accepted: ["brittle"], choices: ["brittle", "ductile", "plastic"] },
    ],
    explanation: "Gradient of stress against strain = E. Ductile metals deform plastically; brittle materials fracture suddenly.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the maximum stress a material can withstand before it breaks.",
    accepted: ["ultimate tensile stress", "UTS", "ultimate tensile strength", "tensile strength"],
    wrong: ["breaking point"],
    explanation: "The **ultimate tensile stress** (UTS), the maximum on the stress-strain graph.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 5,
    stem: "Describe how to determine the Young modulus of a metal in the form of a long wire. Include the measurements, the instruments and how the result is obtained from a graph.",
    points: [
      "Long wire (about 2 m) clamped to a rigid support; reference wire with vernier, or wire over a pulley with a marker and fixed scale.",
      "Measure the original length L with a metre rule / tape from the clamp to the marker.",
      "Measure the diameter with a micrometer at several places and in perpendicular directions; average; A = πd²/4.",
      "Add loads in equal steps and record the extension each time (vernier); repeat on unloading.",
      "Plot load F against extension x; E = gradient × L/A.",
    ],
    modelAnswer: "Clamp a long wire (about 2 m) to a rigid beam beside an identical reference wire carrying a small fixed load, joined by a vernier scale. Measure the original length L from the clamp to the vernier with a tape. Measure the diameter with a micrometer at several points in two perpendicular directions, average it and calculate A = πd²/4. Add masses in equal steps and read the extension on the vernier each time, then repeat while unloading. Plot load against extension; the Young modulus is the gradient multiplied by L/A.",
    explanation: "Long wire, reference/vernier, micrometer, stepwise loading and the graph analysis each earn a mark.",
    hints: ["Which measurement needs the most precise instrument?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how the stress-strain graphs of a ductile metal and a brittle material differ, and explain why a ductile cable is safer for a mine hoist.",
    points: [
      "Both start with a straight (Hooke's law) region.",
      "The ductile metal then has a large plastic region (yield, large strain) before reaching its UTS and breaking; the brittle material breaks at the end of the straight region.",
      "A ductile cable stretches visibly / gives warning before failing (absorbs more energy), whereas a brittle one snaps suddenly.",
    ],
    modelAnswer: "Both graphs begin with a straight line through the origin. The ductile metal then yields and extends plastically by a large strain before reaching its ultimate tensile stress and breaking, while the brittle material fractures at the end of its straight region. A ductile cable stretches noticeably and absorbs energy before it fails, giving warning, while a brittle one would snap without warning.",
    explanation: "The plastic region is the key difference.",
    hints: ["Think about what happens after the limit of proportionality."],
  });

  // Practice structured: Young modulus from load-extension data (12 marks)
  {
    const L = 2.45, dReads = [0.34, 0.35, 0.35, 0.36, 0.35]; // mm
    const d = dReads.reduce((a, c) => a + c, 0) / dReads.length;
    const F = [0, 10, 20, 30, 40, 50];
    const x = [0, 1.29, 2.53, 3.84, 5.08, 6.39]; // mm
    const fit = linFit(x.map((v) => v / 1000), F);
    const A = area(d / 1000);
    const E = (fit.m * L) / A;
    const pct = 2 * pctUnc(0.01, d) + pctUnc(0.05, x[5]) + pctUnc(0.005, L);
    const tab = table([t`$F\,/\,\text{N}$`, t`$x\,/\,\text{mm}$`], F.map((f, i) => [String(f), x[i].toFixed(2)]));
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Thandeka investigates a steel wire of original length $(${L} \pm 0.005)\ \text{m}$. Micrometer readings of its diameter are $${dReads.join("$, $")}\ \text{mm}$ (each $\pm 0.01\ \text{mm}$). She adds loads and reads the extension on a vernier to $\pm 0.05\ \text{mm}$.

${tab}`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the mean diameter, in mm.", value: d, dp: 2, unit: "mm", wrong: [0.34], explanation: t`Mean $= ${dpStr(d, 2)}\ \text{mm}$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate the cross-sectional area, in $\text{m}^2$, to three significant figures.`, value: A, unit: "m²", wrong: [Math.PI * (d / 1000) ** 2], explanation: t`$A = \pi(${dpStr(d / 2, 3)} \times 10^{-3})^2 = ${sciTex(A)}\ \text{m}^2$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Plot $F$ against $x$ (in m) and determine the gradient, in $\text{N m}^{-1}$, to three significant figures.`, value: fit.m, tol: 150, unit: "N/m", wrong: [fit.m / 1000], explanation: t`The points lie on a straight line through the origin; gradient $\approx ${sciTex(fit.m)}\ \text{N m}^{-1}$ (e.g. $50/(${x[5]} \times 10^{-3})$).` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the Young modulus, in Pa, to two significant figures.", value: E, sf: 2, tol: 0.06e11, unit: "Pa", wrong: [(fit.m * L) / (Math.PI * (d / 1000) ** 2)], explanation: t`$E = \text{gradient} \times \dfrac{L}{A} = ${sciTex(fit.m)} \times \dfrac{${L}}{${sciTex(A)}} = ${sciTex(E, 2)}\ \text{Pa}$.` }),
        P.num({ label: "(e)", marks: 3, stem: "Using the largest extension, estimate the percentage uncertainty in E from the diameter, the extension and the length, to two significant figures.", value: pct, sf: 2, unit: "%", wrong: [pctUnc(0.01, d) + pctUnc(0.05, x[5]) + pctUnc(0.005, L)],
          explanation: t`Diameter (squared): $2 \times \dfrac{0.01}{${dpStr(d, 2)}} \times 100 = ${sfStr(2 * pctUnc(0.01, d), 2)}\%$; extension: $\dfrac{0.05}{${x[5]}} \times 100 = ${sfStr(pctUnc(0.05, x[5]), 2)}\%$; length: $${sfStr(pctUnc(0.005, L), 1)}\%$. Total $\approx ${sfStr(pct, 2)}\%$.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Suggest two changes that would reduce the uncertainty in E.", points: ["Use a thicker wire or more precise micrometer / take more diameter readings: the diameter term dominates.", "Use a longer wire (larger extensions) or larger loads within the elastic region, so the extension's percentage uncertainty falls."], modelAnswer: "The diameter term dominates, so take more readings with a more precise micrometer (or use a thicker wire). Use a longer wire so the extensions, and hence their percentage precision, are larger." }),
      ],
      explanation: "E = gradient × L/A; the squared diameter carries the largest share of the uncertainty.",
      hints: ["Convert mm to m before calculating the area and the gradient."],
    });
  }

  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Explain why the wire used to measure the Young modulus of a metal is long and thin.",
    points: [
      "x = FL/(AE): a long wire gives a larger extension for a given load.",
      "A thin wire has a small cross-sectional area, so the stress (and extension) is larger for a given load / a manageable load.",
      "A larger extension has a smaller percentage uncertainty, so E is more precise.",
    ],
    modelAnswer: "The extension is x = FL/(AE). A long wire increases x, and a thin wire has a small area, so a modest load produces a large stress and a large extension. A larger extension can be measured with a smaller percentage uncertainty, making E more precise.",
    explanation: "Metal wires extend very little; length and small area make the extension measurable.",
    hints: ["Write the extension in terms of F, L, A and E."],
  });
  {
    const strain = [0, 1.0, 2.0, 3.0, 4.0, 6.0, 10, 20, 30]; // × 10^-3
    const stress = [0, 70, 140, 205, 240, 260, 275, 280, 270]; // MPa
    const E = 140e6 / 2.0e-3;
    const uts = 280e6;
    const d = 10e-3;
    const Fmax = uts * area(d);
    const tab = table(["strain / 10⁻³", "stress / MPa"], strain.map((v, i) => [String(v), String(stress[i])]));
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A test machine stretches a sample of an aluminium alloy until it breaks. The results are:

${tab}

The sample breaks at the last reading.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Determine the Young modulus of the alloy from the straight part of the data, in Pa.", value: E, tol: 0.3e10, unit: "Pa", wrong: [140 / 2.0], explanation: t`Straight region (strain up to about $2 \times 10^{-3}$): gradient $= \dfrac{140 \times 10^{6}}{2.0 \times 10^{-3}} = ${sciTex(E, 2)}\ \text{Pa}$.` }),
        P.num({ label: "(b)", marks: 1, stem: "State the ultimate tensile stress, in Pa.", value: uts, unit: "Pa", wrong: [270e6], explanation: t`The maximum stress is $280\ \text{MPa} = ${sciTex(uts, 2)}\ \text{Pa}$; the breaking stress (270 MPa) is lower.` }),
        P.manual({ label: "(c)", marks: 2, stem: "State whether the alloy is ductile or brittle, with a reason from the data.", points: ["Ductile.", "After the straight region the strain increases greatly (from about 0.004 to 0.030) with little increase in stress: a large plastic region before fracture."], modelAnswer: "Ductile: beyond the straight region the strain rises from about 0.004 to 0.030 while the stress hardly changes, showing large plastic deformation before it breaks." }),
        P.num({ label: "(d)", marks: 2, stem: t`Calculate the largest tension a rod of this alloy, $10\ \text{mm}$ in diameter, can withstand before breaking, in N, to three significant figures.`, value: Fmax, unit: "N", wrong: [uts * Math.PI * d * d], explanation: t`$F = \sigma_{\text{UTS}} A = 2.80 \times 10^{8} \times \pi(5.0 \times 10^{-3})^2 = ${sciTex(Fmax)}\ \text{N}$.` }),
        P.manual({ label: "(e)", marks: 1, stem: "Estimate the stress at the limit of proportionality.", points: ["About 200-210 MPa (between strains of 3 × 10⁻³ and 4 × 10⁻³ the graph stops being straight)."], modelAnswer: "About 205 MPa: the points stay on the straight line up to a strain of about 3 × 10⁻³ and fall below it after that." }),
      ],
      explanation: "E is the gradient of the straight region; the UTS is the maximum stress; a long flat region shows ductility.",
      hints: ["Use only the straight part for the gradient.", "Breaking force = UTS × area."],
    });
  }

  b.card("DEFINITION", "**Tensile stress**", "Force per unit cross-sectional area, σ = F/A, in Pa.");
  b.card("DEFINITION", "**Tensile strain**", "Extension per unit original length, ε = x/L; no unit.");
  b.card("DEFINITION", "**Young modulus**", "Tensile stress ÷ tensile strain (within the limit of proportionality), in Pa.");
  b.card("FORMULA", "Young modulus in terms of measured quantities", t`$E = \dfrac{FL}{Ax}$, with $A = \dfrac{\pi d^2}{4}$`);
  b.card("FACT", "Young modulus of steel (order of magnitude)", t`About $2 \times 10^{11}\ \text{Pa}$`);
  b.card("DEFINITION", "**Ultimate tensile stress**", "The maximum stress a material can withstand before breaking.");
  b.card("CONCEPT", "Ductile vs brittle", "Ductile: large plastic region before breaking (copper). Brittle: breaks at the end of the elastic region (glass).");
  b.card("CONCEPT", "Why use a reference wire?", "It cancels the effects of temperature change and sagging of the support on the measured extension.");
  b.card("CONCEPT", "Largest uncertainty in the wire experiment", "The diameter, because it is small and is squared in the area (its percentage uncertainty counts twice).");
});
