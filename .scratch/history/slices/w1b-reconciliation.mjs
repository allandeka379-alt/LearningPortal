// Slice W1b: independence (1980) and the policy of reconciliation (ZIMSEC topic 11.1).
import { concept, P, source, sources, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.independence.reconciliation", { file: "independence/reconciliation", keyPrefix: "independence.reconciliation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date did Zimbabwe become independent?",
    options: [
      ["18 April 1980", "Correct: celebrated at Rufaro Stadium."],
      ["4 March 1980", "That is when the election results were announced."],
      ["21 December 1979", "That is when the Lancaster House Agreement was signed."],
      ["22 December 1987", "That is the date of the Unity Accord."],
    ],
    answer: "A",
    explanation: "Zimbabwe became independent on **18 April 1980**.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How many of the 80 common-roll seats did ZANU-PF win in February 1980?",
    options: [
      ["57", "Correct: PF-ZAPU won 20 and the UANC 3."],
      ["20", "PF-ZAPU won 20 seats."],
      ["80", "ZANU-PF did not win every seat."],
      ["3", "The UANC won 3 seats."],
    ],
    answer: "A",
    explanation: "ZANU-PF 57, PF-ZAPU 20, UANC 3; the 20 white-roll seats went to the Rhodesian Front.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which was a main aim of the policy of reconciliation?",
    options: [
      ["To keep white skills and capital", "Correct: continuity was needed for the economy."],
      ["To expel all whites from the country", "The policy invited whites to stay."],
      ["To put Rhodesian leaders on trial", "There were no revenge trials."],
      ["To restore Company rule", "Company rule had ended in 1923."],
    ],
    answer: "A",
    explanation: "Reconciliation aimed to end bitterness, unite former enemies and keep the economy running by retaining skills and capital.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Who was the first (ceremonial) President of Zimbabwe in 1980?",
    options: [
      ["Canaan Banana", "Correct: Robert Mugabe was Prime Minister."],
      ["Joshua Nkomo", "Nkomo became Minister of Home Affairs."],
      ["Abel Muzorewa", "Muzorewa's UANC won 3 seats."],
      ["Josiah Tongogara", "Tongogara, the ZANLA commander, died in December 1979."],
    ],
    answer: "A",
    explanation: "The Reverend **Canaan Banana** was ceremonial President; the Prime Minister led the government.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which example shows reconciliation in practice in 1980?",
    options: [
      ["ZAPU and white ministers in the cabinet", "Correct: a broad government of former opponents."],
      ["Seizure of white farms without compensation", "Property was protected under the Lancaster House constitution."],
      ["Banning of all parties except ZANU-PF", "Several parties sat in parliament."],
      ["Sacking of every civil servant of the old state", "Most civil servants kept their jobs."],
    ],
    answer: "A",
    explanation: "Nkomo became Minister of Home Affairs and two white ministers from outside ZANU-PF joined the cabinet.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why was integrating ZANLA, ZIPRA and the Rhodesian forces difficult?",
    options: [
      ["Former enemies distrusted each other", "Correct: the Entumbane clashes showed the tensions."],
      ["None of the fighters wanted to join the army", "Many joined the new army."],
      ["Britain refused to help with training", "A British team helped with training."],
      ["The three armies used the same uniforms", "Uniform was not the problem."],
    ],
    answer: "A",
    hints: ["Think about relations between the forces that had fought each other, and between ZANLA and ZIPRA."],
    explanation: "Distrust between former enemies, and rivalry between ZANLA and ZIPRA, led to clashes such as Entumbane in Bulawayo in 1980-81.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which was a limit of the policy of reconciliation?",
    options: [
      ["Land and wealth stayed mostly in white hands", "Correct: economic inequality remained."],
      ["No white farmers stayed in Zimbabwe", "Many white farmers stayed."],
      ["Zimbabwe was refused entry to the United Nations", "Zimbabwe joined the UN in 1980."],
      ["The economy shrank sharply in 1980-81", "The economy grew strongly in 1980-81."],
    ],
    answer: "A",
    hints: ["Reconciliation protected property under the Lancaster House constitution."],
    explanation: "Because property was protected, whites kept most commercial farmland and businesses; critics said reconciliation asked for forgiveness without restitution.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which judgement about reconciliation is best supported by the evidence?",
    options: [
      ["It brought stability, but not unity between ZANU-PF and ZAPU", "Correct: it succeeded in some aims but not others."],
      ["It failed completely, because almost all whites left the country at once", "Many whites stayed and the economy grew."],
      ["It solved the land question by 1981", "The land question remained unresolved."],
      ["It made the integration of the three armies completely unnecessary", "Integration was a central task."],
    ],
    answer: "A",
    hints: ["Choose the judgement that fits both achievements and limits."],
    explanation: "Reconciliation avoided revenge and kept the economy working, but relations between ZANU-PF and ZAPU broke down from 1982 and land inequality remained.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Salisbury was renamed Harare in 1982.",
    answer: true,
    explanation: "True. The capital was renamed on 18 April 1982, the second anniversary of independence.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Under reconciliation, Rhodesian leaders were put on trial for their actions during the war.",
    answer: false,
    explanation: "False. There were no revenge trials; the policy aimed to set aside past wrongs.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their position in 1980.",
    pairs: [
      ["Robert Mugabe", "Prime Minister"],
      ["Canaan Banana", "Ceremonial President"],
      ["Joshua Nkomo", "Minister of Home Affairs"],
      ["Lord Soames", "British Governor during the transition"],
    ],
    explanation: "Mugabe led the government; Banana was head of state; Nkomo joined the cabinet; Soames governed until independence.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Election results are announced",
      "The ceasefire begins",
      "Salisbury is renamed Harare",
      "Independence is celebrated at Rufaro Stadium",
    ],
    right: POS,
    rightIndex: [1, 0, 3, 2],
    hints: ["The ceasefire came first and the renaming came two years after independence."],
    explanation: "Ceasefire late December 1979; results 4 March 1980; independence 18 April 1980; Harare 18 April 1982.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Independence was celebrated at {{blank:a}} Stadium. In the 1980 elections the {{blank:b}} won all 20 white-roll seats.",
    blanks: [
      { id: "a", accepted: ["Rufaro"], choices: ["Rufaro", "Barbourfields", "National Sports", "Gwanzura"] },
      { id: "b", accepted: ["Rhodesian Front"], choices: ["Rhodesian Front", "UANC", "PF-ZAPU", "ZANU-PF"] },
    ],
    explanation: "Rufaro Stadium in Salisbury; the Rhodesian Front of Ian Smith won the 20 reserved white seats.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the national army formed by integrating ZANLA, ZIPRA and the former Rhodesian forces.",
    accepted: ["Zimbabwe National Army", "the Zimbabwe National Army", "ZNA"],
    wrong: ["Rhodesian Army"],
    explanation: "The **Zimbabwe National Army** was formed with help from a British training team.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe **four** events that led to independence between December 1979 and April 1980.",
    points: [
      "Lancaster House Agreement signed (21 December 1979).",
      "Ceasefire; guerrillas moved to assembly points under Commonwealth monitoring.",
      "Leaders and refugees returned; election campaign.",
      "Elections (February 1980), results 4 March; Mugabe asked to form a government; independence 18 April.",
    ],
    modelAnswer: "The Lancaster House Agreement was signed on 21 December 1979; a ceasefire followed with guerrillas in assembly points monitored by the Commonwealth; exiled leaders and refugees returned; elections in February 1980 gave ZANU-PF 57 seats, and Mugabe formed a government before independence on 18 April.",
    explanation: "One mark per event in sequence.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain the policy of reconciliation adopted in 1980.",
    points: [
      "Meaning: setting aside past wrongs and working together.",
      "Aim: prevent revenge and end bitterness.",
      "Aim: keep white skills and capital for the economy.",
      "Example: broad cabinet with ZAPU and white ministers.",
      "Example: civil servants kept; property protected; no revenge trials.",
      "Example: integration of the armies into the Zimbabwe National Army.",
    ],
    hints: ["Give the meaning, the aims and examples."],
    modelAnswer: "Reconciliation meant setting aside the wrongs of the past so that former enemies could build the nation together. Its aims were to prevent revenge, end the bitterness of the war and keep the skills and capital of whites so that the economy kept working. Examples include a cabinet with ZAPU leaders such as Nkomo and two white ministers, keeping most civil servants in their posts, protecting property and holding no revenge trials, and integrating ZANLA, ZIPRA and the Rhodesian forces into one army.",
    explanation: "One mark per developed point.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** limits of the policy of reconciliation.",
    points: [
      "Identifies continuing land and wealth inequality.",
      "Explains: property was protected, so whites kept most farmland and businesses.",
      "Identifies breakdown between ZANU-PF and ZAPU.",
      "Explains: Entumbane clashes, Nkomo's dismissal (1982) and the disturbances that followed.",
    ],
    hints: ["Think about the economy and about relations between the parties."],
    modelAnswer: "Because property was protected, whites kept most commercial farmland and businesses, so the inequality created by colonial rule continued. Reconciliation also did not unite the two liberation movements: clashes at Entumbane and the dismissal of Nkomo in 1982 led to the disturbances in Matabeleland and the Midlands.",
    explanation: "Two marks per limit.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${sources([
      source("Source A", "a letter from a fictional white farmer near Marondera to relatives in England, May 1980", "We expected the worst after the results. Instead the new Prime Minister spoke of forgiving and building together, and the district officer came to tell us nothing would change on the farms. Several neighbours who had their bags packed have unpacked them. We are staying."),
      source("Source B", "the memories of a fictional former ZANLA combatant from Chimanimani, recorded in 2010", "We came out of the assembly point with nothing. They said reconciliation, and we agreed, because the war had to end. But the farm where my father worked as a labourer still belonged to the same man. We forgave, but the land did not come back."),
    ])}`,
    hints: ["Think about how the writers' positions affected what they saw."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "According to Source A, how did white farmers react to the policy of reconciliation?", points: [
        "They were reassured / relieved.",
        "Many decided to stay (unpacked their bags).",
      ], explanation: "Two points from Source A." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B agree about the effects of reconciliation? Explain your answer.", points: [
        "Agree: both say things did not change on the farms / ownership stayed the same.",
        "Agree: both accepted reconciliation (A stays; B agreed it was necessary).",
        "Disagree: A sees this as good news; B sees it as a disappointment.",
        "Conclusion: they agree on the facts but differ in their judgement.",
      ], explanation: "Specific agreement and disagreement." }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are Sources A and B for assessing the achievements and limits of reconciliation? Use both sources and your own knowledge.", points: [
        "A: written in 1980 by someone who benefited; shows reassurance and whites staying (achievement).",
        "A: one district, one viewpoint; written privately so may be honest.",
        "B: a combatant's view, recorded 30 years later; may be shaped by later land reform debates.",
        "B shows a limit: land unchanged, demobilised fighters had little.",
        "Own knowledge: Lancaster House protected property; economy grew; tensions with ZAPU.",
        "Supported judgement: useful together, each showing one side.",
      ], type: "EXTENDED_RESPONSE", levels: levels(6), modelAnswer: "Source A, a private letter written in 1980 by a white farmer, is useful evidence of an achievement of reconciliation: whites were reassured and many decided to stay, which helped the economy to grow in 1980-81. But it shows only the view of those who benefited. Source B, from a former ZANLA combatant recorded in 2010, shows a limit: demobilised fighters received little and the land remained with the same owners, because the Lancaster House constitution protected property. Recorded thirty years later, it may be influenced by later debates about land reform. Neither source mentions the breakdown between ZANU-PF and ZAPU. Together they are very useful, because they show both the stability reconciliation achieved and the inequality it left.", explanation: "Weigh both sources with own knowledge." }),
    ],
    explanation: "Two-source practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts.",
    hints: ["In (b), judge success against the aims of the policy."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe how the three armies were integrated after independence.", points: [
        "ZANLA, ZIPRA and Rhodesian forces combined into the Zimbabwe National Army.",
        "A British Military Advisory and Training Team helped.",
        "Former enemies were placed in the same battalions.",
        "Surplus fighters demobilised with allowances/training; tensions such as Entumbane had to be controlled.",
      ], explanation: "Four points." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "To what extent was the policy of reconciliation a success in the 1980s?", points: [
        ["Success: no revenge; stability; whites stayed.", 2],
        ["Success: economic growth 1980-81, aid and investment; armies integrated.", 2],
        ["Limit: land and wealth inequality remained.", 2],
        ["Limit: breakdown between ZANU-PF and ZAPU; disturbances in Matabeleland and the Midlands until the Unity Accord (1987).", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Reconciliation had important successes. There was no wave of revenge after the war, many white farmers and professionals stayed, and the economy grew strongly in 1980-81 as aid and investment arrived. Three hostile armies were integrated into the Zimbabwe National Army.\n\nBut it had serious limits. Because the Lancaster House constitution protected property, land and wealth remained largely in white hands. Reconciliation also failed to hold together the two liberation movements: after clashes at Entumbane and the dismissal of Nkomo in 1982, the disturbances in Matabeleland and the Midlands caused great suffering until the Unity Accord of 22 December 1987.\n\nOverall reconciliation succeeded in its immediate aim of a peaceful transition between black and white, but it was much less successful in creating national unity or economic justice in the 1980s.", explanation: "Top level weighs successes and limits." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("FACT", "When did Zimbabwe become independent?", "18 April 1980.");
  b.card("FACT", "What were the common-roll results of the February 1980 election?", "ZANU-PF 57, PF-ZAPU 20, UANC 3 (of 80).");
  b.card("DEFINITION", "Reconciliation", "The 1980 policy of setting aside past wrongs so former enemies could work together to build the nation.");
  b.card("FACT", "Who were Zimbabwe's first Prime Minister and President?", "Robert Mugabe (Prime Minister) and Canaan Banana (ceremonial President).");
  b.card("CONCEPT", "Give three examples of reconciliation.", "ZAPU and white ministers in the cabinet; civil servants kept and property protected; integration of the armies.");
  b.card("CONCEPT", "Give two limits of reconciliation.", "Land and wealth stayed largely in white hands; relations between ZANU-PF and ZAPU broke down.");
  b.card("DEFINITION", "Integration of the armies", "Combining ZANLA, ZIPRA and the former Rhodesian forces into the Zimbabwe National Army.");
  b.card("FACT", "When was Salisbury renamed Harare?", "18 April 1982.");
});
