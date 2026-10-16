// W2a: hrm.training-development
import { concept, P, chk, r2 } from "../lib.mjs";
import { mc } from "../tables/w2a-lib.mjs";

concept("abus.hrm.training-development", { file: "hrm/training-development", keyPrefix: "hrm.training-development" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is **induction**?",
    ok: ["Introducing a new employee to the workplace", "Correct: it covers the workplace, rules, safety and the job."],
    bad: [["Training an experienced employee for promotion", "That is development for a future role."], ["Dismissing an employee who breaks the rules", "That is dismissal, not induction."], ["Calculating the wages that employees are owed", "That is payroll work."]],
    explanation: "Induction introduces new employees to the organisation, its rules, safety procedures and the job.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which type of training takes place **at the workplace while the employee works**?",
    ok: ["On-the-job training", "Correct: the employee learns in the real working situation."],
    bad: [["Off-the-job training", "Off-the-job training takes place away from the workplace."], ["Induction only", "Induction is one stage and does not describe all workplace learning."], ["Distance learning only", "Distance learning is done away from the job."]],
    explanation: "On-the-job training is learning at the place of work while doing the job.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an **advantage of on-the-job training** for a small business?",
    ok: ["It is usually cheaper for the firm", "Correct: there are no fees or travel, and the trainee still produces something."],
    bad: [["It always gives recognised qualifications", "Off-the-job courses are more likely to give qualifications."], ["It uses none of the employer's time", "An experienced worker's time is used."], ["It cannot lead to any mistakes", "Trainees may make mistakes while learning."]],
    explanation: "On-the-job training is relevant and cheap, but uses a trainer's time and may pass on bad habits.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "How does **development** differ from training?",
    ok: ["It prepares staff for future roles", "Correct: development is longer-term and broader than training for the present job."],
    bad: [["It is shorter and covers one task only", "That describes a narrow training session."], ["It is given only to new employees", "Development is for staff at any stage."], ["It is always done off the job", "Development can be done in many ways, including on the job."]],
    explanation: "Training is for the present job; development is the longer-term growth of an employee for future roles.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional hotel in Bulawayo trains its waiters to work as receptionists too, so that they can cover absences. This is an example of",
    ok: ["Multi-skilling of staff", "Correct: staff can be moved between different jobs as needed."],
    bad: [["Induction training", "Induction is for new employees, and these waiters are already working."], ["Redundancy planning for staff", "No one is losing a job."], ["Poaching of staff", "Poaching is when a rival hires trained staff."]],
    hints: ["Which term describes staff who can do several jobs?"],
    explanation: "Multi-skilling gives flexibility because trained staff can move between tasks.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What is **poaching** in the context of training?",
    ok: ["A rival firm hiring its trained staff", "Correct: the business bears the training cost and a rival gains."],
    bad: [["A trainee arriving late for lessons", "That is a discipline matter."], ["Dismissing a trainee after a course", "That is dismissal."], ["A trainer leaving to start a business", "That describes a trainer's career move."]],
    hints: ["Who benefits when a trained employee moves?"],
    explanation: "Poaching is a risk of training: employers may be reluctant to train if rivals can hire the trained staff.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional bus company in Mutare finds that drivers trained in fuel-saving techniques are leaving for a rival. What is the best analysis of the problem?",
    ok: ["The company paid for skills that a rival uses", "Correct: the training cost was borne by the company, but the benefit passed to the rival."],
    bad: [["Training reduces drivers' skills over time", "Training builds skills."], ["Rivals cannot use trained drivers", "Trained drivers are valuable to any bus company."], ["Training always increases staff loyalty", "Training can raise loyalty, but not in every case."]],
    hints: ["Who paid for the training, and who now benefits?"],
    explanation: "The company bears the cost and the risk of poaching unless it rewards the new skills or links training to a period of service.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional factory plans an off-the-job course costing US\\$4,000 for 10 workers. Which fact would be most useful to the decision?",
    ok: ["The expected gain in output per trained worker", "Correct: the benefit must be compared with the cost."],
    bad: [["The colour of the course brochure", "The brochure has no bearing on the benefit."], ["The year the training centre was built", "The age of the building does not show the value of the course."], ["The number of letters in the course title", "The title has no bearing on the benefit."]],
    hints: ["Which figure lets you compare benefit with cost?"],
    explanation: "A decision on training needs an estimate of the gain, such as higher output or fewer errors, to set against the cost.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Off-the-job training is normally cheaper than on-the-job training because no trainer is needed.",
    answer: false,
    explanation: "False. Off-the-job training usually costs more because of fees, travel and the output lost while the trainee is away.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Training may improve motivation because employees feel valued and see opportunities for advancement.",
    answer: true,
    explanation: "True. Training and development signal that the business invests in its staff, which can raise motivation and retention.",
    hints: ["Think of the motivators in Herzberg's theory."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [["Induction", "Introducing a new employee to the business"], ["Multi-skilling", "Training staff to do several different jobs"], ["Intrapreneurship", "Entrepreneurial behaviour by employees inside a business"], ["Development", "Longer-term growth of abilities for future roles"]],
    explanation: "Each term describes a different aspect of preparing staff.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "Training is for an employee's {{blank:a}} job, while {{blank:b}} prepares the employee for future roles.",
    blanks: [
      { id: "a", accepted: ["present"], choices: ["present", "future", "previous"] },
      { id: "b", accepted: ["development"], choices: ["induction", "development", "dismissal"] },
    ],
    explanation: "Training is narrow and short-term; development is broad and long-term.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** disadvantage of off-the-job training.",
    accepted: ["expensive", "costly", "cost", "high cost", "fees", "output is lost", "lost output", "time away from work", "travel costs", "may not be relevant to the job", "skills may not match the job", "less relevant", "trainee away from the job"],
    explanation: "Accept cost (fees and travel), lost output while the trainee is away, or the training not matching the job.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the term for training employees to do several different jobs so that they can be moved between tasks.",
    accepted: ["multi-skilling", "multiskilling", "multi skilling", "multi-skilled", "multiskilled"],
    explanation: "Multi-skilling gives the business flexibility.",
  });

  const n = 5, onPer = 45 + 70, offPer = 180 + 100;
  const onTot = n * onPer, offTot = n * offPer;
  chk(onTot, 575); chk(offTot, 1400);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: offTot, calculator: true, daily: true, wrong: [offPer, onTot],
    stem: "A fictional printing works in Gweru trains 5 workers off the job. Each worker's training costs a fee of US\\$180 plus US\\$100 of lost output. Calculate the total cost of training the 5 workers.",
    hints: ["Find the cost per worker first."],
    explanation: "Cost per worker = 180 + 100 = 280. Total = 5 × 280 = US\\$1,400. Giving 280 is the cost of one worker.",
  });
  const gain = 60 * n;
  const pbOn = onTot / gain;
  chk(gain, 300);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "months", dp: 1, value: pbOn, calculator: true, wrong: [onTot / 60, offTot / gain],
    stem: "The works could instead train the 5 workers on the job. Each worker would cost US\\$45 of the supervisor's time and US\\$70 of lost output. The works expects each trained worker to add US\\$60 a month to its profit. How many months will it take for the gain to repay the cost of the on-the-job training? Give your answer to one decimal place.",
    hints: ["Find the total cost of the training and the monthly gain from all five."],
    explanation: "Cost per worker = 45 + 70 = 115; total = 5 × 115 = 575. Monthly gain = 5 × 60 = 300. Payback = 575 ÷ 300 = 1.9 months. Dividing by one worker's gain gives 9.6 months, and using the off-the-job cost (1,400 ÷ 300) gives 4.7.",
    workedSolution: "1. Cost per worker = 45 + 70 = US\\$115; total = 5 × 115 = US\\$575.\n2. Monthly gain = 5 × 60 = US\\$300.\n3. Payback = 575 ÷ 300 = 1.9 months.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain the difference between training and development.",
    points: ["Training teaches the skills needed for the employee's present job", "Development is broader and longer-term, preparing the employee for future roles", "Training can be completed; development continues through a career"],
    modelAnswer: "Training teaches the skills needed for the employee's present job. Development is broader and longer-term and prepares the employee for future roles. Training can be completed, but development continues through a career.",
    hints: ["Compare the time span and the purpose."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional supermarket in Masvingo trains its cashiers to also stack shelves. Explain **two** benefits to the supermarket of having multi-skilled staff.",
    points: ["Staff can cover for absent colleagues", "Application: a cashier can work on shelves when the till queue is short", "The supermarket may need fewer temporary or part-time workers", "Application: this saves wage costs in quiet periods"],
    modelAnswer: "Multi-skilled staff can cover for absent colleagues, and a cashier can work on the shelves when the till queue is short. The supermarket may therefore need fewer temporary or part-time workers, which saves wage costs in quiet periods.",
    hints: ["Link flexibility to the supermarket."],
    explanation: "Two benefits, each applied.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional hotel in Victoria Falls spends US\\$6,000 a year on training its staff. The owner worries that trained staff will be hired by rival hotels. Assess whether the hotel should continue to train its staff.",
    points: ["Trained staff give better service, so guests and bookings increase", "Training raises motivation and may reduce staff turnover", "There is a risk of poaching, so the money may benefit rivals", "The hotel can reduce the risk by rewarding new skills with promotion or better pay", "Training costs a fixed sum while the benefit may be difficult to measure", "Judgement with a reason: continue, because service quality is the hotel's main asset, but link training to rewards"],
    modelAnswer: "Trained staff give better service, which helps bookings, and training can raise motivation and reduce turnover. There is a risk that rivals will hire the trained staff, so the money may benefit them, and the benefit of training is hard to measure. The hotel can reduce the risk by rewarding new skills with promotion or better pay. It should continue to train, because service is its main asset, but link the training to rewards.",
    hints: ["Give a benefit, the risk, a way to manage the risk, and a judgement."],
    explanation: "One point per mark; the judgement needs a reason.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional business: Hove Furniture of Chinhoyi has bought a computer-controlled saw. It will train 4 carpenters. On-the-job training by the supplier would cost, per carpenter, US\\$80 of the supplier's time charged to the firm and US\\$110 of lost output. Off-the-job training at a college would cost, per carpenter, a fee of US\\$320 and US\\$150 of lost output.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: 4 * (80 + 110), wrong: [190, 80 + 110 + 320], stem: "Calculate the total cost of on-the-job training for the 4 carpenters.", explanation: "Cost per carpenter = 80 + 110 = 190. Total = 4 × 190 = US\\$760." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: 4 * (320 + 150) - 4 * (80 + 110), wrong: [1880, 760], stem: "Calculate by how much the off-the-job training would cost more than the on-the-job training.", explanation: "Off-the-job cost per carpenter = 320 + 150 = 470; total = 1,880. Difference = 1,880 − 760 = US\\$1,120." }),
      P.manual({ label: "(c)", marks: 5, stem: "Evaluate which method of training Hove Furniture should choose.", points: ["On-the-job costs US\\$1,120 less", "It is directly relevant, since the supplier trains on the firm's own saw", "Off-the-job training may give wider knowledge or recognised qualifications", "The college may not teach the particular machine, so the skills may not match", "Judgement with a reason: on-the-job, unless the college course is the only way to get qualifications the carpenters need"], modelAnswer: "On-the-job training costs US\\$1,120 less and is directly relevant, since the supplier trains the carpenters on the firm's own saw. An off-the-job course may give wider knowledge or recognised qualifications, but it may not teach this machine, so the skills may not match. Hove Furniture should choose on-the-job training unless the carpenters need qualifications that only the college gives.", hints: ["Compare cost and relevance."], explanation: "Cost and relevance weighed with a condition." }),
    ],
    hints: ["Cost per carpenter = time + lost output (+ fee)."],
    explanation: "On-the-job US\\$760; off-the-job US\\$1,880; on-the-job is cheaper and more relevant.",
  });

  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "A fictional business: Gumbo Call Centre of Harare employs 50 agents. Many new agents leave within 6 months. Managers say induction is only a one-hour talk, new agents learn on the job from busy colleagues, and there is no career path. The company is considering a two-week induction, a mentor for each new agent, and a development programme that rotates agents between departments and offers them responsibility for improvement projects.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Analyse two ways in which a better induction might reduce labour turnover at Gumbo Call Centre.", points: ["New agents understand their job, rules and colleagues sooner, so they feel less lost", "Application: a two-week induction would reduce early mistakes with customers", "A mentor gives support and someone to ask for help", "Application: new agents who feel supported are less likely to leave in the first six months"], modelAnswer: "A two-week induction would help new agents to understand their job, the rules and their colleagues sooner, so they make fewer early mistakes with customers and feel less lost. A mentor gives them someone to ask for help, and agents who feel supported are less likely to leave in the first six months.", hints: ["Link each improvement to a reason for leaving."], explanation: "Two ways, each applied." }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain two benefits to the call centre of the proposed development programme.", points: ["Rotation between departments makes agents multi-skilled, so staff can be moved to where demand is greatest", "Application: agents could cover busy periods in other departments", "Responsibility for projects develops initiative and intrapreneurship", "Application: agents may suggest ways to improve customer service"], modelAnswer: "Rotating agents between departments makes them multi-skilled, so staff can be moved to cover busy periods in other departments. Giving them responsibility for improvement projects develops initiative, and agents may suggest ways to improve customer service.", hints: ["Use the words multi-skilling and intrapreneurship."], explanation: "Two benefits, each applied." }),
      P.manual({ label: "(c)", marks: 7, stem: "Evaluate whether Gumbo Call Centre should introduce all three proposals together.", points: ["The three address different causes of leaving: lack of support, weak induction and lack of career path", "Together they should reduce labour turnover and recruitment costs", "They cost money and management time, and rotation may reduce productivity at first", "The call centre could phase them, starting with induction and mentors, which are cheapest and address the early leavers", "Trained and developed agents may be poached by rivals", "The cost is certain but the benefit is uncertain, so results should be measured after a few months", "Judgement with a reason and time-frame"], levels: [[3, 5, 7, "Weighs benefits and costs of the proposals using the case; considers phasing and risk; a justified recommendation with a time-frame"], [2, 3, 4, "Explains benefits and costs with some use of the case; judgement weakly supported"], [1, 1, 2, "Lists the proposals with little evaluation"]], modelAnswer: "The three proposals address different causes of agents leaving: weak induction, lack of support and no career path. Together they should reduce labour turnover and the cost of recruiting replacements. But they cost money and management time, and rotation may reduce productivity at first. The centre could phase them, starting with the induction and mentors, which are cheapest and help the agents who leave early, and introduce rotation in six months. Developed agents may be hired by rivals, so the centre should link progression to pay. A phased introduction is better than doing everything at once.", hints: ["Match each proposal to a cause of leaving, then consider cost and timing."], explanation: "Causes, benefits, costs and sequencing weighed to a recommendation." }),
    ],
    hints: ["Link each proposal to a reason that agents leave."],
    explanation: "Induction and mentoring reduce early leaving; development gives flexibility and ideas; phase the proposals.",
  });

  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Mavhu Brickworks near Gweru employs 40 workers, of whom 30 are machine operators. Each year it trains 10 new operators on the job, which costs US\\$300 per operator in lost output and supervisors' time. Quality complaints rose last year and two skilled operators left to join a competitor offering higher pay. The owner is considering a US\\$12,000 off-the-job programme that would give all 30 operators a recognised certificate, and would increase output per operator by about US\\$30 a month.",
    parts: [
      P.group({ label: "(a)", stem: "Calculate:", parts: [
        P.num({ label: "(i)", marks: 1, kind: "money", value: 30 * 30, wrong: [30], stem: "the monthly gain from the programme for all 30 operators;", explanation: "30 × US\\$30 = US\\$900." }),
        P.num({ label: "(ii)", marks: 2, kind: "months", dp: 1, value: 12000 / 900, wrong: [900, 12], stem: "the number of months the gain would take to repay the cost, to one decimal place.", explanation: "12,000 ÷ 900 = 13.3 months." }),
      ] }),
      P.manual({ label: "(b)", marks: 4, stem: "Analyse two possible benefits of the programme other than the output gain.", points: ["Quality should improve, reducing complaints and rework", "Application: certified operators are likely to make fewer errors on the machines", "Staff may feel valued and so be more motivated to stay", "Application: the programme may help to keep operators who might otherwise join a competitor"], modelAnswer: "Certified operators are likely to make fewer errors on the machines, so quality should improve and complaints fall. Operators may feel valued and be more motivated to stay, which helps to keep those who might otherwise join a competitor.", hints: ["Look at the problems in the case."], explanation: "Quality and retention benefits, applied." }),
      P.manual({ label: "(c)", marks: 8, stem: "Evaluate whether Mavhu Brickworks should spend US\\$12,000 on the programme.", points: [["The payback of 13.3 months on output alone is longer than a year, but the benefits may last for several years", 2], ["Quality and retention benefits would add to the return", 2], ["The estimate of a US\\$30 gain per operator is uncertain", 1], ["Certificates make the operators attractive to competitors, so poaching is a risk", 1], ["The owner could link pay or promotion to the certificate, or continue on-the-job training at lower cost", 1], ["Judgement with a reason and condition", 1]], levels: [[3, 6, 8, "Uses the payback figure, quality and retention, and the risk of poaching from the case; considers alternatives; a justified recommendation with a condition"], [2, 3, 5, "Explains costs and benefits with some use of the case; judgement weakly supported"], [1, 1, 2, "Lists costs and benefits with little application"]], modelAnswer: "On output alone the programme takes 13.3 months to repay US\\$12,000, but the benefits should last for years, and better quality and the retention of operators would add to the return. The US\\$30 gain per operator is only an estimate, and the certificates make the operators attractive to competitors, as two have already shown by leaving for higher pay. The owner could link pay or promotion to the certificate, or continue on-the-job training at lower cost. The programme is worthwhile if it is combined with a pay structure that keeps the certified operators, and the owner should review the gains after a year.", hints: ["Compare the payback with the likely life of the benefit, then think about poaching."], explanation: "Weighs the payback, other benefits and the risk of poaching and recommends a condition." }),
    ],
    hints: ["Monthly gain = number of operators × gain per operator."],
    explanation: "Gain US\\$900 a month; payback 13.3 months; worthwhile only if staff are kept.",
  });

  b.card("DEFINITION", "Induction", "Introducing a new employee to the business, its rules, safety procedures, colleagues and the job.");
  b.card("DEFINITION", "Training", "Teaching employees the specific skills and knowledge needed for their present job.");
  b.card("DEFINITION", "Development", "Longer-term growth of an employee's abilities, through experience and education, to prepare for future roles.");
  b.card("FACT", "On-the-job training", "Learning at the workplace: cheaper and relevant, but uses a trainer's time and may pass on bad habits.");
  b.card("FACT", "Off-the-job training", "Learning away from the workplace: wider knowledge and qualifications, but costs fees, travel and lost output.");
  b.card("DEFINITION", "Multi-skilling", "Training employees to do several different jobs so that they can be moved between tasks.");
  b.card("DEFINITION", "Intrapreneurship", "Entrepreneurial behaviour, such as initiative and idea generation, by employees inside an existing business.");
  b.card("CONCEPT", "Poaching", "A rival hiring staff whom the business has trained; the business bears the cost and the rival gains.");
  b.card("FACT", "Impact of training", "Productivity, quality, motivation, retention and flexibility, set against fees, trainers' time, lost output and poaching risk.");
});
