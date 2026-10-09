// Slice W3b: a world war: empire troops, Africa, Japan and the Arab Revolt (Cambridge Depth study A, KQ2).
import { concept, P, source, levels, timeline } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];
const order = timeline([
  ["November 1914", "Japanese and British forces capture Tsingtao"],
  ["July 1915", "German South West Africa surrenders"],
  ["April 1917", "Canadian troops capture Vimy Ridge"],
  ["November 1918", "Lettow-Vorbeck surrenders at Abercorn"],
]);

concept("hist.ww1.world-war", { file: "ww1/world-war", keyPrefix: "ww1.world-war" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who commanded the German forces in East Africa throughout the First World War?",
    options: [
      ["Paul von Lettow-Vorbeck", "Correct: he held out until after the armistice."],
      ["Louis Botha", "Botha led the South African conquest of German South West Africa."],
      ["Jan Smuts", "Smuts commanded the British Empire forces in East Africa in 1916."],
      ["General Erich Ludendorff", "Ludendorff was a German commander in Europe."],
    ],
    answer: "A",
    explanation: "**Lettow-Vorbeck** led a mobile campaign with mostly African askari and surrendered on 25 November 1918.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which German base in China did Japan capture in November 1914?",
    options: [
      ["Tsingtao", "Correct: Japanese forces, with a small British contingent, besieged and took it."],
      ["Hong Kong", "Hong Kong was a British colony."],
      ["Shanghai", "Shanghai was an international port, not a German base."],
      ["Port Arthur", "Port Arthur had been taken by Japan from Russia in 1905."],
    ],
    answer: "A",
    explanation: "The siege of **Tsingtao** (Qingdao) ended German power in China. Japan kept Germany's rights in Shandong at Versailles.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why were Indian troops so important on the Western Front in late 1914?",
    options: [
      ["They helped hold the line when the BEF was being destroyed", "Correct: they arrived during the fighting around Ypres."],
      ["They captured Vimy Ridge in 1917", "Vimy Ridge was captured by the Canadian Corps."],
      ["They were the first troops to use tanks", "Tanks were first used by the British army in September 1916."],
      ["They replaced the whole French army at Verdun", "Indian infantry had left France before Verdun began."],
    ],
    answer: "A",
    explanation: "Indian divisions arrived in October 1914 and helped hold the line at **Ypres** when Britain had almost no other trained reserves.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did the armies in East Africa depend so heavily on African carriers?",
    options: [
      ["There were few roads or railways and tsetse fly killed animals", "Correct: supplies had to be carried on foot."],
      ["Europeans were forbidden to carry supplies by law", "No such law existed."],
      ["Lorries were banned in the colony by treaty", "No treaty banned motor transport; there were simply few roads."],
      ["African carriers were paid far more than the European soldiers they served", "Carriers were poorly paid and many were forced to serve."],
    ],
    answer: "A",
    explanation: "Without roads, railways or pack animals that could survive the **tsetse fly**, armies relied on hundreds of thousands of carriers, very many of whom died.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Who led the Arab Revolt that began in June 1916?",
    options: [
      ["Sharif Hussein of Mecca and his sons", "Correct: Faisal became its best-known field commander."],
      ["Mustafa Kemal, the Ottoman commander", "Mustafa Kemal was an Ottoman commander, for example at Gallipoli."],
      ["General Allenby of the British army", "Allenby commanded the British army in Palestine, not the Arab forces."],
      ["The Sultan of Egypt", "Egypt was under British control and did not lead the revolt."],
    ],
    answer: "A",
    explanation: "**Sharif Hussein** rose against Ottoman rule after British promises of support for Arab independence.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why is the Canadian victory at Vimy Ridge (April 1917) seen as significant?",
    options: [
      ["All four divisions took a ridge earlier attacks had failed to win", "Correct: careful planning and a creeping barrage made it a model attack."],
      ["It ended the war on the Western Front", "The war continued for another nineteen months."],
      ["It was the first battle in which gas was used", "Gas was first used on a large scale at Ypres in 1915."],
      ["It was the battle that persuaded the USA to declare war on Germany", "The USA declared war on 6 April 1917, before Vimy began on 9 April."],
    ],
    answer: "A",
    hints: ["Think about what had happened there before, and how the Canadians prepared."],
    explanation: "Vimy showed what thorough preparation could achieve and became a symbol of Canadian national identity.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement best describes Lettow-Vorbeck's strategy in East Africa?",
    options: [
      ["To tie down as many enemy troops as possible, far from Europe", "Correct: he could not win in Africa but could divert Allied resources."],
      ["To invade South Africa and cut Britain's sea route round the Cape", "His small force never threatened South Africa."],
      ["To win one decisive battle and then make peace", "He avoided decisive battles and kept moving."],
      ["To defend Dar es Salaam to the last man", "He gave up towns and fought a mobile campaign."],
    ],
    answer: "A",
    hints: ["A small force cannot win a big war in Africa. What could it still achieve?"],
    explanation: "By keeping his force alive and mobile, Lettow-Vorbeck forced the British Empire to commit large numbers of troops and carriers to East Africa until 1918.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which evidence best supports the view that the Arab Revolt was LESS important than often claimed?",
    options: [
      ["Allenby's regular army inflicted the main defeats on the Ottomans", "Correct: the revolt's role was mainly in support."],
      ["Arab forces led by Faisal captured the port of Aqaba in July 1917", "This supports the revolt's importance."],
      ["The revolt tied down thousands of Ottoman troops", "This supports the revolt's importance."],
      ["Arab forces raided the Hejaz railway many times", "This supports the revolt's importance."],
    ],
    answer: "A",
    hints: ["Which army fought the decisive battles in Palestine and Syria?"],
    explanation: "Allenby's army, including many Indian troops, won the main battles such as Megiddo in 1918; the revolt supported it by raiding and tying down Ottoman forces.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "German South West Africa surrendered to South African forces in July 1915.",
    answer: true,
    explanation: "True. South Africa, under Botha and Smuts, conquered the colony after first putting down an Afrikaner rebellion.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Lettow-Vorbeck surrendered in East Africa several months before the armistice in Europe.",
    answer: false,
    explanation: "False. He surrendered at Abercorn, Northern Rhodesia, on 25 November 1918, two weeks AFTER the armistice of 11 November.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each place with the event that happened there.",
    pairs: [
      ["Tanga", "An Indian landing force was defeated (November 1914)"],
      ["Vimy Ridge", "Canadian divisions captured a key ridge (April 1917)"],
      ["Aqaba", "Arab forces captured a port (July 1917)"],
      ["Abercorn", "German forces in Africa surrendered (November 1918)"],
    ],
    explanation: "These four places show the war in East Africa, on the Western Front and in the Middle East.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [order.events[2][1], order.events[0][1], order.events[3][1], order.events[1][1]],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["The war in Asia began early; the East African campaign was the last to end."],
    explanation: "Tsingtao November 1914; South West Africa July 1915; Vimy April 1917; Abercorn November 1918.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The African regiment raised in Southern Rhodesia in 1916 to fight in East Africa was the Rhodesia {{blank:a}} Regiment. The first Indian soldier to win the Victoria Cross, at Ypres in 1914, was {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Native"], choices: ["Native", "African", "Pioneer", "Field"] },
      { id: "b", accepted: ["Khudadad Khan"], choices: ["Khudadad Khan", "Sharif Hussein", "Arthur Currie", "Mustafa Kemal"] },
    ],
    explanation: "The **Rhodesia Native Regiment** fought in East Africa; **Khudadad Khan** won the VC at Ypres in October 1914.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe Japan's contribution to the Allied war effort.",
    points: [
      "Declared war on Germany in August 1914 (as Britain's ally).",
      "Captured Tsingtao (November 1914).",
      "Occupied Germany's North Pacific islands.",
      "Navy escorted troop convoys / hunted German cruisers / destroyers escorted ships in the Mediterranean from 1917.",
    ],
    modelAnswer: "Japan declared war on Germany in August 1914 under its alliance with Britain. It captured the German base at Tsingtao in November 1914 and occupied Germany's islands in the North Pacific. Its navy hunted German cruisers, escorted Australian and New Zealand troop convoys, and from 1917 its destroyers based at Malta escorted Allied ships in the Mediterranean.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the contribution of Indian and South African troops to the war in Africa.",
    points: [
      "South African forces conquered German South West Africa (July 1915).",
      "An Indian expeditionary force landed at Tanga (November 1914) and was defeated.",
      "Smuts led South African, Indian and other troops in East Africa from 1916, taking most of the colony.",
      "Indian and South African troops suffered heavily from disease in East Africa.",
    ],
    hints: ["Cover both South West Africa and East Africa."],
    modelAnswer: "South African troops under Botha conquered German South West Africa, which surrendered in July 1915. In East Africa an Indian force tried to land at Tanga in November 1914 and was badly defeated. From 1916 Smuts led a large army of South African, Indian, British and African troops that drove the Germans out of most of the colony, but very many of these soldiers fell sick with malaria and other diseases.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why the East African campaign lasted so long.",
    points: [
      "Identifies Lettow-Vorbeck's strategy and leadership.",
      "Explains that he avoided decisive battles and kept moving, so he could not be trapped.",
      "Identifies geography and disease.",
      "Explains that vast distances, few roads and diseases such as malaria slowed and weakened the British Empire forces.",
      "Identifies supply problems / dependence on carriers.",
      "Explains that armies could move only as fast as carriers could supply them; Lettow-Vorbeck lived off captured supplies.",
    ],
    hints: ["Think about the commander, the land and the supplies."],
    modelAnswer: "Lettow-Vorbeck deliberately avoided decisive battles, giving up towns and moving his small force of askari across huge areas, even into Portuguese East Africa and Northern Rhodesia, so he could never be trapped. The geography helped him: distances were vast, there were few roads, and malaria and other diseases struck down many British Empire soldiers. Above all, supplies had to be carried by Africans on foot because the tsetse fly killed animals, so the British advance was slow, while Lettow-Vorbeck often lived off captured supplies.",
    explanation: "Two marks for each developed explanation.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the source and answer the questions.\n\n${source("Source A", "the memories of a fictional man from Nyasaland who served as a carrier for the British army in East Africa, recorded by a local teacher in the 1960s", "The chief was told to send young men, and those who ran away were brought back. We carried boxes of bullets and food for the soldiers, more than a man should carry, through the bush and the rivers. Many fell sick with fever. When a man could not stand he was left. We were promised money; some of us were paid, many were not. Of the men from my village who went, fewer than half came home.")}`,
    hints: ["In (c), think about who recorded the memory, when, and what other evidence exists."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What can you learn from Source A about how carriers were recruited and treated?", points: [
        "Recruited by force / through chiefs; runaways were brought back.",
        "Heavy loads, disease, many died / some not paid.",
      ], explanation: "Two points supported from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "Use your own knowledge to explain why so many carriers died in the East African campaign.", points: [
        "Disease (malaria, dysentery) in difficult country.",
        "Poor food and medical care for carriers.",
        "Exhausting loads over huge distances in a long, mobile campaign.",
        "Armies needed huge numbers because there were few roads and animals died of tsetse.",
      ], explanation: "Reasons from own knowledge." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How useful is Source A to a historian studying the human cost of the war in Africa?", points: [
        "Useful: the voice of an African carrier, rarely found in official records.",
        "Useful: content (forced recruitment, disease, abandonment, unpaid wages) matches own knowledge of high carrier deaths.",
        "Limit: recorded about fifty years later; memory may have changed.",
        "Limit: recorded by a teacher in the 1960s, at the time of independence movements; questions and selection may shape it.",
        "Limit: one village; cannot give overall numbers (estimates of more than 100,000 deaths).",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source A is useful because it gives the experience of an African carrier, a voice that hardly appears in army records. What it describes, forced recruitment through chiefs, heavy loads, fever, men left behind and unpaid wages, matches what historians know about the campaign, in which estimates suggest more than 100,000 carriers died. However, it was recorded about fifty years after the events, so the man's memory may have changed, and it was written down by a teacher in the 1960s, when attitudes to colonial rule were changing, which may have influenced what was asked and recorded. It describes only one village and cannot show the overall scale. It is very useful for the human experience, but should be checked against other evidence such as army statistics and missionary reports.", explanation: "Provenance, content and own knowledge are needed for the top level." }),
    ],
    explanation: "Practice source-based question (12 marks). The source is invented for the question.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), set the Western Front against Africa, Asia and the Middle East."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the part played by Canadian troops on the Western Front.", points: [
        "Canada raised over 600,000 men.",
        "Held their ground against the first gas attack at Second Ypres (April 1915).",
        "Captured Vimy Ridge (9-12 April 1917) with all four divisions together.",
        "Captured Passchendaele (1917) / led attacks in the Hundred Days under Currie (1918).",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "\"The First World War was a European war, not a world war.\" How far do you agree?", points: [
        ["Agree: the decisive fighting and most casualties were in Europe, on the Western and Eastern Fronts.", 2],
        ["Agree: the war ended because Germany was defeated in Europe; other campaigns were sideshows.", 2],
        ["Disagree: empire troops from India, Canada and elsewhere fought in Europe and beyond.", 2],
        ["Disagree: campaigns in Africa (South West, East Africa, carriers) and the Middle East (Gallipoli, Arab Revolt, Palestine).", 2],
        ["Disagree: Japan in Asia and the Pacific; the USA from 1917; the war at sea was global.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "There is a case that it was mainly a European war. Most of the soldiers who fought and died were Europeans on the Western and Eastern Fronts, and the war was decided when Germany was defeated in France in 1918. Campaigns in Africa or the Middle East did not decide the outcome.\n\nHowever, the war involved the whole world. Over a million Indians served, and Indian troops helped hold Ypres in 1914; Canada raised over 600,000 men who took Vimy Ridge. In Africa every German colony was attacked, South Africa conquered South West Africa, and in East Africa the campaign lasted until November 1918, with very heavy deaths among African carriers. Japan captured Tsingtao and the German Pacific islands and escorted Allied ships, the Arab Revolt and Allenby's campaign destroyed Ottoman rule in the Middle East, and the USA entered in 1917.\n\nI disagree with the statement. The war was decided in Europe, but it drew in soldiers, labourers and civilians from every continent and changed the map of Africa, Asia and the Middle East, so it was truly a world war.", explanation: "Both sides and a supported judgement reach the top level." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("DEFINITION", "Askari", "African soldiers in the colonial armies of East Africa, especially in Lettow-Vorbeck's German force.");
  b.card("DEFINITION", "Dominion", "A self-governing country of the British Empire, such as Canada or South Africa.");
  b.card("FACT", "When did German South West Africa surrender?", "July 1915, to South African forces.");
  b.card("FACT", "When and where did Lettow-Vorbeck surrender?", "25 November 1918, at Abercorn in Northern Rhodesia.");
  b.card("FACT", "When did the Canadians capture Vimy Ridge?", "9-12 April 1917.");
  b.card("FACT", "When did Japan declare war on Germany, and what did it capture?", "23 August 1914; it took Tsingtao (November 1914) and Germany's North Pacific islands.");
  b.card("FACT", "When did the Arab Revolt begin, and who led it?", "June 1916; Sharif Hussein of Mecca and his sons, especially Faisal.");
  b.card("CONCEPT", "Why did so many carriers die in East Africa?", "Disease, poor food and care, heavy loads over vast distances in a long campaign with few roads.");
  b.card("CONCEPT", "Why were Indian troops important in 1914?", "They helped hold the line around Ypres when Britain's small regular army was being destroyed.");
});
