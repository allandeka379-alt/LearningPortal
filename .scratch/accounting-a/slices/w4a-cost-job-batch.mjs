// W4a: cost.job-batch
import { concept, P, table, chk, r2, statement } from "../lib.mjs";
import { mc, F, usd, p1, p2 } from "../tables/w4a-lib.mjs";

concept("aacc.cost.job-batch", { file: "cost/job-batch", keyPrefix: "cost.job-batch" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "For which type of business is job costing most suitable?",
    ok: ["One that produces to individual customers' orders", "Correct: each order differs, so each is costed separately."],
    bad: [["One that produces a single standard item continuously", "That business uses unit costing."], ["One that buys and sells goods without changing them", "Trading businesses use cost of sales, not job costs."], ["One whose costs are all fixed in the short run", "Job costing is about tracing costs to orders, not behaviour."]],
    explanation: "Job costing traces costs to each customer's order. A business making one standard product uses unit costing.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How is the cost per unit of a batch found?",
    ok: ["Total cost of the batch ÷ number of units produced", "Correct: the whole batch cost is shared by the units."],
    bad: [["Prime cost of the batch ÷ number of units sold", "It leaves out overheads and uses units sold instead of units produced."], ["Total cost of the batch × number of units", "This multiplies instead of dividing."], ["Selling price of the batch ÷ number of units", "That gives the revenue per unit, not the cost."]],
    explanation: "Cost per unit = total batch cost (prime cost plus absorbed overheads) ÷ units produced.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the difference between a mark-up and a margin?",
    ok: ["Mark-up is a percentage of cost; margin is a percentage of selling price", "Correct: they use different bases."],
    bad: [["Mark-up is a percentage of selling price; margin is a percentage of cost", "The wrong way round."], ["They are the same and are used in the same way", "They give different selling prices for the same percentage."], ["Mark-up includes overheads and margin excludes them", "Both are applied to a stated cost; neither is about overheads."]],
    explanation: "Mark-up = profit ÷ cost. Margin = profit ÷ selling price. A 25% mark-up equals a 20% margin.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "The total cost of a job is US\\$250. The firm adds a mark-up of 40% on cost. What is the selling price?",
    ok: ["US\\$350", "Correct: 250 × 1.40."],
    bad: [["US\\$100", "This is the profit only, not the price."], ["US\\$417", "This divides by 0.6, treating 40% as a margin on the price."], ["US\\$290", "This adds 40 as a dollar amount to the cost."]],
    hints: ["Mark-up is a percentage of cost."],
    explanation: "Selling price = 250 + 40% × 250 = US\\$350.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "The total cost of a job is US\\$200. The firm wants a profit margin of 20% on the selling price. What is the selling price?",
    ok: ["US\\$250", "Correct: 200 ÷ 0.80."],
    bad: [["US\\$240", "This adds 20% of the cost, which is a mark-up and not a margin."], ["US\\$220", "This adds 10% to the cost."], ["US\\$160", "This takes 20% off the cost instead of adding profit."]],
    hints: ["Cost is 80% of the selling price."],
    explanation: "With a 20% margin, cost is 80% of the price: price = 200 ÷ 0.80 = US\\$250 (a mark-up of 25%).",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A batch has a set-up cost of US\\$300. If the batch size doubles and the other costs per unit stay the same, what happens to the cost per unit?",
    ok: ["It falls, because the set-up cost is shared by more units", "Correct: the set-up per unit is halved."],
    bad: [["It rises, because more units are made", "Variable costs per unit are the same; only the set-up per unit changes."], ["It stays the same, because costs are proportional to output", "The set-up cost is fixed for the batch."], ["It falls to zero because set-up is a fixed cost", "It is spread over more units, not removed."]],
    hints: ["Divide the batch set-up cost by the number of units."],
    explanation: "The set-up cost is incurred once per batch, so a bigger batch gives a lower set-up cost per unit.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A printer quotes all jobs at 10% above total cost. A rival says this wastes money. What is the best comment?",
    ok: ["A fixed percentage ignores competition and may price some jobs too high or low", "Correct: cost-plus pricing ignores the market."],
    bad: [["A fixed mark-up guarantees every job earns the same profit in dollars", "A percentage gives different dollar profits for different costs."], ["Cost-plus pricing cannot be used for jobs, only for batches", "It is used widely in job costing."], ["Only the materials should be included in the cost", "Labour and overheads should also be included."]],
    hints: ["What does cost-plus pricing ignore?"],
    explanation: "Cost-plus pricing is simple and ensures that cost is covered, but it ignores demand and competitors' prices.",
  });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A job cost sheet includes the overhead absorbed by the job at the pre-determined rate.", answer: true, explanation: "True. Production overhead is absorbed at the rate on the stated base, such as direct labour hours." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "A mark-up of 50% on cost gives a profit margin of 50% on selling price.", answer: false, hints: ["Work out with a cost of 100."], explanation: "False. Cost 100 plus 50% gives 150; profit 50 is 33.3% of the price." });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each business to the costing method most suitable.",
    pairs: ["A signwriter making individual signboards", "A bakery producing 3,000 identical loaves in a run", "A cement works making one grade of cement", "A garage repairing customers' vehicles"],
    right: ["Job costing", "Batch costing", "Unit costing", "Job costing in a service business"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Individual orders: job costing. A run of identical items: batch costing. One standard product: unit costing. Repairs: job costing for a service.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "Direct materials, direct labour and direct expenses make up the {{blank:a}} cost. Adding absorbed production overhead gives the {{blank:b}} cost.",
    blanks: [{ id: "a", accepted: ["prime"], choices: ["prime", "marginal", "period"] }, { id: "b", accepted: ["production"], choices: ["production", "variable", "selling"] }],
    explanation: "Prime cost plus production overhead is the production cost.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "Name the document on which the costs of an individual customer's order are recorded.", accepted: ["job cost sheet", "job cost card", "cost sheet", "job card"], explanation: "It is the job cost sheet (or job cost card)." });

  const dm = 380, dlh = 14, dlr = 6, de = 45, ohr = 4.5;
  const prime = dm + dlh * dlr + de, prodC = prime + dlh * ohr;
  chk(prime, 509); chk(prodC, 572);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: prime, calculator: true, daily: true, wrong: [dm + dlh * dlr, prodC],
    stem: `A Mutare joiner's job uses materials costing ${usd(dm)}. A carpenter worked ${dlh} hours at ${usd(dlr)} an hour and a tool hired for the job cost ${usd(de)}. Calculate the prime cost of the job.`,
    explanation: `${dm} + ${dlh} × ${dlr} + ${de} = ${usd(prime)}. Leaving out the hired tool gives ${usd(dm + dlh * dlr)}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: prodC, calculator: true, wrong: [prime + dlh * dlr, prime + ohr],
    stem: `Production overhead is absorbed at ${usd(ohr)} per direct labour hour. Using the previous question, calculate the production cost of the job.`,
    hints: ["Absorbed overhead = hours × rate."],
    explanation: `Overhead absorbed = ${dlh} × ${ohr} = ${F(dlh * ohr)}. Production cost = ${F(prime)} + ${F(dlh * ohr)} = ${usd(prodC)}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: prodC * 1.3, dp: 2, calculator: true, wrong: [prodC / 0.7, prodC * 0.3],
    stem: `The firm adds a mark-up of 30% to the production cost of ${usd(prodC)}. Calculate the selling price.`,
    hints: ["Mark-up is a percentage of cost."],
    explanation: `${F(prodC)} × 1.30 = ${usd(prodC * 1.3)}. Dividing by 0.70 would treat 30% as a margin on the price.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: prodC / 0.8, dp: 2, calculator: true, wrong: [prodC * 1.2, prodC * 0.8],
    stem: `Instead, the firm wants a profit margin of 20% on the selling price of the job costing ${usd(prodC)}. Calculate the selling price.`,
    hints: ["Cost is 80% of the price."],
    explanation: `${F(prodC)} ÷ 0.80 = ${usd(prodC / 0.8)}. Adding 20% to the cost would give ${usd(prodC * 1.2)}, which is a mark-up and not a margin.`,
  });
  const bt = { dm: 3200, h: 400, r: 4, setup: 320, ohr: 2.5, n: 800 };
  const btot = bt.dm + bt.h * bt.r + bt.setup + bt.h * bt.ohr;
  chk(btot, 6120);
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: btot / bt.n, dp: 2, calculator: true, wrong: [(bt.dm + bt.h * bt.r) / bt.n, btot / (bt.n + 100)],
    stem: `A Gweru factory makes a batch of ${bt.n} school bags. Materials cost ${usd(bt.dm)}; direct labour was ${bt.h} hours at ${usd(bt.r)}; machine set-up for the batch cost ${usd(bt.setup)}; overhead is absorbed at ${usd(bt.ohr)} per labour hour. Calculate the cost of one bag to the nearest cent.`,
    hints: ["Include the set-up and the overhead in the batch cost."],
    explanation: `Batch cost = ${F(bt.dm)} + ${F(bt.h * bt.r)} + ${F(bt.setup)} + ${F(bt.h * bt.ohr)} = ${F(btot)}. Cost per bag = ${F(btot)} ÷ ${bt.n} = ${usd(btot / bt.n)}.`,
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a mark-up of 25% on cost is not the same as a margin of 25% on selling price.",
    points: ["A mark-up is calculated on cost and a margin on selling price", "Profit is a smaller share of the larger price, so a 25% mark-up equals only a 20% margin"],
    modelAnswer: "The bases differ: mark-up uses cost and margin uses price. A 25% mark-up on cost 100 gives a price of 125 and a margin of 20%.",
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a larger batch usually reduces the cost per unit.",
    points: ["Batch costs such as machine set-up are incurred once per batch", "They are shared by more units in a larger batch", "Other costs per unit stay the same, so the total cost per unit falls"],
    modelAnswer: "Costs like set-up are incurred once per batch, so a bigger batch shares them among more units. Other unit costs are unchanged, so the cost per unit falls.",
    hints: ["Which cost is incurred once per batch?"],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Evaluate the use of cost-plus pricing for jobs by a small signwriting business.",
    points: ["It is simple and ensures that each job covers its cost and a profit", "It is based on a job cost sheet, which also helps to control costs", "It ignores demand and competitors, so prices may be too high or too low", "Judgement: useful as a starting point, adjusted for competitors' prices and the customer"],
    modelAnswer: "Cost-plus is simple and ensures that cost and profit are covered. But it ignores what customers will pay and what rivals charge. The signwriter should use it as a starting point and adjust for the market.",
    hints: ["Give a use, a limit and a judgement."],
    explanation: "One mark for each point.",
  });

  // Structured 1 (12)
  const J = { timber: 220, paint: 65, fix: 35, carp: 12, carpR: 8, pntr: 5, pntrR: 7, deliv: 60, ohr: 5, admin: 74 };
  const jDM = J.timber + J.paint + J.fix, jDL = J.carp * J.carpR + J.pntr * J.pntrR;
  const jPrime = jDM + jDL + J.deliv, jOH = (J.carp + J.pntr) * J.ohr, jProd = jPrime + jOH, jTot = jProd + J.admin;
  chk(jPrime, 511); chk(jOH, 85); chk(jTot, 670);
  const jPrice = jTot / 0.8;
  chk(jPrice, 837.5);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Gweru Signwriters produced a wooden sign. The job used timber ${usd(J.timber)}, paint ${usd(J.paint)} and fixings ${usd(J.fix)}. A carpenter worked ${J.carp} hours at ${usd(J.carpR)} and a painter ${J.pntr} hours at ${usd(J.pntrR)}. Hire of a delivery vehicle for the job cost ${usd(J.deliv)}. Production overhead is absorbed at ${usd(J.ohr)} per direct labour hour, and ${usd(J.admin)} of selling and administration overhead is charged to the job.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: jPrime, wrong: [jDM + jDL, jProd], stem: "Calculate the prime cost of the job.", explanation: `Materials ${F(jDM)} + labour ${F(jDL)} + delivery hire ${F(J.deliv)} = ${usd(jPrime)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: jOH, wrong: [J.carp * J.ohr, jDL], stem: "Calculate the production overhead absorbed by the job.", explanation: `${J.carp + J.pntr} direct labour hours × ${J.ohr} = ${usd(jOH)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: jTot, wrong: [jProd, jTot - J.deliv], stem: "Calculate the total cost of the job.", explanation: `Prime cost ${F(jPrime)} + overhead ${F(jOH)} + administration ${F(J.admin)} = ${usd(jTot)}.` }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: jPrice, dp: 2, wrong: [jTot * 1.2, jTot * 0.8], stem: "The business wants a profit margin of 20% on the selling price. Calculate the price to charge.", hints: ["Cost is 80% of the price."], explanation: `${F(jTot)} ÷ 0.80 = ${usd(jPrice)}.` }),
      P.manual({ label: "(e)", marks: 3, stem: "The customer offers US\\$800 for the sign. Advise whether to accept, referring to your figures and one non-financial factor.".replace(/US\\$/g, "US\\$"), points: [`US\\$800 is above the total cost of ${F(jTot)}, so the job earns ${F(800 - jTot)} profit`.replace(/US\\$/g, "US\\$"), "But the profit is below the target margin of 20% (the target price is higher)", "Non-financial: the chance of repeat orders from the customer, or spare capacity; decide accordingly"], modelAnswer: `At US\\$800 the job covers its cost of ${F(jTot)} with a profit of ${F(800 - jTot)}, but below the target margin. If the workshop has spare capacity and the customer may order again, accept; otherwise ask for more.`.replace(/US\\$/g, "US\\$"), explanation: "One mark for each point." }),
    ],
    hints: ["Direct labour hours for the overhead are carpenter plus painter.", "Delivery hire is a direct expense."],
    explanation: "This item tests a job cost sheet, a margin-based price and a short recommendation.",
  });
  chk(800 - jTot, 130);

  // Structured 2 (14)
  const K = { setup: 200, vpu: 4, small: 400, large: 1000, price: 5.5 };
  const kS = K.setup + K.vpu * K.small, kL = K.setup + K.vpu * K.large;
  chk(kS, 1800); chk(kL, 4200);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `Bindura Cookies bakes cookies in batches. Each batch needs a machine set-up costing ${usd(K.setup)}. All other costs (materials, labour and overhead) are ${usd(K.vpu)} for each cookie. The business is deciding between a batch of ${F(K.small)} cookies and a batch of ${F(K.large)} cookies. The selling price is ${usd(K.price)} a cookie.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: kS, wrong: [K.vpu * K.small, K.setup], stem: `Calculate the total cost of a batch of ${F(K.small)} cookies.`, explanation: `${F(K.setup)} + ${F(K.small)} × ${K.vpu} = ${usd(kS)}.` }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: kS / K.small, dp: 2, wrong: [K.vpu, kS / K.large], stem: "Calculate the cost per cookie in the small batch.", explanation: `${F(kS)} ÷ ${F(K.small)} = ${usd(kS / K.small)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: kL, wrong: [K.vpu * K.large, K.setup * 2], stem: `Calculate the total cost of a batch of ${F(K.large)} cookies.`, explanation: `${F(K.setup)} + ${F(K.large)} × ${K.vpu} = ${usd(kL)}.` }),
      P.num({ label: "(d)", marks: 1, kind: "money", value: kL / K.large, dp: 2, wrong: [K.vpu, kS / K.small], stem: "Calculate the cost per cookie in the large batch.", explanation: `${F(kL)} ÷ ${F(K.large)} = ${usd(kL / K.large)}.` }),
      P.num({ label: "(e)", marks: 2, kind: "money", value: K.price * K.large - kL, wrong: [K.price * K.large, K.price * K.small - kS], stem: "Calculate the profit on a large batch if all cookies are sold.", explanation: `${K.price} × ${F(K.large)} = ${F(K.price * K.large)}; less ${F(kL)} = ${usd(K.price * K.large - kL)}.` }),
      P.manual({ label: "(f)", marks: 4, stem: "Evaluate whether the business should make the large batch.", points: ["The cost per cookie falls from US\\$4.50 to US\\$4.20 because the set-up is shared".replace(/US\\$/g, "US\\$"), "The large batch earns more profit in total if all the cookies are sold", "But demand may be below 1,000 cookies, leaving unsold stock that can go stale", "Judgement: make the large batch if demand is reliable, otherwise make smaller batches more often"], modelAnswer: "The large batch cuts the cost per cookie and earns more if all are sold. However, unsold cookies would be wasted. It should be made only if demand is reliable.", hints: ["Compare cost per unit and the risk of unsold stock."], explanation: "One mark for each point." }),
      P.manual({ label: "(g)", marks: 2, stem: "State two other examples of costs that are incurred once for each batch.", points: ["Quality inspection of the first items in the batch", "Cleaning or changing tools between batches (or administration of the production order)"], modelAnswer: "Inspection of the first items in a batch and cleaning the machine between batches.", explanation: "One mark for each valid example." }),
    ],
    hints: ["The set-up is incurred once per batch.", "Compare costs per cookie."],
    explanation: "This item compares two batch sizes and evaluates the larger one.",
  });

  b.card("DEFINITION", "Job costing", "Costing work done to a customer's order, with a job cost sheet recording materials, labour, expenses and absorbed overhead.");
  b.card("DEFINITION", "Batch costing", "Costing a quantity of identical units made together; cost per unit = batch cost ÷ units produced.");
  b.card("DEFINITION", "Unit costing", "For a single standard product: total cost of the period ÷ units produced.");
  b.card("FORMULA", "Selling price with a mark-up", "Cost × (1 + mark-up %). Mark-up is a percentage of cost.");
  b.card("FORMULA", "Selling price with a margin", "Cost ÷ (1 - margin %). Margin is a percentage of the selling price.");
  b.card("FACT", "Mark-up to margin", "A 25% mark-up equals a 20% margin; a 50% mark-up equals a 33.3% margin.");
  b.card("CONCEPT", "Cost sheet order", "Direct materials, direct labour, direct expenses = prime cost; add absorbed production overhead = production cost; add other overheads = total cost.");
  b.card("CONCEPT", "Batch size and set-up cost", "Set-up cost is incurred once per batch, so a larger batch gives a lower set-up cost per unit.");
  b.card("FACT", "Not examined", "Contract costing and process costing are not examined.");
});
void p1; void p2; void r2; void table; void statement;
