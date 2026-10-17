// Slice W4a: Stalin's rise and dictatorship (both boards: ZIMSEC topic 14, 0470 Depth study C key question 3).
// Numbers of victims are historians' estimates.
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.russia.stalin-power", { file: "russia/stalin-power", keyPrefix: "russia.stalin-power" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which party post did Stalin hold from 1922 that helped him gain power?",
    options: [
      ["General Secretary", "Correct: it gave him control over appointments."],
      ["Commissar for War", "Trotsky held this post until 1925."],
      ["Head of the Cheka", "Dzerzhinsky led the Cheka."],
      ["Chairman of the Petrograd Soviet in 1917", "Trotsky held this post in 1917."],
    ],
    answer: "A",
    explanation: "As **General Secretary** Stalin appointed party officials, who supported him in votes.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did Stalin mean by 'Socialism in One Country'?",
    options: [
      ["Building socialism in the USSR first", "Correct: rather than waiting for world revolution."],
      ["Spreading revolution across the world at once", "This was Trotsky's 'permanent revolution'."],
      ["Allowing each Soviet republic to leave the USSR", "This was not the meaning."],
      ["Returning to a market economy like the NEP for ever", "Stalin ended the NEP in 1928-29."],
    ],
    answer: "A",
    explanation: "**Socialism in One Country** meant strengthening the USSR first, an idea that appealed to many party members.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Whose murder in December 1934 was followed by a wave of arrests in the party?",
    options: [
      ["Sergei Kirov", "Correct: the party leader in Leningrad."],
      ["Leon Trotsky", "Trotsky was murdered in Mexico in 1940."],
      ["Nikolai Bukharin", "Bukharin was tried and shot in 1938."],
      ["Mikhail Tukhachevsky, the army marshal", "He was executed in 1937."],
    ],
    answer: "A",
    explanation: "Stalin used **Kirov's** murder as a reason to hunt for 'enemies', leading to the Purges.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What did Lenin's Testament suggest about Stalin?",
    options: [
      ["He should be removed as General Secretary", "Correct: Lenin called him too rude."],
      ["He should succeed Lenin as leader", "Lenin named no successor."],
      ["He should become Commissar for War", "This was not suggested."],
      ["He should be expelled from the party at once", "Lenin suggested removing him from one post."],
    ],
    answer: "A",
    explanation: "Lenin suggested **removing Stalin as General Secretary**, but the Testament was not published.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How did Stalin defeat the United Opposition of Trotsky, Zinoviev and Kamenev?",
    options: [
      ["He used the party's ban on factions against them", "Correct: they were expelled in 1927."],
      ["He defeated them in a civil war in Ukraine", "There was no armed struggle."],
      ["He won a national election against them", "The USSR had no competitive elections."],
      ["He persuaded Lenin to dismiss them before he died", "They were defeated after Lenin's death."],
    ],
    hints: ["Think back to the decision of the Tenth Party Congress in 1921."],
    answer: "A",
    explanation: "The **ban on factions** (1921) let Stalin treat organised opposition as a breach of party discipline.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What was a show trial in Stalin's USSR?",
    options: [
      ["A public trial with forced confessions to invented crimes", "Correct: confessions were often forced."],
      ["A trial in which the jury was chosen by the accused themselves", "There were no such juries."],
      ["A secret trial with no record kept", "Show trials were public, for propaganda."],
      ["A trial of foreign spies held only in the army", "Leading party members were the main defendants."],
    ],
    hints: ["Why would a regime want a trial to be seen by everyone?"],
    answer: "A",
    explanation: "**Show trials** were staged for propaganda, with confessions often obtained by torture or threats.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "What was the most serious consequence of Stalin's purge of the Red Army's commanders?",
    options: [
      ["It removed many experienced commanders before war", "Correct: the army was weakened for 1941."],
      ["It led directly to a military coup against Stalin", "No coup took place."],
      ["It made Trotsky Commissar for War again", "Trotsky was in exile."],
      ["It ended the use of political commissars in the army", "Commissars remained."],
    ],
    hints: ["What happened to the USSR in 1941?"],
    answer: "A",
    explanation: "Losing **experienced commanders** left the army weak when Germany invaded in 1941.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which evidence best suggests that Stalin's control was NOT total by 1941?",
    options: [
      ["Peasants resisted quietly by working slowly or hiding grain", "Correct: passive resistance continued."],
      ["All Stalin's former rivals had been killed or exiled", "This suggests strong control."],
      ["Writers and artists had to follow the rules of socialist realism", "This suggests strong control."],
      ["Stalin's portraits and statues were everywhere", "This shows the cult of personality."],
    ],
    hints: ["Look for evidence that people still acted against the regime's wishes."],
    answer: "A",
    explanation: "Quiet **non-co-operation** shows that the regime could not control everything people did.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Trotsky was expelled from the Communist Party in 1927 and deported from the USSR in 1929.",
    answer: true,
    explanation: "True. He was later murdered in Mexico in 1940 by an agent of Stalin.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The victims of the Great Terror of 1937-38 were almost all senior members of the Communist Party.",
    answer: false,
    explanation: "False. It spread far beyond the party elite to the army, managers, minorities and huge numbers of ordinary people.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each leader with what happened to him.",
    pairs: [
      ["Trotsky", "Deported in 1929 and murdered in Mexico in 1940"],
      ["Zinoviev", "Confessed at a show trial and was shot in 1936"],
      ["Bukharin", "Removed from the Politburo in 1929 and shot in 1938"],
      ["Tukhachevsky", "Army marshal shot in the purge of 1937"],
    ],
    explanation: "Trotsky (1929, 1940), Zinoviev (1936), Bukharin (1929, 1938), Tukhachevsky (1937).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Kirov is murdered",
      "Lenin dies",
      "Trotsky is expelled from the party",
      "Bukharin is tried and shot",
    ],
    right: POS,
    rightIndex: [2, 0, 1, 3],
    hints: ["The struggle for power came before the Terror."],
    explanation: "Lenin dies (1924); Trotsky expelled (1927); Kirov murdered (1934); Bukharin shot (1938).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The system of forced labour camps was called the {{blank:a}}. From 1934 Soviet writers and artists had to follow the style called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Gulag"], choices: ["Gulag", "Cheka", "Kolkhoz", "Politburo"] },
      { id: "b", accepted: ["socialist realism"], choices: ["socialist realism", "expressionism", "permanent revolution", "Russification"] },
    ],
    explanation: "The **Gulag** ran the labour camps; **socialist realism** was the official artistic style.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe how Stalin used propaganda to strengthen his control.",
    points: [
      "Cult of personality: portraits, statues, praise in newspapers; towns named after him.",
      "History rewritten to exaggerate his role (official party history, 1938).",
      "Photographs altered to remove purged leaders.",
      "Culture controlled: socialist realism; art and literature glorified Stalin and socialism.",
    ],
    modelAnswer: "Stalin built a cult of personality: his portraits and statues were everywhere, newspapers praised him as the father of the peoples and towns such as Stalingrad were named after him. History was rewritten to exaggerate his role in 1917, and photographs were altered to remove leaders who had been purged. Writers, artists and composers had to follow socialist realism, producing optimistic works that glorified socialism and Stalin.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why Stalin launched the Purges.",
    points: [
      "Identifies removing potential rivals.",
      "Explains that Old Bolsheviks who knew of Lenin's criticisms could challenge him, so they were eliminated in show trials.",
      "Identifies creating fear / scapegoats.",
      "Explains that terror made opposition impossible and blamed 'wreckers' for economic failures.",
    ],
    hints: ["Think about threats to Stalin and the uses of fear."],
    modelAnswer: "Stalin wanted to remove anyone who might challenge him, especially Old Bolsheviks such as Zinoviev, Kamenev and Bukharin who remembered Lenin's criticisms and could become leaders of opposition; show trials eliminated and discredited them. The Purges also created fear, so that no one dared to resist, and provided scapegoats: failures in the Five-Year Plans could be blamed on 'wreckers' and 'saboteurs'.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why Stalin, and not Trotsky, became leader of the Soviet Union.",
    points: [
      "Identifies the General Secretary's power.",
      "Explains that control of appointments gave Stalin supporters who voted for him at party congresses.",
      "Identifies Stalin's political skill / popular policy.",
      "Explains alliances with each group in turn and the appeal of Socialism in One Country.",
      "Identifies Trotsky's weaknesses.",
      "Explains arrogance, late membership, fear of him as a military dictator, missing Lenin's funeral, failure to build alliances.",
    ],
    hints: ["Stalin's strengths and Trotsky's weaknesses."],
    modelAnswer: "As General Secretary, Stalin controlled appointments to party posts, so local officials owed their jobs to him and voted for him at party congresses. He was a skilful politician who allied with Zinoviev and Kamenev against Trotsky, then with Bukharin against them, and finally turned on Bukharin. His policy of Socialism in One Country appealed to party members tired of upheaval. Trotsky, by contrast, seemed arrogant, had joined the Bolsheviks only in 1917, and was feared as a possible military dictator; he missed Lenin's funeral and failed to build alliances or to use Lenin's Testament against Stalin.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a description in words of a Soviet poster of the kind produced in the late 1930s", "Stalin, smiling and dressed in a plain military tunic, holds a small girl who offers him a bunch of flowers. Behind them, crowds carry red banners past new factories. The caption reads: 'Thank you, dear Stalin, for our happy childhood!'", { described: true })}\n\n${source("Source B", "an account written in 1960 by a fictional former engineer who had been arrested in 1937", "They came at night, as they always did. My crime, I learned after months of questioning, was that a machine in my workshop had broken down. I signed what they put in front of me. In the camp I met teachers, party secretaries, a priest and a peasant who had complained about the collective farm. None of us had done anything.")}`,
    hints: ["Consider when, why and by whom each source was produced."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What is the message of Source A?", points: [
        "Stalin is a kind, loving father figure (cult of personality).",
        "Life in the USSR is happy and prosperous thanks to him (new factories).",
      ], explanation: "Two points of message." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far does Source B challenge the view given in Source A?", points: [
        "B shows terror and arbitrary arrest, the opposite of A's happiness.",
        "B shows innocent people from all groups imprisoned; A shows a contented people.",
        "B shows forced confessions; A shows love for Stalin.",
        "They are not wholly contradictory: A shows the propaganda that hid what B describes / both show the regime's control.",
      ], explanation: "Points of challenge, with an explanation of how both can be true." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How useful are these sources for understanding how Stalin controlled the Soviet Union? Use the sources and your own knowledge.", points: [
        "A: useful evidence of propaganda and the cult of personality (purpose: build loyalty).",
        "A: tells us nothing reliable about real feelings; designed to hide reality.",
        "B: useful for terror: night arrests, forced confessions, the Gulag, victims from many groups (own knowledge: 1937-38).",
        "B: written in 1960, after Stalin's death, by a victim; may be bitter but details match archive evidence.",
        "Together they show the two main methods: propaganda and terror.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source A is useful as evidence of propaganda: it shows the cult of personality, presenting Stalin as a loving father who has brought happiness and progress. Its purpose was to build loyalty, so it tells us what the regime wanted people to believe, not how they really felt. Source B is useful as evidence of terror: night arrests, a forced confession, and a camp full of teachers, party secretaries, a priest and a peasant, which matches what historians know of the Great Terror of 1937-38 and the Gulag. It was written in 1960 by a former victim and may be bitter, but its details fit archive evidence. Together the sources are very useful because they show the two main methods of control, propaganda and terror, although neither covers the purges of the party leadership and army or the role of the NKVD in detail.", explanation: "Usefulness from content, provenance and own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), consider political power, the economy, and people's private lives."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the show trials of 1936-38.", points: [
        "Public trials of leading Old Bolsheviks.",
        "1936: Zinoviev and Kamenev confessed to plotting with Trotsky and were shot.",
        "1937-38: further trials; Bukharin shot in 1938.",
        "Confessions to invented crimes, often forced by torture or threats; used as propaganda.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "How complete was Stalin's control of the Soviet Union by 1941?", points: [
        ["Complete: rivals dead or exiled; party and army purged and filled with loyalists", 2],
        ["Complete: NKVD, Gulag and terror; propaganda, cult and socialist realism", 2],
        ["Limits: chaos and inefficiency from the Terror; officials bending orders; army weakened", 2],
        ["Limits: peasants' passive resistance; private beliefs and religion survived", 2],
        ["Supported judgement", 2],
      ], levels: levels(10), modelAnswer: "Stalin's political control was almost complete by 1941. All his former rivals had been killed or exiled, and Trotsky was murdered in 1940. The show trials and the purge of the army had removed anyone who might challenge him, and the party, army and NKVD were filled with people who owed their careers to him. Terror, carried out by the NKVD and the Gulag, made open opposition almost impossible, while the cult of personality, rewritten history and socialist realism shaped what people saw and read.\n\nHowever, control was less complete in practice. The Terror caused chaos: managers and officers were arrested, the economy and army were weakened, and officials sometimes bent or ignored instructions to protect themselves. Peasants resisted quietly by working slowly on the collective farms or hiding grain, and many people kept their religious faith and private opinions.\n\nOverall Stalin's control over politics was total, but his control over society was not: people obeyed out of fear and habit rather than full belief, and the regime's own methods created disorder.", explanation: "Levels: both sides with a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("FACT", "When did Stalin become General Secretary?", "1922.");
  b.card("FACT", "What did Lenin's Testament say about Stalin?", "That he was too rude and should be removed as General Secretary.");
  b.card("DEFINITION", "Socialism in One Country", "Stalin's policy of building socialism in the USSR first, instead of spreading world revolution.");
  b.card("DEFINITION", "Permanent revolution", "Trotsky's idea that the revolution must spread to other countries to survive.");
  b.card("FACT", "When was Kirov murdered?", "1 December 1934, in Leningrad.");
  b.card("DEFINITION", "Show trial", "A public trial staged for propaganda, with forced confessions to invented crimes.");
  b.card("FACT", "How many people did the Great Terror affect (estimates)?", "In 1937-38 about 1.5 million arrested and about 680,000 executed (historians' estimates from archives).");
  b.card("DEFINITION", "Gulag", "The Soviet system of forced labour camps run by the secret police.");
  b.card("DEFINITION", "Cult of personality", "Propaganda presenting the leader as a wise, all-knowing hero to be loved and obeyed.");
  b.card("CONCEPT", "Why did Stalin beat Trotsky?", "Control of the party machine, skilful alliances and popular policies, and Trotsky's arrogance and isolation.");
});
