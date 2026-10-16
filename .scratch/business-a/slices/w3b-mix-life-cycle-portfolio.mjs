// W3b: mix.life-cycle-portfolio
import { concept, P, chk, money, market, pctChange, table, r2 } from "../lib.mjs";
import { mc } from "../tables/w3b-lib.mjs";

concept("abus.mix.life-cycle-portfolio", { file: "mix/life-cycle-portfolio", keyPrefix: "mix.life-cycle-portfolio" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL", 
    stem: "In which stage of the product life cycle are sales highest and profit usually greatest?",
    ok: ["Maturity", "Correct: sales peak and levelling out, set-up costs are covered and promotion can be steady."],
    bad: [["Introduction", "Sales are low and promotion costs high, so losses are likely."], ["Growth", "Profits begin here but sales are still rising and spending is high."], ["Decline", "Sales and profit are falling."]],
    explanation: "Maturity is the stage of highest sales and the strongest profit and cash flow.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "In the Boston Matrix a product with a high relative market share in a slowly growing market is a",
    ok: ["cash cow", "Correct: it earns more cash than it needs."],
    bad: [["star", "A star has high share in a fast-growing market."], ["question mark", "A question mark has low share in a fast-growing market."], ["dog", "A dog has low share in a slowly growing market."]],
    explanation: "High share with low growth describes a cash cow.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which statement about the introduction stage of the product life cycle is correct?",
    ok: ["Sales are low and heavy promotion often causes a loss", "Correct: the launch costs are high and customers are only beginning to hear of the product."],
    bad: [["Sales are at their highest and competitors begin to leave", "That describes maturity at best; competitors have not yet left."], ["Profit is at its highest because costs are low", "Launch costs are high, so profit is low or negative."], ["The product is withdrawn from the market", "Withdrawal belongs to the decline stage."]],
    explanation: "At introduction sales are small and the cost of launching is high.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Relative market share in the Boston Matrix is found by dividing a product's sales by",
    ok: ["the sales of the largest competing product", "Correct: a value above 1 means the product leads its market."],
    bad: [["the total sales of the whole market", "That gives ordinary market share, not relative share."], ["the firm's own total sales of all products", "That gives the importance of the product within the firm."], ["the sales of the same product last year", "That gives growth in sales, not share."]],
    explanation: "Relative share compares the product with the market leader.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional bakery in Masvingo sells a loaf that is losing sales. It launches the loaf in a smaller pack at a lower price for school tuck shops. This is an example of",
    ok: ["an extension strategy: a new pack and a new market", "Correct: the product is changed and sold to a new group of buyers to lengthen its life."],
    bad: [["a product development stage in which the loaf is tested", "The loaf is already on sale, so it is not in development."], ["withdrawal of the product from the market", "The product stays on sale."], ["a change from a star to a dog in the matrix", "The matrix classification is not changed by choosing a pack size."]],
    hints: ["Sales are falling and the business is trying to lengthen the product's life."],
    explanation: "A new pack and a new group of buyers are two ways of extending a product's life.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A fictional product earns very little but sells in a market that is growing by 15% a year, where the leader has three times its sales. Which action is **most** consistent with the Boston Matrix?",
    ok: ["Invest to try to raise its share, or else drop it", "Correct: a question mark either becomes a star with investment or should be withdrawn."],
    bad: [["Spend nothing on it and take its cash to fund other products", "That treats it as a cash cow, but it earns almost no cash."], ["Keep it unchanged because growth is high", "A product with a weak share does not automatically succeed because the market is growing."], ["Raise its price sharply to increase market share", "A higher price is unlikely to raise share against a much larger rival."]],
    hints: ["Classify the product first: high or low share, high or low growth."],
    explanation: "Low share with high growth makes it a question mark. The choice is to invest to build share or to withdraw.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is a limitation of the product life cycle as a planning tool?",
    ok: ["The length of each stage cannot be predicted exactly", "Correct: managers cannot tell when decline will start, so timing an extension strategy is hard."],
    bad: [["It only applies to firms that sell more than one product", "The life cycle applies to a single product, so this is wrong."], ["It shows the exact profit of each product in the portfolio", "The life cycle shows sales patterns, not exact profits."], ["It cannot be used with a table of sales figures", "Sales tables are the usual way to apply it."]],
    hints: ["Think about how sure a manager can be of what happens next."],
    explanation: "The life cycle describes a typical pattern; real products differ and the firm's own actions change the curve.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion is the **best-supported judgement** about using the Boston Matrix to close a product that is classified as a dog?",
    ok: ["Close it unless it supports other sales or earns a useful profit", "Correct: the decision depends on links and profit that the matrix does not show."],
    bad: [["Close it, because every dog loses money for the whole business", "Some dogs earn a small profit, so the claim is too strong."], ["Keep it, because market share is not important in any decision", "Share matters, so ignoring it is unsupported."], ["Do nothing, because the matrix cannot be used for decisions", "The matrix is a useful guide; its limits do not make it worthless."]],
    hints: ["A good judgement says what the decision depends on."],
    explanation: "A reasoned judgement names a condition. The matrix ignores links between products and the small profit a dog may earn.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A product with a relative market share of 0.4 has sales equal to 40% of those of the largest rival.",
    answer: true,
    explanation: "True. Relative share is the product's sales divided by the largest rival's sales, so 0.4 means 40% of the leader's sales.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "All products must pass through every stage of the life cycle, in the same order and over the same time.",
    answer: false,
    explanation: "False. Many products fail at introduction, some stay mature for decades and extension strategies can change the shape of the curve.",
    hints: ["Think of products that fail soon after launch."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each stage of the product life cycle to its description.",
    pairs: [["Introduction", "Low sales, high launch costs, profit unlikely"], ["Growth", "Sales rising fast and profit appearing"], ["Maturity", "Sales levelling out at their highest"], ["Decline", "Sales falling and the product may be withdrawn"]],
    explanation: "Each stage has a typical pattern of sales and profit.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "In the Boston Matrix a product with low market share in a fast-growing market is a {{blank:a}}, while one with high market share in a fast-growing market is a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["question mark"], choices: ["star", "question mark", "cash cow", "dog"] },
      { id: "b", accepted: ["star"], choices: ["star", "question mark", "cash cow", "dog"] },
    ],
    explanation: "Growth is high in both; share is low for the question mark and high for the star.",
  });

  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "State the term for an action that lengthens the life of a product whose sales are beginning to fall.",
    accepted: ["extension strategy", "an extension strategy", "extension strategies", "extension"],
    explanation: "An extension strategy keeps a product in the market longer.",
  });

  {
    const firm = 84000, rival = 120000;
    const rel = market.relativeShare(firm, rival);
    chk(rel, 0.7, 1e-9);
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `A fictional soap maker in Bulawayo has yearly sales of ${money(firm)} in a market where the largest rival has yearly sales of ${money(rival)}. Calculate its relative market share to two decimal places.`,
      kind: "index", value: rel, wrong: [rival / firm, firm / (firm + rival)],
      explanation: `Relative share = firm's sales ÷ largest rival's sales = ${firm} ÷ ${rival} = 0.70. Turning it upside down gives 1.43, and using the two firms' total gives 0.41.`,
    });
  }
  {
    const m0 = 2500000, m1 = 2750000;
    const g = market.growth(m0, m1);
    chk(g, 10, 1e-9);
    b.num({
      d: 2, skill: "APPLICATION",
      stem: `The total yearly sales of a fictional market for cooking oil rose from ${money(m0)} to ${money(m1)}. Calculate the growth of the market as a percentage to one decimal place.`,
      kind: "pct", value: g, wrong: [pctChange(m1, m0), (m1 / m0) * 100],
      explanation: `Growth = (2,750,000 − 2,500,000) ÷ 2,500,000 × 100 = 10.0%. Dividing by the new figure gives 9.1%, and 110.0% forgets to subtract the starting value.`,
    });
  }
  {
    {
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "A fictional lamp sold 31,000 units in year 6 and 28,500 units in year 7. Calculate the percentage change in sales between years 6 and 7, to one decimal place. Give a fall as a negative number.",
      kind: "pct", value: pctChange(31000, 28500), wrong: [-(2500 / 28500) * 100, 8.1],
      hints: ["Divide the change by the sales in the earlier year."],
      explanation: "Change = 28,500 − 31,000 = −2,500. Percentage change = −2,500 ÷ 31,000 × 100 = −8.1%. Dividing by the later year gives −8.8%.",
    });
    }
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why cash flow is often poor in the introduction stage of the product life cycle.",
    points: ["Costs of launching, such as promotion and equipment, are high", "Sales are still low, so little cash comes in"],
    modelAnswer: "In the introduction stage the business spends heavily on promotion and set-up, but few customers know the product yet, so sales revenue is low and cash flow is poor.",
    explanation: "One mark for high launch costs, one for low sales revenue.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional yoghurt maker in Harare has a cash cow and a question mark. Explain how the cash cow can help the question mark.",
    points: ["A cash cow earns more cash than it needs for its own running", "Application: the surplus from the yoghurt cash cow can be moved to the question mark", "The question mark needs investment, such as promotion, to raise its market share", "Application: with enough spending it could become a star in a growing market"],
    modelAnswer: "The cash cow earns more cash than it needs, so the surplus can be moved to the question mark. The question mark needs spending on promotion and distribution to raise its share, and if that works it may become a star in a growing market and a future source of profit.",
    hints: ["Think about where the cash comes from and where it is needed."],
    explanation: "Two links, each developed with the products.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why a business should think about an extension strategy before sales begin to fall sharply.",
    points: ["Slowing growth in the maturity stage warns that decline may follow", "Sales that have already fallen are harder to win back", "An extension strategy takes time to prepare, such as developing a new version", "Acting early protects revenue and profit, so spending is more likely to be repaid"],
    modelAnswer: "Slowing growth warns that decline may follow. Lost customers are harder to win back once sales have fallen, and an extension strategy such as a new version takes time to prepare. Acting early protects revenue, so the cost of the extension is more likely to be repaid.",
    hints: ["Follow the chain: warning sign, time needed, result for revenue."],
    explanation: "A chain of cause and effect about timing.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "A fictional business has a product classified as a dog but it is bought by many of the firm's best customers. Evaluate whether it should be withdrawn.",
    points: ["A dog earns little and uses management time and space", "Withdrawal would free resources for stars and question marks", "Customers who buy the dog may also buy the firm's other products", "Withdrawal could lose those customers and so lose other sales", "Judgement with a reason or condition, for example: keep it if the other sales lost would exceed the savings"],
    modelAnswer: "A dog earns little and uses resources that could go to stars and question marks. However, if many of the firm's best customers buy it they may also buy other products, and withdrawal could lose those sales. The product should be kept only if the sales it supports are worth more than the savings from dropping it; otherwise it should be withdrawn.",
    hints: ["Weigh the savings from withdrawal against the sales that might be lost."],
    explanation: "Both sides, then a judgement that depends on a condition.",
  });

  {
    const rows = [
      ["Cooking oil", 330000, 220000, 4],
      ["Margarine", 90000, 180000, 16],
      ["Rice", 150000, 120000, 11],
    ];
    const cat = (s, r, g) => (s / r > 1 ? (g >= 10 ? "Star" : "Cash cow") : g >= 10 ? "Question mark" : "Dog");
    const tbl = table(["Product", "Sales (US\\$)", "Largest rival (US\\$)", "Market growth"], rows.map(([n, s, r, g]) => [n, s, r, `${g}%`]), ["l", "r", "r", "r"]);
    const relMarg = market.relativeShare(90000, 180000);
    chk(relMarg, 0.5, 1e-9);
    if (cat(330000, 220000, 4) !== "Cash cow" || cat(90000, 180000, 16) !== "Question mark" || cat(150000, 120000, 11) !== "Star") throw new Error("categories");
    b.struct({
      d: 3, skill: "APPLICATION", examStyle: true,
      stem: `A fictional food wholesaler in Chinhoyi sells three products. A high relative share is above 1.0 and high market growth is 10% a year or more.\n\n${tbl}`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the relative market share of margarine to one decimal place.", kind: "index", dp: 1, value: relMarg, wrong: [2, 90000 / (90000 + 180000)], explanation: "90,000 ÷ 180,000 = 0.5. Turning the fraction upside down gives 2.0." }),
        P.mcq({ label: "(b)", marks: 1, stem: "Which category is rice in the Boston Matrix?", options: [["Star", "Correct: relative share 1.25 (above 1.0) and growth 11%."], ["Cash cow", "Growth of 11% is not low."], ["Question mark", "Rice has a high, not low, relative share."], ["Dog", "Rice is strong on both measures."]], answer: "A", explanation: "150,000 ÷ 120,000 = 1.25, and 11% is high growth, so rice is a star." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain how the wholesaler should use the cash earned by cooking oil.", points: ["Cooking oil is a cash cow: high share in a slow-growing market", "It earns more cash than it needs, so the surplus can be moved to other products", "Use it to support the star (rice) and to decide whether to build the question mark (margarine)"], modelAnswer: "Cooking oil is a cash cow because it has a high share of a slowly growing market. It earns more cash than it needs, so the surplus should support rice, which is a star, and fund promotion for margarine, a question mark, if the owner wants to raise its share.", hints: ["Say which category cooking oil belongs to first."], explanation: "Classification, surplus cash, and where to spend it." }),
        P.manual({ label: "(d)", marks: 3, stem: "Assess whether the wholesaler should invest in margarine.", points: ["Margarine sells in a fast-growing market (16%), so the potential is high", "Its share is only half the leader's, so it needs heavy spending to catch up", "Judgement with a condition, for example: invest if promotion can raise its share; otherwise drop it"], modelAnswer: "Margarine is in a market growing by 16% a year, so there is room for growth. But its sales are only half those of the leader, so a large investment is needed. The wholesaler should invest only if it believes promotion can lift its share; if not, the money is better used on rice.", hints: ["Weigh the growth against the size of the gap."], explanation: "Reasons for and against, then a conditional judgement." }),
      ],
      hints: ["Divide sales by the largest rival's sales to get relative share."],
      explanation: "Cooking oil is a cash cow, margarine a question mark and rice a star. The cash cow's surplus supports the others.",
    });
  }
  {
    const sales = [8000, 17000, 29000, 38000, 39500, 38000, 31000];
    const ch = sales.map((s, i) => (i ? pctChange(sales[i - 1], s) : null));
    const tbl = table(["Year", "Sales (units)"], sales.map((s, i) => [`Year ${i + 1}`, s]), ["l", "r"]);
    const g45 = ch[4];
    chk(g45, 3.9474, 1e-3);
    b.struct({
      d: 5, skill: "EVALUATION", examStyle: true,
      stem: `Rudo Cycles is a fictional business in Gaborone that sells a folding bicycle. The table shows its sales since launch. In year 8 a rival introduced a cheaper model. Rudo is considering an extension strategy: a lighter model at a price 10% higher, which would cost about ${money(60000)} to develop.\n\n${tbl}`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage change in sales between year 4 and year 5, to one decimal place.", kind: "pct", value: g45, wrong: [pctChange(39500, 38000), (1500 / 39500) * 100], calculator: true, explanation: "Change = 39,500 − 38,000 = 1,500. 1,500 ÷ 38,000 × 100 = 3.9%. Dividing by the later year gives 3.8%." }),
        P.mcq({ label: "(b)", marks: 1, stem: "At which stage of the product life cycle is the bicycle in year 7?", options: [["Decline", "Correct: sales fell in years 6 and 7."], ["Growth", "Growth was in years 2 to 4, when sales rose fast."], ["Introduction", "Introduction was year 1, when sales were low."], ["Development", "The product was already on sale."]], answer: "A", explanation: "Sales have fallen two years in a row, from 39,500 to 31,000." }),
        P.manual({ label: "(c)", marks: 4, stem: "Explain **one** reason why the bicycle's sales may have started to fall after year 5.", points: ["Reason: new competitors entered, such as the cheaper rival model", "Application: the rival's lower price attracted buyers from Rudo's bicycle", "Reason: the market became saturated as most potential buyers already had one", "Application: sales growth slowed to 3.9% in year 5, which signals a full market"], modelAnswer: "Competitors entered the market, and the rival's cheaper model attracted buyers who would otherwise have bought Rudo's bicycle, so sales fell. In year 5 sales were growing by only 3.9%, which suggests that most buyers already had a bicycle.", hints: ["Use the rival and the slowing growth in year 5."], explanation: "One reason, developed with the case, for four marks." }),
        P.manual({ label: "(d)", marks: 8, stem: "Evaluate whether Rudo should develop the lighter model as an extension strategy.", points: ["For: a new model can attract new customers and lift sales again", "For: a higher price of 10% could raise revenue per bicycle", "For: the product has a strong brand after seven years", "Against: the cost of US\\$60,000 must be recovered, and sales are falling", "Against: the rival's cheaper model may mean customers will not pay 10% more", ["Alternative: sell to a new market, cut costs or let the product decline", 1], ["Judgement with a reason", 1], ["Condition, time-frame or recommendation", 1]], levels: [[1, 1, 3, "Points on extension strategies with little reference to the case."], [2, 4, 6, "Reasons for and against applied to the bicycle and its sales."], [3, 7, 8, "Balanced evaluation with a justified judgement and a condition."]], modelAnswer: "A lighter model could attract new customers and, at a price 10% higher, raise revenue per bicycle, and the brand is established after seven years. However, the project costs US\\$60,000 while sales are falling and a cheaper rival has appeared, so customers may refuse to pay more. Other options such as selling in a new market could cost less. Rudo should go ahead only if tests show that buyers will pay the higher price; otherwise it should cut costs, sell in a new market and let the product decline slowly.", hints: ["Weigh the cost against the likely extra sales, and name a condition."], explanation: "Both sides applied to the case, an alternative, and a judgement with a condition." }),
      ],
      hints: ["Divide the change in sales by the sales in the earlier year."],
      explanation: "Sales growth slowed to 3.9% in year 5 and then fell. The decision depends on whether buyers will pay for the lighter model.",
    });
  }

  b.card("DEFINITION", "Product life cycle", "The pattern of sales a product follows from launch to withdrawal: development, introduction, growth, maturity and decline.");
  b.card("CONCEPT", "Introduction stage", "Low sales, high launch and promotion costs, so profit is unlikely. Customers are only beginning to hear of the product.");
  b.card("CONCEPT", "Maturity stage", "Sales are at their highest and levelling out; profit and cash flow are strongest. Firms defend share and may use extension strategies.");
  b.card("DEFINITION", "Extension strategy", "An action that lengthens the life of a product, such as a new market, a modified product, repositioning, a price change or wider distribution.");
  b.card("DEFINITION", "Relative market share", "A product's sales divided by the sales of the largest rival. Above 1 means the product leads its market.");
  b.card("CONCEPT", "Boston Matrix: star and cash cow", "Star: high share in a fast-growing market, needs investment. Cash cow: high share in a slow-growing market, earns surplus cash.");
  b.card("CONCEPT", "Boston Matrix: question mark and dog", "Question mark (problem child): low share in a fast-growing market; invest or drop. Dog: low share in a slow-growing market; candidate for withdrawal.");
  b.card("FACT", "Limitations of the product life cycle and the Boston Matrix", "Stages vary in length and cannot be predicted; cut-offs are arbitrary; the matrix ignores links between products and the profit a dog may earn.");
  b.card("FORMULA", "Market growth rate", "Market growth (%) = (new market size − old market size) ÷ old market size × 100.");
});
