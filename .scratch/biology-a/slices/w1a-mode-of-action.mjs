// W1a: how enzymes work.
import { concept, P, t, chk, table, dpStr } from "../lib.mjs";

concept("abio.enzymes.mode-of-action", { file: "enzymes/mode-of-action", keyPrefix: "enzymes.mode-of-action" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How do enzymes increase the rate of a reaction?",
    options: [
      ["They lower the activation energy of the reaction", "Correct: a lower energy barrier means more molecules can react."],
      ["They supply energy to the substrate molecules", "Enzymes do not provide energy; they lower the energy needed."],
      ["They increase the temperature of the reaction mixture", "Enzymes work at body temperature without raising it."],
      ["They change the overall energy released by the reaction", "The overall energy change is the same with or without an enzyme."],
    ],
    answer: "A",
    explanation: "By binding the substrate in the active site, an enzyme provides a reaction pathway with a lower activation energy.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is an enzyme specific to one substrate?",
    options: [
      ["Its active site has a shape complementary to that substrate only", "Correct: only a molecule with the matching shape and charges can bind."],
      ["It has exactly the same three-dimensional shape as its substrate molecule", "The active site is complementary to the substrate, not identical to it."],
      ["It is made of the same monomers as its substrate", "Enzymes are proteins; substrates may be carbohydrates, lipids or anything else."],
      ["It is used up in the reaction with its substrate", "Enzymes are not used up; they are reused."],
    ],
    explanation: "The 3D shape and the R groups of the active site determine which substrate can bind. Amylase acts on starch but not on cellulose.",
    answer: "A",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement describes the induced-fit hypothesis?",
    options: [
      ["The active site changes shape slightly as the substrate binds, fitting more closely", "Correct: binding induces a change in the enzyme's shape."],
      ["The active site is rigid and already exactly complementary before the substrate arrives", "This is the lock-and-key hypothesis."],
      ["The substrate changes the enzyme's primary structure as it binds", "The sequence never changes; only the folding adjusts."],
      ["The enzyme is permanently changed into a new shape after each reaction", "The enzyme returns to its original shape after releasing the products."],
    ],
    answer: "A",
    explanation: "In induced fit the active site is flexible; substrate binding moulds it around the substrate, straining bonds and lowering activation energy.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which is an example of an **extracellular** enzyme?",
    options: [
      ["Salivary amylase", "Correct: it is secreted into the mouth and acts outside the cells that made it."],
      ["Catalase in liver cells", "Catalase acts inside the cells that make it: an intracellular enzyme."],
      ["ATP synthase in mitochondria", "ATP synthase works within the inner mitochondrial membrane: intracellular."],
      ["DNA polymerase in the nucleus", "DNA polymerase acts inside the nucleus of the cell: intracellular."],
    ],
    answer: "A",
    explanation: "Extracellular enzymes are secreted and act outside cells (digestive enzymes, enzymes released by fungi). Intracellular enzymes work inside cells.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "In an energy profile, an uncatalysed reaction has reactants at 110 units, a peak at 200 units and products at 65 units. With an enzyme the peak is 145 units. What is the activation energy of the catalysed reaction?",
    options: [
      ["35 units", "Correct: 145 − 110 = 35."],
      ["90 units", "This is the activation energy of the uncatalysed reaction (200 − 110)."],
      ["80 units", "This is the peak minus the product energy (145 − 65)."],
      ["45 units", "This is the energy change of the reaction (110 − 65), which is the same with or without the enzyme."],
    ],
    answer: "A",
    explanation: "Activation energy = peak energy − energy of reactants = 145 − 110 = 35 units. The enzyme lowers it from 90 units; the overall energy change (45 units released) is unchanged.",
    hints: ["Activation energy is measured from the reactants to the peak."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why do biologists compare **initial** rates rather than mean rates when investigating enzymes?",
    options: [
      ["At the start the substrate concentration is known and has not yet been used up", "Correct: later, falling substrate concentration slows the reaction."],
      ["At the start the enzyme has not yet been denatured by the products", "Products do not normally denature enzymes; substrate depletion is the issue."],
      ["The initial rate is always the same whatever the conditions", "The initial rate depends on conditions; that is why it is measured."],
      ["Mean rates cannot be calculated from volume and time data", "They can, but they are lowered by substrate depletion."],
    ],
    answer: "A",
    explanation: "As substrate is used up, fewer enzyme-substrate collisions occur and the rate falls. The initial rate (tangent at t = 0) reflects the conditions being tested.",
    hints: ["What happens to the substrate as the reaction goes on?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Catalase is added to hydrogen peroxide. The volume of oxygen rises quickly and then levels off at 24 cm³. The experiment is repeated with twice the volume of the same catalase solution. What would you expect?",
    options: [
      ["A faster initial rate, but the volume still levels off at 24 cm³", "Correct: more enzyme speeds the reaction, but the amount of substrate limits the total product."],
      ["The same initial rate, but the volume levels off at 48 cm³", "The total product depends on the substrate, which was not doubled."],
      ["A faster initial rate and the volume levels off at 48 cm³", "Extra enzyme does not create extra substrate, so the final volume is the same."],
      ["A slower initial rate, because enzyme molecules compete for substrate", "More active sites mean more enzyme-substrate complexes per second, not fewer."],
    ],
    answer: "A",
    explanation: "Doubling the enzyme doubles the number of active sites, so the initial rate rises when substrate is in excess. The final volume of oxygen depends only on the amount of hydrogen peroxide.",
    hints: ["What decides the total volume of oxygen?"],
  });
  const tt = [0, 15, 30, 45, 60, 90, 120];
  const vol = [0, 3.6, 6.6, 8.9, 10.5, 12.1, 12.4];
  const tanRate = 7.5 / 30;
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `Oxygen produced by catalase in yeast suspension acting on hydrogen peroxide was measured with a gas syringe.\n\n${table(["Time / s", ...tt.map(String)], [["Volume of oxygen / cm³", ...vol.map((x) => dpStr(x, 1))]])}\n\nA tangent to the curve at time 0 passes through the origin and the point (30 s, 7.5 cm³). Calculate the initial rate of reaction in cm³ s⁻¹, to two decimal places.`,
    value: tanRate, dp: 2,
    wrong: ["0.22", "0.10"],
    explanation: t`1. Initial rate = gradient of the tangent at $t = 0$.
2. Gradient $= 7.5\ \text{cm}^3 \div 30\ \text{s} = 0.25\ \text{cm}^3\ \text{s}^{-1}$.
3. Using the data point at 30 s instead of the tangent gives $6.6 \div 30 = 0.22$, which underestimates the initial rate; dividing the final volume by 120 s gives 0.10, the mean rate.`,
    hints: ["Use the tangent, not the data points.", "Gradient = change in volume ÷ change in time."],
  });
  const mean = 15.6 / 150;
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "In a catalase experiment, 15.6 cm³ of oxygen was collected in 150 s. Calculate the mean rate of oxygen production in cm³ s⁻¹, to three significant figures.",
    value: mean, sf: 3,
    wrong: ["9.62", "2340"],
    explanation: "15.6 ÷ 150 = 0.104 cm³ s⁻¹. Dividing 150 by 15.6 gives 9.62.",
  });
  const endRate = 1000 / 150;
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "In a starch-amylase experiment, the iodine test first stayed orange-brown 150 s after mixing. Calculate the rate as 1000/t, in s⁻¹, to three significant figures.",
    value: endRate, sf: 3, unit: "s⁻¹",
    wrong: ["0.150", "150"],
    explanation: "1000 ÷ 150 = 6.67 s⁻¹. A faster reaction reaches the end point sooner, giving a larger 1000/t value.",
    hints: ["Rate is inversely proportional to time."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "An enzyme is used up in the reaction it catalyses.",
    answer: false,
    explanation: "False. Enzymes are catalysts: they are released unchanged and can be used again.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In the lock-and-key hypothesis, the active site has a fixed shape that is complementary to the substrate.",
    answer: true,
    explanation: "True. Induced fit modifies this model by allowing the active site to change shape as the substrate binds.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each method with what it measures.",
    pairs: [
      ["Gas syringe with catalase and hydrogen peroxide", "Volume of product formed over time"],
      ["Iodine spotting tile with amylase and starch", "Time for the substrate to disappear"],
      ["Colorimeter readings of a starch-iodine mixture", "Fall in absorbance as substrate is used"],
    ],
    explanation: "Catalase: oxygen product collected. Amylase: starch disappearance detected by iodine. Colorimeter: absorbance falls as the coloured starch-iodine complex disappears.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "When a substrate binds to the active site, an {{blank:a}} complex forms. Catalase breaks down hydrogen peroxide into water and {{blank:b}}. The initial rate is found from the gradient of a {{blank:c}} drawn at time zero.",
    blanks: [
      { id: "a", accepted: ["enzyme-substrate"], choices: ["enzyme-substrate", "enzyme-product", "enzyme-inhibitor", "antigen-antibody"] },
      { id: "b", accepted: ["oxygen"], choices: ["oxygen", "hydrogen", "carbon dioxide", "glucose"] },
      { id: "c", accepted: ["tangent"], choices: ["tangent", "line of best fit", "bar chart", "histogram"] },
    ],
    explanation: "Enzyme-substrate complex; 2H₂O₂ → 2H₂O + O₂; tangent at t = 0.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the region of an enzyme to which the substrate binds.",
    accepted: ["active site", "the active site"],
    wrong: ["allosteric site", "binding protein"],
    explanation: "The **active site**, formed by a few amino acids in a specific 3D arrangement.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how an enzyme catalyses a reaction, using the induced-fit hypothesis.",
    points: [
      "Substrate collides with and binds to the active site (complementary shape), forming an enzyme-substrate complex",
      "Active site changes shape slightly / moulds around the substrate as it binds",
      "This puts strain on bonds in the substrate (or brings reacting groups together), lowering the activation energy",
      "Products are released and the enzyme is unchanged / can be reused",
    ],
    modelAnswer: "The substrate collides with the active site, whose shape is complementary to it, and binds to form an enzyme-substrate complex. As it binds, the active site changes shape slightly and moulds around the substrate. This strains bonds in the substrate and lowers the activation energy, so the reaction happens quickly. The products leave the active site and the enzyme is unchanged, ready to be used again.",
    explanation: "Binding, shape change, lowering of activation energy and release.",
    hints: ["What happens to the active site as the substrate binds?"],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "In a starch-amylase experiment, samples are tested with iodine every 30 s. Suggest **three** ways to make the end point more precise or reliable.",
    points: [
      "Sample more often (e.g. every 10 s)",
      "Use a colour standard / compare against a reference tile / same observer, or use a colorimeter to measure absorbance",
      "Repeat each condition (at least three times) and calculate a mean; keep drop size / temperature (water bath) constant",
    ],
    modelAnswer: "Take samples every 10 s rather than every 30 s; compare each drop with a colour standard or measure absorbance with a colorimeter instead of judging by eye; and repeat the experiment three times in a thermostatically controlled water bath, calculating a mean time.",
    explanation: "Any three distinct valid improvements.",
    hints: ["Think about sampling interval, judging the colour and replication."],
  });
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "Tatenda investigated the activity of catalase in fresh liver extract. She added 1 cm³ of extract to 10 cm³ of hydrogen peroxide solution at 30 °C and collected oxygen in a gas syringe.\n\n| Time / s | 0 | 20 | 40 | 60 | 80 | 100 | 120 |\n|---|---|---|---|---|---|---|---|\n| Volume of oxygen / cm³ | 0 | 14 | 24 | 30 | 33 | 34 | 34 |",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Describe the shape of the curve you would obtain if these results were plotted.", points: ["Volume rises steeply at first (14 cm³ in the first 20 s)", "Rate decreases / curve becomes less steep (only 3 cm³ between 60 and 80 s)", "Levels off at 34 cm³ from 100 s"], modelAnswer: "The volume rises steeply at first, 14 cm³ in the first 20 s, then the curve becomes less steep (only 3 cm³ between 60 and 80 s) and levels off at 34 cm³ from 100 s onwards." }),
      P.num({ label: "(b)", marks: 2, stem: "A tangent drawn at time 0 passes through (0, 0) and (20 s, 16 cm³). Calculate the initial rate in cm³ s⁻¹.", value: 16 / 20, wrong: ["0.7"], explanation: "16 ÷ 20 = 0.80 cm³ s⁻¹ (using the data point 14 ÷ 20 = 0.70 underestimates it)." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the rate decreases and the volume levels off.", points: ["Hydrogen peroxide (substrate) is used up, so fewer enzyme-substrate collisions / complexes per second", "Levels off when all the substrate has been broken down (no more product)"], modelAnswer: "As hydrogen peroxide is used up its concentration falls, so there are fewer collisions between substrate and active sites and fewer enzyme-substrate complexes form per second. When all the substrate has been broken down no more oxygen is produced, so the volume levels off." }),
      P.mcq({ label: "(d)", marks: 1, stem: "Which control would show that the oxygen was produced by the enzyme?", options: [["Boiled liver extract added to hydrogen peroxide", "Correct: denatured catalase should produce no oxygen."], ["Fresh liver extract added to water", "This shows the extract releases no gas alone, but not that the enzyme catalyses the reaction."], ["Hydrogen peroxide at 60 °C with no extract", "This changes the temperature, which is a second variable."], ["Twice the volume of fresh liver extract", "This tests enzyme concentration, not whether the enzyme is responsible."]], answer: "A", explanation: "Boiling denatures catalase while keeping everything else the same." }),
    ],
    explanation: "Product volume rises quickly then levels off as substrate runs out; the initial rate is the tangent gradient at t = 0; boiled enzyme is the control.",
    hints: ["Describe with figures: rise, slowing, plateau."],
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "The energy profile of a reaction catalysed by sucrase (sucrose → glucose + fructose) is described in a table.\n\n| | Energy of reactants / a.u. | Peak energy / a.u. | Energy of products / a.u. |\n|---|---|---|---|\n| Without enzyme | 90 | 175 | 55 |\n| With sucrase | 90 | 120 | 55 |",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the activation energy without the enzyme, in arbitrary units.", value: 175 - 90, wrong: ["120"], explanation: "175 − 90 = 85 a.u." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the reduction in activation energy caused by sucrase, in arbitrary units.", value: 175 - 90 - (120 - 90), wrong: ["30"], explanation: "Without: 85; with: 120 − 90 = 30; reduction = 55 a.u." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the energy of the products is the same with and without the enzyme.", points: ["The reactants and products are the same / enzyme does not change the reaction", "Enzyme only lowers activation energy; overall energy change is unchanged (enzyme not used up)"], modelAnswer: "The same reactants form the same products, so the overall energy change is identical; the enzyme only provides a pathway with a lower activation energy and is itself unchanged." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why sucrase does not hydrolyse lactose.", points: ["Lactose has a different shape from sucrose", "Not complementary to the active site of sucrase, so no enzyme-substrate complex forms (enzymes are specific)"], modelAnswer: "Lactose has a different shape from sucrose, so it is not complementary to sucrase's active site and cannot bind to form an enzyme-substrate complex; enzymes are specific." }),
    ],
    explanation: "Activation energy is peak minus reactants; enzymes do not change the overall energy change; specificity depends on complementary shape.",
    hints: ["Activation energy = peak − reactants."],
  });

  b.card("DEFINITION", "Define **enzyme**.", "A globular protein that acts as a biological catalyst, lowering activation energy, and is not used up.");
  b.card("DEFINITION", "Define **active site**.", "The region of an enzyme with a specific 3D shape, complementary to the substrate, where the substrate binds and reacts.");
  b.card("DEFINITION", "Define **activation energy**.", "The minimum energy that molecules need for a reaction to occur.");
  b.card("CONCEPT", "Lock-and-key v induced fit?", "Lock-and-key: rigid, exactly complementary active site. Induced fit: active site changes shape as substrate binds, straining bonds.");
  b.card("CONCEPT", "Intracellular v extracellular enzymes?", "Intracellular act inside the cell (catalase); extracellular are secreted and act outside (salivary amylase).");
  b.card("FACT", "Catalase reaction?", "2H₂O₂ → 2H₂O + O₂; follow by volume of oxygen collected.");
  b.card("CONCEPT", "How is the initial rate found?", "Gradient of a tangent to the product-time curve at t = 0.");
  b.card("CONCEPT", "Why does the rate fall during an enzyme reaction?", "Substrate is used up, so fewer enzyme-substrate collisions occur per second.");
  b.card("FACT", "Following amylase activity?", "Sample into iodine at intervals: blue-black fades to orange-brown as starch is hydrolysed; or use a colorimeter.");
});
