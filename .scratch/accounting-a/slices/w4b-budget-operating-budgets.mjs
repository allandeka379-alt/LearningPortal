// W4b: budget.operating-budgets
import { concept, P, chk, r2 } from "../lib.mjs";
import { mc, F, usd, p2 } from "../tables/w4b-lib.mjs";

concept("aacc.budget.operating-budgets", { file: "budget/operating-budgets", keyPrefix: "budget.operating-budgets" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which formula gives the units to be produced in a period?",
    ok: ["Sales + closing inventory - opening inventory", "Correct: production must cover sales and the change in inventory."],
    bad: [["Sales - closing inventory + opening inventory", "This reverses the inventory adjustment."], ["Sales + opening inventory + closing inventory", "Opening inventory is already available, so it is deducted."], ["Sales only", "This ignores the change in inventory."]],
    explanation: "Production = sales + closing finished goods - opening finished goods.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which budget is normally prepared first when sales demand is the limiting factor?",
    ok: ["The sales budget", "Correct: every other budget depends on it."],
    bad: [["The cash budget", "The cash budget uses the other budgets, so it comes later."], ["The materials purchases budget", "Purchases depend on production, which depends on sales."], ["The master budget", "The master budget combines all other budgets."]],
    explanation: "The limiting factor's budget comes first; here that is sales.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The materials purchases budget (in units) is found by:",
    ok: ["materials used + closing inventory of materials - opening inventory of materials", "Correct: buy what is used plus the increase in inventory."],
    bad: [["materials used - closing inventory of materials + opening inventory of materials", "This reverses the inventory adjustment."], ["finished goods produced + closing inventory of finished goods", "That is a production calculation."], ["sales units × selling price", "That is the sales revenue."]],
    explanation: "Purchases = usage + closing materials - opening materials.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A shop budgets sales of 4,000 units. Opening inventory is 600 units and closing inventory is to be 900 units. How many units must be bought or produced?",
    ok: ["4,300 units", "Correct: 4,000 + 900 - 600."],
    bad: [["3,700 units", "The inventory adjustment has been reversed."], ["5,500 units", "Opening inventory has been added instead of deducted."], ["4,000 units", "The change in inventory has been ignored."]],
    hints: ["Add the closing, deduct the opening."],
    explanation: "4,000 + 900 - 600 = 4,300 units.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "A policy sets closing materials inventory at 30% of next month's usage. What information is needed to budget the closing inventory at the end of June?",
    ok: ["The budgeted usage of materials for July", "Correct: the policy refers to next month's usage."],
    bad: [["The actual usage of materials for the month of June", "June's budget is for the period just ended, not next month."], ["The sales revenue for June", "Revenue does not give a quantity of materials."], ["The cash balance at the start of June", "Cash is not relevant to the quantity of inventory."]],
    hints: ["Which month does the policy refer to?"],
    explanation: "Closing inventory at 30 June = 30% of July's budgeted usage.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "The production budget for March is 2,400 units but the factory can make only 2,000 units a month. Which action is NOT a sensible response?",
    ok: ["Ignore the shortage and issue the budget as planned", "Correct: an impossible budget has no value."],
    bad: [["Produce extra units in earlier months and hold inventory", "This is a sensible option if inventory can be held."], ["Pay overtime or arrange a second shift", "This increases capacity at a cost."], ["Reduce the sales budget for March", "This removes the demand that cannot be met."]],
    hints: ["Budgets must be achievable."],
    explanation: "A budget that exceeds capacity must be adjusted or capacity increased.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A business pays suppliers in the month after purchase. Which statement about its payables budget is correct?",
    ok: ["Payments in a month equal the previous month's purchases", "Correct: that is the credit period."],
    bad: [["Payments in a month equal the current month's total purchases", "That would be a cash purchase."], ["Closing payables equal the previous month's purchases", "Closing payables are the current month's unpaid purchases."], ["Payments equal usage of materials in the month", "Payments follow purchases, not usage."]],
    hints: ["Think of the one-month delay."],
    explanation: "With one month's credit, payments in a month are the previous month's purchases and closing payables are the current month's purchases.",
  });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "The opening inventory of one month is the closing inventory of the previous month.", answer: true, explanation: "True. Check each month's opening figure against the previous closing figure." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "Materials purchases always equal materials used in production.", answer: false, hints: ["What happens when inventory levels change?"], explanation: "False. Purchases differ from usage whenever the materials inventory changes." });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each budget to its calculation.",
    pairs: ["Production budget (units)", "Materials purchases budget (quantity)", "Labour cost budget", "Cash received from customers"],
    right: ["Sales + closing finished goods - opening finished goods", "Usage + closing materials - opening materials", "Production × hours per unit × rate per hour", "Cash sales + credit sales collected in the period"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Each budget applies a short formula to the budget before it.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "To find closing trade receivables when customers pay a month later, take the {{blank:a}} month's {{blank:b}} sales.",
    blanks: [{ id: "a", accepted: ["current"], choices: ["current", "previous", "next"] }, { id: "b", accepted: ["credit"], choices: ["cash", "credit", "total"] }],
    explanation: "Credit sales of the current month are still unpaid at its end.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "Name the budget that shows how many units must be made to meet sales and inventory policy.", accepted: ["production budget", "the production budget"], explanation: "It is the production budget." });

  {
    const sales = 2400, o = 350, c = 420;
    const p = sales + c - o;
    chk(p, 2470);
    b.num({ d: 3, skill: "APPLICATION", kind: "units", value: p, wrong: [sales + o - c, sales],
      stem: `A Harare bakery budgets to sell ${F(sales)} cakes. Opening inventory is ${F(o)} cakes and the closing inventory is to be ${F(c)} cakes. How many cakes must be produced?`,
      hints: ["Add the closing, deduct the opening."],
      explanation: `${F(sales)} + ${F(c)} - ${F(o)} = ${F(p)} cakes. Reversing the adjustment gives ${F(sales + o - c)}.` });
  }
  {
    const use = 7800, o = 900, c = 1150, pr = 2.4;
    const kg = use + c - o, cost = r2(kg * pr);
    chk(cost, 19320);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: cost, calculator: true, wrong: [r2((use - c + o) * pr), r2(use * pr)],
      stem: `A Chinhoyi furniture workshop budgets to use ${F(use)} kg of nails and screws. Opening inventory is ${F(o)} kg, closing inventory is to be ${F(c)} kg, and the price is US\\$2.40 a kilogram. Calculate the budgeted cost of purchases.`,
      hints: ["Find the kilograms to buy first."],
      explanation: `Purchases = ${F(use)} + ${F(c)} - ${F(o)} = ${F(kg)} kg. × 2.40 = ${usd(cost)}. Ignoring the inventory change gives ${usd(use * pr)}.` });
  }
  {
    const hrs = 960, normal = 800, rate = 4, prem = 1.5;
    const cost = normal * rate + (hrs - normal) * rate * prem;
    chk(cost, 4160);
    b.calc({ d: 4, skill: "APPLICATION", kind: "money", value: cost, calculator: true, wrong: [hrs * rate, r2(hrs * rate * prem)],
      stem: `A tailoring workshop in Masvingo needs ${F(hrs)} labour hours next month. The normal time available is ${F(normal)} hours at US\\$4.00 an hour. Hours above normal time are paid at one and a half times the normal rate. Calculate the budgeted labour cost.`,
      hints: ["Split the hours into normal and overtime."],
      explanation: `Normal ${F(normal)} × 4.00 = ${F(normal * rate)}; overtime ${F(hrs - normal)} × 6.00 = ${F((hrs - normal) * rate * prem)}. Total ${usd(cost)}. Paying every hour at normal rate gives ${usd(hrs * rate)}.` });
  }
  {
    const sep = 20000, oct = 25000, cashPct = 0.3;
    const rec = oct * cashPct + sep * (1 - cashPct);
    chk(rec, 21500);
    b.calc({ d: 4, skill: "APPLICATION", kind: "money", value: rec, calculator: true, wrong: [oct, oct * cashPct + oct * 0.7],
      stem: `A hardware shop in Bulawayo has sales of ${usd(sep)} in September and ${usd(oct)} in October. 30% of sales are for cash and 70% are on credit, with customers paying in the month after the sale. Calculate the cash received from customers in October.`,
      hints: ["Cash sales this month plus credit sales of last month."],
      explanation: `Cash sales 30% × ${F(oct)} = ${F(oct * cashPct)}; credit sales of September 70% × ${F(sep)} = ${F(sep * 0.7)}. Total ${usd(rec)}. Using October's credit sales instead gives ${usd(oct)}.` });
  }
  {
    const feb = 9400, mar = 10200;
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: feb, wrong: [mar, feb + mar],
      stem: `A shop buys goods on credit and pays suppliers in the month after purchase. Purchases were ${usd(feb)} in February and ${usd(mar)} in March. How much is paid to suppliers in March?`,
      hints: ["Which month's purchases are paid in March?"],
      explanation: `Payments in March are for February's purchases: ${usd(feb)}. March's purchases (${usd(mar)}) are paid in April and make up closing trade payables.` });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the production budget is not always equal to the sales budget in units.",
    points: ["The business may plan to hold a different level of finished goods at the end of the period", "Production must replace sales and build up closing inventory, so production = sales + closing - opening", "Capacity limits can also force production to differ from sales"],
    modelAnswer: "A business may plan to increase or reduce its inventory of finished goods. Production must then equal sales plus the closing inventory less the opening inventory, and capacity limits may also force differences.",
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the sales, production and materials purchases budgets are linked.",
    points: ["The sales budget determines the finished goods needed", "The production budget adds the inventory change to sales", "The materials usage budget multiplies production by the quantity per unit", "The purchases budget adds the materials inventory change to usage"],
    modelAnswer: "Sales set the finished goods needed. Production adds the change in inventory to sales. Materials usage follows from production, and purchases adjust usage for the change in materials inventory.",
    hints: ["Follow the chain from sales to purchases."],
    explanation: "One mark for each link.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A business holds a policy of closing inventory equal to 30% of next month's sales. Evaluate the effect of this policy on its production and cash.",
    points: ["It protects against stock-outs and supports sales", "Production must be higher than sales when sales are growing, so purchases and labour rise earlier", "Higher inventory ties up cash and increases storage costs and the risk of damage or obsolescence", "A judgement: a smaller percentage may be sensible if cash is short, but not so small that sales are lost"],
    modelAnswer: "The policy avoids stock-outs, but when sales are growing production has to be higher than sales, which ties up cash in inventory and adds storage costs. A lower percentage may suit a business short of cash, provided sales are not lost.",
    hints: ["Think about benefits and costs of holding more inventory."],
    explanation: "One mark for each point.",
  });

  // Struct 1 (12 marks)
  {
    const sales = [800, 900, 1000, 1100], fgPct = 0.25;
    const kgPer = 3, kgPrice = 1.5, rmPct = 0.2, openFG = 200, openRM = 500, prodApr = 1075;
    const closeFG = [0, 1, 2].map((i) => fgPct * sales[i + 1]);
    const prod = [0, 1, 2].map((i) => sales[i] + closeFG[i] - (i === 0 ? openFG : closeFG[i - 1]));
    chk(prod[0], 825); chk(prod[1], 925); chk(prod[2], 1025);
    const usage = [...prod, prodApr].map((p) => p * kgPer);
    const closeRM = [0, 1, 2].map((i) => rmPct * usage[i + 1]);
    const purch = [0, 1, 2].map((i) => usage[i] + closeRM[i] - (i === 0 ? openRM : closeRM[i - 1]));
    chk(purch[1], 2835); chk(purch[2], 3105);
    const cMar = r2(purch[2] * kgPrice);
    chk(cMar, 4657.5);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: `Mutasa Sweets in Mutare budgets sales of ${F(sales[0])}, ${F(sales[1])} and ${F(sales[2])} packs for January, February and March, and ${F(sales[3])} packs for April. Closing finished goods should be 25% of the next month's sales and the opening inventory on 1 January is ${F(openFG)} packs. Each pack uses 3 kg of sugar costing US\\$1.50 a kilogram. Closing sugar inventory should be 20% of the next month's usage; opening sugar inventory on 1 January is ${F(openRM)} kg and April production is budgeted at ${F(prodApr)} packs.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "units", value: prod[1], wrong: [sales[1], sales[1] + closeFG[1]], stem: "Calculate the budgeted production for February (packs).", explanation: `${F(sales[1])} + closing ${F(closeFG[1])} (25% × ${F(sales[2])}) - opening ${F(closeFG[0])} = ${F(prod[1])} packs.` }),
        P.num({ label: "(b)", marks: 2, kind: "units", value: prod[2], wrong: [sales[2], sales[2] + closeFG[2]], stem: "Calculate the budgeted production for March (packs).", explanation: `${F(sales[2])} + closing ${F(closeFG[2])} (25% × ${F(sales[3])}) - opening ${F(closeFG[1])} = ${F(prod[2])} packs.` }),
        P.num({ label: "(c)", marks: 3, kind: "units", value: purch[1], wrong: [usage[1], usage[1] + closeRM[1]], stem: "Calculate the sugar to be purchased in February (kilograms).", explanation: `Usage ${F(usage[1])} kg (${F(prod[1])} × 3) + closing ${F(closeRM[1])} kg (20% × ${F(usage[2])}) - opening ${F(closeRM[0])} kg = ${F(purch[1])} kg.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: cMar, wrong: [r2(usage[2] * kgPrice), r2(purch[1] * kgPrice)], stem: "Calculate the budgeted cost of sugar purchases in March.", explanation: `Usage ${F(usage[2])} kg + closing ${F(closeRM[2])} kg (20% × ${F(usage[3])}) - opening ${F(closeRM[1])} kg = ${F(purch[2])} kg; × 1.50 = ${usd(cMar)}.` }),
        P.manual({ label: "(e)", marks: 3, stem: "The factory can make only 900 packs a month. Explain two ways the budgets could be changed.", points: ["Produce more in an earlier month to build inventory", "Pay overtime or hire capacity", "Reduce the sales budget or the closing inventory policy; then recalculate materials and labour"], modelAnswer: "The factory could build inventory in earlier months, pay for overtime or extra capacity, or reduce the closing inventory target. Every later budget must then be recalculated.", explanation: "One mark for each change, up to 3." }),
      ],
      hints: ["Opening inventory this month = closing inventory last month.", "Closing inventory uses the next month's figure."],
      explanation: "This item prepares production, materials usage and purchases budgets.",
    });
  }

  // Struct 2 (10 marks)
  {
    const sales = { mar: 17000, apr: 22000, may: 24500 }, pur = { mar: 10500, apr: 12900, may: 14200 };
    const cashPct = 0.25;
    const openRec = sales.mar * (1 - cashPct);
    const aprCash = sales.apr * cashPct + openRec;
    const closeRec = sales.apr * (1 - cashPct);
    chk(aprCash, 18250); chk(closeRec, 16500); chk(openRec, 12750);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: `Farai Hardware in Gweru has budgeted sales of ${usd(sales.mar)} for March, ${usd(sales.apr)} for April and ${usd(sales.may)} for May. 25% of sales are for cash; the rest are on credit and customers pay in the month after the sale. Budgeted purchases are ${usd(pur.mar)} for March, ${usd(pur.apr)} for April and ${usd(pur.may)} for May, paid in the month after purchase.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: aprCash, wrong: [sales.apr, closeRec], stem: "Calculate the cash to be received from customers in April.", explanation: `Cash sales 25% × ${F(sales.apr)} = ${F(sales.apr * cashPct)}; March credit sales 75% × ${F(sales.mar)} = ${F(openRec)}. Total ${usd(aprCash)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: closeRec, wrong: [openRec, sales.apr], stem: "Calculate the budgeted trade receivables at 30 April.", explanation: `April credit sales 75% × ${F(sales.apr)} = ${usd(closeRec)} are unpaid at the end of April.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: pur.apr, wrong: [pur.may, pur.mar], stem: "Calculate the payments to suppliers in May.", explanation: `Payments in May are for April's purchases: ${usd(pur.apr)}.` }),
        P.num({ label: "(d)", marks: 1, kind: "money", value: pur.may, wrong: [pur.apr, pur.mar], stem: "Calculate the budgeted trade payables at 31 May.", explanation: `May's purchases are unpaid at the end of May: ${usd(pur.may)}.` }),
        P.manual({ label: "(e)", marks: 3, stem: "Explain why the receivables and payables budgets are prepared before the cash budget.", points: ["The cash budget needs the cash received from customers, found from the credit terms", "It also needs the cash paid to suppliers, found from the payables budget", "Credit sales and purchases do not affect cash until they are paid, so the timing must be worked out first"], modelAnswer: "The cash budget includes only cash movements. The receivables and payables budgets convert credit sales and purchases into the cash received and paid in each month, so they must be done first.", explanation: "One mark for each point." }),
      ],
      hints: ["Credit sales are collected a month later.", "Unpaid at the end of the month = closing receivable or payable."],
      explanation: "This item converts sales and purchases into cash movements and closing balances.",
    });
  }

  b.card("FORMULA", "Production budget (units)", "Sales + closing finished goods - opening finished goods.");
  b.card("FORMULA", "Materials purchases budget", "Materials used + closing materials inventory - opening materials inventory.");
  b.card("FORMULA", "Materials usage budget", "Production units × standard quantity of material per unit.");
  b.card("FORMULA", "Labour budget", "Production units × hours per unit × rate per hour (overtime premium for hours above normal time).");
  b.card("FORMULA", "Cash received from customers", "Cash sales of the month + credit sales collected in the month (usually the previous month's credit sales).");
  b.card("FORMULA", "Cash paid to suppliers", "Purchases paid in the month, which are usually the previous month's purchases when suppliers give one month's credit.");
  b.card("CONCEPT", "Closing balance of receivables or payables", "Credit sales (or purchases) of the latest period that are not yet paid.");
  b.card("CONCEPT", "Order of preparation", "Limiting factor budget first (often sales), then production, materials, labour, receivables and payables, then the cash budget.");
  b.card("CONCEPT", "Checking that budgets agree", "Production within capacity, materials and labour available; adjust and recalculate if they do not fit.");
});
void p2;
