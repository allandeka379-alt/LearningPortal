// W4a lesson generator: money.banking-institutions. Run: node .scratch/economics-a/tables/w4a-banking-institutions.mjs
import { chk, table, roundTo, fmt } from "../lib.mjs";
import { writeLesson } from "./w4a-kit.mjs";

const assets = [["Cash in vaults and balances at the central bank", 90], ["Money at call and short notice", 60], ["Treasury bills (government securities)", 150], ["Loans and advances to customers", 640], ["Buildings and equipment", 60]];
const liabs = [["Customers' deposits", 900], ["Shareholders' capital and reserves", 100]];
const A = assets.reduce((s, x) => s + x[1], 0), L = liabs.reduce((s, x) => s + x[1], 0);
chk(A, 1000); chk(L, 1000);
const tA = table(["Assets (what the bank owns or is owed)", "US\\$ million"], [...assets, ["**Total assets**", `**${fmt(A)}**`]]);
const tL = table(["Liabilities (what the bank owes)", "US\\$ million"], [...liabs, ["**Total liabilities and capital**", `**${fmt(L)}**`]]);
const reserve = (90 / 900) * 100; chk(reserve, 10);
const liquid = ((90 + 60 + 150) / 900) * 100; chk(roundTo(liquid, 1), 33.3);
const ldr = (640 / 900) * 100; chk(roundTo(ldr, 1), 71.1);
const cap0 = (100 / 1000) * 100; chk(cap0, 10);
const cap1 = ((100 - 40) / (1000 - 40)) * 100; chk(roundTo(cap1, 2), 6.25);

const body = String.raw`
## Introduction

Almost everyone in an economy depends on banks. Households keep their wages and savings there, firms borrow to buy machinery and to pay suppliers, and the government keeps its accounts there. A bank is also a business that wants to make a profit, and it is a special kind of business because its customers can ask for their money back at any time. When customers lose trust in a bank and all rush to withdraw their money (a **bank run**), the bank can fail even if it is sound. For this reason almost every country has a **central bank** to supervise the banking system and to support it in a crisis. In Zimbabwe this is the Reserve Bank of Zimbabwe.

This lesson describes the main financial institutions, the business of a commercial bank, and the roles of a central bank. The arithmetic of how banks create deposits is in the next lesson. You should know the functions of money.

## Key definitions

:::definition{term="Commercial bank"}
A profit-seeking financial institution that accepts deposits from the public, makes loans and provides payment services such as cheques, cards and transfers.
:::

:::definition{term="Central bank"}
The institution at the centre of a country's banking system that issues the currency, acts as banker to the government and to commercial banks, supervises the banks and carries out monetary policy. It does not normally compete with commercial banks for ordinary customers.
:::

:::definition{term="Lender of last resort"}
The central bank's role of lending to commercial banks that cannot find funds elsewhere to meet withdrawals, in order to prevent a loss of confidence spreading through the banking system.
:::

:::definition{term="Liquidity, security and profitability"}
**Liquidity** is how quickly and cheaply an asset can be turned into cash without loss of value. **Security** is the safety of an asset: the chance that it will be repaid. **Profitability** is the return (interest or fees) earned. A bank aims to balance the three.
:::

## Institutions in the money market

| Institution | Main business |
| --- | --- |
| Commercial banks | Accept deposits, lend to households and firms, provide payment services |
| Building societies | Take savings and lend mainly for house purchases (mortgages) |
| Merchant banks | Lend to firms for the short term, arrange finance for trade, advise companies and help them raise funds by issuing shares and bonds |
| Central bank | Bank to the government and to the commercial banks, controls note issue and supervises the banking system |

Other institutions include discount houses, microfinance institutions, insurance companies, pension funds, and mobile money providers. The **money market** is the market for short-term borrowing and lending (generally less than a year), where banks and other institutions lend to each other and the government sells short-term securities such as Treasury bills.

## The business of a commercial bank

A bank's **balance sheet** lists what it owns and is owed (assets) and what it owes (liabilities). Total assets always equal total liabilities plus capital. Here is an illustrative balance sheet for a small bank.

${tA}

${tL}

Deposits are a **liability** because they must be repaid to customers on demand or at an agreed date. A **loan** is an **asset** because it is owed to the bank. Capital (shareholders' funds) is the cushion that absorbs losses.

The assets are listed in order of **liquidity**, with the most liquid first, but the order is the reverse of the order of **profitability**: cash earns nothing, Treasury bills earn a little, and loans earn the most but are the least liquid and carry the greatest risk of default.

:::worked-solution{title="Balance-sheet ratios"}
Using the balance sheet above:
1. **Reserve ratio** = cash and central bank balances ÷ deposits = 90 ÷ 900 × 100 = **10%**.
2. **Liquid assets ratio** = (cash 90 + call money 60 + Treasury bills 150) ÷ deposits = 300 ÷ 900 × 100 = **33.3%**.
3. **Loan-to-deposit ratio** = 640 ÷ 900 × 100 = **71.1%**.
4. **Capital ratio** = capital ÷ total assets = 100 ÷ 1,000 × 100 = **10%**.
:::

:::worked-solution{title="Why capital matters"}
Borrowers default on US\$40 million of the loans, and the bank writes them off.
1. Assets fall from 1,000 to 960. Deposits (a liability) are unchanged at 900, so capital absorbs the loss and falls from 100 to **60**.
2. New capital ratio = 60 ÷ 960 × 100 = **6.25%**.
3. If the loss had been 110, capital would have been wiped out and the bank could no longer repay all depositors: it would be insolvent. This is why supervisors set minimum capital ratios.
:::

## The aims of a bank and their conflict

A bank wants to be **profitable**, to be **liquid** enough to repay depositors who ask for their money and to be **secure** against losses. The three aims conflict:

- Holding more cash and short-term bills makes the bank more liquid and secure but earns less.
- Lending more at higher interest rates raises profit, but loans are less liquid and riskier.

Banks reduce the conflict by holding a spread of assets (the balance sheet above) and by relying on the fact that not all depositors withdraw at once. Regulators require **minimum reserve ratios** and **capital ratios** so that profit-seeking does not endanger depositors.

## The roles of the central bank

1. **Banker to the government.** It holds the government's accounts, handles its payments and receipts, and helps it to borrow by selling government securities.
2. **Banker to the commercial banks.** Commercial banks keep reserve accounts at the central bank, and payments between banks are settled across those accounts.
3. **Lender of last resort.** It lends to banks that are short of cash but sound, usually at a penalty rate, to prevent a panic.
4. **Issuer of notes and coins.** It controls the supply of the national currency, where one exists.
5. **Monetary policy.** It sets the policy interest rate, conducts open-market operations and sets reserve requirements to influence the economy.
6. **Supervision and regulation.** It licenses banks, sets capital and liquidity requirements and inspects them.
7. **Management of foreign exchange reserves** and, in some countries, the exchange rate.

The objectives of a central bank are usually to keep prices stable, to keep the financial system stable and to support the government's economic objectives.

:::example{title="Evaluation paragraph"}
The lender-of-last-resort role helps to prevent bank runs, because depositors know the central bank will provide cash if a sound bank is short of it. However, it can create moral hazard: banks may take greater risks if they expect to be rescued. Strong supervision and capital requirements are therefore needed alongside the safety net. A central bank that is independent of political pressure is better able to resist demands for cheap finance for the government, but it must remain accountable to the public.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect the functions of commercial banks, the balance sheet, the aims of liquidity, security and profitability, and the roles of the central bank. ZIMSEC (Form 5) also names building societies and merchant banks and the money market institutions; Cambridge (A Level) concentrates on commercial and central banks and their functions and may ask you to explain how regulation affects stability.
:::

## Common mistakes

:::mistake{title="Treating deposits as assets"}
Customers' deposits are a **liability** of the bank: it owes the money to its customers. Loans made by the bank are assets.
:::

:::mistake{title="Confusing the central bank with a commercial bank"}
The central bank does not compete for ordinary deposits or loans. It serves the government and the banks and supervises them.
:::

:::mistake{title="Saying that banks can lend all their deposits"}
Banks must keep some reserves and liquid assets to meet withdrawals and regulations, so only part of deposits can be lent.
:::

## Exam tips

:::exam-tip{title="Where it is tested"}
ZIMSEC Paper 1 tests the institutions and functions; Paper 2 data responses use a simple balance sheet; Paper 3 essays ask about the roles of the central bank. Cambridge Paper 3 tests commercial and central bank functions, and Paper 4 uses money and banking data.
:::

:::exam-tip{title="Command words"}
*State* or *identify*: name the function. *Explain*: say what the central bank does and why it matters (for example, why a lender of last resort prevents bank runs). *Calculate*: divide the right-hand balance sheet items correctly and give the unit. *Discuss*: weigh the conflict between profit and liquidity or the benefits and the moral hazard of support.
:::

## Summary

:::summary
- Commercial banks accept deposits, make loans and provide payments; building societies, merchant banks and others also operate in the money market.
- A balance sheet shows assets (cash, bills, loans) and liabilities (deposits and capital); deposits are liabilities and loans are assets.
- Banks balance liquidity, security and profitability, which conflict; reserve and capital ratios protect depositors.
- The central bank is banker to the government and banks, lender of last resort, note issuer, implementer of monetary policy and supervisor.
- Central bank support prevents panics but can encourage risk-taking, so regulation is needed.
:::
`;

writeLesson("money.banking-institutions", {
  title: "Banks and the central bank: functions and objectives",
  summary: "Describe the institutions of the money market, explain the business of a commercial bank and its balance sheet, reserve and capital ratios, the conflict between liquidity, security and profitability, and the roles of the central bank.",
  concepts: ["aecon.money.banking-institutions"],
  estimatedMinutes: 55,
}, body);
