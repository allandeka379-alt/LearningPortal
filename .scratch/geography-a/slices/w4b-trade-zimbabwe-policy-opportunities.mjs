// W4b: trade.zimbabwe-policy-opportunities (ZIMSEC only). Neutral wording on policy; all figures illustrative; policies "to be verified".
// Computed: trader 600+80+70 = 750, profit 300, return 40%, margin 28.6%; honey net 1 800, payback 1.5 y, 5-year 6 300;
// trader B 800+60+90 = 950, sales 1 235, profit 285, return 30%; peanut butter net 2 700, payback 2.0, 5-year 8 100.
import { concept, P, geographyLevels, chk, rnd } from "../lib.mjs";
import { mc, tbl } from "../tables/w4b-_q.mjs";

const cost = chk(600 + 80 + 70, 750);
const profit = chk(1050 - cost, 300);
const ret = chk((profit / cost) * 100, 40, 1e-9);
const margin = rnd((profit / 1050) * 100, 1, 28.6, "margin");
const net = chk(4200 - 2400, 1800);
const payback = chk(2700 / net, 1.5, 1e-9);
const five = chk(5 * net - 2700, 6300);
const costB = chk(800 + 60 + 90, 950);
const profitB = chk(1235 - costB, 285);
const retB = chk((profitB / costB) * 100, 30, 1e-9);
const netP = chk(6600 - 3900, 2700);
const payP = chk(5400 / netP, 2, 1e-9);
const fiveP = chk(5 * netP - 5400, 8100);
const TT = tbl(["Item", "Amount (US\\$)"], [["Goods bought in Johannesburg", 800], ["Transport", 60], ["Duty and fees", 90], ["Sales in Harare", "1 235"]]);
const PT = tbl(["Item", "Amount (US\\$)"], [["Equipment (once)", "5 400"], ["Sales per year", "6 600"], ["Running costs per year", "3 900"]]);

concept("ageo.trade.zimbabwe-policy-opportunities", { file: "trade/zimbabwe-policy-opportunities", keyPrefix: "trade.zimbabwe-policy-opportunities" }, (b) => {
  mc(b, 1, "RECALL", "What is a tariff?", [
    ["A tax on imported goods", "Correct: it raises the price of imports."],
    ["A subsidy paid to exporters", "That is an export incentive."],
    ["A licence to open a shop", "That is a business licence."],
    ["A limit on the number of tourists", "That is a quota on visitors."],
  ], "A **tariff** is a tax on imports.");
  mc(b, 2, "UNDERSTANDING", "Which is a likely effect of cheap imported used clothing on Zimbabwe's economy?", [
    ["Local clothing factories lose sales and jobs", "Correct: they cannot compete with very low prices."],
    ["Demand for locally grown cotton rises sharply", "Falling factory demand reduces cotton demand."],
    ["Zimbabwe's foreign currency reserves increase", "Imports use foreign currency."],
    ["All consumers pay higher prices for clothes", "Used clothes are cheaper."],
  ], "Cheap imports **undercut** local producers.");
  mc(b, 2, "UNDERSTANDING", "Who are most informal cross-border traders in southern Africa?", [
    ["Small-scale traders, many of them women, moving goods in small quantities", "Correct: they supply households and shops."],
    ["Large mining companies shipping ore to ports", "That is large-scale formal trade."],
    ["Airline companies carrying business passengers between cities", "That is transport services."],
    ["Government departments buying fuel in bulk", "That is state procurement."],
  ], "Informal traders are **small-scale** and many are women.");
  mc(b, 3, "APPLICATION", "Which policy measure would most directly protect a local peanut-butter producer from cheaper imports?", [
    ["A tariff or restriction on imported peanut butter", "Correct: it raises the price of imports."],
    ["A subsidy for imported peanut butter", "This would make imports cheaper."],
    ["Removing all duties on imports of food and farm products", "This would increase import competition."],
    ["A ban on exports of peanut butter", "This does not protect against imports."],
  ], "Tariffs and restrictions **raise the price of imports**.", { hints: ["Ask what makes imports dearer."] });
  mc(b, 3, "ANALYSIS", "A group's cost-benefit analysis shows a payback period of 1.5 years for equipment that will last 6 years. What does this suggest?", [
    ["The equipment pays for itself well within its life", "Correct: 1.5 years is much shorter than 6 years."],
    ["The group will never recover the cost", "Payback within 1.5 years means the cost is recovered."],
    ["The enterprise will lose money in every year of the equipment's life", "Payback implies annual profit."],
    ["The equipment will fail after 1.5 years", "Its life is 6 years."],
  ], "A short payback relative to life is **favourable**.", { hints: ["Compare payback with the life of the equipment."] });
  mc(b, 4, "EVALUATION", "Which statement about restricting imports is most balanced?", [
    ["It may protect local firms but also raise prices and cut consumer choice", "Correct: it has benefits and costs for different groups."],
    ["It always creates jobs for everyone and never has any costs", "Costs exist, such as higher prices."],
    ["It always harms every firm and consumer", "Local producers may benefit."],
    ["It has no effect on prices or trade", "Restrictions do affect prices."],
  ], "Restrictions have **gains for producers and costs for consumers**.", { hints: ["Look for the option that names both sides."] });
  b.tf({ d: 1, skill: "RECALL", stem: "Beitbridge is the busiest border post for Zimbabwe's trade with South Africa.", answer: true,
    feedbackTrue: "Correct: most large-scale freight and many passengers use it.",
    feedbackFalse: "Not so: Beitbridge is the main border post with South Africa.",
    explanation: "Beitbridge is the main crossing for trade with South Africa." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A cost-benefit analysis should include only the costs and benefits that can be measured in money.", answer: false,
    feedbackFalse: "Correct: non-money benefits such as jobs, skills and risks should also be described.",
    feedbackTrue: "Not so: non-money items matter too.",
    explanation: "Include non-money items such as jobs, skills, time and risk in words." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "A tax on imports is a {{blank:a}}. The time taken for an investment to earn back its cost is the {{blank:b}} period.",
    blanks: [
      { id: "a", accepted: ["tariff"], choices: ["tariff", "quota", "subsidy"] },
      { id: "b", accepted: ["payback"], choices: ["payback", "growth", "tax"] },
    ], explanation: "A **tariff**; the **payback** period." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each trade policy to its main purpose.",
    pairs: [
      ["Import duty", "Raise revenue and protect local firms"],
      ["Export incentive", "Encourage firms to sell abroad"],
      ["Import licence", "Control and record the goods entering the country"],
      ["Regional trade agreement", "Lower barriers between member countries"],
    ], explanation: "Each policy has a distinct purpose." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, unit: "US$",
    stem: "A trader buys goods for US\\$600, pays US\\$80 for transport and US\\$70 for duty and fees, and sells the goods for US\\$1 050. Calculate her profit, in US\\$.",
    hints: ["Add all the costs, then subtract from sales."],
    value: profit, wrong: [450, 370],
    explanation: "Total cost = 600 + 80 + 70 = 750. Profit = 1 050 − 750 = **US\\$300**. The value 450 ignores transport and duty." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "Using the same figures (total cost US\\$750 and profit US\\$300), calculate the return on cost, as a percentage.",
    hints: ["Return on cost = profit ÷ total cost × 100."],
    value: ret, wrong: [28.6, 30],
    explanation: "300 ÷ 750 × 100 = **40%**. The value 28.6 divides by the sales." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "years",
    stem: "A group pays US\\$2 700 for equipment. The enterprise earns US\\$4 200 a year in sales and has US\\$2 400 a year in running costs. Calculate the payback period for the equipment, in years.",
    hints: ["Find the annual net benefit first."],
    value: payback, wrong: [0.64, 1.9],
    explanation: "1. Annual net benefit = 4 200 − 2 400 = US\\$1 800.\n2. Payback = 2 700 ÷ 1 800 = **1.5 years**." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the southern African regional organisation, based in Gaborone, of which Zimbabwe is a member and which has a trade protocol.",
    accepted: ["SADC", "Southern African Development Community"], wrong: ["EU"],
    explanation: "**SADC**: Southern African Development Community." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "What term describes a comparison of all the costs and benefits of a project?",
    accepted: ["cost-benefit analysis", "cost benefit analysis", "CBA", "a cost-benefit analysis"], wrong: ["market research"],
    explanation: "A **cost-benefit analysis**." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain two benefits and two problems of informal cross-border trade for Zimbabwean households.",
    hints: ["Think about incomes, supply of goods, costs and risks."],
    points: [
      "Benefit: it gives traders, many of them women, an income when formal jobs are scarce.",
      "Benefit: it supplies goods to rural areas and low-income households that shops do not serve.",
      "Problem: long delays, transport costs and duties reduce profits.",
      "Problem: traders face risks to safety and cannot easily get finance or insurance.",
    ],
    modelAnswer: "Informal trade gives traders, many of them women, an income when formal jobs are scarce, and supplies goods to rural areas and low-income households. However, delays, transport costs and duties reduce profits, and traders face safety risks and find it hard to get finance or insurance.",
    explanation: "Two benefits and two problems." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how cheap imported used goods may harm the Zimbabwean clothing industry.",
    hints: ["Think of price, sales, jobs and cotton."],
    points: [
      "Used clothes are sold at very low prices that local factories cannot match.",
      "Local factories lose sales and reduce output.",
      "Jobs are lost in factories, and in the cotton chain.",
      "Money leaves the country to pay for imports, and less is spent on local production.",
    ],
    modelAnswer: "Used clothes are sold at very low prices that local factories cannot match, so sales and output fall. Jobs are lost in factories and in the cotton chain, and money leaves the country to pay for imports.",
    explanation: "Price competition, falling output, job losses and outflow of money." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Suggest four reasons why a local value-added product, such as honey or peanut butter, may succeed.",
    hints: ["Think about raw materials, demand, costs and skills."],
    points: [
      "Raw materials are available locally and cheaply.",
      "There is a market among local shops, households and visitors.",
      "Value addition raises the selling price above that of the raw product.",
      "The enterprise creates jobs and uses local skills, which brings community support.",
    ],
    modelAnswer: "Raw materials are available locally and cheaply, and there is a market among local shops, households and visitors. Value addition raises the price above that of the raw product, and the enterprise creates jobs and uses local skills, which brings community support.",
    explanation: "Raw materials, market, price and community." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: `A trader buys goods in South Africa and sells them in Harare (illustrative data).\n\n${TT}`,
    hints: ["Total cost = goods + transport + duty and fees.", "Return on cost = profit ÷ total cost × 100."],
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the total cost, in US\\$.", value: costB, unit: "US$", wrong: [800, 150],
        explanation: "800 + 60 + 90 = US\\$950." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the profit, in US\\$.", value: profitB, unit: "US$", wrong: [435, 1235],
        explanation: "1 235 − 950 = US\\$285." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the return on cost, as a percentage.", value: retB, unit: "%", wrong: [23.1, 285],
        explanation: "285 ÷ 950 × 100 = 30%." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain two difficulties faced by cross-border traders.",
        points: [
          "Delays and queues at the border and costs of duties and transport.",
          "Limited access to finance, insurance and information about rules, and risks to safety.",
        ],
        modelAnswer: "Delays and queues at the border and the costs of duties and transport reduce profits, and traders have limited access to finance, insurance and information about the rules, as well as risks to their safety.",
        explanation: "Border costs and lack of services." }),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest two ways of supporting small cross-border traders.",
        points: [
          "Simplified customs procedures and clear information on duties for small consignments.",
          "Safe market facilities, microfinance and training.",
        ],
        modelAnswer: "Simplified customs procedures with clear information on duties for small consignments, and safe market facilities, microfinance and training.",
        explanation: "Simpler rules and services." }),
    ], explanation: "Calculate profit and return and discuss support." });

  b.struct({ d: 4, skill: "EVALUATION",
    stem: `A village group wants to start a peanut-butter enterprise (illustrative data).\n\n${PT}`,
    hints: ["Net benefit per year = sales − running costs.", "Payback = equipment cost ÷ annual net benefit."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the annual net benefit, in US\\$.", value: netP, unit: "US$", wrong: [6600, 3900],
        explanation: "6 600 − 3 900 = US\\$2 700." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the payback period, in years.", value: payP, unit: "years", wrong: [0.5, 2.4],
        explanation: "5 400 ÷ 2 700 = 2 years." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the total net gain over 5 years after paying for the equipment, in US\\$.", value: fiveP, unit: "US$", wrong: [13500, 2700],
        explanation: "5 × 2 700 = 13 500; 13 500 − 5 400 = US\\$8 100." }),
      P.manual({ label: "(d)", marks: 2, stem: "Describe two non-money benefits and one non-money cost that should be included in the analysis.",
        points: [
          "Benefits: jobs for members and new skills in processing and marketing.",
          "Cost: time spent and the risk of a poor season or lost sales.",
        ],
        modelAnswer: "Benefits are jobs for members and new skills in processing and marketing; a cost is the time spent and the risk of a poor season or lost sales.",
        explanation: "Include non-money items in words." }),
      P.manual({ label: "(e)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Assess whether the enterprise should go ahead.",
        points: [
          "The net benefit is positive and the payback period is two years.",
          "Over five years the gain is large compared with the equipment cost.",
          "The analysis depends on estimates of sales and costs, which may be wrong.",
          "Judgement: the plan is worthwhile if the market exists and standards are met, so it should start small and monitor results.",
        ],
        wordLimit: { max: 150 },
        modelAnswer: "The net benefit is positive and the payback period is two years, and over five years the gain is large compared with the cost of the equipment. However, the analysis depends on estimates of sales and costs that may be wrong. I conclude that the plan is worthwhile if the market exists and standards are met, so the group should start small and monitor results.",
        explanation: "Weigh figures against uncertainty and judge." }),
    ], explanation: "Complete a cost-benefit analysis for a local enterprise." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Evaluate the effects of cheap imported used goods on Zimbabwe.",
    hints: ["Consider consumers, traders, local producers and the economy.", "Reach a judgement."],
    points: [
      "Used clothes, shoes and electronics are affordable for low-income households.",
      "Many people earn a living importing, selling and repairing the goods.",
      "Local clothing, textile and shoe factories lose sales and jobs.",
      "Demand for local cotton and materials falls.",
      "Imports use foreign currency and increase the trade deficit.",
      "Quality may be poor and goods may become waste.",
      "Restrictions may protect local firms but raise prices and reduce choice, and views differ about the balance.",
      "Judgement: the gains for consumers and traders are real, but the long-term cost to local industry means a policy that supports local production while keeping affordability is needed.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Used clothes, shoes and electronics are affordable for low-income households, and many people earn a living importing, selling and repairing them. However, local clothing, textile and shoe factories lose sales and jobs, demand for local cotton falls, and imports use foreign currency. Quality may be poor and goods can become waste. Restrictions may protect local firms but raise prices and reduce choice, and views differ about the balance. I conclude that the gains for consumers and traders are real, but the long-term cost to local industry means a policy is needed that supports local production while keeping goods affordable.",
    wordLimit: { max: 300 }, explanation: "Weigh gains for consumers against costs to local industry and judge." });

  b.card("DEFINITION", "Trade policy", "Government rules and measures that control trade: tariffs, quotas, bans, licences, incentives and agreements.");
  b.card("DEFINITION", "Tariff", "A tax on imported goods, which raises their price and may protect local producers.");
  b.card("CONCEPT", "Informal cross-border trade", "Small-scale buying and selling across borders, often by women, supplying households and shops but facing delays, costs and risks.");
  b.card("FACT", "Beitbridge", "The busiest border post in Zimbabwe, used for most trade with South Africa.");
  b.card("CONCEPT", "Effects of cheap used goods", "Cheaper clothes and jobs for traders, but loss of sales and jobs in local clothing and textile industries and outflow of foreign currency.");
  b.card("FORMULA", "Profit and return on cost", "Profit = sales − total costs; return on cost = profit ÷ total costs × 100.");
  b.card("FORMULA", "Payback period", "Payback = start-up cost ÷ annual net benefit (sales − running costs).");
  b.card("DEFINITION", "Cost-benefit analysis", "A comparison of all costs and benefits of a project, in money where possible and in words where not.");
  b.card("CONCEPT", "Designing a local enterprise", "Choose a product, research the market, plan production, do a cost-benefit analysis, check rules, then defend the plan with risks and benefits.");
});
