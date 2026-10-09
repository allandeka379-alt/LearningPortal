// W1a: documents used in home trade; trade and cash discounts (COM).
import { concept, P, f, money, fmt, r2, table, check, sum } from "../lib.mjs";

concept("bus.trade.home-trade-documents", { file: "trade/home-trade-documents", keyPrefix: "trade.home-trade-documents" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which document does a **buyer** send to ask about the prices and terms of goods?",
    options: [
      ["Letter of enquiry", "Correct: the enquiry starts the process."],
      ["Quotation", "The quotation is the seller's reply to the enquiry."],
      ["Invoice", "The invoice is the seller's bill."],
      ["Statement of account", "The statement is the seller's monthly summary."],
    ],
    answer: "A",
    explanation: "The buyer sends the enquiry; the seller replies with a quotation, price list or catalogue.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which document travels **with** the goods and is signed by the buyer as proof of delivery?",
    options: [
      ["Delivery note", "Correct: the buyer checks the goods against it and signs."],
      ["Advice note", "The advice note is sent ahead to say the goods are on the way."],
      ["Order", "The order is sent by the buyer to request goods."],
      ["Receipt", "A receipt is proof of payment, not of delivery."],
    ],
    answer: "A",
    explanation: "The delivery note lists the goods delivered; the signed copy proves delivery.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A buyer returns five damaged cartons. Which document will the seller send?",
    options: [
      ["Credit note", "Correct: it reduces the amount the buyer owes."],
      ["Debit note", "A debit note increases the amount owed."],
      ["Pro forma invoice", "A pro forma invoice is sent before goods, often for payment in advance."],
      ["Advice note", "An advice note announces that goods have been sent."],
    ],
    answer: "A",
    explanation: "Credit notes reduce the buyer's debt for returns, damaged or missing goods, or overcharging.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "An invoice charged US\\$18 a box instead of the agreed US\\$21. Which document corrects this?",
    options: [
      ["Debit note", "Correct: the buyer was undercharged, so the amount owed must increase."],
      ["Credit note", "A credit note would reduce the amount owed."],
      ["Statement of account", "The statement summarises; it does not correct an invoice."],
      ["Letter of enquiry", "The enquiry is sent by the buyer at the start."],
    ],
    answer: "A",
    explanation: "Undercharging is corrected with a debit note, which increases what the buyer owes.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why might a seller send a **pro forma invoice**?",
    options: [
      ["To ask a new customer to pay before goods are sent", "Correct: it shows what will be charged so payment can be made in advance."],
      ["To correct an overcharge on an earlier invoice", "Overcharges are corrected by credit notes."],
      ["To summarise the account at the end of the month", "That is the statement of account."],
      ["To prove that the buyer has paid in full", "Proof of payment is a receipt."],
    ],
    answer: "A",
    explanation: "Pro forma invoices are used for payment in advance (new or doubtful customers), as quotations, and to support import licence applications.",
  });
  const lp1 = 3600, td1 = 25;
  const inv1 = f.afterTradeDiscount(lp1, td1);
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `Goods have a list price of ${money(lp1)}. The retailer receives ${td1}% trade discount. What is the invoice total?`,
    options: [
      [money(inv1), `Correct: ${fmt(lp1)} − 25% = ${fmt(inv1)}.`],
      [money(r2(lp1 * td1 / 100)), "This is the discount itself, not the amount due."],
      [money(r2(lp1 - td1)), "The discount is 25 per cent, not 25 dollars."],
      [money(r2(lp1 * 1.25)), "This adds 25% instead of subtracting it."],
    ],
    answer: "A",
    explanation: `Trade discount = 25% × ${fmt(lp1)} = ${fmt(r2(lp1 * 0.25))}; invoice total = ${money(inv1)}.`,
  });
  const lp2 = 1500, td2 = 10, cd2 = 4;
  const pay2 = f.afterBothDiscounts(lp2, td2, cd2);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: pay2, calculator: true,
    stem: `A wholesaler's list price for an order of school stationery is ${money(lp2)}. The trade discount is ${td2}% and a cash discount of ${cd2}% is allowed if the bill is paid within 7 days. Calculate the amount paid by a retailer who pays within 7 days.`,
    wrong: [r2(lp2 * (1 - (td2 + cd2) / 100)), f.afterTradeDiscount(lp2, td2)],
    explanation: `After trade discount: ${money(f.afterTradeDiscount(lp2, td2))}. Cash discount: ${cd2}% × ${fmt(f.afterTradeDiscount(lp2, td2))} = ${fmt(r2(f.afterTradeDiscount(lp2, td2) * cd2 / 100))}. Amount paid: ${money(pay2)}. Adding the rates (14% off ${fmt(lp2)}) gives the wrong answer ${money(r2(lp2 * 0.86))}.`,
    workedSolution: `1. Trade discount = ${td2}% × ${fmt(lp2)} = ${fmt(r2(lp2 * td2 / 100))}; invoice total = ${fmt(f.afterTradeDiscount(lp2, td2))}.\n2. Cash discount = ${cd2}% × ${fmt(f.afterTradeDiscount(lp2, td2))} = ${fmt(r2(f.afterTradeDiscount(lp2, td2) * cd2 / 100))}.\n3. Amount paid = ${fmt(f.afterTradeDiscount(lp2, td2))} − ${fmt(r2(f.afterTradeDiscount(lp2, td2) * cd2 / 100))} = ${money(pay2)}.`,
    hints: ["Take the trade discount off the list price first.", "Then take the cash discount off the reduced amount."],
  });
  const inv3 = 840, cd3 = 5;
  const disc3 = r2(inv3 * cd3 / 100);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: disc3,
    stem: `An invoice total after trade discount is ${money(inv3)}. The terms are ${cd3}% cash discount for payment within 14 days. How much cash discount does a buyer who pays within 14 days receive?`,
    wrong: [r2(inv3 - disc3), cd3],
    explanation: `${cd3}% × ${fmt(inv3)} = ${money(disc3)}.`,
  });
  const inv4 = 1120, td4 = 20;
  const lp4 = r2(inv4 / (1 - td4 / 100));
  check("reverse trade discount", f.afterTradeDiscount(lp4, td4), inv4);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: lp4,
    stem: `After a trade discount of ${td4}%, an invoice total is ${money(inv4)}. Calculate the list price of the goods.`,
    wrong: [r2(inv4 * 1.2), r2(inv4 + td4)],
    explanation: `${money(inv4)} is ${100 - td4}% of the list price, so list price = ${fmt(inv4)} ÷ 0.8 = ${money(lp4)}. Adding 20% to ${fmt(inv4)} gives ${money(r2(inv4 * 1.2))}, which is wrong because the discount was 20% of the larger list price.`,
    workedSolution: `1. Invoice total = ${100 - td4}% of the list price.\n2. List price = ${fmt(inv4)} ÷ ${(100 - td4) / 100} = ${money(lp4)}.\n3. Check: 20% of ${fmt(lp4)} = ${fmt(r2(lp4 * 0.2))}; ${fmt(lp4)} − ${fmt(r2(lp4 * 0.2))} = ${fmt(inv4)}.`,
    hints: ["The invoice total is 80% of the list price.", "Divide, do not add 20%."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Invoices, credit notes and statements of account are sent by the seller.",
    answer: true,
    explanation: "True. The buyer sends the enquiry, the order and the payment; the seller sends the other documents.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Cash discount is calculated on the list price before trade discount is deducted.",
    answer: false,
    explanation: "False. Trade discount comes off first; cash discount is calculated on the amount after trade discount.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each document with its purpose.",
    pairs: [
      ["Order", "Buyer's formal request for goods"],
      ["Advice note", "Tells the buyer that goods have been sent"],
      ["Statement of account", "Monthly summary showing the balance due"],
      ["Receipt", "Proof that payment has been made"],
    ],
    explanation: "Know who sends each document and why.",
  });
  b.fib({
    d: 2,
    stem: "Put the documents in order.",
    template: "Enquiry → quotation → {{blank:a}} → delivery note → {{blank:b}} → statement of account.",
    blanks: [
      { id: "a", accepted: ["order"], choices: ["order", "invoice", "receipt", "credit note"] },
      { id: "b", accepted: ["invoice"], choices: ["order", "invoice", "enquiry", "quotation"] },
    ],
    explanation: "The buyer orders after receiving the quotation; the seller sends the goods with a delivery note and then the invoice.",
  });
  const rowsS = [["1 May", "Balance brought forward", null, null, 500], ["6 May", "Invoice 88", 780, null, 1280], ["15 May", "Credit note 12", null, 65, 1215], ["22 May", "Payment received", null, 500, 715], ["29 May", "Debit note 4", 30, null, "?"]];
  const closing = r2(500 + 780 - 65 - 500 + 30);
  check("statement", closing, sum([500, 780, 30]) - sum([65, 500]));
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: closing,
    stem: `Complete the statement of account. What is the balance due on 29 May?\n\n${table(["Date", "Details", "Debit US\\$", "Credit US\\$", "Balance US\\$"], rowsS)}`,
    wrong: [r2(715 - 30), r2(1280 - 65)],
    explanation: `715 + 30 = ${money(closing)}: a debit note increases the amount owed.`,
    hints: ["Does a debit note increase or reduce the balance?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why a seller gives (a) trade discount and (b) cash discount.",
    points: [
      "(a) To allow the retailer a profit margin when reselling at the list/recommended price (1)",
      "(a) To encourage large orders / reward regular trade customers (1)",
      "(b) To encourage prompt payment (1)",
      "(b) Improves the seller's cash flow / reduces bad debts (1)",
    ],
    modelAnswer: "Trade discount is given to traders so that they can resell at the list price and still make a profit, and to encourage large orders. Cash discount encourages buyers to pay quickly, which gives the seller cash sooner and reduces the risk of bad debts.",
    explanation: "Each discount has a different purpose: trade discount for traders' margins and bulk orders; cash discount for prompt payment.",
    hints: ["Who receives trade discount?", "When is cash discount taken?"],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain how a buyer uses the **delivery note** and the **statement of account** to check that it is not overcharged.",
    points: [
      "Delivery note: buyer checks goods received against it / against the order (1)",
      "Any shortages or damage noted, so a credit note can be claimed (1)",
      "Statement: buyer checks each invoice, credit note and payment against its own records (1)",
      "Errors queried before paying the balance (1)",
    ],
    modelAnswer: "When the goods arrive the buyer checks them against the delivery note and the order, and records any missing or damaged items before signing, so the seller must issue a credit note. At month end the buyer compares every invoice, credit note and payment on the statement with its own records and queries any difference before paying.",
    explanation: "Credit for the checking role of each document.",
    hints: ["What is checked when the goods arrive?", "What is checked before paying at month end?"],
  });
  const qty = 40, unit = 35, td = 15, cd = 2;
  const gross = qty * unit;
  const afterTd = f.afterTradeDiscount(gross, td);
  const pay = f.afterBothDiscounts(gross, td, cd);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, secs: 840, calculator: true,
    stem: `Bulawayo Hardware Wholesalers (a fictional business) sold ${qty} boxes of tiles at a list price of ${money(unit)} a box to Sipho's building supplies shop in Gwanda. Terms: ${td}% trade discount; ${cd}% cash discount if paid within 10 days. Two boxes arrived broken and were returned.`,
    parts: [
      P.num({
        label: "(a)", marks: 1, kind: "money", value: gross,
        stem: "Calculate the gross (list) value of the tiles.",
        wrong: [unit, qty],
        explanation: `${qty} × ${fmt(unit)} = ${money(gross)}.`,
      }),
      P.num({
        label: "(b)", marks: 2, kind: "money", value: afterTd,
        stem: "Calculate the invoice total after trade discount.",
        wrong: [r2(gross * td / 100), r2(gross - td)],
        explanation: `${fmt(gross)} − ${td}% = ${money(afterTd)}.`,
      }),
      P.num({
        label: "(c)", marks: 2, kind: "money", value: pay,
        stem: "Ignoring the returned boxes, calculate the amount Sipho pays if he pays within 10 days.",
        wrong: [r2(gross * (1 - (td + cd) / 100)), afterTd],
        explanation: `${fmt(afterTd)} − ${cd}% = ${money(pay)}.`,
      }),
      P.mcq({
        label: "(d)", marks: 1,
        stem: "Which document will the wholesaler send for the two broken boxes?",
        options: [["Credit note", "Correct: it reduces the amount owed."], ["Debit note", "That would increase the amount owed."], ["Advice note", "That announces a dispatch."], ["Quotation", "That gives prices before an order."]],
        answer: "A",
      }),
      P.manual({
        label: "(e)", marks: 4,
        stem: "Sipho is short of cash this month. Advise him whether to take the cash discount. Justify your answer.",
        points: [`Taking it saves ${money(r2(afterTd - pay))} (1)`, "But he must find the cash within 10 days, which could leave him unable to buy stock or pay wages (1)", "Consider borrowing / other bills / goodwill with supplier (1)", "Justified recommendation (1)"],
      }),
    ],
    explanation: `Gross ${money(gross)}; after trade discount ${money(afterTd)}; with cash discount ${money(pay)}. The credit note reduces the amount owed for the broken boxes.`,
    hints: ["Gross value = quantity × list price.", "Trade discount first, then cash discount."],
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 720,
    stem: "Thandeka opened a stationery shop in Gweru and wants to buy stock for the first time from a wholesaler in Harare that she has never dealt with.",
    parts: [
      P.fib({
        label: "(a)", marks: 3,
        stem: "Complete the first documents in order.",
        template: "Thandeka sends a {{blank:a}}. The wholesaler replies with a {{blank:b}}. Because Thandeka is a new customer, the wholesaler sends a {{blank:c}} and asks for payment before sending the goods.",
        blanks: [
          { id: "a", accepted: ["letter of enquiry"], choices: ["letter of enquiry", "credit note", "statement of account", "receipt"] },
          { id: "b", accepted: ["quotation"], choices: ["quotation", "debit note", "delivery note", "receipt"] },
          { id: "c", accepted: ["pro forma invoice"], choices: ["pro forma invoice", "credit note", "advice note", "statement of account"] },
        ],
        wrong: [["letter of enquiry", "delivery note", "credit note"]],
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "State **two** items of information Thandeka should include in her order.",
        points: ["Quantities and descriptions/catalogue numbers of goods (1)", "Any of: order number, prices, delivery address/date, signature (1)"],
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain why it is important for Thandeka to keep copies of all the documents.",
        points: ["Evidence in case of dispute / overcharging (1)", "To check invoices and statements against orders and delivery notes (1)", "Needed for keeping accounts / calculating profit (1)", "Needed for tax records (ZIMRA) / proof of payment (1)"],
      }),
    ],
    explanation: "Enquiry → quotation → (pro forma invoice for advance payment) → order and delivery. Documents provide evidence for checking, disputes, accounts and tax.",
    hints: ["Who starts the process?", "Why would a seller want payment before sending goods to a new customer?"],
  });
  b.card("FACT", "Sequence of home trade documents", "Enquiry → quotation/price list/catalogue → order → (pro forma invoice) → advice note → delivery note → invoice → debit/credit note → statement → payment and receipt.");
  b.card("DEFINITION", "Invoice", "Seller's bill: goods supplied, prices, trade discount, terms of payment and total due.");
  b.card("DEFINITION", "Pro forma invoice", "Invoice sent before the goods, for payment in advance, as a quotation or for an import licence.");
  b.card("CONCEPT", "Debit note versus credit note", "Debit note increases the amount owed (undercharge). Credit note reduces it (returns, damage, overcharge).");
  b.card("DEFINITION", "Statement of account", "Monthly summary of invoices, debit notes, credit notes and payments, showing the balance due.");
  b.card("DEFINITION", "Trade discount", "Reduction off the list price for traders buying for resale; encourages large orders.");
  b.card("DEFINITION", "Cash discount", "Reduction for prompt payment within a stated period; calculated after trade discount.");
  b.card("FORMULA", "Order of discounts", "Amount paid = list price × (1 − trade %) × (1 − cash %). Never add the two rates.");
  b.card("CONCEPT", "Advice note versus delivery note", "Advice note is sent ahead to say goods are coming; delivery note travels with the goods and is signed on receipt.");
});
