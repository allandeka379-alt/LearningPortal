// W1a: intro.ethics
import { concept, P, table, check, sum, r2, fmt, money, ratios, chk } from "../lib.mjs";
import { mc } from "../tables/w1a-lib.mjs";

concept("aacc.intro.ethics", { file: "intro/ethics", keyPrefix: "intro.ethics" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which fundamental principle requires an accountant not to disclose a client's information without proper authority?",
    ok: ["Confidentiality", "Correct: information gained through work must be kept private unless there is a legal or professional duty to disclose it."],
    bad: [["Objectivity", "Objectivity is about freedom from bias."], ["Integrity", "Integrity is about honesty and straightforwardness."], ["Professional competence", "This concerns knowledge, skill and care."]],
    explanation: "Confidentiality protects information obtained in the course of work.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What does the principle of **integrity** require of an accountant?",
    ok: ["To be straightforward and honest in professional dealings", "Correct: no misleading or false statements."],
    bad: [["To keep all information secret from everyone", "That is not what integrity means; confidentiality has limits."], ["To work as fast as possible", "Speed is not an ethical principle."], ["To follow the instructions of the employer in all cases", "An accountant must refuse an unethical instruction."]],
    explanation: "Integrity is honesty and straight dealing.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION", daily: true,
    stem: "An auditor is asked to audit a company owned by her brother. Which threat does this create?",
    ok: ["Familiarity", "Correct: a close relationship may make her too sympathetic to his view."],
    bad: [["Intimidation", "There is no pressure or threat in the facts."], ["Self-interest through a bonus", "No bonus is mentioned."], ["Lack of competence", "The facts say nothing about skill."]],
    explanation: "A close family tie is a familiarity threat to objectivity.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement about tax is correct?",
    ok: ["Tax evasion, such as hiding sales, is illegal, but tax avoidance within the law is not", "Correct: evasion breaks the law; avoidance uses allowances the law provides."],
    bad: [["Tax avoidance and tax evasion are both illegal", "Avoidance is legal."], ["Tax evasion is a way of saving tax by using allowances correctly", "That describes avoidance."], ["Tax rules do not apply to small businesses", "They apply to every business."]],
    explanation: "Evasion is illegal; avoidance is legal planning.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A director tells the company accountant to leave a large unpaid invoice out of the accounts so that the profit looks better for the bank. What should the accountant do?",
    ok: ["Refuse, record the liability, explain in writing and refer to a senior person if the pressure continues", "Correct: this protects integrity and keeps a record."],
    bad: [["Leave it out, because the director is the accountant's employer", "An accountant's duty of integrity overrides the instruction."], ["Leave it out but tell the bank verbally", "The statements would still be misleading."], ["Resign immediately without raising the matter", "Resignation may be a last step, but first the matter should be raised."]],
    hints: ["What action protects the users of the accounts?"],
    explanation: "The accountant should record the liability, document the instruction and refer the matter.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A finance manager is offered a bonus based on the profit she reports. Which threat does this create?",
    ok: ["Self-interest", "Correct: her own financial gain could influence her judgement."],
    bad: [["Familiarity", "No close relationship is involved."], ["Intimidation", "Nobody is pressuring her."], ["Confidentiality", "This is a principle, not a threat."]],
    hints: ["Who benefits if profit is higher?"],
    explanation: "A bonus linked to the reported figure is a self-interest threat.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is an example of a **safeguard** against an ethical threat?",
    ok: ["Having a second accountant review the work", "Correct: independent review reduces bias."],
    bad: [["Accepting the client's gift", "A gift can create a threat."], ["Keeping the instructions secret from the owner", "Secrecy does not remove the threat."], ["Doing the work faster", "Speed does not address ethics."]],
    hints: ["Which action reduces the risk of bias?"],
    explanation: "Independent review is a safeguard.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which is the **most serious** consequence for stakeholders when a company's profit is deliberately overstated?",
    ok: ["Lenders and investors may take decisions on false information and lose money", "Correct: they rely on the statements to decide how much to lend or invest."],
    bad: [["Customers must pay higher prices", "Overstated profit does not by itself raise prices."], ["The business must change its financial year", "The year end is unaffected."], ["The tax authority loses all its records", "Records are not affected by the overstatement."]],
    hints: ["Who depends on the figures?"],
    explanation: "Misleading information leads users to wrong decisions.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Confidentiality means that an accountant may never disclose client information in any circumstances.",
    answer: false,
    explanation: "False. Disclosure may be required by law or allowed by a professional duty, for example to the authorities.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Professional ethics require accountants to do only what the law requires.",
    answer: false,
    explanation: "False. Ethical standards go beyond the law; for example, honesty and objectivity apply even when no law is broken.",
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each situation to the principle at risk.",
    pairs: ["An accountant tells a competitor about a client's costs", "An auditor reports a result she knows is false", "An accountant prepares a tax computation on a topic she has never studied", "An accountant accepts a client's gift and then ignores a problem in the accounts", "An accountant makes false claims about her qualifications"],
    right: ["Confidentiality", "Integrity", "Professional competence and due care", "Objectivity", "Professional behaviour"],
    rightIndex: [0, 1, 2, 3, 4],
    explanation: "Each situation breaches the principle shown.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word in each gap.",
    template: "Hiding sales to pay less tax is tax {{blank:a}} and is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["evasion"], choices: ["evasion", "avoidance"] },
      { id: "b", accepted: ["illegal"], choices: ["legal", "illegal"] },
    ],
    explanation: "Evasion means hiding or misreporting income; it is illegal.",
  });

  const cp = r2(18900 - 2350);
  check("cp", cp, 16550);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: cp, daily: true, calculator: true, wrong: [r2(18900 + 2350)],
    stem: "Farai's draft profit for the year was US\\$18,900, but he was asked to leave out a repair bill of US\\$2,350 that had been incurred in the year. Calculate the correct profit.",
    explanation: "18,900 - 2,350 = 16,550. Leaving out the bill overstates profit.",
  });
  const over = (2350 / 16550) * 100;
  b.num({
    d: 3, skill: "ANALYSIS", kind: "pct", value: over, calculator: true, wrong: [r2((2350 / 18900) * 100)],
    stem: "Using the figures in the previous question (correct profit US\\$16,550, omitted bill US\\$2,350), calculate by what percentage the draft profit overstates the correct profit, to one decimal place.",
    hints: ["Express the overstatement as a percentage of the correct profit."],
    explanation: "2,350 ÷ 16,550 × 100 = 14.2%. Dividing by the draft profit gives 12.4%.",
  });
  const cr = ratios.current(21000, 12000 + 3000);
  chk(cr, 1.4, 0.0001);
  b.num({
    d: 3, skill: "ANALYSIS", kind: "ratio", value: cr, calculator: true, wrong: [r2(ratios.current(21000, 12000))],
    stem: "A manager wants to omit an accrued expense of US\\$3,000 so that the current ratio meets a bank's requirement. Current assets are US\\$21,000 and current liabilities, without the accrual, are US\\$12,000. Calculate the correct current ratio as x : 1 to two decimal places.",
    hints: ["The accrued expense is a current liability."],
    explanation: "21,000 ÷ (12,000 + 3,000) = 1.40. Omitting the accrual would show 1.75.",
  });
  const tx = r2(8400 * 0.3);
  check("tx", tx, 2520);
  b.num({
    d: 4, skill: "APPLICATION", kind: "money", value: tx, calculator: true, wrong: [8400, r2(8400 * 0.7)],
    stem: "A shopkeeper does not record cash sales of US\\$8,400. Assume the tax rate on profit is 30% (an assumption for this question only). Calculate the tax avoided by this evasion.",
    hints: ["The unrecorded sales are all profit in this question."],
    explanation: "30% × 8,400 = 2,520.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the ethical threat that arises when an accountant is offered a bonus linked to the profit that he reports.",
    accepted: ["self-interest", "self interest", "self-interest threat", "self interest threat"],
    explanation: "A personal financial interest in the reported figure is a self-interest threat.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain what is meant by a safeguard and give **one** example.",
    points: ["A safeguard is an action or rule that removes an ethical threat or reduces it to an acceptable level", "Example: review of the work by another accountant / referring the matter to a senior person / refusing the instruction"],
    modelAnswer: "A safeguard removes or reduces an ethical threat. For example, a second accountant can review the work of an accountant who has a family connection with the client.",
    explanation: "Definition plus an example.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why bankers and other lenders depend on the ethical behaviour of accountants.",
    points: ["Lenders decide whether to lend from the financial statements", "If the statements are manipulated they may lend more than the business can repay and lose money", "Trust in the profession would fall, making lenders reluctant to lend to honest businesses too"],
    modelAnswer: "Lenders use the statements to decide whether the business can repay. If the figures are manipulated, they may lend too much and lose money, and if this happens often they lose trust in all statements.",
    hints: ["What decision does the lender take using the accounts?"],
    explanation: "Link the user's decision to the harm of dishonesty.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Thandeka, an accountant for a small company in Bulawayo, is told by the owner to value closing inventory at selling price instead of cost because 'the bank expects good profit'. Evaluate what Thandeka should do.",
    points: ["Valuing inventory above cost overstates profit and assets, which misleads the bank (breach of integrity)", "She is under pressure from the owner (intimidation), so she should refuse and explain the correct basis (the lower of cost and net realisable value)", "If the owner insists, she should refer to a senior person or professional body; resignation may be a last resort, and she should document her actions"],
    modelAnswer: "Valuing inventory at selling price overstates profit and would mislead the bank, breaching integrity. Thandeka should refuse, explain that inventory is valued at the lower of cost and net realisable value, and keep a record. If the pressure continues she should refer the matter to a senior person or the professional body.",
    hints: ["Who would be misled, and what can she do about the pressure?"],
    explanation: "A judgement with the principle, the pressure and the action.",
  });

  // Structured 1: 10 marks
  const draft = 52000;
  const wages = 3600;
  const correct = r2(draft - wages);
  const pctOver = (wages / correct) * 100;
  check("correct", correct, 48400);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Nyasha is the bookkeeper of Mutare Wholesalers. At the year end the draft profit before recording wages of ${money(wages)} earned in December but not yet paid was ${money(draft)}. The owner tells her not to record the wages because he plans to apply for a bank overdraft.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: correct, wrong: [draft], stem: "Calculate the correct profit for the year.", explanation: "52,000 - 3,600 = 48,400." }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: pctOver, wrong: [r2((wages / draft) * 100)], stem: "Calculate the percentage by which the draft profit overstates the correct profit, to one decimal place.", explanation: "3,600 ÷ 48,400 × 100 = 7.4%." }),
      P.match({ label: "(c)", stem: "Match each description to the ethical term.", pairs: ["Nyasha's instruction comes from her employer, who has power over her job", "The unrecorded wages would mislead the bank", "Nyasha refuses and reports the instruction to a senior person"], right: ["Intimidation (a threat)", "Breach of integrity", "Safeguard"], rightIndex: [0, 1, 2], explanation: "The instruction is a pressure threat, the omission breaches integrity and referring it upwards is a safeguard." }),
      P.manual({ label: "(d)", marks: 3, stem: "Advise Nyasha on what she should do.", points: ["Refuse to leave out the wages and record the accrual", "Explain that the profit would be misleading to the bank and keep a written record of the instruction", "Refer the matter to a senior person or professional body if the owner insists"], modelAnswer: "Nyasha should refuse and record the wages as an accrued expense. She should explain that omitting them would mislead the bank, keep a written note of the instruction and refer the matter to a senior person or professional body if the owner insists.", explanation: "Action, reason and escalation." }),
    ],
    hints: ["The wages are an expense of the year.", "Think of integrity and what safeguards exist."],
    explanation: "This item tests the effect of an ethical breach on profit and the right response.",
  });

  // Structured 2: 14 marks
  const profit0 = 31000;
  const repairs = 9500;
  const revenue = 250000;
  const m0 = ratios.profitMargin(profit0, revenue);
  const profit1 = r2(profit0 + repairs);
  const m1 = ratios.profitMargin(profit1, revenue);
  check("profit1", profit1, 40500);
  chk(m0, 12.4, 0.0001);
  chk(m1, 16.2, 0.0001);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Zambezi Plastics, a private company in Harare, had revenue of ${money(revenue)} and profit for the year of ${money(profit0)} after charging repairs to its machines of ${money(repairs)}. Its bank loan agreement requires a profit margin (profit ÷ revenue) of at least 15%. The finance director asks the accountant to treat the repairs as part of the cost of the machines (capital expenditure) instead of as an expense.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: profit1, wrong: [profit0], stem: "Calculate the profit if the repairs were treated as capital expenditure (ignore depreciation).", explanation: "31,000 + 9,500 = 40,500." }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: m0, wrong: [r2((profit1 / revenue) * 100)], stem: "Calculate the profit margin with the repairs correctly charged as an expense, to one decimal place.", explanation: "31,000 ÷ 250,000 × 100 = 12.4%, below the 15% requirement." }),
      P.num({ label: "(c)", marks: 2, kind: "pct", value: m1, wrong: [m0], stem: "Calculate the profit margin if the repairs were treated as capital expenditure, to one decimal place.", explanation: "40,500 ÷ 250,000 × 100 = 16.2%, which would meet the requirement." }),
      P.mcq({ label: "(d)", marks: 2, stem: "Which fundamental principle would the accountant breach by following the director's instruction?", options: [["Integrity", "Correct: repairs are a revenue expense; treating them as an asset gives a false picture."], ["Confidentiality", "No information is disclosed to outsiders."], ["Professional competence", "The issue is honesty, not skill."], ["None, because the instruction came from a director", "An instruction from an employer does not remove the accountant's duty of honesty."]], answer: "A", explanation: "Misrepresenting repairs as an asset to meet a loan condition is dishonest." }),
      P.manual({ label: "(e)", marks: 3, stem: "Identify the threat and give **two** safeguards the accountant could use.", points: ["Threat: pressure from the director to manipulate figures (intimidation)", "Safeguard: refuse and explain that repairs are revenue expenditure", "Safeguard: refer the matter to the audit committee / senior person / professional body, and keep a written record"], modelAnswer: "The threat is pressure from the finance director to manipulate the figures. The accountant should refuse and explain that repairs are revenue expenditure, and refer the matter to a senior person or the professional body, keeping a written record.", explanation: "One mark for the threat and one for each safeguard." }),
      P.manual({ label: "(f)", marks: 3, stem: "Evaluate the consequences for the bank and for the company if the director's instruction is followed.", points: ["The bank believes the covenant is met and may leave the loan in place when it should review the risk", "If discovered, the company could face legal penalties, loss of the loan and loss of trust", "A true margin of 12.4% shows weaker performance, which the company should address honestly (for example by controlling costs) rather than conceal"], modelAnswer: "The bank would wrongly believe the 15% condition is met and might not review its risk. If the misstatement were found the company could lose the loan, face penalties and lose trust. The real margin of 12.4% shows weakness that should be addressed openly.", explanation: "Consequences for both parties and a conclusion." }),
    ],
    hints: ["Repairs are revenue expenditure.", "Compare each margin with the 15% requirement."],
    explanation: "This item tests an ethical dilemma with figures and the responses of an accountant.",
  });

  b.card("DEFINITION", "What are the five fundamental principles?", "Integrity, objectivity, professional competence and due care, confidentiality, professional behaviour.");
  b.card("DEFINITION", "What is **integrity**?", "Being straightforward and honest in all professional and business dealings.");
  b.card("DEFINITION", "What is **objectivity**?", "Not allowing bias, conflict of interest or the influence of others to override professional judgement.");
  b.card("DEFINITION", "What is **confidentiality**?", "Not disclosing information obtained through work unless there is a legal or professional duty.");
  b.card("CONCEPT", "Threats to the principles", "Self-interest, familiarity, intimidation, pressure to manipulate figures, conflict of interest.");
  b.card("CONCEPT", "Examples of safeguards", "Refusing, independent review, documenting instructions, disclosure, consulting a professional body.");
  b.card("FACT", "Tax evasion and tax avoidance", "Evasion: illegal hiding of income. Avoidance: legal reduction of tax using allowances.");
  b.card("CONCEPT", "Unhu/Ubuntu in business (ZIMSEC)", "Honesty, respect for people and responsibility to the community in everyday transactions.", undefined, { applies: ["zimsec"] });
  b.card("FACT", "Effect of overstated profit", "Lenders and investors may be misled and lose money; trust in accounts falls.");
});
