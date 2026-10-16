// W2b: organisation.structure-features
import { concept, P, chk } from "../lib.mjs";
import { mc, pmc } from "../tables/w2b-lib.mjs";

concept("abus.organisation.structure-features", { file: "organisation/structure-features", keyPrefix: "organisation.structure-features" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is meant by the **span of control** of a manager?",
    ok: ["The number of subordinates who report directly to the manager", "Correct: it counts the people directly under the manager."],
    bad: [["The number of levels between the manager and the owner of the firm", "This relates to the levels of hierarchy."], ["The total number of employees in the business", "Span of control counts only direct reports."], ["The length of time a manager has held a post", "Span of control is not about time in a job."]],
    explanation: "Span of control is the number of subordinates reporting directly to one manager.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "The line of authority from the top of a business to the lowest level is called the",
    ok: ["Chain of command", "Correct: orders pass down it and reports pass up it."],
    bad: [["Span of control", "Span of control counts the people reporting to a manager."], ["Organisational chart", "The chart is the diagram that shows the chain."], ["Delegation process", "Delegation is passing authority to a subordinate."]],
    explanation: "The chain of command is the line of authority and reporting from top to bottom.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A **flat** organisational structure normally has",
    ok: ["Few levels of hierarchy and wide spans of control", "Correct: fewer layers and more people under each manager."],
    bad: [["Many levels of hierarchy and narrow spans of control", "That describes a tall structure."], ["No managers at all", "A flat structure still has managers."], ["Only one employee under each manager", "A flat structure has wide spans, not one employee per manager."]],
    explanation: "Flat structures have few levels and wide spans; tall structures have many levels and narrow spans.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What does **unity of command** mean?",
    ok: ["Each employee has one direct boss", "Correct: it avoids conflicting orders."],
    bad: [["All employees have the same pay", "Unity of command is not about pay."], ["Every decision is taken by the owner", "Unity of command does not require the owner to decide everything."], ["Managers share every task with staff", "It is about reporting lines, not sharing tasks."]],
    explanation: "Unity of command means each employee takes orders from one superior only.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional bakery in Gweru has an owner, two managers and 12 bakers, six reporting to each manager. What is the span of control of each manager?",
    ok: ["6", "Correct: each manager has six bakers reporting directly."],
    bad: [["2", "Two is the owner's span of control (two managers)."], ["12", "Twelve is the total number of bakers, not the number under each manager."], ["14", "Fourteen is all the employees below the owner."]],
    explanation: "Each manager has six direct subordinates, so the span of control is 6. The owner's span is 2.",
    hints: ["Count the people directly under one manager."],
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is an advantage of a **wide span of control**?",
    ok: ["Fewer managers are needed, which lowers costs", "Correct: a manager looks after more staff."],
    bad: [["Each worker is supervised more closely", "Close supervision is an advantage of narrow spans."], ["The chain of command becomes longer and more complex", "A wide span usually shortens the chain of command."], ["Communication always becomes quicker", "A wide span can slow communication with each person."]],
    explanation: "A wide span saves the cost of managers and shortens the hierarchy, but gives less close supervision.",
    hints: ["Think about how many managers the business needs."],
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is it a problem if a manager has responsibility but not enough authority?",
    ok: ["The manager is answerable for results but cannot decide how to achieve them", "Correct: responsibility without authority leaves the manager unable to act."],
    bad: [["The manager will earn too much pay for the work done", "Authority and pay are different matters."], ["The business will have too many levels of hierarchy for the size of the firm", "This is not a consequence of lacking authority."], ["The manager cannot be held to account for any result achieved", "The manager is still accountable, which is the problem."]],
    explanation: "Authority must match responsibility, otherwise the manager is blamed for results over which there is no control.",
    hints: ["Authority is the right to decide."],
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A growing fictional company in Harare adds a new layer of managers between the directors and the supervisors. What is the most likely effect on communication?",
    ok: ["Messages take longer to pass between directors and supervisors", "Correct: more layers lengthen the chain of command."],
    bad: [["Messages travel more quickly between directors and supervisors", "Extra layers add steps and slow messages."], ["Messages no longer need to be written down", "The number of layers does not change the need to record messages."], ["Directors communicate directly with all workers", "An added layer moves directors further from workers."]],
    explanation: "A longer chain of command means more steps for a message, so communication slows and may be distorted.",
    hints: ["Count the steps for a message."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A manager who delegates a task also passes on full accountability for the result to the subordinate.",
    answer: false,
    explanation: "False. A manager can delegate the task and the authority to do it, but remains accountable for the result.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "In a business with a fixed number of employees, narrowing the span of control normally increases the number of levels of hierarchy.",
    answer: true,
    explanation: "True. If each manager has fewer subordinates, more managers are needed and the structure gets more layers.",
    hints: ["Think about how many managers are needed."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [["Span of control", "Number of subordinates reporting to a manager"], ["Chain of command", "Line of authority from top to bottom"], ["Authority", "Right to give orders and make decisions"], ["Responsibility", "Duty to carry out tasks and answer for results"], ["Levels of hierarchy", "Layers of authority from top to bottom"]],
    explanation: "Each term matches one meaning.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "A structure with many levels and narrow spans is called {{blank:a}}, while one with few levels and wide spans is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["tall"], choices: ["tall", "flat", "matrix"] },
      { id: "b", accepted: ["flat"], choices: ["tall", "flat", "matrix"] },
    ],
    explanation: "Tall structures have many levels and narrow spans; flat structures have few levels and wide spans.",
  });

  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the diagram that shows the levels of hierarchy and lines of authority in a business.",
    accepted: ["organisational chart", "organisation chart", "organizational chart", "org chart", "organogram"],
    explanation: "An organisational chart shows jobs, levels and reporting lines.",
  });

  const workers = 120;
  const span = 8;
  const supervisors = workers / span;
  const managers = supervisors / 5;
  chk(supervisors, 15); chk(managers, 3);
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", unit: "supervisors", value: supervisors, calculator: true, daily: true, wrong: [workers * span, span],
    stem: "A fictional factory in Mutare employs 120 production workers. Each supervisor has a span of control of 8 workers. How many supervisors are needed?",
    hints: ["Divide the number of workers by the span."],
    explanation: "120 / 8 = 15 supervisors. Multiplying 120 by 8 or giving the span (8) are common errors.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", kind: "plain", unit: "managers", value: managers, calculator: true, wrong: [supervisors, managers * 5],
    stem: "In the same factory, each manager supervises 5 supervisors. How many managers are needed for the 15 supervisors?",
    hints: ["Divide the number of supervisors by the manager's span."],
    explanation: "15 / 5 = 3 managers. If the 3 managers report to one director, the factory has four levels of hierarchy: director, managers, supervisors and workers.",
    workedSolution: "1. Supervisors = 120 / 8 = 15.\n2. Managers = 15 / 5 = 3.\n3. Levels = director, managers, supervisors, workers = 4.",
  });
  const widerSupervisors = workers / 12;
  chk(widerSupervisors, 10);
  b.num({
    d: 3, skill: "ANALYSIS", kind: "plain", unit: "supervisors", value: supervisors - widerSupervisors, calculator: true, wrong: [widerSupervisors, supervisors],
    stem: "The factory owner widens each supervisor's span of control from 8 to 12 workers. How many fewer supervisors are needed for the 120 workers?",
    hints: ["Find the number of supervisors at each span, then subtract."],
    explanation: "At a span of 8: 120 / 8 = 15 supervisors. At a span of 12: 120 / 12 = 10 supervisors. The difference is 15 - 10 = 5 fewer supervisors. Giving 10 is the new number, not the saving.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain what is meant by an organisational structure.",
    points: ["The formal arrangement of jobs and authority in a business", "Shows who reports to whom", "Shows how work is divided and coordinated"],
    modelAnswer: "An organisational structure is the formal arrangement of jobs and authority in a business. It shows who reports to whom and how work is divided and coordinated.",
    hints: ["Mention jobs, authority and reporting."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional bakery in Harare has grown from 5 to 40 employees and has no organisational chart. Explain **two** problems that may arise.",
    points: ["Staff may not know who their boss is", "Application: bakers may receive conflicting instructions from several people", "Authority to make decisions is unclear", "Application: nobody knows who may order flour, so orders are delayed"],
    modelAnswer: "Staff may not know who their boss is, so bakers may receive conflicting instructions from several people. Authority is also unclear, so nobody knows who may order flour and orders are delayed.",
    hints: ["Think about reporting lines and decisions."],
    explanation: "Two problems, each applied to the bakery.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why a tall organisational structure may slow decision making.",
    points: ["There are many levels in the chain of command", "A proposal has to pass through each level for approval", "Each step takes time, so decisions are delayed", "Messages may be changed on the way, causing misunderstanding"],
    modelAnswer: "In a tall structure there are many levels in the chain of command, and a proposal has to pass through each one for approval. Each step takes time, so decisions are delayed, and messages may be changed on the way, causing misunderstanding.",
    hints: ["Count the steps a decision must pass through."],
    explanation: "More levels mean more steps and more delay.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Assess whether a fictional growing hardware chain in Bulawayo should move to a flatter structure.",
    points: ["Fewer levels speed communication and decisions", "Application: branch managers could decide on local prices more quickly", "Wider spans reduce the number of managers and so salary costs", "Managers with wide spans may be overloaded and give less supervision", "Branch staff may need training to take on more decisions", "Judgement with a reason: flatter, provided managers are trained and spans stay manageable"],
    modelAnswer: "A flatter structure speeds communication and decisions, for example branch managers could decide on local prices more quickly, and wider spans cut the number of managers and their salary costs. But managers with wider spans may be overloaded and supervise less closely, and staff may need training to take on more decisions. The chain should become flatter, provided managers are trained and spans remain manageable.",
    hints: ["Give a benefit, a risk and a judgement."],
    explanation: "One point per mark; the judgement needs a reason.",
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A fictional business: Tatenda's Fresh Foods in Masvingo has the following organisation chart.\n\n- Managing director\n  - Operations manager\n    - Supervisor A (8 workers)\n    - Supervisor B (8 workers)\n    - Supervisor C (8 workers)\n  - Marketing manager\n    - Sales team leader (6 sales staff)\n  - Finance manager\n    - Accounts clerk (no staff)",
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "plain", unit: "managers", value: 3, wrong: [1, 5], stem: "How many managers report directly to the managing director?", explanation: "The operations, marketing and finance managers report directly: span of control 3." }),
      P.num({ label: "(b)", marks: 1, kind: "plain", unit: "workers", value: 24, wrong: [8, 3], stem: "How many production workers report to the supervisors (A, B and C together)?", explanation: "3 supervisors x 8 workers = 24 workers. A single supervisor has 8." }),
      P.num({ label: "(c)", marks: 1, kind: "plain", unit: "levels", value: 4, wrong: [3, 5], stem: "How many levels of hierarchy are there in the operations branch, from the managing director to the workers?", explanation: "Managing director, operations manager, supervisor, worker: 4 levels." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain **one** advantage and **one** disadvantage of the span of control of 8 for each supervisor.", points: ["Advantage: fewer supervisors are needed, so labour costs are lower", "Disadvantage: supervisors may find it difficult to give close help to each of 8 workers", "Application to the case: with 24 workers, three supervisors rather than six"], modelAnswer: "A span of 8 means fewer supervisors are needed, which lowers labour cost: three supervisors for 24 workers rather than six. But a supervisor may find it difficult to give close help to each of 8 workers.", hints: ["Think about cost and supervision."], explanation: "Cost against closeness of supervision." }),
    ],
    hints: ["Count carefully from the chart."],
    explanation: "Span of 3 for the MD, 24 production workers, 4 levels.",
  });

  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Chipo's Courier Services in Lusaka has 90 employees and a tall structure with six levels. Branch managers must send every decision above US\\$200 to the head office. Customers complain that quotations take days, and two of the best branch managers have resigned, saying that they have responsibility for results but no authority to decide.",
    parts: [
      P.manual({ label: "(a)", marks: 6, stem: "Analyse how the structure may be causing the problems that Chipo faces.", points: [["Many levels lengthen the chain of command, so decisions take days", 2], ["Branch managers lack authority to match their responsibility", 2], ["Customers wait, which may lead to lost business", 1], ["Managers resign, which raises recruitment cost and loses experience", 1]], modelAnswer: "Six levels lengthen the chain of command, so quotations take days. Branch managers have responsibility for results but no authority to decide, so they become frustrated. Customers wait and may go elsewhere, and when managers resign the business loses experience and pays to recruit replacements.", hints: ["Link the number of levels and the lack of authority to the symptoms."], explanation: "Long chain of command and authority below responsibility." }),
      P.manual({ label: "(b)", marks: 9, stem: "Evaluate whether Chipo should flatten the structure and give branch managers more authority.", points: [["Flatter: fewer levels, faster decisions, lower management cost", 2], ["More authority: managers can quote quickly and feel more motivated; fewer resignations", 2], ["Risk: wider spans or limits may weaken control and increase poor decisions", 2], ["Risk: managers may need training, and the head office may lose oversight", 1], ["Possible compromise: raise the limit and require reporting", 1], ["Judgement with a reason", 1]], levels: [[3, 7, 9, "Weighs benefits and risks of flattening and extra authority with application to the courier firm; justified recommendation with a condition"], [2, 4, 6, "Explains advantages and risks with some application; judgement weak"], [1, 1, 3, "Describes structures with little application"]], modelAnswer: "A flatter structure would remove layers, speed up decisions and lower management cost. More authority for branch managers would let them quote quickly and would make the role more motivating, so fewer would resign. The risks are that wider spans and higher spending limits weaken control and may lead to poor decisions, and managers may need training. A compromise is to raise the limit for decisions and require branch managers to report regularly. On balance Chipo should flatten the structure and raise the limit, because the present delays are costing customers and good managers, and regular reporting keeps control.", hints: ["Weigh speed and motivation against control."], explanation: "Compare the benefits and risks, then recommend with a condition." }),
    ],
    hints: ["Think about the link between authority, responsibility and the chain of command."],
    explanation: "Flatten and delegate within limits.",
  });

  b.card("DEFINITION", "Organisational structure", "The formal arrangement of jobs, authority and reporting relationships showing how work is divided and coordinated.");
  b.card("DEFINITION", "Organisational chart", "A diagram showing levels of hierarchy, jobs and lines of authority and communication.");
  b.card("DEFINITION", "Span of control", "The number of subordinates who report directly to one manager.");
  b.card("DEFINITION", "Chain of command", "The line of authority along which orders pass down and reports pass up.");
  b.card("DEFINITION", "Levels of hierarchy", "The layers of authority from the most senior to the lowest level.");
  b.card("CONCEPT", "Span and levels", "Wide spans mean fewer levels (flat structure); narrow spans mean more levels (tall structure).");
  b.card("CONCEPT", "Authority and responsibility", "Authority is the right to decide; responsibility is the duty to complete tasks and answer for results. Authority must match responsibility.");
  b.card("FACT", "Unity of command", "Each employee has one direct boss, which avoids conflicting instructions.");
  b.card("FACT", "Why a business needs a structure", "Meets needs and objectives, avoids confusion, allows growth, gives flexibility, supports intrapreneurship and makes accountability clear.");
});
