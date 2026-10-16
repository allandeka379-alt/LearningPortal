// W2b: management.styles-mcgregor
import { concept, P } from "../lib.mjs";
import { mc, pmc } from "../tables/w2b-lib.mjs";

concept("abus.management.styles-mcgregor", { file: "management/styles-mcgregor", keyPrefix: "management.styles-mcgregor" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which management style involves the manager making decisions alone and giving orders?",
    ok: ["Autocratic", "Correct: decisions are made at the top and passed down as orders."],
    bad: [["Democratic", "Democratic managers involve employees in decisions."], ["Laissez-faire", "Laissez-faire managers leave employees to decide."], ["Participative", "In the participative style employees take part in the decision."]],
    explanation: "An autocratic manager decides alone and expects obedience.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Who developed Theory X and Theory Y?",
    ok: ["Douglas McGregor", "Correct: McGregor described two sets of assumptions about workers."],
    bad: [["Frederick Taylor", "Taylor developed scientific management."], ["Abraham Maslow", "Maslow developed the hierarchy of needs."], ["Henri Fayol", "Fayol analysed the functions of management."]],
    explanation: "McGregor's Theory X and Theory Y describe managers' assumptions about workers.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A manager who believes that workers dislike work and must be closely supervised holds",
    ok: ["Theory X assumptions", "Correct: Theory X assumes workers dislike work and need control."],
    bad: [["Theory Y assumptions", "Theory Y assumes workers can enjoy work and accept responsibility."], ["Laissez-faire assumptions", "Laissez-faire is a style, not McGregor's theory."], ["Participative assumptions", "Participative is a style of democratic management."]],
    explanation: "Close supervision follows from the belief that workers dislike work: Theory X.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a **consultative** style of management, the manager",
    ok: ["Asks for views and then makes the final decision", "Correct: employees are consulted but the manager decides."],
    bad: [["Lets the employees make the decision", "That would be participative or laissez-faire."], ["Makes the decision without informing anyone", "That would be autocratic."], ["Avoids any contact with employees", "Consultation involves contact and discussion."]],
    explanation: "Consultative managers seek opinions but keep the final decision.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional factory in Gweru suddenly finds a gas leak and the supervisor orders everyone out immediately. Which style is the supervisor using, and is it suitable?",
    ok: ["Autocratic; suitable because speed matters", "Correct: in an emergency there is no time to consult."],
    bad: [["Laissez-faire; suitable because workers are skilled", "Leaving workers to decide would waste time in an emergency."], ["Participative; suitable because workers' views are needed", "There is no time for group decisions in an emergency."], ["Paternalistic; suitable because it avoids orders", "The supervisor is giving orders, which is not a paternalistic approach."]],
    explanation: "Immediate orders are autocratic, and this style is suitable when quick, clear action is needed for safety.",
    hints: ["Is there time to consult?"],
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "The owner of a fictional family bakery in Masvingo makes all the decisions but explains each one to staff, pays for their children's school books and expects loyalty in return. This is best described as",
    ok: ["Paternalistic", "Correct: the owner decides but cares for staff welfare and explains decisions."],
    bad: [["Participative", "Staff do not take part in the decisions."], ["Laissez-faire", "The owner makes the decisions, not the staff."], ["Theory Y", "Theory Y is an assumption about workers, not this style of management."]],
    explanation: "A paternalistic manager decides but acts in the interests of employees.",
    hints: ["Who decides, and how does the owner treat staff?"],
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "A manager with Theory Y assumptions is most likely to",
    ok: ["Give workers responsibility and trust them to act", "Correct: Theory Y holds that workers can direct themselves."],
    bad: [["Check every task at short intervals", "This is typical of Theory X."], ["Use penalties as the main motivator", "Penalties as the main motivator are typical of Theory X."], ["Make every decision without consulting staff", "This is typical of an autocratic Theory X manager."]],
    explanation: "Theory Y assumes that workers accept responsibility, so managers delegate and involve them.",
    hints: ["Theory Y has a positive view of workers."],
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional software firm in Harare employs highly skilled programmers who work well alone. The manager lets them choose their own methods and deadlines. What is the most likely reason this style is suitable?",
    ok: ["The staff are skilled and self-motivated", "Correct: laissez-faire works best when employees have the ability and desire to work without close direction."],
    bad: [["The staff need close supervision", "Close supervision is not needed for skilled, self-motivated staff."], ["Decisions must be made faster than staff can think", "Letting staff decide is not about speed."], ["The manager does not trust the staff", "A manager who lets staff decide shows trust."]],
    explanation: "A laissez-faire style suits skilled, self-directed professionals who do not need much instruction.",
    hints: ["What does the style assume about the employees?"],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A paternalistic manager involves employees in making decisions.",
    answer: false,
    explanation: "False. A paternalistic manager makes the decision but takes account of the interests of employees and explains the reasons. Democratic managers involve employees.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "A manager's Theory X assumptions can make workers behave in the way the manager expects.",
    answer: true,
    explanation: "True. Workers who are closely controlled and not trusted may become passive and do only what they are told, which appears to confirm the manager's view.",
    hints: ["Think about how workers respond to being distrusted."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each style or theory to its description.",
    pairs: [["Autocratic", "The manager decides alone"], ["Consultative", "The manager asks for views, then decides"], ["Participative", "The group takes part in the decision"], ["Laissez-faire", "Employees organise their own work"], ["Paternalistic", "The manager decides but looks after staff welfare"]],
    explanation: "Each style fits one description.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "McGregor's {{blank:a}} assumes that workers dislike work, while {{blank:b}} assumes that they can enjoy work and accept responsibility.",
    blanks: [
      { id: "a", accepted: ["Theory X"], choices: ["Theory X", "Theory Y"] },
      { id: "b", accepted: ["Theory Y"], choices: ["Theory X", "Theory Y"] },
    ],
    explanation: "Theory X is the negative view of workers and Theory Y the positive view.",
  });

  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the management style in which employees are left to organise their own work with very little direction.",
    accepted: ["laissez-faire", "laissez faire", "laissezfaire"],
    explanation: "Laissez-faire managers leave decisions to employees.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "State the form of democratic management in which the group takes part in the decision itself.",
    accepted: ["participative", "participative democratic", "participative style"],
    explanation: "In the participative style employees take part in the decision.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain what is meant by an autocratic management style.",
    points: ["The manager makes the decisions alone", "Communication is one-way, from the top down", "Employees are expected to obey without question"],
    modelAnswer: "An autocratic manager makes decisions alone, with communication going one way from the top down. Employees are expected to carry out orders without question.",
    hints: ["Who decides, and which way does communication flow?"],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional supermarket in Harare plans to change its opening hours. Explain **two** advantages of using a consultative style for this decision.",
    points: ["Staff know the customers' habits and may suggest better hours", "Application: cashiers may know which evenings are busiest", "Staff feel that they have been heard", "Application: they are more likely to accept the new hours and less likely to leave"],
    modelAnswer: "Staff know customers' habits and may suggest better hours, for example which evenings are busiest. Staff who have been heard are more likely to accept the new hours and less likely to leave.",
    hints: ["Think about information and acceptance."],
    explanation: "Two advantages, each applied to the supermarket.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how a manager's Theory X assumptions might affect the motivation of employees.",
    points: ["Close supervision and orders show the manager does not trust employees", "Employees feel little responsibility or recognition", "Motivation falls and employees only do what they are told", "Skilled employees may leave, raising recruitment costs"],
    modelAnswer: "Close supervision and orders show the manager does not trust employees, so they feel little responsibility or recognition. Motivation falls and they only do what they are told, and skilled employees may leave, which raises recruitment costs.",
    hints: ["Trace the effect from supervision to behaviour to cost."],
    explanation: "Trust, motivation, behaviour and cost.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Assess whether a democratic style is the most suitable for a fictional small restaurant in Victoria Falls.",
    points: ["Waiters know customers and can suggest improvements", "Involvement can raise motivation and reduce staff turnover", "Application: tourist-season staff who are heard may stay longer", "Decisions may be slow at busy times", "A new or inexperienced team may need clearer direction", "Judgement with a reason: democratic for planning, but autocratic for urgent service decisions"],
    modelAnswer: "Waiters know customers and can suggest improvements, and involvement can raise motivation and reduce staff turnover, which is helpful in a tourist season. But decisions may be slow at busy times, and an inexperienced team may need clear direction. A democratic style is best for planning and menus, while urgent service decisions in the rush should be made quickly by the manager.",
    hints: ["Give a benefit, a limitation and a judgement."],
    explanation: "One point per mark; the judgement needs a reason.",
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A fictional business: Nyasha manages a team of 15 cleaners at a hotel in Masvingo. Nyasha believes that cleaners avoid work if not watched, so she inspects each room and gives orders without asking for suggestions. Several cleaners have complained and two have resigned.",
    parts: [
      pmc(P, { label: "(a)", marks: 1, stem: "Nyasha's style is best described as", ok: ["Autocratic", "Correct: she decides alone and gives orders."], bad: [["Participative", "Cleaners do not take part in decisions."], ["Laissez-faire", "She controls the work closely."], ["Consultative", "She does not ask for suggestions."]], explanation: "Orders without consultation are autocratic." }),
      pmc(P, { label: "(b)", marks: 1, stem: "Her belief that cleaners avoid work is an example of", ok: ["Theory X", "Correct: Theory X assumes workers avoid work."], bad: [["Theory Y", "Theory Y assumes workers can enjoy work."], ["Job enrichment", "Job enrichment is a way of making the job itself more rewarding."], ["Piece rate", "Piece rate is a method of payment."]], explanation: "Believing that workers avoid work if not watched is a Theory X view." }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain **two** reasons why Nyasha's style may have caused cleaners to resign.", points: ["They feel distrusted because every room is inspected", "Application: experienced cleaners know how to do the job and may feel insulted", "They have no say in how work is done", "Application: suggestions for faster cleaning routines are ignored, so they feel unvalued"], modelAnswer: "They feel distrusted because every room is inspected, and experienced cleaners know how to do the job and may feel insulted. They also have no say in how work is done, so suggestions are ignored and they feel unvalued.", hints: ["Think about trust and involvement."], explanation: "Two reasons, each applied to the cleaners." }),
      P.manual({ label: "(d)", marks: 3, stem: "Suggest **one** change that Nyasha could make and justify it.", points: ["Hold short meetings to ask the cleaners for suggestions (a consultative style)", "Because the cleaners know the job and may improve the work", "Staff who are heard are more likely to stay"], modelAnswer: "Nyasha could hold short meetings to ask the cleaners for suggestions, a consultative style. The cleaners know the job and may improve the work, and staff who are heard are more likely to stay.", hints: ["Choose a change and say why it works."], explanation: "A change with a reason." }),
    ],
    hints: ["Link the evidence in the case to the style and the theory."],
    explanation: "Autocratic, Theory X; the style explains the resignations; consultation is a remedy.",
  });

  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Tatenda's Software in Bulawayo employs 12 programmers and 4 trainees. Tatenda uses a laissez-faire style with all of them. The programmers like the freedom and produce good work, but the trainees often make mistakes, miss deadlines and say they do not know what is expected. A client has complained about a late delivery.",
    parts: [
      P.manual({ label: "(a)", marks: 6, stem: "Analyse why laissez-faire management works for the programmers but not for the trainees.", points: [["Programmers are skilled and self-motivated, so they can organise their own work", 2], ["Trainees lack experience, so they need instruction and feedback", 2], ["Without direction the trainees do not know the priorities or deadlines", 1], ["The result is mistakes and late delivery, which harm the client's confidence", 1]], modelAnswer: "The programmers are skilled and self-motivated, so they can organise their own work. The trainees lack experience, so they need instruction and feedback. Without direction they do not know the priorities or deadlines, which leads to mistakes and late delivery that harm the client's confidence.", hints: ["Compare the skills of the two groups."], explanation: "The style fits skilled staff and not trainees." }),
      P.manual({ label: "(b)", marks: 9, stem: "Evaluate whether Tatenda should change to a different style for the whole firm or use different styles for different groups.", points: [["One style for all: simple and fair, avoids resentment", 2], ["But no single style suits both: autocratic or consultative for trainees, laissez-faire for experienced programmers", 2], ["Different styles: better results for each group and trainees learn faster", 2], ["Different styles need a manager who is flexible and can explain the difference to staff", 1], ["Costs: time to supervise trainees; risk of programmers feeling the trainees are favoured", 1], ["Judgement with a reason, for example consultative and closely supported for trainees, with a plan to give more freedom as they gain skill", 1]], levels: [[3, 7, 9, "Weighs one style against different styles with application to programmers and trainees; justified recommendation with a limitation"], [2, 4, 6, "Explains the options with some application; judgement weak"], [1, 1, 3, "Describes styles with little application"]], modelAnswer: "A single style is simple and avoids resentment, but no one style suits programmers and trainees. The programmers work well with freedom, while the trainees need clear instruction and feedback. Using different styles should give better results for each group and help the trainees learn faster, but it needs a flexible manager who explains the difference, and supervising the trainees takes time. Tatenda should use a consultative style with close support for the trainees and increase their freedom as they gain skill, while keeping laissez-faire for the programmers. This should prevent late deliveries while keeping the freedom the programmers value.", hints: ["Weigh simplicity against suitability for each group."], explanation: "Compare one style with different styles, then recommend with a reason." }),
    ],
    hints: ["Think about skill and experience of each group."],
    explanation: "Different styles for different groups, with freedom increasing as skills grow.",
  });

  b.card("DEFINITION", "Management style", "The way in which a manager makes decisions, communicates and uses authority.");
  b.card("DEFINITION", "Autocratic style", "Manager decides alone and gives orders; one-way communication. Suits emergencies and inexperienced staff.");
  b.card("DEFINITION", "Democratic style", "Employees involved in decisions: consultative (manager asks, then decides) or participative (group decides together).");
  b.card("DEFINITION", "Laissez-faire style", "Employees organise their own work with little direction; suits skilled, self-motivated staff.");
  b.card("DEFINITION", "Paternalistic style", "Manager decides but acts in the interests of staff, explaining decisions and caring for their welfare.");
  b.card("FACT", "Theory X (McGregor)", "Workers dislike work, avoid responsibility and need control and threats; leads to autocratic, close supervision.");
  b.card("FACT", "Theory Y (McGregor)", "Workers can enjoy work, seek responsibility and direct themselves; leads to democratic, delegating management.");
  b.card("CONCEPT", "Choosing a style", "Depends on the task, the employees' skill and experience, the time available and the manager; no style is best everywhere.");
  b.card("CONCEPT", "Self-fulfilling assumptions", "Workers who are distrusted and closely controlled may become passive, which seems to confirm the manager's Theory X view.");
});
