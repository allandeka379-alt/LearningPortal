// W2b exam rows (Cambridge), topic 12 (Environmental issues and management, Paper 4): CAM_STRUCT10 x 2 (energy supplies; urban pollution)
// and CAM_ESSAY20 x 2 (energy security in two contrasting countries; rural degradation and sustainable practice).
// Resource data are invented for this exercise (labelled in the stems); every number is computed in code.
import { concept, P, chk, rnd, checkExam, EXAM, geographyLevels, CAM } from "../lib.mjs";
import { tbl } from "../tables/w2b-_q.mjs";

const BASE = (plan) => ({ d: 4, skill: plan.skill, secs: plan.secs, examStyle: true, paper: "Paper 4", applies: plan.applies });

// ---- Struct 10 #1: electricity generation, Country K (12.1)
const G2000 = { coal: 120, gas: 40, hydro: 30, ws: 2, other: 8 };
const G2020 = { coal: 70, gas: 80, hydro: 32, ws: 48, other: 10 };
const tot2000 = chk(Object.values(G2000).reduce((a, b) => a + b, 0), 200);
const tot2020 = chk(Object.values(G2020).reduce((a, b) => a + b, 0), 240);
const wsShare = chk((G2020.ws / tot2020) * 100, 20, 1e-9);
const GEN = tbl(["Source", "2000 (TWh)", "2020 (TWh)"], [
  ["Coal", G2000.coal, G2020.coal], ["Gas", G2000.gas, G2020.gas], ["Hydropower", G2000.hydro, G2020.hydro],
  ["Wind and solar", G2000.ws, G2020.ws], ["Other", G2000.other, G2020.other], ["Total", tot2000, tot2020],
]);

// ---- Struct 10 #2: urban air pollution, City Q (12.3)
const PM = { 2010: 60, 2015: 72, 2020: 66 };
const pmRise = chk(((PM[2015] - PM[2010]) / PM[2010]) * 100, 20, 1e-9);
const pmTimes = chk(PM[2020] / 5, 13.2, 1e-9);
const SRC = [["Road transport", 38], ["Burning of wood and charcoal in homes", 30], ["Industry and power", 22], ["Construction dust", 10]];
chk(SRC.reduce((a, s) => a + s[1], 0), 100);
const PMT = tbl(["Year", "Annual mean PM2.5 (µg/m³)"], Object.entries(PM));
const SRT = tbl(["Source of PM2.5 in City Q", "Share of the total (%)"], SRC);

concept("ageo.energy.transition-security", { file: "exam/w2b-cambridge", keyPrefix: "exam.w2b-cambridge", applies: CAM }, (b) => {
  // ============================================================ CAM_STRUCT10 #1: energy supplies
  b.struct({
    ...BASE(EXAM.CAM_STRUCT10),
    concepts: ["ageo.energy.sources-patterns", "ageo.energy.transition-security"],
    hints: ["Share = source ÷ total × 100.", "In (c) think of resources, income, policy and the grid."],
    stem: `Insert, Table 1 shows electricity generation in Country K (data invented for this exercise).\n\n${GEN}`,
    parts: checkExam(EXAM.CAM_STRUCT10, [
      P.group({
        label: "(a)", stem: "Use Table 1.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the percentage of the electricity generated in 2020 that came from wind and solar.", value: wsShare, unit: "%", wrong: [48, 2.4],
            explanation: "48 ÷ 240 × 100 = 20%. Giving 48 is the amount, not the share." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which source showed the largest fall in output between 2000 and 2020?", options: [
            ["Coal", "Correct: down by 50 TWh."],
            ["Gas", "Gas output doubled."],
            ["Hydropower", "Hydropower rose slightly."],
            ["Wind and solar", "Wind and solar grew rapidly."],
          ], answer: "A", explanation: "Coal fell from 120 to 70 TWh." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Challenges of the transition.",
        parts: [
          P.mcq({ label: "(i)", marks: 1, stem: "Which is a major challenge in relying on wind and solar power?", options: [
            ["Output varies with the weather and time of day", "Correct: it is intermittent and needs backup or storage."],
            ["They emit large amounts of carbon dioxide when working", "They emit none when generating."],
            ["They can only be built close to coal mines", "They are located where the wind and sun are best."],
            ["They need a constant supply of imported fuel", "They have no fuel."],
          ], answer: "A", explanation: "Intermittency is a main challenge of wind and solar power." }),
          P.manual({ label: "(ii)", marks: 2, stem: "Explain why a country cannot switch quickly from coal to renewable energy.",
            points: [
              "Power stations, mines and grids are costly and long-lived, so closing them early wastes investment and puts jobs at risk.",
              "The grid must be rebuilt and storage added to cope with variable supply, which takes time and money.",
            ],
            modelAnswer: "Coal power stations and mines are costly and long-lived, so early closure wastes investment and jobs. The grid must be rebuilt and storage added to cope with variable supply, which takes time and money.",
            explanation: "Sunk costs and the need for new grids and storage slow the change." }),
        ],
      }),
      P.manual({ label: "(c)", marks: 4, type: "SHORT_ANSWER", stem: "Suggest how national factors could explain the changes in electricity generation in Country K between 2000 and 2020.",
        points: [
          "Government policy, such as subsidies, targets or carbon prices, encouraged wind and solar and discouraged coal.",
          "Falling costs of wind and solar equipment and good wind and sunshine resources made them competitive.",
          "Natural gas became available (home supply or imports) and is quicker to build and cleaner than coal, so its output doubled.",
          "Higher income allowed investment in new plants and the grid, and public concern over pollution and climate change reduced support for coal.",
        ],
        modelAnswer: "Government policy such as subsidies and targets encouraged wind and solar. Falling equipment costs and good wind and sunshine made them competitive. Gas supplies became available and gas plants are cleaner and quicker to build than coal, and higher incomes allowed investment in new plants and the grid while public concern about pollution reduced support for coal.",
        explanation: "Policy, resources, cost, income and public attitudes all affect the mix." }),
    ]),
    explanation: "Interpret a table of electricity generation, explain challenges of the transition and suggest national factors.",
  });

  // ============================================================ CAM_STRUCT10 #2: urban air pollution
  b.struct({
    ...BASE(EXAM.CAM_STRUCT10),
    concepts: ["ageo.env.pollution"],
    hints: ["Percentage increase = (new − old) ÷ old × 100.", "In (c) match each measure to a source in Table 2."],
    stem: `Insert, Tables 1 and 2 show fine particle pollution (PM2.5) in City Q (data invented for this exercise).\n\n${PMT}\n\n${SRT}`,
    parts: checkExam(EXAM.CAM_STRUCT10, [
      P.group({
        label: "(a)", stem: "Use the tables.",
        parts: [
          P.mcq({ label: "(i)", marks: 1, stem: "Which source contributes the largest share of PM2.5?", options: [
            ["Road transport", "Correct: 38% of the total."],
            ["Burning of wood and charcoal in homes", "This contributes 30%."],
            ["Industry and power", "This contributes 22%."],
            ["Construction dust", "This contributes 10%."],
          ], answer: "A", explanation: "Road transport has the highest share, 38%." }),
          P.num({ label: "(ii)", marks: 2, stem: "Calculate the percentage increase in PM2.5 between 2010 and 2015.", value: pmRise, unit: "%", wrong: [12, 16.7],
            explanation: "(72 − 60) ÷ 60 × 100 = 20%. Giving 12 is the increase in µg/m³; 16.7 divides by the new value." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Health effects.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "The World Health Organization guideline for the annual mean is 5 µg/m³. How many times greater was the 2020 value than the guideline?", value: pmTimes, dp: 1, unit: "times", wrong: [61, 0.076],
            explanation: "66 ÷ 5 = 13.2 times." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Why are fine particles (PM2.5) especially harmful?", options: [
            ["They are small enough to be breathed deep into the lungs and enter the blood", "Correct: they cause heart and lung disease."],
            ["They are too large to enter the body", "PM2.5 is very small."],
            ["They only damage buildings, not people", "They also harm health."],
            ["They disappear after a few seconds", "They stay in the air for days."],
          ], answer: "A", explanation: "Fine particles penetrate deep into the lungs." }),
        ],
      }),
      P.manual({ label: "(c)", marks: 4, stem: "Suggest and justify two measures that would reduce PM2.5 in City Q.",
        points: [
          "Improve public transport, limit older vehicles or introduce low-emission zones, because road transport is the largest source (38%).",
          "Explain how it works: fewer private vehicles and cleaner engines reduce exhaust and dust from the roads.",
          "Provide clean cooking fuels, such as LPG, electricity or improved stoves, because home burning of wood and charcoal is a large share (30%).",
          "Explain how it works: clean fuels produce much less smoke, and improved stoves burn more completely and cut particle output.",
        ],
        modelAnswer: "Improve public transport and set low-emission zones or standards for older vehicles, because road transport gives the largest share (38%); fewer private vehicles and cleaner engines cut exhaust and road dust. Provide clean cooking fuels or improved stoves, because home burning of wood and charcoal gives 30%; these produce much less smoke.",
        explanation: "Match measures to the largest sources and justify with the mechanism." }),
    ]),
    explanation: "Interpret pollution data, calculate change, relate to health and suggest management.",
  });

  // ============================================================ CAM_ESSAY20 #1: energy security in two countries
  b.ext({
    ...BASE(EXAM.CAM_ESSAY20), marks: 20, skill: "EVALUATION",
    concepts: ["ageo.energy.transition-security", "ageo.energy.sources-patterns"],
    hints: ["Choose two contrasting countries and give dated, factual detail on each.", "Compare resources, policy and security, then reach a judgement."],
    stem: "Using detailed specific examples of two contrasting countries, assess the extent to which a country's energy resources determine the security of its electricity supply.",
    points: [
      "Defines energy security: reliable, affordable and sustainable supply of energy; and names the two countries (here Norway and South Africa).",
      "Norway: almost all of its electricity comes from hydropower (around 90% in most years), supported by mountains, heavy rainfall and snowmelt.",
      "Norway: reservoirs store water for months, so output can be adjusted to demand, which gives high reliability and very low carbon emissions.",
      "Norway: interconnectors with neighbouring countries allow it to export surplus and import in dry years, which adds security.",
      "Norway: income from oil and gas (invested abroad through a state fund) allowed investment in a modern grid and low-carbon transport.",
      "Norway's weakness: dependence on rainfall and snow; prices rise in dry years and exports may link prices to Europe's market.",
      "South Africa: coal supplies more than three-quarters of electricity, using large domestic coal reserves, so there is no dependence on imported fuel.",
      "South Africa: Eskom, the state utility, has an ageing coal fleet; planned maintenance and breakdowns caused rotating power cuts (load shedding) from 2007–08, and they became severe in 2022–23.",
      "South Africa: the new coal stations Medupi and Kusile were delayed and over budget, which shows that resources alone do not secure supply.",
      "South Africa: coal gives high carbon emissions per person, and is vulnerable to rail and mining problems.",
      "South Africa: the Renewable Energy Independent Power Producer Procurement Programme (started in 2011) has added wind and solar, and the country has Africa's only commercial nuclear station at Koeberg.",
      "South Africa: the Just Energy Transition Partnership (agreed in 2021) offers international finance for a move from coal, but the transition is slow and affects mining communities.",
      "Resources are important, because they decide the cheapest and most abundant source and reduce import dependence.",
      "But management and investment also matter: Norway's grid and storage versus South Africa's maintenance problems.",
      "Income and policy decide the capacity to invest: Norway's high income versus South Africa's competing demands for money.",
      "Technology and interconnection (Norway's links) reduce risk where a single resource fails.",
      "Environmental security: Norway's low emissions versus South Africa's coal emissions, which are a long-term risk under climate policy.",
      "Time scale: resource-rich countries may be secure in the short term but vulnerable in the long term as policy and prices change.",
      "Diversification (hydro, wind, nuclear, imports) improves security in both cases.",
      "Judgement: resources are a strong foundation, but security depends equally on investment, maintenance, interconnection and policy, so resources are important but not the only determinant.",
    ],
    levels: geographyLevels(20), wordLimit: { min: 600, max: 800 },
    modelAnswer: "Energy security means a reliable, affordable and sustainable supply of energy. A country's resources are an important foundation of electricity security, but I argue that they do not determine it on their own. I compare Norway and South Africa.\n\nNorway gets almost all of its electricity, around 90% in most years, from hydropower. Its mountains, heavy rainfall and snowmelt supply the water, and reservoirs store it for months, so output can be adjusted to demand. This makes supply reliable and gives very low carbon emissions. Income from oil and gas, invested through a state fund, helped to pay for a modern grid and interconnectors with neighbouring countries, which allow Norway to export surplus power and to import in dry years. Its security is therefore based on resources, but also on storage, the grid and income. Its weakness is dependence on rain and snow, because dry years raise prices, and the links to European markets can transfer high prices to Norwegian consumers.\n\nSouth Africa has large domestic coal reserves and more than three-quarters of its electricity comes from coal, so it does not depend on imported fuel. In spite of this, supply has been insecure. The state utility Eskom has an ageing coal fleet, and breakdowns and maintenance problems caused rotating power cuts, known as load shedding, from 2007–08 which became severe in 2022–23. The new coal stations at Medupi and Kusile were delayed and cost more than planned. This shows that having a resource does not secure supply without investment, maintenance and management. Coal also gives high emissions per person, and the supply chain depends on rail and mining. The Renewable Energy Independent Power Producer Procurement Programme, started in 2011, has added wind and solar, the country has Africa's only commercial nuclear station at Koeberg, and in 2021 the Just Energy Transition Partnership offered international finance for a move from coal. However, the change is slow and affects mining communities.\n\nThe comparison shows that resources are important. They decide the cheapest and most abundant source and reduce dependence on imports, as in both countries. But the contrast between secure Norway and insecure South Africa, though both are rich in resources, shows that management, investment, grid quality, income and interconnection are as important. Norway's high income and its links to other countries reduce the risk of failure; South Africa has competing demands for money and no strong interconnection to cover shortages. Environmental policy also affects long-term security because coal-based systems face pressure to change. Diversification improves security in both cases.\n\nIn conclusion, resources are a strong foundation but not the only determinant of security. Investment, maintenance, storage, interconnection and policy decide whether the resource is turned into a reliable supply, so the extent to which resources determine security is limited.",
    explanation: "Compare two real countries, show that resources interact with management and investment, and judge.",
  });

  // ============================================================ CAM_ESSAY20 #2: rural degradation and sustainable practice
  b.ext({
    ...BASE(EXAM.CAM_ESSAY20), marks: 20, skill: "EVALUATION",
    concepts: ["ageo.env.degradation"],
    hints: ["Use one rural area (here the Aral Sea basin) with dates and causes.", "Weigh what has been restored and what could not be."],
    stem: "Using a detailed specific example of one rural area, evaluate the extent to which sustainable practices can reverse environmental degradation caused by agriculture.",
    points: [
      "Defines environmental degradation (loss of quality of land, water or ecosystems) and sustainable practices (meeting present needs without harming the future), and names the area: the Aral Sea basin in Central Asia (Kazakhstan and Uzbekistan).",
      "Cause: from the 1960s water from the Amu Darya and Syr Darya rivers was diverted for irrigation, especially cotton, in an arid region.",
      "Cause: inefficient unlined canals lost much water by seepage and evaporation, and flood irrigation raised soil salinity.",
      "Impact: the inflow to the sea fell, and the sea shrank to a small fraction of its former area and volume by the 2000s, splitting into northern and southern parts.",
      "Impact: salinity of the water rose, fish species died out and the fishing industry collapsed, leaving ships stranded at former ports such as Muynak.",
      "Impact: the exposed seabed became a source of salty, polluted dust (with agricultural chemicals), and health problems, particularly breathing illness, increased.",
      "Impact: a drier local climate with hotter summers and colder winters, as the sea no longer moderated temperatures.",
      "Impact: unemployment and out-migration from fishing and farming communities.",
      "Sustainable practice 1: the Kok-Aral dam, finished in 2005 in Kazakhstan, held water in the northern part of the sea.",
      "Result: the level of the North Aral Sea rose, salinity fell, fish returned and fish catches recovered, bringing back local fishing.",
      "Sustainable practice 2: in Kazakhstan, canals along the Syr Darya were improved to cut water loss.",
      "Sustainable practice 3: planting of salt-tolerant shrubs such as saxaul on the exposed seabed to reduce dust.",
      "Limits: the South Aral Sea in Uzbekistan has largely dried up, because the main source of water (the Amu Darya) is still used for irrigation upstream.",
      "Limits: restoration was possible only in the smaller northern part, and it cannot restore the original sea.",
      "Limits: cooperation between countries is difficult because rivers cross borders and each state wants water for its own farmers.",
      "Limits: cotton remains a major export crop in Uzbekistan, which makes it hard to cut water demand quickly.",
      "Costs and funding: the dam was funded partly by a World Bank loan and needed national and international support.",
      "Timescale: ecological recovery is slow and partial, while soil salinity and toxic dust persist for decades.",
      "Alternative view: preventing degradation by efficient irrigation and crop choices would have been more effective than reversing it.",
      "Judgement: sustainable practices can reverse degradation in part, mostly in smaller or more manageable areas such as the North Aral, but not fully, because the main cause (water use) continues in the larger basin.",
    ],
    levels: geographyLevels(20), wordLimit: { min: 600, max: 800 },
    modelAnswer: "Environmental degradation is a loss in the quality of land, water or ecosystems, and sustainable practices meet present needs without harming the future. I use the Aral Sea basin in Central Asia, shared by Kazakhstan and Uzbekistan, to argue that sustainable practices can reverse the degradation only in part.\n\nThe degradation was caused by agriculture. From the 1960s water from the Amu Darya and Syr Darya was diverted to irrigate crops, especially cotton, in an arid region. Unlined canals lost much of the water by seepage and evaporation, and flood irrigation raised soil salinity. The inflow to the sea fell so much that by the 2000s it had shrunk to a small fraction of its former size and split into northern and southern parts. Salinity rose and the fish died, so the fishing industry collapsed and ships were left stranded at former ports such as Muynak. The exposed seabed became a source of salty dust containing agricultural chemicals, and breathing illness increased. The local climate became more extreme, and many people left.\n\nSome sustainable practices have had real success. The Kok-Aral dam, completed in Kazakhstan in 2005, held water in the northern part of the sea. The level of the North Aral Sea rose, salinity fell, fish returned and catches recovered, which brought back local fishing and income. Canals along the Syr Darya were improved to reduce water loss, and salt-tolerant shrubs such as saxaul have been planted on the exposed seabed to reduce dust. These measures show that where a smaller, well-defined part of an ecosystem can be managed and there is funding, including international support such as a World Bank loan, recovery is possible.\n\nHowever, the limits are important. The South Aral Sea in Uzbekistan has largely dried up, because irrigation upstream on the Amu Darya continues, and cotton remains an important export crop, so demand for water cannot be cut quickly. Restoration of the north did not restore the original sea. Cooperation between countries is difficult as the rivers cross borders and each state wants water for its farmers. Ecological recovery is slow and soil salinity and toxic dust persist for decades. It would have been far more effective to prevent degradation by efficient irrigation and a less water-hungry crop mix than to reverse it afterwards.\n\nIn conclusion, sustainable practices can reverse agricultural degradation in part, most clearly in the North Aral where the problem could be contained, but they cannot do so fully because the main cause, the use of water for irrigation in the wider basin, continues. The extent of reversal depends on whether the cause is tackled, as well as the consequences.",
    explanation: "Evaluate real measures in one area, show successes and limits, and judge the extent of reversal.",
  });
});
