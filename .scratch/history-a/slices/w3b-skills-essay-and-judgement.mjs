// W3b: ahist.skills.essay-and-judgement (Both boards; ZIMSEC node S; Cambridge AS-S).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

const PARA_DESC = "In 1896 the Ndebele rose in March. They had lost land and cattle. They also had to work for the settlers and pay taxes. Then the Shona rose in June.";
const PARA_ANAL = "Loss of land and cattle was the underlying cause of the Ndebele rising, because both were the basis of wealth and social order; when the Company seized them after 1893-94 it removed that basis, which explains why the grievance was felt across the whole society. Rinderpest in 1896 made matters worse, but it acted on an existing grievance and was therefore a trigger, not the root.";

concept("ahist.skills.essay-and-judgement", { file: "skills/essay-and-judgement", keyPrefix: "skills.essay-and-judgement" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does the command word 'explain' require in an essay or structured question?",
    options: [
      ["Give reasons and show how each reason led to the result", "Correct: reasons need to be developed."],
      ["List the main facts in the order in which they happened", "That is description or narrative."],
      ["State your opinion without giving evidence for it", "Opinion needs support."],
      ["Give a short definition of each key term in the question", "That is only a small part of an explanation."],
    ],
    answer: "A",
    explanation: "To explain is to give reasons and show how they connect to the result; each reason should be developed with evidence.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of the following is the best description of a 'line of argument'?",
    options: [
      ["The main answer to the question, developed in every paragraph", "Correct: it gives the essay direction."],
      ["A line drawn under the title of the question before you start", "This is not an argument."],
      ["A list of the dates and names that you have memorised for the topic", "Facts are evidence, not an argument."],
      ["The last paragraph of an essay, in which the points are repeated", "A conclusion should reflect the argument, but the argument runs through the essay."],
    ],
    answer: "A",
    explanation: "The line of argument is the answer to the question, which each paragraph supports and which the conclusion confirms.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which command word requires you to consider an alternative view and reach a judgement about the extent of the claim?",
    options: [
      ["To what extent, which asks how far a claim is correct", "Correct: it asks how much a claim is correct."],
      ["Describe, which asks only for the main features given", "This asks for features only."],
      ["List, which asks only for items without a judgement", "This asks for items without a judgement."],
      ["Outline, which asks only for a brief account of events", "This asks for a brief account."],
    ],
    answer: "A",
    explanation: "'To what extent' and 'how far' require a balanced consideration of the view and alternatives, and a judgement.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: [
      "Read the paragraph.",
      "",
      `> ${PARA_ANAL}`,
      "",
      "Why is this paragraph analytical and not descriptive?",
    ].join("\n"),
    options: [
      ["It explains why the factor mattered and separates cause from trigger", "Correct: it makes a claim, explains it and weighs a second factor."],
      ["It gives many more dates than the descriptive paragraph does", "Analysis depends on explanation, not on the number of dates."],
      ["It is longer, and longer paragraphs always earn much higher marks", "Length alone does not earn marks."],
      ["It avoids mentioning evidence so that the whole answer stays very short", "It uses specific evidence."],
    ],
    answer: "A",
    hints: ["Look for claims, reasons and a comparison between factors."],
    explanation: "The paragraph makes a claim (underlying cause), supports it with evidence, explains the link and compares it with another factor (the trigger).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: [
      "Read the paragraph.",
      "",
      `> ${PARA_DESC}`,
      "",
      "What is the main weakness of the paragraph as an answer to 'Explain why the Ndebele rose in 1896'?",
    ].join("\n"),
    options: [
      ["It describes grievances but does not explain how they led to the rising", "Correct: it lacks reasons and links."],
      ["It gives dates which cannot be correct for the events described in the paragraph", "The dates are correct."],
      ["It is too short to contain any information about the rising of that year", "It contains information, but not explanation."],
      ["It mentions the Shona, who were not involved in the rising at all", "The Shona rose in June 1896."],
    ],
    answer: "A",
    hints: ["Ask whether the paragraph says why."],
    explanation: "The paragraph lists facts in sequence; an explanation would say how each grievance produced the rising and which mattered most.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which pair describes the concepts of 'cause' and 'trigger' correctly?",
    options: [
      ["A cause is a lasting condition; a trigger is the event that sets it off", "Correct: the trigger acts on existing conditions."],
      ["A cause is an accident of chance; a trigger is a long-term condition", "This reverses the meanings."],
      ["A cause and a trigger mean exactly the same thing in all history writing", "Historians distinguish them."],
      ["A cause is the result of an event; a trigger is its first recorded date", "A result is a consequence."],
    ],
    answer: "A",
    hints: ["Think of dry grass and a spark."],
    explanation: "Underlying causes make an event possible; a trigger is the immediate event that releases them. Distinguishing the two is a mark of analysis.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion best answers 'To what extent was the Zollverein the main cause of German unification?'",
    options: [
      ["It prepared the ground, but war and Bismarck's diplomacy were decisive", "Correct: it gives a judgement of extent with reasons."],
      ["The Zollverein was a customs union, and it began on 1 January 1834", "It restates a fact and does not answer the question."],
      ["There were many causes of German unification, and all of them were important", "It does not rank or weigh."],
      ["The Zollverein was the main cause, as it was important in many ways", "It asserts without a reason."],
    ],
    answer: "A",
    hints: ["Which answer says how far and why?"],
    explanation: "A good conclusion makes a judgement of extent, gives the reason, and refers to the alternatives weighed in the essay.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A student plans an essay on 'How successful was Stalin's industrialisation?' Which plan shows the best understanding of 'how successful'?",
    options: [
      ["Define success by aims, measure results, weigh costs and judge", "Correct: success needs criteria."],
      ["Describe the Five-Year Plans in the order in which they started", "This is narrative without judgement."],
      ["List all the factories that were built between 1928 and 1941", "A list of facts is not an evaluation."],
      ["State that Stalin was a cruel ruler and describe his purges", "Opinion on a person does not assess success of a policy."],
    ],
    answer: "A",
    hints: ["Think of criteria for success."],
    explanation: "'How successful' requires criteria (such as the aims of the plans), evidence of results, costs, and a judgement.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "An introduction to an essay should tell the whole story of the topic in detail.",
    answer: false,
    explanation: "False. An introduction states the argument and the factors to be discussed; it does not retell events.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In an essay that asks 'how far', you should consider only the view in the question.",
    answer: false,
    explanation: "False. You must test the view against at least one alternative and reach a judgement.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "A conclusion that says 'there were many causes' always earns full marks because it is true.",
    answer: false,
    hints: ["A judgement must rank or weigh."],
    explanation: "False. A conclusion must judge: say which cause mattered most or how far the view is correct, and why.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each command word with what it requires.",
    pairs: [
      ["Describe", "Give the main features with accurate detail"],
      ["Explain", "Give developed reasons"],
      ["To what extent", "Weigh a claim against alternatives and judge how far"],
      ["Assess", "Judge importance or value, weighing evidence"],
    ],
    explanation: "Knowing what the command word asks is the first step in planning.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each part of a paragraph with its job.",
    pairs: [
      ["Point", "States the claim and links it to the question"],
      ["Evidence", "Gives precise facts such as dates, names and laws"],
      ["Explanation", "Shows how the evidence supports the point"],
      ["Link", "Compares the factor with others or with the question"],
    ],
    hints: ["Think of the order: claim, fact, reasoning, comparison."],
    explanation: "A paragraph with all four parts argues and does not merely describe.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The main answer to an essay question, stated in the introduction and developed throughout, is the {{blank:a}} of argument; the event that sets off long-term conditions is the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["line"], choices: ["line", "title", "date", "quotation"] },
      { id: "b", accepted: ["trigger"], choices: ["trigger", "result", "source", "criterion"] },
    ],
    explanation: "A line of argument runs through the essay; a trigger releases underlying conditions.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to the standards by which a historian decides which factor mattered most (for example scale, duration or necessity)? Give the two-word term: criteria for ...",
    accepted: ["judgement", "judgment", "judging", "criteria for judgement", "criteria for judgment"],
    wrong: ["description"],
    explanation: "**Criteria for judgement**: the standards used to weigh factors.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe four features of a good conclusion to a historical essay.",
    points: ["It answers the question directly", "It says how far or which factor mattered most", "It gives reasons for the judgement", "It reflects the weighing in the essay and introduces no new evidence"],
    modelAnswer: "A good conclusion answers the question directly, says how far the claim is correct or which factor mattered most, and gives reasons for the judgement. It reflects the weighing in the essay and introduces no new evidence.",
    explanation: "One mark for each feature described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain the difference between a cause and a trigger, using an example from any period.",
    points: [["A cause is an underlying condition that makes an event possible, for example the loss of land and cattle before the 1896 risings", 2], ["A trigger is the immediate event that sets the conditions off, for example rinderpest and the Jameson Raid in 1896; historians judge which mattered more", 2]],
    hints: ["Think of a long-term condition and a short-term event."],
    modelAnswer: "A cause is an underlying condition that makes an event possible, for example the loss of land and cattle before the 1896 risings. A trigger is the immediate event that sets those conditions off, for example rinderpest and the Jameson Raid in 1896. Historians judge which mattered more, but the grievances had to exist for the triggers to work.",
    explanation: "Any valid example is credited: one mark for each definition and one for an accurate example.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Write an opening sentence stating a line of argument in answer to 'To what extent was Bismarck responsible for German unification?', and explain why it is a line of argument.",
    points: [["A clear claim that gives an answer, for example that Bismarck was an important but not the only cause, since Prussian economic strength and nationalism were also vital", 2], ["It is a line of argument because it answers the question, takes a position about the extent and signals the factors that will be weighed", 2]],
    hints: ["An answer, a position and a signal of the factors."],
    modelAnswer: "Bismarck was an important cause of German unification but not the only one, because Prussia's economic strength and the growth of nationalism made his success possible. This is a line of argument because it answers the question, takes a position on the extent and signals the factors that the essay will weigh.",
    explanation: "Credit any answerable claim of the right kind, with a reason.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true,
    stem: [
      "Study the two sources and answer the questions.",
      "",
      source("Source A", "a speech by a fictional African teacher at a school prize-giving, 1925",
        "Our young people ask why history should be learnt. I say that it is learnt so that we may know how we came to be where we are. A nation that does not know its past is like a traveller who has forgotten the road."),
      "",
      source("Source B", "an article in a fictional newspaper for settlers, 1925",
        "History at school should teach children the achievements of the empire and the duties of citizens. Details of the past are of less importance than the good that they teach."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Compare Sources A and B on the purpose of learning history.", points: [["Agree: both see history as having a purpose of teaching something to the learner", 2], ["Differ: A says it explains how a nation came to be where it is and gives knowledge of the past; B says it should teach the achievements of the empire and the duties of citizens, with details of less importance", 2]] }),
      P.manual({ label: "(b)", marks: 8, stem: "'Historians should aim to explain the past, not to teach lessons.' How far do the sources and your own knowledge support this view?", type: "EXTENDED_RESPONSE", levels: levels(8), points: [["Support: A values understanding of how things came about; this fits the historian's task of explaining causes and change", 2], ["Challenge: B wants history to teach citizenship and uses it for a purpose; this reflects how governments and propaganda have used history, though the writer's interest in the empire limits his reliability", 2], ["Own knowledge: history has been used in the interests of states (for example colonial school syllabuses), and the Heritage-Based Curriculum shows continuing debate about the purposes of history", 2], ["Judgement: historians should aim to explain accurately, while accepting that history informs citizens; the danger lies in distorting evidence to teach a lesson", 2]], modelAnswer: "The sources and my knowledge support the view in part. Source A treats history as a means of understanding how a nation came to be where it is, which fits the historian's task of explaining the past. Source B, from a newspaper for settlers, wants history to teach the achievements of the empire and the duties of citizens, and treats detail as less important. This is history used for a purpose, and the writer's interest in the empire limits its reliability. My own knowledge shows that history has often been used by states to teach lessons, as in colonial school syllabuses, and debate about the purposes of history continues. I conclude that historians should aim first to explain the past accurately from evidence, but that history inevitably informs how citizens see themselves; the danger comes when evidence is distorted in order to teach a lesson." }),
    ],
    hints: ["For (b), use both sources and your own knowledge, and judge how far."],
    explanation: "Both sources are invented. The exercise combines source skills with the idea of a judgement.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Write a plan and a concluding paragraph for the question: 'To what extent was the French Revolution the cause of the Napoleonic Wars?' Explain how your conclusion shows judgement.",
    levels: levels(8),
    points: [
      ["Plan: states a line of argument and three or four factors (the Revolution's ideas and threat to monarchies, the French armies and revolutionary expansion, Napoleon's ambition, British hostility and the rivalry of the powers)", 2],
      ["The conclusion answers the question directly and says how far", 2],
      ["The conclusion weighs the factors using criteria (for example continuity of aims, who started the wars, and the role of Napoleon)", 2],
      ["Explanation of how the conclusion shows judgement: it ranks causes and gives a reason", 2],
    ],
    hints: ["A plan lists the argument and factors; a conclusion judges."],
    modelAnswer: "Plan. Line: the Revolution caused the wars of 1792-1802, but Napoleon's ambition and the opposition of the other powers were more important in the later wars. Factors: (1) the Revolution's ideas and the fear it caused among the monarchies; (2) the war of 1792 and the revolutionary armies' expansion; (3) Napoleon's ambition and the creation of the empire; (4) British hostility and the rivalry of the powers. Conclusion. The French Revolution was the main cause of the wars of the 1790s, since its ideas threatened the monarchies and its leaders declared war in 1792. But the wars after 1803 had other causes: Napoleon's ambition for an empire, the refusal of Britain to accept French domination of Europe, and the competition of the powers. I conclude that the Revolution caused the war but not the whole of the Napoleonic Wars. This conclusion shows judgement because it separates two phases, ranks the causes and gives a reason for the ranking.",
    explanation: "Credit a plan with an argument and factors, and a conclusion that judges.",
  });

  b.card("DEFINITION", "What is a line of argument?", "The main answer to the question, stated at the start and developed in every paragraph.");
  b.card("DEFINITION", "What are criteria for judgement?", "The standards used to decide which factor mattered most, such as scale, duration or whether it was necessary.");
  b.card("DEFINITION", "What is the difference between a cause and a trigger?", "A cause is an underlying condition; a trigger is the immediate event that sets it off.");
  b.card("CONCEPT", "What does 'to what extent' ask you to do?", "Weigh the view in the question against alternatives and judge how far it is correct, with reasons.");
  b.card("CONCEPT", "What is the structure of an analytical paragraph?", "Point, evidence, explanation, link to the question.");
  b.card("CONCEPT", "What should an introduction contain?", "A definition of key terms if needed, the line of argument and the factors to be discussed; not a retelling of events.");
  b.card("CONCEPT", "What should a conclusion do?", "Answer the question directly, say how far or which factor mattered most, and give reasons; no new evidence.");
  b.card("CONCEPT", "What are the three concepts of historical thinking in this lesson?", "Cause and consequence; change and continuity; significance.");
  b.card("FACT", "How are the ZIMSEC and Cambridge essays organised?", "ZIMSEC: four 25-mark essays in 3 hours. Cambridge Paper 2: part (a) 10 marks and part (b) 20 marks per question; Paper 4: one 30-mark essay.");
});
