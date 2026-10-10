// W4b: achem.phase.steam-distillation (ZIMSEC only, Form 6, 6.4.2.1)
import { concept, P, t, ce, ZIM, dpStr, sfStr } from "../lib.mjs";

concept("achem.phase.steam-distillation", { file: "phase/steam-distillation", keyPrefix: "phase.steam-distillation", applies: ZIM }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What kind of substance is best separated by steam distillation?",
    options: [
      ["a heat-sensitive liquid that does not mix with water", "Correct: it distils with steam below 100 °C without decomposing."],
      ["a salt dissolved in water", "Salts are not volatile; evaporation or crystallisation is used."],
      ["a liquid that mixes completely with water, such as ethanol", "Miscible liquids are separated by fractional distillation."],
      ["a gas mixture such as air", "Gas mixtures are separated by fractional distillation of the liquefied gases."],
    ],
    answer: "A",
    explanation: "Steam distillation suits water-immiscible, volatile, heat-sensitive substances such as essential oils.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does a mixture of water and an immiscible oil boil below 100 °C?",
    options: [
      ["Each liquid exerts its full vapour pressure, and the two add together.", "Correct: p(total) = p°(water) + p°(oil)."],
      ["The oil lowers the vapour pressure of the water by dissolving in it.", "The liquids are immiscible, so neither lowers the other's vapour pressure."],
      ["The oil reacts with water to form a more volatile compound.", "No reaction occurs; the liquids simply share the vapour space."],
      ["Steam is hotter than boiling water, so less heat is needed.", "The boiling temperature depends on vapour pressures, not on the steam's heat."],
    ],
    answer: "A",
    explanation: "Immiscible layers each act as a pure liquid; their vapour pressures add.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is the purpose of the long safety tube dipping into the water of a steam generator?",
    options: [
      ["It releases pressure if the steam outlet is blocked.", "Correct: excess pressure pushes water up the tube instead of bursting the flask."],
      ["It returns condensed oil to the generator.", "Oil never enters the steam generator."],
      ["It measures the temperature of the steam.", "A thermometer does that; the safety tube is open."],
      ["It adds fresh plant material during the distillation.", "Plant material is in the distillation flask, not the generator."],
    ],
    answer: "A",
    explanation: "The safety tube acts as a pressure release.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about steam distillation of an essential oil are correct?\n\n1. The mixture boils at a constant temperature while both water and oil are present.\n2. The distillate contains more molecules of water than of oil.\n3. The oil and water in the distillate form two layers.",
    options: [
      ["1, 2 and 3", "Correct: all three are true."],
      ["1 and 2 only", "Statement 3 is also true: the liquids are immiscible."],
      ["2 and 3 only", "Statement 1 is also true: each liquid's vapour pressure depends only on temperature."],
      ["1 only", "Statements 2 and 3 are also true."],
    ],
    answer: "A",
    hints: ["Compare the vapour pressures of water and the oil near 100 °C."],
    explanation: "Constant boiling temperature; water dominates by molecules; two immiscible layers.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which statements explain why a useful mass of oil is collected, even though the oil has a low vapour pressure?\n\n1. Oil molecules have a much larger relative molecular mass than water molecules.\n2. The oil dissolves completely in the hot water.\n3. Oil molecules make up a large fraction of the molecules in the vapour.",
    options: [
      ["1 only", "Correct: few but heavy oil molecules give an appreciable mass."],
      ["1 and 3 only", "Statement 3 is false: most molecules in the vapour are water."],
      ["2 and 3 only", "Both are false: the oil is immiscible and a minor part of the vapour by molecules."],
      ["1, 2 and 3", "Only statement 1 is true."],
    ],
    answer: "A",
    hints: ["Mass = number of molecules × mass of each."],
    explanation: "The mass ratio depends on both vapour pressure and molar mass; heavy molecules compensate for low vapour pressure.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which substance would NOT be suitable for purification by steam distillation?",
    options: [
      ["ethanoic acid, which mixes completely with water", "Correct: it is miscible with water, so it does not form a separate layer."],
      ["phenylamine, a water-immiscible liquid that boils at 184 °C", "Phenylamine is a classic example: it steam distils at about 98 °C."],
      ["limonene, the main component of orange-peel oil", "Limonene is immiscible with water and volatile in steam."],
      ["eucalyptus oil from crushed leaves", "Eucalyptus oil is commonly obtained by steam distillation."],
    ],
    answer: "A",
    hints: ["The method needs two immiscible liquids."],
    explanation: "Water-miscible substances do not form a separate layer and do not obey the additive vapour-pressure rule.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A mixture of water and an immiscible liquid Q is steam distilled at a place where atmospheric pressure is lower than at sea level. How does the boiling temperature of the mixture compare with that at sea level?",
    options: [
      ["It is lower, because a smaller total vapour pressure is needed.", "Correct: boiling occurs when p(total) equals the external pressure."],
      ["It is higher, because the vapour has less pressure pushing it out.", "Lower external pressure makes boiling easier, not harder."],
      ["It is the same, because the vapour pressures of water and Q do not change.", "Vapour pressures are fixed at a given temperature, but the pressure needed to boil is smaller."],
      ["It is 100 °C, because water always boils at 100 °C.", "Water boils at 100 °C only at 101.3 kPa."],
    ],
    answer: "A",
    hints: ["What does boiling require?"],
    explanation: "Lower atmospheric pressure → the required total vapour pressure is reached at a lower temperature.",
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "At 95 °C the vapour pressure of water is 84.5 kPa (data) and, in an experiment, that of an immiscible liquid Z was 12.3 kPa. Calculate the total vapour pressure of the mixture at 95 °C, in kPa.",
    value: 84.5 + 12.3, dp: 1, unit: "kPa",
    wrong: [84.5],
    explanation: `Each immiscible liquid exerts its full vapour pressure: 84.5 + 12.3 = ${dpStr(84.5 + 12.3, 1)} kPa, below atmospheric pressure, so the mixture is not yet boiling at 95 °C.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true, daily: true,
    stem: "A mixture of water and an immiscible oil boils at 92 °C when atmospheric pressure is 101.3 kPa. The vapour pressure of water at 92 °C is 75.7 kPa (data). Calculate the vapour pressure of the oil at 92 °C, in kPa.",
    value: 101.3 - 75.7, dp: 1, unit: "kPa",
    wrong: [75.7],
    hints: ["At the boiling point, p(water) + p(oil) = atmospheric pressure."],
    explanation: `p(oil) = 101.3 − 75.7 = ${dpStr(101.3 - 75.7, 1)} kPa.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "In a town where atmospheric pressure is 85.0 kPa, a water-immiscible liquid R has a vapour pressure of 4.5 kPa at the temperature at which a water–R mixture boils. Calculate the vapour pressure of water at that temperature, in kPa.",
    value: 85.0 - 4.5, dp: 1, unit: "kPa",
    wrong: [101.3 - 4.5],
    hints: ["Use the local atmospheric pressure, not 101.3 kPa."],
    explanation: `p(water) = 85.0 − 4.5 = ${dpStr(85.0 - 4.5, 1)} kPa. Using sea-level pressure (101.3 kPa) gives ${dpStr(101.3 - 4.5, 1)} kPa, which is wrong here.`,
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "When two immiscible liquids are heated together, the mixture boils at a temperature below the boiling point of either liquid.",
    answer: true,
    explanation: "True. The vapour pressures add, so their sum reaches atmospheric pressure at a lower temperature.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Adding more water to a steam distillation flask lowers the temperature at which the mixture boils.",
    answer: false,
    explanation: "False. As long as both liquids are present, each exerts its full vapour pressure, so the boiling temperature does not depend on the proportions.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each part of the steam distillation apparatus with its job.",
    pairs: [
      ["steam generator", "boils water to supply steam"],
      ["safety tube", "prevents pressure building up"],
      ["condenser", "turns the mixed vapour back into liquid"],
      ["separating funnel", "separates the oil layer from the water"],
    ],
    explanation: "Steam is made, passed through the plant material, condensed and the layers separated.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences about steam distillation.",
    template: "Steam distillation is used for substances that are {{blank:a}} with water and would {{blank:b}} at their normal boiling point. The mixture distils {{blank:c}} 100 °C.",
    blanks: [
      { id: "a", accepted: ["immiscible"], choices: ["immiscible", "miscible"] },
      { id: "b", accepted: ["decompose"], choices: ["decompose", "freeze", "dissolve"] },
      { id: "c", accepted: ["below"], choices: ["below", "above", "exactly at"] },
    ],
    explanation: "Immiscible, heat-sensitive substances distil with steam below 100 °C.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the main hydrocarbon in the oil obtained by steam distillation of orange peel.",
    accepted: ["limonene", "D-limonene", "d-limonene"],
    wrong: ["ethanol"],
    explanation: "Limonene, a terpene hydrocarbon (C₁₀H₁₆).",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a mixture of phenylamine (boiling point 184 °C) and water boils at about 98 °C.",
    points: ["Phenylamine and water are immiscible, so each exerts its own full vapour pressure independently", "The total vapour pressure is the sum of the two vapour pressures", "The sum reaches atmospheric pressure (101 kPa) at about 98 °C, when water alone has not yet reached 101 kPa and phenylamine's vapour pressure is small"],
    modelAnswer: "Phenylamine does not mix with water, so each liquid behaves as if the other were absent and exerts its full vapour pressure. The total vapour pressure above the mixture is the sum of the two. At about 98 °C water contributes most of the 101 kPa and phenylamine the rest, so the mixture boils there, below the boiling point of either liquid.",
    hints: ["Add the vapour pressures."],
    explanation: "Additivity of vapour pressures for immiscible liquids.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe how eucalyptus oil can be obtained from eucalyptus leaves by steam distillation in a laboratory.",
    points: ["Chop/crush the leaves and place them with some water in a round-bottomed flask", "Pass steam from a steam generator (with safety tube) through the mixture (or boil the leaves with water)", "Condense the vapour with a water-cooled condenser and collect the distillate (two layers / cloudy)", "Separate the oil from the water with a separating funnel (or extract with a solvent) and dry it with an anhydrous drying agent"],
    modelAnswer: "Crush the leaves and put them with a little water in a round-bottomed flask. Pass steam from a steam generator fitted with a safety tube through the mixture. The vapour of oil and water passes into a condenser and the distillate, which is cloudy or forms two layers, is collected. Separate the oil layer with a separating funnel (extracting the water layer with a little solvent if needed) and dry the oil with anhydrous sodium sulfate.",
    hints: ["Make steam, distil, condense, separate."],
    explanation: "Preparation, distillation, condensation, separation and drying.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Give three advantages of steam distillation over ordinary distillation for obtaining a flavouring oil from plant material.",
    points: ["Distils below 100 °C, so heat-sensitive compounds do not decompose/oxidise/char", "No organic solvent is needed (no solvent residues in a food product; cheaper and safer)", "Non-volatile plant material (cellulose, sugars, pigments) stays behind, giving a cleaner product"],
    modelAnswer: "Because the oil distils with steam below 100 °C, its delicate compounds are not decomposed or charred. No organic solvent is needed, so there is no toxic residue in the flavouring and the process is cheaper and safer. Non-volatile plant material stays in the flask, so the oil collected is relatively pure.",
    hints: ["Think about temperature, solvents and purity."],
    explanation: "Low temperature, no solvent, separation from non-volatiles.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "Data: vapour pressure of water at 94 °C, 95 °C and 96 °C is 81.5, 84.5 and 87.7 kPa. In an experiment, the vapour pressure of a water-immiscible liquid W at these temperatures was found to be 15.4, 16.2 and 17.0 kPa. Atmospheric pressure is 101.3 kPa.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the total vapour pressure of the mixture at 95 °C, in kPa.", value: 84.5 + 16.2, dp: 1, unit: "kPa", explanation: `84.5 + 16.2 = ${dpStr(84.5 + 16.2, 1)} kPa.` }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the total vapour pressure at 96 °C, in kPa.", value: 87.7 + 17.0, dp: 1, unit: "kPa", explanation: `87.7 + 17.0 = ${dpStr(87.7 + 17.0, 1)} kPa.` }),
      P.mcq({ label: "(c)", marks: 1, stem: "Between which temperatures does the mixture boil?", options: [
        ["95 °C and 96 °C", "Correct: the total passes 101.3 kPa between these temperatures."],
        ["94 °C and 95 °C", "At 95 °C the total is still below 101.3 kPa."],
        ["96 °C and 100 °C", "At 96 °C the total is already above 101.3 kPa."],
        ["above 100 °C", "Immiscible mixtures with water boil below 100 °C."],
      ], answer: "A", explanation: `${dpStr(84.5 + 16.2, 1)} kPa at 95 °C and ${dpStr(87.7 + 17.0, 1)} kPa at 96 °C bracket 101.3 kPa.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why the boiling temperature stays constant during the distillation even though the amounts of water and W change.", points: ["Each immiscible liquid exerts its full vapour pressure, which depends only on temperature, not on the amount present", "So as long as both liquids are present, the total vapour pressure equals atmospheric pressure at the same temperature"], modelAnswer: "The vapour pressure of each pure, immiscible liquid depends only on the temperature, not on how much of it there is. While both layers remain, the sum reaches 101.3 kPa at the same temperature, so the boiling temperature does not change." }),
      P.manual({ label: "(e)", marks: 2, stem: "W has a relative molecular mass of about 150. Explain, without calculation, why the distillate contains a useful mass of W even though most of the molecules in the vapour are water.", points: ["The ratio of molecules in the vapour equals the ratio of vapour pressures, so water molecules are in the majority (about 5 : 1)", "Each W molecule is about eight times heavier than a water molecule (150 vs 18), so W makes up a substantial fraction of the mass"], modelAnswer: "The numbers of molecules in the vapour are in the ratio of the vapour pressures, so there are several water molecules for each W molecule. But each W molecule (Mr about 150) is roughly eight times as heavy as a water molecule (Mr 18), so W forms a large share of the mass of the distillate." }),
      P.manual({ label: "(f)", marks: 1, stem: "State how W would be separated from the distillate.", points: ["Use a separating funnel to run off the water layer (W and water are immiscible); dry W with an anhydrous drying agent"], modelAnswer: "W forms a separate layer, so the distillate is put in a separating funnel, the water layer is run off and W is dried with an anhydrous drying agent." }),
    ],
    hints: ["p(total) = p(water) + p(W).", "Boiling: p(total) = atmospheric pressure."],
    explanation: `Totals ${dpStr(84.5 + 16.2, 1)} kPa (95 °C) and ${dpStr(87.7 + 17.0, 1)} kPa (96 °C): boils between 95 and 96 °C; heavy W molecules give a useful mass in the distillate.`,
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: "A small business near Mutare wants to produce lemongrass oil for soaps and perfumes by steam distillation.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Suggest why steam distillation is preferred to heating the lemongrass oil to its own boiling point.", points: ["The oil's components boil well above 100 °C and would decompose/oxidise (lose their scent) at that temperature", "Steam distillation removes the oil below 100 °C because the vapour pressures of water and oil add"], modelAnswer: "The compounds in lemongrass oil boil far above 100 °C and many would decompose or oxidise, spoiling the fragrance, if heated that much. With steam, the oil and water vapour pressures add, so the oil distils below 100 °C." }),
      P.manual({ label: "(b)", marks: 2, stem: "Give two safety precautions for the process.", points: ["Steam and hot apparatus cause scalds: use heat-resistant gloves, keep a safety (pressure-release) tube/valve on the steam generator", "Essential oils are flammable: keep naked flames away from the collected oil (or wear eye protection)"], modelAnswer: "Fit the steam generator with a safety tube or pressure-release valve and handle hot apparatus with heat-resistant gloves to avoid scalds; keep the collected, flammable oil away from naked flames." }),
      P.tf({ label: "(c)", marks: 1, stem: "Lemongrass oil collects as a separate layer in the receiver because it is immiscible with water.", answer: true, explanation: "True: the distillate forms two layers." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two other industries that use steam-distilled oils, with an example product for each.", points: ["Food industry: natural flavourings (e.g. citrus or peppermint oil)", "Pharmaceutical industry: medicinal oils (e.g. eucalyptus oil in inhalants) / perfume or cosmetics industry"], modelAnswer: "The food industry uses steam-distilled citrus and peppermint oils as flavourings, and the pharmaceutical industry uses oils such as eucalyptus oil in inhalants and ointments." }),
      P.mcq({ label: "(e)", marks: 1, stem: "Which technique could check the composition of the oil produced?", options: [
        ["gas-liquid chromatography", "Correct: separates the volatile components and gives their percentages from peak areas."],
        ["electrophoresis", "Electrophoresis separates charged species such as amino acids or DNA."],
        ["titration with sodium hydroxide", "The oil is not an acid to be titrated."],
        ["flame test", "Flame tests identify metal ions."],
      ], answer: "A", explanation: "GLC (often with MS) is used to analyse essential oils." }),
    ],
    hints: ["What happens to delicate compounds at high temperature?"],
    explanation: "Steam distillation removes heat-sensitive, immiscible oils below 100 °C; GLC checks composition.",
  });
  b.card("DEFINITION", "Steam distillation", "Distilling a water-immiscible substance with steam so that it comes over below 100 °C.");
  b.card("FORMULA", "Immiscible liquids", "p(total) = p°(water) + p°(other liquid); each exerts its full vapour pressure.");
  b.card("CONCEPT", "Why below 100 °C", "The sum of the two vapour pressures reaches atmospheric pressure before either alone would.");
  b.card("CONCEPT", "Constant boiling temperature", "While both liquids are present, the mixture boils at a fixed temperature, whatever the proportions.");
  b.card("CONCEPT", "Distillate composition", "Mostly water by molecules; the heavy organic molecules still give a useful mass of product.");
  b.card("FACT", "Steam distillation apparatus", "Steam generator with safety tube, flask with material, condenser, receiver, then separating funnel.");
  b.card("FACT", "Uses of steam distillation", "Essential oils (eucalyptus, citrus peel, lemongrass) for perfumes, flavourings and medicines; purifying phenylamine.");
  b.card("FACT", "Phenylamine and water", "Phenylamine (b.p. 184 °C) steam distils at about 98 °C.");
});
