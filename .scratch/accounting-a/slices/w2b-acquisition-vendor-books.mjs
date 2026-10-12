// W2b: acquisition.vendor-books
import { concept, P, money, fmt, chk, r2, sum } from "../lib.mjs";
import { mc, U, vendorBooks } from "../tables/w2b-lib.mjs";

concept("aacc.acquisition.vendor-books", { file: "acquisition/vendor-books", keyPrefix: "acquisition.vendor-books" }, (b) => {
  // --- MCQ
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "In the takeover of a business by a company, who is the vendor?",
    right: ["The owner or owners of the business being sold", "Correct: the vendor sells the business and receives the consideration."],
    wrong: [["The company that buys the business", "The buyer is the purchasing company, not the vendor."], ["The supplier who sells inventory to the business", "A supplier of goods is not the seller of the business."], ["The accountant who prepares the sale documents", "An accountant is an adviser, not a party to the sale."]],
    explanation: "The vendor is the seller of the business: a sole trader, or the partners in a partnership.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which entry is made in the vendor's books for an asset taken over by the purchasing company?",
    right: ["Debit realisation account; credit the asset account", "Correct: the asset leaves its account at book value."],
    wrong: [["Debit the asset account; credit realisation account", "This reverses the entry and would increase the asset."], ["Debit the purchasing company's account; credit the asset account", "The purchasing company is debited only with the total consideration."], ["Debit bank account; credit the asset account", "No cash is received for the individual asset."]],
    explanation: "Each asset taken over is credited and the realisation account is debited at book value.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which entry records the purchase consideration in the vendor's books?",
    right: ["Debit the purchasing company's account; credit realisation account", "Correct: the buyer owes the price, and the realisation account receives the credit."],
    wrong: [["Debit realisation account; credit the purchasing company's account", "This reverses the sides."], ["Debit bank account; credit the vendor's capital account", "The price is not simply a payment into capital."], ["Debit the vendor's capital account; credit realisation account", "Capital is only affected through the profit or loss."]],
    explanation: "The buyer becomes a debtor of the vendor for the full price; the credit is in the realisation account.",
  });
  const q4 = { net: 74600, cons: 91000 };
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A company pays ${money(q4.cons)} for a business whose net assets taken over have a book value of ${money(q4.net)}. What is the result in the vendor's books?`,
    right: [`Profit of ${money(q4.cons - q4.net)}`, "Correct: consideration exceeds the book value of the net assets."],
    wrong: [[`Loss of ${money(q4.cons - q4.net)}`, "The price is above the book value, so there is a profit."], [`Profit of ${money(q4.cons)}`, "The whole price is not profit; the net assets are deducted."], [`Profit of ${money(q4.net)}`, "This is the book value, not the difference."]],
    hints: ["Subtract the book value of the net assets."],
    explanation: "91,000 − 74,600 = 16,400 profit, credited to the vendor's capital.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "A partnership sells its business to a company at a profit. How is the profit on realisation dealt with in the partnership's books?",
    right: ["It is credited to the partners' capital accounts in the profit-sharing ratio", "Correct: it belongs to the partners as owners."],
    wrong: [["It is credited to the partners' capital accounts in the ratio of their capitals", "The agreement's profit-sharing ratio applies unless stated otherwise."], ["It is left in the realisation account as a reserve", "The realisation account is closed when the sale is complete."], ["It is credited to the purchasing company's account", "The buyer is not entitled to the vendor's profit."]],
    hints: ["Who owns the firm?"],
    explanation: "Profit or loss on realisation is shared by the partners in their profit-sharing ratio.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "The vendor receives shares in the purchasing company as part of the price. How are they recorded in the vendor's books?",
    right: ["Debit investment in shares; credit the purchasing company's account", "Correct: the shares are an asset received in settlement of the buyer's debt."],
    wrong: [["Debit the purchasing company's account; credit investment in shares", "This reverses the entry and would increase the buyer's debt."], ["Debit realisation account; credit investment in shares", "The consideration was already credited to realisation."], ["Debit share capital; credit the vendor's capital account", "The vendor does not issue shares."]],
    hints: ["The shares are received, not issued."],
    explanation: "The shares become an asset (investment) and settle part of the amount due from the buyer.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "The purchasing company does not take over the vendor's bank balance. What happens to this balance?",
    right: ["It stays with the vendor and is used to pay the owners their cash", "Correct: it forms part of the final cash payment."],
    wrong: [["It is transferred to the realisation account at book value", "Cash taken over only by the buyer is transferred."], ["It is credited to the purchasing company's account as part of the price", "The buyer did not buy it."], ["It is written off to the statement of profit or loss as an expense", "A positive bank balance is an asset, not an expense."]],
    hints: ["Who needs the cash at the end?"],
    explanation: "The retained bank balance, with any cash from the buyer, pays out the owners' capital.",
  });
  const q8 = { profit: 24000, ratio: [3, 1] };
  mc(b, {
    d: 4, skill: "APPLICATION", calculator: true,
    stem: `Tatenda and Rudo share profits and losses 3 : 1. The profit on the sale of their business to a company is ${money(q8.profit)}. How much is credited to Rudo's capital account?`,
    right: [money(6000), "Correct: one quarter of 24,000."],
    wrong: [[money(18000), "This is Tatenda's share."], [money(12000), "This divides the profit equally."], [money(8000), "This uses one third instead of one quarter."]],
    hints: ["Add the parts of the ratio first."],
    explanation: "Rudo receives 1/4 × 24,000 = 6,000; Tatenda receives 18,000.",
  });

  // --- True / false
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The profit made by a vendor on selling a business to a company is shown in the realisation account.",
    answer: true,
    explanation: "True. The balance of the realisation account, after setting the consideration against the net assets, is the profit or loss.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "A vendor values the shares received from the purchasing company at their nominal value, whatever the price they were issued at.",
    answer: false,
    hints: ["What is the consideration in shares?"],
    explanation: "False. The shares are valued at the amount agreed in the sale (the issue price), which may be above par.",
  });

  // --- Matching
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each transaction in the vendor's books with its double entry.",
    pairs: [["Asset taken over by the buyer", "Debit realisation; credit asset account"], ["Liability taken over by the buyer", "Debit liability account; credit realisation"], ["Cash received from the buyer", "Debit bank; credit purchasing company's account"], ["Profit on realisation of a sole trader", "Debit realisation; credit the trader's capital account"]],
    explanation: "Assets and profit are debits to realisation; liabilities and the consideration are credits.",
  });

  // --- Fill in the blank
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statements about closing the vendor's books.",
    template: "The purchase consideration is {{blank:a}} to the realisation account. Any shares received are debited to {{blank:b}} in the buyer's shares. The vendor's capital account is closed by transferring the investments and paying the balance in {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["credited"], choices: ["credited", "debited"] },
      { id: "b", accepted: ["an investment account"], choices: ["an investment account", "share capital", "the capital account"] },
      { id: "c", accepted: ["cash"], choices: ["cash", "shares", "goodwill"] },
    ],
    explanation: "Credit realisation with the price, debit an investment account with shares received, then pay the cash balance.",
  });

  // --- Numerical / calculations
  const n1 = { assets: 83400, liab: 12900, cons: 90000 };
  const n1net = chk(n1.assets - n1.liab, 70500);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: chk(n1.cons - n1net, 19500), wrong: [n1.cons - n1.assets, n1.cons + n1net],
    stem: `A company takes over a business: assets with a book value of ${money(n1.assets)} and trade payables of ${money(n1.liab)}. The purchase consideration is ${money(n1.cons)}. Calculate the profit on realisation in the vendor's books.`,
    hints: ["First find the net assets taken over."],
    explanation: "Net assets 83,400 − 12,900 = 70,500. Profit 90,000 − 70,500 = 19,500. Ignoring the liabilities gives 6,600.",
  });
  const n2 = { shares: 26000, price: 1.45, cash: 16500, notes: 14200 };
  const n2c = chk(n2.shares * n2.price + n2.cash + n2.notes, 68400);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", calculator: true, daily: true,
    value: n2c, wrong: [n2.shares + n2.cash + n2.notes, n2.shares * n2.price],
    stem: `The purchase consideration is ${money(n2.cash)} in cash, ${fmt(n2.shares)} ordinary shares valued at US\\$1.45 each and ${money(n2.notes)} of loan notes. Calculate the total consideration.`,
    explanation: "Shares 26,000 × 1.45 = 37,700. Total 16,500 + 37,700 + 14,200 = 68,400.",
  });
  const n3 = { cap: 47500, profit: 9300, shares: 27500, notes: 11400 };
  const n3cash = chk(n3.cap + n3.profit - n3.shares - n3.notes, 17900);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: n3cash, wrong: [n3.cap + n3.profit, n3.cap - n3.shares - n3.notes],
    stem: `A sole trader's capital is ${money(n3.cap)} and the profit on realisation is ${money(n3.profit)}. She receives shares valued at ${money(n3.shares)} and loan notes of ${money(n3.notes)}. How much cash does she finally receive from the bank account?`,
    hints: ["Closing capital less the investments received."],
    explanation: "Closing capital 47,500 + 9,300 = 56,800. Less shares 27,500 and loan notes 11,400 = 17,900.",
  });
  b.num({
    d: 4, skill: "APPLICATION", kind: "money", calculator: true,
    value: chk(21000 * (3 / 5), 12600), wrong: [8400, 10500, 21000],
    stem: "Two partners share profits and losses 3 : 2. The profit on the sale of their business to a company is US\\$21,000. Calculate the share credited to the partner with the larger share.",
    hints: ["Divide by the total of the ratio, 5."],
    explanation: "3/5 × 21,000 = 12,600. The other partner receives 8,400.",
  });

  // --- Short answer
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the account in the vendor's books in which the assets and liabilities taken over by the buyer are collected.",
    accepted: ["realisation account", "realisation"],
    explanation: "The realisation account collects the transferred assets, liabilities and the consideration.",
  });

  // --- Self-marked short answers
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the profit made by a vendor on the sale of a business to a company is not part of its trading profit.",
    points: ["The profit arises from selling the business as a whole, not from trading", "It is the difference between the price and the book value of the net assets", "It is a one-off gain credited to the owners' capital"],
    modelAnswer: "The profit arises from selling the whole business, not from buying and selling goods. It is the difference between the price and the book value of the net assets, a one-off gain credited to the owners' capital.",
    hints: ["Is the business's normal activity buying and selling goods?"],
    explanation: "One mark each for the source, the calculation and the one-off nature.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain what happens to the vendor's bank balance when the purchasing company does not take it over.",
    points: ["It stays in the vendor's books", "It is added to any cash received from the buyer", "It is used to pay the owners the cash due to them when the capital accounts are closed"],
    modelAnswer: "The bank balance stays with the vendor. Together with cash received from the buyer it is used to pay the owners the cash due when the capital accounts are closed.",
    hints: ["Think about the final payment."],
    explanation: "One mark each for retaining the bank, adding the buyer's cash and paying the owners.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A vendor is offered 80% of the price in shares of the purchasing company and 20% in cash. Evaluate this offer from the vendor's point of view.",
    points: ["Shares give a continuing interest in the business and a chance of future gains", "Only a small part of the price is available as cash now", "The value of the shares can fall, so the real price may be lower", "Conclusion: acceptable if the vendor trusts the buyer and does not need cash; otherwise negotiate more cash"],
    modelAnswer: "Shares give the vendor a stake in future gains, but only 20% is paid in cash now and the shares can fall in value. The offer suits a vendor who trusts the buyer and can wait; one who needs cash should ask for more.",
    hints: ["Weigh the future benefit against the lack of cash."],
    explanation: "A balanced answer considers both the upside and the risk and gives a conclusion.",
  });

  // --- Practice structured 1 (10 marks): sole trader
  const s1 = vendorBooks({
    date: "30 Sep 2025", buyer: "Mutare Hardware Ltd",
    partners: [{ name: "Sipho Chikore", share: 1, capital: 66000 }],
    assets: [{ name: "Premises", book: 44000 }, { name: "Equipment", book: 12000 }, { name: "Inventory", book: 8600 }, { name: "Trade receivables", book: 5400 }],
    liabilities: [{ name: "Trade payables", book: 6500 }], bank0: 2500,
    consideration: { cash: 17500, shares: { n: 27000, price: 1.2 }, notes: 26000 },
  });
  chk(s1.netBook, 63500); chk(s1.consid, 75900); chk(s1.result, 12400); chk(s1.cashPay[0], 20000);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Sipho Chikore sells his hardware shop in Mutare to Mutare Hardware Ltd on 30 September 2025. The company takes over premises (book value ${money(44000)}), equipment (${money(12000)}), inventory (${money(8600)}), trade receivables (${money(5400)}) and trade payables (${money(6500)}). Sipho keeps the bank balance of ${money(2500)}. His capital is ${money(66000)}. The consideration is ${money(17500)} in cash, 27,000 ordinary shares of US\\$1 valued at US\\$1.20 each and ${money(26000)} of loan notes.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: s1.netBook, wrong: [s1.assetsBook], stem: "Calculate the book value of the net assets taken over.", explanation: `${fmt(s1.assetsBook)} − ${fmt(s1.liabBook)} = ${fmt(s1.netBook)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: s1.result, wrong: [s1.consid - s1.assetsBook], stem: "Calculate the profit on realisation.", explanation: `Consideration 17,500 + ${fmt(s1.shareVal)} + 26,000 = ${fmt(s1.consid)}. Profit ${fmt(s1.consid)} − ${fmt(s1.netBook)} = ${fmt(s1.result)}.` }),
      P.manual({ label: "(c)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the realisation account.", points: [`Debit: assets transferred ${fmt(s1.assetsBook)}`, `Debit: profit to Sipho's capital ${fmt(s1.result)}`, `Credit: trade payables ${fmt(s1.liabBook)}`, `Credit: purchasing company ${fmt(s1.consid)} and both totals of ${fmt(s1.assetsBook + s1.result)}`], modelAnswer: s1.realMd, explanation: "The profit is the balancing figure on the debit side." }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: s1.cashPay[0], wrong: [17500, r2(66000 + s1.result - s1.shareVal)], stem: "Calculate the cash paid to Sipho when his capital account is closed.", explanation: `Closing capital ${fmt(s1.closing[0])} − shares ${fmt(s1.shareVal)} − loan notes 26,000 = ${fmt(s1.cashPay[0])}; this is his own bank 2,500 plus 17,500 from the company.` }),
    ],
    hints: ["The bank balance is not transferred.", "Value the shares at 1.20 each."],
    explanation: "This item practises the realisation account of a sole trader taken over by a company.",
  });

  // --- Practice structured 2 (14 marks): partnership
  const s2 = vendorBooks({
    date: "31 Dec 2025", buyer: "Harare Fresh Ltd",
    partners: [{ name: "Tendai", share: 2, capital: 52000 }, { name: "Chipo", share: 1, capital: 31000 }],
    assets: [{ name: "Premises", book: 60000 }, { name: "Equipment", book: 22000 }, { name: "Inventory", book: 10000 }, { name: "Trade receivables", book: 6000 }],
    liabilities: [{ name: "Trade payables", book: 18000 }], bank0: 3000,
    consideration: { cash: 21800, shares: { n: 33000, price: 1.6 }, notes: 32400 },
  });
  chk(s2.netBook, 80000); chk(s2.consid, 107000); chk(s2.result, 27000); chk(s2.cashPay[0], 13200); chk(s2.cashPay[1], 11600);
  b.struct({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: `Tendai and Chipo run a fresh-produce business in Harare and share profits and losses 2 : 1. On 31 December 2025 they sell it to Harare Fresh Ltd. Capital balances: Tendai ${money(52000)}, Chipo ${money(31000)}. The company takes over premises (book value ${money(60000)}), equipment (${money(22000)}), inventory (${money(10000)}), trade receivables (${money(6000)}) and trade payables (${money(18000)}). The partners keep the bank balance of ${money(3000)}. The consideration is ${money(21800)} in cash, 33,000 ordinary shares of US\\$1 valued at US\\$1.60 each and ${money(32400)} of loan notes. Shares and loan notes are shared in the profit-sharing ratio.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: s2.result, wrong: [s2.consid - 98000, s2.consid - s2.netBook - 3000], stem: "Calculate the profit on realisation.", explanation: `Consideration 21,800 + ${fmt(s2.shareVal)} + 32,400 = ${fmt(s2.consid)}. Net assets 98,000 − 18,000 = 80,000. Profit ${fmt(s2.result)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: s2.resShare[0], wrong: [s2.resShare[1], r2(s2.result / 2)], stem: "Calculate Tendai's share of the profit.", explanation: `2/3 × ${fmt(s2.result)} = ${fmt(s2.resShare[0])}.` }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare the partners' capital accounts, showing the shares, loan notes and cash paid to each partner.", points: ["Balances b/d 52,000 and 31,000", `Profit shared ${fmt(s2.resShare[0])} and ${fmt(s2.resShare[1])}`, `Shares to the partners ${fmt(s2.shAlloc[0])} and ${fmt(s2.shAlloc[1])}`, `Loan notes to the partners ${fmt(s2.noteAlloc[0])} and ${fmt(s2.noteAlloc[1])}`, `Cash ${fmt(s2.cashPay[0])} and ${fmt(s2.cashPay[1])}`, `Both columns total ${fmt(s2.closing[0])} and ${fmt(s2.closing[1])} on each side`], modelAnswer: s2.capMd, explanation: "Cash is the balancing payment on each account." }),
      P.num({ label: "(d)", marks: 1, kind: "money", value: sum(s2.cashPay), wrong: [21800], stem: "Calculate the total cash paid out to the partners.", explanation: `${fmt(s2.cashPay[0])} + ${fmt(s2.cashPay[1])} = ${fmt(sum(s2.cashPay))}, which is the partners' own bank balance 3,000 plus 21,800 from the company.` }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why the partners' bank account ends with a nil balance after the final payments.", points: ["All the cash held (own bank plus cash from the buyer) is paid to the partners", "The capital accounts are closed, so nothing is owed to them"], modelAnswer: "All cash, the partners' own bank balance plus the cash from the buyer, is paid out to settle the capital accounts, so no balance is left.", explanation: "The bank balance equals the cash due to the partners." }),
    ],
    hints: ["Total the consideration first.", "Closing capital less shares less loan notes gives the cash."],
    explanation: "This item practises the closure of a partnership's books after a takeover.",
  });

  // --- Flashcards
  b.card("DEFINITION", "Vendor", "The seller of a business: the sole trader or the partners.");
  b.card("FORMULA", "Profit on takeover (vendor)", "Purchase consideration − book value of the net assets taken over.");
  b.card("FACT", "Assets taken over", "Debit realisation, credit the asset account, at book value.");
  b.card("FACT", "Liabilities taken over", "Debit the liability account, credit realisation.");
  b.card("FACT", "Purchase consideration", "Debit the purchasing company's account, credit realisation with the full price.");
  b.card("FACT", "Receipts from the buyer", "Debit bank (cash), investment in shares and loan notes; credit the purchasing company's account.");
  b.card("FACT", "Profit shared", "A partnership's profit on realisation is shared in the profit-sharing ratio and credited to the capital accounts.");
  b.card("CONCEPT", "Closing the capital accounts", "Transfer the shares and loan notes to the owners and pay the balance in cash; the bank account ends at nil.");
  b.card("CONCEPT", "Bank balance not taken over", "It stays with the vendor and is used for the final cash payment to the owners.");
});
