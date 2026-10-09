// Slice W3b: the July Crisis and the outbreak of war, 1914 (both boards: ZIMSEC 12.1, Cambridge Option A KQ6).
import { concept, P, source, levels, timeline } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];
const order = timeline([
  ["5-6 July 1914", "Germany gives Austria-Hungary the 'blank cheque'"],
  ["23 July 1914", "Austria-Hungary sends its ultimatum to Serbia"],
  ["30 July 1914", "Russia orders general mobilisation"],
  ["4 August 1914", "Britain declares war on Germany"],
]);

concept("hist.ww1-origins.july-crisis", { file: "ww1-origins/july-crisis", keyPrefix: "ww1-origins.july-crisis" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date was Archduke Franz Ferdinand assassinated in Sarajevo?",
    options: [
      ["28 June 1914", "Correct: Austria-Hungary declared war on Serbia exactly a month later."],
      ["28 July 1914", "28 July is when Austria-Hungary declared war on Serbia."],
      ["4 August 1914", "4 August is when Britain declared war on Germany."],
      ["28 June 1919", "28 June 1919 is when the Treaty of Versailles was signed, five years to the day later."],
    ],
    answer: "A",
    explanation: "The assassination took place on **28 June 1914**.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who shot Archduke Franz Ferdinand?",
    options: [
      ["Gavrilo Princip", "Correct: a young Bosnian Serb armed with help from the Black Hand."],
      ["Leopold Berchtold", "Berchtold was Austria-Hungary's foreign minister in 1914."],
      ["Bethmann Hollweg", "Bethmann Hollweg was the German Chancellor who gave the blank cheque."],
      ["Alfred von Tirpitz", "Tirpitz was the German admiral behind the Navy Laws."],
    ],
    answer: "A",
    explanation: "**Gavrilo Princip** was one of a group of young Bosnian Serbs who planned the attack.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the 'blank cheque' of July 1914?",
    options: [
      ["Germany's promise to back Austria-Hungary against Serbia", "Correct: given on 5-6 July, even at the risk of war with Russia."],
      ["A loan from France to pay for Russian railways", "French loans did help Russia, but that is not the blank cheque."],
      ["Britain's promise to defend Belgian neutrality", "That was the Treaty of London of 1839."],
      ["Serbia's offer to accept every one of Austria-Hungary's demands", "Serbia did not accept all the demands."],
    ],
    answer: "A",
    explanation: "The **blank cheque** was Germany's unconditional support for whatever action Austria-Hungary took against Serbia.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which demand in the Austro-Hungarian ultimatum did Serbia refuse?",
    options: [
      ["Officials of Austria-Hungary joining the inquiry inside Serbia", "Correct: Serbia said this would violate its sovereignty."],
      ["Stopping propaganda against Austria-Hungary", "Serbia accepted this demand."],
      ["Arresting those linked to the plot", "Serbia accepted the principle of arrests and an inquiry."],
      ["Paying large reparations to Austria-Hungary for the murder of the Archduke", "The ultimatum did not demand reparations."],
    ],
    answer: "A",
    explanation: "Serbia accepted most points but would not let **Austro-Hungarian officials** take part in the investigation on Serbian soil. Austria-Hungary treated the reply as a rejection.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What finally brought Britain into the war on 4 August 1914?",
    options: [
      ["Germany's invasion of neutral Belgium", "Correct: Britain had guaranteed Belgium's neutrality in 1839."],
      ["A German attack on the British fleet", "There was no German attack on the fleet in August 1914."],
      ["Austria-Hungary's declaration of war on Britain", "Austria-Hungary and Britain went to war only on 12 August."],
      ["A treaty requiring Britain to fight for Russia", "Britain had no alliance with Russia, only the 1907 entente."],
    ],
    answer: "A",
    explanation: "The invasion of **Belgium** united a divided British Cabinet. Britain also feared German control of the Channel coast and of Europe.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did Germany declare war on France, even though the crisis began in the Balkans?",
    options: [
      ["Its war plan meant defeating France before Russia was ready", "Correct: the Schlieffen Plan treated war with Russia as war with France."],
      ["France had invaded Alsace-Lorraine in July 1914", "France had not invaded; French troops were ordered to stay back from the border."],
      ["France had declared war on Austria-Hungary before Germany acted", "France did not declare war on Austria-Hungary until mid-August."],
      ["French agents had organised the assassination", "The plotters were Bosnian Serbs helped by a Serbian society."],
    ],
    answer: "A",
    hints: ["Think about Germany's only war plan."],
    explanation: "The **Schlieffen Plan** required a quick victory over France through Belgium, so Russian mobilisation set off a war in the west as well.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement accurately describes Fritz Fischer's view of the causes of the war?",
    options: [
      ["German leaders aimed at expansion and risked a major war", "Correct: his work in the 1960s placed the main responsibility on Germany."],
      ["All the powers stumbled into a war none of them wanted", "This is closer to the 'sleepwalkers' view of Christopher Clark."],
      ["Russia's early mobilisation was the only real cause", "Fischer focused on German aims, not on Russian decisions."],
      ["Serbia's government planned the assassination to start a war", "No major historian argues this; the Serbian government did not order the murder."],
    ],
    answer: "A",
    hints: ["Fischer used German government records."],
    explanation: "**Fischer** argued that Germany's leaders had expansionist aims and deliberately accepted the risk of a general war in 1914. Other historians spread responsibility more widely.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which piece of evidence could be used to argue that Russia shared responsibility for the war?",
    options: [
      ["It ordered general mobilisation on 30 July", "Correct: this triggered Germany's war plan before Germany had mobilised."],
      ["It was allied with France from 1894", "An alliance alone does not show responsibility for the war."],
      ["It had been defeated by Japan in 1905", "This explains Russian weakness, not responsibility."],
      ["It made a separate peace with Germany in March 1918", "This happened long after the war began."],
    ],
    answer: "A",
    hints: ["Look for a Russian decision taken during the crisis itself."],
    explanation: "Some historians argue that Russia's early **general mobilisation** turned a Balkan war into a European one; others reply that Russia was responding to Austria-Hungary's attack on Serbia.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Austria-Hungary declared war on Serbia on 28 July 1914.",
    answer: true,
    explanation: "True. It declared war exactly one month after the assassination.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Historians agree that the Serbian government ordered the assassination of Franz Ferdinand.",
    answer: false,
    explanation: "False. There is no evidence that the Serbian government ordered it. The plotters were helped by the Black Hand, a secret society with links to Serbian military intelligence.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each country with its decision in the July Crisis.",
    pairs: [
      ["Germany", "Promised unconditional support to its ally on 5-6 July"],
      ["Austria-Hungary", "Sent an ultimatum with a 48-hour deadline"],
      ["Russia", "Ordered general mobilisation on 30 July"],
      ["Britain", "Sent an ultimatum over Belgium that expired on 4 August"],
    ],
    explanation: "Germany gave the blank cheque; Austria-Hungary sent the ultimatum to Serbia; Russia mobilised; Britain demanded that Germany respect Belgian neutrality.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events of 1914 in chronological order.",
    pairs: [order.events[2][1], order.events[3][1], order.events[0][1], order.events[1][1]],
    right: POS,
    rightIndex: [2, 3, 0, 1],
    hints: ["Austria-Hungary would not act until it knew Germany's position."],
    explanation: "Blank cheque 5-6 July; ultimatum 23 July; Russian mobilisation 30 July; Britain at war 4 August.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Britain had guaranteed the neutrality of {{blank:a}} in the Treaty of London of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Belgium"], choices: ["Belgium", "Serbia", "Switzerland", "Luxembourg"] },
      { id: "b", accepted: ["1839"], choices: ["1839", "1871", "1904", "1913"] },
    ],
    explanation: "The **1839** Treaty of London guaranteed **Belgium**'s neutrality. The other Treaty of London, of 1913, ended the First Balkan War.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the secret Serbian nationalist society that helped arm the Sarajevo assassins.",
    accepted: ["Black Hand", "the Black Hand", "Unification or Death", "Union or Death"],
    wrong: ["Young Turks"],
    explanation: "The **Black Hand** (officially 'Unification or Death') was linked to officers in Serbian military intelligence.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the events of 28 June 1914 in Sarajevo.",
    points: [
      "Archduke Franz Ferdinand, heir to the Austro-Hungarian throne, visited Sarajevo with his wife.",
      "A bomb thrown at his car earlier in the day failed to kill him.",
      "Later his car took a wrong turn / stopped near one of the plotters.",
      "Gavrilo Princip, a Bosnian Serb, shot and killed the Archduke and his wife Sophie.",
    ],
    modelAnswer: "Franz Ferdinand, heir to the throne of Austria-Hungary, visited Sarajevo, the capital of Bosnia, with his wife Sophie. In the morning a bomb thrown at their car missed them. Later their car took a wrong turn and stopped near Gavrilo Princip, a young Bosnian Serb, who shot both of them dead.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain how the assassination of Franz Ferdinand led to a general European war.",
    points: [
      "Identifies Austria-Hungary's decision to use the murder against Serbia, with the blank cheque.",
      "Explains that German support encouraged Austria-Hungary to send an ultimatum designed to be rejected and declare war (28 July).",
      "Identifies Russian mobilisation in support of Serbia.",
      "Explains that Russia would not be humiliated again (as in 1909), so it ordered general mobilisation (30 July).",
      "Identifies the Schlieffen Plan / the invasion of Belgium.",
      "Explains that Germany declared war on Russia and France and invaded Belgium, which brought Britain in (4 August).",
    ],
    hints: ["Follow the chain: Austria-Hungary, Germany, Russia, France, Belgium, Britain."],
    modelAnswer: "Austria-Hungary blamed Serbia for the murder and, once Germany had given the blank cheque on 5-6 July, sent Serbia an ultimatum it expected to be rejected, declaring war on 28 July. Russia, Serbia's protector, had been humiliated in the Bosnian crisis and would not back down again, so it ordered general mobilisation on 30 July. Germany's Schlieffen Plan required it to defeat France before Russia was ready, so Germany declared war on Russia and France and invaded Belgium. Britain had guaranteed Belgian neutrality and feared German domination, so it declared war on 4 August.",
    explanation: "Two marks for each developed link in the chain.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why Britain decided to go to war in August 1914.",
    points: [
      "Identifies the invasion of Belgium.",
      "Explains that Britain had guaranteed Belgian neutrality in 1839 / German control of the Channel coast threatened Britain.",
      "Identifies the balance of power / ententes.",
      "Explains that a German victory over France and Russia would leave Germany dominant in Europe and isolate Britain.",
    ],
    hints: ["Think about treaty obligations and Britain's own security."],
    modelAnswer: "Germany invaded Belgium on 4 August. Britain had guaranteed Belgian neutrality in 1839, and German control of the Belgian coast opposite Britain was a direct threat. Britain also feared that if Germany defeated France and Russia it would dominate Europe, leaving Britain isolated and without friends, so the ententes and the balance of power mattered too.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "an article in a fictional Austrian newspaper, 24 July 1914", "The murder at Sarajevo was planned in Belgrade. For years Serbia has preached hatred of our Monarchy and armed the enemies of our peace. Our demands are just and moderate. If Serbia refuses them, the sword must decide. No honest nation in Europe will blame us for defending ourselves.")}\n\n${source("Source B", "a diary entry by a fictional British journalist working in Berlin, 1 August 1914", "Crowds outside the palace today sang patriotic songs when the news came that Russia would not stop mobilising. Officers say the army must move at once or lose the advantage. Nobody here talks of Serbia any more. Everyone talks of Russia and France.")}`,
    hints: ["In (c), compare who wrote each source, when and why."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What can you learn from Source A about Austro-Hungarian attitudes to Serbia in July 1914?", points: [
        "Serbia was blamed for the murder / for stirring up hatred.",
        "Austria-Hungary was ready to go to war if its demands were refused.",
      ], explanation: "Two inferences supported from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "How does Source B help to explain why a Balkan crisis became a European war?", points: [
        "The focus moved from Serbia to Russia and France.",
        "Russian mobilisation was the trigger for German action.",
        "Officers' pressure to move at once reflects the Schlieffen Plan / timetables.",
        "Own knowledge: Germany declared war on Russia that day (1 August).",
      ], explanation: "Use of the source with own knowledge." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How reliable are Sources A and B as evidence about the July Crisis? Use the sources and your own knowledge.", points: [
        "A: an Austrian newspaper written the day after the ultimatum; purpose to justify war to readers; one-sided.",
        "A: the claim that the murder was planned in Belgrade by Serbia is not supported by evidence that the Serbian government ordered it; the demands were not 'moderate'.",
        "A is reliable as evidence of the mood and arguments in Austria-Hungary.",
        "B: a foreign journalist's private diary, written at the time, with no need to persuade; likely honest about what he saw.",
        "B: matches own knowledge of German mobilisation pressures; but limited to what one observer saw in Berlin.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source A comes from an Austrian newspaper written the day after the ultimatum, and its purpose was to persuade readers that war with Serbia was justified. Its claim that the murder was planned by Serbia goes beyond the evidence, since the Serbian government did not order it, and the ultimatum was designed to be rejected rather than being moderate. It is unreliable about events but reliable as evidence of Austro-Hungarian attitudes. Source B is a private diary written at the time by a foreign journalist with no reason to persuade anyone. What it describes, the pressure from officers to move at once after Russian mobilisation, matches my knowledge that Germany declared war on Russia that day. However, it records only one observer's impressions in Berlin. Source B is therefore the more reliable account of events, while Source A is useful for showing attitudes.", explanation: "Provenance and content checked against own knowledge are needed for the top level." }),
    ],
    explanation: "Practice source-based question (12 marks). Both sources are invented for the question.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), consider Austria-Hungary, Russia and Serbia as well as Germany."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Give two terms of the Austro-Hungarian ultimatum to Serbia of 23 July 1914.", points: [
        "Suppress anti-Austrian propaganda / nationalist groups.",
        "Allow Austro-Hungarian officials to take part in the inquiry in Serbia / arrest those involved / reply within 48 hours.",
      ], explanation: "One mark per term." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "\"Germany was mainly responsible for the outbreak of war in 1914.\" How far do you agree?", points: [
        ["Germany: the blank cheque allowed Austria-Hungary to act.", 2],
        ["Germany: the Schlieffen Plan, declarations of war on Russia and France, invasion of Belgium; Fischer's view.", 2],
        ["Austria-Hungary: chose war, ultimatum designed to be rejected.", 2],
        ["Russia: early general mobilisation; Serbia: tolerated the Black Hand.", 2],
        ["Long-term factors and shared responsibility (alliances, arms race; Clark's view).", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "Germany bears heavy responsibility. Its blank cheque of 5-6 July allowed Austria-Hungary to take a hard line against Serbia, knowing that Russia might intervene. Its Schlieffen Plan meant that war with Russia automatically became war with France, and Germany declared war on both and invaded neutral Belgium, bringing in Britain. The historian Fritz Fischer argued that Germany's leaders were willing to risk a major war to expand German power.\n\nHowever, other powers made crucial decisions. Austria-Hungary chose to use the murder to crush Serbia and sent an ultimatum it expected to be rejected. Russia ordered general mobilisation on 30 July, before Germany, which helped set the military plans in motion. Serbia had allowed the Black Hand to operate. Long-term factors such as the alliances and the arms race involved all the powers, which is why historians such as Christopher Clark argue that responsibility was shared.\n\nOverall I agree to a large extent: Germany's decisions did most to turn a Balkan quarrel into a European war, but Austria-Hungary and Russia also made choices that made war more likely, so Germany was mainly, but not solely, responsible.", explanation: "Both sides and a supported judgement reach the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("DEFINITION", "Ultimatum", "A final set of demands with a time limit, backed by a threat of war if refused.");
  b.card("DEFINITION", "Blank cheque", "Germany's promise (5-6 July 1914) to support Austria-Hungary whatever it did against Serbia.");
  b.card("FACT", "When and where was Franz Ferdinand assassinated?", "28 June 1914, in Sarajevo (Bosnia), by Gavrilo Princip.");
  b.card("FACT", "When did Austria-Hungary send its ultimatum to Serbia?", "23 July 1914, with a 48-hour deadline.");
  b.card("FACT", "When did Austria-Hungary declare war on Serbia?", "28 July 1914.");
  b.card("FACT", "When did Russia order general mobilisation?", "30 July 1914.");
  b.card("FACT", "When did Britain declare war on Germany, and why?", "4 August 1914, after Germany invaded neutral Belgium.");
  b.card("CONCEPT", "What did Fritz Fischer argue about 1914?", "That Germany's leaders had expansionist aims and deliberately risked a major war, so Germany bore the main responsibility.");
  b.card("CONCEPT", "What is the 'shared responsibility' view of 1914?", "That several powers (Austria-Hungary, Russia, Germany, Serbia, France, Britain) made decisions that together led to war, as Christopher Clark argues.");
});
