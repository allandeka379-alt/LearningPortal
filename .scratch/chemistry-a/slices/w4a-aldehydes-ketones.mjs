// W4a: achem.carbonyl.aldehydes-ketones (both boards; ZIMSEC Form 6, Cambridge AS Level) ★ free preview lesson
import { concept, P, t, Mr, moles, percentYield, sfStr } from "../lib.mjs";

const AG = 107.9;

concept("achem.carbonyl.aldehydes-ketones", { file: "carbonyl/aldehydes-ketones", keyPrefix: "carbonyl.aldehydes-ketones" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which reagent gives an orange precipitate with both aldehydes and ketones?",
    options: [
      ["2,4-dinitrophenylhydrazine", "Correct: it reacts with any C=O group in an aldehyde or ketone."],
      ["Tollens' reagent", "Tollens' reacts with aldehydes only, giving a silver mirror."],
      ["Fehling's solution", "Fehling's reacts with aldehydes only, giving a red-brown precipitate."],
      ["acidified potassium dichromate(VI)", "Dichromate(VI) oxidises aldehydes but not ketones."],
    ],
    answer: "A",
    explanation: "Brady's reagent (2,4-DNPH) detects the carbonyl group itself.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "What is seen when propanal is warmed with Fehling's solution?",
    options: [
      ["The blue solution gives a red-brown precipitate.", "Correct: Cu²⁺ is reduced to Cu₂O."],
      ["A silver mirror forms on the inside of the tube.", "That is the result with Tollens' reagent."],
      ["The orange solution turns green.", "That is the change seen with acidified dichromate(VI)."],
      ["The solution stays blue and no precipitate forms.", "That is the result for a ketone, not an aldehyde."],
    ],
    answer: "A",
    explanation: "Aldehydes reduce copper(II) to copper(I) oxide, a red-brown solid.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which compound is a functional-group isomer of propanone?",
    options: [
      ["propanal", "Correct: both are C₃H₆O, one an aldehyde, the other a ketone."],
      ["propan-2-ol", "Propan-2-ol is C₃H₈O: it has two more hydrogens."],
      ["propanoic acid", "Propanoic acid is C₃H₆O₂: it has an extra oxygen."],
      ["butanone", "Butanone is C₄H₈O: it has an extra CH₂."],
    ],
    answer: "A",
    explanation: "Same molecular formula, different functional group.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which product forms when butanone is reduced by sodium tetrahydridoborate, NaBH₄?",
    options: [
      ["butan-2-ol", "Correct: a ketone is reduced to a secondary alcohol."],
      ["butan-1-ol", "The C=O carbon is carbon 2, so the –OH ends up on carbon 2."],
      ["butanoic acid", "An acid would come from oxidation of an aldehyde, not reduction."],
      ["butanal", "Reduction converts C=O into CH–OH; it does not move the carbonyl group."],
    ],
    answer: "A",
    explanation: "CH₃COCH₂CH₃ + 2[H] → CH₃CH(OH)CH₂CH₃.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which compound gives a silver mirror with Tollens' reagent and a pale yellow precipitate with alkaline iodine?",
    options: [
      ["ethanal", "Correct: an aldehyde that also contains CH₃CO–."],
      ["propanal", "It gives a silver mirror but has no CH₃CO– group."],
      ["propanone", "It gives CHI₃ but, as a ketone, no silver mirror."],
      ["methanal", "Methanal has only one carbon, so it cannot contain CH₃CO–."],
    ],
    answer: "A",
    hints: ["You need both an aldehyde group and a CH₃CO– group."],
    explanation: "Ethanal, CH₃CHO, is the only aldehyde with CH₃CO–.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of the statements about pentan-3-one, CH₃CH₂COCH₂CH₃, are correct?\n\n1. It gives an orange precipitate with 2,4-DNPH.\n2. It gives a pale yellow precipitate with alkaline iodine.\n3. It reduces Tollens' reagent to silver.",
    options: [
      ["1 only", "Correct: it is a ketone without a CH₃CO– group."],
      ["1 and 2 only", "Pentan-3-one has ethyl groups on both sides of C=O, not a methyl group."],
      ["2 and 3 only", "Neither reaction occurs; only the 2,4-DNPH test is positive."],
      ["1, 2 and 3", "Ketones are not oxidised by Tollens' reagent."],
    ],
    answer: "A",
    hints: ["Check for a CH₃ group bonded directly to the C=O."],
    explanation: "Positive 2,4-DNPH only.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of the statements about the preparation of propanal from propan-1-ol are correct?\n\n1. Acidified potassium dichromate(VI) is the oxidising agent.\n2. The propanal is distilled off as soon as it forms.\n3. The mixture is heated under reflux for an hour before distilling.",
    options: [
      ["1 and 2 only", "Correct: reflux would oxidise propanal to propanoic acid."],
      ["1, 2 and 3", "Statement 3 is false: refluxing gives the carboxylic acid."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true."],
    ],
    answer: "A",
    hints: ["What happens to an aldehyde left with the oxidant?"],
    explanation: "Aldehydes are distilled out immediately to prevent further oxidation.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Compound X, C₄H₈O, gives an orange precipitate with 2,4-DNPH, does not turn acidified dichromate(VI) green, and gives a pale yellow precipitate with alkaline iodine. What is X?",
    options: [
      ["butanone", "Correct: a ketone with CH₃CO–."],
      ["butanal", "Butanal would turn dichromate(VI) green and has no CH₃CO– group."],
      ["2-methylpropanal", "An aldehyde: it would be oxidised by dichromate(VI)."],
      ["but-3-en-2-ol", "An alcohol: it would not give a precipitate with 2,4-DNPH."],
    ],
    answer: "A",
    hints: ["Use each result in turn."],
    explanation: "C=O present, not an aldehyde, CH₃CO– present: CH₃COCH₂CH₃.",
  });
  {
    const m = 1.74;
    const n = moles(m, Mr("C3H6O"));
    const ag = 2 * n * AG;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "1.74 g of propanal, CH₃CH₂CHO, is warmed with excess Tollens' reagent. Calculate the maximum mass of silver formed, in g, to three significant figures. Ar: H 1, C 12, O 16, Ag 107.9. (RCHO + 2Ag⁺ + H₂O → RCOOH + 2Ag + 2H⁺)",
      value: ag, sf: 3, unit: "g",
      wrong: [n * AG],
      hints: ["How many silver ions does one aldehyde group reduce?"],
      explanation: `1. Mr(C₃H₆O) = 58; n = 1.74 ÷ 58 = ${sfStr(n, 3)} mol.\n2. n(Ag) = 2 × ${sfStr(n, 3)} = ${sfStr(2 * n, 3)} mol.\n3. Mass = ${sfStr(2 * n, 3)} × 107.9 = ${sfStr(ag, 3)} g.\n4. A 1 : 1 ratio gives ${sfStr(n * AG, 3)} g, ignoring that each aldehyde transfers two electrons.`,
    });
  }
  {
    const mAg = 2.70;
    const nAg = mAg / AG;
    const nAld = nAg / 2;
    const mrAld = 0.900 / nAld;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "0.900 g of an aldehyde RCHO deposits 2.70 g of silver with excess Tollens' reagent. Calculate the relative molecular mass of the aldehyde, to two significant figures. Ar: Ag 107.9.",
      value: mrAld, sf: 2,
      wrong: [0.9 / nAg],
      hints: ["n(aldehyde) = n(Ag) ÷ 2."],
      explanation: `1. n(Ag) = 2.70 ÷ 107.9 = ${sfStr(nAg, 3)} mol.\n2. n(RCHO) = ${sfStr(nAg, 3)} ÷ 2 = ${sfStr(nAld, 3)} mol.\n3. Mr = 0.900 ÷ ${sfStr(nAld, 3)} = ${sfStr(mrAld, 2)}: butanal or 2-methylpropanal (C₄H₈O, Mr 72) fits.\n4. Forgetting the 2 : 1 ratio gives ${sfStr(0.9 / nAg, 2)}, which matches no aldehyde.`,
    });
  }
  {
    const nAlc = moles(4.50, Mr("C3H8O"));
    const theo = nAlc * Mr("C3H6O");
    const y = percentYield(2.61, theo);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true, daily: true,
      stem: "Nyasha oxidises 4.50 g of propan-1-ol and collects 2.61 g of propanal by distillation. Calculate the percentage yield to three significant figures. Ar: H 1, C 12, O 16.",
      value: y, sf: 3, unit: "%",
      wrong: [percentYield(2.61, 4.5)],
      hints: ["Mr(propan-1-ol) = 60; Mr(propanal) = 58."],
      explanation: `n(propan-1-ol) = 4.50 ÷ 60 = ${sfStr(nAlc, 3)} mol; theoretical propanal = ${sfStr(nAlc, 3)} × 58 = ${sfStr(theo, 3)} g; yield = 2.61 ÷ ${sfStr(theo, 3)} × 100 = ${sfStr(y, 3)}%.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Propanone gives a silver mirror when warmed with Tollens' reagent.",
    answer: false,
    explanation: "False: ketones are not oxidised by Tollens' reagent; only aldehydes give the mirror.",
  });
  b.tf({
    d: 2, skill: "RECALL",
    stem: "Lithium tetrahydridoaluminate, LiAlH₄, is used in dry ether because it reacts violently with water.",
    answer: true,
    explanation: "True: LiAlH₄ is a powerful reducing agent that reacts with water, so a dry solvent is used.",
  });
  b.match({
    d: 3, skill: "RECALL",
    stem: "Match each test with the positive result.",
    pairs: [
      ["2,4-DNPH (Brady's reagent)", "orange precipitate"],
      ["Tollens' reagent, warm", "silver mirror"],
      ["Fehling's solution, warm", "red-brown precipitate"],
      ["acidified K₂Cr₂O₇, warm", "orange to green"],
      ["iodine and NaOH(aq), warm", "pale yellow precipitate"],
    ],
    hints: ["Each test has a distinctive colour or deposit."],
    explanation: "2,4-DNPH orange solid; Ag mirror; Cu₂O red-brown; Cr³⁺ green; CHI₃ yellow.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements about reducing carbonyl compounds.",
    template: "Aldehydes are reduced to {{blank:a}} alcohols and ketones to {{blank:b}} alcohols. The milder reducing agent, which can be used in water, is {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["primary"], choices: ["primary", "secondary", "tertiary"] },
      { id: "b", accepted: ["secondary"], choices: ["primary", "secondary", "tertiary"] },
      { id: "c", accepted: ["NaBH₄"], choices: ["NaBH₄", "LiAlH₄", "K₂Cr₂O₇"] },
    ],
    explanation: "RCHO → RCH₂OH; RCOR′ → RCH(OH)R′; NaBH₄ works in water or methanol.",
  });
  b.short({
    d: 2, skill: "APPLICATION",
    stem: "Name the compound CH₃CH₂COCH₂CH₂CH₃.",
    accepted: ["hexan-3-one", "3-hexanone", "hexan 3 one"],
    wrong: ["hexan-4-one"],
    explanation: "Six carbons, C=O on carbon 3 (numbering from the nearer end): hexan-3-one.",
  });
  b.short({
    d: 3, skill: "APPLICATION",
    stem: "Give the name of the organic salt formed when butanone reacts with iodine in aqueous sodium hydroxide.",
    accepted: ["sodium propanoate", "sodium propionate"],
    wrong: ["sodium butanoate"],
    hints: ["The CH₃ group becomes CHI₃; the rest becomes a carboxylate."],
    explanation: "CH₃COCH₂CH₃ → CHI₃ + CH₃CH₂COO⁻Na⁺ (sodium propanoate).",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Describe how you would use Tollens' reagent to distinguish between propanal and propanone, including how the reagent is made and one safety precaution.",
    points: ["Add NaOH(aq) to AgNO₃(aq), then dilute ammonia until the brown precipitate just dissolves", "Warm each sample with the reagent in a water bath: propanal gives a silver mirror; propanone shows no change", "Water bath, not a naked flame (flammable compounds), or rinse out the reagent promptly (do not store it)"],
    modelAnswer: "Make Tollens' reagent by adding a drop of sodium hydroxide to silver nitrate solution and then dilute ammonia until the brown silver oxide just redissolves. Warm a little of each compound with the reagent in a hot water bath. Propanal produces a silver mirror; propanone gives no change. Use a water bath rather than a flame because both compounds are flammable, and wash the reagent away after use.",
    hints: ["Preparation, procedure with results, safety."],
    explanation: "Tollens' oxidises aldehydes only.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Outline how a pure sample of the 2,4-DNPH derivative is prepared from an unknown carbonyl compound and used to identify it.",
    points: ["Add the compound to 2,4-DNPH (Brady's reagent) and filter off the orange precipitate", "Recrystallise: dissolve in the minimum volume of hot solvent (ethanol), cool, filter and dry", "Measure the melting point", "Compare with a table of derivative melting points; a sharp melting point that matches identifies the compound"],
    modelAnswer: "React the compound with Brady's reagent and filter off the orange precipitate. Recrystallise it by dissolving in the minimum volume of hot ethanol, cooling, filtering and drying the crystals. Measure the melting point; a sharp value shows purity. Compare it with a data table of 2,4-DNPH derivative melting points to identify the carbonyl compound.",
    hints: ["Precipitate, purify, measure, compare."],
    explanation: "Derivative melting points identify carbonyl compounds.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 2,
    stem: "Write equations using [O] or [H] for (i) the oxidation of butan-2-ol to butanone and (ii) the reduction of ethanal with NaBH₄.",
    points: ["CH₃CH(OH)CH₂CH₃ + [O] → CH₃COCH₂CH₃ + H₂O", "CH₃CHO + 2[H] → CH₃CH₂OH"],
    modelAnswer: "(i) CH₃CH(OH)CH₂CH₃ + [O] → CH₃COCH₂CH₃ + H₂O. (ii) CH₃CHO + 2[H] → CH₃CH₂OH.",
    hints: ["Oxidation removes 2H as water; reduction adds 2[H]."],
    explanation: "Oxidation and reduction equations with [O] and [H].",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "Three compounds D, E and F each have the formula C₅H₁₀O. Results:\n\n| Test | D | E | F |\n|---|---|---|---|\n| 2,4-DNPH | orange precipitate | orange precipitate | orange precipitate |\n| Fehling's solution, warm | red-brown precipitate | stays blue | stays blue |\n| I₂ and NaOH(aq), warm | no precipitate | pale yellow precipitate | no precipitate |\n| carbon chain | unbranched | unbranched | unbranched |",
    parts: [
      P.manual({ label: "(a)", marks: 1, stem: "State what the 2,4-DNPH results show.", points: ["All three contain a carbonyl group (C=O): aldehydes or ketones"], modelAnswer: "D, E and F all contain C=O." }),
      P.short({ label: "(b)", marks: 1, stem: "Name D.", accepted: ["pentanal", "valeraldehyde"], wrong: ["pentan-2-one"], explanation: "Aldehyde (Fehling's positive), unbranched: pentanal." }),
      P.short({ label: "(c)", marks: 1, stem: "Name E.", accepted: ["pentan-2-one", "2-pentanone", "pentan 2 one"], wrong: ["pentan-3-one"], explanation: "Ketone with CH₃CO–, unbranched: pentan-2-one." }),
      P.short({ label: "(d)", marks: 1, stem: "Name F.", accepted: ["pentan-3-one", "3-pentanone", "pentan 3 one", "diethyl ketone"], wrong: ["pentan-2-one"], explanation: "Ketone without CH₃CO–: pentan-3-one." }),
      P.manual({ label: "(e)", marks: 2, stem: "Give the formulae of the products of the reaction of E with alkaline iodine.", points: ["CHI₃", "CH₃CH₂CH₂COONa (sodium butanoate) (with NaI and H₂O)"], modelAnswer: "CHI₃ and CH₃CH₂CH₂COO⁻Na⁺ (plus NaI and water)." }),
      P.mcq({ label: "(f)", marks: 1, stem: "D is reduced with NaBH₄. What is the product?", options: [
        ["pentan-1-ol", "Correct: an aldehyde gives a primary alcohol."],
        ["pentan-2-ol", "That would come from reducing pentan-2-one."],
        ["pentanoic acid", "An acid comes from oxidation, not reduction."],
        ["pent-1-ene", "Reduction with NaBH₄ does not remove the oxygen atom."],
      ], answer: "A", explanation: "CH₃(CH₂)₃CHO + 2[H] → CH₃(CH₂)₃CH₂OH." }),
      P.manual({ label: "(g)", marks: 1, stem: "Suggest why chemists identify such compounds using the melting points of their 2,4-DNPH derivatives rather than their boiling points.", points: ["The isomers have very similar boiling points, but their crystalline derivatives have clearly different melting points (which are also easy to measure accurately)"], modelAnswer: "The liquid isomers boil at similar temperatures, whereas their crystalline 2,4-DNPH derivatives melt at clearly different, sharply measurable temperatures." }),
    ],
    hints: ["2,4-DNPH: C=O; Fehling's: aldehyde; iodoform: CH₃CO–."],
    explanation: "D pentanal, E pentan-2-one, F pentan-3-one.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: "Tendai prepares butanal from butan-1-ol and checks his product.\n\n| Substance | Boiling point / °C (data, about) |\n|---|---|\n| butan-1-ol | 118 |\n| butanal | 75 |\n| butanoic acid | 164 |",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Give the reagents and the apparatus arrangement Tendai should use, and explain the choice of apparatus using the data.", points: ["Acidified potassium dichromate(VI) (K₂Cr₂O₇ + dilute H₂SO₄), warm, with excess alcohol", "Distil: butanal has the lowest boiling point (75 °C), so it distils off as it forms before it can be oxidised to butanoic acid"], modelAnswer: "Warm butan-1-ol with acidified potassium dichromate(VI) in distillation apparatus. Butanal boils at about 75 °C, well below the alcohol and acid, so it distils out as it forms and escapes further oxidation." }),
      P.manual({ label: "(b)", marks: 1, stem: "Write an equation for the reaction using [O].", points: ["CH₃CH₂CH₂CH₂OH + [O] → CH₃CH₂CH₂CHO + H₂O"], modelAnswer: "CH₃CH₂CH₂CH₂OH + [O] → CH₃CH₂CH₂CHO + H₂O" }),
      P.mcq({ label: "(c)", marks: 1, stem: "What colour change is seen in the flask?", options: [
        ["orange to green", "Correct: Cr₂O₇²⁻ → Cr³⁺."],
        ["green to orange", "This is the reverse of what happens."],
        ["purple to colourless", "That is manganate(VII)."],
        ["blue to red-brown", "That is Fehling's solution with an aldehyde."],
      ], answer: "A", explanation: "Dichromate(VI) is reduced to chromium(III)." }),
      P.manual({ label: "(d)", marks: 2, stem: "Describe one test that shows the distillate contains an aldehyde, giving the result.", points: ["Warm with Fehling's (or Benedict's) solution in a water bath, or with Tollens' reagent", "Red-brown precipitate (Fehling's/Benedict's), or silver mirror (Tollens')"], modelAnswer: "Warm a sample with Tollens' reagent in a water bath: a silver mirror forms, showing an aldehyde." }),
    ],
    hints: ["Which substance has the lowest boiling point?"],
    explanation: "Distil butanal (75 °C) from acidified dichromate(VI); orange to green; Tollens' or Fehling's confirms the aldehyde.",
  });

  b.card("DEFINITION", "Aldehyde", "Contains –CHO: the carbonyl carbon is bonded to at least one H (RCHO).");
  b.card("DEFINITION", "Ketone", "The carbonyl carbon is bonded to two carbon atoms (RCOR′).");
  b.card("FACT", "2,4-DNPH (Brady's reagent)", "Orange precipitate with any aldehyde or ketone.");
  b.card("FACT", "Tollens' reagent result", "Aldehyde, warm: silver mirror. Ketone: no change.");
  b.card("FACT", "Fehling's or Benedict's result", "Aldehyde, warm: blue → red-brown precipitate (Cu₂O). Ketone: stays blue.");
  b.card("FACT", "Tri-iodomethane test for carbonyls", "Pale yellow CHI₃ with ethanal and methyl ketones (CH₃CO–).");
  b.card("FACT", "Reducing agents for C=O", "NaBH₄ (water or methanol) or LiAlH₄ (dry ether): aldehyde → primary alcohol; ketone → secondary alcohol.");
  b.card("CONCEPT", "Identifying a carbonyl compound", "Make the 2,4-DNPH derivative, recrystallise, measure the melting point, compare with data.");
  b.card("FORMULA", "Tollens' reaction (simplified)", "RCHO + 2Ag⁺ + H₂O → RCOOH + 2Ag + 2H⁺");
});
