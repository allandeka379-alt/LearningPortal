// Slice W2b: ZIMSEC Paper 2 exam-format items (7 structured questions, 25 marks each): WWI, the Paris peace settlement,
// dictators, WWII, the Cold War, Cuba and the League of Nations.
import { concept, P, levels, EXAM, checkExam } from "../lib.mjs";

const Z = EXAM.ZIM_STRUCTURED;
const common = { d: 5, skill: Z.skill, applies: Z.applies, secs: Z.secs, examStyle: true, paper: "Paper 2" };

concept("hist.ww1.course-results", { file: "exam/w2b-zimsec", keyPrefix: "exam.w2b-zimsec" }, (b) => {
  // 1. The First World War (topic 12.1)
  b.struct({
    ...common, d: 4,
    concepts: ["hist.ww1.course-results"],
    stem: "**The First World War, 1914-1918.** Answer all parts.",
    hints: ["(b) should cover several fronts in order, with dates.", "(c) needs changes and continuities for Africans, then a judgement."],
    parts: checkExam(Z, [
      P.fib({ label: "(a)", stem: "Complete the statements about the First World War.", template: "The German advance on Paris was halted at the Battle of the {{blank:a}} in September 1914. The British-led offensive of July 1916 took place on the {{blank:b}}. The liner sunk by a U-boat in May 1915 was the {{blank:c}}. The USA declared war on Germany in {{blank:d}} 1917, nearly three years after the war began. The German commander in East Africa was {{blank:e}}.", blanks: [
        { id: "a", accepted: ["Marne"], choices: ["Marne", "Somme", "Verdun", "Ypres"] },
        { id: "b", accepted: ["Somme"], choices: ["Somme", "Marne", "Aisne", "Rhine"] },
        { id: "c", accepted: ["Lusitania"], choices: ["Lusitania", "Titanic", "Maine", "Bismarck"] },
        { id: "d", accepted: ["April"], choices: ["April", "January", "August", "November"] },
        { id: "e", accepted: ["Lettow-Vorbeck"], choices: ["Lettow-Vorbeck", "Rommel", "Ludendorff", "Schlieffen"] },
      ], explanation: "The Marne (1914); the Somme (1916); the Lusitania (1915); the USA entered on 6 April 1917; Lettow-Vorbeck in East Africa." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "Describe the main events of the First World War between 1914 and 1918.", points: [
        ["Western Front: Schlieffen Plan through Belgium failed at the Marne (September 1914); trench stalemate from the Channel to Switzerland.", 2],
        ["Western Front battles of attrition: Verdun and the Somme (1916), with huge losses; gas and tanks introduced.", 2],
        ["Eastern Front: Russian defeat at Tannenberg (1914); revolutions of 1917; Brest-Litovsk (March 1918).", 2],
        ["War at sea and Gallipoli: British blockade, Jutland (1916), U-boats; Gallipoli landings (1915) failed.", 2],
        ["War in Africa: Togoland, Kamerun, South West Africa (1915) captured; Lettow-Vorbeck's East African campaign; carriers and Rhodesian units.", 2],
        ["1917-18: USA entered (April 1917); German Spring Offensive failed; Hundred Days; armistice 11 November 1918.", 2],
      ], modelAnswer: "The war began in the west with Germany's Schlieffen Plan, an attack through Belgium intended to defeat France quickly. It failed at the Battle of the Marne in September 1914, and both sides dug trenches that soon stretched from the Channel to Switzerland. Attempts to break the stalemate led to battles of attrition such as Verdun and the Somme in 1916, which cost hundreds of thousands of lives; poison gas and, in 1916, tanks were introduced.\n\nIn the east the war was more mobile. Germany defeated the Russians at Tannenberg in 1914, and Russia suffered huge losses until the revolutions of 1917; the Bolsheviks made peace at Brest-Litovsk in March 1918.\n\nAt sea Britain blockaded Germany, the Battle of Jutland (1916) was indecisive, and Germany used U-boats against shipping. In 1915 an Allied attempt to knock Turkey out of the war at Gallipoli failed.\n\nIn Africa Allied forces captured Togoland, Kamerun and, in 1915, German South West Africa, while in East Africa Lettow-Vorbeck fought a long guerrilla campaign. Huge numbers of African carriers served, and Rhodesian units including the Rhodesia Native Regiment took part.\n\nThe USA entered the war in April 1917. Germany's Spring Offensive of 1918 failed, the Allies advanced in the Hundred Days, and the armistice took effect on 11 November 1918.", explanation: "Six developed points across the fronts." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "To what extent did the First World War change the lives of Africans?", points: [
        ["Change: very large numbers served as soldiers and carriers; heavy loss of life from disease and exhaustion.", 2],
        ["Change: German colonies became mandates under new rulers; returning men had wider experience and some gained political awareness.", 2],
        ["Continuity: colonial rule continued; Africans were not consulted at Paris; labour demands and taxes continued.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(8), modelAnswer: "The war changed many African lives. Hundreds of thousands served as soldiers and, above all, as carriers, especially in East Africa, and very many died of disease, hunger and exhaustion, leaving families and villages short of men. Germany's colonies passed to Britain, France, Belgium and South Africa as mandates, so millions came under new rulers. Some returning soldiers had seen that Europeans could be defeated and became more politically aware.\n\nHowever, much stayed the same. Colonial rule continued everywhere, and Africans were not consulted at the Paris Peace Conference. Taxes and demands for labour carried on, and in Southern Rhodesia settler power actually grew after the war.\n\nOverall the war changed African lives deeply for those who served and for the people of the former German colonies, but it did not change the colonial system itself, so its effects were limited compared with those of the Second World War.", explanation: "Both sides and a supported judgement." }),
    ]),
    explanation: "ZIMSEC Paper 2 style structured question on the First World War.",
  });

  // 2. The Paris Peace Conference (topic 12.2)
  b.struct({
    ...common,
    concepts: ["hist.versailles.peacemaking", "hist.versailles.terms-impact"],
    stem: "**The Paris Peace Conference, 1919-1920.** Answer all parts.",
    hints: ["(b) should cover land, armed forces, money and blame, and the other treaties.", "(c) needs arguments for and against fairness, then a judgement."],
    parts: checkExam(Z, [
      P.fib({ label: "(a)", stem: "Match each treaty with the country that signed it.", template: "Versailles was signed by {{blank:a}}. Saint-Germain was signed by {{blank:b}}. Trianon was signed by {{blank:c}}. Neuilly was signed by {{blank:d}}. Sèvres was signed by {{blank:e}}.", blanks: [
        { id: "a", accepted: ["Germany"], choices: ["Germany", "Austria", "Hungary", "Bulgaria", "Turkey"] },
        { id: "b", accepted: ["Austria"], choices: ["Germany", "Austria", "Hungary", "Bulgaria", "Turkey"] },
        { id: "c", accepted: ["Hungary"], choices: ["Germany", "Austria", "Hungary", "Bulgaria", "Turkey"] },
        { id: "d", accepted: ["Bulgaria"], choices: ["Germany", "Austria", "Hungary", "Bulgaria", "Turkey"] },
        { id: "e", accepted: ["Turkey"], choices: ["Germany", "Austria", "Hungary", "Bulgaria", "Turkey"] },
      ], wrong: [["Austria", "Germany", "Bulgaria", "Hungary", "Germany"]], explanation: "Versailles (Germany), Saint-Germain (Austria), Trianon (Hungary), Neuilly (Bulgaria), Sèvres (Ottoman Turkey)." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "Explain the provisions of the treaties made at the Paris Peace Conference.", points: [
        ["Versailles, territory: Alsace-Lorraine to France; Polish Corridor; Danzig a free city; Saar under the League; Anschluss forbidden.", 2],
        ["Versailles, colonies: all German colonies became League mandates (e.g. Tanganyika to Britain, South West Africa to South Africa).", 2],
        ["Versailles, military: army of 100,000, no conscription, tanks, submarines or aircraft; Rhineland demilitarised.", 2],
        ["Versailles, war guilt (Article 231) and reparations (fixed at 132 billion gold marks in 1921); League Covenant.", 2],
        ["Saint-Germain and Trianon: Austria and Hungary lost large territories to new states; armies limited (30,000 and 35,000).", 2],
        ["Neuilly and Sèvres: Bulgaria lost land and its Aegean coast; Ottoman Arab lands became mandates.", 2],
      ], modelAnswer: "The Treaty of Versailles (June 1919) dealt with Germany. Germany lost Alsace-Lorraine to France and West Prussia and Posen to Poland, creating the Polish Corridor; Danzig became a free city and the Saar was placed under the League for fifteen years. Union with Austria was forbidden. All of Germany's colonies became League mandates, so that Tanganyika went to Britain and South West Africa to South Africa.\n\nGermany's army was limited to 100,000 men, conscription was banned, and Germany could have no tanks, submarines or military aircraft; the Rhineland was demilitarised. Under Article 231 Germany accepted guilt for the war, which justified reparations, fixed in 1921 at 132 billion gold marks. The treaty also contained the Covenant of the League of Nations.\n\nThe other treaties dealt with Germany's allies. By Saint-Germain Austria lost land to Italy, Czechoslovakia, Poland and Yugoslavia and its army was limited to 30,000; by Trianon Hungary lost about two-thirds of its territory. By Neuilly Bulgaria lost land and its Aegean coast, and by Sèvres the Ottoman Empire lost its Arab lands, which became mandates.", explanation: "Six developed points covering several treaties." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "How far was the Treaty of Versailles fair to Germany?", points: [
        ["Unfair: a Diktat; war guilt blamed Germany alone; reparations heavy.", 2],
        ["Unfair: self-determination denied to Germans (Anschluss banned, Sudetenland, Polish Corridor).", 2],
        ["Fair: Germany's own harsh treaty at Brest-Litovsk; France's devastation; Germany kept most land and industry; reparations later reduced.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(8), modelAnswer: "In some ways the treaty was unfair. Germany was not allowed to negotiate, so Germans saw it as a Diktat. Article 231 placed the blame for the war on Germany alone, and reparations were very heavy. The principle of self-determination was applied to other nations but denied to Germans, who were forbidden to unite with Austria and were left in Poland and Czechoslovakia.\n\nOn the other hand, Germany had imposed the far harsher Treaty of Brest-Litovsk on Russia in 1918, and France had suffered enormous damage. Germany kept most of its land, population and industry, and reparations were reduced in 1924 and 1929.\n\nOverall the treaty was harsh in its manner and in the war guilt clause, but less crushing than Germans claimed, so it was only partly unfair.", explanation: "Both sides and a supported judgement." }),
    ]),
    explanation: "ZIMSEC Paper 2 style structured question on the Paris Peace Conference.",
  });

  // 3. The rise of European dictators (topic 12.4)
  b.struct({
    ...common, d: 4,
    concepts: ["hist.dictators.fascism-mussolini"],
    stem: "**The rise of European dictators.** Answer all parts.",
    hints: ["(b) should cover both Italy and Germany.", "(c) weighs gains against failures in Mussolini's foreign policy."],
    parts: checkExam(Z, [
      P.fib({ label: "(a)", stem: "Complete the statements about Mussolini's Italy.", template: "Mussolini's armed supporters were called the {{blank:a}}. He became Prime Minister after the March on Rome in {{blank:b}}. The socialist deputy murdered in 1924 was {{blank:c}}. Mussolini's agreement with the Pope was the {{blank:d}} Treaty. In 1935 Italy invaded {{blank:e}}.", blanks: [
        { id: "a", accepted: ["Blackshirts"], choices: ["Blackshirts", "Brownshirts", "Redshirts", "Greyshirts"] },
        { id: "b", accepted: ["1922"], choices: ["1922", "1919", "1925", "1929"] },
        { id: "c", accepted: ["Matteotti"], choices: ["Matteotti", "Facta", "Tellini", "D'Annunzio"] },
        { id: "d", accepted: ["Lateran"], choices: ["Lateran", "Locarno", "Stresa", "Rapallo"] },
        { id: "e", accepted: ["Abyssinia"], choices: ["Abyssinia", "Albania", "Libya", "Egypt"] },
      ], explanation: "Blackshirts; March on Rome, October 1922; Matteotti (1924); Lateran Treaty (1929); Abyssinia (1935)." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "Explain the inter-war problems that led to dictatorship in Italy and Germany.", points: [
        ["Resentment of the peace settlement: Italy's 'mutilated victory'; Germany's Diktat, war guilt and lost land.", 2],
        ["War debts and economic crisis after 1918: inflation and unemployment in Italy; hyperinflation in Germany (1923).", 2],
        ["The Great Depression after 1929: mass unemployment in Germany (about six million by 1932) discredited democracy.", 2],
        ["Weak governments: short-lived coalitions in Italy; unstable coalitions and rule by decree in Germany.", 2],
        ["Fear of communism: strikes and factory occupations in Italy (1919-20); growth of the German Communist Party.", 2],
        ["Lack of democratic tradition / support from elites (industrialists, landowners, army, the King in Italy).", 2],
      ], modelAnswer: "Both countries resented the peace settlement. Italians felt they had won a 'mutilated victory', gaining less land than promised, while Germans hated the Treaty of Versailles as a Diktat that blamed them for the war and took their land. Nationalist leaders promised to undo these humiliations.\n\nEconomic crisis weakened faith in democracy. Italy faced war debts, inflation and unemployment after 1918, and Germany suffered hyperinflation in 1923. After 1929 the Great Depression threw about six million Germans out of work by 1932, and many turned to Hitler.\n\nGovernments were weak. Italy had a series of short-lived coalitions that could not keep order, and Germany's coalitions collapsed until Chancellors governed by emergency decree.\n\nFear of communism was also crucial. Strikes, factory occupations and land seizures in Italy in 1919-1920 and the growth of the Communist Party in Germany frightened the middle classes, industrialists and landowners, who backed the Fascists and the Nazis. Finally, democracy was new in Germany and fragile in Italy, and elites such as the King of Italy and the conservatives around President Hindenburg helped the dictators into office.", explanation: "Six developed points covering both countries." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "To what extent was Mussolini's foreign policy successful between 1922 and 1939?", points: [
        ["Successes: Corfu compensation (1923), Fiume (1924), influence over Albania, prestige at Locarno and Munich.", 2],
        ["Successes: conquest of Abyssinia (1936) and victory for Franco in Spain (1939).", 2],
        ["Failures: Abyssinia and Spain were costly; sanctions; loss of British and French friendship; dependence on Hitler (Axis, Anschluss accepted, Pact of Steel).", 2],
        ["Supported judgement.", 2],
      ], levels: levels(8), modelAnswer: "Mussolini's foreign policy had several successes. In 1923 he forced Greece to pay compensation over Corfu, in 1924 he gained Fiume, and Albania became an Italian dependency. He gained prestige at Locarno in 1925 and as mediator at Munich in 1938. In 1936 he conquered Abyssinia despite League sanctions, and in 1939 Franco, whom he had helped, won in Spain.\n\nHowever, these successes had a high price. The wars in Abyssinia and Spain were very expensive and strained Italy's economy and armed forces. Abyssinia cost Italy the friendship of Britain and France and drove Mussolini into dependence on Hitler, so he had to accept the Anschluss in 1938 and signed the Pact of Steel in 1939, which tied Italy to a war it was not ready for.\n\nOverall Mussolini's foreign policy brought short-term prestige and territory, but by 1939 it had made Italy the junior partner of Germany, so it was only partly successful.", explanation: "Both sides and a supported judgement." }),
    ]),
    explanation: "ZIMSEC Paper 2 style structured question on the rise of dictators.",
  });

  // 4. The Second World War (topic 12.5)
  b.struct({
    ...common,
    concepts: ["hist.ww2.course-results"],
    stem: "**The Second World War, 1939-1945.** Answer all parts.",
    hints: ["(b) should cover the main theatres and turning points in order.", "(c) weighs benefits to Africa against costs."],
    parts: checkExam(Z, [
      P.fib({ label: "(a)", stem: "Complete the statements about the Second World War.", template: "Germany invaded the Soviet Union in Operation {{blank:a}}. Japan attacked the US fleet at {{blank:b}}. Montgomery defeated Rommel at the Battle of {{blank:c}}. The Allied landings in Normandy are known as {{blank:d}}. The first atomic bomb was dropped on {{blank:e}}.", blanks: [
        { id: "a", accepted: ["Barbarossa"], choices: ["Barbarossa", "Sea Lion", "Overlord", "Torch"] },
        { id: "b", accepted: ["Pearl Harbor"], choices: ["Pearl Harbor", "Midway", "Singapore", "Okinawa"] },
        { id: "c", accepted: ["El Alamein"], choices: ["El Alamein", "Stalingrad", "Kursk", "Dunkirk"] },
        { id: "d", accepted: ["D-Day"], choices: ["D-Day", "VE Day", "Blitzkrieg", "the Blitz"] },
        { id: "e", accepted: ["Hiroshima"], choices: ["Hiroshima", "Nagasaki", "Tokyo", "Okinawa"] },
      ], explanation: "Barbarossa (June 1941); Pearl Harbor (December 1941); El Alamein (1942); D-Day (6 June 1944); Hiroshima (6 August 1945)." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "Describe the main events of the Second World War from 1939 to 1945.", points: [
        ["Blitzkrieg: Poland (1939); Denmark, Norway, Low Countries and France (1940); Dunkirk; French armistice (June 1940).", 2],
        ["Battle of Britain (July-October 1940): RAF defeated the Luftwaffe; invasion postponed.", 2],
        ["Barbarossa (June 1941) halted before Moscow; Stalingrad (1942-43) German Sixth Army surrendered.", 2],
        ["North Africa and Italy: El Alamein (1942), Torch, Axis surrender in Tunisia (1943); Italy invaded and surrendered (1943).", 2],
        ["Pacific: Pearl Harbor (December 1941); Japanese conquests; Midway (June 1942); island-hopping; Burma.", 2],
        ["Defeat of the Axis: D-Day (June 1944); Soviets in Berlin; German surrender 8 May 1945; atomic bombs; Japan surrendered (September 1945).", 2],
      ], modelAnswer: "The war began with Germany's invasion of Poland on 1 September 1939. Using Blitzkrieg, Germany conquered Poland in weeks and in 1940 overran Denmark, Norway, the Low Countries and France; many British and French troops escaped from Dunkirk, but France signed an armistice in June 1940.\n\nIn the Battle of Britain (July-October 1940) the RAF defeated the Luftwaffe, and Hitler postponed his invasion. In June 1941 Germany invaded the USSR in Operation Barbarossa, but was halted before Moscow in December. At Stalingrad (1942-1943) the German Sixth Army was surrounded and surrendered, after which the Red Army advanced west.\n\nIn North Africa Montgomery defeated Rommel at El Alamein in late 1942, and after the Torch landings Axis forces surrendered in Tunisia in May 1943. The Allies then invaded Italy, which surrendered in September 1943.\n\nIn the Pacific Japan attacked Pearl Harbor on 7 December 1941 and conquered much of South-East Asia, but lost four carriers at Midway in June 1942. The Americans advanced by island-hopping, while British, Indian and African troops fought in Burma.\n\nOn D-Day, 6 June 1944, the Allies landed in Normandy. Soviet forces reached Berlin in April 1945 and Germany surrendered on 8 May. After atomic bombs fell on Hiroshima and Nagasaki and the USSR declared war, Japan surrendered, signing on 2 September 1945.", explanation: "Six developed points covering the main theatres." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "How far did the results of the Second World War benefit Africa?", points: [
        ["Benefit: weakened colonial powers, UN and Atlantic Charter ideas, superpowers critical of empire, speeding decolonisation.", 2],
        ["Benefit: ex-servicemen's experience and growth of towns and industry strengthened nationalist movements.", 2],
        ["Costs/limits: lives lost, forced labour and requisitioning; settler rule entrenched in places like Southern Rhodesia; the Cold War later brought proxy conflicts.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(8), modelAnswer: "The war's results benefited Africa in important ways. Britain and France were exhausted and in debt, the new United Nations supported self-determination, and both superpowers opposed old-style empires, so decolonisation speeded up. African ex-servicemen returned with new experiences and expectations, and wartime growth of towns and industry helped nationalist parties to organise.\n\nHowever, the war also brought costs. Many Africans died or were forced to work or supply food. In settler colonies such as Southern Rhodesia, white immigration after the war strengthened minority rule. The Cold War that followed brought superpower rivalry and proxy conflicts to the continent.\n\nOverall the war's results helped Africa mainly by weakening the colonial powers and encouraging nationalism, but the benefits came slowly and unevenly, and in southern Africa freedom took decades more.", explanation: "Both sides and a supported judgement." }),
    ]),
    explanation: "ZIMSEC Paper 2 style structured question on the Second World War.",
  });

  // 5. The Cold War (topic 12.6)
  b.struct({
    ...common,
    concepts: ["hist.cold-war.manifestations-impact"],
    stem: "**The Cold War.** Answer all parts.",
    hints: ["(b) needs several manifestations, each with an example.", "(c) weighs Gorbachev against other causes of the end of the Cold War."],
    parts: checkExam(Z, [
      P.fib({ label: "(a)", stem: "Complete the statements about the Cold War.", template: "The Western military alliance formed in 1949 was {{blank:a}}. The communist alliance formed in 1955 was the {{blank:b}} Pact. The first artificial satellite, launched in 1957, was {{blank:c}}. The Wall dividing {{blank:d}} was built in 1961. The Soviet leader whose reforms helped end the Cold War was {{blank:e}}.", blanks: [
        { id: "a", accepted: ["NATO"], choices: ["NATO", "SEATO", "Comecon", "OAU"] },
        { id: "b", accepted: ["Warsaw"], choices: ["Warsaw", "Baghdad", "Moscow", "Berlin"] },
        { id: "c", accepted: ["Sputnik"], choices: ["Sputnik", "Apollo", "Vostok", "Explorer"] },
        { id: "d", accepted: ["Berlin"], choices: ["Berlin", "Vienna", "Prague", "Warsaw"] },
        { id: "e", accepted: ["Gorbachev"], choices: ["Gorbachev", "Khrushchev", "Brezhnev", "Stalin"] },
      ], explanation: "NATO (1949); Warsaw Pact (1955); Sputnik (1957); Berlin Wall (1961); Gorbachev (from 1985)." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "Describe the manifestations of the Cold War.", points: [
        ["Rival alliances: NATO (1949) and the Warsaw Pact (1955); Comecon; SEATO.", 2],
        ["Arms race: Soviet atomic bomb 1949, hydrogen bombs, ICBMs; mutually assured destruction; later arms control.", 2],
        ["Space race: Sputnik (1957), Gagarin (1961), the Moon landing (1969).", 2],
        ["Propaganda and espionage: radio, posters, spies; McCarthyism; Olympic boycotts (1980, 1984).", 2],
        ["Crises: Berlin Blockade (1948-49), Berlin Wall (1961), Cuban Missile Crisis (1962); Hungary 1956, Czechoslovakia 1968.", 2],
        ["Proxy wars: Korea (1950-53), Vietnam, Angola (from 1975), Afghanistan (1979-89); rival support for liberation movements in Africa.", 2],
      ], modelAnswer: "The Cold War showed itself first in rival alliances: NATO was formed in 1949 and the Warsaw Pact in 1955, with Comecon linking the communist economies.\n\nThere was a nuclear arms race. The USSR tested its first atomic bomb in 1949, both sides built hydrogen bombs and long-range missiles, and each could destroy the other many times over, which became known as mutually assured destruction.\n\nThe superpowers also competed in space. The USSR launched Sputnik in 1957 and put Yuri Gagarin into space in 1961, and the USA landed men on the Moon in 1969.\n\nBoth sides used propaganda and espionage, through radio stations, posters and spies; in the USA fear of communism led to McCarthyism, and both sides boycotted Olympic Games in 1980 and 1984.\n\nThere were dangerous crises over Berlin, with the blockade of 1948-1949 and the Wall in 1961, and over Cuba in 1962, while Soviet forces crushed risings in Hungary (1956) and Czechoslovakia (1968).\n\nFinally there were proxy wars, in Korea (1950-1953), Vietnam, Angola and Afghanistan, and in Africa the superpowers and China supported rival liberation movements, such as ZIPRA and ZANLA in Zimbabwe.", explanation: "Six developed manifestations with examples." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "How far was Gorbachev responsible for the end of the Cold War?", points: [
        ["Gorbachev: glasnost and perestroika; refusal to use force in eastern Europe in 1989; arms agreements (INF 1987); withdrawal from Afghanistan.", 2],
        ["Other: Soviet economic weakness and the cost of the arms race and Afghanistan.", 2],
        ["Other: Western pressure and diplomacy; popular movements in eastern Europe (e.g. the opening of the Berlin Wall, 9 November 1989).", 2],
        ["Supported judgement.", 2],
      ], levels: levels(8), modelAnswer: "Gorbachev was very important. From 1985 his policies of glasnost and perestroika loosened communist control, he signed the INF Treaty in 1987 and withdrew Soviet troops from Afghanistan, and in 1989 he refused to use force to keep the communist governments of eastern Europe in power.\n\nHowever, other factors mattered. The Soviet economy was weak and could not afford the arms race and the war in Afghanistan, which was why reform was necessary. Western pressure and diplomacy also played a part, and ordinary people in eastern Europe brought down their governments in 1989, most famously when crowds crossed the opened Berlin Wall on 9 November.\n\nOverall Gorbachev's choices allowed the Cold War to end peacefully, but the underlying cause was Soviet economic weakness and popular pressure, so he was responsible to a large extent but not alone.", explanation: "Both sides and a supported judgement." }),
    ]),
    explanation: "ZIMSEC Paper 2 style structured question on the Cold War.",
  });

  // 6. The Cuban Revolution (topic 14.3)
  b.struct({
    ...common, d: 4,
    concepts: ["hist.cuba.revolution", "hist.containment.cuba"],
    stem: "**The Cuban Revolution.** Answer all parts.",
    hints: ["(b) should take the stages in order from 1953 to 1959.", "(c) needs effects on the USA and USSR, Latin America and Africa, then a judgement."],
    parts: checkExam(Z, [
      P.fib({ label: "(a)", stem: "Complete the statements about the Cuban Revolution.", template: "Batista seized power in a coup in {{blank:a}}. Castro's attack on the {{blank:b}} barracks took place on 26 July 1953. Castro's rebels landed from the yacht {{blank:c}} in December 1956. The guerrillas fought from the {{blank:d}} mountains. The CIA-backed exile invasion of April 1961 landed at the Bay of {{blank:e}}.", blanks: [
        { id: "a", accepted: ["1952"], choices: ["1952", "1948", "1956", "1959"] },
        { id: "b", accepted: ["Moncada"], choices: ["Moncada", "Santa Clara", "Granma", "Guantánamo"] },
        { id: "c", accepted: ["Granma"], choices: ["Granma", "Maine", "Moncada", "Havana"] },
        { id: "d", accepted: ["Sierra Maestra"], choices: ["Sierra Maestra", "Andes", "Atlas", "Pyrenees"] },
        { id: "e", accepted: ["Pigs"], choices: ["Pigs", "Havana", "Santiago", "Guantánamo"] },
      ], wrong: [["1959", "Santa Clara", "Maine", "Andes", "Havana"]], explanation: "Batista's coup (March 1952); Moncada (1953); the Granma (1956); the Sierra Maestra; the Bay of Pigs (1961)." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "Outline the stages of the Cuban Revolution from 1953 to 1959.", points: [
        ["Background: Batista's coup (1952), corrupt, repressive, US-dependent regime; inequality.", 2],
        ["Moncada (26 July 1953): attack failed; Castro's trial speech; imprisonment; amnesty (1955).", 2],
        ["Exile in Mexico: 26th of July Movement formed; meeting with Guevara; training.", 2],
        ["Granma landing (2 December 1956): most rebels killed or captured; survivors reached the Sierra Maestra.", 2],
        ["Guerrilla war (1957-58): peasant support, raids, urban underground, propaganda; US arms embargo (March 1958); Batista's offensive failed.", 2],
        ["Victory: Guevara at Santa Clara (December 1958); Batista fled 1 January 1959; rebels entered Havana; radicalisation followed.", 2],
      ], modelAnswer: "The revolution was a reaction against Fulgencio Batista, who seized power in a coup in March 1952 and ran a corrupt, repressive regime dependent on the USA, in a country of great inequality.\n\nThe first stage was the attack on the Moncada barracks on 26 July 1953. It failed and many rebels were killed, but at his trial Castro made the speech later published as History Will Absolve Me. He was imprisoned and released in an amnesty in 1955.\n\nIn exile in Mexico Castro founded the 26th of July Movement, met Che Guevara and trained his followers. On 2 December 1956, 82 men landed from the yacht Granma; most were killed or captured, but a small group reached the Sierra Maestra.\n\nIn 1957-1958 the guerrillas fought from the mountains. They won peasant support, raided army posts, and worked with an urban underground, while rebel radio spread their message. In March 1958 the USA stopped selling arms to Batista, and his summer offensive failed.\n\nFinally, in December 1958 Guevara's column won the battle of Santa Clara, Batista fled on 1 January 1959, and the rebels entered Havana. Over the next two years the revolution became more radical and turned to communism.", explanation: "Six developed points in order." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "To what extent did the Cuban Revolution affect the rest of the world?", points: [
        ["Superpowers: alliance with the USSR; US embargo; Bay of Pigs (1961) and the Missile Crisis (1962) brought the world close to nuclear war; hotline and Test Ban Treaty.", 2],
        ["Latin America and Africa: inspired guerrilla movements; Guevara in the Congo and Bolivia; Cuban troops in Angola (from 1975) and Ethiopia; doctors and scholarships.", 2],
        ["Limits: most Latin American revolutions failed; effects in many regions were limited; Cuba depended on the USSR.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(8), modelAnswer: "The revolution had a great effect on the world. Cuba's alliance with the USSR, ninety miles from the USA, led to the US embargo, the Bay of Pigs invasion of 1961 and the Cuban Missile Crisis of 1962, the moment when the world came closest to nuclear war; afterwards the hotline and the Partial Test Ban Treaty were agreed.\n\nIt also affected the developing world. Cuba inspired guerrilla movements in Latin America, and Guevara fought in the Congo and died in Bolivia in 1967. Cuban troops supported the MPLA in Angola from 1975 and Ethiopia in 1977-1978, and Cuba sent doctors and teachers and trained African students.\n\nHowever, most Latin American guerrilla movements failed, and Cuba's ability to act abroad depended on Soviet support.\n\nOverall the revolution's effects were very great for a small island, especially through the Missile Crisis and in Africa, so it affected the world to a large extent.", explanation: "Both sides and a supported judgement." }),
    ]),
    explanation: "ZIMSEC Paper 2 style structured question on the Cuban Revolution.",
  });

  // 7. The League of Nations (topic 12.3)
  b.struct({
    ...common,
    concepts: ["hist.league.organisation", "hist.league.1920s", "hist.league.1930s"],
    stem: "**The League of Nations.** Answer all parts.",
    hints: ["(b) needs several reasons, each explained, for the collapse by 1939.", "(c) weighs successes against failures in the 1920s."],
    parts: checkExam(Z, [
      P.fib({ label: "(a)", stem: "Complete the statements about the League of Nations.", template: "The League's headquarters were in {{blank:a}}. The organ in which every member had one vote was the {{blank:b}}. The Permanent Court of International Justice sat in {{blank:c}}. The League agency that worked to improve working conditions was the {{blank:d}}. The League's commission of inquiry into Manchuria was led by Lord {{blank:e}}.", blanks: [
        { id: "a", accepted: ["Geneva"], choices: ["Geneva", "Paris", "London", "New York"] },
        { id: "b", accepted: ["Assembly"], choices: ["Assembly", "Council", "Secretariat", "Court"] },
        { id: "c", accepted: ["The Hague"], choices: ["The Hague", "Geneva", "Versailles", "Brussels"] },
        { id: "d", accepted: ["International Labour Organisation"], choices: ["International Labour Organisation", "Mandates Commission", "Health Organisation", "Slavery Commission"] },
        { id: "e", accepted: ["Lytton"], choices: ["Lytton", "Hoare", "Nansen", "Pearce"] },
      ], explanation: "Geneva; the Assembly; The Hague; the International Labour Organisation; Lord Lytton." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "Explain the reasons for the collapse of the League of Nations by 1939.", points: [
        ["Membership: the USA never joined, so sanctions were weak; Germany, Japan and Italy left (1933, 1933, 1937).", 2],
        ["Structure: no army; unanimity made decisions slow; commissions took months.", 2],
        ["Self-interest of Britain and France: unwilling to impose sanctions or fight; preferred appeasement.", 2],
        ["The Depression: encouraged aggressive nationalism and made members reluctant to lose trade.", 2],
        ["Manchuria (1931-33): Lytton Report but no sanctions; Japan kept Manchuria and left.", 2],
        ["Abyssinia (1935-36): weak sanctions, no oil ban, Suez open, Hoare-Laval Pact; collective security discredited; Munich made without the League.", 2],
      ], modelAnswer: "The League had weaknesses from the start. The USA never joined, so economic sanctions had a gap, and great powers left when it suited them: Japan and Germany in 1933 and Italy in 1937. The League had no army, and its rule of unanimity and slow commissions of inquiry made quick action impossible.\n\nBritain and France, its leading members, put their own interests first. They were weakened by the First World War and unwilling to impose sanctions or fight, and in the late 1930s they turned to appeasement outside the League.\n\nThe Great Depression made matters worse. It encouraged aggressive nationalism in Japan, Italy and Germany, and made members reluctant to impose sanctions that would cost them trade.\n\nThe Manchurian crisis showed this. Japan seized Manchuria in 1931; the Lytton Report condemned it, but no sanctions were imposed and Japan simply left the League.\n\nThe Abyssinian crisis destroyed the League's credibility. Sanctions against Italy excluded oil, the Suez Canal stayed open, and the Hoare-Laval Pact showed Britain and France ready to reward the aggressor. After 1936 nobody trusted collective security, and the Munich Agreement of 1938 was made without the League.", explanation: "Six developed reasons." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "How successful was the League of Nations in the 1920s?", points: [
        ["Successes: Aaland Islands (1921), Bulgaria (1925); loans to Austria and Hungary.", 2],
        ["Successes: humanitarian work (refugees and prisoners of war under Nansen, health, ILO, Slavery Convention 1926).", 2],
        ["Failures: Vilna (1920) and Corfu (1923); no progress on disarmament; Locarno and Kellogg-Briand made outside the League.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(8), modelAnswer: "The League had real successes in the 1920s. It settled the Aaland Islands dispute between Sweden and Finland in 1921 and stopped the Greek invasion of Bulgaria in 1925, and it arranged loans that rescued Austria and Hungary. Its humanitarian work was impressive: under Nansen it returned hundreds of thousands of prisoners of war and issued passports to refugees, its Health Organisation fought epidemics, the ILO campaigned for better working conditions, and the 1926 Slavery Convention committed members to end slavery.\n\nHowever, there were failures. Poland kept Vilna in defiance of the League in 1920, and over Corfu in 1923 Mussolini forced Greece to pay compensation. There was no progress on disarmament, and the most important agreements of the decade, Locarno and the Kellogg-Briand Pact, were made outside the League.\n\nOverall the League was fairly successful in the 1920s, especially in humanitarian work and disputes between small states, but it failed when a determined power defied it.", explanation: "Both sides and a supported judgement." }),
    ]),
    explanation: "ZIMSEC Paper 2 style structured question on the League of Nations.",
  });
});
