// W4b: ahist.stalin.power-struggle (both boards; Cambridge Paper 4 key question 2.1).
import { concept, P, source, levels } from "../lib.mjs";
import { mc, chrono } from "../tables/w4b-util.mjs";

concept("ahist.stalin.power-struggle", { file: "stalin/power-struggle", keyPrefix: "stalin.power-struggle" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which post, held by Stalin from April 1922, gave him control over party appointments?",
    ok: ["General Secretary of the party, with control of its appointments", "Correct: the Secretariat appointed party officials."],
    no: [
      ["Commissar for War, in charge of the Red Army and its officers", "That post was held by Trotsky until January 1925."],
      ["Chairman of Sovnarkom, the head of the Soviet government", "Lenin held the chairmanship until his death."],
      ["Head of the Comintern, the body directing foreign communist parties", "Zinoviev led the Comintern in these years."],
    ],
    explanation: "As General Secretary, Stalin controlled the Secretariat and Orgburo, which appointed party secretaries and delegates. This built a network loyal to him.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "What did Lenin's Testament say about Stalin?",
    ok: ["It said he was too rude and should be removed as General Secretary", "Correct: a postscript made this suggestion."],
    no: [
      ["It named him as Lenin's chosen heir and the next leader of the party", "Lenin did not name him as heir."],
      ["It praised him as the ablest man on the Central Committee of the party", "That description was used of Trotsky, with a warning."],
      ["It asked that he be sent abroad to run the Comintern in Europe", "The Testament did not say this."],
    ],
    explanation: "A postscript of January 1923 said that Stalin was too rude and suggested that he be replaced as General Secretary. The Central Committee did not publish the Testament in May 1924.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "What was meant by 'Socialism in One Country'?",
    ok: ["The USSR could build socialism by itself, without revolution abroad", "Correct: it did not depend on revolutions in Europe."],
    no: [
      ["Socialism could only succeed after revolutions in advanced countries abroad", "That was Trotsky's Permanent Revolution."],
      ["Each province of the USSR should build its own separate socialist state", "It concerned the USSR as a whole."],
      ["Private farms should be allowed to continue under a socialist government", "The slogan was not about private farms."],
    ],
    explanation: "Stalin argued in 1924 that the USSR could build socialism alone. It appealed to members tired of waiting for world revolution, and contrasted with Trotsky's Permanent Revolution.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why was Trotsky at a disadvantage in the struggle for power after 1924?",
    ok: ["He had no base in the party machine and was suspected of wishing to rule alone", "Correct: he lacked organisation, and many distrusted him."],
    no: [
      ["He had never taken part in the revolution of October 1917 in Petrograd", "Trotsky played a leading role in October."],
      ["He supported the rule of the Tsar's officers against the Red soldiers", "He built the Red Army."],
      ["He was in prison abroad during the whole struggle for the leadership", "He took part in the struggle until 1927-28."],
    ],
    hints: ["Think about the party machine and about how others saw his ambitions."],
    explanation: "Trotsky was a brilliant figure but arrogant, a former Menshevik, and with no network in the party. Rivals could portray him as a would-be Bonaparte.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which tactic of Stalin's helped him most to defeat his rivals one by one?",
    ok: ["Allying with one group against another and then turning on his allies", "Correct: he used the Left, then the Right."],
    no: [
      ["Calling a national referendum in which the people elected the leader", "No such vote took place."],
      ["Leading the Red Army in a coup against the Politburo and the Central Committee", "He did not use the army to seize power."],
      ["Publishing Lenin's Testament so that his rivals would be discredited", "The Testament was kept secret."],
    ],
    hints: ["Think about the alliances he made in 1923-29."],
    explanation: "Stalin joined Zinoviev and Kamenev against Trotsky, then Bukharin against Zinoviev and Kamenev, then adopted the Left's policy against Bukharin and the Right.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did the grain-procurement crisis of 1927-28 matter in the power struggle?",
    ok: ["It led Stalin to abandon NEP and break with Bukharin and the Right", "Correct: he adopted rapid industrialisation."],
    no: [
      ["It led Stalin to join Trotsky against Zinoviev and Kamenev in the Politburo", "Trotsky was already being expelled from the party."],
      ["It caused the Red Army to overthrow Stalin and hand power to Bukharin", "The army did not intervene."],
      ["It persuaded the peasants to elect Stalin to a new post as president", "There was no such election."],
    ],
    hints: ["Think about NEP and the peasants who withheld grain."],
    explanation: "When peasants held back grain, Stalin turned to forced requisitioning and then to rapid industrialisation. Bukharin, Rykov and Tomsky opposed this and were defeated in 1928-29.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which fact best supports the view that the structure of the party helped Stalin to win power?",
    ok: ["Lenin's ban on factions let Stalin brand criticism as disloyalty", "Correct: the rules he inherited made opposition dangerous."],
    no: [
      ["Trotsky was ill and absent from Lenin's funeral in January 1924", "This shows a personal mistake or misfortune."],
      ["Zinoviev and Kamenev underestimated Stalin and joined him against Trotsky", "This shows the rivals' errors."],
      ["Stalin's slogan of Socialism in One Country appealed to ordinary members", "This shows the appeal of his ideas."],
    ],
    hints: ["Which fact is about the system rather than about the individuals?"],
    explanation: "The ban on factions (1921) meant that open criticism of the leadership could be treated as splitting the party. Stalin used it with control of the machine against each opponent.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which view of Stalin's rise do historians who stress the weaknesses of his rivals hold?",
    ok: ["He won because the others underestimated him and quarrelled among themselves", "Correct: the rivals' errors opened the way."],
    no: [
      ["He won only because Lenin had chosen him in his Testament as his heir", "The Testament criticised him."],
      ["He won only because the Red Army made him the leader in a military coup", "There was no military coup."],
      ["He won only because the peasants and workers voted for him at the polls", "There was no popular election."],
    ],
    hints: ["Think of the mistakes of Trotsky, Zinoviev, Kamenev and Bukharin."],
    explanation: "This view stresses that his rivals underrated him, failed to unite against him and accepted the party rules that he exploited. Others emphasise his skill or the party structure.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Trotsky was exiled from the USSR in 1929.",
    answer: true,
    explanation: "True. He was exiled to Alma-Ata in January 1928 and deported from the Soviet Union in February 1929. He was murdered in Mexico in 1940.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Bukharin supported NEP and the Left wanted rapid industrialisation.",
    answer: true,
    explanation: "True. Bukharin and the Right defended NEP and slow growth. Trotsky and later Zinoviev and Kamenev argued for faster industrialisation.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "By 1929 Stalin had had all his rivals executed.",
    answer: false,
    hints: ["Think about what happened to Trotsky, Zinoviev and Bukharin by 1929."],
    explanation: "False. In the 1920s his rivals were removed from posts, expelled or exiled. Most were killed during the purges of the 1930s, and Trotsky in 1940.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each man with his position in the 1920s.",
    pairs: [
      ["Leon Trotsky", "Commissar for War and rival of Stalin"],
      ["Grigory Zinoviev", "Head of the Leningrad party and the Comintern"],
      ["Nikolai Bukharin", "Editor of Pravda and defender of NEP"],
      ["Lev Kamenev", "Head of the Moscow party and a member of the triumvirate"],
    ],
    explanation: "Trotsky (Red Army), Zinoviev (Leningrad, Comintern), Bukharin (Pravda, NEP) and Kamenev (Moscow).",
  });
  chrono(b, [
    "Stalin becomes General Secretary",
    "Lenin dies",
    "Trotsky loses his post as Commissar for War",
    "Trotsky is expelled from the USSR",
  ], {
    d: 3, skill: "UNDERSTANDING",
    hints: ["They run from 1922 to 1929."],
    explanation: "April 1922; 21 January 1924; January 1925; February 1929.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Stalin's theory that the USSR could build socialism alone was called Socialism in {{blank:a}} Country, while Trotsky's theory was called {{blank:b}} Revolution.",
    blanks: [
      { id: "a", accepted: ["One"], choices: ["One", "Every", "Any", "Two"] },
      { id: "b", accepted: ["Permanent"], choices: ["Permanent", "Peasant", "Provisional", "Popular"] },
    ],
    explanation: "Socialism in One Country was opposed by Trotsky's Permanent Revolution.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the political bloc of Stalin, Zinoviev and Kamenev formed in 1923-25 to keep Trotsky from power.",
    accepted: ["triumvirate", "the triumvirate", "troika", "the troika"],
    wrong: ["Politburo"],
    explanation: "The **triumvirate** (the 'troika'), which fell apart when Zinoviev and Kamenev broke with Stalin in 1925.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the strengths and weaknesses of Trotsky as a candidate to succeed Lenin.",
    points: ["Strength: he had led the Red Army and played a leading part in October 1917", "Strength: he was a brilliant writer and speaker", "Weakness: he was arrogant and had joined the Bolsheviks only in 1917", "Weakness: he had no base in the party machine and was suspected of wanting to rule alone"],
    modelAnswer: "Trotsky had led the Red Army and played a leading part in October 1917, and he was a brilliant writer and speaker. But he was arrogant and had joined the Bolsheviks only in 1917, and he had no base in the party machine and was suspected of wanting to rule alone.",
    explanation: "One mark for each accurate strength or weakness.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Stalin was able to defeat Trotsky.",
    points: [["As General Secretary he controlled party appointments, so the congresses were filled with his supporters, while Trotsky had no organisation", 2], ["Trotsky made mistakes (absent from the funeral, attacked Zinoviev and Kamenev) and was isolated, and he could be branded a factionalist", 2]],
    hints: ["Think of Stalin's post and Trotsky's mistakes."],
    modelAnswer: "As General Secretary Stalin controlled appointments, so the congresses were filled with his supporters, while Trotsky had no organisation. Trotsky also made mistakes, being absent from Lenin's funeral and attacking Zinoviev and Kamenev, and he was isolated and could be branded a factionalist.",
    explanation: "Credit explained reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Stalin turned against Bukharin and the Right in 1928-29.",
    points: [["The grain crisis of 1927-28 showed that NEP was not supplying enough food to the towns, so Stalin chose to requisition grain and speed up industry", 2], ["Bukharin, Rykov and Tomsky opposed this new policy, and Stalin, having removed the Left, was strong enough to defeat them and to portray them as deviationists", 2]],
    hints: ["Think of the grain crisis and of whom he no longer needed."],
    modelAnswer: "The grain crisis of 1927-28 showed that NEP was not supplying enough food to the towns, so Stalin chose to requisition grain and speed up industry. Bukharin, Rykov and Tomsky opposed this change, and Stalin, having removed the Left, was strong enough to defeat them and to portray them as deviationists.",
    explanation: "Credit explained reasons.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a letter from a fictional provincial party secretary to a colleague, 1925",
        "The General Secretary has asked that our delegates to the congress be reliable comrades. He is a modest man who sits at his desk all day and answers every letter. The great speakers in Moscow quarrel among themselves, but the comrades in the provinces want order and a clear line. I have chosen men who will vote as the centre asks."),
      "",
      source("Source B", "a pamphlet from a fictional supporter of Trotsky's views, 1926",
        "The party is being run by officials who owe their posts to the Secretariat. The members are told not to discuss policy because discussion splits the party. The old comrades of the revolution are called traitors, and the apparatus decides all. If the party cannot argue, it will be ruled by clerks."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about how delegates to the congress were chosen?", points: ["They were chosen as reliable men who would vote as the centre asked", "The General Secretary influenced the choice of delegates"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about the power of the party officials.", points: [["Agree: both show that officials loyal to the centre controlled the party, and that this affected who could speak or vote", 2], ["Differ: A presents it as a sensible search for order by a modest Stalin; B condemns it as a stifling of debate and rule by clerks", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying how Stalin won the struggle for power?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is useful because it shows the working of the machine from inside by a man who benefited, but he may be favourable to Stalin and has an interest in presenting loyalty as order", 2], ["B is useful because it shows how opponents saw the system, but it is a partisan pamphlet and may exaggerate", 2], ["Own knowledge: Stalin's control of appointments, the ban on factions and the defeats of the Left at the congresses (1925, 1927) support both sources", 2]], modelAnswer: "Source A is useful because it shows how the machine worked from the inside, with delegates chosen for loyalty, and it fits what we know of Stalin's control of appointments, but it comes from a man who gained from the system and presents loyalty as the search for order. Source B shows how opponents saw it, and matches the ban on factions and the defeats of the Left at the congresses, but a partisan pamphlet may exaggerate. Together they show both the means by which Stalin won and the reaction to it, so they are useful to a historian when read side by side." }),
    ],
    hints: ["For (c), think about who wrote each source and what each wanted."],
    explanation: "Both sources are invented: a provincial secretary's letter and an opposition pamphlet.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of the ideological arguments in the struggle for power after Lenin's death.",
    levels: levels(8),
    points: [
      ["The arguments were real: NEP against rapid industrialisation, Socialism in One Country against Permanent Revolution", 2],
      ["Stalin used the arguments tactically: he shifted from the Right to the Left's policy as it suited his needs", 2],
      ["Other factors mattered more: control of the party machine, personalities and alliances, and the ban on factions", 2],
      ["A supported judgement, for example that the ideas supplied the issues, but power decided who won", 2],
    ],
    hints: ["Weigh ideas against organisation and personality."],
    modelAnswer: "The ideological arguments were real: NEP against rapid industrialisation and Socialism in One Country against Permanent Revolution. They divided the party and gave each side a case. But Stalin used them tactically. He first backed NEP with Bukharin against the Left, and then adopted rapid industrialisation to defeat Bukharin. His control of the party machine, the ban on factions and the divisions among his rivals mattered more than the ideas. I conclude that the arguments supplied the issues but organisation and tactics decided who won.",
    explanation: "Credit explanation of ideas and other factors and a judgement.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 250, max: 500 },
    stem: "'Stalin won the struggle for power mainly because his rivals made mistakes.' How far do you agree?",
    levels: levels(12),
    points: [
      ["Rivals' mistakes: Trotsky underrated Stalin and was absent from the funeral; Zinoviev and Kamenev helped to defeat Trotsky and were then isolated; Bukharin backed Stalin against the Left", 3],
      ["Stalin's own skill: control of appointments as General Secretary, the Lenin Enrolment, shifting alliances and the appeal of Socialism in One Country", 3],
      ["Structure and circumstances: the ban on factions, the one-party state and the grain crisis", 3],
      ["A supported judgement on the relative importance of mistakes and Stalin's skill and position", 3],
    ],
    hints: ["Consider whether the rivals' mistakes would have mattered without Stalin's position."],
    modelAnswer: "The mistakes of his rivals were important, but I think they were less important than Stalin's position and skill. Trotsky underrated Stalin and missed Lenin's funeral, Zinoviev and Kamenev helped to destroy Trotsky before finding themselves isolated, and Bukharin helped Stalin to defeat the Left before being defeated himself. However, Stalin made good use of these errors. As General Secretary he controlled appointments and filled the congresses with loyal delegates, enrolled new members through the Lenin Enrolment, and shifted his alliances and policies to suit his needs. He benefited too from the party's structure, since the ban on factions allowed him to call opposition disloyalty, and from the grain crisis, which gave him a reason to change course. I therefore agree only in part: the mistakes created the opportunity, but Stalin's control of the machine and his tactics took it.",
    explanation: "Credit both sides and a supported judgement.",
  });

  b.card("DEFINITION", "What was Lenin's Testament?", "Notes dictated in 1922-23 giving Lenin's views of leading Bolsheviks; a postscript suggested removing Stalin as General Secretary. It was not published.");
  b.card("DEFINITION", "What was Socialism in One Country?", "Stalin's 1924 idea that the USSR could build socialism by its own efforts, opposed by Trotsky's Permanent Revolution.");
  b.card("FACT", "When did Stalin become General Secretary?", "April 1922; the post controlled party appointments.");
  b.card("FACT", "What happened to Trotsky?", "Removed as Commissar for War (January 1925), expelled from the party (November 1927), exiled (1928), deported from the USSR (1929) and murdered in Mexico (1940).");
  b.card("FACT", "What was the triumvirate?", "The alliance of Stalin, Zinoviev and Kamenev (1923-25) that kept Trotsky from power.");
  b.card("FACT", "What was the United Opposition (1926)?", "A group of Trotsky, Zinoviev and Kamenev opposing Stalin; it was condemned and its leaders expelled by 1927.");
  b.card("CONCEPT", "Why did Stalin defeat Trotsky?", "He controlled party appointments, allied with Zinoviev and Kamenev, and Trotsky had no organisation, made mistakes and could be branded a factionalist.");
  b.card("CONCEPT", "Why did Stalin turn against Bukharin in 1928-29?", "The grain crisis led him to abandon NEP for rapid industrialisation, which Bukharin and the Right opposed.");
  b.card("CONCEPT", "Why was the ban on factions important to Stalin?", "It allowed him to treat opposition as disloyalty and to enforce it through the party machine.");
});
