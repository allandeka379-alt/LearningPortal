// W1a: size.organic-growth
import { concept, P, ZBE, table, r2, pctChange, money, chk } from "../lib.mjs";
import { mc } from "../tables/w1a-lib.mjs";

concept("abus.size.organic-growth", { file: "size/organic-growth", keyPrefix: "size.organic-growth" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is **organic (internal) growth**?",
    ok: ["Growth from the firm's own expansion", "Correct: the firm grows by selling more or opening outlets itself."],
    bad: [["Growth by merging with a rival firm", "That is external growth."], ["Growth by taking over another business", "That is also external growth."], ["Growth caused only by rising prices", "Price changes are not a growth strategy."]],
    explanation: "Organic growth comes from the firm's own efforts, not from buying another business.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of these is a way of growing organically?",
    ok: ["Opening a new branch", "Correct: expanding by the firm's own investment."],
    bad: [["Buying a competitor outright for cash", "That is a takeover."], ["Merging with one of its suppliers", "That is a merger."], ["Selling shares it holds in a competitor", "That is a financial transaction, not growth."]],
    explanation: "New outlets, products and markets are methods of organic growth.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an **advantage** of organic growth compared with a takeover?",
    ok: ["It is gradual, so risk is easier to control", "Correct: growth is slower, but the owner stays in control."],
    bad: [["It gives instant access to a rival's customers", "A takeover does that; organic growth does not."], ["It can be done without any finance", "Expansion normally needs finance."], ["It always raises profit in the first year", "Profit may fall at first as costs rise."]],
    explanation: "Organic growth is steadier, cheaper and easier to control.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the most likely reason for a business wanting to grow?",
    ok: ["To benefit from economies of scale", "Correct: lower average costs raise profit margins."],
    bad: [["To reduce the number of its customers", "Growth aims to attract more customers."], ["To make sure its costs per unit rise", "Growth aims to lower unit costs."], ["To avoid selling in new markets", "Growth often means new markets."]],
    explanation: "Economies of scale are a major motive for growth.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional furniture firm in Bulawayo buys a bigger workshop and a second sawing machine so that it can make 40% more tables. This is an example of growth by",
    ok: ["investing in capacity", "Correct: expanding output using the firm's own resources."],
    bad: [["merging with a rival", "No other firm is involved."], ["franchising", "No one else is licensed to use the brand."], ["taking over a supplier", "No supplier is bought."]],
    hints: ["Is another firm involved?"],
    explanation: "A bigger workshop and machine add capacity: organic growth.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Average cost per unit for a fictional soap maker is US\\$6.00 at 2,000 units and US\\$5.00 at 5,000 units. Which statement is correct?",
    ok: ["It shows economies of scale as output rises", "Correct: the average cost falls as output grows."],
    bad: [["It shows diseconomies of scale", "Diseconomies would mean average cost rising."], ["It shows that costs do not depend on output", "Average cost has changed with output."], ["It shows total costs have fallen", "Total cost must rise with greater output."]],
    hints: ["Does average cost rise or fall?"],
    explanation: "Falling average cost as output rises is the sign of economies of scale.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Why can fast growth cause a profitable firm to run short of cash?",
    ok: ["Stock and wages are paid before customers pay", "Correct: working capital needs rise before the extra sales are paid for."],
    bad: [["Customers pay before they receive their goods", "That would help cash, not harm it."], ["Profit is paid directly to all suppliers", "Profit stays in the firm until it is distributed."], ["Growth always reduces the firm's sales", "Growth normally increases sales."]],
    hints: ["Think about the order of spending and receiving."],
    explanation: "Extra stock and receivables tie up cash, causing overtrading.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which statement is the best judgement on whether a small firm should grow organically or by a takeover?",
    ok: ["Organic is safer; a takeover is faster if funds allow", "Correct: it compares both and states a condition."],
    bad: [["Organic is always best, as takeovers never work", "Many takeovers succeed."], ["A takeover is always best, as it costs nothing", "Takeovers cost a great deal."], ["There is no difference between the two", "They differ in speed, risk and cost."]],
    hints: ["Look for the answer that compares speed with risk."],
    explanation: "Organic growth is slower and safer; takeovers are faster, costlier and riskier.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Opening a second shop using the firm's own profits is an example of organic growth.",
    answer: true,
    explanation: "True. The firm expands using its own resources without buying another business.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Overtrading can only happen to firms that are making a loss.",
    answer: false,
    explanation: "False. Overtrading arises when sales grow faster than finance; the firm may be profitable but still run out of cash.",
    hints: ["Think about cash and profit."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [["Organic growth", "Expansion using the firm's own resources"], ["Economies of scale", "Falling average cost as output rises"], ["Overtrading", "Growing faster than finance allows, causing a cash shortage"], ["Franchising", "Letting others open outlets under the firm's brand"]],
    explanation: "Each term describes a feature of growth.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "Growth from a firm's own efforts is called {{blank:a}} growth, whereas growth by buying another firm is called {{blank:b}} growth.",
    blanks: [
      { id: "a", accepted: ["organic"], choices: ["organic", "external", "negative"] },
      { id: "b", accepted: ["external"], choices: ["organic", "external", "negative"] },
    ],
    explanation: "Organic is internal growth; external growth comes from mergers and takeovers.",
  });

  const ac1 = 12000 / 1500, ac2 = 27000 / 4500;
  chk(ac1, 8);
  chk(ac2, 6);
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: Math.abs(pctChange(ac1, ac2)), calculator: true, daily: true, wrong: [r2(Math.abs(pctChange(ac2, ac1))), 25 + 1],
    stem: "A fictional candle maker in Mutare produces 1,500 candles at a total cost of US\\$12,000. After growing it produces 4,500 candles at a total cost of US\\$27,000. Calculate the percentage fall in average cost per candle, to one decimal place.",
    hints: ["Work out the average cost before and after."],
    explanation: "Before: 12,000 ÷ 1,500 = US\\$8.00. After: 27,000 ÷ 4,500 = US\\$6.00. Fall = 2.00 ÷ 8.00 × 100 = 25.0%. Using the new average cost as the base would give 33.3%.",
  });
  const g = pctChange(180000, 252000);
  chk(g, 40, 0.0001);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: g, calculator: true, wrong: [r2((72000 / 252000) * 100), 72000],
    stem: "A fictional restaurant in Victoria Falls grows its annual sales from US\\$180,000 to US\\$252,000. Calculate the percentage growth in sales, to one decimal place.",
    hints: ["Percentage growth = increase ÷ original × 100."],
    explanation: "Increase = 252,000 − 180,000 = 72,000. 72,000 ÷ 180,000 × 100 = 40.0%. Dividing by the new figure gives 28.6%.",
  });
  const m1 = 8000, m2 = 14000, inv = 5000, cash = 11000;
  const extra = (m2 - m1) * 2 + inv;
  chk(extra, 17000);
  b.num({
    d: 5, skill: "ANALYSIS", kind: "money", value: extra - cash, calculator: true, wrong: [extra, (m2 - m1) * 2],
    stem: "A fictional hardware shop in Harare plans to raise monthly sales from US\\$8,000 to US\\$14,000. Customers pay after two months, so receivables equal two months' sales. Extra stock of US\\$5,000 is needed. The shop has US\\$11,000 of cash. Calculate the cash shortfall if the shop pays for the extra receivables and stock from its cash.",
    hints: ["Receivables before and after = 2 × monthly sales."],
    explanation: "Extra receivables = 2 × (14,000 − 8,000) = 12,000. Extra working capital = 12,000 + 5,000 = 17,000. Shortfall = 17,000 − 11,000 = US\\$6,000. US\\$17,000 is the amount needed, not the shortfall.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** method of organic growth.",
    accepted: ["new products", "new markets", "more outlets", "opening new branches", "investing in capacity", "franchising", "opening a new shop", "launching a new product", "increasing capacity", "advertising", "new branch"],
    explanation: "Accept new products, new markets, more outlets, investment in capacity or franchising.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain **one** advantage and **one** limitation of organic growth.",
    points: ["Advantage: it is gradual and the owner stays in control", "Limitation: it is slow because it depends on the firm's own profits and finance", "Development: rivals may gain market share in the meantime"],
    modelAnswer: "Organic growth is gradual, so the owner stays in control and risk is lower. However, it is slow because it depends on the firm's own profits and finance, and rivals may gain market share in the meantime.",
    hints: ["Think about speed and control."],
    explanation: "An advantage and a developed limitation.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Chipo owns a fictional bakery in Masvingo. Explain **two** ways in which she could grow the business organically.",
    points: ["Open a new shop in another suburb", "Application: it reaches new customers without buying another bakery", "Launch new products such as cakes", "Application: customers can buy more from her and attract new buyers"],
    modelAnswer: "She could open a second shop in another suburb, which reaches new customers without buying another bakery. She could also launch new products such as cakes, which encourages existing customers to buy more and attracts new ones.",
    hints: ["Consider outlets and products."],
    explanation: "Two ways, each applied.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how delegation can help a growing enterprise.",
    points: ["The owner cannot manage everything as the business grows", "Delegation gives authority to managers or supervisors", "This frees the owner to deal with finance and strategy", "Decisions are made faster nearer to customers, though the owner needs controls"],
    modelAnswer: "As a business grows the owner cannot manage everything. Delegation gives authority to managers, which frees the owner for finance and strategy and lets decisions be made faster close to customers. The owner must still use controls so that standards are kept.",
    hints: ["Follow the chain from workload to decisions."],
    explanation: "A chain of benefits with a condition.",
    applies: ZBE,
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Evaluate the view that rapid growth is always the best strategy for a small business.",
    points: ["Rapid growth can bring economies of scale and market share", "It may lead to overtrading, because cash is needed before sales are paid for", "Quality and control may suffer if management does not keep pace", "Slower growth is easier to finance and manage", "Counter-argument: delaying growth may allow rivals to take the market", "Judgement with a condition, e.g. growth is best if finance and management can keep pace"],
    modelAnswer: "Rapid growth can bring economies of scale and a larger market share. But it may cause overtrading because the firm must pay for stock and wages before customers pay, and quality may fall if management does not keep pace. Slower growth is easier to finance, though rivals may take the market meanwhile. Rapid growth is the better strategy only if the firm has the finance and managers to cope.",
    hints: ["Weigh the gains against cash and control problems."],
    explanation: "Both sides and a conditional judgement.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional bakery chain in Gweru has grown from one shop to four. The table shows its output and total costs at two scales.\n\n" + table(["Scale", "Loaves a month", "Total cost (US\\$)"], [["One shop", 12000, 9000], ["Four shops", 50000, 32500]]),
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: 9000 / 12000, stem: "Calculate the average cost per loaf at one shop.", wrong: [12000 / 9000], explanation: "9,000 ÷ 12,000 = US\\$0.75." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: 32500 / 50000, stem: "Calculate the average cost per loaf at four shops.", wrong: [50000 / 32500], explanation: "32,500 ÷ 50,000 = US\\$0.65." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain **one** reason for the change in average cost as the chain grew.", points: ["Economies of scale: lower average cost as output rises", "For example, bulk buying of flour at a discount", "Or fixed costs such as head-office staff spread over more loaves"], modelAnswer: "The chain has gained economies of scale. For example, it can buy flour in larger amounts at a discount, and fixed costs such as head-office staff are spread over more loaves, so the average cost per loaf falls from US\\$0.75 to US\\$0.65.", explanation: "A reason linked to the case." }),
    ],
    hints: ["Average cost = total cost ÷ output."],
    explanation: "US\\$0.75 falls to US\\$0.65: economies of scale.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional jewellery maker, Tendai, in Harare has a chance to supply a chain of 20 shops, which would triple his sales. He would need two more workers, a second machine and more silver. The chain would pay 90 days after delivery. Tendai has little cash and no manager.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain why accepting the order might cause cash-flow problems for Tendai.", points: ["He must pay for silver, wages and the machine before he is paid", "The chain pays 90 days after delivery, so cash comes in late", "He has little cash, so he may be unable to pay bills (overtrading)"], modelAnswer: "Tendai must pay for silver, wages and the machine before the chain pays, and the chain pays 90 days after delivery. With little cash, he may be unable to pay his bills even though sales have grown.", explanation: "Timing of cash." }),
      P.manual({ label: "(b)", marks: 6, stem: "Evaluate whether Tendai should accept the whole order.", points: ["Benefit: sales triple; economies of scale; security of a large customer", "Risk: overtrading and a cash shortage", "Risk: no manager, so quality and delivery may suffer", "Alternative: accept part of the order or arrange finance first", "Dependence on a single large customer", "Judgement and reason"], modelAnswer: "The order would triple his sales and could lower costs, and a large customer gives security. But Tendai would have to pay for silver and wages 90 days before payment, with little cash, and without a manager quality may suffer. He would also depend on one customer. He should accept only part of the order, or arrange an overdraft and a supervisor first, because losing the chain through poor delivery would be worse than growing more slowly.", hints: ["Balance the benefit of growth against cash and management risk."], explanation: "Growth versus risk with a recommendation." }),
    ],
    hints: ["Look at timing of payments."],
    explanation: "Cash timing is the key risk; part acceptance or prior finance reduces it.",
    applies: ZBE,
  });

  b.card("DEFINITION", "Organic (internal) growth", "Expansion by the firm's own efforts: new products, new markets, new outlets or more capacity, rather than buying another firm.");
  b.card("DEFINITION", "Economies of scale", "Falling average cost per unit as output rises, e.g. from bulk buying or spreading fixed costs.");
  b.card("DEFINITION", "Overtrading", "Growing sales faster than finance allows, so cash runs out even though the business may be profitable.");
  b.card("FACT", "Reasons for growth", "Economies of scale, greater market share, security, profit and the owner's ambition.");
  b.card("FACT", "Ways of growing organically", "New products, new markets, more outlets, investment in capacity and franchising.");
  b.card("CONCEPT", "Advantages of organic growth", "Less risky, financed from profits, keeps control and culture, and the firm learns as it grows.");
  b.card("CONCEPT", "Limits of organic growth", "Slow, limited by profits and finance, and rivals may respond or the market may be saturated.");
  b.card("FACT", "Managing a growing enterprise (BES)", "Delegation, controls (budgets, stock and cash checks), a finance plan and recruiting and training staff.", undefined, { applies: ZBE });
  b.card("FORMULA", "Average cost per unit", "Total cost ÷ number of units produced.");
});
