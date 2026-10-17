// W4b: ahist.stalin.governance (both boards; Cambridge Paper 4 key question 2.2).
import { concept, P, source, levels } from "../lib.mjs";
import { mc, chrono } from "../tables/w4b-util.mjs";

concept("ahist.stalin.governance", { file: "stalin/governance", keyPrefix: "stalin.governance" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Whose murder on 1 December 1934 was used by Stalin to start the Terror?",
    ok: ["Sergei Kirov, the Leningrad party chief", "Correct: Kirov was shot at his office."],
    no: [
      ["Nikolai Bukharin, the editor of Pravda", "Bukharin was tried and shot in 1938."],
      ["Leon Trotsky, the exiled former Commissar for War", "Trotsky was killed in Mexico in 1940."],
      ["Genrikh Yagoda, the head of the NKVD in Moscow", "Yagoda was tried in 1938 and was not murdered in 1934."],
    ],
    explanation: "Kirov was shot by Leonid Nikolaev. Stalin used the murder to justify emergency decrees and the hunt for 'conspirators'.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "Who headed the NKVD during the worst years of the Terror, 1937-38?",
    ok: ["Nikolai Yezhov, the People's Commissar of Internal Affairs", "Correct: the period is called the Yezhovshchina."],
    no: [
      ["Lavrenty Beria, who replaced him in the second half of 1938", "Beria took over after the worst years."],
      ["Felix Dzerzhinsky, the first head of the Cheka after 1917", "Dzerzhinsky died in 1926."],
      ["Vyacheslav Molotov, the Soviet foreign minister from 1939", "Molotov was a politician and not head of the NKVD."],
    ],
    explanation: "Yezhov led the NKVD from 1936 to 1938. Beria replaced him, and Yezhov was later shot.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "What was the main purpose of the show trials of 1936-38?",
    ok: ["To convince the public that old Bolsheviks were traitors", "Correct: the confessions blamed enemies for the regime's problems."],
    no: [
      ["To give accused men a fair hearing before independent judges", "The outcomes were decided in advance."],
      ["To judge foreign spies captured on the frontier with Germany", "The defendants were Soviet communists and officials."],
      ["To decide who among the leaders should succeed Stalin as head of state", "They were not about succession."],
    ],
    explanation: "The trials, held in public with confessions, presented Stalin's former rivals as agents of Trotsky and foreign powers and blamed them for failures and for 'wrecking'.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What happened to the Red Army's leadership in 1937-38?",
    ok: ["Tukhachevsky and other senior officers were shot, and many more removed", "Correct: the officer corps was badly damaged."],
    no: [
      ["The army was reformed under Marshal Tukhachevsky into a smaller and stronger force", "Tukhachevsky was shot in June 1937."],
      ["The generals took control of the NKVD in 1937 and ended the Terror at once", "The NKVD remained under Stalin's control."],
      ["The army was left alone by the Terror because it was loyal to Stalin throughout", "It suffered heavily."],
    ],
    hints: ["Think of Tukhachevsky."],
    explanation: "In June 1937 Tukhachevsky and seven others were shot after a secret trial. Historians estimate that some 30,000 to 35,000 officers were removed, though some were later reinstated.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which view of the causes of the Terror stresses pressure from below, as well as Stalin's wishes?",
    ok: ["Local officials and quotas pushed the campaign further than planned", "Correct: some historians stress these pressures."],
    no: [
      ["Stalin planned and controlled each arrest in person from Moscow", "This stresses central control only."],
      ["Foreign powers organised the Terror through spies inside the Politburo", "No evidence supports this."],
      ["The Terror was a response to a peasants' revolt that began in 1936", "No such revolt began in 1936."],
    ],
    hints: ["Think of Getty and the idea of a campaign driven by local officials."],
    explanation: "Historians such as J. Arch Getty stressed local pressures, quotas and fear of wreckers, in contrast to those who saw the Terror as planned from the top by Stalin.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the 1936 Constitution's real purpose?",
    ok: ["To show the USSR as a democratic model while the party kept power", "Correct: it was largely propaganda."],
    no: [
      ["To end the party's leading role and allow free parties to compete", "It confirmed the party's leading role."],
      ["To restore the Duma and give the Tsar's family a role in government", "The monarchy was not restored."],
      ["To allow the republics of the USSR to leave the Union if they wished", "It was not a route to secession in practice."],
    ],
    hints: ["Think of what it promised and what actually happened at the time."],
    explanation: "It promised universal suffrage, secret ballots and rights, but with one party and one candidate and the Terror at its height, its value was in propaganda at home and abroad.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which fact best supports the view that Stalin's foreign policy in the 1930s moved from collective security to a deal with Germany?",
    ok: ["It joined the League in 1934 and signed the Pact with Germany in 1939", "Correct: the change shows the failure of the first policy."],
    no: [
      ["The Soviet Union sent arms and advisers to the Republic in Spain", "This shows opposition to fascism."],
      ["The Soviet Union signed pacts with France and Czechoslovakia in 1935", "This shows collective security, not the change."],
      ["The Comintern adopted the Popular Front policy in the summer of 1935", "This too shows anti-fascist policy."],
    ],
    hints: ["Which fact shows both stages?"],
    explanation: "The USSR joined the League of Nations in 1934 and sought alliances against fascism. After Munich and failed talks with Britain and France, it signed the Pact with Germany on 23 August 1939.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which statement about the Nazi-Soviet Pact is best supported by the evidence?",
    ok: ["It gained territory and time for Stalin, but weakened his position in 1941", "Correct: the benefits were short-term."],
    no: [
      ["It brought a lasting alliance with Germany against Britain and France", "Germany attacked in 1941."],
      ["It prevented Hitler from invading Poland in the autumn of 1939", "Germany invaded Poland on 1 September 1939."],
      ["It was supported by the Western powers, which signed it with the USSR", "Britain and France were not parties."],
    ],
    hints: ["Think of the territory gained and of June 1941."],
    explanation: "The Pact gave the USSR eastern Poland, the Baltic states and some time to prepare. But it encouraged Hitler to attack Poland, and left Stalin unprepared for Barbarossa.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Nazi-Soviet Pact was signed on 23 August 1939.",
    answer: true,
    explanation: "True. It included a secret protocol dividing Poland and the Baltic states into spheres of interest.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The 1936 Constitution ended the Communist Party's leading role in the Soviet state.",
    answer: false,
    explanation: "False. It confirmed the party as the leading force in society, with only one candidate for each seat.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Historians have proved that Stalin ordered the murder of Kirov.",
    answer: false,
    hints: ["Think about the state of the evidence."],
    explanation: "False. There is no proof, and the evidence is disputed. What is clear is that Stalin used the murder to launch repression.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with his role in the 1930s.",
    pairs: [
      ["Nikolai Yezhov", "Head of the NKVD in the Terror of 1937-38"],
      ["Mikhail Tukhachevsky", "Marshal shot after a secret trial in June 1937"],
      ["Lavrenty Beria", "NKVD chief who replaced Yezhov"],
      ["Nikolai Bukharin", "Former leader tried in March 1938 and shot"],
    ],
    explanation: "Yezhov (1936-38), Tukhachevsky (June 1937), Beria (from late 1938) and Bukharin (March 1938).",
  });
  chrono(b, [
    "Kirov is murdered",
    "The new Soviet Constitution is issued",
    "Marshal Tukhachevsky is shot",
    "The Nazi-Soviet Pact is signed",
  ], {
    d: 3, skill: "UNDERSTANDING",
    hints: ["They run from 1934 to 1939."],
    explanation: "1 December 1934; 5 December 1936; June 1937; 23 August 1939.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Soviet system of forced-labour camps was known as the {{blank:a}}, and the secret police of the 1930s was the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Gulag"], choices: ["Gulag", "Kolkhoz", "Komsomol", "Gosplan"] },
      { id: "b", accepted: ["NKVD"], choices: ["NKVD", "Okhrana", "Duma", "Sovnarkom"] },
    ],
    explanation: "The Gulag was the camp system; the NKVD was the secret police (the earlier Okhrana belonged to the Tsarist regime).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name was given to the Terror of 1937-38 after the head of the NKVD?",
    accepted: ["Yezhovshchina", "the Yezhovshchina", "Ezhovshchina"],
    wrong: ["Zhdanovshchina"],
    explanation: "The **Yezhovshchina**, after Nikolai Yezhov.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how the cult of personality presented Stalin.",
    points: ["He was given titles such as Vozhd (leader), Great Teacher and Father of the Peoples", "Statues, portraits, films, songs and poems praised him", "Cities and factories were named after him", "He was shown as Lenin's partner in the Short Course history, with his victims removed from the story"],
    modelAnswer: "He was given titles such as Vozhd, Great Teacher and Father of the Peoples. Statues, portraits, films, songs and poems praised him, and cities and factories were named after him. The Short Course history of 1938 showed him as Lenin's partner and removed his victims from the story.",
    explanation: "One mark for each accurate point.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Stalin made a pact with Germany in August 1939.",
    points: [["Britain and France had failed to bring him into a firm alliance, and the Munich Agreement had excluded the USSR, so he distrusted them", 2], ["The Pact gave him time to rebuild the army and territory in eastern Poland and the Baltic states", 2]],
    hints: ["Think of Munich and what the Pact gained."],
    modelAnswer: "Britain and France had failed to make a firm alliance with the USSR, and the Munich Agreement had excluded it, so Stalin distrusted them. The Pact gave him time to rebuild the army and territory in eastern Poland and the Baltic states.",
    explanation: "Credit explained reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the Terror affected the Soviet Union.",
    points: [["Hundreds of thousands were shot and millions imprisoned or sent to the gulag, creating fear and obedience throughout society", 2], ["The loss of army officers, managers and experts weakened the armed forces and the economy, and left Stalin's power unchallenged", 2]],
    hints: ["Think of the human cost and the effect on the army and the economy."],
    modelAnswer: "Hundreds of thousands were shot and millions were imprisoned or sent to the gulag, which created fear and obedience throughout society. The loss of army officers, managers and experts weakened the armed forces and the economy, but it left Stalin's power unchallenged.",
    explanation: "Credit developed effects.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a poster of the kind issued in the Soviet Union in 1937, described in words",
        "A broad-shouldered Stalin in a plain tunic stands on a hill and looks into the distance, with smiling factory workers and children with flowers around him. Above them in large letters: \"Thank you, Comrade Stalin, for our happy life.\" The sun rises behind him.", { described: true }),
      "",
      source("Source B", "a private letter from a fictional teacher in a small Soviet town to her sister, 1938",
        "Three of our neighbours have been taken in the night, and no one speaks of them. At school we read the newspaper and repeat what the comrades say about the wreckers. I tell my pupils to love their leader, and I look at the door when I speak. We write and speak carefully now."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What image of Stalin does Source A present?", points: ["A strong, calm leader who looks to the future", "A kindly leader to whom workers and children owe their happy lives"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about life in the Soviet Union in the late 1930s.", points: [["Agree: both show the public praise of the leader (the poster and the teacher telling pupils to love their leader)", 2], ["Differ: A shows a happy and secure society; B shows fear, arrests in the night and careful speech", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying how Stalin governed the Soviet Union in the 1930s?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is useful as evidence of the cult of personality and of the message that the state wanted people to believe, but as propaganda it does not show real conditions", 2], ["B is useful as private evidence of fear and the effects of the Terror, but it is a single letter by a teacher in a small town and may not be typical", 2], ["Own knowledge: the cult, the Yezhovshchina and the arrests by the NKVD support both; together they show the public image and the private reality", 2]], modelAnswer: "Source A is useful because it shows the cult of personality and the message that the state wanted people to believe, but as propaganda it does not show real conditions. Source B is useful because as a private letter it shows fear and the effect of the Terror on ordinary life, but it comes from one teacher in a small town and may not be typical. My knowledge of the cult and the Yezhovshchina supports both. Together they show the contrast between the public image and the private reality of Stalin's rule." }),
    ],
    hints: ["For (c), consider the purpose of a poster and of a private letter."],
    explanation: "Both sources are invented: a described poster and a teacher's letter.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the reasons why Stalin launched the Terror of 1936-38.",
    levels: levels(8),
    points: [
      ["Removal of rivals and potential opposition: the old Bolsheviks, the army leaders and anyone who might challenge him", 2],
      ["Fear of war and a 'fifth column' as Germany and Japan became threats, and the Spanish Civil War", 2],
      ["Scapegoats for economic failures and pressures from below (quotas, local officials, fear of wreckers)", 2],
      ["A supported judgement on the relative importance of the causes", 2],
    ],
    hints: ["Compare the views that stress Stalin's own wishes with those that stress other pressures."],
    modelAnswer: "Stalin launched the Terror partly to remove possible rivals, from old Bolsheviks to army leaders, so that his power would be unchallenged. He was also afraid of war, with Germany and Japan hostile, and wished to remove a possible 'fifth column'. The failures of the economy needed scapegoats, and local officials and quotas pushed the campaign beyond his plans. Historians disagree over the weight of each. I judge that Stalin's wish for total control was the main cause, but the fear of war and the pressures from below explain the scale and speed.",
    explanation: "Credit explained reasons and a judgement.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 250, max: 500 },
    stem: "'Stalin governed the Soviet Union effectively in the 1930s.' How far do you agree?",
    levels: levels(12),
    points: [
      ["Effective: total control, no opposition, the party and army obedient, and industrial growth under the plans", 3],
      ["Ineffective: the Terror killed or removed experts and officers, damaging the army and the economy, and the fear stifled initiative", 3],
      ["Foreign policy: collective security failed, and the Nazi-Soviet Pact left the USSR exposed in 1941", 3],
      ["A supported judgement that depends on the criterion, effective in holding power but costly and flawed in results", 3],
    ],
    hints: ["Decide what 'effectively' means before you judge."],
    modelAnswer: "The answer depends on what is meant by effective. If it means keeping power, Stalin governed very effectively: by 1938 there was no opposition, the party, the army and the NKVD obeyed him, and the economy had been transformed by the Five Year Plans. If it means achieving the state's goals at a reasonable cost, the record is much weaker. The Terror removed experienced officers, managers and scientists, damaged the army, which performed badly against Finland, and spread fear that stifled initiative. In foreign policy collective security failed, and the Nazi-Soviet Pact bought time but left the USSR unprepared for the invasion of 1941. I conclude that Stalin governed effectively in controlling the state, but not in using it wisely, and the costs were very great.",
    explanation: "Credit a definition of effectiveness, both sides and a supported judgement.",
  });

  b.card("DEFINITION", "What was a show trial?", "A public trial staged to prove the guilt of the accused, with confessions to impossible crimes, as in the trials of 1936-38.");
  b.card("DEFINITION", "What was the Gulag?", "The Soviet system of forced-labour camps and colonies run by the secret police.");
  b.card("FACT", "When was Kirov murdered and why does it matter?", "1 December 1934; Stalin used it to begin the Terror.");
  b.card("FACT", "What happened to Marshal Tukhachevsky?", "He and seven other senior officers were tried in secret and shot in June 1937.");
  b.card("FACT", "What did the 1936 Constitution promise?", "Universal suffrage by secret ballot and basic rights, while confirming the Communist Party's leading role; it was largely propaganda.");
  b.card("FACT", "What was the Nazi-Soviet Pact?", "The agreement of 23 August 1939 between Germany and the USSR with a secret protocol dividing Poland and the Baltic states.");
  b.card("CONCEPT", "Why did Stalin launch the Terror?", "Historians point to his wish to remove rivals, fear of war and a 'fifth column', scapegoats for failures and pressures from below.");
  b.card("CONCEPT", "What was the cult of personality?", "Propaganda that presented Stalin as an all-wise leader ('Vozhd', Great Teacher), with statues, films and renamed places.");
  b.card("CONCEPT", "Why did Stalin sign the Nazi-Soviet Pact?", "Collective security had failed (Munich), the USSR wanted time and territory, and it distrusted the West.");
});
