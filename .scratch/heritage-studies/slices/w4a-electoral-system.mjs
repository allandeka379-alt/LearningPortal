// W4a: The electoral system of Zimbabwe (her.constitution.electoral-system).
// Reviewer note: facts from the BRIEF reference list (voting age 18; harmonised elections every five years; more than
// half of the votes or a run-off; 210 constituency seats plus women's PR seats; ZEC in Chapter 12; Chapter 7
// elections). Harmonised elections first held in 2008. No party names or results.
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.constitution.electoral-system", { file: "constitution/electoral-system", keyPrefix: "constitution.electoral-system" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "At what age may a citizen of Zimbabwe vote?",
    options: [
      ["18", "Correct: citizens aged 18 and over may register and vote."],
      ["16", "Sixteen is too young to vote in Zimbabwe."],
      ["21", "The age of majority and voting is 18, not 21."],
      ["25", "This is not the voting age."],
    ],
    answer: "A",
    explanation: "Citizens aged 18 or over who are registered may vote.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which body registers voters and runs elections in Zimbabwe?",
    options: [
      ["the Zimbabwe Electoral Commission", "Correct: ZEC runs elections and referendums."],
      ["the Zimbabwe Human Rights Commission", "This commission promotes and protects human rights."],
      ["the Constitutional Court", "Courts settle disputes; they do not run elections."],
      ["the Zimbabwe Media Commission", "This commission regulates the media."],
    ],
    answer: "A",
    explanation: "ZEC, set up under Chapter 12, registers voters, draws boundaries, runs elections and announces results.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What happens if no presidential candidate wins more than half of the votes cast?",
    options: [
      ["A run-off is held between the two leading candidates", "Correct: a second round decides the winner."],
      ["The candidate with the most votes becomes President anyway", "More than half is required."],
      ["Parliament chooses the President from all the candidates", "Voters, not Parliament, elect the President."],
      ["The election is cancelled and held again after five years", "A run-off is held instead."],
    ],
    answer: "A",
    explanation: "The winner must get more than half of the votes cast; otherwise a run-off is held.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is a **by-election**?",
    options: [
      ["an election to fill one seat that falls vacant between general elections", "Correct: it fills a single vacancy."],
      ["a vote by the whole nation to accept or reject a draft constitution", "That is a referendum."],
      ["the election of party leaders by party members at a congress", "That is an internal party election."],
      ["an election held only in cities", "By-elections can happen anywhere a seat falls vacant."],
    ],
    answer: "A",
    explanation: "A by-election fills a vacant constituency or ward seat between general elections.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which method is used to fill the seats **reserved for women** in the National Assembly?",
    options: [
      ["proportional representation from party lists", "Correct: seats are shared according to each party's votes."],
      ["first-past-the-post in each constituency", "This method is used for the 210 constituency seats."],
      ["appointment by the President after the election", "These seats are filled from party lists, not by appointment."],
      ["a run-off between the two leading candidates", "Run-offs apply to the presidential election."],
    ],
    answer: "A",
    hints: ["The seats are shared out according to each party's share of the vote."],
    explanation: "Women's reserved seats are filled by proportional representation from party lists.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Chipo, aged 19, moved from Gwanda to Bulawayo but did not change her registration. Where should she vote in the next general election?",
    options: [
      ["at a polling station in the ward where she is registered", "Correct: voters vote where they are registered."],
      ["at any polling station in the country she chooses", "Voters must vote where they are registered."],
      ["only at the ZEC head office in Harare", "Voting takes place at local polling stations."],
      ["nowhere, because voters must be 21", "The voting age is 18."],
    ],
    answer: "A",
    hints: ["Which voters' roll is her name on?"],
    explanation: "People vote in the ward where they are registered, so Chipo should update her registration if she wants to vote in Bulawayo.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which feature of an election **most directly** protects voters from being pressured over how they voted?",
    options: [
      ["the secret ballot", "Correct: no one can know how a person voted."],
      ["the delimitation of constituency boundaries", "This shares out voters between areas; it does not hide votes."],
      ["the nomination of candidates", "This decides who stands, not secrecy."],
      ["the announcement of results", "Results come after voting; they do not protect individual choices."],
    ],
    answer: "A",
    hints: ["What stops other people knowing your choice?"],
    explanation: "Because the ballot is secret, no one can find out a person's vote, so threats and bribes lose their force.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which piece of evidence would **best** support the claim that an election was fair?",
    options: [
      ["All candidates had equal access to the media and counting was watched by their agents", "Correct: equal conditions and transparent counting show fairness."],
      ["Many voters turned up at the polling stations early in the morning and waited patiently in long queues", "High turnout shows interest, not fairness."],
      ["The results were announced on the radio at midnight", "Announcement alone does not show fairness."],
      ["The polling stations were painted and decorated", "This says nothing about fairness."],
    ],
    answer: "A",
    hints: ["Fairness is about equal conditions and a trustworthy count."],
    explanation: "Fair elections give candidates equal conditions and a transparent count that can be checked.",
  });
  b.tf({
    d: 2, skill: "RECALL",
    stem: "In harmonised elections, the President, Members of Parliament and councillors are elected at the same time.",
    answer: true,
    explanation: "True. Harmonised elections combine presidential, parliamentary and local authority elections every five years.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a referendum, voters choose a Member of Parliament for their constituency.",
    answer: false,
    explanation: "False. A referendum asks voters to accept or reject a single proposal; MPs are chosen in elections.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [
      ["delimitation", "drawing the boundaries of constituencies and wards"],
      ["voters' roll", "the list of people registered to vote"],
      ["run-off", "a second vote between the two leading presidential candidates"],
      ["ward", "an area that elects a councillor"],
    ],
    explanation: "These terms describe the stages and units of the electoral system.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the facts about the electoral system.",
    template: "Harmonised elections are held every {{blank:a}} years. The National Assembly has {{blank:b}} constituency seats. Chapter {{blank:c}} of the Constitution deals with elections.",
    blanks: [
      { id: "a", accepted: ["five"], choices: ["five", "four", "six", "seven"] },
      { id: "b", accepted: ["210"], choices: ["210", "100", "60", "80"] },
      { id: "c", accepted: ["7"], choices: ["7", "4", "8", "16"] },
    ],
    explanation: "Elections every five years; 210 constituency seats; Chapter 7 covers elections.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the comparison of electoral methods.",
    template: "In {{blank:a}}, the candidate with the most votes in an area wins. In {{blank:b}}, parties win seats according to their share of the vote.",
    blanks: [
      { id: "a", accepted: ["first-past-the-post"], choices: ["first-past-the-post", "proportional representation", "a referendum", "a run-off"] },
      { id: "b", accepted: ["proportional representation"], choices: ["proportional representation", "first-past-the-post", "a by-election", "delimitation"] },
    ],
    hints: ["One method elects people for areas; the other shares seats among parties."],
    explanation: "Constituency seats use first-past-the-post; reserved seats use proportional representation.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Give the abbreviation of the commission that runs elections in Zimbabwe.",
    accepted: ["ZEC", "Z.E.C."],
    wrong: ["ZHRC"],
    explanation: "ZEC is the Zimbabwe Electoral Commission.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** functions of the Zimbabwe Electoral Commission.",
    points: [
      "Any one of: registering voters / keeping the voters' roll; delimiting constituencies and wards; running elections and referendums; voter education; accrediting observers; counting and announcing results",
      "A second different function",
      "A third different function",
    ],
    modelAnswer: "ZEC registers voters, runs elections and referendums, and announces the results.",
    explanation: "One mark per correct function.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** features of a free and fair election.",
    points: [
      "Identifies a feature (e.g. secret ballot)",
      "Explains it (e.g. no one knows how a person voted, so voters are not pressured)",
      "Identifies a second feature (e.g. independent electoral commission / freedom to campaign / no intimidation / observers / transparent counting)",
      "Explains it (e.g. rules applied equally to all candidates, so the result reflects the votes)",
    ],
    modelAnswer: "A free and fair election has a secret ballot, so no one can know how a person voted and voters cannot be pressured. It is also run by an independent commission that applies the rules equally to all candidates, so the result reflects the way people really voted.",
    hints: ["For each feature, say why it matters."],
    explanation: "One mark for each feature and one for its explanation.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Few young people in a Bindura ward registered to vote before the last election. Suggest **two** ways to increase youth registration, and explain each.",
    points: [
      "Suggests voter education in schools, colleges, churches and on social media",
      "Explains that young people learn why voting matters and how to register",
      "Suggests mobile registration centres at colleges, youth centres or markets / simple information on documents needed",
      "Explains that it makes registration easier and closer, so more young people register",
    ],
    modelAnswer: "ZEC and community groups could run voter education in schools, colleges, churches and on social media, so young people learn why their vote matters and how to register. Mobile registration centres could also be set up at colleges and markets, so registering becomes quick and close to where young people already are.",
    hints: ["Think about knowledge and convenience."],
    explanation: "One mark for each suggestion and one for its explanation.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: "The table shows the results of an invented survey of 200 first-time voters in a fictional ward (invented for this question).\n\n" +
      table(["Reason given for not registering", "Number of young people"], [
        ["Did not have a national identity document", 70],
        ["Did not know where to register", 60],
        ["Thought one vote makes no difference", 40],
        ["Was away at college during registration", 30],
      ]) + "\n\nStudy the table and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which reason was given most often?",
        options: [
          ["no national identity document", "Correct: 70 of the 200 gave this reason."],
          ["did not know where to register", "This was given by 60."],
          ["thought one vote makes no difference", "This was given by 40."],
          ["away at college", "This was given by 30."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Which **two** reasons could be reduced by better voter education? Give the reasons.",
        points: [
          "Did not know where to register",
          "Thought one vote makes no difference",
        ],
        modelAnswer: "Not knowing where to register, and thinking one vote makes no difference.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Suggest how the problem of missing identity documents could be solved, and explain why this would help.",
        points: [
          "Suggests mobile registry teams / outreach by the Registrar General to issue IDs in the ward or at schools",
          "Explains that a national identity document is needed to register",
          "Explains that more young people would then be eligible to register and vote",
        ],
        modelAnswer: "The Registrar General could send mobile teams to schools and the ward centre to issue national identity documents. A national ID is needed to register, so more young people would then be able to register and vote.",
      }),
    ],
    hints: ["In (b), which reasons are about knowledge or attitude?"],
    explanation: "A data-based practice item on barriers to voter registration.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about elections in Zimbabwe.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe the steps a registered voter follows on polling day.",
        points: [
          "Goes to the polling station where he or she is registered and joins the queue",
          "Officials check the voter's identity and name on the voters' roll",
          "Receives ballot papers and marks them in secret behind a screen",
          "Places the ballots in the sealed ballot boxes (and leaves the station)",
        ],
        modelAnswer: "The voter goes to the polling station where she is registered and joins the queue. Officials check her identity document and find her name on the voters' roll. She receives the ballot papers and marks them in secret behind a screen. She then folds them and places them in the sealed ballot boxes.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Proportional representation is a better electoral method than first-past-the-post.\" How far do you agree?",
        points: [
          ["For PR: seats match each party's share of the vote; helps increase the number of women and minorities", 2],
          ["For first-past-the-post: each area has its own representative accountable to local voters; simple to understand and count", 2],
          ["Weaknesses of each: PR members chosen by party lists may be less accountable to voters; FPTP can give a party many more seats than its vote share / wasted votes", 2],
          ["Supported judgement (e.g. a mixed system, as Zimbabwe uses, combines the strengths)", 2],
        ],
        levels: levels(8),
        modelAnswer: "Proportional representation gives parties seats according to their share of the vote, so Parliament reflects the whole electorate. Zimbabwe uses it for the seats reserved for women, which has increased the number of women in Parliament.\n\nFirst-past-the-post also has strengths. Each constituency elects its own MP, who is accountable to local voters, and the method is simple to understand and count. On the other hand, a party can win many more seats than its share of the vote, and votes for losing candidates count for nothing. Members elected from party lists may feel more accountable to their party than to voters.\n\nI only partly agree. Each method has strengths, and a mixed system like Zimbabwe's combines local representation with a fairer share of seats and more women.",
      }),
    ],
    hints: ["In (b), give a strength and a weakness of each method."],
    explanation: "A practice evaluative item on electoral methods.",
  });

  b.card("DEFINITION", "Electoral system", "The rules and institutions that decide who may vote, how votes are cast and counted, and how they become seats or offices.");
  b.card("DEFINITION", "By-election", "An election to fill one seat that has fallen vacant between general elections.");
  b.card("DEFINITION", "Proportional representation", "A method in which parties win seats according to their share of the vote, from party lists.");
  b.card("DEFINITION", "Delimitation", "Drawing the boundaries of constituencies and wards (done by ZEC).");
  b.card("FACT", "What must a presidential candidate win to be elected?", "More than half of the votes cast; otherwise a run-off is held.");
  b.card("FACT", "How many constituency seats does the National Assembly have?", "210 (plus seats reserved for women elected by proportional representation).");
  b.card("FACT", "How often are harmonised elections held?", "Every five years.");
  b.card("CONCEPT", "Why is the secret ballot important?", "No one can know how a person voted, so voters cannot be threatened or bribed into a choice.");
  b.card("CONCEPT", "Name four features of free and fair elections.", "Secret ballot; independent electoral commission; freedom to campaign without violence or intimidation; transparent counting watched by agents and observers.");
});
