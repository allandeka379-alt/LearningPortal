// W3b: company.bonus-rights
import { concept, P, table, journal, statement, chk, r2, ratios, company } from "../lib.mjs";
import { mc, F, usd } from "../tables/w3b-lib.mjs";

concept("aacc.company.bonus-rights", { file: "company/bonus-rights", keyPrefix: "company.bonus-rights" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What does a company receive from a bonus issue?",
    ok: ["No cash at all", "Correct: reserves are converted into share capital."],
    bad: [["Cash equal to the nominal value of the new shares", "Shareholders pay nothing for bonus shares."], ["Cash equal to the market value of the new shares", "No cash is raised."], ["A premium from each existing shareholder", "No premium is paid."]],
    explanation: "A bonus issue is paid for out of reserves; no cash is received.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which entry records a bonus issue of fully paid shares?",
    ok: ["Debit reserves, credit ordinary share capital", "Correct: reserves are capitalised."],
    bad: [["Debit bank, credit ordinary share capital", "Bank is debited only when cash is received."], ["Debit ordinary share capital, credit reserves", "This would reduce the share capital."], ["Debit bank, credit share premium", "No cash is received and nothing is premium."]],
    explanation: "A bonus issue transfers an amount from reserves to share capital.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "To whom is a rights issue offered?",
    ok: ["Existing shareholders, at a price below the market price", "Correct: they have the first right to buy."],
    bad: [["Any member of the public who applies, at the full market price", "That is a public offer."], ["Existing shareholders, free of charge", "That is a bonus issue."], ["Only the directors, at nominal value", "A rights issue is open to all existing shareholders."]],
    explanation: "A rights issue gives existing shareholders the right to buy new shares, usually below the market price.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A company with 600,000 ordinary shares of US\\$1 each makes a bonus issue of one for every four held. What amount is transferred from reserves to share capital?",
    ok: ["US\\$150,000", "Correct: 150,000 new shares at US\\$1."],
    bad: [["US\\$600,000", "This is the existing share capital."], ["US\\$200,000", "This uses one for every three."], ["US\\$120,000", "This uses one for every five."]],
    hints: ["New shares = 600,000 ÷ 4."],
    explanation: "600,000 ÷ 4 = 150,000 new shares, each with a nominal value of US\\$1, so US\\$150,000 is capitalised.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which reserve is not used to pay for a bonus issue in Cambridge questions?",
    ok: ["The revaluation reserve", "Correct: it is an unrealised gain."],
    bad: [["The general reserve", "A general reserve is distributable and can be used."], ["Retained earnings", "Retained earnings can be capitalised."], ["The share premium account", "Share premium may be used for fully paid bonus shares."]],
    hints: ["Which reserve comes from a gain that is not yet realised?"],
    explanation: "Cambridge questions do not use the revaluation reserve for a bonus issue; the share premium and the revenue reserves are used.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "What is the effect of a bonus issue on total equity?",
    ok: ["None; one part of equity rises and another falls by the same amount", "Correct: reserves become share capital."],
    bad: [["It rises by the nominal value of the new bonus shares that are issued", "No new resources enter the company."], ["It falls by the value of the new shares", "Nothing is paid out."], ["It rises by the cash received from shareholders", "Shareholders pay nothing for a bonus issue."]],
    hints: ["Both sides of the entry are inside equity."],
    explanation: "A bonus issue is a transfer within equity, so total equity is unchanged.",
  });
  mc(b, {
    d: 4, skill: "APPLICATION",
    stem: "A company with 300,000 ordinary shares of US\\$1 each makes a rights issue of one for every three held at US\\$1.40. What amount is credited to the share premium account?",
    ok: ["US\\$40,000", "Correct: 100,000 shares × US\\$0.40."],
    bad: [["US\\$140,000", "This is the total cash received."], ["US\\$100,000", "This is the nominal value of the new shares."], ["US\\$120,000", "This uses the wrong number of new shares."]],
    hints: ["New shares = 300,000 ÷ 3."],
    explanation: "New shares = 100,000. Premium per share = US\\$0.40, so the credit to share premium is 100,000 × US\\$0.40 = US\\$40,000.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A shareholder does not take up a rights issue and does not sell the rights. What is the result?",
    ok: ["The shareholder keeps the same shares but owns a smaller percentage of the company", "Correct: the number of shares in issue has risen."],
    bad: [["The shareholder loses the existing shares because the rights have lapsed", "Existing shares are not affected."], ["The shareholder's percentage of the company is unchanged", "More shares are in issue, so the percentage falls."], ["The shareholder receives a refund of the rights price", "No money has been paid."]],
    hints: ["Compare the shareholder's shares with the total in issue."],
    explanation: "Other shareholders buy the new shares, so the number in issue rises and this shareholder's percentage falls (dilution).",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A bonus issue increases the total equity of the company.", answer: false, explanation: "False. A bonus issue only transfers reserves to share capital; total equity is unchanged." });
  b.tf({ d: 3, skill: "UNDERSTANDING", daily: true, stem: "A rights issue raises cash for the company, but a bonus issue does not.", answer: true, hints: ["Who pays for the new shares?"], explanation: "True. Shareholders pay for rights shares, but bonus shares are paid for from reserves." });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each statement to the type of issue it describes.",
    pairs: ["Shareholders pay a price below the market price", "No cash is received by the company", "Bank is debited and share premium is credited", "Reserves are debited and share capital is credited"],
    right: ["Rights issue", "Bonus issue"],
    rightIndex: [0, 1, 0, 1],
    explanation: "Rights issues involve cash from shareholders; bonus issues convert reserves into capital.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "A bonus issue is also called a {{blank:a}} issue. In a rights issue the shares are offered to {{blank:b}} shareholders.",
    blanks: [{ id: "a", accepted: ["capitalisation"], choices: ["capitalisation", "public", "premium"] }, { id: "b", accepted: ["existing"], choices: ["existing", "new", "preference"] }],
    explanation: "A bonus issue capitalises reserves; a rights issue is made to the existing shareholders.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "Name the reserve that may be used, together with revenue reserves, to pay for a bonus issue but is a capital reserve created when shares were sold above par.", accepted: ["share premium", "the share premium account", "share premium account"], explanation: "The share premium account may be used to issue fully paid bonus shares." });

  // numerical items on their own figures
  const ns1 = company.bonusIssue({ held: 720000, newPerOld: [1, 6], par: 1 });
  chk(ns1.newShares, 120000);
  b.num({
    d: 2, skill: "APPLICATION", kind: "units", value: r2(ns1.newShares), calculator: true, daily: true, wrong: [720000 / 5, 720000 * 6],
    stem: `A company has ${F(720000)} ordinary shares. It makes a bonus issue of one new share for every six held. Calculate the number of new shares issued.`,
    explanation: `${F(720000)} ÷ 6 = ${F(ns1.newShares)} new shares. Dividing by 5 would be one for five.`,
  });
  const ns2 = company.bonusIssue({ held: 450000, newPerOld: [2, 5], par: 0.5 });
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: r2(ns2.fromReserves), calculator: true, wrong: [r2(450000 * 0.5), r2(180000)],
    stem: `A company has ${F(450000)} ordinary shares of US\\$0.50 each. It makes a bonus issue of two new shares for every five held, paid for out of reserves. Calculate the amount transferred from reserves to share capital.`,
    hints: ["New shares × nominal value."],
    explanation: `New shares = ${F(450000)} × 2 ÷ 5 = ${F(ns2.newShares)}. Amount = ${F(ns2.newShares)} × US\\$0.50 = ${usd(ns2.fromReserves)}. The nominal value is US\\$0.50, not US\\$1.`,
  });
  const ri = company.rightsIssue({ held: 280000, newPerOld: [1, 4], par: 1, price: 1.75 });
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: r2(ri.cash), calculator: true, wrong: [ri.capital, r2(280000 * 1.75)],
    stem: `A company has ${F(280000)} ordinary shares of US\\$1 each. It makes a rights issue of one new share for every four held at US\\$1.75 per share and all the rights are taken up. Calculate the cash received.`,
    explanation: `New shares = ${F(280000)} ÷ 4 = ${F(ri.newShares)}. Cash = ${F(ri.newShares)} × US\\$1.75 = ${usd(ri.cash)}.`,
  });
  const ri3 = company.rightsIssue({ held: 360000, newPerOld: [1, 4], par: 1, price: 1.55 });
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: r2(ri3.premium), calculator: true, wrong: [ri3.cash, ri3.capital],
    stem: `A company has ${F(360000)} ordinary shares of US\\$1 each. It makes a rights issue of one new share for every four held at US\\$1.55 per share, and all the rights are taken up. Calculate the amount credited to share premium.`,
    hints: ["Premium per share = issue price - nominal value."],
    explanation: `New shares = ${F(360000)} ÷ 4 = ${F(ri3.newShares)}. Premium per share = US\\$0.55. ${F(ri3.newShares)} × 0.55 = ${usd(ri3.premium)}. The remainder, ${usd(ri3.capital)}, is share capital.`,
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a company might make a bonus issue although it receives no cash.",
    points: ["It brings the share capital closer to the capital employed in the business by capitalising reserves that will not be distributed", "The market price per share falls, making the shares easier to buy and sell"],
    modelAnswer: "The reserves are permanently invested in the business, so converting them to share capital shows this. The lower price per share also makes the shares easier to trade.",
    explanation: "One mark for each reason.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Give two advantages and two disadvantages of a rights issue for the company compared with a public offer of shares.",
    points: ["Advantage: it is cheaper to arrange, since it goes to existing shareholders who know the company", "Advantage: control remains with the present owners in proportion", "Disadvantage: the price must be set below the market price to attract the shareholders, so less cash is raised per share", "Disadvantage: shareholders may not have the cash, so the issue may be only partly taken up"],
    modelAnswer: "A rights issue is cheaper and keeps control with the present owners. However, the discount means less cash per share, and some shareholders may not take up their rights.",
    hints: ["Compare the cost, control and the price."],
    explanation: "One mark each for the four points.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "A shareholder holds 8,000 shares in a company that makes a rights issue of one for four at a price below the market price. Advise the shareholder on the options and the likely effect of each.",
    points: ["Take up the rights by buying 2,000 new shares: keeps the same percentage ownership but needs cash", "Sell the rights to another investor: receives money and is diluted", "Do nothing: the shareholder's percentage falls and the value of the right is lost", "The new shares are cheaper than the market price, so the right has value", "Recommendation: take up the rights if cash is available; otherwise sell them rather than let them lapse"],
    modelAnswer: "The shareholder can buy 2,000 shares to keep the same share of the company, sell the rights for cash, or do nothing. Doing nothing loses the value of the rights and dilutes the holding. If cash is available the shareholder should take up the rights; otherwise sell them.",
    hints: ["The rights have value because the price is below the market price."],
    explanation: "One mark for each option, one for the value of the right and one for a recommendation.",
  });

  // Structured 1: 12 marks, bonus issue
  const s0 = { sc: 360000, sp: 45000, gr: 30000, re: 120000, rv: 25000 };
  const bn = company.bonusIssue({ held: s0.sc, newPerOld: [1, 3], par: 1 });
  const fromRE = r2(bn.fromReserves - s0.gr - s0.sp);
  const s1 = { sc: s0.sc + bn.fromReserves, sp: 0, gr: 0, re: s0.re - fromRE, rv: s0.rv };
  const eqB = r2(s0.sc + s0.sp + s0.gr + s0.re + s0.rv);
  const eqA = r2(s1.sc + s1.sp + s1.gr + s1.re + s1.rv);
  chk(eqA, eqB);
  const jr1 = journal([{ date: "1 Nov", lines: [["General reserve", s0.gr, null], ["Share premium", s0.sp, null], ["Retained earnings", fromRE, null], ["Ordinary share capital", null, bn.fromReserves]], narrative: "Bonus issue of 120,000 shares of US\\$1, one for every three held" }], { title: "Journal" });
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Bindura Cement Ltd has ${F(s0.sc)} ordinary shares of US\\$1 each. Its reserves are share premium ${usd(s0.sp)}, general reserve ${usd(s0.gr)}, revaluation reserve ${usd(s0.rv)} and retained earnings ${usd(s0.re)}. The directors make a bonus issue of one new share for every three held. They use the general reserve and the share premium in full, and retained earnings for the remainder. The revaluation reserve is not used.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "units", value: r2(bn.newShares), wrong: [s0.sc / 4, s0.sc * 3], stem: "Calculate the number of bonus shares issued.", explanation: `${F(s0.sc)} ÷ 3 = ${F(bn.newShares)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: fromRE, wrong: [bn.fromReserves, s0.re], stem: "Calculate the amount taken from retained earnings.", explanation: `Total capitalised ${F(bn.fromReserves)} - general reserve ${F(s0.gr)} - share premium ${F(s0.sp)} = ${F(fromRE)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: s1.re, wrong: [s0.re], stem: "Calculate retained earnings after the issue.", explanation: `${F(s0.re)} - ${F(fromRE)} = ${F(s1.re)}.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: eqA, wrong: [r2(eqB + bn.fromReserves)], stem: "Calculate total equity after the issue.", explanation: `Equity is unchanged at ${F(eqB)}: share capital ${F(s1.sc)} + revaluation reserve ${F(s1.rv)} + retained earnings ${F(s1.re)} = ${F(eqA)}.` }),
      P.manual({ label: "(e)", marks: 4, stem: "Prepare the journal entry for the bonus issue.", points: ["Debit General reserve " + F(s0.gr), "Debit Share premium " + F(s0.sp) + " and Retained earnings " + F(fromRE), "Credit Ordinary share capital " + F(bn.fromReserves), "A narrative describing the issue"], modelAnswer: jr1, explanation: "One mark for each group of lines and the narrative." }),
    ],
    hints: ["Total capitalised = new shares × US\\$1."],
    explanation: "This item tests the bonus shares, the use of reserves and the journal.",
  });

  // Structured 2: 16 marks, rights issue
  const r0 = { sc: 250000, sp: 30000, re: 135000, bank: 70000 };
  const ri2 = company.rightsIssue({ held: r0.sc, newPerOld: [1, 5], par: 1, price: 1.8 });
  const eqR0 = r2(r0.sc + r0.sp + r0.re), eqR1 = r2(eqR0 + ri2.cash);
  const jr2 = journal([{ date: "1 Mar", lines: [["Bank", ri2.cash, null], ["Ordinary share capital", null, ri2.capital], ["Share premium", null, ri2.premium]], narrative: "Rights issue of 50,000 shares of US\\$1 at US\\$1.80, one for every five held" }], { title: "Journal" });
  const hold = 10000, takeUp = hold / 5, cost = r2(takeUp * 1.8);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Plumtree Foods Ltd has ${F(r0.sc)} ordinary shares of US\\$1 each, share premium of ${usd(r0.sp)}, retained earnings of ${usd(r0.re)} and cash of ${usd(r0.bank)}. On 1 March 2025 it makes a rights issue of one new share for every five held at US\\$1.80 per share. All the rights are taken up.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "units", value: r2(ri2.newShares), wrong: [r0.sc / 4, r0.sc * 5], stem: "Calculate the number of new shares.", explanation: `${F(r0.sc)} ÷ 5 = ${F(ri2.newShares)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: r2(ri2.cash), wrong: [ri2.capital], stem: "Calculate the cash raised.", explanation: `${F(ri2.newShares)} × US\\$1.80 = ${usd(ri2.cash)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: r2(r0.sp + ri2.premium), wrong: [ri2.premium], stem: "Calculate the share premium account balance after the issue.", explanation: `${F(r0.sp)} + ${F(ri2.newShares)} × US\\$0.80 = ${F(r0.sp)} + ${F(ri2.premium)} = ${usd(r0.sp + ri2.premium)}.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: eqR1, wrong: [eqR0, r2(eqR0 + ri2.capital)], stem: "Calculate total equity after the issue.", explanation: `${F(eqR0)} + cash raised ${F(ri2.cash)} = ${F(eqR1)}.` }),
      P.manual({ label: "(e)", marks: 4, stem: "Prepare the journal entry for the rights issue.", points: ["Debit Bank " + F(ri2.cash), "Credit Ordinary share capital " + F(ri2.capital), "Credit Share premium " + F(ri2.premium), "A narrative describing the issue"], modelAnswer: jr2, explanation: "One mark for each line and the narrative." }),
      P.num({ label: "(f)", marks: 2, kind: "money", value: cost, wrong: [hold * 1.8, takeUp], stem: `A shareholder owns ${F(hold)} shares. Calculate the cost of taking up the full rights.`, explanation: `The shareholder may buy ${F(takeUp)} shares at US\\$1.80, which costs ${usd(cost)}.` }),
      P.manual({ label: "(g)", marks: 2, stem: "Explain one disadvantage to a shareholder who does not take up the rights and does not sell them.", points: ["The shareholder's percentage of the company falls because more shares are issued", "The value of the right, which is the discount on the market price, is lost"], modelAnswer: "The holding is diluted because other people buy the new shares, and the benefit of buying at a discount is lost.", explanation: "One mark for dilution and one for the lost value." }),
    ],
    hints: ["Premium per share = 1.80 - 1.00.", "Equity rises by the cash raised."],
    explanation: "This item tests the arithmetic and journal of a rights issue and the position of a shareholder.",
  });

  b.card("DEFINITION", "What is a **bonus issue**?", "Fully paid shares given to existing shareholders in proportion to their holdings, paid for by converting reserves into share capital; no cash.");
  b.card("DEFINITION", "What is a **rights issue**?", "An offer of new shares to existing shareholders, below the market price, in proportion to their holdings; the company receives cash.");
  b.card("FACT", "Journal for a bonus issue", "Debit reserves (share premium, general reserve, retained earnings); credit ordinary share capital at nominal value. Total equity is unchanged.");
  b.card("FACT", "Journal for a rights issue", "Debit Bank with the cash; credit share capital (nominal value) and share premium (excess).");
  b.card("FACT", "Reserves used for a bonus issue", "Share premium and distributable reserves; not the revaluation reserve in Cambridge questions.");
  b.card("CONCEPT", "Effect on the number of shares", "Both issues increase the shares in issue, so EPS and the market price per share fall.");
  b.card("CONCEPT", "Dilution", "A shareholder who does not take up a rights issue owns a smaller percentage of the company.");
  b.card("CONCEPT", "Bonus issue and shareholder wealth", "More shares at a lower price: the total value of the holding is unchanged.");
  b.card("FORMULA", "New shares from a ratio", "Existing shares × new ÷ old; for 'one for every five held' divide by five.");
});
void table; void statement; void ratios;
