// W2a: achem.acids.titration-curves-indicators (both boards; ZIMSEC Form 5, Cambridge AS Level; half-equivalence pH = pKa is ZIMSEC detail)
import { concept, P, t, ce, ZIM, pH, pHStrongBase, pHWeakAcid, pKa, kaFromPKa, KW, molesFromSolution, sfStr, dpStr, sciStr, rnd } from "../lib.mjs";

function waSb(vA, cA, cB, v, Ka) {
  const nA = molesFromSolution(vA, cA), nB = molesFromSolution(v, cB), V = (vA + v) / 1000;
  if (v === 0) return pHWeakAcid(Ka, cA);
  if (nB < nA - 1e-12) return pKa(Ka) + Math.log10(nB / (nA - nB));
  if (Math.abs(nA - nB) < 1e-12) return pHStrongBase(Math.sqrt((KW / Ka) * (nA / V)));
  return pHStrongBase((nB - nA) / V);
}
const RANGES = "Data (pH ranges): methyl orange 2.9–4.6; bromophenol blue 3.0–4.5; phenolphthalein 8.3–10.0; thymolphthalein 9.3–10.5.";

concept("achem.acids.titration-curves-indicators", { file: "acids/titration-curves-indicators", keyPrefix: "acids.titration-curves-indicators" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the pH at the equivalence point when hydrochloric acid is titrated with sodium hydroxide at 298 K?",
    options: [
      ["7", "Correct: strong acid and strong base give a neutral salt, NaCl."],
      ["about 9", "That is typical of a weak acid–strong base titration."],
      ["about 5", "That is typical of a strong acid–weak base titration."],
      ["about 1", "That is the starting pH of 0.1 mol dm⁻³ HCl, before any alkali is added."],
    ],
    answer: "A",
    explanation: "Strong acid–strong base: the equivalence point is at pH 7, in the middle of a steep section from about 3 to 11.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `Aqueous ammonia is titrated with hydrochloric acid. ${RANGES} Which indicator is most suitable?`,
    options: [
      ["methyl orange", "Correct: the vertical section is about pH 3–7, which contains the methyl orange range."],
      ["phenolphthalein", "Its range lies above the vertical section, so it would change gradually before equivalence."],
      ["thymolphthalein", "Its range (9.3–10.5) is far from the steep part of a strong acid–weak base curve."],
      ["no indicator would be suitable", "That is true for weak acid–weak base titrations, but HCl is strong."],
    ],
    answer: "A",
    explanation: "Strong acid–weak base: equivalence below 7, steep section about 3–7. Methyl orange (2.9–4.6) changes sharply there.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: `Ethanoic acid is titrated with sodium hydroxide. ${RANGES} Which indicator is most suitable?`,
    options: [
      ["phenolphthalein", "Correct: its range lies within the vertical section (about 7–11) of a weak acid–strong base curve."],
      ["methyl orange", "Its range lies in the buffer region, so it would change slowly long before equivalence."],
      ["bromophenol blue", "Like methyl orange, it changes in the buffer region, well before equivalence."],
      ["no indicator would be suitable", "A weak acid–strong base titration does have a steep section."],
    ],
    answer: "A",
    explanation: "Weak acid–strong base: equivalence above 7; use phenolphthalein (8.3–10.0) or thymolphthalein.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A pH curve starts at pH 2.9, rises quickly to about 4, then rises slowly over most of the titration before a steep rise from about 7 to 11 at equivalence. Which titration does it show?",
    options: [
      ["a weak acid in the flask, with a strong base added", "Correct: high starting pH, buffer region, steep section above 7."],
      ["a strong acid in the flask, with a strong base added", "A strong acid starts near pH 1 and has a steep section from about 3 to 11."],
      ["a strong acid in the flask, with a weak base added", "This would start near pH 1 and have its steep section below 7."],
      ["a weak acid in the flask, with a weak base added", "That curve has no steep section at all."],
    ],
    answer: "A",
    hints: ["Use the starting pH and the position of the steep section."],
    explanation: "A starting pH of about 3 means a weak acid; a buffer region followed by a steep rise from 7 to 11 means a strong base is added.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about the titration of ethanoic acid with aqueous ammonia are correct?\n\n1. The pH curve has no vertical section at the equivalence point.\n2. Phenolphthalein gives a sharp end-point.\n3. The equivalence point can be found with a pH meter or by conductivity.",
    options: [
      ["1 and 3 only", "Correct: weak-weak titrations change pH gradually; instrumental methods still locate equivalence."],
      ["1, 2 and 3", "Statement 2 is false: with no steep section, every indicator changes gradually."],
      ["2 and 3 only", "Statement 2 is false and statement 1 is true."],
      ["1 only", "Statement 3 is also true: a meter or conductivity measurements can locate the equivalence point."],
    ],
    answer: "A",
    hints: ["What must the curve have for an indicator to work?"],
    explanation: "With a weak acid and a weak base the pH changes gradually through equivalence, so no indicator gives a sharp colour change.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", applies: ZIM,
    stem: "In the titration of a weak acid HA with sodium hydroxide, which statements about the half-equivalence point are correct?\n\n1. [HA] = [A⁻].\n2. pH = pKa of the acid.\n3. pH = 7.",
    options: [
      ["1 and 2 only", "Correct: half the acid is converted to A⁻, so Ka = [H⁺] and pH = pKa."],
      ["1, 2 and 3", "Statement 3 is false: pH = pKa, which is below 7 for a typical weak acid."],
      ["2 and 3 only", "Statement 1 is true; statement 3 is false."],
      ["1 only", "Statement 2 also follows from Ka = [H⁺][A⁻]/[HA] with [HA] = [A⁻]."],
    ],
    answer: "A",
    hints: ["Substitute [HA] = [A⁻] into the Ka expression."],
    explanation: "At half-equivalence, Ka = [H⁺], so pH = pKa: a quick way to measure pKa.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is the equivalence point above pH 7 when ethanoic acid is titrated with sodium hydroxide?",
    options: [
      ["Ethanoate ions react with water to form hydroxide ions.", "Correct: CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻, so the salt solution is alkaline."],
      ["Excess sodium hydroxide is always present at equivalence.", "At equivalence neither reactant is in excess."],
      ["Sodium ions react with water to form hydrogen ions.", "Na⁺ does not react with water; it is a spectator ion."],
      ["Ethanoic acid molecules remain undissociated.", "At equivalence the acid has been converted into ethanoate."],
    ],
    answer: "A",
    hints: ["What is the conjugate base of a weak acid like?"],
    explanation: "Sodium ethanoate solution is alkaline because the ethanoate ion is a weak base.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: `A student titrates aqueous ammonia with hydrochloric acid using phenolphthalein. ${RANGES} What will happen?`,
    options: [
      ["The colour fades gradually long before equivalence, so the titre is too small.", "Correct: on a strong acid–weak base curve, pH 8–10 is passed slowly in the ammonia buffer region, before equivalence."],
      ["The colour changes sharply at the equivalence point, so the titre is correct.", "The steep part of this curve is about pH 3–7, not 8–10."],
      ["The colour never changes, because the pH never falls below 8.3.", "The pH falls below 7 by the end of the titration."],
      ["The colour changes after equivalence, so the titre is too large.", "Acid is being added, so the pH falls through 10 to 8 before reaching equivalence (below 7)."],
    ],
    answer: "A",
    hints: ["Where on this curve is the pH between 8 and 10?"],
    explanation: "Adding acid to ammonia, the pH falls slowly through 10 → 8 in the buffer region, well before the equivalence point at about pH 5. Phenolphthalein loses its colour gradually and too early.",
  });
  {
    const v = (molesFromSolution(15.0, 0.12) / 0.1) * 1000;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: "15.0 cm³ of 0.120 mol dm⁻³ ethanoic acid is titrated with 0.100 mol dm⁻³ sodium hydroxide. Calculate the volume of alkali, in cm³, needed to reach the equivalence point.",
      value: v, sf: 3, unit: "cm³",
      wrong: [15],
      explanation: `n(acid) = 0.0150 × 0.120 = ${sciStr(molesFromSolution(15.0, 0.12), 3)} mol; V = ${sciStr(molesFromSolution(15.0, 0.12), 3)} ÷ 0.100 × 1000 = ${sfStr(v, 3)} cm³ (1 : 1). The weakness of the acid does not change the equivalence volume.`,
    });
  }
  {
    const Ka = kaFromPKa(3.85);
    b.calc({
      d: 3, skill: "ANALYSIS", calculator: true, applies: ZIM,
      stem: "A weak monobasic acid is titrated with sodium hydroxide. The equivalence point is at 22.70 cm³ and the pH after 11.35 cm³ is 3.85. Calculate Ka of the acid, in mol dm⁻³, to three significant figures.",
      value: Ka, sf: 3, unit: "mol/dm³",
      wrong: [kaFromPKa(3.85 * 2)],
      hints: ["11.35 cm³ is half the equivalence volume.", "At half-equivalence pH = pKa."],
      explanation: `1. 11.35 cm³ = ½ × 22.70 cm³: the half-equivalence point, where [HA] = [A⁻].\n2. So pKa = pH = 3.85.\n3. Ka = 10⁻³·⁸⁵ = ${sciStr(Ka, 3)} mol dm⁻³.`,
    });
  }
  {
    const c = (molesFromSolution(21.6, 0.125) / 25.0) * 1000;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "25.0 cm³ of a solution of a weak monobasic acid is titrated with 0.125 mol dm⁻³ potassium hydroxide using a pH meter. The steep section of the curve is centred on 21.60 cm³. Calculate the concentration of the acid, in mol dm⁻³, to three significant figures.",
      value: c, sf: 3, unit: "mol/dm³",
      wrong: [sfStr(0.125 * 25 / 21.6, 3)],
      hints: ["The middle of the steep section is the equivalence point."],
      explanation: `1. n(KOH) = 0.02160 × 0.125 = ${sciStr(molesFromSolution(21.6, 0.125), 3)} mol = n(acid).\n2. c = ${sciStr(molesFromSolution(21.6, 0.125), 3)} ÷ 0.0250 = ${sfStr(c, 3)} mol dm⁻³. Inverting the volume ratio gives ${sfStr(0.125 * 25 / 21.6, 3)}.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Any indicator whose colour changes between pH 3 and pH 11 is suitable for titrating hydrochloric acid with sodium hydroxide.",
    answer: true,
    explanation: "True. The vertical section of a strong acid–strong base curve runs from about 3 to 11, so methyl orange, bromophenol blue, phenolphthalein and thymolphthalein all work.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The volume of sodium hydroxide needed to reach the equivalence point is smaller for 0.1 mol dm⁻³ ethanoic acid than for the same volume of 0.1 mol dm⁻³ hydrochloric acid.",
    answer: false,
    explanation: "False. Both monobasic acids contain the same amount of acid, so the equivalence volumes are equal; only the shape of the curve differs.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each titration (acid in the flask) with the approximate pH at its equivalence point.",
    pairs: [
      ["hydrochloric acid with sodium hydroxide", "7"],
      ["ethanoic acid with sodium hydroxide", "about 9"],
      ["hydrochloric acid with aqueous ammonia", "about 5"],
      ["ethanoic acid with aqueous ammonia", "about 7, with no steep rise"],
    ],
    hints: ["Is the salt formed neutral, acidic or alkaline?"],
    explanation: "Strong-strong: NaCl is neutral. Ethanoate is a weak base (pH > 7); ammonium is a weak acid (pH < 7). Ethanoic acid and ammonia have similar strengths (Ka ≈ Kb), so equivalence is near 7, but with no steep section.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences about indicators.",
    template: "An indicator is a weak {{blank:a}} whose two forms have different colours. It is suitable when its whole colour-change range lies within the {{blank:b}} section of the pH curve.",
    blanks: [
      { id: "a", accepted: ["acid"], choices: ["acid", "salt", "metal"] },
      { id: "b", accepted: ["vertical"], choices: ["vertical", "buffer", "final"] },
    ],
    explanation: "Indicators are weak acids (HIn ⇌ H⁺ + In⁻); the range must fall on the steep (vertical) part of the curve.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the colour of phenolphthalein in an alkaline solution of pH 11.",
    accepted: ["pink", "magenta", "pink-red", "red-pink", "purple-pink", "pinkish"],
    wrong: ["colourless"],
    explanation: "Phenolphthalein is colourless below about 8.3 and pink above about 10.0.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why methyl orange is not a suitable indicator for the titration of ethanoic acid with sodium hydroxide.",
    points: ["Methyl orange changes colour between about pH 2.9 and 4.6", "In this titration that pH range is passed in the early or buffer part of the curve, where the pH rises slowly", "so the colour would change gradually over many cm³ before the equivalence point (above pH 7): no sharp end-point"],
    modelAnswer: "Methyl orange changes colour between about pH 3 and 4.5. For a weak acid–strong base titration, the vertical section is from about 7 to 11; the pH passes through 3–4.5 early on, in the buffer region where it rises slowly. The indicator would change gradually over several cm³, well before equivalence, so the end-point would be early and indistinct.",
    hints: ["Compare the range with where the curve is steep."],
    explanation: "The indicator range must lie on the vertical section.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe in words the pH curve when 0.1 mol dm⁻³ sodium hydroxide is added to 25 cm³ of 0.1 mol dm⁻³ hydrochloric acid, up to 40 cm³ of alkali.",
    points: ["Starts at pH 1 and rises slowly (to about 2–3) as alkali is added", "Almost vertical rise from about pH 3 to 11 at 25 cm³, with the equivalence point at pH 7", "After equivalence the pH levels off at about 12–13"],
    modelAnswer: "The pH starts at 1 and rises only slowly while acid remains in excess. Near 25 cm³ it rises almost vertically, from about 3 to about 11, with the equivalence point at pH 7. After that the curve flattens and approaches about 12–13, the pH of the sodium hydroxide.",
    hints: ["Describe the start, the steep part and the end."],
    explanation: "A full description gives the start, the steep section and its volume, the equivalence pH and the final level.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain how an indicator HIn changes colour, using the equilibrium HIn ⇌ H⁺ + In⁻.",
    points: ["HIn and In⁻ have different colours", "Adding acid moves the equilibrium left (colour of HIn); adding alkali removes H⁺ and moves it right (colour of In⁻)"],
    modelAnswer: "The undissociated indicator HIn and its conjugate base In⁻ are different colours. In acid, high [H⁺] moves the position to the left, so the HIn colour shows; in alkali, OH⁻ removes H⁺, the position moves right and the In⁻ colour shows.",
    explanation: "Le Chatelier applied to the indicator equilibrium.",
  });
  // Structured: pH-meter titration of a weak acid
  {
    const Ka = 2.4e-5, vA = 25.0, cA = 0.08, cB = 0.1;
    const vols = [0, 4, 10, 16, 19, 20, 21, 24, 30];
    const pHs = vols.map((v) => rnd(waSb(vA, cA, cB, v, Ka), 2));
    const vEq = (molesFromSolution(vA, cA) / cB) * 1000;
    const c = cA;
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `Farai titrated 25.0 cm³ of a solution of a weak monobasic acid, HY, with 0.100 mol dm⁻³ sodium hydroxide, using a pH meter. ${RANGES}

| NaOH added / cm³ | ${vols.map((v) => dpStr(v, 1)).join(" | ")} |
|---|---|---|---|---|---|---|---|---|---|
| pH | ${pHs.map((p) => dpStr(p, 2)).join(" | ")} |`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "State the volume of sodium hydroxide, in cm³, at the equivalence point.", value: vEq, sf: 3, unit: "cm³", explanation: `The steepest rise is centred on ${sfStr(vEq, 3)} cm³.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the concentration of HY, in mol dm⁻³.", value: c, sf: 3, unit: "mol/dm³", wrong: [sfStr((0.1 * 25) / vEq, 3)], explanation: `n(NaOH) = ${sfStr(vEq, 3)}/1000 × 0.100 = ${sciStr(molesFromSolution(vEq, cB), 3)} mol = n(HY); c = ${sciStr(molesFromSolution(vEq, cB), 3)} ÷ 0.0250 = ${sfStr(c, 3)} mol dm⁻³.` }),
        P.mcq({ label: "(c)", marks: 1, stem: "Which indicator would be most suitable for this titration?", options: [
          ["phenolphthalein", "Correct: 8.3–10.0 lies within the steep section (about 7–11)."],
          ["methyl orange", "Its range (2.9–4.6) is passed near the start, before the steep section."],
          ["bromophenol blue", "Its range (3.0–4.5) is passed near the start, before the steep section."],
          ["none of these indicators", "This curve has a clear vertical section, so an indicator can be used."],
        ], answer: "A", explanation: "The steep part runs from about 7 to 11." }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain, with an equation, why the pH at the equivalence point is above 7.", points: ["At equivalence the solution contains the salt NaY; Y⁻ is the conjugate base of a weak acid", "Y⁻ + H₂O ⇌ HY + OH⁻, so [OH⁻] > [H⁺]"], modelAnswer: "At equivalence the flask contains sodium salt NaY. Y⁻ is the conjugate base of a weak acid and reacts with water: Y⁻ + H₂O ⇌ HY + OH⁻, producing OH⁻ ions, so the pH is above 7." }),
        P.manual({ label: "(e)", marks: 2, stem: "Describe and explain the shape of the curve between 4 cm³ and 16 cm³ of alkali.", points: ["The pH rises only slowly (a buffer region)", "because the solution contains both HY and its conjugate base Y⁻, which removes added OH⁻ (HY + OH⁻ → Y⁻ + H₂O)"], modelAnswer: "The pH changes very little: this is a buffer region. The mixture contains both the weak acid HY and its salt NaY, and added OH⁻ ions are removed by reaction with HY (HY + OH⁻ → Y⁻ + H₂O)." }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain why the starting pH is higher than that of 0.0800 mol dm⁻³ hydrochloric acid (pH 1.10).", points: ["HY is a weak acid, only partially dissociated", "so [H⁺] is much smaller than 0.0800 mol dm⁻³, giving a higher pH"], modelAnswer: "HY is a weak acid: only a small fraction of its molecules dissociate, so [H⁺] is far less than 0.0800 mol dm⁻³ and the pH is higher than 1.10." }),
        P.fib({ label: "(g)", marks: 1, stem: "Classify the titration.", template: "This is a {{blank:a}} acid–strong base titration.", blanks: [{ id: "a", accepted: ["weak"], choices: ["weak", "strong"] }], explanation: "Weak acid in the flask, strong base added." }),
        P.tf({ label: "(h)", marks: 1, stem: "If the experiment were repeated with 25.0 cm³ of hydrochloric acid of the same concentration as the HY solution, the equivalence volume would be different.", answer: false, explanation: "False: the same amount of monobasic acid needs the same amount of NaOH." }),
      ],
      hints: ["Find where the pH rises most steeply.", "A weak acid–strong base curve has a buffer region."],
      explanation: `Equivalence at ${sfStr(vEq, 3)} cm³; [HY] = ${sfStr(c, 3)} mol dm⁻³; phenolphthalein; equivalence pH above 7 because Y⁻ is basic; buffer region from 4 to 16 cm³.`,
    });
  }
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    stem: `Thandeka has to choose indicators for three titrations. ${RANGES}

- Titration 1: aqueous ammonia with hydrochloric acid
- Titration 2: ethanoic acid with sodium hydroxide
- Titration 3: ethanoic acid with aqueous ammonia`,
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which indicator should she use for titration 1?", options: [
        ["methyl orange", "Correct: the steep section is about 3–7."],
        ["phenolphthalein", "Its range lies outside the steep section of a strong acid–weak base curve."],
        ["thymolphthalein", "Its range (9.3–10.5) is far above the steep section."],
        ["either phenolphthalein or thymolphthalein", "Neither range lies on the steep section, which ends near pH 7."],
      ], answer: "A", explanation: "Strong acid–weak base." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which indicator should she use for titration 2?", options: [
        ["phenolphthalein", "Correct: weak acid–strong base, steep section about 7–11."],
        ["methyl orange", "Its range is passed in the buffer region, too early."],
        ["bromophenol blue", "Its range is passed in the buffer region, too early."],
        ["either methyl orange or bromophenol blue", "Both change in the buffer region, before equivalence."],
      ], answer: "A", explanation: "Weak acid–strong base." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain your choice for titration 2.", points: ["The equivalence point is above 7 and the steep section runs from about 7 to 11", "Phenolphthalein's range (8.3–10.0) lies wholly within the steep section, so one drop changes it sharply"], modelAnswer: "In a weak acid–strong base titration the equivalence point is above pH 7 and the pH rises steeply from about 7 to 11. Phenolphthalein changes between 8.3 and 10.0, entirely within that section, so a single drop at equivalence turns it from colourless to pink." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why none of the indicators is suitable for titration 3.", points: ["Weak acid–weak base: the pH changes gradually, with no vertical section at equivalence", "so any indicator changes colour gradually over several cm³ and the end-point cannot be seen sharply"], modelAnswer: "With a weak acid and a weak base the pH rises gradually through the equivalence point and there is no steep section, so every indicator changes colour slowly over several cm³ and no sharp end-point is seen." }),
      P.short({ label: "(e)", marks: 1, stem: "State the colour change of phenolphthalein at the end-point of titration 2 (alkali added to acid).", accepted: ["colourless to pink", "colorless to pink", "colourless to pale pink", "colourless to magenta", "colourless → pink", "from colourless to pink"], wrong: ["pink to colourless"], explanation: "Colourless (acid) to pink (alkali)." }),
      P.tf({ label: "(f)", marks: 1, stem: "Methyl orange would be yellow at the equivalence point of titration 2.", answer: true, explanation: "True: the pH at equivalence is above 7, well above 4.6, so methyl orange is yellow (it changed earlier, which is why it is unsuitable)." }),
    ],
    hints: ["Identify strong and weak partners first."],
    explanation: "1: methyl orange; 2: phenolphthalein (colourless to pink); 3: no indicator (no steep section).",
  });
  b.card("DEFINITION", "Equivalence point", "The point at which stoichiometric amounts of acid and base have reacted.");
  b.card("DEFINITION", "End-point", "The point at which the indicator changes colour; it should coincide with the equivalence point.");
  b.card("CONCEPT", "Choosing an indicator", "Its whole pH range must lie within the vertical section of the titration curve.");
  b.card("FACT", "Strong acid–strong base curve", "Starts about pH 1; steep from about 3 to 11; equivalence at pH 7; any common indicator.");
  b.card("FACT", "Weak acid–strong base curve", "Starts about pH 3; buffer region; steep about 7–11; equivalence above 7; phenolphthalein.");
  b.card("FACT", "Strong acid–weak base curve", "Starts about pH 1; steep about 3–7; equivalence below 7; methyl orange.");
  b.card("FACT", "Weak acid–weak base curve", "No vertical section: no indicator suitable; use a pH meter or conductivity.");
  b.card("FACT", "Phenolphthalein and methyl orange colours", "Phenolphthalein: colourless (acid) → pink (alkali), 8.3–10.0. Methyl orange: red → yellow, 2.9–4.6.");
  b.card("CONCEPT", "Half-equivalence point (ZIMSEC)", "In a weak acid titration, at half the equivalence volume [HA] = [A⁻], so pH = pKa.", undefined, { applies: ZIM });
});
