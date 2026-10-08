// Slice EG2: articles and determiners.
import { concept } from "../lib.mjs";

concept("eng.grammar.articles-determiners", { file: "grammar/articles-determiners", keyPrefix: "grammar.articles-determiners" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Choose the correct word.\n\n*It took Rufaro ___ hour to walk from the village to the clinic.*",
    options: [
      ["an", "Correct: hour begins with a vowel sound (the h is silent), so an is used."],
      ["a", "A is used before a consonant sound; hour is pronounced 'our'."],
      ["many", "Many goes with plural nouns; hour is singular."],
      ["much", "Much goes with uncountable nouns; hour is countable."],
    ],
    answer: "A",
    explanation: "The choice between *a* and *an* depends on the **sound**, not the letter: ***an** hour*, ***an** honest man* (silent h), but ***a** horse* (h is sounded).",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "We write *an university* because *university* begins with a vowel letter.",
    answer: false,
    explanation: "False. *University* begins with a 'yoo' sound, which is a consonant sound, so we write ***a** university* (also *a uniform*, *a European*, *a one-way street*).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Choose the correct word.\n\n*___ sun rises in the east and sets in the west.*",
    options: [
      ["The", "Correct: there is only one sun, so it takes the definite article."],
      ["A", "A suggests one of many suns; there is only one."],
      ["An", "An is used before vowel sounds, and in any case the sun is unique."],
      ["Some", "Some is used with plural or uncountable nouns."],
    ],
    answer: "A",
    explanation: "Use **the** with things that are unique: *the sun, the moon, the sky, the earth, the President, the equator*.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which sentence is correct?",
    options: [
      ["Water is essential for all living things.", "Correct: when we speak about water in general, no article is used."],
      ["A water is essential for all living things.", "Water is uncountable, so it cannot take a."],
      ["The waters is essential for all living things.", "Water in general has no article, and waters would need a plural verb."],
      ["Some water are essential for all living things.", "Water is uncountable and takes a singular verb."],
    ],
    answer: "A",
    explanation: "Uncountable and plural nouns used in a **general** sense take **no article**: *Water is essential. Cattle need grass. Education opens doors.* Use *the* for a particular case: *The water in this borehole is salty.*",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Choose the correct word.\n\n*How ___ pupils are there in your class?*",
    options: [
      ["many", "Correct: pupils is a plural countable noun, so how many is used."],
      ["much", "Much goes with uncountable nouns (how much water)."],
      ["more", "How more is not standard English."],
      ["lot", "Lot is used in a lot of, and cannot follow how."],
    ],
    answer: "A",
    explanation: "**Many** + plural countable nouns (*many pupils, many books*); **much** + uncountable nouns (*much water, much time*).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word.\n\n*Fortunately, I had ___ friends who helped me carry the furniture.*",
    options: [
      ["a few", "Correct: a few means a small number, but enough; it is positive, which fits fortunately."],
      ["few", "Few means hardly any, which is negative and clashes with fortunately."],
      ["a little", "A little goes with uncountable nouns; friends is countable."],
      ["little", "Little goes with uncountable nouns and is negative in meaning."],
    ],
    answer: "A",
    explanation: "**a few / a little** = some (positive). **few / little** = hardly any (negative). *Few* and *a few* go with countable nouns; *little* and *a little* with uncountable nouns.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Choose the correct word.\n\n*There was ___ hope of finding the lost goats after the storm, so the herd boys sadly gave up the search.*",
    options: [
      ["little", "Correct: hope is uncountable, and little (hardly any) fits the negative meaning."],
      ["a little", "A little is positive (some hope); the boys gave up, so the meaning is negative."],
      ["few", "Few goes with countable nouns; hope here is uncountable."],
      ["a few", "A few goes with countable nouns and is positive."],
    ],
    answer: "A",
    hints: ["Is hope countable or uncountable here?", "Did they have some hope or hardly any?"],
    explanation: "*Hope* is uncountable, so choose between *little* and *a little*. Because they **gave up**, the meaning is negative: ***little** hope* (hardly any).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word.\n\n*___ of the two candidates gave a short speech to the school.*",
    options: [
      ["Each", "Correct: each can refer to every one of two or more, and is followed by of."],
      ["Every", "Every cannot be followed by of, and is not used for just two."],
      ["All", "All is used for three or more, and would need a plural verb idea."],
      ["Much", "Much goes with uncountable nouns."],
    ],
    answer: "A",
    explanation: "**Each** can refer to two or more and can be followed by *of*: *each of the two candidates*. **Every** is used for three or more and is never followed directly by *of* (*every one of them*, not *every of them*).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Choose the correct verb.\n\n*Neither road ___ to Masvingo; you must go back to the junction.*",
    options: [
      ["leads", "Correct: neither + singular noun takes a singular verb."],
      ["lead", "Neither road means not this road and not that road: one at a time, so the verb is singular."],
      ["are leading", "Are is plural; neither road is singular."],
      ["were leading", "Were is plural, and the past tense does not fit 'you must go back'."],
    ],
    answer: "A",
    hints: ["Is *road* singular or plural here?"],
    explanation: "**Either** and **neither** are followed by a **singular** noun and a singular verb: *Neither road **leads** there. Either answer **is** acceptable.*",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct word for each gap.",
    template: "Before the trip we needed {{blank:a}} information about the weather, so I bought {{blank:b}} umbrella just in case.",
    blanks: [
      { id: "a", accepted: ["some"], choices: ["some", "many", "an", "a few"] },
      { id: "b", accepted: ["an"], choices: ["an", "a", "some", "much"] },
    ],
    explanation: "*Information* is uncountable, so it takes **some** (not *many*, *an* or *a few*). *Umbrella* starts with a vowel sound: **an** umbrella.",
  });
  b.fib({
    d: 3,
    stem: "Write **a** or **an** in each gap.",
    template: "Mr Ncube has {{blank:a}} MBA, works as {{blank:b}} European history lecturer and once owned {{blank:c}} one-eyed dog.",
    blanks: [
      { id: "a", accepted: ["an"], wrong: "a" },
      { id: "b", accepted: ["a"], wrong: "an" },
      { id: "c", accepted: ["a"], wrong: "an" },
    ],
    hints: ["Say each word aloud: is the first sound a vowel sound or a consonant sound?"],
    explanation: "*MBA* is said 'em-bee-ay', starting with a vowel sound: **an** MBA. *European* starts with 'yoo' and *one* with 'w', both consonant sounds: **a** European, **a** one-eyed dog.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each determiner with the kind of noun it goes with.",
    pairs: [
      ["much", "uncountable nouns, mostly in questions and negatives"],
      ["many", "plural countable nouns"],
      ["every", "singular countable nouns, for three or more"],
      ["either", "one of two (singular noun)"],
      ["a few", "a small but useful number of countable things"],
    ],
    explanation: "*Much water*, *many books*, *every pupil*, *either side*, *a few friends*. Determiners carry information about number, so they must agree with the noun.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "We normally put *the* before the names of countries, as in *the Zimbabwe* and *the Botswana*.",
    answer: false,
    explanation: "False. Most country names take no article: *Zimbabwe, Botswana, Kenya*. Use *the* only with plural or 'union' names: *the United Kingdom, the United States, the Netherlands, the Philippines*.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which sentence uses articles correctly?",
    options: [
      ["The Zambezi flows into the Indian Ocean.", "Correct: rivers and oceans take the."],
      ["Zambezi flows into the Indian Ocean.", "Names of rivers take the: the Zambezi."],
      ["The Zambezi flows into Indian Ocean.", "Names of oceans take the: the Indian Ocean."],
      ["A Zambezi flows into an Indian Ocean.", "A and an cannot be used with unique names."],
    ],
    answer: "A",
    hints: ["Rivers, oceans, seas and mountain ranges behave the same way."],
    explanation: "Use **the** with rivers (*the Zambezi, the Limpopo*), oceans and seas (*the Indian Ocean*), mountain ranges (*the Chimanimani Mountains*) and deserts (*the Kalahari*). Single mountains and lakes usually take no article: *Mount Nyangani, Lake Kariba*.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Choose the correct word.\n\n*We drove through the national park all morning but did not see ___ elephants.*",
    options: [
      ["any", "Correct: any is used in negative sentences."],
      ["no", "Did not ... no is a double negative."],
      ["much", "Much goes with uncountable nouns; elephants is plural."],
      ["a", "A is used with singular nouns; elephants is plural."],
    ],
    answer: "A",
    explanation: "Use **any** in negatives and most questions (*We did not see any elephants. Have you got any money?*) and **some** in positive statements (*We saw some elephants*).",
  });
  b.fib({
    d: 3, examStyle: true,
    stem: "The sentences come from a pupil's account of a school trip. Choose the correct word for each gap.",
    template: "Last term {{blank:a}} group of Form 4 pupils travelled to Kariba. We stood on {{blank:b}} dam wall and watched {{blank:c}} eagle circling high above {{blank:d}} water.",
    blanks: [
      { id: "a", accepted: ["a"], choices: ["a", "an", "much", "any"] },
      { id: "b", accepted: ["the"], choices: ["the", "an", "many", "much"] },
      { id: "c", accepted: ["an"], choices: ["an", "a", "much", "many"] },
      { id: "d", accepted: ["the"], choices: ["the", "a", "an", "many"] },
    ],
    hints: ["Is the noun mentioned for the first time, or is it a particular one that both writer and reader know?", "Check whether each noun begins with a vowel sound."],
    explanation: "**a** group (one group, first mention); **the** dam wall (the particular wall of the dam at Kariba); **an** eagle (first mention, vowel sound); **the** water (the particular water of the lake).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: "Read the sentence from a newspaper report and choose the word that best fills the gap.\n\n*Because of the heavy rain, ___ people attended this year's agricultural show than last year.*",
    options: [
      ["fewer", "Correct: people is a plural countable noun, so the comparative is fewer."],
      ["less", "In formal writing less is used with uncountable nouns (less rain), not with people."],
      ["little", "Little goes with uncountable nouns and cannot be followed by than."],
      ["few", "Few is not a comparative; than needs a comparative form."],
    ],
    answer: "A",
    hints: ["Can you count people?", "The word *than* needs a comparative."],
    explanation: "**fewer** + plural countable nouns (*fewer people, fewer cars*); **less** + uncountable nouns (*less rain, less money*).",
  });
  b.short({
    d: 3, examStyle: true,
    stem: "Rewrite the sentence, beginning with the words given. Do not change the meaning.\n\n*The road through the forest is not safe at night, and the road along the river is not safe at night either.*\n\nBegin: **Neither road ...**",
    accepted: ["Neither road is safe at night."],
    patterns: ["^neither road is safe at night$"],
    wrong: ["Neither road are safe at night.", "Neither road is not safe at night."],
    hints: ["*Neither* already carries the negative meaning.", "*Neither* + singular noun takes a singular verb."],
    explanation: "***Neither road is safe at night.*** *Neither* means *not one and not the other*, so do not add *not*, and use the singular verb *is*.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", examStyle: true, marks: 2,
    stem: "The sentence below contains **two** errors in the use of articles. Rewrite it correctly.\n\n*An honest farmer from the Mutare gave an unique carving to the hospital.*",
    points: [
      "Removes *the* before the town name: *from Mutare*.",
      "Changes *an unique* to *a unique* (unique begins with a 'yoo' consonant sound).",
    ],
    modelAnswer: "An honest farmer from Mutare gave a unique carving to the hospital.",
    hints: ["Names of towns do not take an article.", "Say *unique* aloud: what is its first sound?"],
    explanation: "Towns and cities take no article (*from Mutare*). *Unique* begins with the consonant sound 'y', so it takes **a**. *An honest* is already correct because the *h* is silent.",
  });

  b.card("DEFINITION", "What is a **determiner**?", "A word placed before a noun to show which one, whose, or how many/how much.", "Articles (a, an, the), demonstratives (this, those), possessives (my, their), quantifiers (some, many, few, each).");
  b.card("FACT", "A or an?", "Decided by the first SOUND: an hour, an honest man, an MBA; a university, a European, a one-way street.", undefined);
  b.card("CONCEPT", "When to use the", "For something already mentioned or known to both speaker and listener, for unique things (the sun), and with rivers, oceans, mountain ranges and plural country names.", "the Zambezi, the Indian Ocean, the United Kingdom.");
  b.card("CONCEPT", "No article", "With plural and uncountable nouns used generally (Water is essential), with most countries, towns, single lakes and mountains, and with meals and sports.", "Zimbabwe, Mutare, Lake Kariba, Mount Nyangani; we had lunch; they play football.");
  b.card("FACT", "Much / many", "much + uncountable (much water); many + plural countable (many pupils).", "In positive statements, a lot of is more natural than much.");
  b.card("CONCEPT", "Few / a few, little / a little", "a few / a little = some (positive); few / little = hardly any (negative). Few goes with countable nouns, little with uncountable.", "I have a few friends (good). There was little hope (bad).");
  b.card("FACT", "Fewer or less?", "fewer + plural countable nouns (fewer people); less + uncountable nouns (less rain).", undefined);
  b.card("FACT", "Each, every, either, neither", "All take a singular noun and singular verb. Each can refer to two; every needs three or more and is never followed by of.", "Neither road leads there. Each of the two boys has a bag.");
  b.card("FACT", "Some and any", "some in positive statements and offers; any in negatives and most questions.", "We saw some lions. We did not see any elephants. Would you like some tea?");
});
