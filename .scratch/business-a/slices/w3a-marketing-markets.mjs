// W3a: marketing.markets
import { concept, P, ZIM, ZBE, table, r2, market, pctChange, chk } from "../lib.mjs";
import { mc } from "../tables/w3a-lib.mjs";

concept("abus.marketing.markets", { file: "marketing/markets", keyPrefix: "marketing.markets" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of the following is an example of an **industrial (B2B)** market transaction?",
    ok: ["A mine buying drilling machines from a supplier", "Correct: a firm buys capital goods for use in production."],
    bad: [["A family buying a television from a retail shop", "This is a consumer (B2C) transaction."], ["A student buying a notebook at the school tuck shop", "This is a consumer purchase for personal use."], ["A tourist buying a souvenir at a roadside market", "A tourist buys for personal use."]],
    explanation: "In a B2B market, businesses buy from other businesses for use in production or resale.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "How is **market share** calculated?",
    ok: ["Firm's sales ÷ total market sales × 100", "Correct: it shows the firm's proportion of the market."],
    bad: [["Total market sales ÷ firm's sales × 100", "This inverts the fraction."], ["Firm's profit ÷ total market profit × 100", "That compares profits, not sales."], ["Firm's sales ÷ the firm's sales a year ago × 100", "That compares the firm with its own past."]],
    explanation: "Market share is the firm's sales as a percentage of total market sales.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these goods is a **durable** consumer good?",
    ok: ["A refrigerator", "Correct: it gives service over many years."],
    bad: [["A loaf of bread bought daily", "Bread is used up at once: non-durable."], ["A haircut at a salon in the town", "A haircut is a service."], ["A tonne of cement for a building site", "Cement is a producer good for building."]],
    explanation: "Durable goods are used many times over a long period.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do industrial markets often rely more on personal selling than consumer markets?",
    ok: ["Buyers are few, orders are large and the specification matters", "Correct: a personal approach suits large, technical purchases."],
    bad: [["Buyers are very many and each buys only a tiny quantity at a time", "That describes a consumer market, where mass promotion is used."], ["Industrial buyers never compare the price or the quality offered", "Industrial buyers compare carefully."], ["Industrial goods are always sold to households in supermarkets", "Producer goods are not normally sold in supermarkets."]],
    explanation: "A few large buyers with technical needs are best served by sales representatives and direct contact.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional bakery in Masvingo had sales of US\\$90,000 in a market worth US\\$750,000. Next year the market is worth US\\$800,000 and the bakery's sales rise to US\\$100,000. What is the change in the bakery's market share?",
    ok: ["It rises from 12.0% to 12.5%", "Correct: 90,000 ÷ 750,000 = 12.0% and 100,000 ÷ 800,000 = 12.5%."],
    bad: [["It falls from 12.0% to 11.1%", "This uses the wrong sales figures in the second year."], ["It rises from 12.0% to 13.3%", "This divides new sales by the old market."], ["It stays at 12.0% because sales rose with the market", "The sales rose faster than the market: 11.1% against 6.7%."]],
    hints: ["Work out the share in each year."],
    explanation: "Share 1 = 90,000 ÷ 750,000 × 100 = 12.0%. Share 2 = 100,000 ÷ 800,000 × 100 = 12.5%. The bakery's sales grew faster than the market.",
  });
  chk(market.share(90000, 750000), 12, 1e-9);
  chk(market.share(100000, 800000), 12.5, 1e-9);
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional manufacturer in Bulawayo sells fertiliser to commercial farms, which place large orders twice a year. Which promotion is MOST suitable?",
    ok: ["A sales representative visiting farms with a printed price list", "Correct: a few large buyers suit personal selling."],
    bad: [["Billboards in the town centre aimed at passers-by on foot", "Billboards reach many households, not farm buyers."], ["Free samples handed to schoolchildren outside the local schools", "Schoolchildren are not buyers of fertiliser."], ["Daily radio jingles aimed at all of the households in town", "Mass advertising wastes money on a small group of buyers."]],
    hints: ["Think of how many buyers there are and how big their orders are."],
    explanation: "B2B markets with few large customers suit personal selling and direct contact.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A firm's sales rise by 8% in a year while the market grows by 12%. What does this show?",
    ok: ["The firm's market share has fallen, despite higher total sales", "Correct: the market grew faster than the firm."],
    bad: [["The firm's market share has risen, as sales have risen", "Share rises only if the firm grows faster than the market."], ["The firm's market share is unchanged, as sales are higher", "Share would be unchanged only if both grew at the same rate."], ["The firm must be making a loss, as growth is only 8%", "Growth in sales says nothing about profit."]],
    hints: ["Compare the growth of the firm with the growth of the market."],
    explanation: "A firm that grows more slowly than its market loses share.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional soap maker in Mutare sells only locally. It is thinking of entering the national market. Which statement is the best judgement?",
    ok: ["Sales could rise, but transport, rival and promotion costs rise too", "Correct: it weighs the gain against the extra costs and competition."],
    bad: [["Sales will definitely rise and costs per unit will fall at once", "Success is not certain; costs and competition rise."], ["A national market has no competitors, so it is entirely risk-free", "A national market has more competitors, not fewer."], ["The firm should stay local, because large markets are never better", "Larger markets can give growth and economies of scale."]],
    hints: ["Look for the answer that balances gain and cost."],
    explanation: "A wider market gives scale but raises transport, promotion and competition costs.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "A firm's market share can fall even when its sales rise.",
    answer: true,
    explanation: "True. If the market grows faster than the firm's sales, its share falls.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Machinery bought by a factory is a consumer good.",
    answer: false,
    explanation: "False. Machinery is a producer (capital) good, used to make other goods.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each product to its classification.",
    pairs: [["A tin of beans", "Non-durable consumer good"], ["A sofa", "Durable consumer good"], ["A taxi ride", "Service"], ["A lathe in a workshop", "Producer (capital) good"]],
    explanation: "Goods are classified by who buys them and how long they last.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "A firm that finds out what customers want before designing its product has a {{blank:a}} orientation, while one that sells what it already makes has a {{blank:b}} orientation.",
    blanks: [
      { id: "a", accepted: ["market"], choices: ["market", "product", "cost"] },
      { id: "b", accepted: ["product"], choices: ["market", "product", "price"] },
    ],
    explanation: "Market orientation starts with the customer; product orientation starts with what the firm makes.",
  });

  const m0 = 1200000, m1 = 1260000, f0 = 150000, f1 = 160000;
  const sh0 = market.share(f0, m0);
  chk(sh0, 12.5, 1e-9);
  const sh1 = market.share(f1, m1);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: sh0, calculator: true, daily: true, wrong: [r2(m0 / f0), 8],
    stem: "A fictional tyre dealer in Harare sells US\\$150,000 of tyres a year in a market worth US\\$1,200,000. Calculate its market share, to one decimal place.",
    hints: ["Sales ÷ market × 100."],
    explanation: "150,000 ÷ 1,200,000 × 100 = 12.5%. Inverting the fraction gives 8.0.",
  });
  const mgr = market.growth(m0, m1);
  chk(mgr, 5, 1e-9);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: mgr, calculator: true, wrong: [r2((m1 - m0) / m1 * 100), 60000],
    stem: "The tyre market grows from US\\$1,200,000 to US\\$1,260,000. Calculate the market growth, to one decimal place.",
    hints: ["Change ÷ original × 100."],
    explanation: "Growth = (1,260,000 − 1,200,000) ÷ 1,200,000 × 100 = 5.0%. Dividing by the new figure gives 4.8%.",
  });
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: (sh0 / 100) * m1, calculator: true, wrong: [f1, (sh0 / 100) * m0],
    stem: "The tyre dealer's original market share was 12.5%. In the second year the market is worth US\\$1,260,000. Calculate the sales the dealer needed in the second year to keep its share at 12.5%.",
    hints: ["Share × size of the new market."],
    explanation: "Sales needed = 12.5% × 1,260,000 = US\\$157,500. The dealer actually sold US\\$160,000, so its share rose to 12.7%. US\\$160,000 is the actual figure and US\\$150,000 the old one.",
    workedSolution: "1. Required sales = 12.5% × 1,260,000 = US\\$157,500.\n2. Actual sales were US\\$160,000, so the share rose to 160,000 ÷ 1,260,000 × 100 = 12.7%.",
  });
  chk(sh1, 12.698412698412698, 1e-9);

  b.short({
    d: 1, skill: "RECALL",
    stem: "State the term for a market in which firms buy from other firms for use in production.",
    accepted: ["industrial market", "business to business", "b2b", "industrial", "producer market", "business market"],
    explanation: "An industrial (business-to-business) market.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain **one** difference between marketing to consumers and marketing to industrial buyers.",
    points: ["Consumer markets have very many buyers; industrial markets have fewer", "Consumer markets use mass promotion; industrial markets rely on personal selling", "Industrial buyers decide more carefully on quality, delivery and terms"],
    modelAnswer: "Consumer markets have very many buyers, so firms use mass promotion such as advertising. Industrial markets have fewer, larger buyers who decide carefully on quality, delivery and terms, so personal selling is more suitable.",
    hints: ["Think of the number of buyers and the way they decide."],
    explanation: "One difference developed.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional dairy in Gweru has a falling market share in a growing market. Explain **two** possible reasons.",
    points: ["Competitors may have gained more customers", "Application: a rival may offer cheaper or more convenient yoghurt", "The dairy's own sales grew more slowly than the market", "Application: the dairy may have failed to promote or to supply new shops"],
    modelAnswer: "Competitors may have won more customers, for example with cheaper or more convenient yoghurt. The dairy's sales may also have grown more slowly than the market because it failed to promote its products or supply new shops, so its share fell.",
    hints: ["Compare the dairy's growth with the market's growth."],
    explanation: "Two reasons, each applied to the dairy.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why a high market share may give a firm a cost advantage.",
    points: ["A high share means high output", "Economies of scale lower the cost per unit", "Bulk buying from suppliers gives discounts", "So the firm can make a higher profit or cut prices below those of rivals"],
    modelAnswer: "A high market share means high output, so the firm gains economies of scale and lower costs per unit. It can also get bulk discounts from suppliers. This allows it to earn a higher profit or to cut prices below its rivals'.",
    hints: ["Link share to output and then to unit cost."],
    explanation: "A chain from share to cost advantage.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional furniture maker in Bulawayo sells only to households in the town. A hotel group offers a large contract to supply beds to 12 lodges. Evaluate whether the firm should enter this industrial market.",
    points: ["Large orders give higher revenue and more stable sales", "Repeat contracts and relationships with the hotel group", "The firm needs capacity, finance and quality to a specification", "Dependence on one customer is risky; if the contract ends, sales fall", "The customer may demand low prices or long credit", "Judgement with reason, e.g. accept if capacity exists and household sales are kept"],
    modelAnswer: "A large contract gives higher, steadier revenue and a relationship that may bring repeat orders. However, the firm needs spare capacity, finance for materials and quality to the hotel's specification, and relying on one customer is risky because losing it would cut sales sharply. The hotel may also demand low prices or long credit. The firm should accept if it has capacity and keeps its household customers, so that it does not become dependent on one buyer.",
    hints: ["Weigh the benefits of large orders against the risks of dependence."],
    explanation: "Benefits and risks of entering the B2B market, with a judgement.",
  });

  const rows = [["Mhofu Foods", 210000, 230000], ["Sibanda Stores", 330000, 340000], ["Others", 960000, 1030000]];
  const tot0 = rows.reduce((s, r) => s + r[1], 0), tot1 = rows.reduce((s, r) => s + r[2], 0);
  chk(tot0, 1500000, 1e-9);
  chk(tot1, 1600000, 1e-9);
  const mfG = pctChange(210000, 230000);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true, examStyle: true,
    stem: "The table shows the annual sales of two fictional grocery chains and all others in the town of Chinhoyi.\n\n" + table(["Seller", "Sales 2025 (US\\$)", "Sales 2026 (US\\$)"], [...rows, ["**Whole market**", tot0, tot1]]),
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: market.share(210000, tot0), stem: "Calculate Mhofu Foods' market share in 2025, to one decimal place.", wrong: [r2(market.share(210000, tot1)), r2(210000 / 330000 * 100)], explanation: "210,000 ÷ 1,500,000 × 100 = 14.0%." }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: market.growth(tot0, tot1), stem: "Calculate the growth of the whole market from 2025 to 2026, to one decimal place.", wrong: [r2(mfG), r2(100000 / tot1 * 100)], explanation: "(1,600,000 − 1,500,000) ÷ 1,500,000 × 100 = 6.7%. Mhofu's own growth was 9.5%." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain what has happened to Mhofu Foods' market share between 2025 and 2026 and why.", points: ["Share rose from 14.0% to 14.4% (230,000 ÷ 1,600,000)", "Mhofu's sales grew by 9.5%, faster than the market's 6.7%", "So Mhofu gained customers from its competitors"], modelAnswer: "Mhofu's share rose from 14.0% to 14.4%. Its sales grew by 9.5%, faster than the market's growth of 6.7%, so it gained customers from competitors.", explanation: "Mhofu: 230,000 ÷ 1,600,000 = 14.4%." }),
    ],
    hints: ["Total the sales of every seller for each year."],
    explanation: "Share 14.0%; market growth 6.7%; Mhofu's share rose because it grew faster than the market.",
  });
  chk(market.share(230000, tot1), 14.375, 1e-9);
  chk(mfG, 9.5238, 1e-3);
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true,
    stem: "Read the extract. Sipho Solar is a fictional business in Bulawayo that sells solar lighting kits to households through two shops. A mining company has asked it to supply 400 kits for its workers' camp, and an agent in Lusaka has proposed selling the kits online and delivering across the border.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain **one** way in which marketing to the mining company would differ from marketing to households.", points: ["The mining company is a single large buyer (B2B)", "It will negotiate price, specification and delivery", "A personal visit or quotation is needed, not mass advertising"], modelAnswer: "The mining company is a single large business buyer. It will negotiate the price, specification and delivery, so Sipho Solar needs a personal visit or a quotation, not mass advertising.", explanation: "Industrial buyers are few and negotiate." }),
      P.manual({ label: "(b)", marks: 6, stem: "Assess the benefits and risks of entering the Zambian market online.", points: ["Benefit: a much larger market and possible growth", "Benefit: a virtual market removes the need for new shops", "Risk: delivery costs, import rules and exchange rates", "Risk: unfamiliar competitors and customers' tastes", "Risk: payment and trust issues in an online sale", "Judgement with reason, e.g. test with a small number of orders first"], modelAnswer: "A larger market in Zambia could bring more sales and growth, and selling online avoids the cost of new shops. However, delivery costs, import rules and exchange-rate changes add risk, and the firm faces unfamiliar competitors and customers. Payments and trust may also be difficult online. The firm should test the market with a small number of orders before committing more money.", explanation: "Benefits and risks of a wider, virtual market, with a judgement." }),
    ],
    hints: ["Think about the size of the market, the cost and the risk."],
    explanation: "B2B differs from B2C; a wider online market offers growth but adds cost and risk.",
  });

  b.card("DEFINITION", "Market share", "A firm's sales as a percentage of total market sales.");
  b.card("FORMULA", "Market growth (%)", "(New market sales − old market sales) ÷ old market sales × 100.");
  b.card("CONCEPT", "Consumer and industrial markets", "Consumer (B2C): many buyers, mass promotion. Industrial (B2B): fewer, larger buyers, personal selling.");
  b.card("FACT", "Classification of products", "Consumer goods (durable, non-durable), services and producer (capital) goods.");
  b.card("CONCEPT", "Product and market orientation", "Product orientation starts from what the firm makes; market orientation starts from what customers want.");
  b.card("CONCEPT", "Share and growth", "Share falls if the market grows faster than the firm, even if the firm's sales rise.");
  b.card("FACT", "Types of market by area", "Local, national (regional) and international (global); physical or virtual.");
  b.card("CONCEPT", "Analysing a market", "Look at its size, growth, competitors and location.", undefined, { applies: ZIM });
});
