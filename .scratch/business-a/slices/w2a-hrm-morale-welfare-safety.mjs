// W2a: hrm.morale-welfare-safety
import { concept, P, chk, r2 } from "../lib.mjs";
import { mc } from "../tables/w2a-lib.mjs";

concept("abus.hrm.morale-welfare-safety", { file: "hrm/morale-welfare-safety", keyPrefix: "hrm.morale-welfare-safety" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is meant by **employee morale**?",
    ok: ["The attitude and level of satisfaction of the workers", "Correct: it shows in effort, attendance and cooperation."],
    bad: [["The number of workers employed in a business", "That describes the size of the workforce."], ["The total wages paid to all workers each month", "That is the wage bill."], ["The skills that workers hold in the business", "That describes their skills, not their attitude."]],
    explanation: "Morale is the overall attitude, confidence and satisfaction of the workforce.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of the following is a **welfare facility** for workers?",
    ok: ["A rest room with water", "Correct: it looks after workers' physical wellbeing."],
    bad: [["A target for monthly sales", "A sales target is a performance measure, not a welfare facility."], ["A rule that forbids mobile phones", "A rule is a discipline measure."], ["A list of customers' complaints", "Complaints concern the product, not welfare."]],
    explanation: "Welfare facilities include rest rooms, canteens, clean water, first aid and counselling.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of the following is a likely **sign of low morale**?",
    ok: ["High absence and lateness", "Correct: workers who feel low stay away or arrive late more often."],
    bad: [["Few complaints and grievances", "Few complaints suggest higher morale."], ["Low labour turnover", "Low turnover suggests staff are content."], ["Rising output and quality", "These are signs of high morale."]],
    explanation: "Absence, lateness, turnover, complaints, low output and poor quality are all signs of low morale.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which action would best improve **work-life balance**?",
    ok: ["Fixed hours with notice of shift rosters", "Correct: predictable hours help workers plan their lives."],
    bad: [["Changing shifts without giving any notice", "Unpredictable changes damage work-life balance."], ["Adding unpaid weekend work every week", "More unpaid hours reduce balance."], ["Removing all rest breaks during shifts", "Breaks help to reduce tiredness and stress."]],
    explanation: "Predictable hours, flexible start times and shift swaps improve balance.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional quarry near Masvingo finds that workers who handle loud machinery have begun to lose hearing. Which action should the HR manager take first?",
    ok: ["Provide ear protection and safety training", "Correct: protective equipment and training reduce the hazard."],
    bad: [["Pay a bonus to workers who ignore the noise", "A bonus does not remove the hazard."], ["Move the noisy machines closer to the workers", "Closer machines make the hazard worse."], ["Remove all records of the hearing loss", "Hiding the problem is wrong and does not prevent harm."]],
    hints: ["Which action reduces harm now?"],
    explanation: "Employers must provide protective equipment and training where there is a hazard.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of the following is a benefit of a **diverse workforce**?",
    ok: ["A wider range of ideas and experience", "Correct: people from different backgrounds see problems differently."],
    bad: [["No disagreement between employees at all", "Diverse teams may disagree more, which must be managed."], ["Lower recruitment costs in every case", "Diversity does not necessarily lower costs."], ["No need for any training of managers", "Managers often need training to manage diversity."]],
    hints: ["Think about the range of experience in the team."],
    explanation: "Diverse teams bring different ideas and understand different customers, but need good management.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Why might spending money on safety training be **cheaper in the long run** for a fictional metalworking firm in Bulawayo?",
    ok: ["It reduces accidents, absence and compensation", "Correct: avoiding accidents saves more than the training costs."],
    bad: [["It guarantees that no accident will ever happen", "Training reduces risk but cannot remove it entirely."], ["It removes the need for all insurance", "Insurance and training serve different purposes."], ["It makes machines run without operators", "Training does not replace workers."]],
    hints: ["Compare the cost of training with the costs of accidents."],
    explanation: "Accidents cost injury, lost output, compensation and morale, so prevention can be cheaper.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional factory offers flexible start times to improve morale. What is the strongest reason this may not suit every department?",
    ok: ["Some work needs everyone to be present at once", "Correct: assembly lines or customer counters often cannot cope with staggered starts."],
    bad: [["Flexible hours always raise wages", "Flexible start times need not change wages."], ["Employees dislike having any choice", "Most employees value choice."], ["Flexible hours are illegal for factories", "There is no general ban on flexible hours."]],
    hints: ["Think about work that depends on everyone being there together."],
    explanation: "Flexibility has to be balanced against the needs of the work, such as production lines and service counters.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Employers have a legal duty to provide a safe workplace and safe equipment for their employees.",
    answer: true,
    explanation: "True. Employers must provide safe premises, equipment, information, training and first aid, as required by health and safety law.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Spending on health and safety is only a cost to a business and brings no benefits.",
    answer: false,
    explanation: "False. Safety measures reduce accidents, absence, compensation claims and damage to morale and reputation, which can outweigh the cost.",
    hints: ["Compare the cost of prevention with the cost of accidents."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [["Morale", "The attitude and satisfaction of the workforce"], ["Welfare", "Facilities that look after workers' wellbeing at work"], ["Work-life balance", "The balance between time at work and time away from it"], ["Equality", "Fair treatment and equal opportunity for everyone"]],
    explanation: "Each term describes a different aspect of how workers are treated.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "An employer must provide protective clothing, {{blank:a}} and first aid, and workers must {{blank:b}} safety rules.",
    blanks: [
      { id: "a", accepted: ["training"], choices: ["training", "bonuses", "advertising"] },
      { id: "b", accepted: ["follow"], choices: ["follow", "ignore", "write"] },
    ],
    explanation: "Employers provide equipment and training; workers must follow the rules and report hazards.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** sign of low employee morale.",
    accepted: ["high absence", "absence", "absenteeism", "high labour turnover", "labour turnover", "lateness", "complaints", "grievances", "poor quality", "low output", "low productivity", "poor timekeeping", "more complaints", "staff leaving"],
    explanation: "Accept absence, lateness, high labour turnover, complaints, low output or poor quality.",
  });

  const avail = 50 * 20, lost = 70, rate = (lost / avail) * 100;
  chk(avail, 1000); chk(rate, 7);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: rate, calculator: true, daily: true, wrong: [r2((lost / 50) * 100), 70],
    stem: "A fictional bakery in Chinhoyi has 50 workers, each expected to work 20 days in a month. In that month 70 working days were lost to absence. Using absence rate (%) = working days lost ÷ working days available × 100, calculate the absence rate to one decimal place.",
    hints: ["Find the working days available first."],
    explanation: "Days available = 50 × 20 = 1,000. Absence rate = 70 ÷ 1,000 × 100 = 7.0%. Dividing by the number of workers (50) gives 140%, which is not a rate of days available.",
  });
  const cost = r2(lost * 9.5);
  chk(cost, 665);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: cost, calculator: true, wrong: [r2(avail * 9.5), 70],
    stem: "In the same bakery the average daily wage is US\\$9.50 and workers are paid for days of absence. Calculate the wages paid for the 70 days lost to absence.",
    hints: ["Multiply days lost by the daily wage."],
    explanation: "70 × US\\$9.50 = US\\$665. Using all 1,000 days available would give 9,500, which is the whole month's wage bill.",
  });
  const lost2 = 0.045 * avail;
  const saving = r2((lost - lost2) * 9.5);
  chk(lost2, 45); chk(saving, 237.5);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: saving, calculator: true, wrong: [r2(lost2 * 9.5), cost],
    stem: "After the bakery improves its welfare facilities and repairs its equipment, the absence rate falls from 7.0% to 4.5% of the 1,000 working days available in a month. The average daily wage is US\\$9.50. Calculate the monthly saving in wages paid for days of absence.",
    hints: ["Work out the days lost at 4.5%, then the fall in days lost."],
    explanation: "Days lost at 4.5% = 0.045 × 1,000 = 45. Fall = 70 − 45 = 25 days. Saving = 25 × 9.50 = US\\$237.50. Giving 427.50 is the cost of the 45 days that remain.",
    workedSolution: "1. Days lost after improvement = 4.5% of 1,000 = 45.\n2. Days saved = 70 − 45 = 25.\n3. Saving = 25 × US\\$9.50 = US\\$237.50.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why employee morale is important to a business.",
    points: ["High morale makes workers more willing to work hard, so productivity rises", "It reduces absence and labour turnover, which lowers costs", "It improves quality and customer service, which helps sales"],
    modelAnswer: "When morale is high, workers are willing to work harder, so productivity rises. They are also absent less and are less likely to leave, which lowers costs. Their better service and quality also help sales.",
    hints: ["Think about effort, costs and customers."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional clinic in Gweru has a team of nurses of many ages and backgrounds. Explain **two** benefits to the clinic of having a diverse workforce.",
    points: ["A wider range of ideas and ways of solving problems", "Application: nurses from different backgrounds may suggest better ways to care for different patients", "Better understanding of a varied customer base", "Application: nurses who speak several languages can communicate with more patients"],
    modelAnswer: "A diverse team brings a wider range of ideas, so nurses from different backgrounds may suggest better ways to care for different patients. It also helps the clinic to understand a varied customer base, since nurses who speak several languages can communicate with more patients.",
    hints: ["Link each benefit to the clinic's patients."],
    explanation: "Two benefits, each applied.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional factory in Bulawayo wants to cut safety training to save US\\$8,000 a year. Assess whether this is a wise decision.",
    points: ["The saving is a visible reduction in costs", "Fewer trained workers are more likely to have accidents", "Accidents bring injury, absence, compensation and lost output", "The factory may break the law and face fines or closure", "Morale and reputation could fall if workers feel unsafe", "Judgement with a reason: unwise because the possible costs of accidents and legal action are far greater than the saving"],
    modelAnswer: "Cutting training saves US\\$8,000 a year, which helps profit in the short term. But fewer trained workers are more likely to have accidents, which cause injury, absence, compensation and lost output, and the factory may break the law and face fines or closure. Morale and reputation could also fall if workers feel unsafe. The decision is unwise because the possible costs are far greater than the saving.",
    hints: ["Compare the saving with the possible costs of an accident."],
    explanation: "One point per mark; the judgement needs a reason.",
  });

  const av2 = 80 * 24, l2 = 192, r3 = (l2 / av2) * 100;
  chk(av2, 1920); chk(r3, 10);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional business: Mutasa Packaging of Harare employs 80 workers, each expected to work 24 days in a month. In March, 192 days were lost to absence. The HR manager found that many absences followed injuries and that workers complain of long unplanned overtime.",
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "pct", value: r3, wrong: [r2((192 / 80) * 100), r2(192 / 24)], stem: "Using absence rate (%) = working days lost ÷ working days available × 100, calculate the absence rate for March, to one decimal place.", explanation: "Days available = 80 × 24 = 1,920. Absence rate = 192 ÷ 1,920 × 100 = 10.0%." }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain two ways in which Mutasa Packaging could reduce injuries.", points: ["Provide protective equipment such as gloves and guards on machines", "Train workers in safe working methods", "Inspect equipment and record and investigate accidents"], modelAnswer: "The company could provide protective equipment such as gloves and guards on machines, and train workers in safe working methods. It should also inspect equipment regularly and investigate every accident.", explanation: "Any two measures, with one mark for a third development." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain how long unplanned overtime might affect morale.", points: ["Workers cannot plan family and personal time, so work-life balance suffers", "Tiredness and stress can lead to errors, injuries and absence", "Resentment of management lowers motivation and may raise labour turnover"], modelAnswer: "Workers cannot plan family or personal time, so work-life balance suffers. Tiredness and stress cause errors, injuries and absence, and workers may resent management, which lowers motivation and can raise labour turnover.", explanation: "Link overtime to balance, health and motivation." }),
    ],
    hints: ["First find the number of working days available in the month."],
    explanation: "Absence rate 10.0%; protective equipment and training; overtime damages balance and health.",
  });

  const wage = 11, dl1 = 1200, dl2 = 780;
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "A fictional business: Zimba Textiles of Gweru lost 1,200 working days to absence last year. After the company spent US\\$9,000 on a canteen, rest areas and new machine guards, absence fell, and this year 780 days were lost. The company pays an average of US\\$11 a day, including for sick leave. A director says that the spending was a waste of money because it did not increase sales.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: (dl1 - dl2) * wage, wrong: [dl2 * wage, dl1 * wage], stem: "Calculate the fall in the wages paid for days of absence.", explanation: "Fall in days = 1,200 − 780 = 420. Wages = 420 × 11 = US\\$4,620." }),
      P.num({ label: "(b)", marks: 2, kind: "years", value: 9000 / ((dl1 - dl2) * wage), wrong: [4620], stem: "On the basis of the wage saving alone, calculate how many years the saving would take to repay the US\\$9,000, to two decimal places.", explanation: "9,000 ÷ 4,620 = 1.95 years." }),
      P.manual({ label: "(c)", marks: 4, stem: "Analyse two benefits of the spending other than the wages saved.", points: ["Fewer injuries reduce compensation, medical costs and lost output", "Application: the new machine guards should reduce hand injuries", "Better morale reduces labour turnover and recruitment cost", "Application: a canteen and rest areas make staff feel valued and more likely to stay"], modelAnswer: "The machine guards should reduce injuries, which cuts compensation, medical costs and lost output. The canteen and rest areas make staff feel valued, so they are more likely to stay, which reduces recruitment and training costs.", hints: ["Think about costs that are not wages."], explanation: "Two further benefits, applied." }),
      P.manual({ label: "(d)", marks: 6, stem: "Evaluate the director's view that the spending was a waste of money.", points: ["The wage saving alone repays the spending in under two years", "Other benefits such as fewer injuries and lower labour turnover add to the return", "Sales did not rise, but the aim was to reduce costs and risk, not to increase sales directly", "The fall in absence may have other causes, such as a slow period", "Some benefits, such as morale, are hard to measure", "Judgement with a reason: the director is mistaken if absence stays low, and the result should be reviewed after a year"], modelAnswer: "The wage saving alone repays the US\\$9,000 in under two years, and other benefits such as fewer injuries and less labour turnover add to the return. The spending was not intended to raise sales directly, but to reduce costs and risk. The fall in absence may have other causes, and some benefits such as morale are hard to measure. On balance the director is mistaken if absence stays low, but the result should be reviewed after a year.", hints: ["Compare the return with the cost, and consider the other benefits."], explanation: "Weighs the measurable saving and other benefits and reaches a judgement." }),
    ],
    hints: ["Wages saved = fall in days lost × daily wage."],
    explanation: "Saving US\\$4,620 a year; repaid in 1.95 years; other benefits; the spending was probably worthwhile.",
  });

  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Zambezi Quarry Supplies, near Kwekwe, has 90 employees. An inspection finds worn guards on two crushers, no fire drill for two years and a shortage of protective helmets. The owner, Mr Dube, says that safety spending would reduce profit, which fell last year. Workers have asked for a safety committee, and some have started looking for jobs elsewhere.",
    parts: [
      P.manual({ label: "(a)", marks: 6, stem: "Analyse the role that HRM could play in improving health and safety at Zambezi Quarry Supplies.", points: ["Training and induction in safe working methods and fire drills", "Application: a fire drill would correct the two-year gap", "Providing and checking protective equipment", "Application: buying helmets and replacing worn guards on the crushers", "Setting up a safety committee and records of inspections and accidents", "Investigating accidents and disciplining or retraining those who break the rules"], modelAnswer: "HRM could organise training and induction in safe working methods, and a fire drill to correct the two-year gap. It could make sure protective equipment is provided and checked, buying helmets and replacing the worn guards on the crushers. It could also set up the safety committee that workers want, keep inspection and accident records, and investigate any accident so that the cause is removed.", hints: ["Link each role to a problem found in the inspection."], explanation: "Roles of HRM applied to the problems in the case." }),
      P.manual({ label: "(b)", marks: 9, stem: "Evaluate Mr Dube's view that safety spending should wait until profit recovers.", points: [["Safety spending reduces profit in the short term and the owner has limited funds", 2], ["Delay increases the risk of injury, compensation and lost output", 2], ["Breaking the law could lead to fines or closure", 1], ["Workers who feel unsafe may leave, raising recruitment and training costs, and morale may fall", 2], ["Some measures cost little, such as a fire drill and a committee, and can start now", 1], ["Judgement with a reason and time-frame, for example repair the guards and buy helmets now and phase other spending", 1]], levels: [[3, 7, 9, "Weighs the costs of spending against the risks of delay using the case; considers cheap and urgent measures; a justified recommendation with a time-frame"], [2, 4, 6, "Explains costs and risks with some use of the case; judgement weakly supported"], [1, 1, 3, "Lists safety measures with little evaluation"]], modelAnswer: "Safety spending will reduce profit in the short term, and Mr Dube has limited funds. But delay raises the risk of injury, compensation and lost output, and breaking the law could lead to fines or even closure. Workers who feel unsafe are already looking for jobs elsewhere, which would raise recruitment and training costs and lower morale. Some measures cost little, such as holding a fire drill and setting up the committee, and can begin at once. Mr Dube should repair the guards and buy helmets immediately, since these are the greatest risks, and phase the other spending over the next year.", hints: ["Separate the urgent, costly items from the cheap ones that can start at once."], explanation: "Weighs short-term cost against the risk of delay and recommends a phased plan." }),
    ],
    hints: ["Link each problem found at the quarry to something HRM can do."],
    explanation: "HRM roles in safety; the risks of delay outweigh the cost, so urgent items first.",
  });

  b.card("DEFINITION", "Employee morale", "The overall attitude, confidence and satisfaction of workers; it shows in effort, attendance and cooperation.");
  b.card("DEFINITION", "Employee welfare", "Facilities and services that look after workers' physical and social wellbeing, such as rest rooms, clean water, canteens and first aid.");
  b.card("DEFINITION", "Work-life balance", "The balance between the time and energy given to work and those given to family, rest and other interests.");
  b.card("FACT", "Signs of low morale", "High absence, lateness, high labour turnover, complaints, low output and poor quality.");
  b.card("FORMULA", "Absence rate", "Absence rate (%) = working days lost to absence ÷ working days available × 100.");
  b.card("FACT", "Benefits of diversity", "A wider range of ideas and skills, better understanding of varied customers and a wider recruitment pool; needs good management.");
  b.card("FACT", "Employers' safety duties", "Safe premises and equipment, information and training, protective clothing, first aid, and recording and reporting accidents.");
  b.card("CONCEPT", "Safety: cost against benefit", "Safety costs money, but accidents cost more through injury, absence, compensation, lost output and damaged morale.");
  b.card("FACT", "Investigating a local organisation", "Observe hazards, interview workers and managers, review accident records, compare with the law and good practice, and recommend actions by risk and cost.", undefined, { applies: ["zimsec"] });
});
