// Slice W2b: manifestations and impact of the Cold War, overview (ZIMSEC 12.6).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.cold-war.manifestations-impact", { file: "cold-war/manifestations-impact", keyPrefix: "cold-war.manifestations-impact" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which year was NATO formed?",
    options: [
      ["1949", "Correct: in April 1949."],
      ["1945", "1945 was the end of the Second World War and the founding of the UN."],
      ["1955", "1955 was the year the Warsaw Pact was formed."],
      ["1961", "1961 was the year the Berlin Wall was built."],
    ],
    answer: "A",
    explanation: "**NATO** was founded in April 1949; the Warsaw Pact followed in 1955.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who was the first person to travel into space?",
    options: [
      ["Yuri Gagarin", "Correct: a Soviet cosmonaut, on 12 April 1961."],
      ["Neil Armstrong", "Armstrong was the first person to walk on the Moon, in 1969."],
      ["Laika", "Laika was a dog sent into orbit by the USSR in 1957, not a person."],
      ["John Glenn", "Glenn was the first American to orbit the Earth, in 1962."],
    ],
    answer: "A",
    explanation: "**Yuri Gagarin** orbited the Earth on 12 April 1961.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is a proxy war?",
    options: [
      ["Superpowers back opposing sides in a local war", "Correct: as in Korea, Vietnam and Angola."],
      ["A war fought only with nuclear weapons", "No nuclear weapons were used in Cold War conflicts."],
      ["A war between two superpowers on their own soil", "The superpowers avoided fighting each other directly."],
      ["A war declared by the United Nations", "The UN does not declare wars."],
    ],
    answer: "A",
    explanation: "In a **proxy war** the superpowers supply money, weapons or advisers to opposing sides instead of fighting each other.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which liberation army fighting in Rhodesia was supplied mainly by the Soviet Union?",
    options: [
      ["ZIPRA", "Correct: the army of ZAPU."],
      ["ZANLA", "ZANLA, the army of ZANU, was supported mainly by China."],
      ["UNITA", "UNITA was an Angolan movement."],
      ["FRELIMO", "FRELIMO was the Mozambican liberation movement."],
    ],
    answer: "A",
    explanation: "**ZIPRA** (ZAPU) was supplied mainly by the USSR; ZANLA (ZANU) mainly by China.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why was the launch of Sputnik in 1957 alarming for the USA?",
    options: [
      ["Its rocket could also carry a nuclear warhead", "Correct: and that Soviet science was ahead."],
      ["It meant the USSR had landed on the Moon", "The Moon landing was American, in 1969."],
      ["It ended the American monopoly of the atomic bomb", "The USSR had tested an atomic bomb in 1949."],
      ["It was used to attack an American city", "Sputnik was a satellite, not a weapon."],
    ],
    answer: "A",
    explanation: "A rocket that could put a satellite into orbit could also deliver a nuclear warhead to the USA.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the UN Security Council often fail to act during the Cold War?",
    options: [
      ["Either superpower could use its veto", "Correct: each was a permanent member."],
      ["Neither superpower was a member of the UN", "Both were founding members and permanent members of the Council."],
      ["The UN had no headquarters until 1991", "The UN has been based in New York since its early years."],
      ["African states controlled the Security Council", "The five permanent members were the USA, USSR, Britain, France and China."],
    ],
    answer: "A",
    hints: ["What power do the permanent members have?"],
    explanation: "Each permanent member has a **veto**, so whenever the superpowers disagreed the Council was paralysed.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which agreement linked the withdrawal of Cuban troops from Angola to independence for Namibia?",
    options: [
      ["The agreements of December 1988", "Correct: Namibia became independent in 1990."],
      ["The Lancaster House Agreement of 1979", "Lancaster House settled Zimbabwe's independence."],
      ["The Helsinki Accords of 1975", "Helsinki dealt with European security and human rights."],
      ["The Partial Test Ban Treaty of 1963", "This limited nuclear tests."],
    ],
    answer: "A",
    hints: ["The settlement came as Cold War tension eased in the late 1980s."],
    explanation: "Agreements signed in New York in **December 1988** linked Cuban withdrawal from Angola to Namibian independence (1990).",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement best explains why the Cold War stayed 'cold' between the superpowers?",
    options: [
      ["Nuclear war would have destroyed both sides", "Correct: mutually assured destruction."],
      ["The two superpowers shared a common economic system", "They had opposed systems: capitalism and communism."],
      ["The United Nations had an army to stop them fighting", "The UN has no permanent army of its own."],
      ["Neither side had allies willing to fight", "Both had large alliances (NATO, Warsaw Pact)."],
    ],
    answer: "A",
    hints: ["Think about deterrence."],
    explanation: "With **mutually assured destruction**, a direct war would have destroyed both sides, so they competed by other means.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Berlin Wall was opened on 9 November 1989.",
    answer: true,
    explanation: "True. The opening of the Wall symbolised the end of the Cold War division of Europe.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The Non-Aligned Movement was a military alliance led by the USSR.",
    answer: false,
    explanation: "False. The Non-Aligned Movement (1961) was formed by states, many newly independent, that refused to join either bloc.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each example with the manifestation of the Cold War it illustrates.",
    pairs: [
      ["The Warsaw Pact", "Rival alliances"],
      ["Sputnik", "Space race"],
      ["The Korean War", "Proxy war"],
      ["Boycott of the 1980 Moscow Olympics", "Propaganda and prestige"],
    ],
    explanation: "Alliances, the space race, proxy wars and propaganda were all ways the superpowers competed.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The Cuban Missile Crisis",
      "The Soviet invasion of Afghanistan",
      "The first Soviet atomic test",
      "The launch of Sputnik",
    ],
    right: POS,
    rightIndex: [2, 3, 0, 1],
    hints: ["The USSR tested its first atomic bomb before the Korean War."],
    explanation: "Soviet atomic test 1949; Sputnik 1957; Cuban Missile Crisis 1962; Afghanistan 1979.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The easing of tension between the superpowers in the 1970s was called {{blank:a}}. Gorbachev's policy of openness was called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["détente"], choices: ["détente", "containment", "appeasement", "deterrence"] },
      { id: "b", accepted: ["glasnost"], choices: ["glasnost", "perestroika", "collectivisation", "Lebensraum"] },
    ],
    explanation: "**Détente** (1970s); **glasnost** (openness), alongside perestroika (restructuring).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Soviet leader whose reforms from 1985 helped to end the Cold War.",
    accepted: ["Gorbachev", "Mikhail Gorbachev", "Gorbachov"],
    wrong: ["Khrushchev"],
    explanation: "**Mikhail Gorbachev** led the USSR from 1985 to 1991.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 5,
    stem: "State **five** ways in which the Cold War showed itself.",
    points: [
      "Rival alliances (NATO, Warsaw Pact).",
      "The arms race (nuclear weapons, missiles).",
      "The space race (Sputnik, Moon landing).",
      "Propaganda / espionage / Olympic boycotts.",
      "Crises (Berlin, Cuba) / proxy wars (Korea, Vietnam, Angola).",
    ],
    modelAnswer: "Rival alliances such as NATO and the Warsaw Pact; the nuclear arms race; the space race; propaganda and spying; and crises and proxy wars such as Berlin, Cuba, Korea and Angola.",
    explanation: "One mark per manifestation.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain how the Cold War affected Africa.",
    points: [
      "Identifies support for rival liberation movements.",
      "Explains with an example: ZIPRA (USSR) and ZANLA (China) / MPLA and UNITA, so movements could fight longer.",
      "Identifies prolonged wars (Angola).",
      "Explains that outside weapons and troops (Cuba, South Africa) kept wars going and caused great loss of life.",
      "Identifies support for friendly dictators / anti-communist minority regimes.",
      "Explains: Mobutu backed by the USA; Rhodesia and South Africa sought Western sympathy by claiming to fight communism.",
    ],
    hints: ["Think about liberation movements, wars and governments."],
    modelAnswer: "The superpowers and China armed rival African movements: in Zimbabwe ZIPRA was supplied mainly by the USSR and ZANLA mainly by China, which helped the armed struggle. In Angola, Soviet weapons and Cuban troops supported the MPLA while UNITA was backed by South Africa and, at times, the USA, so the war dragged on with huge loss of life. The superpowers also backed rulers who were on their side whatever their record, such as Mobutu in Zaire, and the white minority governments of Rhodesia and South Africa claimed to be fighting communism to win Western sympathy.",
    explanation: "Two marks per developed point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** reasons why the Cold War came to an end between 1985 and 1991.",
    points: [
      "Identifies Gorbachev's reforms (glasnost, perestroika).",
      "Explains that openness weakened communist control and encouraged demands for change in the USSR and eastern Europe.",
      "Identifies economic weakness / the cost of the arms race and Afghanistan.",
      "Explains that the USSR could no longer afford to compete, so it made arms agreements and let eastern Europe go.",
    ],
    hints: ["Think about Soviet reforms and Soviet money."],
    modelAnswer: "First, Gorbachev's reforms of glasnost and perestroika loosened communist control, and he refused to use force to keep eastern Europe communist, so governments there collapsed in 1989. Second, the Soviet economy was weak and could not afford the arms race and the war in Afghanistan, so Gorbachev signed arms agreements such as the INF Treaty and withdrew from Afghanistan.",
    explanation: "Two marks per explained reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a poster of the kind produced in the USSR in the 1960s, described in words", "A Soviet rocket climbs into a starry sky above a smiling worker and a peasant woman holding a sheaf of wheat. Below, small grey factories marked with dollar signs pour out black smoke. The slogan reads: \"Socialism opens the road to the stars\".", { described: true })}\n\n${source("Source B", "a pamphlet published by a fictional American civil defence committee, 1961", "Learn the warning siren. Store two weeks of food and water in your basement. The Soviet threat is real: their missiles can reach our cities in minutes. Freedom has enemies, and free people must be ready.")}`,
    hints: ["Think about who produced each source and for whom."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Identify **one** manifestation of the Cold War shown in each source.", points: [
        "Source A: the space race / propaganda.",
        "Source B: the arms race / fear of nuclear attack / propaganda.",
      ], explanation: "One per source." }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain the purpose of Source A.", points: [
        "To show socialism as superior to capitalism.",
        "Detail: the rocket rising over workers vs smoky capitalist factories.",
        "To build pride in Soviet space achievements (Sputnik, Gagarin).",
        "Aimed at Soviet citizens / the wider world to win support.",
      ], explanation: "Purpose plus detail and context." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How far do these sources show that fear was the most important feature of the Cold War? Use the sources and your own knowledge.", points: [
        "Source B shows fear: nuclear attack, civil defence.",
        "Own knowledge: arms race, Cuban Missile Crisis, MAD.",
        "Source A shows pride and competition rather than fear.",
        "Own knowledge: other features (alliances, proxy wars, space race, propaganda).",
        "Provenance: both are propaganda; B meant to alarm, A to inspire.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source B shows that fear was important: Americans were told to learn the siren and store food because Soviet missiles could reach their cities in minutes. My knowledge supports this, as the arms race and crises such as Cuba in 1962 made nuclear war a real danger. However, Source A shows a different feature, competition and pride: the Soviet poster celebrates success in the space race and claims socialism is superior. My own knowledge adds other features, such as rival alliances and proxy wars in Korea, Vietnam and Angola. Both sources are propaganda, one designed to alarm and one to inspire. Overall the sources show that fear was a major feature, but competition for prestige and influence was just as important.", explanation: "Use both sources and own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), weigh harm against any benefits."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the arms race between the USA and the USSR.", points: [
        "USA used atomic bombs in 1945; USSR tested its own in 1949.",
        "Both developed hydrogen bombs in the early 1950s.",
        "ICBMs / missiles able to reach the other's cities (Sputnik showed rocket power).",
        "Huge stockpiles / MAD; later arms control (Test Ban 1963, SALT I 1972).",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "\"The Cold War did more harm than good to Africa.\" How far do you agree?", points: [
        ["Harm: prolonged wars (Angola, Ogaden, Congo), with great loss of life.", 2],
        ["Harm: support for dictators (Mobutu); spread of weapons; debt.", 2],
        ["Harm: white minority regimes used anti-communism to win Western sympathy.", 2],
        ["Good: liberation movements received weapons, training and scholarships (ZIPRA, ZANLA, MPLA).", 2],
        ["Good: competition for influence brought aid; the end of the Cold War helped Namibian independence and the end of apartheid.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "The Cold War did serious harm to Africa. Local conflicts became international: in Angola, Soviet weapons and Cuban troops on one side and South African and American support on the other kept a civil war going for years, and the Congo crisis and the Ogaden War also drew in the superpowers. Both sides backed friendly dictators, such as Mobutu in Zaire, whatever their record, and weapons spread across the continent. The white minority governments of Rhodesia and South Africa presented themselves as defenders against communism to win Western sympathy.\n\nOn the other hand, liberation movements benefited. ZIPRA was armed and trained mainly by the USSR and ZANLA mainly by China, and many Africans received scholarships in eastern Europe. Competition for influence brought aid, and when the Cold War ended, agreements in 1988 led to Namibia's independence in 1990 and encouraged negotiations to end apartheid.\n\nOverall I largely agree: outside support helped some liberation struggles, but the Cold War prolonged wars, propped up dictators and cost many lives, so the harm outweighed the good. African movements, however, were not mere puppets; they used Cold War rivalries for their own aims.", explanation: "Both sides and a supported judgement." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("DEFINITION", "Cold War", "Hostility between the USA and the USSR and their allies (late 1940s-1991) without direct full-scale war between them.");
  b.card("DEFINITION", "Proxy war", "A war in which the superpowers back opposing local sides instead of fighting each other.");
  b.card("FACT", "When were NATO and the Warsaw Pact formed?", "NATO 1949; Warsaw Pact 1955.");
  b.card("FACT", "What was Sputnik?", "The first artificial satellite, launched by the USSR on 4 October 1957.");
  b.card("DEFINITION", "Mutually assured destruction (MAD)", "Deterrence: a nuclear war would destroy both sides, so neither dares to start one.");
  b.card("FACT", "Which powers mainly supplied ZIPRA and ZANLA?", "ZIPRA (ZAPU): mainly the USSR. ZANLA (ZANU): mainly China.");
  b.card("FACT", "Name four proxy wars of the Cold War.", "Korea (1950-53), Vietnam, Angola (from 1975), Afghanistan (1979-89).");
  b.card("DEFINITION", "Détente", "The easing of superpower tension in the 1970s (e.g. SALT I, 1972).");
  b.card("FACT", "When did the Cold War end?", "The Berlin Wall opened on 9 November 1989; the USSR dissolved in December 1991.");
  b.card("CONCEPT", "Give three effects of the Cold War on Africa.", "Rival movements armed, wars prolonged (Angola), dictators supported (Mobutu); its end helped Namibian independence.");
});
