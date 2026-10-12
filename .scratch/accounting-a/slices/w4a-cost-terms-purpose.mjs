// W4a: cost.terms-purpose
import { concept, P, table, chk, r2 } from "../lib.mjs";
import { mc, F, usd, p1, p2 } from "../tables/w4a-lib.mjs";

concept("aacc.cost.terms-purpose", { file: "cost/terms-purpose", keyPrefix: "cost.terms-purpose" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which term describes a unit of product or service to which costs are traced?",
    ok: ["Cost unit", "Correct: for example a loaf, a job or a kilometre travelled."],
    bad: [["Cost centre", "A cost centre is a place where costs are collected, not the thing costed."], ["Cost code", "A code identifies a cost; it is not what is costed."], ["Cost driver", "A driver is a cause of cost, used in activity based costing."]],
    explanation: "A cost unit is the unit of output (or service) that costs are charged to. A cost centre is the department or activity in which costs are first collected.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a factory making school uniforms, which cost is an indirect cost?",
    ok: ["Salary of the factory supervisor", "Correct: it cannot be traced to a single garment in an economic way."],
    bad: [["Cloth used in a blazer", "Cloth can be traced to the garment, so it is a direct material."], ["Wages of the machinist who sews the blazers", "Machinists' wages are traced to the garments: direct labour."], ["Buttons fitted to each blazer", "Buttons are traceable to each garment: direct material."]],
    explanation: "Indirect costs (overheads) cannot be economically traced to one cost unit. A supervisor works on all the garments.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of the following is a period cost of a manufacturer?",
    ok: ["Salary of the sales manager", "Correct: selling costs are charged to the period in which they arise."],
    bad: [["Direct wages of the assembly workers", "Direct labour is a product cost, carried in inventory until sale."], ["Factory rent", "Production rent is a production overhead and so a product cost."], ["Raw materials used in production", "Materials used are a product cost."]],
    explanation: "Product costs (direct costs and production overheads) are carried in inventory. Selling, distribution and administration costs are period costs charged to profit or loss immediately.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A joiner's costs for one table are: timber US\\$48, the joiner's wages US\\$30, a special varnish bought for this table US\\$6 and workshop rent apportioned US\\$12. What is the prime cost?",
    ok: ["US\\$84", "Correct: 48 + 30 + 6; the varnish is a direct expense or material."],
    bad: [["US\\$78", "This leaves out the varnish, which is a direct cost of the table."], ["US\\$96", "This includes the apportioned rent, which is an overhead and not part of the prime cost."], ["US\\$48", "This counts materials only; prime cost includes direct labour as well."]],
    hints: ["Prime cost is all the direct costs."],
    explanation: "Prime cost = direct materials + direct labour + direct expenses = 48 + 30 + 6 = US\\$84. The rent is an indirect production overhead.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "A bakery bought a delivery van for US\\$9,000 last year. The owner is now deciding whether to buy a second van. Which statement about the US\\$9,000 is correct?",
    ok: ["It is a sunk cost and is ignored in the decision", "Correct: the money has been spent and no choice now can change it."],
    bad: [["It is an opportunity cost and must be included", "An opportunity cost is a benefit given up in the future, not money already spent."], ["It is a relevant cost because it is a cash cost", "It is a past cash cost; relevant costs are future costs that change."], ["It is a period cost and must be added to the second van", "Period and product are inventory classifications, not a decision rule."]],
    hints: ["Can any decision made now change that payment?"],
    explanation: "A cost already incurred is sunk. Decisions use only future cash flows that differ between the options.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A workshop has steel in store that cost US\\$850. It has no other use except resale as scrap for US\\$350. A customer's order would use all of it. What is the relevant cost of the steel for the order?",
    ok: ["US\\$350", "Correct: the scrap value forgone is the opportunity cost of using it."],
    bad: [["US\\$850", "That is the historic cost, which is sunk."], ["US\\$500", "This is the difference between cost and scrap value, a loss already incurred."], ["Nil", "The steel is not free: using it gives up the scrap sale."]],
    hints: ["What would the business receive if it did not use the steel in the order?"],
    explanation: "With no alternative use except resale, the relevant cost is the resale value of US\\$350. The purchase price of US\\$850 is sunk.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which cost should be treated as relevant when deciding whether to accept a one-off order from a school for 300 desks?",
    ok: ["Extra casual labour hired only for this order", "Correct: the cash cost arises only if the order is accepted."],
    bad: [["Depreciation of the existing saw", "Depreciation is the same whether or not the order is accepted."], ["The share of rent charged to the workshop", "An apportioned fixed cost does not change with the order."], ["The cost of timber already in store and needed for no other job, bought last year", "Its purchase price is sunk; only the resale value or replacement cost could be relevant."]],
    hints: ["Ask which cash flows would differ if the order were refused."],
    explanation: "Relevant costs are future cash flows that change because of the decision. Casual labour is paid only if the order is accepted.",
  });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Distribution costs are product costs and are included in the value of closing inventory of finished goods.", answer: false, explanation: "False. Distribution costs are period costs, charged to profit or loss when they arise. Only product costs are included in inventory values." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "A cost can be both a fixed cost and a direct cost.", answer: true, hints: ["Direct/indirect and fixed/variable are different classifications."], explanation: "True. The hire of a machine for one job is fixed in amount (it does not change with the units made) yet direct to that job." });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term to its meaning.",
    pairs: ["Cost centre", "Opportunity cost", "Sunk cost", "Prime cost"],
    right: ["A department or activity where costs are collected", "The benefit given up by choosing one option instead of the next best", "A cost already incurred that no decision can change", "Direct materials, direct labour and direct expenses"],
    rightIndex: [0, 1, 2, 3],
    explanation: "A cost centre collects costs; an opportunity cost is a benefit forgone; a sunk cost is past spending; prime cost is the total of the direct costs.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences about cost classification.",
    template: "Indirect costs of production are called production {{blank:a}}. Distribution costs are {{blank:b}} costs and are charged to profit or loss in the period.",
    blanks: [{ id: "a", accepted: ["overheads"], choices: ["overheads", "prime costs", "variances"] }, { id: "b", accepted: ["period"], choices: ["period", "product", "sunk"] }],
    explanation: "Indirect production costs are production overheads. Selling and distribution costs are period costs.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "State the name given to the benefit given up when one course of action is chosen instead of the next best alternative.", accepted: ["opportunity cost"], explanation: "It is the opportunity cost." });

  // numerical items
  const dm = 6400, dl = 4100, de = 350, oh = 2800, units = 4000;
  const prime = dm + dl + de;
  const prodTotal = prime + oh;
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: prime, calculator: true, daily: true, wrong: [dm + dl, prodTotal],
    stem: `For one month a clothing workshop in Chinhoyi recorded direct materials ${usd(dm)}, direct labour ${usd(dl)}, direct expenses (patterns hired for one design) ${usd(de)} and production overheads ${usd(oh)}. Calculate the prime cost for the month.`,
    explanation: `Prime cost = ${F(dm)} + ${F(dl)} + ${F(de)} = ${usd(prime)}. Production overheads are not part of prime cost; including them gives ${usd(prodTotal)}, and leaving out the direct expenses gives ${usd(dm + dl)}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: r2(prodTotal / units), dp: 2, calculator: true, wrong: [r2(prime / units), r2((prodTotal + 1600) / units)],
    stem: `The workshop made ${F(units)} garments in the month. Product cost is prime cost plus production overheads. Calculate the product cost of one garment in US dollars to the nearest cent. (Selling costs of ${usd(1600)} are also incurred in the month.)`,
    hints: ["Selling costs are period costs."],
    explanation: `Product cost = ${F(prodTotal)} ÷ ${F(units)} = ${usd(r2(prodTotal / units))}. Using prime cost only gives ${usd(r2(prime / units))}; adding the selling costs wrongly gives ${usd(r2((prodTotal + 1600) / units))}.`,
  });
  const steelKg = 150, oldPrice = 4.2, resale = 3.1, replace = 5.0;
  const relSteel = steelKg * replace;
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: relSteel, calculator: true, wrong: [steelKg * oldPrice, steelKg * resale],
    stem: `A fabricator has ${steelKg} kg of steel in store, bought at ${usd(oldPrice)} a kilogram. The steel is used regularly and would be replaced at ${usd(replace)} a kilogram. It could be sold now for ${usd(resale)} a kilogram. An order would use all ${steelKg} kg. Calculate the relevant cost of the steel for the order.`,
    hints: ["The steel is needed for normal work, so using it means buying more."],
    explanation: `Because the steel is used regularly, using it in the order means it must be replaced: ${steelKg} × ${p2(replace)} = ${usd(relSteel)}. The historic cost (${usd(steelKg * oldPrice)}) is sunk and the resale value (${usd(steelKg * resale)}) applies only if the steel would otherwise be sold.`,
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain two differences between cost accounting and financial accounting.",
    points: ["Financial accounting reports past results to external users in a standard format, whereas cost accounting is for managers and need not follow a fixed format", "Cost accounting analyses costs of units, jobs or departments in detail and can look forward (budgets, decisions), whereas financial accounting reports totals for the whole business"],
    modelAnswer: "Financial accounting is for outside users in a standard format; cost accounting is for internal managers in whatever form is useful. Cost accounting gives detail by unit or department and supports decisions.",
    explanation: "One mark for each valid difference, explained.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain four purposes of a cost accounting system for a small manufacturer.",
    points: ["Cost control: comparing actual costs with plans to find overspending", "Pricing: knowing the cost of a unit so that the price covers cost and gives a profit", "Inventory valuation: finished goods and work in progress valued at product cost", "Decision making: relevant costs for make-or-buy or special orders"],
    modelAnswer: "It helps control costs by comparing actual with plan, sets prices that cover cost, values inventory at product cost for the statement of financial position and supplies the relevant costs needed for decisions.",
    hints: ["Think of control, price, inventory and decisions."],
    explanation: "One mark for each purpose with a brief explanation.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A school asks a carpenter to make 40 benches at a price below his usual price. He has spare capacity but already owns the tools. Evaluate whether the carpenter should rely on the full cost of a bench in deciding.",
    points: ["Full cost includes apportioned overheads such as rent that will not change if the order is accepted", "These apportioned costs are irrelevant; only extra cash costs (timber, extra labour) matter", "If the price exceeds the relevant costs the order adds to profit even if it is below full cost", "Non-financial factors: future orders from the school, effect on regular customers who may expect a discount"],
    modelAnswer: "Full cost contains rent and other overheads that continue whether or not the order is accepted, so it is the wrong test. The carpenter should compare the price with the extra cash costs of timber and labour. If the price is higher, the order adds to profit, but he should consider whether other customers will demand the same low price.",
    hints: ["Which costs change if the order is accepted?"],
    explanation: "One mark each for the overheads point, the relevant-cost comparison, the conclusion and a non-financial factor.",
  });

  // Structured 1 (10 marks): classification and product cost
  const mat = 7200, lab = 5400, rent = 1800, sup = 2100, adv = 600, dist = 1300, units2 = 6000;
  const prime2 = mat + lab, ovh2 = rent + sup, prodC = prime2 + ovh2, per = prodC / units2;
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Tendai Dube makes school bags in Masvingo. His costs for the month of March 2026 were:\n\n${table(["Cost", "US\\$"], [["Canvas, zips and thread used in the bags", mat], ["Wages of the sewing machinists", lab], ["Rent of the workshop", rent], ["Salary of the workshop supervisor", sup], ["Advertising in a school newsletter", adv], ["Delivery to schools", dist]])}\n\nHe made ${F(units2)} bags in the month.`,
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which cost is a period cost?", options: [["Advertising in a school newsletter", "Correct: selling costs are charged to the month in which they arise."], ["Wages of the sewing machinists", "A product cost: direct labour."], ["Rent of the workshop", "A production overhead: a product cost."], ["Canvas, zips and thread used", "A direct material: a product cost."]], answer: "A", explanation: "Advertising and delivery are period costs." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: prime2, wrong: [mat, prodC], stem: "Calculate the prime cost for March.", explanation: `${F(mat)} + ${F(lab)} = ${usd(prime2)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: prodC, wrong: [prime2, prodC + adv + dist], stem: "Calculate the total product cost for March.", explanation: `Prime cost ${F(prime2)} + rent ${F(rent)} + supervisor ${F(sup)} = ${usd(prodC)}.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: per, wrong: [prime2 / units2, (prodC + adv + dist) / units2], stem: "Calculate the product cost of one bag, to the nearest cent.", explanation: `${F(prodC)} ÷ ${F(units2)} = ${usd(per)}.` }),
      P.manual({ label: "(e)", marks: 3, stem: "Tendai says the cost of a bag is the total of all the costs in the table divided by the bags made. Explain why this is not the product cost used to value inventory.", points: ["Advertising and delivery are period costs", "Product cost includes only direct costs and production overheads", "Including period costs would overstate the value of unsold bags in inventory"], modelAnswer: "Advertising and delivery are period costs charged to profit or loss in March. Inventory is valued at product cost only, so adding them would overstate the closing inventory.", explanation: "One mark for each point." }),
    ],
    hints: ["Separate the product costs from the period costs first."],
    explanation: "This item tests the product and period classification, prime cost and the unit product cost.",
  });
  chk(per, 2.75);

  // Structured 2 (12 marks): relevant costs
  const qty = 120, stdPrice = 3.5, repl = 4.2, hrs = 30, ovHr = 4, normalWage = 9;
  const mats = qty * repl, lab2 = hrs * ovHr, ext = 85, fixedShare = 300;
  const rel2 = mats + lab2 + ext;
  const price2 = 780;
  b.struct({
    d: 4, skill: "EVALUATION", calculator: true,
    stem: `Chipo Sibanda runs a printing shop in Bulawayo. A club offers ${usd(price2)} for a batch of 500 programmes. Costs for the order:\n\n- Paper: ${qty} reams in store, bought at ${usd(stdPrice)} a ream. Paper is used every week and costs ${usd(repl)} a ream to replace.\n- Extra operator time: ${hrs} hours of overtime at an extra ${usd(ovHr)} an hour. The operator's normal pay of ${usd(normalWage)} an hour is paid whatever happens.\n- Ink and finishing bought specially for the order: ${usd(ext)}.\n- A share of shop rent: ${usd(fixedShare)}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: mats, wrong: [qty * stdPrice], stem: "Calculate the relevant cost of the paper.", explanation: `The paper must be replaced: ${qty} × ${p2(repl)} = ${usd(mats)}. The original price is sunk.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: lab2, wrong: [hrs * (ovHr + normalWage)], stem: "Calculate the relevant cost of the extra operator time.", explanation: `Only the extra pay counts: ${hrs} × ${ovHr} = ${usd(lab2)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: rel2, wrong: [rel2 + fixedShare], stem: "Calculate the total relevant cost of the order.", explanation: `${F(mats)} + ${F(lab2)} + ${F(ext)} = ${usd(rel2)}. The rent share is irrelevant.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: price2 - rel2, wrong: [price2 - rel2 - fixedShare], stem: "Calculate the gain from accepting the order.", explanation: `${F(price2)} - ${F(rel2)} = ${usd(price2 - rel2)}.` }),
      P.manual({ label: "(e)", marks: 4, stem: "Advise Chipo whether to accept the order. Refer to your figures and to one non-financial factor.", points: [`The order adds ${usd(price2 - rel2)} to profit on relevant costs`, "The rent share is irrelevant because it is paid whether or not the order is accepted", "Recommend acceptance (the price exceeds the relevant cost)", "Non-financial: spare capacity, goodwill of the club or the risk that other customers expect the same low price"], modelAnswer: `Chipo should accept: the price is ${usd(price2)} against relevant costs of ${usd(rel2)}, a gain of ${usd(price2 - rel2)}. The rent share is ignored. She should check that the shop has capacity and that other customers will not demand the same price.`, explanation: "One mark each: the gain, the irrelevance of the rent, the recommendation and a non-financial factor." }),
    ],
    hints: ["Replacement cost, not original cost, for stock that will be replaced.", "Only extra cash flows count."],
    explanation: "This item applies the relevant cost rules to a special order and ends with advice.",
  });

  b.card("DEFINITION", "Cost unit", "A unit of product or service to which costs are traced, such as a loaf, a job or a kilometre.");
  b.card("DEFINITION", "Cost centre", "A department, section, machine or activity where costs are collected before they are charged to cost units.");
  b.card("DEFINITION", "Direct and indirect cost", "A direct cost can be traced economically to one cost unit; an indirect cost (overhead) cannot.");
  b.card("FORMULA", "Prime cost", "Direct materials + direct labour + direct expenses.");
  b.card("CONCEPT", "Product cost against period cost", "Product costs (direct costs plus production overheads) go into inventory until sale. Period costs (selling, distribution, administration) are charged to the period.");
  b.card("DEFINITION", "Relevant cost", "A future cash cost that changes because of a decision. Sunk costs and unchanged apportioned costs are irrelevant.");
  b.card("DEFINITION", "Opportunity cost", "The benefit given up by choosing one course of action instead of the next best alternative.");
  b.card("DEFINITION", "Sunk cost", "A cost already incurred that cannot be changed by any decision now; ignore it in decisions.");
  b.card("CONCEPT", "Purposes of cost accounting", "Cost control, pricing, inventory valuation and decision making.");
  b.card("CONCEPT", "Cost accounting and management accounting", "Cost accounting records and analyses costs; management accounting uses them with budgets and forecasts for planning, control and decisions, for internal use only.");
});
void p1;
