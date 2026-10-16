// W2a: hrm.purpose-planning
import { concept, P, hr, chk, r2, rd } from "../lib.mjs";
import { mc } from "../tables/w2a-lib.mjs";

concept("abus.hrm.purpose-planning", { file: "hrm/purpose-planning", keyPrefix: "hrm.purpose-planning" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is the main purpose of **human resource management**?",
    ok: ["Making sure the business has the right people", "Correct: HRM plans, recruits, develops and looks after the workforce."],
    bad: [["Setting the prices of the business's products", "Pricing is a marketing decision."], ["Keeping the financial records of the business", "Records are kept by the finance function."], ["Choosing the machines used in production", "Equipment choice is an operations decision."]],
    explanation: "HRM ensures the business has enough people with the right skills, who are motivated and treated fairly.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What does a **workforce plan** compare?",
    ok: ["The forecast need for staff and expected supply", "Correct: the gap shows how many people must be recruited or trained."],
    bad: [["The wages paid by the business and the profit it earns", "That compares costs with profit, not need with supply."], ["The sales figures of two different financial years", "That is a sales comparison."], ["The prices charged by rival firms for similar products", "That is a market comparison."]],
    explanation: "A workforce plan sets the forecast need for labour against the expected supply and plans to close the gap.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: "A fictional hardware shop in Mutare began the year with 36 employees and ended with 44. Eight employees left during the year. What was its labour turnover?",
    ok: ["20%", "Correct: average employees = 40, so 8 ÷ 40 × 100 = 20%."],
    bad: [["18.2%", "This divides by the closing number (44) instead of the average."], ["22.2%", "This divides by the opening number (36) instead of the average."], ["80%", "This is the labour retention, not the turnover."]],
    hints: ["Find the average number of employees first."],
    explanation: "Average = (36 + 44) ÷ 2 = 40. Labour turnover = 8 ÷ 40 × 100 = 20%.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of the following is a likely **effect of high labour turnover**?",
    ok: ["Higher recruitment and training costs", "Correct: replacing leavers means advertising, selecting and training again."],
    bad: [["Lower recruitment and training costs", "More leavers means more replacements and so higher costs."], ["A more experienced workforce", "Frequent leavers take experience out of the business."], ["Higher morale among the staff who remain", "Constant departures usually lower morale."]],
    explanation: "High turnover raises costs and lowers experience, quality and often morale.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of these is a **benefit of low labour turnover**?",
    ok: ["An experienced and skilled workforce", "Correct: staff who stay build skills and knowledge of the business."],
    bad: [["Constant new ideas from new recruits", "That is a benefit of some turnover, not of low turnover."], ["Lower wages for all workers", "Turnover does not directly reduce wages."], ["No need for any staff training", "All businesses need some training, even with low turnover."]],
    hints: ["What do staff who stay for many years bring?"],
    explanation: "Low turnover keeps experience and skills and reduces recruitment and training costs.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional bakery in Masvingo forecasts that it will need 30 staff next year. It has 26 staff and expects 4 to leave during the year. How many people must it recruit?",
    ok: ["8", "Correct: supply = 26 − 4 = 22, so the gap is 30 − 22 = 8."],
    bad: [["4", "This is the gap between 30 and 26 and ignores the leavers."], ["6", "This subtracts only two of the leavers from the gap."], ["12", "This adds the leavers to the number needed twice."]],
    hints: ["Subtract expected leavers from the staff now to get expected supply."],
    explanation: "Supply at the end of the year = 26 − 4 = 22. Gap = 30 − 22 = 8 recruits.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional hotel in Bulawayo has labour turnover of 35%, while competing hotels average 20%. Which is the most useful first step for the HR manager?",
    ok: ["Survey leavers to find why they left", "Correct: the right action depends on the cause."],
    bad: [["Raise pay for all staff immediately", "Pay may not be the cause, and raising it could be wasted cost."], ["Stop recruiting any new staff", "The hotel still needs staff to operate."], ["Ignore the figure since some turnover is normal", "The figure is well above the competitors', so it deserves attention."]],
    hints: ["Which action gives information about the cause?"],
    explanation: "A turnover well above rivals' is a signal; discovering the cause comes before choosing a remedy.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which is the best reason for an HR manager to update the workforce plan during the year?",
    ok: ["Sales and labour supply may differ", "Correct: a plan based on forecasts needs adjusting as results come in."],
    bad: [["Plans can never be correct the first time", "A plan can be right, but forecasts carry risk."], ["Updating the plan removes the need for forecasts", "Updating uses new forecasts."], ["Employees demand a new plan each month", "There is no such rule."]],
    hints: ["What is a plan based on?"],
    explanation: "The workforce plan rests on forecasts of sales and of staff leaving, so it needs review when actual figures differ.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Labour turnover is calculated by dividing the number of employees leaving by the closing number of employees.",
    answer: false,
    explanation: "False. The formula divides by the average number of employees, (opening + closing) ÷ 2, then multiplies by 100.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Some labour turnover can benefit a business by bringing in new ideas and a different mix of skills.",
    answer: true,
    explanation: "True. Zero turnover can lead to complacency; a moderate level lets the business refresh its skills.",
    hints: ["Is all turnover harmful?"],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [["Labour turnover", "Leavers as a percentage of the average workforce"], ["Labour retention", "The percentage of employees who stay"], ["Workforce plan", "A forecast of staff needed compared with staff available"], ["Natural wastage", "Reducing staff numbers by not replacing leavers"]],
    explanation: "Natural wastage is a way of reducing a surplus without redundancy.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "Labour turnover is the number of leavers divided by the {{blank:a}} number of employees, multiplied by 100. Labour retention equals 100 minus the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["average"], choices: ["average", "opening", "closing"] },
      { id: "b", accepted: ["labour turnover"], choices: ["labour turnover", "wage bill", "profit margin"] },
    ],
    explanation: "Divide by the average workforce; retention is the part of the workforce that stays.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** function of human resource management.",
    accepted: ["recruitment", "selection", "training", "training and development", "workforce planning", "planning", "remuneration", "welfare", "health and safety", "discipline", "dismissal", "appraisal", "recruiting", "development", "pay", "advice", "guidance", "advice and guidance"],
    explanation: "Accept planning, recruitment, selection, training and development, remuneration, welfare, discipline and dismissal, or advice and guidance.",
  });

  const lt1 = hr.labourTurnover(9, hr.average(52, 48));
  chk(lt1, 18);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: lt1, calculator: true, wrong: [r2((9 / 48) * 100), r2((9 / 52) * 100)],
    stem: "A fictional school production unit near Chinhoyi employed 52 people at the start of the year and 48 at the end. Nine people left during the year. Calculate the labour turnover, to one decimal place.",
    hints: ["Use the average number of employees."],
    explanation: "Average = (52 + 48) ÷ 2 = 50. Labour turnover = 9 ÷ 50 × 100 = 18.0%. Dividing by 48 gives 18.8% and by 52 gives 17.3%.",
    daily: true,
  });
  const lt2 = hr.labourTurnover(25, 125);
  const ret2 = hr.retention(25, 125);
  chk(lt2, 20); chk(ret2, 80);
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: ret2, calculator: true, wrong: [lt2, r2((100 * 25) / 100)],
    stem: "A fictional supermarket in Gaborone has an average of 125 employees. During the year 25 employees left. Calculate the labour retention, to one decimal place.",
    hints: ["Work out the labour turnover first."],
    explanation: "Labour turnover = 25 ÷ 125 × 100 = 20.0%. Labour retention = 100 − 20 = 80.0%. Stopping at 20.0% gives the turnover, not the retention.",
  });
  const staffNow = 50, needed = 60, leavers = r2(staffNow * 0.14);
  const gap = needed - (staffNow - leavers);
  chk(leavers, 7); chk(gap, 17);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "plain", unit: "people", value: gap, wrong: [needed - staffNow, leavers],
    stem: "A fictional mushroom company near Mutare has 50 employees and forecasts that it will need 60 next year. Its labour turnover is usually 14% a year, and it expects this to continue. How many people must it recruit to fill the gap between the staff needed and the staff expected to remain?",
    hints: ["Work out the expected leavers, then the expected supply."],
    explanation: "Expected leavers = 50 × 0.14 = 7. Expected supply = 50 − 7 = 43. Gap = 60 − 43 = 17 people. Using 60 − 50 = 10 ignores the leavers.",
    workedSolution: "1. Expected leavers = 14% of 50 = 7.\n2. Expected supply = 50 − 7 = 43.\n3. Staff to recruit = 60 − 43 = 17.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a business needs a workforce plan.",
    points: ["It forecasts the number and skills of staff needed to meet the objectives", "It compares the need with the expected supply, including leavers", "It shows the gap early so that the business can recruit or train in time"],
    modelAnswer: "A workforce plan forecasts how many staff and what skills the business needs to meet its objectives. It compares this with the supply, allowing for leavers, and shows the gap early, so the business can recruit or train people in time and avoid being short of staff or having too many.",
    hints: ["What does the plan compare, and what does it allow the business to do?"],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how high labour turnover may affect the profit of a fictional restaurant in Harare.",
    points: ["Each leaver must be replaced, which costs money in advertising, selection and training", "New staff are less productive and make more errors while they learn", "Service quality may fall, so customers may go elsewhere and revenue falls", "Higher costs and lower revenue together reduce profit"],
    modelAnswer: "Every leaver has to be replaced, which costs money in advertising, selecting and training. New staff are less productive and make more errors while they learn, so service quality may fall and customers may go elsewhere. Higher costs and lower revenue together reduce profit.",
    hints: ["Think of costs first, then revenue."],
    explanation: "Cost chain plus revenue chain leading to profit.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional factory in Bulawayo has labour turnover of 28% a year, compared with a local average of 18%. The HR manager proposes a 10% pay rise for all workers. Assess whether this is the best way to reduce turnover.",
    points: ["Low pay is a common cause of staff leaving, so a rise could reduce turnover", "A 10% rise for all workers raises wage costs substantially", "Turnover may be caused by other things, such as poor supervision, lack of promotion or unsafe conditions", "A rise may not work if rivals also pay more", "Savings in recruitment and training costs may offset part of the cost", "Judgement with a reason: find the cause first, then target the remedy"],
    modelAnswer: "A pay rise may reduce turnover if low pay is the cause, and the savings on recruiting and training might offset part of the cost. But a 10% rise for everyone raises the wage bill considerably, and turnover may be caused by poor supervision, a lack of promotion or unsafe conditions, which pay would not solve. Rivals could also match the rise. The manager should find out why people leave and target the remedy, using pay only if it is the main cause.",
    hints: ["Give a benefit, a cost, an alternative cause and a judgement."],
    explanation: "One point per mark; judgement with a reason.",
  });

  const open1 = 60, close1 = 68, left1 = 10;
  const avg1 = hr.average(open1, close1);
  const lt3 = hr.labourTurnover(left1, avg1);
  chk(avg1, 64); chk(lt3, 15.625);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional business: Zuva Printing Works of Gweru employed 60 people on 1 January and 68 on 31 December. During the year 10 employees left, mostly to take jobs with a rival that pays more. The owner is considering a review of the pay of her skilled printers.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: lt3, wrong: [r2((10 / 68) * 100), r2((10 / 60) * 100)], stem: "Calculate the labour turnover, to one decimal place.", explanation: "Average = (60 + 68) ÷ 2 = 64. Labour turnover = 10 ÷ 64 × 100 = 15.6%." }),
      P.manual({ label: "(b)", marks: 2, stem: "State **two** functions of human resource management.", points: ["Any function, for example workforce planning or recruitment", "A second different function, for example training or remuneration"], modelAnswer: "Recruitment and training and development (or planning, selection, remuneration, welfare, discipline and dismissal).", explanation: "One mark each." }),
      P.manual({ label: "(c)", marks: 5, stem: "Analyse the effects of the labour turnover on Zuva Printing Works and suggest one way to reduce it.", points: ["Leavers must be replaced, which costs money in recruitment and selection", "Application: skilled printers who leave take their skills and customers' trust with them", "New staff need training and are less productive at first", "Quality or delivery of print jobs may suffer, so customers may be lost", "Suggestion of a remedy, for example reviewing the pay of skilled printers or improving promotion prospects"], modelAnswer: "Each leaver must be replaced, which costs money in recruitment and selection, and skilled printers who leave take their skills with them. New staff need training and are less productive at first, so quality or delivery of jobs may suffer and customers may be lost. Reviewing the pay of skilled printers, since many leavers went to a rival that pays more, should reduce the turnover.", hints: ["Costs first, then effects on the business, then a remedy linked to the case."], explanation: "Effects on cost and service, with a remedy from the case." }),
    ],
    hints: ["Use the average of the opening and closing numbers."],
    explanation: "Labour turnover 15.6%; effects on costs and quality; a pay review is a possible remedy.",
  });

  const need2 = 90, now2 = 80, lv2 = r2(now2 * 0.1), sup2 = now2 - lv2, gap2 = need2 - sup2;
  chk(lv2, 8); chk(sup2, 72); chk(gap2, 18);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "A fictional business: Msasa Lodge near Victoria Falls has 80 employees. A new 30-room wing will open next year and the manager forecasts that the lodge will need 90 employees. Its labour turnover has been 10% for several years and the manager expects it to continue. Most vacancies will be for housekeeping and kitchen staff.",
    parts: [
      P.group({ label: "(a)", stem: "Complete the workforce plan.", parts: [
        P.num({ label: "(i)", marks: 1, kind: "plain", unit: "people", value: lv2, wrong: [10], stem: "Calculate the number of employees expected to leave.", explanation: "10% of 80 = 8." }),
        P.num({ label: "(ii)", marks: 1, kind: "plain", unit: "people", value: sup2, wrong: [80], stem: "Calculate the expected supply of employees at the end of the year.", explanation: "80 − 8 = 72." }),
        P.num({ label: "(iii)", marks: 2, kind: "plain", unit: "people", value: gap2, wrong: [10], stem: "Calculate the number of employees the lodge must recruit.", explanation: "90 − 72 = 18." }),
      ] }),
      P.manual({ label: "(b)", marks: 4, stem: "Analyse two ways in which the lodge could fill the gap in its workforce.", points: ["Recruit new staff externally, which brings fresh skills but costs time and money", "Application: housekeeping and kitchen staff need little prior training, so many can be recruited quickly", "Train and promote existing staff, which rewards loyalty and reduces recruitment cost", "Application: existing waiters could be trained to work in the kitchen, but their old jobs must then be filled"], modelAnswer: "The lodge could recruit externally, which brings in new staff quickly, and housekeeping and kitchen jobs need little prior training, but it costs time and money. It could also train and promote existing staff, for example moving waiters into the kitchen, which rewards loyalty and saves recruitment costs, but their old jobs must then be filled.", hints: ["Give a method, an advantage and a limit for two methods."], explanation: "Two methods, each developed in context." }),
      P.manual({ label: "(c)", marks: 6, stem: "Evaluate whether the lodge should treat the workforce plan as fixed.", points: ["The plan relies on forecasts of room demand, which could be wrong", "If demand is less than forecast the lodge could have too many staff and wasted wages", "If labour turnover rises, the supply would fall and the gap would be larger than 18", "Reviewing the plan during the year lets the lodge adapt, for example by using seasonal or part-time staff", "Too many changes could unsettle staff", "Judgement with a reason: a regularly reviewed plan is better than a fixed one"], modelAnswer: "The plan depends on a forecast of demand for the new wing. If demand is lower than expected the lodge would have too many staff and waste wages, and if turnover rises the supply would be smaller and the gap bigger than 18. Reviewing the plan during the year lets the lodge adapt, for example by using seasonal or part-time staff. Too many changes could unsettle staff, but on balance a regularly reviewed plan is better than a fixed one.", hints: ["Say what the plan depends on and what happens if it changes."], explanation: "Forecasts can be wrong, so the plan should be reviewed." }),
    ],
    hints: ["Expected supply = staff now − expected leavers."],
    explanation: "Leavers 8, supply 72, recruit 18; methods of filling the gap; review the plan.",
  });

  const a25 = 200, l24 = 25, l25 = 40;
  const lt24 = hr.labourTurnover(l24, a25), lt25 = hr.labourTurnover(l25, a25);
  chk(lt24, 12.5); chk(lt25, 20);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: "A fictional business: Nhema Logistics of Harare has an average of 200 employees in each of the last two years. In 2024, 25 employees left; in 2025, 40 left. Exit interviews in 2025 show that many drivers left because of long hours, little training and a lack of promotion. The industry average labour turnover is 15%. The managing director is considering a plan to cut driver hours and introduce a training programme, which would cost US\\$30,000 a year.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: lt25, wrong: [lt24, 40], stem: "Calculate the labour turnover for 2025, to one decimal place.", explanation: "40 ÷ 200 × 100 = 20.0%. Giving 12.5% uses the 2024 leavers." }),
      P.manual({ label: "(b)", marks: 4, stem: "Analyse two costs to Nhema Logistics of the rise in labour turnover.", points: ["Recruitment and selection costs rise because more drivers must be replaced", "Application: the 15 extra leavers in 2025 compared with 2024 must be recruited and trained", "New drivers are less productive and more likely to make errors, so deliveries may be delayed", "Application: delays may cost the company contracts and revenue"], modelAnswer: "The company must recruit and select more drivers: 15 more left in 2025 than in 2024, and each must be replaced and trained. New drivers are less productive and more likely to make mistakes, so deliveries may be delayed, and late deliveries may cost the company contracts and revenue.", hints: ["Costs of replacing, then costs of lost quality."], explanation: "Two costs, each applied." }),
      P.manual({ label: "(c)", marks: 9, stem: "Evaluate whether the managing director should go ahead with the plan to cut drivers' hours and introduce training.", points: [["Turnover of 20% is above the industry average of 15% and has risen from 12.5%", 1], ["The plan addresses the causes given by leavers: hours, training and promotion", 2], ["The programme costs US\\$30,000 a year, which must be compared with the savings in recruitment, training and lost deliveries", 2], ["Cutting hours may reduce output or require more drivers, which adds cost", 1], ["Training could help to reduce errors and prepare drivers for promotion", 1], ["The figures may not be a perfect guide, because the survey covers leavers only, and conditions in the market may have changed", 1], ["Judgement with a reason and time-frame, for example go ahead and review turnover after a year", 1]], levels: [[3, 7, 9, "Uses the turnover figures, the causes and the cost of the plan; weighs benefits against costs and limitations; a justified recommendation with a condition or time-frame"], [2, 4, 6, "Applies some of the data with some analysis of benefits and costs; judgement weakly supported"], [1, 1, 3, "Describes the plan or the figures with little analysis"]], modelAnswer: "Turnover of 20% is above the industry average of 15% and has risen from 12.5% in 2024, and leavers say that hours, training and promotion are the causes, which the plan addresses directly. The programme costs US\\$30,000 a year, so the company must compare this with the savings from fewer recruitments and training of replacements, and the deliveries lost through inexperience. Cutting hours might reduce output or need extra drivers, which would add cost. Training could also reduce errors and prepare drivers for promotion. The evidence comes from leavers only, so the company should also ask current drivers. On balance the plan should go ahead, because it deals with the causes, but turnover and costs should be reviewed after a year.", hints: ["Compare the cost of the plan with the cost of the turnover, and test the causes."], explanation: "Weighs cost against benefit using the data and gives a time-framed recommendation." }),
    ],
    hints: ["Turnover = leavers ÷ average employees × 100."],
    explanation: "2025 turnover 20.0%; costs of replacement and lower quality; go ahead with the plan and review after a year.",
  });

  b.card("DEFINITION", "Human resource management", "Planning, recruiting, developing, rewarding and looking after the workforce so that the business has the people it needs.");
  b.card("DEFINITION", "Workforce plan", "A forecast of the number and skills of staff needed, compared with those available, showing how any gap will be closed.");
  b.card("FORMULA", "Labour turnover", "Labour turnover (%) = leavers in the year ÷ average number of employees × 100.");
  b.card("FORMULA", "Labour retention", "Labour retention (%) = 100 − labour turnover.");
  b.card("FORMULA", "Average number of employees", "(Opening number + closing number) ÷ 2.");
  b.card("CONCEPT", "Recruitment gap", "Recruits needed = forecast need − (staff now − expected leavers). Leavers must be replaced too.");
  b.card("FACT", "Effects of high labour turnover", "Higher recruitment and training costs, lost experience, lower morale and quality; may signal low pay or poor management.");
  b.card("FACT", "ZIMSEC functions of HRM", "Planning, recruitment, selection, training and development, remuneration, welfare, discipline and dismissal, advice and guidance.", undefined, { applies: ["zimsec"] });
  b.card("CONCEPT", "Natural wastage", "Reducing the workforce by not replacing employees who leave, avoiding redundancy.");
});
