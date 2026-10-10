// W1a: enzyme inhibition, Vmax, Km and immobilised enzymes.
import { concept, P, t, chk, table, dpStr, ZIM, CAM } from "../lib.mjs";

const mm = (Vm, Km, S) => (Vm * S) / (Km + S);

concept("abio.enzymes.inhibition-kinetics", { file: "enzymes/inhibition-kinetics", keyPrefix: "enzymes.inhibition-kinetics" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where does a competitive inhibitor bind?",
    options: [
      ["To the active site", "Correct: it has a shape similar to the substrate and occupies the active site."],
      ["To a site away from the active site", "This describes a non-competitive inhibitor."],
      ["To the substrate molecule", "Inhibitors bind to the enzyme, not to the substrate."],
      ["To the product after it is released", "Inhibitors act on the enzyme, not on the product."],
    ],
    answer: "A",
    explanation: "Competitive inhibitors resemble the substrate and compete for the active site.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why can the effect of a competitive inhibitor be reduced by increasing the substrate concentration?",
    options: [
      ["Substrate molecules then outnumber inhibitor molecules and occupy most active sites", "Correct: the chance that an active site is filled by substrate increases."],
      ["The substrate binds to the inhibitor and removes it from the solution", "Substrate and inhibitor do not bind to each other."],
      ["The substrate changes the shape of the inhibitor so it no longer fits", "Substrate does not alter the inhibitor."],
      ["More substrate denatures the inhibitor molecules", "Inhibitors are not denatured by substrate."],
    ],
    answer: "A",
    explanation: "Competitive inhibition depends on the relative concentrations of substrate and inhibitor; at high substrate concentrations most active sites are occupied by substrate.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does a non-competitive inhibitor reduce the rate of reaction?",
    options: [
      ["It binds elsewhere on the enzyme, changing the shape of the active site", "Correct: the altered active site cannot bind or convert substrate properly."],
      ["It binds to the active site and blocks the substrate from entering", "This is competitive inhibition."],
      ["It breaks the peptide bonds of the enzyme into amino acids", "Inhibitors do not hydrolyse the enzyme."],
      ["It lowers the substrate concentration by reacting directly with the substrate", "Inhibitors bind the enzyme, not the substrate."],
    ],
    answer: "A",
    explanation: "Binding at an allosteric site changes the tertiary structure, so the active site is no longer complementary; extra substrate cannot overcome this.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", applies: CAM,
    stem: "What is the Michaelis-Menten constant, Km?",
    options: [
      ["The substrate concentration at which the rate is half of Vmax", "Correct: Km is read at Vmax/2."],
      ["The maximum rate of reaction when all active sites are full", "This is Vmax."],
      ["The substrate concentration at which the rate equals Vmax", "The rate only approaches Vmax; Km is at half Vmax."],
      ["The enzyme concentration needed to give half the maximum rate", "Km is a substrate concentration, for a fixed enzyme concentration."],
    ],
    answer: "A",
    explanation: "Km is the substrate concentration giving half the maximum rate; it measures affinity (low Km = high affinity).",
    hints: ["Km is read at half of the maximum."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: CAM,
    stem: "Enzyme X has a Km of 0.5 mmol dm⁻³ for its substrate and enzyme Y has a Km of 4.0 mmol dm⁻³ for the same substrate. Which statement is correct?",
    options: [
      ["X has the higher affinity for the substrate", "Correct: a lower Km means half Vmax is reached at a lower substrate concentration."],
      ["Y has the higher affinity for the substrate", "A higher Km means lower affinity."],
      ["X has the higher Vmax", "Km gives no information about Vmax."],
      ["X and Y have the same affinity", "Different Km values show different affinities."],
    ],
    answer: "A",
    explanation: "The lower the Km, the less substrate is needed to reach half Vmax, so the enzyme binds its substrate more readily: higher affinity.",
    hints: ["Does a low Km mean more or less substrate is needed?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: CAM,
    stem: "What effect does a non-competitive inhibitor have on Vmax and Km?",
    options: [
      ["Vmax decreases; Km stays the same", "Correct: fewer working enzyme molecules lower Vmax; the remaining ones have unchanged affinity."],
      ["Vmax stays the same; Km increases", "This describes a competitive inhibitor."],
      ["Vmax increases; Km decreases", "Inhibitors do not increase Vmax."],
      ["Both Vmax and Km stay the same", "The maximum rate is lowered by a non-competitive inhibitor."],
    ],
    answer: "A",
    explanation: "Non-competitive: Vmax down, Km unchanged. Competitive: Vmax unchanged, Km up.",
    hints: ["Can extra substrate overcome a non-competitive inhibitor?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Organophosphate insecticides are dangerous to farm workers because they inhibit which enzyme?",
    options: [
      ["Acetylcholinesterase", "Correct: acetylcholine is not broken down at synapses, so muscles are over-stimulated."],
      ["Cytochrome oxidase", "Cytochrome oxidase is inhibited by cyanide."],
      ["Amylase", "Amylase digests starch; it is not the target of organophosphates."],
      ["Catalase", "Catalase breaks down hydrogen peroxide; it is not the target of organophosphates."],
    ],
    answer: "A",
    explanation: "Organophosphates inhibit acetylcholinesterase irreversibly, so acetylcholine builds up at synapses and neuromuscular junctions. Protective clothing reduces exposure.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS", applies: CAM,
    stem: "An enzyme is tested with and without an inhibitor. Without inhibitor: Vmax = 0.90 units, Km = 1.5 mmol dm⁻³. With inhibitor: Vmax = 0.90 units, Km = 4.0 mmol dm⁻³. What type of inhibitor is it, and how could its effect be reduced?",
    options: [
      ["Competitive; by increasing the substrate concentration", "Correct: unchanged Vmax and raised Km indicate competition at the active site."],
      ["Non-competitive; by increasing the substrate concentration", "A non-competitive inhibitor lowers Vmax and is not overcome by substrate."],
      ["Competitive; by lowering the substrate concentration", "Less substrate makes competitive inhibition worse."],
      ["Irreversible; it cannot be reduced", "An unchanged Vmax shows the enzyme can still work at full rate with enough substrate."],
    ],
    answer: "A",
    explanation: "Same Vmax, higher Km: a competitive inhibitor. Raising substrate concentration makes it more likely that substrate, not inhibitor, occupies each active site.",
    hints: ["Which inhibitor leaves Vmax unchanged?"],
  });
  // Km from data (Vmax 1.20, Km 3.0)
  const S = [1, 2, 3, 6, 12, 24];
  const v = S.map((s) => mm(1.2, 3, s));
  chk(v[2], 0.6);
  b.num({
    d: 4, skill: "ANALYSIS", applies: CAM,
    stem: `The initial rate of an enzyme reaction was measured at different substrate concentrations. The graph levels off at a Vmax of 1.20 µmol min⁻¹.\n\n${table(["Substrate / mmol dm⁻³", ...S.map(String)], [["Initial rate / µmol min⁻¹", ...v.map((x) => dpStr(x, 2))]])}\n\nUse the data to give Km in mmol dm⁻³.`,
    value: 3,
    wrong: ["24", "1.2"],
    explanation: "Half of Vmax = 1.20 ÷ 2 = 0.60 µmol min⁻¹, which is reached at 3 mmol dm⁻³, so Km = 3 mmol dm⁻³. Reading the concentration at the highest rate (24) confuses Km with the plateau.",
    hints: ["Halve Vmax first.", "Find the substrate concentration giving that rate."],
  });
  const half = 0.84 / 2;
  b.num({
    d: 2, skill: "APPLICATION", applies: CAM, daily: true,
    stem: "An enzyme has a Vmax of 0.84 µmol min⁻¹. What rate, in µmol min⁻¹, is used to read Km from the graph?",
    value: half,
    wrong: ["0.84", "1.68"],
    explanation: "Km is the substrate concentration at half Vmax: 0.84 ÷ 2 = 0.42 µmol min⁻¹.",
  });
  const pct = (1 - 0.34 / 0.80) * 100;
  chk(pct, 57.5, 1e-9);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "At a high substrate concentration, an enzyme gave a rate of 0.80 units without inhibitor and 0.34 units with a non-competitive inhibitor. Calculate the percentage inhibition, to three significant figures.",
    value: pct, unit: "%", sf: 3,
    wrong: ["42.5", "135"],
    explanation: t`1. Percentage inhibition $= \dfrac{\text{rate without} - \text{rate with}}{\text{rate without}} \times 100$.
2. $(0.80 - 0.34) \div 0.80 \times 100 = 57.5\%$.
3. 42.5% is the percentage of activity remaining, not the inhibition; 135% comes from dividing by the inhibited rate instead.`,
    hints: ["Find the fall in rate as a fraction of the uninhibited rate."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A non-competitive inhibitor binds to the active site of an enzyme.",
    answer: false,
    explanation: "False. It binds at another site, changing the shape of the active site indirectly. Competitive inhibitors bind the active site.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", applies: CAM,
    stem: "Enzymes immobilised in alginate beads can be reused, and the product is not contaminated with enzyme.",
    answer: true,
    explanation: "True. The enzyme is trapped in the beads, so it stays in the column while substrate flows through, and product leaves without enzyme.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each inhibitor description with its type.",
    pairs: [
      ["Shape similar to the substrate; competes for the active site", "Competitive"],
      ["Binds at another site and changes the active site shape", "Non-competitive"],
      ["Binds permanently, often by covalent bonds", "Irreversible"],
      ["Final product of a pathway inhibits an early enzyme", "End-product inhibition"],
    ],
    explanation: "Competitive: active site; non-competitive: allosteric site; irreversible: permanent binding; end-product: feedback control of a pathway.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING", applies: CAM,
    stem: "Complete the table of effects.",
    template: "A competitive inhibitor leaves Vmax {{blank:a}} and makes Km {{blank:b}}. A non-competitive inhibitor makes Vmax {{blank:c}} and leaves Km {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["unchanged"], choices: ["unchanged", "higher", "lower"] },
      { id: "b", accepted: ["higher"], choices: ["unchanged", "higher", "lower"] },
      { id: "c", accepted: ["lower"], choices: ["unchanged", "higher", "lower"] },
      { id: "d", accepted: ["unchanged"], choices: ["unchanged", "higher", "lower"] },
    ],
    explanation: "Competitive: Vmax same, Km up. Non-competitive: Vmax down, Km same.",
    hints: ["Which inhibitor can be overcome by extra substrate?"],
  });
  b.short({
    d: 2, skill: "RECALL", applies: CAM,
    stem: "Name the substance used to form beads in which enzymes are immobilised.",
    accepted: ["alginate", "sodium alginate", "calcium alginate", "alginate beads"],
    wrong: ["agar", "cellulose"],
    explanation: "Enzyme mixed with **sodium alginate** is dripped into calcium chloride solution, forming calcium alginate beads.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how a competitive inhibitor reduces the rate of an enzyme-catalysed reaction, and why its effect depends on substrate concentration.",
    points: [
      "Inhibitor has a similar shape to the substrate / is complementary to the active site",
      "Binds (reversibly) to the active site, so substrate cannot bind while it is there",
      "Fewer enzyme-substrate complexes form per unit time",
      "Higher substrate concentration increases the chance that substrate rather than inhibitor occupies the active site, so inhibition decreases",
    ],
    modelAnswer: "A competitive inhibitor is similar in shape to the substrate and so fits the active site. While it is bound, substrate cannot enter, so fewer enzyme-substrate complexes form and the rate falls. Because the binding is reversible, inhibitor and substrate compete; the more substrate there is, the more likely each active site is to be occupied by substrate, so the inhibition becomes smaller at high substrate concentrations.",
    explanation: "Shape, binding, effect on complexes, and competition.",
    hints: ["Compare the shapes of inhibitor and substrate."],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4, applies: CAM,
    stem: "Suggest the advantages to a food manufacturer of using lactase immobilised in alginate beads rather than lactase added free to milk.",
    points: [
      "Enzyme can be reused many times, reducing costs",
      "Product (milk) not contaminated with enzyme, so no separation / purification needed",
      "Immobilised enzyme more stable / tolerates a wider range of temperature and pH",
      "Continuous process possible; flow rate can be controlled to control the extent of hydrolysis",
    ],
    modelAnswer: "The beads can be used again and again, so less enzyme has to be bought. The lactose-free milk leaves the column without any enzyme in it, so it does not need purifying. Immobilised lactase is more stable over a range of temperatures and pH. The milk can flow through the column continuously, and the flow rate can be adjusted to control how much lactose is hydrolysed.",
    explanation: "Any four valid advantages.",
    hints: ["Think about cost, purity, stability and process."],
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 3, applies: ZIM,
    stem: "Mercury ions are irreversible inhibitors of many enzymes. Suggest how they inactivate enzymes and why the effect is not reversed by adding more substrate.",
    points: [
      "Mercury ions bind (permanently / covalently) to R groups, especially –SH groups of cysteine",
      "Disrupting disulfide / other bonds, so the tertiary structure and active site change shape",
      "Binding is permanent, so adding substrate cannot displace it / enzyme stays inactive",
    ],
    modelAnswer: "Mercury ions bind firmly to sulfur-containing R groups such as the –SH of cysteine, disrupting disulfide and other bonds that hold the tertiary structure, so the active site changes shape. The binding is permanent rather than competitive, so adding substrate cannot displace the ions and the enzyme remains inactive.",
    explanation: "Binding to R groups → shape change → irreversible.",
    hints: ["Which R groups contain sulfur?"],
  });
  const S2 = [0.5, 1.5, 3, 6, 12, 24];
  const v0 = S2.map((s) => mm(0.70, 1.5, s));
  const vA = S2.map((s) => mm(0.70, 6, s));
  const vB = S2.map((s) => mm(0.35, 1.5, s));
  b.struct({
    d: 5, skill: "ANALYSIS", applies: CAM, calculator: true,
    stem: `Sipho measured the initial rate of an enzyme reaction at different substrate concentrations without inhibitor and with inhibitor A or inhibitor B. Vmax without inhibitor is 0.70 µmol min⁻¹.\n\n${table(["Substrate / mmol dm⁻³", "No inhibitor", "Inhibitor A", "Inhibitor B"], S2.map((s, i) => [String(s), dpStr(v0[i], 2), dpStr(vA[i], 2), dpStr(vB[i], 2)]))}\n\nAll rates are in µmol min⁻¹. At high substrate concentrations the rate with A approaches 0.70 and with B approaches 0.35.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Give Km without inhibitor, in mmol dm⁻³.", value: 1.5, wrong: ["0.35"], explanation: "Half of 0.70 = 0.35, reached at 1.5 mmol dm⁻³." }),
      P.num({ label: "(b)", marks: 2, stem: "Give Km with inhibitor A, in mmol dm⁻³.", value: 6, wrong: ["24"], explanation: "Vmax with A is still 0.70, so half Vmax = 0.35, reached at 6 mmol dm⁻³." }),
      P.match({ label: "(c)", marks: 2, stem: "Identify the type of each inhibitor.", pairs: [["Inhibitor A", "Competitive"], ["Inhibitor B", "Non-competitive"]], extraRight: ["Irreversible"], explanation: "A: Km up, Vmax unchanged = competitive. B: Vmax halved, Km unchanged (0.175 at 1.5 mmol dm⁻³) = non-competitive." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why the rate with inhibitor B never exceeds about 0.35 µmol min⁻¹, however much substrate is added.", points: ["B binds at a site other than the active site", "Changes the shape of the active site of those enzyme molecules, so they cannot form enzyme-substrate complexes / catalyse", "Substrate does not compete with B, so extra substrate cannot reverse it: fewer functional enzyme molecules, lower Vmax"], modelAnswer: "Inhibitor B binds away from the active site and changes the enzyme's shape, so enzyme molecules with B bound cannot catalyse the reaction. Substrate does not compete with B for this site, so adding more substrate cannot overcome the inhibition; with fewer working enzyme molecules the maximum rate is lower." }),
    ],
    explanation: "Km is read at half Vmax for each curve. Competitive inhibition raises Km with Vmax unchanged; non-competitive lowers Vmax with Km unchanged.",
    hints: ["Use half of each curve's own Vmax."],
  });
  b.struct({
    d: 3, skill: "APPLICATION", applies: ZIM,
    stem: "Workers spraying a cotton crop near Gokwe use an organophosphate insecticide. Organophosphates inhibit acetylcholinesterase, the enzyme that breaks down the transmitter substance acetylcholine at synapses.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Organophosphates bind permanently to acetylcholinesterase. What type of inhibition is this?", options: [["Irreversible inhibition", "Correct: permanent binding inactivates the enzyme for good."], ["Competitive inhibition", "Competitive inhibitors bind reversibly."], ["End-product inhibition", "This is feedback control by a pathway's product."], ["Non-competitive reversible inhibition", "The binding is permanent, not reversible."]], answer: "A", explanation: "Permanent binding: irreversible inhibition." }),
      P.manual({ label: "(b)", marks: 3, stem: "Suggest why poisoning with organophosphates causes muscle twitching and paralysis.", points: ["Acetylcholine is not broken down at synapses / neuromuscular junctions", "Acetylcholine stays bound to receptors, so the muscle is stimulated continuously", "Muscles twitch uncontrollably, then cannot respond (paralysis), including breathing muscles"], modelAnswer: "Acetylcholine is not broken down, so it stays in the synaptic cleft and keeps binding to receptors on the muscle. The muscle is stimulated continuously, causing twitching, and eventually cannot respond normally, causing paralysis, which may affect the breathing muscles." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest two precautions the workers should take.", points: ["Wear protective clothing / gloves / mask / goggles to prevent contact and inhalation", "Wash skin and clothes after spraying / do not spray in windy conditions / keep away from food and water"], modelAnswer: "Wear gloves, a mask, goggles and overalls to prevent the insecticide being absorbed or inhaled, and wash thoroughly and change clothes after spraying, avoiding spraying in wind." }),
    ],
    explanation: "Organophosphates irreversibly inhibit acetylcholinesterase, leading to accumulation of acetylcholine and over-stimulation of muscles.",
    hints: ["What happens if acetylcholine is not removed?"],
  });

  b.card("DEFINITION", "Define **competitive inhibitor**.", "Similar shape to the substrate; binds reversibly to the active site and competes with the substrate.");
  b.card("DEFINITION", "Define **non-competitive inhibitor**.", "Binds reversibly away from the active site, changing its shape; not overcome by more substrate.");
  b.card("DEFINITION", "Define **Vmax**.", "Maximum initial rate, when all active sites are occupied (enzyme saturated).", undefined, { applies: CAM });
  b.card("DEFINITION", "Define **Km**.", "Substrate concentration at half Vmax; low Km = high affinity.", undefined, { applies: CAM });
  b.card("FACT", "Effect of competitive v non-competitive inhibitors on Vmax and Km?", "Competitive: Vmax same, Km up. Non-competitive: Vmax down, Km same.", undefined, { applies: CAM });
  b.card("FACT", "Examples of irreversible inhibitors?", "Heavy metals (mercury, lead), cyanide (cytochrome oxidase), organophosphates (acetylcholinesterase).", undefined, { applies: ZIM });
  b.card("CONCEPT", "Advantages of immobilised enzymes?", "Reusable, product not contaminated, more stable to temperature and pH, continuous processing.", undefined, { applies: CAM });
  b.card("FACT", "How are enzymes immobilised in alginate?", "Enzyme + sodium alginate dripped into calcium chloride solution, forming beads.", undefined, { applies: CAM });
  b.card("CONCEPT", "What is end-product inhibition?", "The final product of a pathway inhibits an early enzyme (non-competitively), regulating the pathway by negative feedback.");
});
