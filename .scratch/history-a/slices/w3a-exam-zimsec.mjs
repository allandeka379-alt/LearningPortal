// W3a: ZIMSEC exam-format 25-mark essays (EXAM.ZIM_ESSAY), Paper 2 x3: the French Revolution/Napoleon, nationalism in Europe
// (Italy), Fascism (Mussolini).
import { concept, levels, ZIM } from "../lib.mjs";

concept("ahist.france.napoleon-power", { file: "exam/w3a-zimsec", keyPrefix: "exam.w3a-zimsec" }, (b) => {
  b.essay({
    d: 5, skill: "EVALUATION", examStyle: true, paper: "Paper 2", applies: ZIM, secs: 2700, marks: 25,
    concepts: ["ahist.france.napoleon-power", "ahist.france.revolution-impact", "ahist.france.napoleon-empire-fall"],
    stem: "To what extent did Napoleon Bonaparte preserve the achievements of the French Revolution? [25]",
    wordLimit: { min: 600, max: 1100 },
    levels: levels(25),
    points: [
      ["The rise of Napoleon from the Directory's weakness: Italy, Egypt and the coup of Brumaire, and his claim to defend the Revolution", 3],
      ["Achievements preserved: equality before the law and the Code of 1804, the end of feudal dues, security of the land bought by peasants and bourgeois", 3],
      ["Careers open to talent: the Legion of Honour, lycées, promotion in the army and administration", 3],
      ["Administrative and financial order: prefects, the Bank of France and the stable franc, the Concordat as a settlement of the Church quarrel", 3],
      ["Political freedoms lost: managed plebiscites, the purged Tribunate, censorship, the police under Fouché, Consul for life and Emperor", 3],
      ["Social limits: the Code strengthened fathers and husbands, workers' associations stayed illegal, slavery restored in 1802, a new imperial nobility", 3],
      ["Impact abroad: the Code and the end of feudalism spread in Europe, but conquest, conscription and taxes provoked nationalism and his fall", 3],
      ["Judgement: he kept the social and legal gains of the Revolution but ended its political liberty, and the balance of the two is argued", 4],
    ],
    modelAnswer: `Napoleon Bonaparte preserved much of what the French Revolution had changed in law and society, but he destroyed most of what it had promised in politics. The extent to which he was a defender of the Revolution therefore depends on which achievements are counted.

Napoleon came to power in November 1799, in the coup of 18 Brumaire, when the Directory had lost public support and depended on the army. He had won glory in Italy and, although the Egyptian expedition was a military failure, his reports made it seem a triumph. Politicians such as Sieyès wanted a strong government and a general to support it. Napoleon claimed that the Revolution was over and that he would secure its gains, and to a large extent this was the policy that he followed.

The first achievement of the Revolution was equality before the law and the end of feudal privilege. The August Decrees of 1789 had abolished feudal dues, tithes and the privileges of the estates, and Napoleon confirmed this. The Napoleonic Code of 1804 replaced the many local laws with a single civil law that guaranteed equality before the law, the right to property and freedom of religion. Peasants and bourgeois who had bought Church and noble land after 1789 were assured that their ownership would not be questioned, which gave a large class a stake in the new order. These were the most lasting achievements of the Revolution, and he preserved them.

Secondly, Napoleon kept the principle of careers open to talent. The Legion of Honour, founded in 1802, rewarded service to the state and not birth. The lycées, founded the same year, trained officials and officers from the families of the elite, and men of humble origins rose to become marshals and ministers. In administration he gave France order: prefects, appointed by the government, ran the departments; the Bank of France (1800) and the stable franc of 1803 ended the inflation of the assignats; and tax was collected by salaried officials. In 1801 the Concordat settled the quarrel over the Church that the Civil Constitution of the Clergy had begun, and it healed a division that had divided Catholic France, while confirming the loss of Church lands.

However, Napoleon ended the political freedoms that many revolutionaries had fought for. He gained power by a coup, and the plebiscites by which he claimed popular consent, on the Constitution of the Year VIII, on Consul for life in 1802 and on the Empire, were managed, so their huge majorities cannot be trusted. The Tribunate, where laws could be debated, was purged in 1802 and abolished in 1807. The press was censored and the number of newspapers cut, books and plays were checked, and Fouché's police used spies and informers. Elected local government was replaced by prefects and appointed mayors. In 1804 Napoleon crowned himself Emperor, restoring a hereditary monarchy, and created a new imperial nobility. The Revolution's claim that sovereignty belongs to the people was replaced by the rule of one man.

Napoleon also limited, or reversed, some social changes. The Code strengthened the authority of husbands and fathers and restricted the rights of married women, and employers' word was preferred to workers' in disputes while workers' associations remained illegal. In 1802 he restored slavery in the French colonies, which the Convention had abolished in 1794, and sent an army to Saint-Domingue that was defeated; Haiti declared independence in 1804. These actions contradicted the language of liberty and equality.

Abroad, Napoleon spread some revolutionary changes. In the lands he conquered or controlled, the Code was introduced and feudal dues were ended, and old privileges were weakened, so that much of western and central Europe was changed. Historians point out that this was not always welcomed, since conquered lands were made to pay taxes and supply soldiers and works of art, and were required to follow the Continental System. French rule thus provoked resistance in Spain, Germany and elsewhere, and ideas of national freedom, themselves a product of the Revolution, were turned against him. His fall in 1814 and 1815, after Russia, Leipzig and Waterloo, was partly the result.

Overall, the answer depends on what is meant by the achievements of the Revolution. If they are equality before the law, the end of feudalism, secure property and careers open to talent, Napoleon preserved them and gave them a firm legal and administrative form, and for that reason many of the changes survived the return of the Bourbons. If the achievements are liberty, an elected government and a free press, he destroyed them. I conclude that he preserved the social and legal revolution to a large extent but not the political one, and that he made himself the master of a state that the Revolution had been meant to free from the rule of a single man.`,
    hints: ["Plan arguments for and against, give specific evidence and reach a supported judgement."],
    explanation: "Credit a balanced argument across law, society and politics, with specific evidence and a supported judgement.",
  });
  b.essay({
    d: 5, skill: "EVALUATION", examStyle: true, paper: "Paper 2", applies: ZIM, secs: 2700, marks: 25,
    concepts: ["ahist.italy.unification", "ahist.europe.vienna-congress-system"],
    stem: "Assess the contributions of Cavour, Garibaldi and foreign powers to the unification of Italy by 1870. [25]",
    wordLimit: { min: 600, max: 1100 },
    levels: levels(25),
    points: [
      ["The background: the Vienna settlement, Austrian control, the Napoleonic legacy, secret societies and Mazzini", 3],
      ["The failure of 1848-49: Custoza, Novara and the French destruction of the Roman Republic show Italians could not succeed alone", 3],
      ["Cavour: modernisation of Piedmont, the Crimean War, Plombières and the war of 1859 with Lombardy gained", 3],
      ["Cavour in 1860: the annexation of the central duchies, Savoy and Nice to France, and the army sent through the Papal States", 3],
      ["Garibaldi: the Thousand, Marsala, Palermo and Naples, and the handing of the south to Victor Emmanuel at Teano", 3],
      ["Foreign powers: France in 1859 and its garrison in Rome, Prussia and Venetia in 1866, the withdrawal from Rome in 1870, British sympathy", 3],
      ["Limits and consequences: popular involvement was limited, plebiscites were managed, the north-south gap continued", 3],
      ["Judgement ranking the three contributions with reasons", 4],
    ],
    modelAnswer: `Italy was unified between 1859 and 1870 by the combined effects of Piedmontese diplomacy and leadership, popular military action and the help of foreign powers. None of the three could have achieved unification alone, but it is possible to rank their contributions.

The background explains why these contributions were needed. In 1815 the Vienna settlement divided Italy, put the north under Austrian rule or influence and restored the old rulers, while the experience of Napoleonic government had spread ideas of unity and reform. The Carbonari and Mazzini's Young Italy kept the ideal alive, but their revolts in 1820, 1831 and the republic of 1849 failed. In 1848-49 Charles Albert of Piedmont was defeated by Austria at Custoza and Novara, and French troops destroyed the Roman Republic. The lesson was that Italians could not defeat Austria alone and that Piedmont, which kept its constitution, was the only state able to lead.

Cavour made the largest contribution. As prime minister from 1852 he modernised Piedmont with railways, trade treaties and a stronger army, and took it into the Crimean War so that he could raise the Italian question at the peace conference of 1856. In July 1858 he met Napoleon III at Plombières and secured a French promise of help against Austria in return for Savoy and Nice. He provoked Austria into war in 1859, and the French and Piedmontese armies won at Magenta and Solferino. Napoleon III then made the armistice of Villafranca, so only Lombardy was gained, but Tuscany, Parma, Modena and part of the Papal States voted to join Piedmont in 1860. In the same year, when Garibaldi conquered the south, Cavour sent a Piedmontese army through the Papal States to defeat the Pope's troops at Castelfidardo, in order to stop Garibaldi marching on Rome and provoking France, and to bring the south under the king. Without this diplomacy and statecraft, the other efforts would not have formed a lasting state.

Garibaldi's contribution was dramatic and essential to the south. In May 1860 he sailed from Genoa with about a thousand volunteers, landed at Marsala, defeated the Bourbon troops at Calatafimi, took Palermo and crossed to the mainland, entering Naples in September. His success gave the movement popular enthusiasm and showed that the Bourbon kingdom was weak. Yet he needed the arrival of the Piedmontese army, and at Teano in October 1860 he handed over his conquests to Victor Emmanuel II. The plebiscites that followed were not free in the modern sense, and many peasants, who had hoped for land, saw no benefit. Garibaldi was a brilliant military leader but not a statesman who could build a state.

Foreign powers also decided the outcome. French armies won the victories of 1859, and France later protected the Pope in Rome until 1870, which prevented Italian capture of the city. Prussia was Italy's ally in 1866; although Italy was beaten at Custoza and Lissa, Prussia's victory over Austria brought Venetia to Italy. In 1870 the French withdrew their garrison for the war with Prussia, and the Italian army entered Rome on 20 September. Britain gave sympathy and diplomatic support, but did not fight. Each stage of unification therefore depended on a favourable international situation, which Cavour exploited but did not create.

The unification was also limited. It was carried out largely by the Piedmontese elite, with a small part played by ordinary people. The plebiscites were managed, the laws and taxes of Piedmont were extended over the peninsula, and the gap between the north and the poor south remained a problem for generations. The Pope refused to accept the loss of Rome, and the quarrel lasted until 1929.

In conclusion, Cavour contributed most, because his reforms, his alliance with Napoleon III and his control of events in 1860 gave the movement a state, an army and a method. Garibaldi made the unification of the south possible but depended on the king's army and diplomacy. Foreign powers were decisive at critical moments, but they acted for their own reasons. Unification therefore resulted from the interaction of all three, with Cavour as the central figure.`,
    hints: ["Plan arguments for and against, give specific evidence and reach a supported judgement."],
    explanation: "Credit the three contributions explained with specific evidence, their links and a supported ranking.",
  });
  b.essay({
    d: 5, skill: "EVALUATION", examStyle: true, paper: "Paper 2", applies: ZIM, secs: 2700, marks: 25,
    concepts: ["ahist.mussolini.rise-dictatorship", "ahist.mussolini.governance", "ahist.mussolini.society"],
    stem: "To what extent did Mussolini establish a totalitarian dictatorship in Italy between 1922 and 1940? [25]",
    wordLimit: { min: 600, max: 1100 },
    levels: levels(25),
    points: [
      ["Meaning of totalitarian and the path to dictatorship: the March on Rome, the Acerbo Law, the 1924 election and the Matteotti murder", 3],
      ["The laws of 1925-26: the press, the ban on opposition parties, the Special Tribunal, government by decree, podestà", 3],
      ["The terror state: OVRA, internal exile, imprisonment of Gramsci; much less killing than in Germany or the USSR", 3],
      ["Propaganda and the cult of the Duce: Minculpop, the press and radio, rallies, sport", 3],
      ["Control of society: the Battle for Births, the ONB and schools, the OND, the Corporate State", 3],
      ["Limits: the King, the Church and the Lateran Treaties, the army and business kept power, and Mussolini compromised with them", 3],
      ["Foreign policy and the war: Abyssinia and the Axis exposed weaknesses, and in 1943 the King and the Grand Council removed him", 3],
      ["Judgement: Italy was a one-party dictatorship that aimed at totalitarian control but achieved it only partly", 4],
    ],
    modelAnswer: `Mussolini established a dictatorship in Italy that aimed at totalitarian control, but he achieved it only in part. Fascist Italy had a single party, a cult of the leader, censorship and a secret police, but the monarchy, the Church, the army and big business remained independent centres of power, and repression was less deadly than in Nazi Germany or the Soviet Union. By totalitarian we mean a state that tries to control public and private life through one party and one leader, with propaganda and terror.

The path to dictatorship took four years. Mussolini became prime minister in October 1922, after the March on Rome, when the King refused to proclaim martial law. His first cabinet was a coalition. The Acerbo Law of 1923 gave two thirds of the seats to the party with at least a quarter of the votes, and in the election of April 1924 the Fascist list won about two thirds of the vote, helped by violence. When the Socialist Matteotti denounced the fraud he was murdered, and when the opposition left parliament, the King did not intervene. In January 1925 Mussolini announced that he accepted responsibility, and in 1925-26 laws destroyed the liberal state: the press was controlled, the head of government became responsible to the King alone and could issue decrees, elected mayors were replaced by appointed podestà, and in 1926 opposition parties were banned and a Special Tribunal was created. By the end of 1926 Italy was a one-party state.

The regime used terror, but with moderation by the standards of the time. The secret police OVRA and a network of informers watched the population, opponents were sent to internal exile, and leaders such as Gramsci were imprisoned. Yet the Special Tribunal passed only a few dozen death sentences in the whole period. This was repression and surveillance rather than mass killing, which suggests an authoritarian regime that was less totalitarian than Hitler's or Stalin's.

Propaganda was more central. The press was controlled from the mid-1920s, and in 1937 the Ministry of Popular Culture took charge of press, radio, film and the arts. The Duce was shown as an infallible leader, sportsman and soldier, and crowds were called to hear him from the balcony in Rome. Sport and architecture were used to display national strength. The cult gave Mussolini genuine popularity, especially after the Lateran Treaties and the conquest of Ethiopia, but it often produced conformity and not conviction.

The regime also tried to organise society. The Battle for Births, begun in 1927, sought to raise the population and keep women at home, but the birth rate kept falling. The youth organisation, the ONB, and schools with a single state textbook, and the oath required of professors, aimed to produce Fascist citizens. The OND offered leisure to workers, and the Corporate State banned independent unions and strikes and promised cooperation of classes, though in practice employers kept control. Millions took part in these organisations, but many joined for jobs and benefits.

The limits are clear. The King remained head of state and commander of the armed forces, and it was he who dismissed Mussolini in July 1943, after the Grand Council voted against him. The Church kept its schools, its own organisations and a large influence after the Lateran Treaties of 1929, and Pius XI protested over Catholic Action in 1931 and later over racial policy. The army, civil service and big business remained powerful, and Mussolini often had to compromise. Foreign policy also exposed weakness: the conquest of Abyssinia in 1935-36 brought popularity but isolation, the alliance with Germany made Italy dependent, and in 1940 the army was not ready for war.

I conclude that Mussolini established a dictatorship in which one party and one leader dominated public life, controlled the press and removed opposition, and that he aimed at a totalitarian state. But he never obtained the total control that the word suggests, because he shared power with the King, the Church and the elites, and used less terror than other dictators. The regime was therefore authoritarian and partly totalitarian, and its limits help to explain why it collapsed so quickly when war brought defeat.`,
    hints: ["Plan arguments for and against, give specific evidence and reach a supported judgement."],
    explanation: "Credit a balanced argument across the dictatorship, terror, propaganda, society and its limits, with a supported judgement.",
  });
});
