// W3a: ahist.mussolini.economy (ZIMSEC Mussolini's domestic policies; Cambridge Paper 4, key question 1.3).
import { concept, P, source, levels } from "../lib.mjs";
import { POS, mc } from "../tables/w3a-util.mjs";

concept("ahist.mussolini.economy", { file: "mussolini/economy", keyPrefix: "mussolini.economy" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What was the aim of the Battle for Grain launched in 1925?",
    ok: ["To make Italy self-sufficient in wheat and cut imports from abroad", "Correct: it aimed to reduce dependence on imports."],
    no: [
      ["To raise the price of wheat so that farmers could export more of it", "The aim was to cut imports, not to raise exports."],
      ["To feed the army in Libya and Ethiopia with Italian grain alone", "The campaign began before those wars."],
      ["To give peasants in the south the land of the large estates", "The large estates were not broken up."],
    ],
    explanation: "The Battle for Grain used tariffs and propaganda to raise wheat output and cut imports.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the main effect of Quota 90 on Italian industry?",
    ok: ["Exports became dearer and export industries suffered", "Correct: a strong lira hurt sales abroad."],
    no: [
      ["Imports became dearer and made raw materials more costly", "A strong lira made imports cheaper."],
      ["Wages rose sharply as employers had more money to spend", "Wages were cut."],
      ["Unemployment fell to zero as new factories were opened", "Unemployment rose."],
    ],
    explanation: "A strong lira made Italian goods more expensive abroad, so export industries lost sales and wages were cut.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "Which project is the best-known example of the Battle for Land?",
    ok: ["The draining of the Pontine Marshes near Rome, begun in 1928", "Correct: new towns such as Littoria were built there."],
    no: [
      ["The building of the Po canal across the plain of the north", "This is not the best-known project of the campaign."],
      ["The irrigation of the Libyan desert by Italian settlers", "Libya was a colony, not the main campaign."],
      ["The planting of olive groves on the hills of Tuscany", "This was not the best-known example."],
    ],
    explanation: "The Pontine Marshes were drained from 1928, and towns such as Littoria (1932) and Sabaudia (1934) were built, widely publicised by the regime.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the purpose of the IRI, set up in 1933?",
    ok: ["To take over failing banks' holdings in industry and rescue companies", "Correct: the state became a large owner of industry."],
    no: [
      ["To buy foreign companies and carry their profits to the Italian state", "Its purpose was domestic rescue."],
      ["To organise strikes in factories and break the power of employers", "Strikes were banned."],
      ["To plan the invasion of Ethiopia and raise money for the army", "It was not a military institution."],
    ],
    hints: ["Think of the banks that had collapsed in the Depression."],
    explanation: "The Istituto per la Ricostruzione Industriale took over the shares that failed banks held in industry, which gave the state a large share of Italian banking and heavy industry.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "How did the Corporate State treat independent trade unions?",
    ok: ["It banned them and recognised only Fascist unions", "Correct: strikes and free unions were illegal."],
    no: [
      ["It gave them seats in the Council of Ministers beside the Duce", "Free unions had no such seats."],
      ["It allowed them to call strikes in the heavy industries only", "Strikes were banned."],
      ["It merged them with the employers' groups into a single body", "Employers and Fascist unions had separate bodies."],
    ],
    hints: ["Think of the Palazzo Vidoni Pact and the Rocco Law."],
    explanation: "Under the Palazzo Vidoni Pact and the Rocco Law only Fascist unions were recognised and strikes were forbidden.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Why did the policy of autarky in the 1930s have only limited success?",
    ok: ["Italy lacked coal, oil and metals and still had to import them", "Correct: natural resources were scarce."],
    no: [
      ["Italy had too many natural resources to need any more imports", "Italy lacked key resources."],
      ["The League of Nations had ordered all trade with Italy to be stopped", "Sanctions were limited and ended in 1936."],
      ["Employers' groups refused to allow any changes in the industries", "Employers generally supported the policy."],
    ],
    hints: ["Think of the raw materials of heavy industry."],
    explanation: "Italy had little coal, iron or oil, so substitutes and higher costs only partly replaced imports.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which fact best supports the view that the Corporate State served the interests of employers more than workers?",
    ok: ["Independent unions and strikes were banned while employers kept control of pay", "Correct: workers had no way to bargain."],
    no: [
      ["The OND offered leisure activities and cheap holidays to workers", "This shows a benefit to workers."],
      ["Twenty-two corporations were created in 1934 for the branches of industry", "This shows the structure, not who gained."],
      ["The Labour Charter spoke of cooperation between classes in the nation", "This is the regime's claim."],
    ],
    hints: ["Which fact shows who held the bargaining power?"],
    explanation: "Banning independent unions and strikes left workers without bargaining power, while employers kept control, which is why historians say the system favoured them.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which comment on Mussolini's economic policies is best supported by the evidence?",
    ok: ["They often served prestige and war preparation more than efficiency", "Correct: the strong lira and autarky show this."],
    no: [
      ["They raised the real wages of workers by a large amount in the 1920s", "Real wages fell."],
      ["They ended unemployment completely during the Great Depression", "Unemployment rose above a million."],
      ["They gave the peasants of the south the land of the great estates", "The estates were not divided."],
    ],
    hints: ["Think of Quota 90 and autarky."],
    explanation: "Policies such as Quota 90, the grain campaign and autarky aimed at prestige and strength, often at the cost of efficiency and living standards.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The IRI was set up in the 1930s to rescue failing banks and industries.",
    answer: true,
    explanation: "True. The IRI was created in 1933 and gave the state a large share of Italian industry and banking.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Battle for Grain increased wheat output but made bread more expensive and reduced other crops.",
    answer: true,
    explanation: "True. Tariffs raised output and cut imports, but farmland was diverted from better-suited crops and consumers paid more.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Real wages and living standards rose steadily for most Italian workers under Fascism.",
    answer: false,
    hints: ["Think of wage cuts and the cost of bread."],
    explanation: "False. Real wages fell in the 1920s and early 1930s, and consumption of food per head did not rise, although some benefits were introduced.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each policy with its aim.",
    pairs: [
      ["Battle for the Lira", "To raise the lira to a strong rate for prestige"],
      ["Battle for Grain", "To grow more wheat and cut imports"],
      ["Battle for Land", "To drain marshes and reclaim farmland"],
      ["Corporate State", "To organise employers and workers under state control"],
    ],
    explanation: "These four policies are the core of Mussolini's economic programme.",
  });
  {
    const events = [
      "The Battle for Grain begins",
      "Quota 90 is reached",
      "The IRI is created",
      "The twenty-two corporations are established",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["They run from 1925 to 1934."],
      explanation: "1925; December 1927; 1933; 1934.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The state body set up in 1931 to lend to industry was the {{blank:a}}, and the leisure organisation for workers was the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["IMI"], choices: ["IMI", "IRI", "OVRA", "PNF"] },
      { id: "b", accepted: ["OND"], choices: ["OND", "ONB", "OVRA", "IRI"] },
    ],
    explanation: "The IMI (1931) and the Opera Nazionale Dopolavoro (OND).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the area of marshland near Rome that was drained as part of the Battle for Land.",
    accepted: ["Pontine Marshes", "the Pontine Marshes", "Pontine", "Pontine Marsh"],
    wrong: ["Po valley"],
    explanation: "The **Pontine Marshes**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the Battle for the Lira.",
    points: ["It was launched in 1926 to raise the value of the lira", "The target was about 90 lire to the pound (Quota 90)", "Government policy cut wages and raised interest rates to deflate", "The aim was prestige, but it made exports dearer"],
    modelAnswer: "The Battle for the Lira was launched in 1926 to raise the value of the lira. The target was about 90 lire to the pound, known as Quota 90. The government cut wages and raised interest rates, and although the aim was prestige it made exports dearer.",
    explanation: "One mark for each point described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Corporate State did not give workers a voice.",
    points: [["Independent unions and strikes were banned, and only Fascist unions were recognised", 2], ["Employers kept control of wages and hiring in the corporations, so the system served employers and the state", 2]],
    hints: ["Think of the Rocco Law and of who held the power."],
    modelAnswer: "Independent unions and strikes were banned and only Fascist unions were recognised. Employers kept control of wages and hiring in the corporations, so the system served employers and the state rather than workers.",
    explanation: "Credit reasons with development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the state responded to the Great Depression.",
    points: [["It founded the IMI and IRI to lend to industry and take over failing companies, giving the state a large share of industry", 2], ["It organised public works such as roads, drainage and building to create jobs, and cut wages and spread work to avoid dismissals", 2]],
    hints: ["Think of the IMI, the IRI and public works."],
    modelAnswer: "The state founded the IMI and the IRI to lend to industry and take over failing companies, which gave it a large share of industry. It also organised public works such as roads and drainage to create jobs, and cut wages and spread work to avoid dismissals.",
    explanation: "Credit explained measures.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a letter from a fictional wheat farmer in Puglia to a cousin in Argentina, 1931",
        "We were told to plant wheat on every field, and the government pays a good price, so my harvest sells well. But the olive trees on the hills are neglected, and my neighbour who grows vines is poorer. The price of bread in the town is high, and the poor complain."),
      "",
      source("Source B", "a recollection by a fictional factory worker in Turin, recorded in the 1960s",
        "In those years our wages were cut and they told us it was for the lira. We had no union of our own, only the Fascist one, which told us to accept. We had a day trip with the Dopolavoro, and I will say that was a pleasure. But there was never enough money."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What effects of the wheat campaign does Source A describe?", points: ["Good prices for wheat growers", "Neglect of olives and vines / poorer growers of other crops / dear bread"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about who gained and lost from Fascist economic policy.", points: [["Agree: both show some people gaining something (wheat growers, a day trip) and both mention people who suffered", 2], ["Differ: A shows winners and losers in farming and town consumers, while B shows wage cuts and the Fascist union failing workers", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources for a historian assessing the success of Mussolini's economic policies?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is a private letter written at the time, so likely to be frank, and it fits what we know of the grain battle; but it describes one region and one farmer", 2], ["B was recorded decades later and may be affected by memory and later attitudes to Fascism, yet it fits the wage cuts, the Fascist unions and the OND", 2], ["Own knowledge: the dearer bread, wage cuts and OND benefits are well documented; together the sources show costs and some benefits", 2]], modelAnswer: "Source A is useful because it is a private letter from the time, so the farmer had little reason to mislead, and it agrees with what we know about the grain campaign raising output but harming other farming and raising the price of bread; but it describes only one region. Source B was recorded decades later, so memory and later opinion may affect it, but it agrees with other evidence about wage cuts, the lack of free unions and the benefits of the OND. Together they show both costs and modest benefits, which helps in judging how successful the policies were." }),
    ],
    hints: ["For (c), consider when each source was written and by whom."],
    explanation: "Both sources are invented: a farmer's letter and a worker's recollection.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "How far were Mussolini's economic policies successful?",
    levels: levels(8),
    points: [
      ["Successes: the lira stabilised, grain output raised, the Pontine Marshes drained, the IRI rescued industry, some welfare through the OND", 2],
      ["Failures: exports and wages hurt by Quota 90, other crops neglected, limited land reform, autarky costly, living standards low", 2],
      ["Aims: prestige and war preparation rather than prosperity; the Corporate State favoured employers", 2],
      ["A supported judgement on how far the policies were successful", 2],
    ],
    hints: ["Separate achievements by policy and weigh them against the costs."],
    modelAnswer: "Mussolini's economic policies were only partly successful. He stabilised the lira, raised grain output, drained the Pontine Marshes and, through the IRI, rescued industry in the Depression, and the OND gave workers some benefits. But Quota 90 hurt exports and wages, the grain battle neglected better-suited crops and raised the price of bread, the land reclamation was small, and autarky depended on imports that Italy could not replace. The Corporate State left workers without a voice. Since the policies aimed at prestige and war preparation rather than prosperity, living standards did not rise. I conclude that the policies achieved limited successes at a high cost.",
    explanation: "Credit a balanced argument and a supported judgement.",
  });

  b.card("DEFINITION", "What was autarky?", "A policy of national economic self-sufficiency, pursued by Italy especially after sanctions in 1935-36.");
  b.card("DEFINITION", "What was the Corporate State?", "The Fascist system of corporations bringing employers, workers and the state together, replacing independent unions.");
  b.card("FACT", "What was Quota 90?", "The target of 90 lire to the pound set in the Battle for the Lira (1926-27); it made exports dearer.");
  b.card("FACT", "What did the Battle for Grain achieve?", "Wheat output rose and imports fell, but other crops suffered and bread was dearer.");
  b.card("FACT", "What was the IRI?", "The Istituto per la Ricostruzione Industriale (1933), which took over failing banks' holdings and gave the state a large share of industry.");
  b.card("FACT", "What was the OND?", "The Opera Nazionale Dopolavoro, the Fascist leisure organisation offering cheap holidays and clubs for workers.");
  b.card("CONCEPT", "Why did Mussolini's economic policies fail to raise living standards?", "They aimed at prestige and war preparation, wages were cut, bread was dearer and the Corporate State left workers without a voice.");
  b.card("CONCEPT", "How did the state respond to the Great Depression?", "Public works, the IMI (1931) and the IRI (1933), wage cuts and work-sharing.");
  b.card("CONCEPT", "Why was the Battle for Land limited?", "Only a small area was reclaimed (the Pontine Marshes were the showpiece) and the large estates of the south were untouched.");
});
