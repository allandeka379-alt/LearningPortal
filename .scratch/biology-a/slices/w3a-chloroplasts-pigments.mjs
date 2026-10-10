// W3a: chloroplasts and photosynthetic pigments.
import { concept, P, t, chk, sfStr, dpStr, table, rf } from "../lib.mjs";

concept("abio.photosynthesis.chloroplasts-pigments", { file: "photosynthesis/chloroplasts-pigments", keyPrefix: "photosynthesis.chloroplasts-pigments" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where in the chloroplast does the light-independent stage of photosynthesis take place?",
    options: [
      ["Stroma", "Correct: the Calvin cycle enzymes are in the stroma."],
      ["Thylakoid membranes", "The light-dependent stage happens here."],
      ["Thylakoid space", "Protons accumulate here during the light-dependent stage."],
      ["Intermembrane space of the envelope", "No stage of photosynthesis happens between the envelope membranes."],
    ],
    answer: "A",
    explanation: "Light-independent stage: **stroma**.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which pigment is found in the reaction centres of both photosystems?",
    options: [
      ["Chlorophyll a", "Correct: the primary pigment."],
      ["Chlorophyll b", "An accessory pigment in the light-harvesting system."],
      ["Carotene", "An accessory carotenoid pigment."],
      ["Xanthophyll", "An accessory carotenoid pigment."],
    ],
    answer: "A",
    explanation: "**Chlorophyll a** is the primary pigment at each reaction centre.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do leaves appear green?",
    options: [
      ["Chlorophylls absorb little green light, which is reflected or transmitted", "Correct: green is the least absorbed colour."],
      ["Chlorophylls absorb green light most strongly", "They absorb red and blue-violet most strongly."],
      ["Carotenoids give out green light when they absorb blue light", "Carotenoids are yellow and orange and do not emit green light."],
      ["Green light is used only in the light-independent stage", "The light-independent stage does not use light directly."],
    ],
    answer: "A",
    explanation: "Green light is mostly **reflected**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the role of accessory pigments such as xanthophyll?",
    options: [
      ["To absorb other wavelengths and pass energy to chlorophyll a", "Correct: they widen the range of usable light."],
      ["To split water molecules in the thylakoid space", "Photolysis is carried out by an enzyme complex of photosystem II."],
      ["To fix carbon dioxide in the stroma", "Rubisco fixes CO₂."],
      ["To store the energy of light as starch grains in the stroma", "Starch is made from triose phosphate, not by pigments."],
    ],
    answer: "A",
    explanation: "Accessory pigments **extend the absorption range** and funnel energy to chlorophyll a.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "An electron micrograph of a chloroplast shows stacks of flattened membranes. What is the advantage of this arrangement?",
    options: [
      ["A large surface area for pigments, electron carriers and ATP synthase", "Correct: more light absorbed and more ATP made."],
      ["A large volume of fluid for the enzymes of the Calvin cycle", "The Calvin cycle enzymes are in the stroma, not in the stacks."],
      ["Space to store starch made from triose phosphate", "Starch grains lie in the stroma."],
      ["A barrier that stops carbon dioxide reaching the stroma", "CO₂ must reach the stroma for fixation."],
    ],
    answer: "A",
    explanation: "Grana give a **large membrane area** for the light-dependent stage.",
    hints: ["What is located in the thylakoid membranes?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In paper chromatography of leaf pigments, why must the origin line be above the level of the solvent?",
    options: [
      ["The pigments would dissolve into the solvent", "Correct: the spot would wash out."],
      ["The solvent front could not be seen", "The front is visible whatever the origin height."],
      ["Light could not reach the pigments", "Light plays no part in separation."],
      ["The Rf values would all be greater than 1", "Rf can never exceed 1."],
    ],
    answer: "A",
    explanation: "A submerged spot **dissolves** into the solvent reservoir.",
    hints: ["What happens to a pigment spot placed directly in the solvent?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "The action spectrum of a plant is slightly higher than its absorption spectrum for chlorophylls between 480 and 520 nm. Which is the best explanation?",
    options: [
      ["Carotenoids absorb there and pass energy to chlorophyll a", "Correct: accessory pigments contribute."],
      ["Chlorophyll a reflects most light at these wavelengths", "Reflection would lower, not raise, the rate."],
      ["The light-independent stage absorbs light at these wavelengths", "The Calvin cycle does not absorb light."],
      ["Photosynthesis at these wavelengths uses heat instead of light", "Photosynthesis is driven by light energy."],
    ],
    answer: "A",
    explanation: "Carotenoids absorb in the blue-green region and **pass the energy on**.",
    hints: ["Which pigments are not included in the chlorophyll absorption spectrum?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which structure is found in the stroma of a chloroplast?",
    options: [
      ["70S ribosomes", "Correct: chloroplasts have prokaryote-sized ribosomes."],
      ["80S ribosomes", "80S ribosomes are found in the cytoplasm of eukaryotic cells."],
      ["Cristae", "Cristae are folds of the inner mitochondrial membrane."],
      ["Linear chromosomes with histones", "Chloroplast DNA is circular."],
    ],
    answer: "A",
    explanation: "The stroma contains circular DNA and **70S ribosomes**.",
    hints: ["Chloroplasts resemble prokaryotes in some features."],
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "An Rf value can never be greater than 1.",
    answer: true,
    explanation: "True. A spot cannot move further than the solvent front.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "An action spectrum shows the amount of light absorbed by each pigment at different wavelengths.",
    answer: false,
    explanation: "False. That is an **absorption** spectrum; an action spectrum shows the **rate of photosynthesis**.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each chloroplast structure to its function.",
    pairs: [
      ["Thylakoid membrane", "Site of the light-dependent stage"],
      ["Stroma", "Site of the Calvin cycle"],
      ["Starch grain", "Stores carbohydrate"],
      ["Envelope", "Controls entry and exit of substances"],
    ],
    explanation: "Each structure has a distinct role.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Stacks of thylakoids are called {{blank:a}}. Carotene is an {{blank:b}} colour, and chlorophylls absorb mainly red and {{blank:c}} light.",
    blanks: [
      { id: "a", accepted: ["grana"], choices: ["grana", "cristae", "lamellae"] },
      { id: "b", accepted: ["orange"], choices: ["orange", "green", "blue"] },
      { id: "c", accepted: ["blue-violet"], choices: ["blue-violet", "green", "yellow"] },
    ],
    explanation: "Grana; carotene is orange; chlorophylls absorb red and blue-violet.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the yellow carotenoid pigment found in chloroplasts.",
    accepted: ["xanthophyll", "xanthophylls"],
    wrong: ["carotene"],
    explanation: "**Xanthophyll** (carotene is orange).",
  });

  const front = 72, spot = 30;
  const rv = rf(spot, front);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "In a chromatogram of leaf pigments, the solvent front moved 72 mm and a yellow-green spot moved 30 mm from the origin. Calculate the Rf value of the spot, to two decimal places.",
    value: rv, dp: 2, wrong: [dpStr(front / spot, 2)],
    explanation: t`Rf $= 30 \div 72 = ${dpStr(rv, 2)}$. Dividing 72 by 30 gives a value above 1, which is impossible.`,
  });
  const rfKnown = 0.92, front2 = 85;
  const dist = rfKnown * front2;
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "With a certain solvent, carotene has an Rf of 0.92. If the solvent front moves 85 mm, how far, in mm, will the carotene spot move? Give your answer to one decimal place.",
    value: dist, dp: 1, unit: "mm", wrong: [dpStr(front2 / rfKnown, 1)],
    explanation: t`Distance $= \text{Rf} \times \text{front} = 0.92 \times 85 = ${dpStr(dist, 1)}$ mm.`,
    hints: ["Rearrange Rf = spot ÷ front."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how the structure of a chloroplast is adapted for photosynthesis.",
    points: [
      "Many thylakoids in grana give a large surface area for pigments / photosystems, electron carriers and ATP synthase",
      "Small thylakoid space allows a steep proton gradient to build up quickly",
      "Stroma contains enzymes of the Calvin cycle (rubisco) close to the thylakoids, so ATP and reduced NADP reach them easily",
      "Contains DNA and ribosomes to make some of its own proteins / starch grains store products",
    ],
    modelAnswer: "Thylakoids stacked into grana give a large surface area for photosystems, electron carriers and ATP synthase, so more light is absorbed and more ATP and reduced NADP are made. The thylakoid space is small, so protons pumped into it quickly form a steep gradient. The stroma surrounds the thylakoids and contains the Calvin cycle enzymes, so ATP and reduced NADP pass to them directly. The chloroplast has its own DNA and ribosomes to make some of its proteins, and starch grains store the carbohydrate it makes.",
    explanation: "Link each structure to a function.",
    hints: ["Work from the thylakoids outwards."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe how you would separate the pigments of a leaf by thin-layer chromatography and identify them.",
    points: [
      "Grind leaf with sand and propanone to extract pigments; filter or decant",
      "Apply a small, concentrated spot (repeated drying) on a pencil origin line near the bottom of the plate",
      "Stand in solvent in a sealed container with the origin above the solvent; remove when the front nears the top and mark the front",
      "Measure distances of spot centres and front from the origin; calculate Rf and compare colours / Rf with known pigments",
    ],
    modelAnswer: "Grind the leaf with sand and propanone to extract the pigments. With a fine capillary, apply a small spot to a pencil line near the bottom of the TLC plate, letting it dry between applications to make it concentrated. Stand the plate in a little solvent in a sealed container with the origin above the solvent surface. When the solvent front is near the top, remove the plate and mark the front. Measure from the origin to the centre of each spot and to the front, calculate the Rf values and identify each pigment by its colour and Rf compared with known standards.",
    explanation: "Extraction, spotting, running, measuring, identifying.",
    hints: ["Which line must be drawn in pencil, and why?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Suggest why a plant with several different photosynthetic pigments is at an advantage over one with chlorophyll a alone, in a shaded forest floor.",
    points: [
      "Light reaching the forest floor has had much of the red and blue absorbed by leaves above / is enriched in other wavelengths",
      "Accessory pigments absorb a wider range of wavelengths",
      "And pass energy to chlorophyll a, so more light energy is captured and photosynthesis is faster",
    ],
    modelAnswer: "Leaves of taller plants absorb much of the red and blue light, so the light reaching the forest floor is dim and contains relatively more of other wavelengths. Accessory pigments absorb a wider range of wavelengths than chlorophyll a alone and pass the energy to chlorophyll a, so the plant captures more of the available light and photosynthesises faster.",
    explanation: "Accessory pigments widen the absorption range.",
    hints: ["Which wavelengths are left after light passes through other leaves?"],
  });

  // Practice structured: chromatogram
  const fr = 75;
  const spots = [["1", "orange-yellow", 70], ["2", "yellow", 54], ["3", "blue-green", 47], ["4", "yellow-green", 33]];
  const rf3 = rf(47, fr);
  chk(Number(dpStr(rf3, 2)), 0.63);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `Tatenda separated the pigments from a maize leaf by paper chromatography. The solvent front moved 75 mm from the origin.\n\n${table(["Spot", "Colour", "Distance moved / mm"], spots.map(([n, c, d]) => [n, c, d]))}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the Rf value of spot 3, to two decimal places.", value: rf3, dp: 2, wrong: [dpStr(fr / 47, 2)], explanation: t`$47 \div 75 = ${dpStr(rf3, 2)}$.` }),
      P.short({ label: "(b)", marks: 1, stem: "Name the pigment in spot 1.", accepted: ["carotene", "beta-carotene", "β-carotene"], wrong: ["xanthophyll"], explanation: "Orange-yellow, moving furthest: **carotene**." }),
      P.short({ label: "(c)", marks: 1, stem: "Name the pigment in spot 3.", accepted: ["chlorophyll a"], rejected: ["chlorophyll b"], wrong: ["chlorophyll b"], explanation: "Blue-green: **chlorophyll a**." }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why the pigments move different distances.",
        points: ["Pigments differ in solubility in the solvent", "And in how strongly they are attracted to (adsorbed by) the paper; more soluble / less attracted pigments move further"],
        modelAnswer: "The pigments differ in how soluble they are in the solvent and in how strongly they are attracted to the paper. Pigments that are more soluble and less attracted to the paper move further, such as carotene.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest two precautions Tatenda should take to get reliable Rf values.",
        points: ["Small, concentrated spot / origin line in pencil above the solvent", "Seal the container so the solvent does not evaporate / mark the front immediately / measure to the centre of each spot"],
        modelAnswer: "He should apply a small, concentrated spot on a pencil line above the solvent, and seal the container, marking the solvent front as soon as the paper is removed and measuring to the centre of each spot.",
      }),
      P.tf({ label: "(f)", stem: "True or false: propanone used to extract the pigments is flammable, so no naked flames should be nearby.", answer: true, explanation: "True." }),
    ],
    explanation: "Rf = spot ÷ front; identify by colour and Rf.",
    hints: ["Carotene is the most soluble in the non-polar solvent."],
  });

  const wl = [425, 475, 525, 575, 625, 675];
  const abs = [88, 68, 22, 15, 40, 82];
  const act = [84, 72, 38, 28, 48, 86];
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `The table shows the absorption of light by leaf pigments and the rate of photosynthesis of a leaf at different wavelengths (illustrative values).\n\n${table(["Wavelength / nm", ...wl.map(String)], [["Absorption / %", ...abs.map(String)], ["Rate of photosynthesis / % of maximum", ...act.map(String)]])}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the type of graph that would show the rate of photosynthesis against wavelength.", accepted: ["action spectrum", "an action spectrum"], wrong: ["absorption spectrum"], explanation: "An **action spectrum**." }),
      P.manual({
        label: "(b)", marks: 2, stem: "Describe the relationship between absorption and the rate of photosynthesis.",
        points: ["Both high in blue-violet (425 nm: 88% and 84%) and red (675 nm: 82% and 86%)", "Both low in green (575 nm: 15% and 28%) / they follow the same pattern"],
        modelAnswer: "Both are high at 425 nm (88% and 84%) and 675 nm (82% and 86%) and low at 575 nm (15% and 28%), so the rate follows the same pattern as absorption.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why the rate at 525-575 nm is greater than the absorption by chlorophyll alone would suggest.",
        points: ["Accessory pigments / carotenoids absorb some light at these wavelengths", "And pass the energy to chlorophyll a in the reaction centre"],
        modelAnswer: "Accessory pigments such as carotenoids absorb some light near these wavelengths and pass the energy to chlorophyll a in the reaction centres, so some photosynthesis still occurs.",
      }),
      P.manual({
        label: "(d)", marks: 1, stem: "Suggest why plant growers in greenhouses often use lamps that give mainly red and blue light.",
        points: ["These wavelengths are absorbed most and give the highest rate of photosynthesis, so less energy is wasted on green light"],
        modelAnswer: "Red and blue light are absorbed most and give the highest rates of photosynthesis, so electricity is not wasted on green light that is mostly reflected.",
      }),
    ],
    explanation: "The similarity of the two spectra shows that absorbed light drives photosynthesis.",
    hints: ["Quote wavelengths and values in descriptions."],
  });

  b.card("FACT", "Sites of the two stages of photosynthesis", "Light-dependent: thylakoid membranes. Light-independent (Calvin cycle): stroma.");
  b.card("FACT", "Structures of a chloroplast", "Double envelope, thylakoids stacked as grana, intergranal lamellae, stroma, starch grains, lipid droplets, circular DNA, 70S ribosomes.");
  b.card("FACT", "Four photosynthetic pigments", "Chlorophyll a (blue-green, primary), chlorophyll b (yellow-green), carotene (orange), xanthophyll (yellow).");
  b.card("DEFINITION", "Define **absorption spectrum**.", "Graph of how much light a pigment absorbs at each wavelength.");
  b.card("DEFINITION", "Define **action spectrum**.", "Graph of the rate of photosynthesis at each wavelength.");
  b.card("FORMULA", "Rf value", "Rf = distance moved by spot ÷ distance moved by solvent front (no units, always < 1).");
  b.card("CONCEPT", "Role of accessory pigments", "Absorb wavelengths chlorophyll a absorbs poorly and pass energy to chlorophyll a; carotene also protects against excess light.");
  b.card("CONCEPT", "Why are thylakoids stacked?", "Large membrane area for photosystems, carriers and ATP synthase.");
});
