// W2b: energy.transition-security (both boards; items suit both unless tagged).
// Computed: self-sufficiency 240/300 = 80%, import dependence 20%; LED 60 W: 87.6 kWh, 9 W: 13.14 kWh, saving 74.46 kWh, US$7.45 at US$0.10;
// R/P 50/2 = 25 years; OPEC-style share 33/100; Country Y coal 80 -> 60 (-20 points), renewables 5 -> 20 (+300%).
import { concept, P, geographyLevels, chk, rnd } from "../lib.mjs";
import { mc, tbl } from "../tables/w2b-_q.mjs";

const selfSuff = chk((240 / 300) * 100, 80);
const importDep = chk(((300 - 240) / 300) * 100, 20);
const oldKwh = chk(0.06 * 4 * 365, 87.6, 1e-9);
const ledKwh = chk(0.009 * 4 * 365, 13.14, 1e-9);
const saveKwh = rnd(oldKwh - ledKwh, 1, 74.5, "saveKwh");
const saveUsd = rnd((oldKwh - ledKwh) * 0.1, 2, 7.45, "saveUsd");
const rp = chk(50 / 2, 25);
const share = chk((33 / 100) * 100, 33);
const MIXY = tbl(["Source", "2010 (%)", "2023 (%)"], [["Coal", 80, 60], ["Gas", 10, 15], ["Nuclear", 5, 5], ["Wind and solar", 5, 20]]);
chk(80 + 10 + 5 + 5, 100);
chk(60 + 15 + 5 + 20, 100);
const coalFall = chk(80 - 60, 20);
const renRise = chk(((20 - 5) / 5) * 100, 300);
const gasRise = chk(((15 - 10) / 10) * 100, 50);

concept("ageo.energy.transition-security", { file: "energy/transition-security", keyPrefix: "energy.transition-security" }, (b) => {
  mc(b, 1, "RECALL", "Which organisation monitors civil nuclear material under safeguards agreements?", [
    ["The International Atomic Energy Agency (IAEA)", "Correct: it inspects nuclear facilities."],
    ["The Organization of the Petroleum Exporting Countries (OPEC)", "OPEC coordinates oil production."],
    ["The World Health Organization (WHO)", "WHO deals with health."],
    ["The Zambezi River Authority", "It manages the Zambezi dam and river."],
  ], "The **IAEA** inspects nuclear facilities under safeguards agreements.");
  mc(b, 2, "UNDERSTANDING", "Why is storage needed when a grid depends heavily on solar and wind?", [
    ["Output varies with weather and time of day", "Correct: demand and supply do not always match."],
    ["Solar and wind produce no electricity at all", "They produce electricity, but variably."],
    ["Storage reduces the cost of coal", "Storage does not change coal costs."],
    ["Wind and solar can only be used in the same hour that they are collected by law", "There is no such law."],
  ], "Intermittent supply needs **storage or back-up**.");
  mc(b, 2, "UNDERSTANDING", "Which is an example of energy **efficiency** rather than conservation?", [
    ["Replacing old bulbs with LED lamps", "Correct: the same light from less energy."],
    ["Walking to work instead of driving", "That changes behaviour: conservation."],
    ["Switching off lights in empty rooms", "That is conservation."],
    ["Turning down the heating in winter", "That is a change in behaviour."],
  ], "**Efficiency** uses better technology to get the same service from less energy.");
  mc(b, 2, "UNDERSTANDING", "Which best explains why Norway generates most of its electricity from hydropower?", [
    ["It has many rivers, high rainfall and steep mountains", "Correct: ideal natural conditions for hydro."],
    ["It has the world's largest coal reserves", "Norway does not rely on coal for power."],
    ["It has no rain and strong sunshine", "Norway is wet and has little strong sunshine."],
    ["It lies on the equator with a hot climate", "Norway is far from the equator."],
  ], "Rivers, relief and rainfall make hydro the natural choice.");
  mc(b, 3, "APPLICATION", "A country imports 60% of its energy from one supplier. Which action would most improve its energy security?", [
    ["Diversifying suppliers and developing domestic sources", "Correct: this reduces dependence on one source."],
    ["Signing a longer contract with the same single supplier", "This keeps the dependence."],
    ["Increasing its use of imported fuel for transport", "This increases dependence."],
    ["Closing all its domestic energy projects", "This increases import dependence."],
  ], "Diversifying **reduces dependence** on one supplier.", { hints: ["Which action reduces reliance on one source?"] });
  mc(b, 3, "ANALYSIS", "Which statement best explains why South Africa's transition from coal is slow?", [
    ["Coal plants already exist, coal provides jobs and the grid needs major upgrading", "Correct: economic and social factors slow change."],
    ["South Africa has no sunshine or wind to develop", "South Africa has good solar and wind resources."],
    ["Coal is a renewable resource that cannot run out", "Coal is finite."],
    ["South Africa has banned all renewable energy", "It has an active renewable programme."],
  ], "Existing plant, jobs and grid constraints slow the transition.", { hints: ["Think about economic and social reasons, not only technology."] });
  b.tf({ d: 1, skill: "RECALL", stem: "OPEC coordinates oil production by its members to influence the price of oil.", answer: true,
    feedbackTrue: "Correct: it uses production quotas.",
    feedbackFalse: "Not so: this is OPEC's main role.",
    explanation: "OPEC sets production targets to influence prices." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "The energy transition is purely a technology problem, because costs, jobs and politics have little effect.", answer: false,
    feedbackFalse: "Correct: finance, jobs, politics and grids all strongly affect the pace of change.",
    feedbackTrue: "Not so: non-technical factors are important.",
    explanation: "Cost, employment, public acceptance and policy shape the transition." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "Getting the same service from less energy through better technology is energy {{blank:a}}. Using less by changing behaviour is {{blank:b}}. The UN-linked body that inspects nuclear facilities is the {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["efficiency"], choices: ["efficiency", "conservation", "security"] },
      { id: "b", accepted: ["conservation"], choices: ["conservation", "efficiency", "diversification"] },
      { id: "c", accepted: ["IAEA"], choices: ["IAEA", "OPEC", "WHO"] },
    ], explanation: "Efficiency, conservation and the IAEA." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its meaning.",
    pairs: [
      ["Intermittency", "Output that varies with weather and time"],
      ["Diversification", "Using several sources or suppliers of energy"],
      ["Just transition", "Moving away from fossil fuels while supporting affected workers and communities"],
      ["Self-sufficiency", "The share of energy use met from a country's own production"],
    ], explanation: "These four terms are central to energy transition." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, unit: "%", dp: 0,
    stem: "A country produces 240 units of energy and uses 300 units a year. Calculate its energy self-sufficiency, as a percentage.",
    hints: ["Divide production by consumption."],
    value: selfSuff, wrong: [20, 125],
    explanation: "240 ÷ 300 × 100 = **80%**. The value 20% is the import dependence." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "years", dp: 0,
    stem: "A country has proven oil reserves of 50 billion barrels and produces 2 billion barrels a year. At this rate, for how many years will the reserves last (the reserves-to-production ratio)?",
    hints: ["Divide the reserves by the annual production."],
    value: rp, wrong: [100, 48],
    explanation: "50 ÷ 2 = **25 years**. The ratio assumes no change in production or new discoveries." });
  b.calc({ d: 4, skill: "ANALYSIS", calculator: true, unit: "%", dp: 0,
    stem: `Illustrative electricity mix of Country Y:\n\n${MIXY}\n\nCalculate the percentage increase in the share of wind and solar between 2010 and 2023.`,
    hints: ["Find the increase in percentage points, then divide by the 2010 value."],
    value: renRise, wrong: [15, 75],
    explanation: "1. Increase = 20 − 5 = 15 percentage points.\n2. As a percentage of the 2010 share: 15 ÷ 5 × 100 = **300%**.\n3. Dividing by the 2023 share (20) gives 75%, the wrong base." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, dp: 1, unit: "kWh",
    stem: "A 60 W bulb and a 9 W LED bulb are each used for 4 hours a day for 365 days. Calculate the electricity saved per year by using the LED, in kWh to 1 decimal place.",
    hints: ["Energy (kWh) = power (kW) × hours.", "Subtract the LED value from the old bulb value."],
    value: saveKwh, wrong: [87.6, 13.1],
    explanation: "Old bulb: 0.060 × 4 × 365 = 87.6 kWh. LED: 0.009 × 4 × 365 = 13.14 kWh. Saving = 87.6 − 13.14 = 74.46, which is **74.5 kWh**." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the organisation of oil-exporting countries that sets production quotas to influence the price of oil. Give its acronym or full name.",
    accepted: ["OPEC", "Organization of the Petroleum Exporting Countries", "Organisation of the Petroleum Exporting Countries"], wrong: ["IAEA"],
    explanation: "**OPEC**." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the South African state-owned company that generates most of the country's electricity.",
    accepted: ["Eskom", "ESKOM"], wrong: ["ZESA"],
    explanation: "**Eskom**." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why intermittency is a challenge for a grid that relies on wind and solar power.",
    hints: ["Link the weather to supply and demand."],
    points: [
      "Wind and solar output depends on weather and time of day, so it varies.",
      "Demand does not follow the same pattern, for example the evening peak when there is no sunshine.",
      "Therefore storage, flexible back-up or links to other grids are needed to keep supply reliable, which adds cost.",
    ],
    modelAnswer: "Wind and solar output depends on weather and time of day. Demand does not match this, for example the evening peak after sunset. Storage, flexible back-up or links to other grids are therefore needed to keep supply reliable, which adds cost.",
    explanation: "Variable supply versus steady demand." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain two national factors that affect a country's balance of energy sources.",
    hints: ["Choose two from resources, income, policy, technology and geography."],
    points: [
      "Resources: countries use sources they have, such as coal in South Africa or hydro in Norway.",
      "Explains why: using local resources is usually cheapest and gives energy security.",
      "Income and investment: rich countries can afford expensive new technology such as offshore wind.",
      "Explains why: poorer countries often choose the cheapest option, such as coal, or rely on traditional fuels.",
    ],
    modelAnswer: "Resources matter because countries use what they have, such as coal in South Africa and hydro in Norway, which is cheapest and improves energy security. Income also matters because rich countries can afford new technology such as offshore wind, while poorer countries often choose the cheapest option or rely on traditional fuels.",
    explanation: "Two factors, each with a reason." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: `Illustrative electricity mix of Country Y:\n\n${MIXY}\n\nDescribe the changes in the mix between 2010 and 2023.`,
    hints: ["Quote the change in each source."],
    points: [
      "Coal fell from 80% to 60%, a fall of 20 percentage points, but is still the largest source.",
      "Wind and solar rose from 5% to 20%, four times their earlier share.",
      "Gas rose from 10% to 15%.",
      "Nuclear stayed unchanged at 5%.",
    ],
    modelAnswer: "Coal fell from 80% to 60% (20 percentage points) but remained the largest source. Wind and solar rose from 5% to 20%, four times the earlier share, and gas rose from 10% to 15%. Nuclear stayed at 5%.",
    explanation: "Describe each source with the figures." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: `Illustrative electricity mix of Country Y (data invented for this exercise):\n\n${MIXY}`,
    hints: ["Subtract for a change in percentage points.", "Use the 2010 value as the base for a percentage increase."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the fall in the share of coal between 2010 and 2023, in percentage points.", value: coalFall, wrong: [25, 75],
        explanation: "80 − 60 = 20 percentage points." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the percentage increase in the share of gas between 2010 and 2023.", value: gasRise, unit: "%", wrong: [5, 33],
        explanation: "(15 − 10) ÷ 10 × 100 = 50%." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which statement is supported by the table?", options: [
        ["Coal still supplies more than half of the electricity in 2023", "Correct: 60% is more than half."],
        ["Wind and solar supply the largest share in 2023", "They supply 20%, less than coal at 60%."],
        ["The share of nuclear power has doubled", "Nuclear stayed at 5%."],
        ["Fossil fuels have been completely replaced", "Coal and gas still supply 75%."],
      ], answer: "A", explanation: "Coal is 60% in 2023." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why the share of coal has fallen only slowly in Country Y.",
        points: [
          "Existing coal power stations are costly to build and have long working lives, so owners keep using them.",
          "Coal mining provides jobs and income in some regions, so governments move cautiously.",
          "Wind and solar need grid upgrades and storage, which take time and investment.",
        ],
        modelAnswer: "Existing coal power stations are costly and have long working lives, so owners keep using them. Coal mining provides jobs and income, so governments move cautiously, and wind and solar need grid upgrades and storage, which take time and investment.",
        explanation: "Existing plant, jobs and grid limits." }),
    ], explanation: "Interpret a changing energy mix and explain the pace of change." });

  b.struct({ d: 3, skill: "ANALYSIS",
    stem: "A household replaces a 60 W bulb with a 9 W LED bulb. Each is used for 4 hours a day for 365 days, and electricity costs US\\$0.10 per kWh (illustrative).",
    hints: ["Energy (kWh) = power (kW) × hours × days."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the electricity used by the 60 W bulb in a year, in kWh.", value: oldKwh, dp: 1, unit: "kWh", wrong: [0.06, 21900],
        explanation: "0.060 × 4 × 365 = 87.6 kWh." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the money saved per year by using the LED instead, in US\\$ to the nearest cent.", value: saveUsd, dp: 2, unit: "US$", wrong: [8.76, 1.31],
        explanation: "Saving = 74.46 kWh × US\\$0.10 = US\\$7.45." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest two other ways a household could use energy more sustainably.",
        points: [
          "Use a solar water heater or solar lamps to replace electricity or paraffin.",
          "Use an efficient stove or biogas for cooking, insulate the home and switch off unused appliances.",
        ],
        modelAnswer: "Fit a solar water heater or solar lamps to replace electricity or paraffin, and use an efficient stove or biogas for cooking while switching off unused appliances.",
        explanation: "Renewable sources, efficiency and conservation." }),
    ], explanation: "Calculate savings from efficiency and suggest further actions." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the extent to which increasing the use of renewable energy can improve a country's energy security.",
    hints: ["Give ways renewables help and ways they do not.", "Reach a judgement."],
    points: [
      "Domestic renewable sources reduce imports of fuel and exposure to price shocks and supply cut-offs.",
      "Renewables diversify the energy mix, so failure of one source matters less.",
      "Fuel is free after construction, which stabilises long-term costs.",
      "Solar and wind are intermittent and need storage or back-up, so security can fall if the grid is not prepared.",
      "Hydro depends on rainfall and can fail in drought, as at Kariba.",
      "Some technologies depend on imported equipment and minerals, creating new dependencies.",
      "Efficiency and conservation also improve security by reducing demand.",
      "Judgement: renewables improve security substantially when combined with storage, grid investment and efficiency, but they do not remove all risk.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Domestic renewable energy reduces imports of fuel and exposure to price shocks and supply cut-offs, diversifies the mix and, once built, has no fuel cost. However, solar and wind are intermittent and need storage and back-up, hydro can fail in drought as at Kariba, and some equipment and minerals are imported, which creates new dependencies. Efficiency and conservation also improve security by reducing demand. I conclude that renewables improve energy security considerably when combined with storage, grid investment and efficiency, but they do not remove all risk.",
    wordLimit: { max: 300 }, explanation: "Weigh benefits and limits of renewables for security and judge." });

  b.card("DEFINITION", "Energy transition", "The shift from a fossil-fuel based energy system to low-carbon sources with more efficient use of energy.");
  b.card("CONCEPT", "Challenges of the transition", "Scale, intermittency and storage, grid connection, hard-to-change sectors, cost and finance, materials, and politics.");
  b.card("CONCEPT", "National factors in the energy mix", "Resources, climate and geography, income and investment, policy, technology, and security concerns.");
  b.card("DEFINITION", "Efficiency versus conservation", "Efficiency: the same service from less energy (LED lamps). Conservation: using less by changing behaviour (switching off).");
  b.card("FACT", "OPEC", "Organization of the Petroleum Exporting Countries, founded in 1960; coordinates production quotas to influence oil prices.");
  b.card("FACT", "IAEA", "International Atomic Energy Agency, part of the UN system; inspects nuclear facilities under safeguards to prevent weapons use.");
  b.card("CONCEPT", "Norway's electricity", "About nine-tenths hydro (rivers, rain and mountains) plus growing wind; low-carbon and exported.");
  b.card("CONCEPT", "South Africa's electricity", "Mostly coal (abundant, built by Eskom), some nuclear and growing wind and solar; ageing plant causes load-shedding.");
  b.card("FORMULA", "Energy self-sufficiency", "Self-sufficiency (%) = energy production ÷ energy consumption × 100; import dependence = 100 − self-sufficiency.");
});
