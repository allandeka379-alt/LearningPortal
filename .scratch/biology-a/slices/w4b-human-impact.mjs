// W4b: human impact on ecosystems (ZIMSEC only, Form 6).
import { concept, P, t, chk, table, pctChange, dpStr, sfStr } from "../lib.mjs";

concept("abio.ecology.human-impact", { file: "ecology/human-impact", keyPrefix: "ecology.human-impact" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which gas is released by burning firewood and contributes most to the enhanced greenhouse effect?",
    options: [
      ["Carbon dioxide", "Correct."],
      ["Oxygen", "Oxygen is used, not released, in burning."],
      ["Nitrogen", "Nitrogen is not a greenhouse gas."],
      ["Sulfur dioxide", "Sulfur dioxide causes acid rain."],
    ],
    answer: "A",
    explanation: "Burning wood releases **CO₂**, a greenhouse gas that absorbs infrared radiation.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does removing trees from a hillside increase soil erosion?",
    options: [
      ["Roots no longer bind the soil and the canopy no longer breaks rain", "Correct: two protective roles lost."],
      ["Fewer leaves fall, so the soil contains less nitrate to hold it", "Nitrate does not bind soil particles together."],
      ["The soil becomes waterlogged, so denitrifying bacteria loosen it", "Denitrification does not loosen soil structure."],
      ["Less oxygen is released, so soil organisms die and the soil collapses", "This is not the mechanism of erosion."],
    ],
    answer: "A",
    explanation: "Roots bind soil; the canopy and litter reduce the impact of raindrops and slow runoff.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "During eutrophication of a dam, which organisms are directly responsible for the fall in dissolved oxygen?",
    options: [
      ["Aerobic bacteria decomposing dead plants and algae", "Correct: their respiration uses up oxygen."],
      ["Algae photosynthesising rapidly at the water surface", "Photosynthesis releases oxygen."],
      ["Fish feeding on the large numbers of algae present", "Fish are victims, not the main cause."],
      ["Nitrifying bacteria converting nitrate to nitrogen gas", "Nitrifiers make nitrate; denitrifiers make N₂."],
    ],
    answer: "A",
    explanation: "Aerobic decomposers respire as they break down dead matter, using up dissolved oxygen (raising BOD).",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which plant is an invasive species that forms floating mats on Zimbabwean dams and rivers?",
    options: [
      ["Water hyacinth", "Correct: *Eichhornia crassipes*."],
      ["*Lantana camara*", "Lantana is an invasive shrub on land."],
      ["Msasa", "Msasa is a native woodland tree."],
      ["Papyrus", "Papyrus is a native wetland sedge."],
    ],
    answer: "A",
    explanation: "**Water hyacinth** forms dense floating mats on nutrient-rich water.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why are concentrations of a persistent insecticide often highest in fish eagles in a lake ecosystem?",
    options: [
      ["It is not broken down and accumulates up each step of the food chain", "Correct: biomagnification."],
      ["Fish eagles absorb it directly from the water through their skin", "Birds take it in mainly through food."],
      ["Fish eagles break it down into more toxic substances in their liver", "The issue is accumulation of the persistent chemical itself."],
      ["Fish eagles feed only on plants that were sprayed with the insecticide", "Fish eagles are carnivores."],
    ],
    answer: "A",
    explanation: "A persistent, fat-soluble pesticide is stored in tissues; each consumer eats many prey, so concentration rises at each trophic level.",
    hints: ["How many fish does one eagle eat in its life?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Below a gold panning site, the water is very cloudy. Why does the number of algae in the river fall?",
    options: [
      ["Silt reduces light penetration, so photosynthesis decreases", "Correct: light becomes limiting."],
      ["Silt adds nitrate, so algae are poisoned by excess nutrient", "Silt does not poison algae with nitrate."],
      ["Silt raises the water temperature above the algae's optimum", "Silt does not cause this."],
      ["Silt increases dissolved oxygen, which inhibits photosynthesis", "Silt does not raise oxygen."],
    ],
    answer: "A",
    explanation: "Turbid water absorbs and scatters light, so algae and plants photosynthesise less.",
    hints: ["What do algae need from sunlight?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which feature most helps an introduced plant to become invasive in its new range?",
    options: [
      ["It has no natural herbivores or diseases there", "Correct: freed from natural enemies."],
      ["It has a lower rate of reproduction than native plants", "Invasives usually reproduce faster."],
      ["It needs a narrow range of specialised conditions", "A narrow tolerance limits spread."],
      ["It is eaten readily by local herbivores", "Being eaten would hold it back."],
    ],
    answer: "A",
    explanation: "Without the predators, competitors and diseases that limit it at home, an introduced species can spread rapidly.",
    hints: ["What keeps its numbers in check in its native range?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Effluent from a food factory enters a river. Downstream, dissolved oxygen falls and then gradually rises again further away. What best explains the recovery?",
    options: [
      ["Decomposers use up the organic matter and oxygen dissolves from air", "Correct: BOD falls; reaeration and photosynthesis restore oxygen."],
      ["Fish downstream use less oxygen because their populations have migrated", "Fish are not the cause of the recovery."],
      ["Algae downstream die, so more oxygen is left dissolved in the water", "Dying algae would lower oxygen further."],
      ["The water temperature increases downstream, so more oxygen dissolves", "Warmer water holds less oxygen."],
    ],
    answer: "A",
    explanation: "As decomposers use up the organic matter, oxygen demand falls; oxygen dissolves from the air and from photosynthesis, so levels recover.",
    hints: ["What is using up the oxygen, and does it last?"],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Methane from cattle and nitrous oxide from fertilised soils are both greenhouse gases.",
    answer: true,
    explanation: "True. Both absorb infrared radiation; agriculture is a major source of each.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Global warming is caused mainly by the thinning of the ozone layer.",
    answer: false,
    explanation: "False. Global warming results from greenhouse gases trapping infrared radiation; ozone depletion is a separate problem involving ultraviolet radiation.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each human activity with an effect it causes.",
    pairs: [
      ["Overuse of nitrate fertiliser", "Eutrophication of dams"],
      ["Gold panning in riverbeds", "Siltation and high turbidity"],
      ["Exposure of sulfide mine waste", "Acidic, metal-rich streams"],
      ["Cutting woodland for tobacco curing", "Habitat loss and soil erosion"],
      ["Spraying a persistent insecticide", "Bioaccumulation in top carnivores"],
    ],
    explanation: "Each activity has a characteristic effect on ecosystems.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "Greenhouse gases such as carbon dioxide absorb {{blank:a}} radiation emitted by the Earth's surface. Clearing forests increases atmospheric carbon dioxide because less is removed by {{blank:b}} and more is released by {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["infrared"], choices: ["infrared", "ultraviolet", "visible"] },
      { id: "b", accepted: ["photosynthesis"], choices: ["photosynthesis", "respiration", "transpiration"] },
      { id: "c", accepted: ["burning"], choices: ["burning", "photosynthesis", "transpiration"] },
    ],
    explanation: "Infrared is trapped; deforestation means less photosynthesis and more burning or decay.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for the build-up of a persistent chemical in an organism's tissues, increasing along a food chain.",
    accepted: ["bioaccumulation", "biomagnification", "bio-accumulation", "biological magnification"],
    wrong: ["eutrophication"],
    explanation: "**Bioaccumulation** (biomagnification along food chains).",
  });

  // Numerical: percentage decrease in sensitive taxa (new data)
  const up = 14, down = 5;
  const pc = pctChange(up, down);
  b.num({
    d: 3, skill: "APPLICATION",
    stem: `Upstream of a mine, Tendai found ${up} invertebrate taxa in a kick sample; downstream of a mine drainage outlet she found ${down}. Calculate the percentage decrease in the number of taxa. Give your answer to one decimal place.`,
    value: -pc, dp: 1, unit: "%", wrong: [rnd1(((up - down) / down) * 100)],
    explanation: `(${up} − ${down}) ÷ ${up} × 100 = ${dpStr(-pc, 1)}% decrease. Dividing by the downstream value gives ${dpStr(((up - down) / down) * 100, 1)}%, which is wrong.`,
    hints: ["Divide the change by the upstream (starting) value."],
  });
  function rnd1(x) { return Math.round(x * 10) / 10; }

  // Calculation: area cleared
  const ha = 0.6, barns = 35;
  const tot = chk(ha * barns, 21);
  const pcWood = chk((tot / 150) * 100, 14);
  calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `In an illustrative scenario, curing the crop from one tobacco barn for one season uses the wood from ${ha} hectares of woodland. A district has ${barns} barns that each run for one season. All the wood comes from one woodland of 150 hectares. Calculate the percentage of this woodland cleared in the season.`,
    value: pcWood, unit: "%", wrong: [tot],
    explanation: t`1. Area cleared $= ${ha} \times ${barns} = ${tot}$ hectares.
2. Percentage of the woodland $= \dfrac{${tot}}{150} \times 100 = ${pcWood}\%$.
3. Giving the area (${tot}) instead of the percentage answers only the first step.`,
    hints: ["Multiply first, then express as a percentage of 150 ha."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how water hyacinth on a dam can lead to the death of fish.",
    points: [
      "Dense floating mats block light from submerged plants and algae",
      "Submerged plants cannot photosynthesise, so less oxygen is released into the water",
      "Mats reduce diffusion of oxygen from the air into the water / reduce mixing",
      "Dead hyacinth and plants are decomposed by aerobic bacteria that use up oxygen, so fish suffocate",
    ],
    modelAnswer: "The dense floating mats block light, so submerged plants and algae photosynthesise less and release less oxygen. The mats also stop oxygen dissolving from the air at the surface. When the hyacinth and other plants die, aerobic bacteria decompose them and use up much of the remaining oxygen, so fish die from lack of oxygen.",
    explanation: "Light, gas exchange and decomposition.",
    hints: ["Consider light, surface gas exchange and decomposers."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe four effects of deforestation on an ecosystem.",
    points: [
      "Loss of habitat (food, nesting sites) for animals, so species decline or are lost / fragmentation",
      "Soil erosion because roots no longer bind soil and the canopy no longer breaks the rain",
      "Siltation of rivers and dams downstream",
      "Less transpiration and more runoff, changing local rainfall and river flow / less CO₂ absorbed, more released",
    ],
    modelAnswer: "Animals lose food, shelter and nesting sites, so populations decline and become isolated. Without roots and canopy, topsoil is eroded and gullies form. Eroded soil silts up rivers and dams. Less water is transpired and more runs off, changing river flow, and less carbon dioxide is taken up while more is released by burning.",
    explanation: "Any four distinct effects.",
    hints: ["Think about animals, soil, water and the atmosphere."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Discuss the advantages and disadvantages of biological control of water hyacinth using weevils that feed only on it.",
    points: [
      "Advantage: specific to water hyacinth, so native plants are not harmed (if properly tested)",
      "Advantage: self-sustaining and cheap after release / no chemical pollution of water",
      "Disadvantage: slow; reduces but rarely eradicates the weed / weevil numbers fluctuate",
      "Disadvantage: risk that the agent attacks non-target species or becomes invasive if not tested; works less well where eutrophication keeps nutrients high",
    ],
    modelAnswer: "Host-specific weevils attack only water hyacinth, so they do not harm native plants, and once established they breed and spread by themselves without repeated cost or chemical pollution of drinking water. However, control is slow and seldom eliminates the weed, and on very nutrient-rich water the plant may grow faster than the weevils can damage it. There is also a risk to native species if the agent has not been thoroughly tested before release.",
    explanation: "Balance: specific, cheap, clean versus slow, incomplete and needs careful testing.",
    hints: ["Give both sides."],
  });

  // Practice structured: dam data
  const months = ["Oct", "Nov", "Dec", "Jan", "Feb"];
  const nitrate = [1.2, 1.4, 4.8, 6.1, 5.5];
  const algae = [3, 4, 18, 41, 36];
  const oxy = [8.1, 7.9, 6.4, 3.2, 3.9];
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Rudo monitored a small dam below irrigated farmland from October to February. Fertiliser was applied to the fields in late November, before the main rains.\n\n${table(["Month", ...months], [["Nitrate / mg dm⁻³", ...nitrate.map((x) => x.toFixed(1))], ["Algal cells / thousands per cm³", ...algae.map(String)], ["Dissolved oxygen / mg dm⁻³", ...oxy.map((x) => x.toFixed(1))]])}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the percentage decrease in dissolved oxygen from October to January. Give your answer to one decimal place.",
        value: -pctChange(oxy[0], oxy[3]), dp: 1, unit: "%", wrong: [rnd1(((oxy[0] - oxy[3]) / oxy[3]) * 100)],
        explanation: `(${oxy[0]} − ${oxy[3]}) ÷ ${oxy[0]} × 100 = ${dpStr(-pctChange(oxy[0], oxy[3]), 1)}%.`,
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Describe the changes in nitrate and algae, and suggest a reason for the change in nitrate.",
        points: ["Nitrate low (1.2-1.4 mg dm⁻³) in Oct-Nov, rising sharply to 6.1 mg dm⁻³ in January", "Algae rise from 3 to 41 thousand per cm³, following the nitrate rise", "Fertiliser applied in November was leached/washed into the dam by the rains"],
        modelAnswer: "Nitrate stays low at 1.2-1.4 mg dm⁻³ in October and November, then rises sharply to a peak of 6.1 mg dm⁻³ in January. Algae follow the same pattern, rising from 3 to 41 thousand cells per cm³. Fertiliser applied in late November was leached and washed into the dam by the rains.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why dissolved oxygen was lowest in January.",
        points: ["Large numbers of algae block light, so submerged plants (and lower algae) die", "Dead material is decomposed by aerobic bacteria", "Bacterial respiration uses up dissolved oxygen faster than it is replaced"],
        modelAnswer: "In January the algal bloom was at its largest. It shaded submerged plants and lower algae, which died. Aerobic bacteria decomposed this dead material and their respiration used up dissolved oxygen faster than it was replaced by photosynthesis and diffusion from the air.",
      }),
    ],
    explanation: "Leaching → algal bloom → decomposition → oxygen depletion.",
    hints: ["Link the timing of fertiliser, rain, nitrate and algae."],
    calculator: true,
  });
  const site = ["Grazed, no contours", "Grazed, contour ridges", "Ungrazed grassland"];
  const soil = [18.5, 7.2, 1.6];
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Farai collected the soil washed off three 20 m² plots on the same slope during one rainy season.\n\n${table(["Plot", "Soil lost / kg"], site.map((s, i) => [s, soil[i].toFixed(1)]))}`,
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "How many times more soil was lost from the grazed plot without contours than from the ungrazed plot? Give your answer to two significant figures.",
        value: soil[0] / soil[2], sf: 2, wrong: [Number(sfStr(soil[2] / soil[0], 2))],
        explanation: `${soil[0]} ÷ ${soil[2]} = ${sfStr(soil[0] / soil[2], 2)} times.`,
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Explain the difference between the grazed plot without contours and the ungrazed plot.",
        points: ["Overgrazing removes plant cover, exposing bare soil to raindrop impact", "Fewer roots to bind the soil", "More, faster runoff down the slope carries soil away / trampling compacts soil and reduces infiltration"],
        modelAnswer: "Grazing removes the grass cover, so raindrops hit bare soil and loosen it. There are fewer roots binding the soil, and trampling compacts it so less water infiltrates. More water runs off, faster, carrying soil down the slope.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain how contour ridges reduced soil loss.",
        points: ["Ridges across the slope slow runoff / break the slope into short sections", "Slower water drops its soil / more water infiltrates"],
        modelAnswer: "The ridges run across the slope, so they slow the flow of runoff and break the slope into short sections. Slower water carries less soil and more of it soaks into the ground.",
      }),
    ],
    explanation: "Plant cover and contours both reduce erosion.",
    hints: ["What protects soil from rain?"],
    calculator: true,
  });

  b.card("DEFINITION", "Define **eutrophication**.", "Nutrient enrichment of water (nitrate, phosphate) causing algal blooms and then oxygen depletion as dead matter decomposes.");
  b.card("CONCEPT", "Effects of deforestation", "Habitat loss and fragmentation; soil erosion; siltation; altered water cycle; more CO₂ in the air.");
  b.card("FACT", "Two Zimbabwean drivers of deforestation", "Firewood for cooking and heating; wood for curing tobacco (also land clearing for farms and settlement).");
  b.card("CONCEPT", "How does gold panning affect rivers?", "Silt increases turbidity, reducing light and photosynthesis and smothering invertebrates; mercury pollutes and bioaccumulates.");
  b.card("DEFINITION", "Define **bioaccumulation**.", "Build-up of a persistent substance in tissues, increasing along food chains (highest in top carnivores).");
  b.card("CONCEPT", "Enhanced greenhouse effect", "Extra CO₂, CH₄ and N₂O absorb infrared radiation from the Earth, warming the lower atmosphere.");
  b.card("CONCEPT", "Why water hyacinth is harmful", "Mats block light and gas exchange; dead plants decompose, using oxygen; blocks boats, intakes and canals.");
  b.card("FACT", "Acid mine drainage", "Sulfide minerals in mine waste are oxidised to sulfuric acid, lowering stream pH and dissolving toxic metals.");
  b.card("FACT", "Three methods of controlling invasive plants", "Mechanical removal; herbicides; biological control with a tested, host-specific natural enemy.");
});
