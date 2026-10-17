// W3b: ahist.ww1-debate.modern-interpretations (Cambridge only; Paper 3 Topic 1).
import { concept, P, source, extract, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.ww1-debate.modern-interpretations", { file: "ww1-debate/modern-interpretations", keyPrefix: "ww1-debate.modern-interpretations" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who wrote The Sleepwalkers: How Europe Went to War in 1914 (2012)?",
    options: [
      ["Christopher Clark, a historian of modern European history", "Correct: he argued that leaders failed to foresee the consequences."],
      ["Fritz Fischer, a German historian of the 1960s debate on guilt", "Fischer wrote Griff nach der Weltmacht in 1961."],
      ["Sidney Fay, an American historian of the late 1920s debate", "Fay's book appeared in 1928."],
      ["Gerhard Ritter, a German historian who defended policy", "Ritter wrote about German policy in the 1950s and 1960s."],
    ],
    answer: "A",
    explanation: "Christopher Clark's The Sleepwalkers (2012) is one of the most influential modern studies of the origins of the war.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How does Christopher Clark's approach in The Sleepwalkers differ from Fischer's?",
    options: [
      ["It asks how decisions were made in a multipolar Europe, not just who erred", "Correct: Clark stresses shared responsibility and misjudgment."],
      ["It argues that Germany alone had planned and started the war since 1890", "That is closer to a strong form of the Fischer thesis."],
      ["It claims that the war was caused by one economic crisis of 1913 in Europe", "No such claim is made."],
      ["It says that no decisions were taken by any government in July 1914", "Clark discusses many decisions."],
    ],
    answer: "A",
    explanation: "Clark examines the decisions of several governments in a flexible, multipolar system and asks how leaders came to take them, which reduces the emphasis on a single guilty power.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What does the phrase 'contingency over motive' mean in this debate?",
    options: [
      ["Chance and misjudgment explain the war better than fixed aims do", "Correct: the stress is on accident and decisions under pressure."],
      ["The motives of the German government are the only valid explanation", "This is the opposite of the phrase."],
      ["The war was inevitable because of the long-term alliance system alone", "That is a structural claim, not about contingency."],
      ["Historians should ignore decisions and study only the economy", "The phrase concerns decisions and chance."],
    ],
    answer: "A",
    hints: ["Think of accident and aim."],
    explanation: "To stress contingency over motive is to argue that the outcome depended on accidents, misjudgments and choices in the crisis more than on any government's settled aim of war.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which argument is associated with the historian Sean McMeekin?",
    options: [
      ["Russian ambitions and mobilisation were important causes of the general war", "Correct: he drew attention to Russia's aims on the Straits."],
      ["Britain should have stayed out of the war to avoid a world conflict", "That is closer to the argument of Niall Ferguson."],
      ["Austria-Hungary was the only power that wanted a war in 1914", "McMeekin did not argue this."],
      ["The assassination at Sarajevo was entirely planned by the French government", "No such claim exists."],
    ],
    answer: "A",
    hints: ["Think of the Russian origins of the war."],
    explanation: "McMeekin's The Russian Origins of the First World War (2011) argues that Russian aims, particularly concerning the Straits, and Russia's mobilisation had a decisive effect.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What criticism have Mombauer and Röhl made of the Sleepwalkers interpretation?",
    options: [
      ["It understates the German and Austrian decisions that escalated the crisis", "Correct: they stress the blank cheque and the refusal of mediation."],
      ["It gives too much attention to the German role and ignores the other powers", "They make the opposite criticism."],
      ["It claims that the First World War was fought only in Africa", "This is not the argument."],
      ["It depends only on documents that were published before the year 1930", "Clark used much newer material."],
    ],
    answer: "A",
    hints: ["Think of who they hold chiefly responsible."],
    explanation: "Historians who stress German responsibility argue that the Sleepwalkers approach, by emphasising shared confusion, underplays the decisions in Berlin and Vienna in July 1914.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What happened to the debate on 1914 during the centenary?",
    options: [
      ["Public debate grew and attention turned to how decisions were made", "Correct: the question of responsibility did not disappear."],
      ["All historians and governments agreed on a single account of the causes", "The debate remained disputed."],
      ["Interest in the subject ended because the war was seen as irrelevant", "Interest grew."],
      ["Books on the war were banned in Germany and Serbia during 2014", "There was no ban."],
    ],
    answer: "A",
    hints: ["Think of public discussion and the question 'how'."],
    explanation: "In 2014 there was a flood of books and commemorations; many scholars saw a shift from the blame question towards the study of how decisions were made, though the dispute over responsibility continued.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which piece of evidence best supports the view that long-term factors alone did not make war inevitable in 1914?",
    options: [
      ["Earlier crises like Morocco and Bosnia ended without a general war", "Correct: the system had managed tension before."],
      ["The arms race between Britain and Germany in the years before 1914", "This supports the importance of long-term tension."],
      ["The existence of the Triple Alliance and the Triple Entente blocs", "This supports the structural view."],
      ["The Schlieffen Plan, which required a very quick attack on France", "This supports the view that plans limited choice."],
    ],
    answer: "A",
    hints: ["Which evidence shows that tension had been contained?"],
    explanation: "The earlier crises (1905, 1908, 1911, 1912-13) ended peacefully, which suggests that the system was not bound to produce war and that the decisions of July 1914 mattered.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement best assesses Ferguson's argument that Britain should not have joined the war?",
    options: [
      ["It is a minority view, as German victory threatened British security", "Correct: most historians reject it for this reason."],
      ["It is accepted by all historians because Britain had no interest in Belgium", "It is not accepted by all historians."],
      ["It is proved wrong because Britain had no navy in the year 1914", "Britain had the largest navy."],
      ["It is irrelevant because Britain was not involved in any decision in July", "Britain's decisions are discussed in the debate."],
    ],
    answer: "A",
    hints: ["Think of why many reject the claim."],
    explanation: "Ferguson argued that British entry turned a European war into a world war, but most historians reply that a German victory would have given Germany dominance in Europe and threatened British interests.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The centenary of the outbreak of the First World War was in 2014.",
    answer: true,
    explanation: "True. The centenary of the war's outbreak was commemorated in 2014.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Clark's The Sleepwalkers argues that no European power had any responsibility for the outbreak of war.",
    answer: false,
    explanation: "False. Clark argues that responsibility was shared and that leaders in several capitals made decisions that led to war.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "The opening of archives after the end of the Cold War allowed historians to study Serbian and Russian decisions in more detail.",
    answer: true,
    hints: ["Think of archives in Belgrade and Moscow."],
    explanation: "True. Access to archives in Russia and eastern Europe made new studies of Serbian, Russian and Austrian policy possible.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each historian with their emphasis.",
    pairs: [
      ["Christopher Clark", "Multipolar system and leaders who failed to foresee the consequences"],
      ["Sean McMeekin", "Russian ambitions and mobilisation"],
      ["Niall Ferguson", "Britain's decision to intervene turned a European war into a world war"],
      ["John Röhl", "German policy and the part of the Kaiser and military leaders"],
    ],
    explanation: "These four historians mark different emphases in the modern debate.",
  });
  {
    const events = [
      "Fischer publishes Griff nach der Weltmacht",
      "Ferguson publishes The Pity of War",
      "Clark publishes The Sleepwalkers",
      "The centenary of the outbreak of war",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1961, 1998, 2012 and 2014."],
      explanation: "1961; 1998; 2012; 2014.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Clark's book, published in {{blank:a}}, described European leaders as {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["2012"], choices: ["1961", "1998", "2012", "2019"] },
      { id: "b", accepted: ["sleepwalkers"], choices: ["sleepwalkers", "conspirators", "revolutionaries", "pacifists"] },
    ],
    explanation: "The Sleepwalkers appeared in 2012.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "In which year was the centenary of the outbreak of the First World War marked?",
    accepted: ["2014"],
    wrong: ["2012"],
    explanation: "**2014**, one hundred years after 1914.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how modern historians have examined the responsibility of countries other than Germany.",
    points: ["They have studied Austria-Hungary's leaders and their aim of punishing Serbia", "They have examined Serbia's nationalism and the Black Hand", "They have studied Russian ambitions and mobilisation", "They have asked about the roles of France and Britain"],
    modelAnswer: "Modern historians have studied Austria-Hungary's leaders and their aim of punishing Serbia. They have examined Serbia's nationalism and the Black Hand. They have studied Russian ambitions and mobilisation, and have asked about the roles of France and Britain.",
    explanation: "One mark for each point described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why some historians argue that the long-term causes did not make war inevitable.",
    points: [["Earlier crises such as Morocco, Bosnia and the Balkan Wars were settled without a general war, so the system could manage tension", 2], ["The alliances were flexible and Britain was not committed, so the decisions of July 1914 by individuals and governments could have been different", 2]],
    hints: ["Think of earlier crises and of choices."],
    modelAnswer: "Earlier crises such as Morocco, Bosnia and the Balkan Wars were settled without a general war, so the system could manage tension. The alliances were flexible and Britain was not committed, so the decisions of July 1914 by individuals and governments could have been different.",
    explanation: "One mark for each reason and one for development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the centenary of 1914 affected the debate on the origins of the war.",
    points: [["It brought public attention and many new books and exhibitions, and linked the interpretation of 1914 to national memory in Britain, Germany, Serbia and elsewhere", 2], ["It encouraged attention to how decisions were made and to the global effects of the war, though the question of responsibility remained disputed", 2]],
    hints: ["Think of public debate and of the questions historians asked."],
    modelAnswer: "The centenary brought public attention, many new books and exhibitions, and linked the interpretation of 1914 to national memory in Britain, Germany, Serbia and elsewhere. It encouraged attention to how decisions were made and to the global effects of the war, although the question of responsibility remained disputed.",
    explanation: "One mark for each point and one for development.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the passages and answer the questions.",
      "",
      source("Source A", "a passage in the manner of a modern historian emphasising contingency",
        "The leaders of 1914 were not villains. They were men who acted on partial information, in fear of one another, and who did not foresee that the plans they had set in motion would take over. The assassination, the delays in Vienna and the mobilisations in Russia were links in a chain in which chance played a part."),
      "",
      source("Source B", "a passage in the manner of a modern historian emphasising German decisions",
        "It is misleading to speak of sleepwalking. The German leaders knew that their promise to Austria might lead to a European war, and they accepted that risk. They declined to restrain Vienna and they refused the offer of a conference. In this crisis the decisions were deliberate."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about the leaders of 1914?", points: ["They acted on partial information and in fear, and were not villains", "They did not foresee the consequences of their plans, and chance played a part"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare the interpretations in Sources A and B.", points: [["Differ: A stresses chance and misjudgment and presents leaders without clear intent; B stresses deliberate decisions and accepted risk by German leaders", 2], ["Both discuss the decisions of leaders in July 1914, though they disagree about whether the outcome was foreseen", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How far does your knowledge of July 1914 support the interpretation in Source B?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["Support: the blank cheque of 5-6 July, the refusal of Grey's conference, and the German declarations on Russia and France support deliberate risk-taking", 2], ["Challenge: Germany's hope for a localised war, the Kaiser's 'halt in Belgrade' proposal and the part played by Austrian and Russian decisions suggest a more mixed picture", 2], ["Judgement: B is convincing on the German decisions but incomplete on other powers and on contingency; the best view combines the two", 2]], modelAnswer: "My knowledge supports Source B in several ways. Germany gave Austria the blank cheque on 5-6 July, declined Grey's proposal for a conference, and declared war on Russia and France when Russia mobilised. These were deliberate decisions that took the risk of a European war. But the picture is more mixed. German leaders hoped the war would remain localised, the Kaiser proposed a halt in Belgrade on 28 July, and Austria's ultimatum and the Russian mobilisation were also decisions that escalated the crisis. Source B is therefore convincing about German decisions but incomplete on the other powers and on the part of chance, as in Source A. The best view combines the two." }),
    ],
    hints: ["For (c), use specific events from July 1914 and weigh support against challenge."],
    explanation: "Both passages are invented in the manner of modern historians; they are not the words of any real historian.",
  });
  b.ext({
    d: 5, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: [
      "Read the extract.",
      "",
      extract("It is tempting, a century later, to look for the villain. But the Europe of 1914 was not a world of two blocs marching to a fixed destination. It was a crowded field of powers with shifting friendships, in which the Balkans were the most unstable corner. The Serbian government pursued a national programme which it could not control; Vienna saw in it a threat to its existence; St Petersburg could not abandon a protégé without loss of standing; Paris wished to hold its ally; Berlin hoped, wrongly, that the crisis could be limited. Each took decisions that appeared prudent to its own leaders. What is remarkable is not that war came but that it did not come sooner. The question that matters is how a series of decisions, each made in the belief that it would prevent disaster, together produced it."),
      "",
      "What can you learn from this extract about the interpretation and approach of the historian who wrote it? Use the extract and your knowledge of the debate about the origins of the First World War to explain your answer.",
    ].join("\n"),
    levels: levels(8, "interpretation"),
    points: [
      ["Interpretation: no single villain; responsibility shared among several powers acting in a multipolar system; the Balkans as the unstable centre", 2],
      ["Approach: focuses on how decisions were made by several governments, on perceptions and miscalculation, not on a search for blame; contingency over motive", 2],
      ["Knowledge supporting: Serbian nationalism and the Black Hand, Austria's fear, Russian support for Serbia, French support, German hope of a localised war; earlier crises settled", 2],
      ["Knowledge testing: the blank cheque, the ultimatum designed to be rejected, German refusal of mediation, the Schlieffen Plan; critics such as Röhl and Mombauer say this understates German responsibility", 2],
    ],
    hints: ["State the argument, say how the historian approaches the subject, then test against the debate."],
    modelAnswer: "The extract argues that there was no single villain in 1914. It presents Europe as a multipolar system in which several governments, including Serbia, Austria-Hungary, Russia, France and Germany, took decisions that seemed prudent to them but together produced war. The historian's approach is to ask how the war came, and to focus on perceptions, miscalculation and contingency in the Balkan crisis rather than on blame; this resembles the approach of Christopher Clark. My knowledge supports much of this: Serbian nationalism and the Black Hand troubled Vienna, Russia supported Serbia, France supported Russia, and Germany hoped for a localised war. Earlier crises in 1905, 1908 and 1911 had been settled without a general war. But the extract can be tested. Germany gave the blank cheque, the Austrian ultimatum was designed to be rejected, and Berlin refused Grey's conference. For this reason historians such as Röhl and Mombauer argue that the approach understates German and Austrian responsibility. The extract therefore represents a modern interpretation which stresses shared responsibility and contingency, convincing about the complexity of the system but open to challenge about the decisions of Berlin and Vienna.",
    explanation: "The extract is invented. Credit identification of the interpretation and approach, explained with the extract and tested with knowledge.",
  });

  b.card("DEFINITION", "What is a multipolar system?", "An international system with several powers of comparable importance, none dominant, so alliances and calculations are complex.");
  b.card("DEFINITION", "What does 'contingency over motive' mean?", "That accident, misjudgment and choices in a crisis explain events better than any government's fixed aim of war.");
  b.card("FACT", "What is Christopher Clark's main work on 1914 and its date?", "The Sleepwalkers: How Europe Went to War in 1914 (2012).");
  b.card("FACT", "What is Sean McMeekin's argument?", "In The Russian Origins of the First World War (2011), that Russian ambitions and mobilisation were important in causing the general war.");
  b.card("FACT", "What was Niall Ferguson's argument in The Pity of War (1998)?", "That Britain's decision to enter the war was a mistake that turned a European war into a world war.");
  b.card("FACT", "Which historians stress continued German responsibility against Clark?", "John Röhl and Annika Mombauer, who emphasise the decisions of Berlin and Vienna.");
  b.card("CONCEPT", "Why do some historians doubt that the long-term causes made war inevitable?", "Earlier crises were settled peacefully, and the alliances were flexible, so the decisions of July 1914 mattered.");
  b.card("CONCEPT", "How did the centenary of 1914 affect the debate?", "It brought public discussion and new books, tied interpretations to national memory, and moved attention to how decisions were made.");
  b.card("CONCEPT", "What is the difference between structure and agency in explaining 1914?", "Structures (alliances, arms race, nationalism) set the conditions; agency is the choices of leaders such as the Kaiser, Tsar and Poincaré.");
});
