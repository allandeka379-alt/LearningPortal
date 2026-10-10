// W4a: achem.amines.phenylamine-azo (both boards; ZIMSEC Form 6, Cambridge A Level only)
import { concept, P, t, Mr, moles, percentYield, VM_RTP, sfStr } from "../lib.mjs";

concept("achem.amines.phenylamine-azo", { file: "amines/phenylamine-azo", keyPrefix: "amines.phenylamine-azo" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which reagents reduce nitrobenzene to phenylamine?",
    options: [
      ["tin and concentrated hydrochloric acid, heat under reflux", "Correct: followed by NaOH(aq) to free the amine."],
      ["sodium nitrite and dilute hydrochloric acid, below 10 °C", "These diazotise phenylamine."],
      ["concentrated nitric and sulfuric acids, 50 °C", "These nitrate benzene."],
      ["NaBH₄ in water, warm", "NaBH₄ reduces C=O compounds, not nitro groups."],
    ],
    answer: "A",
    explanation: "C₆H₅NO₂ + 6[H] → C₆H₅NH₂ + 2H₂O.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is diazotisation of phenylamine carried out below 10 °C?",
    options: [
      ["The diazonium salt decomposes at higher temperatures, giving phenol and nitrogen.", "Correct: it is unstable when warm."],
      ["Phenylamine boils at about 10 °C and would evaporate from a warm mixture.", "Phenylamine boils at about 184 °C."],
      ["The reaction is endothermic, so cooling moves the equilibrium to the right.", "The reason is the instability of the product, not the enthalpy change."],
      ["Sodium nitrite is insoluble in warm water, so it would not react at all.", "Sodium nitrite is very soluble; solubility is not the reason."],
    ],
    answer: "A",
    explanation: "Above about 10 °C: C₆H₅N₂⁺ + H₂O → C₆H₅OH + N₂ + H⁺.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "What is observed when bromine water is added to phenylamine?",
    options: [
      ["The bromine is decolorised and a white precipitate forms.", "Correct: 2,4,6-tribromophenylamine."],
      ["No change unless iron(III) bromide is added.", "The –NH₂ group activates the ring; no catalyst is needed."],
      ["A yellow-orange precipitate forms immediately.", "That describes azo coupling."],
      ["Bubbles of nitrogen are given off.", "Nitrogen is released when a diazonium salt is warmed."],
    ],
    answer: "A",
    explanation: "C₆H₅NH₂ + 3Br₂ → C₆H₂Br₃NH₂ + 3HBr.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which conditions are used to couple benzenediazonium chloride with phenol?",
    options: [
      ["phenol in NaOH(aq), below 10 °C", "Correct: phenoxide is the reactive species; cold keeps the diazonium ion intact."],
      ["phenol in concentrated H₂SO₄, 50 °C", "Warming would decompose the diazonium salt."],
      ["phenol and a FeBr₃ catalyst, room temperature", "No halogen carrier is needed; the diazonium ion is the electrophile."],
      ["phenol in dilute HCl, heated under reflux", "Heating decomposes the diazonium salt."],
    ],
    answer: "A",
    explanation: "Cold alkaline conditions give the azo dye.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why are azo compounds such as 4-hydroxyazobenzene coloured?",
    options: [
      ["Delocalisation over both rings and –N=N– lowers ΔE, so visible light is absorbed.", "Correct: absorption moves into the visible region."],
      ["They contain transition-metal ions whose partly filled d orbitals are split.", "Azo dyes contain no metal; that explains colour in complexes."],
      ["The –N=N– bond emits visible light as each dye molecule is being formed.", "Colour comes from absorption, not emission."],
      ["They absorb only ultraviolet light, which the eye then sees as a bright colour.", "UV absorption alone would give a colourless compound."],
    ],
    answer: "A",
    hints: ["Compare with benzene, which absorbs only in the ultraviolet."],
    explanation: "Larger delocalised system → smaller ΔE → visible absorption; complementary colour seen.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of the statements about benzenediazonium chloride are correct?\n\n1. It is made from phenylamine, NaNO₂ and dilute HCl.\n2. Warming its solution gives phenol and nitrogen.\n3. It is usually isolated as a dry solid before use.",
    options: [
      ["1 and 2 only", "Correct: dry diazonium salts can explode, so they are used in cold solution."],
      ["1, 2 and 3", "Statement 3 is false and dangerous."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true."],
    ],
    answer: "A",
    hints: ["How stable is the solid salt?"],
    explanation: "Diazonium salts are made and used in cold solution.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of the steps are needed to make phenylamine from benzene?\n\n1. nitration with concentrated HNO₃ and H₂SO₄\n2. reduction with Sn and concentrated HCl\n3. adding NaOH(aq) after the reduction",
    options: [
      ["1, 2 and 3", "Correct: nitrate, reduce, then free the amine from its salt."],
      ["1 and 2 only", "Without NaOH the product stays as the phenylammonium salt."],
      ["2 and 3 only", "Benzene must first be nitrated."],
      ["1 only", "Statements 2 and 3 are also needed: reduce, then free the amine."],
    ],
    answer: "A",
    hints: ["What form is the amine in after reduction in acid?"],
    explanation: "C₆H₆ → C₆H₅NO₂ → C₆H₅NH₃⁺ → C₆H₅NH₂.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "4-methylphenylamine, CH₃C₆H₄NH₂, is diazotised and the product is coupled with phenol in alkali. What is the formula of the azo product?",
    options: [
      ["CH₃C₆H₄N=NC₆H₄OH", "Correct: the diazonium ion keeps its methyl group and joins the 4-position of phenol."],
      ["CH₃C₆H₄NHNHC₆H₄OH", "The azo link is –N=N–, not –NH–NH–."],
      ["CH₃C₆H₄OC₆H₄N=N", "Coupling forms a C–N=N–C link; no ether forms."],
      ["CH₃C₆H₄N=NC₆H₅OH", "The phenol ring loses one H when it is substituted: C₆H₄OH."],
    ],
    answer: "A",
    hints: ["The –N=N– bridge joins the carbon of each ring."],
    explanation: "CH₃C₆H₄N₂⁺ + C₆H₅OH → CH₃C₆H₄N=NC₆H₄OH + H⁺.",
  });
  {
    const n = moles(18.45, Mr("C6H5NO2"));
    const th = n * Mr("C6H5NH2");
    const y = percentYield(9.21, th);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Sipho reduces 18.45 g of nitrobenzene, C₆H₅NO₂, with tin and concentrated HCl and obtains 9.21 g of pure phenylamine, C₆H₅NH₂. Calculate the percentage yield, to three significant figures. Ar: H 1, C 12, N 14, O 16.",
      value: y, sf: 3, unit: "%",
      wrong: [percentYield(9.21, 18.45)],
      hints: ["Mr(C₆H₅NO₂) = 123; Mr(C₆H₅NH₂) = 93."],
      explanation: `1. n(nitrobenzene) = 18.45 ÷ 123 = ${sfStr(n, 3)} mol.\n2. Maximum phenylamine = ${sfStr(n, 3)} × 93 = ${sfStr(th, 3)} g.\n3. Yield = 9.21 ÷ ${sfStr(th, 3)} × 100 = ${sfStr(y, 3)}%.\n4. Dividing the masses directly gives ${sfStr(percentYield(9.21, 18.45), 3)}%, which ignores the change in Mr.`,
    });
  }
  {
    const n = moles(2.79, Mr("C6H5NH2"));
    const v = n * VM_RTP * 1000;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true, daily: true,
      stem: "2.79 g of phenylamine (Mr 93) is diazotised and the solution is then warmed until no more gas is evolved. What volume of nitrogen, in cm³ at room conditions, is produced? (One mole of gas occupies 24.0 dm³.)",
      value: v, sf: 3, unit: "cm³",
      wrong: [2 * v],
      hints: ["One N₂ molecule per diazonium ion."],
      explanation: `n = 2.79 ÷ 93 = ${sfStr(n, 3)} mol; C₆H₅N₂⁺ → C₆H₅OH + N₂ (1 : 1); V = ${sfStr(n, 3)} × 24 000 = ${sfStr(v, 3)} cm³. Doubling it counts each N atom as a molecule.`,
    });
  }
  {
    const nB = moles(15.6, Mr("C6H6"));
    const yields = [0.85, 0.7, 0.9];
    const overall = yields.reduce((p, x) => p * x, 1);
    const mDye = nB * overall * Mr("C12H10N2O");
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "A dye, C₆H₅N=NC₆H₄OH (C₁₂H₁₀N₂O), is made from benzene in three stages: benzene → phenylamine (85.0% yield), phenylamine → benzenediazonium chloride (70.0% yield, used at once), coupling with excess phenol (90.0% yield). Calculate the mass of dye from 15.6 g of benzene, in g, to three significant figures. Mr: benzene 78, dye 198.",
      value: mDye, sf: 3, unit: "g",
      wrong: [nB * Mr("C12H10N2O")],
      hints: ["Multiply the three fractional yields."],
      explanation: `1. n(benzene) = 15.6 ÷ 78 = ${sfStr(nB, 3)} mol.\n2. Overall yield = 0.850 × 0.700 × 0.900 = ${sfStr(overall, 3)}.\n3. n(dye) = ${sfStr(nB, 3)} × ${sfStr(overall, 3)} = ${sfStr(nB * overall, 3)} mol; Mr(C₁₂H₁₀N₂O) = 198.\n4. Mass = ${sfStr(nB * overall, 3)} × 198 = ${sfStr(mDye, 3)} g. Ignoring the yields gives ${sfStr(nB * Mr("C12H10N2O"), 3)} g.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "After reducing nitrobenzene with tin and hydrochloric acid, sodium hydroxide is added to release phenylamine from its salt.",
    answer: true,
    explanation: "True: C₆H₅NH₃⁺ + OH⁻ → C₆H₅NH₂ + H₂O.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "In the coupling reaction the diazonium ion acts as a nucleophile.",
    answer: false,
    hints: ["Does the diazonium ion accept or donate an electron pair?"],
    explanation: "False: the positively charged diazonium ion is a weak electrophile that substitutes into the electron-rich phenoxide ring.",
  });
  b.match({
    d: 3, skill: "RECALL",
    stem: "Match each step of the route from benzene to an azo dye with its reagents and conditions.",
    pairs: [
      ["benzene → nitrobenzene", "conc. HNO₃ and conc. H₂SO₄, 25-60 °C"],
      ["nitrobenzene → phenylamine", "Sn and conc. HCl, reflux; then NaOH(aq)"],
      ["phenylamine → benzenediazonium chloride", "NaNO₂ and dilute HCl, below 10 °C"],
      ["benzenediazonium chloride → azo dye", "phenol in NaOH(aq), below 10 °C"],
      ["benzenediazonium chloride → phenol", "warm the aqueous solution"],
    ],
    hints: ["Nitrate, reduce, diazotise, couple."],
    explanation: "The standard dye route and the hydrolysis of the diazonium salt.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements about diazonium salts.",
    template: "Nitrous acid is made in the reaction mixture from sodium {{blank:a}} and dilute hydrochloric acid. The diazonium ion contains a {{blank:b}} bond between two nitrogen atoms. Warming the solution releases {{blank:c}} gas.",
    blanks: [
      { id: "a", accepted: ["nitrite"], choices: ["nitrite", "nitrate", "nitride"] },
      { id: "b", accepted: ["triple"], choices: ["triple", "double", "single"] },
      { id: "c", accepted: ["nitrogen"], choices: ["nitrogen", "hydrogen", "ammonia"] },
    ],
    explanation: "NaNO₂ + HCl → HNO₂; –N⁺≡N; N₂ evolved on warming.",
  });
  b.short({
    d: 3, skill: "APPLICATION",
    stem: "Give the name of the white precipitate formed when phenylamine reacts with bromine water.",
    accepted: ["2,4,6-tribromophenylamine", "2 4 6-tribromophenylamine", "tribromophenylamine", "2,4,6-tribromoaniline", "2,4,6 tribromophenylamine"],
    wrong: ["bromophenylamine"],
    hints: ["Three bromine atoms enter the activated ring."],
    explanation: "C₆H₂Br₃NH₂.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe how benzenediazonium chloride is prepared from phenylamine and then converted into an azo dye with phenol. Give conditions and equations.",
    points: ["Dissolve phenylamine in dilute HCl and cool below 10 °C (ice bath); add cold NaNO₂(aq) slowly", "C₆H₅NH₂ + HNO₂ + HCl → C₆H₅N₂⁺Cl⁻ + 2H₂O", "Add the cold diazonium solution to phenol dissolved in NaOH(aq), below 10 °C", "C₆H₅N₂⁺ + C₆H₅OH → C₆H₅N=NC₆H₄OH + H⁺; yellow-orange precipitate"],
    modelAnswer: "Dissolve phenylamine in dilute hydrochloric acid, cool to 0-5 °C and add cold sodium nitrite solution slowly, keeping below 10 °C: C₆H₅NH₂ + HNO₂ + HCl → C₆H₅N₂⁺Cl⁻ + 2H₂O. Add this cold solution to phenol dissolved in sodium hydroxide, also cooled: C₆H₅N₂⁺ + C₆H₅OH → C₆H₅N=NC₆H₄OH + H⁺. A yellow-orange precipitate of the azo dye forms.",
    hints: ["Two steps, both cold."],
    explanation: "Diazotisation and coupling.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why phenylamine reacts with bromine water at room temperature without a catalyst, whereas benzene does not.",
    points: ["The lone pair on N is partly delocalised into the benzene ring", "increasing the electron density of the ring (especially at 2, 4 and 6)", "so the ring polarises Br₂ and attracts the electrophile strongly enough to react without a halogen carrier"],
    modelAnswer: "The nitrogen lone pair in phenylamine overlaps with the delocalised π system of the ring, increasing the ring's electron density, particularly at positions 2, 4 and 6. The electron-rich ring polarises bromine molecules and reacts with them directly, so no FeBr₃ catalyst is needed and trisubstitution occurs.",
    hints: ["Compare with phenol."],
    explanation: "Activation by the –NH₂ lone pair.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 2,
    stem: "Suggest the structure of the azo dye formed when benzenediazonium chloride couples with 2-naphthol in alkali, and the colour you would expect.",
    points: ["C₆H₅–N=N– attached to the naphthol ring (next to the –OH group, at C1), i.e. C₆H₅N=NC₁₀H₆OH", "An orange-red (intensely coloured) precipitate"],
    modelAnswer: "The phenylazo group, C₆H₅N=N–, joins the naphthalene ring next to the –OH group, giving C₆H₅N=NC₁₀H₆OH, an orange-red precipitate.",
    hints: ["Naphthol behaves like phenol."],
    explanation: "Coupling with a naphthol gives an orange-red dye.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "A synthesis of a dye from benzene:\n\n| Step | Reagent and conditions | Product |\n|---|---|---|\n| 1 | conc. HNO₃ and conc. H₂SO₄, 50 °C | R |\n| 2 | reagent S, heat under reflux; then NaOH(aq) | phenylamine |\n| 3 | NaNO₂ and dilute HCl, temperature T | benzenediazonium chloride |\n| 4 | phenol in NaOH(aq), cold | dye U |",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name R.", accepted: ["nitrobenzene"], wrong: ["phenylamine"], explanation: "C₆H₅NO₂." }),
      P.short({ label: "(b)", marks: 1, stem: "Identify reagent S.", accepted: ["tin and concentrated hydrochloric acid", "Sn and HCl", "Sn and conc HCl", "tin and HCl", "tin and concentrated HCl", "Sn/HCl"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["NaBH4"], explanation: "Sn + concentrated HCl." }),
      P.mcq({ label: "(c)", marks: 1, stem: "What is a suitable temperature T?", options: [
        ["0-5 °C", "Correct: below 10 °C to prevent decomposition."],
        ["about 25 °C", "At room temperature the diazonium salt decomposes."],
        ["about 60 °C", "Warming gives phenol and nitrogen."],
        ["about 100 °C", "Boiling destroys the diazonium salt at once."],
      ], answer: "A", explanation: "Keep below 10 °C." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain what would happen if the temperature in step 3 rose above 10 °C, and write an equation.", points: ["The diazonium salt decomposes/is hydrolysed, giving phenol and nitrogen gas (fizzing)", "C₆H₅N₂⁺Cl⁻ + H₂O → C₆H₅OH + N₂ + HCl"], modelAnswer: "The benzenediazonium chloride would decompose with effervescence: C₆H₅N₂⁺Cl⁻ + H₂O → C₆H₅OH + N₂ + HCl." }),
      P.short({ label: "(e)", marks: 1, stem: "Give the structural formula of U (for example C6H5N=NC6H5).", accepted: ["C6H5N=NC6H4OH", "C₆H₅N=NC₆H₄OH", "C6H5-N=N-C6H4OH", "C6H5N=NC6H4-OH"], normalise: ["trim", "collapse_whitespace"], wrong: ["C6H5N=NC6H5OH"], explanation: "4-hydroxyazobenzene." }),
      P.manual({ label: "(f)", marks: 2, stem: "Explain why U is coloured but phenylamine is not.", points: ["In U the delocalised π system extends over both rings through the –N=N– group", "so the energy gap is smaller and U absorbs visible light (the colour seen is complementary); phenylamine absorbs only UV"], modelAnswer: "In the azo dye the π electrons are delocalised across both rings and the –N=N– link, which lowers the energy gap between levels so that visible light is absorbed; phenylamine's smaller delocalised system absorbs only ultraviolet." }),
    ],
    hints: ["Nitrate, reduce, diazotise, couple."],
    explanation: "R nitrobenzene; S Sn/conc. HCl; T below 10 °C; U C₆H₅N=NC₆H₄OH; colour from extended delocalisation.",
  });

  {
    const m = 0.02 * 0.72 * 262;
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: "A dye is made from 4-methylphenylamine, CH₃C₆H₄NH₂, and 2-naphthol. The amine is first converted into a diazonium salt, which is then coupled with 2-naphthol. The dye has the formula C₁₇H₁₄N₂O (Mr 262).",
      parts: [
        P.manual({ label: "(a)", marks: 1, stem: "Give the reagents and temperature for making the diazonium salt.", points: ["NaNO₂ and dilute HCl, below 10 °C"], modelAnswer: "Sodium nitrite and dilute hydrochloric acid, kept below 10 °C." }),
        P.short({ label: "(b)", marks: 1, stem: "Give the formula of the diazonium ion formed (for example C6H5N2+).", accepted: ["CH3C6H4N2+", "CH₃C₆H₄N₂⁺", "CH3C6H4N≡N+", "CH3C6H4N2⁺"], normalise: ["trim", "collapse_whitespace"], wrong: ["CH3C6H4NH3+"], explanation: "CH₃C₆H₄N₂⁺." }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain why the 2-naphthol is dissolved in sodium hydroxide before coupling.", points: ["NaOH converts 2-naphthol into the naphthoxide ion", "which is more electron-rich (more strongly activated), so the weakly electrophilic diazonium ion couples with it readily"], modelAnswer: "The alkali turns 2-naphthol into its anion, whose ring is much more electron-rich, so the weak diazonium electrophile attacks it easily." }),
        P.num({ label: "(d)", marks: 2, stem: "Starting from 0.0200 mol of 4-methylphenylamine, the overall yield of dye is 72.0%. Calculate the mass of dye, in g.", value: m, sf: 3, unit: "g", wrong: [0.02 * 262], explanation: `0.0200 × 0.720 × 262 = ${sfStr(m, 3)} g.` }),
      ],
      hints: ["The methyl group stays on the ring throughout."],
      explanation: `NaNO₂/HCl below 10 °C; CH₃C₆H₄N₂⁺; alkali gives the reactive naphthoxide; ${sfStr(m, 3)} g of dye.`,
    });
  }
  b.card("FACT", "Making phenylamine from nitrobenzene", "Sn + concentrated HCl, heat under reflux; then NaOH(aq) to free the amine.");
  b.card("FORMULA", "Reduction of nitrobenzene", "C₆H₅NO₂ + 6[H] → C₆H₅NH₂ + 2H₂O");
  b.card("FACT", "Phenylamine with bromine water", "White precipitate of 2,4,6-tribromophenylamine; bromine decolorised; no catalyst.");
  b.card("FACT", "Diazotisation conditions", "NaNO₂ + dilute HCl (nitrous acid), below 10 °C.");
  b.card("CONCEPT", "Why diazotisation is kept below 10 °C", "The diazonium ion decomposes on warming, giving phenol and N₂.");
  b.card("FORMULA", "Diazotisation of phenylamine", "C₆H₅NH₂ + HNO₂ + HCl → C₆H₅N₂⁺Cl⁻ + 2H₂O");
  b.card("FACT", "Coupling with phenol", "Diazonium salt + phenol in NaOH(aq), cold → yellow-orange 4-hydroxyazobenzene.");
  b.card("CONCEPT", "Why azo compounds are coloured", "Extended delocalisation across both rings and –N=N– lowers ΔE; visible light is absorbed.");
  b.card("FACT", "Safety with diazonium salts", "Never isolate them dry (explosive); use at once in cold solution. Phenylamine is toxic through the skin.");
});
