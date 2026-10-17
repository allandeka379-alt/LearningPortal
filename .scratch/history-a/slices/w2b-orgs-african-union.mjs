// W2b: ahist.orgs.african-union (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.orgs.african-union", { file: "orgs/african-union", keyPrefix: "orgs.african-union" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date was the Organisation of African Unity (OAU) founded?",
    options: [
      ["25 May 1963", "Correct: celebrated as Africa Day."],
      ["9 July 2002", "This is the date on which the African Union was launched."],
      ["24 October 1945", "This is the date on which the UN Charter came into force."],
      ["18 April 1980", "This is the date of Zimbabwe's independence."],
    ],
    answer: "A",
    explanation: "The OAU Charter was signed at Addis Ababa on 25 May 1963.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the main task of the OAU Liberation Committee?",
    options: [
      ["To support liberation movements fighting colonial and white-minority rule", "Correct: it gave money, training and arms."],
      ["To organise elections in every independent African state each year", "It did not run elections."],
      ["To control trade between African states and the countries of Europe", "It did not control trade."],
      ["To command a standing African army that kept order in every country", "The OAU had no standing army."],
    ],
    answer: "A",
    explanation: "The Liberation Committee, based in Dar es Salaam, channelled funds, training and arms to liberation movements.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In which city was the African Union launched in July 2002?",
    options: [
      ["Durban", "Correct: South Africa's President chaired the first Assembly."],
      ["Lomé", "The Constitutive Act was adopted at Lomé in 2000."],
      ["Sirte", "The Sirte Declaration of 1999 called for a union."],
      ["Dar es Salaam", "This was the base of the Liberation Committee."],
    ],
    answer: "A",
    explanation: "The AU was launched at Durban on 9 July 2002; the Constitutive Act had been adopted at Lomé in 2000.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", daily: true,
    stem: "How did the principle of intervention in the AU differ from that of the OAU?",
    options: [
      ["The AU may intervene in grave cases such as genocide; the OAU stressed non-interference", "Correct: this is Article 4(h) of the Constitutive Act."],
      ["The AU forbids all intervention in every single case, while the OAU always intervened in other states", "The OAU stressed non-interference."],
      ["The AU and OAU both allowed any member state to attack any other member state", "Neither organisation allowed this."],
      ["The AU lets non-African states decide when and where Africans should intervene", "The decision belongs to the AU."],
    ],
    answer: "A",
    hints: ["Think of the Constitutive Act and genocide."],
    explanation: "Article 4(h) of the Constitutive Act gives the AU the right to intervene in grave circumstances; the OAU's central principle was non-interference.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What did the Cairo Declaration of 1964 decide about the colonial borders of Africa?",
    options: [
      ["That states should respect the borders they inherited at independence", "Correct: the aim was to avoid border wars."],
      ["That all borders should be redrawn according to the language of each people", "It confirmed the existing borders."],
      ["That Europe should draw new borders for Africa by treaty", "That was the aim of the nineteenth-century partition."],
      ["That the borders of Africa should be abolished on the same day", "This did not happen."],
    ],
    answer: "A",
    hints: ["Think of the OAU's wish to avoid border wars."],
    explanation: "The Cairo Declaration confirmed the principle of respecting the borders inherited at independence, although they were drawn by colonial powers.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which was a major weakness of the OAU?",
    options: [
      ["It had no armed force, and non-interference limited its action", "Correct: it could not act against internal abuse."],
      ["It had too many soldiers and used them to rule member states by force", "It had no soldiers."],
      ["It refused to support any liberation movement in southern Africa at any time", "It supported several."],
      ["It enforced every decision with sanctions against its own members and their leaders", "Its decisions were not binding."],
    ],
    answer: "A",
    hints: ["Think about enforcement and sovereignty."],
    explanation: "The OAU lacked force and money, and its non-interference principle meant it did not act when governments mistreated their people.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which pairing of body and its role is correct?",
    options: [
      ["Peace and Security Council: handles conflict prevention and peace operations", "Correct: operational from 2004."],
      ["Pan-African Parliament: the AU organ that commands the African military forces", "It is a parliamentary organ, not a command."],
      ["African Court on Human and Peoples' Rights: the body that sets the AU's budget", "It is a court."],
      ["Liberation Committee: the AU organ that supports the African Union's anti-piracy force", "It was an OAU body."],
    ],
    answer: "A",
    hints: ["Match each organ with its function."],
    explanation: "The Peace and Security Council, operational from 2004, handles conflict prevention and peace operations.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which point best supports the view that the AU is more effective than the OAU?",
    options: [
      ["It has sent peace operations and suspended governments after coups", "Correct: it has acted where the OAU rarely did."],
      ["It meets once a year at a summit of leaders, as the OAU did", "This shows similarity, not greater effect."],
      ["It has its headquarters in Addis Ababa, as the OAU had before it", "This shows continuity."],
      ["It depends on outside funding for much of its programme of work", "This is a weakness."],
    ],
    answer: "A",
    hints: ["Look for evidence of new action."],
    explanation: "The AU has deployed peace operations (for example in Burundi, Darfur and Somalia) and has suspended governments after coups, which the OAU seldom did.",
  });
  b.tf({
    d: 1, skill: "RECALL", stem: "The OAU was replaced by the African Union in 2002.", answer: true,
    explanation: "The AU was launched at Durban on 9 July 2002.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, stem: "The OAU Charter was signed by 32 independent African states in 1963.", answer: true,
    explanation: "Thirty-two states signed the Charter at Addis Ababa on 25 May 1963.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", stem: "Agenda 2063 is a plan for the OAU's work on decolonisation in the 1960s.", answer: false,
    hints: ["The number 2063 is fifty years after 2013."],
    explanation: "Agenda 2063 was adopted by the AU in 2015 as a 50-year plan for growth, integration and development.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term to its meaning.",
    pairs: [
      ["Pan-Africanism", "Belief in African unity and shared interest"],
      ["Non-interference", "States do not intervene in each other's internal affairs"],
      ["Agenda 2063", "The AU's 50-year plan for Africa's development"],
      ["AfCFTA", "The African Continental Free Trade Area"],
    ],
    explanation: "These are key terms for the OAU and the AU.",
  });
  {
    const events = [
      "The OAU is founded at Addis Ababa",
      "The African Charter on Human and Peoples' Rights is adopted",
      "The Constitutive Act of the AU is adopted at Lomé",
      "The AU adopts Agenda 2063",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1963, 1981, 2000 and 2015."],
      explanation: "1963; 1981; 2000; 2015.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The OAU was founded in {{blank:a}} and the African Union was launched in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["1963"], choices: ["1945", "1963", "1980", "1992"] },
      { id: "b", accepted: ["2002"], choices: ["1999", "2002", "2008", "2015"] },
    ],
    explanation: "The OAU in 1963; the AU in 2002.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which city is the headquarters of the OAU and the African Union Commission?",
    accepted: ["Addis Ababa", "addis ababa"],
    wrong: ["Durban"],
    explanation: "**Addis Ababa**, the capital of Ethiopia.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the aims of the OAU.",
    points: ["To promote the unity and solidarity of African states", "To co-ordinate and intensify co-operation for development", "To defend the sovereignty and territorial integrity of members", "To eradicate colonialism from Africa and promote international co-operation"],
    modelAnswer: "The OAU aimed to promote the unity and solidarity of African states and to co-ordinate their co-operation for development. It aimed to defend the sovereignty and territorial integrity of its members and to rid Africa of colonialism, while promoting international co-operation.",
    explanation: "One mark for each aim described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the OAU was replaced by the African Union.",
    points: [["Its main task of ending colonialism was nearly complete, and it had been unable to stop wars, dictatorship and genocide because of the rule of non-interference", 2], ["African leaders wanted a stronger body to promote integration, development and good governance in an era of globalisation", 2]],
    hints: ["Think of what the OAU could not do and of what Africa now needed."],
    modelAnswer: "The OAU's main task of ending colonialism was nearly complete, and it had been unable to stop wars, dictatorships and genocide because of its rule of non-interference. African leaders wanted a stronger body to promote integration, development and good governance in an age of globalisation.",
    explanation: "Credit developed reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the OAU helped the liberation struggle in southern Africa.",
    points: [["Through the Liberation Committee it gave money, training and arms to liberation movements, including those of Zimbabwe", 2], ["It kept colonialism and apartheid on the agenda of the UN and isolated white-minority regimes diplomatically, with the Frontline States giving bases and support", 2]],
    hints: ["Give a practical help and a diplomatic help."],
    modelAnswer: "Through its Liberation Committee the OAU gave money, training and arms to liberation movements, including those of Zimbabwe. It also kept colonialism and apartheid on the agenda of the UN and isolated the white-minority regimes diplomatically, while the Frontline States gave bases and support.",
    explanation: "Credit developed help.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a speech by a fictional African foreign minister at an OAU summit, 1964",
        "We have no wish to see our borders redrawn, for that would be a road to endless wars. Let each state keep the frontiers it received, and let us unite to remove the last colonial regimes from our continent."),
      "",
      source("Source B", "an editorial in a fictional African newspaper, 1995",
        "The Organisation has done well to rid us of colonialism, but a government may kill its own citizens and our Organisation will say that this is none of its business. If it cannot act, what use is its unity?"),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What two aims does the minister in Source A describe?", points: ["To keep the frontiers inherited at independence / avoid border wars", "To unite to remove the last colonial regimes from the continent"] }),
      P.manual({ label: "(b)", marks: 2, stem: "What criticism of the Organisation is made in Source B?", points: ["It rid Africa of colonialism but does not act when a government kills its own citizens", "Its rule of non-interference means that unity is of little use"] }),
      P.manual({ label: "(c)", marks: 4, stem: "How far do the sources agree about the OAU?", type: "EXTENDED_RESPONSE", levels: levels(4), points: [["Agree that the OAU's main success was the fight against colonialism", 1], ["Disagree on emphasis: A is hopeful and stresses unity and borders, B criticises the rule of non-interference", 1], ["Provenance: A is a speech at the start by a minister promoting the new organisation; B is an editorial in 1995 judging its record", 1], ["Own knowledge: the OAU helped decolonisation but failed in conflicts such as Rwanda, 1994", 1]], modelAnswer: "The sources agree that the OAU's great purpose was to end colonialism. They differ in emphasis. Source A, a minister speaking at the start, is hopeful and stresses unity and respect for borders, while Source B, an editorial written in 1995, criticises the rule of non-interference that stopped the Organisation from acting when governments killed their own citizens. My own knowledge supports both: the OAU helped decolonisation, but it failed to prevent conflicts such as the genocide in Rwanda in 1994." }),
    ],
    hints: ["For (c), consider when each source was written."],
    explanation: "Both sources are invented: a minister's speech and a newspaper editorial.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 200, max: 450 },
    stem: "To what extent was the Organisation of African Unity successful between 1963 and 2002?",
    levels: levels(12),
    points: [
      ["Aims: unity, sovereignty, end of colonialism, co-operation", 2],
      ["Successes: Liberation Committee and decolonisation, a united voice at the UN, respect for borders, refugee convention and the African Charter, mediation", 4],
      ["Failures: no force or money, non-interference, tolerance of dictators, failure in Nigeria, Rwanda, Liberia and Somalia", 3],
      ["Change over time and the move to the AU", 1],
      ["Supported judgement", 2],
    ],
    hints: ["Compare success in decolonisation with failure on internal conflicts."],
    modelAnswer: "The OAU was successful in its main aim of decolonisation but much less successful in other respects. Its Liberation Committee gave money, training and arms to liberation movements and kept apartheid and colonialism before the UN, and the OAU gave Africa a united voice and respected borders, which limited border wars. It also adopted a refugee convention and the African Charter on Human and Peoples' Rights. But it had no force and little money, many members did not pay their dues, and its principle of non-interference meant that it could not act in the Nigerian civil war, the civil wars in Liberia and Somalia or the Rwandan genocide, and critics called it a club of presidents. I conclude that the OAU achieved its founding aim of ending colonialism and apartheid, but failed to protect Africans from conflict and misrule, which is why it was replaced by the African Union.",
    explanation: "Credit aims, successes, failures and a supported judgement.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of the African Union's right to intervene in grave circumstances.",
    levels: levels(8),
    points: [
      ["The provision: Article 4(h) allows intervention in cases of war crimes, genocide and crimes against humanity, and Article 30 allows suspension after coups", 2],
      ["Importance: a break with the OAU rule of non-interference, a response to Rwanda, a basis for peace operations", 2],
      ["Limits: reluctance of members, lack of resources, respect for sovereignty, selective use", 2],
      ["Judgement on how important the right has been", 2],
    ],
    hints: ["Compare the change on paper with action in practice."],
    modelAnswer: "The right to intervene in grave circumstances is an important change from the OAU. Article 4(h) allows intervention in cases of war crimes, genocide and crimes against humanity, and the AU can suspend governments that come to power by coups. It was a response to the failure to act in Rwanda and has provided a basis for peace operations in Burundi, Darfur and Somalia. But members are reluctant to give up sovereignty, resources are limited, and the right has been used selectively. I conclude that it is an important principle which has changed the AU's role, but its effect in practice has been limited by politics and money.",
    explanation: "Credit explained provision, limits and a judgement.",
  });

  b.card("DEFINITION", "What is Pan-Africanism?", "The belief that African people share a common history and interest and should work together for liberation and unity.");
  b.card("DEFINITION", "What was the OAU principle of non-interference?", "States should not intervene in each other's internal affairs; it limited the OAU's ability to act against abuses.");
  b.card("DEFINITION", "What is regional integration?", "The process by which neighbouring states reduce barriers to trade and movement: free trade area, customs union, common market, economic union.");
  b.card("FACT", "When and where was the OAU founded?", "25 May 1963 in Addis Ababa, by 32 independent African states.");
  b.card("FACT", "What was the OAU Liberation Committee?", "A committee based in Dar es Salaam that channelled money, training and arms to liberation movements, including those of Zimbabwe.");
  b.card("FACT", "When was the African Union launched?", "9 July 2002 in Durban, after the Constitutive Act of 2000.");
  b.card("FACT", "What are Agenda 2063 and the AfCFTA?", "Agenda 2063: the AU's 50-year development plan (2015); AfCFTA: the African Continental Free Trade Area (signed 2018, in force 2019).");
  b.card("CONCEPT", "Why was the OAU replaced by the AU?", "Decolonisation was complete, and the OAU could not act against wars and genocide because of non-interference; leaders wanted integration and development.");
  b.card("CONCEPT", "How does the AU differ from the OAU?", "It may intervene in grave circumstances, can suspend unconstitutional governments, and has more organs such as the Peace and Security Council and the Pan-African Parliament.");
});
