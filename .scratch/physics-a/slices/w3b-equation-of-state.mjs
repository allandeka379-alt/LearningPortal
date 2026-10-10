// W3b: aphys.gases.equation-of-state — the mole, Avogadro constant, ideal gas, pV = nRT = NkT, gas laws, densities.
import { concept, P, t, DATA, chk, sfStr, dpStr, sciTex, toK, table, linFit, pctUnc } from "../lib.mjs";

const { R, k, NA } = DATA;

concept("aphys.gases.equation-of-state", { file: "gases/equation-of-state", keyPrefix: "gases.equation-of-state" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement defines an ideal gas?",
    options: [
      ["A gas for which pV ∝ T (kelvin) for a fixed amount of gas", "Correct: pV ∝ T at all p, V and T."],
      ["A gas for which pV stays constant at every temperature", "pV is constant only at constant temperature (Boyle's law)."],
      ["A gas whose molecules have negligible mass and speed", "Molecules of an ideal gas have mass; it is their volume and forces that are negligible."],
      ["A gas for which V is proportional to its Celsius temperature", "V ∝ T in kelvin (at constant p), not in degrees Celsius."],
    ],
    answer: "A",
    explanation: "Ideal gas: pV ∝ T (kelvin) for a fixed amount of gas.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What are the SI base units of the molar gas constant R?",
    options: [
      [t`$\text{kg m}^2\ \text{s}^{-2}\ \text{K}^{-1}\ \text{mol}^{-1}$`, "Correct: J = kg m² s⁻², so J K⁻¹ mol⁻¹ in base units."],
      [t`$\text{kg m}^{-1}\ \text{s}^{-2}\ \text{K}^{-1}\ \text{mol}^{-1}$`, "This is Pa K⁻¹ mol⁻¹: the volume has been left out."],
      [t`$\text{kg m}^2\ \text{s}^{-2}\ \text{K}^{-1}$`, "This is the unit of k, the Boltzmann constant (per molecule, not per mole)."],
      [t`$\text{kg m}^2\ \text{s}^{-1}\ \text{K}^{-1}\ \text{mol}^{-1}$`, "A joule is kg m² s⁻², not kg m² s⁻¹."],
    ],
    answer: "A",
    explanation: "R = pV/(nT): Pa m³ = J = kg m² s⁻², divided by K and mol.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A fixed mass of ideal gas has its thermodynamic temperature doubled and its volume halved. What happens to its pressure?",
    options: [
      ["It becomes four times larger.", "Correct: p ∝ T/V = 2 ÷ ½ = 4."],
      ["It stays the same.", "The two changes both increase the pressure; they do not cancel."],
      ["It doubles.", "This allows for the temperature change only."],
      ["It halves.", "Halving the volume increases the pressure."],
    ],
    answer: "A",
    explanation: "p = nRT/V: doubling T doubles p; halving V doubles it again.",
  });
  {
    const T1 = 20, T2 = 80;
    const ratio = toK(T2) / toK(T1);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A sealed rigid container of ideal gas is heated from $20\ ^\circ\text{C}$ to $80\ ^\circ\text{C}$. By what factor does the pressure increase?`,
      options: [
        [sfStr(ratio, 3), "Correct: 353/293 in kelvin."],
        ["4.00", "This uses the Celsius ratio 80/20."],
        [sfStr(toK(T2) / toK(T1) + 1, 3), "There is no reason to add one to the ratio."],
        [sfStr(toK(T1) / toK(T2), 3), "This ratio is inverted: the pressure rises when the gas is heated."],
      ],
      answer: "A",
      explanation: t`$\dfrac{p_2}{p_1} = \dfrac{T_2}{T_1} = \dfrac{353.15}{293.15} = ${sfStr(ratio, 3)}$.`,
      hints: ["Convert to kelvin."],
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Two containers of equal volume hold ideal gases at the same temperature and pressure: one hydrogen, one carbon dioxide. Which statement is correct?",
    options: [
      ["They contain equal numbers of molecules.", "Correct: N = pV/(kT), which does not depend on the gas."],
      ["The carbon dioxide container holds more molecules because they are heavier.", "Molecular mass does not appear in pV = NkT."],
      ["The hydrogen container holds more molecules because they are smaller.", "Molecular size is negligible for an ideal gas."],
      ["They contain equal masses of gas.", "Equal numbers of molecules of different molar mass have different masses."],
    ],
    answer: "A",
    explanation: "pV = NkT: equal p, V and T means equal N, whatever the gas (Avogadro's law).",
    hints: ["Which quantities appear in pV = NkT?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a Charles's law experiment, the volume of a fixed mass of air at constant pressure is plotted against its temperature in degrees Celsius. Where does the extrapolated straight line cut the temperature axis?",
    options: [
      [t`At about $-273\ ^\circ\text{C}$`, "Correct: V ∝ T in kelvin, so V = 0 at absolute zero."],
      [t`At $0\ ^\circ\text{C}$`, "The air has a non-zero volume at 0 °C."],
      [t`At about $+273\ ^\circ\text{C}$`, "The line would cut the axis below 0 °C, not above."],
      [t`At $-100\ ^\circ\text{C}$`, "The intercept is absolute zero, −273 °C."],
    ],
    answer: "A",
    explanation: "Extrapolating V to zero gives absolute zero; real air liquefies long before this.",
  });
  {
    const p = 1.01e5, T = toK(25), M = 0.029;
    const rho = (p * M) / (R * T);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Air has a molar mass of $0.029\ \text{kg mol}^{-1}$. What is the density of air at $1.01 \times 10^{5}\ \text{Pa}$ and $25\ ^\circ\text{C}$, treating it as an ideal gas?`,
      options: [
        [t`$${sfStr(rho, 3)}\ \text{kg m}^{-3}$`, "Correct: ρ = pM/(RT)."],
        [t`$${sfStr((p * M) / (R * 25), 3)}\ \text{kg m}^{-3}$`, "This uses 25 °C instead of 298 K."],
        [t`$${sfStr((p * 29) / (R * T), 3)}\ \text{kg m}^{-3}$`, "This uses the molar mass in g mol⁻¹."],
        [t`$${sfStr((R * T) / (p * M), 3)}\ \text{kg m}^{-3}$`, "This is the reciprocal: the volume per kilogram."],
      ],
      answer: "A",
      explanation: t`$\rho = \dfrac{pM}{RT} = \dfrac{1.01 \times 10^{5} \times 0.029}{8.31 \times 298} = ${sfStr(rho, 3)}\ \text{kg m}^{-3}$.`,
      hints: ["Combine n = m/M with pV = nRT."],
    });
  }
  {
    const V = 0.050, p = 4.5e5, T = toK(22);
    const n = (p * V) / (R * T);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: t`A $0.050\ \text{m}^3$ tank holds compressed air at $4.5 \times 10^{5}\ \text{Pa}$ and $22\ ^\circ\text{C}$. Calculate the amount of air, in mol, to three significant figures.`,
      value: n, unit: "mol", wrong: [(p * V) / (R * 22), (p * V) / (k * T)],
      explanation: t`$n = \dfrac{pV}{RT} = \dfrac{4.5 \times 10^{5} \times 0.050}{8.31 \times 295.15} = ${sfStr(n, 3)}\ \text{mol}$.`,
    });
  }
  {
    const p = 3.0e-3, T = 290;
    const nd = p / (k * T);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A "vacuum" chamber contains gas at a pressure of $3.0 \times 10^{-3}\ \text{Pa}$ and $290\ \text{K}$. Calculate the number of molecules per cubic metre, to two significant figures.`,
      value: nd, sf: 2, wrong: [p / (R * T), p / (k * 27)],
      explanation: t`$\dfrac{N}{V} = \dfrac{p}{kT} = \dfrac{3.0 \times 10^{-3}}{1.38 \times 10^{-23} \times 290} = ${sciTex(nd, 2)}\ \text{m}^{-3}$: still an enormous number.`,
      hints: ["Use pV = NkT."],
    });
  }
  {
    // weather balloon: p1 V1 / T1 = p2 V2 / T2
    const p1 = 1.0e5, V1 = 3.2, T1 = toK(24), p2 = 3.5e4, T2 = toK(-32);
    const V2 = (p1 * V1 * T2) / (T1 * p2);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A weather balloon is released from Harare holding $3.2\ \text{m}^3$ of helium at $1.0 \times 10^{5}\ \text{Pa}$ and $24\ ^\circ\text{C}$. At a height where the pressure is $3.5 \times 10^{4}\ \text{Pa}$ and the temperature is $-32\ ^\circ\text{C}$, calculate its volume, in $\text{m}^3$, to two significant figures. Assume no gas escapes and the balloon fabric exerts no extra pressure.`,
      value: V2, sf: 2, unit: "m³", wrong: [(p1 * V1) / p2, (p1 * V1 * -32) / (24 * p2)],
      explanation: t`1. $T_1 = 297.15\ \text{K}$, $T_2 = 241.15\ \text{K}$.
2. $V_2 = V_1 \times \dfrac{p_1}{p_2} \times \dfrac{T_2}{T_1} = 3.2 \times \dfrac{1.0 \times 10^{5}}{3.5 \times 10^{4}} \times \dfrac{241.15}{297.15}$.
3. $V_2 = ${sfStr(V2, 2)}\ \text{m}^3$. Ignoring the cooling gives $${sfStr((p1 * V1) / p2, 2)}\ \text{m}^3$.`,
      hints: ["p₁V₁/T₁ = p₂V₂/T₂ with T in kelvin."],
    });
  }
  {
    // gas escaping: amount changes
    const V = 0.040, p1 = 1.5e6, T1 = toK(30), p2 = 9.0e5, T2 = toK(18), M = 0.028;
    const n1 = (p1 * V) / (R * T1), n2 = (p2 * V) / (R * T2);
    const dm = (n1 - n2) * M;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A $0.040\ \text{m}^3$ cylinder of nitrogen (molar mass $0.028\ \text{kg mol}^{-1}$) is at $1.5 \times 10^{6}\ \text{Pa}$ and $30\ ^\circ\text{C}$. After some gas has been used and the cylinder has cooled to $18\ ^\circ\text{C}$, the pressure is $9.0 \times 10^{5}\ \text{Pa}$. Calculate the mass of nitrogen used, in kg, to two significant figures.`,
      value: dm, sf: 2, unit: "kg", wrong: [((p1 - p2) * V * M) / (R * T1), (n1 - n2)],
      explanation: t`1. Before: $n_1 = \dfrac{1.5 \times 10^{6} \times 0.040}{8.31 \times 303.15} = ${sfStr(n1, 3)}\ \text{mol}$.
2. After: $n_2 = \dfrac{9.0 \times 10^{5} \times 0.040}{8.31 \times 291.15} = ${sfStr(n2, 3)}\ \text{mol}$.
3. Mass used $= (n_1 - n_2)M = ${sfStr(n1 - n2, 3)} \times 0.028 = ${sfStr(dm, 2)}\ \text{kg}$. The amount of gas changes, so $p_1V_1/T_1 = p_2V_2/T_2$ cannot be used.`,
      hints: ["Find n before and after separately."],
    });
  }
  {
    const nd = 2.5e25, T = 290;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Calculate the pressure of an ideal gas containing $2.5 \times 10^{25}$ molecules per cubic metre at $290\ \text{K}$, in Pa, to two significant figures.`,
      value: nd * k * T, sf: 2, unit: "Pa", wrong: [nd * R * T, (nd / NA) * R * 17],
      explanation: t`$p = \dfrac{N}{V}kT = 2.5 \times 10^{25} \times 1.38 \times 10^{-23} \times 290 = ${sciTex(nd * k * T, 2)}\ \text{Pa}$.`,
      hints: ["p = (N/V)kT."],
    });
  }
  {
    // uncertainty in n from p, V, T
    const pp = pctUnc(0.05, 2.40), Vp = pctUnc(0.5, 64.0), Tp = pctUnc(1, 295);
    const tot = pp + Vp + Tp;
    b.num({
      d: 4, skill: "EVALUATION", calculator: true,
      stem: t`In finding $n = \dfrac{pV}{RT}$ for trapped air, Tendai measures $p = (2.40 \pm 0.05) \times 10^{5}\ \text{Pa}$, $V = 64.0 \pm 0.5\ \text{cm}^3$ and $T = 295 \pm 1\ \text{K}$. Calculate the percentage uncertainty in $n$, to two significant figures, and so state which measurement contributes most.`,
      value: tot, sf: 2, unit: "%", wrong: [pp + Vp - Tp],
      explanation: t`$\dfrac{0.05}{2.40} \times 100 + \dfrac{0.5}{64.0} \times 100 + \dfrac{1}{295} \times 100 = ${sfStr(pp, 2)} + ${sfStr(Vp, 2)} + ${sfStr(Tp, 2)} = ${sfStr(tot, 2)}\%$. The pressure reading contributes most. Percentage uncertainties add even for a quantity that divides.`,
      hints: ["Add the percentage uncertainties of p, V and T."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Boltzmann constant k is the molar gas constant R divided by the Avogadro constant.",
    answer: true,
    explanation: "True. k = R/N_A = 8.31/(6.02 × 10²³) = 1.38 × 10⁻²³ J K⁻¹: the gas constant per molecule.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "For a fixed mass of ideal gas, match each law with the graph that gives a straight line through the origin.",
    pairs: [
      ["Boyle's law (constant T)", "p against 1/V"],
      ["Charles's law (constant p)", "V against T in kelvin"],
      ["Pressure law (constant V)", "p against T in kelvin"],
    ],
    extraRight: ["p against V"],
    explanation: "pV = nRT with one quantity held constant gives each proportionality.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements about the ideal gas equation.",
    template: "In pV = nRT, n is the amount of gas in {{blank:a}} and T is in {{blank:b}}. In pV = NkT, N is the number of {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["moles"], choices: ["moles", "kilograms", "molecules"] },
      { id: "b", accepted: ["kelvin"], choices: ["kelvin", "degrees Celsius"] },
      { id: "c", accepted: ["molecules"], choices: ["molecules", "moles", "kilograms"] },
    ],
    explanation: "nR = Nk: moles with R, molecules with k; temperature always in kelvin.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the constant whose value is 6.02 × 10²³ mol⁻¹.",
    accepted: ["Avogadro constant", "the Avogadro constant", "Avogadro's constant", "Avogadro number", "Avogadro's number"],
    explanation: "The **Avogadro constant**, the number of particles per mole.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how you would investigate Boyle's law for a sample of air, and how you would analyse the results.",
    points: [
      "Trap air in a sealed tube above oil; change the pressure with a pump and read it on a pressure (Bourdon) gauge.",
      "Read the volume of air from the scale on the tube (length × cross-section) for at least six pressures.",
      "Keep the temperature constant: change the pressure slowly and wait for the air to return to room temperature before each reading.",
      "Plot p against 1/V: a straight line through the origin (or show pV is constant) confirms Boyle's law.",
    ],
    modelAnswer: "Trap a fixed mass of air in a sealed glass tube above a column of oil connected to a pump and a Bourdon gauge. Increase the pressure in steps, reading the gauge and the air volume on the scale each time, for at least six readings. Change the pressure slowly and wait before reading so the air stays at room temperature. Plot p against 1/V; a straight line through the origin shows p ∝ 1/V.",
    explanation: "Fixed mass, constant temperature, p against 1/V.",
    hints: ["What must be kept constant, and how?"],
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why the density of the air inside a hot-air balloon is less than that of the cooler air outside at the same pressure.",
    points: [
      "ρ = pM/(RT): at the same pressure, density is inversely proportional to the thermodynamic temperature.",
      "The hot air has a higher T, so a lower density (fewer molecules per unit volume); the balloon is buoyed up by the denser outside air.",
    ],
    modelAnswer: "From pV = nRT, the density of a gas is ρ = pM/(RT). At the same pressure, hotter air has a larger T and so a smaller density: there are fewer molecules per unit volume. The denser surrounding air provides an upthrust larger than the weight of the hot air.",
    explanation: "ρ ∝ 1/T at constant p.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Explain under what conditions a real gas behaves most like an ideal gas, and why.",
    points: [
      "Low pressure (low density): molecules far apart, so their own volume is negligible compared with the container volume.",
      "High temperature (well above the boiling point / liquefaction): molecules move fast, so intermolecular attractions have a negligible effect.",
      "These are the assumptions of the ideal-gas model (negligible molecular volume and no intermolecular forces).",
    ],
    modelAnswer: "A real gas is most ideal at low pressure and high temperature. At low pressure the molecules are far apart, so the volume of the molecules themselves is negligible. At high temperature, well above the point at which the gas liquefies, they move so fast that intermolecular attractions hardly affect them. These match the ideal-gas assumptions of negligible molecular volume and no intermolecular forces.",
    explanation: "Low pressure and high temperature.",
    hints: ["Which assumptions of the ideal-gas model fail for a real gas?"],
  });

  // Practice structured: pressure law experiment (14 marks)
  {
    const th = [10, 25, 40, 55, 70, 85];
    const p0 = 98.6; // kPa at 0 °C
    const nz = [0.2, -0.3, 0.1, 0.3, -0.2, 0.1];
    const ps = th.map((x, i) => Math.round((p0 * toK(x) / 273.15 + nz[i]) * 10) / 10);
    const fit = linFit(th, ps);
    const zero = -fit.c / fit.m;
    const V = 2.5e-4;
    const n = (fit.c * 1000 * V) / (R * 273.15);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Farai seals air in a $250\ \text{cm}^3$ flask connected by short tubing to a pressure gauge and heats the flask in a water bath, reading the pressure $p$ at several temperatures $\theta$:

${table([t`$\theta\,/\,^\circ\text{C}$`, t`$p\,/\,\text{kPa}$`], th.map((x, i) => [String(x), dpStr(ps[i], 1)]))}`,
      parts: [
        P.num({ label: "(a)", marks: 3, stem: t`Plot $p$ against $\theta$ and determine the gradient of the best-fit line, in $\text{kPa}$ per °C, to two significant figures.`, value: fit.m, tol: 0.012, wrong: [1 / fit.m], explanation: t`Best-fit gradient $\approx ${sfStr(fit.m, 3)}\ \text{kPa}\ ^\circ\text{C}^{-1}$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Determine the intercept on the $p$-axis (at $\theta = 0$), in kPa.`, value: fit.c, tol: 0.6, unit: "kPa", wrong: [ps[0]], explanation: t`Intercept $\approx ${sfStr(fit.c, 3)}\ \text{kPa}$ (using $c = y - mx$ at a point on the line).` }),
        P.num({ label: "(c)", marks: 2, stem: "Use your gradient and intercept to estimate absolute zero, in °C, to three significant figures.", value: zero, tol: 9, unit: "°C", wrong: [-zero], explanation: t`$p = 0$ when $\theta = -\dfrac{c}{m} \approx -\dfrac{${sfStr(fit.c, 3)}}{${sfStr(fit.m, 3)}} = ${sfStr(zero, 3)}\ ^\circ\text{C}$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`Using the intercept as the pressure at $273\ \text{K}$, calculate the amount of air in the flask, in mol, to two significant figures.`, value: n, tol: 0.0002, unit: "mol", wrong: [(fit.c * V) / (R * 273.15)], explanation: t`$n = \dfrac{pV}{RT} = \dfrac{${sfStr(fit.c * 1000, 3)} \times 2.5 \times 10^{-4}}{8.31 \times 273} = ${sciTex(n, 2)}\ \text{mol}$ (convert kPa to Pa and cm³ to m³).` }),
        P.manual({ label: "(e)", marks: 3, stem: "Suggest three reasons why the experiment may give an estimate of absolute zero that differs from −273 °C.", points: ["Air in the connecting tube and gauge is not at the bath temperature.", "The flask expands slightly when heated (volume not quite constant).", "Air not given time to reach the bath temperature / thermometer and flask not in equilibrium; long extrapolation magnifies small errors in the gradient."], modelAnswer: "Some air is in the tubing and gauge, outside the bath, so it is cooler than the bath; the glass flask expands a little, so the volume is not quite constant; and the air may not have reached the bath temperature when each reading was taken. Because the line is extrapolated a long way, small errors in its gradient make a large difference to the intercept on the temperature axis." }),
        P.manual({ label: "(f)", marks: 2, stem: "Give two precautions that improve the reliability of the readings.", points: ["Keep the connecting tube short and narrow (so little air is outside the bath).", "Stir the bath and wait until the pressure reading is steady before recording; ensure the flask is fully submerged."], modelAnswer: "Use short, narrow connecting tubing so very little air is outside the bath, and stir the water and wait for a steady reading at each temperature with the flask fully submerged." }),
      ],
      explanation: "At constant volume p ∝ T: the p-θ line extrapolates to p = 0 at absolute zero.",
      hints: ["Gradient = Δp/Δθ.", "At p = 0, θ = −intercept/gradient."],
    });
    chk(Math.abs(zero + 273) < 15 ? 1 : 0, 1);
  }
  // Practice structured: two connected flasks (8 marks)
  {
    const V1 = 1.5e-3, p1 = 2.0e5, V2 = 2.5e-3, p2 = 1.0e5, T = 300;
    const n1 = (p1 * V1) / (R * T), n2 = (p2 * V2) / (R * T);
    const pf = ((n1 + n2) * R * T) / (V1 + V2);
    const T3 = toK(80);
    const pf2 = (pf * T3) / T;
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`Flask X ($1.5 \times 10^{-3}\ \text{m}^3$) contains an ideal gas at $2.0 \times 10^{5}\ \text{Pa}$; flask Y ($2.5 \times 10^{-3}\ \text{m}^3$) contains the same gas at $1.0 \times 10^{5}\ \text{Pa}$. Both are at $300\ \text{K}$. The tap between them is opened.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the total amount of gas, in mol, to three significant figures.", value: n1 + n2, unit: "mol", wrong: [n1], explanation: t`$n_X = ${sfStr(n1, 3)}$, $n_Y = ${sfStr(n2, 3)}$; total $${sfStr(n1 + n2, 3)}\ \text{mol}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the final pressure at 300 K, in Pa, to three significant figures.", value: pf, unit: "Pa", wrong: [(p1 + p2) / 2], explanation: t`$p = \dfrac{nRT}{V_X + V_Y} = \dfrac{p_XV_X + p_YV_Y}{V_X + V_Y} = \dfrac{300 + 250}{4.0 \times 10^{-3}} = ${sciTex(pf)}\ \text{Pa}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Both flasks are then heated to 80 °C. Calculate the new pressure, in Pa, to three significant figures.", value: pf2, unit: "Pa", wrong: [(pf * 80) / 27], explanation: t`$p \propto T$: $${sciTex(pf)} \times \dfrac{353.15}{300} = ${sciTex(pf2)}\ \text{Pa}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why the final pressure in (b) is not simply the average of the two starting pressures.", points: ["The flasks have different volumes, so they contain different amounts of gas.", "The final pressure is a volume-weighted average: (pXVX + pYVY)/(VX + VY)."], modelAnswer: "The flasks have different volumes and so hold different amounts of gas. The total amount spreads through the combined volume, so the final pressure is the volume-weighted average (p_XV_X + p_YV_Y)/(V_X + V_Y), not the simple mean." }),
      ],
      explanation: "Amounts add; the total spreads through the combined volume.",
      hints: ["Find n in each flask and add them."],
    });
  }

  b.card("DEFINITION", "**Ideal gas**", "A gas for which pV is proportional to the thermodynamic temperature T, for a fixed amount of gas.");
  b.card("DEFINITION", "**Mole**", "The amount of substance containing N_A = 6.02 × 10²³ particles.");
  b.card("FORMULA", "Ideal gas equation", t`$pV = nRT = NkT$; $R = 8.31\ \text{J K}^{-1}\ \text{mol}^{-1}$, $k = 1.38 \times 10^{-23}\ \text{J K}^{-1}$`);
  b.card("FORMULA", "Boltzmann constant", t`$k = \dfrac{R}{N_A}$`);
  b.card("FORMULA", "Fixed amount of gas", t`$\dfrac{p_1V_1}{T_1} = \dfrac{p_2V_2}{T_2}$ (T in K)`);
  b.card("FORMULA", "Gas density and number density", t`$\rho = \dfrac{pM}{RT}$; $\dfrac{N}{V} = \dfrac{p}{kT}$`);
  b.card("CONCEPT", "Gas laws as special cases", "Boyle: p ∝ 1/V (T const). Charles: V ∝ T (p const). Pressure law: p ∝ T (V const).");
  b.card("CONCEPT", "When real gases are ideal", "Low pressure and high temperature: molecular volume and intermolecular forces negligible.");
  b.card("FACT", "Use kelvin and absolute pressure", "T/K = θ/°C + 273.15; absolute pressure = gauge pressure + atmospheric pressure.");
});
