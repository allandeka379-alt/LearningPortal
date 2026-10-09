// W3a: employment contracts and legal controls (Cambridge 0264 only).
import { concept, P } from "../lib.mjs";

concept("bus.people.employment-contracts", { file: "people/employment-contracts", keyPrefix: "people.employment-contracts" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a contract of employment?",
    options: [
      ["A legal agreement setting out the terms and conditions of a job", "Correct: it binds employer and employee."],
      ["An advertisement placed in a newspaper for a job vacancy", "An advert attracts applicants."],
      ["A list of the skills needed for a job", "That is a person specification."],
      ["A letter from a previous employer", "That is a reference."],
    ],
    answer: "A",
    explanation: "A **contract of employment** is a legal agreement on pay, hours, duties, leave, notice and procedures.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which item is normally included in a contract of employment?",
    options: [
      ["The notice period", "Correct: how much warning either side must give."],
      ["The business's sales target for next year", "Business targets are not contract terms."],
      ["The names of the business's suppliers", "Suppliers are not part of an employee's contract."],
      ["The employee's school report", "School reports are not contract terms."],
    ],
    answer: "A",
    explanation: "Contracts include job title, duties, hours, pay, leave, notice period and disciplinary procedures.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How does a contract of employment benefit an employer?",
    options: [
      ["The employee's duties and hours are clear and can be expected", "Correct: both sides know what is agreed."],
      ["The employer can change pay and hours whenever it wishes", "Changes need agreement; the contract protects the employee."],
      ["The employer need not pay for sick leave", "Sick leave is often a contract term."],
      ["The employee can never resign", "Employees can resign by giving notice."],
    ],
    answer: "A",
    explanation: "Clear terms reduce disputes and let the employer expect agreed work; the notice period gives time to replace leavers.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A business refuses to promote a qualified woman to supervisor only because she is a woman. Which legal control has it broken?",
    options: [
      ["Laws against discrimination", "Correct: she is treated less favourably because of gender."],
      ["Health and safety laws", "This is not about safe conditions."],
      ["Minimum wage laws", "Her pay rate is not the issue."],
      ["Consumer protection laws", "These protect customers, not employees."],
    ],
    answer: "A",
    explanation: "Treating someone less favourably because of gender is **discrimination**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a likely effect of health and safety laws on employers?",
    options: [
      ["Higher costs for equipment and training", "Correct: safety has a cost."],
      ["Lower wages paid to all workers in the business", "Safety laws do not cut wages."],
      ["More accidents at work", "The aim and effect is fewer accidents."],
      ["No need to train employees", "Safe working usually requires training."],
    ],
    answer: "A",
    explanation: "Safety laws add costs (equipment, training) but reduce injuries, lost days and compensation claims.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A minimum wage is raised. Which is the most likely response of a business employing many low-paid workers?",
    options: [
      ["It looks for ways to use fewer workers, such as more machines", "Correct: higher labour costs encourage substitution."],
      ["It employs more workers and keeps paying the old wage", "Paying below the legal minimum is illegal."],
      ["Its wage costs fall", "Wage costs rise."],
      ["It stops paying overtime", "Overtime still has to be paid at the agreed rate."],
    ],
    answer: "A",
    hints: ["What happens to the cost of labour?"],
    explanation: "Higher wage costs may lead to higher prices, lower profit, fewer workers or more machines.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which situation is most likely to be unfair dismissal?",
    options: [
      ["A worker is dismissed without warning for being five minutes late once", "Correct: no fair reason or procedure."],
      ["A worker is dismissed after being caught stealing stock", "Theft is serious misconduct, a fair reason."],
      ["A worker is dismissed after several written warnings for poor work", "A fair procedure was followed."],
      ["A worker resigns and works the notice period", "Resignation is not dismissal."],
    ],
    answer: "A",
    hints: ["Was there a fair reason and a fair procedure?"],
    explanation: "Dismissal must be for a fair reason and follow a fair procedure, such as warnings.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A contract of employment usually states the employee's hours of work and rate of pay.",
    answer: true,
    explanation: "True. Hours and pay are among the main contents of a contract.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Laws against discrimination only affect how a business recruits, not how it promotes or pays workers.",
    answer: false,
    explanation: "False. Equal treatment applies to recruitment, pay, training and promotion.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each legal control with its main purpose.",
    pairs: [
      ["Unfair dismissal law", "Protects workers from losing jobs without fair reason"],
      ["Anti-discrimination law", "Ensures equal treatment regardless of gender or race"],
      ["Health and safety law", "Ensures safe working conditions"],
      ["Minimum wage law", "Sets the lowest legal rate of pay"],
    ],
    explanation: "Each law protects employees in a different way and places duties on employers.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "The amount of warning an employer or employee must give before ending a contract is called the {{blank:a}} period.",
    blanks: [{ id: "a", accepted: ["notice"], choices: ["notice", "probation", "induction"] }],
    explanation: "The **notice period** is stated in the contract.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the lowest rate of pay that employers are allowed by law to pay.",
    accepted: ["minimum wage", "the minimum wage", "national minimum wage", "statutory minimum wage"],
    wrong: ["salary"],
    explanation: "A **minimum wage** sets a legal floor on pay.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **two** benefits to an employee of having a written contract of employment.",
    points: [
      "Knows pay, hours and duties.",
      "So cannot be made to work extra hours or have pay cut without agreement.",
      "Notice period / disciplinary procedure stated.",
      "Gives job security / evidence if the employer breaks the terms.",
    ],
    hints: ["Think about certainty and protection."],
    modelAnswer: "The employee knows the agreed pay, hours and duties, so the employer cannot cut pay or demand extra hours without agreement. The contract also states the notice period and disciplinary procedure, giving security and evidence if the employer acts unfairly.",
    explanation: "Contracts give certainty and legal protection.",
  });
  b.manualShort({
    d: 4, marks: 6, skill: "EVALUATION",
    stem: "Discuss whether health and safety laws are good or bad for a business such as a mine.",
    points: [
      "Bad: cost of protective equipment, training, inspections.",
      "Bad: may slow production / need to stop unsafe work.",
      "Good: fewer accidents, so fewer lost working days and compensation claims.",
      "Good: better motivation / easier recruitment / reputation.",
      "Good: avoids fines or closure by inspectors.",
      "Justified conclusion: long-term benefits likely outweigh costs in a dangerous industry.",
    ],
    hints: ["Weigh short-term costs against long-term savings."],
    modelAnswer: "Safety laws force a mine to buy protective equipment, train workers and allow inspections, raising costs, and unsafe work may have to stop. However, fewer accidents mean fewer lost days, lower compensation claims and less risk of fines or closure. Workers feel safer, so they are more motivated and easier to recruit. In a dangerous industry like mining, the long-term benefits outweigh the costs, so the laws are good for the business.",
    explanation: "Costs now against savings and reputation later.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 840,
    stem: "Chipo runs a small factory in Bulawayo making cleaning products. Her 20 workers have no written contracts. Some workers say they are often asked to work late without extra pay, and one worker was told to leave on the spot after a disagreement with a supervisor. Chemicals are stored in an unlocked room near the canteen.",
    parts: [
      P.manual({
        label: "(a)", marks: 3,
        stem: "Identify **three** items that should be in the workers' contracts of employment.",
        points: ["Hours of work (and overtime).", "Rate of pay.", "Notice period / disciplinary procedure / duties / leave."],
      }),
      P.mcq({
        label: "(b)", marks: 1,
        stem: "Which legal control is most likely to have been broken when the worker was told to leave on the spot?",
        options: [["Unfair dismissal", "Correct: no fair reason or procedure."], ["Minimum wage", "Pay rates are not mentioned."], ["Discrimination", "No unequal treatment because of a characteristic is described."], ["Consumer protection", "This protects customers."]],
        answer: "A",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Evaluate the effects on Chipo's business of obeying health and safety laws.",
        points: [
          "Cost of secure storage, protective clothing and training.",
          "Time and money to reorganise the factory.",
          "Fewer accidents / poisoning risk near the canteen removed.",
          "Fewer lost working days and compensation claims; avoids fines or closure.",
          "Improved motivation and reputation with workers who already feel unfairly treated.",
          "Justified judgement.",
        ],
        modelAnswer: "Chipo would have to pay for a locked chemical store away from the canteen, protective clothing and training, which raises costs. However, unlocked chemicals near food are a serious risk; an accident could injure workers, lead to compensation claims and fines, or the factory could be closed. Safer conditions would also improve morale among workers who already feel badly treated. Overall the benefits outweigh the costs, because one serious accident could end the business.",
      }),
    ],
    hints: ["(b) Was there a fair reason and procedure?", "(c) Consider costs and the risk of an accident."],
    explanation: "Contracts and legal controls protect workers; obeying them adds costs but reduces bigger risks.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "The government of a country announces a large increase in the minimum wage. Farai owns a chain of three restaurants in Mutare that employ 45 waiters and kitchen staff, most of them paid at the old minimum wage. His profit margins are already low, and a rival has just opened nearby.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Explain what is meant by a **minimum wage**.",
        points: ["The lowest rate of pay set by law.", "Employers cannot legally pay less."],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **one** benefit and **one** problem the increase could bring to Farai's restaurants.",
        points: [
          "Benefit: staff more motivated / lower labour turnover.",
          "Explained: better service / lower recruitment and training costs.",
          "Problem: wage costs rise.",
          "Explained: lower profit, already-low margins squeezed.",
        ],
        modelAnswer: "Higher pay may motivate staff and reduce labour turnover, improving service and cutting recruitment costs. However, wage costs for 45 staff will rise sharply, squeezing Farai's already low profit margins.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Recommend how Farai should respond to the increase. Justify your answer.",
        points: [
          "Option: raise menu prices; risk of losing customers to the new rival.",
          "Option: cut staff or hours; risk to service quality.",
          "Option: improve productivity (rosters matched to busy times, part-time staff).",
          "Option: accept lower profit in the short run.",
          "Uses case: low margins and a new rival limit price rises.",
          "Justified recommendation.",
        ],
        modelAnswer: "Farai cannot easily raise prices because a rival has just opened nearby, so customers could switch. Cutting staff would reduce costs but might slow service and drive customers to the rival. A better response is to raise productivity: match rosters to busy times, use some part-time staff, and make small price rises on popular items only. Better-paid staff may also give better service, helping him compete. I recommend this combination, accepting slightly lower profit in the short term.",
      }),
    ],
    hints: ["(c) Consider prices, staffing and the new competitor."],
    explanation: "A minimum-wage rise raises costs; the best response depends on competition and productivity.",
  });
  b.card("DEFINITION", "What is a **contract of employment**?", "A legal agreement between employer and employee setting out the terms and conditions of the job.");
  b.card("FACT", "Main contents of a contract?", "Job title and duties, start date, place, hours, pay, leave, notice period, disciplinary and grievance procedures, benefits.");
  b.card("CONCEPT", "Benefits of a contract to the employer?", "Clear duties and hours, fewer disputes, notice period to replace leavers.");
  b.card("DEFINITION", "What is **unfair dismissal**?", "Ending a contract without a fair reason or without following a fair procedure.");
  b.card("DEFINITION", "What is **discrimination** at work?", "Treating a person less favourably because of gender, race, religion, age, disability or similar.");
  b.card("CONCEPT", "Effects of health and safety laws on employers?", "Costs of equipment, training and inspections; fewer accidents, lost days and claims; better motivation.");
  b.card("CONCEPT", "Effects of a higher minimum wage on employers?", "Higher wage costs: higher prices, lower profit, fewer workers or more machines; possibly better motivation.");
  b.card("CONCEPT", "Dismissal or redundancy?", "Dismissal: because of the employee's conduct or ability. Redundancy: the job is no longer needed.");
});
