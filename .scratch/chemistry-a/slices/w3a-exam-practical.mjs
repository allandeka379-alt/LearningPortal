// W3a: two both-board QUALITATIVE_ANALYSIS items (15 marks, ZIMSEC Paper 4 and Cambridge Paper 3 style) on transition
// metal ions, complexes and colour changes. Only ions in both qualitative-analysis lists are used (Cr³⁺, Mn²⁺, Fe²⁺,
// Fe³⁺, Cu²⁺, Zn²⁺, Cl⁻, Br⁻, I⁻, SO₄²⁻).
import { concept, P, t, EXAM, checkExam } from "../lib.mjs";

const A = (k) => `achem.${k}`;
const QA = { skill: EXAM.QUALITATIVE_ANALYSIS.skill, secs: EXAM.QUALITATIVE_ANALYSIS.secs, examStyle: true, paper: "Paper 4 (ZIMSEC), Paper 3 (CIE)" };
const EQ = ["trim", "lowercase", "remove_whitespace"];

concept(A("skills.qualitative-analysis"), { file: "exam/w3a-practical", keyPrefix: "exam.w3a-practical" }, (b) => {
  // ---------------------------------------------------------------- Q1: solutions F and G (Cr³⁺ / Cl⁻ and Fe²⁺ / SO₄²⁻)
  b.struct({
    ...QA, d: 4,
    concepts: [A("skills.qualitative-analysis"), A("transition.complexes-ligands"), A("transition.colour")],
    stem: "Solutions **F** and **G** each contain one cation and one anion. Eye protection was worn throughout.\n\n| test | observations with **F** | observations with **G** |\n|---|---|---|\n| 1: aqueous sodium hydroxide, a few drops then in excess | grey-green precipitate; dissolves in excess to give a dark green solution | green precipitate, turning brown at the surface on standing; insoluble in excess |\n| 2: aqueous ammonia, a few drops then in excess | grey-green precipitate; insoluble in excess | see part (d) |\n| 3: dilute nitric acid, then aqueous silver nitrate | white precipitate | no change |\n| 4: dilute nitric acid, then aqueous barium nitrate | no change | white precipitate |",
    parts: checkExam(EXAM.QUALITATIVE_ANALYSIS, [
      P.mcq({ label: "(a)", stem: "Identify the cation in **F**.", options: [
        [t`$\ce{Cr^3+}$`, "Correct: grey-green hydroxide, soluble in excess NaOH but not in excess NH₃."],
        [t`$\ce{Fe^2+}$`, "Fe(OH)₂ is green and does not dissolve in excess NaOH."],
        [t`$\ce{Zn^2+}$`, "Zn(OH)₂ is white and dissolves in excess of both reagents."],
        [t`$\ce{Cu^2+}$`, "Cu(OH)₂ is pale blue."],
      ], answer: "A", explanation: "Cr³⁺: Cr(OH)₃ is grey-green and amphoteric, forming dark green [Cr(OH)₆]³⁻." }),
      P.short({ label: "(b)", stem: "Give the formula of the anion in **F**. (Type it as, for example, NO3-.)", accepted: ["Cl-", "Cl⁻", "Cl^-", "Cl(-)"], normalise: EQ, wrong: ["Br-"], explanation: "White silver halide precipitate: chloride." }),
      P.short({ label: "(c)", stem: "Write the ionic equation, with state symbols, for the reaction in test 3 with **F**. (Type it as, for example, Ba2+(aq) + SO42-(aq) -> BaSO4(s).)", accepted: ["Ag+(aq)+Cl-(aq)->AgCl(s)", "Ag+(aq)+Cl-(aq)→AgCl(s)", "Cl-(aq)+Ag+(aq)->AgCl(s)", "Cl-(aq)+Ag+(aq)→AgCl(s)", "Ag⁺(aq)+Cl⁻(aq)→AgCl(s)"], normalise: EQ, wrong: ["Ag+ + Cl- -> AgCl2"], explanation: "Ag⁺(aq) + Cl⁻(aq) → AgCl(s)." }),
      P.fib({ label: "(d)", stem: "Predict the observations when aqueous ammonia is added to **G**, a few drops then in excess.", template: "A {{blank:a}} precipitate forms, which is {{blank:b}} in excess ammonia.", blanks: [
        { id: "a", accepted: ["green"], choices: ["green", "red-brown", "pale blue", "white"] },
        { id: "b", accepted: ["insoluble"], choices: ["soluble", "insoluble"] },
      ], explanation: "Fe²⁺ gives green Fe(OH)₂ with ammonia, insoluble in excess (turning brown at the surface)." }),
      P.mcq({ label: "(e)", stem: "Which reagent, used in excess, would distinguish a solution of Cr³⁺ from a solution of Zn²⁺?", options: [
        ["aqueous ammonia", "Correct: Zn(OH)₂ dissolves in excess NH₃; Cr(OH)₃ does not."],
        ["dilute nitric acid", "Neither ion gives a visible change with dilute nitric acid."],
        ["aqueous barium nitrate", "This tests for sulfate, not the cation."],
        ["aqueous silver nitrate", "This tests for halide ions."],
      ], answer: "A", explanation: "Both hydroxides dissolve in excess NaOH (Cr: dark green, Zn: colourless), but only zinc dissolves in excess ammonia." }),
      P.short({ label: "(f)", stem: "Give the formula of the anion in **G**.", accepted: ["SO4 2-", "SO42-", "SO4^2-", "SO₄²⁻", "SO4(2-)"], normalise: EQ, wrong: ["SO32-"], explanation: "White precipitate with barium ions in acid: sulfate." }),
      P.manual({ label: "(g)", marks: 3, stem: "State the cation in **G** and give the deductions that follow from the observations in test 1, including the change at the surface.", points: ["Cation is Fe²⁺ (iron(II))", "Green precipitate insoluble in excess NaOH is Fe(OH)₂, not amphoteric", "Turning brown at the surface: oxidation by air (oxygen) of iron(II) hydroxide to iron(III) hydroxide, Fe(OH)₃"], modelAnswer: "G contains iron(II) ions. The green precipitate, insoluble in excess, is iron(II) hydroxide, Fe(OH)₂, which is not amphoteric. At the surface, oxygen from the air oxidises iron(II) hydroxide to red-brown iron(III) hydroxide, so the precipitate browns." }),
      P.manual({ label: "(h)", marks: 3, stem: "A freshly made dilute solution containing [Cr(H₂O)₆]³⁺ ions is violet, but in excess sodium hydroxide chromium(III) gives a dark green solution. Explain why the colour changes.", points: ["Ligand exchange: water ligands are replaced by hydroxide, forming [Cr(OH)₆]³⁻", "The new ligands split the 3d orbitals by a different energy gap ΔE", "So a different frequency (wavelength) of visible light is absorbed, and the complementary colour seen changes"], modelAnswer: "In excess hydroxide the aqua ligands are replaced: Cr(OH)₃ + 3OH⁻ → [Cr(OH)₆]³⁻. Hydroxide ligands split the chromium(III) 3d orbitals by a different amount, ΔE, from water, so the d-d transition absorbs visible light of a different frequency and the complementary colour seen changes to dark green." }),
      P.num({ label: "(i)", stem: "Give the oxidation state of chromium in the dark green complex formed in test 1.", value: 3, wrong: [6], explanation: "[Cr(OH)₆]³⁻: x − 6 = −3, x = +3." }),
      P.tf({ label: "(j)", stem: "The precipitate formed by **F** with aqueous ammonia is chromium(III) hydroxide.", answer: true, explanation: "True: Cr(OH)₃, grey-green, insoluble in excess ammonia." }),
    ]),
    hints: ["Compare the behaviour of each precipitate in excess NaOH and in excess NH₃.", "Silver halides identify halide ions; barium ions identify sulfate."],
    explanation: "F is chromium(III) chloride; G is iron(II) sulfate.",
  });

  // ---------------------------------------------------------------- Q2: solid H (Cu²⁺ / Br⁻) and solution J (Mn²⁺)
  b.struct({
    ...QA, d: 4,
    concepts: [A("skills.qualitative-analysis"), A("transition.complexes-ligands"), A("group17.halide-ions")],
    stem: "Solid **H** is a dark-coloured copper salt that dissolves in water to give a green-blue solution. Solution **J** contains one cation. Eye protection was worn.\n\n| test | observations |\n|---|---|\n| 1: aqueous ammonia added to a solution of **H**, a few drops then in excess | pale blue precipitate; dissolves in excess to give a deep blue solution |\n| 2: dilute nitric acid, then aqueous silver nitrate added to a solution of **H**; then dilute aqueous ammonia | cream precipitate; only partly dissolves in dilute ammonia |\n| 3: aqueous sodium hydroxide added to **J**, a few drops then in excess | off-white precipitate, rapidly turning brown in air; insoluble in excess |",
    parts: checkExam(EXAM.QUALITATIVE_ANALYSIS, [
      P.short({ label: "(a)", stem: "Give the formula of the cation in **H**.", accepted: ["Cu2+", "Cu^2+", "Cu²⁺", "Cu(2+)"], normalise: EQ, wrong: ["Cu+"], explanation: "Pale blue hydroxide dissolving to deep blue in excess ammonia: Cu²⁺." }),
      P.mcq({ label: "(b)", stem: "Identify the anion in **H**.", options: [
        ["bromide", "Correct: cream AgBr, partly soluble in dilute ammonia (soluble in concentrated)."],
        ["chloride", "AgCl is white and dissolves in dilute ammonia."],
        ["iodide", "AgI is yellow and insoluble even in concentrated ammonia."],
        ["sulfate", "Silver sulfate would not precipitate in dilute solution; sulfate is tested with Ba²⁺."],
      ], answer: "A", explanation: "Cream precipitate: AgBr." }),
      P.short({ label: "(c)", stem: "Write the ionic equation for the formation of the pale blue precipitate in test 1. (Type it as, for example, Fe2+ + 2OH- -> Fe(OH)2.)", accepted: ["Cu2++2OH-->Cu(OH)2", "Cu2++2OH-→Cu(OH)2", "Cu2+(aq)+2OH-(aq)->Cu(OH)2(s)", "Cu2+(aq)+2OH-(aq)→Cu(OH)2(s)", "Cu²⁺+2OH⁻→Cu(OH)₂"], normalise: EQ, wrong: ["Cu2+ + OH- -> CuOH"], explanation: "Cu²⁺ + 2OH⁻ → Cu(OH)₂ (ammonia supplies OH⁻)." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain the formation of the deep blue solution in test 1. Include the formula of the complex.", points: ["Ammonia molecules act as ligands (lone pair on N forms dative bonds to Cu²⁺)", "Ligand exchange / partial substitution gives [Cu(NH₃)₄(H₂O)₂]²⁺", "A different ligand changes the splitting of the d orbitals (ΔE), so a different frequency of light is absorbed: deep blue"], modelAnswer: "In excess, ammonia acts as a ligand, its nitrogen lone pair forming dative bonds to Cu²⁺. Four ammonia molecules replace four water ligands, giving the soluble complex [Cu(NH₃)₄(H₂O)₂]²⁺. Ammonia splits the d orbitals by a larger ΔE than water, so a different frequency of light is absorbed and the solution is deep blue." }),
      P.fib({ label: "(e)", stem: "Predict the observations when aqueous ammonia is added to **J**, a few drops then in excess.", template: "An {{blank:a}} precipitate forms, which {{blank:b}} on standing in air and is {{blank:c}} in excess ammonia.", blanks: [
        { id: "a", accepted: ["off-white"], choices: ["off-white", "pale blue", "grey-green", "red-brown"] },
        { id: "b", accepted: ["turns brown"], choices: ["turns brown", "turns green", "dissolves", "stays white"] },
        { id: "c", accepted: ["insoluble"], choices: ["soluble", "insoluble"] },
      ], explanation: "Mn²⁺: off-white Mn(OH)₂, rapidly turning brown in air, insoluble in excess." }),
      P.short({ label: "(f)", stem: "Give the formula of the off-white precipitate formed in test 3.", accepted: ["Mn(OH)2", "Mn(OH)₂"], normalise: EQ, wrong: ["MnO2"], explanation: "Manganese(II) hydroxide." }),
      P.mcq({ label: "(g)", stem: "Why does the precipitate from **J** turn brown?", options: [
        ["Manganese(II) is oxidised by oxygen in the air.", "Correct: higher oxidation state manganese oxides/hydroxides are brown."],
        ["The precipitate loses water and becomes MnO.", "MnO is not brown, and no heating occurs."],
        ["Carbon dioxide from the air forms manganese carbonate.", "The colour change is oxidation, not carbonate formation."],
        ["Excess hydroxide forms a brown complex ion in solution.", "The precipitate is insoluble in excess; the change is at the solid surface."],
      ], answer: "A", explanation: "Air oxidises Mn(OH)₂ to brown manganese(III)/(IV) oxides." }),
      P.mcq({ label: "(h)", stem: "Which reagent would distinguish a bromide from an iodide after adding silver nitrate?", options: [
        ["concentrated aqueous ammonia", "Correct: AgBr dissolves; AgI does not."],
        ["dilute nitric acid", "Both precipitates are insoluble in dilute nitric acid."],
        ["aqueous barium nitrate", "This tests for sulfate."],
        ["aqueous sodium hydroxide", "This tests cations."],
      ], answer: "A", explanation: "Solubility of silver halides in ammonia: AgCl (dilute) > AgBr (concentrated) > AgI (insoluble)." }),
      P.num({ label: "(i)", stem: "Give the coordination number of copper in the deep blue complex.", value: 6, wrong: [4], explanation: "Four NH₃ and two H₂O ligands: 6." }),
      P.manual({ label: "(j)", marks: 2, stem: "State the identity of the cation in **J** and explain why the observations in test 3 rule out Fe²⁺ and Zn²⁺.", points: ["The cation is Mn²⁺ (manganese(II))", "Fe²⁺ would give a green precipitate (not off-white); Zn²⁺ would give a white precipitate that dissolves in excess NaOH and does not turn brown"], modelAnswer: "J contains Mn²⁺. Fe²⁺ would give a green precipitate rather than an off-white one, and Zn²⁺ would give a white precipitate that dissolves in excess sodium hydroxide and does not darken in air." }),
    ]),
    hints: ["Use the colour of the silver halide and its solubility in ammonia.", "Which hydroxide is off-white and darkens in air?"],
    explanation: "H is copper(II) bromide; J contains manganese(II).",
  });
});
