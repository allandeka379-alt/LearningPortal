// W2a: hrm.labour-relations (negotiation stages are BES detail: applies ZBE)
import { concept, P, chk, r2, ZBE } from "../lib.mjs";
import { mc } from "../tables/w2a-lib.mjs";

concept("abus.hrm.labour-relations", { file: "hrm/labour-relations", keyPrefix: "hrm.labour-relations" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is a **trade union**?",
    ok: ["An organisation that represents workers", "Correct: it protects and improves pay, conditions and job security."],
    bad: [["A group of firms that sell the same product", "That describes a trade association or cartel."], ["A department that recruits new staff", "That is the HR department."], ["A committee that sets the price of goods", "That is not the role of a union."]],
    explanation: "A trade union is an organisation of workers formed to protect and improve their pay and conditions.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is **collective bargaining**?",
    ok: ["Pay talks with workers' representatives", "Correct: the agreement covers a group of workers."],
    bad: [["Each worker negotiating privately with the manager", "That is individual bargaining."], ["A strike by all workers on one day", "That is industrial action."], ["A bank loan taken out by several firms", "That is a form of finance."]],
    explanation: "Collective bargaining is negotiation between management and workers' representatives, usually a union, over pay and conditions.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In which process does a neutral party give a **decision that both sides have agreed to accept**?",
    ok: ["Arbitration", "Correct: the arbitrator decides and both sides are bound."],
    bad: [["Conciliation", "A conciliator helps the sides to agree but cannot decide."], ["A go-slow", "A go-slow is industrial action by workers."], ["A lock-out", "A lock-out is an action by the employer."]],
    explanation: "In arbitration an independent person gives a binding decision; in conciliation the sides reach their own agreement.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **benefit to a business of good management-worker relations**?",
    ok: ["Fewer disputes, less turnover", "Correct: cooperation reduces conflict and the loss of staff."],
    bad: [["Higher absence and more grievances", "These are signs of poor relations."], ["More strikes and work stoppages", "Strikes are a sign of poor relations."], ["Reduced need for any communication", "Good relations depend on more communication, not less."]],
    explanation: "Good relations bring fewer disputes, higher productivity and lower turnover.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional bakery workers' committee in Mutare says that it will refuse overtime until the owners agree a pay rise. This is an example of",
    ok: ["Industrial action", "Correct: workers are withholding their labour to put pressure on the employer."],
    bad: [["Arbitration", "No independent decision is being made."], ["Induction of new staff", "Induction welcomes new employees."], ["Natural wastage", "No one is leaving."]],
    hints: ["Are workers using pressure to support their claim?"],
    explanation: "Refusing overtime is a form of industrial action.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of the following is a **disadvantage to employers** of a strong trade union?",
    ok: ["Higher wage costs, less flexibility", "Correct: strong unions can win pay rises and limit changes to working practices."],
    bad: [["Lower labour turnover among all workers", "This is a benefit, not a disadvantage."], ["A single channel for negotiation", "This is an advantage because it saves time."], ["Less need to discuss pay at all", "A union increases, not reduces, discussion of pay."]],
    hints: ["Think about pay and working practices."],
    explanation: "A strong union may raise labour costs and make change harder, but also offers a single channel for negotiation.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A pay claim of 9% would cost a fictional factory US\\$13,000 more a year than management's offer. A stoppage would lose a US\\$20,000 contract. Which is the most sensible analysis?",
    ok: ["The cost of conceding is below the possible loss", "Correct: US\\$13,000 a year is less than the US\\$20,000 at risk."],
    bad: [["The cost of conceding is above the possible loss", "US\\$13,000 is less than US\\$20,000."], ["The contract has no value to the factory", "The contract is worth US\\$20,000."], ["The offer should always be refused", "Refusing without weighing the risk would be unwise."]],
    hints: ["Compare US\\$13,000 with US\\$20,000, and think about whether the loss is repeated."],
    explanation: "A stoppage that loses more than the extra pay costs gives management a reason to compromise, though the extra pay recurs each year.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which is the strongest reason for a fictional company to prefer conciliation to arbitration as a first step?",
    ok: ["The sides keep control of the final agreement", "Correct: a conciliator cannot impose a decision."],
    bad: [["Conciliation always gives the union its claim", "Conciliation does not guarantee any outcome."], ["Arbitration is never available", "Arbitration is available, usually when conciliation fails."], ["Conciliation has no cost at all", "It uses time and may have a fee."]],
    hints: ["Who decides the outcome in each process?"],
    explanation: "In conciliation the sides decide for themselves; in arbitration they accept someone else's decision.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In conciliation the neutral person gives a decision that both sides must accept.",
    answer: false,
    explanation: "False. A conciliator only helps the sides to talk and agree. A decision that both sides must accept is made in binding arbitration.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "A works council gives workers a way to take part in decisions that affect them.",
    answer: true,
    explanation: "True. A works council (or workers' committee) lets representatives of workers discuss and be consulted on decisions with managers.",
    hints: ["What does participation mean for workers?"],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [["Conciliation", "A neutral person helps the sides to reach their own agreement"], ["Arbitration", "An independent person gives a decision both sides agreed to accept"], ["Works council", "A committee of managers and workers' representatives"], ["Go-slow", "Workers deliberately work at a reduced pace as industrial action"]],
    explanation: "Each term refers to a different part of labour relations.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "A trade union negotiates with employers in a process called {{blank:a}}. If talks fail, a neutral person who only helps the sides to talk is a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["collective bargaining"], choices: ["collective bargaining", "induction", "arbitration"] },
      { id: "b", accepted: ["conciliator"], choices: ["conciliator", "arbitrator", "supervisor"] },
    ],
    explanation: "Collective bargaining is the negotiation; a conciliator helps without deciding.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** form of industrial action.",
    accepted: ["strike", "go-slow", "go slow", "work to rule", "overtime ban", "ban on overtime", "sit-in", "walk-out", "picketing", "refusing overtime", "stoppage", "working to rule", "withdrawal of labour"],
    explanation: "Accept a strike, go-slow, work-to-rule, overtime ban or similar.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the process in which an independent person hears both sides and gives a decision that they have agreed to accept.",
    accepted: ["arbitration", "binding arbitration", "arbitrating"],
    explanation: "Arbitration produces a binding decision.",
  });

  const bill = 40 * 320 * 12;
  const inc5 = r2(bill * 0.05);
  chk(bill, 153600); chk(inc5, 7680);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: inc5, calculator: true, daily: true, wrong: [bill, r2(bill * 1.05)],
    stem: "A fictional bottling plant in Harare has 40 workers, each paid an average of US\\$320 a month. A 5% pay rise is agreed. Calculate the increase in the plant's annual wage bill.",
    hints: ["Find the annual wage bill first."],
    explanation: "Annual wage bill = 40 × 320 × 12 = US\\$153,600. 5% of 153,600 = US\\$7,680. The new wage bill, 161,280, is not the increase.",
  });
  const claim = r2(bill * 0.09), offer = r2(bill * 0.03), gap = r2(claim - offer);
  chk(gap, 9216);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: gap, calculator: true, wrong: [claim, offer],
    stem: "At the same plant the union claims a 9% rise and management offers 3%. Calculate by how much the annual wage bill would be higher if the union's claim were accepted rather than management's offer.",
    hints: ["Compare the two increases in the annual wage bill."],
    explanation: "Annual wage bill = 153,600. Claim = 9% × 153,600 = 13,824. Offer = 3% × 153,600 = 4,608. Difference = 13,824 − 4,608 = US\\$9,216, which is also 6% of the wage bill.",
    workedSolution: "1. Annual wage bill = 40 × 320 × 12 = US\\$153,600.\n2. Claim: 9% × 153,600 = US\\$13,824. Offer: 3% × 153,600 = US\\$4,608.\n3. Difference = 13,824 − 4,608 = US\\$9,216.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how a trade union might benefit its members.",
    points: ["It negotiates pay and conditions on behalf of members, with greater power than an individual has", "It represents members in disciplinary and grievance cases", "It provides support, such as legal advice, and campaigns on workers' behalf"],
    modelAnswer: "A union negotiates pay and conditions for its members, with more power than one worker would have. It also represents members in disciplinary and grievance cases and provides support such as legal advice.",
    hints: ["Think of negotiation, representation and support."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional clothing factory in Gweru wants to improve relations with its workers. Explain **two** ways in which it could do so.",
    points: ["Set up a works council or workers' committee for regular discussions", "Application: managers could consult the committee before changing shift patterns", "Share financial information honestly", "Application: workers would see what pay increases the factory can afford and be less likely to take industrial action"],
    modelAnswer: "The factory could set up a works council so that managers consult workers' representatives before changing things such as shift patterns. It could also share financial information honestly, so that workers see what pay increase the factory can afford and are less likely to take industrial action.",
    hints: ["Link each method to the factory."],
    explanation: "Two methods, each applied.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional bus company in Mutare is in dispute with its drivers over pay. Assess whether it should go to arbitration.",
    points: ["Arbitration brings a final decision and ends the dispute, avoiding strikes", "Application: a bus strike would stop services and lose revenue and customers", "The company loses control of the outcome, which may favour the drivers", "Conciliation could be tried first because the sides keep control", "Arbitration needs agreement from both sides to be bound", "Judgement with a reason: try conciliation first and use arbitration if the sides still cannot agree"],
    modelAnswer: "Arbitration brings a final decision and avoids a strike, which would stop services and lose revenue and customers. But the company loses control of the outcome, which may favour the drivers, and both sides must agree to be bound. Conciliation lets the sides keep control, so it should be tried first, with arbitration used if they still cannot agree.",
    hints: ["Weigh certainty against loss of control."],
    explanation: "One point per mark; the judgement needs a reason.",
  });

  const bill2 = 36 * 350 * 12, off = r2(bill2 * 0.04), clm = r2(bill2 * 0.1);
  chk(bill2, 151200); chk(off, 6048);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional business: Dhlamini Metal Works of Bulawayo employs 36 workers paid an average of US\\$350 a month. The union claims a 10% rise. Management says it can afford 4%. The union has said that it will begin an overtime ban if there is no agreement within a week. An important order must be delivered in a month.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: off, wrong: [bill2, 6048 * 2], stem: "Calculate the increase in the annual wage bill if management's offer is accepted.", explanation: "Annual wage bill = 36 × 350 × 12 = 151,200. 4% = US\\$6,048." }),
      P.mcq({ label: "(b)", marks: 1, stem: "A neutral person helps the two sides to talk but cannot impose a decision. This is", options: [["Conciliation", "Correct: the sides reach their own agreement."], ["Binding arbitration", "Arbitration gives a binding decision."], ["A lock-out", "A lock-out is action by the employer."], ["A strike", "A strike is action by workers."]], answer: "A", explanation: "Conciliation helps the sides agree without imposing a decision." }),
      P.manual({ label: "(c)", marks: 6, stem: "Assess how the managers of Dhlamini Metal Works should respond to the threat of an overtime ban.", points: ["The ban could delay the important order, losing the customer", "The claim of 10% costs US\\$15,120 a year, which is US\\$9,072 more than the offer", "Management could improve the offer and share its financial information", "A conciliator could help the sides to compromise", "A non-pay offer, such as a bonus on delivery of the order, could settle the dispute at lower cost", "Judgement with a reason: move towards a compromise before the deadline, because the possible loss of the order is a larger risk"], modelAnswer: "An overtime ban could delay the order and lose the customer. The union's claim of 10% would cost US\\$15,120 a year, US\\$9,072 more than the offer, so management should improve its offer and share its financial information. A conciliator could help, and a bonus on delivery of the order would cost little unless the order is shipped. Management should move towards a compromise before the deadline, because losing the order is the larger risk.", hints: ["Compare the extra cost of the claim with the cost of delay."], explanation: "Cost of settling weighed against cost of conflict." }),
    ],
    hints: ["Annual wage bill = workers × monthly pay × 12."],
    explanation: "Offer costs US\\$6,048; conciliation helps without deciding; management should compromise before the deadline.",
  });

  b.struct({
    d: 4, skill: "ANALYSIS", applies: ZBE,
    stem: "A fictional business: Moyo Crafts, a workshop in Masvingo, has a dispute with its workers' committee about a change from a five-day to a six-day week, with the same pay. The owner, Mr Moyo, will meet the committee tomorrow.",
    parts: [
      P.match({ label: "(a)", marks: 6, stem: "Match each stage of a negotiation to what Mr Moyo should do at that stage.", pairs: [["Preparation", "Calculate the cost of lost output and the least he will accept"], ["Establishing the environment", "Agree the agenda and set a calm, respectful tone"], ["Exploring needs", "Ask the committee why they oppose the change and listen"], ["Testing understanding", "Repeat back the committee's worries to check they are correct"], ["Negotiating a position", "Offer overtime pay for the sixth day in return for the change"], ["Reaching agreement", "Record what was agreed and what each side must do"]], explanation: "The six stages follow in order." }),
      P.manual({ label: "(b)", marks: 4, stem: "Analyse why Mr Moyo should prepare before the meeting.", points: ["He will know the cost to the business of the six-day week and of the alternatives", "Application: he can show the committee how many orders would be lost without the change", "He can decide in advance what he will concede, so that he is not forced into a poor deal", "Application: he may be ready to offer overtime pay or a shorter day on the sixth day"], modelAnswer: "Preparation lets Mr Moyo know the cost of the six-day week and of the alternatives, so he can show the committee how many orders would be lost without the change. He can also decide in advance what he will concede, such as overtime pay or a shorter sixth day, so that he is not forced into a poor deal.", hints: ["What does he need to know before sitting down?"], explanation: "Preparation gives facts and limits." }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain why agreement by negotiation may be better for Moyo Crafts than imposing the change.", points: ["Workers who agree are more likely to cooperate and to work hard", "Imposing the change may lead to industrial action or resignation", "Application: a small workshop depends on a few skilled workers whom it cannot easily replace", "Agreement can be built on terms that both can accept, such as overtime pay"], modelAnswer: "Workers who have agreed to a change are more likely to cooperate and work hard. Imposing it may lead to industrial action or resignations, and a small workshop depends on a few skilled workers whom it cannot easily replace. Agreement allows terms, such as overtime pay, that both sides can accept.", hints: ["Think about motivation and the risk of losing skilled workers."], explanation: "Cooperation, risk and terms." }),
    ],
    hints: ["The stages follow a fixed order, from preparation to agreement."],
    explanation: "Match the stages; prepare to know costs and limits; negotiated agreement protects cooperation.",
  });

  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Nhema Supermarkets of Harare has 120 staff, of whom about 90 belong to a union. Management proposes to introduce new till technology that requires fewer cashiers and plans to make 15 cashiers redundant. The union says it will call a strike unless the plan is withdrawn. The company says that without the technology it would lose customers to rivals. A conciliator has offered to help.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Analyse two possible effects of a strike on Nhema Supermarkets.", points: ["Shops may close or run with fewer staff, so sales and profit fall", "Application: customers may shop at rivals and not return", "The company's reputation as an employer may suffer", "Application: it may find it harder to recruit staff and the dispute may harden attitudes"], modelAnswer: "A strike would close or reduce service at the shops, so sales and profit would fall, and customers might switch to rivals and not return. It could also damage the company's reputation as an employer, making recruitment harder and hardening attitudes on both sides.", hints: ["Consider revenue and long-term reputation."], explanation: "Two effects, each applied." }),
      P.manual({ label: "(b)", marks: 11, stem: "Evaluate how Nhema Supermarkets should resolve the dispute with the union.", points: [["Conciliation lets both sides keep control and could find a compromise", 2], ["Arbitration would end the dispute but remove control of the outcome", 1], ["Alternatives to redundancy, such as natural wastage, retraining and redeployment of cashiers, could reduce the dispute", 2], ["The company's need for the technology to compete is a strong argument which it should explain to the workers", 2], ["Failure to resolve the dispute risks strikes, lost sales and damage to reputation", 1], ["Consultation and sharing information would build trust", 1], ["Negotiated terms such as voluntary redundancy payments and a phased introduction", 1], ["Judgement with a reason and time-frame, for example accept conciliation now and phase in the technology over a year", 1]], levels: [[3, 8, 11, "Evaluates conciliation, arbitration and alternatives to redundancy using the case; weighs the cost of conflict against the need for change; a justified recommendation with a time-frame"], [2, 4, 7, "Explains some options with some use of the case; judgement weakly supported"], [1, 1, 3, "Describes dispute procedures with little application"]], modelAnswer: "The company needs the technology to compete, and it should explain this to the workers and share its figures. A conciliator would let both sides keep control of an agreement, and arbitration would end the dispute but remove control of the outcome, so conciliation is the better first step. The company should also look for alternatives to compulsory redundancy, such as natural wastage, retraining cashiers for other jobs and voluntary redundancy with payments, and phase in the technology so that fewer posts are lost at once. A strike would risk lost sales and damage the company's reputation, so it is in both sides' interest to settle. Nhema should accept conciliation now and phase in the technology over a year, using arbitration only if talks fail.", hints: ["Weigh the need for the technology against the cost of conflict, and compare ways to settle."], explanation: "Weighs procedures and alternatives and recommends a phased, negotiated solution." }),
    ],
    hints: ["Think about the short-term and long-term effects on both sides."],
    explanation: "Strike effects on sales and reputation; conciliation plus alternatives to compulsory redundancy and a phased plan.",
  });

  b.card("DEFINITION", "Trade union", "An organisation of workers that represents them to protect and improve pay, conditions and job security.");
  b.card("DEFINITION", "Collective bargaining", "Negotiation between employers and workers' representatives over pay, hours and conditions, leading to an agreement for a group.");
  b.card("DEFINITION", "Conciliation", "A neutral person helps management and workers to talk and reach their own agreement; no decision is imposed.");
  b.card("DEFINITION", "Arbitration", "An independent person hears both sides and gives a decision that both have agreed to accept.");
  b.card("FACT", "Forms of industrial action", "Strike, go-slow, work-to-rule and overtime ban (by workers); lock-out (by employers).");
  b.card("FACT", "Benefits of good labour relations", "Fewer disputes, higher productivity and quality, lower absence and turnover, flexibility and a good reputation.");
  b.card("FACT", "Workers' participation", "Works councils, workers' committees, union representatives, suggestion schemes and worker directors.");
  b.card("FACT", "Stages of a negotiation (BES)", "Preparation, establishing the environment, exploring needs, testing understanding, negotiating a position, reaching agreement.", undefined, { applies: ZBE });
  b.card("CONCEPT", "Settling a pay dispute", "Compare the cost of the settlement with the cost of conflict, share information, use conciliation first and offer non-pay benefits where possible.");
});
