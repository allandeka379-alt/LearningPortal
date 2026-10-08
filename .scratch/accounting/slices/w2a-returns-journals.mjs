// W2a: sales returns and purchases returns journals.
import { concept, P, money, tAccount, statement, check, sum, r2 } from "../lib.mjs";
import { dayBook, net, table } from "../tables/w2a-lib.mjs";

const U = String.raw`US\$`;

concept("acc.books.returns-journals", { file: "books/returns-journals", keyPrefix: "books.returns-journals" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which document does a business send to a customer who has returned goods bought on credit?",
    options: [
      ["A credit note", "Correct: the seller issues a credit note to reduce the customer's account."],
      ["An invoice", "An invoice charges the customer for a sale; it does not reduce the debt."],
      ["A receipt", "A receipt acknowledges money received."],
      ["A statement of account", "A statement summarises the account for the month; it does not record the return."],
    ],
    answer: "A",
    explanation: "The **seller** issues the credit note. The business keeps a copy and records it in the sales returns journal.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Goods are returned to a supplier, Chinhoyi Traders. Which entries record this in the ledger of the business that returned them?",
    options: [
      ["Debit Chinhoyi Traders, credit returns outwards", "Correct: the business owes less, and returns outwards (a reduction of purchases) is credited."],
      ["Debit returns outwards, credit Chinhoyi Traders", "This would increase the amount owed to the supplier."],
      ["Debit Chinhoyi Traders, credit returns inwards", "Returns inwards are returns from customers, not to suppliers."],
      ["Debit returns inwards, credit Chinhoyi Traders", "Both the account and the direction are wrong for a return to a supplier."],
    ],
    answer: "A",
    explanation: "A purchases return reverses part of a credit purchase: the supplier is **debited** (liability falls) and returns outwards is **credited**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How is the monthly total of the sales returns journal posted?",
    options: [
      ["Debit the returns inwards account", "Correct: returns inwards reduce sales, so the account is debited."],
      ["Credit the returns inwards account", "The individual customers are credited; the returns account is debited."],
      ["Credit the sales account", "Returns are kept in a separate account, and a credit to sales would increase it."],
      ["Debit each customer's account", "Customers are credited with their returns, individually."],
    ],
    answer: "A",
    explanation: "Each credit note is credited to the customer; the total is debited to returns inwards.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In the trading section of the income statement (statement of profit or loss), where are **returns outwards** shown?",
    options: [
      ["Deducted from purchases", "Correct: net purchases = purchases − returns outwards."],
      ["Deducted from sales", "Returns inwards are deducted from sales."],
      ["Added to other income", "Returns are not income; they reduce purchases."],
      ["Listed with the expenses", "Returns outwards reduce the cost of goods bought; they are not an expense."],
    ],
    answer: "A",
    explanation: "Returns outwards reduce the cost of the goods bought, so they are deducted from purchases in the calculation of cost of sales.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Rudo sold goods listed at US\\$1,600 to Sipho on credit, less 20% trade discount. Sipho returned a quarter of the goods. What amount is entered in Rudo's sales returns journal?",
    options: [
      ["US\\$320", "Correct: the goods were invoiced at 1,280 net; a quarter is 320."],
      ["US\\$400", "This uses the list price; returns are valued at the net invoiced price."],
      ["US\\$1,280", "This is the whole net invoice, not the quarter returned."],
      ["US\\$80", "This is the trade discount on the returned goods, not their value."],
    ],
    answer: "A",
    hints: ["Find the net invoice value first."],
    explanation: "Net invoice $1,600 \\times 0.8 = 1,280$; a quarter returned $= 1,280 \\div 4 = 320$. The credit note is for the price actually charged.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A credit note for US\\$150 received from a supplier was entered in the **sales** returns journal by mistake. Which statement is correct?",
    options: [
      ["Returns inwards are overstated and returns outwards understated by US\\$150", "Correct: the US\\$150 went to the wrong returns account."],
      ["Returns inwards and returns outwards are both understated by US\\$150", "The amount was added to returns inwards, so they are overstated, not understated."],
      ["Only the supplier's account is affected", "The returns accounts are affected too, because the total was posted to the wrong one."],
      ["There is no effect, because both are returns", "Returns inwards reduce sales and returns outwards reduce purchases: they are different accounts."],
    ],
    answer: "A",
    hints: ["A credit note received relates to goods returned to a supplier."],
    explanation: "A credit note received records returns **outwards**. Entering it in the sales returns journal puts US\\$150 into returns inwards instead, so returns inwards are too high and returns outwards too low (and the personal posting goes to the wrong side).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A customer's account shows sales of US\\$2,750, returns inwards of US\\$310 and a payment of US\\$1,500. What does the customer still owe?",
    options: [
      ["US\\$940", "Correct: 2,750 − 310 − 1,500 = 940."],
      ["US\\$1,560", "This adds the returns instead of deducting them."],
      ["US\\$1,250", "This ignores the returns."],
      ["US\\$4,560", "This adds all three amounts instead of deducting the credits from the debit."],
    ],
    answer: "A",
    hints: ["Returns and payments are both on the credit side of the customer's account."],
    explanation: "Debit 2,750; credits $310 + 1,500 = 1,810$; balance $2,750 - 1,810 = 940$ debit, the amount still owed.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Returns inwards are goods returned **by customers** to the business.",
    answer: true,
    explanation: "True. Goods come back in to the business: returns inwards, also called sales returns.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "When goods are returned to a supplier, the supplier's account is credited.",
    answer: false,
    explanation: "False. The business owes the supplier less, so the supplier's account is **debited**; returns outwards is credited.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each item with the correct entry or treatment.",
    pairs: [
      ["Each credit note in the sales returns journal", "Credit the customer's account"],
      ["Total of the sales returns journal", "Debit returns inwards"],
      ["Each credit note in the purchases returns journal", "Debit the supplier's account"],
      ["Total of the purchases returns journal", "Credit returns outwards"],
      ["Returns inwards in the income statement", "Deducted from sales"],
    ],
    explanation: "Returns reverse the original postings: sales returns reverse a credit sale, purchases returns reverse a credit purchase.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Goods returned to the business by customers are called returns {{blank:a}} and are recorded in the {{blank:b}} returns journal.",
    blanks: [
      { id: "a", accepted: ["inwards"], choices: ["inwards", "outwards"] },
      { id: "b", accepted: ["sales"], choices: ["sales", "purchases"] },
    ],
    explanation: "Returns inwards = sales returns; returns outwards = purchases returns.",
  });

  // Net sales and net purchases
  const ns = { s: 62400, ri: 1870 };
  b.num({
    d: 2, kind: "money", value: r2(ns.s - ns.ri), wrong: [r2(ns.s + ns.ri)],
    stem: "Thandeka's ledger shows sales of US\\$62,400 and returns inwards of US\\$1,870 for the year. Calculate her net sales (revenue less returns inwards).",
    explanation: `$62,400 - 1,870 = 60,530$, so ${money(r2(ns.s - ns.ri))}. Returns inwards are deducted, never added.`,
  });
  const gp = { s: 39200, ri: 640, p: 24800, ro: 520, oi: 2900, ci: 3400 };
  const gpNs = r2(gp.s - gp.ri);
  const gpCos = r2(gp.oi + gp.p - gp.ro - gp.ci);
  const gpVal = r2(gpNs - gpCos);
  const swapped = r2(gp.s - gp.ro - (gp.oi + gp.p - gp.ri - gp.ci));
  b.calc({
    d: 4, kind: "money", value: gpVal, wrong: [swapped, r2(gp.s - (gp.oi + gp.p - gp.ci))], calculator: true,
    stem: "Tatenda's trading figures for the year ended 31 December 2025 were:\n\n" +
      table(["Item", U], [["Sales", gp.s], ["Returns inwards", gp.ri], ["Purchases", gp.p], ["Returns outwards", gp.ro], ["Inventory at 1 January 2025", gp.oi], ["Inventory at 31 December 2025", gp.ci]]) +
      "\n\nCalculate Tatenda's gross profit.",
    hints: ["Net sales = sales − returns inwards.", "Cost of sales = opening inventory + net purchases − closing inventory."],
    explanation: `Net sales $39,200 - 640 = ${gpNs.toLocaleString("en-GB")}$. Net purchases $24,800 - 520 = 24,280$. Cost of sales $2,900 + 24,280 - 3,400 = ${gpCos.toLocaleString("en-GB")}$. Gross profit $${gpNs.toLocaleString("en-GB")} - ${gpCos.toLocaleString("en-GB")} = ${gpVal.toLocaleString("en-GB")}$. Swapping the two returns gives ${money(swapped)}; ignoring both gives ${money(r2(gp.s - (gp.oi + gp.p - gp.ci)))}.`,
  });
  check("gp", gpVal, 14780);
  // Supplier balance after returns
  const sup = r2(net(3000, 10) - net(500, 10) - 1200);
  b.calc({
    d: 3, kind: "money", value: sup, wrong: [r2(3000 - 500 - 1200), r2(net(3000, 10) + net(500, 10) - 1200)],
    stem: "Nyasha bought goods listed at US\\$3,000 from Kadoma Wholesalers, less 10% trade discount. She returned goods listed at US\\$500 and later paid US\\$1,200. How much does she still owe Kadoma Wholesalers?",
    hints: ["Value both the purchase and the return at net price."],
    explanation: `Purchase $3,000 \\times 0.9 = 2,700$ (credit). Return $500 \\times 0.9 = 450$ and payment 1,200 (debits). Balance $2,700 - 450 - 1,200 = ${sup.toLocaleString("en-GB")}$ credit. Using list prices gives ${money(r2(3000 - 500 - 1200))}.`,
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 2,
    stem: "Explain why a business keeps a separate returns inwards account instead of debiting returns directly to the sales account.",
    points: ["The owner can see the total value of goods returned", "So that problems such as poor quality or wrong deliveries can be identified and acted on / sales figure shows gross sales made"],
    modelAnswer: "A separate account shows how much is being returned. If returns rise, the owner can investigate faulty goods or ordering errors; netting them off sales would hide this.",
    hints: ["What information would be lost if returns were netted off sales?"],
    explanation: "Separate returns accounts give management information while the income statement still shows net sales.",
  });

  // Practice structured 1: sales returns journal with trade discount
  const srRows = [["5 Nov", "Chipo Banda", "CN 61", net(560, 25)], ["13 Nov", "Kariba Lodge", "CN 62", 245], ["22 Nov", "Chipo Banda", "CN 63", net(320, 25)]];
  const sr = dayBook("Sales returns journal (November 2025)", srRows, { nameCol: "Customer", refCol: "Credit note", totalLabel: "Transferred to returns inwards account", totalDate: "30 Nov" });
  check("sr", sr.total, 420 + 245 + 240);
  const cbDr = [["1 Nov", "Balance b/d", 1150], ["3 Nov", "Sales", net(2880, 25)]];
  const cbCr = [["5 Nov", "Returns inwards", srRows[0][3]], ["18 Nov", "Bank", 1500], ["22 Nov", "Returns inwards", srRows[2][3]]];
  const cbModel = tAccount("Chipo Banda account", cbDr, cbCr, { cdDate: "30 Nov", bdDate: "1 Dec" });
  const cbBal = r2(sum(cbDr.map((x) => x[2])) - sum(cbCr.map((x) => x[2])));
  check("cb", cbBal, 1150 + 2160 - 420 - 1500 - 240);
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: "Farai sells kitchen equipment in Harare and gives 25% trade discount to trade customers. On 1 November 2025 Chipo Banda (a trade customer) owed him US\\$1,150. In November:\n\n" +
      table(["Date", "Transaction"], [["3 Nov", "Sold goods to Chipo Banda, list price US\\$2,880"], ["5 Nov", "Chipo Banda returned goods, list price US\\$560 (credit note CN 61)"], ["13 Nov", "Kariba Lodge, a credit customer who receives no trade discount, returned goods worth US\\$245 (CN 62)"], ["18 Nov", "Chipo Banda paid US\\$1,500 by bank transfer"], ["22 Nov", "Chipo Banda returned goods, list price US\\$320 (CN 63)"]]),
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: srRows[0][3], wrong: [560], stem: "Calculate the amount of credit note CN 61.", explanation: "$560 \\times 0.75 = 420$." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: sr.total, wrong: [560 + 245 + 320], stem: "Calculate the total of the sales returns journal for November.", explanation: `$420 + 245 + 240 = ${sr.total}$.` }),
      P.manual({ label: "(c)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare Chipo Banda's account for November, balanced at 30 November.", points: ["Balance b/d 1,150 and Sales 2,160 on the debit side", "Returns inwards 420 and 240 on the credit side", "Bank 1,500 on the credit side", "Balance c/d 1,150, totals 3,310, balance b/d 1,150 Dr on 1 Dec"], modelAnswer: cbModel, explanation: "Sales at net price on the debit side; returns and payments on the credit side." }),
      P.mcq({
        label: "(d)", stem: "Which entry is made in the returns inwards account for November?",
        options: [[`Debit ${money(sr.total)}`, "Correct: the total of the journal is debited."], [`Credit ${money(sr.total)}`, "The customers are credited; returns inwards is debited."], [`Debit ${money(560 + 245 + 320)}`, "This uses list prices."], [`Debit ${money(r2(sr.total - 245))}`, "Kariba Lodge's return is also a sales return."]],
        answer: "A", explanation: "One debit entry with the journal total.",
      }),
      P.manual({ label: "(e)", marks: 1, stem: "State where the returns inwards total appears in Farai's income statement.", points: ["Deducted from sales (revenue) in the trading section"], modelAnswer: "It is deducted from sales in the trading section to give net sales.", explanation: "Returns inwards reduce revenue." }),
    ],
    hints: ["Every Chipo Banda amount is at net price (75% of list).", "Returns and payments go on the credit side of a customer's account."],
    explanation: "This item tests valuing returns, totalling the sales returns journal and posting it.",
  });
  check("cbBal", cbBal, 1150);

  // Practice structured 2: purchases returns and the trading section
  const pr = { p: 18650, ro: 735, s: 29400, ri: 410, oi: 2240, ci: 1980 };
  const t2 = { ns: r2(pr.s - pr.ri), np: r2(pr.p - pr.ro) };
  t2.avail = r2(pr.oi + t2.np);
  t2.cos = r2(t2.avail - pr.ci);
  t2.gp = r2(t2.ns - t2.cos);
  const trading = "**Sipho's Spares**\n\n**Income statement (extract)**\n\n" + statement("for the year ended 31 December 2025", [
    ["Revenue", null, pr.s, null], ["Less: Returns inwards", null, -pr.ri, null], [null, null, null, t2.ns],
    ["Less: Cost of sales", null, null, null], ["Opening inventory", null, pr.oi, null],
    ["Purchases", pr.p, null, null], ["Less: Returns outwards", -pr.ro, null, null], [null, null, t2.np, null], [null, null, t2.avail, null],
    ["Less: Closing inventory", null, -pr.ci, null], [null, null, null, -t2.cos], ["**Gross profit**", null, null, `**${t2.gp.toLocaleString("en-GB")}**`],
  ], { cols: [U, U, U], checks: [["ns", t2.ns, 28990], ["np", t2.np, 17915], ["avail", t2.avail, 20155], ["cos", t2.cos, 18175], ["gp", t2.gp, 10815]] });
  b.struct({
    d: 5, examStyle: true, skill: "ANALYSIS", calculator: true,
    stem: "Sipho runs a motor-spares shop in Gweru. The following figures were taken from his books for the year ended 31 December 2025:\n\n" +
      table(["Item", U], [["Revenue (sales)", pr.s], ["Purchases", pr.p], ["Returns inwards", pr.ri], ["Returns outwards", pr.ro], ["Inventory 1 January 2025", pr.oi], ["Inventory 31 December 2025", pr.ci]]),
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: t2.np, wrong: [r2(pr.p - pr.ri)], stem: "Calculate net purchases.", explanation: `$18,650 - 735 = ${t2.np.toLocaleString("en-GB")}$.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: t2.cos, wrong: [r2(pr.oi + pr.p - pr.ci)], stem: "Calculate cost of sales.", explanation: `$2,240 + 17,915 - 1,980 = ${t2.cos.toLocaleString("en-GB")}$.` }),
      P.manual({ label: "(c)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the trading section of Sipho's income statement for the year ended 31 December 2025.", points: ["Three-line heading with the year end", "Revenue 29,400 less returns inwards 410 = 28,990", "Purchases 18,650 less returns outwards 735 = 17,915; opening inventory added and closing inventory deducted; cost of sales 18,175", "Gross profit 10,815"], modelAnswer: trading, explanation: "Returns inwards go with sales; returns outwards with purchases." }),
      P.num({ label: "(d)", marks: 1, kind: "money", value: t2.gp, wrong: [r2(pr.s - pr.ro - (pr.oi + pr.p - pr.ri - pr.ci))], stem: "State the gross profit.", explanation: `$28,990 - 18,175 = ${t2.gp.toLocaleString("en-GB")}$.` }),
      P.manual({ label: "(e)", marks: 2, stem: "A clerk deducted returns inwards from purchases and returns outwards from sales. By how much, and in which direction, would gross profit be wrong? Explain.", points: ["Gross profit understated (too low)", "By 650: sales reduced by 325 more and cost of sales by 325 less than correct (735 − 410 = 325 on each side)"], modelAnswer: "Sales would be 325 lower and cost of sales 325 higher than correct, so gross profit would be understated by US\\$650.", explanation: "Each swap moves 735 − 410 = 325 to the wrong side." }),
    ],
    hints: ["Net purchases = purchases − returns outwards.", "Cost of sales = opening inventory + net purchases − closing inventory."],
    explanation: "This item tests where returns appear in the trading section and the effect of misplacing them.",
  });
  const swapGp = r2(pr.s - pr.ro - (pr.oi + pr.p - pr.ri - pr.ci));
  check("swap diff", r2(t2.gp - swapGp), 650);

  b.card("DEFINITION", "What are **returns inwards**?", "Goods returned to the business by customers (sales returns).");
  b.card("DEFINITION", "What are **returns outwards**?", "Goods returned by the business to its suppliers (purchases returns).");
  b.card("DEFINITION", "What is a **credit note**?", "A document issued by the seller showing the buyer's account has been reduced, e.g. for goods returned.");
  b.card("FACT", "Posting the sales returns journal", "Credit each customer; debit returns inwards with the total.");
  b.card("FACT", "Posting the purchases returns journal", "Debit each supplier; credit returns outwards with the total.");
  b.card("FACT", "Returns inwards in the income statement", "Deducted from sales (revenue) in the trading section.");
  b.card("FACT", "Returns outwards in the income statement", "Deducted from purchases in the cost of sales calculation.");
  b.card("CONCEPT", "At what value are returns recorded?", "At the net price charged on the invoice, i.e. after trade discount.");
  b.card("DEFINITION", "What is a **debit note**?", "A document a buyer sends to a supplier with returned goods, asking for the account to be reduced.");
});
