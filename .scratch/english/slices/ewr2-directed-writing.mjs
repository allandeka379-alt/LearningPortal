// Slice EWR2: directed writing from texts.
import { concept } from "../lib.mjs";

const SOLAR = `Read the extract from a school newsletter, then answer the question.

> **Should we switch to solar?**
>
> The school's electricity bill has risen every term this year, and power cuts often interrupt evening study in the hostels. The School Development Committee is considering installing solar panels on the roof of the main block.
>
> Supporters say the panels would pay for themselves "within a few years" and would keep lights on during power cuts. The Science department adds that learners could study how the system works.
>
> Others are less sure. The bursar points out that the panels and batteries are expensive to buy, and that batteries must be replaced after several years. One parent worries that the panels could be stolen, as has happened at a nearby clinic.`;

concept("eng.functional.directed-writing", { file: "functional/directed-writing", keyPrefix: "functional.directed-writing" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In directed writing, what does **evaluating** the ideas in a text mean?",
    options: [
      ["Judging how convincing, reliable or practical they are, and why", "Correct: evaluation is judgement with reasons."],
      ["Copying the best sentences from the text into your answer", "Copying is lifting; it earns little credit."],
      ["Counting how many paragraphs the original text contains", "Counting paragraphs is not evaluation."],
      ["Retelling the whole text in the same order but in shorter sentences", "That is summarising, not evaluating."],
    ],
    answer: "A",
    explanation: "**Evaluation** means judging ideas: *convincing*, *exaggerated*, *no evidence given*, *practical*, *ignores…*, always with a reason.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which sentence **evaluates** an idea rather than simply repeating it?",
    options: [
      ["The article says the fee is affordable, but without a figure this claim cannot be checked.", "Correct: it questions the reliability of a claim and gives a reason."],
      ["The article says that the fee for the stalls is fair and affordable for the vendors in the area.", "This repeats the claim without judging it."],
      ["The article is about a new market in Chikanga that the council is planning.", "This describes the topic without evaluating anything."],
      ["The article was written in the council newsletter for the residents to read.", "A fact about the source, not an evaluation."],
    ],
    answer: "A",
    explanation: "Evaluation adds your judgement and a reason: *but…*, *however…*, *this ignores…*, *no evidence is given…*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How should you **plan** a directed writing answer based on two texts?",
    options: [
      ["Group related ideas from both texts by topic, then decide your view", "Correct: planning by idea allows synthesis and a clear argument."],
      ["Write about the first text fully, then about the second text", "Treating texts separately leads to repetition and weak argument."],
      ["Copy the headings of both texts and fill in the details under each one", "This follows the texts, not the task."],
      ["Ignore the texts and write only your own opinion on the topic", "Directed writing must use ideas from the texts."],
    ],
    answer: "A",
    explanation: "Plan by **idea**, not by text: combine (synthesise) related points from both texts and decide your overall position.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: `${SOLAR}\n\nWhich idea from the extract is a **reason against** installing the panels?`,
    options: [
      ["Batteries must be replaced after several years.", "Correct: an ongoing cost the bursar raises."],
      ["Lights would stay on during power cuts.", "This is a benefit, a reason for the panels."],
      ["Learners could study how the system works.", "This is an educational benefit."],
      ["The panels would pay for themselves in a few years.", "This is a supporters' argument in favour."],
    ],
    answer: "A",
    explanation: "Annotating for and against before planning helps you cover both sides. The bursar's points (cost of buying; replacing batteries) and the theft risk are against.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: `${SOLAR}\n\nWhich comment is the **best evaluation** of the supporters' claim that the panels would pay for themselves "within a few years"?`,
    options: [
      ["The claim is vague: no costs or savings are given, so it needs checking.", "Correct: it identifies the lack of evidence behind a hopeful claim."],
      ["The claim is true because supporters would not say it otherwise.", "Believing a claim because of who said it is not evaluation."],
      ["The claim proves that the bursar is wrong about the cost.", "The claim gives no figures, so it proves nothing."],
      ["The claim is placed in inverted commas, so it must be a proven scientific fact.", "Quotation marks show someone's words, not proof."],
    ],
    answer: "A",
    hints: ["Does the extract give any numbers?", "Is a few years precise?"],
    explanation: "Strong evaluation questions vague or unsupported claims: *within a few years* gives no figures for cost or savings, so it cannot be judged without more information.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: `${SOLAR}\n\nYou are writing a **speech** to the School Development Committee supporting the panels. Which sentence best **develops** an idea from the extract?`,
    options: [
      ["Reliable lighting would let boarders study every evening, especially before exams.", "Correct: it takes the power-cut idea further by showing its effect on learners."],
      ["Power cuts often interrupt evening study in the hostels at our school.", "This repeats the extract without development."],
      ["Solar panels are made of silicon and come in many different sizes.", "New information, but not relevant to persuading the committee."],
      ["The bursar points out that solar panels and batteries are expensive to buy and install.", "This repeats an opposing point without answering it."],
    ],
    answer: "A",
    hints: ["Development goes beyond what the text says.", "Think about consequences for the audience."],
    explanation: "**Developing** an idea means explaining its consequences or applying it to the audience: power cuts → lost study → reliable lighting helps boarders before exams.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "True or false? In directed writing, copying long phrases from the text is the best way to show you have understood it.",
    answer: false,
    explanation: "False. Lifting earns little. Use your own words; quote only a short phrase when you want to comment on it.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false? You may add some ideas of your own, as long as they grow naturally from the ideas in the texts.",
    answer: true,
    explanation: "True. Relevant ideas of your own, linked to the texts, show development. The main content must still come from the texts.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each evaluation question with a suitable comment.",
    pairs: [
      ["Is it supported by evidence?", "No figures are given to support this claim."],
      ["Is it fact or opinion?", "This is one parent's worry, not a proven risk."],
      ["Is it practical?", "A burglar bar and a guard would cost little."],
      ["Is anything missing?", "The extract never mentions who would maintain the panels."],
    ],
    explanation: "Evaluating means asking questions of the text: evidence, fact or opinion, practicality and omissions.",
  });
  b.fib({
    d: 2,
    stem: "Choose the best linking word to show evaluation.",
    template: "{{blank:a}} the supporters say the panels will save money, they give no figures, so the claim is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Although"], choices: ["Although", "Because", "Therefore", "Since"] },
      { id: "b", accepted: ["unconvincing"], choices: ["unconvincing", "unconvinced", "convincing", "convinced"] },
    ],
    explanation: "*Although* introduces a contrast between the claim and its weakness. A claim is *unconvincing* (it fails to convince); a person is *unconvinced*.",
  });

  b.ext({
    d: 3, skill: "CREATION", marks: 16, secs: 1900,
    stem: `${SOLAR}\n\nYou are the Head Girl or Head Boy. Write a **speech** to the School Development Committee (about 240 words) in which you:\n\n- explain the benefits of installing solar panels\n- evaluate the concerns raised\n- recommend what the committee should do.\n\nUse ideas from the extract and your own ideas.`,
    wordLimit: { min: 220, max: 260 },
    points: [
      ["Reading: benefits selected from the extract and developed (study, savings, learning)", 4],
      ["Reading: concerns evaluated with reasons (cost, battery replacement, theft) rather than repeated", 4],
      ["A clear, practical recommendation that follows from the evaluation", 2],
      ["Speech form and formal, persuasive register for a committee", 3],
      ["Accurate, well-organised language in own words", 3],
    ],
    levels: [
      [4, 13, 16, "Ideas well selected, developed and evaluated; persuasive speech form; accurate."],
      [3, 9, 12, "Most ideas used with some evaluation; speech form clear; generally accurate."],
      [2, 5, 8, "Ideas mostly repeated; little evaluation; frequent errors."],
      [1, 0, 4, "Little use of the extract."],
    ],
    hints: ["Answer each concern rather than just listing it.", "A phased plan or a quotation from suppliers could be your recommendation."],
    modelAnswer: "**Model answer:**\n\nMadam Chairperson, members of the School Development Committee: good afternoon, and thank you for allowing me to speak on behalf of the learners.\n\nEvery boarder in this school knows the moment: you are halfway through a page of revision and the lights go out. Power cuts are not a small inconvenience for us; they cost hours of study in the weeks before examinations. Solar panels would keep at least the hostels and the library lit, and with the electricity bill rising every term, the savings could eventually be spent on books and equipment instead. The Science department's idea is a bonus: learners would see renewable energy at work on their own roof.\n\nThe concerns raised are serious, and I do not want to dismiss them. The bursar is right that panels and batteries are expensive and that batteries must be replaced. However, the claim that the system will \"pay for itself within a few years\" has not yet been tested with real figures, and neither has the bursar's worry. The theft at the clinic is a warning, but it is also a lesson: panels can be fixed with security bolts, and the roof of the main block is far harder to reach than a clinic shelter.\n\nI therefore recommend that the committee obtain written quotations from at least two suppliers, including the cost of replacement batteries and security fittings, and compare them with our current bills. If the figures make sense, we could begin with the hostels alone.\n\nThank you for listening.",
    explanation: "The model selects and develops the benefits, evaluates each concern instead of repeating it, questions the vague claim on both sides and recommends a practical next step, in a speech to a committee.",
  });
  b.ext({
    d: 3, skill: "CREATION", marks: 12, secs: 1400,
    stem: "Read the two short comments below.\n\n> **Comment A (a parent):** \"Homework every night is too much. Children are tired, and many have chores at home. Two nights a week would be enough.\"\n>\n> **Comment B (a teacher):** \"Regular homework builds habits. Without it, learners forget what they learnt in class and fall behind before exams.\"\n\nWrite an **article** for your school magazine (about 170 words) giving your view on how much homework learners should have. Use and evaluate ideas from both comments.",
    wordLimit: { min: 150, max: 180 },
    points: [
      ["Ideas from both comments used in own words and combined", 3],
      ["Each view evaluated with a reason (what is convincing, what is missing)", 3],
      ["A clear, balanced personal view with a practical suggestion", 2],
      ["Article features (headline, engaging opening) and accurate language", 4],
    ],
    hints: ["Both writers want learners to do well: where do they agree?", "Is quality more important than quantity?"],
    modelAnswer: "**Plan:** headline: *Homework: How Much Is Too Much?*; opening: a picture of a learner finishing homework by candlelight after chores; Comment A: convincing about tiredness and chores, but two nights may not keep skills fresh; Comment B: convincing about habits and memory, but more homework is not necessarily better if learners are exhausted; synthesis: both want learners to succeed; own view: short, focused homework most nights (about 30-45 minutes in total) and a timetable so subjects do not all set work on the same night; conclusion: ask the SRC to discuss a homework timetable with teachers.\n\n**Opening:** It is nine o'clock. The dishes are washed, the water has been fetched, and fifteen-year-old Ruvimbo is finally opening her exercise book. Should she be?",
    explanation: "A directed article uses both viewpoints, judges what is convincing and what is missing in each, and reaches a reasoned, practical view.",
  });
  b.ext({
    d: 4, skill: "CREATION", marks: 16, secs: 1900,
    stem: "Read the extract.\n\n> **Phones in the classroom?**\n>\n> A growing number of schools now allow learners to bring smartphones. Supporters argue that phones give instant access to dictionaries, past papers and educational videos, especially in schools whose libraries are small. Some teachers use them for quick quizzes.\n>\n> Critics reply that phones distract learners, encourage cheating and widen the gap between those who own expensive phones and those who have none. A head teacher in Gweru says, \"The first week was chaos. Now we have rules, and it works.\"\n\nWrite a **letter to your Head** (about 240 words) giving your views on whether your school should allow phones in class. Use and evaluate ideas from the extract and add ideas of your own.",
    wordLimit: { min: 220, max: 260 },
    points: [
      ["Reading: arguments on both sides selected and expressed in own words", 4],
      ["Reading: evaluation (e.g. the fairness concern, the value of rules suggested by the Gweru example)", 4],
      ["A clear position with practical proposals of your own", 2],
      ["Formal letter layout and register suitable for the Head", 3],
      ["Accurate, well-organised language", 3],
    ],
    levels: [
      [4, 13, 16, "Thorough, evaluative use of the extract; clear proposals; correct form; accurate."],
      [3, 9, 12, "Most ideas used with some evaluation; form mostly correct; generally accurate."],
      [2, 5, 8, "Mostly repetition; weak form or frequent errors."],
      [1, 0, 4, "Little use of the extract."],
    ],
    hints: ["The Gweru quotation suggests that rules matter: develop that idea.", "Think of a fair solution for learners without phones."],
    modelAnswer: "**Plan:**\n- Formal letter to the Head; subject line **RE: PHONES IN CLASS**.\n- Position: allow phones for learning only, under clear rules, after a trial.\n- Benefits (developed): dictionaries and past papers matter in a school with a small library; quick quizzes give teachers instant feedback.\n- Concerns (evaluated): distraction is real but can be controlled by rules (phones face down until the teacher allows them); cheating can be prevented by banning phones during tests; the fairness point is the strongest objection, since not everyone owns a phone.\n- Evaluation of the Gweru example: one head's experience, not proof, but it suggests that rules, not phones, decide success.\n- Own proposals: a one-term trial in Forms 3 and 4; shared tablets or phones from the computer lab for learners without devices; phones in lockers during tests.\n- Close: offer the SRC's help to draft rules; Yours faithfully.\n\n**Opening paragraph:** I am writing on behalf of the Form 4 learners to ask the school to consider allowing smartphones in class for learning purposes, under strict rules and for a trial period. I believe the benefits can be gained, and most of the risks avoided, if the rules are clear from the first day.",
    explanation: "Strong directed writing takes a position, uses ideas from both sides in its own words, evaluates them (the fairness concern is strongest; one head's experience is not proof) and adds practical proposals.",
  });

  b.card("DEFINITION", "Directed writing", "Writing a new text for a given audience and purpose using ideas selected from one or two reading texts.");
  b.card("DEFINITION", "Evaluation", "Judging ideas: how convincing, reliable, practical or complete they are, with reasons.");
  b.card("DEFINITION", "Development", "Taking an idea further: consequences, links or application to the audience.");
  b.card("DEFINITION", "Synthesis", "Combining related ideas from different texts or parts of a text into one point.");
  b.card("CONCEPT", "Four steps for directed writing", "Read the task → annotate the texts (for/against) → plan by idea → write in role, in your own words, evaluating.");
  b.card("VOCABULARY", "Evaluation phrases", "The most convincing argument is…; While it is true that…, this ignores…; no evidence is given; Both writers agree that…");
  b.card("CONCEPT", "Lifting", "Copying long phrases from the text; it earns little credit. Use your own words.");
  b.card("CONCEPT", "Questions to ask of a text", "Is it supported? Fact or opinion? Practical? Is anything missing? Do the texts agree?");
});
