// W2b: motivation.needs-maslow-herzberg
import { concept, P } from "../lib.mjs";
import { mc, pmc } from "../tables/w2b-lib.mjs";

concept("abus.motivation.needs-maslow-herzberg", { file: "motivation/needs-maslow-herzberg", keyPrefix: "motivation.needs-maslow-herzberg" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which level of Maslow's hierarchy of needs is at the **top**?",
    ok: ["Self-actualisation", "Correct: fulfilling one's potential is the highest level."],
    bad: [["Esteem (respect and status)", "Esteem is the fourth level, just below self-actualisation."], ["Social", "Social needs are the third level."], ["Safety", "Safety is the second level, above physiological needs."]],
    explanation: "From the bottom: physiological, safety, social, esteem, self-actualisation.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which theorist divided the factors affecting job satisfaction into **hygiene factors and motivators**?",
    ok: ["Herzberg", "Correct: Frederick Herzberg's two-factor theory."],
    bad: [["Maslow (hierarchy of needs)", "Maslow wrote about a hierarchy of five needs."], ["Taylor", "Taylor is linked with scientific management."], ["Mayo", "Mayo is linked with the human relations school."]],
    explanation: "Herzberg's two-factor theory separates hygiene factors from motivators.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In Herzberg's theory, which of the following is a **hygiene factor**?",
    ok: ["Job security", "Correct: security is part of the job's conditions and prevents dissatisfaction."],
    bad: [["Recognition", "Recognition is a motivator."], ["Responsibility", "Responsibility is a motivator."], ["Achievement", "Achievement is a motivator."]],
    explanation: "Hygiene factors are pay, conditions, policy, supervision, relationships and security. Achievement, recognition and responsibility are motivators.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A worker in a fictional Gweru factory has a safe workplace, a permanent contract and a good wage but now wants to be respected by colleagues. Which level of Maslow's hierarchy is he seeking?",
    ok: ["Esteem", "Correct: respect and status are esteem needs."],
    bad: [["Safety", "His safety needs are already met by the safe workplace and permanent contract."], ["Physiological", "A good wage already meets his basic needs."], ["Self-actualisation", "This is a higher level, reached only after esteem needs are met."]],
    explanation: "Physiological and safety needs are met, so the next unmet level is social or esteem; wanting respect is an esteem need.",
    hints: ["Which levels are already satisfied?"],
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A manager of a fictional tuck shop in Masvingo raises wages, but staff are still unhappy because they feel their work is never noticed. According to Herzberg, the pay rise most likely",
    ok: ["Reduced dissatisfaction without motivating", "Correct: pay is a hygiene factor, so it removes a cause of complaint but does not create lasting motivation."],
    bad: [["Provided a lasting motivator for all staff", "Pay is a hygiene factor, not a motivator."], ["Met the staff's esteem needs fully", "Esteem needs are met by recognition, which pay does not supply."], ["Made the staff more dissatisfied", "A higher wage is more likely to remove dissatisfaction than to cause it."]],
    explanation: "Herzberg argues that hygiene factors only prevent dissatisfaction. The staff still lack recognition, which is a motivator.",
    hints: ["Is pay a hygiene factor or a motivator?"],
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Which action is an example of **job enrichment**, as suggested by Herzberg?",
    ok: ["Letting a till operator plan the weekly rota", "Correct: more responsibility and decision-making make the job itself more rewarding."],
    bad: [["Adding a second routine task of the same type", "This is job enlargement, which adds similar work and is less powerful."], ["Paying a bonus for each sale made", "A bonus is a financial reward, not a change to the job itself."], ["Moving the operator to a different till every day", "This is job rotation, not enrichment."]],
    explanation: "Job enrichment gives more responsibility and control. Enlargement adds similar tasks and rotation moves the worker between tasks.",
    hints: ["Enrichment changes how much responsibility the job carries."],
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is a valid **criticism of Maslow's hierarchy** as a guide for managers?",
    ok: ["People may not satisfy needs in the order given", "Correct: individuals and cultures differ, so the order is not fixed."],
    bad: [["It was written only for the clothing industry", "The theory is general and was not written for a single industry."], ["It claims that money is the only need", "Maslow identified five levels of need, not just money."], ["It says that satisfied needs still motivate strongly", "The theory says a satisfied need no longer motivates."]],
    explanation: "People do not always move up the hierarchy in order, and needs are hard to measure.",
    hints: ["Think about whether everyone follows the same order."],
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional software start-up in Harare offers high pay, but its developers say they are bored and leave. Which explanation best fits both Maslow's and Herzberg's theories?",
    ok: ["Lower needs and hygiene factors are met, but higher needs and motivators are not", "Correct: both theories say that higher-level rewards are needed for further motivation."],
    bad: [["The developers have not yet had even their basic physiological needs met", "A high wage meets physiological needs."], ["High pay is a motivator and so should have prevented the problem", "In Herzberg's theory pay is a hygiene factor."], ["Hygiene factors are missing, so dissatisfaction is certain", "Pay is high, so the hygiene factor is present."]],
    explanation: "Pay meets lower needs and a hygiene factor. Boredom shows missing challenge, responsibility and growth.",
    hints: ["Where does high pay sit in each theory?"],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In Herzberg's theory, good pay will always produce lasting motivation.",
    answer: false,
    explanation: "False. Pay is a hygiene factor: it prevents dissatisfaction but does not by itself produce lasting motivation.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "According to Maslow, a need that has already been satisfied no longer motivates behaviour.",
    answer: true,
    explanation: "True. In Maslow's view the lowest unmet need is the motivator; once it is satisfied the person moves to the next level.",
    hints: ["Which level motivates a person at any time?"],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each workplace feature to the Maslow level it mainly meets.",
    pairs: [["A wage that covers food and rent", "Physiological"], ["A written permanent contract", "Safety"], ["A staff football team", "Social"], ["An employee of the year award", "Esteem"], ["A chance to design a new product", "Self-actualisation"]],
    explanation: "Each feature matches one level of the hierarchy.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "In Herzberg's theory, pay is a {{blank:a}} factor and recognition is a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["hygiene"], choices: ["hygiene", "motivator"] },
      { id: "b", accepted: ["motivator"], choices: ["hygiene", "motivator"] },
    ],
    explanation: "Pay is a hygiene factor; recognition, achievement and responsibility are motivators.",
  });

  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the lowest level in Maslow's hierarchy of needs.",
    accepted: ["physiological", "physiological needs", "physiological needs (basic needs)", "basic needs"],
    explanation: "The lowest level is physiological: food, water, shelter and rest.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the American psychologist who developed the two-factor theory of motivation.",
    accepted: ["herzberg", "frederick herzberg"],
    explanation: "Frederick Herzberg developed the two-factor (motivation-hygiene) theory.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain what is meant by a hygiene factor in Herzberg's theory.",
    points: ["A feature of the job's setting or conditions, such as pay or supervision", "If it is poor it causes dissatisfaction", "If it is good it removes dissatisfaction but does not by itself motivate"],
    modelAnswer: "A hygiene factor is a feature of the job's setting, such as pay, supervision or working conditions. If it is poor, workers become dissatisfied. If it is good, the dissatisfaction is removed, but it does not by itself motivate workers to work harder.",
    hints: ["Say what happens when it is poor and when it is good."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional bus company in Bulawayo has well-paid drivers, but many say they get no thanks from managers and have no say in the timetable. Explain **two** ways in which the company could motivate its drivers using Herzberg's ideas.",
    points: ["Introduce recognition, such as a driver of the month award", "Application: drivers would feel their service is valued, which is a motivator", "Give drivers a say in the timetable, which adds responsibility", "Application: planning their own routes gives interesting work and shows trust"],
    modelAnswer: "The company could recognise good service, for example with a driver of the month award, so drivers feel their work is valued, which is a motivator. It could also let drivers help plan the timetable. This adds responsibility and shows trust, which makes the job more interesting than pay alone.",
    hints: ["Choose motivators, not hygiene factors."],
    explanation: "Two methods, each applied to the drivers.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why a manager should not assume that all employees are motivated by the same needs.",
    points: ["Employees are at different levels of the hierarchy", "Application: a new trainee on a low wage may seek security, while an experienced supervisor seeks recognition", "Cultures, ages and personalities differ", "A reward that suits one group may have no effect on another, so the manager may waste money"],
    modelAnswer: "Employees are at different levels of Maslow's hierarchy. A trainee on a low wage may want security, whereas an experienced supervisor may want recognition. Cultures, ages and personalities also differ. A reward that suits one group may have no effect on another, so the manager may spend money without improving effort.",
    hints: ["Give a contrast between two types of employee."],
    explanation: "Difference, example, consequence.",
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A fictional business: Nyasha's Poultry Farm near Chinhoyi employs ten workers. Workers receive a wage a little above the local average and have written contracts. Nyasha is worried because staff arrive late and mistakes in egg grading are rising. Staff say that nobody explains how well they are doing and that they never choose how to do a task.",
    parts: [
      pmc(P, { label: "(a)", marks: 1, stem: "The written contracts mainly meet which level of Maslow's hierarchy?", ok: ["Safety", "Correct: a contract gives security of employment."], bad: [["Physiological", "Physiological needs are basic needs for food and shelter, met by the wage."], ["Esteem", "Esteem is about respect and status."], ["Self-actualisation", "This is about fulfilling one's potential."]], explanation: "Contracts give job security, a safety need and a Herzberg hygiene factor." }),
      P.fib({ label: "(b)", marks: 2, stem: "Complete the sentence.", template: "The wage is a Herzberg {{blank:a}} factor, while explaining to staff how well they are doing is {{blank:b}}.", blanks: [{ id: "a", accepted: ["hygiene"], choices: ["hygiene", "motivator"] }, { id: "b", accepted: ["recognition"], choices: ["recognition", "supervision", "job security"] }], explanation: "Wages are hygiene factors; feedback on performance gives recognition, a motivator." }),
      P.manual({ label: "(c)", marks: 6, stem: "Analyse how Nyasha could use the ideas of Maslow and Herzberg to improve motivation.", points: [["Basic and security needs appear to be met by wages and contracts, so more pay is unlikely to solve the problem", 1], ["Esteem and recognition are missing because staff get no feedback", 1], ["Nyasha could give regular feedback and praise good grading", 1], ["Self-actualisation and responsibility are missing because staff cannot choose how to do tasks", 1], ["Job enrichment, for example letting workers organise the grading shifts", 1], ["Consequence: better motivation should reduce lateness and mistakes", 1]], modelAnswer: "Wages and contracts meet the workers' basic and security needs, so more pay is unlikely to solve the problem. What is missing is esteem or recognition, because staff get no feedback, and responsibility, because they cannot choose how to do tasks. Nyasha could give regular feedback and praise good grading, and she could enrich jobs by letting workers organise grading shifts. If workers feel valued and trusted they should arrive on time and make fewer mistakes.", hints: ["Say which needs are met, which are missing, and one action for each."], explanation: "Diagnose with the theories, then recommend actions." }),
    ],
    hints: ["Contracts give security; feedback and choice are the motivators."],
    explanation: "Lower needs and hygiene factors are met; recognition and responsibility are missing.",
  });

  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Tendai's Mining Supplies in Bulawayo sells drill bits and safety gear. Tendai plans a bonus scheme: US\\$20 a month extra pay for each sales assistant. Last year two assistants left, saying they had no chance of promotion and nobody noticed their ideas. Competitors pay similar wages.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Explain **one** reason why the bonus may not solve the problem, using Herzberg's theory.", points: ["Pay is a hygiene factor", "Application: the assistants left because of lack of promotion and recognition, which are motivators", "A bonus may remove dissatisfaction over pay but it does not provide interest or growth", "Once the bonus is expected, its motivating effect fades"], modelAnswer: "Pay is a hygiene factor. The assistants left because of a lack of promotion and recognition, which are motivators. A bonus may remove complaints about money, but it does not provide growth or interest, and once it is expected its effect fades.", hints: ["Link pay to hygiene factors and the reasons given to motivators."], explanation: "Hygiene against motivator, applied to the leavers' reasons." }),
      P.manual({ label: "(b)", marks: 9, stem: "Evaluate whether Tendai should introduce the bonus scheme or use non-financial methods instead.", points: [["Bonus: raises incomes and may reduce staff leaving to higher-paying rivals", 2], ["Limit: the cost is a recurring expense and Herzberg suggests the effect on motivation is limited", 2], ["Non-financial: promotion paths and recognition of ideas address the reasons the assistants left", 2], ["Non-financial methods may cost less, but need managerial time and training", 1], ["Different staff want different things, so Tendai should ask them", 1], ["Judgement with a reason, for example a small bonus alongside recognition and promotion routes", 1]], levels: [[3, 7, 9, "Weighs both approaches using Herzberg or Maslow with application to the case; a justified recommendation with a limitation"], [2, 4, 6, "Explains both approaches with some application; judgement unsupported or one-sided"], [1, 1, 3, "Describes pay and non-financial methods without applying them"]], modelAnswer: "A bonus would raise the assistants' incomes and might stop some leaving for better-paid rivals. But the bonus is a recurring cost, and in Herzberg's theory pay prevents dissatisfaction rather than motivating. The two assistants who left said they lacked promotion and recognition of their ideas, which are motivators. Introducing promotion paths and a way to put forward ideas costs less cash but needs managers' time and training. Because staff differ in what they want, Tendai should ask them. On balance he should use non-financial methods as the main approach, perhaps with a small bonus, because these address why people actually left.", hints: ["Weigh the cost and effect of each approach, then decide using the reasons staff gave."], explanation: "Compare financial and non-financial methods, then recommend with a reason." }),
    ],
    hints: ["Use the reasons the assistants gave when they left."],
    explanation: "The reasons for leaving point to motivators, so non-financial methods are more likely to work.",
  });

  b.card("DEFINITION", "Motivation", "The desire to put effort into work to achieve objectives; motivated staff raise output and quality and are less likely to leave.");
  b.card("FACT", "Maslow's five levels", "Physiological, safety, social, esteem, self-actualisation (bottom to top); the lowest unmet need motivates.");
  b.card("DEFINITION", "Hygiene factors (Herzberg)", "Pay, working conditions, company policy, supervision, relationships and job security. If poor they cause dissatisfaction; if good they do not by themselves motivate.");
  b.card("DEFINITION", "Motivators (Herzberg)", "Achievement, recognition, interesting work, responsibility and advancement; they produce satisfaction and extra effort.");
  b.card("DEFINITION", "Job enrichment", "Giving workers more responsibility, planning and decision-making in their jobs, to make the work itself more rewarding. Herzberg's main practical suggestion.");
  b.card("CONCEPT", "Job enlargement versus job enrichment", "Enlargement adds more tasks of a similar level (less powerful); enrichment adds responsibility and control (more powerful).");
  b.card("FACT", "Criticisms of Maslow", "The order is not fixed; needs differ between people and cultures; the levels overlap; hard to measure; not written for work.");
  b.card("FACT", "Criticisms of Herzberg", "Based on accountants and engineers; people credit themselves for success and blame others for failure; satisfaction does not always raise productivity; pay motivates some workers.");
  b.card("CONCEPT", "Comparing the theories", "Maslow's lower levels are like Herzberg's hygiene factors; esteem and self-actualisation are like the motivators. Maslow says each need motivates until met; Herzberg says hygiene factors never motivate.");
});
