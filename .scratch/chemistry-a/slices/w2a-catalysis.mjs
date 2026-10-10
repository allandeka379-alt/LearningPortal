// W2a: achem.kinetics.catalysis (both boards; ZIMSEC Form 6, Cambridge A Level only; MnO2/H2O2 practical is a ZIMSEC suggested experiment)
import { concept, P, t, ce, ecell, molesFromSolution, VM_RTP, round, sfStr, dpStr, sciStr } from "../lib.mjs";

concept("achem.kinetics.catalysis", { file: "kinetics/catalysis", keyPrefix: "kinetics.catalysis" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a heterogeneous catalyst?",
    options: [
      ["a catalyst in a different phase from the reactants", "Correct: for example solid iron with gaseous nitrogen and hydrogen."],
      ["a catalyst in the same phase as the reactants", "That is a homogeneous catalyst."],
      ["a catalyst made of a mixture of several different transition metals", "The term refers to phase, not composition."],
      ["a catalyst that is used up during the reaction", "No catalyst is used up overall."],
    ],
    answer: "A",
    explanation: "Heterogeneous: different phase, reaction at the surface.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an example of homogeneous catalysis?",
    options: [
      [t`$\ce{Fe^2+(aq)}$ in the reaction between $\ce{S2O8^2-(aq)}$ and $\ce{I-(aq)}$`, "Correct: catalyst and reactants are all in aqueous solution."],
      ["iron in the Haber process for making ammonia from nitrogen and hydrogen", "Solid iron with gases: heterogeneous."],
      ["platinum in a catalytic converter removing CO and NO from exhaust gases", "Solid metal with exhaust gases: heterogeneous."],
      [t`manganese(IV) oxide with $\ce{H2O2(aq)}$`, "A solid catalyst in a solution: heterogeneous."],
    ],
    answer: "A",
    explanation: "Homogeneous means the same phase; Fe²⁺(aq) with aqueous ions is the only one here.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In heterogeneous catalysis, what is the final stage, which frees the active sites for further reaction?",
    options: [
      ["desorption of the products from the surface", "Correct: products leave the surface."],
      ["adsorption of the reactants onto the surface", "Adsorption is the first stage."],
      ["weakening of bonds in the adsorbed reactants", "This happens before reaction, not at the end."],
      ["absorption of the products into the catalyst", "Products leave the surface; they are not absorbed into the solid."],
    ],
    answer: "A",
    explanation: "Adsorption → bond weakening → reaction → desorption.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In a catalytic converter, carbon monoxide reacts with nitrogen monoxide. What are the products?",
    options: [
      ["carbon dioxide and nitrogen", "Correct: 2CO + 2NO → 2CO₂ + N₂."],
      ["carbon dioxide and nitrogen dioxide", "NO is reduced to N₂, not oxidised to NO₂."],
      ["carbon and nitrogen dioxide", "CO is oxidised to CO₂, not reduced to carbon."],
      ["carbon dioxide and ammonia", "No hydrogen source is involved in this reaction."],
    ],
    answer: "A",
    explanation: "CO is oxidised and NO reduced on the Pt/Pd/Rh surface: 2CO + 2NO → 2CO₂ + N₂.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: t`Why is the uncatalysed reaction $\ce{S2O8^2-(aq) + 2I-(aq) -> 2SO4^2-(aq) + I2(aq)}$ slow?`,
    options: [
      ["Both reactants are negative ions, so they repel each other and the activation energy is high.", "Correct: repulsion makes effective collisions rare."],
      ["The reaction is not feasible under standard conditions, because its E⦵cell is negative.", "E⦵cell = 2.01 − 0.54 = +1.47 V: it is feasible, just slow."],
      ["Iodine molecules formed in the reaction block the surface of the reaction vessel.", "There is no surface process in this homogeneous reaction."],
      ["Sulfate ions produced in the reaction catalyse the reverse reaction instead.", "Catalysts speed up both directions; sulfate is simply a product."],
    ],
    answer: "A",
    hints: ["Look at the charges of the reacting ions."],
    explanation: "Two anions must collide; repulsion raises Ea. Fe²⁺ provides steps between oppositely charged ions.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about catalyst poisoning are correct?\n\n1. Lead compounds poison the catalyst in catalytic converters.\n2. A poison is strongly adsorbed onto active sites, blocking them.\n3. Poisoning increases the activation energy of the uncatalysed reaction.",
    options: [
      ["1 and 2 only", "Correct: poisons block active sites; the uncatalysed pathway is unaffected."],
      ["1, 2 and 3", "Statement 3 is false: the uncatalysed reaction's Ea is unchanged; the catalysed route is lost."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is true."],
      ["1 only", "Statement 2 is also true: it is how poisoning works."],
    ],
    answer: "A",
    hints: ["Does a poison change the uncatalysed reaction?"],
    explanation: "Poisons such as lead (converters) or sulfur compounds (Haber iron) adsorb strongly and block active sites.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about the catalysis of the oxidation of sulfur dioxide in the atmosphere by nitrogen dioxide are correct?\n\n1. NO₂ reacts with SO₂ to form SO₃ and NO.\n2. NO is oxidised back to NO₂ by oxygen.\n3. NO₂ is a heterogeneous catalyst in this reaction.",
    options: [
      ["1 and 2 only", "Correct: NO₂ is a homogeneous (gas-phase) catalyst, used and regenerated."],
      ["1, 2 and 3", "Statement 3 is false: all species are gases, so the catalysis is homogeneous."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is true."],
      ["1 only", "Statement 2 is also true: it regenerates the catalyst."],
    ],
    answer: "A",
    hints: ["What phase are all the species in?"],
    explanation: "SO₂ + NO₂ → SO₃ + NO; NO + ½O₂ → NO₂. Same phase: homogeneous.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Data: E⦵ / V: S₂O₈²⁻/SO₄²⁻ +2.01; Cr³⁺/Cr²⁺ −0.41; I₂/I⁻ +0.54. Could Cr³⁺/Cr²⁺ ions catalyse the reaction between peroxodisulfate and iodide ions?",
    options: [
      ["No: Cr³⁺ cannot oxidise I⁻, because E⦵cell for that step is −0.95 V.", "Correct: the Cr couple's potential is not between the two reacting couples."],
      ["Yes: both steps have positive E⦵cell values.", "The step Cr³⁺ + I⁻ has E⦵cell = −0.41 − 0.54 = −0.95 V, which is negative."],
      ["No: Cr²⁺ cannot reduce S₂O₈²⁻, because E⦵cell for that step is negative.", "That step has E⦵cell = 2.01 − (−0.41) = +2.42 V, which is feasible."],
      ["Yes: any transition-metal ion catalyses this reaction.", "The catalyst's E⦵ must lie between the two reacting couples."],
    ],
    answer: "A",
    hints: ["Check both steps: catalyst reduced form + S₂O₈²⁻, and catalyst oxidised form + I⁻."],
    explanation: "Step 1 (Cr²⁺ + S₂O₈²⁻) is feasible, but step 2 (Cr³⁺ + I⁻) has E⦵cell = −0.95 V, so the catalyst cannot be regenerated.",
  });
  {
    const e1 = ecell(2.01, 1.82), e2 = ecell(1.82, 0.54);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Data: E⦵ / V: S₂O₈²⁻/SO₄²⁻ +2.01; Co³⁺/Co²⁺ +1.82; I₂/I⁻ +0.54. Calculate E⦵cell, in V, for the step in which Co³⁺ ions oxidise iodide ions.",
      value: e2, dp: 2, unit: "V",
      wrong: [dpStr(e1, 2), dpStr(-e2, 2)],
      hints: ["E⦵cell = E⦵(couple being reduced) − E⦵(couple being oxidised)."],
      explanation: `Co³⁺ is reduced and I⁻ oxidised: E⦵cell = 1.82 − 0.54 = +${dpStr(e2, 2)} V. The other step (S₂O₈²⁻ oxidising Co²⁺) has E⦵cell = +${dpStr(e1, 2)} V, so on E⦵ grounds alone Co²⁺/Co³⁺ could catalyse the reaction.`,
    });
  }
  {
    const e = ecell(2.01, 0.54);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: "Data: E⦵ / V: S₂O₈²⁻/SO₄²⁻ +2.01; I₂/I⁻ +0.54. Calculate E⦵cell, in V, for the uncatalysed reaction S₂O₈²⁻ + 2I⁻ → 2SO₄²⁻ + I₂.",
      value: e, dp: 2, unit: "V",
      wrong: [dpStr(-e, 2), dpStr(2.01 + 0.54, 2)],
      explanation: `E⦵cell = 2.01 − 0.54 = +${dpStr(e, 2)} V: the reaction is feasible, but it is slow because the two anions repel.`,
    });
  }
  {
    const n = molesFromSolution(40, 0.25);
    const v = (n / 2) * VM_RTP * 1000;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`40.0 cm³ of 0.250 mol dm⁻³ hydrogen peroxide is decomposed completely using manganese(IV) oxide: $\ce{2H2O2(aq) -> 2H2O(l) + O2(g)}$. Calculate the volume of oxygen, in cm³ at room conditions. (molar gas volume 24.0 dm³ mol⁻¹)`,
      value: v, sf: 3, unit: "cm³",
      wrong: [v * 2],
      hints: ["2 mol H₂O₂ gives 1 mol O₂."],
      explanation: `1. n(H₂O₂) = 0.0400 × 0.250 = ${sciStr(n, 3)} mol.\n2. n(O₂) = ${sciStr(n, 3)} ÷ 2 = ${sciStr(n / 2, 3)} mol.\n3. V = ${sciStr(n / 2, 3)} × 24 000 = ${sfStr(v, 3)} cm³. Ignoring the 2 : 1 ratio gives ${sfStr(v * 2, 3)} cm³.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Either Fe²⁺ or Fe³⁺ ions can be added to catalyse the reaction between peroxodisulfate and iodide ions.",
    answer: true,
    explanation: "True. Fe²⁺ reacts first with S₂O₈²⁻; Fe³⁺ reacts first with I⁻. Either way the other form is produced and the cycle continues.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In heterogeneous catalysis, the best catalysts adsorb the products as strongly as possible.",
    answer: false,
    explanation: "False. Products must desorb to free the active sites; adsorption must be strong enough to weaken bonds but weak enough to release products.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each stage of heterogeneous catalysis by iron in the Haber process with what happens.",
    pairs: [
      ["adsorption", "N₂ and H₂ form weak bonds with iron atoms at active sites"],
      ["bond weakening", "the N≡N triple bond is weakened"],
      ["reaction", "N and H atoms combine on the surface to form NH₃"],
      ["desorption", "NH₃ leaves the surface, freeing the sites"],
    ],
    hints: ["The stages happen in this order."],
    explanation: "Adsorption, bond weakening, reaction on the surface, desorption.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences about catalytic converters.",
    template: "A catalytic converter contains platinum, palladium and {{blank:a}} on a ceramic honeycomb. It converts carbon monoxide to carbon dioxide and nitrogen monoxide to {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["rhodium"], choices: ["rhodium", "iron", "vanadium", "nickel"] },
      { id: "b", accepted: ["nitrogen"], choices: ["nitrogen", "nitrogen dioxide", "ammonia"] },
    ],
    explanation: "Pt, Pd and Rh; 2CO + 2NO → 2CO₂ + N₂.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the catalyst used in the laboratory to decompose hydrogen peroxide rapidly into water and oxygen.",
    accepted: ["manganese(IV) oxide", "manganese dioxide", "MnO2", "manganese(iv) oxide", "manganese 4 oxide", "MnO₂"],
    wrong: ["iron"],
    explanation: "Manganese(IV) oxide, MnO₂ (a black powder).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the mode of action of a heterogeneous catalyst, using iron in the Haber process as the example.",
    points: ["Nitrogen and hydrogen molecules are adsorbed onto the iron surface (active sites), forming weak bonds", "Bonds in the adsorbed molecules (especially N≡N) are weakened, lowering the activation energy", "The adsorbed species react on the surface to form ammonia", "Ammonia desorbs, leaving the active sites free for more reactants"],
    modelAnswer: "N₂ and H₂ molecules are adsorbed at active sites on the iron surface, forming weak bonds with iron atoms. This weakens the bonds within the molecules, particularly the strong N≡N bond, and holds the species close together, so the activation energy is lower. The adsorbed atoms combine on the surface to form ammonia, which then desorbs, freeing the active sites for more nitrogen and hydrogen.",
    hints: ["Four stages."],
    explanation: "Adsorption, bond weakening, reaction, desorption.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain, with equations, how Fe²⁺ ions catalyse the reaction between peroxodisulfate ions and iodide ions.",
    points: ["Uncatalysed: S₂O₈²⁻ and I⁻ are both negative, so they repel and Ea is high", "Step 1: S₂O₈²⁻ + 2Fe²⁺ → 2SO₄²⁻ + 2Fe³⁺", "Step 2: 2Fe³⁺ + 2I⁻ → 2Fe²⁺ + I₂ (Fe²⁺ regenerated)", "Each step involves oppositely charged ions, so each has a lower activation energy"],
    modelAnswer: "Without a catalyst two negative ions must collide, and their repulsion makes the activation energy high. Fe²⁺ ions are first oxidised by peroxodisulfate: S₂O₈²⁻ + 2Fe²⁺ → 2SO₄²⁻ + 2Fe³⁺. The Fe³⁺ ions then oxidise iodide: 2Fe³⁺ + 2I⁻ → 2Fe²⁺ + I₂, regenerating Fe²⁺. Each step involves ions of opposite charge, which attract, so both steps have lower activation energies than the uncatalysed reaction.",
    hints: ["Charges of the ions, then two equations."],
    explanation: "A homogeneous catalyst used and regenerated.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Outline how enzymes act as biological catalysts.",
    points: ["Enzymes are proteins with an active site of a specific shape", "The substrate binds to the active site, which lowers the activation energy of its reaction (specific to that substrate)", "They work best at an optimum temperature and pH; high temperature or extreme pH denatures them (changes the shape of the active site)"],
    modelAnswer: "Enzymes are protein molecules. Each has an active site whose shape fits one particular substrate; binding there provides a pathway of lower activation energy. Enzymes work best at an optimum temperature and pH, and are denatured, losing the shape of the active site, at high temperature or extreme pH.",
    explanation: "Outline only: proteins, active site, specificity, conditions.",
  });
  // Structured: MnO2 and H2O2 experiment
  {
    const n = molesFromSolution(50, 0.3);
    const Vmax = (n / 2) * VM_RTP * 1000;
    const ts = [0, 10, 20, 30, 40, 60, 90, 120];
    const vs = ts.map((x) => round(Vmax * (1 - Math.exp(-0.035 * x)), 0));
    const tangent = 63 / 10;
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `Thandeka added 0.50 g of manganese(IV) oxide powder to 50.0 cm³ of 0.300 mol dm⁻³ hydrogen peroxide and collected the oxygen in a gas syringe.

| Time / s | ${ts.join(" | ")} |
|---|---|---|---|---|---|---|---|---|
| Volume of O₂ / cm³ | ${vs.join(" | ")} |`,
      parts: [
        P.manual({ label: "(a)", marks: 1, stem: "Write the equation for the decomposition of hydrogen peroxide.", points: ["2H₂O₂ → 2H₂O + O₂"], modelAnswer: "2H₂O₂(aq) → 2H₂O(l) + O₂(g)" }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the final volume of oxygen expected, in cm³ at room conditions. (molar gas volume 24.0 dm³ mol⁻¹)", value: Vmax, sf: 3, unit: "cm³", wrong: [Vmax * 2], explanation: `n(H₂O₂) = ${sciStr(n, 3)} mol; n(O₂) = ${sciStr(n / 2, 3)} mol; V = ${sfStr(Vmax, 3)} cm³, matching the final reading.` }),
        P.num({ label: "(c)", marks: 2, stem: "A tangent drawn to the curve at t = 0 passes through (0 s, 0 cm³) and (10 s, 63 cm³). Calculate the initial rate of oxygen production, in cm³ s⁻¹.", value: tangent, sf: 3, unit: "cm³/s", explanation: `63 ÷ 10 = ${sfStr(tangent, 3)} cm³ s⁻¹.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Describe how Thandeka could show that manganese(IV) oxide acted as a catalyst and was not used up.", points: ["Filter off the MnO₂ after the reaction, wash and dry it", "and weigh it: the mass is still 0.50 g (it can also be reused to decompose fresh H₂O₂ just as fast)"], modelAnswer: "After the reaction she should filter off the solid, wash it with water, dry it and weigh it: it should still have a mass of 0.50 g. Adding it to fresh hydrogen peroxide would again give rapid fizzing." }),
        P.mcq({ label: "(e)", marks: 1, stem: "The experiment is repeated with 1.00 g of the same MnO₂ powder. What happens?", options: [
          ["The initial rate increases; the final volume is unchanged.", "Correct: more catalyst surface, same amount of H₂O₂."],
          ["The initial rate and the final volume both increase.", "The final volume depends only on the amount of H₂O₂."],
          ["The initial rate is unchanged; the final volume doubles.", "More catalyst gives a larger surface area and faster rate, not more product."],
          ["Neither the rate nor the final volume changes.", "More solid catalyst means more active sites."],
        ], answer: "A", explanation: "Catalysts change the rate, not the yield." }),
        P.manual({ label: "(f)", marks: 3, stem: "Explain how the solid manganese(IV) oxide increases the rate of the reaction.", points: ["It is a heterogeneous catalyst: H₂O₂ molecules are adsorbed onto active sites on its surface", "Bonds (O–O) in the adsorbed molecules are weakened, giving a pathway with a lower activation energy", "Products (O₂, H₂O) desorb, freeing the sites; a greater proportion of collisions are effective"], modelAnswer: "Manganese(IV) oxide is a heterogeneous catalyst. Hydrogen peroxide molecules are adsorbed onto active sites on the solid surface, which weakens the O–O bond and provides an alternative pathway with a lower activation energy. Water and oxygen desorb, freeing the sites. With a lower Ea a larger proportion of collisions are effective, so the rate increases." }),
        P.tf({ label: "(g)", marks: 1, stem: "The catalyst changes the enthalpy change of the reaction.", answer: false, explanation: "False: ΔH is unchanged; only Ea is lowered." }),
      ],
      hints: ["2H₂O₂ → 2H₂O + O₂.", "Rate = gradient of the volume–time graph."],
      explanation: `Final volume ${sfStr(Vmax, 3)} cm³; initial rate ${sfStr(tangent, 3)} cm³ s⁻¹; MnO₂ is recovered unchanged; it acts by adsorption with lower Ea.`,
    });
  }
  // Structured: oxides of nitrogen, acid rain and converters
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    stem: "Sulfur dioxide from burning coal and oxides of nitrogen from vehicle engines both contribute to acid rain. In the atmosphere, nitrogen dioxide catalyses the oxidation of sulfur dioxide to sulfur trioxide.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Write two equations to show how nitrogen dioxide acts as a catalyst in this oxidation.", points: ["SO₂ + NO₂ → SO₃ + NO", "NO + ½O₂ → NO₂ (or 2NO + O₂ → 2NO₂)"], modelAnswer: "SO₂(g) + NO₂(g) → SO₃(g) + NO(g); NO(g) + ½O₂(g) → NO₂(g)." }),
      P.short({ label: "(b)", marks: 1, stem: "Give the formula of the intermediate in this catalytic cycle.", accepted: ["NO", "nitrogen monoxide", "nitric oxide", "nitrogen(II) oxide"], wrong: ["NO2"], explanation: "NO is formed in step 1 and used in step 2." }),
      P.mcq({ label: "(c)", marks: 1, stem: "What type of catalysis is this?", options: [
        ["homogeneous, because the catalyst and reactants are all gases", "Correct: same phase."],
        ["heterogeneous, because the catalyst is a different substance", "Heterogeneous refers to a different phase, not a different substance."],
        ["heterogeneous, because the reaction happens in the air", "All species are in the gas phase: homogeneous."],
        ["autocatalysis, because a product catalyses the reaction", "Neither SO₃ nor any product catalyses this reaction."],
      ], answer: "A", explanation: "Catalyst and reactants are in the same (gas) phase." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why the catalysed route is faster than the direct reaction of sulfur dioxide with oxygen.", points: ["The catalysed route consists of steps that each have a lower activation energy than the direct reaction", "so a greater proportion of collisions have energy ≥ Ea and the overall rate is greater"], modelAnswer: "Each step of the NO₂-catalysed route has a lower activation energy than the direct reaction between SO₂ and O₂, so a larger proportion of molecular collisions have enough energy to react and the oxidation is faster." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain how a catalytic converter reduces the emission of nitrogen monoxide from a car, giving an equation.", points: ["2CO + 2NO → 2CO₂ + N₂", "on a Pt/Pd/Rh surface: NO and CO are adsorbed, react and the harmless products desorb"], modelAnswer: "In the converter, NO and CO are adsorbed onto the platinum, palladium and rhodium surface, where they react: 2CO + 2NO → 2CO₂ + N₂. The nitrogen and carbon dioxide desorb, so NO is removed before the exhaust leaves the car." }),
    ],
    hints: ["The catalyst must be used up in one step and regenerated in the other."],
    explanation: "SO₂ + NO₂ → SO₃ + NO; NO + ½O₂ → NO₂ (homogeneous, NO intermediate); converters remove NO by 2CO + 2NO → 2CO₂ + N₂.",
  });
  b.card("DEFINITION", "Heterogeneous catalyst", "A catalyst in a different phase from the reactants (e.g. solid Fe with gaseous N₂ and H₂).");
  b.card("DEFINITION", "Homogeneous catalyst", "A catalyst in the same phase as the reactants; used in one step, regenerated in a later one.");
  b.card("CONCEPT", "Stages of heterogeneous catalysis", "Adsorption → weakening of bonds → reaction on the surface → desorption of products.");
  b.card("FACT", "Catalytic converter reactions", "Pt/Pd/Rh: 2CO + 2NO → 2CO₂ + N₂; CO → CO₂; hydrocarbons → CO₂ + H₂O.");
  b.card("FACT", "Catalyst poisoning", "Strongly adsorbed impurities block active sites: lead in converters, sulfur compounds on Haber iron.");
  b.card("FACT", "NO₂ and SO₂ in the atmosphere", "SO₂ + NO₂ → SO₃ + NO; NO + ½O₂ → NO₂ (homogeneous catalysis).");
  b.card("FACT", "Fe²⁺ in S₂O₈²⁻/I⁻ reaction", "S₂O₈²⁻ + 2Fe²⁺ → 2SO₄²⁻ + 2Fe³⁺; 2Fe³⁺ + 2I⁻ → 2Fe²⁺ + I₂.");
  b.card("CONCEPT", "Redox catalyst requirement", "The catalyst's E⦵ must lie between those of the two reacting couples so both steps are feasible.");
  b.card("FACT", "MnO₂ and hydrogen peroxide", "MnO₂ catalyses 2H₂O₂ → 2H₂O + O₂; recovered unchanged in mass.");
});
