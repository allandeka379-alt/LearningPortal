// Slice W1b: social, political and economic developments since 1980 (ZIMSEC topic 11.2).
import { concept, P, source, sources, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.independence.policies", { file: "independence/policies", keyPrefix: "independence.policies" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date was the Unity Accord between ZANU-PF and PF-ZAPU signed?",
    options: [
      ["22 December 1987", "Correct: PF-ZAPU merged into ZANU-PF."],
      ["18 April 1980", "That is independence."],
      ["21 December 1979", "That is the Lancaster House Agreement."],
      ["31 December 1987", "That is when the executive presidency began."],
    ],
    answer: "A",
    explanation: "The **Unity Accord** was signed on **22 December 1987** and ended the disturbances in Matabeleland and the Midlands.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What did the Legal Age of Majority Act (1982) do?",
    options: [
      ["Made all citizens legal adults at 18", "Correct: women no longer needed a guardian's consent."],
      ["Lowered the voting age to 16", "It concerned legal adulthood, not the voting age."],
      ["Made primary education free for all", "Free primary education was a separate policy from 1980."],
      ["Set the minimum wage for farm workers", "Minimum wages were set by other measures."],
    ],
    answer: "A",
    explanation: "From 1982 women and men became legal adults at 18 and could contract, own property and marry without a guardian's consent.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the main idea of the \"growth with equity\" policy of 1981?",
    options: [
      ["Share the benefits of growth fairly", "Correct: especially with the previously excluded majority."],
      ["Remove all subsidies and price controls at once", "That describes ESAP from 1991."],
      ["Nationalise every private company immediately", "The government kept a mixed economy."],
      ["Stop spending on rural schools and clinics", "Spending on rural services increased."],
    ],
    answer: "A",
    explanation: "Growth with equity combined growth with redistribution: minimum wages, subsidies and spending on rural schools, clinics and services.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which measure was part of ESAP?",
    options: [
      ["Removing price controls and subsidies", "Correct: alongside devaluation and fees."],
      ["Introducing free health care for all", "ESAP introduced fees (cost recovery)."],
      ["Banning all imports of manufactured goods", "ESAP liberalised trade."],
      ["Doubling the size of the civil service", "ESAP cut the civil service."],
    ],
    answer: "A",
    explanation: "ESAP removed controls and subsidies, devalued the currency, liberalised trade, cut the civil service and introduced fees.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which army unit was deployed in Matabeleland North from January 1983?",
    options: [
      ["The Fifth Brigade", "Correct: its actions caused many civilian deaths."],
      ["The Selous Scouts", "The Selous Scouts were a Rhodesian unit disbanded at independence."],
      ["The Commonwealth Monitoring Force", "That force supervised the 1979-80 ceasefire."],
      ["The Rhodesian African Rifles", "That was a Rhodesian army regiment."],
    ],
    answer: "A",
    explanation: "The **Fifth Brigade** was deployed in Matabeleland North from January 1983 and later in Matabeleland South; many thousands of civilians were killed.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did ESAP cause hardship for many ordinary Zimbabweans in the early 1990s?",
    options: [
      ["Prices rose and many lost their jobs", "Correct: worsened by the 1991-92 drought."],
      ["It ended all foreign trade with neighbours", "Trade was liberalised, not ended."],
      ["It made school and health care free", "It introduced fees."],
      ["It raised civil service wages sharply", "It cut civil service jobs."],
    ],
    answer: "A",
    hints: ["Think about subsidies, fees and jobs."],
    explanation: "Removing subsidies raised prices, cost recovery made schools and clinics harder to afford, and retrenchments cost jobs, all during a severe drought.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement about education after 1980 is accurate?",
    options: [
      ["Enrolment grew fast but classes were crowded", "Correct: rapid expansion brought both gains and strains."],
      ["Fewer children went to school than before 1980", "Enrolment grew very fast."],
      ["Secondary schools were closed to save money", "Thousands of new schools were opened."],
      ["Only urban children could go to school", "Many rural schools were built."],
    ],
    answer: "A",
    hints: ["Look for the statement that includes both an achievement and a problem."],
    explanation: "Primary education became free, enrolment soared and literacy rose, but classes were crowded and many teachers were untrained at first.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which judgement about the 1980s in Zimbabwe is best supported by the evidence?",
    options: [
      ["Social gains, but grave suffering in Matabeleland", "Correct: a balanced judgement."],
      ["A decade of failure with no gains at all in health or schooling", "Health and education improved markedly."],
      ["A decade with no political conflict at all", "The disturbances of 1983-1987 caused great suffering."],
      ["A decade when ESAP cut poverty across the whole country", "ESAP began in 1991, after the 1980s."],
    ],
    answer: "A",
    hints: ["Choose the judgement that includes both achievements and problems."],
    explanation: "The 1980s brought major gains in education, health and women's rights, but also the disturbances in Matabeleland and the Midlands, which ended with the Unity Accord in 1987.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Zimbabwe's women's hockey team won Olympic gold in 1980.",
    answer: true,
    explanation: "True. They won at the Moscow Olympics in 1980.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The executive presidency, combining head of state and head of government, began in 1980.",
    answer: false,
    explanation: "False. In 1980 there was a ceremonial President and a Prime Minister; the executive presidency began on 31 December 1987.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each policy or event with its year.",
    pairs: [
      ["Growth with equity policy", "1981"],
      ["Legal Age of Majority Act", "1982"],
      ["Unity Accord", "1987"],
      ["Start of ESAP", "1991"],
    ],
    explanation: "Growth with equity 1981; Legal Age of Majority Act 1982; Unity Accord 1987; ESAP 1991.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The Unity Accord is signed",
      "Fifth Brigade deployed in Matabeleland North",
      "A new Constitution is adopted",
      "ESAP begins",
    ],
    right: POS,
    rightIndex: [1, 0, 3, 2],
    hints: ["The new Constitution is the most recent."],
    explanation: "Fifth Brigade January 1983; Unity Accord December 1987; ESAP 1991; new Constitution 2013.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The 1997 report that documented the disturbances of the 1980s was called {{blank:a}}. ESAP was supported by the World Bank and the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Breaking the Silence"], choices: ["Breaking the Silence", "Growth with Equity", "The Pearce Report", "The Devlin Report"] },
      { id: "b", accepted: ["International Monetary Fund"], choices: ["International Monetary Fund", "Organisation of African Unity", "Commonwealth Monitoring Force", "Southern African Development Community"] },
    ],
    explanation: "*Breaking the Silence* was published in 1997 by the Catholic Commission for Justice and Peace and the Legal Resources Foundation. ESAP was supported by the World Bank and the IMF.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the abbreviation for the economic reform programme adopted by Zimbabwe from 1991.",
    accepted: ["ESAP", "E.S.A.P."],
    wrong: ["ZIMPREST"],
    explanation: "**ESAP**: the Economic Structural Adjustment Programme.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe **four** social policies of the Zimbabwean government in the 1980s.",
    points: [
      "Free primary education and rapid school building.",
      "Free health care for low-income people / rural clinics / immunisation.",
      "Legal Age of Majority Act (1982) for women's rights.",
      "Sport and recreation opened to all / adult literacy / teacher training (ZINTEC).",
    ],
    modelAnswer: "Primary education was made free and thousands of schools were built; free health care for the poor, rural clinics and immunisation programmes were introduced; the Legal Age of Majority Act of 1982 gave women adult status at 18; and sport was opened to all races.",
    explanation: "One mark per policy.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain the effects of ESAP on Zimbabwe in the 1990s.",
    points: [
      "Removal of subsidies raised the prices of food and transport.",
      "Cost recovery fees made education and health care harder to afford.",
      "Retrenchments in the civil service and companies increased unemployment.",
      "Some local industries (e.g. textiles) closed because of competition from imports.",
      "The 1991-92 drought made the hardship worse.",
      "Positive: more goods available / some export growth.",
    ],
    hints: ["Include both negative and positive effects."],
    modelAnswer: "Removing subsidies raised the prices of basic goods such as maize meal and transport. Fees in schools and clinics made them harder for poor families to afford. Retrenchments in the civil service and in companies increased unemployment, and some local industries, such as textile firms, closed because they could not compete with imports. The severe drought of 1991-92 made the hardship worse. On the positive side, shortages ended and some exports grew.",
    explanation: "One mark per developed effect.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** results of the Unity Accord of 22 December 1987.",
    points: [
      "Identifies the merger of PF-ZAPU into ZANU-PF.",
      "Explains: ended the rivalry between the two parties; Nkomo later became a Vice-President.",
      "Identifies the end of the disturbances / amnesty in 1988.",
      "Explains: dissidents surrendered and violence in Matabeleland and the Midlands ended.",
    ],
    hints: ["Think about the parties and about Matabeleland."],
    modelAnswer: "PF-ZAPU merged into ZANU-PF, ending the rivalry between the two former liberation movements; Joshua Nkomo later became a Vice-President. An amnesty followed in 1988, the remaining dissidents surrendered, and the violence in Matabeleland and the Midlands came to an end.",
    explanation: "Two marks per result.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${sources([
      source("Source A", "a speech by a fictional government official opening a school in Gokwe, 1985", "When I was a boy there was one school for the whole district, and only the fortunate few went beyond Standard Three. Today every child in this valley can go to primary school, and next year this secondary school will take its first Form Ones. This is what independence means."),
      source("Source B", "a letter from a fictional parent in Mutare to a newspaper, 1993", "My two eldest finished school in the eighties and still have no work. Now the youngest needs fees for Form Three, the price of mealie-meal has gone up again, and the factory where I worked for eleven years has let us go. We were told to tighten our belts. There is no hole left in my belt."),
    ])}`,
    hints: ["Think about the date and context of each source."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What achievement of independence does Source A describe?", points: [
        "Every child could now go to primary school.",
        "A new secondary school was opening (expansion of education).",
      ], explanation: "Two points." }),
      P.manual({ label: "(b)", marks: 4, stem: "Why do Sources A and B give such different pictures? Use the sources and your own knowledge.", points: [
        "Different dates: A in 1985 (growth with equity, expansion); B in 1993 (ESAP).",
        "Different authors: A an official promoting government success; B a parent facing hardship.",
        "B reflects ESAP: fees, price rises, retrenchment.",
        "B also shows a problem of the 1980s: school leavers without jobs.",
      ], explanation: "Explain the difference through context and provenance." }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are Sources A and B for assessing Zimbabwe's social and economic development between 1980 and 1995? Use both sources and your own knowledge.", points: [
        "A useful: shows the real expansion of education in the 1980s.",
        "A limited: an official speech intended to praise the government.",
        "B useful: shows the effects of ESAP (fees, prices, retrenchments) and youth unemployment.",
        "B limited: one family's experience; written in anger.",
        "Own knowledge confirms both (enrolment growth; ESAP effects; 1991-92 drought).",
        "Supported judgement: together useful, showing change over time.",
      ], type: "EXTENDED_RESPONSE", levels: levels(6), modelAnswer: "Source A, an official's speech from 1985, is useful evidence of the expansion of education under the growth with equity policy, which own knowledge confirms: primary education was free and thousands of schools were built. But it was meant to praise the government and says nothing about problems such as crowded classes or jobs for school leavers. Source B, a parent's letter from 1993, shows the effects of ESAP: fees, rising prices of maize meal and retrenchments, which match what we know, and it also shows that many educated young people could not find work. It is one family's angry account, so it may not be typical. Together the sources are very useful, because they show both the achievements of the 1980s and the hardships of the early 1990s.", explanation: "Use both sources and own knowledge with a judgement." }),
    ],
    explanation: "Two-source practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts.",
    hints: ["In (b), balance achievements against problems in different areas."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the disturbances in Matabeleland and the Midlands between 1982 and 1987.", points: [
        "Breakdown between ZANU-PF and PF-ZAPU; arms caches found and ZAPU leaders dismissed (1982).",
        "Armed dissidents active and killed civilians.",
        "Fifth Brigade deployed from January 1983; many thousands of civilians killed, beaten or detained (estimates up to about 20,000).",
        "Ended with the Unity Accord (22 December 1987) and the 1988 amnesty.",
      ], explanation: "Four factual points." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "\"The first decade of independence (1980-1990) was a period of success for Zimbabwe.\" How far do you agree?", points: [
        ["Success: education expansion, literacy.", 2],
        ["Success: health gains, women's rights (1982), sport.", 2],
        ["Success: growth with equity, peasant farming growth, stability and reconciliation.", 2],
        ["Failure: disturbances in Matabeleland and the Midlands (1983-87).", 2],
        ["Problems: unemployment, debt, land inequality unresolved, HIV/AIDS from late 1980s.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "There is much evidence of success. Primary education became free and enrolment grew very quickly, giving Zimbabwe one of the highest literacy rates in Africa. Rural clinics and immunisation reduced child deaths. The Legal Age of Majority Act of 1982 gave women adult legal status. Under growth with equity, minimum wages, subsidies and support for peasant farmers spread benefits more widely, and reconciliation kept the economy stable.\n\nHowever, the decade also had grave failures. In the disturbances in Matabeleland and the Midlands from 1983 to 1987, many thousands of civilians were killed, beaten or detained, before the Unity Accord ended the conflict. Unemployment remained high, especially among school leavers, government debt grew, land stayed largely in white hands, and from the late 1980s HIV/AIDS began to reverse health gains.\n\nOverall the decade was a success in social policy, but the suffering in Matabeleland and the Midlands and the unresolved economic problems mean it cannot be called a success without serious qualification.", explanation: "Top level weighs achievements and failures." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("FACT", "What did the Legal Age of Majority Act (1982) do?", "Made all citizens, including women, legal adults at 18.");
  b.card("DEFINITION", "Growth with equity", "The 1981 policy that the economy should grow and its benefits be shared fairly with the majority.");
  b.card("DEFINITION", "ESAP", "The Economic Structural Adjustment Programme (from 1991): removal of controls and subsidies, devaluation, fees and cuts in state spending.");
  b.card("CONCEPT", "Give four effects of ESAP.", "Price rises, school and clinic fees, retrenchments and unemployment, closure of some industries (worsened by the 1991-92 drought).");
  b.card("FACT", "When was the Unity Accord signed and what did it do?", "22 December 1987: PF-ZAPU merged into ZANU-PF, ending the disturbances in Matabeleland and the Midlands.");
  b.card("FACT", "When did the executive presidency begin?", "31 December 1987.");
  b.card("FACT", "What is Gukurahundi?", "The disturbances in Matabeleland and the Midlands (1983-1987), when the Fifth Brigade's actions killed many thousands of civilians (estimates up to about 20,000).");
  b.card("CONCEPT", "Give three social achievements of the 1980s.", "Free primary education and rapid school expansion; rural clinics and immunisation; women's legal rights (1982).");
  b.card("FACT", "When was Zimbabwe's current Constitution adopted?", "2013, after a referendum.");
});
