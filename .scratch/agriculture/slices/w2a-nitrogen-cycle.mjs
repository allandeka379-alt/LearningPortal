// Slice W2a: the nitrogen cycle.
import { concept, P, productForNutrient, pct, round, check, table, agricultureLevels } from "../lib.mjs";

// Num: AN equivalent of N left by groundnuts (assume 45 kg N/ha).
const anEq = productForNutrient(45, 34.5);
check(Math.abs(anEq - 130.4348) < 1e-3, "anEq");
// Num: nitrogen budget.
const BUD = { applied: 150, crop: 96, leached: 33, denit: 9 };
const left = BUD.applied - BUD.crop - BUD.leached - BUD.denit;
const lostPct = pct(BUD.leached + BUD.denit, BUD.applied);
check(left === 12 && Math.abs(lostPct - 28) < 1e-9, "budget");

// Structured: incubation experiment, nitrate in soil (mg/kg) over 4 weeks.
const INC = [["Moist, aerated soil", 12, 25, 38, 49], ["Waterlogged soil", 12, 9, 6, 4], ["Moist soil at 10 °C", 12, 15, 18, 21]];
const INC_TABLE = table(["Treatment", "Week 0", "Week 1", "Week 2", "Week 4"], INC);
const incRise = INC[0][4] - INC[0][1];
check(incRise === 37, "incRise");

concept("agri.soil.nitrogen-cycle", { file: "soil/nitrogen-cycle", keyPrefix: "soil.nitrogen-cycle" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which bacteria live in the root nodules of legumes and fix nitrogen?",
    options: [
      ["*Rhizobium*", "Correct: a symbiotic nitrogen-fixer."],
      ["*Nitrobacter*", "*Nitrobacter* changes nitrite to nitrate."],
      ["*Nitrosomonas*", "*Nitrosomonas* changes ammonium to nitrite."],
      ["Denitrifying bacteria of waterlogged soils", "They release nitrogen gas, the opposite of fixation."],
    ],
    answer: "A",
    explanation: "*Rhizobium* in legume nodules fixes nitrogen gas into compounds the plant uses.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is **nitrification**?",
    options: [
      ["The change of ammonium into nitrate by soil bacteria", "Correct: via nitrite, by Nitrosomonas then Nitrobacter."],
      ["The fixing of nitrogen gas by lightning and bacteria", "That is nitrogen fixation."],
      ["The change of nitrate into nitrogen gas", "That is denitrification."],
      ["The release of ammonium from dead organisms", "That is ammonification."],
    ],
    answer: "A",
    explanation: "Nitrification oxidises ammonium to nitrite and then nitrate in aerated soil.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In which form is most nitrogen taken up by crop roots?",
    options: [
      ["Nitrate", "Correct: nitrate (and some ammonium) is absorbed by roots."],
      ["Nitrogen gas", "Plants cannot use nitrogen gas directly."],
      ["Proteins from rotting leaves", "Proteins must first be broken down."],
      ["Nitrite, which is the form made directly by lightning", "Nitrite is a short-lived step and is toxic in quantity."],
    ],
    answer: "A",
    explanation: "Crops absorb mainly nitrate ions, with some ammonium.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which organisms release ammonium from the proteins in dead plants and dung?",
    options: [
      ["Decomposers such as saprophytic bacteria and fungi", "Correct: this is ammonification."],
      ["*Rhizobium* in root nodules", "*Rhizobium* fixes nitrogen gas."],
      ["Nitrifying bacteria", "They oxidise ammonium; they do not release it from proteins."],
      ["Earthworms, which digest all the nitrogen into nitrate", "Earthworms help break up material, but decomposers do the ammonification."],
    ],
    answer: "A",
    explanation: "Decomposers break down proteins, releasing ammonium.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A field is flooded for two weeks during heavy rains. Which part of the nitrogen cycle is most increased?",
    options: [
      ["Denitrification, releasing nitrogen gas", "Correct: no oxygen favours denitrifying bacteria."],
      ["Nitrification, making more nitrate", "Nitrifiers need oxygen, so nitrification slows."],
      ["Fixation by *Rhizobium* in the nodules of any weeds", "Waterlogging harms nodules."],
      ["Fixation by lightning during the storms", "Flooding does not affect lightning."],
    ],
    answer: "A",
    hints: ["Which bacteria work without oxygen?"],
    explanation: "In waterlogged soil denitrifying bacteria use nitrate instead of oxygen, releasing nitrogen gas.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Soya bean seed is coated with an inoculant before planting in a field where soya has never been grown. Why?",
    options: [
      ["To supply the right *Rhizobium* bacteria so nodules form and fix nitrogen", "Correct: the right strain may be absent from new land."],
      ["To kill the nitrifying bacteria in the soil around the seed so nitrate is not lost", "Nitrifying bacteria are useful."],
      ["To supply nitrate fertiliser directly to the seed", "Inoculant contains bacteria, not fertiliser."],
      ["To protect the seed from weevils during storage", "That is a seed-dressing insecticide."],
    ],
    answer: "A",
    hints: ["What do legume nodules contain?"],
    explanation: "Inoculants contain *Rhizobium* suited to the legume, so that effective nodules form.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Urea is spread on the surface of a moist, recently limed soil and not covered. Which loss of nitrogen is most likely?",
    options: [
      ["Volatilisation of ammonia gas", "Correct: surface urea on alkaline soil loses ammonia."],
      ["Denitrification in waterlogged soil", "The soil is moist, not waterlogged."],
      ["Fixation by lightning", "Fixation adds nitrogen."],
      ["Uptake by *Rhizobium* nodules on the maize roots", "Maize has no nodules."],
    ],
    answer: "A",
    hints: ["Urea is changed to ammonia; what happens to ammonia at the surface?"],
    explanation: "Urea is converted to ammonium and ammonia; at high pH on the surface, ammonia gas escapes. Cover urea with soil.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why does liming a very acid soil often increase the nitrate available to crops?",
    options: [
      ["Nitrifying bacteria and *Rhizobium* are more active when the soil is less acid", "Correct: both work poorly at low pH."],
      ["Lime contains a large amount of nitrate that is released as it dissolves", "Lime is calcium (and magnesium) carbonate."],
      ["Lime stops all leaching of nitrate from the root zone", "Lime does not stop leaching."],
      ["Lime turns nitrogen gas into nitrate", "Lime does not fix nitrogen."],
    ],
    answer: "A",
    hints: ["How does pH affect soil bacteria?"],
    explanation: "Raising the pH of a very acid soil favours nitrifiers and nodule bacteria, so more nitrogen is fixed and nitrified.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Most of the air is nitrogen gas, but crops cannot use nitrogen gas directly.",
    answer: true,
    explanation: "True. Nitrogen gas must be fixed before plants can use it.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Nitrifying bacteria work best in waterlogged soils.",
    answer: false,
    explanation: "False. Nitrifying bacteria need oxygen; waterlogged soils favour denitrifying bacteria.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each process with the change it brings about.",
    pairs: [
      ["Nitrogen fixation", "Nitrogen gas to ammonium compounds"],
      ["Ammonification", "Proteins in dead matter to ammonium"],
      ["Nitrification", "Ammonium to nitrite and then nitrate"],
      ["Denitrification", "Nitrate to nitrogen gas"],
    ],
    explanation: "Fixation, ammonification, nitrification and denitrification are the four key processes.",
  });
  b.fib({
    d: 3,
    stem: "Complete the sentence.",
    template: "During nitrification, {{blank:a}} oxidises ammonium to nitrite, and {{blank:b}} oxidises nitrite to nitrate.",
    blanks: [
      { id: "a", accepted: ["Nitrosomonas"], choices: ["Nitrosomonas", "Nitrobacter", "Rhizobium", "Azotobacter"] },
      { id: "b", accepted: ["Nitrobacter"], choices: ["Nitrosomonas", "Nitrobacter", "Rhizobium", "Azotobacter"] },
    ],
    hints: ["The bacterium whose name contains 'bacter' does the second step."],
    explanation: "*Nitrosomonas* then *Nitrobacter*.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "Assume a groundnut crop leaves 45 kg of nitrogen per hectare for the next crop and ammonium nitrate contains 34.5% N. Calculate the mass of ammonium nitrate that would supply the same nitrogen, in kg/ha, to one decimal place.",
    value: anEq, unit: "kg/ha", tol: 0.05, wrong: [round(45 * 0.345, 1), 45],
    explanation: `45 ÷ 0.345 = ${round(anEq, 1)} kg/ha. Multiplying by 0.345 (${round(45 * 0.345, 1)}) finds the nitrogen in 45 kg of fertiliser instead.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Assume a farmer applies ${BUD.applied} kg N/ha to a maize field. The crop takes up ${BUD.crop} kg, ${BUD.leached} kg is leached and ${BUD.denit} kg is lost by denitrification. Calculate the percentage of the applied nitrogen that was lost by leaching and denitrification together.`,
    value: lostPct, unit: "%", tol: 0, wrong: [round(pct(BUD.leached, BUD.applied), 0), BUD.leached + BUD.denit],
    hints: ["Add the two losses before dividing."],
    explanation: `Lost = ${BUD.leached} + ${BUD.denit} = ${BUD.leached + BUD.denit} kg; ${BUD.leached + BUD.denit} ÷ ${BUD.applied} × 100 = ${lostPct}%.`,
    workedSolution: `1. Total lost = ${BUD.leached} + ${BUD.denit} = ${BUD.leached + BUD.denit} kg N/ha.\n2. Percentage lost = ${BUD.leached + BUD.denit} ÷ ${BUD.applied} × 100 = ${lostPct}%.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the industrial process that makes ammonia from nitrogen and hydrogen for fertiliser manufacture.",
    accepted: ["Haber process", "Haber", "Haber-Bosch process", "Haber Bosch", "Haber-Bosch"],
    explanation: "The **Haber process**.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how lightning adds nitrogen to the soil.",
    hints: ["Energy, gases, rain."],
    points: [
      "Lightning provides energy to combine nitrogen and oxygen in the air.",
      "Forming nitrogen oxides, which dissolve in rain (as dilute nitric acid).",
      "The rain carries them into the soil as nitrate.",
    ],
    modelAnswer: "The energy of lightning makes nitrogen and oxygen in the air combine into nitrogen oxides. These dissolve in raindrops, forming dilute nitric acid, which falls on the soil and adds nitrate that roots can absorb.",
    explanation: "Energy → oxides → rain → nitrate.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8,
    stem: `Form 4 pupils mixed the same amount of chopped bean leaves into three pots of the same soil and measured the nitrate in the soil (mg per kg of soil) over four weeks.\n\n${INC_TABLE}`,
    hints: ["Which processes need oxygen and warmth?", "Nitrate comes from ammonium released by decomposers."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the increase in nitrate in the moist, aerated soil from week 0 to week 4, in mg per kg.",
        value: incRise, wrong: [INC[0][4]],
        explanation: `${INC[0][4]} − ${INC[0][1]} = ${incRise} mg/kg.`,
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Describe how nitrogen in the bean leaves became nitrate in the moist, aerated soil.",
        points: ["Decomposers (bacteria and fungi) broke down the leaf proteins, releasing ammonium (ammonification).", "*Nitrosomonas* oxidised ammonium to nitrite.", "*Nitrobacter* oxidised nitrite to nitrate (nitrification)."],
        explanation: "Ammonification then nitrification.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why the nitrate fell in the waterlogged soil.",
        points: ["No oxygen, so nitrification stopped.", "Denitrifying bacteria converted nitrate to nitrogen gas, which escaped."],
        explanation: "Anaerobic soil favours denitrification.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest why nitrate rose more slowly in the soil kept at 10 °C.",
        points: ["Low temperature slows the activity (enzymes, respiration) of decomposers and nitrifying bacteria.", "So ammonium and nitrate were produced more slowly."],
        explanation: "Bacterial activity depends on temperature.",
      }),
    ],
    explanation: "Decomposition and nitrification need warmth and oxygen; waterlogging causes denitrification.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: "Tatenda grows maize after maize every year and burns the stalks. His neighbour Nyasha rotates maize with groundnuts and works the residues into the soil. Nyasha's maize needs less nitrogen fertiliser.",
    hints: ["Which processes add nitrogen on Nyasha's farm?", "What does burning do to nitrogen?"],
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Explain how the groundnuts add nitrogen to Nyasha's soil.",
        points: ["*Rhizobium* in the root nodules fixes nitrogen gas from the soil air.", "When the roots and residues decompose, ammonium and then nitrate are released for the next crop."],
        explanation: "Symbiotic fixation then decomposition.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain how burning the stalks reduces the nitrogen in Tatenda's soil.",
        points: ["The nitrogen in the stalks is lost to the air as gases when they burn.", "No organic matter is returned to be decomposed into ammonium and nitrate."],
        explanation: "Burning removes nitrogen and organic matter.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest **two** other ways Tatenda could reduce his losses of nitrogen.",
        points: ["Split nitrogen top dressing / avoid applying before heavy rain (less leaching).", "Improve drainage (less denitrification) / cover urea with soil / add manure or compost / lime acid soil."],
        explanation: "Reduce leaching, denitrification and volatilisation.",
      }),
    ],
    explanation: "Legumes and residues add nitrogen; burning and poor management lose it.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Discuss the importance of the nitrogen cycle to a farmer who wants to keep the soil fertile while spending little on fertiliser.",
    hints: ["Which processes add nitrogen and which lose it?", "Which can the farmer control?"],
    points: [
      "Nitrogen is the nutrient most often limiting yields; crops need it as nitrate/ammonium.",
      "Fixation by Rhizobium in legumes adds nitrogen: rotate with legumes, inoculate seed.",
      "Decomposition and nitrification release nitrogen from manure, compost and residues: return organic matter.",
      "Losses by leaching, denitrification and volatilisation must be reduced: split dressings, drainage, covering urea.",
      "Liming acid soils helps nitrifiers and Rhizobium.",
      "Judgement: managing the cycle cuts fertiliser costs, but some fertiliser is still needed for high yields as crop removal takes nitrogen off the farm.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "Nitrogen limits crop growth more than any other nutrient, but crops can use it only as nitrate or ammonium. A farmer who understands the cycle can increase the free supply: legumes such as groundnuts and soya, with inoculated seed, fix nitrogen through Rhizobium, and returning manure, compost and residues lets decomposers and nitrifying bacteria release nitrogen steadily. Liming acid soils helps these bacteria. The farmer can also cut losses by draining wet land to prevent denitrification, splitting fertiliser to reduce leaching and covering urea to prevent volatilisation. These practices reduce the fertiliser needed, but every harvest removes nitrogen from the farm, so for high yields some fertiliser will usually still be needed.",
    explanation: "Gains, losses, management and a judgement.",
  });

  b.card("DEFINITION", "Nitrogen fixation", "Conversion of nitrogen gas into compounds plants can use (by lightning, Rhizobium, free-living bacteria, industry).");
  b.card("DEFINITION", "Ammonification", "Release of ammonium from proteins in dead organisms and wastes by decomposers.");
  b.card("DEFINITION", "Nitrification", "Ammonium → nitrite (Nitrosomonas) → nitrate (Nitrobacter), in aerated soil.");
  b.card("DEFINITION", "Denitrification", "Nitrate → nitrogen gas by denitrifying bacteria in waterlogged, airless soil.");
  b.card("FACT", "Free-living nitrogen fixers", "Azotobacter (aerobic), Clostridium (anaerobic) and blue-green bacteria (cyanobacteria).");
  b.card("FACT", "Ways nitrogen is lost from soil", "Denitrification, leaching, volatilisation of ammonia, crop removal, erosion, burning.");
  b.card("FORMULA", "Haber process", "N₂ + 3H₂ → 2NH₃ (industrial fixation for nitrogen fertilisers).");
  b.card("CONCEPT", "Managing the nitrogen cycle", "Legumes and inoculation, organic matter, drainage, liming, split fertiliser, covering urea.");
});
