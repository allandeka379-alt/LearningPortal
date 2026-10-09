// W1b: norms and values at the workplace (her.culture.workplace).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.culture.workplace", { file: "culture/workplace", keyPrefix: "culture.workplace" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Keeping customers' or patients' private information secret is called …",
    options: [
      ["confidentiality", "Correct: confidentiality means protecting private information."],
      ["punctuality", "Punctuality is being on time."],
      ["accountability", "Accountability is being answerable for your actions."],
      ["teamwork", "Teamwork is working together and sharing tasks."],
    ],
    answer: "A",
    explanation: "Confidentiality protects people's privacy and keeps their trust, for example in clinics, banks and schools.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A storekeeper discovers he has recorded the wrong stock figures. He reports the mistake to his manager at once. Which workplace value does he show?",
    options: [
      ["accountability", "Correct: he accepts responsibility and answers for his error."],
      ["confidentiality", "Confidentiality is about keeping information private, not reporting errors."],
      ["punctuality", "Punctuality is about time; the story is about owning a mistake."],
      ["dress code", "A dress code is about appearance at work."],
    ],
    answer: "A",
    explanation: "Accountability means being answerable for your actions and owning up when things go wrong, so problems can be fixed early.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is an example of **corruption** at the workplace?",
    options: [
      ["An official asking for money before issuing a free document", "Correct: abusing a position for private gain is corruption."],
      ["A worker arriving ten minutes early to prepare the office for the day", "This shows punctuality and responsibility."],
      ["A manager praising a team for meeting a deadline", "This is a positive sanction, not corruption."],
      ["A nurse refusing to discuss a patient with a neighbour", "This is confidentiality, a workplace value."],
    ],
    answer: "A",
    explanation: "Corruption is the abuse of entrusted power for private gain. Demanding a bribe for a service that should be free is the most common form.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do mine and factory workers wear protective clothing such as helmets and boots?",
    options: [
      ["To keep the workplace norm of safety and prevent injury", "Correct: protective clothing reduces the risk of injury."],
      ["To show customers and visitors which workers have been promoted", "Protective clothing is for safety, not rank."],
      ["To keep company information confidential", "Clothing has nothing to do with confidentiality."],
      ["To make sure workers arrive on time", "Clothing does not affect punctuality."],
    ],
    answer: "A",
    explanation: "Safety rules, including protective clothing, protect workers' lives and health and are part of workplace norms.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which effect of absenteeism is felt **most directly** by the public?",
    options: [
      ["Customers are turned away and services are delayed", "Correct: when workers are absent the public is not served."],
      ["Absent workers lose part of their own salaries", "This affects the worker, not the public directly."],
      ["Managers spend extra time checking attendance registers", "This affects management, not the public directly."],
      ["Colleagues must cover extra duties during the day", "This affects colleagues, not the public directly."],
    ],
    answer: "A",
    hints: ["The question asks about the public, not the organisation's staff."],
    explanation: "Absenteeism harms several groups; the public feels it as delayed or refused services.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A company director gives the best jobs to his relatives even when better-qualified applicants exist. This threat to workplace values is called …",
    options: [
      ["nepotism", "Correct: favouring relatives in jobs is nepotism."],
      ["absenteeism", "Absenteeism is staying away from work without good reason."],
      ["moonlighting", "Moonlighting is doing a second job, often during work hours."],
      ["confidentiality", "Confidentiality is a value, not a threat."],
    ],
    answer: "A",
    hints: ["The threat involves family members."],
    explanation: "Nepotism undermines fairness and merit and can leave less competent people in important jobs.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A fictional hospital finds that medicines are going missing. Which measure would deal with the problem **most effectively** in the long term?",
    options: [
      ["Keeping signed stock records that are checked by regular audits", "Correct: accountability systems make theft visible and deter it."],
      ["Telling all staff at a monthly meeting that stealing medicines is wrong", "A reminder alone does not change the system that allows theft."],
      ["Buying fewer medicines so that less can be stolen", "This harms patients and does not stop theft."],
      ["Dismissing all the pharmacy staff without investigation", "This is unfair and does not find the cause."],
    ],
    answer: "A",
    hints: ["Which option makes it hard for theft to go unnoticed?"],
    explanation: "Accountability systems (records, signatures, audits) make wrongdoing visible, so they deter theft and protect honest staff.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Sexual harassment at the workplace is a threat to workplace values and is unlawful.",
    answer: true,
    explanation: "True. Harassment creates fear, damages performance and drives people from their jobs; it is against the law.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Workplace norms apply only to managers, not to junior workers.",
    answer: false,
    explanation: "False. Everyone at a workplace is expected to keep its norms, and managers should set the example.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each threat to workplace values with an example.",
    pairs: [
      ["theft", "taking stock home without paying"],
      ["absenteeism", "staying away from work without a good reason"],
      ["corruption", "demanding a bribe to speed up an application"],
      ["harassment", "a supervisor repeatedly making unwanted remarks to a worker"],
    ],
    explanation: "Each threat damages trust, fairness or productivity at the workplace.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "Arriving at work on time shows {{blank:a}}. Sharing tasks and information with colleagues is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["punctuality"], choices: ["punctuality", "confidentiality", "nepotism", "absenteeism"] },
      { id: "b", accepted: ["teamwork"], choices: ["teamwork", "moonlighting", "fraud", "accountability"] },
    ],
    explanation: "Punctuality is about time; teamwork is working together.",
  });
  b.short({
    d: 3, skill: "RECALL",
    stem: "Name the independent commission set up under the 2013 Constitution to investigate and expose corruption.",
    accepted: ["Zimbabwe Anti-Corruption Commission", "Anti-Corruption Commission", "ZACC", "Zimbabwe Anti Corruption Commission", "Anti Corruption Commission"],
    wrong: ["Zimbabwe Human Rights Commission"],
    hints: ["Its name says what it fights."],
    explanation: "The **Zimbabwe Anti-Corruption Commission (ZACC)** is one of the independent commissions set up by the Constitution.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **four** norms or values expected at the workplace.",
    points: ["One of: punctuality, responsibility, accountability, integrity", "A second (e.g. respect, confidentiality)", "A third (e.g. teamwork, dress code)", "A fourth (e.g. safety, honesty)"],
    modelAnswer: "Punctuality, confidentiality, teamwork, safety.",
    explanation: "One mark for each different norm or value.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain **three** effects of corruption on a community.",
    points: [
      "Services go to those who pay bribes",
      "so poor people entitled to them are left out",
      "Public money is lost",
      "so fewer clinics, roads or schools are built or maintained",
      "Trust in institutions falls",
      "so people avoid official channels or stop paying rates",
    ],
    modelAnswer: "Corruption means services go to those who can pay bribes, so poor people who are entitled to them are left out. Public money is lost through theft and inflated contracts, so fewer clinics, roads and schools are built or maintained. People also lose trust in institutions, so they avoid official channels or refuse to pay rates, which weakens services further.",
    hints: ["Think of fairness, money and trust."],
    explanation: "Two marks per effect: the effect and its developed consequence.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** measures a company could take to reduce absenteeism, and explain how each would help.",
    points: [
      "Suggests an accountability measure, e.g. a sign-in register or clocking system",
      "Explains that absences are recorded and followed up, deterring unexplained absence",
      "Suggests a positive measure, e.g. rewarding good attendance or improving working conditions",
      "Explains that motivated, fairly treated workers are more likely to attend",
    ],
    modelAnswer: "The company could introduce a sign-in register checked by supervisors, so unexplained absences are noticed and followed up, which discourages them. It could also reward departments with good attendance and improve working conditions, because workers who feel valued are more likely to come to work.",
    hints: ["Combine an accountability measure with a motivating one."],
    explanation: "Credit any sensible measure with a clear explanation of its effect.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: source("Source A", "a letter to the editor of a fictional community newspaper in Bulawayo, 2026",
      "Dear Editor, last week I waited three hours at a government office to renew a document. The office opened an hour late. Two officers spent the morning on their phones. When I reached the counter I was told the forms had 'run out', but a man who handed something to the clerk was served at once. I left without my document. — A frustrated resident, Pumula") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.manual({
        label: "(a)", marks: 3,
        stem: "Identify **three** threats to workplace norms and values shown in the letter.",
        points: [
          "Late-coming / lack of punctuality (the office opened an hour late)",
          "Poor work ethic (officers on their phones)",
          "Corruption / bribery (a man who handed something over was served at once)",
        ],
        modelAnswer: "Late-coming; poor work ethic; bribery (corruption).",
      }),
      P.manual({
        label: "(b)", marks: 5,
        stem: "Suggest how the office could restore good norms and values, explaining your suggestions.",
        points: [
          "A sign-in register or supervisor check on opening time",
          "Clear code of conduct, e.g. no personal phone use at the counter",
          "Safe channels for the public to report bribery (e.g. a complaints box or hotline)",
          "Investigation and fair discipline of officers involved, with serious cases passed to anti-corruption bodies",
          "Explanation of how the measures restore trust and service, e.g. customers served in turn",
        ],
        modelAnswer: "Supervisors should check that the office opens on time and keep a sign-in register. A code of conduct should forbid personal phone use at the counter. The public should have a safe way to report bribery, such as a complaints box or hotline, and officers found demanding bribes should be investigated and disciplined, with serious cases passed to the anti-corruption authorities. Together these measures would mean people are served in turn and trust in the office returns.",
      }),
    ],
    hints: ["Match each suggestion in (b) to a threat you found in (a)."],
    explanation: "A source-based practice item: spot the threats, then suggest and explain remedies (8 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about corruption at the workplace.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** ways in which corruption harms an organisation.",
        points: [
          ["Financial losses through theft, bribes and inflated contracts, leading to higher prices or job cuts", 2],
          ["Damage to reputation and trust, so customers and partners go elsewhere and honest staff lose morale", 2],
        ],
        modelAnswer: "Corruption causes financial losses: money is lost through theft, bribes and inflated contracts, which can lead to higher prices or job cuts. It also damages the organisation's reputation: customers and partners stop trusting it and go elsewhere, and honest staff lose morale.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Low salaries are the main cause of corruption at the workplace.\" How far do you agree?",
        points: [
          ["For: low or late pay pushes some workers to seek extra money through bribes or moonlighting", 2],
          ["Against: well-paid people also act corruptly; greed and weak values play a part", 2],
          ["Against: weak accountability (no audits, no punishment) and poor leadership allow corruption", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Low salaries can contribute to corruption. When pay is low or late, some workers struggle to support their families and are tempted to ask for bribes or to spend work time on other jobs.\n\nHowever, low pay is not the whole explanation. Some well-paid officials are also corrupt, which shows that greed and weak personal values play a part. Weak accountability matters too: where there are no audits, no records and no punishment, corruption is easy and safe, and leaders who are themselves corrupt set a bad example.\n\nI agree only to a limited extent. Low salaries are a contributing factor, but the main causes are weak values and weak systems of accountability. Fair pay helps, but it must be combined with audits, honest leadership and real consequences.",
      }),
    ],
    hints: ["In (b), test the claim: are well-paid people ever corrupt?"],
    explanation: "A practice evaluative item weighing economic, personal and institutional causes of corruption.",
  });

  b.card("DEFINITION", "Accountability", "Being answerable for your decisions and actions and accepting responsibility when things go wrong.");
  b.card("DEFINITION", "Confidentiality", "Keeping private information about customers, patients or the organisation secret.");
  b.card("DEFINITION", "Corruption", "The abuse of entrusted power or position for private gain, e.g. demanding a bribe.");
  b.card("DEFINITION", "Work ethic", "Values centred on the importance of work: diligence, reliability, punctuality and pride in a job well done.");
  b.card("FACT", "Name five threats to workplace norms and values.", "Corruption, absenteeism, theft, harassment, poor work ethic (also nepotism, substance abuse).");
  b.card("DEFINITION", "Nepotism", "Favouring relatives when giving jobs or promotions.");
  b.card("CONCEPT", "Why is confidentiality important in a clinic?", "Patients trust the clinic with private information; if it were shared, some would stay away and their health would suffer.");
  b.card("FACT", "Which constitutional commission fights corruption in Zimbabwe?", "The Zimbabwe Anti-Corruption Commission (ZACC).");
  b.card("CONCEPT", "Name three ways of upholding workplace norms.", "Codes of conduct and induction; leadership by example; accountability systems such as audits (also fair rewards, training, fair discipline).");
});
