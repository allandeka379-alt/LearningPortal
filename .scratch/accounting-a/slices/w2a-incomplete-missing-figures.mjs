// W2a: incomplete.missing-figures
import { concept, P, table, r2, fmt, money, chk, ratios } from "../lib.mjs";
import { mc, tAcct } from "../tables/w2a-lib.mjs";

concept("aacc.incomplete.missing-figures", { file: "incomplete/missing-figures", keyPrefix: "incomplete.missing-figures" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "In a total trade receivables account, credit sales are:",
    ok: ["the balancing figure, entered on the debit side", "Correct: sales on credit increase receivables, which is a debit."],
    bad: [["the balancing figure, entered on the credit side", "Credit sales increase the receivables balance, so they are debited."], ["a figure always taken from the bank statement", "The bank statement shows cash received, not credit sales."], ["the closing balance of the account", "The closing balance is what customers still owe."]],
    explanation: "Opening receivables and credit sales go on the debit side; cash received, discounts, returns and write-offs and the closing balance go on the credit side.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A trader adds 50% to the cost of every item sold. What is the gross profit margin?",
    ok: ["33⅓% of sales", "Correct: 50 ÷ 150 × 100."],
    bad: [["50% of sales", "50% is the mark-up on cost, not the margin on sales."], ["25% of sales", "50 is a third of the selling price of 150, not a quarter."], ["66⅔% of sales", "That would be 100 ÷ 150, a figure unrelated to the gross profit."]],
    hints: ["Take cost as 100 and find the selling price."],
    explanation: "Cost 100, selling price 150, gross profit 50. Margin = 50 ÷ 150 = 33⅓%.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A summary of a business bank statement shows all payments except one cash withdrawal. The balancing figure is treated as the owner's:",
    ok: ["drawings", "Correct: money taken out and not otherwise explained."],
    bad: [["capital introduced", "Capital introduced would be a receipt, not a payment."], ["credit sales", "Credit sales are not a bank payment."], ["depreciation", "Depreciation is not a cash movement."]],
    explanation: "When every other payment is known, the unexplained payment is drawings.",
  });
  const po = 3740;
  const pc = 4215;
  const pb = 26880;
  const pd = 330;
  const pr = 560;
  const pur = r2(pc + pb + pd + pr - po);
  chk(pur, 28245);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Trade payables were ${money(po)} at the start and ${money(pc)} at the end of the year. Payments to suppliers were ${money(pb)}, discount received ${money(pd)} and returns outwards ${money(pr)}. Calculate credit purchases for the year.`,
    ok: [money(pur), "Correct: closing balance plus payments, discount and returns, less the opening balance."],
    bad: [[money(r2(pb + pd + pr)), "The change in the payables balance has been ignored."], [money(r2(pb + po - pc)), "Discount received and returns outwards were left out."], [money(r2(po + pb + pd + pr - pc)), "The opening and closing balances have been reversed."]],
    hints: ["Draw the account: credit purchases are the balancing figure on the credit side."],
    explanation: "Purchases = 4,215 + 26,880 + 330 + 560 - 3,740 = 28,245.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Cash sales of US\\$5,740 and credit sales of US\\$38,190 are known. Returns inwards were US\\$860. What is the revenue?",
    ok: [money(r2(5740 + 38190 - 860)), "Correct: total sales of 43,930 less returns inwards."],
    bad: [[money(r2(5740 + 38190)), "Returns inwards have not been deducted."], [money(r2(38190 - 860)), "Cash sales have been left out."], [money(r2(5740 + 38190 + 860)), "Returns inwards have been added."]],
    hints: ["Total sales first, then returns."],
    explanation: "Revenue = 5,740 + 38,190 - 860 = 43,070.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Revenue was US\\$74,400 and the business adds a mark-up of 20% on cost. What was the cost of sales?",
    ok: ["US\\$62,000", "Correct: 74,400 ÷ 1.20."],
    bad: [["US\\$59,520", "20% of sales has been deducted, which uses the margin, not the mark-up."], ["US\\$89,280", "The mark-up has been added to revenue instead of removed."], ["US\\$14,880", "This is the 20% itself, not the cost."]],
    hints: ["Selling price is 120% of cost."],
    explanation: "Cost of sales = 74,400 × 100 ÷ 120 = 62,000.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Inventory lost in a fire is estimated using the usual gross profit margin. Which is the key assumption?",
    ok: ["The margin earned before the fire was the same as the usual margin", "Correct: otherwise the cost of sales, and hence the inventory, is wrong."],
    bad: [["All of the inventory in the stock room was destroyed", "Salvage is deducted; the method does not assume total loss."], ["Purchases were all paid for in cash", "The method uses purchases whether paid or not."], ["Closing inventory equals opening inventory", "The method exists to find the closing inventory."]],
    hints: ["The cost of sales is derived from the margin."],
    explanation: "Cost of sales is calculated from sales and the margin, so the result depends on the margin being the same during the period.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "In a total receivables account, irrecoverable debts written off of US\\$420 were left out. What is the effect on credit sales found as the balancing figure?",
    ok: ["Credit sales are understated by US\\$420", "Correct: the credit side is too small, so the balancing figure on the debit side is too small."],
    bad: [["Credit sales are overstated by US\\$420", "Leaving out a credit item lowers the balancing debit."], ["Credit sales are unaffected", "Every item in the account affects the balance."], ["Credit sales are understated by US\\$840", "The error is 420 once, not twice."]],
    hints: ["Which side is each item on?"],
    explanation: "A missing credit entry makes the credit side smaller and the balancing debit (credit sales) smaller by the same amount.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A gross profit margin of 20% is the same as a mark-up of 20%.", answer: false, explanation: "False. A 20% margin equals a 25% mark-up, because 20 of profit on 100 of sales is 20 on cost of 80." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "A cash-in-hand summary can show cash stolen as a balancing figure only if every other receipt and payment is known.", answer: true, hints: ["The balancing figure absorbs any unrecorded item."], explanation: "True. It absorbs any unrecorded item, so the claim of theft needs complete other information." });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each item to the side of the total trade receivables account on which it appears.",
    pairs: ["Balance at the start of the year", "Credit sales", "Cash received from customers", "Irrecoverable debts written off"],
    right: ["Debit", "Credit"],
    rightIndex: [0, 0, 1, 1],
    explanation: "Opening balance and credit sales are debits; cash received, discount allowed, returns inwards, write-offs and the closing balance are credits.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the definitions.",
    template: "Mark-up is gross profit as a percentage of {{blank:a}}; gross profit margin is gross profit as a percentage of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["cost of sales"], choices: ["cost of sales", "revenue", "purchases"] },
      { id: "b", accepted: ["revenue"], choices: ["cost of sales", "revenue", "purchases"] },
    ],
    explanation: "Mark-up uses cost of sales as its base; margin uses revenue.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to the figure that makes the two sides of a summary account equal?",
    accepted: ["balancing figure", "the balancing figure", "balancing item", "balancing amount"],
    explanation: "The balancing figure is the unknown total that completes the account.",
  });

  const r = { open: 4275, close: 5130, bank: 36940, disc: 615, ret: 1185, bad: 395 };
  const cs = r2(r.close + r.bank + r.disc + r.ret + r.bad - r.open);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: cs, daily: true, calculator: true, wrong: [r2(r.bank + r.disc + r.ret + r.bad), r2(r.open + r.bank + r.disc + r.ret + r.bad - r.close)],
    stem: `Trade receivables were ${money(r.open)} at 1 January and ${money(r.close)} at 31 December. Customers paid ${money(r.bank)}. Discount allowed was ${money(r.disc)}, returns inwards ${money(r.ret)} and irrecoverable debts written off ${money(r.bad)}. Calculate the credit sales for the year.`,
    explanation: `Credit sales = ${fmt(r.close)} + ${fmt(r.bank)} + ${fmt(r.disc)} + ${fmt(r.ret)} + ${fmt(r.bad)} - ${fmt(r.open)} = ${fmt(cs)}. Ignoring the balances gives ${fmt(r2(r.bank + r.disc + r.ret + r.bad))}.`,
  });
  const dr = r2(1890 + 52310 - 44865 - 2740);
  chk(dr, 6595);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: dr, calculator: true, wrong: [r2(52310 - 44865), r2(1890 + 52310 - 44865 + 2740)],
    stem: `The bank balance was ${money(1890)} at 1 January and ${money(2740)} at 31 December. Total receipts were ${money(52310)} and payments for business expenses and purchases were ${money(44865)}. All other withdrawals were the owner's drawings. Calculate the drawings.`,
    hints: ["Opening balance + receipts - payments - drawings = closing balance."],
    explanation: "Drawings = 1,890 + 52,310 - 44,865 - 2,740 = 6,595.",
  });
  const inv0 = 12480;
  const pu = 47150;
  const ro = 630;
  const sa = 68000;
  const mg = 30;
  const cosF = r2((sa * (100 - mg)) / 100);
  const invF = r2(inv0 + pu - ro - cosF);
  const sal = 1950;
  const loss = r2(invF - sal);
  chk(loss, 9450);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: loss, calculator: true, wrong: [invF, r2(inv0 + pu - ro - sa + sal)],
    stem: `Thieves broke into Rudo's electrical shop and stole all the inventory except goods worth ${money(sal)}. Inventory at the start of the year was ${money(inv0)}; purchases to the date were ${money(pu)} and returns outwards ${money(ro)}. Sales to the date were ${money(sa)} with no returns, and the usual gross profit margin is ${mg}%. Calculate the value of inventory stolen.`,
    hints: ["Cost of sales is 70% of sales.", "Inventory before the theft = opening + net purchases - cost of sales."],
    explanation: `Cost of sales = 70% × 68,000 = ${fmt(cosF)}. Inventory before the theft = 12,480 + 47,150 - 630 - ${fmt(cosF)} = ${fmt(invF)}. Stolen = ${fmt(invF)} - 1,950 = ${fmt(loss)}.`,
  });
  const mu = 60;
  const mgn = ratios.marginFromMarkUp(mu);
  chk(mgn, 37.5, 0.0001);
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: mgn, calculator: true, wrong: [mu, ratios.markUpFromMargin(mu)],
    stem: `A wholesaler adds a mark-up of ${mu}% to the cost of goods. Calculate the gross profit margin as a percentage of revenue, to one decimal place.`,
    hints: ["Take cost as 100: selling price is 160."],
    explanation: "Cost 100, selling price 160, profit 60. Margin = 60 ÷ 160 × 100 = 37.5%. Giving 60% confuses mark-up with margin.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a figure for cash stolen found as a balancing figure may be unreliable.",
    points: ["It absorbs every unrecorded or mistaken item, not only theft", "Errors in takings, expenses paid from the till or banking would be included in it", "Without records the owner cannot show the police or insurer that a theft occurred"],
    modelAnswer: "The figure is whatever is left after all known items, so any unrecorded expense or error is hidden in it. It does not prove theft. With no till records the owner cannot support a claim.",
    hints: ["What else could the balancing figure contain?"],
    explanation: "One mark for each reason.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "State two assumptions made when inventory lost in a fire is estimated using the gross profit margin.",
    points: ["The margin earned in the period before the fire was the same as the usual margin", "The records of opening inventory, purchases and sales are complete and accurate"],
    modelAnswer: "The margin was constant during the period and the opening inventory, purchases and sales records are complete.", hints: ["Think of the margin and of the records used."],
    explanation: "One mark for each assumption.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A shopkeeper pays all takings into the bank and pays wages and rent by cheque but keeps no cash book. Advise him on the records he should keep and evaluate the benefit.",
    points: ["Keep a cash book and ledgers so that sales, purchases and expenses are recorded separately", "A trial balance then checks the accuracy and errors can be traced", "Management can see sales, margins and expenses each month and control the business", "Cost: time and possibly an accountant, but banks and ZIMRA require reliable records, so the benefits outweigh the cost"],
    modelAnswer: "He should keep a cash book and ledger accounts. This gives separate figures for sales and expenses and a trial balance to check accuracy, so he can control costs and show lenders reliable statements. The time and cost are worth it for a growing business.",
    hints: ["What do full records give that totals do not?"],
    explanation: "One mark for each reasoned point.",
  });

  // Structured 1 (10 marks)
  const R = { open: 6385, close: 7040, bank: 58915, disc: 780, ret: 1520, bad: 530 };
  const Pd = { open: 8260, close: 7915, bank: 40170, disc: 655, ret: 925 };
  const csS = r2(R.close + R.bank + R.disc + R.ret + R.bad - R.open);
  const cpS = r2(Pd.close + Pd.bank + Pd.disc + Pd.ret - Pd.open);
  const cashS = 9830;
  const invO = 14260;
  const invC = 15075;
  const cosS = r2(invO + cpS - Pd.ret - invC);
  const revS = r2(csS + cashS - R.ret);
  const gpS = r2(revS - cosS);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Sipho Ncube runs a wholesale grocery business in Chinhoyi and does not keep a sales or purchases ledger. For the year ended 31 December 2025:\n\n` + table(["", "1 January (US\\$)", "31 December (US\\$)"], [["Trade receivables", R.open, R.close], ["Trade payables", Pd.open, Pd.close], ["Inventory", invO, invC]]) + `\n\nCustomers paid ${money(R.bank)}; discount allowed ${money(R.disc)}; returns inwards ${money(R.ret)}; irrecoverable debts ${money(R.bad)}; cash sales ${money(cashS)}. Suppliers were paid ${money(Pd.bank)}; discount received ${money(Pd.disc)}; returns outwards ${money(Pd.ret)}.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: csS, wrong: [r2(csS - R.bad), r2(csS + 2 * R.open)], stem: "Calculate the credit sales.", explanation: `${fmt(R.close)} + ${fmt(R.bank)} + ${fmt(R.disc)} + ${fmt(R.ret)} + ${fmt(R.bad)} - ${fmt(R.open)} = ${fmt(csS)}.` }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: cpS, wrong: [r2(cpS - Pd.ret), r2(Pd.bank + Pd.disc + Pd.ret)], stem: "Calculate the credit purchases.", explanation: `${fmt(Pd.close)} + ${fmt(Pd.bank)} + ${fmt(Pd.disc)} + ${fmt(Pd.ret)} - ${fmt(Pd.open)} = ${fmt(cpS)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: cosS, wrong: [r2(invO + cpS - invC), r2(invO + cpS + invC)], stem: "Calculate the cost of sales (there were no cash purchases).", explanation: `${fmt(invO)} + ${fmt(cpS)} - ${fmt(Pd.ret)} - ${fmt(invC)} = ${fmt(cosS)}. Forgetting the returns outwards gives ${fmt(r2(invO + cpS - invC))}.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: gpS, wrong: [r2(csS + cashS - cosS)], stem: "Calculate the gross profit (revenue is total sales less returns inwards).", explanation: `Revenue ${fmt(csS)} + ${fmt(cashS)} - ${fmt(R.ret)} = ${fmt(revS)}; gross profit ${fmt(revS)} - ${fmt(cosS)} = ${fmt(gpS)}.` }),
    ],
    hints: ["Write a total account for each of receivables and payables.", "Returns outwards are deducted from purchases in the cost of sales calculation."],
    explanation: "This item tests total accounts and the cost of sales and gross profit that follow from them.",
  });
  void gpS;

  // Structured 2 (16 marks): fire, mark-up, total account and evaluation
  const i0 = 21735;
  const pP = 69480;
  const rO = 1185;
  const sS = 96320;
  const rI = 1640;
  const mu2 = 40;
  const revF = r2(sS - rI);
  const cosF2 = r2((revF * 100) / (100 + mu2));
  const invF2 = r2(i0 + pP - rO - cosF2);
  const salv = 3150;
  const claim = r2(invF2 - salv);
  const rc = { open: 5870, bank: 71465, disc: 940, ret: rI, bad: 610, close: 6385 };
  const cr2 = r2(rc.close + rc.bank + rc.disc + rc.ret + rc.bad - rc.open);
  const recvAcc = tAcct(
    "Total trade receivables account to the date of the fire",
    [["1 Jan", "Balance b/d", rc.open], ["Various", "Credit sales (balancing figure)", cr2]],
    [["Various", "Bank", rc.bank], ["Various", "Discount allowed", rc.disc], ["Various", "Returns inwards", rc.ret], ["Various", "Irrecoverable debts", rc.bad], ["Date of fire", "Balance c/d", rc.close]],
    { side: "dr", date: "Date of fire", details: "Balance b/d", amount: rc.close },
  );
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `A fire destroyed most of the inventory of Chipo's furniture shop in Gweru. The records show: inventory at 1 January ${money(i0)}; purchases to the date of the fire ${money(pP)}; returns outwards ${money(rO)}; sales to the date of the fire ${money(sS)} (including cash sales); returns inwards ${money(rI)}. The business sells at a mark-up of ${mu2}% on cost. Salvaged goods are worth ${money(salv)}.\n\nTrade receivables were ${money(rc.open)} at 1 January and ${money(rc.close)} on the date of the fire. Customers paid ${money(rc.bank)}; discount allowed ${money(rc.disc)}; irrecoverable debts ${money(rc.bad)}.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: cosF2, wrong: [r2((revF * (100 - mu2)) / 100), r2((sS * 100) / (100 + mu2))], stem: "Calculate the cost of sales to the date of the fire (revenue = sales less returns inwards).", explanation: `Revenue ${fmt(revF)}; cost = revenue ÷ 1.40 = ${fmt(cosF2)}. Using 60% as if it were a margin gives ${fmt(r2((revF * 60) / 100))}.` }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: invF2, wrong: [r2(i0 + pP - cosF2), r2(i0 + pP - rO + cosF2)], stem: "Calculate the inventory immediately before the fire.", explanation: `${fmt(i0)} + ${fmt(pP)} - ${fmt(rO)} - ${fmt(cosF2)} = ${fmt(invF2)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: claim, wrong: [invF2], stem: "Calculate the loss of inventory to be claimed from the insurer.", explanation: `${fmt(invF2)} - ${fmt(salv)} = ${fmt(claim)}.` }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: cr2, wrong: [r2(cr2 - rc.bad), r2(rc.bank + rc.disc + rc.ret + rc.bad)], stem: "Calculate the credit sales to the date of the fire.", explanation: `${fmt(rc.close)} + ${fmt(rc.bank)} + ${fmt(rc.disc)} + ${fmt(rc.ret)} + ${fmt(rc.bad)} - ${fmt(rc.open)} = ${fmt(cr2)}.` }),
      P.manual({ label: "(e)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the total trade receivables account to the date of the fire.", points: ["Opening balance and credit sales on the debit side", "Bank, discount, returns inwards, irrecoverable debts and closing balance on the credit side", "Totals equal and balance brought down"], modelAnswer: recvAcc, explanation: "One mark each; allow own figures." }),
      P.manual({ label: "(f)", marks: 2, stem: "The insurer questions the claim. Explain two reasons why the estimate might be wrong.", points: ["The mark-up may have varied, for example if goods were sold at a discount, so cost of sales and inventory would differ", "Records of purchases, sales or returns may be incomplete or inaccurate"], modelAnswer: "If some goods were sold at a lower mark-up the estimated cost of sales is wrong. The calculation also relies on complete records of purchases, sales and returns.", explanation: "One mark per reason." }),
    ],
    hints: ["Cost of sales = revenue ÷ (1 + mark-up).", "Inventory before the fire = opening + net purchases - cost of sales."],
    explanation: "This item tests mark-up, inventory lost, a total account and the reliability of the estimate.",
  });

  b.card("DEFINITION", "What is a **total account**?", "A ledger-style account for all receivables (or payables) together; credit sales (or credit purchases) is the balancing figure.");
  b.card("FORMULA", "Credit sales from the total receivables account", "Closing receivables + cash received + discount allowed + returns inwards + irrecoverable debts - opening receivables.");
  b.card("FORMULA", "Credit purchases from the total payables account", "Closing payables + payments + discount received + returns outwards - opening payables.");
  b.card("FORMULA", "Margin and mark-up", "Margin = gross profit ÷ revenue × 100; mark-up = gross profit ÷ cost of sales × 100.");
  b.card("FACT", "Margin and mark-up equivalence", "A 25% margin equals a 33⅓% mark-up; a 50% mark-up equals a 33⅓% margin.");
  b.card("FORMULA", "Inventory lost in a fire", "Opening inventory + net purchases - cost of sales (from margin or mark-up) - salvage.");
  b.card("FACT", "What is drawings in a bank summary?", "The balancing figure after all other receipts and payments are entered.");
  b.card("CONCEPT", "Assumption behind a margin-based estimate", "The margin earned in the period was the same as the usual margin, and the records are complete.");
  b.card("FACT", "Total sales", "Credit sales plus cash sales; revenue also deducts returns inwards.");
});
