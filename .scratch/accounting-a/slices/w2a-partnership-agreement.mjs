// W2a: partnership.agreement (Cambridge only: tagged automatically)
import { concept, P, table, r2, fmt, money, chk, appropriation } from "../lib.mjs";
import { mc, approTable } from "../tables/w2a-lib.mjs";

concept("aacc.partnership.agreement", { file: "partnership/agreement", keyPrefix: "partnership.agreement" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "When do the rules of the Partnership Act on profit sharing apply?",
    ok: ["When the partners have no agreement on the matter", "Correct: the Act supplies terms where the agreement is silent."],
    bad: [["Always, whatever the partners have agreed", "A written agreement overrides the default rules."], ["Only when the partnership has more than ten partners", "The Act applies whatever the number of partners."], ["Only when the partnership is dissolved", "The rules apply during the life of the partnership."]],
    explanation: "The default rules fill gaps; where the partners agree different terms, the agreement prevails.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "Under the Partnership Act, with no agreement, how are profits and losses shared?",
    ok: ["Equally between the partners", "Correct: whatever the capital or effort."],
    bad: [["In proportion to the capital invested", "The Act does not link the ratio to capital."], ["In proportion to the time each partner works", "Effort is not recognised by the default rules."], ["Wholly to the partner who manages the business", "No such rule exists."]],
    explanation: "The default is equal sharing of profits and losses.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "A partner lends money to the partnership beyond his capital and there is no agreement. What interest is the partner entitled to?",
    ok: ["5% a year", "Correct: this is the rate in the Act."],
    bad: [["No interest", "Interest on loans is the exception to the rule of no interest."], ["10% a year", "The Act sets 5%, not 10%."], ["The same rate as the bank overdraft", "The Act does not link the rate to the overdraft."]],
    explanation: "Under the Act a partner's loan earns 5% a year.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of the following is a partner entitled to when there is no agreement?",
    ok: ["An equal share of the profits", "Correct: this is one of the default rules."],
    bad: [["A salary for working full time", "The Act gives no salary."], ["Interest on capital invested", "The Act gives no interest on capital."], ["Interest on drawings credited to him", "No interest is allowed or charged on drawings."]],
    explanation: "Only equal sharing and 5% on loans are given by default.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is an advantage of a written partnership agreement?",
    ok: ["Unequal effort and capital can be rewarded by salaries and interest", "Correct: the Act's equal sharing would otherwise apply."],
    bad: [["It removes the need to keep accounts", "Accounts are always needed."], ["It ensures every partner earns exactly the same profit each year", "The agreement may deliberately reward partners differently."], ["It gives the partners limited liability", "Partners in an ordinary partnership have unlimited liability whatever the agreement."]],
    hints: ["Think of what the default rules do not provide."],
    explanation: "An agreement can include salaries and interest to reflect each partner's input and can set out how disputes are settled.",
  });
  const pb = 24600;
  const ln = 8000;
  const li = r2(ln * 0.05);
  const each = r2((pb - li) / 2);
  chk(each, 12100);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Two partners have no agreement. Profit before interest on a partner's loan is ${money(pb)}. The loan is ${money(ln)}. How much profit does each partner receive?`,
    ok: [money(each), "Correct: (24,600 - 400) ÷ 2."],
    bad: [[money(r2(pb / 2)), "Loan interest has not been deducted first."], [money(r2((pb - li) / 2 + li)), "The loan interest has been added to one partner's share."], [money(r2((pb - 2 * li) / 2)), "Interest has been deducted twice."]],
    hints: ["The loan interest is an expense, so deduct it before sharing."],
    explanation: "Loan interest 5% × 8,000 = 400. Profit for the year 24,200 shared equally gives 12,100.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Takudzwa invested US\\$30,000 and Mazvita US\\$10,000. There is no agreement. Takudzwa claims profit should be shared 3 : 1. What is the position?",
    ok: ["The claim fails: profits are shared equally under the Partnership Act", "Correct: capital does not affect the ratio without an agreement."],
    bad: [["The claim succeeds because capital is the basis of sharing", "The Act does not base sharing on capital."], ["The claim succeeds because he has more risk", "Risk does not alter the default ratio."], ["The claim fails because only a court can set a ratio", "The Act itself supplies the ratio."]],
    hints: ["Is there an agreement on ratio?"],
    explanation: "With no agreement, profits are shared equally, however different the capital.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Partners agreed to share profits 3 : 2 but said nothing about salaries. One partner claims a salary. Which statement is correct?",
    ok: ["No salary is due; the agreed ratio applies and the default rule of no salary applies", "Correct: the Act fills the gap on salaries only."],
    bad: [["A salary is due because the ratio is unequal", "The ratio does not imply a salary."], ["The agreement is void because it is incomplete", "A partial agreement is valid."], ["Profits must be shared equally because the agreement is incomplete", "The ratio was agreed, so it applies."]],
    hints: ["The Act applies only where the agreement is silent."],
    explanation: "Where the agreement is silent on a matter the default rule applies to that matter alone.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Under the Partnership Act a partner is entitled to a salary if he works full time.", answer: false, explanation: "False. No partner is entitled to a salary unless it is agreed." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "Interest on a partner's loan under the Act is an appropriation of profit.", answer: false, hints: ["Is the lender acting as owner or creditor?"], explanation: "False. It is an expense of the business, deducted to find profit for the year." });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each matter to the rule in the Partnership Act when there is no agreement.",
    pairs: ["Sharing of profits and losses", "Salaries", "Interest on capital", "Interest on a partner's loan"],
    right: ["Shared equally", "None allowed", "5% a year"],
    rightIndex: [0, 1, 1, 2],
    explanation: "Equal sharing; no salary; no interest on capital; 5% on loans.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statement.",
    template: "Without an agreement, interest on drawings is {{blank:a}} and interest on a partner's loan is {{blank:b}} a year.",
    blanks: [
      { id: "a", accepted: ["not charged"], choices: ["not charged", "charged at 5%"] },
      { id: "b", accepted: ["5%"], choices: ["5%", "10%", "nil"] },
    ],
    explanation: "No interest is charged on drawings; loans earn 5%.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "State the rate of interest on a partner's loan to the firm under the Partnership Act.",
    accepted: ["5%", "5", "5 per cent", "five per cent", "5 percent"],
    explanation: "The default rate is 5% a year.",
  });

  const p3 = 28455;
  const ln3 = 9600;
  const l3 = r2(ln3 * 0.05);
  const sh3 = r2((p3 - l3) / 3);
  chk(sh3, 9325);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: sh3, daily: true, calculator: true, wrong: [r2(p3 / 3), r2((p3 + l3) / 3)],
    stem: `Three partners have no agreement. Profit before interest on one partner's loan of ${money(ln3)} is ${money(p3)}. Calculate the share of profit each partner receives.`,
    explanation: `Loan interest 5% × 9,600 = 480. Profit for the year ${fmt(r2(p3 - l3))} ÷ 3 = ${fmt(sh3)}.`,
  });
  const li2 = r2(15000 * 0.05 * (3 / 12));
  chk(li2, 187.5);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: li2, calculator: true, wrong: [750, r2(15000 * 0.05 * (9 / 12))],
    stem: `A partner lent ${money(15000)} to the firm on 1 October 2025. There is no agreement. Calculate the interest for the year ended 31 December 2025.`,
    hints: ["The loan was outstanding for three months."],
    explanation: "5% × 15,000 × 3/12 = 187.50.",
  });
  const A = approTable({ biz: "x", when: "x", profit: 35940, partners: [{ name: "A", share: 1 }, { name: "B", share: 1 }, { name: "C", share: 1 }] });
  const ag = appropriation({ profit: 35940, partners: [{ name: "A", salary: 7000, capital: 42500, interestOnCapitalPct: 5, share: 2 }, { name: "B", capital: 25000, interestOnCapitalPct: 5, share: 2 }, { name: "C", capital: 5000, interestOnCapitalPct: 5, share: 1 }] });
  const diff = r2(ag.lines[0].total - A.calc.lines[0].total);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: diff, calculator: true, wrong: [ag.lines[0].total, r2(-diff)],
    stem: `Partners A, B and C earned a profit for the year of ${money(35940)}. The agreement gives A a salary of ${money(7000)}, 5% interest on capital (A ${money(42500)}, B ${money(25000)}, C ${money(5000)}) and the residual shared 2 : 2 : 1. Calculate how much more A receives than under the default rules of the Partnership Act.`,
    hints: ["Find A's total under the agreement and under equal sharing."],
    explanation: `Under the Act each partner receives 35,940 ÷ 3 = ${fmt(A.calc.lines[0].total)}. Under the agreement: residual = 35,940 - 7,000 - 3,625 = 25,315; A receives 7,000 + 2,125 + 2/5 × 25,315 = ${fmt(ag.lines[0].total)}. Difference ${fmt(diff)}.`,
  });
  chk(ag.residual, 25315);

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "State two items that are normally included in a partnership agreement.",
    points: ["The profit-sharing ratio", "Salaries, interest on capital or interest on drawings (or the capital to be contributed, admission and retirement terms, or the dispute procedure)"],
    modelAnswer: "The ratio in which profits and losses are shared, and any salaries or interest on capital and drawings.",
    explanation: "One mark for each valid item.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain two advantages of having a written partnership agreement.",
    points: ["It prevents disputes because the terms are clear to all partners", "It can reward unequal contributions with salaries and interest, instead of equal sharing", "It can set out how goodwill is valued and how a partner leaves or joins, avoiding delay and cost"],
    modelAnswer: "A written agreement avoids disputes because everyone knows the terms. It can reward a partner who works harder or invests more with a salary or interest. It can also state how goodwill is valued on a change.",
    hints: ["Think about disputes and unequal contributions."],
    explanation: "One mark per advantage up to three, each linked to the partnership.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Chipo and Farai have run a printing partnership for three years without an agreement. Chipo works full time; Farai is a sleeping partner who lent the firm US\\$20,000. Chipo wants a salary. Evaluate her claim and advise them.",
    points: ["Under the Partnership Act no partner is entitled to a salary, so her claim has no legal basis without agreement", "Equal sharing means Farai receives the same profit despite doing no work, which may be unfair", "Farai is entitled to 5% interest on his loan (US\\$1,000 a year), which is an expense", "Advice: agree and sign an agreement with a fair salary and ratio, since both can change the default"],
    modelAnswer: "Without an agreement Chipo has no right to a salary and profits are shared equally, which is unfair to her. Farai is entitled to 5% interest on his loan. They should write an agreement that gives a salary and a ratio reflecting their roles.",
    hints: ["What does the Act say, and can the partners change it?"],
    explanation: "One mark for the legal position, one for fairness, one for the loan interest and one for the advice.",
  });

  // Structured 1 (10 marks)
  const prof1 = 33280;
  const loan1 = 14000;
  const li1 = r2(loan1 * 0.05);
  const net1 = r2(prof1 - li1);
  const each1 = r2(net1 / 4);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Four friends, Tendai, Rudo, Sipho and Thandeka, run a catering partnership in Gweru. They never signed an agreement. Sipho lent the business ${money(loan1)} at the start of the year. Profit for the year ended 31 December 2025 before any interest on the loan was ${money(prof1)}. Tendai works full time and feels she should receive a salary; Rudo, who invested the most capital, thinks profits should be shared in proportion to capital.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: li1, wrong: [loan1 * 0.5], stem: "Calculate the interest due to Sipho on his loan under the Partnership Act.", explanation: "5% × 14,000 = 700." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: net1, wrong: [prof1], stem: "Calculate the profit for the year to be shared between the partners.", explanation: `${fmt(prof1)} - ${fmt(li1)} = ${fmt(net1)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: each1, wrong: [r2(prof1 / 4)], stem: "Calculate the share of profit received by each partner.", explanation: `${fmt(net1)} ÷ 4 = ${fmt(each1)}.` }),
      P.match({ label: "(d)", stem: "Decide the outcome of each claim under the Act.", pairs: ["Tendai's claim to a salary", "Rudo's claim that profits follow capital", "Sipho's claim to interest on his loan", "Thandeka's claim to equal shares"], right: ["Fails", "Succeeds"], rightIndex: [0, 0, 1, 1], explanation: "The Act gives no salary and no link between capital and profit sharing; it gives 5% on loans and equal shares.", marksPerPair: 1 }),
    ],
    hints: ["Deduct the loan interest before sharing.", "The default rules apply to each claim."],
    explanation: "This item tests the default rules of the Partnership Act and their effect on the profit shares.",
  });

  // Structured 2 (16 marks): agreement vs Act
  const prof2 = 47860;
  const ag2 = appropriation({ profit: prof2, partners: [
    { name: "Mazvita", salary: 9500, capital: 45000, interestOnCapitalPct: 6, share: 3 },
    { name: "Takudzwa", capital: 16500, interestOnCapitalPct: 6, share: 2 },
  ] });
  const act2 = appropriation({ profit: prof2, partners: [{ name: "Mazvita", share: 1 }, { name: "Takudzwa", share: 1 }] });
  const ag2Model = approTable({ biz: "Mazvita and Takudzwa", when: "for the year ended 31 December 2025", profit: prof2, partners: [
    { name: "Mazvita", salary: 9500, capital: 45000, interestOnCapitalPct: 6, share: 3 },
    { name: "Takudzwa", capital: 16500, interestOnCapitalPct: 6, share: 2 },
  ] });
  chk(ag2.residual, 47860 - 9500 - 3690, 0.001);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Mazvita and Takudzwa own a farm-supplies business in Bulawayo. Their agreement provides for a salary of ${money(9500)} for Mazvita, interest on capital at 6% a year (Mazvita ${money(45000)}; Takudzwa ${money(16500)}) and the residual profit shared 3 : 2. Profit for the year ended 31 December 2025 was ${money(prof2)}. Takudzwa has asked to cancel the agreement and revert to the "legal" arrangement.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: ag2.residual, wrong: [r2(prof2 - 9500), r2(prof2 - 3690)], stem: "Calculate the residual profit to be shared under the agreement.", explanation: `Interest on capital: 6% × 45,000 = 2,700 and 6% × 16,500 = 990, total 3,690. Residual = ${fmt(prof2)} - 9,500 - 3,690 = ${fmt(ag2.residual)}.` }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: ag2.lines[1].total, wrong: [ag2.lines[1].residualShare, act2.lines[1].total], stem: "Calculate Takudzwa's total profit under the agreement.", explanation: `Interest 990 + 2/5 × ${fmt(ag2.residual)} = ${fmt(ag2.lines[1].total)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: act2.lines[1].total, wrong: [ag2.lines[1].total], stem: "Calculate Takudzwa's profit if the Partnership Act applied (no agreement).", explanation: `${fmt(prof2)} ÷ 2 = ${fmt(act2.lines[1].total)}.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: r2(act2.lines[1].total - ag2.lines[1].total), wrong: [r2(ag2.lines[1].total - act2.lines[1].total)], stem: "Calculate how much better off Takudzwa would be without the agreement.", explanation: `${fmt(act2.lines[1].total)} - ${fmt(ag2.lines[1].total)} = ${fmt(r2(act2.lines[1].total - ag2.lines[1].total))}.` }),
      P.manual({ label: "(e)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the appropriation account for the year under the agreement.", points: ["Heading, profit for the year, salary and interest on capital deducted", `Residual profit ${fmt(ag2.residual)}`, "Residual shared 3 : 2 with totals agreeing"], modelAnswer: ag2Model.md, explanation: "One mark per point; follow-through allowed." }),
      P.manual({ label: "(f)", marks: 3, stem: "Evaluate Takudzwa's request and advise Mazvita.", points: [`Without the agreement Takudzwa gains ${fmt(r2(act2.lines[1].total - ag2.lines[1].total))}, which shows why he asks, but Mazvita would lose the reward for her work and capital`, "The agreement can be changed only by consent of all partners; the Act applies only if there is no agreement", "Advice: negotiate a revised agreement reflecting both contributions rather than cancelling it"], modelAnswer: `Takudzwa would gain ${fmt(r2(act2.lines[1].total - ag2.lines[1].total))} but Mazvita would lose the reward for her salary and larger capital. The agreement cannot be cancelled without consent, so she should negotiate a fairer revised agreement.`, explanation: "One mark for each reasoned point." }),
    ],
    hints: ["Appropriate salary and interest first.", "Under the Act, profit is shared equally."],
    explanation: "This item compares the effect of a written agreement with the default rules of the Partnership Act.",
  });

  b.card("DEFINITION", "What is a **partnership agreement**?", "A contract between the partners (preferably written) setting out ratio, salaries, interest, capital, admission, retirement and dispute procedures.");
  b.card("FACT", "Partnership Act 1890: profit sharing", "With no agreement, profits and losses are shared equally.");
  b.card("FACT", "Partnership Act 1890: salaries", "With no agreement, no partner is entitled to a salary.");
  b.card("FACT", "Partnership Act 1890: interest on capital and drawings", "With no agreement, no interest on capital is allowed and none is charged on drawings.");
  b.card("FACT", "Partnership Act 1890: partner's loan", "Interest at 5% a year; it is an expense of the business.");
  b.card("CONCEPT", "When does the Act apply?", "Only where the partners have not agreed otherwise; a written agreement overrides it.");
  b.card("CONCEPT", "Advantages of a written agreement", "Avoids disputes, rewards unequal contributions, sets terms for goodwill, admission and retirement.");
  b.card("FACT", "Which board examines the Partnership Act 1890?", "Cambridge only (AS Level); ZIMSEC does not name the Act.");
  b.card("FACT", "Is a partner's loan interest an appropriation?", "No. It is an expense charged before profit for the year.");
});
