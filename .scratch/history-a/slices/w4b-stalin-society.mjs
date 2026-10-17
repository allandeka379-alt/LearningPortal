// W4b: ahist.stalin.society (both boards; Cambridge Paper 4 key question 2.4).
import { concept, P, source, levels } from "../lib.mjs";
import { mc, chrono } from "../tables/w4b-util.mjs";

concept("ahist.stalin.society", { file: "stalin/society", keyPrefix: "stalin.society" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What name was given to the official style required of Soviet artists and writers from the 1930s?",
    ok: ["Socialist Realism, showing the building of socialism", "Correct: art had to show the building of socialism in a hopeful way."],
    no: [
      ["Constructivism, the experimental style of the 1920s", "Constructivism was an avant-garde style of the 1920s and was later discouraged."],
      ["Proletkult, the movement for a separate workers' culture", "Proletkult was a 1920s movement."],
      ["Futurism, the style that rejected old traditions entirely", "Futurism was an earlier avant-garde style."],
    ],
    explanation: "Socialist Realism, announced at the first Congress of the Union of Soviet Writers in 1934, required optimistic, accessible works that served the party's aims.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "What did the law of 1936 do about abortion?",
    ok: ["It banned abortion except where there was a clear medical reason for it", "Correct: the regime wanted a growing population."],
    no: [
      ["It made abortion free and available to every woman in the USSR", "Abortion had been legalised in 1920 but was now banned."],
      ["It required all women to have at least four children before the age of thirty", "Women were encouraged to have many children but were not obliged to."],
      ["It handed decisions on abortion to local soviets in each republic", "The ban was a national law."],
    ],
    explanation: "The 1936 law banned abortion except on medical grounds, made divorce more costly and offered payments to mothers of large families.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "What was the League of the Militant Godless?",
    ok: ["An organisation spreading atheist propaganda against religion", "Correct: it campaigned against the churches and mosques."],
    no: [
      ["A group of priests who defended the Church against the party's attacks", "It was an anti-religious body."],
      ["A body of foreign missionaries working among the nomads of Central Asia", "It was a Soviet body and not a mission."],
      ["A section of the Red Army that guarded the churches in the cities", "It did not guard churches."],
    ],
    explanation: "Founded in 1925 and led by Emelian Yaroslavsky, the League ran anti-religious propaganda, lectures and museums, with the support of the party.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did Stalin's government restore traditional discipline in schools in the 1930s?",
    ok: ["It wanted obedient, well-trained workers and experts for the plans", "Correct: the experiments of the 1920s were thought to be wasteful."],
    no: [
      ["It wished to return control of the schools to the Orthodox Church", "The Church was under attack."],
      ["It had been asked to do so by the Komsomol, which wanted stricter lessons", "The change came from the party leadership."],
      ["It wanted to end the teaching of reading and writing in the villages", "Literacy campaigns continued."],
    ],
    hints: ["Think of what the economy needed from schools."],
    explanation: "From 1931-36 the party restored textbooks, examinations, marks and uniforms because it needed skilled, disciplined workers. The progressive methods of the 1920s were said to have produced poor results.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which change in policy on national groups took place in the 1930s?",
    ok: ["A shift from korenizatsiya to Russification and purges of local leaders", "Correct: the regime reversed its earlier policy."],
    no: [
      ["A move to give each republic full independence from Moscow", "The USSR became more centralised, not less."],
      ["A ban on the Russian language in every school in the republics", "Russian was made compulsory in 1938."],
      ["An invitation to foreign states to settle in the borderlands of Siberia", "No such invitation was issued."],
    ],
    hints: ["Think of what happened to local communist leaders and to the Russian language."],
    explanation: "In the 1920s local languages and officials were promoted. In the 1930s national communists were purged, Russian was made compulsory in non-Russian schools (1938), and some groups were deported.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What happened to Shostakovich in January 1936?",
    ok: ["He was condemned in Pravda after Stalin had attended his opera", "Correct: he had to change his style to be safe."],
    no: [
      ["He was awarded a prize in Pravda for his new opera of Soviet life", "The article attacked, not praised."],
      ["He was sent to a camp for ten years after a trial for treason", "He was not sent to a camp."],
      ["He was made head of the Union of Soviet Writers by the party", "The Union of Writers was not for composers, and he was not made head."],
    ],
    hints: ["Think about the article 'Muddle Instead of Music'."],
    explanation: "Pravda attacked his opera Lady Macbeth of Mtsensk as formalist and chaotic. The attack warned all artists to follow Socialist Realism.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which fact best supports the view that Stalin's social policy was conservative as well as revolutionary?",
    ok: ["He restricted abortion and divorce and restored strict discipline in schools", "Correct: the policy returned to traditional values."],
    no: [
      ["Literacy rose from about one half to about four-fifths in the 1930s", "This shows transformation."],
      ["Women entered industry and the professions in large numbers", "This shows change."],
      ["Workers' children were promoted into technical posts and management", "This also shows change and mobility."],
    ],
    hints: ["Which fact shows a return to older ideas?"],
    explanation: "The Great Retreat of the 1930s restored traditional family values and discipline, even as industry and literacy transformed the country.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which statement about religion under Stalin is best supported by the evidence?",
    ok: ["Churches were closed and clergy shot, but many people kept their beliefs", "Correct: the 1937 census suggests a large number of believers."],
    no: [
      ["Religion was ended completely and no one admitted to belief by 1939", "The 1937 census showed many believers."],
      ["The government encouraged religion and built churches throughout the 1930s", "It attacked religion in the 1930s."],
      ["Only the Orthodox Church was attacked, while other faiths were protected", "Other faiths were also persecuted."],
    ],
    hints: ["Think of what the 1937 census found and what happened to it."],
    explanation: "Churches, mosques and synagogues were closed and clergy arrested. But a question on belief in the census of 1937 produced a large number of believers, and the results were suppressed.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Komsomol was the Communist youth league.",
    answer: true,
    explanation: "True. The Komsomol trained young people for the party and the plans. Younger children joined the Pioneers.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In the 1930s women in the USSR gained jobs and training but were also expected to do most of the housework and childcare.",
    answer: true,
    explanation: "True. Historians call this the 'double burden'. Few nurseries were provided and women were rarely in senior posts.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "The 1937 census showed that religious belief had almost disappeared in the Soviet Union.",
    answer: false,
    hints: ["Think of why the results were suppressed."],
    explanation: "False. A question on belief showed that a large share of adults still described themselves as believers. The results were suppressed and the officials punished.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Komsomol", "The Communist youth league for older teenagers and young adults"],
      ["Korenizatsiya", "The 1920s policy of promoting local languages and officials"],
      ["Zhenotdel", "The party's women's department of 1919-30"],
      ["Socialist Realism", "The official style demanded of writers and artists"],
    ],
    explanation: "Komsomol (youth), korenizatsiya (nationalities), Zhenotdel (women) and Socialist Realism (arts).",
  });
  chrono(b, [
    "Abortion is legalised",
    "The Union of Soviet Writers is founded with Socialist Realism as its doctrine",
    "Pravda attacks Shostakovich's opera",
    "Russian is made compulsory in non-Russian schools",
  ], {
    d: 3, skill: "UNDERSTANDING",
    hints: ["They run from 1920 to 1938."],
    explanation: "1920; 1934; January 1936; 1938.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Younger children joined the {{blank:a}}, while the Communist youth league for older teenagers was the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Pioneers"], choices: ["Pioneers", "Cheka", "Octobrists", "Gulag"] },
      { id: "b", accepted: ["Komsomol"], choices: ["Komsomol", "Politburo", "Sovnarkom", "Kolkhoz"] },
    ],
    explanation: "The Pioneers were for children (about ten to fifteen); the Komsomol for those from about fourteen to twenty-eight.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the style of art and literature required by the Soviet state from 1934.",
    accepted: ["Socialist Realism", "socialist realism"],
    wrong: ["Futurism"],
    explanation: "**Socialist Realism**, the doctrine adopted with the Union of Soviet Writers in 1934.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe Stalin's policy towards women and the family in the 1930s.",
    points: ["Abortion was banned in 1936 and divorce made harder", "Payments were offered to mothers of many children", "Women entered industry and the professions in large numbers", "Women still did most of the housework and childcare and held few senior posts"],
    modelAnswer: "Abortion was banned in 1936 and divorce was made harder, and payments were offered to mothers of many children. At the same time women entered industry and the professions in large numbers, but they still did most of the housework and childcare and held few senior posts.",
    explanation: "One mark for each accurate point.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Soviet state attacked religion in the 1930s.",
    points: [["Marxism regarded religion as a rival to communist ideas, and the churches and clergy were seen as a source of opposition to the regime", 2], ["Attacks on the churches, such as closures and arrests, helped to break the independence of the peasants and local leaders during collectivisation and the Terror", 2]],
    hints: ["Think of Marxist ideas and of the peasants."],
    modelAnswer: "Marxism regarded religion as a rival to communist ideas, and the churches and clergy were seen as a source of opposition to the regime. The closure of churches and the arrest of clergy also helped to break the independence of the peasants and of local leaders during collectivisation and the Terror.",
    explanation: "Credit explained reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Soviet state controlled the arts so tightly in the 1930s.",
    points: [["The party wanted art, literature and film to build support for the plans and for Stalin, and to teach people what to believe", 2], ["Independent artists might criticise the regime, so groups were dissolved, a single Union of Writers was set up and Socialist Realism was imposed", 2]],
    hints: ["Think of propaganda and the fear of criticism."],
    modelAnswer: "The party wanted art, literature and film to build support for the plans and for Stalin, and to teach people what to believe. Independent artists might criticise the regime, so independent groups were dissolved, a single Union of Writers was set up and Socialist Realism was imposed.",
    explanation: "Credit explained reasons.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a speech by a fictional Soviet women's organiser at a factory meeting, 1936",
        "Comrades, in our country the woman is a free citizen. She works at the lathe, she flies aeroplanes, she studies at the institute. Yet the nation also needs children, and the law now protects mothers and the family. A good Soviet woman builds both the factory and the home."),
      "",
      source("Source B", "a private diary entry by a fictional woman textile worker, 1937",
        "I leave at five to reach the mill by six. At night I queue for bread, cook, wash and mend while my husband reads the newspaper. My mother-in-law minds the child, because there is no place at the nursery. They say we are free, but I have never been so tired. I am proud of my work, though, and I have a certificate for it."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A say about the role of women in the Soviet Union?", points: ["Women work in industry, fly aeroplanes and study; they are free citizens", "Women are also expected to have children and build the home"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about the position of women.", points: [["Agree: both show women in paid work and combining it with a duty to the home", 2], ["Differ: A presents women as free and honoured; B shows the burden of work, housework and queues and a lack of nurseries", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying the position of women under Stalin?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is useful as evidence of the official image, with work, equality and motherhood, but it is a speech by a party organiser meant to persuade", 2], ["B is useful as private evidence of the double burden and the shortage of nurseries, but it is one woman's view and may not be typical", 2], ["Own knowledge: women were about two-fifths of the workforce by 1940, the 1936 law banned abortion and nurseries were few; this supports both sources", 2]], modelAnswer: "Source A is useful because it shows the official image of the Soviet woman as worker and mother, and it fits the 1936 law that encouraged large families, but as a speech by a party organiser it was meant to persuade. Source B is a private diary and shows the double burden and the lack of nurseries, which fits what we know, but it is one woman's view. Together they show the contrast between the official image and daily life, and so they are useful to a historian." }),
    ],
    hints: ["For (c), consider the purpose of a speech and of a diary."],
    explanation: "Both sources are invented: a speech and a diary entry.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the impact of Stalin's policies on young people and education.",
    levels: levels(8),
    points: [
      ["Expansion: mass literacy (about one half in 1926 to about four-fifths in 1939), technical education and social mobility", 2],
      ["Control: the Komsomol and Pioneers, propaganda in teaching, and the return to strict discipline and textbooks", 2],
      ["Limits: fees from 1940, the effects of the Terror, and the cult of Stalin in the schools", 2],
      ["A supported judgement on whether the main effect was opportunity or control", 2],
    ],
    hints: ["Weigh the opportunities against the controls."],
    modelAnswer: "Stalin's policies gave many young people new opportunities. Literacy rose from about one half in 1926 to about four-fifths in 1939, technical colleges opened, and the children of workers and peasants could rise into the new elite. But education was controlled. The Komsomol and Pioneers organised the young, teaching served propaganda and the cult of Stalin, and the experimental methods of the 1920s were replaced by strict discipline. Fees were introduced in 1940. I conclude that the impact was both: it opened doors for many, but the main aim was to serve the state, so control was at least as important as opportunity.",
    explanation: "Credit both sides and a judgement.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 250, max: 500 },
    stem: "'Stalin transformed Soviet society in the 1930s.' How far do you agree?",
    levels: levels(12),
    points: [
      ["Transformation: urbanisation, mass literacy, women in work, social mobility and a new elite, and the attack on the Church", 3],
      ["Continuity and limits: conservative family policy, the survival of belief, the double burden, and a return to Russian nationalism", 3],
      ["Control: Socialist Realism, the Terror and deportations changed behaviour but also produced silence and fear", 3],
      ["A supported judgement on the degree of transformation and the evidence used to weigh it", 3],
    ],
    hints: ["Choose a few areas and compare change with continuity in each."],
    modelAnswer: "Stalin certainly changed Soviet society, but the picture is mixed. The industrial drive created new cities, literacy rose from about one half to about four-fifths, women entered the workforce in large numbers, and promotion brought workers into the new elite. The Church was badly damaged. But there were strong continuities and limits. Family policy became conservative, women kept a double burden, religious belief survived in private, and the revived Russian nationalism marked a return to older ideas. Control through Socialist Realism, the Terror and the deportation of national groups changed behaviour, but its main effect was fear and silence, not a new socialist person. I therefore agree that society was transformed in its structure, in education and in work, but not as completely as the regime claimed, and less so in beliefs and family life.",
    explanation: "Credit both sides and a supported judgement.",
  });

  b.card("DEFINITION", "What was Socialist Realism?", "The official style of arts from 1934: optimistic, accessible works showing the building of socialism and serving the party.");
  b.card("DEFINITION", "What was korenizatsiya?", "The 1920s policy of promoting local languages and officials in the non-Russian republics, reversed in the 1930s.");
  b.card("FACT", "What did the 1936 family law do?", "Banned abortion except on medical grounds, made divorce harder and gave payments to mothers of many children.");
  b.card("FACT", "What was the League of the Militant Godless?", "An atheist organisation founded in 1925 that ran propaganda against religion.");
  b.card("FACT", "What happened to Shostakovich in January 1936?", "Pravda attacked his opera Lady Macbeth of Mtsensk, warning artists to follow the party line.");
  b.card("FACT", "How did Soviet literacy change between 1926 and 1939?", "From about one half to about four-fifths, according to census figures.");
  b.card("CONCEPT", "What was the 'Great Retreat'?", "The 1930s shift from radical social experiments to traditional family values, school discipline and national pride.");
  b.card("CONCEPT", "What was the 'double burden' for Soviet women?", "Working full-time in paid jobs while doing most of the housework and childcare.");
  b.card("CONCEPT", "How far did Stalin transform society?", "Greatly in work, education and cities; less in beliefs and family life, and with heavy control and fear.");
});
