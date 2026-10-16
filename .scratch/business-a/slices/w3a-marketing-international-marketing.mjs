// W3a: marketing.international-marketing
import { concept, P, ZBE, table, r2, money, chk } from "../lib.mjs";
import { mc } from "../tables/w3a-lib.mjs";

const wscore = (weights, scores) => scores.reduce((s, x, i) => s + x * weights[i], 0);

concept("abus.marketing.international-marketing", { file: "marketing/international-marketing", keyPrefix: "marketing.international-marketing" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of the following is a method of entering a foreign market?",
    ok: ["Granting a licence to a firm in that country", "Correct: licensing is an entry method with little investment."],
    bad: [["Cutting wages in the home factory by a tenth", "This is a cost decision at home, not an entry method."], ["Raising prices in the home market only", "This does not enter a foreign market."], ["Training sales staff at the head office", "Training does not by itself enter a market."]],
    explanation: "Entry methods include exporting, licensing, franchising, joint ventures and direct investment.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is **exporting**?",
    ok: ["Selling goods produced at home to overseas customers", "Correct: goods leave the country of production."],
    bad: [["Buying goods made abroad to sell in the home market", "That is importing."], ["Building a new factory in the home country this year", "This is domestic investment."], ["Selling shares in the business to foreign investors", "This is a financial transaction, not exporting."]],
    explanation: "Exporting is selling domestically produced goods or services abroad.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a key reason why a firm might choose **local adaptation** rather than a standardised global mix?",
    ok: ["Tastes, laws and language differ between countries", "Correct: a mix that ignores local differences can fail."],
    bad: [["It always reduces the costs of production and promotion", "Adaptation usually raises costs."], ["It removes the need to research any foreign market", "Adaptation needs more local research."], ["It guarantees the same brand image in every country", "Adaptation may make the image less consistent."]],
    explanation: "Where tastes, rules or language differ, adapting the mix improves the fit with customers.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main advantage of a **joint venture** with a local partner when entering a foreign market?",
    ok: ["The partner gives local knowledge and shares both cost and risk", "Correct: it reduces the risk of entering an unfamiliar market."],
    bad: [["The foreign firm keeps all the profits and has total control", "Profits and control are shared."], ["There are never any disagreements between the two owners", "Disagreements are a known problem."], ["No investment is needed from the foreign firm at all", "Both partners invest."]],
    explanation: "A joint venture shares knowledge, cost and risk, but also profit and control.",
  });
  const w = [0.4, 0.3, 0.2, 0.1];
  const A = [5, 3, 4, 2], B = [3, 5, 4, 3];
  const sa = wscore(w, A), sb = wscore(w, B);
  chk(sa, 3.9, 1e-9);
  chk(sb, 3.8, 1e-9);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional exporter scores two countries on four criteria, with weights 40%, 30%, 20% and 10%. Country A scores 5, 3, 4 and 2. Country B scores 3, 5, 4 and 3. Which statement is correct?",
    ok: ["Country A scores 3.9 and is narrowly ahead of B at 3.8", "Correct: A = 2.0 + 0.9 + 0.8 + 0.2 = 3.9."],
    bad: [["Country B scores 4.0 and is narrowly ahead of A at 3.9", "Check the multiplication: B = 1.2 + 1.5 + 0.8 + 0.3 = 3.8."], ["Both countries score 3.5, so they are exactly equal", "The weighted scores differ."], ["Country A scores 14 and B scores 15, so B is far ahead", "This adds the unweighted scores."]],
    hints: ["Multiply each score by its weight and add."],
    explanation: "A = 5×0.4 + 3×0.3 + 4×0.2 + 2×0.1 = 2.0 + 0.9 + 0.8 + 0.2 = 3.9; B = 3×0.4 + 5×0.3 + 4×0.2 + 3×0.1 = 1.2 + 1.5 + 0.8 + 0.3 = 3.8.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional small furniture maker in Gweru has little capital and no experience abroad. Which entry method into Botswana is MOST suitable at first?",
    ok: ["Exporting through a local agent firm there", "Correct: it needs little capital and has low risk."],
    bad: [["Building and owning a factory in Gaborone", "This needs large capital and carries high risk."], ["Buying a large chain of shops in Botswana", "This is far beyond a small firm's means."], ["Opening ten franchises at once in Botswana", "This requires a proven system and large support."]],
    hints: ["Match the method to the firm's resources and experience."],
    explanation: "Exporting through an agent is the least costly and least risky way for a small firm to test a market.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional bakery in Harare exports bread mixes to a country where a tariff is introduced on all imports. Which entry method would best AVOID the tariff?",
    ok: ["Licensing a local firm to produce the mixes", "Correct: production inside the country avoids import tariffs."],
    bad: [["Exporting the mixes in larger shipments", "Exports still pay the tariff."], ["Using a new agent to sell the imported mixes", "Imported goods still pay the tariff."], ["Raising the prices charged on the imported mixes", "Higher prices do not avoid the tariff."]],
    hints: ["Where is the product made under each method?"],
    explanation: "A tariff is charged on imports. Licensing or direct investment produces locally, so no import tariff is paid.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional soft-drink company wants the same recipe, label and advertisement in 20 countries. Which judgement is BEST?",
    ok: ["It saves cost but may fail where local tastes differ", "Correct: standardisation saves cost but risks poor local fit."],
    bad: [["It saves cost and cannot fail in any market at all", "Local differences can cause failure."], ["It raises cost and is never worth the effort made", "Standardisation usually reduces cost."], ["It is impossible, since no firm can sell in many countries", "Global brands exist."]],
    hints: ["Weigh the cost saving against local differences."],
    explanation: "A global approach saves cost and builds a consistent brand but may not suit all markets.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Licensing allows a firm to enter a foreign market without building its own factory there.",
    answer: true,
    explanation: "True. The foreign licensee produces or sells under licence and pays a fee or royalty.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each method of entering a foreign market to its main feature.",
    pairs: [["Exporting", "Produce at home and ship abroad"], ["Licensing", "A foreign firm pays a fee for the right to produce or sell"], ["Joint venture", "Shared ownership with a local partner"], ["Direct investment", "The firm builds or buys its own business abroad"]],
    explanation: "The methods differ in cost, risk and control.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "A {{blank:a}} marketing mix is the same in every country, while an {{blank:b}} mix is changed to suit each market.",
    blanks: [
      { id: "a", accepted: ["standardised"], choices: ["standardised", "adapted", "local"] },
      { id: "b", accepted: ["adapted"], choices: ["standardised", "adapted", "global"] },
    ],
    explanation: "Standardised mixes save cost; adapted mixes fit local tastes.",
  });

  const cost = 20, freight = 3, ins = 1, tariffRate = 0.15, price = 32;
  const cif = cost + freight + ins;
  const tariff = cif * tariffRate;
  const landed = cif + tariff;
  const profitUnit = price - landed;
  chk(tariff, 3.6, 1e-9);
  chk(landed, 27.6, 1e-9);
  chk(profitUnit, 4.4, 1e-9);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: landed, calculator: true, daily: true, wrong: [cif, 27],
    stem: "A fictional exporter in Mutare makes a good for US\\$20 a unit. Freight is US\\$3 a unit and insurance US\\$1 a unit. The importing country charges a tariff of 15% on the total of cost, freight and insurance, which the exporter pays. Calculate the landed cost per unit.",
    hints: ["Find cost + freight + insurance first, then the tariff."],
    explanation: "Cost before tariff = 20 + 3 + 1 = US\\$24. Tariff = 15% × 24 = US\\$3.60. Landed cost = US\\$27.60. Applying the 15% to the production cost only gives a tariff of US\\$3.00 and a landed cost of US\\$27.00, which is wrong.",
  });
  const units = 4000, fixed = 9000;
  const profit = profitUnit * units - fixed;
  chk(profit, 8600, 1e-6);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: profit, calculator: true, wrong: [profitUnit * units, price * units - fixed],
    stem: "The exporter above sells 4,000 units at a delivered price of US\\$32 a unit (landed cost US\\$27.60) and has fixed export costs of US\\$9,000. Calculate the profit from exporting.",
    hints: ["Profit per unit × units, then subtract the fixed export costs."],
    explanation: "Profit per unit = 32.00 − 27.60 = US\\$4.40. Profit before fixed costs = 4.40 × 4,000 = US\\$17,600. After fixed costs = 17,600 − 9,000 = US\\$8,600. US\\$17,600 ignores the fixed costs.",
    workedSolution: "1. Profit per unit = 32.00 − 27.60 = US\\$4.40.\n2. Before fixed costs: 4.40 × 4,000 = US\\$17,600.\n3. After fixed costs: 17,600 − 9,000 = US\\$8,600.",
  });
  const cifB = 22 + 3 + 1, landedB = cifB * 1.25, profitB = (35 - landedB) * 3000 - 6500;
  chk(landedB, 32.5, 1e-9);
  chk(profitB, 1000, 1e-6);
  b.num({
    d: 5, skill: "ANALYSIS", kind: "money", value: profitB, calculator: true, wrong: [7500, 6500],
    stem: "A fictional wine exporter in Mutare makes a case for US\\$22, pays freight of US\\$3 and insurance of US\\$1 a case, and pays a tariff of 25% on the total of cost, freight and insurance. It sells 3,000 cases at a delivered price of US\\$35 and has fixed export costs of US\\$6,500. Calculate the profit from exporting.",
    hints: ["Find the landed cost per case first, including the tariff."],
    explanation: "Cost before tariff = 22 + 3 + 1 = US\\$26. Tariff = 25% × 26 = US\\$6.50. Landed cost = US\\$32.50. Profit per case = 35 − 32.50 = US\\$2.50. Before fixed costs = 2.50 × 3,000 = US\\$7,500. After fixed costs = 7,500 − 6,500 = US\\$1,000. US\\$7,500 ignores the fixed costs.",
  });

  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the entry method in which a foreign firm pays a fee for the right to produce a product or use a brand.",
    accepted: ["licensing", "a licence", "licence", "license", "licensing agreement"],
    explanation: "Licensing.",
  });
  b.short({
    d: 2, skill: "UNDERSTANDING",
    stem: "Name the approach in which a firm sells the same product with the same marketing mix in all countries.",
    accepted: ["pan-global marketing", "global marketing", "standardisation", "standardised marketing", "pan global", "standardised"],
    explanation: "Pan-global (standardised) marketing.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain **one** reason why a firm might sell abroad.",
    points: ["The home market may be saturated or small", "Foreign markets offer new customers and sales", "So the firm can grow and spread its risk"],
    modelAnswer: "The home market may be saturated or small, so selling abroad gives the firm new customers and extra sales. This allows it to grow and spreads its risk across several markets.",
    hints: ["Think of the limits of the home market."],
    explanation: "A reason developed to its effect.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional chilli sauce maker in Masvingo wants to sell in Zambia. Explain **two** challenges it may face.",
    points: ["Tastes may differ (e.g. less heat or different flavours)", "Application: the sauce may need a changed recipe and label", "Payment and exchange-rate risks", "Application: customers may pay late or the kwacha may fall, reducing income in US dollars"],
    modelAnswer: "Tastes may differ, so the sauce may need a different recipe or label, which raises costs. There are also payment and exchange-rate risks: customers may pay late, or a fall in the kwacha could reduce income in US dollars.",
    hints: ["Think about product and money."],
    explanation: "Two challenges, each applied.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why licensing may be attractive to a small firm entering a large foreign market.",
    points: ["The licensee provides the production and capital", "The small firm has little risk and low cost", "Local licensee knows the market", "So the firm earns fees without large investment"],
    modelAnswer: "The licensee provides the production and the capital, so the small firm faces low cost and little risk. The licensee also knows the local market, so the small firm earns fees from a large market without a large investment.",
    hints: ["Who provides the capital and local knowledge?"],
    explanation: "A chain from low investment to earnings.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional Zimbabwean software firm with 15 employees is deciding between selling its payroll software online to South Africa and setting up an office there. Evaluate which is better.",
    points: ["Selling online needs little capital and can start at once", "It is easy to stop if sales are poor", "An office gives local contact and service", "An office costs more, with rent, staff and law differences", "The firm is small and has no experience in South Africa", "Judgement with reason or condition"],
    modelAnswer: "Selling online needs little capital, can start quickly and is easy to stop if sales are poor. An office would give local contact and better service but costs more in rent and staff and exposes the firm to unfamiliar laws. As a small firm with no experience there, it should start online and open an office only when sales justify it.",
    hints: ["Think about the size of the firm and the risk."],
    explanation: "Cost and risk weighed against service.",
  });

  const crit = ["Market size", "Market growth", "Low competition", "Low risk"];
  const wts = [0.35, 0.25, 0.25, 0.15];
  const sc = { Zambia: [4, 4, 3, 3], Botswana: [2, 3, 4, 5], Malawi: [3, 5, 2, 2] };
  const tot = Object.fromEntries(Object.entries(sc).map(([k, v]) => [k, wscore(wts, v)]));
  chk(tot.Zambia, 3.6, 1e-9);
  chk(tot.Botswana, 3.2, 1e-9);
  chk(tot.Malawi, 3.1, 1e-9);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true, examStyle: true,
    stem: "A fictional honey producer in Chipinge scores three markets from 1 to 5.\n\n" + table(["Criterion", "Weight", "Zambia", "Botswana", "Malawi"], crit.map((c, i) => [c, `${wts[i] * 100}%`, sc.Zambia[i], sc.Botswana[i], sc.Malawi[i]]), ["l", "r", "r", "r", "r"]),
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "plain", value: tot.Zambia, dp: 2, stem: "Calculate Zambia's weighted score, to two decimal places.", wrong: [3.5, 15], explanation: "4×0.35 + 4×0.25 + 3×0.25 + 3×0.15 = 1.40 + 1.00 + 0.75 + 0.45 = 3.60." }),
      P.num({ label: "(b)", marks: 2, kind: "plain", value: tot.Botswana, dp: 2, stem: "Calculate Botswana's weighted score, to two decimal places.", wrong: [3.5, 14], explanation: "2×0.35 + 3×0.25 + 4×0.25 + 5×0.15 = 0.70 + 0.75 + 1.00 + 0.75 = 3.20." }),
      P.manual({ label: "(c)", marks: 2, stem: "State **two** weaknesses of using a scoring table to choose a market.", points: ["The scores and weights are judgements and may be wrong", "It ignores factors not listed, and cannot show the size of the profit"], modelAnswer: "The scores and weights are judgements and may be wrong, and the table ignores factors not listed and does not show the expected profit.", explanation: "Scoring is subjective." }),
    ],
    hints: ["Multiply each score by its weight and add."],
    explanation: "Zambia 3.60; Botswana 3.20; scoring tables rely on judgement.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true,
    stem: "Read the extract. Tatenda Textiles is a fictional clothing maker in Bulawayo with a strong local brand. A distributor in Johannesburg has offered to sell its shirts in South Africa. Shirts there are larger and brighter than in Zimbabwe. The distributor would buy 8,000 shirts a year but wants a 15% price cut and a version with local sizes. Tatenda's owner is considering instead opening a shop in Johannesburg.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain **one** reason why Tatenda Textiles may need to adapt its marketing mix for South Africa.", points: ["Customers prefer different sizes and colours", "A product that does not fit local taste will sell poorly", "So the shirts must be redesigned, raising cost"], modelAnswer: "South African customers prefer different sizes and colours. A product that does not fit local taste will sell poorly, so the shirts must be redesigned, which raises costs.", explanation: "Adaptation to taste." }),
      P.manual({ label: "(b)", marks: 6, stem: "Assess whether Tatenda Textiles should accept the distributor's offer or open its own shop.", points: ["The distributor offers a guaranteed volume (8,000 shirts) and low investment", "Local knowledge and existing sales network", "The price cut reduces the margin and the firm depends on one customer", "An own shop gives control of the brand and customers but costs rent, staff and stock", "The firm has no experience in South Africa, increasing risk", "Judgement with reason, e.g. start with the distributor and open a shop later if sales are good"], modelAnswer: "The distributor offers a guaranteed volume of 8,000 shirts with little investment and local knowledge, but a 15% price cut reduces the margin and makes Tatenda dependent on one customer. An own shop would give control of the brand and customers but costs rent, staff and stock, and the firm has no experience there. It should start with the distributor, and open a shop later if sales are good.", explanation: "Low-risk entry first, then more control." }),
    ],
    hints: ["Weigh the cost and risk of each entry method."],
    explanation: "A distributor gives low-risk entry; a shop gives control but needs more capital and experience.",
  });

  b.card("DEFINITION", "International marketing", "Marketing goods or services to customers in more than one country, often with changes to the mix.");
  b.card("FACT", "Methods of entering a foreign market", "Exporting, licensing, franchising, joint venture and direct investment.");
  b.card("CONCEPT", "Exporting", "Low investment and risk, but transport cost, tariffs and exchange-rate risk and less control.");
  b.card("CONCEPT", "Joint venture", "Shared ownership with a local partner: local knowledge and shared risk, but shared profit and control.");
  b.card("CONCEPT", "Pan-global marketing", "A standardised mix everywhere: lower cost and consistent image, but may ignore local tastes.");
  b.card("CONCEPT", "Adaptation", "Changing the mix for each market: better fit with local tastes, but higher cost.");
  b.card("FACT", "Factors in choosing a foreign market", "Size, growth, income and tastes, competition, stability, trade barriers, distance and ease of entry.");
  b.card("FACT", "Benefits and challenges of foreign markets", "Benefits: more sales, spread risk, foreign income. Challenges: tastes, language, law, exchange rates, payment and distance.", undefined, { applies: ZBE });
  b.card("CONCEPT", "Strategies for breaking into foreign markets", "Start nearby, use a local agent or partner, adapt the product, use trade fairs and online sales, build trust with small orders.", undefined, { applies: ZBE });
});
