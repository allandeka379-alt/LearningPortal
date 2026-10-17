// W1b: ahist.colonial.company-rule (ZIMSEC topic 8).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.colonial.company-rule", { file: "colonial/company-rule", keyPrefix: "colonial.company-rule" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which organisation governed Southern Rhodesia from 1890 to 1923?",
    options: [
      ["The British South Africa Company", "Correct: it ruled under its Royal Charter."],
      ["The Rhodesian Front party led by Ian Smith", "The Rhodesian Front was formed in 1962."],
      ["The Federation of Rhodesia and Nyasaland", "The Federation lasted from 1953 to 1963."],
      ["The London Missionary Society", "This was a mission society."],
    ],
    answer: "A",
    explanation: "The BSA Company administered the territory under its Charter until responsible government began in 1923.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the main duty of a Native Commissioner?",
    options: [
      ["To administer a district's African population, collect tax, judge cases and supervise chiefs", "Correct: he combined many powers in one official."],
      ["To command the settler police and volunteer forces in each province under the direction of the Administrator", "Military command was a different duty."],
      ["To represent African voters in the Legislative Council", "Africans had no such representation."],
      ["To run the mission schools in the reserves", "Mission schools were run by the missions."],
    ],
    answer: "A",
    explanation: "Native Commissioners were administrators, judges, tax collectors and labour agents for Africans in their districts.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did the Company impose a hut tax to be paid in cash?",
    options: [
      ["To raise revenue and push Africans into paid work", "Correct: tax forced men to earn wages."],
      ["To pay compensation to families who had lost cattle", "The tax did not compensate losses."],
      ["To fund schools for all African children in the reserves", "Few schools were funded in this way."],
      ["To help African farmers buy modern ploughs and seed", "That was not the aim."],
    ],
    answer: "A",
    explanation: "A cash tax raised money for the Company and obliged men to work for wages on mines and settler farms.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What happened in the referendum of 27 October 1922?",
    options: [
      ["White voters chose responsible government instead of union with South Africa", "Correct: the vote was about 8,800 to 6,000."],
      ["African voters chose to join the Union of South Africa", "Africans did not vote."],
      ["The Company's shareholders voted to keep the Charter for another century to the year 2022", "Shareholders did not vote in this referendum."],
      ["The British voters decided to end the Company's rule", "It was a vote in the colony."],
    ],
    answer: "A",
    hints: ["Who could vote, and what were the two choices?"],
    explanation: "Settlers on the roll chose responsible government; Southern Rhodesia became a self-governing colony on 1 October 1923.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What did the Privy Council decide in 1918?",
    options: [
      ["That unalienated land belonged to the Crown and not to the Company", "Correct: this weakened the Company's land claim."],
      ["That the Company owned all land in Southern Rhodesia without exception", "The ruling was against this claim."],
      ["That Africans owned all land in the reserves and settler farms alike", "The ruling did not deal with African ownership."],
      ["That the Charter was cancelled with immediate effect", "The Charter continued."],
    ],
    answer: "A",
    hints: ["The ruling went against a Company claim."],
    explanation: "The ruling said unalienated land was the Crown's, though the Company could claim repayment of costs.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement best explains why the Company wanted taxes, land sales and cheap labour?",
    options: [
      ["It had to pay for government and show a profit to shareholders", "Correct: its policy followed from its finances."],
      ["It was ordered by Britain to civilise the whole population", "Its motive was financial."],
      ["It had discovered large gold reefs in Mashonaland that needed large workforces", "The great goldfield did not appear."],
      ["It wished to end the reserves and to give the land to Africans", "It created reserves and sold land to settlers."],
    ],
    answer: "A",
    hints: ["Think about who paid for the administration."],
    explanation: "The Company had to fund its administration and rewarded shareholders, so it looked for revenue from land, tax and labour.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why was the franchise of Southern Rhodesia in practice almost closed to Africans although it had no racial bar in law?",
    options: [
      ["Property and income qualifications were set high and few Africans met them", "Correct: the system was non-racial in words only."],
      ["Africans were forbidden by the Charter from ever voting", "The law did not exclude them by race."],
      ["Voting was open only to men who had fought in the 1896 risings", "No such rule existed."],
      ["Only members of the Legislative Council could vote for the Administrator", "This is not the franchise."],
    ],
    answer: "A",
    hints: ["Think about the qualifications."],
    explanation: "High income and property qualifications meant very few Africans could vote.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion about Company rule is best supported by the evidence?",
    options: [
      ["It developed railways and mines while placing most of the costs on Africans", "Correct: development was uneven in its benefits."],
      ["It brought equal benefits to Africans and settlers", "Benefits were unequal."],
      ["It gave Africans full political rights from 1890 and placed them in the Legislative Council", "Africans had no political voice."],
      ["It made enormous profits for shareholders in the first ten years", "Profits were slow to come."],
    ],
    answer: "A",
    hints: ["Who gained and who paid?"],
    explanation: "Railways and mines brought economic growth, but Africans lost land and bore taxes, labour and lack of rights.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Responsible government in Southern Rhodesia began on 1 October 1923.",
    answer: true,
    explanation: "True. Charles Coghlan became the first premier.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Africans were allowed to vote in the referendum of 1922.",
    answer: false,
    explanation: "False. Only voters on the roll, almost all white, took part.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "After the risings of 1896-97 the Native Department was reorganised, with Native Commissioners and salaried chiefs.",
    answer: true,
    hints: ["Think of the reforms after the risings."],
    explanation: "True. The system of Native Commissioners tied chiefs to the administration.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Administrator", "The Company's chief official in the territory"],
      ["Native Commissioner", "District official in charge of the African population"],
      ["Reserve", "An area set aside for African occupation, often on poorer land"],
      ["Responsible government", "Self-government by the colony's settlers"],
    ],
    explanation: "These four terms are needed for answers on Company rule.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each event with its date.",
    pairs: [
      ["Matabeleland Order in Council", "1894"],
      ["Southern Rhodesia Order in Council", "1898"],
      ["Privy Council ruling on land", "1918"],
      ["Referendum on the future of the colony", "27 October 1922"],
    ],
    hints: ["The dates run from 1894 to 1922."],
    explanation: "1894; 1898; 1918; 27 October 1922.",
  });
  {
    const events = [
      "The Matabeleland Order in Council",
      "The Legislative Council is created",
      "The Privy Council rules on land",
      "The referendum on responsible government",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1894, 1898, 1918 and 1922."],
      explanation: "1894; 1898 (first met 1899); 1918; 1922.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The first premier of Southern Rhodesia was Charles {{blank:a}}, and responsible government began in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Coghlan"], choices: ["Coghlan", "Rudd", "Jameson", "Chaplin"] },
      { id: "b", accepted: ["1923"], choices: ["1898", "1914", "1923", "1930"] },
    ],
    explanation: "Charles Coghlan led the first government of 1923.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What word did Africans use for the forced or contract labour on mines under Company rule?",
    accepted: ["chibaro", "Chibaro"],
    wrong: ["lobola"],
    explanation: "**Chibaro**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how the Company administered Southern Rhodesia.",
    points: ["An Administrator ran the territory under the Charter, with the High Commissioner's supervision", "A Legislative Council from 1899 had nominated and some elected settler members", "Native Commissioners administered Africans in each district", "Chiefs were paid and supervised and taxes were collected"],
    modelAnswer: "An Administrator ran the territory under the Charter, supervised by the High Commissioner. A Legislative Council from 1899 had nominated members and some elected settlers. Native Commissioners administered the African population in each district, supervised chiefs, who were paid, and collected taxes.",
    explanation: "One mark for each feature described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how taxation helped the Company to obtain African labour.",
    points: [["Taxes such as the hut tax had to be paid in cash, not in cattle or grain", 2], ["The easiest way to earn cash was to work for wages on settler farms and mines, so taxation forced men into employment", 2]],
    hints: ["Think of how Africans could earn money."],
    modelAnswer: "Taxes such as the hut tax had to be paid in cash rather than in cattle or grain. The easiest way to earn cash was to work for wages on settler farms and mines, so taxation pushed men into employment.",
    explanation: "One mark for each point and one for the development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Company rule ended in 1923.",
    points: [["Settlers wanted self-government and voted for responsible government in 1922", 2], ["The Company wanted to be free from the costs of administration, and Britain accepted the settlers' choice", 2]],
    hints: ["Think of what both the settlers and the Company wanted."],
    modelAnswer: "Settlers wanted self-government and voted for responsible government in 1922. The Company wished to be free of the costs of administering the territory, and Britain accepted the settlers' choice.",
    explanation: "Credit reasons with development.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "an extract from a fictional annual report of a Native Commissioner, 1905",
        "The tax was collected without difficulty in the district. Many young men have gone to the mines at Bulawayo and return with wages. The people pay readily, as they must, and the supply of labour to the farms is good."),
      "",
      source("Source B", "a letter from a fictional African church teacher to a mission society, 1910",
        "The people are poor. The best land near the river is held by a white farmer, and our families are on the sandy ground. The young men must go to the mines to pay the tax, and the fields are left to the women."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A show about the purpose of the tax?", points: ["It was collected readily and produced revenue", "It supplied labour to mines and farms"] }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B agree about the effects of the tax?", points: [["Agree: both show young men going to the mines to earn money for the tax", 2], ["Differ: A presents it as a success for the administration, B shows the cost to families, land and fields", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How reliable are these sources as evidence of the effects of Company rule on Africans?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is an official report, so it shows the administration's aims, but the writer is likely to present his work in a good light", 2], ["B gives an African view of the cost, but it is one teacher's letter and may stress hardship to win help", 2], ["Own knowledge of land alienation, reserves, taxes and chibaro supports B on the effects and A on the purpose", 2]], modelAnswer: "Source A is an official report, so it reliably shows the administration's aims of revenue and labour, but the writer was likely to present his work in a good light and does not describe the cost to Africans. Source B is an African view of the effects, but it is one teacher's letter and may stress hardship to win help from the mission. My own knowledge of land alienation, reserves, taxes and chibaro supports B on the effects and A on the purpose. Together they give a fuller picture." }),
    ],
    hints: ["For (c), consider who wrote each source and for whom."],
    explanation: "Both sources are invented: a Native Commissioner's report and a church teacher's letter.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the effects of Company rule on Africans in Southern Rhodesia.",
    levels: levels(8),
    points: [
      ["Land: alienation, reserves on poorer land, tenants on white farms", 2],
      ["Labour and taxes: hut tax, pass laws, chibaro and low wages; the Native Commissioner's power", 2],
      ["Limited gains: missions and schools, railways and wage income; but no political voice", 2],
      ["Judgement on the overall effect", 2],
    ],
    hints: ["Weigh the costs against any limited gains."],
    modelAnswer: "The effects of Company rule on Africans were mainly harmful. Land was alienated, and Africans were put in reserves on poorer land or became tenants on white farms. Taxes and pass laws forced men into low-paid labour, and Native Commissioners held great power with no appeal. There were some gains: missions provided schools, and railways and mines offered wages. But Africans had no political voice, and the gains were small compared with the losses. I conclude that the effects were largely negative, especially for land, work and rights.",
    explanation: "Credit explained effects and a supported judgement.",
  });

  b.card("DEFINITION", "What was a Native Commissioner?", "A Company official in charge of a district's African population, who collected tax, judged cases, supervised chiefs and helped recruit labour.");
  b.card("DEFINITION", "What is responsible government?", "Self-government by a colony's own settlers, with an elected legislature and ministers, under the Crown's reserved powers.");
  b.card("FACT", "When did responsible government begin in Southern Rhodesia?", "1 October 1923.");
  b.card("FACT", "What happened on 27 October 1922?", "White voters chose responsible government instead of union with South Africa, by about 8,800 to 6,000.");
  b.card("FACT", "What did the Privy Council decide in 1918?", "That unalienated land belonged to the Crown, not to the Company.");
  b.card("FACT", "Who was the first premier of Southern Rhodesia?", "Charles Coghlan, from 1923.");
  b.card("CONCEPT", "How did taxation help the Company to find labour?", "Cash taxes forced men to earn wages on mines and farms.");
  b.card("CONCEPT", "What were the main grievances of Africans under Company rule?", "Loss of land, taxes, forced labour, pass laws, powerful Native Commissioners and no political voice.");
  b.card("CONCEPT", "Why did Company rule end in 1923?", "Settlers wanted self-government, the Company wished to shed the costs of administration and Britain accepted the settlers' vote.");
});
