// W3b: ahist.germany.austria-prussia-1850-62 (Both boards; Cambridge key question 2.2, second part).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.germany.austria-prussia-1850-62", { file: "germany/austria-prussia-1850-62", keyPrefix: "germany.austria-prussia-1850-62" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What was the outcome of the crisis ended by the Punctation of Olmütz in November 1850?",
    options: [
      ["Prussia agreed to demobilise and abandoned its Erfurt Union plan for Germany", "Correct: Prussia gave way to Austria and Russia."],
      ["Austria agreed to leave the Confederation and to hand over its power", "Austria won the contest and the Confederation was restored."],
      ["Prussia and Austria went to war over Hesse-Kassel and Prussia won", "There was no war; Prussia backed down."],
      ["The two powers agreed to share the leadership of Germany equally", "The agreement left Austria in the stronger position."],
    ],
    answer: "A",
    explanation: "At Olmütz on 29 November 1850 Prussia, represented by Manteuffel, demobilised, abandoned the Erfurt Union and accepted the restoration of the Confederation under Austrian presidency.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which Prussian minister agreed to the terms at Olmütz?",
    options: [
      ["Otto von Manteuffel, the Prussian minister-president at that time", "Correct: he accepted Austrian terms."],
      ["Otto von Bismarck, then the Prussian delegate to the Federal Diet", "Bismarck went to Frankfurt only in 1851."],
      ["Klemens von Metternich, the former chancellor of the Austrian empire", "Metternich was an Austrian who had been out of office since 1848."],
      ["Albrecht von Roon, the minister who later reformed the Prussian army", "Roon became Minister of War in 1859."],
    ],
    answer: "A",
    explanation: "Manteuffel became minister-president in November 1850 and accepted Schwarzenberg's terms at Olmütz.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did Prussia back down at Olmütz?",
    options: [
      ["It was not ready for war and Russia backed Austria against it", "Correct: Prussia lacked allies and military readiness."],
      ["It had already been defeated by Austria in a short war in Hesse", "No such war was fought."],
      ["Its king wished to give up his claims to leadership in Germany", "He still hoped for leadership but the circumstances were against it."],
      ["Its liberals demanded that it accept the leadership of Austria", "The demand did not come from Prussian liberals."],
    ],
    answer: "A",
    hints: ["Think of Prussia's army and its friends."],
    explanation: "The Prussian army was not ready, Prussia had no allies, and the Tsar backed Austria, so war seemed too risky.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the result of Austria's attempt in the early 1850s to join the Zollverein or build a rival customs union?",
    options: [
      ["It failed, and the Zollverein was renewed without Austria in 1853", "Correct: Prussian leadership was confirmed."],
      ["It succeeded, and the Zollverein came under Austrian control by 1853", "The southern states stayed with the Prussian-led union."],
      ["It led to a war between Prussia and the Habsburg Empire in 1851", "No war was fought over the customs union."],
      ["It was never proposed, since Austria had no interest in trade questions", "Schwarzenberg and his minister Bruck proposed a larger union."],
    ],
    answer: "A",
    hints: ["Think of who was in the Zollverein in 1853."],
    explanation: "Austria's industry could not bear free trade and the southern states valued the Zollverein; the treaties were renewed in 1853 without Austria.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How did the Crimean War (1853-56) weaken Austria's position?",
    options: [
      ["It lost Russia's friendship without gaining the trust of Britain or France", "Correct: Austria was left isolated."],
      ["It was defeated by Russia in battle and lost its German lands to Prussia", "Austria did not fight Russia and kept its German lands."],
      ["It joined Russia against Britain and France and was defeated with her", "Austria did not ally with Russia."],
      ["It was forced to join the Zollverein under Russian and Prussian pressure", "Russia had no such role."],
    ],
    answer: "A",
    hints: ["Think of the powers that had helped Austria in 1849."],
    explanation: "Austria had been rescued by Russia in 1849 but refused to help it in 1854; Britain and France did not trust it either, so it had no allies in 1859 and 1866.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which change in Bismarck's views took place while he was Prussian envoy at Frankfurt (1851-59)?",
    options: [
      ["He concluded that Austria would not accept Prussia as an equal partner", "Correct: he came to see Austria as the obstacle."],
      ["He decided that Prussia should join Austria in a republican union", "He was a conservative royalist and did not favour a republic."],
      ["He began to support the liberals and the Frankfurt constitution", "He was not a supporter of the 1849 constitution."],
      ["He became convinced that Russia was the main enemy of Prussia", "He remained friendly towards Russia."],
    ],
    answer: "A",
    hints: ["Think of how Austria treated Prussia at the Diet."],
    explanation: "At Frankfurt Bismarck saw Austria treat Prussia as a junior partner, and he came to believe that Germany was too small for both to lead.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about the war of 1859 in Italy is supported by the evidence?",
    options: [
      ["It strengthened nationalist belief that Prussia should lead Germany", "Correct: Prussia refused to help Austria without command and gained sympathy."],
      ["It proved that Austria was the only power able to defend all of Germany", "Austria lost Lombardy and its prestige fell."],
      ["It led Prussia to join France against Austria in northern Italy in 1859", "Prussia mobilised but did not join France."],
      ["It ended the Zollverein and returned the German states to isolation again", "The Zollverein continued."],
    ],
    answer: "A",
    hints: ["Think of the Nationalverein and what Prussia did."],
    explanation: "Austria lost battles and Lombardy; Prussia mobilised but asked for command of federal forces; nationalists founded the Nationalverein looking to Prussia.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which piece of evidence best supports the view that Bismarck had no fixed plan for German unification before 1862?",
    options: [
      ["He defended Olmütz in 1850 and was then moved to Russia and France", "Correct: his career shows adaptation, not a plan."],
      ["He published a plan for a united German state under Prussia in 1853", "This is not what he said in the 1850s."],
      ["He drafted the plan for the North German Confederation in 1855", "The Confederation was created in 1867."],
      ["He helped to found the Nationalverein in Coburg in 1859", "He was no supporter of the Nationalverein."],
    ],
    answer: "A",
    hints: ["Which evidence shows him reacting to events and not following a programme?"],
    explanation: "Bismarck defended Olmütz, then at Frankfurt turned against Austria, and was moved around by the Regent's government. Historians agree that his plans changed with circumstances.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Erfurt Union was a Prussian plan to unite the German states without Austria.",
    answer: true,
    explanation: "True. It was an attempt, in 1849-50, to create a smaller union under the Prussian king.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In 1853 the Zollverein was renewed, and Austria became a full member.",
    answer: false,
    explanation: "False. The Zollverein was renewed without Austria, which received only a trade agreement.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Liberals in Prussia after 1858 supported the reform of the army proposed by the Regent without any objection.",
    answer: false,
    hints: ["Think of the constitutional crisis that began in 1860-62."],
    explanation: "False. Many liberals in the assembly objected to the army reform, which led to the conflict that Bismarck inherited in 1862.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Olmütz", "1850 agreement in which Prussia gave way to Austria"],
      ["Erfurt Union", "Prussian plan for a smaller German union"],
      ["Nationalverein", "Association of 1859 that backed Prussian leadership"],
      ["New Era", "Period of liberal hopes under the regent Wilhelm"],
    ],
    explanation: "These terms are needed for any answer on 1849-62.",
  });
  {
    const events = [
      "The Punctation of Olmütz",
      "The Zollverein is renewed without Austria",
      "Wilhelm becomes regent of Prussia",
      "France and Piedmont fight Austria in Italy",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1850, 1853, 1858 and 1859."],
      explanation: "Olmütz, November 1850; Zollverein renewed, 1853; Wilhelm regent, 1858; war in Italy, 1859.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Punctation of Olmütz was signed in {{blank:a}}, and the Prussian delegate to the Federal Diet from 1851 was {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["1850"], choices: ["1848", "1850", "1859", "1862"] },
      { id: "b", accepted: ["Bismarck"], choices: ["Bismarck", "Manteuffel", "Radowitz", "Moltke"] },
    ],
    explanation: "Olmütz was signed on 29 November 1850; Bismarck became Prussia's envoy at Frankfurt in 1851.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which Prussian king became regent in 1858 when his brother Friedrich Wilhelm IV became unfit to rule? Give his name.",
    accepted: ["Wilhelm", "Wilhelm I", "William", "William I", "Kaiser Wilhelm"],
    wrong: ["Friedrich Wilhelm"],
    explanation: "**Wilhelm**, who became regent in 1858 and king in 1861.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the events that led to the Punctation of Olmütz.",
    points: ["Prussia proposed the Erfurt Union of German states without Austria", "Austria refused it and revived the Confederation with its Diet at Frankfurt", "A crisis in Hesse-Kassel brought Prussian and Austrian-backed Bavarian forces close to war", "Prussia gave way and accepted Austria's terms at Olmütz"],
    modelAnswer: "Prussia proposed the Erfurt Union of German states without Austria. Austria refused it and revived the Confederation with its Diet at Frankfurt. A crisis in Hesse-Kassel brought Prussian troops and Austrian-backed Bavarian troops close to war. Prussia gave way and accepted Austria's terms at Olmütz.",
    explanation: "One mark for each stage described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Austria failed to prevent Prussia's economic growth in the 1850s.",
    points: [["Austria's attempt to enlarge the Zollverein failed because its industry and finances could not bear free trade and the southern states valued the Zollverein", 2], ["Prussia's coal, iron, railways and revenue grew, while Austria's finances were strained by the army and by mobilisation in the Crimean War", 2]],
    hints: ["Think of the customs union and of the two economies."],
    modelAnswer: "Austria's attempt to enlarge the Zollverein failed because its industry and finances could not bear free trade and the southern states valued the Zollverein as it was. Prussia's coal, iron, railways and revenue grew, while Austria's finances were strained by its army and by costly mobilisation during the Crimean War.",
    explanation: "One mark for each reason and one for development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how Bismarck's attitude to Austria changed between 1850 and 1859.",
    points: [["In 1850 he defended Olmütz, since he wished to avoid a war Prussia could not win", 2], ["At Frankfurt he found that Austria treated Prussia as a junior partner and came to think that Germany was too small for both and that Prussia should pursue its own interests", 2]],
    hints: ["Think of what he saw at the Federal Diet."],
    modelAnswer: "In 1850 Bismarck defended Olmütz because he wished to avoid a war that Prussia could not win. At Frankfurt he found that Austria treated Prussia as a junior partner, and he came to think that Germany was too small for both powers and that Prussia should pursue its own interests.",
    explanation: "One mark for each point and one for development.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a memorandum by a fictional Prussian ironmaster to the Ministry of Trade, 1857",
        "Our furnaces cannot keep up with the orders. The railways take all the iron we can make, and the Zollverein has opened every market from the Rhine to the Oder. If the Austrians had been admitted to the union on their own terms, they would have sold us their goods and bought nothing."),
      "",
      source("Source B", "a report by a fictional Austrian official to the finance ministry in Vienna, 1857",
        "The state's debts increase each year, and the army and the recent mobilisation have taken all that the treasury can spare. The paper currency has lost value. Our industries are small and protected, and the Zollverein states are unwilling to take our terms."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A show about the Prussian economy?", points: ["Strong demand for iron / orders exceed supply", "Railways and the Zollverein have opened markets"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare Sources A and B as evidence of the economic position of Prussia and Austria in the 1850s.", points: [["Agree: both refer to the Zollverein and to the position of the Austrian economy in relation to it", 2], ["Differ: A shows rapid growth with demand for iron; B shows debt, a weak currency and small industries", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying the rivalry of Austria and Prussia in the 1850s?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A comes from an industrialist who may exaggerate the success of his sector and his hostility to Austrian goods, but his evidence fits other records of Ruhr and Silesian growth", 2], ["B is an official report to the finance ministry, written for private use, so it has little reason to exaggerate Austria's problems, though it is only one report", 2], ["Own knowledge: the renewal of the Zollverein in 1853 without Austria, Prussian railways and steel, and Austria's costly mobilisation all support them, but neither source deals with the political side of the rivalry", 2]], modelAnswer: "Source A is useful because it shows demand for iron, railways and the importance of the Zollverein to Prussian growth, which fits other evidence about the Ruhr and Silesia. As the view of an industrialist it may exaggerate and is hostile to Austria. Source B is useful because it is an official report written for private use, so it is unlikely to exaggerate Austria's problems, and it confirms the debt and the weak currency. It is a single report. My own knowledge supports both, since the Zollverein was renewed in 1853 without Austria and Austria's mobilisation was costly. However, neither source deals with politics, such as Olmütz or the Crimean War, so they explain the economic side of the rivalry only." }),
    ],
    hints: ["For (c), consider who wrote each source and what they leave out."],
    explanation: "Both sources are invented: a memorandum and an official report.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "How far was Prussia's economic strength the main reason for the shift in the balance between Austria and Prussia between 1850 and 1862?",
    levels: levels(8),
    points: [
      ["Economic factors: Zollverein leadership, coal, iron, railways, revenue; Austria's weak finances", 2],
      ["Diplomatic factors: Austria's isolation after the Crimean War and the defeat of 1859; Prussia's links with Russia", 2],
      ["Political factors: the growth of liberalism and nationalism, the Nationalverein, the New Era and the army question", 2],
      ["Judgement on which was the main reason, with a reason", 2],
    ],
    hints: ["Weigh economic strength against diplomacy and political change."],
    modelAnswer: "Economic strength was the main reason for the shift in the balance. Prussia led the Zollverein, which was renewed without Austria in 1853, and its coal, iron, railways and revenue grew, while Austria's finances were weak and strained by mobilisation. Diplomacy mattered too: Austria was isolated after the Crimean War and lost Lombardy in 1859, while Prussia kept good relations with Russia. Politically, liberals and the Nationalverein began to look to Prussia, especially after the New Era. But these developments depended on the underlying economic change, which gave Prussia the means to modernise its army and made the southern states reluctant to leave the Zollverein. I conclude that economic strength was the main reason, with diplomatic isolation of Austria as a strong second.",
    explanation: "Credit developed factors, links between them and a supported judgement.",
  });

  b.card("DEFINITION", "What was the Punctation of Olmütz?", "The agreement of 29 November 1850 in which Prussia demobilised, gave up the Erfurt Union and accepted the restored Confederation.");
  b.card("DEFINITION", "What was the Erfurt Union?", "A Prussian plan of 1849-50 for a union of German states, without Austria, under the King of Prussia.");
  b.card("FACT", "Who agreed the terms of Olmütz for each side?", "Manteuffel for Prussia and Schwarzenberg for Austria.");
  b.card("FACT", "When was the Zollverein renewed without Austria?", "1853 (treaties renewed for twelve years; Hanover joined in 1854).");
  b.card("FACT", "What happened to Austria in the war of 1859?", "It was defeated by France and Piedmont at Magenta and Solferino and ceded Lombardy.");
  b.card("FACT", "When was Bismarck Prussian envoy at the Federal Diet in Frankfurt?", "1851 to 1859.");
  b.card("CONCEPT", "Why did Prussia grow stronger than Austria in the 1850s?", "Coal, iron, railways and revenue grew; Austria's finances were weak; Austria was isolated after the Crimean War and defeated in 1859.");
  b.card("CONCEPT", "What was the Nationalverein?", "An association founded in 1859 by liberals and nationalists to promote German unity under Prussian leadership.");
  b.card("CONCEPT", "How did Bismarck's view of Austria change in the 1850s?", "He defended Olmütz in 1850 but at Frankfurt concluded that Austria would not treat Prussia as an equal.");
});
