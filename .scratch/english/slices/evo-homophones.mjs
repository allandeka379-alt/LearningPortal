// Slice EVO: homophones, homographs and confusable words.
import { concept } from "../lib.mjs";

concept("eng.vocabulary.homophones", { file: "vocabulary/homophones", keyPrefix: "vocabulary.homophones" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Choose the correct word.\n\n*The learners left ___ bags outside the laboratory.*",
    options: [
      ["their", "Correct: their means belonging to them."],
      ["there", "There refers to a place or begins there is / there are."],
      ["they're", "They're means they are: 'left they are bags' makes no sense."],
      ["theirs", "Theirs is used without a noun after it: the bags are theirs."],
    ],
    answer: "A",
    explanation: "**their** = belonging to them; **there** = a place; **they're** = they are.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Choose the correct word.\n\n*The school celebrated ___ fiftieth anniversary in May.*",
    options: [
      ["its", "Correct: its is the possessive form (belonging to it) and has no apostrophe."],
      ["it's", "It's means it is or it has: 'celebrated it is anniversary' makes no sense."],
      ["its'", "There is no such form."],
      ["it", "It is not possessive; you need a word meaning belonging to it."],
    ],
    answer: "A",
    explanation: "Test by replacing the word with *it is*. If the sentence makes no sense, write **its** (possessive, no apostrophe).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Choose the correct word.\n\n*The shop near the post office sells envelopes, pens and other ___.*",
    options: [
      ["stationery", "Correct: stationery (with e, as in envelopes) means writing materials."],
      ["stationary", "Stationary means not moving, like a parked car."],
      ["stations", "Stations are places where buses or trains stop."],
      ["stationer", "A stationer is the person or shop that sells writing materials, not the goods themselves."],
    ],
    answer: "A",
    explanation: "station**e**ry = writing materials (**e** for **e**nvelopes); station**a**ry = not moving (**a** for p**a**rked).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word.\n\n*The heavy rains will ___ the start of the cricket match.*",
    options: [
      ["affect", "Correct: the gap needs a verb after will, and affect is the verb meaning to have an influence on."],
      ["effect", "Effect is usually a noun (a result), so it does not fit after will here."],
      ["affection", "Affection means love or fondness."],
      ["effective", "Effective is an adjective meaning successful."],
    ],
    answer: "A",
    explanation: "**affect** is usually the verb (A for Action); **effect** is usually the noun (the result): *The rain affected the match; the effect was a late start.*",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Choose the correct word.\n\n*Our captain ___ the team to victory in last year's final.*",
    options: [
      ["led", "Correct: led is the past tense of the verb lead."],
      ["lead", "Lead is the present tense (or the metal); last year needs the past tense."],
      ["leaded", "Lead is an irregular verb; there is no form leaded in this sense."],
      ["leads", "Leads is present tense; the sentence is about last year."],
    ],
    answer: "A",
    explanation: "lead (present) → **led** (past). Many writers wrongly write *lead* because the metal *lead* is pronounced like *led*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word.\n\n*The ___ of the college welcomed the new students.*",
    options: [
      ["principal", "Correct: principal means the head of a college or school."],
      ["principle", "A principle is a rule or a belief, not a person."],
      ["principally", "Principally is an adverb meaning mainly."],
      ["principles", "Principles is the plural of principle (rules or beliefs)."],
    ],
    answer: "A",
    explanation: "princip**al** = the head of a school or college, or *main*; princip**le** = a rule or belief (both end in *-le*).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which sentence is correct?",
    options: [
      ["My shoelace is loose, so I might trip.", "Correct: loose means not tight."],
      ["My shoelace is lose, so I might trip.", "Lose is a verb meaning misplace or fail to win."],
      ["My shoelace is lost, so I might trip.", "Lost means missing; a lost lace could not make you trip."],
      ["My shoelace is loss, so I might trip.", "Loss is a noun (the act of losing)."],
    ],
    answer: "A",
    explanation: "**loose** (rhymes with *goose*) = not tight; **lose** (rhymes with *choose*) = misplace or fail to win.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Choose the sentence that uses British English spelling correctly.",
    options: [
      ["You must practise every evening before the music exam.", "Correct: practise with s is the verb."],
      ["You must practice every evening before the music exam.", "In British English practice with c is the noun; after must you need the verb."],
      ["Football practise starts at four o'clock on Tuesdays.", "Here a noun is needed, so it should be practice."],
      ["She needs more practise before the music exam.", "After more you need the noun practice."],
    ],
    answer: "A",
    hints: ["Is the word in each sentence a noun or a verb?", "In British English, the c spelling is the noun."],
    explanation: "In British English **practice / licence / advice** are nouns and **practise / license / advise** are verbs.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "In which sentence does **wind** rhyme with *kind*?",
    options: [
      ["Remember to wind the clock before you go to bed.", "Correct: wind meaning to turn rhymes with kind."],
      ["The wind blew dust across the football pitch.", "Wind meaning moving air rhymes with pinned."],
      ["A cold wind swept down from the Chimanimani hills.", "This is moving air, which rhymes with pinned."],
      ["The farmers waited for the wind to drop.", "Again, the noun for moving air rhymes with pinned."],
    ],
    answer: "A",
    hints: ["Wind is a homograph: one spelling, two pronunciations.", "Which use is a verb?"],
    explanation: "**wind** (verb, to turn or wrap) rhymes with *kind*; **wind** (noun, moving air) rhymes with *pinned*.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Choose the correct word.\n\n*The red scarf ___ her school uniform perfectly.*",
    options: [
      ["complements", "Correct: complements means goes well with or completes."],
      ["compliments", "Compliments means praises; a scarf cannot praise a uniform."],
      ["completes", "Completes would mean finishes off the uniform, which is not the sense of going well with."],
      ["complains", "Complains means expresses dissatisfaction."],
    ],
    answer: "A",
    hints: ["Which word is spelt like complete?"],
    explanation: "compl**e**ment = goes well with, completes (like *complete*); compl**i**ment = praise (*I like your scarf* is a compl**i**ment).",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct word for each gap.",
    template: "We will go to Nyanga {{blank:a}} the weather is good, but everyone {{blank:b}} Chipo agreed to the plan.",
    blanks: [
      { id: "a", accepted: ["whether or not"], choices: ["whether or not", "weather or not", "wether or not"] },
      { id: "b", accepted: ["except"], choices: ["except", "accept", "expect", "excepted"] },
    ],
    explanation: "**whether** = if (introduces a choice); **weather** = rain and sun. **except** = not including; **accept** = receive or agree to.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct word for each gap.",
    template: "Please be {{blank:a}} in the library. The book is {{blank:b}} interesting.",
    blanks: [
      { id: "a", accepted: ["quiet"], choices: ["quiet", "quite", "quit", "quietly"] },
      { id: "b", accepted: ["quite"], choices: ["quite", "quiet", "quit", "quietly"] },
    ],
    explanation: "**quiet** (two syllables) = silent; **quite** (one syllable, rhymes with *kite*) = fairly or completely.",
  });
  b.fib({
    d: 3, examStyle: true,
    stem: "Choose the correct word in each gap of this notice.",
    template: "Learners who wish to join the debating club must hand {{blank:a}} forms to the {{blank:b}} by Friday. {{blank:c}} important that parents give their written consent. Learners will {{blank:d}} their chance to travel to Bulawayo if forms are late.",
    blanks: [
      { id: "a", accepted: ["their"], choices: ["their", "there", "they're"] },
      { id: "b", accepted: ["principal"], choices: ["principal", "principle", "principals'"] },
      { id: "c", accepted: ["It's"], choices: ["It's", "Its", "Its'"] },
      { id: "d", accepted: ["lose"], choices: ["lose", "loose", "loss"] },
    ],
    hints: ["Test the apostrophe words by expanding them.", "Which word names a person?"],
    explanation: "**their** forms (belonging to them); the **principal** (the head); **It's** important (= It is); **lose** their chance (fail to keep).",
  });
  b.short({
    d: 2,
    stem: "Write the correct word to complete the sentence. It sounds like *dessert*.\n\n*Camels are well suited to life in the ___.*",
    accepted: ["desert"],
    wrong: ["dessert", "dessart"],
    explanation: "**desert** (one *s*) = a dry, sandy region; **dessert** (two *s*'s, *sweet stuff*) = pudding.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "*Breath* is a noun and *breathe* is a verb.",
    answer: true,
    explanation: "True. *Take a deep **breath*** (noun); *Breathe slowly* (verb). The verb has a final *e* and a different vowel sound.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each word with its meaning.",
    pairs: [["council", "an elected group that runs a town"], ["counsel", "advice"], ["compliment", "an expression of praise"], ["complement", "something that completes or goes well with"], ["past", "an earlier time"]],
    extraRight: ["went by (past tense of pass)"],
    explanation: "council / counsel and compliment / complement are confusable pairs. *Past* is the noun for an earlier time; *passed* is the past tense of *pass*.",
  });
  b.manualShort({
    d: 3, skill: "CREATION", marks: 3,
    stem: "Write **three** sentences of your own: one using *there*, one using *their* and one using *they're* correctly.",
    points: [
      "Uses there correctly (a place, or there is / there are).",
      "Uses their correctly (belonging to them, before a noun).",
      "Uses they're correctly as a short form of they are.",
    ],
    modelAnswer: "There is a market near the bus rank. The twins forgot their lunch boxes. They're travelling to Kariba on Saturday.",
    hints: ["Check each one with a test: can you replace they're with they are?"],
    explanation: "*there* = place; *their* = belonging to them; *they're* = they are.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4, examStyle: true,
    stem: "The paragraph below contains **four** errors with confusable words. Write the four corrections.\n\n*Its been a difficult term. The drought has effected many families, and the price of mealie-meal has past five dollars a packet. Parents have been advised to keep there children in school.*",
    points: [
      "Its → It's (it has).",
      "effected → affected (verb).",
      "past → passed (verb, went beyond).",
      "there → their (belonging to them).",
    ],
    modelAnswer: "It's been a difficult term. The drought has affected many families, and the price of mealie-meal has passed five dollars a packet. Parents have been advised to keep their children in school.",
    hints: ["Look for apostrophes, verbs and possessives.", "Advised is correct here: it is the verb."],
    explanation: "*It's* = it has; *affected* is the verb; *passed* is the verb (*past* is a noun, adjective or preposition); *their* = belonging to them.",
  });

  b.card("DEFINITION", "What are **homophones**?", "Words that sound the same but differ in spelling and meaning: there/their/they're, weather/whether.", undefined);
  b.card("DEFINITION", "What are **homographs**?", "Words spelt the same but different in meaning (and often sound): lead (guide) / lead (metal); tear (from the eye) / tear (rip).", undefined);
  b.card("FACT", "its vs it's", "its = belonging to it (no apostrophe); it's = it is / it has.", "Test: can you say it is? Then write it's.");
  b.card("FACT", "stationary vs stationery", "stationary = not moving (a for parked car); stationery = writing materials (e for envelopes).", undefined);
  b.card("FACT", "affect vs effect", "affect = verb (to influence); effect = noun (the result).", "The rain affected the match; the effect was a delay.");
  b.card("FACT", "principal vs principle", "principal = head of a college, or main; principle = a rule or belief.", undefined);
  b.card("FACT", "practice / practise (British English)", "practice, licence, advice = nouns; practise, license, advise = verbs.", "The c words are nouns, like ice.");
  b.card("FACT", "lose vs loose", "lose = misplace or fail to win (rhymes with choose); loose = not tight (rhymes with goose).", undefined);
  b.card("VOCABULARY", "lead vs led", "lead = present tense verb (to guide) or a metal; led = past tense of lead.", "She led the choir last year.");
});
