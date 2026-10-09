// W3a: organisational structure.
import { concept, P, sum } from "../lib.mjs";

concept("bus.people.organisational-structure", { file: "people/organisational-structure", keyPrefix: "people.organisational-structure" }, (b) => {
  // Chart used by several items (different from the lesson's chart).
  const prodSupervisors = 2, perSupervisor = 6, salesReps = 5, clerks = 2, managers = 3;
  const chart = `- General manager\n  - Production manager\n    - Supervisor 1 → ${perSupervisor} operatives\n    - Supervisor 2 → ${perSupervisor} operatives\n  - Sales manager → ${salesReps} sales representatives\n  - Finance manager → ${clerks} accounts clerks`;
  const totalStaff = sum([1, managers, prodSupervisors, prodSupervisors * perSupervisor, salesReps, clerks]);

  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by span of control?",
    options: [
      ["The number of subordinates who report directly to one manager", "Correct: this is the definition."],
      ["The number of levels of authority in a business", "That is the hierarchy (number of levels)."],
      ["The route by which orders and instructions pass down a business", "That is the chain of command."],
      ["The number of departments in a large business", "Departments are functional areas, not a span."],
    ],
    answer: "A",
    explanation: "**Span of control** is the number of people directly answerable to one manager or supervisor.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which department is mainly responsible for recruiting and training employees?",
    options: [
      ["Human resources", "Correct: recruitment, training and welfare are HR tasks."],
      ["Marketing", "Marketing deals with customers, pricing and promotion."],
      ["Finance", "Finance pays wages but does not recruit staff."],
      ["Operations (production)", "Operations produces the goods or services."],
    ],
    answer: "A",
    explanation: "The **human resources** department recruits, trains, pays and looks after the welfare of employees.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which feature describes a flat organisational structure?",
    options: [
      ["Few levels of hierarchy and wide spans of control", "Correct: flat structures have few levels and wide spans."],
      ["Many levels of hierarchy and narrow spans of control", "That describes a tall structure."],
      ["Few levels of hierarchy and narrow spans of control", "Few levels require wide spans to include everyone."],
      ["Many levels of hierarchy and wide spans of control", "Many levels go with narrow spans."],
    ],
    answer: "A",
    explanation: "A **flat** structure has few levels and wide spans; a **tall** structure has many levels and narrow spans.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the most likely advantage of a tall organisational structure?",
    options: [
      ["Close supervision of each employee", "Correct: narrow spans allow close supervision."],
      ["Fast communication from top to bottom", "Many levels slow communication down."],
      ["Lower salary costs for managers", "Tall structures need more managers, so costs are higher."],
      ["More responsibility for each worker", "Close supervision gives workers less responsibility."],
    ],
    answer: "A",
    explanation: "Narrow spans in a **tall** structure allow managers to supervise closely, and there are more promotion steps.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A manufacturer removes one level of management and keeps all its workers. What is most likely to happen to the spans of control of the remaining managers?",
    options: [
      ["They become wider", "Correct: the same workers report to fewer managers."],
      ["They become narrower", "Fewer managers cannot have fewer subordinates each."],
      ["They stay the same", "Workers from the removed level must report to someone else."],
      ["They fall to zero", "Managers still have subordinates."],
    ],
    answer: "A",
    hints: ["The same number of people now report to fewer managers."],
    explanation: "Removing a level (delayering) makes the structure flatter, so each remaining manager has a **wider** span of control.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A supermarket in Bulawayo is very busy on Saturdays and at month-end. Which type of employee is most suitable to meet this extra demand?",
    options: [
      ["Part-time cashiers", "Correct: they can work only the busy periods."],
      ["Full-time managers", "Extra managers are not needed to serve customers."],
      ["Home-based accounts clerks", "Clerks at home cannot serve shoppers."],
      ["Full-time warehouse staff", "They would be paid for quiet days too."],
    ],
    answer: "A",
    explanation: "**Part-time** staff can be rostered for busy periods only, which keeps wage costs down.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which is a disadvantage to a business of allowing employees to work from home?",
    options: [
      ["It is harder for managers to supervise their work", "Correct: managers cannot see the work being done."],
      ["The business needs larger offices for all its staff", "Home working reduces the office space needed."],
      ["Employees spend more time travelling", "Home workers save travel time."],
      ["It cannot be used with mobile phones", "Home working relies on phones and the internet."],
    ],
    answer: "A",
    hints: ["Think about what managers lose when staff are not in the building."],
    explanation: "Home working saves office space and travel time, but supervision and team communication become harder.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In a chain of command, instructions pass down and information passes up.",
    answer: true,
    explanation: "True. The chain of command carries instructions down the hierarchy and feedback up it.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A managing director with four managers below her, and 100 workers below the managers, has a span of control of 104.",
    answer: false,
    explanation: "False. Only direct subordinates count: her span of control is 4.",
  });
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", value: managers,
    stem: `The organisation chart of a paint factory in Gweru is shown as an indented list.\n\n${chart}\n\nWhat is the span of control of the general manager?`,
    wrong: [totalStaff - 1, prodSupervisors],
    explanation: `Three managers (production, sales and finance) report directly to the general manager, so the span is ${managers}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "plain", value: 4,
    stem: `Use the organisation chart of the paint factory.\n\n${chart}\n\nHow many levels of hierarchy are there?`,
    wrong: [3, 5],
    hints: ["Count general manager, managers, supervisors and operatives."],
    explanation: "General manager → production manager → supervisors → operatives: **4** levels.",
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "plain", value: totalStaff,
    stem: `Use the organisation chart of the paint factory.\n\n${chart}\n\nHow many people work at the factory in total, including the general manager?`,
    wrong: [totalStaff - 1, totalStaff - prodSupervisors],
    hints: ["Add every person on every level."],
    explanation: `1 + ${managers} + ${prodSupervisors} + ${prodSupervisors * perSupervisor} + ${salesReps} + ${clerks} = ${totalStaff}.`,
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Hierarchy", "Levels of authority in a business"],
      ["Chain of command", "Route by which instructions pass down"],
      ["Span of control", "Number of direct subordinates of a manager"],
      ["Delayering", "Removing a level of management"],
    ],
    explanation: "These four terms describe how authority is arranged in an organisation.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "A {{blank:a}} structure has many levels of hierarchy and {{blank:b}} spans of control.",
    blanks: [
      { id: "a", accepted: ["tall"], choices: ["tall", "flat"] },
      { id: "b", accepted: ["narrow"], choices: ["narrow", "wide"] },
    ],
    explanation: "Tall structures have many levels and narrow spans.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **two** problems a business may face if its structure has many levels of hierarchy.",
    points: [
      "Slow communication.",
      "Messages pass through many people and may be distorted / decisions delayed.",
      "High cost of many managers / workers feel remote from top managers.",
      "Raises costs and prices / lowers motivation.",
    ],
    hints: ["Think about messages and money."],
    modelAnswer: "Communication is slow because messages must pass through many levels, and they may be distorted on the way, delaying decisions. The business also pays many managers' salaries, raising its costs.",
    explanation: "Tall structures slow communication and raise management costs, though they give close supervision.",
  });
  b.manualShort({
    d: 4, marks: 6, skill: "EVALUATION",
    stem: "A firm of accountants in Harare is deciding whether to let its qualified staff work from home three days a week. Discuss whether it should do so.",
    points: [
      "For: saves office space and running costs.",
      "For: staff save travel time and costs, so may be more motivated / productive.",
      "For: attracts and keeps skilled staff.",
      "Against: harder to supervise and check quality of work.",
      "Against: communication and teamwork harder; client confidentiality / internet reliability.",
      "Justified conclusion, e.g. yes for qualified, trusted staff with regular office days.",
    ],
    hints: ["The staff are qualified: does that make supervision less necessary?"],
    modelAnswer: "Home working would let the firm use a smaller office and save running costs, and staff save travel time and money, so they may be more motivated and the firm keeps skilled accountants. However, managers find it harder to supervise work, teamwork suffers, and client records must be kept confidential with reliable internet at home. Because the staff are qualified and trusted, and they would still be in the office two days a week, the firm should allow it, with clear deadlines and secure systems.",
    explanation: "Weigh cost savings and motivation against supervision, communication and security.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 840, calculator: false,
    stem: `Mhofu Engineering in Kwekwe makes farm equipment. Its organisation chart is shown below as an indented list.\n\n- Managing director\n  - Production manager\n    - Assistant production manager\n      - Welding supervisor → 7 welders\n      - Assembly supervisor → 7 assemblers\n  - Marketing manager → 3 sales staff\n  - Finance manager → 2 clerks\n\nThe managing director plans to remove the post of assistant production manager.`,
    parts: [
      P.num({
        label: "(a)", marks: 1, kind: "plain", value: 5,
        stem: "How many levels of hierarchy are there at present?",
        wrong: [4],
        explanation: "Managing director → production manager → assistant → supervisors → workers = 5 levels.",
      }),
      P.num({
        label: "(b)", marks: 1, kind: "plain", value: 2,
        stem: "After the change, what will be the span of control of the production manager?",
        wrong: [1, 16],
        explanation: "The two supervisors will report directly to the production manager.",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** advantages to Mhofu Engineering of removing the assistant production manager post.",
        points: [
          "Saves the salary of the assistant.",
          "Lower costs / higher profit.",
          "Faster communication between production manager and supervisors.",
          "Decisions and problems dealt with more quickly / fewer distorted messages.",
        ],
        modelAnswer: "The business saves the assistant production manager's salary, which lowers costs. Communication is also faster because supervisors report straight to the production manager, so problems on the factory floor are dealt with more quickly.",
      }),
      P.manual({
        label: "(d)", marks: 6,
        stem: "Evaluate whether the managing director should go ahead with the change.",
        points: [
          "For: lower costs and faster communication (from (c)).",
          "For: supervisors gain responsibility / motivation.",
          "Against: production manager's workload rises; less time for planning.",
          "Against: loss of a promotion step; the assistant may be made redundant, lowering morale.",
          "Depends on: skill of supervisors / span of 2 is still narrow, so manageable.",
          "Justified decision.",
        ],
        modelAnswer: "Removing the post saves a salary and speeds up communication, and the supervisors gain responsibility, which may motivate them. The production manager will have more work, and staff lose a step on the promotion ladder; the assistant may lose his job, which could worry other workers. However, the production manager's span of control would only rise to two experienced supervisors, which is easily manageable. The managing director should go ahead, ideally moving the assistant into another role rather than making him redundant.",
      }),
    ],
    hints: ["(a) Count each level from the top to the workers.", "(d) Check whether the new span of control is manageable."],
    explanation: "Delayering lowers cost and speeds communication but increases the remaining manager's workload and removes a promotion step.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Chipo runs a chain of four fast-food outlets in Bulawayo with 40 employees. Each outlet has a manager, a deputy manager and two shift supervisors, so most counter staff have four levels above them before they reach Chipo. Staff say decisions take too long, and wage costs are rising. Most counter staff are full-time, but the outlets are only busy at lunchtime and in the evening.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Identify **two** features of the outlets' structure that show it is tall.",
        points: ["Many levels of hierarchy (four above counter staff before Chipo).", "Narrow spans of control (several managers and supervisors for few staff)."],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** benefits Chipo could gain from employing more part-time counter staff.",
        points: [
          "Staff hours matched to busy lunchtime and evening periods.",
          "So wages are not paid for quiet periods / lower wage costs.",
          "More flexibility to cover absences / extra shifts.",
          "Attracts students or parents who want short hours, widening the pool of workers.",
        ],
        modelAnswer: "Part-time staff could be rostered only for the lunchtime and evening peaks, so Chipo stops paying full-time wages during quiet hours. She would also have more people available to cover absences and could attract students who want short shifts.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Recommend whether Chipo should remove the deputy manager post from each outlet. Justify your answer.",
        points: [
          "For: four salaries saved, reducing rising wage costs.",
          "For: fewer levels, faster decisions (the staff complaint).",
          "Against: outlet managers have heavier workloads; cover needed when the manager is absent.",
          "Against: loss of promotion step / redundancy of four deputies lowers morale.",
          "Alternative: give supervisors more authority / retrain deputies as supervisors.",
          "Justified recommendation.",
        ],
        modelAnswer: "Removing the four deputy posts would save four salaries and cut a level of hierarchy, so decisions would be quicker, which answers both the staff complaint and the rising wage costs. However, each outlet manager would carry a heavier workload and there would be no one to take charge when the manager is off. Staff would lose a promotion step, and making four deputies redundant could hurt morale. I recommend removing the post but giving the shift supervisors authority to run the outlet when the manager is absent, and offering the deputies supervisor or manager vacancies where possible.",
      }),
    ],
    hints: ["(a) Count the layers above the counter staff.", "(c) Who would run an outlet when the manager is away?"],
    explanation: "A tall structure slows decisions and adds cost; delayering and part-time staff can help, but supervision and morale must be protected.",
  });
  b.card("DEFINITION", "What is **span of control**?", "The number of subordinates reporting directly to one manager or supervisor.");
  b.card("DEFINITION", "What is the **chain of command**?", "The line through which instructions pass down the hierarchy and information passes up.");
  b.card("DEFINITION", "What is a **hierarchy**?", "The levels of authority in a business, from senior managers to workers.");
  b.card("CONCEPT", "Tall structure: features?", "Many levels, narrow spans, close supervision, slow communication, more managers (cost), more promotion steps.");
  b.card("CONCEPT", "Flat structure: features?", "Few levels, wide spans, faster communication, lower cost, more responsibility for workers, less supervision.");
  b.card("FACT", "Four functional departments?", "Operations (production), marketing, finance, human resources.");
  b.card("CONCEPT", "Part-time employees: one advantage, one disadvantage?", "Can be matched to busy periods (lower cost); may be less committed and harder to communicate with.");
  b.card("CONCEPT", "Home working: one advantage, one disadvantage?", "Saves office space and travel time; harder to supervise and communicate.");
  b.card("CONCEPT", "What happens when a level of management is removed (delayering)?", "Fewer levels, wider spans of control, faster communication and lower cost, but heavier workloads and fewer promotion posts.");
});
