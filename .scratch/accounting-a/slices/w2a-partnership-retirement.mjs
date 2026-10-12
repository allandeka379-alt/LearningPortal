// W2a: partnership.retirement
import { concept, P, table, r2, fmt, money, chk, check, sum, goodwill } from "../lib.mjs";
import { mc, colLedger } from "../tables/w2a-lib.mjs";

concept("aacc.partnership.retirement", { file: "partnership/retirement", keyPrefix: "partnership.retirement" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which items make up the amount due to a retiring partner?",
    ok: ["Capital and current accounts, shares of revaluation and goodwill, less drawings", "Correct: all entitlements to the date of retirement."],
    bad: [["The capital account balance only, with no share of goodwill or revaluation added", "Goodwill and revaluation shares must be added."], ["Share of profit for the year only", "The capital and current balances are also due."], ["Drawings to date only", "Drawings are deducted from what is due, not the amount due itself."]],
    explanation: "The retiring partner is entitled to his capital and current account, plus a share of goodwill and revaluation gains, and profit and interest to date, less drawings.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of the following can settle the balance due to a retiring partner?",
    ok: ["Cash, a transfer to a loan account, or a private purchase by the other partners", "Correct: all three are used."],
    bad: [["Only payment in cash from the business bank account, with no loan", "Loans and private purchases are also used."], ["Only transfer to the partners' current accounts", "That does not settle the retiring partner."], ["Only writing off the balance to goodwill", "The balance must be paid or converted to a liability."]],
    explanation: "A balance may be paid, converted into a loan account or bought by the continuing partners.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A, B and C share profits 4 : 3 : 3. C retires and A and B will share equally. What is the gaining ratio between A and B?",
    ok: ["1 : 2", "Correct: A gains 1/10 and B gains 2/10."],
    bad: [["1 : 1", "Their new shares are equal, but their gains are not."], ["4 : 3", "That is their old ratio."], ["2 : 1", "The gains are in the reverse order."]],
    hints: ["Gain = new share - old share."],
    explanation: "A: 1/2 - 4/10 = 1/10; B: 1/2 - 3/10 = 2/10; ratio 1 : 2.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "When goodwill is eliminated on the retirement of a partner, it is debited to the:",
    ok: ["continuing partners' capital accounts in their new ratio", "Correct: they will enjoy the future profits."],
    bad: [["all partners' capital accounts in the old ratio", "The retiring partner is not charged."], ["retiring partner's capital account", "He keeps his share of the goodwill."], ["revaluation account", "Goodwill is not a revaluation item."]],
    hints: ["Who remains in the business?"],
    explanation: "The continuing partners bear the cost in their new ratio.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "On the death of a partner, the amount due to his estate is shown in the books as a:",
    ok: ["liability of the firm", "Correct: the estate is a creditor until it is paid or becomes a loan."],
    bad: [["partner's capital account", "The deceased partner's capital is closed."], ["revaluation gain", "It is a payable, not a gain."], ["part of the goodwill", "Goodwill is only one component."]],
    explanation: "The estate is entitled to the amount due and is treated as a creditor.",
  });
  const cap = 38000;
  const rv = 2400;
  const gwS = 5000;
  const dr = 1200;
  const due = r2(cap + rv + gwS - dr);
  chk(due, 44200);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A retiring partner has a capital account of ${money(cap)}, a share of revaluation profit of ${money(rv)}, a share of goodwill of ${money(gwS)} and drawings of ${money(dr)} charged to date. What is the amount due to him?`,
    ok: [money(due), "Correct: 38,000 + 2,400 + 5,000 - 1,200."],
    bad: [[money(r2(cap + rv + gwS + dr)), "Drawings have been added instead of deducted."], [money(r2(cap + rv - dr)), "The share of goodwill has been omitted."], [money(r2(cap - dr)), "The shares of revaluation and goodwill have been omitted."]],
    hints: ["Drawings reduce what is due."],
    explanation: "Amount due = 38,000 + 2,400 + 5,000 - 1,200 = 44,200.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A retiring partner's balance of US\\$30,000 is converted to a loan. What is the effect on the statement of financial position?",
    ok: ["Capital falls and non-current liabilities rise by US\\$30,000; assets are unchanged", "Correct: the amount moves from equity to a liability."],
    bad: [["Total assets fall by US\\$30,000 because cash is paid out of the bank", "No cash leaves the business."], ["Capital rises by US\\$30,000", "Capital falls when the retiring partner's account is closed."], ["Current liabilities rise and capital is unchanged", "The balance leaves capital."]],
    hints: ["Does any cash change hands?"],
    explanation: "A loan converts equity into a liability without changing total assets.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "The continuing partners buy a retiring partner's share privately. What is the effect on the business's bank account?",
    ok: ["No effect, because the payment is made from their own money", "Correct: the business's cash is not used."],
    bad: [["It falls by the price paid", "The price is paid privately, not by the business."], ["It rises by the price paid", "The business receives nothing."], ["It falls by the retiring partner's capital balance", "The business pays nothing in this method."]],
    hints: ["Who pays the retiring partner?"],
    explanation: "The retiring partner's capital account is debited and the buyers' accounts credited; the firm's bank is unchanged.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A retiring partner shares in the revaluation profit in the old profit-sharing ratio.", answer: true, explanation: "True. The gain arose while he was a partner." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "On retirement, goodwill is eliminated by debiting all partners including the retiring partner.", answer: false, hints: ["Who will share future profits?"], explanation: "False. Only the continuing partners are debited, in their new ratio." });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each way of settling a retiring partner to its effect on the firm.",
    pairs: ["Payment in cash", "Transfer to a loan account", "Purchase by the continuing partners", "Death of a partner"],
    right: ["Bank balance falls", "Liability created, bank unchanged", "No cash from the firm, capital accounts adjusted", "Amount owed to the estate"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Each method changes different accounts.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence.",
    template: "The gaining ratio is each continuing partner's {{blank:a}} share less his {{blank:b}} share.",
    blanks: [
      { id: "a", accepted: ["new"], choices: ["new", "old"] },
      { id: "b", accepted: ["old"], choices: ["new", "old"] },
    ],
    explanation: "Gaining ratio = new share - old share.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the account to which a retiring partner's unpaid balance may be transferred so that it becomes a liability of the firm.",
    accepted: ["loan account", "loan", "the loan account", "loan from partner"],
    explanation: "A loan account shows the unpaid balance as a liability.",
  });

  const g1 = 42000;
  const share1 = r2(g1 / 7);
  chk(share1, 6000);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: share1, daily: true, calculator: true, wrong: [r2(g1 / 3), r2(g1 / 6)],
    stem: `Three partners share profits 4 : 2 : 1. Goodwill is valued at ${money(g1)}. Calculate the retiring partner's share of goodwill if he has the 1/7 share.`,
    explanation: "1/7 × 42,000 = 6,000.",
  });
  const due2 = r2(46500 + 3100 + 7200 - 1850);
  chk(due2, 54950);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: due2, calculator: true, wrong: [r2(46500 + 3100 + 7200 + 1850), r2(46500 + 3100 - 1850)],
    stem: `A retiring partner has capital of ${money(46500)}, a share of revaluation profit of ${money(3100)}, a share of goodwill of ${money(7200)} and drawings of ${money(1850)}. Calculate the amount due to him.`,
    hints: ["Add the entitlements and deduct drawings."],
    explanation: "46,500 + 3,100 + 7,200 - 1,850 = 54,950.",
  });
  const loan2 = r2(due2 - 25000);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: loan2, calculator: true, wrong: [due2, 25000],
    stem: `The amount due to a retiring partner is ${money(due2)}. The business pays ${money(25000)} in cash and the balance is transferred to a loan account. Calculate the balance of the loan account.`,
    hints: ["Loan = amount due - cash paid."],
    explanation: "54,950 - 25,000 = 29,950.",
  });
  const gs = goodwill.gainSacrifice([5, 3, 2], [3, 2, 0]);
  const gainA = r2(gs[0] * 60000);
  chk(gs[0], 0.1, 1e-9);
  chk(gainA, 6000);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: gainA, calculator: true, wrong: [30000, 36000],
    stem: `A, B and C share profits 5 : 3 : 2. C retires and A and B will share profits 3 : 2. Goodwill is valued at ${money(60000)} and is not kept in the books. Calculate the net amount by which A's capital account is reduced as a result of the goodwill entries.`,
    hints: ["A is credited 5/10 and debited 3/5."],
    explanation: "A is credited with 5/10 × 60,000 = 30,000 and debited with 3/5 × 60,000 = 36,000, a net charge of 6,000.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a retiring partner may agree to accept part of the amount due as a loan.",
    points: ["The business may not have enough cash to pay the whole amount at once", "A loan lets the business repay over time and keep its working capital, and the retiring partner earns interest"],
    modelAnswer: "Paying everything at once could leave the business without cash. A loan allows repayment in instalments, and the retiring partner earns interest meanwhile.",
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why goodwill is created for all the old partners but eliminated only among the continuing partners.",
    points: ["All the old partners helped to build the goodwill, so all are credited in the old ratio", "The retiring partner leaves with his share, so he is not charged", "The continuing partners will enjoy the future profits, so they bear the cost in their new ratio"],
    modelAnswer: "All the old partners built the goodwill, so all are credited. The retiring partner is paid for his share and leaves, so only the continuing partners, who will benefit from future profits, are charged.",
    hints: ["Who built it, and who will benefit?"],
    explanation: "One mark each.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Chipo is retiring and wants to be paid in full immediately, but this would take all of the business's cash. Evaluate the options for the remaining partners and advise them.",
    points: ["Paying in cash satisfies Chipo but leaves the business unable to pay creditors or expenses", "A loan account preserves cash and spreads the repayment, and Chipo may accept interest", "A private purchase by the continuing partners avoids using business cash but requires their own funds or a bank loan", "Advice: agree part cash, part loan with interest, so the business keeps enough working capital"],
    modelAnswer: "Paying everything in cash would drain the business. A loan account keeps cash in the business and Chipo can earn interest, while a private purchase uses the partners' own funds. A mixture of cash and a loan is best.",
    hints: ["Think of working capital."],
    explanation: "One mark each for three options and a justified recommendation.",
  });

  // Structured 1 (10 marks): goodwill only
  const gC = 30000;
  const capC = 18000;
  const capA = 52000;
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Nyasha, Farai and Chipo share profits 2 : 2 : 1. Chipo retires and the partners agree that goodwill is ${money(gC)}, which is not to remain in the books. Nyasha and Farai will share profits equally. Chipo's capital account is ${money(capC)} and Nyasha's is ${money(capA)}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: r2(gC / 5), wrong: [r2(gC / 2), gC], stem: "Calculate Chipo's share of the goodwill.", explanation: "1/5 × 30,000 = 6,000." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: r2(capC + gC / 5), wrong: [capC, r2(capC - gC / 5)], stem: "Calculate the amount due to Chipo.", explanation: "18,000 + 6,000 = 24,000." }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: r2(gC / 2), wrong: [r2((gC * 2) / 5), r2(gC / 3)], stem: "Calculate the goodwill debited to Nyasha when it is eliminated.", explanation: "Nyasha has 1/2 of the new ratio: 1/2 × 30,000 = 15,000." }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: r2(capA + (gC * 2) / 5 - gC / 2), wrong: [r2(capA - gC / 2), r2(capA + gC / 2)], stem: "Calculate Nyasha's capital after the goodwill entries.", explanation: "Credited 2/5 × 30,000 = 12,000 and debited 15,000; 52,000 + 12,000 - 15,000 = 49,000." }),
    ],
    hints: ["Goodwill is created in the old ratio 2 : 2 : 1.", "It is eliminated in the new ratio 1 : 1."],
    explanation: "This item tests goodwill on the retirement of a partner.",
  });

  // Structured 2 (16 marks): full retirement
  const bf = { land: 140000, vehicles: 38000, inventory: 27300, receivables: 19900, bank: 24600, payables: 21800, D: 110000, S: 76000, N: 42000 };
  const aB = sum([bf.land, bf.vehicles, bf.inventory, bf.receivables, bf.bank]);
  check("S2 before", aB, bf.payables + bf.D + bf.S + bf.N);
  const G = r2(12000 - 4500 - 1500);
  const gwv = 40000;
  const cash = 21500;
  const dueN = r2(bf.N + G / 8 + gwv / 8);
  chk(dueN, 47750);
  const loan = r2(dueN - cash);
  const led = colLedger(
    "Partners' capital accounts",
    ["Dube", "Sibanda", "Ncube"],
    [["Goodwill eliminated (3 : 2)", r2((gwv * 3) / 5), r2((gwv * 2) / 5), null], ["Bank (cash paid)", null, null, cash], ["Loan account", null, null, loan]],
    [["Balance b/d", bf.D, bf.S, bf.N], ["Revaluation profit (4 : 3 : 1)", r2(G / 2), r2((G * 3) / 8), r2(G / 8)], ["Goodwill created (4 : 3 : 1)", r2(gwv / 2), r2((gwv * 3) / 8), r2(gwv / 8)]],
  );
  chk(led.closing[0], 109000);
  chk(led.closing[1], 77250);
  const aA = r2(aB + G - cash);
  check("S2 after", aA, bf.payables + loan + led.closing[0] + led.closing[1]);
  b.struct({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: `Dube, Sibanda and Ncube share profits 4 : 3 : 1. Ncube retires on 31 December 2026 and Dube and Sibanda will share profits 3 : 2. Before retirement the statement of financial position shows land ${money(bf.land)}, vehicles ${money(bf.vehicles)}, inventory ${money(bf.inventory)}, trade receivables ${money(bf.receivables)}, bank ${money(bf.bank)}, trade payables ${money(bf.payables)} and capital accounts of ${money(bf.D)} (Dube), ${money(bf.S)} (Sibanda) and ${money(bf.N)} (Ncube). Land is revalued to ${money(152000)}, vehicles to ${money(33500)} and inventory to ${money(25800)}. Goodwill is valued at ${money(gwv)} and is not kept in the books. Ncube is paid ${money(cash)} in cash and the balance is transferred to a loan account.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: dueN, wrong: [bf.N, r2(bf.N + gwv / 8)], stem: "Calculate the total amount due to Ncube.", explanation: "42,000 + 1/8 × 6,000 revaluation profit (750) + 1/8 × 40,000 goodwill (5,000) = 47,750." }),
      P.mcq({ label: "(b)", marks: 2, stem: "What is the gaining ratio of Dube to Sibanda?", options: [["4 : 1", "Correct: Dube gains 1/10 and Sibanda 1/40."], ["3 : 2", "That is their new profit-sharing ratio."], ["4 : 3", "That is their old ratio."], ["1 : 1", "Their gains are not equal."]], answer: "A", explanation: "Dube: 3/5 - 1/2 = 1/10 = 4/40; Sibanda: 2/5 - 3/8 = 1/40. Ratio 4 : 1." }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: led.closing[0], wrong: [r2(bf.D + 3000 + 20000), r2(bf.D + 3000)], stem: "Calculate Dube's capital after the retirement.", explanation: "110,000 + 3,000 + 20,000 - 24,000 = 109,000." }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: aA, wrong: [r2(aB - cash), r2(aB + G)], stem: "Calculate total assets after the retirement.", explanation: `${fmt(aB)} + revaluation profit ${fmt(G)} - cash paid ${fmt(cash)} = ${fmt(aA)}.` }),
      P.manual({ label: "(e)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Write up the partners' capital accounts.", points: ["Opening balances and revaluation profit credited 4 : 3 : 1", "Goodwill created 4 : 3 : 1 and eliminated 3 : 2 in the continuing partners' accounts only", "Ncube's account closed by cash and the transfer to the loan account", "Balances for Dube and Sibanda carried down correctly"], modelAnswer: led.md, explanation: "One mark per point; follow-through allowed." }),
      P.manual({ label: "(f)", marks: 2, stem: "Explain the effect of transferring part of the amount due to a loan account.", points: ["Capital falls and a non-current liability of the loan amount arises; total assets are unchanged by this transfer", "The business keeps cash that it would otherwise have paid out"], modelAnswer: `Ncube's balance of US\\$${fmt(loan)} moves from equity to a liability, so capital falls and liabilities rise by the same amount. The business keeps that cash.`, explanation: "One mark for each point." }),
    ],
    hints: ["Revalue first; goodwill in the old ratio then the new ratio for the continuing partners.", "Amount due = capital + revaluation share + goodwill share."],
    explanation: "This item tests a retirement with revaluation, goodwill, cash and a loan.",
  });
  void table;

  b.card("FORMULA", "Amount due to a retiring partner", "Capital + current account + share of revaluation profit + share of goodwill + profit and interest to date - drawings.");
  b.card("FORMULA", "Gaining ratio", "New share - old share for each continuing partner; the gains total the retiring partner's old share.");
  b.card("FACT", "Goodwill on retirement", "Created for all old partners in the old ratio; eliminated among the continuing partners in the new ratio.");
  b.card("FACT", "Ways to settle a retiring partner", "Cash from the business, transfer to a loan account, or private purchase by the continuing partners.");
  b.card("FACT", "Effect of a loan account", "Capital falls and a liability rises; total assets are unchanged.");
  b.card("FACT", "Death of a partner", "Same method as retirement; the amount due is credited to the estate, a creditor of the firm.");
  b.card("FACT", "Private purchase by continuing partners", "Debit the retiring partner's capital; credit the buyers' capital in the proportion bought; no cash from the firm.");
  b.card("CONCEPT", "Why is the revaluation shared in the old ratio?", "The gain or loss arose while the old partners owned the business, including the one retiring.");
  b.card("FACT", "Profit to date of retirement", "Time-apportion the year's profit and credit the retiring partner's share, with interest and salary to that date.");
});
