// W2b: partnership.dissolution
import { concept, P, money, fmt, chk, r2, sum, table } from "../lib.mjs";
import { mc, U, dissolve } from "../tables/w2b-lib.mjs";

concept("aacc.partnership.dissolution", { file: "partnership/dissolution", keyPrefix: "partnership.dissolution" }, (b) => {
  // --- MCQ
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which ledger account is opened to find the profit or loss when a partnership closes down and its assets are sold?",
    right: ["Realisation account", "Correct: it collects the assets, liabilities and cash from selling and settling them."],
    wrong: [["Appropriation account", "The appropriation account shares the profit of a trading year between partners."], ["Revaluation account", "The revaluation account is used when assets are revalued for a continuing business."], ["Suspense account", "A suspense account holds a trial balance difference and has no part in dissolution."]],
    explanation: "The realisation account is the temporary account in which the result of dissolving the firm is found.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "At what amount are the non-cash assets of a partnership transferred to the realisation account?",
    right: ["Their book (carrying) amounts", "Correct: the sale proceeds are credited separately, so the difference is the profit or loss."],
    wrong: [["The amounts they are expected to sell for", "Proceeds are credited to realisation when they are received."], ["The original cost, ignoring depreciation", "The accumulated depreciation is transferred as well, or the carrying amount is used."], ["The values agreed by the partners for the next year", "No next year exists; the firm is closing."]],
    explanation: "Assets leave their accounts at book value. Sale proceeds are then credited to the realisation account.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Farai, a partner, takes over the firm's computer at an agreed value. Which entry records this?",
    right: ["Debit Farai's capital account; credit realisation account", "Correct: Farai has received an asset in settlement of his capital."],
    wrong: [["Debit realisation account; credit Farai's capital account", "This is the reverse and would increase his capital."], ["Debit bank account; credit realisation account", "No cash is received when a partner takes over an asset."], ["Debit Farai's current account; credit bank account", "No cash is paid either."]],
    explanation: "The partner is treated as a buyer who pays by reducing his capital; realisation is credited with the agreed value.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "In which order is the cash of a dissolved partnership paid out?",
    right: ["Outside creditors, then loans from partners, then partners' capital", "Correct: outsiders and loans are liabilities; capital is the owners' stake."],
    wrong: [["Partners' capital, then loans from partners, then outside creditors", "Owners can only be paid after every liability has been settled."], ["Loans from partners, then partners' capital, then outside creditors", "Outside creditors are settled before any partner."], ["Outside creditors and partners' capital together, then loans from partners", "A loan from a partner is a liability and ranks before capital."]],
    hints: ["Think of who is owed money by the firm and who owns it."],
    explanation: "Creditors first, then partners' loans, then capital balances. The loan does not share in the loss on realisation.",
  });
  const m5 = { book: 5900, paid: 5450 };
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: `A supplier is owed ${money(m5.book)} by the partnership and accepts ${money(m5.paid)} in full settlement on dissolution. How does this affect the realisation account?`,
    right: [`Credited ${money(m5.book)} and debited ${money(m5.paid)}, so a gain of ${money(m5.book - m5.paid)} is included`, "Correct: the liability is transferred at book value; only the cash paid is debited."],
    wrong: [[`It is credited with ${money(m5.paid)} only, so no gain arises at all in the account`, "The full liability is transferred, so the saving shows."], [`It is debited with ${money(m5.book)} and credited with ${money(m5.paid)}, so a loss arises`, "This reverses the sides."], [`It is credited with ${money(m5.book - m5.paid)} as a discount allowed by the firm`, "A creditor's concession is a gain to the firm; the firm does not allow a discount."]],
    hints: ["Which amount is transferred, and which is paid?"],
    explanation: `Liability transferred 5,900 (credit); cash paid 5,450 (debit). The saving of 450 is part of the balance on the account.`,
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is the bank balance NOT transferred to the realisation account at the start of dissolution?",
    right: ["It is already cash and is needed to pay creditors and partners", "Correct: cash does not have to be realised."],
    wrong: [["It would be sold with the other assets", "Cash is not sold."], ["It belongs to the partner with the largest capital", "Cash belongs to the firm until it is distributed."], ["It is treated as a liability of the firm", "A positive bank balance is an asset."]],
    hints: ["What does 'realise' mean?"],
    explanation: "Realisation turns non-cash assets into cash. The existing bank balance is simply used up in the final payments.",
  });
  const lossSh = { loss: 30000, ratio: [3, 2, 1] };
  const defA = chk(5200 - (lossSh.loss * 2) / 6, -4800);
  const m7 = { a: 3600, c: 1200 };
  mc(b, {
    d: 4, skill: "APPLICATION", calculator: true,
    stem: `Nyasha, Farai and Chipo share profits and losses 3 : 2 : 1. After the loss on realisation of ${money(lossSh.loss)} has been shared, Farai's capital account has a debit balance of ${money(Math.abs(defA))} and he cannot pay it in. How much of this deficiency does Chipo bear?`,
    right: [money(m7.c), "Correct: Chipo's share of the other partners' ratio 3 : 1 is one quarter."],
    wrong: [[money(Math.abs(defA) / 6), "This uses 1 : 6 although Farai's own share has already been removed."], [money(Math.abs(defA) / 3), "This uses 1 : 3 instead of the ratio 3 : 1 of the two remaining partners."], [money(Math.abs(defA) / 2), "This divides equally, ignoring the profit-sharing ratio."]],
    hints: ["Only Nyasha and Chipo share the deficiency."],
    explanation: "Nyasha : Chipo is 3 : 1, so Chipo bears 1/4 × 4,800 = 1,200 and Nyasha 3,600.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "The expenses of closing the firm are paid by bank transfer. Which entry records them?",
    right: ["Debit realisation account; credit bank account", "Correct: the expense reduces the result on realisation."],
    wrong: [["Debit bank account; credit realisation account", "This would record cash received."], ["Debit partners' capital accounts; credit bank account", "Expenses go through realisation first so the result is shared in the profit ratio."], ["Debit expenses account; credit realisation account", "Realisation is debited, not credited."]],
    hints: ["Expenses of realisation reduce the profit."],
    explanation: "They are a cost of realising the assets, so they are debited to the realisation account.",
  });

  // --- True / false
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A loan from a partner to the firm is repaid before the partners' capital accounts are settled.",
    answer: true,
    explanation: "True. The loan is a liability of the firm; it does not take a share of the loss on realisation.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The balance on the realisation account is shared between the partners in the ratio of their capitals.",
    answer: false,
    explanation: "False. It is shared in the profit-sharing ratio unless the question states a different basis.",
  });

  // --- Matching
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each event on dissolution with its double entry.",
    pairs: [["A non-cash asset is transferred at book value", "Debit realisation; credit the asset account"], ["Cash received from selling an asset", "Debit bank; credit realisation"], ["A liability is transferred at book value", "Debit the liability account; credit realisation"], ["A loss on realisation is shared", "Debit partners' capital accounts; credit realisation"]],
    explanation: "Assets and cash paid out are debits to realisation; liabilities and cash received are credits. A loss is a debit to the partners' capital.",
  });

  // --- Fill in the blank
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statements about the realisation account.",
    template: "Assets are transferred at {{blank:a}} value. A profit on realisation is {{blank:b}} to the partners' capital accounts. The account is closed by sharing the balance in the {{blank:c}} ratio.",
    blanks: [
      { id: "a", accepted: ["book"], choices: ["book", "market", "agreed future"] },
      { id: "b", accepted: ["credited"], choices: ["credited", "debited", "ignored"] },
      { id: "c", accepted: ["profit-sharing"], choices: ["profit-sharing", "capital", "drawings"] },
    ],
    explanation: "Book value on transfer; a profit increases capital (credit); sharing is by the profit-sharing ratio.",
  });

  // --- Numerical / calculations
  const a1 = { book: 58000, procs: 49500, liab: 16000, paid: 15400, exp: 900 };
  const loss1 = chk(a1.book + a1.paid + a1.exp - a1.liab - a1.procs, 8800);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: loss1, wrong: [a1.book - a1.procs, r2(a1.book + a1.paid - a1.liab - a1.procs)],
    stem: `Tatenda and Chipo dissolve their poultry partnership. Non-cash assets with a book value of ${money(a1.book)} were sold for ${money(a1.procs)}. Liabilities of ${money(a1.liab)} were settled for ${money(a1.paid)}. Expenses of realisation were ${money(a1.exp)}. Calculate the loss on realisation.`,
    hints: ["Debits: assets, cash paid to creditors and expenses.", "Credits: liabilities and proceeds."],
    explanation: "Debit side 58,000 + 15,400 + 900 = 74,300. Credit side 16,000 + 49,500 = 65,500. Loss = 74,300 − 65,500 = 8,800. Leaving out the cash paid to creditors and the expenses gives 8,500.",
  });
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", daily: true,
    value: 450, wrong: [6850, 7300],
    stem: "A creditor is owed US\\$7,300 and accepts US\\$6,850 in full settlement on dissolution. What is the gain to the firm?",
    explanation: "7,300 − 6,850 = 450.",
  });
  const c3 = { capital: 31000, loss: 12600, taken: 4500 };
  const fin3 = chk(c3.capital - c3.loss - c3.taken, 13900);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: fin3, wrong: [c3.capital - c3.loss, c3.capital - c3.taken, c3.capital + c3.loss - c3.taken],
    stem: `Rudo's capital account has a credit balance of ${money(c3.capital)}. Her share of the loss on realisation is ${money(c3.loss)} and she takes over equipment at an agreed ${money(c3.taken)}. How much does she receive in the final cash payment?`,
    hints: ["Both the loss and the asset reduce what is paid to her."],
    explanation: "31,000 − 12,600 − 4,500 = 13,900. Forgetting the asset taken over gives 18,400.",
  });
  b.num({
    d: 4, skill: "APPLICATION", kind: "money", calculator: true,
    value: 3600, wrong: [4800, 1200, 2400],
    stem: "Nyasha, Farai and Chipo share profits and losses 3 : 2 : 1. Farai's capital account has a debit balance of US\\$4,800 after sharing the loss and he cannot pay. Calculate Nyasha's share of the deficiency.",
    hints: ["Exclude Farai; the others share in the ratio 3 : 1."],
    explanation: "3/(3+1) × 4,800 = 3,600.",
  });

  // --- Short answer
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the account in which the final payments to the partners are recorded as a credit to the bank.",
    accepted: ["capital account", "partners' capital account", "partners capital accounts", "capital accounts", "capital"],
    explanation: "Each partner's capital account is debited and bank is credited with the final payment.",
  });

  // --- Self-marked short answers
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why outside creditors are paid before any cash is paid to the partners on dissolution.",
    points: ["Creditors are liabilities, which the firm must settle in full where it can", "Partners are the owners, so their capital is what is left after all liabilities are paid", "Paying partners first could leave the firm unable to meet its debts"],
    modelAnswer: "Creditors are owed money by the firm, so their claims rank first. The partners own what is left after all liabilities are settled, so capital is paid last. Paying partners first could leave debts unpaid.",
    hints: ["Think about who has the stronger claim."],
    explanation: "One mark each for the status of creditors, the residual nature of capital and the risk of unpaid debts.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how a partner's loan to the firm is treated differently from the partner's capital on dissolution.",
    points: ["The loan is a liability of the firm and is repaid in full", "It is paid before the partners' capital accounts are settled", "It does not share in the loss on realisation"],
    modelAnswer: "A partner's loan is a liability, so it is repaid in full before the capital accounts are settled. Unlike capital, it does not bear a share of the loss on realisation.",
    hints: ["A lender is not an owner."],
    explanation: "A loan ranks with other liabilities; capital is the residual claim.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A partner who has a deficiency says: \"Since I cannot pay, the other partners should not be asked to carry my debt.\" Evaluate this view.",
    points: ["The deficiency is a real loss to the firm; someone must bear it", "Unless the partner pays, the others share it in the profit-sharing ratio", "The partner remains personally liable and the others may claim the amount later", "Conclusion: the view is not justified; the deficiency does not disappear, it moves to the others"],
    modelAnswer: "The deficiency is a real loss because the firm cannot repay its owners more than it has. If the partner cannot pay, the other partners bear it in the profit-sharing ratio, although they may claim it from him later. The view is therefore not justified: the debt moves to the others and does not disappear.",
    hints: ["Where does the shortfall go if nobody pays it?"],
    explanation: "A balanced answer says who bears the loss and recognises the claim on the deficient partner.",
  });

  // --- Practice structured 1 (12 marks): two partners, asset taken over
  const s1 = dissolve({
    date: "30 Sep 2025",
    partners: [{ name: "Thandeka", share: 2, capital: 35000 }, { name: "Sipho", share: 1, capital: 21200 }],
    assets: [
      { name: "Equipment", book: 32000, proceeds: 26500 },
      { name: "Vehicle", book: 16000, takenBy: "Sipho", value: 13500 },
      { name: "Inventory", book: 7200, proceeds: 5600 },
      { name: "Trade receivables", book: 6900, proceeds: 6450 },
    ],
    liabilities: [{ name: "Trade payables", book: 8300, paid: 8000 }], bank0: 2400, expenses: 750,
  });
  chk(s1.result, -10500); chk(s1.final[0], 28000); chk(s1.final[1], 4200);
  const s1proc = 26500 + 5600 + 6450;
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Thandeka and Sipho run a bakery in Mutare and share profits and losses 2 : 1. They dissolve the partnership on 30 September 2025. Their capital balances are Thandeka ${money(35000)} and Sipho ${money(21200)}. The firm has equipment (book value 32,000), a vehicle (16,000), inventory (7,200) and trade receivables (6,900), a bank balance of ${money(2400)} and trade payables of ${money(8300)}. Equipment sold for ${money(26500)}, inventory for ${money(5600)} and the trade receivables paid ${money(6450)}. Sipho took over the vehicle at an agreed ${money(13500)}. Trade payables were settled for ${money(8000)} and the expenses of realisation were ${money(750)}.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: Math.abs(s1.result), wrong: [r2(s1.assetsBook - s1proc - 13500)], stem: "Calculate the loss on realisation.", explanation: `Debits: assets ${fmt(s1.assetsBook)} + payables paid ${fmt(s1.paid)} + expenses 750 = ${fmt(s1.assetsBook + s1.paid + 750)}. Credits: payables ${fmt(s1.liabBook)} + proceeds ${fmt(s1.proceeds)} + vehicle 13,500 = ${fmt(s1.liabBook + s1.proceeds + 13500)}. Loss ${fmt(Math.abs(s1.result))}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: Math.abs(s1.resShare[0]), wrong: [Math.abs(s1.resShare[1]), r2(Math.abs(s1.result) / 2)], stem: "Calculate Thandeka's share of the loss.", explanation: `2/3 × ${fmt(Math.abs(s1.result))} = ${fmt(Math.abs(s1.resShare[0]))}.` }),
      P.manual({ label: "(c)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the realisation account.", points: [`Debit: assets transferred ${fmt(s1.assetsBook)}`, "Debit: bank for payables settled 8,000 and expenses 750", `Credit: payables transferred 8,300 and proceeds ${fmt(s1.proceeds)}`, "Credit: Sipho's capital for the vehicle 13,500", `Credit: loss shared to the capital accounts (${fmt(Math.abs(s1.resShare[0]))} and ${fmt(Math.abs(s1.resShare[1]))}) and totals of ${fmt(s1.assetsBook + s1.paid + 750)}`], modelAnswer: s1.realMd, explanation: "The loss is the balancing figure on the credit side." }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: s1.final[1], wrong: [r2(21200 - Math.abs(s1.resShare[1])), r2(21200 - 13500)], stem: "Calculate the final cash payment to Sipho.", explanation: `21,200 − loss ${fmt(Math.abs(s1.resShare[1]))} − vehicle 13,500 = ${fmt(s1.final[1])}.` }),
    ],
    hints: ["Do not transfer the bank balance.", "Sipho's capital is reduced by both the loss and the vehicle."],
    explanation: "This item practises a realisation account with an asset taken over and a creditor settled at a discount.",
  });

  // --- Practice structured 2 (16 marks): deficiency partly paid in
  const s2 = dissolve({
    date: "31 Mar 2026",
    partners: [{ name: "Tatenda", share: 3, capital: 35650 }, { name: "Nyasha", share: 2, capital: 5400 }],
    assets: [
      { name: "Premises", book: 44000, proceeds: 31000 },
      { name: "Inventory", book: 11000, proceeds: 6150 },
      { name: "Trade receivables", book: 7400, proceeds: 6650 },
    ],
    liabilities: [{ name: "Trade payables", book: 22600, paid: 22600 }], bank0: 1250, expenses: 900, payIn: { Nyasha: 1300 },
  });
  chk(s2.result, -19500); chk(s2.defic[1], 1100); chk(s2.final[0], 22850);
  b.struct({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: `Tatenda and Nyasha own a hardware shop in Masvingo and share profits and losses 3 : 2. They dissolve the partnership on 31 March 2026. Capital balances: Tatenda ${money(35650)}, Nyasha ${money(5400)}. The firm has premises (book value 44,000), inventory (11,000), trade receivables (7,400), a bank balance of ${money(1250)} and trade payables of ${money(22600)}. The premises sold for ${money(31000)}, the inventory for ${money(6150)} and the receivables paid ${money(6650)}. Payables were paid in full and expenses of realisation were ${money(900)}. Nyasha pays ${money(1300)} into the bank towards any amount she owes; the rest of any deficiency cannot be recovered.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: Math.abs(s2.result), wrong: [r2(62400 - 43800)], stem: "Calculate the loss on realisation.", explanation: "Debits 62,400 + 22,600 + 900 = 85,900. Credits 22,600 + 43,800 = 66,400. Loss 19,500." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: Math.abs(s2.resShare[1]), wrong: [Math.abs(s2.resShare[0])], stem: "Calculate Nyasha's share of the loss.", explanation: "2/5 × 19,500 = 7,800." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: s2.defic[1], wrong: [r2(7800 - 5400), 7800], stem: "Calculate the deficiency on Nyasha's capital account after her payment of 1,300.", explanation: "5,400 − 7,800 + 1,300 = −1,100; the deficiency is 1,100." }),
      P.manual({ label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare the partners' capital accounts, ending with the final payment to Tatenda.", points: ["Balances b/d 35,650 and 5,400", "Loss shared 11,700 and 7,800", "Nyasha's cash paid in 1,300", "Nyasha's deficiency of 1,100 transferred to Tatenda", "Tatenda's final payment 22,850 (own figure)", "Columns total correctly: Tatenda 35,650; Nyasha 6,700"], modelAnswer: s2.capMd, explanation: "Nyasha's account closes at nil; Tatenda bears the deficiency." }),
      P.mcq({ label: "(e)", marks: 1, stem: "Who bears Nyasha's remaining deficiency?", options: [["Tatenda", "Correct: she is the only other partner."], ["The trade payables", "Payables were paid in full."], ["Nobody; it is written off to the bank", "A shortfall cannot be written off against cash."], ["The realisation account", "Realisation was closed before the deficiency arose."]], answer: "A", explanation: "With two partners, the other partner bears the whole remaining deficiency." }),
      P.manual({ label: "(f)", marks: 2, stem: "Advise Tatenda on one action he could take after the dissolution.", points: ["He can claim the unpaid amount of 1,100 from Nyasha, who remains personally liable", "He should record the claim and seek payment (or agree a payment plan in writing)"], modelAnswer: `Tatenda can claim the ${money(1100)} from Nyasha, who remains personally liable for the debt, and should agree a written payment plan.`, explanation: "The deficiency is a debt owed by the partner to the others." }),
    ],
    hints: ["Add Nyasha's cash to her capital before finding the deficiency.", "Tatenda is the only partner to absorb it."],
    explanation: "This item practises a deficiency partly paid in cash and the rest borne by the other partner.",
  });

  // --- Flashcards
  b.card("DEFINITION", "Realisation account", "A temporary account that collects the non-cash assets and the liabilities of a firm being closed, with the cash from selling and settling them; its balance is the profit or loss on realisation.");
  b.card("FACT", "Transfer values on dissolution", "Non-cash assets and liabilities are transferred to the realisation account at book value. The bank balance is not transferred.");
  b.card("FACT", "Asset taken over by a partner", "Debit the partner's capital account; credit realisation with the agreed value. No cash moves.");
  b.card("FACT", "Profit or loss on realisation", "Shared in the profit-sharing ratio: a profit is credited to capital accounts, a loss is debited.");
  b.card("CONCEPT", "Order of payment", "Outside creditors first, then loans from partners, then the partners' capital accounts.");
  b.card("DEFINITION", "Deficiency of a partner", "A debit balance on a partner's capital account after sharing the loss; the partner pays it in, or the others bear it in the profit-sharing ratio.");
  b.card("FACT", "Creditor accepts less than the book amount", "Realisation is credited with the full liability and debited with the cash paid; the gain is part of the balance.");
  b.card("FACT", "Check at the end", "The bank account must close at nil after the final payments to the partners.");
  b.card("CONCEPT", "Not examined", "Piecemeal realisation and the rule in Garner v Murray are not set.");
});
