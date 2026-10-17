// W4a: ahist.fascism.comparison-impact (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";
import { mc, chrono } from "../tables/w4a-util.mjs";

concept("ahist.fascism.comparison-impact", { file: "fascism/comparison-impact", keyPrefix: "fascism.comparison-impact" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which two countries formed the original Axis agreed in October 1936?",
    ok: ["Germany and Italy", "Correct: the Rome-Berlin Axis."],
    no: [
      ["Germany and Japan", "They signed the Anti-Comintern Pact in November 1936."],
      ["Italy and Japan", "Italy and Japan joined Germany only in the Tripartite Pact of 1940."],
      ["Germany and Spain", "Spain under Franco was not a member of the Axis."],
    ],
    explanation: "The Rome-Berlin Axis of October 1936 was a diplomatic understanding. It became the military Pact of Steel in 1939 and the Tripartite Pact with Japan in 1940.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "What was the Pact of Steel of May 1939?",
    ok: ["A full military alliance between Italy and Germany", "Correct: each promised support in war."],
    no: [
      ["A treaty between Germany and the Soviet Union", "That was the Nazi-Soviet Pact of August 1939."],
      ["An agreement between Britain and France to defend Poland", "That was a separate guarantee to Poland."],
      ["A trade treaty to supply Italy with German iron and coal", "It was a military alliance, not a trade treaty."],
    ],
    explanation: "Signed on 22 May 1939, it bound Italy and Germany to help each other in war, though Italy declared itself non-belligerent in September 1939 and entered the war in June 1940.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which event of 1935-36 drew Mussolini closer to Hitler?",
    ok: ["The international criticism of Italy's invasion of Ethiopia", "Correct: Italy was isolated by League sanctions."],
    no: [
      ["The union of Austria with Germany in the Anschluss", "The Anschluss occurred in 1938, after the Axis."],
      ["The Munich Conference over the Sudetenland", "Munich took place in 1938."],
      ["The signing of the Treaty of Versailles with Germany", "Versailles was signed in 1919."],
    ],
    explanation: "After the League condemned Italy's invasion of Ethiopia and imposed limited sanctions, Mussolini found Germany, which did not join the sanctions, a more friendly partner.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which difference between Mussolini's Italy and Hitler's Germany is correctly stated?",
    ok: ["The King could dismiss Mussolini, but no one could remove Hitler", "Correct: Mussolini was dismissed by the King in July 1943."],
    no: [
      ["Only Hitler used propaganda and a leader cult as a method of rule", "Mussolini's Il Duce cult used propaganda too."],
      ["Only Mussolini made war on other countries to win territory", "Both made war to win territory."],
      ["Only Hitler had a one-party state with a secret police force", "Mussolini had OVRA and a one-party state."],
    ],
    hints: ["Think of who could remove each ruler."],
    explanation: "Mussolini remained Prime Minister under King Victor Emmanuel III, who dismissed him on 25 July 1943. After 1934 Hitler faced no similar check at home.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "In what way were the foreign policies of Mussolini and Hitler similar?",
    ok: ["Both used force to expand and challenged the post-1919 settlement", "Correct: both attacked weaker neighbours."],
    no: [
      ["Both wished to extend the Treaty of Versailles to further countries", "Both attacked the settlement rather than extending it."],
      ["Both gave full support to the League of Nations and its sanctions", "Both undermined the League and Italy left it in 1937."],
      ["Both kept to their neutral aims and avoided any war until 1945", "Both made war on other states."],
    ],
    hints: ["Think of Ethiopia and Poland."],
    explanation: "Mussolini invaded Ethiopia (1935) and Albania (1939); Hitler took Austria, Czechoslovakia and Poland. Both opposed the League and the settlement of 1919.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which fact best shows that Italian Fascism was less racial than Nazism in its early years?",
    ok: ["Italy introduced no major racial laws until 1938", "Correct: Germany's racial laws began in 1933-35."],
    no: [
      ["Mussolini held the title of Duce, meaning 'leader'", "The title shows the leader cult, not race."],
      ["Fascist Italy invaded Ethiopia in 1935", "The invasion was imperial, and Nazi Germany had no similar invasion then."],
      ["Mussolini made a treaty with the Pope in 1929", "The Lateran Treaties concerned the Church, not race."],
    ],
    hints: ["Think of when each regime passed laws against the Jews."],
    explanation: "Nazi Germany passed anti-Jewish laws from April 1933 and the Nuremberg Laws in 1935; Italy introduced racial laws in 1938, partly under German influence.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which comment on Italy's invasion of Ethiopia in 1935 is best supported by the evidence?",
    ok: ["It revealed the weakness of the League of Nations in the face of aggression", "Correct: sanctions excluded oil and did not stop Italy."],
    no: [
      ["It proved that the League was strong enough to protect small states", "The League failed to protect Ethiopia."],
      ["It showed that Italy was a rival of Germany in Europe in 1936", "Italy moved towards Germany after the invasion."],
      ["It was a success for the Emperor Haile Selassie, who kept his throne", "He went into exile in 1936 and returned in 1941."],
    ],
    hints: ["Think of the sanctions and what they left out."],
    explanation: "The League condemned Italy but imposed only limited sanctions that excluded oil. Italy took Addis Ababa in May 1936, and the Emperor appealed in vain to the League in June.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Mussolini and Hitler were both leaders of single-party dictatorships.",
    answer: true,
    explanation: "True. The Fascist Party and the Nazi Party were the only legal parties in their states, and both leaders were the focus of a personality cult.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Anti-Comintern Pact of November 1936 was first signed by Germany and Japan, and Italy joined it in 1937.",
    answer: true,
    explanation: "True. It was aimed at the Communist International (Comintern) and the Soviet Union. Italy joined in November 1937.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Mussolini was able to control the army, the Church and the monarchy as completely as Hitler controlled his institutions.",
    answer: false,
    hints: ["Think of the King's power in 1943."],
    explanation: "False. The monarchy, the Church and the army kept some independence in Italy, and the King removed Mussolini in 1943; Hitler overrode the German army and officials after 1934.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each pact with its description.",
    pairs: [
      ["Rome-Berlin Axis (1936)", "A diplomatic understanding between Italy and Germany"],
      ["Anti-Comintern Pact (1936)", "An agreement against communism between Germany and Japan"],
      ["Pact of Steel (1939)", "A military alliance between Germany and Italy"],
      ["Tripartite Pact (1940)", "An alliance of Germany, Italy and Japan"],
    ],
    explanation: "The Axis (October 1936), the Anti-Comintern Pact (November 1936), the Pact of Steel (May 1939) and the Tripartite Pact (September 1940).",
  });
  chrono(b, [
    "Italy invades Ethiopia",
    "The Rome-Berlin Axis is agreed",
    "The Pact of Steel is signed",
    "The Tripartite Pact is signed",
  ], {
    d: 3, skill: "UNDERSTANDING",
    hints: ["They run from 1935 to 1940."],
    explanation: "October 1935; October 1936; May 1939; September 1940.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Mussolini's title as leader was {{blank:a}}, and the Italian secret police were called the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Il Duce"], choices: ["Il Duce", "Der Führer", "Il Papa", "Il Re"] },
      { id: "b", accepted: ["OVRA"], choices: ["OVRA", "Gestapo", "SS", "Cheka"] },
    ],
    explanation: "Il Duce means 'the leader'. OVRA was the Fascist secret police; the Gestapo was Germany's.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the African state that Italy invaded in October 1935.",
    accepted: ["Ethiopia", "Abyssinia"],
    wrong: ["Libya"],
    explanation: "**Ethiopia** (also called Abyssinia), ruled by Emperor Haile Selassie; Italy had been defeated there at Adwa in 1896.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "State two similarities and two differences between the domestic policies of Mussolini and Hitler.",
    points: ["Similarity: both created one-party states with a leader cult and strong propaganda", "Similarity: both used secret police, violence and youth organisations to control people", "Difference: Hitler's regime was far more racial, with persecution central from 1933 while Italy's racial laws came in 1938", "Difference: Mussolini remained limited by the king and the Church whereas Hitler faced no check after 1934"],
    modelAnswer: "Both created one-party states with a leader cult and strong propaganda. Both used secret police, violence and youth organisations to control people. However, Hitler's regime was far more racial, with persecution central from 1933, while Italy's racial laws came in 1938. Mussolini also remained limited by the king and the Church, whereas Hitler faced no check after 1934.",
    explanation: "One mark for each similarity or difference stated with a detail.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Mussolini and Hitler drew closer together in 1935-36.",
    points: [["Britain and France condemned Italy for invading Ethiopia and imposed sanctions, so Mussolini was isolated and needed a friend", 2], ["Germany did not join the sanctions, and both leaders were hostile to communism and intervened together in the Spanish Civil War, which created a common interest", 2]],
    hints: ["Think of the Ethiopian war and the Spanish Civil War."],
    modelAnswer: "Britain and France condemned Italy for invading Ethiopia and imposed sanctions, so Mussolini was isolated and needed a friend. Germany did not join the sanctions, and the two leaders shared hostility to communism and intervened together in the Spanish Civil War, which created a common interest.",
    explanation: "Credit explained reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how Italy's invasion of Ethiopia affected the League of Nations.",
    points: [["The League condemned Italy but its sanctions were limited, excluding oil, so they did not stop the conquest", 2], ["The failure showed that the League could not stop a determined aggressor, which encouraged Hitler and Mussolini, and Italy left the League in 1937", 2]],
    hints: ["Think of what the sanctions left out."],
    modelAnswer: "The League condemned Italy but its sanctions were limited and excluded oil, so they did not stop the conquest. The failure showed that the League could not stop a determined aggressor, which encouraged Hitler and Mussolini, and Italy left the League in 1937.",
    explanation: "Credit explained effects.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "an editorial in a fictional Ethiopian newspaper, 1936",
        "The League promised to protect every member, yet our country has been invaded by a great power using poison from the air. The world has watched. Sanctions without oil are words without action. Our Emperor has spoken in Geneva, and the nations have listened politely and done nothing."),
      "",
      source("Source B", "a speech by a fictional Italian official in a provincial town, 1936",
        "Our soldiers have raised the Roman standard in Addis Ababa. Italy has a place in the sun, and no sanctions or lectures from the old empires will take it from us. We have one leader, and we shall march at his side to greatness."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A say about the League of Nations?", points: ["It failed to protect Ethiopia, a member", "Its sanctions were weak (without oil) and the nations did nothing"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare the attitudes of Sources A and B to the war in Ethiopia.", points: [["Agree: both refer to the sanctions and the League's response and to the Emperor or Italy's leader", 2], ["Differ: A condemns the invasion and the use of poison from the air, whereas B celebrates the conquest and rejects criticism as hypocrisy from old empires", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying the impact of the Ethiopian war?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is useful for the Ethiopian view of the League's failure and the use of gas, but it is a newspaper writing to protest and win sympathy, so it may be one-sided", 2], ["B is useful for Italian propaganda and the pride in empire, but it is a speech designed to rouse support and ignores the cost to Ethiopians", 2], ["Own knowledge: sanctions excluded oil, Italy used mustard gas and took Addis Ababa in May 1936; the sources together show how different groups saw the war", 2]], modelAnswer: "Source A is useful as the Ethiopian view of the League's failure and the use of poison gas, which is confirmed by what is known, but it is a protest and so may be one-sided. Source B is useful as Italian propaganda showing pride in empire and contempt for the League, but it was designed to rouse support and ignores the cost to Ethiopia. Both fit known facts: sanctions excluded oil and Italy took Addis Ababa in May 1936. Together they show two sides of the war, but neither is neutral." }),
    ],
    hints: ["For (c), consider the purpose of a protest editorial and of a political speech."],
    explanation: "Both sources are invented: an editorial and a speech.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 250, max: 500 },
    stem: "To what extent were the domestic policies of Mussolini and Hitler similar?",
    levels: levels(12),
    points: [
      ["Similarities: one-party states, leader cults, propaganda, secret police, youth organisations, opposition to communism and liberalism, autarky", 3],
      ["Differences: race and persecution central for Hitler but not for Mussolini until 1938; scale of terror", 3],
      ["Differences: Mussolini limited by the king and Church while Hitler overrode the army and officials; speed of consolidation", 3],
      ["Judgement on whether the similarities in method outweigh the differences in ideology and extent", 3],
    ],
    hints: ["Give similarities and differences with evidence, then judge which is stronger."],
    modelAnswer: "The domestic policies of Mussolini and Hitler were similar in method but differed in ideology and in extent. Both created one-party states, with a leader cult, propaganda, secret police and youth organisations, and both pursued autarky and were hostile to communism and liberal democracy. These resemblances were close. But there were important differences. Hitler's regime was built on race: persecution of the Jews began in 1933, while Italy adopted racial laws only in 1938. Mussolini remained limited by the king and the Church, and the king dismissed him in 1943, whereas after 1934 Hitler faced no check from the army or officials. Nazi terror was also on a far larger scale. I conclude that the two regimes were similar in the techniques they used to control people, but the Nazi regime was far more radical and ideological, so the differences were as important as the similarities.",
    explanation: "Credit similarities and differences with evidence and a supported judgement.",
  });

  b.card("DEFINITION", "What was the Rome-Berlin Axis?", "The understanding of October 1936 between Italy and Germany, widened into the Pact of Steel in 1939 and the Tripartite Pact in 1940.");
  b.card("DEFINITION", "What was the Anti-Comintern Pact?", "The agreement of November 1936 between Germany and Japan against communism; Italy joined in November 1937.");
  b.card("FACT", "When was the Pact of Steel signed?", "22 May 1939, a military alliance between Germany and Italy.");
  b.card("FACT", "When and why did the Tripartite Pact link Germany, Italy and Japan?", "September 1940, as a military alliance of the three Axis powers.");
  b.card("FACT", "When did Italy invade Ethiopia?", "October 1935; Addis Ababa fell in May 1936 and the Italians ruled until 1941.");
  b.card("FACT", "When did the King dismiss Mussolini?", "25 July 1943, after the Allies landed in Sicily.");
  b.card("CONCEPT", "How did Nazism differ from Italian Fascism?", "It was built on race, was more violent and unrestrained at home; Mussolini was limited by the king and Church.");
  b.card("CONCEPT", "What did the two regimes have in common?", "A single party, leader cult, propaganda, secret police, youth movements, hostility to communism and expansionist aims.");
  b.card("CONCEPT", "What was the impact of the Ethiopian war on Africa and the League?", "It showed the League's weakness, alarmed Africans and people of African descent, and pushed Mussolini towards Hitler.");
});
