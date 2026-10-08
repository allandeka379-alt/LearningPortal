// Slice G2c: global energy supply, demand and energy security (Cambridge 10.5; Cambridge only).
import { concept, P, geographyLevels } from "../lib.mjs";

const PERCAP = "**Table 1: Energy use per person in five fictional countries (fictional data)**\n\n| Country | Level of development | Energy use per person (gigajoules a year) | Share of energy from fuelwood (%) |\n|---|---|---|---|\n| V | HIC | 250 | 1 |\n| W | HIC | 160 | 3 |\n| X | MIC | 90 | 10 |\n| Y | MIC | 40 | 30 |\n| Z | LIC | 10 | 80 |";

const BAL = "**Table 2: Energy production and consumption of four fictional countries in one year, in million tonnes of oil equivalent (Mtoe) (fictional data)**\n\n| Country | Production (Mtoe) | Consumption (Mtoe) |\n|---|---|---|\n| J | 520 | 160 |\n| K | 40 | 400 |\n| L | 90 | 120 |\n| M | 12 | 10 |";

concept("geo.energy.supply-demand", { file: "energy/supply-demand", keyPrefix: "energy.supply-demand" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is an **energy deficit**?",
    options: [
      ["When a country consumes more energy than it produces", "Correct: the gap must be filled by imports or the country goes short."],
      ["When a country produces more energy than it consumes", "That is an energy surplus."],
      ["When a country uses only renewable energy sources", "This describes the energy mix, not a deficit."],
      ["When a country's power stations break down for a day", "A breakdown causes a power cut, not a national deficit in production."],
    ],
    answer: "A",
    explanation: "Deficit: consumption > production (net importer). Surplus: production > consumption (net exporter).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which country is an example of an **energy surplus** country?",
    options: [
      ["Saudi Arabia", "Correct: it produces far more oil than it uses and exports the rest."],
      ["Japan", "Japan has few fossil fuels and imports almost all its oil and gas."],
      ["South Korea", "South Korea imports most of its energy for its large industries."],
      ["Italy", "Italy imports most of its oil and gas."],
    ],
    answer: "A",
    explanation: "Surplus countries include Saudi Arabia, Qatar, Russia, Norway and Australia.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which statement best defines **energy security**?",
    options: [
      ["Reliable, uninterrupted access to enough energy at an affordable price", "Correct: security combines reliability, sufficiency and affordability."],
      ["Guarding power stations against attack by building fences", "Physical protection is only a small part of energy security."],
      ["Producing all of a country's energy from renewable sources", "Renewables can help but do not define energy security."],
      ["Exporting more energy than the country imports each year", "That describes a surplus, not security."],
    ],
    answer: "A",
    explanation: "A country is energy secure when it can rely on enough affordable energy, whether produced at home or imported from dependable suppliers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the **main** reason why world energy consumption has risen since the 1990s?",
    options: [
      ["Rapid industrial growth and rising incomes in countries such as China and India", "Correct: industrialisation and rising living standards in large populations add huge demand."],
      ["Most people have moved from towns back to rural areas", "The trend is the opposite: urbanisation has increased."],
      ["The world population has fallen, so each person uses more", "World population has continued to rise."],
      ["Fuelwood has replaced electricity in most high-income countries", "HICs rely on electricity, gas and oil, not fuelwood."],
    ],
    answer: "A",
    explanation: "Population growth, industrialisation, urbanisation and rising living standards all increase demand; China and India account for much of the growth.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do HICs use much more energy per person than LICs?",
    options: [
      ["They have more industry, transport, appliances and services", "Correct: every car, factory and appliance adds to energy use."],
      ["Their people cook more meals each day than people in LICs", "Cooking is a small share of energy use in HICs."],
      ["They all have colder climates than every LIC", "Some HICs are hot (for example in the Middle East); climate is only one factor."],
      ["They have no renewable energy, so they must burn more fuel", "Many HICs have large renewable sectors."],
    ],
    answer: "A",
    explanation: "Energy use per person rises with development: more industry, private cars, heating or air conditioning, appliances and services.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "After 2022, gas prices rose steeply in many European countries. What was the **main** cause?",
    options: [
      ["Gas supplies from Russia were cut after the war in Ukraine began", "Correct: many European countries depended on Russian gas imports."],
      ["Europe's own gas fields suddenly became exhausted", "Domestic gas fields decline gradually; this was not the cause of the 2022 shock."],
      ["A drought stopped the flow of gas through pipelines", "Drought does not stop gas flowing in pipelines."],
      ["European countries banned the use of solar panels", "No such ban occurred; solar use was expanding."],
    ],
    answer: "A",
    explanation: "Depending on one supplier is a threat to energy security; the response included new suppliers, LNG imports, storage and faster growth of renewables.",
    hints: ["Think about political events and dependence on one supplier."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Country K has large coal reserves but still imports energy. What is the **most likely** explanation?",
    options: [
      ["Its demand is greater than its own production", "Correct: reserves do not guarantee a surplus if consumption is higher still."],
      ["Coal cannot be used to generate electricity", "Coal is widely used to generate electricity."],
      ["Countries with reserves are not allowed to use them", "There is no such rule."],
      ["Imported energy is always cheaper than any local coal", "Imports are not always cheaper; the issue is the size of demand."],
    ],
    answer: "A",
    explanation: "A large, growing economy (China is a real example) can need more energy than its own reserves supply, especially oil and gas.",
    hints: ["Compare production with consumption."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which strategy would **most** improve the energy security of a land-locked LIC that imports all its oil and relies on one HEP dam for electricity?",
    options: [
      ["Diversifying into solar power and buying power from several neighbours", "Correct: it spreads risk across more sources and suppliers."],
      ["Building a second, larger dam a little further down the same river", "Both dams would fail in the same drought."],
      ["Importing all its oil from a single cheaper supplier", "Depending on one supplier increases the risk."],
      ["Closing the dam and importing all electricity", "This would increase dependence on imports."],
    ],
    answer: "A",
    explanation: "Energy security improves with diversity: more sources (solar, HEP, thermal), more suppliers and interconnectors, and storage.",
    hints: ["Which option reduces dependence on a single source or supplier?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "China uses more energy in total than any other country.",
    answer: true,
    explanation: "True. China is the largest total energy consumer, although energy use per person is higher in many HICs.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A country with large reserves of coal will always have an energy surplus.",
    answer: false,
    explanation: "False. If its consumption is greater than its production, it will still have a deficit and need imports.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the description of the energy ladder.",
    template: "As incomes rise, households move from {{blank:a}} and dung to charcoal and paraffin, and then to LPG and {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["fuelwood"], choices: ["fuelwood", "electricity", "LPG", "petrol"] },
      { id: "b", accepted: ["electricity"], choices: ["electricity", "fuelwood", "dung", "coal"] },
    ],
    wrong: [["electricity", "fuelwood"]],
    explanation: "The energy ladder runs from traditional biomass at the bottom to modern fuels and electricity at the top.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each reason for rising global energy demand with an example.",
    pairs: [
      ["Population growth", "The world population passed 8 billion in 2022"],
      ["Industrialisation", "New steel works and factories in India"],
      ["Rising living standards", "More households buy cars and air conditioners"],
      ["New technology", "Data centres that run computers day and night"],
    ],
    explanation: "Demand grows because there are more people, more industry, higher incomes and new energy-using technology.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A fictional country produces 60 Mtoe of energy and consumes 240 Mtoe. Calculate the percentage of the energy it consumes that must be imported.",
    value: 75, unit: "%", tol: 0.1,
    wrong: [25, 300],
    explanation: "Deficit = 240 − 60 = 180 Mtoe; 180 ÷ 240 × 100 = 75 %.",
    workedSolution: "1. Deficit = 240 − 60 = 180 Mtoe.\n2. Share imported = 180 ÷ 240 × 100 = 75 %.",
    hints: ["Find the deficit first.", "Divide by consumption, because the question asks about the energy it uses."],
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A fictional HIC uses 250 gigajoules per person a year and a fictional LIC uses 10. How many times more energy per person does the HIC use?",
    value: 25,
    wrong: [240, 0.04],
    explanation: "250 ÷ 10 = 25 times.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for the combination of different energy sources that a country uses.",
    accepted: ["energy mix", "the energy mix", "an energy mix", "mix", "energy-mix"],
    wrong: ["energy security"],
    explanation: "The **energy mix** is the share of each source (coal, oil, gas, nuclear, HEP, solar and others) in a country's supply.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why energy use differs between urban and rural areas within an LIC.",
    points: [
      "Urban areas are connected to the grid, while many rural areas are not.",
      "So rural households rely on fuelwood, paraffin or small solar systems and use less commercial energy.",
      "Urban incomes are generally higher / towns have factories, offices and transport.",
      "So townspeople can afford electricity, gas and appliances, and businesses use large amounts of energy.",
    ],
    modelAnswer: "Towns are connected to the electricity grid, but many villages are far from power lines, so rural households cook with wood and light their homes with paraffin or small solar lamps. Incomes in towns are generally higher and there are more factories, offices and vehicles, so both households and businesses use much more electricity, gas and fuel.",
    explanation: "Two reasons, each developed (2 + 2).",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Explain why energy security is important to a country's economy.",
    points: [
      "Industry, mining and agriculture need reliable power; cuts stop production and raise costs.",
      "Unreliable supply discourages investment and can cost jobs.",
      "Importing energy uses foreign currency and exposes the country to price shocks.",
      "Services such as hospitals, water supply and telecommunications depend on energy / higher costs raise prices for consumers.",
    ],
    modelAnswer: "Factories, mines and farms need a reliable supply of power and fuel. If supplies are cut, production stops and firms must pay for expensive generators, so costs rise and investors go elsewhere. A country that imports much of its energy must spend scarce foreign currency on it, and a sudden rise in world prices can push up the cost of everything. Hospitals, water pumping and communications also depend on secure energy.",
    explanation: "Four distinct points about the economy.",
    hints: ["Think about production, investment, imports and services."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    stem: "To what extent is the level of development the main reason for differences in energy use between countries?",
    points: [
      ["Development explained: HICs have more industry, transport, appliances and services, so use more per person.", 1],
      ["Uses evidence: HIC vs LIC energy use per person / reliance on fuelwood in LICs.", 1],
      ["Climate: heating in cold countries, air conditioning in hot ones.", 1],
      ["Resources: countries with cheap local oil, gas or coal tend to use more (e.g. Gulf states).", 1],
      ["Population size: large total use in populous countries even if use per person is low.", 1],
      ["Economic structure: heavy industry uses more energy than farming or services.", 1],
      ["Judgement: development is the main factor for use per person, but others modify it.", 1],
    ],
    levels: geographyLevels(7),
    modelAnswer: "Level of development is the most important reason for differences in energy use per person. HICs have more factories, offices, private cars, air travel and household appliances, so each person uses far more energy than in an LIC, where many rural families cook with fuelwood and have no electricity. As MICs such as China and India have industrialised, their energy use per person has risen.\n\nHowever, other factors matter too. Climate affects demand: countries with cold winters use a great deal of energy for heating, and hot countries increasingly use air conditioning. Resources matter: Gulf states with cheap local oil and gas have very high energy use per person. Economic structure matters: a country with steel and aluminium industries uses more energy than one with a similar income based on services. Population size explains total use: a populous country can be a huge consumer in total even when each person uses little.\n\nOverall, development is the main reason for differences in use per person, but climate, resources and economic structure explain why countries at the same level of development use different amounts, and population size explains differences in total use.",
    explanation: "Level 3 answers assess development against at least two other factors and reach a supported judgement.",
    hints: ["Separate total use from use per person.", "Give at least two factors other than development."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Study Table 1.\n\n${PERCAP}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "How many times more energy per person does country W use than country Y?", value: 4, wrong: [120, 0.25], explanation: "160 ÷ 40 = 4 times." }),
      P.manual({ label: "(b)", marks: 2, stem: "Describe the relationship between energy use per person and the share of energy from fuelwood.", points: [
        "As energy use per person falls, the share from fuelwood rises (a negative / inverse relationship).",
        "Uses data, e.g. V uses 250 GJ with 1 % from fuelwood, Z uses 10 GJ with 80 %.",
      ], explanation: "State the relationship and support it with figures." }),
      P.manual({ label: "(c)", marks: 3, stem: "Suggest reasons why country Z obtains most of its energy from fuelwood.", points: [
        "Many people live in rural areas without a grid connection.",
        "Low incomes: fuelwood can be collected free, while electricity, gas and appliances are expensive.",
        "Most energy is used for cooking, and the country may have few fossil fuels or power stations.",
      ], explanation: "Link the reasons to the country being an LIC." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest why two HICs, V and W, have different levels of energy use per person.", points: [
        "Different climates (e.g. V needs more heating or air conditioning).",
        "Different economic structure or resources (e.g. V has heavy industry or cheap local oil and gas).",
      ], explanation: "Factors other than development." }),
    ],
    hints: ["Divide the larger value by the smaller one.", "A negative relationship means one value falls as the other rises."],
    explanation: "Practice in analysing energy-use data for countries at different levels of development.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Study Table 2.\n\n${BAL}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate country J's energy surplus, in Mtoe.", value: 360, wrong: [680], explanation: "520 − 160 = 360 Mtoe." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which country has the largest energy deficit?", options: [
        ["Country K", "Correct: 400 − 40 = 360 Mtoe deficit."],
        ["Country L", "L has a deficit of only 30 Mtoe."],
        ["Country J", "J has a large surplus."],
        ["Country M", "M has a small surplus of 2 Mtoe."],
      ], answer: "A", explanation: "K consumes 400 Mtoe but produces only 40, a deficit of 360 Mtoe." }),
      P.num({ label: "(c)", marks: 2, unit: "%", stem: "Calculate the percentage of country K's consumption that is met by its own production.", value: 10, tol: 0.1, wrong: [90, 1000], explanation: "40 ÷ 400 × 100 = 10 %." }),
      P.manual({ label: "(d)", marks: 4, stem: "Explain **two** threats to the energy security of country K.", points: [
        "It depends on imports for 90 % of its energy.",
        "So a conflict, sanctions or problems in a supplier country could cut its supply.",
        "World price rises would raise its import bill sharply.",
        "Which uses foreign currency and raises costs for industry and households.",
      ], explanation: "Two threats, each explained with reference to the data." }),
    ],
    hints: ["Surplus = production − consumption.", "Use the percentage you calculated in (c)."],
    explanation: "Practice in using energy balance data.",
  });
  b.card("DEFINITION", "Energy surplus", "A country produces more energy than it consumes and can export the rest (e.g. Saudi Arabia, Russia, Norway).");
  b.card("DEFINITION", "Energy deficit", "A country consumes more energy than it produces and must import (e.g. Japan, South Korea, much of Europe).");
  b.card("DEFINITION", "Energy security", "Reliable, uninterrupted access to enough energy at an affordable price.");
  b.card("CONCEPT", "Why energy demand is rising", "Population growth, industrialisation (China, India), rising living standards, urbanisation and new technology.");
  b.card("CONCEPT", "Threats to energy security", "Import dependence, conflict, price shocks, droughts and hazards, ageing infrastructure, depletion of reserves.");
  b.card("CONCEPT", "Improving energy security", "Diversify sources and suppliers, develop renewables, store fuel, build interconnectors, use energy efficiently.");
  b.card("CONCEPT", "Energy use between countries", "Development (main factor per person), climate, resources, population size and economic structure.");
  b.card("VOCABULARY", "Energy ladder", "Households move from wood and dung, to charcoal and paraffin, to LPG and electricity as incomes and access improve.");
  b.card("FACT", "Europe's gas crisis", "After the war in Ukraine began in 2022, Russian gas supplies to Europe were cut and prices rose steeply.");
});
