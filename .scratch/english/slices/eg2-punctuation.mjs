// Slice EG2: punctuation. Punctuation is never tested with plain short answers (the marker strips punctuation):
// use MCQs, select blanks, true/false, matching and self-marked items.
import { concept } from "../lib.mjs";

concept("eng.grammar.punctuation", { file: "grammar/punctuation", keyPrefix: "grammar.punctuation" }, (b) => {
  b.mcq({
    d: 1, skill: "UNDERSTANDING",
    stem: "Which words in this sentence need **capital letters**?\n\n*on monday my aunt took the bus to kwekwe to visit her friend at the hospital.*",
    options: [
      ["On, Monday, Kwekwe", "Correct: the first word of the sentence, a day of the week and the name of a town."],
      ["On, Monday, Aunt, Kwekwe", "Aunt is a common noun here (my aunt); it takes a capital only as a title before a name (Aunt Rudo)."],
      ["Monday, Kwekwe, Hospital", "Hospital is a common noun; and the first word of the sentence also needs a capital."],
      ["On, Kwekwe, Bus", "Bus is a common noun, and Monday (a day) is missing."],
    ],
    answer: "A",
    explanation: "Capital letters begin sentences and proper nouns: names, titles (*Mrs, Dr*), places, days, months, organisations, languages and the pronoun *I*.",
  });
  b.mcq({
    d: 1, skill: "UNDERSTANDING",
    stem: "Which of these should end with a **question mark**?",
    options: [
      ["Where did you leave the keys", "Correct: it is a direct question, so it needs a question mark."],
      ["I asked him where he had left the keys", "This is an indirect (reported) question: it ends with a full stop."],
      ["Tell me where you left the keys", "This is a command (instruction): it ends with a full stop."],
      ["She wondered where the keys were", "This reports someone's thought; it is a statement."],
    ],
    answer: "A",
    explanation: "Only **direct questions** take a question mark. Indirect questions (*I asked where ...*), commands and statements end with a full stop.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Choose the correct way to write *the bags belonging to the girls*.",
    options: [
      ["the girls' bags", "Correct: girls is a plural ending in s, so the apostrophe goes after the s."],
      ["the girl's bags", "This means the bags belong to one girl."],
      ["the girls bags", "Possession needs an apostrophe."],
      ["the girls's bags", "A plural ending in s takes only an apostrophe, not 's."],
    ],
    answer: "A",
    explanation: "Singular owner: add **'s** (*the girl's bag*). Plural owner ending in *s*: add **'** only (*the girls' bags*). Plural not ending in *s*: add **'s** (*the children's books*).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which sentence is correct?",
    options: [
      ["It's late, so the dog has gone to its kennel.", "Correct: it's = it is; its (no apostrophe) shows possession."],
      ["Its late, so the dog has gone to it's kennel.", "The forms are swapped: it's means it is, and its shows possession."],
      ["It's late, so the dog has gone to it's kennel.", "The second it's should be its, because it shows possession."],
      ["Its late, so the dog has gone to its kennel.", "The first Its should be It's, meaning it is."],
    ],
    answer: "A",
    explanation: "**it's** = *it is* or *it has*. **its** = belonging to it. Possessive pronouns (*its, hers, ours, theirs*) never take an apostrophe.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which sentence uses commas correctly in a list?",
    options: [
      ["We bought tomatoes, onions, rice and cooking oil.", "Correct: commas separate the items, and and joins the last two."],
      ["We bought, tomatoes, onions, rice and cooking oil.", "There should be no comma between the verb and its object."],
      ["We bought tomatoes onions, rice, and, cooking oil.", "Commas are missing between some items and misplaced around and."],
      ["We bought tomatoes, onions, rice, cooking, oil.", "Cooking oil is one item; the comma splits it."],
    ],
    answer: "A",
    explanation: "In a list, put a comma after each item except the last two, which are joined by *and* (British usage normally has no comma before *and*).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which sentence is punctuated correctly?",
    options: [
      ["\"Where are you going?\" asked the teacher.", "Correct: the question mark stays inside the speech marks, and asked begins with a small letter."],
      ["\"Where are you going\"? asked the teacher.", "The question mark belongs to the spoken words, so it goes inside the speech marks."],
      ["\"Where are you going?\" the teacher, asked.", "No comma may separate the subject (the teacher) from its verb (asked)."],
      ["\"Where are you going,\" asked the teacher?", "The spoken words are the question, so the question mark comes after going."],
    ],
    answer: "A",
    hints: ["Which words are the actual question?", "Where must the question mark go in relation to the closing speech marks?"],
    explanation: "In direct speech, the punctuation of the spoken words (**? ! ,**) goes **inside** the closing speech marks. If the sentence continues (*asked the teacher*), it starts with a small letter.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which sentence uses the **semicolon** correctly?",
    options: [
      ["The rains were late; the farmers were worried.", "Correct: a semicolon joins two closely related main clauses."],
      ["The rains were late; and the farmers were worried.", "Use either a semicolon or a comma + and, not a semicolon with and."],
      ["Because the rains were late; the farmers were worried.", "Because the rains were late cannot stand alone; use a comma."],
      ["The rains; were late and the farmers were worried.", "A semicolon cannot separate a subject from its verb."],
    ],
    answer: "A",
    hints: ["Could the words on each side of the semicolon stand alone as a sentence?"],
    explanation: "A **semicolon** joins two main clauses that are closely linked in meaning, without a conjunction. Each side must be able to stand alone as a sentence.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which sentence uses the **colon** correctly?",
    options: [
      ["Bring the following tools: a hoe, a bucket and a hat.", "Correct: a colon introduces a list after a complete clause."],
      ["Bring: a hoe, a bucket and a hat.", "A colon should not come straight after a verb; the clause before it must be complete."],
      ["Bring the following tools, a hoe: a bucket and a hat.", "The colon is in the middle of the list instead of before it."],
      ["Bring the following: tools a hoe, a bucket and a hat.", "The colon splits the phrase the following tools in the wrong place."],
    ],
    answer: "A",
    hints: ["What must come before a colon: a complete clause or just a verb?"],
    explanation: "A **colon** follows a complete clause and introduces a list, an explanation or a quotation: *There was one problem: nobody had the keys.*",
  });
  b.mcq({
    d: 2, skill: "ANALYSIS",
    stem: "Which sentence **invites Gogo to come and eat**?",
    options: [
      ["Let's eat, Gogo.", "Correct: the comma shows that Gogo is the person being spoken to."],
      ["Let's eat Gogo.", "Without the comma, Gogo becomes the thing to be eaten."],
      ["Lets eat Gogo.", "This has no comma (so Gogo is eaten) and lets needs an apostrophe."],
      ["Let's eat Gogo!", "The exclamation mark does not help: without a comma Gogo is still eaten."],
    ],
    answer: "A",
    explanation: "A comma separates the name of the **person addressed** from the rest of the sentence: *Let's eat, Gogo.* *Thank you, Doctor.* Punctuation can change meaning completely.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "In *My brother, who lives in Bulawayo, is a teacher*, the commas suggest that the writer has only one brother.",
    answer: true,
    hints: ["Could the words between the commas be removed without losing which brother is meant?"],
    explanation: "True. Commas around *who lives in Bulawayo* mark extra (non-defining) information: there is only one brother, and he happens to live in Bulawayo. Without commas (*My brother who lives in Bulawayo is a teacher*) the clause identifies which of several brothers is meant.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correctly punctuated word for each gap.",
    template: "\"{{blank:a}} going to be late for the match,\" said Tendai, looking at the {{blank:b}} shoes still drying in the sun.",
    blanks: [
      { id: "a", accepted: ["I'm"], normalise: ["trim"], choices: ["I'm", "Im", "I'am", "Im'"] },
      { id: "b", accepted: ["children's"], normalise: ["trim"], choices: ["children's", "childrens'", "childrens", "children"] },
    ],
    explanation: "**I'm** = *I am*: the apostrophe replaces the missing letter *a*. **children's**: *children* is a plural that does not end in *s*, so add *'s*.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each punctuation mark with one of its uses.",
    pairs: [
      ["colon ( : )", "introduces a list or an explanation"],
      ["semicolon ( ; )", "joins two closely related main clauses"],
      ["apostrophe ( ' )", "shows possession or a missing letter"],
      ["dash ( – )", "marks a sudden break or an added comment"],
      ["brackets ( ( ) )", "enclose extra information that could be removed"],
    ],
    explanation: "Each mark has its own job: the colon introduces, the semicolon joins, the apostrophe shows possession or omission, the dash interrupts informally, and brackets enclose removable extra information.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "An apostrophe is used to make ordinary plurals, as in a sign reading *Fresh tomato's for sale*.",
    answer: false,
    explanation: "False. Plurals never take an apostrophe: *Fresh tomatoes for sale*. Apostrophes show possession (*the vendor's stall*) or missing letters (*don't*).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which phrase uses the **hyphen** correctly?",
    options: [
      ["a well-known musician from Chitungwiza", "Correct: well-known is a compound adjective before a noun, so it is hyphenated."],
      ["a well known-musician from Chitungwiza", "The hyphen joins well and known, not known and musician."],
      ["a well-known-musician from Chitungwiza", "The noun musician is not part of the compound adjective."],
      ["a-well known musician from Chitungwiza", "The article a is never joined by a hyphen."],
    ],
    answer: "A",
    explanation: "Hyphenate compound adjectives that come **before** a noun: *a well-known musician*, *a four-year-old child*, *a part-time job*. Also use hyphens in compound numbers (*twenty-one*) and some prefixes (*ex-pupil*).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which sentence is punctuated correctly?",
    options: [
      ["She asked me where I lived.", "Correct: an indirect question is a statement and ends with a full stop."],
      ["She asked me where I lived?", "Indirect questions do not take a question mark."],
      ["She asked me, where I lived.", "No comma is needed before an indirect question."],
      ["She asked me where did I live?", "Indirect questions use statement word order (where I lived)."],
    ],
    answer: "A",
    explanation: "An **indirect question** reports a question in statement form: *She asked me where I lived.* (Direct: *\"Where do you live?\" she asked.*)",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which sentence is punctuated correctly?",
    options: [
      ["The repairs will be finished in two weeks' time.", "Correct: two weeks is plural and ends in s, so the apostrophe follows the s."],
      ["The repairs will be finished in two week's time.", "Week's would mean one week; here there are two."],
      ["The repairs will be finished in two weeks time.", "Time expressions like this need a possessive apostrophe."],
      ["The repairs will be finished in two weeks's time.", "A plural ending in s takes only an apostrophe."],
    ],
    answer: "A",
    hints: ["Expressions of time use the possessive: *a day's work*.", "Is *weeks* singular or plural here?"],
    explanation: "Time expressions take a possessive apostrophe: *a day's journey*, *a week's holiday*, *two weeks' time*, *three months' notice*. The usual singular/plural rules apply.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: "The sentence comes from a short story. Choose the correctly punctuated version.",
    options: [
      ["\"Don't touch that wire!\" shouted Mr Dube. \"It's still live.\"", "Correct: each spoken part is enclosed in speech marks, the exclamation mark is inside, and the contractions have apostrophes."],
      ["\"Don't touch that wire\"! shouted Mr Dube. \"It's still live.\"", "The exclamation mark belongs to the spoken words and goes inside the speech marks."],
      ["\"Dont touch that wire!\" shouted Mr Dube. \"Its still live.\"", "Don't and It's need apostrophes for the missing letters."],
      ["\"Don't touch that wire!\" Shouted Mr Dube. \"It's still live\".", "Shouted continues the sentence (small s), and the full stop goes inside the speech marks."],
    ],
    answer: "A",
    hints: ["Check where the ! and the final full stop are placed.", "Check the apostrophes in the shortened forms."],
    explanation: "Direct speech: speech marks around the exact words; the speaker's punctuation inside the closing marks; a small letter for the reporting verb when the sentence continues; a new sentence of speech starts with new speech marks and a capital.",
  });
  b.fib({
    d: 3, examStyle: true,
    stem: "The sentence comes from a newspaper report. Choose the correctly punctuated word for each gap.",
    template: "The three {{blank:a}} hats blew off when {{blank:b}} kombi swerved to avoid a pothole, because {{blank:c}} roof rack had come loose.",
    blanks: [
      { id: "a", accepted: ["women's"], normalise: ["trim"], choices: ["women's", "womens'", "womens", "womans'"] },
      { id: "b", accepted: ["Mr Banda's"], normalise: ["trim"], choices: ["Mr Banda's", "Mr Bandas'", "Mr Bandas", "Mr Banda'"] },
      { id: "c", accepted: ["its"], normalise: ["trim"], choices: ["its", "it's", "its'", "it is"] },
    ],
    hints: ["*Women* is already plural.", "*It's* always means *it is* or *it has*."],
    explanation: "**women's** (irregular plural + 's); **Mr Banda's** (one owner: add 's to the name); **its** (possessive pronoun, no apostrophe).",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", examStyle: true, marks: 3,
    stem: "Rewrite the sentence with the correct punctuation and capital letters.\n\n*mrs ndlovu said that she would bring the following things sugar bread and milk*",
    points: [
      "Capital letters for *Mrs* and *Ndlovu*.",
      "A colon after *things* to introduce the list.",
      "A comma between *sugar* and *bread*, and a full stop at the end (no question mark or speech marks, because this is reported speech).",
    ],
    modelAnswer: "Mrs Ndlovu said that she would bring the following things: sugar, bread and milk.",
    hints: ["This is reported speech, so no speech marks are needed.", "A complete clause introduces the list."],
    explanation: "*Mrs Ndlovu said that she would bring the following things: sugar, bread and milk.* Capitals for the title and name; a colon after the complete clause to introduce the list; commas between list items; a full stop to end.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 3,
    stem: "Rewrite the sentence in **direct speech**, punctuating it correctly.\n\n*The headmaster told the pupils that they could go home early because the borehole pump had broken.*",
    points: [
      "Encloses only the headmaster's actual words in speech marks.",
      "Places the comma (or full stop) inside the closing speech marks and uses a capital letter at the start of the spoken words.",
      "Changes the pronoun and tense correctly: *they could* → *You can / You may*, and *had broken* → *has broken*.",
    ],
    modelAnswer: "\"You may go home early because the borehole pump has broken,\" the headmaster told the pupils.",
    hints: ["What were the headmaster's exact words to the pupils?", "Reported *they could* becomes *You can* or *You may* when he speaks to them directly."],
    explanation: "*\"You may go home early because the borehole pump has broken,\" the headmaster told the pupils.* Direct speech uses the speaker's own words, tense and pronouns, inside speech marks, with the comma before the closing mark.",
  });
  b.manualShort({
    d: 3, skill: "CREATION", marks: 2,
    stem: "Write **one** sentence about a school event that uses a **semicolon** correctly to join two closely related ideas.",
    points: [
      "Both parts of the sentence are main clauses that could each stand alone as a sentence.",
      "The two ideas are closely related, and there is no conjunction (and, but, so) after the semicolon.",
    ],
    modelAnswer: "The sports day was postponed; the field was still flooded after the storm.",
    hints: ["Test each half: is it a full sentence on its own?"],
    explanation: "A semicolon works like a 'soft full stop' between two linked main clauses: *The hall was packed; parents stood at the back.*",
  });

  b.card("FACT", "Uses of capital letters", "The start of a sentence; names of people, places, days, months, organisations, languages and titles; the pronoun I; the first word inside speech marks.", "Mrs Moyo, Kwekwe, Monday, March, ZIMSEC, Shona.");
  b.card("CONCEPT", "Apostrophe of possession", "One owner: 's (the girl's bag). Plural owner ending in s: ' (the girls' bags). Plural not ending in s: 's (the children's books).", "Time expressions too: a day's work, two weeks' time.");
  b.card("CONCEPT", "Apostrophe of omission", "Shows missing letters: don't (do not), it's (it is), I'm (I am), they're (they are).", "Never in plurals (tomatoes) or possessive pronouns (its, hers, ours).");
  b.card("FACT", "Its or it's?", "it's = it is / it has; its = belonging to it.", "It's late; the dog is in its kennel.");
  b.card("DEFINITION", "Semicolon", "Joins two closely related main clauses without a conjunction, and separates long list items that contain commas.", "The rains were late; the farmers were worried.");
  b.card("DEFINITION", "Colon", "Follows a complete clause to introduce a list, an explanation or a quotation.", "Bring the following: a hoe, a bucket and a hat.");
  b.card("CONCEPT", "Punctuating direct speech", "Speech marks around the exact words; the speaker's punctuation inside the closing mark; a comma before the closing mark if the sentence continues; a new line for each new speaker.", "\"Where are you going?\" asked the teacher.");
  b.card("FACT", "Commas", "Separate list items, mark off the person addressed, follow an introductory clause, and enclose extra (non-defining) information.", "Let's eat, Gogo. When the bell rang, we left. My brother, who lives in Bulawayo, is a teacher.");
  b.card("FACT", "Dashes, brackets and hyphens", "Dash: a sudden break or added comment. Brackets: removable extra information. Hyphen: joins compound words (well-known, twenty-one).", undefined);
  b.card("FACT", "Question marks", "Only for direct questions. Indirect questions end with a full stop.", "She asked me where I lived.");
});
