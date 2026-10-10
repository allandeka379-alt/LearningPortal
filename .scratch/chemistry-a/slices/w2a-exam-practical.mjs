// W2a: both-board practical exam-format item: one PLANNING question (15 marks, ZIMSEC Paper 4 planning/design and
// Cambridge Paper 5 question 1 style): determining Ka of ethanoic acid with a pH meter by half-neutralisation.
import { concept, P, t, ce, EXAM, checkExam, molesFromSolution, pHWeakAcid, kaFromPKa, sfStr, dpStr, sciStr } from "../lib.mjs";

const A = (k) => `achem.${k}`;
const PL = { skill: EXAM.PLANNING.skill, secs: EXAM.PLANNING.secs, examStyle: true, paper: "Paper 4 (ZIMSEC), Paper 5 (CIE)" };

concept(A("skills.planning-evaluation"), { file: "exam/w2a-practical", keyPrefix: "exam.w2a-practical" }, (b) => {
  {
    const cAcid = 0.08, vAcid = 25.0, cBase = 0.1;
    const vEq = (molesFromSolution(vAcid, cAcid) / cBase) * 1000;
    const pH0 = pHWeakAcid(1.7e-5, cAcid);
    const Ka = kaFromPKa(4.74);
    b.struct({
      ...PL, d: 4, calculator: true,
      concepts: [A("skills.planning-evaluation"), A("acids.weak-acids-bases"), A("acids.buffers")],
      stem: t`You are to plan an experiment to determine the acid dissociation constant, Ka, of ethanoic acid using a pH meter.

When a weak acid HA is titrated with sodium hydroxide, at the point where exactly half of the acid has been neutralised the solution contains equal amounts of HA and $\ce{A-}$, so $[\ce{H+}] = K_\text{a}$ and pH = pKa.

You are provided with: ethanoic acid of concentration about 0.08 mol dm⁻³; 0.100 mol dm⁻³ sodium hydroxide; a pH meter with buffer solutions of pH 4.00 and 7.00; and normal laboratory apparatus. Ka of ethanoic acid is expected to be about 1.7 × 10⁻⁵ mol dm⁻³.`,
      parts: checkExam(EXAM.PLANNING, [
        P.manual({ label: "(a)", marks: 2, stem: "Predict the pH at the half-neutralisation point and describe in words the shape of the graph of pH against volume of NaOH added.", points: ["pH at half-neutralisation ≈ pKa = −log(1.7 × 10⁻⁵) ≈ 4.8", "Graph starts at about pH 3, rises slowly through a buffer region (flattest around half-neutralisation), then rises steeply from about 7 to 11 at the equivalence point and levels off at about 12"], modelAnswer: "At half-neutralisation pH = pKa ≈ 4.8. The curve starts near pH 3, rises gradually through a buffer region (least steep around half-neutralisation), then rises steeply from about pH 7 to 11 at the equivalence point, and finally levels off at about 12." }),
        P.manual({ label: "(b)", marks: 2, stem: "Identify the independent variable, the dependent variable and two variables to be controlled.", points: ["Independent: volume of NaOH added; dependent: pH of the mixture", "Controlled (any two): temperature; volume and concentration of the ethanoic acid; concentration of NaOH; thorough stirring before each reading"], modelAnswer: "Independent variable: volume of sodium hydroxide added. Dependent variable: pH. Controlled: temperature (Ka depends on temperature) and the volume and concentration of the ethanoic acid (and of the NaOH)." }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the volume of 0.100 mol dm⁻³ sodium hydroxide needed to reach the equivalence point if 25.0 cm³ of 0.0800 mol dm⁻³ ethanoic acid is used.", value: vEq, sf: 3, unit: "cm³", wrong: [25], explanation: `n(acid) = 0.0250 × 0.0800 = ${sciStr(molesFromSolution(vAcid, cAcid), 3)} mol; V(NaOH) = ${sciStr(molesFromSolution(vAcid, cAcid), 3)} ÷ 0.100 × 1000 = ${sfStr(vEq, 3)} cm³, so a 50 cm³ burette is suitable.` }),
        P.num({ label: "(d)", marks: 1, stem: "Calculate the expected pH of the 0.0800 mol dm⁻³ ethanoic acid before any alkali is added, to two decimal places (use Ka = 1.7 × 10⁻⁵ mol dm⁻³).", value: pH0, dp: 2, explanation: `[H⁺] = √(1.7 × 10⁻⁵ × 0.0800) = ${sciStr(Math.sqrt(1.7e-5 * 0.08), 3)}; pH = ${dpStr(pH0, 2)}.` }),
        P.manual({ label: "(e)", marks: 4, stem: "Describe a step-by-step method, naming the apparatus.", points: ["Calibrate the pH meter with the pH 7.00 and pH 4.00 buffer solutions (rinse the electrode with distilled water between solutions)", "Use a pipette (with filler) to transfer 25.0 cm³ of ethanoic acid into a beaker; fill a burette with 0.100 mol dm⁻³ NaOH", "Add NaOH in 1.00 cm³ portions (smaller portions, e.g. 0.20 cm³, near the expected equivalence at about 20 cm³), stirring and recording the pH after each addition once the reading is steady", "Continue to about 30 cm³ (well past equivalence); repeat the whole titration to check reliability"], modelAnswer: "Calibrate the pH meter using the pH 7.00 and 4.00 buffers, rinsing the probe with distilled water each time. Pipette 25.0 cm³ of ethanoic acid into a beaker with a magnetic stirrer and fill a burette with 0.100 mol dm⁻³ sodium hydroxide. Record the initial pH, then add the alkali 1.00 cm³ at a time, stirring and waiting for a steady reading before recording the pH and burette reading. Near 20 cm³ add smaller portions (about 0.20 cm³). Continue to about 30 cm³. Repeat the whole procedure." }),
        P.manual({ label: "(f)", marks: 1, stem: "State one safety precaution.", points: ["Wear eye protection: sodium hydroxide is corrosive (and ethanoic acid is an irritant)"], modelAnswer: "Wear eye protection, because sodium hydroxide is corrosive to the eyes." }),
        P.manual({ label: "(g)", marks: 1, stem: "Describe a suitable results table.", points: ["Two columns headed 'volume of NaOH added / cm³' (to 0.05 cm³) and 'pH' (to 2 d.p. or as the meter allows), no units in the body"], modelAnswer: "A table with columns 'volume of NaOH added / cm³' (to two decimal places) and 'pH' (to two decimal places)." }),
        P.num({ label: "(h)", marks: 2, stem: "From a plot of the results, a student found the equivalence volume to be 20.00 cm³ and read the pH at 10.00 cm³ as 4.74. Calculate Ka, in mol dm⁻³, to two significant figures.", value: Ka, sf: 2, unit: "mol/dm³", wrong: [kaFromPKa(4.74 * 2)], explanation: `10.00 cm³ is half of 20.00 cm³, so pKa = pH = 4.74; Ka = 10⁻⁴·⁷⁴ = ${sciStr(Ka, 2)} mol dm⁻³.` }),
      ]),
      hints: ["At half-neutralisation [HA] = [A⁻], so pH = pKa.", "Calibrate the meter first."],
      explanation: `Equivalence at ${sfStr(vEq, 3)} cm³; initial pH about ${dpStr(pH0, 2)}; half-neutralisation pH 4.74 gives Ka = ${sciStr(Ka, 2)} mol dm⁻³.`,
    });
  }
});
