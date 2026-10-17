// W3b: ahist.ww1-debate.responsibility-fischer (Cambridge only; Paper 3 Topic 1).
import { concept, P, source, extract, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.ww1-debate.responsibility-fischer", { file: "ww1-debate/responsibility-fischer", keyPrefix: "ww1-debate.responsibility-fischer" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which article of the Treaty of Versailles became the focus of the debate about war guilt?",
    options: [
      ["Article 231, on responsibility for loss and damage of war", "Correct: it was the basis for reparations."],
      ["Article 42, on the demilitarisation of the Rhineland zone", "This article concerned the Rhineland, not responsibility."],
      ["Article 160, on the size of the German army after the war", "This article limited the army."],
      ["Article 119, on the surrender of German colonies overseas", "This article dealt with the colonies."],
    ],
    answer: "A",
    explanation: "Article 231 stated that Germany and its allies were responsible for the loss and damage caused by the war, and it was the basis for reparations.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How did most Germans react to Article 231 in the 1920s?",
    options: [
      ["They saw it as an unfair charge of guilt and fought against it", "Correct: the 'war guilt lie' was a theme of German politics."],
      ["They accepted it as a fair statement of German responsibility", "It was widely rejected."],
      ["They ignored it because it concerned only the Austrian government", "It concerned Germany."],
      ["They demanded that Britain should be put on trial in its place", "The campaign was not concerned with trials."],
    ],
    answer: "A",
    explanation: "Germans read Article 231 as a moral charge, and all the major parties denounced it, while the Foreign Ministry published documents to rebut it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What was the main argument of historians such as Sidney Fay in the late 1920s?",
    options: [
      ["Responsibility for the war was shared among the Great Powers", "Correct: no single power wanted a European war."],
      ["Germany alone had planned and started the war in 1914 on purpose", "This was the wartime and Versailles view that Fay challenged."],
      ["Serbia was the only country to be blamed for the outbreak", "He did not blame Serbia alone."],
      ["The war was caused solely by the arms race at sea", "He gave many causes, not only one."],
    ],
    answer: "A",
    hints: ["Think of the word 'shared'."],
    explanation: "Fay argued that all the powers had contributed through alliances, militarism, secret diplomacy and nationalism, so that Germany alone should not be blamed.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How did the Second World War affect the debate about 1914?",
    options: [
      ["Historians asked whether German aims had continued from Wilhelm II to Hitler", "Correct: Nazi aggression changed the questions asked."],
      ["It ended the debate, since all historians then agreed on the causes of the war", "The debate continued and grew sharper."],
      ["It proved that Germany had no responsibility for the First World War at all", "The war did not prove this."],
      ["It led historians to stop studying the origins of the earlier war altogether", "Interest in the question grew."],
    ],
    answer: "A",
    hints: ["Think of continuity."],
    explanation: "After Hitler's war and the Holocaust, historians asked whether Imperial Germany's aims anticipated Nazi aims; others, such as Ritter, rejected the idea of continuity.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the September Programme of 1914, used by Fischer as evidence?",
    options: [
      ["A set of German war aims drawn up by the Chancellor's advisers", "Correct: it proposed control of Belgium and Central Europe."],
      ["A secret Austrian plan to attack Serbia in the early autumn of 1914", "It was a German document, not an Austrian plan."],
      ["A British list of demands to be made of Germany at Versailles", "It was a German document of 1914."],
      ["A Russian programme for mobilisation of the army in September", "It was not a Russian programme."],
    ],
    answer: "A",
    hints: ["Think of the Chancellor and war aims."],
    explanation: "The programme of 9 September 1914 set out aims such as German dominance over Belgium and a Central European economic union; Fischer treated it as evidence of continuity of aims.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why was the German reaction to Fischer's book so hostile?",
    options: [
      ["It seemed to confirm German guilt and link Imperial Germany to Hitler", "Correct: many saw it as an attack on national honour."],
      ["It claimed that Britain had planned the war in order to destroy Germany", "It argued the opposite."],
      ["It denied that the Second World War had been started by Germany", "It was not about the Second World War."],
      ["It was published only in English and was not read in Germany", "It was published in German, and widely read."],
    ],
    answer: "A",
    hints: ["Think of how the book linked 1914 and later history."],
    explanation: "Conservative historians such as Ritter saw it as an attack on German national honour and as a suggestion of continuity from 1914 to Hitler.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which criticism of Fischer's use of evidence is most reasonable?",
    options: [
      ["War aims written after the war began do not prove intentions before it", "Correct: the programme may reflect opportunity as well as plan."],
      ["He used no documents at all and relied only on memory and rumour", "He used many documents."],
      ["He wrote about the French Revolution and not about the First World War", "His subject was Germany in the First World War."],
      ["He ignored the German archives and used only British sources", "He relied heavily on German records."],
    ],
    answer: "A",
    hints: ["Think of the date of the September Programme."],
    explanation: "Critics argued that the September Programme was a response to the early victories of 1914 and did not show a pre-war plan, so Fischer's claims about continuity need other evidence.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement best describes the position of the debate on Fischer today?",
    options: [
      ["Many accept heavy German responsibility but dispute continuity and planned war", "Correct: parts of the thesis have lasted, and others are contested."],
      ["All historians now agree that Fischer was entirely right on every single point he made", "Many points are still disputed."],
      ["All historians now agree that Fischer was entirely wrong on every single point he made", "Much of his emphasis on Germany has been accepted."],
      ["Historians no longer study the question of responsibility for the war", "The debate continues."],
    ],
    answer: "A",
    hints: ["Think of what has been accepted and what has not."],
    explanation: "Fischer's emphasis on German responsibility, especially in July 1914, has been widely accepted, while his claims about planned war and continuity to the Nazi era are disputed.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Fritz Fischer published Griff nach der Weltmacht in 1961.",
    answer: true,
    explanation: "True. The book appeared in 1961 and the English version, Germany's Aims in the First World War, in 1967.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Article 231 of the Treaty of Versailles used the word 'guilt' to describe Germany's responsibility.",
    answer: false,
    explanation: "False. The article spoke of responsibility for loss and damage; Germans read it as an admission of guilt.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "The idea of shared responsibility in the 1920s and 1930s was influenced only by the evidence, not by politics.",
    answer: false,
    hints: ["Think of the harshness of Versailles and later appeasement."],
    explanation: "False. Interpretations were shaped by new documents, but also by dislike of the harshness of Versailles and, in the 1930s, by the wish of some to conciliate Germany.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each historian with their position in the debate.",
    pairs: [
      ["Sidney Fay", "Argued in the 1920s that responsibility was shared"],
      ["Gerhard Ritter", "German historian who defended the defensive aims of German policy"],
      ["Fritz Fischer", "Argued that Germany pursued world power and risked war in 1914"],
      ["Luigi Albertini", "Italian author who placed heavy responsibility on Germany and Austria"],
    ],
    explanation: "These four historians mark different positions in the debate.",
  });
  {
    const events = [
      "The Treaty of Versailles with Article 231",
      "Sidney Fay's The Origins of the World War",
      "The start of the Second World War",
      "Fischer's Griff nach der Weltmacht",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1919, 1928, 1939 and 1961."],
      explanation: "1919; 1928; 1939; 1961.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "{{blank:a}} argued in {{blank:b}} that Germany had pursued world power and risked war.",
    blanks: [
      { id: "a", accepted: ["Fritz Fischer"], choices: ["Fritz Fischer", "Sidney Fay", "Gerhard Ritter", "Christopher Clark"] },
      { id: "b", accepted: ["1961"], choices: ["1919", "1928", "1961", "2012"] },
    ],
    explanation: "Fischer's Griff nach der Weltmacht appeared in 1961.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the term used in the 1920s for Germany's rejection of the claim that it alone was responsible for the war: the war guilt ...? Give the missing word.",
    accepted: ["lie", "the lie"],
    wrong: ["treaty"],
    explanation: "The **war guilt lie** (Kriegsschuldlüge) was the nationalist term for the claim in Article 231.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the main arguments of Fritz Fischer about German policy before and during the First World War.",
    points: ["Germany's leaders aimed at European dominance and world power", "The September Programme of 1914 set out aims such as control of Belgium and Central Europe", "Germany deliberately risked war in 1914, with the blank cheque", "Aims continued earlier policy and domestic pressures influenced it"],
    modelAnswer: "Fischer argued that Germany's leaders aimed at European dominance and world power. He used the September Programme of 1914, which set out aims such as control of Belgium and Central Europe, and argued that Germany deliberately risked war in 1914 by giving Austria a blank cheque. He claimed that these aims continued earlier policy and were influenced by domestic pressures.",
    explanation: "One mark for each argument described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the idea of shared responsibility became popular in the 1920s.",
    points: [["New documents published by governments showed a complicated sequence of decisions in many countries, not a single plot", 2], ["Many in Britain and the United States believed Versailles had been too harsh, and Germans campaigned against the war guilt charge", 2]],
    hints: ["Think of the evidence and of attitudes to the treaty."],
    modelAnswer: "New documents published by governments showed a complicated sequence of decisions in many countries and not a single plot. Many in Britain and the United States also believed that Versailles had been too harsh, and Germans campaigned against the war guilt charge.",
    explanation: "One mark for each reason and one for development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how historians challenged Fischer's interpretation.",
    points: [["Critics such as Ritter said that war aims drawn up after the war began did not prove pre-war intentions and that Fischer relied too much on a few documents", 2], ["Others argued that Germany took a calculated risk in a defensive spirit or stressed the responsibility of Austria-Hungary, Russia and France", 2]],
    hints: ["Think of evidence, defensive aims and the other powers."],
    modelAnswer: "Critics such as Ritter said that war aims drawn up after the war began did not prove pre-war intentions, and that Fischer relied too much on a few documents. Others argued that Germany took a calculated risk in a defensive spirit, or stressed the responsibility of Austria-Hungary, Russia and France.",
    explanation: "One mark for each challenge and one for development.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the two passages and answer the questions.",
      "",
      source("Source A", "a passage in the manner of a historian writing in the late 1920s",
        "The documents now before us show no plot by any one government. Each of the great powers made mistakes, and each expected that the others would give way. The treaty put the blame on Germany; the evidence does not."),
      "",
      source("Source B", "a passage in the manner of a historian writing in the 1960s",
        "The German leaders sought to make their country the master of Europe. When the opportunity came in 1914 they took the risk of a general war, in the expectation that the programme which they drew up in September would then be carried out."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about the responsibility for the war?", points: ["No single government planned the war / each made mistakes", "The evidence does not support the treaty's blame on Germany"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare the interpretations of Sources A and B.", points: [["Differ: A says responsibility was shared and rejects blame on Germany; B places the main responsibility on German leaders who sought mastery and risked war", 2], ["Both rely on documents and make a judgement on the aims of governments, although A concentrates on mistakes and B on deliberate aims", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "Why might the interpretations in Sources A and B be different?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A was written in the 1920s when many disliked Versailles and Article 231, and when new documents had been published by governments, which encouraged the view of shared responsibility", 2], ["B was written in the 1960s after the Second World War, when historians asked about continuity in German aims, and drew on German archives containing war aims such as the September Programme", 2], ["Each reflects the evidence available and the concerns of its time; neither is simply true, and both must be tested against the events of July 1914", 2]], modelAnswer: "Source A reflects the 1920s, when many people disliked the Treaty of Versailles and Article 231, and when governments had published documents which suggested a complicated pattern of decisions rather than a single plot. That context encouraged the idea that responsibility was shared. Source B reflects the 1960s, after the Second World War, when historians asked whether German aims showed continuity, and when German archives contained war aims such as the September Programme. The interpretations differ because the historians had different evidence and different concerns, and neither can be accepted without testing it against the events of July 1914, such as the blank cheque and the Russian mobilisation." }),
    ],
    hints: ["For (c), consider the date of each passage and what was happening then."],
    explanation: "Both passages are invented in the manner of historians of their periods; they are not the words of any real historian.",
  });
  b.ext({
    d: 5, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: [
      "Read the extract.",
      "",
      extract("The documents show that the German leaders did not stumble into war. They knew in July 1914 that Austria's action against Serbia would very probably bring in Russia, and they accepted that risk because they believed that the balance of power would shift against them in a few years. This was not an accident but a decision. It was made by men who were fearful of Russia and of their own working class, and who saw a war as a means of restoring confidence at home and of breaking the encirclement they believed had been created around them. Of course the other powers also acted, and some of their actions made the crisis worse. But in this crisis the initiative lay in Berlin. When they gave their ally a free hand, the German leaders turned a Balkan quarrel into a European war."),
      "",
      "What can you learn from this extract about the interpretation and approach of the historian who wrote it? Use the extract and your knowledge of the debate about the origins of the First World War to explain your answer.",
    ].join("\n"),
    levels: levels(8, "interpretation"),
    points: [
      ["Interpretation: Germany bore the main responsibility, having deliberately accepted the risk of a wider war in July 1914, though others acted too", 2],
      ["Approach: documents of decision-making, with motives such as fear of Russia and domestic anxiety; focus on intention, not accident or structures", 2],
      ["Knowledge supporting: the blank cheque, German war plans, the Fischer thesis and the September Programme, Bethmann Hollweg's risk", 2],
      ["Knowledge testing: the view of a defensive risk, responsibility of Austria and Russia, contingency and shared responsibility (Fay, Ritter, Clark)", 2],
    ],
    hints: ["State the argument, describe the approach, link it to the debate, then test it."],
    modelAnswer: "The extract argues that Germany bore the main responsibility, because its leaders knowingly accepted the risk of a European war in July 1914. The historian's approach is to study the documents of decision-making and to emphasise motives, namely fear of Russia, fear of the working class and a sense of encirclement, rather than accident or structures. This resembles the line associated with Fritz Fischer, which also stressed German intention and domestic pressures. My knowledge supports the extract: Germany gave Austria the blank cheque on 5-6 July, declined Grey's conference, and relied on a plan that required a quick attack on France. But the extract can be tested. Critics of Fischer argued that Bethmann Hollweg took a calculated risk in defence and hoped for a localised war, and others stress the part of Austria-Hungary, Russia and France, or of contingency. The extract therefore represents a strong Germany-centred interpretation, convincing on July 1914, but it plays down the other powers' decisions and the long-term structures of the system.",
    explanation: "The extract is invented. Credit identification of the interpretation and approach, explained with the extract and tested with knowledge.",
  });

  b.card("DEFINITION", "What was Article 231?", "The article of the Treaty of Versailles stating that Germany and its allies were responsible for the loss and damage caused by the war; the basis for reparations.");
  b.card("DEFINITION", "What is revisionism in the war guilt debate?", "The 1920s view that Germany alone was not responsible, and that responsibility should be shared among the Great Powers.");
  b.card("FACT", "What was Fritz Fischer's main work and when did it appear?", "Griff nach der Weltmacht (1961); in English, Germany's Aims in the First World War (1967).");
  b.card("FACT", "What was the September Programme?", "German war aims drawn up on 9 September 1914 under Bethmann Hollweg, including control of Belgium and a Central European economic union; used by Fischer as evidence.");
  b.card("FACT", "Which historian argued for shared responsibility in 1928?", "Sidney Fay, in The Origins of the World War.");
  b.card("FACT", "Which German historian led the attack on Fischer?", "Gerhard Ritter, who defended the defensive character of German policy.");
  b.card("CONCEPT", "Why did the idea of shared responsibility arise in the 1920s?", "New documents showed a complex picture, Versailles seemed harsh, and many wished to avoid blaming one nation.");
  b.card("CONCEPT", "How did the Second World War change the debate?", "It led historians to ask whether there was a continuity of German aims from Wilhelm II to Hitler.");
  b.card("CONCEPT", "What are the main criticisms of Fischer?", "War aims after 1914 do not prove pre-war plans, he relied on a few documents, Germany may have taken a defensive calculated risk, and other powers shared responsibility.");
});
