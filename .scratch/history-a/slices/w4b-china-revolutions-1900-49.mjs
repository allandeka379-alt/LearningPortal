// W4b: ahist.china.revolutions-1900-49 (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";
import { mc, chrono } from "../tables/w4b-util.mjs";

concept("ahist.china.revolutions-1900-49", { file: "china/revolutions-1900-49", keyPrefix: "china.revolutions-1900-49" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which dynasty ruled China until the revolution of 1911?",
    ok: ["The Qing, or Manchu, dynasty", "Correct: the last emperor was Puyi."],
    no: [
      ["The Ming dynasty, which was founded in the fourteenth century", "The Ming ruled from 1368 to 1644, before the Qing."],
      ["The Tang dynasty, which ruled China in the seventh century", "The Tang ended in 907."],
      ["The Han dynasty, which ruled China in the time of the Roman Empire", "The Han ended in 220 CE."],
    ],
    explanation: "The Qing, a Manchu dynasty, ruled from 1644 to 1912. Puyi, a child, was its last emperor.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "Who led the Guomindang after the death of Sun Yat-sen in 1925?",
    ok: ["Chiang Kai-shek", "Correct: he led the Northern Expedition and the Nanjing government."],
    no: [
      ["Mao Zedong, the Communist leader in Jiangxi and Yan'an", "Mao led the Communists."],
      ["Yuan Shikai, the general who became president in 1912", "Yuan Shikai died in 1916."],
      ["Chen Duxiu, one of the founders of the Communist Party", "Chen Duxiu was a Communist leader and not a Guomindang one."],
    ],
    explanation: "Chiang Kai-shek, trained at Whampoa, became the leader of the Guomindang and head of the Nanjing government from 1928.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "What were the Boxers?",
    ok: ["A peasant movement that attacked foreigners and missions", "Correct: they rose in northern China in 1899-1900."],
    no: [
      ["A Communist army that marched from Jiangxi to Yan'an in 1934", "That was the Red Army on the Long March."],
      ["A group of army officers who overthrew the Qing in 1911", "The 1911 revolution came from a different group."],
      ["A band of students who protested against the Treaty of Versailles", "That was the May Fourth Movement."],
    ],
    explanation: "The Boxers (the Society of Righteous and Harmonious Fists) attacked foreigners, missionaries and Chinese Christians and besieged the legations in Beijing in 1900.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did the May Fourth Movement of 1919 begin?",
    ok: ["Students protested at the transfer of German rights in Shandong to Japan", "Correct: it was a protest against the Versailles settlement."],
    no: [
      ["Peasants rose against the landlords when the Communists arrived in the village", "The movement began among students in the cities."],
      ["The army rebelled when the Qing emperor ordered the nationalisation of railways", "That was a cause of the 1911 revolution."],
      ["Workers demanded higher pay after the Guomindang closed the factories", "It was a protest about national dignity."],
    ],
    hints: ["Think of the peace conference at Paris."],
    explanation: "On 4 May 1919 students in Beijing protested at the transfer of German rights in Shandong to Japan, and the movement grew into a wider cultural and political awakening.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Why did the Communists turn to the peasants after 1927?",
    ok: ["Their urban risings had failed and the GMD had crushed them in the cities", "Correct: Mao argued that the peasants were the base of revolution in China."],
    no: [
      ["The Soviet Union ordered them to leave the cities and settle in the villages", "The Soviet advice was to work in the cities."],
      ["Japan had defeated the Guomindang in the towns and left them to the peasants", "Japan's major attack came later, in 1937."],
      ["The peasants had already won power and invited the party to join them", "The peasants had not taken power."],
    ],
    hints: ["Think about what happened in April 1927 and after."],
    explanation: "After the White Terror and failed urban risings, Mao argued that the peasants, who were the majority, must be the base. In Jiangxi he developed land reform and guerrilla warfare.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the importance of the Long March for the Communist Party?",
    ok: ["It saved a part of the army and made Mao the leading figure of the party", "Correct: the survivors set up the base at Yan'an."],
    no: [
      ["It won the civil war because it destroyed the Guomindang army on the way", "The Communists lost most of their strength on the March."],
      ["It brought the party into Beijing, where it proclaimed the republic in 1935", "The People's Republic was proclaimed in 1949."],
      ["It ended the civil war because the Guomindang agreed to a lasting peace", "The war continued and resumed later."],
    ],
    hints: ["Think of the Zunyi Conference and the survivors."],
    explanation: "The March cost most of the marchers, but the survivors reached Shaanxi. At Zunyi (January 1935) Mao emerged as leader, and Yan'an became a base for the next decade.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which fact best supports the view that the war with Japan helped the Communists?",
    ok: ["Party membership and Red Army strength grew greatly between 1937 and 1945", "Correct: the war gave them room to expand."],
    no: [
      ["The Communists were forced to leave Jiangxi in 1934 on the Long March", "This happened before the war with Japan."],
      ["The Guomindang purged the Communists in Shanghai in April 1927", "This also happened before the war."],
      ["The Boxers besieged the legations in Beijing during the summer of 1900", "This happened decades earlier."],
    ],
    hints: ["Which fact shows growth after 1937?"],
    explanation: "While the GMD bore the main fighting and lost its best troops, the CCP built bases behind Japanese lines and grew from tens of thousands of members to over a million (estimates).",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which statement best sums up historians' views of why the Communists won in 1949?",
    ok: ["The GMD's weakness and the CCP's strengths both mattered, with differing emphasis", "Correct: historians weigh peasant support, nationalism and GMD failure."],
    no: [
      ["The Communists won only because the Soviet Union supplied a large army", "The Soviet role was limited and not the main cause."],
      ["The Guomindang lost only because the Americans refused to give it any help", "The US gave substantial aid to the GMD."],
      ["The Communists won only because they began the war with a larger army", "The Nationalists had more troops at the start."],
    ],
    hints: ["Think about the range of causes that historians stress."],
    explanation: "Historians emphasise different factors: GMD corruption and inflation, the war with Japan, land reform and peasant support, CCP organisation and nationalism.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Chinese Communist Party was founded in Shanghai in July 1921.",
    answer: true,
    explanation: "True. Chen Duxiu and Li Dazhao were among the leaders, and Mao Zedong attended the first congress.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "After the Qing fell in 1911, China was quickly united under a strong central government.",
    answer: false,
    explanation: "False. Yuan Shikai's rule ended in 1916 and warlords then controlled the regions until the late 1920s.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Chiang Kai-shek's government in Nanjing controlled the whole of China from 1928.",
    answer: false,
    hints: ["Think of warlords and the Communist bases."],
    explanation: "False. Its real control was mostly in the lower Yangzi region; warlords and the Communist bases remained, and Japan occupied Manchuria in 1931.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with his role.",
    pairs: [
      ["Sun Yat-sen", "Founder of the Guomindang and first provisional president"],
      ["Yuan Shikai", "General who became president in 1912 and tried to become emperor"],
      ["Chiang Kai-shek", "Leader of the Nanjing government after 1928"],
      ["Mao Zedong", "Communist leader who built a peasant base"],
    ],
    explanation: "Sun (1912), Yuan (president 1912-16), Chiang (Nanjing) and Mao (Jiangxi, Yan'an).",
  });
  chrono(b, [
    "The Boxer Rising",
    "The Wuchang rising begins the revolution against the Qing",
    "The May Fourth Movement",
    "The Long March begins",
  ], {
    d: 3, skill: "UNDERSTANDING",
    hints: ["They run from 1899 to 1934."],
    explanation: "1899-1900; October 1911; 4 May 1919; October 1934.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The People's Republic of China was proclaimed on 1 {{blank:a}} 1949, by {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["October"], choices: ["October", "January", "May", "December"] },
      { id: "b", accepted: ["Mao Zedong"], choices: ["Mao Zedong", "Chiang Kai-shek", "Sun Yat-sen", "Yuan Shikai"] },
    ],
    explanation: "Mao Zedong proclaimed the People's Republic in Beijing on 1 October 1949. Chiang Kai-shek withdrew to Taiwan in December.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Chinese leader who founded the Guomindang and put forward the Three Principles of the People.",
    accepted: ["Sun Yat-sen", "Sun Yat sen", "Sun Yixian", "Sun Zhongshan", "Sun"],
    wrong: ["Mao Zedong"],
    explanation: "**Sun Yat-sen**, whose principles were nationalism, democracy and people's livelihood.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the Long March.",
    points: ["It began in October 1934, when the Communists broke out of the Jiangxi base surrounded by Chiang's forces", "The marchers travelled several thousand miles over rivers and mountains to Shaanxi in the north-west", "Most of the marchers died or were lost; under ten thousand reached the north by estimates", "At the Zunyi Conference in 1935 Mao emerged as the leader, and the survivors set up a base at Yan'an"],
    modelAnswer: "The Long March began in October 1934, when the Communists broke out of the Jiangxi base that Chiang's forces had surrounded. The marchers travelled several thousand miles over rivers and mountains to Shaanxi in the north-west. Most died or were lost, and under ten thousand reached the north. At Zunyi in 1935 Mao emerged as leader and the survivors set up a base at Yan'an.",
    explanation: "One mark for each accurate point.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Qing dynasty fell in 1911-12.",
    points: [["Defeats by foreign powers, unequal treaties and the Boxer indemnity weakened the dynasty and showed that it could not defend China", 2], ["Failed or late reforms, the loss of support among officers, merchants and students, and the army mutiny at Wuchang led provinces to declare independence", 2]],
    hints: ["Think of foreign pressure and of domestic discontent."],
    modelAnswer: "Defeats by foreign powers, unequal treaties and the Boxer indemnity weakened the dynasty and showed that it could not defend China. Its reforms came late, and it lost the support of officers, merchants and students, so when the army mutinied at Wuchang the provinces declared independence.",
    explanation: "Credit explained reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Guomindang lost support between 1937 and 1949.",
    points: [["The war with Japan destroyed its best armies and left it with inflation, high taxes and heavy conscription", 2], ["Corruption, reliance on landlords and ruinous inflation after 1945 alienated peasants and townspeople, while the CCP offered land reform", 2]],
    hints: ["Think of the war and of the economy."],
    modelAnswer: "The war with Japan destroyed its best armies and left it with inflation, high taxes and heavy conscription. After 1945 corruption, reliance on landlords and ruinous inflation alienated peasants and townspeople, while the Communists offered land reform.",
    explanation: "Credit explained reasons.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a report by a fictional Communist cadre on a village in north China, 1944",
        "We reduced the rent by a quarter and held meetings at which the poorest peasants spoke. Many joined the militia. The soldiers of our army pay for what they take and help with the harvest. The landlord sent word that the Japanese would come, but the villagers stayed. They say that for the first time the village belongs to them."),
      "",
      source("Source B", "a letter by a fictional Nationalist officer to his family, 1948",
        "The price of rice has risen four times since the new year, and my pay is worth less each month. The officers sell fuel and cloth for their own profit. The recruits run off in the night. Local people tell the soldiers to go and do not give us food. I fear that we shall be left to fight alone."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A say that the Communists did in the village?", points: ["They reduced the rent by a quarter and held meetings of the poorest peasants", "Their soldiers paid for what they took and helped with the harvest, and many villagers joined the militia"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about the relations between the armies and the villagers.", points: [["Agree: both show that the attitude of villagers affected the armies (the villagers stayed in A; local people refuse food in B)", 2], ["Differ: A shows villagers supporting a disciplined Communist army; B shows hostile villagers, corruption and inflation among the Nationalists", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying why the Communists won the civil war?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is useful as evidence of CCP policy and discipline, but it is a report by a cadre who wants to show success and does not show the villagers' own views", 2], ["B is useful as private evidence of inflation, corruption and low morale in the GMD army, but it is one officer's view and may exaggerate", 2], ["Own knowledge: land and rent reform, PLA discipline, GMD inflation and desertion support both; they show peasant support as one cause among others", 2]], modelAnswer: "Source A is useful because it shows CCP policy and discipline, with rent reduction and an army that paid for its needs, which fits what we know of land reform, but a cadre's report was meant to show success. Source B is useful as private evidence of inflation, corruption and low morale in the Nationalist army, which fits the economic collapse of 1948, but it is one officer's view. Together they support the view that peasant support and GMD weakness both helped the Communists, though they do not show how important each was." }),
    ],
    hints: ["For (c), consider the purpose of an official report and a private letter."],
    explanation: "Both sources are invented: a Communist report and a Nationalist officer's letter.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of the war with Japan in the Communist victory of 1949.",
    levels: levels(8),
    points: [
      ["The war weakened the GMD: its best troops were lost, inflation and corruption rose, and it was forced to retreat to Chongqing", 2],
      ["It helped the CCP: bases behind Japanese lines, peasant mobilisation, a patriotic image, and growth in membership and army", 2],
      ["Other factors: the land reform, CCP organisation and leadership after Yan'an, and GMD failures in 1946-49", 2],
      ["A supported judgement, for example that the war was a key condition but not the only cause", 2],
    ],
    hints: ["Think about what the war did to each side."],
    modelAnswer: "The war with Japan was an important cause of the Communist victory. It cost the Guomindang its best troops, forced its retreat to Chongqing and left it with inflation and corruption. It helped the Communists to build bases behind Japanese lines, to win peasants through rent reduction and to present themselves as patriots, and their membership and army grew many times over. But it was not the only cause. The CCP's organisation, discipline and land reform and the GMD's failures in 1946-49 also mattered. I conclude that the war created the conditions for victory, but the Communists' own policies turned those conditions into victory.",
    explanation: "Credit explained points and a judgement.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 250, max: 500 },
    stem: "'The Communists won the civil war mainly because they had the support of the peasants.' How far do you agree?",
    levels: levels(12),
    points: [
      ["Peasant support: land and rent reform, a disciplined army, recruitment and supplies from the villages", 3],
      ["Guomindang weakness: corruption, inflation, loss of the cities' support, and reliance on landlords", 3],
      ["The war with Japan and other factors: military strategy in 1948-49, Soviet help in Manchuria, and nationalism", 3],
      ["A supported judgement on the relative importance of peasant support compared with the other causes", 3],
    ],
    hints: ["Consider whether peasant support alone could have won the war."],
    modelAnswer: "Peasant support was very important, but it was not the only reason. Land and rent reform, a disciplined PLA and the recruitment and supplies drawn from the villages gave the Communists the strength to fight, and they held the countryside, which surrounded the cities. However, the Guomindang's weaknesses were also vital. Corruption, ruinous inflation after 1945 and its reliance on landlords lost it the support of townspeople as well as peasants, and its best armies had been weakened in the war with Japan. The Communists also won key campaigns in 1948-49 and had access to Manchuria and some Soviet help. I therefore agree only in part. Peasant support was the foundation of the Communist strength, but the collapse of the GMD and the war with Japan created the opportunity, and a judgement should give weight to both.",
    explanation: "Credit both sides and a supported judgement.",
  });

  b.card("DEFINITION", "What were the unequal treaties?", "Agreements forced on China after defeats that gave foreign powers ports, concessions and extraterritorial rights.");
  b.card("DEFINITION", "What was the Long March?", "The Communist retreat of 1934-35 from Jiangxi to Shaanxi, in which most of the marchers were lost and Mao emerged as leader.");
  b.card("FACT", "When did the Qing dynasty fall?", "The Wuchang rising began on 10 October 1911; Puyi abdicated in February 1912.");
  b.card("FACT", "What was the May Fourth Movement?", "A student protest in Beijing on 4 May 1919 against the Shandong settlement, which grew into a wider movement for science, democracy and national dignity.");
  b.card("FACT", "What happened in April 1927 in Shanghai?", "Chiang Kai-shek turned on his Communist allies and killed many thousands in the 'White Terror'.");
  b.card("FACT", "When was the People's Republic proclaimed, and by whom?", "1 October 1949, by Mao Zedong in Beijing.");
  b.card("CONCEPT", "Why did the Communists turn to the peasants?", "After the failure of urban risings and the 1927 purge, Mao argued that China's revolution must rest on the peasants.");
  b.card("CONCEPT", "How did the war with Japan help the Communists?", "It weakened the GMD and let the CCP build bases, win peasants and grow in membership.");
  b.card("CONCEPT", "Why did the Guomindang lose the civil war?", "Corruption, inflation, loss of urban support, reliance on landlords and war-weakened armies.");
});
