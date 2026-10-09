// W4a: Indigenous conservation and management of resources (her.production.indigenous-conservation).
// Reviewer note: beliefs described respectfully and descriptively; examples of taboos are general ones widely
// reported (fruit trees, pregnant animals, sacred springs). Totem terms mutupo / isibongo as in the totems lesson.
// Contemporary institutions belong to her.production.resource-conservation.
import { concept, P, source, levels } from "../lib.mjs";

concept("her.production.indigenous-conservation", { file: "production/indigenous-conservation", keyPrefix: "production.indigenous-conservation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **taboo**?",
    options: [
      ["a strong rule forbidding certain actions, often backed by belief", "Correct: e.g. not cutting trees near a sacred spring."],
      ["a modern law passed by Parliament", "Taboos come from custom and belief, not Parliament."],
      ["an animal that a clan identifies with", "That is a totem."],
      ["a government agency that protects the environment and fines people who pollute rivers", "That would be an institution such as EMA."],
    ],
    answer: "A",
    explanation: "A taboo (in Shona, zviera) forbids certain actions; breaking it was believed to bring misfortune.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How did **totems** help to conserve wildlife?",
    options: [
      ["Clan members did not kill or eat their totem animal", "Correct: each clan protected its own species."],
      ["Totems were used to mark the boundaries of national parks", "National parks are a modern institution."],
      ["Totem animals were hunted only by chiefs", "Clan members did not hunt their totem."],
      ["Totems told farmers when to plant", "Seasonal signs came from observation, not totems."],
    ],
    answer: "A",
    explanation: "Because members of each clan respected their totem, different species were protected by different clans.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which practice protected **soil fertility** in indigenous farming?",
    options: [
      ["resting fields for several years (fallowing)", "Correct: rested land recovers its fertility."],
      ["killing pregnant animals", "This was forbidden, and it is about wildlife, not soil."],
      ["drawing water from sacred springs with dirty or sooty pots", "This was forbidden at sacred springs."],
      ["burning sacred forests", "Sacred forests were protected."],
    ],
    answer: "A",
    explanation: "Shifting cultivation and fallowing let soil recover before it was farmed again.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why were indigenous conservation rules **effective** in the past?",
    options: [
      ["People respected the ancestors and leaders, and populations were small", "Correct: belief, authority and low pressure on land."],
      ["Offenders were tried in the Constitutional Court", "Offenders were fined by chiefs' courts."],
      ["Government rangers patrolled every village and arrested anyone who broke the rules", "This describes modern enforcement."],
      ["There were no natural resources to protect", "There were many resources."],
    ],
    answer: "A",
    hints: ["Think about belief, leadership and numbers of people."],
    explanation: "Strong beliefs, respected chiefs and spirit mediums, small populations and community ownership made the rules work.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Tafadzwa clears a new field but leaves the muhacha and baobab trees standing, as his grandfather taught him. Which indigenous practice is he following?",
    options: [
      ["protection of fruit and shade trees", "Correct: these trees were left when fields were cleared."],
      ["a seasonal restriction on fishing", "This concerns fish, not trees."],
      ["respecting his clan totem", "Totems are usually animals, not field trees."],
      ["fallowing his field", "Fallowing means resting land, not keeping trees."],
    ],
    answer: "A",
    hints: ["What did he leave standing?"],
    explanation: "Fruit and shade trees such as the muhacha and baobab were traditionally protected when land was cleared.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which is the **main** reason some taboos are less effective today?",
    options: [
      ["Fewer people share the beliefs on which the taboos depend", "Correct: a belief-based rule works only if people hold the belief."],
      ["Wild animals have learnt to ignore taboos", "Taboos govern people, not animals."],
      ["There are more trees today than in the past", "Deforestation has reduced trees in many areas."],
      ["Chiefs and headmen no longer exist anywhere in Zimbabwe today", "Traditional leaders are recognised in the Constitution."],
    ],
    answer: "A",
    hints: ["What gave a taboo its power?"],
    explanation: "Changes in religion, urbanisation and migration mean that some people no longer fear breaking taboos.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which piece of evidence **best** supports the view that indigenous conservation still works in some places?",
    options: [
      ["Sacred forests and springs are often better preserved than land around them", "Correct: the rules still protect those sites."],
      ["Deforestation for firewood continues in many communal areas", "This is evidence of weakness."],
      ["Gold panning has damaged many riverbeds", "This is evidence of weakness."],
      ["Many young people move to towns", "This weakens rather than supports indigenous rules."],
    ],
    answer: "A",
    hints: ["Look for evidence of success, not failure."],
    explanation: "Where sacred sites remain respected, their forests and water sources are often well preserved.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does **IKS** stand for?",
    options: [
      ["indigenous knowledge systems", "Correct: knowledge built by communities over generations."],
      ["international knowledge standards", "This is not what IKS means."],
      ["indigenous kraal settlements", "This is not what IKS means."],
      ["integrated kapenta schemes", "This is not what IKS means."],
    ],
    answer: "A",
    explanation: "Indigenous knowledge systems are the knowledge and practices local communities developed by observing their environment.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In many communities, people were forbidden to cut trees or hunt in sacred forests.",
    answer: true,
    explanation: "True. Sacred forests, hills and pools were set aside for the ancestral spirits and protected.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Indigenous conservation rules were enforced by the Environmental Management Agency.",
    answer: false,
    explanation: "False. Indigenous rules were enforced by chiefs, headmen, spirit mediums and the community; EMA is a modern institution.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each indigenous method with the resource it mainly protected.",
    pairs: [
      ["totems", "particular animal species"],
      ["sacred springs", "water"],
      ["fallowing", "soil fertility"],
      ["leaving fruit trees in fields", "trees and wild foods"],
    ],
    explanation: "Each method protected particular resources.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "In Shona, prohibitions such as taboos are often called {{blank:a}}. A clan totem is called mutupo in Shona and {{blank:b}} in Ndebele.",
    blanks: [
      { id: "a", accepted: ["zviera"], choices: ["zviera", "mukwerera", "nhimbe", "roora"] },
      { id: "b", accepted: ["isibongo"], choices: ["isibongo", "ilima", "amadlozi", "idobi"] },
    ],
    explanation: "Zviera are prohibitions; mutupo / isibongo is the totem.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the explanation.",
    template: "Rules were enforced by the chief and headman, who could {{blank:a}} offenders at the chief's court. They worked best when the {{blank:b}} was small and land was plentiful.",
    blanks: [
      { id: "a", accepted: ["fine"], choices: ["fine", "elect", "employ", "register"] },
      { id: "b", accepted: ["population"], choices: ["population", "rainfall", "forest", "river"] },
    ],
    hints: ["Think about punishment, and about pressure on land."],
    explanation: "Chiefs fined offenders, and small populations put little pressure on resources.",
  });
  b.short({
    d: 3, skill: "RECALL",
    stem: "Give the term for resting a field for several years so that the soil can recover.",
    accepted: ["fallowing", "fallow", "leaving fallow", "leaving it fallow"],
    wrong: ["irrigation"],
    hints: ["The field is left unused."],
    explanation: "Fallowing rests the land so that its fertility recovers.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** indigenous methods of conserving natural resources.",
    points: [
      "Any one of: taboos; totems; sacred places and forests; rules of chiefs and headmen; seasonal restrictions on hunting, fishing or gathering; protecting fruit and shade trees; protecting wetlands and springs; fallowing",
      "A second different method",
      "A third different method",
    ],
    modelAnswer: "Taboos, totems and sacred forests.",
    explanation: "One mark per correct method.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how **two** indigenous methods helped to conserve natural resources.",
    points: [
      "Names a method (e.g. sacred places)",
      "Describes how it worked (no cutting, hunting or farming there; forests and springs protected)",
      "Names a second method (e.g. seasonal restrictions / totems / taboos)",
      "Describes how it worked (no hunting or fishing in breeding seasons, so animals could reproduce)",
    ],
    modelAnswer: "Sacred places such as forests and springs were set aside for ancestral spirits, so no one could cut trees, hunt or farm there, which protected the trees and the water. Seasonal restrictions stopped hunting and fishing in breeding seasons, so animals and fish could reproduce and their numbers recovered.",
    hints: ["For each method, say what was forbidden and what was protected."],
    explanation: "One mark for each method and one for describing how it conserved resources.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways indigenous knowledge could be combined with modern methods to protect a wetland in a rural ward, and explain each.",
    points: [
      "Suggests the chief and headmen work with EMA / the council to agree and enforce rules (no ploughing, no brick-making)",
      "Explains that combining traditional authority with legal backing makes rules respected and enforceable",
      "Suggests teaching young people the traditional rules and the science of wetlands in schools and community meetings",
      "Explains that people understand both the cultural and practical reasons, so they protect the wetland",
    ],
    modelAnswer: "The chief and headmen could work with EMA and the rural district council to agree rules such as no ploughing or brick-making in the wetland, so the rules carry both traditional authority and legal backing. Schools and community meetings could teach young people both the traditional rules and the science of how wetlands store water, so they understand why the wetland must be protected.",
    hints: ["Think about leadership and about education."],
    explanation: "One mark for each suggestion and one for its explanation.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: source("Source A", "an account by an anonymous elder, recorded by a fictional school history club in Hwange District, 2026",
      "When I was a boy, no one could cut trees on the hill where our ancestors are buried. We did not hunt in the rainy season, when the animals had young. If you killed a pregnant animal, the headman fined you a goat. Today young men cut the trees on that hill to sell firewood in town, and they say the old rules are only stories.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which indigenous method is shown by the rule about hunting in the rainy season?",
        options: [
          ["a seasonal restriction", "Correct: hunting was forbidden at a particular time."],
          ["a totem", "A totem concerns one clan's animal at all times."],
          ["fallowing", "Fallowing concerns resting fields."],
          ["a modern by-law", "The rule came from custom, not a council."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** ways the rules were made effective in the past, according to the source.",
        points: ["The hill was sacred because ancestors were buried there (belief)", "Offenders were fined by the headman (a goat)"],
        modelAnswer: "The hill was respected as the burial place of the ancestors, and the headman fined offenders a goat.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain why the rules are less effective today, using the source and your own knowledge.",
        points: [
          "Source: young men no longer believe in the rules ('only stories')",
          "Source: they cut trees to sell firewood (economic need / commercial demand)",
          "Own knowledge: population growth, urbanisation, weaker authority of leaders / change in religion",
        ],
        modelAnswer: "The source shows that young men no longer believe the rules, calling them only stories, and that they cut trees to sell firewood in town because they need money. In addition, population growth and the move to towns have increased demand for firewood and weakened the authority of traditional leaders in some places.",
      }),
    ],
    hints: ["In (c), use one point from the source and one from your own knowledge at least."],
    explanation: "A source-based practice item on indigenous conservation then and now.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about indigenous methods of conservation.",
    parts: [
      P.manual({
        label: "(a)", marks: 6,
        stem: "Explain **three** reasons why indigenous methods of conservation worked well in the past.",
        points: [
          "Strong beliefs in ancestors and taboos",
          "so people feared misfortune and obeyed the rules",
          "Respected chiefs, headmen and spirit mediums",
          "who could fine offenders at their courts",
          "Small populations / community ownership / taught from childhood",
          "so resources could recover and everyone had a reason to protect them",
        ],
        modelAnswer: "People strongly believed in the ancestors and the power of taboos, so they feared misfortune and obeyed the rules. Chiefs, headmen and spirit mediums were respected and could fine offenders at their courts. Populations were small and resources were shared by the whole community, so the land could recover and everyone had a reason to protect it.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Indigenous methods are the best way to conserve natural resources in Zimbabwe today.\" How far do you agree?",
        points: [
          ["For: rooted in culture, cheap, community-enforced; sacred sites well preserved; suit local conditions", 2],
          ["Against: weakened by population growth, poverty, changing beliefs, commercial demand; rules unwritten", 2],
          ["Comparison: modern laws, agencies and science can deal with large-scale threats (mining, poaching, pollution)", 2],
          ["Supported judgement (e.g. a combination works best)", 2],
        ],
        levels: levels(8),
        modelAnswer: "Indigenous methods have real strengths today. They are rooted in local culture, cost little to enforce and are understood by the community. Sacred forests and springs are often among the best-preserved places in a district, and chiefs still control grazing and tree cutting in communal areas.\n\nHowever, these methods depend on shared belief and respected leadership. Population growth, poverty, changes in religion and commercial demand for firewood, timber and wildlife have weakened them. Large-scale threats such as illegal mining, pollution and organised poaching need modern laws, agencies and scientific monitoring.\n\nI disagree that they are the best way on their own. They are most effective when combined with modern laws and education, so that local knowledge and community leadership support national conservation efforts.",
      }),
    ],
    hints: ["In (b), compare with modern methods before concluding."],
    explanation: "A practice evaluative item on the effectiveness of indigenous conservation today.",
  });

  b.card("DEFINITION", "Conservation", "The careful use, protection and management of natural resources so they last for future generations.");
  b.card("DEFINITION", "Taboo (zviera)", "A strong rule forbidding certain actions, often backed by the belief that breaking it brings misfortune.");
  b.card("DEFINITION", "Indigenous knowledge systems (IKS)", "Knowledge and practices developed by local communities over generations through observation of their environment.");
  b.card("FACT", "Name five indigenous methods of conservation.", "Taboos, totems, sacred places, chiefs' rules, seasonal restrictions (also protecting fruit trees, wetlands, fallowing).");
  b.card("FACT", "Who enforced indigenous conservation rules?", "Chiefs, headmen and spirit mediums, with the community; offenders were fined at the chief's court.");
  b.card("CONCEPT", "How did totems conserve wildlife?", "Clan members did not kill or eat their totem animal, so different species were protected by different clans.");
  b.card("CONCEPT", "Why did a sacred forest around a spring help conservation?", "Trees were not cut, so they shaded the spring and held the soil, and the water kept flowing.");
  b.card("CONCEPT", "Why are indigenous methods weaker today?", "Population growth, poverty, changing beliefs, urbanisation, commercial demand and weaker authority of leaders in places.");
  b.card("CONCEPT", "Why did indigenous methods work in the past?", "Strong beliefs, respected leaders, small populations, community ownership and teaching from childhood.");
});
