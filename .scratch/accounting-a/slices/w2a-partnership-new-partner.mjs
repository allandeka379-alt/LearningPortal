// W2a: partnership.new-partner
import { concept, P, table, r2, fmt, money, chk, check, sum, goodwill, journal } from "../lib.mjs";
import { mc, colLedger, tAcct } from "../tables/w2a-lib.mjs";

concept("aacc.partnership.new-partner", { file: "partnership/new-partner", keyPrefix: "partnership.new-partner" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "A premium paid by a new partner for a share of goodwill is credited to the capital accounts of the:",
    ok: ["partners who sacrifice part of their profit share", "Correct: they are compensated in the sacrificing ratio."],
    bad: [["new partner", "The new partner paid the premium; he does not receive it."], ["all partners in the new ratio", "The new ratio does not reflect who gave up profit."], ["partners in proportion to their capital", "Capital balances are not the basis."]],
    explanation: "The premium compensates the partners who give up part of their profit shares, in the sacrificing ratio.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of the following is a reason for admitting a new partner?",
    ok: ["To raise additional capital or bring in new skills", "Correct: both are common reasons."],
    bad: [["To reduce the number of owners", "Admitting a partner increases the number of owners."], ["To avoid the need to keep accounts", "A partnership with more partners still needs accounts."], ["To remove the need for a partnership agreement", "A change normally requires a new agreement."]],
    explanation: "A business may need more capital, new skills or relief for existing partners.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION",
    stem: "A new partner pays US\\$25,000 into the business bank account as capital, with no premium. What is the entry?",
    ok: ["Debit bank; credit the new partner's capital account", "Correct: assets and capital both increase."],
    bad: [["Debit the new partner's capital account; credit bank", "That would be a withdrawal."], ["Debit bank; credit the old partners' capital accounts", "With no premium the old partners' capital is not credited."], ["Debit goodwill; credit bank", "Goodwill is not involved when no premium is paid."]],
    explanation: "Cash introduced as capital increases bank and the new partner's capital.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Partners A and B share profits 3 : 1 and admit C. The new ratio is A 2 : B 1 : C 1. Who sacrifices part of their profit share?",
    ok: ["A only", "Correct: A's share falls from 3/4 to 1/2; B's share stays at 1/4."],
    bad: [["B only", "B's share is 1/4 before and after."], ["Both partners equally", "B gives up nothing."], ["C only", "C is the partner who gains a share."]],
    hints: ["Compare each old and new share."],
    explanation: "A: 3/4 - 1/2 = 1/4 sacrificed; B: 1/4 - 1/4 = nil.",
  });
  const gwv = 56000;
  const prem = r2(gwv / 4);
  chk(prem, 14000);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Goodwill is valued at ${money(gwv)}. A new partner takes a one-quarter share of profits and pays a premium for it. What is the premium?`,
    ok: [money(prem), "Correct: 1/4 × 56,000."],
    bad: [[money(gwv), "The whole goodwill is not paid for."], [money(r2(gwv / 2)), "Half of the goodwill has been used."], [money(r2(gwv * 3 / 4)), "That is the old partners' share, not the new partner's."]],
    hints: ["The new partner buys only his share of goodwill."],
    explanation: "Premium = 1/4 × 56,000 = 14,000.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A and B share profits 5 : 3. They admit C. The new ratio is A 2 : B 1 : C 1. In what ratio is the premium for goodwill shared between A and B?",
    ok: ["1 : 1", "Correct: each sacrifices 1/8."],
    bad: [["5 : 3", "The old ratio is not the sacrificing ratio."], ["2 : 1", "The new ratio is not the sacrificing ratio."], ["3 : 5", "The sacrifices are equal, not reversed."]],
    hints: ["A: 5/8 - 1/2; B: 3/8 - 1/4."],
    explanation: "A sacrifices 5/8 - 4/8 = 1/8; B sacrifices 3/8 - 2/8 = 1/8, so the sacrificing ratio is 1 : 1.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A new partner introduces US\\$30,000 in cash and the assets are revalued upwards by US\\$9,000. By how much do total assets increase?",
    ok: ["US\\$39,000", "Correct: cash introduced plus the revaluation gain."],
    bad: [["US\\$30,000", "The revaluation also increases assets."], ["US\\$9,000", "The cash introduced also increases assets."], ["US\\$21,000", "The gain has been deducted instead of added."]],
    hints: ["Both items increase assets."],
    explanation: "Assets rise by 30,000 (bank) and 9,000 (revalued assets).",
  });
  mc(b, {
    d: 4, skill: "APPLICATION", calculator: true,
    stem: "A new partner's capital is US\\$25,000 and represents his one-fifth profit share. The two old partners share the other four-fifths equally and want their capital in proportion to profit shares. What capital should each old partner have?",
    ok: ["US\\$50,000", "Correct: total capital 125,000; 2/5 each."],
    bad: [["US\\$25,000", "That is the new partner's capital only."], ["US\\$100,000", "That is the combined capital of both old partners."], ["US\\$62,500", "That divides the total capital equally among two."]],
    hints: ["Total capital = 25,000 ÷ 1/5."],
    explanation: "Total capital = 25,000 × 5 = 125,000; each old partner holds 2/5 = 50,000.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "When a new partner is admitted, the old partners are compensated for the profit share they give up.", answer: true, explanation: "True. Through goodwill the new partner compensates the sacrificing partners." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "A new partner who pays cash for his capital must also pay a premium, whether or not goodwill exists.", answer: false, hints: ["Is goodwill always present?"], explanation: "False. A premium is paid only when the business has goodwill and the partners agree to charge for it." });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each item on the admission of a new partner to the entry it needs.",
    pairs: ["Cash capital introduced", "Premium for goodwill", "Revaluation profit", "Goodwill eliminated"],
    right: ["Debit bank, credit new partner's capital", "Credit sacrificing partners' capital in the sacrificing ratio", "Credit old partners' capital in the old ratio", "Debit all partners' capital in the new ratio"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Each adjustment goes to the partners entitled to it or responsible for it.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence.",
    template: "The premium for goodwill is shared in the {{blank:a}} ratio, which is calculated as old share {{blank:b}} new share.",
    blanks: [
      { id: "a", accepted: ["sacrificing"], choices: ["sacrificing", "old", "new"] },
      { id: "b", accepted: ["minus"], choices: ["plus", "minus"] },
    ],
    explanation: "The sacrificing ratio is found from old share less new share.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to cash paid by a new partner in addition to his capital for a share in the goodwill?",
    accepted: ["premium", "premium for goodwill", "a premium", "goodwill premium"],
    explanation: "A premium compensates the sacrificing partners.",
  });

  const prem2 = r2(63000 * (1 / 6));
  chk(prem2, 10500);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: prem2, daily: true, calculator: true, wrong: [63000 / 3, 63000 / 5],
    stem: `Goodwill is ${money(63000)}. A new partner receives a one-sixth share of profits and pays a premium for goodwill. Calculate the premium.`,
    explanation: "1/6 × 63,000 = 10,500.",
  });
  const t1 = r2(84000 + 6400);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: t1, calculator: true, wrong: [84000, r2(84000 - 6400)],
    stem: `A partner's capital account was ${money(84000)}. When a new partner was admitted the partner received a premium of ${money(6400)} as the only sacrificing partner. Calculate the capital account balance after the admission (no other adjustments).`,
    hints: ["The premium is credited to the sacrificing partner."],
    explanation: "84,000 + 6,400 = 90,400.",
  });
  const bankAfter = r2(15750 + 35000 + 7500);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: bankAfter, calculator: true, wrong: [r2(15750 + 35000), r2(15750 + 35000 - 7500)],
    stem: `The bank balance was ${money(15750)} before a new partner was admitted. The new partner paid ${money(35000)} as capital and a premium of ${money(7500)}, all in cash into the business bank account. Calculate the bank balance after the admission.`,
    hints: ["Both the capital and the premium are cash into the business."],
    explanation: "15,750 + 35,000 + 7,500 = 58,250. Leaving out the premium gives 50,750.",
  });
  const tot = r2(38000 * 5);
  const need = r2((tot * 12) / 25);
  const adj = r2(need - 61500);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: adj, calculator: true, wrong: [need, r2((tot * 2) / 5 - 61500)],
    stem: `A new partner admitted with a one-fifth share has a capital account of ${money(38000)}. The two old partners share the rest 3 : 2 and wish their capitals to be in the same proportion as their profit shares. Tendai (3/5 of four-fifths) has capital of ${money(61500)}. What cash must Tendai pay in?`,
    hints: ["Total capital = new partner's capital × 5.", "Tendai's share is 12/25 of the total."],
    explanation: "Total capital = 38,000 × 5 = 190,000. Tendai's share 3/5 × 4/5 = 12/25 → 91,200. He must pay in 91,200 - 61,500 = 29,700.",
  });
  void adj;
  void tot;
  void need;

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "State two adjustments that may be needed when a new partner is admitted.",
    points: ["Revaluation of assets and liabilities", "Goodwill (creating and eliminating it, or a premium)"],
    modelAnswer: "Assets may need to be revalued, and goodwill must be dealt with, either by a premium or by adjusting the capital accounts.",
    explanation: "One mark each; capital adjustment to the new proportions is also accepted.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a new partner pays a premium for goodwill.",
    points: ["The business already has goodwill built up by the old partners", "The new partner will share in future profits that depend on this goodwill", "The premium compensates the old partners for the profit share they give up"],
    modelAnswer: "The old partners built up the reputation of the business. The new partner will share future profits that depend on it, so he pays the sacrificing partners for the profit share they give up.",
    hints: ["Who built the goodwill, and who benefits?"],
    explanation: "One mark each.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A new partner suggests paying nothing for goodwill because he is bringing valuable skills. Evaluate his suggestion.",
    points: ["His skills may increase future profits, which could justify a lower premium or a larger profit share", "But the old partners built up the existing goodwill and give up part of their share, so some compensation is fair", "A compromise, such as a lower premium or a salary instead of a share, may reflect both views", "Judgement: reasonable if the old partners agree and the skills have a real value; otherwise a premium should be paid"],
    modelAnswer: "His skills may justify a lower premium, but the existing goodwill was built by the old partners, who give up part of their profit share. A compromise such as a reduced premium may be fair. It is reasonable only if the old partners agree and the skills are valuable.",
    hints: ["Consider both what he brings and what the old partners give up."],
    explanation: "One mark each for the two views, the compromise and the judgement.",
  });

  // Structured 1 (10 marks): premium
  const cap = [64500, 41500];
  const gwS = 48000;
  const premS = r2(gwS / 4);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Rudo and Chipo share profits 3 : 2 and have capital accounts of ${money(cap[0])} and ${money(cap[1])}. They admit Nyasha on 1 January 2026 for a one-quarter share. The new ratio is Rudo 3/8, Chipo 3/8, Nyasha 1/4. Goodwill is valued at ${money(gwS)} and will not be kept in the books. Nyasha pays ${money(40000)} as capital and a premium for his share of goodwill, both in cash.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: premS, wrong: [gwS, r2(gwS / 2)], stem: "Calculate the premium Nyasha pays.", explanation: "1/4 × 48,000 = 12,000." }),
      P.mcq({ label: "(b)", marks: 2, stem: "In what ratio is the premium shared between Rudo and Chipo?", options: [["9 : 1", "Correct: Rudo sacrifices 3/5 - 3/8 = 9/40 and Chipo 2/5 - 3/8 = 1/40."], ["3 : 2", "That is the old profit-sharing ratio, not the sacrificing ratio."], ["1 : 1", "The two partners do not sacrifice equally."], ["3 : 3", "That is the ratio of the new shares of Rudo and Chipo."]], answer: "A", explanation: "Sacrifices in fortieths are 9 and 1, so the premium is shared 9 : 1." }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: r2(cap[0] + (premS * 9) / 10), wrong: [r2(cap[0] + premS * 0.6), r2(cap[0] + premS)], stem: "Calculate Rudo's capital after the admission (premium shared in the sacrificing ratio).", explanation: "Rudo sacrifices 3/5 - 3/8 = 9/40; Chipo sacrifices 2/5 - 3/8 = 1/40; the ratio is 9 : 1. Rudo receives 9/10 × 12,000 = 10,800." }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: r2(cap[1] + premS / 10), wrong: [r2(cap[1] + premS * 0.4), cap[1]], stem: "Calculate Chipo's capital after the admission.", explanation: "Chipo receives 1/10 × 12,000 = 1,200; capital 41,500 + 1,200 = 42,700." }),
    ],
    hints: ["Sacrifice = old share - new share, in fortieths.", "The premium is shared in the sacrificing ratio."],
    explanation: "This item tests the sacrificing ratio and the premium for goodwill.",
  });

  // Structured 2 (16 marks): reval + goodwill + new partner
  const bf = { land: 120000, vehicles: 36000, inventory: 22400, receivables: 17850, bank: 9750, payables: 18500, capN: 118000, capF: 69500 };
  const aB = sum([bf.land, bf.vehicles, bf.inventory, bf.receivables, bf.bank]);
  check("S2 before", aB, bf.payables + bf.capN + bf.capF);
  const G = r2(18000 - 4500 - 1200);
  chk(G, 12300);
  const gwG = 45000;
  const cashS = 50000;
  const led = colLedger(
    "Partners' capital accounts",
    ["Nyasha", "Farai", "Sipho"],
    [["Goodwill eliminated (3 : 2 : 1)", r2(gwG / 2), r2((gwG * 2) / 6), r2(gwG / 6)]],
    [["Balance b/d", bf.capN, bf.capF, null], ["Revaluation profit (2 : 1)", r2((G * 2) / 3), r2(G / 3), null], ["Goodwill created (2 : 1)", r2((gwG * 2) / 3), r2(gwG / 3), null], ["Cash introduced", null, null, cashS]],
  );
  chk(led.closing[0], 133700);
  chk(led.closing[1], 73600);
  chk(led.closing[2], 42500);
  const aA = r2(aB + G + cashS);
  check("S2 after", aA, bf.payables + sum(led.closing));
  const reT = tAcct(
    "Revaluation account",
    [["1 Jul", "Vehicles", 4500], ["1 Jul", "Inventory", 1200], ["1 Jul", "Capital: Nyasha (2/3)", r2((G * 2) / 3)], ["1 Jul", "Capital: Farai (1/3)", r2(G / 3)]],
    [["1 Jul", "Land and buildings", 18000]],
    null,
  );
  b.struct({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: `Nyasha and Farai share profits 2 : 1. Their statement of financial position on 1 July 2026 shows land and buildings ${money(bf.land)}, vehicles ${money(bf.vehicles)}, inventory ${money(bf.inventory)}, trade receivables ${money(bf.receivables)}, bank ${money(bf.bank)}, trade payables ${money(bf.payables)} and capital accounts of ${money(bf.capN)} (Nyasha) and ${money(bf.capF)} (Farai). They admit Sipho on that date; he introduces ${money(cashS)} in cash. The new profit-sharing ratio is Nyasha 3 : Farai 2 : Sipho 1. Land and buildings are revalued to ${money(138000)}, vehicles to ${money(31500)} and inventory to ${money(21200)}. Goodwill is valued at ${money(gwG)} and is to be created and eliminated. The assets are shown at their revalued amounts.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: G, wrong: [18000, r2(18000 + 4500 + 1200)], stem: "Calculate the net revaluation profit.", explanation: "18,000 - 4,500 - 1,200 = 12,300." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: r2(gwG / 6), wrong: [gwG, r2(gwG / 3)], stem: "Calculate the amount of goodwill charged to Sipho when it is eliminated.", explanation: "1/6 × 45,000 = 7,500." }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: led.closing[0], wrong: [r2(bf.capN + 8200), r2(bf.capN + 8200 + 30000)], stem: "Calculate Nyasha's capital after the admission.", explanation: "118,000 + 8,200 + 30,000 - 22,500 = 133,700." }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: aA, wrong: [r2(aB + G), r2(aB + cashS)], stem: "Calculate total assets after the admission.", explanation: `${fmt(aB)} + ${fmt(G)} + ${fmt(cashS)} = ${fmt(aA)}.` }),
      P.manual({ label: "(e)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Write up the partners' capital accounts.", points: ["Opening balances, revaluation profit in the old ratio and cash introduced", "Goodwill created 2 : 1 and eliminated 3 : 2 : 1", "Balances carried down correctly"], modelAnswer: led.md, explanation: "One mark per point; follow-through allowed." }),
      P.manual({ label: "(f)", marks: 2, stem: "Prepare the revaluation account.", points: ["Increase in land and buildings credited; decreases in vehicles and inventory debited", "Profit of 12,300 shared 2 : 1 between Nyasha and Farai"], modelAnswer: reT, explanation: "One mark per point." }),
    ],
    hints: ["Revalue first, then deal with goodwill, then cash.", "Sipho's capital is his cash less goodwill charged to him."],
    explanation: "This item tests revaluation, goodwill and cash introduced on the admission of a partner.",
  });
  void journal;
  void goodwill;
  void table;

  b.card("DEFINITION", "What is a **premium for goodwill**?", "Cash paid by a new partner for a share of the existing goodwill; credited to the sacrificing partners in the sacrificing ratio.");
  b.card("FORMULA", "Sacrifice or gain", "Old share - new share. Positive: sacrifice. Negative: gain.");
  b.card("FACT", "Entry for cash capital of a new partner", "Debit bank; credit the new partner's capital account.");
  b.card("FACT", "Revaluation profit on admission", "Shared by the old partners in the old ratio.");
  b.card("FACT", "Goodwill created and eliminated on admission", "Credit old partners in the old ratio; debit all partners in the new ratio.");
  b.card("FORMULA", "New partner's share of goodwill", "Goodwill × new partner's profit share.");
  b.card("FACT", "Total assets after admission", "Old assets + revaluation profit (or - loss) + cash introduced.");
  b.card("CONCEPT", "Capital in profit-sharing proportions", "Total capital = new partner's capital ÷ his share; the old partners pay in or withdraw cash to match.");
  b.card("CONCEPT", "Reasons for admitting a partner", "More capital, new skills, replacing a retiring partner, sharing the workload.");
});
