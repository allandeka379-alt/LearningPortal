// W3a exam-format items for Cambridge IGCSE History 0470: Paper 1 structured essays (20 = 4 + 6 + 10) on Option B
// key questions 4-6 and Depth study D; Paper 2 document questions (40 = 7 + 8 + 7 + 8 + 10) on the Cold War, Soviet
// control of Eastern Europe and containment; Paper 4 (40 = 16 + 24) on Depth study D. Plans from EXAM in lib.mjs;
// part structure is our convention (reviewer to check). All sources are invented for these questions.
import { concept, P, source, sources, levels, EXAM, checkExam } from "../lib.mjs";

const P1 = EXAM.CAM_P1;
const P2 = EXAM.CAM_P2;
const P4 = EXAM.CAM_P4;
const p1A = { skill: P1.skill, applies: P1.applies, secs: P1.secs, examStyle: true, paper: "Cambridge Paper 1 Section A" };
const p1B = { ...p1A, paper: "Cambridge Paper 1 Section B" };
const p2 = { skill: P2.skill, applies: P2.applies, secs: P2.secs, examStyle: true, paper: "Cambridge Paper 2" };
const p4 = { skill: P4.skill, applies: P4.applies, secs: P4.secs, examStyle: true, paper: "Cambridge Paper 4" };

const CW = ["hist.cold-war.breakdown-1945", "hist.cold-war.eastern-europe-1948", "hist.cold-war.berlin-blockade"];

/** Paper 1 structured essay: (a) describe 4 (points), (b) explain 6 (levels), (c) evaluate 10 (levels). */
function p1Parts({ a, b, c }) {
  return checkExam(P1, [
    P.manual({ label: "(a)", marks: 4, stem: a.stem, points: a.points, modelAnswer: a.model, explanation: "One mark for each accurate, relevant point (or two marks for a developed point)." }),
    P.manual({ label: "(b)", marks: 6, type: "EXTENDED_RESPONSE", stem: b.stem, points: b.points, levels: levels(6), modelAnswer: b.model, explanation: "Levels: the top level explains two or more reasons with supporting detail." }),
    P.manual({ label: "(c)", marks: 10, type: "EXTENDED_RESPONSE", stem: c.stem, points: c.points, levels: levels(10), modelAnswer: c.model, explanation: "Levels: the top level explains both sides with specific evidence and reaches a supported judgement." }),
  ]);
}

/** Paper 2 document question: five self-marked parts of 7, 8, 7, 8 and 10 marks. */
function p2Parts(list) {
  const marks = [7, 8, 7, 8, 10];
  const labels = ["(a)", "(b)", "(c)", "(d)", "(e)"];
  return checkExam(P2, list.map((x, i) => P.manual({
    label: labels[i], marks: marks[i], type: "EXTENDED_RESPONSE", stem: x.stem, points: x.points, modelAnswer: x.model,
    ...(i === 4 ? { levels: levels(10) } : {}),
    explanation: i === 4 ? "Levels: the top level uses the sources on both sides, evaluates them and adds own knowledge to reach a judgement." : "Credit is given for using the sources' content and provenance, supported by own knowledge.",
  })));
}

/** Paper 4: (a) an account, 16 (levels); (b) importance, 24 (levels). */
function p4Parts({ a, b }) {
  return checkExam(P4, [
    P.manual({ label: "(a)", marks: 16, type: "EXTENDED_RESPONSE", stem: a.stem, points: a.points, levels: levels(16), modelAnswer: a.model, explanation: "Levels: the top level is a well-organised, accurate and detailed account in chronological order that stays focused on the question." }),
    P.manual({ label: "(b)", marks: 24, type: "EXTENDED_RESPONSE", stem: b.stem, points: b.points, levels: levels(24), modelAnswer: b.model, explanation: "Levels: the top level discusses different ways of judging importance, with specific evidence, and reaches a supported judgement." }),
  ]);
}

concept("hist.cold-war.breakdown-1945", { file: "exam/w3a-cambridge", keyPrefix: "exam.w3a-cambridge" }, (b) => {
  // ---------------------------------------------------------------------------------------------------------------
  // Paper 1 Section A: Option B key question 4 (Cold War origins) x2.
  b.struct({
    ...p1A, d: 4, concepts: ["hist.cold-war.breakdown-1945"],
    stem: "This question is about the breakdown of the wartime alliance.",
    hints: ["In (c), weigh Potsdam against longer-term causes and other events."],
    parts: p1Parts({
      a: { stem: "Describe what was agreed at the Yalta Conference.", points: [
        "Germany and Berlin to be divided into zones of occupation.",
        "War criminals to be tried / Germany to pay reparations.",
        "The USSR to join the war against Japan after Germany's defeat.",
        "Free elections in liberated Europe / United Nations to be set up / Poland's borders moved west.",
      ], model: "The Big Three agreed that Germany and Berlin would be divided into zones of occupation and that war criminals would be tried. The USSR would join the war against Japan after Germany's defeat. Liberated countries would hold free elections, and a United Nations organisation would be set up." },
      b: { stem: "Explain why relations between the USA and the USSR worsened after the defeat of Germany.", points: [
        ["Ideological rivalry: capitalism and democracy against communism; Hitler the only common enemy", 2],
        ["Poland and Eastern Europe: Stalin's buffer zone seen as breaking the promise of free elections", 2],
        ["Truman's harder line, the atomic bomb, the Long Telegram and the Iron Curtain speech", 2],
      ], model: "Relations worsened partly because the two powers had opposed systems: once Hitler was defeated, the USA and the USSR had little left in common, and each saw the other's ideology as a threat. The most immediate dispute was Eastern Europe. Stalin wanted a buffer zone of friendly governments and imposed a pro-communist government in Poland, which the West saw as breaking the Yalta promise of free elections. Attitudes then hardened. Truman, President from April 1945, was more suspicious than Roosevelt, and the American atomic bomb alarmed Stalin. In 1946 Kennan's Long Telegram and Churchill's Iron Curtain speech showed that Western leaders now saw the USSR as an enemy, while Stalin called Churchill a warmonger." },
      c: { stem: "'The disagreements at the Potsdam Conference were the main reason for the breakdown of the wartime alliance.' How far do you agree? Explain your answer.", points: [
        ["For: Potsdam disputes over reparations, Poland's government and border, and Eastern Europe", 2],
        ["For: new leaders (Truman, Attlee) and the bomb changed the atmosphere at Potsdam", 2],
        ["Against: long-term ideological rivalry and mistrust since 1917", 2],
        ["Against: Yalta's vague promises and Soviet actions in Eastern Europe; the speeches of 1946", 2],
        ["Supported judgement", 2],
      ], model: "Potsdam showed how far relations had fallen. The leaders argued over reparations, over the government of Poland and over Soviet influence in Eastern Europe, and accepted the new Polish border only for the time being. The atmosphere had changed: Truman was more suspicious than Roosevelt, Attlee replaced Churchill midway, and Truman's mention of a powerful new weapon showed that the USA now had the atomic bomb.\n\nHowever, Potsdam reflected the breakdown more than it caused it. The USA and the USSR had been ideological enemies since 1917, and the West remembered the Nazi-Soviet Pact. The dispute over Poland had begun before Yalta and continued after it, since Stalin's idea of 'free elections' meant governments friendly to the USSR. After Potsdam, the bomb, the Long Telegram and the Iron Curtain speech hardened attitudes further.\n\nI disagree with the statement. Potsdam revealed the disagreements, but the main reason for the breakdown was the clash of ideologies and security needs, shown in the struggle over Eastern Europe, which no conference could settle." },
    }),
    explanation: "Paper 1 structured essay on key question 4 (20 marks).",
  });
  b.struct({
    ...p1A, d: 5, concepts: ["hist.cold-war.eastern-europe-1948", "hist.cold-war.berlin-blockade"],
    stem: "This question is about the origins of the Cold War.",
    hints: ["In (c), put the case against each superpower before deciding."],
    parts: p1Parts({
      a: { stem: "Describe the Berlin airlift.", points: [
        "Began in June 1948 after the USSR cut road, rail and canal links to West Berlin.",
        "American and British aircraft flew food, fuel and coal through the air corridors.",
        "At its height a plane landed every few minutes; about 2.3 million tonnes (estimate).",
        "Lasted until Stalin lifted the blockade in May 1949.",
      ], model: "When the USSR blockaded West Berlin in June 1948, the Americans and British supplied the city by air through three air corridors. They flew in food, fuel and especially coal; at the height of the airlift a plane landed every few minutes, and historians estimate about 2.3 million tonnes were delivered. The airlift continued until Stalin lifted the blockade in May 1949." },
      b: { stem: "Explain why the USA introduced Marshall Aid.", points: [
        ["Containment: poverty and hunger made communism attractive; prosperity would resist it", 2],
        ["Fear of communist gains (Greece, strong communist parties in the west, the Czech coup of 1948)", 2],
        ["American economic interests: European markets for American goods; humanitarian aims", 2],
      ], model: "The USA introduced Marshall Aid mainly to contain communism. Truman's government believed that poverty and hunger after the war made people turn to communism, so rebuilding Europe's economies would make communism less attractive. This fear was sharpened by events: the Greek civil war, strong communist parties in France and Italy, and, in February 1948, the communist takeover in Czechoslovakia, which persuaded Congress to approve the aid. There were also economic reasons: a prosperous Europe would buy American goods, which helped American industry and avoided a post-war slump." },
      c: { stem: "'The USSR was more to blame than the USA for the Cold War.' How far do you agree? Explain your answer.", points: [
        ["Against the USSR: broken Yalta promise; salami tactics; rigged Polish elections (1947); Czech coup (1948)", 2],
        ["Against the USSR: the Berlin Blockade of two million civilians", 2],
        ["Against the USA: atomic monopoly; Truman Doctrine and Marshall Aid as expansion of influence ('dollar imperialism')", 2],
        ["Against the USA: Bizonia and the Deutschmark broke the plan to run Germany as one unit", 2],
        ["Supported judgement (may use traditional, revisionist and post-revisionist views)", 2],
      ], model: "There is a strong case against the USSR. Stalin broke the Yalta promise of free elections: communists gained control of Eastern Europe through salami tactics and rigged elections, as in Poland in 1947, and the Czech coup of 1948 destroyed the last democracy in the region. In 1948 the USSR blockaded West Berlin, trying to force the West out by cutting off supplies to two million civilians. Traditional historians therefore blame the USSR.\n\nRevisionist historians point to American actions. The USA used its atomic monopoly to put pressure on the USSR, and the Truman Doctrine and Marshall Aid extended American influence into Europe, which Stalin called dollar imperialism. In Germany the West merged its zones and introduced the Deutschmark without Soviet agreement, which provoked the blockade.\n\nI largely agree. Both sides acted from fear, as post-revisionists argue, but the Soviet imposition of communist governments on Eastern Europe came first and caused most of the American reactions, so the USSR bears more of the blame, though not all of it." },
    }),
    explanation: "Paper 1 structured essay on key question 4 (20 marks).",
  });

  // Paper 1 Section A: key question 5 (containment) x2.
  b.struct({
    ...p1A, d: 4, concepts: ["hist.containment.korea"],
    stem: "This question is about the USA and the Korean War.",
    hints: ["In (c), consider Truman, the Chinese and the UN as well as MacArthur."],
    parts: p1Parts({
      a: { stem: "Describe the role of the United Nations in Korea in 1950.", points: [
        "The USA took North Korea's invasion to the Security Council.",
        "The USSR was boycotting the Council, so there was no veto.",
        "The Council called on members to help South Korea.",
        "A UN force was formed under MacArthur; troops came from many countries, most from the USA.",
      ], model: "After North Korea invaded in June 1950, the USA took the issue to the Security Council. The USSR was boycotting the Council over China's seat, so it could not use its veto, and the Council called on member states to help South Korea. A UN force was formed under General MacArthur; most troops were American, but others came from countries such as Britain, Turkey and Canada." },
      b: { stem: "Explain why China entered the Korean War.", points: [
        ["UN forces crossed the 38th parallel and advanced towards the Yalu River, China's border", 2],
        ["China feared an American-led army on its border might attack the new communist state (1949)", 2],
        ["Its warnings were ignored by MacArthur; solidarity with a communist neighbour / Soviet encouragement", 2],
      ], model: "China entered the war because the UN went beyond defending South Korea. After Inchon, UN forces crossed the 38th parallel in October 1950, captured Pyongyang and advanced towards the Yalu River, China's border. The new communist government, set up only in 1949, feared that an American-led army on its border might attack China itself. China warned that it would intervene, but MacArthur did not take the warning seriously. It also wished to keep a friendly communist state as a buffer between itself and the Americans." },
      c: { stem: "'MacArthur was responsible for the failure to unite Korea.' How far do you agree? Explain your answer.", points: [
        ["For: MacArthur advanced recklessly to the Yalu, ignoring Chinese warnings", 2],
        ["For: his calls to widen the war divided the UN side; he was dismissed in April 1951", 2],
        ["Against: Truman and the UN approved crossing the 38th parallel", 2],
        ["Against: China's huge intervention and the decision to fight a limited war (no attack on China, no atomic weapons)", 2],
        ["Supported judgement", 2],
      ], model: "MacArthur bears much responsibility. After Inchon he pressed forward to the Yalu River, dismissing China's warnings and spreading his forces thinly, so the Chinese attacks of late 1950 drove the UN back south of the 38th parallel. His public calls to attack China then caused a crisis with Truman, who dismissed him in April 1951.\n\nHowever, he was not acting alone. Truman and the UN approved the advance into North Korea, so the change from containment to rollback was a political decision. The decisive factor was China's intervention with huge forces. After that, Truman chose a limited war, refusing to attack China or use atomic weapons, because he feared war with China and the USSR; this meant Korea could not be united by force.\n\nI only partly agree. MacArthur's misjudgement made the defeat of 1950 worse, but Korea stayed divided because China would not accept a hostile Korea on its border and the USA would not risk a wider war to change that." },
    }),
    explanation: "Paper 1 structured essay on key question 5 (20 marks).",
  });
  b.struct({
    ...p1A, d: 5, concepts: ["hist.containment.vietnam"],
    stem: "This question is about American involvement in Vietnam.",
    hints: ["In (c), compare the military and political effects of Tet with other turning points."],
    parts: p1Parts({
      a: { stem: "Describe the tactics used by the Viet Cong.", points: [
        "Guerrilla warfare: small units, ambushes, hit and run.",
        "Booby traps and mines.",
        "Tunnel networks (for example at Cu Chi).",
        "Mixed with villagers / relied on peasant support; supplied by the Ho Chi Minh Trail.",
      ], model: "The Viet Cong used guerrilla tactics: small units ambushed American patrols and then disappeared. They laid booby traps and mines and built tunnel networks, such as those at Cu Chi, to hide and move. They mixed with villagers and relied on them for food and information, and received supplies from the North along the Ho Chi Minh Trail." },
      b: { stem: "Explain why the USA became involved in Vietnam after the French defeat.", points: [
        ["Containment and the domino theory: fear for Laos, Cambodia, Thailand and beyond", 2],
        ["Support for Diem's South Vietnam after the Geneva Agreements; elections of 1956 not held", 2],
        ["Credibility: the NLF's growth (1960); Kennedy increased advisers to about 16,000", 2],
      ], model: "The USA became involved because of containment and the domino theory: Eisenhower warned in 1954 that if Vietnam fell, its neighbours would follow. After the French defeat, the Geneva Agreements divided Vietnam, and the USA backed Ngo Dinh Diem's South Vietnam with money, weapons and advisers, supporting his refusal to hold the 1956 elections that Ho Chi Minh was expected to win. When the National Liberation Front began a guerrilla war in 1960, Kennedy increased the number of American advisers to about 16,000, because abandoning an ally would damage American credibility against the USSR and China." },
      c: { stem: "'The Tet Offensive was the turning point of the Vietnam War.' How far do you agree? Explain your answer.", points: [
        ["For: political shock; contradicted claims of progress; Johnson did not seek re-election", 2],
        ["For: American policy turned towards negotiation and withdrawal afterwards", 2],
        ["Against: militarily a communist defeat; the Viet Cong badly weakened", 2],
        ["Against: other turning points (Gulf of Tonkin escalation 1964-65; Nixon's Vietnamisation 1969; Paris Accords 1973)", 2],
        ["Supported judgement", 2],
      ], model: "Tet was a turning point in American opinion. In January 1968 the Viet Cong and North Vietnamese attacked more than a hundred towns and cities and entered the US embassy compound in Saigon. Americans had been told the war was being won, so Tet destroyed public trust. In March Johnson announced he would not seek re-election, and American policy moved towards negotiation and withdrawal.\n\nHowever, militarily Tet was a communist defeat: the attackers suffered very heavy losses and the Viet Cong were badly weakened. Other turning points also matter. The Gulf of Tonkin Resolution of 1964 and the arrival of combat troops in 1965 turned an advisory role into a full war, while Nixon's Vietnamisation from 1969 began the actual withdrawal, completed after the Paris Peace Accords of 1973.\n\nI largely agree. Tet did not change the military balance, but it changed what Americans were willing to accept, and every later step towards withdrawal followed from that loss of support." },
    }),
    explanation: "Paper 1 structured essay on key question 5 (20 marks).",
  });

  // Paper 1 Section A: key question 6 (Soviet control of Eastern Europe) x2.
  b.struct({
    ...p1A, d: 4, concepts: ["hist.soviet-control.hungary-czechoslovakia"],
    stem: "This question is about Soviet control of Hungary and Czechoslovakia.",
    hints: ["In (c), think about what the use of force reveals about consent."],
    parts: p1Parts({
      a: { stem: "Describe the Soviet reaction to the Prague Spring.", points: [
        "Warsaw Pact forces invaded on the night of 20-21 August 1968.",
        "Dubček taken to Moscow and forced to reverse most reforms.",
        "Dubček replaced by Husák (April 1969).",
        "The Brezhnev Doctrine justified intervention to defend socialism.",
      ], model: "On the night of 20-21 August 1968 Soviet and other Warsaw Pact forces invaded Czechoslovakia. Dubček was taken to Moscow and forced to reverse most of his reforms, and in April 1969 he was replaced by Husák. The USSR justified the invasion with the Brezhnev Doctrine: communist states had a right to intervene where socialism was threatened." },
      b: { stem: "Explain why there was opposition to Soviet control in Hungary in 1956.", points: [
        ["Rákosi's harsh Stalinist rule and the secret police", 2],
        ["Poverty, Soviet economic exploitation, religion and national resentment of Soviet troops", 2],
        ["De-Stalinisation (Secret Speech; Poland's reforms) raised hopes of change", 2],
      ], model: "Hungarians resented the harsh Stalinist rule of Rákosi, whose secret police imprisoned thousands. Living standards were low, and many blamed the USSR for taking Hungarian resources on unfair terms; Catholics resented persecution of the Church, and nationalists resented Soviet troops on Hungarian soil. In 1956 these grievances came to the surface because de-Stalinisation raised hopes: Khrushchev's Secret Speech, the removal of Rákosi and reforms in Poland suggested the USSR might now accept change." },
      c: { stem: "'The crushing of the Hungarian Rising and the Prague Spring shows that Soviet control of Eastern Europe was secure.' How far do you agree? Explain your answer.", points: [
        ["Secure: control restored quickly both times; loyal leaders (Kádár, Husák) installed", 2],
        ["Secure: the West did not intervene; the Brezhnev Doctrine deterred others", 2],
        ["Not secure: control depended on tanks; widespread opposition and lack of consent", 2],
        ["Not secure: resistance recurred (Berlin 1953 and 1961, Poland 1980) and collapsed when force was withdrawn in 1989", 2],
        ["Supported judgement", 2],
      ], model: "In one sense the crises show that control was secure. Both times the USSR restored control within days or weeks, installed loyal leaders, Kádár and later Husák, and suffered no Western response, since the USA would not risk war in the Soviet sphere. The Brezhnev Doctrine warned other satellites not to try.\n\nBut the crises also show insecurity. In both countries communist parties themselves had moved towards reform, and the people supported them; control could be restored only with tanks. Opposition kept returning: in East Germany in 1953, in the flight to the West that forced the Berlin Wall in 1961, and in Poland with Solidarity in 1980. When Gorbachev refused to use force in 1989, Soviet control collapsed within months.\n\nI disagree with the statement. The crises show that Soviet control was secure only as long as the USSR was willing to use force; it rested on military power, not on the consent of the people." },
    }),
    explanation: "Paper 1 structured essay on key question 6 (20 marks).",
  });
  b.struct({
    ...p1A, d: 5, concepts: ["hist.soviet-control.berlin-wall", "hist.soviet-control.solidarity-gorbachev"],
    stem: "This question is about the Berlin Wall and the end of Soviet control in Eastern Europe.",
    hints: ["In (c), set Gorbachev against economic weakness and popular movements."],
    parts: p1Parts({
      a: { stem: "Describe the activities of Solidarity before martial law was declared.", points: [
        "Strikes at the Lenin Shipyard in Gdańsk in August 1980, led by Wałęsa.",
        "The Gdańsk Agreement recognised free trade unions and the right to strike.",
        "Grew to about ten million members; demanded reforms and freedom of expression.",
        "Banned under martial law in December 1981; leaders detained.",
      ], model: "In August 1980 workers at the Lenin Shipyard in Gdańsk, led by Lech Wałęsa, went on strike, and strikes spread across Poland. The Gdańsk Agreement recognised free trade unions and the right to strike, and Solidarity grew to about ten million members, pressing for more freedom. In December 1981 Jaruzelski declared martial law, banned Solidarity and detained its leaders." },
      b: { stem: "Explain why the Berlin Wall was built in 1961.", points: [
        ["Mass emigration through West Berlin (roughly 2.5-3 million, 1949-61), rising sharply in 1961", 2],
        ["Brain drain of skilled workers damaged the GDR economy and embarrassed communism", 2],
        ["Failure of Khrushchev's demands for the West to leave Berlin (1958; Vienna 1961); a solution short of war", 2],
      ], model: "The Wall was built to stop East Germans escaping to the West. Berlin was the one open border, and roughly 2.5 to 3 million people left between 1949 and 1961, with numbers rising sharply in 1961. Many were young and skilled, so the brain drain damaged the East German economy and was a huge embarrassment to a state that claimed communism was better. Khrushchev had tried to force the Western powers out of Berlin in 1958 and again at Vienna in 1961, but they refused, so closing the border in August 1961 solved the problem without fighting the West." },
      c: { stem: "'Gorbachev was personally responsible for the collapse of Soviet control over Eastern Europe.' How far do you agree? Explain your answer.", points: [
        ["For: abandoned the Brezhnev Doctrine; refused to use force in 1989", 2],
        ["For: glasnost and perestroika encouraged demands for reform", 2],
        ["Against: long-term economic failure, debt, arms race and Afghanistan", 2],
        ["Against: popular movements (Solidarity, Leipzig, Velvet Revolution); the Church; Western pressure", 2],
        ["Supported judgement", 2],
      ], model: "Gorbachev's role was crucial. Unlike his predecessors in 1956 and 1968, he made clear that the USSR would not use force to keep communist governments in power, and in 1989 he accepted Solidarity's election victory and kept Soviet troops in their barracks in East Germany. His policies of glasnost and perestroika also encouraged people in the satellites to demand change.\n\nHowever, he did not create the crisis. The Soviet and Eastern European economies had been stagnating for years, the satellites were in debt, and the arms race and the war in Afghanistan drained resources; these problems were why he needed reform. The collapse was also driven from below: Solidarity had survived martial law, and in 1989 crowds in Leipzig, Berlin and Prague forced their governments out.\n\nI partly agree. Gorbachev was responsible for the timing and largely peaceful nature of the collapse, because another leader might have used force, but the underlying causes were economic failure and the lack of popular support for communist rule." },
    }),
    explanation: "Paper 1 structured essay on key question 6 (20 marks).",
  });

  // ---------------------------------------------------------------------------------------------------------------
  // Paper 1 Section B: Depth study D x4.
  b.struct({
    ...p1B, d: 4, concepts: ["hist.usa.boom"],
    stem: "This question is about the US economy in the 1920s.",
    hints: ["In (c), name specific groups on both sides."],
    parts: p1Parts({
      a: { stem: "Describe the problems faced by American farmers in the 1920s.", points: [
        "Overproduction: output exceeded demand, so prices fell.",
        "Fall in European demand after the war.",
        "Debts from buying land and machinery during the war.",
        "Foreign tariffs blocked exports; many farmers lost their farms.",
      ], model: "Farmers produced more than they could sell, so prices fell. European demand dropped after the war, and many farmers had debts from buying land and machinery when prices were high. Other countries put tariffs on American goods, so surpluses could not be sold abroad, and thousands of farmers lost their farms." },
      b: { stem: "Explain why the motor car industry boomed in the 1920s.", points: [
        ["Mass production (Ford's assembly line) cut costs and prices", 2],
        ["Rising incomes, hire purchase and advertising increased demand", 2],
        ["Government support for business (low taxes, tariffs) and road-building; linked industries", 2],
      ], model: "The car industry boomed because of mass production: Ford's moving assembly line cut the time and cost of building a car, so prices fell until ordinary families could afford one. Demand rose because many workers' incomes were higher, and hire purchase let people buy a car with a deposit and pay later, while advertising persuaded them they needed one. Republican policies of low taxes and high tariffs protected and encouraged business, and governments built roads, which made cars more useful." },
      c: { stem: "'All Americans benefited from the economic boom of the 1920s.' How far do you agree? Explain your answer.", points: [
        ["For: many workers had higher wages, cars, electricity and consumer goods", 2],
        ["For: new industries created jobs; the rich and shareholders gained greatly", 2],
        ["Against: farmers suffered from overproduction, low prices and debt", 2],
        ["Against: old industries (coal, textiles, railways); Black Americans, Native Americans, new immigrants", 2],
        ["Supported judgement", 2],
      ], model: "Many Americans did benefit. Workers in the new industries, such as cars and electrical goods, often earned more, and millions of families bought cars, radios and vacuum cleaners for the first time. The rich gained most of all from rising profits, share prices and Mellon's tax cuts.\n\nBut many did not. Farmers, roughly a quarter of the population, suffered throughout the decade from overproduction, falling prices and debts, and thousands lost their farms. Workers in coal, textiles and railways faced wage cuts and unemployment. Most Black Americans worked as poorly paid sharecroppers in the South, Native Americans lived in poverty on reservations, and many new immigrants had low-paid jobs.\n\nI disagree. The boom was real, but its benefits went mainly to the rich and to urban workers in the new industries; a large part of the population gained little or nothing, which is one reason demand could not keep up with production by 1929." },
    }),
    explanation: "Paper 1 structured essay on Depth study D (20 marks).",
  });
  b.struct({
    ...p1B, d: 4, concepts: ["hist.usa.roaring-twenties", "hist.usa.intolerance"],
    stem: "This question is about American society in the 1920s.",
    hints: ["In (c), divide women by age, class, race and place."],
    parts: p1Parts({
      a: { stem: "Describe the activities of the Ku Klux Klan in the 1920s.", points: [
        "Refounded in 1915; spread beyond the South to the Midwest.",
        "Targeted Black Americans, Catholics, Jews and immigrants.",
        "Used intimidation, beatings and murder; secret rituals and robes.",
        "Several million members by the mid-1920s; declined after the 1925 scandal in Indiana.",
      ], model: "The Klan was refounded in 1915 and in the 1920s spread far beyond the South, especially into the Midwest. It targeted Black Americans, Catholics, Jews and immigrants, using intimidation, beatings and murder. Historians estimate its membership reached several million in the mid-1920s, but it declined quickly after one of its leaders was convicted of murder in 1925." },
      b: { stem: "Explain why Prohibition was introduced in 1920.", points: [
        ["Temperance campaigns (Anti-Saloon League, Women's Christian Temperance Union): alcohol blamed for crime, poverty and violence", 2],
        ["Religious views, especially rural Protestants, saw drinking as sinful", 2],
        ["First World War: grain needed for food; feeling against German-American brewers", 2],
      ], model: "Prohibition was the result of long campaigns by temperance groups such as the Anti-Saloon League and the Women's Christian Temperance Union, which blamed alcohol for crime, poverty, absence from work and violence in the home. Many Protestant churches, especially in the countryside, saw drinking as sinful, and rural America had great influence in Congress. The First World War gave the final push: grain was needed for food, and many brewers were of German origin, so drinking seemed unpatriotic. The Eighteenth Amendment and the Volstead Act brought Prohibition into force in January 1920." },
      c: { stem: "How far did the lives of women change in the 1920s? Explain your answer.", points: [
        ["Change: the vote (1920); new jobs as typists, secretaries, telephonists", 2],
        ["Change: flappers' new freedoms; consumer goods reduced some housework", 2],
        ["Limited: unequal pay, few in professions or politics; most married women at home", 2],
        ["Limited: little change for rural, poor, Black and immigrant women; traditional attitudes strong", 2],
        ["Supported judgement", 2],
      ], model: "Some women's lives changed a great deal. The Nineteenth Amendment gave women the vote in 1920, and more women worked in new jobs as typists, secretaries and telephonists, giving some single women independence. Young urban women, the flappers, cut their hair, wore short skirts, smoked and danced in public, and electrical goods reduced housework for families who could afford them.\n\nYet for most women change was limited. Women were paid less than men, few entered the professions or politics, and most married women did not work outside the home. Flappers were mostly young, middle-class city women; in the countryside, and among poorer, Black and immigrant women, daily life changed little. Many people still believed a woman's place was in the home.\n\nWomen's lives changed only to a limited extent: legal rights and opportunities widened, but the real changes reached mainly young, urban, middle-class women." },
    }),
    explanation: "Paper 1 structured essay on Depth study D (20 marks).",
  });
  b.struct({
    ...p1B, d: 5, concepts: ["hist.usa.crash-1932"],
    stem: "This question is about the Wall Street Crash and its consequences.",
    hints: ["In (c), weigh Hoover's failures against Roosevelt's appeal."],
    parts: p1Parts({
      a: { stem: "Describe the measures Hoover took to deal with the Depression.", points: [
        "Voluntary agreements with business to keep up wages and investment.",
        "Public works (for example the dam on the Colorado River); brief tax cut.",
        "Federal Farm Board bought surplus crops.",
        "Reconstruction Finance Corporation (1932) lent to banks and businesses / loans to states for relief.",
      ], model: "Hoover persuaded business leaders to keep up wages and investment and cut income tax briefly. He increased spending on public works, such as the dam on the Colorado River, and the Federal Farm Board bought surplus crops. In 1932 he set up the Reconstruction Finance Corporation to lend money to banks, railways and large businesses, and allowed loans to the states for relief." },
      b: { stem: "Explain why the Wall Street Crash led to a depression.", points: [
        ["Losses and bank failures wiped out savings and stopped lending", 2],
        ["Falling demand led firms to cut production and jobs, so demand fell further", 2],
        ["Collapse of trade (Hawley-Smoot Tariff, retaliation) and recall of foreign loans", 2],
      ], model: "The Crash ruined investors and the banks that had lent to them, and as people rushed to withdraw their savings thousands of banks failed, wiping out savings and stopping lending. With less money, people and businesses cut spending and investment, so firms cut production and dismissed workers; unemployed workers spent even less, so demand fell further in a downward spiral. Trade also collapsed: the Hawley-Smoot Tariff of 1930 raised American tariffs, other countries retaliated, and American banks called in loans from abroad, spreading the depression and closing export markets." },
      c: { stem: "'Roosevelt won the 1932 election because of Hoover's failures.' How far do you agree? Explain your answer.", points: [
        ["For: the Depression under Hoover; measures too little and too late", 2],
        ["For: rugged individualism; refusal of direct relief; Hoovervilles; the Bonus Army", 2],
        ["Against: Roosevelt's New Deal promise of action, relief, public works, repeal of Prohibition", 2],
        ["Against: Roosevelt's personality, energy and record as Governor of New York", 2],
        ["Supported judgement", 2],
      ], model: "Hoover's failures were a major reason. The Depression began on his watch, unemployment reached about a quarter of the workforce and his measures, such as the Reconstruction Finance Corporation, seemed too little and too late. His belief in rugged individualism and refusal of direct relief made him seem uncaring, the shanty towns were mockingly named Hoovervilles, and the violent clearing of the Bonus Army in July 1932 ruined his reputation.\n\nHowever, Roosevelt gave people a positive reason to vote for him. He promised a New Deal of government action, including relief for the unemployed, public works, help for farmers and the end of Prohibition. His confidence and energy, and his record of organising relief as Governor of New York, made the promises believable.\n\nI largely agree. Almost any Republican would have lost in 1932 because of the Depression, but Roosevelt's personality and promises explain why his victory, carrying 42 of 48 states, was so large." },
    }),
    explanation: "Paper 1 structured essay on Depth study D (20 marks).",
  });
  b.struct({
    ...p1B, d: 5, concepts: ["hist.usa.new-deal", "hist.usa.new-deal-assessment"],
    stem: "This question is about the New Deal.",
    hints: ["In (c), judge relief, recovery and reform separately."],
    parts: p1Parts({
      a: { stem: "Describe the work of the alphabet agencies set up in the Hundred Days.", points: [
        "CCC: conservation work for young unemployed men; wages sent home.",
        "AAA: paid farmers to produce less to raise prices.",
        "TVA: dams for flood control and cheap electricity in a poor region.",
        "NRA codes on wages, prices and hours / PWA public works / FERA relief grants to the states.",
      ], model: "The CCC gave young unemployed men conservation work, with most wages sent to their families. The AAA paid farmers to produce less so that prices would rise. The TVA built dams in the Tennessee Valley to control floods and produce cheap electricity. The NIRA set up the NRA, with codes on wages, prices and hours, and the PWA, which funded roads, schools and dams." },
      b: { stem: "Explain why some Americans opposed the New Deal.", points: [
        ["Republicans and business: too much federal power, regulation, taxes, support for unions (Liberty League)", 2],
        ["The Supreme Court: some laws unconstitutional (NIRA 1935, AAA 1936)", 2],
        ["Radicals (Long, Coughlin, Townsend): it did too little for the poor", 2],
      ], model: "Republicans and business leaders opposed the New Deal because it gave the federal government too much power, regulated business through the NRA codes, raised taxes on the rich and supported trade unions; wealthy opponents formed the American Liberty League in 1934. The Supreme Court ruled that some laws, the NIRA in 1935 and the AAA in 1936, went beyond the government's constitutional powers. Others attacked it for doing too little: Huey Long's Share Our Wealth campaign demanded heavy taxes on the rich, and Dr Townsend demanded generous pensions." },
      c: { stem: "How successful was the New Deal in dealing with the problems of the Depression? Explain your answer.", points: [
        ["Success: banks saved, confidence restored", 2],
        ["Success: relief and work for millions; lasting reforms (Social Security, Wagner Act, TVA)", 2],
        ["Failure: unemployment stayed high; 1937-38 recession; war production needed", 2],
        ["Failure: unequal treatment of Black Americans and women; opposition limited it", 2],
        ["Supported judgement", 2],
      ], model: "The New Deal had real successes. The bank holiday, the Emergency Banking Act and the fireside chats saved the banking system in 1933 and restored confidence. Agencies such as the CCC, FERA and WPA gave work or relief to millions, and the TVA, Social Security and the Wagner Act brought lasting changes. Democracy survived at a time when the Depression helped extremists elsewhere.\n\nBut it did not end the Depression. Unemployment fell from about a quarter of the workforce to about one in seven by 1937, but rose again to roughly one in five in the 1937-38 recession after Roosevelt cut spending, and mass unemployment ended only with war production. Many Black Americans were hurt by the AAA or treated unequally in agencies, and women were often paid less.\n\nThe New Deal was successful in relief and reform but only partly in recovery, the problem that mattered most to the unemployed." },
    }),
    explanation: "Paper 1 structured essay on Depth study D (20 marks).",
  });

  // ---------------------------------------------------------------------------------------------------------------
  // Paper 2: the Cold War (prescribed 2028) x2.
  b.struct({
    ...p2, d: 5, concepts: ["hist.cold-war.breakdown-1945", "hist.cold-war.eastern-europe-1948"],
    stem: `**Background information.** In March 1946 Winston Churchill, no longer Prime Minister, spoke at Fulton, Missouri, with President Truman in the audience, warning that an 'iron curtain' had descended across Europe. Stalin denounced the speech. Over the next two years communists took control across Eastern Europe, and the USA answered with the Truman Doctrine and Marshall Aid. Historians still debate which side was more to blame.\n\nStudy the sources and answer the questions.\n\n${sources([
      source("Source A", "a cartoon of the kind published in a British newspaper in March 1946, described in words", "A huge bearded figure in a military greatcoat, with a pipe, peers over a high wall that runs across a map of Europe. Behind the wall, small figures labelled with the names of Eastern European countries sit in a fenced yard. A sign on the wall reads \"No admittance by order\".", { described: true }),
      source("Source B", "a commentary of the kind broadcast on Soviet radio in March 1946", "Mr Churchill and his friends want the English-speaking nations to rule the world. They forget that the Soviet people lost more than any other in defeating Hitler, and that the countries on our border have twice been the road for armies marching into Russia. We ask only that these neighbours be friendly. Is that a curtain, or a fence around a house that has been burned twice?"),
      source("Source C", "a report written by a fictional American diplomat in Warsaw for the State Department, January 1947", "The election was not free. Opposition candidates were struck off the lists in many districts, thousands of their supporters were arrested before polling day, and security police stood inside the polling stations. The government bloc has announced a large majority. I see no prospect of the promises made at Yalta being honoured."),
      source("Source D", "a letter from a fictional Czech teacher to a cousin in Canada, March 1948", "You ask whether the Russians invaded. They did not; there is not one Russian soldier in Prague. Our own communists did it, with crowds in the streets, workers' militias with rifles and a frightened President. Some of my colleagues cheered. Others have already lost their posts. Nobody speaks freely in the staff room now."),
      source("Source E", "a cartoon of the kind published in a Soviet magazine in 1947, described in words", "A plump man in a top hat decorated with stars and stripes offers a basket of bread to a thin European woman. Under the bread, the basket is full of chains, a contract labelled \"Bases\" and a padlock. In the background stands a factory with an American flag flying over it.", { described: true }),
      source("Source F", "from a speech by a fictional American congressman to his voters in Ohio, 1948", "Some say we should mind our own business. But where Stalin's army stands, there is no free press and no free vote, and he will go as far as we let him. Aid to Europe is cheaper than war, and it is the only language the Kremlin respects: strength."),
    ])}`,
    hints: ["For each source, ask who produced it, when, for whom and why."],
    parts: p2Parts([
      { stem: "Study Source A. What is the cartoonist's message? Explain your answer using details of the source and your knowledge.", points: [
        ["Message: Stalin / the USSR has cut Eastern Europe off and controls it like a prison", 3],
        ["Details: the wall across Europe, fenced yard, 'No admittance'", 2],
        ["Context: Iron Curtain speech; Soviet control of Poland and other states", 2],
      ], model: "The cartoonist's message is that Stalin has cut Eastern Europe off from the West and holds its countries like prisoners. The figure in a greatcoat with a pipe, representing Stalin, looks over a wall drawn across Europe, while small figures labelled as Eastern European countries sit in a fenced yard, and the sign 'No admittance by order' shows the West is shut out. This fits the context: in March 1946 Churchill warned that an iron curtain had descended across Europe, and Stalin had already imposed a pro-communist government on Poland. The cartoon supports Churchill's view." },
      { stem: "Study Sources A and B. How far do these two sources agree? Explain your answer.", points: [
        ["Agreement: both accept that the USSR has a dividing line / controls its neighbours", 2],
        ["Disagreement: A presents it as imprisonment and aggression; B as defence after invasions", 2],
        ["Disagreement: B accuses Churchill and the West of wanting to rule the world", 2],
        ["Comparison of provenance and an overall judgement", 2],
      ], model: "The sources agree on the basic fact that the USSR had drawn a line in Europe and controlled the countries on its border: A shows a wall and B admits that the USSR wants these neighbours to be 'friendly'. But they disagree completely about what this means. A presents it as imprisonment, with countries held in a fenced yard behind a wall marked 'No admittance'. B presents it as defence, a 'fence around a house that has been burned twice', because the border countries had been the route for invasions of Russia. B also turns the accusation around, saying Churchill wants the English-speaking nations to rule the world. A British cartoon and Soviet radio were each defending their own side's view, so overall they disagree far more than they agree." },
      { stem: "Study Source E. Why was this cartoon published in 1947? Explain your answer using details of the source and your knowledge.", points: [
        ["Context: Marshall's offer of aid (June 1947); Soviet refusal and pressure on satellites to refuse", 2],
        ["Message: American aid hides control (chains, bases, padlock)", 2],
        ["Purpose: to persuade Soviet and Eastern European readers to reject Marshall Aid and distrust the USA", 2],
        ["Link to Cominform / 'dollar imperialism'", 1],
      ], model: "The cartoon was published to persuade Soviet and Eastern European readers to reject Marshall Aid. In June 1947 George Marshall offered American aid to rebuild Europe, including the east; Stalin refused it and forced satellites such as Czechoslovakia to refuse too. The cartoon shows why the Soviet government wanted people to distrust the offer: the basket of bread hides chains, a contract for military bases and a padlock, and an American flag flies over a European factory, suggesting that the aid would lead to American control. It reflects the Soviet line that Marshall Aid was 'dollar imperialism', and it appeared as Stalin set up the Cominform to tighten control of the communist parties." },
      { stem: "Study Sources C and D. How useful are these sources as evidence of how the USSR gained control of Eastern Europe? Explain your answer.", points: [
        ["C: useful evidence of rigged elections (arrests, candidates removed, police at polls)", 2],
        ["C: provenance: diplomat's private report, close to events, but an American with a viewpoint; fits own knowledge of Poland 1947", 2],
        ["D: useful evidence of the Czech coup: local communists, militias, pressure on Beneš; no Soviet troops", 2],
        ["D: private letter, eyewitness, little reason to lie; limitations (one person, one country); overall judgement", 2],
      ], model: "Source C is useful because it describes the methods used in Poland in January 1947: opposition candidates were removed, their supporters arrested, and security police stood in the polling stations. It is a private report to the State Department, written immediately by someone who was there, so it is likely to be careful, though an American diplomat had reason to see the worst in communist actions. My own knowledge confirms that the Polish elections were rigged and that the opposition leader Mikołajczyk later fled. Source D is useful because it shows a different method: in Czechoslovakia there were no Soviet troops, and local communists took power with crowds, armed militias and pressure on a frightened President. As a private letter from an eyewitness it has little reason to deceive. Each source covers only one country, but together they are very useful, because they show that control came through local communists using rigged elections, police and pressure as well as through the Red Army." },
      { stem: "Study all the sources. How far do these sources provide convincing evidence that the USSR was to blame for the breakdown of relations between 1946 and 1948? Use the sources to explain your answer.", points: [
        ["Sources supporting: A, C and D (and F) show Soviet control, rigged elections and the coup", 2],
        ["Sources challenging: B (security after invasions) and E (American aid as control)", 2],
        ["Evaluation: reliability of each group (propaganda A, B, E, F; private C, D)", 2],
        ["Own knowledge: Yalta promise broken; Truman Doctrine, Marshall Aid, atomic monopoly", 2],
        ["Supported judgement", 2],
      ], model: "Several sources support the view that the USSR was to blame. Source A shows Eastern Europe walled off and imprisoned, Source C shows rigged elections in Poland that broke the promise of free elections made at Yalta, and Source D shows communists seizing power in Czechoslovakia with militias and intimidation. Source F argues that Stalin would go as far as he was allowed. C and D are the most convincing: they are private, written close to events, and confirmed by what we know about Poland in 1947 and the Czech coup in 1948. A and F are less convincing because they were written to persuade a public audience.\n\nOther sources suggest the West shared the blame. Source B argues that the USSR wanted only friendly neighbours after being invaded twice, and Source E presents Marshall Aid as a hidden attempt at American control. Both are Soviet propaganda, so they are not reliable as evidence of American motives, but B's point about security is supported by the huge Soviet losses in the war, and the USA did use aid and its atomic monopoly to extend its influence.\n\nOverall the sources provide fairly convincing evidence that Soviet actions in Eastern Europe were the main cause of the breakdown, because the most reliable sources describe Soviet methods directly, but they also show that each side saw its own actions as defensive." },
    ]),
    explanation: "Paper 2 document question on the Cold War (prescribed topic): 40 marks.",
  });
  b.struct({
    ...p2, d: 5, concepts: ["hist.cold-war.berlin-blockade"],
    stem: `**Background information.** In June 1948 the Western powers introduced a new currency in their zones of Germany. The USSR then cut all land routes to West Berlin. The Western powers supplied the city by air until the blockade was lifted in May 1949. Historians disagree about which side was responsible for the crisis.\n\nStudy the sources and answer the questions.\n\n${sources([
      source("Source A", "a statement of the kind issued by the Soviet military administration in Germany, June 1948", "The separate currency introduced in the western zones threatens to flood the Soviet zone with worthless old notes and to wreck its economy. The Western powers have abandoned the agreements of Potsdam and are building a separate West German state. Temporary measures on the transport routes are necessary to protect the population of the Soviet zone."),
      source("Source B", "an editorial in a fictional London newspaper, July 1948", "Stalin has decided to starve two million Berliners into submission. He calls it 'technical difficulties' on the railway. Nobody is fooled. If we leave Berlin, no European will trust a Western promise again."),
      source("Source C", "the diary of a fictional West Berlin housewife, January 1949", "Two hours of electricity tonight, from two until four in the morning, so I got up to iron. Potatoes are dried and taste of cardboard. But every few minutes the planes come in over the roofs. My neighbour, who lost her husband to an American bomb in 1944, waves at them now."),
      source("Source D", "a cartoon of the kind published in East German newspapers in 1948, described in words", "An American general rides on a bomber labelled \"Airlift\". Instead of food, the bomber drops leaflets marked \"Propaganda\" and coins marked \"Deutschmark\" onto a city. In the corner, a worker labelled \"Berlin\" sweeps the coins away with a broom.", { described: true }),
      source("Source E", "a letter from a fictional American pilot on the airlift to his parents, 1949", "Last year I was bombing this country; now I fly flour and coal into it three times a day. The kids at the end of the runway wave handkerchiefs. I don't know much about politics, but I know you don't make a city hungry because you don't like its money."),
      source("Source F", "an article by a fictional historian in a history magazine, 1998", "The Western currency reform was a deliberate step towards a West German state, taken without Soviet agreement, and Stalin had genuine reasons to fear it. But his chosen response, to cut off a civilian population, handed the West a moral victory, a military alliance and a divided Germany: the very outcome he most wanted to avoid."),
    ])}`,
    hints: ["Compare sources written at the time with the later historian's view."],
    parts: p2Parts([
      { stem: "Study Source C. What can you learn from this source about the blockade? Explain your answer using details of the source.", points: [
        ["Hardship: rationed electricity at night, poor dried food", 2],
        ["The airlift was constant ('every few minutes')", 2],
        ["Attitudes changed: Berliners now welcomed the Americans who had bombed them", 2],
        ["Morale held despite hardship", 1],
      ], model: "Source C shows that life in West Berlin was hard: electricity was available only for two hours in the middle of the night, so the writer got up to iron, and the food was dried potatoes that tasted of cardboard. It also shows that the airlift was constant, with planes coming in every few minutes. Most strikingly, attitudes had changed: a neighbour whose husband was killed by an American bomb in 1944 now waved at the planes. I can infer that the blockade had failed to break morale and had turned West Berliners towards the Western allies." },
      { stem: "Study Sources A and B. How far do these sources agree about the causes of the blockade? Explain your answer.", points: [
        ["Agreement: both accept that transport routes were cut / that a crisis existed", 2],
        ["Disagreement: A blames the Western currency and abandonment of Potsdam", 2],
        ["Disagreement: B blames Stalin's wish to starve Berlin into submission; rejects 'technical' excuses", 2],
        ["Provenance and overall judgement", 2],
      ], model: "The two sources agree that the transport routes to Berlin had been cut and that this was serious, but they disagree about why. Source A blames the West: the new currency threatened to wreck the Soviet zone's economy, and the Western powers had abandoned Potsdam and were building a separate West German state, so the 'temporary measures' were defensive. Source B blames Stalin, saying he intended to starve two million Berliners into submission and that his excuses about 'technical difficulties' fooled nobody. Source A is an official Soviet justification and Source B a British editorial, each defending its own side, so overall they disagree strongly about the cause." },
      { stem: "Study Source D. Why was this cartoon published in 1948? Explain your answer using details of the source and your knowledge.", points: [
        ["Context: the airlift was succeeding and was a propaganda victory for the West", 2],
        ["Message: the airlift is an American propaganda and currency operation, not humanitarian", 2],
        ["Purpose: to persuade East Germans and Berliners to reject the West / the Deutschmark", 2],
        ["Details: bomber, leaflets, coins swept away by the worker", 1],
      ], model: "The cartoon was published because the airlift was becoming a propaganda disaster for the USSR: Western planes were keeping West Berlin alive, and the city's people were turning towards the West. The East German press wanted to change how the airlift was seen. The cartoon shows the airlift as a military and political operation, a bomber dropping propaganda and Deutschmarks rather than food, and a worker labelled 'Berlin' sweeping the coins away. Its purpose was to persuade East Germans and Berliners that the airlift was not humanitarian, that the new currency was an American trick, and that ordinary Berliners rejected it." },
      { stem: "Study Sources E and F. How far does Source F make Source E surprising? Explain your answer.", points: [
        ["E blames the Soviets simply: you don't starve a city over money", 2],
        ["F accepts the West's currency reform was deliberate and Stalin had genuine reasons", 2],
        ["E not surprising given its provenance: a pilot, a participant, not informed about politics", 2],
        ["F has hindsight and access to evidence; overall judgement", 2],
      ], model: "Source F might make Source E seem surprising, because F, a historian writing in 1998, accepts that the West took a deliberate step towards a West German state and that Stalin had genuine reasons for fear, whereas the pilot in E sees the issue simply: you do not make a city hungry because you dislike its money. However, E is not really surprising given who wrote it. The pilot admits he knows little about politics; he was taking part in the airlift, saw grateful children and was writing to his parents. F, with hindsight and access to later evidence, can see both sides, yet F also agrees with E's main point, that cutting off civilians was the wrong response. So Source F explains why E is one-sided, but does not make it surprising." },
      { stem: "Study all the sources. How far do these sources provide convincing evidence that the Western powers were responsible for the Berlin crisis? Use the sources to explain your answer.", points: [
        ["Supporting: A and D blame the currency reform; F agrees it was a deliberate step without Soviet agreement", 2],
        ["Challenging: B, C and E show the USSR choosing to blockade civilians", 2],
        ["Evaluation: A and D are Soviet propaganda; B a partisan editorial; C and E private; F balanced with hindsight", 2],
        ["Own knowledge: Bizonia, Marshall Aid, Deutschmark; Soviet decision to blockade; outcomes (NATO, two states)", 2],
        ["Supported judgement", 2],
      ], model: "Some sources support the view that the Western powers were responsible. Source A says the new currency threatened the Soviet zone and that the West had abandoned Potsdam, and Source D presents the airlift as a currency and propaganda operation. Source F, the most balanced source, agrees that the currency reform was a deliberate step towards a West German state taken without Soviet agreement. My own knowledge supports this: the West had merged its zones and given them Marshall Aid before introducing the Deutschmark.\n\nHowever, A and D are Soviet propaganda written to justify the blockade, so they are not convincing on their own. Sources B, C and E show the other side: Stalin chose to cut off two million civilians, causing real hardship. B is a partisan editorial, but C and E are private and have no reason to deceive, and they show that the blockade fell on ordinary people. F also argues that Stalin's response was what turned a dispute into a crisis.\n\nThe sources provide convincing evidence that the Western powers provoked the crisis, but not that they were responsible for it, because the decision to blockade a city was Stalin's. The most reliable sources suggest shared responsibility, with the blockade itself the decisive step." },
    ]),
    explanation: "Paper 2 document question on the Cold War (prescribed topic): 40 marks.",
  });

  // Paper 2: the USSR's control over Eastern Europe (prescribed June 2027) x2.
  b.struct({
    ...p2, d: 5, concepts: ["hist.soviet-control.hungary-czechoslovakia"],
    stem: `**Background information.** On 23 October 1956 demonstrations in Budapest began the Hungarian Rising. Imre Nagy became Prime Minister and promised reforms; on 1 November he announced that Hungary would leave the Warsaw Pact. On 4 November Soviet forces attacked Budapest and crushed the rising. Historians have debated why the USSR acted as it did.\n\nStudy the sources and answer the questions.\n\n${sources([
      source("Source A", "a leaflet of the kind handed out by students in Budapest, 22 October 1956", "We demand: the withdrawal of all Soviet troops from Hungary; free elections with several parties; freedom of speech and of the press; the return of Imre Nagy to government; a fair trade agreement with the Soviet Union. Hungarians, the time has come!"),
      source("Source B", "a statement of the kind published by the Soviet government, 30 October 1956", "The Soviet government is ready to review, with the Hungarian government and the other members of the Warsaw Treaty, the question of Soviet troops in Hungary. The socialist countries are built on equality and respect for each other's independence."),
      source("Source C", "a report of the kind printed in Soviet newspapers, 5 November 1956", "Counter-revolutionary gangs, armed by Western imperialists and led by former fascists, have been murdering honest communists in the streets of Budapest. At the request of the Hungarian Revolutionary Workers' and Peasants' Government, Soviet units are helping the Hungarian people to restore order."),
      source("Source D", "the memoir of a fictional Hungarian student, published in Vienna in 1986", "On the radio we heard Nagy say we would leave the Warsaw Pact and be neutral, like Austria. We embraced in the street. Three days later the tanks came back, many more than before, and the Western radio that had urged us on offered us nothing but sympathy."),
      source("Source E", "a cartoon of the kind published in Western European newspapers in November 1956, described in words", "A Hungarian freedom fighter lies on the ground under the treads of a Soviet tank. Nearby, two men in suits, labelled \"Britain\" and \"France\", are busy fighting over a canal marked \"Suez\" and do not look round. A third man, labelled \"Uncle Sam\", wrings his hands.", { described: true }),
      source("Source F", "an extract from a book by a fictional historian of Eastern Europe, 2006", "Moscow could tolerate a reforming communist government; it had just done so in Poland. What it could not accept was a satellite leaving the Warsaw Pact. Once Nagy announced neutrality, the question for Khrushchev was not whether to intervene but how quickly, especially as the Suez crisis was dividing the West."),
    ])}`,
    hints: ["Notice the dates: what changed between 30 October and 4 November?"],
    parts: p2Parts([
      { stem: "Study Source A. What does this source suggest about the causes of the Hungarian Rising? Explain your answer using details of the source.", points: [
        ["Resentment of Soviet occupation (withdrawal of troops)", 2],
        ["Desire for political freedom (several parties, free speech and press)", 2],
        ["Economic grievances (fair trade with the USSR) and support for Nagy", 2],
        ["Inference that the demands went beyond reform of communism", 1],
      ], model: "Source A suggests that the rising had several causes. The first demand, the withdrawal of all Soviet troops, shows resentment of Soviet occupation. The demands for free elections with several parties and for freedom of speech and the press show a desire for political freedom after years of Rákosi's rule. The demand for a fair trade agreement suggests economic grievances, a belief that the USSR exploited Hungary. The call for Nagy's return shows support for a reform communist. I can infer that the students wanted more than a reformed communist system; free elections with several parties would have threatened communist rule itself." },
      { stem: "Study Sources B and C. How far do these sources show that Soviet policy changed between 30 October and 5 November? Explain your answer.", points: [
        ["B: conciliatory; ready to review troops; equality and independence", 2],
        ["C: hostile; rebels called counter-revolutionaries; intervention justified", 2],
        ["Change explained by events: Nagy's announcement on 1 November", 2],
        ["Both are Soviet public statements; continuity in claim of acting with Hungarian agreement; judgement", 2],
      ], model: "The sources show a dramatic change. On 30 October Source B is conciliatory: the Soviet government is ready to review the question of its troops in Hungary and speaks of equality and respect for independence. By 5 November Source C describes the rising as the work of counter-revolutionary gangs armed by Western imperialists and justifies Soviet units restoring order. The change is explained by events in between: on 1 November Nagy announced that Hungary would leave the Warsaw Pact. However, there is some continuity: both are official Soviet statements, and both present Soviet actions as respecting Hungarian wishes, since C claims Soviet troops acted at the request of a Hungarian government. The language changed far more than the aim of keeping Hungary in the Soviet bloc." },
      { stem: "Study Source C. Why was this report published on 5 November 1956? Explain your answer using details of the source and your knowledge.", points: [
        ["Context: Soviet forces attacked Budapest on 4 November; Kádár's new government installed", 2],
        ["Purpose: to justify the invasion to Soviet and world opinion", 2],
        ["Methods: blaming Western imperialists and fascists; claiming an invitation", 2],
        ["Hides Hungarian popular support and Nagy's demands", 1],
      ], model: "The report was published the day after Soviet forces returned to attack Budapest, to justify the invasion to Soviet readers and to the world. It presents the rising as the work of counter-revolutionary gangs armed by Western imperialists and led by fascists, so that the Soviet action would look like defending socialism rather than crushing a popular movement. It claims the troops came at the request of the Hungarian Revolutionary Workers' and Peasants' Government, the new government of János Kádár, which the USSR had itself installed, so that the invasion would appear legal. It says nothing about the students' demands or Nagy's announcement of neutrality, which would have shown how widely Hungarians supported the rising." },
      { stem: "Study Sources D and E. Are you surprised that the West did not help Hungary? Explain your answer using the sources and your knowledge.", points: [
        ["Surprising: Western radio had encouraged the rebels (D); expectation of help", 2],
        ["Not surprising: Suez crisis divided Britain, France and the USA (E)", 2],
        ["Not surprising: the USA would not risk nuclear war in the Soviet sphere", 2],
        ["Provenance of D (memoir, hindsight, bitterness) and E (Western cartoon, critical); judgement", 2],
      ], model: "It might seem surprising, because Source D says Western radio had urged the Hungarians on, so they expected help, and the USA had spoken of supporting people resisting communism. However, I am not surprised. Source E shows that Britain and France were busy with the Suez crisis at exactly that moment, which divided the West and distracted the United Nations, while 'Uncle Sam' only wrings his hands. My own knowledge confirms that the USA would not risk a war, possibly nuclear, with the USSR over a country in the Soviet sphere. D is a memoir written thirty years later by someone who felt betrayed, and E is a Western cartoon criticising its own governments, but both show the same thing: the West offered sympathy, not help." },
      { stem: "Study all the sources. How far do these sources provide convincing evidence that the Hungarian Rising was crushed because Nagy announced that Hungary would leave the Warsaw Pact? Use the sources to explain your answer.", points: [
        ["Supporting: change from B (30 October) to C (5 November) after the 1 November announcement; D's sequence; F's argument", 2],
        ["Other reasons in the sources: free elections and withdrawal of troops threatened communist rule (A); C's 'counter-revolution'", 2],
        ["Opportunity: Western weakness and Suez (D, E, F)", 2],
        ["Evaluation of reliability (C propaganda; D hindsight; F historian with evidence); own knowledge (Poland tolerated)", 2],
        ["Supported judgement", 2],
      ], model: "Several sources support the view. Source B, on 30 October, shows the USSR ready to compromise, while Source C, after the attack, is hostile; the change came after Nagy's announcement on 1 November. Source D confirms the sequence: the tanks came back three days after the announcement of neutrality. Source F argues that Moscow could accept reform, as it had in Poland, but not a satellite leaving the Warsaw Pact. F is a historian writing with access to evidence, and my own knowledge that Gomułka's reforms in Poland were tolerated in 1956 supports this.\n\nOther sources suggest wider reasons. Source A shows that the rebels demanded free elections with several parties and the withdrawal of Soviet troops, which threatened communist rule itself, and Source C presents the rising as a counter-revolution. C is propaganda, but it may reflect a real Soviet fear. Sources D, E and F also show that the Suez crisis and Western inaction gave the USSR the opportunity to act.\n\nThe sources provide fairly convincing evidence that leaving the Warsaw Pact was the decisive reason, because the timing in B, C and D and the argument in F all point to it. However, the end of one-party rule demanded in A was also unacceptable, and Western weakness explains why the USSR could act without risk." },
    ]),
    explanation: "Paper 2 document question on Soviet control of Eastern Europe (prescribed topic): 40 marks.",
  });
  b.struct({
    ...p2, d: 5, concepts: ["hist.soviet-control.solidarity-gorbachev"],
    stem: `**Background information.** In 1989 communist rule collapsed across Eastern Europe: Solidarity won the Polish elections in June, Hungary opened its border, the Berlin Wall was opened on 9 November, and the communists fell in Czechoslovakia, Bulgaria and Romania. Mikhail Gorbachev, Soviet leader since 1985, did not use force to stop these changes. Historians debate how far he was responsible.\n\nStudy the sources and answer the questions.\n\n${sources([
      source("Source A", "a cartoon of the kind published in Western newspapers in late 1989, described in words", "A Soviet leader with a birthmark on his forehead stands at an open gate in a long wall. He holds a large key and bows politely as crowds of people, carrying the flags of Poland, Hungary, East Germany and Czechoslovakia, stream out past him.", { described: true }),
      source("Source B", "the memoir of a fictional Solidarity organiser from Gdańsk, published in 2004", "People abroad think freedom was a gift from Moscow. It was not. We struck in 1980 when Brezhnev ruled, we went to prison in 1981, we printed our papers in cellars for eight years. By 1988 the government could not feed the country without us. Gorbachev did not open the door; he only decided not to slam it on our fingers."),
      source("Source C", "a report of the kind written by Western economists about Eastern Europe, 1988", "Industrial growth in the region has almost stopped. Poland and Hungary owe Western banks sums they cannot repay. Shortages of basic goods are worsening, and the Soviet Union, facing its own falling oil revenues and the costs of Afghanistan, can no longer afford to support its allies with cheap energy."),
      source("Source D", "the diary of a fictional Leipzig nurse, 9 October 1989", "Seventy thousand of us walked round the ring road tonight with candles, shouting 'We are the people'. Everyone expected the soldiers to shoot, as in China in the summer. The trucks were there and the hospitals had been told to prepare blood. But nobody fired. Somebody said the Russians had refused to help."),
      source("Source E", "a statement of the kind made by a Soviet foreign ministry spokesman to journalists, October 1989", "The Brezhnev Doctrine is dead. Every country decides for itself which road to take. We now have the 'Sinatra Doctrine': they do it their way."),
      source("Source F", "an extract from a book by a fictional historian of the Cold War, 2009", "Gorbachev wanted to save socialism by reforming it, not to dismantle the Soviet bloc. His great decision was a negative one: not to use force. That decision was necessary for the peaceful revolutions of 1989, but it was not sufficient. The regimes fell because almost nobody was prepared to defend them."),
    ])}`,
    hints: ["Separate what made collapse possible from what made it happen."],
    parts: p2Parts([
      { stem: "Study Source A. What is the cartoonist's message about the events of 1989? Explain your answer using details of the source.", points: [
        ["Message: Gorbachev let the peoples of Eastern Europe go / he was responsible for their freedom", 3],
        ["Details: holding the key, opening the gate, bowing politely", 2],
        ["Details: flags of several countries leaving through the wall (link to the Wall / Iron Curtain)", 2],
      ], model: "The cartoonist's message is that Gorbachev freed the peoples of Eastern Europe. He is shown holding the key to a gate in a long wall, a symbol of the Iron Curtain and the Berlin Wall, and bowing politely as crowds carrying the flags of Poland, Hungary, East Germany and Czechoslovakia stream past him. The key suggests the decision was his; the bow suggests he did it willingly and graciously. The cartoon gives Gorbachev the main credit for the collapse of Soviet control." },
      { stem: "Study Sources A and B. How far does Source B disagree with Source A? Explain your answer.", points: [
        ["A: Gorbachev freed Eastern Europe (he holds the key)", 2],
        ["B: freedom was won by Poles' own struggle since 1980, not a gift", 2],
        ["Partial agreement: B accepts Gorbachev chose not to 'slam the door'", 2],
        ["Provenance (Western cartoon; Solidarity memoir with pride and hindsight); judgement", 2],
      ], model: "Source B largely disagrees with Source A. A shows Gorbachev holding the key and opening the gate, so he is responsible for freedom. B says freedom was not a gift from Moscow: Solidarity struck in 1980 under Brezhnev, its members went to prison in 1981 and worked underground for eight years, and by 1988 the government could not run the country without them. However, B partly agrees, since it accepts that Gorbachev decided 'not to slam' the door, so his restraint mattered. The difference partly reflects provenance: A is a Western cartoon simplifying events around a famous leader, while B is a Solidarity organiser's memoir, written with pride and hindsight to stress his movement's role. They disagree mainly about who deserves the credit." },
      { stem: "Study Source E. Why did a Soviet spokesman make this statement in October 1989? Explain your answer using details of the source and your knowledge.", points: [
        ["Context: Poland's Solidarity government; Hungary's open border; protests in East Germany", 2],
        ["Purpose: to signal that the USSR would not intervene as in 1956 and 1968", 2],
        ["Purpose: to present Soviet policy positively to the West (humour, 'Sinatra Doctrine')", 2],
        ["Link to Gorbachev's reforms, the UN speech of 1988, need for Western cooperation", 1],
      ], model: "The statement was made because events in Eastern Europe were moving fast: Solidarity now led the Polish government, Hungary had opened its border to East Germans, and mass protests were under way in East Germany. The spokesman wanted to make clear that the USSR would not send in tanks as it had in Hungary in 1956 and Czechoslovakia in 1968, by announcing that the Brezhnev Doctrine was dead. The joke about the 'Sinatra Doctrine' was aimed at Western journalists, to present Soviet policy in a friendly way at a time when Gorbachev needed better relations and economic help from the West. It fitted his 1988 speech at the UN on every nation's freedom of choice." },
      { stem: "Study Sources C and D. How useful are these sources for explaining why communist rule collapsed in 1989? Explain your answer.", points: [
        ["C: useful on long-term economic causes (debt, shortages, Soviet inability to support allies)", 2],
        ["C: provenance: expert report, but Western and written before events; no mention of protest", 2],
        ["D: useful on people power and the decision not to use force (rumour that the Russians refused)", 2],
        ["D: eyewitness, private, but limited to one evening and includes rumour; overall judgement", 2],
      ], model: "Source C is useful because it explains the long-term weakness of the regimes: growth had stopped, Poland and Hungary owed debts they could not repay, shortages were worsening, and the USSR could no longer afford to support its allies. It is an expert report, which makes it fairly reliable, though it is Western and was written before the collapse, so it does not mention protest or politics. Source D is useful in a different way: it shows people power in Leipzig, with seventy thousand marchers, and the moment when force was not used, along with a rumour that the Russians had refused to help. As a private diary written that night it is a reliable eyewitness account of what people felt, but it covers one city on one evening, and its claim about the Russians is only a rumour. Together they are very useful, because C explains why the regimes were weak and D shows how ordinary people brought them down once force was ruled out." },
      { stem: "Study all the sources. How far do these sources provide convincing evidence that Gorbachev was responsible for the collapse of Soviet control over Eastern Europe? Use the sources to explain your answer.", points: [
        ["Supporting: A (key), E (Brezhnev Doctrine dead), D (no Soviet help for force), F (decision not to use force was necessary)", 2],
        ["Challenging: B (Solidarity's long struggle), C (economic collapse), D (people power), F (not sufficient; nobody defended regimes)", 2],
        ["Evaluation: A cartoon simplifies; E official statement; B memoir with hindsight; C expert; D eyewitness; F historian", 2],
        ["Own knowledge: perestroika, glasnost, UN speech 1988; Afghanistan, arms race; Round Table talks; Velvet Revolution", 2],
        ["Supported judgement", 2],
      ], model: "Some sources support the view that Gorbachev was responsible. Source A shows him holding the key and opening the gate, Source E announces that the Brezhnev Doctrine is dead, and Source D suggests that in Leipzig nobody fired, perhaps because the Russians refused to help. Source F agrees that his decision not to use force was necessary for the revolutions. E is especially convincing because it is an official Soviet statement of policy, and my own knowledge confirms that Gorbachev had spoken at the UN in 1988 of every nation's freedom of choice.\n\nOther sources show different causes. Source B argues that Solidarity had fought for years and that by 1988 the Polish government could not govern without it; Source C shows deep economic failure and Soviet inability to support its allies; and Source D shows the courage of ordinary people. Source F, a historian with hindsight, concludes that Gorbachev's decision was not sufficient, because nobody was prepared to defend the regimes. A is only a cartoon that simplifies events, and B is a proud participant's memoir, but C and D are reliable on economic weakness and popular protest.\n\nThe sources provide convincing evidence that Gorbachev made the collapse possible, but not that he was solely responsible. The most reliable sources show that economic failure and popular movements brought the regimes down once Gorbachev had removed the threat of Soviet force." },
    ]),
    explanation: "Paper 2 document question on Soviet control of Eastern Europe (prescribed topic): 40 marks.",
  });

  // Paper 2: containment x1.
  b.struct({
    ...p2, d: 5, concepts: ["hist.containment.vietnam"],
    stem: `**Background information.** In 1968 more than half a million American troops were in Vietnam. After the Tet Offensive of January 1968, President Johnson decided not to seek re-election. His successor, Richard Nixon, began to withdraw American troops in 1969, and the last American combat troops left after the Paris Peace Accords of January 1973.\n\nStudy the sources and answer the questions.\n\n${sources([
      source("Source A", "a statement of the kind issued by the US military command in Saigon, March 1968", "The enemy's so-called general offensive has failed. He has lost tens of thousands of his best fighters and has not held a single city. The people of South Vietnam did not rise to support him. Our position is stronger than before."),
      source("Source B", "a letter from a fictional American student to her college newspaper, May 1970", "Four students were shot dead at Kent State for protesting against the invasion of Cambodia. The President promised peace and widened the war. My brother's draft number comes up next month. We will strike, we will march, and we will not stop until every soldier comes home."),
      source("Source C", "a cartoon of the kind published in American newspapers in 1971, described in words", "A tired Uncle Sam, with a bandaged head, wades through a swamp labelled \"Vietnam\" carrying an enormous sack marked \"Cost of the war\". Ahead of him, a sign pointing backwards reads \"Exit\", but the mud reaches his chest.", { described: true }),
      source("Source D", "the memoir of a fictional US Marine officer, published in 1985", "We won almost every fight and lost the war. The Viet Cong would melt into a village, we would call in the artillery, and the next week that village gave the enemy its sons. The Trail kept feeding them whatever we bombed. By 1969 my men knew they were there only until they could be brought home."),
      source("Source E", "a speech of the kind made by a South Vietnamese politician to his parliament, 1972", "Our American friends tell us our army can now fight alone. Yet they are leaving because their own people are tired, not because the war is won. Our government must earn the trust of the villages, or no army will save it."),
      source("Source F", "an extract from a book by a fictional American historian, 2005", "Withdrawal was driven by politics at home, but politics at home reflected realities in Vietnam: an enemy that could replace its losses, a South Vietnamese government that never won broad support, and a cost in lives and money that no President could justify for ever. Nixon also wanted to improve relations with China and the USSR, and an endless war stood in the way."),
    ])}`,
    hints: ["Separate the pressures at home from the problems in Vietnam itself."],
    parts: p2Parts([
      { stem: "Study Source C. What is the message of this cartoon? Explain your answer using details of the source.", points: [
        ["Message: the USA is trapped in a costly war it wants to leave", 3],
        ["Details: Uncle Sam injured and tired; mud to his chest", 2],
        ["Details: sack labelled 'Cost of the war'; the Exit sign behind him", 2],
      ], model: "The message is that the USA is trapped in a costly war that it wants to leave but cannot easily escape. Uncle Sam, representing the USA, is tired and injured, with a bandaged head, showing the human cost. He carries a huge sack marked 'Cost of the war', showing the financial burden. The sign reading 'Exit' points backwards, but the mud reaches his chest, suggesting that getting out is slow and difficult. The cartoonist supports withdrawal while showing how hard it was." },
      { stem: "Study Sources A and D. How far does Source D challenge Source A? Explain your answer.", points: [
        ["Agreement: both say the USA won the battles / the enemy lost heavily", 2],
        ["Challenge: D says the USA lost the war; A says its position was stronger", 2],
        ["D: firepower turned villages against the USA; the Trail kept supplies flowing", 2],
        ["Provenance (official statement at the time vs officer's memoir with hindsight); judgement", 2],
      ], model: "Source D partly agrees with Source A: both say American forces won the fighting, A claiming the enemy lost tens of thousands of fighters and D that 'we won almost every fight'. But D challenges A's main claim. A says the American position was stronger than before; D says the USA 'lost the war', because American artillery turned villages against them and the Ho Chi Minh Trail kept supplying the enemy, so losses could be replaced. A is an official statement made just after Tet to reassure the public, while D is a memoir written years later, with hindsight, by an officer who had fought. D therefore challenges A strongly on the outcome, though not on the battlefield facts." },
      { stem: "Study Source B. Why was this letter written in May 1970? Explain your answer using details of the source and your knowledge.", points: [
        ["Context: Nixon's invasion of Cambodia (April-May 1970) despite promising peace", 2],
        ["Context: Kent State shootings (4 students killed)", 2],
        ["Purpose: to encourage students to strike and protest; anger at the draft", 2],
        ["Link to wider anti-war movement", 1],
      ], model: "The letter was written in anger at two events. In late April 1970 Nixon, who had promised peace with honour, sent American troops into Cambodia to attack enemy bases, which seemed to widen the war. On 4 May National Guardsmen shot dead four students at Kent State University during protests against the invasion. The writer's brother faced the draft, giving her a personal reason to oppose the war. Her purpose was to rouse other students to strike and march until all American soldiers came home, as part of the anti-war movement that spread across American colleges that spring." },
      { stem: "Study Source E. How reliable is this source as evidence about why the USA withdrew from Vietnam? Explain your answer using the source and your knowledge.", points: [
        ["Content: USA leaving because Americans are tired, not because the war is won", 2],
        ["Own knowledge supports: opposition at home; Vietnamisation", 2],
        ["Provenance: a South Vietnamese politician, worried about abandonment; may resent the USA; speaking to his parliament for political purposes", 2],
        ["Also admits weakness of the South Vietnamese government, which makes it more credible; judgement", 2],
      ], model: "Source E says the Americans were leaving because their own people were tired, not because the war had been won. My own knowledge supports this: after Tet, American opinion turned against the war, and Nixon's Vietnamisation was designed to bring troops home while claiming South Vietnam could fight alone. The speaker is a South Vietnamese politician, who had reason to feel abandoned and might blame the Americans, and he was speaking to his parliament for political purposes. However, he also admits a weakness of his own side, that the government had not earned the trust of the villages, which makes the source more credible, since he gains nothing by saying it. It is fairly reliable evidence about the reasons for withdrawal, though it gives one side's view." },
      { stem: "Study all the sources. How far do these sources provide convincing evidence that the USA withdrew from Vietnam because of opposition at home? Use the sources to explain your answer.", points: [
        ["Supporting: B (protest, strikes, Kent State), E (Americans tired), F (driven by politics at home), C (cost)", 2],
        ["Challenging: D (military failure: enemy replaced losses, villages alienated), E (weak South Vietnamese government), F (realities in Vietnam; détente)", 2],
        ["A: official optimism unreliable; shows why the public lost trust after Tet", 2],
        ["Evaluation of provenance; own knowledge (Tet, Johnson's decision, draft, My Lai, Nixon and China)", 2],
        ["Supported judgement", 2],
      ], model: "Several sources support the view that opposition at home caused withdrawal. Source B shows the anger of students after Kent State and their determination to protest until every soldier came home; Source E says the Americans were leaving because their people were tired; Source C shows the burden of cost; and Source F, a historian, says withdrawal was driven by politics at home. My own knowledge confirms that after Tet Johnson did not seek re-election, and protests, the draft and the revelation of My Lai turned many Americans against the war.\n\nBut the sources also show why opinion turned. Source D, an officer's memoir, explains that the USA won battles but lost the war, because firepower alienated villagers and the Ho Chi Minh Trail kept the enemy supplied. Source E admits that South Vietnam's government lacked the trust of the villages, and F stresses these realities and Nixon's wish to improve relations with China and the USSR. Source A shows official optimism that Tet had exposed as unreliable.\n\nThe sources provide convincing evidence that opposition at home was the immediate reason for withdrawal, and F is the most balanced source. But they also show that the opposition grew because the war could not be won at an acceptable cost, so military and political failure in Vietnam was the deeper cause." },
    ]),
    explanation: "Paper 2 document question on containment: 40 marks.",
  });

  // ---------------------------------------------------------------------------------------------------------------
  // Paper 4: Depth study D x3.
  b.struct({
    ...p4, d: 5, concepts: ["hist.usa.boom"],
    stem: "This question is about the US economy in the 1920s.",
    hints: ["In (b), judge importance in several ways: how much it caused, how long it lasted, and whom it affected."],
    parts: p4Parts({
      a: { stem: "Write an account of the growth of mass production and consumer industries in the USA in the 1920s.", points: [
        ["Origins: Ford's moving assembly line (1913); Model T", 2],
        ["Mass production lowered prices; millions of cars sold by the end of the decade", 2],
        ["Linked industries: steel, rubber, glass, oil; roads, garages, suburbs", 2],
        ["Electrification of homes and new consumer goods (radios, refrigerators, vacuum cleaners)", 2],
        ["Hire purchase and credit made goods affordable", 2],
        ["Advertising and the radio created demand", 2],
        ["Government support: tariffs and low taxes (Fordney-McCumber, Mellon)", 2],
        ["Limits by the late 1920s: overproduction and saturated markets", 2],
      ], model: "Mass production in the USA was pioneered by Henry Ford, who introduced the moving assembly line for the Model T in 1913. Each worker carried out one small task as the car moved past, cutting the time needed to build a car dramatically. Ford lowered his prices again and again, so that by the 1920s ordinary families could afford a car, and by the end of the decade millions of cars were on American roads. In 1927 Ford replaced the Model T with the Model A, as competition from General Motors grew.\n\nThe car industry stimulated many others. It used vast quantities of steel, rubber and glass, and created demand for petrol and oil. Governments built roads, and new businesses grew alongside them: garages, petrol stations, roadside restaurants and motels. Cars allowed people to live further from work, so suburbs spread, boosting the building industry.\n\nAt the same time more homes were connected to electricity, creating demand for new consumer goods such as radios, refrigerators, washing machines and vacuum cleaners. These were also mass-produced, and their prices fell.\n\nTwo developments helped people to buy. Hire purchase allowed families to pay a deposit and take the goods home, paying the rest in instalments, and banks lent freely. Advertising became a major industry, using magazines, billboards and the new radio stations to persuade Americans that they needed the latest products.\n\nThe Republican governments supported this growth with low taxes, especially Andrew Mellon's cuts for the rich, and with the Fordney-McCumber Tariff of 1922, which protected American manufacturers from foreign competition.\n\nBy the late 1920s, however, the growth was slowing. Many families who could afford a car or a radio already had one, and factories were producing more than people could buy, which was one of the weaknesses that lay behind the Crash of 1929." },
      b: { stem: "How important was government policy to the economic boom of the 1920s?", points: [
        ["Importance of laissez-faire: few regulations, business free to grow and combine", 3],
        ["Importance of low taxes (Mellon) for investment and spending by the rich", 3],
        ["Importance of tariffs (Fordney-McCumber): protected markets; but retaliation hurt farmers and exports", 3],
        ["Comparison: mass production and new technology (cars, electricity) as deeper causes", 3],
        ["Comparison: credit, hire purchase, advertising and confidence", 3],
        ["Comparison: wartime advantages and natural resources", 3],
        ["Different ways of judging importance: short-term vs long-term; who benefited; contribution to later weaknesses", 3],
        ["Supported overall judgement", 3],
      ], model: "Government policy was important to the boom, but it is best seen as creating favourable conditions rather than driving growth itself.\n\nThe Republican presidents Harding, Coolidge and Hoover believed in laissez-faire. They placed few regulations on business and did little to stop large companies from growing and dominating their industries. This gave businessmen the confidence to invest and expand. Andrew Mellon, Secretary of the Treasury, cut income taxes, especially for the rich, arguing that they would invest the money and create jobs; profits and share prices did rise strongly. The Fordney-McCumber Tariff of 1922 protected American industry by making imported goods dearer, so Americans bought American goods. Judged by its contribution to business confidence and profits, government policy was clearly important.\n\nHowever, if importance is judged by what actually created the new wealth, other factors matter more. The decisive factor was new technology and mass production. Ford's assembly line made cars cheap enough for ordinary families, and the car industry in turn boosted steel, rubber, glass, oil and road-building. Electrification created demand for radios, refrigerators and other consumer goods. Government policy did not invent any of this.\n\nDemand also depended on credit, hire purchase and advertising, which let people buy goods before they had saved for them, and on rising confidence and share prices. The USA also began the decade with great advantages: it had gained markets and loans during the First World War, its territory had not been damaged, and it had vast natural resources.\n\nImportance can also be judged by long-term effects. Here government policy looks important in a negative way. Laissez-faire meant that banks and the stock market were poorly regulated, tax cuts increased inequality, and tariffs led other countries to retaliate, hurting farmers and making it harder to export surplus goods. These policies contributed to the weaknesses that turned the Crash of 1929 into a depression.\n\nOverall, government policy was important because it created conditions in which business could flourish and gave confidence to investors, but it was less important than mass production and new technology, which were the real engines of the boom. Its greatest importance may lie in its long-term contribution to the weaknesses of the economy." },
    }),
    explanation: "Paper 4 question on Depth study D (40 marks).",
  });
  b.struct({
    ...p4, d: 5, concepts: ["hist.usa.roaring-twenties", "hist.usa.intolerance"],
    stem: "This question is about American society in the 1920s.",
    hints: ["In (b), consider the Klan's size, its victims, its geography and how long it lasted."],
    parts: p4Parts({
      a: { stem: "Write an account of Prohibition in the USA, from its introduction to its repeal.", points: [
        ["Background: temperance campaigns; religion; First World War", 2],
        ["Eighteenth Amendment and Volstead Act; in force from January 1920", 2],
        ["Evasion: speakeasies, bootleggers, moonshine, smuggling from Canada and Mexico", 2],
        ["Weak enforcement: few agents; corruption of police, judges and politicians", 2],
        ["Gangsterism: Capone in Chicago; gang wars", 2],
        ["St Valentine's Day Massacre (1929); Capone jailed for tax evasion (1931)", 2],
        ["Growing opposition: crime, disrespect for law; the Depression's case for jobs and taxes", 2],
        ["Roosevelt's promise; Twenty-first Amendment, December 1933", 2],
      ], model: "Prohibition grew out of long campaigns by temperance groups such as the Anti-Saloon League and the Women's Christian Temperance Union, which blamed alcohol for crime, poverty and violence in the home. Many Protestant churches saw drinking as sinful, and the First World War added patriotic arguments, since grain was needed for food and many brewers were of German origin. The Eighteenth Amendment was ratified in 1919 and, enforced by the Volstead Act, Prohibition came into force in January 1920.\n\nFrom the start, millions of Americans ignored it. Thousands of illegal bars, called speakeasies, opened in the cities. Bootleggers smuggled alcohol over the long borders with Canada and Mexico and by sea, and people made their own 'moonshine', which was sometimes poisonous.\n\nEnforcement was weak. There were only a few thousand Prohibition agents for the whole country, and many police officers, judges and politicians were bribed to look the other way.\n\nThe huge profits from illegal alcohol fuelled organised crime. In Chicago, Al Capone controlled speakeasies, gambling and other rackets, and rival gangs fought violently for territory. On 14 February 1929, in the St Valentine's Day Massacre, seven men linked to a rival gang were shot dead in a Chicago garage. Capone was finally convicted in 1931, not for violence but for income-tax evasion.\n\nBy then many Americans believed Prohibition had failed: it had not stopped drinking, but it had increased crime and corruption and damaged respect for the law. The Depression after 1929 added economic arguments, since legal brewing would create jobs and the government could tax alcohol again. Franklin Roosevelt promised repeal in the 1932 election, and the Twenty-first Amendment ended Prohibition in December 1933." },
      b: { stem: "How important was the Ku Klux Klan in American society in the 1920s?", points: [
        ["Size: several million members at its peak (estimate); spread beyond the South", 3],
        ["Victims: Black Americans, Catholics, Jews, immigrants; violence and intimidation", 3],
        ["Political influence in some states; reflected and spread nativism", 3],
        ["Limits: rapid decline after 1925 scandal; opposition and ridicule", 3],
        ["Comparison: segregation and discrimination were enforced by law (Jim Crow) without the Klan", 3],
        ["Comparison: immigration quotas and the Red Scare as wider expressions of intolerance", 3],
        ["Different ways of judging importance: numbers, impact on victims, lasting effects, symbol", 3],
        ["Supported overall judgement", 3],
      ], model: "The Ku Klux Klan was an important part of American society in the 1920s, but its importance depends on how it is judged.\n\nJudged by its size, it was very important. Refounded in 1915, it grew rapidly in the early 1920s and spread far beyond the South, especially into the Midwest. Historians estimate that its membership reached several million in the mid-1920s, and in some states it had real political influence. This shows that its ideas of white Protestant supremacy were shared by a large number of ordinary Americans.\n\nJudged by its impact on its victims, it was also important. The Klan targeted Black Americans, Catholics, Jews and immigrants, using intimidation, beatings and murder, and it spread fear in many communities. For the people it attacked, its importance cannot be measured simply in numbers.\n\nHowever, other ways of judging importance suggest limits. The Klan's power was short-lived: after 1925, when one of its leaders in Indiana was convicted of a brutal murder, its hypocrisy was exposed and membership collapsed. Many Americans opposed or ridiculed it.\n\nMoreover, much of the intolerance of the 1920s did not depend on the Klan. In the South, segregation was enforced by Jim Crow laws and most Black people were kept from voting by tests and taxes; lynching continued without a federal law to stop it. Nationally, Congress passed the immigration quotas of 1921 and 1924, and the Red Scare led to the Palmer Raids and the deportation of radicals. The Sacco and Vanzetti case and the Scopes trial show intolerance towards immigrants and modern ideas in the courts. These laws and events affected far more people for far longer than the Klan did.\n\nThe Klan is therefore most important as a symbol and a symptom: it shows how widespread nativist and racist attitudes were in the early 1920s. But as a cause of intolerance it was less important than the laws and institutions, such as segregation and immigration quotas, which outlasted its brief period of mass support." },
    }),
    explanation: "Paper 4 question on Depth study D (40 marks).",
  });
  b.struct({
    ...p4, d: 5, concepts: ["hist.usa.new-deal", "hist.usa.new-deal-assessment"],
    stem: "This question is about the New Deal.",
    hints: ["In (b), ask whether opposition stopped policies, changed them, or failed."],
    parts: p4Parts({
      a: { stem: "Write an account of Roosevelt's Hundred Days in 1933.", points: [
        ["Inauguration on 4 March 1933; the crisis inherited", 2],
        ["Bank holiday and Emergency Banking Act; inspection and reopening", 2],
        ["First fireside chat; confidence restored", 2],
        ["CCC: work for young men", 2],
        ["FERA: relief grants to the states", 2],
        ["AAA: paying farmers to produce less", 2],
        ["TVA: dams, flood control, electricity", 2],
        ["NIRA: NRA codes and PWA public works; end of the Hundred Days in June", 2],
      ], model: "Franklin D. Roosevelt became President on 4 March 1933, at the worst point of the Depression. About a quarter of the workforce was unemployed and the banking system was close to collapse. In his inaugural address he told Americans that the only thing they had to fear was fear itself, and he asked Congress for broad powers to deal with the emergency.\n\nHis first action was to declare a bank holiday, closing every bank. Congress quickly passed the Emergency Banking Act: government inspectors examined the banks, and only those judged sound reopened, with government support. In his first fireside chat on the radio Roosevelt explained the plan and urged people to trust the reopened banks, and when they reopened more money was deposited than withdrawn.\n\nA flood of new laws followed. At the end of March the Civilian Conservation Corps was set up to give young unemployed men work planting trees and protecting the countryside, with most of their wages sent home. In May the Federal Emergency Relief Administration gave federal money to the states for relief. The Agricultural Adjustment Act paid farmers to produce less, so that prices would rise. The Tennessee Valley Authority was created to build dams in one of the poorest regions of the country, controlling floods and producing cheap electricity.\n\nIn June the National Industrial Recovery Act set up the National Recovery Administration, which encouraged employers to agree codes on fair prices, wages and hours, and the Public Works Administration, which funded roads, bridges, schools and dams. Other laws regulated the stock market and banks.\n\nBy mid-June, when the Hundred Days ended, Congress had passed a remarkable number of major laws, and Roosevelt had restored a sense that the government was acting to meet the crisis." },
      b: { stem: "How important was opposition in limiting the achievements of the New Deal?", points: [
        ["Supreme Court: struck down NIRA (1935) and AAA (1936); court-packing plan failed (1937)", 3],
        ["Business and Republicans: Liberty League; low business confidence held back investment", 3],
        ["Conservative Democrats in the South: limits on civil rights (anti-lynching law avoided); exclusions from Social Security", 3],
        ["Opposition failed in some ways: 1936 landslide; Court accepted later laws; radicals pushed Roosevelt towards reform", 3],
        ["Comparison: Roosevelt's own decisions (1937 spending cuts) and the scale of the Depression", 3],
        ["Comparison: the limits of the programmes themselves (temporary jobs, unequal treatment)", 3],
        ["Different ways of judging importance: stopping policies, changing them, restricting their reach", 3],
        ["Supported overall judgement", 3],
      ], model: "Opposition did limit the New Deal, but its importance varied, and other factors limited its achievements more.\n\nThe Supreme Court was the most direct obstacle. In May 1935 it struck down the National Industrial Recovery Act, ending the NRA codes, and in January 1936 it struck down the AAA. Roosevelt's plan to add up to six judges was defeated in Congress in 1937 and damaged his authority. Judged by its power to stop policies, the Court was very important.\n\nBusiness and Republican opposition also mattered. The American Liberty League attacked the New Deal as a threat to freedom, and many business leaders, fearing regulation, taxes and stronger unions, held back investment, which slowed recovery. Southern Democrats in Congress shaped what the New Deal could do: Roosevelt avoided supporting a federal anti-lynching law to keep their votes, and farm and domestic workers, many of them Black, were at first left out of Social Security.\n\nIn other ways opposition failed or even pushed the New Deal further. Roosevelt won the 1936 election in a landslide, and after 1937 the Court accepted the Wagner Act and the Social Security Act. Critics on the left, such as Huey Long and Dr Townsend, encouraged Roosevelt to move towards reform, including Social Security and higher taxes on the rich. Judged by how far it changed the direction of policy, opposition from the left was arguably as important as opposition from the right.\n\nOther factors limited the New Deal's achievements more. The Depression was enormous, and government spending, though large by earlier standards, was not enough to end mass unemployment. Roosevelt's own decision to cut spending in 1937 caused the recession of 1937-38. Many New Deal jobs were temporary, and the programmes themselves often treated Black Americans and women unequally.\n\nOverall, opposition was important in restricting particular policies and in limiting the New Deal's reach to some groups, but the main limit on its achievements was the scale of the Depression and the caution of the New Deal itself, especially over spending." },
    }),
    explanation: "Paper 4 question on Depth study D (40 marks).",
  });
});
