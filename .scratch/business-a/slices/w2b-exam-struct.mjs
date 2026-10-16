// W2b exam-format items: ZIMSEC Paper 1 section A structured questions (10 marks), EXAM.ZIM_STRUCT10
import { concept, P, EXAM, checkExam, ZIM, money, chk, r2 } from "../lib.mjs";

const PAPER = "ZIMSEC Paper 1 section A";
const base = { examStyle: true, skill: EXAM.ZIM_STRUCT10.skill, secs: EXAM.ZIM_STRUCT10.secs };

concept("abus.motivation.scientific-human-relations", { file: "exam/w2b-struct", keyPrefix: "exam.w2b-struct" }, (b) => {
  // ------------------------------------------------------------------------------------------------------------------
  // Item 1: time and motion, piece rate, Maslow
  {
    const minutes = 5, hours = 7, days = 5, rate = 0.45;
    const perHour = 60 / minutes;
    const week = perHour * hours * days;
    const pay = r2(week * rate);
    chk(week, 420);
    chk(pay, 189);
    b.struct({
      ...base, d: 3, calculator: true, applies: ZIM, paper: PAPER,
      concepts: ["abus.motivation.scientific-human-relations", "abus.motivation.needs-maslow-herzberg"],
      stem: `Tendai Garments is a fictional shirt factory in Bulawayo. A time and motion study shows that the best method of sewing one shirt takes ${minutes} minutes. Each machinist works ${hours} hours a day for ${days} days a week and is paid a piece rate of ${money(rate)} for each shirt sewn.\n\nMachinists say that the work is boring, that they sit alone all day and that nobody thanks them for good work.`,
      parts: checkExam(EXAM.ZIM_STRUCT10, [
        P.group({
          label: "(a)", stem: "Piece rate pay",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "units", value: week, stem: "Calculate the number of shirts a machinist should sew in a week at the standard time.", wrong: [perHour * hours, perHour * days], explanation: `60 ÷ ${minutes} = ${perHour} shirts an hour; ${perHour} × ${hours} = ${perHour * hours} a day; × ${days} = ${week} a week.` }),
            P.num({ label: "(ii)", marks: 2, kind: "money", value: pay, stem: "Calculate the weekly pay of a machinist who sews exactly the standard number of shirts.", wrong: [week, r2(perHour * hours * rate)], explanation: `${week} × US\\$0.45 = US\\$${pay}.` }),
          ],
        }),
        P.group({
          label: "(b)", stem: "Theories",
          parts: [
            P.mcq({ label: "(i)", marks: 1, stem: "Time and motion study with piece rate payment is associated with which writer?", options: [["Taylor", "Correct: Taylor developed scientific management."], ["Mayo", "Mayo is linked with the human relations school."], ["Herzberg", "Herzberg developed the two-factor theory."], ["Weber", "Weber described bureaucracy."]], answer: "A", explanation: "Taylor's scientific management uses time and motion study and piece rate." }),
            P.mcq({ label: "(ii)", marks: 1, stem: "The machinists' complaint that they sit alone and nobody thanks them shows unmet needs at which levels of Maslow's hierarchy?", options: [["Social and esteem", "Correct: loneliness is a social need and lack of thanks is an esteem need."], ["Physiological and safety", "The extract does not mention basic needs or security."], ["Self-actualisation only", "Lower needs are unmet first."], ["Safety only", "Nothing in the extract concerns safety."]], answer: "A", explanation: "Working alone is a social need; lack of thanks is an esteem need." }),
          ],
        }),
        P.manual({
          label: "(c)", marks: 4, stem: "Explain **two** ways in which the factory could motivate its machinists other than by increasing the piece rate.",
          points: ["Form machinists into teams or hold short team meetings, to meet social needs", "Development: workers who belong to a group are more committed and may help each other to keep quality high", "Give recognition, such as a monthly award for quality, to meet esteem needs", "Development: workers who feel valued are more motivated and less likely to leave"],
          modelAnswer: "The factory could form machinists into small teams with short meetings, which meets social needs; workers who belong to a group are more committed and may help each other keep quality high. It could also give recognition, such as a monthly quality award, which meets esteem needs; workers who feel valued are more motivated and less likely to leave.",
          explanation: "One mark for each way and one for its development.",
        }),
      ]),
      hints: ["Shirts per hour first: 60 divided by the minutes per shirt.", "Weekly pay = shirts × rate."],
      explanation: "420 shirts a week; US\\$189; Taylor; social and esteem needs; teams and recognition.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 2: organisation chart, span of control and authority
  {
    const mgrs = 3, supPer = 2, workPer = 6;
    const sups = mgrs * supPer;
    const workers = sups * workPer;
    const total = 1 + mgrs + sups + workers;
    chk(sups, 6); chk(workers, 36); chk(total, 46);
    b.struct({
      ...base, d: 3, applies: ZIM, paper: PAPER,
      concepts: ["abus.organisation.structure-features", "abus.organisation.delegation-control"],
      stem: "Zambezi Foods is a fictional food processor in Masvingo. Its organisation chart is shown below.\n\n- Managing director\n  - Production manager\n    - Supervisor A (6 workers)\n    - Supervisor B (6 workers)\n  - Sales manager\n    - Supervisor C (6 workers)\n    - Supervisor D (6 workers)\n  - Finance manager\n    - Supervisor E (6 workers)\n    - Supervisor F (6 workers)\n\nThe managing director takes every decision above US\\$50 herself, and managers complain that they are held responsible for results but cannot decide how to achieve them.",
      parts: checkExam(EXAM.ZIM_STRUCT10, [
        P.group({
          label: "(a)", stem: "Reading the chart",
          parts: [
            P.num({ label: "(i)", marks: 1, kind: "plain", unit: "workers", value: workPer, wrong: [supPer, sups], stem: "State the span of control of Supervisor A.", explanation: "Six workers report directly to Supervisor A." }),
            P.num({ label: "(ii)", marks: 1, kind: "plain", unit: "levels", value: 4, wrong: [3, 5], stem: "State the number of levels of hierarchy from the managing director to the workers.", explanation: "Managing director, manager, supervisor, worker: four levels." }),
            P.num({ label: "(iii)", marks: 2, kind: "plain", unit: "employees", value: total, wrong: [workers, total - 1], stem: "Calculate the total number of people employed, including the managing director.", explanation: `1 managing director + ${mgrs} managers + ${sups} supervisors + ${workers} workers = ${total}.` }),
          ],
        }),
        P.fib({
          label: "(b)", marks: 2, stem: "Complete the sentence about the managers' complaint.",
          template: "The managers have {{blank:a}} for results but not enough {{blank:b}} to decide how to achieve them.",
          blanks: [
            { id: "a", accepted: ["responsibility"], choices: ["responsibility", "authority", "accountability for stock"] },
            { id: "b", accepted: ["authority"], choices: ["responsibility", "authority", "span of control"] },
          ],
          explanation: "Responsibility is the duty to achieve results; authority is the right to decide how. Authority should match responsibility.",
        }),
        P.manual({
          label: "(c)", marks: 4, stem: "Explain **two** benefits to Zambezi Foods of delegating more decisions to its managers.",
          points: ["Decisions would be made faster", "Development: managers could approve purchases without waiting for the managing director, so production is not delayed", "The managing director would have more time for planning", "Development: she could plan expansion, which is a task only she can do"],
          modelAnswer: "Decisions would be made faster, because managers could approve purchases without waiting for the managing director, so production would not be delayed. The managing director would also have more time for planning, for example to plan expansion, which is a task only she can do.",
          explanation: "One mark for each benefit and one for its development.",
        }),
      ]),
      hints: ["Count the people directly under Supervisor A.", "Total = 1 + managers + supervisors + workers."],
      explanation: "Span 6; four levels; 46 employees; responsibility without authority; benefits are speed and time for planning.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 3: performance measures and MBO
  {
    const emp = 15, days = 22, lost = 33, deliveries = 1980, faulty = 99;
    const abs = (lost / (emp * days)) * 100;
    const err = (faulty / deliveries) * 100;
    chk(abs, 10); chk(err, 5);
    b.struct({
      ...base, d: 3, calculator: true, applies: ZIM, paper: PAPER,
      concepts: ["abus.hrm.performance-mbo"],
      stem: `Mhofu Dairy is a fictional distributor in Harare with ${emp} delivery staff. Last month had ${days} working days. The staff lost ${lost} days through absence and made ${deliveries.toLocaleString("en-GB")} deliveries, of which ${faulty} were faulty (late, damaged or to the wrong customer).\n\nThe manager plans to use management by objectives (MBO): she will agree an attendance target and a faulty-delivery target with each member of staff.`,
      parts: checkExam(EXAM.ZIM_STRUCT10, [
        P.group({
          label: "(a)", stem: "Measuring performance",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "pct", value: abs, stem: "Calculate the absenteeism rate: days lost ÷ (employees × working days) × 100, to one decimal place.", wrong: [r2((lost / days) * 100), r2((lost / emp) * 100)], explanation: `Days available = ${emp} × ${days} = ${emp * days}. ${lost} ÷ ${emp * days} × 100 = ${abs.toFixed(1)}%.` }),
            P.num({ label: "(ii)", marks: 2, kind: "pct", value: err, stem: "Calculate the percentage of deliveries that were faulty, to one decimal place.", wrong: [r2((deliveries / faulty)), 99], explanation: `${faulty} ÷ ${deliveries.toLocaleString("en-GB")} × 100 = ${err.toFixed(1)}%.` }),
          ],
        }),
        P.fib({
          label: "(b)", marks: 2, stem: "Complete the sentence about MBO.",
          template: "In MBO, objectives for each employee are {{blank:a}} between manager and employee and must support the {{blank:b}} of the business.",
          blanks: [
            { id: "a", accepted: ["agreed"], choices: ["agreed", "imposed", "ignored"] },
            { id: "b", accepted: ["objectives"], choices: ["objectives", "customers", "premises"] },
          ],
          explanation: "MBO objectives are agreed and linked to the business's objectives.",
        }),
        P.manual({
          label: "(c)", marks: 4, stem: "Explain **two** ways in which MBO could help Mhofu Dairy to improve performance.",
          points: ["Staff know exactly what is expected of them, such as the attendance target", "Development: clear targets reduce absence and faulty deliveries", "Staff who help to set their targets are more committed", "Development: regular reviews let the manager reward success and find problems early"],
          modelAnswer: "Staff know exactly what is expected, such as the attendance target, and clear targets help to reduce absence and faulty deliveries. Staff who help to set their targets are more committed, and regular reviews let the manager reward success and find problems early.",
          explanation: "One mark for each way and one for its development.",
        }),
      ]),
      hints: ["Days available = employees × working days.", "Faulty deliveries as a percentage of all deliveries."],
      explanation: "Absenteeism 10.0%; faulty deliveries 5.0%; objectives agreed and linked; clarity and commitment.",
    });
  }
});
