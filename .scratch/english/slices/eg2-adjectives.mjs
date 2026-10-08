// Slice EG2: adjectives.
import { concept } from "../lib.mjs";

concept("eng.grammar.adjectives", { file: "grammar/adjectives", keyPrefix: "grammar.adjectives" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which word in this sentence is an **adjective**?\n\n*Chipo wore a bright dress to her cousin's wedding.*",
    options: [
      ["bright", "Correct: bright describes the noun dress, so it is an adjective."],
      ["wore", "Wore is a verb: it tells us what Chipo did."],
      ["dress", "Dress is the noun being described, not the describing word."],
      ["wedding", "Wedding is a noun naming an event."],
    ],
    answer: "A",
    explanation: "An **adjective** describes or gives more information about a noun or pronoun: *a **bright** dress*, *the **old** bus*, *she is **tall***.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the comparative form of **good**?",
    options: [
      ["better", "Correct: good is irregular: good, better, best."],
      ["gooder", "Good is irregular and never takes -er."],
      ["more good", "Good has its own irregular comparative; more good is not standard."],
      ["best", "Best is the superlative (for three or more)."],
    ],
    answer: "A",
    explanation: "Irregular adjectives change the whole word: **good → better → best**, **bad → worse → worst**, **little → less → least**, **much/many → more → most**, **far → farther/further → farthest/furthest**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Choose the correct word.\n\n*Of all the girls in Form 4, Tariro is the ___ runner.*",
    options: [
      ["fastest", "Correct: of all the girls compares more than two, so the superlative is needed."],
      ["faster", "Faster is the comparative, used when comparing two (faster than)."],
      ["most fast", "Short adjectives such as fast add -est; they do not use most."],
      ["more faster", "This is a double comparative: never use more with an -er form."],
    ],
    answer: "A",
    explanation: "Use the **superlative** (*-est* or *most*) when one item is compared with all the others in a group of three or more: *the fastest runner of all*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word.\n\n*The film was so ___ that half the audience fell asleep.*",
    options: [
      ["boring", "Correct: the -ing adjective describes the thing that causes the feeling."],
      ["bored", "Bored describes how a person feels; the film did not feel bored."],
      ["bore", "Bore is a noun or verb, not the adjective needed here."],
      ["boredom", "Boredom is an abstract noun."],
    ],
    answer: "A",
    explanation: "**-ing** adjectives describe the cause (*a boring film*, *an exciting match*); **-ed** adjectives describe the person's feeling (*the bored audience*, *the excited fans*).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Choose the correct word.\n\n*The pupils were ___ when they heard that the trip to Great Zimbabwe had been cancelled.*",
    options: [
      ["disappointed", "Correct: the -ed form describes how the pupils felt."],
      ["disappointing", "The news was disappointing; the pupils themselves felt disappointed."],
      ["disappoint", "Disappoint is a verb."],
      ["disappointment", "Disappointment is a noun; after were you need an adjective here."],
    ],
    answer: "A",
    explanation: "People **feel** *disappointed, interested, tired, surprised*; the thing that causes the feeling is *disappointing, interesting, tiring, surprising*.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Choose the correct order of adjectives.\n\n*My grandmother keeps her pots on a ___ table.*",
    options: [
      ["beautiful old wooden", "Correct: opinion (beautiful), then age (old), then material (wooden)."],
      ["wooden old beautiful", "Material comes last, just before the noun, and opinion comes first."],
      ["old beautiful wooden", "Opinion adjectives such as beautiful come before factual ones such as old."],
      ["beautiful wooden old", "Age (old) comes before material (wooden)."],
    ],
    answer: "A",
    hints: ["Which adjective gives an opinion rather than a fact?", "The material is always closest to the noun."],
    explanation: "The usual order is **opinion – size – age – shape – colour – origin – material – purpose – noun**: *a beautiful old wooden table*.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Choose the phrase with the adjectives in the correct order.",
    options: [
      ["a lovely long red cotton scarf", "Correct: opinion, size, colour, material, then the noun."],
      ["a red lovely long cotton scarf", "Colour comes after opinion and size."],
      ["a lovely cotton long red scarf", "Material (cotton) must come just before the noun."],
      ["a long lovely red cotton scarf", "Opinion (lovely) comes before size (long)."],
    ],
    answer: "A",
    hints: ["Start with the adjective that is someone's opinion.", "Then size, then colour, then what it is made of."],
    explanation: "Opinion (*lovely*) → size (*long*) → colour (*red*) → material (*cotton*) → noun (*scarf*). Native speakers rarely stack more than three, but the order never changes.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which sentence is correct?",
    options: [
      ["The old radio in the kitchen is completely dead.", "Correct: dead is non-gradable, so it can take completely or absolutely but not very."],
      ["The old radio in the kitchen is very dead.", "Something cannot be more or less dead: very cannot go with a non-gradable adjective."],
      ["The old radio in the kitchen is slightly dead.", "Slightly grades the adjective, but dead has no degrees."],
      ["The old radio in the kitchen is fairly dead.", "Fairly grades the adjective; dead is either true or not."],
    ],
    answer: "A",
    hints: ["Can something be a little bit dead?"],
    explanation: "**Non-gradable** adjectives (*dead, unique, impossible, perfect, empty, finished*) describe an all-or-nothing state. They take *completely, totally, absolutely*, not *very, slightly, fairly* or *more*.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which sentence uses the comparative correctly?",
    options: [
      ["Rudo is cleverer than her brother.", "Correct: a single -er comparative followed by than."],
      ["Rudo is more cleverer than her brother.", "Double comparative: more and -er cannot both be used."],
      ["Rudo is cleverest than her brother.", "The superlative cannot be followed by than."],
      ["Rudo is the cleverer than her brother.", "The is not used before a comparative followed by than."],
    ],
    answer: "A",
    hints: ["Count how many times the comparison is marked in each sentence."],
    explanation: "Mark the comparison once: either *-er* (*cleverer, taller*) or *more* (*more careful*), never both. A comparative is followed by **than**.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct word for each gap.",
    template: "The road to the clinic is {{blank:a}} than the road to the school, but the road to the mine is the {{blank:b}} road in the district.",
    blanks: [
      { id: "a", accepted: ["worse"], choices: ["worse", "worst", "badder", "more bad"] },
      { id: "b", accepted: ["worst"], choices: ["worse", "worst", "baddest", "most bad"] },
    ],
    explanation: "*Bad* is irregular: **bad → worse → worst**. Use *worse than* for two things and *the worst* for one out of many.",
  });
  b.fib({
    d: 2,
    stem: "Write the adjective formed from the noun in brackets.",
    template: "Crossing the {{blank:a}} (danger) river at night was foolish, but the {{blank:b}} (beauty) sunset made the walk worthwhile.",
    blanks: [
      { id: "a", accepted: ["dangerous"], wrong: "danger" },
      { id: "b", accepted: ["beautiful"], wrong: "beautyful" },
    ],
    explanation: "Common adjective suffixes: **-ous** (danger → dangerous), **-ful** (beauty → beautiful: y changes to i), **-al** (nation → national), **-able** (comfort → comfortable), **-ish** (fool → foolish), **-ive** (act → active).",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Most one-syllable adjectives form the comparative by adding *-er*, as in *tall → taller*.",
    answer: true,
    explanation: "True. One-syllable adjectives add *-er/-est* (tall, taller, tallest). Most adjectives of three or more syllables use *more/most* (more beautiful, most beautiful).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In the sentence *The visitors were amazed by the falls*, the word *amazed* describes the falls.",
    answer: false,
    explanation: "False. *Amazed* (an -ed adjective) describes how the **visitors** felt. The falls were *amazing*.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each noun with the adjective formed from it.",
    pairs: [["fame", "famous"], ["comfort", "comfortable"], ["fool", "foolish"], ["nation", "national"], ["industry", "industrious"]],
    explanation: "Each adjective is made by adding a suffix: *-ous* (famous; note fame loses its e), *-able* (comfortable), *-ish* (foolish), *-al* (national), *-ious* (industry: y → i).",
  });
  b.short({
    d: 2,
    stem: "Write the correct comparative form of **far** to complete the sentence.\n\n*Bulawayo is ___ from Harare than Gweru is.*",
    accepted: ["farther", "further"],
    wrong: ["farer", "more far"],
    explanation: "*Far* is irregular: **farther** or **further** (both are correct for distance), and the superlatives are *farthest/furthest*.",
  });
  b.short({
    d: 2,
    stem: "Write the superlative form of **happy**.\n\n*Winning the scholarship was the ___ day of Tapiwa's life.*",
    accepted: ["happiest"],
    wrong: ["happyest", "most happy"],
    explanation: "Two-syllable adjectives ending in *-y* change *y* to *i* and add *-est*: happy → **happiest**, busy → busiest, easy → easiest.",
  });
  b.fib({
    d: 3, examStyle: true,
    stem: "The sentence below comes from a description of a market. Write the correct form of each adjective in brackets.",
    template: "Mbare Musika is always {{blank:a}} (busy) on Saturdays than on any other day, and the {{blank:b}} (noisy) corner of all is where the bus touts shout for passengers.",
    blanks: [
      { id: "a", accepted: ["busier"], wrong: "busyer" },
      { id: "b", accepted: ["noisiest"], wrong: "noisyest" },
    ],
    hints: ["The word *than* shows a comparison between two things.", "*Of all* shows a comparison with the whole group."],
    explanation: "**busier** (comparative, because of *than*) and **noisiest** (superlative, because of *of all*). In both, *-y* after a consonant changes to *i*.",
  });
  b.short({
    d: 3, examStyle: true,
    stem: "Rewrite the sentence, beginning with the words given. Do not change the meaning.\n\n*No other girl in the netball team is as tall as Nyasha.*\n\nBegin: **Nyasha is taller ...**",
    accepted: [
      "Nyasha is taller than any other girl in the netball team.",
      "Nyasha is taller than all the other girls in the netball team.",
      "Nyasha is taller than every other girl in the netball team.",
      "Nyasha is taller than all the other girls in the team.",
      "Nyasha is taller than any other girl in the team.",
    ],
    patterns: ["^nyasha is taller than (any other girl|every other girl|all the other girls|all of the other girls|the other girls) in (the|her) (netball )?team$"],
    wrong: ["Nyasha is taller than any girl in the netball team.", "Nyasha is the tallest girl in the netball team."],
    hints: ["After a comparative you need *than*.", "Nyasha is a member of the team, so she cannot be taller than *any girl* in it: she must be taller than the *other* girls."],
    explanation: "*Nyasha is taller than any **other** girl (or all the other girls) in the netball team.* Leaving out *other* is illogical, because Nyasha would be taller than herself. Rewriting with *the tallest* does not follow the words given.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: "Read the sentence from a story and choose the word that best fills the gap.\n\n*After the long walk from the bus stop in the midday heat, the ___ visitors sank gratefully onto the benches under the mango tree.*",
    options: [
      ["exhausted", "Correct: the -ed adjective describes how the visitors felt."],
      ["exhausting", "The walk was exhausting; the visitors felt exhausted."],
      ["exhaust", "Exhaust is a verb or a noun (a car's exhaust)."],
      ["exhaustion", "Exhaustion is a noun; an adjective is needed before visitors."],
    ],
    answer: "A",
    hints: ["Is the word describing the cause of the tiredness or the people who feel it?"],
    explanation: "The visitors **felt** tired, so use the *-ed* adjective: *the **exhausted** visitors*. The walk that caused it was *exhausting*.",
  });
  b.manualShort({
    d: 3, skill: "CREATION", examStyle: true, marks: 2,
    stem: "Join the three sentences into **one** sentence, using the adjectives before the noun *hut* and putting them in the correct order. Do not use *and* or *which*.\n\n*Gogo lives in a hut. The hut is round. It is small. It is thatched.*",
    points: [
      "Uses all three adjectives (small, round, thatched) in one sentence beginning *Gogo lives in a ...*",
      "Puts the adjectives in the order size – shape – material/type: *a small round thatched hut* (commas between small and round are acceptable).",
    ],
    modelAnswer: "Gogo lives in a small round thatched hut.",
    hints: ["Size comes before shape.", "*Thatched* says what the roof is made of, so it goes nearest to *hut*."],
    explanation: "**Gogo lives in a small round thatched hut.** Size (*small*) → shape (*round*) → material/type (*thatched*) → noun.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 2,
    stem: "The sentence below has **two** adjective errors. Rewrite it correctly.\n\n*It was the most hottest day of the year, and the children were very boring in the classroom.*",
    points: [
      "Corrects the double superlative to *the hottest day*.",
      "Changes *boring* to *bored*, because it describes how the children felt.",
    ],
    modelAnswer: "It was the hottest day of the year, and the children were very bored in the classroom.",
    hints: ["Look for a superlative that is marked twice.", "Did the children cause the feeling, or feel it?"],
    explanation: "*the most hottest* → **the hottest** (one superlative marker only); *the children were boring* → **bored** (their feeling).",
  });

  b.card("DEFINITION", "What is an **adjective**?", "A word that describes a noun or pronoun, giving more information about it.", "a **tall** tree; the road is **dusty**; she seems **happy**.");
  b.card("FACT", "Forming comparatives and superlatives", "One syllable: add -er/-est (tall, taller, tallest). Two syllables ending in -y: -ier/-iest (busy, busier, busiest). Longer adjectives: more/most (more careful, most careful).", "Never combine them: not 'more taller' or 'most hottest'.");
  b.card("FACT", "Irregular comparatives", "good, better, best; bad, worse, worst; little, less, least; much/many, more, most; far, farther/further, farthest/furthest.", undefined);
  b.card("CONCEPT", "-ed and -ing adjectives", "-ing describes the thing that causes a feeling (a boring lesson); -ed describes how a person feels (bored pupils).", "interesting/interested, tiring/tired, surprising/surprised, frightening/frightened.");
  b.card("FACT", "Order of adjectives", "Opinion – size – age – shape – colour – origin – material – purpose – noun.", "a lovely small old round red Zimbabwean clay cooking pot (normally use no more than three).");
  b.card("DEFINITION", "Non-gradable adjective", "An adjective that describes an all-or-nothing state, so it cannot be made stronger or weaker with very or more.", "dead, unique, impossible, perfect, empty: use completely or absolutely, not very.");
  b.card("VOCABULARY", "Adjective suffixes", "-ful (careful), -less (careless), -ous (dangerous), -al (national), -able/-ible (comfortable, sensible), -ive (active), -ish (foolish), -y (dusty).", undefined);
  b.card("CONCEPT", "Comparing with as ... as", "Use as + adjective + as for equality: Tendai is as tall as his father. The negative is not as/so ... as.", "This exercise is not as difficult as the last one.");
  b.card("FACT", "Comparing one with the rest of its group", "Say taller than any other girl in the team, not taller than any girl in the team, when the person is part of that group.", undefined);
});
