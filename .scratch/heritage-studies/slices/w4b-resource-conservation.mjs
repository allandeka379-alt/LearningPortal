// W4b: Conservation and preservation of resources (her.production.resource-conservation).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.production.resource-conservation", { file: "production/resource-conservation", keyPrefix: "production.resource-conservation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which institution manages national parks and wildlife in Zimbabwe?",
    options: [
      ["the Zimbabwe Parks and Wildlife Management Authority", "Correct: ZimParks manages parks and wildlife."],
      ["the Forestry Commission", "The Forestry Commission manages forests."],
      ["National Museums and Monuments of Zimbabwe", "NMMZ protects monuments and museum collections."],
      ["the Zimbabwe Electoral Commission", "ZEC runs elections."],
    ],
    answer: "A",
    explanation: "ZimParks manages national parks and wildlife under the Parks and Wild Life Act.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which institution protects national monuments such as Great Zimbabwe and Khami?",
    options: [
      ["National Museums and Monuments of Zimbabwe", "Correct: NMMZ protects monuments and museums."],
      ["the Environmental Management Agency", "EMA protects the environment generally."],
      ["the Grain Marketing Board", "The GMB buys and stores grain."],
      ["the Zimbabwe National Water Authority", "ZINWA manages water."],
    ],
    answer: "A",
    explanation: "NMMZ protects and restores monuments and runs the national museums.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the main purpose of an Environmental Impact Assessment (EIA)?",
    options: [
      ["to identify a project's likely environmental effects before work begins", "Correct: it plans how to limit damage in advance."],
      ["to count the tourists visiting a park and decide how much each should pay", "This is tourism data, not an EIA."],
      ["to decide who wins an election", "Elections are not assessed this way."],
      ["to fine people for littering in towns", "Fines are enforcement, not assessment."],
    ],
    answer: "A",
    explanation: "An EIA is done before projects such as mines and dams to identify and reduce environmental damage.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which pair correctly shows the difference between conservation and preservation?",
    options: [
      ["conservation: careful use; preservation: protection from use or change", "Correct: conservation allows sustainable use."],
      ["conservation: no use at all; preservation: unlimited use", "This reverses and distorts both meanings."],
      ["conservation applies only to monuments, and preservation applies only to wildlife", "Both apply to natural and cultural resources."],
      ["they mean exactly the same thing", "They are related but different."],
    ],
    answer: "A",
    explanation: "Conservation means sustainable use; preservation means keeping a resource unchanged.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which body regulates the cutting of timber and promotes tree planting?",
    options: [
      ["the Forestry Commission", "Correct: it manages forests under the Forest Act."],
      ["the Registrar General", "The Registrar General issues identity documents."],
      ["the Master of the High Court", "The Master deals with deceased estates."],
      ["the Zimbabwe Human Rights Commission", "This commission protects human rights."],
    ],
    answer: "A",
    explanation: "The Forestry Commission manages state forests, regulates timber cutting and promotes tree planting.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Under a CAMPFIRE scheme, a community near a park receives part of the income from wildlife. Why does this help conservation?",
    options: [
      ["People protect wildlife that brings them benefits", "Correct: a share of income gives a reason to stop poaching."],
      ["It allows the community to hunt without any limits", "Hunting under CAMPFIRE is regulated."],
      ["It moves all wildlife out of the area", "Wildlife stays; benefits are shared."],
      ["It removes the need for any rangers", "Rangers and councils still manage wildlife."],
    ],
    answer: "A",
    hints: ["Why would villagers now report poachers?"],
    explanation: "When communities benefit from wildlife, they have a reason to protect it.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A company wants to open a quarry next to a hill with ancient rock paintings. Which **two** institutions are most directly concerned?",
    options: [
      ["EMA and National Museums and Monuments", "Correct: EMA for the environment, NMMZ for the cultural site."],
      ["ZimParks and the Grain Marketing Board", "The GMB is not involved, and the site is not a park."],
      ["the Forestry Commission and the Zimbabwe Electoral Commission", "ZEC is not involved."],
      ["ZINWA and the Registrar General", "Neither is concerned with rock art or quarrying here."],
    ],
    answer: "A",
    hints: ["One body for environmental damage, one for heritage."],
    explanation: "EMA requires an impact assessment for the quarry; NMMZ protects the rock paintings.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which is the **strongest** weakness of indigenous methods of conservation today?",
    options: [
      ["Beliefs that support them are weakened by urbanisation and migration", "Correct: fewer people know or respect the taboos."],
      ["They cost the government far more money to run than modern methods do", "Indigenous methods are cheap."],
      ["They have never protected any resources", "They protected sacred forests, pools and animals."],
      ["They are enforced only by the courts", "They are enforced by chiefs, elders and the community."],
    ],
    answer: "A",
    hints: ["What do taboos depend on to work?"],
    explanation: "Indigenous methods depend on shared beliefs, which weaken as people move to towns and values change.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Monuments, rock art and museum artefacts are examples of cultural resources.",
    answer: true,
    explanation: "True. Cultural resources are made or given meaning by people and carry history and identity.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Conservation laws work well even when they are not enforced.",
    answer: false,
    explanation: "False. Laws work only when offenders are caught and punished and people know the rules.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each institution with its main function.",
    pairs: [
      ["EMA", "approves environmental impact assessments and fines polluters"],
      ["ZimParks", "runs anti-poaching patrols in national parks"],
      ["Forestry Commission", "regulates timber cutting and promotes woodlots"],
      ["NMMZ", "restores monuments and runs museums"],
    ],
    explanation: "Each institution has a different area of responsibility.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "EMA was set up under the {{blank:a}} Act. ZimParks works under the Parks and {{blank:b}} Act.",
    blanks: [
      { id: "a", accepted: ["Environmental Management"], choices: ["Environmental Management", "Forest", "Labour", "Children's"] },
      { id: "b", accepted: ["Wild Life"], choices: ["Wild Life", "Monuments", "Water", "Mines"] },
    ],
    explanation: "EMA: the Environmental Management Act. ZimParks: the Parks and Wild Life Act.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Identify **four** contemporary methods of conserving or preserving resources in Zimbabwe.",
    points: [
      "Any one of: protected areas (parks, reserves, monuments), laws/permits/licences, EIAs, anti-poaching patrols, afforestation/woodlots, soil and water conservation, CAMPFIRE, recycling, restoration of sites, museums, education",
      "A second different method",
      "A third different method",
      "A fourth different method",
    ],
    modelAnswer: "National parks, anti-poaching patrols, environmental impact assessments and afforestation.",
    explanation: "One mark per correct method.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain **three** challenges in enforcing conservation laws in Zimbabwe.",
    points: [
      "Identifies too few officers/rangers/vehicles",
      "Develops: large areas cannot be patrolled, so many offences go undetected",
      "Identifies poverty",
      "Develops: people cut trees, hunt or pan for gold to survive despite the law",
      "Identifies low fines / corruption / organised crime / lack of awareness",
      "Develops: e.g. profits are higher than fines, so offenders keep breaking the law",
    ],
    modelAnswer: "There are too few rangers and inspectors, so large areas cannot be patrolled and many offences go unnoticed. Poverty pushes people to cut trees, hunt or pan for gold to survive, whatever the law says. Fines are sometimes lower than the profit from illegal activity, so offenders simply pay and continue.",
    hints: ["Think of capacity, causes and penalties."],
    explanation: "One mark for each challenge and one for its development.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Visitors to a fictional national monument have been writing their names on ancient walls. Suggest **two** ways the site managers could preserve the walls, and explain how each would help.",
    points: [
      "Suggests guided tours / controlled access / barriers to sensitive areas",
      "Explains that visitors are supervised and cannot reach the walls",
      "Suggests notices and education about heritage / fines under the law / repairing and recording damage",
      "Explains how it changes behaviour or restores the site",
    ],
    modelAnswer: "The managers could allow visitors into sensitive areas only on guided tours, so guides can stop people touching the walls. They could also put up clear notices explaining why the walls are national heritage and that damaging them is an offence, so visitors understand and respect the site.",
    hints: ["Control access and change behaviour."],
    explanation: "One mark for each suitable way and one for its explanation.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true,
    stem: source("Source A", "an extract from a fictional ward newsletter, Matabeleland North, 2026",
      "In our ward, elephants and buffalo move between the park and the villages. Ten years ago, few people cared when poachers set snares. Since the CAMPFIRE income began paying for a borehole and school desks, villagers have reported every snare they find. Rangers say poaching in the ward has fallen. Some families complain, however, that elephants still destroy their maize and that the money is shared too slowly.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "According to the source, what changed the villagers' attitude to poaching?",
        options: [
          ["wildlife income paid for things the community needed", "Correct: the borehole and desks were paid from CAMPFIRE income."],
          ["the elephants left the ward completely", "The elephants still move through the ward."],
          ["new laws allowed villagers to set snares on their own land", "Snares remain illegal."],
          ["the rangers left the area", "Rangers are still active."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** complaints that some families still have.",
        points: ["Elephants still destroy their maize", "The money is shared too slowly"],
        modelAnswer: "Elephants still destroy their maize, and the income is shared too slowly.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain whether the source shows CAMPFIRE to be a success.",
        points: [
          "Success: villagers report snares, poaching has fallen, community projects funded",
          "Limits: crop damage continues; benefits slow/uneven, which may weaken support",
          "Judgement: largely successful but needs faster sharing and protection of crops",
        ],
        modelAnswer: "The source suggests CAMPFIRE has been largely successful: income paid for a borehole and desks, villagers now report snares and poaching has fallen. But families still lose maize to elephants and complain that money comes slowly, which could weaken their support. It works, but it needs faster sharing of benefits and help to protect crops.",
      }),
    ],
    hints: ["In (c), weigh the successes against the complaints."],
    explanation: "A source-based practice item evaluating community-based conservation.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "This question is about methods of conserving resources.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** roles of the Environmental Management Agency (EMA).",
        points: [
          "Role 1, e.g. approves environmental impact assessments",
          "Described: before mines, dams or buildings start, to limit damage",
          "Role 2, e.g. licenses and inspects polluters / fines offenders / awareness campaigns",
          "Described",
        ],
        modelAnswer: "EMA requires and approves environmental impact assessments, so that projects such as mines and dams plan how to limit damage before they start. It also inspects activities that pollute or damage the land, and fines or prosecutes offenders, for example people who start veld fires or cultivate stream banks.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "\"Contemporary methods of conservation are more effective than indigenous methods.\" Discuss.",
        points: [
          ["Strengths of contemporary methods: national coverage, science, institutions (EMA, ZimParks, Forestry Commission, NMMZ), courts, deal with large-scale threats", 3],
          ["Weaknesses of contemporary methods: cost, few officers, weak enforcement, resentment when communities are excluded", 3],
          ["Indigenous methods: strengths (respect, cheap, community-enforced, sacred places) and weaknesses (beliefs weakening, cannot handle industry or trade)", 3],
          ["Supported judgement (e.g. most effective when combined)", 3],
        ],
        levels: levels(12),
        modelAnswer: "Contemporary methods have clear strengths. Institutions such as EMA, ZimParks, the Forestry Commission and National Museums and Monuments cover the whole country, use scientific knowledge and can take offenders to court. They can deal with large threats that indigenous rules never faced, such as mining companies, factories and international ivory trafficking.\n\nBut contemporary methods also have weaknesses. They are expensive, there are too few rangers and inspectors, fines can be low and corruption sometimes lets offenders escape. When parks and rules are imposed without consulting local people, communities may resent them and even help poachers.\n\nIndigenous methods worked through respect for ancestors, totems, taboos and sacred forests and pools, enforced by chiefs, spirit mediums and the community. They were cheap and widely obeyed because they were part of identity. Today they are weakened by urbanisation, migration and changing beliefs, and they cannot control industry or trade.\n\nI agree only in part. Contemporary methods are more effective against large-scale threats, but they work best when they draw on indigenous respect for resources and involve communities, as CAMPFIRE and cooperation with traditional leaders show.",
      }),
    ],
    hints: ["In (b), consider which threats each approach can handle."],
    explanation: "A practice evaluative item comparing contemporary and indigenous conservation.",
  });

  b.card("DEFINITION", "Conservation", "The careful, sustainable use and management of resources so they remain available.");
  b.card("DEFINITION", "Preservation", "Protecting a resource from use or change so it stays as it is.");
  b.card("DEFINITION", "Cultural resources", "Things made or given meaning by people that carry history and identity: monuments, rock art, shrines, artefacts.");
  b.card("DEFINITION", "Environmental Impact Assessment (EIA)", "A study of a project's likely environmental effects, required before work begins.");
  b.card("FACT", "Which institution protects monuments and runs museums?", "National Museums and Monuments of Zimbabwe (NMMZ).");
  b.card("FACT", "Under which Act does ZimParks work?", "The Parks and Wild Life Act.");
  b.card("CONCEPT", "What is CAMPFIRE and why does it help conservation?", "A community-based scheme (from 1989) sharing wildlife income with rural communities, giving them a reason to protect wildlife.");
  b.card("CONCEPT", "Give three challenges in enforcing conservation laws.", "Too few officers, poverty, low fines (also corruption, organised crime, lack of awareness).");
  b.card("CONCEPT", "Compare one strength of indigenous and of contemporary conservation.", "Indigenous: respected locally and cheap. Contemporary: national coverage, science and courts.");
});
