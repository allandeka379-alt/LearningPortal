// Slice W3a: Solidarity and the collapse of Soviet control, 1980-1991 (0470 B6).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.soviet-control.solidarity-gorbachev", { file: "soviet-control/solidarity-gorbachev", keyPrefix: "soviet-control.solidarity-gorbachev" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who led the strikes at the Lenin Shipyard in Gdańsk in 1980?",
    options: [
      ["Lech Wałęsa", "Correct: he became Solidarity's leader."],
      ["Wojciech Jaruzelski", "Jaruzelski was the general who imposed martial law."],
      ["Václav Havel", "Havel was a Czechoslovak dissident, President from December 1989."],
      ["Imre Nagy", "Nagy led Hungary in 1956."],
    ],
    answer: "A",
    explanation: "**Lech Wałęsa**, an electrician, led the Gdańsk strikes of August 1980.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "When did Gorbachev become leader of the Soviet Union?",
    options: [
      ["1985", "Correct: in March 1985."],
      ["1979", "1979 was the Soviet invasion of Afghanistan."],
      ["1968", "1968 was the invasion of Czechoslovakia under Brezhnev."],
      ["1991", "1991 was the year the USSR was dissolved."],
    ],
    answer: "A",
    explanation: "**Gorbachev** became General Secretary in March **1985**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did the Polish government accept in the Gdańsk Agreement of August 1980?",
    options: [
      ["The right to form free trade unions and to strike", "Correct: Solidarity was then formed."],
      ["Free elections to all seats in parliament", "Partly free elections came only in 1989."],
      ["Poland's withdrawal from the Warsaw Pact", "Poland stayed in the Pact."],
      ["The end of the Communist Party's role in government", "The party kept power until 1989."],
    ],
    answer: "A",
    explanation: "The **Gdańsk Agreement** recognised free trade unions and the right to strike.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What was meant by 'glasnost'?",
    options: [
      ["Openness and more freedom of speech", "Correct: one of Gorbachev's two key policies."],
      ["Restructuring the Soviet economy", "That was perestroika."],
      ["The right to intervene in other communist states", "That was the Brezhnev Doctrine."],
      ["Withdrawing Soviet troops from Afghanistan", "This happened, but it is not what glasnost means."],
    ],
    answer: "A",
    explanation: "**Glasnost** meant openness; **perestroika** meant restructuring.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Who declared martial law in Poland in December 1981?",
    options: [
      ["General Jaruzelski", "Correct: Solidarity was banned and its leaders detained."],
      ["Lech Wałęsa", "Wałęsa was detained under martial law."],
      ["Pope John Paul II", "The Pope supported the Polish people, not martial law."],
      ["Leonid Brezhnev", "Brezhnev led the USSR; the Polish leader declared martial law."],
    ],
    answer: "A",
    explanation: "**Jaruzelski** declared martial law on 13 December 1981.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why was the election of a Polish Pope in 1978 important for Solidarity?",
    options: [
      ["It strengthened the Church as a source of national identity", "Correct: his 1979 visit drew huge crowds."],
      ["The Pope ordered the Polish government to resign from office at once", "The Pope had no such power."],
      ["It brought Poland into NATO", "Poland joined NATO only in 1999."],
      ["The Pope became leader of Solidarity", "Wałęsa led Solidarity."],
    ],
    answer: "A",
    hints: ["Think about the Church's place in Polish life."],
    explanation: "**John Paul II's** visit in 1979 gave Poles confidence and showed an identity outside the party.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the 'Sinatra Doctrine'?",
    options: [
      ["Each Eastern European state could go its own way", "Correct: a joke replacing the Brezhnev Doctrine."],
      ["The USSR would intervene wherever communism was threatened", "That was the Brezhnev Doctrine."],
      ["The USA would contain communism everywhere", "That was containment."],
      ["The USSR would build a wall around Berlin", "The Wall was built in 1961."],
    ],
    answer: "A",
    hints: ["Think of the song 'My Way'."],
    explanation: "In 1989 a Soviet spokesman said each country could now go its own way: the **Sinatra Doctrine**.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which piece of evidence most strongly suggests that Gorbachev was decisive in the collapse of Soviet control?",
    options: [
      ["He did not send troops when Poland elected Solidarity", "Correct: in 1956 and 1968 the USSR had used force."],
      ["The East German economy was stagnating", "This is a long-term cause, not about Gorbachev."],
      ["Solidarity had about ten million members", "This shows popular pressure rather than Gorbachev's role."],
      ["Reagan increased American defence spending in the early 1980s", "This points to pressure from the USA."],
    ],
    answer: "A",
    hints: ["Compare 1989 with 1956 and 1968."],
    explanation: "Gorbachev's **refusal to use force** removed the threat that had crushed earlier reform movements.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Lech Wałęsa was awarded the Nobel Peace Prize in 1983.",
    answer: true,
    explanation: "True, while Solidarity was banned and operating underground.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Gorbachev's aim was to end communism in the Soviet Union.",
    answer: false,
    explanation: "False. He wanted to reform and save communism; the collapse went far beyond his intentions.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role.",
    pairs: [
      ["Tadeusz Mazowiecki", "First non-communist Polish Prime Minister, 1989"],
      ["Václav Havel", "Dissident playwright who became President of Czechoslovakia"],
      ["Nicolae Ceaușescu", "Romanian dictator overthrown and executed in 1989"],
      ["Ronald Reagan", "US President who backed space-based missile defence"],
    ],
    explanation: "Mazowiecki (Poland), Havel (Czechoslovakia), Ceaușescu (Romania), Reagan (USA, Strategic Defence Initiative).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The Berlin Wall is opened",
      "Martial law is declared in Poland",
      "The USSR is dissolved",
      "Gorbachev becomes Soviet leader",
    ],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["Martial law came before Gorbachev took office."],
    explanation: "Martial law (December 1981); Gorbachev (March 1985); Wall opened (November 1989); USSR dissolved (December 1991).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Gorbachev's policy of restructuring the economy was called {{blank:a}}. In September 1989 East Germans could cross freely into Austria through {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["perestroika"], choices: ["perestroika", "glasnost", "détente", "collectivisation"] },
      { id: "b", accepted: ["Hungary"], choices: ["Hungary", "Poland", "Romania", "Bulgaria"] },
    ],
    explanation: "**Perestroika** (restructuring); **Hungary** opened its border with Austria.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Polish city where the shipyard strikes of August 1980 began.",
    accepted: ["Gdansk", "Gdańsk", "Danzig"],
    wrong: ["Warsaw"],
    explanation: "**Gdańsk**, at the Lenin Shipyard.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the problems facing the Soviet Union when Gorbachev came to power in 1985.",
    points: [
      "A stagnating economy falling behind the West in technology and living standards.",
      "The cost of the arms race, made worse by Reagan's Strategic Defence Initiative.",
      "The costly and unwinnable war in Afghanistan (from 1979).",
      "The cost of supporting Eastern Europe / discontent in the satellites.",
    ],
    modelAnswer: "The Soviet economy was stagnating and falling behind the West in technology and living standards. Military spending took a large share of national wealth, and Reagan's plans for space-based missile defence threatened a costly new arms race. The war in Afghanistan, begun in 1979, was costing lives and money and could not be won, and the USSR was also paying to support the struggling economies of Eastern Europe.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why Solidarity was a threat to the Polish communist government.",
    points: [
      "Identifies its size (about ten million members).",
      "Explains that a workers' movement outside the party challenged the party's claim to represent the workers.",
      "Identifies its independence / links with the Church.",
      "Explains that it offered an alternative source of loyalty and could organise national strikes, and the USSR feared it would spread.",
    ],
    hints: ["Whom did the Communist Party claim to represent?"],
    modelAnswer: "Solidarity had about ten million members, roughly a third of the working-age population, and it was a movement of workers outside the Communist Party, which undermined the party's claim to rule on behalf of the workers. It was independent and closely linked with the Catholic Church, so it offered an alternative focus of loyalty and could paralyse the country with strikes; the USSR feared that its example would spread to other satellites.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why communist rule collapsed in Eastern Europe in 1989.",
    points: [
      "Identifies Gorbachev's refusal to use force / abandonment of the Brezhnev Doctrine.",
      "Explains that without the threat of Soviet tanks, governments could not suppress protest as in 1956 and 1968.",
      "Identifies economic failure and debt.",
      "Explains that falling living standards undermined support, and Western television showed a richer life.",
      "Identifies popular movements (Solidarity, Leipzig demonstrations, Velvet Revolution).",
      "Explains that Poland's example in June 1989 showed change was possible, and protest spread from country to country.",
    ],
    hints: ["Moscow, the economy and the people."],
    modelAnswer: "The most immediate reason was Gorbachev's refusal to use force: once the Brezhnev Doctrine was abandoned, communist governments could no longer rely on Soviet tanks, as they had in 1956 and 1968. Underlying this was economic failure: the satellites were in debt, living standards were falling, and Western television showed people a richer life, so few people supported the regimes. Finally, popular movements took the chance: Solidarity's victory in the Polish elections of June 1989 showed that change was possible, and mass protests spread to Leipzig, Berlin and Prague, bringing down one government after another.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "the memoir of a fictional Polish shipyard worker, published in 1995", "When we struck at the shipyard, we did not ask for the moon. We asked for a union of our own, a monument to the workers shot ten years before, and the truth on the radio. When they gave us the union, ten million people joined. After that, martial law could lock us up, but it could not make us forget.")}\n\n${source("Source B", "a cartoon of the kind published in Western European newspapers in November 1989, described in words", "A row of statues of communist leaders is toppling like dominoes, from one labelled \"Warsaw\" to one labelled \"Prague\". At the side, a smiling man with a birthmark on his forehead stands with his hands in his pockets, whistling, and does nothing to stop them.", { described: true })}`,
    hints: ["Each source gives the credit for change to different people."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about the importance of Solidarity?", points: [
        "It had mass support (ten million members).",
        "Repression could not destroy it / it kept people's hopes alive.",
      ], explanation: "Two supported inferences." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B agree about the reasons for the collapse of communist rule?", points: [
        "A credits ordinary people / Solidarity.",
        "B credits Gorbachev's decision not to intervene.",
        "Both show that communist rule lacked support and that repression failed.",
        "Judgement: they differ on who deserves the main credit.",
      ], explanation: "Specific comparison with judgement." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How useful are these sources for explaining the collapse of Soviet control in Eastern Europe? Use your own knowledge.", points: [
        "A: a participant's view, written after the events with hindsight and pride; useful on motives and the scale of support.",
        "A covers only Poland.",
        "B: shows the domino effect and Gorbachev's passive role, but a cartoon simplifies.",
        "Own knowledge: Poland's 1989 elections, Hungary's border, the Wall, the Velvet Revolution; Gorbachev's refusal to use force.",
        "Own knowledge: both omit economic failure and Western pressure.",
        "Supported judgement on usefulness.",
      ], levels: levels(6), modelAnswer: "Source A is useful because it is the view of a participant, showing why Polish workers joined Solidarity and how martial law failed to crush it. But it was written in 1995, with hindsight and pride, and it covers only Poland. Source B is useful because it shows the domino effect of 1989, with regimes falling from Warsaw to Prague, and Gorbachev standing by. My own knowledge supports this: after Solidarity's victory in June 1989, Hungary opened its border, the Wall was opened in November and the Velvet Revolution followed, while Gorbachev refused to use force. However, a cartoon simplifies, and neither source mentions economic failure, debt or pressure from the West. Together the sources are useful for showing the roles of people power and Gorbachev, but they need own knowledge to give a full explanation.", explanation: "Use content, provenance and own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), set Gorbachev against at least two other factors."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe how communist rule ended in Poland.", points: [
        "New strikes in 1988 forced the government to negotiate.",
        "Round Table talks between government and Solidarity (February-April 1989).",
        "Partly free elections in June 1989; Solidarity won almost every seat it could contest.",
        "Mazowiecki became the first non-communist Prime Minister (August 1989); Gorbachev did not intervene.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "How far was Gorbachev personally responsible for the collapse of Soviet control over Eastern Europe?", points: [
        ["Gorbachev: refusal to use force; abandonment of the Brezhnev Doctrine", 2],
        ["Gorbachev: glasnost and perestroika encouraged criticism and reform movements", 2],
        ["Other: long-term economic failure, debt, Afghanistan, arms race", 2],
        ["Other: popular movements (Solidarity, Leipzig, Velvet Revolution); the Church", 2],
        ["Other: Western pressure (Reagan) and Western media", 2],
        ["Supported judgement on 'personally responsible'", 2],
      ], levels: levels(12), modelAnswer: "Gorbachev played a decisive part. In 1956 and 1968 the USSR had crushed reform by force, but Gorbachev made clear that he would not do so: he accepted Solidarity's victory in Poland in 1989 and kept Soviet troops in their barracks in East Germany. His policies of glasnost and perestroika also encouraged people in the satellites to demand similar reforms.\n\nHowever, he did not create the problems. The Soviet and Eastern European economies had been stagnating for years, the satellites were in debt, and the war in Afghanistan and the arms race, pushed further by Reagan's plans for missile defence, drained resources. These pressures were why Gorbachev needed reform in the first place. The collapse was also the work of the people of Eastern Europe: Solidarity had survived martial law, and in 1989 the crowds in Leipzig, Berlin and Prague forced their governments out.\n\nGorbachev was personally responsible for the timing and peaceful character of the collapse, because a different leader might have used force. But the long-term causes were economic failure and the lack of popular support, so he was a necessary trigger rather than the sole cause.", explanation: "Levels: several factors weighed and a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("DEFINITION", "Solidarity", "Independent Polish trade union founded in 1980 and led by Lech Wałęsa.");
  b.card("FACT", "When was martial law declared in Poland?", "13 December 1981, by General Jaruzelski.");
  b.card("DEFINITION", "Perestroika", "'Restructuring': Gorbachev's reform of the Soviet economy.");
  b.card("DEFINITION", "Glasnost", "'Openness': Gorbachev's policy of greater freedom of speech.");
  b.card("FACT", "When were the partly free elections in Poland?", "June 1989; Solidarity won almost every seat it could contest.");
  b.card("FACT", "When was the USSR dissolved?", "December 1991.");
  b.card("CONCEPT", "Why did the Pope's election help Solidarity?", "It strengthened the Church as a source of Polish identity; his 1979 visit gave people confidence.");
  b.card("CONCEPT", "Why was Gorbachev's attitude to force decisive in 1989?", "Without Soviet tanks, governments could not crush protest as in 1956 and 1968.");
  b.card("CONCEPT", "What problems did Gorbachev inherit?", "Economic stagnation, the arms race, the Afghanistan war and the cost of Eastern Europe.");
});
