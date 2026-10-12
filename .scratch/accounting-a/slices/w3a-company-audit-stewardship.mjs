// W3a: company.audit-stewardship
import { concept, P, r2, fmt, money, chk } from "../lib.mjs";
import { mc } from "../tables/w3a-lib.mjs";

const pc = (a, c) => Math.round((a / c) * 1000) / 10;

concept("aacc.company.audit-stewardship", { file: "company/audit-stewardship", keyPrefix: "company.audit-stewardship" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Who appoints the external auditor of a limited company?",
    ok: ["The shareholders", "Correct: the auditor reports to the owners."],
    bad: [["The directors", "Directors are the people whose work is being reported on."], ["The finance manager", "An employee cannot be independent."], ["The tax authority", "The auditor is not appointed by the tax authority."]],
    explanation: "The shareholders appoint the external auditor so that the auditor is independent of the directors.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "To whom does an internal auditor report?",
    ok: ["The management of the company", "Correct: internal audit supports management."],
    bad: [["The shareholders at the annual general meeting", "That is the role of the external auditor."], ["The tax authority", "Internal auditors do not report to the tax authority."], ["The company's customers", "Customers do not receive audit reports."]],
    explanation: "An internal auditor is an employee or a firm appointed by management and reports to management.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What does it mean when an auditor says that financial statements give a true and fair view?",
    ok: ["They are free from material misstatement and follow the standards", "Correct: users can rely on them."],
    bad: [["Every figure is exactly right to the nearest dollar in the ledger", "An audit gives reasonable assurance, not exactness."], ["The company will not go out of business in the next year", "The opinion says nothing about future survival."], ["The directors have made a high profit compared with last year", "The opinion is not about the size of the profit."]],
    explanation: "A true and fair view means the statements are reliable and properly prepared, not that they are perfect.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "An audit firm prepares a company's financial statements and is then asked to audit them. Which threat to independence does this create?",
    ok: ["Self-review", "Correct: the firm would be checking its own work."],
    bad: [["Intimidation", "Intimidation arises from pressure by the directors."], ["Familiarity", "Familiarity arises from a long relationship."], ["Fee dependence only", "The fee may matter, but the main threat here is checking one's own work."]],
    explanation: "A firm cannot independently review accounts that it prepared itself.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "An auditor finds a material overstatement of inventory but everything else in the statements is correct. Which opinion is most suitable?",
    ok: ["A qualified opinion", "Correct: material, but confined to one item."],
    bad: [["An unqualified opinion", "A material error cannot be ignored."], ["An adverse opinion", "Adverse is for material and pervasive misstatements."], ["A disclaimer of opinion", "A disclaimer is for a lack of evidence, not for a known error."]],
    hints: ["Is the error material? Is it pervasive?"],
    explanation: "The error is material but limited to one item, so the auditor qualifies the opinion with an 'except for' statement.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "The records of a company were lost in a flood, and the auditor could not obtain evidence for most of the figures. Which opinion is most suitable?",
    ok: ["A disclaimer of opinion", "Correct: the possible effects are pervasive."],
    bad: [["An unqualified opinion", "The auditor cannot say the statements are true and fair."], ["An adverse opinion", "No misstatement has been found; evidence is missing."], ["A qualified opinion on one item", "The missing evidence affects most of the figures."]],
    hints: ["The problem is a lack of evidence over a wide area."],
    explanation: "When the possible effect of the missing evidence is pervasive, the auditor cannot form an opinion and issues a disclaimer.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement best describes the stewardship responsibility of directors?",
    ok: ["They care for the shareholders' funds and account for them", "Correct: stewardship is about care of the owners' money."],
    bad: [["They guarantee that the company will pay a dividend each year", "No such guarantee exists."], ["They must audit the financial statements every year", "Directors prepare the statements; the auditor audits them."], ["They own all the assets of the company personally", "The company, not the directors, owns its assets."]],
    hints: ["Whose money do the directors manage?"],
    explanation: "Directors are stewards: they manage assets owned by others and must report honestly on the results.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "An auditor finds misstatements of revenue, inventory and depreciation, each of them material, so the statements as a whole are unreliable. What opinion is given?",
    ok: ["An adverse opinion", "Correct: the misstatements are material and pervasive."],
    bad: [["A qualified opinion on revenue only", "The problems are spread over several items."], ["A disclaimer of opinion", "The auditor has evidence and has found misstatements."], ["An unqualified opinion with a note", "Material pervasive errors cannot be solved by a note."]],
    hints: ["Are the misstatements confined to one item?"],
    explanation: "Material misstatements that affect the statements as a whole lead to an adverse opinion.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "The external auditor prepares the company's financial statements and the directors check them.", answer: false, explanation: "False. The directors prepare the statements; the external auditor independently examines them and reports." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "An unqualified audit report guarantees that the company will not fail.", answer: false, hints: ["What does the opinion cover?"], explanation: "False. The opinion concerns whether the statements give a true and fair view at the date, not the company's future." });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each audit opinion to the situation in which it is given.",
    pairs: ["Unqualified", "Qualified", "Adverse", "Disclaimer"],
    right: ["No material misstatement found", "Material error confined to one item", "Material and pervasive misstatements", "Insufficient evidence and pervasive possible effect"],
    rightIndex: [0, 1, 2, 3],
    explanation: "The opinion depends on whether a matter is material and pervasive, and on whether it is a misstatement or a lack of evidence.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences about independence.",
    template: "An auditor who owns shares in the audited company faces a threat of {{blank:a}}. Rotating the audit partner is a safeguard against {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["self-interest"], choices: ["self-interest", "self-review", "intimidation"] },
      { id: "b", accepted: ["familiarity"], choices: ["familiarity", "self-review", "intimidation"] },
    ],
    explanation: "Share ownership gives the auditor a financial interest; a long relationship creates familiarity, which rotation reduces.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the report, prepared by the directors, that summarises the company's activities, results and dividends for the shareholders.",
    accepted: ["directors' report", "directors report", "the directors' report", "report of the directors"],
    explanation: "The directors' report is prepared by the directors; the auditor's report is separate.",
  });

  // numerical
  const e1 = 6300, p1 = 84000;
  const m1 = pc(e1, p1);
  chk(m1, 7.5);
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: m1, calculator: true, wrong: [pc(p1, e1), pc(e1, p1 + e1)],
    stem: `An auditor finds that a company's inventory is overstated by ${money(e1)}. Profit for the year is ${money(p1)}. Calculate the error as a percentage of profit, to one decimal place.`,
    hints: ["Divide the error by the profit and multiply by 100."],
    explanation: "6,300 ÷ 84,000 × 100 = 7.5%. Whether this is material depends on the auditor's judgement and the nature of the item.",
  });
  const f2 = 27000, t2 = 90000;
  const d2 = pc(f2, t2);
  chk(d2, 30);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: d2, daily: true, calculator: true, wrong: [pc(t2, f2), pc(f2, t2 - f2)],
    stem: `An audit firm's total income for the year is ${money(t2)}, of which ${money(f2)} is the fee from one audit client. Calculate the fee as a percentage of the firm's income, to one decimal place.`,
    explanation: "27,000 ÷ 90,000 × 100 = 30.0%. A high percentage increases the risk of a self-interest threat.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain the difference between the external auditor and the internal auditor.",
    points: ["The external auditor is independent of management, is appointed by the shareholders and reports to them on the statements", "The internal auditor is employed by or appointed by management and reports to management on controls and operations"],
    modelAnswer: "The external auditor is independent, is appointed by the shareholders and gives an opinion on the financial statements. The internal auditor works for management and reviews controls and operations.",
    explanation: "One mark for each auditor described.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why shareholders need audited financial statements.",
    points: ["They do not run the company and cannot check the records themselves", "The directors may have a reason to present results favourably, so an independent check is needed", "An opinion that the statements are true and fair gives the shareholders confidence to rely on them for decisions such as holding or selling shares"],
    modelAnswer: "Shareholders cannot examine the records themselves, and the directors may present results favourably. An independent audit opinion gives them confidence to rely on the statements for their decisions.",
    hints: ["Think about the distance between owners and managers."],
    explanation: "One mark each for the separation of ownership, the risk of bias and reliance on the opinion.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "State and explain three limitations of an audit.",
    points: ["Auditors test samples, so not every transaction is checked", "The audit depends on evidence and explanations given by the directors and staff, which may be false", "It is carried out after the year end, and a clean opinion says nothing about the future of the company"],
    modelAnswer: "Auditors work on samples, so errors can be missed. They rely on information from management, which may be false. The audit looks backwards and does not guarantee the company's future.",
    hints: ["Think about what the auditor can and cannot see."],
    explanation: "One mark for each limitation explained.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "An audit firm has audited the same company for twenty years and also provides its tax advice. Evaluate the threats to independence and advise the shareholders.",
    points: ["Familiarity: a long relationship may make the auditor too trusting and less sceptical", "Self-interest: the fees from tax advice add to the firm's income from this client and increase dependence", "Possible safeguards: rotate the audit partner, use separate teams for audit and tax work, or change the auditor", "Advice: the shareholders should consider appointing a new auditor or limiting the other work, because the appearance of independence also matters"],
    modelAnswer: "Twenty years of service may cause familiarity, and the extra tax fees increase dependence on this client. Rotation of the partner, separate teams, or a change of auditor are safeguards. The shareholders should act, since independence must be seen as well as real.",
    hints: ["Name each threat, then say what could reduce it."],
    explanation: "One mark each for familiarity, self-interest, a safeguard and advice.",
  });

  // Structured 1 (8 marks)
  const profA = 96000;
  const eA = 4300, eB = 58000;
  const pA = pc(eA, profA), pB = pc(eB, profA);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `The auditor of Zhombe Textiles Ltd, whose profit for the year was US\\$${fmt(profA)}, found the following in the year ended 31 December 2025.\n\n- Matter 1: a counting error overstated inventory by US\\$${fmt(eA)}. Nothing else was wrong.\n- Matter 2: a debt of US\\$${fmt(eB)} due from a customer that had gone into liquidation was included in receivables and not written off. Nothing else was wrong.\n- Matter 3: the directors refused to let the auditor see the contracts for the company's largest customer, whose sales were over half of revenue.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: pB, wrong: [pA, pc(profA, eB)], stem: "Calculate Matter 2 as a percentage of profit, to one decimal place.", explanation: `${fmt(eB)} ÷ ${fmt(profA)} × 100 = ${fmt(pB)}%.` }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which opinion is most suitable for Matter 1 alone?", options: [["Unqualified opinion", "Correct: the error is small."], ["Qualified opinion", "The error is not material."], ["Adverse opinion", "No pervasive error exists."], ["Disclaimer of opinion", "Evidence was available."]], answer: "A", explanation: `The error is ${fmt(pA)}% of profit, which is not material.` }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which opinion is most suitable for Matter 2 alone?", options: [["Qualified, as the error is material but limited to receivables", "Correct."], ["Unqualified, because only one item of the statements is wrong", "The error is large, so it is material."], ["Adverse, because receivables are an important item for lenders", "The error is not pervasive."], ["Disclaimer, because the debt cannot be recovered from the customer", "A disclaimer is for a lack of evidence."]], answer: "A", explanation: `At ${fmt(pB)}% of profit the error is material, and it is confined to one item.` }),
      P.mcq({ label: "(d)", marks: 1, stem: "Which opinion is most suitable for Matter 3?", options: [["A disclaimer or qualified opinion for a limitation of scope", "Correct: evidence was not available."], ["An unqualified opinion, since no error has been found", "The auditor could not obtain evidence."], ["An adverse opinion because errors were found in the contracts", "No error has been identified."], ["No report, because the directors did not co-operate", "The auditor must still report."]], answer: "A", explanation: "The directors limited the evidence for a large part of revenue. The auditor qualifies or disclaims, depending on how pervasive the effect could be." }),
      P.manual({ label: "(e)", marks: 3, stem: "Explain the difference between a qualified opinion and an adverse opinion.", points: ["A qualified opinion says that the statements give a true and fair view except for a stated matter", "An adverse opinion says that the statements do not give a true and fair view", "A qualified opinion is for material matters confined to part of the statements; an adverse opinion is for material and pervasive misstatement"], modelAnswer: "A qualified opinion says the statements are true and fair except for a specific matter. An adverse opinion says they are not true and fair. Qualified is for limited problems; adverse is for problems that affect the statements as a whole.", explanation: "One mark for each point." }),
    ],
    hints: ["Is the matter material? Is it pervasive?"],
    explanation: "This item tests the choice of audit opinion for three matters.",
  });

  // Structured 2 (12 marks)
  const fee = 41500, inc = 138000;
  const dep = pc(fee, inc);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Nyasha Dube is the audit partner of a firm that audits Chivhu Mills Ltd. She has been the partner for twelve years. The firm also prepares the company's tax returns. The audit and tax fees from Chivhu Mills Ltd are US\\$${fmt(fee)} a year, out of total income for the firm of US\\$${fmt(inc)}. The finance director has told her that he will change auditors if she insists on writing down the company's inventory by US\\$${fmt(22000)}, which the auditor believes is obsolete.`,
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which threat to independence arises from the finance director's statement?", options: [["Intimidation", "Correct: pressure is being applied to change an opinion."], ["Self-review of figures", "The firm is not checking its own work here."], ["Familiarity with the client", "This arises from a long relationship, not from pressure."], ["Advocacy for the company", "The auditor is not acting for the company."]], answer: "A", explanation: "A threat to dismiss the auditor if an adjustment is insisted on is intimidation." }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: dep, wrong: [pc(inc, fee), pc(fee, inc - fee)], stem: "Calculate the fees from this company as a percentage of the firm's total income, to one decimal place.", explanation: `${fmt(fee)} ÷ ${fmt(inc)} × 100 = ${fmt(dep)}%.` }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain two other threats to Nyasha's independence in this situation.", points: ["Familiarity: twelve years as partner may make her too trusting of the directors", "Self-interest: the firm earns about 30% of its income from this one client, so losing it would hurt", "Self-review (or advocacy): the firm prepares the tax returns, which depend on figures she audits"], modelAnswer: "Twelve years may cause familiarity. The fees are about 30% of income, so there is a self-interest threat. The firm also prepares tax returns based on figures she audits, a self-review threat.", explanation: "One mark for each threat explained; maximum three." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain what stewardship means for the directors of Chivhu Mills Ltd and why the audit supports it.", points: ["Directors hold the shareholders' funds and must use them in the shareholders' interests", "They must account for their use through the financial statements and the directors' report", "The audit gives the shareholders independent assurance that the account is true and fair"], modelAnswer: "The directors are stewards of the shareholders' money and must use it in their interests and report honestly on it. The audit assures the shareholders that the account given in the statements is true and fair.", explanation: "One mark for each of the three points." }),
      P.manual({ label: "(e)", marks: 3, stem: "Advise Nyasha what she should do about the inventory and the finance director's threat.", points: ["Insist on the write-down, because the inventory is overstated by US\\$22,000, which is a material amount compared with the user's decisions", "Report the pressure to the board or audit committee and record it, and consider safeguards such as a review by another partner", "If the directors refuse, qualify the opinion on inventory and, if necessary, resign, since a clean opinion would not be true and fair"], modelAnswer: "She should insist on the write-down, report the pressure to the board and have another partner review the file. If the directors still refuse, she should qualify the opinion on inventory, because a clean opinion would mislead the shareholders.", explanation: "One mark for each of the three steps." }),
    ],
    hints: ["Name the threat before the safeguard.", "Materiality compares the amount with profit or assets."],
    explanation: "This item tests independence, stewardship and the response to pressure from directors.",
  });
  void chk;

  b.card("DEFINITION", "What is an **external audit**?", "An independent examination of the financial statements by an auditor appointed by the shareholders, ending with an opinion on whether they give a true and fair view.");
  b.card("CONCEPT", "External against internal audit", "External: independent, appointed by shareholders, reports on the statements. Internal: employed by management, reports on controls and operations.");
  b.card("FACT", "The four audit opinions", "Unqualified; qualified (material but limited); adverse (material and pervasive); disclaimer (no opinion because evidence is missing).");
  b.card("DEFINITION", "What is **stewardship**?", "The duty of directors to look after the shareholders' funds, use them in their interests and report honestly on how they have been used.");
  b.card("DEFINITION", "What does a **true and fair view** mean?", "The statements are free of material misstatement and follow accounting standards and the law, so users can rely on them.");
  b.card("FACT", "Four threats to auditor independence", "Self-interest, self-review, familiarity and intimidation.");
  b.card("FACT", "Safeguards for independence", "Rotate the audit partner, use separate teams, refuse conflicting work, report pressure to the board, disclose and dispose of shares.");
  b.card("CONCEPT", "Limits of an audit", "It gives reasonable assurance, not a guarantee: it uses samples, relies on management's information and looks backwards.");
  b.card("DEFINITION", "What is **materiality**?", "A matter is material if omitting or misstating it could change the decisions of users of the statements.");
});
