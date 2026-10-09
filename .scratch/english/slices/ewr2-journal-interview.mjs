// Slice EWR2: journal entries and interviews.
import { concept } from "../lib.mjs";

concept("eng.functional.journal-interview", { file: "functional/journal-interview", keyPrefix: "functional.journal-interview" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which point of view is normally used in a **journal entry**?",
    options: [
      ["First person (I, we)", "Correct: a journal is a personal record in the writer's own voice."],
      ["Second person (you)", "Journals are not addressed to a reader as you throughout."],
      ["Third person (he, she, they)", "Third person is for stories about others, not personal journals."],
      ["Impersonal passive (it was found)", "The passive suits reports, not personal reflection."],
    ],
    answer: "A",
    explanation: "Journals are written in the **first person**, recording the writer's own experiences, thoughts and feelings.",
  });
  b.mcq({
    d: 2, skill: "EVALUATION", daily: true,
    stem: "Which sentence shows the most **reflection** in a journal entry?",
    options: [
      ["Looking back, I realise I was angry because I felt nobody had listened to me.", "Correct: the writer thinks about the reason behind a feeling."],
      ["I woke up at six, had tea and bread, and then got dressed for school.", "A plain event with no reflection."],
      ["Then I walked to school, and then I sat in my class until the bell rang at one.", "A list of actions joined by then."],
      ["The meeting was held in the school hall on Tuesday afternoon at three.", "A fact, impersonally stated."],
    ],
    answer: "A",
    explanation: "Journals go beyond events: they explore **feelings, reasons and lessons** (*Looking back, I realise…*).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "How should the speakers' words be set out in a written **interview**?",
    options: [
      ["Name or initials, a colon, then the words, with a new line for each speaker", "Correct: interviews are set out like a script."],
      ["Inside inverted commas with said she after each answer", "That is how dialogue appears in a story, not in an interview."],
      ["As one long paragraph, with no speakers' names, so the conversation flows", "Readers could not tell who is speaking."],
      ["In reported speech throughout, beginning each answer with She told me that…", "That would be an article or report about the interview, not an interview."],
    ],
    answer: "A",
    explanation: "Interview layout: **Name:** words. A new line for each turn, no inverted commas.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an **open question** suitable for an interview?",
    options: [
      ["What was the most difficult moment of your first year as a nurse?", "Correct: it invites a detailed, personal answer."],
      ["Are you still working as a nurse at Parirenyatwa Hospital in Harare?", "A closed question: the answer is yes or no."],
      ["Did you enjoy the three years of your nursing training?", "Closed: likely to produce yes or no."],
      ["Is nursing a harder job than most people think it is?", "Closed: a yes or no answer is possible."],
    ],
    answer: "A",
    explanation: "**Open questions** (*What…? How…? Why…? Tell me about…*) lead to developed answers; closed questions often get one word.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "*\"My school books are ruined. Will Mr Sibanda believe me?\"*\n\nWhy is the **question** effective in this journal entry?",
    options: [
      ["It shows the writer's private worry, as if thinking aloud.", "Correct: questions to oneself reveal anxiety and make the voice natural."],
      ["It asks the reader to reply with advice in a letter.", "A journal is private; the question is not addressed to a reader."],
      ["It introduces a formal recommendation for the school's managers.", "There is no recommendation; this is personal feeling."],
      ["It is an interview question put to the teacher.", "The writer is not interviewing anyone."],
    ],
    answer: "A",
    hints: ["Who is the writer really asking?", "What feeling does it reveal?"],
    explanation: "Questions to oneself are a natural journal feature: they reveal worries, doubts and hopes in the writer's private voice.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "You must write a journal entry **in role** as a game ranger described in a passage. What is the best approach?",
    options: [
      ["Use the passage's details and develop the ranger's thoughts and feelings about them.", "Correct: stay in role, use the text and develop it."],
      ["Write about your own weekend instead, since journals are always personal.", "This ignores the role and the passage."],
      ["Copy all the passage's sentences in the same order and simply change he to I throughout.", "Copying earns little; you must develop and reflect in your own words."],
      ["Invent a completely new story unconnected to the passage.", "Role tasks require you to use the details in the text."],
    ],
    answer: "A",
    hints: ["Who are you writing as?", "Where should your content come from?"],
    explanation: "Writing **in role** means using the passage's details from the character's point of view and developing their feelings and reasons in your own words.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "True or false? A journal entry usually begins with a date.",
    answer: true,
    explanation: "True. The date (sometimes with the day, time or place) is the standard opening of a journal entry.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false? In a good interview, the questions are usually longer and more detailed than the answers.",
    answer: false,
    explanation: "False. The interviewee's answers carry the content, so they should be developed; questions are short and open.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each feature with the text type it belongs to.",
    pairs: [
      ["The date, then Dear Diary and a private feeling", "Journal opening"],
      ["Speaker's name, a colon and the words spoken", "Interview layout"],
      ["A short italic introduction naming the person questioned", "Interview introduction"],
      ["Tomorrow I will try again, whatever happens.", "Journal ending"],
    ],
    explanation: "Journals: date or *Dear Diary*, private reflection, a forward-looking end. Interviews: an introduction, names with colons, open questions.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct forms for a journal entry.",
    template: "Today {{blank:a}} the hardest day of my life. I {{blank:b}} never forget the look on my father's face.",
    blanks: [
      { id: "a", accepted: ["was"], choices: ["was", "is being", "has been being", "were"] },
      { id: "b", accepted: ["will"], choices: ["will", "did", "was", "had"] },
    ],
    explanation: "Events of the day are in the past tense: *Today **was**…*. A promise about the future uses *will*: *I **will** never forget…*.",
  });

  b.ext({
    d: 3, skill: "CREATION", marks: 12, secs: 1300,
    stem: "You have just taken part in your first inter-schools debate and your team lost narrowly. Write your **journal entry** for that evening (about 170 words). Describe what happened, how you felt at different moments and what you have learnt.",
    wordLimit: { min: 150, max: 180 },
    points: [
      ["Date and first-person journal voice", 2],
      ["Key events of the debate described briefly", 2],
      ["Feelings at different moments explored honestly", 3],
      ["Reflection on what was learnt and a forward-looking ending", 3],
      ["Accurate, varied language", 2],
    ],
    hints: ["How did you feel before, during and after?", "End with a plan for next time."],
    modelAnswer: "**Friday 14 August**\n\nWe lost by two points. Two! I keep replaying the moment the adjudicator read out the scores, and my stomach still drops every time.\n\nThe morning started badly. My hands were shaking so much in the bus to Masvingo that I could hardly read my notes. But when I stood up to give the first speech, something strange happened: the nerves turned into energy, and I spoke more clearly than I ever have in class.\n\nOur weakest moment was the rebuttal. The other team asked about cost, and none of us had prepared figures. I could feel us losing the room.\n\nAt first I blamed myself. Now, sitting on my bed, I think we all made the same mistake: we prepared our own case and forgot to imagine theirs.\n\nNext term, I am going to practise rebuttals every week. And next time, those two points will be ours.",
    explanation: "The model is dated, first-person and moves through feelings at different moments to honest reflection and a forward-looking ending.",
  });
  b.ext({
    d: 3, skill: "CREATION", marks: 12, secs: 1300,
    stem: "For your school magazine, write an **interview** (about 170 words) with a retired teacher who taught at your school for many years. Include a short introduction, at least five open questions and developed answers in her voice.",
    wordLimit: { min: 150, max: 180 },
    points: [
      ["A short introduction and correct interview layout (names, colons, no inverted commas)", 3],
      ["At least five open questions in a logical order", 3],
      ["Developed answers in a convincing, consistent voice", 4],
      ["Closing thanks and accurate language", 2],
    ],
    hints: ["Order: background → memories → changes → advice.", "Give the teacher specific memories."],
    modelAnswer: "**Plan:** introduction: *Our reporter spoke to Mrs Rhoda Chinembiri, who taught History at the school from 1990 until her retirement last year.*\nQuestions: (1) What made you become a teacher? (2) What was the school like when you arrived? (3) Which moment are you proudest of? (4) How have learners changed over the years? (5) What advice would you give today's Form 4s? Closing thanks.\nAnswers: specific memories (classes under a tree before the new block was built; former pupils who became doctors and teachers); a balanced view of change (phones versus curiosity); warm, wise advice.\n\n**Opening exchange:**\n\n**Reporter:** What made you decide to become a teacher?\n\n**Mrs Chinembiri:** My own teacher in Form 2. She lent me her books because we could not afford them, and I promised myself I would do the same for someone else one day.",
    explanation: "A good interview has an introduction, open questions in a logical order, script layout and answers that sound like a real person with specific memories.",
  });
  b.ext({
    d: 4, skill: "CREATION", marks: 16, secs: 1800,
    stem: "Read the situation, then write a **journal entry in role** (about 230 words).\n\n*Farai, 16, has looked after his younger brother and sister since their mother went to work in Harare. One evening the youngest falls ill with a high fever. There is no money for a taxi, so Farai carries her two kilometres to the clinic in the dark. The nurse says he arrived just in time.*\n\nWrite Farai's journal entry for that night.",
    wordLimit: { min: 200, max: 250 },
    points: [
      ["Journal conventions: date, first person, reflective voice", 2],
      ["All details from the situation used accurately", 3],
      ["Events developed with convincing detail", 3],
      ["Farai's feelings and thoughts explored (fear, responsibility, relief, thoughts of his mother)", 4],
      ["Accurate, varied language suited to the role", 4],
    ],
    levels: [
      [4, 13, 16, "Convincing voice; every detail used and developed; deep reflection; accurate."],
      [3, 9, 12, "Voice mostly convincing; details used; some reflection; generally accurate."],
      [2, 5, 8, "Mainly events; little reflection; frequent errors."],
      [1, 0, 4, "Little sense of role or journal form."],
    ],
    hints: ["Use every detail: age, responsibility, fever, no taxi, two kilometres, dark, the nurse's words.", "What does Farai think about his mother tonight?"],
    modelAnswer: "**Plan:**\n- Date and time (late at night, back home or on a bench at the clinic).\n- Opening: the nurse's words *just in time* still in his head.\n- Events: noticing the fever after supper; checking money (none for a taxi); wrapping his sister in a blanket; the walk in the dark (the cold, the dogs barking, his arms aching).\n- Feelings: fear on the road, the weight of responsibility at sixteen, anger that nobody could help, relief at the clinic.\n- Thoughts of his mother: whether to phone her; not wanting to worry her.\n- Ending: a decision (save a little each week for emergencies; ask a neighbour to be on call); a feeling of quiet pride.\n\n**Example opening paragraph:** *Tuesday night, very late.* \"Just in time.\" That is what the nurse said, and I cannot get those three words out of my head. If I had waited another hour, if I had decided it was only a cold, if I had stopped to rest on the road… I don't want to finish that sentence, even here.",
    explanation: "A journal in role uses every detail from the situation and develops the character's feelings and thoughts, especially those the situation only implies.",
  });

  b.card("DEFINITION", "Journal (diary) entry", "A dated, first-person record of events, thoughts and feelings.");
  b.card("DEFINITION", "Writing in role", "Writing as a particular person, using their knowledge, feelings and voice.");
  b.card("CONCEPT", "Key feature of a good journal", "Reflection: feelings, reasons and lessons, not just a list of events.");
  b.card("CONCEPT", "Interview layout", "Short introduction → Name: words (new line per turn, no inverted commas) → closing thanks.");
  b.card("DEFINITION", "Open question", "A question inviting a full answer (What…? How…? Why…?), not just yes or no.");
  b.card("CONCEPT", "Order of interview questions", "Background → experience → views → future plans or advice.");
  b.card("FACT", "Tense in journal entries", "Mostly past for the day's events; present for current feelings; will for plans.");
  b.card("CONCEPT", "Using a passage in role", "Use its details from the character's viewpoint and develop feelings and reasons in your own words.");
});
