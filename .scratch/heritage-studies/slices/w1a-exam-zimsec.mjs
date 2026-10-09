// W1a exam-format items: ZIMSEC Paper 2 Section A (STRUCTURED 10: 2 + 3 + 5, UNDERSTANDING) x4 and Section B essays
// (STRUCTURED 20: 8 + 12, EVALUATION) x3. Part structure is our convention (reviewer to check against recent papers).
import { concept, P, levels, EXAM, checkExam } from "../lib.mjs";

const A = EXAM.ZIM_P2A;
const B = EXAM.ZIM_P2B;
const secA = { skill: A.skill, secs: A.secs, examStyle: true, paper: "Paper 2" };
const secB = { skill: B.skill, secs: B.secs, examStyle: true, paper: "Paper 2" };

concept("her.socialisation.home", { file: "exam/w1a-zimsec", keyPrefix: "exam.w1a-zimsec" }, (b) => {
  // ---------------- Section A ----------------
  // A1. Agents of socialisation.
  b.struct({
    ...secA, d: 3,
    concepts: ["her.socialisation.home", "her.socialisation.school-peers", "her.socialisation.community-religion"],
    stem: "This question is about the agents of socialisation.",
    parts: checkExam(A, [
      P.fib({
        label: "(a)",
        stem: "Complete the statements.",
        template: "A person, group or institution that teaches an individual how to behave in society is an {{blank:a}} of socialisation. Learning in early childhood within the family is called {{blank:b}} socialisation.",
        blanks: [
          { id: "a", accepted: ["agent"], choices: ["agent", "norm", "sanction", "value"] },
          { id: "b", accepted: ["primary"], choices: ["primary", "secondary", "formal", "national"] },
        ],
        explanation: "An agent of socialisation teaches behaviour; primary socialisation happens first, in the family.",
      }),
      P.match({
        label: "(b)",
        stem: "Match each agent of socialisation with what it **mainly** teaches.",
        pairs: [
          ["The school", "Punctuality, discipline and respect for rules"],
          ["Peers", "Shared interests, group norms and fashions"],
          ["Religious groups", "Moral teachings, worship and rites of passage"],
        ],
        explanation: "School: rules and routines. Peers: group norms. Religious groups: moral teaching and worship.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Explain how the community socialises young people.",
        points: [
          ["Elders and neighbours guide, correct and advise children, so good behaviour is expected everywhere, not only at home", 2],
          ["Work parties (nhimbe / ilima) and community projects teach cooperation and hard work, because young people work alongside adults", 2],
          "Any one further point: ceremonies teach customs and roles; traditional leaders teach respect for rules; praise and sanctions show which behaviour is accepted",
        ],
        modelAnswer: "Elders and neighbours watch over children, correct them and give advice, so young people learn that good behaviour is expected everywhere and not only at home. At work parties (nhimbe / ilima) and community clean-ups, young people work with adults and learn cooperation and hard work. Ceremonies such as weddings and funerals also teach them customs and how to support others.",
        explanation: "Two marks for each developed point, one for a further relevant point.",
      }),
    ]),
    hints: ["In (c), say what the community does and what young people learn from it."],
    explanation: "Section A item on the agents of socialisation: definitions (a), matching agents (b) and explanation of the community's role (c).",
  });

  // A2. The media and ICT.
  b.struct({
    ...secA, d: 3,
    concepts: ["her.socialisation.media", "her.socialisation.ict"],
    stem: "This question is about the media and ICT in socialisation.",
    parts: checkExam(A, [
      P.fib({
        label: "(a)",
        stem: "Complete the statements.",
        template: "Newspapers and magazines are {{blank:a}} media. Using phones or the internet to threaten or insult someone is called {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["print"], choices: ["print", "electronic", "social", "broadcast"] },
          { id: "b", accepted: ["cyberbullying"], choices: ["cyberbullying", "advertising", "media literacy", "peer pressure"] },
        ],
        explanation: "Newspapers and magazines are print media; cyberbullying is bullying through ICT.",
      }),
      P.match({
        label: "(b)",
        stem: "Match each example with the effect of ICT it shows.",
        pairs: [
          ["A weekly video call with a parent working in another country", "Keeping family ties across distance"],
          ["Watching revision videos before an examination", "Access to learning"],
          ["Forwarding a shocking message that has no source", "Spreading false information"],
        ],
        explanation: "ICT can strengthen family ties and learning, but careless use spreads false information.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Describe ways in which young people can use the media and ICT responsibly.",
        points: [
          ["Check the source, date and other reliable reports before believing or sharing a message, so false information is not spread", 2],
          ["Keep personal information private and never meet online strangers, which protects them from fraud and abuse", 2],
          "Any one further way: limit screen time; choose age-appropriate content; report cyberbullying; think before posting (digital footprint)",
        ],
        modelAnswer: "Young people should check who made a message, when, and whether reliable sources report it before sharing it, so they do not spread false information. They should keep their address, location and passwords private and never meet online strangers, which protects them from fraud and abuse. They should also limit their screen time so they have time for study and family.",
        explanation: "Two marks per developed way, one for a further way.",
      }),
    ]),
    hints: ["In (c), think about checking information, privacy and time."],
    explanation: "Section A item on the media and ICT.",
  });

  // A3. Totems.
  b.struct({
    ...secA, d: 3,
    concepts: ["her.identity.totems"],
    stem: "This question is about totems.",
    parts: checkExam(A, [
      P.fib({
        label: "(a)",
        stem: "Complete the statements.",
        template: "A totem is called mutupo in Shona and {{blank:a}} in Ndebele. In Shona and Ndebele custom, a child usually takes the totem of the {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["isibongo"], choices: ["isibongo", "izaga", "ilima", "amadlozi"] },
          { id: "b", accepted: ["father"], choices: ["father", "mother", "grandmother", "village head"] },
        ],
        explanation: "Mutupo / isibongo; children usually take their father's totem.",
      }),
      P.fib({
        label: "(b)",
        stem: "State what each totem represents.",
        template: "Shumba: {{blank:a}}. Dube: {{blank:b}}. Nyathi: {{blank:c}}.",
        blanks: [
          { id: "a", accepted: ["lion"], choices: ["lion", "elephant", "zebra", "buffalo"] },
          { id: "b", accepted: ["zebra"], choices: ["lion", "elephant", "zebra", "buffalo"] },
          { id: "c", accepted: ["buffalo"], choices: ["lion", "elephant", "zebra", "buffalo"] },
        ],
        explanation: "Shumba = lion; Dube = zebra; Nyathi = buffalo.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Explain the significance of the totem system.",
        points: [
          ["People of the same totem are regarded as relatives, so the system prevents marriage between close relatives (incest)", 2],
          ["Clan members do not kill or eat their totem animal, which helps to conserve it", 2],
          "Any one further point: gives identity and links a person to ancestors; unity and hospitality among clan members; respect through praises",
        ],
        modelAnswer: "People who share a totem are regarded as relatives descended from one ancestor, so the totem system prevents marriage between close relatives. Members of a clan do not kill or eat their totem animal, which helps to protect it. Totems also give people their identity, linking them to their clan and ancestors.",
        explanation: "Two marks per developed point, one for a further point.",
      }),
    ]),
    hints: ["In (c), explain how each purpose works, not only name it."],
    explanation: "Section A item on totems.",
  });

  // A4. Identity documents.
  b.struct({
    ...secA, d: 3,
    concepts: ["her.identity.personal-identity"],
    stem: "This question is about national identification documents.",
    parts: checkExam(A, [
      P.fib({
        label: "(a)",
        stem: "Complete the statements.",
        template: "Birth certificates, national identity cards and passports are issued by the {{blank:a}}. A national identity card is issued from the age of {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["Registrar General"], choices: ["Registrar General", "Zimbabwe Electoral Commission", "Master of the High Court", "Ministry of Education"] },
          { id: "b", accepted: ["16"], choices: ["12", "16", "18", "21"] },
        ],
        explanation: "The Registrar General issues all three documents; ID cards are issued from 16.",
      }),
      P.match({
        label: "(b)",
        stem: "Match each document with a detail it records or a use it has.",
        pairs: [
          ["Birth certificate", "Names of the child's parents"],
          ["National identity card", "Needed to register as a voter"],
          ["Passport", "Date of expiry for international travel"],
        ],
        explanation: "Birth certificate: birth details and parents. ID card: identity inside Zimbabwe (voting, work). Passport: travel, with expiry date.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Explain the importance of national identification documents.",
        points: [
          ["They prove identity and citizenship, so a person can register as a voter and vote", 2],
          ["A birth certificate is needed to enrol at school and register for public examinations, so the right to education can be enjoyed", 2],
          "Any one further point: employment; travel (passport); banking or phone registration; proof of age protects children; government planning",
        ],
        modelAnswer: "Identity documents prove who a person is and that they are a citizen, so an adult with an ID can register and vote. A birth certificate is needed to enrol at school and to register for public examinations, so a child can complete their education. A passport is also needed to travel to other countries.",
        explanation: "Two marks per developed point, one for a further point.",
      }),
    ]),
    hints: ["In (c), link each document to something a person can do with it."],
    explanation: "Section A item on national identification documents.",
  });

  // ---------------- Section B ----------------
  // B1. Family versus the media.
  b.struct({
    ...secB, d: 4,
    concepts: ["her.socialisation.home", "her.socialisation.media", "her.socialisation.ict"],
    stem: "This question is about the family and the media as agents of socialisation.",
    parts: checkExam(B, [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "Describe the role of the family in the socialisation of children.",
        points: [
          ["Teaches the first language and basic manners, such as greeting elders, so the child can communicate and live with others", 2],
          ["Parents provide, protect and discipline, using rewards and sanctions to teach right and wrong", 2],
          ["Grandparents, vatete / ubabakazi and sekuru / umalume pass on folk tales, totems, customs and advice on growing up", 2],
          ["Children learn work and responsibility by taking part in household and farm tasks and caring for siblings", 2],
        ],
        modelAnswer: "The family is the first agent of socialisation. Parents and carers teach the child its first language and basic manners, such as greeting elders properly, so that the child can communicate and live with others.\n\nParents provide for and protect their children and discipline them, praising good behaviour and correcting bad behaviour, so children learn right from wrong.\n\nThe extended family also plays a part. Grandparents tell folk tales and teach the family's totem and praises, while the paternal aunt (vatete or ubabakazi) and maternal uncle (sekuru or umalume) advise young people on growing up and good conduct.\n\nFinally, children learn work and responsibility by doing chores, helping in the fields or with animals, and caring for younger brothers and sisters.",
        explanation: "Two marks for each developed point (about four points).",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "\"The media now play a greater role than the family in socialising young people in Zimbabwe.\" Discuss.",
        points: [
          ["For: television, radio, phones and social media reach young people for many hours a day and supply role models, fashions and values", 3],
          ["For: media and ICT influence spreads where parents work away or families spend less time together; advertising shapes wants", 3],
          ["Against: the family comes first and shapes language, values, identity and totem; parents control and filter media use; many rural young people have limited access", 3],
          ["Supported judgement weighing both sides (e.g. the media's influence has grown, but the family remains the foundation and decides how the media are used)", 3],
        ],
        levels: levels(12),
        modelAnswer: "The media have become a very powerful agent of socialisation. Many young people spend hours each day on phones, social media, television and radio. Musicians, athletes and online personalities become role models whose dress, speech and attitudes are copied, and advertising shapes what young people want. Where parents work far away or family members spend little time together, the media fill much of a young person's day.\n\nHowever, the family remains extremely important. It is the first agent of socialisation, teaching language, manners, values, the totem and the sense of who a person is, and these early lessons usually last for life. Parents and guardians can set rules about screen time and content, discuss what children watch, and pass on heritage that the media do not provide. In many rural areas access to the internet and television is still limited, so the family and community remain the main influences.\n\nThe two agents also interact. A strong family can use the media positively, for example through video calls with distant relatives or educational programmes, while a weak family may leave young people to be shaped mostly by what they see online.\n\nIn conclusion, the media's influence has grown greatly, especially among teenagers in towns, but it has not replaced the family. The family remains the foundation of socialisation and largely decides whether the media's role is helpful or harmful, so the statement is only partly true.",
        explanation: "Level 4 (10-12): both sides developed with examples and a supported judgement.",
      }),
    ]),
    hints: ["In (b), consider how the answer differs for young children and teenagers, and for towns and rural areas."],
    explanation: "Section B essay comparing the family and the media as agents of socialisation.",
  });

  // B2. ICT and indigenous values.
  b.struct({
    ...secB, d: 4,
    concepts: ["her.socialisation.ict", "her.identity.languages-cultures", "her.identity.wise-sayings"],
    stem: "This question is about ICT and indigenous values.",
    parts: checkExam(B, [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "Describe the positive effects of ICT on the socialisation of young people.",
        points: [
          ["Access to information and learning: revision videos and online lessons, for example during school closures", 2],
          ["Communication: video and voice calls keep families separated by work or migration in touch, so guidance continues", 2],
          ["Enterprise and skills: digital skills, mobile money and online selling prepare young people for work", 2],
          ["Heritage and participation: folk tales, music and history shared in indigenous languages; joining community discussions and projects", 2],
        ],
        modelAnswer: "ICT gives young people access to information and learning. They can watch revision videos, research topics and attend online lessons, as many did when schools closed during the COVID-19 pandemic.\n\nIt also keeps families together across distance. Parents working in other towns or countries use voice and video calls to guide their children and stay close.\n\nICT teaches useful skills: young people learn to use computers, mobile money and online selling, which prepares them for work and enterprise.\n\nFinally, ICT can spread heritage and encourage participation. Elders' stories, praise poetry and music in indigenous languages are recorded and shared, and young people join discussions and organise community projects online.",
        explanation: "Two marks for each developed point.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "How far does ICT threaten indigenous values in Zimbabwe?",
        points: [
          ["Threat: foreign trends and content that clash with unhu / ubuntu (e.g. disrespect for elders) reach young people directly", 3],
          ["Threat: time online replaces time with elders, storytelling and indigenous languages; harmful content and cyberbullying undermine respect", 3],
          ["Not a threat / benefit: ICT records and spreads folk tales, praises, music and languages; keeps families in touch; values depend on guidance and use", 3],
          ["Supported judgement on 'how far'", 3],
        ],
        levels: levels(12),
        modelAnswer: "ICT does pose a threat to indigenous values. Through phones and social media, young people meet foreign fashions, music and attitudes, some of which clash with unhu/ubuntu, for example content that treats disrespect for elders as funny. Time spent online often replaces evenings with grandparents, where folk tales, proverbs and family history were passed on, and many group chats use English or slang rather than indigenous languages. Cyberbullying and harmful content also undermine values such as respect and kindness.\n\nHowever, ICT is not only a threat. It can preserve and spread indigenous values. Elders record voice notes of totem praises and family history, musicians and storytellers share work in Shona, Ndebele, Tonga and other languages, and community radio and online programmes teach culture to young people who live far from their home areas. Video calls let parents and grandparents continue guiding children. Foreign does not automatically mean bad, and young people can learn useful values online too.\n\nWhether ICT threatens indigenous values depends largely on how it is used. Where families set rules, discuss content and use ICT to share heritage, it can strengthen values; where young people are left alone online for long hours, the threat is greater.\n\nIn conclusion, ICT threatens indigenous values to a considerable extent when it is used without guidance, but it is also one of the best tools for preserving them. The threat is real but not unavoidable.",
        explanation: "Level 4 (10-12): weighs threats against benefits with examples and reaches a supported judgement on 'how far'.",
      }),
    ]),
    hints: ["In (b), remember that 'foreign' is not the same as 'bad'; judge how far, not just whether."],
    explanation: "Section B essay on ICT and indigenous values.",
  });

  // B3. Language and totems in identity.
  b.struct({
    ...secB, d: 4,
    concepts: ["her.identity.language-identity", "her.identity.totems", "her.identity.languages-cultures"],
    stem: "This question is about language, totems and identity.",
    parts: checkExam(B, [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "Explain how language expresses a person's identity.",
        points: [
          ["Names carry meaning in an indigenous language (e.g. Rudo, Sipho), linking a child to the family's language and history", 2],
          ["Greetings and respectful forms of address show upbringing and membership of a community", 2],
          ["Songs, folk tales, proverbs and praise poetry in the language pass on the community's heritage and values", 2],
          ["A shared language creates belonging at community and national level; the 16 recognised languages show every group belongs", 2],
        ],
        modelAnswer: "Names are one of the clearest ways language expresses identity. Many Zimbabwean names, such as Rudo (love) or Sipho (gift), carry meaning in an indigenous language and link a child to the family's language and history.\n\nGreetings also show identity. The way a person greets elders, with words such as mangwanani or salibonani and respectful gestures, shows their upbringing and community.\n\nSongs, folk tales, proverbs and totem praises are passed on in the language, carrying the community's values and heritage.\n\nFinally, sharing a language creates a sense of belonging. People who speak the same language often treat one another like relatives, and the Constitution's recognition of 16 languages shows that speakers of every language belong to the nation.",
        explanation: "Two marks for each developed point.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "\"Totems are more important than language in shaping a Zimbabwean's identity today.\" How far do you agree?",
        points: [
          ["Totems: identify clan and ancestry; checked before marriage; used in thanks, praises and surnames; link to ancestors", 3],
          ["Language: used every day; carries names, greetings, songs, values and heritage; links to community and nation; many people know their language better than their totem", 3],
          ["Change today: many urban young people know little of their totem and some lose their indigenous language; both weakened in different ways", 3],
          ["Supported judgement (e.g. the two work together; language is broader, totems more specific)", 3],
        ],
        levels: levels(12),
        modelAnswer: "Totems remain important in shaping identity. A totem tells a person which clan they belong to and links them to their ancestors. Families still ask about totems before marriage to avoid unions between relatives, people thank and honour one another with totem praises, and many surnames, such as Moyo, Ndlovu and Dube, are totem names. For many Zimbabweans, knowing their totem is knowing where they come from.\n\nHowever, language shapes identity more widely and more constantly. People use their language every day, in their names, greetings, songs, prayers and jokes. It carries folk tales, proverbs and the values of unhu/ubuntu, and it links a person to their community and, through the 16 officially recognised languages, to the nation. Many young people know their home language well but know little about their totem or its praises.\n\nBoth forms of identity are changing. In towns some young people grow up speaking mainly English, while others do not know their totems. The two are also connected: totem praises are recited in an indigenous language, so losing the language weakens the totem tradition too.\n\nOverall, I only partly agree. Totems are vital for clan identity and for decisions such as marriage, but language shapes identity in more areas of daily life and carries the totem tradition itself. Language is therefore the broader influence, while totems give a more specific sense of belonging.",
        explanation: "Level 4 (10-12): compares totems and language with examples and reaches a supported judgement.",
      }),
    ]),
    hints: ["In (b), compare how often and in how many areas of life each one shapes identity."],
    explanation: "Section B essay on language and totems in identity.",
  });
});
