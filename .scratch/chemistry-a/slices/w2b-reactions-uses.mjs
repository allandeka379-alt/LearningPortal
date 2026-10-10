// W2b: achem.group2.reactions-uses (both boards; ZIMSEC Form 5, Cambridge AS Level). Uses of compounds: ZIMSEC detail.
import { concept, P, t, chk, Mr, AR, VM_RTP, pHStrongBase, sfStr, dpStr, ZIM } from "../lib.mjs";

concept("achem.group2.reactions-uses", { file: "group2/reactions-uses", keyPrefix: "group2.reactions-uses" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What are the products when calcium reacts with cold water?",
    options: [
      ["calcium hydroxide and hydrogen", "Correct: Ca + 2H₂O → Ca(OH)₂ + H₂."],
      ["calcium oxide and hydrogen", "The oxide forms when magnesium reacts with steam."],
      ["calcium hydroxide and oxygen gas", "Water is reduced to hydrogen, not oxidised to oxygen."],
      ["calcium oxide and water", "Calcium is oxidised; a gas is given off."],
    ],
    answer: "A",
    explanation: "Calcium fizzes steadily; the mixture turns cloudy because some Ca(OH)₂ does not dissolve.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which Group 2 carbonate needs the highest temperature to decompose?",
    options: [
      [t`$\ce{BaCO3}$`, "Correct: thermal stability increases down the group."],
      [t`$\ce{MgCO3}$`, "Magnesium carbonate decomposes most easily."],
      [t`$\ce{CaCO3}$`, "Calcium carbonate is less stable than strontium or barium carbonate."],
      [t`$\ce{SrCO3}$`, "Strontium carbonate is less stable than barium carbonate."],
    ],
    answer: "A",
    explanation: "Stability order: MgCO₃ < CaCO₃ < SrCO₃ < BaCO₃.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which equation shows the thermal decomposition of strontium nitrate?",
    options: [
      [t`$\ce{2Sr(NO3)2 -> 2SrO + 4NO2 + O2}$`, "Correct: oxide, nitrogen dioxide and oxygen."],
      [t`$\ce{Sr(NO3)2 -> Sr(NO2)2 + O2}$`, "Nitrite and oxygen are the products for Group 1 nitrates such as NaNO₃."],
      [t`$\ce{2Sr(NO3)2 -> 2SrO + 4NO + 3O2}$`, "Balanced, but the brown gas formed is NO₂, not colourless NO."],
      [t`$\ce{Sr(NO3)2 -> Sr + 2NO2 + 2O2}$`, "The metal is not formed; the oxide is."],
    ],
    answer: "A",
    explanation: "Group 2 nitrates: 2M(NO₃)₂ → 2MO + 4NO₂ + O₂ (brown fumes).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about the Group 2 elements from magnesium to barium are correct?\n\n1. The first ionisation energy decreases down the group.\n2. The reaction with cold water becomes more vigorous down the group.\n3. The pH of the saturated hydroxide solution decreases down the group.",
    options: [
      ["1 and 2 only", "Correct: the hydroxides become more soluble, so the pH increases."],
      ["1, 2 and 3", "Statement 3 is false: Ba(OH)₂ solution is the most alkaline."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: reactivity increases down the group."],
    ],
    answer: "A",
    hints: ["Which way does hydroxide solubility go?"],
    explanation: "Lower IE → more reactive; more soluble hydroxides → higher pH down the group.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "A piece of calcium carbonate is added to excess dilute sulfuric acid. The fizzing soon stops even though both reactants remain. Why?",
    options: [
      ["Sparingly soluble calcium sulfate coats the carbonate.", "Correct: the coating stops the acid reaching the carbonate."],
      ["Carbon dioxide dissolves in the acid and stops the reaction.", "CO₂ is only slightly soluble and does not prevent reaction."],
      ["Sulfuric acid is too weak an acid to react with carbonates.", "Sulfuric acid is a strong acid."],
      ["Calcium carbonate is more thermally stable than the acid.", "Thermal stability is irrelevant at room temperature."],
    ],
    answer: "A",
    hints: ["Think about the solubility of the salt formed."],
    explanation: "CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂; CaSO₄ forms a barrier layer. Hydrochloric acid would react completely.",
  });
  b.mcq({
    d: 3, skill: "RECALL", applies: ZIM,
    stem: "Which Group 2 compound is used as a 'barium meal' for X-ray imaging of the digestive system, and why is it safe?",
    options: [
      ["barium sulfate, as it is too insoluble for Ba²⁺ to be absorbed", "Correct: soluble barium compounds are toxic."],
      ["barium chloride, because it dissolves and coats the gut evenly", "Soluble barium chloride is toxic."],
      ["barium carbonate, because it does not react with stomach acid", "BaCO₃ reacts with HCl in the stomach to give toxic soluble BaCl₂."],
      ["barium hydroxide, because it neutralises stomach acid", "Ba(OH)₂ is soluble, toxic and strongly alkaline."],
    ],
    answer: "A",
    hints: ["Soluble barium compounds are toxic."],
    explanation: "BaSO₄ is very insoluble (even in acid), dense and opaque to X-rays.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Radium is below barium in Group 2. Which prediction about radium compounds is most likely to be correct?",
    options: [
      ["Radium sulfate is less soluble than barium sulfate.", "Correct: sulfate solubility decreases down the group."],
      ["Radium hydroxide is less soluble than barium hydroxide.", "Hydroxide solubility increases down the group."],
      ["Radium carbonate decomposes at a lower temperature than barium carbonate.", "Thermal stability increases down the group."],
      ["Radium reacts more slowly with water than barium does.", "Reactivity increases down the group."],
    ],
    answer: "A",
    hints: ["Continue each trend one step further."],
    explanation: "Extrapolate: Ra(OH)₂ most soluble, RaSO₄ least soluble, RaCO₃ most stable, Ra most reactive.",
  });
  {
    const n = 25 / Mr("CaCO3");
    const m = n * Mr("CaO");
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: "Calculate the mass of calcium oxide, in g, formed when 25.0 g of calcium carbonate is completely decomposed by heat, to three significant figures. (Mr: CaCO₃ 100.1, CaO 56.1)",
      value: m, sf: 3, unit: "g",
      wrong: [sfStr(n * 44, 3)],
      explanation: `1. CaCO₃ → CaO + CO₂.\n2. n(CaCO₃) = 25.0 ÷ ${Mr("CaCO3")} = ${sfStr(n, 3)} mol = n(CaO).\n3. Mass = ${sfStr(n, 3)} × ${Mr("CaO")} = ${sfStr(m, 3)} g. (${sfStr(n * 44, 3)} g is the mass of CO₂ lost.)`,
    });
  }
  {
    const n = 0.2 / AR.Ca;
    const v = n * VM_RTP * 1000;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: "0.200 g of calcium reacts completely with water. Calculate the volume of hydrogen, in cm³ at room conditions, to three significant figures. (Ar Ca 40.1; molar gas volume 24.0 dm³ mol⁻¹)",
      value: v, sf: 3, unit: "cm³",
      wrong: [sfStr(v * 2, 3)],
      explanation: `Ca + 2H₂O → Ca(OH)₂ + H₂ (1 : 1). n = 0.200 ÷ 40.1 = ${sfStr(n, 3)} mol; V = ${sfStr(n, 3)} × 24 000 = ${sfStr(v, 3)} cm³. Taking 2 mol H₂ per mol Ca gives ${sfStr(v * 2, 3)} cm³.`,
    });
  }
  {
    const n = 2 / Mr("MgCO3");
    const loss = n * Mr("CO2");
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "2.00 g of magnesium carbonate is heated to constant mass. Calculate the loss in mass, in g, to three significant figures. (Mr: MgCO₃ 84.3, CO₂ 44.0)",
      value: loss, sf: 3, unit: "g",
      wrong: [sfStr(n * Mr("MgO"), 3)],
      hints: ["The loss in mass is the carbon dioxide given off."],
      explanation: `1. MgCO₃ → MgO + CO₂.\n2. n(MgCO₃) = 2.00 ÷ ${Mr("MgCO3")} = ${sfStr(n, 3)} mol.\n3. Mass of CO₂ = ${sfStr(n, 3)} × 44.0 = ${sfStr(loss, 3)} g. (${sfStr(n * Mr("MgO"), 3)} g is the mass of MgO left, not the loss.)`,
    });
  }
  {
    const n = 4.9 / Mr("H2SO4");
    const m = n * Mr("CaO");
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Calculate the mass of calcium oxide, in g, needed to neutralise 4.90 g of sulfuric acid, to three significant figures: CaO + H₂SO₄ → CaSO₄ + H₂O. (Mr: H₂SO₄ 98.1, CaO 56.1)",
      value: m, sf: 3, unit: "g",
      wrong: [sfStr(2 * m, 3)],
      hints: ["The mole ratio is 1 : 1."],
      explanation: `1. n(H₂SO₄) = 4.90 ÷ ${Mr("H2SO4")} = ${sfStr(n, 3)} mol.\n2. n(CaO) = ${sfStr(n, 3)} mol.\n3. Mass = ${sfStr(n, 3)} × ${Mr("CaO")} = ${sfStr(m, 3)} g. Treating each H⁺ as needing one CaO gives ${sfStr(2 * m, 3)} g.`,
    });
  }
  {
    const oh = 2 * 0.015;
    const p = pHStrongBase(oh);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Calculate the pH of a 0.0150 mol dm⁻³ solution of barium hydroxide, to two decimal places. (Kw = 1.00 × 10⁻¹⁴ mol² dm⁻⁶)",
      value: p, dp: 2,
      wrong: [dpStr(pHStrongBase(0.015), 2)],
      hints: ["Each Ba(OH)₂ releases two OH⁻ ions."],
      explanation: `1. [OH⁻] = 2 × 0.0150 = ${sfStr(oh, 3)} mol dm⁻³.\n2. [H⁺] = 1.00 × 10⁻¹⁴ ÷ ${sfStr(oh, 3)}.\n3. pH = ${dpStr(p, 2)}. Forgetting the factor of 2 gives ${dpStr(pHStrongBase(0.015), 2)}.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Magnesium hydroxide is used as an antacid because it is a weak base that neutralises excess stomach acid.",
    answer: true,
    explanation: "True. Milk of magnesia (Mg(OH)₂) and magnesium trisilicate neutralise excess hydrochloric acid in the stomach.",
  });
  b.match({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "Match each compound with one of its uses.",
    pairs: [
      ["magnesium oxide", "lining of furnaces"],
      ["calcium hydroxide", "neutralising acidic soils"],
      ["calcium sulfate", "plaster casts for broken bones"],
      ["barium sulfate", "X-ray imaging of the gut"],
    ],
    extraRight: ["fizzy drink flavouring"],
    explanation: "MgO is refractory; Ca(OH)₂ is basic; gypsum gives plaster; BaSO₄ is insoluble and opaque to X-rays.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each Group 2 metal with the colour of its flame when it burns in air.",
    pairs: [
      ["magnesium", "brilliant white"],
      ["calcium", "brick-red"],
      ["strontium", "crimson"],
      ["barium", "apple-green"],
    ],
    extraRight: ["lilac"],
    hints: ["Lilac is a Group 1 flame colour."],
    explanation: "Lilac is potassium, a Group 1 metal.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the sentences about the trends down Group 2.",
    template: "From magnesium to barium the atomic radius {{blank:a}}, the first ionisation energy {{blank:b}}, the solubility of the sulfates {{blank:c}} and the thermal stability of the carbonates {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["increases"], choices: ["increases", "decreases"] },
      { id: "b", accepted: ["decreases"], choices: ["increases", "decreases"] },
      { id: "c", accepted: ["decreases"], choices: ["increases", "decreases"] },
      { id: "d", accepted: ["increases"], choices: ["increases", "decreases"] },
    ],
    hints: ["Only the hydroxide and sulfate trends go in opposite directions."],
    explanation: "Radius up, IE down, sulfate solubility down, carbonate stability up.",
  });
  b.short({
    d: 3, skill: "APPLICATION",
    stem: "Write the equation for the reaction of barium carbonate with dilute hydrochloric acid (type, e.g., A + 2B -> C + D + E).",
    accepted: ["BaCO3 + 2HCl -> BaCl2 + H2O + CO2", "BaCO3 + 2HCl → BaCl2 + H2O + CO2", "BaCO3 + 2HCl -> BaCl2 + CO2 + H2O", "BaCO3(s) + 2HCl(aq) -> BaCl2(aq) + H2O(l) + CO2(g)", "BaCO3(s) + 2HCl(aq) → BaCl2(aq) + H2O(l) + CO2(g)"],
    normalise: ["trim", "collapse_whitespace"],
    wrong: ["BaCO3 + HCl -> BaCl + H2O + CO2"],
    hints: ["Barium forms Ba²⁺, so its chloride is BaCl₂."],
    explanation: "BaCO₃ + 2HCl → BaCl₂ + H₂O + CO₂ (effervescence).",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3, applies: ZIM,
    stem: "A farmer near Masvingo has acidic soil. Explain why calcium hydroxide or powdered limestone can be used to treat it, with an equation, and suggest one advantage of limestone over calcium hydroxide.",
    points: [
      "Both are bases that neutralise the acid (H⁺) in the soil",
      "Equation: Ca(OH)₂ + 2H⁺ → Ca²⁺ + 2H₂O, or CaCO₃ + 2H⁺ → Ca²⁺ + H₂O + CO₂",
      "Limestone is insoluble so it acts slowly and cannot over-lime (make the soil too alkaline), and it is cheaper / safer to handle (not caustic)",
    ],
    modelAnswer: "Calcium hydroxide and calcium carbonate are bases that react with the acid in the soil, e.g. CaCO₃ + 2H⁺ → Ca²⁺ + H₂O + CO₂. Limestone is insoluble and reacts only as acid reaches it, so it is less likely to make the soil too alkaline; it is also cheaper and not caustic to handle.",
    hints: ["Think about solubility and handling."],
    explanation: "Liming neutralises soil acidity.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe what you would see when a small piece of calcium is added to water containing a few drops of universal indicator, and explain each observation.",
    points: [
      "Effervescence (bubbles) because hydrogen gas is produced",
      "The mixture turns cloudy / white suspension because calcium hydroxide is only slightly soluble",
      "Indicator turns blue/purple because calcium hydroxide is alkaline (OH⁻ ions)",
    ],
    modelAnswer: "The calcium sinks and fizzes steadily as hydrogen is given off (Ca + 2H₂O → Ca(OH)₂ + H₂). The solution goes cloudy white because calcium hydroxide is only slightly soluble. The indicator turns blue-purple because the dissolved calcium hydroxide gives an alkaline solution.",
    hints: ["Three observations: gas, solid, colour."],
    explanation: "Each observation links to one product.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Describe how you would show in the laboratory that thermal stability of the Group 2 carbonates increases down the group, using magnesium, calcium and barium carbonates.",
    points: [
      "Heat equal amounts (moles or masses) of each carbonate in turn in a boiling tube with the same Bunsen flame",
      "Pass the gas through limewater (delivery tube)",
      "Time how long it takes for the limewater to turn milky",
      "The shortest time shows the least stable carbonate: MgCO₃ < CaCO₃ < BaCO₃; take the delivery tube out before stopping heating to avoid suck-back",
    ],
    modelAnswer: "Put the same amount in moles of each carbonate in a boiling tube fitted with a delivery tube into limewater. Heat with the same, steady Bunsen flame and time how long it takes for the limewater to turn milky. Magnesium carbonate gives CO₂ fastest and barium carbonate slowest, showing stability increases down the group. Remove the delivery tube from the limewater before stopping heating to prevent suck-back; wear eye protection.",
    hints: ["What measurable quantity shows how easily CO₂ is given off?"],
    explanation: "A fair test with a measured time to detect CO₂.",
  });
  {
  const nMg = 5 / Mr("MgCO3");
  const mgo = nMg * Mr("MgO");
  const fullLossCa = chk(Number((5 - (5 / Mr("CaCO3")) * Mr("CaO")).toFixed(2)), 2.2);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: `Thandeka heated 5.00 g samples of three white solids, **E**, **F** and **G**, each a Group 2 carbonate, in the same way for 10 minutes and recorded the mass of residue.\n\n| Solid | mass before / g | mass after 10 minutes / g |\n|---|---|---|\n| **E** | 5.00 | ${mgo.toFixed(2)} |\n| **F** | 5.00 | 3.92 |\n| **G** | 5.00 | 5.00 |`,
    parts: (() => {
      return [
        P.mcq({ label: "(a)", stem: "Which solid is most likely to be barium carbonate?", options: [
          ["**G**", "Correct: no loss in mass, so it is the most stable."],
          ["**E**", "**E** lost the most mass: the least stable carbonate."],
          ["**F**", "**F** lost some mass, so it is less stable than **G**."],
          ["none of them", "Barium carbonate is the most stable, matching **G**."],
        ], answer: "A", explanation: "BaCO₃ does not decompose at Bunsen temperatures." }),
        P.num({ label: "(b)", marks: 2, stem: "Show by calculation that the residue from **E** is consistent with complete decomposition of magnesium carbonate. Give the expected mass of MgO, in g, to three significant figures. (Mr: MgCO₃ 84.3, MgO 40.3)", value: mgo, sf: 3, unit: "g", wrong: [sfStr(5 - mgo, 3)], explanation: `n(MgCO₃) = 5.00 ÷ ${Mr("MgCO3")} = ${sfStr(nMg, 3)} mol; MgO = ${sfStr(nMg, 3)} × 40.3 = ${sfStr(mgo, 3)} g, which matches the residue.` }),
        P.short({ label: "(c)", marks: 1, stem: "Write the equation for the decomposition of the carbonate in **E** (type, e.g., A -> B + C).", accepted: ["MgCO3 -> MgO + CO2", "MgCO3 → MgO + CO2", "MgCO3(s) -> MgO(s) + CO2(g)", "MgCO3(s) → MgO(s) + CO2(g)"], normalise: ["trim", "collapse_whitespace"], wrong: ["MgCO3 -> Mg + CO3"], explanation: "MgCO₃ → MgO + CO₂." }),
        P.manual({ label: "(d)", marks: 2, stem: `**F** is calcium carbonate. Explain why its loss in mass (1.08 g) is less than the ${fullLossCa.toFixed(2)} g expected for complete decomposition, and how you would make it decompose completely.`, points: ["Calcium carbonate is more thermally stable, so it decomposed only partly at the Bunsen temperature in 10 minutes", "Heat more strongly (or for longer) and heat to constant mass"], modelAnswer: "CaCO₃ needs a higher temperature than MgCO₃, so only part of it decomposed in 10 minutes. Heating more strongly, for longer, until the mass stays constant would complete the decomposition." }),
        P.tf({ label: "(e)", stem: "Solid **G** would decompose if it were heated strongly enough, for example in a furnace.", answer: true, explanation: "True: BaCO₃ does decompose to BaO and CO₂, but only at a much higher temperature than a Bunsen flame gives." }),
        P.manual({ label: "(f)", marks: 1, stem: "Describe a simple test on the residue from **F** that shows calcium oxide is present.", points: ["Add a few drops of water: it hisses/steams (exothermic) and the mixture turns universal indicator blue-purple (alkaline Ca(OH)₂)"], modelAnswer: "Add a few drops of water: the residue gets hot and the mixture turns universal indicator purple, showing a basic oxide (CaO → Ca(OH)₂)." }),
      ];
    })(),
    hints: ["The most stable carbonate loses the least mass.", "Mass of MgO = moles of MgCO₃ × Mr(MgO)."],
    explanation: "E MgCO₃ (complete decomposition), F CaCO₃ (partial), G BaCO₃ (none): stability increases down the group.",
  });
  }
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, applies: ZIM,
    stem: "An antacid tablet of mass 1.20 g contains magnesium hydroxide as its only base. Sipho crushed one tablet, added 50.0 cm³ of 0.400 mol dm⁻³ HCl (an excess), and titrated the excess acid with 0.200 mol dm⁻³ NaOH. The mean titre was 32.40 cm³.",
    parts: (() => {
      const nHCl = (50 / 1000) * 0.4;
      const nNaOH = (32.4 / 1000) * 0.2;
      const used = nHCl - nNaOH;
      const nMg = used / 2;
      const m = nMg * Mr("Mg(OH)2");
      const pct = (m / 1.2) * 100;
      return [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the amount, in mol, of HCl added.", value: nHCl, sf: 3, unit: "mol", explanation: `50.0 ÷ 1000 × 0.400 = ${sfStr(nHCl, 3)} mol.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the amount, in mol, of HCl left over (neutralised by the NaOH).", value: nNaOH, sf: 3, unit: "mol", explanation: `32.40 ÷ 1000 × 0.200 = ${sfStr(nNaOH, 3)} mol.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the mass of magnesium hydroxide in the tablet, in g, to three significant figures. (Ar: H 1.0, O 16.0, Mg 24.3)", value: m, sf: 3, unit: "g", wrong: [sfStr(used * Mr("Mg(OH)2"), 3)], explanation: `HCl used by the tablet = ${sfStr(nHCl, 3)} − ${sfStr(nNaOH, 3)} = ${sfStr(used, 3)} mol; Mg(OH)₂ + 2HCl → MgCl₂ + 2H₂O, so n = ${sfStr(nMg, 3)} mol; mass = ${sfStr(m, 3)} g. Forgetting the 1 : 2 ratio gives ${sfStr(used * Mr("Mg(OH)2"), 3)} g.` }),
        P.num({ label: "(d)", marks: 1, stem: "Calculate the percentage by mass of magnesium hydroxide in the tablet, to three significant figures.", value: pct, sf: 3, unit: "%", explanation: `${sfStr(m, 3)} ÷ 1.20 × 100 = ${sfStr(pct, 3)}%.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why a back titration is used instead of titrating the tablet directly with acid.", points: ["Magnesium hydroxide is insoluble, so it reacts slowly and the end point would be hard to see / drift", "Excess acid makes sure all the base reacts; the leftover acid is then titrated easily with a soluble alkali"], modelAnswer: "Magnesium hydroxide is insoluble and reacts slowly, so a direct titration would have an unclear end point. Adding a known excess of acid lets all the base react completely; the remaining acid can then be titrated quickly and accurately with sodium hydroxide." }),
        P.manual({ label: "(f)", marks: 1, stem: "Explain why magnesium hydroxide, rather than sodium hydroxide, is used in antacids.", points: ["Mg(OH)₂ is a weak, sparingly soluble base and is not corrosive; NaOH is a strong, caustic alkali that would damage the gut"], modelAnswer: "Magnesium hydroxide is only sparingly soluble and mildly basic, so it neutralises excess acid without harming the body; sodium hydroxide is a strong, corrosive alkali." }),
      ];
    })(),
    hints: ["Acid used by the tablet = acid added − acid left over.", "Mg(OH)₂ reacts with HCl in a 1 : 2 ratio."],
    explanation: "Back titration: moles of HCl used by the tablet, halved, give moles of Mg(OH)₂.",
  });
  b.card("FACT", "Group 2 metals with water", "Mg: very slow (cold), fast with steam → MgO. Ca, Sr, Ba: M + 2H₂O → M(OH)₂ + H₂, more vigorous down the group.");
  b.card("FORMULA", "Thermal decomposition of Group 2 carbonates", "MCO₃ → MO + CO₂; stability increases down the group.");
  b.card("FORMULA", "Thermal decomposition of Group 2 nitrates", "2M(NO₃)₂ → 2MO + 4NO₂ + O₂ (brown fumes); stability increases down the group.");
  b.card("FACT", "Solubility trends in Group 2", "Hydroxides: more soluble down the group. Sulfates: less soluble down the group.");
  b.card("FACT", "Group 2 flame colours", "Mg brilliant white; Ca brick-red; Sr crimson; Ba apple-green.");
  b.card("CONCEPT", "Why Ca, Sr, Ba stop reacting with dilute H₂SO₄", "An insoluble sulfate coats the metal (or carbonate) and keeps the acid away.");
  b.card("FACT", "Uses: MgO, CaO, Ca(OH)₂, CaCO₃ (ZIMSEC)", "MgO furnace linings; CaO, Ca(OH)₂, CaCO₃ neutralise acid soils; CaCO₃ for cement, glass and iron extraction.", undefined, { applies: ZIM });
  b.card("FACT", "Uses: CaSO₄, BaSO₄, Mg(OH)₂ (ZIMSEC)", "CaSO₄ plaster; BaSO₄ barium meal (insoluble, X-ray opaque); Mg(OH)₂ and magnesium trisilicate antacids.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Reactivity trend in Group 2", "Increases down the group: larger atoms, lower ionisation energies, outer electrons lost more easily.");
});
