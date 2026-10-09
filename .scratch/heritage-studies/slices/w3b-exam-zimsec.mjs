// W3b exam-format items: ZIMSEC Heritage Studies Paper 2 Section A (ZIM_P2A, 10 marks: 2 + 3 + 5) x4 and Section B
// essays (ZIM_P2B, 20 marks: 8 + 12) x3. Part marks are our convention (reviewer to check against recent papers).
import { concept, P, source, levels, EXAM, checkExam } from "../lib.mjs";

const A = EXAM.ZIM_P2A;
const B = EXAM.ZIM_P2B;
const a = { skill: A.skill, secs: A.secs, examStyle: true, paper: "Paper 2" };
const bb = { skill: B.skill, secs: B.secs, examStyle: true, paper: "Paper 2" };

concept("her.heritage.national-symbols", { file: "exam/w3b-zimsec", keyPrefix: "exam.w3b-zimsec" }, (b) => {
  // ---------------------------------------------------------------- Section A 1: the national flag.
  b.struct({
    ...a, d: 3,
    concepts: ["her.heritage.national-symbols"],
    stem: "This question is about the national flag of Zimbabwe.",
    parts: checkExam(A, [
      P.fib({
        label: "(a)",
        stem: "Complete the statements.",
        template: "The national flag was adopted on {{blank:a}}. The section of the Constitution that names the national flag is section {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["18 April 1980"], choices: ["18 April 1980", "22 December 1987", "11 November 1965", "22 May 2013"] },
          { id: "b", accepted: ["4"], choices: ["4", "6", "56", "81"] },
        ],
        explanation: "The flag was adopted at independence on 18 April 1980; section 4 names the national flag, anthem, public seal and coat of arms.",
      }),
      P.match({
        label: "(b)",
        stem: "Identify what each part of the flag commonly stands for.",
        pairs: [
          ["yellow stripe", "mineral wealth"],
          ["black stripe", "the heritage of the majority of the people"],
          ["Zimbabwe Bird", "national identity and history"],
        ],
        extraRight: ["peace"],
        explanation: "Yellow: minerals; black: the majority; Zimbabwe Bird: identity and history. Peace is the white triangle.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Explain the importance of the national flag to Zimbabweans.",
        points: [
          "It is a symbol of national identity, recognised at home and abroad (e.g. at international sports events and embassies)",
          "so Zimbabweans and the world recognise the nation and its sovereignty",
          "It unites people of all languages, regions and faiths under one symbol",
          "so it promotes unity and patriotism",
          "It reminds citizens of history and values (the red stripe recalls the struggle; the white triangle peace) / it is used for national mourning at half-mast",
        ],
        modelAnswer: "The flag is a symbol of national identity. It is flown at embassies and raised at international sports events, so the world recognises Zimbabwe as a sovereign nation. It unites people of every language, region and faith under one symbol, which promotes unity and patriotism. Its colours also remind citizens of their history and values: the red stripe recalls the blood shed in the liberation struggle and the white triangle stands for peace.",
        explanation: "Two developed points (2 marks each) and one further point.",
      }),
    ]),
    hints: ["In (c), think of identity, unity and memory."],
    explanation: "Paper 2 Section A item on the national flag: adoption, meanings and importance.",
  });

  // ---------------------------------------------------------------- Section A 2: world heritage sites.
  b.struct({
    ...a, d: 3,
    concepts: ["her.heritage.world-heritage-sites"],
    stem: "This question is about World Heritage Sites in Zimbabwe.",
    parts: checkExam(A, [
      P.fib({
        label: "(a)",
        stem: "Complete the statements.",
        template: "World Heritage Sites are listed by {{blank:a}}. Zimbabwe has {{blank:b}} World Heritage Sites.",
        blanks: [
          { id: "a", accepted: ["UNESCO"], choices: ["UNESCO", "SADC", "COMESA", "the African Union"] },
          { id: "b", accepted: ["five"], choices: ["five", "three", "seven", "ten"] },
        ],
        explanation: "UNESCO keeps the World Heritage List; Zimbabwe has five sites.",
      }),
      P.match({
        label: "(b)",
        stem: "Identify whether each World Heritage Site was listed as a cultural or a natural site.",
        pairs: ["Great Zimbabwe", "Mana Pools, Sapi and Chewore", "Matobo Hills"],
        right: ["cultural site", "natural site"],
        rightIndex: [0, 1, 0],
        explanation: "Great Zimbabwe (1986) and the Matobo Hills (2003) are cultural sites; Mana Pools (1984) is a natural site.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Explain the benefits Zimbabwe gains from its World Heritage Sites.",
        points: [
          "Tourism: international recognition attracts visitors",
          "who pay fees and spend on hotels, guides and crafts, earning foreign currency and creating jobs",
          "Conservation support: expert advice, training and sometimes funding",
          "which helps protect the sites for future generations",
          "National pride / research and education / cooperation with Zambia at Victoria Falls",
        ],
        modelAnswer: "World Heritage status makes the sites known worldwide, so more international tourists visit. They pay fees and spend money on hotels, guides and crafts, which earns foreign currency and creates jobs. Listing also brings expert advice and training in conservation, which helps protect the sites for future generations. In addition, it builds national pride, because the world recognises the importance of Zimbabwe's history and nature.",
        explanation: "Two developed points (2 marks each) and one further point.",
      }),
    ]),
    hints: ["In (b), ask which sites were listed for what people built or believed."],
    explanation: "Paper 2 Section A item on World Heritage Sites: UNESCO, the cultural sites and the benefits of listing.",
  });

  // ---------------------------------------------------------------- Section A 3: ways of acquiring citizenship.
  b.struct({
    ...a, d: 3,
    concepts: ["her.constitution.citizenship"],
    stem: "This question is about Zimbabwean citizenship.",
    parts: checkExam(A, [
      P.mcq({
        label: "(a)", marks: 2,
        stem: "Which **best** defines citizenship?",
        options: [
          ["the legal status of being a member of a country, with rights and duties", "Correct: a full definition."],
          ["the place where a person happens to be living at present", "Residence is not the same as citizenship."],
          ["membership of a political party or club", "This is association, not citizenship."],
          ["the language a person speaks at home", "Language does not determine citizenship."],
        ],
        answer: "A",
        explanation: "Citizenship is the legal status of being a member of a country, which brings rights, privileges and duties.",
      }),
      P.match({
        label: "(b)",
        stem: "Identify how each person is (or may become) a Zimbabwean citizen.",
        pairs: [
          "Sipho, born in Bulawayo to Zimbabwean parents",
          "Chipo, born in Zambia to a Zimbabwean father who had settled and worked there for many years",
          "Mrs Moyo, born in Malawi, married to a Zimbabwean citizen for seven years, who has applied",
        ],
        right: ["by birth", "by descent", "by registration"],
        rightIndex: [0, 1, 2],
        explanation: "Born in Zimbabwe to citizens: by birth. Born abroad to a citizen parent: by descent. Married to a citizen for at least five years and applied: by registration.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Explain the importance of citizenship to an individual.",
        points: [
          "It gives a legal identity and a sense of belonging to a nation",
          "proved by documents (birth certificate, ID, passport) needed for school, exams, jobs and banking",
          "It gives political rights: voting from 18 and standing for office",
          "so the citizen can help choose leaders and shape the country",
          "It gives protection by the state at home and abroad (passport, embassies) / the right to live in Zimbabwe freely",
        ],
        modelAnswer: "Citizenship gives a person a legal identity and a sense of belonging to the nation. It is proved by documents such as a birth certificate, an identity card and a passport, which are needed for school, examinations, jobs and banking. Citizens have political rights: they may vote from 18 and stand for office, so they help choose leaders and shape the country. Citizens are also protected by the state, including help from embassies when they travel abroad.",
        explanation: "Two developed points (2 marks each) and one further point.",
      }),
    ]),
    hints: ["In (b), ask where each person was born and whether they applied."],
    explanation: "Paper 2 Section A item on the meaning, forms and importance of citizenship.",
  });

  // ---------------------------------------------------------------- Section A 4: the constitution-making process.
  b.struct({
    ...a, d: 3,
    concepts: ["her.constitution.making"],
    stem: "This question is about the making of the 2013 Constitution of Zimbabwe.\n\n" + source("Source A", "a notice of the kind put up in a fictional rural ward in 2012, described in words",
      "A handwritten notice on the door of a ward meeting hall invites all residents to an outreach meeting on Saturday at 10 a.m. It says that everyone, including women, youth and persons with disabilities, may speak in any language they choose, and that their views will be recorded for the drafting of the new constitution.", { described: true }),
    parts: checkExam(A, [
      P.fib({
        label: "(a)",
        stem: "Complete the statements.",
        template: "The new Constitution was approved in a referendum on {{blank:a}}. It was signed into law on {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["16 March 2013"], choices: ["16 March 2013", "22 May 2013", "February 2000", "21 December 1979"] },
          { id: "b", accepted: ["22 May 2013"], choices: ["22 May 2013", "16 March 2013", "18 April 1980", "February 2000"] },
        ],
        explanation: "Referendum: 16 March 2013. Signed into law: 22 May 2013.",
      }),
      P.fib({
        label: "(b)",
        stem: "Identify the ways in which citizens took part by completing the statements.",
        template: "Residents gave their views at {{blank:a}}. Churches, unions and other organisations sent written {{blank:b}}. Registered voters approved the draft in a {{blank:c}}.",
        blanks: [
          { id: "a", accepted: ["outreach meetings"], choices: ["outreach meetings", "court hearings", "party congresses", "cabinet meetings"] },
          { id: "b", accepted: ["submissions"], choices: ["submissions", "petitions to the courts", "tax returns", "passports"] },
          { id: "c", accepted: ["referendum"], choices: ["referendum", "by-election", "census", "court case"] },
        ],
        explanation: "Citizens gave views at outreach meetings (as in Source A), organisations sent submissions, and voters approved the draft in the referendum of 16 March 2013.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Using Source A and your own knowledge, explain why the outreach stage was important.",
        points: [
          "It collected the views of ordinary citizens across the country",
          "so the Constitution could reflect what people wanted (a home-grown, people-driven constitution)",
          "It included groups often left out (women, youth, persons with disabilities) and allowed any language (Source A)",
          "so the views of all sections of society could be heard",
          "It built ownership and legitimacy / prepared citizens to vote in the referendum",
        ],
        modelAnswer: "The outreach stage collected the views of ordinary citizens in wards across the country, so the new Constitution could reflect what the people wanted rather than being imposed. As Source A shows, women, youth and persons with disabilities were invited and could speak in any language, so all sections of society could be heard. Taking part also gave citizens a sense of ownership of the Constitution and prepared them to vote in the referendum.",
        explanation: "Two developed points (2 marks each) and one further point.",
      }),
    ]),
    hints: ["In (c), think of who was invited and why their views mattered."],
    explanation: "Paper 2 Section A item on the constitution-making process and citizens' participation.",
  });

  // ---------------------------------------------------------------- Section B 1: national events and shrines.
  b.struct({
    ...bb, d: 4,
    concepts: ["her.heritage.national-events", "her.heritage.monuments-shrines"],
    stem: "This question is about national events and national shrines.",
    parts: checkExam(B, [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "Describe **four** national events in Zimbabwe and what each commemorates.",
        points: [
          ["Independence Day, 18 April: independence in 1980", 2],
          ["Heroes Day (second Monday of August) and Defence Forces Day (the Tuesday): those who sacrificed in the liberation struggle and the defence forces", 2],
          ["Unity Day, 22 December: the Unity Accord of 1987 between ZANU (PF) and PF-ZAPU", 2],
          ["Africa Day, 25 May: founding of the OAU in 1963 / National Tree Planting Day, first Saturday of December: the importance of trees", 2],
        ],
        modelAnswer: "Independence Day, on 18 April, celebrates Zimbabwe's independence in 1980 with national and local celebrations, the raising of the flag, music and sport.\n\nHeroes Day, on the second Monday of August, honours those who died or sacrificed in the liberation struggle; the main ceremony is at the National Heroes Acre. It is followed on the Tuesday by Defence Forces Day, which recognises the defence forces.\n\nUnity Day, on 22 December, commemorates the Unity Accord of 1987 between ZANU (PF) and PF-ZAPU, which ended the conflict of the 1980s.\n\nAfrica Day, on 25 May, recalls the founding of the Organisation of African Unity in 1963 and celebrates African unity.",
        explanation: "Two marks per event: name and date, and what it commemorates.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "\"National events and shrines are important in building a united Zimbabwe.\" Discuss.",
        points: [
          ["For: events bring people of all backgrounds together; shared celebration builds unity and patriotism", 3],
          ["For: shrines such as the National Heroes Acre and provincial heroes acres keep memory of sacrifice; Unity Day promotes reconciliation; education of the young", 3],
          ["Against or limits: some citizens do not attend or feel events and choice of heroes are not inclusive; past conflicts need honest acknowledgement; events cannot remove poverty or division alone; cost", 3],
          ["Supported conclusion", 3],
        ],
        levels: levels(12),
        modelAnswer: "National events and shrines can do much to build unity. On Independence Day, people of every language, region and faith celebrate together, which builds patriotism and a shared identity. Heroes Day and the heroes acres keep alive the memory of those who sacrificed for independence, giving the nation a shared history. Unity Day directly promotes peace and reconciliation by recalling the Accord of 1987. Schools use these events and visits to shrines to teach young people the history and values of the nation.\n\nHowever, events and shrines have limits. Many citizens, especially in remote areas or those struggling to earn a living, do not attend. Some people feel that national events or decisions about who is honoured do not include everyone, and some communities feel that the suffering of the 1980s needs more open acknowledgement. Others question the cost of large celebrations. A ceremony on one day cannot remove poverty, inequality or political division.\n\nIn my view, national events and shrines are important to unity because they give citizens shared memories and symbols. They are most effective when they are inclusive, honest about the past and backed by fairness in everyday life; on their own they cannot build unity.",
        explanation: "Levels of response: the top level weighs the unifying role of events and shrines against their limits and reaches a supported judgement.",
      }),
    ]),
    hints: ["In (b), consider who takes part and who may feel left out."],
    explanation: "Paper 2 Section B essay on national events and shrines and national unity.",
  });

  // ---------------------------------------------------------------- Section B 2: access to natural resources since 1980.
  b.struct({
    ...bb, d: 4,
    concepts: ["her.heritage.resource-ownership", "her.heritage.natural-resources"],
    stem: "This question is about ownership of and access to natural resources.",
    parts: checkExam(B, [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "Describe how ownership of natural resources was organised during the colonial era.",
        points: [
          ["Land: divided by race (Land Apportionment Act 1930, Land Tenure Act 1969); best land for settlers; Africans in reserves", 2],
          ["Minerals: rights claimed by the BSAC and later the colonial state; mines owned by foreign and settler companies; Africans as labourers", 2],
          ["Wildlife: game laws barred most African hunting; parks run by the colonial state", 2],
          ["Forests and water: best forests reserved; water rights tied to land ownership, so large farms held most rights", 2],
        ],
        modelAnswer: "Land was divided by race under the Land Apportionment Act of 1930 and the Land Tenure Act of 1969. Most of the best-watered and most fertile land was reserved for white settlers, while Africans were crowded into reserves.\n\nMineral rights were claimed by the British South Africa Company and later held by the colonial state. Large mines were owned by foreign and settler companies, and Africans worked in them as labourers.\n\nGame laws made hunting by Africans illegal in most cases, and parks were run by the colonial state.\n\nThe best forests were reserved by the state or owned by settlers and companies, and rights to river water were tied to land ownership, so large farms held most of them.",
        explanation: "Two marks per resource: who owned or controlled it and how Africans were excluded.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "How far have government efforts since 1980 improved indigenous Zimbabweans' access to natural resources (other than land)?",
        points: [
          ["Improvements: Indigenisation and Economic Empowerment Act (2007) widened indigenous ownership; small-scale and artisanal miners; community share ownership trusts", 3],
          ["Improvements: CAMPFIRE (1989) income for communities; Water Act (1998) ended private ownership of water; constitutional objectives on local benefit", 3],
          ["Limits: elite capture and corruption; trusts received less than promised; residents near some mines saw little benefit; reduced investment; illegal mining damage; human-wildlife conflict", 3],
          ["Supported conclusion", 3],
        ],
        levels: levels(12),
        modelAnswer: "Government efforts have improved access in several ways. The Indigenisation and Economic Empowerment Act of 2007 required most larger businesses, including mines, to be majority-owned by indigenous Zimbabweans, and many more indigenous people now own mines and businesses than in 1980. Small-scale and artisanal miners, many of them local people, have become important gold producers. Community share ownership trusts were set up in some mining areas.\n\nIn wildlife areas, CAMPFIRE, from 1989, allowed rural district councils to earn income from hunting and tourism and share it with communities, paying for boreholes, classrooms and clinics. The Water Act of 1998 ended private ownership of water, so water rights no longer depended on owning large farms. The 2013 Constitution calls for local communities to benefit from resources in their areas.\n\nHowever, the improvements have been limited and uneven. Benefits have often gone to a small, well-connected group, and there have been cases of corruption. Some share ownership trusts received far less than promised, and people living near some mines say they have seen little benefit. Critics argue that the 51 per cent rule discouraged investment, which is one reason it was later narrowed. Illegal mining has damaged land and rivers, and villagers in wildlife areas suffer crop losses and danger from animals.\n\nOverall, the efforts have improved access to a fair extent in law and for some communities, but many ordinary Zimbabweans have gained little. Fair sharing, transparency and honest management would be needed for the policies to reach their aims.",
        explanation: "Levels of response: the top level gives recognised improvements and limitations with examples and reaches a supported judgement.",
      }),
    ]),
    hints: ["In (b), separate improvements in law from benefits in practice."],
    explanation: "Paper 2 Section B essay on ownership of and access to natural resources.",
  });

  // ---------------------------------------------------------------- Section B 3: how far the Declaration of Rights protects citizens.
  b.struct({
    ...bb, d: 4,
    concepts: ["her.constitution.declaration-of-rights", "her.constitution.contents"],
    stem: "This question is about the Declaration of Rights in the Constitution of Zimbabwe.",
    parts: checkExam(B, [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "Explain **four** rights found in the Declaration of Rights.",
        points: [
          ["A right named and explained, e.g. equality and non-discrimination (section 56): everyone equal before the law, no unfair discrimination", 2],
          ["A second right, e.g. freedom of expression and the media: people may speak and publish freely within the law", 2],
          ["A third right, e.g. education (section 75) or health care (section 76): duties on the state to provide basic services", 2],
          ["A fourth right, e.g. rights of arrested persons / a fair hearing / environmental rights (section 73) / marriage rights (section 78)", 2],
        ],
        modelAnswer: "Section 56 gives everyone the right to equality and non-discrimination: all people are equal before the law and may not be treated unfairly because of their sex, tribe, religion, disability or other grounds.\n\nFreedom of expression allows people to speak, write and publish their views, including criticism, as long as they do not incite violence or spread hate.\n\nSection 75 gives every citizen and permanent resident the right to a basic state-funded education, so children can learn and develop.\n\nArrested people have the right to be told why they were arrested, to contact a lawyer and to be brought before a court promptly, which protects them from unlawful detention.",
        explanation: "Two marks per right: identification and explanation.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "How far does the Declaration of Rights protect Zimbabwean citizens?",
        points: [
          ["Protection: wide range of rights; supremacy of the Constitution; duty on the state and every person (section 44)", 3],
          ["Protection: enforcement through courts (section 85) and the Zimbabwe Human Rights Commission and other commissions; limits must meet section 86 tests; some rights can never be limited", 3],
          ["Limits: low awareness of rights; cost and distance of legal action; social and economic rights depend on available resources; violations and weak enforcement in practice", 3],
          ["Supported conclusion", 3],
        ],
        levels: levels(12),
        modelAnswer: "The Declaration of Rights offers strong protection on paper. Chapter 4 covers a wide range of rights, from life, liberty and equality to education, health care and a clean environment. Because the Constitution is supreme, laws and conduct that violate these rights are invalid, and section 44 places a duty on the state and every person to respect them.\n\nThe Declaration also provides ways to enforce rights. Under section 85, any person may approach a court if a right is infringed, and the Zimbabwe Human Rights Commission receives and investigates complaints. Rights may be limited only by general laws that are fair, reasonable, necessary and justifiable, and some rights, such as freedom from torture, can never be limited.\n\nHowever, protection in practice is weaker. Many citizens do not know their rights, and legal action is costly and courts may be far away, especially for rural people. Social and economic rights, such as health care and education, depend on the resources the state has available, so many people still lack good services. Violations of rights continue to be reported, and enforcement is not always effective.\n\nIn conclusion, the Declaration of Rights protects citizens to a large extent in law and gives them real tools to defend their rights. How far it protects them in practice depends on awareness, access to justice, the resources of the state and the independence of the institutions that enforce it.",
        explanation: "Levels of response: the top level weighs legal protection and enforcement against practical limits and reaches a supported judgement.",
      }),
    ]),
    hints: ["In (b), separate protection in law from protection in practice."],
    explanation: "Paper 2 Section B essay on the Declaration of Rights and how far it protects citizens.",
  });
});
