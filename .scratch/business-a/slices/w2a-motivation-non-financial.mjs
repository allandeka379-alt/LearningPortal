// W2a: motivation.non-financial
import { concept, P, chk, r2, operations, pctChange } from "../lib.mjs";
import { mc } from "../tables/w2a-lib.mjs";

concept("abus.motivation.non-financial", { file: "motivation/non-financial", keyPrefix: "motivation.non-financial" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is **job rotation**?",
    ok: ["Moving workers between different jobs", "Correct: staff take turns at different tasks of the same level."],
    bad: [["Giving workers more authority in one job", "That describes job enrichment or empowerment."], ["Paying workers per unit produced", "That is piece rate, a financial method."], ["Cutting the number of jobs in the firm", "That describes redundancy."]],
    explanation: "Job rotation moves employees between tasks at the same level to reduce boredom and build skills.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of the following is a **method of employee participation**?",
    ok: ["A suggestion scheme", "Correct: staff are invited to put forward ideas."],
    bad: [["A piece-rate wage", "That is a financial method of payment."], ["A written warning", "That is a disciplinary step."], ["A closing-down notice", "That is a business decision, not participation."]],
    explanation: "Works councils, suggestion schemes, quality circles and worker directors involve employees in decisions.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How does **job enrichment** differ from job enlargement?",
    ok: ["It adds responsibility and control", "Correct: enrichment makes the job deeper, not just wider."],
    bad: [["It adds more tasks of the same level", "That describes job enlargement."], ["It moves workers to other departments", "That describes job rotation."], ["It reduces the hours of work", "Enrichment does not change hours."]],
    explanation: "Enlargement adds similar tasks (wider); enrichment adds responsibility and decision making (deeper).",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "What is a **quality circle**?",
    ok: ["A small group solving quality problems", "Correct: it uses workers' knowledge of the job."],
    bad: [["A trade union committee that negotiates pay", "That is collective bargaining, not a quality circle."], ["A circle of customers who test products", "That is market research."], ["A board of directors chosen by shareholders", "That is corporate governance."]],
    explanation: "A quality circle is a small group of employees from the same area who meet regularly to find and solve quality problems.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional bank clerk in Lusaka is allowed to approve small customer requests without asking a supervisor first. This is an example of",
    ok: ["Empowerment", "Correct: the clerk has been given authority to decide."],
    bad: [["Job rotation", "The clerk is not moving between jobs."], ["Piece rate", "No payment per unit is involved."], ["Redundancy", "No job has been lost."]],
    hints: ["What has the clerk been given that was previously held by the supervisor?"],
    explanation: "Giving employees authority to decide for themselves is empowerment.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional hotel in Mutare asks its housekeeping staff for ideas but never replies or acts on them. What is the most likely result?",
    ok: ["Staff lose interest and feel unvalued", "Correct: ignored suggestions suggest that managers do not care."],
    bad: [["Staff become more motivated to suggest ideas", "Without any response, staff are likely to stop."], ["The hotel's costs fall automatically", "Ignored suggestions do not reduce costs."], ["Guests start to leave at once", "There is no direct link to guests in the case."]],
    hints: ["How would you feel if your ideas were ignored?"],
    explanation: "Participation works only when managers listen and act.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional factory enriches its operators' jobs by giving them the task of planning their own schedules. Which condition is most important for success?",
    ok: ["Training and trust from managers", "Correct: operators need the skills and the freedom to plan well."],
    bad: [["A cut in wages to pay for the change", "Cutting wages would reduce motivation."], ["Fewer breaks for all operators", "Fewer breaks would reduce morale."], ["No communication with the operators", "Communication is needed for the change to work."]],
    hints: ["What do workers need before they can take more responsibility?"],
    explanation: "Enrichment fails if workers lack the skills or are not trusted to use their new responsibility.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Why might a non-financial method fail in a fictional firm that pays below the local rate?",
    ok: ["Unfair pay may cancel the effect of other methods", "Correct: pay is a hygiene factor, and dissatisfaction can outweigh the new methods."],
    bad: [["Non-financial methods are illegal when pay is low", "No such rule exists."], ["Workers prefer to work without recognition", "Most workers value recognition."], ["Job rotation always doubles output", "Rotation does not guarantee a rise in output."]],
    hints: ["Think about Herzberg's hygiene factors."],
    explanation: "Where pay is felt to be unfair, job redesign and recognition will have limited effect.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Job enlargement adds responsibility and decision making to a job.",
    answer: false,
    explanation: "False. Enlargement adds more tasks at the same level. Adding responsibility and decision making is job enrichment.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "A non-financial method of motivation always costs a business nothing.",
    answer: false,
    explanation: "False. Training, managers' time and lost output during change are costs, though they are often lower than the cost of a pay rise.",
    hints: ["Think of what training and meetings involve."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [["Job rotation", "Moving between jobs of the same level"], ["Job enlargement", "Adding more tasks at the same level"], ["Job enrichment", "Adding responsibility and control"], ["Empowerment", "Giving authority to decide without approval"], ["Works council", "Workers' and managers' representatives meeting regularly"]],
    explanation: "Each term describes a different way of changing work or involving workers.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "Job {{blank:a}} adds more responsibility to a job, while job {{blank:b}} adds more tasks of the same level.",
    blanks: [
      { id: "a", accepted: ["enrichment"], choices: ["enrichment", "enlargement", "rotation"] },
      { id: "b", accepted: ["enlargement"], choices: ["enrichment", "enlargement", "dismissal"] },
    ],
    explanation: "Enrichment is deeper (responsibility); enlargement is wider (more tasks).",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** non-financial method of motivating employees.",
    accepted: ["job rotation", "job enlargement", "job enrichment", "team working", "teamworking", "empowerment", "recognition", "training", "promotion", "praise", "good working conditions", "suggestion scheme", "participation", "quality circle", "status", "delegation", "works council"],
    explanation: "Accept any named non-financial method, such as job enrichment, team working, empowerment or recognition.",
  });

  const before = 1400 / 14, after = 1568 / 14;
  chk(before, 100); chk(after, 112);
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", unit: "crates per worker", value: operations.labourProductivity(1568, 14), calculator: true, daily: true, wrong: [1568, 1568 / 12],
    stem: "A fictional dairy near Mutare reorganises its packing section into teams. After the change, 14 workers pack 1,568 crates a week. Calculate the output per worker.",
    hints: ["Divide output by the number of workers."],
    explanation: "1,568 ÷ 14 = 112 crates per worker. Giving 1,568 is the total output.",
  });
  const pc = pctChange(before, after);
  chk(pc, 12);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "pct", value: pc, calculator: true, wrong: [r2(((after - before) / after) * 100), 12 * 14],
    stem: "Before the change, the same 14 workers packed 1,400 crates a week. Calculate the percentage increase in output per worker after the change, to one decimal place.",
    hints: ["Find the output per worker before, then the percentage change on that figure."],
    explanation: "Before: 1,400 ÷ 14 = 100. After: 1,568 ÷ 14 = 112. Increase = (112 − 100) ÷ 100 × 100 = 12.0%. Dividing by the new value gives 10.7%.",
    workedSolution: "1. Output per worker before = 1,400 ÷ 14 = 100.\n2. Output per worker after = 1,568 ÷ 14 = 112.\n3. Percentage increase = (112 − 100) ÷ 100 × 100 = 12.0%.",
  });
  const rew = r2(0.1 * 45 * 52);
  chk(rew, 234);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: rew, calculator: true, wrong: [45 * 52, 45],
    stem: "A fictional bakery in Chinhoyi runs a suggestion scheme. An employee's idea saves US\\$45 a week in wasted ingredients. The scheme rewards the employee with 10% of the saving in the first year (52 weeks). Calculate the reward.",
    hints: ["Find the first-year saving, then take 10%."],
    explanation: "First-year saving = 45 × 52 = US\\$2,340. Reward = 10% of 2,340 = US\\$234. Giving 2,340 is the whole saving.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain the difference between job enlargement and job enrichment.",
    points: ["Job enlargement adds more tasks of a similar level to a job", "Job enrichment adds more responsibility, planning and decision making", "Enlargement makes the job wider; enrichment makes it deeper and gives more control"],
    modelAnswer: "Job enlargement adds more tasks of a similar level to a job, so it makes the job wider. Job enrichment adds responsibility, planning and decision making, so it makes the job deeper and gives the worker more control.",
    hints: ["One is wider, the other deeper."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional supermarket in Masvingo has shelf-stackers who say their work is repetitive. Explain **two** non-financial ways of motivating them.",
    points: ["Job rotation between shelf stacking, the till and the stockroom", "Application: variety would reduce boredom and the stackers would learn new skills", "Recognition, such as a monthly award for the best-presented aisle", "Application: this would show that managers notice and value the stackers' work"],
    modelAnswer: "The supermarket could rotate the stackers between shelf stacking, the till and the stockroom, which would reduce boredom and teach them new skills. It could also give a monthly award for the best-presented aisle, which would show that managers notice and value their work.",
    hints: ["Link each method to repetitive work."],
    explanation: "Two methods, each applied.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional factory in Bulawayo plans to introduce quality circles. Assess whether this will motivate employees and improve results.",
    points: ["Workers know the job well, so their ideas can improve quality", "Taking part gives them a sense of involvement and achievement", "Circles take time away from production and need training", "If managers ignore recommendations, workers lose interest", "Benefits are slow and hard to measure", "Judgement with a reason: worthwhile if managers support and act on the circles' proposals"],
    modelAnswer: "Workers know the job well, so their ideas can improve quality, and taking part gives them a sense of involvement and achievement. But circles take time from production and need training, and if managers ignore their proposals workers will lose interest. The benefits are slow and hard to measure. They are worthwhile if managers support the circles and act on their proposals.",
    hints: ["Give a benefit, a cost, and a condition for success."],
    explanation: "One point per mark; the judgement needs a condition.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional business: Dube Biscuits of Gweru has a packing line with 10 workers who each do only one repetitive task. Absence is high. The manager introduces job rotation and team working. Before the change the line packed 2,000 cartons a week with 10 workers; after the change it packs 2,300 cartons a week with the same workers.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "plain", unit: "cartons per worker", value: 230, wrong: [2300, 200], stem: "Calculate the output per worker after the change.", explanation: "2,300 ÷ 10 = 230 cartons per worker." }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: 15, wrong: [13, 300], stem: "Calculate the percentage increase in output per worker, to one decimal place.", explanation: "Before: 200. After: 230. Increase = 30 ÷ 200 × 100 = 15.0%." }),
      P.manual({ label: "(c)", marks: 5, stem: "Evaluate whether the rise in output shows that job rotation and team working have succeeded.", points: ["Output per worker has risen by 15%, which is consistent with higher motivation", "Rotation reduces boredom and teams give a sense of belonging", "Other causes may explain the rise, such as a new machine or more demand", "Absence and quality should also be checked", "Judgement with a reason: likely a success, but check other measures and costs"], modelAnswer: "Output per worker has risen by 15%, which is consistent with higher motivation, since rotation reduces boredom and teams give a sense of belonging. But other causes may explain the rise, such as a new machine or higher demand, so the manager should check absence and quality as well as the cost of the training. The change is probably a success, but the evidence is not conclusive.", hints: ["Say what the figures show and what they do not show."], explanation: "Evidence weighed with its limits." }),
    ],
    hints: ["Output per worker = output ÷ number of workers."],
    explanation: "230 cartons per worker; 15% increase; likely success but other causes should be checked.",
  });

  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "A fictional business: Mhlanga Hotel in Victoria Falls has 60 staff. Managers make all decisions and rarely ask staff for ideas. Receptionists must call a supervisor for any refund, even of US\\$5. Staff turnover is high. The new manager proposes (1) allowing receptionists to give refunds up to US\\$20, (2) a staff council that meets monthly, and (3) a programme of rotating housekeeping staff through the laundry and the restaurant.",
    parts: [
      P.match({ label: "(a)", marks: 3, stem: "Match each proposal to the method of motivation it illustrates.", pairs: [["Refunds up to US\\$20 without a supervisor", "Empowerment"], ["A staff council that meets monthly", "Employee participation"], ["Rotating housekeeping staff through other jobs", "Job rotation"]], explanation: "Each proposal is an example of a non-financial method." }),
      P.manual({ label: "(b)", marks: 4, stem: "Analyse two benefits to the hotel of allowing receptionists to give refunds up to US\\$20.", points: ["Guests with a complaint are served faster, improving satisfaction", "Application: the guest is not left waiting while the receptionist finds a supervisor", "Receptionists feel trusted and have more responsibility", "Application: this could reduce the high staff turnover"], modelAnswer: "Guests with a complaint are served faster, because the receptionist does not have to find a supervisor, which improves satisfaction. Receptionists also feel trusted and have more responsibility, which could reduce the high staff turnover.", hints: ["One benefit for guests, one for staff."], explanation: "Two benefits, each applied." }),
      P.manual({ label: "(c)", marks: 7, stem: "Evaluate whether the proposals are likely to reduce staff turnover at the hotel.", points: ["Empowerment and rotation give staff variety and trust", "A council gives staff a voice, but only if managers act on its advice", "Turnover may also be caused by low pay or poor conditions, which the proposals do not address", "Refund limits could be abused without checks, so some control is needed", "The cost of training and time is small compared with the cost of replacing staff", "Judgement with a reason: likely to help, if combined with a review of pay and conditions", "Time-frame or condition for review"], levels: [[3, 5, 7, "Weighs the effects of the proposals on motivation and turnover using the case; considers other causes of turnover; a justified conclusion with a condition"], [2, 3, 4, "Explains the effects of some proposals with some use of the case; judgement weakly supported"], [1, 1, 2, "Describes the proposals with little evaluation"]], modelAnswer: "Empowerment and rotation give receptionists and housekeepers variety and trust, and a staff council gives all staff a voice, although only if managers act on its advice. These changes are cheap compared with the cost of replacing staff. But turnover may also be caused by low pay or poor conditions, which the proposals do not address, and the refund limit could be abused without some checks. The proposals are likely to help, if they are combined with a review of pay and conditions, and the manager should compare turnover after one year.", hints: ["Consider what else could cause turnover."], explanation: "Weighs the proposals against other causes and recommends a condition." }),
    ],
    hints: ["Match each proposal to the method of motivation it illustrates."],
    explanation: "Empowerment, participation and rotation; they may help but pay and conditions also matter.",
  });

  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: "A fictional business: Gumbo Engineering of Bulawayo employs 80 workers. A suggestion scheme and quality circles have produced 24 ideas in a year, of which 6 were adopted, saving US\\$14,400 in the year. Costs of the scheme were US\\$5,000 for training and US\\$4,200 of workers' time. Workers say that management is slow to reply, and 10 workers have stopped suggesting ideas. A manager proposes replacing the scheme with a bonus of US\\$100 for every worker if the factory meets its targets.",
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: 14400 - 5000 - 4200, type: "CALCULATION", wrong: [14400, 9200], stem: "Calculate the net financial benefit of the scheme in the year.", explanation: "Costs = 5,000 + 4,200 = 9,200. Net benefit = 14,400 − 9,200 = US\\$5,200.", workedSolution: "1. Total costs = 5,000 + 4,200 = US\\$9,200.\n2. Net benefit = 14,400 − 9,200 = US\\$5,200." }),
      P.manual({ label: "(b)", marks: 4, stem: "Analyse why some workers have stopped suggesting ideas.", points: ["Management is slow to reply, so workers feel ignored", "Application: only 6 of 24 ideas were adopted, and workers may not be told why", "Workers may see no reward or recognition", "Application: the loss of 10 contributors reduces the flow of ideas in future"], modelAnswer: "Management is slow to reply, so workers feel ignored, and only 6 of 24 ideas were adopted, so those who were rejected may not know why. Workers may also see no reward or recognition, and as a result 10 have stopped, which reduces the flow of ideas.", hints: ["Look at the speed of replies and the adoption rate."], explanation: "Slow response and lack of feedback demotivate." }),
      P.manual({ label: "(c)", marks: 8, stem: "Evaluate whether the factory should replace the scheme with the bonus.", points: [["The scheme saved US\\$5,200 net, which is a clear return", 2], ["The bonus would cost 80 × US\\$100 = US\\$8,000 if all targets were met", 2], ["A bonus is a financial method, which may motivate effort but does not use workers' ideas", 1], ["The scheme's problem is slow replies, which can be fixed at low cost", 1], ["Both could work together: improve the response to ideas and add a smaller reward", 1], ["Judgement with a reason and time-frame", 1]], levels: [[3, 6, 8, "Uses the figures for the scheme and the bonus; identifies the cause of the problem and weighs the alternatives; a justified recommendation with a time-frame"], [2, 3, 5, "Explains both options with some use of the figures; judgement weakly supported"], [1, 1, 2, "Describes the scheme and the bonus with little comparison"]], modelAnswer: "The scheme returned a net benefit of US\\$5,200 in the year, whereas a bonus of US\\$100 for all 80 workers would cost US\\$8,000 if all targets were met. A bonus may motivate effort, but it does not use workers' ideas, which are the scheme's real value. The scheme's problem is slow replies, which can be fixed at low cost by naming a manager to respond to every idea within two weeks. The factory should keep the scheme, fix the response time, and consider a smaller reward for adopted ideas, then review the number of suggestions after six months.", hints: ["Compare US\\$5,200 with US\\$8,000, and identify the real problem."], explanation: "Compares the net benefit with the cost of the bonus and recommends fixing the cause." }),
    ],
    hints: ["Net benefit = savings − costs."],
    explanation: "Net benefit US\\$5,200; the bonus would cost up to US\\$8,000; fix the scheme's slow response.",
  });

  b.card("DEFINITION", "Job rotation", "Moving employees between different jobs at the same level to reduce boredom and build skills.");
  b.card("DEFINITION", "Job enlargement", "Adding more tasks of a similar level to a job: a wider job.");
  b.card("DEFINITION", "Job enrichment", "Adding responsibility, planning and decision making to a job: a deeper job.");
  b.card("DEFINITION", "Empowerment", "Giving employees authority and resources to make decisions about their own work.");
  b.card("DEFINITION", "Quality circle", "A small group of employees from the same area who meet regularly to find and solve quality problems.");
  b.card("FACT", "Forms of participation", "Works councils or workers' committees, suggestion schemes, quality circles and worker directors.");
  b.card("CONCEPT", "When participation fails", "If managers do not listen or act on suggestions, workers lose interest and motivation falls.");
  b.card("FACT", "Other non-financial motivators", "Team working, recognition, status, good working conditions, training and promotion.");
  b.card("CONCEPT", "Pay and non-financial methods", "Unfair pay can cancel the effect of job redesign and recognition (Herzberg: pay is a hygiene factor).");
});
