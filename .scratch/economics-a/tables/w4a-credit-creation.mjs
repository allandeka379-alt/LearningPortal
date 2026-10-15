// W4a lesson generator: money.credit-creation. Run: node .scratch/economics-a/tables/w4a-credit-creation.mjs
import { creditCreation, chk, table, fmt, roundTo } from "../lib.mjs";
import { writeLesson } from "./w4a-kit.mjs";

const cc = creditCreation({ deposit: 1000, reserveRatio: 0.2, rounds: 8 });
chk(cc.multiplier, 5); chk(cc.maxDeposits, 5000); chk(cc.newLoans, 4000);
chk(roundTo(cc.rows[7].cumulative, 2), 4161.14);
const k2 = 1 / (1 - (1 - 0.2) * (1 - 0.1)); chk(roundTo(k2, 3), 3.571);
chk(1500, 12000 * 0.125);
chk(50 * (1 / 0.1), 500);
const m8 = 500 / 0.125; chk(m8, 4000);
const body = String.raw`
## Introduction

When you deposit US\$100 in a bank, the bank does not keep all of it in a safe. It knows that most depositors will not ask for their money on the same day, so it lends most of the money out. The borrower spends it, and the seller deposits it in another bank, which lends most of that again. Each loan creates a new deposit, so the banking system as a whole turns an initial deposit into a much larger quantity of bank money. This is **credit creation**, and it explains why most of the money supply in a modern economy is bank deposits.

You should know the functions of banks and the balance sheet of a bank (previous lesson) and the meaning of a reserve ratio.

## Key definitions

:::definition{term="Fractional reserve banking"}
A banking system in which banks keep only a fraction of their deposits as reserves of cash and balances at the central bank, and lend or invest the rest.
:::

:::definition{term="Reserve ratio"}
The fraction of deposits that banks hold in reserve, either because the central bank requires it (the **required reserve ratio**) or because the bank chooses to.
:::

:::definition{term="Credit multiplier (money multiplier)"}
The number of times an initial deposit of reserves is multiplied into total bank deposits. In the simple model, credit multiplier = 1 ÷ reserve ratio.
:::

:::keyfact{title="Formulae"}
Credit multiplier = $\dfrac{1}{\text{reserve ratio}}$ (reserve ratio as a fraction).

Maximum total deposits = initial deposit × credit multiplier.

New deposits created by lending = maximum total deposits − initial deposit.
:::

## How credit is created: the step-by-step process

The simple model assumes that banks lend all their spare reserves, that all the money lent is spent and redeposited in the banking system, that no one holds extra cash, and that borrowers are always available. Suppose a customer deposits US\$1,000 and the reserve ratio is 20% (0.2).

${cc.md}

In each round the bank keeps 20% of the new deposit as reserves and lends the remaining 80%; that loan is spent and becomes the next deposit. The rounds continue, each smaller than the last, and the cumulative total approaches US\$5,000.

:::worked-solution{title="The credit multiplier"}
1. Credit multiplier = 1 ÷ 0.2 = **5**.
2. Maximum total deposits = 1,000 × 5 = **US\$5,000**.
3. New deposits created by lending = 5,000 − 1,000 = **US\$4,000**.
4. Check with the final position of the banking system: reserves = 20% × 5,000 = US\$1,000 (equal to the original deposit), and loans = 5,000 − 1,000 = US\$4,000.
5. After eight rounds the table shows total deposits of US\$4,161 (to the nearest dollar). The total approaches but never quite reaches 5,000.
:::

:::worked-solution{title="Working back from the deposits"}
Banks with a reserve ratio of 12.5% (0.125) support total deposits of US\$12,000.
1. Reserves needed = 12,000 × 0.125 = **US\$1,500**.
2. The credit multiplier = 1 ÷ 0.125 = 8, so an initial deposit of 1,500 supports 1,500 × 8 = 12,000, which confirms the answer.
:::

:::worked-solution{title="Changes in reserves and in the reserve ratio"}
A central bank buys government securities worth US\$50 million from banks, which raises their reserves by US\$50 million. The reserve ratio is 10%.
1. Credit multiplier = 1 ÷ 0.10 = 10.
2. Maximum rise in deposits = 50 × 10 = **US\$500 million**.

If, instead, the reserve requirement were raised from 10% to 12.5% with reserves of US\$500 million:
3. Deposits supported before = 500 ÷ 0.10 = US\$5,000 million.
4. Deposits supported after = 500 ÷ 0.125 = **US\$4,000 million**, so banks must reduce deposits (and lending) by US\$1,000 million.
:::

## Limits to credit creation

The simple multiplier is the *maximum* creation. In practice banks create less because:

1. **Cash drain.** Households and firms hold part of their money as cash and do not deposit it. Cash that leaves the banking system cannot be lent again. If a fraction $c$ of every loan is held as cash, only $(1 - r)(1 - c)$ of each deposit is passed on, and the multiplier becomes $1 \div [1 - (1 - r)(1 - c)]$. With $r = 0.2$ and $c = 0.1$, this is 1 ÷ 0.28 = **3.57**, instead of 5.
2. **Excess reserves.** Banks may keep more than the minimum, for safety, which raises the actual reserve ratio and lowers the multiplier.
3. **Lack of loan demand.** If firms and households do not wish to borrow, banks cannot lend, even if they have spare reserves. This may happen in a recession or when interest rates are high.
4. **Lack of creditworthy borrowers.** Banks lend only if they expect to be repaid.
5. **Central bank controls** such as reserve requirements, capital requirements and credit ceilings.
6. **Leakages to other uses**, such as the purchase of foreign currency or imports, which move money out of the domestic banking system.

## The effect on the money supply

Because bank deposits are most of the money supply (see the next lesson), credit creation is a main cause of changes in the money supply. If banks lend more, the money supply rises; if loans are repaid or banks lend less, it falls. The central bank tries to influence credit creation through the reserve requirement, open-market operations and the interest rate.

:::example{title="Evaluation paragraph"}
The credit multiplier shows how a small change in reserves can cause a large change in the money supply, and it explains why central banks pay attention to reserves. In practice the simple formula overstates the effect: cash drain, excess reserves and weak loan demand reduce it, and banks in economies with a large informal sector and widespread cash may create much less. In a deep recession banks may hold large excess reserves, so extra reserves from the central bank do not lead to more lending. The multiplier is therefore a useful upper limit rather than a prediction of what will happen.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards use credit multiplier = 1 ÷ reserve ratio (ZIMSEC: money multiplier), the step-by-step table, and the limits to credit creation. ZIMSEC (Form 5) expects calculations of the maximum deposits and new loans; Cambridge (A Level) expects the multiplier, the process and an assessment of the limits. The cash-drain formula is an extension; the basic exam question uses 1 ÷ reserve ratio.
:::

## Common mistakes

:::mistake{title="Not inverting the reserve ratio"}
The multiplier is 1 ÷ reserve ratio. A 20% ratio gives a multiplier of 5, not 0.2 or 20.
:::

:::mistake{title="Confusing total deposits with new deposits"}
Maximum total deposits include the initial deposit. The amount **created** by lending is the total minus the initial deposit.
:::

:::mistake{title="Treating the maximum as certain"}
The multiplier gives the maximum. Cash drain, excess reserves and low demand for loans reduce the actual increase in deposits.
:::

## Exam tips

:::exam-tip{title="Where it is tested"}
ZIMSEC Paper 1 and Paper 2 test the multiplier calculation and the table; Paper 3 essays ask about the limits to credit creation and its control. Cambridge Paper 3 asks for calculations and the process, and Paper 4 uses money and banking data.
:::

:::exam-tip{title="Command words"}
*Calculate*: invert the reserve ratio, multiply by the initial deposit and subtract the initial deposit when asked for new deposits. *Explain*: describe the rounds of lending and re-depositing. *Assess*: weigh the maximum effect against cash drain, excess reserves and weak demand for loans.
:::

## Summary

:::summary
- Banks keep only a fraction of deposits as reserves and lend the rest; each loan creates a new deposit.
- Credit multiplier = 1 ÷ reserve ratio; maximum total deposits = initial deposit × multiplier.
- New deposits created by lending = total deposits − initial deposit.
- Cash drain, excess reserves, low loan demand and regulations reduce the actual increase in deposits.
- Credit creation is a main cause of changes in the money supply, which the central bank tries to control.
:::
`;

writeLesson("money.credit-creation", {
  title: "Credit creation and the bank credit multiplier",
  summary: "Explain fractional reserve banking, work through the rounds of credit creation, calculate the credit multiplier 1/reserve ratio, maximum deposits and new loans, and explain the limits to credit creation and its effect on the money supply.",
  concepts: ["aecon.money.credit-creation"],
  estimatedMinutes: 55,
}, body);
