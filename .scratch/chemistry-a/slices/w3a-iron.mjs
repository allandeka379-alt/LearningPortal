// W3a: achem.transition.iron (ZIMSEC only, Form 6; tagged to ZIMSEC automatically).
import { concept, P, t, chk, ecell, Mr, molesFromSolution, sfStr, dpStr, sciStr } from "../lib.mjs";

const E = { Fe3Fe2: 0.77, CN: 0.36, FeOH: -0.56, O2acid: 1.23, O2alk: 0.40, I2: 0.54, Fe2Fe: -0.44, Zn: -0.76, Sn: -0.14, Mg: -2.38 };
const M_Fe2O3 = chk(Mr("Fe2O3"), 159.6);

concept("achem.transition.iron", { file: "transition/iron", keyPrefix: "transition.iron" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Aqueous sodium hydroxide is added to a freshly made solution of iron(II) sulfate. What is seen?",
    options: [
      ["a green precipitate, turning brown at the surface", "Correct: Fe(OH)₂ is green and is oxidised by air to brown Fe(OH)₃."],
      ["a red-brown precipitate that does not change", "Red-brown Fe(OH)₃ forms directly from iron(III) ions."],
      ["a blue precipitate that dissolves in excess", "Blue Cu(OH)₂ comes from copper(II); it does not dissolve in excess NaOH."],
      ["a white precipitate that dissolves in excess", "White amphoteric hydroxides come from Zn²⁺, Al³⁺ or Pb²⁺."],
    ],
    answer: "A",
    explanation: "Fe²⁺ + 2OH⁻ → Fe(OH)₂ (green); air oxidises it to Fe(OH)₃ (brown).",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which reagent gives a deep red colour with iron(III) ions but not with iron(II) ions?",
    options: [
      ["potassium thiocyanate", "Correct: [Fe(SCN)(H₂O)₅]²⁺ is deep red."],
      ["potassium hexacyanoferrate(III)", "This gives a dark blue precipitate with Fe²⁺, not a red colour with Fe³⁺."],
      ["aqueous ammonia", "Ammonia gives hydroxide precipitates with both ions."],
      ["acidified potassium manganate(VII)", "This is decolorised by Fe²⁺; Fe³⁺ has no effect on it."],
    ],
    answer: "A",
    explanation: "Thiocyanate is the sensitive test for Fe³⁺ (deep red); hexacyanoferrate(III) gives a dark blue precipitate with Fe²⁺.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In the blast furnace, what is the main reducing agent for iron(III) oxide?",
    options: [
      ["carbon monoxide", "Correct: Fe₂O₃ + 3CO → 2Fe + 3CO₂."],
      ["calcium oxide", "CaO removes silica as slag; it does not reduce the ore."],
      ["carbon dioxide", "CO₂ is the product of the reduction, not the reducing agent."],
      ["hydrogen from the hot air", "Hot air supplies oxygen to burn the coke; it contains no hydrogen gas."],
    ],
    answer: "A",
    explanation: "Coke burns to CO₂, which is reduced by more coke to CO; CO reduces Fe₂O₃ to iron.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does limestone have to be added to the blast furnace?",
    options: [
      ["to remove silica as calcium silicate slag", "Correct: CaCO₃ → CaO + CO₂; CaO + SiO₂ → CaSiO₃."],
      ["to reduce the iron(III) oxide to iron", "Carbon monoxide is the reducing agent."],
      ["to provide the oxygen that burns the coke", "The oxygen comes from the hot air blast."],
      ["to lower the melting point of the iron", "Slag formation removes impurities; it does not alter the iron's melting point."],
    ],
    answer: "A",
    hints: ["Silica is an acidic oxide; what kind of oxide does limestone produce?"],
    explanation: "Limestone decomposes to basic CaO, which reacts with acidic SiO₂ to form molten slag.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about haemoglobin are correct?\n\n1. Oxygen is bonded to an iron(II) ion by a dative bond.\n2. Carbon monoxide binds to the same site more strongly than oxygen.\n3. The iron is oxidised to iron(III) whenever oxygen is released.",
    options: [
      ["1 and 2 only", "Correct: O₂ binds reversibly to Fe²⁺, which stays +2."],
      ["1, 2 and 3", "Statement 3 is false: the iron remains +2 while it carries oxygen."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: that is why CO is poisonous."],
    ],
    answer: "A",
    hints: ["Oxygen is a ligand here, not an oxidising agent that changes the iron's state."],
    explanation: "Fe²⁺ in haem binds O₂ as a ligand reversibly; CO binds more strongly and blocks oxygen transport.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Data (E⦵ / V): Zn²⁺/Zn −0.76; Fe²⁺/Fe −0.44; Sn²⁺/Sn −0.14. A galvanised roofing sheet and a tin-plated can are both scratched through to the iron. What happens?",
    options: [
      ["The zinc corrodes on the sheet; the iron in the can rusts quickly.", "Correct: zinc is more reactive than iron, tin is less."],
      ["The iron rusts quickly in both because the coating is broken.", "Zinc still protects iron sacrificially when scratched."],
      ["The tin corrodes on the can; the iron in the sheet rusts quickly.", "Tin (−0.14 V) is less reactive than iron, so iron becomes the anode."],
      ["Neither rusts, because both coatings are more reactive than iron.", "Tin is less reactive than iron (less negative E⦵)."],
    ],
    answer: "A",
    hints: ["Which metal has the more negative E⦵ in each pair?"],
    explanation: "Zinc (−0.76 V) is oxidised in preference to iron; with tin (−0.14 V), iron (−0.44 V) is oxidised and rusts faster than bare iron.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Data (E⦵ / V): Fe³⁺ + e⁻ ⇌ Fe²⁺ +0.77; [Fe(CN)₆]³⁻ + e⁻ ⇌ [Fe(CN)₆]⁴⁻ +0.36; I₂ + 2e⁻ ⇌ 2I⁻ +0.54. Which statements are correct?\n\n1. Fe³⁺(aq) oxidises iodide ions.\n2. [Fe(CN)₆]³⁻ oxidises iodide ions.\n3. Cyanide ligands make iron(III) relatively more stable than in the aqua ion.",
    options: [
      ["1 and 3 only", "Correct: 0.77 − 0.54 = +0.23 V; 0.36 − 0.54 = −0.18 V."],
      ["1, 2 and 3", "Statement 2 is false: E⦵cell = −0.18 V."],
      ["1 and 2 only", "Statement 2 is false and statement 3 is true."],
      ["3 only", "Statement 1 is also true: E⦵cell = +0.23 V."],
    ],
    answer: "A",
    hints: ["Work out E⦵cell for each iron(III) species with iodide."],
    explanation: "A lower E⦵ for the cyanide couple means [Fe(CN)₆]³⁻ is a weaker oxidising agent: iron(III) is stabilised by cyanide.",
  });
  b.mcq({
    d: 4, skill: "UNDERSTANDING",
    stem: "Why does green iron(II) hydroxide turn brown in air within minutes, whereas acidified iron(II) sulfate solution keeps for days?",
    options: [
      ["Oxidation by oxygen has a larger E⦵cell in alkaline conditions.", "Correct: +0.96 V in alkali against +0.46 V in acid."],
      ["Iron(II) hydroxide absorbs carbon dioxide and forms brown carbonate.", "The brown solid is iron(III) hydroxide, formed by oxidation."],
      ["Acid oxidises iron(II) to iron(III), so the change happens earlier.", "Acid slows the oxidation; H⁺ is not the oxidant here."],
      ["Iron(II) hydroxide decomposes on heating by the surrounding air.", "Nothing is heated; the change is oxidation by O₂."],
    ],
    answer: "A",
    hints: ["Compare Fe(OH)₃/Fe(OH)₂ (−0.56 V) with O₂/OH⁻ (+0.40 V), and Fe³⁺/Fe²⁺ (+0.77 V) with O₂/H₂O (+1.23 V)."],
    explanation: "E⦵cell in alkali = 0.40 − (−0.56) = +0.96 V; in acid = 1.23 − 0.77 = +0.46 V. Iron(II) is much more easily oxidised in alkali.",
  });
  {
    const e = ecell(E.O2alk, E.Fe2Fe);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: "Data (E⦵ / V): Fe²⁺ + 2e⁻ ⇌ Fe −0.44; O₂ + 2H₂O + 4e⁻ ⇌ 4OH⁻ +0.40. Calculate E⦵cell, in V, for the rusting cell, to two decimal places.",
      value: e, dp: 2, unit: "V",
      wrong: [dpStr(-e, 2), dpStr(E.O2alk + E.Fe2Fe, 2)],
      explanation: `1. Oxygen is reduced; iron is oxidised.\n2. E⦵cell = 0.40 − (−0.44) = +${dpStr(e, 2)} V. Subtracting the other way gives ${dpStr(-e, 2)} V; adding gives ${dpStr(E.O2alk + E.Fe2Fe, 2)} V.`,
    });
  }
  {
    const e = ecell(E.O2acid, E.Fe3Fe2);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Data (E⦵ / V): Fe³⁺ + e⁻ ⇌ Fe²⁺ +0.77; O₂ + 4H⁺ + 4e⁻ ⇌ 2H₂O +1.23. Calculate E⦵cell, in V, for the oxidation of Fe²⁺(aq) by oxygen in acid solution, to two decimal places.",
      value: e, dp: 2, unit: "V",
      wrong: [dpStr(-e, 2)],
      hints: ["The oxygen couple is the reduction."],
      explanation: `1. O₂ is reduced and Fe²⁺ oxidised.\n2. E⦵cell = 1.23 − 0.77 = +${dpStr(e, 2)} V, so air slowly oxidises iron(II): 4Fe²⁺ + O₂ + 4H⁺ → 4Fe³⁺ + 2H₂O. The reverse subtraction gives ${dpStr(-e, 2)} V.`,
    });
  }
  {
    const kg = (1500 * 111.6) / M_Fe2O3;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "A haematite ore contains 75.0% Fe₂O₃ by mass. Calculate the maximum mass of iron, in kg, obtainable from 2.00 tonnes (2000 kg) of the ore, to three significant figures. (Ar: Fe 55.8, O 16.0)",
      value: kg, sf: 3, unit: "kg",
      wrong: [sfStr((2000 * 111.6) / M_Fe2O3, 3), sfStr((1500 * 55.8) / M_Fe2O3, 3)],
      hints: ["Each Fe₂O₃ contains two iron atoms."],
      explanation: `1. Mass of Fe₂O₃ = 0.750 × 2000 = 1500 kg.\n2. Mr(Fe₂O₃) = 2(55.8) + 3(16.0) = ${dpStr(M_Fe2O3, 1)}.\n3. Mass of Fe = 1500 × 111.6 ÷ ${dpStr(M_Fe2O3, 1)} = ${sfStr(kg, 3)} kg. Ignoring the 75.0% gives ${sfStr((2000 * 111.6) / M_Fe2O3, 3)} kg; using one Fe per formula gives ${sfStr((1500 * 55.8) / M_Fe2O3, 3)} kg.`,
    });
  }
  {
    const n = molesFromSolution(18.4, 0.01);
    const perTablet = (5 * n * 10) / 5;
    const mg = perTablet * 55.8 * 1000;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "Rudo dissolved five iron tablets (containing iron(II) sulfate) in dilute sulfuric acid and made the solution up to 250 cm³. 25.0 cm³ portions needed a mean titre of 18.40 cm³ of 0.0100 mol dm⁻³ potassium manganate(VII): MnO₄⁻ + 8H⁺ + 5Fe²⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O. Calculate the mass of iron in one tablet, in mg, to three significant figures. (Ar: Fe 55.8)",
      value: mg, sf: 3, unit: "mg",
      wrong: [sfStr(mg * 5, 3), sfStr(mg / 10, 3), sfStr(mg / 5, 3)],
      hints: ["Scale from 25.0 cm³ to 250 cm³, then share between five tablets."],
      explanation: `1. n(MnO₄⁻) = 18.40 ÷ 1000 × 0.0100 = ${sciStr(n, 3)} mol.\n2. n(Fe²⁺) in 25.0 cm³ = 5 × ${sciStr(n, 3)} = ${sciStr(5 * n, 3)} mol; in 250 cm³ = ${sciStr(50 * n, 3)} mol.\n3. Per tablet = ${sciStr(50 * n, 3)} ÷ 5 = ${sciStr(perTablet, 3)} mol; mass = ${sciStr(perTablet, 3)} × 55.8 = ${sfStr(mg / 1000, 3)} g = ${sfStr(mg, 3)} mg. Forgetting to divide by five tablets gives ${sfStr(mg * 5, 3)} mg; forgetting the ×10 scale-up gives ${sfStr(mg / 10, 3)} mg; ignoring the 1 : 5 ratio gives ${sfStr(mg / 5, 3)} mg.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Iron rusts in dry air as long as oxygen is present.",
    answer: false,
    explanation: "False. Rusting needs both oxygen and water; water is the electrolyte in which the ions move.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each method of rust prevention with the way it works.",
    pairs: [
      ["painting a bridge", "a barrier that keeps out water and oxygen"],
      ["magnesium blocks on a pipeline", "a more reactive metal is oxidised instead"],
      ["galvanising a roofing sheet", "a zinc barrier that is also sacrificial when scratched"],
      ["adding chromium to make stainless steel", "a protective oxide layer forms on the alloy"],
    ],
    extraRight: ["the iron is made more reactive"],
    explanation: "Barrier, sacrificial, galvanising (barrier + sacrificial) and alloying.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Complete the description of rusting under a drop of salty water.",
    template: "At the centre of the drop, where oxygen is scarce, iron is {{blank:a}} to Fe²⁺ ions. Electrons travel through the metal to the edge of the drop, where {{blank:b}} is reduced to hydroxide ions. Fe²⁺ and OH⁻ form iron(II) hydroxide, which is then oxidised to hydrated {{blank:c}}. Salt speeds rusting because it makes the water a better {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["oxidised"], choices: ["oxidised", "reduced", "hydrated", "neutralised"] },
      { id: "b", accepted: ["oxygen"], choices: ["oxygen", "water", "iron(II)", "chloride"] },
      { id: "c", accepted: ["iron(III) oxide"], choices: ["iron(II) oxide", "iron(III) oxide", "iron(II) chloride", "iron carbonate"] },
      { id: "d", accepted: ["electrolyte"], choices: ["electrolyte", "catalyst", "insulator", "oxidising agent"] },
    ],
    hints: ["The anode is where oxidation happens."],
    explanation: "Fe → Fe²⁺ + 2e⁻ (anode); O₂ + 2H₂O + 4e⁻ → 4OH⁻ (cathode); rust is Fe₂O₃·xH₂O.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the iron ore with the formula Fe₂O₃.",
    accepted: ["haematite", "hematite"],
    wrong: ["magnetite"],
    explanation: "Haematite is Fe₂O₃; magnetite is Fe₃O₄.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how haemoglobin carries oxygen and why carbon monoxide is poisonous.",
    points: [
      "Haem contains Fe²⁺ bonded to four N atoms of a porphyrin ring and to the protein; O₂ bonds to the sixth position as a ligand (dative bond)",
      "The binding is reversible: O₂ binds in the lungs (high oxygen) and is released in respiring tissues (low oxygen)",
      "CO binds to the same site much more strongly and is released very slowly, so less haemoglobin is available to carry oxygen",
    ],
    modelAnswer: "Each haem group holds an iron(II) ion by four nitrogen atoms of a porphyrin ring and a fifth bond to the protein. An oxygen molecule bonds reversibly to the sixth position as a ligand: it is picked up in the lungs, where oxygen is plentiful, and released in respiring tissues. Carbon monoxide is a better ligand that binds to the same site far more strongly and is released very slowly, so it blocks oxygen transport.",
    hints: ["Treat O₂ and CO as competing ligands."],
    explanation: "Ligand competition at Fe²⁺ in haem.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Outline, with equations, the reactions in a blast furnace that produce iron and remove the main impurity.",
    points: [
      t`Coke burns and the CO₂ formed is reduced: $\ce{C + O2 -> CO2}$ and $\ce{CO2 + C -> 2CO}$`,
      t`Reduction of the ore: $\ce{Fe2O3 + 3CO -> 2Fe + 3CO2}$`,
      t`Limestone decomposes: $\ce{CaCO3 -> CaO + CO2}$`,
      t`Slag forms: $\ce{CaO + SiO2 -> CaSiO3}$, and the molten slag floats on the iron`,
    ],
    modelAnswer: "Coke burns in the hot air blast, C + O₂ → CO₂, heating the furnace; the CO₂ is reduced by more coke, CO₂ + C → 2CO. Carbon monoxide reduces the ore, Fe₂O₃ + 3CO → 2Fe + 3CO₂. Limestone decomposes, CaCO₃ → CaO + CO₂, and the basic calcium oxide reacts with acidic silica, CaO + SiO₂ → CaSiO₃, forming molten slag that floats on the molten iron and is tapped off separately.",
    hints: ["Four or five equations are expected."],
    explanation: "Reduction by CO; slag removes silica.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how you would show that a pale green solution contains iron(II) ions and no iron(III) ions.",
    points: [
      "Add potassium hexacyanoferrate(III) (or NaOH(aq)): a dark blue precipitate (or green precipitate turning brown) shows Fe²⁺",
      "Add potassium thiocyanate to a fresh portion",
      "No deep red colour shows that Fe³⁺ is absent",
    ],
    modelAnswer: "To one portion add aqueous potassium hexacyanoferrate(III): a dark blue precipitate shows Fe²⁺ (aqueous NaOH would give a green precipitate that browns in air). To a second portion add aqueous potassium thiocyanate: the absence of a deep red colour shows that no Fe³⁺ is present.",
    hints: ["You need one positive test and one negative test."],
    explanation: "Hexacyanoferrate(III) for Fe²⁺; thiocyanate for Fe³⁺.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    stem: "Sipho tested two solutions, **P** and **Q**, each containing one iron ion.\n\n| test | **P** | **Q** |\n|---|---|---|\n| 1: aqueous sodium hydroxide | red-brown precipitate | green precipitate, turning brown at the top |\n| 2: aqueous potassium thiocyanate | deep red solution | very slight pink colour |\n| 3: acidified potassium manganate(VII), a few drops | purple colour remains | purple colour disappears |",
    parts: [
      P.short({ label: "(a)", stem: "Give the formula of the iron ion in **P**. (Type it as, for example, Cu2+.)", accepted: ["Fe3+", "Fe^3+", "Fe³⁺", "Fe(3+)"], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["Fe2+"], explanation: "Red-brown hydroxide and deep red thiocyanate: Fe³⁺." }),
      P.short({ label: "(b)", stem: "Give the formula of the precipitate formed by **Q** in test 1.", accepted: ["Fe(OH)2", "Fe(OH)₂"], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["Fe(OH)3"], explanation: "Iron(II) hydroxide." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain the change at the top of the precipitate from **Q** and the slight pink colour in test 2.", points: ["Air oxidises Fe(OH)₂ to brown Fe(OH)₃ at the surface, where oxygen is available", "A little Fe²⁺ in **Q** has been oxidised to Fe³⁺ by air, which gives a faint red colour with thiocyanate (the test is very sensitive)"], modelAnswer: "Oxygen in the air oxidises green iron(II) hydroxide to brown iron(III) hydroxide at the surface. The slight pink colour shows that a small amount of iron(II) in the solution has already been oxidised by air to iron(III), which thiocyanate detects even at low concentration." }),
      P.mcq({ label: "(d)", stem: "What happens to iron in **Q** in test 3?", options: [
        ["Fe²⁺ is oxidised to Fe³⁺.", "Correct: MnO₄⁻ is reduced to almost colourless Mn²⁺."],
        ["Fe²⁺ is reduced to iron metal.", "Manganate(VII) is an oxidising agent, not a reducing agent."],
        ["Fe³⁺ is reduced to Fe²⁺.", "**Q** contains Fe²⁺, which is the species oxidised."],
        ["Fe²⁺ forms a complex with MnO₄⁻.", "The decolorisation shows a redox reaction."],
      ], answer: "A", explanation: "MnO₄⁻ + 8H⁺ + 5Fe²⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O." }),
      P.tf({ label: "(e)", stem: "Iron(III) ions in **P** cannot decolorise acidified manganate(VII) because iron(III) cannot be oxidised further by it.", answer: true, explanation: "True: +3 is the highest common state; Fe³⁺ is not a reducing agent." }),
      P.mcq({ label: "(f)", stem: "Which reagent would give a dark blue precipitate with **Q**?", options: [
        ["potassium hexacyanoferrate(III)", "Correct: Fe²⁺ + hexacyanoferrate(III) gives a dark blue precipitate."],
        ["potassium hexacyanoferrate(II)", "This gives a dark blue precipitate with Fe³⁺, not Fe²⁺."],
        ["aqueous silver nitrate", "This tests for halide ions."],
        ["aqueous barium chloride", "This tests for sulfate ions."],
      ], answer: "A", explanation: "Fe²⁺ with [Fe(CN)₆]³⁻; Fe³⁺ with [Fe(CN)₆]⁴⁻." }),
      P.num({ label: "(g)", stem: "How many moles of Fe²⁺ react with one mole of MnO₄⁻ in test 3?", value: 5, wrong: [1], explanation: "Mn +7 → +2 gains 5 electrons; each Fe²⁺ loses 1: ratio 1 : 5." }),
    ],
    hints: ["Compare the colours of the two hydroxides."],
    explanation: "P contains Fe³⁺; Q contains Fe²⁺ with a trace of Fe³⁺ formed by air oxidation.",
  });
  {
    const e1 = ecell(E.Zn, E.Fe2Fe);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: "Farai set up three iron nails in test-tubes of aerated salt water for one week.\n\n| tube | nail | appearance after one week |\n|---|---|---|\n| A | bare iron nail | rust on the nail; orange-brown sediment |\n| B | iron nail wrapped tightly with a strip of zinc | no rust on the nail; the zinc is pitted; white solid in the water |\n| C | iron nail wrapped tightly with a strip of tin | heavy rusting of the nail; the tin unchanged |\n\nData (E⦵ / V): Zn²⁺/Zn −0.76; Fe²⁺/Fe −0.44; Sn²⁺/Sn −0.14; O₂ + 2H₂O + 4e⁻ ⇌ 4OH⁻ +0.40.",
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Give the half-equations for the reactions at the anodic and cathodic areas of the nail in tube A.", points: [t`Anode: $\ce{Fe -> Fe^2+ + 2e-}$`, t`Cathode: $\ce{O2 + 2H2O + 4e- -> 4OH-}$`], modelAnswer: "Anodic areas: Fe → Fe²⁺ + 2e⁻. Cathodic areas: O₂ + 2H₂O + 4e⁻ → 4OH⁻." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the potential difference, in V, between zinc and iron in tube B under standard conditions, to two decimal places.", value: Math.abs(e1), dp: 2, unit: "V", explanation: `−0.44 − (−0.76) = ${dpStr(Math.abs(e1), 2)} V; zinc is the negative electrode (anode).` }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain the observations in tubes B and C.", points: ["B: zinc has the more negative E⦵, so zinc is oxidised (sacrificial protection) and the iron is the cathode; the white solid is a zinc compound (zinc hydroxide)", "C: tin has a less negative E⦵ than iron, so iron is the anode and is oxidised faster than on its own"], modelAnswer: "In B zinc (−0.76 V) is more easily oxidised than iron (−0.44 V); zinc becomes the anode and corrodes, forming white zinc hydroxide, while the iron is protected as the cathode. In C tin (−0.14 V) is less reactive than iron, so iron becomes the anode of the cell and corrodes faster than the bare nail." }),
        P.short({ label: "(d)", stem: "Name the process used to coat roofing sheets with zinc.", accepted: ["galvanising", "galvanizing", "galvanisation", "galvanization", "hot-dip galvanising"], wrong: ["tin plating"], explanation: "Galvanising." }),
        P.mcq({ label: "(e)", stem: "Which metal would also protect the iron nail sacrificially?", options: [
          ["magnesium (E⦵ −2.38 V)", "Correct: more negative than iron."],
          ["copper (E⦵ +0.34 V)", "Copper is less reactive; iron would rust faster."],
          ["lead (E⦵ −0.13 V)", "Lead is less reactive than iron."],
          ["silver (E⦵ +0.80 V)", "Silver is far less reactive than iron."],
        ], answer: "A", explanation: "Only metals with E⦵ more negative than −0.44 V protect iron sacrificially." }),
        P.manual({ label: "(f)", marks: 2, stem: "Suggest why food cans are tin-plated rather than galvanised, even though tin does not protect a scratched can.", points: ["Zinc compounds could dissolve in acidic foods and contaminate them (zinc reacts with the acids in food); tin is unreactive and non-toxic", "While unbroken, tin is an effective barrier to water and oxygen"], modelAnswer: "Zinc is reactive and would dissolve in acidic foods such as tomatoes or fruit juice, contaminating the food. Tin is much less reactive and non-toxic, and while the coating is unbroken it is a good barrier against water and oxygen." }),
        P.tf({ label: "(g)", stem: "The orange-brown sediment in tube A is mainly hydrated iron(III) oxide.", answer: true, explanation: "True: rust is Fe₂O₃·xH₂O." }),
      P.short({ label: "(h)", stem: "Name the type of corrosion protection shown in tube B.", accepted: ["sacrificial protection", "sacrificial", "sacrificial anode", "sacrificial anode protection", "cathodic protection"], wrong: ["barrier protection"], explanation: "Sacrificial protection: zinc corrodes instead of iron." }),
      ],
      hints: ["The metal with the more negative E⦵ is oxidised.", "Rusting needs both water and oxygen."],
      explanation: "Zinc protects iron sacrificially; tin, being less reactive, speeds rusting where the iron is exposed.",
    });
  }
  b.card("FACT", "Tests for Fe²⁺", "NaOH(aq): green precipitate, browns in air; hexacyanoferrate(III): dark blue precipitate; decolorises acidified KMnO₄.");
  b.card("FACT", "Tests for Fe³⁺", "NaOH(aq): red-brown precipitate; thiocyanate: deep red solution; hexacyanoferrate(II): dark blue precipitate.");
  b.card("FORMULA", "Blast furnace reduction", "CO₂ + C → 2CO; Fe₂O₃ + 3CO → 2Fe + 3CO₂; CaO + SiO₂ → CaSiO₃ (slag).");
  b.card("FORMULA", "Rusting half-equations", "Anode: Fe → Fe²⁺ + 2e⁻; cathode: O₂ + 2H₂O + 4e⁻ → 4OH⁻; rust = Fe₂O₃·xH₂O.");
  b.card("CONCEPT", "Effect of pH on Fe(II) stability", "Air oxidises Fe(II) far more easily in alkali (E⦵cell +0.96 V) than in acid (+0.46 V).");
  b.card("CONCEPT", "Effect of cyanide on Fe(III)/Fe(II)", "E⦵ falls from +0.77 V (aqua) to +0.36 V (cyanide): iron(III) is stabilised; [Fe(CN)₆]³⁻ is a weaker oxidant.");
  b.card("FACT", "Haemoglobin", "Fe²⁺ in haem (4 N of porphyrin + protein) binds O₂ reversibly; CO binds far more strongly (poisoning).");
  b.card("FACT", "Cytochromes", "Haem proteins in the electron-transport chain; iron cycles Fe²⁺ ⇌ Fe³⁺ + e⁻ to pass electrons.");
  b.card("DEFINITION", "Sacrificial protection", "Iron joined to a more reactive metal (Zn, Mg; more negative E⦵), which is oxidised instead of the iron.");
});
