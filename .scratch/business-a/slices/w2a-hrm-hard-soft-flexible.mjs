// W2a: hrm.hard-soft-flexible (Cambridge A Level only; freePreview lesson)
import { concept, P, chk, r2 } from "../lib.mjs";
import { mc } from "../tables/w2a-lib.mjs";

concept("abus.hrm.hard-soft-flexible", { file: "hrm/hard-soft-flexible", keyPrefix: "hrm.hard-soft-flexible" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which approach to HRM treats employees mainly as a **resource to be used efficiently** and a cost to be controlled?",
    ok: ["Hard HRM", "Correct: the focus is on control, targets and keeping labour cost low."],
    bad: [["Soft HRM", "Soft HRM treats employees as assets whose commitment is developed."], ["Strategic HRM only", "That is not a name for this approach."], ["Participative HRM only", "That is not the term used for the cost-focused approach."]],
    explanation: "Hard HRM treats people as a resource to be managed for efficiency; soft HRM treats them as assets to be developed.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is a **zero-hours contract**?",
    ok: ["No guaranteed hours of work", "Correct: the employer gives work only when it is needed."],
    bad: [["Work for a fixed number of hours every week", "That is a standard full-time or part-time contract."], ["A contract for a single day of work only", "A zero-hours contract has no fixed end date."], ["A contract with no pay for any hours", "Hours worked are paid."]],
    explanation: "A zero-hours contract guarantees no minimum hours; the worker is paid only for hours actually worked.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of the following describes **annualised hours**?",
    ok: ["A yearly total of hours set by demand", "Correct: workers do more hours in busy periods and fewer in quiet ones."],
    bad: [["Workers choose their start and finish times each day", "That describes flexi-time."], ["Two workers share one full-time job", "That describes job sharing."], ["Workers are paid per task by a digital platform", "That describes the gig economy."]],
    explanation: "Annualised hours spread a total of hours across the year to match demand.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a likely feature of **soft HRM**?",
    ok: ["Training and employee participation", "Correct: the aim is to develop commitment."],
    bad: [["Tight control and close monitoring", "These are features of hard HRM."], ["The use of workers only when cheapest", "That is a feature of hard HRM."], ["Minimising labour costs above all else", "That is the aim of hard HRM."]],
    explanation: "Soft HRM uses communication, training, development and participation to build motivation and loyalty.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional bakery in Gweru employs two cashiers who share one full-time job, one working mornings and the other afternoons. This is",
    ok: ["Job sharing", "Correct: two people share the duties of one post."],
    bad: [["Flexi-time", "Flexi-time lets each worker choose start and finish times."], ["Compressed hours", "Compressed hours put full hours into fewer days."], ["A zero-hours contract", "The cashiers have agreed hours."]],
    hints: ["How many people occupy the one post?"],
    explanation: "Two workers dividing one full-time job is job sharing.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What is the main **disadvantage for employees** of the gig economy?",
    ok: ["Lack of security and rights", "Correct: gig workers are self-employed and paid per task."],
    bad: [["Hours that are fixed every week", "Gig work usually has no fixed hours."], ["A guaranteed monthly salary at all times", "Gig workers are not guaranteed a salary."], ["Compulsory paid holiday for all drivers", "Self-employed workers do not normally have paid holiday."]],
    hints: ["Think about guaranteed hours, pay and rights."],
    explanation: "Gig workers are paid per task, with no guaranteed work and few employment rights.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional retailer in Johannesburg uses software to screen job applications. Which is the most important risk?",
    ok: ["Past bias may be repeated by the selection software", "Correct: software that learns from past decisions can copy their unfairness."],
    bad: [["The software cannot process any CVs", "Screening software processes CVs; the issue is how."], ["The software will refuse to be switched off", "This is not a real risk of screening software."], ["Candidates can no longer apply online", "Online application is what the software supports."]],
    hints: ["What does the software learn from?"],
    explanation: "AI trained on past decisions may repeat bias, so results should be checked by people.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Why might a fictional software company that needs scarce skilled programmers prefer a soft approach to HRM?",
    ok: ["Skilled staff are hard to replace", "Correct: development and reward help to keep people who are difficult to find."],
    bad: [["Programmers never need to be managed", "Programmers need managing like any other staff."], ["Soft HRM is always the cheapest approach", "It is often more costly in the short term."], ["Hard HRM is illegal for software firms", "No such restriction exists."]],
    hints: ["What happens if skilled staff leave?"],
    explanation: "Where skills are scarce, commitment and retention matter more than low-cost flexibility.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A business that uses a hard approach to HRM will normally spend more on training and employee participation than one using a soft approach.",
    answer: false,
    explanation: "False. A soft approach emphasises training, participation and development. A hard approach focuses on control, flexibility and cost.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each flexible working arrangement to its description.",
    pairs: [["Flexi-time", "Workers choose start and finish times within limits"], ["Compressed hours", "Full hours are worked in fewer, longer days"], ["Job sharing", "Two workers share one full-time job"], ["Zero-hours contract", "No guaranteed hours; pay only for hours worked"], ["Gig economy", "Self-employed workers paid per task"]],
    explanation: "Each is a different way of making working time flexible.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "{{blank:a}} HRM treats employees as assets whose commitment must be developed, while {{blank:b}} HRM treats them as a resource to be used efficiently.",
    blanks: [
      { id: "a", accepted: ["Soft"], choices: ["Soft", "Hard", "Strategic"] },
      { id: "b", accepted: ["hard"], choices: ["soft", "hard", "flexible"] },
    ],
    explanation: "Soft HRM develops commitment; hard HRM manages people as a resource.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** advantage to a business of using flexible working contracts.",
    accepted: ["matches labour to demand", "lower labour costs", "lower costs", "flexibility", "cover busy periods", "reduces fixed costs", "can respond to changes in demand", "less overtime", "fewer idle workers", "match staff to demand", "wider recruitment pool", "reduces wage costs"],
    explanation: "Accept lower labour costs, matching labour to demand, or greater flexibility in busy and quiet periods.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** way in which artificial intelligence can be used in human resource management.",
    accepted: ["screening cvs", "screening applications", "recruitment", "chatbots", "monitoring performance", "workforce planning", "forecasting staff needs", "training", "e-learning", "answering candidates' questions", "shortlisting", "scheduling", "rostering", "monitoring"],
    explanation: "Accept screening applications, chatbots for candidates, monitoring, training or workforce planning.",
  });

  const normalH = 36 * 50, peakH = 16 * 90, totalH = normalH + peakH;
  const annual = totalH * 5;
  chk(totalH, 3240); chk(annual, 16200);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: annual, calculator: true, daily: true, wrong: [totalH, 3 * 2080 * 5],
    stem: "A fictional safari lodge near Hwange needs 50 hours of staff time a week for 36 weeks of the year and 90 hours a week for the remaining 16 weeks. It employs two workers on annualised hours at US\\$5 an hour, who are paid only for the hours needed. Calculate the annual labour cost.",
    hints: ["Find the total hours needed in the year first."],
    explanation: "Hours needed = (36 × 50) + (16 × 90) = 1,800 + 1,440 = 3,240. Cost = 3,240 × US\\$5 = US\\$16,200. Giving 3,240 is the number of hours, not the cost.",
  });
  const zero = r2(totalH * 5.75);
  chk(zero, 18630);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: zero, calculator: true, wrong: [annual, r2(totalH * 5 * 1.15 * 1.15)],
    stem: "The lodge considers using zero-hours workers instead, paid a 15% premium on the US\\$5 hourly rate but only for the 3,240 hours needed. Calculate the annual labour cost.",
    hints: ["Find the hourly rate with the premium first."],
    explanation: "Hourly rate = 5 × 1.15 = US\\$5.75. Cost = 3,240 × 5.75 = US\\$18,630. Using the US\\$5 rate gives 16,200, which ignores the premium.",
    workedSolution: "1. Hourly rate with premium = 5 × 1.15 = US\\$5.75.\n2. Annual cost = 3,240 × 5.75 = US\\$18,630.",
  });
  const staff = Math.ceil(90 / 40);
  const full = staff * 2080 * 5;
  const savingFT = full - annual;
  chk(staff, 3); chk(full, 31200); chk(savingFT, 15000);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: savingFT, calculator: true, wrong: [full, 18630 - 16200],
    stem: "A full-time employee works 2,080 hours a year at US\\$5 an hour. If the lodge employed full-time staff to cover the peak of 90 hours a week (using the smallest whole number of staff), by how much would the annual labour cost exceed the US\\$16,200 cost of annualised hours?",
    hints: ["Find how many full-time staff cover 90 hours a week, then their cost."],
    explanation: "90 ÷ 40 = 2.25, so 3 full-time staff are needed: 3 × 2,080 × 5 = US\\$31,200. Excess over annualised hours = 31,200 − 16,200 = US\\$15,000.",
    workedSolution: "1. Full-time staff needed = 90 ÷ 40 = 2.25, so 3 people.\n2. Cost = 3 × 2,080 × 5 = US\\$31,200.\n3. Excess = 31,200 − 16,200 = US\\$15,000.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain the difference between hard and soft approaches to HRM.",
    points: ["Hard HRM treats employees as a resource and a cost to be controlled", "Soft HRM treats employees as assets whose commitment is developed", "Hard uses targets, monitoring and flexible contracts; soft uses training, participation and reward"],
    modelAnswer: "Hard HRM treats employees as a resource and a cost to be controlled, using targets, monitoring and flexible contracts. Soft HRM treats them as assets whose commitment is developed, using training, participation and reward.",
    hints: ["Compare how each views employees and the tools it uses."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse one advantage and one disadvantage to a fictional restaurant in Bulawayo of employing waiting staff on zero-hours contracts.",
    points: ["Advantage: the restaurant pays only for hours needed, so wage costs fall in quiet periods", "Application: on a quiet Tuesday it need not pay staff for empty tables", "Disadvantage: workers have no security and may leave for steadier jobs", "Application: high turnover means the restaurant must recruit and train often, and service quality may fall"],
    modelAnswer: "The restaurant pays only for hours needed, so on a quiet Tuesday it does not pay staff for empty tables. But workers have no security and may leave for steadier jobs, so the restaurant must recruit and train often, and service quality may fall.",
    hints: ["Give a cost benefit and then a staff-related cost, both applied."],
    explanation: "One advantage and one disadvantage, each developed.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Assess whether a fictional bank in Lusaka should use artificial intelligence to monitor the performance of its call-centre staff.",
    points: ["It can measure call times and customer satisfaction accurately and cheaply", "Managers can target training where it is most needed", "Staff may feel watched and lose trust, which lowers morale", "It may raise stress and turnover", "Privacy and data rules must be followed", "Judgement with a reason: use it with openness about what is measured and for support, not only control"],
    modelAnswer: "AI can measure call times and customer satisfaction accurately and cheaply, and managers can target training where it is most needed. But staff may feel watched and lose trust, which lowers morale and may raise stress and turnover, and privacy and data rules must be followed. The bank should use it if it is open about what is measured and uses the results to support staff, not only to control them.",
    hints: ["Give a benefit, a risk and a condition."],
    explanation: "One point per mark; the judgement needs a reason or condition.",
  });

  const nA = 28 * 60 + 20 * 100, rateA = 4;
  chk(nA, 3680);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional business: Mlambo Garden Centre in Harare needs 60 hours of staff time a week for 28 weeks of the year and 100 hours a week for 20 weeks (the spring and summer peak). The owner can employ part-timers on annualised hours at US\\$4 an hour, paid only for the hours needed, or zero-hours workers at US\\$4.60 an hour, paid only for the hours worked.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "units", value: nA, unit: "hours", wrong: [60 + 100, 52 * 60], stem: "Calculate the total number of hours needed in the year.", explanation: "(28 × 60) + (20 × 100) = 1,680 + 2,000 = 3,680 hours." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: r2(nA * 4.6 - nA * 4), wrong: [nA * 4.6, nA * 4], stem: "Calculate how much more the zero-hours option would cost in a year than annualised hours.", explanation: "Extra cost per hour = 0.60; 3,680 × 0.60 = US\\$2,208. (Annualised: 14,720; zero-hours: 16,928.)" }),
      P.manual({ label: "(c)", marks: 5, stem: "Evaluate which arrangement the owner should choose.", points: ["Annualised hours cost US\\$2,208 less", "They give workers security and may reduce turnover", "Zero-hours workers cost more but may be easier to add or drop at short notice", "Weather affects garden centres, so demand may differ from the plan", "Judgement with a reason: annualised hours, if the demand forecast is reliable"], modelAnswer: "Annualised hours cost US\\$2,208 less and give workers security, which may reduce turnover and keep experienced staff. Zero-hours workers cost more but can be added or dropped at short notice, which helps if the weather changes demand. If the forecast of demand is reliable, annualised hours are the better choice.", hints: ["Compare cost, security and flexibility."], explanation: "Cost and flexibility weighed with a condition." }),
    ],
    hints: ["Hours needed = weeks × hours per week for each period, added together."],
    explanation: "3,680 hours; zero hours cost US\\$2,208 more; annualised hours are better if the forecast holds.",
  });

  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "A fictional business: Khumalo Couriers of Bulawayo delivers parcels using 40 self-employed drivers paid per delivery through a mobile phone app. The app tracks each driver's speed and ranks drivers by customer ratings. Drivers with low ratings receive fewer jobs. The company's costs are low, but turnover among drivers is 60% a year and the owner has received complaints about late deliveries.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Khumalo Couriers' use of self-employed drivers paid per delivery is an example of", options: [["The gig economy", "Correct: self-employed workers paid per task through a digital platform."], ["Job sharing", "No drivers share a post."], ["Flexi-time", "Drivers do not choose hours within an employer's pattern."], ["Annualised hours", "Hours are not scheduled over a year."]], answer: "A", explanation: "Payment per task through a platform is the gig economy." }),
      P.manual({ label: "(b)", marks: 4, stem: "Analyse two ways in which the app's monitoring might affect the drivers.", points: ["Constant tracking may make drivers feel watched and under pressure", "Application: drivers may hurry, increasing accidents and late deliveries", "Ranking by customer ratings may lead drivers to fear loss of work", "Application: drivers with low ratings receive fewer jobs, so they may leave for another platform"], modelAnswer: "Constant tracking of speed may make drivers feel watched and under pressure, so they may hurry, which can increase accidents and late deliveries. Ranking by ratings makes them fear loss of work, and drivers who receive fewer jobs may leave for another platform.", hints: ["Link monitoring to feelings, then behaviour."], explanation: "Two effects, each applied." }),
      P.manual({ label: "(c)", marks: 9, stem: "Evaluate whether Khumalo Couriers should change from a hard approach to a softer approach to managing its drivers.", points: [["The hard approach keeps costs low and allows quick changes in the number of drivers", 2], ["Turnover of 60% and complaints about late deliveries show costs: recruitment, training and lost customers", 2], ["A softer approach might include training, minimum earnings, feedback and a say in the app's rules", 2], ["Soft changes cost money and reduce flexibility", 1], ["The right approach depends on how much the company's reputation for reliable delivery matters", 1], ["Judgement with a reason and condition, for example move part-way to a softer approach for the best drivers", 1]], levels: [[3, 7, 9, "Weighs low cost and flexibility against turnover and reliability using the case; considers a softer package; a justified recommendation with a condition"], [2, 4, 6, "Explains the two approaches with some use of the case; judgement weakly supported"], [1, 1, 3, "Describes hard and soft HRM with little application"]], modelAnswer: "The hard approach keeps costs low and lets the company change the number of drivers quickly. But turnover of 60% and complaints about late deliveries show the costs: constant recruitment and training and lost customers. A softer approach, with training, a minimum earnings guarantee, feedback and a say in the app's rules, might keep the best drivers and improve reliability, although it would cost money and reduce flexibility. The right approach depends on how much the company's reputation for reliable delivery matters. Khumalo Couriers should move part-way to a softer approach for its best drivers and keep flexibility for the rest, then review turnover and complaints after six months.", hints: ["Compare the cost savings with the costs shown by turnover and complaints."], explanation: "Weighs flexibility and cost against turnover and reliability and recommends a partial change." }),
    ],
    hints: ["Link the app's rules to drivers' behaviour."],
    explanation: "Gig economy; monitoring causes pressure and leaving; a partial move to a softer approach may fit the company's reliability goal.",
  });

  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Mutendi Financial Services of Harare has 200 staff and receives 5,000 job applications a year. HR managers spend about 1,500 hours a year reading applications. A software supplier offers an AI system that screens CVs and ranks applicants, at a cost of US\\$18,000 a year, and could reduce the HR time spent to 300 hours. HR time costs the company US\\$15 an hour.",
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: (1500 - 300) * 15, type: "CALCULATION", wrong: [1500 * 15, 300 * 15], stem: "Calculate the annual saving in HR time if the system is introduced, before deducting the cost of the system.", explanation: "Hours saved = 1,500 − 300 = 1,200. Saving = 1,200 × 15 = US\\$18,000.", workedSolution: "1. Hours saved = 1,500 − 300 = 1,200.\n2. Saving = 1,200 × US\\$15 = US\\$18,000." }),
      P.manual({ label: "(b)", marks: 4, stem: "Analyse one benefit and one risk of the AI system for the company.", points: ["Benefit: faster shortlisting, saving HR time", "Application: 1,200 fewer hours spent reading applications", "Risk: the system may repeat past bias or reject good candidates with unusual CVs", "Application: the company could miss talented applicants and face complaints of unfairness"], modelAnswer: "The system would shortlist faster and save 1,200 hours of HR time. But it might repeat past bias or reject good candidates with unusual CVs, so the company could miss talented applicants and face complaints of unfairness.", hints: ["Use the figures in the case."], explanation: "A benefit and a risk, each applied." }),
      P.manual({ label: "(c)", marks: 8, stem: "Evaluate whether Mutendi Financial Services should introduce the AI system.", points: [["The direct saving equals the cost of the system (US\\$18,000), so there is no net financial gain", 2], ["Benefits not in the saving: faster responses to candidates, and HR staff free for other work", 1], ["Risks: bias, unfairness, loss of personal contact, and applicants' data", 2], ["The company can check a sample of rejected applications to reduce the risk", 1], ["Soft HRM suggests that human contact with candidates builds the company's reputation", 1], ["Judgement with a reason and time-frame, for example a trial for a year with human checks", 1]], levels: [[3, 6, 8, "Uses the cost and saving figures and the risks from the case; considers safeguards and non-financial factors; a justified recommendation with a time-frame"], [2, 3, 5, "Explains benefits and risks with some use of the figures; judgement weakly supported"], [1, 1, 2, "Describes AI in recruitment with little application"]], modelAnswer: "The saving in HR time is worth US\\$18,000, exactly the cost of the system, so there is no net financial gain in the first year. The benefits that remain are faster responses to candidates and HR staff freed for other work, but the risks are that the system repeats bias, rejects good applicants and removes personal contact, and it holds personal data. The company can check a sample of rejected applications to reduce the risk. Because the financial case is neutral and the risks are real, Mutendi should run a one-year trial with human checks and decide on continuing after reviewing the quality of appointments.", hints: ["Compare the saving with the cost, then weigh the other benefits and risks."], explanation: "Weighs a neutral financial case against benefits and risks and recommends a trial." }),
    ],
    hints: ["Hours saved × hourly cost of HR time."],
    explanation: "Saving US\\$18,000 equals the cost; the case rests on non-financial benefits and risks; trial with human checks.",
  });

  b.card("DEFINITION", "Hard HRM", "Treating employees as a resource to be used efficiently, with tight control, targets and flexible numbers to keep labour cost low.");
  b.card("DEFINITION", "Soft HRM", "Treating employees as assets whose commitment is developed through communication, training, participation and reward.");
  b.card("FACT", "Zero-hours contract", "No guaranteed hours; the worker is paid only for hours worked. Maximum flexibility for the employer; insecurity for the worker.");
  b.card("FACT", "Annualised hours", "A total number of hours over the year, scheduled to match demand; fewer overtime payments but harder to plan.");
  b.card("FACT", "Other flexible arrangements", "Part-time, temporary, flexi-time, compressed hours, job sharing, home working, shift working and the gig economy.");
  b.card("CONCEPT", "Flexible contracts: balance", "They lower cost and match labour to demand but can reduce commitment, security and loyalty and raise turnover.");
  b.card("FACT", "IT and AI in HRM", "Recruitment screening, monitoring, e-learning and workforce planning: faster and cheaper, but risks of bias, privacy loss and mistrust.");
  b.card("CONCEPT", "Choosing hard or soft", "Hard suits routine work and tight margins; soft suits skilled work where service and ideas matter. Most firms use a mix.");
  b.card("FORMULA", "Hours and cost for flexible labour", "Hours needed = weeks × hours per week for each period, added; cost = hours × rate (rate × (1 + premium) for zero-hours).");
});
