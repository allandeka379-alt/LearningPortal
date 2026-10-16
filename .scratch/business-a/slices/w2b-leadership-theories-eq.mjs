// W2b: leadership.theories-eq
import { concept, P, CAM } from "../lib.mjs";
import { mc, pmc } from "../tables/w2b-lib.mjs";

concept("abus.leadership.theories-eq", { file: "leadership/theories-eq", keyPrefix: "leadership.theories-eq" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which leadership theory suggests that effective leaders have particular personal qualities?",
    ok: ["Trait theory", "Correct: it looks at the personal characteristics of leaders."],
    bad: [["Contingency theory", "Contingency theory says the best style depends on the situation."], ["Behavioural theory", "Behavioural theory looks at what leaders do."], ["Transactional theory", "Transactional leadership exchanges rewards for performance."]],
    explanation: "Trait theory focuses on the qualities of leaders.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Blake and Mouton's managerial grid plots concern for production against",
    ok: ["Concern for people", "Correct: the two axes are task and people."],
    bad: [["Concern for profit", "Profit is not an axis of the grid."], ["Concern for shareholders", "Shareholders are not on the grid."], ["Concern for the environment", "The environment is not an axis of the grid."]],
    explanation: "The grid has two dimensions: concern for production and concern for people.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "According to **contingency theory**, the best style of leadership",
    ok: ["Depends on the situation", "Correct: the task, the followers and the circumstances all matter."],
    bad: [["Is always democratic", "Contingency theory denies that one style is always best."], ["Is the one used by the owner", "The owner's style is not a rule."], ["Never changes over time", "Contingency theory says the style should change with the situation."]],
    explanation: "Contingency theory says there is no single best style.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A leader on Blake and Mouton's grid with high concern for both production and people (9,9) is described as",
    ok: ["Team management", "Correct: high concern for both leads to commitment."],
    bad: [["Country club", "Country club is high concern for people but low for production."], ["Impoverished", "Impoverished is low concern for both."], ["Authority-compliance", "This is high concern for production but low for people."]],
    explanation: "9,9 is team management.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A manager at a fictional bakery in Gweru sets high output targets but shows little interest in staff problems. Where does she fall on the grid?",
    ok: ["High concern for production, low concern for people", "Correct: this is the authority-compliance style."],
    bad: [["High concern for people, low concern for production", "That is the country club style."], ["Low concern for both production and people", "That is the impoverished style."], ["Moderate concern for both production and people", "That is the middle of the road style."]],
    explanation: "High targets with little interest in people is authority-compliance (9,1).",
    hints: ["Which of the two concerns is she showing?"],
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional managing director in Harare inspires staff with a new vision for the business and encourages them to look beyond their own interests during a major restructuring. This is an example of",
    ok: ["Transformational leadership", "Correct: she inspires change through a shared vision."],
    bad: [["Transactional leadership based on rewards", "Transactional leaders exchange rewards for work and maintain routine."], ["Trait theory", "Trait theory is about personal qualities, not an approach to change."], ["Laissez-faire leadership", "Laissez-faire leaves staff to decide for themselves."]],
    explanation: "Inspiring a shared vision during major change is transformational leadership.",
    hints: ["Is the leader inspiring change or exchanging rewards?"],
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of these is a limitation of **trait theory**?",
    ok: ["Successful leaders do not all share the same traits", "Correct: leaders differ in personality and the situation matters."],
    bad: [["It teaches that leadership can be learned and trained easily", "Trait theory suggests qualities are not easily taught."], ["It ignores the qualities of leaders", "Qualities are its central idea."], ["It was developed only for small firms", "It is a general theory."]],
    explanation: "Leaders succeed with different traits, and trait theory ignores the situation.",
    hints: ["Do all great leaders look alike?"],
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Why might transformational leadership be less suitable for a stable factory with routine work?",
    ok: ["Employees may need clear routines rather than constant change", "Correct: inspiring change is less useful when little needs to change."],
    bad: [["Transformational leaders cannot communicate", "Communication is a strength of the style."], ["Workers do not respond to inspiration in any kind of business at all", "Many workers respond well to inspiration."], ["Transformational leaders never set targets", "They may set high targets."]],
    explanation: "Transformational leadership suits change; a stable routine may be better led by a transactional style.",
    hints: ["Think about what the style is designed for."],
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A manager at a fictional bank in Lusaka senses that her team is anxious about job cuts, even though no one has said so. According to Goleman, she is showing",
    ok: ["Social awareness", "Correct: she understands the emotions of others."],
    bad: [["Self-management of emotions", "Self-management is about controlling one's own emotions."], ["Self-awareness", "Self-awareness is about understanding one's own emotions."], ["Coercive power", "Coercive power is the power to punish, which is not shown."]],
    explanation: "Sensing other people's emotions is social awareness.",
    hints: ["Whose emotions is she reading?"],
    applies: CAM,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Behavioural theories of leadership suggest that leadership can be learned.",
    answer: true,
    explanation: "True. Behavioural theory looks at what leaders do, so effective behaviour can be taught.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "According to Goleman, emotional intelligence has no connection with effective leadership.",
    answer: false,
    explanation: "False. Goleman argued that emotional intelligence contributes to effective leadership, because leaders with it build trust, handle conflict and motivate teams.",
    hints: ["Why did Goleman study emotional intelligence in leaders?"],
    applies: CAM,
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each source of power to its meaning.",
    pairs: [["Legitimate power", "Comes from the position held"], ["Reward power", "Comes from being able to give benefits"], ["Coercive power", "Comes from being able to punish"], ["Expert power", "Comes from skill and knowledge"], ["Referent power", "Comes from being respected and admired"]],
    explanation: "Each source of power is matched to its basis.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "Goleman's four competencies are self-awareness, {{blank:a}}, social awareness and {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["self-management"], choices: ["self-management", "self-interest", "self-reward"] },
      { id: "b", accepted: ["social skills"], choices: ["social skills", "social class", "social status"] },
    ],
    explanation: "Goleman's four competencies are self-awareness, self-management, social awareness and social skills.",
    applies: CAM,
  });

  b.short({
    d: 1, skill: "RECALL",
    stem: "State the name given to leadership that inspires followers to share a vision and achieve major change.",
    accepted: ["transformational", "transformational leadership"],
    explanation: "Transformational leadership inspires a shared vision and change.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the psychologist who identified four competencies of emotional intelligence and linked them to leadership.",
    accepted: ["goleman", "daniel goleman"],
    explanation: "Daniel Goleman described the competencies of emotional intelligence.",
    applies: CAM,
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain what is meant by contingency theory of leadership.",
    points: ["It says that there is no single best style of leadership", "The best style depends on the situation", "Factors include the task, the followers and the circumstances"],
    modelAnswer: "Contingency theory says there is no single best style of leadership. The best style depends on the situation, including the task, the followers and the circumstances.",
    hints: ["Say what the best style depends on."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional hospital supplies company in Harare has a new inexperienced team. Explain **two** ways in which a leader could use the behavioural approach to help the team.",
    points: ["Show concern for the task by setting clear targets and giving instructions", "Application: new staff need to know what is expected", "Show concern for people by offering support and training", "Application: inexperienced staff gain confidence and make fewer mistakes"],
    modelAnswer: "The leader could show concern for the task by setting clear targets and instructions, since new staff need to know what is expected. The leader could show concern for people by offering support and training, so inexperienced staff gain confidence and make fewer mistakes.",
    hints: ["Think of concern for task and for people."],
    explanation: "Two behaviours, each applied to the team.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how a leader's emotional intelligence could improve a team's performance.",
    points: ["Self-management keeps the leader calm under pressure", "Social awareness lets the leader notice problems and morale in the team", "Social skills help the leader to resolve conflicts and build teamwork", "Staff who feel trusted and understood are more committed and productive"],
    modelAnswer: "Self-management keeps the leader calm under pressure, and social awareness lets the leader notice problems and low morale in the team. Social skills help to resolve conflicts and build teamwork. Staff who feel trusted and understood are more committed and productive.",
    hints: ["Use several of Goleman's competencies."],
    explanation: "Competencies linked to team performance.",
    applies: CAM,
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Assess the usefulness of Blake and Mouton's grid to the manager of a fictional hardware chain in Mutare.",
    points: ["It gives a simple way to describe a manager's style by task and people concern", "Application: it can show a manager who neglects staff, which explains low morale", "It suggests a style to aim for (team management) and helps to design training", "It ignores the situation, so team management may not suit an emergency", "Scores are subjective and may differ between observers", "Judgement with a reason: useful for diagnosis and training, but not as a rule for every case"],
    modelAnswer: "The grid is a simple way to describe a manager's style by concern for task and for people. It can show a manager who neglects staff, which may explain low morale, and it suggests a style to aim for, which helps to design training. But it ignores the situation, so team management may not suit an emergency, and scores are subjective. It is useful for diagnosis and training, but should not be treated as a rule for every case.",
    hints: ["Give a use, a limit and a judgement."],
    explanation: "One point per mark; the judgement needs a reason.",
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A fictional business: Tatenda's Cold Storage in Bulawayo is owned by a family. Its manager, Mr Phiri, is known for being tall, confident and loud, and the owner says, \"Some people are born leaders, and he is one.\" However, staff report that Mr Phiri never listens to them, and staff turnover is rising.",
    parts: [
      pmc(P, { label: "(a)", marks: 1, stem: "The owner's view that some people are born leaders is an example of", ok: ["Trait theory", "Correct: it assumes leaders have inborn qualities."], bad: [["Contingency theory", "Contingency theory says the best style depends on the situation."], ["Behavioural theory", "Behavioural theory looks at what leaders do."], ["Transformational leadership", "This is an approach to change, not a theory of born leaders."]], explanation: "Believing that leaders are born is the trait view." }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain **one** weakness of relying on trait theory when choosing a manager.", points: ["Traits such as confidence do not guarantee effective leadership", "Application: Mr Phiri is confident but does not listen", "The situation and the skills of the leader also matter"], modelAnswer: "Traits such as confidence do not guarantee effective leadership: Mr Phiri is confident but does not listen. The situation and the skills of the leader also matter.", hints: ["Use the evidence about Mr Phiri."], explanation: "Weakness of trait theory applied to the case." }),
      P.manual({ label: "(c)", marks: 5, stem: "Analyse how Mr Phiri's behaviour may be linked to the rising staff turnover, using Blake and Mouton's grid.", points: ["He seems to have a high concern for production but low concern for people", "He does not listen, so staff feel undervalued", "This is close to the authority-compliance position", "Staff who feel undervalued leave, which raises turnover", "The business then pays more to recruit and train replacements"], modelAnswer: "He seems to have a high concern for production but low concern for people, close to the authority-compliance position. He does not listen, so staff feel undervalued, and staff who feel undervalued leave, which raises turnover. The business then pays more to recruit and train replacements.", hints: ["Place him on the grid first."], explanation: "Grid position, effect on staff, consequence." }),
    ],
    hints: ["Use the evidence about how Mr Phiri behaves."],
    explanation: "Trait theory is limited; his behaviour suggests a high task, low people style.",
  });

  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Farai's Foods in Masvingo makes packaged snacks. Sales have fallen for two years and morale is low. Farai, the new managing director, plans a major change to healthier snacks, closing one old factory. She holds open meetings, shares her vision and listens to concerns. She stays calm when workers shout at her. Some managers say that she should simply give orders and reward those who comply.",
    parts: [
      P.manual({ label: "(a)", marks: 6, stem: "Analyse Farai's approach using Goleman's competencies (Cambridge A Level) or the features of transformational leadership.", points: [["Vision: she shares a clear plan for healthier snacks", 1], ["Social awareness or empathy: she listens to concerns", 1], ["Self-management: she stays calm under pressure", 1], ["Inspiring commitment: staff may support a change they understand", 1], ["Consequence: lower resistance to the factory closure", 1], ["Consequence: better morale may improve productivity", 1]], modelAnswer: "Farai shares a clear vision of healthier snacks, listens to concerns, which shows social awareness, and stays calm under pressure, which shows self-management. Staff who understand and are listened to are more likely to support the change, so resistance to the factory closure is lower, and better morale may improve productivity.", hints: ["Link her actions to Goleman's competencies or transformational leadership."], explanation: "Her actions linked to leadership theory and effects." }),
      P.manual({ label: "(b)", marks: 9, stem: "Evaluate whether Farai should lead the change in a transformational way or follow the advice of her managers to give orders and reward compliance.", points: [["Transformational: builds commitment and understanding, suits major change and low morale", 2], ["Risk: slow, depends on her personality, workers may still resist closure", 2], ["Transactional: quick, clear and rewards those who comply", 2], ["Risk: compliance not commitment; morale already low; the best staff may leave", 1], ["Contingency view: she may use directive action for the closure but transformational leadership for the new range", 1], ["Judgement with a reason", 1]], levels: [[3, 7, 9, "Weighs both approaches with application to the snack factory; justified recommendation with a limitation"], [2, 4, 6, "Explains both approaches with some application; judgement weak"], [1, 1, 3, "Describes leadership theories with little application"]], modelAnswer: "A transformational approach builds commitment and understanding, which suits a major change at a time of low morale. But it can be slow, it depends on her personality, and workers may still resist the closure. Giving orders and rewarding compliance is quick and clear, but it produces compliance rather than commitment, morale is already low, and the best staff may leave. A contingency view suggests combining the two: firm, clear decisions on the closure, with transformational leadership for the new range. On balance Farai should lead the change transformationally, with clear decisions on the closure, because the business needs the staff's commitment to rebuild sales.", hints: ["Weigh commitment against speed, then consider whether both can be used."], explanation: "Compare the two approaches, then recommend with a reason." }),
    ],
    hints: ["Think about what the business needs from its staff in this change."],
    explanation: "Transformational leadership for commitment, with clear decisions where needed.",
  });

  b.card("DEFINITION", "Trait theory", "Effective leaders have particular personal qualities; limitation: successful leaders differ and the situation matters.");
  b.card("DEFINITION", "Behavioural theory", "Effective leadership depends on what leaders do and can be learned; includes Blake and Mouton's grid.");
  b.card("FACT", "Blake and Mouton's grid", "Concern for production (task) against concern for people, each 1 to 9: impoverished 1,1; country club 1,9; authority-compliance 9,1; middle of the road 5,5; team management 9,9.");
  b.card("DEFINITION", "Contingency theory", "No single best style; the best leadership depends on the task, the followers and the circumstances.");
  b.card("FACT", "Sources of power", "Legitimate (position), reward, coercive (punishment), expert (skill) and referent (respect).");
  b.card("DEFINITION", "Transformational leadership", "Inspires followers with a shared vision to achieve more and to carry out major change; contrasts with transactional leadership.");
  b.card("DEFINITION", "Transactional leadership", "Leadership based on exchanging rewards for performance and keeping routine running.");
  b.card("FACT", "Goleman's four competencies", "Self-awareness, self-management, social awareness and social skills.", undefined, { applies: CAM });
  b.card("CONCEPT", "Choosing a theory", "Trait for selection, behavioural for training, contingency for flexibility, power for influence, transformational for change.");
});
