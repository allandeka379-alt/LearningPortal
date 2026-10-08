// Slice EG2: adverbs and adverbials.
import { concept } from "../lib.mjs";

concept("eng.grammar.adverbs", { file: "grammar/adverbs", keyPrefix: "grammar.adverbs" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which word in this sentence is an **adverb**?\n\n*The old man walked slowly to the borehole.*",
    options: [
      ["slowly", "Correct: slowly tells us how he walked, so it is an adverb of manner."],
      ["old", "Old describes the noun man: an adjective."],
      ["walked", "Walked is the verb that the adverb describes."],
      ["borehole", "Borehole is a noun."],
    ],
    answer: "A",
    explanation: "An **adverb** usually gives more information about a verb (how, when, where, how often), an adjective or another adverb: *walked **slowly***, ***very** old*, ***quite** quickly*.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the adverb formed from the adjective **careful**?",
    options: [
      ["carefully", "Correct: add -ly to careful; the double l is kept."],
      ["carefuly", "Careful ends in l and the suffix starts with l, so both are kept: carefully."],
      ["carefull", "There is no such word."],
      ["carefulness", "Carefulness is a noun."],
    ],
    answer: "A",
    explanation: "Most adverbs of manner add **-ly** to the adjective: careful → **carefully**, quick → quickly, sad → sadly. Adjectives ending in *-l* keep it and add *-ly*, so the word has *ll*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Choose the correct word.\n\n*Chiedza sang ___ at the prize-giving ceremony.*",
    options: [
      ["beautifully", "Correct: the word describes how she sang (a verb), so an adverb is needed."],
      ["beautiful", "Beautiful is an adjective; it cannot describe the verb sang."],
      ["beauty", "Beauty is a noun."],
      ["beautify", "Beautify is a verb meaning to make beautiful."],
    ],
    answer: "A",
    explanation: "Verbs are described by **adverbs**: *sang **beautifully***. Adjectives describe nouns: *a **beautiful** song*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word.\n\n*Our team played ___ in the final and won the trophy.*",
    options: [
      ["well", "Correct: well is the adverb of good."],
      ["good", "Good is an adjective (a good game); it cannot describe how they played."],
      ["goodly", "Goodly is an old word meaning large; it is not the adverb of good."],
      ["more good", "This is not a standard form."],
    ],
    answer: "A",
    explanation: "The adverb of *good* is **well**: *She is a good player; she plays well.* (*Well* can also be an adjective meaning healthy: *I feel well.*)",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word.\n\n*The farmers worked ___ all day to finish harvesting the maize before the rain came.*",
    options: [
      ["hard", "Correct: hard is both the adjective and the adverb meaning with great effort."],
      ["hardly", "Hardly means almost not, which gives the opposite meaning."],
      ["hardy", "Hardy is an adjective meaning tough and able to survive difficult conditions."],
      ["harder than", "Harder than needs something to compare with, which the sentence does not give."],
    ],
    answer: "A",
    explanation: "Some adverbs have the same form as the adjective: **hard, fast, late, early, straight**. Adding *-ly* can change the meaning completely: *hardly* = almost not; *lately* = recently.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which sentence has the adverb of frequency in the correct position?",
    options: [
      ["My brother is always late for assembly.", "Correct: adverbs of frequency go after the verb be."],
      ["My brother always is late for assembly.", "With the verb be, the frequency adverb comes after it: is always."],
      ["My brother is late always for assembly.", "Always should come between is and the complement late."],
      ["Always is my brother late for assembly.", "Starting with always and inverting the verb is not standard here."],
    ],
    answer: "A",
    explanation: "Adverbs of frequency (*always, usually, often, sometimes, never*) go **before the main verb** (*She often visits Gogo*) but **after the verb be** (*He is always late*).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which sentence is correct?",
    options: [
      ["He did not run fast enough to catch the bus.", "Correct: enough comes after the adverb or adjective it describes."],
      ["He did not run enough fast to catch the bus.", "Enough follows an adverb: fast enough."],
      ["He did not run enough fastly to catch the bus.", "Fast is already an adverb; fastly does not exist."],
      ["He did not run fastly enough to catch the bus.", "Fastly is not a word; the adverb is fast."],
    ],
    answer: "A",
    explanation: "*Enough* comes **after** an adjective or adverb (*fast enough, old enough*) but **before** a noun (*enough money*). The adverb of *fast* is *fast*.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Every word that ends in *-ly* is an adverb.",
    answer: false,
    explanation: "False. Some *-ly* words are adjectives: *friendly, lovely, lonely, elderly, costly, ugly*. You cannot say *She smiled friendly*; say *She smiled in a friendly way*.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which word is an **adjective**, not an adverb?",
    options: [
      ["friendly", "Correct: friendly describes a noun (a friendly nurse); it is an adjective despite its -ly ending."],
      ["quickly", "Quickly describes how something is done: an adverb."],
      ["softly", "Softly describes how something is done: an adverb."],
      ["happily", "Happily describes how something is done: an adverb."],
    ],
    answer: "A",
    hints: ["Try putting each word before a noun, such as *a ___ nurse*."],
    explanation: "Test the word: *a **friendly** nurse* works, so *friendly* is an adjective. *A quickly nurse* does not.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each adverb with the question it answers.",
    pairs: [["yesterday", "When? (time)"], ["outside", "Where? (place)"], ["patiently", "How? (manner)"], ["often", "How often? (frequency)"], ["extremely", "To what degree? (degree)"]],
    explanation: "Adverbs of **time** (yesterday, soon), **place** (outside, here), **manner** (patiently, well), **frequency** (often, never) and **degree** (extremely, quite, almost).",
  });
  b.short({
    d: 2,
    stem: "Write the adverb formed from **gentle**.\n\n*The nurse lifted the baby ___ onto the scale.*",
    accepted: ["gently"],
    wrong: ["gentlely", "gentle"],
    explanation: "Adjectives ending in consonant + *-le* drop the *e* and add *-y*: gentle → **gently**, simple → simply, possible → possibly.",
  });
  b.short({
    d: 2,
    stem: "Write the adverb formed from **angry**.\n\n*The driver shouted ___ at the goats blocking the road.*",
    accepted: ["angrily"],
    wrong: ["angryly", "angry"],
    explanation: "Adjectives ending in consonant + *-y* change *y* to *i*: angry → **angrily**, happy → happily, busy → busily.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What does **hardly** mean in this sentence?\n\n*The hall was so noisy that I could hardly hear the speaker.*",
    options: [
      ["almost not", "Correct: hardly means only just, or almost not."],
      ["with great effort and force", "That is the meaning of hard, not hardly."],
      ["very clearly indeed", "This is the opposite of the meaning."],
      ["in a rough, harsh voice", "Hardly does not describe a voice."],
    ],
    answer: "A",
    hints: ["The hall was noisy. Was it easy to hear?"],
    explanation: "**Hardly** (like *scarcely* and *barely*) means *almost not*. It already has a negative meaning, so never add *not*: *I could hardly hear*, not *I could not hardly hear*.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "What kind of adverbial clause is in bold?\n\n*We stayed in the classroom during break **because the rain was too heavy**.*",
    options: [
      ["reason", "Correct: it tells us why we stayed in, and it begins with because."],
      ["time", "A clause of time answers when (when, after, before, until)."],
      ["place", "A clause of place answers where (where, wherever)."],
      ["condition", "A clause of condition begins with if or unless."],
    ],
    answer: "A",
    hints: ["Which question does the clause answer: when, where, why or on what condition?"],
    explanation: "Adverbial clauses work like adverbs. Clauses of **reason** answer *why* and begin with *because, as, since*. Others: time (*when, after, until*), place (*where*), condition (*if, unless*), concession (*although*), purpose (*so that*).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "What kind of adverbial clause is in bold?\n\n***Unless you leave now**, you will miss the last kombi to Chitungwiza.*",
    options: [
      ["condition", "Correct: unless means if not, so it states a condition."],
      ["time", "The clause does not say when; it says what must happen to avoid missing the kombi."],
      ["reason", "A reason clause explains why something happened (because, since)."],
      ["concession", "A concession clause begins with although or even though."],
    ],
    answer: "A",
    hints: ["Replace *unless* with *if ... not*."],
    explanation: "*Unless you leave now* = *If you do not leave now*: an adverbial clause of **condition**.",
  });
  b.fib({
    d: 3,
    stem: "Write the correct form of the adverb in brackets.",
    template: "Farai ran {{blank:a}} (fast) than Tino, but Chipo ran the {{blank:b}} (fast) of all. Tino, however, answered the questions {{blank:c}} (careful) than either of them.",
    blanks: [
      { id: "a", accepted: ["faster"], wrong: "more fast" },
      { id: "b", accepted: ["fastest"], wrong: "faster" },
      { id: "c", accepted: ["more carefully"], wrong: "carefuller" },
    ],
    hints: ["*Than* shows a comparison of two; *of all* shows a superlative.", "Adverbs ending in -ly use *more*."],
    explanation: "One-word adverbs like *fast, hard, late* take **-er/-est** (faster, fastest). Adverbs ending in *-ly* use **more/most** (*more carefully*).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: "Read the sentence from a story and choose the word that best fills the gap.\n\n*The child was trembling after the dog chased her, so the nurse spoke ___ to her while she cleaned the scratch on her knee.*",
    options: [
      ["gently", "Correct: an adverb is needed to describe how the nurse spoke."],
      ["gentle", "Gentle is an adjective and cannot describe the verb spoke."],
      ["gentlely", "Adjectives ending in -le drop the e: gently."],
      ["gentleness", "Gentleness is a noun; it would need with before it."],
    ],
    answer: "A",
    hints: ["The missing word describes the verb *spoke*."],
    explanation: "*spoke **gently*** (adverb describing the verb). *Gentle* is the adjective (*a gentle voice*); *gentleness* is the noun (*spoke with gentleness*).",
  });
  b.short({
    d: 3, examStyle: true,
    stem: "Rewrite the sentence, beginning with the word given. Do not change the meaning.\n\n*I have never seen such a beautiful sunset over Lake Kariba.*\n\nBegin: **Never ...**",
    accepted: ["Never have I seen such a beautiful sunset over Lake Kariba.", "Never before have I seen such a beautiful sunset over Lake Kariba."],
    patterns: ["^never (before )?have i (ever )?seen such a beautiful sunset over lake kariba$"],
    wrong: ["Never I have seen such a beautiful sunset over Lake Kariba.", "Never had I seen such a beautiful sunset over Lake Kariba."],
    hints: ["When a negative adverb such as *never* begins the sentence, the subject and helping verb change places, as in a question."],
    explanation: "A negative adverb at the start causes **inversion**: *Never **have I** seen ...* (like the question form *have I*). Keep the tense: *have seen*, not *had seen*.",
  });
  b.short({
    d: 4, examStyle: true,
    stem: "Rewrite the sentence, beginning with the words given. Do not change the meaning.\n\n*The bus left as soon as we reached the stop.*\n\nBegin: **Hardly had we ...**",
    accepted: ["Hardly had we reached the stop when the bus left."],
    patterns: ["^hardly had we reached the (bus )?stop (when|before) the bus left$"],
    wrong: ["Hardly had we reached the stop than the bus left.", "Hardly had we reached the stop, the bus left."],
    hints: ["After *Hardly had we* you need the past participle of *reach*.", "*Hardly* pairs with *when* (or *before*), never with *than*."],
    explanation: "***Hardly had we reached** the stop **when** the bus left.* *Hardly/Scarcely ... when* (or *before*) shows that one action followed immediately after another; *No sooner ... than* is the pair that uses *than*.",
  });
  b.short({
    d: 3, examStyle: true,
    stem: "Join the two sentences into one, beginning with the words given and using **so ... that**.\n\n*The rain was very heavy. The football match was postponed.*\n\nBegin: **The rain was so ...**",
    accepted: ["The rain was so heavy that the football match was postponed."],
    patterns: ["^the rain was so heavy that the (football )?match was postponed$"],
    wrong: ["The rain was so heavy the football match was postponed because of it.", "The rain was so very heavy that the football match was postponed."],
    hints: ["*So* goes directly before the adjective; *very* is no longer needed."],
    explanation: "*The rain was **so heavy that** the football match was postponed.* The clause after *that* is an adverbial clause of **result**; drop *very*, because *so* now does its job.",
  });
  b.manualShort({
    d: 3, skill: "CREATION", marks: 2,
    stem: "Expand the sentence *The choir sang.* by adding **one adverb of manner** and **one adverbial phrase of place or time**. Write your new sentence.",
    points: [
      "Adds a correctly formed adverb of manner that describes how the choir sang (for example *joyfully, softly, confidently*).",
      "Adds an adverbial phrase of place or time (for example *in the school hall*, *on Heroes Day*).",
    ],
    modelAnswer: "The choir sang joyfully in the packed school hall on Speech Day.",
    hints: ["Ask yourself: how did they sing, and where or when?"],
    explanation: "Adverbials answer *how, where, when, how often* and *why*. A phrase such as *in the school hall* or *after lunch* works as an adverb even though it contains a noun.",
  });

  b.card("DEFINITION", "What is an **adverb**?", "A word that tells us more about a verb, an adjective or another adverb: how, when, where, how often or to what degree.", "ran **quickly**; **very** tall; **quite** slowly.");
  b.card("FACT", "Forming adverbs with -ly", "Add -ly (quick → quickly); -y → -ily (happy → happily); -le → -ly (gentle → gently); -ic → -ically (basic → basically).", "Exception: true → truly.");
  b.card("FACT", "Adverbs with the same form as adjectives", "hard, fast, late, early, straight, high, far.", "hardly (= almost not) and lately (= recently) have different meanings.");
  b.card("FACT", "The adverb of good", "well: She is a good singer; she sings well.", "'She sings good' is incorrect in standard English.");
  b.card("CONCEPT", "Kinds of adverbs", "Manner (how), time (when), place (where), frequency (how often), degree (how much), reason (why).", "carefully, tomorrow, outside, often, extremely, therefore.");
  b.card("FACT", "Position of frequency adverbs", "Before the main verb (She often visits Gogo) but after be (He is always late) and after the first helping verb (I have never seen it).", undefined);
  b.card("CONCEPT", "Inversion after negative adverbs", "When never, seldom, hardly, rarely or no sooner begins a sentence, the helping verb comes before the subject.", "Never have I seen ...; Hardly had we arrived when ...; No sooner had she left than ...");
  b.card("DEFINITION", "Adverbial clause", "A subordinate clause that works like an adverb, showing time, place, reason, condition, concession, purpose or result.", "when the bell rang; because it rained; unless you hurry; although she was tired.");
  b.card("FACT", "-ly adjectives", "friendly, lovely, lonely, elderly, costly, ugly, silly are adjectives, not adverbs.", "Say 'in a friendly way', not 'friendly' after a verb.");
});
