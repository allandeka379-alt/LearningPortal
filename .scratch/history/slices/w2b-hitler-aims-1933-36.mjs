// Slice W2b: Hitler's aims and early foreign policy, 1933-1936 (ZIMSEC 12.4-12.5, 0470 B3).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.road-to-war.hitler-aims-1933-36", { file: "road-to-war/hitler-aims-1933-36", keyPrefix: "road-to-war.hitler-aims-1933-36" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "When did German troops remilitarise the Rhineland?",
    options: [
      ["March 1936", "Correct: on 7 March 1936."],
      ["January 1935", "That was the Saar plebiscite."],
      ["March 1938", "That was the Anschluss with Austria."],
      ["October 1933", "That is when Germany left the League."],
    ],
    answer: "A",
    explanation: "German troops entered the **Rhineland** on 7 March 1936.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does the German word 'Lebensraum' mean?",
    options: [
      ["Living space", "Correct: land in the east for German settlers and resources."],
      ["Lightning war", "That is Blitzkrieg."],
      ["Union with Austria", "That is Anschluss."],
      ["Dictated peace", "That is Diktat."],
    ],
    answer: "A",
    explanation: "**Lebensraum** meant 'living space' in eastern Europe, at the expense of Poland and the USSR.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How did the Saar return to Germany in 1935?",
    options: [
      ["By a plebiscite of its people", "Correct: about 90 per cent voted to rejoin Germany."],
      ["By a German military invasion", "No force was used; the return was legal."],
      ["By a decision of the Munich Conference", "Munich (1938) dealt with the Sudetenland."],
      ["By purchase from the French government", "The Saar was not bought; its people voted."],
    ],
    answer: "A",
    explanation: "The Treaty of Versailles had promised a **plebiscite** after fifteen years of League rule; in January 1935 about 90 per cent voted for Germany.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What did the Anglo-German Naval Agreement of June 1935 allow?",
    options: [
      ["A German surface fleet up to 35 per cent of Britain's", "Correct: Britain accepted a breach of Versailles."],
      ["A German navy equal in size to the Royal Navy", "The limit was 35 per cent of the British surface fleet."],
      ["German control of the Baltic and North Sea coasts", "The agreement set fleet sizes, not control of seas."],
      ["German naval bases in its former colonies in East Africa", "The colonies remained mandates of other powers."],
    ],
    answer: "A",
    explanation: "Britain agreed that Germany could build a fleet up to **35 per cent** of the British surface fleet, without consulting France or Italy.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which country helped stop a Nazi takeover of Austria in July 1934?",
    options: [
      ["Italy", "Correct: Mussolini moved troops to the Brenner Pass."],
      ["Britain", "Britain did not send forces."],
      ["The Soviet Union", "The USSR was not involved."],
      ["Czechoslovakia", "Czechoslovakia did not intervene."],
    ],
    answer: "A",
    explanation: "After Austrian Nazis murdered Chancellor Dollfuss, **Mussolini** moved troops to the Austrian border, and Hitler backed down.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did France not act when Hitler remilitarised the Rhineland?",
    options: [
      ["It was unwilling to fight without British support", "Correct: and an election was due."],
      ["It had signed a pact allowing German troops there", "No such pact existed; the Rhineland was meant to be demilitarised."],
      ["Its army was busy fighting in Abyssinia", "France was not fighting in Abyssinia."],
      ["The League had ordered it to accept the move", "The League did not order this."],
    ],
    answer: "A",
    hints: ["Think about French politics and France's main ally."],
    explanation: "France faced an election and would not act alone; Britain saw the move as Germany occupying its own territory.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "What did Germany gain from intervening in the Spanish Civil War?",
    options: [
      ["Combat experience for its air force", "Correct: the Condor Legion tested aircraft and tactics."],
      ["A Spanish army that fought beside Germany from 1939", "Franco kept Spain neutral in the Second World War."],
      ["Control of the Suez Canal", "Suez was controlled by Britain."],
      ["A permanent naval base on Spain's coast", "Germany did not gain a permanent base."],
    ],
    answer: "A",
    hints: ["Which German unit fought in Spain?"],
    explanation: "The **Condor Legion** gave German pilots combat experience; Germany also gained raw materials and closer ties with Italy.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which evidence best supports the view that Hitler was cautious before 1936?",
    options: [
      ["He backed down over Austria when Mussolini moved troops", "Correct: in July 1934 he avoided confrontation."],
      ["He announced conscription and the Luftwaffe openly", "This was a bold breach of Versailles, not caution."],
      ["He left the League of Nations in 1933", "This was a defiant step."],
      ["He described his aim of Lebensraum in Mein Kampf", "This shows aims, not caution in action."],
    ],
    answer: "A",
    hints: ["Look for a time Hitler retreated."],
    explanation: "In July 1934 Hitler distanced himself from the failed Austrian coup when Italy moved troops to the border, showing he avoided risks he could not win.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Germany signed a non-aggression pact with Poland in 1934.",
    answer: true,
    explanation: "True. The ten-year pact of January 1934 made Hitler appear peaceful and weakened France's eastern alliances.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The Anti-Comintern Pact was first signed between Germany and Italy.",
    answer: false,
    explanation: "False. It was signed by Germany and Japan in November 1936; Italy joined in 1937. The Rome-Berlin Axis linked Germany and Italy.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each event with its year.",
    pairs: [
      ["Germany leaves the League of Nations", "1933"],
      ["Saar plebiscite", "1935"],
      ["Remilitarisation of the Rhineland", "1936"],
      ["Bombing of Guernica", "1937"],
    ],
    explanation: "1933 League; 1935 Saar; 1936 Rhineland; 1937 Guernica.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The Stresa Front",
      "The Anglo-German Naval Agreement",
      "Conscription announced in Germany",
      "The Saar plebiscite",
    ],
    right: POS,
    rightIndex: [2, 3, 1, 0],
    hints: ["All four happened in 1935; the plebiscite was in January."],
    explanation: "Saar plebiscite January 1935; conscription March 1935; Stresa Front April 1935; naval agreement June 1935.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The German air unit that fought for Franco in Spain was the {{blank:a}} Legion. Mussolini called the agreement between Italy and Germany an {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Condor"], choices: ["Condor", "Eagle", "Iron", "Falcon"] },
      { id: "b", accepted: ["axis"], choices: ["axis", "entente", "alliance of steel", "front"] },
    ],
    explanation: "The **Condor** Legion; the Rome-Berlin **Axis** (November 1936).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the general who led the nationalist rebellion in Spain from 1936.",
    accepted: ["Franco", "Francisco Franco", "General Franco"],
    wrong: ["Primo de Rivera"],
    explanation: "**Francisco Franco** won the civil war in 1939 with German and Italian help.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe Hitler's foreign policy aims.",
    points: [
      "Overturn the Treaty of Versailles (rearm, recover land, end reparations).",
      "Unite all German speakers in a Greater Germany.",
      "Win Lebensraum in eastern Europe (Poland, USSR).",
      "Destroy communism / the USSR.",
    ],
    modelAnswer: "Hitler wanted to overturn the Treaty of Versailles by rearming and recovering lost land, to unite all German speakers in one Greater Germany, to win living space (Lebensraum) in eastern Europe at the expense of Poland and the USSR, and to destroy communism.",
    explanation: "One mark per aim.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why Britain and France did not stop the remilitarisation of the Rhineland.",
    points: [
      "Identifies French reluctance to act alone.",
      "Explains: France faced an election and its leaders would not risk war without Britain.",
      "Identifies British opinion that Germany was entering its own territory / Versailles too harsh.",
      "Explains that this made the move seem reasonable, so there was little support for war.",
      "Identifies distraction by the Abyssinian crisis / the League's weakness.",
      "Explains that attention and resources were focused on Italy, and the League was discredited.",
    ],
    hints: ["Consider France, Britain and the League separately."],
    modelAnswer: "France was about to hold an election and its leaders would not risk war without British support. In Britain many people felt that the Treaty of Versailles had been too harsh and that Germany was only moving troops into its own territory, so there was little support for war. At the same time the League and the Western powers were absorbed by the Abyssinian crisis, and the League had already been discredited, so nobody took the lead.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** consequences of the remilitarisation of the Rhineland.",
    points: [
      "Identifies Hitler's increased confidence / standing with his generals.",
      "Explains that his gamble succeeded, so he was encouraged to take bigger risks (Austria, Czechoslovakia).",
      "Identifies fortification of the western frontier.",
      "Explains that it became harder for France to attack Germany to help allies in eastern Europe.",
    ],
    hints: ["Think about Hitler himself and about France's eastern allies."],
    modelAnswer: "First, the success of the gamble increased Hitler's confidence and his authority over doubtful generals, encouraging bigger risks in Austria and Czechoslovakia. Second, Germany could now fortify its western frontier, which made it much harder for France to attack Germany in support of allies such as Czechoslovakia and Poland.",
    explanation: "Two marks per explained consequence.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "an editorial in a fictional British newspaper, 9 March 1936", "German soldiers have marched into German towns on German soil. It is hard to see this as an act of war. The Treaty of Versailles was a harsh one, and Herr Hitler has at least offered fresh talks on peace. Let us take him at his word rather than reach for our rifles.")}\n\n${source("Source B", "a diary entry by a fictional French army officer stationed near the border, March 1936", "We were ready. My men could have been across the Rhine within days. Instead we sit and wait for London. Every month we wait, the Germans will pour more concrete along the frontier. Today they took the Rhineland without a fight; tomorrow they will take something else.")}`,
    hints: ["Think about where each writer was and what each could know."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What is the attitude of Source A towards the remilitarisation?", points: [
        "Accepting / not a threat: Germany was moving into its own territory.",
        "Supported by detail: Versailles harsh; Hitler offered talks; do not reach for rifles.",
      ], explanation: "Attitude plus support." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far does Source B disagree with Source A?", points: [
        "Disagreement: B sees the move as a threat; A does not.",
        "Disagreement: B wanted action; A wanted negotiation.",
        "B's point: delay lets Germany fortify / Hitler will take more.",
        "Any agreement (both note no fight took place) and a judgement.",
      ], explanation: "Points of agreement and disagreement." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Which source gives the more accurate view of the remilitarisation of the Rhineland? Use the sources and your own knowledge.", points: [
        "B accurate: Hitler did go on to take more (Austria 1938, Czechoslovakia 1938-39).",
        "B accurate: Germany fortified the west; Hitler's gamble encouraged him.",
        "A reflects real British opinion that Versailles was harsh and Germany was in its own territory.",
        "A's limits: Hitler's peace offers were not sincere; the move broke Versailles and Locarno.",
        "Provenance: B an officer near the border, frustrated; A writing to influence British readers.",
        "Supported judgement (hindsight supports B).",
      ], levels: levels(6), modelAnswer: "Source A reflects a common British view in 1936: many people felt the Treaty of Versailles was harsh and that Germany was only moving troops into its own land, and Hitler did offer new talks. However, the move broke both Versailles and the Locarno treaties, and Hitler's peace offers were a tactic. Source B is more accurate about what followed. Germany did fortify its western frontier, making it harder for France to help eastern allies, and Hitler, encouraged by success, went on to take Austria and the Sudetenland in 1938. The officer may exaggerate how ready the army was, since French leaders believed it was not ready to act alone. Overall Source B gives the more accurate view of the significance of the event.", explanation: "Use provenance and own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), consider Hitler's actions, Western reactions and Italy."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe German and Italian involvement in the Spanish Civil War.", points: [
        "Both supported Franco's nationalists against the Republic.",
        "Germany sent the Condor Legion (aircraft, pilots).",
        "Condor Legion bombed Guernica (April 1937).",
        "Italy sent tens of thousands of troops, aircraft and weapons; both ignored the Non-Intervention Committee.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "How far was Hitler's success in foreign policy between 1933 and 1936 due to the weakness of Britain and France?", points: [
        ["British and French weakness: accepted rearmament; Anglo-German Naval Agreement; no action over the Rhineland.", 2],
        ["Reasons for that weakness: Depression, public opinion against war, belief Versailles unfair.", 2],
        ["Hitler's skill: legal and popular steps (Saar), peace offers, Polish pact, timing during Abyssinia.", 2],
        ["Other: the League's collapse after Abyssinia; Mussolini's shift to Germany (Axis).", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "The weakness of Britain and France was very important. Britain accepted German rearmament and even signed the Anglo-German Naval Agreement in 1935, breaking up the Stresa Front, and neither country acted when German troops entered the Rhineland in 1936. This weakness had causes: the Depression made rearmament expensive, public opinion was strongly against war, and many British people felt the Treaty of Versailles had been unfair.\n\nHowever, Hitler's own skill mattered. He chose steps that were hard to oppose, such as the legal Saar plebiscite, signed a pact with Poland, offered peace talks and timed the Rhineland move while the world was distracted by Abyssinia. The collapse of the League's authority and Mussolini's move towards Germany, ending in the Rome-Berlin Axis, also removed obstacles.\n\nOverall Western weakness was the main reason, because each of Hitler's gambles depended on Britain and France not acting, but Hitler's timing and propaganda made that weakness easier to exploit.", explanation: "Both sides and a supported judgement." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("DEFINITION", "Lebensraum", "'Living space': land in eastern Europe that Hitler wanted for German settlers and resources.");
  b.card("CONCEPT", "What were Hitler's four main foreign policy aims?", "Overturn Versailles, unite German speakers, gain Lebensraum in the east, destroy communism.");
  b.card("FACT", "What happened in the Saar in January 1935?", "A plebiscite in which about 90 per cent voted to rejoin Germany.");
  b.card("FACT", "When did Hitler announce conscription and reveal the Luftwaffe?", "March 1935.");
  b.card("FACT", "What was the Anglo-German Naval Agreement?", "June 1935: Britain allowed Germany a surface fleet up to 35 per cent of Britain's.");
  b.card("FACT", "When was the Rhineland remilitarised?", "7 March 1936.");
  b.card("DEFINITION", "Anti-Comintern Pact", "Germany and Japan (November 1936), joined by Italy in 1937, against international communism.");
  b.card("FACT", "What was the Condor Legion?", "The German air unit that fought for Franco in Spain; it bombed Guernica in April 1937.");
  b.card("FACT", "What happened in Austria in July 1934?", "Austrian Nazis murdered Chancellor Dollfuss, but their coup failed when Mussolini moved troops to the border.");
});
