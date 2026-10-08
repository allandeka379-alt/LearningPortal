// Slice EWR1: Cambridge 0510 Exercise 6 formal writing (ESSAY, 15 marks, ESL): article, report, essay, review.
import { concept, compositionLevels, ESL } from "../lib.mjs";

const POINTS = [
  ["Content: completes the task for the stated reader, develops both prompt ideas (or equivalent) and adds relevant ideas of your own", 4],
  ["Content: register and format suit the purpose (formal tone; a title for an article or review; a clear purpose and recommendation for a report)", 2],
  ["Language: a good range of vocabulary and sentence structures used appropriately", 3],
  ["Language: accurate grammar, spelling and punctuation", 3],
  ["Language: well organised, with clear paragraphs and suitable linking words", 3],
];

concept("eng.composition.argumentative", { file: "composition/exam-0510", keyPrefix: "composition.exam-0510", applies: ESL }, (b) => {
  const ex6 = (type, task, modelAnswer, d = 3) =>
    b.essay({
      d, skill: "CREATION", marks: 15, secs: 1650, examStyle: true, concepts: [`eng.composition.${type}`],
      stem: `**Exercise 6.** ${task}\n\nThe comments above may give you some ideas, and you should also use some ideas of your own. Write about **140 words** (the word limit is shown with the answer box).`,
      wordLimit: { min: 120, max: 160 },
      points: POINTS,
      levels: compositionLevels(15),
      modelAnswer,
      hints: ["Use both comments, but add at least one idea of your own.", "Keep a formal register and organise your answer into three or four short paragraphs."],
      explanation: "This task is marked for content (6 marks: task fulfilment, ideas, register) and language (9 marks: range, accuracy, organisation). Check each point honestly, then compare with the model.",
    });

  // 1. Essay (full model): discursive.
  ex6("discursive", "Your class has been discussing whether secondary school learners should have part-time jobs. Your teacher has asked you to write an **essay** giving your views.\n\nHere are some comments from your classmates:\n\n- *\"A job teaches you how to manage money and be responsible.\"*\n- *\"Learners need all their spare time for studying and resting.\"*", `**Model answer:**

**Should learners have part-time jobs?**

Many secondary school learners would like to earn their own money, but there are good arguments on both sides.

On the one hand, a part-time job teaches valuable lessons. Learners who work in a shop or help in a family business learn to manage money, arrive on time and deal politely with customers. These skills will be useful in any future career.

On the other hand, school work must come first. Learners already have long days, and many have homework and household chores in the evening. If they also work, they may become tired and their marks may fall. In addition, some jobs could be unsafe for young people.

In my opinion, a small job at weekends or during the holidays is a good idea, provided that it does not interfere with studying. Parents and learners should agree on a limit of a few hours a week.`);

  // 2. Article (plan + opening): argumentative.
  ex6("argumentative", "Your town council is planning to build a car park on the only park in the town centre. You decide to write an **article** for your local newspaper giving your views.\n\nHere are some comments from people in your town:\n\n- *\"We need somewhere to park when we go shopping.\"*\n- *\"The park is the only green place where families can relax.\"*", `**Plan:**
- **Title:** *Save Our Park*
- **Paragraph 1:** introduce the plan; state your view clearly (against the car park).
- **Paragraph 2:** the park's value: shade, clean air, a safe place for children and older people; events held there.
- **Paragraph 3:** answer the parking comment: suggest using land at the edge of town with a shuttle bus, or better public transport.
- **Paragraph 4:** conclusion: urge readers to attend the council meeting and sign the petition.

**Exemplar opening:** *Save Our Park.* Every Saturday, the small park in the centre of our town is full of families sitting in the shade of its jacaranda trees, children chasing each other across the grass and older people chatting on the benches. Now the council wants to cover it with tarmac. I believe this would be a serious mistake.`);

  // 3. Report (full model): informative.
  ex6("informative", "Your class recently visited a heritage site or museum. The head teacher has asked you to write a **report** about the visit, saying what was useful and suggesting how future visits could be improved.\n\nHere are some comments from your classmates:\n\n- *\"The guide made the history come alive.\"*\n- *\"We didn't have enough time to see everything.\"*", `**Model answer:**

**Report on the Form 3 visit to the regional museum**

**Introduction**
The purpose of this report is to describe our class visit to the regional museum last Friday and to suggest improvements for future trips.

**What was useful**
The visit was very worthwhile. The guide explained the history of the stone buildings and the trade that took place there so clearly that the subject came alive for us. Many learners said they understood their history lessons much better afterwards. The displays of pottery and tools were also helpful.

**Problems**
However, we spent nearly two hours travelling and had only ninety minutes at the museum, so we did not see the gallery on traditional music.

**Recommendations**
I recommend that future visits leave school earlier and that the class is divided into two groups, so that everyone can see all the galleries. Learners could also prepare questions for the guide in advance.`);

  // 4. Review (plan + opening): informative.
  ex6("informative", "Your school recently put on a play. The editor of the school website has asked learners to write a **review** of it.\n\nHere are some comments from people who saw the play:\n\n- *\"The actors were confident, even the youngest ones.\"*\n- *\"Some of the scenes were too long.\"*", `**Plan:**
- **Title:** a short, lively title (for example *A Night to Remember in the School Hall*).
- **Paragraph 1:** what the play was about, in two or three sentences, without giving away the ending; when and where it was performed.
- **Paragraph 2:** strengths: confident acting, including the youngest members of the cast; the costumes and the music; one memorable moment.
- **Paragraph 3:** weaknesses: some long scenes slowed the action; the sound was hard to hear at the back of the hall.
- **Paragraph 4:** overall opinion and recommendation (for example, a rating out of five, and whether parents should attend next year's production).

**Exemplar opening:** *A Night to Remember in the School Hall.* Last Thursday, the drama club performed *The Lost Calabash*, a play written by our own Form 4 learners, to a packed school hall. It tells the story of a village that loses a sacred calabash and of the young girl who sets out to find it.`);

  // 5. Essay (plan + opening): argumentative.
  ex6("argumentative", "Your teacher has asked you to write an **essay** on the following statement: *\"Learning online is better than learning in a classroom.\"*\n\nHere are some comments from your classmates:\n\n- *\"You can study online at any time and at your own speed.\"*\n- *\"You learn more when the teacher is in the room and you can ask questions.\"*", `**Plan (disagree):**
- **Paragraph 1:** introduce the statement; give your view: online learning is useful, but classroom learning is better.
- **Paragraph 2:** acknowledge the advantages of online learning: flexibility, own speed, access to videos and notes.
- **Paragraph 3:** reasons for classroom learning: immediate help from the teacher; discussion with classmates; not everyone has a good device or reliable data; fewer distractions.
- **Paragraph 4:** conclusion: online learning works best as support for classroom lessons, not a replacement.

**Exemplar opening:** Since many schools moved some lessons online, learners have argued about whether online learning is better than learning in a classroom. Although studying online has some clear advantages, I believe that a classroom with a teacher present is still the best place to learn.`);
});
