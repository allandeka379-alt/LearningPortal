// W2b: energy.sources-patterns (both boards; items suit both unless tagged).
// Computed: fossil share P 80, R 95; renewable share Q 96, P 12; demand +50%; fossil use 82 -> 120 units (+38); households: wood 340/500 = 68%,
// wood+charcoal 400/500 = 80%.
import { concept, P, geographyLevels, chk, rnd, sum } from "../lib.mjs";
import { mc, tbl } from "../tables/w2b-_q.mjs";

const ROWS = [["Coal", 70, 0, 0], ["Gas", 10, 4, 55], ["Oil", 0, 0, 40], ["Nuclear", 8, 0, 0], ["Hydro", 6, 88, 0], ["Wind, solar and biomass", 6, 8, 5]];
for (const c of [1, 2, 3]) chk(sum(ROWS.map((r) => r[c])), 100);
const MIX = tbl(["Source", "Country P (%)", "Country Q (%)", "Country R (%)"], ROWS);
const fossP = chk(70 + 10 + 0, 80);
const fossR = chk(0 + 55 + 40, 95);
const renQ = chk(88 + 8, 96);
const renP = chk(6 + 6, 12);
const rise = chk(((150 - 100) / 100) * 100, 50);
const fossUnits2020 = chk(0.8 * 150, 120, 1e-9);
const fossUnits2000 = chk(0.82 * 100, 82, 1e-9);
const fossInc = chk(fossUnits2020 - fossUnits2000, 38, 1e-9);

const HH = [["Fuelwood", 340], ["Charcoal", 60], ["Electricity", 70], ["Bottled gas (LPG)", 30]];
chk(sum(HH.map((h) => h[1])), 500);
const HTAB = tbl(["Main cooking fuel", "Households (out of 500)"], HH);
const woodPct = chk((340 / 500) * 100, 68);
const woodCharPct = chk(((340 + 60) / 500) * 100, 80);
const cleanPct = chk(((70 + 30) / 500) * 100, 20);

concept("ageo.energy.sources-patterns", { file: "energy/sources-patterns", keyPrefix: "energy.sources-patterns" }, (b) => {
  mc(b, 1, "RECALL", "Which of these energy sources is **non-renewable**?", [
    ["Uranium used in nuclear power stations", "Correct: uranium is a finite resource."],
    ["Solar radiation collected by panels", "Solar energy is renewable."],
    ["Flowing water used in hydroelectric dams", "Water power is renewable."],
    ["Heat from the Earth's interior used for geothermal power", "Geothermal energy is renewable on a human timescale."],
  ], "**Uranium** is finite, so nuclear power is non-renewable.");
  mc(b, 2, "UNDERSTANDING", "Why is wind power described as **intermittent**?", [
    ["It generates only when the wind blows", "Correct: output varies with wind speed."],
    ["It runs out when the stocks of wind are used up", "Wind does not run out."],
    ["It can only be used in countries with coal reserves", "Wind power does not depend on coal."],
    ["It produces carbon dioxide only at night", "Wind turbines do not emit carbon dioxide when operating."],
  ], "**Intermittent** means output varies with the weather, so storage or back-up is needed.");
  mc(b, 2, "UNDERSTANDING", "Which is a disadvantage of hydroelectric power?", [
    ["Dams flood land, displace people and depend on reliable rainfall", "Correct: reservoirs have social and environmental costs."],
    ["It releases large quantities of sulphur dioxide", "Hydro does not burn fuel."],
    ["It needs a continuous supply of uranium", "Uranium is for nuclear power."],
    ["It produces radioactive waste that must be stored", "That is a nuclear problem."],
  ], "Hydro schemes **flood land and depend on rainfall**, as drought showed at Kariba.");
  mc(b, 2, "UNDERSTANDING", "Why do many households in low-income countries still depend on wood and charcoal?", [
    ["They are cheap and local while cleaner fuels cost more", "Correct: cost and availability drive the choice."],
    ["Wood is a more efficient fuel than gas or electricity", "Wood burns less efficiently."],
    ["Wood produces no smoke when burnt indoors", "Wood smoke harms health."],
    ["Wood and charcoal are banned in cities", "They are widely used in cities too."],
  ], "People use **cheap, local** fuels when electricity and gas are costly or unavailable.");
  mc(b, 3, "APPLICATION", "A country has little oil but depends on imports for most of its transport fuel. Which risk does it face?", [
    ["Price rises and supply disruption outside its control", "Correct: this is energy insecurity."],
    ["Wasting its own large reserves too quickly", "It has few reserves of its own."],
    ["Becoming wealthy from export of oil", "It is an importer, not an exporter."],
    ["Excess oil in the market lowering all domestic prices", "Dependence on imports exposes it to price rises."],
  ], "Import dependence means **price and supply risks**.", { hints: ["Think about who controls the supply and the price."] });
  mc(b, 3, "ANALYSIS", "Which is the best reason why fossil fuels still supply most of the world's energy although renewables are growing fast?", [
    ["Demand has grown so quickly that renewables have been added alongside fossil fuels", "Correct: fossil use also rose in absolute terms."],
    ["Renewables have been banned in most large countries", "Renewables are expanding rapidly in most countries."],
    ["Fossil fuels are renewable on a human timescale", "Fossil fuels are non-renewable."],
    ["No country has built a wind farm or solar plant", "Many large installations exist."],
  ], "Growth in demand means that **both** fossil and renewable use are rising.", { hints: ["Think about absolute amounts as well as shares."] });
  b.tf({ d: 1, skill: "RECALL", stem: "Natural gas burns more cleanly than coal because it produces less carbon dioxide per unit of energy.", answer: true,
    feedbackTrue: "Correct: gas has lower emissions per unit of energy than coal.",
    feedbackFalse: "Not so: gas emits less carbon dioxide than coal for the same energy.",
    explanation: "Gas is the cleanest fossil fuel, though it still emits carbon dioxide." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Nuclear power is a renewable source of energy.", answer: false,
    feedbackFalse: "Correct: uranium is a finite resource, so nuclear power is non-renewable.",
    feedbackTrue: "Not so: uranium is finite.",
    explanation: "Nuclear power is low in carbon emissions but is **non-renewable**." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "Reliable access to enough energy at an affordable price is called energy {{blank:a}}. The proportion of energy from each source is the energy {{blank:b}}. Energy from the Earth's heat is {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["security"], choices: ["security", "efficiency", "conservation"] },
      { id: "b", accepted: ["mix"], choices: ["mix", "budget", "balance"] },
      { id: "c", accepted: ["geothermal"], choices: ["geothermal", "tidal", "biomass"] },
    ], explanation: "Energy security, energy mix and geothermal energy." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each country or region to its major energy resource.",
    pairs: [
      ["Kazakhstan", "The world's largest producer of uranium"],
      ["Qatar", "Very large reserves of natural gas"],
      ["Hwange (Zimbabwe)", "Coal used for electricity generation"],
      ["The Middle East", "The largest proven reserves of oil"],
    ], explanation: "Each is known for a major resource." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, unit: "%",
    stem: `Illustrative electricity generation in three countries:\n\n${MIX}\n\nCalculate the percentage of Country P's electricity generated from fossil fuels (coal, gas and oil).`,
    hints: ["Add the coal, gas and oil rows for Country P."],
    value: fossP, wrong: [70, 94],
    explanation: "70 + 10 + 0 = **80%**. The value 70 is coal alone." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: `Use the table:\n\n${MIX}\n\nCalculate the percentage of Country Q's electricity that comes from renewable sources (hydro, wind, solar and biomass).`,
    hints: ["Add the hydro row and the wind, solar and biomass row."],
    value: renQ, wrong: [88, 4],
    explanation: "88 + 8 = **96%**. The value 88 is hydro alone." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "Illustrative world energy use rose from an index of 100 in 2000 to 150 in 2020. Calculate the percentage increase.",
    hints: ["Find the rise, then divide by the starting value."],
    value: rise, wrong: [150, 33],
    explanation: "(150 − 100) ÷ 100 × 100 = **50%**. Dividing by 150 gives 33%, the wrong base." });
  b.calc({ d: 4, skill: "ANALYSIS", calculator: true,
    stem: "Illustrative world energy use was 100 units in 2000, of which 82% came from fossil fuels. By 2020 it was 150 units, of which 80% came from fossil fuels. By how many units did fossil fuel use increase?",
    hints: ["Find the units from fossil fuels in each year.", "Subtract."],
    value: fossInc, wrong: [-2, 120],
    explanation: "1. 2000: 82% of 100 = 82 units.\n2. 2020: 80% of 150 = 120 units.\n3. Increase = 120 − 82 = **38 units**, even though the percentage share fell by 2 points." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the country that is the world's largest producer of uranium.",
    accepted: ["Kazakhstan"], wrong: ["Namibia"],
    explanation: "**Kazakhstan**." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the narrow sea passage in the Gulf region through which a large share of the world's oil exports passes.",
    accepted: ["Strait of Hormuz", "Hormuz", "the Strait of Hormuz", "Straits of Hormuz"], wrong: ["Suez canal"],
    explanation: "The **Strait of Hormuz**." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the global distribution of coal reserves.",
    hints: ["Name countries and say where the largest users are."],
    points: [
      "Coal reserves are very large in the United States, Russia, Australia, China and India.",
      "They are found in many countries on all continents, including southern Africa (for example Hwange in Zimbabwe).",
      "China and India are also the largest consumers, so production and use are concentrated in Asia.",
    ],
    modelAnswer: "The largest coal reserves are in the United States, Russia, Australia, China and India, but coal is found on every continent, including southern Africa (for example Hwange in Zimbabwe). China and India are also the largest consumers, so use is concentrated in Asia.",
    explanation: "Name the main holders and the pattern of use." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain two problems for a country that depends on imported oil.",
    hints: ["Give the problem and the reason."],
    points: [
      "Price shocks: world prices change quickly, so transport and food costs rise.",
      "Explains why: the country has no control over the price set by producers and the world market.",
      "Supply disruption: conflict or blocked routes can cut supplies.",
      "Explains why: it depends on long supply lines through narrow shipping routes and on a few suppliers.",
    ],
    modelAnswer: "Price shocks raise transport and food costs because the country has no control over the world price. Supplies can be cut by conflict or blocked routes, because the country relies on long supply lines and a few suppliers.",
    explanation: "Price risk and supply risk, each with a reason." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: `Illustrative electricity generation in three countries:\n\n${MIX}\n\nCompare the electricity mixes of Country P and Country Q.`,
    hints: ["Quote the largest source in each country.", "Include a fossil and a renewable comparison."],
    points: [
      "P depends on coal (70%), whereas Q uses no coal.",
      "Q depends on hydro (88%), whereas P gets only 6% from hydro.",
      "Fossil fuels supply 80% of P's electricity but only 4% of Q's.",
      "Renewables supply 12% in P compared with 96% in Q; P also has nuclear power (8%) and Q none.",
    ],
    modelAnswer: "P depends on coal (70%) while Q uses none. Q depends on hydro (88%) while P gets only 6% from hydro. Fossil fuels supply 80% of P's electricity but only 4% of Q's, and renewables supply 12% in P compared with 96% in Q. P also has nuclear power (8%).",
    explanation: "Compare like with like and quote figures." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: `Illustrative electricity generation in three countries (data invented for this exercise):\n\n${MIX}`,
    hints: ["Add the relevant rows.", "Link the mix to resources."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage of Country R's electricity from fossil fuels.", value: fossR, unit: "%", wrong: [55, 40],
        explanation: "55 + 40 = 95%." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the percentage of Country P's electricity from renewable sources (hydro, wind, solar and biomass).", value: renP, unit: "%", wrong: [6, 8],
        explanation: "6 + 6 = 12%." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which country is most likely to be an exporter of oil and gas?", options: [
        ["Country R", "Correct: 95% of its electricity comes from gas and oil."],
        ["Country P", "P depends on coal."],
        ["Country Q", "Q depends on hydro."],
        ["None of them can be judged from the table", "The mix suggests R has plentiful oil and gas."],
      ], answer: "A", explanation: "A country with abundant oil and gas uses it for power." }),
      P.manual({ label: "(d)", marks: 3, stem: "Suggest reasons why Country Q generates most of its electricity from hydro.",
        points: [
          "It probably has rivers with high flow and steep relief that are suitable for dams.",
          "Once built, hydro has low running costs and no fuel to import.",
          "Government policy and investment have favoured low-carbon electricity, and it has few fossil fuel resources.",
        ],
        modelAnswer: "Q probably has rivers with high flow and steep relief suited to dams. Once built, hydro has low running costs and needs no imported fuel, and government investment may have favoured low-carbon electricity because it has few fossil fuels.",
        explanation: "Resources, costs and policy." }),
    ], explanation: "Interpret an energy mix and link it to resources." });

  b.struct({ d: 3, skill: "ANALYSIS",
    stem: `A survey of 500 households in an urban area recorded the main cooking fuel (illustrative data, invented for this exercise).\n\n${HTAB}`,
    hints: ["Percentage = households ÷ 500 × 100."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage of households that mainly use fuelwood.", value: woodPct, unit: "%", wrong: [34, 340],
        explanation: "340 ÷ 500 × 100 = 68%." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the percentage of households that mainly use wood or charcoal.", value: woodCharPct, unit: "%", wrong: [12, 68],
        explanation: "(340 + 60) ÷ 500 × 100 = 80%." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain one health problem and one environmental problem caused by heavy use of fuelwood.",
        points: [
          "Health: smoke from burning wood indoors causes breathing problems and eye irritation.",
          "Environment: cutting trees for fuel causes deforestation, soil erosion and loss of habitat.",
        ],
        modelAnswer: "Smoke from burning wood indoors causes breathing problems and eye irritation. Cutting trees for fuel leads to deforestation, soil erosion and loss of habitat.",
        explanation: "One problem for people and one for the environment." }),
    ], explanation: "Use survey data to find fuel use and explain the problems." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the effects of the unequal global distribution of energy resources on exporting and importing countries.",
    hints: ["Give benefits and problems for exporters, then for importers.", "End with a judgement."],
    points: [
      "Exporters such as Saudi Arabia, Qatar and Kazakhstan earn large export incomes that can fund development and infrastructure.",
      "Dependence on one resource leaves exporters exposed to falling prices and can discourage other sectors (the resource curse).",
      "Wealth from resources is often unevenly shared and may add to political tension.",
      "Importers face price shocks and supply risks, and spend large amounts on energy imports.",
      "Narrow shipping routes and conflicts make supply vulnerable.",
      "Importers respond by diversifying suppliers, building storage and developing nuclear and renewable energy.",
      "Low-income importers are hit hardest because they have less money to buy fuel or to invest in alternatives.",
      "Judgement: unequal distribution benefits some exporters but creates risks for most, and the greatest burden falls on poor importing countries.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Exporters such as Saudi Arabia, Qatar and Kazakhstan earn large incomes that can fund development, but depending on one resource leaves them exposed to falling prices and can discourage other sectors, and the wealth is often unevenly shared. Importers face price shocks and supply risks, particularly where oil passes through narrow routes such as the Strait of Hormuz, and they spend large sums on imports. They respond by diversifying suppliers, building stores and developing nuclear and renewable energy. Poor importing countries are hit hardest because they have less money to buy fuel or invest in alternatives. I conclude that unequal distribution benefits some exporters but creates risks for most, with the greatest burden on poor importers.",
    wordLimit: { max: 300 }, explanation: "Weigh exporter and importer effects and judge." });

  b.card("DEFINITION", "Renewable and non-renewable energy", "Renewable: replaced naturally (solar, wind, hydro, geothermal, tidal, biomass). Non-renewable: finite (coal, oil, gas, uranium).");
  b.card("DEFINITION", "Energy security", "Reliable access to enough energy at an affordable price, now and in future.");
  b.card("FACT", "Oil reserves", "The largest proven reserves are in the Middle East, with others in Venezuela, Canada, Russia and Nigeria.");
  b.card("FACT", "Uranium producers", "Kazakhstan is the largest producer, followed by Canada, Namibia and Australia.");
  b.card("FACT", "Coal reserves", "Very large in the United States, Russia, Australia, China and India; Zimbabwe's coal is at Hwange.");
  b.card("CONCEPT", "Issues of intermittent sources", "Wind and solar output varies with weather, so storage, back-up and grid links are needed.");
  b.card("CONCEPT", "Effects of unequal energy supply", "Exporters gain income but risk dependence; importers face price and supply risks and diversify.");
  b.card("CONCEPT", "Domestic fuels", "Wood, charcoal and dung are cheap and local but cause indoor smoke, deforestation and time spent collecting.");
  b.card("CONCEPT", "Global energy trends", "Demand is rising, especially in Asia; fossil fuels supply roughly four-fifths; solar and wind are growing fastest.");
});
