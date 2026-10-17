// W3b exam-format items: Cambridge Paper 1 x2 (Germany), Paper 2 x4 (Germany 2.1-2.4), Paper 3 x2 (origins of the First World
// War, different extracts). Part structure, levels and model answers are our convention (a reviewer must check).
import { concept, P, source, paper1Sources, extract, levels, checkExam, EXAM } from "../lib.mjs";

const C1 = EXAM.CAM_P1;
const C2 = EXAM.CAM_P2;
const C3 = EXAM.CAM_P3;

concept("ahist.germany.vienna-to-1848", { file: "exam/w3b-cambridge", keyPrefix: "exam.w3b-cambridge" }, (b) => {
  // ---- Paper 1, set 1: Germany to 1848 ----
  b.struct({
    d: 5, skill: C1.skill, applies: C1.applies, secs: C1.secs, examStyle: true, paper: "Paper 1",
    concepts: ["ahist.germany.vienna-to-1848", "ahist.skills.source-evaluation"],
    stem: [
      "Liberalism and nationalism in Germany, 1815-71. Study the sources and answer both questions.",
      "",
      paper1Sources([
        source("Source A", "a letter by a fictional university professor to a colleague, October 1819",
          "The new decrees place a government curator in every university. Our students' societies are forbidden, the newspapers are to be read by censors before they are printed, and a commission at Mainz will search out what it calls revolutionary plots. I do not say that the students were wise; but I say that ideas cannot be arrested like men."),
        source("Source B", "a petition from fictional merchants of a south German town to their ruler, 1833",
          "At every frontier our goods pay a toll, and our wagons wait for hours. The union of customs now being formed will help us, and we pray Your Highness to join it. We ask also that the representatives of the people be heard on matters of trade, as the constitution of our state promised."),
        source("Source C", "a cartoon of the kind published in the 1840s, described in words (a fictional cartoon)",
          "A coach labelled 'The Confederation' stands in the road. Thirty-nine small horses are harnessed to it, each facing a different direction. On the box a driver in the uniform of an Austrian official cracks a whip, but the horses do not move.", { described: true }),
        source("Source D", "an article in a fictional Rhineland newspaper, December 1847",
          "The potato crop has failed again and bread is dear. In the towns the weavers and day labourers go hungry, and at the same time we are told that the government will not call a parliament. Hunger makes men listen to those who speak of reform."),
      ]),
    ].join("\n"),
    parts: checkExam(C1, [
      P.manual({
        label: "(a)", marks: 15, type: "EXTENDED_RESPONSE", levels: levels(15, "sources"),
        stem: "Compare Sources A and B as evidence about attitudes towards the political system of the German Confederation.",
        points: [
          ["Similarity: both complain about restrictions imposed by the system and ask for freedom (of ideas or trade) and, in B, representation", 3],
          ["Difference: A is about political repression of students and the press (the Carlsbad Decrees); B concerns economic grievances and trade and is written respectfully", 3],
          ["Difference in tone and demand: A is a private, critical, intellectual protest; B is a formal petition asking a ruler for favour, so it is cautious", 3],
          ["Explanation from provenance: A (1819) comes from an academic directly affected by the decrees; B (1833) comes from merchants with an economic interest, writing after Hambach and during the Zollverein negotiations", 3],
          ["Evaluation using context: the Decrees of 1819 and the Zollverein of 1834 confirm both; which is more useful depends on the question; both suggest that the system pleased few", 3],
        ],
        modelAnswer: "The sources agree that the system of the Confederation was resented by educated and commercial groups. Source A complains that the Carlsbad Decrees put curators in the universities, banned student societies and censored newspapers; Source B complains of tolls at every frontier and asks that representatives of the people be heard, as the state's constitution promised. Both therefore ask for a freedom, of ideas in A and of trade in B, and both imply that the existing arrangements were unsatisfactory.\n\nThere are clear differences. Source A concerns political repression: it was written in October 1819, a month after the Decrees were passed, when the professor was directly affected. It is critical in tone, ends with the claim that ideas cannot be arrested, and shows the failure of Metternich's system to win consent. Source B concerns an economic grievance, tolls and the customs union, and is a petition to a ruler, so it is respectful and asks for a favour. The merchants even support the ruler's policy of joining a customs union and mention representation only as a promise of the constitution of their state, one of those granted in the south in 1818-20. The difference in tone arises from the audience: A is a letter between colleagues, B a request for action by a prince.\n\nProvenance explains much of the difference. A is by a professor, a member of the group most affected by the Decrees; B is by merchants with an interest in cheaper trade, written in 1833, after the Hambach Festival of 1832 and the Six and Ten Articles, while the Zollverein was being negotiated. Each writer therefore stresses what affected his own group.\n\nContext confirms both. The Decrees did censor the press, ban the Burschenschaften and watch universities, and the Zollverein began on 1 January 1834. Source A is more useful as evidence of opposition to repression, and B as evidence of economic interest in unity. Together they suggest that the system pleased neither intellectuals nor businessmen, though neither source shows how widespread these views were.",
      }),
      P.manual({
        label: "(b)", marks: 25, type: "EXTENDED_RESPONSE", levels: levels(25, "sources"),
        stem: "How far do Sources A to D support the view that the revolutions of 1848 were caused mainly by economic distress?",
        points: [
          ["Support: D links hunger and dear bread to listening to reformers; B shows economic frustration at tolls and a wish for the customs union", 4],
          ["Challenge: A (political repression and censorship) and C (a Confederation that cannot act and is controlled by Austria) point to political causes", 4],
          ["Evaluation of provenance: D is a newspaper written to argue for a parliament; A is a protest; B a petition; C a cartoon aimed at the Confederation; each has a purpose", 4],
          ["Own knowledge supporting economic causes: potato blight and crisis of 1846-47, weavers' revolt of 1844, urbanisation, railways and the Zollverein", 4],
          ["Own knowledge supporting political and national causes: Carlsbad Decrees, Six and Ten Articles, Hambach, liberal and nationalist demands, the failure of the Confederation, the example of Paris in February 1848", 4],
          ["Links between economic and political causes, and the judgement on extent supported by sources and knowledge", 5],
        ],
        modelAnswer: "The sources support the view only in part: economic distress was an important cause, but they and my knowledge suggest that political grievances were at least as important and that the two were connected.\n\nSource D most clearly supports the view. It was written in December 1847, after the potato harvest had failed again, and it says that hunger makes men listen to those who speak of reform. Source B supports it in a different way: merchants complain of tolls and look to a customs union, so economic frustration with the existing system is shown. My own knowledge supports this: the potato blight and poor harvests of 1845-47 raised food prices, the Silesian weavers revolted in 1844, and an industrial and financial slump in 1846-47 caused unemployment. These conditions put workers, artisans and peasants on the streets in March 1848.\n\nThe other sources challenge the view. Source A describes political repression, the censorship, the curators and the commission at Mainz established by the Carlsbad Decrees. It was written in 1819, long before 1848, so it is evidence of a long-standing grievance and not of the cause of the revolution itself, but it shows that the system had been resented for decades. Source C is a cartoon which presents the Confederation as a coach pulled in thirty-nine directions by a driver who cannot move it, suggesting that the political structure was ineffective and under Austrian domination. It is hostile satire and exaggerates, yet it matches the weakness of the Federal Diet, with its need for near-unanimity. My own knowledge supports political causes: the Six and Ten Articles of 1832 followed Hambach; liberals wanted constitutions and a free press; nationalists wanted unity; and the revolution in Paris in February 1848 set off the German revolts.\n\nThe provenance of the sources must also be weighed. Source D is a newspaper article by a writer who wanted a parliament, so it may exaggerate the link between hunger and reform. Source B is a petition that is polite and limited, and it reflects only the commercial classes. Source A is a private letter from a professor, and C is satire.\n\nThe sources, taken together with my knowledge, suggest a connection. The economic crisis of 1846-47 was the immediate trigger which brought crowds into the streets, but it was political ideas, liberal and national, that gave the movement its demands, and the failure of the Confederation to satisfy them that made change seem necessary. Source D itself shows this: hunger leads men to listen to reformers. I conclude that economic distress was an important cause, particularly of the timing and mass character of the revolutions, but not the main one in terms of the demands made, which were political.",
      }),
    ]),
    hints: ["For (b), group the sources, weigh each by provenance, and use your own knowledge to test the claim."],
    explanation: "All four sources are invented. The mark scheme and levels are our own wording; a reviewer should compare them with Cambridge specimen mark schemes.",
  });

  // ---- Paper 1, set 2: Bismarck and Austria, 1862-66 ----
  b.struct({
    d: 5, skill: C1.skill, applies: C1.applies, secs: C1.secs, examStyle: true, paper: "Paper 1",
    concepts: ["ahist.germany.bismarck-to-1866", "ahist.skills.source-evaluation"],
    stem: [
      "Liberalism and nationalism in Germany, 1815-71. Study the sources and answer both questions.",
      "",
      paper1Sources([
        source("Source A", "a speech by a fictional liberal deputy in the Prussian Landtag, 1863",
          "The army has been enlarged without the consent of the people's representatives, and the taxes are collected without a budget. This is not a defence of the country but a defiance of the constitution. We will not vote the money until our rights are respected."),
        source("Source B", "an editorial in a fictional Vienna newspaper, September 1865",
          "The arrangement at Gastein gives us Holstein and Prussia the larger share of the duchies. Our government counts on the friendship of the German princes, but it has no ally among the great powers. We should watch the Prussian railways and the movements of the Italians."),
        source("Source C", "a letter from a fictional Prussian officer to his family, July 1866",
          "We were moved to the frontier by railway in a few days and every regiment arrived with its supplies. At Königgrätz our infantry fired three shots for the Austrians' one, because we load the needle gun lying down. The enemy fought bravely but they were badly led."),
        source("Source D", "a cartoon of the kind published in a German newspaper in 1866, described in words (a fictional cartoon)",
          "Two figures stand beside a map. One, labelled 'Prussia', holds a rifle in one hand and with the other offers a handshake to a figure labelled 'Italy'. Behind them, a figure labelled 'Austria' looks round in alarm, and the figures of France and Russia stand by, with their arms folded.", { described: true }),
      ]),
    ].join("\n"),
    parts: checkExam(C1, [
      P.manual({
        label: "(a)", marks: 15, type: "EXTENDED_RESPONSE", levels: levels(15, "sources"),
        stem: "Compare Sources A and B as evidence about attitudes towards the policies of Prussia in the 1860s.",
        points: [
          ["Similarity: both criticise or fear Prussian policy; A for ignoring the constitution, B for gaining the larger share and being a danger to Austria", 3],
          ["Difference: A is domestic and constitutional (budget and army); B is foreign policy (Gastein, alliances)", 3],
          ["Difference in viewpoint: A is a Prussian liberal who opposes the government from within; B is an Austrian observer who fears Prussia from outside", 3],
          ["Explanation from provenance: A is a speech to the Landtag, for effect, in 1863 during the budget crisis; B is a newspaper editorial in 1865 after Gastein, written for an Austrian public", 3],
          ["Evaluation using context: the gap theory and governing without a budget, and the Gastein arrangement, support both; they show different parts of Bismarck's methods", 3],
        ],
        modelAnswer: "Both sources show opposition to the policies of Prussia, but from different positions. Source A, a liberal deputy, criticises the enlargement of the army and the collection of taxes without a budget and calls it a defiance of the constitution. Source B, an Austrian editorial, accepts that Prussia has gained the larger share of the duchies at Gastein and fears that Austria is without allies, advising that Prussia's railways and Italy's movements be watched. Both therefore see Prussian policy as a threat, in one case to constitutional rights and in the other to Austria's position.\n\nThe differences are mainly of subject and viewpoint. A concerns domestic policy: the army reform and Bismarck's use of the gap theory to govern without a budget. B concerns foreign policy: the arrangement at Gastein of August 1865 and the diplomatic isolation of Austria. A is the view of a Prussian opponent who hopes to change the government; B is the view of an outsider assessing the balance of power.\n\nProvenance explains these differences. A is a speech to the Landtag in 1863, in the middle of the constitutional crisis, intended to persuade and to rally liberal opinion, so it is emphatic. B is a newspaper editorial written after Gastein for an Austrian audience, and it reflects the anxiety of a government whose position was weakening, though it is also the voice of a journalist and not an official.\n\nContext supports both. After 1862 Bismarck did collect taxes and reform the army without a legal budget, and at Gastein Prussia did gain the stronger position, with Holstein surrounded by Prussian land. The sources are complementary: A is useful for domestic opposition and B for Austria's growing insecurity. Neither shows the preparations Bismarck was making, such as the contacts with Napoleon III and Italy, so neither shows his methods in full.",
      }),
      P.manual({
        label: "(b)", marks: 25, type: "EXTENDED_RESPONSE", levels: levels(25, "sources"),
        stem: "How far do Sources A to D support the view that Prussia's victory over Austria in 1866 was due mainly to military strength and not to diplomacy?",
        points: [
          ["Support for military strength: C (railways, supply, needle gun, better leadership); A (the army had been enlarged and reformed, although the speaker opposes it)", 4],
          ["Support for diplomacy: B (Austria has no ally among the great powers) and D (Italy allied, France and Russia standing aside)", 4],
          ["Evaluation of provenance: C a participant's letter after victory, possibly proud; D a cartoon in a Prussian-leaning press; B an Austrian editorial; A a hostile speech", 4],
          ["Own knowledge of military factors: Roon's reforms, Moltke's planning, railways and telegraph, the needle gun, Königgrätz on 3 July 1866", 4],
          ["Own knowledge of diplomacy: Russia's friendliness, Biarritz, the alliance with Italy of 8 April 1866, the Schleswig-Holstein affair and Gastein", 4],
          ["Links between army and diplomacy, and a judgement of extent supported by sources and knowledge", 5],
        ],
        modelAnswer: "The sources suggest that military strength was important, but they and my knowledge show that diplomacy was also essential, so the view is only partly supported.\n\nSource C most clearly supports the view. A Prussian officer writes that the army was moved to the frontier by railway in a few days with its supplies, that the needle gun gave a fire advantage, and that the Austrians were badly led. This agrees with what is known: Moltke planned the use of railways and the telegraph, and the breech-loading rifle helped the infantry at Königgrätz on 3 July 1866. Source A also, indirectly, supports the military view, since the deputy complains that the army had been enlarged without consent; the reform that Roon and the king pushed through provided the force that won the war. However, A is hostile to the government, and the writer does not say that the army was effective.\n\nSources B and D support the importance of diplomacy. Source B, an Austrian editorial, admits that Austria has no ally among the great powers and urges attention to the Italians and the railways. Source D shows Prussia allied with Italy while France and Russia stand aside. My own knowledge supports this: Bismarck kept Russia friendly after 1863, met Napoleon III at Biarritz in October 1865 and left him hoping for compensation, and signed the alliance with Italy on 8 April 1866, which forced Austria to fight on two fronts. He also arranged the quarrel over Schleswig-Holstein, after the Convention of Gastein, so that Austria appeared to be the aggressor.\n\nProvenance affects the weight of each source. C is a private letter from a participant, written just after victory, so he may exaggerate the efficiency of his own army. D is a cartoon, which simplifies, and is hostile to Austria. B is an editorial, which shows opinion in Vienna but not government policy. A is a speech made for effect.\n\nWeighing these, I conclude that the sources only partly support the view. The army was the instrument which won the war in seven weeks, and without railways, the needle gun and good staff work Prussia might not have won. But the army fought a war that diplomacy had made possible: Austria was isolated, fought a second front in Italy, and had no help from France or Russia. The two causes were also linked, because the diplomatic isolation gave the army the chance to fight a short war. Military strength was therefore the more immediate cause of victory, but diplomacy was equally necessary.",
      }),
    ]),
    hints: ["For (b), group the sources by what they support, weigh them by provenance, and test with your own knowledge."],
    explanation: "All four sources are invented. The mark scheme and levels are our own wording; a reviewer should compare them with Cambridge specimen mark schemes.",
  });

  // ---- Paper 2, key question 2.1 ----
  b.struct({
    d: 5, skill: C2.skill, applies: C2.applies, secs: C2.secs, examStyle: true, paper: "Paper 2",
    concepts: ["ahist.germany.vienna-to-1848"],
    stem: "Liberalism and nationalism in Germany, 1815-71. Answer both questions.",
    parts: checkExam(C2, [
      P.manual({
        label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", levels: levels(10),
        stem: "Explain why nationalism grew in the German states in the 1830s and 1840s.",
        points: [
          ["The influence of the 1830 revolutions and of events such as the Hambach Festival of 1832, which showed popular feeling", 3],
          ["Universities, songs, festivals and the press spread nationalist ideas despite the Carlsbad Decrees and the Six and Ten Articles", 3],
          ["Economic links through the Zollverein and railways created a sense of a common space", 2],
          ["Crises such as the Rhine crisis of 1840 and the dispute over Schleswig-Holstein stirred feeling against foreign powers", 2],
        ],
        modelAnswer: "Nationalism grew for several reasons. The first was the example of the 1830 revolutions in France and Belgium, which led to disturbances in several German states and in May 1832 to the Hambach Festival, where tens of thousands demanded freedom and unity. This showed that nationalism was no longer limited to students. The governments' repression, the Six and Ten Articles, ironically gave nationalists a common grievance against the princes.\n\nSecond, nationalist ideas spread through universities, songs, gymnastic and choral societies and the press, which censorship could not wholly stop, because ideas moved by letters, books and travellers. Third, economic change drew the states together: the Zollverein of 1834 created a larger market, and railways, which grew from the 1830s, moved people and newspapers, giving Germans a sense of living in a common space. Finally, foreign threats stirred feeling. The Rhine crisis of 1840 produced patriotic songs about the Rhine, and the dispute over Schleswig-Holstein with Denmark in the 1840s showed that the interests of Germans could be threatened. The most important reason was probably the spread of ideas through the educated middle class, helped by economic change, which gave nationalism a base that repression could not remove.",
      }),
      P.manual({
        label: "(b)", marks: 20, type: "EXTENDED_RESPONSE", levels: levels(20),
        stem: "To what extent were economic problems the main cause of the revolutions of 1848 in the German states?",
        points: [
          ["Economic problems: the potato blight and poor harvests of 1845-47, high food prices, the crisis of 1846-47, the Silesian weavers' revolt of 1844, unemployment among artisans", 5],
          ["Impact of urbanisation and industrialisation on skilled workers and the growth of poverty", 3],
          ["Political causes: the Carlsbad Decrees, the Six and Ten Articles, the failure of the Confederation, liberal demands for constitutions and a free press, the example of Paris", 5],
          ["Nationalism: growth of nationalist feeling in the 1840s and demand for a united Germany", 3],
          ["Evaluation: links between causes, trigger and underlying causes, and a supported judgement", 4],
        ],
        modelAnswer: "Economic problems were an important cause of the 1848 revolutions, especially of their timing and their mass support, but they were not the main cause in the sense of explaining the demands made. Political and national grievances were the underlying causes, and economic distress turned discontent into action.\n\nThe economic case is strong. The potato blight of 1845 and poor grain harvests of 1846-47 raised food prices sharply, and an industrial and financial slump in 1846-47 caused unemployment. Artisans were hurt by factory competition, and in 1844 the Silesian weavers had revolted against low wages. Urbanisation had crowded poor people into towns such as Berlin and Cologne, and industrialisation weakened the position of skilled workers. These groups provided many of the crowds on the barricades in March 1848, and without hardship the movement might not have spread so fast.\n\nHowever, the demands of 1848 were political. Since 1819 the Carlsbad Decrees had censored the press and restricted the universities, and after Hambach the Six and Ten Articles of 1832 restricted assemblies and associations. The Confederation had no elected body, and liberals wanted constitutions, a free press and trial by jury. Nationalists wanted a united Germany, and nationalism had grown in the 1840s, through the Rhine crisis of 1840 and the Schleswig-Holstein dispute. The February revolution in Paris set the spark for the meetings in the south-west. In the United Diet of 1847 the Prussian liberals showed that they wanted representation regardless of hunger.\n\nThe two kinds of cause were also connected. Railways and the Zollverein created a larger middle class, which wanted a voice, and distress made poor people ready to follow them. I conclude that economic distress was the immediate trigger and explains why the revolutions came in 1848 and attracted mass support, but that political and national grievances were the underlying causes and decided what the revolutionaries asked for, so economic problems were not the main cause.",
      }),
    ]),
    hints: ["For (b), compare economic with political and national causes, and separate trigger from underlying cause."],
    explanation: "Levels and indicative content are our own wording; a reviewer should compare them with Cambridge Paper 2 mark schemes.",
  });

  // ---- Paper 2, key question 2.2 ----
  b.struct({
    d: 5, skill: C2.skill, applies: C2.applies, secs: C2.secs, examStyle: true, paper: "Paper 2",
    concepts: ["ahist.germany.revolutions-1848-49", "ahist.germany.austria-prussia-1850-62"],
    stem: "Liberalism and nationalism in Germany, 1815-71. Answer both questions.",
    parts: checkExam(C2, [
      P.manual({
        label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", levels: levels(10),
        stem: "Explain why the Frankfurt Parliament failed to create a united Germany.",
        points: [
          ["It had no army, revenue or administration and depended on the princes' forces", 3],
          ["It was slow and divided over Grossdeutsch and Kleindeutsch solutions, and over Schleswig-Holstein", 3],
          ["Friedrich Wilhelm IV refused the crown on 3 April 1849 and Austria recovered", 2],
          ["Its members were mostly middle class and lacked support among peasants and workers", 2],
        ],
        modelAnswer: "The Frankfurt Parliament failed mainly because it had no power of its own. It had no army, no tax revenue and no administration, so it relied on the forces of the princes, as in Schleswig-Holstein, where Prussia accepted the Malmö armistice of 1848 without consulting it. When the princes recovered, it could not enforce its decisions.\n\nIt was also divided and slow. The deputies spent months debating basic rights and the frontiers of Germany. They could not agree on whether Austria should be included, and by the time they chose a Kleindeutsch solution in 1849 Austria, which refused to divide its empire, had recovered its strength. Disputes over Schleswig-Holstein further showed its weakness.\n\nFinally, the decisive blow was the refusal of the crown by Friedrich Wilhelm IV on 3 April 1849, since he would not accept a crown from an elected assembly. Without a ruler to lead the new state, the constitution had no force, and the moderates left. The Parliament also lacked broad support, as most deputies were from the educated middle class and the peasants had been satisfied by the end of feudal dues. The most important reason was the lack of power, which made the king's refusal fatal.",
      }),
      P.manual({
        label: "(b)", marks: 20, type: "EXTENDED_RESPONSE", levels: levels(20),
        stem: "How far was the failure of the 1848-49 revolutions caused by the weaknesses of the Frankfurt Parliament?",
        points: [
          ["Weaknesses of the Parliament: no army or revenue, a slow procedure, narrow social base, divisions over Austria and Schleswig-Holstein", 5],
          ["Strength of the conservatives: loyal armies, Windischgrätz in Prague and Vienna, Radetzky in Italy, Russian help in Hungary, Austria's recovery under Schwarzenberg", 5],
          ["Divisions among the revolutionaries: liberals against democrats, workers and peasants, and the withdrawal of the peasants", 3],
          ["The role of Friedrich Wilhelm IV: concession in March 1848, dissolution of the Prussian assembly in December, refusal of the crown", 3],
          ["Evaluation: relative importance and a supported judgement", 4],
        ],
        modelAnswer: "The weaknesses of the Frankfurt Parliament were a significant reason for the failure of the revolutions, but the strength of the conservatives was more fundamental, since even a better parliament could not have succeeded without the loyalty of the armies.\n\nThe Parliament's weaknesses were serious. It was elected in the spring of 1848 and opened on 18 May, but it had no army, revenue or officials. It depended on the Prussian army in Schleswig-Holstein and had to accept the Malmö armistice. It debated for months on rights and constitution, while the Austrian and Prussian governments recovered. It was divided over whether to include Austria, and its deputies were mainly from the educated middle class, with few peasants or workers. Its offer of the crown to Friedrich Wilhelm IV, who refused on 3 April 1849, showed that it had no way to impose a solution.\n\nBut the conservatives were strong. The armies stayed loyal. General Windischgrätz crushed the Prague rising in June 1848 and retook Vienna in October, when Robert Blum was shot, and Radetzky defeated Piedmont in northern Italy. With Russian help Austria crushed the Hungarian revolution in 1849, and Schwarzenberg's government refused to let Austria be divided. In Prussia the king, who had given way in March, brought troops back to Berlin in November and dissolved the assembly in December, issuing his own constitution. The final risings in Saxony, the Palatinate and Baden were suppressed by Prussian troops in 1849.\n\nThe revolutionaries were also divided. Liberals feared democrats and workers, who wanted a republic and social reform, and they looked to the princes for order. Artisans wanted guild protection, which clashed with the free-trade views of the middle class, and the peasants withdrew when feudal dues were abolished.\n\nThe two kinds of cause were linked, because the Parliament's weakness was largely a result of the continued power of the rulers, who held the armies. I conclude that the Parliament's weaknesses made failure likely, but the strength of the conservatives, and especially the loyalty of the armies and the recovery of Austria, made failure certain; they were the more important cause.",
      }),
    ]),
    hints: ["For (b), weigh the Parliament's weaknesses against the strength of the conservatives."],
    explanation: "Levels and indicative content are our own wording; a reviewer should compare them with Cambridge Paper 2 mark schemes.",
  });

  // ---- Paper 2, key question 2.3 ----
  b.struct({
    d: 5, skill: C2.skill, applies: C2.applies, secs: C2.secs, examStyle: true, paper: "Paper 2",
    concepts: ["ahist.germany.bismarck-to-1866"],
    stem: "Liberalism and nationalism in Germany, 1815-71. Answer both questions.",
    parts: checkExam(C2, [
      P.manual({
        label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", levels: levels(10),
        stem: "Explain why Bismarck was appointed Minister-President of Prussia in 1862.",
        points: [
          ["Wilhelm I's army reforms were opposed by the liberal Landtag, which refused the budget, and the German Progressive Party won elections in 1861 and 1862", 4],
          ["The king was close to abdication and the ministers could find no solution", 3],
          ["Roon recommended Bismarck as a man who would govern without a budget and defend the monarchy", 3],
        ],
        modelAnswer: "Bismarck was appointed because of a constitutional crisis. When Wilhelm I became king in 1861 he and his War Minister, Roon, wanted to enlarge the army and reduce the role of the Landwehr. The liberal majority in the Landtag, led by the German Progressive Party, which won the elections of 1861 and 1862, refused to vote the funds in full, because they wanted control of the budget and disliked an army loyal only to the king.\n\nIn September 1862 the Landtag rejected the military budget again. The king believed that his authority was in question and thought of abdicating, and his ministers could not find a compromise. Roon, who had known Bismarck for years, advised the king to appoint him, as Bismarck was ambassador in Paris and was a conservative royalist who would take a hard line. On 23 September he became Minister-President, and he governed using the gap theory, collecting taxes without a budget. The most important reason was therefore the deadlock between the king and the Landtag, which made the king turn to a man who would break it.",
      }),
      P.manual({
        label: "(b)", marks: 20, type: "EXTENDED_RESPONSE", levels: levels(20),
        stem: "How far was Bismarck's diplomacy the main reason for the defeat of Austria by Prussia in 1866?",
        points: [
          ["Diplomacy: Schleswig-Holstein and Gastein, Russia's friendship, Biarritz, the alliance with Italy, the proposal for a German parliament", 5],
          ["Military factors: Roon's reforms, Moltke's planning, railways, telegraph and needle gun, Königgrätz", 5],
          ["Economic factors: Prussian industrial and financial strength and the Zollverein compared with Austria's weak finances", 3],
          ["Austrian weaknesses: isolation, defeat in Italy in 1859, the choice of Benedek and the war on two fronts", 3],
          ["Evaluation: relative importance and a supported judgement", 4],
        ],
        modelAnswer: "Bismarck's diplomacy was important in the defeat of Austria, but the strength of the Prussian army was the more immediate cause, and the two were closely connected.\n\nBismarck's diplomacy created favourable conditions. By joining Austria against Denmark in 1864 he drew it into the Schleswig-Holstein question, and the Convention of Gastein of 1865 made a quarrel possible whenever he wished. He kept Russia friendly, in part by Prussia's support in the Polish revolt of 1863, and met Napoleon III at Biarritz in October 1865, leaving him hoping for compensation and expecting a long war. The alliance with Italy of 8 April 1866 forced Austria to fight in two places. By proposing a parliament elected by all men, he also appealed to liberals. These moves isolated Austria and ensured that the war would be fought between the two alone.\n\nBut the war was won by the army. Roon's reforms, which Bismarck protected against the Landtag, enlarged the army, and Moltke planned its mobilisation by railway and telegraph. The breech-loading needle gun gave the infantry a fire advantage, and at Königgrätz on 3 July 1866 the Austrians under Benedek were defeated. The war ended in seven weeks. Behind the army lay economic strength: through the Zollverein, which Austria did not join, and the growth of coal, iron and railways, Prussia could pay for and equip its forces, while Austria was burdened by debt. Austria also suffered from weaknesses of its own, such as its isolation since the Crimean War and its defeat in 1859.\n\nThe causes were connected. Diplomacy ensured that Prussia faced Austria alone, but only an army capable of a swift victory could use that chance; had the Prussian army failed, French intervention might have followed. I conclude that diplomacy was a necessary condition, but that the army, supported by economic strength, was the main cause of victory, because it won the war quickly.",
      }),
    ]),
    hints: ["For (b), weigh diplomacy against the army and economic strength, and show how they are linked."],
    explanation: "Levels and indicative content are our own wording; a reviewer should compare them with Cambridge Paper 2 mark schemes.",
  });

  // ---- Paper 2, key question 2.4 ----
  b.struct({
    d: 5, skill: C2.skill, applies: C2.applies, secs: C2.secs, examStyle: true, paper: "Paper 2",
    concepts: ["ahist.germany.unification-1871"],
    stem: "Liberalism and nationalism in Germany, 1815-71. Answer both questions.",
    parts: checkExam(C2, [
      P.manual({
        label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", levels: levels(10),
        stem: "Explain why war broke out between France and Prussia in 1870.",
        points: [
          ["Napoleon III's wish for prestige and compensation after 1866, shown in the Luxemburg crisis", 3],
          ["The Hohenzollern candidature to the Spanish throne and French fear of encirclement", 3],
          ["The Ems Telegram, edited by Bismarck, and French demands", 4],
        ],
        modelAnswer: "Relations between France and Prussia worsened after 1866. Napoleon III had received nothing for his neutrality and wished to restore his prestige, and the Luxemburg crisis of 1867 ended with a diplomatic defeat for France. Many French people feared the growth of Prussian power.\n\nIn 1870 the throne of Spain was offered to Prince Leopold of Hohenzollern-Sigmaringen, a relative of the Prussian king, whom Bismarck encouraged to accept. France, fearing Hohenzollern rulers on two frontiers, protested, and on 12 July Leopold's candidature was withdrawn. But the French government then demanded a guarantee for the future, and its ambassador Benedetti asked King Wilhelm at Ems on 13 July. The king refused politely and informed Bismarck by telegram. Bismarck shortened the message so that it seemed that the king had rudely dismissed the ambassador and published it; in Paris crowds demanded war, and in Germany people were angered. France declared war on 19 July.\n\nThe immediate cause was thus the Ems Telegram and the French reaction, but the underlying reasons were the hostility created by earlier events and the French fear of a united Germany.",
      }),
      P.manual({
        label: "(b)", marks: 20, type: "EXTENDED_RESPONSE", levels: levels(20),
        stem: "To what extent was Bismarck's planning the main reason why German unification was achieved by 1871?",
        points: [
          ["Bismarck's actions: the Luxemburg crisis, the Hohenzollern candidature, the Ems Telegram and the isolation of France, the lenient treatment of Austria", 5],
          ["Other factors: Prussian military strength and Moltke, the weakness and mistakes of France, and the lack of international support for France", 5],
          ["Nationalism and the south German states: the Zollparlament, secret alliances of 1866 and the patriotic reaction to the war", 4],
          ["Historians' views on whether Bismarck planned or exploited events", 2],
          ["Evaluation: a supported judgement", 4],
        ],
        modelAnswer: "Bismarck's actions were an important reason why unification was completed in 1871, but it is doubtful that he planned it, and other factors were equally important.\n\nThe case for Bismarck's planning rests on his actions. After 1866 he made secret alliances with the south German states and let nationalist opinion react to the Luxemburg crisis of 1867 so that Napoleon III appeared the aggressor. In 1870 he encouraged Leopold of Hohenzollern to accept the Spanish throne and edited the Ems Telegram, making France declare war on 19 July. He had earlier ensured that Austria, treated mildly after Königgrätz, and Russia would not help France.\n\nHowever, many of the conditions were not of his making. The Prussian army, reformed by Roon and directed by Moltke, was far better organised than the French and used railways to mobilise quickly; Krupp artillery was superior. France was isolated, partly through its own diplomatic mistakes: Britain was alienated when Bismarck published a French draft treaty on Belgium, and Italy was angry about the French garrison in Rome. The war was declared by France, not Prussia, and Napoleon III and his foreign minister Gramont made new demands after Leopold withdrew on 12 July, when they might have accepted a success.\n\nNationalism and the south mattered. The Zollparlament elections of 1868 had shown that particularism was strong, so peaceful unification was unlikely; it was the war against France, with the south bound by its alliances and roused by anger at France, that brought Bavaria, Württemberg, Baden and Hesse-Darmstadt into the empire in November 1870 and January 1871.\n\nHistorians disagree about whether Bismarck planned or exploited events. Some argue that he provoked the war to unite Germany; others that he took opportunities as they came and that French decisions were crucial. I conclude that Bismarck was a skilful opportunist who shaped events, and his actions in July 1870 made war with France likely, but unification depended also on Prussian military strength, French mistakes and German nationalism, so his planning was not the main reason.",
      }),
    ]),
    hints: ["For (b), compare Bismarck's actions with military, French and nationalist factors, and decide whether he planned or exploited events."],
    explanation: "Levels and indicative content are our own wording; a reviewer should compare them with Cambridge Paper 2 mark schemes.",
  });

  // ---- Paper 3, extract 1 ----
  b.essay({
    d: 5, skill: C3.skill, applies: C3.applies, secs: C3.secs, examStyle: true, marks: 40, paper: "Paper 3",
    concepts: ["ahist.ww1.long-term-causes", "ahist.ww1.july-crisis", "ahist.ww1-debate.modern-interpretations"],
    stem: [
      extract("By 1914 the great powers had built machines which they could no longer control. Conscript armies, vast reserves and railway timetables meant that mobilisation, once begun, could not easily be stopped, and every general's plan assumed that the first to move would win. The German plan, which required a swift attack on France through Belgium, left no room for negotiation after Russia mobilised. The French and Russian plans were no less offensive. When the statesmen of July tried to bargain, they discovered that the soldiers had already decided the order of events. This does not mean that the statesmen were innocent. They had accepted the logic of these plans in the years before 1914 and had encouraged the arms race. But the war was made less by wicked intentions than by the systems of military planning which gave the crisis its speed. In such a world, a murder in a provincial town could, in five weeks, bring down the peace of a continent."),
      "",
      "What can you learn from this extract about the interpretation and approach of the historian who wrote it? Use the extract and your knowledge of the origins of the First World War to explain your answer.",
    ].join("\n"),
    points: [
      ["Interpretation: the war resulted from military plans and mobilisation timetables, which reduced the time for diplomacy; shared responsibility; intentions less important", 5],
      ["Approach: structural, concentrating on systems (plans, railways, armies) more than on aims or individuals; the statesmen share the blame for accepting the logic", 5],
      ["Knowledge supporting: the Schlieffen Plan, Plan XVII, Russian mobilisation of 29-30 July, German ultimatums and declarations of 1-3 August, the arms race of 1912-13", 5],
      ["Knowledge supporting on the speed of the crisis and the role of Moltke and the generals", 5],
      ["Knowledge testing: the blank cheque, the Austrian ultimatum, the refusal of Grey's conference, which were political decisions, and the Fischer argument that German aims mattered", 5],
      ["Knowledge testing: earlier crises settled peacefully, contingency and individual decisions, and modern views (Clark, MacMillan) on political leaders' choices", 5],
      ["Testing the approach: what it leaves out, such as the Balkans, nationalism and domestic politics", 5],
      ["Evaluation of the extract as a whole: how far the interpretation is convincing", 5],
    ],
    levels: levels(40, "interpretation"),
    wordLimit: { min: 600, max: 1300 },
    hints: ["State the argument and approach, support them from the extract, then test them with specific knowledge."],
    modelAnswer: `The extract argues that the First World War was caused less by the intentions of governments than by the systems of military planning that gave the crisis of July 1914 its speed. The historian's approach is structural: he looks at plans, railway timetables and mobilisation, and treats the statesmen as men who had accepted the logic of those systems rather than as plotters. He does not exonerate them, since they accepted the plans and fed the arms race, but he sees responsibility as shared and the war as the product of a system.

The extract's main claim is that mobilisation, once begun, could not easily be stopped, and that every plan assumed that the first to move would win. It cites the German plan for a swift attack on France through Belgium, which left no room for negotiation after Russia mobilised, and notes that French and Russian plans were also offensive. The conclusion, that a murder in a provincial town could bring down the peace of a continent in five weeks, expresses an interpretation of speed and structure.

My knowledge supports much of this. The Schlieffen Plan assumed that Russia would be slow to mobilise, so France must be defeated in about six weeks; when Russia ordered general mobilisation on 30 July, Germany demanded that it stop and declared war on 1 August, and on France on 3 August, and its invasion of Belgium on 4 August brought Britain in. France's Plan XVII proposed an offensive into Alsace-Lorraine, and Russia's mobilisation could not easily be limited to the Austrian frontier. The arms race of 1912-13, with new army laws in Germany and France and Russia's expansion, shows how the statesmen had accepted the military logic. The speed of the crisis, from the ultimatum of 23 July to the declarations of early August, left little time for diplomacy, as the extract claims.

However, the interpretation can be tested. The political decisions mattered. Germany gave Austria the blank cheque on 5-6 July, Austria sent an ultimatum designed to be rejected, and Germany declined Grey's proposal for a conference. Those were choices made before the military timetables took over, and they suggest that intentions mattered more than the extract allows. Fritz Fischer's argument that German leaders pursued world power and risked war, and the criticism of the structural approach by historians who stress German responsibility, such as Röhl and Mombauer, challenge the view that intentions were secondary. In addition, earlier crises in 1905, 1908 and 1911 had been settled although the plans existed, so the plans alone did not make war certain; the contingency of the Sarajevo assassination and the decisions of individuals such as the Kaiser and the Tsar are stressed by Clark and MacMillan.

The approach also leaves things out. It says little about the Balkans, where Serbian nationalism and Austrian fear of Slav unrest produced the crisis, about the alliance blocs, or about the domestic politics of the powers. It treats the military planners as the key actors and underrates the role of civilian leaders.

Overall, the extract is convincing about the speed and escalation of the crisis and the way the plans reduced choices, and it fits the view of shared responsibility associated with the revisionist historians of the 1920s and the structural historians. It is less convincing as a full account of the causes, because it understates the decisions of Berlin and Vienna in July and the political aims behind the plans. It is best seen as a partial interpretation that explains how the war spread, but not why the crisis began or why it was not settled.`,
    explanation: "The extract is invented. Levels and indicative content are our own wording; a reviewer should compare them with Cambridge Paper 3 mark schemes.",
  });

  // ---- Paper 3, extract 2 ----
  b.essay({
    d: 5, skill: C3.skill, applies: C3.applies, secs: C3.secs, examStyle: true, marks: 40, paper: "Paper 3",
    concepts: ["ahist.ww1.long-term-causes", "ahist.ww1.july-crisis", "ahist.ww1-debate.responsibility-fischer"],
    stem: [
      extract("The crisis of 1914 began in the Balkans, and it is in the Balkans that its origin must be sought. For a generation the Habsburg monarchy had watched Serbia grow in size and ambition, and it believed, with some reason, that Serbian nationalism threatened the empire's existence. The murder at Sarajevo gave Vienna the occasion to act. Its ultimatum was drafted so that Serbia could not accept it, and the government in Vienna was determined to have its war. It received Germany's promise of support in the knowledge that Russia might intervene. Berlin must share the blame for that promise, but it was a promise to an ally who had already made up its mind. The great powers did not stumble into war: Austria chose it, Germany permitted it and Russia and France, each for its own reasons, declined to stop it. The long-term tensions of the age, the naval race and the Moroccan crises, were distractions from the real source of the war, which lay in the old quarrel between Vienna and Belgrade."),
      "",
      "What can you learn from this extract about the interpretation and approach of the historian who wrote it? Use the extract and your knowledge of the origins of the First World War to explain your answer.",
    ].join("\n"),
    points: [
      ["Interpretation: the war originated in the Austro-Serbian quarrel; Austria chose war, Germany permitted it, and the other powers did not stop it", 5],
      ["Approach: concentrates on short-term decisions and the Balkan origin, and dismisses long-term tensions (naval race, Morocco) as distractions", 5],
      ["Knowledge supporting: Austrian fear of Serbian nationalism, the annexation of Bosnia in 1908, the Balkan Wars, the Black Hand, the ultimatum of 23 July drafted to be rejected", 5],
      ["Knowledge supporting: Berchtold and Conrad pressed for war, Tisza was persuaded, the declaration of war on 28 July", 5],
      ["Knowledge testing: the blank cheque and German responsibility (Fischer), the German refusal of mediation, Russia's mobilisation and French support, which the extract treats briefly", 5],
      ["Knowledge testing: the role of the long-term tensions, alliances and war plans that turned a Balkan war into a European one; the Schlieffen Plan", 5],
      ["Testing the approach: Austria depended on German support, so the extract's separation of Vienna's choice from Berlin's promise can be challenged; modern views on contingency", 5],
      ["Evaluation of the extract as a whole: how far the interpretation is convincing", 5],
    ],
    levels: levels(40, "interpretation"),
    wordLimit: { min: 600, max: 1300 },
    hints: ["State the argument and approach, support them from the extract, then test them with specific knowledge."],
    modelAnswer: `The extract argues that the origin of the First World War lay in the quarrel between Austria-Hungary and Serbia. It holds that Austria chose war, that Germany permitted it by promising support and that Russia and France did not stop it. The historian's approach is to focus on the short-term decisions in July 1914 and on the Balkans as the source of the crisis; he dismisses the long-term tensions between the powers, the naval race and the Moroccan crises, as distractions. This is an interpretation which places the primary responsibility on Vienna, with Berlin sharing it, and it is based on an analysis of intention.

The extract is supported by much of my knowledge. Austria-Hungary feared the nationalism of Serbia, which had doubled its size in the Balkan Wars of 1912-13, and had annexed Bosnia-Herzegovina in 1908, to Serbia's anger. Secret groups such as the Black Hand worked to challenge Austrian rule, and after the assassination of Franz Ferdinand on 28 June, Berchtold and the chief of staff Conrad pressed for war; the Hungarian prime minister Tisza was persuaded. The ultimatum of 23 July was drafted so that Serbia could not accept it in full, in particular the demand for Austrian officials to take part in an inquiry on Serbian soil, and Austria declared war on 28 July although Serbia had conceded most of its demands. This confirms the claim that Vienna was determined to have its war.

But the approach has weaknesses. By treating the German promise as a response to an ally who had already decided, the extract understates the German role. Austria asked whether Germany would back it against Russia, and the blank cheque of 5-6 July encouraged Austria to act, since Vienna would hardly have risked war if Germany had refused its support. Germany then declined Grey's conference of 26 July and did not press Austria to halt in Belgrade. Fritz Fischer and historians who follow him, such as Röhl, see German aims and decisions as crucial. In addition, the extract passes quickly over Russia and France. Russia's mobilisation of 29-30 July and French support for it turned an Austro-Serbian war into a European one, and the German war plan, which required a quick attack on France through Belgium, ensured that it became a general war within days.

The dismissal of the long-term tensions is also open to question. The alliance blocs, the arms race and the war plans explain why a Balkan quarrel became a European war, and the sense of encirclement helps to explain Germany's willingness to take risks. Historians who emphasise structure would reject the extract's claim that these were distractions. Modern writers such as Clark would also stress the contingency of events and the way that several governments misjudged, which the extract's stress on intention does not reflect.

Overall, the extract is convincing about the Balkan origin and the part of Austria's leaders, and it correctly identifies the ultimatum as designed to provoke war. It is less convincing in treating the German promise as secondary and in dismissing the wider context. It is best seen as a Vienna-centred interpretation which explains why the crisis began, but is incomplete as an account of why it became a world war.`,
    explanation: "The extract is invented. Levels and indicative content are our own wording; a reviewer should compare them with Cambridge Paper 3 mark schemes.",
  });
});
