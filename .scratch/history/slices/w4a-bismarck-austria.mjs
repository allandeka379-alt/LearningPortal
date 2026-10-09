// Slice W4a: Bismarck and the defeat of Austria, 1862-1866 (0470 Option A key question 3).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.german-unification.bismarck-austria", { file: "german-unification/bismarck-austria", keyPrefix: "german-unification.bismarck-austria" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which year did Bismarck become Minister-President of Prussia?",
    options: [
      ["1862", "Correct: he was appointed in September 1862."],
      ["1848", "This was the year of revolution in Berlin."],
      ["1866", "This was the year of the war with Austria."],
      ["1871", "This was the year the German Empire was proclaimed."],
    ],
    answer: "A",
    explanation: "Wilhelm I appointed **Bismarck** in **September 1862** during the constitutional crisis.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What caused the Prussian constitutional crisis of 1862?",
    options: [
      ["Parliament refused money for the king's army reforms", "Correct: the liberal majority would not approve the budget."],
      ["The king refused to accept a crown offered by Frankfurt", "That happened in 1849."],
      ["Austria demanded that Prussia leave the Zollverein", "No such demand caused the crisis."],
      ["Denmark annexed the duchy of Holstein", "The Danish crisis came in 1863-64."],
    ],
    answer: "A",
    explanation: "The liberals in the Landtag refused to fund **Roon's army reforms**, creating deadlock with the king.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What did the Convention of Gastein (1865) decide?",
    options: [
      ["Prussia would run Schleswig and Austria Holstein", "Correct: the duchies were divided for administration."],
      ["Denmark would keep both duchies under its king", "Denmark had given them up in 1864."],
      ["Italy would receive Venetia from Austria", "Italy gained Venetia after the war of 1866."],
      ["The North German Confederation would be created", "This followed Austria's defeat in 1866."],
    ],
    answer: "A",
    explanation: "At **Gastein** Prussia took Schleswig and Austria Holstein, which lay next to Prussian-controlled land.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which country made an alliance with Prussia in April 1866 in return for the promise of Venetia?",
    options: [
      ["Italy", "Correct: Italy attacked Austria from the south."],
      ["Russia", "Russia was friendly but stayed neutral."],
      ["France", "Napoleon III promised neutrality, not an alliance."],
      ["Denmark", "Denmark had just been defeated by Prussia and Austria."],
    ],
    answer: "A",
    explanation: "**Italy** joined Prussia so that it could gain **Venetia** from Austria.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why was the needle gun an advantage for the Prussian infantry in 1866?",
    options: [
      ["Soldiers could reload it quickly while lying down", "Correct: it loaded at the breech; most Austrian infantry had muzzle-loaders."],
      ["It was a heavy cannon that could destroy forts", "The needle gun was an infantry rifle."],
      ["It could be fired by men riding on horseback", "It was an infantry weapon, not a cavalry one."],
      ["It was copied from the rifles used by the Austrians", "The Austrian infantry mostly had older muzzle-loaders."],
    ],
    answer: "A",
    hints: ["Think about how a soldier reloads a breech-loader compared with a muzzle-loader."],
    explanation: "The **breech-loading** needle gun let Prussian soldiers reload quickly while lying down.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did Bismarck help Russia during the Polish rising of 1863?",
    options: [
      ["To win Russian goodwill for later conflicts", "Correct: Russia stayed friendly in 1866 and 1870."],
      ["To gain Polish land for the German Confederation", "Prussia gained no Polish land in 1863."],
      ["To force Austria to join the Zollverein", "This was not connected with Poland."],
      ["To win the support of the German liberals", "Liberals sympathised with the Poles, not with Russia."],
    ],
    answer: "A",
    hints: ["Which great power did Bismarck need to keep friendly?"],
    explanation: "Helping Russia secured **Russian goodwill**, so Russia would not help Austria in 1866.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement about the Treaty of Prague (1866) is correct?",
    options: [
      ["Austria was excluded from German affairs but lost no German land", "Correct: Bismarck wanted a lenient peace."],
      ["Austria handed Holstein and Bohemia to Prussia", "Austria kept Bohemia; Holstein was annexed with Schleswig."],
      ["The southern German states joined the North German Confederation", "They stayed outside until 1870-71."],
      ["France received Luxembourg as a reward for neutrality", "France received nothing, which angered Napoleon III."],
    ],
    answer: "A",
    hints: ["Bismarck wanted Austria out of Germany, not ruined."],
    explanation: "The treaty dissolved the Confederation and **excluded Austria**, but took no Austrian German land.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why did Bismarck insist on a lenient peace with Austria in 1866?",
    options: [
      ["To end the war before France could intervene", "Correct: and to avoid making Austria a lasting enemy."],
      ["Because Prussia had lost the battle of Königgrätz", "Prussia won Königgrätz decisively."],
      ["Because the Prussian parliament had refused war credits", "The war ended the constitutional crisis in Bismarck's favour."],
      ["Because Italy demanded that Vienna be left untouched", "Italy had no influence over the peace terms."],
    ],
    answer: "A",
    hints: ["Think about which other power was watching the war."],
    explanation: "A quick, mild peace prevented **French intervention** and left the door open to future friendship with Austria.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In 1864 Prussia and Austria fought together against Denmark.",
    answer: true,
    explanation: "True. They defeated Denmark and took joint control of Schleswig and Holstein.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Bismarck stopped collecting taxes in 1862 because parliament had not approved the budget.",
    answer: false,
    explanation: "False. He collected taxes and carried out the army reforms without parliament's approval until the Indemnity Bill of 1866.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role.",
    pairs: [
      ["Wilhelm I", "King of Prussia from 1861"],
      ["Roon", "Prussian War Minister who planned the army reforms"],
      ["Moltke", "Chief of the Prussian General Staff in 1866"],
      ["Christian IX", "King of Denmark during the 1864 war"],
    ],
    explanation: "Wilhelm I (king), Roon (War Minister), Moltke (Chief of the General Staff), Christian IX (King of Denmark).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Battle of Königgrätz",
      "Bismarck appointed Minister-President",
      "Convention of Gastein",
      "War against Denmark",
    ],
    right: POS,
    rightIndex: [3, 0, 2, 1],
    hints: ["The Danish war came before the agreement on running the duchies."],
    explanation: "Bismarck appointed (1862); war against Denmark (1864); Gastein (1865); Königgrätz (1866).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Bismarck met Napoleon III at {{blank:a}} in October 1865. After 1866 Prussia annexed the kingdom of {{blank:b}}, which had fought on Austria's side.",
    blanks: [
      { id: "a", accepted: ["Biarritz"], choices: ["Biarritz", "Gastein", "Olmütz", "Ems"] },
      { id: "b", accepted: ["Hanover"], choices: ["Hanover", "Bavaria", "Württemberg", "Saxony"] },
    ],
    explanation: "Bismarck and Napoleon met at **Biarritz**; Prussia annexed **Hanover** in 1866 (Bavaria, Württemberg and Saxony kept their kings).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the union of German states north of the River Main created under Prussian leadership after 1866.",
    accepted: ["North German Confederation", "the North German Confederation", "Norddeutscher Bund", "North German Federation"],
    wrong: ["German Confederation"],
    explanation: "The **North German Confederation** (1867) replaced the old German Confederation in the north.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the terms of the Treaty of Prague (1866).",
    points: [
      "The German Confederation was dissolved / Austria excluded from German affairs.",
      "Austria lost no German territory; Venetia went to Italy.",
      "Prussia annexed Schleswig-Holstein, Hanover, Hesse-Kassel, Nassau and Frankfurt.",
      "A North German Confederation under Prussia; the southern states remained independent (with secret alliances).",
    ],
    modelAnswer: "The treaty dissolved the German Confederation, and Austria accepted that it would play no part in Germany's future. Austria lost no German land, but Venetia went to Italy. Prussia annexed Schleswig-Holstein, Hanover, Hesse-Kassel, Nassau and Frankfurt, and the states north of the River Main formed the North German Confederation under Prussian leadership. The southern states stayed independent but signed secret military alliances with Prussia.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why the army reforms of 1860-62 mattered for Prussia's later victories.",
    points: [
      "Identifies that the reforms enlarged the regular army / three-year service.",
      "Explains that this gave Prussia a larger, better-trained army under the king's control for the wars of 1864-66.",
      "Identifies the political result: the crisis brought Bismarck to power.",
      "Explains that Bismarck then used this army as an instrument of his diplomacy ('iron and blood').",
    ],
    hints: ["Think of both a military and a political effect."],
    modelAnswer: "Roon's reforms enlarged the regular army and introduced three-year service, so by 1864 Prussia had a larger, better-trained army firmly under the king's control, which Moltke used to win in 1866. The reforms also had a political effect: parliament's refusal to fund them caused the crisis that brought Bismarck to power, and he then used the reformed army as the tool of his foreign policy.",
    explanation: "Two marks per developed point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain how Bismarck isolated Austria before the war of 1866.",
    points: [
      "Identifies Russia.",
      "Explains that Prussian help during the Polish rising of 1863 won Russian goodwill, so Russia would not help Austria.",
      "Identifies France.",
      "Explains that at Biarritz (1865) Napoleon III promised neutrality, expecting a long war and gains for France.",
      "Identifies Italy.",
      "Explains that the alliance of April 1866 (Venetia) forced Austria to fight on two fronts.",
    ],
    hints: ["Take each great power in turn."],
    modelAnswer: "Bismarck first secured Russia: in 1863 Prussia helped Russia during the Polish rising, so Russia was friendly and would not support Austria. He then neutralised France: at Biarritz in October 1865 Napoleon III promised to stay neutral, expecting a long war between the German powers from which France could gain. Finally, in April 1866 he made an alliance with Italy, which was promised Venetia, so Austria had to fight on two fronts. Britain did not wish to intervene, so Austria faced Prussia without great-power allies.",
    explanation: "Two marks per developed point.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a report by a fictional British diplomat in Berlin to the Foreign Office in London, May 1866", "The Minister-President speaks of peace, yet every railway station in Prussia is full of troops and wagons. He has made his bargain with Florence and assures me that Paris will not move. I believe he has decided that the question of Holstein shall be settled by the sword, and that he has chosen the moment.")}\n\n${source("Source B", "a statement printed in a fictional Prussian government newspaper, June 1866", "Prussia has shown patience for many months. It is Austria that has armed first, Austria that has broken the agreement of Gastein by stirring up Holstein against Prussia, and Austria that now calls the German states to arms against us. Prussia defends itself and the true interests of Germany.")}`,
    hints: ["What did each writer want his reader to think, and why?"],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What can you infer from Source A about Bismarck's preparations for war?", points: [
        "Prussia was mobilising (troops and railways).",
        "He had secured Italy ('Florence') and expected French neutrality, so war was planned.",
      ], explanation: "Two supported inferences." }),
      P.manual({ label: "(b)", marks: 4, stem: "Why do Sources A and B give different views of who was responsible for the war?", points: [
        "B is Prussian government propaganda aiming to blame Austria and win German opinion.",
        "B is published as war began, to justify Prussian action.",
        "A is a private report from a neutral diplomat with no need to persuade the public.",
        "A is based on observing mobilisation and Bismarck's own statements.",
      ], explanation: "Explain the difference from the purpose and origin of each source." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Does Source A prove that Bismarck planned the war with Austria? Use the sources and your own knowledge.", points: [
        "A supports planning: alliance with Italy, French neutrality, mobilisation.",
        "Own knowledge supports: Russia secured in 1863; Gastein left Holstein as a quarrel; Bismarck's 'iron and blood' view.",
        "A is a single observer's opinion ('I believe'), not proof.",
        "Own knowledge against: Gastein was a compromise; Bismarck kept options open; Austria also mobilised and used the Confederation.",
        "B shows the Prussian claim that Austria was the aggressor (biased but shows Austrian moves).",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source A suggests that Bismarck had planned the war: he had made a bargain with Italy, believed France would not move, and Prussian troops were being moved by rail. My own knowledge supports this, since Bismarck had secured Russian goodwill in 1863, met Napoleon III at Biarritz in 1865 and signed the Italian alliance in April 1866. However, Source A is one diplomat's opinion ('I believe'), not proof of Bismarck's intentions. The Convention of Gastein in 1865 had been a compromise that might have lasted, and Austria did arm and call the Confederation against Prussia, as Source B claims, although B is Prussian propaganda. Source A shows that by May 1866 Bismarck had prepared for war and chosen his moment, but not that he had planned it from 1862.", explanation: "A judgement about what the source can and cannot prove." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), weigh Bismarck's diplomacy against Prussia's army and Austria's own weaknesses."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the events of the Schleswig-Holstein question between 1863 and 1865.", points: [
        "Christian IX of Denmark accepted a constitution tying Schleswig more closely to Denmark (1863).",
        "German nationalists protested; Prussia and Austria acted together.",
        "Austria and Prussia defeated Denmark in 1864; Denmark gave up the duchies jointly to them.",
        "Convention of Gastein (1865): Prussia administered Schleswig, Austria Holstein.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "'Austria was defeated in 1866 mainly because of Bismarck's diplomacy.' How far do you agree?", points: [
        ["For: Russia friendly, France neutral at Biarritz, Austria isolated", 2],
        ["For: Italian alliance forced Austria to fight on two fronts; Holstein quarrel engineered", 2],
        ["Against: Prussian military strength (army reforms, needle gun, railways, Moltke) won Königgrätz", 2],
        ["Against: Austrian weaknesses (finances, slower mobilisation, older rifles)", 2],
        ["Supported judgement", 2],
      ], levels: levels(10), modelAnswer: "Bismarck's diplomacy was vital. Russia was friendly after Prussian help in 1863, Napoleon III promised neutrality at Biarritz, and Britain stayed out, so Austria had no great-power ally. The alliance with Italy in April 1866 forced Austria to divide its forces, and the Holstein arrangement at Gastein gave Bismarck a ready-made quarrel.\n\nHowever, diplomacy only made war possible; the army won it. Roon's reforms had enlarged the army, the needle gun gave the infantry faster fire, and Moltke used railways and the telegraph to bring three armies together at Königgrätz on 3 July 1866. Austria also had weaknesses of its own: its finances were poor, it mobilised more slowly and most of its infantry still used muzzle-loaders.\n\nI partly agree. Diplomacy decided that Austria would fight alone, but the speed of the defeat came from Prussian military superiority. The two together explain the outcome, but the battlefield was decisive.", explanation: "Levels: both sides with a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("FACT", "When did Bismarck become Minister-President of Prussia?", "September 1862, during the constitutional crisis over the army.");
  b.card("DEFINITION", "Realpolitik", "Politics based on practical interests and power rather than on ideals.");
  b.card("FACT", "What did Bismarck say would decide the great questions of the day (1862)?", "Not speeches and majority votes, but 'iron and blood'.");
  b.card("FACT", "What was the Convention of Gastein (August 1865)?", "Prussia was to administer Schleswig and Austria Holstein.");
  b.card("FACT", "When and where was Austria defeated in 1866?", "At Königgrätz (Sadowa), 3 July 1866.");
  b.card("FACT", "What was Italy promised for its alliance with Prussia (April 1866)?", "Venetia.");
  b.card("DEFINITION", "Indemnity Bill (1866)", "The law by which the Prussian parliament approved, after the event, Bismarck's spending without a budget since 1862.");
  b.card("DEFINITION", "North German Confederation", "The Prussian-led union of states north of the River Main, created after 1866 (constitution 1867).");
  b.card("CONCEPT", "Why did Prussia win the war of 1866?", "Austria was isolated by diplomacy; Prussia had railways, the needle gun, Moltke's planning and an Italian ally.");
});
