// W2a: Indigenous forms of entertainment (her.culture.entertainment).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.culture.entertainment", { file: "culture/entertainment", keyPrefix: "culture.entertainment" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which instrument has metal keys fixed to a wooden board?",
    options: [
      ["mbira", "Correct: the mbira has metal keys on a board, often in a gourd."],
      ["hosho", "Hosho are gourd shakers filled with seeds."],
      ["ngoma (drum)", "A drum has a skin stretched over a wooden body."],
      ["kudu-horn trumpet", "A horn trumpet is blown; it has no keys."],
    ],
    answer: "A",
    explanation: "The mbira has metal keys fixed to a wooden board and is played with the thumbs and a finger.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "In which game do players toss a stone in the air and pick up other stones before catching it?",
    options: [
      ["nhodo", "Correct: nhodo is a game of tossing and picking up stones."],
      ["tsoro / isafuba", "Tsoro is a board game of moving seeds between holes."],
      ["mahumbwe", "Mahumbwe is children playing at running a home."],
      ["wrestling", "Wrestling is a contest of strength."],
    ],
    answer: "A",
    explanation: "Nhodo builds hand-eye coordination and concentration as players pick up stones before catching the one in the air.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the Ndebele word for a folk tale?",
    options: [
      ["inganekwane", "Correct: inganekwane is the Ndebele folk tale."],
      ["iziphicaphicwano", "These are riddles."],
      ["izaga", "These are proverbs."],
      ["umthimba", "This is the handing over of a bride."],
    ],
    answer: "A",
    explanation: "Folk tale: ngano (Shona), inganekwane (Ndebele). Riddles: zvirahwe/iziphicaphicwano. Proverbs: tsumo/izaga.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which skill does the game of tsoro/isafuba **mainly** develop?",
    options: [
      ["planning and mental arithmetic", "Correct: players count seeds and plan moves ahead."],
      ["speed in running long distances", "Tsoro is played sitting down; it does not build running speed."],
      ["strength for wrestling and lifting", "Tsoro is a game of thinking, not strength."],
      ["playing rhythms on the mbira", "Tsoro is a board game, not music."],
    ],
    answer: "A",
    explanation: "Tsoro/isafuba is a strategy game: players count seeds, plan ahead and predict the opponent's reply.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In a folk tale, Hyena eats food meant for the whole village and is caught and shamed. Which value does the tale **mainly** teach?",
    options: [
      ["sharing rather than greed", "Correct: Hyena is punished for greed."],
      ["respect for the chief's court", "The tale is about greed, not the chief's court."],
      ["obeying the go-between in marriage", "The tale has nothing to do with marriage."],
      ["running fast to escape danger", "The message is moral, not about speed."],
    ],
    answer: "A",
    hints: ["What did Hyena do wrong?"],
    explanation: "Folk tales teach values through the fate of the characters: greed brings shame; sharing is the right way.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Girls in a village play mahumbwe, cooking pretend meals and caring for a doll. Which purpose of entertainment does this show?",
    options: [
      ["socialisation into adult roles", "Correct: children practise adult roles through play."],
      ["worship at a rain-making ceremony", "Mahumbwe is a children's game, not a ceremony."],
      ["sending messages between villages", "Drums, not mahumbwe, were used for messages."],
      ["earning income for the family", "Children's play does not earn income."],
    ],
    answer: "A",
    hints: ["What are the children copying?"],
    explanation: "Mahumbwe lets children copy and practise the roles of adults, which is socialisation.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why were folk tales an effective way of passing on values to children?",
    options: [
      ["Children enjoyed them, joined in the songs and remembered the lessons", "Correct: enjoyment and taking part made the lessons memorable."],
      ["They were written in books that every child had to read", "Folk tales were oral, not written."],
      ["They were told only by teachers at government schools", "Grandparents told them at home, long before schools."],
      ["Children were punished by their elders if they could not repeat the tales word for word", "Tales were enjoyed, not drilled with punishment."],
    ],
    answer: "A",
    hints: ["Think about how children learn best."],
    explanation: "Because tales were entertaining and children joined in the songs, the message stayed with them without a lecture.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which piece of evidence **best** shows that indigenous entertainment is adapting rather than disappearing?",
    options: [
      ["Mbira music is recorded, broadcast and performed abroad", "Correct: an old form reaching new audiences through new media."],
      ["Many children spend evenings watching television", "This suggests competition from modern media, not adaptation."],
      ["Fewer grandparents live with their grandchildren", "This suggests decline in storytelling."],
      ["Board games are now sold in shops in towns", "These are not necessarily indigenous games."],
    ],
    answer: "A",
    hints: ["Adapting means an old form surviving in a new way."],
    explanation: "Recording, broadcasting and international performance show mbira music surviving and spreading through modern means.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Hosho are gourd shakers filled with seeds, used to keep rhythm.",
    answer: true,
    explanation: "True. Hosho keep the rhythm with mbira and drums.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The only purpose of indigenous entertainment was to pass the time.",
    answer: false,
    explanation: "False. It also educated, socialised, passed on values, kept people fit and built identity and unity.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each Shona term with its English meaning.",
    pairs: [
      ["ngano", "folk tale"],
      ["zvirahwe", "riddles"],
      ["tsumo", "proverbs"],
      ["hosho", "gourd shakers"],
    ],
    explanation: "Ngano are folk tales, zvirahwe are riddles, tsumo are proverbs and hosho are gourd shakers.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Folk tales were usually told in the {{blank:a}} by {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["evening"], choices: ["evening", "early morning", "fields", "court"] },
      { id: "b", accepted: ["grandparents"], choices: ["grandparents", "chiefs", "go-betweens", "midwives"] },
    ],
    explanation: "Grandparents told folk tales around the fire in the evening, after the day's work.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the sentence.",
    template: "Dancing and wrestling contributed to {{blank:a}}, while work songs at a nhimbe/ilima helped people keep the {{blank:b}} of their hoeing.",
    blanks: [
      { id: "a", accepted: ["fitness"], choices: ["fitness", "inheritance", "bride wealth", "taxation"] },
      { id: "b", accepted: ["rhythm"], choices: ["rhythm", "secrets", "totems", "cattle"] },
    ],
    hints: ["One is about the body, the other about music."],
    explanation: "Physical entertainment kept people fit; work songs kept a shared rhythm so the work went faster.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the indigenous board game in which players move seeds or stones between rows of holes.",
    accepted: ["tsoro", "isafuba", "tsoro/isafuba", "tsoro or isafuba", "tsoro isafuba"],
    wrong: ["nhodo", "mahumbwe"],
    explanation: "**Tsoro** (Shona) or **isafuba** (Ndebele). Nhodo is a stone-tossing game; mahumbwe is playing at house.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** indigenous musical instruments.",
    points: [
      "Any one of: mbira, drum (ngoma), hosho, horns/horn trumpets, whistles, mouth bow",
      "A second instrument",
      "A third instrument",
    ],
    modelAnswer: "Mbira, drum (ngoma) and hosho.",
    explanation: "One mark per correct instrument.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** uses of indigenous entertainment other than enjoyment.",
    points: [
      "Identifies education / passing on values",
      "Explains, e.g. folk tales show greed or laziness punished, so children learn right behaviour",
      "Identifies exercise / identity and unity / socialisation",
      "Explains, e.g. dancing and wrestling keep people fit / shared songs and dances give a community a sense of who it is",
    ],
    modelAnswer: "Entertainment educates: folk tales show greed and laziness being punished, so children learn right behaviour without being lectured. It also builds identity and unity, because a community's own songs and dances give its members a shared sense of who they are.",
    hints: ["Choose two purposes and show how the activity achieves each."],
    explanation: "One mark for each use and one for its explanation.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways a school could keep indigenous entertainment alive among its pupils, and explain how each would help.",
    points: [
      "Suggests a practical activity, e.g. a traditional dance or mbira club / storytelling competition",
      "Explains that pupils learn and practise the form, so it is passed on",
      "Suggests a second activity, e.g. inviting elders to tell tales or teach games / a cultural day",
      "Explains that elders pass on knowledge directly and pupils value their heritage",
    ],
    modelAnswer: "The school could start a mbira and traditional dance club, so pupils learn and practise these forms and pass them on. It could also invite grandparents to tell folk tales and teach games such as tsoro on a cultural day, so knowledge passes directly from elders to the young and pupils learn to value their heritage.",
    hints: ["Who knows the stories and games best?"],
    explanation: "Credit any sensible activity (1) with an explanation (1).",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a description of a fictional community event in Gwanda, 2026",
      "On Saturday the youth centre held a cultural afternoon. Elders told inganekwane, and the children shouted the chorus. Two teams played isafuba on boards cut into a log. In the evening drummers played while women and girls danced, and an old man explained that the songs had been sung by his grandfather's generation.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "What is an inganekwane?",
        options: [
          ["a folk tale", "Correct: inganekwane is the Ndebele folk tale."],
          ["a riddle", "Riddles are iziphicaphicwano."],
          ["a board game", "The board game is isafuba."],
          ["a drum", "Drums are not inganekwane."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** forms of indigenous entertainment in the source, other than folk tales.",
        points: ["The board game isafuba", "Drumming / dancing / singing"],
        modelAnswer: "The board game isafuba, and drumming with dancing.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how the afternoon could benefit the young people who attended.",
        points: [
          "They learn values from the tales",
          "They practise strategy and counting in isafuba / exercise through dance",
          "They learn about their heritage and identity from elders, linking generations",
        ],
        modelAnswer: "The tales teach values in an enjoyable way. Isafuba practises counting and strategy, and dancing is good exercise. Hearing that the songs came from earlier generations teaches the young people about their heritage and builds their identity.",
      }),
    ],
    hints: ["In (c), link each activity to a benefit."],
    explanation: "A source-based practice item on forms and purposes of indigenous entertainment.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about indigenous entertainment today.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** reasons why fewer young people take part in indigenous entertainment today.",
        points: [
          ["Competition from television, phones, the internet and modern sport", 2],
          ["Urbanisation and smaller households: fewer grandparents to tell tales; less communal time; school and homework take up evenings", 2],
        ],
        modelAnswer: "Television, phones, the internet and modern sports compete for young people's time and attention. In towns, families are smaller and grandparents often live far away, so there is nobody to tell folk tales in the evening.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Indigenous entertainment has no place in modern Zimbabwe.\" How far do you agree?",
        points: [
          ["For: modern media and sport dominate; storytelling at home has declined in towns", 2],
          ["Against: indigenous entertainment still educates, builds identity and unity; mbira and dance thrive and are performed abroad", 2],
          ["Against: it adapts through radio, recordings, school clubs, festivals and online stories in local languages", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Some evidence supports the statement. Television, phones and modern sports take up much of young people's free time, and in towns few children hear folk tales from grandparents in the evening.\n\nHowever, indigenous entertainment still has an important place. Its uses, such as teaching values, building identity and uniting communities, remain valuable. Mbira music and traditional dances are performed at festivals and abroad, and schools run cultural clubs. Stories and songs in local languages are broadcast on radio and shared online.\n\nI disagree strongly. Indigenous entertainment has changed its setting, from the fireside to the stage, the classroom and the internet, but it still has a clear place in modern Zimbabwe.",
      }),
    ],
    hints: ["In (b), think about where indigenous entertainment happens today."],
    explanation: "A practice evaluative item on the place of indigenous entertainment today.",
  });

  b.card("DEFINITION", "Folklore", "The traditional stories, riddles, proverbs, songs and sayings of a people, passed on orally.");
  b.card("FACT", "Folk tale, riddle and proverb in Shona and Ndebele?", "Folk tale: ngano / inganekwane. Riddles: zvirahwe / iziphicaphicwano. Proverbs: tsumo / izaga.");
  b.card("FACT", "What is nhodo?", "A game in which players toss a stone in the air and pick up other stones before catching it.");
  b.card("FACT", "What is tsoro / isafuba?", "A board game of rows of holes in which players move seeds or stones and capture the opponent's.");
  b.card("FACT", "Name three indigenous instruments.", "Mbira, drums (ngoma) and hosho (gourd shakers).");
  b.card("CONCEPT", "Give five uses of indigenous entertainment besides enjoyment.", "Education, socialisation, passing on values, exercise, identity and unity (also relaxation and worship).");
  b.card("CONCEPT", "How did folk tales teach values?", "The characters' fates showed the results of behaviour: greed or laziness punished, sharing and honesty rewarded.");
  b.card("DEFINITION", "Mahumbwe", "A children's game of playing at running a home, in which children practise adult roles.");
});
