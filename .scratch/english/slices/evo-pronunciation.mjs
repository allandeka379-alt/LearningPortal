// Slice EVO: pronunciation, stress and intonation (plain spelling; stressed syllables in CAPITALS; no IPA).
import { concept } from "../lib.mjs";

concept("eng.oral.pronunciation", { file: "oral/pronunciation", keyPrefix: "oral.pronunciation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which word is the letter **b** silent?",
    options: [
      ["climb", "Correct: after m at the end of a word, b is silent (clime)."],
      ["number", "The b in number is pronounced: NUM-ber."],
      ["rubber", "The b sound is pronounced in rubber."],
      ["table", "The b in table is pronounced: TA-ble."],
    ],
    answer: "A",
    explanation: "**b** is usually silent after **m** at the end of a word (climb, lamb, comb, thumb) and before **t** (doubt, debt).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which word is the first letter silent?",
    options: [
      ["knee", "Correct: k before n is silent (nee)."],
      ["kettle", "The k in kettle is pronounced."],
      ["kind", "The k in kind is pronounced."],
      ["kick", "Both k sounds in kick are pronounced."],
    ],
    answer: "A",
    explanation: "**k** is silent before **n** at the start of a word: knee, knife, know, knock, knowledge.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How is the word in bold stressed in this sentence?\n\n*The choir will **record** a new song next week.*",
    options: [
      ["on the second syllable (re-CORD), because it is a verb", "Correct: verbs in these pairs are stressed on the second syllable."],
      ["on the first syllable (RE-cord), because it is a verb", "REcord is the noun stress; here the word is a verb."],
      ["on the first syllable (RE-cord), because it is a noun", "Will record is a verb phrase, not a noun."],
      ["on the second syllable (re-CORD), because it is a noun", "The stress is right, but the word is a verb here."],
    ],
    answer: "A",
    explanation: "In noun/verb pairs, the **noun** is stressed on the first syllable (a REcord) and the **verb** on the second (to reCORD).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How is the word in bold stressed in this sentence?\n\n*My aunt gave me a **present** for my birthday.*",
    options: [
      ["on the first syllable: PRE-sent", "Correct: present is a noun here (a gift), so the stress is on the first syllable."],
      ["on the second syllable: pre-SENT", "preSENT is the verb (to present a prize)."],
      ["equally on both syllables", "English words have one main stressed syllable."],
      ["on neither syllable: it is unstressed", "Every English word of two or more syllables has a stressed syllable."],
    ],
    answer: "A",
    explanation: "*a PREsent* (noun: a gift) vs *to preSENT* (verb: to give formally or show).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which word is stressed on the **second** syllable?",
    options: [
      ["hotel", "Correct: ho-TEL."],
      ["water", "WA-ter is stressed on the first syllable."],
      ["market", "MAR-ket is stressed on the first syllable."],
      ["teacher", "TEA-cher is stressed on the first syllable."],
    ],
    answer: "A",
    explanation: "Most two-syllable nouns are stressed on the first syllable, but some are not: *ho-TEL*, *ba-NA-na* (three), *to-DAY*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In which word does the *-ed* ending add an extra syllable (*id*)?",
    options: [
      ["wanted", "Correct: after t or d, -ed is pronounced id: WAN-tid."],
      ["walked", "Walked is one syllable: walkt."],
      ["played", "Played is one syllable: playd."],
      ["cleaned", "Cleaned is one syllable: cleand."],
    ],
    answer: "A",
    explanation: "*-ed* adds a syllable (**id**) only after a *t* or *d* sound: wanted, needed, started. Otherwise it sounds like *t* (walked) or *d* (played).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In which word does *-ed* sound like **t**?",
    options: [
      ["washed", "Correct: after the sh sound, -ed sounds like t (washt)."],
      ["played", "After a vowel sound, -ed sounds like d (playd)."],
      ["needed", "After d, -ed adds a syllable: NEE-did."],
      ["opened", "After n, -ed sounds like d (opend)."],
    ],
    answer: "A",
    hints: ["Say each word aloud and listen to its last sound.", "Which word ends in a hissing sound before -ed?"],
    explanation: "*-ed* sounds like **t** after *p, k, f, s, sh, ch* sounds: washed, stopped, laughed, kissed.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which question would **normally** be said with a **rising** intonation at the end?",
    options: [
      ["Are you coming to the match?", "Correct: yes/no questions usually rise at the end."],
      ["Where are you going?", "Wh- questions usually fall at the end."],
      ["Close the door, please.", "Commands usually fall."],
      ["I live near the clinic.", "Statements usually fall."],
    ],
    answer: "A",
    explanation: "Rising intonation: yes/no questions. Falling intonation: statements, commands and wh- questions.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A speaker says: *\"I didn't take YOUR pen.\"* (capitals show the stressed word). What does the speaker mean?",
    options: [
      ["I took somebody else's pen, not yours.", "Correct: stressing your contrasts it with another person's pen."],
      ["I took something of yours, but not the pen.", "That meaning needs stress on PEN."],
      ["I borrowed your pen but did not keep it.", "That meaning needs stress on TAKE."],
      ["I firmly deny doing anything with it.", "That meaning needs stress on DIDN'T."],
    ],
    answer: "A",
    hints: ["The stressed word is the one being contrasted with something else."],
    explanation: "**Contrastive stress** highlights the word that contrasts: *YOUR pen* (not someone else's).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why do we say *an hour* but *a house*?",
    options: [
      ["The h of hour is silent, so it begins with a vowel sound.", "Correct: a/an depends on the first sound, and hour starts with a vowel sound."],
      ["Hour is an uncountable noun and house is countable.", "Hour is countable (two hours); this is not the reason."],
      ["Hour is a time word, and time words always take an.", "Many time words take a: a day, a minute."],
      ["The h of house is silent, so it takes the article a.", "The h of house is pronounced."],
    ],
    answer: "A",
    hints: ["The choice of a or an depends on sound, not spelling."],
    explanation: "Use *an* before a vowel **sound**: *an hour, an honest man, an heir*. The *h* is silent in these words.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which syllable is stressed in **education** (e-du-ca-tion)?",
    options: [
      ["the third syllable (ca)", "Correct: -tion words are stressed on the syllable just before the ending."],
      ["the first syllable (e)", "The stress is not on the first syllable."],
      ["the second syllable (du)", "The stress falls just before -tion."],
      ["the fourth syllable (tion)", "The ending -tion is never stressed."],
    ],
    answer: "A",
    hints: ["Look at the ending of the word."],
    explanation: "Words ending in **-tion, -sion, -ic** stress the syllable just before the ending: edu-CA-tion, de-CI-sion, eco-NO-mic.",
  });
  b.fib({
    d: 2,
    stem: "Choose which syllable is stressed in each word in bold.",
    template: "Workers marched to **protest** (stress on the {{blank:a}}) about pay. The **protest** (stress on the {{blank:b}}) lasted two hours.",
    blanks: [
      { id: "a", accepted: ["second syllable"], choices: ["second syllable", "first syllable", "both syllables equally"] },
      { id: "b", accepted: ["first syllable"], choices: ["first syllable", "second syllable", "both syllables equally"] },
    ],
    explanation: "*to proTEST* (verb, second syllable); *a PROtest* (noun, first syllable).",
  });
  b.fib({
    d: 3, examStyle: true,
    stem: "Each word in bold is a noun or a verb. Choose which syllable is stressed in each.",
    template: "Tobacco is one of Zimbabwe's main **exports** (stress on the {{blank:a}}). Did anyone **object** (stress on the {{blank:b}}) to the new rules? Visitors need a **permit** (stress on the {{blank:c}}) to enter the park. Prices may **increase** (stress on the {{blank:d}}) next month.",
    blanks: [
      { id: "a", accepted: ["first syllable"], choices: ["first syllable", "second syllable", "both syllables equally"] },
      { id: "b", accepted: ["second syllable"], choices: ["second syllable", "first syllable", "both syllables equally"] },
      { id: "c", accepted: ["first syllable"], choices: ["first syllable", "second syllable", "both syllables equally"] },
      { id: "d", accepted: ["second syllable"], choices: ["second syllable", "first syllable", "both syllables equally"] },
    ],
    hints: ["Decide first whether each word is a noun or a verb.", "Nouns: first syllable. Verbs: second syllable."],
    explanation: "Nouns: **EXports**, **PERmit**. Verbs: **obJECT**, **inCREASE**.",
  });
  b.short({
    d: 2,
    stem: "Which letter is silent in the word **island**? Write the letter only.",
    accepted: ["s", "the s", "the letter s"],
    wrong: ["l", "d"],
    explanation: "*island* is pronounced EYE-lund: the **s** is silent (also in *aisle*).",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In *Wednesday*, the first *d* is silent.",
    answer: true,
    explanation: "True. *Wednesday* is said WENZ-day: the first *d* is silent (and the second *e* is not pronounced either).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "*Ship* and *sheep* are pronounced the same way.",
    answer: false,
    explanation: "False. *Ship* has a short vowel; *sheep* has a long *ee* sound. Mixing them can change your meaning (*live / leave*, *sit / seat*).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each word with its silent letter.",
    pairs: [["write", "w"], ["doubt", "b"], ["autumn", "n"], ["listen", "t"], ["half", "l"]],
    explanation: "w before r (write); b before t (doubt); n after m (autumn); t in -sten (listen); l in half, calm, talk.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how stress shows the difference in meaning between *a REbel* and *to reBEL*, and use each correctly in a sentence of your own.",
    points: [
      "Explains that REbel (first syllable stressed) is a noun, a person who fights against authority.",
      "Explains that reBEL (second syllable stressed) is a verb, to fight against or refuse to obey authority.",
      "Writes correct sentences using the noun and the verb.",
    ],
    modelAnswer: "REbel, stressed on the first syllable, is a noun: The rebel hid in the hills. reBEL, stressed on the second, is a verb: Teenagers sometimes rebel against rules.",
    hints: ["Remember the rule for noun/verb pairs."],
    explanation: "Noun/verb pairs share spelling but differ in stress: noun first, verb second.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4, examStyle: true,
    stem: "Read the dialogue aloud (capitals show stressed words).\n\n*Teacher: You finished the project, DIDn't you?*\n*Pupil: I finished the FIRST part.*\n\n(a) Should the teacher's question tag rise or fall if she is sure the work is finished? Explain.\n(b) Why does the pupil stress FIRST, and what does this tell the teacher?",
    points: [
      "(a) Falling intonation.",
      "(a) Because a falling tag expects agreement; a rising tag would be a real question.",
      "(b) FIRST is stressed to contrast it with the other parts of the project.",
      "(b) This tells the teacher that the rest of the project is not finished.",
    ],
    modelAnswer: "(a) It should fall, because she expects the pupil to agree; a rising tag would show she was unsure. (b) The pupil stresses FIRST to contrast it with the other parts, showing that only part of the project is done.",
    hints: ["Think about the two meanings of question tags.", "Contrastive stress points to what is different."],
    explanation: "A falling question tag expects agreement; a rising one asks. Contrastive stress highlights the word that differs from what the listener assumed.",
  });

  b.card("DEFINITION", "Word stress", "The extra force on one syllable of a word: TEA-cher, ho-TEL, com-PU-ter.", undefined);
  b.card("FACT", "Noun/verb stress pairs", "Noun: first syllable (a REcord, an OBject, a PREsent). Verb: second syllable (to reCORD, to obJECT, to preSENT).", undefined);
  b.card("FACT", "Stress before -tion, -sion, -ic", "Stress the syllable just before the ending: edu-CA-tion, de-CI-sion, eco-NO-mic.", undefined);
  b.card("FACT", "Silent k, w, b", "knife, know, knee; write, wrong, wrist; climb, lamb, doubt, debt.", undefined);
  b.card("FACT", "Silent h, t, l, n, s, p, d", "hour, honest; listen, castle; half, calm; autumn, column; island; receipt, psychology; Wednesday.", undefined);
  b.card("FACT", "Three sounds of -ed", "t after p, k, f, s, sh, ch (walked); d after voiced sounds (played); id after t or d (wanted).", undefined);
  b.card("CONCEPT", "Sentence stress", "Stress content words (nouns, main verbs, adjectives, adverbs); move the stress to contrast a word: I didn't take YOUR pen.", undefined);
  b.card("FACT", "Rising and falling intonation", "Falling: statements, commands, wh- questions. Rising: yes/no questions. Lists rise on each item and fall on the last.", undefined);
  b.card("FACT", "Question tags", "Falling tag = expecting agreement (It's hot, isn't it? ↘). Rising tag = a real question (You're coming, aren't you? ↗).", undefined);
});
