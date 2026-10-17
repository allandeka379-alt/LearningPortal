// W3a: ahist.france.napoleon-power (ZIMSEC rise of Napoleon and domestic policies; Cambridge France 1.4, first part).
import { concept, P, source, levels } from "../lib.mjs";
import { POS, mc } from "../tables/w3a-util.mjs";

concept("ahist.france.napoleon-power", { file: "france/napoleon-power", keyPrefix: "france.napoleon-power" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which event of 9 November 1799 brought Napoleon to power?",
    ok: ["The coup of 18 Brumaire against the Directory", "Correct: the Directory was overthrown."],
    no: [
      ["The coup of 9 Thermidor against Robespierre", "That was in July 1794."],
      ["The coup of 18 Fructidor against the royalist deputies", "That was in September 1797."],
      ["The storming of the Tuileries against the monarchy", "That was in August 1792."],
    ],
    explanation: "On 18 Brumaire Year VIII (9 November 1799) Napoleon and Sieyès overthrew the Directory and set up the Consulate.",
  });
  mc(b, {
    d: 2, skill: "RECALL",
    stem: "What was the main purpose of the Concordat of 1801?",
    ok: ["To settle relations between the state and the Catholic Church", "Correct: it healed the religious division."],
    no: [
      ["To end the war with Britain and open the seas to French trade", "That was the aim of the Peace of Amiens."],
      ["To give the Pope back all the Church lands taken in 1789", "The Pope accepted the loss of Church lands."],
      ["To make Napoleon Emperor with the Pope's blessing and crown", "The coronation was in 1804, not the Concordat."],
    ],
    explanation: "The Concordat recognised Catholicism as the religion of most French people, had the state pay the clergy and ended the quarrel that had begun with the Civil Constitution of the Clergy.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the role of the prefects appointed from 1800?",
    ok: ["They ran each department for the central government", "Correct: they were appointed by Napoleon's government."],
    no: [
      ["They commanded the army in each department of the country", "Prefects were civil officials, not generals."],
      ["They were elected by local voters to represent each town", "Prefects were appointed, not elected."],
      ["They judged criminal cases in the courts of the departments", "Judges served in the courts; prefects administered."],
    ],
    explanation: "Prefects replaced elected local officials, carried out the government's orders, collected information and kept order, which centralised power.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which statement about the Napoleonic Code is correct?",
    ok: ["It confirmed equality before the law and the right to property", "Correct: it kept key gains of the Revolution."],
    no: [
      ["It restored the feudal dues and the privileges of the nobles in the provinces", "It confirmed the end of feudalism."],
      ["It gave married women the same legal rights as their husbands", "The Code limited the rights of married women."],
      ["It allowed workers to form trade unions and to strike freely", "Workers' associations remained illegal."],
    ],
    explanation: "The Code of 1804 brought a single civil law, equality before the law and secure property, but it also strengthened the authority of husbands and fathers and restricted workers.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why can plebiscites under Napoleon not be taken as proof of free consent?",
    ok: ["The voting was managed and the official majorities were exaggerated", "Correct: officials controlled the count and the voting."],
    no: [
      ["Only women were allowed to vote on the questions asked", "Women were not allowed to vote."],
      ["The votes were always taken in secret and counted by officials chosen by the Pope", "The Pope played no part in the counting."],
      ["The questions were set by the Tribunate and the Senate in public", "Napoleon's government controlled the questions."],
    ],
    hints: ["Think of who organised and counted the votes."],
    explanation: "Plebiscites on the Year VIII constitution, Consul for life and the Empire produced huge official majorities, but historians doubt them, since the voting was open to pressure and the counts were manipulated.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which of Napoleon's measures best shows that he kept a gain of the Revolution?",
    ok: ["The Code's confirmation of equality before the law and the end of feudal dues", "Correct: this preserved the legal gains of 1789."],
    no: [
      ["The creation of an imperial nobility based on service to the state and the army", "This introduced a new nobility, not a revolutionary gain."],
      ["The abolition of the Tribunate and the closing of newspapers", "These removed political freedom."],
      ["The use of the police under Fouché against royalist and Jacobin opponents", "This shows control, not a revolutionary gain."],
    ],
    hints: ["Think of what the Revolution had won in law."],
    explanation: "The legal equality and the end of feudal privileges won in 1789 were confirmed in the Code, which is why historians say Napoleon kept the social gains of the Revolution.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "What was the purpose of the Imperial University and the lycées?",
    ok: ["To train loyal officials and officers under state control", "Correct: they served the needs of the state."],
    no: [
      ["To provide free primary schooling for every child in France", "Primary schooling remained limited."],
      ["To return control of teaching to the Church and its priests", "The state increased control over teaching."],
      ["To teach the ideas of the Enlightenment to the poor peasants", "Lycées educated the sons of the elite."],
    ],
    hints: ["Who attended the lycées, and who controlled them?"],
    explanation: "The lycées (1802) and the Imperial University (1808) trained the elite for the army and the civil service and brought teaching under state control.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which fact best supports the view that Napoleon's regime was a form of dictatorship?",
    ok: ["The Tribunate was purged and later abolished, and the press was censored", "Correct: debate and free expression were removed."],
    no: [
      ["The Bank of France was created to stabilise credit", "This was an economic reform."],
      ["The Code applied one law to all citizens of France", "This shows legal equality."],
      ["The Concordat settled the long quarrel between the Church and the French state", "This was a religious settlement."],
    ],
    hints: ["Which fact shows freedom of debate or of the press being removed?"],
    explanation: "Silencing the Tribunate, censoring newspapers and using the police show how political freedom was ended, whatever the benefits of the other reforms.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Napoleon was crowned Emperor in Paris in December 1804.",
    answer: true,
    explanation: "True. The coronation took place at Notre-Dame on 2 December 1804, with Pope Pius VII present.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Concordat made Catholicism the official state religion of France and restored all the lands of the Church.",
    answer: false,
    explanation: "False. It recognised Catholicism as the religion of the great majority of French people, not as the state religion, and the Pope accepted the loss of Church lands.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "The Egyptian expedition was a complete military success for France.",
    answer: false,
    hints: ["Think of Nelson and the Battle of the Nile."],
    explanation: "False. The French fleet was destroyed at the Battle of the Nile and the army was cut off; Napoleon returned to France with his reputation intact because of how the campaign was reported.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Plebiscite", "A vote of the people on a single proposal"],
      ["Prefect", "A government-appointed head of a department"],
      ["Concordat", "An agreement between Napoleon and the Pope"],
      ["Legion of Honour", "An order created in 1802 to reward service to the state"],
    ],
    explanation: "These four terms are needed for questions on Napoleon's government.",
  });
  {
    const events = [
      "Napoleon takes command of the army in Italy",
      "The coup of 18 Brumaire",
      "The Concordat with the Pope",
      "Napoleon is crowned Emperor",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["They run from 1796 to 1804."],
      explanation: "1796; November 1799; July 1801; December 1804.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Napoleon's Minister of Police was {{blank:a}}, and the single civil law of 1804 is called the {{blank:b}} Code.",
    blanks: [
      { id: "a", accepted: ["Fouché"], choices: ["Fouché", "Talleyrand", "Carnot", "Murat"] },
      { id: "b", accepted: ["Napoleonic"], choices: ["Napoleonic", "Justinian", "Bourbon", "Jacobin"] },
    ],
    explanation: "Fouché ran the police; the Napoleonic Code (Civil Code) dates from 1804.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which British admiral destroyed the French fleet at the Battle of the Nile in 1798?",
    accepted: ["Nelson", "Horatio Nelson", "Lord Nelson", "Admiral Nelson"],
    wrong: ["Wellington"],
    explanation: "**Nelson**, which cut off the French army in Egypt.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how Napoleon controlled France as First Consul and Emperor.",
    points: ["Prefects appointed by the government ran the departments", "The police under Fouché watched opponents", "Newspapers and books were censored", "Propaganda and managed plebiscites gave an image of popular support"],
    modelAnswer: "Prefects appointed by the government ran the departments. The police under Fouché watched opponents, and newspapers and books were censored. Propaganda and managed plebiscites gave an image of popular support.",
    explanation: "One mark for each method described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Napoleon was able to seize power in 1799.",
    points: [["The Directory was weak, unpopular and dependent on the army, and politicians such as Sieyès wanted a stronger government", 2], ["Napoleon's military victories and propaganda had made him popular, and the army supported him in the coup", 2]],
    hints: ["Think of the weakness of the Directory and Napoleon's reputation."],
    modelAnswer: "The Directory was weak, unpopular and dependent on the army, and politicians such as Sieyès wanted a stronger government. Napoleon had a great reputation from his victories in Italy, which his propaganda increased, and soldiers helped carry out the coup.",
    explanation: "Credit reasons with development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Concordat of 1801 was important.",
    points: [["It ended the religious division that had followed the Civil Constitution of the Clergy and won the support of Catholics for the regime", 2], ["It recognised the loss of Church lands and gave the state a say in appointing bishops, so the Church served Napoleon's aim of order", 2]],
    hints: ["Think of what it settled and what Napoleon gained."],
    modelAnswer: "The Concordat ended the religious division that had followed the Civil Constitution of the Clergy and won the support of many Catholics. The Pope accepted the loss of Church lands and the First Consul nominated bishops, so the Church supported Napoleon's aim of order.",
    explanation: "Credit reasons with development.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a circular from a fictional prefect to the mayors of his department, 1805",
        "The Emperor has restored order and prosperity. Mayors must report any person who speaks against the government, and no printing may be done without my approval. The people of this department are grateful for the peace and the roads that have been built."),
      "",
      source("Source B", "a private letter from a fictional newspaper editor to a friend abroad, 1807",
        "My paper may print only what the censor allows, and it is full of news of victories. I cannot say that the price of grain is rising. The law courts are fairer than before and the roads are good, but a man who criticises the government will soon be watched."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A show about how the prefect governed?", points: ["Mayors must report critics of the government", "Printing needs the prefect's approval / he praises the regime"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about Napoleon's regime.", points: [["Agree: both mention control of speech or printing and both mention roads or improvements", 2], ["Differ: A is wholly favourable to the regime; B criticises censorship and the lack of free news while admitting improvements", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying Napoleon's control of France?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is an official circular and so shows the methods of control (reports, approval of printing), but it is written to serve the regime and its praise is not reliable", 2], ["B is a private letter to a friend abroad, so the writer could speak freely, but it is one editor's view and may reflect his own frustration", 2], ["Own knowledge: prefects, censorship and police are well known features of the regime, and roads and legal reform are also recorded, so both sources are useful for different aspects", 2]], modelAnswer: "Source A is useful because it is an official circular showing how a prefect passed on the government's orders, with reports on critics and approval of printing, which fits what we know of prefects and censorship; but it praises the regime and was meant to be read by mayors, so its claims about gratitude are not reliable. Source B is a private letter to a friend abroad, so the editor could be frank, and it agrees about censorship while admitting real improvements such as fairer courts and roads; but it is one man's view. Together they are useful because both confirm control while B shows its limits." }),
    ],
    hints: ["For (c), consider who wrote each source and for whom."],
    explanation: "Both sources are invented: a prefect's circular and an editor's letter.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "How far did Napoleon preserve the gains of the French Revolution?",
    levels: levels(8),
    points: [
      ["Gains preserved: equality before the law, the end of feudal dues, secure ownership of land bought from the Church and nobles, the careers open to talent", 2],
      ["Gains lost: free elections, the free press, local self-government and the republic, replaced by prefects, censorship and an empire", 2],
      ["Mixed: the Code strengthened fathers and husbands; the Concordat restored the Church's role; a new nobility was created", 2],
      ["Judgement: he kept the social and legal gains and removed the political freedoms", 2],
    ],
    hints: ["Separate social gains from political freedoms."],
    modelAnswer: "Napoleon preserved the social and legal gains of the Revolution but not the political freedoms. The Code confirmed equality before the law and the end of feudalism; the sales of Church and noble land were secure; and careers were open to talent. But free elections, a free press and local self-government were ended by prefects, censorship and plebiscites, and the Republic became an Empire with a new nobility. Some gains were weakened: the Code strengthened fathers and husbands, and the Concordat restored a place for the Church. I conclude that he preserved the gains in law and property but ended the liberty the Revolution had promised.",
    explanation: "Credit a balanced argument and a supported judgement.",
  });

  b.card("DEFINITION", "What is a plebiscite?", "A vote of the people on one proposal; Napoleon used managed plebiscites to claim consent for his rule.");
  b.card("DEFINITION", "What did a prefect do?", "A prefect, appointed by the central government from 1800, ran a department and carried out government orders.");
  b.card("FACT", "What happened on 18 Brumaire (9 November 1799)?", "Napoleon and Sieyès overthrew the Directory; three Consuls were named and Bonaparte became First Consul.");
  b.card("FACT", "What was the Concordat of 1801?", "An agreement with Pope Pius VII recognising Catholicism as the religion of most French people, with state-paid clergy.");
  b.card("FACT", "When was Napoleon crowned Emperor?", "2 December 1804 at Notre-Dame, Paris.");
  b.card("FACT", "What were the main parts of the Napoleonic Code (1804)?", "A single civil law: equality before the law, property rights and religious freedom, with strong male authority in the family.");
  b.card("CONCEPT", "How did Napoleon control France?", "Through prefects, the police under Fouché, censorship, propaganda, managed plebiscites and rewards such as the Legion of Honour.");
  b.card("CONCEPT", "What did the Bank of France and the franc achieve?", "They stabilised credit and the currency, ended inflation and gave the state a regular income.");
  b.card("CONCEPT", "Did Napoleon preserve the Revolution?", "He kept equality before the law and the end of feudalism but ended free elections and the free press.");
});
