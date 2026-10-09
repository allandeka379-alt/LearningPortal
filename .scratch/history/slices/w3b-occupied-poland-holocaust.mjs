// Slice W3b: Nazi-occupied Poland and the Holocaust (Cambridge Depth study E, KQ3). Accurate, respectful, no graphic
// detail; figures only as well-established estimates.
import { concept, P, source, levels, timeline } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];
const order = timeline([
  ["November 1938", "Kristallnacht in Germany"],
  ["November 1940", "The Warsaw ghetto is sealed"],
  ["January 1942", "The Wannsee Conference"],
  ["April 1943", "The Warsaw Ghetto Uprising begins"],
]);

concept("hist.ww2.occupied-poland-holocaust", { file: "ww2/occupied-poland-holocaust", keyPrefix: "ww2.occupied-poland-holocaust" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Historians estimate that about how many Jews were murdered in the Holocaust?",
    options: [
      ["About six million", "Correct: around two-thirds of the Jews of Europe."],
      ["About six hundred thousand", "This is far too low; it is about a tenth of the estimated total."],
      ["About sixty thousand", "This is far too low."],
      ["About sixty million", "This is ten times too high: it is the order of magnitude of ALL deaths in the whole war."],
    ],
    answer: "A",
    explanation: "Historians estimate that about **six million** Jews were murdered by Nazi Germany and its collaborators.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What name was given to the part of German-occupied Poland that was not annexed into the Reich?",
    options: [
      ["The General Government", "Correct: it was ruled from Kraków by Hans Frank."],
      ["The Protectorate", "The Protectorate of Bohemia and Moravia was in the Czech lands."],
      ["Vichy", "Vichy was the collaborating French regime."],
      ["The Sudetenland", "The Sudetenland was taken from Czechoslovakia in 1938."],
    ],
    answer: "A",
    explanation: "Western Poland was annexed; the rest of German-held Poland became the **General Government**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the purpose of the Wannsee Conference of 20 January 1942?",
    options: [
      ["To coordinate the murder of all Europe's Jews", "Correct: senior officials organised the 'Final Solution'."],
      ["To plan the invasion of the Soviet Union", "Barbarossa had begun in June 1941."],
      ["To agree peace terms with Britain", "No peace talks took place."],
      ["To divide Poland between Germany and the USSR", "Poland was divided by the Nazi-Soviet Pact in 1939."],
    ],
    answer: "A",
    explanation: "At **Wannsee** officials from different ministries coordinated the deportation and murder of Europe's Jews. Mass killing had already begun in 1941.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What did Nazi policy towards Poles aim to do?",
    options: [
      ["Destroy Polish leadership and culture and use Poles as labour", "Correct: teachers, priests and officials were targeted."],
      ["Make Poland an equal partner and ally of Germany against the USSR", "Nazi ideology treated Poles as inferior."],
      ["Restore Polish independence after the war", "There was no such plan."],
      ["Give Polish universities more funding", "Polish universities and secondary schools were closed."],
    ],
    answer: "A",
    explanation: "Nazi racial ideology treated Slavs as inferior; the occupiers killed or imprisoned Polish leaders, closed higher education and deported workers to Germany.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did so many people die in the Warsaw ghetto before the deportations of 1942?",
    options: [
      ["Overcrowding, starvation rations and diseases such as typhus", "Correct: over 400,000 people were crowded into a small area."],
      ["Bombing raids on Warsaw by the Soviet and British air forces", "Deaths in the ghetto were caused by Nazi policy, not bombing."],
      ["Fighting in the Warsaw Uprising of 1944", "The 1944 Warsaw Uprising came after the ghetto had been destroyed."],
      ["A flood of the River Vistula", "There was no such flood."],
    ],
    answer: "A",
    explanation: "Deliberately low food rations, overcrowding and **typhus** killed tens of thousands in the ghetto.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How did the invasion of the USSR in June 1941 change Nazi policy towards Jews?",
    options: [
      ["Einsatzgruppen began the systematic mass shooting of Jews", "Correct: policy moved from persecution to mass murder."],
      ["Jews in occupied lands were allowed to emigrate freely", "Emigration was blocked."],
      ["The ghettos in Poland were closed and their people freed", "The ghettos remained until their people were deported."],
      ["Persecution stopped while the army fought the Red Army", "Persecution became murder."],
    ],
    answer: "A",
    hints: ["Think about what the units following the army did."],
    explanation: "From June 1941 the **Einsatzgruppen** murdered Jewish communities in the occupied USSR, for example at Babi Yar in September 1941.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why is the secret archive organised by Emanuel Ringelblum such an important source?",
    options: [
      ["It records ghetto life in the victims' own words at the time", "Correct: it was created inside the Warsaw ghetto."],
      ["It was written by Nazi officials to justify their policies", "It was made by Jews in the ghetto."],
      ["It contains the official statistics prepared for the Wannsee Conference", "It contains diaries, essays and documents of ghetto life."],
      ["It was written by Allied soldiers after liberation", "It was made during the war, inside the ghetto."],
    ],
    answer: "A",
    hints: ["Think about who made it, when and why."],
    explanation: "The **Ringelblum archive** was created to leave evidence for the future, and much of it was recovered after the war.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement accurately describes the historians' debate about how the Holocaust developed?",
    options: [
      ["Some stress Hitler's intentions, others step-by-step radicalisation", "Correct: most historians now see both factors at work."],
      ["Historians debate whether the Holocaust happened at all", "The Holocaust is among the best-documented events in history."],
      ["All historians agree it was planned in detail in 1933", "Mass murder developed over time; this is not the consensus."],
      ["Historians agree that it was organised entirely without Hitler's knowledge", "No serious historian argues this."],
    ],
    answer: "A",
    hints: ["The debate is about HOW and WHEN, not WHETHER."],
    explanation: "'Intentionalist' historians stress Hitler's long-held aims; 'functionalist' historians stress how policies became more radical through competing officials and the circumstances of war.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Soviet troops liberated Auschwitz on 27 January 1945.",
    answer: true,
    explanation: "True. The date is now marked as International Holocaust Remembrance Day.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Nazi death camps, such as Treblinka and Auschwitz-Birkenau, were built inside Germany's 1937 borders.",
    answer: false,
    explanation: "False. The death camps (Chełmno, Bełżec, Sobibór, Treblinka, Majdanek, Auschwitz-Birkenau) were all in occupied Poland.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Ghetto", "Closed area of a city where Jews were forced to live"],
      ["Einsatzgruppen", "Mobile killing units in the occupied USSR"],
      ["Żegota", "Underground council that organised aid to Jews in Poland"],
      ["Home Army", "The main Polish underground resistance army"],
    ],
    explanation: "These terms cover persecution, murder, rescue and resistance in occupied Poland.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [order.events[2][1], order.events[3][1], order.events[0][1], order.events[1][1]],
    right: POS,
    rightIndex: [2, 3, 0, 1],
    hints: ["The violence in Germany came before the war began."],
    explanation: "Kristallnacht November 1938; Warsaw ghetto sealed November 1940; Wannsee January 1942; Warsaw Ghetto Uprising April 1943.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Nazi official who ruled the General Government from Kraków was Hans {{blank:a}}. The word 'genocide' was created in 1944 by the Polish-Jewish lawyer Raphael {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Frank"], choices: ["Frank", "Göring", "Speer", "Paulus"] },
      { id: "b", accepted: ["Lemkin"], choices: ["Lemkin", "Ringelblum", "Moulin", "Erzberger"] },
    ],
    explanation: "**Hans Frank** governed the General Government; **Raphael Lemkin** created the word genocide.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe how Poland was divided and ruled after September 1939.",
    points: [
      "Invaded by Germany (1 September) and the USSR (17 September) under the Nazi-Soviet Pact.",
      "Western Poland annexed into Germany; Poles expelled for German settlers.",
      "The rest of German-held Poland became the General Government under Hans Frank.",
      "Eastern Poland under Soviet rule: arrests, deportations, Katyn (1940).",
    ],
    modelAnswer: "Poland was invaded by Germany on 1 September and by the USSR on 17 September 1939, as agreed in the Nazi-Soviet Pact. Germany annexed western Poland and expelled Poles to make room for German settlers. The rest of German-held Poland became the General Government, ruled by Hans Frank from Kraków. The USSR took eastern Poland, where it arrested and deported hundreds of thousands, and in 1940 its secret police shot about 22,000 Polish officers and others at Katyn.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain how Nazi policy towards Jews moved from persecution to mass murder.",
    points: [
      "Identifies persecution in Germany from 1933 (Nuremberg Laws, Kristallnacht).",
      "Explains that this removed Jews' rights and showed that violence would go unpunished.",
      "Identifies the conquest of Poland and the ghettos.",
      "Explains that millions of Jews came under Nazi rule and were isolated and starved in ghettos.",
      "Identifies the invasion of the USSR / Einsatzgruppen / Wannsee and the death camps.",
      "Explains that war in the east led to mass shootings, then gas and death camps coordinated at Wannsee in 1942.",
    ],
    hints: ["Follow the steps: Germany, Poland, the USSR, the death camps."],
    modelAnswer: "From 1933 the Nazis persecuted Jews in Germany: the Nuremberg Laws of 1935 took away their citizenship and Kristallnacht in 1938 showed that violence against them would go unpunished. The conquest of Poland in 1939 brought millions of Jews under Nazi rule, and they were forced into ghettos, where many died of hunger and disease. When Germany invaded the USSR in June 1941, the Einsatzgruppen began the mass shooting of whole Jewish communities. From December 1941 gas was used at Chełmno, and after the Wannsee Conference in January 1942 Jews from all over Europe were deported to death camps in occupied Poland.",
    explanation: "Two marks for each developed step.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how Jews in occupied Poland resisted Nazi persecution.",
    points: [
      "Warsaw Ghetto Uprising (April-May 1943).",
      "Uprisings at Treblinka and Sobibór (1943).",
      "Unarmed resistance: secret schools, prayer, cultural life, smuggling food.",
      "Recording the truth: the Ringelblum archive / escape and joining partisans.",
    ],
    hints: ["Resistance was not only armed."],
    modelAnswer: "In April 1943 young fighters in the Warsaw ghetto rose against the Germans and held out for weeks. Prisoners rose up at Treblinka and Sobibór in 1943. Many people resisted without weapons, by running secret schools, holding religious services and concerts, and smuggling food. In Warsaw Emanuel Ringelblum's group created a secret archive to record the truth, and some Jews escaped to join partisan groups in the forests.",
    explanation: "One mark per point described.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the source and answer the questions.\n\n${source("Source A", "a page from the diary of a fictional teenage girl in a ghetto in occupied Poland, early 1942", "Today Father traded his winter coat for half a loaf. Mother says we must not complain, because the family across the landing has nothing at all. Our teacher still holds lessons in her room, though it is forbidden; there were eleven of us this morning. People whisper about the trains that leave and never come back. I write so that someone will know we were here.")}`,
    hints: ["In (c), think about why the diary was written and what other evidence exists."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What can you learn from Source A about life in the ghetto?", points: [
        "Severe hunger / people sold possessions for food.",
        "People kept up education and community life despite the bans.",
      ], explanation: "Two points from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "Use the source and your own knowledge to explain why people in the ghettos feared the deportation trains.", points: [
        "The source says people did not return.",
        "Own knowledge: from 1942 deportations went to death camps such as Treblinka.",
        "Rumours and messages reached the ghettos about the camps.",
        "Own knowledge: the Wannsee Conference (January 1942) coordinated mass deportation and murder.",
      ], explanation: "Source and own knowledge." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How useful is a source like this to a historian studying life in the ghettos?", points: [
        "Useful: written at the time by someone living in the ghetto; personal and immediate.",
        "Useful: content (hunger, secret schools, fear of deportation) matches what is known from other sources such as the Ringelblum archive.",
        "Useful: shows feelings and unarmed resistance that official records do not.",
        "Limit: one family's experience in one ghetto; a young writer may not know the wider picture.",
        "Limit: rumour rather than confirmed knowledge about the trains.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "A diary like this is very useful because it was written at the time by someone living in the ghetto, with no reason to deceive, and it shows feelings that official Nazi records never recorded. Its details, hunger, people selling possessions for food, secret lessons and fear of the trains, match what historians know from other sources such as the Ringelblum archive. It also shows unarmed resistance through education and the writer's wish to leave a record. However, it shows only one family's experience in one ghetto, and a young writer could not know the full picture: her knowledge of the trains was based on whispers. It is very useful for understanding daily life and feelings, and should be used alongside other evidence.", explanation: "Provenance, content and own knowledge." }),
    ],
    explanation: "Practice source-based question (12 marks). The diary is invented for the question.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), compare ideology with the effects of war and conquest."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe Nazi terror against non-Jewish Poles.", points: [
        "Arrest and killing of leaders: teachers, priests, officials; Kraków professors (November 1939).",
        "Closure of secondary schools and universities.",
        "Expulsions from annexed lands; forced labour in Germany.",
        "Public executions and collective punishments / Auschwitz first used for Polish prisoners.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "\"Nazi ideology, rather than the circumstances of war, was the main reason for the Holocaust.\" How far do you agree?", points: [
        ["Ideology: racial antisemitism at the heart of Nazism; Hitler's hatred of Jews.", 2],
        ["Ideology: persecution 1933-39 (Nuremberg Laws, Kristallnacht) before the war.", 2],
        ["War: conquest of Poland brought millions of Jews under Nazi rule; ghettos.", 2],
        ["War: invasion of the USSR led to mass shootings; war hid crimes and radicalised policy; Wannsee.", 2],
        ["Historians' debate: intentions versus step-by-step radicalisation; most see both.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "Nazi ideology was the root of the Holocaust. Racial antisemitism lay at the centre of Nazism, and Hitler had attacked Jews in his speeches and writings since the early 1920s. Between 1933 and 1939, before any war, the regime removed Jews' rights through boycotts and the Nuremberg Laws and organised the violence of Kristallnacht. Without this ideology there would have been no Holocaust.\n\nHowever, the circumstances of war shaped how and when mass murder happened. The conquest of Poland in 1939 brought over three million Jews under Nazi control, and they were forced into ghettos. The invasion of the USSR in 1941, presented as a war against 'Jewish Bolshevism', led the Einsatzgruppen to begin mass shootings, and war conditions hid the killing and removed restraints. At Wannsee in January 1942 officials coordinated the murder of all Europe's Jews. Historians debate how far it was planned in advance and how far it developed step by step; most now see both factors at work.\n\nI largely agree. Ideology explains why Jews were targeted, so it was the main reason, but the war turned persecution into genocide by giving the Nazis control over millions of people and the cover to murder them.", explanation: "Both sides, the debate and a supported judgement reach the top level." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("DEFINITION", "Holocaust (Shoah)", "The systematic, state-sponsored murder of about six million Jews by Nazi Germany and its collaborators.");
  b.card("DEFINITION", "Ghetto", "A closed area of a city where the Nazis forced Jews to live in overcrowded, starving conditions.");
  b.card("DEFINITION", "Genocide", "The deliberate destruction of a national, ethnic, racial or religious group; a word created by Raphael Lemkin in 1944.");
  b.card("FACT", "When was the Warsaw ghetto sealed?", "November 1940; it held over 400,000 people at its peak.");
  b.card("FACT", "What was the Wannsee Conference?", "20 January 1942: senior officials coordinated the 'Final Solution', the murder of Europe's Jews.");
  b.card("FACT", "Name the six Nazi death camps in occupied Poland.", "Chełmno, Bełżec, Sobibór, Treblinka, Majdanek, Auschwitz-Birkenau.");
  b.card("FACT", "When did the Warsaw Ghetto Uprising begin?", "19 April 1943.");
  b.card("CONCEPT", "How did the war contribute to the Holocaust?", "Conquest brought millions of Jews under Nazi rule, and the invasion of the USSR led to mass shootings and then death camps.");
  b.card("CONCEPT", "What was the impact of the Holocaust after 1945?", "Survivors displaced; Nuremberg trials; Genocide Convention and UDHR (1948); remembrance on 27 January.");
});
