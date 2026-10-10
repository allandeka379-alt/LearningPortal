// W2a: achem.kinetics.rate-equations (both boards; ZIMSEC Form 5, Cambridge A Level only)
import { concept, P, t, ce, orderFrom, rateConstant, rateFrom, kFromHalfLife, halfLifeFromK, firstOrderRemaining, sfStr, dpStr, sciStr, chk } from "../lib.mjs";

concept("achem.kinetics.rate-equations", { file: "kinetics/rate-equations", keyPrefix: "kinetics.rate-equations" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What are the units of the rate constant for a first-order reaction (time in seconds)?",
    options: [
      ["s⁻¹", "Correct: k = rate/[A] = (mol dm⁻³ s⁻¹)/(mol dm⁻³) = s⁻¹."],
      ["mol dm⁻³ s⁻¹", "These are the units of rate, and of k for a zero-order reaction."],
      ["dm³ mol⁻¹ s⁻¹", "These are the units for a second-order reaction."],
      ["mol dm⁻³", "These are concentration units; k must include time."],
    ],
    answer: "A",
    explanation: "Rate = k[A] for first order, so k has units s⁻¹.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A reaction is zero order with respect to reactant X. What happens to the rate when the concentration of X is doubled?",
    options: [
      ["It stays the same.", "Correct: [X]⁰ = 1, so [X] does not affect the rate."],
      ["It doubles.", "That is first order."],
      ["It quadruples.", "That is second order."],
      ["It halves.", "Increasing a reactant concentration never slows a reaction with a positive or zero order."],
    ],
    answer: "A",
    explanation: "Zero order: rate independent of [X]; X does not appear in the rate equation.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A graph of initial rate (y-axis) against [Y] (x-axis) is a straight line through the origin. What is the order with respect to Y?",
    options: [
      ["first order", "Correct: rate ∝ [Y]¹."],
      ["zero order", "Zero order gives a horizontal line."],
      ["second order", "Second order gives an upward curve through the origin."],
      ["it cannot be found from this graph", "A rate–concentration graph shows the order directly."],
    ],
    answer: "A",
    explanation: "Straight line through the origin: rate = k[Y]; the gradient is k.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A concentration–time graph for a reactant shows it falling from 0.80 to 0.40 mol dm⁻³ in 50 s, from 0.40 to 0.20 mol dm⁻³ in the next 50 s, and from 0.20 to 0.10 mol dm⁻³ in the next 50 s. What is the order with respect to this reactant?",
    options: [
      ["first order", "Correct: the half-life is constant (50 s)."],
      ["zero order", "Zero order gives equal falls in concentration in equal times (a straight line)."],
      ["second order", "Second-order half-lives double each time."],
      ["third order", "Orders above 2 are not tested; constant half-life means first order."],
    ],
    answer: "A",
    hints: ["Compare successive half-lives."],
    explanation: "Successive half-lives of 50 s each: constant half-life is the signature of a first-order reaction.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "For rate = k[P]²[Q], which statements are correct?\n\n1. The overall order is 3.\n2. Doubling [P] alone multiplies the rate by 4.\n3. The orders can be found from the coefficients in the balanced equation.",
    options: [
      ["1 and 2 only", "Correct: orders are experimental and need not match the coefficients."],
      ["1, 2 and 3", "Statement 3 is false: orders come only from experiments."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is true (2 + 1 = 3)."],
      ["1 only", "Statement 2 is also true: 2² = 4."],
    ],
    answer: "A",
    hints: ["Where do orders come from?"],
    explanation: "Overall order 2 + 1 = 3; doubling [P] gives 2² = 4 times the rate; orders are not read from the equation.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about the rate constant k are correct?\n\n1. k increases when the temperature is raised.\n2. k changes when the concentration of a reactant is changed at constant temperature.\n3. For a first-order reaction k = 0.693/t½.",
    options: [
      ["1 and 3 only", "Correct: k depends on temperature (and catalyst), not on concentration."],
      ["1, 2 and 3", "Statement 2 is false: changing concentration changes the rate, not k."],
      ["2 and 3 only", "Statement 2 is false; statement 1 is true."],
      ["1 only", "Statement 3 is also true: the half-life relation for first order."],
    ],
    answer: "A",
    hints: ["Which quantity in rate = k[A] changes when [A] changes?"],
    explanation: "Higher temperature gives a larger fraction of collisions with E ≥ Ea, so k rises; k is independent of concentration.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "For a reaction with rate = k[A][B]², [A] is tripled and [B] is halved at the same temperature. By what factor does the rate change?",
    options: [
      ["0.75", "Correct: 3 × (½)² = 3 × ¼ = 0.75."],
      ["1.5", "This forgets to square the change in [B]: 3 × ½."],
      ["2.25", "This squares the change in [A] instead of [B]: 3² × ¼."],
      ["0.375", "This cubes the halving: 3 × (½)³."],
    ],
    answer: "A",
    hints: ["Multiply the factor for each reactant raised to its order."],
    explanation: "Rate factor = 3¹ × (0.5)² = 0.75: the rate falls to three-quarters.",
  });
  {
    const k = rateConstant(7.0e-6, [[0.01, 2], [0.01, 1]]);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`For $\ce{2NO(g) + O2(g) -> 2NO2(g)}$ the rate equation is rate = k[NO]²[O₂]. When [NO] = [O₂] = 0.0100 mol dm⁻³ the initial rate is 7.00 × 10⁻⁶ mol dm⁻³ s⁻¹. Calculate k, in dm⁶ mol⁻² s⁻¹.`,
      value: k, sf: 3, unit: "dm⁶/mol²/s",
      wrong: [rateConstant(7.0e-6, [[0.01, 1], [0.01, 1]])],
      hints: ["k = rate ÷ ([NO]² × [O₂])."],
      explanation: `1. k = 7.00 × 10⁻⁶ ÷ (0.0100² × 0.0100) = 7.00 × 10⁻⁶ ÷ 1.00 × 10⁻⁶ = ${sfStr(k, 3)} dm⁶ mol⁻² s⁻¹.\n2. Units: (mol dm⁻³ s⁻¹)/(mol dm⁻³)³ = dm⁶ mol⁻² s⁻¹.\n3. Forgetting to square [NO] gives ${sfStr(rateConstant(7.0e-6, [[0.01, 1], [0.01, 1]]), 3)}.`,
    });
  }
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: "A first-order reaction has a half-life of 125 s. Calculate the rate constant, in s⁻¹, using k = 0.693/t½.",
    value: kFromHalfLife(125), sf: 3, unit: "s⁻¹",
    wrong: [125 / 0.693],
    explanation: `k = 0.693 ÷ 125 = ${sciStr(kFromHalfLife(125), 3)} s⁻¹.`,
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "A first-order reaction has k = 3.50 × 10⁻⁴ s⁻¹. Calculate its half-life, in s, to three significant figures.",
    value: halfLifeFromK(3.5e-4), sf: 3, unit: "s",
    wrong: [3.5e-4 * 0.693],
    explanation: `t½ = 0.693 ÷ (3.50 × 10⁻⁴) = ${sfStr(halfLifeFromK(3.5e-4), 3)} s.`,
  });
  {
    const c = firstOrderRemaining(0.16, 240, 60);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "A reactant decomposes in a first-order reaction with a half-life of 60 s. Its initial concentration is 0.160 mol dm⁻³. Calculate its concentration after 240 s, in mol dm⁻³.",
      value: c, sf: 3, unit: "mol/dm³",
      wrong: [0.16 / 4],
      hints: ["How many half-lives is 240 s?"],
      explanation: `240 s = 4 half-lives; 0.160 × (½)⁴ = ${sfStr(c, 3)} mol dm⁻³. Dividing by 4 instead of 2⁴ gives 0.0400.`,
    });
  }
  {
    const r = rateFrom(0.2, [[0.05, 2], [0.2, 1]]);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "For rate = k[A]²[B], k = 0.200 dm⁶ mol⁻² s⁻¹. Calculate the initial rate, in mol dm⁻³ s⁻¹, when [A] = 0.0500 mol dm⁻³ and [B] = 0.200 mol dm⁻³.",
      value: r, sf: 3, unit: "mol/dm³/s",
      wrong: [rateFrom(0.2, [[0.05, 1], [0.2, 1]])],
      hints: ["Square [A] before multiplying."],
      explanation: `Rate = 0.200 × 0.0500² × 0.200 = ${sciStr(r, 3)} mol dm⁻³ s⁻¹. Not squaring [A] gives ${sciStr(rateFrom(0.2, [[0.05, 1], [0.2, 1]]), 3)}.`,
    });
  }
  {
    const n = orderFrom(3.2e-5, 2.88e-4, 0.02, 0.06);
    b.num({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: "When [Z] is increased from 0.020 to 0.060 mol dm⁻³ (all other concentrations constant), the initial rate increases from 3.2 × 10⁻⁵ to 2.88 × 10⁻⁴ mol dm⁻³ s⁻¹. Deduce the order of reaction with respect to Z.",
      value: n,
      wrong: [3],
      hints: ["Concentration × 3; what power of 3 is the rate factor?"],
      explanation: "Concentration × 3, rate × 9 = 3², so the reaction is second order in Z.",
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The half-life of a first-order reaction is the same whatever the starting concentration.",
    answer: true,
    explanation: "True: t½ = 0.693/k, which does not contain any concentration.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "For 2A + B → C, the rate equation must be rate = k[A]²[B].",
    answer: false,
    explanation: "False. Orders are found by experiment and often differ from the coefficients in the equation.",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    stem: "Match each graph description with the order of reaction it shows (for the reactant plotted).",
    pairs: [
      ["concentration–time: straight line sloping down", "zero order"],
      ["concentration–time: curve with constant half-life", "first order"],
      ["rate–concentration: horizontal line", "zero order (rate independent of concentration)"],
      ["rate–concentration: curve rising ever more steeply through the origin", "second order"],
    ],
    hints: ["Which order gives a constant rate?"],
    explanation: "Zero order: constant rate (straight concentration–time line, flat rate–concentration line). First order: constant half-life. Second order: rate ∝ [X]².",
  });
  b.short({
    d: 2, skill: "APPLICATION",
    stem: "Give the units of k for a reaction that is second order overall (time in seconds).",
    accepted: ["dm3 mol-1 s-1", "dm³ mol⁻¹ s⁻¹", "dm^3 mol^-1 s^-1", "mol-1 dm3 s-1", "dm3/mol/s", "dm³/mol/s"],
    normalise: ["trim", "lowercase", "collapse_whitespace"],
    wrong: ["mol dm-3 s-1"],
    explanation: "k = rate/(conc)² = (mol dm⁻³ s⁻¹)/(mol² dm⁻⁶) = dm³ mol⁻¹ s⁻¹.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "Define the terms *order of reaction with respect to a reactant* and *half-life*.",
    points: ["Order: the power to which the concentration of that reactant is raised in the (experimentally determined) rate equation", "Half-life: the time taken for the concentration of a reactant to fall to half its initial value"],
    modelAnswer: "The order with respect to a reactant is the power to which its concentration is raised in the rate equation. The half-life is the time taken for the concentration of a reactant to fall to half of its original value.",
    explanation: "Two standard definitions.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how you would use a concentration–time graph to show that a reaction is first order with respect to a reactant, and how you would then find k.",
    points: ["Read off the time for the concentration to halve from one starting value (e.g. 0.080 → 0.040)", "Read off a second half-life from a different starting value (e.g. 0.040 → 0.020); if the half-lives are equal the reaction is first order", "k = 0.693 ÷ t½"],
    modelAnswer: "Measure the time for the concentration to fall from, say, 0.080 to 0.040 mol dm⁻³ and then from 0.040 to 0.020 mol dm⁻³. If these successive half-lives are the same, the reaction is first order. Then k = 0.693/t½.",
    hints: ["Constant half-life."],
    explanation: "Two half-lives from different starting points, then k = 0.693/t½.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why the rate constant of a reaction increases when the temperature is raised, although the orders stay the same.",
    points: ["At higher temperature a greater proportion of molecules have energy ≥ Ea (Boltzmann distribution)", "so effective collisions are more frequent at the same concentrations: the rate is larger, so k = rate/(concentration terms) is larger"],
    modelAnswer: "At a higher temperature the Boltzmann distribution shifts so that a greater proportion of collisions have at least the activation energy. At the same concentrations the rate is therefore larger, and since rate = k × (concentration terms), k must be larger; the dependence on concentration (the orders) is unchanged.",
    hints: ["Think about the Boltzmann distribution."],
    explanation: "Temperature changes k, not the orders.",
  });
  // Structured: initial rates for peroxodisulfate + iodide
  {
    const k = 0.012;
    const ex = [[0.02, 0.04], [0.04, 0.04], [0.02, 0.08], [0.03, 0.06]];
    const rates = ex.map(([s, i]) => rateFrom(k, [[s, 1], [i, 1]]));
    const m = orderFrom(rates[0], rates[1], ex[0][0], ex[1][0]);
    const n = orderFrom(rates[0], rates[2], ex[0][1], ex[2][1]);
    const kc = rateConstant(rates[0], [[ex[0][0], m], [ex[0][1], n]]);
    chk(kc, k, 1e-12, "k");
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: t`Peroxodisulfate ions oxidise iodide ions: $\ce{S2O8^2-(aq) + 2I-(aq) -> 2SO4^2-(aq) + I2(aq)}$. Initial rates were measured at 25 °C.

| Experiment | [S₂O₈²⁻] / mol dm⁻³ | [I⁻] / mol dm⁻³ | Initial rate / mol dm⁻³ s⁻¹ |
|---|---|---|---|
| 1 | 0.020 | 0.040 | ${sciStr(rates[0], 3)} |
| 2 | 0.040 | 0.040 | ${sciStr(rates[1], 3)} |
| 3 | 0.020 | 0.080 | ${sciStr(rates[2], 3)} |
| 4 | 0.030 | 0.060 | to be calculated |`,
      parts: [
        P.group({ label: "(a)", stem: "Deduce the order of reaction with respect to:", parts: [
          P.num({ label: "(i)", marks: 1, stem: "S₂O₈²⁻;", value: m, wrong: [2], explanation: "Experiments 1 and 2: [S₂O₈²⁻] × 2, rate × 2: first order." }),
          P.num({ label: "(ii)", marks: 1, stem: "I⁻.", value: n, wrong: [2], explanation: "Experiments 1 and 3: [I⁻] × 2, rate × 2: first order (not second order, despite the 2 in the equation)." }),
        ] }),
        P.manual({ label: "(b)", marks: 2, stem: "Explain how you deduced the order with respect to I⁻.", points: ["Compared experiments 1 and 3, in which [S₂O₈²⁻] is constant", "[I⁻] doubles and the rate doubles, so rate ∝ [I⁻]: first order"], modelAnswer: "In experiments 1 and 3 the concentration of peroxodisulfate is the same; [I⁻] doubles from 0.040 to 0.080 mol dm⁻³ and the rate also doubles, so the rate is proportional to [I⁻]: first order." }),
        P.mcq({ label: "(c)", marks: 1, stem: "Which is the rate equation for this reaction?", options: [
          ["rate = k[S₂O₈²⁻][I⁻]", "Correct: first order in each reactant."],
          ["rate = k[S₂O₈²⁻][I⁻]²", "The data show first order in I⁻, not second order."],
          ["rate = k[S₂O₈²⁻]²[I⁻]", "Doubling [S₂O₈²⁻] only doubles the rate, so it is first order."],
          ["rate = k[S₂O₈²⁻]", "The rate depends on [I⁻] too (experiments 1 and 3)."],
        ], answer: "A", explanation: "Rate = k[S₂O₈²⁻][I⁻], second order overall." }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the rate constant k using experiment 1.", value: kc, sf: 2, unit: "dm³/mol/s", wrong: [rateConstant(rates[0], [[ex[0][0], 1], [ex[0][1], 2]])], explanation: `k = ${sciStr(rates[0], 3)} ÷ (0.020 × 0.040) = ${sfStr(kc, 2)} dm³ mol⁻¹ s⁻¹.` }),
        P.short({ label: "(e)", marks: 1, stem: "Give the units of k.", accepted: ["dm3 mol-1 s-1", "dm³ mol⁻¹ s⁻¹", "dm^3 mol^-1 s^-1", "dm3/mol/s", "mol-1 dm3 s-1"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["s-1"], explanation: "Second order overall." }),
        P.num({ label: "(f)", marks: 2, stem: "Calculate the initial rate in experiment 4, in mol dm⁻³ s⁻¹.", value: rates[3], sf: 2, unit: "mol/dm³/s", wrong: [rateFrom(k, [[0.03, 1], [0.06, 2]])], explanation: `Rate = ${sfStr(kc, 2)} × 0.030 × 0.060 = ${sciStr(rates[3], 2)} mol dm⁻³ s⁻¹.` }),
        P.mcq({ label: "(g)", marks: 1, stem: "The experiments are repeated at 35 °C. Which statement is correct?", options: [
          ["k increases and the orders are unchanged.", "Correct: temperature changes k, not the rate equation."],
          ["k is unchanged and the orders increase.", "Orders do not change with temperature in this way."],
          ["k decreases because the reaction is exothermic.", "k increases with temperature for any reaction with Ea > 0."],
          ["k and the orders are both unchanged.", "k depends on temperature."],
        ], answer: "A", explanation: "Higher temperature, larger k." }),
        P.tf({ label: "(h)", marks: 1, stem: "The 2 in front of I⁻ in the equation shows that the reaction must be second order in I⁻.", answer: false, explanation: "False: the data show first order in I⁻; coefficients do not give orders." }),
      ],
      hints: ["Compare experiments where only one concentration changes.", "k = rate/([S₂O₈²⁻][I⁻])."],
      explanation: `Rate = k[S₂O₈²⁻][I⁻]; k = ${sfStr(kc, 2)} dm³ mol⁻¹ s⁻¹; experiment 4 rate = ${sciStr(rates[3], 2)} mol dm⁻³ s⁻¹.`,
    });
  }
  // Structured: half-life from concentration–time data
  {
    const th = 40;
    const ts = [0, 20, 40, 60, 80, 120, 160];
    const cs = ts.map((x) => firstOrderRemaining(0.2, x, th));
    const k = kFromHalfLife(th);
    const c200 = firstOrderRemaining(0.2, 200, th);
    b.struct({
      d: 3, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `The concentration of a reactant R was measured during its decomposition at constant temperature.

| Time / s | ${ts.join(" | ")} |
|---|---|---|---|---|---|---|---|
| [R] / mol dm⁻³ | ${cs.map((c) => sfStr(c, 3)).join(" | ")} |`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "State the half-life of the reaction, in s.", value: th, unit: "s", explanation: "[R] falls from 0.200 to 0.100 mol dm⁻³ in 40 s." }),
        P.manual({ label: "(b)", marks: 2, stem: "Use the data to show that the reaction is first order with respect to R.", points: ["0.200 → 0.100 mol dm⁻³ takes 40 s; 0.100 → 0.0500 mol dm⁻³ takes another 40 s (and 0.0500 → 0.0250 another 40 s)", "Successive half-lives are constant, so the reaction is first order"], modelAnswer: "The concentration halves from 0.200 to 0.100 mol dm⁻³ in 40 s, from 0.100 to 0.0500 mol dm⁻³ in the next 40 s and from 0.0500 to 0.0250 mol dm⁻³ in the next 40 s. A constant half-life shows first order." }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the rate constant k, in s⁻¹, to three significant figures.", value: k, sf: 3, unit: "s⁻¹", wrong: [th / 0.693], explanation: `k = 0.693 ÷ 40 = ${sciStr(k, 3)} s⁻¹.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate [R] after 200 s, in mol dm⁻³, to three significant figures.", value: c200, sf: 3, unit: "mol/dm³", wrong: [0.2 / 5], explanation: `200 s = 5 half-lives: 0.200 × (½)⁵ = ${sciStr(c200, 3)} mol dm⁻³.` }),
        P.short({ label: "(e)", marks: 1, stem: "Give the units of k for this reaction.", accepted: ["s-1", "s⁻¹", "s^-1", "per second", "/s"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["mol dm-3 s-1"], explanation: "First order: s⁻¹." }),
      ],
      hints: ["Read how long the concentration takes to halve, more than once."],
      explanation: `t½ = 40 s (constant), so first order; k = ${sciStr(k, 3)} s⁻¹; [R] after 200 s = ${sciStr(c200, 3)} mol dm⁻³.`,
    });
  }
  b.card("FORMULA", "Rate equation", "rate = k[A]^m[B]^n; m and n (0, 1 or 2) found by experiment; overall order = m + n.");
  b.card("CONCEPT", "Doubling a concentration", "Order 0: rate unchanged; order 1: rate ×2; order 2: rate ×4.");
  b.card("FACT", "Units of k", "Order 0: mol dm⁻³ s⁻¹; 1: s⁻¹; 2: dm³ mol⁻¹ s⁻¹; 3: dm⁶ mol⁻² s⁻¹.");
  b.card("FORMULA", "First-order half-life", "k = 0.693/t½; t½ is independent of concentration.");
  b.card("CONCEPT", "Concentration–time graphs", "Zero order: straight line. First order: constant half-life. Second order: half-lives double.");
  b.card("CONCEPT", "Rate–concentration graphs", "Zero order: horizontal. First order: straight line through origin. Second order: upward curve.");
  b.card("CONCEPT", "Initial-rates method", "Change one concentration at a time; compare the rate factor with the concentration factor.");
  b.card("FACT", "Effect of temperature on k", "k increases with temperature (more collisions with E ≥ Ea); orders are unchanged.");
  b.card("DEFINITION", "Half-life", "Time for the concentration of a reactant to fall to half its initial value.");
});
