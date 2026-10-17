// W2a: ahist.independence.political (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.independence.political", { file: "independence/political", keyPrefix: "independence.political" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date was the Unity Accord signed?",
    options: [
      ["22 December 1987", "Correct: ZANU (PF) and PF-ZAPU agreed to merge."],
      ["21 December 1979", "This is the date of the Lancaster House agreement."],
      ["18 April 1980", "This is the date of independence."],
      ["12 February 2000", "This is around the date of the constitutional referendum."],
    ],
    answer: "A",
    explanation: "The Unity Accord was signed on 22 December 1987.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What did Robert Mugabe's policy of reconciliation in 1980 mainly promise?",
    options: [
      ["Forgiveness of the past and a place in the state for all races", "Correct: it aimed to build a united nation."],
      ["Immediate seizure of all white-owned land without payment", "This was not the policy."],
      ["Removal of every white civil servant and judge from their posts", "Most were kept in office."],
      ["The banning of all parties other than ZANU (PF) from 1980", "No such ban was made in 1980."],
    ],
    answer: "A",
    explanation: "On 4 March 1980 Mugabe urged forgiveness and unity; whites and PF-ZAPU members were included in the government.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which two groups clashed at Entumbane near Bulawayo in November 1980 and February 1981?",
    options: [
      ["ZIPRA and ZANLA units awaiting integration into the new army", "Correct: the clashes showed the difficulty of integration."],
      ["ZANLA and the former Rhodesian army units who had surrendered", "These did not clash at Entumbane."],
      ["Supporters of the MDC and ZANU (PF) before the 2000 election", "The MDC was formed in 1999."],
      ["The Fifth Brigade and British soldiers sent to monitor the elections", "No such clash occurred."],
    ],
    answer: "A",
    hints: ["Think of the armies that had to be merged."],
    explanation: "Fighting between ZIPRA and ZANLA units at Entumbane in 1980 and 1981 showed the mistrust between the two armies.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What happened to Joshua Nkomo in February 1982?",
    options: [
      ["He was dismissed from the cabinet after arms were found on PF-ZAPU property", "Correct: this deepened the crisis."],
      ["He was elected the first executive president of the country by parliament", "Mugabe became executive president."],
      ["He formed the new MDC party in Bulawayo with Morgan Tsvangirai as his deputy", "The MDC was formed in 1999."],
      ["He was appointed governor of Matabeleland Province by the British High Commission", "He held no such post."],
    ],
    answer: "A",
    explanation: "Mugabe dismissed Nkomo and other PF-ZAPU ministers in February 1982 after the government announced the discovery of arms.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", daily: true,
    stem: "Which was a term of the Unity Accord of 1987?",
    options: [
      ["ZANU (PF) and PF-ZAPU merged to form one party", "Correct: the new party kept the name ZANU (PF)."],
      ["PF-ZAPU was banned and its leaders were put on trial for treason", "The parties merged; PF-ZAPU was not tried."],
      ["The 20 white seats were restored for another seven years", "White seats were abolished in 1987."],
      ["Zimbabwe became a one-party state by law in the following year", "The Accord did not create a legal one-party state."],
    ],
    answer: "A",
    hints: ["The result was one party."],
    explanation: "The two parties merged into ZANU (PF); an amnesty followed in 1988 and an executive presidency was created.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement about the disturbances in Matabeleland and the Midlands in the 1980s is most accurate?",
    options: [
      ["Civilians died in large numbers; estimates are disputed and the events are debated", "Correct: the true figures are not known."],
      ["The events were settled by a court judgment in 1983 and are not discussed now", "They are still discussed."],
      ["Only dissidents were killed and no civilians were affected in any way at all in the region", "Reports record civilian deaths."],
      ["The exact number of the dead is known from the official records to be exactly 5,000", "No official exact number exists."],
    ],
    answer: "A",
    hints: ["Remember how historians treat uncertain numbers."],
    explanation: "Reports by church and human-rights bodies and survivors record many civilian deaths; estimates differ and the events remain a matter of public debate.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which was a long-term result of the Unity Accord?",
    options: [
      ["A dominant-party system in which ZANU (PF) had little organised opposition", "Correct: opposition was weak until the 1990s."],
      ["The immediate return of all power to the white minority in the parliament", "White seats were abolished."],
      ["A new federation of the provinces, each with its own army and parties", "No such federation was created."],
      ["The abolition of the executive presidency and the return of a prime minister", "The executive presidency continued."],
    ],
    answer: "A",
    hints: ["Think about what remained after PF-ZAPU merged."],
    explanation: "The merger left a dominant ruling party, which narrowed party competition until new opposition groups arose in the 1990s.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which view of reconciliation after 1980 is best supported by the evidence?",
    options: [
      ["It kept skills and stability but left land and war grievances partly unaddressed", "Correct: both benefits and limits are supported."],
      ["It failed completely because every white person left the country in 1980 itself", "Most whites stayed in 1980."],
      ["It succeeded completely and no critic or historian has ever questioned it", "It was criticised."],
      ["It was abandoned in March 1980 as soon as the first cabinet was sworn in", "It continued in practice."],
    ],
    answer: "A",
    hints: ["Remember that historians balance benefits against costs."],
    explanation: "Reconciliation retained skills and avoided economic collapse, but critics point out that it delayed land reform and did little for the victims of the war.",
  });
  b.tf({
    d: 1, skill: "RECALL", stem: "The Fifth Brigade was deployed in Matabeleland North in January 1983.", answer: true,
    explanation: "The Fifth Brigade was deployed in January 1983, beginning the most violent phase of the disturbances.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, stem: "The Unity Accord was signed before the dismissal of Nkomo from the cabinet.", answer: false,
    explanation: "Nkomo was dismissed in February 1982; the Unity Accord was signed in December 1987.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", stem: "In the 1990s new opposition groups, including trade unions and civic groups, challenged the ruling party.", answer: true,
    hints: ["Think about the MDC and the NCA."],
    explanation: "Trade unions, students and civic groups criticised the government in the 1990s, leading to the MDC in 1999.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term or name to its meaning.",
    pairs: [
      ["Reconciliation", "The policy of forgiveness and inclusion announced in March 1980"],
      ["Entumbane", "Site of the 1980-81 clashes between ZIPRA and ZANLA units"],
      ["Unity Accord", "The 1987 agreement that merged ZANU (PF) and PF-ZAPU"],
      ["MDC", "The opposition party formed in 1999 from unions and civic groups"],
    ],
    explanation: "These are the key terms for the period.",
  });
  {
    const events = [
      "Mugabe's reconciliation speech",
      "Nkomo is dismissed from the cabinet",
      "The Unity Accord is signed",
      "The Movement for Democratic Change is formed",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1980, 1982, 1987 and 1999."],
      explanation: "March 1980; February 1982; December 1987; 1999.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Unity Accord of {{blank:a}} merged ZANU (PF) with {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["1987"], choices: ["1987", "1980", "1982", "1990"] },
      { id: "b", accepted: ["PF-ZAPU"], choices: ["PF-ZAPU", "the MDC", "UANC", "the Rhodesian Front"] },
    ],
    explanation: "The Unity Accord of 1987 merged ZANU (PF) with PF-ZAPU.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which party, formed in 1999 by Morgan Tsvangirai and others, challenged ZANU (PF)? Give its initials.",
    accepted: ["MDC", "the MDC", "M.D.C.", "Movement for Democratic Change"],
    wrong: ["ZAPU"],
    explanation: "The **MDC**, the Movement for Democratic Change.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the policy of reconciliation after independence in 1980.",
    points: ["Mugabe urged forgiveness of the past and national unity in March 1980", "PF-ZAPU members and two white ministers were included in the government", "White civil servants, judges and officers kept their posts", "The Lancaster House terms on land and property were accepted"],
    modelAnswer: "In March 1980 Mugabe urged forgiveness of the past and national unity. PF-ZAPU members and two white ministers joined the government, white civil servants, judges and officers kept their posts, and the Lancaster House terms on land and property were accepted.",
    explanation: "One mark for each feature described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the integration of the armies was difficult after independence.",
    points: [["ZANLA and ZIPRA fighters distrusted each other because of their rivalry in the war and the split of 1963", 2], ["They had been trained by different powers and had to merge with former Rhodesian forces, which caused tension and clashes such as Entumbane", 2]],
    hints: ["Think of the history of the two armies."],
    modelAnswer: "ZANLA and ZIPRA fighters distrusted each other because of rivalry in the war and the split of 1963. They had been trained by different powers and had to merge with former Rhodesian forces, which caused tension and clashes such as those at Entumbane.",
    explanation: "Credit developed reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Unity Accord was signed in 1987.",
    points: [["The violence in Matabeleland and the Midlands had cost lives and harmed the economy, and both sides wished to end it", 2], ["PF-ZAPU was weakened and Nkomo and Mugabe had been talking since 1985, so a merger gave Mugabe a united party and ZAPU a share in government", 2]],
    hints: ["Give one reason about violence and one about the two parties."],
    modelAnswer: "The violence in Matabeleland and the Midlands had cost lives and harmed the economy, and both sides wished to end it. PF-ZAPU was weakened and Nkomo and Mugabe had been talking since 1985, so a merger gave Mugabe a united party and ZAPU a share in government.",
    explanation: "Credit developed reasons.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a speech by a fictional government minister at a party meeting, 1988",
        "The Accord has ended the violence and joined the people in one party. Let the past be a lesson. We now go forward as one nation to build schools, clinics and farms. Those who still doubt will see that unity serves all."),
      "",
      source("Source B", "a recollection by a fictional resident of a village in Matabeleland South, told in 2015",
        "When the Accord came, the shooting stopped, and we were glad. But no one told us what happened to our relatives. We were asked to forget. We cannot forget what we lost."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A say the Accord achieved?", points: ["It ended the violence and joined the people in one party", "It allowed the country to go forward as one nation to build schools, clinics and farms"] }),
      P.manual({ label: "(b)", marks: 2, stem: "How does the view in Source B differ from that in Source A?", points: ["B is glad that the shooting stopped but says that grievances remained", "B says people were asked to forget and were not told what happened to relatives, whereas A looks forward"] }),
      P.manual({ label: "(c)", marks: 4, stem: "How useful are these sources as evidence of the effects of the Unity Accord?", type: "EXTENDED_RESPONSE", levels: levels(4), points: [["A is a political speech that presents the Accord positively, so it shows the government's aim rather than all effects", 1], ["B is a villager's memory, which shows relief and continuing grievances, but it comes from one person decades later", 1], ["Own knowledge: the Accord ended the dissident conflict and brought an amnesty, but many survivors still seek acknowledgement", 1], ["Judgement: they are useful together, showing both the stated aims and the lasting concerns", 1]], modelAnswer: "Source A is a political speech presenting the Accord positively, so it shows the government's aims rather than all its effects. Source B is a villager's memory, which shows relief that the shooting stopped and continuing grievances, but it comes from one person decades later. My own knowledge confirms that the Accord ended the dissident conflict and brought an amnesty, while many survivors still seek acknowledgement. Together the sources are useful for showing both the stated aims and the lasting concerns." }),
    ],
    hints: ["For (c), think about speaker, date and purpose."],
    explanation: "Both sources are invented: a minister's speech and a villager's recollection.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 200, max: 450 },
    stem: "To what extent was the Unity Accord of 1987 a success?",
    levels: levels(12),
    points: [
      ["Successes: ended the dissident conflict and the worst of the violence; amnesty; a united party and national stability", 3],
      ["Limits: it left many survivors' grievances unaddressed; the number of dead and the causes remained debated", 3],
      ["Political effects: a dominant-party system, an executive presidency and weak opposition", 2],
      ["Different views: government and ZAPU leaders stress peace; critics stress lack of acknowledgement and political cost", 2],
      ["Supported judgement", 2],
    ],
    hints: ["Weigh the end of violence against the lack of acknowledgement and the political effects."],
    modelAnswer: "The Unity Accord was a success in ending the violence but a limited one in other ways. It joined ZANU (PF) and PF-ZAPU, brought an amnesty for dissidents and ended the worst of the fighting in Matabeleland and the Midlands, giving the country stability. However, it left the grievances of many survivors unaddressed, as the numbers of dead and responsibility for the violence remained disputed. It also produced a dominant-party system with an executive presidency, which weakened opposition. The government and PF-ZAPU leaders stress that it brought peace, while critics stress the lack of acknowledgement. I conclude that it succeeded in its main aim of ending the conflict, but its political and social costs were considerable.",
    explanation: "Credit successes, limits and a judgement.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the success of the policy of reconciliation between 1980 and 1990.",
    levels: levels(8),
    points: [
      ["Successes: whites stayed and skills were kept; the economy did not collapse; the government included other parties", 2],
      ["Failures: army integration problems, Entumbane, dissidents and the disturbances in Matabeleland and the Midlands", 2],
      ["Limits: land and economic structures unchanged; grievances about the war remained", 2],
      ["Judgement on how successful reconciliation was", 2],
    ],
    hints: ["Give successes and failures."],
    modelAnswer: "Reconciliation was successful in keeping stability but only partly in building unity. Whites and their skills stayed, the economy did not collapse and the cabinet included other parties and races. But the armies were hard to integrate, there were clashes at Entumbane and violence in Matabeleland and the Midlands, and land and economic structures were unchanged. I conclude that reconciliation worked between races but was less successful between rival nationalist parties until the Unity Accord of 1987.",
    explanation: "Credit successes, failures and a judgement.",
  });

  b.card("DEFINITION", "What was the policy of reconciliation in 1980?", "A policy of forgiving the past and including all races and parties in the new state, announced by Mugabe on 4 March 1980.");
  b.card("DEFINITION", "What was the Unity Accord?", "The agreement of 22 December 1987 that merged ZANU (PF) and PF-ZAPU into one party.");
  b.card("FACT", "What happened at Entumbane in 1980 and 1981?", "Clashes between ZIPRA and ZANLA units awaiting integration into the new army.");
  b.card("FACT", "When was Nkomo dismissed?", "February 1982, after arms caches were found on PF-ZAPU properties.");
  b.card("FACT", "When was the Fifth Brigade deployed to Matabeleland North?", "January 1983.");
  b.card("FACT", "What was the MDC and when was it formed?", "The Movement for Democratic Change, formed in 1999 under Morgan Tsvangirai from unions and civic groups.");
  b.card("CONCEPT", "What were the results of the Unity Accord?", "An end to the dissident conflict, an amnesty, a merged party, an executive presidency and a dominant-party system.");
  b.card("CONCEPT", "How should casualty numbers for the 1980s disturbances be treated?", "As estimates only, given as a range or attributed to a source such as the 1997 Commission report (about 20,000); they are disputed.");
  b.card("CONCEPT", "What were the benefits and limits of reconciliation?", "Benefits: stability and skills kept. Limits: land and war grievances left partly unaddressed.");
});
