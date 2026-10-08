// Slice EVO: word formation (prefixes, suffixes, word families).
import { concept } from "../lib.mjs";

concept("eng.vocabulary.word-formation", { file: "vocabulary/word-formation", keyPrefix: "vocabulary.word-formation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which word contains a **prefix** meaning *again*?",
    options: [
      ["rebuild", "Correct: re- means again, so rebuild means build again."],
      ["builder", "-er is a suffix that names a person; it is not a prefix."],
      ["building", "-ing is a suffix, not a prefix."],
      ["overbuild", "Over- is a prefix, but it means too much, not again."],
    ],
    answer: "A",
    explanation: "A prefix is added to the beginning of a word. **re-** means *again* or *back*: rebuild, rewrite, repay, return.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Choose the correct opposite of **legal**.",
    options: [
      ["illegal", "Correct: il- is used before roots that begin with l."],
      ["unlegal", "There is no such word; un- is not used with legal."],
      ["inlegal", "In- changes to il- before l."],
      ["dislegal", "Dis- is not used with legal."],
    ],
    answer: "A",
    explanation: "The negative prefix *in-* changes its spelling to match the next letter: **il-** before *l* (illegal, illiterate), **ir-** before *r* (irregular), **im-** before *m* and *p* (immature, impossible).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Choose the correct word.\n\n*The ___ of the new bridge over the Save River took three years.*",
    options: [
      ["construction", "Correct: after The and before of, the gap needs a noun."],
      ["construct", "Construct is a verb; a noun is needed after The."],
      ["constructive", "Constructive is an adjective meaning helpful."],
      ["constructively", "Constructively is an adverb."],
    ],
    answer: "A",
    explanation: "A gap between *The* and *of* needs a **noun**. The suffix *-tion* forms nouns from verbs: construct → **construction**, inform → information.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word.\n\n*The nurse spoke ___ to the frightened child.*",
    options: [
      ["gently", "Correct: the gap describes how she spoke, so it needs an adverb."],
      ["gentle", "Gentle is an adjective; it cannot describe the verb spoke."],
      ["gentleness", "Gentleness is a noun."],
      ["gentler", "Gentler is the comparative adjective."],
    ],
    answer: "A",
    explanation: "Words that describe **how** an action is done are adverbs. *Gentle* ends in *-le*, so the adverb drops the *e* and adds *-y*: **gently** (like simple → simply).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In which word does the suffix show that the word names a **person who receives** an action?",
    options: [
      ["employee", "Correct: -ee names the person to whom something is done (the person who is employed)."],
      ["employer", "-er names the person who does the action: the employer employs others."],
      ["employment", "-ment forms a noun naming the state or activity, not a person."],
      ["employable", "-able forms an adjective meaning able to be employed."],
    ],
    answer: "A",
    explanation: "**-er / -or** name the person who acts (employer, examiner); **-ee** names the person who receives the action (employee, examinee, trainee).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which word is spelt correctly?",
    options: [
      ["happiness", "Correct: the y of happy changes to i before the suffix -ness."],
      ["happyness", "When a word ends in consonant + y, the y changes to i before most suffixes."],
      ["happines", "The suffix -ness keeps both s letters."],
      ["hapiness", "The double p of happy is kept."],
    ],
    answer: "A",
    explanation: "happy + -ness = **happiness**: final *y* after a consonant becomes *i* (also happily, beautiful, busily).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Choose the correct word.\n\n*Although Tendai had trained for months, his performance in the final was ___.*",
    options: [
      ["disappointing", "Correct: although signals a contrast, so the result was bad; disappointing describes the performance."],
      ["disappointed", "Disappointed describes how a person feels, not a performance."],
      ["disappointment", "Disappointment is a noun; after was the sentence needs an adjective here."],
      ["appointing", "Appointing comes from appoint (to give someone a job) and makes no sense here."],
    ],
    answer: "A",
    hints: ["Although tells you the result was not what you would expect.", "Which adjective describes a thing that causes a feeling, rather than the person who feels it?"],
    explanation: "Adjectives ending in **-ing** describe what causes a feeling (*a disappointing performance*); adjectives ending in **-ed** describe how a person feels (*Tendai was disappointed*).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which sentence uses the word in bold correctly?",
    options: [
      ["The council planted jacarandas to **beautify** the main road.", "Correct: beautify is a verb meaning to make beautiful, and the gap after to needs a verb."],
      ["The council planted jacarandas for the **beautify** of the road.", "After the and before of you need the noun beauty."],
      ["The jacarandas made the main road look **beautify**.", "After look you need the adjective beautiful."],
      ["The jacarandas flowered **beautify** along the main road.", "To describe how they flowered you need the adverb beautifully."],
    ],
    answer: "A",
    hints: ["What word class does the suffix -ify make?"],
    explanation: "The suffix **-ify** makes verbs (beautify, simplify, purify). The family is beauty (noun), beautify (verb), beautiful (adjective), beautifully (adverb).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Choose the word that correctly completes the sentence.\n\n*The judges found his excuse completely ___ and ignored it.*",
    options: [
      ["unbelievable", "Correct: the judges ignored the excuse, so it was not believable; un- + believe + -able (silent e dropped)."],
      ["believable", "The judges ignored it, so the meaning must be negative."],
      ["unbelieving", "Unbelieving describes a person who does not believe, not an excuse."],
      ["disbelief", "Disbelief is a noun; after completely you need an adjective."],
    ],
    answer: "A",
    hints: ["Did the judges accept the excuse?", "You need an adjective with a negative prefix."],
    explanation: "Read for meaning as well as word class. *Ignored it* tells you the excuse was **not** believable, so add the prefix *un-*: **unbelievable**.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct form of the word.",
    template: "Farmers in Masvingo are hoping for {{blank:a}} rain this season after last year's drought.",
    blanks: [{ id: "a", accepted: ["sufficient"], choices: ["sufficient", "sufficiency", "sufficiently", "suffice"] }],
    explanation: "Before the noun *rain* you need an **adjective**: *sufficient rain*. *Sufficiency* is a noun, *sufficiently* an adverb and *suffice* a verb.",
  });
  b.fib({
    d: 2,
    stem: "Write the correct form of each word in brackets.",
    template: "The {{blank:a}} (lazy) of some members slowed the project, but the others worked {{blank:b}} (energy) to finish it.",
    blanks: [
      { id: "a", accepted: ["laziness"], wrong: "lazyness" },
      { id: "b", accepted: ["energetically"], wrong: "energetic" },
    ],
    explanation: "After *The* and before *of* you need a noun: lazy → **laziness** (y → i). To say *how* they worked you need an adverb: energy → energetic → **energetically** (adjectives ending in -ic add -ally).",
  });
  b.fib({
    d: 3, examStyle: true,
    stem: "Write the correct form of each word in brackets to complete the passage.",
    template: "Mr Moyo is well known for his {{blank:a}} (generous). Last year he {{blank:b}} (wide) the road to the clinic at his own cost, and the villagers were deeply {{blank:c}} (appreciate). Sadly, his offer to build a library was found {{blank:d}} (accept) by the council because of a planning dispute.",
    blanks: [
      { id: "a", accepted: ["generosity"], wrong: "generousness" },
      { id: "b", accepted: ["widened"], wrong: "wided" },
      { id: "c", accepted: ["appreciative"], wrong: "appreciated" },
      { id: "d", accepted: ["unacceptable"], wrong: "accepted" },
    ],
    hints: ["After *his* you need a noun; after *he* and before *the road* you need a past-tense verb.", "*Sadly* and *a planning dispute* tell you the last word has a negative meaning."],
    explanation: "**generosity** (noun after *his*); **widened** (verb formed with *-en*, past tense); **appreciative** (adjective: the villagers felt grateful); **unacceptable** (adjective; *sadly* signals that the council rejected the offer).",
  });
  b.short({
    d: 2, skill: "UNDERSTANDING",
    stem: "Write the noun formed from the adjective **strong** to complete the sentence.\n\n*It took great ___ to lift the bags of maize onto the lorry.*",
    accepted: ["strength"],
    wrong: ["strongness", "strong"],
    explanation: "strong → **strength**. Some nouns change the root instead of adding a common suffix: long → length, wide → width, deep → depth.",
  });
  b.short({
    d: 3,
    stem: "Write the noun formed from the verb **pronounce** to complete the sentence.\n\n*Her ___ of the new words was perfect.*",
    accepted: ["pronunciation"],
    wrong: ["pronounciation", "pronouncement"],
    hints: ["The noun changes the spelling of the middle of the word.", "The *o* of *-noun-* disappears."],
    explanation: "pronounce → **pronunciation** (no *o* after the first *n*). *Pronouncement* exists but means an official statement, which does not fit *her … of the new words*.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Adding a prefix usually changes the word class of a word (for example from adjective to noun).",
    answer: false,
    explanation: "False. A prefix usually changes the **meaning** (happy → unhappy, both adjectives). It is the **suffix** that usually changes the word class (happy → happiness).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each prefix with its meaning.",
    pairs: [["mis-", "wrongly"], ["pre-", "before"], ["inter-", "between"], ["sub-", "under"], ["anti-", "against"]],
    explanation: "mis- (misunderstand), pre- (prepaid), inter- (international), sub- (subway), anti- (antiseptic).",
  });
  b.manualShort({
    d: 3, skill: "CREATION", marks: 4,
    stem: "Use the root **decide** to write **four** words of different word classes (a noun, a verb, an adjective and an adverb) and use each one correctly in a short sentence of your own.",
    points: [
      "Gives the verb (decide) in a correct sentence.",
      "Gives the noun (decision, or indecision) in a correct sentence.",
      "Gives an adjective (decisive or indecisive) in a correct sentence.",
      "Gives an adverb (decisively or indecisively) in a correct sentence.",
    ],
    modelAnswer: "We must decide today. The decision was announced on Friday. The captain was decisive under pressure. She acted decisively when the fire started.",
    hints: ["Start with the suffixes -sion, -ive and -ly."],
    explanation: "The *decide* family: decide (verb), decision (noun), decisive / indecisive (adjectives), decisively (adverb).",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3, examStyle: true,
    stem: "Each sentence contains one wrong word form. Rewrite each sentence correctly.\n\n1. *The team played very confident in the second half.*\n2. *We were impressed by the cleanly of the hospital wards.*\n3. *The new rules are not applicable to students who are absent through illness, which is very fairness.*",
    points: [
      "1: changes confident to the adverb confidently.",
      "2: changes cleanly to the noun cleanliness.",
      "3: changes fairness to the adjective fair.",
    ],
    modelAnswer: "1. The team played very confidently in the second half. 2. We were impressed by the cleanliness of the hospital wards. 3. The new rules are not applicable to students who are absent through illness, which is very fair.",
    hints: ["Decide which word class each position needs before correcting it."],
    explanation: "1 describes how they played (adverb); 2 follows *the* and comes before *of* (noun: clean → cleanliness); 3 follows *very* and describes the rule (adjective).",
  });

  b.card("DEFINITION", "What is a **prefix**?", "Letters added to the beginning of a word to change its meaning, e.g. un-happy, re-write, mis-spell.", "A prefix does not usually change the word class.");
  b.card("DEFINITION", "What is a **suffix**?", "Letters added to the end of a word, usually to change its word class, e.g. kind → kindness, care → careful.", undefined);
  b.card("FACT", "Choosing in-, im-, il- or ir-", "im- before m and p (immature, impossible); il- before l (illegal); ir- before r (irregular); in- elsewhere (incorrect).", "Un- and dis- are separate prefixes that must be learnt word by word.");
  b.card("CONCEPT", "Noun suffixes", "-ness, -ment, -tion/-sion, -ity, -ance/-ence, -hood, -ship, -er/-or, -ee, -ist.", "kindness, payment, decision, ability, childhood, friendship.");
  b.card("CONCEPT", "Adjective suffixes", "-ful, -less, -able/-ible, -ous, -ive, -al, -ic, -y.", "careful, careless, reliable, famous, active, national, scientific, rainy.");
  b.card("CONCEPT", "Verb suffixes", "-ise, -en, -ify, -ate: modernise, widen, simplify, activate.", undefined);
  b.card("FACT", "-er/-or vs -ee", "-er/-or = the person who does the action (employer); -ee = the person who receives it (employee).", "examiner/examinee, trainer/trainee.");
  b.card("FACT", "-ing vs -ed adjectives", "-ing describes what causes a feeling (a boring lesson); -ed describes how someone feels (bored pupils).", undefined);
  b.card("VOCABULARY", "Nouns that change the root", "strong → strength, long → length, deep → depth, proud → pride, pronounce → pronunciation, maintain → maintenance.", undefined);
});
