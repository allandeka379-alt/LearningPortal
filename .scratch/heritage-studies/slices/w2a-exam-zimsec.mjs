// W2a exam-format items: ZIMSEC Heritage Studies Paper 2 Section A (ZIM_P2A, 10 marks: 2 + 3 + 5) x4 and Section B
// essays (ZIM_P2B, 20 marks: 8 + 12) x3. Part marks are our convention (reviewer to check against recent papers).
import { concept, P, source, levels, EXAM, checkExam } from "../lib.mjs";

const A = EXAM.ZIM_P2A;
const B = EXAM.ZIM_P2B;
const a = { skill: A.skill, secs: A.secs, examStyle: true, paper: "Paper 2" };
const bb = { skill: B.skill, secs: B.secs, examStyle: true, paper: "Paper 2" };

concept("her.culture.marriage-practices", { file: "exam/w2a-zimsec", keyPrefix: "exam.w2a-zimsec" }, (b) => {
  // ---------------------------------------------------------------- Section A 1: marriage counsellors.
  b.struct({
    ...a, d: 3,
    concepts: ["her.culture.marriage-practices"],
    stem: "This question is about indigenous marriage counselling.",
    parts: checkExam(A, [
      P.fib({
        label: "(a)",
        stem: "Complete the statements.",
        template: "The bride's indigenous marriage counsellor is her {{blank:a}}. The groom's indigenous marriage counsellor is usually his {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["paternal aunt (vatete/ubabakazi)"], choices: ["paternal aunt (vatete/ubabakazi)", "go-between (munyai/umkhongi)", "village head", "younger sister"] },
          { id: "b", accepted: ["maternal uncle (sekuru/umalume)"], choices: ["maternal uncle (sekuru/umalume)", "go-between (munyai/umkhongi)", "chief", "younger brother"] },
        ],
        explanation: "The aunt counsels the bride; the maternal uncle counsels the groom. The go-between negotiates; he is not a counsellor.",
      }),
      P.fib({
        label: "(b)",
        stem: "Identify the step of indigenous marriage in which the aunt plays each role.",
        template: "Checking the suitor's family and totem: {{blank:a}}. Escorting the bride to her husband's family: {{blank:b}}. Helping the couple settle a quarrel after the wedding: {{blank:c}}.",
        blanks: [
          { id: "a", accepted: ["courtship"], choices: ["courtship", "kurova guva", "kuperekwa", "married life"] },
          { id: "b", accepted: ["kuperekwa / umthimba"], choices: ["kuperekwa / umthimba", "courtship", "vhuramuromo", "married life"] },
          { id: "c", accepted: ["married life"], choices: ["married life", "courtship", "kuperekwa / umthimba", "vhuramuromo"] },
        ],
        explanation: "The aunt's counselling runs from courtship, through the handing over of the bride (kuperekwa/umthimba), into married life.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Explain the importance of indigenous marriage counsellors.",
        points: [
          "They prepare the couple for married life (respect for in-laws, duties, conduct)",
          "so the couple start marriage knowing what is expected and avoid many quarrels",
          "They settle disputes privately within the family",
          "so problems are solved without public shame and divorce is less likely",
          "They link the two families / are trusted by both sides, so they can mediate fairly",
        ],
        modelAnswer: "Counsellors prepare the couple for married life by teaching respect for in-laws, household duties and good conduct, so the couple begin marriage knowing what is expected and avoid many quarrels. They also settle disputes privately within the family, so problems are solved without public shame and divorce becomes less likely. Because they know and are trusted by both families, they can mediate fairly between the couple and their relatives.",
        explanation: "Two developed points (2 marks each) and one further point.",
      }),
    ]),
    hints: ["In (b), think of the stages before, during and after the wedding."],
    explanation: "Paper 2 Section A item on marriage counsellors: who they are, their roles and their importance.",
  });

  // ---------------------------------------------------------------- Section A 2: children's rights and responsibilities.
  b.struct({
    ...a, d: 3,
    concepts: ["her.rights.children"],
    stem: "This question is about children's rights and responsibilities.\n\n" + source("Source A", "a short case study written for a fictional school guidance lesson, Kariba, 2026",
      "Tendai, aged 12, has no birth certificate because his parents never registered his birth. His uncle keeps him at home on weekdays to sell fish at the harbour. Tendai says that when he does go to school, other boys mock him, and nobody listens when he complains."),
    parts: checkExam(A, [
      P.fib({
        label: "(a)",
        stem: "Complete the statements.",
        template: "Children's rights are set out in section {{blank:a}} of the Constitution of Zimbabwe. A child is any person under the age of {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["81"], choices: ["81", "56", "78", "162"] },
          { id: "b", accepted: ["18"], choices: ["18", "16", "21", "14"] },
        ],
        explanation: "Section 81 defines a child as every boy and girl under 18 and sets out children's rights.",
      }),
      P.fib({
        label: "(b)",
        stem: "Identify the right denied in each part of Source A.",
        template: "Having no birth certificate: the right to {{blank:a}}. Being kept at home to sell fish on weekdays: the right to {{blank:b}}. Nobody listening to his complaints: the right to {{blank:c}}.",
        blanks: [
          { id: "a", accepted: ["a name and birth certificate"], choices: ["a name and birth certificate", "vote", "own land", "free speech in Parliament"] },
          { id: "b", accepted: ["education"], choices: ["education", "vote", "a pension", "own land"] },
          { id: "c", accepted: ["be heard"], choices: ["be heard", "a pension", "vote", "own land"] },
        ],
        explanation: "Section 81 gives children the right to a name and the prompt provision of a birth certificate, to education (and protection from child labour) and to be heard.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Explain **two** responsibilities of a child at school, and why each is important.",
        points: [
          "Identifies a responsibility, e.g. obeying school rules / respecting other pupils (not bullying)",
          "Explains its importance, e.g. keeps the school safe and orderly so everyone can learn",
          "Identifies a second responsibility, e.g. attending and working hard / caring for school property",
          "Explains its importance, e.g. the child gains knowledge and skills for the future / resources last for others",
          "Links rights and responsibilities, e.g. respecting others protects their rights as well as one's own",
        ],
        modelAnswer: "A child should respect other pupils and never bully them, which keeps the school safe so that everyone, including boys like Tendai, can learn. A child should also attend school regularly and work hard, so that he or she gains the knowledge and skills needed for the future. Carrying out these responsibilities protects other children's rights as well as one's own.",
        explanation: "Two developed responsibilities (2 marks each) and one mark for linking rights and responsibilities.",
      }),
    ]),
    hints: ["In (b), match each problem in the source to a right in section 81."],
    explanation: "Paper 2 Section A item on children's rights (section 81) and responsibilities.",
  });

  // ---------------------------------------------------------------- Section A 3: vulnerable groups.
  b.struct({
    ...a, d: 3,
    concepts: ["her.rights.vulnerable-groups"],
    stem: "This question is about the rights of vulnerable groups.",
    parts: checkExam(A, [
      P.fib({
        label: "(a)",
        stem: "Complete the definition.",
        template: "A vulnerable group is a group of people who are more likely than others to suffer {{blank:a}} or neglect and may need extra {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["harm"], choices: ["harm", "wealth", "promotion", "fame"] },
          { id: "b", accepted: ["protection"], choices: ["protection", "taxation", "punishment", "competition"] },
        ],
        explanation: "Vulnerable groups face a greater risk of harm, discrimination or neglect and need extra protection.",
      }),
      P.match({
        label: "(b)",
        stem: "Match each section of the Constitution with the group whose rights it sets out.",
        pairs: [
          ["section 82", "the elderly"],
          ["section 83", "persons with disabilities"],
          ["section 84", "veterans of the liberation struggle"],
        ],
        explanation: "Section 82 the elderly; section 83 persons with disabilities; section 84 war veterans.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Describe how the government and communities support persons with disabilities.",
        points: [
          "Government: special schools and resource units / state-funded education where needed (section 83)",
          "Government: recognition of sign language as an official language / social welfare assistance",
          "Communities: organisations such as the Jairos Jiri Association provide services and training",
          "Communities: faith groups and neighbours include and assist them",
          "Making buildings accessible (ramps) / including them in school and community life",
        ],
        modelAnswer: "The government provides special schools and resource units and, under section 83, state-funded education for those who need it. Sign language is recognised as an official language, and social welfare gives assistance to those in need. In communities, organisations such as the Jairos Jiri Association provide services and training, while churches and neighbours include and assist persons with disabilities. Clinics, schools and businesses can build ramps so that people who use wheelchairs can enter.",
        explanation: "One mark per relevant, described form of support (government and community).",
      }),
    ]),
    hints: ["In (c), give support from both government and communities."],
    explanation: "Paper 2 Section A item on vulnerable groups, their constitutional rights and how they are supported.",
  });

  // ---------------------------------------------------------------- Section A 4: voluntary activities.
  b.struct({
    ...a, d: 3,
    concepts: ["her.rights.voluntary-activities"],
    stem: "This question is about voluntary community activities.",
    parts: checkExam(A, [
      P.fib({
        label: "(a)",
        stem: "Complete the definition.",
        template: "A voluntary community activity is work done {{blank:a}} and without {{blank:b}} to meet a community need.",
        blanks: [
          { id: "a", accepted: ["freely"], choices: ["freely", "by force", "for profit", "secretly"] },
          { id: "b", accepted: ["payment"], choices: ["payment", "planning", "leaders", "tools"] },
        ],
        explanation: "Voluntary work is done freely and without payment.",
      }),
      P.fib({
        label: "(b)",
        stem: "Identify whether each need is more typical of rural or urban areas.",
        template: "Gullies cutting across fields: {{blank:a}}. Blocked drains and illegal dumping: {{blank:b}}. Long walks to a distant borehole: {{blank:c}}.",
        blanks: [
          { id: "a", accepted: ["rural"], choices: ["rural", "urban"] },
          { id: "b", accepted: ["urban"], choices: ["urban", "rural"] },
          { id: "c", accepted: ["rural"], choices: ["rural", "urban"] },
        ],
        explanation: "Soil erosion and distant water are mainly rural needs; blocked drains and dumping are mainly urban.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Explain the importance of voluntary activities to the volunteer.",
        points: [
          "Volunteers gain skills and experience (e.g. building, first aid, leadership)",
          "which help them find work / build a record for references",
          "Volunteers gain satisfaction and confidence from helping others",
          "Volunteers make friends and networks in the community",
          "Volunteers earn respect and learn responsibility / become better citizens",
        ],
        modelAnswer: "Volunteers gain skills and experience, such as building, first aid or leadership, which help them find work and give them a good record for references. Helping others brings satisfaction and confidence. Volunteers also make friends and contacts in the community, and they earn respect and learn responsibility, which makes them better citizens.",
        explanation: "One developed point (2 marks) and three further points, or other combinations to 5.",
      }),
    ]),
    hints: ["In (c), focus on the volunteer, not the community."],
    explanation: "Paper 2 Section A item on voluntary activities: meaning, rural and urban needs, benefits to volunteers.",
  });

  // ---------------------------------------------------------------- Section B 1: gender equality progress.
  b.struct({
    ...bb, d: 4,
    concepts: ["her.rights.gender-equality", "her.rights.gender-based-violence"],
    stem: "This question is about gender equality in Zimbabwe.",
    parts: checkExam(B, [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "Explain how the Constitution and other laws promote gender equality in Zimbabwe.",
        points: [
          ["Gender equality as a founding value; section 17 gender balance and reserved seats for women, increasing women's representation", 2],
          ["Section 56 equality and non-discrimination / section 80: customs that infringe women's rights are void", 2],
          ["Zimbabwe Gender Commission monitors and investigates complaints", 2],
          ["Other laws: Legal Age of Majority Act (1982) made women adults at 18; Domestic Violence Act (2007) protects against abuse", 2],
        ],
        modelAnswer: "The Constitution names gender equality as a founding value. Section 17 requires the state to promote gender balance, and seats in the National Assembly are reserved for women, which increases women's representation in decision-making.\n\nSection 56 makes everyone equal before the law and forbids unfair discrimination on the grounds of sex or gender, and section 80 says that laws, customs and practices that infringe women's rights are void to that extent.\n\nThe Zimbabwe Gender Commission monitors gender equality and investigates complaints of discrimination, so rights can be acted on.\n\nOther laws support these provisions: the Legal Age of Majority Act (1982) made women legal adults at 18, and the Domestic Violence Act (2007) protects people from abuse at home and allows protection orders.",
        explanation: "Two marks per provision: identification and how it promotes equality.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "\"Zimbabwe has achieved gender equality.\" How far do you agree?",
        points: [
          ["For: strong legal framework; women are legal adults, can own land and property, inherit; reserved seats; Gender Commission", 3],
          ["For: girls in school in large numbers; women in professions, business and leadership", 3],
          ["Against: stereotypes and attitudes; gender-based violence; poverty and child marriage; unpaid care work; unequal access to land, credit and senior posts in practice; weak enforcement", 3],
          ["Supported conclusion, e.g. legal equality achieved in large part but not equality in practice", 3],
        ],
        levels: levels(12),
        modelAnswer: "There is evidence of real progress. The Constitution makes gender equality a founding value, requires gender balance, forbids discrimination and set up the Zimbabwe Gender Commission. Women have been legal adults since the Legal Age of Majority Act of 1982, and they can own land and property, inherit and sign contracts. Seats are reserved for women in the National Assembly. Zimbabwe has also joined CEDAW, the Maputo Protocol and the SADC Protocol on Gender and Development.\n\nIn daily life, too, there has been change. Girls attend school in large numbers, and many women work as doctors, engineers, lawyers, teachers and business owners, and lead organisations.\n\nHowever, gender equality has not been fully achieved. Stereotypes about what men and women should do remain strong in many homes and communities. Gender-based violence continues and keeps many women in fear. Poverty leads some families to keep girls out of school or marry them off early, even though this is illegal. Women still carry most unpaid care work, which leaves less time for paid work and leadership, and in practice they have less access to land, credit and senior posts. Laws are not always known or enforced, especially in remote areas.\n\nI disagree with the statement. Zimbabwe has largely achieved equality in law, but not in practice. Closing the gap needs enforcement of the law, economic empowerment of women, and changes in attitudes among both men and women.",
        explanation: "Levels of response: the top level weighs legal and practical progress against continuing barriers and reaches a supported judgement.",
      }),
    ]),
    hints: ["In (b), separate equality in law from equality in daily life."],
    explanation: "Paper 2 Section B essay on gender equality: legal provisions and how far equality has been achieved.",
  });

  // ---------------------------------------------------------------- Section B 2: value of indigenous marriage practices today.
  b.struct({
    ...bb, d: 4,
    concepts: ["her.culture.marriage-practices", "her.culture.courtship"],
    stem: "This question is about indigenous marriage practices.",
    parts: checkExam(B, [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "Describe the steps followed in arranging an indigenous marriage.",
        points: [
          ["After courtship the couple agree; the young woman informs her aunt (vatete/ubabakazi)", 2],
          ["The groom's family chooses a go-between (munyai/umkhongi), who opens talks with a token (vhuramuromo/isivulamlomo)", 2],
          ["Bride wealth (roora/lobola) is negotiated: main payment, cattle for the father, the mother's cow (mombe yeumai/inkomo yohlanga)", 2],
          ["The bride is handed over (kuperekwa/umthimba), escorted by her aunt, and counselling continues", 2],
        ],
        modelAnswer: "After courtship the couple agree to marry, and the young woman tells her aunt (vatete/ubabakazi), who informs the family.\n\nThe groom's family chooses a respected go-between (munyai/umkhongi). He visits the bride's family and pays a small token (vhuramuromo/isivulamlomo) so that talks can begin.\n\nThe families negotiate roora/lobola through the go-between: a main payment, cattle for the father and the mother's cow (mombe yeumai/inkomo yohlanga). Part may be paid later.\n\nFinally the bride is handed over (kuperekwa/umthimba): her aunt and relatives escort her to her husband's family, who welcome her with food and gifts. The aunt and the groom's uncle continue to counsel the couple.",
        explanation: "Two marks per step described in order with the people involved.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "\"Indigenous marriage practices are still valuable in Zimbabwe today.\" Discuss.",
        points: [
          ["Value: roora/lobola shows respect and binds families who support each other; go-between keeps talks dignified", 3],
          ["Value: aunts and uncles counsel couples and settle disputes privately; checks on families and totems", 3],
          ["Criticisms: commercialisation of bride wealth and debt; some see it as giving husbands control; harmful practices (kuzvarira, musengabere) existed and are illegal; less suited to couples far from family", 3],
          ["Supported conclusion, e.g. valuable when practised with consent, at age 18+ and without commercialisation", 3],
        ],
        levels: levels(12),
        modelAnswer: "Many indigenous marriage practices remain valuable. Roora/lobola shows the groom's respect and commitment and joins two families who support each other at funerals, ceremonies and in hard times. The go-between keeps negotiations polite and protects the dignity of both families. Aunts and uncles counsel the couple before and after the wedding and settle quarrels privately, which many people believe makes marriages more stable. Checks on a partner's family and totem protect young people from bad matches and from marrying close relatives.\n\nHowever, there are criticisms. Some families demand very large amounts of bride wealth, which can burden young couples with debt and make the custom look like a business. A few men misuse roora/lobola to claim control over their wives. In the past, harmful practices such as pledging girls (kuzvarira) and forced marriage (musengabere) existed; these are now illegal. Couples living in towns or abroad may find it hard to involve the extended family.\n\nIn my view, indigenous marriage practices are still valuable, especially the involvement of families, the counselling role of aunts and uncles, and the meaning of roora/lobola as respect. Their value depends on how they are practised: with the free consent of adults aged 18 or over, with modest and agreed bride wealth, and with respect for the equal rights of spouses.",
        explanation: "Levels of response: the top level gives the value of the practices and the criticisms, and reaches a supported judgement.",
      }),
    ]),
    hints: ["In (b), consider respect and family unity on one side, commercialisation and past harmful practices on the other."],
    explanation: "Paper 2 Section B essay on indigenous marriage practices and their value today.",
  });

  // ---------------------------------------------------------------- Section B 3: how far citizens meet civic responsibilities.
  b.struct({
    ...bb, d: 4,
    concepts: ["her.rights.civic-responsibilities", "her.rights.voluntary-activities"],
    stem: "This question is about the civic responsibilities of Zimbabwean citizens.",
    parts: checkExam(B, [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "Explain **four** civic responsibilities of Zimbabwean citizens.",
        points: [
          ["Obeying the law: keeps order and protects everyone's rights", 2],
          ["Paying taxes and rates: funds schools, hospitals, roads and services", 2],
          ["Voting: lets citizens choose leaders and hold them accountable", 2],
          ["Protecting heritage and the environment / defending sovereignty / upholding the Constitution, explained", 2],
        ],
        modelAnswer: "Citizens must obey the law, which keeps order and protects everyone's rights.\n\nThey must pay taxes and rates, which fund schools, hospitals, roads and other public services.\n\nCitizens aged 18 and over should register and vote, so that they choose their leaders and can hold them accountable.\n\nCitizens must also protect the country's heritage and environment, for example by respecting monuments and not starting veld fires, so that these are passed on to future generations.",
        explanation: "Two marks per responsibility: identification and explanation of why it matters.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "How far do Zimbabwean citizens meet their civic responsibilities?",
        points: [
          ["Evidence of meeting them: community projects, clean-ups, school development committees, volunteering, paying rates, voting, burial societies and support for the vulnerable", 3],
          ["Evidence of failure: littering, veld fires, vandalism, tax avoidance, low attendance at meetings, apathy", 3],
          ["Reasons: lack of awareness, poverty, distrust where leaders are not accountable, migration", 3],
          ["Supported conclusion", 3],
        ],
        levels: levels(12),
        modelAnswer: "Many citizens do meet their civic responsibilities. Communities build classrooms, repair boreholes and roads and run clean-up campaigns. Parents serve on school development committees. Neighbours and burial societies support the sick, the elderly and the bereaved, continuing the tradition of nhimbe/ilima and zunde ramambo. Many citizens pay rates and taxes, and many register and vote.\n\nHowever, there are clear failures. Littering and illegal dumping are common in towns, and veld fires destroy grazing and forests each dry season. Public property is sometimes vandalised, some people avoid paying taxes or rates, and attendance at ward and village meetings is often low.\n\nSeveral reasons explain these failures. Some citizens are not aware of their responsibilities; poverty leaves people with little time or money; some distrust institutions that do not report on how money is spent; and many young people have migrated away from their home areas.\n\nOverall, citizens meet their civic responsibilities to a fair extent, especially at community level, where Unhu and the tradition of communal work remain strong. They meet them less well in areas such as the environment, taxes and participation in meetings. Civic education and accountable leadership would help citizens do more.",
        explanation: "Levels of response: the top level gives evidence of both meeting and failing to meet responsibilities, explains why, and reaches a supported judgement.",
      }),
    ]),
    hints: ["In (b), give evidence on both sides and explain the reasons for failures."],
    explanation: "Paper 2 Section B essay on civic responsibilities and how far citizens meet them.",
  });
});
