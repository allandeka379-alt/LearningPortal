// Slice EG1: direct and reported (indirect) speech.
import { concept } from "../lib.mjs";

concept("eng.grammar.reported-speech", { file: "grammar/reported-speech", keyPrefix: "grammar.reported-speech" }, (b) => {
  b.mcq({
    d: 1, skill: "UNDERSTANDING",
    stem: "Which sentence is punctuated correctly?",
    options: [
      ["\"The bus is late again,\" complained Mrs Sibanda.", "Correct: the comma goes inside the closing quotation mark."],
      ["\"The bus is late again\", complained Mrs Sibanda.", "The comma must go inside the quotation marks, before they close."],
      ["\"The bus is late again.\" complained Mrs Sibanda.", "A full stop ends the whole sentence; here the sentence continues, so use a comma."],
      ["The bus is late again, complained \"Mrs Sibanda.\"", "Only the spoken words go inside quotation marks."],
    ],
    answer: "A",
    explanation: "Put the spoken words in quotation marks, and put the comma (or question mark or exclamation mark) **inside** the closing mark: *\"The bus is late again,\" complained Mrs Sibanda.*",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Choose the correct reported form.\n\n*\"I am hungry,\" said Tino.*",
    options: [
      ["Tino said that he was hungry.", "Correct: I becomes he and am moves back to was."],
      ["Tino said that I was hungry.", "The pronoun must change: Tino is talking about himself."],
      ["Tino said that he is hungry.", "After a past reporting verb, am moves back to was."],
      ["Tino said that he had hungry.", "Had is not the past of am; the verb be becomes was."],
    ],
    answer: "A",
    explanation: "In reported speech after *said*, the present tense moves back (*am → was*) and the pronoun changes to fit the new speaker (*I → he*).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Choose the correct word.\n\n*Mrs Chari ___ us that the library would close early.*",
    options: [
      ["told", "Correct: tell is followed by the person spoken to."],
      ["said", "Say is not followed directly by the person: said to us, not said us."],
      ["spoke", "Speak is not used to report the content of what was said in this pattern."],
      ["talked", "Talk is not followed by a person and a that-clause."],
    ],
    answer: "A",
    explanation: "We **tell someone** (*told us that ...*) but **say something** (*said that ...*, *said to us that ...*).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Choose the correct reported question.\n\n*\"Where is the bus station?\" the tourist asked me.*",
    options: [
      ["The tourist asked me where the bus station was.", "Correct: statement word order (the bus station was), past tense, no question mark."],
      ["The tourist asked me where was the bus station.", "A reported question uses statement word order: subject before verb."],
      ["The tourist asked me where the bus station was?", "A reported question is not a real question, so there is no question mark."],
      ["The tourist asked me where is the bus station.", "This keeps question word order and the present tense."],
    ],
    answer: "A",
    explanation: "Reported questions: keep the question word, use **statement word order** (subject + verb), move the tense back and end with a full stop.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Choose the correct reported command.\n\n*\"Don't touch the loose wires,\" the electrician said to the pupils.*",
    options: [
      ["The electrician told the pupils not to touch the loose wires.", "Correct: a negative command becomes told + person + not to + verb."],
      ["The electrician told the pupils to not touching the loose wires.", "After to, use the base form, and put not before to."],
      ["The electrician told the pupils don't touch the loose wires.", "Don't must change to not to in reported commands."],
      ["The electrician said the pupils not to touch the loose wires.", "Said cannot be followed directly by a person; use told."],
    ],
    answer: "A",
    hints: ["Which reporting verb takes a person straight after it?", "How is a negative command reported: to not, or not to?"],
    explanation: "Commands: **told/ordered/asked + person + (not) to + base verb**. *Told the pupils not to touch ...*",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which reporting verb best reports this sentence?\n\n*\"I'm sorry I broke your cup,\" Tambu said to me.*",
    options: [
      ["Tambu apologised for breaking my cup.", "Correct: apologised for + -ing captures both the meaning and the tone."],
      ["Tambu promised for breaking my cup.", "Promise is used for future commitments and is not followed by for."],
      ["Tambu suggested breaking my cup.", "Suggest means put forward an idea; Tambu was saying sorry."],
      ["Tambu refused breaking my cup.", "Refuse means say no to doing something; it changes the meaning."],
    ],
    answer: "A",
    hints: ["What is Tambu doing when she says I'm sorry?"],
    explanation: "Precise reporting verbs summarise the speaker's purpose: *apologised for*, *promised to*, *suggested*, *warned ... not to*, *admitted*, *refused to*.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words for reported speech.",
    template: "\"I will see you here tomorrow,\" said the coach. → The coach said that he would see us {{blank:a}} {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["there"], choices: ["there", "here", "this place", "where"] },
      { id: "b", accepted: ["the next day"], choices: ["the next day", "tomorrow", "the day before", "today"] },
    ],
    explanation: "In reported speech, place and time words change: **here → there**, **tomorrow → the next day** (or *the following day*); *yesterday → the day before*.",
  });
  b.fib({
    d: 2,
    stem: "Write the verb in the form needed for reported speech.",
    template: "\"I have finished my essay,\" said Rutendo. → Rutendo said that she {{blank:a}} finished her essay. \"I can swim,\" said Peter. → Peter said that he {{blank:b}} swim.",
    blanks: [
      { id: "a", accepted: ["had"], wrong: "has" },
      { id: "b", accepted: ["could"], wrong: "can" },
    ],
    explanation: "Back-shift after a past reporting verb: **has/have → had** (present perfect → past perfect) and **can → could**. Also *will → would*, *may → might*.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A reported question ends with a question mark.",
    answer: false,
    explanation: "False. A reported question is a statement about a question: *She asked me where I lived.* It ends with a full stop.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "*The geography teacher said that the Zambezi flows into the Indian Ocean* is acceptable, even though *flows* has not been moved into the past.",
    answer: true,
    explanation: "True. When the reported statement is a permanent fact that is still true, the tense may stay in the present. In ordinary exercises, however, back-shift the tense.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each word or phrase in direct speech with its usual form in reported speech.",
    pairs: [
      ["today", "that day"],
      ["yesterday", "the day before"],
      ["now", "then"],
      ["this", "that"],
      ["next week", "the following week"],
    ],
    explanation: "Time and place words change because the report is made at a different time and place: today → that day; yesterday → the day before; now → then; this → that; next week → the following week.",
  });
  b.short({
    d: 3,
    stem: "Change the sentence into reported speech, beginning with the words given.\n\n*\"Are you coming to the match?\" Farai asked me.*\n\nBegin: *Farai asked me ...*",
    accepted: [
      "Farai asked me if I was coming to the match.",
      "Farai asked me whether I was coming to the match.",
    ],
    patterns: ["^farai asked me (if|whether) i was coming to the match( or not)?$", "^farai asked me whether or not i was coming to the match$"],
    wrong: ["Farai asked me was I coming to the match."],
    hints: ["A yes/no question is reported with if or whether.", "Use statement word order and move the tense back."],
    explanation: "Yes/no questions are reported with **if** or **whether**, statement word order and back-shift: *are you coming → if I was coming*.",
  });
  b.manualShort({
    d: 2, skill: "APPLICATION", marks: 2,
    stem: "Rewrite the sentence with the correct punctuation and capital letters.\n\n*where are my keys asked grandfather i left them on the table*",
    points: [
      "Quotation marks around each piece of speech, with a capital W and a capital I: \"Where are my keys?\" ... \"I left them on the table.\"",
      "Question mark inside the closing quotation mark after keys, and a full stop (inside the marks) at the end, e.g. \"Where are my keys?\" asked Grandfather. \"I left them on the table.\"",
    ],
    modelAnswer: "\"Where are my keys?\" asked Grandfather. \"I left them on the table.\"",
    explanation: "Each piece of speech starts with a capital letter and sits inside quotation marks; the question mark goes inside the closing mark. *Grandfather* takes a capital when used as a name.",
  });
  b.short({
    d: 3, examStyle: true,
    stem: "This sentence comes from a story about a girl applying for a library card. Change it into reported speech, beginning with the words given.\n\n*\"Where does your father work?\" the librarian asked Rudo.*\n\nBegin: *The librarian asked Rudo ...*",
    accepted: ["The librarian asked Rudo where her father worked."],
    patterns: ["^the librarian asked rudo where her father worked$"],
    wrong: ["The librarian asked Rudo where does her father work.", "The librarian asked Rudo where did her father work."],
    hints: ["Drop does and put the main verb into the past.", "Your father becomes her father."],
    explanation: "Keep the question word *where*, drop *does*, move *work* back to **worked**, change *your* to **her**, and end with a full stop: *The librarian asked Rudo where her father worked.*",
  });
  b.short({
    d: 4, examStyle: true,
    stem: "This sentence comes from a newspaper article about a new school block. Change it into reported speech, beginning with the words given.\n\n*\"We will finish the classroom here next week,\" the builder told the headmaster.*\n\nBegin: *The builder told the headmaster ...*",
    accepted: [
      "The builder told the headmaster that they would finish the classroom there the following week.",
      "The builder told the headmaster that they would finish the classroom there the next week.",
    ],
    patterns: ["^the builder told the headmaster (that )?they would finish the classroom there (the following week|the next week|the week after)$"],
    wrong: ["The builder told the headmaster that we will finish the classroom here next week."],
    hints: ["Four things change: the pronoun, the modal, the place word and the time phrase."],
    explanation: "**we → they**, **will → would**, **here → there**, **next week → the following week** (or *the next week*). *The builder told the headmaster that they would finish the classroom there the following week.*",
  });
  b.manualShort({
    d: 4, examStyle: true, skill: "APPLICATION", marks: 3,
    stem: "Read this extract from a story.\n\n*\"Have you seen my goats?\" the old woman asked the boys. \"Please help me look for them before dark.\"*\n\nRewrite the extract in reported speech. Begin: *The old woman asked the boys ...*",
    points: [
      "Reports the question with if/whether and statement order: asked the boys if (whether) they had seen her goats.",
      "Back-shifts the tense and changes the pronouns correctly (have seen → had seen; my → her; me → her; them stays them).",
      "Reports the request with asked/begged + them + to + verb: asked (begged) them to help her look for them before dark.",
    ],
    modelAnswer: "The old woman asked the boys if they had seen her goats. She asked them to help her look for them before dark.",
    hints: ["The extract contains a question and a request: report each in its own way."],
    explanation: "Questions: *asked + if/whether* + statement order + back-shift. Requests: *asked/begged + person + to + verb*. Pronouns follow the new point of view.",
  });
  b.mcq({
    d: 4, examStyle: true, skill: "ANALYSIS",
    stem: "A pupil's report of a meeting says:\n\n*The chairperson told us that she had received the new uniforms the day before and that she would hand them out the next morning.*\n\nWhich was the chairperson's original direct speech?",
    options: [
      ["\"I received the new uniforms yesterday, and I will hand them out tomorrow morning.\"", "Correct: had received → received, the day before → yesterday, would → will, the next morning → tomorrow morning."],
      ["\"She received the new uniforms yesterday, and she will hand them out tomorrow morning.\"", "In direct speech the chairperson speaks about herself, so she uses I."],
      ["\"I had received the new uniforms the day before, and I would hand them out next morning.\"", "The time words and tenses have not been changed back."],
      ["\"I received the new uniforms today, and I will hand them out this morning.\"", "The day before means yesterday, and the next morning means tomorrow morning."],
    ],
    answer: "A",
    hints: ["Reverse each change: tense, pronoun and time words."],
    explanation: "To return to direct speech, undo every change: restore *I*, move tenses forward (*had received → received*, *would → will*) and restore time words (*the day before → yesterday*, *the next morning → tomorrow morning*).",
  });

  b.card("DEFINITION", "What is **reported (indirect) speech**?", "Retelling what someone said without quoting their exact words, usually with changes to tense, pronouns and time words.", "She said that she was tired.");
  b.card("FACT", "Back-shift of tenses", "am/is → was; are → were; has/have → had; past simple → past perfect; will → would; can → could; may → might.", undefined);
  b.card("FACT", "Time and place words", "today → that day; tomorrow → the next day; yesterday → the day before; now → then; here → there; this → that.", undefined);
  b.card("CONCEPT", "Reporting yes/no questions", "asked + if/whether + statement word order, no question mark.", "She asked me if I was ready.");
  b.card("CONCEPT", "Reporting wh- questions", "asked + question word + statement word order; drop do/does/did.", "He asked where I lived.");
  b.card("CONCEPT", "Reporting commands", "told/ordered/asked + person + (not) to + base verb.", "The guard told us not to run.");
  b.card("FACT", "say vs tell", "say something (said that ..., said to me ...); tell someone (told me that ...).", "Never: said me.");
  b.card("FACT", "Punctuating direct speech", "Speech inside quotation marks, starting with a capital; comma, question mark or exclamation mark inside the closing mark; new paragraph for each new speaker.", undefined);
  b.card("VOCABULARY", "Precise reporting verbs", "apologised for, promised to, warned ... not to, suggested, admitted, refused to, insisted, explained.", undefined);
});
