// W2a: partnership.revaluation
import { concept, P, table, r2, fmt, money, chk, check, sum } from "../lib.mjs";
import { mc, colLedger, tAcct } from "../tables/w2a-lib.mjs";

concept("aacc.partnership.revaluation", { file: "partnership/revaluation", keyPrefix: "partnership.revaluation" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "On a change in a partnership, the profit on revaluation is shared between the partners in the:",
    ok: ["old profit-sharing ratio", "Correct: the gain arose while the old partners owned the business."],
    bad: [["new profit-sharing ratio", "The new ratio applies only from the date of the change."], ["ratio of the capital balances", "Profit shares are not based on capital unless agreed."], ["ratio of the drawings", "Drawings play no part in the revaluation."]],
    explanation: "The old partners are entitled to the gains and losses that arose before the change.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "An increase in the value of premises is recorded in the revaluation account as a:",
    ok: ["credit", "Correct: gains are credited to the revaluation account."],
    bad: [["debit", "A debit would record a loss."], ["debit in the premises account only", "The matching entry is a credit to revaluation."], ["credit in the capital accounts only", "The capital accounts receive the net balance afterwards."]],
    explanation: "Increases in assets are credited (gains); decreases are debited (losses).",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Inventory is written down by US\\$1,800 on revaluation. What is the entry?",
    ok: ["Debit revaluation; credit inventory", "Correct: a loss is debited to revaluation and the asset is reduced."],
    bad: [["Debit inventory; credit revaluation", "That would increase the asset."], ["Debit capital accounts; credit inventory", "The capital accounts are adjusted only after the net result."], ["Debit inventory; credit capital accounts", "This is the entry for an increase."]],
    explanation: "A decrease in an asset is a loss, so revaluation is debited and the asset account is credited.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "On revaluation, accrued wages not yet recorded of US\\$700 are found. How is this treated?",
    ok: ["Debit revaluation; credit accrued expenses", "Correct: an increase in a liability is a loss."],
    bad: [["Credit revaluation; debit accrued expenses", "That would be a decrease in the liability."], ["Debit capital accounts only", "The revaluation account records the loss first."], ["No entry is needed", "Unrecorded liabilities are included on revaluation."]],
    hints: ["Does the partnership become worse off?"],
    explanation: "A liability not previously recorded reduces the value of the business, so it is a loss on revaluation.",
  });
  const inc = 12000;
  const dec1 = 2800;
  const dec2 = 1000;
  const net = r2(inc - dec1 - dec2);
  chk(net, 8200);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `On revaluation, land increased by ${money(inc)}, equipment fell by ${money(dec1)} and inventory fell by ${money(dec2)}. The partners share profits 3 : 1. What is the larger partner's share of the net revaluation profit?`,
    ok: [money(r2(net * 0.75)), "Correct: net 8,200 × 3/4."],
    bad: [[money(r2(inc * 0.75)), "Only the increase has been shared; the decreases are losses."], [money(r2(net * 0.25)), "This is the smaller partner's share."], [money(r2(net / 2)), "The profit has been shared equally."]],
    hints: ["Net the gains and losses first."],
    explanation: "Net profit = 12,000 - 2,800 - 1,000 = 8,200; × 3/4 = 6,150.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "The assets are not to be shown at their revalued amounts. After crediting the profit to the old partners, the book values are restored by:",
    ok: ["debiting all the partners' capital accounts in the new ratio", "Correct: the reversal is shared by old and new partners in the new ratio."],
    bad: [["crediting all the partners in the new ratio", "That would repeat the gain."], ["debiting the old partners in the old ratio only", "The new partner must also share in the reversal."], ["writing the profit off to the statement of profit or loss", "The reversal is posted to the capital accounts."]],
    hints: ["Who shares future profits?"],
    explanation: "The reversal charges all partners in the new ratio, leaving a net effect of profit × (old share - new share).",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "The revaluation profit is US\\$12,000. Old ratio X 3 : Y 1; new ratio X 2 : Y 1 : Z 1, and the assets are not restated. What is the net effect on Z's capital account?",
    ok: ["Debited with US\\$3,000", "Correct: 1/4 × 12,000 is charged in the reversal and Z has no share of the original credit."],
    bad: [["Credited with US\\$3,000", "Z receives no part of the original credit and is charged in the reversal."], ["Debited with US\\$12,000", "Only Z's 1/4 share of the reversal is charged."], ["No entry is made for Z", "The reversal is shared in the new ratio including Z."]],
    hints: ["Z's new share is 1/4."],
    explanation: "Reversal charges Z 1/4 × 12,000 = 3,000; Z had no share of the original credit.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Revaluation produces a net loss of US\\$4,000. What is the effect on the statement of financial position?",
    ok: ["Total assets and the partners' capital both fall by US\\$4,000", "Correct: assets are written down and the loss is charged to capital."],
    bad: [["Total assets fall by US\\$4,000 but capital is unchanged", "The loss is charged to the old partners' capital accounts."], ["Capital falls by US\\$4,000 but assets are unchanged", "The assets are written down."], ["Total assets rise by US\\$4,000", "A loss reduces assets."]],
    hints: ["The statement must still balance."],
    explanation: "The write-down reduces assets and the loss reduces capital by the same amount, so the equation balances.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A new partner shares in the revaluation profit that arose before he joined.", answer: false, explanation: "False. The profit belongs to the old partners and is shared in the old ratio." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "When assets are not restated after a revaluation, total assets in the statement of financial position are unchanged by the revaluation entries.", answer: true, hints: ["The reversal restores the old values."], explanation: "True. The profit is credited and then reversed, so the net effect is only a transfer between capital accounts." });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each item to its entry in the revaluation account.",
    pairs: ["Premises increased in value", "Equipment written down", "Allowance for irrecoverable debts increased", "Accrued expenses increased"],
    right: ["Credit", "Debit"],
    rightIndex: [0, 1, 1, 1],
    explanation: "Gains are credited; losses (write-downs and increases in liabilities or allowances) are debited.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence.",
    template: "A revaluation profit is {{blank:a}} to the {{blank:b}} partners' capital accounts in the {{blank:c}} ratio.",
    blanks: [
      { id: "a", accepted: ["credited"], choices: ["credited", "debited"] },
      { id: "b", accepted: ["old"], choices: ["old", "new"] },
      { id: "c", accepted: ["old"], choices: ["old", "new"] },
    ],
    explanation: "The gain is credited to the old partners in the old ratio.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the temporary account used to record increases and decreases in the values of assets and liabilities when a partnership changes.",
    accepted: ["revaluation account", "revaluation", "the revaluation account"],
    explanation: "The revaluation account records the changes and the net profit or loss is shared by the old partners.",
  });

  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: r2(18400 - 3150 - 960), daily: true, calculator: true, wrong: [18400, r2(18400 + 3150 + 960)],
    stem: `On revaluation, land increases by ${money(18400)}, vehicles decrease by ${money(3150)} and inventory decreases by ${money(960)}. Calculate the net revaluation profit.`,
    explanation: "18,400 - 3,150 - 960 = 14,290. Adding the decreases gives 22,510.",
  });
  const shareCalc = r2(14290 * 3 / 5);
  void shareCalc;
  const g2 = 21600;
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: r2(g2 * 2 / 5), calculator: true, wrong: [r2(g2 * 3 / 5), r2(g2 / 2)],
    stem: `The revaluation profit of a partnership is ${money(g2)}. The old partners, Sipho and Thandeka, share profits 3 : 2. Calculate the amount credited to Thandeka's capital account.`,
    hints: ["Thandeka has the smaller share."], explanation: "2/5 × 21,600 = 8,640. The larger share of 12,960 belongs to Sipho.",
  });
  const totA = 187400;
  const loss = r2(5200 + 1350 - 2900);
  chk(loss, 3650);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: r2(totA - loss), calculator: true, wrong: [r2(totA + loss), r2(totA - 5200)],
    stem: `Total assets were ${money(totA)} before revaluation. Buildings were written down by ${money(5200)}, equipment was written down by ${money(1350)} and inventory was revalued upwards by ${money(2900)}. Calculate total assets after the revaluation.`,
    hints: ["Net the decreases and the increase."],
    explanation: "Net change = -5,200 - 1,350 + 2,900 = -3,650. Total assets = 187,400 - 3,650 = 183,750.",
  });
  const gg = 15600;
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: r2(gg * (3 / 5 - 1 / 2)), calculator: true, wrong: [r2(gg * 3 / 5), r2(gg * 1 / 2)],
    stem: `Nyasha and Farai share profits 3 : 2 and from the date of a revaluation will share equally. The revaluation profit is ${money(gg)} and the assets are left at their old values. Calculate the net amount by which Nyasha's capital account is increased.`,
    hints: ["Net = profit × (old share - new share)."],
    explanation: "Credit 3/5 × 15,600 = 9,360; reversal 1/2 × 15,600 = 7,800; net = 1,560.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why assets are revalued when a new partner is admitted.",
    points: ["Book values may differ from current values, so the old partners' capital may be understated or overstated", "Revaluing ensures the old partners receive any gains and bear any losses that arose before the new partner joined"],
    modelAnswer: "Books record cost, not current value. Revaluing means any gain or loss up to the date of admission goes to the old partners and the new partner neither gains nor loses from it.",
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the revaluation account is a temporary account.",
    points: ["It is opened only at the date of the change to record the revalued items", "Its balance is transferred to the partners' capital accounts", "It is closed afterwards and does not appear in the statement of financial position"],
    modelAnswer: "The account is opened for the change only. Its balance is shared between the old partners' capital accounts, after which it is closed.",
    hints: ["What happens to its balance?"],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Chipo suggests the partners should leave the assets at their old values after a revaluation. Evaluate her suggestion.",
    points: ["Leaving assets at old values avoids changing the asset accounts, and may reduce depreciation calculations and legal fees", "But the statement of financial position then does not show current values and may mislead the partners and lenders", "The reversal entry is extra work and may be a source of error", "Judgement: restate the assets if the values are reliable and significant; otherwise leave them and disclose the difference"],
    modelAnswer: "Leaving the assets at old values is simpler and avoids a change in depreciation, but the statement of financial position then understates current values and may mislead. A reversal is needed. If the values are significant and reliable it is better to restate the assets.",
    hints: ["Think of usefulness and simplicity."],
    explanation: "One mark for each reasoned point and one for the judgement.",
  });

  // Structured 1 (10 marks)
  const R = { land: 22500, vehicles: -4850, inventory: -1325, allowance: -740 };
  const prof1 = r2(R.land + R.vehicles + R.inventory + R.allowance);
  chk(prof1, 15585);
  const ta1 = 214900;
  const capA = 96400;
  const rA = r2((prof1 * 4) / 5);
  const rB = r2((prof1 * 1) / 5);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Mazvita and Takudzwa share profits 4 : 1 and are about to admit a third partner. Their assets are revalued: land is increased by ${money(R.land)}; vehicles are written down by ${money(-R.vehicles)}; inventory is written down by ${money(-R.inventory)}; and the allowance for irrecoverable debts is increased by ${money(-R.allowance)}. Total assets before revaluation were ${money(ta1)} and Mazvita's capital account was ${money(capA)}.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: prof1, wrong: [R.land, r2(R.land + 4850 + 1325 + 740)], stem: "Calculate the net revaluation profit.", explanation: "22,500 - 4,850 - 1,325 - 740 = 15,585." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: rA, wrong: [rB, r2(prof1 / 2)], stem: "Calculate Mazvita's share of the profit.", explanation: `4/5 × ${fmt(prof1)} = ${fmt(rA)}.` }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: r2(capA + rA), wrong: [capA, r2(capA + rB)], stem: "Calculate Mazvita's capital after the revaluation.", explanation: `${fmt(capA)} + ${fmt(rA)} = ${fmt(r2(capA + rA))}.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: r2(ta1 + prof1), wrong: [ta1, r2(ta1 - prof1)], stem: "Calculate total assets after the revaluation.", explanation: `${fmt(ta1)} + ${fmt(prof1)} = ${fmt(r2(ta1 + prof1))}.` }),
    ],
    hints: ["Net the gains and losses.", "The old ratio applies to the profit."],
    explanation: "This item tests the revaluation profit, its sharing in the old ratio and the effect on capital and assets.",
  });

  // Structured 2 (16 marks): assets not restated
  const G = r2(18000 - 4250 - 1250);
  chk(G, 12500);
  const caps = [72000, 36000];
  const led = colLedger(
    "Partners' capital accounts",
    ["Nyasha", "Farai", "Sipho"],
    [["Reversal of revaluation (2 : 1 : 1)", r2(G / 2), r2(G / 4), r2(G / 4)]],
    [["Balance b/d", caps[0], caps[1], null], ["Revaluation profit (3 : 1)", r2((G * 3) / 4), r2(G / 4), null], ["Cash introduced", null, null, 40000]],
  );
  const revT = tAcct(
    "Revaluation account",
    [["1 Jul", "Vehicles", 4250], ["1 Jul", "Inventory", 1250], ["1 Jul", "Capital: Nyasha (3/4)", r2((G * 3) / 4)], ["1 Jul", "Capital: Farai (1/4)", r2(G / 4)]],
    [["1 Jul", "Land", 18000]],
    null,
  );
  b.struct({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: `Nyasha and Farai share profits 3 : 1 and have capital accounts of ${money(caps[0])} and ${money(caps[1])}. On 1 July 2026 they admit Sipho, who introduces ${money(40000)} of cash, and the new ratio is Nyasha 2 : Farai 1 : Sipho 1. The assets are revalued: land is increased by ${money(18000)}, vehicles are written down by ${money(4250)} and inventory is written down by ${money(1250)}. The assets are to remain in the books at their old values.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: G, wrong: [18000, r2(18000 + 4250 + 1250)], stem: "Calculate the net revaluation profit.", explanation: "18,000 - 4,250 - 1,250 = 12,500." }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: led.closing[0], wrong: [r2(72000 + 9375), r2(72000 - 6250)], stem: "Calculate Nyasha's capital balance after the admission.", explanation: `72,000 + 9,375 - 6,250 = ${fmt(led.closing[0])}.` }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: led.closing[1], wrong: [r2(36000 + 3125), r2(36000 - 3125)], stem: "Calculate Farai's capital balance after the admission.", explanation: `36,000 + 3,125 - 3,125 = ${fmt(led.closing[1])}.` }),
      P.num({ label: "(d)", marks: 1, kind: "money", value: led.closing[2], wrong: [40000, r2(40000 + 3125)], stem: "Calculate Sipho's capital balance after the admission.", explanation: `40,000 - 3,125 = ${fmt(led.closing[2])}.` }),
      P.manual({ label: "(e)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the partners' capital accounts after the admission.", points: ["Opening balances and Sipho's cash entered", "Revaluation profit credited 3 : 1 and reversed 2 : 1 : 1", "Balances carried down correctly"], modelAnswer: led.md, explanation: "One mark per point; follow-through allowed." }),
      P.manual({ label: "(f)", marks: 3, stem: "Explain why Sipho's capital is less than the cash he introduced.", points: ["The assets remain at old values, so Sipho shares in the reversal of the revaluation profit", "He bears 1/4 of the 12,500 profit (3,125) that arose before he joined", "That amount is transferred to Nyasha, who sacrificed a share of profit, so Nyasha is compensated"], modelAnswer: "Because the assets stay at old values the revaluation profit is reversed in the new ratio. Sipho bears 1/4 of the profit, US\\$3,125, which is credited to Nyasha, the partner who gave up some profit share to admit him.", explanation: "One mark per point." }),
    ],
    hints: ["Credit the profit 3 : 1, then reverse it 2 : 1 : 1.", "Net effect = profit × (old share - new share)."],
    explanation: "This item tests a revaluation when the assets remain at old values.",
  });
  void revT;
  void table;
  void sum;
  void check;

  b.card("DEFINITION", "What is a **revaluation account**?", "A temporary account recording increases and decreases in the values of assets and liabilities at a change in a partnership.");
  b.card("FACT", "Entries in the revaluation account", "Debit decreases in assets and increases in liabilities (losses); credit increases in assets (gains).");
  b.card("FACT", "Who shares the revaluation profit?", "The old partners, in the old profit-sharing ratio.");
  b.card("FACT", "Assets left at old values", "Credit the profit to the old partners in the old ratio, then reverse it by debiting all partners in the new ratio.");
  b.card("FORMULA", "Net effect on a partner's capital when assets are not restated", "Revaluation profit × (old share - new share).");
  b.card("FACT", "Allowance for irrecoverable debts on revaluation", "An increase in the allowance is a loss (debit revaluation); a decrease is a gain.");
  b.card("CONCEPT", "Why revalue on a change?", "So the old partners receive gains and bear losses that arose before the change and the new partner pays or receives fair value.");
  b.card("FACT", "Effect on total assets of a revaluation profit", "Total assets increase by the profit and capital increases by the same amount.");
  b.card("CONCEPT", "Is the revaluation account permanent?", "No. It is closed to the capital accounts and does not appear in the statement of financial position.");
});
