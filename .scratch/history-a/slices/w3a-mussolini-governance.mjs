// W3a: ahist.mussolini.governance (ZIMSEC Mussolini's domestic and foreign policies; Cambridge Paper 4, key question 1.2).
import { concept, P, source, levels } from "../lib.mjs";
import { POS, mc } from "../tables/w3a-util.mjs";

concept("ahist.mussolini.governance", { file: "mussolini/governance", keyPrefix: "mussolini.governance" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What was the name of the Fascist secret police set up in 1927?",
    ok: ["OVRA, the secret police of Mussolini", "Correct: it used informers to watch opponents."],
    no: [
      ["The Gestapo of Nazi Germany", "The Gestapo was the Nazi secret police in Germany."],
      ["Cheka", "The Cheka was the early Soviet secret police."],
      ["Minculpop", "Minculpop was the Ministry of Popular Culture."],
    ],
    explanation: "OVRA was the Fascist secret police; its network of informers watched opponents of the regime.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did the Ministry of Popular Culture (1937) control?",
    ok: ["The press, radio, film and the arts, for propaganda", "Correct: it directed the regime's messages."],
    no: [
      ["The army and navy, and their plans for the war in Africa", "The armed forces were run by other ministries."],
      ["The Church schools, and the appointment of every bishop", "The Church kept its schools and its own appointments."],
      ["The trade unions and employers' groups in each industry", "These were part of the Corporate State."],
    ],
    explanation: "Minculpop took over censorship and propaganda in the press, radio, cinema and the arts.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which institution was made an organ of the state in 1928 and voted to remove Mussolini in 1943?",
    ok: ["The Grand Council of Fascism, the party's advisory body", "Correct: it advised on important matters."],
    no: [
      ["The Chamber of Fasces and Corporations, created in 1939", "This Chamber replaced the Chamber of Deputies."],
      ["The Special Tribunal for the Defence of the State", "The Special Tribunal tried political cases."],
      ["The Palazzo Vidoni Pact between unions and employers", "This was an agreement of 1925."],
    ],
    explanation: "The Grand Council of Fascism advised Mussolini; on 24-25 July 1943 it voted against him, and the King dismissed him.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What happened to Italy's Jews in 1938?",
    ok: ["They were barred from state jobs and schools and from marrying non-Jews", "Correct: racial laws were introduced."],
    no: [
      ["They were sent to death camps built on the island of Sardinia and in the north", "Deportation to camps began only after 1943."],
      ["They were given the same rights as other citizens in a new code", "Their rights were reduced."],
      ["They were allowed to join the Fascist Party and the army as officers", "They were excluded from the party and many jobs."],
    ],
    hints: ["Think of the racial laws of 1938."],
    explanation: "The laws of 1938 expelled foreign Jews, excluded Jews from the state service and schools and banned marriage with non-Jews. Deportations followed only after the German occupation in 1943.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the Corfu incident of 1923?",
    ok: ["Italy bombarded and occupied Corfu after an Italian general was murdered", "Correct: Mussolini made the Greeks pay compensation."],
    no: [
      ["Italy was expelled from the League after it had invaded Albania in that year", "Italy invaded Albania in 1939 and was still in the League."],
      ["Italy was defeated at sea by Greece and its allies off the coast", "Italy was not defeated; it bombarded the island."],
      ["Italy gave Corfu to Greece in return for the port of Fiume", "No such exchange took place."],
    ],
    hints: ["Think of the murder on the Greek-Albanian border."],
    explanation: "After General Tellini was murdered in August 1923, Mussolini bombarded and occupied Corfu. The Greeks paid compensation and Italy withdrew, a success for his aggressive method.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did the League of Nations fail to stop the invasion of Abyssinia?",
    ok: ["Sanctions excluded oil, and Britain and France hoped to keep Italy as an ally", "Correct: the response was weak."],
    no: [
      ["The League had no members that were willing to speak out in public against Italy", "Many members condemned the invasion."],
      ["The Emperor of Ethiopia refused to bring the case to Geneva himself in person", "Haile Selassie appealed to the League in person."],
      ["The League expelled Ethiopia and recognised Italian rule at once", "Ethiopia was not expelled in 1936."],
    ],
    hints: ["Think of oil and of Britain and France."],
    explanation: "The League imposed sanctions that did not cover oil, and Britain and France hoped to keep Italy as a counterweight to Germany, so the conquest went ahead.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which fact best supports the view that Fascist Italy was not fully totalitarian?",
    ok: ["The King, who dismissed Mussolini in 1943, kept his place as head of state", "Correct: the monarchy retained real power."],
    no: [
      ["The press was controlled by the Ministry of Popular Culture from the capital", "This supports the totalitarian view."],
      ["The secret police OVRA watched opponents of the regime", "This supports the totalitarian view."],
      ["Mussolini was shown on film as a man of destiny and as an athlete", "This is part of the cult of the leader."],
    ],
    hints: ["Which fact shows a rival centre of power?"],
    explanation: "A historian who calls Italy only partly totalitarian points to the survival of the monarchy, the Church and the army as rival centres of authority.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which comment on the invasion of Abyssinia is best supported by the evidence?",
    ok: ["It brought Mussolini popularity at home but pushed Italy towards Germany", "Correct: the gain at home was matched by isolation abroad."],
    no: [
      ["It ended in a defeat of Italy at Adwa, as in 1896", "Italy took Addis Ababa in 1936."],
      ["It was supported by the League with troops from Britain and France", "The League gave no military support to Italy."],
      ["It made Britain and France Italy's closest allies against Germany", "The invasion damaged relations with them."],
    ],
    hints: ["Think of both the immediate gain and the later consequence."],
    explanation: "Victory in 1936 was popular and gave Italy an empire, but sanctions and the quarrel with Britain and France drew Mussolini closer to Hitler, leading to the Axis.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Italy invaded Abyssinia in October 1935.",
    answer: true,
    explanation: "True. The invasion began on 3 October 1935, and Addis Ababa was taken in May 1936.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Fascist regime killed far more of its political opponents inside Italy than Nazi Germany or Stalin's USSR did.",
    answer: false,
    explanation: "False. Fascist repression inside Italy, though real (prison, internal exile, a few dozen death sentences by the Special Tribunal), was much smaller in scale than in Germany or the USSR.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "The King of Italy lost all his powers under Fascism and had no part in removing Mussolini in 1943.",
    answer: false,
    hints: ["Think of July 1943."],
    explanation: "False. The King remained head of state and commander of the armed forces, and he dismissed Mussolini in July 1943 after the vote of the Grand Council.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each event with its date.",
    pairs: [
      ["The Corfu incident", "1923"],
      ["The invasion of Abyssinia", "1935"],
      ["The Rome-Berlin Axis", "1936"],
      ["The Pact of Steel", "1939"],
    ],
    explanation: "Corfu 1923; Abyssinia October 1935; the Axis October 1936; the Pact of Steel May 1939.",
  });
  {
    const events = [
      "The Special Tribunal is set up",
      "Italy invades Abyssinia",
      "The racial laws are introduced",
      "Italy enters the Second World War",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["They run from 1926 to 1940."],
      explanation: "1926; October 1935; 1938; June 1940.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Mussolini's title was the {{blank:a}}, and the alliance with Germany signed in May 1939 was the Pact of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Duce"], choices: ["Duce", "Führer", "Caudillo", "Consul"] },
      { id: "b", accepted: ["Steel"], choices: ["Steel", "Iron", "Rome", "Munich"] },
    ],
    explanation: "Il Duce; the Pact of Steel.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the African country whose invasion by Italy in 1935 became a symbol of the League's failure.",
    accepted: ["Abyssinia", "Ethiopia"],
    wrong: ["Libya"],
    explanation: "**Abyssinia** (Ethiopia).",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the methods used to control opposition in Fascist Italy.",
    points: ["The Special Tribunal tried political opponents", "The secret police OVRA and informers watched people", "Opponents were sent into internal exile or went abroad", "The press and radio were controlled and censored"],
    modelAnswer: "The Special Tribunal tried political opponents, and the secret police OVRA with its informers watched people. Opponents were sent into internal exile or fled abroad, and the press and radio were controlled and censored.",
    explanation: "One mark for each method described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why propaganda was important to the Fascist regime.",
    points: [["It built the cult of the Duce as an infallible leader, which gave the regime popularity and legitimacy", 2], ["It spread Fascist values through the press, film, schools and rallies, and covered the regime's weaknesses", 2]],
    hints: ["Think of the leader's image and of the control of information."],
    modelAnswer: "Propaganda built the cult of the Duce as an infallible leader, which gave the regime popularity and legitimacy. It spread Fascist values through the press, film, schools and rallies, and it covered the regime's weaknesses.",
    explanation: "Credit reasons with development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Mussolini moved closer to Germany after 1935.",
    points: [["The invasion of Abyssinia led to League sanctions and a quarrel with Britain and France, which isolated Italy", 2], ["Germany supported Italy over Ethiopia and shared aims, and Mussolini saw an alliance as a way to gain from German power, as in the Axis of 1936", 2]],
    hints: ["Think of Abyssinia and the response of Britain and France."],
    modelAnswer: "The invasion of Abyssinia led to sanctions and a quarrel with Britain and France, which isolated Italy. Germany supported Italy and shared some aims, so Mussolini saw an alliance as a way to gain from German power, which led to the Axis of 1936.",
    explanation: "Credit explained reasons.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a propaganda poster of the kind issued in Italy in the 1930s, described in words",
        "The poster shows a large portrait of the Duce, chin raised, above a crowd of smiling workers and children. Underneath is a short slogan telling Italians to believe, obey and fight.",
        { described: true }),
      "",
      source("Source B", "a diary entry by a fictional government clerk in Rome, 1937",
        "At the office we have all joined the Party, as it is needed for promotion. At the cafe my colleague lowered his voice before he spoke of the war in Africa, for fear that someone might be listening. We cheer at the rallies, but at home we speak differently."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What message is Source A intended to give?", points: ["That the Duce is a strong, admired leader", "That Italians should believe, obey and fight / that people are happy under him"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about public attitudes to the regime.", points: [["Agree: both show public displays of support, such as the crowd in A and the rallies in B", 2], ["Differ: A presents enthusiasm and unity, while B shows that people joined for advancement and spoke differently in private, out of fear", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources for a historian studying how effectively Mussolini governed Italy?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is useful as evidence of the regime's aims and methods of propaganda, but as propaganda it does not show what Italians really thought", 2], ["B is a private diary and so more likely to be honest about fear and conformity, but it is one clerk's experience in Rome and is a single source", 2], ["Own knowledge: the cult of the Duce, the OVRA and the need for Party membership are well recorded; together the sources show the gap between image and private opinion", 2]], modelAnswer: "Source A is useful as evidence of how the regime wished to present itself, with the strong leader and the happy crowd, but as propaganda it cannot show what ordinary Italians thought. Source B is a private diary and so more likely to be frank about conformity and fear, which agrees with what we know about informers and the need for party membership; but it records one clerk's experience in Rome. Together they show the gap between the public image and private attitudes, which is useful for judging how far the regime was effective." }),
    ],
    hints: ["For (c), consider the purpose of each source."],
    explanation: "Both sources are invented: a poster described in words and a clerk's diary.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "How far was Mussolini successful in his foreign policy?",
    levels: levels(8),
    points: [
      ["Successes: Corfu, Fiume, the protectorate in Albania, Abyssinia and the empire, prestige at home", 2],
      ["Failures: isolation after Abyssinia, dependence on Germany, military weakness, the war of 1940", 2],
      ["Aims and methods: the Mediterranean empire, opportunism and showmanship, limited resources", 2],
      ["A supported judgement on the extent of success", 2],
    ],
    hints: ["Separate short-term gains from long-term results."],
    modelAnswer: "Mussolini's foreign policy brought short-term success but long-term failure. He gained prestige from Corfu, secured Fiume and turned Albania into a protectorate, and the conquest of Abyssinia in 1936 gave Italy an empire and made him popular at home. But these successes were gained cheaply against weak opponents and they cost him the friendship of Britain and France. He became dependent on Hitler through the Axis and the Pact of Steel, while Italy's economy and army were not ready for a major war, and the entry into the war in 1940 led to defeat and the fall of the regime. I conclude that his foreign policy was successful in its early aims but a failure when judged by its results.",
    explanation: "Credit a balanced argument and a supported judgement.",
  });

  b.card("DEFINITION", "What was OVRA?", "The Fascist secret police set up in 1927, using informers to watch opponents.");
  b.card("DEFINITION", "What was the cult of the Duce?", "Propaganda presenting Mussolini as an infallible leader, a man of destiny, sportsman and soldier.");
  b.card("FACT", "What did the Ministry of Popular Culture (1937) do?", "Controlled the press, radio, film and arts for propaganda.");
  b.card("FACT", "When did Italy invade Abyssinia and what did the League do?", "3 October 1935; the League imposed limited sanctions that excluded oil.");
  b.card("FACT", "What was the Corfu incident (1923)?", "Italy occupied Corfu after an Italian general was murdered on the Greek-Albanian border; Greece paid compensation.");
  b.card("FACT", "What were the Rome-Berlin Axis and the Pact of Steel?", "The Axis was the Italo-German understanding of October 1936; the Pact of Steel was the alliance of May 1939.");
  b.card("CONCEPT", "Why was Fascist Italy only partly totalitarian?", "The King, the Church and the army kept real power and Mussolini relied on compromise with elites.");
  b.card("CONCEPT", "What were the racial laws of 1938?", "Laws expelling foreign Jews and barring Italian Jews from state jobs, schools and marriage with non-Jews.");
  b.card("CONCEPT", "Was Mussolini's foreign policy a success?", "Short-term gains (Albania, Abyssinia, prestige), but isolation, dependence on Germany and the war of 1940 destroyed the regime.");
});
