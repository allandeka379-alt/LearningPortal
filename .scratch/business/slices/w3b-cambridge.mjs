// W3b exam-format items, Cambridge IGCSE Business 0264: Paper 1 (20 marks) and a complete Paper 2 case study (80 marks).
// Mark splits within parts are ours. All figures are fictional and computed below.
import { concept, P, CAM, money, table, f, round, r2, check } from "../lib.mjs";

// Sub-parts: a STRUCTURED part holding (i), (ii) ... answered by label path, e.g. "(a)(i)".
function group(label, stem, subs) {
  const marks = subs.reduce((t, x) => t + x.part.marks, 0);
  return { part: { label, type: "STRUCTURED", marks, stem, parts: subs.map((x) => x.part) }, model: null, wrong: [], subs };
}
function addSubResponses(q, groups) {
  const model = {};
  const wrong = {};
  for (const g of groups) {
    for (const x of g.subs) {
      if (x.model) model[g.part.label + x.part.label] = x.model;
      if (x.wrong[0]) wrong[g.part.label + x.part.label] = x.wrong[0];
    }
  }
  if (Object.keys(model).length) q.modelResponse = { type: "STRUCTURED", parts: { ...(q.modelResponse?.parts ?? {}), ...model } };
  if (Object.keys(wrong).length) q.wrongResponses = [{ type: "STRUCTURED", parts: { ...(q.wrongResponses?.[0]?.parts ?? {}), ...wrong } }];
  return q;
}

const LV6 = [
  [3, 5, 6, "Two points explained and clearly applied to the business."],
  [2, 3, 4, "Points explained with limited application."],
  [1, 1, 2, "Points identified with little explanation."],
];
const LV8P1 = [
  [3, 6, 8, "Both options analysed in context with a justified recommendation."],
  [2, 3, 5, "Some analysis of one or both options; recommendation weakly supported."],
  [1, 1, 2, "Simple points with no justified decision."],
];
const LV8 = [
  [3, 6, 8, "Two or more points explained and clearly applied to the business in the case."],
  [2, 3, 5, "Points explained with limited application to the case."],
  [1, 1, 2, "Points identified with little explanation or application."],
];
const LV12 = [
  [3, 9, 12, "Developed analysis of both options or sides, applied to the case, with a justified recommendation or conclusion."],
  [2, 5, 8, "Analysis of relevant points with some application; conclusion weakly supported."],
  [1, 1, 4, "Points identified or described with little application and no supported judgement."],
];

// ---- Paper 1 (20): coffee roaster ----
const cSurvey = [["Under US\\$4", 44], ["US\\$4 to US\\$5.99", 72], ["US\\$6 to US\\$7.99", 50], ["US\\$8 or more", 34]];
const cTot = cSurvey.reduce((s, r) => s + r[1], 0); // 200
check("cTot", cTot, 200);
const c6plus = cSurvey[2][1] + cSurvey[3][1]; // 84
const c6pct = (c6plus / cTot) * 100; // 42
const cFixed = 2200, cVc = 3.1, cQ = 1000;
const cAc = f.averageCost(f.totalCost(cFixed, f.totalVariableCost(cVc, cQ)), cQ); // 5.3
const cTbl = table(["Highest price willing to pay for a 250 g bag", "Number of people"], [...cSurvey, ["Total", cTot]]);

// ---- Paper 2 (80): Kopje Leather Ltd ----
const years = ["Year 1", "Year 2", "Year 3", "Year 4"];
const shoes = [410, 460, 470, 455]; // US$000
const bags = [0, 35, 80, 140]; // US$000
const totalY4 = shoes[3] + bags[3]; // 595
const bagGrowth = ((bags[3] - bags[2]) / bags[2]) * 100; // 75
const app1 = table(["Sales revenue (US\\$000)", ...years], [["School shoes", ...shoes], ["Leather bags", ...bags.map((x) => (x === 0 ? "-" : x))], ["Total", ...shoes.map((s, i) => s + bags[i])]]);
const bwS = [["Would buy a Zimbabwean leather bag", 132], ["Might buy", 108], ["Would not buy", 60]];
const bwT = bwS.reduce((s, r) => s + r[1], 0); // 300
const bwYes = (bwS[0][1] / bwT) * 100; // 44
const app2 = table(["Survey of 300 shoppers in Gaborone (carried out by a student researcher)", "Number"], [...bwS, ["Total", bwT]]);
const outNow = 1450, wNow = 25, outCam = 2100, wCam = 20;
const lpNow = f.labourProductivity(outNow, wNow); // 60
const lpCam = f.labourProductivity(outCam, wCam); // 105
const rejNow = 6, rejCam = 2; // %
const app3 = table(["Cutting and stitching (per week)", "Now (hand cutting)", "Trial of CAD/CAM cutting"], [["Pairs of shoes made", outNow.toLocaleString("en-GB"), outCam.toLocaleString("en-GB")], ["Workers", wNow, wCam], ["Labour productivity (pairs per worker)", lpNow, lpCam], ["Shoes rejected at final inspection", `${rejNow}%`, `${rejCam}%`], ["Cost of machine", "-", "US\\$120,000"]]);
const sites = [["Monthly rent", 6000, 3800], ["Monthly transport of hides and finished goods", 2700, 3700], ["Distance from tannery", "40 km", "2 km"], ["Distance from main customers (Bulawayo shops and schools)", "3 km", "60 km"]];
const totA = 6000 + 2700, totB = 3800 + 3700; // 8700, 7500
const app4 = table(["", "Present site (Bulawayo city)", "Proposed site (near the tannery)"], [...sites, ["Rent + transport per month", totA, totB]]);

concept("bus.operations.location", { file: "exam/w3b-cambridge", keyPrefix: "exam.w3b-cambridge", applies: CAM }, (b) => {
  // ---- Paper 1 ----
  const pA = group("(a)", "Answer both parts.", [
    P.mcq({
      label: "(i)", stem: "Which of these is an example of secondary market research for Nyasha?",
      options: [["Reading a trade report on coffee sales", "Correct: data collected by others."], ["Asking shoppers to taste her coffee", "That is primary research."], ["Holding a focus group with café owners", "That is primary research."], ["Counting customers at a rival's stall", "Observation is primary research."]],
      answer: "A",
    }),
    P.num({ label: "(ii)", marks: 1, stem: "Using the table, calculate the number of people who would pay US\\$6 or more.", kind: "units", value: c6plus, wrong: [cSurvey[3][1]] }),
  ]);
  const pB = group("(b)", "Use the table and the cost information.", [
    P.num({
      label: "(i)", marks: 2, stem: "Calculate the percentage of people surveyed who would pay US\\$6 or more.",
      kind: "pct", dp: 0, value: c6pct, wrong: [round((cSurvey[2][1] / cTot) * 100, 0)],
      explanation: `${c6plus} ÷ ${cTot} × 100 = ${c6pct}%.`,
    }),
    P.num({
      label: "(ii)", marks: 2, stem: `Nyasha expects to sell ${cQ.toLocaleString("en-GB")} bags a month. Fixed costs are ${money(cFixed)} a month and the variable cost is ${money(cVc)} a bag. Calculate the average cost of one bag.`,
      kind: "money", value: cAc, wrong: [cVc, r2(cFixed / cQ)],
      explanation: `(${money(cFixed)} + ${money(cVc)} × ${cQ.toLocaleString("en-GB")}) ÷ ${cQ.toLocaleString("en-GB")} = ${money(cAc)}.`,
    }),
  ]);
  const pC = P.manual({
    label: "(c)", marks: 6, type: "EXTENDED_RESPONSE",
    stem: "Explain **two** ways Nyasha could promote her coffee to tourists.",
    points: [
      ["Way 1 identified, e.g. tastings at hotels and lodges / point-of-sale displays in gift shops.", 1],
      ["Explained: tourists try the coffee and buy it as a gift / see it where they shop.", 1],
      ["Applied to tourists in the Eastern Highlands / Victoria Falls.", 1],
      ["Way 2 identified, e.g. social media with photographs of the farm / targeted online adverts / leaflets in tourist information centres.", 1],
      ["Explained: reaches tourists before and during their trip; the farm story builds a premium image.", 1],
      ["Applied to the case.", 1],
    ],
    levels: LV6,
    modelAnswer: "Nyasha could offer free tastings at hotels and lodges in the Eastern Highlands, so that tourists experience the quality of the coffee and buy bags to take home as gifts. She could also post photographs and short videos of the farm on social media and pay for adverts targeted at people planning trips to Zimbabwe, so tourists learn about her coffee before they arrive and see it as a premium local product.",
  });
  const pD = P.manual({
    label: "(d)", marks: 8, type: "EXTENDED_RESPONSE",
    stem: "Nyasha is considering price skimming or competitive pricing for her coffee. Recommend which method she should use. Justify your answer.",
    points: [
      ["Skimming: high price supports premium image for a unique local product sold to tourists.", 2],
      [`Uses data: ${c6pct}% would pay US\\$6 or more; well above the average cost of ${money(cAc)}.`, 2],
      ["Competitive pricing: attracts the larger group paying under US\\$6, but low margin and less premium image.", 2],
      ["Justified recommendation (e.g. skimming / premium price around US\\$6-8 for tourists).", 2],
    ],
    levels: LV8P1,
    modelAnswer: `A skimming price suits a single-estate coffee sold to tourists, who see it as a special local product. The survey shows that ${c6pct}% would pay US\\$6 or more, well above the average cost of ${money(cAc)}, so a high price gives a large profit on each bag. Competitive pricing below US\\$6 would attract more of the people surveyed, but each bag would earn far less, and a low price could damage the image of a premium product. Nyasha should use a skimming price of about US\\$7 for tourists, because the profit per bag is high and enough customers are willing to pay it; she can lower the price later if rivals appear.`,
  });
  addSubResponses(b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1350, paper: "Paper 1", calculator: true,
    concepts: ["bus.marketing.market-research", "bus.marketing.price", "bus.marketing.promotion"],
    stem: `Nyasha roasts and packs coffee grown on her family's farm in the Eastern Highlands. She wants to sell 250 g bags to tourists in hotels and gift shops. She asked 200 tourists the highest price they would pay.\n\n${cTbl}`,
    parts: [pA, pB, pC, pD],
    hints: ["(a)(ii) Add the last two rows.", "(b)(ii) Total cost ÷ number of bags."],
    explanation: `(a)(i) A trade report. (a)(ii) ${c6plus}. (b)(i) ${c6pct}%. (b)(ii) ${money(cAc)}. (c) Tastings, displays, social media. (d) A justified pricing method.`,
    workedSolution: `1. People paying US\\$6 or more = ${cSurvey[2][1]} + ${cSurvey[3][1]} = ${c6plus}.\n2. ${c6plus} ÷ ${cTot} × 100 = ${c6pct}%.\n3. Total cost = ${cFixed} + ${cVc} × ${cQ} = ${f.totalCost(cFixed, cVc * cQ)}; average cost = ${f.totalCost(cFixed, cVc * cQ)} ÷ ${cQ} = ${cAc.toFixed(2)}.`,
  }), [pA, pB]);

  // ---- Paper 2 (80) ----
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 5400, paper: "Paper 2", calculator: true,
    concepts: [
      "bus.operations.location", "bus.operations.quality", "bus.operations.technology", "bus.operations.sustainability",
      "bus.marketing.market-research", "bus.marketing.foreign-markets",
      "bus.marketing.product-life-cycle", "bus.marketing.price", "bus.marketing.promotion", "bus.marketing.marketing-strategy",
    ],
    stem: [
      "**Kopje Leather Ltd** (a fictional business)",
      "",
      "Kopje Leather Ltd (KL) is a private limited company in Bulawayo that makes school shoes and, since Year 2, leather handbags and laptop bags. It was founded by Sipho Ndlovu thirty years ago and is now run by his daughter Thandeka, the Managing Director. KL employs 140 workers, many of them skilled machinists who have worked for the company for many years. Its factory is in an old building close to the city centre.",
      "",
      "**School shoes.** KL's school shoes are sold through shoe shops and directly to schools, which buy in bulk for their pupils. The shoes are known for being strong, and KL has a good reputation with schools. However, sales growth has stopped (see Appendix 1). Two larger rivals now sell cheaper school shoes, some made from synthetic materials, and imported shoes are sold at low prices in many markets. Thandeka's Marketing Manager, Rudo Moyo, believes school shoes have reached the maturity stage of their life cycle. She wants to introduce a lighter, more modern design and to sell to schools in other provinces, but Thandeka worries that this will cost money at a time when the company also needs new machinery.",
      "",
      "**Leather bags.** KL started making bags in Year 2 to use leather left over from shoe production. Sales have grown quickly, especially of laptop bags bought by young professionals and university students. KL sells the bags in its own small factory shop, in two gift shops at Victoria Falls and through a social media page. Rudo thinks the bags could become KL's main product. She wants to launch a range of high-quality handbags with a new brand name for young working women, but has not yet decided on the price, where to sell them or how to promote them. A rival company sells similar bags at high prices in upmarket shopping centres in Harare.",
      "",
      "**Selling in Botswana.** A department store in Gaborone has asked whether it could sell KL's bags. A student researcher, paid by KL, asked 300 shoppers in Gaborone whether they would buy a Zimbabwean leather bag (Appendix 2). Thandeka is interested, because selling abroad would spread the company's risk, but she knows little about Botswana's import rules, how the store would pay or how the bags should be priced there. The Finance Director, Farai Chikore, reminds the board that the survey was small and was carried out in only two shopping centres.",
      "",
      "**Production and quality.** All shoes are cut by hand from paper patterns and then stitched. Inspectors check every pair at the end of the line, and about 6% are rejected, mostly because of uneven cutting. Customers sometimes return shoes whose stitching has come loose. Last month KL tried a computer-aided design and manufacture (CAD/CAM) cutting machine on loan from a supplier (Appendix 3). The machine cuts leather accurately and wastes less of it, but it costs US\\$120,000 and five fewer workers would be needed in the cutting section. The workers' representative has warned that staff are worried about their jobs. Thandeka is also considering replacing end-of-line inspection with quality assurance, in which every worker checks their own work and small teams meet each week to discuss problems.",
      "",
      "**Sustainability.** Leather production uses a great deal of water and chemicals. KL's offcuts and old stock are burned or thrown away. Some buyers from Europe who visited the Victoria Falls shops asked whether KL uses sustainable methods. Thandeka believes that making more use of leather offcuts, recycling water and using solar power could save money and help sell bags to tourists and foreign stores, but the board is not sure that customers will pay more for sustainable products.",
      "",
      "**Location.** KL's lease on its city-centre building ends in two years. The landlord plans to raise the rent. KL could move to a site next to the tannery that supplies its leather, outside the city (Appendix 4). The new site is cheaper and would have room for the CAD/CAM machine and solar panels, but it is far from KL's main customers and many workers would have a long journey to work. The Production Manager, Tendai Sibanda, says the move would cause about a month of lost production.",
      "",
      "**People.** KL's workers are proud of the company's reputation, and labour turnover has always been low. Many machinists have learned their skills at KL over many years and train new staff themselves. Thandeka believes that this experience is one of KL's greatest strengths, and she does not want to lose it. However, younger workers have asked for more chances to take responsibility, and the workers' representative has suggested that staff should be consulted before any major change. Thandeka has promised that no decision on the CAD/CAM machine or the move will be made without first explaining it to the workforce.",
      "",
      "**Finance.** Farai has explained that KL could pay for one major project from its retained profit, but that two or more projects at the same time would need a bank loan. Interest rates are high, and the bank would want KL's machinery as security. He has asked each manager to explain which project would bring the greatest benefit for the money spent. Rudo argues that the handbags offer the fastest growth; Tendai argues that the machine and quality improvements come first, because a strong product is the basis of every marketing plan.",
      "",
      "The board meets next month. It must decide how to improve production and quality, whether to move, how to market the new handbags, and whether to start selling in Botswana. Thandeka knows that KL cannot afford to do everything at once.",
      "",
      `**Appendix 1: Sales revenue**\n\n${app1}`,
      "",
      `**Appendix 2: Market research in Botswana**\n\n${app2}`,
      "",
      `**Appendix 3: Production data**\n\n${app3}`,
      "",
      `**Appendix 4: Comparison of sites**\n\n${app4}`,
    ].join("\n"),
    parts: [
      group("(1)", "Question 1", [
        P.manual({
          label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
          stem: "Explain **two** limitations of the market research KL used to decide whether to sell its bags in Botswana.",
          points: [
            ["Identifies: small or unrepresentative sample.", 1],
            ["Explains: may not represent all shoppers in Botswana, so demand may be misjudged.", 1],
            ["Applies: only 300 shoppers in two Gaborone shopping centres; Farai's concern.", 2],
            ["Identifies: people may not do what they say / question did not ask about price.", 1],
            ["Explains: stated intentions are not actual purchases; no information on price, design or competitors.", 1],
            [`Applies: ${round(bwYes, 0)}% said they would buy, but at what price compared with local bags is unknown.`, 2],
          ],
          levels: LV8,
          modelAnswer: `First, the sample was small and narrow: only ${bwT} shoppers in two shopping centres in Gaborone were asked, so they may not represent shoppers elsewhere in Botswana or the department store's customers, as Farai warned. Second, the survey only asked whether people would buy a Zimbabwean leather bag. ${round(bwYes, 0)}% said they would, but people often do not buy what they say they will, and the survey said nothing about the price they would pay, the designs they prefer or the bags they buy now. KL therefore cannot forecast sales or set a price in Botswana from these results.`,
        }),
        P.manual({
          label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
          stem: "Thandeka could sell the bags in Botswana through the Gaborone department store or not enter the market yet. Recommend which option KL should choose. Justify your answer.",
          points: [
            ["Benefits of selling: new customers, spreads risk, bag sales growing fast (from US\\$80,000 to US\\$140,000).", 2],
            ["The store gives an outlet and local knowledge (acts like a distributor), reducing entry problems.", 2],
            ["Problems: import rules, labelling, payment and currency risk, pricing unknown, transport costs.", 2],
            ["Research is limited; KL also faces other demands on money and managers (machine, relocation, new handbags).", 2],
            ["Ways to reduce risk: small trial order, payment in advance, more research, adapt labels and prices.", 2],
            ["Justified recommendation.", 2],
          ],
          levels: LV12,
          modelAnswer: `Selling through the Gaborone store would give KL new customers and spread risk, and bag sales are already growing fast, from US\\$80,000 in Year 3 to US\\$140,000 in Year 4, a rise of ${round(bagGrowth, 0)}%. The store already has customers and knows the market, which avoids the cost of opening a shop. However, KL does not know Botswana's import rules, how it would be paid, or what price to charge, and its research is limited. It is also deciding whether to buy a US\\$120,000 machine, to relocate and to launch new handbags, so managers and money are stretched. KL should accept the store's offer, but only as a small trial order with payment in advance and with labels checked against Botswana's rules. This tests real demand at low risk, and KL can expand if the bags sell.`,
        }),
      ]),
      group("(2)", "Question 2", [
        P.manual({
          label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
          stem: "Explain **two** benefits to KL of buying the CAD/CAM cutting machine.",
          points: [
            ["Identifies: higher labour productivity.", 1],
            ["Explains: more output per worker, lower labour cost per pair.", 1],
            [`Applies: from ${lpNow} to ${lpCam} pairs per worker a week (Appendix 3).`, 2],
            ["Identifies: better quality / less waste.", 1],
            ["Explains: accurate cutting, fewer rejects, less leather wasted, fewer returns, better reputation.", 1],
            [`Applies: rejects fall from ${rejNow}% to ${rejCam}%; uneven cutting was the main cause.`, 2],
          ],
          levels: LV8,
          modelAnswer: `First, the machine raises labour productivity. In the trial, ${wCam} workers made ${outCam.toLocaleString("en-GB")} pairs a week, ${lpCam} pairs each, compared with ${lpNow} pairs each by hand, so the labour cost of each pair falls and KL can make more shoes and bags without more staff. Second, it improves quality. Most rejects are caused by uneven hand cutting, and in the trial the reject rate fell from ${rejNow}% to ${rejCam}%. Fewer rejected and returned shoes mean less wasted leather and labour and protect KL's reputation with schools.`,
        }),
        P.manual({
          label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
          stem: "Should KL replace end-of-line inspection (quality control) with quality assurance? Justify your answer.",
          points: [
            ["Quality control finds faults after leather and labour are wasted; 6% rejected; returns of loose stitching show faults are missed.", 2],
            ["Quality assurance prevents faults at each stage; workers check their own work; weekly teams (quality circles) find causes.", 2],
            ["Motivation: responsibility and involvement; skilled long-serving staff know the work.", 2],
            ["Costs and problems: training, time for meetings, workers worried about jobs may resist; takes time to work.", 2],
            ["Links to the machine: CAD/CAM solves cutting faults, but stitching faults need QA.", 2],
            ["Justified conclusion (e.g. introduce QA, keep a final check during the change).", 2],
          ],
          levels: LV12,
          modelAnswer: "At present inspectors reject about 6% of shoes at the end of the line, after leather and labour have been wasted, and some faulty stitching still reaches customers. Quality assurance would make each worker check their own stage, and weekly team meetings would let experienced machinists find and remove the causes of faults, which should reduce waste and returns and give staff more responsibility. However, workers already worried about job losses may see it as extra pressure, training and meetings cost time, and results take months. The CAD/CAM machine would solve cutting faults, but loose stitching needs better checks during production. KL should introduce quality assurance, explaining to staff that it is about quality not job cuts, and keep a final inspection until reject rates and returns have clearly fallen.",
        }),
      ]),
      group("(3)", "Question 3", [
        P.manual({
          label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
          stem: "Explain **two** ways KL could make its production more sustainable.",
          points: [
            ["Identifies: reduce waste / reuse or recycle leather offcuts.", 1],
            ["Explains: offcuts made into small products (purses, key rings) instead of being burned.", 1],
            ["Applies: offcuts are now burned; bags themselves began as a use of leftover leather; extra revenue.", 2],
            ["Identifies: recycle water / use solar power.", 1],
            ["Explains: lower water and electricity costs, less pollution, production during power cuts.", 1],
            ["Applies: leather uses much water; new site has room for panels; European buyers asked.", 2],
          ],
          levels: LV8,
          modelAnswer: "First, KL could reuse leather offcuts instead of burning them, making small items such as purses and key rings. This reduces waste and creates extra revenue, as the bag range itself did when it began by using leftover leather. Second, KL could recycle the water used in production and install solar panels, which would cut water and electricity bills, reduce pollution and keep machines running during power cuts. These steps would also answer the questions of European buyers at Victoria Falls who want to know whether KL produces sustainably.",
        }),
        P.manual({
          label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
          stem: "Should KL move its factory to the site next to the tannery? Justify your answer.",
          points: [
            [`Uses data: rent + transport ${money(totA)} now vs ${money(totB)}; saving ${money(totA - totB)} a month (more after the rent rise).`, 2],
            ["Near raw materials (hides from the tannery, 2 km); room for CAD/CAM and solar panels.", 2],
            ["Far from main customers (60 km): delivery costs and service to schools and shops; transport costs already higher in Appendix 4.", 2],
            ["Workers' long journeys: risk of losing skilled machinists; morale already low over jobs.", 2],
            ["One month of lost production; moving costs; timing with other decisions.", 2],
            ["Justified recommendation.", 2],
          ],
          levels: LV12,
          modelAnswer: `The tannery site would cut rent and transport from ${money(totA)} to ${money(totB)} a month, a saving of ${money(totA - totB)}, and the saving will grow when the city landlord raises the rent. It is 2 km from KL's supplier of hides and has room for the CAD/CAM machine and solar panels. However, it is 60 km from the schools and shops that buy KL's products, so delivery takes longer, and many skilled machinists may not be willing to travel so far, at a time when they are already worried about their jobs. The move would also cost about a month of production. Because the monthly saving is fairly small compared with the risk of losing skilled staff and customers, KL should move only if it can provide transport for workers and plan the move for the school holidays, when demand for shoes is lowest; otherwise it should look for a cheaper site within Bulawayo.`,
        }),
      ]),
      group("(4)", "Question 4", [
        P.manual({
          label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
          stem: "Explain **two** ways KL could extend the life cycle of its school shoes.",
          points: [
            ["Identifies: change the product (lighter, modern design).", 1],
            ["Explains: renews interest and competes with cheaper, more modern rivals.", 1],
            [`Applies: sales flat at about US\\$${shoes[2]},000-${shoes[3]},000 and falling in Year 4 (Appendix 1); Rudo's idea.`, 2],
            ["Identifies: new markets (schools in other provinces).", 1],
            ["Explains: more customers for the existing product; uses KL's reputation with schools.", 1],
            ["Applies: bulk orders from schools; KL's strong, long-lasting shoes.", 2],
          ],
          levels: LV8,
          modelAnswer: `School shoe sales rose to US\\$${shoes[2]},000 in Year 3 but fell to US\\$${shoes[3]},000 in Year 4, which suggests maturity. First, KL could introduce a lighter, more modern design, as Rudo suggests, giving schools and parents a reason to choose KL rather than cheaper modern-looking rivals. Second, KL could sell to schools in other provinces. Schools buy in bulk and value KL's strong shoes, so new regions would add sales of the existing product without the cost of a completely new one.`,
        }),
        P.manual({
          label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
          stem: "Recommend a marketing strategy for KL's new range of handbags for young working women. Justify your answer.",
          points: [
            ["Product: high-quality leather, modern designs, new brand name, attractive packaging; consistent with premium image.", 2],
            ["Price: premium / skimming-type price, in line with the rival's high prices; covers costs; supports quality image.", 2],
            ["Place: upmarket shops in Harare and Bulawayo, Victoria Falls gift shops, online through social media; not school-shoe outlets.", 2],
            ["Promotion: social media with targeted adverts, influencers, launch events; suits young professional women.", 2],
            [`Uses evidence: bag sales grew ${round(bagGrowth, 0)}% in Year 4; young professionals already buy laptop bags.`, 2],
            ["Justified overall recommendation; consistency of the mix and affordability given other spending.", 2],
          ],
          levels: LV12,
          modelAnswer: `KL's bags are its fastest-growing product, with sales up ${round(bagGrowth, 0)}% in Year 4, and young professionals already buy its laptop bags. The new handbags should be high-quality leather in modern designs under a new brand name, so they are not linked with school shoes, with packaging that suits gifts. The price should be high, close to the rival's prices in Harare, to signal quality and cover the cost of good leather. They should be sold in upmarket shops in Harare and Bulawayo, the Victoria Falls gift shops and online, where young working women shop. Promotion should focus on social media, with adverts targeted at women aged about 22 to 35 and a launch event, which is cheaper than broadcast media. This premium mix is consistent, but because KL must also pay for machinery and perhaps a move, it should launch a small range first and expand it as sales grow.`,
        }),
      ]),
    ],
    hints: ["Use the figures in the appendices in your answers.", "Every (b) part needs a justified decision."],
    explanation: "Each question needs application to KL: research limits and entering Botswana; technology and quality; sustainability and location; the product life cycle and a marketing strategy for the handbags.",
  });
});
