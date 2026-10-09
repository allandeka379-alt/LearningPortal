// W3a: downsizing and redundancy (Cambridge 0264 only).
import { concept, P, table, sum } from "../lib.mjs";

concept("bus.people.workforce-reduction", { file: "people/workforce-reduction", keyPrefix: "people.workforce-reduction" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is redundancy?",
    options: [
      ["Losing a job because the job is no longer needed", "Correct: it is not the employee's fault."],
      ["Losing a job because of theft at work", "That is dismissal for misconduct."],
      ["Leaving a job to start a business", "That is resignation."],
      ["Being moved to a different department", "That is redeployment."],
    ],
    answer: "A",
    explanation: "**Redundancy** happens when a job is no longer needed.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a reason for dismissal rather than redundancy?",
    options: [
      ["Repeated poor work after written warnings", "Correct: dismissal relates to conduct or ability."],
      ["The department is closed", "That makes jobs redundant."],
      ["A machine now does the work", "Automation causes redundancy."],
      ["Demand for the product has fallen", "Falling demand causes redundancy."],
    ],
    answer: "A",
    explanation: "Dismissal is because of the employee's conduct or ability; redundancy is because the job has gone.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A bank introduces cash machines and online banking, so it needs fewer tellers. Why is it reducing its workforce?",
    options: [
      ["Automation and new technology", "Correct: machines and systems now do the work."],
      ["Poor conduct of the tellers", "No misconduct is described."],
      ["A merger with another bank", "No merger is mentioned."],
      ["A rise in demand for tellers", "Demand for tellers has fallen."],
    ],
    answer: "A",
    explanation: "Technology replacing work done by people is a common reason for downsizing.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is natural wastage?",
    options: [
      ["Reducing staff by not replacing people who leave or retire", "Correct: numbers fall without redundancies."],
      ["Throwing away damaged stock", "That is wastage of materials."],
      ["Dismissing workers who waste materials", "That would be dismissal."],
      ["Paying workers to leave the business before they retire", "That is voluntary redundancy or early retirement."],
    ],
    answer: "A",
    explanation: "**Natural wastage** lets the workforce shrink as people leave, avoiding forced redundancies.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a likely effect of redundancies on the employees who remain?",
    options: [
      ["They fear for their own jobs, so motivation may fall", "Correct: job security is threatened."],
      ["They always become more motivated", "Morale usually falls, at least at first."],
      ["Their workload falls", "Workloads often rise as fewer staff remain."],
      ["They all receive redundancy payments from the business", "Only those made redundant are paid."],
    ],
    answer: "A",
    explanation: "Remaining workers may feel insecure and overworked, so communication is important.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which method of choosing employees for redundancy is most likely to be fair?",
    options: [
      ["Scoring everyone on skills, performance and attendance", "Correct: objective criteria applied equally."],
      ["Choosing the employees the manager likes least", "Personal feelings are not fair criteria."],
      ["Choosing all employees over a certain age", "That is age discrimination."],
      ["Choosing employees who complained about pay", "That would be victimisation."],
    ],
    answer: "A",
    hints: ["Fair selection uses objective criteria applied to everyone."],
    explanation: "Fair selection uses clear, objective criteria applied equally, and never discriminates.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why might a business offer voluntary redundancy before choosing who to make redundant?",
    options: [
      ["Those who want to leave go, so morale is protected", "Correct: fewer people are forced out."],
      ["It avoids making any redundancy payments", "Voluntary redundancy usually includes payments."],
      ["It guarantees the best workers stay", "Good workers may volunteer to leave."],
      ["It increases the size of the workforce", "It reduces the workforce."],
    ],
    answer: "A",
    hints: ["How do remaining staff feel if nobody is forced to leave?"],
    explanation: "Voluntary redundancy reduces conflict and protects morale, though the business may lose skilled volunteers.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "An employee who is made redundant is usually replaced by a new employee in the same job.",
    answer: false,
    explanation: "False. The job no longer exists, so nobody is hired to do it.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Retraining workers for other jobs in the business is an alternative to redundancy.",
    answer: true,
    explanation: "True. Retraining and redeployment keep skilled, loyal workers.",
  });
  // Scoring table (different scores from the lesson).
  const staff = [
    ["Chipo", 3, 5, 2],
    ["Sipho", 4, 2, 3],
    ["Nyasha", 2, 3, 2],
    ["Tatenda", 5, 4, 4],
  ];
  const totals = staff.map(([, a, c, d]) => sum([a, c, d]));
  const scoreTable = table(["Driver", "Customer feedback", "Attendance", "Safety record", "Total"], staff.map((r, i) => [...r, totals[i]]));
  const lowest = staff[totals.indexOf(Math.min(...totals))][0];
  b.short({
    d: 3, skill: "APPLICATION",
    stem: `A courier business in Harare must make one of four delivery drivers redundant. Managers scored each driver from 1 (weak) to 5 (strong).\n\n${scoreTable}\n\nUsing the totals, which driver should be selected for redundancy?`,
    accepted: [lowest, lowest.toLowerCase()],
    wrong: ["Sipho"],
    hints: ["Find the lowest total."],
    explanation: `Totals: ${staff.map((r, i) => `${r[0]} ${totals[i]}`).join(", ")}. ${lowest} has the lowest total.`,
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each situation with the correct outcome.",
    pairs: [
      ["A shop assistant is caught stealing cash", "Dismissal"],
      ["A factory closes its paint department", "Redundancy"],
      ["An employee leaves to work for a rival", "Resignation"],
      ["A business stops replacing staff who retire", "Natural wastage"],
    ],
    explanation: "Misconduct leads to dismissal; jobs disappearing lead to redundancy.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Reducing the number of employees in a business is called {{blank:a}}. A worker whose job is no longer needed is made {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["downsizing"], choices: ["downsizing", "delegation", "recruitment"] },
      { id: "b", accepted: ["redundant"], choices: ["redundant", "dismissed", "promoted"] },
    ],
    explanation: "Downsizing reduces the workforce; redundancy is when jobs are no longer needed.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Explain **two** reasons why a business may need to reduce the size of its workforce.",
    points: [
      "Reason 1, e.g. automation / new technology.",
      "Explained: machines do the work, fewer workers needed.",
      "Reason 2, e.g. fall in demand / cost cutting / closure.",
      "Explained: less output needed / losses force lower wage costs.",
    ],
    hints: ["Think about machines and about customers."],
    modelAnswer: "A business may introduce automated machines that do work previously done by people, so fewer workers are needed. It may also face falling demand, for example from a new competitor, so it needs less output and must cut wage costs.",
    explanation: "Automation, lower demand, cost cutting, reorganisation and closure.",
  });
  b.manualShort({
    d: 4, marks: 6, skill: "EVALUATION",
    stem: "A clothing factory must cut 20 of its 120 jobs. Discuss whether it should use \"last in, first out\" (the most recently employed leave first) to decide who goes.",
    points: [
      "For: simple, objective and easy to explain.",
      "For: rewards loyalty; long-serving workers feel secure.",
      "Against: may lose young, skilled or productive workers.",
      "Against: ignores performance and future skills needed.",
      "Alternative: scoring on skills, performance, attendance; or voluntary redundancy first.",
      "Justified conclusion.",
    ],
    hints: ["Who might be lost under this method?"],
    modelAnswer: "\"Last in, first out\" is simple and objective, so workers see it as fair, and it rewards loyal long-serving staff. However, the factory may lose recently recruited workers who are highly skilled or productive, while keeping weaker ones. It ignores the skills the factory will need in future. The factory should first offer voluntary redundancy, then use a scoring system based on skills, performance and attendance, perhaps with length of service as one factor, rather than service alone.",
    explanation: "Simplicity and loyalty versus keeping the best workers.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 840,
    stem: "Kudu Dairies in Gweru has bought a machine that fills and seals milk sachets. It now needs 6 fewer packing workers out of 18. One of the packers, Farai, was also recently found sleeping on duty for the third time after two written warnings.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "If Farai loses his job because of sleeping on duty, this is:",
        options: [["Dismissal", "Correct: it is due to his conduct."], ["Redundancy", "His job is not being removed because of the machine."], ["Natural wastage", "He is not leaving voluntarily."], ["Resignation", "He is not choosing to leave."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain why the other job losses are redundancies.",
        points: ["The machine now does the work.", "The jobs are no longer needed.", "It is not the workers' fault / they are not replaced."],
        modelAnswer: "The machine now fills and seals the sachets, so six packing jobs are no longer needed. This is not the workers' fault, and the jobs will not be refilled, so these are redundancies.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Recommend how Kudu Dairies should reduce the number of packers. Justify your answer.",
        points: [
          "Offer voluntary redundancy / early retirement first.",
          "Retrain some packers to operate or maintain the machine.",
          "Use objective criteria (skills, performance, attendance) if compulsory redundancy needed.",
          "Pay fair redundancy payments; communicate clearly.",
          "Considers effect on remaining staff morale / reputation.",
          "Justified recommendation.",
        ],
        modelAnswer: "Kudu Dairies should first ask for volunteers for redundancy or early retirement, and retrain some packers to operate and maintain the new machine. If more cuts are needed, it should score the remaining packers on skills, performance and attendance, and pay fair redundancy payments. Explaining the reasons openly will protect the morale of the 12 who stay. Farai's case should be handled separately as a disciplinary matter. This approach is fair, keeps useful skills and protects the dairy's reputation.",
      }),
    ],
    hints: ["(a) Is it his fault?", "(c) Consider alternatives before forced redundancy."],
    explanation: "Dismissal is for conduct; redundancy is for jobs no longer needed. Alternatives and fair criteria protect morale.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "A fictional furniture retailer has six shops in Zimbabwe. Sales at its Masvingo shop have fallen for three years, and the shop now makes a loss. The directors are considering closing it, which would make 9 employees redundant. The shop is the retailer's only branch in the province, and two of the employees have worked there for over fifteen years.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Identify **two** reasons in the case for reducing the workforce.",
        points: ["Falling sales / demand.", "The shop makes a loss / need to cut costs / closure."],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** effects on the business of closing the shop.",
        points: [
          "Saves wages, rent and other costs.",
          "Stops the loss, raising overall profit.",
          "Redundancy payments / loss of customers in the province / remaining staff worried.",
          "Explained, e.g. one-off cost / rivals gain market / lower morale elsewhere.",
        ],
        modelAnswer: "Closing the shop saves wages and rent, ending the losses and raising the retailer's overall profit. However, it must pay redundancy payments to nine staff, and it loses its only presence in the province, so customers there may switch to rivals.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Evaluate whether the directors should close the Masvingo shop.",
        points: [
          "For: three years of falling sales and a loss; closure stops losses.",
          "For: resources can be moved to profitable shops.",
          "Against: redundancy costs; long-serving staff; reputation.",
          "Against: loses the whole province's market; rivals gain.",
          "Alternative: smaller premises / fewer staff / online sales with delivery / move staff to other shops.",
          "Justified conclusion.",
        ],
        modelAnswer: "Three years of falling sales and a current loss suggest the shop is not viable, and closing it would stop the losses and free resources for profitable shops. However, the business must pay redundancy money, would lose its only outlet in the province, and the loss of long-serving staff may harm its reputation and the morale of employees elsewhere. Before closing, the directors could move to smaller, cheaper premises with fewer staff or serve the province through online orders with delivery. If these cannot return the shop to profit within a year, closure is justified, with fair payments and transfers offered where possible.",
      }),
    ],
    hints: ["(c) Are there alternatives to full closure?"],
    explanation: "Closing a loss-making branch cuts costs but has redundancy, market and reputation costs; alternatives should be weighed.",
  });
  b.card("DEFINITION", "What is **downsizing**?", "Reducing the number of employees, usually to cut costs or because less work is needed.");
  b.card("DEFINITION", "What is **redundancy**?", "Losing a job because the job is no longer needed, through no fault of the employee.");
  b.card("CONCEPT", "Redundancy or dismissal?", "Redundancy: the job has gone, not the worker's fault, usually with a payment. Dismissal: due to conduct or ability.");
  b.card("FACT", "Reasons for reducing a workforce?", "Automation, fall in demand, cost cutting, reorganisation, closure or relocation, merger.");
  b.card("FACT", "Alternatives to compulsory redundancy?", "Natural wastage, voluntary redundancy or early retirement, part-time hours, retraining and redeployment.");
  b.card("CONCEPT", "Fair criteria for choosing who to make redundant?", "Skills, performance, attendance and discipline, length of service; applied equally, never discriminatory.");
  b.card("CONCEPT", "Effects of downsizing on remaining staff?", "Fear for job security, heavier workloads, lower morale unless well communicated.");
  b.card("DEFINITION", "What is **natural wastage**?", "Letting the workforce fall by not replacing employees who leave or retire.");
});
