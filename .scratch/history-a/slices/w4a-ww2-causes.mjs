// W4a: ahist.ww2.causes (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";
import { mc, chrono } from "../tables/w4a-util.mjs";

concept("ahist.ww2.causes", { file: "ww2/causes", keyPrefix: "ww2.causes" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "On what date did Germany invade Poland?",
    ok: ["1 September 1939", "Correct: Britain and France declared war two days later."],
    no: [
      ["3 September 1939", "That is the date on which Britain and France declared war."],
      ["15 March 1939", "That is the date on which German troops occupied Prague."],
      ["23 August 1939", "That is the date of the Nazi-Soviet Pact."],
    ],
    explanation: "Germany invaded Poland on 1 September 1939; Britain and France declared war on Germany on 3 September.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the main result of the Munich Agreement of September 1938?",
    ok: ["The Sudetenland passed from Czechoslovakia to Germany", "Correct: the powers agreed without the Czechoslovaks."],
    no: [
      ["Austria was united with Germany in the Anschluss", "The Anschluss took place in March 1938."],
      ["Germany promised to withdraw its troops from the Rhineland", "German troops had entered the Rhineland in 1936."],
      ["Britain and France guaranteed the independence of Poland", "That guarantee came in March 1939."],
    ],
    explanation: "Chamberlain, Daladier, Mussolini and Hitler agreed that Germany would occupy the Sudetenland. Czechoslovakia was not invited to the conference.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did Japan's invasion of Manchuria in 1931 weaken the League of Nations?",
    ok: ["The League condemned Japan but could not act; Japan left", "Correct: the League had no force to act."],
    no: [
      ["The League sent an army that was defeated by Japan's forces", "The League had no army."],
      ["The United States joined the League and then supported Japan", "The United States never joined the League."],
      ["The League voted to give Manchuria to Japan as a reward", "The League condemned the invasion."],
    ],
    explanation: "The Lytton Report blamed Japan, and the Assembly refused to recognise Manchukuo, but no state was willing to use force. Japan left the League in 1933.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did Britain and France follow a policy of appeasement in the 1930s?",
    ok: ["They feared another war and thought some German demands were fair", "Correct: memories of 1914-18 and doubts about Versailles shaped policy."],
    no: [
      ["They had agreed with Hitler that Germany could take all of Europe", "No such agreement existed."],
      ["They were the strongest military powers and wished to avoid showing it", "Their forces were not ready for war in the 1930s."],
      ["They wanted to help Germany attack the Soviet Union quickly", "Their policy was not designed to help Germany attack the USSR."],
    ],
    hints: ["Think of public opinion after 1918 and of the state of British rearmament."],
    explanation: "Appeasement reflected horror of another war, economic limits, weak forces, belief that Versailles was unfair and fear of communism.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why was the German occupation of Prague in March 1939 a turning point?",
    ok: ["It showed that Hitler's aims went beyond uniting Germans", "Correct: it broke the promises of Munich."],
    no: [
      ["It was the first time that Hitler had used force in Europe", "Force had been threatened or used before, for example in the Rhineland."],
      ["It ended the Nazi-Soviet Pact between Hitler and Stalin", "The Pact was signed five months later."],
      ["It led Chamberlain to sign a treaty giving Poland to Germany", "Britain guaranteed Poland instead."],
    ],
    hints: ["Think about how Britain and France changed their policy afterwards."],
    explanation: "Prague was Czech, not German, so the claim of self-determination no longer applied. Britain and France then gave a guarantee to Poland and began to rearm faster.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did Stalin sign the Nazi-Soviet Pact in August 1939?",
    ok: ["He distrusted the West after Munich and wanted more time", "Correct: the Pact gave him land and delayed attack."],
    no: [
      ["He shared Hitler's beliefs and wished to build a common empire", "He distrusted Hitler's aims and wanted to postpone war."],
      ["He had been defeated by Germany and needed to ask for peace", "The USSR had not fought Germany."],
      ["He wished to defend Poland alongside Britain and France", "The Pact helped to dismember Poland."],
    ],
    hints: ["Think about the Munich Agreement and the secret protocol."],
    explanation: "Stalin had been excluded from Munich and doubted that the West would fight. The pact bought time and gave the USSR part of Poland and the Baltic states.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which fact best supports the view that Hitler's foreign policy was driven by long-term aims rather than opportunism?",
    ok: ["Mein Kampf, written in the 1920s, set out Lebensraum in the east", "Correct: aims stated early were carried out later."],
    no: [
      ["The Nazi-Soviet Pact of 1939 allied Hitler with his enemy", "The Pact is used by those who argue for opportunism."],
      ["Hitler waited for Britain and France to give way in 1938 and 1939", "This shows that he exploited their weakness."],
      ["The Anschluss was hurried forward when Austria planned a vote", "This suggests improvisation."],
    ],
    hints: ["Which fact shows that the aims were set out before 1933?"],
    explanation: "Intentionalist historians point to Mein Kampf and the consistent aims of the 1930s; those who stress opportunism, such as A.J.P. Taylor, point to the timing of events like the Anschluss and the Pact.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The United States was a member of the League of Nations.",
    answer: false,
    explanation: "False. The US Senate refused to ratify the Treaty of Versailles, so the United States never joined the League.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Czechoslovakia was invited to the Munich Conference of September 1938, where the fate of the Sudetenland was decided.",
    answer: false,
    explanation: "False. The representatives of Czechoslovakia were not invited to the conference, and the Czechoslovak government was told to accept the decision.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Historians agree that appeasement was the only cause of the Second World War.",
    answer: false,
    hints: ["Think of the other causes such as Hitler's aims and the Depression."],
    explanation: "False. Historians weigh many causes: Versailles, the Depression, the dictators' aims, the failure of the League and appeasement. Most give Hitler's aims the main place.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each event with its date.",
    pairs: [
      ["Japan invades Manchuria", "1931"],
      ["Anschluss", "1938"],
      ["German troops occupy Prague", "1939"],
      ["Full-scale war between Japan and China begins", "1937"],
    ],
    explanation: "Manchuria (September 1931), the war with China (July 1937), the Anschluss (March 1938) and Prague (March 1939).",
  });
  chrono(b, [
    "Germany remilitarises the Rhineland",
    "The Anschluss with Austria",
    "German troops occupy Prague",
    "The Nazi-Soviet Pact is signed",
  ], {
    d: 3, skill: "UNDERSTANDING",
    hints: ["They run from 1936 to August 1939."],
    explanation: "March 1936; March 1938; March 1939; August 1939.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The British Prime Minister who signed the Munich Agreement was {{blank:a}}, and the region of Czechoslovakia given to Germany was the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Neville Chamberlain"], choices: ["Neville Chamberlain", "Winston Churchill", "David Lloyd George", "Stanley Baldwin"] },
      { id: "b", accepted: ["Sudetenland"], choices: ["Sudetenland", "Rhineland", "Saar", "Danzig"] },
    ],
    explanation: "Chamberlain was Prime Minister from 1937 to 1940; the Sudetenland had a large German-speaking population.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to the policy of making concessions to Germany to avoid war?",
    accepted: ["appeasement", "Appeasement", "the policy of appeasement"],
    wrong: ["collective security"],
    explanation: "**Appeasement**, associated especially with Neville Chamberlain.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how the League of Nations failed to stop aggression in the 1930s.",
    points: ["It condemned Japan's invasion of Manchuria in 1931 but could not force it to leave, and Japan left in 1933", "It imposed only limited sanctions on Italy over Ethiopia, which excluded oil", "The United States was not a member, and Britain and France were unwilling to use force", "Germany left the Disarmament Conference and the League in 1933 without any penalty"],
    modelAnswer: "It condemned Japan's invasion of Manchuria in 1931 but could not force it to leave, and Japan left in 1933. It imposed only limited sanctions on Italy over Ethiopia, which excluded oil. The United States was not a member, and Britain and France were unwilling to use force. Germany left the Disarmament Conference and the League in 1933 without any penalty.",
    explanation: "One mark for each failure described with a detail.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Treaty of Versailles contributed to the outbreak of the Second World War.",
    points: [["Germans resented the treaty as a diktat that took territory, limited the army and imposed reparations and blame, so politicians and Hitler could use the grievance", 2], ["Italy and Japan were also dissatisfied with the settlement, and the treaty was not enforced, so the revival of German power could not be prevented", 2]],
    hints: ["Think about resentment and enforcement."],
    modelAnswer: "Germans resented the treaty as a diktat that took territory, limited the army and imposed reparations and blame, so Hitler could use the grievance to win support. Italy and Japan were also dissatisfied, and the treaty was not enforced, so the revival of German power could not be prevented.",
    explanation: "Credit explained reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Britain and France guaranteed Poland in March 1939.",
    points: [["The occupation of Prague showed that Hitler's demands were not limited to uniting Germans, so appeasement seemed to have failed", 2], ["Poland was the likely next target, and the guarantee aimed to deter Hitler and was supported by public opinion", 2]],
    hints: ["Think about what Prague proved."],
    modelAnswer: "The occupation of Prague showed that Hitler's demands were not limited to uniting Germans, so appeasement seemed to have failed. Poland was the likely next target, and the guarantee aimed to deter Hitler and was supported by public opinion.",
    explanation: "Credit explained reasons.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a letter from a fictional British member of parliament to his constituents, October 1938",
        "I have seen the crowds welcome the Prime Minister home, and I understand their relief. Another war would be a calamity, and the Sudeten Germans had a fair case. But I fear that we have given up a small country to keep the peace for a time, and that Herr Hitler will ask for more."),
      "",
      source("Source B", "a diary entry by a fictional Czech schoolteacher in Prague, March 1939",
        "This morning German soldiers marched through the streets in the snow. Nobody spoke. We were told at Munich that our borders would be safe if we gave up the mountains, and now there is nothing. The Western powers have gone home and the world has looked away."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A say about the feelings of the public after Munich?", points: ["There was relief and welcome for the Prime Minister", "They feared another war, which would be a calamity"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare the attitudes of Sources A and B to the Munich Agreement.", points: [["Agree: both suggest that Czechoslovakia was sacrificed and that the West gave way to Hitler", 2], ["Differ: A understands the relief, thinks the Sudeten Germans had a fair case and is hopeful for peace, whereas B is bitter that the promised safety disappeared", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying the failure of appeasement?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is useful as a British political view at the time, showing both the popularity of appeasement and doubts about it, but it is the view of one politician writing for voters", 2], ["B is useful as evidence of the Czech experience and of how it felt to be abandoned, but it is the account of one individual and written in sorrow", 2], ["Own knowledge: Munich in September 1938, the occupation of Prague in March 1939 and the guarantee to Poland confirm that appeasement failed; together the sources show British hope and Czech betrayal", 2]], modelAnswer: "Source A is useful because it shows both the popularity of the Munich Agreement in Britain and the doubts of some politicians, written at the time in October 1938. It is, however, the view of one politician writing to voters and may be shaped by politics. Source B is useful because it gives the Czech experience of occupation in March 1939 and shows that Munich failed to save the country, but it is one diary and an emotional one. Both fit what is known, since Hitler occupied Prague in March 1939 and Britain then guaranteed Poland. Together they show why appeasement was popular and why it failed." }),
    ],
    hints: ["For (c), consider who wrote each source and when."],
    explanation: "Both sources are invented: a letter from a fictional MP and a diary entry.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 250, max: 500 },
    stem: "How far was appeasement responsible for the outbreak of the Second World War in 1939?",
    levels: levels(12),
    points: [
      ["Appeasement: concessions over the Rhineland, Austria and the Sudetenland strengthened Germany and encouraged Hitler; Munich lost Czechoslovakia's defences", 3],
      ["Other causes: Versailles grievances, the Depression, the dictators' aims, the failure of the League and collective security, Japanese and Italian aggression", 3],
      ["Hitler's responsibility: his aims of Lebensraum and war; the Nazi-Soviet Pact and the invasion of Poland", 3],
      ["Judgement that weighs appeasement against the main responsibility of Germany and the other causes", 3],
    ],
    hints: ["Decide whether appeasement caused the war or only made Hitler's actions easier."],
    modelAnswer: "Appeasement contributed to the outbreak of war, but the main responsibility lay with Hitler's aims and the broader failure of the international system. By giving way over the Rhineland, Austria and the Sudetenland, Britain and France allowed Germany to grow stronger and showed that aggression would not be punished, and Munich removed Czechoslovakia's defences. Yet appeasement itself had causes: the fear of another war, weak forces and the belief that Versailles was unfair. Other causes were at least as important. The Treaty of Versailles left grievances, the Depression brought extremists to power, the League failed over Manchuria and Ethiopia, and Hitler's aim of Lebensraum meant that war was likely in any case. The Nazi-Soviet Pact and the invasion of Poland were his decisions. I conclude that appeasement made war easier by encouraging Hitler, but that the war came because of his aims and the weaknesses of the League, which also explain why appeasement was adopted.",
    explanation: "Credit explained evidence for and against and a judgement.",
  });

  b.card("DEFINITION", "What was appeasement?", "The policy, especially of Neville Chamberlain, of making concessions to Germany to avoid war.");
  b.card("DEFINITION", "What was collective security?", "The idea that states would act together against an aggressor, the basis of the League of Nations.");
  b.card("FACT", "What was agreed at Munich in September 1938?", "The Sudetenland was transferred from Czechoslovakia to Germany; the Czechs were not invited.");
  b.card("FACT", "When did German troops occupy Prague?", "15 March 1939, breaking the Munich promises.");
  b.card("FACT", "When did the Second World War in Europe begin?", "1 September 1939, when Germany invaded Poland; Britain and France declared war on 3 September.");
  b.card("FACT", "When did Japan invade Manchuria, and when did full war with China begin?", "September 1931 (Manchuria); July 1937 (the war with China).");
  b.card("CONCEPT", "Why did the League fail to stop aggression?", "It had no army, the US was absent, and Britain and France would not use force; sanctions on Italy excluded oil.");
  b.card("CONCEPT", "Why did Stalin sign the Nazi-Soviet Pact?", "He distrusted the West after Munich, wanted time to prepare and gained land in eastern Poland and the Baltic states.");
  b.card("CONCEPT", "Why did Britain and France appease Hitler?", "Fear of another war, weak armies, economic difficulties, belief that Versailles was unfair and fear of communism.");
});
