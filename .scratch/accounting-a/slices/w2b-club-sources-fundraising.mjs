// W2b: club.sources-fundraising
import { concept, P, money, fmt, chk, r2, sum, table } from "../lib.mjs";
import { mc, U } from "../tables/w2b-lib.mjs";

concept("aacc.club.sources-fundraising", { file: "club/sources-fundraising", keyPrefix: "club.sources-fundraising" }, (b) => {
  // --- MCQ
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which one of the following is a regular source of income for most clubs?",
    right: ["Members' subscriptions", "Correct: members pay a fee each year."],
    wrong: [["Profit on the sale of the clubhouse", "A sale of an asset is a one-off event, not regular income."], ["Repayment of a bank loan", "Repaying a loan is a payment, not income."], ["Depreciation of equipment", "Depreciation is an expense, not an income."]],
    explanation: "Subscriptions are paid every year by members and are the main regular source of club income.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is a grant to a club?",
    right: ["Money given for a stated purpose, normally not repaid", "Correct: it may have conditions."],
    wrong: [["Money lent by a bank that must be repaid with interest", "That is a loan."], ["Money paid by members every year to belong to the club", "That is a subscription."], ["Money raised by selling raffle tickets at an event", "That is fundraising income."]],
    explanation: "A grant is a gift for a purpose, often with conditions such as reports on how it was spent.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which source of income is the MOST predictable for a society?",
    right: ["Subscriptions from a fixed number of members", "Correct: the number of members and the fee are known in advance."],
    wrong: [["Donations received from the general public", "The amount and timing are uncertain."], ["Income from an outdoor concert held in summer", "It depends on attendance and weather."], ["A raffle held at the annual prize-giving", "It depends on how many tickets are sold."]],
    explanation: "Subscriptions are the most predictable; events and donations are less certain.",
  });
  const q4 = { inc: 1250, cost: 340 };
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A fundraising quiz takes in ${money(q4.inc)} and costs ${money(q4.cost)} to run. What are the net proceeds?`,
    right: [money(q4.inc - q4.cost), "Correct: 1,250 − 340."],
    wrong: [[money(q4.inc), "This is the gross income; costs must be deducted."], [money(q4.cost), "This is the cost of the event."], [money(q4.inc + q4.cost), "The costs are deducted, not added."]],
    hints: ["Net proceeds = income − costs."],
    explanation: "1,250 − 340 = 910.",
  });
  const q5 = { loan: 6000, rate: 0.15 };
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A society borrows ${money(q5.loan)} at 15% a year and repays the whole loan after one year. How much does it repay in total?`,
    right: [money(q5.loan * (1 + q5.rate)), "Correct: 6,000 + 900 interest."],
    wrong: [[money(q5.loan), "The interest must be added."], [money(q5.loan * q5.rate), "This is the interest only."], [money(q5.loan * (1 - q5.rate)), "Interest is added, not deducted."]],
    hints: ["Interest = 15% of 6,000."],
    explanation: "Interest 900; total repaid 6,900.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "A donor gives a club US\\$2,000 for the purchase of sports equipment only. What is the effect on how the club may use the money?",
    right: ["It can be spent on the equipment only, not running costs", "Correct: the donation is restricted to its purpose."],
    wrong: [["It can be used for any expense that the club chooses", "That is true only of an unrestricted gift."], ["It must be repaid to the donor after exactly one year", "A donation is not a loan."], ["It must be shared out equally among all the members", "A club does not distribute donations."]],
    hints: ["Think about the condition attached to the gift."],
    explanation: "A restricted donation must be used for its stated purpose.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which one of the following is a disadvantage of raising money by organising fundraising events?",
    right: ["The income is uncertain and volunteers must give time", "Correct: attendance may be low and the work takes time."],
    wrong: [["The club must repay the money with interest", "That describes a loan."], ["The club loses control of its decisions to the funder", "That is more likely with sponsorship or grants with conditions."], ["Members are unable to take part", "Events involve members."]],
    hints: ["What can go wrong with an event?"],
    explanation: "Fundraising events cost time and have uncertain results; they do not create debt.",
  });
  const q8 = [["A", 480, 6], ["B", 600, 10], ["C", 330, 3]];
  mc(b, {
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "Three events raise net proceeds of US\\$480 (needing 6 volunteer hours), US\\$600 (10 hours) and US\\$330 (3 hours) respectively. Which event raises the most per volunteer hour?",
    right: [`The event raising US\\$330 (US\\$${fmt(330 / 3)} per hour)`, "Correct: 330 ÷ 3 = 110 per hour."],
    wrong: [[`The event raising US\\$480 (US\\$${fmt(480 / 6)} per hour)`, "480 ÷ 6 = 80 per hour, which is lower."], [`The event raising US\\$600 (US\\$${fmt(600 / 10)} per hour)`, "600 ÷ 10 = 60 per hour, the lowest."], ["All three raise the same amount per hour", "The rates are 80, 60 and 110."]],
    hints: ["Divide each net amount by its hours."],
    explanation: "Per hour: 80, 60 and 110. The third event uses volunteers' time best, although it raises the least in total.",
  });

  // --- True / false
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A bank loan has the advantage of providing money at once, but it adds interest to the cost.",
    answer: true,
    explanation: "True. Borrowing gives immediate funds but the interest increases the total paid.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "When comparing fundraising events, the event with the highest gross takings is always the best.",
    answer: false,
    hints: ["What matters after costs?"],
    explanation: "False. Net proceeds, the time needed and the risk must be compared, not just the takings.",
  });

  // --- Matching
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each source of income with its main disadvantage.",
    pairs: [["Bank loan", "Interest must be paid and the loan repaid"], ["Fundraising event", "Needs volunteers and the result is uncertain"], ["Grant", "Application takes time and conditions may apply"], ["Subscriptions", "Limited by what members can afford"]],
    explanation: "Each source has a typical weakness to be weighed against its strengths.",
  });

  // --- Fill in the blank
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statements about sources of finance for a club.",
    template: "Money given by a business in return for publicity is called {{blank:a}}. A loan must be repaid with {{blank:b}}. The net proceeds of an event are its income less its {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["sponsorship"], choices: ["sponsorship", "a subscription", "a levy"] },
      { id: "b", accepted: ["interest"], choices: ["interest", "dividends", "premium"] },
      { id: "c", accepted: ["costs"], choices: ["costs", "assets", "subscriptions"] },
    ],
    explanation: "Sponsorship, interest and costs.",
  });

  // --- Numerical / calculations
  const n1 = { tickets: 180, price: 5, food: 240, costs: 390 };
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: chk(n1.tickets * n1.price + n1.food - n1.costs, 750), wrong: [n1.tickets * n1.price - n1.costs, n1.tickets * n1.price + n1.food],
    stem: `A club sells ${n1.tickets} tickets at ${money(n1.price)} for a disco and takes ${money(n1.food)} from the sale of food. The costs of the disco are ${money(n1.costs)}. Calculate the net proceeds.`,
    hints: ["Include the food sales as income."],
    explanation: "Income 900 + 240 = 1,140. Net proceeds 1,140 − 390 = 750.",
  });
  const n2 = { loan: 12000, years: 4, rate: 0.1 };
  let bal = n2.loan; let int = 0; const instal = n2.loan / n2.years;
  for (let y = 0; y < n2.years; y += 1) { int += bal * n2.rate; bal -= instal; }
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", calculator: true,
    value: chk(int, 3000), wrong: [n2.loan * n2.rate * n2.years, n2.loan * n2.rate],
    stem: `A society borrows ${money(n2.loan)} at 10% a year on the balance outstanding. It repays ${money(n2.loan / n2.years)} of capital at the end of each of 4 years. Calculate the total interest paid.`,
    hints: ["Interest each year is 10% of the balance at the start of that year."],
    explanation: "Year 1: 12,000 × 10% = 1,200; year 2: 9,000 × 10% = 900; year 3: 6,000 × 10% = 600; year 4: 3,000 × 10% = 300. Total 3,000.",
  });
  const n3 = { target: 5000, per: 650 };
  b.num({
    d: 3, skill: "APPLICATION", kind: "units", calculator: true,
    value: Math.ceil(n3.target / n3.per), wrong: [Math.floor(n3.target / n3.per), 6],
    stem: `A club needs ${money(n3.target)}. Each fundraising event raises net proceeds of ${money(n3.per)}. What is the least number of events needed?`,
    hints: ["Divide and round up."],
    explanation: "5,000 ÷ 650 = 7.7, so 8 events are needed.",
  });
  const n4 = { members: 120, levy: 40 };
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", daily: true, calculator: true,
    value: chk(n4.members * n4.levy, 4800), wrong: [n4.members + n4.levy, n4.levy],
    stem: `A club charges each of its ${n4.members} members a one-off levy of ${money(n4.levy)}. Calculate the total raised.`,
    explanation: "120 × 40 = 4,800.",
  });

  // --- Short answer
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the money given by a business to a club in exchange for advertising, such as its name on the team's shirts.",
    accepted: ["sponsorship", "sponsor", "a sponsorship"],
    explanation: "Sponsorship is payment by a business in exchange for publicity.",
  });

  // --- Self-marked short answers
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "State and explain two advantages and one disadvantage of a club raising money by subscriptions.",
    points: ["Regular and predictable income, so the club can plan (advantage)", "Members feel ownership and interest in the club (advantage)", "The amount is limited by what members can afford, and late payment causes arrears (disadvantage)"],
    modelAnswer: "Subscriptions are regular and predictable, so the club can plan, and members feel ownership. The disadvantage is that the amount is limited by what members can afford and some pay late.",
    hints: ["Think of certainty and affordability."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a club should compare net proceeds, and not only takings, when choosing a fundraising event.",
    points: ["Costs differ between events, so a high takings figure may leave little after costs", "Net proceeds show how much is available for the club's purpose", "The comparison should also consider the time needed and the risk"],
    modelAnswer: "Costs differ between events, so large takings can leave little profit. Net proceeds show the money really available, and the time and risk should also be compared.",
    hints: ["Which figure can the club spend?"],
    explanation: "One mark each for costs, the usable amount and other factors.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A society needs US\\$3,000 within six months. Evaluate raising it by a bank loan compared with fundraising events.",
    points: ["A loan provides the money immediately, meeting the deadline with certainty", "Interest increases the total cost, which the society must be able to repay", "Fundraising has no interest but may not raise the full amount in six months", "Conclusion: use fundraising if the target is realistic; borrow a small amount to cover any shortfall"],
    modelAnswer: "A loan gives the money at once but adds interest. Fundraising has no interest but may not reach US\\$3,000 in six months. The society should fundraise if the target is realistic and borrow only to cover any shortfall.",
    hints: ["Compare speed, cost and risk."],
    explanation: "A balanced answer compares the options and gives a justified recommendation.",
  });

  // --- Practice structured 1 (10 marks)
  const s1 = { tickets: 150, price: 4, food: 120, costs: 260, pledges: 1100, walkCost: 60, target: 2400 };
  const discoNet = chk(s1.tickets * s1.price + s1.food - s1.costs, 460);
  const walkNet = chk(s1.pledges - s1.walkCost, 1040);
  const discosNeeded = Math.ceil((s1.target - walkNet) / discoNet);
  chk(discosNeeded, 3);
  b.struct({
    d: 3, skill: "EVALUATION", calculator: true,
    stem: `The netball club of a school in Masvingo needs ${money(s1.target)} for new uniforms. It can hold a disco, which sells ${s1.tickets} tickets at ${money(s1.price)} and takes ${money(s1.food)} from food, with costs of ${money(s1.costs)}; or a sponsored walk, which collects ${money(s1.pledges)} in pledges with costs of ${money(s1.walkCost)}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: discoNet, wrong: [s1.tickets * s1.price - s1.costs], stem: "Calculate the net proceeds of one disco.", explanation: "600 + 120 − 260 = 460." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: walkNet, wrong: [s1.pledges], stem: "Calculate the net proceeds of the sponsored walk.", explanation: "1,100 − 60 = 1,040." }),
      P.num({ label: "(c)", marks: 2, kind: "units", value: discosNeeded, wrong: [2, 5], stem: "After one sponsored walk, how many discos are needed to reach the target?", explanation: "Shortfall 2,400 − 1,040 = 1,360; 1,360 ÷ 460 = 2.96, so 3 discos." }),
      P.manual({ label: "(d)", marks: 4, stem: "Recommend a plan to raise the money and justify it.", points: ["The walk raises the most net proceeds (1,040) for the lowest cost (60)", "The discos add 460 each but need costs of 260 each and more organisation", "A combined plan (one walk and three discos) reaches 2,420, just above the target", "Risk: bad weather or low attendance, so allow extra events or a reserve"], modelAnswer: "Hold the sponsored walk first because it raises the most (US\\$1,040) for the lowest cost (US\\$60). Add three discos at US\\$460 each to reach US\\$2,420, just above the target. Allow for bad weather or low attendance by planning an extra event.", explanation: "One mark each for the walk, the discos, the combined total and a risk." }),
    ],
    hints: ["Net proceeds are income less costs.", "Round the number of events up."],
    explanation: "This item practises comparing fundraising events and recommending a plan.",
  });

  // --- Practice structured 2 (14 marks)
  const s2 = { cost: 20000, rate: 0.1, years: 4, members: 160, levy: 50, grant: 7500 };
  let bl = s2.cost; let ti = 0; const inst = s2.cost / s2.years;
  for (let y = 0; y < s2.years; y += 1) { ti += bl * s2.rate; bl -= inst; }
  chk(ti, 5000);
  const levy = chk(s2.members * s2.levy, 8000);
  const gap = chk(s2.cost - levy - s2.grant, 4500);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `A sports club in Bulawayo wants to extend its clubhouse at a cost of ${money(s2.cost)}. Option 1 is a bank loan of the full amount at 10% a year on the balance outstanding, with ${money(inst)} of capital repaid at the end of each of 4 years. Option 2 is a levy of ${money(s2.levy)} on each of its ${s2.members} members, a grant of ${money(s2.grant)} from a sports trust, and fundraising events for the rest.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: ti, wrong: [s2.cost * s2.rate * s2.years, s2.cost * s2.rate], stem: "Calculate the total interest paid under Option 1.", explanation: "2,000 + 1,500 + 1,000 + 500 = 5,000." }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: s2.cost + ti, wrong: [s2.cost], stem: "Calculate the total amount repaid under Option 1.", explanation: "20,000 + 5,000 = 25,000." }),
      P.num({ label: "(c)", marks: 1, kind: "money", value: levy, wrong: [s2.members + s2.levy], stem: "Calculate the total raised by the levy.", explanation: "160 × 50 = 8,000." }),
      P.num({ label: "(d)", marks: 1, kind: "money", value: gap, wrong: [s2.cost - levy], stem: "Calculate the amount that fundraising events must raise under Option 2.", explanation: "20,000 − 8,000 − 7,500 = 4,500." }),
      P.manual({ label: "(e)", marks: 6, stem: "Evaluate the two options and recommend one, using the figures.", points: ["Option 1 gives the full amount at once, but the interest adds 5,000 (25%) to the cost", "Option 2 has no interest, so the club saves 5,000", "Option 2 depends on the grant being approved and on 4,500 being raised from events", "The levy may be hard for some members to pay and could reduce membership", "Option 1 is certain and quick, Option 2 may delay the extension", "Recommendation with a reason (for example Option 2, with a short loan only if the grant or events fall short)"], modelAnswer: "Option 1 is certain and immediate but costs US\\$5,000 more in interest. Option 2 saves that interest but relies on a grant and on events raising US\\$4,500, and the levy may burden members. The club should choose Option 2, using a small loan only if the grant or events fall short.", explanation: "One mark for each point; the last for a clear recommendation." }),
      P.manual({ label: "(f)", marks: 2, stem: "State two non-financial factors the committee should consider.", points: ["The effect of a levy on members' willingness to stay in the club", "The time and effort volunteers must give to the fundraising events"], modelAnswer: "A levy might make some members leave, and the events need a lot of volunteers' time.", explanation: "Any two sensible factors." }),
    ],
    hints: ["Interest each year is on the balance at the start of the year.", "Compare the cost, the speed and the risk."],
    explanation: "This item practises comparing a loan with member, grant and fundraising finance.",
  });

  // --- Flashcards
  b.card("CONCEPT", "Sources of income of a club", "Subscriptions, entrance fees, donations, grants, fundraising events, trading activities, investment income, hiring out facilities, loans.");
  b.card("DEFINITION", "Grant", "Money given by an organisation for a purpose, normally not repaid, often with conditions.");
  b.card("DEFINITION", "Sponsorship", "Money or goods from a business in exchange for publicity.");
  b.card("FORMULA", "Net proceeds of an event", "Income of the event − costs of the event.");
  b.card("CONCEPT", "Evaluating fundraising", "Compare net proceeds, certainty, time, cost, risk and non-financial effects; then recommend.");
  b.card("CONCEPT", "Loan versus fundraising", "A loan gives money now but adds interest; fundraising costs time and is uncertain.");
  b.card("FACT", "Restricted donation", "Must be used for its stated purpose, not for general running costs.");
  b.card("FACT", "Most predictable income", "Subscriptions: the number of members and the fee are known in advance.");
  b.card("CONCEPT", "Making a recommendation", "State the choice, give a reason from the figures and mention a risk.");
});
