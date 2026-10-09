// Slice W2a: the Constitution of Zimbabwe (ZIMSEC topic 15.1).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.constitution.zimbabwe", { file: "constitution/zimbabwe", keyPrefix: "constitution.zimbabwe" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which year was the present Constitution of Zimbabwe approved in a referendum?",
    options: [
      ["2013", "Correct: on 16 March 2013."],
      ["2000", "The draft put to a referendum in 2000 was rejected."],
      ["1980", "Zimbabwe became independent in 1980 under the Lancaster House Constitution."],
      ["1987", "In 1987 an amendment created the executive presidency."],
    ],
    answer: "A",
    explanation: "Voters approved the new Constitution on **16 March 2013**; it was signed into law on 22 May 2013.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which arm of the state makes laws?",
    options: [
      ["The legislature", "Correct: Parliament (Senate and National Assembly)."],
      ["The executive", "The executive carries out laws."],
      ["The judiciary", "The judiciary interprets laws and settles disputes."],
      ["The Electoral Commission", "It runs elections; it does not make laws."],
    ],
    answer: "A",
    explanation: "The **legislature** (Parliament) makes laws.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which court is the highest court on constitutional matters in Zimbabwe?",
    options: [
      ["The Constitutional Court", "Correct."],
      ["The High Court", "The High Court is below the Supreme and Constitutional Courts."],
      ["The Labour Court", "The Labour Court is a specialised court for employment disputes."],
      ["The magistrates' court", "Magistrates' courts are lower courts."],
    ],
    answer: "A",
    explanation: "The **Constitutional Court** is the highest court on constitutional matters; the Supreme Court is the final court of appeal in other cases.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "For how long is the President of Zimbabwe elected, and for how many terms at most?",
    options: [
      ["Five years; two terms at most", "Correct, under the 2013 Constitution."],
      ["Seven years; no limit", "There is a two-term limit under the 2013 Constitution."],
      ["Four years; three terms at most", "The term is five years."],
      ["Six years; one term only", "The term is five years and two terms are allowed."],
    ],
    answer: "A",
    explanation: "The President is elected for **five years** and may serve at most **two terms**.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is an example of checks and balances?",
    options: [
      ["A court strikes down an unlawful law", "Correct: the judiciary checks the legislature."],
      ["The President chairs a Cabinet meeting", "This is the executive doing its normal work."],
      ["Voters elect a councillor", "This is participation, not one arm checking another."],
      ["A minister opens a new clinic", "This is ordinary government work."],
    ],
    hints: ["Look for one arm of the state limiting another."],
    answer: "A",
    explanation: "When the **courts strike down a law** that breaks the Constitution, the judiciary checks the legislature.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which body drafted the 2013 Constitution after public meetings across the country?",
    options: [
      ["COPAC", "Correct: the Constitution Parliamentary Select Committee."],
      ["ZEC", "The Zimbabwe Electoral Commission runs elections."],
      ["SADC", "SADC mediated the 2008 agreement but did not draft the Constitution."],
      ["The Lancaster House Conference", "That produced the 1979 constitution."],
    ],
    answer: "A",
    hints: ["It was a committee of Parliament set up under the 2008 agreement."],
    explanation: "**COPAC**, a parliamentary committee set up under the Global Political Agreement, held outreach meetings and drafted the text.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why is a constitution called the \"supreme law\"?",
    options: [
      ["Laws that conflict with it are invalid", "Correct: every other law must agree with it."],
      ["It was written by the judges of the Supreme Court", "Courts interpret it; they do not write it."],
      ["Only the President may read it", "It is a public document for all citizens."],
      ["It can never be changed", "It can be amended by set procedures."],
    ],
    answer: "A",
    hints: ["What happens to a law that disagrees with the Constitution?"],
    explanation: "Because the Constitution is **supreme**, any law or action that conflicts with it is invalid.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Zimbabwe's Parliament has two houses: the Senate and the National Assembly.",
    answer: true,
    explanation: "True. Parliament is bicameral.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Under the separation of powers, the President also acts as the country's chief judge.",
    answer: false,
    explanation: "False. The judiciary is a separate arm, headed by the Chief Justice.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each arm of the state with its main function.",
    pairs: [
      ["Legislature", "Makes laws and approves the budget"],
      ["Executive", "Carries out laws and runs the government"],
      ["Judiciary", "Interprets laws and settles disputes"],
    ],
    explanation: "Parliament makes laws; the President and Cabinet carry them out; the courts interpret them.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Referendum approves the new Constitution",
      "Lancaster House Constitution agreed",
      "Global Political Agreement signed",
      "Draft constitution rejected in a referendum",
    ],
    right: POS,
    rightIndex: [3, 0, 2, 1],
    hints: ["One referendum failed before the other succeeded."],
    explanation: "Lancaster House 1979; rejected draft 2000; Global Political Agreement 2008; new Constitution approved 2013.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Declaration of Rights is Chapter {{blank:a}} of the Constitution. The Constitution recognises {{blank:b}} official languages.",
    blanks: [
      { id: "a", accepted: ["4"], choices: ["4", "1", "9", "12"] },
      { id: "b", accepted: ["16"], choices: ["16", "2", "3", "10"] },
    ],
    explanation: "Chapter **4** is the Declaration of Rights; **sixteen** languages are officially recognised.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the official who heads the judiciary in Zimbabwe.",
    accepted: ["Chief Justice", "the Chief Justice"],
    wrong: ["Attorney-General"],
    explanation: "The **Chief Justice** heads the judiciary.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 5,
    stem: "State **five** functions of a constitution.",
    points: [
      "Acts as the supreme law.",
      "Sets up the organs of state and their powers.",
      "Limits government power (separation of powers).",
      "Protects rights and freedoms.",
      "Defines citizenship / national symbols and values / how it may be amended.",
    ],
    modelAnswer: "It is the supreme law; it sets up the executive, legislature and judiciary; it limits government power; it protects rights and freedoms; it defines citizenship.",
    explanation: "One mark per function.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Describe the functions of the executive, the legislature and the judiciary in Zimbabwe.",
    points: [
      "Executive: President, Vice-Presidents and Cabinet run the government.",
      "Executive: carries out laws, conducts foreign relations / commands the Defence Forces.",
      "Legislature: Senate and National Assembly make laws.",
      "Legislature: approve taxes and the budget; oversee the executive.",
      "Judiciary: courts interpret laws and settle disputes.",
      "Judiciary: protect rights; Constitutional Court checks that laws agree with the Constitution.",
    ],
    hints: ["Two functions for each arm."],
    modelAnswer: "The executive, led by the President with Vice-Presidents and Cabinet, runs the government, carries out laws and conducts foreign relations; the President also commands the Defence Forces. The legislature, made up of the Senate and National Assembly, makes laws, approves taxes and the budget and oversees the executive through questions and committees. The judiciary, headed by the Chief Justice, interprets laws, settles disputes and protects rights, and the Constitutional Court can strike down laws that break the Constitution.",
    explanation: "Two marks per arm.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** ways in which the separation of powers protects citizens.",
    points: [
      "Identifies that no single arm holds all power.",
      "Explains: prevents dictatorship / abuse of power.",
      "Identifies judicial review / parliamentary oversight.",
      "Explains: unlawful laws or actions can be struck down / ministers held to account.",
    ],
    hints: ["Think about what could happen if one person controlled all three arms."],
    modelAnswer: "Because no single arm holds all power, one person or group cannot make, enforce and judge the law alone, which guards against dictatorship. Each arm can check the others: the courts can strike down laws or actions that break citizens' rights, and Parliament can question ministers and refuse to approve spending.",
    explanation: "Two marks per developed way.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the source and answer the questions.\n\n${source("Source A", "notes written by a fictional schoolteacher who attended a COPAC outreach meeting in a rural ward in 2010", "About two hundred people came, more women than men. The facilitators read out questions on land, chiefs, the powers of the President and the rights of children. Some speakers wanted term limits; others said the President should serve as long as people vote for him. A few people seemed nervous to speak, and some repeated what others had said. The meeting ended peacefully.")}`,
    hints: ["Consider who wrote the notes and what they could see."],
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Identify **three** topics discussed at the meeting described in Source A.", points: [
        "Land.",
        "Chiefs / traditional leaders.",
        "Powers of the President / rights of children.",
      ], explanation: "Three topics from the source." }),
      P.manual({ label: "(b)", marks: 3, stem: "What does Source A suggest about how freely people gave their views?", points: [
        "Many attended and different views were expressed (for and against term limits).",
        "Some seemed nervous to speak.",
        "Some repeated others' views, suggesting pressure or coaching.",
      ], explanation: "Inferences supported by details." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How useful is Source A as evidence about how the 2013 Constitution was made? Use the source and your own knowledge.", points: [
        "Useful: eyewitness at an outreach meeting; written at the time.",
        "Useful: shows public participation in the COPAC process, which matches own knowledge.",
        "Useful: shows the debates (term limits) that appear in the final Constitution.",
        "Limitation: one ward only; cannot show the whole country.",
        "Limitation: does not show the later drafting, negotiation between parties and the 2013 referendum.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "The source is useful because it comes from an eyewitness who wrote notes at a COPAC outreach meeting at the time. It shows that ordinary people, including many women, took part, which matches what we know about the outreach programme of 2009-2012. It also shows debates, such as term limits, that ended up in the final Constitution, which limits the President to two terms.\n\nHowever, it describes one meeting in one ward, so it cannot show what happened everywhere, and its hints of nervousness are only the writer's impressions. It also says nothing about the later stages: the drafting, the negotiations between the parties and the referendum of 16 March 2013.\n\nSo it is useful evidence of public participation, but only for one part of the process.", explanation: "Weigh provenance and content against own knowledge." }),
    ],
    explanation: "Source-based practice question on the making of the Constitution (12 marks).",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts.",
    hints: ["In (b), consider the text and how it works in practice."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Outline the ways in which a person may become a citizen of Zimbabwe.", points: [
        "By birth (born in Zimbabwe to a citizen parent).",
        "By birth outside Zimbabwe to a citizen parent in certain cases.",
        "By descent.",
        "By registration (e.g. marriage or long residence).",
      ], explanation: "Four points." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "How far does the 2013 Constitution limit the power of government?", points: [
        ["Limits: separation of powers; Constitutional Court can strike down laws.", 2],
        ["Limits: two-term presidential limit; Declaration of Rights; amendment of rights needs a referendum.", 2],
        ["Limits: independent commissions; devolution; Parliament's oversight.", 2],
        ["Debate: delays in aligning laws; amendments since 2017 (judicial appointments); slow devolution; rights can be limited by law.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "On paper the Constitution limits government strongly. It separates the executive, legislature and judiciary, and the Constitutional Court can strike down laws and actions that break it. The President may serve only two five-year terms, and the Declaration of Rights protects a wide range of rights; changing the Declaration of Rights requires a referendum as well as Parliament. Independent commissions, devolution and Parliament's oversight add further checks.\n\nHowever, how far these limits work is debated. Some laws took years to be brought into line with the Constitution, and devolution has been slow. Amendments since 2017 changed how some senior judges are appointed, which critics say reduced independence. The Constitution itself also allows rights to be limited by law in some circumstances.\n\nOverall the 2013 Constitution provides a strong framework for limiting government, but its effectiveness depends on how fully it is put into practice.", explanation: "Both sides with judgement." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("DEFINITION", "Constitution", "The supreme law of a country, setting out how it is governed, the powers and limits of state organs, and citizens' rights and duties.");
  b.card("DEFINITION", "Separation of powers", "Dividing state power between the executive, legislature and judiciary so no single arm holds all power.");
  b.card("FACT", "When was the 2013 Constitution approved and signed?", "Approved in a referendum on 16 March 2013; signed into law on 22 May 2013.");
  b.card("FACT", "What is Chapter 4 of the Constitution?", "The Declaration of Rights.");
  b.card("FACT", "What are the two houses of Parliament?", "The Senate and the National Assembly.");
  b.card("FACT", "What is the President's term?", "Five years, with a limit of two terms.");
  b.card("CONCEPT", "Name three ways to become a citizen of Zimbabwe.", "By birth, by descent and by registration.");
  b.card("FACT", "What was COPAC?", "The parliamentary committee, set up under the 2008 Global Political Agreement, that consulted the public and drafted the 2013 Constitution.");
  b.card("DEFINITION", "Checks and balances", "Ways in which each arm of the state can limit the others, e.g. courts striking down unlawful laws.");
});
