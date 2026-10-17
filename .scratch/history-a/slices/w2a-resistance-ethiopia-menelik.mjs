// W2a: ahist.resistance.ethiopia-menelik (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.resistance.ethiopia-menelik", { file: "resistance/ethiopia-menelik", keyPrefix: "resistance.ethiopia-menelik" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date was the Battle of Adwa fought?",
    options: [
      ["1 March 1896", "Correct: Menelik's army defeated the Italians that day."],
      ["2 May 1889", "This is the date of the Treaty of Wuchale."],
      ["26 October 1896", "This is the date of the Treaty of Addis Ababa."],
      ["18 January 1871", "This is the date of the German Empire's proclamation."],
    ],
    answer: "A",
    explanation: "Adwa was fought on 1 March 1896. The treaties of Wuchale (1889) and Addis Ababa (October 1896) came before and after.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which European power did Ethiopia defeat at Adwa?",
    options: [
      ["Italy", "Correct: the Italians under General Baratieri."],
      ["Portugal", "Portugal was not Ethiopia's opponent at Adwa."],
      ["Germany", "Germany had no army at Adwa."],
      ["Belgium", "Belgium was not at war with Ethiopia."],
    ],
    answer: "A",
    explanation: "Italy, which held Eritrea and wanted to turn Ethiopia into a protectorate, was defeated at Adwa.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the dispute over Article 17 of the Treaty of Wuchale?",
    options: [
      ["The Italian text made Ethiopia use Italy for foreign relations; the Amharic text made it optional", "Correct: Italy used its text to claim a protectorate."],
      ["The Amharic text gave Italy the right to rule Ethiopia directly after 1890", "The Amharic text did no such thing."],
      ["The Italian text promised Italy would give Ethiopia modern rifles and money", "No such promise was in the Italian text."],
      ["The two texts disagreed on the border between Eritrea and Sudan", "The dispute was about foreign relations."],
    ],
    answer: "A",
    explanation: "In Amharic Menelik 'could' use Italy for dealing with other powers; in Italian he 'agreed' to. Italy claimed a protectorate and Menelik denounced the treaty in 1893.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which new capital did Menelik found?",
    options: [
      ["Addis Ababa", "Correct: founded in the mid-1880s."],
      ["Mekele, in the northern highlands", "Mekele was a town taken by Italy in 1896 before Adwa."],
      ["Massawa, on the Red Sea coast", "Massawa was an Italian-held port."],
      ["Khartoum, on the Nile", "Khartoum is in the Sudan."],
    ],
    answer: "A",
    explanation: "Menelik founded Addis Ababa ('New Flower') and made it his capital.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", daily: true,
    stem: "Which was a reason for the Ethiopian victory at Adwa?",
    options: [
      ["Menelik united the rases and mobilised a large army armed with modern rifles", "Correct: unity and weapons were central."],
      ["The Ethiopian army had far fewer men than the Italians but better artillery and horses", "The Ethiopians were the larger army."],
      ["Britain sent troops to fight alongside the Ethiopians against Italy", "Britain sent no troops."],
      ["The Italian army was already divided by a civil war at home", "There was no civil war in Italy."],
    ],
    answer: "A",
    hints: ["Think of Menelik's leadership and the army he raised."],
    explanation: "Menelik mobilised the nobles and the country, with weapons bought from Europe; Italian mistakes added to the result.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "What did the Treaty of Addis Ababa (October 1896) do?",
    options: [
      ["Italy recognised Ethiopian independence and the Treaty of Wuchale was cancelled", "Correct: Ethiopia's independence was recognised."],
      ["Ethiopia accepted an Italian protectorate in return for peace", "This is what Italy had wanted before Adwa."],
      ["Ethiopia gave Eritrea to Menelik's allies in the Sudan", "No such transfer took place."],
      ["Italy and Ethiopia agreed to share the rule of the northern highlands", "Rule was not shared."],
    ],
    answer: "A",
    hints: ["Think of what Italy had hoped for at Wuchale."],
    explanation: "Italy recognised independence and cancelled Wuchale but kept Eritrea.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best shows that Menelik's resistance combined diplomacy with arms?",
    options: [
      ["He wrote to the powers to assert independence and bought rifles from France and Russia", "Correct: both methods were used together."],
      ["He fought several battles and refused every form of contact with the European powers", "He did not refuse contact."],
      ["He relied on British troops until the final defeat of the whole Italian army", "He relied on his own army."],
      ["He signed Wuchale and then waited for the Italians to withdraw from his land peacefully", "Italy did not withdraw peacefully."],
    ],
    answer: "A",
    hints: ["Look for the answer that includes both letters and weapons."],
    explanation: "Menelik announced his borders to the powers, played them off against Italy, and bought modern weapons.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which point most limits the picture of Menelik as only a defender of African freedom?",
    options: [
      ["He expanded Ethiopian rule over the Oromo, Sidama and other peoples to the south", "Correct: Ethiopia was itself an expanding state."],
      ["He bought rifles from European governments before the war with Italy began", "Buying arms does not limit this picture."],
      ["He made Addis Ababa the capital and encouraged trade, the telegraph and the railway", "This is about modernisation."],
      ["He denounced the Treaty of Wuchale in 1893 when he discovered the difference", "This supports the defender picture."],
    ],
    answer: "A",
    hints: ["Think about the peoples in the south."],
    explanation: "Menelik's expansion cost other peoples land and autonomy, so a balanced judgement notes both resistance to Italy and expansion at others' expense.",
  });
  b.tf({
    d: 1, skill: "RECALL", stem: "Ethiopia and Liberia were the only African states not colonised in the Scramble.", answer: true,
    explanation: "Only Ethiopia and Liberia were independent after the Scramble.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, stem: "Menelik II accepted the Italian claim that Ethiopia was an Italian protectorate.", answer: false,
    explanation: "He denounced the Treaty of Wuchale in 1893 and fought Italy.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", stem: "The Italian army at Adwa was much larger than the Ethiopian army.", answer: false,
    hints: ["Historians estimate several tens of thousands on the Ethiopian side."],
    explanation: "The Italian force was about 17,000 and the Ethiopian army was several times larger.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each name to its role.",
    pairs: [
      ["Menelik II", "Emperor of Ethiopia from 1889"],
      ["Empress Taytu", "Menelik's wife and adviser who opposed Italian demands"],
      ["General Baratieri", "Italian commander defeated at Adwa"],
      ["Count Antonelli", "Italian representative at the Treaty of Wuchale"],
    ],
    explanation: "Each person had a role in the diplomacy or battle of 1889-96.",
  });
  {
    const events = [
      "The Treaty of Wuchale is signed",
      "Menelik denounces the treaty",
      "The Battle of Adwa",
      "The Treaty of Addis Ababa",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1889, 1893 and 1896 (twice)."],
      explanation: "2 May 1889; 1893; 1 March 1896; 26 October 1896.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Menelik II defeated {{blank:a}} at the Battle of {{blank:b}} in 1896.",
    blanks: [
      { id: "a", accepted: ["Italy"], choices: ["Italy", "France", "Britain", "Germany"] },
      { id: "b", accepted: ["Adwa"], choices: ["Adwa", "Omdurman", "Isandlwana", "Ulundi"] },
    ],
    explanation: "Ethiopia defeated Italy at Adwa on 1 March 1896.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the treaty of 1889 whose two versions disagreed about whether Ethiopia was an Italian protectorate.",
    accepted: ["Wuchale", "Treaty of Wuchale", "the Treaty of Wuchale", "Uccialli", "Treaty of Uccialli"],
    wrong: ["Versailles"],
    explanation: "The **Treaty of Wuchale** (also spelt Uccialli).",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how Menelik II modernised and strengthened Ethiopia.",
    points: ["He bought modern rifles and artillery from European states", "He founded Addis Ababa as a new capital", "He introduced a railway concession, telegraph and telephone", "He later set up ministries and a bank"],
    modelAnswer: "Menelik bought modern rifles and artillery from France, Russia and Italy. He founded Addis Ababa as a new capital, introduced telegraph and telephone lines and granted a railway concession from Djibouti, and later set up ministries and a bank.",
    explanation: "One mark for each way described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the Treaty of Wuchale led to war between Ethiopia and Italy.",
    points: [["The Italian and Amharic texts of Article 17 differed, and Italy claimed that Ethiopia was a protectorate", 2], ["Menelik denounced the treaty in 1893 and refused Italian control, and Italy invaded in 1895", 2]],
    hints: ["Begin with the difference between the two texts."],
    modelAnswer: "The Italian text of Article 17 said Ethiopia agreed to use Italy for its foreign relations, while the Amharic text said it could, and Italy told the powers that Ethiopia was a protectorate. Menelik denounced the treaty in 1893 and refused to accept Italian control, so Italy invaded in 1895.",
    explanation: "Credit developed causes.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Italy was defeated at Adwa.",
    points: [["Italian weaknesses: poor maps and intelligence, divided columns and pressure from the government to fight", 2], ["Ethiopian strengths: a much larger army united by Menelik, armed with modern rifles and defending its homeland", 2]],
    hints: ["Give one reason about Italy and one about Ethiopia."],
    modelAnswer: "Italy's commander had poor maps and intelligence, divided his columns and was pressed by his government to fight. The Ethiopians had a much larger army united under Menelik and armed with modern rifles, and they were defending their homeland.",
    explanation: "Credit reasons on both sides.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a letter of a fictional Italian officer to his family, February 1896",
        "The enemy is said to be many times our number and well armed. Our maps are poor and the roads bad. The general has orders from Rome to act, but I fear we know too little of the ground."),
      "",
      source("Source B", "a recollection by a fictional Ethiopian soldier, told in the 1930s",
        "The emperor called, and men came from every province to Adwa. We had rifles, and we knew the hills. When the foreigners were divided in the dawn, we attacked."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What problems for the Italian army does Source A mention?", points: ["Poor maps and bad roads, so little knowledge of the ground", "Orders from Rome to act / the enemy's superior numbers"] }),
      P.manual({ label: "(b)", marks: 2, stem: "What do Sources A and B agree about the causes of the Ethiopian victory?", points: ["Both refer to the Ethiopians' large numbers or good armament", "Both suggest the Italians lacked knowledge of the ground while the Ethiopians knew the hills"] }),
      P.manual({ label: "(c)", marks: 4, stem: "How far do these sources and your own knowledge explain why Ethiopia won at Adwa?", type: "EXTENDED_RESPONSE", levels: levels(4), points: [["Sources show Italian weaknesses (maps, orders) and Ethiopian strengths (numbers, rifles, terrain)", 1], ["Provenance: A is contemporary and private, which makes it honest but limited to one officer; B is later and may exaggerate pride", 1], ["Own knowledge: Menelik's unity and mobilisation, modern weapons and diplomacy", 1], ["Judgement: the sources explain the battle but not the long-term preparation and diplomacy", 1]], modelAnswer: "The sources explain part of the victory. Source A shows Italian weaknesses: poor maps, bad roads and orders from Rome. Source B shows Ethiopian strengths: a mobilised army, rifles and knowledge of the hills. A is a private letter written before the battle, so it is probably honest but limited to one officer's view; B was told decades later and may exaggerate pride. My own knowledge adds Menelik's unity of the rases, his purchases of weapons and his diplomacy. The sources therefore explain the battle but not the long preparation behind it." }),
    ],
    hints: ["For (c), consider what the sources do not say."],
    explanation: "Both sources are invented: an Italian officer's letter and an Ethiopian soldier's recollection.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 200, max: 450 },
    stem: "To what extent was Menelik II's leadership the main reason why Ethiopia remained independent?",
    levels: levels(12),
    points: [
      ["Leadership: unity of the rases and church, mobilisation of a large army, and founding of Addis Ababa", 3],
      ["Modernisation: rifles and artillery, railway, telegraph; and diplomacy with France, Russia and Britain", 3],
      ["Italian weaknesses and errors, including poor maps, divided columns and government pressure", 2],
      ["Other factors: Ethiopia's long history as a state, geography, and the rivalry of the powers", 2],
      ["Supported judgement on the weight of leadership", 2],
    ],
    hints: ["Compare Menelik's leadership with weapons, Italian mistakes and rivalry among the powers."],
    modelAnswer: "Menelik's leadership was the most important reason Ethiopia remained independent, though it worked together with other factors. He united the rases and the church, mobilised a large army and founded Addis Ababa as a centre of power. He bought modern rifles and artillery and used diplomacy, writing to the powers and cultivating France and Russia. Italy's mistakes, such as poor maps, divided columns and pressure from Rome, helped, as did Ethiopia's long history as a state and the rivalry of the European powers. But weapons and Italian errors would not have mattered without the unity and preparation that Menelik provided. I conclude that his leadership was the main reason, with diplomacy and Italian mistakes as important supports.",
    explanation: "Credit explained factors and a judgement that weighs leadership against the others.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of the Battle of Adwa for Africa.",
    levels: levels(8),
    points: [
      ["Ethiopia remained independent and Italy recognised this at Addis Ababa", 2],
      ["Adwa became a symbol of African pride and inspired Pan-African and Ethiopianist ideas", 2],
      ["Limits: the rest of Africa was still partitioned, and Italy returned in 1935", 2],
      ["Judgement on the importance of the victory", 2],
    ],
    hints: ["Give both the symbolic and the practical results, and the limits."],
    modelAnswer: "The Battle of Adwa was important for Africa mainly as a symbol. Ethiopia kept its independence and Italy recognised it by the Treaty of Addis Ababa, and the victory inspired Pan-African and Ethiopianist ideas across the continent. However, it did not stop the partition of the rest of Africa, and Italy returned in 1935. I conclude that Adwa was important for what it showed, that an African state could defeat a European army, more than for any change in the fate of other colonies.",
    explanation: "Credit both the importance and the limits, with a judgement.",
  });

  b.card("DEFINITION", "What is a protectorate?", "A state that keeps its ruler but whose foreign affairs are controlled by a stronger power; Italy claimed Ethiopia was one.");
  b.card("DEFINITION", "What did negus negast mean?", "'King of Kings', the title of the Ethiopian emperor.");
  b.card("FACT", "When was the Battle of Adwa fought and who won?", "1 March 1896; Ethiopia under Menelik II defeated Italy.");
  b.card("FACT", "When was the Treaty of Wuchale signed?", "2 May 1889, between Menelik and Count Antonelli of Italy.");
  b.card("FACT", "What was Article 17 of the Treaty of Wuchale?", "The article on foreign relations: the Italian text made Ethiopia use Italy; the Amharic text made it optional.");
  b.card("FACT", "What did the Treaty of Addis Ababa (26 October 1896) do?", "Italy recognised Ethiopian independence and cancelled Wuchale; Italy kept Eritrea.");
  b.card("CONCEPT", "Why did Ethiopia win at Adwa?", "Menelik's unity and large army, modern rifles, diplomacy and Italian errors.");
  b.card("CONCEPT", "How did Menelik combine diplomacy and arms?", "He wrote to the powers and played them off against Italy while buying modern weapons.");
  b.card("CONCEPT", "What is a balanced view of Menelik II?", "He defended Ethiopia against Italy but also expanded its empire at the expense of the Oromo, Sidama and others.");
});
