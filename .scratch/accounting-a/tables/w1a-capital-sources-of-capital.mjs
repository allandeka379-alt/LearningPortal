// Lesson generator: capital.sources-of-capital
import { table, check, sum, r2, fmt, ratios, company, chk, t } from "../lib.mjs";
import { writeLesson } from "./w1a-lib.mjs";

const kinds = table(
  ["Source", "What it is", "Return paid", "Main features"],
  [
    ["Ordinary shares", "Ownership shares carrying votes", "Dividend, varies with profit", "No fixed return; last to be paid if the company is wound up; rights to the surplus"],
    ["Preference shares (ZIMSEC only)", "Shares with a fixed dividend rate, paid before ordinary dividends", "Fixed dividend", "Usually no vote; redeemable or irredeemable; may be convertible"],
    ["Loan notes / debentures", "Long-term loans of the company in a document called a loan note", "Fixed interest", "Interest is an expense, paid whether or not there is profit; repaid on a set date or irredeemable; secured or unsecured"],
    ["Convertible loan stock (ZIMSEC only)", "Loan notes that can be exchanged for shares", "Fixed interest until converted", "Lower interest rate; may become shares later"],
    ["Retained earnings", "Profits kept in the business", "None", "No issue costs; no new owners; limited by profit"],
  ],
  ["l", "l", "l", "l"],
);

// Example 1: gearing under two financing options
const shares0 = 400000;
const reserves0 = 250000;
const notes0 = 150000;
const need = 200000;
const gear0 = ratios.gearing(notes0, shares0, reserves0);
chk(gear0, 18.75, 0.01, "gear0");
const gearA = ratios.gearing(notes0 + need, shares0, reserves0);
chk(gearA, 35, 0.01, "gearA");
const gearB = ratios.gearing(notes0, shares0 + need, reserves0);
chk(gearB, 15, 0.01, "gearB");
const rateOld = 8;
const rateNew = 9;
const intOld = r2((notes0 * rateOld) / 100);
const intNew = r2((need * rateNew) / 100);
const intA = r2(intOld + intNew);
check("intA", intA, 30000);
const pbit = 150000;
const coverA = pbit / intA;
const coverB = pbit / intOld;
chk(coverA, 5, 0.0001);
chk(coverB, 12.5, 0.0001);
const ex1 = table(
  ["", "Now", "Option A: issue loan notes", "Option B: issue ordinary shares"],
  [
    ["Ordinary share capital US$", shares0, shares0, shares0 + need],
    ["Reserves US$", reserves0, reserves0, reserves0],
    ["Loan notes US$", notes0, notes0 + need, notes0],
    ["Gearing %", "18.75", "35.00", "15.00"],
    ["Annual interest US$", intOld, intA, intOld],
    ["Interest cover (times), profit before interest US$150,000", "", "5.0", "12.5"],
  ],
).replace(/US\$/g, "US\\$");

// Example 2: bonus and rights issue
const held = 400000;
const bonus = company.bonusIssue({ held, newPerOld: [1, 4], par: 1 });
check("bonus shares", bonus.newShares, 100000);
check("bonus reserves", bonus.fromReserves, 100000);
const rights = company.rightsIssue({ held, newPerOld: [1, 5], par: 1, price: 1.5 });
check("rights shares", rights.newShares, 80000);
check("rights cash", rights.cash, 120000);
check("rights premium", rights.premium, 40000);
const ex2 = table(
  ["", "Before", "After 1 for 4 bonus issue", "After 1 for 5 rights issue at US$1.50"],
  [
    ["Ordinary shares issued (number)", held, held + bonus.newShares, held + rights.newShares],
    ["Share capital at US$1 par US$", held, held + bonus.fromReserves, held + rights.capital],
    ["Share premium US$", 0, 0, rights.premium],
    ["Other reserves US$", reserves0, reserves0 - bonus.fromReserves, reserves0],
    ["Cash received US$", 0, 0, rights.cash],
  ],
).replace(/US\$/g, "US\\$");
const tot0 = held + reserves0;
const totB = held + bonus.fromReserves + reserves0 - bonus.fromReserves;
const totR = held + rights.capital + rights.premium + reserves0;
check("bonus changes no total", tot0, totB);
check("rights adds cash", totR, tot0 + rights.cash);

const adv = table(
  ["", "Advantages to the company", "Disadvantages to the company"],
  [
    ["Issue of ordinary shares", "No fixed payment; no repayment; strengthens the base for borrowing", "Dilutes control; dividends are not tax-deductible; issue costs"],
    ["Issue of loan notes", "Interest is a tax-deductible expense; no loss of control; usually cheaper than shares", "Interest must be paid; capital must be repaid; raises gearing; security may be needed"],
    ["Preference shares (ZIMSEC)", "Fixed dividend; no loss of control; the dividend can be missed in a poor year", "Dividend rank before ordinary shareholders; usually cumulative; not tax-deductible"],
    ["Retained earnings", "Cheap, quick, no outside shareholders", "Limited by profits; shareholders may want dividends instead"],
  ],
  ["l", "l", "l"],
);

const terms = table(
  ["ZIMSEC (common usage)", "Cambridge 9706"],
  [
    ["Loan notes; convertible loan stock; preference shares", "Debentures; (preference shares not examined)"],
    ["Sources of capital (shares, loan notes)", "Sources of finance"],
    ["Retained profits", "Retained earnings"],
  ],
  ["l", "l"],
);

const body = t`
## Introduction

Zambezi Plastics, a company in Harare, wants US\$200,000 to buy new moulding machines. It can ask the bank for a loan, issue loan notes, ask its shareholders for more money through a rights issue, or issue new ordinary shares to outsiders. The choice affects who controls the company, how much it must pay each year whether or not it makes a profit and how much risk the shareholders carry. In an exam you will be asked to describe each source and advise on the best one.

This lesson covers the sources and their advantages and disadvantages. The accounting entries for share and loan note issues belong to the company lessons later in the course. Short-term finance such as overdrafts is in the previous lesson.

:::keyfact{title="ZIMSEC and Cambridge terms"}
${terms}

**Preference shares and convertible loan stock are ZIMSEC detail.** Cambridge sets no questions on preference shares, so answers for a Cambridge question should use ordinary shares and debentures.
:::

## Key definitions

:::definition{term="Ordinary share"}
A share that gives its holder a part ownership of the company, voting rights and the right to a dividend decided by the directors.
:::

:::definition{term="Preference share (ZIMSEC)"}
A share with a fixed rate of dividend that must be paid before any ordinary dividend. It may be redeemable (repayable) or irredeemable.
:::

:::definition{term="Loan note (debenture)"}
A long-term loan to the company, usually with fixed interest and a repayment date, which may be secured on the company's assets.
:::

:::definition{term="Gearing"}
The proportion of long-term finance that is borrowed: non-current liabilities ÷ (share capital + reserves + non-current liabilities) × 100.
:::

## The sources compared

${kinds}

**Bonus issue.** New shares are given free to existing shareholders, paid for out of reserves. It raises no cash. **Rights issue.** Existing shareholders may buy new shares in proportion to their holdings, usually below the market price, which raises cash and keeps control with existing owners.

:::worked-solution[Example 1: loan notes or shares?]
Zambezi Plastics has ordinary share capital of US\$400,000, reserves of US\$250,000 and 8% loan notes of US\$150,000. It needs US\$200,000. Option A: issue 9% loan notes. Option B: issue 200,000 ordinary shares of US\$1 at par. Profit before interest is US\$150,000 on either option.

${ex1}

1. Present gearing: 150,000 ÷ (400,000 + 250,000 + 150,000) = 18.75%.
2. Option A: 350,000 ÷ (400,000 + 250,000 + 350,000) = 35.00%. Annual interest 12,000 + 18,000 = 30,000; interest cover 150,000 ÷ 30,000 = 5.0 times.
3. Option B: 150,000 ÷ (600,000 + 250,000 + 150,000) = 15.00%. Interest stays at 12,000; interest cover 12.5 times.
4. Option A keeps control with existing shareholders but raises fixed commitments. Option B lowers gearing but dilutes control and gives new shareholders a claim on dividends.
:::

:::worked-solution[Example 2: bonus issue and rights issue]
The company has 400,000 ordinary shares of US\$1 and other reserves of US\$250,000. It considers (a) a 1 for 4 bonus issue and (b) a 1 for 5 rights issue at US\$1.50.

${ex2}

1. Bonus issue: 400,000 ÷ 4 = 100,000 new shares of US\$1, paid for out of reserves of 100,000. Total equity is unchanged (650,000); no cash is received.
2. Rights issue: 400,000 ÷ 5 = 80,000 shares at US\$1.50, giving cash 120,000: share capital 80,000 and share premium 40,000. Total equity rises to 770,000.
3. The bonus issue turns reserves into share capital (it makes shares more marketable and reserves less available for dividends); the rights issue raises real finance.
:::

:::worked-solution[Example 3: advising on the choice]
Zambezi's directors want cheap finance and do not want to lose control. Advise.

${adv}

1. Retained earnings may be insufficient for US\$200,000, but they are the cheapest and quickest and should be used first.
2. A rights issue gives existing shareholders first choice, so control is not diluted, and it raises cash with no fixed payments.
3. Loan notes are suitable if profits are stable enough to cover interest; the company's gearing of 35% would be moderate rather than dangerous.
4. A reasoned recommendation uses the facts: stable profits favour loan notes; weak or uncertain profits favour shares.
:::

## Factors in the choice

- **Cost:** loan interest is cheaper and tax-deductible; dividends are not an expense.
- **Risk to the company:** interest and capital repayment are compulsory; dividends are not.
- **Control:** new ordinary shares can reduce existing shareholders' voting power; loan notes do not.
- **Gearing:** higher gearing raises the risk for shareholders when profits are low and makes lenders cautious.
- **Security and size:** lenders may require security; share issues need a market of willing investors.
- **Timing and cost of issue:** public share issues are expensive and slow.

## Common mistakes

:::mistake{title="Calling a dividend an expense"}
Dividends are paid from profit after tax. Loan interest is an expense in the statement of profit or loss.
:::

:::mistake{title="Saying a bonus issue raises cash"}
A bonus issue is a free issue paid for from reserves; the company receives no cash.
:::

:::mistake{title="Forgetting the viewpoint"}
Advantages and disadvantages differ for the company and for the investor. State whose view you are giving.
:::

:::mistake{title="Using preference shares in a Cambridge answer"}
Cambridge sets no questions on preference shares. For ZIMSEC answers, mention them as a source with a fixed dividend.
:::

## Exam tips

:::exam-tip
ZIMSEC Papers 1 and 2 and Cambridge Papers 1 and 2 ask you to *describe*, *compare* and *advise*. For *advise*, state the recommended source, give two reasons linked to the company's position (profit, gearing, control) and one disadvantage. A gearing calculation before and after the choice supports the advice with numbers.
:::

:::exam-tip
For investors, remember that loan note holders have lower risk and a fixed return, whereas ordinary shareholders have higher risk, voting rights and the possibility of a larger return.
:::

## Summary

:::summary
- Ordinary shares carry votes and a variable dividend; loan notes carry fixed interest and a repayment date.
- Preference shares (ZIMSEC) pay a fixed dividend before ordinary dividends and usually carry no vote.
- Loan interest is an expense and tax-deductible; dividends are a distribution of profit.
- Higher borrowing raises gearing and the risk of failing to meet fixed payments.
- A bonus issue raises no cash; a rights issue raises cash and protects existing shareholders' control.
- Retained earnings are the cheapest source but are limited by profit.
:::
`;

writeLesson(
  "capital/sources-of-capital.md",
  {
    key: "capital.sources-of-capital",
    title: "Long-term capital: shares, loan notes and their advantages and disadvantages",
    summary: "Compare ordinary shares, preference shares, loan notes and convertible loan stock, retained earnings, bonus and rights issues by cost, risk, control and gearing, and recommend finance for a stated purpose.",
    concepts: ["aacc.capital.sources-of-capital"],
    estimatedMinutes: 45,
    level: "core",
  },
  body,
);
