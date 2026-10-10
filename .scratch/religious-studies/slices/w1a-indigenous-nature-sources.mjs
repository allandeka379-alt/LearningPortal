// W1a: nature and sources of Indigenous Religion (frs.indigenous.nature-sources).
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.indigenous.nature-sources", { file: "indigenous/nature-sources", keyPrefix: "indigenous.nature-sources" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How is Indigenous Religion mainly handed down from one generation to the next?",
    options: [
      ["Orally, through stories, proverbs, songs and ceremonies", "Correct: teaching is passed on by speaking, singing and taking part."],
      ["Through a single holy book that is read in a special building", "Indigenous Religion has no single written scripture."],
      ["By missionaries who travel from place to place to teach converts", "It is handed down within families and communities, not mainly by missionaries."],
      ["Through examinations set by the state for each new generation", "It is learned in family and community life, not by state examinations."],
    ],
    answer: "A",
    explanation: "Indigenous Religion is handed on by **oral tradition**: myths, proverbs, songs, prayers and ceremonies, taught mainly by elders and families.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is a feature of Indigenous Religion?",
    options: [
      ["It has no single human founder and grew in communities", "Correct: it grew over many generations within communities."],
      ["It was begun by one named person on a known date", "That is not so; no single founder is recorded."],
      ["It is separate from daily life and practised only in a special building", "IR is closely joined to daily life."],
      ["It is practised only by people who have chosen to convert as adults", "Membership is usually by birth into a family and community."],
    ],
    answer: "A",
    explanation: "Features of IR include **no single founder**, no single written scripture, community membership, a close link to daily life and belief in God and the spirit world.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is a **myth** in the study of religion?",
    options: [
      ["A sacred story that explains origins or meaning", "Correct: a myth carries deep meaning and does not mean a false story."],
      ["A story that is told to children only to make them laugh", "A myth is a sacred story, not just a funny one."],
      ["A rule about which animals a clan may not eat or harm", "That describes a totem taboo, not a myth."],
      ["A song sung only by a spirit medium during a ceremony", "A myth is a story, not a type of song."],
    ],
    answer: "A",
    explanation: "A **myth** is a traditional sacred story, for example about how the world, people or death began. The term does not decide whether the story is true or false.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A grandmother says to her grandson, \"Chara chimwe hachitswanyi inda,\" meaning that one thumb cannot crush a louse. Which source of Indigenous Religion and its moral teaching is this?",
    options: [
      ["A proverb that teaches the value of cooperation", "Correct: a proverb sums up a community's values in a short saying."],
      ["A creation myth that explains how the first people came", "It is a short saying and not a story about origins."],
      ["A prayer addressed to God and to the ancestors of the family", "It is advice about people, not a prayer."],
      ["A sacred place where the community sends its requests", "A saying is not a place."],
    ],
    answer: "A",
    explanation: "A **proverb** is a short wise saying. This one teaches that people need one another, a key idea in Unhu.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A researcher wants to learn what a community believes about rain. Which would be the **most useful** way to learn this from Indigenous Religion's own sources?",
    options: [
      ["Listen to the songs and prayers used at the mukwerera ceremony", "Correct: the community's songs, prayers and stories carry its beliefs."],
      ["Read the holy book that all Indigenous Religion communities use", "There is no single holy book shared by all IR communities."],
      ["Ask people from a different religion what they imagine the community believes", "The community's own sources should come first."],
      ["Compare the weather records of the district over the last twenty years", "Weather records tell us about rainfall, not about belief."],
    ],
    answer: "A",
    hints: ["Where does Indigenous Religion keep its beliefs, since it has no scripture?"],
    explanation: "Because IR is oral, its beliefs are found in songs, prayers, stories, rituals and the teaching of elders.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why do many scholars and believers prefer \"veneration of the ancestors\" to \"ancestor worship\"?",
    options: [
      ["Believers honour ancestors as intermediaries, with God as supreme", "Correct: the ancestors are respected and asked to help, but God is the supreme being."],
      ["Believers do not remember or honour their ancestors in any way", "Remembering and honouring ancestors is central."],
      ["The ancestors are said to be equal to God in every respect", "Believers do not usually say this."],
      ["Veneration is a word that was invented only by teachers in schools", "The term is widely used by scholars and believers."],
    ],
    answer: "A",
    hints: ["Who do believers say is supreme, God or the ancestors?"],
    explanation: "Many believers say that they honour, remember and consult ancestors, who are intermediaries, but that they worship God (Mwari/uMlimo).",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about Indigenous Religion is **best** supported?",
    options: [
      ["It is a living religion with beliefs, worship and morality", "Correct: it is practised by many people now."],
      ["It is only a set of old customs that has no beliefs or moral teaching", "It includes beliefs about God and a moral code."],
      ["It has disappeared since the arrival of other religions in Zimbabwe", "It continues today, often alongside other religions."],
      ["It is identical in every detail among all peoples of Zimbabwe", "Peoples share many features but have their own names and customs."],
    ],
    answer: "A",
    hints: ["Look for the statement that avoids both 'only' and 'identical'."],
    explanation: "IR is a religion in its own right, still practised, with local differences among Shona, Ndebele, Tonga, Venda, Kalanga and other peoples.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "What is a **limitation** of relying only on oral tradition to preserve a religion?",
    options: [
      ["Details may be forgotten or changed as they are told over time", "Correct: there is no fixed written text to check against."],
      ["Oral tradition can only be used by people who have learned to read", "Oral tradition does not require reading."],
      ["Spoken teaching cannot carry moral values from one person to another", "Stories and proverbs carry moral values very effectively."],
      ["Oral tradition is always less accurate than any written source", "Writing can also be inaccurate; oral traditions are often carefully handed on."],
    ],
    answer: "A",
    hints: ["What happens when a story is told many times by many people?"],
    explanation: "Oral tradition keeps a religion close to daily life, but without a fixed text, details can change or be lost. Elders and ceremonies work to keep it accurate.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Indigenous Religion in Zimbabwe has no single founder.",
    answer: true,
    explanation: "True. It grew over many generations within communities, and nobody is named as its founder.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Indigenous Religion is only a collection of old customs and has no beliefs about God.",
    answer: false,
    explanation: "False. Indigenous Religion includes belief in God (Mwari, uMlimo/uNkulunkulu), the ancestors and the spirit world, and a moral code.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each source of Indigenous Religion with its description.",
    pairs: [
      ["Myth", "A sacred story about origins or meaning"],
      ["Proverb", "A short wise saying that sums up a community's values"],
      ["Oral tradition", "Teaching passed on by speaking, singing and ceremony"],
      ["Totem praises", "Words in praise of a clan's totem that carry its identity"],
    ],
    explanation: "Myths explain origins, proverbs carry values, oral tradition is the way teaching is handed on, and totem praises (madupe/izibongo) carry clan identity.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Indigenous Religion has no single {{blank:a}}, and its teaching is handed down by {{blank:b}} tradition.",
    blanks: [
      { id: "a", accepted: ["founder"], choices: ["founder", "family", "festival", "village"] },
      { id: "b", accepted: ["oral"], choices: ["oral", "written", "printed", "digital"] },
    ],
    explanation: "IR has no single **founder** and is handed on by **oral** tradition.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the usual name, in Shona, for the rain-making ceremony of Indigenous Religion?",
    accepted: ["mukwerera", "mukwerere"],
    wrong: ["bira", "nhimbe"],
    explanation: "**Mukwerera** is the Shona rain ceremony; the Ndebele name is ukucela izulu.",
  });
  b.manualShort({
    d: 1, skill: "RECALL", marks: 3,
    stem: "State **three** features of Indigenous Religion.",
    points: ["No single founder (or no single written scripture)", "Handed down orally / community-based", "Any one of: part of daily life; belief in God and the ancestors; has a moral code"],
    modelAnswer: "It has no single founder, it is handed down orally, and it is closely joined to daily life.",
    explanation: "One mark for each feature correctly stated.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which elders pass on Indigenous Religion to the young.",
    points: [
      "Identifies: telling myths, legends and proverbs",
      "Develops: young people learn beliefs about God and values such as respect and cooperation",
      "Identifies: taking young people to ceremonies and teaching them the totem praises",
      "Develops: they learn rituals and their own identity by taking part and watching",
    ],
    modelAnswer: "Elders tell myths, legends and proverbs, so young people learn about God, the ancestors and values such as respect and cooperation. They also take young people to ceremonies and teach them the totem praises, so the young learn the rituals and their own identity by taking part.",
    hints: ["Think of the fireside and of ceremonies."],
    explanation: "Two marks for each way: identify and develop.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain why \"pagan\" and \"primitive\" are unfair labels for Indigenous Religion.",
    points: [
      "They suggest that the religion is inferior or false, which is a judgement and not a description",
      "They come from outsiders, not from the believers themselves",
      "Indigenous Religion has beliefs, worship, practitioners and a moral code, as other religions have",
      "A fair, non-confessional study uses the terms believers would recognise, such as Indigenous Religion",
    ],
    modelAnswer: "The labels suggest that the religion is inferior or false, which is a judgement and not a description, and they were used by outsiders and not by believers. Indigenous Religion has beliefs about God, worship, practitioners and a moral code, as other religions have, so a fair study uses terms believers would recognise, such as Indigenous Religion.",
    hints: ["Who first used these words, and what do they suggest?"],
    explanation: "One mark for each valid point, up to four.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "an account written by a fictional Form 3 learner from Lupane, 2026",
      "During the holidays my grandfather told us the story of how the first people came into the world. My aunt taught me the praises of our totem and explained that we must not harm it. When the rains were late, the elders brewed beer and the whole village gathered with a spirit medium, singing and asking God and the ancestors for rain. Nobody had a book, but everybody knew what to do.") +
      "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which feature of Indigenous Religion is shown by the last sentence of Source A: \"Nobody had a book, but everybody knew what to do\"?",
        options: [
          ["It is handed down by oral tradition and practice", "Correct: knowledge is passed on by telling and doing."],
          ["It is based on a single written scripture", "The source says nobody had a book."],
          ["It was founded by one person on a known date", "Nothing in the source says this."],
          ["It is practised only by people who convert as adults", "Learning begins in childhood in the family and village."],
        ],
        answer: "A",
        explanation: "Teaching is passed on by oral tradition and by taking part.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** sources of Indigenous Religion mentioned in Source A.",
        points: ["Myth or story of the first people", "Any one of: totem praises, a ceremony for rain, the teaching of an aunt or grandfather"],
        modelAnswer: "The story of how the first people came into the world, and the totem praises taught by the aunt.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how the rain ceremony in Source A shows that Indigenous Religion is community-based.",
        points: [
          "The whole village gathers to take part",
          "Elders brew beer and a spirit medium helps lead, so members have different roles",
          "It is a shared request for something that benefits everyone: rain for the community",
        ],
        modelAnswer: "The whole village gathers for the ceremony. Elders brew the beer and a spirit medium helps to lead, so people have different roles, and the request for rain benefits everyone in the community.",
      }),
    ],
    hints: ["In (c), ask who takes part and who benefits."],
    explanation: "A source showing oral transmission and community-based worship.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "Answer the questions on Indigenous Religion.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** sources from which we learn about Indigenous Religion.",
        points: [
          "Names a source (e.g. myths, proverbs, songs, prayers, rituals, sacred places)",
          "Describes what it teaches with an example",
          "Names a second source",
          "Describes what it teaches with an example",
        ],
        modelAnswer: "Myths and legends tell how the world and people began and what God is like. Proverbs teach values in a few words; for example, a proverb that one thumb cannot crush a louse teaches cooperation.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Indigenous Religion is a living religion, not just a tradition of the past.\" Assess this statement.",
        points: [
          ["For: still practised in homes and villages (mukwerera, bira, funerals, naming and totems), with believers and practitioners today", 2],
          ["For: adapts to change, e.g. town dwellers return to the rural home for ceremonies; many people also belong to another religion", 2],
          ["Against / limits: some customs have declined in towns or been changed by other religions and by modern life", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "I agree that Indigenous Religion is a living religion. It is practised today in homes and villages: families hold bira ceremonies, communities hold mukwerera when rains are late, and funerals and naming follow traditional customs. Many town dwellers return to the rural home for important ceremonies, and some people practise Indigenous Religion alongside another religion, which shows that it adapts.\n\nHowever, some customs have declined in towns, and other religions and modern life have changed or replaced certain practices for some families.\n\nOverall, the evidence shows that Indigenous Religion is not simply a tradition of the past: it continues to shape how many people think about God, family and community, though it is changing.",
      }),
    ],
    hints: ["In (b), give evidence for, a limit, and a conclusion."],
    explanation: "Describe sources (a) and assess whether Indigenous Religion is a living religion (b).",
  });

  b.card("DEFINITION", "Indigenous Religion (IR)", "The religion of the indigenous peoples of Africa, handed down through families and communities. In Zimbabwe it includes belief in God, the ancestors and the spirit world, and a moral code.");
  b.card("DEFINITION", "Oral tradition", "Knowledge handed from one generation to the next by speaking, singing, storytelling, proverbs and ceremonies.");
  b.card("DEFINITION", "Myth (in religious studies)", "A traditional sacred story that explains origins or meaning, such as how the world or death began.");
  b.card("DEFINITION", "Veneration of the ancestors", "Honouring and remembering the dead and asking for their help. Believers explain that the ancestors are respected as intermediaries and not worshipped as God.");
  b.card("FACT", "Name four features of Indigenous Religion.", "No single founder, no single written scripture, community-based, part of daily life (also belief in God and the spirit world, and a moral code).");
  b.card("FACT", "Name five sources of knowledge about Indigenous Religion.", "Myths and legends, proverbs, songs and praise poems, prayers, rituals and ceremonies (also sacred places, names, totems and the teaching of elders).");
  b.card("FACT", "What is the Shona proverb that means 'one thumb cannot crush a louse'?", "Chara chimwe hachitswanyi inda: people need one another.");
  b.card("CONCEPT", "Why should we avoid the labels 'pagan' and 'primitive'?", "They judge the religion as inferior or false. They come from outsiders; a fair study uses terms such as Indigenous Religion.");
  b.card("CONCEPT", "Why is Indigenous Religion described as part of daily life?", "There is no sharp line between religious and everyday life; farming, family and community life are all joined with beliefs, prayers and taboos.");
});
