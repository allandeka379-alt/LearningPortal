// Slice EG2: prepositions.
import { concept } from "../lib.mjs";

concept("eng.grammar.prepositions", { file: "grammar/prepositions", keyPrefix: "grammar.prepositions" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Choose the correct preposition.\n\n*The final examinations start ___ Monday.*",
    options: [
      ["on", "Correct: days and dates take on."],
      ["in", "In is used for months, years and seasons, not days."],
      ["at", "At is used for clock times, not days."],
      ["for", "For is used for a length of time (for two weeks)."],
    ],
    answer: "A",
    explanation: "Time prepositions: **at** + clock time (*at 9 a.m.*), **on** + day or date (*on Monday, on 18 April*), **in** + month, year, season or part of the day (*in June, in 2009, in the morning*).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Choose the correct preposition.\n\n*My grandmother was born ___ 1958.*",
    options: [
      ["in", "Correct: years take in."],
      ["on", "On is used for days and dates."],
      ["at", "At is used for exact times."],
      ["since", "Since needs a present perfect verb (has lived since 1958)."],
    ],
    answer: "A",
    explanation: "Use **in** with years, months and seasons: *in 1958, in December, in the rainy season*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Choose the correct preposition.\n\n*The prize-giving ceremony will begin ___ ten o'clock.*",
    options: [
      ["at", "Correct: clock times take at."],
      ["on", "On is used for days and dates."],
      ["in", "In is used for months, years and parts of the day."],
      ["during", "During is used with a period of time, not an exact time."],
    ],
    answer: "A",
    explanation: "Exact times take **at**: *at ten o'clock, at noon, at midnight, at sunrise*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct preposition.\n\n*The goats jumped ___ the fence and ran into the maize field.*",
    options: [
      ["over", "Correct: over shows movement from one side to the other above something."],
      ["at", "At shows a position or a target, not movement across."],
      ["among", "Among means surrounded by three or more things."],
      ["since", "Since is a preposition of time, not movement."],
    ],
    answer: "A",
    explanation: "Prepositions of movement: **over** (from one side to the other, above), **across** (from one side to the other, on a surface), **through** (inside, from one end to the other), **into** (from outside to inside), **along**, **past**, **towards**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Choose the correct preposition.\n\n*Tatenda is very interested ___ becoming a doctor.*",
    options: [
      ["in", "Correct: the fixed expression is interested in."],
      ["on", "Interested is never followed by on."],
      ["at", "Interested is never followed by at."],
      ["for", "Interested is never followed by for."],
    ],
    answer: "A",
    explanation: "Many adjectives have a fixed preposition: *interested **in**, good **at**, proud **of**, afraid **of**, keen **on**, responsible **for***. Learn them as pairs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct preposition.\n\n*My new school uniform is similar ___ the one I wore at primary school.*",
    options: [
      ["to", "Correct: the fixed expression is similar to."],
      ["with", "Similar is not followed by with."],
      ["from", "From goes with different, not similar."],
      ["as", "As goes with the same (the same as), not similar."],
    ],
    answer: "A",
    explanation: "Fixed pairs: *similar **to***, *the same **as***, *different **from***, *married **to***, *related **to***.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Choose the correct word.\n\n*Mai Chiedza has been in hospital ___ Tuesday.*",
    options: [
      ["since", "Correct: since + the point in time when something began, with the present perfect."],
      ["for", "For + a length of time (for three days), not a starting point."],
      ["during", "During + a period (during the holiday), not a starting point."],
      ["ago", "Ago follows a length of time (three days ago) and goes with the past simple."],
    ],
    answer: "A",
    hints: ["Is *Tuesday* a starting point or a length of time?"],
    explanation: "With the present perfect, use **since** + starting point (*since Tuesday, since 2020*) and **for** + length of time (*for three days, for a year*).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Choose the correct word.\n\n*Nobody in the village could sleep because it thundered loudly ___ the night.*",
    options: [
      ["during", "Correct: during + a noun naming a period of time."],
      ["while", "While is a conjunction and needs a clause (while we slept)."],
      ["since", "Since gives a starting point and goes with the perfect tense."],
      ["ago", "Ago comes after a length of time, not before a noun."],
    ],
    answer: "A",
    hints: ["Is the missing word followed by a noun or by a whole clause?"],
    explanation: "**During** is a preposition and is followed by a noun (*during the night, during the match*). **While** is a conjunction and is followed by a clause (*while we were sleeping*).",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct word for each gap.",
    template: "{{blank:a}} English, Farai speaks Shona, Ndebele and Tonga. At the meeting he sat {{blank:b}} his father.",
    blanks: [
      { id: "a", accepted: ["Besides"], choices: ["Besides", "Beside", "Between", "Except"] },
      { id: "b", accepted: ["beside"], choices: ["beside", "besides", "among", "except"] },
    ],
    explanation: "**Besides** = in addition to (*Besides English, he speaks Shona*). **Beside** = next to (*He sat beside his father*). *Except* would mean the opposite: not including.",
  });
  b.fib({
    d: 2,
    stem: "Write the preposition that completes each fixed expression.",
    template: "The police accused the man {{blank:a}} stealing a bicycle. Many families depend {{blank:b}} farming. Rudo is very good {{blank:c}} mathematics.",
    blanks: [
      { id: "a", accepted: ["of"], wrong: "for" },
      { id: "b", accepted: ["on", "upon"], wrong: "of" },
      { id: "c", accepted: ["at"], wrong: "in" },
    ],
    explanation: "*accuse someone **of*** something; *depend **on*** (or the formal *upon*); *good **at*** a subject or skill.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each verb with the preposition that follows it.",
    pairs: [["rely", "on"], ["accuse (someone)", "of"], ["apologise to someone", "for"], ["prevent (someone)", "from"], ["object", "to"]],
    explanation: "*rely **on***, *accuse someone **of***, *apologise to someone **for*** something, *prevent someone **from*** doing something, *object **to*** something.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The sentence *The committee discussed about the problem of litter* is correct.",
    answer: false,
    explanation: "False. *Discuss* takes a direct object with no preposition: *The committee **discussed the problem**.* (The noun takes *about*: *a discussion **about** litter*.)",
  });
  b.short({
    d: 2,
    stem: "Write the missing preposition.\n\n*Chido was absent ___ school for a week because of malaria.*",
    accepted: ["from"],
    wrong: ["in", "at"],
    explanation: "The fixed expression is *absent **from***: *absent from school, absent from work*.",
  });
  b.short({
    d: 3,
    stem: "Write the missing preposition.\n\n*After years of practice, the team finally succeeded ___ winning the national cup.*",
    accepted: ["in"],
    wrong: ["to", "on"],
    hints: ["The preposition is followed by the -ing form *winning*."],
    explanation: "*succeed **in** doing something*. Compare *manage **to** do something*. Learn verbs with their prepositions.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which sentence is correct?",
    options: [
      ["I am looking forward to meeting you at the reunion.", "Correct: in look forward to, to is a preposition, so it is followed by the -ing form."],
      ["I am looking forward to meet you at the reunion.", "To here is a preposition, not part of an infinitive, so meet must become meeting."],
      ["I am looking forward for meeting you at the reunion.", "The fixed phrase is look forward to, not for."],
      ["I am looking forward at meeting you at the reunion.", "The fixed phrase is look forward to, not at."],
    ],
    answer: "A",
    hints: ["After a preposition, a verb takes the -ing form."],
    explanation: "A verb after a preposition takes the **-ing form**. In *look forward **to***, *object **to*** and *be used **to***, *to* is a preposition: *look forward to **meeting** you*.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Choose the expression that best completes the sentence.\n\n*The football match was postponed ___ the waterlogged pitch.*",
    options: [
      ["on account of", "Correct: on account of means because of, which gives the reason."],
      ["in spite of", "In spite of shows contrast, but the pitch is the reason, not an obstacle overcome."],
      ["instead of", "Instead of means in place of, which makes no sense here."],
      ["in case of", "In case of refers to a possible future event (in case of fire)."],
    ],
    answer: "A",
    hints: ["Is the waterlogged pitch the reason for the postponement or something that did not stop it?"],
    explanation: "Compound prepositions: **on account of / because of / owing to** (reason); **in spite of / despite** (contrast); **instead of** (replacement); **in case of** (a possible event).",
  });
  b.short({
    d: 3, examStyle: true,
    stem: "Rewrite the sentence, beginning with the words given. Do not change the meaning.\n\n*Although it rained heavily, the farmers' show went ahead.*\n\nBegin: **In spite of ...**",
    accepted: ["In spite of the heavy rain, the farmers' show went ahead."],
    patterns: ["^in spite of (the heavy rain|the heavy rains|heavy rain|it raining heavily|its raining heavily|the fact that it rained heavily) the farmers show went ahead$"],
    wrong: ["In spite of it rained heavily, the farmers' show went ahead.", "In spite of the heavy rain, but the farmers' show went ahead."],
    hints: ["*In spite of* is a preposition, so it must be followed by a noun phrase or an -ing form, not a clause.", "Turn *it rained heavily* into a noun phrase."],
    explanation: "***In spite of the heavy rain**, the farmers' show went ahead.* *In spite of* (like *despite*) is followed by a noun, an -ing form or *the fact that* + clause. Never follow it with a bare clause, and do not add *but*.",
  });
  b.fib({
    d: 3, examStyle: true,
    stem: "The sentence comes from a pupil's account of a journey. Write the correct preposition in each gap.",
    template: "Our bus arrived {{blank:a}} the Mutare bus terminus {{blank:b}} midnight {{blank:c}} Sunday, so we slept {{blank:d}} the waiting room until dawn.",
    blanks: [
      { id: "a", accepted: ["at"], wrong: "in" },
      { id: "b", accepted: ["at"], wrong: "on" },
      { id: "c", accepted: ["on"], wrong: "in" },
      { id: "d", accepted: ["in", "inside"], wrong: "on" },
    ],
    hints: ["A bus terminus is a point on a journey; a waiting room is an enclosed space.", "Check the rules for clock times and days."],
    explanation: "*arrive **at*** a building or station (but *arrive **in*** a town or country); ***at** midnight* (exact time); ***on** Sunday* (day); ***in** the waiting room* (inside an enclosed space).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: "Read the sentence from a formal letter and choose the word that best fills the gap.\n\n*I am writing to complain ___ the loud music that is played every evening at the bar next to our school.*",
    options: [
      ["about", "Correct: you complain to a person about a problem."],
      ["for", "Complain is not followed by for."],
      ["on", "Complain is not followed by on."],
      ["against", "Complain is not followed by against in standard English; use about."],
    ],
    answer: "A",
    hints: ["You complain *to* a person and ___ a problem."],
    explanation: "*complain **to** someone **about** something*. A useful pattern for letters of complaint.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", examStyle: true, marks: 2,
    stem: "The sentence below contains **two** errors in the use of prepositions. Rewrite it correctly.\n\n*After the meeting, the prefects discussed about the clean-up campaign and then they went to home.*",
    points: [
      "Removes *about* after *discussed*: *discussed the clean-up campaign*.",
      "Removes *to* before *home*: *went home*.",
    ],
    modelAnswer: "After the meeting, the prefects discussed the clean-up campaign and then they went home.",
    hints: ["Which verb takes a direct object without a preposition?", "Which place word never takes *to* after *go*?"],
    explanation: "*Discuss* takes a direct object (*discussed the campaign*). *Home* used as an adverb takes no preposition after verbs of movement (*go home, come home*).",
  });

  b.card("DEFINITION", "What is a **preposition**?", "A word that shows the relationship of a noun or pronoun to another word, especially in time, place or movement.", "on Monday, under the tree, into the room, with my friend.");
  b.card("FACT", "At, on, in for time", "at + clock time (at 9 a.m.); on + day or date (on Friday, on 25 May); in + month, year, season, part of the day (in June, in 2010, in the morning).", "Exception: at night, at the weekend.");
  b.card("FACT", "At, on, in for place", "at a point (at the bus stop, at school); on a surface or line (on the table, on the Harare road); in an enclosed space or area (in the room, in Bulawayo).", undefined);
  b.card("CONCEPT", "Since, for and during", "since + starting point (since Tuesday); for + length of time (for three days); during + a period named by a noun (during the holiday).", "While is a conjunction: while we were sleeping.");
  b.card("FACT", "Adjective + preposition pairs", "interested in, good at, proud of, afraid of, keen on, similar to, different from, absent from, responsible for.", undefined);
  b.card("FACT", "Verb + preposition pairs", "rely on, depend on, accuse someone of, apologise for, prevent from, succeed in, object to, insist on, congratulate on.", undefined);
  b.card("FACT", "Verbs that take NO preposition", "discuss (the plan), enter (the room), reach (Harare), go home, attend (a meeting), resemble (her mother).", "Not 'discuss about', 'enter into the room', 'reach at'.");
  b.card("CONCEPT", "Prepositions + -ing", "A verb after a preposition takes the -ing form: interested in becoming, look forward to meeting, succeed in winning.", undefined);
  b.card("VOCABULARY", "Compound prepositions", "because of, on account of, owing to (reason); in spite of, despite (contrast); instead of; in front of; in case of; by means of.", "In spite of the rain (not 'in spite of it rained').");
});
