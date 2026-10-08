// Slice G2b: river pollution, its impacts and management (Cambridge topic 1.3).
import { concept, P, geographyLevels } from "../lib.mjs";

const WQ = "**Table 1: Water quality at four sites along a fictional river flowing through a town**\n\n| Site | Location | Dissolved oxygen (mg/l) | Nitrate (mg/l) | Mayfly nymphs in a 1-minute kick sample |\n|---|---|---|---|---|\n| 1 | Above the town, among farms | 9.0 | 14 | 22 |\n| 2 | Below a fertiliser factory | 7.2 | 38 | 9 |\n| 3 | Below the sewage works | 2.7 | 61 | 0 |\n| 4 | 15 km downstream, near a wetland | 6.0 | 29 | 6 |";

const KICK = "**Table 2: Invertebrates found in kick samples at two fictional sites**\n\n| Invertebrate | Pollution tolerance | Site X | Site Y |\n|---|---|---|---|\n| Stonefly nymph | Very low | 7 | 0 |\n| Mayfly nymph | Low | 15 | 1 |\n| Freshwater shrimp | Medium | 11 | 4 |\n| Bloodworm | High | 2 | 26 |\n| Sludge worm | Very high | 0 | 33 |";

concept("geo.rivers.pollution", { file: "rivers/pollution", keyPrefix: "rivers.pollution" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a **point source** of river pollution?",
    options: [
      ["A pipe discharging factory effluent", "Correct: it enters at one identifiable place."],
      ["Fertiliser washed off many farms", "This comes from a wide area: a non-point source."],
      ["Soil eroded from a whole catchment", "Eroded soil enters along the whole river: diffuse."],
      ["Litter blown in from a whole town", "This enters at many places: diffuse."],
    ],
    answer: "A",
    explanation: "A **point source** has a single location, such as a sewage outfall or factory pipe, which makes it easier to monitor and control.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which pollutants mainly cause **eutrophication**?",
    options: [
      ["Nitrates and phosphates", "Correct: these nutrients feed algal growth."],
      ["Plastics and litter", "Plastics harm wildlife physically but do not feed algae."],
      ["Mercury and lead", "Heavy metals are toxic but do not cause algal blooms."],
      ["Hot water from power stations", "Heat lowers oxygen but is not nutrient enrichment."],
    ],
    answer: "A",
    explanation: "Eutrophication is caused by excess **nitrates and phosphates** from fertilisers, sewage and detergents.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In eutrophication, why do fish die?",
    options: [
      ["Bacteria decomposing dead algae use up the oxygen", "Correct: dissolved oxygen falls too low for fish."],
      ["Nitrates are directly poisonous to fish", "At these levels the main effect is oxygen loss, not poisoning."],
      ["Algae eat the fish eggs and young fish", "Algae are producers; they do not eat fish."],
      ["The water becomes too salty for fish", "Nutrients do not make fresh water salty."],
    ],
    answer: "A",
    explanation: "Algae bloom, die and are decomposed by bacteria that consume dissolved oxygen. With too little oxygen, fish suffocate.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which disease is most closely linked to drinking water polluted by sewage?",
    options: [
      ["Cholera", "Correct: a water-borne bacterial disease."],
      ["Malaria", "Malaria is spread by mosquitoes, not by drinking water."],
      ["Tuberculosis", "TB spreads through the air."],
      ["HIV", "HIV is not spread through drinking water."],
    ],
    answer: "A",
    explanation: "Sewage carries bacteria such as those causing **cholera** and typhoid, which spread through contaminated drinking water.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which invertebrate found in a river suggests the water is **clean** and well oxygenated?",
    options: [
      ["Stonefly nymph", "Correct: very sensitive to low oxygen."],
      ["Sludge worm", "Sludge worms tolerate very polluted, low-oxygen water."],
      ["Rat-tailed maggot", "It breathes air through a tube, so it survives in foul water."],
      ["Bloodworm", "Bloodworms tolerate low oxygen and indicate pollution."],
    ],
    answer: "A",
    explanation: "Stonefly and mayfly nymphs need high dissolved oxygen, so they are indicators of clean water.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Downstream of a sewage outfall, dissolved oxygen falls sharply and then slowly rises again over several kilometres. What best explains the **rise**?",
    options: [
      ["Waste is diluted and broken down while turbulence adds oxygen", "Correct: the river gradually recovers."],
      ["More sewage enters the river further downstream", "More sewage would lower oxygen further."],
      ["The water temperature rises downstream", "Warmer water holds less oxygen, not more."],
      ["Algae stop photosynthesising downstream", "Photosynthesis adds oxygen; stopping it would not raise levels."],
    ],
    answer: "A",
    explanation: "As the organic load is diluted and decomposed, less oxygen is used, and turbulent flow mixes oxygen in from the air: the river recovers.",
    hints: ["What happens to the waste as it travels?", "How does oxygen get into water?"],
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which strategy for reducing river pollution is generally the most **sustainable**?",
    options: [
      ["Reducing waste at its source through cleaner production", "Correct: prevention lasts and avoids costly clean-up."],
      ["Dredging polluted mud out of the river every year", "Repeated clean-up is costly and does not stop new pollution."],
      ["Adding more chlorine at the water treatment works", "This treats symptoms for drinking water only."],
      ["Moving the factory's outfall further downstream", "This just moves the problem to other people."],
    ],
    answer: "A",
    explanation: "Sustainable strategies stop pollution at its **source**, last a long time and avoid repeated costs.",
    hints: ["Which option prevents the pollution rather than reacting to it?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why has river pollution often **increased** in rapidly growing cities of LICs and MICs even where sewage works exist?",
    options: [
      ["Population growth outpaces sewage treatment capacity", "Correct: works become overloaded and partly treated waste is released."],
      ["Treatment works add nutrients to otherwise clean rivers", "Working plants remove pollutants; the problem is too little capacity."],
      ["Cities in LICs receive more rainfall than rural areas", "Rainfall is not the main reason."],
      ["Rivers in cities flow faster and cannot dilute waste", "Flow speed is not the main reason for rising pollution."],
    ],
    answer: "A",
    explanation: "When a city grows faster than its infrastructure, sewers and treatment plants are overloaded or break down, and untreated waste reaches the river.",
    hints: ["Compare the growth of population with the growth of infrastructure."],
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "Dissolved oxygen is 9.5 mg/l above a factory and 3.8 mg/l below it. Calculate the percentage decrease, to the nearest whole number.",
    value: 60, unit: "%", tol: 0.5,
    wrong: [40, 5.7],
    explanation: "Decrease = 9.5 − 3.8 = 5.7 mg/l; 5.7 ÷ 9.5 × 100 = 60 %.",
    workedSolution: "1. Decrease = 9.5 − 3.8 = 5.7 mg/l.\n2. Percentage = 5.7 ÷ 9.5 × 100 = 60 %.",
    hints: ["Percentage decrease = decrease ÷ original value × 100."],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sequence.",
    template: "Excess nutrients cause an algal {{blank:a}}. When the algae die, bacteria decompose them and use up dissolved {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["bloom", "blooms"], wrong: "drought" },
      { id: "b", accepted: ["oxygen", "O2"], wrong: "nitrogen" },
    ],
    explanation: "Algal **bloom** → death → decomposition → loss of **oxygen**.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each source of pollution with a typical pollutant.",
    pairs: [
      ["Leather tannery", "Chromium"],
      ["Small-scale gold processing", "Mercury"],
      ["Irrigated farmland", "Nitrate fertiliser"],
      ["Overloaded sewage works", "Faecal bacteria"],
    ],
    explanation: "Each economic activity produces characteristic pollutants.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Warm water holds less dissolved oxygen than cold water.",
    answer: true,
    explanation: "True. This is why hot effluent from power stations harms fish (thermal pollution).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Pollution from fertiliser washed off many farms is a point source.",
    answer: false,
    explanation: "False. It comes from a wide area, so it is a **non-point (diffuse)** source, which is harder to control.",
  });
  b.short({
    d: 3, skill: "RECALL",
    stem: "Name the city on the River Ganges known for leather tanneries that discharge chromium into the river.",
    accepted: ["Kanpur", "Cawnpore"],
    wrong: ["Varanasi"],
    explanation: "**Kanpur** has a large leather industry whose effluent adds chromium to the Ganges.",
    hints: ["It is a large industrial city in Uttar Pradesh."],
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the impacts of river pollution on people.",
    points: [
      "Water-borne diseases such as cholera, typhoid and diarrhoea from sewage-polluted water.",
      "Poisoning from heavy metals or mercury that build up in fish eaten by people.",
      "Higher costs of treating drinking water.",
      "Loss of income from fishing, farming (irrigation) or tourism.",
    ],
    modelAnswer: "Sewage in rivers spreads water-borne diseases such as cholera and diarrhoea, especially where people drink untreated river water. Heavy metals and mercury build up in fish and poison people who eat them. Water authorities must spend more on chemicals and treatment, raising costs. Fishing communities lose their catch, and tourism and irrigation suffer.",
    explanation: "Credit four distinct impacts.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Evaluate the use of laws and fines to reduce industrial river pollution.",
    points: [
      "Advantage: makes polluters pay, giving firms a reason to treat waste.",
      "Advantage: effluent permits set clear limits that can be monitored.",
      "Limitation: needs inspectors, testing and honest enforcement, which may be lacking.",
      "Limitation/judgement: fines may be cheaper than treatment, so they only work if high and enforced.",
    ],
    modelAnswer: "Laws and fines apply the 'polluter pays' principle, so factories have a financial reason to treat their effluent, and permits set limits that can be checked. However, they only work if there are enough inspectors and laboratories and enforcement is honest. If fines are small, a firm may simply pay rather than invest in treatment. They are effective only when penalties are high and consistently enforced.",
    explanation: "Two advantages and two limitations or a judgement.",
    hints: ["Think about what happens if no one checks.", "Compare the size of fines with the cost of treatment."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    stem: "For a named river, describe the causes and impacts of pollution and evaluate the strategies used to manage it.",
    points: [
      ["Named river and country with located detail (e.g. Ganges, India; Varanasi, Kanpur).", 1],
      ["Cause 1 specific (e.g. untreated sewage from growing cities).", 1],
      ["Cause 2 specific (e.g. chromium from Kanpur tanneries / farm run-off / religious practices).", 1],
      ["Impact on people (e.g. faecal bacteria far above bathing limits; diarrhoea, typhoid).", 1],
      ["Impact on ecosystems (e.g. heavy metals in food chains; river dolphin threatened; oxygen loss).", 1],
      ["Strategy named and described (e.g. Ganga Action Plan 1985; Namami Gange 2014: treatment plants, monitoring industry).", 1],
      ["Evaluation: some improvement but treatment capacity lags behind sewage; enforcement and scale problems.", 1],
    ],
    levels: geographyLevels(7),
    modelAnswer: "The Ganges flows about 2,500 km across northern India and is sacred to Hindus, yet it is one of the world's most polluted rivers. The largest cause is untreated or partly treated sewage from cities such as Kanpur and Varanasi, where treatment capacity has not kept up with population growth. Leather tanneries in Kanpur discharge chromium, and fertiliser and pesticides wash off the intensively farmed plain. Cremations and offerings add further waste.\n\nFaecal bacteria in many stretches are far above safe bathing limits, so pilgrims and residents who bathe in or drink the water suffer diarrhoeal diseases and typhoid. Heavy metals harm fish and enter the food chain, and the endangered Ganges river dolphin is threatened.\n\nThe Ganga Action Plan, begun in 1985, built sewage treatment plants, but capacity was too small and many plants did not run reliably, so success was limited. The Namami Gange programme, from 2014, has funded more treatment plants, monitoring of industries and river-front clean-ups, and water quality has improved in some stretches. However, sewage still outpaces treatment, small polluting industries are hard to police, and the basin is vast. Management has been only partly successful; lasting improvement needs sewers and treatment in every town, cleaner industry and public participation.",
    explanation: "Level 3 answers give specific, located detail for causes and impacts and evaluate named strategies.",
    hints: ["Name places along the river.", "Judge how well each strategy worked."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Study Table 1.\n\n${WQ}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the site with the lowest dissolved oxygen.", accepted: ["3", "Site 3"], wrong: ["2"], explanation: "Site 3, below the sewage works (2.7 mg/l)." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the difference in nitrate between site 3 and site 1.", value: 47, unit: "", wrong: [75], explanation: "61 − 14 = 47 mg/l." }),
      P.manual({ label: "(c)", marks: 3, stem: "Describe and explain the change in dissolved oxygen from site 2 to site 3.", points: [
        "Oxygen falls sharply from 7.2 to 2.7 mg/l.",
        "Sewage adds organic matter that bacteria decompose.",
        "The bacteria use up dissolved oxygen as they break down the waste.",
      ], explanation: "Data plus the bacterial explanation." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest why water quality is better at site 4.", points: [
        "Waste has been diluted and broken down over 15 km, and turbulence adds oxygen.",
        "The wetland filters nutrients and silt (plants absorb nitrates).",
      ], explanation: "Self-cleansing and wetland filtering." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain how the mayfly data support the oxygen data.", points: [
        "Mayfly nymphs need well-oxygenated water.",
        "Their numbers fall from 22 at site 1 to 0 at site 3, where oxygen is lowest, and recover a little (6) at site 4.",
      ], explanation: "Link indicator species to oxygen with figures." }),
    ],
    hints: ["Which site is below the sewage works?", "What do bacteria need to decompose waste?"],
    explanation: "Practice interpreting water-quality data along a river.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Study Table 2.\n\n${KICK}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the total number of invertebrates found at site Y.", value: 64, wrong: [35], explanation: "0 + 1 + 4 + 26 + 33 = 64." }),
      P.num({ label: "(b)", marks: 1, stem: "What percentage of the invertebrates at site X were stonefly or mayfly nymphs? Give your answer to the nearest whole number.", value: 63, unit: "%", tol: 0.5, wrong: [22, 37], explanation: "Site X total = 7 + 15 + 11 + 2 + 0 = 35. (7 + 15) ÷ 35 × 100 = 62.9 %, about 63 %." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which site is more polluted?", options: [
        ["Site Y", "Correct: dominated by bloodworms and sludge worms."],
        ["Site X", "Site X has many sensitive species, so it is cleaner."],
        ["Both are equally polluted", "The communities are very different."],
        ["The data cannot show pollution", "Indicator species are a standard way of assessing pollution."],
      ], answer: "A", explanation: "High numbers of tolerant species and almost no sensitive species show organic pollution at Y." }),
      P.manual({ label: "(d)", marks: 2, stem: "Give **two** reasons why biotic indices are useful for monitoring river pollution.", points: [
        "Cheap and simple, so students or communities can do them.",
        "Invertebrates live in the river for months, so they show pollution over time, not just at the moment of sampling.",
      ], explanation: "Cost and the time-integrating nature of indicator species." }),
    ],
    hints: ["Add the column for each site first."],
    explanation: "Practice using indicator species.",
  });
  b.card("DEFINITION", "Point v non-point source", "Point: one outlet (sewage pipe). Non-point (diffuse): a wide area (farm run-off).");
  b.card("CONCEPT", "Eutrophication", "Nitrates and phosphates → algal bloom → light blocked, plants die → bacteria decompose and use oxygen → fish die.");
  b.card("CONCEPT", "Causes of river pollution", "Sewage, industrial effluent (heavy metals), mining (silt, mercury, acid), agriculture (fertiliser, pesticides), solid waste.");
  b.card("CONCEPT", "Measuring pollution", "Dissolved oxygen, nitrate/phosphate, faecal bacteria, turbidity, biotic index (kick sampling).");
  b.card("FACT", "Indicator species", "Clean: stonefly and mayfly nymphs. Polluted: sludge worms, bloodworms, rat-tailed maggots.");
  b.card("CONCEPT", "Sustainable pollution management", "Prevent at source, low running costs, long-lasting, community involvement (e.g. cleaner production, wetlands).");
  b.card("FACT", "Ganges pollution", "Untreated sewage (biggest source), Kanpur tannery chromium, farm run-off; Ganga Action Plan (1985), Namami Gange (2014).");
  b.card("FACT", "Lake Chivero", "Harare's main water source on the Manyame; algal blooms and water hyacinth from urban sewage and effluent.");
  b.card("DEFINITION", "Effluent", "Liquid waste discharged from a sewage works, factory or mine.");
});
