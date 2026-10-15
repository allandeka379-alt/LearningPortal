// W4a lesson generator: money.functions-characteristics (free preview). Run: node .scratch/economics-a/tables/w4a-money-functions.mjs
import { chk, table, prices, roundTo } from "../lib.mjs";
import { writeLesson } from "./w4a-kit.mjs";

const rates = (n) => (n * (n - 1)) / 2;
chk(rates(5), 10); chk(rates(10), 45); chk(rates(20), 190); chk(rates(50), 1225);
const t1 = table(["Goods in the economy", "Exchange rates needed in barter", "Prices needed with money"], [5, 10, 20, 50].map((n) => [String(n), rates(n), n]));
const real = prices.realValue(1000, 125); chk(real, 800);
const loan = prices.realValue(5000, 160); chk(loan, 3125);
const t2 = table(["Function", "Example", "How inflation weakens it"], [
  ["Medium of exchange", "A shopper pays for maize meal with notes or a mobile money transfer", "Sellers refuse the money, demand payment at once or insist on another currency"],
  ["Unit of account", "Prices in shops are quoted in dollars", "Prices change so often that comparing them is difficult; price lists must be rewritten"],
  ["Store of value", "A family saves money for school fees", "The savings buy less each month"],
  ["Standard of deferred payment", "A bank lends money to be repaid in a year", "Repayment is worth less than expected, so lenders lose and borrowers gain"],
]);

const body = String.raw`
## Introduction

Imagine a market in Mutare where a maize farmer wants a pair of shoes but the shoemaker wants a haircut, not maize. Without money, the deal does not happen. Money solves this problem so well that almost every economy uses it. Zimbabweans have also seen what happens when money fails. When inflation became extremely high in 2007 and 2008, local notes lost their value so quickly that shopkeepers changed prices several times a day, people turned to barter and foreign currencies, and from 2009 foreign currencies were widely used. Today mobile money is used to pay for goods, transport and school fees, and bank deposits, notes and coins and electronic balances all play a role.

This lesson explains why money exists, what it does, what makes a good form of money and how inflation damages it. It is the base for the lessons on banks, credit creation and the money supply. You need no earlier knowledge beyond the basic economic problem.

## Key definitions

:::definition{term="Money"}
Anything that is generally accepted as a medium of exchange and in settlement of debts, so that people are willing to take it in return for goods, services and other assets.
:::

:::definition{term="Barter"}
The direct exchange of goods and services for other goods and services, without the use of money.
:::

:::definition{term="Double coincidence of wants"}
The situation in which two people each have something the other wants and are willing to exchange it. Barter works only if there is a double coincidence of wants.
:::

:::definition{term="Legal tender"}
Money that the law requires a creditor to accept in settlement of a debt (within limits set by law).
:::

## Barter and its problems

1. **Double coincidence of wants.** Finding someone who has what you want *and* wants what you have is difficult and takes time.
2. **No common measure of value.** Every good must be priced in terms of every other good. With $n$ goods there are $n(n-1) \div 2$ exchange rates.
3. **Indivisibility.** A cow cannot be divided to pay for a bag of sugar.
4. **Difficulty in storing wealth.** Many goods, such as fresh vegetables, perish; others are costly to store.
5. **No standard for deferred payments.** It is hard to agree what a loan of grain will be repaid in next year.

${t1}

With 20 goods, barter needs 190 exchange rates, whereas money needs only 20 prices. Money lowers the cost of finding and agreeing a trade, so it allows people to specialise and trade more.

## The functions of money

| | Function | Meaning |
| --- | --- | --- |
| 1 | Medium of exchange | Money is accepted in payment for goods and services, so a trade needs no double coincidence of wants |
| 2 | Unit of account | Money is the measure in which prices, wages and debts are expressed |
| 3 | Store of value | Money can be kept and used later to buy goods |
| 4 | Standard of deferred payment | Money is used to state the amount of a debt to be repaid in the future |

## The characteristics of good money

| Characteristic | Why it matters | Example |
| --- | --- | --- |
| Acceptability | People must be willing to take it | Notes and bank transfers are widely accepted |
| Durability | It must last through repeated use | Coins last longer than paper |
| Portability | It must be easy to carry and move | Mobile money moves by phone |
| Divisibility | It must be possible to make exact payments in small amounts | Coins and cents |
| Uniformity | One unit must be the same as another | Notes of the same value are identical |
| Limited supply | It must be scarce, or it will lose value | A central bank controls note issue |
| Stability of value | It should keep its purchasing power | Low inflation |

Money should also be difficult to counterfeit; security features on notes help here.

## Forms of money

- **Commodity money.** Goods with value in themselves, such as cattle, shells or gold, used as money in the past.
- **Notes and coins (fiat money).** Their value comes from public trust and from being declared legal tender, not from the metal or paper.
- **Bank deposits.** Balances in bank accounts, spent by cheque, card or transfer. In most economies they are the largest part of the money supply.
- **Electronic and mobile money.** Balances held in electronic wallets on a phone or a card and moved by an instruction. The balances are normally backed by funds held in bank accounts.

## Inflation and the functions of money

${t2}

:::worked-solution{title="Store of value under inflation"}
A household keeps US\$1,000 in cash for a year. Over the year the price index rises from 100 to 125.
1. Real value of the savings = nominal value ÷ price index × 100 = 1,000 ÷ 125 × 100 = **US\$800** in the prices of the start of the year.
2. The household has lost 200, or 20%, of the purchasing power of its savings.
3. If the household had held a good whose price rose with inflation, or foreign currency with lower inflation, it would have lost less.
:::

:::worked-solution{title="Deferred payment under inflation"}
A lender gives a loan of US\$5,000 to be repaid in two years. Over the two years the price index rises from 100 to 160.
1. Real value of the repayment = 5,000 ÷ 160 × 100 = **US\$3,125** in the prices of the date the loan was made.
2. The lender gets back 5,000 − 3,125 = **US\$1,875** less purchasing power than was lent; the borrower gains by the same amount.
3. If lenders expect inflation they charge a higher interest rate.
:::

In extreme inflation (hyperinflation) the national money may stop working as a unit of account and store of value. People may switch to a foreign currency or to goods, a process called currency substitution, and the economy may partly return to barter.

:::example{title="Evaluation paragraph"}
Mobile money has made payments quicker, cheaper and safer in places where few people have bank accounts, and because it moves by phone it is highly portable and divisible. However, it relies on mobile networks and electricity, on trust in the provider and on clear regulation; it does not remove the effects of inflation, because a balance still loses value if prices rise rapidly. Whether mobile money is "better" than cash therefore depends on access to networks, the cost of using it and the stability of the currency in which it is held.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect the problems of barter, the four functions, the characteristics and forms of money and the effects of inflation. ZIMSEC (Form 5) lists the characteristics explicitly and the forms of money; Cambridge (A Level) concentrates on the functions and on how a well-functioning monetary system supports exchange and how inflation affects it.
:::

## Common mistakes

:::mistake{title="Confusing money with wealth or income"}
Money is only what is accepted in payment. A house, shares or a car are wealth, but they are not money. Income is a flow earned in a period.
:::

:::mistake{title="Mixing up the functions"}
A price tag is the unit of account; saving for next year is the store of value; paying at a shop is the medium of exchange; a loan agreement is the standard of deferred payment.
:::

:::mistake{title="Listing characteristics without explaining them"}
Say why each matters, for example "divisibility, so exact change can be given for small purchases".
:::

## Exam tips

:::exam-tip{title="Where it is tested"}
ZIMSEC Paper 1 tests functions, characteristics and barter; Paper 2 and 3 use money as the start of banking questions. Cambridge Paper 3 (A Level) asks about the functions of money and the effect of inflation on them.
:::

:::exam-tip{title="Command words"}
*Define*: use "generally accepted". *Explain*: link each function to a problem of barter. *Discuss* or *evaluate*: compare forms of money (cash, deposits, mobile money) on the characteristics and reach a judgement.
:::

## Summary

:::summary
- Money is anything generally accepted as a medium of exchange and in settlement of debts.
- Barter needs a double coincidence of wants and requires many exchange rates: n(n − 1) ÷ 2 for n goods.
- The four functions are medium of exchange, unit of account, store of value and standard of deferred payment.
- Good money is acceptable, durable, portable, divisible, uniform, limited in supply and stable in value.
- Forms include commodity money, notes and coins, bank deposits and electronic or mobile money; inflation weakens every function.
:::
`;

writeLesson("money.functions-characteristics", {
  title: "Money: functions and characteristics",
  summary: "Explain the problems of barter, the four functions and the characteristics of money, describe its forms including mobile money, and explain how inflation weakens each function.",
  concepts: ["aecon.money.functions-characteristics"],
  estimatedMinutes: 45,
  freePreview: true,
}, body);
