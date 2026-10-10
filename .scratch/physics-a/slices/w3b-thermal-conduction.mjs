// W3b: aphys.matter.thermal-conduction (ZIMSEC only) — mechanisms, temperature gradient, Q/t = kAΔθ/x, lagged and
// unlagged bars, composite walls, Searle's bar and Lees' disc in outline.
import { concept, P, t, chk, sfStr, dpStr, sciTex, pctUnc, table } from "../lib.mjs";

const rate = (k, A, dT, x) => (k * A * dT) / x;

concept("aphys.matter.thermal-conduction", { file: "matter/thermal-conduction", keyPrefix: "matter.thermal-conduction" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the SI unit of thermal conductivity?",
    options: [
      [t`$\text{W m}^{-1}\ \text{K}^{-1}$`, "Correct: k = (Q/t)x/(AΔθ) → W × m ÷ (m² × K)."],
      [t`$\text{W m}^{-2}\ \text{K}^{-1}$`, "This would be a rate per unit area per kelvin, missing the thickness."],
      [t`$\text{J kg}^{-1}\ \text{K}^{-1}$`, "That is the unit of specific heat capacity."],
      [t`$\text{W m K}^{-1}$`, "The area (m²) in the denominator makes the power of metres −1, not +1."],
    ],
    answer: "A",
    explanation: t`$k = \dfrac{(Q/t)\,x}{A\,\Delta\theta}$ has unit $\dfrac{\text{W} \times \text{m}}{\text{m}^2 \times \text{K}} = \text{W m}^{-1}\ \text{K}^{-1}$.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why are metals much better thermal conductors than non-metals such as glass?",
    options: [
      ["Metals have free electrons that move fast and carry energy through the lattice.", "Correct: electron transport adds to the slower lattice-vibration mechanism."],
      ["The atoms in metals vibrate with larger amplitudes than atoms in glass.", "Vibration amplitude depends on temperature; lattice vibrations alone are slow in every solid."],
      ["Metals are denser, so heat has less distance to travel between neighbouring atoms.", "Density does not explain it: lead is dense but conducts worse than aluminium."],
      ["Convection currents can form inside a metal but not inside glass.", "Convection needs a fluid that can flow; neither solid has convection."],
    ],
    answer: "A",
    explanation: "Delocalised electrons gain energy in hot regions and travel quickly to cooler regions, colliding with the lattice there.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A metal bar, heated at one end and cooled at the other, is well lagged. In the steady state, how does the temperature vary along it?",
    options: [
      ["It falls linearly, because the same rate of energy flows through every section.", "Correct: constant Q/t, k and A give a constant gradient."],
      ["It falls steeply at first and then more gently, because energy is lost from the sides.", "That describes an unlagged bar."],
      ["It is the same all along the bar once the steady state is reached.", "There must be a temperature gradient for energy to flow."],
      ["It falls gently at first and more steeply near the cold end.", "With no side losses the gradient is constant, not increasing."],
    ],
    answer: "A",
    explanation: "Lagged: Q/t is the same through each cross-section, so Δθ/Δx = (Q/t)/(kA) is constant: a straight-line graph.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A wall has two layers of equal thickness: layer X with thermal conductivity k and layer Y with conductivity 4k. In the steady state, what fraction of the total temperature difference is across layer X?",
    options: [
      ["4/5", "Correct: equal flow rates need ΔθX = 4ΔθY, so ΔθX is 4/5 of the total."],
      ["1/5", "This is the fraction across Y, the better conductor."],
      ["1/2", "Equal drops would need equal conductivities."],
      ["1/4", "The ratio of the drops is 4 : 1, so the fractions are 4/5 and 1/5."],
    ],
    answer: "A",
    explanation: "kAΔθX/x = 4kAΔθY/x → ΔθX = 4ΔθY. The poorer conductor takes the larger drop: 4/5 of the total.",
    hints: ["The rate of flow is the same through both layers."],
  });
  {
    const k = 1.0, A = 0.90, dT = 12, x = 5.0e-3;
    const P0 = rate(k, A, dT, x);
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`A pane of toughened glass of area $0.90\ \text{m}^2$ and thickness $5.0\ \text{mm}$ has a temperature difference of $12\ \text{K}$ between its faces. The thermal conductivity of this glass is $1.0\ \text{W m}^{-1}\ \text{K}^{-1}$. What is the rate of energy flow?`,
      options: [
        [`${sfStr(P0, 2)} W`, "Correct: kAΔθ/x with x = 5.0 × 10⁻³ m."],
        [`${sfStr(rate(k, A, dT, 5.0), 2)} W`, "This uses x = 5.0 m instead of 5.0 mm."],
        [`${sfStr(rate(k, A, dT, 0.5), 2)} W`, "This converts 5.0 mm to 0.5 m; 5.0 mm = 0.005 m."],
        [`${sfStr(k * A * dT * x, 2)} W`, "The thickness divides, it does not multiply."],
      ],
      answer: "A",
      explanation: t`$\dfrac{Q}{t} = \dfrac{1.0 \times 0.90 \times 12}{5.0 \times 10^{-3}} = ${sfStr(P0, 2)}\ \text{W}$. (In practice thin air layers on each side greatly reduce the real flow.)`,
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In the Lees' disc method for a poor conductor, why is the specimen made as a thin disc of large area?",
    options: [
      ["So that the rate of energy flow through it is large enough to measure accurately", "Correct: Q/t ∝ A/x, which is small for a poor conductor unless A is large and x small."],
      ["So that the specimen reaches a higher temperature than the steam chamber", "It can never be hotter than the steam that heats it."],
      ["So that energy is lost mostly from its curved edge", "A thin disc has a small edge area, which keeps edge losses small."],
      ["So that the temperature gradient across it is as small as possible", "A thin specimen gives a large temperature gradient, not a small one."],
    ],
    answer: "A",
    explanation: "For a poor conductor the rate of flow is tiny unless A/x is large; a thin disc also has a small edge from which energy is lost.",
    hints: ["Which factors in Q/t = kAΔθ/x can be chosen by the experimenter?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "An unlagged metal bar is heated at one end. Compared with the same bar when lagged, how does the temperature gradient change along the bar?",
    options: [
      ["It is largest near the hot end and decreases towards the cold end.", "Correct: less energy flows through sections further from the hot end, so the gradient falls."],
      ["It is the same at every point along the bar.", "A uniform gradient needs the same rate of flow at every section (a lagged bar)."],
      ["It is smallest near the hot end and increases towards the cold end.", "Side losses reduce the flow further along, so the gradient decreases."],
      ["It is zero everywhere because energy escapes from the sides instead.", "Energy still flows along the bar; only part of it is lost from the sides."],
    ],
    answer: "A",
    explanation: "Each section passes on less energy than it receives (side losses), so Q/t, and so the gradient, decrease along the bar.",
    hints: ["Gradient ∝ rate of flow through that section."],
  });
  {
    const k = 0.035, A = 9.0, x = 0.050, dT = 22;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: t`A $50\ \text{mm}$ layer of ceiling insulation ($k = 0.035\ \text{W m}^{-1}\ \text{K}^{-1}$) covers $9.0\ \text{m}^2$. The temperature difference across it is $22\ \text{K}$. Calculate the rate of energy flow through it, in W, to two significant figures.`,
      value: rate(k, A, dT, x), sf: 2, unit: "W", wrong: [rate(k, A, dT, 50)],
      explanation: t`$\dfrac{Q}{t} = \dfrac{0.035 \times 9.0 \times 22}{0.050} = ${sfStr(rate(k, A, dT, x), 2)}\ \text{W}$. The thickness must be in metres.`,
    });
  }
  {
    const P0 = 45, A = 2.5e-3, x = 0.080, dT = 30;
    const k = (P0 * x) / (A * dT);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A lagged bar of cross-sectional area $2.5 \times 10^{-3}\ \text{m}^2$ conducts $45\ \text{W}$ in the steady state. Two points $8.0\ \text{cm}$ apart along it differ in temperature by $30\ \text{K}$. Calculate the thermal conductivity of the metal, in $\text{W m}^{-1}\ \text{K}^{-1}$, to two significant figures.`,
      value: k, sf: 2, unit: "W/(m K)", wrong: [(P0 * 8.0) / (A * dT), (P0) / (A * dT)],
      explanation: t`$k = \dfrac{(Q/t)\,x}{A\,\Delta\theta} = \dfrac{45 \times 0.080}{2.5 \times 10^{-3} \times 30} = ${sfStr(k, 2)}\ \text{W m}^{-1}\ \text{K}^{-1}$ (close to aluminium's value).`,
      hints: ["Rearrange Q/t = kAΔθ/x for k."],
    });
  }
  {
    // composite: brick + plaster
    const kb = 0.60, xb = 0.22, kp = 0.25, xp = 0.020, Ti = 22, To = 6, A = 1.0;
    const Rb = xb / (kb * A), Rp = xp / (kp * A);
    const q = (Ti - To) / (Rb + Rp);
    const Tj = Ti - q * Rp;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A wall consists of $20\ \text{mm}$ of plaster ($k = 0.25\ \text{W m}^{-1}\ \text{K}^{-1}$) on the inside of $220\ \text{mm}$ of brick ($k = 0.60\ \text{W m}^{-1}\ \text{K}^{-1}$). The inner surface of the plaster is at $22\ ^\circ\text{C}$ and the outer surface of the brick at $6\ ^\circ\text{C}$. Calculate the temperature of the plaster-brick boundary, in °C, to three significant figures.`,
      value: Tj, unit: "°C", wrong: [(Ti + To) / 2],
      explanation: t`1. Equal flow rates per square metre: $\dfrac{0.25(22 - \theta)}{0.020} = \dfrac{0.60(\theta - 6)}{0.22}$.
2. $12.5(22 - \theta) = 2.727(\theta - 6)$, so $\theta = \dfrac{12.5 \times 22 + 2.727 \times 6}{12.5 + 2.727}$.
3. $\theta = ${sfStr(Tj, 3)}\ ^\circ\text{C}$: the thin plaster conducts well for its thickness, so only a small drop is across it. The rate is $${sfStr(q, 3)}\ \text{W}$ per square metre.`,
      hints: ["Write the rate through each layer and set them equal."],
    });
    chk(Tj > 18 && Tj < 20 ? 1 : 0, 1);
  }
  {
    // Searle's bar: rate from cooling water
    const mdot = 0.0040, c = 4200, Tin = 18.2, Tout = 23.6, d = 0.040, x = 0.10, T1 = 72.4, T2 = 48.9;
    const A = (Math.PI * d * d) / 4;
    const P0 = mdot * c * (Tout - Tin);
    const k = (P0 * x) / (A * (T1 - T2));
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`In a Searle's bar experiment, cooling water flows through the coil at $4.0 \times 10^{-3}\ \text{kg s}^{-1}$ and warms from $18.2\ ^\circ\text{C}$ to $23.6\ ^\circ\text{C}$. The bar has diameter $40\ \text{mm}$, and thermometers $10.0\ \text{cm}$ apart read $72.4\ ^\circ\text{C}$ and $48.9\ ^\circ\text{C}$. The specific heat capacity of water is $4200\ \text{J kg}^{-1}\ \text{K}^{-1}$. Calculate the thermal conductivity of the bar, in $\text{W m}^{-1}\ \text{K}^{-1}$, to three significant figures.`,
      value: k, unit: "W/(m K)", wrong: [(P0 * x) / (Math.PI * d * d * (T1 - T2))],
      explanation: t`1. Rate of energy flow $= \dfrac{m}{t}c\Delta\theta = 4.0 \times 10^{-3} \times 4200 \times 5.4 = ${sfStr(P0, 3)}\ \text{W}$.
2. $A = \pi(0.020)^2 = ${sciTex(A)}\ \text{m}^2$; gradient $= \dfrac{72.4 - 48.9}{0.100} = ${sfStr((T1 - T2) / x, 3)}\ \text{K m}^{-1}$.
3. $k = \dfrac{${sfStr(P0, 3)}}{${sciTex(A)} \times ${sfStr((T1 - T2) / x, 3)}} = ${sfStr(k, 3)}\ \text{W m}^{-1}\ \text{K}^{-1}$ (a copper-like value). Using the diameter in $\pi r^2$ gives a value four times too small.`,
      hints: ["The energy carried away by the water each second equals the rate of conduction.", "A = πd²/4."],
    });
  }
  {
    // uncertainty in Lees' disc: thickness dominates
    const x = 2.4e-3, dx = 0.1e-3, dT = 8.2, ddT = 0.2, D = 0.110, dD = 0.001;
    const pct = pctUnc(dx, x) + pctUnc(ddT, dT) + 2 * pctUnc(dD, D);
    b.num({
      d: 4, skill: "EVALUATION", calculator: true,
      stem: t`In a Lees' disc experiment, $k = \dfrac{(Q/t)\,x}{A\,\Delta\theta}$ with $A = \pi D^2/4$. The specimen thickness is $x = 2.4 \pm 0.1\ \text{mm}$, its diameter $D = 110 \pm 1\ \text{mm}$ and the temperature difference $\Delta\theta = 8.2 \pm 0.2\ \text{K}$. Ignoring the uncertainty in $Q/t$, calculate the percentage uncertainty in $k$, to two significant figures.`,
      value: pct, sf: 2, unit: "%", wrong: [pctUnc(dx, x) + pctUnc(ddT, dT) + pctUnc(dD, D)],
      explanation: t`$\dfrac{0.1}{2.4} \times 100 + \dfrac{0.2}{8.2} \times 100 + 2 \times \dfrac{1}{110} \times 100 = ${sfStr(pctUnc(dx, x), 2)} + ${sfStr(pctUnc(ddT, dT), 2)} + ${sfStr(2 * pctUnc(dD, D), 2)} = ${sfStr(pct, 2)}\%$. The thickness dominates: measure it with a micrometer at several places.`,
      hints: ["Percentage uncertainties add; D is squared."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "When two slabs of different materials are placed in series with one face of each in contact, the rate of energy flow through each slab is the same in the steady state.",
    answer: true,
    explanation: "True. No energy builds up at the interface in the steady state, so what flows into the boundary flows out of it.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each change to a slab with its effect on the rate of conduction through it (other quantities unchanged).",
    pairs: [
      ["Thickness doubled", "Rate halved"],
      ["Area doubled", "Rate doubled"],
      ["Temperature difference halved", "Rate halved"],
      ["Thermal conductivity quartered", "Rate quartered"],
    ],
    extraRight: ["Rate unchanged"],
    explanation: "Q/t = kAΔθ/x: proportional to k, A and Δθ, inversely proportional to x.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence about methods for measuring thermal conductivity.",
    template: "{{blank:a}} is used for good conductors such as copper; {{blank:b}} is used for poor conductors such as glass or cardboard.",
    blanks: [
      { id: "a", accepted: ["Searle's bar"], choices: ["Searle's bar", "Lees' disc"] },
      { id: "b", accepted: ["Lees' disc"], choices: ["Searle's bar", "Lees' disc"] },
    ],
    explanation: "Searle: long thick bar (good conductor). Lees: thin wide disc (poor conductor).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain the two mechanisms of thermal conduction in a metal, and why one of them is absent in glass.",
    points: [
      "Lattice vibrations: atoms at the hot end vibrate with larger amplitude and, through interatomic bonds, pass vibrational energy to neighbours.",
      "Free (delocalised) electrons gain kinetic energy in hot regions and move rapidly through the metal.",
      "The electrons transfer energy to the lattice in cooler regions by collisions; this is much faster than lattice vibration alone.",
      "Glass (an insulator) has no free electrons, so only the slow lattice-vibration mechanism operates.",
    ],
    modelAnswer: "In a metal, atoms at the hot end vibrate more vigorously and pass energy to neighbouring atoms through the bonds between them. In addition, free electrons in the hot region gain kinetic energy, travel quickly through the lattice and give up energy in collisions with atoms in cooler regions; this electron transport is much faster. Glass has no free electrons, so it conducts only by the slow lattice vibrations.",
    explanation: "Vibrations everywhere; free electrons in metals.",
    hints: ["What do metals have that glass does not?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how the temperature-distance graph of an unlagged bar, heated at one end, differs from that of a lagged bar with the same end temperatures, and explain the difference.",
    points: [
      "Lagged: straight line (constant gradient).",
      "Unlagged: curve with gradient decreasing from the hot end to the cold end, lying below the straight line.",
      "In the unlagged bar energy is lost from the sides, so less energy flows through each successive section, and gradient ∝ rate of flow.",
    ],
    modelAnswer: "For the lagged bar the graph is a straight line. For the unlagged bar it is a curve, steepest at the hot end and becoming less steep towards the cold end, below the straight line. Energy is lost from the sides of the unlagged bar, so less flows through sections further along; since the gradient is proportional to the rate of flow through a section, it decreases.",
    explanation: "Side losses reduce the flow, and so the gradient, along the bar.",
    hints: ["The gradient at a section is (Q/t)/(kA) for that section."],
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "In Searle's bar experiment the bar is long and thick and is heavily lagged. Explain the reason for each of these three features.",
    points: [
      "Long: the thermometers can be far apart, giving a large temperature difference that can be measured with small percentage uncertainty.",
      "Thick: large cross-sectional area gives a large rate of flow, so the cooling water's temperature rise is measurable.",
      "Lagged: no energy lost from the sides, so the rate measured by the water equals the rate through the section between the thermometers (uniform gradient).",
    ],
    modelAnswer: "A long bar allows the thermometers to be far apart, so the temperature difference between them is large and precisely measured. A thick bar conducts energy at a large rate, giving a measurable temperature rise of the cooling water. Lagging prevents side losses, so the same rate of flow passes between the thermometers and into the water, and the gradient is uniform.",
    explanation: "Each feature makes one measured quantity large or makes the rates equal.",
    hints: ["Copper conducts well: which quantities would otherwise be too small to measure?"],
  });

  // Practice structured: double-glazed window (14 marks)
  {
    const kg = 0.80, ka = 0.025, xg = 4.0e-3, xa = 12e-3, A = 1.5, Ti = 23, To = 8;
    const Rg = xg / (kg * A), Ra = xa / (ka * A);
    const qSingle = (Ti - To) / Rg;
    const qDouble = (Ti - To) / (2 * Rg + Ra);
    const dTa = qDouble * Ra;
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A window of area $1.5\ \text{m}^2$ separates a room at $23\ ^\circ\text{C}$ from outside air at $8\ ^\circ\text{C}$. Glass has $k = 0.80\ \text{W m}^{-1}\ \text{K}^{-1}$ and still air $k = 0.025\ \text{W m}^{-1}\ \text{K}^{-1}$. Assume the glass surfaces are at the room and outside temperatures.`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Define thermal conductivity.", points: ["Rate of flow of thermal energy per unit cross-sectional area per unit temperature gradient…", "…for flow perpendicular to the area: k = (Q/t)x/(AΔθ)."], modelAnswer: "Thermal conductivity is the rate of flow of thermal energy per unit area per unit temperature gradient, k = (Q/t)/(A Δθ/x), for flow perpendicular to the area." }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate the rate of energy flow through a single pane $4.0\ \text{mm}$ thick, in W, to two significant figures.`, value: qSingle, sf: 2, unit: "W", wrong: [(kg * A * (Ti - To)) / 4.0], explanation: t`$\dfrac{0.80 \times 1.5 \times 15}{4.0 \times 10^{-3}} = ${sciTex(qSingle, 2)}\ \text{W}$.` }),
        P.group({ label: "(c)", stem: t`The window is replaced by two $4.0\ \text{mm}$ panes with a $12\ \text{mm}$ layer of still air between them.`, parts: [
          P.num({ label: "(i)", marks: 3, stem: "Calculate the rate of energy flow, in W, to two significant figures.", value: qDouble, sf: 2, unit: "W", wrong: [(Ti - To) / Ra, (ka * A * (Ti - To)) / (xa + 2 * xg)], explanation: t`Equal rates through the three layers: $\dfrac{Q}{t} = \dfrac{\Delta\theta}{\sum x/(kA)}$. $\dfrac{x}{kA}$: glass $${sciTex(Rg, 3)}$ each, air $${sfStr(Ra, 3)}\ \text{K W}^{-1}$. $\dfrac{Q}{t} = \dfrac{15}{${sfStr(2 * Rg + Ra, 4)}} = ${sfStr(qDouble, 2)}\ \text{W}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: "Calculate the temperature difference across the air layer, in K, to three significant figures.", value: dTa, unit: "K", wrong: [15 / 3], explanation: t`$\Delta\theta_{\text{air}} = \dfrac{Q}{t} \times \dfrac{x}{kA} = ${sfStr(qDouble, 3)} \times ${sfStr(Ra, 3)} = ${sfStr(dTa, 3)}\ \text{K}$: almost the whole 15 K.` }),
        ] }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why the double-glazed window conducts so much less energy, and why the air gap must not be made too wide.", points: ["Air has a very low thermal conductivity, so the air layer has a much larger x/(kA) than the glass.", "In series the same rate passes through each layer, so the air layer limits the rate and takes almost all the temperature drop.", "If the gap is too wide, convection currents can form in the air, carrying energy across and reducing the benefit."], modelAnswer: "Still air conducts about thirty times worse than glass, so the 12 mm air layer has a far larger thermal resistance than the panes. Because the same rate of flow passes through every layer, the air layer controls the rate and takes almost all of the temperature drop. A very wide gap would allow convection currents in the air, which carry energy across and undo much of the benefit." }),
        P.manual({ label: "(e)", marks: 2, stem: "Suggest why the real rate through the single pane is much less than your answer to (b).", points: ["Thin layers of almost still air cling to each surface of the glass (boundary layers).", "These have a large thermal resistance, so most of the temperature difference is across them and the glass surfaces are not at the room and outside temperatures."], modelAnswer: "Thin layers of nearly still air on both faces of the glass have a large thermal resistance, so most of the 15 K drop is across them; the glass surfaces are therefore much closer in temperature than assumed, and the flow is far smaller." }),
      ],
      explanation: "For layers in series the rate is the same through each; the air layer, with the largest x/(kA), takes most of the temperature drop.",
      hints: ["Find x/(kA) for each layer and add them.", "Rate = total Δθ ÷ total x/(kA)."],
    });
    chk(qDouble < qSingle ? 1 : 0, 1);
  }
  // Practice structured: lagged and unlagged bar data (8 marks)
  {
    const xs = [0, 0.05, 0.10, 0.15, 0.20, 0.25];
    const lag = xs.map((x) => 96 - (96 - 21) * (x / 0.25));
    const unl = [96.0, 76.4, 60.3, 46.8, 32.9, 21.0];
    const k = 205, A = 4.9e-4;
    const grad = (lag[0] - lag[5]) / 0.25;
    b.struct({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: t`Two identical aluminium bars ($k = 205\ \text{W m}^{-1}\ \text{K}^{-1}$, cross-sectional area $4.9 \times 10^{-4}\ \text{m}^2$, length $0.25\ \text{m}$) are heated at one end and cooled at the other. Bar P is lagged; bar Q is not. Steady-state temperatures are:

${table([t`$x\,/\,\text{m}$`, t`$\theta_P\,/\,^\circ\text{C}$`, t`$\theta_Q\,/\,^\circ\text{C}$`], xs.map((x, i) => [dpStr(x, 2), dpStr(lag[i], 1), dpStr(unl[i], 1)]))}`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`Calculate the temperature gradient in bar P, in $\text{K m}^{-1}$.`, value: grad, wrong: [lag[0] - lag[5]], explanation: t`$\dfrac{96.0 - 21.0}{0.25} = ${grad}\ \text{K m}^{-1}$ (constant along the bar).` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the rate of energy flow along bar P, in W, to three significant figures.", value: k * A * grad, unit: "W", wrong: [k * A * (lag[0] - lag[5])], explanation: t`$\dfrac{Q}{t} = kA\dfrac{\Delta\theta}{\Delta x} = 205 \times 4.9 \times 10^{-4} \times ${grad} = ${sfStr(k * A * grad, 3)}\ \text{W}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Use the first two readings for bar Q to estimate the rate of energy flow into the hot end of Q, in W, to two significant figures.`, value: k * A * ((unl[0] - unl[1]) / 0.05), sf: 2, unit: "W", wrong: [k * A * grad], explanation: t`Gradient near the hot end $\approx \dfrac{96.0 - 76.4}{0.05} = ${sfStr((unl[0] - unl[1]) / 0.05, 3)}\ \text{K m}^{-1}$; rate $\approx 205 \times 4.9 \times 10^{-4} \times ${sfStr((unl[0] - unl[1]) / 0.05, 3)} = ${sfStr(k * A * ((unl[0] - unl[1]) / 0.05), 2)}\ \text{W}$.` }),
        P.manual({ label: "(d)", marks: 3, stem: "Describe the shapes of the two temperature-distance graphs and explain why the gradient of Q decreases along the bar.", points: ["P: straight line with constant negative gradient.", "Q: curve, steepest at the hot end, gradient decreasing towards the cold end.", "Energy is lost from the sides of Q, so less flows through each later section; gradient ∝ rate of flow, so it decreases."], modelAnswer: "Bar P gives a straight line of constant gradient. Bar Q gives a curve that is steepest at the hot end and flattens towards the cold end. Q loses energy from its sides, so a smaller rate of flow passes each successive section, and since the gradient is proportional to that rate, the gradient decreases along the bar." }),
      ],
      explanation: "Lagged: uniform gradient; unlagged: larger rate at the hot end, decreasing along the bar.",
      hints: ["Q/t = kA × gradient."],
    });
  }

  b.card("DEFINITION", "**Thermal conductivity**", "Rate of flow of thermal energy per unit area per unit temperature gradient: k = (Q/t)x/(AΔθ). Unit W m⁻¹ K⁻¹.");
  b.card("FORMULA", "Rate of conduction", t`$\dfrac{Q}{t} = kA\dfrac{\theta_1 - \theta_2}{x}$`);
  b.card("CONCEPT", "Conduction mechanisms", "All solids: lattice vibrations passed between neighbours. Metals: also fast free electrons, which dominate.");
  b.card("CONCEPT", "Lagged bar", "No side losses → same Q/t through every section → uniform gradient, straight temperature-distance line.");
  b.card("CONCEPT", "Unlagged bar", "Side losses → Q/t decreases along the bar → gradient decreases: curve below the lagged line.");
  b.card("CONCEPT", "Layers in series", "Same rate of flow through each layer; the layer with the largest x/(kA) takes the largest temperature drop.");
  b.card("FACT", "Typical k values / W m⁻¹ K⁻¹", "Copper ~390, steel ~50, glass ~0.8, brick ~0.6, wood ~0.15, polystyrene ~0.03, still air ~0.025.");
  b.card("CONCEPT", "Searle's bar v. Lees' disc", "Searle: long, thick, lagged bar for good conductors. Lees: thin, wide disc for poor conductors.");
  b.card("CONCEPT", "Why trapped air insulates", "Air conducts very poorly; trapping it in small pockets prevents convection.");
});
