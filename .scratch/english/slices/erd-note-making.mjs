// Slice ERD: reading skills — making notes from a text.
import { concept, P } from "../lib.mjs";

const GARDEN = `Read the extract and answer the question.

> The community garden in Dzivarasekwa was started two years ago for two main reasons: many families could not afford fresh vegetables, and the empty plot behind the church had become a dumping ground. In the first year the gardeners faced serious difficulties. Goats from nearby homes broke through the fence, and the municipal water was cut off for weeks at a time. Next season the group plans to dig a well and to sell surplus vegetables at the Saturday market.`;

const CYCLING = `Read the article and answer the questions.

**Two wheels to school**

**[1]** When Mrs Ruvimbo Mapfumo became head of Chishawasha Secondary School, she noticed that many pupils arrived exhausted. Some walked over eight kilometres each way, leaving home before sunrise. She decided to start a bicycle scheme.

**[2]** The scheme began with forty second-hand bicycles collected by a former pupil who now lives in Gaborone. Pupils who live more than five kilometres away may borrow a bicycle for the school year. In return, they must attend a safety lesson, keep their bicycle clean and report any damage at once.

**[3]** The results have been encouraging. Teachers say that latecoming has fallen sharply, and several pupils told the school magazine that they now have the energy to study in the evening. Girls in particular say they feel safer travelling quickly in a group than walking alone along quiet roads.

**[4]** There have been difficulties, however. Spare parts such as inner tubes and brake cables are hard to find and expensive, and on rainy days the dirt roads become so muddy that pupils have to push their bicycles. Two bicycles were stolen from a pupil's home during the holidays.

**[5]** The school now hopes to train a few pupils as bicycle mechanics, so that repairs can be done on site. It is also asking local businesses to sponsor a covered rack, because the bicycles currently stand in the sun all day.`;

concept("eng.reading.note-making", { file: "reading/note-making", keyPrefix: "reading.note-making" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "When you complete a set of notes with headings, what should you read **first**?",
    options: [
      ["the headings, so you know what to look for", "Correct: the headings tell you which details to select."],
      ["the last paragraph, to find the conclusion", "The conclusion may not contain the details the notes need."],
      ["only the title of the article", "The title alone does not tell you what the notes require."],
      ["the longest paragraph in the article", "Length does not show where the details are."],
    ],
    answer: "A",
    explanation: "Reading the headings first turns your reading into a focused search for the right details.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which is the **best** note for this sentence?\n\n*One of the main problems was that goats from neighbouring homesteads kept breaking through the fence and eating the young vegetables.*",
    options: [
      ["goats broke through fence, ate young vegetables", "Correct: brief, clear and complete."],
      ["one of the main problems was that goats came", "This keeps filler words and loses the key detail."],
      ["goats, fence", "Too short: the meaning is no longer clear."],
      ["neighbours were careless with their animals", "This adds a judgement that is not in the text."],
    ],
    answer: "A",
    explanation: "A good note keeps the **content words** (goats, broke through fence, ate young vegetables) and drops filler (*one of the main problems was that*).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: `${GARDEN}\n\nWhich detail belongs under the heading **Problems in the first year**?`,
    options: [
      ["water supply cut off for weeks", "Correct: this is one of the difficulties described."],
      ["families could not afford vegetables", "This is a reason the garden was started."],
      ["plot had become a dumping ground", "This is a reason the garden was started."],
      ["plan to dig a well next season", "This is a future plan, not a problem."],
    ],
    answer: "A",
    explanation: "Check each detail against the heading. Reasons, problems and plans look similar but answer different questions.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: `${GARDEN}\n\nMatch each note with the heading it belongs under.`,
    pairs: [
      ["families could not afford fresh vegetables", "Reasons for starting the garden"],
      ["goats broke through fence", "Problems in the first year"],
      ["sell surplus at Saturday market", "Plans for next season"],
    ],
    extraRight: ["Successes so far"],
    explanation: "Reason (why it started) → affordability; problem (difficulty) → goats; plan (future) → selling surplus. No successes are mentioned, so that heading is a distractor.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false: notes must always be written in full, grammatically complete sentences.",
    answer: false,
    explanation: "False. Notes use **note form**: content words only, without *the, a, is, there are*. The meaning must still be clear.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "True or false: if a heading is *Problems*, you do not need to begin each note with *A problem was…*.",
    answer: true,
    explanation: "True. The heading already says what kind of information follows. Repeating it wastes words.",
  });
  b.fib({
    d: 2, skill: "APPLICATION",
    stem: `${GARDEN}\n\nComplete the notes with **one word** from the extract in each gap.`,
    template: "Problems: goats broke through the {{blank:a}}; municipal {{blank:b}} cut off for weeks.",
    blanks: [
      { id: "a", accepted: ["fence"], wrong: "gate" },
      { id: "b", accepted: ["water"], wrong: "electricity" },
    ],
    explanation: "Both details come from the sentence about *serious difficulties*: the goats and the water cuts.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Two notes under the heading *Problems* read: *volunteers scarce at harvest* and *hard to find helpers in harvest months*. What is wrong?",
    options: [
      ["They repeat the same idea, so only one point is made", "Correct: each note should record a different idea."],
      ["They are both too long to be called notes", "Both are of a reasonable note length."],
      ["They should be under a heading called Plans", "They describe a difficulty, so Problems is right."],
      ["They should be written as complete sentences", "Notes do not need to be full sentences."],
    ],
    answer: "A",
    hints: ["Compare the meaning of the two notes."],
    explanation: "*Volunteers scarce* and *hard to find helpers* say the same thing. Repetition wastes a bullet point that should hold a new detail.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which note keeps an important **qualifier** from this sentence?\n\n*The clinic is open only on weekday mornings.*",
    options: [
      ["clinic open weekday mornings only", "Correct: only is kept, so the meaning stays accurate."],
      ["clinic open in the mornings", "This loses weekday and only: it suggests weekends too."],
      ["clinic always open", "This contradicts the sentence."],
      ["clinic open weekdays", "This loses mornings only: it suggests all day."],
    ],
    answer: "A",
    hints: ["Which small word changes the meaning if it is lost?"],
    explanation: "Keep qualifiers such as *only*, *some*, *most*, *usually*: dropping them changes the information.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 900,
    stem: `${CYCLING}\n\nYou are making notes on the article to share with your school's development committee. Complete the notes under each heading. Use brief notes.`,
    parts: [
      P.manual({
        label: "(a)",
        marks: 2,
        stem: "**Why the scheme was started** (two notes)",
        points: [
          "Pupils arrived exhausted / tired",
          "Some walked over eight kilometres each way / left home before sunrise",
        ],
        modelAnswer: "pupils arrived exhausted; some walked 8+ km each way",
      }),
      P.short({
        label: "(b)",
        stem: "**Who may borrow a bicycle**: pupils who live more than ___ from school.",
        accepted: ["five kilometres", "5 kilometres", "5 km", "five km", "5km", "5", "five"],
        model: "five kilometres",
        wrong: ["eight kilometres"],
        explanation: "*Pupils who live more than five kilometres away may borrow a bicycle.*",
      }),
      P.manual({
        label: "(c)",
        marks: 3,
        stem: "**Rules for borrowers** (three notes)",
        points: [
          "Attend a safety lesson",
          "Keep the bicycle clean",
          "Report any damage at once",
        ],
        modelAnswer: "attend safety lesson; keep bicycle clean; report damage immediately",
      }),
      P.manual({
        label: "(d)",
        marks: 3,
        stem: "**Benefits** (three notes)",
        points: [
          "Less latecoming",
          "Pupils have energy to study in the evening",
          "Girls feel safer travelling quickly in a group",
        ],
        modelAnswer: "latecoming down; energy to study at night; girls safer in groups",
      }),
      P.manual({
        label: "(e)",
        marks: 2,
        stem: "**Difficulties** (two notes; do not include the theft)",
        points: [
          "Spare parts (inner tubes, brake cables) scarce and expensive",
          "Muddy roads on rainy days, so pupils must push bicycles",
        ],
        modelAnswer: "spare parts scarce, costly; mud on rainy days, bikes pushed",
      }),
      P.manual({
        label: "(f)",
        marks: 2,
        stem: "**Plans** (two notes)",
        points: [
          "Train some pupils as bicycle mechanics (repairs on site)",
          "Ask local businesses to sponsor a covered rack",
        ],
        modelAnswer: "train pupils as mechanics; seek sponsor for covered rack",
      }),
    ],
    hints: ["Read each heading before you look for the details.", "Keep each note short: three to eight words."],
    explanation: "Each heading matches one paragraph: reasons (1), eligibility and rules (2), benefits (3), difficulties (4), plans (5). The theft is excluded by the instruction, and the Gaborone donor belongs to none of the headings.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: `${CYCLING}\n\nUnder the heading **Benefits**, which note would be **incorrect**?`,
    options: [
      ["bicycles collected by former pupil", "Correct to reject: this is how the scheme began, not a benefit."],
      ["latecoming has fallen sharply", "This is a benefit from paragraph 3."],
      ["more energy for evening study", "This is a benefit from paragraph 3."],
      ["girls feel safer in a group", "This is a benefit from paragraph 3."],
    ],
    answer: "A",
    hints: ["Which detail comes from a paragraph that does not describe results?"],
    explanation: "The donation of bicycles explains how the scheme **started** (paragraph 2). Benefits are in paragraph 3.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION",
    stem: "Turn this sentence into a brief note (no more than eight words):\n\n*The committee hopes that next year it will be able to install solar lighting so that pupils can study in the evenings.*",
    marks: 2,
    points: [
      "Keeps the plan: install solar lighting (next year)",
      "Keeps the purpose: evening study / pupils study at night; eight words or fewer",
    ],
    modelAnswer: "install solar lighting for evening study",
    hints: ["What is the plan, and what is it for?"],
    explanation: "A note keeps the essential content (the plan and its purpose) and drops everything else: *install solar lighting for evening study*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main reason for making your own notes before writing a summary?",
    options: [
      ["To select the relevant points before joining them", "Correct: notes separate choosing points from writing them."],
      ["To copy the passage faster in the examination", "Notes are for selecting, not copying."],
      ["To make the summary longer than the limit", "Summaries must stay within the word limit."],
      ["To add your own opinions about the topic", "Summaries and notes do not include your opinions."],
    ],
    answer: "A",
    explanation: "Making notes first means you decide **what** to include before you worry about **how** to write it.",
  });
  b.manualShort({
    d: 4, skill: "CREATION", examStyle: true,
    stem: `${GARDEN}\n\nMake your own notes on the extract under **three** headings that you choose. Give at least two notes under each heading.`,
    marks: 4,
    points: [
      "Three suitable headings (e.g. Reasons / Problems / Plans)",
      "Two correct notes under the first heading (affordability of vegetables; plot was a dumping ground)",
      "Two correct notes under the second heading (goats broke through fence; water cut off for weeks)",
      "Two correct notes under the third heading (dig a well; sell surplus at Saturday market), all in brief note form",
    ],
    modelAnswer: "Reasons: families couldn't afford fresh veg; plot was a dumping ground. Problems: goats broke fence; municipal water cut for weeks. Plans: dig a well; sell surplus at Saturday market.",
    hints: ["The extract has three parts: why it started, what went wrong, and what comes next."],
    explanation: "The extract divides naturally into reasons, problems and plans. Each note is short, accurate and placed under the correct heading.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: `${GARDEN}\n\nHow many years ago was the garden started? Give a number or a word.`,
    accepted: ["two", "2", "two years", "2 years", "two years ago", "2 years ago"],
    model: "two",
    wrong: ["one"],
    explanation: "*The community garden … was started two years ago.*",
  });

  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which of these is written in **note form**?",
    options: [
      ["bridge closed for repairs till June", "Correct: content words only, meaning clear."],
      ["The bridge has been closed for repairs until June.", "This is a full sentence, not a note."],
      ["There is a bridge and it is closed now.", "This is a full sentence and loses the detail."],
      ["It was the bridge that they closed then.", "This is a full sentence and the meaning is unclear."],
    ],
    answer: "A",
    explanation: "Note form keeps the key content (bridge, closed, repairs, June) and drops words such as *the*, *has been* and *there is*.",
  });

  b.card("DEFINITION", "Note", "A brief record of one piece of information in as few words as possible.", undefined);
  b.card("DEFINITION", "Note form", "Keep content words (nouns, verbs, numbers); drop the, a, is, there are.", "goats broke through fence, ate vegetables");
  b.card("CONCEPT", "Read the headings first", "Headings tell you exactly which details to look for.", undefined);
  b.card("CONCEPT", "One idea per note", "Each bullet point should record a new, separate detail.", "Do not repeat the same point in other words.");
  b.card("CONCEPT", "Keep qualifiers", "Words such as only, some, most and usually must stay in the note.", "'open weekday mornings only'");
  b.card("CONCEPT", "Do not repeat the heading", "Under 'Problems', write 'goats ate vegetables', not 'a problem was goats'.", undefined);
  b.card("CONCEPT", "Check the heading for every note", "Reasons, problems, results and plans look similar but belong under different headings.", undefined);
  b.card("FACT", "How long is a good note?", "Usually three to eight words, with the meaning still clear.", undefined);
  b.card("CONCEPT", "Notes and summaries", "Make notes first to select points; then join them into continuous prose.", undefined);
});
