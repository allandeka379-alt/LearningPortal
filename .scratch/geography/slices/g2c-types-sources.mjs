// Slice G2c: types and sources of energy (ZIMSEC 7.5.1; Cambridge 10.4).
import { concept, P, ZIM, geographyLevels } from "../lib.mjs";

const COOK = "**Table 1: Main cooking fuel used by 200 households in a fictional rural ward and a fictional town (fictional survey data)**\n\n| Main cooking fuel | Rural ward (households) | Town (households) |\n|---|---|---|\n| Fuelwood | 150 | 30 |\n| Electricity | 10 | 110 |\n| LPG (gas) | 16 | 50 |\n| Paraffin | 14 | 6 |\n| Biogas | 10 | 4 |\n| **Total** | 200 | 200 |";

const MIX = "**Table 2: Electricity generated in a fictional country in one year, by source (fictional data)**\n\n| Source | Electricity generated (GWh) |\n|---|---|\n| Coal | 4,500 |\n| HEP | 3,600 |\n| Solar | 600 |\n| Diesel generators | 300 |\n| **Total** | 9,000 |";

concept("geo.energy.types-sources", { file: "energy/types-sources", keyPrefix: "energy.types-sources" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which energy source is **non-renewable**?",
    options: [
      ["Coal", "Correct: coal took millions of years to form and is used far faster than it forms."],
      ["Solar energy", "Sunlight arrives every day, so solar energy is renewable."],
      ["Wind", "Wind is driven by the sun's heating of the atmosphere and does not run out."],
      ["Hydro-electric power", "HEP uses flowing water that is replaced by rainfall, so it is renewable."],
    ],
    answer: "A",
    explanation: "Coal, oil, natural gas and uranium are non-renewable. Solar, wind, HEP, geothermal, tidal, wave and biogas are renewable.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which group contains **only** fossil fuels?",
    options: [
      ["Coal, oil and natural gas", "Correct: all three formed from buried remains of plants and animals."],
      ["Coal, uranium and oil", "Uranium is non-renewable but it is a mineral, not a fossil fuel."],
      ["Oil, biogas and natural gas", "Biogas is made today from dung and waste; it is not a fossil fuel."],
      ["Natural gas, charcoal and coal", "Charcoal is made from wood, which is biomass, not a fossil fuel."],
    ],
    answer: "A",
    explanation: "Fossil fuels are coal, oil and natural gas. Nuclear fuel (uranium) is non-renewable but not fossil; charcoal and biogas are biomass.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is fuelwood classed as **either** renewable or non-renewable?",
    options: [
      ["It depends on whether trees regrow as fast as they are cut", "Correct: managed woodlots are renewable, but clearing woodland faster than it regrows is not."],
      ["It depends on whether the wood is burned or made into charcoal", "Charcoal is still wood; turning it into charcoal does not decide whether the supply is renewed."],
      ["Wood is renewable in the rainy season and non-renewable in the dry season", "The classification does not change with the seasons."],
      ["Wood from indigenous trees is renewable but exotic trees are not", "Any tree species can be renewable if it is replanted or regrows."],
    ],
    answer: "A",
    explanation: "Fuelwood is renewable **only if managed sustainably**: if cutting is faster than regrowth, the woodland disappears and the resource behaves as non-renewable.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is **biogas** mainly made of, and how is it produced?",
    options: [
      ["Methane, produced when dung and plant waste rot without air in a digester", "Correct: bacteria break down the waste anaerobically and give off methane."],
      ["Carbon dioxide, produced when wood is burned in a closed stove", "Burning wood gives off carbon dioxide and smoke, not biogas."],
      ["Hydrogen, produced when water is split by sunlight", "This is not how biogas is made."],
      ["Steam, produced when crop waste is boiled in a tank", "Biogas is a burnable gas, not steam."],
    ],
    answer: "A",
    explanation: "A biogas digester is a sealed tank. Dung and water rot without oxygen, producing methane-rich gas for cooking and lighting and a slurry that makes good fertiliser.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is **geothermal** power generated in Kenya but not in Zimbabwe?",
    options: [
      ["Kenya lies on the East African Rift, where hot rocks are close to the surface", "Correct: Olkaria in Kenya's Rift Valley uses steam from hot rocks."],
      ["Kenya has more steep rivers flowing off its high plateaus and mountains", "Steep rivers suit HEP, not geothermal power."],
      ["Kenya receives more sunshine than Zimbabwe", "Sunshine is used for solar power, not geothermal power."],
      ["Kenya has a coastline with strong tides", "Tides are used for tidal power; geothermal needs heat from rocks."],
    ],
    answer: "A",
    explanation: "Geothermal power needs hot rocks near the surface, which occur in volcanic and rift areas such as the Kenyan part of the East African Rift.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A rural clinic is 40 km from the nearest power line. Which energy source is the **most suitable** to light it and run a vaccine fridge?",
    options: [
      ["Solar panels with batteries", "Correct: sunshine is plentiful, there is no fuel to buy and no grid line is needed."],
      ["A small nuclear reactor", "Nuclear power is far too costly and dangerous for a single clinic."],
      ["A tidal turbine", "Tidal power needs a coast, which Zimbabwe does not have."],
      ["A new grid line from the nearest town", "Building 40 km of power line for one clinic is very expensive."],
    ],
    answer: "A",
    explanation: "Off-grid solar systems suit remote clinics and schools in sunny countries: running costs are low and batteries provide power at night.",
    hints: ["Think about the cost of bringing energy to a remote place and what is available on site."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why are mines and smelters especially badly affected by power cuts?",
    options: [
      ["Pumps, hoists and furnaces must run non-stop, so output halts", "Correct: underground mines need pumps and ventilation, and smelters need constant heat."],
      ["Mines use more labour than machines, so workers cannot see to work", "Modern mines are heavily mechanised; lighting is only a small part of the problem."],
      ["Smelters use solar power, which also stops when the grid fails", "Smelters draw large amounts of power from the grid, not mainly from solar panels."],
      ["Minerals can only be sold when the national grid is working", "Selling minerals does not depend on the grid."],
    ],
    answer: "A",
    explanation: "Mining needs power for drills, hoists, ventilation, pumping water out of shafts, crushing ore and smelting (for example ferrochrome). Cuts stop output and raise costs.",
    hints: ["List the machines that must keep running underground and in a furnace."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement **best** explains why a country might keep building coal-fired power stations even though they pollute?",
    options: [
      ["It has large coal reserves and needs reliable power day and night", "Correct: coal gives reliable base-load power from a local resource, whatever the weather."],
      ["Coal-fired stations produce no carbon dioxide", "Burning coal releases large amounts of carbon dioxide."],
      ["Coal is a renewable resource that will never run out", "Coal is non-renewable."],
      ["Coal-fired stations need no water for cooling", "Thermal stations need large amounts of water for cooling."],
    ],
    answer: "A",
    explanation: "Coal is reliable and, where it is mined locally (as at Hwange), saves foreign currency on imports. Its drawbacks are pollution, greenhouse gases and the fact that it is finite.",
    hints: ["Think about reliability and local resources, compared with HEP in a drought."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Nuclear power stations use uranium, which is a non-renewable resource.",
    answer: true,
    explanation: "True. Uranium is a mineral that is mined and will eventually run out, although a small amount produces a great deal of energy.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Hydro-electric power has no environmental impact because it produces no smoke.",
    answer: false,
    explanation: "False. HEP produces no smoke, but the dam floods land, displaces people and wildlife and changes river flow and sediment downstream.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences about energy sources.",
    template: "Panels that turn sunlight directly into electricity are called {{blank:a}} panels. Heat from hot rocks underground is called {{blank:b}} energy.",
    blanks: [
      { id: "a", accepted: ["photovoltaic"], choices: ["photovoltaic", "thermal", "nuclear", "tidal"] },
      { id: "b", accepted: ["geothermal"], choices: ["geothermal", "thermal", "biomass", "kinetic"] },
    ],
    wrong: [["thermal", "thermal"]],
    explanation: "Photovoltaic (PV) cells convert light to electricity; geothermal energy uses heat from the Earth's interior.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each energy source with an important use in Zimbabwe.",
    pairs: [
      ["Coal", "Burned at Hwange to generate electricity"],
      ["Diesel", "Fuels tractors, lorries and buses"],
      ["Fuelwood", "Cooking in most rural homes"],
      ["Falling water", "Turns turbines at Kariba"],
    ],
    explanation: "Coal and HEP generate most of Zimbabwe's electricity, diesel and petrol power transport, and fuelwood remains the main rural cooking fuel.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A household uses four 10 W LED bulbs for 5 hours every evening. Calculate the electricity they use in a 30-day month, in kilowatt-hours.",
    value: 6, unit: "kWh", tol: 0.01,
    wrong: [6000, 0.2],
    explanation: "4 × 10 W = 40 W = 0.04 kW; 0.04 kW × 5 h = 0.2 kWh a day; 0.2 × 30 = 6 kWh.",
    workedSolution: "1. Total power = 4 × 10 W = 40 W = 0.04 kW.\n2. Daily use = 0.04 kW × 5 h = 0.2 kWh.\n3. Monthly use = 0.2 kWh × 30 = 6 kWh.",
    hints: ["Convert watts to kilowatts by dividing by 1,000.", "Energy (kWh) = power (kW) × time (h)."],
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "In a fictional country, solar power provides 15 % of electricity. Calculate the angle of the solar sector on a pie chart of the country's electricity sources.",
    value: 54, unit: "°",
    wrong: [15, 150],
    explanation: "15 ÷ 100 × 360 = 54°.",
  });
  b.short({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "Name the town in north-western Zimbabwe where coal is mined and burned in a large thermal power station.",
    accepted: ["Hwange", "Hwange town"],
    wrong: ["Kariba"],
    explanation: "**Hwange** has Zimbabwe's main coalfield and the Hwange thermal power station.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which energy is important to commercial agriculture.",
    points: [
      "Fuel (diesel) powers tractors and lorries for ploughing, harvesting and transport to market.",
      "This allows larger areas to be farmed and produce to reach markets quickly.",
      "Electricity or diesel runs irrigation pumps (or tobacco curing barns, cold rooms, milking machines).",
      "This allows farming in the dry season / higher and more reliable yields / produce of better quality.",
    ],
    modelAnswer: "Diesel powers tractors and lorries, so a farm can plough and harvest large areas quickly and take crops to market. Electricity drives irrigation pumps, so crops can be grown through the dry season and yields are more reliable.",
    explanation: "Two uses, each with an explanation of why it matters (2 + 2).",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "A farming family has six cattle. Justify the choice of a biogas digester rather than fuelwood for cooking.",
    points: [
      "Dung from the cattle provides a free and steady supply of raw material.",
      "Fewer trees are cut, reducing deforestation and soil erosion.",
      "Biogas burns cleanly, so there is less indoor smoke and respiratory illness.",
      "The slurry left over is a good fertiliser / less time is spent collecting wood.",
    ],
    modelAnswer: "The family's six cattle produce dung every day, so the digester has a free, steady supply. Using biogas means fewer trees are cut, which reduces deforestation and erosion. Biogas burns cleanly, so the kitchen is free of the smoke that causes chest illness, and women and children save hours collecting firewood. The slurry can be spread on fields as fertiliser.",
    explanation: "Justify means give reasons why the advantages outweigh the alternative in this context.",
    hints: ["Link each advantage to the family's cattle or to the problems of fuelwood."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Evaluate the advantages and disadvantages of using renewable energy sources in a country such as Zimbabwe.",
    points: [
      ["HEP advantage: cheap to run, clean, a large share of supply (Kariba).", 1],
      ["HEP disadvantage: output falls when Lake Kariba is low in droughts; dams are costly and displace people.", 1],
      ["Solar advantage: abundant sunshine all year; suits off-grid rural areas.", 1],
      ["Solar disadvantage: no output at night; batteries and panels are costly to buy.", 1],
      ["Biomass/biogas: uses local waste and dung; fuelwood leads to deforestation unless managed.", 1],
      ["Wind/geothermal/tidal limited: weak inland winds, no rift heat source, no coast.", 1],
      ["Compares with non-renewables: renewables cut imports and emissions, but coal is more reliable.", 1],
      ["Judgement, e.g. a mix of renewables with storage is the best long-term option.", 1],
    ],
    levels: geographyLevels(8),
    modelAnswer: "Hydro-electric power from Kariba is Zimbabwe's most important renewable source. Once the dam is built, running costs are low and there is no smoke. However, output depends on the level of Lake Kariba, so in drought years generation has had to be cut sharply, causing long power cuts. Large dams are also very costly and displaced thousands of Tonga people when Kariba was built.\n\nSolar energy has great potential because Zimbabwe has strong sunshine for most of the year. Panels can supply remote homes, schools and clinics without an expensive grid line, and they produce no pollution. Their disadvantages are that they produce nothing at night, and batteries and panels are expensive for poor households.\n\nBiogas uses dung and waste that are freely available on many farms and leaves a useful fertiliser, but digesters cost money and need a steady supply of dung and water. Fuelwood is cheap but is renewable only if trees are replanted; in many communal areas it is cut faster than it regrows, causing deforestation and erosion. Some sources are hardly possible: Zimbabwe has no coast for tidal or wave power, no rift heat for geothermal power and few places with strong, steady winds.\n\nCompared with coal and imported oil, renewables reduce greenhouse gas emissions and save foreign currency, but they are less reliable on their own. Overall, renewables are the best long-term option for Zimbabwe if HEP and solar are combined with storage and backed up by some thermal power during droughts.",
    explanation: "Level 3 answers weigh several renewable sources in the Zimbabwean context and reach a supported judgement.",
    hints: ["Take each source in turn: advantage, disadvantage.", "Finish with a judgement about the best mix."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Study Table 1.\n\n${COOK}`,
    parts: [
      P.num({ label: "(a)", marks: 1, unit: "%", stem: "Calculate the percentage of rural households that cook mainly with fuelwood.", value: 75, wrong: [150, 15], explanation: "150 ÷ 200 × 100 = 75 %." }),
      P.num({ label: "(b)", marks: 1, stem: "How many times more town households than rural households cook mainly with electricity?", value: 11, wrong: [100, 0.09], explanation: "110 ÷ 10 = 11 times." }),
      P.manual({ label: "(c)", marks: 2, stem: "Compare the main cooking fuels used in the rural ward and the town.", points: [
        "Fuelwood dominates in the rural ward (150 households) but is much less used in town (30).",
        "Electricity and LPG are the main fuels in town (110 and 50) but are little used in the rural ward (10 and 16).",
      ], explanation: "Comparisons need both places and figures in the same sentence." }),
      P.manual({ label: "(d)", marks: 3, stem: "Suggest **three** reasons for the difference in the use of fuelwood.", points: [
        "Rural households often have no connection to the electricity grid.",
        "Fuelwood can be collected free nearby, while rural incomes are low.",
        "In town, wood must be bought and is scarce, and electricity, LPG cylinders and stoves are easier to obtain.",
      ], explanation: "Reasons about access, cost and availability." }),
      P.manual({ label: "(e)", marks: 3, stem: "Describe **three** problems caused by the heavy use of fuelwood in the rural ward.", points: [
        "Deforestation around the village as trees are cut faster than they regrow.",
        "Soil erosion once tree cover and roots are removed.",
        "Indoor smoke causes respiratory illness / women and children spend many hours collecting wood.",
      ], explanation: "Environmental and social problems." }),
    ],
    hints: ["Percentage = part ÷ total × 100.", "Use figures from both columns when you compare."],
    explanation: "Practice in using household energy survey data.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Study Table 2.\n\n${MIX}`,
    parts: [
      P.num({ label: "(a)", marks: 2, unit: "%", stem: "Calculate the percentage of the country's electricity that came from renewable sources.", value: 46.7, tol: 0.1, answer: "46.7", wrong: [53.3, 4200], explanation: "HEP + solar = 3,600 + 600 = 4,200 GWh; 4,200 ÷ 9,000 × 100 = 46.7 %." }),
      P.num({ label: "(b)", marks: 1, unit: "°", stem: "Calculate the angle of the coal sector on a pie chart of these data.", value: 180, wrong: [50, 4500], explanation: "4,500 ÷ 9,000 × 360 = 180°." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which source in Table 2 burns a fuel refined from oil?", options: [
        ["Diesel generators", "Correct: diesel is refined from oil, which such a country must import."],
        ["Coal-fired stations", "Coal is a fossil fuel, but it is mined, not refined from oil."],
        ["HEP dams", "HEP is renewable."],
        ["Solar panels", "Solar is renewable."],
      ], answer: "A", explanation: "Diesel is a petroleum product refined from crude oil; a country without oil wells must import it." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest how the country's electricity supply would be affected in a drought year.", points: [
        "HEP output would fall because river flow and reservoir levels drop.",
        "The country would need to burn more coal or diesel, import power or cut supply (load shedding).",
      ], explanation: "Link the drought to HEP and to the response." }),
      P.manual({ label: "(e)", marks: 2, stem: "Give **two** advantages for the country of increasing its solar generation.", points: [
        "Solar is renewable and produces no greenhouse gases or smoke while generating.",
        "It reduces dependence on HEP in droughts and on imported diesel / saves foreign currency.",
      ], explanation: "Two distinct advantages." }),
    ],
    hints: ["Renewable sources in the table are HEP and solar.", "A full circle is 360°."],
    explanation: "Practice in analysing an energy mix.",
  });
  b.card("DEFINITION", "Renewable energy", "Energy from a source that is naturally replaced and will not run out on a human time scale: solar, wind, HEP, geothermal, tidal, wave, biomass.");
  b.card("DEFINITION", "Non-renewable energy", "Energy from a finite source used faster than it forms: coal, oil, natural gas and uranium.");
  b.card("DEFINITION", "Fossil fuels", "Coal, oil and natural gas, formed over millions of years from buried plant and animal remains; burning them releases carbon dioxide.");
  b.card("CONCEPT", "Fuelwood: renewable or not?", "Either: renewable if trees regrow or are replanted as fast as they are cut; non-renewable if woodland is cleared faster than it regrows.");
  b.card("DEFINITION", "Biogas", "Methane-rich gas made when dung and plant waste rot without air in a sealed digester; used for cooking and lighting, leaving fertiliser slurry.");
  b.card("DEFINITION", "Geothermal energy", "Heat from hot rocks underground used to make steam for electricity, e.g. Olkaria in Kenya's Rift Valley.");
  b.card("FACT", "Zimbabwe's main power stations", "Kariba South (HEP, Zambezi) and Hwange (coal-fired thermal).", undefined, { applies: ZIM });
  b.card("CONCEPT", "Energy and the economy", "Agriculture (tractors, irrigation, curing), mining (pumps, hoists, smelting), manufacturing (machines, furnaces); shortages raise costs and cut output.");
  b.card("FACT", "Nuclear power in Africa", "Koeberg, near Cape Town in South Africa, is Africa's only nuclear power station.");
});
