// W2a: Dance, drama, sport, arts and culture (her.culture.arts-sport).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.culture.arts-sport", { file: "culture/arts-sport", keyPrefix: "culture.arts-sport" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which traditional dance of the Murehwa and Mutoko areas was recognised by UNESCO as intangible cultural heritage?",
    options: [
      ["Jerusarema/Mbende", "Correct: it was proclaimed in 2005 and later placed on UNESCO's Representative List."],
      ["Muchongoyo", "Muchongoyo is a dance of the Ndau and Shangani of the south-east."],
      ["Isitshikitsha", "Isitshikitsha is an Ndebele dance."],
      ["Mhande", "Mhande is a Karanga dance of Masvingo Province."],
    ],
    answer: "A",
    explanation: "Jerusarema/Mbende, a dance of the Zezuru Shona of Murehwa and Mutoko, was recognised by UNESCO as intangible cultural heritage.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Muchongoyo is a dance mainly associated with which communities?",
    options: [
      ["the Ndau and Shangani of the south-east", "Correct: it is performed in areas such as Chipinge and Chimanimani."],
      ["the Zezuru of Murehwa and Mutoko", "They are associated with Jerusarema/Mbende."],
      ["the Karanga of Masvingo Province", "They are associated with Mhande."],
      ["the Tonga of the Zambezi valley", "Muchongoyo is not a Tonga dance."],
    ],
    answer: "A",
    explanation: "Muchongoyo is danced by the Ndau and Shangani of south-eastern Zimbabwe, with men stamping while women sing and drum.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is **intangible** cultural heritage?",
    options: [
      ["Living traditions such as dances, songs and skills passed on by a community", "Correct: intangible heritage cannot be touched; it is practised."],
      ["Stone buildings, ruins and monuments that are protected by the state", "These are tangible heritage, such as monuments."],
      ["Minerals and forests owned by the nation", "These are natural resources."],
      ["Paintings and sculptures kept in a museum", "Objects you can touch are tangible heritage."],
    ],
    answer: "A",
    explanation: "Intangible heritage is living tradition (dance, song, ritual, knowledge); tangible heritage is objects and places.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which body promotes and coordinates the arts in Zimbabwe?",
    options: [
      ["the National Arts Council of Zimbabwe", "Correct: it promotes and coordinates the arts."],
      ["the Sports and Recreation Commission", "This body oversees sport."],
      ["the Zimbabwe Electoral Commission", "This body runs elections."],
      ["the Environmental Management Agency", "This body protects the environment."],
    ],
    answer: "A",
    explanation: "The National Arts Council of Zimbabwe promotes the arts; the Sports and Recreation Commission oversees sport.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A theatre group in Lupane performs a play about the dangers of child marriage at a village meeting. Which purpose of drama does this show **most clearly**?",
    options: [
      ["education and awareness", "Correct: this is drama for development."],
      ["tourism and foreign currency", "A village meeting is not aimed at tourists."],
      ["professional sport", "Drama is not sport."],
      ["worship at a ceremony", "The play is about a social issue, not a religious rite."],
    ],
    answer: "A",
    hints: ["What does the group want the audience to learn?"],
    explanation: "Plays about social issues raise awareness and start discussion: drama for development.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Supporters from every province travel to watch the national football team. Which importance of sport does this show?",
    options: [
      ["national unity", "Correct: people of different backgrounds support one team."],
      ["food security", "Sport does not directly produce food."],
      ["the separation of powers", "This is a principle of government, not sport."],
      ["the conservation of wildlife", "This is unrelated to supporting a team."],
    ],
    answer: "A",
    hints: ["What do the supporters share?"],
    explanation: "Supporting a national team gives people of all regions, languages and faiths a shared identity.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why do traditional dance performances help the tourism industry?",
    options: [
      ["Visitors pay to see living culture and then spend money locally", "Correct: performances attract visitors and income."],
      ["They replace the need for national parks", "Wildlife and parks remain key attractions; dance adds to them."],
      ["They stop tourists from spending their money on crafts and curios", "Performances usually increase sales of crafts."],
      ["They are performed only for government officials", "They are performed widely, including for tourists."],
    ],
    answer: "A",
    hints: ["Think about what tourists spend money on."],
    explanation: "Performances give visitors an experience of living culture; they pay fees and spend on food, crafts and lodging, creating income and jobs.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which factor **most limits** the number of jobs created by the arts in Zimbabwe?",
    options: [
      ["Low and irregular pay, piracy and a lack of facilities", "Correct: these make it hard to earn a living from the arts."],
      ["A shortage of traditional dances to perform", "Zimbabwe has many traditional dances."],
      ["A lack of talent among Zimbabwean artists", "Zimbabwean artists are widely recognised; talent is not the limit."],
      ["A law that bans the sale of crafts to visitors", "There is no such law; crafts are sold widely."],
    ],
    answer: "A",
    hints: ["Which option is a real, well-known problem?"],
    explanation: "Artists often struggle with low pay, piracy of their work, poor facilities and the cost of travel; these limit employment in the sector.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Isitshikitsha is a dance associated with the Ndebele.",
    answer: true,
    explanation: "True. Isitshikitsha is an Ndebele dance performed at the royal court and at ceremonies.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The only importance of sport is to entertain spectators.",
    answer: false,
    explanation: "False. Sport also builds discipline, health, unity, identity, employment and national pride.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each traditional dance with its community or area.",
    pairs: [
      ["Jerusarema/Mbende", "Zezuru Shona of Murehwa and Mutoko"],
      ["Isitshikitsha", "Ndebele"],
      ["Muchongoyo", "Ndau and Shangani of the south-east"],
      ["Mhande", "Karanga of Masvingo Province"],
    ],
    explanation: "Link each dance to its community: these are the four most often examined.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Mhande is associated with {{blank:a}} ceremonies. Sport in Zimbabwe is overseen by the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["rain-making"], choices: ["rain-making", "marriage", "naming", "graduation"] },
      { id: "b", accepted: ["Sports and Recreation Commission"], choices: ["Sports and Recreation Commission", "National Arts Council", "Registrar General", "Grain Marketing Board"] },
    ],
    explanation: "Mhande is linked to rain-making and other rituals. The Sports and Recreation Commission oversees sport; the National Arts Council deals with the arts.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Read the description and complete the sentence.",
    template: "Rudo earns her living by weaving baskets that she sells at a curio market. Her work is an example of employment in the {{blank:a}}, and it is closely linked to the {{blank:b}} industry.",
    blanks: [
      { id: "a", accepted: ["arts and crafts"], choices: ["arts and crafts", "mining", "civil service", "banking"] },
      { id: "b", accepted: ["tourism"], choices: ["tourism", "steel", "fishing", "railway"] },
    ],
    hints: ["Who buys at curio markets?"],
    explanation: "Craft work is employment in the arts and crafts sector, and curio markets depend largely on tourists.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **four** types of employment created by sport, arts and culture.",
    points: [
      "Any one of: dancer, actor, musician, comedian, sculptor, painter, basket-maker/crafts, writer, film-maker, professional player, coach, referee, sports journalist, event organiser, sound technician",
      "A second type",
      "A third type",
      "A fourth type",
    ],
    modelAnswer: "Dancer, sculptor, football coach and event organiser.",
    explanation: "One mark per correct type of employment.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which traditional dances help to preserve heritage.",
    points: [
      "Identifies passing on songs, steps and stories to the young",
      "Explains that young dancers learn from elders, so the tradition continues",
      "Identifies identity / pride",
      "Explains that performing a community's own dance gives members a sense of who they are, so they value their culture",
    ],
    modelAnswer: "When young dancers learn steps and songs from elders, the tradition is passed on and continues into the next generation. Performing their community's own dance also builds identity and pride, so people value their culture and want to keep it.",
    hints: ["Think of passing on and identity."],
    explanation: "One mark for each way and one for its explanation.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways a rural district council could use sport, arts or culture to create jobs for young people, and explain each.",
    points: [
      "Suggests a practical measure, e.g. building a community hall/sports ground or running a cultural festival",
      "Explains how it creates income, e.g. events attract visitors who pay fees and buy food and crafts",
      "Suggests a second measure, e.g. training young people in crafts/coaching, helping groups register as cooperatives, a craft market",
      "Explains how it creates income or jobs",
    ],
    modelAnswer: "The council could hold an annual cultural festival with dance competitions and a craft market, so visitors pay entry fees and buy food and crafts, giving young people income. It could also help youth dance and craft groups register as cooperatives and link them to lodges, so they earn regular fees from performing for tourists.",
    hints: ["Think of events, training and markets."],
    explanation: "Credit sensible measures (1 each) with explanations of the jobs or income created (1 each).",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a report in a fictional district newsletter, Chipinge, 2026",
      "Our district's Muchongoyo team came first at the provincial schools' traditional dance competition. The team's 24 members, aged 13 to 17, trained for three months under two elders from the community. A lodge near the border has now invited them to perform for visitors during the school holidays and will pay the team a fee for each show.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which communities is Muchongoyo mainly associated with?",
        options: [
          ["the Ndau and Shangani", "Correct: it is a dance of the south-east."],
          ["the Zezuru of Murehwa", "They are associated with Jerusarema/Mbende."],
          ["the Karanga of Masvingo", "They are associated with Mhande."],
          ["the Ndebele royal court", "That is Isitshikitsha."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** benefits of the dance team shown in the source.",
        points: ["Pride / success in competition", "Income from performing for visitors at the lodge / learning heritage from elders"],
        modelAnswer: "The team won the provincial competition, and the lodge will pay it to perform for visitors.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how the team's work could benefit the wider community.",
        points: [
          "Heritage is passed from elders to young people",
          "Tourism brings income to the area / visitors spend money locally",
          "The district gains pride and recognition / unity",
        ],
        modelAnswer: "Elders pass on the dance to young people, so the community's heritage survives. Performing for visitors brings income and encourages tourists to spend money in the area. The team's success also gives the whole district pride and recognition.",
      }),
    ],
    hints: ["In (c), think of heritage, money and pride."],
    explanation: "A source-based practice item on traditional dance, heritage and employment.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about sport, arts and culture as sources of employment.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** ways in which sport creates employment.",
        points: [
          ["Direct jobs: professional players, coaches, referees, groundsmen, physiotherapists", 2],
          ["Support jobs: event organisers, ticket sellers, caterers, transport, sports journalists, sale of kit", 2],
        ],
        modelAnswer: "Sport employs people directly as professional players, coaches, referees and groundsmen. It also creates support jobs: matches need ticket sellers, security, caterers and transport, and sports journalists report on them.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Sport, arts and culture can solve youth unemployment in Zimbabwe.\" How far do you agree?",
        points: [
          ["For: many direct and support jobs; crafts and performance linked to tourism; low start-up costs for some activities", 2],
          ["Against: low and irregular pay; piracy; few facilities; only a few athletes and artists earn well; talent migrates", 2],
          ["Against: sectors depend on tourism and spending power; cannot employ all young people", 2],
          ["Supported judgement, e.g. they can contribute but not solve the problem alone", 2],
        ],
        levels: levels(8),
        modelAnswer: "Sport, arts and culture do create jobs. Performers, sculptors, basket-makers, coaches and referees earn from their skills, and events create support jobs in catering, transport and organisation. Crafts and dance performances are linked to tourism, and some activities, such as crafts, need little money to start.\n\nHowever, there are serious limits. Many artists and athletes earn low and irregular incomes, music and film piracy reduces earnings, and facilities and equipment are scarce in many areas. Only a few people reach the top, and many talented people move abroad. The sectors also depend on tourists and on people having money to spend.\n\nI agree only to a limited extent. Sport, arts and culture can provide income for many young people and should be supported, but they cannot solve youth unemployment on their own; they must be combined with growth in other sectors of the economy.",
      }),
    ],
    hints: ["In (b), 'solve' is a strong word: can these sectors do it alone?"],
    explanation: "A practice evaluative item on sport, arts and culture as employers.",
  });

  b.card("DEFINITION", "Intangible cultural heritage", "Living traditions such as dances, songs, rituals, skills and knowledge passed on by a community.");
  b.card("FACT", "Which dance was recognised by UNESCO as intangible cultural heritage?", "Jerusarema/Mbende, of the Zezuru Shona of Murehwa and Mutoko.");
  b.card("FACT", "Match the dances to their communities: Isitshikitsha, Muchongoyo, Mhande.", "Isitshikitsha: Ndebele. Muchongoyo: Ndau and Shangani (south-east). Mhande: Karanga (Masvingo).");
  b.card("DEFINITION", "Drama for development", "Using plays to raise awareness and discussion of social issues such as health, child marriage or the environment.");
  b.card("FACT", "Which bodies oversee the arts and sport in Zimbabwe?", "The National Arts Council of Zimbabwe (arts) and the Sports and Recreation Commission (sport).");
  b.card("CONCEPT", "Give six reasons why sport, arts and culture are important.", "Entertainment, socialisation, identity, unity, health, employment (also tourism, national pride, education).");
  b.card("CONCEPT", "How do traditional dances support tourism?", "Visitors pay to see living culture and spend money on food, crafts and lodging, creating income and jobs.");
  b.card("CONCEPT", "Name three challenges facing artists and athletes.", "Low and irregular pay, piracy, lack of facilities and equipment, cost of travel, migration of talent.");
});
