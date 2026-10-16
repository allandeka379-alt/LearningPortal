// W3a: marketing.role-objectives
import { concept, P, CAM, ZIM, table, r2, market, pctChange, money, chk } from "../lib.mjs";
import { mc } from "../tables/w3a-lib.mjs";

concept("abus.marketing.role-objectives", { file: "marketing/role-objectives", keyPrefix: "marketing.role-objectives" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of the following is the best description of **marketing**?",
    ok: ["Identifying and meeting customers' needs at a profit", "Correct: this is the core of marketing."],
    bad: [["Placing advertisements in newspapers and on the radio", "Advertising is only one part of promotion."], ["Selling the products that the firm already makes", "That describes a sales orientation."], ["Setting the lowest possible price for each product", "Price is only one element of the mix."]],
    explanation: "Marketing is the process of identifying, anticipating and satisfying customer needs profitably.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of these is a **marketing objective**?",
    ok: ["To raise market share from 10% to 14% in two years", "Correct: it is specific and measurable and concerns the market."],
    bad: [["To reduce the cost of raw materials by a fifth", "This is an objective for operations or purchasing."], ["To recruit five extra machine operators this year", "This is a human resources objective."], ["To repay the bank loan within the next three years", "This is a finance objective."]],
    explanation: "A marketing objective concerns the market, such as share, sales, brand awareness or retention.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A fictional furniture maker in Gweru makes what its workshop finds easiest and then tries to persuade shops to buy it. Which orientation is this?",
    ok: ["Product or sales orientation, as it starts with output", "Correct: it starts from what the firm makes, not from what customers want."],
    bad: [["Marketing orientation, as it uses customer research", "No customer research is described."], ["Customer relationship marketing, as it builds loyalty", "No loyalty building is described."], ["Market orientation, as it responds to changes in tastes", "The firm does not respond to tastes."]],
    explanation: "The firm starts from its own production, not from customers' needs.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Why must the marketing and operations departments of a business work together?",
    ok: ["Promises made to customers must be possible to deliver", "Correct: late or poor-quality products lose customers."],
    bad: [["Marketing sets the wages that operations staff earn", "Wages are decided by human resources and finance."], ["Operations decide what advertising to place on radio", "Promotion is a marketing decision."], ["Both departments always have identical objectives", "Their objectives differ but must be consistent."]],
    explanation: "Marketing depends on operations to supply the product in the right quantity, quality and time.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of the following is a tool of **customer relationship marketing**?",
    ok: ["A loyalty card with rewards for repeat purchases", "Correct: it encourages customers to buy again."],
    bad: [["A once-only discount on goods bought in bulk by shops", "A one-off discount does not build a long-term relationship."], ["A cut in the number of products on sale each month", "This is not a CRM tool."], ["A rise in the price of all the products by 10%", "A price rise does not build loyalty."]],
    explanation: "Loyalty cards, databases and personal contact build long-term relationships.",
    applies: CAM,
  });
  const cur = 240000, mk = 2000000;
  const sh = market.share(cur, mk);
  chk(sh, 12, 1e-9);
  const need = 0.15 * mk;
  chk(need, 300000, 1e-6);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional hardware shop in Mutare has sales of US\\$240,000 in a market of US\\$2,000,000. Its marketing objective is a 15% share of the same market. What sales does it need?",
    ok: ["US\\$300,000", "Correct: 15% × 2,000,000 = 300,000."],
    bad: [["US\\$360,000", "This applies 15% to the firm's sales plus the market."], ["US\\$255,000", "This adds 15% of the firm's own sales, not 15% of the market."], ["US\\$60,000", "This is the extra sales needed, not the total."]],
    hints: ["Target share × market size."],
    explanation: "Target sales = 15% × US\\$2,000,000 = US\\$300,000, which is US\\$60,000 more than now.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A fictional bakery sets a marketing objective of raising sales by 40% in a year. Operations can raise output by only 10%. What is the MOST likely result if the plan goes ahead?",
    ok: ["Orders unmet, so customers are lost", "Correct: the objective is not consistent with the firm's capacity."],
    bad: [["Costs fall because output is below demand", "Costs per unit do not fall because demand is unmet."], ["Customer loyalty is certain to rise strongly", "Failure to supply damages loyalty."], ["Finance has no need to change the budget at all", "A sales plan always affects the budget."]],
    hints: ["Compare the target with what operations can supply."],
    explanation: "Marketing objectives must fit the resources of operations and finance.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional trader in Harare sells a scarce imported medicine and has only one competitor. Which statement is the BEST judgement about adopting a full marketing orientation?",
    ok: ["It may add cost for little gain while supply is still scarce", "Correct: demand exceeds supply, so a product focus may suffice."],
    bad: [["It is essential in every market without any exception at all", "It depends on the market conditions."], ["It will always lower the trader's costs of selling and research", "Research and promotion add cost."], ["It makes it impossible to meet any single customer's needs", "A marketing orientation aims to meet needs."]],
    hints: ["Think about how competitive the market is."],
    explanation: "A marketing orientation has costs and is most valuable in competitive markets.",
  });

  b.tf({
    d: 1, skill: "RECALL", daily: false,
    stem: "A marketing objective should be set without reference to the corporate objectives of the business.",
    answer: false,
    explanation: "False. Marketing objectives must support and be consistent with the corporate objectives.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Keeping an existing customer is usually cheaper than winning a new one.",
    answer: true,
    explanation: "True. This is one reason why firms use customer relationship marketing: repeat customers cost less to serve than new ones cost to win.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each orientation to its description.",
    pairs: [["Production orientation", "Focus on efficient output of what the firm can make"], ["Sales orientation", "Focus on persuading customers to buy existing products"], ["Marketing orientation", "Focus on finding and meeting customers' needs"]],
    extraRight: ["Focus on cutting prices to the lowest level"],
    explanation: "The orientation shows where the business starts: its output, its sales effort or its customers.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "Marketing objectives must be {{blank:a}} with the corporate objectives, and they should be specific and {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["consistent"], choices: ["consistent", "unrelated", "opposed"] },
      { id: "b", accepted: ["measurable"], choices: ["measurable", "vague", "optional"] },
    ],
    explanation: "A marketing objective supports the corporate objective and is measurable so that success can be judged.",
  });

  const extra = need - cur;
  const rise = pctChange(cur, need);
  chk(rise, 25, 1e-9);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: rise, calculator: true, daily: true, wrong: [20, r2((need - cur) / need * 100)],
    stem: "The hardware shop above has sales of US\\$240,000 and a target of US\\$300,000. Calculate the percentage rise in sales needed, to one decimal place.",
    hints: ["Extra sales ÷ present sales × 100."],
    explanation: "Extra sales = 300,000 − 240,000 = 60,000. 60,000 ÷ 240,000 × 100 = 25.0%. Using the target as the base gives 20.0%, which is the wrong denominator.",
  });
  const members = 120, spend = 25, months = 12, gm = 0.2, cost = 4500;
  const gp = members * spend * months * gm;
  chk(gp, 7200, 1e-6);
  const net = gp - cost;
  chk(net, 2700, 1e-6);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: net, calculator: true, wrong: [members * spend * months, gp],
    stem: "A fictional pharmacy in Chinhoyi spends US\\$4,500 a year on a loyalty scheme. It expects the scheme to keep 120 customers who each spend US\\$25 a month for 12 months, and its gross profit is 20% of sales. Calculate the expected net benefit of the scheme for the year.",
    hints: ["Find the sales kept, then the gross profit, then take away the cost."],
    explanation: "Sales kept = 120 × 25 × 12 = US\\$36,000. Gross profit = 20% × 36,000 = US\\$7,200. Net benefit = 7,200 − 4,500 = US\\$2,700. US\\$36,000 is the sales, not the profit, and US\\$7,200 forgets the cost.",
    workedSolution: "1. Sales kept = 120 × 25 × 12 = US\\$36,000.\n2. Gross profit on those sales = 20% × 36,000 = US\\$7,200.\n3. Net benefit = 7,200 − 4,500 = US\\$2,700.",
  });

  b.short({
    d: 1, skill: "RECALL",
    stem: "State the term for marketing carried out through websites, email and social media.",
    accepted: ["e-marketing", "emarketing", "electronic marketing", "internet marketing", "digital marketing", "online marketing"],
    explanation: "E-marketing uses electronic media to reach and serve customers.",
    applies: ZIM,
  });
  b.short({
    d: 2, skill: "UNDERSTANDING",
    stem: "Name the type of marketing that tries to build a long-term, profitable relationship with individual customers.",
    accepted: ["customer relationship marketing", "crm", "relationship marketing"],
    explanation: "Customer relationship marketing (CRM).",
    applies: CAM,
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain **one** way in which marketing depends on the finance department.",
    points: ["Marketing needs a budget for research and promotion from finance", "Prices set by marketing must cover the costs calculated by finance", "So spending and pricing decisions must be agreed with finance"],
    modelAnswer: "Marketing needs finance to approve a budget for research and promotion. Prices must also cover the costs that finance calculates, so spending and pricing decisions have to be agreed with finance.",
    hints: ["Think of a budget and of prices."],
    explanation: "One dependency, developed.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional dairy in Bulawayo has the corporate objective of raising profit. Explain **two** marketing objectives it could set to help achieve this.",
    points: ["Increase market share, e.g. from 12% to 15%", "Application: more sales of milk and yoghurt, giving more revenue", "Improve customer retention", "Application: repeat customers buy regularly, so sales are more stable and cheaper to win"],
    modelAnswer: "The dairy could aim to raise its market share from 12% to 15%, which means more sales of milk and yoghurt and so more revenue. It could also aim to keep more of its customers, because repeat customers buy regularly and cost less to win than new ones.",
    hints: ["Choose objectives that are measurable and link them to profit."],
    explanation: "Two objectives, each linked to profit.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how a failure of communication between marketing and operations could harm a fictional bakery.",
    points: ["Marketing promises a delivery date or quantity", "Operations are not told or cannot meet it", "Late or short deliveries disappoint customers", "So loyalty and future sales fall, and the bakery's reputation is damaged"],
    modelAnswer: "If marketing promises a large order by a certain day without telling operations, the ovens may not be able to meet it. Late or short deliveries disappoint customers, so they buy elsewhere and the bakery's reputation and future sales suffer.",
    hints: ["Follow the chain from promise to delivery to loyalty."],
    explanation: "A chain from poor coordination to lost customers.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional restaurant in Victoria Falls is considering a customer relationship marketing scheme for local residents, although most of its customers are tourists who visit once. Evaluate whether the scheme is a good idea.",
    points: ["CRM suits customers who buy often, such as local residents", "Repeat local customers give a steady income in the off-season", "Tourists visit once, so a scheme would not help with them", "The scheme costs money and discounts reduce profit per meal", "Benefit depends on how many residents already eat there", "Judgement with a reason, e.g. worthwhile in a small form aimed only at residents"],
    modelAnswer: "A scheme suits customers who buy often, so local residents would benefit, and they provide a steady income when tourists are few. It would not help with tourists who visit once, and the cost of rewards and discounts reduces the profit on each meal. The scheme is worthwhile only in a small form aimed at residents, if enough of them already eat at the restaurant to cover the cost.",
    hints: ["Which customers would use the scheme, and what does it cost?"],
    explanation: "A judgement based on who the customers are.",
  });

  const share = (a, m) => market.share(a, m);
  const rows = [["Spice Corner", 180000], ["Ndlovu Grill", 120000], ["Chipo's Kitchen", 300000]];
  const totalMk = rows.reduce((s, r) => s + r[1], 0);
  chk(totalMk, 600000, 1e-9);
  const targetShare = 40;
  const targetSales = (targetShare / 100) * totalMk;
  chk(targetSales, 240000, 1e-6);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true, examStyle: true,
    stem: "Three fictional takeaways in Masvingo make up the whole local market. Their annual sales are shown below.\n\n" + table(["Takeaway", "Annual sales (US\\$)"], rows) + "\n\nSpice Corner's owner sets a marketing objective of a 40% share of this market (assume the market stays the same size).",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: share(180000, totalMk), stem: "Calculate Spice Corner's present market share, to one decimal place.", wrong: [r2(share(300000, totalMk)), r2(180000 / 120000 * 100)], explanation: "Market = 180,000 + 120,000 + 300,000 = 600,000. 180,000 ÷ 600,000 × 100 = 30.0%." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: targetSales - 180000, stem: "Calculate the extra annual sales Spice Corner needs to reach its objective.", wrong: [targetSales, 0.1 * 180000], explanation: "Target sales = 40% × 600,000 = 240,000. Extra sales = 240,000 − 180,000 = US\\$60,000." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain **one** way in which the marketing objective could affect the operations department.", points: ["Sales must rise by a third (US\\$60,000 on US\\$180,000)", "Operations must produce more meals, perhaps with extra staff or equipment", "If capacity cannot be raised, the objective cannot be met"], modelAnswer: "Sales must rise by a third, so operations must produce many more meals, perhaps with extra cooks or equipment. If capacity cannot be raised, the objective cannot be met.", explanation: "The effect on capacity." }),
    ],
    hints: ["Add the three sales figures to find the market."],
    explanation: "Present share 30.0%; extra sales US\\$60,000; operations must expand capacity.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true,
    stem: "Read the extract. Dube Electronics is a fictional business in Gaborone selling phones and accessories. For ten years it bought the cheapest phones it could find and relied on staff to persuade customers to buy them. Sales have fallen as rivals offer more choice and after-sales repairs. The owner now plans to survey customers, keep a database of purchases and give regular customers a discount card.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Identify the orientation that Dube Electronics has followed so far and explain your choice.", points: ["Sales orientation (or product orientation)", "It buys what is cheap, not what customers want", "It relies on persuasion by staff"], modelAnswer: "A sales orientation. The firm buys the cheapest phones, not those customers want, and relies on staff to persuade customers to buy them.", explanation: "The start is the firm's product, not the customer." }),
      P.manual({ label: "(b)", marks: 6, stem: "Assess the benefits and costs to Dube Electronics of moving to customer relationship marketing.", points: ["Benefit: a database shows what customers buy so stock can match demand", "Benefit: the discount card encourages repeat purchases", "Benefit: loyal customers recommend the shop and keep sales steadier", "Cost: the survey, database and discounts cost money", "Cost: discounts reduce the profit on each phone", "Judgement with reason, e.g. worthwhile if repeat sales rise by more than the costs"], modelAnswer: "A database shows what customers buy, so stock can match demand, and a discount card encourages repeat purchases and recommendations, making sales steadier. However, the survey, database and discounts cost money and discounts reduce the profit on each phone. The change is worthwhile if repeat sales rise by more than the cost, and as sales are already falling to competitors with more choice, it is probably a good move.", explanation: "Benefits and costs weighed in the case." }),
    ],
    hints: ["Look for where the firm starts: its product or its customers."],
    explanation: "Sales orientation; CRM brings repeat sales and information but costs money and reduces unit profit.",
  });

  b.card("DEFINITION", "Marketing", "Identifying, anticipating and satisfying customers' needs and wants profitably.");
  b.card("DEFINITION", "Marketing objective", "A specific, measurable target for marketing that supports the corporate objective, such as a 15% market share.");
  b.card("CONCEPT", "Links between marketing and other functions", "Finance supplies the budget, operations supply the product, human resources supply trained staff; marketing supplies forecasts.");
  b.card("FACT", "Examples of marketing objectives", "Increase sales, increase market share, launch a new product, raise brand awareness, improve customer retention.");
  b.card("CONCEPT", "Production orientation", "The business starts from what it can make efficiently; suits scarce supply but may ignore what customers want.");
  b.card("CONCEPT", "Sales orientation", "The business tries to sell what it already makes by persuasion; ignores customer needs and loyalty.");
  b.card("CONCEPT", "Marketing orientation", "The business starts from what customers want, found by research; products fit demand but research costs money.", undefined);
  b.card("DEFINITION", "Customer relationship marketing", "Marketing that builds a long-term profitable relationship with individual customers through information and service.", undefined, { applies: CAM });
  b.card("FACT", "Tools of CRM", "Customer database, loyalty cards, personal contact, after-sales service and social media.", undefined, { applies: CAM });
});
