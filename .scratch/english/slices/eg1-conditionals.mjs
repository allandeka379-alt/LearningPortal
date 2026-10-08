// Slice EG1: conditional sentences.
import { concept } from "../lib.mjs";

concept("eng.grammar.conditionals", { file: "grammar/conditionals", keyPrefix: "grammar.conditionals" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Choose the correct verb.\n\n*If you leave milk in the sun, it ___ sour.*",
    options: [
      ["goes", "Correct: a general fact uses the zero conditional, present simple in both clauses."],
      ["would go", "Would is for imaginary situations; milk going sour in the sun is a fact."],
      ["went", "The past simple does not fit a general truth stated in the present."],
      ["would have gone", "This is for an imagined past; the sentence states a general fact."],
    ],
    answer: "A",
    explanation: "The **zero conditional** (if + present, present) describes things that are always true: *If you leave milk in the sun, it goes sour.*",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Choose the correct verb.\n\n*If it ___ tomorrow, the sports day will be postponed.*",
    options: [
      ["rains", "Correct: in a first conditional the if-clause takes the present simple."],
      ["will rain", "Will is not used in the if-clause; it belongs in the main clause."],
      ["rained", "The past simple would make a second conditional, which needs would in the main clause."],
      ["would rain", "Would never goes in the if-clause."],
    ],
    answer: "A",
    explanation: "**First conditional:** if + present simple, will + base verb. *If it **rains** tomorrow, the sports day **will be** postponed.*",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Choose the correct verb.\n\n*If I had a smartphone, I ___ the lessons online.*",
    options: [
      ["would watch", "Correct: if + past simple is a second conditional, so the main clause takes would + base verb."],
      ["will watch", "Will goes with a present tense in the if-clause (first conditional), not with had."],
      ["would have watched", "Would have + participle belongs to the third conditional, which needs had had in the if-clause."],
      ["watch", "The present simple does not fit an imaginary result."],
    ],
    answer: "A",
    explanation: "**Second conditional:** if + past simple, would + base verb. The speaker does not have a smartphone; the situation is imagined.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Choose the correct verb.\n\n*If the goalkeeper had been more careful, we ___ the match.*",
    options: [
      ["would not have lost", "Correct: if + past perfect is a third conditional, so would have + past participle follows."],
      ["will not lose", "Will goes with a first conditional about the future, not with had been."],
      ["would not lose", "Would + base verb is for the present or future; this match is in the past."],
      ["had not lost", "The main clause of a third conditional needs would have, not had."],
    ],
    answer: "A",
    explanation: "**Third conditional:** if + past perfect, would have + past participle. It describes an imagined past: the goalkeeper was careless and we lost.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does this sentence mean?\n\n*If Simba had caught the early bus, he would have arrived on time.*",
    options: [
      ["Simba missed the early bus and arrived late.", "Correct: a third conditional describes a past that did not happen."],
      ["Simba caught the early bus and arrived on time.", "The third conditional imagines the opposite of what really happened."],
      ["Simba will catch the early bus tomorrow.", "The sentence refers to the past, not the future."],
      ["Simba usually catches the early bus to school.", "The sentence is about one past event, not a habit."],
    ],
    answer: "A",
    explanation: "Third conditionals are 'unreal past': both halves are the opposite of the facts. He did **not** catch the bus and did **not** arrive on time.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct word.",
    template: "{{blank:a}} you hurry, you will miss the start of the film.",
    blanks: [{ id: "a", accepted: ["Unless"], choices: ["Unless", "If", "Provided", "As long as"] }],
    explanation: "*Unless* means *if ... not*: *Unless you hurry* = *If you do not hurry*. The other choices would mean 'if you hurry, you will miss it', which makes no sense.",
  });
  b.fib({
    d: 2,
    stem: "Write the correct form of the verb in brackets.",
    template: "If I {{blank:a}} (be) the head of the school, I would build a new science laboratory.",
    blanks: [{ id: "a", accepted: ["were"], wrong: "am" }],
    explanation: "In a second conditional, formal English uses **were** for all persons: *If I were, if she were, if it were*. (*Was* is heard in speech but *were* is expected in examinations.)",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "*Unless* means the same as *if not*.",
    answer: true,
    explanation: "True. *Unless you study, you will fail* = *If you do not study, you will fail.*",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "*If I would have known about the meeting, I would have come* is correct.",
    answer: false,
    explanation: "False. *Would have* never goes in the *if*-clause. Write *If I **had known** about the meeting, I would have come.*",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each sentence with its type of conditional.",
    pairs: [
      ["If you press this button, the light comes on.", "zero conditional"],
      ["If you press this button, the alarm will ring.", "first conditional"],
      ["If I knew the code, I would open the door.", "second conditional"],
      ["If I had known the code, I would have opened the door.", "third conditional"],
    ],
    explanation: "Zero: present + present. First: present + will. Second: past + would. Third: past perfect + would have + participle.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Choose the correct verb.\n\n*I wish I ___ to my mother's advice before I spent all my pocket money.*",
    options: [
      ["had listened", "Correct: a wish about the past takes the past perfect."],
      ["listened", "The past simple is used for wishes about the present, but this regret is about the past."],
      ["would listen", "Would after wish is for wanting someone else to change a habit."],
      ["have listened", "Wish is never followed by the present perfect."],
    ],
    answer: "A",
    hints: ["Is the regret about now or about something already done?"],
    explanation: "*I wish / If only* + **past perfect** for regrets about the past; + past simple for the present; + would for wanting someone else's behaviour to change.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which sentence is a correct **mixed** conditional?",
    options: [
      ["If I had eaten breakfast, I would not be hungry now.", "Correct: a past condition (had eaten) with a present result (would not be ... now)."],
      ["If I ate breakfast, I would not have been hungry now.", "The tenses are reversed: would have been does not fit now."],
      ["If I had eaten breakfast, I will not be hungry now.", "Will does not follow a past perfect condition."],
      ["If I have eaten breakfast, I would not be hungry now.", "Have eaten does not combine with would; the condition is unreal."],
    ],
    answer: "A",
    hints: ["Find the sentence where the condition is in the past and the result is in the present."],
    explanation: "A common mixed conditional: if + past perfect (past condition), would + base verb (present result).",
  });
  b.short({
    d: 3,
    stem: "Rewrite the sentence using **unless**. Begin your answer with *Unless*.\n\n*If you do not wear a helmet, you cannot ride the school motorbike.*",
    accepted: [
      "Unless you wear a helmet, you cannot ride the school motorbike.",
      "Unless you wear a helmet, you can't ride the school motorbike.",
      "Unless you wear a helmet you can not ride the school motorbike.",
    ],
    rejected: ["Unless you do not wear a helmet, you cannot ride the school motorbike."],
    wrong: ["Unless you do not wear a helmet, you cannot ride the school motorbike."],
    hints: ["Unless already means 'if not'. What happens to do not?"],
    explanation: "*Unless* replaces *if ... not*, so *do not* disappears: ***Unless** you wear a helmet, you cannot ride the school motorbike.*",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain the difference in meaning between these sentences.\n\n1. *If I pass, I will study medicine.*\n2. *If I passed, I would study medicine.*",
    points: [
      "Sentence 1 (first conditional) treats passing as a real, likely possibility.",
      "Sentence 2 (second conditional) treats passing as imaginary or unlikely.",
    ],
    modelAnswer: "In the first sentence the speaker thinks passing is quite possible, so they plan to study medicine. In the second, the past tense shows they see passing as unlikely or only imagined.",
    hints: ["Which speaker sounds more confident about passing?"],
    explanation: "The past tense in a second conditional does not mean past time; it signals distance from reality.",
  });
  b.short({
    d: 3, examStyle: true,
    stem: "This sentence comes from a story about a family whose crops failed. Join the two sentences into one, beginning with the words given.\n\n*The rains did not come. The maize did not grow.*\n\nBegin: *If the rains had ...*",
    accepted: [
      "If the rains had come, the maize would have grown.",
      "If the rains had come, the maize would have grown well.",
      "If the rains had come the maize might have grown.",
    ],
    patterns: ["^if the rains had (come|fallen) the maize (would|could|might) have grown( well)?$"],
    model: "If the rains had come, the maize would have grown.",
    wrong: ["If the rains had come, the maize would grow."],
    hints: ["Both facts are in the past and cannot be changed.", "Which conditional imagines a different past?"],
    explanation: "Both sentences describe the past, so use the **third conditional**: *If the rains **had come**, the maize **would have grown**.* The negatives disappear because we imagine the opposite of what happened.",
  });
  b.fib({
    d: 3, examStyle: true,
    stem: "Complete the extract from a pupil's speech to the school assembly with the correct form of each verb in brackets.",
    template: "If every pupil {{blank:a}} (pick) up one piece of litter each day, our school would soon be the cleanest in the district. If we {{blank:b}} (start) this campaign last term, we would have won the clean-school award.",
    blanks: [
      { id: "a", accepted: ["picked"], wrong: "picks" },
      { id: "b", accepted: ["had started"], wrong: "started" },
    ],
    hints: ["Look at the verb in each main clause: would soon be, would have won."],
    explanation: "*Would soon be* shows a second conditional, so the *if*-clause takes the past simple: **picked**. *Would have won* shows a third conditional, so the *if*-clause takes the past perfect: **had started**.",
  });
  b.manualShort({
    d: 4, examStyle: true, skill: "APPLICATION", marks: 2,
    stem: "Rewrite each sentence from a pupil's diary, beginning with the words given, without changing the meaning.\n\n1. *I am not tall enough to play basketball for the school.* Begin: *I wish ...*\n2. *We went out in the rain, so we caught colds.* Begin: *If we had not ...*",
    points: [
      "I wish I were (or was) tall enough to play basketball for the school.",
      "If we had not gone out in the rain, we would not have caught colds.",
    ],
    modelAnswer: "1. I wish I were tall enough to play basketball for the school. 2. If we had not gone out in the rain, we would not have caught colds.",
    hints: ["A present wish takes the past simple.", "The second sentence is about the past: third conditional."],
    explanation: "A wish about the **present** takes the past simple (*were*). A regret about the **past** uses the third conditional, imagining the opposite of what happened.",
  });

  b.card("CONCEPT", "Zero conditional", "if + present simple, present simple: for facts and things that always happen.", "If you heat ice, it melts.");
  b.card("CONCEPT", "First conditional", "if + present simple, will + base verb: for real, likely future situations.", "If it rains, we will stay inside.");
  b.card("CONCEPT", "Second conditional", "if + past simple, would + base verb: for imagined or unlikely present or future situations.", "If I were rich, I would build a clinic.");
  b.card("CONCEPT", "Third conditional", "if + past perfect, would have + past participle: for an imagined past that did not happen.", "If I had known, I would have helped.");
  b.card("CONCEPT", "Mixed conditional", "if + past perfect, would + base verb: a past condition with a present result.", "If I had slept, I would not be tired now.");
  b.card("DEFINITION", "What does **unless** mean?", "If ... not. Do not add another negative after it.", "Unless you hurry = If you do not hurry.");
  b.card("FACT", "Never in the if-clause", "will and would (including would have).", "If he comes (not will come); If I had known (not would have known).");
  b.card("FACT", "I wish / If only", "+ past simple (present), + past perfect (past), + would (annoying habits of others).", "I wish I lived nearer. I wish I had gone. I wish he would stop.");
  b.card("VOCABULARY", "Words that mean 'only if'", "provided (that), providing, as long as, on condition that.", "You may go as long as you finish your chores.");
});
