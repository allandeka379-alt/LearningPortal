// W3a: ahist.mussolini.rise-dictatorship (ZIMSEC rise of Mussolini; Cambridge Paper 4, key question 1.1).
import { concept, P, source, levels } from "../lib.mjs";
import { POS, mc } from "../tables/w3a-util.mjs";

concept("ahist.mussolini.rise-dictatorship", { file: "mussolini/rise-dictatorship", keyPrefix: "mussolini.rise-dictatorship" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What name did Italian nationalists give to the peace settlement of 1919?",
    ok: ["The mutilated victory, as nationalists called it", "Correct: Italy felt cheated of promised lands."],
    no: [
      ["The red years of workers' revolution in the north", "This describes the Biennio Rosso, not the peace."],
      ["The March on Rome by the blackshirt squads", "This was the Fascist demonstration of 1922."],
      ["The Lateran settlement with the Pope in Rome", "This was a later agreement of 1929."],
    ],
    explanation: "Nationalists such as D'Annunzio complained that Italy had not received Dalmatia and Fiume, which had been promised in 1915.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the Biennio Rosso?",
    ok: ["A period of strikes and factory and land occupations in 1919-20", "Correct: it alarmed property owners."],
    no: [
      ["A period of rule by a Socialist government in the capital city", "No Socialist government ruled in Rome."],
      ["A civil war between Fascists and the king's loyal army officers", "No such civil war occurred."],
      ["A series of elections won by the Communist Party in the cities", "The Communist Party was formed only in 1921."],
    ],
    explanation: "The Biennio Rosso (two red years) saw strikes, land seizures and the occupation of factories by about half a million workers in 1920, which frightened landowners and industrialists.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "Who seized the port of Fiume with ex-soldiers in 1919?",
    ok: ["Gabriele D'Annunzio, the nationalist poet", "Correct: he held Fiume until December 1920."],
    no: [
      ["Benito Mussolini, the leader of the Fascist movement", "Mussolini did not seize Fiume."],
      ["Giovanni Giolitti, the Liberal prime minister of Italy", "Giolitti ordered D'Annunzio's removal."],
      ["Giacomo Matteotti, the Socialist deputy for Rovigo", "Matteotti was a parliamentarian, murdered in 1924."],
    ],
    explanation: "D'Annunzio seized Fiume in September 1919 and ruled it until the Italian government expelled him in December 1920.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did many landowners and industrialists support the Fascist squads?",
    ok: ["They hoped the squads would break the power of the socialists and unions", "Correct: they feared the left after the Biennio Rosso."],
    no: [
      ["They hoped the squads would divide their land among the peasants of the village", "The squads defended property."],
      ["They hoped the squads would force the King to give up his throne", "The Fascists did not intend to remove the King in 1921."],
      ["They hoped the squads would join the Socialists in the Chamber", "The Fascists were enemies of the Socialists."],
    ],
    hints: ["Think of the fear after 1920."],
    explanation: "Many property owners feared revolution and turned to the squads, which attacked union halls and socialist councils in 1921-22 with little police interference.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the decisive event that allowed Mussolini to become prime minister in October 1922?",
    ok: ["The King refused to sign the decree for martial law and asked him to govern", "Correct: this opened the way."],
    no: [
      ["The army defeated the Liberal government in a long battle in the streets of Rome", "No such battle took place."],
      ["The Fascists won more than half of the seats in a general election", "They had only 35 seats in 1921."],
      ["The Pope declared the King removed and named Mussolini leader", "The Pope took no such action."],
    ],
    hints: ["Think of Facta's request to the King."],
    explanation: "Prime Minister Facta wanted martial law to stop the March, but Victor Emmanuel III refused to sign it on 28 October and invited Mussolini to form a government.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What did the Acerbo Law of 1923 do?",
    ok: ["Gave two thirds of the seats to the party winning at least a quarter of the votes", "Correct: it ensured a Fascist majority."],
    no: [
      ["Gave the vote to women in all elections to the Chamber of Deputies", "It was about the share of seats."],
      ["Abolished the Chamber and replaced it with a council of the Duce", "The Chamber continued until the Fascist laws changed it."],
      ["Banned the Socialist and Communist parties from taking part", "Opposition parties were banned later, in 1926."],
    ],
    hints: ["Think of the quarter of the votes."],
    explanation: "The Acerbo Law awarded two thirds of the seats to the biggest party with at least 25 per cent of the votes, which produced a large Fascist majority in the 1924 election.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which fact best supports the view that Mussolini came to power with the help of Italy's elites?",
    ok: ["The King and many Liberals preferred to include him rather than oppose him", "Correct: the establishment made the appointment possible."],
    no: [
      ["The squads attacked socialist offices and union halls across the Po valley", "This shows Fascist violence."],
      ["Mussolini founded the Fascist movement in Milan in 1919 with ex-servicemen", "This shows the movement's origin."],
      ["Fascists broke the general strike of August 1922 by running public services", "This shows Fascist activity and its support from the public."],
    ],
    hints: ["Which fact shows the actions of the King or the politicians?"],
    explanation: "Historians who stress the elites' role point to the King's refusal of martial law and the willingness of Liberal and conservative leaders to work with Mussolini.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Why did the Matteotti murder not bring down Mussolini?",
    ok: ["The King took no action and the opposition withdrew from the Chamber", "Correct: the opposition left, and no one acted."],
    no: [
      ["The army arrested Mussolini and then released him a month later", "He was not arrested."],
      ["Mussolini was cleared in a trial in which the King testified", "There was no such trial."],
      ["The opposition won the next election and re-elected Mussolini", "The Aventine opposition boycotted parliament."],
    ],
    hints: ["Think of the Aventine Secession and the King."],
    explanation: "The opposition deputies walked out (the Aventine Secession) hoping the King would dismiss Mussolini. He did not; Mussolini regained his hold and in January 1925 moved to a dictatorship.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The March on Rome took place in October 1922.",
    answer: true,
    explanation: "True. Fascists gathered around Rome on 27-28 October 1922 and Mussolini became prime minister on 31 October.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Mussolini won power in 1922 because the Fascists had won a majority of seats in a free election.",
    answer: false,
    explanation: "False. Fascists had only 35 seats in 1921. Mussolini was appointed prime minister by the King after the March on Rome.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "By the end of 1926 Italy was a one-party state in which opposition parties were banned.",
    answer: true,
    hints: ["Think of the laws of 1925-26."],
    explanation: "True. Laws of 1925-26 banned opposition parties, controlled the press and trade unions and created a Special Tribunal.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term or person with its meaning.",
    pairs: [
      ["Squadrismo", "The violence of Fascist squads against socialists and unions"],
      ["Ras", "Local Fascist bosses such as Balbo and Farinacci"],
      ["Matteotti", "Socialist deputy murdered in June 1924"],
      ["Victor Emmanuel III", "The king who refused to sign the decree of martial law"],
    ],
    explanation: "These four terms are needed for questions on 1919-26.",
  });
  {
    const events = [
      "The Fascist movement is founded in Milan",
      "The March on Rome",
      "Matteotti is murdered",
      "Mussolini announces dictatorship in the Chamber",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["They run from 1919 to 1925."],
      explanation: "March 1919; October 1922; June 1924; January 1925.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Fascist squads were known as the {{blank:a}}, and the Italian king who invited Mussolini to form a government was Victor Emmanuel {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["blackshirts"], choices: ["blackshirts", "redshirts", "brownshirts", "greyshirts"] },
      { id: "b", accepted: ["III"], choices: ["II", "III", "IV", "V"] },
    ],
    explanation: "Blackshirts; Victor Emmanuel III (the Redshirts were Garibaldi's followers).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Socialist deputy who was murdered in June 1924 after denouncing Fascist violence.",
    accepted: ["Matteotti", "Giacomo Matteotti"],
    wrong: ["Gramsci"],
    explanation: "**Giacomo Matteotti**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe Italy's problems after the First World War.",
    points: ["Italy felt cheated at the peace settlement: the mutilated victory", "Unemployment, inflation and debt followed the war", "Strikes and the occupation of factories and land in 1919-20 alarmed property owners", "Governments were weak and unstable"],
    modelAnswer: "Many Italians felt that Italy had been cheated at the peace conference, which they called the mutilated victory. There was unemployment, inflation and debt. Strikes and the occupation of factories and land in 1919-20 alarmed property owners, and governments were weak and unstable.",
    explanation: "One mark for each problem described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the King did not stop the March on Rome.",
    points: [["He feared a civil war and doubted that the army would obey if ordered to fire on Fascists, who included many ex-soldiers", 2], ["He and many politicians believed that Mussolini could be tamed by office and used against the left", 2]],
    hints: ["Think of the King's fears and of the elites' hopes."],
    modelAnswer: "The King feared a civil war and doubted that the army would obey if ordered to fire on Fascists, who included many ex-soldiers. He and many politicians also believed that Mussolini could be tamed by office and used against the left.",
    explanation: "Credit reasons with development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Matteotti murder of 1924 was a turning point.",
    points: [["It showed the violence behind the regime and produced a crisis that the opposition failed to use, since they left parliament and the King did nothing", 2], ["Mussolini recovered and in January 1925 announced that he would take responsibility, then introduced the laws that ended opposition", 2]],
    hints: ["Think of the Aventine Secession and what Mussolini did next."],
    modelAnswer: "The murder showed the violence behind the regime and produced a crisis that the opposition failed to use, since they left parliament and the King did nothing. Mussolini recovered, and in January 1925 announced that he would take responsibility, and then introduced the laws that ended opposition.",
    explanation: "Credit explained consequences.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "an editorial in a fictional Liberal newspaper in Turin, 30 October 1922",
        "The King has acted to avoid bloodshed. The new government includes men of all parties, and Signor Mussolini has promised order. We must hope that the energy of the Fascists will now be used for the nation, and that the violence of recent months will end."),
      "",
      source("Source B", "a letter from a fictional landowner in Emilia to his cousin, spring 1921",
        "The leagues of the labourers had taken everything into their hands. Now the young men of the Fascio come with lorries and they have broken the leagues. Some say they use too much violence, but I have my harvest and my workers are quiet. The police do not interfere."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What hopes does Source A express about the new government?", points: ["That it will bring order", "That Fascist energy will serve the nation and the violence will end"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about attitudes to Fascist violence.", points: [["Agree: both accept that there has been violence and hope that it brings order or benefits", 2], ["Differ: A hopes violence will end and be replaced by orderly government, while B welcomes the violence because it has broken the labourers' leagues", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources for a historian explaining the rise of Mussolini?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A shows the attitude of Liberal opinion at the moment of appointment and its hope of taming the Fascists, but a newspaper may be trying to reassure readers", 2], ["B shows why landowners tolerated or supported the squads and the failure of the police, but it is one man's private view and is partial", 2], ["Own knowledge: the support of landowners and the King's refusal of martial law are well recorded; together the sources show the part of the elites", 2]], modelAnswer: "Source A is useful because it shows the hopes of Liberal opinion in October 1922 that Mussolini could be tamed by office, which matches the behaviour of the elites; but it is a newspaper editorial that may be trying to reassure its readers. Source B shows why landowners welcomed the squads and that the police did not interfere, which fits other evidence about the squadrismo of 1921; but it is one landowner's private view and he benefits from the violence. Together they show how elite support helped Mussolini, though neither explains the role of the King." }),
    ],
    hints: ["For (c), consider who wrote each source and for what purpose."],
    explanation: "Both sources are invented: a Liberal editorial and a landowner's letter.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "How far was the weakness of the Liberal state the main reason why Mussolini came to power in 1922?",
    levels: levels(8),
    points: [
      ["Liberal weakness: unstable coalitions, no mass party, failure to deal with strikes and violence, the King's refusal to use the army", 2],
      ["Fascist strength: the squads, the party's growth to 1921-22, the use of violence and the threat of the March on Rome", 2],
      ["Wider conditions: the mutilated victory, the Biennio Rosso, fear of socialism, and support from landowners, industrialists and the elites", 2],
      ["A supported judgement ranking the causes", 2],
    ],
    hints: ["Weigh the weakness of the government against Fascist violence and elite support."],
    modelAnswer: "The weakness of the Liberal state was the main reason. Governments were unstable, the Liberals had no mass party, and the state did not stop the squads. When the March on Rome came, the King refused to sign the decree for martial law and Mussolini was invited to govern. But the Fascists were not merely passive beneficiaries: the squads broke the Socialists' local power, and the threat of force made the appointment likely. Conditions also mattered, since the mutilated victory and the Biennio Rosso led landowners, industrialists and many in the middle classes to support Fascism. I conclude that Liberal weakness and the elites' calculations were most important, because the Fascists, with only 35 deputies, could have been stopped.",
    explanation: "Credit a balanced argument and a supported judgement.",
  });

  b.card("DEFINITION", "What was the 'mutilated victory'?", "The nationalist complaint that Italy had been cheated at the 1919 peace settlement, especially over Dalmatia and Fiume.");
  b.card("DEFINITION", "What was squadrismo?", "Violence by Fascist squads (blackshirts) against socialists, unions and cooperatives, tolerated by police and funded by landowners.");
  b.card("FACT", "When did the March on Rome take place and what was the outcome?", "27-28 October 1922; the King refused martial law and Mussolini became prime minister on 31 October.");
  b.card("FACT", "What was the Acerbo Law (1923)?", "Two thirds of the seats to the party with at least 25 per cent of the votes.");
  b.card("FACT", "Who was Matteotti and what happened to him?", "A Socialist deputy who denounced Fascist violence in May 1924 and was murdered by Fascists in June 1924.");
  b.card("FACT", "What was the Aventine Secession?", "The walk-out of opposition deputies from the Chamber after the Matteotti murder in 1924.");
  b.card("CONCEPT", "Why did the King allow Mussolini to take power?", "He feared civil war and army disloyalty and thought Mussolini could be tamed by office.");
  b.card("CONCEPT", "Which groups supported Fascism before 1922?", "Ex-servicemen, nationalists, landowners, industrialists and many middle-class people who feared socialism.");
  b.card("CONCEPT", "How was the dictatorship created between 1922 and 1926?", "The Acerbo Law, the 1924 election, the speech of 3 January 1925 and the laws of 1925-26 against opposition, press and unions.");
});
