// W2b: energy.zimbabwe-clean-green (ZIMSEC only; items are tagged to ZIMSEC automatically).
// Computed: household load 120+15+120 = 255 Wh; panel 255/(5 x 0.75) = 68 W; 80 W gives 300 Wh; payback 250/10 = 25 months = 2.1 years;
// clinic load 240+480+40 = 760 Wh, panel 202.7 W; clinic payback 600/25 = 24 months, net gain over 10 years 2400; electrified 60/200 = 30%.
import { concept, P, geographyLevels, chk, rnd, sum } from "../lib.mjs";
import { mc, tbl } from "../tables/w2b-_q.mjs";

const HH = [["Three LED bulbs, 10 W each, 4 hours a day", 3 * 10 * 4], ["Phone charging, 5 W for 3 hours", 5 * 3], ["Small television, 40 W for 3 hours", 40 * 3]];
const hhWh = chk(sum(HH.map((h) => h[1])), 255);
const panelW = chk(hhWh / (5 * 0.75), 68);
const output80 = chk(80 * 5 * 0.75, 300);
const HHTAB = tbl(["Appliance", "Energy per day (Wh)"], HH);
const payM = chk(250 / 10, 25);
const payY = rnd(25 / 12, 1, 2.1, "payY");
const elecPct = chk((60 / 200) * 100, 30);

const CL = [["Six lights, 8 W each, 5 hours a day", 6 * 8 * 5], ["Vaccine refrigerator, 60 W running 8 hours a day", 60 * 8], ["Phone charging and radio, 10 W for 4 hours", 10 * 4]];
const clWh = chk(sum(CL.map((c) => c[1])), 760);
const clPanel = rnd(clWh / (5 * 0.75), 1, 202.7, "clPanel");
const CLTAB = tbl(["Appliance", "Energy per day (Wh)"], CL);
const clPay = chk(600 / 25, 24);
const clGain = chk(10 * 12 * 25 - 600, 2400);

concept("ageo.energy.zimbabwe-clean-green", { file: "energy/zimbabwe-clean-green", keyPrefix: "energy.zimbabwe-clean-green" }, (b) => {
  mc(b, 1, "RECALL", "What is the role of the **regulator** (charge controller) in a solar home system?", [
    ["It protects the battery from overcharging and deep discharge", "Correct: this lengthens battery life."],
    ["It converts direct current from the battery into the Sun's light", "That does not describe its role."],
    ["It increases the strength of sunshine reaching the panel", "A regulator cannot change the sunshine."],
    ["It stores the gas used for cooking", "That is a biogas digester or tank."],
  ], "The **regulator** controls charging to protect the battery.");
  mc(b, 2, "UNDERSTANDING", "Why does a drought reduce the electricity generated at Kariba?", [
    ["Less water in the lake means less flow through the turbines", "Correct: output depends on water volume and head."],
    ["Coal used at the dam becomes damp and burns poorly", "Kariba is hydroelectric; it does not burn coal."],
    ["High temperatures melt the wires leaving the station", "Heat does not explain lower generation."],
    ["Drought increases the number of tourists at the dam", "Tourism does not affect generation."],
  ], "Hydro output depends on **water level**.");
  mc(b, 2, "UNDERSTANDING", "Which is a potential, rather than an actual, energy source in Zimbabwe?", [
    ["Coal-bed methane", "Correct: it exists but is little developed."],
    ["Hydroelectricity at Kariba", "Kariba is already developed."],
    ["Coal at Hwange", "Hwange is already developed."],
    ["Fuelwood for cooking", "Fuelwood is widely used already."],
  ], "**Coal-bed methane** is a potential source.");
  mc(b, 2, "UNDERSTANDING", "How does a household biogas digester reduce wood use?", [
    ["It ferments dung to give gas for cooking and lighting", "Correct: the gas replaces fuelwood."],
    ["It burns the dung directly to heat water for the day", "A digester ferments dung without burning it."],
    ["It produces electricity from sunlight", "That is solar PV."],
    ["It collects rainwater to put out cooking fires", "Biogas production does not involve rainwater collection."],
  ], "Dung and water ferment to produce **methane** for cooking.");
  mc(b, 3, "APPLICATION", "Which site is the best candidate for a solar mini-grid?", [
    ["A sunny village far from the grid with many households and a clinic", "Correct: high resource, high need and no grid access."],
    ["A shaded valley next to a large power station", "Shade reduces solar output and the grid is already close."],
    ["A protected forest reserve with no settlement", "No demand and a protected area."],
    ["A city centre with reliable mains supply", "Reliable grid supply reduces the need."],
  ], "Solar mini-grids suit **sunny, off-grid communities**.", { hints: ["Look for strong resource, strong need and distance from the grid."] });
  mc(b, 3, "ANALYSIS", "Which is the strongest reason why GIS is useful in locating potential energy sites?", [
    ["It overlays resource and constraint layers to find the best sites", "Correct: sunshine, slope, roads, grid and land use can be combined."],
    ["It replaces the need for any field visit or consultation", "Field work and consultation are still needed."],
    ["It reduces the cost of building any power station", "GIS informs site choice but does not lower construction costs directly."],
    ["It produces energy from digital maps", "Maps do not produce energy."],
  ], "GIS overlays **many layers** to find sites with high resource and low constraints.", { hints: ["Think about combining layers of data."] });
  b.tf({ d: 1, skill: "RECALL", stem: "Fuelwood and charcoal are still the main cooking fuels for many Zimbabwean households.", answer: true,
    feedbackTrue: "Correct: this is especially true in rural areas.",
    feedbackFalse: "Not so: many households depend on wood fuels.",
    explanation: "Biomass fuels are the main household fuels for many people." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A solar panel on its own can supply a house with electricity at night without any battery.", answer: false,
    feedbackFalse: "Correct: panels generate only in daylight, so a battery (or the grid) is needed at night.",
    feedbackTrue: "Not so: there is no output in the dark.",
    explanation: "Storage in a **battery** supplies power at night." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "A {{blank:a}} digester produces gas from cattle dung. A solar {{blank:b}} protects the battery from overcharging. Producing fuel from plants such as jatropha is a {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["biogas"], choices: ["biogas", "coal", "tidal"] },
      { id: "b", accepted: ["regulator"], choices: ["regulator", "lantern", "turbine"] },
      { id: "c", accepted: ["biofuel"], choices: ["biofuel", "fossil fuel", "geothermal source"] },
    ], explanation: "Biogas, regulator and biofuel." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each energy source to its location or feature in Zimbabwe.",
    pairs: [
      ["Kariba South", "Hydroelectric station on the Zambezi, shared dam with Zambia"],
      ["Hwange", "Coal-fired power station using local coal"],
      ["Chisumbanje", "Ethanol from sugarcane blended with petrol"],
      ["Coal-bed methane", "Gas trapped in coal seams, a potential source"],
    ], explanation: "Each is a known actual or potential source." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: `A household uses these appliances:\n\n${HHTAB}\n\nCalculate the total energy used per day, in Wh.`,
    hints: ["Add the three daily energy values."],
    value: hhWh, wrong: [120, 765],
    explanation: "120 + 15 + 120 = **255 Wh**." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true,
    stem: "A household uses 255 Wh per day. The site gets 5 peak sun hours a day and 75% of the panel's rating is usable. Calculate the minimum panel size needed, in watts.",
    hints: ["Panel size = daily energy ÷ (peak sun hours × usable fraction)."],
    value: panelW, wrong: [51, 85],
    explanation: "255 ÷ (5 × 0.75) = 255 ÷ 3.75 = **68 W**. Ignoring the 75% usable fraction gives 51 W, which is too small." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, dp: 0,
    stem: "A solar system costs US\\$250 and saves a household US\\$10 a month. Calculate the payback period, in months.",
    hints: ["Divide the cost by the monthly saving."],
    value: payM, wrong: [2500, 240],
    explanation: "250 ÷ 10 = **25 months**." });
  b.calc({ d: 4, skill: "ANALYSIS", calculator: true, dp: 1, unit: "years",
    stem: "A solar system costs US\\$250 and saves a household US\\$10 a month. Calculate the payback period in years, to 1 decimal place.",
    hints: ["Find the payback in months first.", "Divide by 12."],
    value: payY, wrong: [25, 0.5],
    explanation: "1. Payback in months = 250 ÷ 10 = 25 months.\n2. In years = 25 ÷ 12 = **2.1 years**." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the river on which Lake Kariba and the Kariba hydroelectric station are located.",
    accepted: ["Zambezi", "the Zambezi", "Zambezi River", "the Zambezi River"], wrong: ["Limpopo"],
    explanation: "The **Zambezi**." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the fuel produced from sugarcane at Chisumbanje that is blended with petrol.",
    accepted: ["ethanol", "bioethanol", "ethanol fuel"], wrong: ["diesel"],
    explanation: "**Ethanol**." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why Zimbabwe has potential for solar energy.",
    hints: ["Think about the climate and the places that need power."],
    points: [
      "The country has strong sunshine and a long dry season, so solar panels produce a lot of energy.",
      "Many rural homes, clinics and schools are far from the grid, and solar can be installed in small units.",
      "The cost of panels has fallen, and solar power replaces expensive or polluting candles, paraffin and diesel.",
    ],
    modelAnswer: "Zimbabwe has strong sunshine and a long dry season. Many rural homes, clinics and schools are far from the grid and can use small solar systems, and the cost of panels has fallen, so solar replaces candles, paraffin and diesel.",
    explanation: "Resource, need and cost." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how a drought can lead to load-shedding in Zimbabwe.",
    hints: ["Start with the lake and the turbines."],
    points: [
      "A drought reduces inflow to the Zambezi and the level of Lake Kariba.",
      "With a lower water level, less water and head are available for the turbines, so electricity output falls.",
      "The grid is also short of other supply because thermal stations are old or short of maintenance and imports are limited.",
      "Demand exceeds supply, so supply is cut in turn to different areas (load-shedding).",
    ],
    modelAnswer: "A drought reduces inflow to the Zambezi and the level of Lake Kariba, so less water and head are available for the turbines. Output falls, and with old thermal stations and limited imports demand exceeds supply, so power is cut in turn to different areas.",
    explanation: "Lower lake level, lower output, no other supply, rationing." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Describe how a GIS could be used to find the best site for a small solar power plant near a rural clinic.",
    hints: ["Name the data layers and how they are combined."],
    points: [
      "Collect map layers such as solar radiation, slope, land use, roads, protected areas and the grid.",
      "Exclude unsuitable areas such as steep slopes, farmland, protected land and flood-prone places.",
      "Score the remaining sites for high sunshine and short distance to the clinic and a road.",
      "Overlay the layers, rank the sites and check the best ones in the field and with the community.",
    ],
    modelAnswer: "Collect layers for solar radiation, slope, land use, roads, protected areas and the grid. Exclude steep, protected, farmed or flood-prone areas. Score the remaining sites on sunshine and closeness to the clinic and a road, overlay and rank them, then check the best sites in the field and with the community.",
    explanation: "Layers, exclusion, scoring and ground checking." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: `A rural clinic with no grid connection plans a solar system (illustrative figures, invented for this exercise).\n\n${CLTAB}\n\nThe site gets 5 peak sun hours per day and 75% of the panel's rating is usable.`,
    hints: ["Add the daily energy needs.", "Panel size = daily energy ÷ (peak sun hours × usable fraction)."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the total energy needed per day, in Wh.", value: clWh, wrong: [240, 480],
        explanation: "240 + 480 + 40 = 760 Wh." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the minimum panel size, in watts, to 1 decimal place.", value: clPanel, dp: 1, wrong: [152, 217.1],
        explanation: "760 ÷ (5 × 0.75) = 760 ÷ 3.75 = 202.7 W." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which part of the system lets the refrigerator run at night?", options: [
        ["The battery", "Correct: it stores energy collected during the day."],
        ["The regulator", "The regulator protects the battery but does not store energy."],
        ["The panel frame", "The frame only supports the panel."],
        ["The water tank", "A water tank is not part of the electrical storage."],
      ], answer: "A", explanation: "The battery stores power for use at night." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why solar power is suitable for the clinic.",
        points: [
          "It is far from the grid, so connection would be very costly, whereas a solar system can be installed on site.",
          "The refrigerator and lights need a reliable supply to keep vaccines safe and allow night work, which a solar and battery system can provide.",
          "Running costs are low because there is no fuel to buy or transport, and there are no fumes.",
        ],
        modelAnswer: "The clinic is far from the grid, so connection would be costly, whereas solar can be installed on site. A solar and battery system gives the reliable supply needed to keep vaccines cold and allow work at night, and running costs are low because there is no fuel to buy or transport.",
        explanation: "Remote, reliable and low running costs." }),
    ], explanation: "Size a solar system for a clinic and explain the choice." });

  b.struct({ d: 3, skill: "ANALYSIS",
    stem: "The clinic's solar system costs US\\$600 and saves the clinic US\\$25 a month on diesel and candles (illustrative figures, invented for this exercise).",
    hints: ["Payback = cost ÷ monthly saving.", "Net gain = total savings − cost."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the payback period, in months.", value: clPay, wrong: [15000, 576],
        explanation: "600 ÷ 25 = 24 months." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the net gain over 10 years (total savings minus the cost), in US\\$.", value: clGain, unit: "US$", wrong: [3000, 600],
        explanation: "Savings = 10 × 12 × 25 = 3 000. Net gain = 3 000 − 600 = 2 400." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest two problems that could reduce the benefits of the system.",
        points: [
          "Battery replacement after a few years adds cost, and poor maintenance shortens the life of the system.",
          "Theft or damage of panels, or demand growing beyond the system's size.",
        ],
        modelAnswer: "The battery must be replaced after a few years, which adds cost, and panels may be stolen or damaged. If demand grows beyond the size of the system, it will not supply all needs.",
        explanation: "Replacement costs, theft and growth in demand." }),
    ], explanation: "Calculate payback and net gain and consider limits." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the potential for renewable energy sources to reduce Zimbabwe's dependence on Kariba and Hwange.",
    hints: ["Cover solar, small hydro, biogas and one other source.", "Include constraints and reach a judgement."],
    points: [
      "Solar has great potential because of strong sunshine and can be installed quickly at household and mini-grid scale.",
      "Solar needs storage for the evening peak and is limited by the cost of batteries and investment.",
      "Small and mini-hydro can use highland rivers and serve local areas, but flows are seasonal and sites are limited.",
      "Biogas and efficient stoves can reduce the use of fuelwood in rural areas, but need dung, water and maintenance.",
      "Wind is possible on some ridges but wind speeds are modest in much of the country and need to be measured.",
      "Dependence on Kariba is a risk in drought, and coal is polluting, so diversification improves security.",
      "Constraints include finance, grid connection, policy and skills, and large renewable projects take time.",
      "Judgement: renewables, led by solar, can reduce but not remove dependence in the short term; they work best alongside repairs to existing plants and more efficient use of energy.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Solar has the greatest potential because of strong sunshine and can be installed quickly at household and mini-grid scale, though it needs batteries for the evening peak and investment. Small hydro can use highland rivers, but flows are seasonal and sites are limited. Biogas and improved stoves can cut the use of fuelwood, but need dung, water and maintenance. Wind speeds are modest in much of the country. Because Kariba is vulnerable to drought and coal is polluting, diversification improves security, but finance, grid connection and skills are constraints. I conclude that renewables, led by solar, can reduce but not remove dependence in the short term and work best alongside repairs to existing plants and more efficient use of energy.",
    wordLimit: { max: 300 }, explanation: "Weigh the potential of each renewable source against constraints and judge." });

  b.card("FACT", "Zimbabwe's main power stations", "Kariba South (hydro, about 1 050 MW) and Hwange (coal, originally about 920 MW, with newer units added); smaller thermal stations at Harare, Bulawayo and Munyati.");
  b.card("CONCEPT", "Why drought cuts power", "Lower lake level means less water and head for the turbines, so Kariba generation falls.");
  b.card("FACT", "Potential energy sources in Zimbabwe", "Solar, small hydro, wind, biogas, coal-bed methane, large hydro (for example Batoka Gorge) and biofuels.");
  b.card("CONCEPT", "GIS for energy sites", "Overlay resource layers (sun, wind, flow) and constraint layers (slope, land use, grid, roads) to rank sites.");
  b.card("CONCEPT", "Solar home system parts", "Panel, regulator (charge controller), battery, inverter and appliances.");
  b.card("DEFINITION", "Biogas digester", "A sealed tank in which dung and water ferment to produce methane gas for cooking and lighting, plus fertiliser slurry.");
  b.card("FORMULA", "Solar panel sizing", "Panel (W) = daily energy (Wh) ÷ (peak sun hours × usable fraction).");
  b.card("FORMULA", "Payback period", "Payback = cost of system ÷ saving per month (or per year).");
  b.card("FACT", "Ethanol blending", "Ethanol from sugarcane at Chisumbanje is blended with petrol in Zimbabwe.");
});
