// Slice G2c: managing energy supplies sustainably (ZIMSEC 7.5.3; Cambridge 10.6).
import { concept, P, ZIM, CAM, geographyLevels } from "../lib.mjs";

const SURVEY = "**Table 1: Energy-saving measures found in 40 households in a fictional Zimbabwean town ward (fictional survey by a Form 3 class)**\n\n| Measure | Number of households |\n|---|---|\n| LED bulbs throughout the house | 26 |\n| Solar water heater | 8 |\n| Rooftop solar panels | 14 |\n| Efficient wood stove | 6 |\n| Biogas digester | 2 |";

const STOVE = "**Table 2: Fuelwood used for cooking by one fictional rural household (fictional data)**\n\n| Cooking method | Fuelwood used per day (kg) |\n|---|---|\n| Open three-stone fire | 12 |\n| Efficient enclosed stove | 5 |";

concept("geo.energy.management", { file: "energy/management", keyPrefix: "energy.management" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is an energy **conservation** measure rather than a way of increasing supply?",
    options: [
      ["Replacing old light bulbs with LED bulbs", "Correct: LEDs give the same light using much less electricity."],
      ["Building a new solar farm", "A solar farm adds to supply."],
      ["Importing electricity from a neighbouring country", "Imports add to supply."],
      ["Drilling for new reserves of natural gas", "New reserves add to supply."],
    ],
    answer: "A",
    explanation: "Conservation reduces the energy used; increasing supply produces or obtains more energy.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is an **interconnector**?",
    options: [
      ["A power line linking the electricity grids of different countries", "Correct: it allows countries to trade electricity."],
      ["A pipe that carries water from a dam to the turbines", "That is a penstock."],
      ["A meter that customers pay for before they use power", "That is a prepaid meter."],
      ["A tank in which dung rots to produce gas", "That is a biogas digester."],
    ],
    answer: "A",
    explanation: "Interconnectors join national grids, for example within the Southern African Power Pool.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How does an efficient enclosed wood stove help to conserve energy?",
    options: [
      ["It burns wood more completely and keeps the heat around the pot", "Correct: less heat escapes, so far less wood is needed."],
      ["It produces electricity as well as heat for cooking", "Wood stoves do not generate electricity."],
      ["It can only be used with charcoal, not wood", "Efficient stoves are designed for wood, often small sticks."],
      ["It makes the wood regrow faster in the woodland", "A stove does not affect tree growth directly; it reduces cutting."],
    ],
    answer: "A",
    explanation: "Enclosed stoves waste less heat than an open three-stone fire, cutting wood use, smoke and the time spent collecting fuel.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is public transport an energy-saving strategy?",
    options: [
      ["One bus moves as many people as many cars, using less fuel per passenger", "Correct: fuel use per person falls sharply."],
      ["Buses run on solar power, so they use no fuel at all", "Most buses run on diesel."],
      ["Public transport makes people travel longer distances", "This would increase, not reduce, energy use."],
      ["Buses do not need roads, so no energy is used to build them", "Buses use roads like cars do."],
    ],
    answer: "A",
    explanation: "Moving people in shared vehicles (buses, trains) uses much less energy per passenger-kilometre than private cars.",
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "Through which port is most of Zimbabwe's imported fuel delivered by pipeline?",
    options: [
      ["Beira in Mozambique", "Correct: the pipeline runs from Beira to Feruka near Mutare."],
      ["Durban in South Africa", "Some goods arrive via Durban by road and rail, but the fuel pipeline starts at Beira."],
      ["Walvis Bay in Namibia", "Walvis Bay is far to the west and has no pipeline to Zimbabwe."],
      ["Dar es Salaam in Tanzania", "Dar es Salaam is not linked to Zimbabwe by pipeline."],
    ],
    answer: "A",
    explanation: "The Beira-Feruka pipeline carries fuel from the Mozambican coast to eastern Zimbabwe.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why might importing electricity through the Southern African Power Pool fail to help Zimbabwe in a drought year?",
    options: [
      ["Neighbours that also rely on Zambezi HEP are short of power too", "Correct: a regional drought cuts HEP output across several countries."],
      ["Electricity cannot be carried across national borders", "Interconnectors carry power across borders."],
      ["The power pool only trades in oil, not electricity", "SAPP is a power pool for trading electricity."],
      ["Imported electricity cannot be used by Zimbabwean appliances", "Imported power is used on the same grid like any other."],
    ],
    answer: "A",
    explanation: "Zambia and Mozambique also depend heavily on Zambezi HEP, so a regional drought reduces the surplus available to buy.",
    hints: ["Think about where neighbours get their electricity."],
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which is the **strongest** argument for a country to invest in energy conservation before building new power stations?",
    options: [
      ["Saving energy is usually cheaper and quicker than generating more", "Correct: efficiency measures cost less per unit and need no new fuel."],
      ["Conservation produces large amounts of new electricity", "Conservation reduces demand; it does not generate electricity."],
      ["Power stations are never needed once people conserve energy", "Demand still has to be met; conservation only reduces it."],
      ["Conservation measures never cost anything to introduce", "LED bulbs, insulation and stoves all cost money at first."],
    ],
    answer: "A",
    explanation: "Each unit saved does not have to be generated, transmitted or paid for in fuel, and efficiency measures are fast to introduce.",
    hints: ["Compare cost and speed."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which is the **most sustainable** way to provide cooking energy in a rural ward where woodland is being cleared?",
    options: [
      ["Biogas digesters and efficient stoves, with community woodlots", "Correct: they cut wood use and replace trees, so the resource lasts."],
      ["Allowing unlimited cutting in a different part of the woodland", "This moves deforestation elsewhere rather than solving it."],
      ["Supplying paraffin bought with imported fuel", "Paraffin is non-renewable and imported, and costly for families."],
      ["Banning all cooking with wood immediately", "Without alternatives, a ban is unenforceable and harms families."],
    ],
    answer: "A",
    explanation: "Sustainable solutions reduce demand (efficient stoves), provide renewable alternatives (biogas) and replace the resource (woodlots).",
    hints: ["Sustainable means it can continue in the future without harm."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Fitting a solar water heater instead of an electric geyser conserves electricity.",
    answer: true,
    explanation: "True. The sun heats the water, so the electricity an electric geyser would use is saved.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Building a new coal-fired power station is an example of energy conservation.",
    answer: false,
    explanation: "False. A new power station increases supply. Conservation reduces the amount of energy used.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Using less energy to get the same result is called energy {{blank:a}}. Cables that link the grids of two countries are called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["efficiency"], choices: ["efficiency", "security", "deficit", "surplus"] },
      { id: "b", accepted: ["interconnectors"], choices: ["interconnectors", "penstocks", "transformers", "pipelines"] },
    ],
    wrong: [["security", "pipelines"]],
    explanation: "Energy efficiency cuts the energy needed; interconnectors allow electricity to be traded between countries.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each strategy with the way it improves energy supply or use.",
    pairs: [
      ["Prepaid electricity meters", "Make users aware of costs so they switch off"],
      ["Community woodlots", "Replace trees cut for fuelwood"],
      ["Biogas digester", "Turns dung into cooking gas"],
      ["Interconnector", "Lets countries share surplus electricity"],
    ],
    explanation: "Each strategy either reduces demand, replaces a resource, provides a renewable alternative or shares supply.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A school replaces 40 bulbs of 60 W with LED bulbs of 9 W. The lights are on for 5 hours a day. Calculate the electricity saved per day, in kilowatt-hours.",
    value: 10.2, unit: "kWh", tol: 0.05,
    wrong: [12, 10200],
    explanation: "Saving per bulb = 60 − 9 = 51 W; 40 × 51 = 2,040 W = 2.04 kW; 2.04 × 5 = 10.2 kWh.",
    workedSolution: "1. Saving per bulb = 60 − 9 = 51 W.\n2. Total saving = 40 × 51 = 2,040 W = 2.04 kW.\n3. Daily saving = 2.04 kW × 5 h = 10.2 kWh.",
    hints: ["Find the saving per bulb first.", "Convert watts to kilowatts before multiplying by hours."],
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A family uses 12 kg of fuelwood a day on an open fire and 5 kg a day on an efficient stove. Calculate the percentage saving in fuelwood, to one decimal place.",
    value: 58.3, unit: "%", tol: 0.1, answer: "58.3",
    wrong: [41.7, 140],
    explanation: "Saving = 12 − 5 = 7 kg; 7 ÷ 12 × 100 = 58.3 %.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the name of the regional organisation through which countries in southern Africa trade electricity.",
    accepted: ["Southern African Power Pool", "SAPP", "the Southern African Power Pool", "Southern Africa Power Pool", "Southern African Power Pool (SAPP)"],
    wrong: ["SADC"],
    explanation: "The **Southern African Power Pool (SAPP)** links the grids of SADC countries so that they can trade electricity.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which households can conserve energy.",
    points: [
      "Use LED bulbs and efficient appliances / switch off lights and appliances not in use.",
      "This gives the same light or service for less electricity.",
      "Use a solar water heater, efficient stove or biogas instead of electricity or open fires.",
      "This replaces electricity or fuelwood with free or renewable energy / less wood is burned.",
    ],
    modelAnswer: "Households can replace old bulbs with LED bulbs and switch off appliances they are not using, which gives the same light for much less electricity. They can also heat water with a solar water heater, or cook on an efficient stove or with biogas, so that less electricity or fuelwood is needed.",
    explanation: "Two methods, each with how it saves energy (2 + 2).",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Evaluate the use of rooftop solar panels as a way of managing Zimbabwe's electricity shortages.",
    points: [
      "Advantage: abundant sunshine; renewable and no emissions.",
      "Advantage: households and businesses keep power during load shedding / reduces demand on the grid.",
      "Limitation: no output at night; batteries are expensive.",
      "Limitation / judgement: high upfront cost, so mainly richer households benefit; useful but only part of the solution.",
    ],
    modelAnswer: "Zimbabwe has strong sunshine for most of the year, so rooftop panels produce clean, renewable electricity and let homes and businesses keep working during load shedding, while reducing demand on the grid. However, they produce nothing at night unless expensive batteries are added, and the upfront cost means mainly wealthier households can afford them. They help, but they are only part of the solution alongside larger power stations.",
    explanation: "Two strengths, two limitations or a judgement.",
    hints: ["Think about sunshine, night-time and cost."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 9, applies: CAM,
    stem: "For a named country, describe its energy mix and evaluate the strategies it uses to manage its energy supply. (Detailed specific example.)",
    points: [
      ["Names a country and gives its main sources (e.g. Zimbabwe: Kariba HEP, Hwange coal, imports, fuelwood, solar).", 1],
      ["Specific detail on the energy mix (e.g. Kariba South about 1,050 MW; fuel imported via Beira-Feruka pipeline; ethanol blending).", 1],
      ["Describes an impact or problem (e.g. drought cuts Kariba output; load shedding; deforestation).", 1],
      ["Strategy to increase supply described (e.g. new units at Hwange / Kariba South extension).", 1],
      ["Evaluated (e.g. less dependent on rainfall but raises emissions; costly).", 1],
      ["Renewable strategy described and evaluated (e.g. solar IPPs: suits sunny climate, but needs storage).", 1],
      ["Imports / interconnectors described and evaluated (SAPP; neighbours short in regional droughts).", 1],
      ["Conservation or rural strategy evaluated (prepaid meters, LEDs, biogas, rural electrification).", 1],
      ["Overall judgement on sustainability and effectiveness.", 1],
    ],
    levels: geographyLevels(9),
    modelAnswer: "Zimbabwe's electricity comes mainly from the Kariba South hydro-electric station on the Zambezi (about 1,050 MW installed) and the coal-fired Hwange power station beside the Hwange coalfield. Small old coal stations at Harare, Bulawayo and Munyati add little, solar power is growing, and power is imported from neighbours through the Southern African Power Pool. All petrol and diesel are imported, much of it through the Beira-Feruka pipeline, with ethanol from Chisumbanje blended into petrol. Most rural households cook with fuelwood.\n\nThe main problem is unreliable supply. In droughts such as 2019 and 2022-2024 the water allowed for generation at Kariba was cut, and Hwange's old units often broke down, so load shedding lasted many hours a day. Fuelwood use contributes to deforestation.\n\nTo increase supply, two new units were added at Hwange in the early 2020s. This makes supply less dependent on rainfall, but increases carbon dioxide and sulphur dioxide emissions and relies on a non-renewable resource. The government encourages independent power producers to build solar farms, which suit Zimbabwe's sunny climate and are quick to build, but they do not produce at night without costly storage. Imports through SAPP help in emergencies, but neighbours such as Zambia also depend on Zambezi HEP and are short of power in the same droughts, and imports use foreign currency.\n\nOn the demand side, prepaid meters and LED lighting encourage saving, and biogas digesters, efficient stoves and woodlots reduce fuelwood use, though they reach only a small share of households. The Rural Electrification Agency has connected many schools and clinics.\n\nOverall, Zimbabwe's strategies have reduced but not solved its shortages. The most sustainable path is to diversify into solar with storage while conserving energy, using coal only as a back-up.",
    explanation: "Level 3 answers give accurate detail of one country's energy mix and evaluate several strategies against clear criteria, ending with a judgement.",
    hints: ["Start with the energy mix, then take each strategy in turn.", "Use criteria: sustainability, cost, reliability."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Study Table 1.\n\n${SURVEY}`,
    parts: [
      P.num({ label: "(a)", marks: 1, unit: "%", stem: "Calculate the percentage of households that have rooftop solar panels.", value: 35, wrong: [14, 2.86], explanation: "14 ÷ 40 × 100 = 35 %." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which measure was found in the most households?", options: [
        ["LED bulbs throughout the house", "Correct: 26 of the 40 households."],
        ["Rooftop solar panels", "14 households, fewer than LED bulbs."],
        ["Solar water heater", "Only 8 households."],
        ["Biogas digester", "Only 2 households: the least common measure."],
      ], answer: "A", explanation: "LED bulbs (26 households) were the most common measure." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest **two** reasons why LED bulbs are more common than solar water heaters.", points: [
        "LED bulbs are cheap to buy, while solar water heaters are expensive.",
        "LED bulbs are easy to fit yourself; solar water heaters need installation on the roof.",
      ], explanation: "Reasons of cost and ease of installation." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest why so few town households have a biogas digester.", points: [
        "Town households rarely keep cattle, so there is little dung.",
        "Small plots leave no space for a digester / most have electricity or LPG instead.",
      ], explanation: "Link to raw materials and space." }),
      P.manual({ label: "(e)", marks: 4, stem: "Describe how the class could extend this survey into a project on energy use and conservation in their local area.", points: [
        "Increase the sample size or survey several wards (random or systematic sampling).",
        "Ask about main fuels for cooking and lighting and monthly energy costs.",
        "Record the effects of load shedding on households and local businesses.",
        "Present results with tables and pie or bar charts and suggest conservation measures.",
      ], explanation: "Four distinct, practical points about method and presentation." }),
    ],
    hints: ["Percentage = number ÷ total × 100.", "Think about cost, space and access to raw materials."],
    explanation: "Practice in analysing local energy-survey data (ZIMSEC local-area project).",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: `Study Table 2.\n\n${STOVE}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the fuelwood saved per day by using the efficient stove, in kilograms.", value: 7, wrong: [17], explanation: "12 − 5 = 7 kg per day." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the fuelwood saved in a year of 365 days, in kilograms.", value: 2555, wrong: [4380, 1825], explanation: "7 × 365 = 2,555 kg." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain **three** benefits to the household and the environment of using the efficient stove.", points: [
        "Less wood is cut, so woodland and soils are conserved (less deforestation and erosion).",
        "Less time is spent collecting wood, freeing time for school, farming or work.",
        "Less smoke indoors, so fewer respiratory illnesses.",
      ], explanation: "Environmental, social and health benefits." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest **two** reasons why some households do not use efficient stoves.", points: [
        "The stove costs money, while an open fire is free.",
        "Lack of awareness or habit / stoves may be unavailable locally or unsuitable for large pots.",
      ], explanation: "Economic and social reasons." }),
    ],
    hints: ["Saving = old use − new use.", "Multiply the daily saving by the number of days."],
    explanation: "Practice in calculating and evaluating energy savings.",
  });
  b.card("DEFINITION", "Energy conservation", "Reducing the amount of energy used by avoiding waste or using it more efficiently.");
  b.card("DEFINITION", "Energy efficiency", "Getting the same result from less energy, e.g. an LED bulb giving the same light as an old bulb using far less power.");
  b.card("DEFINITION", "Interconnector", "A high-voltage line linking the grids of two or more countries so that electricity can be traded.");
  b.card("CONCEPT", "Increasing energy supply", "New reserves, new or expanded power stations, renewables, imports, interconnectors, nuclear.");
  b.card("CONCEPT", "Conserving energy", "LEDs and efficient appliances, insulation, solar water heaters, public transport, efficient stoves, biogas, pricing and prepaid meters, woodlots.");
  b.card("CONCEPT", "Evaluating energy strategies", "Judge by sustainability, cost, reliability, scale, and who gains or loses.");
  b.card("FACT", "Southern African Power Pool (SAPP)", "Links the grids of southern African countries so they can trade electricity; Zimbabwe imports through it.");
  b.card("FACT", "Zimbabwe's fuel supply", "All petrol and diesel are imported, much of it by pipeline from Beira to Feruka near Mutare; ethanol from Chisumbanje is blended with petrol.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Zimbabwe's energy management", "Hwange expansion, Kariba South extension, solar IPPs, SAPP imports, rural electrification, prepaid meters, biogas and woodlots.");
});
