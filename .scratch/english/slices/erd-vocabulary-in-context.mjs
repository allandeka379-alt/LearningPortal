// Slice ERD: reading skills — meanings of words and phrases in context.
import { concept, P } from "../lib.mjs";

const ext = (text) => `Read the sentence(s) and answer the question.\n\n> ${text}`;

const DAM = `Read the article and answer the questions.

**The dam that a village built**

**[1]** For years the people of Chivi ward 9 watched the summer rains rush past them. The water raced down the granite hills, tore away the topsoil and vanished into the river within hours, leaving the fields as dry as before. Each October the women walked further to find water, and each year the cattle grew thinner.

**[2]** The turning point came at a meeting under the big baobab near the school. Mr Elias Shoko, a retired builder, proposed that the village construct a small earth dam across the gully below the hills. Some elders were sceptical. They had heard grand promises before, and they doubted that a village with no machines could move so much soil. But Mr Shoko was persistent. He returned to every meeting with drawings, a list of tools and the same patient question: "If not us, then who?"

**[3]** Work began in the dry season. Every household sent one person for two days a week. They dug with picks and shovels, carried soil in wheelbarrows and dishes, and packed it down layer by layer with their feet and with heavy logs. The task was gruelling; by the end of each day people's hands were blistered and their backs ached. Yet the singing never stopped, and children brought water and roasted groundnuts to the workers.

**[4]** When the first rains arrived the following November, the whole village gathered to watch. Slowly the water collected behind the wall instead of escaping to the river. Within a month the dam held enough to water a vegetable garden of thirty beds and to supply the cattle through most of the dry season.

**[5]** Today, visitors from neighbouring wards come to see the dam and ask how it was done. Mr Shoko always gives the same modest answer: he only drew the pictures; the village did the rest.`;

concept("eng.reading.vocabulary-in-context", { file: "reading/vocabulary-in-context", keyPrefix: "reading.vocabulary-in-context" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "When a question asks for the meaning of a word **as used in the passage**, what must your answer give?",
    options: [
      ["The meaning that fits that particular sentence", "Correct: many words have several meanings; only the one that fits the context scores."],
      ["The first meaning listed in a dictionary", "The first dictionary meaning may not fit the passage."],
      ["Every possible meaning of the word", "Listing several meanings usually earns nothing."],
      ["The word spelt out in Shona or Ndebele", "Answers must be in English and explain the meaning."],
    ],
    answer: "A",
    explanation: "*As used in the passage* means: choose the meaning that fits **this** context. A word such as *bank*, *check* or *cool* changes meaning from sentence to sentence.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: ext("*Unlike her **garrulous** sister, who chatted all the way to Masvingo, Chiedza hardly said a word.*") + "\n\nWhat does **garrulous** mean here?",
    options: [
      ["very talkative", "Correct: the contrast with *hardly said a word* and *chatted all the way* shows this."],
      ["very quiet", "This describes Chiedza, the contrasting person, not her sister."],
      ["easily angered", "Nothing in the sentence refers to anger."],
      ["badly behaved", "Behaviour is not mentioned; only talking is."],
    ],
    answer: "A",
    explanation: "**Contrast clue**: *Unlike* tells you the sister is the opposite of Chiedza, who *hardly said a word*. So garrulous = very talkative.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: ext("*The village was **parched** — the soil cracked, the river bed dry and dusty.*") + "\n\nWhat does **parched** mean?",
    options: [
      ["extremely dry", "Correct: the dash introduces cracked soil and a dry river bed."],
      ["very crowded", "Nothing in the description refers to people."],
      ["recently flooded", "The description is the opposite of flooding."],
      ["far from town", "Distance is not mentioned."],
    ],
    answer: "A",
    explanation: "**Restatement clue**: the words after the dash explain *parched*: cracked soil, a dry river bed.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: ext("*The new rule was meant to **check** the spread of litter in the school grounds.*") + "\n\nWhat does **check** mean in this sentence?",
    options: [
      ["limit or control", "Correct: a rule can limit the spread of something."],
      ["examine carefully", "This is another meaning of check, but a rule does not examine litter."],
      ["tick as correct", "This meaning applies to answers, not to litter."],
      ["pay a bill", "This is the American meaning of check (a cheque or bill), which does not fit."],
    ],
    answer: "A",
    explanation: "*Check* has several meanings. Here the subject is a **rule** and the object is **the spread**, so the fitting meaning is *limit* or *control*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: ext("*After walking for six hours without water, the hikers were **famished**, and they finished the whole pot of sadza in minutes.*") + "\n\nWhat does **famished** mean?",
    options: [
      ["extremely hungry", "Correct: they ate a whole pot of sadza in minutes."],
      ["extremely tired", "They were probably tired too, but eating the pot points to hunger."],
      ["very excited", "Nothing suggests excitement."],
      ["badly lost", "Nothing suggests they were lost."],
    ],
    answer: "A",
    explanation: "**Situation clue**: long walking and eating the *whole pot … in minutes* show the meaning *extremely hungry*.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: ext("*The guard remained **vigilant** all night, walking round the warehouse every half hour with his torch.*") + "\n\nWhich answer could **replace** vigilant in the sentence?",
    options: [
      ["watchful", "Correct: an adjective that fits *remained ___*."],
      ["watching", "This changes the grammar: remained watching is awkward and not the same meaning."],
      ["watchfulness", "This is a noun; vigilant is an adjective."],
      ["sleepy", "He walked round every half hour, the opposite of sleepy."],
    ],
    answer: "A",
    hints: ["What part of speech is *vigilant* after *remained*?", "Try each answer in the sentence."],
    explanation: "Use the **substitution test**: *The guard remained watchful all night* keeps the grammar and the meaning. The answer must match the part of speech (adjective).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: ext("*The noisy generator next door had become **a thorn in Mr Banda's side**.*") + "\n\nWhat does the phrase mean?",
    options: [
      ["a constant source of annoyance to him", "Correct: the idiom describes a continuing irritation."],
      ["a dangerous injury he had suffered", "This is a literal reading; the phrase is figurative."],
      ["a valuable possession he relied on", "The generator is noisy and next door; it is not his treasure."],
      ["a secret he kept from his neighbours", "Nothing in the sentence suggests a secret."],
    ],
    answer: "A",
    hints: ["Is the phrase meant literally?"],
    explanation: "Explain figurative phrases by their **plain meaning in context**: a noisy generator that keeps disturbing someone is a constant irritation.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the word closest in meaning to the word in bold, as used in the sentence.",
    template: "*The headmaster was **adamant**: no matter how the prefects pleaded, he would not change his decision.* Adamant means {{blank:a}}.",
    blanks: [{ id: "a", accepted: ["unyielding"], choices: ["unyielding", "uncertain", "unfriendly", "unaware"] }],
    explanation: "The clue *would not change his decision* restates the idea: **adamant** = unyielding, refusing to change one's mind.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Choose the meaning that fits each sentence.",
    template: "*The fishermen pulled their boat onto the **bank**.* Here bank means {{blank:a}}. *The crowd grew **restive** as the speeches went on.* Here restive means {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["the side of a river"], choices: ["the side of a river", "a place for money", "a row of seats", "a heap of clouds"] },
      { id: "b", accepted: ["impatient and restless"], choices: ["impatient and restless", "calm and peaceful", "hungry and thirsty", "sleepy and slow"] },
    ],
    hints: ["Where would fishermen pull a boat?", "How do crowds behave when speeches go on and on?"],
    explanation: "Fishermen pull boats onto the **side of a river** (or lake). A crowd listening to long speeches grows **restless and impatient**: *restive*.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each type of context clue with an example of it.",
    pairs: [
      ["restatement", "The soil was arid — so dry nothing grew."],
      ["contrast", "Unlike his timid brother, Tapiwa was bold."],
      ["example", "She grew legumes such as beans and groundnuts."],
      ["synonym nearby", "He was frugal; he was careful with every cent."],
    ],
    explanation: "Restatement explains after a dash; contrast uses *unlike/but*; example lists instances (*such as*); a nearby synonym repeats the idea in other words.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "True or false: if a question asks for **one word** with the same meaning, your answer should be the same part of speech as the word in the passage.",
    answer: true,
    explanation: "True. Your word must be able to replace the original in the sentence, so a verb is replaced by a verb, an adjective by an adjective, and so on.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: ext("*Despite the drought, the farmer remained **sanguine**, telling everyone the rains would come soon.*") + "\n\nWhat does **sanguine** mean here?",
    options: [
      ["hopeful and confident", "Correct: he tells everyone the rains will come soon, in spite of the drought."],
      ["angry and bitter", "He says nothing bitter; he is encouraging others."],
      ["confused and lost", "He speaks with certainty, not confusion."],
      ["ill and weak", "Nothing suggests illness."],
    ],
    answer: "A",
    hints: ["*Despite* signals a contrast: he is the opposite of what you might expect in a drought."],
    explanation: "*Despite the drought* sets up a contrast, and *telling everyone the rains would come* shows optimism: **sanguine** = hopeful and confident.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION",
    stem: ext("*Rufaro's apology was so **perfunctory** that her friend did not believe a word of it: she said sorry without looking up from her phone.*") + "\n\nExplain what **perfunctory** means in this sentence, and give the clue that helped you.",
    marks: 2,
    points: [
      "Meaning: done without real care or interest / carelessly, just for the sake of it",
      "Clue: she apologised without looking up from her phone / the friend did not believe it",
    ],
    modelAnswer: "Careless and half-hearted: she said sorry without even looking up from her phone, so it did not seem sincere.",
    hints: ["How did she behave while apologising?"],
    explanation: "An apology made without looking up from a phone is done only as a formality, with no real feeling: that is **perfunctory**.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING", examStyle: true, secs: 1080,
    stem: DAM,
    parts: [
      P.short({
        label: "(a)",
        stem: "Find **one word** in paragraph 2 that means *doubtful; not easily convinced*.",
        accepted: ["sceptical"],
        wrong: ["persistent"],
        explanation: "*Some elders were sceptical. They had heard grand promises before, and they doubted…* The next sentence explains the word.",
      }),
      P.short({
        label: "(b)",
        stem: "Find **one word** in paragraph 2 that means *continuing firmly in spite of difficulty*.",
        accepted: ["persistent"],
        wrong: ["patient"],
        explanation: "*Mr Shoko was persistent. He returned to every meeting…* — returning again and again shows the meaning.",
      }),
      P.short({
        label: "(c)",
        stem: "Find **one word** in paragraph 3 that means *extremely tiring and demanding*.",
        accepted: ["gruelling", "grueling"],
        wrong: ["blistered"],
        explanation: "*The task was gruelling; by the end of each day people's hands were blistered and their backs ached.*",
      }),
      P.short({
        label: "(d)",
        stem: "Find **one word** in paragraph 5 that means *not boastful about one's own achievements*.",
        accepted: ["modest"],
        wrong: ["same"],
        explanation: "*the same modest answer: he only drew the pictures; the village did the rest* — he refuses to take the credit.",
      }),
      P.mcq({
        label: "(e)",
        stem: "In paragraph 1, the water *tore away the topsoil*. What does *tore away* suggest about the water?",
        options: [
          ["It removed the soil with great force", "Correct: tore suggests violent, forceful removal."],
          ["It soaked gently into the soil", "The water raced past; it did not soak in."],
          ["It carried seeds to new fields", "Seeds are not mentioned."],
          ["It was polluted by rubbish", "Pollution is not mentioned."],
        ],
        answer: "A",
        explanation: "*Tore* is a forceful verb: the run-off stripped the soil violently, which explains why the fields stayed poor.",
      }),
      P.mcq({
        label: "(f)",
        stem: "In paragraph 2, what does *the turning point* mean?",
        options: [
          ["the moment when things began to change", "Correct: after the meeting the village began to act."],
          ["the place where the river bends", "This is a literal reading; the phrase is figurative."],
          ["the time when the elders left", "The elders stayed and some doubted; they did not leave."],
          ["the corner of the school grounds", "The meeting was near the school, but that is not the meaning."],
        ],
        answer: "A",
        explanation: "A **turning point** is the moment when a situation starts to change direction.",
      }),
      P.manual({
        label: "(g)",
        marks: 2,
        stem: "Explain, in your own words, what the writer means by *grand promises* in paragraph 2.",
        points: [
          "Promises of big or impressive results",
          "That were not kept / that the elders did not believe would happen",
        ],
        modelAnswer: "Impressive plans that people had been told about before, which never came true.",
      }),
      P.manual({
        label: "(h)",
        marks: 2,
        stem: "In paragraph 3, *the singing never stopped*. What does this phrase suggest about the workers' spirit, despite the hard work?",
        points: [
          "They stayed cheerful / united / motivated",
          "Even though the work was painful and exhausting (blistered hands, aching backs)",
        ],
        modelAnswer: "The workers kept their spirits up and worked together happily, even though the work was exhausting and painful.",
      }),
      P.short({
        label: "(i)",
        stem: "Which word in paragraph 1 tells you that the water left very quickly? Give **one** word.",
        accepted: ["raced", "vanished", "rush"],
        model: "raced",
        wrong: ["dry"],
        explanation: "*Rush*, *raced* and *vanished … within hours* all show speed; *raced* is the clearest single word.",
      }),
    ],
    hints: ["Use the substitution test: your word must fit the sentence.", "Read the sentences before and after each word for clues."],
    explanation: "Each word is explained by its context: sceptical (they doubted), persistent (returned to every meeting), gruelling (blisters, aching backs), modest (refused credit).",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: ext("*The old bus groaned up the escarpment, its engine **wheezing** like an old man climbing stairs.*") + "\n\nWhat does **wheezing** suggest about the engine?",
    options: [
      ["It was straining and struggling to keep going", "Correct: wheezing is noisy, difficult breathing, compared to an old man climbing."],
      ["It was running smoothly and quietly", "The comparison with an old man climbing suggests struggle, not smoothness."],
      ["It was about to explode into flames", "Wheezing suggests strain, not explosion."],
      ["It was newly repaired and powerful", "The bus is *old* and *groaned*; nothing suggests new power."],
    ],
    answer: "A",
    hints: ["Think about how a person wheezes, and why."],
    explanation: "*Wheezing* describes noisy, difficult breathing. Applied to an engine (with the simile of an old man on stairs) it suggests the bus is **struggling** up the hill.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: ext("*His **scrutiny** of the receipt made the cashier nervous; he read every line twice and held it up to the light.*") + "\n\nWhich answer means the same as **scrutiny** and could replace it?",
    options: [
      ["close examination", "Correct: a noun phrase that fits *His ___ of the receipt*."],
      ["examined closely", "This is a verb phrase; scrutiny is a noun."],
      ["quick glance", "He read every line twice: the opposite of a quick glance."],
      ["angry complaint", "He examined the receipt; he did not complain."],
    ],
    answer: "A",
    hints: ["Is *scrutiny* a noun or a verb here?"],
    explanation: "*His ___ of the receipt* needs a **noun**. *Close examination* fits; *examined closely* would be correct only for the verb *scrutinised*.",
  });

  b.card("DEFINITION", "What does **context** mean?", "The surrounding words, sentences and situation that help show what a word means.", undefined);
  b.card("CONCEPT", "Five context clues", "Restatement, nearby synonym, contrast, example, general situation.", undefined);
  b.card("CONCEPT", "The substitution test", "Put your answer in place of the original word: the sentence must still make sense and keep its meaning.", undefined);
  b.card("CONCEPT", "Match the part of speech", "Replace a verb with a verb, a noun with a noun, an adjective with an adjective.", "vigilant (adj) → watchful; scrutiny (n) → close examination.");
  b.card("FACT", "Contrast signal words", "but, although, unlike, however, despite, whereas", "They show the word means the opposite of something nearby.");
  b.card("FACT", "Useful word parts", "un-/in-/im-/dis- = not; mis- = wrongly; re- = again; -less = without.", "relentless = without stopping.");
  b.card("CONCEPT", "Words with several meanings", "Choose the meaning that fits the sentence: check = examine OR limit; bank = river side OR money place.", undefined);
  b.card("CONCEPT", "Explaining a figurative phrase", "Give its plain meaning in this context, not a word-by-word translation.", "a thorn in his side = a constant irritation.");
  b.card("VOCABULARY", "Common passage words", "sceptical = doubtful; persistent = not giving up; gruelling = exhausting; modest = not boastful; famished = very hungry", undefined);
});
