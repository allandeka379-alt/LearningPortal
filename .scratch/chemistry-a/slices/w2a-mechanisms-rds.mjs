// W2a: achem.kinetics.mechanisms-rds (both boards; ZIMSEC Form 5, Cambridge A Level only)
import { concept, P, t, ce, orderFrom, rateConstant, rateFrom, sfStr, dpStr, sciStr, chk } from "../lib.mjs";

concept("achem.kinetics.mechanisms-rds", { file: "kinetics/mechanisms-rds", keyPrefix: "kinetics.mechanisms-rds" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the rate-determining step of a reaction mechanism?",
    options: [
      ["the slowest step in the mechanism", "Correct: it limits the overall rate."],
      ["the first step in the mechanism", "The slow step need not be the first."],
      ["the step with the most negative enthalpy change", "ΔH of a step does not decide which step is slowest."],
      ["the step in which the final product is formed", "Product-forming steps are often fast."],
    ],
    answer: "A",
    explanation: "The overall rate cannot be faster than the slowest step.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`A reaction occurs in two steps: step 1 (slow) $\ce{A + B -> C + D}$; step 2 (fast) $\ce{A + C -> E}$. What is the rate equation?`,
    options: [
      ["rate = k[A][B]", "Correct: one A and one B take part in the slow step."],
      ["rate = k[A]²[B]", "The second A reacts in the fast step after the slow step, so it does not appear."],
      ["rate = k[A][C]", "C is an intermediate formed in the slow step; step 2 does not control the rate."],
      ["rate = k[A]²[B][C]", "Only species in (or before) the slow step appear."],
    ],
    answer: "A",
    explanation: "The rate equation reflects the reactants of the rate-determining step: rate = k[A][B].",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: t`For the mechanism step 1 $\ce{NO2 + NO2 -> NO3 + NO}$ (slow), step 2 $\ce{NO3 + CO -> NO2 + CO2}$ (fast), which species is an intermediate?`,
    options: [
      [t`$\ce{NO3}$`, "Correct: formed in step 1 and used in step 2."],
      [t`$\ce{CO}$`, "CO is a reactant in the overall equation."],
      [t`$\ce{NO}$`, "NO is a product of the overall reaction."],
      [t`$\ce{CO2}$`, "CO₂ is a product of the overall reaction."],
    ],
    answer: "A",
    explanation: "Adding the steps gives NO₂ + CO → NO + CO₂; NO₃ cancels, so it is an intermediate.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: t`Hydrogen peroxide decomposes in the presence of iodide ions: step 1 (slow) $\ce{H2O2 + I- -> H2O + IO-}$; step 2 (fast) $\ce{H2O2 + IO- -> H2O + O2 + I-}$. What is the role of the iodide ion?`,
    options: [
      ["a catalyst", "Correct: used in step 1 and regenerated in step 2."],
      ["an intermediate", "An intermediate is formed first and used later; I⁻ is used first and remade."],
      ["a product", "I⁻ is not produced overall; it cancels."],
      ["a reactant that is used up", "The I⁻ consumed in step 1 is regenerated in step 2."],
    ],
    answer: "A",
    hints: ["Is it used first or made first?"],
    explanation: "I⁻ is a homogeneous catalyst; IO⁻ is the intermediate. The rate equation is rate = k[H₂O₂][I⁻].",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: t`2-bromo-2-methylpropane is hydrolysed by aqueous hydroxide ions. The rate equation is rate = k[$\ce{(CH3)3CBr}$]. Which statement is correct?`,
    options: [
      ["The slow step involves only the halogenoalkane, which ionises to a carbocation.", "Correct: an SN1 mechanism; OH⁻ reacts in a later fast step."],
      ["The slow step involves a collision between the halogenoalkane and OH⁻.", "Then OH⁻ would appear in the rate equation (SN2)."],
      ["Hydroxide ions are not used up in the reaction.", "OH⁻ is used up; it just reacts after the slow step."],
      ["The reaction must happen in one step.", "A single step would involve OH⁻ in the rate equation."],
    ],
    answer: "A",
    hints: ["Which species is missing from the rate equation?"],
    explanation: "SN1: (CH₃)₃CBr → (CH₃)₃C⁺ + Br⁻ (slow), then (CH₃)₃C⁺ + OH⁻ → (CH₃)₃COH (fast).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "For the acid-catalysed iodination of propanone, rate = k[CH₃COCH₃][H⁺]. Which statements are correct?\n\n1. Iodine is not involved in the rate-determining step.\n2. H⁺ ions are used up overall in the reaction.\n3. A graph of [I₂] against time is a straight line.",
    options: [
      ["1 and 3 only", "Correct: zero order in I₂ means a constant rate of iodine loss; H⁺ is a catalyst."],
      ["1, 2 and 3", "Statement 2 is false: H⁺ is a catalyst, regenerated overall (the reaction also forms H⁺)."],
      ["2 and 3 only", "Statement 2 is false and statement 1 is true."],
      ["1 only", "Statement 3 is also true: zero order gives a straight concentration–time line."],
    ],
    answer: "A",
    hints: ["What does zero order in iodine mean for its concentration–time graph?"],
    explanation: "Iodine reacts after the slow step (zero order), so it is used at a constant rate. H⁺ catalyses the reaction and is not consumed.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: t`A proposed mechanism for $\ce{2NO2 + F2 -> 2NO2F}$ is: step 1 (slow) $\ce{NO2 + F2 -> NO2F + F}$; step 2 (fast) $\ce{NO2 + F -> NO2F}$. Which statements are correct?\n\n1. The predicted rate equation is rate = k[NO₂][F₂].\n2. F atoms are an intermediate.\n3. The reaction is second order with respect to NO₂ because the equation has 2NO₂.`,
    options: [
      ["1 and 2 only", "Correct: only one NO₂ is in the slow step; F is formed then used."],
      ["1, 2 and 3", "Statement 3 is false: orders come from the slow step, not the overall equation."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is true."],
      ["1 only", "Statement 2 is also true."],
    ],
    answer: "A",
    hints: ["Which particles are in the slow step?"],
    explanation: "Slow step: one NO₂ and one F₂, so rate = k[NO₂][F₂], first order in NO₂. F is an intermediate.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "The reaction 2X + Y → X₂Y has the rate equation rate = k[X]². Which mechanism is consistent with this?",
    options: [
      ["step 1 (slow) X + X → X₂; step 2 (fast) X₂ + Y → X₂Y", "Correct: two X in the slow step; Y joins afterwards (zero order); the steps add up."],
      ["step 1 (slow) X + Y → XY; step 2 (fast) XY + X → X₂Y", "This predicts rate = k[X][Y]."],
      ["one step (slow) 2X + Y → X₂Y", "This predicts rate = k[X]²[Y]."],
      ["step 1 (fast) X + X → X₂; step 2 (slow) X₂ + Y → X₂Y", "With Y in the slow step, Y would appear in the rate equation."],
    ],
    answer: "A",
    hints: ["Y must not be in or before the slow step."],
    explanation: "The slow step must contain exactly two X and no Y, and the steps must add to 2X + Y → X₂Y.",
  });
  {
    const n = orderFrom(3.6e-5, 3.6e-5, 0.01, 0.03);
    b.num({
      d: 2, skill: "ANALYSIS", daily: true,
      stem: "In a series of experiments, tripling the concentration of reactant Q (all else constant) leaves the initial rate unchanged at 3.6 × 10⁻⁵ mol dm⁻³ s⁻¹. What is the order with respect to Q?",
      value: n,
      wrong: [1],
      explanation: "Rate unchanged when [Q] × 3: 3⁰ = 1, so zero order. Q reacts only after the rate-determining step.",
    });
  }
  {
    const k = rateConstant(4.8e-3, [[0.02, 1], [0.04, 1]]);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`In an experiment on $\ce{2NO2(g) + F2(g) -> 2NO2F(g)}$, rate = k[NO₂][F₂]. When [NO₂] = 0.0200 and [F₂] = 0.0400 mol dm⁻³, the rate of reaction is 4.80 × 10⁻³ mol dm⁻³ s⁻¹. Calculate k, in dm³ mol⁻¹ s⁻¹.`,
      value: k, sf: 3, unit: "dm³/mol/s",
      wrong: [rateConstant(4.8e-3, [[0.02, 2], [0.04, 1]])],
      hints: ["Use the rate equation, not the coefficients of the overall equation."],
      explanation: `1. k = rate ÷ ([NO₂][F₂]) = 4.80 × 10⁻³ ÷ (0.0200 × 0.0400) = ${sfStr(k, 3)} dm³ mol⁻¹ s⁻¹.\n2. Squaring [NO₂] because of the 2 in the equation gives ${sfStr(rateConstant(4.8e-3, [[0.02, 2], [0.04, 1]]), 3)}, which is wrong.`,
    });
  }
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "2-bromo-2-methylpropane is hydrolysed by OH⁻ ions by an SN1 mechanism. By what factor does the initial rate change if [OH⁻] is doubled and the halogenoalkane concentration is kept the same?",
    value: 1,
    wrong: [2],
    hints: ["Is OH⁻ in the rate equation?"],
    explanation: "Rate = k[(CH₃)₃CBr]; OH⁻ reacts after the slow step, so the factor is 1 (no change).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A catalyst can appear in the rate equation of a reaction even though it does not appear in the overall equation.",
    answer: true,
    explanation: "True: e.g. H⁺ in the iodination of propanone and I⁻ in the decomposition of H₂O₂ are in the rate equations.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "An intermediate appears in the overall balanced equation for a reaction.",
    answer: false,
    explanation: "False. It is formed in one step and used up in another, so it cancels when the steps are added.",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    stem: t`For the iodide-catalysed decomposition, step 1 (slow) $\ce{H2O2 + I- -> H2O + IO-}$; step 2 (fast) $\ce{H2O2 + IO- -> H2O + O2 + I-}$, match each species with its role.`,
    pairs: [
      [t`$\ce{IO-}$`, "intermediate"],
      [t`$\ce{I-}$`, "catalyst"],
      [t`$\ce{H2O2}$`, "reactant"],
      [t`$\ce{O2}$`, "product"],
    ],
    hints: ["Made then used, or used then remade?"],
    explanation: "IO⁻ is made in step 1 and used in step 2 (intermediate); I⁻ is used then regenerated (catalyst).",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statement.",
    template: "Species that react only {{blank:a}} the rate-determining step do not appear in the rate equation; they are {{blank:b}} order.",
    blanks: [
      { id: "a", accepted: ["after"], choices: ["after", "before", "during"] },
      { id: "b", accepted: ["zero"], choices: ["zero", "first", "second"] },
    ],
    explanation: "Only the slow step (and steps before it) controls the rate.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of intermediate formed in the slow step of the SN1 hydrolysis of a tertiary halogenoalkane.",
    accepted: ["carbocation", "a carbocation", "tertiary carbocation", "carbonium ion", "carbocation ion"],
    wrong: ["free radical"],
    explanation: "A (tertiary) carbocation, e.g. (CH₃)₃C⁺.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: t`The reaction $\ce{2A + B -> A2B}$ has rate = k[A][B]. Suggest a two-step mechanism consistent with this, stating which step is slow.`,
    points: ["Slow step: A + B → AB (one A and one B, matching the rate equation)", "Fast step: AB + A → A₂B", "The two steps add up to the overall equation, AB being an intermediate"],
    modelAnswer: "Step 1 (slow): A + B → AB. Step 2 (fast): AB + A → A₂B. The slow step contains one A and one B, giving rate = k[A][B]; adding the steps gives 2A + B → A₂B with AB as an intermediate.",
    hints: ["Put exactly the species in the rate equation into the slow step."],
    explanation: "Check both conditions: rate equation and overall equation.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why the rate of hydrolysis of 1-bromopropane depends on [OH⁻] but that of 2-bromo-2-methylpropane does not.",
    points: ["1-bromopropane (primary) reacts by SN2: OH⁻ and the halogenoalkane both take part in the single (rate-determining) step, so rate = k[RBr][OH⁻]", "2-bromo-2-methylpropane (tertiary) reacts by SN1: the slow step is ionisation of the halogenoalkane alone; OH⁻ attacks the carbocation in a fast later step, so rate = k[RBr]"],
    modelAnswer: "The primary halogenoalkane reacts in one step in which OH⁻ attacks as Br⁻ leaves, so both appear in the rate equation. The tertiary one first ionises slowly to a carbocation; OH⁻ only reacts in the fast second step, so it is zero order.",
    hints: ["SN2 or SN1?"],
    explanation: "Different mechanisms give different rate equations.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 2,
    stem: "A student proposes that the iodination of propanone happens in one step: CH₃COCH₃ + I₂ → CH₃COCH₂I + HI. Use the rate equation, rate = k[CH₃COCH₃][H⁺], to evaluate this proposal.",
    points: ["A single step involving propanone and iodine would give rate = k[CH₃COCH₃][I₂]", "But the reaction is zero order in I₂ and first order in H⁺, so H⁺ is in the slow step and I₂ reacts later: the one-step mechanism is wrong"],
    modelAnswer: "A one-step mechanism would make the rate depend on [I₂] and not on [H⁺]. Experimentally the rate is independent of [I₂] and proportional to [H⁺], so iodine must react after a slow step involving propanone and H⁺. The proposal is not consistent with the data.",
    hints: ["Compare what the proposal predicts with what is observed."],
    explanation: "A mechanism must reproduce the experimental rate equation.",
  });
  // Structured: hydrogen peroxide and iodide in acid
  {
    const k = 0.0115;
    const ex = [[0.01, 0.02, 0.1], [0.02, 0.02, 0.1], [0.01, 0.04, 0.1], [0.01, 0.02, 0.2]];
    const r = ex.map(([h, i]) => rateFrom(k, [[h, 1], [i, 1]]));
    const o1 = orderFrom(r[0], r[1], 0.01, 0.02), o2 = orderFrom(r[0], r[2], 0.02, 0.04), o3 = orderFrom(r[0], r[3], 0.1, 0.2);
    const kc = rateConstant(r[0], [[0.01, o1], [0.02, o2]]);
    chk(kc, k, 1e-12, "k");
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: t`Hydrogen peroxide oxidises iodide ions in acid: $\ce{H2O2(aq) + 2I-(aq) + 2H+(aq) -> I2(aq) + 2H2O(l)}$. Initial rates at 25 °C:

| Exp. | [H₂O₂] / mol dm⁻³ | [I⁻] / mol dm⁻³ | [H⁺] / mol dm⁻³ | Initial rate / mol dm⁻³ s⁻¹ |
|---|---|---|---|---|
${ex.map(([h, i, hp], j) => `| ${j + 1} | ${sfStr(h, 2)} | ${sfStr(i, 2)} | ${sfStr(hp, 2)} | ${sciStr(r[j], 3)} |`).join("\n")}`,
      parts: [
        P.group({ label: "(a)", stem: "Deduce the order with respect to:", parts: [
          P.num({ label: "(i)", marks: 1, stem: "H₂O₂;", value: o1, wrong: [2], explanation: "Exp. 1 and 2: [H₂O₂] × 2, rate × 2: first order." }),
          P.num({ label: "(ii)", marks: 1, stem: "I⁻;", value: o2, wrong: [2], explanation: "Exp. 1 and 3: [I⁻] × 2, rate × 2: first order." }),
          P.num({ label: "(iii)", marks: 1, stem: "H⁺.", value: o3, wrong: [2], explanation: "Exp. 1 and 4: [H⁺] × 2, rate unchanged: zero order." }),
        ] }),
        P.mcq({ label: "(b)", marks: 1, stem: "Which is the rate equation?", options: [
          ["rate = k[H₂O₂][I⁻]", "Correct: first order in H₂O₂ and I⁻, zero order in H⁺."],
          ["rate = k[H₂O₂][I⁻]²[H⁺]²", "These are the coefficients of the equation, not the experimental orders."],
          ["rate = k[H₂O₂][I⁻][H⁺]", "The rate does not change when [H⁺] doubles."],
          ["rate = k[I⁻]²", "The rate depends on [H₂O₂] and is first order in I⁻."],
        ], answer: "A", explanation: "Rate = k[H₂O₂][I⁻]." }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate k, in dm³ mol⁻¹ s⁻¹, to three significant figures.", value: kc, sf: 3, unit: "dm³/mol/s", wrong: [rateConstant(r[0], [[0.01, 1], [0.02, 1], [0.1, 1]])], explanation: `k = ${sciStr(r[0], 3)} ÷ (0.010 × 0.020) = ${sfStr(kc, 3)} dm³ mol⁻¹ s⁻¹.` }),
        P.manual({ label: "(d)", marks: 3, stem: "Suggest a two-step mechanism consistent with the rate equation and the overall equation, stating which step is slow.", points: ["Slow step: H₂O₂ + I⁻ → H₂O + IO⁻ (one H₂O₂ and one I⁻)", "Fast step: IO⁻ + I⁻ + 2H⁺ → I₂ + H₂O", "The steps add to the overall equation and H⁺ appears only after the slow step (zero order)"], modelAnswer: "Step 1 (slow): H₂O₂ + I⁻ → H₂O + IO⁻. Step 2 (fast): IO⁻ + I⁻ + 2H⁺ → I₂ + H₂O. The slow step contains one H₂O₂ and one I⁻, matching rate = k[H₂O₂][I⁻]; H⁺ reacts only in the fast step, so it is zero order; the steps add up to the overall equation." }),
        P.short({ label: "(e)", marks: 1, stem: "Give the formula of the intermediate in your mechanism.", accepted: ["IO-", "IO⁻", "OI-", "hypoiodite", "IO- ion"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["I2"], explanation: "IO⁻ is formed in step 1 and used in step 2." }),
        P.mcq({ label: "(f)", marks: 1, stem: "Why does doubling [H⁺] have no effect on the rate?", options: [
          ["H⁺ is not involved in the rate-determining step.", "Correct: it reacts only in a later fast step."],
          ["H⁺ is a catalyst and is not used up.", "H⁺ is used up here (2H⁺ in the equation); the reason is its place after the slow step."],
          ["The concentration of H⁺ is too small to matter.", "It is larger than the other concentrations."],
          ["H⁺ ions do not collide with other particles.", "They collide, but not in the slow step."],
        ], answer: "A", explanation: "Zero order: not in or before the slow step." }),
        P.tf({ label: "(g)", marks: 1, stem: "The overall order of the reaction is 2.", answer: true, explanation: "1 + 1 + 0 = 2." }),
      ],
      hints: ["Change one concentration at a time.", "The slow step must contain exactly the species in the rate equation."],
      explanation: `Rate = k[H₂O₂][I⁻], k = ${sfStr(kc, 3)} dm³ mol⁻¹ s⁻¹; slow step H₂O₂ + I⁻ → H₂O + IO⁻.`,
    });
  }
  // Structured: NO2 + CO
  {
    const k = rateConstant(1.8e-6, [[0.03, 2]]);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: t`Below about 500 K, the reaction $\ce{NO2(g) + CO(g) -> NO(g) + CO2(g)}$ has the experimental rate equation rate = k[NO₂]².`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Explain what the rate equation shows about the role of carbon monoxide in the mechanism.", points: ["CO is zero order (not in the rate equation)", "so CO is not involved in the rate-determining step; it reacts in a later fast step"], modelAnswer: "Carbon monoxide does not appear in the rate equation, so it is zero order: it takes no part in the slow step and must react in a fast step after it." }),
        P.manual({ label: "(b)", marks: 2, stem: "Suggest a two-step mechanism for the reaction.", points: ["Slow: NO₂ + NO₂ → NO₃ + NO", "Fast: NO₃ + CO → NO₂ + CO₂ (steps add to the overall equation)"], modelAnswer: "Step 1 (slow): 2NO₂ → NO₃ + NO. Step 2 (fast): NO₃ + CO → NO₂ + CO₂. Adding gives NO₂ + CO → NO + CO₂." }),
        P.short({ label: "(c)", marks: 1, stem: "Give the formula of the intermediate in your mechanism.", accepted: ["NO3", "NO₃"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["NO"], explanation: "NO₃ is formed in step 1 and used in step 2." }),
        P.num({ label: "(d)", marks: 1, stem: "By what factor does the rate increase if [NO₂] is tripled?", value: 9, wrong: [3], explanation: "3² = 9." }),
        P.num({ label: "(e)", marks: 2, stem: "When [NO₂] = 0.030 mol dm⁻³ the rate is 1.8 × 10⁻⁶ mol dm⁻³ s⁻¹. Calculate k, in dm³ mol⁻¹ s⁻¹.", value: k, sf: 2, unit: "dm³/mol/s", wrong: [1.8e-6 / 0.03], explanation: `k = 1.8 × 10⁻⁶ ÷ 0.030² = ${sciStr(k, 2)} dm³ mol⁻¹ s⁻¹.` }),
      ],
      hints: ["Which reactant is missing from the rate equation?"],
      explanation: `CO reacts after the slow step 2NO₂ → NO₃ + NO; NO₃ is the intermediate; k = ${sciStr(k, 2)} dm³ mol⁻¹ s⁻¹.`,
    });
  }
  b.card("DEFINITION", "Rate-determining step", "The slowest step in a mechanism; it controls the overall rate.");
  b.card("DEFINITION", "Intermediate", "A species formed in one step and used up in a later step; it is not in the overall equation.");
  b.card("CONCEPT", "Catalyst in a mechanism", "Used in an early step and regenerated later; may appear in the rate equation.");
  b.card("CONCEPT", "Rate equation from a mechanism", "Include the species in the slow step (and in fast steps before it); species reacting afterwards are zero order.");
  b.card("CONCEPT", "Testing a suggested mechanism", "Steps must add to the overall equation, and the slow step must match the rate equation.");
  b.card("FACT", "SN1 and SN2 rate equations", "Primary RX + OH⁻ (SN2): rate = k[RX][OH⁻]. Tertiary RX (SN1): rate = k[RX].");
  b.card("FACT", "Iodination of propanone", "Rate = k[CH₃COCH₃][H⁺]; zero order in I₂ (iodine reacts after the slow step); H⁺ is a catalyst.");
  b.card("FACT", "NO₂ + CO mechanism", "rate = k[NO₂]²: slow 2NO₂ → NO₃ + NO; fast NO₃ + CO → NO₂ + CO₂.");
  b.card("FACT", "2NO₂ + F₂ → 2NO₂F", "rate = k[NO₂][F₂]: slow NO₂ + F₂ → NO₂F + F; fast NO₂ + F → NO₂F.");
});
