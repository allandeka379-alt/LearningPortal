// W2b: organisation.delegation-control
import { concept, P, chk } from "../lib.mjs";
import { mc, pmc } from "../tables/w2b-lib.mjs";

// Managers (everyone with subordinates) needed above n operatives at a constant span.
function managersFor(operatives, span) {
  let level = operatives;
  let managers = 0;
  let levels = 1;
  while (level > 1) {
    level = Math.ceil(level / span);
    managers += level;
    levels += 1;
  }
  return { managers, levels };
}

concept("abus.organisation.delegation-control", { file: "organisation/delegation-control", keyPrefix: "organisation.delegation-control" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is meant by **delegation**?",
    ok: ["Passing authority to a subordinate to carry out a task", "Correct: the manager gives the subordinate the authority to act."],
    bad: [["Dismissing a subordinate who makes repeated mistakes at work", "Dismissal is a disciplinary action."], ["Doing a subordinate's work for them", "That is the opposite of delegating."], ["Increasing the pay of a subordinate", "Pay is a reward, not delegation."]],
    explanation: "Delegation passes authority for a task to a subordinate, while the manager stays accountable.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of the following can a manager **not** fully delegate?",
    ok: ["Accountability for the final result", "Correct: the manager remains answerable to a superior."],
    bad: [["Routine tasks", "Routine tasks can be delegated."], ["The authority to order stock up to a limit", "Authority can be delegated, with limits."], ["The duty to prepare a report", "Tasks and responsibility can be delegated."]],
    explanation: "Tasks and authority can be delegated; ultimate accountability stays with the manager.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is the **best definition of accountability**?",
    ok: ["Being answerable for results to a superior", "Correct: the person must report on and justify what was achieved."],
    bad: [["The right to give instructions to others", "This is authority."], ["The duty to complete a task", "This is responsibility."], ["The number of subordinates under a manager", "This is the span of control."]],
    explanation: "Accountability is the obligation to report and justify results.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Widening the span of control in a business, with the same number of employees, normally",
    ok: ["Reduces the number of levels in the hierarchy", "Correct: fewer layers are needed when each manager has more subordinates."],
    bad: [["Increases the number of levels in the hierarchy", "Wider spans reduce levels."], ["Makes the chain of command longer", "A wider span shortens the chain."], ["Makes delegation impossible", "Wide spans usually depend on delegation."]],
    explanation: "Wider spans mean fewer managers and fewer levels.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional shop manager in Harare is told to raise sales by 10% but is not allowed to change prices, hire staff or order stock. Which problem has the owner created?",
    ok: ["Responsibility without matching authority", "Correct: the manager must achieve the target but cannot use the means to do so."],
    bad: [["Authority without any responsibility", "The manager has the responsibility but little authority."], ["Too many levels of hierarchy", "The extract says nothing about the levels."], ["Accountability that has been delegated away", "The owner remains accountable, and the manager is also accountable to the owner."]],
    explanation: "Authority must match responsibility; here the manager has the duty but not the means.",
    hints: ["What can the manager decide?"],
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional bakery owner in Mutare allows her supervisor to approve orders of flour up to US\\$300 and reviews all orders each Friday. Which description best fits?",
    ok: ["Delegation within limits, with accountability through review", "Correct: the supervisor has authority up to a limit and reports weekly."],
    bad: [["Complete trust with no control", "The owner reviews each Friday, so there is some control."], ["Complete control with no delegation", "The supervisor has authority up to a limit."], ["Full delegation of all accountability to the supervisor alone", "The owner remains accountable overall."]],
    explanation: "A spending limit and a regular review balance trust with control.",
    hints: ["Does the owner keep any control?"],
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is a likely **cost or risk of delegation**?",
    ok: ["Subordinates may make poor decisions", "Correct: staff may lack experience or judgement."],
    bad: [["Managers have more time for strategy", "This is a benefit."], ["Staff are more motivated", "This is a benefit."], ["Decisions are made faster", "This is a benefit."]],
    explanation: "Delegation can lead to mistakes and loss of control; time, speed and motivation are benefits.",
    hints: ["Which option is not a benefit?"],
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional factory owner checks every decision made by her supervisors, who then stop making suggestions. What is the most likely reason for this result?",
    ok: ["Close checking signals a lack of trust and discourages initiative", "Correct: staff who feel distrusted stop taking responsibility."],
    bad: [["Close checking increases the authority and freedom of supervisors", "Checking reduces, not increases, their authority."], ["Close checking removes all risk of error", "Errors can still occur and the checking costs time."], ["Close checking raises the span of control", "Checking does not change the span of control."]],
    explanation: "Over-control undermines trust and motivation; staff wait for approval instead of acting.",
    hints: ["How would you feel if everything were checked?"],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A manager who delegates a task is no longer accountable for the result.",
    answer: false,
    explanation: "False. The manager remains accountable to a superior for the outcome of a delegated task.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Delegation is more likely to succeed when subordinates are skilled and clear limits to their authority are set.",
    answer: true,
    explanation: "True. Skill reduces the risk of error, and limits stop a mistake becoming too costly.",
    hints: ["What reduces the risk of delegating?"],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [["Authority", "The right to give instructions and make decisions"], ["Responsibility", "The duty to complete assigned tasks"], ["Accountability", "The obligation to answer for results to a superior"], ["Span of control", "The number of subordinates reporting to a manager"], ["Delegation", "Passing authority for a task to a subordinate"]],
    explanation: "Each term matches one meaning.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "A manager can delegate authority and {{blank:a}}, but remains {{blank:b}} for the final result.",
    blanks: [
      { id: "a", accepted: ["responsibility"], choices: ["responsibility", "accountability"] },
      { id: "b", accepted: ["accountable"], choices: ["accountable", "unaccountable"] },
    ],
    explanation: "Authority and responsibility can be delegated; accountability stays with the manager.",
  });

  b.short({
    d: 1, skill: "RECALL",
    stem: "State the term for the number of subordinates who report directly to one manager.",
    accepted: ["span of control", "span", "span of management"],
    explanation: "Span of control is the number of direct subordinates.",
  });

  const ops = 144;
  const narrow = managersFor(ops, 4);
  const wide = managersFor(ops, 12);
  chk(narrow.managers, 49);
  chk(wide.managers, 12 + 1);
  b.num({
    d: 3, skill: "APPLICATION", kind: "plain", unit: "managers", value: wide.managers, calculator: true, daily: true, wrong: [ops / 12, narrow.managers],
    stem: "A fictional company in Bulawayo has 144 operatives, and every manager (including the director) has a span of control of 12. How many managers, including the director, are needed above the operatives?",
    hints: ["Divide the operatives by 12 to find the supervisors, then find who supervises them."],
    explanation: "144 / 12 = 12 supervisors; 12 / 12 = 1 director. Managers = 12 + 1 = 13, and there are three levels. Giving 12 forgets the director.",
  });
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "plain", unit: "managers", value: narrow.managers - wide.managers, calculator: true, wrong: [narrow.managers, wide.managers],
    stem: "The company above considers a narrower span of 4 for every manager. With the same 144 operatives, how many more managers (including the director) would be needed than with a span of 12? (Use 144 / 4 and so on up the hierarchy; round up where a division is not exact.)",
    hints: ["Start with 144 / 4, then divide each result by 4 again until you reach one person."],
    explanation: "Span 4: 144 / 4 = 36 supervisors; 36 / 4 = 9 managers; 9 / 4 = 2.25, rounded up to 3 senior managers; 3 / 4 = 1 director. Total = 36 + 9 + 3 + 1 = 49. Span 12: 13 managers. Difference = 49 - 13 = 36 more managers (and two more levels).",
    workedSolution: "1. Span 4: supervisors 144/4 = 36; managers 36/4 = 9; senior managers 9/4 -> 3; director 1. Total = 36 + 9 + 3 + 1 = 49.\n2. Span 12: 144/12 = 12 supervisors + 1 director = 13.\n3. Difference = 49 - 13 = 36 managers.",
  });
  b.num({
    d: 3, skill: "ANALYSIS", kind: "money", value: (narrow.managers - wide.managers) * 900 * 12, calculator: true, wrong: [(narrow.managers - wide.managers) * 900, 49 * 900 * 12],
    stem: "Each manager in the company above is paid US\\$900 a month. Calculate the extra annual salary cost of the narrower span of 4 compared with the span of 12 (36 extra managers).",
    hints: ["Extra managers x monthly pay x 12."],
    explanation: "36 x US\\$900 = US\\$32,400 a month; x 12 = US\\$388,800 a year. Using one month (US\\$32,400) is a common slip.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain the difference between authority and responsibility.",
    points: ["Authority is the right to give instructions and make decisions", "Responsibility is the duty to complete a task to a satisfactory standard", "Authority should match responsibility, so that the person can do the job"],
    modelAnswer: "Authority is the right to give instructions and make decisions. Responsibility is the duty to complete a task to a satisfactory standard. Authority should match responsibility so that the person can do the job.",
    hints: ["Right to decide versus duty to do."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional pharmacy owner in Masvingo delegates ordering of medicines to the senior assistant. Explain **two** benefits to the owner.",
    points: ["The owner has more time for planning and managing the business", "Application: she can plan a second pharmacy", "Ordering is done by someone who knows daily stock levels", "Application: the assistant can re-order quickly before shelves are empty"],
    modelAnswer: "The owner has more time for planning, for example for a second pharmacy. Ordering is also done by someone who knows daily stock levels, so the assistant can re-order quickly before shelves are empty.",
    hints: ["Think about the owner's time and the assistant's knowledge."],
    explanation: "Two benefits, each applied to the pharmacy.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how a manager can maintain control when delegating a task.",
    points: ["Set clear targets and limits on authority", "Require regular reports on progress", "Review results at agreed meetings", "Take corrective action early, which limits the cost of mistakes"],
    modelAnswer: "The manager can set clear targets and limits on authority, and require regular reports on progress. Results can be reviewed at agreed meetings, so that corrective action is taken early and the cost of mistakes is limited.",
    hints: ["Think of what is set before, during and after the task."],
    explanation: "Targets, reports, reviews, corrective action.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Assess whether the owner of a fictional small restaurant in Victoria Falls should delegate the ordering of food supplies to the head chef.",
    points: ["The chef knows how much food is used, so orders are more accurate", "The owner is freed to attract customers", "Application: less waste of fresh food", "Risk: the chef may order too much or choose suppliers with higher prices", "Risk: possible dishonesty if there are no checks", "Judgement with a reason: delegate with a spending limit and a weekly review"],
    modelAnswer: "The chef knows how much food is used, so orders are likely to be more accurate and waste of fresh food falls, and the owner is freed to attract customers. But the chef may order too much or choose dearer suppliers, and there is a risk of dishonesty if nothing is checked. The owner should delegate with a spending limit and a weekly review.",
    hints: ["Give a benefit, a risk and a judgement."],
    explanation: "One point per mark; the judgement needs a reason.",
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A fictional business: Farai's Garage in Mutare repairs vehicles. Farai approves every spare-part purchase himself, so mechanics wait for him and customers complain about delays. He is considering letting the workshop foreman approve purchases up to US\\$150, with a weekly list of all purchases for Farai to check.",
    parts: [
      pmc(P, { label: "(a)", marks: 1, stem: "Allowing the foreman to approve purchases up to US\\$150 is an example of", ok: ["Delegation", "Correct: authority is passed to a subordinate within limits."], bad: [["Centralisation", "Centralisation keeps decisions at the top."], ["Dismissal", "Nobody is being dismissed."], ["Diversification", "Diversification is a growth strategy."]], explanation: "Passing authority to the foreman is delegation." }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain **two** benefits to the garage of the proposed change.", points: ["Mechanics get parts faster, so repairs are completed sooner", "Application: customers wait less, so fewer complain", "Farai has time for other tasks", "Application: he can deal with customers or plan expansion"], modelAnswer: "Mechanics get parts faster, so repairs are completed sooner and customers wait less. Farai also has time for other tasks, such as dealing with customers or planning expansion.", hints: ["Think about speed and Farai's time."], explanation: "Two benefits applied to the garage." }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain how the weekly list helps Farai to keep control.", points: ["It lets him see what has been bought and at what price", "Application: he can spot unusual or costly purchases", "It makes the foreman accountable for his decisions", "Problems are noticed within a week, not months"], modelAnswer: "The weekly list lets Farai see what has been bought and at what price, so he can spot unusual or costly purchases. It makes the foreman accountable for his decisions, and problems are noticed within a week.", hints: ["Think about accountability."], explanation: "Reporting provides accountability." }),
    ],
    hints: ["Think about speed, Farai's time and how he keeps control."],
    explanation: "Delegation within a limit, with a weekly check, speeds repairs and keeps control.",
  });

  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Tendai's Printing in Harare has 18 employees. Tendai takes every decision himself, including the colour of paper for each job, and is always at work late. Quality is good, but customers say that quotations take days. A skilled supervisor, Mrs Zhou, has offered to take over estimates and customer queries. Tendai says, \"Nobody else can do this as well as I can, and if she makes a mistake it will cost me a customer.\"",
    parts: [
      P.manual({ label: "(a)", marks: 6, stem: "Analyse the problems that Tendai's reluctance to delegate is causing.", points: [["Quotations are delayed because all decisions pass through Tendai", 2], ["Customers may go to faster competitors", 1], ["Tendai is overworked and has no time to plan growth", 1], ["Mrs Zhou is under-used and may become demotivated or leave", 2]], modelAnswer: "All decisions pass through Tendai, so quotations are delayed and customers may go to faster competitors. Tendai is overworked and has no time to plan growth. Mrs Zhou's skills are under-used, so she may become demotivated or leave.", hints: ["Think about customers, Tendai and Mrs Zhou."], explanation: "Delays, lost customers, overwork and under-used staff." }),
      P.manual({ label: "(b)", marks: 9, stem: "Evaluate whether Tendai should delegate estimates and customer queries to Mrs Zhou.", points: [["Benefits: faster quotations, more time for Tendai, develops Mrs Zhou", 2], ["Risk: a mistake could cost a customer or money", 2], ["Control: limits on the size of quotations and a daily review of estimates", 2], ["Tendai's attitude to risk and trust must change; the cost of the status quo is delay and overwork", 1], ["Trial period: start with small jobs", 1], ["Judgement with a reason", 1]], levels: [[3, 7, 9, "Weighs benefits and risks with application to the printing business; justified recommendation with a condition"], [2, 4, 6, "Explains benefits and risks with some application; judgement weak"], [1, 1, 3, "Describes delegation in general with little application"]], modelAnswer: "Delegating estimates would speed up quotations, give Tendai time to plan, and develop Mrs Zhou. The risk is that a mistake could cost a customer or money. Tendai can keep control by setting a limit on the size of quotations she can approve and reviewing her estimates each day. He also needs to see that the present system already costs him customers through delay. He should start with small jobs and extend her authority as she shows good judgement. On balance he should delegate with limits, because the cost of delay and overwork is greater than the limited risk of a mistake on small jobs.", hints: ["Weigh the risk of mistakes against the cost of the present system."], explanation: "Compare benefits and risks, then recommend a staged approach." }),
    ],
    hints: ["Think about the cost of keeping everything in one person's hands."],
    explanation: "Staged delegation with limits and review.",
  });

  b.card("DEFINITION", "Delegation", "Passing authority to a subordinate to carry out a task or decide, while the manager remains accountable.");
  b.card("DEFINITION", "Accountability", "The obligation to report on and justify results to a superior; it cannot be fully delegated.");
  b.card("CONCEPT", "Authority and responsibility", "Authority is the right to decide; responsibility is the duty to complete the task. Authority must match responsibility.");
  b.card("FACT", "Processes of accountability", "Clear targets, reporting, review meetings, appraisal, audits and consequences for success or failure.");
  b.card("FACT", "Benefits of delegation", "Frees senior time, faster decisions, develops staff, motivates, uses specialist knowledge.");
  b.card("FACT", "Costs and risks of delegation", "Mistakes, loss of control, training and supervision cost, overload, inconsistency.");
  b.card("CONCEPT", "Span of control and levels", "With the same staff, wider spans mean fewer managers and levels, and a shorter chain of command.");
  b.card("CONCEPT", "Control versus trust", "Over-checking shows distrust and demotivates; no checking risks undetected problems. Balance depends on ability, risk and cost of error.");
  b.card("CONCEPT", "Making delegation work", "Skilled staff, clear tasks, limits on authority, regular review, and a culture that accepts learning from mistakes.");
});
