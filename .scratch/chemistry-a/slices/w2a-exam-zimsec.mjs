// W2a: ZIMSEC-only exam-format items: three Paper 3 Section A free-response questions (15 marks: equilibria, acids and
// bases, kinetics) and one Paper 4 quantitative analysis question (20 marks: sodium thiosulfate–acid clock reaction,
// order with respect to thiosulfate from rates).
import { concept, P, t, ce, EXAM, checkExam, ZIM, ice, partialPressures, kEq, pH, pOH, orderFrom, rateConstant, rateFrom, halfLifeFromK, round, sfStr, dpStr, sciStr, chk } from "../lib.mjs";

const A = (k) => `achem.${k}`;
const P3 = { skill: EXAM.ZIM_P3_FREE.skill, secs: EXAM.ZIM_P3_FREE.secs, applies: EXAM.ZIM_P3_FREE.applies, examStyle: true, paper: "Paper 3 Section A" };
const P4 = { skill: EXAM.ZIM_P4_QUANTITATIVE.skill, secs: EXAM.ZIM_P4_QUANTITATIVE.secs, applies: EXAM.ZIM_P4_QUANTITATIVE.applies, examStyle: true, paper: "Paper 4" };

concept(A("equilibria.dynamic-le-chatelier"), { file: "exam/w2a-zimsec", keyPrefix: "exam.w2a-zimsec", applies: ZIM }, (b) => {
  // ---------------------------------------------------------------- Z1: dinitrogen tetroxide equilibrium
  {
    const n = ice({ N2O4: 2.0, NO2: 0 }, { N2O4: -1, NO2: 2 }, "N2O4", -0.7);
    const tot = n.N2O4 + n.NO2;
    const pp = partialPressures(n, 200);
    const Kp = kEq([[2, pp.NO2.p]], [[1, pp.N2O4.p]]);
    b.struct({
      ...P3, d: 4, calculator: true,
      concepts: [A("equilibria.dynamic-le-chatelier"), A("equilibria.kc-kp")],
      stem: t`Dinitrogen tetroxide (colourless) dissociates into nitrogen dioxide (brown): $\ce{N2O4(g) <=> 2NO2(g)}$, ΔH = +57 kJ mol⁻¹. 2.00 mol of $\ce{N2O4}$ was placed in a sealed container and allowed to reach equilibrium at a constant temperature and a total pressure of 200 kPa. At equilibrium, 35.0% of the $\ce{N2O4}$ had dissociated.`,
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({ label: "(a)", marks: 3, stem: "Explain what is meant by a *dynamic equilibrium* and state Le Chatelier's principle.", points: ["Forward and reverse reactions continue at equal rates", "so concentrations (and colour, pressure) remain constant, in a closed system", "Le Chatelier: if conditions are changed, the position of equilibrium moves to oppose the change"], modelAnswer: "In a dynamic equilibrium the forward and reverse reactions both continue, at the same rate, so the concentrations of all species stay constant; this requires a closed system. Le Chatelier's principle states that if the conditions of a system at equilibrium are changed, the position of equilibrium moves so as to oppose the change." }),
        P.group({ label: "(b)", stem: "For the equilibrium mixture, calculate:", parts: [
          P.num({ label: "(i)", marks: 1, stem: "the total amount of gas, in mol;", value: tot, sf: 3, unit: "mol", wrong: [2.0], explanation: `N₂O₄ dissociated = 0.350 × 2.00 = 0.700 mol, forming 1.40 mol NO₂; N₂O₄ left = ${sfStr(n.N2O4, 3)} mol; total = ${sfStr(tot, 3)} mol.` }),
          P.num({ label: "(ii)", marks: 2, stem: "the partial pressure of NO₂, in kPa, to three significant figures;", value: pp.NO2.p, sf: 3, unit: "kPa", wrong: [(1.4 / 2.0) * 200], explanation: `x(NO₂) = 1.40 ÷ ${sfStr(tot, 3)} = ${sfStr(pp.NO2.x, 3)}; p = ${sfStr(pp.NO2.x, 3)} × 200 = ${sfStr(pp.NO2.p, 3)} kPa.` }),
          P.num({ label: "(iii)", marks: 2, stem: "Kp, to three significant figures.", value: Kp, sf: 3, unit: "kPa", wrong: [pp.NO2.p / pp.N2O4.p], explanation: `p(N₂O₄) = ${sfStr(pp.N2O4.p, 3)} kPa; Kp = ${sfStr(pp.NO2.p, 4)}² ÷ ${sfStr(pp.N2O4.p, 4)} = ${sfStr(Kp, 3)} kPa. Forgetting to square p(NO₂) gives ${sfStr(pp.NO2.p / pp.N2O4.p, 3)}.` }),
        ] }),
        P.short({ label: "(c)", marks: 1, stem: "Give the units of Kp for this equilibrium.", accepted: ["kPa", "kpa", "kilopascals"], wrong: ["kPa-1"], explanation: "kPa² ÷ kPa = kPa." }),
        P.manual({
          label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
          stem: "Describe and explain what would be observed, and what would happen to the value of Kp, when (i) the temperature of the equilibrium mixture is raised at constant pressure and (ii) the mixture is compressed to a higher pressure at constant temperature.",
          points: [
            "(i) The forward reaction is endothermic, so raising the temperature moves the position to the right",
            "(i) More brown NO₂ forms: the mixture becomes darker brown",
            "(i) Kp increases",
            "(ii) Higher pressure moves the position to the left, the side with fewer moles of gas (1 mol against 2 mol)",
            "(ii) After an immediate darkening (more molecules per unit volume), the colour becomes paler as NO₂ is converted to N₂O₄",
            "(ii) Kp is unchanged, because only temperature changes Kp",
          ],
          modelAnswer: "(i) The forward reaction is endothermic (ΔH = +57 kJ mol⁻¹). On heating, the position of equilibrium moves in the endothermic direction, to the right, to absorb the added energy. More brown nitrogen dioxide forms, so the mixture becomes darker, and because the equilibrium now contains more product, Kp increases.\n\n(ii) Compressing the gas immediately increases the concentration of NO₂, so the colour first darkens. The system then opposes the increase in pressure by moving to the side with fewer gas molecules, the left (1 mol of N₂O₄ against 2 mol of NO₂), so some brown NO₂ turns into colourless N₂O₄ and the colour becomes paler again. Kp is unchanged, because it depends only on temperature.",
        }),
      ]),
      hints: ["Use the 1 : 2 mole ratio for the change.", "Partial pressure = mole fraction × total pressure."],
      explanation: `Total ${sfStr(tot, 3)} mol; p(NO₂) = ${sfStr(pp.NO2.p, 3)} kPa; Kp = ${sfStr(Kp, 3)} kPa; heating darkens the gas and raises Kp; compression shifts the position left with Kp unchanged.`,
    });
  }

  // ---------------------------------------------------------------- Z2: acids, bases and buffers (pOH and Kb)
  {
    const pHBa = 14 - pOH(0.03);
    const oh = Math.sqrt(1.8e-5 * 0.15);
    const pHN = 14 + Math.log10(oh);
    const pOHbuf = -Math.log10(1.8e-5) + Math.log10(0.1 / 0.15);
    const pHbuf = 14 - pOHbuf;
    b.struct({
      ...P3, d: 4, calculator: true,
      concepts: [A("acids.bronsted-lowry"), A("acids.ph-kw"), A("acids.weak-acids-bases"), A("acids.buffers"), A("acids.titration-curves-indicators")],
      stem: "This question is about bases. Data at 298 K: pKw = 14.00; Kb of ammonia = 1.8 × 10⁻⁵ mol dm⁻³. Indicator pH ranges: methyl orange 2.9–4.6; phenolphthalein 8.3–10.0.",
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({ label: "(a)", marks: 2, stem: "Define a Brønsted-Lowry base and identify the two conjugate acid-base pairs in NH₃ + H₂O ⇌ NH₄⁺ + OH⁻.", points: ["A base is a proton (H⁺) acceptor", "Pairs: NH₄⁺/NH₃ and H₂O/OH⁻"], modelAnswer: "A Brønsted-Lowry base is a proton acceptor. The conjugate pairs are NH₄⁺ (acid) / NH₃ (base) and H₂O (acid) / OH⁻ (base)." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the pH of 0.0150 mol dm⁻³ barium hydroxide, Ba(OH)₂, using pOH, to two decimal places.", value: pHBa, dp: 2, wrong: [dpStr(14 - pOH(0.015), 2)], explanation: `[OH⁻] = 2 × 0.0150 = 0.0300 mol dm⁻³; pOH = ${dpStr(pOH(0.03), 2)}; pH = 14.00 − ${dpStr(pOH(0.03), 2)} = ${dpStr(pHBa, 2)}.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the pH of 0.150 mol dm⁻³ aqueous ammonia, to two decimal places.", value: pHN, dp: 2, wrong: [dpStr(-Math.log10(oh), 2)], explanation: `[OH⁻] = √(1.8 × 10⁻⁵ × 0.150) = ${sciStr(oh, 3)}; pOH = ${dpStr(-Math.log10(oh), 2)}; pH = ${dpStr(pHN, 2)}.` }),
        P.num({ label: "(d)", marks: 2, stem: "A buffer contains 0.150 mol dm⁻³ ammonia and 0.100 mol dm⁻³ ammonium chloride. Calculate its pH, to two decimal places.", value: pHbuf, dp: 2, wrong: [dpStr(pOHbuf, 2)], explanation: `pOH = pKb + log([NH₄⁺]/[NH₃]) = ${dpStr(-Math.log10(1.8e-5), 2)} + log(0.100/0.150) = ${dpStr(pOHbuf, 2)}; pH = ${dpStr(pHbuf, 2)}.` }),
        P.manual({
          label: "(e)", marks: 5, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
          stem: "25.0 cm³ of 0.100 mol dm⁻³ aqueous ammonia is titrated with 0.100 mol dm⁻³ hydrochloric acid. Describe the shape of the pH titration curve and explain which indicator should be used.",
          points: [
            "Starts at about pH 11 (weak base) and falls slowly in a buffer region (NH₃/NH₄⁺)",
            "Steep (vertical) section from about pH 7 to 3 at 25.0 cm³ of acid",
            "Equivalence point below 7 (about 5) because NH₄⁺ is a weak acid (NH₄⁺ ⇌ NH₃ + H⁺)",
            "After equivalence the pH levels off at about 1–2",
            "Methyl orange, because its range (2.9–4.6) lies within the steep section; phenolphthalein would change gradually in the buffer region",
          ],
          modelAnswer: "The pH starts at about 11 because ammonia is a weak base. As acid is added the pH falls slowly through a buffer region containing ammonia and ammonium ions. Near 25.0 cm³ the pH drops steeply from about 7 to about 3; the equivalence point is below 7, at about pH 5, because ammonium ions are weakly acidic. After equivalence the curve levels off towards pH 1–2. Methyl orange should be used because its colour change (2.9–4.6) falls within the steep section; phenolphthalein would change gradually over many cm³ in the buffer region, well before equivalence.",
        }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain how the hydrogencarbonate system keeps the pH of blood almost constant when acid enters the blood.", points: ["Added H⁺ reacts with HCO₃⁻: H⁺ + HCO₃⁻ → H₂CO₃", "H₂CO₃ forms CO₂ + H₂O and the CO₂ is breathed out, so [H⁺] changes very little"], modelAnswer: "H⁺ ions combine with hydrogencarbonate ions to form carbonic acid, H⁺ + HCO₃⁻ → H₂CO₃, which breaks down into water and carbon dioxide that is exhaled, so the pH of the blood hardly changes." }),
      ]),
      hints: ["pH = 14.00 − pOH.", "[OH⁻] = √(Kb c) for a weak base.", "pOH = pKb + log([salt]/[base]) for a basic buffer."],
      explanation: `pH: Ba(OH)₂ ${dpStr(pHBa, 2)}; ammonia ${dpStr(pHN, 2)}; buffer ${dpStr(pHbuf, 2)}. Strong acid–weak base curve: equivalence below 7, methyl orange.`,
    });
  }

  // ---------------------------------------------------------------- Z3: kinetics and catalysis
  {
    const k = 0.25;
    const ex = [[0.1, 0.1], [0.3, 0.1], [0.1, 0.2]];
    const r = ex.map(([a, bb]) => rateFrom(k, [[a, 1], [bb, 2]]));
    const oA = orderFrom(r[0], r[1], 0.1, 0.3), oB = orderFrom(r[0], r[2], 0.1, 0.2);
    const kc = rateConstant(r[0], [[0.1, oA], [0.1, oB]]);
    chk(kc, k, 1e-12, "k Z3");
    const th = halfLifeFromK(2.31e-3);
    b.struct({
      ...P3, d: 5, calculator: true,
      concepts: [A("kinetics.rate-equations"), A("kinetics.catalysis"), A("kinetics.collisions-boltzmann")],
      stem: `This question is about rates of reaction. The table shows initial rates for the reaction P + Q → products at 298 K.

| Experiment | [P] / mol dm⁻³ | [Q] / mol dm⁻³ | Initial rate / mol dm⁻³ s⁻¹ |
|---|---|---|---|
${ex.map(([a, bb], j) => `| ${j + 1} | ${sfStr(a, 2)} | ${sfStr(bb, 2)} | ${sciStr(r[j], 3)} |`).join("\n")}`,
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({ label: "(a)", marks: 3, stem: "Explain the terms *order of reaction*, *rate constant* and *half-life*.", points: ["Order: the power to which the concentration of a reactant is raised in the rate equation", "Rate constant: the proportionality constant k in rate = k[A]ᵐ[B]ⁿ (constant at a given temperature)", "Half-life: time taken for the concentration of a reactant to fall to half its initial value"], modelAnswer: "The order with respect to a reactant is the power of its concentration in the experimentally determined rate equation. The rate constant k is the constant of proportionality in rate = k[A]ᵐ[B]ⁿ; it is fixed at a given temperature. The half-life is the time taken for the concentration of a reactant to fall to half of its initial value." }),
        P.group({ label: "(b)", stem: "Use the data to:", parts: [
          P.num({ label: "(i)", marks: 1, stem: "deduce the order with respect to P;", value: oA, wrong: [2], explanation: "[P] × 3, rate × 3: first order." }),
          P.num({ label: "(ii)", marks: 1, stem: "deduce the order with respect to Q;", value: oB, wrong: [1], explanation: "[Q] × 2, rate × 4: second order." }),
          P.num({ label: "(iii)", marks: 2, stem: "calculate the rate constant k, in dm⁶ mol⁻² s⁻¹.", value: kc, sf: 2, unit: "dm⁶/mol²/s", wrong: [rateConstant(r[0], [[0.1, 1], [0.1, 1]])], explanation: `rate = k[P][Q]²; k = ${sciStr(r[0], 3)} ÷ (0.10 × 0.10²) = ${sfStr(kc, 2)} dm⁶ mol⁻² s⁻¹.` }),
        ] }),
        P.num({ label: "(c)", marks: 2, stem: "A different reaction is first order with k = 2.31 × 10⁻³ s⁻¹. Calculate its half-life, in s.", value: th, sf: 3, unit: "s", wrong: [2.31e-3 * 0.693], explanation: `t½ = 0.693 ÷ (2.31 × 10⁻³) = ${sfStr(th, 3)} s.` }),
        P.manual({
          label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
          stem: "Distinguish between homogeneous and heterogeneous catalysis. Describe how each type works, using iron in the Haber process and Fe²⁺ ions in the reaction between peroxodisulfate and iodide ions as examples, with equations where appropriate.",
          points: [
            "Homogeneous: catalyst in the same phase as the reactants; heterogeneous: catalyst in a different phase",
            "Heterogeneous (Fe, Haber): N₂ and H₂ are adsorbed onto active sites on the iron surface",
            "Bonds (N≡N) are weakened, the adsorbed atoms react, and NH₃ desorbs, freeing the sites",
            "Homogeneous: uncatalysed S₂O₈²⁻ + 2I⁻ is slow because the two negative ions repel",
            "S₂O₈²⁻ + 2Fe²⁺ → 2SO₄²⁻ + 2Fe³⁺, then 2Fe³⁺ + 2I⁻ → 2Fe²⁺ + I₂ (catalyst regenerated)",
            "Each step involves oppositely charged ions and has a lower activation energy",
          ],
          modelAnswer: "A homogeneous catalyst is in the same phase as the reactants; a heterogeneous catalyst is in a different phase, usually a solid with gases or liquids.\n\nIn the Haber process, nitrogen and hydrogen are adsorbed onto active sites on the solid iron surface, forming weak bonds with iron atoms. This weakens the N≡N and H–H bonds; the adsorbed atoms combine on the surface to form ammonia, which desorbs and frees the active sites.\n\nThe reaction S₂O₈²⁻ + 2I⁻ → 2SO₄²⁻ + I₂ is slow because two negative ions must collide and they repel. Fe²⁺ ions in solution provide a new route: S₂O₈²⁻ + 2Fe²⁺ → 2SO₄²⁻ + 2Fe³⁺, then 2Fe³⁺ + 2I⁻ → 2Fe²⁺ + I₂. The iron(II) ions are regenerated, and each step involves oppositely charged ions that attract, so each step has a lower activation energy.",
        }),
      ]),
      hints: ["Compare experiments with only one concentration changed.", "k = 0.693/t½ only for first order."],
      explanation: `Rate = k[P][Q]², k = ${sfStr(kc, 2)} dm⁶ mol⁻² s⁻¹; t½ = ${sfStr(th, 3)} s; heterogeneous catalysis by adsorption–desorption, homogeneous by Fe²⁺/Fe³⁺ redox cycling.`,
    });
  }

  // ---------------------------------------------------------------- Z4 (Paper 4): thiosulfate clock reaction
  {
    const vols = [50.0, 40.0, 30.0, 20.0, 10.0];
    const times = vols.map((v) => round(1050 / v, 0));
    const conc3 = (0.15 * 30.0) / 60.0;
    const r1 = 1 / times[0], r4 = 1 / times[3];
    const order = orderFrom(1 / times[0], 1 / times[4], vols[0], vols[4]);
    const tPred = 1050 / 25.0;
    b.struct({
      ...P4, d: 4, calculator: true,
      concepts: [A("kinetics.rate-equations"), A("kinetics.collisions-boltzmann"), A("skills.quantitative-practical")],
      stem: t`Tatenda investigated how the rate of the reaction between sodium thiosulfate and hydrochloric acid depends on the concentration of thiosulfate:

$\ce{Na2S2O3(aq) + 2HCl(aq) -> 2NaCl(aq) + S(s) + SO2(g) + H2O(l)}$

**Method.** 1. A measuring cylinder was used to put the volume of 0.150 mol dm⁻³ sodium thiosulfate shown below into a conical flask, and distilled water was added to make the volume up to 50.0 cm³. 2. The flask was placed on a paper marked with a cross. 3. 10.0 cm³ of 2.00 mol dm⁻³ hydrochloric acid was added, a stopwatch was started and the mixture swirled. 4. The time for the cross to disappear when viewed from above was recorded. All runs were at 25.0 °C.

| Run | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| volume of Na₂S₂O₃(aq) / cm³ | ${vols.map((v) => dpStr(v, 1)).join(" | ")} |
| volume of water / cm³ | ${vols.map((v) => dpStr(50 - v, 1)).join(" | ")} |
| time / s | ${times.join(" | ")} |`,
      parts: checkExam(EXAM.ZIM_P4_QUANTITATIVE, [
        P.manual({ label: "(a)", marks: 3, stem: "Tatenda wants to add a column for 1/time and one for the concentration of thiosulfate in the reaction mixture. Describe how the completed results table should be set out.", points: ["Each column has a heading with the quantity and its unit separated by a solidus, e.g. volume of Na₂S₂O₃ / cm³, time / s, (1/time) / s⁻¹, concentration / mol dm⁻³", "Raw data recorded to the precision of the apparatus (volumes to 0.1 cm³ or 0.5 cm³, times to the nearest second)", "Processed values (1/time, concentration) given to a consistent, appropriate number of significant figures (e.g. 3 s.f.)"], modelAnswer: "One column per quantity, each headed with the quantity and unit, for example 'volume of Na₂S₂O₃(aq) / cm³', 'time / s', '(1/time) / s⁻¹' and '[S₂O₃²⁻] / mol dm⁻³'. Raw readings are recorded to the precision of the instruments (volumes to 0.1 cm³, times to the nearest second), and calculated values are given to a consistent number of significant figures, such as 3 s.f." }),
        P.group({ label: "(b)", stem: "Calculate:", parts: [
          P.num({ label: "(i)", marks: 1, stem: "the concentration of thiosulfate ions in the reaction mixture at the start of run 3, in mol dm⁻³ (total volume 60.0 cm³);", value: conc3, sf: 3, unit: "mol/dm³", wrong: [(0.15 * 30) / 50], explanation: `0.150 × 30.0/60.0 = ${sfStr(conc3, 3)} mol dm⁻³. Using 50.0 cm³ forgets the acid.` }),
          P.num({ label: "(ii)", marks: 1, stem: "1/time for run 1, in s⁻¹, to three significant figures;", value: r1, sf: 3, unit: "s⁻¹", explanation: `1/${times[0]} = ${sciStr(r1, 3)} s⁻¹.` }),
          P.num({ label: "(iii)", marks: 1, stem: "1/time for run 4, in s⁻¹, to three significant figures.", value: r4, sf: 3, unit: "s⁻¹", explanation: `1/${times[3]} = ${sciStr(r4, 3)} s⁻¹.` }),
        ] }),
        P.num({ label: "(c)", marks: 2, stem: "Use runs 1 and 5 to deduce the order of reaction with respect to thiosulfate ions.", value: order, wrong: [2], explanation: `Concentration ratio 50.0/10.0 = 5; rate ratio (1/${times[0]})/(1/${times[4]}) = ${times[4]}/${times[0]} = ${sfStr(times[4] / times[0], 3)} ≈ 5¹, so first order.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Describe the graph of 1/time (y-axis) against volume of sodium thiosulfate (x-axis) you would expect, and what it shows.", points: ["A straight line through the origin", "Rate is directly proportional to [S₂O₃²⁻], so the reaction is first order with respect to thiosulfate"], modelAnswer: "A straight line passing through the origin, showing that 1/time (rate) is directly proportional to the thiosulfate concentration: first order with respect to thiosulfate." }),
        P.num({ label: "(e)", marks: 2, stem: "Predict the time, in s, for a run using 25.0 cm³ of sodium thiosulfate and 25.0 cm³ of water.", value: tPred, tol: 1.5, unit: "s", wrong: [times[2] + (times[3] - times[2]) / 2], explanation: `For first order, time × volume is constant: ${times[0]} × 50.0 ≈ ${dpStr(1050, 0)}; t = ${dpStr(1050, 0)} ÷ 25.0 ≈ ${dpStr(tPred, 0)} s. Averaging the times of runs 3 and 4 is wrong, because time is not proportional to volume.` }),
        P.manual({ label: "(f)", marks: 4, stem: "Identify two significant sources of error in this method and suggest an improvement for each.", points: ["Judging when the cross disappears is subjective / reaction time in starting and stopping the stopwatch", "Improvement: same observer, same lighting and same cross each time, or use a light sensor/colorimeter with a data logger", "Temperature may vary between runs (rate is very temperature-sensitive) / measuring cylinders imprecise for small volumes", "Improvement: use a thermostatted water bath (record the temperature) / use burettes or pipettes to measure the volumes"], modelAnswer: "Deciding exactly when the cross disappears is subjective, and there is a reaction-time error in starting and stopping the watch; the same person should judge every run under the same lighting, or a light sensor and data logger could detect the cloudiness. The temperature may differ slightly between runs, which changes the rate; the solutions should be kept in a thermostatted water bath. Measuring cylinders are imprecise for volumes such as 10 cm³; burettes would be better." }),
        P.manual({ label: "(g)", marks: 2, stem: "State two safety precautions for this experiment, with reasons.", points: ["Sulfur dioxide is toxic and irritates the lungs: work in a well-ventilated room or fume cupboard and do not smell the flask", "Wear eye protection because 2.00 mol dm⁻³ hydrochloric acid is corrosive/irritant (or dispose of the mixture promptly in a fume cupboard)"], modelAnswer: "Sulfur dioxide is produced, which is toxic and an irritant, so the room must be well ventilated (or a fume cupboard used) and the flask should be emptied promptly. Eye protection should be worn because the hydrochloric acid is corrosive." }),
        P.manual({ label: "(h)", marks: 2, stem: "Explain why the total volume of thiosulfate solution plus water was kept at 50.0 cm³ in every run.", points: ["So that the concentration of thiosulfate is proportional to the volume of thiosulfate solution used", "and the concentration of acid (and the depth of liquid over the cross) is the same in every run, so only one variable changes"], modelAnswer: "Keeping the total volume constant makes the thiosulfate concentration directly proportional to the volume of thiosulfate solution used, while the acid concentration and the depth of solution above the cross stay the same, so only one variable is changed." }),
      ]),
      hints: ["Rate is proportional to 1/time.", "Concentration is proportional to the volume of thiosulfate because the total volume is constant."],
      explanation: `[S₂O₃²⁻] in run 3 = ${sfStr(conc3, 3)} mol dm⁻³; 1/t = ${sciStr(r1, 3)} s⁻¹ (run 1) and ${sciStr(r4, 3)} s⁻¹ (run 4); first order in thiosulfate; predicted time about ${dpStr(tPred, 0)} s for 25.0 cm³.`,
    });
  }
});
