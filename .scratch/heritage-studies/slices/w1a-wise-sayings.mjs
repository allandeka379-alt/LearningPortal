// W1a: indigenous wise sayings (her.identity.wise-sayings).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.identity.wise-sayings", { file: "identity/wise-sayings", keyPrefix: "identity.wise-sayings" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the Shona word for a **proverb**?",
    options: [
      ["tsumo", "Correct: tsumo (Shona) / izaga (Ndebele)."],
      ["ngano", "Ngano is a folk tale."],
      ["chirahwe", "Chirahwe is a riddle (plural zvirahwe)."],
      ["dimikira", "Dimikira is an idiom (plural madimikira)."],
    ],
    answer: "A",
    explanation: "Proverbs: tsumo/izaga. Idioms: madimikira/izisho. Riddles: zvirahwe/iziphicaphicwano. Folk tales: ngano/inganekwane.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which type of wise saying is a **puzzling description** that the listener must solve?",
    options: [
      ["A riddle", "Correct: riddles (zvirahwe/iziphicaphicwano) are puzzles to solve."],
      ["A proverb", "A proverb states a general truth or advice."],
      ["An idiom", "An idiom is a phrase with a figurative meaning."],
      ["A praise poem", "Praise poetry honours a clan or person; it is not a puzzle."],
    ],
    answer: "A",
    explanation: "A riddle describes something in a puzzling way and the listener must guess what it is.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What lesson does the Ndebele proverb **Izandla ziyagezana** (hands wash each other) teach?",
    options: [
      ["People should help one another", "Correct: as each hand cleans the other, people should cooperate."],
      ["Personal hygiene prevents disease", "This is the literal picture; the proverb's lesson is about cooperation."],
      ["Hard work always brings wealth", "The proverb is about mutual help, not wealth."],
      ["Children should obey their parents", "Obedience is not the lesson of this proverb."],
    ],
    answer: "A",
    explanation: "Izandla ziyagezana: people depend on one another, so they should help one another.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "The Shona proverb **Rina manyanga hariputirwe** (what has horns cannot be wrapped up) means that:",
    options: [
      ["a wrongdoing or secret will eventually come out", "Correct: like horns sticking out of a parcel, some things cannot be hidden."],
      ["cattle should always be kept in a strong pen at night", "This is a literal reading, not the proverb's lesson."],
      ["gifts should always be wrapped before giving", "The proverb is not about gifts."],
      ["strong people should be feared and respected", "The horns stand for things that cannot be hidden, not for strength."],
    ],
    answer: "A",
    explanation: "Rina manyanga hariputirwe warns that wrongdoing or secrets cannot stay hidden for ever.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In many Shona and Ndebele folk tales, which animal is the small but clever **trickster**?",
    options: [
      ["The hare", "Correct: Tsuro (Shona) / uLogwaja (Ndebele) is the clever trickster."],
      ["The lion", "The lion is usually strong but often outwitted."],
      ["The elephant", "The elephant is usually powerful, not a trickster."],
      ["The buffalo", "The buffalo is not the usual trickster character."],
    ],
    answer: "A",
    explanation: "The hare is the classic trickster of Zimbabwean folk tales: small, clever, sometimes too proud or greedy.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Two cousins refuse to work together on a school project. Which proverb would an elder **most** fittingly use to advise them?",
    options: [
      ["Chara chimwe hachitswanyi inda (one thumb cannot crush a louse)", "Correct: it teaches that people achieve more together."],
      ["Rina manyanga hariputirwe (what has horns cannot be wrapped up)", "This warns that secrets come out; it is not about working together."],
      ["Kuziva mbuya huudzwa (to know your grandmother you must be told)", "This teaches learning from others, not cooperation between equals."],
      ["Inkosi yinkosi ngabantu (a king is a king through the people)", "This is about leaders depending on their people."],
    ],
    answer: "A",
    hints: ["Which proverb is about needing two to do a task?"],
    explanation: "One thumb cannot crush a louse: cooperation is needed to succeed.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why do elders often use proverbs rather than direct criticism when giving advice?",
    options: [
      ["Proverbs give advice tactfully, without shaming the listener", "Correct: the lesson is clear but politely indirect."],
      ["Proverbs are written laws that must be obeyed by everyone in the village", "Proverbs are not laws; they are wise sayings."],
      ["Young people cannot understand any direct instructions", "Young people understand direct speech; proverbs are chosen for tact."],
      ["Direct criticism is forbidden by the Constitution", "The Constitution says nothing about how elders give advice."],
    ],
    answer: "A",
    hints: ["Think about how the listener feels."],
    explanation: "Proverbs allow elders to advise, warn or settle disputes politely, appealing to shared values rather than blaming a person.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement **best** explains why riddles are valuable for children?",
    options: [
      ["They train observation, memory and quick thinking", "Correct: riddles are a game that sharpens the mind."],
      ["They teach children the history of the liberation struggle", "Riddles describe everyday objects, not national history."],
      ["They replace the need for formal schooling", "Riddles add to, but do not replace, schooling."],
      ["They are used to settle disputes in traditional courts", "Proverbs, not riddles, are used in disputes."],
    ],
    answer: "A",
    hints: ["What must a child do to solve a riddle?"],
    explanation: "Solving riddles requires careful observation, memory, imagination and reasoning, all while having fun.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Folk tales are called ngano in Shona and inganekwane in Ndebele.",
    answer: true,
    explanation: "True. Folk tales: ngano (Shona), inganekwane (Ndebele).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The meaning of an idiom can always be worked out by translating each word separately.",
    answer: false,
    explanation: "False. An idiom's meaning is figurative: \"to have a long heart\" means to be patient, not to have a large heart.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each Ndebele term with the type of wise saying.",
    pairs: [
      ["izaga", "Proverbs"],
      ["izisho", "Idioms"],
      ["iziphicaphicwano", "Riddles"],
      ["inganekwane", "Folk tales"],
    ],
    explanation: "Ndebele: izaga (proverbs), izisho (idioms), iziphicaphicwano (riddles), inganekwane (folk tales).",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "\"To have a long heart\" is an {{blank:a}} meaning to be {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["idiom"], choices: ["idiom", "riddle", "folk tale", "totem"] },
      { id: "b", accepted: ["patient"], choices: ["patient", "generous", "strong", "brave"] },
    ],
    hints: ["The phrase is used in both Shona (moyo murefu) and Ndebele (inhliziyo ende)."],
    explanation: "Kuva nemoyo murefu / ukuba lenhliziyo ende is an idiom meaning to be patient.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Give the **Shona** word for a folk tale.",
    accepted: ["ngano", "rungano"],
    wrong: ["tsumo", "chirahwe"],
    explanation: "A folk tale is **ngano** in Shona (inganekwane in Ndebele).",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Identify **four** types of indigenous wise sayings.",
    points: ["Proverbs (tsumo/izaga)", "Idioms (madimikira/izisho)", "Riddles (zvirahwe/iziphicaphicwano)", "Folk tales (ngano/inganekwane)"],
    modelAnswer: "Proverbs, idioms, riddles and folk tales.",
    explanation: "One mark per type.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which folk tales are significant to a community.",
    points: [
      "Identifies: teach values / morals",
      "Develops: e.g. a greedy hare is punished, so children learn honesty and sharing",
      "Identifies: entertainment / pass on heritage / language",
      "Develops: e.g. families gather and join the songs; the community's beliefs and language are kept alive",
    ],
    modelAnswer: "Folk tales teach values: when the greedy hare is caught and shamed, children learn that selfishness is punished. They also entertain and bring the family together in the evening, and their songs and language pass the community's heritage to the young.",
    hints: ["Think of what children learn and what the family gains."],
    explanation: "Two marks per point: identify and develop.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways in which schools could keep indigenous wise sayings alive among young people.",
    points: [
      "Suggests e.g. storytelling and proverb competitions in indigenous languages",
      "Explains: learners practise and enjoy using the sayings",
      "Suggests e.g. inviting elders to tell folk tales, or recording them in a school collection",
      "Explains: learners hear authentic sayings and the knowledge is preserved",
    ],
    modelAnswer: "Schools could hold storytelling, riddle and proverb competitions in indigenous languages, so learners practise and enjoy them. They could also invite elders to tell folk tales and record them for the library, so learners hear the sayings from their source and they are preserved.",
    hints: ["Who knows the sayings best, and how could learners hear and use them?"],
    explanation: "Credit realistic suggestions, each explained.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: source("Source A", "a summary of a folk tale, written for this question", "In a time of hunger, the tortoise found a fig tree full of fruit. The lion and the hare laughed at him for being too slow to reach the top. The tortoise said nothing. Each day he climbed a little higher, resting when he was tired. While the others argued about who was strongest, the tortoise reached the fruit and shared it with the small animals who had helped him on the way.") + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which quality does the tortoise **mainly** show?",
        options: [
          ["Patience and steady effort", "Correct: he climbs a little each day and rests when tired."],
          ["Great physical strength", "The tortoise is slow, not strong."],
          ["Trickery and cunning", "He does not trick anyone."],
          ["Pride in his own speed", "He is slow and does not boast."],
        ],
        answer: "A",
        explanation: "The tortoise succeeds through patience and steady effort.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** lessons the tale teaches.",
        points: ["Patience / steady effort brings success", "Any one of: do not mock others; share with those who help you; arguing wastes time"],
        modelAnswer: "Patience and steady effort bring success, and we should share with those who help us.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain why a story like this is a good way to teach children values.",
        points: ["Animal characters and a simple plot make it memorable and enjoyable", "The lesson is shown through what happens (rewards and consequences) rather than told as a rule", "It is told by elders in a shared setting, so the values are discussed and passed on"],
        modelAnswer: "The animal characters and simple plot make the story enjoyable and easy to remember. Children see the lesson in action, as the patient tortoise is rewarded and the boastful animals get nothing, rather than hearing a rule. Because elders tell it to the family together, the values are discussed and handed down.",
      }),
    ],
    hints: ["In (c), think about why children remember stories better than rules."],
    explanation: "An original folk tale used to identify values and explain how folk tales teach.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on indigenous wise sayings.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Distinguish between a **proverb** and an **idiom**.",
        points: ["Proverb: a complete, fixed saying stating a general truth or advice", "Idiom: a phrase whose meaning is figurative and cannot be worked out from its words"],
        modelAnswer: "A proverb is a complete, fixed saying that gives a general truth or advice, while an idiom is a phrase whose figurative meaning cannot be worked out from the individual words.",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Give **two** proverbs (Shona or Ndebele) and explain the lesson of each.",
        points: ["First proverb correctly given", "Its lesson explained (e.g. Chara chimwe hachitswanyi inda: cooperation)", "Second proverb correctly given", "Its lesson explained (e.g. Umuntu ngumuntu ngabantu: we are human through others)"],
        modelAnswer: "Chara chimwe hachitswanyi inda (one thumb cannot crush a louse) teaches that people achieve more by working together. Umuntu ngumuntu ngabantu (a person is a person through other people) teaches that we become fully human through respect and care for others.",
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "\"Indigenous wise sayings have lost their importance in modern Zimbabwe.\" How far do you agree?",
        points: [
          ["For: fewer evening storytelling sessions; television and phones replace folk tales; many young people know few proverbs", 2],
          ["Against: sayings still used in speeches, music, schools, media, competitions and disputes; values remain relevant", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(6),
        modelAnswer: "There is some truth in the statement. Fewer families gather around the fire for folk tales, television and phones take up children's evenings, and many young people in towns know only a few proverbs.\n\nHowever, wise sayings have not lost their importance. Elders still use proverbs to give advice and settle disputes, musicians and public speakers use them, and schools teach them and hold storytelling competitions. Folk tales are now shared on radio and online. Their lessons about cooperation, honesty and respect are as relevant as ever.\n\nOverall, the ways wise sayings are passed on have changed, but their importance remains, especially where families and schools make an effort to use them.",
      }),
    ],
    hints: ["In (c), separate how sayings are passed on from whether their lessons still matter."],
    explanation: "Distinguish (a), explain (b) and evaluate (c) indigenous wise sayings.",
  });

  b.card("DEFINITION", "Proverb (tsumo / izaga)", "A short, fixed saying stating a general truth or advice, usually in picture language.");
  b.card("DEFINITION", "Idiom (dimikira / isisho)", "A phrase whose meaning cannot be worked out from its words, e.g. 'to have a long heart' = to be patient.");
  b.card("DEFINITION", "Riddle (chirahwe / isiphicaphicwano)", "A puzzling question or description, often of an everyday thing, that the listener must solve.");
  b.card("DEFINITION", "Folk tale (ngano / inganekwane)", "A traditional story, often with animal characters and songs, told by elders to teach a lesson.");
  b.card("FACT", "Meaning of 'Chara chimwe hachitswanyi inda'?", "One thumb cannot crush a louse: people achieve more by cooperating.");
  b.card("FACT", "Meaning of 'Umuntu ngumuntu ngabantu'?", "A person is a person through other people: ubuntu, humanity through relationships.");
  b.card("FACT", "Meaning of 'Kupa kuturika'?", "To give is to store: generosity is repaid.");
  b.card("CONCEPT", "Name five purposes of wise sayings.", "Teach values, advise and warn, settle disputes, entertain, sharpen thinking, build language, pass on identity and heritage.");
  b.card("CONCEPT", "Why is the hare a popular folk-tale character?", "He is small but clever, a trickster who outwits bigger animals, yet his greed or pride can bring him down: he teaches lessons both ways.");
});
