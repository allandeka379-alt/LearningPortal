// Slice W3b: Cambridge IGCSE History 0470 exam-format items on the two world wars.
// Paper 1 structured essays (10: causes of the First World War x2 [Section A, Option A KQ6], Depth study A x4, Depth
// study E x4 [Section B]); Paper 2 document questions (2: causes of the First World War, prescribed November 2028);
// Paper 4 (6: Depth study A x3, Depth study E x3). All sources are invented and labelled as such.
import { concept, P, source, sources, levels, EXAM, checkExam } from "../lib.mjs";

const C1 = EXAM.CAM_P1;
const C2 = EXAM.CAM_P2;
const C4 = EXAM.CAM_P4;
const p1a = { d: 4, skill: C1.skill, applies: C1.applies, secs: C1.secs, examStyle: true, paper: "Cambridge Paper 1 Section A" };
const p1b = { d: 4, skill: C1.skill, applies: C1.applies, secs: C1.secs, examStyle: true, paper: "Cambridge Paper 1 Section B" };
const p2 = { d: 5, skill: C2.skill, applies: C2.applies, secs: C2.secs, examStyle: true, paper: "Cambridge Paper 2" };
const p4 = { d: 5, skill: C4.skill, applies: C4.applies, secs: C4.secs, examStyle: true, paper: "Cambridge Paper 4" };
const X = "EXTENDED_RESPONSE";

concept("hist.ww1-origins.july-crisis", { file: "exam/w3b-cambridge", keyPrefix: "exam.w3b-cambridge" }, (b) => {
  // -------------------------------------------------------------------------------------------------------------------
  // Paper 1, Section A: causes of the First World War (Option A, key question 6).

  b.struct({
    ...p1a,
    concepts: ["hist.ww1-origins.alliances-arms-race"],
    stem: "**The alliance system and the arms race.** Answer all parts.",
    hints: ["(b) needs explained reasons, not a list.", "(c) weighs the alliances against other causes and reaches a judgement."],
    parts: checkExam(C1, [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the naval race between Britain and Germany before 1914.", points: [
        "German Navy Laws (1898, 1900) under Tirpitz built a battle fleet.",
        "Britain launched HMS Dreadnought (1906), making older battleships obsolete.",
        "Both built dreadnoughts; British public campaign for eight ships (1909).",
        "Talks to limit the race failed (1912); Britain stayed ahead in numbers.",
      ], explanation: "One mark per accurate point." }),
      P.manual({ label: "(b)", marks: 6, type: X, stem: "Explain why many Germans believed by 1907 that Germany was being encircled.", points: [
        ["The Franco-Russian Alliance (1894) placed possible enemies on both of Germany's borders, raising the threat of a two-front war.", 2],
        ["Britain settled its quarrels with France (1904) and Russia (1907), and backed France in the Moroccan crisis (Algeciras 1906), so the three powers drew together.", 2],
        ["Germany's only reliable ally was Austria-Hungary (Italy was doubtful), and German policies (Weltpolitik, the navy) had pushed Britain away.", 2],
      ], levels: levels(6), modelAnswer: "After Germany let its treaty with Russia lapse in 1890, Russia allied with France in 1894, so Germany faced possible enemies on both its western and eastern borders and the danger of a war on two fronts. Britain, which Germans had hoped would stay apart, then settled its colonial quarrels with France in 1904 and with Russia in 1907, and at the Algeciras Conference in 1906 it backed France against Germany. By 1907 France, Russia and Britain were linked in the Triple Entente. Germany's only reliable ally was Austria-Hungary, since Italy was on good terms with France and Britain. Many Germans blamed encirclement on their enemies, but German policies such as Weltpolitik and the naval building programme had themselves pushed Britain towards France and Russia.", explanation: "Developed explanation of several reasons reaches the top level." }),
      P.manual({ label: "(c)", marks: 10, type: X, stem: "\"The alliance system was the main cause of the First World War.\" How far do you agree with this statement? Explain your answer.", points: [
        ["Alliances: two armed camps; Germany's sense of encirclement.", 2],
        ["Alliances: linked a Balkan quarrel to the Great Powers in July 1914 (Russia for Serbia, Germany for Austria-Hungary, France for Russia).", 2],
        ["Other causes: the arms race and war plans (Schlieffen Plan); colonial rivalry; Balkan nationalism.", 2],
        ["Against: alliances were defensive and did not force war (Italy neutral; Britain uncommitted); decisions of July 1914 (blank cheque, ultimatum, mobilisation).", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "The alliance system was an important cause. By 1907 Europe was divided into the Triple Alliance and the Triple Entente, and Germany felt encircled by France and Russia. In July 1914 the alliances helped turn a quarrel between Austria-Hungary and Serbia into a general war: Russia backed Serbia, Germany backed Austria-Hungary, and France stood by Russia.\n\nHowever, other causes were at least as important. The arms race created fear, and the Schlieffen Plan meant that war with Russia automatically became war with France through Belgium. Colonial crises in Morocco had poisoned relations, and Balkan nationalism threatened Austria-Hungary. The alliances also did not force anyone to fight: Italy stayed neutral although it was in the Triple Alliance, and Britain had no binding promise to France. The decisions of July 1914 mattered most: Germany's blank cheque, Austria-Hungary's ultimatum and Russia's general mobilisation were choices made by leaders.\n\nI disagree that the alliances were the main cause. They explain how the war spread, but the war began because of the Balkan crisis and the decisions taken in July 1914, made more dangerous by military plans.", explanation: "Both sides and a supported judgement reach the top level." }),
    ]),
    explanation: "Cambridge 0470 Paper 1 style structured essay on the causes of the First World War (Option A, key question 6).",
  });

  b.struct({
    ...p1a,
    concepts: ["hist.ww1-origins.colonial-balkans", "hist.ww1-origins.july-crisis"],
    stem: "**The Balkans and the outbreak of war, 1908-1914.** Answer all parts.",
    hints: ["(b) should show each step from Sarajevo to a general war.", "(c) must weigh colonial problems against other sources of tension."],
    parts: checkExam(C1, [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the Bosnian crisis of 1908-09.", points: [
        "Austria-Hungary annexed Bosnia-Herzegovina in October 1908.",
        "It had occupied Bosnia since 1878.",
        "Serbia was angry because many Bosnians were Serbs; Russia protested.",
        "Germany backed Austria-Hungary and Russia backed down (March 1909), feeling humiliated.",
      ], explanation: "One mark per accurate point." }),
      P.manual({ label: "(b)", marks: 6, type: X, stem: "Explain how the assassination of Franz Ferdinand led to a general war.", points: [
        ["Austria-Hungary used the murder to crush Serbia, with Germany's blank cheque; ultimatum and declaration of war (28 July).", 2],
        ["Russia, determined not to be humiliated again, ordered general mobilisation (30 July).", 2],
        ["The Schlieffen Plan led Germany to declare war on Russia and France and invade Belgium, bringing in Britain (4 August).", 2],
      ], levels: levels(6), modelAnswer: "Austria-Hungary blamed Serbia for the murder and saw a chance to crush it. Once Germany had promised unconditional support on 5-6 July, Austria-Hungary sent an ultimatum it expected Serbia to reject, and declared war on 28 July. Russia, which had backed down in 1909, would not see Serbia crushed and ordered general mobilisation on 30 July. Germany's only war plan, the Schlieffen Plan, required it to defeat France before Russia was ready, so it declared war on Russia and France and invaded Belgium. Britain had guaranteed Belgian neutrality and declared war on 4 August, so a Balkan war had become a European one.", explanation: "Developed explanation of the chain of events reaches the top level." }),
      P.manual({ label: "(c)", marks: 10, type: X, stem: "How far did colonial problems create tension between the Great Powers before 1914? Explain your answer.", points: [
        ["Created tension: Moroccan crises (1905-06, 1911) brought France and Germany near war.", 2],
        ["Created tension: drew Britain and France together; German resentment ('place in the sun'); Fashoda.", 2],
        ["Limits: every colonial crisis was settled; Anglo-German agreements of 1913-14.", 2],
        ["Other tensions were greater: the Balkans (Bosnia, Balkan Wars), the naval race, the alliances.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Colonial problems did create tension. The two Moroccan crises of 1905-06 and 1911 brought France and Germany close to war, and each time Britain stood by France, so the entente grew closer and Germany felt isolated. Germany resented being denied a 'place in the sun', and the Fashoda crisis of 1898 had shown that colonial disputes could set even Britain and France against each other.\n\nHowever, colonial tension had limits. Every colonial crisis was settled by negotiation, and by 1913-14 Britain and Germany had reached agreements over the Baghdad railway and Portugal's colonies. Other problems caused deeper tension: the Bosnian crisis humiliated Russia, the Balkan Wars doubled Serbia's size and alarmed Austria-Hungary, and the naval race turned Britain against Germany.\n\nOverall, colonial problems created serious tension, especially by shaping the Anglo-French entente, but they were less dangerous than the Balkans, which involved the survival and prestige of Great Powers and produced the crisis of 1914.", explanation: "Both sides and a supported judgement reach the top level." }),
    ]),
    explanation: "Cambridge 0470 Paper 1 style structured essay on the causes of the First World War (Option A, key question 6).",
  });

  // -------------------------------------------------------------------------------------------------------------------
  // Paper 1, Section B: Depth study A, The First World War, 1914-18.

  b.struct({
    ...p1b,
    concepts: ["hist.ww1.schlieffen-stalemate"],
    stem: "**The Western Front, 1914.** Answer all parts.",
    hints: ["(b) needs reasons why defence was stronger than attack.", "(c) weighs Belgium against other reasons the plan failed."],
    parts: checkExam(C1, [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the Schlieffen Plan.", points: [
        "Designed to avoid fighting France and Russia at the same time.",
        "A strong right wing would sweep through Belgium and round Paris.",
        "France would be defeated in about six weeks.",
        "Troops would then move east by rail against Russia, expected to mobilise slowly.",
      ], explanation: "One mark per accurate point." }),
      P.manual({ label: "(b)", marks: 6, type: X, stem: "Explain why a defensive war had emerged on the Western Front by the end of 1914.", points: [
        ["Defensive firepower: machine guns, rifles and artillery cut down attackers in the open, so troops dug in.", 2],
        ["The race to the sea and First Ypres left no open flanks to outflank.", 2],
        ["Railways brought defending reserves faster than attackers could advance; both sides exhausted after heavy losses.", 2],
      ], levels: levels(6), modelAnswer: "Machine guns, magazine rifles and quick-firing artillery made it deadly to advance across open ground, so after the Marne the Germans dug in on high ground and the Allies did the same. Each side then tried to get round the other's northern flank in the race to the sea, but by the end of the First Battle of Ypres the lines stretched from the North Sea to Switzerland and there were no flanks left to turn. Railways also helped the defender, because reserves could be moved by train to plug a gap faster than attackers could advance on foot. By late 1914 both armies had lost huge numbers of men and neither was strong enough to break through.", explanation: "Developed explanation of several reasons reaches the top level." }),
      P.manual({ label: "(c)", marks: 10, type: X, stem: "\"Belgian resistance was the main reason why the Schlieffen Plan failed.\" How far do you agree? Explain your answer.", points: [
        ["Belgium: Liège held out for about twelve days and railways and bridges were destroyed; the plan had no spare time.", 2],
        ["Belgium: invading Belgium brought Britain and the BEF into the war (Mons).", 2],
        ["Other: faster Russian mobilisation; troops moved east before the Marne.", 2],
        ["Other: Moltke's changes; exhaustion and supply problems; the turn east of Paris; the French counter-attack at the Marne.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Belgian resistance played a part. The forts of Liège held out for about twelve days, and the Belgians blew up railways and bridges, delaying a plan that had no time to spare. Even more important, the invasion of Belgium brought Britain into the war, and the BEF delayed the Germans again at Mons.\n\nHowever, other reasons were more decisive. Russia mobilised faster than expected and invaded East Prussia, so Moltke moved troops east, weakening the right wing. Moltke had already weakened it before the war. German soldiers marched for weeks beyond their railheads and were exhausted and short of supplies, and when the right wing turned to pass east of Paris it exposed its flank. Joffre's counter-attack at the Marne then forced the Germans to retreat.\n\nI disagree with the statement. Belgian resistance caused an important delay and brought Britain in, but the plan failed mainly because of its own unrealistic timetable, Russia's speed and the French and British victory at the Marne.", explanation: "Both sides and a supported judgement reach the top level." }),
    ]),
    explanation: "Cambridge 0470 Paper 1 style structured essay on Depth study A (key question 1).",
  });

  b.struct({
    ...p1b,
    concepts: ["hist.ww1.trench-warfare"],
    stem: "**Trench warfare and the battles of 1916.** Answer all parts.",
    hints: ["(b) explains why the two battles mattered, not just what happened.", "(c) compares new weapons with other factors."],
    parts: checkExam(C1, [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the layout of a trench system on the Western Front.", points: [
        "Front-line, support and reserve trenches.",
        "Communication trenches linking the lines.",
        "Zig-zag pattern, fire-step, parapet, dugouts.",
        "Barbed wire in front; no man's land between the opposing lines.",
      ], explanation: "One mark per accurate point." }),
      P.manual({ label: "(b)", marks: 6, type: X, stem: "Explain the significance of the battles of Verdun and the Somme.", points: [
        ["Enormous losses (Verdun roughly 700,000 casualties; Somme about 57,000 British casualties on 1 July and over a million in total) showed the cost of attrition.", 2],
        ["The Somme relieved pressure on Verdun; France held Verdun, a symbol of national resistance.", 2],
        ["The German army was badly worn down; lessons learned (tanks, creeping barrage) shaped later tactics; shaped memory and views of generals.", 2],
      ], levels: levels(6), modelAnswer: "Both battles showed the terrible cost of attrition. Historians estimate roughly 700,000 casualties at Verdun, and on the first day of the Somme alone the British suffered about 57,000 casualties, with over a million on all sides by November. The Somme was significant because it relieved pressure on the French at Verdun, which France held, so Verdun became a symbol of French national resistance. Both battles also wore down the German army badly, and the British learned lessons, such as the use of tanks and creeping barrages, that shaped their later victories. In the long term the Somme in particular shaped how the war and its generals were remembered.", explanation: "Developed explanation of significance reaches the top level." }),
      P.manual({ label: "(c)", marks: 10, type: X, stem: "How important were new methods of warfare in breaking the stalemate on the Western Front? Explain your answer.", points: [
        ["Important: tanks massed at Cambrai (1917) and Amiens (1918); aircraft for reconnaissance and ground attack.", 2],
        ["Important: improved artillery (creeping barrage, accurate fire) and combined arms in the Hundred Days.", 2],
        ["Limited: gas never broke the stalemate; early tanks unreliable (1916).", 2],
        ["Other factors: German losses in the Spring Offensive; American troops; blockade; Foch's unified command.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "New methods of warfare did help to break the stalemate in 1918. Tanks, used in large numbers at Cambrai in 1917 and Amiens in 1918, could cross wire and trenches, and aircraft spotted for the artillery and attacked troops on the ground. Above all, the British and French learned to combine infantry, tanks, aircraft and accurate artillery with creeping barrages, which made the Hundred Days so successful.\n\nHowever, new weapons were not enough on their own. Gas never broke the stalemate because masks soon reduced its effect, and the first tanks of 1916 were slow and unreliable. The stalemate was broken in 1918 also because Germany had lost hundreds of thousands of its best troops in the failed Spring Offensive, American troops were arriving in large numbers, the blockade had weakened Germany, and Foch's unified command let the Allies use their reserves well.\n\nNew methods were important, but only when combined with each other and with German exhaustion and American manpower. Their importance lay less in any single weapon than in the new tactics that used them together.", explanation: "Both sides and a supported judgement reach the top level." }),
    ]),
    explanation: "Cambridge 0470 Paper 1 style structured essay on Depth study A (key question 1).",
  });

  b.struct({
    ...p1b,
    concepts: ["hist.ww1.world-war", "hist.ww1.other-fronts"],
    stem: "**Other fronts and a world war.** Answer all parts.",
    hints: ["(b) needs several explained reasons.", "(c) judges the war at sea by more than one measure."],
    parts: checkExam(C1, [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the contribution of Indian troops on the Western Front.", points: [
        "Indian divisions arrived in autumn 1914 and helped hold the line around Ypres.",
        "Khudadad Khan won the first Victoria Cross awarded to an Indian soldier (October 1914).",
        "The Indian Corps fought at Neuve Chapelle (March 1915) and Loos.",
        "Heavy losses and hardship; the infantry moved to other fronts at the end of 1915, the cavalry stayed.",
      ], explanation: "One mark per accurate point." }),
      P.manual({ label: "(b)", marks: 6, type: X, stem: "Explain why the Gallipoli campaign of 1915 failed.", points: [
        ["Lost surprise: the naval attack of March 1915 warned the Ottomans, who strengthened defences.", 2],
        ["Poor planning, maps and leadership; chances missed (Suvla Bay).", 2],
        ["Strong Ottoman defence of the heights (Mustafa Kemal); heat, disease and lack of water.", 2],
      ], levels: levels(6), modelAnswer: "The failed naval attack on the Dardanelles on 18 March 1915 warned the Ottomans, who had weeks to strengthen their defences before the landings of 25 April. Planning was poor: maps were inaccurate, some troops landed in the wrong places below steep cliffs, and commanders failed to exploit chances, as at Suvla Bay in August. The Ottoman defenders, well led by commanders such as Mustafa Kemal, held the high ground, while the attackers were weakened by heat, flies, shortages of water and dysentery, so the Allies finally withdrew in January 1916.", explanation: "Developed explanation of several reasons reaches the top level." }),
      P.manual({ label: "(c)", marks: 10, type: X, stem: "\"Britain won the war at sea.\" How far do you agree with this statement? Explain your answer.", points: [
        ["Germany's case: inflicted heavier losses at Jutland; U-boats nearly cut Britain's supplies in 1917.", 2],
        ["Britain's case: kept control of the North Sea after Jutland; the German fleet stayed in port.", 2],
        ["Britain's case: the blockade caused shortages and unrest in Germany.", 2],
        ["Britain's case: convoys defeated the U-boats; unrestricted submarine warfare brought the USA in.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Germany had some successes at sea. At Jutland in 1916 it sank more British ships and killed about twice as many men, and in 1917 unrestricted submarine warfare sank so much shipping that Britain came close to running short of food.\n\nHowever, Britain won the war at sea. After Jutland the German High Seas Fleet stayed mostly in port and never again seriously challenged the Grand Fleet, so Britain kept control of the North Sea. Its blockade cut Germany off from food and raw materials, causing hunger and unrest that weakened the German war effort. From 1917 convoys greatly reduced shipping losses, and Germany's decision to sink ships without warning brought the USA into the war.\n\nI agree. Germany won some battles at sea, but Britain achieved the aims that mattered: it kept its own supply lines open, moved troops from across the empire, strangled Germany with the blockade and defeated the U-boat threat.", explanation: "Both sides and a supported judgement reach the top level." }),
    ]),
    explanation: "Cambridge 0470 Paper 1 style structured essay on Depth study A (key questions 2 and 3).",
  });

  b.struct({
    ...p1b,
    concepts: ["hist.ww1.end-1918"],
    stem: "**The end of the war, 1918.** Answer all parts.",
    hints: ["(b) needs several reasons, each explained.", "(c) compares American entry with other reasons for the armistice."],
    parts: checkExam(C1, [
      P.manual({ label: "(a)", marks: 4, stem: "Describe events in Germany between late October and 11 November 1918.", points: [
        "Sailors refused to sail for a final battle; mutiny at Kiel in early November.",
        "Workers' and soldiers' councils took control in many cities.",
        "The Kaiser's abdication was announced on 9 November; a republic was proclaimed; Ebert became head of government.",
        "The Armistice was signed at Compiègne and took effect at 11 a.m. on 11 November.",
      ], explanation: "One mark per accurate point." }),
      P.manual({ label: "(b)", marks: 6, type: X, stem: "Explain why the German offensive of 1918 failed.", points: [
        ["Supply problems: stormtroopers advanced faster than food, ammunition and guns could follow.", 2],
        ["Heavy losses of irreplaceable elite troops; no clear objective as Ludendorff switched targets.", 2],
        ["Allied response: Foch's unified command and the arrival of American troops; hungry soldiers stopped to loot.", 2],
      ], levels: levels(6), modelAnswer: "The offensive gained ground quickly, but the stormtroopers advanced faster than food, ammunition and guns could be brought across the old battlefields, so each attack ran out of strength. Germany lost hundreds of thousands of men, including its best assault troops, and could not replace them, while Ludendorff kept switching the point of attack instead of concentrating on one decisive objective. The Allies, meanwhile, appointed Foch to coordinate their armies so reserves could be sent where needed, and American troops arrived in growing numbers. Hungry German soldiers also stopped to loot Allied supply dumps, which slowed the advance and damaged morale.", explanation: "Developed explanation of several reasons reaches the top level." }),
      P.manual({ label: "(c)", marks: 10, type: X, stem: "How important was American entry into the war in Germany's decision to ask for an armistice? Explain your answer.", points: [
        ["Important: over a million US troops in France by late 1918; supplies, food and loans.", 2],
        ["Important: the prospect of US troops forced the Spring Offensive gamble; morale effect.", 2],
        ["Other: failure of the Spring Offensive; the Hundred Days (Amiens, Hindenburg Line).", 2],
        ["Other: collapse of Bulgaria, the Ottomans and Austria-Hungary; blockade, hunger and revolution.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "American entry was very important. By the autumn of 1918 well over a million American soldiers were in France, with more arriving every month, and American food, materials and loans supported the Allies. German leaders knew the balance would only get worse, and the prospect of American troops was why Ludendorff gambled on the Spring Offensive.\n\nHowever, Germany asked for an armistice at the end of September mainly because it was being defeated on the battlefield. The Spring Offensive had failed and cost Germany its best troops; from Amiens on 8 August British Empire and French forces, with American help, drove the Germans back and broke the Hindenburg Line. Bulgaria asked for an armistice at the end of September, and Germany's other allies were collapsing. At home the blockade had caused hunger and unrest.\n\nAmerican entry was important because it made German victory impossible and shaped Germany's decisions in 1918, but the immediate reasons for the request were military defeat in the Hundred Days and the collapse of Germany's allies.", explanation: "Both sides and a supported judgement reach the top level." }),
    ]),
    explanation: "Cambridge 0470 Paper 1 style structured essay on Depth study A (key question 4).",
  });

  // -------------------------------------------------------------------------------------------------------------------
  // Paper 1, Section B: Depth study E, The Second World War in Europe and the Asia-Pacific.

  b.struct({
    ...p1b,
    concepts: ["hist.ww2.europe-1939-43"],
    stem: "**The war in Europe, 1940-1941.** Answer all parts.",
    hints: ["(b) needs several motives, each explained.", "(c) weighs what Germany controlled against what it did not."],
    parts: checkExam(C1, [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the evacuation from Dunkirk in 1940.", points: [
        "Allied armies were trapped after the German breakthrough to the Channel.",
        "Evacuation (Operation Dynamo) from 26 May to 4 June 1940.",
        "Navy ships and hundreds of small civilian boats; rearguards defended the perimeter.",
        "About 338,000 soldiers rescued, but most heavy equipment was left behind.",
      ], explanation: "One mark per accurate point." }),
      P.manual({ label: "(b)", marks: 6, type: X, stem: "Explain why Hitler invaded the Soviet Union in 1941.", points: [
        ["Lebensraum: land in the east for German settlement, a long-held aim.", 2],
        ["Ideology: hatred of communism and racial views of Slavs.", 2],
        ["Resources and strategy: Ukrainian grain and Caucasus oil; defeating the USSR would leave Britain without hope of an ally; belief the Red Army was weak.", 2],
      ], levels: levels(6), modelAnswer: "Hitler had long planned to win Lebensraum, living space for German settlers, in the east, and the Soviet Union's vast lands were the target. His ideology also drove the invasion: he saw communism as Germany's greatest enemy, and Nazi racial ideas treated Slavs as inferior people. There were practical reasons too: the grain of Ukraine and the oil of the Caucasus would supply Germany's war, and defeating the USSR would remove Britain's last hope of an ally in Europe. Hitler also believed the Red Army was weak after Stalin's purges and its poor performance against Finland, so he expected a quick victory.", explanation: "Developed explanation of several motives reaches the top level." }),
      P.manual({ label: "(c)", marks: 10, type: X, stem: "To what extent had Nazi Germany gained control of Europe by the end of 1940? Explain your answer.", points: [
        ["Control: Poland, Denmark, Norway, the Low Countries and France conquered (1939-40).", 2],
        ["Control: Vichy France collaborated; Italy an ally; USSR bound by the Nazi-Soviet Pact; Austria and Czechoslovakia already taken.", 2],
        ["Limits: Britain undefeated; Battle of Britain lost; Sea Lion postponed; the Royal Navy controlled the seas.", 2],
        ["Limits: the USSR independent and powerful; neutrals (Sweden, Switzerland, Spain); resistance beginning; Balkans not yet conquered.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "By the end of 1940 Germany controlled much of Europe. It had conquered Poland in 1939, then Denmark and Norway, the Netherlands, Belgium and France in 1940, on top of Austria and Czechoslovakia taken earlier. Pétain's Vichy regime collaborated, Italy was an ally, and the USSR was bound by the Nazi-Soviet Pact, supplying raw materials.\n\nHowever, Germany's control was far from complete. Britain had not been defeated: the Luftwaffe lost the Battle of Britain, Operation Sea Lion was postponed, and the Royal Navy still controlled the seas, with growing American support. The USSR remained independent and very powerful, and Hitler did not trust it. Sweden, Switzerland, Spain and Portugal were neutral, the Balkans were not yet conquered, and de Gaulle's Free French and early resistance groups refused to accept defeat.\n\nGermany dominated western and central Europe to a large extent, but it had not won the war: Britain undefeated in the west and the USSR in the east set clear limits to its control.", explanation: "Both sides and a supported judgement reach the top level." }),
    ]),
    explanation: "Cambridge 0470 Paper 1 style structured essay on Depth study E (key question 1).",
  });

  b.struct({
    ...p1b,
    concepts: ["hist.ww2.asia-pacific"],
    stem: "**The war in the Asia-Pacific, 1941-1942.** Answer all parts.",
    hints: ["(b) needs several explained reasons for the decision.", "(c) weighs air power against other reasons for Japanese success."],
    parts: checkExam(C1, [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the Japanese conquests in Southeast Asia, other than Malaya and Singapore, between December 1941 and May 1942.", points: [
        "Hong Kong was attacked in December 1941 and surrendered on 25 December.",
        "The Philippines were invaded from December 1941; the last US and Filipino forces surrendered at Bataan (April) and Corregidor (May 1942).",
        "The Dutch East Indies, with their oil, were conquered by March 1942.",
        "Burma was invaded; Rangoon fell in March 1942 and British forces retreated towards India by May.",
      ], explanation: "One mark per accurate point." }),
      P.manual({ label: "(b)", marks: 6, type: X, stem: "Explain why Japan decided to attack Pearl Harbor in December 1941.", points: [
        ["The oil embargo: Japan needed the oil and resources of Southeast Asia, especially the Dutch East Indies, before its reserves ran out.", 2],
        ["The US Pacific Fleet could interfere with those conquests, so Japan aimed to cripple it at the start.", 2],
        ["Talks had failed: Japan would not leave China as the USA demanded (November 1941); its leaders hoped a quick blow would lead the USA to accept a negotiated peace.", 2],
      ], levels: levels(6), modelAnswer: "The American oil embargo of 1941 meant that Japan, which imported most of its oil, would soon run short, so its leaders decided to seize the oil and raw materials of Southeast Asia, especially the Dutch East Indies. The main obstacle was the US Pacific Fleet at Pearl Harbor, which could attack Japanese forces as they moved south, so Japan planned to cripple it at the very start of the war. War seemed necessary because talks had failed: in November 1941 the USA demanded that Japan withdraw from China and Indochina, which Japan's leaders, headed by Tojo, refused. Admiral Yamamoto and others hoped that a surprise blow would give Japan time to build a defensive ring around its new empire, and that the USA would then accept a negotiated peace rather than fight a long war.", explanation: "Developed explanation of several reasons reaches the top level." }),
      P.manual({ label: "(c)", marks: 10, type: X, stem: "\"Control of the air was the main reason for Japan's early successes in Southeast Asia.\" How far do you agree? Explain your answer.", points: [
        ["Air power: Pearl Harbor crippled the US fleet; the RAF in Malaya was largely destroyed; Prince of Wales and Repulse sunk by aircraft (10 December 1941).", 2],
        ["Air power: Allied ground forces had little air cover, could not stop landings and were attacked as they retreated.", 2],
        ["Other: experienced, well-trained Japanese troops and fast tactics (bicycles, jungle, outflanking landings).", 2],
        ["Other: Allied weaknesses (poorly trained troops, no tanks in Malaya, slow commanders; Britain's priorities in Europe and North Africa; Singapore's defences planned against the sea).", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Control of the air was very important. The attack on Pearl Harbor crippled the US battle fleet, so it could not interfere. In Malaya Japanese aircraft quickly destroyed much of the RAF, and on 10 December 1941 they sank the Prince of Wales and Repulse, leaving the coasts open to further landings. Without air cover, British, Indian and Australian troops were attacked from the air as they retreated, and Singapore was bombed heavily.\n\nHowever, other factors also explain Japan's success. Its troops were experienced, many from years of war in China, and they moved fast, using bicycles on the roads, moving through jungle and plantations and making small landings to outflank British positions. The Allies had serious weaknesses: many troops were poorly trained, there were no British tanks in Malaya, commanders reacted slowly, and Britain's best forces and aircraft were needed in Europe and North Africa. Singapore's defences had been planned mainly against an attack from the sea.\n\nI largely agree. Control of the air and sea made the Japanese advance possible and the Allied defence almost hopeless, but it was the skill and speed of the Japanese army, together with Allied weaknesses, that turned this advantage into rapid victories.", explanation: "Both sides and a supported judgement reach the top level." }),
    ]),
    explanation: "Cambridge 0470 Paper 1 style structured essay on Depth study E (key question 2).",
  });

  b.struct({
    ...p1b,
    concepts: ["hist.ww2.occupied-poland-holocaust", "hist.ww2.civilians-resistance"],
    stem: "**Civilians in the Second World War.** Answer all parts.",
    hints: ["(b) needs several explained reasons why morale held.", "(c) judges the bombing by its aims."],
    parts: checkExam(C1, [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the ghettos in Nazi-occupied Poland.", points: [
        "Jews were forced into closed areas of cities from 1939-40 (Łódź sealed spring 1940; Warsaw November 1940).",
        "Severe overcrowding: over 400,000 people in the Warsaw ghetto.",
        "Starvation rations and diseases such as typhus killed tens of thousands.",
        "People kept up secret schools and cultural life / Jewish councils / deportations to death camps from 1942.",
      ], explanation: "One mark per accurate point." }),
      P.manual({ label: "(b)", marks: 6, type: X, stem: "Explain why British civilian morale did not collapse during the Blitz of 1940-41.", points: [
        ["Government measures: shelters (Anderson, public, the Underground opened), evacuation, air-raid wardens and rescue services reduced deaths and helped people cope.", 2],
        ["Propaganda and censorship stressed calm determination (the 'Blitz spirit') and hid the worst damage and panic.", 2],
        ["Shared purpose and adaptation: volunteering, community support, routine; raids did not fall everywhere every night; the RAF's victory in 1940 gave hope.", 2],
      ], levels: levels(6), modelAnswer: "Government measures helped people survive and cope: Anderson shelters were issued to families, public shelters were built and Underground stations were opened as shelters, children had been evacuated, and air-raid wardens, fire-watchers and rescue services organised the response to raids. Propaganda and censorship also mattered: newspapers, radio and films stressed calm determination and the 'Blitz spirit', and the worst scenes of damage and panic were not shown. Many people also found a shared purpose in volunteering and helping neighbours, and adapted to a routine of nights in shelters and days at work; raids were heavy but did not fall on every town every night, and the RAF's victory in the Battle of Britain gave hope that Britain could survive. Morale was strained, with fear, anger and looting, but it did not collapse.", explanation: "Developed explanation of several reasons reaches the top level." }),
      P.manual({ label: "(c)", marks: 10, type: X, stem: "How far did the Allied bombing of German cities between 1943 and 1945 achieve its aims? Explain your answer.", points: [
        ["Aims: destroy industry and break the morale of German workers.", 2],
        ["Achieved: huge destruction (Hamburg 1943, Berlin, Dresden 1945); oil and transport attacks in 1944-45 caused severe shortages.", 2],
        ["Achieved: forced Germany to divert fighters, guns and men to air defence.", 2],
        ["Not achieved: production rose until late 1944; morale did not break; heavy aircrew losses; moral criticism.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Allied bombing aimed to destroy German industry and to break the morale of the workers. It caused enormous destruction: the Hamburg firestorm of 1943 killed tens of thousands, Berlin was raided repeatedly, and Dresden was devastated in February 1945. From 1944 attacks on oil plants and railways caused severe fuel and transport shortages, grounding aircraft and immobilising tanks. The bombing also forced Germany to keep large numbers of fighters, anti-aircraft guns and men at home instead of at the front.\n\nHowever, in other ways it failed. German war production actually rose until late 1944 because factories were dispersed and reorganised, and German morale did not collapse, just as British morale had not broken during the Blitz. Bomber Command lost about 55,000 aircrew, and the bombing of civilians, especially Dresden late in the war, has been criticised as unjustified.\n\nThe bombing achieved its aims only partly. It did not break morale or stop production until late in the war, but its attacks on oil and transport in 1944-45 and the diversion of German resources made an important contribution to victory.", explanation: "Both sides and a supported judgement reach the top level." }),
    ]),
    explanation: "Cambridge 0470 Paper 1 style structured essay on Depth study E (key question 3).",
  });

  b.struct({
    ...p1b,
    concepts: ["hist.ww2.victory-europe", "hist.ww2.victory-pacific"],
    stem: "**Allied victory, 1943-1945.** Answer all parts.",
    hints: ["(b) gives several reasons for the decision.", "(c) weighs island-hopping against other reasons for Japan's defeat."],
    parts: checkExam(C1, [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the Allied invasion of Sicily and Italy in 1943.", points: [
        "Allied landings in Sicily on 10 July 1943; the island was taken by mid-August.",
        "Mussolini was overthrown on 25 July 1943.",
        "Allied landings on the Italian mainland in September; Italy surrendered.",
        "German forces occupied most of Italy and held the Allies at defensive lines such as the Gustav Line.",
      ], explanation: "One mark per accurate point." }),
      P.manual({ label: "(b)", marks: 6, type: X, stem: "Explain why the USA used the atomic bomb against Japan in August 1945.", points: [
        ["To end the war quickly and avoid a costly invasion (lessons of Okinawa).", 2],
        ["Japan had not accepted the Potsdam Declaration; its army leaders wanted to fight on.", 2],
        ["Other motives argued by historians: to end the war before the USSR played a large part / to impress Soviet leaders; momentum of the Manhattan Project.", 2],
      ], levels: levels(6), modelAnswer: "Truman and his advisers wanted to end the war quickly without invading Japan. The Battle of Okinawa, where more than 12,000 Americans and very large numbers of Japanese soldiers and civilians died, suggested that an invasion of Japan's main islands would be extremely costly. Japan had not accepted the Potsdam Declaration's demand for unconditional surrender, and its army leaders showed every sign of fighting on. Some historians argue that there were other motives too: to end the war before the USSR could play a large part in Asia, and to show Soviet leaders the power of the new weapon, while the huge Manhattan Project had its own momentum.", explanation: "Developed explanation of several reasons reaches the top level." }),
      P.manual({ label: "(c)", marks: 10, type: X, stem: "How important was the strategy of island-hopping in the defeat of Japan? Explain your answer.", points: [
        ["Important: moved US forces quickly towards Japan while bypassing strong garrisons (Rabaul).", 2],
        ["Important: Marianas bases put Japan within range of B-29s; Okinawa as a base for invasion.", 2],
        ["Other: US industrial power; naval victories (Midway, Leyte Gulf); submarine blockade.", 2],
        ["Other: firebombing, the atomic bombs and Soviet entry (August 1945) forced surrender.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Island-hopping was important. By capturing selected islands for airfields and bases and bypassing strong garrisons such as Rabaul, the Americans moved thousands of kilometres towards Japan far faster than if they had taken every island. The capture of the Marianas in 1944 put Japan's cities within range of B-29 bombers, and Okinawa was meant to be the base for an invasion.\n\nHowever, island-hopping depended on other factors. American industry built carriers, aircraft and landing craft far faster than Japan could replace its losses, and naval victories at Midway and Leyte Gulf destroyed Japan's ability to defend its islands. The American submarine blockade cut Japan off from oil and food. Finally, firebombing, the atomic bombs and the Soviet declaration of war in August 1945 brought the surrender.\n\nIsland-hopping was very important as the strategy that brought American power within reach of Japan, but it was American industrial and naval strength that made it possible, and the final defeat came from the blockade, bombing and the shocks of August 1945.", explanation: "Both sides and a supported judgement reach the top level." }),
    ]),
    explanation: "Cambridge 0470 Paper 1 style structured essay on Depth study E (key question 4).",
  });

  // -------------------------------------------------------------------------------------------------------------------
  // Paper 2: document questions on the causes of the First World War (prescribed topic, November 2028).

  b.struct({
    ...p2,
    concepts: ["hist.ww1-origins.july-crisis"],
    stem: `**Was Germany to blame for the outbreak of war in 1914?** Study the sources and answer all parts.\n\n${sources([
      source("Source A", "a cartoon of the kind published in a British magazine in August 1914, described in words", "A huge figure in a spiked German helmet strides across a map of Europe, crushing a small figure labelled \"Belgium\" under his boot. In one hand he holds a torn sheet of paper labelled \"Treaty, 1839\". Behind him a smaller figure in an Austrian uniform points a sword at a tiny figure labelled \"Serbia\". The caption reads: \"Who started it?\"", { described: true }),
      source("Source B", "an editorial in a fictional German newspaper, 2 August 1914", "For years Russia has armed against us, and now it mobilises its millions on our frontier while pretending to talk of peace. France, its ally, has waited forty years for revenge. We did not seek this war. We stand beside our ally because honour demands it, and because a Germany that abandons Austria-Hungary would stand alone against a ring of enemies."),
      source("Source C", "an editorial in a fictional French newspaper, 3 August 1914", "Germany gave Vienna a free hand, knowing that Russia could not abandon Serbia. When Russia sought to protect a small Slav nation, Berlin answered with ultimatums to St Petersburg and Paris and with its armies on the Belgian frontier. The aggressor is plain for all to see."),
      source("Source D", "a pamphlet published in Britain in September 1914 by a fictional committee of university lecturers", "Germany has torn up a treaty that its own Prussian kings signed, and marched through a neutral country whose only crime was to stand in the way. This is a war for the rights of small nations and the sanctity of treaties. Every young man who hesitates should ask himself whether he would let such a crime go unpunished."),
      source("Source E", "the recollections of a fictional Russian army officer, written in exile in 1930", "We knew in the general staff that our partial mobilisation against Austria alone was impossible in practice: our railway plans had been drawn up for war with both Austria and Germany. When the Tsar signed the order for general mobilisation, we understood that Germany would treat it as war. Some of us believed then, and I believe now, that we were not blameless."),
      source("Source F", "a speech by a fictional German historian at a university lecture, 1965", "The documents of our own government show that its leaders in July 1914 accepted, and some welcomed, the risk of a great war, believing that time was against Germany. We can no longer comfort ourselves with the idea that all the powers simply slid into war together."),
    ])}`,
    hints: ["For each source, think about who made it, when and for whom.", "In (e), group the sources for and against the claim, and test them."],
    parts: checkExam(C2, [
      P.manual({ label: "(a)", marks: 7, type: X, stem: "Study Source A. What is the cartoonist's message? Support your answer with details of the source and your knowledge.", points: [
        ["Sub-message: Germany crushed neutral Belgium / tore up the 1839 treaty; Austria-Hungary threatened Serbia.", 2],
        ["Big message: Germany (the giant) was the aggressor mainly responsible for the war; the question 'Who started it?' is answered by the picture.", 3],
        ["Supported by details (boot, torn treaty, size of figures) and knowledge (invasion of Belgium 4 August; British entry; blank cheque).", 2],
      ], levels: levels(7), modelAnswer: "On the surface the cartoon shows Germany crushing Belgium and tearing up the Treaty of London of 1839, while Austria-Hungary threatens Serbia. Its main message is that Germany was the aggressor responsible for the war: the German figure is a giant who dominates the map, while Austria-Hungary is a smaller follower, and the caption 'Who started it?' is answered by the picture itself. This fits my knowledge that Germany invaded neutral Belgium on 4 August 1914, which brought Britain into the war, and that Germany had backed Austria-Hungary with the blank cheque. As a British cartoon from August 1914, it was intended to convince readers that Britain's cause was just.", explanation: "A supported big message reaches the top level." }),
      P.manual({ label: "(b)", marks: 8, type: X, stem: "Study Sources B and C. How far do these two sources agree? Explain your answer using details of the sources.", points: [
        ["Agreement: both agree that Russian mobilisation and support for Serbia were part of the crisis.", 2],
        ["Agreement: both accept Germany stood behind Austria-Hungary.", 2],
        ["Disagreement: B blames Russia and France and says Germany did not seek war; C says Germany was the aggressor (free hand to Vienna, ultimatums, armies at Belgium).", 2],
        ["Judgement: they agree on events but disagree completely about responsibility.", 2],
      ], levels: levels(8), modelAnswer: "The sources agree about some of the events. Both mention that Russia mobilised in support of a Slav nation, and both accept that Germany stood by Austria-Hungary: Source B says Germany stands beside its ally, and Source C says Germany gave Vienna a free hand. However, they disagree completely about responsibility. Source B blames Russia, which armed and mobilised while talking of peace, and France, which wanted revenge, and insists that Germany did not seek war. Source C argues that Germany was the aggressor, because it knew Russia would defend Serbia and answered Russian mobilisation with ultimatums and armies on the Belgian frontier. Overall they agree on what happened but disagree about who was to blame, as each newspaper defends its own country.", explanation: "Agreement and disagreement on specific points with a judgement reaches the top level." }),
      P.manual({ label: "(c)", marks: 7, type: X, stem: "Study Source D. Why was this pamphlet published in September 1914? Use the source and your knowledge to explain your answer.", points: [
        ["Context: Britain had just entered the war over Belgium; Britain had no conscription and relied on volunteers.", 2],
        ["Purpose: to encourage young men to volunteer by presenting the war as a just cause (rights of small nations, treaties).", 3],
        ["Supported by details (final sentence aimed at young men; 'crime') and knowledge (recruiting campaigns; reports of German actions in Belgium).", 2],
      ], levels: levels(7), modelAnswer: "The pamphlet was published to persuade young British men to volunteer for the army. In September 1914 Britain had only a small professional army and no conscription, so it needed huge numbers of volunteers, and recruiting campaigns were at their height. The pamphlet presents the war as a moral cause, a fight for the rights of small nations and the sanctity of treaties, by stressing Germany's invasion of neutral Belgium and its breach of the 1839 treaty. Its last sentence speaks directly to any young man who hesitates and makes failing to enlist seem like letting a crime go unpunished. Coming from university lecturers, it also used their authority to make this case more convincing.", explanation: "Purpose explained in context reaches the top level." }),
      P.manual({ label: "(d)", marks: 8, type: X, stem: "Study Sources E and F. Are you surprised by what these sources say? Explain your answer using the sources and your knowledge.", points: [
        ["E surprising: a Russian officer admits Russian responsibility, against national interest; not surprising: written in exile after 1917, he had no reason to defend the Tsar's government.", 2],
        ["E's content matches knowledge: Russian general mobilisation (30 July) and its effect on Germany's plans.", 2],
        ["F surprising: a German historian blaming his own country's leaders; not surprising: Fischer debate of the 1960s; based on government documents.", 2],
        ["Judgement on how surprising, with reasons from provenance and context.", 2],
      ], levels: levels(8), modelAnswer: "At first Source E is surprising, because a Russian officer admits that Russia was not blameless. But it is less surprising when we consider its origin: it was written in 1930 by an officer living in exile after the revolution, who had no reason to defend the Tsar's government. Its content also matches my knowledge that Russia ordered general mobilisation on 30 July and that Germany treated this as a reason for war. Source F might also seem surprising, since a German historian blames his own country's leaders. However, it was spoken in 1965, during the debate begun by Fritz Fischer, who argued from German government records that Germany's leaders accepted the risk of a great war in 1914. So I am not very surprised by either source, because both writers were in positions where they could look critically at their own side.", explanation: "Provenance and context used to explain surprise reaches the top level." }),
      P.manual({ label: "(e)", marks: 10, type: X, stem: "How far do these sources provide convincing evidence that Germany was to blame for the outbreak of war in 1914? Use the sources to explain your answer.", points: [
        ["Sources supporting German blame (A, C, D, F) explained with details.", 3],
        ["Sources challenging it or spreading blame (B, E) explained with details.", 3],
        ["Evaluation of how convincing the sources are (propaganda of 1914 in A, B, C, D; E and F written later with more evidence).", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Several sources support the view that Germany was to blame. Source A shows Germany as a giant crushing Belgium, Source C argues that Germany gave Austria-Hungary a free hand and answered Russia with ultimatums, Source D condemns Germany for invading neutral Belgium, and Source F says German documents show that its leaders accepted the risk of a great war. However, Sources A, C and D were all produced in 1914 by Germany's enemies to justify the war, so they are not convincing on their own. Source F is more convincing because it is a German historian's judgement based on government documents.\n\nOther sources spread the blame. Source B blames Russian mobilisation and French revenge, though it is German propaganda written on 2 August. Source E is more convincing: a Russian officer, writing later with no reason to defend the Tsar's regime, admits that general mobilisation meant war and that Russia was not blameless.\n\nOverall the sources provide fairly convincing evidence that Germany bore heavy responsibility, especially Source F, but Source E shows that Russia also made decisions that led to war. Because so many of the sources are wartime propaganda, they show that Germany was a major cause rather than proving that it alone was to blame.", explanation: "Use of all sources, evaluation and a supported judgement reach the top level." }),
    ]),
    explanation: "Cambridge 0470 Paper 2 style document question on the causes of the First World War (prescribed topic). All six sources are invented for the question.",
  });

  b.struct({
    ...p2,
    concepts: ["hist.ww1-origins.colonial-balkans", "hist.ww1-origins.alliances-arms-race"],
    stem: `**Why were the Balkans so dangerous before 1914?** Study the sources and answer all parts.\n\n${sources([
      source("Source A", "a cartoon of the kind published in a German magazine in October 1908, described in words", "An elderly man in a fez, labelled \"Turkey\", sits weakly in a chair while a well-fed gentleman in an Austrian uniform calmly pockets a purse marked \"Bosnia\". A furious small boy labelled \"Serbia\" shakes his fist, and behind him a large bearded figure labelled \"Russia\" reaches for a sword. A figure in a German helmet stands firmly behind the Austrian with folded arms.", { described: true }),
      source("Source B", "a letter from a fictional Serbian student in Belgrade to his cousin in Bosnia, 1909", "They have taken you into their empire without asking a single Serb. Our government says we must wait and be patient, and that Russia cannot help us this time. But a nation cannot wait for ever. One day all the Serbs will live in one free state, whatever Vienna says."),
      source("Source C", "a confidential report by a fictional Austro-Hungarian diplomat in Belgrade to Vienna, 1913", "Serbia emerges from the wars doubled in size and drunk with victory. Its newspapers speak openly of our southern provinces as Serbian land waiting to be freed. While Serbia exists in its present form, the loyalty of our South Slavs cannot be taken for granted. A peaceful solution grows less likely each year."),
      source("Source D", "an article in a fictional British weekly journal, 1912", "The Balkan states have done in weeks what diplomats failed to do in decades: they have driven the Turk from almost all of Europe. Yet the danger has only grown. Each little state wants more than it has won, and behind each stands a Great Power that cannot afford to see its friend humiliated."),
      source("Source E", "a cartoon of the kind published in a British magazine in 1911, described in words", "A German gunboat bristling with guns sits in a small harbour labelled \"Agadir\". On the quay a French soldier stands guard while a British sailor stands beside him, arm on his shoulder. Far in the background, a tiny pot labelled \"Balkans\" sits quietly simmering.", { described: true }),
      source("Source F", "a speech by a fictional member of the Russian Duma, 1913", "Twice in five years Russia has been asked to stand aside while the Slavs are bullied. In 1909 we bowed our heads because our army was not ready. It is ready now, or soon will be. The Russian people will not forgive a government that bows its head a second time."),
    ])}`,
    hints: ["For each source, think about who made it, when and for whom.", "In (e), use every source, grouping those about the Balkans and those about other causes of tension."],
    parts: checkExam(C2, [
      P.manual({ label: "(a)", marks: 7, type: X, stem: "Study Source A. What is the cartoonist's message? Support your answer with details of the source and your knowledge.", points: [
        ["Sub-message: Austria-Hungary took Bosnia from a weak Ottoman Empire; Serbia and Russia were angry.", 2],
        ["Big message: Austria-Hungary could act safely because Germany stood firmly behind it, so Serbia and Russia could only protest (a German view of German strength).", 3],
        ["Supported by details (purse, fist, sword, folded arms) and knowledge (annexation October 1908; Russia backed down March 1909).", 2],
      ], levels: levels(7), modelAnswer: "On the surface the cartoon shows Austria-Hungary taking Bosnia from a weak Turkey, while Serbia shakes its fist and Russia reaches for a sword. Its main message is that Austria-Hungary could take Bosnia safely because Germany stood firmly behind it: the calm Austrian and the German with folded arms contrast with the angry but powerless Serbia and Russia. Published in a German magazine, it presents German support as decisive. This fits my knowledge that Austria-Hungary annexed Bosnia in October 1908 and that, faced with firm German backing, Russia backed down in March 1909.", explanation: "A supported big message reaches the top level." }),
      P.manual({ label: "(b)", marks: 8, type: X, stem: "Study Sources B and C. How far does Source C prove that the writer of Source B was right about Serbian feelings? Explain your answer.", points: [
        ["B's view: Serbs resent the annexation and want all Serbs in one state.", 2],
        ["C supports it: Serbian newspapers call Austro-Hungarian provinces Serbian land; Serbia drunk with victory.", 2],
        ["Evaluation: B is one private student's view (1909); C is a confidential diplomatic report (1913) with reason to be accurate but from a hostile, worried observer.", 2],
        ["Judgement with knowledge (Balkan Wars doubled Serbia; Black Hand founded 1911).", 2],
      ], levels: levels(8), modelAnswer: "Source B, a private letter by a Serbian student, claims that Serbs resent the annexation of Bosnia and want all Serbs to live in one free state. Source C supports this: an Austro-Hungarian diplomat reports that Serbian newspapers openly call Austria-Hungary's southern provinces Serbian land, and that Serbia is confident after the Balkan Wars. Source C was a confidential report to Vienna, so the diplomat had reason to be accurate, although as a hostile observer he may have exaggerated the danger. It was written four years after Source B, so it shows that such feelings had grown, which matches my knowledge that Serbia doubled in size in 1912-13 and that the nationalist Black Hand was founded in 1911. Source C does not prove that every Serb felt this way, but it strongly supports the student's view of Serbian feelings.", explanation: "Comparison with evaluation reaches the top level." }),
      P.manual({ label: "(c)", marks: 7, type: X, stem: "Study Source D. Why was this article published in 1912? Use the source and your knowledge to explain your answer.", points: [
        ["Context: the First Balkan War (from October 1912); the Ottomans driven from most of Europe.", 2],
        ["Purpose: to warn British readers that Balkan victory made the danger to European peace greater, because the Great Powers were involved.", 3],
        ["Supported by details ('the danger has only grown'; Great Powers behind each state) and knowledge (Russia and Serbia; Austria-Hungary and Albania; London conference).", 2],
      ], levels: levels(7), modelAnswer: "The article was published during the First Balkan War, which began in October 1912, when the Balkan League drove the Ottomans out of almost all their European lands. Its purpose was to warn British readers that this victory did not bring peace but greater danger, because each Balkan state wanted more land and each was backed by a Great Power that could not accept humiliation. This matches my knowledge that Russia supported Serbia while Austria-Hungary was determined to keep Serbia from the sea by creating Albania, and that the Great Powers had to hold a conference in London to manage the crisis. The writer wanted readers to understand why a distant war mattered to Britain.", explanation: "Purpose explained in context reaches the top level." }),
      P.manual({ label: "(d)", marks: 8, type: X, stem: "Study Sources E and F. How useful are these sources as evidence about the dangers facing Europe before 1914? Explain your answer.", points: [
        ["E: a British cartoon of 1911 shows the Agadir crisis drawing Britain and France together; useful for colonial tension and the entente.", 2],
        ["E: suggests the Balkans seemed a minor issue in 1911, which hindsight shows was wrong; a British viewpoint.", 2],
        ["F: a Russian Duma speech of 1913 shows determination not to back down again after 1909; useful for Russian attitudes.", 2],
        ["F: a public speech, possibly exaggerated for effect; one politician; supported by knowledge (Russian rearmament; mobilisation in 1914). Judgement.", 2],
      ], levels: levels(8), modelAnswer: "Source E is useful because it shows how the Agadir crisis of 1911 looked from Britain: the British sailor's arm on the French soldier's shoulder shows the entente growing stronger in the face of German pressure, which matches my knowledge of Britain's public warning to Germany. It is also useful in another way: the Balkans appear as a tiny pot simmering quietly, suggesting that in 1911 many people saw them as a minor problem, which hindsight shows was mistaken. Source F is useful for Russian attitudes: a member of the Duma says that Russia, humiliated in 1909, would not back down again now its army was nearly ready. As a public speech it may exaggerate, and it is only one politician's view, but my knowledge of Russia's rearmament programme and its general mobilisation in July 1914 supports it. Both are useful, E for colonial tension and the alliances, F for the Balkan danger that actually led to war.", explanation: "Usefulness judged from content, provenance and knowledge reaches the top level." }),
      P.manual({ label: "(e)", marks: 10, type: X, stem: "How far do these sources provide convincing evidence that the Balkans were the greatest danger to peace in Europe before 1914? Use the sources to explain your answer.", points: [
        ["Sources supporting the Balkans as the main danger (A, B, C, D, F) explained with details.", 3],
        ["Sources pointing to other dangers (E: colonial rivalry and alliances; A and D: Great Power rivalry behind the Balkans) explained.", 3],
        ["Evaluation of how convincing the sources are (provenance, purpose, date, knowledge).", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Most of the sources suggest that the Balkans were the greatest danger. Source A shows the Bosnian crisis of 1908 setting Serbia and Russia against Austria-Hungary and Germany. Source B shows Serbian nationalism that would not accept the annexation, and Source C, a confidential diplomatic report, shows that by 1913 Austria-Hungary believed Serbia threatened the loyalty of its South Slavs. Source D warns that the Balkan Wars increased the danger because Great Powers stood behind each small state, and Source F shows Russia determined not to back down again. Sources C and D are especially convincing because they were written for well-informed audiences at the time, and their claims match what happened in July 1914.\n\nHowever, Source E points to another danger: colonial rivalry over Morocco, which strengthened the Anglo-French entente against Germany. It even suggests the Balkans seemed a minor issue in 1911. Sources A and D also show that the Balkans were dangerous because of the Great Power rivalries and alliances behind them, not on their own.\n\nOverall the sources provide convincing evidence that the Balkans were the greatest danger, because they combined local nationalism with the interests and pride of the Great Powers, but they also show that the alliance system made that danger far worse.", explanation: "Use of all sources, evaluation and a supported judgement reach the top level." }),
    ]),
    explanation: "Cambridge 0470 Paper 2 style document question on the causes of the First World War (prescribed topic). All six sources are invented for the question.",
  });

  // -------------------------------------------------------------------------------------------------------------------
  // Paper 4: alternative to coursework. Depth study A (x3) and Depth study E (x3).

  b.struct({
    ...p4,
    concepts: ["hist.ww1.schlieffen-stalemate", "hist.ww1.trench-warfare"],
    stem: "**Depth study A: the Western Front.** Answer both parts.",
    hints: ["(a) is an account: events in order, with dates, showing how each led to the next.", "(b) judges importance in more than one way and compares with other events."],
    parts: checkExam(C4, [
      P.manual({ label: "(a)", marks: 16, type: X, stem: "Write an account of the war on the Western Front in 1914.", points: [
        ["The Schlieffen Plan and the German invasion of Belgium (4 August); Liège.", 2],
        ["The BEF crossed to France; the Battle of Mons (23 August) and the Allied retreat.", 2],
        ["Russia's early attack led Moltke to move troops east (late August).", 2],
        ["The German right wing turned east of Paris, exposing its flank.", 2],
        ["The Battle of the Marne (6-12 September); German retreat to the Aisne; trenches dug.", 2],
        ["The race to the sea (September-October).", 2],
        ["The First Battle of Ypres (October-November); heavy losses for the BEF.", 2],
        ["By December, trench lines from the North Sea to Switzerland: the war of attrition begins.", 2],
      ], levels: levels(16), modelAnswer: "The war on the Western Front began on 4 August 1914, when German armies invaded Belgium under the Schlieffen Plan, which aimed to defeat France in about six weeks by sweeping round Paris. The Belgian forts at Liège held the Germans up for about twelve days. Britain declared war and sent the BEF, which met the German First Army at Mons on 23 August. Its accurate rifle fire delayed the Germans for a day before it joined the long Allied retreat towards Paris.\n\nMeanwhile Russia mobilised faster than expected and invaded East Prussia, so in late August Moltke moved troops east, weakening the right wing in France. Exhausted and short of supplies, the German right wing turned to pass east of Paris instead of round it, exposing its flank. Joffre counter-attacked at the Marne from 6 to 12 September, helped by the BEF and reserves rushed from Paris. The Germans retreated to the River Aisne and dug trenches on high ground, and the Schlieffen Plan had failed.\n\nEach side now tried to outflank the other to the north in the race to the sea, until the lines reached the Channel coast. At the First Battle of Ypres, from October to November, the Germans tried to break through to the Channel ports; the British, French and Belgians held on, but most of Britain's regular army was killed or wounded. By December 1914 continuous lines of trenches ran from the North Sea to Switzerland. The war of movement was over, and a war of attrition had begun.", explanation: "A well-organised, accurate account showing links between events reaches the top level." }),
      P.manual({ label: "(b)", marks: 24, type: X, stem: "How important was the Battle of the Somme?", points: [
        ["Military: relieved pressure on the French at Verdun.", 2],
        ["Military: wore down the German army badly; Germany later withdrew to the Hindenburg Line.", 2],
        ["Human cost: about 57,000 British casualties on 1 July; over a million casualties in total.", 2],
        ["Limited gains: the Allies advanced at most about ten kilometres; no breakthrough.", 2],
        ["Development: first use of tanks (15 September 1916); lessons in artillery and tactics.", 2],
        ["Development: part of a 'learning curve' that led to the victories of 1918 (debated).", 2],
        ["Britain: the first great battle of the volunteer armies; effect on communities (Pals battalions); later conscription context.", 2],
        ["Memory: shaped how the war and its generals (Haig) were remembered; the 'lions led by donkeys' view.", 2],
        ["Comparison: Verdun, Passchendaele or the Hundred Days as more important by some measures.", 2],
        ["Considers short-term and long-term importance.", 2],
        ["Considers different ways of judging importance (military, human, political, memory).", 2],
        ["Supported overall judgement.", 2],
      ], levels: levels(24), modelAnswer: "The Battle of the Somme, fought from 1 July to November 1916, was important in several different ways.\n\nIn military terms, it achieved some of its aims. It began partly to relieve pressure on the French at Verdun, and German attacks there were reduced once the Somme began. It also wore down the German army very badly; German commanders were shaken by the losses, and early in 1917 Germany withdrew to the shorter, stronger Hindenburg Line. Some historians therefore see it as an important step in the attrition that eventually exhausted Germany.\n\nHowever, judged by ground gained, it was a failure. The Allies advanced at most about ten kilometres and there was no breakthrough. Its human cost was enormous: on the first day alone the British army suffered about 57,000 casualties, nearly 20,000 of them killed, and total casualties on all sides are estimated at over a million.\n\nThe Somme was also important for the development of warfare. Tanks were used for the first time on 15 September 1916, and the British army learned hard lessons about artillery, the creeping barrage and infantry tactics. Some historians argue that these lessons formed a 'learning curve' that led to the victories of 1918; others argue that the cost of learning was far too high.\n\nFor Britain, the Somme was the first great battle of the volunteer armies raised in 1914-15. Because many 'Pals' battalions came from the same towns, whole communities lost their young men in a single day. Its importance in memory has been huge: it shaped the view of the war as futile and of generals such as Haig as careless of their men's lives, a view still debated today.\n\nCompared with other events, its military importance can be questioned. Verdun was more important for France, and the Hundred Days of 1918 actually won the war. But the Somme was important as a turning point in the nature of the war and in how it was remembered.\n\nOverall, the Somme was very important. In the short term it failed to break through and cost terrible losses, but it relieved Verdun, weakened the German army and taught lessons that were used in 1918. In the long term its greatest importance may be in how it shaped British memory of the war.", explanation: "Several ways of judging importance, well supported, with a sustained judgement reach the top level." }),
    ]),
    explanation: "Cambridge 0470 Paper 4 style question on Depth study A (key question 1).",
  });

  b.struct({
    ...p4,
    concepts: ["hist.ww1.world-war", "hist.ww1.other-fronts"],
    stem: "**Depth study A: a world war.** Answer both parts.",
    hints: ["(a) is an account of the African campaigns in order.", "(b) judges significance by its military, political and longer-term effects."],
    parts: checkExam(C4, [
      P.manual({ label: "(a)", marks: 16, type: X, stem: "Write an account of the war in Africa between 1914 and 1918.", points: [
        ["Togoland captured by British and French forces (August 1914).", 2],
        ["Kamerun conquered by early 1916.", 2],
        ["South Africa put down an Afrikaner rebellion, then conquered German South West Africa (July 1915).", 2],
        ["East Africa: Lettow-Vorbeck's strategy; defeat of the Indian force at Tanga (November 1914).", 2],
        ["Smuts's campaign from 1916 with South African, Indian, British and African troops.", 2],
        ["Lettow-Vorbeck's mobile campaign into Portuguese East Africa and Northern Rhodesia.", 2],
        ["Surrender at Abercorn on 25 November 1918, after the armistice.", 2],
        ["The role and suffering of African soldiers and carriers (estimates of more than 100,000 carrier deaths); the Rhodesia Native Regiment.", 2],
      ], levels: levels(16), modelAnswer: "When war began, Britain, France, Belgium and South Africa attacked Germany's four African colonies. Togoland was captured by British and French forces in August 1914, and Kamerun was conquered after a longer campaign by early 1916.\n\nIn southern Africa, South Africa first had to defeat a rebellion by Afrikaners who refused to fight for Britain. South African forces under Louis Botha then invaded German South West Africa, which surrendered in July 1915.\n\nThe longest campaign was in German East Africa. The German commander, Paul von Lettow-Vorbeck, had a small force made up mostly of African askari, and his aim was to tie down as many British Empire troops as possible. In November 1914 an Indian expeditionary force was badly defeated when it tried to land at Tanga. From 1916 Jan Smuts led a large army of South African, Indian, British and African troops, including the King's African Rifles and later the Rhodesia Native Regiment, which drove the Germans out of most of the colony. Lettow-Vorbeck avoided decisive battles and moved into Portuguese East Africa and then Northern Rhodesia. He surrendered at Abercorn only on 25 November 1918, two weeks after the armistice in Europe.\n\nThe campaign depended on African carriers because there were few roads and the tsetse fly killed animals. Estimates vary, but historians commonly suggest that around a million Africans were used as carriers and that more than 100,000 died, mostly of disease, hunger and exhaustion, while villages lost their young men and food, and famine followed in some areas.", explanation: "A well-organised, accurate account reaches the top level." }),
      P.manual({ label: "(b)", marks: 24, type: X, stem: "How significant was the Gallipoli campaign?", points: [
        ["Aims: to knock out the Ottoman Empire, take Constantinople and open a route to Russia; its failure meant these were not achieved.", 2],
        ["Military: heavy losses (roughly a quarter of a million casualties on each side, estimates).", 2],
        ["Military: tied down Ottoman forces; but the Allies withdrew in January 1916.", 2],
        ["Strategic: Russia stayed cut off from its allies' supplies, contributing to its collapse.", 2],
        ["Political (Britain): damaged Churchill's career; led to a change of government leadership at the Admiralty.", 2],
        ["Australia and New Zealand: ANZAC experience central to national identity; Anzac Day.", 2],
        ["Turkey: Mustafa Kemal's reputation; later founder of the Turkish Republic.", 2],
        ["Lessons: amphibious warfare lessons used later.", 2],
        ["Limits: a sideshow compared with the Western Front; did not decide the war.", 2],
        ["Considers short-term and long-term significance.", 2],
        ["Considers different ways of judging significance.", 2],
        ["Supported overall judgement.", 2],
      ], levels: levels(24), modelAnswer: "The Gallipoli campaign of 1915 was significant in several ways, though less for its effect on the outcome of the war than for its wider consequences.\n\nIts aims were ambitious: to capture Constantinople, knock the Ottoman Empire out of the war and open a sea route to Russia. Its failure meant none of these were achieved. After the naval attack in March and the landings in April and August, the Allies withdrew in January 1916, having suffered heavy losses; historians estimate that each side suffered roughly a quarter of a million casualties. The campaign tied down Ottoman forces, but it achieved no lasting gains.\n\nStrategically, the failure mattered because Russia remained cut off from Allied supplies through the Black Sea. Russia's shortages of weapons and equipment contributed to its defeats and, in the end, to the revolutions of 1917, although many other factors were involved.\n\nPolitically, Gallipoli damaged the reputation of Winston Churchill, who had championed the plan and left the Admiralty in 1915. For Australia and New Zealand, it became central to national identity: the sacrifice of the ANZACs is remembered every year on Anzac Day, 25 April. For Turkey, the successful defence made the reputation of Mustafa Kemal, who later founded the Turkish Republic.\n\nThere were also military lessons about amphibious landings, which planners studied before the landings of the Second World War.\n\nHowever, judged by its effect on the outcome of the First World War, Gallipoli was a sideshow. The war was decided on the Western Front, and its failure did not change the balance there.\n\nOverall, Gallipoli was of limited significance for the outcome of the war, but highly significant for its long-term consequences: for Russia's isolation, for the national identities of Australia, New Zealand and Turkey, and for the careers of leaders on both sides.", explanation: "Several ways of judging significance, well supported, with a sustained judgement reach the top level." }),
    ]),
    explanation: "Cambridge 0470 Paper 4 style question on Depth study A (key questions 2 and 3).",
  });

  b.struct({
    ...p4,
    concepts: ["hist.ww1.end-1918", "hist.ww1.other-fronts"],
    stem: "**Depth study A: the end of the war.** Answer both parts.",
    hints: ["(a) is an account of events in Germany in order.", "(b) compares the blockade with the other reasons for Germany's defeat."],
    parts: checkExam(C4, [
      P.manual({ label: "(a)", marks: 16, type: X, stem: "Write an account of events in Germany between September and November 1918.", points: [
        ["Military situation: the Hundred Days; Hindenburg Line broken in late September.", 2],
        ["Ludendorff told the Kaiser the war was lost (29 September); Bulgaria's armistice.", 2],
        ["Prince Max of Baden's new government asked Wilson for an armistice (early October).", 2],
        ["Wilson's replies; Ludendorff dismissed (late October); Germany's allies collapse.", 2],
        ["Naval order for a final battle; sailors refused; Kiel mutiny (early November).", 2],
        ["Workers' and soldiers' councils spread to cities including Munich.", 2],
        ["9 November: abdication announced; republic proclaimed; Ebert in charge; the Kaiser fled to the Netherlands.", 2],
        ["11 November: Armistice signed at Compiègne by Erzberger; fighting stopped at 11 a.m.", 2],
      ], levels: levels(16), modelAnswer: "By September 1918 Germany was losing the war. Since Amiens on 8 August the Allies had driven the German army back, and in late September they broke through the Hindenburg Line. At the end of September Bulgaria asked for an armistice, and on 29 September Ludendorff told the Kaiser that the war was lost and that a new government should ask for peace.\n\nIn early October the new Chancellor, Prince Max of Baden, whose government included Social Democrats, asked President Wilson for an armistice based on his Fourteen Points. Wilson's replies made clear that he would not deal with the Kaiser's old regime. Ludendorff, who had changed his mind and wanted to fight on, was dismissed in late October, while the Ottoman Empire and Austria-Hungary signed armistices.\n\nAt the end of October the naval command ordered the High Seas Fleet to sea for a final battle. The sailors refused, and in early November the mutiny at Kiel spread. Workers' and soldiers' councils took control in many cities, and a republic was declared in Bavaria. On 9 November Prince Max announced the Kaiser's abdication, the Social Democrat Friedrich Ebert became head of government, and a republic was proclaimed in Berlin. Wilhelm II fled to the Netherlands.\n\nThe German delegation, led by Matthias Erzberger, signed the Armistice in a railway carriage at Compiègne early on 11 November, and the fighting stopped at 11 a.m.", explanation: "A well-organised, accurate account reaches the top level." }),
      P.manual({ label: "(b)", marks: 24, type: X, stem: "How important was the British naval blockade in the defeat of Germany?", points: [
        ["Economic: cut imports of food, fertiliser and raw materials; shortages hit war production.", 2],
        ["Social: hunger, the turnip winter (1916-17), ersatz goods; estimates of hundreds of thousands of extra civilian deaths.", 2],
        ["Political: strikes and unrest; contributed to the revolution of 1918.", 2],
        ["Military: soldiers' morale affected (looting of Allied supplies in 1918).", 2],
        ["Indirect: drove Germany to unrestricted submarine warfare, which brought the USA in.", 2],
        ["Other: failure of the Spring Offensive and the Hundred Days defeated the army.", 2],
        ["Other: American entry; collapse of Germany's allies.", 2],
        ["Other: the blockade worked slowly; Germany fought on for four years.", 2],
        ["Considers how the blockade interacted with other factors.", 2],
        ["Considers short-term and long-term importance.", 2],
        ["Considers different ways of judging importance.", 2],
        ["Supported overall judgement.", 2],
      ], levels: levels(24), modelAnswer: "The British naval blockade was an important cause of Germany's defeat, though it worked slowly and in combination with other factors.\n\nIts economic effects were serious. From 1914 the Royal Navy stopped imports of food, fertiliser and raw materials. Over time this caused shortages that affected both the war economy and daily life. The winter of 1916-17 became known as the turnip winter, many Germans relied on substitute foods, and estimates suggest hundreds of thousands of extra civilian deaths linked to hunger.\n\nIts social and political effects were perhaps even more important. Hunger fed discontent, strikes and protests against the war, and in 1918 war-weariness helped the Kiel mutiny turn into a revolution. The blockade also affected the army: during the Spring Offensive hungry soldiers stopped to loot Allied supply dumps and discovered that the enemy was well fed, which damaged morale.\n\nThe blockade also had an important indirect effect. Germany's answer to it was the U-boat, and its decision in 1917 to return to unrestricted submarine warfare brought the USA into the war.\n\nHowever, the blockade did not defeat Germany on its own. It worked slowly: Germany fought on for more than four years. The German army was defeated on the battlefield in 1918, when the Spring Offensive failed and cost its best troops, and the Allies, with American help, drove it back in the Hundred Days. The collapse of Bulgaria, the Ottoman Empire and Austria-Hungary also left Germany alone.\n\nOverall, the blockade was very important as a long-term cause of defeat: it weakened the economy, the home front and the army's morale, and indirectly brought in the USA. But the immediate cause of Germany's request for an armistice was military defeat in 1918, which the blockade made more likely but did not by itself bring about.", explanation: "Several ways of judging importance, well supported, with a sustained judgement reach the top level." }),
    ]),
    explanation: "Cambridge 0470 Paper 4 style question on Depth study A (key questions 3 and 4).",
  });

  b.struct({
    ...p4,
    concepts: ["hist.ww2.europe-1939-43"],
    stem: "**Depth study E: the war in Europe, 1940-1943.** Answer both parts.",
    hints: ["(a) is an account: stages of the battle in order.", "(b) judges significance in more than one way and compares with Moscow and Kursk."],
    parts: checkExam(C4, [
      P.manual({ label: "(a)", marks: 16, type: X, stem: "Write an account of the Battle of Britain.", points: [
        ["Context: France defeated; Britain refused peace; Hitler ordered preparations for Operation Sea Lion (July 1940).", 2],
        ["Need for air superiority before invasion; the Luftwaffe versus RAF Fighter Command.", 2],
        ["July: attacks on Channel shipping and ports.", 2],
        ["August: attacks on airfields and radar stations; RAF under heavy strain.", 2],
        ["British strengths in action: radar, the control system, Spitfires and Hurricanes, pilots from many countries.", 2],
        ["7 September: switch to bombing London; the Blitz begins; RAF recovers.", 2],
        ["15 September: heavy German losses.", 2],
        ["Sea Lion postponed (September); fighting continued into October; Germany failed to win air superiority.", 2],
      ], levels: levels(16), modelAnswer: "After France fell in June 1940, Britain refused to make peace, and in July Hitler ordered preparations for an invasion, Operation Sea Lion. An invasion across the Channel needed control of the air, so the Luftwaffe had to defeat RAF Fighter Command first.\n\nIn July the Luftwaffe attacked shipping in the Channel and coastal ports. In August it turned to the RAF itself, bombing airfields and radar stations in southern England. These attacks put Fighter Command under heavy strain, with pilots exhausted and airfields damaged. But radar and the RAF's control system allowed fighters to meet raids without wasteful patrols, Spitfires and Hurricanes were a match for German fighters, and pilots from Poland, Czechoslovakia, the dominions and other countries strengthened the RAF. German fighters could stay over England only briefly before their fuel ran low.\n\nOn 7 September the Luftwaffe switched to bombing London, starting the Blitz. This relieved the pressure on the RAF's airfields and gave it time to recover. On 15 September large German raids suffered heavy losses, showing that the RAF was far from defeated. Soon afterwards Hitler postponed Sea Lion. Fighting in the air continued into October, but Germany had failed to win air superiority, and the invasion never took place.", explanation: "A well-organised, accurate account reaches the top level." }),
      P.manual({ label: "(b)", marks: 24, type: X, stem: "How significant was the Battle of Stalingrad?", points: [
        ["Military: the German Sixth Army destroyed; about 91,000 prisoners.", 2],
        ["Military: first time a whole German army was lost; the Red Army took the initiative.", 2],
        ["Strategic: ended the 1942 drive towards the Caucasus oilfields.", 2],
        ["After Kursk (July 1943), Germany on the defensive in the east for the rest of the war.", 2],
        ["Morale: a blow to German confidence; propaganda could not hide it.", 2],
        ["Morale and prestige: boosted Soviet morale and Allied confidence; Stalin's standing.", 2],
        ["Comparison: Moscow (December 1941) ended hopes of a quick victory.", 2],
        ["Comparison: Kursk was the last major German offensive in the east; El Alamein in the same period.", 2],
        ["Considers the role of Hitler's decisions (no break-out) in the outcome.", 2],
        ["Considers short-term and long-term significance.", 2],
        ["Considers different ways of judging significance.", 2],
        ["Supported overall judgement.", 2],
      ], levels: levels(24), modelAnswer: "The Battle of Stalingrad, from August 1942 to February 1943, was one of the most significant battles of the Second World War.\n\nIn military terms its significance was enormous. In November 1942 the Red Army surrounded the German Sixth Army, and after Hitler refused to allow a break-out and the airlift and relief attack failed, Paulus surrendered at the end of January 1943. About 91,000 German soldiers were taken prisoner. For the first time a whole German army had been destroyed. The defeat also ended Germany's 1942 drive towards the oil of the Caucasus, which it badly needed.\n\nStrategically, Stalingrad passed the initiative on the Eastern Front to the Red Army. After the failure of the German offensive at Kursk in July 1943, Germany was on the defensive in the east for the rest of the war, and the Red Army began the advance that took it to Berlin.\n\nIts effect on morale was also significant. German propaganda could not hide the disaster, and many Germans began to see that the war could be lost. For the Soviet people and the Allies, Stalingrad was proof that Germany could be beaten, and it raised the prestige of the USSR and of Stalin.\n\nHowever, its significance can be compared with other battles. Some historians argue that the defeat before Moscow in December 1941 was the true turning point, because it ended Germany's hopes of a quick victory. Others point to Kursk, the last major German offensive in the east, or to El Alamein in North Africa in the same period.\n\nOverall, Stalingrad was highly significant. Moscow showed that Germany could not win quickly, but Stalingrad showed that it could lose: it destroyed a German army, ended its offensive towards the oilfields, changed morale on both sides and began the shift of initiative to the Red Army that Kursk confirmed.", explanation: "Several ways of judging significance, well supported, with a sustained judgement reach the top level." }),
    ]),
    explanation: "Cambridge 0470 Paper 4 style question on Depth study E (key question 1).",
  });

  b.struct({
    ...p4,
    concepts: ["hist.ww2.asia-pacific"],
    stem: "**Depth study E: the war in the Asia-Pacific, 1941-1942.** Answer both parts.",
    hints: ["(a) is an account of the Malayan campaign in order.", "(b) judges importance in more than one way and compares with Coral Sea and Guadalcanal."],
    parts: checkExam(C4, [
      P.manual({ label: "(a)", marks: 16, type: X, stem: "Write an account of the Japanese conquest of Malaya and Singapore, December 1941-February 1942.", points: [
        ["Landings in northern Malaya and southern Thailand on 8 December 1941 under Yamashita.", 2],
        ["Japanese air attacks crippled the RAF in Malaya.", 2],
        ["Prince of Wales and Repulse sunk on 10 December.", 2],
        ["Rapid advance: bicycles, jungle, outflanking; British withdrawals.", 2],
        ["Kuala Lumpur fell in January 1942; withdrawal to Singapore island (end of January).", 2],
        ["Japanese crossed to Singapore on 8 February; captured key positions and water supply.", 2],
        ["Percival surrendered on 15 February 1942; tens of thousands of prisoners.", 2],
        ["Outcome: Japan took Malaya and Singapore in seventy days though outnumbered.", 2],
      ], levels: levels(16), modelAnswer: "On 8 December 1941, at almost the same time as the attack on Pearl Harbor, Japanese troops under General Yamashita landed in northern Malaya and southern Thailand. Japanese aircraft quickly destroyed much of the RAF in Malaya, and on 10 December they sank the British battleship Prince of Wales and the battlecruiser Repulse, which had been sent to defend Singapore. Britain had lost control of the air and sea.\n\nThe Japanese then advanced rapidly down the Malayan peninsula. Experienced troops moved along the roads on bicycles and went through jungle and plantations to get behind British positions, while small landings along the coast outflanked the defenders. British, Indian and Australian forces, many of them poorly trained and without tanks, were forced into repeated withdrawals. Kuala Lumpur fell in January 1942, and by the end of the month the defenders had withdrawn to Singapore island and blown up the causeway.\n\nOn 8 February the Japanese crossed the strait to Singapore. They captured key positions and the reservoirs on which the city depended for water. On 15 February 1942 General Percival surrendered, and tens of thousands of Allied soldiers became prisoners. Although outnumbered, the Japanese had taken Malaya and Singapore in seventy days, one of the worst defeats in British military history.", explanation: "A well-organised, accurate account reaches the top level." }),
      P.manual({ label: "(b)", marks: 24, type: X, stem: "How important was the Battle of Midway?", points: [
        ["Military: Japan lost four fleet carriers; the USA lost one (Yorktown).", 2],
        ["Military: loss of experienced aircrew and mechanics that Japan could not replace.", 2],
        ["Strategic: ended Japanese expansion in the central Pacific; Japan on the defensive.", 2],
        ["Strategic: initiative passed to the USA; Guadalcanal (August 1942) followed.", 2],
        ["Intelligence: showed the value of codebreaking.", 2],
        ["Industrial context: the US could replace losses far faster, so the effect grew over time.", 2],
        ["Comparison: Coral Sea (May 1942) had already checked Japan.", 2],
        ["Comparison: Guadalcanal was the long attrition battle on land; Japan was likely to lose anyway after Pearl Harbor failed to hit carriers.", 2],
        ["Morale: boosted American confidence six months after Pearl Harbor.", 2],
        ["Considers short-term and long-term importance.", 2],
        ["Considers different ways of judging importance.", 2],
        ["Supported overall judgement.", 2],
      ], levels: levels(24), modelAnswer: "The Battle of Midway, fought from 4 to 7 June 1942, was one of the most important battles of the Pacific war.\n\nIts immediate military importance was huge. Admiral Yamamoto had hoped to destroy the remaining American carriers, but American codebreakers had identified Midway as his target, and Nimitz's carriers lay in ambush. American dive-bombers caught the Japanese carriers while they were rearming and refuelling. Japan lost four fleet carriers, while the USA lost one, the Yorktown. Japan also lost many experienced pilots and skilled mechanics who could not quickly be replaced.\n\nStrategically, Midway ended Japanese expansion in the central Pacific. From then on Japan was mainly on the defensive, and the initiative passed to the USA, which began its first major offensive at Guadalcanal in August 1942. The battle also showed the value of intelligence: codebreaking turned a battle in which the Americans were outnumbered into a decisive victory.\n\nIts importance grew over time because of American industrial power. The USA could build new carriers and train pilots far faster than Japan, so the gap that Midway opened could never be closed. It also restored American confidence only six months after Pearl Harbor.\n\nHowever, Midway was not the only turning point. A month earlier the Battle of the Coral Sea had stopped the Japanese advance towards Port Moresby. After Midway, the six-month struggle for Guadalcanal was the first Japanese defeat on land and wore down Japanese ships and aircraft. Some historians argue that once Pearl Harbor had failed to destroy the American carriers, Japan was always likely to lose a long war against the USA.\n\nOverall, Midway was extremely important: it was the battle that ended Japan's ability to attack in the central Pacific and handed the initiative to the USA. Its importance rested on the USA's ability to exploit it, and it was one stage, the most decisive, in a wider turn of the war in 1942.", explanation: "Several ways of judging importance, well supported, with a sustained judgement reach the top level." }),
    ]),
    explanation: "Cambridge 0470 Paper 4 style question on Depth study E (key question 2).",
  });

  b.struct({
    ...p4,
    concepts: ["hist.ww2.victory-europe", "hist.ww2.victory-pacific"],
    stem: "**Depth study E: Allied victory and its consolidation.** Answer both parts.",
    hints: ["(a) is an account of the invasion and the Normandy campaign in order.", "(b) judges significance in different ways, including criticisms of the trial."],
    parts: checkExam(C4, [
      P.manual({ label: "(a)", marks: 16, type: X, stem: "Write an account of the D-Day landings and the Battle of Normandy, June-August 1944.", points: [
        ["Planning: Operation Overlord under Eisenhower; Mulberry harbours; huge resources.", 2],
        ["Deception: Operation Fortitude pointed to the Pas-de-Calais.", 2],
        ["Night of 5-6 June: airborne landings behind the beaches.", 2],
        ["6 June: landings on Utah, Omaha, Gold, Juno and Sword (about 156,000 troops); heavy losses at Omaha.", 2],
        ["Air superiority and bombing of bridges and railways slowed German reinforcements; Resistance sabotage.", 2],
        ["June-July: slow fighting in hedgerow country; the battle for Caen.", 2],
        ["Late July: breakout; August: German forces destroyed in the Falaise pocket.", 2],
        ["15 August landings in southern France; Paris liberated 25 August.", 2],
      ], levels: levels(16), modelAnswer: "The Allied invasion of Normandy, Operation Overlord, was planned for two years under the supreme commander, General Eisenhower. Huge numbers of ships, landing craft and supplies were gathered in Britain, together with artificial Mulberry harbours. Operation Fortitude used fake armies and false radio traffic to convince Hitler that the main invasion would come at the Pas-de-Calais.\n\nOn the night of 5-6 June 1944 airborne troops landed behind the beaches to seize bridges and protect the flanks. At dawn on 6 June about 156,000 troops landed on five beaches: Utah and Omaha (American), Gold and Sword (British) and Juno (Canadian). At Omaha the Americans suffered heavy losses, but by the end of the day all the beachheads were established. Allied air forces controlled the skies and bombed bridges and railways, and the French Resistance sabotaged communications, so German reinforcements arrived slowly. Disputes among German commanders and Hitler's control of the reserves added to the delay.\n\nIn June and July fighting was slow and costly in the hedgerow country of Normandy and around Caen. In late July the Americans broke out, and in August German forces were trapped and destroyed in the Falaise pocket. On 15 August another Allied force landed in southern France. On 25 August Paris was liberated, and the Allies began a rapid advance towards Germany.", explanation: "A well-organised, accurate account reaches the top level." }),
      P.manual({ label: "(b)", marks: 24, type: X, stem: "How significant were the Nuremberg trials?", points: [
        ["Justice: leading Nazis held personally responsible; 12 death sentences, 3 acquittals (1945-46).", 2],
        ["Evidence: the trial gathered and made public a vast record of Nazi crimes, including the Holocaust.", 2],
        ["Law: established crimes against peace and crimes against humanity; individuals could not hide behind orders or the state.", 2],
        ["Law: influenced the Genocide Convention and later international criminal courts.", 2],
        ["Consolidation: part of denazification and the Allied occupation of Germany.", 2],
        ["Comparison: the Tokyo trials (1946-48) followed the same model.", 2],
        ["Criticism: 'victors' justice'; Allied actions not judged; Soviet judges despite Katyn.", 2],
        ["Criticism: some charges applied laws after the event; most Nazis were never tried.", 2],
        ["Considers short-term and long-term significance.", 2],
        ["Considers significance for different groups (victims, Germans, international law).", 2],
        ["Considers different ways of judging significance.", 2],
        ["Supported overall judgement.", 2],
      ], levels: levels(24), modelAnswer: "The Nuremberg trial of the major Nazi leaders, held from November 1945 to October 1946 by an international tribunal of the USA, Britain, France and the USSR, was significant in several ways.\n\nIts first significance was as an act of justice. Leading Nazis were tried as individuals for conspiracy, crimes against peace, war crimes and crimes against humanity. Twelve were sentenced to death, others were imprisoned and three were acquitted, which showed that the court weighed the evidence rather than simply condemning everyone.\n\nSecond, the trial created a huge public record. Documents, films and witnesses made the scale of Nazi crimes, including the Holocaust, known around the world, which made it much harder for anyone to deny what had happened.\n\nThird, it was significant for international law. It established that leaders could be held personally responsible for starting aggressive wars and for crimes against humanity, and that following orders was no defence. It influenced the UN Genocide Convention of 1948 and, much later, the creation of international criminal courts. In the short term it also formed part of the Allied policy of denazification in occupied Germany, and the Tokyo trial of 1946-48 followed the same model.\n\nHowever, the trials have been criticised. Many Germans, and some others, saw them as 'victors' justice', because Allied actions such as the bombing of cities were not judged, and Soviet judges sat in court although the USSR had committed crimes such as the Katyn massacre. Some of the charges applied new laws to past actions, and the great majority of Nazis were never tried at all.\n\nOverall, the Nuremberg trials were highly significant, less for punishing a small number of leaders than for recording Nazi crimes and creating principles of international law that still matter today, even though their fairness is debated.", explanation: "Several ways of judging significance, well supported, with a sustained judgement reach the top level." }),
    ]),
    explanation: "Cambridge 0470 Paper 4 style question on Depth study E (key question 4).",
  });
});
