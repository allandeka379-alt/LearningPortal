// W4b: transport.distribution-factors (ZIMSEC only). Traffic counts and costs are illustrative.
// Computed: lesson count total 1 820, mean 364, trucks 430 = 23.6%, daily estimate 4 368; rail saving 20/t and 400 000;
// question count (4 samples): totals; coal haul 300 km: road 33, rail 18, saving 15/t x 50 000 = 750 000.
import { concept, P, geographyLevels, chk, rnd, sum, mean } from "../lib.mjs";
import { mc, tbl } from "../tables/w4b-_q.mjs";

const C = [["06:00–07:00", 120, 80, 60], ["08:00–09:00", 210, 140, 90], ["12:00–13:00", 180, 100, 120], ["16:00–17:00", 240, 160, 100], ["19:00–20:00", 100, 60, 60]];
const tot = C.map((r) => r[1] + r[2] + r[3]);
const total = chk(sum(tot), 1820);
const meanHr = chk(mean(tot), 364);
const trucks = chk(sum(C.map((r) => r[3])), 430);
const truckPct = rnd((trucks / total) * 100, 1, 23.6, "truckPct");
const daily = chk(meanHr * 12, 4368);
const peak = chk(Math.max(...tot), 500);
const CT = tbl(["Hour", "Cars", "Buses and kombis", "Trucks"], C);
const D = [["07:00–08:00", 90, 70, 40], ["10:00–11:00", 110, 50, 60], ["14:00–15:00", 100, 40, 50], ["17:00–18:00", 150, 90, 30]];
const dTot = D.map((r) => r[1] + r[2] + r[3]);
const dSum = chk(sum(dTot), 880);
const dMean = chk(mean(dTot), 220);
const dBus = chk(sum(D.map((r) => r[2])), 250);
const dBusPct = rnd((dBus / dSum) * 100, 1, 28.4, "dBusPct");
const DT = tbl(["Hour", "Cars", "Buses and kombis", "Trucks"], D);
const saveT = chk(400 * 0.12 - 400 * 0.07, 20, 1e-9);
const saveAll = chk(saveT * 20000, 400000, 1e-9);
const roadT = chk(300 * 0.11, 33, 1e-9);
const railT = chk(300 * 0.06, 18, 1e-9);
const saveCoal = chk((roadT - railT) * 50000, 750000, 1e-9);

concept("ageo.transport.distribution-factors", { file: "transport/distribution-factors", keyPrefix: "transport.distribution-factors" }, (b) => {
  mc(b, 1, "RECALL", "Which transport system carries most passengers and freight within Zimbabwe because it reaches almost every town and farm?", [
    ["Road transport", "Correct: roads form the most extensive network."],
    ["Pipeline transport", "Pipelines carry only fuel between fixed points."],
    ["Water transport", "Water transport is limited to lakes such as Kariba."],
    ["Air transport", "Air transport is costly and used for few goods."],
  ], "**Roads** reach most places and carry most passengers and freight.");
  mc(b, 2, "RECALL", "Which two places does the fuel pipeline from the Mozambican coast connect?", [
    ["Beira and Feruka near Mutare", "Correct: it brings petroleum products inland."],
    ["Harare and Victoria Falls via Bulawayo", "No pipeline joins these places."],
    ["Bulawayo and Beitbridge", "No fuel pipeline joins these places."],
    ["Kariba and Chirundu", "These are linked by road, not by a fuel pipeline."],
  ], "The pipeline runs from **Beira to Feruka**.");
  mc(b, 2, "UNDERSTANDING", "Why are the main railways of Zimbabwe oriented towards ports rather than rural communal areas?", [
    ["They were built to serve mines, settler farms and trade with ports", "Correct: colonial investment followed mining and export trade."],
    ["They were built to link every village and rural school to a clinic", "Villages were not the main purpose."],
    ["Rail cannot cross rivers or hills", "Railways do cross rivers and hills."],
    ["They were designed to avoid all mining areas", "Mining areas were a main purpose."],
  ], "Colonial lines served **mines, farms and ports**.");
  mc(b, 3, "APPLICATION", "Which factor best explains why Zimbabwe's freight routes to the sea often pass through neighbouring countries?", [
    ["Zimbabwe is landlocked", "Correct: it has no coastline of its own."],
    ["Zimbabwe has no railways", "Zimbabwe has an extensive railway system."],
    ["Zimbabwe has a very small population", "Population size does not decide this."],
    ["Zimbabwe has no roads over 100 km long", "It has long trunk roads."],
  ], "A **landlocked** country depends on neighbours for access to ports.", { hints: ["Think about where ports are located."] });
  mc(b, 3, "ANALYSIS", "A traffic count shows 23.6% of vehicles are trucks on a trunk road. What does this most likely suggest?", [
    ["The road carries a significant amount of freight", "Correct: many heavy vehicles show goods movement."],
    ["The road is used only by tourists visiting the border", "Trucks do not indicate tourist use."],
    ["There are no cars on the road", "The count includes many cars."],
    ["The road is a footpath", "A footpath would not carry trucks."],
  ], "A high share of trucks suggests **freight use**.", { hints: ["Trucks mostly carry goods."] });
  mc(b, 4, "EVALUATION", "A single count of one hour at 16:00 on a Friday shows 500 vehicles. Why is it unwise to use this to estimate yearly traffic?", [
    ["It is one sample at a busy time and may not represent other hours or days", "Correct: traffic varies through the day and week."],
    ["Traffic counts can never be used for any purpose at all in geography", "Counts are useful if sampled properly."],
    ["Friday is the only day on which vehicles travel", "Traffic occurs on all days."],
    ["The result is exact for all hours of the year", "One hour cannot show this."],
  ], "One count is a **sample** at one time; repeat it at different hours and days.", { hints: ["Is Friday late afternoon typical of all hours?"] });
  b.tf({ d: 1, skill: "RECALL", stem: "Zimbabwe has a coastline on the Indian Ocean.", answer: false,
    feedbackFalse: "Correct: Zimbabwe is landlocked.",
    feedbackTrue: "Not so: Zimbabwe has no coastline.",
    explanation: "Zimbabwe is landlocked and uses ports in neighbouring countries." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Rail is usually cheaper per tonne than road for moving bulk goods such as coal over long distances.", answer: true,
    feedbackTrue: "Correct: rail has lower costs per tonne over long distances.",
    feedbackFalse: "Not so: rail is usually cheaper for heavy bulk goods over long distances.",
    explanation: "Rail has lower cost per tonne for bulk goods over long distances." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "A network in which routes spread from a central place like spokes of a wheel is {{blank:a}}. The state railway company is the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["radial"], choices: ["radial", "linear", "grid"] },
      { id: "b", accepted: ["NRZ"], choices: ["NRZ", "ZESA", "ZINWA"] },
    ], explanation: "**Radial**; the **NRZ** (National Railways of Zimbabwe)." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each system to its typical purpose in Zimbabwe.",
    pairs: [
      ["Pipeline", "Moving petroleum products in bulk"],
      ["Rail", "Moving coal, minerals and containers over long distances"],
      ["Air", "Carrying tourists and urgent high-value goods"],
      ["Lake ferry", "Linking lakeside communities on Lake Kariba"],
    ], explanation: "Each system suits a particular type of movement." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, unit: "units",
    stem: `A traffic count recorded four hours of vehicles on a road (illustrative data).\n\n${DT}\n\nCalculate the mean number of vehicles per hour.`,
    hints: ["Find each hour's total, add them, then divide by 4."],
    value: dMean, wrong: [880, 250],
    explanation: "Totals: 200, 220, 190, 270. Sum = 880. Mean = 880 ÷ 4 = **220 vehicles per hour**." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "%", dp: 1,
    stem: `Using the same count (total 880 vehicles; buses and kombis in the four hours: 70, 50, 40 and 90), calculate the percentage of vehicles that were buses and kombis, to 1 decimal place.\n\n${DT}`,
    hints: ["Add the buses and kombis, then divide by the total of all vehicles."],
    value: dBusPct, wrong: [250, 22],
    explanation: "70 + 50 + 40 + 90 = 250. 250 ÷ 880 × 100 = **28.4%**." });
  b.calc({ d: 4, skill: "ANALYSIS", calculator: true, unit: "US$",
    stem: "A mine moves 20 000 t of ore 400 km. Road costs US\\$0.12 per tonne per km and rail costs US\\$0.07 per tonne per km. Calculate the total saving from using rail, in US\\$.",
    hints: ["Find the cost per tonne for each mode.", "Multiply the saving per tonne by the tonnage."],
    value: saveAll, wrong: [20, 960000],
    explanation: "1. Road: 400 × 0.12 = US\\$48 per tonne.\n2. Rail: 400 × 0.07 = US\\$28 per tonne.\n3. Saving = 20 per tonne × 20 000 = **US\\$400 000**. The value 20 is the saving per tonne only." });
  b.short({ d: 1, skill: "RECALL", stem: "Give the acronym of the state company that runs Zimbabwe's railways.",
    accepted: ["NRZ", "National Railways of Zimbabwe", "N.R.Z."], wrong: ["ZINARA"],
    explanation: "**NRZ**: National Railways of Zimbabwe." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the Mozambican port to which Zimbabwe's railway and fuel pipeline from Mutare lead.",
    accepted: ["Beira", "the port of Beira", "Port of Beira"], wrong: ["Maputo"],
    explanation: "**Beira**." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how relief affects the pattern of roads and railways in Zimbabwe.",
    hints: ["Think of rivers, escarpments and the central plateau."],
    points: [
      "Rivers need bridges, which are costly, so routes cross at a few suitable places.",
      "Escarpments and highlands, such as the Zambezi Escarpment and Eastern Highlands, need winding roads and cuttings, which raise costs.",
      "The flatter high plateau is easier and cheaper to build on, so main routes follow it.",
      "Steep or rocky areas have few routes, so access to them is limited.",
    ],
    modelAnswer: "Rivers need costly bridges, so routes cross at a few suitable places. Escarpments and highlands, such as the Zambezi Escarpment and Eastern Highlands, need winding roads and cuttings that raise costs, while the flatter high plateau is cheaper to build on, so main routes follow it. Steep or rocky areas have few routes.",
    explanation: "Rivers, escarpments and the plateau." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the purposes of air transport in Zimbabwe.",
    hints: ["Think of tourists, business and urgent goods."],
    points: [
      "Carrying tourists, for example to Victoria Falls and Kariba.",
      "Carrying business passengers between main cities and abroad.",
      "Carrying urgent or high-value goods and reaching remote areas such as mines and lodges.",
    ],
    modelAnswer: "Air transport carries tourists, for example to Victoria Falls and Kariba, business passengers between cities and abroad, and urgent or high-value goods, and it reaches remote areas such as mines and lodges.",
    explanation: "Tourists, business and urgent goods." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Suggest four ways in which poor road quality in rural areas can hold back development.",
    hints: ["Think about farmers, health, education and costs."],
    points: [
      "Farmers cannot easily take crops to market, so produce is lost and incomes are low.",
      "Vehicle repair and fuel costs rise, which raises the price of goods.",
      "Clinics and schools are harder to reach, especially in the rainy season.",
      "Traders, buses and investors avoid the area, so there is little growth.",
    ],
    modelAnswer: "Farmers cannot easily take crops to market, so produce is lost and incomes are low. Vehicle repair and fuel costs raise the price of goods, clinics and schools are harder to reach in the rainy season, and traders, buses and investors avoid the area.",
    explanation: "Markets, costs, services and investment." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: `A student counted vehicles on a trunk road for one hour at five times of the day (illustrative data).\n\n${CT}`,
    hints: ["Add cars, buses and kombis, and trucks for each hour.", "Share = part ÷ total × 100."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the mean number of vehicles per hour.", value: meanHr, unit: "units", wrong: [1820, 500],
        explanation: "Total = 1 820; mean = 1 820 ÷ 5 = 364." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the percentage of vehicles that were trucks, to 1 decimal place.", value: truckPct, dp: 1, unit: "%", wrong: [430, 33],
        explanation: "430 ÷ 1 820 × 100 = 23.6%." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the highest traffic is recorded at 16:00–17:00.",
        points: [
          "Workers and students travel home at the end of the day, so cars and kombis peak.",
          "Trucks and buses complete deliveries and trips before dark, adding to the flow.",
        ],
        modelAnswer: "Workers and students travel home at the end of the day, so cars and kombis peak, and trucks and buses complete trips before dark.",
        explanation: "End-of-day movement and daylight." }),
      P.manual({ label: "(d)", marks: 2, stem: "State two limitations of using this count to estimate daily traffic.",
        points: [
          "Only five sampled hours were counted, so other hours are missing.",
          "The count was taken on one day, which may not be typical of the week or season.",
        ],
        modelAnswer: "Only five sampled hours were counted, so other hours are missing, and the count was taken on one day which may not be typical of the week or season.",
        explanation: "Sampling limits accuracy." }),
    ], explanation: "Analyse a traffic count." });

  b.struct({ d: 4, skill: "EVALUATION",
    stem: "A mine at Hwange sends 50 000 t of coal a year about 300 km to Bulawayo. Road costs US\\$0.11 per tonne per km and rail costs US\\$0.06 per tonne per km (illustrative data).",
    hints: ["Cost per tonne = distance × rate.", "Total saving = saving per tonne × tonnes."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the cost of moving one tonne by road, in US\\$.", value: roadT, unit: "US$", wrong: [18, 300],
        explanation: "300 × 0.11 = US\\$33." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the cost of moving one tonne by rail, in US\\$.", value: railT, unit: "US$", wrong: [33, 0.06],
        explanation: "300 × 0.06 = US\\$18." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the total yearly saving from moving the coal by rail instead of road, in US\\$.", value: saveCoal, unit: "US$", wrong: [15, 900000],
        explanation: "(33 − 18) × 50 000 = US\\$750 000." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why a mine may still use road transport for some of its coal.",
        points: [
          "Rail wagons and locomotives may be too few or unreliable, causing delays.",
          "Trucks can load at the mine and deliver direct to the customer, with no transfer.",
          "Small or urgent loads and customers with no rail siding suit road transport.",
        ],
        modelAnswer: "Rail wagons and locomotives may be too few or unreliable, causing delays. Trucks can load at the mine and deliver directly to the customer with no transfer, and small or urgent loads and customers with no rail siding suit road transport.",
        explanation: "Reliability, flexibility and access." }),
      P.manual({ label: "(e)", marks: 4, stem: "Suggest how improving the railway could help the economy of Zimbabwe.",
        points: [
          "Lower freight costs for mines and industries raise profits and competitiveness.",
          "Fewer heavy trucks reduce damage to roads and road accidents.",
          "Reliable rail links to ports help exports and imports, including for landlocked Zimbabwe.",
          "Jobs are created in railway repair and operation, and in industries using cheaper transport.",
        ],
        modelAnswer: "Lower freight costs for mines and industries raise profits and competitiveness, and fewer heavy trucks reduce road damage and accidents. Reliable rail links to ports help exports and imports for a landlocked country, and jobs are created in railway repair and operation and in industries using cheaper transport.",
        explanation: "Costs, roads, ports and jobs." }),
    ], explanation: "Compare road and rail costs and suggest improvements." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the extent to which transport has influenced the development of Zimbabwe.",
    hints: ["Give positive effects and limits.", "Reach a judgement."],
    points: [
      "Roads and railways link mines, farms and industries to markets and ports, supporting exports and growth.",
      "Transport lowers the cost of goods and inputs and lets farmers sell produce.",
      "Routes to Victoria Falls and Kariba support tourism and jobs.",
      "Growth points and towns developed along railways and main roads.",
      "Poor maintenance of roads and rail raises costs, causes delays and accidents, and isolates rural areas.",
      "Landlocked position makes Zimbabwe dependent on neighbours' ports, border posts and agreements.",
      "Transport alone does not create development without power, finance, skills and markets.",
      "Judgement: transport has been important, particularly for mining and trade, but its effect depends on maintenance and on other conditions.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Roads and railways link mines, farms and industries to markets and ports, which supports exports and growth, and lower transport costs let farmers sell produce and reduce the price of inputs. Routes to Victoria Falls and Kariba support tourism, and towns and growth points developed along railways and main roads. However, poor maintenance raises costs, causes delays and accidents and isolates rural areas, and the landlocked position makes Zimbabwe dependent on neighbours' ports, border posts and agreements. Transport alone does not create development without power, finance, skills and markets. I conclude that transport has been important, particularly for mining and trade, but its effect depends on maintenance and on other conditions.",
    wordLimit: { max: 300 }, explanation: "Weigh the benefits of transport against its limits and judge." });

  b.card("FACT", "Transport systems in Zimbabwe", "Road, rail (NRZ), air, water (Lake Kariba ferries) and a fuel pipeline from Beira to Feruka.");
  b.card("CONCEPT", "Why roads carry most traffic", "They reach almost every town and farm and need little fixed infrastructure for the user; rail is better for bulk freight over long distances.");
  b.card("CONCEPT", "Factors governing network patterns", "Relief, population, economic activity, history and politics (including the landlocked position).");
  b.card("CONCEPT", "Zimbabwe's radial pattern", "Routes spread from Harare and Bulawayo, with a north–south spine from Beitbridge to Chirundu and long links to ports.");
  b.card("FACT", "Colonial railways", "Rail reached Bulawayo from the south in 1897, Mutare from Beira in 1898 and the Victoria Falls in 1904, serving mines, farms and ports.");
  b.card("DEFINITION", "Traffic count", "A survey recording the number and type of vehicles passing a point in a period of time.");
  b.card("FORMULA", "Mean traffic flow", "Mean flow per hour = total vehicles counted ÷ number of hours sampled; state that it is a sample.");
  b.card("CONCEPT", "Impact of transport on development", "Cheaper goods and inputs, access to markets and services, tourism and mining; poor maintenance raises costs and isolates areas.");
  b.card("DEFINITION", "Corridor", "A major route, with road, rail and sometimes pipeline, joining an inland area to a port, such as the Beira Corridor.");
});
