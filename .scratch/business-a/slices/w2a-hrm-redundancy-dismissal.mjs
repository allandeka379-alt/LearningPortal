// W2a: hrm.redundancy-dismissal
import { concept, P, chk, r2 } from "../lib.mjs";
import { mc } from "../tables/w2a-lib.mjs";

concept("abus.hrm.redundancy-dismissal", { file: "hrm/redundancy-dismissal", keyPrefix: "hrm.redundancy-dismissal" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is **redundancy**?",
    ok: ["Losing a job that is no longer needed", "Correct: the worker has done nothing wrong."],
    bad: [["The loss of a job because of serious misconduct", "That describes dismissal for misconduct."], ["A worker choosing to move to a rival firm", "That is resignation."], ["A promotion to a more senior post", "A promotion is not a loss of a job."]],
    explanation: "Redundancy ends a post that is no longer needed; it is not caused by the worker's conduct.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of the following is a **fair reason for dismissal**?",
    ok: ["Theft from the employer", "Correct: serious misconduct is a valid reason."],
    bad: [["Joining a trade union", "Dismissing a worker for union membership is unfair."], ["Being pregnant", "Dismissal for pregnancy is unfair."], ["Complaining about unsafe conditions", "Dismissal for a complaint is unfair."]],
    explanation: "Theft is serious misconduct and can be a fair reason if the correct procedure is followed.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which method **avoids compulsory redundancy** by not replacing workers who leave?",
    ok: ["Natural wastage", "Correct: numbers fall as people leave of their own accord."],
    bad: [["Summary dismissal", "Summary dismissal is for serious misconduct."], ["Compulsory retirement of all staff", "This is a drastic and unfair step."], ["Immediate closure of the business", "Closure ends all jobs."]],
    explanation: "Natural wastage reduces the workforce without making anyone redundant.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "In a normal disciplinary procedure, what usually comes **before** a final written warning?",
    ok: ["A verbal warning and a written warning", "Correct: the steps rise in order of seriousness."],
    bad: [["Immediate dismissal for any lateness", "Dismissal for a first minor offence would be unfair."], ["A pay rise to improve conduct", "A pay rise is not a step in discipline."], ["A hearing after dismissal has taken place", "The hearing comes before dismissal."]],
    explanation: "A usual procedure moves from an informal talk through warnings to a hearing, dismissal and appeal.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional bakery in Mutare dismisses a baker on the day that she tells the owner she is expecting a baby. No warnings were given and she had no previous problems. This dismissal is most likely to be",
    ok: ["Unfair, because pregnancy is not a valid reason here", "Correct: pregnancy is not a valid reason, and no procedure was followed."],
    bad: [["Fair, because the owner may dismiss anyone", "An employer cannot dismiss for any reason and without procedure."], ["A redundancy, because the job is no longer needed", "The baker's job still exists."], ["Voluntary, because the baker agreed to leave", "She was dismissed, not given a choice."]],
    hints: ["Is there a valid reason, and was the procedure followed?"],
    explanation: "A dismissal because of pregnancy, with no procedure, is unfair.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What is a likely effect on the **morale of workers who remain** after a round of redundancies?",
    ok: ["Fear for their own jobs", "Correct: survivors worry that they will be next."],
    bad: [["A stronger belief that jobs are secure", "Redundancies usually make jobs feel less secure."], ["More willingness to take extra work for free", "Fear and overwork reduce motivation."], ["No effect at all on their motivation", "The effects usually continue after the leavers go."]],
    hints: ["Think of how remaining staff feel about their own futures."],
    explanation: "Survivors often feel insecure and less motivated, and the most employable may leave.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional factory in Bulawayo must cut its wage bill by 15%. Which is the best reason to try natural wastage and shorter hours **before** compulsory redundancy?",
    ok: ["They avoid costs and damage to morale", "Correct: no payments or fear among staff, and skills are kept."],
    bad: [["They always save more than redundancy does", "They may save less, or take longer."], ["They are certain to meet the target", "There is no guarantee they will achieve the cut."], ["They remove all need to talk to workers", "Workers must still be consulted."]],
    hints: ["Compare the costs of each approach, including those that are not money."],
    explanation: "Alternatives avoid redundancy payments, keep skills and protect morale, although they may work more slowly.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A worker who is made redundant has usually been dismissed for poor conduct.",
    answer: false,
    explanation: "False. Redundancy happens because the job is no longer needed. The worker is not at fault.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "An employer who follows the correct disciplinary procedure reduces the risk of a dismissal being found unfair.",
    answer: true,
    explanation: "True. Warnings, a hearing and an appeal show that the worker was treated fairly.",
    hints: ["Think about the evidence an employer would need."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [["Voluntary redundancy", "Workers choose to leave, usually for a payment"], ["Compulsory redundancy", "The employer selects the workers to go"], ["Summary dismissal", "Dismissal without notice for very serious misconduct"], ["Natural wastage", "Not replacing workers who leave"]],
    explanation: "Each term describes a different way jobs end or numbers fall.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "{{blank:a}} happens when a job is no longer needed, while {{blank:b}} happens because of the worker's conduct or capability.",
    blanks: [
      { id: "a", accepted: ["Redundancy"], choices: ["Redundancy", "Dismissal", "Promotion"] },
      { id: "b", accepted: ["dismissal"], choices: ["redundancy", "dismissal", "recruitment"] },
    ],
    explanation: "Redundancy concerns the job; dismissal concerns the worker.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** way in which a business can reduce the need for redundancies.",
    accepted: ["natural wastage", "freeze recruitment", "recruitment freeze", "retraining", "redeployment", "shorter hours", "job sharing", "early retirement", "reduce hours", "cut other costs", "voluntary redundancy", "part-time working"],
    explanation: "Accept natural wastage, a recruitment freeze, retraining or redeployment, shorter hours or job sharing, or early retirement.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of dismissal that has no valid reason or does not follow the correct procedure.",
    accepted: ["unfair dismissal", "unfair", "wrongful dismissal", "unlawful dismissal"],
    explanation: "Unfair dismissal can lead to compensation or reinstatement.",
  });

  const weekly = 96, weeksPerYear = 3, years = 7;
  const pay1 = r2(weekly * weeksPerYear * years);
  chk(pay1, 2016);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: pay1, calculator: true, daily: true, wrong: [weekly * years, weekly * weeksPerYear],
    stem: "A fictional furniture factory in Chinhoyi has a policy of paying three weeks' pay for each full year of service to a worker made redundant (a policy assumption). A worker with seven full years of service earns US\\$96 a week. Calculate the redundancy payment due.",
    hints: ["Find the number of weeks' pay first."],
    explanation: "Weeks' pay due = 3 × 7 = 21. Payment = 21 × 96 = US\\$2,016. Using 7 weeks gives 672 and using 3 weeks gives 288.",
  });
  const w2 = 110, y2 = [4, 9];
  const weeks2 = y2.reduce((s, y) => s + y * 3, 0);
  const total2 = r2(weeks2 * w2);
  const saving2 = w2 * y2.length;
  const recover = total2 / saving2;
  chk(weeks2, 39); chk(total2, 4290); chk(recover, 19.5);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "weeks", dp: 1, value: recover, calculator: true, wrong: [total2, r2(total2 / w2)],
    stem: "Using the same policy of three weeks' pay for each full year of service, a fictional bus company in Mutare makes two drivers redundant. They have 4 and 9 full years of service and each earns US\\$110 a week. The posts will not be replaced. After how many weeks will the wages saved equal the total redundancy payments? Give your answer to one decimal place.",
    hints: ["Find the total payment, then the weekly wage saved by losing both drivers."],
    explanation: "Weeks' pay = 3 × (4 + 9) = 39. Total payment = 39 × 110 = 4,290. Weekly saving = 2 × 110 = 220. Recovery time = 4,290 ÷ 220 = 19.5 weeks. Dividing by one driver's wage (110) gives 39 weeks.",
    workedSolution: "1. Weeks' pay due = 3 × 4 + 3 × 9 = 12 + 27 = 39.\n2. Total payment = 39 × 110 = US\\$4,290.\n3. Weekly wages saved = 2 × 110 = US\\$220.\n4. Weeks to recover = 4,290 ÷ 220 = 19.5 weeks.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain the difference between redundancy and dismissal.",
    points: ["Redundancy occurs because the job is no longer needed", "Dismissal occurs because of the worker's conduct or capability", "In redundancy the worker is not at fault; in dismissal the worker usually is"],
    modelAnswer: "Redundancy occurs when a job is no longer needed, for example because demand has fallen, so the worker is not at fault. Dismissal occurs because of the worker's conduct or capability, so the worker is usually at fault.",
    hints: ["Think about the reason for the job ending."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional supermarket in Masvingo must reduce its staff by ten. Explain **two** ways it could reduce the number of compulsory redundancies.",
    points: ["Natural wastage: not replacing staff who leave", "Application: with regular leavers from cashier posts, the supermarket may reach part of the target without redundancies", "Retraining and redeployment into other departments", "Application: cashiers could be retrained for the new online order picking service"],
    modelAnswer: "The supermarket could use natural wastage, not replacing staff who leave, and since cashiers often leave it may reach part of the target without redundancies. It could also retrain and redeploy staff, for example moving cashiers into the new online order-picking service.",
    hints: ["Link each method to the supermarket."],
    explanation: "Two methods, each applied.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional manufacturer in Bulawayo plans to make 30 of its 200 workers redundant to cut costs. Assess the likely effect of this decision on the business.",
    points: ["Wage costs fall, which can raise profit if output is maintained", "Redundancy payments and administration are a short-term cost", "Morale and trust among the remaining workers may fall, with a risk of lower output", "The best workers may leave first because they find jobs most easily", "Fewer staff may cause overwork and quality problems", "Judgement with a reason: worthwhile if demand has truly fallen and the work is reorganised; not if the fall is temporary"],
    modelAnswer: "Cutting 30 jobs reduces wage costs, which can raise profit if output is maintained, but redundancy payments are a short-term cost. Morale among the remaining workers may fall and the best workers may leave first, and fewer staff may cause overwork and quality problems. The decision is worthwhile if demand has truly fallen and the work is reorganised, but not if the fall in demand is temporary.",
    hints: ["Give a short-term and a long-term effect, then a condition."],
    explanation: "One point per mark; judgement with a condition.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional business: Tshuma Clothing of Bulawayo pays a redundancy payment of three weeks' pay for each full year of service (a policy assumption). Because of falling orders, it will make redundant a cutter, Thandeka, who has 6 full years of service and earns US\\$102 a week. The owner is also reviewing a worker, Sipho, who has been absent without permission eleven times this year, has had a verbal warning and a written warning, and has not improved.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: 3 * 6 * 102, wrong: [6 * 102, 3 * 102], stem: "Calculate the redundancy payment to Thandeka.", explanation: "Weeks' pay due = 3 × 6 = 18. Payment = 18 × 102 = US\\$1,836." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which of the following is the best description of the end of Thandeka's employment?", options: [["Redundancy", "Correct: her job is no longer needed."], ["Dismissal for misconduct", "She has done nothing wrong."], ["Resignation", "She did not choose to leave."], ["Retirement", "Nothing is said about her age."]], answer: "A", explanation: "The job is no longer needed, so it is a redundancy." }),
      P.manual({ label: "(c)", marks: 6, stem: "Evaluate whether it would be fair to dismiss Sipho now.", points: ["He has been absent without permission eleven times, which is a conduct issue", "He has already had a verbal warning and a written warning", "A final written warning has not yet been given", "He should be given a hearing at which he can state his case, and a right of appeal", "Dismissal without the final steps could be found unfair, with compensation or reinstatement", "Judgement with a reason: issue a final warning and hold a hearing; dismissal is fair only if the procedure is completed and conduct does not improve"], modelAnswer: "Eleven unauthorised absences are a serious conduct problem, and he has already had a verbal and a written warning without improving. However, a final written warning has not been given and he has not had a hearing at which he can state his case. Dismissing him now could be found unfair, with compensation or reinstatement. The owner should give a final warning and hold a hearing; if conduct still does not improve, dismissal would then be fair.", hints: ["Which steps of the procedure remain?"], explanation: "Weighs the conduct against the procedure still to be followed." }),
    ],
    hints: ["Weeks' pay due = 3 × years of service."],
    explanation: "Payment US\\$1,836; the job ending is redundancy; dismissal should follow the procedure.",
  });

  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "A fictional business: Makoni Fruit Packers of Mutare employs 120 workers. Exports have fallen and the managers must cut costs by US\\$6,000 a month. Options: (1) make 12 packers redundant at an average wage of US\\$500 a month, (2) cut hours so that all workers lose 5% of pay, or (3) freeze recruitment and let natural wastage reduce staff by about 3 a month over four months. The workers' representative has asked that the managers consult staff.",
    parts: [
      P.group({ label: "(a)", stem: "Calculate the monthly saving from:", parts: [
        P.num({ label: "(i)", marks: 1, kind: "money", value: 12 * 500, wrong: [500], stem: "option 1;", explanation: "12 × US\\$500 = US\\$6,000." }),
        P.num({ label: "(ii)", marks: 1, kind: "money", value: 120 * 500 * 0.05, wrong: [6000], stem: "option 2, assuming an average wage of US\\$500 a month for each of the 120 workers.", explanation: "5% of the wage bill = 0.05 × 120 × 500 = US\\$3,000." }),
      ] }),
      P.manual({ label: "(b)", marks: 4, stem: "Analyse two effects of option 1 on the remaining workers.", points: ["Remaining workers may fear for their own jobs", "Application: fear of further cuts may lower their motivation and output", "The workload of the remaining workers may rise", "Application: with 12 fewer packers the fruit may be packed slowly, causing errors or delays"], modelAnswer: "The remaining workers may fear for their own jobs, so their motivation and output may fall. With 12 fewer packers the workload of those who remain will rise, so fruit may be packed slowly and errors or delays may occur.", hints: ["Think of how the survivors feel and what they must do."], explanation: "Two effects, each applied." }),
      P.manual({ label: "(c)", marks: 8, stem: "Evaluate which option the managers should choose.", points: [["Option 1 meets the target exactly (US\\$6,000) but costs redundancy payments and morale", 2], ["Option 2 saves only US\\$3,000, so it does not meet the target alone", 2], ["Option 3 keeps all current workers' jobs but is slow, saving about US\\$1,500 a month after one month and US\\$6,000 only after four months", 2], ["Consultation with staff reduces resistance and may produce ideas", 1], ["Judgement with a reason and time-frame, for example a combination of options 2 and 3, reviewed monthly", 1]], levels: [[3, 6, 8, "Compares the savings and the costs of the options using the data; considers morale and consultation; a justified recommendation with a time-frame"], [2, 3, 5, "Explains two or more options with some use of the data; judgement weakly supported"], [1, 1, 2, "Describes the options with little comparison"]], modelAnswer: "Option 1 meets the target of US\\$6,000 a month at once, but it needs redundancy payments, and the loss of 12 workers would damage morale and could slow packing. Option 2 saves only US\\$3,000, so it does not meet the target alone. Option 3 avoids compulsory redundancies, but it is slow: the saving of about US\\$1,500 a month after one month reaches US\\$6,000 only after four months. A combination of options 2 and 3 would keep jobs and reach the target within four months, if staff accept a pay cut. The managers should consult the workers and review the position every month.", hints: ["Compare each option's saving with the target and with the effects on staff."], explanation: "Weighs savings against costs and morale and recommends a combination." }),
    ],
    hints: ["Option 2: 5% of the total wage bill."],
    explanation: "Option 1 saves US\\$6,000, option 2 saves US\\$3,000; option 3 is slow; a combination with consultation is sensible.",
  });

  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Zuva Transport of Harare employs 60 drivers. A driver, Chipo, was dismissed immediately after a minor accident that caused US\\$150 damage; no warnings had been given and no hearing held. Chipo has worked there for seven years with no previous problems. She has complained to the labour authorities. Other drivers say that they fear the same could happen to them, and two have already applied to join a rival firm.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Analyse why Chipo's dismissal may be found unfair.", points: ["The accident was minor and she has no previous problems, so the reason may not justify dismissal", "No warnings were given", "No hearing was held at which she could state her case", "Application: she has seven years' good service, so a warning or retraining would have been the proportionate response"], modelAnswer: "The accident was minor and Chipo has seven years of service without problems, so the reason may not justify dismissal. No warnings were given and no hearing was held at which she could state her case, so the procedure was not followed. A warning or retraining would have been a more proportionate response.", hints: ["Look at the reason and at the procedure."], explanation: "Reason and procedure." }),
      P.manual({ label: "(b)", marks: 10, stem: "Evaluate the likely consequences for Zuva Transport of the way it handled this dismissal and what it should do now.", points: [["Possible compensation or reinstatement if the dismissal is found unfair", 2], ["Legal and administrative costs of the dispute", 1], ["Drivers' fear and loss of trust, shown by two applications to a rival", 2], ["Costs of recruiting and training replacements for drivers who leave", 1], ["Damage to the reputation of the company as an employer", 1], ["The company should review the case, consider reinstatement or a settlement, and adopt a clear disciplinary procedure", 2], ["Judgement with a reason and time-frame", 1]], levels: [[3, 8, 10, "Analyses the financial, legal and morale consequences using the case; evaluates the remedies; a justified recommendation with a time-frame"], [2, 4, 7, "Explains several consequences with some use of the case; judgement weakly supported"], [1, 1, 3, "Lists consequences with little application"]], modelAnswer: "If the dismissal is found unfair, Zuva Transport may have to pay compensation or reinstate Chipo, and it will face the legal and administrative costs of the dispute. The other drivers fear that they could be treated in the same way, and two have already applied to join a rival, so the company may lose more drivers and face the cost of recruiting and training replacements. The company's reputation as an employer will suffer, making recruitment harder. It should review the case at once, consider reinstating Chipo or reaching a settlement, and introduce a written disciplinary procedure with warnings, a hearing and an appeal. Doing this within the month would limit the loss of drivers and restore trust.", hints: ["Consider the cost of the dispute, the effect on other drivers, and what should be done now."], explanation: "Consequences and remedies weighed and a time-framed recommendation made." }),
    ],
    hints: ["A minor accident with a good record does not usually justify immediate dismissal."],
    explanation: "Unfair because of the reason and lack of procedure; the company should settle and adopt a clear procedure.",
  });

  b.card("DEFINITION", "Redundancy", "The ending of a worker's job because the job is no longer needed; the worker is not at fault.");
  b.card("DEFINITION", "Dismissal", "The ending of employment by the employer because of the worker's conduct or capability.");
  b.card("DEFINITION", "Unfair dismissal", "A dismissal without a valid reason or without the correct procedure; may lead to compensation or reinstatement.");
  b.card("FACT", "Steps of a disciplinary procedure", "Informal talk, verbal warning, written warning, final written warning, hearing, dismissal, appeal.");
  b.card("FACT", "Ways to avoid redundancy", "Natural wastage, recruitment freeze, retraining and redeployment, shorter hours, job sharing, early retirement.");
  b.card("CONCEPT", "Voluntary against compulsory redundancy", "Voluntary: workers choose to leave, usually for a payment. Compulsory: the employer chooses, using fair criteria.");
  b.card("FACT", "Effects of redundancy", "Short-term payments; savings in wages later; lower morale and trust; the best workers may leave first.");
  b.card("CONCEPT", "Summary dismissal", "Dismissal without notice for very serious misconduct, which the employer must still be able to prove.");
  b.card("FACT", "ZIMSEC detail: legal procedure", "ZIMSEC stresses following the procedure in labour legislation for discipline and dismissal; refer to the law generally.", undefined, { applies: ["zimsec"] });
});
