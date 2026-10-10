// W2b: achem.nitrogen-sulfur.environment (both boards; ZIMSEC Form 5, Cambridge AS Level). Eutrophication and SO₂ as
// a food preservative are ZIMSEC detail.
import { concept, P, t, Mr, AR, VM_RTP, hFromPH, sfStr, ZIM } from "../lib.mjs";

concept("achem.nitrogen-sulfur.environment", { file: "nitrogen-sulfur/environment", keyPrefix: "nitrogen-sulfur.environment" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the main source of nitrogen monoxide in a car engine?",
    options: [
      ["nitrogen and oxygen from the air reacting at high temperature", "Correct: N₂ + O₂ → 2NO in the hot cylinders."],
      ["nitrogen-containing impurities released from the burning petrol", "Petrol contains very little nitrogen; the air supplies it."],
      ["decomposition of carbon dioxide in the exhaust gases", "CO₂ contains no nitrogen."],
      ["reaction of carbon monoxide with water vapour", "This produces no nitrogen compounds."],
    ],
    answer: "A",
    explanation: "Air is about 78% nitrogen; at the high temperature of combustion N₂ and O₂ combine.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which equation shows a reaction that takes place in a catalytic converter?",
    options: [
      [t`$\ce{2CO + 2NO -> 2CO2 + N2}$`, "Correct: both pollutants are converted to harmless gases."],
      [t`$\ce{N2 + O2 -> 2NO}$`, "This forms NO in the engine; the converter removes it."],
      [t`$\ce{2NO + O2 -> 2NO2}$`, "This happens in the air and makes NO₂, a pollutant."],
      [t`$\ce{2CO2 + N2 -> 2CO + 2NO}$`, "This is the reverse reaction: it would create the pollutants."],
    ],
    answer: "A",
    explanation: "On Pt/Pd/Rh, NO is reduced to N₂ and CO is oxidised to CO₂.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which pollutants react in sunlight to form peroxyacetyl nitrate (PAN)?",
    options: [
      ["oxides of nitrogen and unburnt hydrocarbons", "Correct: PAN is a secondary pollutant in photochemical smog."],
      ["sulfur dioxide and carbon dioxide from burning coal", "These cause acid rain and climate effects, not PAN."],
      ["carbon monoxide and water vapour", "These do not form PAN."],
      ["chlorofluorocarbons and ozone", "CFCs destroy stratospheric ozone; they do not form PAN."],
    ],
    answer: "A",
    explanation: "NOₓ + hydrocarbons + UV → PAN and ozone (photochemical smog).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about the role of nitrogen dioxide in forming acid rain are correct?\n\n1. NO₂ oxidises SO₂ to SO₃ and is reduced to NO.\n2. The NO formed is reoxidised to NO₂ by oxygen in the air.\n3. NO₂ is used up permanently in the process.",
    options: [
      ["1 and 2 only", "Correct: because NO₂ is regenerated, it is a catalyst."],
      ["1, 2 and 3", "Statement 3 contradicts statement 2: NO₂ is regenerated."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is true."],
      ["1 only", "Statement 2 is also true and is what makes NO₂ a catalyst."],
    ],
    answer: "A",
    hints: ["A catalyst is regenerated at the end of the cycle."],
    explanation: "NO₂ + SO₂ → NO + SO₃; NO + ½O₂ → NO₂. Overall SO₂ + ½O₂ → SO₃.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In the reaction NO₂ + SO₂ → NO + SO₃, which change in oxidation number occurs?",
    options: [
      ["N: +4 → +2 and S: +4 → +6", "Correct: NO₂ is reduced and SO₂ is oxidised."],
      ["N: +2 → +4 and S: +6 → +4", "This is reversed."],
      ["N: +4 → +2 and S: +6 → +4", "Both cannot be reduced in a redox reaction."],
      ["no oxidation numbers change", "Oxygen is transferred: it is a redox reaction."],
    ],
    answer: "A",
    hints: ["Oxygen is −2 in each oxide."],
    explanation: "NO₂ (N +4) → NO (N +2); SO₂ (S +4) → SO₃ (S +6).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Which statements about eutrophication are correct?\n\n1. Nitrates leached from farmland cause rapid growth of algae.\n2. Bacteria decomposing dead algae use up dissolved oxygen.\n3. Fish die because nitrate ions are directly poisonous to them.",
    options: [
      ["1 and 2 only", "Correct: fish die mainly from lack of oxygen."],
      ["1, 2 and 3", "Statement 3 is false: oxygen depletion, not nitrate toxicity, kills the fish."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is true."],
      ["1 only", "Statement 2 is also true."],
    ],
    answer: "A",
    hints: ["What do the bacteria need to decompose the algae?"],
    explanation: "Nutrients → algal bloom → decay by aerobic bacteria → low dissolved oxygen → fish die.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Why is sulfur dioxide added to dried fruit?",
    options: [
      ["It kills micro-organisms and acts as an antioxidant.", "Correct: it prevents spoilage and browning."],
      ["It adds sweetness and improves the flavour.", "SO₂ is not a sweetener."],
      ["It makes the fruit absorb moisture from the surrounding air.", "Dried fruit should stay dry; SO₂ does not attract water."],
      ["It neutralises acids in the fruit.", "SO₂ is an acidic oxide, not a base."],
    ],
    answer: "A",
    explanation: "SO₂ inhibits bacteria and moulds and, as a reducing agent, prevents oxidation that discolours fruit.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why do catalytic converters not remove nitrogen oxides effectively during the first few minutes after a cold engine is started?",
    options: [
      ["The catalyst must be hot before the reactions are fast enough.", "Correct: until it warms up, little reaction occurs on its surface."],
      ["No nitrogen oxides are produced by a cold engine.", "NO forms whenever fuel burns at high temperature in the cylinders."],
      ["The platinum catalyst is poisoned by water vapour when it is cold.", "Water does not poison the catalyst."],
      ["The equilibrium position favours NO at low temperatures.", "The problem is the slow rate, not the equilibrium."],
    ],
    answer: "A",
    hints: ["Think about reaction rate."],
    explanation: "Surface reactions are slow until the converter reaches its working temperature.",
  });
  {
    const mS = 2500 * 0.012;
    const n = mS / AR.S;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Coal used in a boiler contains 1.20% sulfur by mass. Calculate the amount, in mol, of sulfur dioxide formed when 2.50 kg of this coal burns completely, to three significant figures. (Ar S 32.1)",
      value: n, sf: 3, unit: "mol",
      wrong: [sfStr(mS / Mr("SO2"), 3)],
      hints: ["Find the mass of sulfur first; one S atom gives one SO₂."],
      explanation: `1. Mass of S = 2500 × 0.0120 = ${mS} g.\n2. n(S) = ${mS} ÷ 32.1 = ${sfStr(n, 3)} mol.\n3. S + O₂ → SO₂, so n(SO₂) = ${sfStr(n, 3)} mol. Dividing the mass of sulfur by Mr(SO₂) gives ${sfStr(mS / Mr("SO2"), 3)} mol, which is wrong.`,
    });
  }
  {
    const v = (0.06 / 2) * VM_RTP * 1000;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: "In a catalytic converter, 0.0600 mol of NO reacts with carbon monoxide: 2CO + 2NO → 2CO₂ + N₂. Calculate the volume of nitrogen formed, in cm³ at room conditions. (molar gas volume 24.0 dm³ mol⁻¹)",
      value: v, sf: 3, unit: "cm³",
      wrong: [sfStr(v * 2, 3)],
      explanation: `n(N₂) = 0.0600 ÷ 2 = 0.0300 mol; V = 0.0300 × 24 000 = ${sfStr(v, 3)} cm³.`,
    });
  }
  {
    const h = hFromPH(4.3);
    const mg = (h / 2) * Mr("CaCO3") * 1000;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "Rain with a pH of 4.30 falls on a limestone statue. Assuming all the H⁺ ions in 1.00 dm³ of this rain react (CaCO₃ + 2H⁺ → Ca²⁺ + H₂O + CO₂), calculate the mass of calcium carbonate dissolved, in mg, to three significant figures. (Mr CaCO₃ 100.1)",
      value: mg, sf: 3, unit: "mg",
      wrong: [sfStr(h * Mr("CaCO3") * 1000, 3)],
      hints: ["[H⁺] = 10^(−pH)."],
      explanation: `1. [H⁺] = 10⁻⁴·³⁰ = ${sfStr(h, 3)} mol dm⁻³, so ${sfStr(h, 3)} mol in 1.00 dm³.\n2. n(CaCO₃) = ${sfStr(h, 3)} ÷ 2 = ${sfStr(h / 2, 3)} mol.\n3. Mass = ${sfStr(h / 2, 3)} × 100.1 = ${sfStr(mg / 1000, 3)} g = ${sfStr(mg, 3)} mg. Ignoring the 1 : 2 ratio gives ${sfStr(h * Mr("CaCO3") * 1000, 3)} mg.`,
    });
  }
  {
    const c = 0.12 / Mr("SO2");
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true, applies: ZIM,
      stem: "A fruit juice contains 120 mg of sulfur dioxide per dm³. Calculate this concentration in mol dm⁻³, to three significant figures. (Mr SO₂ 64.1)",
      value: c, sf: 3, unit: "mol/dm³",
      wrong: [sfStr(120 / Mr("SO2"), 3)],
      hints: ["Convert mg to g first."],
      explanation: `1. 120 mg = 0.120 g.\n2. n = 0.120 ÷ 64.1 = ${sfStr(c, 3)} mol in 1 dm³, so ${sfStr(c, 3)} mol dm⁻³. Using 120 instead of 0.120 gives ${sfStr(120 / Mr("SO2"), 3)}, a thousand times too large.`,
    });
  }
  b.num({
    d: 1, skill: "RECALL",
    stem: "What is the oxidation number of nitrogen in nitrogen dioxide, NO₂? (Give the sign, e.g. +3.)",
    value: 4,
    wrong: [2, -4],
    explanation: "2 × (−2) = −4 for oxygen, so N is +4. In NO it is +2.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Ozone formed at ground level in photochemical smog is harmful, even though ozone in the stratosphere is beneficial.",
    answer: true,
    explanation: "True. Ground-level ozone irritates lungs and damages plants; stratospheric ozone absorbs harmful ultraviolet radiation.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each pollutant with its main source.",
    pairs: [
      ["sulfur dioxide", "burning coal and other sulfur-containing fuels"],
      ["nitrogen monoxide", "high-temperature combustion in engines"],
      ["unburnt hydrocarbons", "incomplete combustion of petrol"],
      ["nitrates in rivers", "leaching of fertilisers from farmland"],
    ],
    explanation: "Each pollutant traced to its origin.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Complete the catalytic cycle by which nitrogen oxides speed up the formation of sulfuric acid.",
    template: "Step 1: NO₂ reacts with SO₂ to form SO₃ and {{blank:a}}. Step 2: NO reacts with oxygen to re-form {{blank:b}}. Step 3: SO₃ reacts with water to form {{blank:c}}. Overall, NO₂ acts as a {{blank:d}} catalyst.",
    blanks: [
      { id: "a", accepted: ["NO"], choices: ["NO", "N2", "NO3"] },
      { id: "b", accepted: ["NO2"], choices: ["NO2", "N2O", "NO3"] },
      { id: "c", accepted: ["H2SO4"], choices: ["H2SO4", "H2SO3", "SO2"] },
      { id: "d", accepted: ["homogeneous"], choices: ["homogeneous", "heterogeneous"] },
    ],
    hints: ["NO₂ and the sulfur oxides are all gases."],
    explanation: "NO₂ is regenerated and in the same phase as the reactants: a homogeneous catalyst.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name one of the metals used as the catalyst in a car's catalytic converter.",
    accepted: ["platinum", "palladium", "rhodium", "Pt", "Pd", "Rh"],
    wrong: ["iron"],
    explanation: "Platinum, palladium and rhodium (platinum group metals) are used, coated thinly on a ceramic honeycomb.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how a catalytic converter removes carbon monoxide and nitrogen monoxide from car exhaust. Include an equation.",
    points: [
      "Gases are adsorbed onto the surface of the Pt/Pd/Rh catalyst (large surface area on a ceramic honeycomb)",
      "Bonds are weakened, they react and the products desorb: 2CO + 2NO → 2CO₂ + N₂",
      "NO is reduced (to N₂) and CO is oxidised (to CO₂), forming harmless gases",
    ],
    modelAnswer: "The exhaust passes over a ceramic honeycomb thinly coated with platinum, palladium and rhodium. CO and NO are adsorbed onto the metal surface, where their bonds are weakened so they react: 2CO + 2NO → 2CO₂ + N₂. The products desorb. NO is reduced to nitrogen and CO is oxidised to carbon dioxide, both much less harmful.",
    hints: ["Adsorption, reaction, desorption."],
    explanation: "Heterogeneous catalysis on platinum group metals.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4, applies: ZIM,
    stem: "Describe how excessive use of nitrate fertilisers can lead to the death of fish in a nearby dam.",
    points: [
      "Nitrates are soluble and are leached / washed by rain into the dam",
      "They act as nutrients, causing rapid growth of algae (algal bloom) that blocks light, so plants below die",
      "Aerobic bacteria decompose the dead algae and plants, multiplying and using up dissolved oxygen",
      "The oxygen concentration falls so low that fish die (eutrophication)",
    ],
    modelAnswer: "Nitrate fertilisers are very soluble, so excess nitrate is washed by rain into rivers and dams. There it acts as a nutrient, causing an algal bloom that blocks light so submerged plants die. When the algae and plants die, aerobic bacteria decompose them, multiply and use up the dissolved oxygen. The water becomes so short of oxygen that fish die. This process is eutrophication.",
    hints: ["Follow the chain from fertiliser to oxygen."],
    explanation: "The stages of eutrophication.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Give two harmful effects of acid rain and write an equation for one of them.",
    points: [
      "Damage to limestone/marble buildings and statues (or corrosion of metals)",
      "Harm to lakes (fish die, aluminium ions released) or to trees (nutrients leached from soil)",
      "Equation, e.g. CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂ (or CaCO₃ + 2H⁺ → Ca²⁺ + H₂O + CO₂)",
    ],
    modelAnswer: "Acid rain dissolves limestone and marble buildings: CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂. It also acidifies lakes, releasing toxic aluminium ions from rocks, so fish die, and it leaches nutrients from soils, damaging trees.",
    hints: ["Think of buildings, lakes and forests."],
    explanation: "Effects on materials and ecosystems.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "Air quality was monitored beside a busy road in Harare on a sunny day. The concentrations of three pollutants were measured (arbitrary units).\n\n| time | 06:00 | 08:00 | 10:00 | 12:00 | 14:00 | 16:00 |\n|---|---|---|---|---|---|---|\n| NO | 12 | 45 | 30 | 14 | 10 | 20 |\n| NO₂ | 8 | 22 | 38 | 30 | 24 | 26 |\n| O₃ | 5 | 7 | 18 | 36 | 40 | 28 |",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Explain why NO rises sharply between 06:00 and 08:00.", points: ["Morning rush-hour traffic: more vehicles", "N₂ and O₂ from the air react at high temperature in the engines to form NO (N₂ + O₂ → 2NO)"], modelAnswer: "Rush-hour traffic increases between 06:00 and 08:00; nitrogen and oxygen from the air combine in the hot engine cylinders to form NO." }),
      P.short({ label: "(b)", marks: 1, stem: "Write the equation for the conversion of NO to NO₂ in air (type, e.g., 2A + B -> 2C).", accepted: ["2NO + O2 -> 2NO2", "2NO + O2 → 2NO2", "2NO(g) + O2(g) -> 2NO2(g)", "NO + 1/2O2 -> NO2", "NO + ½O2 -> NO2"], normalise: ["trim", "collapse_whitespace"], wrong: ["NO + O -> NO2"], explanation: "2NO + O₂ → 2NO₂." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the ozone concentration is highest in the early afternoon.", points: ["Sunlight (UV) is strongest around midday", "UV splits NO₂ into NO + O; the O atoms react with O₂ to form O₃ (and ozone builds up after NO₂ has formed from the morning NO)"], modelAnswer: "Ozone forms when ultraviolet light splits NO₂ (NO₂ → NO + O) and the oxygen atoms combine with O₂. Sunlight is strongest around midday and NO₂ has built up during the morning, so ozone peaks in the early afternoon." }),
      P.mcq({ label: "(d)", stem: "Which other secondary pollutant of photochemical smog would also be expected to rise during the day?", options: [
        ["peroxyacetyl nitrate (PAN)", "Correct: it forms from NOₓ and hydrocarbons in sunlight."],
        ["sulfur trioxide", "SO₃ forms from SO₂, which is not the main traffic pollutant here."],
        ["carbon dioxide", "CO₂ is a primary product of combustion, not part of smog chemistry."],
        ["chlorofluorocarbons from aerosols", "CFCs are not formed by traffic."],
      ], answer: "A", explanation: "PAN forms photochemically from NOₓ and unburnt hydrocarbons." }),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest two ways of reducing these pollutants from vehicles.", points: ["Fit and maintain catalytic converters (convert NO and CO to N₂ and CO₂)", "Reduce traffic or engine emissions: public transport, car sharing, well-tuned engines, cleaner fuels"], modelAnswer: "Make sure vehicles have working catalytic converters, which convert NO and CO to N₂ and CO₂, and reduce the number of vehicles on the road through public transport and car sharing (well-maintained engines also burn fuel more completely)." }),
    ],
    hints: ["Link each peak to traffic or to sunlight."],
    explanation: "NO from morning traffic; NO₂ from oxidation of NO; O₃ (and PAN) peak with strongest sunlight.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: "Sulfur dioxide from burning coal is a major cause of acid rain.",
    parts: (() => {
      const nS = 16.05 / AR.S;
      return [
        P.short({ label: "(a)", marks: 1, stem: "Write the equation for the formation of sulfur dioxide when sulfur in coal burns (type, e.g., A + B -> C).", accepted: ["S + O2 -> SO2", "S + O2 → SO2", "S(s) + O2(g) -> SO2(g)"], normalise: ["trim", "collapse_whitespace"], wrong: ["S + O2 -> SO3"], explanation: "S + O₂ → SO₂." }),
        P.manual({ label: "(b)", marks: 2, stem: "Write equations to show how NO₂ catalyses the oxidation of SO₂ in the atmosphere.", points: ["NO₂ + SO₂ → NO + SO₃", "NO + ½O₂ → NO₂ (NO₂ regenerated)"], modelAnswer: "NO₂ + SO₂ → NO + SO₃; then NO + ½O₂ → NO₂, so NO₂ is regenerated and acts as a catalyst." }),
        P.short({ label: "(c)", marks: 1, stem: "Write the equation for the formation of sulfuric acid from sulfur trioxide (type, e.g., A + B -> C).", accepted: ["SO3 + H2O -> H2SO4", "SO3 + H2O → H2SO4", "SO3(g) + H2O(l) -> H2SO4(aq)"], normalise: ["trim", "collapse_whitespace"], wrong: ["SO2 + H2O -> H2SO4"], explanation: "SO₃ + H₂O → H₂SO₄." }),
        P.num({ label: "(d)", marks: 2, stem: "A sample of coal contains 16.05 g of sulfur. Calculate the maximum amount, in mol, of sulfuric acid that could form from it, to three significant figures. (Ar S 32.1)", value: nS, sf: 3, unit: "mol", wrong: [sfStr(nS * 2, 3)], explanation: `n(S) = 16.05 ÷ 32.1 = ${sfStr(nS, 3)} mol; each S atom ends up in one H₂SO₄, so n(H₂SO₄) = ${sfStr(nS, 3)} mol.` }),
        P.mcq({ label: "(e)", stem: "What is the pH of unpolluted rain, and why?", options: [
          ["about 5.6, because dissolved carbon dioxide forms a weak acid", "Correct: CO₂ + H₂O ⇌ H₂CO₃."],
          ["exactly 7, because pure water is neutral", "Rain dissolves CO₂ from the air, so it is slightly acidic."],
          ["about 9, because rain dissolves alkaline dust from limestone rocks", "Rain is not naturally alkaline."],
          ["about 2, because rain always contains sulfuric acid", "Strongly acidic rain is a sign of pollution."],
        ], answer: "A", explanation: "Carbonic acid makes natural rain about pH 5.6." }),
        P.tf({ label: "(f)", stem: "Nitrogen dioxide also contributes directly to acid rain by forming nitric acid.", answer: true, explanation: "True: 4NO₂ + O₂ + 2H₂O → 4HNO₃." }),
      ];
    })(),
    hints: ["NO₂ is used and then regenerated.", "One S atom gives one H₂SO₄."],
    explanation: "S → SO₂ → SO₃ (NO₂-catalysed) → H₂SO₄; NO₂ also forms HNO₃.",
  });
  b.card("FACT", "Sources of NOₓ", "Natural: lightning, soil bacteria. Man-made: engines, power stations (N₂ + O₂ → 2NO at high temperature).");
  b.card("FORMULA", "Catalytic converter", "2CO + 2NO → 2CO₂ + N₂ on Pt/Pd/Rh; hydrocarbons oxidised to CO₂ + H₂O.");
  b.card("FACT", "Photochemical smog", "NOₓ + unburnt hydrocarbons + sunlight → ozone and PAN (peroxyacetyl nitrate): eye and lung irritants.");
  b.card("FORMULA", "NO₂ catalysing SO₂ oxidation", "NO₂ + SO₂ → NO + SO₃; NO + ½O₂ → NO₂ (regenerated); SO₃ + H₂O → H₂SO₄.");
  b.card("FACT", "Effects of acid rain", "Dissolves limestone (CaCO₃ + 2H⁺ → Ca²⁺ + H₂O + CO₂), harms lakes and fish, damages trees.");
  b.card("CONCEPT", "Eutrophication (ZIMSEC)", "Nitrates leached → algal bloom → decay by bacteria uses O₂ → fish die.", undefined, { applies: ZIM });
  b.card("FACT", "SO₂ as a food preservative (ZIMSEC)", "Kills micro-organisms and acts as an antioxidant (reducing agent); used in dried fruit, juices, wine.", undefined, { applies: ZIM });
  b.card("DEFINITION", "Acid rain", "Rain with pH below about 5.6, made acidic by dissolved SO₂ and NO₂ (sulfuric and nitric acids).");
});
