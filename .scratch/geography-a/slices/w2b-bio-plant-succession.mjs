// W2b: bio.plant-succession (ZIMSEC only; items are tagged to ZIMSEC automatically).
// Computed: species 28 - 9 = 19, 19/9 = 211%; (28 - 16)/16 = 75%; organic matter (2.4 - 1.6)/10 = 0.08 and (3.5 - 2.4)/25 = 0.044;
// cover (85 - 70)/10 = 1.5; height (9.0 - 3.5)/25 = 0.22; dam depth (2.4 - 1.5)/20 = 0.045 per year, 1.5/0.045 = 33 years.
import { concept, P, geographyLevels, chk, rnd } from "../lib.mjs";
import { mc, tbl } from "../tables/w2b-_q.mjs";

const YEARS = [1, 5, 15, 40];
const COVER = [35, 70, 85, 95];
const SPP = [9, 16, 22, 28];
const OM = [1.1, 1.6, 2.4, 3.5];
const HT = [0.4, 1.2, 3.5, 9.0];
const TAB = tbl(["Years since abandonment", ...YEARS], [["Plant cover (%)", ...COVER], ["Species per 100 m²", ...SPP], ["Soil organic matter (%)", ...OM], ["Mean plant height (m)", ...HT]]);
const spInc = chk(SPP[3] - SPP[0], 19);
const spPct = rnd(((SPP[3] - SPP[0]) / SPP[0]) * 100, 0, 211, "spPct");
const spPct2 = chk(((SPP[3] - SPP[1]) / SPP[1]) * 100, 75);
const omRate = chk(Math.round(((OM[3] - OM[2]) / 25) * 1000) / 1000, 0.044);
const coverRate = chk((COVER[2] - COVER[1]) / 10, 1.5);
const htRate = chk((HT[3] - HT[2]) / 25, 0.22);
const damRate = chk((2.4 - 1.5) / 20, 0.045, 1e-9);
const damYears = rnd(1.5 / damRate, 0, 33, "damYears");

concept("ageo.bio.plant-succession", { file: "bio/plant-succession", keyPrefix: "bio.plant-succession" }, (b) => {
  mc(b, 1, "RECALL", "What is **plant succession**?", [
    ["The gradual change in a plant community through time", "Correct: one community modifies the habitat and is replaced by another."],
    ["The yearly migration of animals between wet and dry areas", "That is animal migration, not succession."],
    ["The total mass of living plants in a given area", "That describes biomass."],
    ["The transfer of nutrients from soil to plant roots", "That is nutrient uptake, one flow within an ecosystem."],
  ], "**Succession** is the orderly change in a plant community over time.");
  mc(b, 1, "RECALL", "Which of these is the usual **first stage** in a lithosere on bare granite?", [
    ["Crustose lichens and algae", "Correct: they tolerate bare rock and begin weathering it."],
    ["Large shade-tolerant trees", "Trees need deep soil and appear late."],
    ["Perennial grasses and shrubs", "These need soil, which lichens help to form."],
    ["Floating-leaved water plants", "These belong to a hydrosere, not a lithosere."],
  ], "The lithosere starts with **lichens**, then mosses, annuals, perennials, shrubs and trees.");
  mc(b, 2, "UNDERSTANDING", "Why is secondary succession usually faster than primary succession?", [
    ["Soil, seeds and roots remain after the disturbance", "Correct: the community does not have to build soil first."],
    ["The climate is warmer where secondary succession occurs", "Climate does not decide the difference between the two."],
    ["There are fewer plant species available to colonise", "The pool of colonisers is not smaller; soil is the key."],
    ["Animals plant the trees immediately after a fire", "Animals help to spread seeds but do not explain the speed."],
  ], "Secondary succession starts with **soil, seeds and roots** already present.");
  mc(b, 2, "UNDERSTANDING", "Which describes a **pioneer species**?", [
    ["A hardy species that colonises bare ground first", "Correct: pioneers tolerate harsh conditions and prepare the habitat."],
    ["A slow-growing tree that dominates the climax", "That is typical of late stages."],
    ["An animal that grazes the grass in a savanna", "A pioneer species is a plant."],
    ["A plant that grows only in deep shade", "Shade-tolerant plants appear after the canopy forms."],
  ], "Pioneers are hardy colonisers of new or disturbed ground.");
  mc(b, 2, "UNDERSTANDING", "Which sequence is correct for a **hydrosere** in a shallow dam?", [
    ["Open water, floating plants, reedswamp, marsh, woodland", "Correct: sediment and plant remains raise the bed stage by stage."],
    ["Woodland, marsh, reedswamp, floating plants, open water", "This sequence runs in the wrong direction."],
    ["Bare rock, lichens, mosses, grasses, trees", "That is a lithosere."],
    ["Annual weeds, grasses, shrubs, miombo woodland", "That is a secondary succession on a field."],
  ], "In a hydrosere silt and dead plants fill the basin, giving drier conditions in each stage.");
  mc(b, 3, "APPLICATION", "A veld fire burns all the grass and shrubs on a hillside but leaves the soil. Which statement is correct?", [
    ["Secondary succession will begin from seeds and roots", "Correct: soil survives, so it is secondary succession."],
    ["Primary succession will begin on the bare soil", "Primary succession needs a surface with no soil."],
    ["No succession is possible without lichens first", "Lichens are needed only on bare rock."],
    ["The area will remain permanent bare ground", "Plants usually recolonise quickly after fire."],
  ], "Because soil remains, the regrowth is **secondary succession**.", { hints: ["Ask whether the soil is still there."] });
  mc(b, 3, "ANALYSIS", "Which trend is typical as succession moves from the pioneer stage towards the climax?", [
    ["Soil organic matter and biomass increase", "Correct: more plant remains and larger plants accumulate."],
    ["Species diversity falls steadily to a single species", "Diversity generally increases through the sere."],
    ["Soil depth decreases as roots remove the soil", "Soil usually becomes deeper and richer in humus."],
    ["Food webs become simpler and less stable", "They become more complex."],
  ], "Biomass, soil organic matter, soil depth and food web complexity all increase.", { hints: ["Think about what accumulates over time."] });
  b.tf({ d: 1, skill: "RECALL", stem: "A lithosere begins on bare rock.", answer: true,
    feedbackTrue: "Correct: litho means rock.",
    feedbackFalse: "Not so: a lithosere starts on rock, a hydrosere in water.",
    explanation: "Lithosere: bare rock. Hydrosere: open water." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Succession on an abandoned maize field is an example of primary succession.", answer: false,
    feedbackFalse: "Correct: the field still has soil, so it is secondary succession.",
    feedbackTrue: "Not so: soil is present, so this is secondary succession.",
    explanation: "Primary succession needs a surface with no soil; an old field has soil." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "The final, relatively stable community is the {{blank:a}} community. Succession that starts on bare rock is a {{blank:b}}. A community held back by repeated burning is a {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["climax"], choices: ["climax", "pioneer", "seral"] },
      { id: "b", accepted: ["lithosere"], choices: ["lithosere", "hydrosere", "prisere"] },
      { id: "c", accepted: ["plagioclimax"], choices: ["plagioclimax", "climatic climax", "pioneer stage"] },
    ], explanation: "Climax, lithosere and plagioclimax are the standard terms." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its meaning.",
    pairs: [
      ["Sere", "The whole sequence of communities from pioneers to the climax"],
      ["Seral stage", "One community within the sequence"],
      ["Hydrosere", "Succession that begins in open fresh water"],
      ["Plagioclimax", "A community held at an earlier stage by human activity"],
    ], explanation: "These four terms describe the stages and types of succession." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, unit: "units", dp: 0,
    stem: `Illustrative data from quadrats on an abandoned maize field (data invented for this exercise):\n\n${TAB}\n\nHow many more species per 100 m² were present after 40 years than after 1 year?`,
    hints: ["Subtract the year 1 value from the year 40 value."],
    value: spInc, wrong: [28, 211],
    explanation: "28 − 9 = **19** species." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "%", dp: 0,
    stem: `Use the data:\n\n${TAB}\n\nCalculate the percentage increase in species per 100 m² between year 5 and year 40, to the nearest whole number.`,
    hints: ["Find the increase first, then divide by the year 5 value."],
    value: spPct2, wrong: [43, 175],
    explanation: "Increase = 28 − 16 = 12. 12 ÷ 16 × 100 = **75%**. Dividing by the year 40 value (28) gives 43%, the wrong base." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the final stable community in a succession.",
    accepted: ["climax", "climax community", "the climax", "the climax community", "climatic climax"], wrong: ["pioneer"],
    explanation: "The **climax** community is relatively stable." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the type of succession that begins in open fresh water.",
    accepted: ["hydrosere", "a hydrosere", "hydroseral", "hydrosere succession"], wrong: ["lithosere"],
    explanation: "A **hydrosere** begins in open water." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how lichens help to prepare bare rock for later plants.",
    hints: ["Think about weathering and about what happens when lichens die."],
    points: [
      "Lichens release weak acids that chemically weather the rock surface.",
      "They trap dust and dead remains in the cracks.",
      "When they die and decay they add humus, forming a thin soil in which mosses and small plants can root.",
    ],
    modelAnswer: "Lichens release weak acids that weather the rock surface, and they trap dust. When they die they decay into humus, giving a thin soil in which mosses and small plants can root.",
    explanation: "Weathering, trapping of dust and humus formation prepare the habitat." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Compare primary and secondary succession.",
    hints: ["Give a similarity or difference in the starting point, the speed and the soil."],
    points: [
      "Primary succession starts on a surface with no soil, such as bare rock or open water; secondary succession starts where soil remains.",
      "Secondary succession is faster because seeds, roots and soil are already present.",
      "Primary succession needs pioneers such as lichens to build soil first; secondary succession begins with weeds and grasses.",
      "Both follow a sequence of seral stages with rising biomass and diversity towards a climax.",
    ],
    modelAnswer: "Primary succession starts on a surface with no soil, such as bare rock, while secondary succession starts where soil remains after a fire or clearance. Secondary succession is therefore faster because seeds and roots are present, whereas primary succession needs lichens to create soil first. Both pass through seral stages towards a climax.",
    explanation: "Compare starting point, speed, first colonisers and the shared path." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: `Illustrative data from plots on an abandoned field (data invented for this exercise):\n\n${TAB}\n\nDescribe how the plant community changes with time.`,
    hints: ["Quote values for at least three of the four rows.", "Mention any variable that changes more slowly."],
    points: [
      "Plant cover rises from 35% in year 1 to 95% in year 40.",
      "Species per 100 m² rise from 9 to 28.",
      "Mean plant height rises from 0.4 m to 9.0 m, showing a change from herbs to trees.",
      "Soil organic matter rises from 1.1% to 3.5%, but more slowly in the later period (0.044 percentage points per year from year 15 to 40 compared with 0.08 from year 5 to 15).",
    ],
    modelAnswer: "All the variables increase with time. Cover rises from 35% to 95%, species from 9 to 28 per 100 m² and mean height from 0.4 m to 9.0 m, which shows herbs being replaced by trees. Soil organic matter rises from 1.1% to 3.5%, but more slowly later (0.044 percentage points per year between years 15 and 40 compared with 0.08 between years 5 and 15).",
    explanation: "Describe each trend with figures and note the slowing rate." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: `Illustrative data from quadrats on an abandoned maize field (data invented for this exercise):\n\n${TAB}`,
    hints: ["Rate of change = change in value ÷ time.", "Think about what plant remains add to the soil."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the mean rate of increase in plant cover between year 5 and year 15, in percentage points per year.", value: coverRate, dp: 1, wrong: [15, 0.15],
        explanation: "(85 − 70) ÷ 10 = 1.5 percentage points per year." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the mean rate of increase in plant height between year 15 and year 40, in m per year, to 2 decimal places.", value: htRate, dp: 2, unit: "m", wrong: [5.5, 2.2],
        explanation: "(9.0 − 3.5) ÷ 25 = 0.22 m per year." }),
      P.mcq({ label: "(c)", marks: 1, stem: "What type of succession does this field show?", options: [
        ["Secondary succession", "Correct: soil was present when cultivation stopped."],
        ["Primary succession on bare rock", "A field has soil; bare rock is not involved."],
        ["A hydrosere in open water", "The site is dry land."],
        ["A climax community from the start", "Climax is the final stage, not the start."],
      ], answer: "A", explanation: "Succession on abandoned farmland is secondary." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why soil organic matter increases as succession proceeds.",
        points: [
          "Plant cover and height increase, so more leaf litter and dead roots are added each year.",
          "Decomposers break down this litter into humus, which is mixed into the soil.",
          "The cooler, shadier, moister conditions under taller plants and the reduced erosion help humus to build up.",
        ],
        modelAnswer: "As cover and height increase, more leaf litter and dead roots are added every year. Decomposers turn this into humus, and shade under the taller plants keeps the surface moist and protected, so organic matter builds up.",
        explanation: "More litter, decomposition and protection raise organic matter." }),
    ], explanation: "Calculate rates of change, identify the succession type and explain soil development." });

  b.struct({ d: 3, skill: "ANALYSIS",
    stem: "A small farm dam in Mashonaland was 2.4 m deep in the year 2000. A survey in the year 2020 found that silt and reedswamp plants had reduced the deepest water to 1.5 m (illustrative figures, invented for this exercise).",
    hints: ["Rate = change in depth ÷ number of years.", "Years remaining = depth now ÷ rate."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the mean rate at which the depth decreased, in m per year.", value: damRate, dp: 3, unit: "m", wrong: [0.9, 0.0625],
        explanation: "(2.4 − 1.5) ÷ 20 = 0.045 m per year." }),
      P.num({ label: "(b)", marks: 2, stem: "If the rate stays the same, in how many more years will the deepest water be filled, to the nearest year?", value: damYears, dp: 0, unit: "years", wrong: [20, 53],
        explanation: "1.5 ÷ 0.045 = 33.3, so about 33 years." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain one way in which reedswamp plants speed up the filling of the dam.",
        points: [
          "Reed stems slow the water and trap silt, which settles on the bed.",
          "Dead reed material builds up as peat and plant remains, raising the bed.",
        ],
        modelAnswer: "Reed stems slow the inflow so silt settles, and dead reeds pile up on the bed as plant remains, raising the bottom and making the water shallower.",
        explanation: "Reeds trap sediment and add dead plant matter." }),
    ], explanation: "A hydrosere fills a basin; use the figures to find a rate and a time." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the extent to which human activities prevent plant communities in Zimbabwe from reaching their climatic climax.",
    hints: ["Cover fire, grazing, cutting and cultivation, then balance with natural controls.", "Finish with a supported judgement."],
    points: [
      "Annual burning, set for hunting or grazing, kills tree seedlings and favours fire-resistant grasses, producing a fire-maintained savanna.",
      "Heavy grazing by cattle and goats removes seedlings and keeps grass short, which holds the community at an early stage.",
      "Cutting wood for fuel, building and tobacco curing removes trees before they mature.",
      "Cultivation clears the vegetation and, where fields are abandoned, secondary succession restarts at an early stage.",
      "Settlement and roads fragment the vegetation and prevent regeneration in many areas.",
      "Natural factors also hold communities back: drought, poor soils, termites and wild herbivores such as elephants can keep the vegetation open.",
      "Where people stop the pressure, communities recover, for example in protected areas or fenced plots, showing that human activity is a main reason.",
      "Judgement: human activity is the main reason most communities are held at a plagioclimax, although climate and soils set the limits of what the climax could be.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Human activity strongly prevents communities from reaching their climax. Annual burning kills tree seedlings and favours fire-resistant grasses, heavy grazing removes seedlings, and cutting wood for fuel, building and tobacco curing removes trees before they mature. Cultivation clears land, and abandoned fields restart succession at an early stage. Natural factors such as drought, poor soils and elephants also keep woodland open. Where pressure stops, as in protected or fenced areas, vegetation recovers, which shows how important people are. I conclude that human activity is the main reason most Zimbabwean communities are plagioclimaxes, though climate and soils set the limits of the potential climax.",
    wordLimit: { max: 300 }, explanation: "Weigh human against natural controls and reach a judgement." });

  b.card("DEFINITION", "Plant succession", "The gradual, orderly change of a plant community through time as each stage modifies the habitat and is replaced by the next.");
  b.card("DEFINITION", "Sere and seral stage", "Sere: the whole sequence of communities to the climax. Seral stage: one community in the sequence.");
  b.card("CONCEPT", "Lithosere sequence", "Crustose lichens, mosses and foliose lichens, annual herbs and ferns, perennial grasses, shrubs, trees (climax).");
  b.card("CONCEPT", "Hydrosere sequence", "Open water, submerged and floating plants, reedswamp, marsh or sedge meadow, shrubs, woodland.");
  b.card("CONCEPT", "Primary versus secondary succession", "Primary starts with no soil (rock, water) and is slow. Secondary starts with soil after fire, felling or abandonment and is faster.");
  b.card("DEFINITION", "Pioneer species", "Hardy species that colonise bare or disturbed ground first and prepare the habitat for later species.");
  b.card("DEFINITION", "Climax community", "The relatively stable final community, in balance with climate and soil.");
  b.card("DEFINITION", "Plagioclimax", "A community held at an earlier stage than the climatic climax by human activity such as burning or grazing.");
  b.card("CONCEPT", "Changes during succession", "Species diversity, biomass, soil depth, organic matter and food web complexity increase.");
});
