// W2a: transpiration, potometer, cohesion-tension and xerophytes.
import { concept, P, t, chk, table, capillaryVolume, mean, dpStr, sfStr, rnd, pctChange } from "../lib.mjs";

concept("abio.plant-transport.transpiration", { file: "plant-transport/transpiration", keyPrefix: "plant-transport.transpiration" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "From which surfaces does water evaporate during transpiration?",
    options: [
      ["The cell walls of mesophyll cells", "Correct: water evaporates into the air spaces, then vapour diffuses out."],
      ["The guard cells only", "Guard cells control the stomata; evaporation is from all the wet mesophyll walls."],
      ["The inside walls of xylem vessels", "Xylem supplies the water but evaporation happens from mesophyll walls."],
      ["The outer surface of the cuticle", "The cuticle is waxy and reduces evaporation."],
    ],
    answer: "A",
    explanation: "Water evaporates from the wet **mesophyll cell walls** into the air spaces; water vapour then diffuses out of the stomata.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which change would decrease the rate of transpiration of a maize plant?",
    options: [
      ["An increase in humidity", "Correct: moist air reduces the water vapour potential gradient."],
      ["An increase in wind speed", "Wind keeps the gradient steep, increasing transpiration."],
      ["An increase in light intensity", "Light opens stomata, increasing transpiration."],
      ["An increase in temperature", "Warmth increases evaporation and diffusion."],
    ],
    answer: "A",
    explanation: "High humidity reduces the **water vapour potential gradient** between the air spaces and the air outside.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which force holds water molecules together as a continuous column in the xylem?",
    options: [
      ["Cohesion due to hydrogen bonds between water molecules", "Correct."],
      ["Adhesion of water to the vessel walls", "Adhesion is attraction to the walls, not between water molecules."],
      ["Root pressure pushing water upwards", "Root pressure pushes water but does not hold molecules together."],
      ["Osmosis between neighbouring xylem vessels", "Xylem vessels are dead tubes; osmosis does not hold the column together."],
    ],
    answer: "A",
    explanation: "**Cohesion** (hydrogen bonding between water molecules) holds the column together under tension.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why must a leafy shoot be cut and fitted to a potometer under water?",
    options: [
      ["To stop air entering the xylem and breaking the water column", "Correct: an air lock stops water being drawn up."],
      ["To keep the leaves cool so that transpiration is reduced", "Only the cut end is under water; the leaves are in air."],
      ["To let the leaves absorb water through their stomata", "Leaves are not dipped; uptake is through the cut stem."],
      ["To dissolve the waxy cuticle from the cut stem surface", "Water does not dissolve wax."],
    ],
    answer: "A",
    explanation: "Air entering the xylem would form **air locks**, breaking cohesion of the column and stopping uptake.",
    hints: ["What would happen if air got into the xylem vessels?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which adaptation of marram grass leaves works mainly by trapping humid air near the stomata?",
    options: [
      ["Hairs inside the rolled leaf", "Correct: hairs hold still, moist air near the sunken stomata."],
      ["Thick cuticle on the outer surface", "A thick cuticle reduces evaporation through the epidermis, not by trapping air."],
      ["Lignified fibres giving support", "Fibres support the leaf; they do not trap air."],
      ["Large hinge cells that lose water", "Hinge cells allow rolling; they do not themselves trap air."],
    ],
    answer: "A",
    explanation: "Hairs (and rolling, and sunken stomata) trap humid air, lowering the **water vapour potential gradient**.",
    hints: ["Which feature changes the air next to the stomata?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "The diameter of a tree trunk was measured over 24 hours. It was smallest in the early afternoon. What does this suggest?",
    options: [
      ["Xylem sap is under tension when transpiration peaks", "Correct: tension pulls vessel walls inwards slightly."],
      ["Root pressure is greatest in the early afternoon", "High positive pressure would make the trunk wider, not narrower."],
      ["The trunk loses most of its water by evaporation from its bark", "Bark loses little water; this does not explain the timing."],
      ["Phloem sap flows fastest at night", "This is unrelated to a midday decrease in diameter."],
    ],
    answer: "A",
    explanation: "Transpiration peaks in the early afternoon, so the **tension** in the xylem is greatest and the trunk shrinks slightly: evidence for cohesion-tension.",
    hints: ["When is transpiration fastest?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A potometer actually measures which of these?",
    options: [
      ["The rate of water uptake by the shoot", "Correct: uptake approximately equals transpiration."],
      ["The rate of water vapour loss through stomata only", "It measures water entering the stem, not vapour leaving."],
      ["The rate of photosynthesis of the leaves", "Some water is used in photosynthesis, but that is not what is measured."],
      ["The rate of root pressure in the plant", "There are no roots on a cut shoot."],
    ],
    answer: "A",
    explanation: "A potometer measures **water uptake**; a small fraction is used in the plant, so it slightly overestimates transpiration.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Adhesion is the attraction between water molecules and the walls of xylem vessels.",
    answer: true,
    explanation: "True. Water forms hydrogen bonds with cellulose and lignin in the walls.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Wind increases the rate of transpiration because it opens the stomata wider.",
    answer: false,
    explanation: "False. Wind removes humid air from around the leaf, keeping the water vapour potential gradient steep. It does not open stomata.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each xerophytic feature to how it reduces water loss.",
    pairs: [
      ["Rolled leaf", "Traps humid air inside the roll"],
      ["Thick waxy cuticle", "Reduces evaporation through the epidermis"],
      ["Succulent tissue", "Stores water for dry periods"],
      ["Spine-like leaves", "Small surface area for water loss"],
    ],
    explanation: "Some features slow loss; succulence stores water.",
    hints: ["Which feature does not reduce loss at all, but stores water?"],
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "Evaporation from the leaves creates a {{blank:a}} in the xylem; water is pulled up because of {{blank:b}} between water molecules.",
    blanks: [
      { id: "a", accepted: ["tension"], choices: ["tension", "root pressure", "turgor", "vacuum"] },
      { id: "b", accepted: ["cohesion"], choices: ["cohesion", "adhesion", "osmosis", "active transport"] },
    ],
    explanation: "Transpiration pull: tension plus cohesion.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of bond between water molecules that is responsible for cohesion.",
    accepted: ["hydrogen bond", "hydrogen bonds", "hydrogen bonding", "H bonds", "H-bonds"],
    wrong: ["covalent bond", "ionic bond"],
    explanation: "**Hydrogen bonds** form between the δ+ hydrogen of one molecule and the δ− oxygen of another.",
  });

  // Potometer calculations (numbers differ from the lesson)
  const r = 0.4, l = 35, mins = 4;
  const vol = capillaryVolume(r, l);
  const rate = vol / mins;
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true, daily: false,
    stem: "In a potometer with a capillary tube of internal radius 0.4 mm, the bubble moved 35 mm in 4 minutes. Calculate the rate of water uptake in mm³/min, to three significant figures.",
    value: rate, unit: "mm³/min", sf: 3, wrong: [sfStr(capillaryVolume(0.2, l) / mins, 3), sfStr(vol, 3), sfStr(35 / 4, 3)],
    explanation: t`1. Volume $= \pi r^2 l = \pi \times 0.4^2 \times 35 = ${sfStr(vol, 4)}\ \text{mm}^3$.
2. Rate $= ${sfStr(vol, 4)} \div 4 = ${sfStr(rate, 3)}\ \text{mm}^3\ \text{min}^{-1}$.
3. Treating 0.4 mm as the diameter gives ${sfStr(capillaryVolume(0.2, l) / mins, 3)}; forgetting to divide by time gives ${sfStr(vol, 3)}.`,
    hints: ["Volume of a cylinder = πr²l.", "Divide by the time."],
  });
  const d1 = [18, 16, 17];
  const m1 = mean(d1);
  chk(m1, 17);
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "Three potometer readings of the distance moved by a bubble in 3 minutes were 18 mm, 16 mm and 17 mm. Calculate the mean rate of movement of the bubble in mm/min, to three significant figures.",
    value: m1 / 3, unit: "mm/min", sf: 3, wrong: [17, 51],
    explanation: t`Mean distance $= (18 + 16 + 17) \div 3 = 17$ mm; rate $= 17 \div 3 = ${sfStr(m1 / 3, 3)}$ mm/min.`,
  });

  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 5,
    stem: "Explain how water moves from the xylem in the root to the air outside a leaf.",
    points: [
      "Water evaporates from mesophyll cell walls into air spaces; vapour diffuses out through stomata",
      "Water moves from xylem in the leaf veins to mesophyll cells to replace it (osmosis / apoplast)",
      "This creates tension / negative pressure at the top of the xylem column",
      "Cohesion: hydrogen bonds between water molecules mean the whole column is pulled up (transpiration pull / mass flow)",
      "Adhesion of water to xylem walls helps / lignified walls stop vessels collapsing",
    ],
    modelAnswer: "Water evaporates from the wet walls of mesophyll cells into the air spaces, and the vapour diffuses out through the stomata. Water moves from the xylem in the veins into the mesophyll cells to replace it, creating a tension at the top of the xylem. Because water molecules are held together by hydrogen bonds (cohesion), the whole column is pulled upwards by mass flow. Adhesion to the vessel walls helps support the column, and lignin stops the vessels collapsing.",
    explanation: "Evaporation → tension → cohesion → mass flow, plus adhesion.",
    hints: ["Start at the leaf and work back to the root."],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Suggest four precautions or steps that make potometer results reliable.",
    points: [
      "Cut the shoot under water / fit it under water so no air enters the xylem",
      "Make joints airtight (e.g. petroleum jelly) / dry the leaves",
      "Allow the shoot to equilibrate in each condition before measuring",
      "Repeat readings (at least three) and calculate a mean / keep other conditions such as temperature and light constant",
    ],
    modelAnswer: "Cut and fit the shoot under water so no air enters the xylem; seal the joints with petroleum jelly and dry the leaves; let the shoot settle for several minutes in each condition; repeat each reading at least three times and keep temperature and light constant.",
    explanation: "Air locks, leaks, equilibration and replicates.",
    hints: ["Think about air entering, leaks and replicates."],
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 3,
    stem: "An aloe growing on a rocky hillside near Bulawayo has thick, fleshy leaves with a thick waxy cuticle and opens its stomata mainly at night. Explain how each of these features helps it survive dry conditions.",
    points: [
      "Fleshy (succulent) leaves store water in large parenchyma cells for use in dry periods",
      "Thick waxy cuticle reduces evaporation through the epidermis",
      "Stomata open at night when it is cooler and more humid, so less water vapour is lost (steeper gradient by day avoided)",
    ],
    modelAnswer: "The fleshy leaves store water in large cells to use during dry periods. The thick waxy cuticle cuts evaporation through the epidermis. Opening the stomata at night, when air is cooler and more humid, means far less water vapour diffuses out than it would by day.",
    explanation: "Store, waterproof, time the gas exchange.",
    hints: ["Why is night a better time to open stomata in a dry place?"],
  });

  // Practice structured: potometer and light
  const light = [0, 25, 50, 75, 100];
  const dist = [[4, 5, 4], [11, 12, 13], [20, 21, 19], [26, 25, 27], [27, 26, 28]];
  const means = dist.map(mean);
  const radius = 0.5;
  const vol100 = capillaryVolume(radius, means[4]);
  const rate100 = vol100 / 5;
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Nyasha used a potometer (capillary radius 0.5 mm) to measure the distance moved by the bubble in 5 minutes at different light intensities (percentage of full lamp output), with temperature kept constant.\n\n${table(["Light intensity / %", "Reading 1 / mm", "Reading 2 / mm", "Reading 3 / mm"], light.map((x, i) => [x, ...dist[i]]))}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the mean distance moved at 50% light intensity, in mm.", value: means[2], unit: "mm", wrong: [60], explanation: t`$(20 + 21 + 19) \div 3 = 20$ mm.` }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the rate of water uptake at 100% light intensity in mm³/min, to three significant figures.",
        value: rate100, unit: "mm³/min", sf: 3, wrong: [sfStr(vol100, 3), sfStr(capillaryVolume(0.25, means[4]) / 5, 3)],
        explanation: t`Mean $= 27$ mm. Volume $= \pi \times 0.5^2 \times 27 = ${sfStr(vol100, 4)}\ \text{mm}^3$. Rate $= ${sfStr(vol100, 4)} \div 5 = ${sfStr(rate100, 3)}\ \text{mm}^3\ \text{min}^{-1}$.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Describe the effect of light intensity on water uptake.",
        points: ["Uptake increases as light intensity increases, up to 75%", "Then levels off between 75% and 100% (quote: 26 mm and 27 mm means)"],
        modelAnswer: "Water uptake rises with light intensity from a mean of about 4.3 mm at 0% to 26 mm at 75%, then levels off, with 27 mm at 100%.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain the effect of increasing light intensity from 0% to 75%.",
        points: ["Light causes stomata to open (wider / more stomata open)", "More water vapour diffuses out, so more water is pulled up the xylem / taken up"],
        modelAnswer: "As light intensity increases, more stomata open and they open wider, so more water vapour diffuses out of the leaves and more water is drawn up through the xylem and taken up by the shoot.",
      }),
      P.manual({
        label: "(e)", marks: 1, stem: "Suggest why there was still some water uptake at 0% light intensity.",
        points: ["Some water lost through the cuticle / stomata not fully closed / water used to maintain turgor"],
        modelAnswer: "Some water is still lost through the cuticle and through stomata that are not fully closed.",
      }),
    ],
    explanation: "Rate = πr²l ÷ time; uptake rises with light as stomata open, then levels off.",
    hints: ["Use the mean distance for the volume."],
    calculator: true,
  });
  chk(means[2], 20);
  chk(means[4], 27);

  const still = [13, 15, 14];
  const fan = [29, 31, 33];
  const pc = pctChange(mean(still), mean(fan));
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Two identical shoots were compared: one in still air, one in front of a fan. Distances moved by the bubble in 4 minutes were:\n\n${table(["Condition", "Reading 1 / mm", "Reading 2 / mm", "Reading 3 / mm"], [["Still air", ...still], ["Fan", ...fan]])}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the percentage increase in the mean distance moved with the fan, to the nearest whole number.",
        value: pc, dp: 0, unit: "%", wrong: [rnd(pctChange(mean(fan), mean(still)), 0)],
        explanation: t`Means: still air $14$ mm, fan $31$ mm. $\dfrac{31 - 14}{14} \times 100 = ${dpStr(pc, 1)} \approx ${dpStr(pc, 0)}\%$.`,
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why the fan increased water uptake.",
        points: ["Moving air removes the layer of humid air / water vapour outside the stomata", "Steeper water vapour potential gradient, so faster diffusion of vapour out and faster transpiration pull"],
        modelAnswer: "The fan removes the humid air next to the leaf surface, so the water vapour potential gradient between the air spaces and the outside air stays steep. Vapour diffuses out faster and more water is pulled up.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "State two variables that should have been controlled.",
        points: ["Temperature / light intensity / humidity", "Leaf area / same species or size of shoot / same capillary tube"],
        modelAnswer: "Temperature and light intensity, and shoots of the same species with similar leaf areas.",
      }),
    ],
    explanation: "Wind maintains the diffusion gradient.",
    hints: ["Percentage change = (new − original) ÷ original × 100."],
    calculator: true,
  });

  b.card("DEFINITION", "Define **transpiration**.", "Loss of water vapour from the aerial parts of a plant: evaporation from mesophyll cell walls, then diffusion of vapour out through stomata.");
  b.card("FORMULA", "Volume of water taken up in a potometer", "V = πr²l (r = capillary radius, l = distance moved by the bubble).");
  b.card("CONCEPT", "Cohesion-tension in four steps", "Evaporation from leaves → tension in xylem → cohesion (hydrogen bonds) pulls the column up → adhesion to walls helps.");
  b.card("FACT", "Factors increasing transpiration", "Higher light intensity, higher temperature, more wind, lower humidity.");
  b.card("FACT", "Why cut a shoot under water for a potometer?", "To stop air entering the xylem and breaking the water column.");
  b.card("CONCEPT", "Marram grass adaptations", "Rolled leaf, sunken stomata in grooves, hairs, thick cuticle on the outer surface, stomata only on the inner surface.");
  b.card("FACT", "Evidence that xylem sap is under tension", "Trunk diameter shrinks when transpiration is fastest; cut vessels draw air in.");
  b.card("DEFINITION", "Define **adhesion** (in xylem).", "Attraction of water molecules to the hydrophilic walls of xylem vessels by hydrogen bonding.");
  b.card("CONCEPT", "Why wind increases transpiration", "Removes humid air around the leaf, keeping a steep water vapour potential gradient.");
});
