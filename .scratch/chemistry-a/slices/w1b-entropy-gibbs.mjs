// W1b: achem.energetics.entropy-gibbs (Cambridge A Level only)
import { concept, P, t, ce, CAM, entropyChange, gibbs, feasibilityT, linearFit, sfStr, dpStr, chk, round } from "../lib.mjs";

concept("achem.energetics.entropy-gibbs", { file: "energetics/entropy-gibbs", keyPrefix: "energetics.entropy-gibbs" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which change gives the largest increase in entropy for one mole of water?",
    options: [
      [t`$\ce{H2O(s) -> H2O(g)}$`, "Correct: solid to gas gives the greatest increase in the number of ways the molecules and their energy can be arranged."],
      [t`$\ce{H2O(s) -> H2O(l)}$`, "Melting increases entropy, but much less than forming a gas."],
      [t`$\ce{H2O(l) -> H2O(s)}$`, "Freezing decreases entropy."],
      [t`$\ce{H2O(g) -> H2O(l)}$`, "Condensing decreases entropy."],
    ],
    answer: "A",
    explanation: "Entropy: gas ≫ liquid > solid. Going all the way from solid to gas gives the largest increase.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: t`What is the sign of ΔS for $\ce{2SO2(g) + O2(g) -> 2SO3(g)}$, and why?`,
    options: [
      ["Negative, because three moles of gas become two moles of gas", "Correct: fewer gas molecules means fewer possible arrangements."],
      ["Positive, because sulfur trioxide molecules are larger than sulfur dioxide molecules", "Molecular size matters much less than the number of moles of gas."],
      ["Positive, because the reaction is exothermic", "The sign of ΔH does not decide the sign of ΔS."],
      ["Zero, because all the substances are gases", "The amount of gas changes, so the entropy changes."],
    ],
    answer: "A",
    explanation: "Count moles of gas: 3 on the left, 2 on the right. Fewer gas particles, fewer arrangements: ΔS is negative.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "A reaction has a negative ΔH and a negative ΔS. Which statement is correct?",
    options: [
      ["It is feasible only below a certain temperature.", "Correct: −TΔS is positive and grows with T, so ΔG becomes positive at high temperature."],
      ["It is feasible at all temperatures.", "That needs ΔH negative and ΔS positive."],
      ["It is never feasible.", "That needs ΔH positive and ΔS negative."],
      ["It is feasible only above a certain temperature.", "That is the case for ΔH positive and ΔS positive."],
    ],
    answer: "A",
    hints: ["ΔG = ΔH − TΔS. What is the sign of −TΔS when ΔS is negative?"],
    explanation: "With ΔS < 0 the term −TΔS is positive. At low T the negative ΔH dominates and ΔG < 0; above T = ΔH/ΔS, ΔG > 0.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about entropy are correct?\n\n1. The standard entropy of every substance at 298 K is positive.\n2. Entropy usually decreases when a solid dissolves in water.\n3. The standard entropy of an element in its standard state is zero.",
    options: [
      ["1 and 2 only", "Statement 2 is false: particles spread out on dissolving, so entropy usually increases."],
      ["1 only", "Correct: statement 2 is false (dissolving usually increases entropy) and statement 3 confuses entropy with enthalpy of formation."],
      ["2 and 3 only", "Both are false; only statement 1 is correct."],
      ["1, 2 and 3", "Statements 2 and 3 are both false."],
    ],
    answer: "B",
    hints: ["Which quantity is defined as zero for elements: ΔH⦵f or S⦵?"],
    explanation: "Only a perfect crystal at 0 K has zero entropy, so every substance at 298 K, elements included, has S⦵ > 0. Dissolving a solid usually increases entropy because the particles spread out through the solvent.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "For which reaction is ΔS⦵ most likely to be positive?",
    options: [
      [t`$\ce{NH4Cl(s) -> NH3(g) + HCl(g)}$`, "Correct: a solid forms two moles of gas."],
      [t`$\ce{NH3(g) + HCl(g) -> NH4Cl(s)}$`, "Two moles of gas form a solid: entropy falls."],
      [t`$\ce{2H2(g) + O2(g) -> 2H2O(l)}$`, "Three moles of gas form a liquid: entropy falls."],
      [t`$\ce{CaO(s) + CO2(g) -> CaCO3(s)}$`, "A gas is used up to form a solid: entropy falls."],
    ],
    answer: "A",
    hints: ["Count moles of gas on each side."],
    explanation: "The reaction that produces gas from a solid has the largest increase in disorder: NH₄Cl(s) → NH₃(g) + HCl(g).",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statements explain why a reaction with a negative value of ΔG⦵ might not be observed at 298 K?\n\n1. The activation energy may be very high, so the rate is negligible.\n2. The conditions in the experiment may not be standard.\n3. A negative ΔG⦵ means the reaction is endothermic.",
    options: [
      ["1 and 2 only", "Correct: kinetics and non-standard conditions both limit predictions from ΔG⦵."],
      ["1, 2 and 3", "Statement 3 is false: the sign of ΔG does not show whether the reaction is endothermic."],
      ["2 and 3 only", "Statement 1 is the most important reason, and statement 3 is false."],
      ["1 only", "Statement 2 is also a valid limitation: ΔG⦵ applies to standard conditions."],
    ],
    answer: "A",
    hints: ["Does ΔG say anything about rate?"],
    explanation: "ΔG⦵ predicts feasibility under standard conditions only. A very high activation energy makes a feasible reaction too slow to see (for example diamond → graphite), and different concentrations or pressures change ΔG.",
  });
  {
    const v = entropyChange([[2, 256.7]], [[2, 248.1], [1, 205.0]]);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`Data: S⦵ / J K⁻¹ mol⁻¹: $\ce{SO2(g)}$ 248.1, $\ce{O2(g)}$ 205.0, $\ce{SO3(g)}$ 256.7. Calculate ΔS⦵ for $\ce{2SO2(g) + O2(g) -> 2SO3(g)}$, in J K⁻¹ mol⁻¹, to one decimal place.`,
      value: v, dp: 1, unit: "J/K/mol",
      wrong: [dpStr(-v, 1), dpStr(entropyChange([[2, 256.7]], [[2, 248.1]]), 1)],
      explanation: `ΔS⦵ = 2(256.7) − [2(248.1) + 205.0] = ${dpStr(2 * 256.7, 1)} − ${dpStr(2 * 248.1 + 205, 1)} = ${dpStr(v, 1)} J K⁻¹ mol⁻¹. Leaving out O₂ (treating an element as zero) gives ${dpStr(entropyChange([[2, 256.7]], [[2, 248.1]]), 1)}.`,
    });
  }
  {
    const v = gibbs(25.7, 298, 108.7);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true, daily: true,
      stem: "When ammonium nitrate dissolves in water, ΔH⦵ = +25.7 kJ mol⁻¹ and ΔS⦵ = +108.7 J K⁻¹ mol⁻¹. Calculate ΔG⦵ at 298 K, in kJ mol⁻¹, to three significant figures.",
      value: v, sf: 3, unit: "kJ/mol",
      wrong: [sfStr(25.7 - 298 * 108.7, 3)],
      hints: ["Convert ΔS to kJ K⁻¹ mol⁻¹ first."],
      explanation: `ΔG⦵ = 25.7 − 298 × 0.1087 = ${sfStr(v, 3)} kJ mol⁻¹. It is negative, so dissolving is feasible even though it is endothermic: the entropy increase drives it. Forgetting to divide ΔS by 1000 gives a meaningless ${sfStr(25.7 - 298 * 108.7, 3)}.`,
    });
  }
  {
    const T = feasibilityT(467.9, 558.4);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`For $\ce{2Fe2O3(s) + 3C(s) -> 4Fe(s) + 3CO2(g)}$, ΔH⦵ = +467.9 kJ mol⁻¹ and ΔS⦵ = +558.4 J K⁻¹ mol⁻¹. Calculate the minimum temperature, in K, at which the reaction becomes feasible, to three significant figures.`,
      value: T, sf: 3, unit: "K",
      wrong: [sfStr(T - 273, 3), sfStr(467.9 / 558.4, 3)],
      hints: ["At the changeover, ΔG = 0, so T = ΔH/ΔS.", "Use the same energy unit for both."],
      explanation: `1. Set ΔG = 0: T = ΔH/ΔS.\n2. T = 467 900 J mol⁻¹ ÷ 558.4 J K⁻¹ mol⁻¹ = ${sfStr(T, 3)} K.\n3. Above this temperature −TΔS outweighs the positive ΔH. Giving the answer in °C (${sfStr(T - 273, 3)}) or forgetting the kJ → J conversion (${sfStr(467.9 / 558.4, 3)}) are common errors.`,
    });
  }
  {
    const dS = entropyChange([[1, 26.9], [1, 214]], [[1, 65.7]]);
    const G = gibbs(100, 500, dS);
    const T = feasibilityT(100, dS);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`For $\ce{MgCO3(s) -> MgO(s) + CO2(g)}$, ΔH⦵ = +100 kJ mol⁻¹. Data: S⦵ / J K⁻¹ mol⁻¹: $\ce{MgCO3(s)}$ 65.7, $\ce{MgO(s)}$ 26.9, $\ce{CO2(g)}$ 214. Calculate the lowest temperature, in K, at which the decomposition is feasible, to three significant figures.`,
      value: T, sf: 3, unit: "K",
      wrong: [sfStr(T - 273, 3)],
      hints: ["Find ΔS⦵ first.", "Then T = ΔH/ΔS with consistent units."],
      explanation: `1. ΔS⦵ = (26.9 + 214) − 65.7 = +${dpStr(dS, 1)} J K⁻¹ mol⁻¹.\n2. T = 100 000 ÷ ${dpStr(dS, 1)} = ${sfStr(T, 3)} K.\n3. Check: at 500 K, ΔG = 100 − 500 × ${sfStr(dS / 1000, 4)} = +${sfStr(G, 3)} kJ mol⁻¹, still positive, consistent with a changeover above 500 K.`,
    });
  }
  {
    const v = entropyChange([[2, 26.9]], [[2, 32.7], [1, 205.1]]);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Data: S⦵ / J K⁻¹ mol⁻¹: $\ce{Mg(s)}$ 32.7, $\ce{O2(g)}$ 205.1, $\ce{MgO(s)}$ 26.9. Calculate ΔS⦵ for $\ce{2Mg(s) + O2(g) -> 2MgO(s)}$, in J K⁻¹ mol⁻¹, to one decimal place.`,
      value: v, dp: 1, unit: "J/K/mol",
      wrong: [dpStr(-v, 1), dpStr(entropyChange([[2, 26.9]], [[2, 32.7]]), 1)],
      hints: ["Multiply each S⦵ by its coefficient; include oxygen."],
      explanation: `ΔS⦵ = 2(26.9) − [2(32.7) + 205.1] = ${dpStr(v, 1)} J K⁻¹ mol⁻¹: negative, because a mole of gas is used up to make solids. The reaction is still feasible because it is very exothermic.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "An endothermic reaction can be feasible at 298 K if its entropy change is large and positive.",
    answer: true,
    explanation: "True. If TΔS is larger than ΔH, ΔG = ΔH − TΔS is negative; dissolving ammonium nitrate is an example.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The standard entropy of oxygen gas, O₂(g), is zero because it is an element.",
    answer: false,
    explanation: "False. Only enthalpies of formation of elements are zero. O₂(g) has a standard entropy of about 205 J K⁻¹ mol⁻¹.",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    stem: "Match each combination of signs with the feasibility of the reaction.",
    pairs: [
      ["ΔH negative, ΔS positive", "feasible at all temperatures"],
      ["ΔH positive, ΔS negative", "never feasible"],
      ["ΔH negative, ΔS negative", "feasible below T = ΔH/ΔS"],
      ["ΔH positive, ΔS positive", "feasible above T = ΔH/ΔS"],
    ],
    hints: ["Work out the sign of ΔG = ΔH − TΔS at low and at high T."],
    explanation: "ΔG = ΔH − TΔS. When ΔH and −TΔS have the same sign the answer never changes; when they differ, temperature decides which wins.",
  });
  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "Complete the instructions for using the Gibbs equation.",
    template: "Before using ΔG = ΔH − TΔS with ΔH in kJ mol⁻¹, divide ΔS in J K⁻¹ mol⁻¹ by {{blank:a}}, and give T in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["1000"], choices: ["1000", "100", "273"] },
      { id: "b", accepted: ["kelvin"], choices: ["kelvin", "degrees Celsius"] },
    ],
    explanation: "1 kJ = 1000 J, so ΔS/1000 is in kJ K⁻¹ mol⁻¹; T is always in kelvin.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "State the sign of ΔS when steam condenses to liquid water.",
    accepted: ["negative", "-", "−", "minus", "negative (entropy decreases)", "it is negative"],
    wrong: ["positive"],
    explanation: "Negative: gas molecules become a liquid, with far fewer possible arrangements.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why the entropy of the system increases when solid potassium chloride dissolves in water.",
    points: ["The ions in the ordered lattice become free to move independently through the solution.", "So there are many more possible arrangements of the particles (and of their energy)."],
    modelAnswer: "In the lattice the K⁺ and Cl⁻ ions are held in fixed positions; in solution they spread out and move independently, so there are many more ways to arrange the particles and their energy.",
    explanation: "Link the change in particle freedom to the number of possible arrangements.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 2,
    stem: "The conversion of diamond into graphite has a negative ΔG⦵ at 298 K, yet diamonds do not change into graphite. Explain why.",
    points: ["ΔG only shows that the change is feasible (thermodynamically possible); it says nothing about rate.", "The activation energy is extremely high (many strong covalent bonds must break), so the rate at 298 K is negligible."],
    modelAnswer: "A negative ΔG means the change is feasible, but the rearrangement needs many strong C–C bonds to break, so its activation energy is very large and the rate at room temperature is effectively zero: diamond is kinetically stable.",
    hints: ["Thermodynamics versus kinetics."],
    explanation: "Feasibility (ΔG) and rate (activation energy) are separate questions.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "A graph of ΔG⦵ (y-axis, kJ mol⁻¹) against T (x-axis, K) is a straight line for a reaction. Describe what the gradient, the intercept on the ΔG axis and the point where the line crosses the T axis represent.",
    points: ["The gradient is −ΔS (in kJ K⁻¹ mol⁻¹).", "The intercept on the ΔG axis (T = 0) is ΔH.", "Where the line crosses ΔG = 0 is the temperature at which the reaction becomes (or stops being) feasible, T = ΔH/ΔS."],
    modelAnswer: "Comparing ΔG = ΔH − TΔS with y = c + mx: the gradient is −ΔS, the intercept at T = 0 is ΔH, and the line crosses the T axis where ΔG = 0, the temperature of changeover in feasibility (ΔH/ΔS).",
    hints: ["Compare ΔG = ΔH − TΔS with y = mx + c."],
    explanation: "This is a common Paper 5 analysis: rearrange the equation into straight-line form.",
  });
  {
    const dH = 135.6;
    const dS = entropyChange([[1, 135.0], [1, 213.8], [1, 188.8]], [[2, 101.7]]);
    const G = gibbs(dH, 298, dS);
    const T = feasibilityT(dH, dS);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: t`When sodium hydrogencarbonate is heated in an oven (for example in baking), it decomposes:

$\ce{2NaHCO3(s) -> Na2CO3(s) + CO2(g) + H2O(g)}$ ΔH⦵ = +135.6 kJ mol⁻¹

Data: S⦵ / J K⁻¹ mol⁻¹: $\ce{NaHCO3(s)}$ 101.7, $\ce{Na2CO3(s)}$ 135.0, $\ce{CO2(g)}$ 213.8, $\ce{H2O(g)}$ 188.8.`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Predict the sign of ΔS⦵ for this reaction and explain your prediction.", points: ["Positive.", "Two moles of gas are formed from solid reactants, greatly increasing the number of possible arrangements."], modelAnswer: "Positive: a solid produces two moles of gaseous products, and gases have far more possible arrangements than solids." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate ΔS⦵ for the reaction, in J K⁻¹ mol⁻¹, to one decimal place.", value: dS, dp: 1, unit: "J/K/mol", wrong: [dpStr(entropyChange([[1, 135.0], [1, 213.8], [1, 188.8]], [[1, 101.7]]), 1)], explanation: `ΔS⦵ = (135.0 + 213.8 + 188.8) − 2(101.7) = ${dpStr(dS, 1)} J K⁻¹ mol⁻¹.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate ΔG⦵ at 298 K, in kJ mol⁻¹, to three significant figures, and so decide whether the reaction is feasible at 298 K.", value: G, sf: 3, unit: "kJ/mol", wrong: [sfStr(dH - 298 * dS, 3)], explanation: `ΔG⦵ = 135.6 − 298 × ${sfStr(dS / 1000, 4)} = +${sfStr(G, 3)} kJ mol⁻¹: positive, so not feasible at 298 K.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the lowest temperature, in K, at which the decomposition becomes feasible, to three significant figures.", value: T, sf: 3, unit: "K", wrong: [sfStr(T - 273, 3)], explanation: `T = 135 600 ÷ ${dpStr(dS, 1)} = ${sfStr(T, 3)} K (about ${Math.round(T - 273)} °C), easily reached in an oven.` }),
      ],
      hints: ["Count moles of gas for (a).", "Remember the coefficient 2 for NaHCO₃."],
      explanation: `ΔS⦵ = +${dpStr(dS, 1)} J K⁻¹ mol⁻¹, ΔG⦵(298 K) = +${sfStr(G, 3)} kJ mol⁻¹, feasible above ${sfStr(T, 3)} K.`,
    });
  }
  {
    const dH = 57.2, dS = 175.8;
    const Ts = [280, 300, 320, 340, 360];
    const pts = Ts.map((T) => [T, round(gibbs(dH, T, dS), 2)]);
    const fit = linearFit(pts);
    const S = -fit.m * 1000;
    const H = fit.c;
    const T0 = H / -fit.m;
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: t`Values of ΔG⦵ for $\ce{N2O4(g) -> 2NO2(g)}$ were calculated at several temperatures:

| T / K | ${Ts.join(" | ")} |
|---|---|---|---|---|---|
| ΔG⦵ / kJ mol⁻¹ | ${pts.map(([, g]) => dpStr(g, 2)).join(" | ")} |

A graph of ΔG⦵ against T is a straight line.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Use the gradient of the line to find ΔS⦵ for the reaction, in J K⁻¹ mol⁻¹, to three significant figures.", value: S, sf: 3, unit: "J/K/mol", wrong: [sfStr(-S, 3), sfStr(S / 1000, 3)], explanation: `Gradient = (${dpStr(pts[4][1], 2)} − ${dpStr(pts[0][1], 2)}) ÷ (360 − 280) = ${sfStr(fit.m, 3)} kJ K⁻¹ mol⁻¹ = −ΔS, so ΔS⦵ = +${sfStr(S, 3)} J K⁻¹ mol⁻¹.` }),
        P.num({ label: "(b)", marks: 2, stem: "Find ΔH⦵ for the reaction, in kJ mol⁻¹, to three significant figures.", value: H, sf: 3, unit: "kJ/mol", explanation: `ΔH = ΔG + TΔS; for example at 300 K: ${dpStr(pts[1][1], 2)} + 300 × ${sfStr(S / 1000, 4)} = ${sfStr(H, 3)} kJ mol⁻¹ (the intercept of the line at T = 0).` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the temperature, in K, at which ΔG⦵ = 0, to three significant figures.", value: T0, sf: 3, unit: "K", explanation: `T = ΔH/ΔS = ${sfStr(H, 3)} ÷ ${sfStr(S / 1000, 4)} = ${sfStr(T0, 3)} K. Above this temperature dissociation into NO₂ is feasible under standard conditions.` }),
      ],
      hints: ["ΔG = ΔH − TΔS has the form y = c + mx.", "Gradient = −ΔS (in kJ K⁻¹ mol⁻¹)."],
      explanation: `ΔS⦵ = +${sfStr(S, 3)} J K⁻¹ mol⁻¹, ΔH⦵ = +${sfStr(H, 3)} kJ mol⁻¹, ΔG⦵ = 0 at ${sfStr(T0, 3)} K.`,
    });
  }
  b.card("DEFINITION", "Entropy", "A measure of the number of ways the particles of a system and their energy can be arranged; units J K⁻¹ mol⁻¹.");
  b.card("FORMULA", "Entropy change of reaction", "ΔS⦵ = ΣS⦵(products) − ΣS⦵(reactants); elements have non-zero entropy.");
  b.card("FORMULA", "Gibbs equation", "ΔG⦵ = ΔH⦵ − TΔS⦵ (ΔS in kJ K⁻¹ mol⁻¹, T in K). Feasible when ΔG ≤ 0.");
  b.card("FORMULA", "Temperature of feasibility", "T = ΔH/ΔS (from ΔG = 0), with ΔH and ΔS in matching units.");
  b.card("CONCEPT", "Quick sign of ΔS", "Count moles of gas: more gas in products → ΔS positive; fewer → negative.");
  b.card("CONCEPT", "ΔH −, ΔS −", "Feasible only at low temperatures (below ΔH/ΔS).");
  b.card("CONCEPT", "ΔH +, ΔS +", "Feasible only at high temperatures (above ΔH/ΔS), e.g. decomposition of CaCO₃.");
  b.card("CONCEPT", "Limits of ΔG predictions", "Feasible is not fast (activation energy); ΔG⦵ applies to standard conditions; ΔH and ΔS assumed constant with T.");
  b.card("CONCEPT", "Graph of ΔG against T", "Straight line: gradient −ΔS, intercept ΔH, crosses ΔG = 0 at T = ΔH/ΔS.");
});
