// W4a lesson generator: money.interest-rates. Run: node .scratch/economics-a/tables/w4a-interest-rates.mjs
import { schedule, chk, table, fmt, roundTo, pctChange, realInterest } from "../lib.mjs";
import { writeLesson } from "./w4a-kit.mjs";

const r = [2, 4, 6, 8, 10, 12];
const md = [700, 600, 500, 400, 320, 260];
const ms1 = r.map(() => 500), ms2 = r.map(() => 600);
const lp1 = schedule({ prices: r, qd: md, qs: ms1, priceHeader: "Interest rate (%)", qdHeader: "Demand for money (US\\$ million)", qsHeader: "Money supply (US\\$ million)", requireEquilibrium: true });
const lp2 = schedule({ prices: r, qd: md, qs: ms2, priceHeader: "Interest rate (%)", qdHeader: "Demand for money (US\\$ million)", qsHeader: "Money supply (US\\$ million)", requireEquilibrium: true });
chk(lp1.equilibrium.price, 6); chk(lp2.equilibrium.price, 4);

const rr = [4, 6, 8, 10, 12];
const invD = [520, 460, 400, 340, 280], sav = [280, 340, 400, 460, 520], invD2 = invD.map((x) => x + 120);
const lf1 = schedule({ prices: rr, qd: invD, qs: sav, priceHeader: "Interest rate (%)", qdHeader: "Demand for loanable funds (US\\$ million)", qsHeader: "Supply of loanable funds (US\\$ million)", requireEquilibrium: true });
const lf2 = schedule({ prices: rr, qd: invD2, qs: sav, priceHeader: "Interest rate (%)", qdHeader: "New demand for loanable funds (US\\$ million)", qsHeader: "Supply of loanable funds (US\\$ million)", requireEquilibrium: true });
chk(lf1.equilibrium.price, 8); chk(lf1.equilibrium.quantity, 400); chk(lf2.equilibrium.price, 10); chk(lf2.equilibrium.quantity, 460);
const b5 = 100 / 0.05, b8 = 100 / 0.08; chk(b5, 2000); chk(b8, 1250); chk(pctChange(b5, b8), -37.5);
chk(realInterest(12, 8).approx, 4); chk(roundTo(realInterest(12, 8).exact, 2), 3.7);

const body = String.raw`
## Introduction

The price of borrowing money is the rate of interest, and it matters to nearly everyone. A farmer in Masvingo deciding whether to borrow for seed and fertiliser, a family comparing a savings account with other uses of cash, a company deciding whether to build a new factory, and a government that must pay interest on its debt all look at the interest rate. The central bank sets a policy rate, but market interest rates are also determined by the forces of demand and supply, and economists have two main theories about which forces matter most.

This lesson explains the **liquidity preference theory** (Keynes) and the **loanable funds theory** (the classical view), real and nominal interest rates, and other factors that affect the rates charged on loans. You should know the demand for and supply of money (previous lesson) and the meaning of inflation.

## Key definitions

:::definition{term="Interest rate"}
The price of borrowing money, or the reward for lending it, expressed as a percentage of the amount borrowed per year.
:::

:::definition{term="Nominal and real interest rates"}
The **nominal** rate is the rate actually charged or paid, not adjusted for inflation. The **real** rate is the nominal rate adjusted for inflation: approximately nominal rate − inflation rate.
:::

:::definition{term="Liquidity preference theory"}
Keynes's theory that the interest rate is determined in the money market by the demand for money (the desire to hold liquid wealth) and the supply of money, which is set by the central bank and the banks.
:::

:::definition{term="Loanable funds theory"}
The theory that the interest rate is determined in the market for loanable funds by the supply of funds (savings) and the demand for funds (investment and borrowing, including by the government).
:::

## Liquidity preference theory

In this theory the **demand for money** falls as the interest rate rises (because the opportunity cost of holding money is higher), and the **supply of money** is fixed by the central bank at any given time. The equilibrium interest rate is where the two are equal. The schedule below is illustrative.

${lp1.md}

At an interest rate of **6%** the demand for money (500) equals the supply (500). At 8%, people want to hold only 400, but 500 is available, so there is an **excess supply of money**: people use the surplus money to buy bonds, whose prices rise and whose interest yield falls, until the rate returns to 6%.

If the central bank raises the money supply to US\$600 million, the supply and demand are equal at **4%**: an increase in the money supply lowers the interest rate (in the short run, other things equal).

:::worked-solution{title="Bond prices and interest rates"}
A bond pays a fixed US\$100 a year for ever (illustrative). The interest rate (yield) is the income as a percentage of the price.
1. At an interest rate of 5%, price = 100 ÷ 0.05 = **US\$2,000**.
2. If interest rates rise to 8%, price = 100 ÷ 0.08 = **US\$1,250**.
3. The bond price falls by (1,250 − 2,000) ÷ 2,000 × 100 = **−37.5%**.
4. Bond prices and interest rates move in opposite directions. When people expect rates to rise, they expect bond prices to fall and prefer to hold money (the speculative motive).
:::

## Loanable funds theory

The **supply of loanable funds** comes from saving, and rises with the interest rate. The **demand for loanable funds** comes from firms that want to invest and others (including the government) who want to borrow, and falls as the interest rate rises.

${lf1.md}

The equilibrium interest rate is **8%**, where savers wish to lend 400 and borrowers wish to borrow 400. Suppose the government borrows more, so that demand for loanable funds rises by US\$120 million at every interest rate (the new demand column is the old one plus 120).

${lf2.md}

The equilibrium interest rate rises to **10%** and the quantity of funds lent rises to 460. The rise in the rate also reduces private investment (crowding out).

## Comparing the two theories

| | Liquidity preference | Loanable funds |
| --- | --- | --- |
| Market | Money market (stock of money) | Market for loanable funds (flow of saving and investment) |
| Demand | Demand for money to hold | Demand for funds to invest or borrow |
| Supply | Supply of money (central bank and banks) | Saving |
| Key idea | Interest is the reward for parting with liquidity | Interest is the reward for saving and the cost of borrowing |
| Policy implication | A larger money supply lowers the rate | Higher saving or lower investment lowers the rate |

The Keynesian view stresses that saving depends mostly on income, not on the interest rate, and that the interest rate is determined by the demand for and supply of money. Keynes also noted that at a very low interest rate, people may hold any additional money rather than buy bonds (the **liquidity trap**), so a larger money supply cannot lower the rate any further. The classical view stresses that saving and investment balance through the interest rate.

## Real and nominal interest rates

:::worked-solution{title="Real interest rate"}
A bank charges a nominal interest rate of 12% and the rate of inflation is 8%.
1. Approximate real rate = 12% − 8% = **4%**.
2. The exact calculation is (1.12 ÷ 1.08 − 1) × 100 = **3.7%**; the difference is small when rates are low.
3. If inflation is higher than the nominal rate, the real rate is negative, lenders lose and borrowers gain.
:::

Investment and saving decisions respond to the *real* rate, because that determines the true cost of borrowing and the real reward from saving.

## Other determinants of interest rates

1. **The central bank's policy rate**, which sets the floor for other rates.
2. **Risk of default.** Riskier borrowers (new small firms) pay more.
3. **The term (length) of the loan.** Longer loans normally carry higher rates, because the lender gives up liquidity for longer.
4. **Expected inflation.** Lenders require a higher nominal rate if they expect inflation to rise.
5. **Competition between lenders** and the cost of funds for banks.
6. **Non-economic factors** (ZIMSEC): political stability, confidence in the government, the legal system, social attitudes to saving and borrowing, and government regulation of rates.

:::example{title="Evaluation paragraph"}
The two theories do not conflict as much as they appear: the interest rate is affected by both the money market and the market for loanable funds, and in the long run saving and investment matter most while in the short run the money supply and expectations matter most. Liquidity preference theory is useful for explaining why a central bank can influence short-term rates, but in a liquidity trap this is of no use. Loanable funds theory is useful for explaining the effects of government borrowing and of saving, but ignores the role of the money supply. Where banks are the main lenders and the informal sector is large, the interest rates actually faced by borrowers also depend on risk, collateral and competition.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect the two theories, the effect of changes in the money supply, saving and investment on the interest rate, and real against nominal rates. ZIMSEC (Form 6) also includes non-economic factors that affect interest rates. The liquidity trap and the bond price calculation are extensions that Cambridge A Level candidates may be asked about.
:::

## Common mistakes

:::mistake{title="Mixing up the diagrams"}
In the money market diagram the horizontal axis is the quantity of money. In the loanable funds diagram it is the quantity of loanable funds. Do not mix the demand and supply curves of the two theories.
:::

:::mistake{title="Using the nominal rate for real decisions"}
Real rate = nominal rate − inflation. A 10% rate with 12% inflation is a negative real rate.
:::

:::mistake{title="Saying that a rise in the money supply always lowers the rate"}
It does in the short run, other things equal, but not in a liquidity trap, and a faster rise in the money supply can raise inflation expectations and nominal rates.
:::

## Exam tips

:::exam-tip{title="Where it is tested"}
ZIMSEC Papers 1 and 2 test the theories and calculation of real rates; Paper 3 essays ask you to discuss the factors that determine interest rates. Cambridge Papers 3 and 4 ask for the effect of changes in the money supply, saving or government borrowing, and for evaluation.
:::

:::exam-tip{title="Command words"}
*Explain*: describe the demand, the supply and the adjustment to equilibrium, using a labelled description of the diagram. *Calculate*: nominal rate minus inflation for the real rate. *Compare*: state a similarity and a difference between the two theories. *Evaluate*: consider the conditions (such as a liquidity trap or inflation expectations) under which each theory works.
:::

## Summary

:::summary
- The interest rate is the price of borrowing money; it can be explained by liquidity preference (demand for and supply of money) or by loanable funds (saving and investment).
- In liquidity preference theory, a rise in the money supply lowers the rate; in loanable funds theory, more saving lowers it and more government borrowing raises it.
- Bond prices and interest rates move in opposite directions.
- The real rate is approximately the nominal rate minus inflation, and decisions respond to the real rate.
- Risk, term, expected inflation, policy rates, competition and non-economic factors also affect rates.
:::
`;

writeLesson("money.interest-rates", {
  title: "Interest rate determination: liquidity preference, loanable funds and non-economic factors",
  summary: "Explain the liquidity preference and loanable funds theories of the interest rate, analyse changes in the money supply, saving and government borrowing, distinguish real and nominal rates, and identify other determinants of interest rates.",
  concepts: ["aecon.money.interest-rates"],
  estimatedMinutes: 55,
}, body);
