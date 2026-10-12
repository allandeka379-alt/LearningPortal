// W2a: partnership.goodwill
import { concept, P, table, r2, fmt, money, chk, goodwill, sum, journal } from "../lib.mjs";
import { mc, colLedger } from "../tables/w2a-lib.mjs";

concept("aacc.partnership.goodwill", { file: "partnership/goodwill", keyPrefix: "partnership.goodwill" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Inherent goodwill is best described as goodwill:",
    ok: ["that the business has built up itself and has not been bought", "Correct: it is self-generated through reputation and customers."],
    bad: [["paid for when one business buys another", "That describes purchased goodwill."], ["calculated as the difference between assets and liabilities", "That is net assets or capital."], ["that is shown as a non-current asset in the statement of financial position", "Inherent goodwill is not recognised."]],
    explanation: "Inherent goodwill arises from the business's own reputation and is not recorded in the books.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is a goodwill account usually eliminated immediately after it is created on a change in a partnership?",
    ok: ["Inherent goodwill cannot be recognised as an asset", "Correct: IAS 38 does not allow self-generated goodwill to be shown."],
    bad: [["Goodwill has no value to the partners", "It has value, which is why it is shared between the partners."], ["The new partner does not want to pay for it", "The elimination charges the continuing partners in the new ratio."], ["Goodwill is always replaced by cash", "No cash need be involved."]],
    explanation: "Because inherent goodwill is not an asset the business can recognise, the account is opened only to adjust the partners' capital.",
  });
  const pr = [18200, 21400, 22800];
  const av = sum(pr) / 3;
  const g2 = r2(av * 2);
  chk(g2, 41600);
  mc(b, {
    d: 2, skill: "APPLICATION", calculator: true,
    stem: `A partnership's profits for the last three years were ${money(pr[0])}, ${money(pr[1])} and ${money(pr[2])}. Goodwill is valued at two years' purchase of average profits. What is the value of goodwill?`,
    ok: [money(g2), "Correct: average 20,800 × 2."],
    bad: [[money(r2(sum(pr) * 2)), "The total of the profits has been used, not the average."], [money(r2(av)), "The multiple of two years has been left out."], [money(r2(pr[2] * 2)), "Only the latest year's profit has been used."]],
    hints: ["Find the average first."],
    explanation: "Average = (18,200 + 21,400 + 22,800) ÷ 3 = 20,800; × 2 = 41,600.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Partners share profits 3 : 2 and will share 1 : 1. What is the sacrifice of the partner with the 3/5 share?",
    ok: ["1/10", "Correct: 3/5 - 1/2 = 1/10."],
    bad: [["1/5", "The shares have been compared by a different method; the difference is 1/10."], ["3/10", "That is half of 3/5 and not a difference."], ["No sacrifice; the partner gains", "The share falls from 0.6 to 0.5."]],
    hints: ["Convert to tenths."],
    explanation: "3/5 = 6/10 and 1/2 = 5/10, so the sacrifice is 1/10.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "When goodwill is created on a change in profit-sharing, which entry is made?",
    ok: ["Debit goodwill; credit the old partners' capital accounts in the old ratio", "Correct: the old partners built the goodwill."],
    bad: [["Debit goodwill; credit the new partners' capital accounts in the new ratio", "Goodwill is created for the old partners in the old ratio."], ["Debit the old partners' capital accounts; credit goodwill", "That is the opposite entry, a write-off."], ["Debit cash; credit goodwill", "Goodwill does not involve cash unless a premium is paid."]],
    hints: ["Who built the goodwill?"],
    explanation: "The old partners are credited with the value they created, in the ratio in which they shared profits.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Goodwill is eliminated from the books when the new profit-sharing ratio starts. Which entry is made?",
    ok: ["Debit the partners' capital accounts in the new ratio; credit goodwill", "Correct: the new partners bear the cost in the new ratio."],
    bad: [["Debit the partners' capital accounts in the old ratio; credit goodwill", "The elimination uses the new ratio."], ["Credit the partners' capital accounts in the new ratio; debit goodwill", "That repeats the creation."], ["Debit goodwill; credit profit and loss", "No profit is involved."]],
    hints: ["Who will share future profits and so benefit?"],
    explanation: "The partners who will share profits in the new ratio are charged with the goodwill.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "No goodwill account is opened. Goodwill is US\\$60,000, and partner X gains 1/10 of the profit share while partner Y sacrifices 1/10. Which adjustment is made to the capital accounts?",
    ok: ["Debit X US\\$6,000; credit Y US\\$6,000", "Correct: the gaining partner pays the sacrificing partner 1/10 of the goodwill."],
    bad: [["Debit Y US\\$6,000; credit X US\\$6,000", "The adjustment is reversed."], ["Debit X US\\$60,000; credit Y US\\$60,000", "The whole goodwill has been used rather than the 1/10 share."], ["Debit X US\\$600; credit Y US\\$600", "The figure has been mis-scaled by a factor of ten."]],
    hints: ["Gain × goodwill."],
    explanation: "1/10 × 60,000 = 6,000 is transferred from the gaining partner's capital to the sacrificing partner's capital.",
  });
  const avP = 31500;
  const na = 150000;
  const sp = r2(avP - na * 0.12);
  const g3 = r2(sp * 3);
  chk(g3, 40500);
  mc(b, {
    d: 4, skill: "APPLICATION", calculator: true,
    stem: `Average annual profit is ${money(avP)}. Net assets are ${money(na)} and a normal return is 12% of net assets. Goodwill is three years' purchase of super profits. What is its value?`,
    ok: [money(g3), "Correct: (31,500 - 18,000) × 3."],
    bad: [[money(r2(avP * 3)), "The normal return has not been deducted."], [money(r2(sp)), "The multiple of three years has been left out."], [money(r2(na * 0.12 * 3)), "The normal return alone has been multiplied."]],
    hints: ["Normal return = 12% of net assets."],
    explanation: "Normal return 18,000; super profits 13,500; goodwill 13,500 × 3 = 40,500.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Under IAS 38 inherent goodwill may be recorded as an asset if the partners agree its value.", answer: false, explanation: "False. Self-generated goodwill cannot be reliably measured and is not recognised, whatever the partners agree." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "The sacrifices and gains of all the partners in a change of ratio add up to zero.", answer: true, hints: ["Total shares before and after are both 1."], explanation: "True. Total profit shares are 1 before and after, so what one partner loses another gains." });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each term to its description.",
    pairs: ["Inherent goodwill", "Purchased goodwill", "Super profits", "Sacrificing ratio"],
    right: ["Built up by the business and not recorded", "Paid for on acquiring a business", "Average profit above the normal return on net assets", "Old profit share less new profit share"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Inherent goodwill is self-built; purchased goodwill is paid for; super profits exceed the normal return; sacrifice is old share less new share.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the entries when goodwill is created.",
    template: "Debit {{blank:a}}; credit the {{blank:b}} partners' capital accounts in the {{blank:c}} ratio.",
    blanks: [
      { id: "a", accepted: ["goodwill"], choices: ["goodwill", "cash", "revaluation"] },
      { id: "b", accepted: ["old"], choices: ["old", "new"] },
      { id: "c", accepted: ["old"], choices: ["old", "new"] },
    ],
    explanation: "Goodwill is created for the old partners in the old ratio.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the ratio found by subtracting each partner's new profit share from the old share.",
    accepted: ["sacrificing ratio", "sacrifice ratio", "sacrifice", "sacrificing"],
    explanation: "A positive result is the sacrifice; a negative result is a gain.",
  });

  const g4 = 36000;
  const oldR = [5, 3];
  const newR = [1, 1];
  const gs = goodwill.gainSacrifice(oldR, newR);
  const pay = r2(Math.abs(gs[1]) * g4);
  chk(gs[0], -0.125, 1e-9);
  chk(pay, 4500);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: pay, calculator: true, wrong: [g4 / 2, r2(g4 / 16)],
    stem: `Chipo and Nyasha share profits 5 : 3 and will share equally. Goodwill is valued at ${money(g4)} and no goodwill account is to be kept. Calculate the amount transferred from Nyasha's capital account to Chipo's capital account.`,
    hints: ["Nyasha gains 1/2 - 3/8."],
    explanation: "Chipo's share falls from 5/8 to 1/2 (sacrifice 1/8) and Nyasha's rises from 3/8 to 1/2 (gain 1/8). Transfer = 1/8 × 36,000 = 4,500. Wrongly using half the goodwill gives 18,000.",
  });
  const gwS = goodwill.superProfits(26800, 94000, 14, 4);
  chk(gwS, 54560);
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: gwS, calculator: true, wrong: [r2(26800 * 4), r2((26800 - 94000 * 0.14) * 1)],
    stem: `The average annual profit of a partnership is ${money(26800)}. Its net assets are ${money(94000)} and the normal rate of return is 14%. Goodwill is valued at four years' purchase of super profits. Calculate the value of goodwill.`,
    hints: ["Normal return = 14% of net assets."],
    explanation: "Normal return = 14% × 94,000 = 13,160. Super profits = 26,800 - 13,160 = 13,640. Goodwill = 4 × 13,640 = 54,560.",
  });
  const g5 = 48000;
  const names5 = ["Nyasha", "Farai", "Sipho"];
  const gs5 = goodwill.gainSacrifice([2, 1, 0], [3, 3, 2]);
  const gain5 = r2(gs5[2] * g5);
  chk(gain5, 12000);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: gain5, calculator: true, wrong: [r2(g5 * 0.375), r2(g5 * 0.5)],
    stem: `Nyasha and Farai share profits 2 : 1. They admit Sipho and will share profits 3 : 3 : 2 (Nyasha : Farai : Sipho). Goodwill is ${money(g5)} and is eliminated. Calculate the amount of goodwill charged to Sipho's capital account.`,
    hints: ["Sipho's share is 2/8."],
    explanation: "Sipho's share is 2/8 = 1/4. Charged = 1/4 × 48,000 = 12,000. (Nyasha 3/8 and Farai 3/8 are charged 18,000 each; the old partners are credited 32,000 and 16,000.)",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "State two reasons why a business may have goodwill.",
    points: ["Good reputation or loyal customers", "A favourable location, skilled staff or exclusive supply agreements"],
    modelAnswer: "A strong reputation and loyal customers, and a good location or skilled employees.",
    explanation: "One mark for each reason.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the old partners are credited with goodwill when a new partner is admitted.",
    points: ["The goodwill was built up by the old partners over the years", "The new partner will share in future profits that the goodwill helps to earn", "Crediting the old partners compensates them for the share of future profit they give up"],
    modelAnswer: "The old partners built the business's reputation. The new partner will share in future profits that depend on it, so the old partners are credited to compensate them for giving up part of those profits.",
    hints: ["Who built the goodwill, and who benefits afterwards?"],
    explanation: "One mark for each of the three points.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "The partners cannot agree whether to value goodwill using average profits or super profits. Evaluate the two methods.",
    points: ["The average profits method is simple and easy to agree but ignores the capital employed in earning the profit", "The super profits method deducts a normal return on net assets, so it values only the profit due to reputation; it is more precise but depends on the chosen normal rate and years' purchase", "Both depend on judgement of the years' purchase and on whether past profits will continue", "Judgement: super profits are fairer for a capital-heavy business; average profits may suit a service business with few assets"],
    modelAnswer: "Average profits is simple but ignores the capital used to earn the profit. Super profits gives a fairer picture of the profit due to reputation but relies on the normal rate chosen. Both rely on judgement of the number of years. For a capital-heavy business super profits is fairer.",
    hints: ["Which method takes account of assets?"],
    explanation: "One mark for each method, one for the shared weakness and one for a judgement.",
  });

  // Structured 1 (10 marks): valuation and sacrifice
  const prof = [20350, 23890, 26410, 27990];
  const avg4 = sum(prof) / 4;
  const gw1 = r2(avg4 * 2.5);
  chk(avg4, 24660, 0.001);
  const g1Total = gw1;
  const cap1 = [46000, 29000];
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Tafara and Rudo share profits 3 : 2. From 1 January 2026 they will share equally. Profits for the last four years were ${money(prof[0])}, ${money(prof[1])}, ${money(prof[2])} and ${money(prof[3])}. Goodwill is valued at two and a half years' purchase of average profits. Capital accounts at 31 December 2025 were Tafara ${money(cap1[0])} and Rudo ${money(cap1[1])}. No goodwill account is to be kept.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: gw1, wrong: [r2(avg4), r2(sum(prof) * 2.5)], stem: "Calculate the value of goodwill.", explanation: `Average = ${fmt(avg4)}; × 2.5 = ${fmt(gw1)}.` }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: r2(gw1 / 10), wrong: [r2(gw1 / 5), r2(gw1 / 2)], stem: "Calculate the amount Rudo's capital account is debited with (the gain of 1/10 of goodwill).", explanation: `Rudo's share rises from 2/5 to 1/2, a gain of 1/10. 1/10 × ${fmt(gw1)} = ${fmt(r2(gw1 / 10))}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: r2(cap1[0] + gw1 / 10), wrong: [r2(cap1[0] - gw1 / 10)], stem: "Calculate Tafara's capital after the adjustment.", explanation: `${fmt(cap1[0])} + ${fmt(r2(gw1 / 10))} = ${fmt(r2(cap1[0] + gw1 / 10))}.` }),
      P.mcq({ label: "(d)", marks: 2, stem: "Which partner is the sacrificing partner?", options: [["Tafara", "Correct: his share falls from 3/5 to 1/2."], ["Rudo", "Rudo's share rises from 2/5 to 1/2."], ["Both partners", "Sacrifices and gains total zero, so one partner gains."], ["Neither partner", "The shares change."]], answer: "A", explanation: "Tafara gives up 1/10; Rudo gains 1/10." }),
    ],
    hints: ["Average profit first.", "The gaining partner pays the sacrificing partner."],
    explanation: "This item tests goodwill valuation and the adjustment of capital accounts without a goodwill account.",
  });
  void g1Total;

  // Structured 2 (16 marks): admission with goodwill account
  const gwA = 54000;
  const nm = ["Nyasha", "Farai", "Sipho"];
  const capsOld = [64000, 41000];
  const led = colLedger(
    "Partners' capital accounts",
    nm,
    [["Goodwill eliminated (3 : 3 : 2)", r2((gwA * 3) / 8), r2((gwA * 3) / 8), r2((gwA * 2) / 8)]],
    [["Balance b/d", capsOld[0], capsOld[1], null], ["Goodwill created (2 : 1)", r2((gwA * 2) / 3), r2((gwA * 1) / 3), null], ["Cash introduced", null, null, 35000]],
  );
  const jn = journal([
    { lines: [["Goodwill", gwA, null], ["Capital: Nyasha", null, 36000], ["Capital: Farai", null, 18000]], narrative: "Goodwill created in the old ratio 2 : 1" },
    { lines: [["Capital: Nyasha", 20250, null], ["Capital: Farai", 20250, null], ["Capital: Sipho", 13500, null], ["Goodwill", null, gwA]], narrative: "Goodwill eliminated in the new ratio 3 : 3 : 2" },
  ], { title: "Journal" });
  b.struct({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: `Nyasha and Farai share profits 2 : 1 and have capital accounts of ${money(capsOld[0])} and ${money(capsOld[1])}. On 1 July 2026 they admit Sipho, who brings ${money(35000)} of cash as capital. The new profit-sharing ratio is Nyasha 3 : Farai 3 : Sipho 2. Goodwill is valued at ${money(gwA)} and is to be created and eliminated, not kept in the books.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: 36000, wrong: [27000, 18000], stem: "Calculate the amount credited to Nyasha's capital account when goodwill is created.", explanation: "2/3 × 54,000 = 36,000 (Farai: 18,000)." }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: 13500, wrong: [18000, 20250], stem: "Calculate the amount debited to Sipho's capital account when goodwill is eliminated.", explanation: "2/8 × 54,000 = 13,500 (Nyasha and Farai 20,250 each)." }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: led.closing[0], wrong: [64000, r2(led.closing[0] - 20250)], stem: "Calculate Nyasha's capital balance after the admission.", explanation: `64,000 + 36,000 - 20,250 = ${fmt(led.closing[0])}.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: led.closing[2], wrong: [35000, 48500], stem: "Calculate Sipho's capital balance after the admission.", explanation: "35,000 - 13,500 = 21,500." }),
      P.manual({ label: "(e)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Write up the partners' capital accounts on the admission of Sipho.", points: ["Opening balances and cash introduced entered", "Goodwill created in the old ratio 2 : 1 and eliminated in the new ratio 3 : 3 : 2", "Balances carried down correctly"], modelAnswer: led.md, explanation: "One mark per point; follow-through allowed." }),
      P.manual({ label: "(f)", marks: 2, stem: "Explain why goodwill is eliminated instead of being left in the books.", points: ["Inherent goodwill cannot be recognised as an asset (IAS 38)", "The entries serve only to adjust the partners' capital for the value of their shares"], modelAnswer: "Under IAS 38 inherent goodwill is not recognised as an asset. The goodwill account is just a device to adjust the partners' capital accounts and is cleared immediately.", explanation: "One mark for each point." }),
    ],
    hints: ["Create goodwill in the old ratio.", "Eliminate it in the new ratio."],
    explanation: "This item tests the creation and elimination of goodwill when a new partner is admitted.",
  });
  void jn;

  b.card("DEFINITION", "What is **goodwill**?", "The value of a business above its identifiable net assets, arising from reputation, customers and location.");
  b.card("DEFINITION", "What is **super profit**?", "Average annual profit minus the normal return on the net assets.");
  b.card("FORMULA", "Goodwill by average profits", "Average annual profit × number of years' purchase.");
  b.card("FORMULA", "Goodwill by super profits", "(Average profit - normal return on net assets) × years' purchase.");
  b.card("FORMULA", "Sacrifice or gain", "Old share - new share: positive is a sacrifice, negative a gain; the total is zero.");
  b.card("FACT", "Creating goodwill", "Debit goodwill; credit the old partners' capital accounts in the old ratio.");
  b.card("FACT", "Eliminating goodwill", "Credit goodwill; debit the partners' capital accounts in the new ratio.");
  b.card("FACT", "IAS 38 and goodwill", "Inherent (self-generated) goodwill is not recognised as an asset; only purchased goodwill is.");
  b.card("CONCEPT", "No goodwill account", "The gaining partner's capital is debited and the sacrificing partner's credited by gain (or sacrifice) × goodwill.");
});
