// W2b: achem.skills.qualitative-analysis (both boards; ZIMSEC Forms 5-6, Cambridge AS Level). Pb²⁺, CrO₄²⁻ and the
// dichromate SO₂ test are ZIMSEC-only items; the manganate(VII) tests for nitrite and sulfite are Cambridge items.
import { concept, P, t, ZIM, CAM } from "../lib.mjs";

concept("achem.skills.qualitative-analysis", { file: "skills/qualitative-analysis", keyPrefix: "skills.qualitative-analysis" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which observation is made when aqueous sodium hydroxide is added to a solution of iron(III) ions?",
    options: [
      ["a red-brown precipitate, insoluble in excess", "Correct: Fe(OH)₃ is red-brown and is not amphoteric."],
      ["a green precipitate, insoluble in excess", "This is iron(II) hydroxide, from Fe²⁺."],
      ["a pale blue precipitate, insoluble in excess", "This is copper(II) hydroxide, from Cu²⁺."],
      ["a grey-green precipitate, soluble in excess", "This is chromium(III) hydroxide, from Cr³⁺."],
    ],
    answer: "A",
    explanation: "Fe³⁺(aq) + 3OH⁻(aq) → Fe(OH)₃(s), a red-brown precipitate that does not dissolve in excess alkali.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A solution gives a white precipitate with aqueous ammonia that dissolves in excess aqueous ammonia. Which ion is present?",
    options: [
      [t`$\ce{Zn^2+}$`, "Correct: zinc hydroxide dissolves in excess ammonia, forming a colourless ammine complex."],
      [t`$\ce{Al^3+}$`, "Aluminium hydroxide dissolves in excess NaOH, but not in excess ammonia."],
      [t`$\ce{Mg^2+}$`, "Magnesium hydroxide is insoluble in excess of either reagent."],
      [t`$\ce{Ca^2+}$`, "Calcium ions give no precipitate with aqueous ammonia."],
    ],
    answer: "A",
    explanation: "Of the white hydroxides, only zinc's dissolves in excess NH₃(aq), as [Zn(NH₃)₄]²⁺.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which gas turns damp red litmus paper blue?",
    options: [
      ["ammonia", "Correct: ammonia is the only common alkaline gas."],
      ["chlorine", "Chlorine bleaches damp litmus paper."],
      ["sulfur dioxide", "Sulfur dioxide is acidic: it turns damp blue litmus red."],
      ["carbon dioxide", "Carbon dioxide is weakly acidic; its test is limewater."],
    ],
    answer: "A",
    explanation: "NH₃ dissolves in the water on the paper to give OH⁻ ions: NH₃ + H₂O ⇌ NH₄⁺ + OH⁻.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A student adds dilute nitric acid and then aqueous silver nitrate to a solution of a sodium halide. A cream precipitate forms that dissolves only partially in dilute aqueous ammonia. Which ion is present?",
    options: [
      ["bromide", "Correct: silver bromide is cream and only partly soluble in dilute ammonia."],
      ["chloride", "Silver chloride is white and dissolves readily in dilute ammonia."],
      ["iodide", "Silver iodide is pale yellow and insoluble in ammonia."],
      ["fluoride", "Silver fluoride is soluble, so no precipitate forms."],
    ],
    answer: "A",
    explanation: "Ag⁺(aq) + Br⁻(aq) → AgBr(s), a cream precipitate, partially soluble in dilute and soluble in concentrated NH₃(aq).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is dilute nitric acid, and not dilute hydrochloric acid, added to a solution before testing it with aqueous silver nitrate?",
    options: [
      ["Hydrochloric acid adds chloride ions, which would precipitate silver chloride.", "Correct: the test would then always appear positive for chloride."],
      ["Nitric acid oxidises any iodide present, so silver iodide is not formed.", "Dilute nitric acid does not remove iodide; AgI still forms."],
      ["Hydrochloric acid is too weak to remove carbonate ions from the solution.", "Hydrochloric acid is a strong acid and would remove carbonate."],
      ["Nitric acid makes the silver halide precipitates dissolve in the ammonia.", "The acid's job is to remove carbonate, not to affect solubility in ammonia."],
    ],
    answer: "A",
    hints: ["What ions does each acid bring into the test tube?"],
    explanation: "Acid removes carbonate (which would give white Ag₂CO₃); nitric acid is used because its nitrate ions do not precipitate silver ions.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Separate samples of a solution containing one cation were tested.\n\n1. With aqueous sodium hydroxide: a grey-green precipitate that dissolves in excess to give a dark green solution.\n2. With aqueous ammonia: a grey-green precipitate, insoluble in excess.\n3. With aqueous ammonia: the precipitate turns brown on standing in air.\n\nWhich of the statements are correct for the cation chromium(III), Cr³⁺?",
    options: [
      ["1 and 2 only", "Correct: Cr(OH)₃ is amphoteric and does not darken in air."],
      ["1, 2 and 3", "Statement 3 describes Mn²⁺ or Fe²⁺, which are oxidised by air."],
      ["2 and 3 only", "Statement 1 is true for Cr³⁺ and statement 3 is not."],
      ["1 only", "Statement 2 is also true for Cr³⁺."],
    ],
    answer: "A",
    hints: ["Which hydroxides darken in air?"],
    explanation: "Cr³⁺ gives grey-green Cr(OH)₃, soluble in excess NaOH (dark green chromate(III) complex) but not in excess NH₃. Darkening in air is typical of Fe²⁺ and Mn²⁺.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about the test for sulfate ions are correct?\n\n1. The solution is acidified before aqueous barium chloride is added.\n2. Sulfite ions also give a white precipitate with barium ions, but it dissolves in excess dilute strong acid.\n3. Dilute sulfuric acid is a suitable acid for the acidification step.",
    options: [
      ["1 and 2 only", "Correct: sulfuric acid would add sulfate ions and give a false positive."],
      ["1, 2 and 3", "Statement 3 is wrong: H₂SO₄ itself contains sulfate ions."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also correct: BaSO₃ dissolves in acid but BaSO₄ does not."],
    ],
    answer: "A",
    hints: ["Which acid adds the very ion being tested for?"],
    explanation: "Acidify with dilute HCl or HNO₃; BaSO₄ is insoluble in excess acid, while BaSO₃ and BaCO₃ dissolve.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which reagent, added in excess, distinguishes a solution of aluminium ions from a solution of magnesium ions?",
    options: [
      ["aqueous sodium hydroxide", "Correct: Al(OH)₃ dissolves in excess NaOH; Mg(OH)₂ does not."],
      ["aqueous ammonia", "Both give white precipitates that are insoluble in excess ammonia."],
      ["aqueous barium chloride", "Barium ions test for anions; neither cation reacts."],
      ["dilute hydrochloric acid", "Neither ion gives a precipitate or a gas with dilute HCl."],
    ],
    answer: "A",
    hints: ["Which of the two hydroxides is amphoteric?"],
    explanation: "Al(OH)₃(s) + OH⁻(aq) → [Al(OH)₄]⁻(aq): the white precipitate dissolves. Mg(OH)₂ is basic only and stays.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS", applies: ZIM,
    stem: "Solutions **P** and **Q** each give a white precipitate with aqueous sodium hydroxide that dissolves in excess, and a white precipitate with aqueous ammonia that is insoluble in excess. **P** gives a bright yellow precipitate with aqueous potassium iodide; **Q** does not. What are **P** and **Q**?",
    options: [
      [t`**P** contains $\ce{Pb^2+}$; **Q** contains $\ce{Al^3+}$`, "Correct: both hydroxides are amphoteric; only Pb²⁺ forms yellow PbI₂."],
      [t`**P** contains $\ce{Al^3+}$; **Q** contains $\ce{Pb^2+}$`, "Reversed: aluminium iodide is soluble."],
      [t`**P** contains $\ce{Pb^2+}$; **Q** contains $\ce{Zn^2+}$`, "Zinc hydroxide would dissolve in excess ammonia."],
      [t`**P** contains $\ce{Zn^2+}$; **Q** contains $\ce{Al^3+}$`, "Zinc iodide is soluble and Zn(OH)₂ dissolves in excess ammonia."],
    ],
    answer: "A",
    hints: ["Which hydroxides dissolve in excess NaOH but not in excess ammonia?"],
    explanation: "Al³⁺ and Pb²⁺ behave the same with NaOH(aq) and NH₃(aq). Lead(II) iodide (bright yellow) or lead(II) chloride (white) precipitates tell them apart.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Aqueous ammonia gives no precipitate with a solution of calcium ions.",
    answer: true,
    explanation: "True. The hydroxide ion concentration in aqueous ammonia is too low to precipitate calcium hydroxide, which is fairly soluble; NaOH(aq) gives a white precipitate unless the solution is very dilute.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "When aluminium foil and aqueous sodium hydroxide are warmed with a nitrate, the gas given off relights a glowing splint.",
    answer: false,
    explanation: "False. The nitrate is reduced to ammonia, which turns damp red litmus paper blue. Oxygen relights a glowing splint.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each gas with its test result.",
    pairs: [
      ["carbon dioxide", "turns limewater milky"],
      ["hydrogen", "a lighted splint gives a squeaky pop"],
      ["oxygen", "relights a glowing splint"],
      ["chlorine", "bleaches damp litmus paper"],
      ["ammonia", "turns damp red litmus paper blue"],
    ],
    explanation: "These five tests appear in both boards' qualitative analysis notes.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each cation with what happens when aqueous ammonia is added until in excess.",
    pairs: [
      [t`$\ce{Cu^2+}$`, "pale blue ppt, dissolves to a dark blue solution"],
      [t`$\ce{Fe^2+}$`, "green ppt, insoluble, turns brown on standing"],
      [t`$\ce{Fe^3+}$`, "red-brown ppt, insoluble in excess"],
      [t`$\ce{Mn^2+}$`, "off-white ppt, insoluble, rapidly turns brown"],
    ],
    extraRight: ["white ppt, dissolves to a colourless solution"],
    hints: ["Only two common hydroxides dissolve in excess ammonia."],
    explanation: "Cu(OH)₂ dissolves as [Cu(NH₃)₄(H₂O)₂]²⁺; Fe(OH)₂ and Mn(OH)₂ are oxidised by air; Fe(OH)₃ is red-brown. The spare description is Zn²⁺.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the description of the halide tests.",
    template: "After acidifying with dilute nitric acid, aqueous silver nitrate gives a {{blank:a}} precipitate with chloride ions and a {{blank:b}} precipitate with iodide ions. The iodide precipitate is {{blank:c}} in aqueous ammonia.",
    blanks: [
      { id: "a", accepted: ["white"], choices: ["white", "cream", "pale yellow", "red-brown"] },
      { id: "b", accepted: ["pale yellow"], choices: ["white", "cream", "pale yellow", "red-brown"] },
      { id: "c", accepted: ["insoluble"], choices: ["soluble", "partially soluble", "insoluble"] },
    ],
    explanation: "AgCl white (soluble in dilute NH₃), AgBr cream (partially soluble), AgI pale yellow (insoluble).",
  });
  b.fib({
    d: 3, skill: "APPLICATION", applies: ZIM,
    stem: "Complete the description of the ZIMSEC tests for sulfur dioxide and the chromate(VI) ion.",
    template: "Sulfur dioxide turns acidified potassium dichromate(VI) from {{blank:a}} to {{blank:b}}. A yellow solution of chromate(VI) ions turns {{blank:c}} when dilute acid is added, and gives a {{blank:d}} precipitate with aqueous lead(II) ions.",
    blanks: [
      { id: "a", accepted: ["orange"], choices: ["orange", "green", "yellow", "purple"] },
      { id: "b", accepted: ["green"], choices: ["orange", "green", "yellow", "colourless"] },
      { id: "c", accepted: ["orange"], choices: ["orange", "green", "colourless", "blue"] },
      { id: "d", accepted: ["bright yellow"], choices: ["white", "bright yellow", "red-brown", "black"] },
    ],
    hints: ["SO₂ is a reducing agent; Cr(VI) is reduced to Cr(III)."],
    explanation: "SO₂ reduces Cr₂O₇²⁻ (orange) to Cr³⁺ (green). Acid converts yellow CrO₄²⁻ to orange Cr₂O₇²⁻ (2CrO₄²⁻ + 2H⁺ ⇌ Cr₂O₇²⁻ + H₂O); PbCrO₄ is a bright yellow precipitate.",
  });
  b.short({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A white solid fizzes with dilute hydrochloric acid, and the gas turns limewater milky. Give the formula of the anion present in the solid.",
    accepted: ["CO3 2-", "CO3^2-", "CO₃²⁻", "CO32-", "CO3(2-)", "carbonate", "CO3--"],
    normalise: ["trim", "lowercase", "collapse_whitespace"],
    wrong: ["CO2"],
    explanation: "Carbonate: CO₃²⁻(s or aq) + 2H⁺(aq) → CO₂(g) + H₂O(l). (A hydrogencarbonate would also fizz, but the solid-state carbonate is the expected deduction here.)",
  });
  b.short({
    d: 3, skill: "APPLICATION",
    stem: "Write the ionic equation, with state symbols, for the formation of the precipitate when aqueous barium chloride is added to acidified sodium sulfate solution (type, e.g., A + B -> C).",
    accepted: ["Ba2+(aq) + SO42-(aq) -> BaSO4(s)", "Ba2+(aq) + SO4 2-(aq) -> BaSO4(s)", "SO42-(aq) + Ba2+(aq) -> BaSO4(s)", "Ba2+(aq) + SO42-(aq) → BaSO4(s)", "Ba^2+(aq) + SO4^2-(aq) -> BaSO4(s)", "Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)"],
    normalise: ["trim", "collapse_whitespace"],
    wrong: ["BaCl2 + Na2SO4 -> BaSO4 + 2NaCl"],
    hints: ["Leave out the spectator ions Na⁺ and Cl⁻."],
    explanation: "Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s), a white precipitate insoluble in dilute acid.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why zinc hydroxide dissolves in both excess aqueous sodium hydroxide and excess aqueous ammonia, whereas magnesium hydroxide dissolves in neither.",
    points: [
      "Zinc hydroxide is amphoteric: it reacts with excess OH⁻ to form a soluble hydroxo complex ([Zn(OH)₄]²⁻)",
      "Zinc ions form a soluble ammine complex ([Zn(NH₃)₄]²⁺) with excess ammonia (ligand exchange)",
      "Magnesium hydroxide is purely basic and Mg²⁺ does not form a stable ammine complex, so the precipitate stays",
    ],
    modelAnswer: "Zn(OH)₂ is amphoteric, so with excess hydroxide ions it forms the soluble zincate ion, [Zn(OH)₄]²⁻. With excess ammonia, ammonia molecules act as ligands and form the soluble complex [Zn(NH₃)₄]²⁺. Mg(OH)₂ is basic, not amphoteric, and magnesium ions do not form an ammine complex, so it stays as a white precipitate in both.",
    hints: ["Two different reasons: amphoteric behaviour and complex formation."],
    explanation: "Excess NaOH dissolves amphoteric hydroxides; excess NH₃ dissolves hydroxides of ions that form ammine complexes (Cu²⁺, Zn²⁺).",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "You are given solutions of potassium chloride and potassium iodide in unlabelled bottles. Describe one chemical test that would identify each solution, giving the observation for both solutions.",
    points: [
      "Add dilute nitric acid, then aqueous silver nitrate",
      "Chloride: white precipitate",
      "Iodide: pale yellow precipitate",
      "Add aqueous ammonia: the chloride precipitate dissolves; the iodide precipitate does not (or: chlorine water turns the iodide solution brown, no change with chloride)",
    ],
    modelAnswer: "Acidify a sample of each with dilute nitric acid and add aqueous silver nitrate. Potassium chloride gives a white precipitate (AgCl) and potassium iodide a pale yellow precipitate (AgI). Adding dilute aqueous ammonia confirms it: the white precipitate dissolves, the yellow one does not.",
    hints: ["Give the result for both solutions, not just one."],
    explanation: "Silver halide colours and their solubility in ammonia separate Cl⁻ and I⁻.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4, applies: CAM,
    stem: "A white solid is either sodium nitrate or sodium nitrite. Describe how you would identify it, explaining your reasoning.",
    points: [
      "Warming with NaOH(aq) and aluminium foil gives ammonia with both, so it does not distinguish them",
      "Add the solution to acidified aqueous potassium manganate(VII)",
      "Nitrite decolourises it (purple to colourless) because nitrite is a reducing agent (oxidised to nitrate)",
      "Nitrate gives no change (the purple colour stays)",
    ],
    modelAnswer: "Both ions give ammonia (damp red litmus turns blue) when warmed with aqueous sodium hydroxide and aluminium foil, so that test cannot decide. Instead, add a few drops of the solution to acidified potassium manganate(VII). Nitrite ions reduce manganate(VII), so the purple colour disappears; nitrate ions are already fully oxidised and the solution stays purple.",
    hints: ["Which of the two ions can still be oxidised?"],
    explanation: "Nitrite (N +3) is a reducing agent; nitrate (N +5) is not. (ZIMSEC uses dilute acid instead: nitrite gives colourless NO that turns brown in air.)",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: t`Rudo tested a pale green crystalline solid **Y**, which dissolved in water to give a pale green solution.

| Test | Observation |
|---|---|
| 1. Add NaOH(aq) dropwise, then in excess, and warm | green precipitate, insoluble in excess, turning brown at the surface; on warming, a gas turned damp red litmus blue |
| 2. Add dilute HCl, then BaCl₂(aq) | white precipitate |
| 3. Add dilute HNO₃, then AgNO₃(aq) | no visible change |`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Identify the cation that gives the green precipitate (give its formula).", accepted: ["Fe2+", "Fe²⁺", "Fe 2+", "Fe^2+", "iron(II)", "iron(ii)", "iron 2+"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["Fe3+"], explanation: "A green hydroxide darkening in air is Fe(OH)₂: Fe²⁺." }),
      P.short({ label: "(b)", marks: 1, stem: "Identify the gas given off on warming.", accepted: ["ammonia", "NH3", "NH₃"], wrong: ["hydrogen"], explanation: "Damp red litmus turns blue: ammonia." }),
      P.short({ label: "(c)", marks: 1, stem: "Identify the second cation shown by the gas in (b) (give its formula).", accepted: ["NH4+", "NH₄⁺", "NH4⁺", "ammonium"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["NH3"], explanation: "Ammonium ions release NH₃ when warmed with hydroxide." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain what tests 2 and 3 show about the anions in **Y**.", points: ["Test 2: white precipitate with Ba²⁺ in acid is BaSO₄, so sulfate is present", "Test 3: no precipitate with Ag⁺, so no chloride, bromide or iodide"], modelAnswer: "The white precipitate with barium chloride in acid solution is barium sulfate, so SO₄²⁻ is present. No precipitate with acidified silver nitrate shows that no halide ions are present." }),
      P.manual({ label: "(e)", marks: 2, stem: "Write ionic equations for the formation of the green precipitate and for the release of the gas.", points: ["Fe²⁺(aq) + 2OH⁻(aq) → Fe(OH)₂(s)", "NH₄⁺(aq) + OH⁻(aq) → NH₃(g) + H₂O(l)"], modelAnswer: "Fe²⁺(aq) + 2OH⁻(aq) → Fe(OH)₂(s); NH₄⁺(aq) + OH⁻(aq) → NH₃(g) + H₂O(l)." }),
      P.manual({ label: "(f)", marks: 1, stem: "Explain why the green precipitate turns brown at the surface.", points: ["Iron(II) hydroxide is oxidised by oxygen in the air to (red-brown) iron(III) hydroxide"], modelAnswer: "Oxygen from the air oxidises iron(II) hydroxide at the surface to red-brown iron(III) hydroxide." }),
    ],
    hints: ["Warming with NaOH tests for NH₄⁺.", "Acid then Ba²⁺ tests for sulfate."],
    explanation: "Y contains Fe²⁺, NH₄⁺ and SO₄²⁻ (it is ammonium iron(II) sulfate, a common pale green double salt).",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: t`Three bottles have lost their labels. They contain aqueous solutions of aluminium nitrate, zinc sulfate and magnesium chloride, labelled **A**, **B** and **C** at random. Tendai has aqueous sodium hydroxide, aqueous ammonia, dilute nitric acid, aqueous silver nitrate and aqueous barium nitrate.`,
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe what all three solutions do with aqueous sodium hydroxide, added dropwise and then in excess, and say what this shows.", points: ["All three give a white precipitate with a few drops", "The precipitates from aluminium nitrate and zinc sulfate dissolve in excess (amphoteric hydroxides), but magnesium chloride's stays, which identifies it"], modelAnswer: "Each gives a white precipitate at first. In excess NaOH the precipitates from the aluminium and zinc solutions dissolve to colourless solutions, because Al(OH)₃ and Zn(OH)₂ are amphoteric; the Mg(OH)₂ precipitate does not dissolve, so that bottle is magnesium chloride." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain how aqueous ammonia distinguishes the aluminium and zinc solutions.", points: ["Both give a white precipitate with a little ammonia", "Zinc's dissolves in excess ammonia (ammine complex); aluminium's does not"], modelAnswer: "With aqueous ammonia both give white precipitates; in excess the zinc hydroxide dissolves, forming [Zn(NH₃)₄]²⁺, while aluminium hydroxide does not dissolve." }),
      P.mcq({ label: "(c)", stem: "Which reagents would confirm the anion in magnesium chloride?", options: [
        ["dilute nitric acid, then aqueous silver nitrate", "Correct: a white precipitate of AgCl, soluble in dilute ammonia."],
        ["dilute nitric acid, then aqueous barium nitrate", "This tests for sulfate; it would identify the zinc sulfate bottle."],
        ["aqueous sodium hydroxide and aluminium foil, warm", "This tests for nitrate; it would identify the aluminium nitrate bottle."],
        ["aqueous ammonia, added until in excess", "Ammonia identifies cations, not the chloride ion."],
      ], answer: "A", explanation: "Ag⁺(aq) + Cl⁻(aq) → AgCl(s)." }),
      P.fib({ label: "(d)", stem: "Complete the expected observations.", template: "Zinc sulfate with acidified barium nitrate: {{blank:a}}. Aluminium nitrate with acidified silver nitrate: {{blank:b}}.", blanks: [
        { id: "a", accepted: ["white precipitate"], choices: ["white precipitate", "cream precipitate", "no visible change", "effervescence"] },
        { id: "b", accepted: ["no visible change"], choices: ["white precipitate", "pale yellow precipitate", "no visible change", "effervescence"] },
      ], explanation: "BaSO₄ is white; silver nitrate does not precipitate nitrate ions." }),
      P.short({ label: "(e)", marks: 1, stem: "Write the formula of the soluble aluminium-containing ion formed when aluminium hydroxide dissolves in excess aqueous sodium hydroxide.", accepted: ["[Al(OH)4]-", "Al(OH)4-", "[Al(OH)₄]⁻", "Al(OH)₄⁻", "[Al(OH)4]⁻", "[Al(OH)6]3-", "Al(OH)6 3-", "[Al(OH)₆]³⁻"], normalise: ["trim", "collapse_whitespace"], wrong: ["Al3+"], explanation: "Al(OH)₃(s) + OH⁻(aq) → [Al(OH)₄]⁻(aq) (also written [Al(OH)₆]³⁻)." }),
    ],
    hints: ["Use the behaviour in excess of each reagent.", "Choose the anion test that matches the anion."],
    explanation: "NaOH in excess picks out Mg²⁺ (insoluble); ammonia in excess separates Zn²⁺ (dissolves) from Al³⁺; the anion tests confirm Cl⁻, SO₄²⁻ and NO₃⁻.",
  });
  b.card("FACT", "NaOH(aq) and NH₃(aq) with Cu²⁺", "Pale blue ppt with both; insoluble in excess NaOH; dissolves in excess NH₃ to a dark blue solution.");
  b.card("FACT", "Hydroxides that dissolve in excess NaOH(aq)", "Al³⁺, Zn²⁺, Cr³⁺ (dark green solution) and Pb²⁺ (ZIMSEC): amphoteric hydroxides.");
  b.card("FACT", "Fe²⁺ vs Fe³⁺ with NaOH(aq)", "Fe²⁺: green ppt, turns brown on standing (oxidised by air). Fe³⁺: red-brown ppt. Both insoluble in excess.");
  b.card("FACT", "Silver halide precipitates", "AgCl white (soluble in dilute NH₃); AgBr cream (partially soluble); AgI pale yellow (insoluble).");
  b.card("CONCEPT", "Test for sulfate", "Acidify (dilute HCl or HNO₃), add Ba²⁺(aq): white ppt of BaSO₄, insoluble in excess acid. Never acidify with H₂SO₄.");
  b.card("CONCEPT", "Test for nitrate", "Warm with NaOH(aq) and Al foil: NH₃ given off, turns damp red litmus blue. (Nitrite does the same.)");
  b.card("FACT", "Gas tests", "NH₃: damp red litmus blue. CO₂: limewater milky. Cl₂: bleaches damp litmus. H₂: pops. O₂: relights glowing splint. SO₂: acidified dichromate orange → green.");
  b.card("CONCEPT", "Ca²⁺ and Ba²⁺ with the alkalis", "No ppt with NH₃(aq). NaOH(aq): white ppt with Ca²⁺ (unless very dilute), little or none with Ba²⁺.");
  b.card("CONCEPT", "Observation vs deduction", "Observation: 'effervescence; gas turned limewater milky'. Deduction: 'CO₂, so carbonate present'.");
  b.card("FACT", "Distinguishing Pb²⁺ from Al³⁺ (ZIMSEC)", "Both: white ppt soluble in excess NaOH, insoluble in NH₃. Pb²⁺ gives white PbCl₂ with Cl⁻ and yellow PbI₂ with I⁻.", undefined, { applies: ZIM });
});
