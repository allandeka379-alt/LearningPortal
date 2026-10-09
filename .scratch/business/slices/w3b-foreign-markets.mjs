// W3b: entering foreign markets (BES, CAM).
import { concept, P, CAM, money, round, r2, table } from "../lib.mjs";

// Share of sales from exports.
const home = 84000, exportS = 36000;
const exportShare = (exportS / (home + exportS)) * 100; // 30
// Structured: export decision data.
const rows = [["Home market sales", 150000, 152000], ["Export sales (Botswana)", 0, 40000]];
const tbl = table(["", "Year 1 US\\$", "Year 2 US\\$"], rows);
const totalY2 = rows[0][2] + rows[1][2]; // 192000
const growthPct = ((totalY2 - rows[0][1]) / rows[0][1]) * 100; // 28
const homeGrowth = ((rows[0][2] - rows[0][1]) / rows[0][1]) * 100; // 1.33
// Agent commission.
const agentSales = 25000, commPct = 8;
const comm = (agentSales * commPct) / 100; // 2000

concept("bus.marketing.foreign-markets", { file: "marketing/foreign-markets", keyPrefix: "marketing.foreign-markets" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is exporting?",
    options: [
      ["Selling goods produced at home to customers in other countries", "Correct."],
      ["Buying goods and services from producers in other countries", "That is importing."],
      ["Selling goods to customers in another town", "That is still the home market."],
      ["Moving a factory to another country", "That is relocation abroad, not exporting."],
    ],
    answer: "A",
    explanation: "Exporting = selling home-produced goods or services to foreign customers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a reason why selling in foreign markets can spread risk?",
    options: [
      ["If sales fall at home, sales abroad may hold up", "Correct: the business depends less on one market."],
      ["Foreign customers always pay in advance", "Payment abroad can be risky."],
      ["Exchange rates never change", "Exchange rates do change, which adds risk."],
      ["Foreign markets have no local competitors", "Local firms usually compete."],
    ],
    answer: "A",
    explanation: "Selling in several countries means a fall in demand in one market affects the business less.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A Zimbabwean food manufacturer finds that it must change the ingredients list and language on its labels before selling in another country. Which problem of entering foreign markets is this?",
    options: [
      ["Legal requirements", "Correct: labelling rules differ by country."],
      ["Payment and currency", "The problem is about labels, not payment."],
      ["Competition from local firms", "No competitor is mentioned."],
      ["Transport costs", "The problem is not about distance."],
    ],
    answer: "A",
    explanation: "Countries have their own rules on labelling, safety and ingredients.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is a joint venture?",
    options: [
      ["Two businesses sharing the costs, risks and profits of a project", "Correct."],
      ["One business paying to use another's brand and methods", "That is a franchise."],
      ["A firm in the foreign country selling goods for commission", "That is an agent."],
      ["A business selling directly to foreign customers online", "That is direct online exporting."],
    ],
    answer: "A",
    explanation: "In a **joint venture** the partners invest together and share costs, risks and profits.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How does using a local agent help a business entering a foreign market?",
    options: [
      ["The agent knows local customers, shops and language", "Correct: local knowledge reduces the risk of mistakes."],
      ["The agent removes all currency risk", "The seller may still be paid in another currency."],
      ["The agent pays all the business's transport costs", "Transport costs remain with the business or buyer."],
      ["The agent guarantees the product will sell well", "No method guarantees sales."],
    ],
    answer: "A",
    hints: ["What does the business lack when it enters a new country?"],
    explanation: "Agents provide **local knowledge** and contacts, in return for commission.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION", applies: CAM,
    stem: "A restaurant chain wants to expand quickly into several countries without raising much capital. Which method is most suitable?",
    options: [
      ["Franchising its brand to local business owners", "Correct: franchisees invest their own money."],
      ["Building and owning every new restaurant itself", "This needs a lot of capital."],
      ["Exporting meals from its home kitchens", "Prepared meals cannot easily be exported."],
      ["Waiting until rivals have entered first", "This is not a method of entry."],
    ],
    answer: "A",
    hints: ["Who provides the money for each new restaurant?"],
    explanation: "Franchising allows fast growth because franchisees provide the capital and local knowledge, though the franchisor has less control.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why might a business need to adapt its product for a foreign market?",
    options: [
      ["Customers' tastes and customs may differ from those at home", "Correct: cultural differences affect demand."],
      ["Foreign customers always want the cheapest version of a product", "Not always; it depends on the market."],
      ["Adapting a product always lowers its cost", "Adapting usually adds cost."],
      ["The home product cannot legally be exported", "Most products can be exported."],
    ],
    answer: "A",
    hints: ["Think about culture and tastes."],
    explanation: "Adapting the product to local tastes and customs can raise sales, but it adds cost.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Selling in foreign markets can help a business to grow when its home market is saturated.",
    answer: true,
    explanation: "True. New markets offer more customers.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A marketing mix that works well at home will always work in a foreign market.",
    answer: false,
    explanation: "False. Tastes, incomes, laws and media differ, so the mix often needs adapting.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each problem of entering a foreign market with a way of reducing it.",
    pairs: [
      ["Not knowing which shops customers use", "Appoint a local agent or distributor"],
      ["Customers in the new market prefer milder flavours", "Adapt the product"],
      ["Risk that a foreign buyer will not pay", "Ask for payment in advance or use secure payment"],
      ["Very high cost of setting up alone", "Form a joint venture with a local firm"],
    ],
    explanation: "Each problem can be reduced with a suitable method.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "In a {{blank:a}}, the franchisee pays to use the franchisor's name and methods. In a joint {{blank:b}}, two businesses share the costs and profits of a project.",
    blanks: [
      { id: "a", accepted: ["franchise", "franchising agreement", "franchise agreement"], wrong: "partnership" },
      { id: "b", accepted: ["venture"], wrong: "stock company" },
    ],
    explanation: "Franchise and joint venture are both ways of entering foreign markets with a partner.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the person or firm in a foreign country that arranges sales for a business in return for commission.",
    accepted: ["agent", "an agent", "local agent", "sales agent", "foreign agent", "commission agent"],
    wrong: ["wholesaler"],
    explanation: "An **agent** sells on the business's behalf, usually for a commission.",
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: `A furniture maker's sales last year were ${money(home)} at home and ${money(exportS)} abroad. Calculate the percentage of total sales that came from exports.`,
    kind: "pct", dp: 0, value: exportShare, wrong: [round((exportS / home) * 100, 1)],
    explanation: `${exportS.toLocaleString("en-GB")} ÷ (${home.toLocaleString("en-GB")} + ${exportS.toLocaleString("en-GB")}) × 100 = ${exportShare}%.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `An agent in Zambia sold ${money(agentSales)} of a Zimbabwean firm's goods and is paid ${commPct}% commission. Calculate the commission paid to the agent.`,
    kind: "money", value: comm, wrong: [agentSales - comm, commPct * 100],
    hints: ["Commission = sales × rate ÷ 100."],
    explanation: `${money(agentSales)} × ${commPct} ÷ 100 = ${money(comm)}.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **two** problems a small Zimbabwean business might face when it starts selling in another country.",
    points: [
      "Problem 1, e.g. lack of knowledge of customers, shops or competitors.",
      "Explained: may set the wrong price or choose the wrong outlets, so sales are poor.",
      "Problem 2, e.g. legal rules / payment and currency / cultural differences / transport costs.",
      "Explained: extra cost of changing labels, risk of not being paid, or product not suited to local tastes.",
    ],
    hints: ["Think about knowledge, laws, money and culture."],
    modelAnswer: "The business may not know which shops customers use or what rivals charge, so it may choose the wrong outlets and price. It may also be paid in another currency or paid late, so the amount it receives is uncertain and its cash flow suffers.",
    explanation: "Problems: culture, knowledge, laws, payment and currency, transport costs, local competition, control.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 840, calculator: true,
    stem: `Thandeka's company makes school shoes in Bulawayo. Sales at home have hardly grown, so in Year 2 it began exporting to Botswana through a distributor in Francistown.\n\n${tbl}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the percentage increase in total sales from Year 1 to Year 2.",
        kind: "pct", dp: 0, value: growthPct, wrong: [round((rows[1][2] / totalY2) * 100, 1), round(homeGrowth, 1)],
        explanation: `Total Year 2 = ${totalY2.toLocaleString("en-GB")}. (${totalY2.toLocaleString("en-GB")} − ${rows[0][1].toLocaleString("en-GB")}) ÷ ${rows[0][1].toLocaleString("en-GB")} × 100 = ${growthPct}%.`,
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Using the data, explain **two** benefits to the company of exporting.",
        points: ["Growth: total sales up 28% while home sales grew only about 1%.", "Explains: home market saturated; Botswana gives new customers.", "Spreads risk: less dependent on the Zimbabwean market.", "Or economies of scale: larger output lowers average cost per pair."],
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "The company is considering opening its own shop in Gaborone instead of using the distributor. Evaluate this decision.",
        points: ["Own shop: control over display, price and service; keeps the distributor's margin.", "Close contact with customers / brand building.", "But high cost of rent, staff, permits; lack of local knowledge and legal requirements.", "Distributor already has outlets and knowledge; lower risk.", "Uses data: export sales are still small (US\\$40,000) compared with the cost of a shop.", "Justified conclusion."],
        modelAnswer: "An own shop would give control over price and display and keep the margin the distributor takes. But rent, staff, permits and Botswana's business rules are costly and unfamiliar, and export sales of US\\$40,000 a year are still small. The distributor already supplies many outlets and knows the market. The company should keep the distributor until export sales are much larger and better established, and reconsider an own shop later.",
      }),
    ],
    hints: ["(a) Compare total sales in each year.", "(c) Weigh control and margin against cost and risk."],
    explanation: `(a) ${growthPct}%. (b) Growth and spreading risk. (c) A justified judgement; a distributor is lower-risk while exports are small.`,
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 840, applies: CAM,
    stem: "Farai's company runs five successful fast-food restaurants in Harare serving grilled chicken and sadza. The directors want to open restaurants in Zambia and Malawi within three years. They are considering three methods: opening their own restaurants, forming a joint venture with a Zambian hotel group, or franchising the brand to local business owners.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Explain what is meant by *franchising*.", points: ["A business (franchisee) uses another business's (franchisor's) name, products and methods.", "In return for a fee / royalties / share of revenue."] }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **two** problems the company may face when opening restaurants in other countries.",
        points: ["Problem 1, e.g. differences in tastes/culture (menu, prices).", "Explained/applied to restaurants.", "Problem 2, e.g. legal requirements (food safety, licences, employment law) / lack of knowledge of locations / currency.", "Explained/applied."],
      }),
      P.manual({
        label: "(c)", marks: 6, stem: "Recommend which method the company should use. Justify your answer.",
        points: ["Own restaurants: full control and profit, but high capital and risk, no local knowledge.", "Joint venture: hotel group's local knowledge, sites and capital; but profits shared, possible disagreements.", "Franchising: fast growth with franchisees' money; but less control of quality, brand risk.", "Considers the company's size (only five restaurants) and three-year target.", "Considers how to control quality (training, inspections, contract).", "Justified recommendation."],
        modelAnswer: "Opening its own restaurants gives full control and all the profit, but a company with only five restaurants may not have the capital or knowledge to open in two new countries. A joint venture with a Zambian hotel group gives local sites, knowledge and shared costs, but profits are shared and the partners may disagree. Franchising allows the fastest growth using local owners' money, but the company would have less control over food quality, which could damage its brand. Given its small size and three-year target, the company should form a joint venture in Zambia first, learning the market with a strong partner, then consider franchising in Malawi once it has a tested model and a training system to control quality.",
      }),
    ],
    hints: ["(b) Think about culture, laws and knowledge.", "(c) Compare control, cost, speed and risk of each method."],
    explanation: "Each entry method trades control against cost, risk and speed of growth.",
  });
  b.card("DEFINITION", "Exporting?", "Selling goods or services produced in the home country to customers in other countries.");
  b.card("CONCEPT", "Why sell in foreign markets?", "More sales and growth, spread risk, economies of scale, extend the product life cycle, earn foreign currency.");
  b.card("CONCEPT", "Problems of entering foreign markets?", "Cultural differences, lack of market knowledge, legal requirements, payment and currency risk, transport costs, local competition.");
  b.card("DEFINITION", "Joint venture?", "Two or more businesses sharing the capital, costs, risks and profits of a new project.");
  b.card("DEFINITION", "Franchise (in foreign markets)?", "Local owners pay to use the business's name and methods; fast growth with their capital, but less control.");
  b.card("CONCEPT", "Ways to reduce foreign-market problems?", "Market research, local agents or distributors, joint ventures, franchising, adapting the mix, secure payment, starting small.");
  b.card("CONCEPT", "Drawback of using an agent?", "Commission reduces profit and the business has less control over how its product is sold.");
  b.card("CONCEPT", "Why adapt the marketing mix abroad?", "Local tastes, incomes, laws and media differ; adapting raises sales but adds cost.");
});
