// W4b: tourism.patterns-trends (both boards; items untagged unless Zimbabwe-specific). All datasets are illustrative.
// Real figure used only in the lesson: about 1.5 billion international arrivals in 2019 (UN tourism agency, rounded).
// Computed: monthly total 660, mean 55, peak ratio 77/55 = 1.4, Jul-Sep share 33.2%, spend US$300, growth 10%; origin shares 60.0 / 21.4.
import { concept, P, geographyLevels, chk, rnd, mean, sum, ZIM } from "../lib.mjs";
import { mc, tbl } from "../tables/w4b-_q.mjs";

const M = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const A = [38, 36, 42, 52, 58, 55, 70, 77, 72, 65, 44, 51];
const total = chk(sum(A), 660);
const avg = chk(mean(A), 55);
const peakRatio = chk(Math.max(...A) / avg, 1.4, 1e-9);
const peakShare = rnd(((A[6] + A[7] + A[8]) / total) * 100, 1, 33.2, "peakShare");
const spend = chk(198e6 / 660e3, 300, 1e-9);
const growth = chk(((726 - 660) / 660) * 100, 10, 1e-9);
const range = chk(Math.max(...A) - Math.min(...A), 41);
const MT = tbl(["Month", "Arrivals (thousands)"], M.map((m, i) => [m, A[i]]));
const O = [["Africa", 420], ["Europe", 150], ["Americas", 70], ["Asia", 50], ["Other", 10]];
const oTot = chk(sum(O.map((o) => o[1])), 700);
const afr = chk((420 / oTot) * 100, 60, 1e-9);
const eur = rnd((150 / oTot) * 100, 1, 21.4, "eur");
const OT = tbl(["Region of origin", "Arrivals (thousands)"], O);

concept("ageo.tourism.patterns-trends", { file: "tourism/patterns-trends", keyPrefix: "tourism.patterns-trends" }, (b) => {
  mc(b, 1, "RECALL", "What does seasonality in tourism mean?", [
    ["Regular variation in tourist numbers during the year", "Correct: there are peak and low seasons."],
    ["The permanent closure of a resort after one year", "That is not seasonality."],
    ["A rise in the price of tourist flights over each decade", "That is a price trend."],
    ["The number of hotels built in a national park", "That is accommodation supply."],
  ], "**Seasonality** is the regular yearly variation in tourist numbers.");
  mc(b, 2, "UNDERSTANDING", "Which type of tourism is described by walking safaris that conserve wildlife and benefit local communities?", [
    ["Ecotourism", "Correct: it is responsible travel to natural areas."],
    ["Business tourism", "Business tourism is for meetings and conferences."],
    ["Medical tourism", "Medical tourism is travel for treatment."],
    ["Mass tourism", "Mass tourism involves large numbers and is seldom conservation based."],
  ], "**Ecotourism** conserves nature and supports local people.");
  mc(b, 2, "UNDERSTANDING", "Which is a human factor that has increased international tourism?", [
    ["Cheaper flights and online booking", "Correct: transport and ICT make travel easier."],
    ["The tilt of the Earth's axis towards the Sun", "This is a physical factor."],
    ["The shape of a coastline", "This is a physical factor."],
    ["The position of the Tropics", "This is a physical factor."],
  ], "**Transport and ICT** are human factors that increased travel.");
  mc(b, 3, "APPLICATION", "Wildlife viewing in Hwange National Park is best in the dry season. How does this affect tourist numbers?", [
    ["Arrivals tend to be higher in the dry months than in the wet months", "Correct: animals gather at waterholes and viewing is easier."],
    ["Arrivals are constant throughout the year", "Seasonality causes variation."],
    ["Arrivals are highest in the wettest months of the year", "Visibility and access are poorer then."],
    ["Arrivals cannot be affected by the weather", "Weather affects wildlife viewing."],
  ], "Climate causes **seasonal peaks** in the dry months.", { hints: ["Think about where animals are found in the dry season."] });
  mc(b, 3, "ANALYSIS", "A resort earns more from 5 000 high-spending visitors than from 20 000 low-spending visitors. Which statement is correct?", [
    ["Value depends on spending per visitor as well as the number of visitors", "Correct: volume and value are different measures."],
    ["Value always rises as the number of visitors rises, whatever they spend", "High numbers may bring little spending."],
    ["Volume is measured in US dollars", "Volume is measured in arrivals."],
    ["Only the volume of tourism affects a destination", "Value matters too."],
  ], "**Volume** (arrivals) and **value** (receipts) are different.", { hints: ["Compare number of visitors with money earned."] });
  mc(b, 4, "EVALUATION", "A destination's arrivals fell by about three-quarters in a year because of a global health crisis. Which conclusion is most reasonable?", [
    ["Tourism is exposed to events beyond local control", "Correct: shocks can reduce demand sharply."],
    ["The destination's attractions suddenly disappeared", "The attractions remained; travel stopped."],
    ["Tourists permanently lost interest in travelling", "Tourism later recovered."],
    ["Domestic tourism cannot exist in a crisis", "Domestic travel often continues."],
  ], "Tourism is **vulnerable to external shocks**.", { hints: ["Ask what changed: the place or the ability to travel?"] });
  b.tf({ d: 1, skill: "RECALL", stem: "Domestic tourism is travel by residents within their own country.", answer: true,
    feedbackTrue: "Correct: that is the meaning of domestic or national tourism.",
    feedbackFalse: "Not so: domestic tourists are residents travelling at home.",
    explanation: "Domestic tourism is travel within the visitor's own country." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Low seasons can cause seasonal unemployment in the tourism industry.", answer: true,
    feedbackTrue: "Correct: fewer visitors means fewer jobs for hotel and tour staff.",
    feedbackFalse: "Not so: when few visitors arrive many seasonal workers lose work.",
    explanation: "Fewer visitors in the low season reduces demand for workers." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "The number of tourists who arrive is called the {{blank:a}} of tourism, while the money they spend is its {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["volume"], choices: ["volume", "value", "price"] },
      { id: "b", accepted: ["value"], choices: ["value", "volume", "season"] },
    ], explanation: "**Volume** is arrivals; **value** is receipts." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each type of tourism to an example.",
    pairs: [
      ["Business tourism", "Attending a conference in Harare"],
      ["Recreational and sport tourism", "Tiger-fishing on Lake Kariba"],
      ["Cultural and heritage tourism", "Visiting Great Zimbabwe"],
      ["Medical tourism", "Travelling abroad for treatment"],
    ], explanation: "Each type has a typical activity." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, unit: "units",
    stem: `Monthly tourist arrivals at a destination are shown (illustrative data).\n\n${MT}\n\nCalculate the mean number of arrivals per month, in thousands.`,
    hints: ["Add the twelve values and divide by 12."],
    value: avg, wrong: [660, 77],
    explanation: "Total = 660 thousand; mean = 660 ÷ 12 = **55 thousand**. The value 660 is the total." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "%", dp: 1,
    stem: "Using the monthly data (total 660 thousand; July 70, August 77, September 72), calculate the percentage of the year's arrivals that came in July, August and September, to 1 decimal place.",
    hints: ["Add the three months.", "Divide by the total and multiply by 100."],
    value: peakShare, wrong: [219, 25],
    explanation: "(70 + 77 + 72) = 219. 219 ÷ 660 × 100 = **33.2%**. The value 25 is the share expected if arrivals were equal across three months." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "US$",
    stem: "Visitors to a destination spent US\\$198 million in a year and arrivals were 660 thousand. Calculate the average spending per arrival, in US\\$.",
    hints: ["Divide receipts by arrivals; use the same units."],
    value: spend, wrong: [0.3, 3000],
    explanation: "1. Receipts = 198 000 000 and arrivals = 660 000.\n2. 198 000 000 ÷ 660 000 = **US\\$300**." });
  b.short({ d: 1, skill: "RECALL", stem: "Give the term for travel by residents of a country within their own country.",
    accepted: ["domestic tourism", "national tourism", "internal tourism", "domestic"], wrong: ["international tourism"],
    explanation: "**Domestic** (national) tourism." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the Zimbabwean waterfall and World Heritage Site on the Zambezi that is the country's best-known tourist attraction.",
    accepted: ["Victoria Falls", "the Victoria Falls", "Mosi-oa-Tunya", "Mosi oa Tunya"], wrong: ["Mana Pools"],
    explanation: "**Victoria Falls**." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain two physical and two human reasons why tourist numbers vary through the year at a safari destination.",
    hints: ["Physical: climate and wildlife. Human: holidays and events."],
    points: [
      "Physical: in the dry season animals gather at water, so viewing is better and arrivals increase.",
      "Physical: in the wet season roads flood, grass is long and heat or storms reduce comfort, so arrivals fall.",
      "Human: school and public holidays in source countries create peaks.",
      "Human: events, conferences and prices change demand through the year.",
    ],
    modelAnswer: "In the dry season animals gather at water, so viewing is better and arrivals increase, while in the wet season roads flood and grass is long, so arrivals fall. School and public holidays in source countries create peaks, and events, conferences and prices change demand through the year.",
    explanation: "Two physical and two human causes." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how the growth of low-cost airlines and online booking has changed tourism.",
    hints: ["Think about price, convenience and choice."],
    points: [
      "Cheaper flights make travel affordable to more people and increase short breaks.",
      "Online booking lets tourists compare and book accommodation and tours directly.",
      "It opens new destinations to tourists and reduces the role of travel agents.",
    ],
    modelAnswer: "Cheaper flights make travel affordable to more people and increase short breaks. Online booking lets tourists compare and book accommodation and tours directly, which opens new destinations and reduces the role of travel agents.",
    explanation: "Lower cost, easier booking and wider choice." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: `Using the monthly arrivals data, describe the seasonal pattern and suggest one reason for it.\n\n${MT}`,
    hints: ["Quote the highest and lowest months and the trend."],
    points: [
      "Arrivals are lowest in February (36 thousand) and January (38 thousand).",
      "They rise to a peak in August (77 thousand), with July to September all above 70 thousand.",
      "There is a smaller rise in December (51 thousand) after a dip in November (44 thousand).",
      "Reason: the dry season gives good wildlife viewing and school holidays in source countries add visitors.",
    ],
    modelAnswer: "Arrivals are lowest in February (36 thousand) and January (38 thousand), then rise to a peak in August (77 thousand), with July to September all above 70 thousand. There is a smaller rise in December (51 thousand) after a dip in November (44 thousand). The dry season gives good wildlife viewing and school holidays in source countries add visitors.",
    explanation: "Quote values for lowest, highest and the trend, then give a reason." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: `Monthly tourist arrivals at a destination (illustrative data).\n\n${MT}`,
    hints: ["Share = part ÷ total × 100.", "Think of climate and holidays."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage of the year's arrivals that came in July, August and September, to 1 decimal place.", value: peakShare, dp: 1, unit: "%", wrong: [219, 25],
        explanation: "219 ÷ 660 × 100 = 33.2%." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the range of monthly arrivals, in thousands.", value: range, unit: "units", wrong: [77, 36],
        explanation: "77 − 36 = 41 thousand." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why arrivals are highest in the middle of the year.",
        points: [
          "The dry season gives good game viewing and comfortable weather.",
          "School holidays and leave in source countries add visitors.",
          "Roads and parks are accessible, so tourists can travel easily.",
        ],
        modelAnswer: "The dry season gives good game viewing and comfortable weather, school holidays and leave in source countries add visitors, and roads and parks are easy to reach.",
        explanation: "Climate, holidays and access." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two ways of attracting more visitors in the low season.",
        points: [
          "Lower prices and package deals for off-peak months.",
          "Events, conferences and festivals that do not depend on the weather.",
        ],
        modelAnswer: "Lower prices and package deals for off-peak months, and events, conferences and festivals that do not depend on the weather.",
        explanation: "Prices and events reduce seasonality." }),
    ], explanation: "Calculate seasonality measures and explain the pattern." });

  b.struct({ d: 4, skill: "EVALUATION",
    stem: `Visitors to a southern African country in one year came from the following regions (data invented for this exercise).\n\n${OT}`,
    hints: ["Total = 700 thousand.", "Think about distance, cost and shared borders."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage of arrivals from Africa.", value: afr, unit: "%", wrong: [420, 70],
        explanation: "420 ÷ 700 × 100 = 60%." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the percentage of arrivals from Europe, to 1 decimal place.", value: eur, dp: 1, unit: "%", wrong: [150, 17.9],
        explanation: "150 ÷ 700 × 100 = 21.4%." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why most visitors come from other African countries.",
        points: [
          "Neighbouring countries are close, so travel by road is cheap and quick.",
          "Many visitors come to see family, to shop or for business, as well as leisure.",
          "Long-haul flights from Europe, the Americas and Asia are expensive and take longer.",
        ],
        modelAnswer: "Neighbouring countries are close, so road travel is cheap and quick. Many visitors come to see family, to shop or for business, while long-haul flights from other continents are expensive and take longer.",
        explanation: "Distance, purpose and cost." }),
      P.manual({ label: "(d)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Assess the importance of long-haul tourists to the country's tourism industry.",
        points: [
          "Long-haul tourists are fewer (about 40% of arrivals) but usually spend more per visit.",
          "They stay longer and use lodges, guides and flights, which supports jobs.",
          "They are sensitive to cost of flights, safety and global events.",
          "Regional visitors are more numerous and more stable but spend less.",
          "Judgement: both are needed; long-haul visitors add value, regional visitors add volume and stability.",
        ],
        wordLimit: { max: 180 },
        modelAnswer: "Long-haul tourists are fewer, about 40% of arrivals, but usually spend more and stay longer, using lodges, guides and flights, which supports jobs. They are sensitive to the cost of flights, safety and global events, whereas regional visitors are more numerous and stable but spend less. I conclude that both are needed: long-haul visitors add value and regional visitors add volume and stability.",
        explanation: "Weigh value against volume and stability." }),
    ], explanation: "Calculate shares of arrivals by origin and assess the importance of long-haul markets." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Evaluate the importance of transport and information technology in explaining the growth of international tourism.",
    hints: ["Give the effects of each and then other factors.", "Reach a judgement."],
    points: [
      "Cheaper, faster flights and low-cost airlines make long-distance travel affordable.",
      "Better roads, rail and airports increase access to remote attractions.",
      "Online booking, maps and reviews reduce costs and make independent travel easy.",
      "Social media advertises destinations and attracts new visitors.",
      "Rising incomes, paid leave and a growing middle class in emerging economies create demand.",
      "Safety, political stability and pandemics can reduce travel whatever the transport.",
      "Government policy, marketing and visa rules open or close markets.",
      "Judgement: transport and ICT made growth possible, but income, safety and policy decide where and how fast it occurs.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Cheaper, faster flights and low-cost airlines have made long-distance travel affordable, and better roads, rail and airports have increased access to remote attractions. Online booking, maps and reviews reduce costs and make independent travel easy, while social media advertises destinations. However, rising incomes, paid leave and a growing middle class in emerging economies create the demand, and safety, political stability and pandemics can reduce travel whatever the transport. Government marketing and visa rules open or close markets. I conclude that transport and ICT made growth possible, but income, safety and policy decide where and how fast it occurs.",
    wordLimit: { max: 300 }, explanation: "Weigh transport and ICT against other factors and judge." });
  b.short({ d: 3, skill: "UNDERSTANDING", applies: ZIM, stem: "Name the national body that promotes Zimbabwe as a tourist destination and grades tourist facilities (give its full name or its acronym).",
    hints: ["It is a statutory authority with three letters."],
    accepted: ["Zimbabwe Tourism Authority", "ZTA", "the Zimbabwe Tourism Authority"], wrong: ["EMA"],
    explanation: "The **Zimbabwe Tourism Authority (ZTA)**." });

  b.card("DEFINITION", "Tourism", "Movement of people to places outside their usual environment for leisure, business or other purposes, for less than a year.");
  b.card("DEFINITION", "Seasonality", "Regular variation in tourist numbers through the year, with peak and low seasons.");
  b.card("CONCEPT", "Volume and value of tourism", "Volume is the number of arrivals or visitor nights; value is receipts and spending per visitor.");
  b.card("CONCEPT", "Factors behind tourism patterns", "Transport and ICT, affordability, transnational corporations, government support, and image and safety.");
  b.card("FACT", "Types of tourism", "Business, recreational and sport, medical, ecotourism, and cultural and heritage tourism.");
  b.card("FACT", "World Heritage Sites in Zimbabwe", "Mana Pools (1984), Great Zimbabwe (1986), Khami (1986), Victoria Falls (1989) and Matobo Hills (2003).");
  b.card("FACT", "Global arrivals", "About 1.5 billion international tourist arrivals in 2019 (rounded), falling sharply in 2020 during the COVID-19 pandemic.");
  b.card("CONCEPT", "Why seasonality is a problem", "Low seasons mean unused hotels and seasonal unemployment; destinations use prices, events and conferences to spread demand.");
  b.card("FACT", "KAZA UniVisa", "A visa allowing visitors to travel between Zimbabwe and Zambia, including the Victoria Falls area, to support regional tourism.");
});
