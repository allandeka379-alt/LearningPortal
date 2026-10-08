// Slice EG1: verb tenses and the sequence of tenses.
import { concept } from "../lib.mjs";

concept("eng.grammar.tenses", { file: "grammar/tenses", keyPrefix: "grammar.tenses" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Choose the correct verb.\n\n*Water ___ at 100 degrees Celsius at sea level.*",
    options: [
      ["boils", "Correct: a general truth takes the present simple, with -s for a singular subject."],
      ["is boiling", "The present continuous describes something happening now, not a fact that is always true."],
      ["boiled", "The past simple would suggest this was true only once in the past."],
      ["has boiled", "The present perfect describes a completed action linked to now, not a permanent fact."],
    ],
    answer: "A",
    explanation: "General truths and scientific facts use the **present simple**: *Water boils at 100 °C. The sun rises in the east.*",
  });
  b.mcq({
    d: 1, skill: "UNDERSTANDING",
    stem: "Choose the correct verb.\n\n*Listen! The choir ___ the national anthem in the hall.*",
    options: [
      ["is singing", "Correct: Listen! shows the action is happening at this moment."],
      ["sings", "The present simple is for habits, not for an action happening right now."],
      ["sang", "The past simple describes a finished action; Listen! shows it is happening now."],
      ["has sung", "The present perfect would mean the singing is already over."],
    ],
    answer: "A",
    explanation: "Use the **present continuous** (am/is/are + -ing) for an action in progress at the moment of speaking. Words such as *Listen!*, *Look!*, *now* and *at the moment* are clues.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Choose the correct verb.\n\n*Mrs Dube ___ at this school since 2015.*",
    options: [
      ["has taught", "Correct: since 2015 shows an action that began in the past and continues now."],
      ["teaches", "The present simple cannot show how long something has continued; since needs a perfect tense."],
      ["taught", "The past simple would mean she no longer teaches here, which clashes with since."],
      ["is teaching", "The present continuous does not go with since plus a starting point."],
    ],
    answer: "A",
    explanation: "*Since* + a point in time (and *for* + a period) go with the **present perfect** or present perfect continuous when the situation continues now: *has taught*, *has been teaching*.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which sentence is correct?",
    options: [
      ["I saw the new headmaster yesterday.", "Correct: yesterday is a finished time, so the past simple is used."],
      ["I have seen the new headmaster yesterday.", "The present perfect cannot be used with a finished time such as yesterday."],
      ["I have saw the new headmaster yesterday.", "Saw is the past simple; after have you need the participle, and yesterday needs the past simple anyway."],
      ["I had see the new headmaster yesterday.", "After had you need the past participle seen, and nothing here needs the past perfect."],
    ],
    answer: "A",
    explanation: "Finished time phrases (*yesterday, last week, in 2020, two days ago*) take the **past simple**, never the present perfect.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Choose the correct verb.\n\n*By the time the fire brigade arrived, the kitchen ___ down.*",
    options: [
      ["had burnt", "Correct: the burning was completed before the brigade arrived, so the past perfect is needed."],
      ["has burnt", "The present perfect links to now; this story is set entirely in the past."],
      ["will burn", "Will burn points to the future, but the whole sentence describes past events."],
      ["burns", "The present simple does not fit a sentence set in the past."],
    ],
    answer: "A",
    explanation: "*By the time* + past simple is usually followed by the **past perfect** for the earlier, completed action: *By the time we arrived, the bus **had left**.*",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct verb forms.",
    template: "We {{blank:a}} supper when the power {{blank:b}} off.",
    blanks: [
      { id: "a", accepted: ["were eating"], choices: ["were eating", "ate", "are eating", "had been eat"] },
      { id: "b", accepted: ["went"], choices: ["went", "was going", "has gone", "goes"] },
    ],
    explanation: "The longer background action takes the **past continuous** (*were eating*); the short action that interrupted it takes the **past simple** (*went*).",
  });
  b.fib({
    d: 2,
    stem: "Write the correct form of each verb in brackets.",
    template: "The bell has already {{blank:a}} (ring), and the pupils have {{blank:b}} (begin) their test.",
    blanks: [
      { id: "a", accepted: ["rung"], wrong: "rang" },
      { id: "b", accepted: ["begun"], wrong: "began" },
    ],
    explanation: "After *has/have* use the **past participle**: ring → rang → **rung**; begin → began → **begun**. *Rang* and *began* are past simple forms and cannot follow *has*.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In the sentence *Did you went to the market?* the verb form is correct.",
    answer: false,
    explanation: "False. After the auxiliary *did*, the main verb is in its base form: *Did you **go** to the market?* The past is already shown by *did*.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "*I will call you when I will arrive in Bulawayo* is correct because both actions are in the future.",
    answer: false,
    explanation: "False. In a time clause after *when, as soon as, before, after* or *until*, English uses the present simple for the future: *I will call you when I **arrive** in Bulawayo.*",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each sentence with the tense of its verb.",
    pairs: [
      ["She had finished her homework.", "past perfect"],
      ["She was finishing her homework.", "past continuous"],
      ["She has been doing homework all afternoon.", "present perfect continuous"],
      ["She will have finished by six.", "future perfect"],
    ],
    explanation: "had + participle = past perfect; was/were + -ing = past continuous; has/have been + -ing = present perfect continuous; will have + participle = future perfect.",
  });
  b.short({
    d: 2,
    stem: "Write the past simple of **seek**.\n\n*The villagers ___ help from the district office after the floods.*",
    accepted: ["sought"],
    wrong: ["seeked", "saught"],
    explanation: "*Seek* is irregular: seek → **sought** → sought (like *buy → bought*, *think → thought*). Note the spelling *-ought*.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Choose the correct verb.\n\n*After the long walk from Domboshava, Tariro ___ down on the bed and fell asleep.*",
    options: [
      ["lay", "Correct: lie (rest) has the past simple lay."],
      ["laid", "Laid is the past of lay (put something down), which needs an object."],
      ["lied", "Lied is the past of lie meaning 'tell an untruth'."],
      ["layed", "There is no such form; the past of lay is laid."],
    ],
    answer: "A",
    hints: ["Did she put something down, or did she rest?", "The verb meaning 'rest' is lie; what is its past simple?"],
    explanation: "**lie** (rest): lie, lay, lain. **lay** (put down, needs an object): lay, laid, laid. **lie** (say something untrue): lie, lied, lied. Tariro rested, so she **lay** down.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which sentence keeps the tenses consistent?",
    options: [
      ["When the rain stopped, the boys ran outside and played football.", "Correct: all three verbs are in the past simple, describing events in order."],
      ["When the rain stopped, the boys run outside and played football.", "Run is present; the rest of the sentence is in the past."],
      ["When the rain stops, the boys ran outside and played football.", "Stops is present, but the actions that follow are in the past."],
      ["When the rain stopped, the boys ran outside and play football.", "Play is present; it should match ran and stopped."],
    ],
    answer: "A",
    hints: ["Find the time frame set by the first verb, then check every verb against it."],
    explanation: "In a narrative in the past, every main verb stays in the past unless there is a reason to change (an earlier event, a general truth or dialogue). This is the **sequence of tenses**.",
  });
  b.short({
    d: 3,
    stem: "The sentence contains one verb error. Write the incorrect verb correctly.\n\n*The examiner has wrote a report on the candidates' answers.*",
    accepted: ["written", "has written"],
    model: "written",
    wrong: ["wrote", "writed"],
    hints: ["Which form of the verb follows has?"],
    explanation: "After *has*, use the past participle: write → wrote → **written**. *The examiner has **written** a report.*",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain the difference in meaning between these two sentences.\n\n1. *When I got to the clinic, the doctor left.*\n2. *When I got to the clinic, the doctor had left.*",
    points: [
      "Sentence 1: the doctor left at the moment (or just after) I arrived, so I probably saw him go.",
      "Sentence 2: the doctor left before I arrived (past perfect for the earlier action), so I missed him.",
    ],
    modelAnswer: "In sentence 1 the doctor left when I arrived, so the two events happened at about the same time. In sentence 2 the past perfect shows he had already gone before I got there, so I missed him.",
    hints: ["Which action happened first in each sentence?"],
    explanation: "The **past perfect** puts one past action before another. Without it, the two actions are understood to happen one straight after the other.",
  });
  b.fib({
    d: 3, examStyle: true,
    stem: "The following sentences come from a pupil's account of a school trip. Write the correct form of each verb in brackets.",
    template: "We {{blank:a}} (leave) Harare at five o'clock. By the time we reached Kariba, the sun {{blank:b}} (rise) and fishermen {{blank:c}} (already, bring) in their catch.",
    blanks: [
      { id: "a", accepted: ["left"], wrong: "leaved" },
      { id: "b", accepted: ["had risen", "had already risen"], wrong: "rose" },
      { id: "c", accepted: ["had already brought"], wrong: "already brought" },
    ],
    hints: ["The account is in the past.", "*By the time we reached* tells you that the other two actions happened earlier."],
    explanation: "**left** (past simple of *leave*, irregular). *By the time we reached* puts the other actions earlier, so they take the past perfect: **had risen** (rise, rose, risen) and **had already brought** (bring, brought, brought; *already* sits between *had* and the participle).",
  });
  b.fib({
    d: 4, examStyle: true,
    stem: "This extract from a newspaper report contains verbs in brackets. Write the correct form of each.",
    template: "Since January, volunteers in Chiredzi {{blank:a}} (plant) more than two thousand trees. Next month they {{blank:b}} (start) work on a second site, and by the end of the year they hope they {{blank:c}} (complete) the whole project.",
    blanks: [
      { id: "a", accepted: ["have planted", "have been planting"], wrong: "planted" },
      { id: "b", accepted: ["will start", "are starting", "are going to start", "start"], wrong: "started" },
      { id: "c", accepted: ["will have completed"], wrong: "will complete" },
    ],
    hints: ["*Since January* links the past to now.", "*By the end of the year* means 'completed before a future time'."],
    explanation: "*Since January* (still continuing) needs the present perfect: **have planted** (or *have been planting*). *Next month* is future: **will start** (a scheduled plan also allows *are starting*, *are going to start* or *start*). *By the end of the year* needs the future perfect: **will have completed**.",
  });
  b.short({
    d: 4, examStyle: true,
    stem: "Rewrite the sentence from a pupil's story, correcting the one tense error. Write the whole corrected sentence.\n\n*Nyasha closed her books, switched off the lamp and goes to bed.*",
    accepted: ["Nyasha closed her books, switched off the lamp and went to bed."],
    wrong: ["Nyasha closes her books, switches off the lamp and goes to bed."],
    hints: ["Two of the three verbs agree with each other. Which one does not?"],
    explanation: "*Closed* and *switched* are in the past simple, so the third action must be too: *and **went** to bed*. Changing all three verbs to the present would rewrite the story rather than correct the single error.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Choose the verb that best completes the sentence.\n\n*This time next week, the Form 4 pupils ___ their final Mathematics paper.*",
    options: [
      ["will be writing", "Correct: the future continuous shows an action in progress at a stated future moment."],
      ["will have written", "The future perfect would mean the paper is already finished at that moment; this time next week points to the paper being in progress."],
      ["are written", "This is passive and present, so it cannot describe the pupils' future action."],
      ["have been writing", "The present perfect continuous looks back from now, not forward to next week."],
    ],
    answer: "A",
    hints: ["The phrase *this time next week* points to a moment when an activity is going on."],
    explanation: "The **future continuous** (will be + -ing) describes an action that will be in progress at a particular time in the future: *This time tomorrow I will be flying to London.*",
  });

  b.card("DEFINITION", "What does the **present perfect** show?", "A past action or situation linked to now, with no finished time stated: *She has lost her key* (it is still lost).", "Used with since, for, already, yet, just, ever, never; not with yesterday or last week.");
  b.card("DEFINITION", "What does the **past perfect** show?", "The earlier of two past actions: *The film had started when we arrived.*", "Form: had + past participle.");
  b.card("CONCEPT", "Past continuous + past simple", "The longer background action takes the past continuous; the short interrupting action takes the past simple: *I was sleeping when the phone rang.*", undefined);
  b.card("FACT", "Verb form after do/does/did", "The base form: *Did you see? She doesn't know.*", "Never *did you saw* or *doesn't knows*.");
  b.card("FACT", "Verb form after have/has/had", "The past participle: *has written, have gone, had begun, has rung.*", undefined);
  b.card("FACT", "Future time clauses", "After when, as soon as, before, after, until and if, use a present tense for the future: *I'll tell him when he arrives.*", undefined);
  b.card("FACT", "lie and lay", "lie (rest): lie, lay, lain. lay (put down): lay, laid, laid. lie (tell untruths): lie, lied, lied.", undefined);
  b.card("FACT", "Irregular verbs often misused", "begin, began, begun; ring, rang, rung; swim, swam, swum; drink, drank, drunk; write, wrote, written; seek, sought, sought.", undefined);
  b.card("CONCEPT", "Sequence of tenses", "Keep the verbs in a passage in the same time frame; move back to the past perfect only for an earlier event.", "Check a story by reading only the verbs.");
  b.card("DEFINITION", "What does the **future perfect** show?", "An action that will be completed before a time in the future: *By June we will have finished the syllabus.*", "Form: will have + past participle.");
});
