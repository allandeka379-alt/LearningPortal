// W3b: company.share-issue
import { concept, P, table, tAccount, journal, chk, r2, ratios } from "../lib.mjs";
import { mc, F, usd } from "../tables/w3b-lib.mjs";

const p1 = (v) => (Math.round(v * 10) / 10).toFixed(1);

concept("aacc.company.share-issue", { file: "company/share-issue", keyPrefix: "company.share-issue" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "When does a company credit an amount to its share premium account?",
    ok: ["When shares are issued at more than their nominal value", "Correct: the excess over nominal value is the premium."],
    bad: [["When shares are issued at exactly their nominal value", "There is no premium at par."], ["When a dividend is paid to the shareholders", "A dividend does not create a premium."], ["When the company makes a profit on the sale of goods", "Trading profits go to retained earnings."]],
    explanation: "Share premium is the excess of the issue price over the nominal value and is credited when the shares are allotted.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "On allotment, the ordinary share capital account is credited with:",
    ok: ["the nominal value of the shares allotted", "Correct: any excess is share premium."],
    bad: [["the nominal value of the shares applied for", "Only shares allotted become capital."], ["the total issue price of the shares allotted", "The premium belongs in the share premium account."], ["the application money received", "Application money is credited to the Application and allotment account."]],
    explanation: "Share capital is credited at nominal value for the shares actually allotted; the premium goes to the share premium account.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION",
    stem: "Which entry records the refund of money to applicants whose applications were rejected?",
    ok: ["Debit Application and allotment account, credit Bank", "Correct: the liability to the applicants is cleared by paying cash out."],
    bad: [["Debit Bank, credit Application and allotment account", "That would record money received."], ["Debit Share capital, credit Bank", "Share capital is not involved in a refund."], ["Debit Share premium, credit Application and allotment account", "The premium is not involved in a refund."]],
    explanation: "The money was credited to the Application and allotment account when received; a refund debits that account and credits Bank.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A company issues 50,000 ordinary shares of US\\$1 each at US\\$1.40. What amount is credited to share premium?",
    ok: ["US\\$20,000", "Correct: 50,000 × US\\$0.40."],
    bad: [["US\\$70,000", "This is the total issue price, not the premium."], ["US\\$50,000", "This is the nominal value."], ["US\\$0.40", "This is the premium per share, not the total."]],
    hints: ["Premium per share × number of shares."],
    explanation: "The premium is US\\$0.40 per share, so 50,000 × US\\$0.40 = US\\$20,000.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A company with loan notes issues new ordinary shares for cash. What is the effect on its gearing?",
    ok: ["Gearing falls, because equity rises and the loan notes stay the same", "Correct: the denominator increases while the numerator is unchanged."],
    bad: [["Gearing rises, because there is more capital employed", "The numerator, the loan notes, has not changed."], ["Gearing is unchanged, because the loan notes are the same", "The denominator has increased."], ["Gearing rises, because the cash is a new liability", "New shares are equity, not a liability."]],
    hints: ["Gearing = non-current liabilities ÷ (shares + reserves + non-current liabilities)."],
    explanation: "Shares increase the denominator without increasing non-current liabilities, so gearing falls.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "For which purpose may a company use its share premium account?",
    ok: ["To issue fully paid bonus shares to its shareholders", "Correct: this is a permitted use of the capital reserve."],
    bad: [["To pay an interim dividend to ordinary shareholders", "Share premium is not distributable as a dividend."], ["To increase the profit for the year", "A capital reserve is not income."], ["To pay the wages of the factory workers", "Share premium is not used for running costs."]],
    hints: ["Think of what a capital reserve may be capitalised for."],
    explanation: "Share premium may be capitalised to issue bonus shares; it cannot be paid as a dividend or taken to profit.",
  });
  mc(b, {
    d: 4, skill: "APPLICATION",
    stem: "Applications were received for 90,000 shares with US\\$0.40 per share paid on application. 60,000 shares were allotted and the surplus application money was kept as part payment of the allotment money of US\\$0.70 per share. How much allotment cash is still to be received?",
    ok: ["US\\$30,000", "Correct: 60,000 × US\\$0.70 = US\\$42,000 less surplus US\\$12,000."],
    bad: [["US\\$42,000", "This ignores the surplus application money carried forward."], ["US\\$54,000", "This subtracts nothing and uses the shares applied for in error."], ["US\\$12,000", "This is the surplus, not the balance due."]],
    hints: ["Surplus = (shares applied for - shares allotted) × application money per share."],
    explanation: "Allotment due = 60,000 × 0.70 = 42,000. Surplus application money = 30,000 × 0.40 = 12,000. Cash still to receive = 42,000 - 12,000 = 30,000.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A company issues shares at full price and has not yet invested the cash. What is the immediate effect on earnings per share?",
    ok: ["It falls, because the same profit is shared among more shares", "Correct: the number of shares has risen while profit has not."],
    bad: [["It rises, because the company has more cash", "Idle cash does not raise profit by itself."], ["It is unchanged, because shareholders' wealth is unchanged", "More shares reduce the earnings per share."], ["It cannot change, because share capital is not part of profit", "EPS depends on the number of shares."]],
    hints: ["EPS = profit ÷ number of shares."],
    explanation: "With the profit unchanged and more shares in issue, EPS is lower until the new funds earn a return.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "The refund of rejected applications is debited to the share capital account.", answer: false, explanation: "False. It is debited to the Application and allotment account; share capital is credited only for shares allotted." });
  b.tf({ d: 3, skill: "APPLICATION", daily: true, stem: "A share issue at a premium has no effect on the profit for the year.", answer: true, hints: ["Where is the premium credited?"], explanation: "True. The premium is a capital reserve in equity, not income in the statement of profit or loss." });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each part of an issue to the account that is credited.",
    pairs: ["Application money received", "Nominal value of shares allotted", "Excess of issue price over nominal value", "Refund to rejected applicants"],
    right: ["Application and allotment account", "Ordinary share capital", "Share premium", "Bank"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Money in is credited to Application and allotment; allotment credits share capital and share premium; a refund credits Bank.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "Application money received is debited to {{blank:a}} and credited to the application and allotment account. The premium is credited to the share {{blank:b}} account.",
    blanks: [{ id: "a", accepted: ["bank"], choices: ["bank", "share capital", "share premium"] }, { id: "b", accepted: ["premium"], choices: ["premium", "capital", "reserve"] }],
    explanation: "Cash received is debited to Bank; the excess over nominal value is credited to share premium.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "What term describes applications for more shares than a company has offered?", accepted: ["oversubscription", "oversubscribed", "over-subscription", "an oversubscribed issue"], explanation: "This is oversubscription." });

  // numerical items, each on its own figures
  const pr = r2(75000 * 0.35);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: pr, calculator: true, daily: true, wrong: [r2(75000 * 1.35), 75000],
    stem: `A company issues ${F(75000)} ordinary shares of US\\$1 each at US\\$1.35. Calculate the amount credited to the share premium account.`,
    explanation: `Premium per share = US\\$0.35. ${F(75000)} × 0.35 = ${usd(pr)}. The total issue price is ${usd(r2(75000 * 1.35))} and the nominal value ${usd(75000)}.`,
  });
  const ap = r2(168000 * 0.45);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: ap, calculator: true, wrong: [r2(120000 * 0.45), r2(168000 * 0.9)],
    stem: `A company offered ${F(120000)} shares. Applications were received for ${F(168000)} shares, with US\\$0.45 per share payable on application. Calculate the total application money received.`,
    explanation: `All applicants pay with their applications, so ${F(168000)} × 0.45 = ${usd(ap)}. The money for shares not allotted is refunded later.`,
  });
  const rf = r2((154000 - 110000) * 0.45);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: rf, calculator: true, wrong: [r2(110000 * 0.45), r2(154000 * 0.45)],
    stem: `A company offered ${F(110000)} shares at US\\$1.60, with US\\$0.45 per share payable on application. Applications were received for ${F(154000)} shares. The company allotted ${F(110000)} shares and refunded the money paid on the other applications. Calculate the amount refunded.`,
    hints: ["Refund the money on the shares not allotted."],
    explanation: `Shares not allotted = ${F(154000)} - ${F(110000)} = ${F(44000)}. Refund = ${F(44000)} × 0.45 = ${usd(rf)}.`,
  });
  const net = r2(95000 * 1.2);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: net, calculator: true, wrong: [r2(95000), r2(130000 * 1.2)],
    stem: `A company issued ${F(95000)} ordinary shares of US\\$0.50 each at US\\$1.20. Applications were received for ${F(130000)} shares; the unsuccessful applications were refunded and all money due from the successful applicants was received. Calculate the net cash received from the issue.`,
    hints: ["Only the shares allotted count in the net cash."],
    explanation: `Net cash = shares allotted × issue price = ${F(95000)} × 1.20 = ${usd(net)}. This is made up of share capital ${usd(r2(95000 * 0.5))} and share premium ${usd(r2(95000 * 0.7))}.`,
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a company records application money in an Application and allotment account instead of crediting share capital at once.",
    points: ["Money is received before the shares are allotted, and some applications may be rejected and refunded", "Shares exist only once they are allotted, so capital and premium can be credited only then"],
    modelAnswer: "Applicants pay before they know whether they will receive shares, and some will be refunded. The share capital and premium are credited only for the shares that are allotted.",
    explanation: "One mark for the timing and refunds, one for crediting capital only on allotment.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Give two advantages and two disadvantages of raising finance by issuing new ordinary shares instead of borrowing.",
    points: ["Advantage: no fixed interest to pay", "Advantage: no repayment date, so the cash is permanent; it also lowers gearing", "Disadvantage: control and profit are shared with new shareholders (dilution of earnings per share)", "Disadvantage: issue costs and the dividend expected by new shareholders may be high"],
    modelAnswer: "New shares carry no compulsory interest and no repayment date, and they lower gearing. However, control and profits are shared with the new owners, and the issue has costs.",
    hints: ["Compare shares with loan notes."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "The directors of a company offer 100,000 shares at a premium of US\\$0.60 but receive applications for 250,000 shares. Explain the choices open to them and the effect on the accounts.",
    points: ["They can allot 100,000 shares and refund the unsuccessful applicants", "Or scale down every application (allotting a fraction) and use the surplus application money against allotment", "Cash received for the shares allotted is the same either way", "Share capital is credited with 100,000 shares at nominal value and share premium with 100,000 × US\\$0.60 = US\\$60,000", "Refunds reduce bank; carrying forward the surplus delays or lowers the allotment cash"],
    modelAnswer: "They can refund the rejected applications, or scale down all applications and use the surplus against the allotment money. In either case 100,000 shares are allotted, so capital is credited at nominal value and US\\$60,000 goes to share premium.",
    hints: ["What happens to the money from the unsuccessful applicants?"],
    explanation: "One mark each for refund, scaling down, same cash, the capital and premium entries and the effect on bank.",
  });

  // Structured 1: 12 marks
  const n = 150000, cn = 210000, ip = 1.25, apx = 0.4, alx = 0.85;
  const rfd = r2((cn - n) * apx), appC = r2(cn * apx), alC = r2(n * alx), cpx = r2(n * 1), prx = r2(n * (ip - 1)), due = r2(n * ip);
  const aaMd = tAccount("Application and allotment account", [["", "Bank (refund)", rfd], ["", "Ordinary share capital", cpx], ["", "Share premium", prx]], [["", "Bank (application money)", appC], ["", "Bank (allotment money)", alC]]);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Gokwe Mills Ltd offered ${F(n)} ordinary shares of US\\$1 each at US\\$${ip.toFixed(2)}, payable US\\$${apx.toFixed(2)} on application and US\\$${alx.toFixed(2)} on allotment (including the premium). Applications were received for ${F(cn)} shares. ${F(n)} shares were allotted and the other applicants were refunded. All allotment money was received.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: prx, wrong: [due, cpx], stem: "Calculate the share premium.", explanation: `${F(n)} × US\\$${(ip - 1).toFixed(2)} = ${usd(prx)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: appC, wrong: [r2(n * apx)], stem: "Calculate the application money received.", explanation: `${F(cn)} × US\\$${apx.toFixed(2)} = ${usd(appC)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: rfd, wrong: [r2(n * apx), appC], stem: "Calculate the amount refunded to unsuccessful applicants.", explanation: `(${F(cn)} - ${F(n)}) × US\\$${apx.toFixed(2)} = ${usd(rfd)}.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: due, wrong: [alC, r2(cn * ip)], stem: "Calculate the net cash received from the issue.", explanation: `${F(n)} × US\\$${ip.toFixed(2)} = ${usd(due)}: application money kept ${usd(appC - rfd)} plus allotment money ${usd(alC)}.` }),
      P.manual({ label: "(e)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the Application and allotment account.", points: ["Debit: refund to Bank " + F(rfd), "Debit: ordinary share capital " + F(cpx) + " and share premium " + F(prx), "Credit: application money " + F(appC) + " and allotment money " + F(alC), "Both sides total " + F(appC + alC) + " (the account balances)"], modelAnswer: aaMd, explanation: "One mark for each group of correct entries and one for the balance." }),
    ],
    hints: ["Premium per share = issue price - nominal value."],
    explanation: "This item tests application money, refunds, premium and the Application and allotment account.",
  });

  // Structured 2: 16 marks
  const sc0 = 480000, sp0 = 40000, re0 = 210000, ln = 250000, ns = 110000, pp = 1.5;
  const capN = r2(ns * 1), premN = r2(ns * (pp - 1)), cashN = r2(ns * pp);
  const g0 = ratios.gearing(ln, sc0 + sp0, re0), g1 = ratios.gearing(ln, sc0 + capN + sp0 + premN, re0);
  const jrn = journal([{ date: "1 Oct", lines: [["Bank", cashN, null], ["Ordinary share capital", null, capN], ["Share premium", null, premN]], narrative: "Issue of 110,000 shares of US\\$1 at US\\$1.50, all paid on application" }], { title: "Journal" });
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Lupane Brickworks Ltd has ${F(sc0)} ordinary shares of US\\$1 each, share premium of ${usd(sp0)}, retained earnings of ${usd(re0)} and 10% loan notes of ${usd(ln)}. On 1 October 2025 it issues ${F(ns)} new ordinary shares of US\\$1 at US\\$${pp.toFixed(2)}, all payable on application, to pay for a second kiln. The issue is fully subscribed. Give percentages to one decimal place.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: premN, wrong: [cashN, capN], stem: "Calculate the share premium arising on the issue.", explanation: `${F(ns)} × US\\$${(pp - 1).toFixed(2)} = ${usd(premN)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: r2(sc0 + capN), wrong: [r2(sc0 + cashN)], stem: "Calculate the issued share capital after the issue.", explanation: `${F(sc0)} + ${F(capN)} = ${usd(sc0 + capN)}.` }),
      P.group({ label: "(c)", stem: "Calculate gearing (as a percentage):", parts: [
        P.num({ label: "(i)", marks: 2, kind: "pct", value: g0, wrong: [(ln / (sc0 + sp0 + re0)) * 100], stem: "before the issue", explanation: `${F(ln)} ÷ ${F(sc0 + sp0 + re0 + ln)} × 100 = ${p1(g0)}%.` }),
        P.num({ label: "(ii)", marks: 2, kind: "pct", value: g1, wrong: [(ln / (sc0 + sp0 + re0 + cashN)) * 100], stem: "after the issue", explanation: `${F(ln)} ÷ ${F(sc0 + sp0 + re0 + cashN + ln)} × 100 = ${p1(g1)}%.` }),
      ] }),
      P.manual({ label: "(d)", marks: 4, stem: "Prepare the journal entry for the issue.", points: ["Debit Bank " + F(cashN), "Credit Ordinary share capital " + F(capN), "Credit Share premium " + F(premN), "A narrative that describes the issue"], modelAnswer: jrn, explanation: "One mark for each line and the narrative." }),
      P.manual({ label: "(e)", marks: 4, type: "EXTENDED_RESPONSE", stem: `Evaluate the decision to raise the money by issuing shares instead of borrowing a further ${usd(cashN)} on 10% loan notes.`, points: [`Shares lower gearing (from ${p1(g0)}% to ${p1(g1)}%) while more loan notes would raise it`, `Loan notes add interest of ${usd(cashN * 0.1)} a year that must be paid even if profit is low; shares carry no fixed payment`, "Shares dilute the control and the earnings per share of the existing shareholders", "Judgement: shares are safer, loan notes cheaper and less dilutive; the choice depends on the expected profit of the kiln"], modelAnswer: `Shares reduce gearing to ${p1(g1)}% and carry no fixed interest, so they are safer. Loan notes would add ${usd(cashN * 0.1)} of interest a year, but would not dilute control. If the kiln's profit is uncertain, shares are the better choice.`, explanation: "One mark each for gearing, interest, dilution and a judgement." }),
    ],
    hints: ["Shares of US\\$1 issued at US\\$1.50 have a premium of US\\$0.50.", "Loan notes are not part of equity."],
    explanation: "This item tests share premium, journal entries, gearing and a comparison of shares with borrowing.",
  });

  b.card("DEFINITION", "What is **share premium**?", "The excess of the issue price of a share over its nominal value; a capital reserve credited on allotment.");
  b.card("FACT", "Entry for application money", "Debit Bank, credit Application and allotment account.");
  b.card("FACT", "Entry on allotment", "Debit Application and allotment with the full price; credit Share capital (nominal value) and Share premium (excess).");
  b.card("FACT", "Entry for a refund", "Debit Application and allotment account, credit Bank.");
  b.card("CONCEPT", "What is **oversubscription**?", "Applications for more shares than offered. The company refunds unsuccessful applicants, or scales down and uses the surplus against allotment money.");
  b.card("FACT", "Uses of share premium", "To issue fully paid bonus shares and to write off the costs of the issue; not to pay ordinary dividends.");
  b.card("CONCEPT", "Effect of a share issue on gearing", "Equity rises while loan notes are unchanged, so gearing falls.");
  b.card("FORMULA", "Net proceeds of an issue", "Shares allotted × issue price = share capital + share premium.");
  b.card("CONCEPT", "Effect of an issue on EPS", "More shares share the same profit, so EPS falls until the new funds earn a return.");
});
void table; void chk;
