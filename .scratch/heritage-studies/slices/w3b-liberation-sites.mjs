// W3b: Liberation war heritage sites (her.heritage.liberation-sites).
// Reviewer notes: dates from the BRIEF reference list. Casualty figures are given only as approximate, labelled
// estimates (Nyadzonia over 1,000; Chimoio over 1,000 to several thousand; Freedom Camp hundreds). Mkushi (Zambia,
// a ZIPRA camp housing many young women, attacked in the October 1978 raids) and Tembue (attacked in the Chimoio
// operation, November 1977): reviewer to confirm. No MCQ hinges on a casualty figure.
import { concept, P, source, levels } from "../lib.mjs";

concept("her.heritage.liberation-sites", { file: "heritage/liberation-sites", keyPrefix: "heritage.liberation-sites" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which country is the Chimoio liberation war heritage site?",
    options: [
      ["Mozambique", "Correct: Chimoio is in Mozambique."],
      ["Zambia", "Freedom Camp and Mkushi are in Zambia, not Chimoio."],
      ["Tanzania", "Tanzania hosted training camps, but Chimoio is not there."],
      ["Angola", "Angola hosted some camps, but Chimoio is not there."],
    ],
    answer: "A",
    explanation: "Chimoio is in central Mozambique; the camp there was attacked on 23 November 1977.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On which date was the Nyadzonia camp attacked?",
    options: [
      ["9 August 1976", "Correct: Nyadzonia was attacked on 9 August 1976."],
      ["23 November 1977", "This is the date of the Chimoio attack."],
      ["19 October 1978", "This is the date of the Freedom Camp attack."],
      ["28 April 1966", "This is the date of the Battle of Chinhoyi."],
    ],
    answer: "A",
    explanation: "Nyadzonia, Mozambique, 9 August 1976; Chimoio, 23 November 1977; Freedom Camp, 19 October 1978.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Freedom Camp, attacked in October 1978, was a camp of which liberation movement?",
    options: [
      ["ZAPU (ZIPRA)", "Correct: Freedom Camp near Lusaka was a ZIPRA camp."],
      ["ZANU (ZANLA)", "ZANLA's main camps were in Mozambique, such as Chimoio."],
      ["FRELIMO", "FRELIMO was Mozambique's liberation movement."],
      ["the ANC of South Africa", "The ANC was South Africa's movement."],
    ],
    answer: "A",
    explanation: "Freedom Camp, near Lusaka in Zambia, belonged to ZAPU and its army ZIPRA.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did many young Zimbabweans live in camps in neighbouring countries during the liberation war?",
    options: [
      ["They left to train as fighters or to escape danger as refugees", "Correct: the camps held recruits, fighters and refugees."],
      ["They were sent abroad by the Rhodesian government to study at foreign universities", "The Rhodesian government did not send them."],
      ["They went to work on farms owned by the camps", "The camps were not farms employing workers."],
      ["They were moved there under the Lancaster House Agreement", "Lancaster House came at the end of the war, in 1979."],
    ],
    answer: "A",
    explanation: "Thousands crossed the borders to join ZANLA or ZIPRA or to escape the dangers of the war.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which group of countries supported the liberation movements and hosted their camps?",
    options: [
      ["the Frontline States", "Correct: Tanzania, Zambia, Botswana, Mozambique and Angola."],
      ["the Non-Aligned Movement's founding members", "The NAM was founded in 1961 by countries elsewhere, such as India and Yugoslavia."],
      ["the members of the Federation", "The Federation of Rhodesia and Nyasaland ended in 1963."],
      ["the Commonwealth's European members", "Camps were in African countries."],
    ],
    answer: "A",
    explanation: "The Frontline States hosted refugees and liberation movements and suffered attacks and economic hardship as a result.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why should casualty figures for Nyadzonia and Chimoio be described as estimates?",
    options: [
      ["Sources disagree and no complete count of the dead was possible", "Correct: the figures are approximate."],
      ["The attacks are only legends and did not really happen", "The attacks are well documented historical events."],
      ["Nobody died at the camps, so the numbers are invented", "Many people died; only the exact number is uncertain."],
      ["The numbers are a state secret and may never be discussed in any school", "They may be discussed; they are simply approximate."],
    ],
    answer: "A",
    hints: ["Think about how the dead could be counted after a raid during a war."],
    explanation: "Records were incomplete and different sides gave different figures, so historians give ranges and estimates.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A school in Bindura holds a short ceremony every 23 November, with a reading and a minute of silence. Which site is it commemorating?",
    options: [
      ["Chimoio", "Correct: Chimoio was attacked on 23 November 1977."],
      ["Nyadzonia", "Nyadzonia was attacked on 9 August 1976."],
      ["Freedom Camp", "Freedom Camp was attacked on 19 October 1978."],
      ["Great Zimbabwe", "Great Zimbabwe is a pre-colonial monument, not a liberation war site."],
    ],
    answer: "A",
    hints: ["Match the date to the site."],
    explanation: "23 November is the anniversary of the attack on Chimoio in 1977.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement **best** explains why preserving liberation war sites outside Zimbabwe needs regional cooperation?",
    options: [
      ["The land is under the host country's law, while the memory belongs to both nations", "Correct: neither country can preserve them fully alone."],
      ["Zimbabwe owns the land on which the former camps were built", "The land belongs to the host countries."],
      ["The host countries have no interest in the history of the war", "Host countries suffered too and share the history."],
      ["Only UNESCO may decide what happens at liberation war sites in other countries, under international law", "These sites are not World Heritage Sites managed through UNESCO."],
    ],
    answer: "A",
    hints: ["Whose land is it, and whose history?"],
    explanation: "Zimbabwe needs the host country's permission and help, and both countries share the history, so cooperation is essential.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Freedom Camp is in Mozambique.",
    answer: false,
    explanation: "False. Freedom Camp was near Lusaka in Zambia. Nyadzonia and Chimoio are in Mozambique.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The camps attacked during the war held refugees and students as well as fighters.",
    answer: true,
    explanation: "True. Survivors and the liberation movements stress that the camps held large numbers of refugees, students and unarmed people; the Rhodesian government described them as military bases.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each liberation war site with its country.",
    pairs: ["Nyadzonia", "Freedom Camp", "Chimoio", "Mkushi"],
    right: ["Mozambique", "Zambia", "Tanzania"],
    rightIndex: [0, 1, 0, 1],
    explanation: "Nyadzonia and Chimoio are in Mozambique; Freedom Camp and Mkushi are in Zambia.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    stem: "Complete the timeline.",
    template: "Nyadzonia was attacked in {{blank:a}}, Chimoio in {{blank:b}} and Freedom Camp in {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["August 1976"], choices: ["August 1976", "November 1977", "October 1978", "April 1980"] },
      { id: "b", accepted: ["November 1977"], choices: ["November 1977", "August 1976", "October 1978", "December 1979"] },
      { id: "c", accepted: ["October 1978"], choices: ["October 1978", "August 1976", "November 1977", "December 1972"] },
    ],
    hints: ["The three attacks came in three different years, one after another."],
    explanation: "Nyadzonia 9 August 1976; Chimoio 23 November 1977; Freedom Camp 19 October 1978.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Identify **three** liberation war heritage sites outside Zimbabwe and the country each is in.",
    points: [
      "Any one of: Nyadzonia (Mozambique), Chimoio (Mozambique), Tembue (Mozambique), Freedom Camp (Zambia), Mkushi (Zambia), or another correctly placed camp",
      "A second site with its country",
      "A third site with its country",
    ],
    modelAnswer: "Nyadzonia in Mozambique, Chimoio in Mozambique and Freedom Camp in Zambia.",
    explanation: "One mark for each site correctly placed.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why it is important to preserve liberation war heritage sites.",
    points: [
      "Identifies remembrance / respect for the dead",
      "Develops: the sites are graves; caring for them honours those who died and comforts families",
      "Identifies history and education / identity / regional solidarity",
      "Develops: e.g. they show young people the cost of independence, or remind Zimbabweans of the support of the Frontline States",
    ],
    modelAnswer: "The sites are graves of people who died for independence, so caring for them honours the dead and comforts their families. They are also evidence of the war that teaches young Zimbabweans what independence cost and reminds them of the help given by neighbouring countries.",
    hints: ["Think of the dead and of the young."],
    explanation: "One mark for each reason and one for its development.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Many survivors of the camps are now elderly. Suggest **two** ways their memories could be preserved, and explain why each is useful.",
    points: [
      "Suggests recorded interviews (oral history) by schools, museums or archives, with permission",
      "Explains that first-hand accounts are kept after survivors die and can be used by historians",
      "Suggests publishing or displaying the accounts (books, museum displays, school projects)",
      "Explains that this shares the history widely and accurately with young people",
    ],
    modelAnswer: "Schools, museums and the national archives could record interviews with survivors, with their permission, so that first-hand accounts are kept after they have died and can be used by historians. The accounts could then be published or shown in museum displays and school projects, so that young people learn the history accurately.",
    hints: ["How do we keep a memory after the person who holds it has gone?"],
    explanation: "One mark for each suggestion and one for its explanation.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: source("Source A", "an extract from a fictional school magazine, Mutare, 2026",
      "Our Form 4 heritage club joined an anniversary visit to a memorial in Mozambique. A grandmother who had lived in the camp as a teenager told us how the people of the area had shared food with the refugees. We laid flowers next to a plaque with names, and officials from both countries spoke about the friendship between our nations. On the bus home, nobody spoke for a long time.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which statement about the source is supported by the evidence?",
        options: [
          ["Local people in Mozambique helped Zimbabwean refugees", "Correct: the grandmother says they shared food with the refugees."],
          ["The memorial was built by the heritage club", "The club visited the memorial; it did not build it."],
          ["Only Zimbabwean officials attended the visit", "Officials from both countries spoke."],
          ["The grandmother was a commander of the fighters in the camp", "She lived there as a teenager; nothing says she was a commander."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** ways in which the people at the memorial commemorated the past.",
        points: ["Laying flowers by the plaque", "Speeches by officials / listening to a survivor's account"],
        modelAnswer: "They laid flowers next to the plaque, and officials gave speeches (a survivor also told her story).",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain what the source suggests about the importance of such sites.",
        points: [
          "They keep alive memories of survivors and of those who died",
          "They show and strengthen friendship and cooperation between Zimbabwe and Mozambique",
          "They move and educate young people (the silence on the bus shows the visit affected them)",
        ],
        modelAnswer: "The site keeps alive the memories of survivors such as the grandmother and of those whose names are on the plaque. The speeches show that it strengthens friendship between Zimbabwe and Mozambique. The silence on the bus suggests that the visit moved the pupils and taught them the cost of independence.",
      }),
    ],
    hints: ["In (c), use details: the grandmother, the officials, the silence."],
    explanation: "A source-based practice item on the importance of liberation war heritage sites.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about liberation war heritage sites in neighbouring countries.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe what happened at **two** liberation war heritage sites in neighbouring countries.",
        points: [
          ["One site described with country, date and event, e.g. Nyadzonia, Mozambique, 9 August 1976: a camp holding many refugees attacked by Rhodesian forces; estimated over 1,000 dead", 2],
          ["A second site described, e.g. Chimoio, 23 November 1977, or Freedom Camp, Zambia, 19 October 1978 (ZIPRA camp attacked from the air; hundreds estimated dead)", 2],
        ],
        modelAnswer: "At Nyadzonia in Mozambique, on 9 August 1976, Rhodesian forces attacked a camp that held thousands of people, many of them refugees; over 1,000 are estimated to have died. At Freedom Camp near Lusaka in Zambia, on 19 October 1978, Rhodesian aircraft attacked a ZIPRA camp, and hundreds are estimated to have died.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Preserving liberation war sites in other countries is worth the effort and cost.\" Discuss.",
        points: [
          ["For: remembrance of the dead and comfort for families; evidence of history", 2],
          ["For: regional solidarity and friendship; education of young people", 2],
          ["Against or difficulties: distance and cost, other urgent needs, incomplete records, dependence on host countries", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Preserving the sites has strong value. They are the graves of many people who died for independence, and caring for them honours the dead and comforts their families. They are evidence of the war, which helps historians and teaches young people what independence cost. They also remind Zimbabweans of the help given by Mozambique and Zambia, strengthening friendship in the region.\n\nThere are difficulties. The sites are far away and expensive to reach and maintain, and some people argue that the money is needed for schools and hospitals. Records are incomplete, some graves are unmarked, and the work depends on the cooperation of host countries.\n\nOn balance, preservation is worth the effort. The costs can be shared through cooperation and kept low by combining memorials with recorded testimony and school projects, while the value for memory, healing and regional friendship cannot be replaced.",
      }),
    ],
    hints: ["In (b), weigh memory and solidarity against cost and practical difficulty."],
    explanation: "A practice evaluative item on preserving liberation war heritage sites.",
  });

  b.card("DEFINITION", "Liberation war heritage site", "A place linked to the struggle for independence, such as a former camp or burial ground, preserved for its historical and emotional importance.");
  b.card("FACT", "When and where was the Nyadzonia attack?", "9 August 1976, in Mozambique.");
  b.card("FACT", "When and where was the Chimoio attack?", "23 November 1977, in Mozambique.");
  b.card("FACT", "When and where was the Freedom Camp attack?", "19 October 1978, near Lusaka in Zambia (a ZIPRA camp).");
  b.card("DEFINITION", "Frontline States", "Independent countries near white-ruled southern Africa, such as Tanzania, Zambia, Botswana, Mozambique and Angola, that supported the liberation movements.");
  b.card("DEFINITION", "Refugee", "A person who has fled his or her country because of war, persecution or danger and lives in another country for safety.");
  b.card("CONCEPT", "Why are casualty figures for the camp attacks given as estimates?", "Records were incomplete and sources disagree, so historians give approximate ranges.");
  b.card("CONCEPT", "Why are liberation war sites important?", "Remembrance of the dead, evidence of history, national identity, regional solidarity, healing and education.");
  b.card("CONCEPT", "Why does preserving sites abroad need cooperation?", "The land is under the host country's law while the history is shared, so both countries must work together on access, care and ceremonies.");
});
