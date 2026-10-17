// W1a: capital.sources-of-capital (preference shares and convertible loan stock items are ZIMSEC only)
import { concept, P, table, check, sum, r2, fmt, money, ratios, company, ZIM, chk } from "../lib.mjs";
import { mc } from "../tables/w1a-lib.mjs";

concept("aacc.capital.sources-of-capital", { file: "capital/sources-of-capital", keyPrefix: "capital.sources-of-capital" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which source of long-term finance normally carries voting rights in a company?",
    ok: ["Ordinary shares", "Correct: ordinary shareholders vote on the company's affairs."],
    bad: [["Loan notes", "Loan note holders are lenders and have no vote."], ["Bank overdraft", "An overdraft is short-term borrowing."], ["Trade payables", "Suppliers are creditors, not owners."]],
    explanation: "Ordinary shareholders own the company and vote at meetings.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Where is the interest on loan notes shown in a company's financial statements?",
    ok: ["As an expense in the statement of profit or loss", "Correct: interest is a finance cost."],
    bad: [["As a deduction from capital", "Interest is not charged directly against capital."], ["As a dividend in the statement of changes in equity", "Dividends are distributions of profit; interest is not."], ["As a current asset", "Interest paid is not an asset."]],
    explanation: "Loan interest is an expense, charged before profit is calculated.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is a **bonus issue** of shares?",
    ok: ["New shares given free to existing shareholders in proportion to their holdings, paid for from reserves", "Correct: no cash is received."],
    bad: [["New shares sold to existing shareholders at a price below market value", "That is a rights issue."], ["New shares sold to the public", "That is a public issue."], ["Shares exchanged for loan notes", "That is a conversion."]],
    explanation: "A bonus issue converts reserves into share capital without raising cash.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main purpose of a **rights issue**?",
    ok: ["To raise cash from existing shareholders without diluting their proportion of ownership", "Correct: they have the first right to buy the new shares."],
    bad: [["To give shares free from reserves", "That is a bonus issue."], ["To repay loan notes with interest", "That is a redemption."], ["To avoid paying dividends", "A rights issue does not stop dividends."]],
    explanation: "A rights issue offers new shares to existing holders in proportion to their holdings, raising cash.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Why does high gearing increase the risk for a company's ordinary shareholders?",
    ok: ["Interest on borrowing must be paid even when profits are low, leaving less for dividends", "Correct: fixed commitments come before shareholders."],
    bad: [["Loan note holders gain control of the company", "Lenders do not normally gain control."], ["Interest is not tax-deductible", "Interest is normally deductible."], ["It automatically reduces the share price to zero", "Gearing raises risk; it does not determine the price."]],
    hints: ["Who is paid first when profit is low?"],
    explanation: "Interest is a fixed charge, so profit available for shareholders falls more sharply when profit drops.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING", applies: ZIM,
    stem: "What is a feature of preference shares?",
    ok: ["They receive a fixed dividend before any dividend is paid to ordinary shareholders", "Correct: this is their main feature."],
    bad: [["They always carry more votes than ordinary shares", "They normally carry no vote."], ["The dividend is an expense in the statement of profit or loss", "It is a distribution of profit."], ["They must be repaid on a fixed date in every case", "Only redeemable preference shares are repaid."]],
    hints: ["Think about the order in which dividends are paid."],
    explanation: "Preference shareholders have priority for a fixed dividend, usually without voting rights.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "What is an advantage to a company of raising money by loan notes rather than by issuing new ordinary shares?",
    ok: ["Control of existing shareholders is not diluted and the interest is an allowable expense", "Correct: no new voters and the interest reduces taxable profit."],
    bad: [["There is no commitment to pay anything to the lenders", "Interest and repayment are compulsory."], ["Gearing falls", "Gearing rises with borrowing."], ["No security is ever required", "Lenders may require security."]],
    hints: ["Think about votes and tax."],
    explanation: "Loan notes avoid dilution of control, and interest is deductible; the drawbacks are fixed payments and higher gearing.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which type of investor would **most** probably choose secured loan notes rather than ordinary shares in a risky new company?",
    ok: ["A cautious investor wanting a fixed return and a claim on assets", "Correct: lenders have priority and security."],
    bad: [["An investor wanting a vote on all decisions", "Loan note holders have no vote."], ["An investor seeking unlimited share in future profit", "Lenders receive a fixed return."], ["An investor who does not mind losing everything", "Such an investor would not be restricted to loan notes."]],
    hints: ["Who ranks first if the company fails?"],
    explanation: "Secured loan notes carry less risk and rank before shareholders if the company is wound up.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A bonus issue of shares raises cash for the company.",
    answer: false,
    explanation: "False. The shares are given free and paid for out of reserves, so no cash is received.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each source to its description.",
    pairs: ["Ordinary shares", "Loan notes", "Retained earnings", "Bonus issue", "Rights issue"],
    right: ["Ownership with votes and a variable dividend", "A long-term loan with fixed interest", "Profits kept in the business", "Free shares paid for from reserves; no cash received", "New shares offered to existing shareholders to raise cash"],
    rightIndex: [0, 1, 2, 3, 4],
    explanation: "Each source has its own return, risk and effect on cash.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word in each gap.",
    template: "Interest on loan notes is an {{blank:a}} of the company, whereas ordinary dividends are paid out of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["expense"], choices: ["expense", "appropriation of profit"] },
      { id: "b", accepted: ["profit"], choices: ["profit", "revenue"] },
    ],
    explanation: "Loan interest is deducted in arriving at profit; dividends are paid from the profit after tax.",
  });

  const g1 = ratios.gearing(60000, 90000, 30000);
  chk(g1, 33.3333, 0.001);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: g1, daily: true, calculator: true, wrong: [r2((60000 / (90000 + 30000)) * 100)],
    stem: "A company has ordinary share capital of US\\$90,000, reserves of US\\$30,000 and loan notes of US\\$60,000. Calculate the gearing ratio (non-current liabilities ÷ (share capital + reserves + non-current liabilities)) as a percentage to one decimal place.",
    explanation: "60,000 ÷ (90,000 + 30,000 + 60,000) × 100 = 33.3%. Leaving the loan out of the denominator gives 50.0%.",
  });
  const bs = company.bonusIssue({ held: 360000, newPerOld: [1, 6], par: 0.5 });
  check("bs", bs.newShares, 60000);
  check("bsr", bs.fromReserves, 30000);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: bs.fromReserves, calculator: true, wrong: [bs.newShares, r2(bs.newShares * 1)],
    stem: "A company with 360,000 ordinary shares of US\\$0.50 each makes a bonus issue of 1 new share for every 6 held. Calculate the amount transferred from reserves to share capital.",
    hints: ["First find the number of new shares."],
    explanation: "New shares 360,000 ÷ 6 = 60,000. At US\\$0.50 each the transfer is 60,000 × 0.50 = 30,000.",
  });
  const rs = company.rightsIssue({ held: 90000, newPerOld: [1, 3], par: 1, price: 2.4 });
  check("rs", rs.cash, 72000);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: rs.cash, calculator: true, wrong: [rs.capital, 30000],
    stem: "A company has 90,000 ordinary shares of US\\$1. It makes a rights issue of 1 new share for every 3 held at US\\$2.40 per share. Calculate the cash raised if all rights are taken up.",
    hints: ["Number of new shares × issue price."],
    explanation: "New shares 90,000 ÷ 3 = 30,000; cash 30,000 × 2.40 = 72,000. Share capital increases by only 30,000; the rest is share premium.",
  });
  const g2 = ratios.gearing(150000, 150000, 50000);
  chk(g2, 42.8571, 0.001);
  b.num({
    d: 4, skill: "ANALYSIS", kind: "pct", value: g2, calculator: true, wrong: [r2(ratios.gearing(100000, 150000, 50000)), r2((50000 / (150000 + 50000 + 50000)) * 100)],
    stem: "A company has ordinary share capital of US\\$150,000, reserves of US\\$50,000 and loan notes of US\\$100,000. It issues further loan notes of US\\$50,000. Calculate its new gearing ratio as a percentage to one decimal place.",
    hints: ["Add the new notes to the loan notes in both the top and the bottom of the fraction."],
    explanation: "150,000 ÷ (150,000 + 50,000 + 150,000) × 100 = 42.9%. Before the issue gearing was 33.3%, so the company now carries more fixed interest. Forgetting the new notes gives 33.3%.",
  });
  const pd = r2(40000 * 2 * 0.07);
  check("pd", pd, 5600);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: pd, applies: ZIM, calculator: true, wrong: [r2(40000 * 0.07), r2(40000 * 2)],
    stem: "A company has 40,000 7% preference shares of US\\$2 each. Calculate the annual preference dividend.",
    explanation: "40,000 × US\\$2 = 80,000 nominal value; 7% × 80,000 = 5,600.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the ratio that measures the proportion of long-term finance that is borrowed.",
    accepted: ["gearing", "gearing ratio", "the gearing ratio"],
    explanation: "Gearing.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "State **two** advantages to a company of raising finance by issuing loan notes instead of ordinary shares.",
    points: ["Control of the existing shareholders is not diluted", "Interest is an allowable expense and loan finance is usually cheaper than equity"],
    modelAnswer: "The existing shareholders keep control, because loan note holders do not vote, and the interest is an allowable expense and generally cheaper than the cost of share capital.",
    explanation: "Control and cost are the standard points.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Distinguish between a bonus issue and a rights issue of shares.",
    points: ["A bonus issue gives free shares to existing shareholders, paid for out of reserves", "A rights issue offers new shares to existing shareholders at a price, so it raises cash", "In both, shareholders receive new shares in proportion to their holdings"],
    modelAnswer: "A bonus issue gives existing shareholders free shares from reserves, so no cash is received. A rights issue offers them new shares for payment, so cash is raised. Both are in proportion to existing holdings.",
    hints: ["Does the company receive cash?"],
    explanation: "The difference is the cash.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "A manufacturing company whose profits vary greatly from year to year is considering borrowing US\\$500,000 on loan notes. Evaluate this proposal.",
    points: ["Fixed interest must be paid even in poor years, which is risky when profits vary", "Gearing rises, so lenders and shareholders may see more risk", "A share issue would avoid fixed payments, so it may be safer, though it dilutes control"],
    modelAnswer: "Interest must be paid in every year, even when profits are low, so the loan notes are risky for a company with unstable profits, and gearing would rise. A share issue avoids fixed payments although it dilutes control, so it may be safer.",
    hints: ["Think about the fixed commitment and the variable profit."],
    explanation: "A recommendation using the facts earns the marks.",
  });

  // Structured 1: 10 marks
  const sh = 280000;
  const rv = 130000;
  const nt = 90000;
  const ned = 100000;
  const gn = ratios.gearing(nt, sh, rv);
  const gA = ratios.gearing(nt + ned, sh, rv);
  const gB = ratios.gearing(nt, sh + ned, rv);
  chk(gn, 18, 0.001);
  chk(gA, 31.6667, 0.001);
  chk(gB, 15, 0.001);
  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `Zambezi Mills has ordinary share capital of ${money(sh)}, reserves of ${money(rv)} and 8% loan notes of ${money(nt)}. It needs ${money(ned)} for new equipment and is considering Option A (more loan notes) or Option B (new ordinary shares at par).`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: gn, wrong: [r2((nt / (sh + rv)) * 100)], stem: "Calculate the present gearing ratio, as a percentage to one decimal place.", explanation: "90,000 ÷ (280,000 + 130,000 + 90,000) = 18.0%." }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: gA, wrong: [gn], stem: "Calculate the gearing ratio under Option A, as a percentage to one decimal place.", explanation: "190,000 ÷ (280,000 + 130,000 + 190,000) = 31.7%." }),
      P.num({ label: "(c)", marks: 2, kind: "pct", value: gB, wrong: [gn], stem: "Calculate the gearing ratio under Option B, as a percentage to one decimal place.", explanation: "90,000 ÷ (380,000 + 130,000 + 90,000) = 15.0%." }),
      P.manual({ label: "(d)", marks: 4, stem: "Advise the directors which option to choose.", points: ["Option A keeps control with present shareholders and interest is an allowable expense, but gearing rises to 31.7% and interest must be paid every year", "Option B lowers gearing to 15.0% and has no fixed payment, but new shares dilute control and dividends are shared with new owners", "A recommendation linked to profit stability or the need for control", "A supporting figure or other factor, such as lenders' attitude to 31.7% gearing"], modelAnswer: "If profits are stable, Option A is attractive: control stays with the present shareholders and interest is allowable, although gearing rises from 18.0% to 31.7% and interest must be paid every year. If profits are uncertain, Option B is safer because gearing falls to 15.0% and there is no fixed payment, at the cost of diluting control.", explanation: "Both options need to be weighed before a conclusion." }),
    ],
    hints: ["Gearing = non-current liabilities ÷ (share capital + reserves + non-current liabilities)."],
    explanation: "This item tests gearing and the choice between loan notes and shares.",
  });

  // Structured 2: 12 marks
  const held = 200000;
  const bon = company.bonusIssue({ held, newPerOld: [1, 5], par: 1 });
  const rig = company.rightsIssue({ held, newPerOld: [1, 4], par: 1, price: 1.6 });
  check("bon", bon.newShares, 40000);
  check("rig", rig.cash, 80000);
  b.struct({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: `Chipo Mills has 200,000 ordinary shares of US$1 each and reserves of ${money(90000)}. The directors are considering either a 1 for 5 bonus issue or a 1 for 4 rights issue at US$1.60 per share (all rights taken up).`.replace(/US\$1/g, "US\\$1"),
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "units", value: bon.newShares, wrong: [held], stem: "Calculate the number of new shares in the bonus issue.", explanation: "200,000 ÷ 5 = 40,000 shares." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: r2(90000 - bon.fromReserves), wrong: [90000], stem: "Calculate the reserves remaining after the bonus issue.", explanation: "90,000 - 40,000 = 50,000." }),
      P.num({ label: "(c)", marks: 2, kind: "units", value: rig.newShares, wrong: [bon.newShares], stem: "Calculate the number of new shares in the rights issue.", explanation: "200,000 ÷ 4 = 50,000 shares." }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: rig.cash, wrong: [rig.capital], stem: "Calculate the cash raised by the rights issue.", explanation: "50,000 × 1.60 = 80,000." }),
      P.manual({ label: "(e)", marks: 4, stem: "The directors want to finance a new warehouse. Explain which of the two issues helps and which does not.", points: ["The rights issue raises cash of 80,000 that can pay for the warehouse", "The bonus issue raises no cash because it is paid for from reserves", "The bonus issue only converts reserves of 40,000 into share capital and reduces the reserves available for dividends", "Existing shareholders keep their proportion under both issues"], modelAnswer: "The rights issue raises US\\$80,000 in cash, which can pay for the warehouse. The bonus issue raises nothing: it converts US\\$40,000 of reserves into share capital. Under both issues existing shareholders keep their proportion of ownership.", explanation: "Cash is the key difference." }),
    ],
    hints: ["Bonus issue: no cash. Rights issue: shares × issue price."],
    explanation: "This item tests bonus and rights issues.",
  });

  b.card("DEFINITION", "What is an **ordinary share**?", "A share giving part ownership, voting rights and a dividend that varies with profit.");
  b.card("DEFINITION", "What is a **preference share**?", "A share with a fixed dividend paid before ordinary dividends; usually no vote; may be redeemable.", undefined, { applies: ZIM });
  b.card("DEFINITION", "What is a **loan note** (debenture)?", "A long-term loan with fixed interest and a repayment date, sometimes secured on assets.");
  b.card("FORMULA", "Gearing ratio", "Non-current liabilities ÷ (share capital + reserves + non-current liabilities) × 100.");
  b.card("CONCEPT", "Bonus issue against rights issue", "Bonus: free shares from reserves, no cash. Rights: shares offered to existing holders for payment, cash raised.");
  b.card("CONCEPT", "Loan notes against ordinary shares", "Loan notes: fixed interest (expense), no vote, raise gearing. Shares: variable dividend, votes, dilute control.");
  b.card("FACT", "Why high gearing is risky", "Interest and repayments are fixed and must be met even when profits are low.");
  b.card("DEFINITION", "What is **convertible loan stock**?", "Loan notes that can be exchanged for shares at a stated rate, with a lower interest rate.", undefined, { applies: ZIM });
  b.card("FACT", "Retained earnings", "Cheapest source; no issue costs or new shareholders; limited by profits.");
});
