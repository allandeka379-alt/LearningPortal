// W4a lesson generator: money.money-demand-supply. Run: node .scratch/economics-a/tables/w4a-money-demand-supply.mjs
import { chk, table, fmt, pctChange, roundTo, creditCreation } from "../lib.mjs";
import { writeLesson } from "./w4a-kit.mjs";

const comp = [["Notes and coins in circulation outside banks", 40], ["Current account (sight) deposits", 160], ["Savings deposits", 300], ["Time (fixed-term) deposits", 200]];
const narrow = comp[0][1] + comp[1][1], broad = narrow + comp[2][1] + comp[3][1];
chk(narrow, 200); chk(broad, 700);
const t1 = table(["Component", "US\\$ million", "Counted in narrow money?", "Counted in broad money?"], comp.map(([n, v], i) => [n, v, i < 2 ? "Yes" : "No", "Yes"]).concat([["**Total**", "", `**Narrow money: ${fmt(narrow)}**`, `**Broad money: ${fmt(broad)}**`]]));
chk(roundTo(pctChange(700, 756), 1), 8);
const k = creditCreation({ deposit: 50, reserveRatio: 0.2 }).multiplier; chk(k, 5);
chk(50 * k, 250);

const body = String.raw`
## Introduction

How much money is there in an economy, and why do people choose to hold it? These two questions are at the heart of monetary economics. The supply of money affects spending and prices, and the demand for money affects interest rates. In Zimbabwe, the use of several currencies and of mobile money in recent years has made these questions more than theoretical: the central bank cannot always tell how much money is in circulation or in what form people hold it.

This lesson defines the money supply, explains what causes it to change in an open economy and examines why people demand money. The lesson on credit creation explains the multiplier; the lesson on interest rates uses the demand for and supply of money to explain interest rates; and the quantity theory is in the next lesson. You should know the functions of money and the role of the central bank.

## Key definitions

:::definition{term="Money supply"}
The total stock of money in an economy at a point in time that is available for spending. It is a stock, not a flow.
:::

:::definition{term="Narrow money"}
The most liquid forms of money that can be spent at once: notes and coins in circulation plus balances that can be withdrawn on demand, such as current accounts.
:::

:::definition{term="Broad money"}
Narrow money plus less liquid deposits, such as savings and time deposits, that can be turned into narrow money quickly but with some delay or cost.
:::

:::definition{term="Demand for money (liquidity preference)"}
The amount of wealth that households and firms choose to hold in the form of money rather than in less liquid assets that earn interest.
:::

## Measures of the money supply

Countries define "narrow" and "broad" money differently, so you should read the definition used in each question. A typical pattern is shown for a (fictional, illustrative) economy.

${t1}

Narrow money is 40 + 160 = **US\$200 million** and broad money is 200 + 300 + 200 = **US\$700 million**. Broad money includes the less liquid deposits, so it is always at least as large as narrow money. Bank deposits are most of the money supply in most economies, which is why credit creation matters.

:::worked-solution{title="Growth of the money supply"}
Broad money rises from US\$700 million to US\$756 million over a year.
1. Increase = 756 − 700 = US\$56 million.
2. Percentage growth = 56 ÷ 700 × 100 = **8%**.
3. If real output grew by 3% and velocity of circulation was unchanged, the quantity theory suggests prices would rise by about 5% (see the next lesson).
:::

## What causes the money supply to change?

1. **Credit creation by commercial banks.** When banks lend more, deposits rise. A loan creates a deposit, so the money supply rises when banks lend and falls when loans are repaid.
2. **Actions of the central bank.** It can issue more notes, buy securities in open-market operations (which raises banks' reserves) or lower the reserve requirement; the opposite actions reduce the money supply.
3. **Government deficit financing.** If a government spends more than it receives and borrows from the *central bank*, new money is created. If it borrows from the *public or banks*, existing money is transferred and the effect on the total is smaller (although borrowing from banks may reduce their lending to others). Large deficits financed by the central bank are a main cause of high inflation in many countries.
4. **Quantitative easing.** The central bank buys financial assets such as government bonds from banks and other institutions with newly created money. Banks' reserves rise and the central bank aims to increase lending, to lower longer-term interest rates and to raise spending when ordinary interest rate policy is no longer possible.
5. **The balance of payments.** In an open economy, a surplus on the balance of payments means that more foreign currency flows in than out. If the central bank buys the foreign currency with domestic money (to hold down the exchange rate), the domestic money supply rises. A deficit has the opposite effect. The central bank can offset (sterilise) the effect by selling securities.

:::worked-solution{title="Deficit financing and the money supply"}
A government has a budget deficit of US\$50 million. The reserve ratio is 20%.
1. If the deficit is financed by borrowing from households, money moves from them to the government and back into the economy when it is spent: **no net increase** in the money supply in the first instance.
2. If the central bank buys government bonds worth US\$50 million, banks' reserves rise by US\$50 million.
3. With a credit multiplier of 1 ÷ 0.2 = 5, deposits could rise by up to 50 × 5 = **US\$250 million**.
4. The second method has a much greater effect on the money supply and on prices.
:::

## The demand for money

People hold money because it is liquid, even though it earns little or no interest. Keynes distinguished three motives:

| Motive | Reason for holding money | Main determinant |
| --- | --- | --- |
| Transactions | To pay for everyday purchases between receipts of income | Level of nominal income and prices; how often income is paid |
| Precautionary | To meet unexpected expenses such as illness or repairs | Income and uncertainty |
| Speculative | To hold money rather than bonds when bond prices are expected to fall | Interest rates: a high rate means a high opportunity cost of holding money |

The transactions and precautionary demand for money rise with income and the price level. The speculative demand falls as the interest rate rises, because holding money gives up more interest, so the total demand for money is downward-sloping against the interest rate and shifts to the right when nominal income or prices rise. The supply of money is determined by the central bank and the banking system and, in a simple model, is shown as a vertical line. Together they explain interest rates (see the lesson on interest rates).

:::example{title="Evaluation paragraph"}
The central bank can influence the money supply directly but cannot control it exactly. Credit creation depends on the decisions of banks and borrowers, and in an open economy capital flows and the balance of payments alter the money supply independently of the central bank. Where the economy uses foreign currencies or mobile money outside the formal banking system, the measure of the money supply may be incomplete. The demand for money is also unstable, since it depends on confidence, expectations and the development of payment methods, which makes the link between the money supply and spending uncertain. Therefore a policy aimed at a fixed growth rate of the money supply may be difficult to achieve and may not give the expected effect on prices.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect the definitions of narrow and broad money, the causes of changes in the money supply, and the three motives for holding money. ZIMSEC (Form 6) expects the causes to include credit creation, the central bank, deficit financing, quantitative easing and the balance of payments in an open economy. Cambridge (A Level) uses the same causes and expects an evaluation of the central bank's ability to control the money supply.
:::

## Common mistakes

:::mistake{title="Confusing money with income or wealth"}
The money supply is the stock of money. Income is a flow. A person with a large house is wealthy but holds little money.
:::

:::mistake{title="Saying that borrowing by the government always increases the money supply"}
Borrowing from the central bank creates money. Borrowing from the public transfers existing money, so the effect is much smaller.
:::

:::mistake{title="Mixing up the motives"}
Transactions: everyday payments. Precautionary: unexpected needs. Speculative: waiting for better returns on assets, linked to the interest rate.
:::

## Exam tips

:::exam-tip{title="Where it is tested"}
ZIMSEC Papers 1 and 2 test definitions and calculations of narrow and broad money; Paper 3 essays ask about causes of changes in the money supply and its control. Cambridge Paper 3 tests the definitions, causes and motives; Paper 4 essays ask about the central bank's control of the money supply.
:::

:::exam-tip{title="Command words"}
*Define*: state what is included. *Calculate*: add the right components, and take care with percentage change. *Explain*: link each cause to the change in deposits or reserves. *Discuss*: weigh how far the central bank controls the money supply against the other causes.
:::

## Summary

:::summary
- The money supply is the stock of money available for spending; narrow money is notes, coins and demand deposits; broad money adds savings and time deposits.
- The money supply changes with credit creation, central bank actions, government deficit financing, quantitative easing and the balance of payments.
- Borrowing from the central bank creates money; borrowing from the public mostly transfers existing money.
- The demand for money has transactions, precautionary and speculative motives; the speculative motive falls as the interest rate rises.
- The central bank influences but cannot fully control the money supply or the demand for money.
:::
`;

writeLesson("money.money-demand-supply", {
  title: "The money supply and the demand for money",
  summary: "Define narrow and broad money, calculate money supply measures, explain the causes of changes in the money supply in an open economy, and explain the transactions, precautionary and speculative demand for money.",
  concepts: ["aecon.money.money-demand-supply"],
  estimatedMinutes: 50,
}, body);
