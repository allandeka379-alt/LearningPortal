// W4a: ahist.nazi.governance (ZIMSEC topic 17; Cambridge Paper 4 Hitler 3.2).
import { concept, P, source, levels } from "../lib.mjs";
import { mc, chrono } from "../tables/w4a-util.mjs";

concept("ahist.nazi.governance", { file: "nazi/governance", keyPrefix: "nazi.governance" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Who was the Nazi minister in charge of propaganda from 1933?",
    ok: ["Joseph Goebbels", "Correct: he headed the Ministry of Public Enlightenment and Propaganda."],
    no: [
      ["Heinrich Himmler", "Himmler headed the SS and, from 1936, the police."],
      ["Hermann Göring", "Göring created the Gestapo in Prussia and ran the Four Year Plan."],
      ["Albert Speer", "Speer was Hitler's architect and later minister for armaments."],
    ],
    explanation: "Goebbels led the Ministry of Public Enlightenment and Propaganda from March 1933 and controlled radio, press, film and the arts.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "Which organisation was led by Heinrich Himmler?",
    ok: ["The SS, which also came to control the police", "Correct: Himmler headed the SS from 1929."],
    no: [
      ["The SA, the Brownshirts of the early party", "The SA was led by Ernst Röhm until 1934."],
      ["The Reich Labour Service for young unemployed men", "That body was led by Konstantin Hierl."],
      ["The Hitler Youth, the movement for boys and girls", "The Hitler Youth was led by Baldur von Schirach."],
    ],
    explanation: "Himmler led the SS from 1929 and became chief of the German police in 1936, which gave him control of the Gestapo and the camps.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the main purpose of the Nuremberg rallies held each September?",
    ok: ["To display Nazi unity and loyalty to the Führer", "Correct: they were staged shows of order and mass support."],
    no: [
      ["To pass the laws of the Reichstag in front of crowds", "Laws were not made at the rallies."],
      ["To train new recruits for the German army in secret", "Soldiers were not trained at the rallies, though the army took part."],
      ["To hold elections for the leaders of the Nazi party", "The Führer was not chosen by election."],
    ],
    explanation: "The rallies of the 1930s were carefully staged propaganda, filmed by Riefenstahl in 1935, to show a disciplined people devoted to Hitler.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did the Berlin Olympics of 1936 matter to the Nazi regime?",
    ok: ["They allowed the regime to present Germany as peaceful and modern", "Correct: propaganda used the Games to win favourable opinion abroad."],
    no: [
      ["They formally ended the military limits set on Germany by the treaty", "The limits were broken by conscription in 1935; the Games did not end them."],
      ["They led to the cancellation of the Treaty of Versailles", "Versailles was not changed by the Games."],
      ["They gave Germany the right to rearm under the League of Nations", "Rearmament had been announced in 1935 and was not linked to the Games."],
    ],
    hints: ["Think of the foreign visitors and journalists who came to Berlin in August 1936."],
    explanation: "The regime hid some of its anti-Jewish signs during the Games and staged a showpiece of efficiency. It was a propaganda success abroad, though Jesse Owens's four gold medals did not fit the racial theory.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which group of young Germans was a form of youth opposition to the regime?",
    ok: ["The Edelweiss Pirates, who resisted Hitler Youth discipline", "Correct: working-class groups of this kind existed in several cities."],
    no: [
      ["The Hitler Youth, which required all boys to join from 1939", "This was the official Nazi youth movement."],
      ["The League of German Girls, the movement for young women", "This was also an official Nazi organisation."],
      ["The Reich Labour Service, which sent young men to work camps", "This was a compulsory state body, not a resistance group."],
    ],
    hints: ["Which group of young people refused to follow the Nazi youth organisations?"],
    explanation: "The Edelweiss Pirates in the Rhineland and other cities, and the Swing youth elsewhere, rejected the discipline of the Hitler Youth. The White Rose group at Munich was a small circle of students.",
  });
  mc(b, {
    d: 3, skill: "RECALL",
    stem: "Which event of March 1938 united Germany and Austria?",
    ok: ["The Anschluss", "Correct: German troops entered Austria in March 1938."],
    no: [
      ["The Munich Agreement", "Munich in September 1938 concerned the Sudetenland."],
      ["The Rhineland occupation", "German troops entered the Rhineland in March 1936."],
      ["The Saar plebiscite", "The Saar plebiscite of January 1935 returned the Saar to Germany."],
    ],
    hints: ["The word means 'union'."],
    explanation: "The Anschluss took place on 12-13 March 1938 and was approved by a plebiscite in April. It broke the ban on union in the Treaty of Versailles.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which evidence best supports the view that Nazi foreign policy was opportunistic rather than planned?",
    ok: ["The Nazi-Soviet Pact, signed with Hitler's chief ideological enemy", "Correct: it contradicted the long-term aim of destroying the USSR."],
    no: [
      ["The aim of winning Lebensraum in the east, set out in Mein Kampf", "This supports the view of a consistent plan."],
      ["The refusal of Hitler to sign any treaty with any other power", "He signed treaties with Poland, Britain and the Soviet Union."],
      ["The decision to leave the League of Nations in October 1933", "This was an early step in rejecting Versailles and fits a planned policy."],
    ],
    hints: ["Which action seems to contradict Hitler's stated aims?"],
    explanation: "The Pact of August 1939 made the attack on Poland safe in the short term. Taylor and others use such moves to argue that Hitler improvised; intentionalists reply that the Pact was a tactic before Barbarossa.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which reason best explains why opposition to the Nazi regime was so ineffective?",
    ok: ["Opponents were divided and arrested, while the regime was popular", "Correct: terror and cooperation together limited resistance."],
    no: [
      ["The Gestapo had more than a million officers who watched every home", "It was small and relied on informers, so this is wrong."],
      ["The churches and the army gave full backing to every resistance group", "Most church and army leaders did not support resistance."],
      ["Political parties were allowed to organise openly until 1939", "Parties had been banned by July 1933."],
    ],
    hints: ["Think of both the regime's fear and its popularity."],
    explanation: "Resistance was split among groups with different aims, watched by informers and the police, and the regime enjoyed real success and popularity, which left oppositionists isolated.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Gestapo was the secret state police of Nazi Germany.",
    answer: true,
    explanation: "True. It was created by Göring in Prussia in 1933 and later controlled by Himmler and Heydrich; it could arrest without trial.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "German troops entered the demilitarised Rhineland in March 1936, in breach of the Treaty of Versailles and the Locarno agreements.",
    answer: true,
    explanation: "True. Hitler took a gamble with small forces, and Britain and France did not act. It encouraged him to take bigger risks.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Historians agree that the Gestapo alone was enough to control a population of about eighty million people.",
    answer: false,
    hints: ["Think of the size of the Gestapo and of denunciations from the public."],
    explanation: "False. The Gestapo was small, and research shows that it depended on information from ordinary Germans. The regime ruled through both coercion and consent.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each opponent of the regime with his or her action.",
    pairs: [
      ["Martin Niemöller", "Protestant pastor who helped to found the Confessing Church"],
      ["Sophie Scholl", "Student in the White Rose group, executed in 1943"],
      ["Claus von Stauffenberg", "Army officer who planted the bomb of 20 July 1944"],
      ["Georg Elser", "Carpenter who tried to kill Hitler with a bomb in November 1939"],
    ],
    explanation: "Niemöller (the Confessing Church), Scholl (White Rose leaflets, executed 22 February 1943), Stauffenberg (the 1944 plot) and Elser (the Munich bomb of 8 November 1939).",
  });
  chrono(b, [
    "Germany leaves the League of Nations",
    "German troops enter the Rhineland",
    "The Anschluss with Austria",
    "The Nazi-Soviet Pact is signed",
  ], {
    d: 3, skill: "UNDERSTANDING",
    hints: ["They run from 1933 to 1939."],
    explanation: "October 1933; March 1936; March 1938; August 1939.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Hitler's aim of winning land in the east for German settlement was called {{blank:a}}, and the agreement of September 1938 that gave Germany the Sudetenland was signed at {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Lebensraum"], choices: ["Lebensraum", "Gleichschaltung", "Volksgemeinschaft", "Anschluss"] },
      { id: "b", accepted: ["Munich"], choices: ["Munich", "Versailles", "Locarno", "Yalta"] },
    ],
    explanation: "Lebensraum means 'living space'; the Munich Agreement was signed on 29-30 September 1938 by Germany, Britain, France and Italy.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the German film-maker who made Triumph of the Will, the film of the 1934 Nuremberg rally.",
    accepted: ["Leni Riefenstahl", "Riefenstahl"],
    wrong: ["Joseph Goebbels"],
    explanation: "**Leni Riefenstahl** made the film in 1934-35; it was released in 1935.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the methods the Nazis used to control German culture and information.",
    points: ["The Ministry of Propaganda under Goebbels controlled press, radio and film", "The Reich Chamber of Culture required artists and writers to join, so unapproved people could not work", "Books by Jewish and other disapproved authors were burned in May 1933", "Radio was spread by cheap sets and rallies and films such as Triumph of the Will glorified Hitler"],
    modelAnswer: "The Ministry of Propaganda under Goebbels controlled the press, radio and film. The Reich Chamber of Culture required writers and artists to join, so those who were not approved could not work. Books by Jewish and other disapproved authors were burned in May 1933. Cheap radios and rallies and films such as Triumph of the Will glorified Hitler.",
    explanation: "One mark for each method described with a detail.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why there was so little effective opposition to Hitler in the 1930s.",
    points: [["The Gestapo, camps and courts punished open opposition, and the left had been destroyed in 1933-34, so people feared to protest", 2], ["Many Germans supported the regime because of jobs, order and foreign policy successes, and the opposition groups were divided and did not share aims", 2]],
    hints: ["Think of both fear and popularity."],
    modelAnswer: "The Gestapo, camps and courts punished open opposition and the left had already been destroyed in 1933-34, so people feared to protest. Many Germans also supported the regime because of jobs, order and the successes in foreign policy, and the opposition groups were divided and shared no common aim.",
    explanation: "Credit explained reasons, not a list.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the remilitarisation of the Rhineland in 1936 helped Hitler.",
    points: [["It reversed a clause of the Treaty of Versailles without resistance, so it increased his prestige at home", 2], ["Britain and France did not act, which showed that they could be defied, and encouraged him to take more risks such as the Anschluss", 2]],
    hints: ["Think of the reaction of Britain and France."],
    modelAnswer: "It reversed a clause of the Treaty of Versailles without resistance and so greatly increased Hitler's prestige in Germany. Britain and France did not act, which showed that they could be defied and encouraged him to take greater risks such as the Anschluss.",
    explanation: "Credit explained effects at home and abroad.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a diary entry by a fictional schoolteacher in a small town in Bavaria, 1936",
        "The streets are tidy, the trains run on time and there is work for all the men in my class. When the radio announced that our soldiers had marched into the Rhineland, the shopkeepers opened their windows to listen and cheered. I do not like what I hear about the camps, but I do not know the truth of it, and who would dare to ask?"),
      "",
      source("Source B", "a report written by a fictional Social Democrat exile in Prague about conditions in Germany, 1937",
        "People have learned to talk with care. Neighbours report one another for a careless remark. In the factories, men say what they are expected to say, but at home many are silent and bitter. They would not rise against the regime, though, because they remember how the camps swallowed our comrades in 1933, and because the leaders have won back what Versailles took away."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about the schoolteacher's attitude to the regime?", points: ["He approves of the order, jobs and foreign policy success", "He is uneasy about the camps but is afraid to ask questions"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about why Germans did not oppose the regime.", points: [["Agree: both show that people were afraid to speak openly (nobody dares to ask; people talk with care) and that the regime's successes won support", 2], ["Differ: A shows real enthusiasm and approval, whereas B stresses bitterness at home and hidden discontent held back by fear of the camps", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying support for and fear of the Nazi regime?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is a private diary, so the writer had no need to lie, and it shows approval and fear together, but it comes from one small town and one man who may be untypical", 2], ["B is by an exile and opponent, who writes to inform foreign readers and may emphasise discontent; he was also far from the daily life in Germany", 2], ["Own knowledge: the popularity of the Rhineland remilitarisation, the camps and denunciations fit both sources; historians use such evidence to argue that consent and coercion worked together", 2]], modelAnswer: "Source A is useful because it is a private diary and shows both approval, of order, jobs and the Rhineland, and fear of asking about the camps. Yet it is the view of one teacher in one town. Source B is useful for its picture of denunciation and hidden bitterness, but it was written by an exile and an opponent of the regime, who may have stressed discontent for readers abroad and could not see daily life in Germany. Both fit what is known: the Rhineland was popular, denunciations were common and the camps were feared. Together they support the view that consent and coercion worked together, but neither shows how many Germans felt each way." }),
    ],
    hints: ["For (c), consider who wrote each source and for what purpose."],
    explanation: "Both sources are invented: a private diary and a report by an exile.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 250, max: 500 },
    stem: "How far was Nazi foreign policy between 1933 and 1939 a planned pursuit of Hitler's long-term aims?",
    levels: levels(12),
    points: [
      ["Consistent aims: destroying Versailles, uniting Germans (Anschluss, Sudetenland) and Lebensraum in the east, set out in Mein Kampf", 3],
      ["Steps that fit a plan: leaving the League, rearmament and conscription, the Rhineland, the Four Year Plan, the Axis and the occupation of Prague", 3],
      ["Opportunism: the timing of the Anschluss, the use of the Sudeten crisis, the reliance on the weakness of Britain and France, and the Nazi-Soviet Pact", 3],
      ["Judgement that weighs the consistent aims against flexible methods and timing", 3],
    ],
    hints: ["Separate Hitler's aims from the methods and timing he used."],
    modelAnswer: "Nazi foreign policy was planned in its aims but opportunistic in its methods and timing. Hitler wished from the 1920s to overturn Versailles, to unite the Germans and to win Lebensraum in the east, and the steps of the 1930s moved towards these aims: leaving the League in 1933, conscription in 1935, the Rhineland in 1936, the Anschluss and the Sudetenland in 1938, and the occupation of Prague in 1939. Rearmament and the Four Year Plan prepared for war. Yet there was also opportunism. The Anschluss was hurried forward in March 1938 when Austria's chancellor called a plebiscite; the Sudeten crisis was used to try to win more territory; and the Nazi-Soviet Pact of August 1939 contradicted his hatred of Bolshevism. The war with Britain and France came sooner than he expected. I conclude that the aims were consistent, which supports the intentionalist view, but that the means depended on chance and on the mistakes of other states, which supports part of A.J.P. Taylor's argument.",
    explanation: "Credit explained evidence on both sides and a judgement.",
  });

  b.card("DEFINITION", "What was Lebensraum?", "Hitler's aim of winning 'living space' in eastern Europe, especially in the Soviet Union, for German settlement.");
  b.card("DEFINITION", "What was the Gestapo?", "The secret state police, created by Göring in Prussia in 1933 and later controlled by Himmler; it arrested without trial and relied on informers.");
  b.card("DEFINITION", "What was the Reich Chamber of Culture?", "The body, created in September 1933 under Goebbels, which writers, artists, musicians and broadcasters had to join in order to work.");
  b.card("FACT", "When did German troops enter the Rhineland?", "March 1936, breaking the Treaty of Versailles and Locarno; Britain and France did not act.");
  b.card("FACT", "What was the Anschluss?", "The union of Germany and Austria in March 1938.");
  b.card("FACT", "What happened on 20 July 1944?", "Colonel von Stauffenberg's bomb failed to kill Hitler; the plotters were executed.");
  b.card("FACT", "When was the Nazi-Soviet Pact signed?", "23 August 1939; it cleared the way for the invasion of Poland on 1 September.");
  b.card("CONCEPT", "Why did propaganda succeed in Nazi Germany?", "It reinforced existing beliefs, such as hatred of Versailles, used all the media, and was backed by economic and foreign policy successes.");
  b.card("CONCEPT", "Why was there so little opposition to Hitler?", "Terror and informers, divisions among opponents, popularity of the regime and the army's oath of loyalty.");
  b.card("CONCEPT", "Was Hitler's foreign policy planned or opportunistic?", "Intentionalists see a consistent programme; Taylor stressed opportunism; most historians see consistent aims with flexible methods.");
});
