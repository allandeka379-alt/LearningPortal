// W3b: ahist.ww1.july-crisis (ZIMSEC causes; Cambridge Paper 3 Topic 1 context).
import { concept, P, source, extract, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.ww1.july-crisis", { file: "ww1/july-crisis", keyPrefix: "ww1.july-crisis" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who shot Archduke Franz Ferdinand and his wife at Sarajevo on 28 June 1914?",
    options: [
      ["Gavrilo Princip, a young Bosnian Serb nationalist", "Correct: he was a member of a group of young nationalists."],
      ["Nikola Pašić, the Serbian prime minister in Belgrade", "Pašić was a statesman and not the assassin."],
      ["Dragutin Dimitrijević, the head of the Black Hand", "He is accused of helping to organise the plot, but did not fire."],
      ["Count Berchtold, the foreign minister of Austria-Hungary", "He was an Austrian minister who later wrote the ultimatum."],
    ],
    answer: "A",
    explanation: "Gavrilo Princip fired the shots after an earlier bomb attempt had failed; the officers of the Black Hand are accused of helping the plot.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "What name is given to the German assurance of support for Austria-Hungary in early July 1914?",
    options: [
      ["The German blank cheque", "Correct: Germany promised to support whatever Austria decided."],
      ["The Reinsurance Treaty of 1887", "This was Bismarck's agreement with Russia of 1887."],
      ["The Schlieffen Plan", "This was a military plan, not an assurance to Austria."],
      ["The Entente Cordiale", "This was the Anglo-French agreement of 1904."],
    ],
    answer: "A",
    explanation: "On 5-6 July Wilhelm II and Bethmann Hollweg gave Austria-Hungary the assurance known as the blank cheque.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How did Serbia respond to the Austrian ultimatum of 23 July 1914?",
    options: [
      ["It accepted most demands but refused an Austrian inquiry in Serbia", "Correct: Serbia's reply was conciliatory but not complete."],
      ["It rejected every one of the ten demands and mobilised its army at once", "Serbia accepted many of the demands."],
      ["It accepted all ten demands without any reservation or condition", "Serbia did not accept the demand for Austrian officials in Serbia."],
      ["It asked Germany to mediate and made no reply to the ultimatum", "Serbia did reply, on 25 July."],
    ],
    answer: "A",
    hints: ["Think of the one point Serbia would not accept."],
    explanation: "Serbia's reply of 25 July accepted most of the ten demands but rejected the participation of Austrian officials in the investigation on Serbian soil, and Austria broke off relations.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why was the Russian general mobilisation of 30 July so important?",
    options: [
      ["The Schlieffen Plan needed speed, so Germany saw it as a threat", "Correct: Germany responded with ultimatums and declarations of war."],
      ["It forced Britain to sign an alliance with Germany at once", "Britain did not ally with Germany."],
      ["It ended the dispute by persuading Austria to withdraw its demands", "Austria did not withdraw."],
      ["It showed that Russia had decided not to support Serbia", "Russia supported Serbia."],
    ],
    answer: "A",
    hints: ["Think of the German war plan."],
    explanation: "Germany believed that if Russia mobilised, its own plan for a quick victory over France would be endangered, and it demanded that Russia stop and then declared war on 1 August.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did Britain declare war on Germany on 4 August 1914?",
    options: [
      ["Germany invaded Belgium, whose neutrality Britain had guaranteed", "Correct: the Treaty of London of 1839 mattered, and so did British interests."],
      ["Germany declared war on Britain after attacking the British fleet", "Germany had not declared war on Britain."],
      ["Britain was bound by treaty to fight for Russia and Serbia", "Britain had no such treaty."],
      ["France asked Britain to take over the defence of Alsace-Lorraine", "No such request was made."],
    ],
    answer: "A",
    hints: ["Think of the route of the German attack on France."],
    explanation: "The invasion of Belgium united the British Cabinet and public opinion; Britain sent an ultimatum that expired at 11 pm on 4 August and then declared war.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the effect of the failure of Grey's proposal for a conference in late July?",
    options: [
      ["It removed a chance to settle the quarrel by talks among the powers", "Correct: Germany declined, and the crisis went on."],
      ["It led Britain to declare war on Austria-Hungary on 27 July", "Britain did not declare war until 4 August, and against Germany."],
      ["It persuaded Russia to cancel its partial mobilisation immediately afterwards", "Russia mobilised on 29-30 July."],
      ["It brought Italy into the war on the side of Germany and Austria", "Italy declared neutrality."],
    ],
    answer: "A",
    hints: ["Think of what a conference might have achieved."],
    explanation: "The conference proposal of 26 July could have allowed negotiation, but Germany declined, and the crisis moved towards war.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about contingency in the origins of the war is best supported by the evidence?",
    options: [
      ["Chance helped to bring about the assassination, but decisions turned it into war", "Correct: chance and choice both mattered."],
      ["Contingency played no part in the crisis, since every step followed a fixed plan", "Chance was involved, for instance in the failure of the first bomb and the driver's wrong turn."],
      ["The assassination was the sole cause of the war, and decisions made no difference", "Governments made decisions that escalated the crisis."],
      ["The war broke out through pure accident, so no government can be blamed for it", "Governments chose actions, such as the ultimatum and mobilisation."],
    ],
    answer: "A",
    hints: ["Think of chance and choice together."],
    explanation: "The wrong turn in Sarajevo was an accident, but the blank cheque, the ultimatum, the mobilisations and the declarations of war were decisions.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which piece of evidence best supports the view that Austria-Hungary wanted a war with Serbia?",
    options: [
      ["Its ultimatum included a demand it knew Serbia could not accept", "Correct: this suggests that the aim was a war, not a settlement."],
      ["Its minister Tisza was at first against a war with Serbia", "This supports the opposite view."],
      ["Its government waited three weeks before presenting the ultimatum", "The delay has other explanations."],
      ["Its ambassador in Berlin reported the German promise of support", "This shows an interest in German support, not an aim of war."],
    ],
    answer: "A",
    hints: ["Which evidence shows how the note was designed?"],
    explanation: "Most historians think that the ultimatum was drafted so that Serbia would reject it, particularly the demand that Austrian officials take part in an inquiry on Serbian soil.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Germany invaded Belgium on 4 August 1914.",
    answer: true,
    explanation: "True. German troops crossed the frontier on 4 August, after Belgium rejected an ultimatum.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Serbia refused every demand in the Austrian ultimatum of 23 July 1914.",
    answer: false,
    explanation: "False. Serbia accepted most of the demands, and rejected only the participation of Austrian officials in an inquiry in Serbia.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Historians agree that the German leaders wanted a general European war in July 1914.",
    answer: false,
    hints: ["Think of the idea of a localised war."],
    explanation: "False. Some historians argue that Germany hoped for a localised war between Austria and Serbia and accepted the risk of a wider one; others argue that it sought a larger war.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their country and role.",
    pairs: [
      ["Count Berchtold", "Austro-Hungarian foreign minister"],
      ["Bethmann Hollweg", "German Chancellor who gave the blank cheque"],
      ["Sazonov", "Russian foreign minister"],
      ["Sir Edward Grey", "British foreign secretary"],
    ],
    explanation: "These four statesmen appear in most answers on July 1914.",
  });
  {
    const events = [
      "The assassination at Sarajevo",
      "The Austrian ultimatum to Serbia",
      "Russia orders general mobilisation",
      "Britain declares war on Germany",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 28 June, 23 July, 30 July and 4 August."],
      explanation: "28 June; 23 July; 30 July; 4 August 1914.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Austria-Hungary declared war on Serbia on {{blank:a}}, and Germany declared war on Russia on {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["28 July"], choices: ["28 June", "23 July", "28 July", "4 August"] },
      { id: "b", accepted: ["1 August"], choices: ["30 July", "1 August", "3 August", "6 August"] },
    ],
    explanation: "Austria declared war on 28 July 1914; Germany declared war on Russia on 1 August and on France on 3 August.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Bosnian Serb who assassinated Archduke Franz Ferdinand. Give his surname.",
    accepted: ["Princip", "Gavrilo Princip"],
    wrong: ["Cabrinovic"],
    explanation: "**Princip**; the bomb thrower earlier in the day was Nedeljko Čabrinović.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the events between the Austrian ultimatum of 23 July and Britain's declaration of war on 4 August 1914.",
    points: ["Serbia replied on 25 July and Austria broke off relations, then declared war on 28 July", "Russia mobilised on 29-30 July", "Germany declared war on Russia (1 August) and France (3 August)", "Germany invaded Belgium on 4 August and Britain declared war"],
    modelAnswer: "Serbia replied on 25 July and Austria broke off relations, then declared war on Serbia on 28 July. Russia mobilised on 29 and 30 July. Germany declared war on Russia on 1 August and on France on 3 August. Germany invaded Belgium on 4 August and Britain declared war.",
    explanation: "One mark for each stage described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain the importance of the German blank cheque in the July Crisis.",
    points: [["It gave Austria-Hungary the confidence to send a harsh ultimatum and to go to war with Serbia, since it believed Germany would deter Russia", 2], ["It committed Germany to the outcome and passed control of the crisis to Vienna; it did not by itself cause the war since Russia and France also chose to act", 2]],
    hints: ["Think of what it allowed Austria to do and what it did not decide."],
    modelAnswer: "The blank cheque gave Austria-Hungary the confidence to send a harsh ultimatum and to go to war with Serbia, since it believed Germany would deter Russia. It committed Germany to the outcome and passed control of the crisis to Vienna. It did not by itself cause the war, since Russia and France also chose to act.",
    explanation: "One mark for each point and one for development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Britain entered the war on 4 August 1914.",
    points: [["Germany invaded Belgium, whose neutrality Britain had guaranteed by the Treaty of London in 1839", 2], ["Britain's leaders feared a German victory over France that would put a hostile power on the Channel coast, and the Cabinet and public opinion united after the invasion", 2]],
    hints: ["Think of Belgium and of British security."],
    modelAnswer: "Germany invaded Belgium, whose neutrality Britain had guaranteed by the Treaty of London in 1839. British leaders also feared a German victory over France that would put a hostile power on the Channel coast, and the Cabinet and public opinion united after the invasion.",
    explanation: "One mark for each reason and one for development.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a private note by a fictional Austro-Hungarian official, early July 1914",
        "The Archduke's murder has given us the occasion we waited for. If we do not act now, Serbia will grow stronger. Berlin has said that it will stand with us. We must write a demand that Belgrade cannot meet in full."),
      "",
      source("Source B", "a telegram from a fictional Russian general to his ministry, 29 July 1914",
        "The mobilisation of the whole army must be ordered. A partial mobilisation will leave us exposed and will fail on the western frontier. Germany will not wait while we gather our forces, and we cannot allow Serbia to be crushed."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A show about the aims of Austria-Hungary?", points: ["It wanted to use the murder to act against Serbia", "It relied on German support and intended to write demands Serbia could not fully meet"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare Sources A and B as evidence of how the crisis escalated.", points: [["Agree: both show leaders choosing escalation and acting on the expectation of support or of German reaction", 2], ["Differ: A concerns Austria's plan to provoke a war with Serbia; B concerns Russian fear that partial mobilisation will leave it exposed and a wish to protect Serbia", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying the outbreak of the First World War?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is a private note, so it is likely to be frank about aims, and it fits the blank cheque and the ultimatum, but it is by one official and not a minister", 2], ["B is a general's recommendation, written to persuade the ministry; it reflects military reasoning, and military advice was an important pressure on Russian decisions", 2], ["Own knowledge: the ultimatum, the blank cheque and Russian mobilisation on 29-30 July confirm both, but neither source shows the French, British or German decisions, or the role of the Tsar", 2]], modelAnswer: "Source A is useful because it is a private note, so the writer is likely to be frank about Austrian aims; it fits the blank cheque and the harsh ultimatum, although it comes from one official and not from the government. Source B is useful because it shows the military reasoning which pressed the Tsar to order general mobilisation. As a recommendation written to persuade, it may exaggerate the dangers. My own knowledge confirms both, since Austria sent an ultimatum designed to be rejected and Russia mobilised on 29 and 30 July. However, neither source shows the decisions of Germany, France and Britain or the hesitation of the Tsar, so they give part of the story only." }),
    ],
    hints: ["For (c), consider the writer, the purpose and what is missing."],
    explanation: "Both sources are invented: a private note and a general's telegram.",
  });
  b.ext({
    d: 5, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: [
      "Read the extract.",
      "",
      extract("The tragedy of July 1914 lay in the failure of imagination. Each government made decisions which seemed reasonable within its own narrow calculation. Vienna wished to punish Serbia, and trusted that Berlin would restrain Russia. Berlin trusted that Russia would not fight, and did not consider what would follow if it did. St Petersburg could not abandon Serbia without surrendering its place in the Balkans. Paris stood behind its ally. Not one of these men intended to start a great war, and every one of them believed that his own decision was defensive. What was missing was the ability to see how their actions would appear to others, and how swiftly the plans they had drawn up would take over. Seen in this way, the war was the accidental product of misjudgment more than the result of any power's design."),
      "",
      "What can you learn from this extract about the interpretation and approach of the historian who wrote it? Use the extract and your knowledge of the July Crisis to explain your answer.",
    ].join("\n"),
    levels: levels(8, "interpretation"),
    points: [
      ["Interpretation: the war was an accident of misjudgment, not planned by any power; shared responsibility", 2],
      ["Approach: focuses on the decision-makers' perceptions and calculations (failure of imagination, contingency over motive), not on structures or aims", 2],
      ["Knowledge supporting: Berlin's hope for a localised war, Austria's expectation of German support, Russia's concern over Serbia, France's support for Russia, the speed of mobilisation plans", 2],
      ["Knowledge testing: the design of the ultimatum, the blank cheque, Germany's declarations and the invasion of Belgium suggest deliberate risk-taking, so some historians reject the accidental view", 2],
    ],
    hints: ["State the argument, how the historian approaches the subject, and then test it against the events."],
    modelAnswer: "The extract argues that the war was the accidental product of misjudgment rather than the design of any one power. The historian takes an approach that concentrates on the perceptions and calculations of decision-makers; he stresses a failure of imagination and the speed with which plans took over, and he treats aims as defensive. My knowledge supports some of this. Berlin hoped that the war would be localised and did not think through the consequences of a Russian reaction, and the Schlieffen Plan and mobilisation timetables did reduce the time for diplomacy. Russia felt it could not abandon Serbia, and France stood behind Russia. But the extract plays down deliberate choices. Austria sent an ultimatum designed to be rejected, Germany gave a blank cheque and declined Grey's conference, and Germany invaded Belgium, so some historians argue that governments knowingly risked a European war. The extract therefore shows an interpretation which stresses accident and shared responsibility, convincing for the effect of the plans, but less so on the intent of Vienna and Berlin.",
    explanation: "The extract is invented. Credit identification of the interpretation and approach, explained with the extract and tested with knowledge.",
  });

  b.card("DEFINITION", "What was the blank cheque of July 1914?", "Germany's assurance of 5-6 July that it would support Austria-Hungary whatever action it took against Serbia.");
  b.card("DEFINITION", "What is contingency in history?", "The role of chance and accident in events, as against long-term causes or deliberate aims.");
  b.card("FACT", "Who assassinated Franz Ferdinand, where and when?", "Gavrilo Princip, in Sarajevo on 28 June 1914.");
  b.card("FACT", "What were the main demands and result of the Austrian ultimatum?", "Delivered 23 July with ten demands and 48 hours; Serbia accepted most but not the inquiry by Austrian officials in Serbia, and Austria declared war on 28 July.");
  b.card("FACT", "When did Germany declare war on Russia and on France?", "On Russia 1 August 1914 and on France 3 August 1914.");
  b.card("FACT", "What brought Britain into the war on 4 August 1914?", "Germany's invasion of Belgium, whose neutrality Britain had guaranteed in 1839.");
  b.card("CONCEPT", "Why did the Russian mobilisation matter so much?", "The Schlieffen Plan depended on speed, so Germany treated Russian mobilisation as a threat and declared war.");
  b.card("CONCEPT", "Why did attempts to mediate in July 1914 fail?", "Germany declined Grey's conference, Austria did not accept the halt in Belgrade, and the mobilisation timetables limited time.");
  b.card("CONCEPT", "What is meant by the importance of contingency over motive?", "That accidents and misjudgments, such as the wrong turn at Sarajevo, may explain events better than the fixed aims of governments.");
});
