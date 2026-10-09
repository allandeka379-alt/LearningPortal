// W1b exam-format items, ZIMSEC Business Enterprise and Skills: P1 structured (17 and 16 marks), P2 essay (20 marks)
// and P2 Section A case study (40 marks). Mark splits are ours (the syllabus does not print them).
import { concept, P, BES, money, table, sum, check } from "../lib.mjs";

const L8 = [
  [3, 6, 8, "Well-developed explanation of a range of relevant points, applied with examples."],
  [2, 3, 5, "Some explanation of relevant points; limited development or examples."],
  [1, 1, 2, "Points identified or listed with little or no explanation."],
];
const L12 = [
  [3, 9, 12, "Balanced discussion of both sides, developed with examples, and a justified conclusion."],
  [2, 5, 8, "Some discussion, mostly one-sided or not fully developed; weak or unsupported conclusion."],
  [1, 1, 4, "Simple points with little explanation and no judgement."],
];
const L6 = [
  [3, 5, 6, "Factors explained and applied to the case with a clear link to the business."],
  [2, 3, 4, "Factors explained with some application."],
  [1, 1, 2, "Factors identified with little explanation."],
];
const L8E = [
  [3, 6, 8, "Uses the data and the case to weigh both options and reaches a justified recommendation."],
  [2, 3, 5, "Some use of the data; analysis of one option or a weak conclusion."],
  [1, 1, 2, "Simple statements with little use of the case."],
];

// --- P1 17 marks: transport choice for a brick maker ---
const bricksT = 36;
const roadT = 47;
const railT = 29;
const railExtra = 2 * 240;
const road17 = bricksT * roadT; // 1692
const rail17 = sum([bricksT * railT, railExtra]); // 1044 + 480 = 1524
const diff17 = road17 - rail17; // 168
check("17 diff", diff17, 168);

// --- P1 16 marks: warehouse for a wholesaler ---
const space = 140; // square metres
const rentPerM2 = 6.5; // per month
const rentYear = space * rentPerM2 * 12; // 10,920
const buildCost = 52000;
const runYear = 3600;
check("16 rent", rentYear, 10920);
const firstYearOwn = buildCost + runYear; // 55,600
if (Math.round(buildCost / (rentYear - runYear)) !== 7) throw new Error("bes 16: payback wording");

// --- P2 40 marks: case study figures ---
const months = ["July", "August", "September", "October"];
const tom = [18, 22, 25, 20];
const but = [12, 10, 9, 14];
const bean = [6, 7, 8, 7];
const totals = [sum(tom), sum(but), sum(bean)];
const grand = sum(totals); // 158
check("case output", grand, 158);
const tripsPerMonth = 16;
const hireRate = 180;
const hireMonth = tripsPerMonth * hireRate; // 2880
const ownTripCost = 95;
const ownMonth = tripsPerMonth * ownTripCost; // 1520
const truckPrice = 38000;
const avgStock = 12;
const coldRent = 45; // per tonne per month
const rentYr = avgStock * coldRent * 12; // 6480
const coldBuild = 24000;
const coldRun = 250; // per month
const coldRunYr = coldRun * 12; // 3000
const coldSaving = rentYr - coldRunYr; // 3480
check("cold saving", coldSaving, 3480);

const outputTable = table(["Crop (tonnes)", ...months, "Total"], [
  ["Tomatoes", ...tom, "?"],
  ["Butternut", ...but, "?"],
  ["Green beans (export)", ...bean, "?"],
]);
const transportTable = table(["Option", "Cost"], [
  ["Hire a refrigerated truck (Chiweshe to Harare)", `${money(hireRate)} per trip`],
  ["Buy a refrigerated truck", `${money(truckPrice)} to buy; running costs ${money(ownTripCost)} per trip (fuel, driver, maintenance)`],
]);
const storageTable = table(["Option", "Cost"], [
  ["Rent space in a public cold store in Harare", `${money(coldRent)} per tonne per month (average stock held: ${avgStock} tonnes)`],
  ["Build a cold room at the packhouse", `${money(coldBuild)} to build; running costs ${money(coldRun)} per month`],
]);

concept("bus.transport.choice-documents", { file: "exam/w1b-bes", keyPrefix: "exam.w1b-bes", applies: BES }, (b) => {
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, secs: 1080, paper: "Paper 1", calculator: true,
    concepts: ["bus.transport.choice-documents", "bus.transport.modes"],
    stem: `Farai owns a brickworks near Kwekwe. He has an order for ${bricksT} tonnes of bricks from a builder in Bulawayo, who needs them within three weeks. He has two quotations:\n\n${table(["Mode", "Charge", "Extra costs"], [["Road (door to door)", `${money(roadT)} per tonne`, "none"], ["Rail", `${money(railT)} per tonne`, `${money(240)} for a lorry at each end of the rail journey`]])}`,
    parts: [
      P.mcq({
        label: "(a)", stem: "Which mode of transport would be **least** suitable for Farai's bricks?",
        options: [["Air", "Correct: air is far too costly for heavy, low-value bricks."], ["Road", "Road is suitable: door to door over a medium distance."], ["Rail", "Rail is suitable for heavy, bulky goods."], ["Road and rail combined", "Combining rail with lorries at each end is a sensible option."]],
        answer: "A",
      }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the total cost of sending the bricks by road.", kind: "money", value: road17, wrong: [roadT + bricksT] }),
      P.num({ label: "(c)", marks: 3, stem: "Calculate the total cost of sending the bricks by rail.", kind: "money", value: rail17, wrong: [bricksT * railT + 240, bricksT * railT] }),
      P.num({ label: "(d)", marks: 1, stem: "Calculate how much cheaper the cheaper mode is.", kind: "money", value: diff17, wrong: [road17 - bricksT * railT] }),
      P.manual({
        label: "(e)", marks: 4,
        stem: "Explain **two** factors, other than cost, that Farai should consider before choosing a mode of transport.",
        points: [
          "Speed / urgency: the builder needs the bricks within three weeks.",
          "So the mode must deliver on time; rail delays or timetables could matter.",
          "Safety / risk of damage: bricks break if handled many times.",
          "Rail involves loading and unloading at stations, so more breakages (or: reliability, accessibility of the site).",
        ],
        modelAnswer: "Speed: the builder needs the bricks within three weeks, so Farai must be sure the mode can deliver in time. Risk of damage: bricks chip and break when handled, and rail means extra loading and unloading at the stations, so more breakages.",
      }),
      P.manual({
        label: "(f)", marks: 6,
        stem: "Recommend which mode Farai should use. Justify your answer.",
        points: [
          `Uses the figures: rail is ${money(diff17)} cheaper.`,
          "Rail suits heavy, bulky goods over a long distance.",
          "Three weeks allows time for rail timetables.",
          "Drawback of rail: extra handling, breakages, not door to door.",
          "Road: dearer but door to door, fewer breakages, flexible.",
          "Justified recommendation weighing the saving against breakages and convenience.",
        ],
        modelAnswer: `Rail costs ${money(rail17)} and road ${money(road17)}, so rail saves ${money(diff17)}. Bricks are heavy and bulky and three weeks is enough time for rail. However, rail means two extra loadings and unloadings, so more bricks may break, and the saving is small compared with the value of the order. Road delivers straight to the building site with less handling. Because the saving is small and breakages would reduce it further, Farai should use road transport.`,
      }),
    ],
    hints: ["(c) Count the lorry charge at both ends of the rail journey.", "(f) Is the saving big enough to justify the extra handling?"],
    explanation: `(a) Air. (b) ${bricksT} × ${roadT} = ${money(road17)}. (c) ${bricksT} × ${railT} = ${money(bricksT * railT)} + 2 × 240 = ${money(rail17)}. (d) ${money(diff17)}. (e) Speed, risk of damage, reliability. (f) A justified choice: the small saving by rail must be weighed against breakages and convenience.`,
    workedSolution: `1. Road: ${bricksT} × ${roadT} = ${road17.toLocaleString("en-GB")}.\n2. Rail haulage: ${bricksT} × ${railT} = ${(bricksT * railT).toLocaleString("en-GB")}; lorries 2 × 240 = ${railExtra}; total ${rail17.toLocaleString("en-GB")}.\n3. Difference: ${road17.toLocaleString("en-GB")} − ${rail17.toLocaleString("en-GB")} = ${diff17}.`,
  });

  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, secs: 1020, paper: "Paper 1", calculator: true,
    concepts: ["bus.trade.warehouse-types-location", "bus.trade.warehousing"],
    stem: `Rudo runs a wholesale business in Masvingo supplying groceries to tuck shops. Her store is too small. She can rent ${space} square metres in a public warehouse for ${money(rentPerM2)} per square metre per month, or build her own warehouse for ${money(buildCost)}, with running costs of ${money(runYear)} a year.`,
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: "Complete the sentences about the functions of Rudo's warehouse.",
        template: "Dividing large cartons into smaller quantities for tuck shops is called {{blank:a}}. Sorting goods by quality or size is called {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["breaking bulk"], choices: ["breaking bulk", "grading", "bonding", "branding"] },
          { id: "b", accepted: ["grading"], choices: ["breaking bulk", "grading", "bonding", "branding"] },
        ],
      }),
      P.mcq({
        label: "(b)", stem: "What type of warehouse would Rudo build for her own goods?",
        options: [["A private (wholesaler's) warehouse", "Correct: owned and used by her business."], ["A public warehouse", "Public warehouses rent space to anyone."], ["A bonded warehouse", "Bonded warehouses hold imports before duty is paid."], ["A retailer's distribution centre", "Rudo is a wholesaler, not a retailer."]],
        answer: "A",
      }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the cost of renting the public warehouse space for one year.", kind: "money", value: rentYear, wrong: [space * rentPerM2] }),
      P.num({ label: "(d)", marks: 2, stem: "Calculate the total cost of building and running her own warehouse in its first year.", kind: "money", value: firstYearOwn, wrong: [buildCost] }),
      P.manual({
        label: "(e)", marks: 4,
        stem: "Explain **two** factors Rudo should consider when choosing a site for her own warehouse.",
        points: [
          "Nearness to her customers (tuck shops) / transport links.",
          "So deliveries are quick and cheap.",
          "Cost of land / security / space for lorries.",
          "Explained in the context of a grocery wholesaler (e.g. theft risk of groceries, lorry access).",
        ],
        modelAnswer: "Good road access close to her tuck-shop customers, so deliveries are quick and cheap. Security, because groceries are easy to steal and resell, so a site in a safe area with guards reduces losses.",
      }),
      P.manual({
        label: "(f)", marks: 5,
        stem: "Recommend whether Rudo should rent or build. Justify your answer.",
        points: [
          `Uses the figures: rent ${money(rentYear)} a year against ${money(firstYearOwn)} in the first year of building.`,
          "Building costs less each year after the first (only running costs).",
          "Building needs capital she may not have; renting is flexible.",
          "Own warehouse gives control and can be designed for her needs.",
          "Justified recommendation.",
        ],
        modelAnswer: `Renting costs ${money(rentYear)} a year, while building costs ${money(firstYearOwn)} in the first year but only ${money(runYear)} a year after that, so building becomes cheaper overall after about ${Math.round(buildCost / (rentYear - runYear))} years. However, Rudo would need to find ${money(buildCost)}, and renting lets her change the space as her business grows. If she expects to stay in Masvingo and can raise the capital, building gives her control and lower long-run costs; otherwise she should rent. I recommend renting now and building when her business is established.`,
      }),
    ],
    hints: ["(c) Rent per square metre × area × 12 months.", "(f) Compare one year of rent with the building cost and the yearly running costs."],
    explanation: `(a) Breaking bulk; grading. (b) Private warehouse. (c) ${space} × ${rentPerM2} × 12 = ${money(rentYear)}. (d) ${money(buildCost)} + ${money(runYear)} = ${money(firstYearOwn)}. (e) Location factors applied. (f) A justified choice using the figures.`,
    workedSolution: `1. Rent per month = ${space} × ${rentPerM2} = ${space * rentPerM2}.\n2. Rent per year = ${space * rentPerM2} × 12 = ${rentYear.toLocaleString("en-GB")}.\n3. Own warehouse, first year = ${buildCost.toLocaleString("en-GB")} + ${runYear.toLocaleString("en-GB")} = ${firstYearOwn.toLocaleString("en-GB")}.`,
  });

  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1500, paper: "Paper 2",
    concepts: ["bus.trade.warehousing", "bus.trade.warehouse-types-location"],
    stem: "Many small manufacturers in Zimbabwe lose stock and money because they have nowhere suitable to store their goods.",
    parts: [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "Describe the functions of a warehouse to a business.",
        points: [
          ["Storage and protection of goods from theft, weather, pests and damage.", 2],
          ["Bridging the time gap: steady supply all year (seasonal production or demand).", 2],
          ["Breaking bulk, grading, packing and preparing goods for sale.", 2],
          ["Price stabilisation / warehouse warrant as security / showroom.", 2],
        ],
        levels: L8,
        modelAnswer: "A warehouse **stores and protects** goods from theft, rain, damp, pests and sun until they are needed. It **bridges the time gap** between production and sale, so goods made or harvested at one time can be supplied steadily all year. It **breaks bulk**, dividing large consignments into smaller lots, and may **grade, pack and label** goods ready for sale. By holding goods when supply is high and releasing them when it is low, it helps **stabilise prices**, and goods held in a public warehouse can be used, through a warehouse warrant, as security for a loan.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 550 },
        stem: "Discuss whether a small manufacturer should use a public warehouse or build its own private warehouse.",
        points: [
          ["Public: no building cost; pays only for space used; suits limited capital.", 2],
          ["Public: flexible as output changes; extra services (security, insurance, transport, warrant).", 2],
          ["Public: rent is a continuing cost; less control and access; may be far from the factory.", 2],
          ["Private: full control, designed for the goods, next to production.", 2],
          ["Private: high capital and running costs; space idle when stock is low.", 2],
          ["Justified conclusion related to the size and growth of the business.", 2],
        ],
        levels: L12,
        modelAnswer: "A public warehouse lets a small manufacturer store goods without the large cost of building, paying only for the space it uses, which suits a firm with little capital. It is flexible: the firm can rent more space after a busy season and less when stock is low, and it may get services such as security, insurance and transport, and a warehouse warrant to borrow against. However, rent is a continuing cost, the firm has less control over access, and the warehouse may be some distance from the factory. A private warehouse gives full control, can be designed for the goods (for example with cold rooms) and can be next to the factory, saving transport. But it needs a large investment and running costs, and space may stand idle. For a small manufacturer with uncertain or seasonal output, a public warehouse is usually the better choice; once output is large and steady, building its own becomes worth considering.",
      }),
    ],
    hints: ["(a) Describe at least four functions.", "(b) Weigh cost, control and flexibility for a small firm, then conclude."],
    explanation: "(a) Storage and protection, time gap, breaking bulk and preparation, price stabilisation and security for loans. (b) Public warehouses suit small firms with limited capital and variable output; private warehouses suit large, steady volumes.",
  });

  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 3000, paper: "Paper 2", calculator: true,
    concepts: ["bus.trade.warehousing", "bus.trade.warehouse-types-location", "bus.transport.modes", "bus.transport.choice-documents", "bus.production.value-addition"],
    stem: [
      "**Chiweshe Growers Co-operative** (a fictional business)",
      "",
      "Chiweshe Growers Co-operative was formed six years ago by forty small-scale farmers in the Chiweshe communal area, about 80 km north of Harare. Before the co-operative existed, each farmer sold tomatoes and butternut at the roadside or to middlemen who came with lorries at harvest time. Prices were low because everyone sold at once, and much of the produce rotted before it could be sold.",
      "",
      "The members now share a packhouse, where produce is washed, graded and packed into crates and boxes. The co-operative supplies two supermarket groups in Harare with tomatoes and butternut. Three years ago it began growing fine green beans for export. The beans are trimmed, packed in punnets and labelled at the packhouse, then flown to a buyer in Europe. The export price is much higher than the local price for vegetables, but the buyer insists that beans reach its stores within 48 hours of picking and rejects any that arrive damaged or warm.",
      "",
      "Each member farms between one and three hectares. Members deliver their produce to the packhouse every morning, where it is weighed and recorded against the member's name. Workers sort the tomatoes into three grades by size and colour, pack the best into branded crates for the supermarkets and sell the lower grades to vendors at a nearby business centre. Butternut is graded by weight. Because the co-operative buys inputs such as seed, fertiliser and crates in bulk for all its members, it pays lower prices than a single farmer could.",
      "",
      "The two supermarket groups pay 30 days after delivery and set strict standards: produce must be clean, graded, correctly labelled and delivered at agreed times. If a delivery is late, the supermarket may refuse it and buy from another supplier. Nyasha says that keeping these contracts is the co-operative's most important task, because the supermarkets buy most of its output.",
      "",
      "Demand from the export buyer is growing. The buyer has offered to double its order for green beans next season if the co-operative can guarantee that every consignment meets its deadline.",
      "",
      "The co-operative's manager, Nyasha Chari, reports to a committee elected by the members. At the last meeting she presented the output for the busiest four months of the year (Table 1).",
      "",
      `**Table 1: Output, July to October (tonnes)**\n\n${outputTable}`,
      "",
      "**Transport.** At present the co-operative hires refrigerated trucks to carry produce from the packhouse to the supermarkets' warehouses in Harare and to the airport. In the busy season it needs about 16 trips a month. Hired trucks are sometimes late, and twice last season a truck did not arrive at all, so a load of beans missed its flight and was sold locally at a loss. The committee is considering buying its own refrigerated truck with a bank loan (Table 2).",
      "",
      `**Table 2: Transport options**\n\n${transportTable}`,
      "",
      "**Storage.** The packhouse has no cold room. Produce that cannot be delivered on the day it is packed must be sent to a public cold store in Harare, which charges by the tonne. Members say that renting space is expensive and that produce is sometimes damaged by being moved twice. Nyasha has obtained a quotation for building a cold room at the packhouse (Table 3). The packhouse has a reliable borehole and is on a tarred road, but the electricity supply is interrupted several times a month, and a back-up generator would add to the running costs shown.",
      "",
      `**Table 3: Storage options**\n\n${storageTable}`,
      "",
      "Some members argue that the co-operative should not borrow at all. They say that the money would be better paid out to members, many of whom need cash for school fees and inputs. Others argue that a truck and a cold room would let the co-operative add value, reduce waste and win more export orders. Nyasha has asked the committee to decide before the next season begins.",
    ].join("\n"),
    parts: [
      P.mcq({
        label: "(a)", stem: "What type of warehouse is the cold store in Harare that the co-operative uses at present?",
        options: [["A public warehouse", "Correct: it stores goods for anyone who pays a charge."], ["A bonded warehouse", "Bonded warehouses hold imports before duty is paid."], ["A manufacturer's warehouse", "It is not owned by the co-operative."], ["A retailer's distribution centre", "It is not run by a retailer for its branches."]],
        answer: "A",
      }),
      P.num({ label: "(b)", marks: 2, stem: "Using Table 1, calculate the total output of all three crops from July to October, in tonnes.", kind: "units", value: grand, wrong: [totals[0]] }),
      P.num({ label: "(c)", marks: 2, stem: "Using Table 2, calculate the monthly cost of hiring refrigerated trucks for 16 trips.", kind: "money", value: hireMonth, wrong: [hireRate + tripsPerMonth] }),
      P.num({ label: "(d)", marks: 2, stem: "Using Table 2, calculate the monthly running cost of 16 trips with the co-operative's own truck.", kind: "money", value: ownMonth, wrong: [ownTripCost * 12] }),
      P.num({ label: "(e)", marks: 2, stem: "Using Table 3, calculate the yearly cost of renting space in the public cold store.", kind: "money", value: rentYr, wrong: [avgStock * coldRent] }),
      P.num({ label: "(f)", marks: 2, stem: "Using Table 3, calculate how much less the cold room would cost to run each year than renting space in the public cold store.", kind: "money", value: coldSaving, wrong: [rentYr - coldRun] }),
      P.mcq({
        label: "(g)", stem: "Which mode of transport must the co-operative use to send the green beans to Europe?",
        options: [["Air", "Correct: only air meets the 48-hour limit for perishable beans."], ["Sea", "Sea is far too slow for beans that must arrive within 48 hours."], ["Rail", "Rail cannot reach Europe from Zimbabwe within 48 hours."], ["Pipeline", "Pipelines carry liquids and gases only."]],
        answer: "A",
      }),
      P.fib({
        label: "(h)", marks: 2, stem: "Complete the sentences about the documents used.",
        template: "The beans flown to Europe travel with an {{blank:a}}. When tomatoes are delivered to a supermarket warehouse, the supermarket signs a {{blank:b}} to confirm what was received.",
        blanks: [
          { id: "a", accepted: ["airway bill"], choices: ["airway bill", "bill of lading", "cover note", "proposal form"] },
          { id: "b", accepted: ["delivery note"], choices: ["delivery note", "bill of lading", "cover note", "proposal form"] },
        ],
      }),
      P.manual({
        label: "(i)", marks: 4,
        stem: "Explain **two** ways in which a cold room at the packhouse would add value to the co-operative's produce.",
        points: [
          "Keeps produce fresh / slows ripening and rotting.",
          "So produce reaches buyers in better condition and fetches a higher price (fewer rejections).",
          "Avoids moving produce twice to Harare / less handling damage.",
          "So less waste and lower costs; produce can be held and released when prices are better.",
        ],
        modelAnswer: "A cold room would keep the beans and tomatoes cool and fresh, so they reach buyers in better condition and fewer are rejected. It would also stop produce being moved twice to the Harare cold store, reducing handling damage and waste.",
      }),
      P.manual({
        label: "(j)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Explain **three** factors the committee should consider in deciding whether the packhouse is a suitable location for a cold room.",
        points: [
          ["Electricity supply: interrupted several times a month; a cold room needs constant power, so a generator adds cost.", 2],
          ["Transport links: tarred road for refrigerated trucks to Harare and the airport.", 2],
          ["Nearness to the farms (source of produce) / water supply / security / space for expansion.", 2],
        ],
        levels: L6,
        modelAnswer: "**Electricity supply**: a cold room must run all day and night, and the packhouse suffers power cuts several times a month, so a back-up generator would be essential, adding to costs. **Transport links**: the packhouse is on a tarred road, so refrigerated trucks can reach Harare and the airport quickly. **Nearness to the farms**: produce can be cooled within hours of picking, keeping it fresh and avoiding a trip to Harare; the borehole also supplies water for washing.",
      }),
      P.manual({
        label: "(k)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "Evaluate whether the co-operative should buy its own refrigerated truck or continue to hire trucks.",
        points: [
          ["Uses calculations: own truck saves running costs each month compared with hiring.", 2],
          ["Reliability: own truck avoids late or missing hired trucks and lost export loads.", 2],
          ["Against: large loan and interest; repairs and breakdowns; truck idle out of season.", 2],
          ["Justified recommendation using the case.", 2],
        ],
        levels: L8E,
        modelAnswer: `Hiring costs ${money(hireMonth)} a month in the busy season, while running its own truck would cost ${money(ownMonth)}, a saving of ${money(hireMonth - ownMonth)} a month. An own truck would also be more reliable: the co-operative lost export loads when hired trucks did not arrive, and the beans must reach Europe within 48 hours. However, the truck costs ${money(truckPrice)}, which must be borrowed with interest, the co-operative must pay for repairs, and the truck may stand idle outside the busy season. Because reliability is critical for the high-value export trade and the monthly saving is large in the busy season, I recommend buying the truck, and hiring it out or using it for other members' produce in the quiet months to cover its costs.`,
      }),
      P.manual({
        label: "(l)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "Some members want the co-operative's surplus paid out to members instead of borrowing to invest in a cold room. Discuss whether the co-operative should build the cold room.",
        points: [
          ["Uses calculations: the cold room is cheaper to run than renting each year (saving).", 2],
          ["Benefits: less waste, less handling damage, fresher produce, more export orders; adds value.", 2],
          ["Against: building cost and loan; unreliable power needs a generator; members need cash now.", 2],
          ["Justified conclusion weighing members' short-term needs against long-term gains.", 2],
        ],
        levels: L8E,
        modelAnswer: `Renting space in the public cold store costs ${money(rentYr)} a year, while a cold room would cost ${money(coldRunYr)} a year to run, saving ${money(coldSaving)} a year before generator costs. It would also cut waste and handling damage, keep beans fresh for the export buyer and could win more orders, adding value to members' produce. Against this, it costs ${money(coldBuild)} to build, the power cuts mean a generator would add to running costs, and members who need cash for school fees would receive less this year. Because the cold room lowers costs and protects the high-value export trade for many years, the co-operative should build it, perhaps paying a smaller cash distribution this year so that members' immediate needs are partly met.`,
      }),
    ],
    hints: ["(b) Add every figure in Table 1.", "(e) Average stock × rent per tonne × 12.", "(k) and (l) Use your calculations, then weigh the benefits against the costs and risks."],
    explanation: `(a) Public warehouse. (b) ${totals.join(" + ")} = ${grand} tonnes. (c) 16 × ${hireRate} = ${money(hireMonth)}. (d) 16 × ${ownTripCost} = ${money(ownMonth)}. (e) ${avgStock} × ${coldRent} × 12 = ${money(rentYr)}. (f) ${money(rentYr)} − ${money(coldRunYr)} = ${money(coldSaving)}. (g) Air. (h) Airway bill; delivery note. (i)-(l) Applied explanation and evaluation using the case and the calculations.`,
    workedSolution: `1. Output: tomatoes ${totals[0]}, butternut ${totals[1]}, beans ${totals[2]}; total ${grand} tonnes.\n2. Hiring: 16 × ${hireRate} = ${hireMonth.toLocaleString("en-GB")} a month.\n3. Own truck running: 16 × ${ownTripCost} = ${ownMonth.toLocaleString("en-GB")} a month.\n4. Cold store rent: ${avgStock} × ${coldRent} × 12 = ${rentYr.toLocaleString("en-GB")} a year.\n5. Cold room running: ${coldRun} × 12 = ${coldRunYr.toLocaleString("en-GB")}; saving ${rentYr.toLocaleString("en-GB")} − ${coldRunYr.toLocaleString("en-GB")} = ${coldSaving.toLocaleString("en-GB")} a year.`,
  });
});
