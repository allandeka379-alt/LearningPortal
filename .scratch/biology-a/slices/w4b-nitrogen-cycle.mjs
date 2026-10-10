// W4b: the nitrogen cycle (ZIMSEC only, Form 6).
import { concept, P, t, chk, table, pctChange, dpStr, mean } from "../lib.mjs";

concept("abio.ecology.nitrogen-cycle", { file: "ecology/nitrogen-cycle", keyPrefix: "ecology.nitrogen-cycle" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which bacterium oxidises ammonium ions to nitrite ions in the soil?",
    options: [
      ["*Nitrosomonas*", "Correct: the first step of nitrification."],
      ["*Nitrobacter*", "*Nitrobacter* oxidises nitrite to nitrate."],
      ["*Rhizobium*", "*Rhizobium* fixes nitrogen gas in root nodules."],
      ["*Pseudomonas*", "*Pseudomonas* is a denitrifying bacterium."],
    ],
    answer: "A",
    explanation: "*Nitrosomonas*: NH₄⁺ → NO₂⁻. *Nitrobacter* then oxidises NO₂⁻ → NO₃⁻.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which process converts nitrate ions in the soil into nitrogen gas?",
    options: [
      ["Denitrification", "Correct: by anaerobic bacteria such as *Pseudomonas*."],
      ["Nitrification", "Nitrification produces nitrate from ammonium."],
      ["Ammonification", "Ammonification releases ammonium from dead matter."],
      ["Nitrogen fixation", "Fixation converts nitrogen gas into ammonium."],
    ],
    answer: "A",
    explanation: "Denitrification reduces NO₃⁻ to N₂ in anaerobic soil.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What do *Rhizobium* bacteria receive from the groundnut plant in whose root nodules they live?",
    options: [
      ["Carbohydrates from photosynthesis", "Correct: the plant supplies sugars for the bacteria's respiration."],
      ["Ammonium ions to make amino acids", "Ammonium passes from the bacteria to the plant."],
      ["Nitrate ions absorbed from the soil", "The bacteria do not depend on soil nitrate from the plant."],
      ["Nitrogen gas from the leaf air spaces", "N₂ diffuses into the nodule from the soil air."],
    ],
    answer: "A",
    explanation: "Mutualism: the plant gives carbohydrates (and shelter); *Rhizobium* gives fixed nitrogen as ammonium.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which enzyme catalyses biological nitrogen fixation?",
    options: [
      ["Nitrogenase", "Correct."],
      ["Nitrate reductase", "Nitrate reductase acts on nitrate inside plant cells, not on N₂."],
      ["Leghaemoglobin", "Leghaemoglobin is an oxygen-binding pigment, not an enzyme."],
      ["Deaminase", "Deamination removes amino groups during ammonification."],
    ],
    answer: "A",
    explanation: "**Nitrogenase** reduces N₂ to ammonia, using ATP.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why do root nodules of legumes contain leghaemoglobin?",
    options: [
      ["It binds oxygen, keeping oxygen low around nitrogenase", "Correct: nitrogenase is inhibited by oxygen."],
      ["It binds nitrogen gas and carries it to the nitrogenase", "Leghaemoglobin binds oxygen, not nitrogen."],
      ["It absorbs light energy to provide ATP for fixation", "Nodules are underground; ATP comes from respiration."],
      ["It stores the ammonium ions made by the bacteria", "Ammonium is passed to the plant to make amino acids."],
    ],
    answer: "A",
    explanation: "Leghaemoglobin mops up oxygen, protecting nitrogenase, while still supplying oxygen for the bacteria's aerobic respiration.",
    hints: ["Which gas inhibits nitrogenase?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A field near Chinhoyi is waterlogged for several weeks. Which change in its soil is most likely?",
    options: [
      ["Denitrification increases and nitrification decreases", "Correct: anaerobic conditions favour denitrifiers."],
      ["Nitrification increases and denitrification decreases", "Nitrifying bacteria need oxygen, which is lacking."],
      ["Nitrogen fixation by *Rhizobium* increases sharply", "Waterlogging reduces nodule activity; fixation does not rise."],
      ["Ammonification stops because decomposers all die", "Many decomposers continue; this is not the main change."],
    ],
    answer: "A",
    explanation: "Water fills the air spaces, so oxygen is lacking: aerobic nitrifiers slow down and anaerobic denitrifiers convert nitrate to N₂.",
    hints: ["Which bacteria need oxygen?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Nitrifying bacteria are described as chemoautotrophs. What does this mean?",
    options: [
      ["They obtain energy by oxidising inorganic ions such as ammonium", "Correct: chemical energy, inorganic carbon."],
      ["They obtain energy by breaking down dead organic matter", "That describes saprotrophs (decomposers)."],
      ["They obtain energy from sunlight using chlorophyll", "That describes photoautotrophs."],
      ["They obtain energy from the sugars supplied by a host plant", "That describes *Rhizobium* in nodules."],
    ],
    answer: "A",
    explanation: "Chemoautotrophs use energy from oxidising inorganic substances (NH₄⁺, NO₂⁻) to fix carbon dioxide into organic compounds.",
    hints: ["'Chemo' = energy from chemical reactions; 'auto' = makes its own organic compounds."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Soya bean seed is planted in a field where soya has never been grown. The plants are pale yellow and have no pink nodules. What is the most likely reason?",
    options: [
      ["The soil lacks a strain of *Rhizobium* that forms nodules on soya", "Correct: inoculation with the right strain is needed."],
      ["The soil lacks *Nitrobacter*, so no nitrogen gas can be fixed", "*Nitrobacter* is a nitrifier, not a nitrogen fixer."],
      ["The soil contains too much oxygen, so nitrogenase is destroyed", "Nodules control oxygen with leghaemoglobin; no nodules formed here."],
      ["Soya cannot form nodules, so it always needs nitrate fertiliser", "Soya is a legume and does form nodules with the right bacteria."],
    ],
    answer: "A",
    explanation: "No nodules means no infection by a compatible *Rhizobium* strain; without fixed nitrogen the plants are nitrogen-deficient (yellow, chlorotic). Seed inoculants supply the right strain.",
    hints: ["What is missing if no nodules form at all?"],
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Plants can absorb nitrogen gas from the air through their stomata and use it to make proteins.",
    answer: false,
    explanation: "False. Plants absorb nitrate (and ammonium) ions from the soil through their roots; N₂ is unusable.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Ploughing and draining a heavy clay soil favours nitrifying bacteria.",
    answer: true,
    explanation: "True. Aeration supplies the oxygen that *Nitrosomonas* and *Nitrobacter* need.",
  });

  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each organism or agent with its role in the nitrogen cycle.",
    pairs: [
      ["*Rhizobium*", "Fixes nitrogen gas in legume root nodules"],
      ["*Nitrosomonas*", "Oxidises ammonium to nitrite"],
      ["*Nitrobacter*", "Oxidises nitrite to nitrate"],
      ["*Pseudomonas*", "Reduces nitrate to nitrogen gas"],
      ["Saprotrophic fungi", "Release ammonium from dead organisms"],
    ],
    explanation: "Fixation (*Rhizobium*), nitrification (*Nitrosomonas*, *Nitrobacter*), denitrification (*Pseudomonas*), ammonification (decomposers).",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "Decomposers release {{blank:a}} from proteins in dead leaves. In aerated soil this is oxidised to {{blank:b}} and then to {{blank:c}}, which plant roots absorb by {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["ammonium"], choices: ["ammonium", "nitrate", "nitrogen gas"] },
      { id: "b", accepted: ["nitrite"], choices: ["nitrite", "nitrate", "ammonium"] },
      { id: "c", accepted: ["nitrate"], choices: ["nitrate", "nitrite", "nitrogen gas"] },
      { id: "d", accepted: ["active transport"], choices: ["active transport", "osmosis", "phagocytosis"] },
    ],
    explanation: "Ammonification → ammonium; nitrification → nitrite → nitrate; uptake by active transport.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the red pigment found inside active root nodules of legumes.",
    accepted: ["leghaemoglobin", "leghemoglobin", "leg haemoglobin", "leg-haemoglobin"],
    wrong: ["haemoglobin"],
    explanation: "**Leghaemoglobin** binds oxygen, protecting nitrogenase.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the industrial process that fixes nitrogen gas to make ammonia for fertilisers.",
    accepted: ["Haber process", "the Haber process", "Haber-Bosch process", "Haber Bosch process", "Haber"],
    wrong: ["contact process"],
    explanation: "The **Haber** (Haber-Bosch) process combines N₂ and H₂ at high temperature and pressure over an iron catalyst.",
  });

  // Numerical: nitrate leached from plots (new data)
  const applied = 120, leached = 42;
  const pctLeached = (leached / applied) * 100;
  chk(pctLeached, 35);
  b.num({
    d: 2, skill: "APPLICATION",
    stem: `In an illustrative trial on a sandy soil, ${applied} kg of nitrogen per hectare was applied as ammonium nitrate in one dose before heavy rains. Drainage water was later found to contain ${leached} kg of this nitrogen per hectare. Calculate the percentage of the applied nitrogen that was leached.`,
    value: pctLeached, unit: "%", wrong: [rndOne((applied / leached) * 100)],
    explanation: `${leached} ÷ ${applied} × 100 = ${pctLeached}%. Dividing the wrong way round gives a value over 100%, which is impossible here.`,
  });
  function rndOne(x) { return Math.round(x); }

  // Calculation: nodules and plant nitrogen
  const ctrl = [1.8, 2.1, 1.9, 2.0, 2.2];
  const inoc = [2.9, 3.2, 3.0, 3.4, 3.1];
  const m1 = mean(ctrl), m2 = mean(inoc);
  const pc = pctChange(m1, m2);
  calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Thandeka grew soya beans in pots of sterilised soil. Half the seeds were coated with a *Rhizobium* inoculant. After eight weeks she measured the dry mass of each plant, in g.\n\n${table(["Plant", "1", "2", "3", "4", "5"], [["Not inoculated / g", ...ctrl.map((x) => x.toFixed(1))], ["Inoculated / g", ...inoc.map((x) => x.toFixed(1))]])}\n\nCalculate the percentage increase in mean dry mass of the inoculated plants compared with the plants that were not inoculated. Give your answer to one decimal place.`,
    value: pc, dp: 1, unit: "%", wrong: [rnd1(pctChange(m2, m1) * -1)],
    explanation: t`1. Mean not inoculated $= ${dpStr(m1, 2)}$ g; mean inoculated $= ${dpStr(m2, 2)}$ g.
2. Increase $= ${dpStr(m2 - m1, 2)}$ g.
3. Percentage increase $= \dfrac{${dpStr(m2 - m1, 2)}}{${dpStr(m1, 2)}} \times 100 = ${dpStr(pc, 1)}\%$. Dividing by the inoculated mean instead gives ${dpStr(-pctChange(m2, m1), 1)}%.`,
    hints: ["Find both means first.", "Divide the increase by the original (not inoculated) mean."],
  });
  function rnd1(x) { return Math.round(x * 10) / 10; }

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why rotating maize with groundnuts can reduce a farmer's need for nitrogen fertiliser.",
    points: [
      "Groundnuts are legumes with root nodules containing *Rhizobium*",
      "*Rhizobium* fixes nitrogen gas into ammonium (using nitrogenase), used by the plant to make proteins",
      "Groundnut residues / roots left in the soil are decomposed, releasing ammonium (ammonification)",
      "Ammonium is nitrified to nitrate by *Nitrosomonas* and *Nitrobacter*, which the following maize crop absorbs",
    ],
    modelAnswer: "Groundnuts are legumes whose root nodules contain *Rhizobium*. These bacteria fix nitrogen gas into ammonium using nitrogenase, and the plant uses it to make proteins. When the roots and crop residues are left in the soil, decomposers release ammonium from the proteins, and nitrifying bacteria convert it to nitrite and then nitrate, which the next maize crop absorbs. Less fertiliser is needed.",
    explanation: "Fixation → plant protein → ammonification → nitrification → nitrate for maize.",
    hints: ["Follow the nitrogen from the air into the next crop."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 5,
    stem: "Nitrate fertiliser washed from farmland enters a small dam. Explain how this may lead to the death of fish.",
    points: [
      "Nitrate is a nutrient that causes rapid growth of algae / algal bloom",
      "Algae at the surface block light from submerged plants",
      "Submerged plants (and algae) die",
      "Decomposers / bacteria break down the dead material, respiring aerobically and using up oxygen",
      "Dissolved oxygen falls, so fish die from lack of oxygen",
    ],
    modelAnswer: "Nitrate is a limiting nutrient for algae, so they multiply rapidly, forming an algal bloom. The bloom blocks light from submerged plants, which cannot photosynthesise and die, as do many algae. Aerobic bacteria decompose the dead material and use up dissolved oxygen in respiration. The oxygen concentration falls so low that fish die. This is eutrophication.",
    explanation: "Eutrophication: the full chain.",
    hints: ["Who uses up the oxygen?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Suggest four ways a farmer could reduce the loss of nitrate from a field to nearby rivers.",
    points: [
      "Apply fertiliser in split doses when the crop is growing / not before heavy rain",
      "Use legumes in rotation or organic manure that releases nitrogen slowly",
      "Leave a buffer strip of vegetation beside rivers",
      "Keep the soil covered (cover crop, mulch) / avoid bare soil and over-application / test soil before applying",
    ],
    modelAnswer: "Apply nitrogen fertiliser in several small doses when the crop can take it up, and not just before heavy rain. Use legume rotations and manure, which release nitrogen slowly. Leave a strip of natural vegetation beside streams to absorb runoff. Keep the soil covered with a cover crop or mulch and test the soil so that no more fertiliser than needed is applied.",
    explanation: "Any four sensible, specific measures.",
    hints: ["Think about timing, amount and barriers."],
  });

  // Practice structured: cycle described in words
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A description of part of the nitrogen cycle in a grassland:\n\n1. Process W converts nitrogen gas into ammonium in the nodules of clover roots.\n2. Cattle eat the grass and clover, and their urine and dung fall on the soil.\n3. Process X converts the nitrogen in urine and dung into ammonium.\n4. Process Y converts ammonium into nitrate in two steps.\n5. Process Z converts nitrate into nitrogen gas in the wettest parts of the field.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name process X.", accepted: ["ammonification", "putrefaction", "decomposition", "decay"], wrong: ["nitrification"], explanation: "Ammonification by saprotrophs." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the genus of bacterium that carries out the second step of process Y.", accepted: ["Nitrobacter"], wrong: ["Nitrosomonas"], explanation: "*Nitrobacter*: nitrite → nitrate." }),
      P.mcq({
        label: "(c)", stem: "Which condition favours process Z?",
        options: [
          ["Lack of oxygen in waterlogged soil", "Correct: denitrifiers are anaerobic."],
          ["High oxygen in well-drained soil", "This favours nitrification."],
          ["Low soil temperature in the winter", "Temperature is not the key condition named."],
          ["High light intensity at the surface", "Bacteria in soil do not need light."],
        ],
        answer: "A",
        explanation: "Z is denitrification, favoured in anaerobic soil.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain the role of process W in increasing the protein content of the grassland.",
        points: ["W is nitrogen fixation by *Rhizobium* using nitrogenase", "Ammonium is used by clover to make amino acids and proteins", "Clover protein enters cattle / is decomposed and nitrified, giving nitrate that grasses use to make protein"],
        modelAnswer: "W is nitrogen fixation by *Rhizobium* in the clover nodules, using nitrogenase. The ammonium is used by the clover to make amino acids and proteins. When cattle eat clover, or clover dies and is decomposed and nitrified, the nitrogen becomes available to grasses as nitrate for protein synthesis.",
      }),
    ],
    explanation: "W fixation, X ammonification, Y nitrification, Z denitrification.",
    hints: ["Identify each process first."],
  });
  const days = [0, 7, 14, 21, 28];
  const nh4 = [35, 26, 15, 8, 4];
  const no3 = [6, 14, 24, 31, 34];
  const pcNH4 = pctChange(nh4[0], nh4[4]);
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Sipho mixed chopped groundnut leaves into a moist, well-aerated soil kept at 25 °C and measured ammonium and nitrate in the soil each week.\n\n${table(["Time / days", ...days.map(String)], [["Ammonium / mg per kg soil", ...nh4.map(String)], ["Nitrate / mg per kg soil", ...no3.map(String)]])}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the percentage change in ammonium between day 0 and day 28. Give your answer to one decimal place.",
        value: pcNH4, dp: 1, unit: "%", wrong: [rnd1(pctChange(nh4[4], nh4[0]))],
        explanation: `(${nh4[4]} − ${nh4[0]}) ÷ ${nh4[0]} × 100 = ${dpStr(pcNH4, 1)}% (a decrease).`,
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Describe and explain the changes in ammonium and nitrate.",
        points: ["Ammonium falls from 35 to 4 mg per kg while nitrate rises from 6 to 34 mg per kg", "Nitrifying bacteria oxidise ammonium to nitrite (*Nitrosomonas*) and then nitrate (*Nitrobacter*)", "The soil is aerated, providing the oxygen they need"],
        modelAnswer: "Ammonium decreased from 35 to 4 mg per kg over 28 days, while nitrate increased from 6 to 34 mg per kg. *Nitrosomonas* oxidised ammonium to nitrite and *Nitrobacter* oxidised nitrite to nitrate; the well-aerated soil supplied the oxygen these aerobic bacteria need.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest where the ammonium at day 0 came from and why its source would keep supplying ammonium for a while.",
        points: ["Ammonification of proteins in the groundnut leaves by saprotrophic bacteria and fungi", "Leaves contain much protein (from fixed nitrogen), decomposed gradually"],
        modelAnswer: "Saprotrophic bacteria and fungi decompose the proteins in the groundnut leaves, releasing ammonium (ammonification). Legume leaves are rich in protein because of nitrogen fixation, and they decompose gradually, so ammonium continues to be released.",
      }),
      P.manual({
        label: "(d)", marks: 1, stem: "Predict how the nitrate results would differ if the soil had been waterlogged, and give a reason.",
        points: ["Nitrate would stay low / fall, because anaerobic conditions stop nitrification and allow denitrification to N₂"],
        modelAnswer: "Nitrate would stay low or fall, because without oxygen nitrifying bacteria cannot work and denitrifying bacteria reduce nitrate to nitrogen gas.",
      }),
    ],
    explanation: "Nitrification converts ammonium to nitrate in aerated soil.",
    hints: ["Which bacteria need oxygen?"],
    calculator: true,
  });

  b.card("DEFINITION", "Define **nitrogen fixation**.", "Conversion of N₂ gas into ammonia/ammonium, e.g. by nitrogenase in *Rhizobium*, by lightning or by the Haber process.");
  b.card("FACT", "Which bacteria carry out nitrification?", "*Nitrosomonas*: ammonium → nitrite. *Nitrobacter*: nitrite → nitrate. Both aerobic chemoautotrophs.");
  b.card("FACT", "Which bacteria carry out denitrification, and where?", "*Pseudomonas* and *Clostridium*, in anaerobic (waterlogged) soil: nitrate → N₂.");
  b.card("DEFINITION", "Define **ammonification**.", "Release of ammonium from proteins, nucleic acids and urea of dead organisms and wastes by saprotrophic bacteria and fungi.");
  b.card("CONCEPT", "What does leghaemoglobin do?", "Binds oxygen in root nodules, keeping O₂ low around nitrogenase (which oxygen inhibits).");
  b.card("CONCEPT", "Mutualism in root nodules", "*Rhizobium* gives the legume ammonium; the legume gives the bacteria carbohydrates and shelter.");
  b.card("CONCEPT", "Why does waterlogging reduce soil nitrate?", "No oxygen: nitrifiers stop and anaerobic denitrifiers reduce nitrate to N₂; water also leaches nitrate.");
  b.card("CONCEPT", "Eutrophication sequence", "Nitrate leached → algal bloom → light blocked → plants die → aerobic decomposers use O₂ → fish die.");
  b.card("FACT", "Four ways nitrogen gas is fixed", "*Rhizobium* in legumes; free-living bacteria (e.g. *Azotobacter*); lightning; the Haber process.");
});
