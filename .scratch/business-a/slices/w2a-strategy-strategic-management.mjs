// W2a: strategy.strategic-management (Cambridge A Level only)
import { concept, P } from "../lib.mjs";
import { mc } from "../tables/w2a-lib.mjs";

concept("abus.strategy.strategic-management", { file: "strategy/strategic-management", keyPrefix: "strategy.strategic-management" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of the following is the best description of a **business strategy**?",
    ok: ["A long-term plan to achieve the objectives", "Correct: strategy sets the direction of the whole business over time."],
    bad: [["A daily instruction to a single worker", "That is an operational instruction, not a strategy."], ["A record of last year's profit and loss", "That is a financial statement."], ["A list of the business's current customers", "That is a customer record."]],
    explanation: "Strategy is a long-term plan for the whole business; tactics are shorter-term actions.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which is the correct order of the stages of strategic management?",
    ok: ["Analysis, choice, implementation", "Correct: analyse the position, choose a strategy, then put it into practice."],
    bad: [["Implementation, analysis, choice", "A strategy cannot be put into practice before it is chosen."], ["Choice, implementation, analysis", "Choosing before analysis gives no basis for the choice."], ["Implementation, choice, analysis", "This reverses the logical order."]],
    explanation: "Strategic analysis comes first, then strategic choice and then implementation, followed by review.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is meant by **corporate culture**?",
    ok: ["The shared values and ways of working", "Correct: it is often described as 'the way we do things here'."],
    bad: [["The total value of a company's shares", "That is market capitalisation."], ["The legal form of the business", "That describes the ownership, not the culture."], ["The number of departments in a company", "That describes structure, not shared values."]],
    explanation: "Corporate culture is the set of shared values, attitudes and behaviour in a business.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of the following is an example of a **tactic** rather than a strategy?",
    ok: ["A weekend discount on selected products", "Correct: a short-term action by a department to support the strategy."],
    bad: [["Entering a new export market over five years", "This is a long-term strategic move."], ["Merging with a rival to increase market share", "A merger is a strategic decision."], ["Changing from manufacturing to services", "A change of business direction is strategic."]],
    hints: ["Strategy is long-term and company-wide; tactics are short-term and departmental."],
    explanation: "Tactics are shorter-term actions that carry out the strategy.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "At a fictional shipping agency in Beitbridge every decision is taken by the founder, who is obeyed without question. Which type of culture is this?",
    ok: ["Power culture", "Correct: decisions are centred on one dominant leader."],
    bad: [["Role culture", "A role culture is built on rules and clearly defined job titles."], ["Task culture", "A task culture uses teams formed around problems."], ["Person culture", "A person culture puts individual needs first."]],
    hints: ["Who holds the control in this business?"],
    explanation: "A single dominant decision maker is the sign of a power culture.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which action is most likely to reduce employees' resistance to a strategic change?",
    ok: ["Involving staff in planning the change", "Correct: involvement gives staff a say and reduces fear of the unknown."],
    bad: [["Announcing the change on the day it starts", "A sudden announcement increases fear and opposition."], ["Removing all training for the new system", "Staff who cannot use the new system will resist it."], ["Punishing any employee who raises doubts", "Punishment creates hostility and silences useful warnings."]],
    hints: ["What do employees fear, and what would reduce it?"],
    explanation: "Early communication, involvement, training and staged introduction reduce resistance.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional bank in Lusaka with a strong role culture wants a fast, innovative strategy. What is the most likely problem?",
    ok: ["Fixed procedures can slow decisions", "Correct: a role culture favours rules over speed and experiment."],
    bad: [["A role culture has no rules, so work is chaotic", "Role cultures are defined by clear rules and procedures."], ["A role culture makes every employee a manager", "Roles in a role culture are fixed, not shared."], ["A role culture cannot be changed in any firm", "Cultures can change, but only slowly and with effort."]],
    hints: ["Compare the features of the culture with what the strategy needs."],
    explanation: "Strategy and culture must fit; a rule-bound culture is slow to adopt rapid innovation.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which is the strongest reason why a fictional tourism lodge should rehearse its crisis plan?",
    ok: ["A rehearsed team can act faster and more calmly", "Correct: practice reveals gaps and speeds up the real response."],
    bad: [["A crisis is certain to happen every year", "Crises are possible, not certain."], ["A rehearsed plan guarantees no loss of customers", "A plan reduces damage but cannot guarantee anything."], ["Rehearsals are cheap and so need no justification", "Rehearsals take time, so the benefit has to be weighed against the cost."]],
    hints: ["What goes wrong with a plan that no one has practised?"],
    explanation: "Rehearsal exposes weaknesses and speeds up action, which limits damage to reputation.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional furniture maker in Bulawayo writes a detailed five-year plan covering objectives, the strategy to meet them and the resources needed. This document is best described as a",
    ok: ["Corporate plan", "Correct: it is a long-term plan for the whole business."],
    bad: [["Contingency plan", "A contingency plan prepares for a specific event."], ["Cash flow forecast", "A cash flow forecast shows receipts and payments over a short period."], ["Job description", "A job description lists the duties of one post."]],
    hints: ["Look at the time span and the scope."],
    explanation: "A corporate plan sets the objectives, strategy and resources for the whole business over several years.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A transformational leader mainly controls staff by rewarding and punishing them against agreed targets.",
    answer: false,
    explanation: "False. That describes a transactional leader. A transformational leader inspires staff with a vision and involves them in change.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Once a strategy has been chosen it should not be changed until the end of the period covered by the corporate plan.",
    answer: false,
    explanation: "False. Strategy should be reviewed and changed when the environment changes; a plan that cannot adapt becomes a weakness.",
    hints: ["Think about the review stage."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each type of corporate culture to its main feature.",
    pairs: [["Power culture", "Decisions made by one dominant leader"], ["Role culture", "Clear rules, job titles and procedures"], ["Task culture", "Teams formed to solve problems"], ["Person culture", "Individuals' needs come first"]],
    explanation: "Each type has a distinct feature that shapes how decisions are made.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "A {{blank:a}} plan deals with a specific event that could happen, while a {{blank:b}} is a sudden, serious event that threatens the survival or reputation of the business.",
    blanks: [
      { id: "a", accepted: ["contingency"], choices: ["contingency", "corporate", "marketing"] },
      { id: "b", accepted: ["crisis"], choices: ["crisis", "strategy", "tactic"] },
    ],
    explanation: "Contingency plans prepare for specific events; a crisis is the serious event itself.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of leader who inspires staff with a vision to achieve major change, rather than managing them by rewards and sanctions.",
    accepted: ["transformational", "transformational leader", "a transformational leader", "transformational leadership"],
    explanation: "A transformational leader uses vision and involvement to drive change.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** reason why employees may resist a strategic change.",
    accepted: ["fear of job loss", "job loss", "fear of redundancy", "fear of the unknown", "loss of status", "extra work", "uncertainty", "increased workload", "lack of training", "loss of power", "dislike of change", "fear of failure", "lack of information"],
    explanation: "Accept fear of job loss, extra work, loss of status, uncertainty or lack of training.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain the difference between strategy and tactics.",
    points: ["Strategy is a long-term plan for the whole business", "Tactics are shorter-term actions, often taken by departments", "Tactics carry out the strategy, for example a promotion that supports a long-term growth plan"],
    modelAnswer: "A strategy is a long-term plan for the whole business. Tactics are shorter-term actions, usually taken by departments, which carry out the strategy, for example a promotion that supports a long-term plan for growth.",
    hints: ["Compare the time span and the scope."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional bakery chain in Mutare wants to move from baking only to baking and online delivery. Explain **two** ways in which the owner could reduce employees' resistance to this change.",
    points: ["Explain the reasons for the change early so staff understand it", "Application: tell bakers and shop staff how delivery will protect sales and jobs", "Train staff to handle the new orders and delivery systems", "Application: show drivers and bakers how to use the new ordering app before the launch"],
    modelAnswer: "The owner should explain the reasons for the change early, telling bakers and shop staff how delivery will protect sales and jobs. He should also train staff to use the new ordering and delivery systems before the launch, so that they feel confident instead of afraid.",
    hints: ["Link each method to the staff of the bakery."],
    explanation: "Two methods, each applied.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how a role culture may affect strategic decision making in a large insurance company.",
    points: ["A role culture follows clear rules and procedures", "Decisions are consistent and well documented, which reduces errors", "Decisions are slow because they pass through several levels", "The company may be slow to adopt new products or technology"],
    modelAnswer: "A role culture follows rules and procedures, so decisions are consistent and well documented, which reduces errors in a business such as insurance. However, decisions pass through several levels and are slow, so the company may be slow to adopt new products or technology.",
    hints: ["Give a benefit and a cost, each explained."],
    explanation: "Benefit and cost of a role culture for decisions.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Assess whether a fictional supermarket chain in Johannesburg should spend management time preparing a crisis plan for a food safety incident.",
    points: ["A food safety incident could harm customers and the chain's reputation", "A prepared team and spokesperson can respond quickly and reduce the damage", "Preparation takes management time and costs money", "Such an event is unlikely in any one year, so the benefit may seem small", "The cost of a poorly handled incident could be very large", "Judgement with a reason: worthwhile because the possible loss is much larger than the cost of preparing"],
    modelAnswer: "A food safety incident could harm customers and the chain's reputation, and a prepared team and spokesperson could respond quickly and reduce the damage. Preparation takes management time and the event is unlikely in any one year. But the cost of a badly handled incident could be very large, far more than the cost of preparing. The plan is worthwhile, provided it is kept up to date and rehearsed.",
    hints: ["Compare the cost of preparing with the possible loss."],
    explanation: "One point per mark; the judgement needs a reason.",
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A fictional business: Nyasha Furniture of Gweru makes school desks. The owner, Nyasha, has a clear plan to be the main supplier to schools in three provinces within five years. The workshop manager, Tendai, plans next week's work, and the sales manager offers a 10% discount on bulk orders this month.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Nyasha's plan to be the main supplier within five years is a", options: [["Strategy", "Correct: it is a long-term direction for the whole business."], ["Tactic", "A tactic is a short-term departmental action."], ["Daily task", "A daily task is an operational activity."], ["Contingency plan", "A contingency plan deals with a specific event."]], answer: "A", explanation: "A long-term plan for the whole business is a strategy." }),
      P.mcq({ label: "(b)", marks: 1, stem: "The sales manager's discount on bulk orders this month is a", options: [["Tactic", "Correct: a short-term action to support the strategy."], ["Corporate plan", "A corporate plan is long-term and covers the whole business."], ["Mission statement", "A mission statement describes the purpose of the business."], ["Crisis", "A crisis is a serious event, not a deliberate action."]], answer: "A", explanation: "A short-term action by a department is a tactic." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why the discount should support, and not conflict with, Nyasha's strategy.", points: ["Tactics should carry out the strategy so that the departments pull in the same direction", "Application: bulk discounts to schools help to win school contracts across provinces", "A discount that attracted only small customers, or lost money on every desk, would not help"], modelAnswer: "Tactics should carry out the strategy so that the departments pull in the same direction. A discount on bulk orders helps to win large contracts from schools across the provinces. A discount that attracted only small customers, or lost money on every desk, would not help the strategy.", explanation: "Tactics must fit the strategy." }),
      P.manual({ label: "(d)", marks: 4, stem: "Analyse why a corporate plan may help Nyasha Furniture to achieve its aim.", points: ["It sets out the objectives, strategy and resources needed", "It coordinates departments such as production, sales and finance", "Application: the workshop can plan capacity for orders from three provinces", "It gives targets against which progress can be measured and corrected"], modelAnswer: "A corporate plan sets out objectives, strategy and resources and coordinates the departments. The workshop can plan its capacity for orders from three provinces while sales and finance work to the same targets, and managers can measure progress and correct course if the targets are missed.", hints: ["Think about coordination and measurement."], explanation: "Direction, coordination and control." }),
    ],
    hints: ["Strategy is long-term and company-wide; tactics are short-term and departmental."],
    explanation: "Strategy; tactic; tactics must fit strategy; a plan coordinates and measures.",
  });

  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "A fictional business: Dube Transport of Bulawayo has run buses for thirty years under strict written rules, with every decision approved by senior managers. Its new managing director, Sipho, wants to introduce an app for booking and tracking buses within one year. Drivers fear that the app will let managers monitor them, and depot managers fear loss of authority. Sipho speaks to all staff and promises that no one will lose a job as a result.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Identify the type of corporate culture at Dube Transport and give a reason.", points: ["Role culture", "Rules and approval by senior managers are the main features"], modelAnswer: "A role culture, because decisions follow strict written rules and are approved by senior managers.", explanation: "Type plus a reason from the case." }),
      P.manual({ label: "(b)", marks: 4, stem: "Analyse two causes of resistance to the app at Dube Transport.", points: ["Drivers fear monitoring by managers", "Application: they may avoid using the app or hide information", "Depot managers fear loss of authority", "Application: they may delay the implementation or criticise it"], modelAnswer: "Drivers fear that managers will monitor them, so they may avoid using the app or hide information. Depot managers fear a loss of authority, so they may delay the launch or criticise the app to others.", hints: ["For each group name the fear and the likely behaviour."], explanation: "Two causes, each linked to behaviour." }),
      P.manual({ label: "(c)", marks: 8, stem: "Evaluate whether Sipho's approach is likely to make the change succeed.", points: [["He communicates directly with all staff, which reduces fear of the unknown", 1], ["His promise on jobs reduces the main fear, but does not answer the fear of monitoring or loss of authority", 2], ["Involving drivers and depot managers in the design of the app would give them a say", 2], ["A role culture is slow to change, so one year may be too short", 1], ["Staged introduction and training would reduce risk", 1], ["Judgement with a reason: partly effective, but needs involvement and a longer timetable", 1]], levels: [[3, 6, 8, "Weighs strengths and weaknesses of Sipho's approach against the culture and the fears in the case; a justified judgement"], [2, 3, 5, "Explains some features of his approach with some application; judgement weakly supported"], [1, 1, 2, "Describes the change with little analysis"]], modelAnswer: "Sipho does well to speak to all staff, because direct communication reduces fear of the unknown, and his promise on jobs removes one of the biggest fears. But the promise does not answer the drivers' fear of monitoring or the depot managers' fear of losing authority, so resistance may remain. In a role culture, where decisions have always been made by senior managers, change is slow, so a one-year timetable may be too short. He should involve drivers and depot managers in the design of the app, introduce it at one depot first and train staff. His approach is a good start but is unlikely to succeed on its own.", hints: ["Say what he has done well, what he has not done, and what the culture suggests."], explanation: "Weighs the approach against the case and judges its likely success." }),
    ],
    hints: ["Link the fears in the case to the behaviours that would slow the change."],
    explanation: "Role culture; fear of monitoring and loss of authority; the approach is a good start but incomplete.",
  });

  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Mhlanga Safari Lodge near Hwange has 40 rooms and relies on foreign visitors. Its manager, Thandeka, has a contingency plan for fire. She does not have a plan for a sudden fall in visitor numbers caused by a travel warning, or for an outbreak of illness at the lodge. Rivals have recently begun to cut prices.",
    parts: [
      P.manual({ label: "(a)", marks: 6, stem: "Analyse the benefits to Mhlanga Safari Lodge of having a crisis plan for an outbreak of illness.", points: ["A named team knows who must act, so response is fast", "A spokesperson can communicate honestly with guests, staff and the media", "Quick communication limits damage to the lodge's reputation", "Application: bookings depend on safety and reputation, so protecting them protects revenue", "A rehearsed plan helps the lodge to isolate the problem and meet legal duties", "A plan prepared in advance avoids panic and poor decisions"], modelAnswer: "A named crisis team knows who must act, so the response is fast, and a spokesperson can communicate honestly with guests, staff and the media. Quick, honest communication limits damage to the lodge's reputation, and since bookings depend on safety and reputation, it also protects revenue. A rehearsed plan also helps the lodge to isolate the problem and meet its legal duties, and prevents panic and poor decisions.", hints: ["Follow the chain: plan, response, reputation, bookings."], explanation: "Benefits of a crisis plan applied to the lodge." }),
      P.manual({ label: "(b)", marks: 9, stem: "Evaluate whether Thandeka should spend management time on contingency planning for a fall in visitor numbers, or on a strategy to compete with rivals that are cutting prices.", points: [["Contingency planning would prepare actions such as cost cuts or marketing to local guests if visitors fall", 2], ["Competition from rivals' price cuts is already happening, so the need is immediate", 1], ["A strategy to compete (for example by differentiation) needs analysis and choice and may take time", 1], ["The lodge's dependence on foreign visitors makes a fall in numbers a serious risk, so a plan could protect survival", 2], ["Both consume limited management time; they are not alternatives if some of the work can be delegated", 1], ["Limits: forecasts are uncertain and plans may become out of date", 1], ["Judgement with a reason and time-frame, for example start the competitive strategy now and prepare a short contingency plan in the next quarter", 1]], levels: [[3, 7, 9, "Weighs both uses of management time against the lodge's situation; considers cost, likelihood and urgency; a justified recommendation with a condition or time-frame"], [2, 4, 6, "Explains both options with some application; judgement weakly supported"], [1, 1, 3, "Describes the two options with little application"]], modelAnswer: "The price cutting is already happening, so the need for a competitive strategy is immediate: the lodge must decide whether to match prices, or differentiate by service or location, and this takes analysis and choice. A fall in foreign visitors is not happening yet, but because the lodge depends on them, it would threaten survival, and a short contingency plan with actions such as cost cuts and marketing to local guests would protect it. Management time is limited, but the two are not strict alternatives, since the contingency plan can be brief. Forecasts about travel warnings are uncertain, so the plan must be reviewed. Thandeka should start the competitive strategy now and prepare a simple contingency plan in the next quarter.", hints: ["Compare urgency, impact and cost; then give a sequence."], explanation: "Weighs urgency against impact and gives a sequenced recommendation." }),
    ],
    hints: ["The rivals' price cuts are happening now; the fall in visitors is a possible future event."],
    explanation: "Benefits of a crisis plan; competitive strategy first with a short contingency plan to follow.",
  });

  b.card("DEFINITION", "Strategy", "A long-term plan of action for the whole business to achieve its objectives; tactics are the shorter-term actions that carry it out.");
  b.card("CONCEPT", "Strategic management", "Strategic analysis, then strategic choice, then implementation, followed by review.");
  b.card("DEFINITION", "Corporate plan", "A long-term plan for the whole business that sets out objectives, strategy and resources, and coordinates the departments.");
  b.card("DEFINITION", "Corporate culture", "The shared values, attitudes and ways of working in a business: 'the way we do things here'.");
  b.card("FACT", "Four types of culture", "Power (one dominant leader), role (rules and procedures), task (problem-solving teams), person (individuals' needs first).");
  b.card("DEFINITION", "Transformational leader", "A leader who inspires staff with a vision, communicates it and involves them, so that major change can be achieved.");
  b.card("FACT", "Reducing resistance to change", "Explain the reasons early, involve staff, train them, introduce the change in stages and show early successes.");
  b.card("DEFINITION", "Contingency plan", "A plan prepared in advance for a specific event that could happen, naming who will act and what they will do.");
  b.card("FACT", "Crisis management", "A crisis response team, honest and prompt communication with staff, customers and the media, and a rehearsed plan.");
});
