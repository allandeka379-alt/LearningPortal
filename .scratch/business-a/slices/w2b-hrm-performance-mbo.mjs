// W2b: hrm.performance-mbo
import { concept, P, chk, hr, operations, ZIM } from "../lib.mjs";
import { mc, pmc } from "../tables/w2b-lib.mjs";

const absenteeism = (daysLost, employees, workingDays) => (daysLost / (employees * workingDays)) * 100;

concept("abus.hrm.performance-mbo", { file: "hrm/performance-mbo", keyPrefix: "hrm.performance-mbo" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of the following is a measure of **employee performance**?",
    ok: ["Output per employee", "Correct: output shows how much each employee produces."],
    bad: [["The colour of the office walls", "This is not a measure of how well an employee works."], ["The price of the firm's shares", "Share price is not an individual employee measure."], ["The rate of inflation", "Inflation is an economic indicator."]],
    explanation: "Output, quality, absenteeism and labour turnover are measures of performance.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "In management by objectives, individual objectives are",
    ok: ["Agreed between manager and employee", "Correct: MBO depends on agreement and participation."],
    bad: [["Imposed by the manager without any discussion", "Imposed targets are not MBO."], ["Secret from the employee", "Employees must know their objectives."], ["Set once and never reviewed", "MBO involves regular review."]],
    explanation: "MBO objectives are agreed, linked to business objectives and reviewed regularly.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is a likely **consequence of poor employee performance**?",
    ok: ["Dissatisfied customers and lost sales", "Correct: poor service or products drive customers away."],
    bad: [["Lower labour turnover among skilled staff", "Poor performance is more likely to raise turnover."], ["Higher customer loyalty and repeat orders", "Poor performance reduces loyalty."], ["Lower costs of waste and rework", "Poor performance increases waste."]],
    explanation: "Poor performance leads to mistakes, waste, lost customers and lower profit.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What does the **'M' in SMART** objectives stand for?",
    ok: ["Measurable", "Correct: progress must be capable of being measured."],
    bad: [["Motivating", "Motivating is not part of the usual SMART meaning."], ["Managerial", "Managerial is not part of the usual SMART meaning."], ["Monthly", "Monthly is not part of the usual SMART meaning."]],
    explanation: "SMART objectives are specific, measurable, achievable, relevant and time-bound.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A manager at a fictional bakery in Mutare finds that errors are rising because new staff were never trained to use the new oven. Which strategy should the manager use first?",
    ok: ["Training for the new staff", "Correct: the cause is a lack of skill, so training addresses it."],
    bad: [["Disciplining all the staff", "Discipline will not fix a lack of training."], ["Raising the price of bread", "A price rise does not address the errors."], ["Reducing the number of ovens", "Removing equipment does not remove the cause."]],
    explanation: "Find the cause first; a lack of training needs training.",
    hints: ["What is the cause of the errors?"],
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional sales manager in Harare sets a target for each sales representative without discussing it with them. Which feature of MBO is missing?",
    ok: ["Agreement between manager and employee", "Correct: MBO objectives are agreed, not imposed."],
    bad: [["A link to the business objectives of the firm", "The extract does not say that this is missing."], ["Use of any numerical target", "A numerical target has been set."], ["A selling price for the product", "A selling price is not part of MBO."]],
    explanation: "Targets set without discussion are not MBO, because the employee has not taken part.",
    hints: ["Who sets the objectives in MBO?"],
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is a **limitation of management by objectives**?",
    ok: ["It may ignore aspects of work that are hard to measure", "Correct: teamwork or quality may be neglected."],
    bad: [["It removes the need for any kind of regular review of results", "MBO involves regular review."], ["It gives employees no say in their targets", "MBO involves employees in setting targets."], ["It makes objectives unrelated to the business", "MBO links individual objectives to those of the business."]],
    explanation: "MBO focuses on measurable targets and may neglect teamwork, quality and conditions that change.",
    hints: ["What happens to things that cannot be measured?"],
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional telesales firm in Gweru sets MBO targets for the number of calls made, and the number of calls rises sharply, but customer complaints also rise. What is the most likely reason?",
    ok: ["The target focused on quantity and neglected quality", "Correct: staff made more calls but spent less time on each."],
    bad: [["MBO always leads to more complaints from customers", "MBO does not always cause complaints."], ["Targets were agreed with the employees in advance", "Agreement would not itself raise complaints."], ["Staff stopped making calls once targets were set for them", "Calls rose, so staff did not stop."]],
    explanation: "A measurable target on quantity can lead to neglect of quality unless a quality target is added.",
    hints: ["What did the target measure?"],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A single measure, such as output per employee, is always enough to judge an employee's performance.",
    answer: false,
    explanation: "False. High output may hide poor quality or poor attendance, so several measures are needed.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Job evaluation compares the worth of jobs, not the performance of the people who do them.",
    answer: true,
    explanation: "True. Job evaluation is used to set pay grades for jobs; appraisal judges the person's performance.",
    hints: ["Is it the job or the person that is evaluated?"],
    applies: ZIM,
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its description.",
    pairs: [["Performance appraisal", "Formal assessment of an employee's performance"], ["Management by objectives", "Agreed individual objectives that support business objectives"], ["Labour turnover", "Employees leaving as a percentage of the workforce"], ["Absenteeism", "Days lost through unauthorised or unplanned absence"], ["Job evaluation", "Comparing the worth of jobs to set pay grades"]],
    explanation: "Each term matches one description.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "In MBO the objectives are {{blank:a}} between manager and employee, and progress is {{blank:b}} regularly.",
    blanks: [
      { id: "a", accepted: ["agreed"], choices: ["agreed", "imposed"] },
      { id: "b", accepted: ["reviewed"], choices: ["reviewed", "ignored"] },
    ],
    explanation: "MBO objectives are agreed and reviewed.",
  });


  const abs = absenteeism(22, 8, 22);
  chk(abs, 12.5);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: abs, calculator: true, daily: true, wrong: [(22 / 22) * 100, 22 / 8],
    stem: "A fictional dispatch team in Lusaka has 8 drivers. In a month of 22 working days the team loses 22 days through absence. Calculate the absenteeism rate (days lost / (employees x working days) x 100), to one decimal place.",
    hints: ["Total days available are employees x working days."],
    explanation: "Days available = 8 x 22 = 176. Absenteeism = 22 / 176 x 100 = 12.5%. Dividing by 22 only gives 100%, which ignores the number of employees.",
  });
  const prod = operations.labourProductivity(1320, 8);
  chk(prod, 165);
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", unit: "deliveries per driver", value: prod, calculator: true, wrong: [1320 / 22, 8 / 1320],
    stem: "The same team makes 1,320 deliveries in the month. Calculate the labour productivity, in deliveries per driver.",
    hints: ["Output divided by the number of employees."],
    explanation: "1,320 / 8 = 165 deliveries per driver. Dividing by 22 days gives 60 deliveries per day for the team, which is not per driver.",
  });
  const lt = hr.labourTurnover(6, hr.average(26, 34));
  chk(lt, 20);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "pct", value: lt, calculator: true, wrong: [(6 / 34) * 100, (6 / 26) * 100],
    stem: "A fictional hotel in Victoria Falls has 26 employees at the start of the year and 34 at the end. During the year 6 employees leave. Calculate labour turnover (leavers / average employees x 100) to one decimal place.",
    hints: ["Find the average number of employees first."],
    explanation: "Average employees = (26 + 34) / 2 = 30. Labour turnover = 6 / 30 x 100 = 20.0%. Using the closing figure (17.6%) or opening figure (23.1%) is a common slip.",
    workedSolution: "1. Average employees = (26 + 34) / 2 = 30.\n2. Labour turnover = 6 / 30 x 100 = 20.0%.",
  });
  const costOfLeavers = 6 * 450;
  chk(costOfLeavers, 2700);
  b.num({
    d: 3, skill: "ANALYSIS", kind: "money", value: costOfLeavers, calculator: true, wrong: [450, 30 * 450],
    stem: "It costs the hotel US\\$450 to recruit and train each replacement. What was the total cost of replacing the 6 leavers?",
    hints: ["Number of leavers x cost per replacement."],
    explanation: "6 x US\\$450 = US\\$2,700. Using one replacement (US\\$450) or all 30 average employees (US\\$13,500) is wrong.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain what is meant by management by objectives.",
    points: ["Managers and employees agree objectives for each individual", "The objectives support the objectives of the business", "Performance is reviewed against the objectives and results are discussed"],
    modelAnswer: "Management by objectives means that managers and employees agree objectives for each individual. The objectives support the objectives of the business, and performance is reviewed against them with results discussed.",
    hints: ["Mention agreement, link and review."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional printing business in Bulawayo finds that a printing operator makes many errors. Explain **two** possible causes and how the manager could find out which applies.",
    points: ["Lack of training on the machine", "Application: the manager could check training records or watch the operator", "Poor motivation or unclear targets", "Application: the manager could discuss the work with the operator in an appraisal interview"],
    modelAnswer: "One cause may be a lack of training on the machine, which the manager could find out by checking training records or watching the operator. Another may be poor motivation or unclear targets, which the manager could find out by discussing the work with the operator in an appraisal interview.",
    hints: ["Think of skills and motivation."],
    explanation: "Two causes with a way of testing each.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how management by objectives may increase employee motivation.",
    points: ["Employees take part in setting their own objectives", "They understand what is expected and how it supports the business", "Achieving objectives brings recognition and a sense of achievement", "Regular feedback helps employees to improve"],
    modelAnswer: "Employees take part in setting their own objectives, so they understand what is expected and how it supports the business. Achieving objectives brings recognition and a sense of achievement, and regular feedback helps employees to improve.",
    hints: ["Think about involvement, clarity and recognition."],
    explanation: "Involvement, clarity, recognition and feedback.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Assess whether management by objectives is suitable for a fictional small transport company in Gweru with 15 drivers.",
    points: ["Delivery and fuel results are measurable, so objectives can be set clearly", "Drivers who help set targets are more committed", "Application: an on-time target and an accident target for each driver", "Setting and reviewing 15 sets of objectives takes owner's time", "Targets on speed may lead to risky driving or ignore teamwork", "Judgement with a reason: suitable if safety and quality targets are included and review is kept simple"],
    modelAnswer: "Deliveries and fuel use are measurable, so clear objectives can be set, such as an on-time target and an accident target for each driver, and drivers who help set targets are more committed. But setting and reviewing 15 sets of objectives takes the owner's time, and targets for speed may lead to risky driving. It is suitable if safety and quality targets are included and the review is kept simple.",
    hints: ["Give a benefit, a limitation and a judgement."],
    explanation: "One point per mark; the judgement needs a reason.",
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A fictional business: Farai's Courier in Gaborone has 10 drivers. Last month each driver worked 20 days. The company recorded 2,000 deliveries, 120 of which had errors, and 40 days lost through absence. Over the year, 3 drivers left and the average number of drivers was 10.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: absenteeism(40, 10, 20), wrong: [(40 / 20) * 100, 40 / 10], stem: "Calculate the absenteeism rate for last month (days lost / (drivers x working days) x 100), to one decimal place.", explanation: "Days available = 10 x 20 = 200. 40 / 200 x 100 = 20.0%." }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: (120 / 2000) * 100, wrong: [(2000 / 120), 12], stem: "Calculate the percentage of deliveries with errors, to one decimal place.", explanation: "120 / 2,000 x 100 = 6.0%." }),
      P.num({ label: "(c)", marks: 1, kind: "pct", value: hr.labourTurnover(3, 10), wrong: [3, 70], stem: "Calculate labour turnover for the year, to one decimal place.", explanation: "3 / 10 x 100 = 30.0%." }),
      P.manual({ label: "(d)", marks: 4, stem: "Analyse **two** possible reasons for the figures above.", points: ["Poor motivation could explain high absenteeism and turnover", "Application: drivers may feel they receive no recognition or have long hours", "Lack of training or poor vehicles could explain the errors", "Application: new drivers may not know the routes or may use old vehicles"], modelAnswer: "Poor motivation could explain the high absenteeism and turnover, for example drivers may receive no recognition or work long hours. A lack of training or poor vehicles could explain the errors, for example new drivers may not know the routes or may use old vehicles.", hints: ["Link each figure to a possible cause."], explanation: "Causes linked to the figures." }),
    ],
    hints: ["Use the formula for each figure."],
    explanation: "Absenteeism 20.0%, error rate 6.0%, labour turnover 30.0%.",
  });

  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Tatenda's Poultry in Chinhoyi employs 25 workers in egg collection, packing and delivery. Output varies widely between workers, absenteeism is high and the owner cannot say who is performing well. Tatenda considers introducing MBO: each worker would agree weekly targets for eggs packed, breakages and attendance, which would be reviewed each Friday, with a bonus for those who reach all three targets.",
    parts: [
      P.manual({ label: "(a)", marks: 6, stem: "Analyse how MBO could improve performance at the poultry farm.", points: [["Clear targets show workers what is expected", 1], ["Workers who help set the targets feel more involved and committed", 1], ["Weekly reviews let the owner see problems early", 1], ["The three targets together prevent the focus on quantity alone", 1], ["The bonus rewards good performance", 1], ["Better performance reduces breakages and absence, so costs fall", 1]], modelAnswer: "Clear targets show workers what is expected, and workers who help set them feel more involved and committed. Weekly reviews let the owner see problems early. Having targets for packing, breakages and attendance together prevents the focus being on quantity alone. The bonus rewards good performance, and fewer breakages and less absence reduce costs.", hints: ["Link targets, involvement, review and reward to performance."], explanation: "Clarity, involvement, review, balance and reward." }),
      P.manual({ label: "(b)", marks: 9, stem: "Evaluate whether Tatenda should introduce MBO with a bonus for these 25 workers.", points: [["Benefits: clarity, motivation, measurable performance, basis for fair rewards", 2], ["Limitations: time to agree and review 25 sets of targets; the cost of the bonus", 2], ["Risk: workers may reach targets by cutting corners or ignoring teamwork", 2], ["Targets must be achievable and take account of causes outside workers' control, such as disease in the flock", 1], ["Alternative or addition: training and better equipment", 1], ["Judgement with a reason", 1]], levels: [[3, 7, 9, "Weighs benefits and limitations with application to the poultry farm; justified recommendation with a condition"], [2, 4, 6, "Explains benefits and limitations with some application; judgement weak"], [1, 1, 3, "Describes MBO with little application"]], modelAnswer: "MBO would give workers clear targets, motivate them through involvement and give Tatenda measurable performance, with a fair basis for rewarding the best workers. However, setting and reviewing targets for 25 workers takes time and the bonus is a cost. Workers might meet targets by cutting corners or by ignoring teamwork, and targets must allow for events outside their control, such as disease in the flock. Training and better equipment might also improve performance. On balance Tatenda should introduce MBO with simple weekly targets, and adjust them when conditions change, because at present he cannot tell who performs well and the benefits of clarity outweigh the time involved.", hints: ["Weigh clarity and motivation against the time, cost and risk of distorting behaviour."], explanation: "Compare benefits and limitations, then recommend with a condition." }),
    ],
    hints: ["Think about what Tatenda cannot do at present."],
    explanation: "Introduce MBO with simple, adjustable weekly targets.",
  });

  b.card("DEFINITION", "Employee performance", "How well an employee does the job against agreed standards of output, quality, attendance and behaviour.");
  b.card("FACT", "Measures of performance", "Output, quality, absenteeism, labour turnover, appraisal results and customer feedback; use several together.");
  b.card("FORMULA", "Absenteeism rate", "Days lost through absence / (employees x working days) x 100.");
  b.card("FORMULA", "Labour turnover", "Employees leaving in the year / average number of employees x 100.");
  b.card("FACT", "Strategies to improve performance", "Training and coaching, motivation, clear targets and feedback, job redesign, better equipment, discipline as a last resort.");
  b.card("DEFINITION", "Management by objectives (MBO)", "Managers and employees agree individual objectives that support business objectives; progress is reviewed and rewarded.");
  b.card("FACT", "MBO: benefits and limitations", "Benefits: links effort to objectives, motivates, clear basis for appraisal. Limitations: time-consuming, ignores what is hard to measure, objectives may be set wrongly or become out of date.");
  b.card("DEFINITION", "Job evaluation", "Systematic comparison of the worth of jobs (ranking, grading, points) to set pay grades.", undefined, { applies: ZIM });
  b.card("DEFINITION", "Remuneration", "All pay and benefits received for work: wages, salary, bonus, commission and benefits.", undefined, { applies: ZIM });
});
