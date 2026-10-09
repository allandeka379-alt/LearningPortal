// W3a exam-format items: ZIMSEC Paper 2 Section A (STRUCTURED 10: 2 + 3 + 5, UNDERSTANDING) x4 and Section B essays
// (STRUCTURED 20: 8 + 12, EVALUATION) x3. Part structure is our convention (reviewer to check against recent papers).
import { concept, P, source, levels, EXAM, checkExam } from "../lib.mjs";

const A = EXAM.ZIM_P2A;
const B = EXAM.ZIM_P2B;
const secA = { skill: A.skill, secs: A.secs, examStyle: true, paper: "Paper 2" };
const secB = { skill: B.skill, secs: B.secs, examStyle: true, paper: "Paper 2" };

concept("her.governance.central-government", { file: "exam/w3a-zimsec", keyPrefix: "exam.w3a-zimsec" }, (b) => {
  // ---------------- Section A ----------------
  // A1. Arms of government.
  b.struct({
    ...secA, d: 3,
    concepts: ["her.governance.central-government"],
    stem: "This question is about the arms of government in Zimbabwe.",
    parts: checkExam(A, [
      P.fib({
        label: "(a)",
        stem: "Complete the statements.",
        template: "The arm of government that interprets the law is the {{blank:a}}. The two houses of Parliament are the Senate and the National {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["Judiciary"], choices: ["Judiciary", "Executive", "Legislature", "Cabinet"] },
          { id: "b", accepted: ["Assembly"], choices: ["Assembly", "Council", "Court", "Commission"] },
        ],
        explanation: "The Judiciary interprets the law; Parliament is the Senate and the National Assembly.",
      }),
      P.match({
        label: "(b)",
        stem: "Match each office or body with its arm of government.",
        pairs: [
          ["The Cabinet", "Executive"],
          ["The Senate", "Legislature"],
          ["The Chief Justice", "Judiciary"],
        ],
        explanation: "Cabinet: Executive. Senate: Legislature. Chief Justice: Judiciary.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Explain why the separation of powers is important in a democracy.",
        points: [
          ["It prevents abuse of power, because no single person or body makes, carries out and judges the law", 2],
          ["It protects rights and the rule of law, because independent courts can stop unlawful acts by the government", 2],
          "Any one further point: Parliament checks the Executive through the budget and questions; decisions are more accountable; builds public trust",
        ],
        modelAnswer: "Separation of powers prevents abuse of power, because no single person or body can make the law, carry it out and judge cases under it. It protects citizens' rights, because independent courts can declare unlawful government actions invalid. It also makes government accountable, because Parliament approves the budget and questions ministers.",
        explanation: "Two marks for each developed point, one for a further point.",
      }),
    ]),
    hints: ["In (c), say what separation prevents and how."],
    explanation: "Section A item on the arms of government.",
  });

  // A2. Local authorities.
  b.struct({
    ...secA, d: 3,
    concepts: ["her.governance.local-government"],
    stem: "This question is about local authorities in Zimbabwe.",
    parts: checkExam(A, [
      P.fib({
        label: "(a)",
        stem: "Complete the statements.",
        template: "A local authority for a rural area is called a rural district {{blank:a}}. The chief official of an urban council is the town {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["council"], choices: ["council", "court", "assembly", "board"] },
          { id: "b", accepted: ["clerk"], choices: ["clerk", "mayor", "councillor", "chief"] },
        ],
        explanation: "Rural district council; town clerk.",
      }),
      P.match({
        label: "(b)",
        stem: "Match each source of income with the body that collects it.",
        pairs: [
          ["Property rates", "An urban council"],
          ["Income tax on salaries", "ZIMRA"],
          ["Market stall fees", "A local market run by the council"],
        ],
        explanation: "Rates and market fees are council income; ZIMRA collects national taxes such as income tax.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Explain the importance of local authorities to communities.",
        points: [
          ["They provide services close to the people, such as water, refuse collection and clinics, which protect health", 2],
          ["They make by-laws and plan local development, so towns and districts grow in an orderly way", 2],
          "Any one further point: elected councillors give residents a voice; allocate stands for housing; maintain roads and markets; work with traditional leaders",
        ],
        modelAnswer: "Local authorities provide services that people need every day, such as clean water, refuse collection and clinics, which protect public health. They make by-laws and plan local development, so that housing, markets and roads are provided in an orderly way. Elected councillors also give residents a voice in local decisions.",
        explanation: "Two marks for each developed point, one for a further point.",
      }),
    ]),
    hints: ["In (c), link each function to its benefit."],
    explanation: "Section A item on local authorities.",
  });

  // A3. Roles of the masses in the struggle.
  b.struct({
    ...secA, d: 3,
    concepts: ["her.liberation.roles-heroes", "her.liberation.second-chimurenga"],
    stem: source("Source A", "an account by a fictional elderly man from Tsholotsho, recorded in 2026", `When the fighters came to our area, we did not ask whether they were ZIPRA or ZANLA. We fed them and showed them where to hide. My younger brother watched the road and ran to warn them when soldiers came. Many of us were beaten for this, but we knew the war could not be won without us.`),
    parts: checkExam(A, [
      P.fib({
        label: "(a)",
        stem: "Complete the statements.",
        template: "Boys who acted as messengers and lookouts were called {{blank:a}}. Girls who cooked and carried supplies were called {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["mujibhas"], choices: ["mujibhas", "chimbwidos", "izinduna", "masvikiro"] },
          { id: "b", accepted: ["chimbwidos"], choices: ["chimbwidos", "mujibhas", "izinduna", "masvikiro"] },
        ],
        explanation: "Mujibhas (boys) and chimbwidos (girls).",
      }),
      P.match({
        label: "(b)",
        stem: "Match each group with its role in the liberation struggle.",
        pairs: [
          ["Villagers (the masses)", "Fed and hid the fighters"],
          ["Mujibhas", "Watched roads and warned fighters"],
          ["Frontline States", "Provided bases and shelter for refugees"],
        ],
        explanation: "The masses fed and hid fighters; mujibhas were lookouts; the Frontline States gave bases and refuge.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Explain why the support of the masses was important to the success of the liberation struggle.",
        points: [
          ["Guerrilla fighters depended on villagers for food and shelter, so they could operate far from their bases", 2],
          ["Villagers and mujibhas provided information about enemy movements, so fighters could avoid ambush and plan attacks", 2],
          "Any one further point: recruits came from the people; political support spread the struggle; spirit mediums gave guidance and legitimacy",
        ],
        modelAnswer: "Guerrilla fighters depended on villagers for food and shelter, so they could operate inside the country far from their bases. Villagers and mujibhas gave information about the movements of soldiers, so fighters could avoid ambushes and plan attacks. The people also supplied recruits, so the struggle kept growing.",
        explanation: "Two marks for each developed point, one for a further point.",
      }),
    ]),
    hints: ["In (c), think about how guerrilla war works."],
    explanation: "Section A item on the roles of the masses in the liberation struggle.",
  });

  // A4. SADC.
  b.struct({
    ...secA, d: 3,
    concepts: ["her.governance.regional-organisations"],
    stem: "This question is about the Southern African Development Community (SADC).",
    parts: checkExam(A, [
      P.fib({
        label: "(a)",
        stem: "Complete the statements.",
        template: "SADC grew out of SADCC, which was formed in {{blank:a}}. SADC's headquarters are in {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["1980"], choices: ["1980", "1963", "1992", "2002"] },
          { id: "b", accepted: ["Gaborone"], choices: ["Gaborone", "Lusaka", "Addis Ababa", "Harare"] },
        ],
        explanation: "SADCC 1980 (SADC from 1992); headquarters in Gaborone.",
      }),
      P.match({
        label: "(b)",
        stem: "Match each SADC body with its role.",
        pairs: [
          ["Summit of Heads of State or Government", "Highest decision-making body"],
          ["Organ on Politics, Defence and Security Cooperation", "Promotes peace and mediates conflicts"],
          ["Secretariat", "Runs the day-to-day work"],
        ],
        explanation: "Summit: decisions. Organ: peace and security. Secretariat (Gaborone): daily work.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Explain the benefits Zimbabwe gains from membership of SADC.",
        points: [
          ["Wider markets: lower duties let Zimbabwean goods sell in neighbouring countries, creating jobs", 2],
          ["Peace and security cooperation and mediation keep the region stable, which helps trade and investment", 2],
          "Any one further point: shared projects in energy, transport and water (e.g. the Zambezi); disaster cooperation; collective voice in world affairs",
        ],
        modelAnswer: "SADC membership gives Zimbabwe wider markets: lower duties allow Zimbabwean goods to be sold in neighbouring countries, creating jobs at home. Cooperation on peace and security keeps the region stable, which encourages trade and investment. Zimbabwe also benefits from shared projects in energy, transport and water.",
        explanation: "Two marks for each developed point, one for a further point.",
      }),
    ]),
    hints: ["In (c), give the benefit and how Zimbabwe gains."],
    explanation: "Section A item on SADC.",
  });

  // ---------------- Section B ----------------
  // B1. Gains and challenges since independence.
  b.struct({
    ...secB, d: 4,
    concepts: ["her.independence.gains", "her.independence.challenges"],
    stem: "This question is about Zimbabwe since independence.",
    parts: checkExam(B, [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "Describe the social gains of independence.",
        points: [
          ["Education: primary education made free; many new schools, especially in rural areas; enrolment rose sharply", 2],
          ["Health: rural clinics, village health workers, immunisation; free care for people on low incomes", 2],
          ["Women's rights: the Legal Age of Majority Act made women legal adults at 18", 2],
          ["Other: minimum wages; water, roads and electricity extended to communal areas; indigenous languages and culture in schools", 2],
        ],
        modelAnswer: "After independence primary education was made free and many new primary and secondary schools were built, especially in rural areas, so enrolment rose sharply.\n\nHealth care expanded through new rural clinics, village health workers and immunisation programmes, with free care for people on low incomes.\n\nThe Legal Age of Majority Act of 1982 made women legal adults at 18, so they could sign contracts, own property and marry in their own right.\n\nMinimum wages were introduced, and boreholes, roads and electricity were extended to many communal areas.",
        explanation: "Two marks for each developed point.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "\"The challenges faced by Zimbabwe since independence have outweighed the gains.\" Discuss.",
        points: [
          ["Gains: majority rule and the vote; reconciliation; expansion of education and health; women's legal rights; the Unity Accord ended the conflict of the 1980s", 3],
          ["Challenges: droughts and Cyclone Idai; ESAP job losses and price rises; hyperinflation and currency changes; HIV and AIDS; brain drain", 3],
          ["Further balance: the disturbances in Matabeleland and the Midlands; different views on sanctions or restrictive measures and their effects; some gains reduced by economic difficulty", 3],
          ["Supported judgement", 3],
        ],
        levels: levels(12),
        modelAnswer: "Independence brought important gains. All adults gained the vote, and the policy of reconciliation kept the peace after a bitter war. Education and health care expanded rapidly, and the Legal Age of Majority Act gave women legal adulthood. The Unity Accord of 1987 united ZANU-PF and PF-ZAPU and ended the conflict of the 1980s.\n\nHowever, the country has faced serious challenges. Droughts such as that of 1991-92 and Cyclone Idai in 2019 destroyed crops and homes. ESAP brought job losses and higher prices, and in the late 2000s hyperinflation destroyed savings; several currency changes followed. HIV and AIDS left many orphans, and the brain drain took doctors, nurses and teachers abroad.\n\nThe disturbances in Matabeleland and the Midlands in the 1980s cost many thousands of lives and remain a painful memory. People also disagree about the measures imposed by Western countries from the early 2000s: the government calls them sanctions that harmed the whole economy, while those who imposed them say they were targeted.\n\nIn conclusion, the challenges have been severe and have reduced some of the gains, especially in services and living standards. However, gains such as majority rule, education and national unity are lasting foundations. I therefore do not fully agree: the gains remain significant, though they have been weakened by the challenges.",
        explanation: "Level 4 (10-12): both sides developed with examples and a supported judgement.",
      }),
    ]),
    hints: ["In (b), present different views fairly before your judgement."],
    explanation: "Section B essay on the gains and challenges of independence.",
  });

  // B2. Democracy versus autocracy.
  b.struct({
    ...secB, d: 4,
    concepts: ["her.governance.systems", "her.governance.central-government"],
    stem: "This question is about systems of governance.",
    parts: checkExam(B, [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "Explain the characteristics of democracy.",
        points: [
          ["Free and fair elections: citizens choose and can peacefully replace leaders", 2],
          ["Rule of law: everyone, including leaders, obeys the law, applied equally by independent courts", 2],
          ["Separation of powers / checks and balances: Executive, Legislature and Judiciary limit each other", 2],
          ["Protection of rights and accountability: free speech, press and assembly; leaders answer for decisions", 2],
        ],
        modelAnswer: "In a democracy, regular free and fair elections allow citizens to choose their leaders and replace them peacefully.\n\nThe rule of law means that everyone, including leaders, obeys the law, which independent courts apply equally.\n\nPower is separated among the Executive, the Legislature and the Judiciary, which check one another so that no one abuses power.\n\nRights such as freedom of speech, of the press and of assembly are protected, and leaders are accountable: they must explain their decisions to Parliament and the people.",
        explanation: "Two marks for each developed point.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "\"Democracy is a better system of governance than autocracy.\" To what extent do you agree?",
        points: [
          ["For democracy: protects rights; leaders can be changed peacefully; decisions reflect many views; mistakes and corruption exposed", 3],
          ["Arguments made for autocracy: quick decisions; firm action in a crisis; but power unchecked, rights restricted, no peaceful change of leaders", 3],
          ["Limits of democracy: slow decisions; costly elections; majority may ignore minorities unless rights are protected; depends on citizens' participation", 3],
          ["Supported judgement", 3],
        ],
        levels: levels(12),
        modelAnswer: "Democracy has strong advantages. Citizens' rights are protected, leaders can be changed peacefully at elections, and decisions are debated so that many views are heard. Because the press is free and the courts are independent, mistakes and corruption can be exposed and corrected.\n\nSome people argue that autocracy is better because decisions can be made quickly and a ruler can act firmly in a crisis. However, an autocrat's power is unchecked, rights are restricted, critics are silenced and there is no peaceful way to remove a bad ruler.\n\nDemocracy also has weaknesses. Decisions can be slow, elections are expensive, and a majority may ignore minorities unless their rights are protected. It works well only when citizens take part and institutions are strong.\n\nIn conclusion, I largely agree. Autocracy may be faster, but its lack of accountability carries great risks. Democracy, despite being slower, protects rights and allows mistakes to be corrected, so it is the better system when its institutions are strong.",
        explanation: "Level 4 (10-12): both sides developed with examples and a supported judgement.",
      }),
    ]),
    hints: ["In (b), use characteristics rather than labelling present-day countries."],
    explanation: "Section B essay on democracy and autocracy.",
  });

  // B3. Land redistribution since 1980.
  b.struct({
    ...secB, d: 4,
    concepts: ["her.production.land-ownership", "her.colonisation.expropriation"],
    stem: "This question is about land ownership in Zimbabwe.",
    parts: checkExam(B, [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "Describe the measures taken to redistribute land in Zimbabwe since independence.",
        points: [
          ["Willing-buyer willing-seller under the Lancaster House constitution: government bought farms offered for sale and resettled families", 2],
          ["The Land Acquisition Act (1992) allowed compulsory acquisition with compensation; farms were designated in the late 1990s", 2],
          ["Fast-track land reform from 2000: most large commercial farms acquired; land allocated under A1 (smallholder) and A2 (commercial) models", 2],
          ["Chapter 16 of the 2013 Constitution: acquired agricultural land vested in the State; compensation for improvements", 2],
        ],
        modelAnswer: "In the 1980s, under the Lancaster House constitution, the government could buy only land offered for sale on a willing-buyer willing-seller basis; it bought farms and resettled families on them.\n\nThe Land Acquisition Act of 1992 allowed the government to acquire land compulsorily with compensation, and farms were designated for acquisition in the late 1990s.\n\nFrom 2000 the fast-track land reform programme acquired most large commercial farms and allocated them to families and farmers under the A1 smallholder model and the A2 commercial model.\n\nThe 2013 Constitution, in Chapter 16, vests acquired agricultural land in the State and provides compensation for improvements made on it.",
        explanation: "Two marks for each developed point.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "\"Land redistribution since 1980 has benefited the people of Zimbabwe.\" How far do you agree?",
        points: [
          ["Benefits: many thousands of families gained land and livelihoods; the colonial imbalance was addressed; communal areas decongested in places", 3],
          ["Benefits: new smallholder and commercial farmers; growth of smallholder tobacco; sense of sovereignty and justice", 3],
          ["Problems: fall in commercial output in the early 2000s; farm workers lost jobs; lack of title deeds limits loans; disputes and multiple ownership; compensation debated", 3],
          ["Supported judgement recognising that results vary by area, model and crop", 3],
        ],
        levels: levels(12),
        modelAnswer: "Land redistribution has brought important benefits. Many thousands of families received land and a means of living, and the deep imbalance created by colonial laws such as the Land Apportionment Act and the Land Tenure Act was addressed. Some overcrowded communal areas were relieved.\n\nNew smallholder and commercial farmers have emerged, and smallholder tobacco production has grown strongly. Supporters also see land reform as the fulfilment of a central aim of the liberation struggle and a source of national pride.\n\nHowever, there have also been serious problems. Commercial farm output fell sharply in the early 2000s, contributing to food shortages and lost export earnings. Many farm workers lost their jobs and homes. Many new farmers hold permits or offer letters rather than title deeds, so banks are reluctant to lend to them, and there have been disputes over boundaries and cases of multiple farm ownership. The question of compensation remained unresolved for many years.\n\nIn conclusion, I partly agree. Land redistribution has benefited many families and corrected a historic injustice, but the benefits have been uneven and reduced by the disruption that accompanied fast-track reform. Its results depend greatly on the area, the model and the support given to new farmers.",
        explanation: "Level 4 (10-12): both sides developed with examples and a supported judgement.",
      }),
    ]),
    hints: ["In (b), weigh benefits against problems and avoid slogans."],
    explanation: "Section B essay on land redistribution since 1980.",
  });
});
