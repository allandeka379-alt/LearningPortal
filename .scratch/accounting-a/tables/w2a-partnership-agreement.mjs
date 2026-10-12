// Lesson generator: partnership.agreement  (Cambridge only)
import { fmt, chk, r2, table } from "../lib.mjs";
import { writeLesson, approTable } from "./w2a-lib.mjs";

const biz = "Mazvita and Takudzwa, partnership";
const when = "for the year ended 31 December 2025";
const profitBefore = 31600;
const loan = 12000;
const loanInt = r2(loan * 0.05);
const profit = r2(profitBefore - loanInt);
chk(profit, 31000);

const actAppro = approTable({ biz, when, profit, partners: [
  { name: "Mazvita", share: 1 },
  { name: "Takudzwa", share: 1 },
] });
chk(actAppro.residual, 31000);

const agrAppro = approTable({ biz, when, profit, partners: [
  { name: "Mazvita", salary: 8000, capital: 40000, interestOnCapitalPct: 6, share: 3 },
  { name: "Takudzwa", capital: 10000, interestOnCapitalPct: 6, share: 2 },
] });
const A = actAppro.calc.lines;
const G = agrAppro.calc.lines;
chk(G[0].total, 22400);
chk(G[1].total, 8600);
const compare = table(
  ["", "Mazvita", "Takudzwa", "Total"],
  [
    ["Share under the Partnership Act 1890 (equal)", A[0].total, A[1].total, r2(A[0].total + A[1].total)],
    ["Share under the agreement", G[0].total, G[1].total, r2(G[0].total + G[1].total)],
    ["Difference", r2(G[0].total - A[0].total), r2(G[1].total - A[1].total), 0],
  ],
  ["l", "r", "r", "r"],
);
const claims = table(
  ["Claim made by a partner", "Valid if there is no agreement?", "Reason"],
  [
    ["Takudzwa: profits should be shared 4 : 1, in proportion to capital", "No", "Profits and losses are shared equally"],
    ["Mazvita: I should receive a salary as I work full time", "No", "No partner is entitled to a salary"],
    ["Takudzwa: I should receive 6% interest on my capital", "No", "No interest on capital is allowed"],
    ["Takudzwa: my loan of 12,000 should earn interest", "Yes, at 5%", "Interest on loans or advances beyond capital is 5% a year"],
    ["Mazvita: interest should be charged on Takudzwa's drawings", "No", "No interest is charged on drawings"],
  ],
  ["l", "l", "l"],
);

const body = `## Introduction

Mazvita and Takudzwa started a bakery in Harare with a handshake. Mazvita works full time and invested US\\$40,000. Takudzwa invested US\\$10,000, lent the business a further US\\$12,000 and rarely visits. After two years they disagree about the profit: Mazvita believes she should be paid for her time, and Takudzwa thinks he should receive a larger share because of his loan. Without a written agreement the law decides.

This lesson explains what a written partnership agreement contains, why it is valuable and which rules of the Partnership Act 1890 apply when the agreement is silent. It is a **Cambridge AS Level** topic. ZIMSEC candidates do not need to name the Act, though they must still prepare the accounts from whatever profit-sharing terms a question states; Zimbabwean law is not examined for either board.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (syllabus) | Cambridge 9706 |
| --- | --- |
| Partners share by their agreement; the law is not named | Partnership agreement; Partnership Act 1890 (the rules that apply if there is no agreement) |
| Profit and loss appropriation account | Appropriation account |

This topic is Cambridge only. ZIMSEC students should read it for context and concentrate on the appropriation account in the previous lesson.
:::

## Key definitions

:::definition{term="Partnership agreement"}
A contract between the partners, preferably in writing, that sets out how the business will be run and how profits, losses and changes are handled.
:::

:::definition{term="Partnership Act 1890"}
A law of the United Kingdom that sets out the rules that apply to a partnership when the partners have not agreed otherwise. Cambridge examines its default rules on profit sharing, salaries, interest and loans.
:::

:::definition{term="Default rules"}
The terms the law supplies when there is no agreement: equal sharing, no salaries, no interest on capital or drawings, and 5% interest on loans.
:::

## Contents of a partnership agreement

A good agreement covers:

- the **profit-sharing ratio** for profits and for losses;
- **salaries** for partners who work in the business;
- **interest on capital** and **interest on drawings**, with the rates;
- **loans** from partners and the interest on them;
- the **capital** each partner must contribute and whether it is fixed or fluctuating;
- **admission** of new partners and **retirement** or death, including how goodwill and assets are valued;
- **settlement of disputes** (for example by an agreed arbitrator) and the arrangement for dissolution.

## Why a written agreement helps

A written agreement avoids disputes because everyone can see what was agreed. It rewards unequal contributions, with salaries for effort and interest for capital. It saves cost and time by setting out in advance how to value goodwill on a change. It also protects a partner who has invested more or worked more than the others, who would otherwise be treated equally. Against this, drafting costs time and legal fees, and the terms must be updated when the business changes.

## The rules when there is no agreement

:::keyfact{title="Partnership Act 1890: default rules for accounts"}
1. Profits and losses are shared **equally** between the partners, whatever their capital or effort.
2. No partner is entitled to a **salary**.
3. No **interest on capital** is allowed.
4. No **interest is charged on drawings**.
5. A partner who lends money to the firm beyond his or her capital is entitled to **interest at 5% a year**. This is an expense of the business, charged before profit for the year.
:::

The Act's rules apply only when the agreement is silent. If the partners have agreed a ratio but not salaries, for example, the agreed ratio applies and the default of no salaries applies. Where the partners' conduct shows they follow a different practice for a long time, the courts may treat it as an implied agreement, but exam questions state the facts you need.

:::worked-solution[Example 1: no agreement]
Mazvita and Takudzwa have no written agreement. The profit of the bakery for 2025 before interest on Takudzwa's loan of US\\$12,000 was US\\$31,600. Calculate how it is divided.

1. Interest on the loan at 5% = ${fmt(loanInt)}. It is an expense, so profit for the year = 31,600 - ${fmt(loanInt)} = ${fmt(profit)}.
2. There is no salary, interest on capital or interest on drawings.
3. The profit is shared equally.

${actAppro.md}

Mazvita receives ${fmt(A[0].total)} and Takudzwa ${fmt(A[1].total)} of profit, plus Takudzwa receives ${fmt(loanInt)} interest as a creditor.
:::

:::worked-solution[Example 2: the same business with a written agreement]
Suppose the partners had agreed: a salary of US\\$8,000 for Mazvita, 6% interest on capital (Mazvita US\\$40,000; Takudzwa US\\$10,000) and the residual profit shared 3 : 2.

${agrAppro.md}

${compare}

The agreement rewards Mazvita for her work and capital. Without it the result is equal shares, which would be unfair to her.
:::

## Applying the rules to a dispute

In a question about a dispute, take each claim in turn and decide whether the agreement or the Act supports it. Use the words "the Partnership Act 1890 states" or "the agreement provides" and apply the rule to the numbers.

:::worked-solution[Example 3: testing claims]
No agreement exists. Decide whether each claim is valid.

${claims}

Takudzwa's valid claim is for interest of ${fmt(loanInt)}; it is deducted before profit is shared. All the others fail, so the profit of ${fmt(profit)} is shared equally.
:::

## Common mistakes

:::mistake{title="Sharing profits by capital when there is no agreement"}
The Act says equal sharing, however different the capital. Unequal capital does not change the ratio unless the partners agreed.
:::

:::mistake{title="Treating interest on loans as an appropriation"}
The 5% on a loan is an expense of the business, deducted to reach profit for the year. Interest on capital is an appropriation.
:::

:::mistake{title="Allowing salaries or interest on capital by default"}
Without an agreement, no salary, no interest on capital and no interest on drawings are allowed.
:::

:::mistake{title="Quoting the Act when the question gives an agreement"}
Apply the Act only where the agreement is silent. Read the facts first.
:::

## Exam tips

:::exam-tip
This topic appears in Cambridge Paper 1 (multiple choice) and Paper 2 (15 or 30 mark questions on partnership accounts, usually as a short *explain* or *state* followed by calculations). For *state*, give the rule in a short sentence. For *calculate*, apply the rule to the figures. For *advise* or *evaluate* about a dispute, state the rule, apply it to the figures and suggest that the partners put the agreement in writing.
:::

:::exam-tip
A frequent *explain* question is to give two advantages of a written partnership agreement. Name the benefit and link it to the business: for example, a salary rewards the partner who works full time.
:::

## Summary

:::summary
- A partnership agreement sets the profit-sharing ratio, salaries, interest, capital, admissions and retirements, and the procedure for disputes.
- A written agreement avoids disputes and rewards unequal contributions.
- Without an agreement the Partnership Act 1890 applies: equal sharing, no salaries, no interest on capital or drawings, 5% on loans.
- Interest on a partner's loan is an expense of the business, deducted before profit for the year.
- The Act fills gaps only; the agreement prevails where it speaks.
- To resolve a dispute, test each claim against the agreement or the Act and show the effect on the accounts.
:::
`;

writeLesson(
  "partnership/agreement.md",
  {
    key: "partnership.agreement",
    title: "The partnership agreement and the Partnership Act 1890",
    summary: "The contents and benefits of a partnership agreement, the default rules of the Partnership Act 1890 and how to apply them to the accounts and to a dispute (Cambridge topic).",
    concepts: ["aacc.partnership.agreement"],
    estimatedMinutes: 40,
    level: "core",
  },
  body,
);
