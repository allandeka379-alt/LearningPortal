// W3a: structures and functions of central government (her.governance.central-government).
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.governance.central-government", { file: "governance/central-government", keyPrefix: "governance.central-government" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which arm of government **makes laws**?",
    options: [
      ["The Legislature", "Correct: Parliament makes laws."],
      ["The Executive, led by the President and Cabinet", "The Executive carries out laws."],
      ["The Judiciary, made up of judges and magistrates", "The Judiciary interprets laws."],
      ["The civil service in each ministry", "The civil service is part of the Executive."],
    ],
    answer: "A",
    explanation: "Legislature makes; Executive carries out; Judiciary interprets.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What are the **two houses** of Parliament in Zimbabwe?",
    options: [
      ["The Senate and the National Assembly", "Correct."],
      ["The Cabinet and the Senate", "The Cabinet is part of the Executive."],
      ["The National Assembly and the High Court", "The High Court is part of the Judiciary."],
      ["The Council of Chiefs and the Cabinet", "Neither is a house of Parliament."],
    ],
    answer: "A",
    explanation: "Parliament: the Senate and the National Assembly (Chapter 6).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Who heads the **Judiciary** in Zimbabwe?",
    options: [
      ["The Chief Justice", "Correct."],
      ["The Speaker of the National Assembly", "The Speaker leads the National Assembly."],
      ["The Minister of Justice", "A minister is part of the Executive."],
      ["The President of the Senate", "This officer leads the Senate."],
    ],
    answer: "A",
    explanation: "The Chief Justice is the head of the Judiciary.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What share of the votes must a presidential candidate win to be elected without a run-off?",
    options: [
      ["More than half of the votes cast", "Correct."],
      ["At least one-third of the votes cast", "One-third is not enough."],
      ["More votes than any other single candidate", "A simple lead is not enough; more than half is required."],
      ["Two-thirds of the votes of registered voters", "This is not the rule."],
    ],
    answer: "A",
    explanation: "A candidate needs more than half of the votes cast; otherwise there is a run-off between the top two.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a function of the **Executive**?",
    options: [
      ["Preparing the national budget", "Correct: Parliament then approves it."],
      ["Passing bills in both houses", "That is the Legislature."],
      ["Trying people accused of crimes", "That is the Judiciary."],
      ["Declaring laws unconstitutional", "That is the Judiciary."],
    ],
    answer: "A",
    explanation: "The Executive prepares the budget, which Parliament must approve.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A portfolio committee calls the Minister of Health and Child Care to explain why medicines are short in district hospitals. Which function of Parliament is this?",
    options: [
      ["Oversight of the Executive", "Correct."],
      ["Law-making", "No bill is being passed."],
      ["Interpreting the Constitution", "That is the role of the courts."],
      ["Carrying out government policy", "That is the role of the Executive itself."],
    ],
    hints: ["Parliament is checking the work of a ministry."],
    answer: "A",
    explanation: "Questioning ministers and examining ministries is oversight.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A court rules that a regulation issued by a ministry breaks the Constitution and is therefore invalid. Which principle does this **best** show?",
    options: [
      ["Checks and balances", "Correct: the Judiciary checks the Executive."],
      ["Devolution of power", "Devolution concerns provincial and local government."],
      ["Universal adult suffrage", "This concerns voting."],
      ["Reconciliation", "This was a policy at independence."],
    ],
    hints: ["One arm is limiting another."],
    answer: "A",
    explanation: "The courts check the Executive and the Legislature by striking down unconstitutional acts.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why does the Constitution require the **courts to be independent**?",
    options: [
      ["So that cases are decided by law alone, without interference", "Correct: even when the government is a party."],
      ["So that judges can make laws when Parliament is not sitting", "Judges interpret, they do not make, laws."],
      ["So that the courts can collect taxes and fines for the national Treasury", "Courts do not collect taxes."],
      ["So that judges can be elected at harmonised elections", "Judges are appointed, not elected."],
    ],
    hints: ["What could happen if the government controlled the judges?"],
    answer: "A",
    explanation: "Independent courts protect rights and the rule of law, including against powerful people.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The National Assembly has 210 members elected in constituencies, plus seats reserved for women.",
    answer: true,
    explanation: "True. The women's seats are filled by proportional representation.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Cabinet ministers belong to the Judiciary.",
    answer: false,
    explanation: "False. Ministers belong to the Executive.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each office or body with its arm of government.",
    right: ["Executive", "Legislature", "Judiciary"],
    pairs: ["The Cabinet", "The Senate", "The Chief Justice", "The Speaker of the National Assembly", "A Vice-President"],
    rightIndex: [0, 1, 2, 1, 0],
    explanation: "Cabinet and Vice-Presidents: Executive. Senate and Speaker: Legislature. Chief Justice: Judiciary.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "A proposed law is called a {{blank:a}}. After both houses pass it and the President signs it, it becomes an {{blank:b}} of Parliament.",
    blanks: [
      { id: "a", accepted: ["bill"], choices: ["bill", "decree", "by-law", "motion"] },
      { id: "b", accepted: ["Act"], choices: ["Act", "Order", "Accord", "Charter"] },
    ],
    explanation: "A bill becomes an Act after it is passed and assented to.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which chapter of the Constitution deals with the **Judiciary**? (give the number)",
    accepted: ["8", "eight", "chapter 8", "chapter eight"],
    wrong: ["5"],
    explanation: "Chapter 5: Executive; Chapter 6: Legislature; **Chapter 8: Judiciary**.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** functions of Parliament.",
    points: ["Making laws", "Oversight of the Executive (questioning ministers, committees)", "Representing the people / approving the budget and taxes"],
    modelAnswer: "Making laws, checking the work of the Executive, and representing the people.",
    explanation: "One mark per function.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why separation of powers is important.",
    points: [
      "Prevents abuse of power",
      "Developed: no single person or body controls law-making, government and the courts",
      "Protects rights / rule of law",
      "Developed: independent courts can stop unlawful acts by the government",
    ],
    modelAnswer: "Separation of powers prevents abuse of power, because no single person or body controls law-making, government and the courts together. It also protects citizens' rights, because independent courts can stop the government from acting unlawfully.",
    hints: ["What could happen if one person had all three powers?"],
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **three** ways in which Parliament can check the power of the Executive.",
    points: [
      "Approving or rejecting the budget and taxes", "Developed: the Executive cannot spend money without Parliament's approval",
      "Questioning ministers / portfolio committees", "Developed: ministers must explain decisions and spending in public",
      "Rejecting or amending bills / removing a President by constitutional procedure", "Developed: the Executive cannot make laws alone; serious misconduct can be acted on",
    ],
    modelAnswer: "Parliament must approve the budget and taxes, so the Executive cannot spend public money without its agreement. Members question ministers and portfolio committees investigate ministries, so ministers must explain their decisions in public. Parliament can also reject or amend bills, so the Executive cannot make laws on its own, and the Constitution provides a procedure for removing a President.",
    hints: ["Think of money, questions and laws."],
    explanation: "Two marks per developed way.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: source("Source A", "a report in a fictional school newspaper, 2026", `Our Form 4 class visited Parliament in Harare. In the National Assembly we watched members debate a bill on road safety. Later, a portfolio committee questioned officials from the Ministry of Transport about the state of rural roads. Our guide explained that once both houses pass the bill, it goes to the President.`),
    parts: [
      P.mcq({
        label: "(a)", stem: "What will happen to the road safety bill **after** both houses pass it?",
        options: [
          ["It goes to the President for assent", "Correct."],
          ["It goes to the High Court for a vote", "Courts do not vote on bills."],
          ["It is sent to every council for approval", "Councils do not approve national bills."],
          ["It becomes law immediately without signature", "Assent is needed."],
        ],
        answer: "A",
        explanation: "After both houses pass a bill, the President assents to it and it becomes an Act.",
      }),
      P.match({
        label: "(b)",
        stem: "Match each activity in the source with the function of Parliament it shows.",
        pairs: [
          ["Debating the road safety bill", "Law-making"],
          ["Questioning Ministry of Transport officials", "Oversight"],
        ],
        extraRight: ["Interpreting the law"],
        explanation: "Debating bills is law-making; questioning officials is oversight.",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** ways in which citizens can take part in the work of Parliament.",
        points: [
          "Attend or give views at public hearings on bills",
          "Developed: laws reflect citizens' needs",
          "Contact or petition their member of Parliament / vote in elections",
          "Developed: members represent their concerns; citizens choose who represents them",
        ],
        modelAnswer: "Citizens can attend public hearings on bills and give their views, so that laws reflect what people need. They can also contact or petition their member of Parliament, who can raise their concerns in Parliament, and they choose their representatives at elections.",
      }),
    ],
    hints: ["Use the source and your own knowledge."],
    explanation: "Reading a source on the work of Parliament.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on the arms of government.",
    parts: [
      P.manual({
        label: "(a)", marks: 6,
        stem: "Describe the functions of the Executive, the Legislature and the Judiciary.",
        points: [
          "Executive: carries out laws", "Executive: runs ministries / prepares budget / foreign relations",
          "Legislature: makes laws", "Legislature: oversight / representation / approves budget",
          "Judiciary: interprets laws / settles disputes", "Judiciary: protects rights / decides constitutionality",
        ],
        modelAnswer: "The Executive carries out laws and policies, runs the ministries, prepares the budget and conducts foreign relations. The Legislature makes laws, approves the budget, checks the Executive and represents the people. The Judiciary interprets the law, settles disputes, tries criminal cases and decides whether laws follow the Constitution.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"The Judiciary is the most important arm of government.\" How far do you agree?",
        points: [
          ["For: protects rights and the rule of law; can strike down unconstitutional laws and actions", 2],
          ["Against: Parliament makes the laws the courts apply and represents the people", 2],
          ["Against: the Executive delivers services, security and the budget that citizens depend on daily", 2],
          ["Supported judgement (the arms depend on each other)", 2],
        ],
        levels: levels(8),
        modelAnswer: "The Judiciary is very important. Independent courts protect citizens' rights and uphold the rule of law, and they can declare laws and government actions unconstitutional, even against powerful people.\n\nHowever, Parliament makes the laws that the courts apply and represents the people, so without it the courts would have little to interpret. The Executive delivers the services, security and budget that citizens depend on every day.\n\nI therefore disagree that one arm is the most important. Each has a different job, and the system works only when all three perform their roles and check one another.",
      }),
    ],
    hints: ["Consider what each arm contributes."],
    explanation: "Describing and evaluating the arms of government.",
  });

  b.card("DEFINITION", "Separation of powers", "Dividing government power among the Executive, the Legislature and the Judiciary.");
  b.card("DEFINITION", "Checks and balances", "Ways each arm of government can limit the others to prevent abuse of power.");
  b.card("FACT", "Two houses of Parliament?", "The Senate and the National Assembly.");
  b.card("FACT", "Who heads the Judiciary?", "The Chief Justice.");
  b.card("FACT", "Constitution chapters on the three arms?", "Chapter 5 Executive; Chapter 6 Legislature; Chapter 8 Judiciary.");
  b.card("CONCEPT", "Three functions of Parliament?", "Law-making, oversight of the Executive, representation.");
  b.card("CONCEPT", "How does a bill become an Act?", "It is debated and passed by both houses, then signed (assented to) by the President.");
  b.card("FACT", "What must a presidential candidate win to avoid a run-off?", "More than half of the votes cast.");
  b.card("DEFINITION", "Cabinet", "The President, the Vice-Presidents and the ministers.");
});
