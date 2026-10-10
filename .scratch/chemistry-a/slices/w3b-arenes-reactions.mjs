// W3b: achem.hydrocarbons.arenes-reactions (both boards; ZIMSEC Form 6, Cambridge A Level only)
import { concept, P, t, Mr, moles, percentYield, sfStr, dpStr } from "../lib.mjs";

concept("achem.hydrocarbons.arenes-reactions", { file: "hydrocarbons/arenes-reactions", keyPrefix: "hydrocarbons.arenes-reactions" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which reagents are used to nitrate benzene?",
    options: [
      ["concentrated nitric acid and concentrated sulfuric acid", "Correct: the nitrating mixture, kept at 25-60 °C."],
      ["dilute nitric acid and dilute sulfuric acid", "Dilute acids do not generate enough NO₂⁺."],
      ["sodium nitrate solution and hydrochloric acid", "This mixture (with nitrite) is used for diazotisation, not nitration."],
      ["concentrated nitric acid with an aluminium chloride catalyst", "AlCl₃ is the catalyst for halogenation and Friedel-Crafts reactions."],
    ],
    answer: "A",
    explanation: "Concentrated HNO₃ and H₂SO₄ form the nitronium ion, NO₂⁺.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which substance is used as a catalyst when benzene reacts with bromine to form bromobenzene?",
    options: [
      [t`$\ce{FeBr3}$`, "Correct: a halogen carrier (AlBr₃ or iron filings also work)."],
      [t`$\ce{Ni}$`, "Nickel catalyses hydrogenation."],
      [t`$\ce{H2SO4}$`, "Concentrated sulfuric acid is used in nitration."],
      [t`$\ce{H3PO4}$`, "Phosphoric acid catalyses hydration of alkenes."],
    ],
    answer: "A",
    explanation: "Br₂ + FeBr₃ (or AlBr₃), room temperature, dry.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Methylbenzene is boiled with chlorine in ultraviolet light, without a catalyst. What is the first organic product?",
    options: [
      [t`$\ce{C6H5CH2Cl}$`, "Correct: free-radical substitution in the side chain."],
      ["2-chloromethylbenzene", "Ring substitution needs a halogen carrier such as AlCl₃."],
      ["4-chloromethylbenzene", "Ring substitution needs a halogen carrier such as AlCl₃."],
      [t`$\ce{C6H11CH3}$`, "Chlorine does not hydrogenate the ring."],
    ],
    answer: "A",
    explanation: "UV light → radicals → substitution of a side-chain H: (chloromethyl)benzene.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Ethylbenzene is heated under reflux with alkaline potassium manganate(VII), and the mixture is then acidified. What organic product is obtained?",
    options: [
      ["benzoic acid", "Correct: the whole side chain is oxidised to –COOH."],
      ["phenylethanoic acid", "The side chain is cut back to one carbon attached to the ring."],
      ["phenylethanone", "Oxidation continues past the ketone stage to the acid."],
      ["phenol", "The ring carbon keeps a carbon substituent; no OH is introduced."],
    ],
    answer: "A",
    explanation: "Any alkyl side chain with an H on the carbon next to the ring is oxidised to COOH.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Benzoic acid is warmed with a mixture of concentrated nitric and sulfuric acids. What is the main organic product?",
    options: [
      ["3-nitrobenzoic acid", "Correct: –COOH is 3-directing."],
      ["2-nitrobenzoic acid", "2-substitution is favoured by electron-donating groups."],
      ["4-nitrobenzoic acid", "4-substitution is favoured by electron-donating groups."],
      ["nitrobenzene", "The COOH group stays on the ring."],
    ],
    answer: "A",
    hints: ["Is –COOH electron-donating or electron-withdrawing?"],
    explanation: "Electron-withdrawing –COOH directs to position 3.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: t`Benzene reacts with propanoyl chloride, $\ce{CH3CH2COCl}$, in the presence of aluminium chloride. What is the organic product?`,
    options: [
      [t`$\ce{C6H5COCH2CH3}$`, "Correct: Friedel-Crafts acylation adds the acyl group CH₃CH₂CO–."],
      [t`$\ce{C6H5CH2CH2CH3}$`, "This would be alkylation with a halogenoalkane, not acylation."],
      [t`$\ce{C6H5Cl}$`, "The acyl chloride supplies the acyl group, not chlorine, to the ring."],
      [t`$\ce{C6H5COOCH2CH3}$`, "An ester would need an alcohol and a carboxylic acid."],
    ],
    answer: "A",
    hints: ["Which part of the acyl chloride joins the ring?"],
    explanation: "C₆H₆ + CH₃CH₂COCl → C₆H₅COCH₂CH₃ + HCl.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of the statements about the nitration of methylbenzene are correct?\n\n1. It occurs at a lower temperature than the nitration of benzene.\n2. The main products are 2-nitromethylbenzene and 4-nitromethylbenzene.\n3. The main product is 3-nitromethylbenzene.",
    options: [
      ["1 and 2 only", "Correct: the methyl group activates the ring and directs to 2 and 4."],
      ["1, 2 and 3", "Statements 2 and 3 contradict each other; methyl is 2,4-directing."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is true."],
      ["1 only", "Statement 2 is also true."],
    ],
    answer: "A",
    hints: ["Is –CH₃ electron-donating?"],
    explanation: "Electron-donating CH₃ makes the ring more reactive and directs to 2 and 4.",
  });
  b.mcq({
    d: 4, skill: "UNDERSTANDING",
    stem: "Which of the statements about the reaction of benzene with hydrogen are correct?\n\n1. It needs a catalyst such as nickel or platinum and heat.\n2. The product is cyclohexane.\n3. It is an addition reaction.",
    options: [
      ["1, 2 and 3", "Correct: all three statements are true."],
      ["1 and 2 only", "Statement 3 is also true: 3H₂ add to the ring."],
      ["2 and 3 only", "Statement 1 is also true."],
      ["1 only", "Statements 2 and 3 are also true."],
    ],
    answer: "A",
    hints: ["Does the ring survive?"],
    explanation: "C₆H₆ + 3H₂ → C₆H₁₂, an addition that destroys the delocalisation.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which route converts methylbenzene into 4-nitrobenzoic acid?",
    options: [
      ["nitrate the ring first, separate the 4-isomer, then oxidise the methyl group", "Correct: –CH₃ directs to 4; oxidation then turns it into –COOH."],
      ["oxidise the methyl group first, then nitrate the ring", "–COOH directs to 3, giving 3-nitrobenzoic acid."],
      ["nitrate with dilute nitric acid, then reduce with tin and hydrochloric acid", "Reduction would give an amine, not an acid."],
      ["chlorinate the side chain in UV light, then nitrate the ring", "This gives no carboxylic acid group."],
    ],
    answer: "A",
    hints: ["Which group is on the ring when the nitro group goes in?"],
    explanation: "Order of steps controls the position: nitrate while the 2,4-directing CH₃ is present.",
  });
  {
    const n = moles(4.6, Mr("C7H8"));
    const th = n * Mr("C7H6O2");
    const y = percentYield(4.27, th);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "4.60 g of methylbenzene, C₆H₅CH₃, was oxidised and gave 4.27 g of pure benzoic acid, C₆H₅COOH. Calculate the percentage yield, to one decimal place. Ar: H 1.0, C 12.0, O 16.0.",
      value: y, dp: 1, unit: "%",
      wrong: [(4.27 / 4.6) * 100],
      hints: ["Find the theoretical mass of benzoic acid first."],
      explanation: `1. 1 mol C₇H₈ → 1 mol C₇H₆O₂.\n2. n(C₇H₈) = 4.60 ÷ 92.0 = ${sfStr(n, 3)} mol.\n3. Theoretical mass = ${sfStr(n, 3)} × 122.0 = ${sfStr(th, 3)} g.\n4. Yield = 4.27 ÷ ${sfStr(th, 3)} × 100 = ${dpStr(y, 1)}%. Dividing the masses directly (4.27 ÷ 4.60) gives ${dpStr((4.27 / 4.6) * 100, 1)}%, which ignores the different Mr values.`,
    });
  }
  {
    const n = moles(3.12, Mr("C6H6"));
    const m = n * Mr("C6H5Br");
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Calculate the maximum mass of bromobenzene, in g, that can be made from 3.12 g of benzene. Ar: H 1.0, C 12.0, Br 79.9.",
      value: m, sf: 3, unit: "g",
      wrong: [n * Mr("C6H4Br2")],
      hints: ["The mole ratio is 1 : 1."],
      explanation: `1. C₆H₆ + Br₂ → C₆H₅Br + HBr.\n2. n(C₆H₆) = 3.12 ÷ 78.0 = ${sfStr(n, 3)} mol.\n3. Mr(C₆H₅Br) = ${Mr("C6H5Br").toFixed(1)}; mass = ${sfStr(n, 3)} × ${Mr("C6H5Br").toFixed(1)} = ${sfStr(m, 3)} g.\n4. Using the formula of a dibromobenzene gives ${sfStr(n * Mr("C6H4Br2"), 3)} g.`,
    });
  }
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "How many moles of hydrogen gas are needed to convert one mole of benzene completely into cyclohexane?",
    value: 3,
    wrong: [1],
    explanation: "C₆H₆ + 3H₂ → C₆H₁₂.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Water must be excluded when aluminium chloride is used as a catalyst in Friedel-Crafts reactions.",
    answer: true,
    explanation: "True: AlCl₃ reacts with water (hydrolyses) and is destroyed.",
  });
  b.tf({
    d: 2, skill: "APPLICATION",
    stem: "Methylbenzene reacting with chlorine in ultraviolet light (no catalyst) gives mainly 4-chloromethylbenzene.",
    answer: false,
    explanation: "False: UV light substitutes the side chain, giving C₆H₅CH₂Cl; ring substitution needs AlCl₃.",
  });
  b.match({
    d: 3, skill: "RECALL",
    stem: "Match each set of reagents and conditions with the product formed from benzene.",
    pairs: [
      ["Cl₂, AlCl₃, room temperature", "chlorobenzene"],
      ["concentrated HNO₃ and H₂SO₄, 50 °C", "nitrobenzene"],
      ["CH₃Cl, AlCl₃, reflux", "methylbenzene"],
      ["CH₃COCl, AlCl₃, reflux", "phenylethanone"],
      ["H₂, Ni, heat and pressure", "cyclohexane"],
    ],
    hints: ["Which group does each reagent introduce?"],
    explanation: "Halogenation, nitration, alkylation, acylation and hydrogenation.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statement about directing effects.",
    template: "Groups such as –OH, –NH₂ and –CH₃ direct an incoming group to positions {{blank:a}}. Groups such as –NO₂ and –COOH direct to position {{blank:b}} and make the ring {{blank:c}} reactive.",
    blanks: [
      { id: "a", accepted: ["2 and 4"], choices: ["2 and 4", "3 only", "3 and 5"] },
      { id: "b", accepted: ["3"], choices: ["3", "2", "4"] },
      { id: "c", accepted: ["less"], choices: ["less", "more"] },
    ],
    explanation: "Electron donors: 2,4 and activating; electron withdrawers: 3 and deactivating.",
  });
  b.short({
    d: 2, skill: "APPLICATION",
    stem: "Name the organic product formed when benzene reacts with ethanoyl chloride, CH₃COCl, in the presence of aluminium chloride.",
    accepted: ["phenylethanone", "acetophenone", "1-phenylethanone", "methyl phenyl ketone"],
    wrong: ["ethylbenzene"],
    explanation: "Friedel-Crafts acylation: C₆H₅COCH₃.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why methylbenzene is nitrated more readily (at a lower temperature) than benzene.",
    points: ["The methyl group is electron-donating (positive inductive effect)", "It increases the electron density of the delocalised π system of the ring", "So the ring attracts the electrophile NO₂⁺ more strongly and reacts faster"],
    modelAnswer: "The CH₃ group pushes electron density into the ring, making the delocalised π electrons more available. The more electron-rich ring attracts the electrophile, NO₂⁺, more strongly, so the substitution is faster and can be done at about 30 °C.",
    hints: ["Electron density and electrophiles."],
    explanation: "Activating group → faster electrophilic substitution.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest a two-step synthesis of 3-chlorobenzoic acid from methylbenzene, giving reagents and conditions for each step and explaining the order.",
    points: ["Step 1: hot alkaline KMnO₄ under reflux, then acidify, giving benzoic acid", "Step 2: Cl₂ with AlCl₃ (or FeCl₃/Fe) as halogen carrier, room temperature, dry", "–COOH is 3-directing, so chlorine enters position 3", "Chlorinating first would give 2-/4-isomers because –CH₃ is 2,4-directing"],
    modelAnswer: "First oxidise methylbenzene to benzoic acid by heating under reflux with alkaline potassium manganate(VII) and then acidifying. Then chlorinate with chlorine and aluminium chloride (dry, room temperature). The –COOH group directs the chlorine to position 3. If the ring were chlorinated first, the methyl group would direct chlorine to positions 2 and 4.",
    hints: ["Which group must be on the ring when Cl goes in?"],
    explanation: "Oxidise first, then chlorinate.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "Ethylbenzene and propylbenzene are both oxidised to benzoic acid by hot alkaline potassium manganate(VII), but (1,1-dimethylethyl)benzene, C₆H₅C(CH₃)₃, is not oxidised. Suggest an explanation.",
    points: ["Side-chain oxidation needs at least one hydrogen atom on the carbon attached to the ring", "In ethylbenzene and propylbenzene this carbon (CH₂) has hydrogens, so the whole chain is oxidised down to –COOH (benzoic acid)", "In C₆H₅C(CH₃)₃ the carbon attached to the ring has no hydrogen atoms, so the oxidation cannot start"],
    modelAnswer: "Oxidation of an alkyl side chain starts at the carbon joined to the ring and requires a C–H bond there. Ethylbenzene and propylbenzene both have a CH₂ group attached to the ring, so the chain is oxidised and cut back to –COOH, giving benzoic acid in each case. In (1,1-dimethylethyl)benzene the attached carbon carries three methyl groups and no hydrogen, so it is not oxidised.",
    hints: ["Look at the carbon atom joined to the ring."],
    explanation: "A benzylic C–H is needed.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    stem: "Some reactions of methylbenzene:\n\n| Reaction | Reagents and conditions | Organic product |\n|---|---|---|\n| 1 | Br₂, FeBr₃, room temperature, dark | J (two isomers) |\n| 2 | Br₂, ultraviolet light, boiling | K |\n| 3 | hot alkaline KMnO₄, reflux; then dilute H₂SO₄ | L |\n| 4 | H₂, Pt, heat | M |",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Name the two isomers formed in reaction 1.", points: ["2-bromomethylbenzene", "4-bromomethylbenzene"], modelAnswer: "2-bromomethylbenzene and 4-bromomethylbenzene." }),
      P.short({ label: "(b)", marks: 1, stem: "Give the structural formula of K (for example C6H5CH3).", accepted: ["C6H5CH2Br", "C₆H₅CH₂Br", "BrCH2C6H5"], normalise: ["trim", "collapse_whitespace"], wrong: ["C6H4BrCH3"], explanation: "(Bromomethyl)benzene, from side-chain substitution." }),
      P.mcq({ label: "(c)", marks: 1, stem: "What type of reaction is reaction 2?", options: [
        ["free-radical substitution", "Correct: UV light, side chain."],
        ["electrophilic substitution", "That is reaction 1, with a halogen carrier."],
        ["electrophilic addition", "Nothing adds to a double bond."],
        ["nucleophilic substitution", "No nucleophile is involved."],
      ], answer: "A", explanation: "Br• radicals abstract a side-chain H." }),
      P.short({ label: "(d)", marks: 1, stem: "Name L.", accepted: ["benzoic acid", "benzenecarboxylic acid"], wrong: ["phenol"], explanation: "Side-chain oxidation." }),
      P.short({ label: "(e)", marks: 1, stem: "Name M.", accepted: ["methylcyclohexane"], wrong: ["cyclohexane"], explanation: "C₆H₁₁CH₃." }),
      P.manual({ label: "(f)", marks: 2, stem: "Describe what you would see during reaction 3 and when the acid is added.", points: ["Purple manganate(VII) decolorises and a brown/black precipitate (MnO₂) forms", "On acidifying (after filtering), a white solid (benzoic acid) precipitates"], modelAnswer: "The purple colour fades and a brown precipitate of manganese(IV) oxide forms. After filtering, adding dilute sulfuric acid precipitates white crystals of benzoic acid." }),
    ],
    hints: ["Halogen carrier → ring; UV → side chain."],
    explanation: "J: 2- and 4-bromomethylbenzene; K: C₆H₅CH₂Br; L: benzoic acid; M: methylcyclohexane.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: "Benzene is converted into nitrobenzene in the laboratory. The reaction is exothermic and is carried out in a fume cupboard.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State the reagents and the temperature range used.", points: ["Concentrated nitric acid and concentrated sulfuric acid", "25-60 °C (keep below about 55 °C, e.g. with a cold-water bath)"], modelAnswer: "A mixture of concentrated nitric acid and concentrated sulfuric acid, with the temperature kept between about 25 and 55 °C." }),
      P.manual({ label: "(b)", marks: 1, stem: "Suggest why the temperature must be controlled.", points: ["Above about 60 °C further nitration occurs, giving 1,3-dinitrobenzene (and the reaction may run away)"], modelAnswer: "At higher temperatures a second nitro group is substituted, forming 1,3-dinitrobenzene." }),
      P.short({ label: "(c)", marks: 1, stem: "Name the position (number) taken by a second nitro group on nitrobenzene.", accepted: ["3", "position 3", "3-position", "meta"], wrong: ["4"], explanation: "–NO₂ is 3-directing: 1,3-dinitrobenzene." }),
      P.tf({ label: "(d)", marks: 1, stem: "Nitration is a substitution reaction.", answer: true, explanation: "An H on the ring is replaced by NO₂." }),
      P.manual({ label: "(e)", marks: 1, stem: "State one safety precaution, other than using a fume cupboard.", points: ["Wear gloves and eye protection (concentrated acids are corrosive; benzene is carcinogenic), or add acid slowly with cooling"], modelAnswer: "Wear gloves and goggles because the concentrated acids are corrosive and benzene is toxic and carcinogenic." }),
    ],
    hints: ["What happens if it gets too hot?"],
    explanation: "Nitrating mixture at 25-60 °C; higher temperatures give 1,3-dinitrobenzene.",
  });

  b.card("FACT", "Bromination of benzene", "Br₂ with FeBr₃ or AlBr₃ (or Fe) as halogen carrier, room temperature, dry → bromobenzene + HBr.");
  b.card("FACT", "Nitration of benzene", "Concentrated HNO₃ + concentrated H₂SO₄, 25-60 °C → nitrobenzene + H₂O.");
  b.card("FACT", "Friedel-Crafts alkylation", "Halogenoalkane (e.g. CH₃Cl) + AlCl₃, reflux, dry → alkylbenzene + HCl.");
  b.card("FACT", "Friedel-Crafts acylation", "Acyl chloride (e.g. CH₃COCl) + AlCl₃, reflux, dry → aryl ketone (phenylethanone) + HCl.");
  b.card("FACT", "Side-chain oxidation", "Hot alkaline KMnO₄ under reflux, then acid: any alkyl side chain → –COOH (benzoic acid).");
  b.card("CONCEPT", "Ring or side chain?", "Halogen carrier, dark → ring (2- and 4-); UV light → side chain (free radical).");
  b.card("CONCEPT", "2,4-directing groups", "–OH, –NH₂, alkyl: electron-donating, activate the ring.");
  b.card("CONCEPT", "3-directing groups", "–NO₂, –COOH, –COR: electron-withdrawing, deactivate the ring.");
  b.card("FACT", "Hydrogenation of benzene", "H₂, Pt or Ni, heat (and pressure) → cyclohexane; harder than for alkenes.");
});
