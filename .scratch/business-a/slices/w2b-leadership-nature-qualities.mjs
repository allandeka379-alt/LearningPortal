// W2b: leadership.nature-qualities
import { concept, P, ZIM, hr, chk } from "../lib.mjs";
import { mc, pmc } from "../tables/w2b-lib.mjs";

concept("abus.leadership.nature-qualities", { file: "leadership/nature-qualities", keyPrefix: "leadership.nature-qualities" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which statement best defines **leadership**?",
    ok: ["Influencing others to work willingly towards a shared goal", "Correct: leadership inspires and guides people."],
    bad: [["Making sure that rules and procedures are obeyed", "This describes control, a management function."], ["Calculating the profit made by the business", "Calculating profit is an accounting task."], ["Hiring, training and dismissing employees and keeping records only", "Hiring and dismissal are tasks of human resource management."]],
    explanation: "Leadership is the ability to influence and guide others towards shared goals.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of the following is normally a **formal leader**?",
    ok: ["A department manager", "Correct: authority comes from the position held."],
    bad: [["A respected colleague with no title", "This person is an informal leader."], ["A customer of the business", "A customer has no authority within the business."], ["A competitor of the business", "A competitor is outside the business."]],
    explanation: "A formal leader holds authority because of a position, such as a manager or director.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is a **difference** between a leader and a manager?",
    ok: ["A leader inspires people, whereas a manager plans and controls", "Correct: leadership focuses on direction and influence; management on planning, organising and control."],
    bad: [["A leader always has a higher salary and a higher status than a manager", "Pay is not what distinguishes the roles."], ["A manager never needs to communicate with staff", "Managers must communicate with staff."], ["A leader cannot work in a small business", "Leaders exist in businesses of every size."]],
    explanation: "Leadership is about vision and influence; management is about planning, organising and control.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A worker with no formal title is respected by colleagues, who often follow her advice. She is best described as",
    ok: ["An informal leader", "Correct: her influence comes from respect, not position."],
    bad: [["A formal leader", "A formal leader holds a position of authority."], ["A director", "A director is appointed to the board."], ["A stakeholder outside the firm", "She is an employee inside the firm."]],
    explanation: "An informal leader has influence through respect and skill without a formal position.",
    applies: ZIM,
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional mining supplier in Bulawayo loses a big customer. Its managing director calls a staff meeting, explains what has happened, sets out a plan to win new customers and invites ideas. Which leadership qualities is she showing?",
    ok: ["Vision and communication", "Correct: she sets a direction and explains and listens."],
    bad: [["Secrecy and delay", "She is open and acts quickly."], ["Avoidance of decisions", "She has made a plan."], ["Indifference to staff views", "She invites ideas."]],
    explanation: "Setting out a plan shows vision; explaining and inviting ideas shows communication.",
    hints: ["What does she do in the meeting?"],
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A supervisor at a fictional bakery in Gweru is respected because he treats all bakers fairly and keeps his promises. Which quality is mainly responsible for his influence?",
    ok: ["Integrity", "Correct: fairness and keeping promises build trust."],
    bad: [["Willingness to delegate", "Delegation is not shown in the extract."], ["Technical knowledge of ovens", "The extract shows fairness, not technical skill."], ["Ownership of the business", "He is a supervisor, not the owner."]],
    explanation: "Treating people fairly and keeping promises is integrity, which builds trust.",
    hints: ["Which quality is about honesty and fairness?"],
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is a reason why a business needs **both** leadership and management?",
    ok: ["Leaders set direction and managers organise delivery", "Correct: direction alone does not deliver results; organisation alone does not inspire."],
    bad: [["Leaders and managers do exactly the same tasks in every firm", "Their tasks differ."], ["Management makes leadership unnecessary", "Management does not provide vision or inspiration."], ["Only large businesses need either", "Businesses of every size need both."]],
    explanation: "Leadership gives direction and commitment; management gives planning, organisation and control.",
    hints: ["What would be missing if there were only one?"],
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional factory in Mutare has a very competent manager who plans well but never explains the purpose of the plans, and staff morale is low. Which is the most likely cause?",
    ok: ["Good management but weak leadership", "Correct: the organisation is sound, but staff are not inspired or informed."],
    bad: [["Good leadership but weak management", "Planning is good, so management is not the weakness."], ["Poor planning by the manager", "The extract says the manager plans well."], ["Too many informal leaders in the factory", "There is no evidence of informal leaders."]],
    explanation: "The manager organises well but does not communicate vision or purpose, so staff are not committed.",
    hints: ["What is the manager doing well, and what is missing?"],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A leader must always hold a formal position of authority in the business.",
    answer: false,
    explanation: "False. Informal leaders influence others through respect and skill without holding a formal position.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "The qualities needed in a leader may differ according to the situation the business is in.",
    answer: true,
    explanation: "True. A crisis may need decisiveness, whereas a creative team may need openness and trust.",
    hints: ["Compare a fire emergency with a design workshop."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each leadership quality to its value for a business.",
    pairs: [["Vision", "Gives staff a direction and reason for effort"], ["Communication", "Helps staff understand goals and feel heard"], ["Integrity", "Builds trust between leader and staff"], ["Decisiveness", "Keeps the business moving when information is incomplete"], ["Empathy", "Recognises the needs of staff and customers"]],
    explanation: "Each quality is matched to its benefit.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "A {{blank:a}} leader holds authority because of a position, whereas an {{blank:b}} leader has influence through respect.",
    blanks: [
      { id: "a", accepted: ["formal"], choices: ["formal", "informal"] },
      { id: "b", accepted: ["informal"], choices: ["formal", "informal"] },
    ],
    explanation: "Formal leaders hold positions; informal leaders gain influence through respect.",
    applies: ZIM,
  });

  b.short({
    d: 1, skill: "RECALL",
    stem: "State one quality of a good leader.",
    accepted: ["vision", "communication", "integrity", "decisiveness", "empathy", "confidence", "resilience", "fairness", "honesty", "good communication", "ability to communicate", "knowledge", "willingness to delegate", "delegation", "trustworthiness", "integrity and fairness"],
    explanation: "Qualities include vision, communication, integrity, decisiveness, empathy, resilience and knowledge.",
  });

  const leavers = 12;
  const avg = 40;
  const turnover = hr.labourTurnover(leavers, avg);
  chk(turnover, 30);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: turnover, calculator: true, daily: true, wrong: [(avg / leavers) * 100, 100 - turnover],
    stem: "A fictional branch of a hardware chain in Mutare has an average of 40 employees. During the year 12 employees leave. Calculate the branch's labour turnover (leavers divided by average employees, multiplied by 100), to one decimal place.",
    hints: ["Leavers divided by average employees, times 100."],
    explanation: "12 / 40 x 100 = 30.0%. Dividing 40 by 12 gives 333.3%; 100 - 30 = 70% is the labour retention rate, not turnover.",
  });
  const t1 = hr.labourTurnover(3, 60);
  chk(t1, 5);
  b.calc({
    d: 3, skill: "ANALYSIS", kind: "pct", value: turnover - t1, calculator: true, wrong: [turnover, t1],
    stem: "Branch A of the same chain has an average of 60 employees and 3 leavers in the year; Branch B (above) has 12 leavers from an average of 40. By how many percentage points is Branch B's labour turnover higher than Branch A's? (Answer to one decimal place.)",
    hints: ["Find each branch's labour turnover first."],
    explanation: "Branch A: 3 / 60 x 100 = 5.0%. Branch B: 12 / 40 x 100 = 30.0%. Difference = 25.0 percentage points. Leadership may be one reason, but pay and the local labour market may also differ.",
    workedSolution: "1. Branch A = 3 / 60 x 100 = 5.0%.\n2. Branch B = 12 / 40 x 100 = 30.0%.\n3. Difference = 30.0 - 5.0 = 25.0 percentage points.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain the difference between a leader and a manager.",
    points: ["A leader influences and inspires people and gives direction", "A manager plans, organises and controls resources and has formal authority", "Followers choose to follow a leader, whereas subordinates are expected to follow a manager"],
    modelAnswer: "A leader influences and inspires people and gives direction. A manager plans, organises and controls resources and has formal authority. People choose to follow a leader, whereas subordinates are expected to follow a manager.",
    hints: ["Compare direction with organisation."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional supermarket in Harare is about to introduce self-service tills, and staff are worried about their jobs. Explain **two** leadership qualities that the manager should show.",
    points: ["Communication: explain why the change is happening and what it means for jobs", "Application: staff who understand the plan are less likely to resist", "Empathy: listen to fears and offer retraining", "Application: staff feel valued and are more likely to support the change"],
    modelAnswer: "Communication: the manager should explain why the change is happening and what it means for jobs, so that staff who understand the plan are less likely to resist. Empathy: the manager should listen to fears and offer retraining, so staff feel valued and are more likely to support the change.",
    hints: ["Choose two qualities and say what the manager should do."],
    explanation: "Two qualities, each applied to the change.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how good leadership may improve the performance of a business.",
    points: ["A clear vision gives staff direction", "Staff who are motivated and committed work harder and make fewer errors", "Better teamwork raises productivity and customer service", "Lower absence and staff turnover reduce costs"],
    modelAnswer: "A clear vision gives staff direction, and staff who feel motivated and committed work harder and make fewer errors. Better teamwork raises productivity and customer service, and lower absence and staff turnover reduce costs.",
    hints: ["Trace the chain from leadership to staff to costs."],
    explanation: "Direction, motivation, teamwork and cost.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Assess whether informal leaders are an advantage or a problem for a fictional factory in Gweru that plans to introduce new machines.",
    points: ["Informal leaders influence colleagues, so their support can speed acceptance of the change", "Application: a respected machinist who tries the machines first may persuade others", "Informal leaders can pass on good practice", "If ignored, informal leaders may resist and others follow them", "Management loses control if the informal leader's views differ from the plan", "Judgement with a reason: an advantage if managers consult and involve them"],
    modelAnswer: "Informal leaders influence colleagues, so their support can speed acceptance of the new machines: a respected machinist who tries them first may persuade others, and can pass on good practice. But if they are ignored they may resist and others may follow them. They are an advantage if managers identify and involve them early.",
    hints: ["Give a benefit, a risk and a judgement."],
    explanation: "One point per mark; the judgement needs a reason.",
    applies: ZIM,
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A fictional business: Thandeka manages a team of 20 drivers at a delivery company in Johannesburg. She holds a short meeting each morning to explain the day's plan, asks for problems, and praises good work in front of the team. Staff turnover is 8% a year, much lower than the industry average of 25%.",
    parts: [
      pmc(P, { label: "(a)", marks: 1, stem: "Explaining the plan and asking for problems each morning mainly shows which quality?", ok: ["Communication", "Correct: she explains and listens."], bad: [["Secrecy", "She shares information."], ["Indecision", "She makes a clear plan."], ["Authority over pay", "The extract does not mention pay."]], explanation: "Explaining and listening is communication." }),
      P.num({ label: "(b)", marks: 2, kind: "units", value: 20 * 0.08, wrong: [8, 25], stem: "If staff turnover is 8% a year and the team averages 20 drivers, how many drivers leave in a year?", explanation: "20 x 8 / 100 = 1.6 drivers on average, i.e. between one and two a year. Using 8 treats the percentage as a number.", dp: 1 }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain **one** way in which her leadership may be reducing staff turnover.", points: ["Praise makes drivers feel valued", "Application: drivers who feel valued are less likely to look for work elsewhere", "Daily meetings make drivers feel informed and listened to"], modelAnswer: "Praise in front of the team makes drivers feel valued, so they are less likely to look for work elsewhere. The daily meetings also make drivers feel informed and listened to.", hints: ["Link praise or meetings to staff wanting to stay."], explanation: "A leadership action linked to staff retention." }),
    ],
    hints: ["Link each action to a quality or an effect on staff."],
    explanation: "Communication and recognition; turnover of 8% is 1.6 drivers a year.",
  });

  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Sipho's Tourism Lodge near Victoria Falls has 25 staff. The founder, Sipho, makes all decisions himself and is rarely at the lodge. The head housekeeper, Mrs Nyathi, is respected by the staff and settles disputes, but is not consulted by Sipho. Guest ratings are falling, and three of the four best waiters have left this year.",
    parts: [
      P.manual({ label: "(a)", marks: 6, stem: "Analyse how the leadership at the lodge may be contributing to the falling guest ratings.", points: [["Sipho is rarely there, so staff lack direction and feedback", 2], ["Sipho does not consult staff, so their knowledge of guests is wasted", 1], ["Mrs Nyathi is an informal leader whose influence is not used", 1], ["Loss of the best waiters reduces service quality", 1], ["Guest ratings fall as service standards drop", 1]], modelAnswer: "Sipho is rarely at the lodge, so staff lack direction and feedback, and he does not consult them, so their knowledge of guests is wasted. Mrs Nyathi is respected but is not used as a leader. The loss of the best waiters reduces service quality, so guest ratings fall.", hints: ["Link Sipho's absence, the informal leader and the departures to ratings."], explanation: "Weak formal leadership, unused informal leader, loss of staff." }),
      P.manual({ label: "(b)", marks: 9, stem: "Evaluate whether Sipho should give Mrs Nyathi a formal leadership role or appoint a new general manager.", points: [["Promote Mrs Nyathi: she is respected, knows the lodge and costs less to appoint", 2], ["Risk: she may lack management skills such as budgeting and planning, so training would be needed", 2], ["New general manager: brings skills and a fresh view and frees Sipho for strategy", 2], ["Risk: high salary cost, and staff may resent an outsider", 1], ["Whichever he chooses, Sipho must delegate and communicate", 1], ["Judgement with a reason, for example promote Mrs Nyathi with training and support", 1]], levels: [[3, 7, 9, "Weighs both options with application to the lodge; justified recommendation with a limitation"], [2, 4, 6, "Explains both options with some application; judgement weak"], [1, 1, 3, "Describes leadership in general with little application"]], modelAnswer: "Promoting Mrs Nyathi would use a leader who is already respected and who knows the lodge, and it costs less than hiring from outside. The risk is that she may lack skills in budgeting and planning, so she would need training. A new general manager would bring management skills and free Sipho for strategy, but would cost more and might be resented as an outsider. Whichever he chooses, Sipho must delegate real authority and communicate with staff. On balance he should promote Mrs Nyathi and support her with training, because staff already follow her and this would help to keep the remaining good staff.", hints: ["Compare the cost, skills and acceptance of each option."], explanation: "Weigh the two options, then recommend with a reason." }),
    ],
    hints: ["Think about who staff follow and what skills each option brings."],
    explanation: "Promoting the respected informal leader with training uses existing trust at low cost.",
  });

  b.card("DEFINITION", "Leadership", "The ability to influence, inspire and guide others to work willingly towards a shared goal.");
  b.card("CONCEPT", "Leader versus manager", "Leader: direction, vision, influence, followers choose to follow. Manager: plans, organises, controls, formal authority.");
  b.card("FACT", "Leadership roles", "Directors (vision and strategy), managers (departments), supervisors (teams), worker representatives (voice of employees).");
  b.card("FACT", "Qualities of a good leader", "Vision, communication, integrity, decisiveness, empathy, resilience, knowledge, willingness to delegate; which matter most depends on the situation.");
  b.card("DEFINITION", "Informal leader", "A person who influences colleagues through respect or skill without a formal position; can support or resist change.", undefined, { applies: ZIM });
  b.card("DEFINITION", "Formal leader", "A person with authority from a position, such as a director, manager or supervisor.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Purpose of leadership", "Gives direction, builds commitment and helps the business cope with change.");
  b.card("CONCEPT", "Leadership and performance", "Good leadership raises motivation, teamwork and quality and lowers absence and turnover, but market and resources also matter.");
  b.card("FORMULA", "Labour turnover (%)", "Number of employees leaving in the year / average number of employees x 100.");
});
