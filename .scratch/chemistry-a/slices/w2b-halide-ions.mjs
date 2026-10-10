// W2b: achem.group17.halide-ions (both boards; ZIMSEC Form 5, Cambridge AS Level).
import { concept, P, t, Mr, AR, VM_RTP, molesFromSolution, sfStr, chk } from "../lib.mjs";

concept("achem.group17.halide-ions", { file: "group17/halide-ions", keyPrefix: "group17.halide-ions" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which halide ion is the strongest reducing agent?",
    options: [
      [t`$\ce{I-}$`, "Correct: it is the largest, so it loses an electron most easily."],
      [t`$\ce{Cl-}$`, "Chloride is the weakest reducing agent of the three."],
      [t`$\ce{Br-}$`, "Bromide is intermediate."],
      [t`$\ce{F-}$`, "Fluoride is an extremely weak reducing agent."],
    ],
    answer: "A",
    explanation: "Reducing power increases down the group: Cl⁻ < Br⁻ < I⁻.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which gas is the only product (apart from NaHSO₄) when concentrated sulfuric acid is added to solid sodium chloride?",
    options: [
      ["hydrogen chloride", "Correct: chloride is too weak a reducing agent to reduce H₂SO₄."],
      ["chlorine", "Chloride is not oxidised by concentrated sulfuric acid."],
      ["sulfur dioxide", "SO₂ forms with bromides and iodides, which reduce the acid."],
      ["hydrogen sulfide", "H₂S forms only with iodides."],
    ],
    answer: "A",
    explanation: "NaCl + H₂SO₄ → NaHSO₄ + HCl (steamy fumes).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A solution gives a white precipitate with acidified silver nitrate that dissolves in dilute aqueous ammonia. Which ion is present?",
    options: [
      ["chloride", "Correct: AgCl is white and soluble in dilute ammonia."],
      ["bromide", "AgBr is cream and dissolves only in concentrated ammonia."],
      ["iodide", "AgI is pale yellow and insoluble in ammonia."],
      ["nitrate", "Nitrate gives no precipitate with silver ions."],
    ],
    answer: "A",
    explanation: "Ag⁺ + Cl⁻ → AgCl(s), white; it dissolves in dilute NH₃(aq).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about the reaction of solid sodium bromide with concentrated sulfuric acid are correct?\n\n1. Orange-brown fumes are seen.\n2. Sulfur is reduced from +6 to +4.\n3. Hydrogen sulfide is produced.",
    options: [
      ["1 and 2 only", "Correct: HBr is not a strong enough reducing agent to form H₂S."],
      ["1, 2 and 3", "Statement 3 is false: H₂S forms only with iodides."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: SO₂ forms."],
    ],
    answer: "A",
    hints: ["How far can bromide reduce sulfur?"],
    explanation: "2HBr + H₂SO₄ → Br₂ + SO₂ + 2H₂O: bromine fumes; S +6 → +4 only.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is iodide a stronger reducing agent than chloride?",
    options: [
      ["Its outer electrons are further from the nucleus and more shielded.", "Correct: the larger ion holds its outer electrons less strongly."],
      ["It has fewer electrons than chloride, so it loses them more easily.", "Iodide has more electrons than chloride."],
      ["Its nuclear charge is smaller than the nuclear charge of chloride.", "Iodine has the larger nuclear charge."],
      ["Iodine is a more electronegative element than chlorine.", "Iodine is less electronegative."],
    ],
    answer: "A",
    hints: ["A reducing agent gives away electrons."],
    explanation: "Larger ion → outer electrons less tightly held → stronger reducing agent.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In the reaction 8HI + H₂SO₄ → 4I₂ + H₂S + 4H₂O, what is the change in the oxidation number of sulfur?",
    options: [
      ["+6 to −2", "Correct: sulfur gains eight electrons."],
      ["+6 to +4", "This is the change when SO₂ forms."],
      ["+4 to −2", "Sulfur starts at +6 in H₂SO₄."],
      ["+6 to 0", "This is the change when sulfur (the element) forms."],
    ],
    answer: "A",
    hints: ["Hydrogen is +1 in H₂S."],
    explanation: "H₂SO₄: S +6; H₂S: S −2. The iodide ions (−1) are oxidised to I₂ (0).",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A solid potassium halide gives purple fumes, a yellow solid and a smell of bad eggs with concentrated sulfuric acid. Its solution would give which result with acidified silver nitrate followed by concentrated ammonia?",
    options: [
      ["pale yellow precipitate, insoluble in concentrated ammonia", "Correct: the halide is iodide (purple I₂, S and H₂S)."],
      ["cream precipitate, soluble in concentrated ammonia", "This is bromide, which gives only SO₂ and Br₂."],
      ["white precipitate, soluble in dilute ammonia", "This is chloride, which gives only HCl."],
      ["no precipitate forms, because silver iodide is soluble", "Silver iodide is insoluble: a pale yellow precipitate forms."],
    ],
    answer: "A",
    hints: ["Which halide reduces sulfur all the way to H₂S?"],
    explanation: "Iodide: I₂ (purple fumes), S (yellow), H₂S (bad eggs); AgI is pale yellow and insoluble in ammonia.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Describe how you would use aqueous silver nitrate and aqueous ammonia to distinguish solutions of sodium bromide and sodium iodide.",
    points: [
      "Acidify each with dilute nitric acid, then add aqueous silver nitrate",
      "Bromide gives a cream precipitate; iodide gives a pale yellow precipitate",
      "Add concentrated aqueous ammonia: the bromide's precipitate dissolves, the iodide's does not",
    ],
    modelAnswer: "Acidify a sample of each solution with dilute nitric acid and add aqueous silver nitrate. Sodium bromide gives a cream precipitate of AgBr and sodium iodide a pale yellow precipitate of AgI. Because these colours are similar, add concentrated aqueous ammonia: silver bromide dissolves, silver iodide does not.",
    hints: ["The colours alone are hard to tell apart."],
    explanation: "Precipitate colour plus solubility in concentrated ammonia.",
  });
  {
    const n = molesFromSolution(20, 0.15);
    const m = n * Mr("AgCl");
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: "Excess acidified silver nitrate is added to 20.0 cm³ of 0.150 mol dm⁻³ sodium chloride. Calculate the mass of silver chloride formed, in g, to three significant figures. (Ar: Ag 107.9, Cl 35.5)",
      value: m, sf: 3, unit: "g",
      wrong: [sfStr(n * Mr("AgNO3"), 3)],
      explanation: `n(Cl⁻) = 20.0 ÷ 1000 × 0.150 = ${sfStr(n, 3)} mol = n(AgCl); Mr(AgCl) = 143.4; mass = ${sfStr(n, 3)} × 143.4 = ${sfStr(m, 3)} g.`,
    });
  }
  {
    const nAgI = 0.94 / Mr("AgI");
    const mKI = nAgI * Mr("KI");
    const pct = (mKI / 0.75) * 100;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "0.750 g of impure potassium iodide gave 0.940 g of silver iodide with excess acidified silver nitrate. Calculate the percentage by mass of KI in the sample, to three significant figures. (Mr: AgI 234.8, KI 166.0)",
      value: pct, sf: 3, unit: "%",
      wrong: [sfStr((0.94 / 0.75) * 100, 3)],
      hints: ["One mole of KI gives one mole of AgI."],
      explanation: `1. n(AgI) = 0.940 ÷ 234.8 = ${sfStr(nAgI, 3)} mol = n(KI).\n2. Mass of KI = ${sfStr(nAgI, 3)} × 166.0 = ${sfStr(mKI, 3)} g.\n3. Percentage = ${sfStr(mKI, 3)} ÷ 0.750 × 100 = ${sfStr(pct, 3)}%. Dividing the mass of AgI by the sample mass gives ${sfStr((0.94 / 0.75) * 100, 3)}%, which is impossible.`,
    });
  }
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "By how much does the oxidation number of sulfur change when concentrated sulfuric acid is reduced to hydrogen sulfide? (Give the size of the change.)",
    value: chk(6 - -2, 8),
    wrong: [4, 2],
    hints: ["Find the oxidation number of S in H₂SO₄ and in H₂S."],
    explanation: "From +6 in H₂SO₄ to −2 in H₂S: a change of 8, so each sulfur atom gains eight electrons.",
  });
  {
    const nNaBr = 2.06 / Mr("NaBr");
    const v = (nNaBr / 2) * VM_RTP * 1000;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "2.06 g of sodium bromide reacts with excess concentrated sulfuric acid. Assuming all the HBr formed reacts as 2HBr + H₂SO₄ → Br₂ + SO₂ + 2H₂O, calculate the volume of sulfur dioxide, in cm³ at room conditions, to three significant figures. (Mr NaBr 102.9; molar gas volume 24.0 dm³ mol⁻¹)",
      value: v, sf: 3, unit: "cm³",
      wrong: [sfStr(v * 2, 3)],
      hints: ["One NaBr gives one HBr; two HBr give one SO₂."],
      explanation: `1. n(NaBr) = 2.06 ÷ 102.9 = ${sfStr(nNaBr, 3)} mol = n(HBr).\n2. n(SO₂) = ${sfStr(nNaBr, 3)} ÷ 2 = ${sfStr(nNaBr / 2, 3)} mol.\n3. V = ${sfStr(nNaBr / 2, 3)} × 24 000 = ${sfStr(v, 3)} cm³. A 1 : 1 ratio gives ${sfStr(v * 2, 3)} cm³.`,
    });
  }
  {
    const nAg = molesFromSolution(12.4, 0.01);
    const mg = (nAg / 0.05) * AR.Cl * 1000;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "A 50.0 cm³ sample of borehole water from near Gweru was titrated with 0.0100 mol dm⁻³ silver nitrate; 12.40 cm³ was needed to precipitate all the chloride. Calculate the chloride concentration in mg dm⁻³, to three significant figures. (Ar Cl 35.5)",
      value: mg, sf: 3,
      wrong: [sfStr(nAg * AR.Cl * 1000, 3)],
      hints: ["Find mol dm⁻³ of Cl⁻ first, then convert to mg dm⁻³."],
      explanation: `1. n(Ag⁺) = 12.40 ÷ 1000 × 0.0100 = ${sfStr(nAg, 3)} mol = n(Cl⁻).\n2. [Cl⁻] = ${sfStr(nAg, 3)} ÷ 0.0500 = ${sfStr(nAg / 0.05, 3)} mol dm⁻³.\n3. × 35.5 × 1000 = ${sfStr(mg, 3)} mg dm⁻³. Forgetting to scale from 50.0 cm³ to 1 dm³ gives ${sfStr(nAg * AR.Cl * 1000, 3)} mg.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In the reaction of sodium iodide with concentrated sulfuric acid, the iodide ions act as a reducing agent.",
    answer: true,
    explanation: "True. Iodide ions are oxidised (−1 to 0) and reduce sulfur (from +6 to +4, 0 or −2).",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each halide with the colour of its silver halide precipitate.",
    pairs: [
      ["chloride", "white"],
      ["bromide", "cream"],
      ["iodide", "pale yellow"],
    ],
    extraRight: ["red-brown"],
    explanation: "AgCl white, AgBr cream, AgI pale yellow.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each observation in the reaction of NaI with concentrated sulfuric acid to the substance responsible.",
    pairs: [
      ["steamy fumes", "hydrogen iodide"],
      ["purple fumes", "iodine"],
      ["yellow solid", "sulfur"],
      ["smell of bad eggs", "hydrogen sulfide"],
    ],
    extraRight: ["chlorine"],
    hints: ["Four products form as sulfur is reduced further and further."],
    explanation: "HI (fumes), I₂ (purple), S (yellow), H₂S (bad eggs). No chlorine is involved.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Complete the equations and oxidation numbers for sodium bromide with concentrated sulfuric acid.",
    template: "In the first step the products are NaHSO₄ and {{blank:a}}. In the second step HBr reduces the acid, giving bromine, water and {{blank:b}}. Bromine changes from oxidation number −1 to {{blank:c}} and sulfur from +6 to {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["HBr"], choices: ["HBr", "Br2", "H2"] },
      { id: "b", accepted: ["SO2"], choices: ["SO2", "S", "H2S"] },
      { id: "c", accepted: ["0"], choices: ["0", "+1", "−2"] },
      { id: "d", accepted: ["+4"], choices: ["+4", "0", "−2"] },
    ],
    hints: ["Bromide can reduce sulfuric acid only as far as SO₂."],
    explanation: "Acid-base step then redox: Br −1 → 0; S +6 → +4.",
  });
  b.short({
    d: 3, skill: "APPLICATION",
    stem: "Write the balanced equation for the reaction of hydrogen iodide with sulfuric acid that forms sulfur (the element) (type, e.g., 6A + B -> 3C + D + 4E).",
    accepted: ["6HI + H2SO4 -> 3I2 + S + 4H2O", "6HI + H2SO4 → 3I2 + S + 4H2O"],
    normalise: ["trim", "collapse_whitespace"],
    wrong: ["2HI + H2SO4 -> I2 + S + 2H2O"],
    hints: ["Sulfur gains six electrons; each iodide loses one."],
    explanation: "6HI + H₂SO₄ → 3I₂ + S + 4H₂O: six electrons lost by 6I⁻, six gained by S (+6 → 0).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe what you would see when concentrated sulfuric acid is added to solid sodium bromide, and identify the substance responsible for each observation.",
    points: [
      "Steamy (misty) fumes: hydrogen bromide",
      "Orange-brown fumes/vapour: bromine",
      "Colourless choking gas (detected by its smell or by acidified dichromate turning green): sulfur dioxide",
    ],
    modelAnswer: "Steamy fumes of hydrogen bromide appear first, then orange-brown fumes of bromine, and a colourless, choking gas, sulfur dioxide, is given off (it turns acidified potassium dichromate(VI) from orange to green).",
    hints: ["Three products besides NaHSO₄ and water."],
    explanation: "HBr, Br₂ and SO₂.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain why concentrated sulfuric acid produces only hydrogen chloride with sodium chloride, but produces iodine and hydrogen sulfide with sodium iodide.",
    points: [
      "Both first form the hydrogen halide (acid-base reaction)",
      "Iodide (HI) is a much stronger reducing agent than chloride (HCl)",
      "because the I⁻ ion is larger, its outer electrons are further from the nucleus and more shielded, so are lost more easily",
      "HI reduces S from +6 to −2 (H₂S) and is oxidised to I₂; HCl/Cl⁻ cannot reduce H₂SO₄ at all",
    ],
    modelAnswer: "Each salt first gives its hydrogen halide in an acid-base reaction. Chloride is a very weak reducing agent, so HCl cannot reduce concentrated sulfuric acid and the reaction stops there. Iodide is a much stronger reducing agent because the large I⁻ ion holds its outer electrons further from the nucleus with more shielding, so it loses them easily. HI reduces the sulfur in H₂SO₄ from +6 all the way to −2 (H₂S), and the iodide is oxidised to iodine.",
    hints: ["Link the products to the reducing power of the halide."],
    explanation: "Reducing power controls how far sulfuric acid is reduced.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: "Three white solids, **X**, **Y** and **Z**, are sodium chloride, sodium bromide and sodium iodide, in some order. Tests:\n\n| Test | **X** | **Y** | **Z** |\n|---|---|---|---|\n| solution + dilute HNO₃ + AgNO₃(aq) | cream ppt | white ppt | pale yellow ppt |\n| solid + concentrated H₂SO₄ | steamy fumes, orange-brown fumes | steamy fumes only | purple fumes, yellow solid, bad-egg smell |",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Identify **X**.", accepted: ["sodium bromide", "NaBr"], wrong: ["sodium chloride"], explanation: "Cream AgBr and bromine fumes." }),
      P.short({ label: "(b)", marks: 1, stem: "Identify **Z**.", accepted: ["sodium iodide", "NaI"], wrong: ["sodium bromide"], explanation: "Pale yellow AgI; I₂, S and H₂S." }),
      P.mcq({ label: "(c)", stem: "Which further test would confirm that the precipitate from **Y** is silver chloride?", options: [
        ["It dissolves in dilute aqueous ammonia.", "Correct: only AgCl dissolves in dilute NH₃."],
        ["It dissolves in dilute nitric acid.", "Silver halides do not dissolve in dilute nitric acid."],
        ["It turns blue in sunlight.", "Silver halides darken (grey-purple) in sunlight; this does not identify chloride."],
        ["It gives a gas with aqueous sodium hydroxide.", "No gas is formed."],
      ], answer: "A", explanation: "AgCl dissolves in dilute NH₃(aq); AgBr only in concentrated; AgI not at all." }),
      P.short({ label: "(d)", marks: 1, stem: "Write the equation for the reaction of solid **Y** with concentrated sulfuric acid (type, e.g., A + B -> C + D).", accepted: ["NaCl + H2SO4 -> NaHSO4 + HCl", "NaCl + H2SO4 → NaHSO4 + HCl", "NaCl(s) + H2SO4(l) -> NaHSO4(s) + HCl(g)"], normalise: ["trim", "collapse_whitespace"], wrong: ["2NaCl + H2SO4 -> Na2SO4 + Cl2"], explanation: "NaCl + H₂SO₄ → NaHSO₄ + HCl." }),
      P.manual({ label: "(e)", marks: 2, stem: "Write the equation for the reaction of HBr with sulfuric acid and give the oxidation-number changes.", points: ["2HBr + H₂SO₄ → Br₂ + SO₂ + 2H₂O", "Br: −1 → 0 (oxidised); S: +6 → +4 (reduced)"], modelAnswer: "2HBr + H₂SO₄ → Br₂ + SO₂ + 2H₂O. Bromine is oxidised from −1 to 0 and sulfur reduced from +6 to +4." }),
      P.manual({ label: "(f)", marks: 2, stem: "State two safety precautions for the tests with concentrated sulfuric acid.", points: ["Use a fume cupboard: HBr, SO₂, Br₂ and H₂S are toxic", "Wear eye protection (and gloves): concentrated H₂SO₄ is corrosive; use small amounts"], modelAnswer: "Carry out the tests in a fume cupboard because toxic gases (SO₂, bromine, H₂S) form, and wear eye protection and gloves because concentrated sulfuric acid is corrosive." }),
    ],
    hints: ["Use the precipitate colours first.", "How far each halide reduces sulfuric acid shows its reducing power."],
    explanation: "X NaBr, Y NaCl, Z NaI.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: "A mixture of sodium chloride and sodium nitrate of mass 1.200 g was dissolved in water and made up to 100 cm³. 25.0 cm³ of this solution was acidified with dilute nitric acid and excess silver nitrate solution added. The precipitate was filtered, washed, dried and weighed: 0.530 g.",
    parts: (() => {
      const nAgCl = 0.53 / Mr("AgCl");
      const nTot = nAgCl * 4;
      const mNaCl = nTot * Mr("NaCl");
      const pct = (mNaCl / 1.2) * 100;
      return [
        P.short({ label: "(a)", marks: 1, stem: "Name the precipitate.", accepted: ["silver chloride", "AgCl"], wrong: ["silver nitrate"], explanation: "AgCl; nitrate ions give no precipitate." }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the amount, in mol, of precipitate, to three significant figures. (Mr AgCl 143.4)", value: nAgCl, sf: 3, unit: "mol", explanation: `0.530 ÷ 143.4 = ${sfStr(nAgCl, 3)} mol.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the mass, in g, of sodium chloride in the original 1.200 g mixture, to three significant figures. (Mr NaCl 58.5)", value: mNaCl, sf: 3, unit: "g", wrong: [sfStr(nAgCl * Mr("NaCl"), 3)], explanation: `In 25.0 cm³: ${sfStr(nAgCl, 3)} mol Cl⁻; in 100 cm³: × 4 = ${sfStr(nTot, 3)} mol; mass = ${sfStr(nTot, 3)} × 58.5 = ${sfStr(mNaCl, 3)} g. Forgetting the factor of 4 gives ${sfStr(nAgCl * Mr("NaCl"), 3)} g.` }),
        P.num({ label: "(d)", marks: 1, stem: "Calculate the percentage by mass of sodium chloride in the mixture, to three significant figures.", value: pct, sf: 3, unit: "%", explanation: `${sfStr(mNaCl, 3)} ÷ 1.200 × 100 = ${sfStr(pct, 3)}%.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why the precipitate is washed and then dried to constant mass, and why it should be kept out of bright light.", points: ["Washing removes soluble substances (excess AgNO₃, NaNO₃) that would add mass; drying to constant mass removes all water", "Silver chloride decomposes (darkens) in light, forming silver and losing chlorine, which changes the mass"], modelAnswer: "Washing removes soluble silver nitrate and sodium nitrate that would otherwise be weighed with the precipitate, and drying to constant mass ensures no water remains. Silver chloride is light-sensitive: it decomposes to silver and loses chlorine, so it is kept in the dark." }),
        P.manual({ label: "(f)", marks: 1, stem: "Explain why nitric acid, not hydrochloric acid, is used to acidify the solution.", points: ["Hydrochloric acid would add chloride ions, increasing the mass of AgCl"], modelAnswer: "Hydrochloric acid contains chloride ions, which would also precipitate as AgCl and make the result too high." }),
      ];
    })(),
    hints: ["Only the chloride forms a precipitate.", "Scale the 25.0 cm³ result up to 100 cm³."],
    explanation: "Gravimetric determination of chloride with silver nitrate.",
  });
  b.card("CONCEPT", "Reducing power of halide ions", "Cl⁻ < Br⁻ < I⁻: larger ion, outer electrons further from nucleus and more shielded, more easily lost.");
  b.card("FACT", "Silver halides with ammonia", "AgCl white, dissolves in dilute NH₃. AgBr cream, dissolves in concentrated NH₃. AgI pale yellow, insoluble.");
  b.card("FORMULA", "NaCl with concentrated H₂SO₄", "NaCl + H₂SO₄ → NaHSO₄ + HCl (steamy fumes; no redox).");
  b.card("FORMULA", "NaBr with concentrated H₂SO₄", "NaBr + H₂SO₄ → NaHSO₄ + HBr; 2HBr + H₂SO₄ → Br₂ + SO₂ + 2H₂O (S +6 → +4).");
  b.card("FORMULA", "NaI with concentrated H₂SO₄", "HI reduces H₂SO₄ to SO₂, S (6HI + H₂SO₄ → 3I₂ + S + 4H₂O) and H₂S (8HI + H₂SO₄ → 4I₂ + H₂S + 4H₂O).");
  b.card("FACT", "Observations: NaI + concentrated H₂SO₄", "Steamy fumes (HI), purple fumes/black solid (I₂), yellow solid (S), bad-egg smell (H₂S).");
  b.card("CONCEPT", "Why acidify with HNO₃ before Ag⁺", "Removes carbonate; nitric acid adds no halide ions (HCl would give AgCl).");
  b.card("FACT", "Oxidation states of S reached with halides", "Cl⁻: none (+6). Br⁻: +4 (SO₂). I⁻: +4, 0 and −2 (SO₂, S, H₂S).");
});
