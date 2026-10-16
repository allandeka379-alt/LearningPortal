// W2b: motivation.mcclelland-vroom (Cambridge AS only; tagged to Cambridge automatically)
import { concept, P } from "../lib.mjs";
import { mc, pmc } from "../tables/w2b-lib.mjs";

concept("abus.motivation.mcclelland-vroom", { file: "motivation/mcclelland-vroom", keyPrefix: "motivation.mcclelland-vroom" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of the following is one of McClelland's three needs?",
    ok: ["Affiliation", "Correct: the need to be liked and to belong to a group."],
    bad: [["Safety and security", "Safety is a level in Maslow's hierarchy."], ["Hygiene", "Hygiene factors belong to Herzberg's theory."], ["Valence", "Valence is a term in Vroom's theory."]],
    explanation: "McClelland's three needs are achievement, power and affiliation.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which theorist developed the expectancy theory of motivation?",
    ok: ["Victor Vroom", "Correct: expectancy, instrumentality and valence are Vroom's terms."],
    bad: [["David McClelland", "McClelland developed the theory of three needs."], ["Frederick Herzberg", "Herzberg developed the two-factor theory."], ["Elton Mayo", "Mayo is associated with the human relations school."]],
    explanation: "Vroom's expectancy theory is a process theory of motivation.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In Vroom's theory, **valence** means",
    ok: ["How much the employee values the reward", "Correct: a reward has little effect if it is not valued."],
    bad: [["The belief that effort leads to good performance", "This is expectancy."], ["The belief that good performance leads to a reward", "This is instrumentality."], ["The employee's wish to lead other people", "This is the need for power in McClelland's theory."]],
    explanation: "Valence is the value a person places on the reward.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "An employee with a strong need for **achievement** is most likely to want",
    ok: ["Challenging targets with feedback", "Correct: achievers like goals that are hard but reachable, and want to know how they have done."],
    bad: [["A job that avoids all competition", "Achievers welcome a challenge."], ["Work in which nobody gives feedback", "Achievers want feedback on results."], ["A role giving orders to others", "This suits a need for power."]],
    explanation: "People with a high need for achievement prefer challenging goals, personal responsibility and feedback.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional employee in a Harare shop believes the monthly sales bonus is never paid, even to staff who reach the target. Which part of Vroom's theory is weak?",
    ok: ["Instrumentality", "Correct: the employee does not believe performance will lead to the reward."],
    bad: [["Expectancy, since effort cannot lead to performance", "Expectancy is about whether effort leads to performance; the target can be reached."], ["Valence", "There is no sign that the employee does not value the bonus."], ["Affiliation", "Affiliation is a McClelland need, not part of Vroom's theory."]],
    explanation: "Instrumentality is the belief that good performance will lead to the reward.",
    hints: ["Does the employee believe the reward will follow the performance?"],
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional manager in Bulawayo wants a leader for a new team and has three candidates. Which candidate, according to McClelland, is likely to suit the role best?",
    ok: ["The one with a strong need for power", "Correct: leading a team involves influencing others."],
    bad: [["The one with the weakest need for achievement", "Low achievement does not suit a leadership role."], ["The one who most wants to avoid conflict and be liked", "Avoiding conflict is typical of high affiliation, which can make leading harder."], ["The one who prefers to work alone", "A leadership role involves working with others."]],
    explanation: "A high need for power suits management and leadership roles.",
    hints: ["Which need relates to influencing other people?"],
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement correctly distinguishes content and process theories of motivation?",
    ok: ["Content theories say what motivates; process theories say how motivation arises", "Correct: for example, McClelland is content and Vroom is process."],
    bad: [["Process theories describe pay only; content theories describe all rewards", "Neither type is limited to pay."], ["Content theories were written after process theories", "The difference is not about dates."], ["Process theories describe groups; content theories describe individuals", "Both types are about individual motivation."]],
    explanation: "Content theories identify needs or rewards; process theories explain the decision to make an effort.",
    hints: ["Think about 'what' and 'how'."],
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional hotel in Victoria Falls offers a prize for the best guest review. Staff say they cannot control guests' comments, and they would prefer extra days off to the prize. Which is the best summary of the problem using Vroom's theory?",
    ok: ["Expectancy and valence are both low", "Correct: staff doubt that effort leads to the result, and do not value the prize."],
    bad: [["Only instrumentality is low", "There is no evidence that the prize is withheld after good reviews."], ["All three are high, so motivation is high", "Doubt about control and a preference for time off show low expectancy and valence."], ["Only affiliation is low", "Affiliation is not part of Vroom's theory."]],
    explanation: "Staff doubt that their effort affects the reviews (expectancy) and do not value the prize (valence).",
    hints: ["Which statement is about effort leading to performance, and which about value?"],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In Vroom's theory, motivation is high when only one of expectancy, instrumentality and valence is high.",
    answer: false,
    explanation: "False. All three beliefs need to be reasonably high; if any one is close to zero, motivation is low.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "McClelland's theory suggests that different jobs suit people with different dominant needs.",
    answer: true,
    explanation: "True. For example, high power suits leadership roles, high affiliation suits teamwork and service roles, and high achievement suits target-driven roles.",
    hints: ["Think of the job that suits each need."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [["Need for achievement", "Wanting challenging goals and feedback"], ["Need for power", "Wanting to influence and lead others"], ["Need for affiliation", "Wanting to be liked and to belong"], ["Expectancy", "Belief that effort will lead to performance"], ["Instrumentality", "Belief that performance will lead to a reward"]],
    explanation: "Each term fits one meaning.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "{{blank:a}} is a content theory of motivation, whereas {{blank:b}} theory is a process theory.",
    blanks: [
      { id: "a", accepted: ["McClelland"], choices: ["McClelland", "Vroom"] },
      { id: "b", accepted: ["Vroom's expectancy"], choices: ["Vroom's expectancy", "Maslow's needs"] },
    ],
    explanation: "McClelland's needs theory is a content theory; Vroom's expectancy theory is a process theory.",
  });

  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the three needs in McClelland's theory (give any one of them).",
    accepted: ["achievement", "power", "affiliation", "need for achievement", "need for power", "need for affiliation"],
    explanation: "The three needs are achievement, power and affiliation.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "In Vroom's theory, what name is given to the belief that good performance will lead to a reward?",
    accepted: ["instrumentality"],
    explanation: "Instrumentality is the belief that performance will be rewarded.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain what is meant by expectancy theory.",
    points: ["A theory by Vroom that explains how people decide how much effort to make", "Motivation depends on expectancy: belief that effort leads to performance", "and on instrumentality (performance leads to reward) and valence (the reward is valued)"],
    modelAnswer: "Expectancy theory, by Vroom, explains how people decide how much effort to make. Motivation depends on expectancy, the belief that effort leads to good performance, instrumentality, the belief that performance leads to a reward, and valence, how much the reward is valued.",
    hints: ["Name the three beliefs."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional telephone-sales business in Lusaka has employees with a high need for achievement. Explain **two** ways in which the manager could motivate them using McClelland's theory.",
    points: ["Set challenging but reachable sales targets", "Application: targets give achievers a goal that stretches them", "Give regular feedback on results", "Application: achievers want to know how well they have done, e.g. weekly sales figures"],
    modelAnswer: "The manager could set challenging but reachable sales targets, which give achievers a goal that stretches them. The manager could also give regular feedback, such as weekly sales figures, because achievers want to know how well they have done.",
    hints: ["Think of what an achiever wants from a job."],
    explanation: "Two actions, each applied to the sales team.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how a manager could raise the **expectancy** of employees who doubt that they can reach a sales target.",
    points: ["Expectancy is the belief that effort leads to performance", "Provide training so employees have the skills to reach the target", "Set targets that are challenging but achievable", "Employees who believe they can succeed are then more likely to try hard"],
    modelAnswer: "Expectancy is the belief that effort will lead to performance. The manager could train employees so they have the skills to reach the target and set targets that are challenging but achievable. Employees who believe they can succeed are more likely to try hard.",
    hints: ["What would make employees believe that effort leads to success?"],
    explanation: "Training and achievable targets raise expectancy.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Assess how useful Vroom's expectancy theory is to the owner of a fictional small furniture workshop in Gweru who is designing a bonus scheme.",
    points: ["It shows three conditions for a bonus to work: expectancy, instrumentality and valence", "Application: the owner can check that workers can reach the target, that the bonus will be paid and that workers want it", "It focuses on individual differences in what rewards are valued", "Limitation: it assumes workers calculate rationally", "Limitation: it is hard to measure each belief for each worker in a small firm", "Judgement with a reason: useful as a checklist before launching the scheme"],
    modelAnswer: "The theory gives the owner three conditions for the bonus to work. Workers must believe they can reach the target, that the bonus will be paid, and that they want it. This lets the owner check each point before launch, and asking workers what they value is a simple step. But the theory assumes workers calculate rationally and it is hard to measure each belief for every worker. It is most useful as a checklist before launching the scheme, together with conversations with the workers.",
    hints: ["Give a use, a limitation and a judgement."],
    explanation: "One point per mark; the judgement needs a reason.",
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A fictional business: Kagiso's Cleaning Services in Gaborone employs 30 cleaners. Kagiso announces a monthly prize of a shopping voucher for the team with the fewest customer complaints. Teams with older equipment say it is unfair, one team says the vouchers were promised before and never given, and some cleaners say they would prefer a day off.",
    parts: [
      pmc(P, { label: "(a)", marks: 1, stem: "The teams with older equipment doubt that effort will lead to the fewest complaints. Which of Vroom's terms is low?", ok: ["Expectancy", "Correct: expectancy is the belief that effort leads to performance."], bad: [["Instrumentality", "Instrumentality is about performance leading to reward."], ["Valence", "Valence is about how much the reward is valued."], ["Affiliation", "This is a McClelland need, not part of Vroom's theory."]], explanation: "Older equipment weakens the link between effort and performance." }),
      P.fib({ label: "(b)", marks: 2, stem: "Complete the sentences.", template: "The broken promise of vouchers means that {{blank:a}} is low, and the preference for a day off means that {{blank:b}} is low.", blanks: [{ id: "a", accepted: ["instrumentality"], choices: ["expectancy", "instrumentality", "valence"] }, { id: "b", accepted: ["valence"], choices: ["expectancy", "instrumentality", "valence"] }], explanation: "A promise that was not kept weakens belief that performance brings the reward; preferring time off shows the voucher is not valued." }),
      P.manual({ label: "(c)", marks: 6, stem: "Analyse how Kagiso could change the scheme so that it works better.", points: [["Expectancy: set targets relative to each team's own equipment, or replace the oldest equipment", 2], ["Instrumentality: pay the prize promptly and publish the rules", 2], ["Valence: ask cleaners what rewards they prefer, such as a day off", 2]], modelAnswer: "To raise expectancy, Kagiso could set targets relative to each team's own equipment or replace the oldest equipment, so that effort leads to results. To raise instrumentality, he must pay the prize promptly and publish the rules, so cleaners believe good performance is rewarded. To raise valence, he should ask cleaners what rewards they prefer, such as a day off, so that the reward is worth having.", hints: ["Deal with each of the three beliefs in turn."], explanation: "One action for each of expectancy, instrumentality and valence." }),
    ],
    hints: ["Match each complaint to one of Vroom's three terms."],
    explanation: "Equipment affects expectancy; the broken promise affects instrumentality; the day-off preference affects valence.",
  });

  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Neo's Travel Agency in Johannesburg has four staff. Staff differ: Lerato always asks for harder targets and for feedback, Themba likes to run team meetings and take charge, and Anele prefers a friendly office and avoids arguments. Neo plans to give all of them the same reward, a bonus linked to total monthly bookings.",
    parts: [
      P.manual({ label: "(a)", marks: 6, stem: "Analyse how McClelland's theory could be used to identify different rewards for Lerato, Themba and Anele.", points: [["Lerato shows a need for achievement; reward with stretching targets and feedback", 2], ["Themba shows a need for power; reward with leadership responsibility, such as running a project", 2], ["Anele shows a need for affiliation; reward with a team-based goal or a friendly working environment", 2]], modelAnswer: "Lerato shows a need for achievement, so she would be motivated by stretching targets and regular feedback. Themba shows a need for power, so he would respond to leadership responsibility such as running a project. Anele shows a need for affiliation, so a team-based goal in a friendly working environment would motivate her.", hints: ["Match each person's behaviour to one of the three needs."], explanation: "One need, one behaviour and one suitable reward each." }),
      P.manual({ label: "(b)", marks: 9, stem: "Evaluate whether Neo should offer the same bonus to all four staff or reward each according to their needs.", points: [["Same bonus: simple, seen as fair, easy to administer in a small firm", 2], ["Same bonus does not take account of different needs, so it may motivate some staff more than others", 2], ["Individual rewards may motivate each person more, using McClelland and valence (Vroom)", 2], ["Individual rewards take managerial time and may seem unfair if staff compare", 2], ["Judgement with a reason, for example a basic common bonus plus choice of extra reward", 1]], levels: [[3, 7, 9, "Weighs both approaches with theory and application to the three staff; justified recommendation with a limitation"], [2, 4, 6, "Explains both approaches with some application; judgement weak"], [1, 1, 3, "Describes the bonus or the needs without weighing them"]], modelAnswer: "A single bonus is simple, easy to run and likely to be seen as fair in a small office. But it ignores that Lerato wants challenge, Themba wants leadership and Anele wants friendly teamwork, so it may motivate some more than others, and in Vroom's terms the reward may not be valued by everyone. Individual rewards could motivate each person more, but they take managers' time and may seem unfair if staff compare them. Neo should offer a basic common bonus with a choice of an extra reward, such as a stretching target, a project to lead or a team outing, so that fairness is kept while valence is raised.", hints: ["Weigh fairness and simplicity against the different needs of the staff."], explanation: "Compare a single reward with individual rewards, then recommend with a reason." }),
    ],
    hints: ["Use the three needs to read each person's behaviour."],
    explanation: "A common bonus plus individual choice balances fairness and motivation.",
  });

  b.card("DEFINITION", "Content theory", "A theory of what motivates people, by identifying their needs: Maslow, Herzberg and McClelland.");
  b.card("DEFINITION", "Process theory", "A theory of how people decide to make an effort, by looking at the thinking linking effort, performance and reward: Vroom.");
  b.card("FACT", "McClelland's three needs", "Achievement (challenge, feedback), power (influence, lead), affiliation (belonging, friendly relationships). One tends to dominate.");
  b.card("CONCEPT", "Using McClelland", "Achievement: target-driven jobs; power: management and leadership; affiliation: teamwork and customer service.");
  b.card("DEFINITION", "Expectancy (Vroom)", "The belief that effort will lead to good performance. Raised by training, resources and achievable targets.");
  b.card("DEFINITION", "Instrumentality (Vroom)", "The belief that good performance will lead to a reward. Raised by clear rules and keeping promises.");
  b.card("DEFINITION", "Valence (Vroom)", "How much the person values the reward. Raised by finding out what employees want.");
  b.card("FACT", "Limitations of the theories", "McClelland: needs hard to measure and may change. Vroom: assumes rational calculation; hard to measure each belief for each person.");
  b.card("CONCEPT", "All three beliefs must be present", "If expectancy, instrumentality or valence is close to zero, motivation to make an effort is low.");
});
