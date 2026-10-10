// W4a: achem.carboxylic.esters (both boards; ZIMSEC Form 6, Cambridge AS Level) ★ free preview lesson
import { concept, P, t, ZIM, Mr, moles, kEq, percentYield, sfStr, chk } from "../lib.mjs";

concept("achem.carboxylic.esters", { file: "carboxylic/esters", keyPrefix: "carboxylic.esters" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the name of the ester CH₃CH₂COOCH₃?",
    options: [
      ["methyl propanoate", "Correct: propanoic acid part (with C=O), methyl from methanol."],
      ["propyl methanoate", "That would be HCOOCH₂CH₂CH₃; the C=O is on the three-carbon side here."],
      ["ethyl ethanoate", "Ethyl ethanoate is CH₃COOCH₂CH₃."],
      ["methyl ethanoate", "Methyl ethanoate is CH₃COOCH₃, with a two-carbon acid part."],
    ],
    answer: "A",
    explanation: "The acid part contains the C=O carbon: CH₃CH₂CO– is propanoate.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "What is the role of concentrated sulfuric acid when ethanoic acid and ethanol are heated together to make ethyl ethanoate?",
    options: [
      ["It is a catalyst.", "Correct: it speeds up the slow reaction (and absorbs some water)."],
      ["It oxidises the ethanol to ethanoic acid.", "Concentrated H₂SO₄ is not used as an oxidant here."],
      ["It neutralises the ethanoic acid.", "It is an acid itself; it cannot neutralise another acid."],
      ["It dehydrates the ethanol to ethene.", "That needs a much higher temperature; here it catalyses esterification."],
    ],
    answer: "A",
    explanation: "Esterification is acid-catalysed.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which pair of compounds reacts to form propyl ethanoate?",
    options: [
      ["ethanoic acid and propan-1-ol", "Correct: -yl from the alcohol, -oate from the acid."],
      ["propanoic acid and ethanol", "These give ethyl propanoate."],
      ["propanoic acid and propan-1-ol", "These give propyl propanoate."],
      ["ethanoic acid and ethanol", "These give ethyl ethanoate."],
    ],
    answer: "A",
    explanation: "CH₃COOH + CH₃CH₂CH₂OH ⇌ CH₃COOCH₂CH₂CH₃ + H₂O.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "What are the products when methyl butanoate is heated under reflux with aqueous sodium hydroxide?",
    options: [
      ["sodium butanoate and methanol", "Correct: alkaline hydrolysis gives the salt and the alcohol."],
      ["butanoic acid and methanol", "Free acid forms only after acidification."],
      ["sodium methanoate and butan-1-ol", "The acid part is butanoate; the alcohol part is methyl."],
      ["butan-1-ol and methanoic acid", "This reverses the roles of the two parts of the ester."],
    ],
    answer: "A",
    explanation: "CH₃CH₂CH₂COOCH₃ + NaOH → CH₃CH₂CH₂COONa + CH₃OH.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does the alkaline hydrolysis of an ester go to completion but acid hydrolysis does not?",
    options: [
      ["The acid produced is converted to its carboxylate ion, which cannot react with the alcohol.", "Correct: the reverse reaction is removed."],
      ["Hydroxide ions are a far better catalyst for the reaction than hydrogen ions.", "OH⁻ is used up as a reactant, not acting as a catalyst."],
      ["Water is removed by the sodium hydroxide, so the equilibrium moves to the right.", "NaOH(aq) is a solution in water; water is not removed."],
      ["Esters are insoluble in acids but dissolve completely in alkalis, so all of them react.", "Solubility does not explain why the reaction is irreversible."],
    ],
    answer: "A",
    hints: ["What happens to the carboxylic acid in alkali?"],
    explanation: "RCOOH + OH⁻ → RCOO⁻ + H₂O; RCOO⁻ does not esterify.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of the statements about the fat glyceryl tristearate are correct?\n\n1. It is an ester of propane-1,2,3-triol.\n2. Boiling it with NaOH(aq) gives soap.\n3. One mole reacts with three moles of NaOH.",
    options: [
      ["1, 2 and 3", "Correct: a triester; saponification uses 3 mol NaOH."],
      ["1 and 2 only", "Statement 3 is also true: there are three ester links."],
      ["2 and 3 only", "Statement 1 is also true."],
      ["1 only", "Statements 2 and 3 are also true."],
    ],
    answer: "A",
    hints: ["How many ester groups does a triglyceride have?"],
    explanation: "(C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of the changes would increase the equilibrium yield of ethyl ethanoate from ethanoic acid and ethanol?\n\n1. using an excess of ethanol\n2. removing the ester by distillation as it forms\n3. adding more concentrated sulfuric acid as a catalyst only",
    options: [
      ["1 and 2 only", "Correct: a catalyst alone does not change the equilibrium position."],
      ["1, 2 and 3", "A catalyst speeds up both directions equally, so it does not change the yield by catalysis."],
      ["2 and 3 only", "Statement 1 is also effective; statement 3 is not."],
      ["1 only", "Removing a product also moves the position to the right."],
    ],
    answer: "A",
    hints: ["Apply Le Chatelier's principle; what does a catalyst change?"],
    explanation: "Excess reactant or removing product shifts the equilibrium; a catalyst only speeds attainment.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which compound is an isomer of ethyl ethanoate but is not an ester?",
    options: [
      ["butanoic acid", "Correct: C₄H₈O₂, a carboxylic acid."],
      ["methyl propanoate", "C₄H₈O₂ but it is also an ester."],
      ["propyl methanoate", "C₄H₈O₂ but it is also an ester."],
      ["ethyl propanoate", "C₅H₁₀O₂: it is not an isomer."],
    ],
    answer: "A",
    hints: ["Write the molecular formula of ethyl ethanoate first."],
    explanation: "CH₃COOC₂H₅ is C₄H₈O₂; CH₃CH₂CH₂COOH has the same formula.",
  });
  {
    const a = 0.385, start = 1.2;
    const used = start - a;
    // acid 1.20, ethanol 1.20 initially; acid remaining a
    const K = kEq([[1, used], [1, used]], [[1, a], [1, a]]);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "1.20 mol of ethanoic acid and 1.20 mol of ethanol are allowed to reach equilibrium with a little acid catalyst. At equilibrium 0.385 mol of ethanoic acid remains. Calculate Kc to three significant figures.",
      value: K, sf: 3,
      wrong: [used / a],
      hints: ["The ratio of each change is 1 : 1 : 1 : 1; the volume cancels."],
      explanation: `1. Acid used = 1.20 − 0.385 = ${sfStr(used, 3)} mol, so ester = water = ${sfStr(used, 3)} mol and ethanol = 0.385 mol.\n2. Kc = (${sfStr(used, 3)} × ${sfStr(used, 3)}) ÷ (0.385 × 0.385) = ${sfStr(K, 3)}.\n3. Leaving out the water term gives ${sfStr(used / a, 3)}.`,
    });
  }
  {
    const K = 4.0;
    const x = Math.sqrt(K) / (1 + Math.sqrt(K)) * 0.6; // equal amounts 0.600 mol each
    chk(x, 0.4, 1e-9, "ester amount");
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "For CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O, Kc = 4.0 at the temperature used. 0.600 mol of ethanoic acid and 0.600 mol of ethanol are mixed. Calculate the amount of ester, in mol, at equilibrium. (Hint: with equal starting amounts, take the square root of both sides.)",
      value: x, sf: 3, unit: "mol",
      wrong: [0.3],
      hints: ["x² ÷ (0.600 − x)² = 4.0, so x ÷ (0.600 − x) = 2.0."],
      explanation: `Let x = mol ester. x²/(0.600 − x)² = 4.0, so x/(0.600 − x) = 2.0; x = 1.20 − 2.0x; 3.0x = 1.20; x = ${sfStr(x, 3)} mol (two-thirds converted). Assuming half reacts (0.300 mol) ignores Kc.`,
    });
  }
  {
    const mFat = 22.1;
    const n = moles(mFat, Mr("C57H104O6"));
    const mNaOH = 3 * n * 40.0;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Triolein, C₅₇H₁₀₄O₆, is the main triglyceride in some vegetable oils. Calculate the mass of sodium hydroxide needed to saponify 22.1 g of triolein completely, in g, to three significant figures. Mr: triolein 884, NaOH 40.0.",
      value: mNaOH, sf: 3, unit: "g",
      wrong: [n * 40.0],
      hints: ["One triglyceride has three ester groups."],
      explanation: `1. n(triolein) = 22.1 ÷ 884 = ${sfStr(n, 3)} mol.\n2. n(NaOH) = 3 × ${sfStr(n, 3)} = ${sfStr(3 * n, 3)} mol.\n3. Mass = ${sfStr(3 * n, 3)} × 40.0 = ${sfStr(mNaOH, 3)} g. Using a 1 : 1 ratio gives ${sfStr(n * 40, 3)} g.`,
    });
  }
  {
    const nAcid = moles(9.0, Mr("CH3COOH"));
    const theo = nAcid * Mr("CH3COOCH3");
    const y = percentYield(7.77, theo);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true, daily: true,
      stem: "9.00 g of ethanoic acid is heated under reflux with excess methanol and a little concentrated sulfuric acid; 7.77 g of methyl ethanoate, CH₃COOCH₃, is obtained. Calculate the percentage yield to three significant figures. Mr: ethanoic acid 60, methyl ethanoate 74.",
      value: y, sf: 3, unit: "%",
      wrong: [percentYield(7.77, 9.0)],
      hints: ["Theoretical mass = moles of acid × 74."],
      explanation: `n(acid) = 9.00 ÷ 60 = ${sfStr(nAcid, 3)} mol; theoretical ester = ${sfStr(nAcid, 3)} × 74 = ${sfStr(theo, 3)} g; yield = 7.77 ÷ ${sfStr(theo, 3)} × 100 = ${sfStr(y, 3)}%.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Ethyl ethanoate and butanoic acid are structural isomers.",
    answer: true,
    explanation: "True: both are C₄H₈O₂ (functional-group isomers).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Heating ethyl ethanoate under reflux with dilute hydrochloric acid converts all of the ester into ethanoic acid and ethanol.",
    answer: false,
    explanation: "False: acid hydrolysis is reversible, so an equilibrium mixture forms.",
  });
  b.match({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "Match each substance with a typical use.",
    pairs: [
      ["ethyl ethanoate", "solvent in glues and nail-varnish remover"],
      ["3-methylbutyl ethanoate", "banana flavouring"],
      ["ethanoic acid (vinegar)", "pickling and preserving food"],
      ["sodium salts of fatty acids", "soap"],
      ["benzene-1,4-dicarboxylic acid", "making polyester fibres"],
    ],
    explanation: "Uses of esters and carboxylic acids (ZIMSEC detail).",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Complete the description of soap making.",
    template: "A fat is boiled with sodium hydroxide solution. The ester links are {{blank:a}}, giving {{blank:b}} and the sodium salts of fatty acids. Adding concentrated sodium chloride solution makes the soap {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["hydrolysed"], choices: ["hydrolysed", "oxidised", "polymerised"] },
      { id: "b", accepted: ["propane-1,2,3-triol"], choices: ["propane-1,2,3-triol", "ethanol", "propanone"] },
      { id: "c", accepted: ["separate out"], choices: ["separate out", "dissolve", "evaporate"] },
    ],
    hints: ["Saponification is alkaline hydrolysis."],
    explanation: "Saponification gives glycerol and soap; salting out separates the soap.",
  });
  b.short({
    d: 2, skill: "APPLICATION",
    stem: "Name the ester formed from methanoic acid and propan-1-ol.",
    accepted: ["propyl methanoate", "propyl formate", "1-propyl methanoate"],
    wrong: ["methyl propanoate"],
    explanation: "Alcohol part first (propyl), acid part second (methanoate): HCOOCH₂CH₂CH₃.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe how a pure sample of ethyl ethanoate could be prepared in the laboratory from ethanoic acid and ethanol.",
    points: ["Heat ethanoic acid and (excess) ethanol with a few drops of concentrated H₂SO₄ under reflux", "Distil off the crude ester", "Shake with sodium carbonate solution in a separating funnel to remove acids (release pressure); keep the upper ester layer", "Dry with anhydrous calcium chloride (or sodium sulfate) and redistil, collecting at the boiling point (about 77 °C)"],
    modelAnswer: "Heat ethanoic acid with excess ethanol and a few drops of concentrated sulfuric acid under reflux, then distil off the crude ester. Shake the distillate with sodium carbonate solution in a separating funnel, releasing the pressure, to remove acid, and keep the ester layer. Dry it with anhydrous calcium chloride and redistil, collecting the fraction boiling at about 77 °C.",
    hints: ["Reaction, separation, washing, drying, final distillation."],
    explanation: "Standard preparation and purification of an ester.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3, applies: ZIM,
    stem: "Explain how soap can be made from cooking oil and wood ash, and give one safety precaution.",
    points: ["Water soaked through wood ash dissolves alkaline substances (such as potassium carbonate), giving an alkaline solution (lye)", "Boiling oil with the alkaline solution hydrolyses (saponifies) the ester links, forming potassium salts of fatty acids (soap) and glycerol", "Precaution: the lye is corrosive, so wear eye protection and gloves (and heat carefully)"],
    modelAnswer: "Water that has soaked through wood ash dissolves potassium carbonate and other alkaline compounds. Boiling cooking oil with this alkaline liquid hydrolyses the triglyceride ester links, giving potassium salts of the fatty acids, which are soap, and glycerol. The alkaline liquid is corrosive, so eye protection and gloves must be worn.",
    hints: ["What does the ash supply?"],
    explanation: "Traditional saponification with an alkaline extract (ZIMSEC suggested activity).",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why the alkaline hydrolysis of an ester is preferred to acid hydrolysis when a high yield of the alcohol is needed.",
    points: ["Acid hydrolysis is reversible, so an equilibrium mixture with unreacted ester forms", "In alkali the carboxylic acid is removed as its carboxylate ion, which cannot react with the alcohol, so hydrolysis is complete"],
    modelAnswer: "Acid hydrolysis is an equilibrium and leaves unreacted ester. With alkali, the acid formed is converted into its carboxylate ion, so the reverse reaction cannot happen and all the ester is hydrolysed.",
    hints: ["Reversible versus irreversible."],
    explanation: "Removal of the acid as RCOO⁻ makes alkaline hydrolysis go to completion.",
  });
  {
    const a = 0.31, e0 = 1.0;
    const used = e0 - a;
    const K = kEq([[1, used], [1, used]], [[1, a], [1, a]]);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: "Rudo mixes 1.00 mol of propanoic acid with 1.00 mol of ethanol and a few drops of concentrated sulfuric acid, and leaves the mixture to reach equilibrium at 25 °C. Titration shows that 0.310 mol of propanoic acid remains.",
      parts: [
        P.short({ label: "(a)", marks: 1, stem: "Name the ester formed.", accepted: ["ethyl propanoate", "ethyl propionate"], wrong: ["propyl ethanoate"], explanation: "Ethyl (from ethanol) propanoate (from propanoic acid)." }),
        P.manual({ label: "(b)", marks: 1, stem: "Write the equation for the reaction.", points: ["CH₃CH₂COOH + C₂H₅OH ⇌ CH₃CH₂COOC₂H₅ + H₂O"], modelAnswer: "CH₃CH₂COOH + C₂H₅OH ⇌ CH₃CH₂COOC₂H₅ + H₂O" }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate Kc, to three significant figures.", value: K, sf: 3, wrong: [used / a], explanation: `Ester = water = ${sfStr(used, 3)} mol; acid = ethanol = 0.310 mol; Kc = ${sfStr(used, 3)}² ÷ 0.310² = ${sfStr(K, 3)}.` }),
        P.manual({ label: "(d)", marks: 1, stem: "Explain why Kc has no units here.", points: ["Two concentration terms on top and two on the bottom: units (mol dm⁻³)² cancel (so does the volume)"], modelAnswer: "There are two concentration terms in both numerator and denominator, so the units and the volume cancel." }),
        P.manual({ label: "(e)", marks: 1, stem: "Rudo's titration of the equilibrium mixture with NaOH also neutralises the sulfuric acid. Suggest how she should allow for this.", points: ["Titrate an identical volume of the sulfuric acid catalyst alone (a blank) and subtract that titre"], modelAnswer: "Carry out a blank titration with the same amount of sulfuric acid alone and subtract its titre." }),
        P.mcq({ label: "(f)", marks: 1, stem: "Which change would increase the equilibrium amount of ester?", options: [
          ["adding more ethanol", "Correct: the position moves right to use up the added reactant."],
          ["adding more sulfuric acid catalyst", "A catalyst does not change the position of equilibrium."],
          ["adding water", "Water is a product; adding it moves the position left."],
          ["removing some of the ethanol", "Removing a reactant moves the position to the left."],
        ], answer: "A", explanation: "Le Chatelier: excess reactant." }),
        P.manual({ label: "(g)", marks: 1, stem: "Give one use of esters such as ethyl propanoate.", points: ["Flavourings or perfumes (fruity smells), or solvents"], modelAnswer: "As fruit flavourings or in perfumes." }),
      ],
      hints: ["Use the 1 : 1 : 1 : 1 ratio.", "The volume cancels in Kc."],
      explanation: `Ethyl propanoate; Kc = ${sfStr(K, 3)}; no units; blank titration; excess ethanol increases yield.`,
    });
  }

  {
    const n = moles(5.1, 102);
    const mN = n * 40;
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: "Ester E, C₅H₁₀O₂ (Mr 102), is heated under reflux with aqueous sodium hydroxide. The mixture is distilled: the distillate is an alcohol that gives a pale yellow precipitate with alkaline iodine and is oxidised by acidified dichromate(VI) to a ketone. The residue contains a sodium salt with two carbon atoms.",
      parts: [
        P.short({ label: "(a)", marks: 1, stem: "Name the alcohol.", accepted: ["propan-2-ol", "2-propanol", "isopropanol", "isopropyl alcohol", "propan 2 ol"], wrong: ["propan-1-ol"], explanation: "Secondary alcohol with CH₃CH(OH)–, three carbons." }),
        P.short({ label: "(b)", marks: 1, stem: "Name the sodium salt.", accepted: ["sodium ethanoate", "sodium acetate"], wrong: ["sodium propanoate"], explanation: "Two-carbon carboxylate." }),
        P.short({ label: "(c)", marks: 1, stem: "Give the structural formula of E (for example CH3COOCH3).", accepted: ["CH3COOCH(CH3)2", "CH₃COOCH(CH₃)₂", "(CH3)2CHOOCCH3", "CH3CO2CH(CH3)2"], normalise: ["trim", "collapse_whitespace"], wrong: ["CH3COOCH2CH2CH3"], explanation: "1-methylethyl (propan-2-yl) ethanoate." }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why the product of the hydrolysis is a sodium salt and how the free carboxylic acid could be obtained.", points: ["The carboxylic acid formed reacts with the excess NaOH (it is neutralised), giving the carboxylate salt", "Add a strong acid such as dilute HCl to protonate the carboxylate and release ethanoic acid"], modelAnswer: "The ethanoic acid formed is neutralised by the alkali, so it remains as sodium ethanoate; adding dilute hydrochloric acid protonates the ethanoate ions and releases ethanoic acid." }),
        P.num({ label: "(e)", marks: 2, stem: "Calculate the minimum mass of NaOH (Mr 40) needed to hydrolyse 5.10 g of E.", value: mN, sf: 3, unit: "g", wrong: [mN * 3], explanation: `n(E) = 5.10 ÷ 102 = ${sfStr(n, 3)} mol; one ester group, so n(NaOH) = ${sfStr(n, 3)} mol; mass = ${sfStr(mN, 3)} g.` }),
        P.manual({ label: "(f)", marks: 1, stem: "Give one use of esters.", points: ["Flavourings, perfumes or solvents"], modelAnswer: "As solvents, for example in glues and nail-varnish remover." }),
      ],
      hints: ["The alcohol has the CH₃CH(OH)– group.", "Combine the alcohol and the acid parts."],
      explanation: `Propan-2-ol and sodium ethanoate, so E is CH₃COOCH(CH₃)₂; NaOH ${sfStr(mN, 3)} g.`,
    });
  }
  b.card("DEFINITION", "Ester", "RCOOR′: formed from a carboxylic acid RCOOH and an alcohol R′OH.");
  b.card("CONCEPT", "Naming esters", "Alkyl group from the alcohol + -oate from the acid: CH₃COOC₂H₅ is ethyl ethanoate.");
  b.card("FACT", "Esterification conditions", "Acid + alcohol, a few drops of concentrated H₂SO₄ (catalyst), heat under reflux; reversible.");
  b.card("FACT", "Acid hydrolysis of an ester", "Dilute HCl or H₂SO₄, reflux: reversible → acid + alcohol.");
  b.card("FACT", "Alkaline hydrolysis of an ester", "NaOH(aq), reflux: complete → carboxylate salt + alcohol.");
  b.card("DEFINITION", "Saponification", "Alkaline hydrolysis of a fat or oil, giving soap (fatty-acid salts) and propane-1,2,3-triol.");
  b.card("FACT", "Fats and oils", "Triesters of propane-1,2,3-triol (glycerol) with long-chain fatty acids.");
  b.card("FACT", "Uses of esters (ZIMSEC)", "Solvents (ethyl ethanoate), flavourings (3-methylbutyl ethanoate: banana), perfumes.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Kc for esterification", "Kc = [ester][water] ÷ ([acid][alcohol]); no units, volume cancels; about 4 for ethyl ethanoate.");
});
