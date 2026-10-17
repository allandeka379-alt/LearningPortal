// W4a: ahist.nazi.rise-dictatorship (ZIMSEC topic 17; Cambridge Paper 4 Hitler 3.1).
import { concept, P, source, levels } from "../lib.mjs";
import { mc, chrono } from "../tables/w4a-util.mjs";

concept("ahist.nazi.rise-dictatorship", { file: "nazi/rise-dictatorship", keyPrefix: "nazi.rise-dictatorship" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which event of November 1923 failed to bring the Nazis to power?",
    ok: ["The Munich Putsch", "Correct: the police stopped the march in Munich on 9 November 1923."],
    no: [
      ["The Reichstag Fire", "The Fire was in February 1933 and the Nazis used it, not suffered from it."],
      ["The Night of the Long Knives", "That was the purge of June 1934, after Hitler held power."],
      ["The Kapp Putsch", "The Kapp Putsch of 1920 was a plot by right-wing soldiers, not by Hitler."],
    ],
    explanation: "Hitler and Ludendorff led the Beer Hall Putsch in Munich on 8-9 November 1923. It was put down by the police, and Hitler was imprisoned in 1924.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What lesson did Hitler draw from the failure of the Munich Putsch?",
    ok: ["That the party should seek power through winning elections", "Correct: he adopted a strategy of legality after 1924."],
    no: [
      ["That the Nazis should give up politics and leave Germany", "He continued in politics and re-founded the party in 1925."],
      ["That an armed rising supported by the army was certain to win", "The army had not supported the Putsch, and he turned away from rebellion."],
      ["That the party should join the Communists against Weimar", "The Nazis remained bitter enemies of the Communists."],
    ],
    explanation: "After Landsberg, Hitler built a national party organisation and fought elections, while keeping the SA for intimidation. He still aimed to destroy the Republic, but by using its own rules.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "What share of the vote did the Nazis win in the Reichstag election of May 1928?",
    ok: ["About 2.6 per cent", "Correct: it was a small party before the Depression."],
    no: [
      ["About 18.3 per cent", "That was the result of September 1930."],
      ["About 37.3 per cent", "That was the high point of July 1932."],
      ["About 44 per cent", "That was the result of March 1933, after Hitler became Chancellor."],
    ],
    explanation: "In 1928 the Nazis won 2.6 per cent and 12 seats. After the Depression their share rose to 18.3 per cent in 1930 and 37.3 per cent in July 1932.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did the government of Brüning rule by emergency decree from 1930?",
    ok: ["He lacked a Reichstag majority, so Article 48 was invoked", "Correct: decree government replaced parliamentary government."],
    no: [
      ["The Enabling Act had already abolished the Reichstag in 1930", "The Enabling Act came in 1933, after Brüning's fall."],
      ["The Nazis held a majority but refused to take their seats", "The Nazis had only 107 seats in 1930, a minority."],
      ["The Treaty of Versailles forbade an elected parliament to sit", "Versailles did not abolish the Reichstag."],
    ],
    hints: ["Think of what Article 48 allowed the President to do."],
    explanation: "After the collapse of Müller's coalition in March 1930 no majority could be found. Brüning governed by decree under Article 48, which accustomed Germans to rule without parliament.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Who persuaded President Hindenburg to appoint Hitler Chancellor in January 1933?",
    ok: ["Conservative leaders around him, led by Franz von Papen", "Correct: Papen and the President's circle believed they could control Hitler."],
    no: [
      ["Ernst Röhm, the SA chief, who acted with the Communists", "Röhm did not negotiate the appointment and the Communists opposed Hitler."],
      ["Gustav Stresemann, the Foreign Minister of the 1920s", "Stresemann had died in October 1929."],
      ["Heinrich Brüning, who wished to return as Chancellor", "Brüning had been dismissed in May 1932 and played no part in the deal."],
    ],
    hints: ["Think of the former Chancellor who became Vice-Chancellor."],
    explanation: "Papen, Oskar von Hindenburg and Meissner persuaded the President that a cabinet with only three Nazis could be controlled. They were wrong.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What did the Enabling Act of 23 March 1933 do?",
    ok: ["It let the government make laws without the Reichstag", "Correct: Hitler could legislate for four years."],
    no: [
      ["It suspended civil liberties after the Reichstag Fire burned", "That was the decree of 28 February 1933, a separate measure."],
      ["It made Hitler head of state on Hindenburg's death", "That was the law of 1 August 1934."],
      ["It banned every political party except the Nazi party", "That was the Law against the Formation of New Parties in July 1933."],
    ],
    hints: ["The name gives a clue: it 'enabled' the government to do something."],
    explanation: "The Act, passed by 444 votes to 94, gave the Cabinet power to pass laws, even laws that changed the Constitution, for four years. It was the legal basis of the dictatorship.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which fact most weakens the claim that Hitler came to power because a majority of Germans voted for him?",
    ok: ["The Nazi vote never rose above 37.3 per cent in a free election", "Correct: appointment followed a deal rather than a majority vote."],
    no: [
      ["The Nazis became the largest party in the Reichstag in July 1932", "That shows large support, not that the support was a majority."],
      ["The SA had grown to several hundred thousand men by 1932", "That shows the strength of the movement, not the size of the vote."],
      ["Goebbels organised propaganda for the Nazi election campaigns", "Propaganda explains the vote but does not show how large it was."],
    ],
    hints: ["Compare the Nazi share of the vote with a majority of 50 per cent."],
    explanation: "A plurality is not a majority. The party's share peaked at 37.3 per cent in July 1932 and fell to 33.1 per cent in November, and Hitler was appointed after negotiations among conservatives.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which comment best explains why the army accepted the Night of the Long Knives?",
    ok: ["It removed the SA, which the generals feared as a rival", "Correct: Hitler sacrificed the SA leaders to win the army's support."],
    no: [
      ["It gave the army control of the government in place of Hitler", "The army did not take control; it swore loyalty to Hitler."],
      ["It ended the Nazi party's attempts to control the courts", "Hitler continued to control the courts after 1934."],
      ["It restored the powers of the elected state governments", "The state governments had already lost their powers in 1933."],
    ],
    hints: ["Think of Röhm's wish to merge the army into the SA."],
    explanation: "Röhm's SA had more than two million men and Röhm wanted it to absorb the army. By killing him and other SA leaders, Hitler satisfied the generals, who then swore an oath to him personally in August 1934.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Adolf Hitler wrote the first volume of Mein Kampf while in prison after the Munich Putsch.",
    answer: true,
    explanation: "True. He dictated much of the first volume at Landsberg in 1924; it was published in 1925, with the second volume in 1926.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Nazi party won more than half of the votes in the free election of July 1932.",
    answer: false,
    explanation: "False. It won 37.3 per cent, which made it the largest party but left it without a majority.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "The Reichstag Fire decree of 28 February 1933 suspended basic civil liberties and made mass arrests possible.",
    answer: true,
    hints: ["Consider what the Nazis did against the Communists after the Fire."],
    explanation: "True. The Decree for the Protection of People and State suspended freedoms of speech, press and assembly and allowed arrests without trial, which the Nazis used against the communists in the weeks before the election of 5 March.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with his role in the rise of the Nazis.",
    pairs: [
      ["Ernst Röhm", "Leader of the SA, murdered in the Night of the Long Knives"],
      ["Joseph Goebbels", "Head of Nazi propaganda, a Gauleiter of Berlin"],
      ["Franz von Papen", "Conservative politician who negotiated Hitler's appointment"],
      ["Paul von Hindenburg", "President of Germany who appointed Hitler Chancellor"],
    ],
    explanation: "Röhm led the SA, Goebbels directed propaganda, Papen helped to bring Hitler into government and Hindenburg appointed him on 30 January 1933.",
  });
  chrono(b, [
    "Hitler is imprisoned after the Munich Putsch",
    "The Nazis win 18.3 per cent in the Reichstag election",
    "The Enabling Act is passed",
    "The Night of the Long Knives",
  ], {
    d: 3, skill: "UNDERSTANDING",
    hints: ["They run from 1924 to 1934."],
    explanation: "1924; September 1930; March 1933; June-July 1934.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Hitler was appointed Chancellor on 30 {{blank:a}} 1933, and the law of March 1933 that allowed him to make laws without parliament was the {{blank:b}} Act.",
    blanks: [
      { id: "a", accepted: ["January"], choices: ["January", "March", "June", "August"] },
      { id: "b", accepted: ["Enabling"], choices: ["Enabling", "Nuremberg", "Reichstag", "Versailles"] },
    ],
    explanation: "Hitler became Chancellor on 30 January 1933; the Enabling Act was passed on 23 March 1933.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Dutchman arrested at the burning Reichstag on 27 February 1933.",
    accepted: ["Marinus van der Lubbe", "van der Lubbe", "Van der Lubbe", "Lubbe"],
    wrong: ["Ernst Thälmann"],
    explanation: "**Marinus van der Lubbe**, a Dutch council communist. Historians still debate whether he acted alone.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the main steps by which Hitler removed opposition between January 1933 and August 1934.",
    points: ["The Reichstag Fire decree suspended civil liberties and was used against the Communists", "The Enabling Act allowed laws without the Reichstag", "Trade unions and other parties were abolished, giving a one-party state", "The Night of the Long Knives removed the SA leaders and other enemies, and after Hindenburg's death Hitler became Führer"],
    modelAnswer: "The Reichstag Fire decree suspended civil liberties and was used to arrest Communists. The Enabling Act then allowed Hitler to make laws without the Reichstag. Trade unions were abolished and other parties were banned, making Germany a one-party state. In the Night of the Long Knives the SA leaders and other enemies were killed, and after Hindenburg died in August 1934 Hitler became Führer.",
    explanation: "One mark for each step described with a detail.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Nazis won more support after 1929.",
    points: [["The Depression brought mass unemployment and ruin to farmers and shopkeepers, who turned to a party that promised work and national recovery", 2], ["Hitler's speeches and Goebbels's propaganda offered simple answers and scapegoats, while the weakness of Weimar governments made parliamentary democracy seem discredited", 2]],
    hints: ["Think of the Depression, the message of the Nazis and the failure of the other parties."],
    modelAnswer: "The Depression brought mass unemployment and ruin to farmers and shopkeepers, who turned to a party that promised work and national recovery. Hitler's speeches and Goebbels's propaganda offered simple answers and blamed Jews and Communists, while the weakness of Weimar governments, which ruled by decree, made democracy seem discredited.",
    explanation: "Credit reasons that are explained, not listed.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Hindenburg appointed Hitler Chancellor in January 1933.",
    points: [["Conservatives such as Papen, who wanted to restore authoritarian rule, believed a coalition led by Hitler would have a mass base but be controlled by themselves", 2], ["Schleicher had failed to form a majority government, and the circle around Hindenburg feared a crisis, so they turned to the largest party", 2]],
    hints: ["Think of what Papen and the President's advisers expected to gain."],
    modelAnswer: "Papen and other conservatives wanted a government with mass support but believed that a cabinet with only three Nazis could be controlled by themselves. Schleicher had failed to form a majority and the President's circle feared a crisis, so they turned to the leader of the largest party.",
    explanation: "Credit explained reasons that include the miscalculation of the conservatives.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a letter written by a fictional shopkeeper in a small German town to his brother abroad, 1932",
        "Business has never been so bad. I work fourteen hours and take in less than I did in 1928, and the bank has written to me twice. Last week I went to hear the Nazi speaker in the market hall. He said the politicians in Berlin had sold us to the bankers and that Germany would work again. I do not like the street fighting, but at least he promises something. I shall vote for them."),
      "",
      source("Source B", "a report written by a fictional local official of a Social Democrat trade union, July 1932",
        "Our members have suffered most. Half the men in the district have no work, and many have lost hope. Some young men now wear the brown shirt because they are given a meal and a place to belong. The Nazis speak of the nation, but they have no plan to put men back into the factories, and their stewards attack our meetings. Democracy must hold on until the economy recovers."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What reasons does Source A give for the shopkeeper's support for the Nazis?", points: ["His business and income have collapsed and the bank is pressing him", "The speaker blamed politicians and promised that Germany would work again"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about the effects of the Depression.", points: [["Agree: both show widespread hardship (the shopkeeper's falling income, half the men in the district without work) and a loss of faith in the existing system", 2], ["Differ: A shows a middle-class voter who is drawn to the Nazi promise, while B, from a union official, shows that workers were turned to the Nazis by meals and belonging but believes the party has no economic plan", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian explaining the growth of Nazi support?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is useful as the view of a small businessman, one of the groups from which Nazi voters came, and as evidence that economic distress, not only racism, moved voters, but it is the view of one man and is a private letter", 2], ["B is useful for the role of the SA and the position of workers, but the author is a Social Democrat opponent and may understate the Nazis' appeal and exaggerate their violence", 2], ["Own knowledge: the Nazi vote of 37.3 per cent in July 1932, the support of the middle classes and farmers, the SA and the Depression fit both sources; together they show a range of motives", 2]], modelAnswer: "Source A is useful because it shows how a small businessman, one of the groups that gave the Nazis their votes, was driven by economic ruin to vote for them despite disliking street violence. It is a private letter, so the writer had no reason to lie, but it is one man's view. Source B is useful for the attraction of the SA to unemployed young men and for the view of the left, but it is by a Social Democrat who opposed the Nazis and may have exaggerated their violence. Both fit what is known: the Nazis won 37.3 per cent in July 1932, with strong support among the middle classes and farmers. Together the sources show that economic distress, the promise of belonging and weakness of democracy all mattered, although neither shows how widespread each motive was." }),
    ],
    hints: ["For (c), think about who wrote each source and for what purpose."],
    explanation: "Both sources are invented: a private letter and a trade union official's report.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 250, max: 500 },
    stem: "How far was the Depression the main reason why the Nazis came to power in 1933?",
    levels: levels(12),
    points: [
      ["The Depression: mass unemployment and ruin turned voters from the moderate parties, and the Nazi vote rose from 2.6 to 37.3 per cent between 1928 and 1932", 3],
      ["Political weakness: decree government under Brüning, the quarrels of the parties and fear of communism made democracy fragile", 3],
      ["Nazi methods: Hitler's appeal, propaganda, the SA and organisation turned discontent into votes", 3],
      ["Judgement: the Depression was the necessary condition, but appointment depended on the decisions of Papen and Hindenburg's circle; reaches a supported conclusion", 3],
    ],
    hints: ["Separate the conditions that made Nazi success possible from the decisions that brought Hitler to office."],
    modelAnswer: "The Depression was the most important condition for the Nazi rise, but it does not explain the appointment of Hitler on its own. Before the Crash the Nazis won only 2.6 per cent of the vote; after mass unemployment began, their share rose to 18.3 per cent in 1930 and 37.3 per cent in July 1932. Ruined farmers and shopkeepers and the unemployed turned from the moderate parties, which seemed unable to help. But the Depression struck other countries without producing a dictatorship. In Germany, democracy was already weak: Brüning governed by decree, and the parties could not agree on a majority. Hitler's skill as a speaker, Goebbels's propaganda and the SA also turned discontent into support. Finally, Hitler was not elected into office. Papen and Hindenburg's circle decided to bring him in after the Nazi vote had fallen in November 1932. I conclude that the Depression created the opportunity, and the combination of weak politics, Nazi methods and the elite's miscalculation turned it into power.",
    explanation: "Credit explained factors and a judgement that ranks them.",
  });

  b.card("DEFINITION", "What was the Enabling Act?", "The law of 23 March 1933 that allowed Hitler's government to make laws without the Reichstag for four years.");
  b.card("DEFINITION", "What was Gleichschaltung?", "The Nazi policy of 'coordination' in 1933-34 by which states, parties, unions and organisations were brought under Nazi control.");
  b.card("DEFINITION", "What was Article 48 of the Weimar Constitution?", "The article that let the President rule by emergency decree; used from 1930 to govern without a Reichstag majority.");
  b.card("FACT", "When was the Munich Putsch?", "8-9 November 1923; it failed and Hitler was imprisoned in 1924, writing Mein Kampf.");
  b.card("FACT", "What share of the vote did the Nazis win in July 1932?", "37.3 per cent and 230 seats, making them the largest party; the share fell to 33.1 per cent in November 1932.");
  b.card("FACT", "When did Hitler become Chancellor?", "30 January 1933, appointed by President Hindenburg, with Papen as Vice-Chancellor.");
  b.card("FACT", "What happened in the Night of the Long Knives?", "30 June-2 July 1934: the SS and Gestapo murdered Röhm and other SA leaders and some old enemies; at least 85 people died.");
  b.card("CONCEPT", "Why did the Nazis' support grow after 1929?", "Mass unemployment, fear of communism, Hitler's appeal, propaganda, the SA and the failure of Weimar governments.");
  b.card("CONCEPT", "Why did the conservatives bring Hitler into government?", "They wanted mass support for an authoritarian government and thought they could control him in a cabinet with only three Nazis.");
  b.card("CONCEPT", "How did Hitler become Führer in 1934?", "After the army's support was won by the killing of the SA leaders, Hindenburg died on 2 August and the offices of President and Chancellor were merged.");
});
