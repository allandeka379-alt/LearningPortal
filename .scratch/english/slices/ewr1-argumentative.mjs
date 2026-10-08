// Slice EWR1: argumentative and persuasive writing.
import { concept } from "../lib.mjs";

concept("eng.composition.argumentative", { file: "composition/argumentative", keyPrefix: "composition.argumentative" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In an argumentative composition, what is a **rebuttal**?",
    options: [
      ["Your answer showing why an opposing point is weak", "Correct: a rebuttal answers the counter-argument."],
      ["The opening sentence that grabs the reader's attention", "That is the hook."],
      ["A list of every reason supporting your position", "Reasons support your side; a rebuttal answers the other side."],
      ["A summary of the whole composition at the end", "That is part of the conclusion."],
    ],
    answer: "A",
    explanation: "A **counter-argument** is a point the other side would make; the **rebuttal** is your reply, showing why it is weaker or how the problem can be solved.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which title asks for an **argumentative** (one-sided) composition rather than a discursive (balanced) one?",
    options: [
      ["\"Homework should be abolished.\" Do you agree?", "Correct: Do you agree? asks you to take and defend a side."],
      ["Discuss the advantages and disadvantages of homework.", "This asks for both sides to be weighed: a discursive task."],
      ["Describe a typical evening of homework at your house.", "This asks for a description, not an argument."],
      ["Write a story that begins: \"The homework was missing.\"", "This asks for a narrative."],
    ],
    answer: "A",
    explanation: "*Do you agree?*, *Argue for or against* and *Should…?* ask for a position. *Discuss*, *consider both sides* and *advantages and disadvantages* ask for a balanced discussion.",
  });
  b.mcq({
    d: 2, skill: "ANALYSIS", daily: true,
    stem: "Identify the persuasive device in this sentence.\n\n*Would any parent accept a school without clean water for their child?*",
    options: [
      ["Rhetorical question", "Correct: the question expects no answer; it makes the reader agree that the situation is unacceptable."],
      ["Rule of three", "There is no list of three items."],
      ["Simile", "There is no comparison using like or as."],
      ["Alliteration", "There is no pattern of repeated initial sounds."],
    ],
    answer: "A",
    explanation: "A **rhetorical question** is asked for effect, not for an answer: the obvious answer (*no*) pushes the reader towards the writer's view.",
  });
  b.mcq({
    d: 2, skill: "EVALUATION",
    stem: "Which is the best **thesis statement** for *\"Zimbabwe should ban single-use plastic bags.\" Do you agree?*",
    options: [
      ["I firmly support a ban, because plastic bags poison our rivers, harm livestock and waste money.", "Correct: it states a clear position and previews the main reasons."],
      ["Plastic bags are very common in shops and markets all over the country today.", "This is a general fact, not a position on the question."],
      ["There are good points and bad points about banning bags, so it all depends.", "This avoids taking a side, which an argument must do."],
      ["In this composition I shall be writing about bags and about plastic in general.", "Announcing the topic is not a thesis; it states no view."],
    ],
    answer: "A",
    explanation: "A **thesis** answers the question clearly and, ideally, previews the reasons that the body will develop.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "A learner argues that *school uniforms should be kept*. Which is the **strongest counter-argument** to address and rebut?",
    options: [
      ["Uniforms can be expensive for families who have several children at school.", "Correct: it is the most serious, reasonable objection, so answering it strengthens the argument."],
      ["Some learners think that the school colours are not very fashionable.", "This is a weak, minor objection; rebutting it adds little."],
      ["Uniforms were first introduced many years ago in other countries.", "This is a historical fact, not an argument against uniforms."],
      ["Learners sometimes forget to iron their uniforms on Monday mornings.", "This is trivial and not really an argument against having uniforms."],
    ],
    answer: "A",
    hints: ["Choose the objection a sensible opponent would make first.", "Answering a weak objection does not make your case stronger."],
    explanation: "Address the **strongest** opposing point. Rebutting cost (for example, by suggesting second-hand uniform exchanges and simple designs) shows you have considered the issue fairly.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Read this paragraph.\n\n*(1) Learners should do community service every term. (2) It teaches responsibility in a way no textbook can. (3) For example, pupils at a fictional school in Chinhoyi who cleaned the local clinic began to take more care of their own classrooms. (4) Football is also very popular at that school.*\n\nWhich sentence **weakens** the paragraph?",
    options: [
      ["Sentence 4", "Correct: football's popularity is irrelevant to the argument about community service."],
      ["Sentence 1", "This is the point (topic sentence) the paragraph argues."],
      ["Sentence 2", "This explains why the point matters."],
      ["Sentence 3", "This is the example that supports the point."],
    ],
    answer: "A",
    hints: ["Find the point, the explanation and the example.", "Which sentence does none of these jobs?"],
    explanation: "An argument paragraph follows **point, explanation, example**. Sentence 4 supports none of them and breaks the paragraph's focus.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which piece of evidence is **most appropriate** in an examination argument?",
    options: [
      ["In my own area, drivers have stopped at the new crossing since the school put up a sign.", "Correct: a realistic, honest example from experience."],
      ["Scientists have proved that exactly 97.4 per cent of accidents happen near schools.", "An invented, oddly precise statistic is unconvincing and dishonest."],
      ["Everybody in the whole world knows that roads are always dangerous for children.", "Sweeping generalisations (everybody, always) are easy to dismiss."],
      ["My friend said that her cousin heard that the road is quite dangerous sometimes.", "Third-hand hearsay is weak evidence."],
    ],
    answer: "A",
    hints: ["Which statement could you honestly know to be true?"],
    explanation: "In an exam, use **honest** evidence: examples from experience, clear reasoning, common knowledge and hypothetical cases. Invented statistics and sweeping generalisations weaken your credibility.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each sentence to the persuasive device it uses.",
    pairs: [
      ["It is cheaper, cleaner and fairer.", "rule of three"],
      ["You have seen the bags caught in the fences.", "direct address"],
      ["Not next year. Not next month. Now.", "repetition"],
      ["Our river is choking on rubbish.", "emotive language"],
    ],
    explanation: "**Rule of three**: a list of three for rhythm and force. **Direct address**: speaking to *you*. **Repetition**: repeating a structure for emphasis. **Emotive language**: words chosen to stir feeling (*choking*).",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Choose the phrase that best completes this counter-argument and rebuttal.",
    template: "{{blank:a}} that a longer school day would tire learners. {{blank:b}}, an extra hour of supervised study could replace the time many already spend on homework in crowded homes.",
    blanks: [
      { id: "a", accepted: ["Some people argue"], choices: ["Some people argue", "It is a fact", "I strongly believe", "Everybody knows"] },
      { id: "b", accepted: ["However"], choices: ["Therefore", "However", "Similarly", "For instance"] },
    ],
    hints: ["The first sentence presents the other side's view, not yours.", "The second sentence answers it."],
    explanation: "Introduce the opposing view fairly (*Some people argue…*), then turn with a contrast connective (*However*) into your rebuttal.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false? In an argumentative composition you should give the other side as much support as your own side.",
    answer: false,
    feedbackFalse: "Right: you acknowledge and rebut the other side, but your own position dominates.",
    explanation: "An argument is one-sided: you include the strongest counter-argument only to answer it. Equal weight to both sides is the approach of a **discursive** composition.",
  });
  b.ext({
    d: 2, skill: "CREATION", marks: 10, secs: 900,
    stem: "Write an **introduction** (70-100 words) for the argument *\"Learners should choose their own subjects from Form 3.\" Do you agree?* Include a hook, a brief explanation of the issue and a clear thesis.",
    wordLimit: { min: 70, max: 100 },
    points: [
      ["An engaging hook (question, striking statement or short scenario)", 3],
      ["The issue is briefly explained", 2],
      ["A clear thesis that takes a side", 3],
      ["Accurate language and an appropriate formal tone", 2],
    ],
    modelAnswer: "Imagine spending two years studying a subject you dread, only to drop it the moment you leave school. For many learners this is reality, because subject combinations are often decided by timetables or by parents rather than by the learners themselves. Choosing subjects in Form 3 shapes careers, confidence and even whether a learner stays in school. I firmly believe that, with guidance from teachers and parents, learners should make the final choice of their own subjects, because they understand their strengths best and work harder at what they have chosen.",
    explanation: "The model hooks with *Imagine…*, explains why the issue matters and ends with a clear thesis that previews two reasons.",
  });
  b.ext({
    d: 3, skill: "CREATION", marks: 12, secs: 1200,
    stem: "Write a **counter-argument and rebuttal** paragraph (100-140 words) for an argument that *\"Every school should have a vegetable garden.\"*",
    wordLimit: { min: 100, max: 140 },
    points: [
      ["A fair, serious counter-argument is stated clearly", 3],
      ["A concession acknowledges what is reasonable in it", 2],
      ["A convincing rebuttal with explanation or a practical solution", 4],
      ["Suitable linking phrases (for example It is true that… However…)", 3],
    ],
    hints: ["What would a sensible head teacher object to?", "Admit what is true in it, then answer it."],
    modelAnswer: "Critics argue that gardens demand water and labour that many schools simply do not have, particularly in dry areas such as Matabeleland South. It is true that a garden watered from the school tap during a drought would be wasteful, and that teachers cannot be expected to become farmers overnight. However, these problems have practical answers. Small beds can be watered with grey water from the kitchen and hand-washing points, and mulching with dry grass keeps the soil moist far longer. The work, meanwhile, can be shared on a rota between classes, so that no group carries the burden. Far from being a distraction, a well-planned garden becomes a living science laboratory.",
    explanation: "The paragraph states a serious objection, concedes what is fair in it and rebuts with practical solutions, linked by *It is true that… However…*.",
  });
  b.essay({
    d: 4, skill: "CREATION", marks: 25, secs: 2700,
    stem: "Write an argumentative composition (300-350 words): **\"Young people should be taught a trade as well as academic subjects.\" Do you agree?**",
    wordLimit: { min: 300, max: 350 },
    points: [
      ["A clear position stated in the introduction and kept throughout", 4],
      ["At least two developed reasons with explanation and realistic examples", 6],
      ["A counter-argument stated fairly and rebutted", 4],
      ["Persuasive devices used appropriately; a confident, respectful tone", 3],
      ["A firm conclusion", 2],
      ["Accurate, varied language", 6],
    ],
    hints: ["Decide your position before you plan.", "What would someone who disagrees say? Plan your answer to it."],
    modelAnswer: "**Plan (agree):** (1) Introduction: a school leaver with five O-levels and no job, beside a neighbour who earns a living fixing solar systems; thesis: every learner should leave school with a trade as well as academic subjects. (2) Reason 1: employment and self-employment; the informal economy rewards practical skill. (3) Reason 2: different talents; learners who struggle in academic subjects can excel and gain confidence. (4) Reason 3: academic and practical learning support each other; physics makes sense in a workshop. (5) Counter-argument: trades lower academic standards and cost money for equipment; rebuttal: a trade can replace one optional subject, and tools can be shared between schools. (6) Conclusion: an education that feeds the mind but not the hands is only half finished.\n\n**Opening paragraph:** Tapiwa left school with five good passes and a certificate he could frame but not eat. Two years later, he was still sending applications. His neighbour, who had left school with fewer passes but had spent his holidays learning to install solar panels, was employing two assistants. Stories like this are common enough to make one thing clear: young people should be taught a trade alongside their academic subjects.",
    explanation: "A strong answer takes a side at once, develops each reason with an example, answers the cost and standards objection, and ends with a memorable line.",
  });

  b.card("DEFINITION", "Thesis", "The writer's clear position on the question, stated in the introduction and kept throughout.");
  b.card("DEFINITION", "Counter-argument", "A point the other side would make against your position.");
  b.card("DEFINITION", "Rebuttal", "Your answer to a counter-argument, showing why it is weaker or how the problem can be solved.");
  b.card("CONCEPT", "PEE paragraph", "Point (topic sentence), Explanation, Example.");
  b.card("CONCEPT", "Argument vs discussion", "Argument: one side defended (Do you agree?). Discussion: both sides weighed, then a judgement (Discuss).");
  b.card("VOCABULARY", "Rebuttal phrases", "It is true that… However…; Critics claim… but this overlooks…; Although some argue…, …");
  b.card("CONCEPT", "Persuasive devices", "Rhetorical questions, rule of three, direct address, emotive language, repetition; use sparingly.");
  b.card("CONCEPT", "Honest evidence in an exam", "Examples from experience, reasoning, common knowledge and hypothetical cases; never invented statistics.");
  b.card("CONCEPT", "Where to put your strongest reason", "First (to impress) or last before the counter-argument (to build to a peak), never buried in the middle.");
});
