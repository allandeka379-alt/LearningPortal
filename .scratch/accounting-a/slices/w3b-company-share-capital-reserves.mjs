// W3b: company.share-capital-reserves
import { concept, P, ZIM, table, statement, chk, r2 } from "../lib.mjs";
import { mc, F, usd, U } from "../tables/w3b-lib.mjs";

concept("aacc.company.share-capital-reserves", { file: "company/share-capital-reserves", keyPrefix: "company.share-capital-reserves" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is a company's authorised share capital?",
    ok: ["The maximum nominal value of shares it is allowed to issue", "Correct: it is a limit set by the constitution."],
    bad: [["The total value of shares that have been paid for by shareholders", "That is the issued and paid-up capital."], ["The market value of all its shares on the stock exchange", "That is the market capitalisation."], ["The shares that the directors own personally", "Authorised capital is not about who holds shares."]],
    explanation: "Authorised capital is the maximum the company may issue; only the issued shares are in the statement of financial position.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of the following is a capital reserve?",
    ok: ["Share premium", "Correct: it arises from selling shares above their nominal value."],
    bad: [["Retained earnings", "These come from retained profits, so they are a revenue reserve."], ["General reserve", "It is a transfer of retained profits, a revenue reserve."], ["Interim dividend", "A dividend is a distribution, not a reserve."]],
    explanation: "Share premium and the revaluation reserve are capital reserves; retained earnings and the general reserve are revenue reserves.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "In which statement are the dividends of a company shown as a deduction?",
    ok: ["The statement of changes in equity", "Correct: they reduce retained earnings."],
    bad: [["The statement of profit or loss", "Dividends are not an expense."], ["The statement of financial position only", "Only an unpaid declared dividend appears there, as a liability."], ["The cash book only", "The cash book records payment but not the deduction from equity."]],
    explanation: "Dividends are a distribution of profit and reduce retained earnings in the statement of changes in equity.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A final dividend was declared on 15 December and remained unpaid at the year end of 31 December. How is it shown at 31 December?",
    ok: ["As a current liability", "Correct: it had been declared, so the company owes it."],
    bad: [["Only in a note to the accounts", "That is for dividends recommended after the year end."], ["As an expense in the statement of profit or loss", "Dividends are not expenses."], ["As an addition to retained earnings", "It reduces retained earnings."]],
    hints: ["Was there an obligation at the year end?"],
    explanation: "A dividend declared before the year end is a liability, so it is a current liability at that date and has already reduced retained earnings.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A company transfers US\\$12,000 from retained earnings to a general reserve. What is the effect on total equity?",
    ok: ["There is no change, because one reserve rises and another falls by the same amount", "Correct: no cash moves and total equity is the same."],
    bad: [["It rises by US\\$12,000, because a new reserve has been created in the books", "A reserve is created, but retained earnings fall by the same amount."], ["It falls by US\\$12,000, because cash is paid out", "No cash is paid out."], ["It falls by US\\$12,000, because the transfer is an expense", "A transfer is not an expense."]],
    hints: ["Both amounts are inside equity."],
    explanation: "A transfer between reserves leaves total equity unchanged; only the labels change.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which reserve cannot be used to pay a dividend?",
    ok: ["The revaluation reserve, because the gain is unrealised", "Correct: the asset has not been sold, so there is no realised profit."],
    bad: [["Retained earnings, because they belong to the lenders", "Retained earnings are distributable."], ["The general reserve, because it has been set aside", "A general reserve is a revenue reserve and can be distributed."], ["All reserves, because dividends come only from cash", "Dividends come from distributable profits, which are not the same as cash."]],
    hints: ["Has the asset been sold?"],
    explanation: "A revaluation gain has not been realised in cash, so the revaluation reserve is not distributable.",
  });
  mc(b, {
    d: 4, skill: "APPLICATION",
    stem: "A company has retained earnings of US\\$36,000, a general reserve of US\\$14,000, share premium of US\\$34,000 and a revaluation reserve of US\\$24,000. What is the largest dividend it may pay out of reserves?",
    ok: ["US\\$50,000", "Correct: retained earnings plus general reserve."],
    bad: [["US\\$108,000", "This adds the capital reserves, which cannot be distributed."], ["US\\$36,000", "This leaves out the general reserve, which is distributable."], ["US\\$84,000", "This adds the share premium, which is not distributable."]],
    hints: ["Which two reserves are revenue reserves?"],
    explanation: "Distributable reserves are retained earnings 36,000 + general reserve 14,000 = 50,000; share premium and the revaluation reserve are not distributable.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "ZIMSEC style. What is the main feature of a preference share?",
    ok: ["A fixed rate of dividend that is paid before any ordinary dividend", "Correct: the dividend has priority over the ordinary dividend."],
    bad: [["A right to vote on every matter in all circumstances", "Preference shares usually carry limited voting rights."], ["A dividend that rises in line with the profit of the company", "The dividend is fixed, not a share of the profit."], ["A claim that ranks behind the ordinary shares if the company closes", "Preference shares rank before the ordinary shares."]],
    explanation: "Preference shares carry a fixed dividend which has priority over the ordinary dividend, and rank before ordinary shares on closure.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Authorised share capital is included in the equity section of the statement of financial position.", answer: false, explanation: "False. Only the issued share capital forms part of equity; the authorised capital is shown in a note." });
  b.tf({ d: 3, skill: "UNDERSTANDING", daily: true, stem: "A final dividend recommended by the directors after the year end is a liability at the year end.", answer: false, hints: ["Was it declared before the year end?"], explanation: "False. There was no obligation at the year end; the dividend is disclosed in a note." });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each item to its type.",
    pairs: ["Share premium", "Retained earnings", "Revaluation reserve", "Ordinary share capital"],
    right: ["Capital reserve", "Revenue reserve", "Unrealised capital reserve", "Share capital"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Share premium and the revaluation reserve are capital reserves (the latter from an unrealised gain); retained earnings are a revenue reserve; share capital is not a reserve.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Only {{blank:a}} share capital forms part of equity. A dividend is a distribution of {{blank:b}} and is not an expense.",
    blanks: [{ id: "a", accepted: ["issued"], choices: ["issued", "authorised", "market"] }, { id: "b", accepted: ["profit"], choices: ["profit", "capital", "revenue"] }],
    explanation: "Issued shares are in equity; a dividend is a share of profit.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "What name is given to the amount by which the issue price of a share exceeds its nominal value?", accepted: ["share premium", "premium"], explanation: "It is the share premium, a capital reserve." });

  // numerical items, each on its own figures
  const iv = r2(350000 * 0.03);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: iv, calculator: true, daily: true, wrong: [350000 * 3, r2(350000 * 0.3)],
    stem: `A company has ${F(350000)} ordinary shares of US\\$1 each in issue. It pays an interim dividend of 3 cents per share. Calculate the total dividend paid.`,
    explanation: `${F(350000)} × US\\$0.03 = ${usd(iv)}. Using 3 dollars per share would give ${usd(350000 * 3)}.`,
  });
  const reClose = r2(61300 + 47800 - 7500 - 9500 - 12500);
  chk(reClose, 79600);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: reClose, calculator: true, wrong: [r2(61300 + 47800), r2(61300 + 47800 - 7500)],
    stem: `A company's retained earnings were ${usd(61300)} at 1 January. The profit for the year was ${usd(47800)}. The directors transferred ${usd(7500)} to a general reserve, paid an interim dividend of ${usd(9500)} and declared a final dividend of ${usd(12500)} before the year end. Calculate retained earnings at 31 December.`,
    hints: ["Deduct the transfer and both dividends."],
    explanation: `${F(61300)} + ${F(47800)} - ${F(7500)} - ${F(9500)} - ${F(12500)} = ${F(reClose)}. Forgetting the dividends gives ${F(61300 + 47800)}.`,
  });
  const eq = r2(180000 + 24000 + 15000 + 9000 + 52500);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: eq, calculator: true, wrong: [r2(180000 + 24000 + 15000 + 9000 + 52500 + 220000)],
    stem: `A company has issued ordinary share capital of ${usd(180000)}, share premium of ${usd(24000)}, a revaluation reserve of ${usd(15000)}, a general reserve of ${usd(9000)} and retained earnings of ${usd(52500)}. Its authorised share capital is ${usd(220000)}. Calculate total equity.`,
    explanation: `${F(180000)} + ${F(24000)} + ${F(15000)} + ${F(9000)} + ${F(52500)} = ${F(eq)}. The authorised capital is a note and is not added.`,
  });
  const pd = r2(80000 * 0.07);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: pd, calculator: true, applies: ZIM, wrong: [r2(80000 * 0.7), r2(80000 / 0.07)],
    stem: `ZIMSEC style. A company has issued ${F(80000)} 7% preference shares of US\\$1 each. Calculate the annual preference dividend.`,
    hints: ["The rate is applied to the nominal value."],
    explanation: `7% × ${usd(80000)} = ${usd(pd)}. The dividend is a fixed percentage of the nominal value.`,
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a company is not allowed to pay a dividend out of its share premium.",
    points: ["The share premium is a capital reserve, not a profit made from trading", "It protects creditors, who rely on the capital of the company not being returned to the owners"],
    modelAnswer: "Share premium is capital contributed by shareholders, not profit. Keeping it in the company protects the creditors.",
    explanation: "One mark for capital not profit and one for the protection of creditors.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Explain the difference between an interim dividend and a final dividend and how each is treated at the year end.",
    points: ["An interim dividend is paid during the year; a final dividend is recommended after the year end and approved at the annual general meeting", "A paid interim dividend reduces retained earnings and cash", "A final dividend declared before the year end and unpaid is a current liability", "A final dividend recommended after the year end is only a note, not a liability"],
    modelAnswer: "An interim dividend is paid during the year and reduces retained earnings and cash. A final dividend is approved after the year end; if declared before the year end and unpaid it is a current liability, but if recommended later it is only a note.",
    hints: ["Ask whether there was an obligation at the year end."],
    explanation: "One mark for each of the four points.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "The directors of a company with a retained earnings balance of US\\$18,000 and a revaluation reserve of US\\$54,000 propose to pay a dividend of US\\$35,000, arguing that total reserves are US\\$72,000. Advise the directors.",
    points: ["The revaluation reserve is not distributable because the gain is unrealised", "Only retained earnings of US\\$18,000 (and any general reserve) are distributable", "A dividend of US\\$35,000 is more than the distributable reserves", "Paying it would return capital to the owners at the expense of the creditors", "Recommendation: pay no more than US\\$18,000, or wait until the profit has been realised"],
    modelAnswer: "The revaluation reserve cannot be distributed because the gain is unrealised. Distributable reserves are only US\\$18,000, so a dividend of US\\$35,000 would return capital to the owners at the creditors' expense. The directors should pay no more than US\\$18,000.",
    hints: ["Which of the two reserves can be distributed?"],
    explanation: "One mark each for the unrealised gain, the distributable limit, the comparison, the creditors and the recommendation.",
  });

  // Structured 1: 12 marks
  const iss = 250000, spv = 37500, rv = 23500, gn = 18000, rt = 64500, au = 450000;
  const total1 = r2(iss + spv + rv + gn + rt);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `At 31 December 2025 Nyanga Lodges Ltd has these balances. Its authorised share capital is ${F(au)} ordinary shares of US\\$1 each, of which ${F(iss)} are issued and fully paid.\n\n${table(["Account", "US\\$"], [["Share premium", spv], ["Revaluation reserve", rv], ["General reserve", gn], ["Retained earnings", rt]])}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: r2(spv + rv + gn + rt), wrong: [total1], stem: "Calculate the total of the reserves.", explanation: `${F(spv)} + ${F(rv)} + ${F(gn)} + ${F(rt)} = ${F(spv + rv + gn + rt)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: total1, wrong: [r2(au + spv + rv + gn + rt)], stem: "Calculate total equity.", explanation: `Issued ${F(iss)} + reserves ${F(spv + rv + gn + rt)} = ${F(total1)}. The authorised capital is not added.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: r2(gn + rt), wrong: [r2(spv + rv + gn + rt)], stem: "Calculate the reserves that are available for distribution as dividends.", explanation: `General reserve ${F(gn)} + retained earnings ${F(rt)} = ${F(gn + rt)}.` }),
      P.fib({ label: "(d)", marks: 2, stem: "Complete the statement.", template: "The share premium is a {{blank:a}} reserve and the general reserve is a {{blank:b}} reserve.", blanks: [{ id: "a", accepted: ["capital"], choices: ["capital", "revenue"] }, { id: "b", accepted: ["revenue"], choices: ["capital", "revenue"] }], explanation: "Share premium arises from a capital transaction; the general reserve comes from retained profit." }),
      P.manual({ label: "(e)", marks: 4, stem: "Explain why the revaluation reserve is not available for distribution, and why the authorised share capital is not part of equity.", points: ["The revaluation gain is unrealised: the asset has not been sold", "Distributing it would return capital to the owners at the expense of the creditors", "Authorised share capital is only the maximum number of shares the company may issue", "Only issued shares represent money contributed by the shareholders"], modelAnswer: "The revaluation gain has not been realised in cash and distributing it would harm creditors. The authorised capital is just a limit; only issued shares are contributed capital and part of equity.", explanation: "One mark for each of the four points." }),
    ],
    hints: ["Distributable reserves are the revenue reserves."],
    explanation: "This item tests the equity section, the classification of reserves and the limit on dividends.",
  });

  // Structured 2: 16 marks, statement of changes in equity
  const sc = 200000, spp = 22000, gnn = 15000, ret = 48000, prf = 36500, tg = 5000, ps = 200000 * 0.03, fd = 8000;
  const retC = r2(ret + prf - tg - ps - fd);
  chk(retC, 65500);
  const eqO = r2(sc + spp + gnn + ret), eqC = r2(sc + spp + gnn + tg + retC);
  const sceMd = statement("Statement of changes in equity for the year ended 31 December 2025", [
    ["Balance at 1 January 2025", sc, spp, gnn, ret, eqO],
    ["Profit for the year", null, null, null, prf, prf],
    ["Transfer to general reserve", null, null, tg, -tg, 0],
    ["Interim dividend paid", null, null, null, -ps, -ps],
    ["Final dividend declared", null, null, null, -fd, -fd],
    ["**Balance at 31 December 2025**", sc, spp, gnn + tg, retC, eqC],
  ], { cols: ["Share capital", "Share premium", "General reserve", "Retained earnings", "Total"], checks: [["total", eqC, eqO + prf - ps - fd]] });
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Masvingo Crafts Ltd has ${F(sc)} ordinary shares of US\\$1 each, fully paid. At 1 January 2025 its share premium was ${usd(spp)}, its general reserve ${usd(gnn)} and its retained earnings ${usd(ret)}. During 2025 the profit for the year was ${usd(prf)}. The directors transferred ${usd(tg)} to the general reserve, paid an interim dividend of 3 cents per share and declared a final dividend of ${usd(fd)} before the year end. The final dividend was unpaid at 31 December 2025.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: ps, wrong: [ps * 100, fd], stem: "Calculate the interim dividend paid.", explanation: `${F(sc)} × 3 cents = ${usd(ps)}.` }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: retC, wrong: [r2(ret + prf), r2(ret + prf - tg)], stem: "Calculate retained earnings at 31 December 2025.", explanation: `${F(ret)} + ${F(prf)} - ${F(tg)} - ${F(ps)} - ${F(fd)} = ${F(retC)}.` }),
      P.mcq({ label: "(c)", marks: 1, stem: "How is the final dividend shown at 31 December 2025?", options: [["As a current liability of US\\$8,000", "Correct: it was declared before the year end and is unpaid."], ["Only in a note to the accounts", "It is a note only if recommended after the year end."], ["As an expense in the statement of profit or loss", "Dividends are not expenses."], ["As a non-current liability", "It is due within a year."]], answer: "A", explanation: "A dividend declared before the year end and unpaid is a current liability." }),
      P.manual({ label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare the statement of changes in equity for the year ended 31 December 2025.", points: ["Heading with the company name, statement and date", `Opening balances ${F(sc)}, ${F(spp)}, ${F(gnn)} and ${F(ret)} (total ${F(eqO)})`, `Profit for the year ${F(prf)} in retained earnings`, `Transfer of ${F(tg)} out of retained earnings into the general reserve`, `Dividends ${F(ps)} and ${F(fd)} deducted from retained earnings`, `Closing balances, with total equity ${F(eqC)}`], modelAnswer: sceMd, explanation: "One mark for each line of the layout; allow follow-through." }),
      P.num({ label: "(e)", marks: 2, kind: "money", value: eqC, wrong: [eqO], stem: "State total equity at 31 December 2025.", explanation: `${F(sc)} + ${F(spp)} + ${F(gnn + tg)} + ${F(retC)} = ${F(eqC)}.` }),
      P.manual({ label: "(f)", marks: 2, stem: "State two reasons why the directors transfer profit to a general reserve instead of paying it all as dividends.", points: ["To keep funds in the business for expansion or replacement of assets", "To show that the amount is not intended for distribution, so it supports the confidence of lenders"], modelAnswer: "The profit can be kept for expansion or replacement of assets, and the transfer shows lenders that it is not intended to be paid out.", explanation: "One mark for each valid reason." }),
    ],
    hints: ["The transfer is between two reserves.", "The final dividend was declared before the year end."],
    explanation: "This item tests retained earnings, the statement of changes in equity and the treatment of dividends.",
  });

  b.card("DEFINITION", "What is **authorised share capital**?", "The maximum nominal value of shares a company may issue; it is a note, not part of equity.");
  b.card("DEFINITION", "What is a **capital reserve**?", "A reserve from a capital event, such as share premium or a revaluation gain; it cannot be paid out as a dividend.");
  b.card("DEFINITION", "What is a **revenue reserve**?", "A reserve from retained profit, such as a general reserve or retained earnings; it can be distributed.");
  b.card("FACT", "Where are dividends shown?", "In the statement of changes in equity, reducing retained earnings. They are not an expense.");
  b.card("FACT", "Final dividend and the year end", "Declared before the year end and unpaid: a current liability. Recommended after the year end: a note only.");
  b.card("FACT", "Effect of a transfer to the general reserve", "Retained earnings fall and the general reserve rises by the same amount; total equity and cash do not change.");
  b.card("FORMULA", "Total equity", "Issued share capital + share premium + other capital reserves + revenue reserves + retained earnings.");
  b.card("DEFINITION", "What is a **preference share** (ZIMSEC)?", "A share with a fixed rate of dividend paid before any ordinary dividend; cumulative preference shares carry forward unpaid dividends.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Why are unrealised gains not distributable?", "The gain exists only on paper; paying it out would return capital to the owners and harm the creditors.");
});
void statement; void U;
