// W2b: management.functions-roles-theories
import { concept, P, ZIM } from "../lib.mjs";
import { mc, pmc } from "../tables/w2b-lib.mjs";

concept("abus.management.functions-roles-theories", { file: "management/functions-roles-theories", keyPrefix: "management.functions-roles-theories" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of the following is one of the four traditional functions of management?",
    ok: ["Controlling", "Correct: comparing results with plans and taking corrective action."],
    bad: [["Bargaining", "Bargaining is not one of the four functions; negotiation is one of Mintzberg's roles."], ["Marketing and advertising", "Marketing is a functional area of a business, not a function of management."], ["Borrowing", "Borrowing is a source of finance."]],
    explanation: "The four functions are planning, organising, directing and controlling.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which writer divided the work of managers into **interpersonal, informational and decisional roles**?",
    ok: ["Mintzberg", "Correct: Henry Mintzberg described ten managerial roles in three groups."],
    bad: [["Fayol", "Fayol analysed the functions of management."], ["Taylor (scientific management)", "Taylor is the founder of scientific management."], ["Weber", "Weber described bureaucracy."]],
    explanation: "Mintzberg's ten roles are grouped as interpersonal, informational and decisional.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A manager compares monthly sales with the budget and finds a shortfall. Which function is this?",
    ok: ["Controlling", "Correct: comparing actual results with the plan is control."],
    bad: [["Planning", "Planning sets the budget in advance."], ["Organising", "Organising arranges people and resources."], ["Directing and leading", "Directing guides and motivates staff."]],
    explanation: "Controlling compares actual results with plans and takes corrective action.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In Mintzberg's classification, a manager who deals with a sudden strike is playing which role?",
    ok: ["Disturbance handler", "Correct: this is a decisional role."],
    bad: [["Figurehead", "A figurehead performs ceremonial duties."], ["Monitor", "A monitor collects information."], ["Spokesperson", "A spokesperson speaks for the business to outsiders."]],
    explanation: "Dealing with unexpected problems is the disturbance handler role, a decisional role.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional bakery manager in Gweru assigns staff to the ovens, packing and delivery and states who reports to whom. Which function is she carrying out?",
    ok: ["Organising", "Correct: she is arranging people and tasks."],
    bad: [["Controlling", "No results are being compared with a plan."], ["Planning", "She is not setting targets for the future."], ["Directing", "She is not motivating or guiding staff here."]],
    explanation: "Assigning duties and reporting lines is organising.",
    hints: ["Is she setting targets, arranging people, motivating or checking?"],
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional company director in Harare gives a speech at the opening of a new depot. Which of Mintzberg's roles is this?",
    ok: ["Figurehead", "Correct: ceremonial and symbolic duties are the figurehead role."],
    bad: [["Resource allocator", "That role decides how budget, time and staff are used."], ["Negotiator", "That role bargains with others for an agreement."], ["Monitor", "That role gathers information."]],
    explanation: "Opening a depot with a speech is a ceremonial, interpersonal role: figurehead.",
    hints: ["Which role is ceremonial?"],
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is a valid **criticism of Weber's bureaucratic approach** in a small, fast-changing business?",
    ok: ["Rules and hierarchy may slow decisions", "Correct: formal procedures can make a firm slow to react."],
    bad: [["It gives managers too little control", "Bureaucracy gives strong control through rules."], ["It treats all workers unfairly", "Bureaucracy aims at fair treatment through rules."], ["It cannot be used in large organisations", "Bureaucracy suits large organisations."]],
    explanation: "Bureaucracy is fair and consistent but slow, impersonal and resistant to change.",
    hints: ["What is the cost of following many rules?"],
    applies: ZIM,
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Why might Mintzberg's roles describe a manager's working day better than the four functions?",
    ok: ["Managers face interruptions planning cannot predict", "Correct: the roles include handling disturbances and informal contacts."],
    bad: [["Managers do not plan, organise, direct or control", "Managers do carry out these functions."], ["The roles are written by managers about their own firms", "They were developed from observing managers."], ["The roles list fewer tasks than the functions", "The roles list ten tasks, more than the four functions."]],
    explanation: "The roles capture the varied, interrupted and spoken work of a real day; the functions give a tidy framework.",
    hints: ["Think about the day Thandeka had in the lesson."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Henri Fayol's analysis of management describes the day-to-day roles a manager plays, grouped as interpersonal, informational and decisional.",
    answer: false,
    explanation: "False. Fayol analysed the functions of management. The interpersonal, informational and decisional roles are Mintzberg's.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Controlling is complete once actual results have been compared with the plan, even if no further action is taken.",
    answer: false,
    explanation: "False. Controlling includes taking corrective action when results differ from the plan.",
    hints: ["What happens after the comparison?"],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each Mintzberg role to its group.",
    pairs: [["Figurehead", "Interpersonal"], ["Monitor", "Informational"], ["Resource allocator", "Decisional"], ["Spokesperson", "Informational"], ["Leader", "Interpersonal"]],
    explanation: "Figurehead and leader are interpersonal; monitor and spokesperson are informational; resource allocator is decisional.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "Setting objectives and deciding how to reach them is {{blank:a}}; guiding and motivating staff is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["planning"], choices: ["planning", "controlling", "organising"] },
      { id: "b", accepted: ["directing"], choices: ["directing", "organising", "controlling"] },
    ],
    explanation: "Planning sets objectives; directing (leading) guides and motivates.",
  });

  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the French engineer and manager who analysed the functions of management.",
    accepted: ["fayol", "henri fayol"],
    explanation: "Henri Fayol analysed management functions.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "State the name of the theory of management, associated with Max Weber, that is based on rules and a clear hierarchy.",
    accepted: ["bureaucracy", "bureaucratic", "bureaucratic management", "bureaucratic theory", "bureaucratic approach"],
    explanation: "Weber's bureaucratic approach stresses rules, hierarchy and records.",
    applies: ZIM,
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain what is meant by the management function of planning.",
    points: ["Setting objectives for the business or a department", "Deciding how the objectives will be reached, for example through budgets or schedules", "Looking ahead so that resources are ready when needed"],
    modelAnswer: "Planning means setting objectives for the business or a department and deciding how they will be reached, for example through budgets and schedules. It looks ahead so that the resources needed are ready when required.",
    hints: ["Mention objectives and how they will be reached."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional furniture workshop in Mutare has a manager who plans orders and organises staff but never checks progress. Explain **two** problems this may cause.",
    points: ["Delays and faults are not noticed in time", "Application: late chair orders may lose customers", "Plans cannot be corrected or improved", "Application: the workshop may keep wasting timber without knowing"],
    modelAnswer: "Delays and faults are not noticed in time, so orders may be late and customers may be lost. Plans also cannot be corrected, so the workshop may keep wasting timber without knowing it.",
    hints: ["What does control tell a manager?"],
    explanation: "Two problems of a lack of control, applied to the workshop.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how an effective manager can improve the performance of a business.",
    points: ["Sets clear objectives and plans, so staff know what to achieve", "Organises resources so that time and materials are not wasted", "Directs and motivates staff, so effort and quality are higher", "Controls results and takes action, so problems are found early and costs fall"],
    modelAnswer: "An effective manager sets clear objectives so staff know what to achieve and organises resources so that time and materials are not wasted. She directs and motivates staff so that effort and quality rise, and she controls results so that problems are found early and costs fall.",
    hints: ["Use all four functions."],
    explanation: "One link from each function to performance.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Assess whether a small fictional tuck shop in Mutare should use a bureaucratic approach to management.",
    points: ["Rules and records can control stock and cash, reducing losses", "Application: written till records help to prevent theft", "Clear duties avoid confusion between the two or three staff", "Excessive rules slow decisions and reduce flexibility in a small shop", "Staff may feel distrusted and lose interest", "Judgement with a reason: use simple rules for cash and stock but keep daily management flexible"],
    modelAnswer: "Rules and records can control stock and cash, for example written till records reduce the risk of theft, and clear duties avoid confusion among a few staff. But too many rules slow decisions and reduce flexibility in a small shop, and staff may feel distrusted. The shop should use simple rules for cash and stock but keep daily management flexible.",
    hints: ["Give a benefit, a cost and a judgement."],
    explanation: "One point per mark; the judgement needs a reason.",
    applies: ZIM,
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A fictional business: Tatenda manages a poultry farm near Chinhoyi. On Monday she (1) forecasts egg sales for the next three months, (2) draws up a rota for feeding and collecting, (3) tells the staff why the new egg-grading target matters and encourages them, and (4) compares last week's eggs collected with the target.",
    parts: [
      P.match({ label: "(a)", marks: 4, stem: "Match each of Tatenda's actions to the function of management.", pairs: [["Forecasts egg sales for three months", "Planning"], ["Draws up a rota", "Organising"], ["Explains the target and encourages staff", "Directing"], ["Compares last week's output with the target", "Controlling"]], explanation: "Forecasting is planning; the rota is organising; explaining and encouraging is directing; comparing with the target is controlling." }),
      pmc(P, { label: "(b)", marks: 1, stem: "The same afternoon Tatenda telephones a vet about a sick hen. Which role of Mintzberg is she playing mainly?", ok: ["Disturbance handler", "Correct: she is dealing with an unexpected problem."], bad: [["Figurehead", "This is a ceremonial role."], ["Monitor", "She is acting, not collecting information."], ["Resource allocator", "She is not deciding how to share resources."]], explanation: "Dealing with an unexpected problem is the disturbance handler role." }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain why controlling is important to the farm.", points: ["It shows whether egg output matches the target", "Application: low output may be traced to feed or disease", "It allows corrective action", "Early action avoids losses and keeps customers supplied"], modelAnswer: "Controlling shows whether egg output matches the target. Low output may be traced to feed or disease, and corrective action can be taken early, which avoids losses and keeps customers supplied.", hints: ["Say what the comparison shows and what follows it."], explanation: "Comparison, cause, action, benefit." }),
    ],
    hints: ["For each action ask: setting a target, arranging people, guiding people or checking?"],
    explanation: "Planning, organising, directing, controlling; then a decisional role.",
  });

  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Rudo's Transport in Lusaka runs 12 minibuses on city routes. Rudo spends most of her day handling breakdowns, speaking to drivers and bargaining with fuel suppliers. She has never written a business plan. Profits have been falling for two years, and drivers say they do not know what is expected of them.",
    parts: [
      P.manual({ label: "(a)", marks: 6, stem: "Analyse which of Mintzberg's roles Rudo is playing and which functions she may be neglecting.", points: [["Disturbance handler: she handles breakdowns", 1], ["Leader or liaison: she speaks to drivers", 1], ["Negotiator: she bargains with fuel suppliers", 1], ["Planning is neglected because she has no business plan", 1], ["Directing may be weak because drivers do not know what is expected", 1], ["Consequence: day-to-day problems take over and the business has no direction, so profits fall", 1]], modelAnswer: "Rudo is a disturbance handler when she deals with breakdowns, a leader or liaison when she speaks to drivers, and a negotiator when she bargains with fuel suppliers. She is neglecting planning, because she has no business plan, and directing, because drivers do not know what is expected. Day-to-day problems take over and the business has no direction, so profits fall.", hints: ["Name the roles in the first sentence, then the missing functions."], explanation: "Roles she plays, functions she neglects, consequence." }),
      P.manual({ label: "(b)", marks: 9, stem: "Evaluate whether Rudo should spend more time on planning and controlling or continue to handle problems as they arise.", points: [["Planning gives direction: routes, targets and maintenance schedules would reduce breakdowns", 2], ["Controlling would show where profit is lost, such as fuel use and repairs", 2], ["Handling problems is unavoidable in transport, and delay may lose passengers", 2], ["Planning takes time away from urgent problems; she may need a deputy or supervisor", 1], ["Delegating some tasks to a supervisor could give her the time", 1], ["Judgement with a reason, for example plan first for maintenance and fuel, while delegating routine problems", 1]], levels: [[3, 7, 9, "Weighs planning and control against problem solving with application to the transport business; justified recommendation with a condition"], [2, 4, 6, "Explains both with some application; judgement unsupported"], [1, 1, 3, "Lists functions or roles with little application"]], modelAnswer: "Planning would give Rudo's business direction: a maintenance schedule would reduce breakdowns, and targets would tell drivers what is expected. Controlling would show where profit is being lost, for example in fuel use or repairs. However, breakdowns and supplier bargaining cannot be ignored, because delays lose passengers, and planning takes time that she does not now have. She could delegate routine problems to a supervisor and use the time saved for planning and control. On balance she should plan maintenance and fuel use first, since these address the cause of falling profit, while a supervisor handles routine problems.", hints: ["Weigh the long-term benefit of planning against the urgency of problems."], explanation: "Compare planning and control with problem solving, then justify." }),
    ],
    hints: ["Link her activities to the roles and the neglected functions."],
    explanation: "She plays decisional and interpersonal roles but neglects planning and directing.",
  });

  b.card("DEFINITION", "Management", "Planning, organising, directing and controlling resources to achieve the objectives of a business.");
  b.card("FACT", "Four functions of management", "Planning, organising, directing (leading) and controlling; Fayol's list also names commanding and coordinating.");
  b.card("DEFINITION", "Controlling", "Comparing actual results with plans and taking corrective action.");
  b.card("FACT", "Mintzberg's role groups", "Interpersonal (figurehead, leader, liaison); informational (monitor, disseminator, spokesperson); decisional (entrepreneur, disturbance handler, resource allocator, negotiator).");
  b.card("CONCEPT", "Functions versus roles", "Functions say what managers are responsible for (Fayol); roles describe the varied work done in a busy day (Mintzberg).");
  b.card("FACT", "Scientific management", "Taylor: find the one best way by time and motion study; pay for output. Suits repetitive work.", undefined, { applies: ZIM });
  b.card("FACT", "Administrative (classical) theory", "Fayol: management principles and functions apply to all organisations; clear structure but may be rigid.", undefined, { applies: ZIM });
  b.card("FACT", "Bureaucratic theory", "Weber: rules, clear hierarchy, written records, jobs by qualification; fair and consistent but slow and impersonal.", undefined, { applies: ZIM });
  b.card("FACT", "Behavioural (human relations) theory", "Mayo and others: social needs, groups and communication matter; raises morale but can be slow.", undefined, { applies: ZIM });
});
