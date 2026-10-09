// W3a: the gains of independence (her.independence.gains).
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.independence.gains", { file: "independence/gains", keyPrefix: "independence.gains" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date was the **Unity Accord** signed?",
    options: [
      ["22 December 1987", "Correct: commemorated as Unity Day."],
      ["18 April 1980", "This is Independence Day."],
      ["21 December 1979", "This is when the Lancaster House Agreement was signed."],
      ["25 May 1963", "This is when the OAU was founded (Africa Day)."],
    ],
    answer: "A",
    explanation: "The Unity Accord was signed on 22 December 1987.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What did the **Legal Age of Majority Act** of 1982 do?",
    options: [
      ["Made every person a legal adult at the age of 18", "Correct."],
      ["Set the minimum age for starting primary school", "It concerned adulthood, not school entry."],
      ["Fixed the number of seats in the National Assembly", "Seats are set by the Constitution."],
      ["Gave war veterans a pension from the government", "It was about legal adulthood."],
    ],
    answer: "A",
    explanation: "At 18 women and men became legal adults, able to sign contracts, own property and marry without a guardian's consent.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which **two parties** were united by the Unity Accord?",
    options: [
      ["ZANU-PF and PF-ZAPU", "Correct."],
      ["ZANLA and ZIPRA", "These were the armies of the liberation struggle; they were integrated into the national army after 1980."],
      ["The Rhodesian Front and ZANU-PF", "The Accord was between the two main nationalist parties."],
      ["SADCC and the OAU", "These are regional and continental organisations."],
    ],
    answer: "A",
    explanation: "ZANU-PF and PF-ZAPU merged as ZANU-PF.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What was the aim of the **policy of reconciliation** announced at independence?",
    options: [
      ["To unite former enemies so they could build the nation together", "Correct."],
      ["To merge the two main political parties into one party", "That was the Unity Accord of 1987."],
      ["To return land to its owners on a willing-buyer basis", "That was a land policy."],
      ["To join regional organisations such as SADCC", "That was foreign policy."],
    ],
    answer: "A",
    explanation: "Reconciliation invited black and white Zimbabweans and former opponents to live and work together.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which change in **education** followed independence in 1980?",
    options: [
      ["Primary education was made free", "Correct."],
      ["All secondary schools were closed", "Many new secondary schools were opened."],
      ["English was banned from schools", "English remained a language of instruction."],
      ["University study became compulsory", "University study was never compulsory."],
    ],
    answer: "A",
    explanation: "Free primary education and many new schools caused enrolment to rise sharply.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In 1985 Nyasha, aged 24, buys a stand in Masvingo and signs the agreement herself, without her father's consent. Which gain of independence made this possible?",
    options: [
      ["The Legal Age of Majority Act", "Correct: at 18 she is a legal adult."],
      ["The policy of national reconciliation", "Reconciliation concerned former enemies, not legal adulthood."],
      ["The Unity Accord between the parties", "The Accord came in 1987 and was political."],
      ["Free primary education for all children", "Education does not give legal capacity to sign contracts."],
    ],
    hints: ["Which law changed women's legal status?"],
    answer: "A",
    explanation: "The 1982 Act gave women full legal capacity at 18.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why was the **Unity Accord** an important gain for the nation?",
    options: [
      ["It ended the violence of the 1980s and united the two main parties", "Correct."],
      ["It ended colonial rule and brought majority rule to the country", "That was independence in 1980."],
      ["It made primary education free for every child in Zimbabwe", "That happened in 1980."],
      ["It gave Zimbabwe a new constitution in 1987", "The Accord was a political agreement, not a constitution."],
    ],
    hints: ["What was happening in Matabeleland and the Midlands before 1987?"],
    answer: "A",
    explanation: "The Accord ended the disturbances and brought national unity; 22 December is Unity Day.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement about the gains of independence is **best supported** by evidence?",
    options: [
      ["Education and health services expanded rapidly in the 1980s", "Correct: new schools, free primary education and rural clinics."],
      ["Independence ended all poverty in Zimbabwe within ten years", "Poverty remained a major challenge."],
      ["All land was redistributed in 1980 under the new constitution", "Lancaster House limited land reform to willing-buyer willing-seller."],
      ["No challenges were faced by the government after 1980", "Droughts, economic problems and conflict were faced."],
    ],
    hints: ["Avoid statements that use absolute words such as \"all\" or \"no\"."],
    answer: "A",
    explanation: "The expansion of social services is the best-documented gain of the 1980s.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Zimbabwe became independent in April 1980.",
    answer: true,
    explanation: "True. Independence came on 18 April 1980; 18 April is Independence Day.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Reconciliation and the Unity Accord are two names for the same agreement of 1987.",
    answer: false,
    explanation: "False. Reconciliation was a policy announced in 1980; the Unity Accord was signed on 22 December 1987.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each area with a gain of independence.",
    pairs: [
      ["Education", "Free primary education and many new schools"],
      ["Health", "Rural clinics and immunisation of children"],
      ["Women's rights", "Legal adulthood at 18"],
      ["Politics", "Every adult citizen could vote"],
    ],
    explanation: "Gains were political, social and economic.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Unity Day is commemorated on 22 {{blank:a}}. In 1986 Harare hosted the summit of the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["December"], choices: ["December", "April", "August", "May"] },
      { id: "b", accepted: ["Non-Aligned Movement"], choices: ["Non-Aligned Movement", "African Union", "Commonwealth", "European Union"] },
    ],
    explanation: "Unity Day: 22 December. Harare hosted the Non-Aligned Movement summit in 1986.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "What is the name of the national day commemorated on 22 December? (two words)",
    accepted: ["Unity Day", "National Unity Day"],
    wrong: ["Heroes Day"],
    explanation: "**Unity Day** commemorates the Unity Accord of 22 December 1987.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **four** social gains of independence.",
    points: ["Free primary education / more schools", "More clinics / free health care for people on low incomes", "Women became legal adults at 18 (Legal Age of Majority Act)", "Minimum wages / rural water, roads or electricity / immunisation"],
    modelAnswer: "Free primary education, new rural clinics, legal adulthood for women at 18, and minimum wages for workers.",
    explanation: "One mark per gain.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why the government chose a policy of reconciliation in 1980.",
    points: [
      "To keep peace after a bitter war",
      "Developed: revenge would have led to more conflict and loss of life",
      "To keep skills and the economy running",
      "Developed: white farmers, business people and civil servants were needed to produce food and run services",
    ],
    modelAnswer: "After a bitter war, revenge would have led to more conflict, so reconciliation helped keep the peace. The country also needed the skills of white farmers, business people and civil servants to produce food and keep the economy and services running.",
    hints: ["Think of peace and of the economy."],
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **three** ways in which independence improved the lives of women in Zimbabwe.",
    points: [
      "Legal Age of Majority Act (1982)", "Developed: women became legal adults at 18, able to own property and sign contracts",
      "The vote", "Developed: women could vote and stand for office, influencing decisions",
      "Education and health", "Developed: more girls went to school; clinics and maternal care improved women's health",
    ],
    modelAnswer: "The Legal Age of Majority Act of 1982 made women legal adults at 18, so they could own property, sign contracts and marry in their own right. All adult women gained the vote and could stand for office, giving them a voice in decisions. The expansion of schools and clinics meant more girls went to school and women's health care improved.",
    hints: ["Think of the law, politics and services."],
    explanation: "Two marks per developed way.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: "Study the table of survey results (invented for this question). Forty elderly residents of a fictional ward near Marondera were asked which gain of independence most changed their families' lives.\n\n" + table(["Gain chosen", "Number of residents"], [
      ["Free schooling", 16],
      ["A nearby clinic", 10],
      ["The right to vote", 8],
      ["Rights for women", 6],
    ]),
    parts: [
      P.mcq({
        label: "(a)", stem: "Which gain was chosen by the **largest** number of residents?",
        options: [
          ["Free schooling", "Correct: 16 of 40."],
          ["A nearby clinic", "10 residents chose this."],
          ["The right to vote", "8 residents chose this."],
          ["Rights for women", "6 residents chose this."],
        ],
        answer: "A",
        explanation: "16 of the 40 residents chose education.",
      }),
      P.fib({
        label: "(b)",
        stem: "Complete the sentence.",
        template: "The number of residents who chose either a clinic or the right to vote was {{blank:a}}.",
        blanks: [{ id: "a", accepted: ["18"], choices: ["18", "14", "16", "24"] }],
        explanation: "10 + 8 = 18.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Suggest and explain **three** reasons why education might be chosen by more residents than the right to vote.",
        points: [
          "Education changed daily life directly", "Developed: children could read, get jobs and support families",
          "Benefits passed to the next generation", "Developed: better-educated children improved the whole family's future",
          "Voting is less visible / occasional", "Developed: an election comes every few years, so its effect is felt less directly",
        ],
        modelAnswer: "Education changed daily life directly: children learned to read and write and could find better jobs to support their families. Its benefits also passed to the next generation, improving the family's future. Voting happens only every few years, so its effects on a family are less visible, even though it made other gains possible.",
      }),
    ],
    hints: ["Think about which gain families feel every day."],
    explanation: "Interpreting invented survey data on the gains of independence.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on national unity after independence.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe the Unity Accord.",
        points: ["Signed on 22 December 1987", "Between ZANU-PF and PF-ZAPU", "The two parties merged as ZANU-PF", "It ended the violence of the 1980s / 22 December became Unity Day / amnesty followed in 1988"],
        modelAnswer: "The Unity Accord was signed on 22 December 1987 between ZANU-PF and PF-ZAPU. The two parties merged as ZANU-PF, the violence in Matabeleland and the Midlands ended, and 22 December is now Unity Day.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Reconciliation was the most important gain of independence.\" How far do you agree?",
        points: [
          ["For: kept peace after a bitter war; kept skills and investment; won international respect", 2],
          ["Against: majority rule and the vote were the foundation of all other gains", 2],
          ["Against: education, health and women's rights changed more lives directly; reconciliation did not prevent the conflict of the 1980s, which needed the Unity Accord", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Reconciliation was an important gain. After a bitter war it helped keep the peace, kept the skills of farmers, business people and civil servants in the country, and won Zimbabwe international respect.\n\nHowever, majority rule and the vote were the foundation of every other gain. Social gains such as free primary education, rural clinics and the Legal Age of Majority Act changed more people's daily lives. Reconciliation also did not prevent the conflict of the 1980s, which ended only with the Unity Accord in 1987.\n\nI therefore partly agree: reconciliation was important for peace, but majority rule and the social gains affected more people.",
      }),
    ],
    hints: ["Compare reconciliation with other gains."],
    explanation: "Evaluating the gains of independence.",
  });

  b.card("FACT", "Date of independence?", "18 April 1980.");
  b.card("FACT", "Date of the Unity Accord?", "22 December 1987 (Unity Day).");
  b.card("FACT", "What did the Legal Age of Majority Act (1982) do?", "Made every person, including women, a legal adult at 18.");
  b.card("DEFINITION", "Reconciliation", "Bringing former enemies together to live and work in peace; announced as national policy in 1980.");
  b.card("DEFINITION", "Majority rule", "Government chosen by the votes of all adult citizens.");
  b.card("FACT", "Which parties did the Unity Accord unite?", "ZANU-PF and PF-ZAPU.");
  b.card("CONCEPT", "Two education gains after 1980?", "Free primary education; many new primary and secondary schools, especially in rural areas.");
  b.card("CONCEPT", "Two health gains after 1980?", "Many new rural clinics; immunisation programmes and free care for people on low incomes.");
  b.card("FACT", "Which summit did Harare host in 1986?", "The Non-Aligned Movement summit.");
});
