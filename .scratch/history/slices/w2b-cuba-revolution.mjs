// Slice W2b: the Cuban Revolution (ZIMSEC 14.3).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.cuba.revolution", { file: "cuba/revolution", keyPrefix: "cuba.revolution" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date did Batista flee Cuba?",
    options: [
      ["1 January 1959", "Correct: the rebels then took power."],
      ["26 July 1953", "That was the attack on the Moncada barracks."],
      ["2 December 1956", "That was the Granma landing."],
      ["10 March 1952", "That was Batista's coup."],
    ],
    answer: "A",
    explanation: "Batista fled on **1 January 1959** after the battle of Santa Clara.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What was the name of the yacht that carried Castro's rebels from Mexico to Cuba in 1956?",
    options: [
      ["Granma", "Correct: 82 men landed on 2 December 1956."],
      ["Moncada", "Moncada was the barracks attacked in 1953."],
      ["Maine", "The Maine was a US warship that exploded in Havana harbour in 1898."],
      ["Santa Clara", "Santa Clara was the city where Guevara won a key battle in 1958."],
    ],
    answer: "A",
    explanation: "The **Granma** landed in eastern Cuba on 2 December 1956.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How did Batista come to power in 1952?",
    options: [
      ["By a military coup", "Correct: on 10 March 1952, before an election he expected to lose."],
      ["By winning a free election", "He seized power because he expected to lose the election."],
      ["By a guerrilla war from the mountains", "That was how Castro came to power."],
      ["By an American invasion of Cuba", "The USA did not invade to install Batista in 1952."],
    ],
    answer: "A",
    explanation: "Batista took power in a **military coup** in March 1952 and suspended the constitution.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Where did Castro's guerrillas base themselves in 1957-1958?",
    options: [
      ["The Sierra Maestra mountains", "Correct: in eastern Cuba."],
      ["The city of Havana", "Havana was Batista's stronghold until January 1959."],
      ["The US base at Guantánamo Bay", "This was an American naval base."],
      ["The Isle of Pines", "This island held the prison where Castro was jailed after Moncada."],
    ],
    answer: "A",
    explanation: "The **Sierra Maestra** gave the rebels cover and access to peasant support.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which reform of 1959 broke up large estates in Cuba?",
    options: [
      ["The Agrarian Reform Law", "Correct: passed in May 1959."],
      ["The literacy campaign", "The literacy campaign (1961) taught adults to read."],
      ["The Platt Amendment", "The Platt Amendment (1901) gave the USA the right to intervene."],
      ["The sugar-for-oil agreement", "This 1960 trade deal was with the USSR."],
    ],
    answer: "A",
    explanation: "The **Agrarian Reform Law** of May 1959 limited the size of landholdings and redistributed land.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the guerrillas win the support of many peasants?",
    options: [
      ["They paid for food, gave medical help and promised land", "Correct: unlike Batista's troops, who carried out reprisals."],
      ["They promised to keep the large sugar estates unchanged", "They promised land reform, which threatened the large estates."],
      ["They were supplied by the Soviet army from 1957", "Soviet support came after 1959."],
      ["Batista had already given peasants their own land", "Batista's Cuba had great rural inequality."],
    ],
    answer: "A",
    hints: ["Compare how the guerrillas and the army treated rural people."],
    explanation: "The rebels treated peasants well and promised land reform, while army reprisals drove people towards them.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which evidence best supports the view that Batista's regime collapsed from within rather than being defeated in a great battle?",
    options: [
      ["His big army fought badly and he fled", "Correct: a far smaller rebel force won."],
      ["The USA sent marines to remove him from Havana", "The USA did not send troops."],
      ["The Soviet Union invaded Cuba in December 1958", "There was no Soviet invasion."],
      ["Castro won a free election in late 1958", "No free election brought Castro to power."],
    ],
    answer: "A",
    hints: ["Compare the size of the two forces."],
    explanation: "Batista had a large army but little loyalty; after losing Santa Clara he fled, and the regime collapsed.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "What was the main effect of the Cuban Revolution on Africa?",
    options: [
      ["Cuban troops and doctors helped allies like Angola", "Correct: Cuban troops were in Angola from 1975 to 1991."],
      ["Cuba colonised parts of West Africa in the 1960s", "Cuba had no colonies."],
      ["Cuba bought most of Africa's sugar exports", "Cuba was itself a major sugar exporter."],
      ["Cuba persuaded the OAU to join the Warsaw Pact in 1975", "The OAU never joined any military bloc."],
    ],
    answer: "A",
    hints: ["Think about Angola after 1975."],
    explanation: "Cuba supported African liberation movements and governments, most notably the MPLA in **Angola**, and sent doctors and teachers.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Che Guevara was born in Argentina.",
    answer: true,
    explanation: "True. Guevara was an Argentine doctor who joined Castro in Mexico.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Castro declared the revolution to be socialist as soon as he took power in January 1959.",
    answer: false,
    explanation: "False. He declared the revolution socialist in April 1961; his early programme stressed reform and independence.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role.",
    pairs: [
      ["Fulgencio Batista", "Dictator overthrown in 1959"],
      ["Fidel Castro", "Leader of the 26th of July Movement"],
      ["Che Guevara", "Argentine doctor and guerrilla commander"],
      ["Raúl Castro", "Fidel's brother and fellow commander"],
    ],
    explanation: "Batista (dictator), Fidel Castro (leader), Guevara (commander, Santa Clara), Raúl Castro (commander).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put the stages of the revolution in chronological order.",
    pairs: [
      "The Granma landing",
      "Batista flees Cuba",
      "The attack on the Moncada barracks",
      "Castro is released in an amnesty",
    ],
    right: POS,
    rightIndex: [2, 3, 0, 1],
    hints: ["The movement took its name from the first event."],
    explanation: "Moncada 1953; amnesty 1955; Granma 1956; Batista flees 1959.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Castro's defence speech at his trial was published as History Will {{blank:a}} Me. Guevara's column won a key battle at {{blank:b}} in December 1958.",
    blanks: [
      { id: "a", accepted: ["Absolve"], choices: ["Absolve", "Remember", "Judge", "Forgive"] },
      { id: "b", accepted: ["Santa Clara"], choices: ["Santa Clara", "Havana", "Guantánamo", "Moncada"] },
    ],
    explanation: "*History Will Absolve Me*; the battle of **Santa Clara**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Castro's movement was named after the date of the Moncada attack. What was the name of the movement?",
    accepted: ["26th of July Movement", "26 July Movement", "Twenty-sixth of July Movement", "M-26-7", "26th July Movement", "July 26 Movement"],
    wrong: ["Granma Movement"],
    explanation: "The **26th of July Movement**, after the attack of 26 July 1953.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 5,
    stem: "State **five** features of the Batista regime.",
    points: [
      "Came to power by a military coup (1952) / dictatorship.",
      "Repression: opponents imprisoned, tortured or killed; censorship.",
      "Corruption / links with US organised crime and casinos.",
      "Inequality and rural poverty / illiteracy / seasonal unemployment in sugar.",
      "Dependence on the USA (US ownership of sugar, utilities; arms from the USA until 1958).",
    ],
    modelAnswer: "Batista took power in a coup in 1952 and ruled as a dictator; he repressed opponents and censored the press; his government was corrupt and linked to casinos and US organised crime; there was great inequality and rural poverty; and the economy depended on the USA.",
    explanation: "One mark per feature.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain the domestic results of the Cuban Revolution between 1959 and 1961.",
    points: [
      "Identifies land reform (May 1959).",
      "Explains that large estates were broken up and land went to co-operatives, the state and peasants.",
      "Identifies nationalisation (1960).",
      "Explains that US and Cuban companies, banks and sugar mills were taken over, ending foreign control.",
      "Identifies the literacy campaign / health and education, and loss of political freedom.",
      "Explains: illiteracy fell sharply; but elections were not held, critics jailed and many Cubans emigrated.",
    ],
    hints: ["Consider land, business, social services and political rights."],
    modelAnswer: "The Agrarian Reform Law of May 1959 broke up large estates, giving land to co-operatives, the state and peasants. In 1960 the government nationalised American and Cuban companies, banks and sugar mills, ending foreign control of the economy. The 1961 literacy campaign sent volunteers to teach adults to read, and free education and healthcare were extended. But political freedom ended: elections were not held, opposition papers were closed, critics were jailed, and many middle-class Cubans fled to the USA.",
    explanation: "Two marks per developed result.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** reasons why Cuba became an ally of the Soviet Union after 1959.",
    points: [
      "Identifies the conflict with the USA over nationalisation.",
      "Explains that the USA responded with an embargo, so Cuba needed a new market for sugar and a source of oil.",
      "Identifies Soviet offers of trade and aid (1960 sugar-for-oil agreement) / protection.",
      "Explains that the USSR wanted an ally near the USA and offered protection against invasion (Bay of Pigs).",
    ],
    hints: ["Think about sugar, oil and fear of invasion."],
    modelAnswer: "First, Castro's nationalisation of American property led the USA to stop buying Cuban sugar and impose an embargo, so Cuba needed new markets and a source of oil. Second, the USSR offered a trade agreement in 1960 exchanging oil for sugar, and later weapons and protection, because it wanted an ally close to the USA; after the Bay of Pigs invasion this protection became vital.",
    explanation: "Two marks per explained reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "the memories of a fictional peasant woman from the Sierra Maestra, recorded in 1979", "Before the revolution my children had no school and no doctor. When the bearded ones came to the mountains, they paid for our pigs and their doctor treated my husband's fever. The soldiers of Batista only came to burn houses. After the triumph a young teacher lived in our hut for a whole year, and now I can write my own name.")}\n\n${source("Source B", "a letter from a fictional Cuban lawyer who left for Miami, written in 1962", "I fought against Batista too. But Fidel promised elections and gave us firing squads. My newspaper was closed, my brother is in prison, and our property was taken. A revolution that makes half the professionals of Havana flee is not freedom; it is a new dictatorship.")}`,
    hints: ["Each writer saw a different side of the revolution; think about who they were."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What can you learn from Source A about why the guerrillas won rural support?", points: [
        "They paid for food / treated the sick.",
        "Batista's soldiers burned houses (reprisals).",
      ], explanation: "Two points from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B disagree about the results of the revolution?", points: [
        "A: positive results (education, healthcare, literacy).",
        "B: negative results (no elections, executions, censorship, confiscation).",
        "Agreement: both opposed Batista / accept the old regime was bad.",
        "Judgement: they disagree mainly because they focus on different results.",
      ], explanation: "Points of agreement and disagreement." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Why do these two sources give such different views of the revolution? Use the sources and your own knowledge.", points: [
        "Social position: A a poor rural woman who gained schooling and healthcare.",
        "Social position: B a middle-class professional who lost property and freedom.",
        "Own knowledge supports A: literacy campaign 1961, free healthcare, land reform.",
        "Own knowledge supports B: executions of Batista officials, no elections, closed newspapers, emigration.",
        "Timing/purpose: A recorded in 1979 (perhaps for an official account); B written in exile in 1962.",
        "Judgement: both are accurate about different groups.",
      ], levels: levels(6), modelAnswer: "The sources differ mainly because the writers were affected differently. The peasant woman in Source A was poor and rural; she gained schooling, a doctor and literacy, and my own knowledge confirms the literacy campaign of 1961 and the spread of free healthcare and land reform. The lawyer in Source B was a middle-class professional who lost his newspaper and property, and my knowledge confirms that elections were not held, Batista officials were executed, opposition papers were closed and many professionals fled to Miami. Their circumstances also differ: A was recorded in 1979, perhaps for an account approved by the government, while B was written by an angry exile in 1962. Both are accurate about the experiences of their own group, so together they show that the revolution brought social gains at the cost of political freedom.", explanation: "Explain differences using provenance and knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), weigh the guerrillas' strengths against Batista's weaknesses."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the Moncada attack and its consequences.", points: [
        "26 July 1953: Castro led an attack on the Moncada barracks in Santiago de Cuba.",
        "The attack failed; many rebels were killed.",
        "Castro was tried; his speech was published as History Will Absolve Me.",
        "He was imprisoned, released in 1955; the movement took the name 26th of July.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "\"Batista's weaknesses, not Castro's strengths, explain the success of the Cuban Revolution.\" How far do you agree?", points: [
        ["Batista's weaknesses: corruption, repression, unpopularity.", 2],
        ["Batista's weaknesses: demoralised army, reprisals, US arms embargo (1958).", 2],
        ["Castro's strengths: guerrilla tactics, peasant support, leadership, propaganda.", 2],
        ["Castro's strengths: urban underground; Guevara at Santa Clara; broad anti-Batista front.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Batista's weaknesses were very important. His regime was corrupt and repressive, so it had little support outside the wealthy and the army. The army was large but poorly motivated, and its brutal reprisals created more rebels. In March 1958 the USA stopped selling him weapons, damaging both his army and his authority, and his offensive that summer failed.\n\nHowever, Castro's strengths turned these weaknesses into victory. The guerrillas survived in the Sierra Maestra by winning peasant support, used hit-and-run tactics to capture weapons, and spread their message through rebel radio and foreign journalists. An urban underground organised sabotage and strikes, and many groups opposed to Batista accepted Castro's leadership. Guevara's victory at Santa Clara in December 1958 made Batista flee.\n\nOverall Batista's weaknesses created the opportunity, but without Castro's leadership and the guerrillas' skill the regime might have survived, so I only partly agree with the statement.", explanation: "Both sides and a supported judgement." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("FACT", "When did Batista seize power?", "10 March 1952, in a military coup.");
  b.card("FACT", "What happened on 26 July 1953?", "Castro's failed attack on the Moncada barracks in Santiago de Cuba.");
  b.card("FACT", "What was the Granma?", "The yacht that landed Castro and 81 others in Cuba on 2 December 1956.");
  b.card("FACT", "Where did the guerrillas fight in 1957-1958?", "The Sierra Maestra mountains of eastern Cuba.");
  b.card("FACT", "When did Batista flee?", "1 January 1959, after Guevara's victory at Santa Clara.");
  b.card("DEFINITION", "Guerrilla warfare", "Fighting by small mobile groups using surprise, local knowledge and local support.");
  b.card("CONCEPT", "Give three domestic results of the revolution.", "Land reform (1959), nationalisation (1960), literacy campaign (1961); but no elections and many emigrated.");
  b.card("FACT", "When did Castro declare the revolution socialist?", "April 1961.");
  b.card("CONCEPT", "How did the Cuban Revolution affect Africa?", "Cuba sent troops (Angola from 1975, Ethiopia 1977-78), doctors and teachers, and gave scholarships.");
});
