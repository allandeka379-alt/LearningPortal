// Lesson generator: company.audit-stewardship
import { fmt, chk, r2, table } from "../lib.mjs";
import { writeLesson, front } from "./w3a-lib.mjs";

const pc = (a, b) => r2((a / b) * 100);
// Example 1: classify opinions
const profit = 120000;
const sc = [
  { id: "A", text: "inventory was overstated by US$3,500 because of a counting error", err: 3500, opinion: "Unqualified (clean) opinion", why: "The error is small compared with profit and does not affect a user's decision, so it is not material." },
  { id: "B", text: "inventory was overstated by US$48,000 because damaged goods were valued at cost; every other figure is correct", err: 48000, opinion: "Qualified opinion (\"except for\")", why: "The error is material but confined to one item; the rest of the statements are reliable." },
  { id: "C", text: "the sales records of one branch were destroyed in a fire, so the auditor could not obtain evidence for that branch's revenue of US$310,000", err: 310000, opinion: "Qualified opinion (limitation of scope), or a disclaimer if the effect is wide", why: "The auditor could not check a material item; a disclaimer is used only if the possible effect is pervasive." },
  { id: "D", text: "depreciation was not charged on any non-current asset, and revenue was recorded before delivery in several months", err: 0, opinion: "Adverse opinion", why: "The misstatements are material and pervasive: the statements as a whole do not give a true and fair view." },
];
const pA = pc(3500, profit), pB = pc(48000, profit);
chk(pA, 2.92, 0.01); chk(pB, 40);
// Example 2: independence
const fee = 38000, practice = 120000;
const dep = pc(fee, practice); chk(dep, 31.67, 0.01);
const rows1 = table(["Scenario", "Material?", "Opinion"], [
  ["A: " + sc[0].text.replace("US$", "US\\$"), `No: ${pA}% of profit`, sc[0].opinion],
  ["B: " + sc[1].text.replace("US$", "US\\$"), `Yes: ${pB}% of profit`, sc[1].opinion],
  ["C: " + sc[2].text.replace("US$", "US\\$"), "Yes, but no evidence", sc[2].opinion],
  ["D: " + sc[3].text, "Yes and pervasive", sc[3].opinion],
], ["l", "l", "l"]);

const thr = table(["Threat", "Example in the case", "Possible safeguard"], [
  ["Self-interest", "The auditor holds shares in the company; the fee is " + `${dep}% of the practice's income`, "Dispose of the shares; limit reliance on one client"],
  ["Self-review", "The auditor's firm prepared the accounts that are now being audited", "Use a different team to audit, or decline the bookkeeping work"],
  ["Familiarity", "The same senior auditor has served the company for fifteen years", "Rotate the audit partner"],
  ["Intimidation", "The finance director threatens to change auditors if an adjustment is insisted on", "Report the pressure to those charged with governance"],
], ["l", "l", "l"]);

const body = `## Introduction

Shareholders of Tavonga Motors Ltd own the company but do not run it. The directors do, and they prepare the financial statements. How can a shareholder in Masvingo know that the profit figure is honest? An independent **auditor** examines the records and reports an opinion on whether the statements give a true and fair view. The directors, in turn, are **stewards**: they hold the shareholders' funds and must account for how they used them.

This topic is mostly about reasons and judgements, not calculations. You should already know the statements of a company. You are asked to describe the roles of auditors and directors, to identify the type of audit opinion suited to a scenario and to judge whether an auditor is independent. Cambridge tests it at A Level (Paper 3). ZIMSEC tests it in Form 5. No audit standard numbers are required.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (syllabus and common usage) | Cambridge 9706 |
| --- | --- |
| Auditors' report; qualified report | Auditor's report; modified opinion (qualified, adverse, disclaimer) |
| Clean (unqualified) report | Unmodified (unqualified) opinion |
| Directors' report | Directors' report |
| Stewardship; accountability | Stewardship; accountability to shareholders |

Both boards ask for the same ideas. ZIMSEC questions often give a short scenario and ask for the type of report; Cambridge questions often ask you to evaluate independence.
:::

## Key definitions

:::definition{term="External audit"}
An independent examination of a company's financial statements by a qualified auditor appointed by the shareholders, who gives an opinion on whether they give a true and fair view.
:::

:::definition{term="Internal audit"}
A function carried out by employees or a firm appointed by management to review controls and operations. It reports to management, not to the shareholders.
:::

:::definition{term="True and fair view"}
The statements are free from material misstatement and are prepared in accordance with accounting standards and the law, so that users can rely on them.
:::

:::definition{term="Stewardship"}
The duty of directors to look after the assets of the company, use them in the interests of shareholders and report honestly on how they have done so.
:::

:::definition{term="Materiality"}
An item is material if leaving it out or misstating it could change the decisions of users of the statements.
:::

## Auditors, directors and the reports

The **directors** prepare the statements, keep proper accounting records, safeguard assets and prepare a **directors' report** summarising the activities, results, dividends and future plans. The **auditor** does not prepare the accounts. The auditor checks them, gathers evidence, and reports to the shareholders. Auditing is not a guarantee that every figure is right, and it does not detect all fraud; it gives reasonable assurance.

An **external auditor** is independent of the directors and is appointed by the shareholders. An **internal auditor** works for the business and reviews systems on behalf of management. The auditor's report states the opinion and describes the basis for it.

:::keyfact{title="Types of audit opinion"}
- **Unqualified (unmodified):** the statements give a true and fair view.
- **Qualified ("except for"):** a material misstatement or a limitation of scope exists, but it is confined to one item.
- **Adverse:** misstatements are material and pervasive; the statements do not give a true and fair view.
- **Disclaimer:** the auditor was unable to obtain enough evidence and the possible effects are pervasive, so no opinion is given.
:::

:::worked-solution[Example 1: choosing the audit opinion]
Mutare Hardware Ltd reports a profit for the year of US\\$${fmt(profit)}. The auditor finds the following in four separate companies. For each, state the opinion and explain why. (The percentages are the error as a share of profit.)

${rows1}

1. Scenario A: ${fmt(3500)} ÷ ${fmt(profit)} × 100 = ${pA}%. An error of this size would not change a user's decision, so the opinion is unqualified.
2. Scenario B: ${fmt(48000)} ÷ ${fmt(profit)} × 100 = ${pB}%. The misstatement is material but it affects only inventory, so a qualified "except for" opinion is given.
3. Scenario C: the auditor could not check ${fmt(310000)} of revenue; this is a limitation of scope. A qualified opinion is used if the effect is limited, and a disclaimer if the possible effect is pervasive.
4. Scenario D: several material errors spread through the statements make them unreliable as a whole, so the opinion is adverse.
:::

## Independence and stewardship

The value of an audit depends on trust. An auditor must be independent in fact and in appearance. Threats to independence include: the auditor owning shares in the company (self-interest); auditing figures that the audit firm prepared (self-review); acting for the same client for many years (familiarity); and pressure from directors (intimidation). Safeguards include rotating partners, using separate teams, refusing the work and reporting the pressure.

:::worked-solution[Example 2: judging independence]
Mr Chikore audits Tavonga Motors Ltd. His firm also writes up its accounting records. Its fee for the audit is US\\$${fmt(fee)}, which is ${dep}% of the firm's total income of US\\$${fmt(practice)}. He owns 2,000 shares in the company. Identify the threats to his independence and suggest safeguards.

${thr}

1. Fee dependence: ${fmt(fee)} ÷ ${fmt(practice)} × 100 = ${dep}%. Almost a third of the firm's income comes from one client, so the auditor may hesitate to modify the opinion.
2. The two threats of self-interest (shares and fee) and self-review (bookkeeping) are the most serious. If they cannot be removed, the firm should decline the audit.
3. Conclusion: his independence is not secure. The shareholders should be told, because an auditor who is not independent cannot give a reliable opinion.
:::

## Why users rely on the audit

Shareholders, lenders and the tax authority use the statements to make decisions. They cannot examine the books themselves, so they rely on the auditor's report, the directors' report and the true and fair view. An audit adds credibility, deters fraud and helps users compare companies. But it has limits: it is based on samples, depends on honest answers, and is done after the event. A clean report does not mean that the company is a good investment or that it will survive.

## Common mistakes

:::mistake{title="Saying the auditor prepares the accounts"}
The directors prepare the statements. The auditor examines them independently and gives an opinion.
:::

:::mistake{title="Saying an audit guarantees that the figures are exactly correct"}
An audit gives reasonable assurance that the statements are free from material misstatement, not a guarantee of accuracy or freedom from fraud.
:::

:::mistake{title="Confusing qualified, adverse and disclaimer"}
Qualified: material but limited. Adverse: material and pervasive, so the statements are not true and fair. Disclaimer: no opinion because evidence could not be obtained.
:::

:::mistake{title="Describing the internal auditor as independent of the directors"}
Internal auditors work for management. Only the external auditor is independent and reports to the shareholders.
:::

:::mistake{title="Forgetting to name the threat when judging independence"}
Name the threat (self-interest, self-review, familiarity or intimidation) and then give a specific safeguard.
:::

## Exam tips

:::exam-tip
Tested in ZIMSEC Papers 1 and 2 and in Cambridge Papers 1 and 3. For *state* or *define*, give a precise definition in one line. For *explain*, give the reason with a link to users' decisions. For *evaluate independence* or *advise*, name the threat, give figures where possible (for example the fee as a percentage of income), propose a safeguard and give a judgement.
:::

:::exam-tip
When asked for the type of opinion, apply two tests: is the matter material, and is it pervasive? Then say whether the cause is a misstatement (qualified or adverse) or a lack of evidence (qualified or disclaimer).
:::

## Summary

:::summary
- Directors prepare the statements and are stewards of shareholders' funds; the external auditor independently reports on whether they give a true and fair view.
- Internal audit reports to management; external audit reports to shareholders.
- Opinions: unqualified; qualified (material, limited); adverse (material and pervasive); disclaimer (no opinion, insufficient evidence).
- Independence is threatened by self-interest, self-review, familiarity and intimidation, and is protected by safeguards.
- Users rely on the audit for credibility, but it gives reasonable assurance, not a guarantee.
:::
`;
writeLesson("company/audit-stewardship.md", front("company.audit-stewardship", "Auditing, stewardship and directors' and auditors' reports", "Explain the role of the auditor and the directors, the types of audit opinion, the true and fair view, stewardship and the threats to an auditor's independence.", ["aacc.company.audit-stewardship"], 50), body.split("US$").join("US\\$"));
