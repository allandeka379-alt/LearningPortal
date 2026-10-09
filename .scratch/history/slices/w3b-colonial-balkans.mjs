// Slice W3b: colonial rivalries and the Balkans, 1890-1914 (both boards: ZIMSEC 12.1, Cambridge Option A KQ6).
import { concept, P, source, levels, timeline } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];
const order = timeline([
  ["1898", "The Fashoda crisis"],
  ["1905", "The Kaiser's visit to Tangier"],
  ["1908", "Austria-Hungary annexes Bosnia-Herzegovina"],
  ["1912", "The First Balkan War begins"],
]);

concept("hist.ww1-origins.colonial-balkans", { file: "ww1-origins/colonial-balkans", keyPrefix: "ww1-origins.colonial-balkans" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which territory did Austria-Hungary annex in October 1908?",
    options: [
      ["Bosnia-Herzegovina", "Correct: it had been occupied by Austria-Hungary since 1878."],
      ["Serbia", "Serbia stayed independent; it was invaded by Austria-Hungary only in 1914."],
      ["Albania", "Albania was created as a new independent state in 1912-13."],
      ["Macedonia and Kosovo", "These were fought over in the Balkan Wars of 1912-13 and gained mainly by Serbia, Greece and Montenegro."],
    ],
    answer: "A",
    explanation: "The annexation of **Bosnia-Herzegovina** in 1908 angered Serbia and humiliated Russia, which backed down in 1909.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which country did the crises of 1905-06 and 1911 between France and Germany take place?",
    options: [
      ["Morocco", "Correct: Germany challenged French influence there in both crises."],
      ["Egypt", "Egypt was under British control, recognised by France in 1904."],
      ["Sudan", "Sudan was the scene of the Fashoda crisis between Britain and France in 1898."],
      ["Algeria", "Algeria had been a French colony since the nineteenth century and was not disputed."],
    ],
    answer: "A",
    explanation: "Both **Moroccan crises** (Tangier 1905-06, Agadir 1911) were German challenges to France that strengthened the Anglo-French entente.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the main result of the Algeciras Conference of 1906?",
    options: [
      ["Germany was isolated and Britain backed France", "Correct: only Austria-Hungary supported Germany."],
      ["Germany was given a protectorate over all of Morocco", "Germany gained no protectorate; French influence was confirmed."],
      ["Britain and Germany signed a naval agreement", "No naval agreement was made; talks in 1912 failed."],
      ["Morocco was divided between Spain and Italy", "Italy was not given Morocco; it seized Libya from the Ottomans in 1911-12."],
    ],
    answer: "A",
    explanation: "At **Algeciras** Germany's attempt to split Britain from France failed: the two drew closer and began military talks.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did Austria-Hungary see Serbia as a serious threat before 1914?",
    options: [
      ["Serbian nationalism could encourage its Slavs to break away", "Correct: Austria-Hungary was an empire of many nationalities."],
      ["Serbia had a larger army than Austria-Hungary", "Serbia's army was much smaller than Austria-Hungary's."],
      ["Serbia was a member of the Triple Alliance", "Serbia was not in the Triple Alliance; it was close to Russia."],
      ["Serbia had colonies in Africa that rivalled Austria-Hungary's own", "Neither Serbia nor Austria-Hungary had African colonies."],
    ],
    answer: "A",
    explanation: "Many South Slavs lived inside Austria-Hungary. A strong, nationalist Serbia threatened to pull them away and break up the multinational empire.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did Russia back down in the Bosnian crisis in March 1909?",
    options: [
      ["It was not ready for war after its defeat by Japan", "Correct: Germany backed Austria-Hungary firmly and Russia was still rebuilding its army."],
      ["Serbia asked Russia to accept the annexation", "Serbia was furious about the annexation."],
      ["Britain threatened to join Austria-Hungary", "Britain was on friendly terms with Russia after 1907."],
      ["Russia had secretly agreed to it in the Treaty of London", "The Treaty of London of 1913 ended the First Balkan War."],
    ],
    answer: "A",
    explanation: "Weakened by the Russo-Japanese War (1904-05) and the 1905 revolution, Russia could not risk war against Austria-Hungary and Germany together, and felt humiliated.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did Austria-Hungary insist on creating an independent Albania in 1912-13?",
    options: [
      ["To stop Serbia gaining a coastline on the Adriatic Sea", "Correct: Austria-Hungary wanted to keep Serbia weak and landlocked."],
      ["To give Russia a naval base in the Mediterranean", "Austria-Hungary wanted to reduce Russian influence, not increase it."],
      ["To reward Bulgaria for its victory in the Second Balkan War", "Bulgaria lost the Second Balkan War."],
      ["To keep the Ottoman Empire in control of the Straits", "Albania's creation had nothing to do with the Straits."],
    ],
    answer: "A",
    hints: ["Look at where Albania lies in relation to Serbia."],
    explanation: "Albania blocked Serbia from the sea. Serbia, doubled in size, still resented Austria-Hungary, and Vienna's leaders increasingly believed Serbia must be crushed.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement best explains why the Balkan problems were harder to solve than the colonial crises?",
    options: [
      ["They touched the survival and pride of Great Powers", "Correct: Austria-Hungary feared break-up and Russia would not be humiliated twice."],
      ["The Balkans contained no Great Power interests at all", "Russia and Austria-Hungary had vital interests there."],
      ["No conference was ever held about the Balkans", "A conference in London in 1912-13 helped settle the First Balkan War."],
      ["Germany had no ally in south-eastern Europe", "Germany's ally Austria-Hungary was the leading power in the region."],
    ],
    answer: "A",
    hints: ["Colonial quarrels could be traded away. What could not be traded in the Balkans?"],
    explanation: "Colonial quarrels could be settled by swapping territory. Balkan quarrels touched Austria-Hungary's survival and Russia's prestige, and each crisis left both sides less willing to compromise.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which piece of evidence most weakens the claim that colonial rivalry made war unavoidable by 1914?",
    options: [
      ["Britain and Germany reached agreements in 1913-14", "Correct: colonial disputes were being settled just before the war."],
      ["Germany sent a gunboat to Agadir in 1911", "This shows colonial tension, which supports the claim."],
      ["France and Britain clashed over Fashoda on the Nile in 1898", "This shows colonial tension, which supports the claim."],
      ["Germany wanted a 'place in the sun'", "This shows German resentment, which supports the claim."],
    ],
    answer: "A",
    hints: ["Which option shows co-operation rather than conflict?"],
    explanation: "Anglo-German agreements over the Baghdad railway and Portugal's colonies show that colonial rivalry could be managed. The crisis that started the war was Balkan.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In the Fashoda crisis of 1898, France backed down and withdrew from the upper Nile.",
    answer: true,
    explanation: "True. France withdrew, and six years later it settled its disputes with Britain in the Entente Cordiale.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In the Second Balkan War (1913) Serbia and Bulgaria fought together against the Ottoman Empire.",
    answer: false,
    feedbackFalse: "Correct: they fought together in the FIRST Balkan War.",
    explanation: "False. In the Second Balkan War Bulgaria attacked its former allies Serbia and Greece and was defeated. They had fought together against the Ottomans in the First Balkan War (1912-13).",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each crisis with the powers most directly in dispute.",
    pairs: [
      ["Fashoda, 1898", "Britain and France"],
      ["Tangier, 1905", "Germany and France"],
      ["Bosnian annexation, 1908", "Austria-Hungary and Serbia (backed by Russia)"],
      ["Second Balkan War, 1913", "Bulgaria against Serbia and Greece"],
    ],
    explanation: "Colonial crises mainly set France against Britain or Germany; Balkan crises set Austria-Hungary against Serbia and Russia, or the Balkan states against each other.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [order.events[3][1], order.events[1][1], order.events[0][1], order.events[2][1]],
    right: POS,
    rightIndex: [3, 1, 0, 2],
    hints: ["The Moroccan visit came three years before the Bosnian annexation."],
    explanation: "Fashoda 1898; Tangier 1905; Bosnian annexation 1908; First Balkan War 1912.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The empire in south-eastern Europe known as the 'sick man of Europe' was the {{blank:a}} Empire. In 1911 Germany sent a gunboat to the Moroccan port of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Ottoman"], choices: ["Ottoman", "Russian", "Austro-Hungarian", "German"] },
      { id: "b", accepted: ["Agadir"], choices: ["Agadir", "Tangier", "Fashoda", "Algeciras"] },
    ],
    explanation: "The **Ottoman** Empire was retreating from the Balkans. The gunboat *Panther* was sent to **Agadir** in 1911; Tangier was the Kaiser's visit of 1905.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Balkan state that almost doubled in size as a result of the Balkan Wars and was seen by Austria-Hungary as its main enemy in the region.",
    accepted: ["Serbia", "the Kingdom of Serbia"],
    wrong: ["Bulgaria"],
    explanation: "**Serbia** gained much of Macedonia and Kosovo. Its growth alarmed Austria-Hungary.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the Bosnian crisis of 1908-09.",
    points: [
      "Austria-Hungary annexed Bosnia-Herzegovina (October 1908), which it had occupied since 1878.",
      "Serbia was angry because many Bosnians were Serbs / Serbia wanted Bosnia.",
      "Russia protested in support of Serbia.",
      "Germany backed Austria-Hungary and Russia backed down (March 1909), feeling humiliated.",
    ],
    modelAnswer: "In October 1908 Austria-Hungary annexed Bosnia-Herzegovina, which it had run since 1878. Serbia was furious because many Bosnians were Serbs and Serbia hoped to gain the province. Russia protested on Serbia's behalf, but when Germany gave Austria-Hungary firm support, Russia, still weak after its war with Japan, backed down in March 1909 and felt humiliated.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why the Moroccan crises strengthened the Entente Cordiale.",
    points: [
      "Identifies Germany's attempt to split Britain from France (Tangier 1905).",
      "Explains that at Algeciras Britain backed France and the two began secret military talks.",
      "Identifies the Agadir crisis of 1911.",
      "Explains that Britain again warned Germany and in 1912 Britain and France agreed to divide naval responsibilities.",
    ],
    hints: ["What did Germany hope to achieve, and what actually happened?"],
    modelAnswer: "In 1905 Germany challenged French influence in Morocco, hoping to show that Britain would not support France. At the Algeciras Conference in 1906 Britain backed France, Germany was isolated, and British and French generals began secret talks. In 1911 Germany sent a gunboat to Agadir, but Britain again stood by France, and in 1912 the two agreed that the French fleet would guard the Mediterranean and the British fleet the North Sea, tying them closer together.",
    explanation: "Two marks per developed explanation.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why problems in the Balkans were so hard for the Great Powers to solve.",
    points: [
      "Identifies the decline of the Ottoman Empire.",
      "Explains that its retreat left land that several states and powers wanted to control.",
      "Identifies Serbian / Slav nationalism.",
      "Explains that it threatened multinational Austria-Hungary, which saw compromise as weakness.",
      "Identifies Great Power involvement (Russia as protector of Slavs and its interest in the Straits; Germany backing Austria-Hungary).",
      "Explains that local quarrels became tests of Great Power prestige, especially after Russia's humiliation in 1909.",
    ],
    hints: ["Think about the Ottomans, the Slavs and the Great Powers behind them."],
    modelAnswer: "The Ottoman Empire was collapsing in Europe, and the land it lost was claimed by Serbia, Bulgaria, Greece and others, so every settlement left someone resentful, as the Second Balkan War showed. Serbian nationalism aimed to unite the South Slavs, which threatened Austria-Hungary, an empire of many nationalities, so Vienna saw any concession as a danger to its survival. Finally, the Great Powers stood behind the small states: Russia backed the Slavs and wanted influence over the Straits, and Germany supported Austria-Hungary. After Russia's humiliation in 1909 neither side wanted to back down again, so local quarrels became tests of Great Power prestige.",
    explanation: "Two marks for each developed explanation.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the source and answer the questions.\n\n${source("Source A", "a cartoon of the kind published in British magazines in 1912, described in words", "Five statesmen in the uniforms of the Great Powers sit on the lid of a huge boiling pot labelled 'Balkan Troubles'. Steam and flames burst out from under the lid. One statesman glances nervously at another, who is looking the other way. The caption reads: 'Keeping the lid on — for now.'", { described: true })}`,
    hints: ["In (b), use what you know about events in 1912-13."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What is the message of the cartoon?", points: [
        "The Balkans were about to boil over into war / were very dangerous.",
        "The Great Powers were struggling to keep control and did not trust each other.",
      ], explanation: "Message supported from details of the cartoon." }),
      P.manual({ label: "(b)", marks: 4, stem: "Use your own knowledge to explain why a cartoonist might have drawn this cartoon in 1912.", points: [
        "The First Balkan War had begun (October 1912).",
        "The Ottoman retreat raised the question of who would gain its land.",
        "The Great Powers were trying to manage the crisis by a conference in London.",
        "Russia and Austria-Hungary each had interests (Serbia; blocking Serbia's access to the sea).",
      ], explanation: "Context linked to the cartoon." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How far does the cartoon help to explain why the Balkans led to a general war in 1914? Use the source and your own knowledge.", points: [
        "Helps: shows the danger and the Great Powers' involvement.",
        "Helps: hint of mistrust between the powers matches rivalry of Russia and Austria-Hungary.",
        "Limits: made in 1912; cannot show the assassination (1914) or the July Crisis.",
        "Limits: shows the powers trying to keep peace, which they did in 1912-13.",
        "Limits: British viewpoint; says nothing about alliances or war plans.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "The cartoon helps to explain the danger of the Balkans. The boiling pot shows how unstable the region was after the Ottoman retreat, and the Great Powers sitting on the lid shows that they were all involved. The nervous glances suggest mistrust, which matches my knowledge of the rivalry between Russia and Austria-Hungary. However, it was drawn in 1912, so it cannot show the assassination of 1914 or the decisions of the July Crisis, and in 1912-13 the powers did keep the lid on through the London conference. It also says nothing about the alliances or war plans that turned a Balkan war into a general one. It helps explain why the Balkans were dangerous, but only partly why war came in 1914.", explanation: "Credit use of the cartoon, its date and own knowledge." }),
    ],
    explanation: "Practice source-based question (12 marks). The cartoon is invented and described in words.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), compare Morocco with the Balkans."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the Balkan Wars of 1912-13.", points: [
        "First Balkan War: the Balkan League (Serbia, Bulgaria, Greece, Montenegro) attacked the Ottoman Empire.",
        "The Ottomans lost almost all their European land.",
        "Second Balkan War (1913): Bulgaria attacked Serbia and Greece and was defeated.",
        "Serbia almost doubled in size / Albania created to block Serbia from the sea.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "\"Colonial rivalry was more important than the Balkans in creating tension between the Great Powers before 1914.\" How far do you agree?", points: [
        ["Colonial: the Moroccan crises nearly brought war and drew Britain and France together against Germany.", 2],
        ["Colonial: German resentment at being denied a 'place in the sun'; Fashoda.", 2],
        ["Against: colonial crises were all settled; Anglo-German agreements of 1913-14.", 2],
        ["Balkans: Bosnian crisis humiliated Russia; Austria-Hungary feared Serbia.", 2],
        ["Balkans: Balkan Wars strengthened Serbia; the 1914 crisis began in the Balkans.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "Colonial rivalry did create tension. The two Moroccan crises of 1905-06 and 1911 brought France and Germany close to war, and each time Britain backed France, so the Entente grew stronger and Germany felt encircled. Germany also resented being denied its 'place in the sun', and the Fashoda crisis showed how colonial quarrels could set even Britain and France against each other.\n\nHowever, every colonial crisis was settled by negotiation. By 1913-14 Britain and Germany had even reached agreements over the Baghdad railway and Portugal's colonies. The Balkans were different. The Bosnian crisis of 1908-09 humiliated Russia, which resolved never to back down again, and the Balkan Wars doubled the size of Serbia, convincing Austria-Hungary that Serbian nationalism threatened its survival. These tensions involved the core interests and pride of the powers.\n\nI disagree with the statement. Colonial rivalry helped shape the alliances, but the Balkans created the most dangerous tension, and it was a Balkan crisis that led to war in 1914.", explanation: "Both sides and a supported judgement reach the top level." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("DEFINITION", "Pan-Slavism", "The idea that all Slav peoples belong together; Russia used it to claim to protect Balkan Slavs such as the Serbs.");
  b.card("DEFINITION", "Annexation", "Formally making another territory part of your own state, as Austria-Hungary did with Bosnia in 1908.");
  b.card("FACT", "What happened at Fashoda in 1898?", "A British-French stand-off on the upper Nile; France backed down.");
  b.card("FACT", "When were the two Moroccan crises?", "1905-06 (Tangier and the Algeciras Conference) and 1911 (the gunboat at Agadir).");
  b.card("FACT", "When did Austria-Hungary annex Bosnia-Herzegovina?", "October 1908; Russia backed down in March 1909.");
  b.card("FACT", "When were the Balkan Wars?", "1912-13 (first: Balkan League against the Ottomans) and 1913 (second: Bulgaria against its former allies).");
  b.card("CONCEPT", "Why did the Moroccan crises backfire on Germany?", "Instead of splitting Britain and France, they drew the two closer together and isolated Germany.");
  b.card("CONCEPT", "Why did Austria-Hungary fear Serbia?", "Serbian nationalism could inspire the empire's own Slavs to break away, threatening the multinational empire.");
  b.card("CONCEPT", "Why did the Bosnian crisis matter in 1914?", "Russia had been humiliated in 1909 and was determined not to back down again over Serbia.");
});
